import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

export const COURSE = 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/';
const TERMS = 'https://ocw.mit.edu/pages/privacy-and-terms-of-use/';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEST = path.join(ROOT, 'content-src/mit-6100l');
const LICENSE = 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
const MEDIA = /\.(?:mp4|webm|mov|mp3|m4a)(?:$|\?)/i;
const FILES = /\.(?:pdf|py|zip|txt|csv|webvtt|vtt|srt|png|jpg|jpeg|gif|svg)$/i;
const RESOURCE_EXCEPTIONS = {
  'mit6_100l_f22_lec01.pdf': 'Unknown-source image: excluded from OCW license.',
  'mit6_100l_f22_lec03.pdf': 'Nintendo imagery: all rights reserved, excluded.',
  'mit6_100l_f22_lec15.pdf': 'Meme/entertainment images: unknown source, NBC Universal, Warner Bros., Universal Studios; excluded.',
  'mit6_100l_f22_lec16.pdf': 'Nintendo imagery: all rights reserved, excluded.',
  'mit6_100l_f22_lec17.pdf': 'Unknown-source image: excluded.',
  'mit6_100l_f22_lec19.pdf': 'Unknown-source images: excluded.',
  'mit6_100l_f22_lec20.pdf': 'Apple, Fitbit, Garmin product/screenshots: all rights reserved, excluded.',
  'mit6_100l_f22_lec24.pdf': 'Nmnogueira sorting images, English Wikipedia: separately CC BY-SA, version unspecified in PDF; excluded from OCW license. Hold until independent license/version verified.',
  'mit6_100l_f22_ps5.pdf': 'Cyp images, English Wikipedia: separately CC BY-SA, version unspecified in PDF; excluded from OCW license. Hold until independent license/version verified.',
};

/** @param {string | Buffer} bytes @returns {string} */
export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

/** @param {string} value @param {string} base @returns {string | null} */
export function sourceUrl(value, base = COURSE) {
  const url = new URL(value, base);
  if (url.protocol !== 'https:') return null;
  url.hash = '';
  url.search = '';
  return url.href.startsWith(COURSE) || url.href === TERMS ? url.href : null;
}

/** A deliberately lossless text view: tables retain row/cell boundaries; code retains whitespace.
 * @param {string} html @param {string} base @returns {string} */
export function readableHtml(html, base = COURSE) {
  const document = parse(html);
  const codeBlocks = [];
  for (const element of document.querySelectorAll('pre')) {
    const token = `MIT6100LCODEBLOCK${codeBlocks.length}`;
    codeBlocks.push(parse(element.innerHTML).text);
    element.replaceWith(`\n${token}\n`);
  }
  for (const element of document.querySelectorAll('script, style, button, .video-fallback-container, .video-tab-toggle-section, .transcript-lang-bar')) element.remove();
  for (const element of document.querySelectorAll('a[href]')) {
    element.set_content(`${element.text.trim()} <${new URL(element.getAttribute('href') || '', base).href}>`);
  }
  for (const element of document.querySelectorAll('img')) element.replaceWith(`[Image: ${element.getAttribute('alt') || ''}; ${element.getAttribute('src') || ''}]`);
  for (const element of document.querySelectorAll('td, th')) element.set_content(`${element.innerHTML}\t`);
  let text = document.structuredText.replace(/\n{3,}/g, '\n\n').trim();
  for (const [index, code] of codeBlocks.entries()) text = text.replace(`MIT6100LCODEBLOCK${index}`, `\n\n${code.trimEnd()}\n\n`);
  return text + '\n';
}

/** @param {string} text @returns {string} */
export function readableVtt(text) {
  if (!/^\uFEFF?WEBVTT/.test(text)) throw new Error('Invalid WebVTT header');
  const cues = [];
  for (const block of text.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    if (/^\uFEFF?WEBVTT|^NOTE(?:\s|$)|^STYLE(?:\s|$)|^REGION(?:\s|$)/.test(block)) continue;
    const lines = block.split('\n');
    const timing = lines.findIndex((line) => line.includes('-->'));
    if (timing < 0) throw new Error(`WebVTT block without cue timing: ${block.slice(0, 80)}`);
    cues.push(parse(lines.slice(timing + 1).join('\n').replace(/<[^>]*>/g, '')).text);
  }
  return cues.join('\n\n').trim() + '\n';
}

