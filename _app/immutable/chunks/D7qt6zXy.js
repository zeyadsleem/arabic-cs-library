const s="kinney",a="react-performance",n="أداء React",l="real-time-scale-strategies",p="استراتيجيات الزمن الحقيقي على نطاق واسع",t=[{depth:2,id:"فهم-تحديات-الزمن-الحقيقي-على-نطاق-واسع",text:"فهم تحديات الزمن الحقيقي على نطاق واسع"},{depth:2,id:"إدارة-الضغط-العكسي",text:"إدارة الضغط العكسي"},{depth:3,id:"تنفيذ-التحكم-في-التدفق",text:"تنفيذ التحكّم في التدفّق"},{depth:3,id:"خطاف-react-للضغط-العكسي",text:"خُطّاف React للضغط العكسي"},{depth:2,id:"استراتيجيات-التجميع-الذكي",text:"استراتيجيات التجميع الذكي"},{depth:3,id:"التجميع-بنوافذ-زمنية",text:"التجميع بنوافذ زمنية"},{depth:3,id:"التجميع-الذكي-للبيانات",text:"التجميع الذكي للبيانات"},{depth:2,id:"تحسين-المطابقة",text:"تحسين المطابقة"},{depth:3,id:"عزل-اللقطات",text:"عزل اللقطات"},{depth:3,id:"التحديثات-الافتراضية",text:"التحديثات الافتراضية"},{depth:2,id:"مراقبة-الأداء-في-الزمن-الحقيقي",text:"مراقبة الأداء في الزمن الحقيقي"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يتصل تطبيق React لديك بـ WebSocket. تبدأ البيانات بالتدفّق. 10 تحديثات في الثانية — سلس. 100 تحديث في الثانية — مقبول. 1000 تحديث في الثانية — تتجمّد الواجهة، وتتضخّم الذاكرة، ويعرض Chrome صفحة «Aw, Snap!». مرحبًا بك في الواقع القاسي للبيانات الزمنية الحقيقية على نطاق واسع، حيث تصطدم النوايا الحسنة بحدود أداء المتصفح.</p>
<p>وإليك ما لا يخبرك به أحد عن تطبيقات React الزمنية الحقيقية: المشكلة ليست في استقبال البيانات، بل في تصييرها. فكل تحديث حالة يُطلق عملية مطابقة. وكل مطابقة تُقيّم المكوّنات. وكل تقييم ينشئ كائنات. افعل ذلك 1000 مرة في الثانية، فتكون قد صنعت عاصفة كاملة من مشكلات الأداء.</p>
<p>فلنبنِ تطبيقات React زمنية حقيقية قادرة على التعامل مع تدفقات بيانات هائلة من دون عناء، باستخدام استراتيجيات الضغط العكسي، والتجميع الذكي، وتحسين المطابقة.</p>
<h2 id="فهم-تحديات-الزمن-الحقيقي-على-نطاق-واسع">فهم تحديات الزمن الحقيقي على نطاق واسع</h2>
<p>فيزياء التصيير في الزمن الحقيقي داخل المتصفحات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RealTimeBottlenecks</span> {
  <span class="hljs-attr">network</span>: <span class="hljs-string">&#x27;WebSocket can handle 1000s msgs/sec&#x27;</span>;
  <span class="hljs-attr">parsing</span>: <span class="hljs-string">&#x27;JSON parsing blocks main thread&#x27;</span>;
  <span class="hljs-attr">stateUpdates</span>: <span class="hljs-string">&#x27;Each setState triggers reconciliation&#x27;</span>;
  <span class="hljs-attr">reconciliation</span>: <span class="hljs-string">&#x27;React diffs entire tree&#x27;</span>;
  <span class="hljs-attr">rendering</span>: <span class="hljs-string">&#x27;Browser limited to 60fps&#x27;</span>;
  <span class="hljs-attr">memory</span>: <span class="hljs-string">&#x27;GC pressure from object creation&#x27;</span>;
}

<span class="hljs-comment">// The cascade of doom</span>
<span class="hljs-comment">// 1000 messages/sec → 1000 setState calls</span>
<span class="hljs-comment">// 1000 setState → 1000 reconciliations</span>
<span class="hljs-comment">// 1000 reconciliations → millions of object allocations</span>
<span class="hljs-comment">// Result: Frozen UI and memory explosion</span>
</code></pre>
<h2 id="إدارة-الضغط-العكسي">إدارة الضغط العكسي</h2>
<h3 id="تنفيذ-التحكم-في-التدفق">تنفيذ التحكّم في التدفّق</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BackpressureManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">queue</span>: <span class="hljs-title class_">Message</span>[] = [];
  <span class="hljs-keyword">private</span> processing = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> dropped = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">maxQueueSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">processingRate</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">onDrop</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-title class_">Message</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">options</span>: <span class="hljs-title class_">BackpressureOptions</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxQueueSize</span> = options.<span class="hljs-property">maxQueueSize</span> || <span class="hljs-number">1000</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">processingRate</span> = options.<span class="hljs-property">processingRate</span> || <span class="hljs-number">60</span>; <span class="hljs-comment">// msgs/sec</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">onDrop</span> = options.<span class="hljs-property">onDrop</span>;
  }

  <span class="hljs-title function_">push</span>(<span class="hljs-attr">message</span>: <span class="hljs-title class_">Message</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-comment">// Apply backpressure</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxQueueSize</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">dropped</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">onDrop</span>?.(message);

      <span class="hljs-comment">// Drop oldest message (or implement other strategies)</span>
      <span class="hljs-keyword">if</span> (options.<span class="hljs-property">dropStrategy</span> === <span class="hljs-string">&#x27;oldest&#x27;</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">shift</span>();
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.<span class="hljs-property">dropStrategy</span> === <span class="hljs-string">&#x27;newest&#x27;</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; <span class="hljs-comment">// Don&#x27;t add new message</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.<span class="hljs-property">dropStrategy</span> === <span class="hljs-string">&#x27;sample&#x27;</span>) {
        <span class="hljs-comment">// Keep every Nth message</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">dropped</span> % options.<span class="hljs-property">sampleRate</span> !== <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      }
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">push</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">startProcessing</span>();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">startProcessing</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">processing</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">processing</span> = <span class="hljs-literal">true</span>;

    <span class="hljs-keyword">const</span> batchSize = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">processingRate</span> / <span class="hljs-number">60</span>); <span class="hljs-comment">// Per frame</span>
    <span class="hljs-keyword">const</span> delay = <span class="hljs-number">1000</span> / <span class="hljs-number">60</span>; <span class="hljs-comment">// Target 60fps</span>

    <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> batch = <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">splice</span>(<span class="hljs-number">0</span>, batchSize);
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processBatch</span>(batch);
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">waitFrame</span>(delay);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">processing</span> = <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">processBatch</span>(<span class="hljs-params"><span class="hljs-attr">batch</span>: <span class="hljs-title class_">Message</span>[]</span>) {
    <span class="hljs-comment">// Process in React-friendly way</span>
    <span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">unstable_batchedUpdates</span>(<span class="hljs-function">() =&gt;</span> {
      batch.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">message</span>) =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processMessage</span>(message);
      });
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processMessage</span>(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-title class_">Message</span></span>) {
    <span class="hljs-comment">// Override in subclass</span>
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">waitFrame</span>(<span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
      <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, delay - <span class="hljs-number">16</span>));
      });
    });
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">queueSize</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span>,
      <span class="hljs-attr">dropped</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">dropped</span>,
      <span class="hljs-attr">dropRate</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">dropped</span> / (<span class="hljs-variable language_">this</span>.<span class="hljs-property">dropped</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span>),
    };
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BackpressureOptions</span> {
  <span class="hljs-attr">maxQueueSize</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">processingRate</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">dropStrategy</span>?: <span class="hljs-string">&#x27;oldest&#x27;</span> | <span class="hljs-string">&#x27;newest&#x27;</span> | <span class="hljs-string">&#x27;sample&#x27;</span>;
  <span class="hljs-attr">sampleRate</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">onDrop</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-title class_">Message</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Message</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">priority</span>?: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h3 id="خطاف-react-للضغط-العكسي">خُطّاف React للضغط العكسي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> useBackpressure = &lt;T&gt;<span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">BackpressureOptions</span> &amp; {
    onMessage: (messages: T[]) =&gt; <span class="hljs-built_in">void</span>;
  }
</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [stats, setStats] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">queueSize</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">dropped</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">dropRate</span>: <span class="hljs-number">0</span>
  });

  <span class="hljs-keyword">const</span> managerRef = useRef&lt;<span class="hljs-title class_">BackpressureManager</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">CustomManager</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">BackpressureManager</span> {
      <span class="hljs-title function_">processMessage</span>(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-title class_">Message</span></span>) {
        <span class="hljs-comment">// Handled in batch</span>
      }

      <span class="hljs-keyword">async</span> <span class="hljs-title function_">processBatch</span>(<span class="hljs-params"><span class="hljs-attr">batch</span>: <span class="hljs-title class_">Message</span>[]</span>) {
        <span class="hljs-keyword">const</span> data = batch.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">m</span> =&gt;</span> m.<span class="hljs-property">data</span> <span class="hljs-keyword">as</span> T);
        options.<span class="hljs-title function_">onMessage</span>(data);

        <span class="hljs-comment">// Update stats</span>
        <span class="hljs-title function_">setStats</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStats</span>());
      }
    }

    managerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CustomManager</span>(options);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      managerRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
    };
  }, [options]);

  <span class="hljs-keyword">const</span> push = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> managerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">push</span>({
      <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>),
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;data&#x27;</span>,
      data,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>()
    }) ?? <span class="hljs-literal">false</span>;
  }, []);

  <span class="hljs-keyword">return</span> { push, stats };
};

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RealTimeDisplay</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">DataPoint</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> { push, stats } = useBackpressure&lt;<span class="hljs-title class_">DataPoint</span>&gt;({
    <span class="hljs-attr">maxQueueSize</span>: <span class="hljs-number">500</span>,
    <span class="hljs-attr">processingRate</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">dropStrategy</span>: <span class="hljs-string">&#x27;oldest&#x27;</span>,
    <span class="hljs-attr">onMessage</span>: <span class="hljs-function">(<span class="hljs-params">messages</span>) =&gt;</span> {
      <span class="hljs-title function_">setData</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> updated = [...prev, ...messages];
        <span class="hljs-comment">// Keep only last 1000 points</span>
        <span class="hljs-keyword">return</span> updated.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">1000</span>);
      });
    }
  });

  <span class="hljs-title function_">useWebSocket</span>(<span class="hljs-string">&#x27;wss://stream.example.com&#x27;</span>, {
    <span class="hljs-attr">onMessage</span>: <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> point = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
      <span class="hljs-title function_">push</span>(point);
    }
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Queue: {stats.queueSize} | Dropped: {stats.dropped}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="استراتيجيات-التجميع-الذكي">استراتيجيات التجميع الذكي</h2>
<h3 id="التجميع-بنوافذ-زمنية">التجميع بنوافذ زمنية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TimeBatcher</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">batch</span>: T[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">timer</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> lastFlush = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">options</span>: {
      maxBatchSize: <span class="hljs-built_in">number</span>;
      maxWaitTime: <span class="hljs-built_in">number</span>;
      minWaitTime: <span class="hljs-built_in">number</span>;
      flushHandler: (batch: T[]) =&gt; <span class="hljs-built_in">void</span>;
    },
  </span>) {}

  <span class="hljs-title function_">add</span>(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>.<span class="hljs-title function_">push</span>(item);

    <span class="hljs-comment">// Flush if batch is full</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>.<span class="hljs-property">length</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">maxBatchSize</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Schedule flush if not already scheduled</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-keyword">const</span> timeSinceLastFlush = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFlush</span>;
      <span class="hljs-keyword">const</span> waitTime = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">minWaitTime</span>,
        <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">maxWaitTime</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">maxWaitTime</span> - timeSinceLastFlush),
      );

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>(), waitTime);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">flush</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> toFlush = <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFlush</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">flushHandler</span>(toFlush);
  }

  <span class="hljs-title function_">destroy</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
  }
}

