---
title: "دليل الانتقال إلى مصرّف React"
---

يغيّر مصرّف React (React Compiler) جذريًا طريقة تفكيرنا في تحسين الأداء داخل React. فبدلًا من وضع `useMemo` و`useCallback` و`React.memo` يدويًا في أنحاء قاعدة شيفرتك، يحسّن المصرّف مكوّناتك تلقائيًا وقت البناء. وهو ليس سحرًا، بل تحليل ساكن متطوّر يفهم نموذج التصيير في React ويطبّق التحسينات حيث تهمّ فعلًا.

لكن الانتقال ليس مجرّد «شغّله ثم احذف كل تخزينك اليدوي للنتائج». فالمصرّف يعمل في أفضل حالاته حين تتبع شيفرتك أنماطًا معيّنة، وهناك حالات حدّية يبقى فيها التحسين اليدوي ضروريًا. يرشدك هذا الدليل خلال عملية الانتقال الكاملة: التحضير، وتفعيل المصرّف، ومعالجة حالات عدم التوافق، وقياس التحسّن، ومعرفة متى تُبقي تحسيناتك اليدوية.

## فهم مصرّف React

يحلّل مصرّف React مكوّناتك وقت البناء ويُدرج التحسينات تلقائيًا. وكأن لديك مهندس أداء React خبيرًا يراجع كل مكوّن ويطبّق عليه التحسينات المثالية.

```typescript
// What you write
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discount);

  const handleClick = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${discountedPrice.toFixed(2)}</p>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

// What the compiler generates (conceptually)
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = useMemo(
    () => product.price * (1 - product.discount),
    [product.price, product.discount],
  );

  const handleClick = useCallback(() => {
    onAddToCart(product.id);
  }, [onAddToCart, product.id]);

  return useMemo(
    () => (
      <div className="product-card">
        <h3>{product.name}</h3>
        <p>${discountedPrice.toFixed(2)}</p>
        <button onClick={handleClick}>Add to Cart</button>
      </div>
    ),
    [product.name, discountedPrice, handleClick],
  );
}
```

يطبّق المصرّف هذه التحسينات بذكاء: فهو لا يحفظ نتائج الحسابات المكلفة التي تتغيّر في كل تصيير، ويفهم متى يضرّ حفظ النتائج بالأداء فعلًا.

> **نصيحة**
>
> تفعيل مصرّف React في React 19 اختياري (opt-in). وعليك تمكينه صراحةً في إعدادات البناء لديك. وقد صُمّم ليُتبنّى تدريجيًا، فتستطيع تفعيله لمكوّنات بعينها أو لمجلدات كاملة.

## التقييم قبل الانتقال

قبل تفعيل المصرّف، قيّم قاعدة شيفرتك الحالية لتفهم التحسينات الموجودة لديك وأيّها قد يتعارض مع المصرّف:

### جرد التحسينات القائمة

```bash
# Find all manual memoization in your codebase
rg "useMemo|useCallback|React\.memo" --type tsx --type ts -n

# Find components with optimization patterns
rg "memo\(|React\.memo|React\.forwardRef" --type tsx --type ts -A 5 -B 5

# Look for potential compiler conflicts
rg "useEffect.*\[\]|useState.*function" --type tsx --type ts
```

