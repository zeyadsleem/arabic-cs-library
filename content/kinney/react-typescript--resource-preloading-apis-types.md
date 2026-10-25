---
title: "التحميل المسبق للمصادر بأنواع API"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/resource-preloading-apis-types"
---

أداء الويب لا يخص الخوادم السريعة والحزم المُحسَّنة وحده — بل تحميل المصادر الصحيحة في الوقت الصحيح. تتيح لك واجهات التحميل المسبق للمصادر في React (`preload` و`preinit` و`prefetch`) ضبطَ متى وكيف تُجلب الكتلة الحرجة من الموجودات، لكن من دون تهيئة TypeScript سليمة قد يجدك الأمر تحمّل ورقة الأنماط نفسها مرتين أو تحميلًا مسبقًا لسكربت بأولوية خاطئة. لنبنِ مساعدات آمنة الأنواع تجعل التحميلَ المسبق مصادرَ موثوقًا وأريحًا للمطوّر.

التحميل المسبق للمصادر في جوهره إرشادات للنطاري (browser): «سأعرف أنك ستحتاج هذا الخط بعد مللي ثوانٍ قليلة، فابدأَ جلبَه الآن» أو «ستُستخدم وحدةُ JavaScript هذه على الصفحة التالية قطعًا، فالتطُتها في لحظة فراغ». والتحدي هو تنسيق هذه الإرشادات عبر تطبيقك دون خلق طلبات مكررة أو أولويات متعارضة.

## فهم واجهات التحميل المسبق

قدّم React 19 ثلاث واجهات متكاملة لإدارة المصادر:

- **`preload`**: اجلب المصادر التي ستحتاجها قريبًا (أوراق الأنماط، والخطوط، والصور)
- **`preinit`**: حمّل وابدأ المصادر فورًا (السكربتات الحرجة، أوراق الأنماط)
- **`prefetch`**: خزّن المصادر مؤقتًا حين تيسر استعدادًا للتصفح القادم

لكل منها استراتيجية أداء مختلفة، لكنها كلها تشترك في حاجة إلى تمييز متّسق للمصادر وأن يُزال الازدواج عنها.

```typescript
import { preload, preinit, prefetch } from 'react-dom';

// Preload a stylesheet we'll need shortly
preload('/styles/article.css', { as: 'style' });

// Initialize critical JavaScript immediately
preinit('/js/analytics.js', { as: 'script' });

// Prefetch resources for the next page
prefetch('/api/user/preferences');
```

الجزء الشاق ليس نداءات الواجهات بحد ذاتها — بل إدارتها بانتظام عبر تطبيقك دون تعارض أو طلبات زائدة.

## إنشاء تعريفات مصادر آمنة الأنواع

لنبدأ بتعريف أنواع المصادر عندنا. نريد أمانًا عند وقت التصريف لعناوين URL للمصادر واستراتيجيات التحميل والأولويات:

```typescript
// Resource types with specific constraints
type ResourceType = 'script' | 'style' | 'font' | 'image' | 'fetch';

type LoadingStrategy = 'preload' | 'preinit' | 'prefetch';

interface ResourceDefinition {
  readonly url: string;
  readonly type: ResourceType;
  readonly strategy: LoadingStrategy;
  readonly priority?: 'high' | 'low' | 'auto';
  readonly crossOrigin?: 'anonymous' | 'use-credentials';
  readonly integrity?: string;
}

// Type-safe resource catalog
const RESOURCES = {
  // Critical CSS that should initialize immediately
  criticalStyles: {
    url: '/css/critical.css',
    type: 'style' as const,
    strategy: 'preinit' as const,
    priority: 'high' as const,
  },
  // Fonts we'll need for above-the-fold content
  primaryFont: {
    url: '/fonts/inter-var.woff2',
    type: 'font' as const,
    strategy: 'preload' as const,
    crossOrigin: 'anonymous' as const,
  },
  // Analytics script for initialization
  analytics: {
    url: '/js/analytics.bundle.js',
    type: 'script' as const,
    strategy: 'preinit' as const,
    integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC',
  },
} as const satisfies Record<string, ResourceDefinition>;

type ResourceKey = keyof typeof RESOURCES;
```

