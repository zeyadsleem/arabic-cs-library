---
title: "تحسين اهتزاز الشجرة"
lang: ar
source: "https://stevekinney.com/courses/react-performance/tree-shaking-optimization"
---

اهتزاز الشجرة (tree shaking) هو عملية إزالة الشيفرة الميتة من حزمتك — أي الشيفرة المستوردة لكن غير المستخدمة فعليًا. نظريًا، يبدو الأمر بسيطًا: إذا استوردت دالة ولم تنادها قط، فلا تضمّنها في الحزمة النهائية. أما عمليًا، فطبيعة JavaScript الديناميكية ووحدات CommonJS والآثار الجانبية (side effects) تجعل اهتزاز الشجرة تحسينًا معقدًا يتطلب فهم كيفية تحليل أدوات التجميع لاعتمادات شيفرتك.

والمخاطر عالية: استيراد مكتبة واحدة سيئ التحسين قد يضخّم حزمتك بمئات الكيلوبايتات. أتستورد مكتبة Lodash كاملة وأنت لا تحتاج إلا `debounce`؟ ذاك 70KB من الشيفرة غير المستخدمة. أتستورد كل أيقونات Material-UI وأنت لا تستخدم إلا خمسًا؟ ذاك أكثر من 500KB من الهدر. أتقن اهتزاز الشجرة، ولن تُرسل إلا الشيفرة التي يحتاجها مستخدموك فعلًا.

## كيف يعمل اهتزاز الشجرة

يعتمد اهتزاز الشجرة على التحليل الساكن لوحدات ES6. فتحلّل أدوات التجميع مثل Webpack وRollup وVite عبارات الاستيراد والتصدير لديك لبناء رسم بياني للاعتمادات، ثم تحذف أي تصديرات لا تُستورد في أي موضع.

```typescript
// utils.ts - Library with multiple exports
export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;
export const multiply = (a: number, b: number) => a * b;
export const divide = (a: number, b: number) => a / b;

// Also includes a large utility (pretend this is 50KB)
export const heavyFunction = () => {
  // Lots of code here...
  return 'heavy computation result';
};

// main.ts - App only uses one function
import { add } from './utils';

console.log(add(2, 3));

// Result: Only `add` function is included in bundle
// The heavy function and other math operations are eliminated
```

يعمل اهتزاز الشجرة لأن وحدات ES6 ذات **بنية ساكنة** — إذ يمكن تحديد الاستيرادات والتصديرات وقت الترجمة دون تنفيذ الشيفرة.

### عملية التحليل الساكن

```typescript
// Bundler analysis process:

// 1. Parse all modules and build dependency graph
const dependencyGraph = {
  'main.js': ['utils.js::add'],
  'utils.js': [], // No imports
};

// 2. Mark all reachable exports
const reachableExports = new Set([
  'main.js::default', // Entry point
  'utils.js::add', // Used by main.js
]);

// 3. Eliminate unreachable exports
const eliminatedExports = [
  'utils.js::subtract',
  'utils.js::multiply',
  'utils.js::divide',
  'utils.js::heavyFunction',
];
```

> **نصيحة**
>
> لا يعمل اهتزاز الشجرة إلا مع وحدات ES6 (import/export). أما وحدات CommonJS (require/module.exports) فلا يمكن تحليلها ساكنًا، فتُضمَّن دائمًا كاملة.

## إخفاقات شائعة في اهتزاز الشجرة

### المشكلة 1: استيرادات الآثار الجانبية

```typescript
// ❌ This prevents tree shaking of the entire module
import 'some-library'; // Side effect import
import { specificFunction } from 'some-library';

// Even though you only need specificFunction, the entire library
// is included because of the side effect import

// ✅ Better: Only import what you need
import { specificFunction } from 'some-library';

// ✅ Or if you need side effects, be explicit
import 'some-library/styles.css'; // Specific side effect
import { specificFunction } from 'some-library';
```

### المشكلة 2: التصديرات الافتراضية وملفات البرميل

```typescript
// ❌ Barrel files can prevent tree shaking
// components/index.ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
export { default as DataTable } from './DataTable'; // Large component

// main.ts
import { Button } from './components'; // Might import everything!

// ✅ Better: Direct imports
import { Button } from './components/Button';

// ✅ Or properly configured barrel exports
// components/index.ts - with proper tree shaking setup
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';
export { DataTable } from './DataTable';
```

