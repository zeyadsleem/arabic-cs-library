import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { goPlaygroundGateway } from './scripts/lib/go-playground-gateway.mjs';

export default defineConfig({
  plugins: [goPlaygroundGateway(), sveltekit()],
});