<span class="hljs-comment">// React hook for batching</span>
<span class="hljs-keyword">const</span> useDataBatcher = &lt;T&gt;<span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">flushHandler</span>: (batch: T[]) =&gt; <span class="hljs-built_in">void</span>,
  <span class="hljs-attr">options</span>?: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">BatcherOptions</span>&gt;,
</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> batcherRef = useRef&lt;<span class="hljs-title class_">TimeBatcher</span>&lt;T&gt; | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    batcherRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TimeBatcher</span>({
      <span class="hljs-attr">maxBatchSize</span>: options?.<span class="hljs-property">maxBatchSize</span> || <span class="hljs-number">100</span>,
      <span class="hljs-attr">maxWaitTime</span>: options?.<span class="hljs-property">maxWaitTime</span> || <span class="hljs-number">100</span>,
      <span class="hljs-attr">minWaitTime</span>: options?.<span class="hljs-property">minWaitTime</span> || <span class="hljs-number">16</span>,
      flushHandler,
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      batcherRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">destroy</span>();
    };
  }, [flushHandler, options]);

  <span class="hljs-keyword">const</span> add = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> {
    batcherRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">add</span>(item);
  }, []);

  <span class="hljs-keyword">return</span> { add };
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BatcherOptions</span> {
  <span class="hljs-attr">maxBatchSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">maxWaitTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">minWaitTime</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h3 id="التجميع-الذكي-للبيانات">التجميع الذكي للبيانات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">DataAggregator</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> aggregates = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">AggregateValue</span>&gt;();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">flushInterval</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">timer</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">options</span>: {
      keyExtractor: (item: T) =&gt; <span class="hljs-built_in">string</span>;
      aggregator: (existing: T | <span class="hljs-literal">undefined</span>, incoming: T) =&gt; T;
      flushInterval: <span class="hljs-built_in">number</span>;
      onFlush: (aggregates: <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">string</span>, T&gt;) =&gt; <span class="hljs-built_in">void</span>;
    },
  </span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">flushInterval</span> = options.<span class="hljs-property">flushInterval</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">startFlushing</span>();
  }

  <span class="hljs-title function_">add</span>(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) {
    <span class="hljs-keyword">const</span> key = <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">keyExtractor</span>(item);
    <span class="hljs-keyword">const</span> existing = <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">get</span>(key);

    <span class="hljs-keyword">if</span> (existing) {
      existing.<span class="hljs-property">value</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">aggregator</span>(existing.<span class="hljs-property">value</span>, item);
      existing.<span class="hljs-property">count</span>++;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(key, {
        <span class="hljs-attr">value</span>: item,
        <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">firstSeen</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
        <span class="hljs-attr">lastSeen</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      });
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">startFlushing</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
    }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">flushInterval</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">flush</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> toFlush = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, T&gt;();

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">aggregate, key</span>) =&gt;</span> {
      toFlush.<span class="hljs-title function_">set</span>(key, aggregate.<span class="hljs-property">value</span>);
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">clear</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">onFlush</span>(toFlush);
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> stats = {
      <span class="hljs-attr">uniqueKeys</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-property">size</span>,
      <span class="hljs-attr">totalCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">oldestMs</span>: <span class="hljs-title class_">Infinity</span>,
      <span class="hljs-attr">newestMs</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">aggregate</span>) =&gt;</span> {
      stats.<span class="hljs-property">totalCount</span> += aggregate.<span class="hljs-property">count</span>;
      <span class="hljs-keyword">const</span> age = now - aggregate.<span class="hljs-property">firstSeen</span>;
      stats.<span class="hljs-property">oldestMs</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(stats.<span class="hljs-property">oldestMs</span>, age);
      stats.<span class="hljs-property">newestMs</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(stats.<span class="hljs-property">newestMs</span>, now - aggregate.<span class="hljs-property">lastSeen</span>);
    });

    <span class="hljs-keyword">return</span> stats;
  }

  <span class="hljs-title function_">destroy</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearInterval</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AggregateValue</span> {
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">firstSeen</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">lastSeen</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Usage for financial data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useTickAggregator</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [ticks, setTicks] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Tick</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-keyword">const</span> aggregatorRef = <span class="hljs-title function_">useRef</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">DataAggregator</span>&lt;<span class="hljs-title class_">Tick</span>&gt;({
      <span class="hljs-attr">keyExtractor</span>: <span class="hljs-function">(<span class="hljs-params">tick</span>) =&gt;</span> tick.<span class="hljs-property">symbol</span>,
      <span class="hljs-attr">aggregator</span>: <span class="hljs-function">(<span class="hljs-params">existing, incoming</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!existing) <span class="hljs-keyword">return</span> incoming;

        <span class="hljs-keyword">return</span> {
          ...incoming,
          <span class="hljs-attr">volume</span>: existing.<span class="hljs-property">volume</span> + incoming.<span class="hljs-property">volume</span>,
          <span class="hljs-attr">high</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(existing.<span class="hljs-property">high</span>, incoming.<span class="hljs-property">high</span>),
          <span class="hljs-attr">low</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(existing.<span class="hljs-property">low</span>, incoming.<span class="hljs-property">low</span>),
          <span class="hljs-attr">close</span>: incoming.<span class="hljs-property">close</span>, <span class="hljs-comment">// Keep latest</span>
        };
      },
      <span class="hljs-attr">flushInterval</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// Flush every 100ms</span>
      <span class="hljs-attr">onFlush</span>: <span class="hljs-function">(<span class="hljs-params">aggregates</span>) =&gt;</span> {
        <span class="hljs-title function_">setTicks</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(aggregates));
      },
    }),
  );

  <span class="hljs-keyword">const</span> addTick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">tick</span>: <span class="hljs-title class_">Tick</span></span>) =&gt;</span> {
    aggregatorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">add</span>(tick);
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      aggregatorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">destroy</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> { ticks, addTick };
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Tick</span> {
  <span class="hljs-attr">symbol</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">volume</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">high</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">low</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">close</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h2 id="تحسين-المطابقة">تحسين المطابقة</h2>
<h3 id="عزل-اللقطات">عزل اللقطات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SnapshotIsolation</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">currentSnapshot</span>: T;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">pendingUpdates</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: T</span>) =&gt;</span> T&gt; = [];
  <span class="hljs-keyword">private</span> isUpdating = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> version = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-attr">initialState</span>: T,
    <span class="hljs-keyword">private</span> <span class="hljs-attr">onUpdate</span>: (state: T, version: <span class="hljs-built_in">number</span>) =&gt; <span class="hljs-built_in">void</span>
  </span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span> = initialState;
  }

  <span class="hljs-title function_">update</span>(<span class="hljs-params"><span class="hljs-attr">updater</span>: (state: T) =&gt; T</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">push</span>(updater);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processUpdates</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">processUpdates</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">isUpdating</span> || <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isUpdating</span> = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// Process all pending updates</span>
    <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> batch = <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">splice</span>(<span class="hljs-number">0</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-property">length</span>);

      <span class="hljs-comment">// Apply all updates to create new snapshot</span>
      <span class="hljs-keyword">let</span> newSnapshot = <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span>;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> updater <span class="hljs-keyword">of</span> batch) {
        newSnapshot = <span class="hljs-title function_">updater</span>(newSnapshot);
      }

      <span class="hljs-comment">// Only update if changed</span>
      <span class="hljs-keyword">if</span> (newSnapshot !== <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span> = newSnapshot;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span>++;

        <span class="hljs-comment">// Defer to next frame</span>
        <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-title function_">requestAnimationFrame</span>(resolve));

        <span class="hljs-comment">// Notify React</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">onUpdate</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span>);
      }
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isUpdating</span> = <span class="hljs-literal">false</span>;
  }

  <span class="hljs-title function_">getSnapshot</span>(): T {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentSnapshot</span>;
  }

  <span class="hljs-title function_">getVersion</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span>;
  }
}

