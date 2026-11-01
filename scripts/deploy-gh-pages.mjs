import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');

const run = (command, args, options = {}) =>
  execFileSync(command, args, { encoding: 'utf8', ...options });

// CI publishes gh-pages on every push to main, so a manual deploy can race with
// it. On a rejected push the generated tree is rebuilt on top of the newer
// remote tip and pushed again; gh-pages only ever holds build output.
const pushBranch = (cwd, owner, repo) => {
  const push = () => run('git', ['push', 'origin', 'gh-pages'], { cwd, stdio: 'inherit' });
  try {
    push();
  } catch {
    console.warn('رُفض الدفع إلى gh-pages — أعيد المزامنة مع الفرع البعيد ثم أُعيد المحاولة.');
    run('git', ['fetch', '--depth', '1', 'origin', 'gh-pages'], { cwd, stdio: 'pipe' });
    run('git', ['reset', '--soft', 'FETCH_HEAD'], { cwd, stdio: 'pipe' });
    run('git', ['commit', '-m', `deploy: ${new Date().toISOString()}`], { cwd, stdio: 'inherit' });
    push();
  }
};

const remote = run('git', ['remote', 'get-url', 'origin'], { cwd: root }).trim();
const match = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
if (!match) {
  console.error(`تعذّر استخراج اسم المستودع من: ${remote}`);
  process.exit(1);
}
const owner = match[1];
const repo = match[2];
const repoUrl = `git@github.com:${owner}/${repo}.git`;

console.log(`بناء الموقع للمسار /${repo} ...`);
run('node', ['scripts/build-go-tour.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: `/${repo}` },
});
run('node', ['scripts/build-tanstack.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: `/${repo}` },
});
run('node', ['scripts/build-content.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: `/${repo}` },
});
run('node', ['node_modules/vite/bin/vite.js', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: `/${repo}`, NODE_OPTIONS: '--max-old-space-size=6144' },
});

if (!fs.existsSync(path.join(buildDir, 'index.html'))) {
  console.error('لم يُنتج البناء ملف index.html — توقف النشر.');
  process.exit(1);
}

/** Drop images no built page, script or style sheet mentions.
 * The image directories keep every figure the sources ever imported, including
 * ones the translated pages never embed; shipping them costs tens of megabytes
 * on the published branch and helps nobody. Only `build/` is touched, so the
 * sources keep their figures for future imports.
 * @param {string} directory @returns {{removed: number, bytes: number}}
 */
const pruneUnreferencedImages = (directory) => {
  const text = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'images' && current === directory) continue;
        walk(target);
      } else if (/\.(?:html|js|json|css|xml|txt|webmanifest)$/.test(entry.name)) {
        text.push(fs.readFileSync(target, 'utf8'));
      }
    }
  };
  walk(directory);
  const blob = text.join('\n');
  const images = path.join(directory, 'images');
  if (!fs.existsSync(images)) return { removed: 0, bytes: 0 };
  let removed = 0;
  let bytes = 0;
  const prune = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) {
        prune(target);
        if (!fs.readdirSync(target).length) fs.rmdirSync(target);
      } else {
        const relative = path.relative(directory, target).split(path.sep).join('/');
        if (blob.includes(relative) || blob.includes(encodeURI(relative))) return;
        bytes += fs.statSync(target).size;
        fs.rmSync(target);
        removed += 1;
      }
    }
  };
  prune(images);
  return { removed, bytes };
};

const pruned = pruneUnreferencedImages(buildDir);
if (pruned.removed) {
  console.log(
    `حُذفت ${pruned.removed} صورة غير مُشار إليها من مخرجات النشر (${(pruned.bytes / 1e6).toFixed(1)} ميغابايت).`
  );
}

/** Give the static fallback page the head tags the client-rendered error view owns.
 * The adapter writes 404.html before any page renders, so it ships without a
 * title or description and every mistyped URL looks untitled in a browser tab.
 * @param {string} file @returns {boolean}
 */
const stampFallbackPage = (file) => {
  if (!fs.existsSync(file)) return false;
  const html = fs.readFileSync(file, 'utf8');
  if (/<title>/.test(html)) return false;
  const title = '<title>الصفحة غير موجودة | المكتبة العربية لعلوم الحاسوب</title>';
  const description =
    '<meta name="description" content="الرابط المطلوب غير موجود في المكتبة العربية لعلوم الحاسوب.">';
  const stamped = html.replace(/<\/head>/i, `  ${title}\n    ${description}\n  </head>`);
  if (stamped === html) return false;
  fs.writeFileSync(file, stamped);
  return true;
};

if (stampFallbackPage(path.join(buildDir, '404.html'))) {
  console.log('أُضيف عنوان ووصف إلى صفحة 404 الاحتياطية.');
}

let branchExists = false;
try {
  const heads = run('git', ['ls-remote', '--heads', repoUrl, 'gh-pages']);
  branchExists = heads.trim().length > 0;
} catch (error) {
  console.error(`تعذّر الاتصال بالمستودع: ${error.message}`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `${repo}-gh-pages-`));
try {
  if (branchExists) {
    console.log('جلب فرع gh-pages من المستودع...');
    run(
      'git',
      ['clone', '--filter=blob:none', '--no-checkout', '--depth', '1', '--single-branch', '--branch', 'gh-pages', repoUrl, tmp],
      { stdio: 'pipe' }
    );
  } else {
    console.log('فرع gh-pages غير موجود — سيُنشأ فرع جديد.');
    run('git', ['init', '-b', 'gh-pages'], { cwd: tmp });
    run('git', ['remote', 'add', 'origin', repoUrl], { cwd: tmp });
  }

  for (const entry of fs.readdirSync(tmp)) {
    if (entry !== '.git') {
      fs.rmSync(path.join(tmp, entry), { recursive: true, force: true });
    }
  }

  const copy = (source, target) => {
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
      const from = path.join(source, entry.name);
      const to = path.join(target, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(to, { recursive: true });
        copy(from, to);
      } else if (entry.isFile()) {
        fs.copyFileSync(from, to);
      }
    }
  };
  copy(buildDir, tmp);

  run('git', ['add', '-A'], { cwd: tmp });
  if (!run('git', ['diff', '--cached', '--name-only', '--no-renames'], { cwd: tmp }).trim()) {
    console.log(`الموقع منشور بالفعل: https://${owner}.github.io/${repo}/`);
    process.exitCode = 0;
  } else {
    run('git', ['-c', 'diff.renames=false', 'commit', '-m', `deploy: ${new Date().toISOString()}`], {
      cwd: tmp,
      stdio: 'inherit',
    });
    pushBranch(tmp, owner, repo);
    console.log(`تم النشر: https://${owner}.github.io/${repo}/`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
