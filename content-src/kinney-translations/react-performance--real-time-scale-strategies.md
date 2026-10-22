---
title: "استراتيجيات الزمن الحقيقي على نطاق واسع"
---

يتصل تطبيق React لديك بـ WebSocket. تبدأ البيانات بالتدفّق. 10 تحديثات في الثانية — سلس. 100 تحديث في الثانية — مقبول. 1000 تحديث في الثانية — تتجمّد الواجهة، وتتضخّم الذاكرة، ويعرض Chrome صفحة «Aw, Snap!». مرحبًا بك في الواقع القاسي للبيانات الزمنية الحقيقية على نطاق واسع، حيث تصطدم النوايا الحسنة بحدود أداء المتصفح.

وإليك ما لا يخبرك به أحد عن تطبيقات React الزمنية الحقيقية: المشكلة ليست في استقبال البيانات، بل في تصييرها. فكل تحديث حالة يُطلق عملية مطابقة. وكل مطابقة تُقيّم المكوّنات. وكل تقييم ينشئ كائنات. افعل ذلك 1000 مرة في الثانية، فتكون قد صنعت عاصفة كاملة من مشكلات الأداء.

فلنبنِ تطبيقات React زمنية حقيقية قادرة على التعامل مع تدفقات بيانات هائلة من دون عناء، باستخدام استراتيجيات الضغط العكسي، والتجميع الذكي، وتحسين المطابقة.

## فهم تحديات الزمن الحقيقي على نطاق واسع

فيزياء التصيير في الزمن الحقيقي داخل المتصفحات:

```typescript
interface RealTimeBottlenecks {
  network: 'WebSocket can handle 1000s msgs/sec';
  parsing: 'JSON parsing blocks main thread';
  stateUpdates: 'Each setState triggers reconciliation';
  reconciliation: 'React diffs entire tree';
  rendering: 'Browser limited to 60fps';
  memory: 'GC pressure from object creation';
}

// The cascade of doom
// 1000 messages/sec → 1000 setState calls
// 1000 setState → 1000 reconciliations
// 1000 reconciliations → millions of object allocations
// Result: Frozen UI and memory explosion
```

## إدارة الضغط العكسي

### تنفيذ التحكّم في التدفّق

```typescript
class BackpressureManager {
  private queue: Message[] = [];
  private processing = false;
  private dropped = 0;
  private maxQueueSize: number;
  private processingRate: number;
  private onDrop?: (message: Message) => void;

  constructor(options: BackpressureOptions) {
    this.maxQueueSize = options.maxQueueSize || 1000;
    this.processingRate = options.processingRate || 60; // msgs/sec
    this.onDrop = options.onDrop;
  }

  push(message: Message): boolean {
    // Apply backpressure
    if (this.queue.length >= this.maxQueueSize) {
      this.dropped++;
      this.onDrop?.(message);

      // Drop oldest message (or implement other strategies)
      if (options.dropStrategy === 'oldest') {
        this.queue.shift();
      } else if (options.dropStrategy === 'newest') {
        return false; // Don't add new message
      } else if (options.dropStrategy === 'sample') {
        // Keep every Nth message
        if (this.dropped % options.sampleRate !== 0) {
          return false;
        }
      }
    }

    this.queue.push(message);
    this.startProcessing();
    return true;
  }

  private async startProcessing() {
    if (this.processing) return;
    this.processing = true;

    const batchSize = Math.ceil(this.processingRate / 60); // Per frame
    const delay = 1000 / 60; // Target 60fps

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, batchSize);
      await this.processBatch(batch);
      await this.waitFrame(delay);
    }

    this.processing = false;
  }

  private async processBatch(batch: Message[]) {
    // Process in React-friendly way
    ReactDOM.unstable_batchedUpdates(() => {
      batch.forEach((message) => {
        this.processMessage(message);
      });
    });
  }

  private processMessage(message: Message) {
    // Override in subclass
  }

  private waitFrame(delay: number): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        setTimeout(resolve, Math.max(0, delay - 16));
      });
    });
  }

  getStats() {
    return {
      queueSize: this.queue.length,
      dropped: this.dropped,
      dropRate: this.dropped / (this.dropped + this.queue.length),
    };
  }
}

interface BackpressureOptions {
  maxQueueSize?: number;
  processingRate?: number;
  dropStrategy?: 'oldest' | 'newest' | 'sample';
  sampleRate?: number;
  onDrop?: (message: Message) => void;
}

interface Message {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  priority?: number;
}
```

