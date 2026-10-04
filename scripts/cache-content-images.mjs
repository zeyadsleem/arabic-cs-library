import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { fetchImage, imageType, writeWebp } from './lib/image-assets.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/opencode/content-audit.json', 'utf8'));
const catalogPath = path.join(root, 'content/image-assets.json');
const catalog = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath, 'utf8')) : {};
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/generated/manifest.json'), 'utf8'));
const books = new Map(manifest.books.map((book) => [book.id, book]));
const pending = [...new Map(report.remoteImages.map((reference) => [reference.src, reference])).values()];
const failed = [];
let count = 0, reused = 0, cursor = 0;
async function worker() {
  while (cursor < pending.length) {
    const reference = pending[cursor++];
    const url = reference.src;
    if (catalog[url] && fs.existsSync(path.join(root, 'static', catalog[url].local))) continue;
    try {
      const pathname = decodeURIComponent(new URL(url).pathname).replace(/^\/arabic-cs-library(?=\/images\/)/, '');
      if (pathname.startsWith(`/images/${reference.book}/`)) {
        const file = path.join(root, 'static', pathname);
        if (fs.existsSync(file) && imageType(fs.readFileSync(file)) !== 'invalid') {
          catalog[url] = {
            local: pathname, source: books.get(reference.book)?.sourceUrl,
            recoveredFrom: 'Local asset incorrectly externalized by the link importer',
            sha256: createHash('sha256').update(fs.readFileSync(file)).digest('hex')
          };
          fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
          reused++;
          continue;
        }
      }
      const bytes = await fetchImage(url);
      const kind = imageType(bytes);
      const hash = createHash('sha256').update(url).digest('hex').slice(0, 16);
      const extension = ['svg', 'gif'].includes(kind) ? kind : 'webp';
      const local = `/images/${reference.book}/remote-${hash}.${extension}`;
      const file = path.join(root, 'static', local);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      if (extension === 'webp') writeWebp(bytes, file);
      else fs.writeFileSync(file, bytes);
      catalog[url] = { local, source: url, sha256: createHash('sha256').update(bytes).digest('hex') };
      fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
      count++;
      console.log(`Cached ${reference.book}: ${url}`);
    } catch (error) {
      failed.push({ ...reference, error: error.message });
      console.error(`Cannot cache ${url}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 4 }, () => worker()));
fs.writeFileSync('/tmp/opencode/remote-image-failures.json', JSON.stringify(failed, null, 2) + '\n');
console.log(`Cached ${count} original images; recovered ${reused} wrongly externalized local references; failures ${failed.length}.`);
if (failed.length) process.exitCode = 1;
