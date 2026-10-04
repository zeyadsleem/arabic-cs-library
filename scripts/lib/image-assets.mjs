import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
const curl = promisify(execFile);

/** @param {Buffer} bytes @returns {string} */
export function imageType(bytes) {
  if (bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP') return 'webp';
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'jpg';
  if (/^GIF8[79]a/.test(bytes.subarray(0, 6).toString())) return 'gif';
  if (/<svg[\s>]/i.test(bytes.subarray(0, 4000).toString('utf8'))) return 'svg';
  if (bytes.subarray(4, 8).toString() === 'ftyp' && /avif|avis/.test(bytes.subarray(8, 32).toString())) return 'avif';
  return 'invalid';
}

/** @param {string} url @returns {Promise<Buffer>} */
export async function fetchImage(url) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error(`Unsupported image URL: ${url}`);
      const result = await curl('curl', ['--fail', '-sSL', '--compressed', '--proto', '=http,https', '--proto-redir', '=http,https', '--connect-timeout', '10', '--max-time', '40', url], { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
      const bytes = result.stdout;
      if (imageType(bytes) === 'invalid') throw new Error(`Downloaded file is not an image: ${url}`);
      return bytes;
    } catch (error) {
      failure = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * 1000));
    }
  }
  throw failure;
}

/** Encode bytes as real, lossless WebP. Never rename failed downloads to an image.
 * @param {Buffer} bytes @param {string} target @returns {void}
 */
export function writeWebp(bytes, target) {
  if (imageType(bytes) === 'invalid') throw new Error(`Not an image: ${target}`);
  const encoded = execFileSync('magick', ['-', '-strip', '-define', 'webp:lossless=true', 'webp:-'], {
    input: bytes, maxBuffer: 64 * 1024 * 1024, timeout: 60_000,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  if (imageType(encoded) !== 'webp') throw new Error(`WebP encoding failed: ${target}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, encoded);
}

/** @param {string} source @param {string} target @returns {void} */
export function convertToWebp(source, target) {
  writeWebp(fs.readFileSync(source), target);
  if (source !== target) fs.rmSync(source, { force: true });
}