### المشكلة 3: إنشاء نسخ الأصناف

```typescript
// ❌ Class instantiation can pull in entire classes
import { UtilityClass } from 'big-library';

const instance = new UtilityClass(); // Entire class included

// ✅ Better: Functional approach when possible
import { utilityFunction } from 'big-library';

const result = utilityFunction(); // Only the function included
```

## تحسين استيرادات مكتبات الأطراف الثالثة

### تحسين Lodash

```typescript
// ❌ Imports entire Lodash library (~70KB)
import _ from 'lodash';
import * as _ from 'lodash';

const debouncedFn = _.debounce(myFunction, 300);

// ✅ Import specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const debouncedFn = debounce(myFunction, 300);

// ✅ Even better: Use lodash-es for better tree shaking
import { debounce, throttle } from 'lodash-es';

// ✅ Best: Consider alternatives that are tree-shake friendly
import { debounce } from 'es-toolkit'; // Modern, smaller alternative
```

### تحسين Material-UI / MUI

```typescript
// ❌ Imports entire component library
import { Button, TextField, Dialog } from '@mui/material';

// ✅ Individual component imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

// ✅ With babel plugin for automatic optimization
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
    ],
  ],
};

// ✅ Icons optimization
// Instead of:
import { Home, Settings, User } from '@mui/icons-material';

// Use individual imports:
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import UserIcon from '@mui/icons-material/User';
```

### تحسين React Icons

```typescript
// ❌ Bad: Imports all icon sets
import { FaHome, MdSettings } from 'react-icons/fa';

// ✅ Good: Import from specific icon sets
import { FaHome } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

// ✅ Even better: Use a custom icon component
import { Icon } from './components/Icon';

// components/Icon.tsx - Lazy load icons
import { lazy } from 'react';

const iconMap = {
  home: lazy(() => import('react-icons/fa').then((icons) => ({ default: icons.FaHome }))),
  settings: lazy(() => import('react-icons/md').then((icons) => ({ default: icons.MdSettings }))),
};

export function Icon({ name, ...props }: { name: keyof typeof iconMap }) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <Suspense fallback={<div className="icon-placeholder" />}>
      <IconComponent {...props} />
    </Suspense>
  );
}
```

## تهيئة متقدّمة لاهتزاز الشجرة

### تحسين Webpack

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',

  optimization: {
    // Enable tree shaking
    usedExports: true,

    // Mark the bundle as side-effect-free
    sideEffects: false,

    // Or specify files that have side effects
    sideEffects: ['*.css', '*.scss', './src/polyfills.js', './src/registerServiceWorker.js'],

    // Advanced tree shaking options
    innerGraph: true, // Analyze dependencies within modules
    providedExports: true, // Track what each module exports

    // Minification that removes dead code
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log statements
            drop_debugger: true, // Remove debugger statements
            pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          },
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false, // Keep ES6 modules for tree shaking
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },

  resolve: {
    // Prefer module field for better tree shaking
    mainFields: ['module', 'browser', 'main'],
  },
};
```

### إعلان الآثار الجانبية في package.json

```json
{
  "name": "my-react-app",
  "sideEffects": false,

  "dependencies": {
    "pure-library": "^1.0.0",
    "side-effect-library": "^2.0.0"
  },

  "resolutions": {
    "side-effect-library": "^2.0.0"
  }
}

// For libraries you publish:
{
  "name": "my-utility-library",
  "main": "lib/index.js",
  "module": "es/index.js", // ES6 modules for better tree shaking
  "sideEffects": [
    "./src/setupGlobals.js",
    "*.css"
  ],

  "exports": {
    ".": {
      "import": "./es/index.js",
      "require": "./lib/index.js"
    },
    "./utils": {
      "import": "./es/utils.js",
      "require": "./lib/utils.js"
    }
  }
}
```

## اختبار فعالية اهتزاز الشجرة

### تحليل الحزمة لأجل اهتزاز الشجرة

```typescript
// analyze-tree-shaking.js
const fs = require('fs');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

class TreeShakingAnalyzer {
  constructor(webpackConfig) {
    this.config = webpackConfig;
  }

