// Run with node scripts/repair-crypto-images.mjs. No reimport or npm dependencies.
// Build recipes follow crypto101/book src/Makefile.assets. Only the four
// Graphviz diagrams are extracted from the official PDF (native neato absent).
// Requirements: git, curl, tar, mpost, mptopdf, pdflatex, potrace,
// pdftops, dvisvgm, magick, and a C++20 compiler with pkg-config/poppler headers.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = '/tmp/opencode/crypto-assets';
const revision = 'fdd5dbbb02ebf3ed316f66db2af62dbad4e39455';
const book = path.join(cache, 'book');
const sourceDir = path.join(root, 'content-src/crypto-101');
const imageDir = path.join(root, 'static/images/crypto-101');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const run = (command, args, cwd = cache, env = process.env) => execFileSync(command, args, {
  cwd, env, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, timeout: 120000,
});

function download(name, url, digest) {
  const target = path.join(cache, name);
  if (!fs.existsSync(target)) run('curl', ['--fail', '--location', '--silent', '--show-error', '--max-time', '90', '-o', target, url]);
  if (sha256(fs.readFileSync(target)) !== digest) throw new Error(`Checksum mismatch: ${url}`);
  return target;
}

fs.mkdirSync(cache, { recursive: true });
if (!fs.existsSync(book)) {
  run('git', ['clone', 'https://github.com/crypto101/book.git', book]);
  run('git', ['checkout', '--detach', revision], book);
}
if (run('git', ['rev-parse', 'HEAD'], book).trim() !== revision) throw new Error('Unexpected upstream revision');

// The installed mpost has no plain/metafun preload. Unpack the original TeX
// support sources in the cache only; nothing is installed into the system.
for (const [name, digest] of [
  ['metapost', '0bc6c4b198242e229d70c079b424c76745d2a369ddb05525abe13cd2c96ed71e'],
  ['context', '2ef961cf6fca298dcd4f85a470717a9b9ba94f23c51ddf51ff18fdd64fe0886d'],
  ['context-legacy', 'c3cf6db25527bcd7faeeb3d726ef4a01b82eac9446b8c81837e2a262f5182cdf'],
]) {
  const archive = download(`${name}.tar.xz`, `https://mirrors.ctan.org/systems/texlive/tlnet/archive/${name}.tar.xz`, digest);
  run('tar', ['-xf', archive, '--wildcards', 'texmf-dist/metapost/*']);
}
// The 2020 PDF has basename collisions (its BlockCipher/Encryption is the
// OCB diagram). The 2017 official edition contains the correct Graphviz forms.
const pdf = download('Crypto101-2017.pdf',
  'https://raw.githubusercontent.com/crypto101/crypto101.github.io/427a18fae4e29f7cb9e6e1acdab22858090f5863/Crypto101.pdf',
  'fe42077288cfaa6d1d1b83c088751e9224323cdec2a0c1904f0571e28a1f9cd4');

// Extract the actual embedded Form stream/resources/BBox, not a page crop.
const extractorSource = String.raw`
#include <PDFDoc.h>
#include <GlobalParams.h>
#include <Page.h>
#include <Dict.h>
#include <Stream.h>
#include <XRef.h>
#include <goo/GooString.h>
#include <memory>
#include <cstdlib>
int main(int argc, char **argv) {
  if (argc != 4) return 1;
  globalParams = std::make_unique<GlobalParams>();
  PDFDoc doc(std::make_unique<GooString>(argv[1]));
  if (!doc.isOk()) return 2;
  auto *xref = doc.getXRef();
  const Ref formRef { std::atoi(argv[2]), 0 };
  Object form = xref->fetch(formRef.num, formRef.gen);
  if (!form.isStream()) return 3;
  auto *formDict = form.getStream()->getDict();
  if (!formDict->lookup("Subtype").isName("Form")) return 4;
  const Ref pageRef = doc.getPage(1)->getRef();
  Object page = xref->fetch(pageRef.num, pageRef.gen);
  page.getDict()->set("Contents", Object(formRef));
  page.getDict()->set("Resources", formDict->lookup("Resources"));
  page.getDict()->set("MediaBox", formDict->lookup("BBox"));
  page.getDict()->set("CropBox", formDict->lookup("BBox"));
  xref->setModifiedObject(&page, pageRef);
  return doc.saveAs(argv[3], writeForceRewrite);
}
`;
fs.writeFileSync(path.join(cache, 'extract-form.cc'), extractorSource);
const flags = run('pkg-config', ['--cflags', '--libs', 'poppler']).trim().split(/\s+/);
run('c++', ['-std=c++20', path.join(cache, 'extract-form.cc'), ...flags, '-o', path.join(cache, 'extract-form')]);
// Original PDF pages 32–35: the node grid and the three permutation graphs.
const graphvizForms = { AllNodes: 956, Encryption: 976, Decryption: 998, Encryption2: 1000 };
const built = new Map();