يجلب لنا هذا النهج مزايا عدّة: فمفهرس المصادر هو مصدر الحق الوحيد، ويمنع TypeScript الأخطاءَ المطبعية في مفاتيح المصادر، ويمكننا إلزام الاتساق في استراتيجيات التحميل.

## بناء مدير مزالة الازدواج

أكبر فخّ في واجهات التحميل المسبق هو تحميل المصدر نفسه مراتٍ عدّة. لنتكشف مديرًا يتتبّع ما حُمِّل:

```typescript
class ResourceManager {
  private loadedResources = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  private getResourceKey(url: string, strategy: LoadingStrategy): string {
    return `${strategy}:${url}`;
  }

  async loadResource<T extends ResourceKey>(key: T, options?: { force?: boolean }): Promise<void> {
    const resource = RESOURCES[key];
    const resourceKey = this.getResourceKey(resource.url, resource.strategy);

    // Skip if already loaded (unless forced)
    if (!options?.force && this.loadedResources.has(resourceKey)) {
      return;
    }

    // Return existing promise if loading is in progress
    const existingPromise = this.loadingPromises.get(resourceKey);
    if (existingPromise) {
      return existingPromise;
    }

    // Create new loading promise
    const loadingPromise = this.executeLoad(resource);
    this.loadingPromises.set(resourceKey, loadingPromise);

    try {
      await loadingPromise;
      this.loadedResources.add(resourceKey);
    } finally {
      this.loadingPromises.delete(resourceKey);
    }
  }

  private async executeLoad(resource: ResourceDefinition): Promise<void> {
    const { url, type, strategy, priority, crossOrigin, integrity } = resource;

    switch (strategy) {
      case 'preload':
        preload(url, {
          as: type,
          ...(priority && { fetchPriority: priority }),
          ...(crossOrigin && { crossOrigin }),
          ...(integrity && { integrity }),
        });
        break;

      case 'preinit':
        preinit(url, {
          as: type,
          ...(priority && { fetchPriority: priority }),
          ...(crossOrigin && { crossOrigin }),
          ...(integrity && { integrity }),
        });
        break;

      case 'prefetch':
        prefetch(url);
        break;
    }
  }

  // Check loading state
  isLoaded(key: ResourceKey): boolean {
    const resource = RESOURCES[key];
    const resourceKey = this.getResourceKey(resource.url, resource.strategy);
    return this.loadedResources.has(resourceKey);
  }

  isLoading(key: ResourceKey): boolean {
    const resource = RESOURCES[key];
    const resourceKey = this.getResourceKey(resource.url, resource.strategy);
    return this.loadingPromises.has(resourceKey);
  }
}

// Singleton instance
export const resourceManager = new ResourceManager();
```

## إنشاء خُطّافات React لتحميل المصادر

الآن لفها في خُطّافات React تبدو طبيعية الاستعمال في المكوّنات:

