#!/usr/bin/env node
/** Crop every figure recorded by scripts/import-ostep.mjs into static/images/ostep.
 *
 * Usage: node scripts/crop-ostep-figures.mjs [key ...]
 *
 * Reads content-src/ostep/figures.json, renders the recorded rectangle of the
 * source PDF at 150 dpi and writes static/images/ostep/fig-<key>-<n>.png.
 * XML coordinates come from `pdftohtml -xml` at zoom 1.5, hence
 * pixels = xml * dpi / 108.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = '/home/zeyad/projects/arabic-cs-library';
const PDF_DIR = path.join(ROOT, 'content-src/ostep/pdf');
const MANIFEST = path.join(ROOT, 'content-src/ostep/figures.json');
const OUT_DIR = path.join(ROOT, 'static/images/ostep');
const DPI = 150;
const SCALE = DPI / 108;

const figures = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const only = new Set(process.argv.slice(2));
const selected = only.size === 0 ? figures : figures.filter((figure) => only.has(figure.key));

fs.mkdirSync(OUT_DIR, { recursive: true });

let cropped = 0;
for (const figure of selected) {
  const pdf = path.join(PDF_DIR, `${figure.key}.pdf`);
  if (!fs.existsSync(pdf)) {
    console.log(`skip  ${figure.key}-${figure.n}  (no pdf)`);
    continue;
  }
  const px = (value) => Math.max(0, Math.round(value * SCALE));
  const args = [
    '-png',
    '-r',
    String(DPI),
    '-f',
    String(figure.page),
    '-l',
    String(figure.page),
    '-x',
    String(px(figure.x)),
    '-y',
    String(px(figure.y)),
    '-W',
    String(px(figure.w)),
    '-H',
    String(px(figure.h)),
    pdf,
    path.join(OUT_DIR, `fig-${figure.key}-${figure.n}`),
  ];
  try {
    execFileSync('pdftoppm', args, { stdio: 'pipe' });
    const target = path.join(OUT_DIR, `fig-${figure.key}-${figure.n}.png`);
    const produced = fs
      .readdirSync(OUT_DIR)
      .filter((name) => name.startsWith(`fig-${figure.key}-${figure.n}-`))
      .map((name) => path.join(OUT_DIR, name))[0];
    if (produced) fs.renameSync(produced, target);
    if (fs.existsSync(target)) {
      execFileSync(
        'convert',
        [target, '-trim', '+repage', '-bordercolor', 'white', '-border', '6', target],
        { stdio: 'pipe' },
      );
    }
    const size = fs.existsSync(target) ? fs.statSync(target).size : 0;
    const ratio = figure.w / figure.h;
    console.log(`${size > 0 ? 'ok  ' : 'empty'}  ${figure.key}-${figure.n}  ${px(figure.w)}x${px(figure.h)}  ${Math.round(size / 1024)}kB  ${figure.caption.slice(0, 50)}`);
    if (size > 0) cropped += 1;
    if (ratio > 6 || figure.h < 40) console.log(`  ! suspicious box for ${figure.key}-${figure.n}`);
  } catch (error) {
    console.log(`fail  ${figure.key}-${figure.n}  ${error.message.split('\n')[0]}`);
  }
}

console.log(`\n${selected.length} figures — ${cropped} written to static/images/ostep`);