function buildAsset(source) {
  if (built.has(source)) return built.get(source);
  const original = path.join(book, 'src', source);
  const stem = original.replace(/\.svg$/, '');
  const cwd = path.dirname(original);
  const basename = path.basename(stem);
  let asset = original;
  if (!fs.existsSync(original) || ['.mp', '.pbm', '.dot', '-illustration.tex'].some((suffix) => fs.existsSync(`${stem}${suffix}`))) {
    let compiled = `${stem}.pdf`;
    if (fs.existsSync(`${stem}.mp`)) {
      run('mpost', ['-ini', '-interaction=nonstopmode', '-halt-on-error',
        `metafun.mp; randomseed := 101; jobname := "${basename}"; input ${basename}.mp`], cwd,
      { ...process.env, MPINPUTS: `${cache}/texmf-dist/metapost//:` });
      run('mptopdf', [`${basename}.mps`], cwd);
      compiled = `${stem}-mps.pdf`;
    } else if (fs.existsSync(`${stem}.pbm`)) {
      run('potrace', ['-b', 'pdf', '-o', compiled, `${stem}.pbm`], cwd);
    } else if (fs.existsSync(`${stem}-illustration.tex`)) {
      for (const file of fs.readdirSync(cwd).filter((file) => file.endsWith('.pbm'))) {
        run('potrace', ['-b', 'pdf', '-o', file.replace(/\.pbm$/, '.pdf'), file], cwd);
      }
      run('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', `${basename}-illustration.tex`], cwd);
      compiled = `${stem}-illustration.pdf`;
    } else if (source.startsWith('Illustrations/BlockCipher/') && graphvizForms[basename]) {
      run(path.join(cache, 'extract-form'), [pdf, String(graphvizForms[basename]), compiled]);
    } else {
      throw new Error(`No original source/build recipe for ${source}`);
    }
    // This host's pdftocairo emits unbalanced clip groups for some figures.
    // EPS + dvisvgm preserves vector paths and outlines all original fonts.
    run('pdftops', ['-f', '1', '-l', '1', '-eps', compiled, `${stem}.eps`], cwd);
    run('dvisvgm', ['--eps', '--no-fonts', `--output=${original}`, `${stem}.eps`], cwd);
  }
  validateAsset(asset);
  built.set(source, asset);
  return asset;
}

function validateAsset(asset) {
  const bytes = fs.readFileSync(asset);
  if (asset.endsWith('.svg')) {
    if (!/^\s*(?:<\?xml[^>]*>\s*)?(?:<!--[^]*?-->\s*)?(?:<!DOCTYPE[^]*?>\s*)?<svg\b/.test(bytes.toString())) {
      throw new Error(`Not SVG XML: ${asset}`);
    }
  } else if (asset.endsWith('.png') && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`Not PNG: ${asset}`);
  }
  if (!asset.endsWith('.svg')) run('magick', [asset, '-resize', '800x800>', 'null:']);
}

