import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', 'missing-semester');

const raw = 'https://raw.githubusercontent.com/zeyadsleem/missing.cs-ar/main/content/lectures';

const lectures = [
  { slug: 'course-shell', titleAr: 'نظرة عامة على المقرر + مقدمة إلى الصدفة' },
  { slug: 'command-line-environment', titleAr: 'بيئة سطر الأوامر' },
  { slug: 'development-environment', titleAr: 'بيئة التطوير والأدوات' },
  { slug: 'debugging-profiling', titleAr: 'التنقيح وتوصيف الأداء' },
  { slug: 'version-control', titleAr: 'التحكم في الإصدارات وGit' },
  { slug: 'shipping-code', titleAr: 'تغليف الشيفرة ونشرها' },
  { slug: 'agentic-coding', titleAr: 'البرمجة بالوكلاء' },
  { slug: 'beyond-code', titleAr: 'ما وراء الشيفرة' },
  { slug: 'code-quality', titleAr: 'جودة الشيفرة' },
  { slug: 'data-wrangling', titleAr: 'معالجة وصقل البيانات' },
  { slug: 'potpourri', titleAr: 'خليط من المواضيع' },
  { slug: 'qa', titleAr: 'أسئلة وأجوبة' },
  { slug: 'security', titleAr: 'الأمان والتشفير' },
];

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(path.join(contentDir, 'missing-semester'), { recursive: true });

const chapters = [];

for (const [index, lecture] of lectures.entries()) {
  const url = `${raw}/${lecture.slug}.md`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`تعذّر تحميل ${url}: ${response.status}`);
  }
  const text = await response.text();
  fs.writeFileSync(path.join(sourceDir, `${lecture.slug}.md`), text);

  const frontMatter = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!frontMatter) {
    throw new Error(`لا يوجد front matter في ${lecture.slug}`);
  }
  const videoId = frontMatter[1].match(/^videoId:\s*"?([^"\n]+)"?$/m)?.[1];
  const body = text
    .slice(frontMatter[0].length)
    .trim()
    .replace(/\]\(\/lectures\/([a-z-]+)(?:\/)?\)/g, '](/book/missing-semester/$1/index)')
    .replace(/\]\(\/lectures\)/g, '](/book/missing-semester/course-shell/index)')
    .replace(/\]\(\/about\)/g, '](/book/missing-semester/course-shell/index)');
  const video = videoId
    ? `<p class="lecture-video"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="${lecture.titleAr}" loading="lazy" allowfullscreen></iframe></p>`
    : '';

  fs.writeFileSync(
    path.join(contentDir, 'missing-semester', `${lecture.slug}--index.md`),
    `---\ntitle: ${lecture.titleAr}\nlang: ar\n---\n\n${video}\n\n${body}\n`
  );

  chapters.push({
    key: lecture.slug,
    title: lecture.titleAr,
    titleAr: lecture.titleAr,
    sections: [{ slug: 'index', title: lecture.titleAr, order: index }],
  });
}

fs.writeFileSync(
  path.join(contentDir, 'missing-semester-structure.json'),
  JSON.stringify({ chapters }, null, 2)
);
console.log(`imported ${lectures.length} translated lectures`);
