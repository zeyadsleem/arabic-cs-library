---
title: "تلميحات الأولوية وتحميل الموارد"
---

يُحمَّل تطبيق React لديك. في النهاية. أولًا HTML، ثم CSS، ثم JavaScript، ثم الخطوط، ثم الصور، ثم مزيد من JavaScript، ثم استدعاءات API… وبحلول الوقت الذي يرى فيه مستخدمك أي شيء مفيد، يكون قد كتب في ذهنه رسالة استقالته من تطبيقك. يبذل المتصفح قصارى جهده، لكنه يخمّن ما هو مهم. فماذا لو استطعت إخباره بما يجب أن يعطيه الأولوية بالضبط؟

ادخل إلى عالم تلميحات الموارد (resource hints) والتحميل بالأولوية — أسلحتك السرّية لتنسيق سيمفونية تحميل مثالية. فهي ليست مجرّد وسوم `<link>` تنثرها هنا وهناك آملًا في أفضل النتائج، بل أدوات دقيقة يمكنها، عند استخدامها على نحو صحيح، أن تخفض زمن الوصول إلى التفاعل (Time to Interactive) إلى النصف.

لنتعمّق في كيفية تحميل المتصفحات الحديثة للموارد، وكيف يمكنك التحكّم في تلك العملية لتقديم تطبيقات React فائقة السرعة.

## فهم تحميل المتصفح للموارد

قبل أن نحسّن، لنفهم كيف يحدّد المتصفح أولويات الموارد:

```typescript
interface BrowserPrioritySystem {
  critical: ['HTML', 'CSS in <head>', 'Fonts in use'];
  high: ['Scripts in <head>', 'Preload resources', 'XHR/Fetch'];
  medium: ['Scripts in <body>', 'Images in viewport'];
  low: ['Images below fold', 'Async scripts', 'Prefetch'];
  idle: ['Prerender', 'Speculative loads'];
}

// Browser's default loading waterfall
// 1. Parse HTML
// 2. Discover resources
// 3. Assign priorities
// 4. Fetch based on priority and connection limits
// 5. Execute/render as resources arrive
```

## تلميحات الأولوية عبر fetchpriority

تتيح لك خاصية `fetchpriority` تجاوز الأولويات الافتراضية للمتصفح:

```typescript
// ❌ Browser guesses importance
const UnoptimizedHero: React.FC = () => {
  return (
    <div>
      <img src="/hero.jpg" alt="Hero" />
      <img src="/thumbnail1.jpg" alt="Thumb 1" />
      <img src="/thumbnail2.jpg" alt="Thumb 2" />
    </div>
  );
};

// ✅ Explicit priority hints
const OptimizedHero: React.FC = () => {
  return (
    <div>
      <img
        src="/hero.jpg"
        alt="Hero"
        fetchpriority="high"  // Load this first!
      />
      <img
        src="/thumbnail1.jpg"
        alt="Thumb 1"
        fetchpriority="low"   // Load after critical content
      />
      <img
        src="/thumbnail2.jpg"
        alt="Thumb 2"
        fetchpriority="low"
      />
    </div>
  );
};
```

### إدارة الأولويات ديناميكيًا

اضبط الأولويات بناءً على سلوك المستخدم:

```typescript
const useDynamicPriority = () => {
  const [priority, setPriority] = useState<'high' | 'low' | 'auto'>('auto');

  useEffect(() => {
    // Detect slow connection
    const connection = (navigator as any).connection;
    if (connection?.effectiveType === '2g' || connection?.saveData) {
      setPriority('low');
      return;
    }

    // High priority for fast connections
    if (connection?.effectiveType === '4g') {
      setPriority('high');
    }
  }, []);

  return priority;
};

const AdaptiveImage: React.FC<{ src: string; critical?: boolean }> = ({
  src,
  critical = false
}) => {
  const priority = useDynamicPriority();

  return (
    <img
      src={src}
      fetchpriority={critical ? 'high' : priority}
      loading={critical ? 'eager' : 'lazy'}
    />
  );
};
```