```typescript
import { useEffect, useState } from 'react';

export function useResourceLoader(resources: ResourceKey[], options?: { eager?: boolean }) {
  const [loadingStates, setLoadingStates] = useState(() =>
    resources.reduce(
      (acc, key) => ({
        ...acc,
        [key]: resourceManager.isLoaded(key) ? 'loaded' : 'pending',
      }),
      {} as Record<ResourceKey, 'pending' | 'loading' | 'loaded' | 'error'>,
    ),
  );

  useEffect(() => {
    if (!options?.eager) return;

    const loadResources = async () => {
      const loadPromises = resources.map(async (key) => {
        if (resourceManager.isLoaded(key)) return;

        setLoadingStates((prev) => ({ ...prev, [key]: 'loading' }));

        try {
          await resourceManager.loadResource(key);
          setLoadingStates((prev) => ({ ...prev, [key]: 'loaded' }));
        } catch (error) {
          console.error(`Failed to load resource: ${key}`, error);
          setLoadingStates((prev) => ({ ...prev, [key]: 'error' }));
        }
      });

      await Promise.all(loadPromises);
    };

    loadResources();
  }, [resources, options?.eager]);

  return {
    loadingStates,
    isLoading: Object.values(loadingStates).some((state) => state === 'loading'),
    isLoaded: (key: ResourceKey) => loadingStates[key] === 'loaded',
    loadResource: async (key: ResourceKey) => {
      if (resourceManager.isLoaded(key)) return;

      setLoadingStates((prev) => ({ ...prev, [key]: 'loading' }));

      try {
        await resourceManager.loadResource(key);
        setLoadingStates((prev) => ({ ...prev, [key]: 'loaded' }));
      } catch (error) {
        setLoadingStates((prev) => ({ ...prev, [key]: 'error' }));
        throw error;
      }
    },
  };
}

// Hook for conditional resource loading
export function useConditionalResources(condition: boolean, resources: ResourceKey[]) {
  return useResourceLoader(condition ? resources : [], { eager: condition });
}
```

## أنماط استعمال من الواقع

هكذا تعمل هذه الخُطّافات عمليًا عبر سيناريوهات مكوّنة مختلفة:

```typescript
// Layout component that preloads critical resources
function AppLayout({ children }: { children: React.ReactNode }) {
  // Eagerly load critical resources
  const { isLoading } = useResourceLoader(['criticalStyles', 'primaryFont', 'analytics'], {
    eager: true,
  });

  return (
    <div className="app-layout">
      {isLoading && <div className="loading-indicator" />}
      {children}
    </div>
  );
}

// Article page that conditionally loads fonts
function ArticlePage({ hasCustomFont }: { hasCustomFont: boolean }) {
  const { loadResource, isLoaded } = useConditionalResources(hasCustomFont, ['primaryFont']);

  useEffect(() => {
    // Load additional resources based on user interaction
    const handleUserScroll = () => {
      if (window.scrollY > 100) {
        loadResource('analytics');
      }
    };

    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, [loadResource]);

  return (
    <article className={hasCustomFont && isLoaded('primaryFont') ? 'custom-font' : ''}>
      {/* Article content */}
    </article>
  );
}

// Navigation component that prefetches next pages
function Navigation() {
  const { loadResource } = useResourceLoader([]);

  const handleLinkHover = (href: string) => {
    // Prefetch resources for likely next navigation
    if (href.includes('/dashboard')) {
      loadResource('dashboardStyles');
    }
  };

  return (
    <nav>
      <Link href="/dashboard" onMouseEnter={() => handleLinkHover('/dashboard')}>
        Dashboard
      </Link>
    </nav>
  );
}
```

## استراتيجيات متقدمة لتحميل المصادر

أحيانًا تحتاج منطق تحميل أكثر تعقيدًا. هذه بعض الأنماط للتعامل مع السيناريوهات المركّبة:

```typescript
// Priority-based loading manager
class PriorityResourceManager extends ResourceManager {
  private priorityQueue: Array<{ key: ResourceKey; priority: number }> = [];

  queueResource(key: ResourceKey, priority: number = 0): void {
    if (this.isLoaded(key) || this.isLoading(key)) return;

    this.priorityQueue.push({ key, priority });
    this.priorityQueue.sort((a, b) => b.priority - a.priority);
  }

  async processQueue(maxConcurrent: number = 3): Promise<void> {
    const batch = this.priorityQueue.splice(0, maxConcurrent);

    const loadPromises = batch.map(({ key }) =>
      this.loadResource(key).catch((error) =>
        console.error(`Priority loading failed for ${key}:`, error),
      ),
    );

    await Promise.all(loadPromises);

    // Process next batch if queue has items
    if (this.priorityQueue.length > 0) {
      await this.processQueue(maxConcurrent);
    }
  }
}

// Connection-aware loading
function useConnectionAwareLoading(resources: ResourceKey[]) {
  const [connectionInfo, setConnectionInfo] = useState(() =>
    'connection' in navigator
      ? {
          effectiveType: (navigator as any).connection?.effectiveType,
          saveData: (navigator as any).connection?.saveData,
        }
      : null,
  );

  useEffect(() => {
    const updateConnection = () => {
      if ('connection' in navigator) {
        setConnectionInfo({
          effectiveType: (navigator as any).connection?.effectiveType,
          saveData: (navigator as any).connection?.saveData,
        });
      }
    };

    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateConnection);
      return () => (navigator as any).connection.removeEventListener('change', updateConnection);
    }
  }, []);

  const shouldPreload =
    !connectionInfo?.saveData && ['4g', '3g'].includes(connectionInfo?.effectiveType);

  return useResourceLoader(shouldPreload ? resources : [], { eager: shouldPreload });
}
```

