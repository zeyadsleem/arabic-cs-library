import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceRoot = path.join(root, 'content-src');
const imageRoot = path.join(root, 'static', 'images');

const books = {
  introtcs: {
    title: 'مقدمة في علوم الحاسوب النظرية',
    sourceUrl: 'https://introtcs.org/',
    repo: 'boazbk/tcs',
    base: '',
    imageRoot: 'figure',
    chapters: [
      ['lec_00_0_preface', 'Preface'],
      ['lec_00_1_math_background', 'Mathematical Background'],
      ['lec_01_introduction', 'Introduction'],
      ['lec_02_representation', 'Representing Information'],
      ['lec_03_computation', 'Computation'],
      ['lec_03a_computing_every_function', 'Computing Every Function'],
      ['lec_04_code_and_data', 'Code and Data'],
      ['lec_05_infinite', 'Infinite Sets'],
      ['lec_06_loops', 'Loops and Recursions'],
      ['lec_07_other_models', 'Other Models of Computation'],
      ['lec_08_uncomputability', 'Uncomputability'],
      ['lec_08a_restricted_models', 'Restricted Models of Computation'],
      ['lec_09_godel', 'The Gödel Theorem'],
      ['lec_10_efficient_alg', 'Efficient Algorithms'],
      ['lec_11_running_time', 'Running Time'],
      ['lec_12_NP', 'NP'],
      ['lec_13_Cook_Levin', 'The Cook-Levin Theorem'],
      ['lec_14_PvsNP', 'P versus NP'],
      ['lec_14a_space_complexity', 'Space Complexity'],
      ['lec_15_probability', 'Probability and Randomized Algorithms'],
      ['lec_16_randomized_alg', 'Randomized Algorithms'],
      ['lec_17_model_rand', 'Models of Randomized Algorithms'],
      ['lec_19_cryptography', 'Cryptography'],
      ['lec_20_alg_society', 'Algorithms and Society'],
      ['lec_24_proofs', 'Proofs'],
      ['lec_26_quantum_computing', 'Quantum Computing'],
    ],
  },
  'crafting-interpreters': {
    title: 'صناعة المفسّرات',
    sourceUrl: 'https://craftinginterpreters.com/',
    repo: 'munificent/craftinginterpreters',
    base: 'book',
    imageBase: 'site',
    chapters: [
      ['introduction', 'Introduction'],
      ['a-map-of-the-territory', 'A Map of the Territory'],
      ['welcome', 'Welcome'],
      ['the-lox-language', 'The Lox Language'],
      ['types-of-values', 'Types of Values'],
      ['scanning', 'Scanning'],
      ['scanning-on-demand', 'Scanning On Demand'],
      ['representing-code', 'Representing Code'],
      ['resolving-and-binding', 'Resolving and Binding'],
      ['statements-and-state', 'Statements and State'],
      ['classes', 'Classes'],
      ['classes-and-instances', 'Classes and Instances'],
      ['methods-and-initializers', 'Methods and Initializers'],
      ['inheritance', 'Inheritance'],
      ['superclasses', 'Superclasses'],
      ['control-flow', 'Control Flow'],
      ['parsing-expressions', 'Parsing Expressions'],
      ['evaluating-expressions', 'Evaluating Expressions'],
      ['strings', 'Strings'],
      ['functions', 'Functions'],
      ['calls-and-functions', 'Calls and Functions'],
      ['closures', 'Closures'],
      ['local-variables', 'Local Variables'],
      ['a-virtual-machine', 'A Virtual Machine'],
      ['compiling-expressions', 'Compiling Expressions'],
      ['a-bytecode-virtual-machine', 'A Bytecode Virtual Machine'],
      ['chunks-of-bytecode', 'Chunks of Bytecode'],
      ['a-tree-walk-interpreter', 'A Tree-Walk Interpreter'],
      ['jumping-back-and-forth', 'Jumping Back and Forth'],
      ['global-variables', 'Global Variables'],
      ['hash-tables', 'Hash Tables'],
      ['optimization', 'Optimization'],
      ['garbage-collection', 'Garbage Collection'],
      ['appendix-i', 'Appendix I'],
      ['appendix-ii', 'Appendix II'],
    ],
  },
  'game-programming-patterns': {
    title: 'أنماط برمجة الألعاب',
    sourceUrl: 'https://gameprogrammingpatterns.com/',
    repo: 'munificent/game-programming-patterns',
    base: 'book',
    ext: 'markdown',
    imageBase: 'site',
    chapters: [
      ['introduction', 'Introduction'],
      ['design-patterns-revisited', 'Design Patterns Revisited'],
      ['command', 'Command'],
      ['flyweight', 'Flyweight'],
      ['observer', 'Observer'],
      ['prototype', 'Prototype'],
      ['singleton', 'Singleton'],
      ['state', 'State'],
      ['subclass-sandbox', 'Subclass Sandbox'],
      ['bytecode', 'Bytecode'],
      ['type-object', 'Type Object'],
      ['behavioral-patterns', 'Behavioral Patterns'],
      ['double-buffer', 'Double Buffer'],
      ['game-loop', 'Game Loop'],
      ['update-method', 'Update Method'],
      ['event-queue', 'Event Queue'],
      ['component', 'Component'],
      ['decoupling-patterns', 'Decoupling Patterns'],
      ['service-locator', 'Service Locator'],
      ['sequencing-patterns', 'Sequencing Patterns'],
      ['optimization-patterns', 'Optimization Patterns'],
      ['dirty-flag', 'Dirty Flag'],
      ['object-pool', 'Object Pool'],
      ['spatial-partition', 'Spatial Partition'],
      ['data-locality', 'Data Locality'],
      ['architecture-performance-and-games', 'Architecture, Performance, and Games'],
    ],
  },
};