## التحميل المسبق للموارد الحرجة

أخبر المتصفح بالموارد الحرجة قبل أن يكتشفها تلقائيًا. وللاطلاع على واجهات التحميل المسبق الجديدة للموارد في React 19 (`preload` و`preinit` و`prefetchDNS`)، راجع [resource-preloading-apis.md](https://stevekinney.com/courses/react-performance/resource-preloading-apis).

```typescript
// React component for managing preloads
const ResourcePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical font
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = '/fonts/main.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.as = 'style';
    cssLink.href = '/critical.css';
    cssLink.onload = function () {
      this.rel = 'stylesheet';
    };
    document.head.appendChild(cssLink);

    // Preload hero image
    const imgLink = document.createElement('link');
    imgLink.rel = 'preload';
    imgLink.as = 'image';
    imgLink.href = '/hero.webp';
    imgLink.fetchpriority = 'high';
    document.head.appendChild(imgLink);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};
```

### تحميل مسبق ذكي وفق المسارات

حمّل الموارد مسبقًا للتنقّل التالي المحتمل:

```typescript
const useRoutePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload resources for likely next routes
    const preloadMap: Record<string, string[]> = {
      '/': ['/api/featured', '/images/hero.webp'],
      '/products': ['/api/products', '/js/product-gallery.js'],
      '/checkout': ['/api/cart', '/js/payment-processor.js'],
    };

    const currentPath = location.pathname;
    const resourcesToPreload = preloadMap[currentPath] || [];

    resourcesToPreload.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;

      // Determine resource type
      if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.includes('/api/')) {
        link.as = 'fetch';
      } else if (resource.match(/\.(webp|jpg|png)$/)) {
        link.as = 'image';
      }

      document.head.appendChild(link);
    });
  }, [location]);
};
```

## الجلب المسبق لـ DNS والاتصال المسبق

أنشئ الاتصالات مبكرًا لتقليل زمن الاستجابة:

```typescript
const ConnectionOptimizer: React.FC = () => {
  useEffect(() => {
    const connections = [
      { href: 'https://api.example.com', type: 'preconnect' },
      { href: 'https://cdn.example.com', type: 'preconnect' },
      { href: 'https://analytics.example.com', type: 'dns-prefetch' },
      { href: 'https://fonts.googleapis.com', type: 'preconnect' },
    ];

    connections.forEach(({ href, type }) => {
      const link = document.createElement('link');
      link.rel = type;
      link.href = href;

      if (type === 'preconnect') {
        link.crossOrigin = 'anonymous';
      }

      document.head.appendChild(link);
    });
  }, []);

  return null;
};
```

### إدارة ذكية للاتصالات

لا تسبق الاتصال إلا بالنطاقات التي ستستخدمها فعلًا:

```typescript
class ConnectionManager {
  private connected = new Set<string>();
  private pending = new Map<string, number>();
  private maxConnections = 6; // Browser limit

  preconnect(origin: string, priority: number = 0) {
    if (this.connected.has(origin)) return;

    this.pending.set(origin, priority);
    this.processPending();
  }

  private processPending() {
    if (this.connected.size >= this.maxConnections) return;

    // Sort by priority
    const sorted = Array.from(this.pending.entries()).sort((a, b) => b[1] - a[1]);

    const [origin] = sorted[0] || [];
    if (!origin) return;

    this.pending.delete(origin);
    this.connected.add(origin);

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Track connection lifecycle
    setTimeout(() => {
      this.connected.delete(origin);
      this.processPending();
    }, 10000); // Connections typically timeout after 10s
  }
}

const useConnectionManager = () => {
  const managerRef = useRef(new ConnectionManager());

  const preconnect = useCallback((url: string, priority?: number) => {
    const origin = new URL(url).origin;
    managerRef.current.preconnect(origin, priority);
  }, []);

  return { preconnect };
};
```

## الجلب المسبق للتنقّل المستقبلي

حمّل الموارد للتنقّل المستقبلي المحتمل:

```typescript
// ❌ No prefetching
const BasicLink: React.FC<{ href: string }> = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

// ✅ Smart prefetching on hover/focus
const SmartLink: React.FC<{ href: string }> = ({ href, children }) => {
  const [prefetched, setPrefetched] = useState(false);

  const prefetch = useCallback(() => {
    if (prefetched) return;

    // Prefetch the route's bundle
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/js/${href.slice(1)}.bundle.js`;
    link.as = 'script';
    document.head.appendChild(link);

    // Prefetch route data
    fetch(`/api/preload${href}`, {
      method: 'HEAD',
      priority: 'low'
    });

    setPrefetched(true);
  }, [href, prefetched]);

  return (
    <Link
      to={href}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      onTouchStart={prefetch}
    >
      {children}
    </Link>
  );
};
```

### الجلب المسبق عبر Intersection Observer

اجلب الموارد مسبقًا حين تصبح الروابط مرئية:

```typescript
const usePrefetchOnVisible = (enabled: boolean = true) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefetchedUrls = useRef(new Set<string>());

  useEffect(() => {
    if (!enabled) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.href;

            if (!prefetchedUrls.current.has(href)) {
              prefetchedUrls.current.add(href);

              // Prefetch the page
              const prefetchLink = document.createElement('link');
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = href;
              prefetchLink.as = 'document';
              document.head.appendChild(prefetchLink);

              // Stop observing
              observerRef.current?.unobserve(link);
            }
          }
        });
      },
      { rootMargin: '50px' },
    );

    // Observe all links
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      observerRef.current?.observe(link);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled]);
};
```

## التصيير المسبق لتنقّل فوري

صيّر صفحات كاملة مسبقًا لتنقّل فوري:

```typescript
const usePrerenderPrediction = () => {
  const [prerendering, setPrerendering] = useState<string | null>(null);

  const predictNextPage = useCallback(() => {
    // Use analytics or ML to predict next page
    const predictions = analyzeUserBehavior();
    const mostLikely = predictions[0];

    if (mostLikely && mostLikely.probability > 0.7) {
      prerenderPage(mostLikely.url);
      setPrerendering(mostLikely.url);
    }
  }, []);

  const prerenderPage = (url: string) => {
    // Check if Speculation Rules API is supported
    if (HTMLScriptElement.supports?.('speculationrules')) {
      const script = document.createElement('script');
      script.type = 'speculationrules';
      script.textContent = JSON.stringify({
        prerender: [
          {
            source: 'list',
            urls: [url],
          },
        ],
      });
      document.head.appendChild(script);
    } else {
      // Fallback to prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    }
  };

  return { predictNextPage, prerendering };
};
```

## التحميل المسبق للوحدات مع تقسيم الشيفرة

حسّن الحزم المقسّمة بالاعتماد على modulepreload:

```typescript
const ModulePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical modules
    const modules = ['/js/vendor.chunk.js', '/js/framework.chunk.js', '/js/main.chunk.js'];

    modules.forEach((module) => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = module;
      link.as = 'script';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

// Webpack configuration for modulepreload
const webpackConfig = {
  output: {
    crossOriginLoading: 'anonymous',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10,
        },
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'framework',
          priority: 20,
        },
      },
    },
  },
};
```

## التكامل مع Resource Timing API

راقب أثر تلميحات الموارد لديك:

```typescript
class ResourceTimingMonitor {
  private metrics: Map<string, PerformanceResourceTiming> = new Map();

