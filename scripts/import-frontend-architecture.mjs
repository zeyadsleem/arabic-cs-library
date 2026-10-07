/** Build the complete Arabic course from a frozen source and reviewed translations.
 * No network or translation service is needed to reproduce the published pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {parse} from 'node-html-parser';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir=path.join(root,'content-src/frontend-architecture');
const outputDir=path.join(root,'content/frontend-architecture');
const lessons=JSON.parse(fs.readFileSync(path.join(sourceDir,'source.json'),'utf8'));
const translations=JSON.parse(fs.readFileSync(path.join(sourceDir,'translations.json'),'utf8'));
const titles=[
 'مقدمة','نظرة عامة على الكورس','ما معمارية البرمجيات؟','ما معمارية الواجهات الأمامية؟','تصميم البرمجيات مقابل المعمارية','دور معماري الواجهات الأمامية',
 'قبل أن نبدأ','التعريف بالمشروع','نموذج C4','التمرين 1: مخطط الحاويات','التمرين 1: الحل','الدوافع المعمارية','المتطلبات المعمارية','التمرين 2: المتطلبات المعمارية','التمرين 2: الحل','القرارات المعمارية',
 'مقدمة وحدة التصميم','الكيانات والوحدات والمكونات','نمذجة المجال','التمرين 3: نمذجة المجال','التمرين 3: الحل','تقسيم التطبيق','مخططات مفيدة','التمرين 4: مخطط التسلسل','التمرين 4: الحل','وثيقة التصميم',
 'مقدمة وحدة التنفيذ','إعداد المشروع','تنفيذ الوحدات','التسلسل الهرمي للمكونات وتقسيمها','التمرين 5: تقسيم المكونات','التمرين 5: الحل','تنفيذ الكيانات','التمرين 6: الكيانات','التمرين 6: الحل','ضوابط الحماية والقيود',
 'موارد للتعمّق','إلى اللقاء…؟'
];
const modules={foundations:'الأساسيات',understanding:'فهم المشكلة',designing:'التصميم',implementing:'التنفيذ','wrapping-up':'الختام'};
const hash=text=>createHash('sha256').update(text).digest('hex');
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const translate=text=>{
 const trimmed=text.trim();
 if(!/[a-zA-Z]{2}/.test(trimmed))return text;
 const translated=translations[hash(trimmed)];
 if(!translated)throw new Error(`Missing translation: ${trimmed.slice(0,100)}`);
 return text.replace(trimmed,escape(translated));
};
if(lessons.length!==38||titles.length!==38)throw new Error('The complete course must have 38 lessons');
fs.rmSync(outputDir,{recursive:true,force:true});
fs.mkdirSync(outputDir,{recursive:true});
const chapters=[];
for(const lesson of lessons){
 const title=titles[lesson.number-1];
 const slug=lessons.findIndex(item=>item.module===lesson.module)===lesson.number-1?'index':lesson.slug;
 if(!modules[lesson.module]||!lesson.video?.startsWith('https://player.vimeo.com/video/'))throw new Error('Invalid lesson '+lesson.key);
 const dom=parse(lesson.html,{blockTextElements:{script:true,noscript:true,style:true,pre:false}});
 function visit(node){
  if(node.nodeType===1&&['CODE','PRE','SCRIPT','STYLE'].includes(node.tagName))return;
  if(node.nodeType===3)node.rawText=translate(node.textContent);
  for(const child of node.childNodes||[])visit(child);
 }
 visit(dom);
 for(const img of dom.querySelectorAll('img')){
  const source=img.getAttribute('src');
  if(!source.startsWith('/course-assets/frontend-architecture/'))throw new Error('Unexpected image '+source);
  const originalName=path.basename(source);
  const name=originalName==='component-hierarchy.webp'?'component-hierarchy-ar.svg':originalName;
  img.setAttribute('src','/images/frontend-architecture/'+name);
  img.setAttribute('alt',translations[hash(img.getAttribute('alt'))]||'مخطط توضيحي');
  img.setAttribute('loading','lazy');
 }
 for(const link of dom.querySelectorAll('a')){
  const href=link.getAttribute('href');
  if(href&&!/^(https?:|#|mailto:)/.test(href))link.setAttribute('href',new URL(href,lesson.url).href);
  if(link.getAttribute('target')==='_blank')link.setAttribute('rel','noopener noreferrer');
 }
 // Preserve authored code while letting the library apply its own syntax theme.
 for(const pre of dom.querySelectorAll('pre')){
  const language=pre.getAttribute('data-language')||'ts';
  const code=pre.textContent;
  pre.set_content(`<code class="language-${language}">${escape(code)}</code>`);
  pre.removeAttribute('style');pre.removeAttribute('class');
 }
 let body=dom.toString().replace(/<p>\[(\d\d:\d\d)\]/g,'<p><bdi dir="ltr">[$1]</bdi>');
 const legendRows={
 'exercise-5-component-breakdown':[
  ['Shared','مشترك بين الوحدات'],['Screens','الشاشات'],['Features','الميزات'],['Components','المكونات'],['Header','الترويسة'],['RestaurantFilters','مرشّحات المطاعم'],['RestaurantCategoryCarousel','عارض فئات المطاعم'],['RestaurantAttributeFilter','مرشّح خصائص المطعم'],['FeaturedOffersCarousel','عارض العروض المميّزة'],['FeaturedOfferCard','بطاقة عرض مميّز'],['RestaurantCarousel','عارض المطاعم'],['RestaurantCard','بطاقة مطعم'],['Carousel','العارض الدوّار']
 ],
 'exercise-5-solution':[
  ['Shared','مشترك بين الوحدات'],['Screens','الشاشات'],['Features','الميزات'],['Components','المكونات'],['RestaurantHeader','ترويسة المطعم'],['RestaurantInformation','معلومات المطعم'],['MenuSearchBar','شريط البحث في قائمة الطعام'],['RestaurantOptions','خيارات المطعم'],['MenuCategories','فئات قائمة الطعام'],['Promotions','العروض الترويجية'],['FeaturedItemsCarousel','عارض الأصناف المميّزة'],['RatingSummary','ملخّص التقييم'],['MenuItem','صنف في قائمة الطعام'],['MenuCategory','فئة في قائمة الطعام'],['Ratings','التقييمات'],['CustomerReview','مراجعة العميل'],['Footnotes','الحواشي']
 ]
 };
 if(legendRows[lesson.slug]){
  const table='<table><thead><tr><th>الاسم في الشيفرة والمخطط</th><th>المعنى بالعربية</th></tr></thead><tbody>'+legendRows[lesson.slug].map(([en,ar])=>`<tr><td><code>${en}</code></td><td>${ar}</td></tr>`).join('')+'</tbody></table>';
  body=body.replace(/(<p><img[^>]*><\/p>)/,'$1'+table);
 }

 const duration=lesson.label.match(/(\d+)m\s+(\d+)s$/);
 const meta=`الدرس ${lesson.number} من 38 · ${modules[lesson.module]}${duration?` · ${Number(duration[1])} دقيقة و${Number(duration[2])} ثانية`:''}`;
 const video=`<div class="lecture-video"><iframe src="${escape(lesson.video)}" title="${escape(title)} — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
 const fallback=`<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="${lesson.url}" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>`;
 fs.writeFileSync(path.join(outputDir,lesson.module+'--'+slug+'.md'),`---\ntitle: ${JSON.stringify(title)}\nlang: ar\n---\n\n<p>${meta}</p>\n\n${video}\n\n${fallback}\n\n${body}\n`);
 let chapter=chapters.find(c=>c.key===lesson.module);
 if(!chapter){chapter={key:lesson.module,title:modules[lesson.module],titleAr:modules[lesson.module],sections:[]};chapters.push(chapter);}
 // Filenames follow the library's <chapter>--<section>.md convention.
 chapter.sections.push({slug,title,order:lesson.number-1});
}
fs.writeFileSync(path.join(root,'content/frontend-architecture-structure.json'),JSON.stringify({chapters},null,2)+'\n');
console.log(`frontend-architecture: ${lessons.length} complete lessons in ${chapters.length} modules`);
