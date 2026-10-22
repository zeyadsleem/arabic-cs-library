# router--installation — Installation

- الفرع: origin/app-init
- الأساس: origin/main
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## لا يغيّر هذا الدرس أي ملف؛ استخدم لقطة الفرع أدناه

## الشيفرة الكاملة عند الفرع `app-init`

### `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
    }),
    react(),
    tailwindcss(),
  ],
});
```