  startMonitoring() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          this.metrics.set(resource.name, resource);
          this.analyzeResource(resource);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private analyzeResource(resource: PerformanceResourceTiming) {
    const metrics = {
      dns: resource.domainLookupEnd - resource.domainLookupStart,
      tcp: resource.connectEnd - resource.connectStart,
      ttfb: resource.responseStart - resource.fetchStart,
      download: resource.responseEnd - resource.responseStart,
      total: resource.responseEnd - resource.fetchStart,
    };

    // Check if preconnect helped
    if (metrics.dns === 0 && metrics.tcp === 0) {
      console.log(`✅ Preconnect worked for ${new URL(resource.name).origin}`);
    }

    // Check if resource was cached
    if (resource.transferSize === 0 && resource.decodedBodySize > 0) {
      console.log(`✅ Resource cached: ${resource.name}`);
    }

    // Alert on slow resources
    if (metrics.total > 1000) {
      console.warn(`⚠️ Slow resource: ${resource.name} took ${metrics.total}ms`);
    }
  }

  getMetrics() {
    return Array.from(this.metrics.values()).map((r) => ({
      name: r.name,
      duration: r.duration,
      size: r.transferSize,
      cached: r.transferSize === 0 && r.decodedBodySize > 0,
      protocol: r.nextHopProtocol,
    }));
  }
}
```

## استراتيجية التحميل التكيّفي

اضبط استراتيجية التحميل بناءً على الجهاز والشبكة:

```typescript
const useAdaptiveLoading = () => {
  const [strategy, setStrategy] = useState<'aggressive' | 'balanced' | 'conservative'>('balanced');

  useEffect(() => {
    const connection = (navigator as any).connection;
    const memory = (performance as any).memory;

    // Determine strategy based on conditions
    const determineStrategy = () => {
      // Check network
      if (connection?.saveData) {
        return 'conservative';
      }

      if (connection?.effectiveType === '4g' && connection?.rtt < 50) {
        return 'aggressive';
      }

      // Check memory
      if (memory?.usedJSHeapSize / memory?.jsHeapSizeLimit > 0.9) {
        return 'conservative';
      }

      return 'balanced';
    };

    setStrategy(determineStrategy());

    // Listen for changes
    connection?.addEventListener('change', () => {
      setStrategy(determineStrategy());
    });
  }, []);

  return strategy;
};

