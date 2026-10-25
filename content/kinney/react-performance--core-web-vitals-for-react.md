---
title: "مؤشرات الويب الأساسية (Core Web Vitals) لـ React"
lang: ar
source: "https://stevekinney.com/courses/react-performance/core-web-vitals-for-react"
---

ليست مؤشرات الويب الأساسية مجرّد عامل ترتيب SEO أحدث من Google، بل مقياس لإحباط المستخدمين الحقيقي. فزمن أكبر رسم محتوى (Largest Contentful Paint) البالغ 4 ثوانٍ يعني أن المستخدمين يحدّقون في شاشة فارغة. وتأخّر أول إدخال (First Input Delay) البالغ 300 مللي ثانية يعني أن النقرات تبدو معطّلة. والانزلاق التراكمي للتخطيط (Cumulative Layout Shift) البالغ 0.25 يعني أن المحتوى يتقافز كقلعة قافزة. وبالنسبة لمطوّري React، يتطلّب تحسين هذه المقاييس فهم كيف يؤثّر سلوك التصيير في React في تجربة المستخدم.

وبخلاف مقاييس الأداء الاصطناعية التي تتذبذب بشدّة بين بيئات الاختبار، تعكس مؤشرات الويب الأساسية ما يختبره المستخدمون الفعليون على أجهزة فعلية وظروف شبكة فعلية. أتقن هذه المقاييس الثلاثة — LCP وFID (الذي حلّ محلّه INP الآن) وCLS — وستحصل على مستخدمين يبقون متفاعلين ومحرّكات بحث تحبّ موقعك.

## فهم مؤشرات الويب الأساسية

تقيس مؤشرات الويب الأساسية الثلاثة جوانب مختلفة من تجربة المستخدم:

- **أكبر رسم محتوى (Largest Contentful Paint - LCP)**: مدى سرعة تصيير أكبر عنصر (أداء التحميل)
- **تأخّر أول إدخال (First Input Delay - FID)** / **التفاعل إلى الرسم التالي (Interaction to Next Paint - INP)**: مدى سرعة استجابة الصفحة لتفاعلات المستخدم (التفاعلية)
- **الانزلاق التراكمي للتخطيط (Cumulative Layout Shift - CLS)**: مقدار تقافز المحتوى أثناء التحميل (الاستقرار البصري)

إليك كيف تبدو النتائج الجيدة:

```typescript
// Target scores for Core Web Vitals
const goodScores = {
  largestContentfulPaint: 2500, // ≤ 2.5 seconds
  interactionToNextPaint: 200, // ≤ 200ms (replaces FID in 2024)
  cumulativeLayoutShift: 0.1, // ≤ 0.1 (10% of viewport)
};

// How to measure in React
function measureWebVitals() {
  // Modern measurement with web-vitals library
  import { getLCP, getFID, getCLS, getFCP, getTTFB } from 'web-vitals';

  getLCP((metric) => {
    console.log('LCP:', metric);
    // Send to your analytics service
    gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: 'LCP',
      value: Math.round(metric.value),
    });
  });

  getFID((metric) => {
    console.log('FID:', metric);
    gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: 'FID',
      value: Math.round(metric.value),
    });
  });

  getCLS((metric) => {
    console.log('CLS:', metric);
    gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: 'CLS',
      value: metric.value,
    });
  });
}
```

