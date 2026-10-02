import { base } from '$app/paths';

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @param {string} path
 * @returns {string}
 */
export const withBasePath = (path) => {
  if (!base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
};

/**
 * @param {string | null | undefined} html
 * @returns {string | null | undefined}
 */
export const withBase = (html) => {
  if (!html || !base) return html;
  const prefix = base.replace(/^\//, '');
  const already = new RegExp(`^(?:/${escape(prefix)}/|/)`, 'i');
  return html.replace(/(src|href)="(\/[^"]*)"/g, (match, attribute, value) => {
    if (already.test(value)) return match;
    return `${attribute}="${base}${value}"`;
  });
};