### خُطّاف React للضغط العكسي

```typescript
const useBackpressure = <T>(
  options: BackpressureOptions & {
    onMessage: (messages: T[]) => void;
  }
) => {
  const [stats, setStats] = useState({
    queueSize: 0,
    dropped: 0,
    dropRate: 0
  });

  const managerRef = useRef<BackpressureManager | null>(null);

  useEffect(() => {
    class CustomManager extends BackpressureManager {
      processMessage(message: Message) {
        // Handled in batch
      }

      async processBatch(batch: Message[]) {
        const data = batch.map(m => m.data as T);
        options.onMessage(data);

        // Update stats
        setStats(this.getStats());
      }
    }

    managerRef.current = new CustomManager(options);

    return () => {
      managerRef.current = null;
    };
  }, [options]);

  const push = useCallback((data: T) => {
    return managerRef.current?.push({
      id: Math.random().toString(36),
      type: 'data',
      data,
      timestamp: Date.now()
    }) ?? false;
  }, []);

  return { push, stats };
};

// Usage in component
const RealTimeDisplay: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  const { push, stats } = useBackpressure<DataPoint>({
    maxQueueSize: 500,
    processingRate: 30,
    dropStrategy: 'oldest',
    onMessage: (messages) => {
      setData(prev => {
        const updated = [...prev, ...messages];
        // Keep only last 1000 points
        return updated.slice(-1000);
      });
    }
  });

  useWebSocket('wss://stream.example.com', {
    onMessage: (event) => {
      const point = JSON.parse(event.data);
      push(point);
    }
  });

  return (
    <div>
      <Chart data={data} />
      <div>Queue: {stats.queueSize} | Dropped: {stats.dropped}</div>
    </div>
  );
};
```

## استراتيجيات التجميع الذكي

### التجميع بنوافذ زمنية

```typescript
class TimeBatcher<T> {
  private batch: T[] = [];
  private timer: NodeJS.Timeout | null = null;
  private lastFlush = Date.now();

  constructor(
    private options: {
      maxBatchSize: number;
      maxWaitTime: number;
      minWaitTime: number;
      flushHandler: (batch: T[]) => void;
    },
  ) {}

  add(item: T) {
    this.batch.push(item);

    // Flush if batch is full
    if (this.batch.length >= this.options.maxBatchSize) {
      this.flush();
      return;
    }

    // Schedule flush if not already scheduled
    if (!this.timer) {
      const timeSinceLastFlush = Date.now() - this.lastFlush;
      const waitTime = Math.max(
        this.options.minWaitTime,
        Math.min(this.options.maxWaitTime, this.options.maxWaitTime - timeSinceLastFlush),
      );

      this.timer = setTimeout(() => this.flush(), waitTime);
    }
  }

  private flush() {
    if (this.batch.length === 0) return;

    const toFlush = this.batch;
    this.batch = [];
    this.lastFlush = Date.now();

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.options.flushHandler(toFlush);
  }

  destroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.flush();
  }
}

// React hook for batching
const useDataBatcher = <T>(
  flushHandler: (batch: T[]) => void,
  options?: Partial<BatcherOptions>,
) => {
  const batcherRef = useRef<TimeBatcher<T> | null>(null);

  useEffect(() => {
    batcherRef.current = new TimeBatcher({
      maxBatchSize: options?.maxBatchSize || 100,
      maxWaitTime: options?.maxWaitTime || 100,
      minWaitTime: options?.minWaitTime || 16,
      flushHandler,
    });

    return () => {
      batcherRef.current?.destroy();
    };
  }, [flushHandler, options]);

  const add = useCallback((item: T) => {
    batcherRef.current?.add(item);
  }, []);

  return { add };
};

interface BatcherOptions {
  maxBatchSize: number;
  maxWaitTime: number;
  minWaitTime: number;
}
```

### التجميع الذكي للبيانات

