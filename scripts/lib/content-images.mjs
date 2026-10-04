import fs from 'node:fs';
import { decode } from './html-to-markdown.mjs';

/** @param {string} cataloguePath @param {string} base @returns {(html: string) => string} */
export function createImageResolver(cataloguePath, base) {
  const catalogue = fs.existsSync(cataloguePath) ? JSON.parse(fs.readFileSync(cataloguePath, 'utf8')) : {};
  return (html) => html.replace(/<img\b[^>]*>/gi, (tag) => tag.replace(/\bsrc\s*=\s*(["'])(.*?)\1/i, (attribute, quote, src) => {
    const asset = catalogue[decode(src).trim()];
    return asset ? `src=${quote}${base}${asset.local}${quote}` : attribute;
  }));
}