const get = async (url, attempts = 4) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
  throw new Error(`تعذّر التحميل: ${url}`);
};

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (source, target) => {
  try {
    execFileSync(
      'magick',
      ['convert', source, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(source, { force: true });
  } catch {
    fs.renameSync(source, target);
  }
};

for (const [id, book] of Object.entries(books)) {
  const ext = book.ext || 'md';
  const sourceDir = path.join(sourceRoot, id);
  const targetDir = path.join(contentDir, id);
  const imageDir = path.join(imageRoot, id);
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(imageDir, { recursive: true });

  const structure = { chapters: [] };
  const imageMap = {};
  let images = 0;
  let index = 0;

  for (const [slug, title] of book.chapters) {
    const remote = `${book.base ? `${book.base}/` : ''}${slug}.${ext}`;
    const url = `https://raw.githubusercontent.com/${book.repo}/master/${remote}`;
    let markdown;
    try {
      markdown = await (await get(url)).text();
    } catch (error) {
      console.warn(`تخطّي ${id}/${slug}: ${error.message}`);
      index += 1;
      continue;
    }

    const remoteBase = `https://raw.githubusercontent.com/${book.repo}/master/`;
    const localImage = async (src, position) => {
      const relative = src.replace(/^\.\.\//g, '').replace(/^\//, '');
      const prefix = book.imageRoot ?? (book.base ? `${book.base}/` : '');
      const remotePath = `${prefix}${relative}`;
      const target = path.join(imageDir, `${slug}-${position}${path.extname(relative)}`);
      const webp = target.replace(/\.\w+$/, '.webp');
      if (!fs.existsSync(webp) && !fs.existsSync(target)) {
        try {
          const raw = path.join(imageDir, `${slug}-${position}.raw`);
          fs.writeFileSync(raw, download(`${remoteBase}${remotePath}`));
          optimize(raw, webp);
          images += 1;
        } catch {
          console.warn(`تعذّر تنزيل صورة ${remotePath}`);
          return null;
        }
      }
      const local = fs.existsSync(webp) ? `/images/${id}/${path.basename(webp)}` : src;
      imageMap[src] = local;
      return local;
    };

    const imageMatches = [
      ...markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g),
      ...markdown.matchAll(/<img[^>]*src="([^"]+)"/g),
    ];
    let body = markdown;
    let position = 0;
    for (const match of imageMatches) {
      const src = match[1];
      position += 1;
      if (/^https?:/i.test(src)) continue;
      const local = await localImage(src, position);
      if (!local) continue;
      if (match[0].startsWith('![')) {
        body = body.split(match[0]).join(match[0].replace(src, local));
      } else {
        body = body.split(src).join(local);
      }
    }

    fs.writeFileSync(path.join(sourceDir, `${slug}.md`), body);

    const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim() || title;
    const clean = body.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

    const file = path.join(targetDir, `${slug}--index.md`);
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    if (!/lang: ar/.test(existing)) {
      fs.writeFileSync(
        file,
        `---\ntitle: "${heading.replace(/"/g, '')}"\nlang: en\nsource: ${book.sourceUrl}\n---\n\n${clean}\n`
      );
    }

    structure.chapters.push({
      key: slug,
      title: heading,
      titleAr: title,
      sections: [{ slug: 'index', title: heading, order: index }],
    });
    index += 1;
  }

  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify(structure, null, 2)
  );
  fs.writeFileSync(
    path.join(sourceDir, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );
  console.log(
    `${id}: ${structure.chapters.length} chapters, ${images} images → ${path.join(contentDir, `${id}-structure.json`)}`
  );
}