const AdaptiveResourceLoader: React.FC = () => {
  const strategy = useAdaptiveLoading();

  const getResourceHints = () => {
    switch (strategy) {
      case 'aggressive':
        return {
          preconnect: ['api', 'cdn', 'analytics', 'fonts'],
          preload: ['critical.css', 'main.js', 'hero.webp'],
          prefetch: ['next-page.html', 'next-bundle.js'],
          modulepreload: true
        };

      case 'conservative':
        return {
          preconnect: ['api'],
          preload: ['critical.css'],
          prefetch: [],
          modulepreload: false
        };

      default:
        return {
          preconnect: ['api', 'cdn'],
          preload: ['critical.css', 'main.js'],
          prefetch: ['next-page.html'],
          modulepreload: true
        };
    }
  };

  const hints = getResourceHints();

  return (
    <>
      {hints.preconnect.map(domain => (
        <link key={domain} rel="preconnect" href={`https://${domain}.example.com`} />
      ))}
      {hints.preload.map(resource => (
        <link key={resource} rel="preload" href={`/${resource}`} as={getResourceType(resource)} />
      ))}
    </>
  );
};
```

## قائمة أفضل الممارسات

✅ **استخدم fetchpriority بحكمة:**

- أولوية عالية لصور LCP والموارد الحرجة
- أولوية منخفضة للمحتوى أسفل الطية
- أولوية تلقائية لكل ما عدا ذلك

✅ **حمّل الموارد الحرجة مسبقًا:**

- الخطوط المستخدمة أعلى الطية
- CSS الحرج
- صور الغلاف الرئيسية
- استدعاءات API المهمة

✅ **سبق الاتصال بالأصول (origins):**

- خوادم API
- نطاقات CDN
- خدمات الطرف الثالث الحرجة
- اقتصر على نطاقين أو ثلاثة

✅ **اجلب مسبقًا بذكاء:**

- التنقّل التالي المحتمل
- الموارد الظاهرة في منطقة العرض
- بناءً على أنماط سلوك المستخدم

✅ **راقب الأثر:**

- استخدم Resource Timing API
- تتبّع Core Web Vitals
- قِس التحسّن الفعلي مقابل المتوقّع

✅ **تكيّف مع الظروف:**

- احترم ترويسة Save-Data
- اضبط الإعداد للاتصالات البطيئة
- راعِ ذاكرة الجهاز