/** @param {string} text @returns {string[]} */
export function licensingEvidence(text) {
  const lines = text.split(/\r?\n/);
  const evidence = new Set();
  for (let index = 0; index < lines.length; index++) {
    if (/copyright|©|courtesy|all rights reserved|used with permission|third.party|creative commons|license:|fair use|ripped from|pulled from|stackoverflow\.com/i.test(lines[index] || '')) {
      evidence.add(lines.slice(Math.max(0, index - 1), index + 9).join('\n').trim());
    }
  }
  return [...evidence];
}

/** @param {string} relative @param {string | Buffer} bytes @returns {string} */
function save(relative, bytes) {
  const target = path.resolve(DEST, relative);
  if (!target.startsWith(`${DEST}${path.sep}`)) throw new Error(`Output path outside source directory: ${relative}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bytes);
  return relative;
}

/** @param {string} relative @param {object} value @returns {void} */
function saveJson(relative, value) {
  const pending = `${relative}.pending`;
  save(pending, JSON.stringify(value, null, 2) + '\n');
  fs.renameSync(path.join(DEST, pending), path.join(DEST, relative));
}

/** @param {string} url @returns {string} */
function originalPath(url) {
  if (url === TERMS) return 'originals/policy/privacy-and-terms-of-use.html';
  const relative = url.slice(COURSE.length);
  return `originals/${relative.endsWith('/') || !relative ? `${relative}index.html` : relative}`;
}

/** @param {string} url @returns {{bytes: Buffer, finalUrl: string}} */
export function downloadSource(url) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'mit-6100l-'));
  const headersPath = path.join(temporary, 'headers');
  const bodyPath = path.join(temporary, 'body');
  try {
    let current = url;
    for (let redirects = 0; redirects <= 5; redirects++) {
      if (!sourceUrl(current) || MEDIA.test(current) || current.endsWith('/download')) throw new Error(`Download outside allowed scope: ${current}`);
      execFileSync('curl', ['-4', '--fail', '--silent', '--show-error', '--proto', '=https', '--compressed', '--retry', '3', '--connect-timeout', '20', '--max-time', '120', '--max-filesize', String(96 * 1024 * 1024), '--dump-header', headersPath, '--output', bodyPath, current]);
      const headers = fs.readFileSync(headersPath, 'utf8');
      const statuses = [...headers.matchAll(/^HTTP\/[\d.]+\s+(\d+)/gm)];
      const status = Number(statuses.at(-1)?.[1]);
      if (status === 200) return { bytes: fs.readFileSync(bodyPath), finalUrl: current };
      if (![301, 302, 303, 307, 308].includes(status)) throw new Error(`Unexpected HTTP ${status}: ${current}`);
      const location = headers.match(/^location:\s*(.+)$/im)?.[1]?.trim();
      if (!location) throw new Error(`Redirect without Location: ${current}`);
      current = new URL(location, current).href;
    }
    throw new Error(`Too many redirects: ${url}`);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

/** @param {string} relative @returns {{path: string, sha256: string, bytes: number}} */
function artifact(relative) {
  const bytes = fs.readFileSync(path.join(DEST, relative));
  return { path: relative, sha256: sha256(bytes), bytes: bytes.length };
}

/** @param {string} original @returns {{artifacts: ReturnType<typeof artifact>[], provenance: object, text: string}} */
function extractPdf(original) {
  const stem = original.replace(/^originals\//, '').replace(/\.pdf$/i, '');
  const layout = `extracted/${stem}.layout.txt`;
  const reading = `extracted/${stem}.txt`;
  fs.mkdirSync(path.dirname(path.join(DEST, reading)), { recursive: true });
  const absolute = path.join(DEST, original);
  execFileSync('pdftotext', ['-enc', 'UTF-8', '-layout', absolute, path.join(DEST, layout)]);
  execFileSync('pdftotext', ['-enc', 'UTF-8', absolute, path.join(DEST, reading)]);
  const text = fs.readFileSync(path.join(DEST, layout), 'utf8');
  if (!text.trim()) throw new Error(`Empty PDF extraction (OCR required): ${original}`);
  const info = execFileSync('pdfinfo', [absolute], { encoding: 'utf8' });
  const excludedPages = text.split('\f').flatMap((page, index) => /©|all rights reserved|excluded from our/i.test(page) ? [{ page: index + 1, evidence: licensingEvidence(page) }] : []);
  return { artifacts: [artifact(reading), artifact(layout)], text,
    excludedPages,
    provenance: { tool: 'pdftotext', modes: ['-enc UTF-8', '-enc UTF-8 -layout'], pages: Number(info.match(/^Pages:\s+(\d+)/m)?.[1]), figures: 'Complete original PDF retained; text is not a replacement for diagrams, formulas or slide layout.' } };
}

// Read each ZIP entry without executing code or trusting archive paths/symlinks.
const ZIP_READER = `import zipfile,sys,json,base64,stat
with zipfile.ZipFile(sys.argv[1]) as archive:
 entries=[]
 if sum(i.file_size for i in archive.infolist()) > 100*1024*1024: raise ValueError('ZIP expansion exceeds 100 MiB')
 for i in archive.infolist():
  if i.is_dir(): continue
  if i.filename.startswith('/') or '..' in i.filename.split('/') or '\\\\' in i.filename or stat.S_ISLNK(i.external_attr >> 16): raise ValueError('Unsafe ZIP member: '+i.filename)
  if i.file_size > 32*1024*1024: raise ValueError('ZIP member exceeds 32 MiB')
  entries.append({'name':i.filename,'data':base64.b64encode(archive.read(i)).decode('ascii')})
 print(json.dumps(entries))`;

/** @param {string} original @returns {object[]} */
function extractZip(original) {
  const entries = JSON.parse(execFileSync('python3', ['-c', ZIP_READER, path.join(DEST, original)], { encoding: 'utf8', maxBuffer: 150 * 1024 * 1024 }));
  if (!Array.isArray(entries)) throw new Error(`Invalid ZIP inventory: ${original}`);
  return entries.map((entry) => {
    if (typeof entry.name !== 'string' || typeof entry.data !== 'string') throw new Error('Invalid ZIP member');
    const bytes = Buffer.from(entry.data, 'base64');
    const relative = save(`${original.replace(/\.zip$/i, '.members')}/${entry.name}`, bytes);
    const metadata = /__MACOSX|\.DS_Store|(?:^|\/)\._/.test(entry.name);
    const textual = !metadata && /\.(?:py|txt|csv|md|json)$/i.test(entry.name);
    const text = textual ? bytes.toString('utf8') : '';
    const thirdPartyCode = /ripped from|pulled from|stackoverflow\.com/i.test(text);
    let extracted = !metadata && /\.pdf$/i.test(entry.name) ? extractPdf(relative) : null;
    if (!metadata && /\.docx$/i.test(entry.name)) {
      const documentText = execFileSync('python3', ['-c', `import zipfile,sys,xml.etree.ElementTree as ET
with zipfile.ZipFile(sys.argv[1]) as archive:
 root=ET.fromstring(archive.read('word/document.xml'))
 ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
 for p in root.findall('.//w:p',ns):
  print(''.join(n.text or '' if n.tag.endswith('}t') else '\\t' if n.tag.endswith('}tab') else '\\n' if n.tag.endswith('}br') else '' for n in p.iter()))`, path.join(DEST, relative)], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
      if (!documentText.trim()) throw new Error(`Empty DOCX extraction: ${relative}`);
      const textPath = save(relative.replace(/^originals\//, 'extracted/').replace(/\.docx$/i, '.txt'), documentText);
      extracted = { text: documentText, artifacts: [artifact(textPath)], provenance: { tool: 'Python zipfile + ElementTree', method: 'word/document.xml paragraph order, text runs, line breaks and tabs; original DOCX preserves styles and embedded figures' } };
    }
    return { ...artifact(relative), archiveMember: entry.name, parentArchive: original,
      sourceUrl: `${COURSE}${path.basename(original)}#member=${encodeURIComponent(entry.name)}`,
      license: thirdPartyCode ? null : LICENSE,
      licensingNotes: thirdPartyCode ? 'Stack Overflow-derived helper code explicitly credited in source; independent attribution/license-version verification required. Do not translate or publish under OCW default.' : 'OCW default excludes third-party exceptions; originals retain all notices.',
      extraction: { tool: 'Python standard-library zipfile; no execution', ...(extracted?.provenance || {}) },
      readable: textual ? relative : extracted?.artifacts[0]?.path || null,
      extracted: extracted?.artifacts || [], licensingEvidence: licensingEvidence(text || extracted?.text || ''),
      translationStatus: metadata ? 'archive-metadata-only' : thirdPartyCode ? 'third-party-code-license-verification-required' : /\.(?:csv|txt)$/i.test(entry.name) ? 'data-fixture-preserve-verbatim-not-for-translation' : 'OCW-default-text-review-embedded-third-party-figures' };
  });
}

