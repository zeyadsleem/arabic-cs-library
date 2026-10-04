import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * The path the site is served from, taken from the repository name.
 *
 * The project is published as a GitHub Pages *project* site, so every internal
 * link has to carry the repository name in front of it. Reading it from the
 * origin remote keeps the generators, the deployment script and the tests
 * agreeing on one answer without anyone having to remember to export
 * `BASE_PATH` — which is how committed build output once lost the prefix and
 * shipped links that 404 in production.
 *
 * @returns {string} for example `/arabic-cs-library`, or `''` when unknown
 */
export function deployedBase() {
  try {
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
    return match ? `/${match[2]}` : '';
  } catch {
    return '';
  }
}

/**
 * @returns {string} `BASE_PATH` when it is set, otherwise the deployment base
 */
export function resolveBasePath() {
  const configured = process.env.BASE_PATH;
  if (configured !== undefined) return configured.replace(/\/$/, '');
  return deployedBase();
}