> **نصيحة**
>
> ثبّت مكتبة [web-vitals](https://github.com/GoogleChrome/web-vitals) لقياس هذه المقاييس بدقة في الإنتاج. لا تعتمد على نتائج Lighthouse وحدها — فبيانات المستخدمين الحقيقيين أهم.

## تحسين أكبر رسم محتوى (LCP)

يقيس LCP متى ينتهي تصيير أكبر عنصر في إطار العرض. وفي تطبيقات React، يكون هذا غالبًا صورة رئيسية أو عنوانًا أو كتلة محتوى أساسية.

### تحديد عنصر LCP لديك

```typescript
// Hook to identify LCP element in development
function useLCPDetection() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      let lcpElement: Element | null = null;

      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        if (lastEntry && lastEntry.element) {
          // Highlight the LCP element
          if (lcpElement) {
            (lcpElement as HTMLElement).style.outline = '';
          }

          lcpElement = lastEntry.element;
          (lcpElement as HTMLElement).style.outline = '3px solid red';

          console.log('LCP Element:', lcpElement, 'Time:', lastEntry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);
}

// Use in your main component
function App() {
  useLCPDetection();
  return <YourAppContent />;
}
```

### استراتيجيات تحسين LCP

#### تحسين موارد المسار الحرج

```typescript
// Hero component optimized for LCP
function OptimizedHero({ title, image, subtitle }: HeroProps) {
  return (
    <section className="hero">
      {/* Preload critical image */}
      <link rel="preload" as="image" href={image.src} />

      {/* Optimize image loading */}
      <img
        src={image.src}
        srcSet={`
          ${image.src_320} 320w,
          ${image.src_640} 640w,
          ${image.src_1280} 1280w
        `}
        sizes="(max-width: 640px) 320px, (max-width: 1280px) 640px, 1280px"
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="eager" // Don't lazy load LCP images!
        decoding="sync" // Prioritize decoding
        className="hero__image"
      />

      {/* Critical text content */}
      <div className="hero__content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

// Don't lazy load your LCP element!
function BadHero() {
  return (
    <section className="hero">
      {/* ❌ Never lazy load the LCP element */}
      <img loading="lazy" src="/hero.jpg" alt="Hero" />
      <h1>Welcome</h1>
    </section>
  );
}

// Resource preloading for critical content
function DocumentHead() {
  return (
    <Head>
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossOrigin="" />
      <link rel="preload" href="/api/critical-data" as="fetch" crossOrigin="" />
      <link rel="preload" href="/hero-image.jpg" as="image" />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdn.example.com" />
    </Head>
  );
}
```

#### التصيير من الخادم والبثّ

```typescript
// Optimize initial HTML delivery
function StreamingApp() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      {/* Critical above-the-fold content */}
      <Hero />

      <Suspense fallback={<ContentSkeleton />}>
        {/* Non-critical content can stream later */}
        <MainContent />
      </Suspense>
    </Suspense>
  );
}

// Inline critical CSS for LCP elements
function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .hero {
          display: block;
          width: 100%;
          min-height: 50vh;
        }
        .hero__image {
          width: 100%;
          height: auto;
          display: block;
        }
        .hero__content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
        }
      `,
      }}
    ></style>
  );
}
```

#### تقنيات تحسين الصور

```typescript
// Modern image optimization
function OptimizedImage({ src, alt, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <picture>
      {/* Modern formats first */}
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />

      {/* Fallback */}
      <img
        src={`${src}.jpg`}
        alt={alt}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding={props.priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        {...props}
      />
    </picture>
  );
}

// Next.js Image component is optimized by default
import Image from 'next/image';

function NextjsOptimizedHero() {
  return (
    <div className="hero">
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority // This tells Next.js it's the LCP element
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." // Base64 blur
      />
    </div>
  );
}
```

## تحسين التفاعل إلى الرسم التالي (INP)

يقيس INP (الذي حلّ محلّ FID) زمن استجابة جميع تفاعلات المستخدم على مدار دورة حياة الصفحة. وفي تطبيقات React، يعني هذا غالبًا تحسين معالجات الأحداث وتحديثات الحالة.

### مشكلات INP الشائعة في React

```typescript
// ❌ Bad: Blocking the main thread with expensive work
function SlowButton({ items }: { items: Item[] }) {
  const handleClick = () => {
    // This blocks the UI thread
    const result = items
      .map((item) => expensiveCalculation(item))
      .sort((a, b) => a.value - b.value)
      .slice(0, 10);

    setResults(result);
  };

  return <button onClick={handleClick}>Process Items</button>;
}

// ✅ Good: Using transitions to keep interactions responsive
function ResponsiveButton({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Keep the click response immediate
    setLoadingState('processing');

    // Defer the expensive work
    startTransition(() => {
      const result = items
        .map((item) => expensiveCalculation(item))
        .sort((a, b) => a.value - b.value)
        .slice(0, 10);

      setResults(result);
      setLoadingState('complete');
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Processing...' : 'Process Items'}
    </button>
  );
}
```

### تحسين INP المتقدّم

```typescript
// Time slicing for large lists
function useTimeSlicing<T>(items: T[], processItem: (item: T) => any, chunkSize = 50) {
  const [results, setResults] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processChunk = useCallback(
    async (startIndex: number) => {
      const endIndex = Math.min(startIndex + chunkSize, items.length);
      const chunk = items.slice(startIndex, endIndex);

      // Process chunk
      const chunkResults = chunk.map(processItem);

      // Update state
      setResults((prev) => [...prev, ...chunkResults]);

      // Continue processing if there are more items
      if (endIndex < items.length) {
        // Yield control back to browser
        await new Promise((resolve) => setTimeout(resolve, 0));
        return processChunk(endIndex);
      } else {
        setIsProcessing(false);
      }
    },
    [items, processItem, chunkSize],
  );

  const startProcessing = useCallback(() => {
    setResults([]);
    setIsProcessing(true);
    processChunk(0);
  }, [processChunk]);

  return { results, isProcessing, startProcessing };
}

// Usage
function TimeSlicedList({ items }: { items: Item[] }) {
  const { results, isProcessing, startProcessing } = useTimeSlicing(
    items,
    (item) => ({ ...item, processed: true }),
    100, // Process 100 items at a time
  );

  return (
    <div>
      <button onClick={startProcessing} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Process All Items'}
      </button>
      <div>
        {results.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

// Web Workers for CPU-intensive tasks
function useWebWorkerTask<T, R>(workerScript: string) {
  const [result, setResult] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeTask = useCallback(
    async (data: T): Promise<R> => {
      return new Promise((resolve, reject) => {
        setIsLoading(true);
        setError(null);

        const worker = new Worker(workerScript);

        worker.onmessage = (event) => {
          setResult(event.data);
          setIsLoading(false);
          resolve(event.data);
          worker.terminate();
        };

        worker.onerror = (error) => {
          setError(new Error(error.message));
          setIsLoading(false);
          reject(error);
          worker.terminate();
        };

        worker.postMessage(data);
      });
    },
    [workerScript],
  );

  return { result, isLoading, error, executeTask };
}

// Web Worker script (worker.js)
/*
self.onmessage = function(e) {
  const data = e.data;

  // Perform expensive calculation
  const result = data.map(item => {
    // CPU-intensive work here
    return processItem(item);
  });

  self.postMessage(result);
};
*/
```

### تحسين معالجات الأحداث

```typescript
// Debounce frequent events
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Optimized search input
function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
}

// Throttle scroll events
function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const [shouldWait, setShouldWait] = useState(false);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (shouldWait) return;

      callback(...args);
      setShouldWait(true);

      setTimeout(() => {
        setShouldWait(false);
      }, delay);
    }) as T,
    [callback, delay, shouldWait],
  );
}
```

## تحسين الانزلاق التراكمي للتخطيط (CLS)

يقيس CLS مقدار تقافز المحتوى أثناء التحميل. وقد يتسبّب التصيير الديناميكي في React بسهولة في انزلاقات التخطيط إن لم يُعالَج بحذر.

### مشكلات CLS الشائعة

```typescript
// ❌ Bad: Images without dimensions cause layout shift
function BadImageGallery({ images }: { images: Image[] }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <img key={image.id} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
}

// ✅ Good: Always specify image dimensions
function GoodImageGallery({ images }: { images: Image[] }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className="image-container"
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
          }}
        >
          <img
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
```

### أنماط التحميل الهيكلي

```typescript
// Skeleton component that matches final content size
function UserCardSkeleton() {
  return (
    <div className="user-card" aria-hidden="true">
      <div className="skeleton avatar" style={{ width: 48, height: 48, borderRadius: '50%' }} />
      <div className="skeleton-content">
        <div className="skeleton name" style={{ width: 120, height: 16 }} />
        <div className="skeleton email" style={{ width: 180, height: 14 }} />
        <div className="skeleton role" style={{ width: 80, height: 12 }} />
      </div>
    </div>
  );
}

