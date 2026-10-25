---
title: "تحسين Vite مع React وTypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/vite-react-typescript-optimization"
---

أحدثت Vite ثورة في تطوير React بفضل الاستبدال الساخن السريع كالبرق والبناءات المحسّنة. لكنك حين تجمع Vite مع TypeScript وReact، تنفتح أمامك دنيا كاملة من فرص التحسين التي تجعل تجربة تطويرك أفضل وأحزم إنتاجك أصغر. من فحص الأنواع على التوازي إلى استراتيجيات تقسيم الشيفرة المثلى، دعنا نستكشف كيف تعصر كل ذرة أداء من إعداد Vite وReact وTypeScript لديك.

فكّر في Vite كفريق صيانة في سباقات الفورمولا 1 لتطبيق React الخاص بك. إنه سريع بالفعل، لكن مع الضبط الصحيح وإعدادات TypeScript المناسبة، يمكنك جعله يطير حقًا.

## فهم بنية Vite

قبل أن نحسّن، دعنا نفهم كيف تتعامل Vite مع TypeScript وReact بشكل مختلف عن أدوات التجميع التقليدية.

### مقاربة Vite ذات المرحلتين

```typescript
// vite.config.ts - Understanding the architecture
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Development: Native ESM, no bundling
  server: {
    // Vite serves TypeScript files directly to the browser
    // Browser requests .tsx files, Vite transpiles on-demand
  },

  // Production: Rollup-based bundling
  build: {
    // TypeScript is stripped, code is bundled and optimized
  },
});
```

الرؤية الجوهرية: لا تفحص Vite الأنواع أثناء التطوير افتراضيًا. إنها تحوّل TypeScript بإزالة الأنواع، ولهذا هي بهذه السرعة.

## تحسين تجربة التطوير

لنبدأ بجعل التطوير فائق السرعة مع الحفاظ على سلامة الأنواع.

### فحص الأنواع على التوازي

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react({
      // Use SWC for faster transpilation
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          // Only include essential babel plugins
        ],
      },
    }),

    // Run TypeScript checking in a separate process
    checker({
      typescript: true,
      overlay: {
        initialIsOpen: false,
        position: 'br',
      },
      terminal: true,
      enableBuild: true,
    }),
  ],

  server: {
    warmup: {
      // Pre-transform frequently used files
      clientFiles: ['./src/main.tsx', './src/App.tsx', './src/components/**/*.tsx'],
    },
  },
});
```

### ملف TSConfig محسّن لـ Vite

```json
// tsconfig.json
{
  "compilerOptions": {
    // Performance optimizations
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // React configuration
    "jsx": "react-jsx",
    "jsxImportSource": "react",

    // Type checking options
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    // Speed optimizations
    "skipLibCheck": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",

    // Path mapping for cleaner imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    },

    // Vite specific
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src", "vite.config.ts"],
  "exclude": ["node_modules", "dist", "build"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### إعداد Fast Refresh

```typescript
// vite.config.ts - Optimized Fast Refresh
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      // Exclude files from Fast Refresh
      exclude: [/\.stories\.(t|j)sx?$/, /\.test\.(t|j)sx?$/],
      // Include files for Fast Refresh
      include: '**/*.{jsx,tsx}',
    }),
  ],

  // Optimize dependency pre-bundling
  optimizeDeps: {
    // Force include dependencies that Vite might miss
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    // Exclude large dependencies from pre-bundling
    exclude: ['@faker-js/faker'],
    // Use esbuild for faster pre-bundling
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
```

## تكامل متقدم مع TypeScript

لنستفد من TypeScript لتحسينات أفضل في Vite.

### متغيرات بيئة آمنة من حيث الأنواع

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_PUBLIC_KEY: string;
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type-safe env helper
// src/utils/env.ts
export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appTitle: import.meta.env.VITE_APP_TITLE,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
} as const;

// Validate env at startup
export function validateEnv(): void {
  const required = ['VITE_API_URL', 'VITE_PUBLIC_KEY'];

  for (const key of required) {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
```

### أنواع الاستيراد الديناميكي

```typescript
// src/utils/dynamic-imports.ts
// Type-safe dynamic imports with Vite

type ModuleLoader<T> = () => Promise<{ default: T }>;

interface RouteModule {
  Component: React.ComponentType;
  loader?: () => Promise<unknown>;
  ErrorBoundary?: React.ComponentType;
}

// Vite-specific glob imports with TypeScript
const routeModules = import.meta.glob<RouteModule>(
  '/src/routes/**/*.tsx',
  { eager: false }
);

export async function loadRoute(path: string): Promise<RouteModule> {
  const loader = routeModules[`/src/routes${path}.tsx`];

  if (!loader) {
    throw new Error(`Route not found: ${path}`);
  }

  return await loader();
}

// Type-safe lazy loading with error boundaries
export function lazyWithErrorBoundary<T extends React.ComponentType<any>>(
  loader: ModuleLoader<T>,
  ErrorFallback?: React.ComponentType<{ error: Error }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await loader();
    } catch (error) {
      console.error('Failed to load module:', error);

      if (ErrorFallback) {
        return {
          default: ((props: any) => (
            <ErrorFallback error={error as Error} />
          )) as T,
        };
      }

      throw error;
    }
  });
}
```

## تحسين بناء الإنتاج

حسّن بناءات الإنتاج لديك لأقصى أداء.

### إعداد بناء متقدم

```typescript
// vite.config.ts - Production optimizations
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    splitVendorChunkPlugin(),

    // Compress assets
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),

    // Bundle analyzer
    mode === 'analyze' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: mode === 'development',

    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunking strategy
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react';
          }

          // UI libraries
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'ui';
          }

          // Utilities
          if (id.includes('lodash') || id.includes('date-fns')) {
            return 'utils';
          }

          // Large dependencies
          if (id.includes('monaco-editor') || id.includes('codemirror')) {
            return 'editor';
          }

          // Default vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },

        // Asset naming
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },

        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop() || 'asset';
          const folder = /\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')
            ? 'images'
            : /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')
              ? 'fonts'
              : 'assets';
          return `${folder}/[name]-[hash][extname]`;
        },
      },

      // Tree shaking
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // CSS code splitting
    cssCodeSplit: true,

    // Preload strategy
    modulePreload: {
      polyfill: true,
    },
  },
}));
```

### تقسيم ذكي للشيفرة

```typescript
// src/utils/code-splitting.ts
import { lazy, ComponentType } from 'react';