```typescript
class DataAggregator<T> {
  private aggregates = new Map<string, AggregateValue>();
  private flushInterval: number;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private options: {
      keyExtractor: (item: T) => string;
      aggregator: (existing: T | undefined, incoming: T) => T;
      flushInterval: number;
      onFlush: (aggregates: Map<string, T>) => void;
    },
  ) {
    this.flushInterval = options.flushInterval;
    this.startFlushing();
  }

  add(item: T) {
    const key = this.options.keyExtractor(item);
    const existing = this.aggregates.get(key);

    if (existing) {
      existing.value = this.options.aggregator(existing.value, item);
      existing.count++;
    } else {
      this.aggregates.set(key, {
        value: item,
        count: 1,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
      });
    }
  }

  private startFlushing() {
    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private flush() {
    if (this.aggregates.size === 0) return;

    const toFlush = new Map<string, T>();

    this.aggregates.forEach((aggregate, key) => {
      toFlush.set(key, aggregate.value);
    });

    this.aggregates.clear();
    this.options.onFlush(toFlush);
  }

  getStats() {
    const stats = {
      uniqueKeys: this.aggregates.size,
      totalCount: 0,
      oldestMs: Infinity,
      newestMs: 0,
    };

    const now = Date.now();
    this.aggregates.forEach((aggregate) => {
      stats.totalCount += aggregate.count;
      const age = now - aggregate.firstSeen;
      stats.oldestMs = Math.min(stats.oldestMs, age);
      stats.newestMs = Math.max(stats.newestMs, now - aggregate.lastSeen);
    });

    return stats;
  }

  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.flush();
  }
}

interface AggregateValue {
  value: any;
  count: number;
  firstSeen: number;
  lastSeen: number;
}

// Usage for financial data
const useTickAggregator = () => {
  const [ticks, setTicks] = useState<Map<string, Tick>>(new Map());

  const aggregatorRef = useRef(
    new DataAggregator<Tick>({
      keyExtractor: (tick) => tick.symbol,
      aggregator: (existing, incoming) => {
        if (!existing) return incoming;

        return {
          ...incoming,
          volume: existing.volume + incoming.volume,
          high: Math.max(existing.high, incoming.high),
          low: Math.min(existing.low, incoming.low),
          close: incoming.close, // Keep latest
        };
      },
      flushInterval: 100, // Flush every 100ms
      onFlush: (aggregates) => {
        setTicks(new Map(aggregates));
      },
    }),
  );

  const addTick = useCallback((tick: Tick) => {
    aggregatorRef.current.add(tick);
  }, []);

  useEffect(() => {
    return () => {
      aggregatorRef.current.destroy();
    };
  }, []);

  return { ticks, addTick };
};

interface Tick {
  symbol: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}
```

## تحسين المطابقة

### عزل اللقطات