```typescript
// audit-optimizations.ts - Script to analyze your current optimizations
import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface OptimizationAnalysis {
  file: string;
  optimizations: {
    useMemo: number;
    useCallback: number;
    reactMemo: number;
    forwardRef: number;
  };
  potentialIssues: string[];
}

class OptimizationAuditor {
  analyze(sourceDir: string): OptimizationAnalysis[] {
    const results: OptimizationAnalysis[] = [];

    this.walkDirectory(sourceDir, (filePath) => {
      if (filePath.match(/\.(tsx?|jsx?)$/)) {
        const analysis = this.analyzeFile(filePath);
        if (this.hasOptimizations(analysis) || analysis.potentialIssues.length > 0) {
          results.push(analysis);
        }
      }
    });

    return results;
  }

  private analyzeFile(filePath: string): OptimizationAnalysis {
    const source = fs.readFileSync(filePath, 'utf8');
    const analysis: OptimizationAnalysis = {
      file: filePath,
      optimizations: {
        useMemo: 0,
        useCallback: 0,
        reactMemo: 0,
        forwardRef: 0,
      },
      potentialIssues: [],
    };

    try {
      const ast = parse(source, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });

      traverse(ast, {
        CallExpression: (path) => {
          const callee = path.node.callee;

          if (callee.type === 'Identifier') {
            switch (callee.name) {
              case 'useMemo':
                analysis.optimizations.useMemo++;
                break;
              case 'useCallback':
                analysis.optimizations.useCallback++;
                break;
            }
          }

          if (callee.type === 'MemberExpression') {
            if (
              callee.object.type === 'Identifier' &&
              callee.object.name === 'React' &&
              callee.property.type === 'Identifier'
            ) {
              switch (callee.property.name) {
                case 'memo':
                  analysis.optimizations.reactMemo++;
                  break;
                case 'forwardRef':
                  analysis.optimizations.forwardRef++;
                  break;
              }
            }
          }
        },

        // Look for potential issues
        VariableDeclarator: (path) => {
          if (
            path.node.init?.type === 'ArrowFunctionExpression' &&
            path.parentPath.isVariableDeclaration() &&
            path.parentPath.node.declarations.length === 1
          ) {
            analysis.potentialIssues.push(
              `Potential inline function that could be optimized: line ${path.node.loc?.start.line}`,
            );
          }
        },
      });
    } catch (error) {
      analysis.potentialIssues.push(`Parse error: ${error.message}`);
    }

    return analysis;
  }

  private hasOptimizations(analysis: OptimizationAnalysis): boolean {
    const { optimizations } = analysis;
    return Object.values(optimizations).some((count) => count > 0);
  }

  private walkDirectory(dir: string, callback: (filePath: string) => void) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        this.walkDirectory(fullPath, callback);
      } else if (stat.isFile()) {
        callback(fullPath);
      }
    }
  }

  generateReport(results: OptimizationAnalysis[]): string {
    const totalFiles = results.length;
    const totalOptimizations = results.reduce(
      (sum, r) => sum + Object.values(r.optimizations).reduce((s, count) => s + count, 0),
      0,
    );

    let report = `# React Optimization Audit\n\n`;
    report += `**Total files with optimizations:** ${totalFiles}\n`;
    report += `**Total optimization calls:** ${totalOptimizations}\n\n`;

    // Summary by optimization type
    const summary = results.reduce(
      (acc, result) => {
        acc.useMemo += result.optimizations.useMemo;
        acc.useCallback += result.optimizations.useCallback;
        acc.reactMemo += result.optimizations.reactMemo;
        acc.forwardRef += result.optimizations.forwardRef;
        return acc;
      },
      { useMemo: 0, useCallback: 0, reactMemo: 0, forwardRef: 0 },
    );

    report += `## Optimization Summary\n`;
    report += `- useMemo: ${summary.useMemo}\n`;
    report += `- useCallback: ${summary.useCallback}\n`;
    report += `- React.memo: ${summary.reactMemo}\n`;
    report += `- React.forwardRef: ${summary.forwardRef}\n\n`;

    // Top optimized files
    const topFiles = results
      .map((r) => ({
        ...r,
        total: Object.values(r.optimizations).reduce((sum, count) => sum + count, 0),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    report += `## Most Optimized Files\n`;
    topFiles.forEach((file) => {
      report += `- **${file.file}**: ${file.total} optimizations\n`;
    });

    return report;
  }
}

// Usage
const auditor = new OptimizationAuditor();
const results = auditor.analyze('./src');
const report = auditor.generateReport(results);

console.log(report);
fs.writeFileSync('optimization-audit.md', report);
```

## التثبيت والإعداد الأساسي

### تثبيت مصرّف React

```bash
# Install the React Compiler (React 19+)
npm install react-compiler-runtime
npm install --save-dev babel-plugin-react-compiler

# Or with yarn
yarn add react-compiler-runtime
yarn add --dev babel-plugin-react-compiler
```

### إعداد Babel

```javascript
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    [
      'react-compiler',
      {
        // Start with opt-in mode for safer migration
        mode: 'opt-in',

        // Specify which components/files to compile
        include: ['src/components/**', 'src/pages/**'],

        // Exclude problematic files
        exclude: ['src/legacy/**', 'src/external/**'],

        // Compiler options
        options: {
          // Validate hooks rules more strictly
          strictMode: true,

          // Generate source maps for debugging
          sourceMaps: true,

          // Optimization level
          optimizationLevel: 'standard', // 'conservative' | 'standard' | 'aggressive'
        },
      },
    ],
  ],
};
```

### إعداد Webpack

```javascript
// webpack.config.js
const ReactCompilerWebpackPlugin = require('react-compiler-webpack-plugin');