interface SplitConfig {
  prefetch?: boolean;
  preload?: boolean;
  chunkName?: string;
}

// Webpack magic comments for Vite
export function splitComponent<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  config: SplitConfig = {},
): React.LazyExoticComponent<T> {
  // Add magic comments for bundler hints
  const enhancedLoader = () => {
    if (config.prefetch) {
      // Prefetch the chunk
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'script';
      // This would need actual chunk URL
      document.head.appendChild(link);
    }

    return loader();
  };

  return lazy(enhancedLoader);
}

// Route-based code splitting with TypeScript
interface RouteConfig {
  path: string;
  component: ComponentType;
  children?: RouteConfig[];
  preload?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: splitComponent(() => import('./pages/Home'), { prefetch: true }),
  },
  {
    path: '/dashboard',
    component: splitComponent(() => import('./pages/Dashboard'), { preload: true }),
    children: [
      {
        path: 'analytics',
        component: splitComponent(() => import('./pages/Dashboard/Analytics')),
      },
    ],
  },
];
```

## تحسين CSS والأصول

حسّن CSS والأصول بدعم من TypeScript.

### وحدات CSS مع TypeScript

```typescript
// vite.config.ts - CSS Modules configuration
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});

// Generate TypeScript definitions for CSS Modules
// typed-css-modules.ts
import { Plugin } from 'vite';
import { writeFileSync, existsSync } from 'fs';

export function cssModulesTypescript(): Plugin {
  return {
    name: 'css-modules-typescript',
    async transform(code, id) {
      if (!id.endsWith('.module.css') && !id.endsWith('.module.scss')) {
        return null;
      }

      // Parse CSS and generate types
      const classNames = extractClassNames(code);
      const dts = generateTypeDefinitions(classNames);

      const dtsPath = id.replace(/\.(css|scss)$/, '.d.ts');
      writeFileSync(dtsPath, dts);

      return null;
    },
  };
}

function extractClassNames(css: string): string[] {
  const regex = /\.([a-zA-Z][a-zA-Z0-9-_]*)/g;
  const matches = css.matchAll(regex);
  return [...new Set([...matches].map((m) => m[1]))];
}

function generateTypeDefinitions(classNames: string[]): string {
  const exports = classNames.map((name) => `  readonly ${name}: string;`).join('\n');

  return `declare const styles: {
${exports}
};
export default styles;
`;
}
```

### تحسين الصور

```typescript
// vite.config.ts - Image optimization
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: { quality: 80 },
    }),
  ],
});

// Type-safe image imports
// src/types/images.d.ts
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
}: ResponsiveImageProps) {
  // Generate srcset with Vite's image transformation
  const srcset = `
    ${src}?w=640 640w,
    ${src}?w=768 768w,
    ${src}?w=1024 1024w,
    ${src}?w=1280 1280w
  `;

  return (
    <img
      src={src}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      loading={loading}
    />
  );
}
```

## مراقبة الأداء

تتبّع أداء تطبيق Vite الخاص بك وحسّنه.

### تحليل زمن البناء

```typescript
// vite-plugin-build-time.ts
import { Plugin } from 'vite';