// CSS for skeleton animations
const skeletonStyles = `
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

// Component that prevents layout shift
function UserCard({ user }: { user: User | null }) {
  if (!user) {
    return <UserCardSkeleton />;
  }

  return (
    <div className="user-card">
      <img
        src={user.avatar}
        alt={`${user.name} avatar`}
        width={48}
        height={48}
        className="avatar"
      />
      <div className="user-content">
        <h3 className="name">{user.name}</h3>
        <p className="email">{user.email}</p>
        <span className="role">{user.role}</span>
      </div>
    </div>
  );
}
```

### تحسين تحميل الخطوط

```typescript
// Prevent font swap layout shifts
function FontOptimization() {
  return (
    <Head>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />

      {/* Font CSS with swap strategy */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'Inter';
            src: url('/fonts/inter-var.woff2') format('woff2');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap; /* Use fallback font until custom font loads */
          }

          /* Size-adjust to match fallback font */
          @font-face {
            font-family: 'Inter Fallback';
            src: local('Arial');
            size-adjust: 107%; /* Adjust based on font metrics */
          }

          body {
            font-family: 'Inter', 'Inter Fallback', -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `,
        }}
      />
    </Head>
  );
}

// Component-level font loading
function TextWithFallback({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is loaded
    if ('fonts' in document) {
      document.fonts.load('16px Inter').then(() => {
        setFontLoaded(true);
      });
    }
  }, []);

  return (
    <span
      className={`${className} ${fontLoaded ? 'font-loaded' : 'font-loading'}`}
      style={{
        fontFamily: fontLoaded ? 'Inter, sans-serif' : 'Arial, sans-serif', // Fallback while loading
      }}
    >
      {children}
    </span>
  );
}
```

### المحتوى الديناميكي وانزلاقات التخطيط

```typescript
// Reserve space for dynamic content
function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div
      className="newsletter-signup"
      style={{
        minHeight: 120, // Reserve space for all states
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isSubmitted ? (
        <div className="success-message">
          <h3>Thanks for subscribing!</h3>
          <p>Check your email for confirmation.</p>
        </div>
      ) : (
        <form className="signup-form">
          <input type="email" placeholder="Enter your email" />
          <button disabled={isSubmitting}>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</button>
        </form>
      )}
    </div>
  );
}