  async analyzeTreeShaking() {
    // Create two builds: one with tree shaking, one without
    const withTreeShaking = { ...this.config };
    const withoutTreeShaking = {
      ...this.config,
      optimization: {
        ...this.config.optimization,
        usedExports: false,
        sideEffects: undefined,
      },
    };

    const [treeShakenStats, fullStats] = await Promise.all([
      this.runBuild(withTreeShaking),
      this.runBuild(withoutTreeShaking),
    ]);

    return this.compareStats(treeShakenStats, fullStats);
  }

  runBuild(config) {
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err) reject(err);
        else resolve(stats.toJson());
      });
    });
  }

  compareStats(treeShakenStats, fullStats) {
    const treeShakenSize = this.getTotalSize(treeShakenStats);
    const fullSize = this.getTotalSize(fullStats);
    const savings = fullSize - treeShakenSize;
    const savingsPercent = (savings / fullSize) * 100;

    const moduleComparison = this.compareModules(treeShakenStats.modules, fullStats.modules);

    return {
      summary: {
        originalSize: fullSize,
        treeShakenSize: treeShakenSize,
        savings: savings,
        savingsPercent: savingsPercent,
      },
      moduleComparison,
    };
  }

  getTotalSize(stats) {
    return stats.assets
      .filter((asset) => asset.name.endsWith('.js'))
      .reduce((total, asset) => total + asset.size, 0);
  }

  compareModules(treeShakenModules, fullModules) {
    const eliminated = [];
    const kept = [];

    const treeShakenNames = new Set(treeShakenModules.map((m) => m.name));

    fullModules.forEach((module) => {
      if (treeShakenNames.has(module.name)) {
        kept.push({
          name: module.name,
          size: module.size,
          reasons: module.reasons?.map((r) => r.moduleName) || [],
        });
      } else {
        eliminated.push({
          name: module.name,
          size: module.size,
          potentialSavings: module.size,
        });
      }
    });

    return {
      eliminated: eliminated.sort((a, b) => b.size - a.size),
      kept: kept.sort((a, b) => b.size - a.size),
    };
  }
}

// Usage
async function analyzeTreeShaking() {
  const analyzer = new TreeShakingAnalyzer(require('./webpack.config.js'));
  const analysis = await analyzer.analyzeTreeShaking();

  console.log('🌳 Tree Shaking Analysis Results\n');

  console.log(`📊 Bundle Size Comparison:`);
  console.log(`   Original: ${(analysis.summary.originalSize / 1024).toFixed(1)}KB`);
  console.log(`   Tree-shaken: ${(analysis.summary.treeShakenSize / 1024).toFixed(1)}KB`);
  console.log(
    `   Savings: ${(analysis.summary.savings / 1024).toFixed(1)}KB (${analysis.summary.savingsPercent.toFixed(1)}%)`,
  );

  if (analysis.moduleComparison.eliminated.length > 0) {
    console.log(`\n🗑️ Eliminated modules (${analysis.moduleComparison.eliminated.length}):`);
    analysis.moduleComparison.eliminated.slice(0, 10).forEach((module) => {
      console.log(`   - ${module.name}: ${(module.size / 1024).toFixed(1)}KB saved`);
    });
  }

  console.log(`\n📦 Largest remaining modules:`);
  analysis.moduleComparison.kept.slice(0, 10).forEach((module) => {
    console.log(`   - ${module.name}: ${(module.size / 1024).toFixed(1)}KB`);
  });
}
```

### التحقق من اهتزاز الشجرة وقت التشغيل

```typescript
// Development utility to detect unused imports
function detectUnusedImports() {
  if (process.env.NODE_ENV !== 'development') return;

  const importTracker = new Map<
    string,
    {
      imported: Set<string>;
      used: Set<string>;
    }
  >();

  // Track imports (this would be done by a babel plugin in practice)
  window.__TRACK_IMPORT__ = (moduleName: string, importName: string) => {
    if (!importTracker.has(moduleName)) {
      importTracker.set(moduleName, {
        imported: new Set(),
        used: new Set(),
      });
    }
    importTracker.get(moduleName)!.imported.add(importName);
  };

  // Track usage
  window.__TRACK_USAGE__ = (moduleName: string, importName: string) => {
    if (importTracker.has(moduleName)) {
      importTracker.get(moduleName)!.used.add(importName);
    }
  };

  // Report unused imports after page load
  setTimeout(() => {
    console.log('🔍 Unused Import Analysis:');

    importTracker.forEach((data, moduleName) => {
      const unused = Array.from(data.imported).filter((importName) => !data.used.has(importName));

      if (unused.length > 0) {
        console.log(`📦 ${moduleName}:`);
        unused.forEach((importName) => {
          console.log(`   🚫 Unused: ${importName}`);
        });
      }
    });
  }, 5000);
}

