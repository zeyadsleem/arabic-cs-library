#!/usr/bin/env node
// Verifies that every internal link and asset reference in the built site
// resolves to a file that the build actually produced. adapter-static only
// warns about the ones it crawls, and it reports the same link twice when the
// base path is wrong, so the check is done here against the output on disk.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveBasePath } from './lib/base-path.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const base = resolveBasePath();
// A path is optional: the check reports on stdout and is meant to run anywhere.
const reportPath = process.argv[2];

if (!fs.existsSync(buildDir)) {
  console.error('build/ is missing. Run the build before checking links.');
  process.exit(1);
}

const referencePattern = /\s(?:href|src)="([^"]+)"/g;
const broken = [];
const external = [];
let pages = 0;
let internal = 0;

function htmlFiles(directory) {
  const found = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...htmlFiles(target));
    else if (entry.name.endsWith('.html')) found.push(target);
  }
  return found;
}

function resolves(pathname) {
  const target = path.resolve(buildDir, pathname.replace(/^\/+/, ''));
  if (target !== buildDir && !target.startsWith(buildDir + path.sep)) return false;
  return fs.existsSync(target) || fs.existsSync(`${target}.html`) || fs.existsSync(path.join(target, 'index.html'));
}

for (const file of htmlFiles(buildDir)) {
  pages += 1;
  const html = fs.readFileSync(file, 'utf8');
  for (const [, href] of html.matchAll(referencePattern)) {
    const value = href.trim();
    if (!value || value.startsWith('#')) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//')) {
      external.push(value);
      continue;
    }
    const [pathname] = value.split('#');
    const [search] = value.split('?');
    const target = pathname || search.replace(/^\?/, '');
    if (!target) continue;
    if (base && target.startsWith(`${base}/`)) {
      internal += 1;
      if (!resolves(target.slice(base.length))) broken.push({ page: path.relative(buildDir, file), href: value });
      continue;
    }
    if (target.startsWith('/')) {
      broken.push({ page: path.relative(buildDir, file), href: value });
      continue;
    }
    internal += 1;
    const absolute = path.posix.join(path.posix.dirname('/' + path.relative(buildDir, file)), target);
    if (!resolves(absolute)) broken.push({ page: path.relative(buildDir, file), href: value });
  }
}

const serialized = JSON.stringify({ base, pages, internal, external: external.length, broken }, null, 2) + '\n';
console.log(`Checked ${pages} pages. Internal references: ${internal}; external references: ${external.length}`);
console.log(`Unresolved internal references: ${broken.length}`);
if (reportPath) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, serialized);
}
if (broken.length) {
  for (const entry of broken.slice(0, 20)) console.log(`  ${entry.page} -> ${entry.href}`);
  console.error(`\nBroken links: ${broken.length}.${reportPath ? ` Full report: ${reportPath}` : ''}`);
  process.exit(1);
}