<span class="hljs-comment">// React hook for snapshot isolation</span>
<span class="hljs-keyword">const</span> useSnapshotIsolation = &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">initialState</span>: T</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;{ <span class="hljs-attr">data</span>: T; <span class="hljs-attr">version</span>: <span class="hljs-built_in">number</span> }&gt;({
    <span class="hljs-attr">data</span>: initialState,
    <span class="hljs-attr">version</span>: <span class="hljs-number">0</span>
  });

  <span class="hljs-keyword">const</span> isolationRef = <span class="hljs-title function_">useRef</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">SnapshotIsolation</span>(initialState, <span class="hljs-function">(<span class="hljs-params">data, version</span>) =&gt;</span> {
      <span class="hljs-title function_">setState</span>({ data, version });
    })
  );

  <span class="hljs-keyword">const</span> update = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updater</span>: (state: T) =&gt; T</span>) =&gt;</span> {
    isolationRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">update</span>(updater);
  }, []);

  <span class="hljs-keyword">return</span> [state.<span class="hljs-property">data</span>, update] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
};

<span class="hljs-comment">// Usage with real-time data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">OrderBook</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [orderbook, updateOrderbook] = useSnapshotIsolation&lt;<span class="hljs-title class_">OrderBookState</span>&gt;({
    <span class="hljs-attr">bids</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(),
    <span class="hljs-attr">asks</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(),
    <span class="hljs-attr">lastUpdate</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>()
  });

  <span class="hljs-title function_">useWebSocket</span>(<span class="hljs-string">&#x27;wss://exchange.example.com&#x27;</span>, {
    <span class="hljs-attr">onMessage</span>: <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> update = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);

      <span class="hljs-title function_">updateOrderbook</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> newState = { ...state };

        <span class="hljs-comment">// Apply update</span>
        <span class="hljs-keyword">if</span> (update.<span class="hljs-property">side</span> === <span class="hljs-string">&#x27;bid&#x27;</span>) {
          newState.<span class="hljs-property">bids</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(state.<span class="hljs-property">bids</span>);
          newState.<span class="hljs-property">bids</span>.<span class="hljs-title function_">set</span>(update.<span class="hljs-property">price</span>, update.<span class="hljs-property">quantity</span>);
        } <span class="hljs-keyword">else</span> {
          newState.<span class="hljs-property">asks</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(state.<span class="hljs-property">asks</span>);
          newState.<span class="hljs-property">asks</span>.<span class="hljs-title function_">set</span>(update.<span class="hljs-property">price</span>, update.<span class="hljs-property">quantity</span>);
        }

        newState.<span class="hljs-property">lastUpdate</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
        <span class="hljs-keyword">return</span> newState;
      });
    }
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">OrderBookDisplay</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{orderbook}</span> /&gt;</span></span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OrderBookState</span> {
  <span class="hljs-attr">bids</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt;;
  <span class="hljs-attr">asks</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt;;
  <span class="hljs-attr">lastUpdate</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h3 id="التحديثات-الافتراضية">التحديثات الافتراضية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">VirtualizedUpdater</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">start</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">end</span>: <span class="hljs-built_in">number</span> } = { <span class="hljs-attr">start</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">end</span>: <span class="hljs-number">50</span> };
  <span class="hljs-keyword">private</span> <span class="hljs-attr">allData</span>: T[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">visibleData</span>: T[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">pendingUpdates</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, T&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">updateTimer</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">options</span>: {
      onVisibleDataChange: (data: T[]) =&gt; <span class="hljs-built_in">void</span>;
      updateDelay?: <span class="hljs-built_in">number</span>;
    }
  </span>) {}

  <span class="hljs-title function_">setViewport</span>(<span class="hljs-params"><span class="hljs-attr">start</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">end</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span> = { start, end };
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateVisibleData</span>();
  }

  <span class="hljs-title function_">updateItem</span>(<span class="hljs-params"><span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">item</span>: T</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">set</span>(index, item);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scheduleUpdate</span>();
  }

  <span class="hljs-title function_">appendItems</span>(<span class="hljs-params"><span class="hljs-attr">items</span>: T[]</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span>.<span class="hljs-title function_">push</span>(...items);

    <span class="hljs-comment">// Only update if affects viewport</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span>.<span class="hljs-property">length</span> &lt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">end</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateVisibleData</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">scheduleUpdate</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">applyUpdates</span>();
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span> = <span class="hljs-literal">null</span>;
    }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">updateDelay</span> || <span class="hljs-number">16</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">applyUpdates</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">let</span> shouldUpdateVisible = <span class="hljs-literal">false</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span>[index] = item;

      <span class="hljs-comment">// Check if in viewport</span>
      <span class="hljs-keyword">if</span> (index &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">start</span> &amp;&amp; index &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">end</span>) {
        shouldUpdateVisible = <span class="hljs-literal">true</span>;
      }
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">clear</span>();

    <span class="hljs-keyword">if</span> (shouldUpdateVisible) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateVisibleData</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateVisibleData</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">visibleData</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span>.<span class="hljs-title function_">slice</span>(
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">start</span>,
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">viewport</span>.<span class="hljs-property">end</span>
    );

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">onVisibleDataChange</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">visibleData</span>);
  }

  <span class="hljs-title function_">getAllData</span>(): T[] {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span>;
  }

  <span class="hljs-title function_">clear</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">allData</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">visibleData</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pendingUpdates</span>.<span class="hljs-title function_">clear</span>();

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimer</span> = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-title function_">onVisibleDataChange</span>([]);
  }
}