// Babel plugin to inject tracking (simplified example)
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const moduleName = path.node.source.value;

        path.node.specifiers.forEach((spec) => {
          if (t.isImportSpecifier(spec)) {
            // Track named import
            const trackingCall = t.callExpression(
              t.memberExpression(t.identifier('window'), t.identifier('__TRACK_IMPORT__')),
              [t.stringLiteral(moduleName), t.stringLiteral(spec.imported.name)],
            );
            path.insertAfter(t.expressionStatement(trackingCall));
          }
        });
      },

      // Track when imported functions are actually called
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee)) {
          const functionName = path.node.callee.name;
          // This is simplified - real implementation would track binding origins
        }
      },
    },
  };
};
```

## تحسينات خاصة بكل مكتبة

### مكتبات التواريخ

```typescript
// ❌ Moment.js - not tree-shakeable, includes all locales
import moment from 'moment';
const formatted = moment().format('YYYY-MM-DD');

// ✅ date-fns - fully tree-shakeable
import { format } from 'date-fns';
const formatted = format(new Date(), 'yyyy-MM-dd');

// ✅ Day.js - smaller alternative with similar API
import dayjs from 'dayjs';
const formatted = dayjs().format('YYYY-MM-DD');
```

### مكتبات الأيقونات

```typescript
// Custom tree-shakeable icon solution
// icons/index.ts
export { ReactComponent as HomeIcon } from './home.svg';
export { ReactComponent as SettingsIcon } from './settings.svg';
export { ReactComponent as UserIcon } from './user.svg';

// components/Icon.tsx
import * as Icons from '../icons';

type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent width={size} height={size} className={className} />;
}

// Usage - only imports the icons you actually use
import { Icon } from './components/Icon';

function App() {
  return (
    <div>
      <Icon name="HomeIcon" size={32} />
      <Icon name="SettingsIcon" />
    </div>
  );
}
```

### مكتبات الأدوات المساعدة

```typescript
// Create your own tree-shakeable utility library
// utils/index.ts
export { debounce } from './debounce';
export { throttle } from './throttle';
export { deepClone } from './deepClone';
export { formatCurrency } from './formatCurrency';

// utils/debounce.ts
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Better than importing large libraries for simple utilities
import { debounce, formatCurrency } from './utils';
```

## مراقبة اهتزاز الشجرة في CI/CD

```javascript
// ci/check-tree-shaking.js
const fs = require('fs');
const path = require('path');

class TreeShakingMonitor {
  constructor(thresholds) {
    this.thresholds = thresholds;
  }

  async checkTreeShaking() {
    const stats = this.loadWebpackStats();
    const analysis = this.analyzeBundle(stats);

    const violations = this.checkViolations(analysis);

    if (violations.length > 0) {
      console.error('❌ Tree shaking violations found:');
      violations.forEach((violation) => console.error(`  ${violation}`));
      process.exit(1);
    }

    console.log('✅ Tree shaking optimization checks passed');
    this.generateReport(analysis);
  }

  loadWebpackStats() {
    return JSON.parse(fs.readFileSync('dist/stats.json', 'utf8'));
  }

  analyzeBundle(stats) {
    const analysis = {
      totalSize: 0,
      modules: [],
      largeModules: [],
      potentialOptimizations: [],
    };

    stats.modules.forEach((module) => {
      analysis.totalSize += module.size;
      analysis.modules.push({
        name: module.name,
        size: module.size,
        reasons: module.reasons,
      });

      // Flag large modules for review
      if (module.size > 50000) {
        // > 50KB
        analysis.largeModules.push(module);
      }

      // Detect potential tree shaking issues
      if (module.name.includes('node_modules')) {
        if (module.name.includes('lodash') && module.size > 10000) {
          analysis.potentialOptimizations.push({
            module: module.name,
            issue: 'Large lodash import - consider individual functions',
            potentialSavings: module.size * 0.8, // Estimate 80% savings
          });
        }

        if (module.name.includes('@mui') && module.size > 20000) {
          analysis.potentialOptimizations.push({
            module: module.name,
            issue: 'Large MUI import - consider individual components',
            potentialSavings: module.size * 0.6, // Estimate 60% savings
          });
        }
      }
    });

    return analysis;
  }