module.exports = {
  plugins: [
    new ReactCompilerWebpackPlugin({
      // Enable compiler for development builds too
      enabled: process.env.NODE_ENV === 'production' || process.env.ENABLE_COMPILER === 'true',

      // Compiler options
      options: {
        mode: 'opt-in',
        include: ['src/**/*.{ts,tsx,js,jsx}'],
        exclude: ['**/*.test.*', '**/*.spec.*'],
      },
    }),
  ],

  // Enhanced development experience
  devServer: {
    // Enable hot reloading with compiler
    hot: true,

    // Show compiler warnings/errors
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },

  // Source maps for debugging compiled code
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
};
```

### إعداد TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    // ... other options

    // Support for React Compiler runtime
    "types": ["react-compiler-runtime"],

    // Preserve JSX for React Compiler
    "jsx": "preserve",

    // Enable advanced optimizations
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node"
  },

  "include": ["src/**/*", "react-compiler.d.ts"]
}
```

```typescript
// react-compiler.d.ts - Type definitions for compiler annotations
declare namespace ReactCompiler {
  /**
   * Opt a component into React Compiler optimization
   */
  function useOptimize<T>(component: T): T;

  /**
   * Exclude a component from React Compiler optimization
   */
  function useNoOptimize<T>(component: T): T;

  /**
   * Provide hints to the compiler about expensive operations
   */
  function useExpensive<T>(computation: () => T, deps: React.DependencyList): T;
}
```

## استراتيجية الانتقال التدريجي

### المرحلة 1: المكوّنات الطرفية (خطر منخفض)

ابدأ بالمكوّنات الطرفية البسيطة التي لا اعتمادات معقّدة لها:

```typescript
// ✅ Good candidates for early migration
// Simple components with clear props
'use optimize'; // Compiler directive

function Button({ children, variant, onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

function UserAvatar({ user, size = 'medium' }: UserAvatarProps) {
  const sizeClass = size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-16 h-16' : 'w-12 h-12';

  return (
    <img src={user.avatar} alt={`${user.name} avatar`} className={`rounded-full ${sizeClass}`} />
  );
}

// Card component with simple logic
function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discount);
  const hasDiscount = product.discount > 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="price">
        <span className={hasDiscount ? 'line-through' : ''}>${product.price}</span>
        {hasDiscount && <span className="discount-price">${discountedPrice.toFixed(2)}</span>}
      </div>
    </div>
  );
}
```

### المرحلة 2: مكوّنات الحاويات (خطر متوسط)

بعد التأكد من أن المصرّف يعمل مع المكوّنات الطرفية، انتقل إلى مكوّنات الحاويات:

```typescript
// Container component with state management
'use optimize';

function UserList({ users, onUserSelect }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Compiler will automatically memoize this filtering
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Compiler will automatically memoize this handler
  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
    onUserSelect(userId);
  };

  return (
    <div className="user-list">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      <div className="users">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedUser === user.id}
            onClick={() => handleUserClick(user.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

### المرحلة 3: المكوّنات المعقّدة (خطر أعلى)

وأخيرًا، انقل المكوّنات المعقّدة التي تتضمّن التأثيرات والمراجع وأنماطًا متقدّمة:

```typescript
// Complex component with effects and refs
'use optimize';