/** @returns {void} */
export function main() {
  const flags = process.argv.slice(2);
  if (flags.some((flag) => flag !== '--refresh')) throw new Error('Usage: node scripts/import-mit-6100l.mjs [--refresh]');
  fs.mkdirSync(DEST, { recursive: true });
  const previousPath = path.join(DEST, 'manifest.json');
  const previous = fs.existsSync(previousPath) ? JSON.parse(fs.readFileSync(previousPath, 'utf8')) : { inventory: [] };
  const cached = new Map(previous.inventory.map((item) => [item.url, item]));
  const journalPath = path.join(DEST, 'download-cache.json');
  const journal = fs.existsSync(journalPath) ? JSON.parse(fs.readFileSync(journalPath, 'utf8')) : {};
  for (const [url, item] of Object.entries(journal)) cached.set(url, item);
  const queue = new Set([COURSE, TERMS]);
  const inventory = new Map();
  const lectures = [];
  const externalLinks = new Map();
  const versionResult = spawnSync('pdftotext', ['-v'], { encoding: 'utf8' });
  if (versionResult.status !== 0) throw new Error(`pdftotext unavailable: ${versionResult.error?.message || versionResult.stderr}`);
  const version = `${versionResult.stdout}${versionResult.stderr}`.trim();
  for (const url of queue) {
    if (inventory.has(url)) continue;
    if (MEDIA.test(url)) {
      inventory.set(url, { url, kind: 'media-reference', original: null, sha256: null, downloaded: false, reason: 'Video/audio intentionally not downloaded', license: LICENSE });
      continue;
    }
    const relative = originalPath(url);
    const target = path.join(DEST, relative);
    const old = cached.get(url);
    const reuse = !flags.includes('--refresh') && old?.sha256 && fs.existsSync(target) && sha256(fs.readFileSync(target)) === old.sha256;
    const response = reuse ? { bytes: fs.readFileSync(target), finalUrl: old.retrievalRedirectValidation ? old.finalUrl || null : null } : downloadSource(url);
    const { bytes } = response;
    save(relative, bytes);
    const extension = path.extname(relative).toLowerCase();
    const item = { url, finalUrl: response.finalUrl, retrievalRedirectValidation: reuse ? old.retrievalRedirectValidation || 'initial-url-only-legacy-cache' : 'each-target-allowlisted', kind: extension.slice(1), original: relative, sha256: sha256(bytes), bytes: bytes.length,
      retrievedAt: reuse ? old.retrievedAt : new Date().toISOString(), license: LICENSE,
      licensingNotes: 'OCW default applies only to MIT-owned material; retain resource notices and exclude third-party exceptions from translation/publication.',
      extraction: null, extracted: [], licensingEvidence: [] };
    journal[url] = { sha256: item.sha256, retrievedAt: item.retrievedAt, finalUrl: item.finalUrl, retrievalRedirectValidation: item.retrievalRedirectValidation };
    saveJson('download-cache.json', journal);
    inventory.set(url, item);
    if (extension === '.html') {
      const document = parse(bytes.toString('utf8'));
      const content = document.querySelector('#course-content-section') || document.querySelector('.resource-page-container') || document.querySelector('main') || (url === COURSE ? document.querySelector('#course-main-content') : null) || (url === TERMS ? document.querySelector('.page-container') : null);
      if (!content) throw new Error(`Missing content selector: ${url}`);
      const html = content.toString();
      const text = readableHtml(html, url);
      const stem = relative.replace(/^originals\//, '').replace(/\.html$/, '');
      item.extracted = [artifact(save(`extracted/${stem}.txt`, text)), artifact(save(`extracted/${stem}.html`, html))];
      item.extraction = { tool: 'node-html-parser', selector: content.id ? `#${content.id}` : url === TERMS ? '.page-container' : '.resource-page-container', method: 'Content subtree HTML and structuredText with absolute links, table boundaries, separately decoded preformatted code; original HTML unchanged.' };
      item.licensingEvidence = licensingEvidence(text);
      item.links = [];
      const contentElements = new Set(content.querySelectorAll('a[href], track[src], video[data-transcriptlink], video[data-downloadlink]'));
      for (const element of document.querySelectorAll('a[href], track[src], video[data-transcriptlink], video[data-downloadlink]')) {
        for (const attribute of ['href', 'src', 'data-transcriptlink', 'data-downloadlink']) {
          const value = element.getAttribute(attribute);
          if (!value) continue;
          const link = sourceUrl(value, url);
          if (link && link !== `${COURSE}download` && (link.endsWith('/') || FILES.test(link) || MEDIA.test(link))) {
            queue.add(link);
            if (contentElements.has(element)) item.links.push({ url: link, label: element.text.trim(), attribute });
          }
          else if (!link && /^https?:/.test(value) && contentElements.has(element)) {
            const external = new URL(value, url).href;
            const references = externalLinks.get(external) || [];
            references.push({ source: url, label: element.text.trim() });
            externalLinks.set(external, references);
          }
        }
      }
      const lectureMatch = url.match(/\/pages\/lecture-(\d+)-/);
      if (lectureMatch) {
        const sections = [];
        let section = { heading: 'Topics and video', text: '', resources: [] };
        for (const child of content.childNodes) {
          if (child.tagName && /^H[1-6]$/.test(child.tagName)) {
            sections.push(section);
            section = { heading: child.text.trim(), text: '', resources: [] };
          } else {
            section.text += readableHtml(child.toString(), url);
            if (child.querySelectorAll) {
              for (const anchor of child.querySelectorAll('a[href], track[src]')) {
                const link = sourceUrl(anchor.getAttribute('href') || anchor.getAttribute('src') || '', url);
                if (link) section.resources.push({ url: link, label: anchor.text.trim(), kind: anchor.tagName === 'TRACK' ? 'captions' : 'link' });
              }
            }
          }
        }
        sections.push(section);
        const video = content.querySelector('video');
        lectures.push({ number: Number(lectureMatch[1]), url,
          title: document.querySelector('title')?.text.split('|')[0].trim(),
          sections, transcript: video?.getAttribute('data-transcriptlink') ? sourceUrl(video.getAttribute('data-transcriptlink'), url) : null,
          video: video?.getAttribute('data-downloadlink') ? sourceUrl(video.getAttribute('data-downloadlink'), url) : null,
          youtubeEmbed: content.querySelector('iframe[src]')?.getAttribute('src') || null });
      }
    } else if (extension === '.pdf') {
      if (!bytes.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error(`Invalid PDF: ${url}`);
      const extracted = extractPdf(relative);
      item.extracted = extracted.artifacts;
      item.extraction = extracted.provenance;
      item.licensingEvidence = licensingEvidence(extracted.text);
      item.licensingReview = { status: extracted.excludedPages.length ? 'text-translation-only-exclude-third-party-figures' : 'OCW-default-no-exception-notice-detected',
        note: RESOURCE_EXCEPTIONS[path.basename(relative)] || 'No resource-specific exception detected in extracted text; visually check originals before publishing figures.',
        excludedPages: extracted.excludedPages, originalUse: 'Archival reference only; do not publish mixed-rights originals unchanged.' };
    } else if (extension === '.zip') {
      item.members = extractZip(relative);
      item.extraction = { tool: 'Python standard-library zipfile', method: 'Validated individual member reads; original ZIP retained; archive metadata not translation input.' };
    } else if (['.py', '.txt', '.csv', '.webvtt', '.vtt', '.srt'].includes(extension)) {
      const text = bytes.toString('utf8');
      item.licensingEvidence = licensingEvidence(text);
      const readable = ['.webvtt', '.vtt'].includes(extension) ? readableVtt(text) : text;
      item.extracted = [artifact(save(`extracted/${path.basename(relative)}.txt`, readable))];
      item.extraction = { tool: 'Node.js UTF-8 decoder', method: readable === text ? 'Verbatim text; no code execution' : 'WebVTT cue text; timestamps retained in original' };
    }
    process.stdout.write(`Ingested ${url}\n`);
  }
  lectures.sort((left, right) => left.number - right.number);
  if (lectures.length !== 26 || lectures.some((lecture, index) => lecture.number !== index + 1 || !lecture.transcript)) throw new Error('Expected 26 sequential lectures with transcripts');
  for (const lecture of lectures) {
    for (const section of lecture.sections) {
      for (const resource of section.resources) {
        const entry = inventory.get(resource.url);
        if (!entry) throw new Error(`Missing lecture resource: ${resource.url}`);
        resource.original = entry.original;
        resource.downloads = (entry.links || []).filter((link) => FILES.test(link.url)).map((link) => ({ url: link.url, original: inventory.get(link.url)?.original, extracted: inventory.get(link.url)?.extracted || [] }));
      }
    }
  }
  const manifest = { schemaVersion: 1, course: { url: COURSE, number: '6.100L', term: 'Fall 2022', instructor: 'Dr. Ana Bell', publisher: 'MIT OpenCourseWare' },
    licensing: { default: LICENSE, terms: TERMS, attribution: `Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, ${COURSE}. License: CC BY-NC-SA 4.0.`,
      adaptationRequirements: ['Credit MIT OCW and credited authors', 'Link original course and license', 'Identify translation and modifications; no MIT endorsement', 'Noncommercial use', 'Share adaptations under CC BY-NC-SA 4.0', 'Third-party material is not relicensed by the OCW default'],
      exclusions: ['Guttag textbook: reading assignments only; book and external code/errata not downloaded or licensed by OCW.', 'External linked sites: references only, no permission inferred.', 'Resource-specific third-party notices override OCW default. Review licensingEvidence and originals before translating embedded figures or quoted material.', 'Course-cover photo: Arthur T. LaBar on Flickr, CC BY (version unspecified by course); not downloaded.', 'Problem Set 2 and 3 student test helpers credit Stack Overflow snippets; those files are held for independent license/version and attribution verification.'] },
    extractionEnvironment: { node: process.version, pdftotext: version, pdfinfo: 'Poppler pdfinfo', archives: 'python3 zipfile' },
    constraints: ['No media downloads', 'No translations, library.json, UI or shared structure changes', 'Original PDFs preserve figures; no raster renders required for preservation', 'Readable extracts are translation inputs, not automatic copyright clearance', 'Default rerun verifies cached original hashes; --refresh refetches sources; manifest published only after successful complete run'],
    lectures, resourceExceptions: Object.entries(RESOURCE_EXCEPTIONS).map(([filename, note]) => ({ url: COURSE + filename, note, excludedPages: inventory.get(COURSE + filename)?.licensingReview?.excludedPages || [], action: 'Exclude marked third-party figures from translation/publication; retain only as archival reference' })),
    readyToTranslate: [...inventory.values()].flatMap((item) => (item.extracted || []).filter((entry) => entry.path.endsWith('.txt') && !entry.path.endsWith('.layout.txt')).map((entry) => ({ path: entry.path, source: item.url, status: item.licensingReview?.status || 'OCW-default-text-only', constraints: 'Translate MIT-authored text, retain code; do not reuse excluded figures or external textbook content.' }))),
    archiveTranslationInputs: [...inventory.values()].flatMap((item) => (item.members || []).filter((member) => member.readable && member.translationStatus === 'OCW-default-text-review-embedded-third-party-figures').map((member) => ({ path: member.readable, source: item.url, archiveMember: member.archiveMember, status: member.translationStatus, constraints: 'Translate MIT-authored prose/comments only; preserve code and fixtures. Check original PDF/DOCX before reusing figures.' }))),
    thirdPartyCodeHolds: [...inventory.values()].flatMap((item) => (item.members || []).filter((member) => member.translationStatus === 'third-party-code-license-verification-required').map((member) => ({ path: member.path, source: item.url, archiveMember: member.archiveMember, evidence: member.licensingEvidence, action: member.licensingNotes }))),
    externalReferences: [...externalLinks].map(([url, references]) => ({ url, references, downloaded: false, licensing: 'External rights not assumed' })),
    inventory: [...inventory.values()].sort((left, right) => left.url.localeCompare(right.url)) };
  const records = manifest.inventory;
  const members = records.flatMap((item) => item.members || []);
  manifest.summary = { inventoryUrls: records.length, downloadedOriginals: records.filter((item) => item.original).length,
    byKind: Object.fromEntries([...new Set(records.map((item) => item.kind))].sort().map((kind) => [kind, records.filter((item) => item.kind === kind).length])),
    archiveMembers: members.length, archiveMetadata: members.filter((member) => member.translationStatus === 'archive-metadata-only').length,
    extractedArtifacts: records.reduce((count, item) => count + (item.extracted?.length || 0), 0) + members.reduce((count, member) => count + member.extracted.length, 0),
    readyTextInputs: manifest.readyToTranslate.length, archiveTranslationInputs: manifest.archiveTranslationInputs.length,
    thirdPartyCodeHolds: manifest.thirdPartyCodeHolds.length,
    sourceBytes: records.reduce((count, item) => count + (item.bytes || 0), 0) };
  saveJson('manifest.json', manifest);
  process.stdout.write(`Inventory: ${inventory.size} URLs; ${lectures.length} lectures. Manifest: content-src/mit-6100l/manifest.json\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