```typescript
class SnapshotIsolation<T> {
  private currentSnapshot: T;
  private pendingUpdates: Array<(state: T) => T> = [];
  private isUpdating = false;
  private version = 0;

  constructor(
    initialState: T,
    private onUpdate: (state: T, version: number) => void
  ) {
    this.currentSnapshot = initialState;
  }

  update(updater: (state: T) => T) {
    this.pendingUpdates.push(updater);
    this.processUpdates();
  }

  private async processUpdates() {
    if (this.isUpdating || this.pendingUpdates.length === 0) return;
    this.isUpdating = true;

    // Process all pending updates
    while (this.pendingUpdates.length > 0) {
      const batch = this.pendingUpdates.splice(0, this.pendingUpdates.length);

      // Apply all updates to create new snapshot
      let newSnapshot = this.currentSnapshot;
      for (const updater of batch) {
        newSnapshot = updater(newSnapshot);
      }

      // Only update if changed
      if (newSnapshot !== this.currentSnapshot) {
        this.currentSnapshot = newSnapshot;
        this.version++;

        // Defer to next frame
        await new Promise(resolve => requestAnimationFrame(resolve));

        // Notify React
        this.onUpdate(this.currentSnapshot, this.version);
      }
    }

    this.isUpdating = false;
  }

  getSnapshot(): T {
    return this.currentSnapshot;
  }

  getVersion(): number {
    return this.version;
  }
}

// React hook for snapshot isolation
const useSnapshotIsolation = <T>(initialState: T) => {
  const [state, setState] = useState<{ data: T; version: number }>({
    data: initialState,
    version: 0
  });

  const isolationRef = useRef(
    new SnapshotIsolation(initialState, (data, version) => {
      setState({ data, version });
    })
  );

  const update = useCallback((updater: (state: T) => T) => {
    isolationRef.current.update(updater);
  }, []);

  return [state.data, update] as const;
};

// Usage with real-time data
const OrderBook: React.FC = () => {
  const [orderbook, updateOrderbook] = useSnapshotIsolation<OrderBookState>({
    bids: new Map(),
    asks: new Map(),
    lastUpdate: Date.now()
  });

  useWebSocket('wss://exchange.example.com', {
    onMessage: (event) => {
      const update = JSON.parse(event.data);

      updateOrderbook(state => {
        const newState = { ...state };

        // Apply update
        if (update.side === 'bid') {
          newState.bids = new Map(state.bids);
          newState.bids.set(update.price, update.quantity);
        } else {
          newState.asks = new Map(state.asks);
          newState.asks.set(update.price, update.quantity);
        }

        newState.lastUpdate = Date.now();
        return newState;
      });
    }
  });

  return <OrderBookDisplay data={orderbook} />;
};

interface OrderBookState {
  bids: Map<number, number>;
  asks: Map<number, number>;
  lastUpdate: number;
}
```

### التحديثات الافتراضية

```typescript
class VirtualizedUpdater<T> {
  private viewport: { start: number; end: number } = { start: 0, end: 50 };
  private allData: T[] = [];
  private visibleData: T[] = [];
  private pendingUpdates: Map<number, T> = new Map();
  private updateTimer: NodeJS.Timeout | null = null;

  constructor(
    private options: {
      onVisibleDataChange: (data: T[]) => void;
      updateDelay?: number;
    }
  ) {}

  setViewport(start: number, end: number) {
    this.viewport = { start, end };
    this.updateVisibleData();
  }

  updateItem(index: number, item: T) {
    this.pendingUpdates.set(index, item);
    this.scheduleUpdate();
  }

  appendItems(items: T[]) {
    this.allData.push(...items);

    // Only update if affects viewport
    if (this.allData.length <= this.viewport.end) {
      this.updateVisibleData();
    }
  }

  private scheduleUpdate() {
    if (this.updateTimer) return;

    this.updateTimer = setTimeout(() => {
      this.applyUpdates();
      this.updateTimer = null;
    }, this.options.updateDelay || 16);
  }

  private applyUpdates() {
    let shouldUpdateVisible = false;

    this.pendingUpdates.forEach((item, index) => {
      this.allData[index] = item;

      // Check if in viewport
      if (index >= this.viewport.start && index < this.viewport.end) {
        shouldUpdateVisible = true;
      }
    });

    this.pendingUpdates.clear();

    if (shouldUpdateVisible) {
      this.updateVisibleData();
    }
  }

  private updateVisibleData() {
    this.visibleData = this.allData.slice(
      this.viewport.start,
      this.viewport.end
    );

    this.options.onVisibleDataChange(this.visibleData);
  }

  getAllData(): T[] {
    return this.allData;
  }

  clear() {
    this.allData = [];
    this.visibleData = [];
    this.pendingUpdates.clear();

    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
      this.updateTimer = null;
    }

    this.options.onVisibleDataChange([]);
  }
}

// React component with virtualized updates
const VirtualizedRealTimeList: React.FC = () => {
  const [visibleData, setVisibleData] = useState<Item[]>([]);
  const updaterRef = useRef<VirtualizedUpdater<Item> | null>(null);

  useEffect(() => {
    updaterRef.current = new VirtualizedUpdater({
      onVisibleDataChange: setVisibleData,
      updateDelay: 50
    });

    return () => {
      updaterRef.current?.clear();
    };
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = 50;

    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(container.clientHeight / itemHeight);
    const end = start + visibleCount;

    updaterRef.current?.setViewport(start, end);
  }, []);

  useWebSocket('wss://stream.example.com', {
    onMessage: (event) => {
      const update = JSON.parse(event.data);

      if (update.type === 'append') {
        updaterRef.current?.appendItems(update.items);
      } else if (update.type === 'update') {
        updaterRef.current?.updateItem(update.index, update.item);
      }
    }
  });

  return (
    <div className="virtual-list" onScroll={handleScroll}>
      {visibleData.map((item, index) => (
        <div key={item.id} className="list-item">
          {item.content}
        </div>
      ))}
    </div>
  );
};

interface Item {
  id: string;
  content: string;
  timestamp: number;
}
```