// Animate content changes without layout shift
function AnimatedContent({ show }: { show: boolean }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
          opacity: show ? 1 : 0,
        }}
      >
        <p>This content animates in without causing layout shift</p>
      </div>
    </div>
  );
}
```

## مراقبة مؤشرات الويب الأساسية في الإنتاج

```typescript
// Comprehensive Web Vitals monitoring
class WebVitalsMonitor {
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.setupObservers();
  }

  private setupObservers(): void {
    // LCP Observer
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID/INP Observer
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.name === 'first-input') {
          this.metrics.set('FID', entry.processingStart - entry.startTime);
          this.reportMetric('FID', entry.processingStart - entry.startTime);
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS Observer
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.set('CLS', clsValue);
        }
      });

      // Report final CLS on page unload
      window.addEventListener('beforeunload', () => {
        this.reportMetric('CLS', clsValue);
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private reportMetric(name: string, value: number): void {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
      });
    }

    // Send to custom endpoint
    fetch('/api/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        value,
        url: location.href,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Fail silently to avoid affecting user experience
    });
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}

// Initialize monitoring
const webVitalsMonitor = new WebVitalsMonitor();
```

## الاختبار والتصحيح

```typescript
// Development tools for Web Vitals debugging
function WebVitalsDevTools() {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Import web-vitals in development
      import('web-vitals').then(({ getLCP, getFID, getCLS }) => {
        getLCP((metric) => {
          setMetrics((prev) => ({ ...prev, LCP: metric.value }));

          // Highlight LCP element
          if (metric.entries.length > 0) {
            const lcpElement = (metric.entries[0] as any).element;
            if (lcpElement) {
              lcpElement.style.outline = '3px solid orange';
              lcpElement.setAttribute('data-lcp', 'true');
            }
          }
        });

        getFID((metric) => {
          setMetrics((prev) => ({ ...prev, FID: metric.value }));
        });

        getCLS((metric) => {
          setMetrics((prev) => ({ ...prev, CLS: metric.value }));
        });
      });
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#000',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        fontSize: 12,
        zIndex: 9999,
      }}
    >
      <div>LCP: {metrics.LCP?.toFixed(0)}ms</div>
      <div>FID: {metrics.FID?.toFixed(0)}ms</div>
      <div>CLS: {metrics.CLS?.toFixed(3)}</div>
    </div>
  );
}
```

## مزالق شائعة وحلولها

### المزلق: التحسين حسب بيانات المختبر فقط

```typescript
// ❌ Bad: Only testing with fast connections
// Lighthouse with default settings doesn't represent real users

// ✅ Good: Test with realistic conditions
const puppeteer = require('puppeteer');

async function testRealWorldConditions() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Simulate slow 3G
  await page.emulateNetworkConditions({
    offline: false,
    downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
    uploadThroughput: (750 * 1024) / 8, // 750 Kbps
    latency: 150, // 150ms RTT
  });

  // Simulate low-end mobile CPU
  await page.emulateCPUThrottling(6); // 6x slower than normal

  await page.goto('http://localhost:3000');

  // Measure performance
  const metrics = await page.metrics();
  console.log('Real-world metrics:', metrics);

  await browser.close();
}
```

## الخطوات التالية

تحسين مؤشرات الويب الأساسية عملية مستمرة، وليس إصلاحًا لمرّة واحدة. أهم الاستنتاجات:

1. **قِس في الإنتاج** - لا تعكس بيانات المختبر دائمًا تجربة المستخدم الحقيقية
2. **ركّز على رحلة المستخدم** - حسّن أهم مسارات المستخدم أولًا
3. **اختبر على أجهزة حقيقية** - فجهاز MacBook Pro الخاص بك لا يمثّل مستخدميك
4. **راقب الانتكاسات** - أعدّ تنبيهات لتراجع المقاييس
5. **وازن بين التحسين وسرعة التطوير** - لا تضحِّ بقابلية الصيانة مقابل مكاسب هامشية

يُثمر الاستثمار في مؤشرات الويب الأساسية في تفاعل المستخدمين ومعدّلات التحويل وترتيب البحث. ابدأ بأكبر المكاسب (تحسين الصور، وتحميل الخطوط، وشاشات التحميل الهيكلي)، ثم عالج تحديات الأداء الأكثر تعقيدًا بمنهجية.
