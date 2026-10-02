import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(await fs.readFile(path.join(root, 'src/lib/tour/source.json'), 'utf8'));
const originals = path.join(root, 'content-src/go-tour');
const translations = path.join(root, 'src/lib/tour/translations');
await fs.mkdir(originals, { recursive: true });
await fs.mkdir(translations, { recursive: true });
for (const [id, lesson] of Object.entries(source)) {
  const text = JSON.stringify({
    Title: lesson.Title,
    Description: lesson.Description,
    Pages: lesson.Pages.map(({ Title, Content }) => ({ Title, Content }))
  }, null, 2) + '\n';
  await fs.writeFile(path.join(originals, `${id}.json`), text);
  // This readable companion omits trailing layout spaces. Canonical JSON above
  // retains the source HTML and code byte-for-byte for translation validation.
  const readable = `MODULE TITLE: ${lesson.Title}\nMODULE DESCRIPTION: ${lesson.Description}\n\n` +
    lesson.Pages.map((page, index) => `PAGE ${index + 1} TITLE: ${page.Title}\n${page.Content}\nEND PAGE ${index + 1}\n`).join('\n');
  await fs.writeFile(path.join(originals, `${id}.txt`), readable.replace(/[ \t]+$/gm, ''));
  try {
    await fs.writeFile(path.join(translations, `${id}.json`), text, { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  console.log(`${id}: ${lesson.Pages.length} pages prepared`);
}
