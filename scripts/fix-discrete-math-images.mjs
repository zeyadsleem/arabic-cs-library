import fs from 'node:fs';
import path from 'node:path';

const OUT = 'content/discrete-math';
const STATIC = 'static/images/discrete-math';
const APPLY = process.argv.includes('--apply');

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const SVG_SIGNATURE = /<(\?xml|svg)[\s>]/;

const payloadExtension = (buffer) => {
  if (buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return 'png';
  const head = buffer.subarray(0, 200).toString('utf8');
  return SVG_SIGNATURE.test(head) ? 'svg' : null;
};

const doubled = (name) => {
  const match = /^(.*)\.(png|svg)\.(png|svg|webp)$/.exec(name);
  return match ? { name, base: match[1], inner: match[2] } : null;
};

const mismatched = fs
  .readdirSync(STATIC)
  .map((name) => {
    const parts = doubled(name);
    if (!parts) return null;
    const buffer = fs.readFileSync(path.join(STATIC, name));
    const payload = payloadExtension(buffer);
    return payload && payload === parts.inner ? parts : null;
  })
  .filter(Boolean);

console.log(`${mismatched.length} files with a doubled extension`);
if (!APPLY) {
  console.log('dry-run (pass --apply to write)');
  for (const { name, base, inner } of mismatched) {
    console.log(`  ${name} -> ${base}.${inner}`);
  }
  process.exit(0);
}

for (const { name, base, inner } of mismatched) {
  const to = `${base}.${inner}`;
  fs.renameSync(path.join(STATIC, name), path.join(STATIC, to));
  console.log(`  ${name} -> ${to}`);
}

for (const file of fs.readdirSync(OUT).filter((x) => x.endsWith('.md'))) {
  const p = path.join(OUT, file);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(
    /\/images\/discrete-math\/([A-Za-z0-9_.-]+)\.(png|svg)\.(png|svg|webp)/g,
    (_all, base, inner) => `/images/discrete-math/${base}.${inner}`,
  );
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log(`  ${file}: srcs updated`);
  }
}
console.log('APPLIED');