<span class="hljs-comment">// React component with virtualized updates</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">VirtualizedRealTimeList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [visibleData, setVisibleData] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> updaterRef = useRef&lt;<span class="hljs-title class_">VirtualizedUpdater</span>&lt;<span class="hljs-title class_">Item</span>&gt; | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    updaterRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">VirtualizedUpdater</span>({
      <span class="hljs-attr">onVisibleDataChange</span>: setVisibleData,
      <span class="hljs-attr">updateDelay</span>: <span class="hljs-number">50</span>
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      updaterRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">clear</span>();
    };
  }, []);

  <span class="hljs-keyword">const</span> handleScroll = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">UIEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> container = e.<span class="hljs-property">currentTarget</span>;
    <span class="hljs-keyword">const</span> scrollTop = container.<span class="hljs-property">scrollTop</span>;
    <span class="hljs-keyword">const</span> itemHeight = <span class="hljs-number">50</span>;

    <span class="hljs-keyword">const</span> start = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(scrollTop / itemHeight);
    <span class="hljs-keyword">const</span> visibleCount = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(container.<span class="hljs-property">clientHeight</span> / itemHeight);
    <span class="hljs-keyword">const</span> end = start + visibleCount;

    updaterRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">setViewport</span>(start, end);
  }, []);

  <span class="hljs-title function_">useWebSocket</span>(<span class="hljs-string">&#x27;wss://stream.example.com&#x27;</span>, {
    <span class="hljs-attr">onMessage</span>: <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> update = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);

      <span class="hljs-keyword">if</span> (update.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;append&#x27;</span>) {
        updaterRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">appendItems</span>(update.<span class="hljs-property">items</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (update.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;update&#x27;</span>) {
        updaterRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">updateItem</span>(update.<span class="hljs-property">index</span>, update.<span class="hljs-property">item</span>);
      }
    }
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;virtual-list&quot;</span> <span class="hljs-attr">onScroll</span>=<span class="hljs-string">{handleScroll}</span>&gt;</span>
      {visibleData.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;list-item&quot;</span>&gt;</span>
          {item.content}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h2 id="مراقبة-الأداء-في-الزمن-الحقيقي">مراقبة الأداء في الزمن الحقيقي</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RealTimeMetrics</span> {
  <span class="hljs-keyword">private</span> metrics = {
    <span class="hljs-attr">messagesReceived</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">messagesProcessed</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">messagesDropped</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">averageLatency</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">peakLatency</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">updateRate</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">renderRate</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-keyword">private</span> <span class="hljs-attr">latencies</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> lastUpdate = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
  <span class="hljs-keyword">private</span> renderFrames = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">recordMessage</span>(<span class="hljs-params"><span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesReceived</span>++;

    <span class="hljs-keyword">const</span> latency = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - timestamp;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>.<span class="hljs-title function_">push</span>(latency);

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">100</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">averageLatency</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / <span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>.<span class="hljs-property">length</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">peakLatency</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...<span class="hljs-variable language_">this</span>.<span class="hljs-property">latencies</span>);
  }

  <span class="hljs-title function_">recordProcessed</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesProcessed</span>++;
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateRate</span>();
  }

  <span class="hljs-title function_">recordDropped</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesDropped</span>++;
  }

  <span class="hljs-title function_">recordRender</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">renderFrames</span>++;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateRate</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> elapsed = now - <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastUpdate</span>;

    <span class="hljs-keyword">if</span> (elapsed &gt;= <span class="hljs-number">1000</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">updateRate</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesProcessed</span> / (elapsed / <span class="hljs-number">1000</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">renderRate</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">renderFrames</span> / (elapsed / <span class="hljs-number">1000</span>);

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesProcessed</span> = <span class="hljs-number">0</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">renderFrames</span> = <span class="hljs-number">0</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastUpdate</span> = now;
    }
  }

  <span class="hljs-title function_">getMetrics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> };
  }

  <span class="hljs-title function_">getHealthScore</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> dropRate = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesDropped</span> / (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesReceived</span> || <span class="hljs-number">1</span>);

    <span class="hljs-keyword">const</span> latencyScore = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">1</span> - <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">averageLatency</span> / <span class="hljs-number">1000</span>);
    <span class="hljs-keyword">const</span> dropScore = <span class="hljs-number">1</span> - dropRate;
    <span class="hljs-keyword">const</span> renderScore = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">renderRate</span> / <span class="hljs-number">60</span>);

    <span class="hljs-keyword">return</span> (latencyScore + dropScore + renderScore) / <span class="hljs-number">3</span>;
  }
}