## التصحيح والاندماج في أدوات المطوّر

قد يكون تصحيح التحميل المسبق للمصادر عسيرًا. لنضف بعض التحسينات لتجربة المطوّر:

```typescript
// Development-only resource monitor
class ResourceMonitor {
  private static instance: ResourceMonitor;
  private logs: Array<{
    timestamp: Date;
    action: string;
    resource: string;
    details?: any;
  }> = [];

  static getInstance(): ResourceMonitor {
    if (!ResourceMonitor.instance) {
      ResourceMonitor.instance = new ResourceMonitor();
    }
    return ResourceMonitor.instance;
  }

  log(action: string, resource: string, details?: any): void {
    if (process.env.NODE_ENV !== 'development') return;

    this.logs.push({
      timestamp: new Date(),
      action,
      resource,
      details,
    });

    console.group(`🚀 Resource ${action}: ${resource}`);
    if (details) console.log('Details:', details);
    console.log('Time:', new Date().toISOString());
    console.groupEnd();
  }

  getDuplicateLoads(): string[] {
    const loadCounts = this.logs.reduce(
      (acc, log) => {
        if (log.action === 'load') {
          acc[log.resource] = (acc[log.resource] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(loadCounts)
      .filter(([, count]) => count > 1)
      .map(([resource]) => resource);
  }

  getLoadingStats(): Record<string, number> {
    return this.logs.reduce(
      (acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}

// Enhanced resource manager with monitoring
class MonitoredResourceManager extends ResourceManager {
  private monitor = ResourceMonitor.getInstance();

  async loadResource<T extends ResourceKey>(key: T, options?: { force?: boolean }): Promise<void> {
    this.monitor.log('requested', key, { force: options?.force });

    if (!options?.force && this.isLoaded(key)) {
      this.monitor.log('skipped', key, { reason: 'already loaded' });
      return;
    }

    this.monitor.log('loading', key);

    try {
      await super.loadResource(key, options);
      this.monitor.log('loaded', key);
    } catch (error) {
      this.monitor.log('failed', key, { error: error.message });
      throw error;
    }
  }
}
```

## اعتبارات الأداء وأفضل الممارسات

التحميل المسبق للمصادر قوي، لكنه يأتي بمفاضلاتٍ ينبغي أن تفهمها:

### أثر الذاكرة وعرض النطاق

```typescript
// ❌ Aggressive preloading can hurt performance
const BAD_PRELOAD_STRATEGY = [
  'heavyImage1',
  'heavyImage2',
  'heavyImage3', // 5MB each
  'unusedScript1',
  'unusedScript2', // User may never see these
  'allFonts', // Loading all font weights when you need one
];

// ✅ Strategic preloading based on user behavior
function useSmartPreloading() {
  const { loadResource } = useResourceLoader([]);

  useEffect(() => {
    // Preload based on user intent signals
    const handleMouseMove = () => {
      // User is actively browsing, preload likely next resources
      loadResource('nextPageStyles');
    };

    const handleIdle = () => {
      // Browser is idle, safe to prefetch lower-priority resources
      loadResource('backgroundImage');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('requestIdleCallback', handleIdle);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('requestIdleCallback', handleIdle);
    };
  }, [loadResource]);
}
```