interface BuildMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  chunks: Array<{
    name: string;
    size: number;
    modules: number;
  }>;
}

export function buildTimeAnalysis(): Plugin {
  let startTime: number;
  const metrics: BuildMetrics = {
    startTime: 0,
    endTime: 0,
    duration: 0,
    chunks: [],
  };

  return {
    name: 'build-time-analysis',

    buildStart() {
      startTime = Date.now();
      metrics.startTime = startTime;
    },

    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          metrics.chunks.push({
            name: fileName,
            size: chunk.code.length,
            modules: Object.keys(chunk.modules).length,
          });
        }
      }
    },

    closeBundle() {
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      console.log('\n📊 Build Metrics:');
      console.log(`Total time: ${metrics.duration}ms`);
      console.log('\nChunks:');
      metrics.chunks
        .sort((a, b) => b.size - a.size)
        .forEach((chunk) => {
          console.log(
            `  ${chunk.name}: ${(chunk.size / 1024).toFixed(2)}KB (${chunk.modules} modules)`,
          );
        });
    },
  };
}
```

### مراقبة أداء وقت التشغيل

```typescript
// src/utils/performance-monitor.ts
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class VitePerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};

  init(): void {
    if (typeof window === 'undefined') return;

    // Web Vitals
    this.observeWebVitals();

    // Custom metrics
    this.measureBundleLoadTime();

    // Send metrics
    if (import.meta.env.PROD) {
      this.reportMetrics();
    }
  }

  private observeWebVitals(): void {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const firstInput = list.getEntries()[0];
      if (firstInput) {
        this.metrics.fid = firstInput.processingStart - firstInput.startTime;
      }
    }).observe({ entryTypes: ['first-input'] });
  }

  private measureBundleLoadTime(): void {
    const scripts = document.querySelectorAll('script[src]');
    const loadTimes: number[] = [];

    scripts.forEach((script) => {
      const entry = performance.getEntriesByName(
        (script as HTMLScriptElement).src,
      )[0] as PerformanceResourceTiming;

      if (entry) {
        loadTimes.push(entry.duration);
      }
    });

    console.log('Bundle load times:', loadTimes);
  }

  private reportMetrics(): void {
    // Send to analytics
    if (window.gtag) {
      Object.entries(this.metrics).forEach(([metric, value]) => {
        window.gtag('event', 'performance', {
          metric_name: metric,
          value: Math.round(value),
        });
      });
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  useEffect(() => {
    const monitor = new VitePerformanceMonitor();
    monitor.init();

    return () => {
      // Cleanup if needed
    };
  }, []);
}
```

## إضافات Vite المتقدمة

أنشئ إضافات Vite خاصة بك بـ TypeScript من أجل تحسينات محددة.

### إضافة الاستيراد التلقائي

```typescript
// vite-plugin-auto-import.ts
import { Plugin } from 'vite';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

interface AutoImportConfig {
  imports: Record<string, string[]>;
  dts?: string;
}

export function autoImport(config: AutoImportConfig): Plugin {
  const imports = new Map<string, Set<string>>();

  // Collect all imports
  for (const [module, names] of Object.entries(config.imports)) {
    names.forEach((name) => {
      if (!imports.has(name)) {
        imports.set(name, new Set());
      }
      imports.get(name)!.add(module);
    });
  }

  return {
    name: 'auto-import',

    transform(code, id) {
      if (!id.endsWith('.tsx') && !id.endsWith('.ts')) {
        return null;
      }

      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });

      const usedImports = new Map<string, string>();
      let hasChanges = false;

      // Find used identifiers
      traverse(ast, {
        Identifier(path) {
          const name = path.node.name;
          if (imports.has(name) && !path.scope.hasBinding(name)) {
            const modules = imports.get(name)!;
            const module = modules.values().next().value;
            usedImports.set(name, module);
            hasChanges = true;
          }
        },
      });

      if (!hasChanges) {
        return null;
      }

      // Add import statements
      const importStatements = Array.from(usedImports.entries())
        .map(([name, module]) => `import { ${name} } from '${module}';`)
        .join('\n');

      const { code: transformedCode } = generate(ast);

      return {
        code: `${importStatements}\n${transformedCode}`,
        map: null,
      };
    },
  };
}

// Usage in vite.config.ts
export default defineConfig({
  plugins: [
    autoImport({
      imports: {
        react: ['useState', 'useEffect', 'useMemo', 'useCallback'],
        'react-router-dom': ['useNavigate', 'useParams', 'Link'],
        '@tanstack/react-query': ['useQuery', 'useMutation'],
      },
      dts: 'src/auto-imports.d.ts',
    }),
  ],
});
```

### تحسين مكتبة المكوّنات

```typescript
// vite-plugin-component-lib.ts
import { Plugin } from 'vite';

