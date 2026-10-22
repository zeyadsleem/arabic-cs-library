/** Stage the code of every TanStack lesson from the author's repository.
 *
 * The two YouTube courses are backed by one Git branch per lesson:
 *   github.com/alialaa/tanstack-router-course  (34 lessons, 32 branches)
 *   github.com/alialaa/tanstack-form-course    (21 lessons, 20 branches)
 *
 * For each lesson this script writes two artefacts under `content-src/<book>/`:
 *   lesson-code.json     the machine-readable bundle: the lesson's branch, the
 *                        previous lesson's branch as its base, the files that
 *                        changed between the two, and the full source snapshot
 *                        at the lesson's branch.
 *   code/<key>.md        the same bundle rendered for a translator/author: the
 *                        changed files with their full content, then every
 *                        source file at the branch with a fenced block.
 *
 * The lesson order and the page keys come from the staged pages themselves, so
 * a lesson that links no branch inherits the previous lesson's snapshot (the
 * course never needs a diff for it).
 *
 * Usage: `node scripts/import-tanstack-code.mjs [--book <id>] [--repos <dir>]`
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import {
  selectedBooks,
  sourceDirectory,
  TANSTACK_BOOKS,
  tanstackConfig,
} from './lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPOSITORIES = {
  'tanstack-router': 'https://github.com/alialaa/tanstack-router-course.git',
  'tanstack-form': 'https://github.com/alialaa/tanstack-form-course.git',
};

/** Branches the video did not link on its page, or that the page forgot. */
const BRANCH_OVERRIDES = {
  'form--installation': 'installing-tanstack-form',
  // The two intro lessons have no branch of their own; the finished app on
  // `main` is what they introduce.
  'router--index': 'main',
  'form--index': 'main',
};

/** Files that carry no teaching value: lockfiles, generated trees, binaries. */
const EXCLUDED_PATHS = [
  /^package-lock\.json$/,
  /^src\/routeTree\.gen\.ts$/,
  /^public\//,
  /^src\/assets\//,
];

/** Boilerplate that the lessons never explain, kept out of the readable bundle.
 * The machine-readable `lesson-code.json` still carries every file. */
const SNAPSHOT_SKIP = new Set([
  'eslint.config.js',
  'index.html',
  'package.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'src/App.css',
  'src/App.tsx',
  'src/index.css',
  'src/vite-env.d.ts',
]);

/** Top-level configuration files worth showing next to `src`. */
const INCLUDED_TOP_LEVEL = new Set([
  'components.json',
  'eslint.config.js',
  'index.html',
  'package.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts',
]);

const FENCE_LANGUAGES = {
  '.css': 'css',
  '.html': 'html',
  '.js': 'js',
  '.jsx': 'jsx',
  '.json': 'json',
  '.ts': 'ts',
  '.tsx': 'tsx',
};