const changes = [];
const assets = new Map();
for (const file of fs.readdirSync(sourceDir).filter((file) => file.endsWith('.rst')).sort()) {
  const chapter = file.replace(/\.rst$/, '');
  const rst = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  // Match the importer's top-level figures only (foreword's indented figure is
  // inside an admonition and was not imported as an image).
  const figures = [...rst.matchAll(/^\.\. (?:figure|image)::\s*(\S+)/gm)].map((match) => match[1].replace(/^\.\//, ''));
  const subfigures = [...rst.matchAll(/^ +\.\. subfigure::\s*(\S+)/gm)].map((match) => match[1].replace(/^\.\//, ''));
  for (const markdown of [path.join(sourceDir, `${chapter}.md`), path.join(root, 'content/crypto-101', `${chapter}--index.md`)]) {
    if (!fs.existsSync(markdown)) throw new Error(`Missing chapter: ${markdown}`);
    const before = fs.readFileSync(markdown, 'utf8');
    let after = before;
    for (const [index, source] of figures.entries()) {
      const filename = `${chapter}-fig-${index}-${path.basename(source)}`;
      const oldUrl = `/images/crypto-101/fig-${index}-${path.basename(source)}`;
      const newUrl = `/images/crypto-101/${filename}`;
      const existingAsset = path.join(root, 'static', oldUrl);
      // The three original clock SVGs are already genuine, valid assets.
      // Leave their filenames and references alone rather than duplicating them.
      if (fs.existsSync(existingAsset) && fs.readFileSync(existingAsset, 'utf8') !== '404: Not Found') {
        validateAsset(existingAsset);
        continue;
      }
      if (!after.includes(`](${oldUrl})`) && !after.includes(`](${newUrl})`)) throw new Error(`Unmapped figure: ${markdown}: ${source}`);
      after = after.replaceAll(`](${oldUrl})`, `](${newUrl})`);
      assets.set(filename, source);
    }
    for (const [index, source] of subfigures.entries()) {
      const filename = `${chapter}-subfig-${index}-${path.basename(source)}`;
      const url = `/images/crypto-101/${filename}`;
      const directive = `   .. subfigure:: ./${source}`;
      if (after.includes(directive)) {
        const remainder = after.slice(after.indexOf(directive) + directive.length);
        const caption = remainder.match(/\n {6,}([^\n]+)/)?.[1];
        if (!caption) throw new Error(`Missing existing caption: ${markdown}: ${source}`);
        after = after.replace(directive, `![${caption}](${url})\n`);
      } else if (!after.includes(`](${url})`)) throw new Error(`Unmapped subfigure: ${markdown}: ${source}`);
      assets.set(filename, source);
    }
    changes.push({ markdown, before, after });
  }
}

// Stage and validate every asset before changing any references. Chromium is
// already a project tool; librsvg/ImageMagick fails on Cairo's glyph groups on
// some hosts. Browser rendering also checks the actual delivery format.
for (const [filename, source] of assets) {
  buildAsset(source);
}
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  for (const [source, asset] of built) {
    if (!asset.endsWith('.svg')) continue;
    const parseError = await page.evaluate((xml) => {
      const document = new DOMParser().parseFromString(xml, 'image/svg+xml');
      return document.querySelector('parsererror')?.textContent;
    }, fs.readFileSync(asset, 'utf8'));
    if (parseError) throw new Error(`Invalid SVG XML: ${source}: ${parseError}`);
    await page.goto(`file://${asset}`);
    const svg = page.locator('svg');
    if (await svg.count() !== 1) throw new Error(`Invalid SVG document: ${source}`);
    const box = await svg.boundingBox();
    if (!box || box.width <= 0 || box.height <= 0) throw new Error(`Empty SVG: ${source}`);
    const screenshot = path.join(cache, `${source.replaceAll('/', '-')}.png`);
    await svg.screenshot({ path: screenshot });
    const variation = Number(run('magick', [screenshot, '-format', '%[standard-deviation]', 'info:']));
    if (!(variation > 0)) throw new Error(`Blank SVG rendering: ${source}`);
  }
} finally {
  await browser.close();
}
for (const [filename, source] of assets) {
  fs.copyFileSync(built.get(source), path.join(imageDir, filename));
}
for (const { markdown, before, after } of changes) {
  const code = (text) => [...text.matchAll(/^```[^]*?^```[^\n]*|(`+)(?!`)[^]*?\1/gm)].map((match) => match[0]).join('\0');
  if (sha256(code(before)) !== sha256(code(after))) throw new Error(`Code changed: ${markdown}`);
  if (before !== after) fs.writeFileSync(markdown, after);
}
// Remove only the failed download bodies; never remove a valid existing image.
for (const file of fs.readdirSync(imageDir)) {
  const target = path.join(imageDir, file);
  if (file.endsWith('.svg') && fs.readFileSync(target, 'utf8') === '404: Not Found') fs.rmSync(target);
}
console.log(`Restored ${assets.size} chapter-scoped images from ${built.size} original assets; checked ${changes.length} Markdown files.`);
