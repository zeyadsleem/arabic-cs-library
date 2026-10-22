---
title: "سكربتات البناء والتطوير"
---

## سكربتات البناء والتطوير

أضف هذه السكربتات إلى ملف `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src/**/*.{ts,tsx,js,jsx,json,css,md}"
  }
}
```

أنشئ ملف `vite.config.ts` بسيطًا:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
```