/** Run git and fail loudly: a silent failure here stages half a course. */
const git = (directory, args) => {
  const result = spawnSync('git', ['-C', directory, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed in ${directory}: ${result.stderr.trim()}`);
  }
  return result.stdout;
};

/** Clone the course the first time, then fetch to pick up new commits. */
const ensureRepository = (bookId, reposDirectory) => {
  const directory = path.join(reposDirectory, bookId);
  if (!fs.existsSync(path.join(directory, '.git'))) {
    fs.mkdirSync(path.dirname(directory), { recursive: true });
    const clone = spawnSync(
      'git',
      ['clone', '--quiet', REPOSITORIES[bookId], directory],
      { encoding: 'utf8' }
    );
    if (clone.status !== 0) throw new Error(`git clone failed: ${clone.stderr.trim()}`);
    return directory;
  }
  const fetch = spawnSync('git', ['-C', directory, 'fetch', '--quiet', 'origin'], {
    encoding: 'utf8',
  });
  if (fetch.status !== 0) {
    console.warn(`${bookId}: git fetch failed, using the local branches`);
  }
  return directory;
};

/** Files that belong in a lesson bundle. */
const wanted = (file) =>
  !EXCLUDED_PATHS.some((pattern) => pattern.test(file)) &&
  (file.startsWith('src/') || INCLUDED_TOP_LEVEL.has(file));

/** A branch name as the local clone tracks it. */
const ref = (branch) => `origin/${branch}`;

/** File content at a branch, or null when it is binary or absent. */
const readAt = (directory, branch, file) => {
  const result = spawnSync('git', ['-C', directory, 'show', `${ref(branch)}:${file}`], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.status !== 0) return null;
  if (result.stdout.includes('\u0000')) return null;
  return result.stdout;
};

/** Every bundled source file at a branch, in path order. */
const snapshot = (directory, branch) => {
  const listed = git(directory, ['ls-tree', '-r', '--name-only', ref(branch)])
    .split('\n')
    .filter((file) => file.trim() && wanted(file))
    .sort();
  return listed
    .map((file) => ({ path: file, content: readAt(directory, branch, file) }))
    .filter((file) => file.content !== null);
};

/** The lesson order of a book, from its published structure. */
const courseLessons = (bookId) => {
  const structure = JSON.parse(
    fs.readFileSync(path.join(root, 'content', `${bookId}-structure.json`), 'utf8')
  );
  const chapter = structure.chapters[0];
  return chapter.sections
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((section) => ({ key: `${chapter.key}--${section.slug}`, order: section.order }));
};

/** The branch a staged page links, if any. */
const linkedBranch = (bookId, key) => {
  const page = fs.readFileSync(path.join(sourceDirectory(root, bookId), `${key}.md`), 'utf8');
  const match = page.match(
    /github\.com\/alialaa\/tanstack-(?:router|form)-course\/tree\/([A-Za-z0-9._-]+)/
  );
  return match ? match[1] : null;
};

/** Files that differ between two branches, with their content after the change. */
const changedFiles = (directory, base, branch) => {
  const output = base
    ? git(directory, ['diff', '--name-status', '-M', ref(base), ref(branch)])
    : git(directory, ['ls-tree', '-r', '--name-only', ref(branch)]);
  const lines = output.split('\n').filter((line) => line.trim());
  if (!base) {
    return lines
      .filter((file) => wanted(file))
      .sort()
      .map((file) => ({ path: file, status: 'added', content: readAt(directory, branch, file) }))
      .filter((file) => file.content !== null);
  }
  const changed = [];
  for (const line of lines) {
    const parts = line.split('\t');
    const status = parts[0];
    if (status === 'D') {
      if (wanted(parts[1])) changed.push({ path: parts[1], status: 'deleted' });
      continue;
    }
    if (status.startsWith('R')) {
      const oldPath = parts[1];
      const newPath = parts[2];
      if (!wanted(newPath)) continue;
      changed.push({
        path: newPath,
        oldPath,
        status: 'renamed',
        content: readAt(directory, branch, newPath),
      });
      continue;
    }
    if (!wanted(parts[1])) continue;
    changed.push({
      path: parts[1],
      status: status === 'A' ? 'added' : 'modified',
      content: readAt(directory, branch, parts[1]),
    });
  }
  return changed
    .filter((file) => file.status === 'deleted' || file.content !== null)
    .sort((left, right) => left.path.localeCompare(right.path));
};

const fenceLanguage = (file) => FENCE_LANGUAGES[path.extname(file).toLowerCase()] ?? 'text';

const fenced = (file) => {
  const body = file.content.replace(/\n$/, '');
  return `### \`${file.path}\`\n\n\`\`\`${fenceLanguage(file.path)}\n${body}\n\`\`\``;
};

const renderBundle = (lesson, repoUrl) => {
  const lines = [
    `# ${lesson.key} — ${lesson.title}`,
    '',
    `- الفرع: ${lesson.branch ? `origin/${lesson.branch}` : 'لا يوجد فرع لهذا الدرس'}`,
    `- الأساس: ${lesson.base ? `origin/${lesson.base}` : 'لا أساس (أول فرع في الدورة)'}`,
    `- مستودع الدورة: ${repoUrl}`,
    '',
  ];
  if (lesson.changed.length) {
    lines.push('## ملفات تغيّرت في هذا الدرس', '');
    for (const file of lesson.changed) {
      const status =
        file.status === 'renamed'
          ? `أُعيدت تسميته من \`${file.oldPath}\``
          : file.status === 'deleted'
            ? 'محذوف'
            : file.status === 'added'
              ? 'جديد'
              : 'معدَّل';
      lines.push(`- \`${file.path}\` (${status})`);
    }
    lines.push('');
    for (const file of lesson.changed) {
      if (file.content === undefined || file.content === null) continue;
      lines.push(fenced(file), '');
    }
  } else {
    lines.push(
      lesson.branch
        ? '## لا يغيّر هذا الدرس أي ملف؛ استخدم لقطة الفرع أدناه'
        : '## لا يوجد كود لهذا الدرس',
      ''
    );
  }
  if (lesson.files.length) {
    const shown = new Set(lesson.changed.map((file) => file.path));
    const snapshot = lesson.files.filter(
      (file) => !SNAPSHOT_SKIP.has(file.path) && !shown.has(file.path)
    );
    if (snapshot.length) {
      lines.push(`## الشيفرة الكاملة عند الفرع ${lesson.branch ? `\`${lesson.branch}\`` : ''}`, '');
      for (const file of snapshot) lines.push(fenced(file), '');
    }
  }
  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
};

const main = () => {
  const books = selectedBooks(process.argv);
  const reposFlag = process.argv.indexOf('--repos');
  const reposDirectory =
    reposFlag !== -1 && process.argv[reposFlag + 1]
      ? path.resolve(process.argv[reposFlag + 1])
      : path.join(os.tmpdir(), 'tanstack-repos');

  for (const bookId of books) {
    const config = tanstackConfig(bookId);
    const directory = ensureRepository(bookId, reposDirectory);
    const lessons = [];
    let previous = null;

    for (const lesson of courseLessons(bookId)) {
      const explicit =
        linkedBranch(bookId, lesson.key) ?? BRANCH_OVERRIDES[lesson.key] ?? null;
      const branch = explicit ?? previous;
      const base = explicit ? previous : null;
      const source = matter(
        fs.readFileSync(path.join(sourceDirectory(root, bookId), `${lesson.key}.md`), 'utf8')
      );
      const title = String(source.data.title ?? lesson.key);
      const entry = {
        key: lesson.key,
        order: lesson.order,
        title,
        branch,
        base,
        changed: branch && explicit ? changedFiles(directory, base, branch) : [],
        files: branch ? snapshot(directory, branch) : [],
      };
      lessons.push(entry);
      if (branch) previous = branch;
    }

    const payload = {
      generatedAt: new Date().toISOString(),
      repository: REPOSITORIES[bookId],
      lessons,
    };
    const outputDirectory = path.join(sourceDirectory(root, bookId));
    const codeDirectory = path.join(outputDirectory, 'code');
    fs.mkdirSync(codeDirectory, { recursive: true });
    fs.rmSync(codeDirectory, { recursive: true, force: true });
    fs.mkdirSync(codeDirectory, { recursive: true });
    for (const lesson of lessons) {
      fs.writeFileSync(
        path.join(codeDirectory, `${lesson.key}.md`),
        renderBundle(lesson, REPOSITORIES[bookId])
      );
    }
    fs.writeFileSync(
      path.join(outputDirectory, 'lesson-code.json'),
      `${JSON.stringify(payload, null, 2)}\n`
    );

    const withBranch = lessons.filter((lesson) => lesson.branch).length;
    const changes = lessons.reduce((sum, lesson) => sum + lesson.changed.length, 0);
    console.log(
      `${bookId}: ${lessons.length} lessons (${withBranch} with a branch, ${changes} changed files staged)`
    );
  }
};

main();