interface ComponentLibConfig {
  components: string;
  transform?: (name: string) => string;
}

export function componentLibrary(config: ComponentLibConfig): Plugin {
  return {
    name: 'component-library',

    resolveId(id) {
      if (id.startsWith('@components/')) {
        const componentName = id.slice('@components/'.length);
        return `virtual:component:${componentName}`;
      }
      return null;
    },

    load(id) {
      if (id.startsWith('virtual:component:')) {
        const componentName = id.slice('virtual:component:'.length);
        const path = config.transform ? config.transform(componentName) : componentName;

        return `
          export { default } from '${config.components}/${path}';
          export * from '${config.components}/${path}';
        `;
      }
      return null;
    },
  };
}
```

## تحسين سير عمل التطوير

حسّن سير عمل تطويرك مع Vite وTypeScript.

### إعداد تطبيق متعدد الصفحات

```typescript
// vite.config.ts - Multi-page app
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
      },
    },
  },
});

// Type-safe page configuration
interface PageConfig {
  entry: string;
  template: string;
  title: string;
  chunks?: string[];
}

const pages: Record<string, PageConfig> = {
  main: {
    entry: 'src/main.tsx',
    template: 'index.html',
    title: 'My App',
  },
  admin: {
    entry: 'src/admin/main.tsx',
    template: 'admin/index.html',
    title: 'Admin Dashboard',
    chunks: ['react', 'ui'],
  },
};
```

### أنواع الاستبدال الساخن للوحدات

```typescript
// src/types/hmr.d.ts
interface ImportMeta {
  hot?: {
    accept: (
      deps?: string | string[] | (() => void),
      callback?: (modules: any[]) => void
    ) => void;
    dispose: (callback: () => void) => void;
    decline: () => void;
    invalidate: () => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
    data: any;
  };
}

// HMR-aware component
export function HMRComponent() {
  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      // Handle HMR update
      console.log('Component updated:', newModule);
    });

    import.meta.hot.dispose(() => {
      // Cleanup before HMR update
      console.log('Cleaning up...');
    });
  }

  return <div>HMR-enabled component</div>;
}
```

## النشر إلى الإنتاج

انشر تطبيق Vite المحسّن لديك بثقة.

### إعداد Docker

```dockerfile
# Dockerfile - Multi-stage build for Vite app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Type check
RUN npm run type-check

# Build app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### تحسين التكامل والنشر المستمر

```yaml
# .github/workflows/deploy.yml
name: Deploy Vite App

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Analyze bundle
        run: npm run build:analyze

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## المراقبة والتحليلات

تتبّع أداء تطبيق Vite الخاص بك في الإنتاج.

```typescript
// src/utils/analytics.ts
interface ViteAnalytics {
  trackBuildInfo(): void;
  trackPerformance(): void;
  trackErrors(): void;
}

class ProductionAnalytics implements ViteAnalytics {
  trackBuildInfo(): void {
    // Track build metadata
    const buildInfo = {
      version: import.meta.env.VITE_APP_VERSION,
      buildTime: import.meta.env.VITE_BUILD_TIME,
      mode: import.meta.env.MODE,
    };

    console.log('Build info:', buildInfo);
  }

  trackPerformance(): void {
    // Track performance metrics
    if ('measureUserAgentSpecificMemory' in performance) {
      (performance as any).measureUserAgentSpecificMemory().then((result: any) => {
        console.log('Memory usage:', result);
      });
    }
  }

  trackErrors(): void {
    window.addEventListener('error', (event) => {
      console.error('Runtime error:', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    });
  }
}

// Initialize analytics
if (import.meta.env.PROD) {
  const analytics = new ProductionAnalytics();
  analytics.trackBuildInfo();
  analytics.trackPerformance();
  analytics.trackErrors();
}
```

## خلاصة

تحسين Vite مع React وTypeScript ليس مجرد جعل البناءات أسرع — إنه خلق تجربة تطوير سلسة إلى حد تنسى فيه أنك تستخدم أداة بناء أصلًا. من فحص الأنواع على التوازي إلى تقسيم الشيفرة الذكي، كل تحسين يتراكم مع غيره ليصنع تجربة تطوير وإنتاج فائقة السرعة.

تذكّر: ابدأ بالأساسيات (ملف tsconfig سليم، واستراتيجية تقسيم جيدة للحزم)، ثم أضف التحسينات المتقدمة حسب الحاجة. Vite سريعة أصلًا وجاهزة للعمل، لكن مع هذه التحسينات المدعومة بـ TypeScript يمكنك جعلها تطير حقًا. ستشكرك سرعة تطويرك، وسيحب مستخدموك أزمنة التحميل السريعة كالبرق.
