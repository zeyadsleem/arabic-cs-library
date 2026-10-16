/** Import MOOC (programming-26.mooc.fi) English source to content-src/mooc/.
 *
 * Source: /tmp/opencode/mooc-src/data/ (cloned from rage/programming-26)
 * Stages each .md file as content-src/mooc/<chapter>--<slug>.md with frontmatter.
 * Converts MDX custom components to plain markdown in the staged source.
 * Part index.md files (which contain only MDX components) become chapter index pages.
 * Images are copied to static/images/mooc/ preserving structure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { rewriteTextBoxes, stripOrphanComponents, markNotation, dropDuplicatedExerciseNames, outsideCode } from './lib/mooc-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join('/tmp/opencode/mooc-src', 'data');
const stagedDir = path.join(root, 'content-src', 'mooc');
const staticImgDir = path.join(root, 'static', 'images', 'mooc');

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFile(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

/** Transform MDX/custom components to plain markdown. */
function transformMdx(markdown, relDir) {
  let out = markdown;

  // 1. Handle every <text-box variant='...' name='...'> ... </text-box> as a note
  out = rewriteTextBoxes(out);

  // 2. Handle <sample-output> ... </sample-output>
  out = out.replace(
    /<sample-output>([\s\S]*?)<\/sample-output>/g,
    (_, content) => {
      const trimmed = content.trim();
      // Check if it contains <pre> (escaped error output)
      if (trimmed.includes('<pre>')) {
        // Extract the inner text of <pre>...</pre>
        const preMatch = trimmed.match(/<pre>([\s\S]*?)<\/pre>/);
        if (preMatch) {
          const err = preMatch[1].replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&');
          return `\n\`\`\`\n${err.trim()}\n\`\`\`\n`;
        }
      }
      // Regular output
      return `\n\`\`\`\n${trimmed}\n\`\`\`\n`;
    }
  );

  // 3. Handle <sample-data> ... </sample-data>
  out = out.replace(
    /<sample-data>([\s\S]*?)<\/sample-data>/g,
    (_, content) => `\n\`\`\`\n${content.trim()}\n\`\`\`\n`
  );

  // 4. Handle <notice> ... </notice>
  out = out.replace(
    /<notice>([\s\S]*?)<\/notice>/g,
    (_, content) => `> **ملاحظة:** ${content.trim()}\n`
  );

  // 5. Handle <in-browser-programming-exercise> ... </in-browser-programming-exercise>
  out = out.replace(
    /<in-browser-programming-exercise\s+([^>]*)>([\s\S]*?)<\/in-browser-programming-exercise>/g,
    (_, attrs, content) => {
      const nameMatch = attrs.match(/name="([^"]*)"/);
      const tmcMatch = attrs.match(/tmcname="([^"]*)"/);
      const name = nameMatch ? nameMatch[1] : 'تمرين';
      return `> **تمرين تفاعلي: ${name}**\n>\n> ${content.trim()}\n>\n> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*\n`;
    }
  );

  // 6. Handle <programming-exercise> ... </programming-exercise>
  out = out.replace(
    /<programming-exercise\s+([^>]*)>([\s\S]*?)<\/programming-exercise>/g,
    (_, attrs, content) => {
      const nameMatch = attrs.match(/name="([^"]*)"/);
      const name = nameMatch ? nameMatch[1] : 'تمرين برمجي';
      return `> **تمرين برمجي: ${name}**\n>\n> ${content.trim()}\n`;
    }
  );

  // 7. Handle <quiz> ... </quiz>
  out = out.replace(
    /<quiz\s+([^>]*)>[\s\S]*?<\/quiz>/g,
    (_, attrs) => {
      const idMatch = attrs.match(/id="([^"]*)"/);
      return `> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة${idMatch ? ` - ID: ${idMatch[1]}` : ''})\n`;
    }
  );

  // 8. Handle <pages-in-this-section> and <exercises-in-this-section> (part index pages) - both self-closing and paired
  out = out.replace(
    /<pages-in-this-section\s*\/>|<pages-in-this-section><\/pages-in-this-section>/g,
    '*سيتم عرض قائمة الصفحات في هذا القسم هنا.*'
  );
  out = out.replace(
    /<exercises-in-this-section\s*\/>|<exercises-in-this-section><\/exercises-in-this-section>/g,
    '*سيتم عرض قائمة التمارين في هذا القسم هنا.*'
  );
  out = out.replace(
    /<exercises-in-all-sections\s*\/>|<exercises-in-all-sections><\/exercises-in-all-sections>/g,
    '*سيتم عرض قائمة جميع التمارين هنا.*'
  );
  out = out.replace(
    /<table-of-contents\s*\/>|<table-of-contents><\/table-of-contents>/g,
    '*جدول المحتويات*'
  );

  // 9. Handle remaining custom components (module, series, item, expression, condition, block, class, variable, vocabulary, stdin)
  // These appear inside exercises - convert to descriptive text
  out = out.replace(/<module\s*\/>/g, '*(وحدة)*');
  out = out.replace(/<series\s*\/>/g, '*(سلسلة)*');
  out = out.replace(/<item\s*\/>/g, '*(عنصر)*');
  out = out.replace(/<expression\s*\/>/g, '*(تعبير)*');
  out = out.replace(/<expression>([\s\S]*?)<\/expression>/g, '$1');
  out = out.replace(/<condition\s*\/>/g, '*(شرط)*');
  out = out.replace(/<condition>([\s\S]*?)<\/condition>/g, '$1');
  out = out.replace(/<block\s*\/>/g, '*(كتلة)*');
  out = out.replace(/<block>([\s\S]*?)<\/block>/g, '$1');
  out = out.replace(/<class\s*\/>/g, '*(صنف)*');
  out = out.replace(/<variable\s*\/>/g, '*(متغير)*');
  out = out.replace(/<vocabulary\s*\/>/g, '*(مصطلح)*');
  out = out.replace(/<stdin\s*\/>/g, '*(إدخال)*');

  // 10. Handle <img> tags - convert to markdown with local path (both self-closing and non-self-closing)
  //     Additional attributes (alt, width, …) are tolerated; alt text is preserved when present.
  out = out.replace(
    /<img\b([^>]*)>/g,
    (_, attrs) => {
      const srcMatch = attrs.match(/\bsrc\s*=\s*"([^"]*)"/);
      if (!srcMatch) return '';
      const src = srcMatch[1];
      const altMatch = attrs.match(/\balt\s*=\s*"([^"]*)"/);
      const alt = altMatch ? altMatch[1] : path.basename(src);
      // src is like "/img/diagrams/foo.png" or "1_5_1.png" (relative)
      let imgPath = src;
      if (src.startsWith('/img/')) {
        imgPath = src.slice(1); // remove leading /
      } else if (!src.startsWith('http')) {
        // Relative to current file's directory
        imgPath = path.posix.join(relDir, src);
      }
      // Normalize
      imgPath = imgPath.replace(/^\.\//, '');
      return `![${alt}](/images/mooc/${imgPath})`;
    }
  );

  // 11. Clean up any remaining self-closing custom tags (never inside fenced code)
  out = outsideCode(out, (block) => block.replace(/<[a-z-]+\s*\/>/g, ''));

  // 12. Drop the wrappers no rule above converted
  out = stripOrphanComponents(out);

  // 13. Show the course's syntax notation as inline code, and label exercises once
  out = markNotation(out);
  out = dropDuplicatedExerciseNames(out);

  return out;
}