## مراقبة الأداء في الزمن الحقيقي

```typescript
class RealTimeMetrics {
  private metrics = {
    messagesReceived: 0,
    messagesProcessed: 0,
    messagesDropped: 0,
    averageLatency: 0,
    peakLatency: 0,
    updateRate: 0,
    renderRate: 0,
  };

  private latencies: number[] = [];
  private lastUpdate = Date.now();
  private renderFrames = 0;

  recordMessage(timestamp: number) {
    this.metrics.messagesReceived++;

    const latency = Date.now() - timestamp;
    this.latencies.push(latency);

    if (this.latencies.length > 100) {
      this.latencies.shift();
    }

    this.metrics.averageLatency = this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
    this.metrics.peakLatency = Math.max(...this.latencies);
  }

  recordProcessed() {
    this.metrics.messagesProcessed++;
    this.updateRate();
  }

  recordDropped() {
    this.metrics.messagesDropped++;
  }

  recordRender() {
    this.renderFrames++;
  }

  private updateRate() {
    const now = Date.now();
    const elapsed = now - this.lastUpdate;

    if (elapsed >= 1000) {
      this.metrics.updateRate = this.metrics.messagesProcessed / (elapsed / 1000);
      this.metrics.renderRate = this.renderFrames / (elapsed / 1000);

      this.metrics.messagesProcessed = 0;
      this.renderFrames = 0;
      this.lastUpdate = now;
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getHealthScore(): number {
    const dropRate = this.metrics.messagesDropped / (this.metrics.messagesReceived || 1);

    const latencyScore = Math.max(0, 1 - this.metrics.averageLatency / 1000);
    const dropScore = 1 - dropRate;
    const renderScore = Math.min(1, this.metrics.renderRate / 60);

    return (latencyScore + dropScore + renderScore) / 3;
  }
}

// React hook for monitoring
const useRealTimeMetrics = () => {
  const [metrics, setMetrics] = useState<any>({});
  const metricsRef = useRef(new RealTimeMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      const current = metricsRef.current.getMetrics();
      const health = metricsRef.current.getHealthScore();

      setMetrics({ ...current, health });

      // Alert if unhealthy
      if (health < 0.5) {
        console.warn('Real-time performance degraded:', current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    recordMessage: (timestamp: number) => metricsRef.current.recordMessage(timestamp),
    recordProcessed: () => metricsRef.current.recordProcessed(),
    recordDropped: () => metricsRef.current.recordDropped(),
    recordRender: () => metricsRef.current.recordRender(),
  };
};
```

## قائمة أفضل الممارسات

✅ **نفّذ الضغط العكسي:**

- حدّد سقفًا لحجم الطابور
- عرّف استراتيجيات الإسقاط
- راقب معدلات الإسقاط
- وفّر تغذية راجعة للمستخدمين

✅ **جمّع بذكاء:**

- جمّع التحديثات في نوافذ زمنية
- اجمع البيانات عندما يتسنّى ذلك
- عالج داخل إطارات الحركة
- احترم ميزانية 60 إطارًا في الثانية

✅ **حسّن المطابقة:**

- استخدم عزل اللقطات
- نفّذ المحاكاة الافتراضية
- قلّل تحديثات المكوّنات
- جمّع تحديثات React

✅ **تعامل مع التدفّقات المفاجئة بلباقة:**

- استخدم استراتيجيات تكيّفية
- وفّر تغذية راجعة بصرية
- اخفض الجودة عند الحاجة
- حافظ على سرعة الاستجابة

✅ **راقب باستمرار:**

- تتبّع مقاييس زمن الاستجابة
- قِس معدلات الإسقاط
- راقب استهلاك الذاكرة
- نبّه عند التدهور