### ترتيب أولوية المصادر الحرجة

```typescript
// Resource loading phases
const LOADING_PHASES = {
  critical: ['criticalStyles', 'primaryFont'], // Block render
  important: ['analytics', 'errorTracking'], // Load early
  optional: ['backgroundImage', 'socialWidgets'], // Load when idle
} as const;

function usePhaseBasedLoading() {
  const [currentPhase, setCurrentPhase] = useState<keyof typeof LOADING_PHASES>('critical');

  // Load critical resources immediately
  useResourceLoader(LOADING_PHASES.critical, { eager: true });

  // Load important resources after critical ones
  const { isLoading: criticalLoading } = useResourceLoader(LOADING_PHASES.critical);
  useResourceLoader(LOADING_PHASES.important, { eager: !criticalLoading });

  // Load optional resources when idle
  useEffect(() => {
    if (criticalLoading) return;

    const idleCallback = () => {
      setCurrentPhase('optional');
    };

    const timeoutId = setTimeout(idleCallback, 1000);
    return () => clearTimeout(timeoutId);
  }, [criticalLoading]);

  useResourceLoader(LOADING_PHASES.optional, { eager: currentPhase === 'optional' });
}
```

> **تحذير**
>
> قد يضر تحميل موارد كثيرة مسبقًا بالأداء فعلًا، إذ تتنافس على عرض النطاق مع المصادر الحرجة. قِس التأثير في مؤشرات الويب الحيوية (Core Web Vitals) دائمًا.

## اختبار تحميل المصادر

منطق التحميل المسبق للمصادر يحتاج اختبارًا، لكن محاكاة واجهات النطاري قد تكون دقيقة:

```typescript
// Test utilities for resource loading
export class MockResourceManager extends ResourceManager {
  public mockLoadPromises = new Map<string, Promise<void>>();
  public mockLoadCalls: Array<{ key: ResourceKey; timestamp: Date }> = [];

  async loadResource<T extends ResourceKey>(key: T, options?: { force?: boolean }): Promise<void> {
    this.mockLoadCalls.push({ key, timestamp: new Date() });

    // Simulate loading delay
    const loadPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 100);
    });

    this.mockLoadPromises.set(key, loadPromise);
    return loadPromise;
  }

  // Test helpers
  getLoadCallCount(key: ResourceKey): number {
    return this.mockLoadCalls.filter((call) => call.key === key).length;
  }

  reset(): void {
    this.mockLoadCalls = [];
    this.mockLoadPromises.clear();
  }
}

// Example test
describe('useResourceLoader', () => {
  let mockManager: MockResourceManager;

  beforeEach(() => {
    mockManager = new MockResourceManager();
  });

  test('should not load resources multiple times', async () => {
    const { result } = renderHook(() => useResourceLoader(['criticalStyles'], { eager: true }));

    await waitFor(() => {
      expect(result.current.isLoaded('criticalStyles')).toBe(true);
    });

    expect(mockManager.getLoadCallCount('criticalStyles')).toBe(1);
  });
});
```

لا يتعين أن يكون التحميل المسبق للمصادر مع TypeScript منبعًا للعلل ومفاجآت الأداء. فبتجريد آمن الأنواع حول واجهات التحميل المسبق في React تحصل على مزايا أداء التحميل الذكي للمصادر مع تلك الثقة التي يمنحها التحقق وقت التصريف ومزالة الازدواج وقت التشغيل.

القواعد الأساسية: عرِّف مصادرك في مفهرس مركزي، واجعل TypeScript يمنع الأخطاء، وامحُ الازدواج بشدة، وقِس أثر الأداء دائمًا. وسيشكر مستخدموك على أزمنة التحميل الأسرع، وستشكرك نفسك المستقبلية على شيفرة يسيرة الصيانة.