function DataTable({ data, columns, onSort, onFilter }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [virtualizer, setVirtualizer] = useState<VirtualizerAPI | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  // Complex data processing - compiler will optimize automatically
  const processedData = data
    .filter((row) => {
      return Object.entries(filterConfig).every(([column, filter]) => {
        const value = row[column];
        return filter.type === 'contains'
          ? value.toString().toLowerCase().includes(filter.value.toLowerCase())
          : value === filter.value;
      });
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;

      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // Effect for virtualization setup
  useEffect(() => {
    if (tableRef.current && processedData.length > 100) {
      const virtualizer = new VirtualizerAPI({
        container: tableRef.current,
        itemCount: processedData.length,
        itemHeight: 48,
      });

      setVirtualizer(virtualizer);

      return () => virtualizer.cleanup();
    }
  }, [processedData.length]);

  // Complex event handlers - compiler will memoize appropriately
  const handleSort = (column: string) => {
    setSortConfig((prevSort) => ({
      column,
      direction: prevSort?.column === column && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
    onSort?.(column);
  };

  const handleFilter = (column: string, filter: FilterValue) => {
    setFilterConfig((prev) => ({
      ...prev,
      [column]: filter,
    }));
    onFilter?.(column, filter);
  };

  return (
    <div className="data-table-container">
      <table ref={tableRef} className="data-table">
        <thead ref={headerRef}>
          <tr>
            {columns.map((column) => (
              <TableHeader
                key={column.id}
                column={column}
                sortConfig={sortConfig}
                onSort={handleSort}
                onFilter={handleFilter}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {virtualizer ? (
            <VirtualizedTableBody
              data={processedData}
              columns={columns}
              virtualizer={virtualizer}
            />
          ) : (
            processedData.map((row) => <TableRow key={row.id} data={row} columns={columns} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
```

## معالجة حالات عدم التوافق مع المصرّف

### مشكلات شائعة وحلولها

```typescript
// ❌ Issue: Dynamic hook usage (violates Rules of Hooks)
function ProblematicComponent({ condition }: { condition: boolean }) {
  if (condition) {
    const value = useState(0); // ❌ Conditional hook usage
  }

  return <div>Content</div>;
}

// ✅ Solution: Move hooks to top level
function FixedComponent({ condition }: { condition: boolean }) {
  const [value, setValue] = useState(0);

  if (!condition) {
    return <div>No content</div>;
  }

  return <div>Content with value: {value}</div>;
}

// ❌ Issue: Mutating props or context values
function ProblematicComponent({ config }: { config: Config }) {
  config.lastAccessed = Date.now(); // ❌ Mutating props

  return <div>{config.name}</div>;
}

// ✅ Solution: Create new objects for mutations
function FixedComponent({ config }: { config: Config }) {
  const updatedConfig = {
    ...config,
    lastAccessed: Date.now(),
  };

  return <div>{updatedConfig.name}</div>;
}

// ❌ Issue: Side effects in render
function ProblematicComponent({ items }: { items: Item[] }) {
  // ❌ Side effect during render
  items.forEach((item) => {
    localStorage.setItem(`item-${item.id}`, JSON.stringify(item));
  });

  return <div>{items.length} items</div>;
}

// ✅ Solution: Move side effects to useEffect
function FixedComponent({ items }: { items: Item[] }) {
  useEffect(() => {
    items.forEach((item) => {
      localStorage.setItem(`item-${item.id}`, JSON.stringify(item));
    });
  }, [items]);

  return <div>{items.length} items</div>;
}
```

### مخارج الطوارئ في المصرّف

تحتاج أحيانًا إلى تعطيل المصرّف لمكوّنات بعينها:

```typescript
// Disable compiler for specific component
'use no-optimize';

function LegacyComponent({ data }: LegacyProps) {
  // This component won't be optimized by the compiler
  // Useful for components with complex imperative logic
  // or third-party library integration issues

  const legacyLibRef = useRef<LegacyLibAPI | null>(null);

  useEffect(() => {
    // Complex imperative setup that the compiler might not understand
    legacyLibRef.current = new LegacyLibAPI({
      container: containerRef.current,
      options: {
        // Complex configuration
      },
    });

    return () => {
      legacyLibRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}

// Selective optimization with compiler hints
function ComplexComponent({ data }: ComplexProps) {
  // This expensive calculation should always be memoized
  const expensiveResult = ReactCompiler.useExpensive(() => {
    return performHeavyComputation(data);
  }, [data]);

  // Regular logic that compiler can optimize automatically
  const filteredData = data.filter((item) => item.active);

  return (
    <div>
      <ExpensiveVisualization data={expensiveResult} />
      <DataList items={filteredData} />
    </div>
  );
}
```

### إنشاء واجهات صديقة للمصرّف

صمّم واجهات برمجة التطبيقات لديك لتتوافق جيدًا مع المصرّف:

```typescript
// ✅ Compiler-friendly API design
interface APIDesign {
  // Prefer simple props over complex objects
  userId: string;
  userName: string;
  userEmail: string;
}

// Instead of:
interface ComplexAPIDesign {
  user: {
    id: string;
    profile: {
      name: string;
      contact: {
        email: string;
      };
    };
  };
}

// ✅ Stable function references
const useStableCallbacks = (onSave: (data: any) => void) => {
  // Wrap external callbacks to make them stable
  const stableOnSave = useCallback(onSave, [onSave]);

  return { onSave: stableOnSave };
};

// ✅ Compiler-friendly custom hooks
function useOptimizedSearch(items: Item[], searchTerm: string) {
  // Simple dependencies that the compiler can track
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));

  return sortedItems;
}
```

## قياس الأداء والتحقّق منه

### مقارنة قبل/بعد

```typescript
// performance-comparison.ts - Script to measure compiler impact
import { performance } from 'perf_hooks';

interface PerformanceMetrics {
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  reRenderCount: number;
}

class CompilerPerformanceValidator {
  async measureComponent(
    Component: React.ComponentType<any>,
    props: any,
    iterations: number = 100,
  ): Promise<PerformanceMetrics> {
    const renderTimes: number[] = [];
    let reRenderCount = 0;

    const TestWrapper = () => {
      const [, forceUpdate] = useState({});

      useEffect(() => {
        // Measure multiple renders
        for (let i = 0; i < iterations; i++) {
          const startTime = performance.now();

          forceUpdate({}); // Force re-render

          requestAnimationFrame(() => {
            const endTime = performance.now();
            renderTimes.push(endTime - startTime);
            reRenderCount++;
          });
        }
      }, []);

      return <Component {...props} />;
    };

    render(<TestWrapper />);

    // Wait for all renders to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      renderTime: renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length,
      bundleSize: await this.getBundleSize(),
      memoryUsage: this.getMemoryUsage(),
      reRenderCount,
    };
  }

  async compareVersions(
    OriginalComponent: React.ComponentType<any>,
    OptimizedComponent: React.ComponentType<any>,
    props: any,
  ) {
    console.log('🔄 Measuring original component...');
    const originalMetrics = await this.measureComponent(OriginalComponent, props);

    console.log('⚡ Measuring compiler-optimized component...');
    const optimizedMetrics = await this.measureComponent(OptimizedComponent, props);

    const improvement = {
      renderTime:
        ((originalMetrics.renderTime - optimizedMetrics.renderTime) / originalMetrics.renderTime) *
        100,
      bundleSize:
        ((originalMetrics.bundleSize - optimizedMetrics.bundleSize) / originalMetrics.bundleSize) *
        100,
      memoryUsage:
        ((originalMetrics.memoryUsage - optimizedMetrics.memoryUsage) /
          originalMetrics.memoryUsage) *
        100,
      reRenderCount: originalMetrics.reRenderCount - optimizedMetrics.reRenderCount,
    };

    return {
      original: originalMetrics,
      optimized: optimizedMetrics,
      improvement,
    };
  }

  generateReport(comparison: any): string {
    const { original, optimized, improvement } = comparison;

    return `
# React Compiler Performance Report

## Metrics Comparison

| Metric | Original | Optimized | Improvement |
|--------|----------|-----------|-------------|
| Render Time | ${original.renderTime.toFixed(2)}ms | ${optimized.renderTime.toFixed(2)}ms | ${improvement.renderTime.toFixed(1)}% |
| Bundle Size | ${(original.bundleSize / 1024).toFixed(1)}KB | ${(optimized.bundleSize / 1024).toFixed(1)}KB | ${improvement.bundleSize.toFixed(1)}% |
| Memory Usage | ${(original.memoryUsage / 1024 / 1024).toFixed(1)}MB | ${(optimized.memoryUsage / 1024 / 1024).toFixed(1)}MB | ${improvement.memoryUsage.toFixed(1)}% |
| Re-renders | ${original.reRenderCount} | ${optimized.reRenderCount} | ${improvement.reRenderCount} fewer |

## Key Insights

${improvement.renderTime > 10 ? '✅ Significant render time improvement' : '⚠️ Minimal render time impact'}
${improvement.bundleSize > 0 ? '✅ Bundle size reduced' : '⚠️ Bundle size increased (compiler overhead)'}
${improvement.reRenderCount > 0 ? '✅ Reduced unnecessary re-renders' : '⚠️ No re-render optimization'}

## Recommendations

${this.generateRecommendations(improvement)}
`;
  }

  private generateRecommendations(improvement: any): string {
    const recommendations = [];

    if (improvement.renderTime > 20) {
      recommendations.push(
        '🚀 Excellent render performance improvement - keep the compiler enabled',
      );
    } else if (improvement.renderTime < 0) {
      recommendations.push('⚠️ Performance regression detected - review compiler configuration');
    }

    if (improvement.bundleSize < -10) {
      recommendations.push(
        '📦 Bundle size increased significantly - consider selective optimization',
      );
    }

    if (improvement.reRenderCount === 0) {
      recommendations.push('🔄 No re-render optimization - component may already be optimal');
    }

    return recommendations.join('\n');
  }
}
```

## الإزالة التدريجية للتحسينات

### استراتيجية إزالة التحسينات اليدوية

```typescript
// migration-helper.ts - Tools to help remove manual optimizations
class OptimizationRemovalHelper {
  /**
   * Automatically remove redundant optimizations from compiled components
   */
  removeRedundantOptimizations(source: string): string {
    // This would be implemented as a codemod
    let result = source;

    // Remove unnecessary useMemo for simple computations
    result = result.replace(
      /const\s+(\w+)\s*=\s*useMemo\(\s*\(\)\s*=>\s*([^,{]+),\s*\[([^\]]*)\]\s*\)/g,
      'const $1 = $2',
    );

    // Remove unnecessary useCallback for simple functions
    result = result.replace(
      /const\s+(\w+)\s*=\s*useCallback\(\s*\([^)]*\)\s*=>\s*\{([^}]+)\},\s*\[([^\]]*)\]\s*\)/g,
      'const $1 = ($2) => {$3}',
    );

    return result;
  }

  /**
   * Generate a report of optimizations that can be safely removed
   */
  identifyRedundantOptimizations(componentPath: string): {
    canRemove: Array<{ line: number; type: string; reason: string }>;
    shouldKeep: Array<{ line: number; type: string; reason: string }>;
  } {
    // Analyze component and identify redundant optimizations
    // This would integrate with the compiler's analysis

    return {
      canRemove: [
        {
          line: 15,
          type: 'useMemo',
          reason: 'Simple computation automatically optimized by compiler',
        },
        {
          line: 23,
          type: 'useCallback',
          reason: 'Function reference automatically stabilized by compiler',
        },
      ],
      shouldKeep: [
        {
          line: 8,
          type: 'React.memo',
          reason: 'Custom equality check cannot be inferred by compiler',
        },
      ],
    };
  }
}

// Example codemod for removing redundant optimizations
function createOptimizationRemovalCodemod() {
  return {
    name: 'remove-redundant-optimizations',
    transform: (fileInfo: any, api: any) => {
      const j = api.jscodeshift;
      const source = j(fileInfo.source);

      // Remove simple useMemo calls
      source
        .find(j.CallExpression, {
          callee: { name: 'useMemo' },
        })
        .filter((path) => {
          // Only remove simple computations
          const callback = path.value.arguments[0];
          return (
            callback &&
            callback.type === 'ArrowFunctionExpression' &&
            callback.body.type !== 'BlockStatement' // Simple expression
          );
        })
        .replaceWith((path) => {
          const callback = path.value.arguments[0];
          return callback.body;
        });

      // Remove simple useCallback calls
      source
        .find(j.CallExpression, {
          callee: { name: 'useCallback' },
        })
        .filter((path) => {
          // Only remove callbacks without complex logic
          const callback = path.value.arguments[0];
          return (
            callback &&
            callback.type === 'ArrowFunctionExpression' &&
            (!callback.body.body || callback.body.body.length <= 2)
          );
        })
        .replaceWith((path) => {
          const callback = path.value.arguments[0];
          return callback;
        });

      return source.toSource();
    },
  };
}
```

## إعداد متقدّم للمصرّف

### ملفات تعريف تحسين مخصّصة

```javascript
// Advanced compiler configuration for different environments
const compilerConfigs = {
  development: {
    mode: 'opt-in',
    optimizationLevel: 'conservative',
    sourceMaps: true,
    include: ['src/components/**'], // Limited scope for faster builds
    options: {
      // More forgiving in development
      strictMode: false,

      // Keep original function names for debugging
      keepFunctionNames: true,

      // Generate detailed optimization reports
      verbose: true,
    },
  },

  production: {
    mode: 'opt-out', // Optimize everything by default
    optimizationLevel: 'aggressive',
    sourceMaps: false,
    exclude: ['src/legacy/**', 'src/vendor/**', '**/*.test.*'],
    options: {
      // Strict optimizations for production
      strictMode: true,

      // Advanced optimizations
      deadCodeElimination: true,
      inlineConstants: true,

      // Minimal runtime overhead
      minimalRuntime: true,
    },
  },

  testing: {
    mode: 'opt-in',
    optimizationLevel: 'standard',
    sourceMaps: true,
    include: ['src/**'],
    exclude: ['**/*.test.*', '**/*.spec.*'],
    options: {
      // Predictable behavior for tests
      strictMode: true,

      // Preserve function names for better error messages
      keepFunctionNames: true,

      // Disable optimizations that might interfere with testing
      disableHoisting: true,
    },
  },
};

// Dynamic configuration based on environment
module.exports = {
  plugins: [['react-compiler', compilerConfigs[process.env.NODE_ENV || 'development']]],
};
```

## استكشاف المشكلات الشائعة وإصلاحها

### تنقيح المكوّنات المصرَّفة

```typescript
// Development utilities for debugging compiler output
function createCompilerDebugTools() {
  if (process.env.NODE_ENV !== 'development') {
    return {};
  }

  return {
    // Log when compiler optimizations are applied
    logOptimizations: (componentName: string) => {
      console.group(`🔧 ${componentName} Compiler Optimizations`);

      const originalRender = React.createElement;
      React.createElement = function (...args) {
        console.log('Creating element:', args[0], args[1]);
        return originalRender.apply(this, args);
      };

      return () => {
        React.createElement = originalRender;
        console.groupEnd();
      };
    },

    // Detect when memoization breaks
    detectMemoizationBreaks: (componentName: string) => {
      let renderCount = 0;

      return {
        onRender: () => {
          renderCount++;
          if (renderCount > 2) {
            console.warn(
              `⚠️ ${componentName} rendered ${renderCount} times - memoization may be broken`,
            );
          }
        },
        reset: () => {
          renderCount = 0;
        },
      };
    },

    // Compare compiled vs uncompiled performance
    comparePerformance: async (
      CompiledComponent: React.ComponentType<any>,
      UncompiledComponent: React.ComponentType<any>,
      props: any,
    ) => {
      const results = await new CompilerPerformanceValidator().compareVersions(
        UncompiledComponent,
        CompiledComponent,
        props,
      );

      console.table({
        'Render Time': {
          'Before (ms)': results.original.renderTime.toFixed(2),
          'After (ms)': results.optimized.renderTime.toFixed(2),
          Improvement: `${results.improvement.renderTime.toFixed(1)}%`,
        },
        'Re-renders': {
          Before: results.original.reRenderCount,
          After: results.optimized.reRenderCount,
          Improvement: results.improvement.reRenderCount,
        },
      });
    },
  };
}

// Usage in development
if (process.env.NODE_ENV === 'development') {
  const debugTools = createCompilerDebugTools();

  // Enable for specific components
  window.debugCompiler = debugTools;
}
```