<span class="hljs-comment">// React hook for monitoring</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useRealTimeMetrics</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = useState&lt;<span class="hljs-built_in">any</span>&gt;({});
  <span class="hljs-keyword">const</span> metricsRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">RealTimeMetrics</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> current = metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getMetrics</span>();
      <span class="hljs-keyword">const</span> health = metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getHealthScore</span>();

      <span class="hljs-title function_">setMetrics</span>({ ...current, health });

      <span class="hljs-comment">// Alert if unhealthy</span>
      <span class="hljs-keyword">if</span> (health &lt; <span class="hljs-number">0.5</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Real-time performance degraded:&#x27;</span>, current);
      }
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, []);

  <span class="hljs-keyword">return</span> {
    metrics,
    <span class="hljs-attr">recordMessage</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordMessage</span>(timestamp),
    <span class="hljs-attr">recordProcessed</span>: <span class="hljs-function">() =&gt;</span> metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordProcessed</span>(),
    <span class="hljs-attr">recordDropped</span>: <span class="hljs-function">() =&gt;</span> metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordDropped</span>(),
    <span class="hljs-attr">recordRender</span>: <span class="hljs-function">() =&gt;</span> metricsRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordRender</span>(),
  };
};
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>نفّذ الضغط العكسي:</strong></p>
<ul>
<li>حدّد سقفًا لحجم الطابور</li>
<li>عرّف استراتيجيات الإسقاط</li>
<li>راقب معدلات الإسقاط</li>
<li>وفّر تغذية راجعة للمستخدمين</li>
</ul>
<p>✅ <strong>جمّع بذكاء:</strong></p>
<ul>
<li>جمّع التحديثات في نوافذ زمنية</li>
<li>اجمع البيانات عندما يتسنّى ذلك</li>
<li>عالج داخل إطارات الحركة</li>
<li>احترم ميزانية 60 إطارًا في الثانية</li>
</ul>
<p>✅ <strong>حسّن المطابقة:</strong></p>
<ul>
<li>استخدم عزل اللقطات</li>
<li>نفّذ المحاكاة الافتراضية</li>
<li>قلّل تحديثات المكوّنات</li>
<li>جمّع تحديثات React</li>
</ul>
<p>✅ <strong>تعامل مع التدفّقات المفاجئة بلباقة:</strong></p>
<ul>
<li>استخدم استراتيجيات تكيّفية</li>
<li>وفّر تغذية راجعة بصرية</li>
<li>اخفض الجودة عند الحاجة</li>
<li>حافظ على سرعة الاستجابة</li>
</ul>
<p>✅ <strong>راقب باستمرار:</strong></p>
<ul>
<li>تتبّع مقاييس زمن الاستجابة</li>
<li>قِس معدلات الإسقاط</li>
<li>راقب استهلاك الذاكرة</li>
<li>نبّه عند التدهور</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
