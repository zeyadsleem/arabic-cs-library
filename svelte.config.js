import adapter from '@sveltejs/adapter-static';
import { resolveBasePath } from './scripts/lib/base-path.mjs';

const base = resolveBasePath();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base,
      relative: true,
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'ignore',
      handleInvalidUrl: 'ignore',
    },
  },
};

export default config;