  checkViolations(analysis) {
    const violations = [];

    // Check total bundle size
    if (analysis.totalSize > this.thresholds.maxBundleSize) {
      violations.push(
        `Bundle size ${(analysis.totalSize / 1024).toFixed(1)}KB exceeds threshold ${(this.thresholds.maxBundleSize / 1024).toFixed(1)}KB`,
      );
    }

    // Check for large modules
    analysis.largeModules.forEach((module) => {
      if (module.size > this.thresholds.maxModuleSize) {
        violations.push(
          `Module ${module.name} (${(module.size / 1024).toFixed(1)}KB) exceeds threshold`,
        );
      }
    });

    return violations;
  }

  generateReport(analysis) {
    const report = `
# Tree Shaking Report

## Bundle Analysis
- **Total Size**: ${(analysis.totalSize / 1024).toFixed(1)}KB
- **Module Count**: ${analysis.modules.length}
- **Large Modules**: ${analysis.largeModules.length}

## Potential Optimizations
${analysis.potentialOptimizations
  .map(
    (opt) =>
      `- **${opt.module}**: ${opt.issue} (potential savings: ${(opt.potentialSavings / 1024).toFixed(1)}KB)`,
  )
  .join('\n')}

## Largest Modules
${analysis.largeModules
  .sort((a, b) => b.size - a.size)
  .slice(0, 10)
  .map((module) => `- ${module.name}: ${(module.size / 1024).toFixed(1)}KB`)
  .join('\n')}
`;

    fs.writeFileSync('tree-shaking-report.md', report);
    console.log('📊 Tree shaking report generated: tree-shaking-report.md');
  }
}

// Run the check
const monitor = new TreeShakingMonitor({
  maxBundleSize: 500 * 1024, // 500KB
  maxModuleSize: 100 * 1024, // 100KB
});

monitor.checkTreeShaking().catch(console.error);
```

## الدمج مع تحليل الحزمة

عند استخدام webpack-bundle-analyzer مع اهتزاز الشجرة، ركّز على:

- **التصديرات غير المستخدمة**: وحدات تستورد أكثر مما تستخدم
- **ملفات الآثار الجانبية**: ملفات موسومة بـ sideEffects لكنها غير مطلوبة فعليًا
- **الاعتمادات الكبيرة**: مكتبات لا ينجح اهتزاز شجرتها جيدًا

لتقنيات تحليل الحزمة المفصّلة، انظر [تحليل الحزم بعمق](https://stevekinney.com/courses/react-performance/bundle-analysis-deep-dive).

## مزالق شائعة وحلولها

### مَزلق: الآثار الجانبية في الدوال النقية

```typescript
// ❌ This looks pure but has side effects
let globalCounter = 0;

export function incrementCounter() {
  return ++globalCounter; // Side effect!
}

// The bundler can't tree shake this safely because it modifies global state

// ✅ Pure function version
export function createCounter(initialValue = 0) {
  return {
    value: initialValue,
    increment() {
      return { ...this, value: this.value + 1 };
    },
  };
}
```

### مَزلق: الاستيرادات الديناميكية تكسر التحليل الساكن

```typescript
// ❌ Dynamic require breaks tree shaking
const utils = require('./utils');
const functionName = someCondition ? 'add' : 'subtract';
const result = utils[functionName](a, b);

// ✅ Static imports enable tree shaking
import { add, subtract } from './utils';
const result = someCondition ? add(a, b) : subtract(a, b);
```

### مَزلق: إعادة التصدير دون اهتزاز الشجرة

```typescript
// ❌ This might export everything from lodash
export * from 'lodash';

// ✅ Explicit re-exports
export { debounce, throttle, clone } from 'lodash';

// ✅ Even better: selective imports with re-export
import { debounce } from 'lodash/debounce';
import { throttle } from 'lodash/throttle';

export { debounce, throttle };
```

## الخطوات التالية

يتطلّب اهتزاز الشجرة الفعّال ما يلي:
