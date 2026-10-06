import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {parse} from 'node-html-parser';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'content-src/frontend-architecture/source.json'),'utf8'));
const translations=JSON.parse(fs.readFileSync(path.join(root,'content-src/frontend-architecture/translations.json'),'utf8'));
const structure=JSON.parse(fs.readFileSync(path.join(root,'content/frontend-architecture-structure.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'src/lib/generated/manifest.json'),'utf8'));
const libraryKey=lesson=>lesson.module+'--'+(source.findIndex(s=>s.module===lesson.module)===lesson.number-1?'index':lesson.slug);
const stamps=text=>[...text.matchAll(/\[\d{2}:\d{2}\]/g)].map(m=>m[0]);

// Catch absent or misordered lessons, not merely the presence of a course card.
test('the published course has all 38 lessons in the original five modules',()=>{
 assert.equal(source.length,38);
 assert.deepEqual(structure.chapters.map(c=>c.sections.length),[6,10,10,10,2]);
 assert.equal(structure.chapters.flatMap(c=>c.sections).length,38);
 const book=manifest.books.find(b=>b.id==='frontend-architecture');
 assert.equal(book.status,'translated');
 assert.equal(book.pages,38);
 assert.ok(manifest.path.stages.find(s=>s.id==='web').books.includes(book.id));
 assert.deepEqual(manifest.sections.filter(s=>s.book===book.id).map(s=>s.chapter+'--'+s.slug),source.map(libraryKey));
});

for(const lesson of source){
 test(`lesson ${lesson.number}: complete Arabic text, source links, code, and video`,()=>{
  const src=parse(lesson.html,{blockTextElements:{script:true,noscript:true,style:true,pre:false}});
  const section=JSON.parse(fs.readFileSync(path.join(root,`src/lib/generated/sections/frontend-architecture__${libraryKey(lesson)}.json`),'utf8'));
  const translated=parse(section.html,{blockTextElements:{script:true,noscript:true,style:true,pre:false}});
  assert.deepEqual(stamps(translated.textContent),stamps(src.textContent),'Missing or reordered transcript paragraphs');
  // Every source text node needs an aligned, nonempty translation.
  let count=0;
  function visit(node){
   if(node.nodeType===1&&['CODE','PRE','SCRIPT','STYLE'].includes(node.tagName))return;
   if(node.nodeType===3&&/[a-zA-Z]{2}/.test(node.textContent)){
    const text=node.textContent.trim();const hash=createHash('sha256').update(text).digest('hex');
    assert.ok(translations[hash]?.trim(),`Untranslated text: ${text.slice(0,80)}`);
    assert.ok(translated.textContent.includes(translations[hash]),`Translation missing from rendered page: ${text.slice(0,80)}`);count++;
   }
   for(const child of node.childNodes||[])visit(child);
  }
  visit(src);assert.ok(count>0);
  assert.equal(translated.querySelectorAll('p').length,src.querySelectorAll('p').length+2,'Missing source paragraph');
  assert.equal(translated.querySelectorAll('li').length,src.querySelectorAll('li').length,'Missing exercise or resource');
  assert.deepEqual(translated.querySelectorAll('pre').map(c=>c.textContent.trim()),src.querySelectorAll('pre').map(c=>c.textContent.trim()),'Changed authored code');
  const urls=translated.querySelectorAll('a').map(a=>new URL(a.getAttribute('href'),lesson.url).href);
  for(const a of src.querySelectorAll('a'))assert.ok(urls.includes(new URL(a.getAttribute('href'),lesson.url).href),'Lost source resource');
  assert.equal(translated.querySelector('iframe').getAttribute('src'),lesson.video,'Wrong video');
  assert.equal(translated.querySelectorAll('img').length,src.querySelectorAll('img').length,'Missing illustration');
  for(const img of translated.querySelectorAll('img')){
   const local=img.getAttribute('src').replace(/^\/arabic-cs-library/,'');
   assert.ok(fs.existsSync(path.join(root,'static',local)),`Image missing: ${local}`);
  }
 });
}
