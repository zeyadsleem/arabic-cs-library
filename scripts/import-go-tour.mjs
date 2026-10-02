import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const response = await fetch('https://go.dev/tour/lesson');
if (!response.ok) throw new Error(`Go Tour: HTTP ${response.status}`);
const lessons = await response.json();
for (const [key, lesson] of Object.entries(lessons)) {
  if (!Array.isArray(lesson.Pages)) throw new Error(`Invalid lesson: ${key}`);
  for (const page of lesson.Pages) {
    if (typeof page.Title !== 'string' || typeof page.Content !== 'string' || !Array.isArray(page.Files)) {
      throw new Error(`Invalid page in ${key}`);
    }
  }
}
await fs.mkdir(path.join(root, 'src/lib/tour'), { recursive: true });
await fs.writeFile(path.join(root, 'src/lib/tour/source.json'), JSON.stringify(lessons, null, 2) + '\n');
for (const [key, lesson] of Object.entries(lessons)) {
  console.log(key, lesson.Pages.length, lesson.Pages.map((page) => page.Title).join(' | '));
}
