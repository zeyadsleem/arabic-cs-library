const s="kinney",a="react-performance",n="أداء React",l="web-workers-with-react",p="عمّال الويب (Web Workers) مع React",t=[{depth:2,id:"فهم-web-workers-في-المتصفح",text:"فهم Web Workers في المتصفح"},{depth:2,id:"إعداد-web-worker-أساسي-مع-react",text:"إعداد Web Worker أساسي مع React"},{depth:3,id:"إنشاء-worker-بـ-typescript",text:"إنشاء Worker بـ TypeScript"},{depth:3,id:"خطاف-react-لإدارة-worker",text:"خُطّاف React لإدارة Worker"},{depth:3,id:"استخدام-worker-في-مكون",text:"استخدام Worker في مكوّن"},{depth:2,id:"أنماط-متقدمة-للعمال",text:"أنماط متقدمة للعمّال"},{depth:3,id:"مجموعة-عمال-للمعالجة-المتوازية",text:"مجموعة عمّال للمعالجة المتوازية"},{depth:3,id:"كائنات-قابلة-للنقل-للبيانات-الكبيرة",text:"كائنات قابلة للنقل للبيانات الكبيرة"},{depth:3,id:"sharedarraybuffer-للتواصل-في-الزمن-الحقيقي",text:"SharedArrayBuffer للتواصل في الزمن الحقيقي"},{depth:2,id:"حالات-استخدام-واقعية",text:"حالات استخدام واقعية"},{depth:3,id:"الحالة-1-معالجة-تصور-البيانات",text:"الحالة 1: معالجة تصور البيانات"},{depth:3,id:"الحالة-2-بحث-في-الزمن-الحقيقي-باستخدام-worker",text:"الحالة 2: بحث في الزمن الحقيقي باستخدام Worker"},{depth:3,id:"الحالة-3-مزامنة-وتخزين-مؤقت-في-الخلفية",text:"الحالة 3: مزامنة وتخزين مؤقت في الخلفية"},{depth:2,id:"مراقبة-الأداء-والتنقيح",text:"مراقبة الأداء والتنقيح"},{depth:2,id:"أفضل-الممارسات-والمزالق",text:"أفضل الممارسات والمزالق"},{depth:2,id:"الختام",text:"الختام"}],e=`<p>يتعثّر تطبيق React لديك حتى يتوقف. ما السبب؟ تحويل ضخم للبيانات، أو حساب معقد، أو مهمة معالجة صور تحجب الخيط الرئيسي. وبينما تطحن شيفرة JavaScript الأرقام، تتجمد واجهتك، وتتلعثم الحركات، وينقر المستخدمون بغضب على أزرار لا تستجيب. الحل ليس تحسين الخوارزمية (وإن كان عليك فعل ذلك أيضًا) — بل نقلها خارج الخيط الرئيسي تمامًا باستخدام Web Workers.</p>
<p>تتيح لك Web Workers تشغيل JavaScript في خيوط خلفية، بالتوازي مع خيط تنفيذك الرئيسي. يعني هذا أن حساباتك المكلفة يمكن أن تعمل دون حجب تفاعلات المستخدم، فتبقى تطبيقات React سريعة الاستجابة حتى أثناء المعالجة الثقيلة. لكن دمج العمّال مع نموذج مكوّنات React يتطلب تعاملًا دقيقًا مع مزامنة الحالة وإدارة دورة الحياة وكتابة أنواع TypeScript. يوضح لك هذا الدليل كيف تفعل ذلك على نحو صحيح تمامًا.</p>
<h2 id="فهم-web-workers-في-المتصفح">فهم Web Workers في المتصفح</h2>
<p>قبل الغوص في تكامل React، افهم ما يستطيع العمّال فعله وما لا يستطيعون:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Web Worker capabilities and limitations</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WorkerCapabilities</span> {
  <span class="hljs-comment">// What Workers CAN do</span>
  <span class="hljs-attr">can</span>: {
    <span class="hljs-attr">compute</span>: <span class="hljs-string">&#x27;Run CPU-intensive calculations&#x27;</span>;
    <span class="hljs-attr">fetch</span>: <span class="hljs-string">&#x27;Make network requests independently&#x27;</span>;
    <span class="hljs-attr">indexedDB</span>: <span class="hljs-string">&#x27;Access browser storage&#x27;</span>;
    <span class="hljs-attr">webAssembly</span>: <span class="hljs-string">&#x27;Run WASM modules for max performance&#x27;</span>;
    <span class="hljs-attr">postMessage</span>: <span class="hljs-string">&#x27;Communicate with main thread&#x27;</span>;
    <span class="hljs-attr">importScripts</span>: <span class="hljs-string">&#x27;Load additional JavaScript files&#x27;</span>;
  };

  <span class="hljs-comment">// What Workers CANNOT do</span>
  <span class="hljs-attr">cannot</span>: {
    <span class="hljs-attr">dom</span>: <span class="hljs-string">&#x27;Access or manipulate the DOM&#x27;</span>;
    <span class="hljs-attr">window</span>: <span class="hljs-string">&#x27;Access window object or globals&#x27;</span>;
    <span class="hljs-attr">localStorage</span>: <span class="hljs-string">&#x27;Use localStorage (use IndexedDB instead)&#x27;</span>;
    <span class="hljs-attr">parent</span>: <span class="hljs-string">&#x27;Access parent object directly&#x27;</span>;
    <span class="hljs-attr">react</span>: <span class="hljs-string">&#x27;Use React components or hooks directly&#x27;</span>;
  };

  <span class="hljs-comment">// Performance characteristics</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">overhead</span>: <span class="hljs-string">&#x27;~0.5-1ms to spawn a worker&#x27;</span>;
    <span class="hljs-attr">messageLatency</span>: <span class="hljs-string">&#x27;~0.1-0.3ms for postMessage&#x27;</span>;
    <span class="hljs-attr">memory</span>: <span class="hljs-string">&#x27;Separate heap, typically 10-50MB baseline&#x27;</span>;
    <span class="hljs-attr">concurrency</span>: <span class="hljs-string">&#x27;True parallel execution on multi-core CPUs&#x27;</span>;
  };
}
</code></pre>
<h2 id="إعداد-web-worker-أساسي-مع-react">إعداد Web Worker أساسي مع React</h2>
<p>لنبدأ بتكامل بسيط مع Worker:</p>
<h3 id="إنشاء-worker-بـ-typescript">إنشاء Worker بـ TypeScript</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// worker/calculator.worker.ts</span>
<span class="hljs-comment">// This file runs in the Worker thread</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">WorkerMessage</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CALCULATE_PRIMES&#x27;</span>; <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROCESS_DATA&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-built_in">number</span>[] }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CANCEL_OPERATION&#x27;</span> };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">WorkerResponse</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;RESULT&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROGRESS&#x27;</span>; <span class="hljs-attr">progress</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ERROR&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// Worker context is different from window</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">Worker</span> = <span class="hljs-variable language_">self</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;

<span class="hljs-comment">// State within the worker</span>
<span class="hljs-keyword">let</span> isProcessing = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">let</span> shouldCancel = <span class="hljs-literal">false</span>;

<span class="hljs-comment">// Calculate prime numbers (expensive operation)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">calculatePrimes</span>(<span class="hljs-params"><span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[] {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">primes</span>: <span class="hljs-built_in">number</span>[] = [];

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> num = <span class="hljs-number">2</span>; num &lt;= limit; num++) {
    <span class="hljs-keyword">if</span> (shouldCancel) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Operation cancelled&#x27;</span>);
    }

    <span class="hljs-keyword">let</span> isPrime = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i * i &lt;= num; i++) {
      <span class="hljs-keyword">if</span> (num % i === <span class="hljs-number">0</span>) {
        isPrime = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">break</span>;
      }
    }

    <span class="hljs-keyword">if</span> (isPrime) {
      primes.<span class="hljs-title function_">push</span>(num);
    }

    <span class="hljs-comment">// Send progress updates</span>
    <span class="hljs-keyword">if</span> (num % <span class="hljs-number">1000</span> === <span class="hljs-number">0</span>) {
      ctx.<span class="hljs-title function_">postMessage</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROGRESS&#x27;</span>,
        <span class="hljs-attr">progress</span>: (num / limit) * <span class="hljs-number">100</span>,
      } <span class="hljs-keyword">as</span> <span class="hljs-title class_">WorkerResponse</span>);
    }
  }

  <span class="hljs-keyword">return</span> primes;
}

<span class="hljs-comment">// Process large dataset</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span>[] {
  <span class="hljs-comment">// Simulate expensive processing</span>
  <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> {
    <span class="hljs-comment">// Report progress for large datasets</span>
    <span class="hljs-keyword">if</span> (index % <span class="hljs-number">1000</span> === <span class="hljs-number">0</span>) {
      ctx.<span class="hljs-title function_">postMessage</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROGRESS&#x27;</span>,
        <span class="hljs-attr">progress</span>: (index / data.<span class="hljs-property">length</span>) * <span class="hljs-number">100</span>,
      } <span class="hljs-keyword">as</span> <span class="hljs-title class_">WorkerResponse</span>);
    }

    <span class="hljs-comment">// Some expensive computation</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sqrt</span>(value) * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">log</span>(value + <span class="hljs-number">1</span>);
  });
}

<span class="hljs-comment">// Listen for messages from main thread</span>
ctx.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span>&lt;<span class="hljs-title class_">WorkerMessage</span>&gt;) =&gt; {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span> } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;CANCEL_OPERATION&#x27;</span>) {
    shouldCancel = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-keyword">if</span> (isProcessing) {
    ctx.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ERROR&#x27;</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Worker is busy&#x27;</span>,
    } <span class="hljs-keyword">as</span> <span class="hljs-title class_">WorkerResponse</span>);
    <span class="hljs-keyword">return</span>;
  }

  isProcessing = <span class="hljs-literal">true</span>;
  shouldCancel = <span class="hljs-literal">false</span>;

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">result</span>: <span class="hljs-built_in">any</span>;

    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;CALCULATE_PRIMES&#x27;</span>:
        result = <span class="hljs-title function_">calculatePrimes</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">limit</span>);
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;PROCESS_DATA&#x27;</span>:
        result = <span class="hljs-title function_">processData</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">data</span>);
        <span class="hljs-keyword">break</span>;

      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unknown message type: <span class="hljs-subst">\${<span class="hljs-keyword">type</span>}</span>\`</span>);
    }

    ctx.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;RESULT&#x27;</span>,
      <span class="hljs-attr">data</span>: result,
    } <span class="hljs-keyword">as</span> <span class="hljs-title class_">WorkerResponse</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    ctx.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ERROR&#x27;</span>,
      <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>,
    } <span class="hljs-keyword">as</span> <span class="hljs-title class_">WorkerResponse</span>);
  } <span class="hljs-keyword">finally</span> {
    isProcessing = <span class="hljs-literal">false</span>;
    shouldCancel = <span class="hljs-literal">false</span>;
  }
});

<span class="hljs-comment">// Signal that worker is ready</span>
ctx.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;READY&#x27;</span> });
</code></pre>
<h3 id="خطاف-react-لإدارة-worker">خُطّاف React لإدارة Worker</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useWebWorker.ts</span>
<span class="hljs-keyword">import</span> { useEffect, useRef, useState, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseWebWorkerOptions</span> {
  <span class="hljs-attr">onProgress</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">progress</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">terminateOnUnmount</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useWebWorker&lt;T = <span class="hljs-built_in">any</span>&gt;(<span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>: <span class="hljs-title class_">UseWebWorkerOptions</span> = {}) {
  <span class="hljs-keyword">const</span> { onProgress, onError, terminateOnUnmount = <span class="hljs-literal">true</span> } = options;

  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isProcessing, setIsProcessing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [progress, setProgress] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Initialize worker</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Create worker with proper typing</span>
    workerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(workerPath, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span> });

    <span class="hljs-keyword">const</span> worker = workerRef.<span class="hljs-property">current</span>;

    <span class="hljs-comment">// Set up message handler</span>
    worker.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data, <span class="hljs-attr">error</span>: errorMsg, <span class="hljs-attr">progress</span>: prog } = event.<span class="hljs-property">data</span>;

      <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;READY&#x27;</span>:
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Worker ready&#x27;</span>);
          <span class="hljs-keyword">break</span>;

        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;PROGRESS&#x27;</span>:
          <span class="hljs-title function_">setProgress</span>(prog);
          onProgress?.(prog);
          <span class="hljs-keyword">break</span>;

        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ERROR&#x27;</span>:
          <span class="hljs-title function_">setError</span>(errorMsg);
          onError?.(errorMsg);
          <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-keyword">break</span>;

        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;RESULT&#x27;</span>:
          <span class="hljs-comment">// Results handled by promise resolution</span>
          <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-title function_">setProgress</span>(<span class="hljs-number">100</span>);
          <span class="hljs-keyword">break</span>;
      }
    };

    worker.<span class="hljs-property">onerror</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ErrorEvent</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> errorMsg = <span class="hljs-string">\`Worker error: <span class="hljs-subst">\${event.message}</span>\`</span>;
      <span class="hljs-title function_">setError</span>(errorMsg);
      onError?.(errorMsg);
      <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
    };

    <span class="hljs-comment">// Cleanup</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (terminateOnUnmount &amp;&amp; worker) {
        worker.<span class="hljs-title function_">terminate</span>();
      }
    };
  }, [workerPath, onProgress, onError, terminateOnUnmount]);

  <span class="hljs-comment">// Send message to worker and get result</span>
  <span class="hljs-keyword">const</span> postMessage = <span class="hljs-title function_">useCallback</span>(&lt;R = T,&gt;(<span class="hljs-attr">message</span>: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">Promise</span>&lt;R&gt; =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!workerRef.<span class="hljs-property">current</span>) {
        <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Worker not initialized&#x27;</span>));
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);
      <span class="hljs-title function_">setProgress</span>(<span class="hljs-number">0</span>);

      <span class="hljs-keyword">const</span> worker = workerRef.<span class="hljs-property">current</span>;

      <span class="hljs-comment">// One-time result handler</span>
      <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleResult</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span></span>) =&gt; {
        <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;RESULT&#x27;</span>) {
          worker.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleResult);
          <span class="hljs-title function_">resolve</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">data</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;ERROR&#x27;</span>) {
          worker.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleResult);
          <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">error</span>));
        }
      };

      worker.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleResult);
      worker.<span class="hljs-title function_">postMessage</span>(message);
    });
  }, []);

  <span class="hljs-comment">// Cancel ongoing operation</span>
  <span class="hljs-keyword">const</span> cancel = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (workerRef.<span class="hljs-property">current</span> &amp;&amp; isProcessing) {
      workerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CANCEL_OPERATION&#x27;</span> });
      <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
      <span class="hljs-title function_">setProgress</span>(<span class="hljs-number">0</span>);
    }
  }, [isProcessing]);

  <span class="hljs-comment">// Terminate worker</span>
  <span class="hljs-keyword">const</span> terminate = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (workerRef.<span class="hljs-property">current</span>) {
      workerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">terminate</span>();
      workerRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
      <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
      <span class="hljs-title function_">setProgress</span>(<span class="hljs-number">0</span>);
    }
  }, []);

  <span class="hljs-keyword">return</span> {
    postMessage,
    cancel,
    terminate,
    isProcessing,
    progress,
    error,
  };
}
</code></pre>
<h3 id="استخدام-worker-في-مكون">استخدام Worker في مكوّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/PrimeCalculator.tsx</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PrimeCalculator</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [limit, setLimit] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">100000</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-built_in">number</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> { postMessage, cancel, isProcessing, progress, error } = <span class="hljs-title function_">useWebWorker</span>(
    <span class="hljs-string">&#x27;../worker/calculator.worker.ts&#x27;</span>,
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">calculatePrimes</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> primes = <span class="hljs-keyword">await</span> postMessage&lt;<span class="hljs-built_in">number</span>[]&gt;({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CALCULATE_PRIMES&#x27;</span>,
        limit,
      });
      <span class="hljs-title function_">setResults</span>(primes);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to calculate primes:&#x27;</span>, err);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;prime-calculator&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Prime Number Calculator<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{limit}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setLimit(Number(e.target.value))}
          disabled={isProcessing}
          placeholder=&quot;Enter limit&quot;
        /&gt;

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{calculatePrimes}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isProcessing}</span>&gt;</span>
          {isProcessing ? &#x27;Calculating...&#x27; : &#x27;Calculate Primes&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

        {isProcessing &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{cancel}</span>&gt;</span>Cancel<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {isProcessing &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;progress&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;progress-bar&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> \`\${<span class="hljs-attr">progress</span>}%\` }} /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{progress.toFixed(1)}%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      {results.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;results&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Found {results.length} prime numbers<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;prime-list&quot;</span>&gt;</span>
            {results.slice(0, 100).join(&#x27;, &#x27;)}
            {results.length &gt; 100 &amp;&amp; &#x27;...&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-متقدمة-للعمال">أنماط متقدمة للعمّال</h2>
<h3 id="مجموعة-عمال-للمعالجة-المتوازية">مجموعة عمّال للمعالجة المتوازية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/workerPool.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WorkerPool</span>&lt;T = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">workers</span>: <span class="hljs-title class_">Worker</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">queue</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>;
    <span class="hljs-attr">resolve</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">reject</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  }&gt; = [];
  <span class="hljs-keyword">private</span> busyWorkers = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-title class_">Worker</span>&gt;();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">private</span> <span class="hljs-attr">poolSize</span>: <span class="hljs-built_in">number</span> = navigator.hardwareConcurrency || <span class="hljs-number">4</span>,
  </span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">initializePool</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">initializePool</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">poolSize</span>; i++) {
      <span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">workerPath</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span> });

      worker.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">handleWorkerMessage</span>(worker, event);
      };

      worker.<span class="hljs-property">onerror</span> = <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Worker error:&#x27;</span>, error);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-title function_">delete</span>(worker);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
      };

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">workers</span>.<span class="hljs-title function_">push</span>(worker);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">handleWorkerMessage</span>(<span class="hljs-params"><span class="hljs-attr">worker</span>: <span class="hljs-title class_">Worker</span>, <span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span></span>) {
    <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data, error } = event.<span class="hljs-property">data</span>;

    <span class="hljs-comment">// Get the task associated with this worker</span>
    <span class="hljs-keyword">const</span> task = (worker <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">__currentTask</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;RESULT&#x27;</span>) {
      task?.<span class="hljs-title function_">resolve</span>(data);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;ERROR&#x27;</span>) {
      task?.<span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(error));
    }

    <span class="hljs-comment">// Mark worker as available</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-title function_">delete</span>(worker);
    <span class="hljs-title function_">delete</span> (worker <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">__currentTask</span>;

    <span class="hljs-comment">// Process next item in queue</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processQueue</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Find available worker</span>
    <span class="hljs-keyword">const</span> availableWorker = <span class="hljs-variable language_">this</span>.<span class="hljs-property">workers</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">w</span>) =&gt;</span> !<span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-title function_">has</span>(w));

    <span class="hljs-keyword">if</span> (!availableWorker) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Get next task from queue</span>
    <span class="hljs-keyword">const</span> task = <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">shift</span>();
    <span class="hljs-keyword">if</span> (!task) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Assign task to worker</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-title function_">add</span>(availableWorker);
    (availableWorker <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">__currentTask</span> = task;
    availableWorker.<span class="hljs-title function_">postMessage</span>(task.<span class="hljs-property">data</span>);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">process</span>(<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">push</span>({ data, resolve, reject });
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">processAll</span>(<span class="hljs-attr">items</span>: <span class="hljs-built_in">any</span>[]): <span class="hljs-title class_">Promise</span>&lt;T[]&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(items.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">process</span>(item)));
  }

  <span class="hljs-title function_">terminate</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">workers</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">worker</span>) =&gt;</span> worker.<span class="hljs-title function_">terminate</span>());
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">workers</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-title function_">clear</span>();
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">poolSize</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">poolSize</span>,
      <span class="hljs-attr">busyWorkers</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-property">size</span>,
      <span class="hljs-attr">queueLength</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">queue</span>.<span class="hljs-property">length</span>,
      <span class="hljs-attr">utilization</span>: (<span class="hljs-variable language_">this</span>.<span class="hljs-property">busyWorkers</span>.<span class="hljs-property">size</span> / <span class="hljs-variable language_">this</span>.<span class="hljs-property">poolSize</span>) * <span class="hljs-number">100</span>,
    };
  }
}

<span class="hljs-comment">// Hook for using worker pool</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useWorkerPool&lt;T = <span class="hljs-built_in">any</span>&gt;(<span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">poolSize</span>?: <span class="hljs-built_in">number</span>) {
  <span class="hljs-keyword">const</span> poolRef = useRef&lt;<span class="hljs-title class_">WorkerPool</span>&lt;T&gt; | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [stats, setStats] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">poolSize</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">busyWorkers</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">queueLength</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">utilization</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    poolRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WorkerPool</span>&lt;T&gt;(workerPath, poolSize);

    <span class="hljs-comment">// Update stats periodically</span>
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (poolRef.<span class="hljs-property">current</span>) {
        <span class="hljs-title function_">setStats</span>(poolRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getStats</span>());
      }
    }, <span class="hljs-number">100</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearInterval</span>(interval);
      poolRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">terminate</span>();
    };
  }, [workerPath, poolSize]);

  <span class="hljs-keyword">const</span> process = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; =&gt; {
    <span class="hljs-keyword">if</span> (!poolRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Worker pool not initialized&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> poolRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">process</span>(data);
  }, []);

  <span class="hljs-keyword">const</span> processAll = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">items</span>: <span class="hljs-built_in">any</span>[]): <span class="hljs-title class_">Promise</span>&lt;T[]&gt; =&gt; {
    <span class="hljs-keyword">if</span> (!poolRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Worker pool not initialized&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> poolRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">processAll</span>(items);
  }, []);

  <span class="hljs-keyword">return</span> {
    process,
    processAll,
    stats,
  };
}
</code></pre>
<h3 id="كائنات-قابلة-للنقل-للبيانات-الكبيرة">كائنات قابلة للنقل للبيانات الكبيرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/transferableWorker.ts</span>

<span class="hljs-comment">// Worker that handles large binary data efficiently</span>
<span class="hljs-comment">// worker/imageProcessor.worker.ts</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">Worker</span> = <span class="hljs-variable language_">self</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImageProcessingMessage</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROCESS_IMAGE&#x27;</span>;
  <span class="hljs-attr">imageData</span>: <span class="hljs-title class_">ImageData</span>;
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;blur&#x27;</span> | <span class="hljs-string">&#x27;sharpen&#x27;</span> | <span class="hljs-string">&#x27;grayscale&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">processImage</span>(<span class="hljs-params"><span class="hljs-attr">imageData</span>: <span class="hljs-title class_">ImageData</span>, <span class="hljs-attr">filter</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">ImageData</span> {
  <span class="hljs-keyword">const</span> pixels = imageData.<span class="hljs-property">data</span>;
  <span class="hljs-keyword">const</span> width = imageData.<span class="hljs-property">width</span>;
  <span class="hljs-keyword">const</span> height = imageData.<span class="hljs-property">height</span>;

  <span class="hljs-comment">// Create new ImageData for result</span>
  <span class="hljs-keyword">const</span> output = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ImageData</span>(width, height);
  <span class="hljs-keyword">const</span> outputPixels = output.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">switch</span> (filter) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;grayscale&#x27;</span>:
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; pixels.<span class="hljs-property">length</span>; i += <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">const</span> gray = pixels[i] * <span class="hljs-number">0.299</span> + pixels[i + <span class="hljs-number">1</span>] * <span class="hljs-number">0.587</span> + pixels[i + <span class="hljs-number">2</span>] * <span class="hljs-number">0.114</span>;
        outputPixels[i] = gray; <span class="hljs-comment">// R</span>
        outputPixels[i + <span class="hljs-number">1</span>] = gray; <span class="hljs-comment">// G</span>
        outputPixels[i + <span class="hljs-number">2</span>] = gray; <span class="hljs-comment">// B</span>
        outputPixels[i + <span class="hljs-number">3</span>] = pixels[i + <span class="hljs-number">3</span>]; <span class="hljs-comment">// A</span>
      }
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;blur&#x27;</span>:
      <span class="hljs-comment">// Simple box blur</span>
      <span class="hljs-keyword">const</span> blurRadius = <span class="hljs-number">2</span>;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = <span class="hljs-number">0</span>; y &lt; height; y++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>; x &lt; width; x++) {
          <span class="hljs-keyword">let</span> r = <span class="hljs-number">0</span>,
            g = <span class="hljs-number">0</span>,
            b = <span class="hljs-number">0</span>,
            a = <span class="hljs-number">0</span>;
          <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;

          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> dy = -blurRadius; dy &lt;= blurRadius; dy++) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> dx = -blurRadius; dx &lt;= blurRadius; dx++) {
              <span class="hljs-keyword">const</span> ny = y + dy;
              <span class="hljs-keyword">const</span> nx = x + dx;

              <span class="hljs-keyword">if</span> (ny &gt;= <span class="hljs-number">0</span> &amp;&amp; ny &lt; height &amp;&amp; nx &gt;= <span class="hljs-number">0</span> &amp;&amp; nx &lt; width) {
                <span class="hljs-keyword">const</span> idx = (ny * width + nx) * <span class="hljs-number">4</span>;
                r += pixels[idx];
                g += pixels[idx + <span class="hljs-number">1</span>];
                b += pixels[idx + <span class="hljs-number">2</span>];
                a += pixels[idx + <span class="hljs-number">3</span>];
                count++;
              }
            }
          }

          <span class="hljs-keyword">const</span> idx = (y * width + x) * <span class="hljs-number">4</span>;
          outputPixels[idx] = r / count;
          outputPixels[idx + <span class="hljs-number">1</span>] = g / count;
          outputPixels[idx + <span class="hljs-number">2</span>] = b / count;
          outputPixels[idx + <span class="hljs-number">3</span>] = a / count;
        }
      }
      <span class="hljs-keyword">break</span>;

    <span class="hljs-comment">// Add more filters as needed</span>
  }

  <span class="hljs-keyword">return</span> output;
}

ctx.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span>&lt;<span class="hljs-title class_">ImageProcessingMessage</span>&gt;</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, imageData, filter } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;PROCESS_IMAGE&#x27;</span>) {
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">processImage</span>(imageData, filter);

    <span class="hljs-comment">// Transfer the result back (zero-copy transfer)</span>
    ctx.<span class="hljs-title function_">postMessage</span>(
      { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;RESULT&#x27;</span>, <span class="hljs-attr">imageData</span>: result },
      [result.<span class="hljs-property">data</span>.<span class="hljs-property">buffer</span>], <span class="hljs-comment">// Transfer ownership of the buffer</span>
    );
  }
});

<span class="hljs-comment">// Hook for efficient data transfer</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTransferableWorker</span>(<span class="hljs-params"><span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    workerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(workerPath, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span> });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">terminate</span>();
    };
  }, [workerPath]);

  <span class="hljs-keyword">const</span> processWithTransfer = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-keyword">async</span> &lt;T = <span class="hljs-built_in">any</span>,&gt;(<span class="hljs-attr">message</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">transferables</span>: <span class="hljs-title class_">Transferable</span>[]): <span class="hljs-title class_">Promise</span>&lt;T&gt; =&gt; {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!workerRef.<span class="hljs-property">current</span>) {
          <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Worker not initialized&#x27;</span>));
          <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-keyword">const</span> worker = workerRef.<span class="hljs-property">current</span>;

        <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMessage</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span></span>) =&gt; {
          <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;RESULT&#x27;</span>) {
            worker.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleMessage);
            <span class="hljs-title function_">resolve</span>(event.<span class="hljs-property">data</span>);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;ERROR&#x27;</span>) {
            worker.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleMessage);
            <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">error</span>));
          }
        };

        worker.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleMessage);

        <span class="hljs-comment">// Transfer ownership of buffers to worker (zero-copy)</span>
        worker.<span class="hljs-title function_">postMessage</span>(message, transferables);
      });
    },
    [],
  );

  <span class="hljs-keyword">return</span> { processWithTransfer };
}
</code></pre>
<h3 id="sharedarraybuffer-للتواصل-في-الزمن-الحقيقي">SharedArrayBuffer للتواصل في الزمن الحقيقي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/sharedWorker.ts</span>
<span class="hljs-comment">// Note: SharedArrayBuffer requires specific headers for security</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SharedMemoryWorker</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">worker</span>: <span class="hljs-title class_">Worker</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">sharedBuffer</span>: <span class="hljs-title class_">SharedArrayBuffer</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">sharedArray</span>: <span class="hljs-title class_">Int32Array</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">bufferSize</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">1024</span></span>) {
    <span class="hljs-comment">// Create shared memory</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedBuffer</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SharedArrayBuffer</span>(bufferSize * <span class="hljs-number">4</span>); <span class="hljs-comment">// 4 bytes per int32</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Int32Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedBuffer</span>);

    <span class="hljs-comment">// Create worker with shared memory</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(workerPath, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span> });

    <span class="hljs-comment">// Send shared buffer to worker</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span>.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;INIT_SHARED_MEMORY&#x27;</span>,
      <span class="hljs-attr">buffer</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedBuffer</span>,
    });
  }

  <span class="hljs-comment">// Atomic operations for thread-safe access</span>
  <span class="hljs-title function_">read</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">load</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index);
  }

  <span class="hljs-title function_">write</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">store</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index, value);
  }

  <span class="hljs-title function_">increment</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index, <span class="hljs-number">1</span>);
  }

  <span class="hljs-title function_">compareExchange</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">expectedValue</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">newValue</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">compareExchange</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index, expectedValue, newValue);
  }

  <span class="hljs-comment">// Wait for value change (blocking)</span>
  <span class="hljs-title function_">waitFor</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-string">&#x27;ok&#x27;</span> | <span class="hljs-string">&#x27;timed-out&#x27;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">wait</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index, value, timeout);
  }

  <span class="hljs-comment">// Notify waiting threads</span>
  <span class="hljs-title function_">notify</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">1</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">notify</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">sharedArray</span>, index, count);
  }

  <span class="hljs-title function_">terminate</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span>.<span class="hljs-title function_">terminate</span>();
  }
}

<span class="hljs-comment">// Worker side implementation</span>
<span class="hljs-comment">// worker/sharedMemory.worker.ts</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">Worker</span> = <span class="hljs-variable language_">self</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">sharedArray</span>: <span class="hljs-title class_">Int32Array</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

ctx.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;INIT_SHARED_MEMORY&#x27;</span>) {
    sharedArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Int32Array</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">buffer</span>);

    <span class="hljs-comment">// Start processing with shared memory</span>
    <span class="hljs-title function_">processSharedData</span>();
  }
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">processSharedData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (!sharedArray) <span class="hljs-keyword">return</span>;

  <span class="hljs-comment">// Example: Increment counter in shared memory</span>
  <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Atomic increment at index 0</span>
    <span class="hljs-keyword">const</span> newValue = <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">add</span>(sharedArray, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);

    <span class="hljs-comment">// Notify main thread of update</span>
    <span class="hljs-title class_">Atomics</span>.<span class="hljs-title function_">notify</span>(sharedArray, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
  }, <span class="hljs-number">100</span>);
}
</code></pre>
<h2 id="حالات-استخدام-واقعية">حالات استخدام واقعية</h2>
<h3 id="الحالة-1-معالجة-تصور-البيانات">الحالة 1: معالجة تصور البيانات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/DataVisualizer.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataPoint</span> {
  <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataVisualizer</span>(<span class="hljs-params">{ rawData }: { rawData: <span class="hljs-built_in">number</span>[][] }</span>) {
  <span class="hljs-keyword">const</span> [processedData, setProcessedData] = useState&lt;<span class="hljs-title class_">DataPoint</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [clusters, setClusters] = useState&lt;<span class="hljs-title class_">DataPoint</span>[][]&gt;([]);

  <span class="hljs-keyword">const</span> { postMessage, isProcessing, progress } = <span class="hljs-title function_">useWebWorker</span>(<span class="hljs-string">&#x27;../worker/dataProcessor.worker.ts&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">processData</span>();
  }, [rawData]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">processData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Process raw data in worker</span>
      <span class="hljs-keyword">const</span> processed = <span class="hljs-keyword">await</span> postMessage&lt;<span class="hljs-title class_">DataPoint</span>[]&gt;({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROCESS_DATA&#x27;</span>,
        <span class="hljs-attr">data</span>: rawData,
      });
      <span class="hljs-title function_">setProcessedData</span>(processed);

      <span class="hljs-comment">// Perform clustering in worker</span>
      <span class="hljs-keyword">const</span> clusterResult = <span class="hljs-keyword">await</span> postMessage&lt;<span class="hljs-title class_">DataPoint</span>[][]&gt;({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CLUSTER_DATA&#x27;</span>,
        <span class="hljs-attr">data</span>: processed,
        <span class="hljs-attr">config</span>: { <span class="hljs-attr">k</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">iterations</span>: <span class="hljs-number">100</span> },
      });
      <span class="hljs-title function_">setClusters</span>(clusterResult);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Data processing failed:&#x27;</span>, error);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-visualizer&quot;</span>&gt;</span>
      {isProcessing ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>Processing data... {progress.toFixed(0)}%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">Canvas</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{processedData}</span> <span class="hljs-attr">clusters</span>=<span class="hljs-string">{clusters}</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{800}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{600}</span> /&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الحالة-2-بحث-في-الزمن-الحقيقي-باستخدام-worker">الحالة 2: بحث في الزمن الحقيقي باستخدام Worker</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/WorkerSearch.tsx</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">WorkerSearch</span>(<span class="hljs-params">{ dataset }: { dataset: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [searchTime, setSearchTime] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> searchWorkerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Initialize search worker with dataset</span>
    searchWorkerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;../worker/search.worker.ts&#x27;</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
    });

    <span class="hljs-keyword">const</span> worker = searchWorkerRef.<span class="hljs-property">current</span>;

    <span class="hljs-comment">// Index the dataset in the worker</span>
    worker.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;INDEX_DATA&#x27;</span>,
      <span class="hljs-attr">data</span>: dataset,
    });

    worker.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;SEARCH_RESULTS&#x27;</span>) {
        <span class="hljs-title function_">setResults</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">results</span>);
        <span class="hljs-title function_">setSearchTime</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">time</span>);
      }
    };

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      worker.<span class="hljs-title function_">terminate</span>();
    };
  }, [dataset]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!query) {
      <span class="hljs-title function_">setResults</span>([]);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Debounce search</span>
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      searchWorkerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">postMessage</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SEARCH&#x27;</span>,
        query,
      });
    }, <span class="hljs-number">300</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
  }, [query]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;worker-search&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
        placeholder=&quot;Search dataset...&quot;
      /&gt;

      {searchTime &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;search-stats&quot;</span>&gt;</span>
          Found {results.length} results in {searchTime.toFixed(2)}ms
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;results&quot;</span>&gt;</span>
        {results.map((item) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">SearchResult</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الحالة-3-مزامنة-وتخزين-مؤقت-في-الخلفية">الحالة 3: مزامنة وتخزين مؤقت في الخلفية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/syncWorker.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SyncWorker</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">worker</span>: <span class="hljs-title class_">Worker</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">syncQueue</span>: <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;../worker/sync.worker.ts&#x27;</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupMessageHandler</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupPeriodicSync</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupMessageHandler</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, id, success } = event.<span class="hljs-property">data</span>;

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;SYNC_COMPLETE&#x27;</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">syncQueue</span>.<span class="hljs-title function_">delete</span>(id);

        <span class="hljs-comment">// Notify React components</span>
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">dispatchEvent</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">CustomEvent</span>(<span class="hljs-string">&#x27;sync-complete&#x27;</span>, {
            <span class="hljs-attr">detail</span>: { id, success },
          }),
        );
      }
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupPeriodicSync</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Sync every 30 seconds</span>
    <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">syncPendingData</span>();
    }, <span class="hljs-number">30000</span>);

    <span class="hljs-comment">// Sync when online</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">syncPendingData</span>();
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">queueForSync</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">syncQueue</span>.<span class="hljs-title function_">add</span>(id);

    <span class="hljs-comment">// Store in IndexedDB for persistence</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">storeLocal</span>(id, data);

    <span class="hljs-comment">// Try immediate sync if online</span>
    <span class="hljs-keyword">if</span> (navigator.<span class="hljs-property">onLine</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span>.<span class="hljs-title function_">postMessage</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SYNC_ITEM&#x27;</span>,
        id,
        data,
      });
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">storeLocal</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Store in IndexedDB (simplified)</span>
    <span class="hljs-keyword">const</span> db = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">openDB</span>();
    <span class="hljs-keyword">const</span> tx = db.<span class="hljs-title function_">transaction</span>([<span class="hljs-string">&#x27;pending&#x27;</span>], <span class="hljs-string">&#x27;readwrite&#x27;</span>);
    <span class="hljs-keyword">await</span> tx.<span class="hljs-title function_">objectStore</span>(<span class="hljs-string">&#x27;pending&#x27;</span>).<span class="hljs-title function_">put</span>({ id, data, <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">syncPendingData</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!navigator.<span class="hljs-property">onLine</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> pending = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getPendingItems</span>();

    pending.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">worker</span>.<span class="hljs-title function_">postMessage</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SYNC_ITEM&#x27;</span>,
        <span class="hljs-attr">id</span>: item.<span class="hljs-property">id</span>,
        <span class="hljs-attr">data</span>: item.<span class="hljs-property">data</span>,
      });
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">openDB</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">IDBDatabase</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> request = indexedDB.<span class="hljs-title function_">open</span>(<span class="hljs-string">&#x27;SyncDB&#x27;</span>, <span class="hljs-number">1</span>);

      request.<span class="hljs-property">onsuccess</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(request.<span class="hljs-property">result</span>);
      request.<span class="hljs-property">onerror</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">reject</span>(request.<span class="hljs-property">error</span>);

      request.<span class="hljs-property">onupgradeneeded</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> db = (event.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">IDBOpenDBRequest</span>).<span class="hljs-property">result</span>;
        <span class="hljs-keyword">if</span> (!db.<span class="hljs-property">objectStoreNames</span>.<span class="hljs-title function_">contains</span>(<span class="hljs-string">&#x27;pending&#x27;</span>)) {
          db.<span class="hljs-title function_">createObjectStore</span>(<span class="hljs-string">&#x27;pending&#x27;</span>, { <span class="hljs-attr">keyPath</span>: <span class="hljs-string">&#x27;id&#x27;</span> });
        }
      };
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">getPendingItems</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>[]&gt; {
    <span class="hljs-keyword">const</span> db = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">openDB</span>();
    <span class="hljs-keyword">const</span> tx = db.<span class="hljs-title function_">transaction</span>([<span class="hljs-string">&#x27;pending&#x27;</span>], <span class="hljs-string">&#x27;readonly&#x27;</span>);
    <span class="hljs-keyword">const</span> store = tx.<span class="hljs-title function_">objectStore</span>(<span class="hljs-string">&#x27;pending&#x27;</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> request = store.<span class="hljs-title function_">getAll</span>();
      request.<span class="hljs-property">onsuccess</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(request.<span class="hljs-property">result</span>);
      request.<span class="hljs-property">onerror</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">reject</span>(request.<span class="hljs-property">error</span>);
    });
  }
}

<span class="hljs-comment">// Hook for background sync</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useBackgroundSync</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> syncWorkerRef = useRef&lt;<span class="hljs-title class_">SyncWorker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [syncStatus, setSyncStatus] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">boolean</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    syncWorkerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SyncWorker</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSyncComplete</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CustomEvent</span></span>) =&gt; {
      <span class="hljs-keyword">const</span> { id, success } = event.<span class="hljs-property">detail</span>;
      <span class="hljs-title function_">setSyncStatus</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(id, success));
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;sync-complete&#x27;</span>, handleSyncComplete <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;sync-complete&#x27;</span>, handleSyncComplete <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>);
    };
  }, []);

  <span class="hljs-keyword">const</span> queueSync = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>) =&gt; {
    <span class="hljs-keyword">await</span> syncWorkerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">queueForSync</span>(id, data);
    <span class="hljs-title function_">setSyncStatus</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(id, <span class="hljs-literal">false</span>)); <span class="hljs-comment">// Pending</span>
  }, []);

  <span class="hljs-keyword">return</span> {
    queueSync,
    syncStatus,
    <span class="hljs-attr">isSynced</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> syncStatus.<span class="hljs-title function_">get</span>(id) === <span class="hljs-literal">true</span>,
    <span class="hljs-attr">isPending</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> syncStatus.<span class="hljs-title function_">get</span>(id) === <span class="hljs-literal">false</span>,
  };
}
</code></pre>
<h2 id="مراقبة-الأداء-والتنقيح">مراقبة الأداء والتنقيح</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/workerPerformance.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WorkerPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">startTimes</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">startMeasure</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">startTimes</span>.<span class="hljs-title function_">set</span>(id, performance.<span class="hljs-title function_">now</span>());
  }

  <span class="hljs-title function_">endMeasure</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> startTime = <span class="hljs-variable language_">this</span>.<span class="hljs-property">startTimes</span>.<span class="hljs-title function_">get</span>(id);
    <span class="hljs-keyword">if</span> (!startTime) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;

    <span class="hljs-comment">// Store metric</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(id)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(id, []);
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(id)!.<span class="hljs-title function_">push</span>(duration);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">startTimes</span>.<span class="hljs-title function_">delete</span>(id);
    <span class="hljs-keyword">return</span> duration;
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> times = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(id) || [];
    <span class="hljs-keyword">if</span> (times.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> sorted = [...times].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: times.<span class="hljs-property">length</span>,
      <span class="hljs-attr">mean</span>: times.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / times.<span class="hljs-property">length</span>,
      <span class="hljs-attr">median</span>: sorted[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>)],
      <span class="hljs-attr">min</span>: sorted[<span class="hljs-number">0</span>],
      <span class="hljs-attr">max</span>: sorted[sorted.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>],
      <span class="hljs-attr">p95</span>: sorted[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> * <span class="hljs-number">0.95</span>)],
      <span class="hljs-attr">p99</span>: sorted[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> * <span class="hljs-number">0.99</span>)],
    };
  }

  <span class="hljs-title function_">report</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">&#x27;Worker Performance Report&#x27;</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">times, id</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> stats = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStats</span>(id);
      <span class="hljs-keyword">if</span> (stats) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>({
          <span class="hljs-title class_">Operation</span>: id,
          <span class="hljs-string">&#x27;Avg Time&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${stats.mean.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
          <span class="hljs-attr">P95</span>: <span class="hljs-string">\`<span class="hljs-subst">\${stats.p95.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
          <span class="hljs-title class_">Count</span>: stats.<span class="hljs-property">count</span>,
        });
      }
    });

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();
  }
}

<span class="hljs-comment">// Debug component for worker monitoring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">WorkerDebugPanel</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [workerStats, setWorkerStats] = useState&lt;<span class="hljs-built_in">any</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Get all active workers (custom tracking needed)</span>
      <span class="hljs-keyword">const</span> stats = <span class="hljs-title function_">getActiveWorkerStats</span>();
      <span class="hljs-title function_">setWorkerStats</span>(stats);
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;worker-debug-panel&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Active Workers<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Worker<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Status<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Messages<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Avg Time<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
          {workerStats.map((stat) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{stat.id}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{stat.name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{stat.status}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{stat.messageCount}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{stat.avgTime.toFixed(2)}ms<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أفضل-الممارسات-والمزالق">أفضل الممارسات والمزالق</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Common patterns and anti-patterns</span>

<span class="hljs-comment">// ✅ Good: Reuse workers for multiple operations</span>
<span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;./worker.js&#x27;</span>);
worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TASK_1&#x27;</span>, data });
<span class="hljs-comment">// Later...</span>
worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TASK_2&#x27;</span>, data });

<span class="hljs-comment">// ❌ Bad: Create new worker for each operation</span>
<span class="hljs-keyword">const</span> worker1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;./worker.js&#x27;</span>);
worker1.<span class="hljs-title function_">postMessage</span>(data1);
worker1.<span class="hljs-title function_">terminate</span>();

<span class="hljs-keyword">const</span> worker2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;./worker.js&#x27;</span>);
worker2.<span class="hljs-title function_">postMessage</span>(data2);
worker2.<span class="hljs-title function_">terminate</span>();

<span class="hljs-comment">// ✅ Good: Transfer large data efficiently</span>
<span class="hljs-keyword">const</span> buffer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayBuffer</span>(<span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>);
worker.<span class="hljs-title function_">postMessage</span>({ buffer }, [buffer]); <span class="hljs-comment">// Transfer ownership</span>

<span class="hljs-comment">// ❌ Bad: Clone large data unnecessarily</span>
<span class="hljs-keyword">const</span> largeArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(<span class="hljs-number">1000000</span>);
worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">array</span>: largeArray }); <span class="hljs-comment">// Clones entire array</span>

<span class="hljs-comment">// ✅ Good: Handle worker errors gracefully</span>
worker.<span class="hljs-property">onerror</span> = <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Worker error:&#x27;</span>, error);
  <span class="hljs-comment">// Fallback to main thread processing</span>
  <span class="hljs-title function_">processOnMainThread</span>(data);
};

<span class="hljs-comment">// ❌ Bad: No error handling</span>
worker.<span class="hljs-title function_">postMessage</span>(data); <span class="hljs-comment">// Hope for the best</span>

<span class="hljs-comment">// ✅ Good: Clean up workers properly</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;./worker.js&#x27;</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
    worker.<span class="hljs-title function_">terminate</span>();
  };
}, []);

<span class="hljs-comment">// ❌ Bad: Memory leak from unterminated workers</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;./worker.js&#x27;</span>);
  <span class="hljs-comment">// No cleanup!</span>
}, []);
</code></pre>
<h2 id="الختام">الختام</h2>
<p>Web Workers هي مخرجك من قيود JavaScript أحادية الخيط. فهي تتيح لك تشغيل حسابات مكلفة دون تجميد واجهتك، ومعالجة البيانات على نحو متوازٍ على الأجهزة متعددة النوى، وبناء تطبيقات React سريعة الاستجابة حقًا حتى تحت الحمل الثقيل.</p>
<p>المفتاح هو معرفة متى تستخدمها (حسابات تتجاوز 16ms، معالجة بيانات كبيرة، مزامنة في الخلفية) ومتى لا تستخدمها (حسابات بسيطة، عمليات صغيرة متكررة، التلاعب بـ DOM). مع كتابة أنواع TypeScript سليمة، ونقل بيانات فعّال باستخدام كائنات Transferable، وإدارة دقيقة لدورة الحياة، تصبح العمّال أداة قوية في ترسانة أداء React لديك.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,r as default,t as headings,e as html,l as slug,p as title};