/** Parse frontmatter from markdown. */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };
  const data = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx < 1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') || value.startsWith("'")) {
      value = value.slice(1, -1);
    }
    // Handle booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data[key] = value;
  }
  return { data, body: content.slice(match[0].length).trimStart() };
}

/** Build slug from title. */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Main import. */
function main() {
  console.log('Importing MOOC from', srcDir);

  // Clean staged dir
  if (fs.existsSync(stagedDir)) fs.rmSync(stagedDir, { recursive: true, force: true });
  fs.mkdirSync(stagedDir, { recursive: true });

  // Find all .md files
  const mdFiles = [];
  function walk(dir, base = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.join(base, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (entry.name.endsWith('.md')) {
        mdFiles.push({ full, rel, base });
      }
    }
  }
  walk(srcDir);

  console.log(`Found ${mdFiles.length} markdown files`);

  // Process each file
  const manifest = [];
  let order = 0;

  // Group by chapter (part-* or top-level)
  const byChapter = {};
  for (const { full, rel, base } of mdFiles) {
    const content = readFile(full);
    const { data, body } = parseFrontmatter(content);

    // Determine chapter key and slug
    let chapterKey, slug;
    if (rel.startsWith('part-')) {
      const parts = rel.split('/');
      chapterKey = parts[0]; // e.g., "part-1"
      const fileName = parts[1];
      if (fileName === 'index.md') {
        slug = 'index';
      } else {
        slug = fileName.replace('.md', '');
      }
    } else {
      // Top-level pages
      chapterKey = 'auxiliary';
      slug = rel.replace('.md', '');
    }

    // Transform body
    const transformed = transformMdx(body, base);

    // Build frontmatter
    const title = data.title || slug;
    const orderValue = slug === 'index' ? 0 : (data.sidebar_priority ? Math.floor(data.sidebar_priority / 1000) : ++order);
    const sourceUrl = `https://programming-26.mooc.fi${data.path || '/' + rel.replace('.md', '')}`;

    const frontmatter = {
      title: JSON.stringify(title),
      book: 'mooc',
      chapter: chapterKey,
      slug,
      order: orderValue,
      source: JSON.stringify(sourceUrl),
      lang: 'en'
    };

    const fmLines = Object.entries(frontmatter).map(([k, v]) => `${k}: ${v}`).join('\n');
    const output = `---\n${fmLines}\n---\n\n${transformed}\n`;

    const outFile = path.join(stagedDir, `${chapterKey}--${slug}.md`);
    writeFile(outFile, output);

    manifest.push({ chapter: chapterKey, slug, title, order: orderValue, sourceUrl });

    // Copy images referenced in the original file
    const imgMatches = body.match(/<img\s+src="([^"]*)"/g);
    if (imgMatches) {
      for (const m of imgMatches) {
        const match = m.match(/src="([^"]*)"/);
        if (match) {
          let src = match[1];
          let srcPath;
          if (src.startsWith('/img/')) {
            srcPath = path.join(srcDir, src.slice(1));
          } else {
            srcPath = path.join(srcDir, base, src);
          }
          if (fs.existsSync(srcPath)) {
            const destName = path.relative(srcDir, srcPath).replace(/\\/g, '/');
            const destPath = path.join(staticImgDir, destName);
            copyFile(srcPath, destPath);
          }
        }
      }
    }

    // Also copy any images in the same directory as the md file
    const imgDir = path.dirname(full);
    for (const f of fs.readdirSync(imgDir)) {
      if (/\.(png|jpg|jpeg|gif|svg)$/i.test(f)) {
        const srcPath = path.join(imgDir, f);
        const destName = path.relative(srcDir, srcPath).replace(/\\/g, '/');
        const destPath = path.join(staticImgDir, destName);
        if (!fs.existsSync(destPath)) {
          copyFile(srcPath, destPath);
        }
      }
    }
  }

  // Copy all images from the source img directory (top-level)
  const srcImgDir = path.join(srcDir, 'img');
  if (fs.existsSync(srcImgDir)) {
    function copyImgDir(src, dest) {
      fs.mkdirSync(dest, { recursive: true });
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyImgDir(srcPath, destPath);
        } else {
          copyFile(srcPath, destPath);
        }
      }
    }
    copyImgDir(srcImgDir, path.join(staticImgDir, 'img'));
    console.log('Copied top-level img directory');
  }

  // Write manifest
  writeFile(path.join(stagedDir, 'mooc.json'), JSON.stringify(manifest, null, 2));
  console.log(`Staged ${manifest.length} pages to ${stagedDir}`);
  console.log(`Images copied to ${staticImgDir}`);
}

main();