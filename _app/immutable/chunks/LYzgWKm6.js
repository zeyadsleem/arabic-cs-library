const s="kinney",a="react-performance",n="أداء React",l="real-time-data-performance",p="أداء البيانات الزمنية الحقيقية في React",t=[{depth:2,id:"فهم-تحديات-الأداء-في-الزمن-الحقيقي",text:"فهم تحديات الأداء في الزمن الحقيقي"},{depth:2,id:"إدارة-اتصالات-websocket",text:"إدارة اتصالات WebSocket"},{depth:2,id:"تقييد-التحديثات-وتجميعها",text:"تقييد التحديثات وتجميعها"},{depth:2,id:"المحاكاة-الافتراضية-لمجموعات-البيانات-الكبيرة",text:"المحاكاة الافتراضية لمجموعات البيانات الكبيرة"},{depth:2,id:"تحديثات-المكونات-الانتقائية",text:"تحديثات المكوّنات الانتقائية"},{depth:2,id:"أحداث-الخادم-المرسلة-sse",text:"أحداث الخادم المرسلة (SSE)"},{depth:2,id:"المعالجة-بواسطة-web-worker",text:"المعالجة بواسطة Web Worker"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>البيانات الزمنية الحقيقية هي نقطة ضعف React القاتلة. أسعار أسهم تتحدّث 100 مرة في الثانية، ورسائل دردشة تتدفّق، وتعاون حيّ مع عشرات المستخدمين — كل تحديث يُطلق إعادة تصيير، وفجأة يتحوّل تطبيق React السلس لديك إلى فوضى متقطّعة. والتحدي ليس في الشبكة؛ فـ WebSockets الحديثة قادرة على التعامل مع آلاف الرسائل في الثانية. التحدي في عملية المطابقة (reconciliation) في React التي تختنق بوتيرة التحديثات.</p>
<p>لكن الزمن الحقيقي لا يعني البطء الحقيقي بالضرورة. فبالأنماط الصحيحة — تقييد المعدّل (throttling)، والتجميع (batching)، والمحاكاة الافتراضية (virtualization)، والتحديثات الانتقائية — تستطيع التعامل مع تدفقات بيانات هائلة مع الحفاظ على 60 إطارًا في الثانية. والمفتاح هو فهم مواضع الاختناقات (تلميح: ليست دائمًا حيث تظن) وتنفيذ التحسينات الصحيحة في كل طبقة من طبقات منظومتك. يعرض عليك هذا الدليل كيف تبني تطبيقات React تتعامل مع البيانات الزمنية الحقيقية باحتراف.</p>
<h2 id="فهم-تحديات-الأداء-في-الزمن-الحقيقي">فهم تحديات الأداء في الزمن الحقيقي</h2>
<p>تخلق البيانات الزمنية الحقيقية مشكلات أداء فريدة من نوعها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Real-time data performance characteristics</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RealTimePerformance</span> {
  <span class="hljs-comment">// Performance challenges</span>
  <span class="hljs-attr">challenges</span>: {
    <span class="hljs-attr">updateFrequency</span>: <span class="hljs-string">&#x27;Updates faster than frame rate (&gt;60Hz)&#x27;</span>;
    <span class="hljs-attr">reconciliation</span>: <span class="hljs-string">&#x27;React diffing overhead on every update&#x27;</span>;
    <span class="hljs-attr">memoryGrowth</span>: <span class="hljs-string">&#x27;Unbounded data accumulation&#x27;</span>;
    <span class="hljs-attr">stateManagement</span>: <span class="hljs-string">&#x27;State updates triggering cascading renders&#x27;</span>;
    <span class="hljs-attr">networkBackpressure</span>: <span class="hljs-string">&#x27;Client cant process messages fast enough&#x27;</span>;
  };

  <span class="hljs-comment">// Key metrics</span>
  <span class="hljs-attr">metrics</span>: {
    <span class="hljs-attr">messagesPerSecond</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Incoming message rate</span>
    <span class="hljs-attr">updatesPerSecond</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// React update rate</span>
    <span class="hljs-attr">droppedFrames</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Frames below 60fps</span>
    <span class="hljs-attr">memoryUsage</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Heap size over time</span>
    <span class="hljs-attr">latency</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Message to render time</span>
  };

  <span class="hljs-comment">// Optimization strategies</span>
  <span class="hljs-attr">strategies</span>: {
    <span class="hljs-attr">throttling</span>: <span class="hljs-string">&#x27;Limit update frequency&#x27;</span>;
    <span class="hljs-attr">batching</span>: <span class="hljs-string">&#x27;Group multiple updates&#x27;</span>;
    <span class="hljs-attr">virtualization</span>: <span class="hljs-string">&#x27;Render only visible items&#x27;</span>;
    <span class="hljs-attr">webWorkers</span>: <span class="hljs-string">&#x27;Process data off main thread&#x27;</span>;
    <span class="hljs-attr">selective</span>: <span class="hljs-string">&#x27;Update only changed components&#x27;</span>;
  };
}

<span class="hljs-comment">// Performance impact by update frequency</span>
<span class="hljs-keyword">const</span> updateFrequencyImpact = {
  <span class="hljs-string">&#x27;1Hz&#x27;</span>: { <span class="hljs-attr">impact</span>: <span class="hljs-string">&#x27;Negligible&#x27;</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;Direct updates&#x27;</span> },
  <span class="hljs-string">&#x27;10Hz&#x27;</span>: { <span class="hljs-attr">impact</span>: <span class="hljs-string">&#x27;Low&#x27;</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;Basic throttling&#x27;</span> },
  <span class="hljs-string">&#x27;60Hz&#x27;</span>: { <span class="hljs-attr">impact</span>: <span class="hljs-string">&#x27;Medium&#x27;</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;Batching + throttling&#x27;</span> },
  <span class="hljs-string">&#x27;100Hz&#x27;</span>: { <span class="hljs-attr">impact</span>: <span class="hljs-string">&#x27;High&#x27;</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;Web Workers + virtualization&#x27;</span> },
  <span class="hljs-string">&#x27;1000Hz&#x27;</span>: { <span class="hljs-attr">impact</span>: <span class="hljs-string">&#x27;Extreme&#x27;</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;Sampling + aggregation&#x27;</span> },
};
</code></pre>
<h2 id="إدارة-اتصالات-websocket">إدارة اتصالات WebSocket</h2>
<p>إعداد فعّال لـ WebSocket مع إعادة الاتصال والضغط العكسي (backpressure):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Advanced WebSocket manager</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">WebSocketManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">ws</span>: <span class="hljs-title class_">WebSocket</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">messageQueue</span>: <span class="hljs-built_in">any</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">subscribers</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-title class_">MessageHandler</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> reconnectAttempts = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> maxReconnectAttempts = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">private</span> reconnectDelay = <span class="hljs-number">1000</span>;
  <span class="hljs-keyword">private</span> isConnected = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> stats = {
    <span class="hljs-attr">messagesReceived</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">messagesSent</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">bytesReceived</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">bytesSent</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">connectTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">disconnects</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">url</span> = url;
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">connect</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">connect</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">url</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupEventHandlers</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;WebSocket connection failed:&#x27;</span>, error);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scheduleReconnect</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupEventHandlers</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>.<span class="hljs-property">onopen</span> = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;WebSocket connected&#x27;</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">isConnected</span> = <span class="hljs-literal">true</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span> = <span class="hljs-number">0</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">connectTime</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

      <span class="hljs-comment">// Flush queued messages</span>
      <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">const</span> message = <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-title function_">shift</span>();
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">send</span>(message);
      }

      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;connection&#x27;</span>, { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;connected&#x27;</span> });
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">messagesReceived</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">bytesReceived</span> += event.<span class="hljs-property">data</span>.<span class="hljs-property">length</span>;

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">handleMessage</span>(data);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to parse WebSocket message:&#x27;</span>, error);
      }
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>.<span class="hljs-property">onerror</span> = <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;WebSocket error:&#x27;</span>, error);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;error&#x27;</span>, error);
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>.<span class="hljs-property">onclose</span> = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;WebSocket disconnected&#x27;</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">isConnected</span> = <span class="hljs-literal">false</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">disconnects</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;connection&#x27;</span>, { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;disconnected&#x27;</span> });
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scheduleReconnect</span>();
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">handleMessage</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, payload } = data;

    <span class="hljs-comment">// Handle system messages</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;ping&#x27;</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">send</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;pong&#x27;</span>, <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() });
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Emit to subscribers</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-keyword">type</span>, payload);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">emit</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event);
    <span class="hljs-keyword">if</span> (handlers) {
      handlers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">handler</span>) =&gt;</span> {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">handler</span>(data);
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error in WebSocket handler for <span class="hljs-subst">\${event}</span>:\`</span>, error);
        }
      });
    }

    <span class="hljs-comment">// Also emit wildcard</span>
    <span class="hljs-keyword">const</span> wildcardHandlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>);
    <span class="hljs-keyword">if</span> (wildcardHandlers) {
      wildcardHandlers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">handler</span>) =&gt;</span> <span class="hljs-title function_">handler</span>({ <span class="hljs-attr">type</span>: event, data }));
    }
  }

  <span class="hljs-title function_">subscribe</span>(<span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">handler</span>: <span class="hljs-title class_">MessageHandler</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">has</span>(event)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">set</span>(event, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event)!.<span class="hljs-title function_">add</span>(handler);

    <span class="hljs-comment">// Return unsubscribe function</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event);
      <span class="hljs-keyword">if</span> (handlers) {
        handlers.<span class="hljs-title function_">delete</span>(handler);
        <span class="hljs-keyword">if</span> (handlers.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">delete</span>(event);
        }
      }
    };
  }

  <span class="hljs-title function_">send</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> message = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data);

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">isConnected</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>?.<span class="hljs-property">readyState</span> === <span class="hljs-title class_">WebSocket</span>.<span class="hljs-property">OPEN</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>.<span class="hljs-title function_">send</span>(message);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">messagesSent</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">bytesSent</span> += message.<span class="hljs-property">length</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Queue message for later</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-title function_">push</span>(data);

      <span class="hljs-comment">// Limit queue size to prevent memory issues</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1000</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-title function_">shift</span>(); <span class="hljs-comment">// Drop oldest message</span>
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;WebSocket message queue overflow&#x27;</span>);
      }
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">scheduleReconnect</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxReconnectAttempts</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Max reconnection attempts reached&#x27;</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Connection failed&#x27;</span>));
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> delay = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectDelay</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">2</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span>), <span class="hljs-number">30000</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span>++;

    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Reconnecting... (attempt <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.reconnectAttempts}</span>)\`</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">connect</span>();
    }, delay);
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>,
      <span class="hljs-attr">queueSize</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-property">length</span>,
      <span class="hljs-attr">isConnected</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">isConnected</span>,
      <span class="hljs-attr">uptime</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">isConnected</span> ? <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">connectTime</span> : <span class="hljs-number">0</span>,
    };
  }

  <span class="hljs-title function_">close</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span>?.<span class="hljs-title function_">close</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ws</span> = <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-comment">// React hook for WebSocket</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useWebSocket</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> [manager] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocketManager</span>(url));
  <span class="hljs-keyword">const</span> [isConnected, setIsConnected] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [stats, setStats] = <span class="hljs-title function_">useState</span>(manager.<span class="hljs-title function_">getStats</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> unsubscribe = manager.<span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;connection&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">{ status }</span>) =&gt;</span> {
      <span class="hljs-title function_">setIsConnected</span>(status === <span class="hljs-string">&#x27;connected&#x27;</span>);
    });

    <span class="hljs-comment">// Update stats periodically</span>
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setStats</span>(manager.<span class="hljs-title function_">getStats</span>());
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">unsubscribe</span>();
      <span class="hljs-built_in">clearInterval</span>(interval);
      manager.<span class="hljs-title function_">close</span>();
    };
  }, [manager]);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">subscribe</span>: manager.<span class="hljs-property">subscribe</span>.<span class="hljs-title function_">bind</span>(manager),
    <span class="hljs-attr">send</span>: manager.<span class="hljs-property">send</span>.<span class="hljs-title function_">bind</span>(manager),
    isConnected,
    stats,
  };
}
</code></pre>
<h2 id="تقييد-التحديثات-وتجميعها">تقييد التحديثات وتجميعها</h2>
<p>تحكّم في وتيرة التحديثات للحفاظ على الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Advanced throttling and batching</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">UpdateBatcher</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">batch</span>: T[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">timer</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> lastFlush = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">callback</span>: (batch: T[]) =&gt; <span class="hljs-built_in">void</span>,
    <span class="hljs-keyword">private</span> <span class="hljs-attr">options</span>: {
      maxBatchSize: <span class="hljs-built_in">number</span>;
      maxWaitTime: <span class="hljs-built_in">number</span>;
      throttleMs: <span class="hljs-built_in">number</span>;
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
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
      }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">maxWaitTime</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">flush</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Enforce throttling</span>
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> timeSinceLastFlush = now - <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFlush</span>;

    <span class="hljs-keyword">if</span> (timeSinceLastFlush &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">throttleMs</span>) {
      <span class="hljs-comment">// Reschedule flush</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
      }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">throttleMs</span> - timeSinceLastFlush);

      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Process batch</span>
    <span class="hljs-keyword">const</span> batchToProcess = <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFlush</span> = now;

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">callback</span>(batchToProcess);
  }

  <span class="hljs-title function_">destroy</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">batch</span> = [];
  }
}

<span class="hljs-comment">// React hook for batched updates</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useBatchedUpdates&lt;T&gt;(
  <span class="hljs-attr">processor</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">batch</span>: T[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>,
  options = {
    <span class="hljs-attr">maxBatchSize</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">maxWaitTime</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">throttleMs</span>: <span class="hljs-number">16</span>, <span class="hljs-comment">// One frame</span>
  },
) {
  <span class="hljs-keyword">const</span> batcherRef = useRef&lt;<span class="hljs-title class_">UpdateBatcher</span>&lt;T&gt; | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    batcherRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateBatcher</span>(processor, options);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      batcherRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">destroy</span>();
    };
  }, [processor, options]);

  <span class="hljs-keyword">const</span> add = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> {
    batcherRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">add</span>(item);
  }, []);

  <span class="hljs-keyword">return</span> { add };
}

<span class="hljs-comment">// Throttled state updates</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useThrottledState&lt;T&gt;(
  <span class="hljs-attr">initialValue</span>: T,
  throttleMs = <span class="hljs-number">100</span>,
): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>, T] {
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(initialValue);
  <span class="hljs-keyword">const</span> [displayValue, setDisplayValue] = <span class="hljs-title function_">useState</span>(initialValue);
  <span class="hljs-keyword">const</span> lastUpdateRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> pendingValueRef = useRef&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> timerRef = useRef&lt;<span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> throttledSetValue = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">newValue</span>: T</span>) =&gt;</span> {
      <span class="hljs-title function_">setValue</span>(newValue);
      pendingValueRef.<span class="hljs-property">current</span> = newValue;

      <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
      <span class="hljs-keyword">const</span> timeSinceLastUpdate = now - lastUpdateRef.<span class="hljs-property">current</span>;

      <span class="hljs-keyword">if</span> (timeSinceLastUpdate &gt;= throttleMs) {
        <span class="hljs-comment">// Update immediately</span>
        <span class="hljs-title function_">setDisplayValue</span>(newValue);
        lastUpdateRef.<span class="hljs-property">current</span> = now;
        pendingValueRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// Schedule update</span>
        <span class="hljs-keyword">if</span> (timerRef.<span class="hljs-property">current</span>) <span class="hljs-built_in">clearTimeout</span>(timerRef.<span class="hljs-property">current</span>);

        timerRef.<span class="hljs-property">current</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
          <span class="hljs-keyword">if</span> (pendingValueRef.<span class="hljs-property">current</span> !== <span class="hljs-literal">null</span>) {
            <span class="hljs-title function_">setDisplayValue</span>(pendingValueRef.<span class="hljs-property">current</span>);
            lastUpdateRef.<span class="hljs-property">current</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
            pendingValueRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
          }
        }, throttleMs - timeSinceLastUpdate);
      }
    },
    [throttleMs],
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (timerRef.<span class="hljs-property">current</span>) <span class="hljs-built_in">clearTimeout</span>(timerRef.<span class="hljs-property">current</span>);
    };
  }, []);

  <span class="hljs-keyword">return</span> [displayValue, throttledSetValue, value];
}
</code></pre>
<h2 id="المحاكاة-الافتراضية-لمجموعات-البيانات-الكبيرة">المحاكاة الافتراضية لمجموعات البيانات الكبيرة</h2>
<p>تعامل مع القوائم الزمنية الحقيقية الكبيرة بكفاءة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Virtual list for real-time data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">RealTimeVirtualList</span>&lt;T&gt;({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = <span class="hljs-number">3</span>,
}: {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">itemHeight</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T, <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">overscan</span>?: <span class="hljs-built_in">number</span>;
}) {
  <span class="hljs-keyword">const</span> [scrollTop, setScrollTop] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> scrollRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Calculate visible range</span>
  <span class="hljs-keyword">const</span> startIndex = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(scrollTop / itemHeight) - overscan);
  <span class="hljs-keyword">const</span> endIndex = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(
    items.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>,
    <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>((scrollTop + height) / itemHeight) + overscan,
  );

  <span class="hljs-keyword">const</span> visibleItems = items.<span class="hljs-title function_">slice</span>(startIndex, endIndex + <span class="hljs-number">1</span>);

  <span class="hljs-keyword">const</span> handleScroll = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">UIEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-title function_">setScrollTop</span>(e.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">scrollTop</span>);
  }, []);

  <span class="hljs-comment">// Auto-scroll to bottom for new messages</span>
  <span class="hljs-keyword">const</span> [autoScroll, setAutoScroll] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> prevItemsLength = <span class="hljs-title function_">useRef</span>(items.<span class="hljs-property">length</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (autoScroll &amp;&amp; items.<span class="hljs-property">length</span> &gt; prevItemsLength.<span class="hljs-property">current</span>) {
      scrollRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">scrollTo</span>({
        <span class="hljs-attr">top</span>: items.<span class="hljs-property">length</span> * itemHeight,
        <span class="hljs-attr">behavior</span>: <span class="hljs-string">&#x27;smooth&#x27;</span>,
      });
    }
    prevItemsLength.<span class="hljs-property">current</span> = items.<span class="hljs-property">length</span>;
  }, [items.<span class="hljs-property">length</span>, autoScroll, itemHeight]);

  <span class="hljs-keyword">const</span> handleUserScroll = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!scrollRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { scrollTop, scrollHeight, clientHeight } = scrollRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">const</span> isAtBottom = scrollHeight - scrollTop - clientHeight &lt; <span class="hljs-number">10</span>;

    <span class="hljs-title function_">setAutoScroll</span>(isAtBottom);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{scrollRef}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">height</span>, <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">auto</span>&#x27; }}
      <span class="hljs-attr">onScroll</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
        handleScroll(e);
        handleUserScroll();
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">height:</span> <span class="hljs-attr">items.length</span> * <span class="hljs-attr">itemHeight</span>, <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">relative</span>&#x27; }}&gt;</span>
        {visibleItems.map((item, i) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{startIndex</span> + <span class="hljs-attr">i</span>}
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">absolute</span>&#x27;,
              <span class="hljs-attr">top:</span> (<span class="hljs-attr">startIndex</span> + <span class="hljs-attr">i</span>) * <span class="hljs-attr">itemHeight</span>,
              <span class="hljs-attr">left:</span> <span class="hljs-attr">0</span>,
              <span class="hljs-attr">right:</span> <span class="hljs-attr">0</span>,
              <span class="hljs-attr">height:</span> <span class="hljs-attr">itemHeight</span>,
            }}
          &gt;</span>
            {renderItem(item, startIndex + i)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تحديثات-المكونات-الانتقائية">تحديثات المكوّنات الانتقائية</h2>
<p>حدّث ما تغيّر فقط:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Selective update system</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">SelectiveUpdateManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">subscriptions</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">update</span>(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> oldValue = <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-title function_">get</span>(path);

    <span class="hljs-keyword">if</span> (oldValue === value) <span class="hljs-keyword">return</span>; <span class="hljs-comment">// No change</span>

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-title function_">set</span>(path, value);

    <span class="hljs-comment">// Notify only subscribers to this path</span>
    <span class="hljs-keyword">const</span> subscribers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">get</span>(path);
    <span class="hljs-keyword">if</span> (subscribers) {
      subscribers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> <span class="hljs-title function_">callback</span>());
    }

    <span class="hljs-comment">// Notify wildcard subscribers</span>
    <span class="hljs-keyword">const</span> wildcardPath = path.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;.&#x27;</span>).<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, -<span class="hljs-number">1</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;.&#x27;</span>) + <span class="hljs-string">&#x27;.*&#x27;</span>;
    <span class="hljs-keyword">const</span> wildcardSubscribers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">get</span>(wildcardPath);
    <span class="hljs-keyword">if</span> (wildcardSubscribers) {
      wildcardSubscribers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> <span class="hljs-title function_">callback</span>());
    }
  }

  <span class="hljs-title function_">subscribe</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">callback</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">has</span>(path)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">set</span>(path, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">get</span>(path)!.<span class="hljs-title function_">add</span>(callback);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> subs = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">get</span>(path);
      <span class="hljs-keyword">if</span> (subs) {
        subs.<span class="hljs-title function_">delete</span>(callback);
        <span class="hljs-keyword">if</span> (subs.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscriptions</span>.<span class="hljs-title function_">delete</span>(path);
        }
      }
    };
  }

  <span class="hljs-title function_">get</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-title function_">get</span>(path);
  }
}

<span class="hljs-comment">// React hook for selective updates</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useSelectiveUpdate&lt;T&gt;(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">initialValue</span>: T): T {
  <span class="hljs-keyword">const</span> manager = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">SelectiveUpdateManager</span>());
  <span class="hljs-keyword">const</span> [value, setValue] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> manager.<span class="hljs-property">current</span>.<span class="hljs-title function_">get</span>(path) ?? initialValue);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> manager.<span class="hljs-property">current</span>.<span class="hljs-title function_">subscribe</span>(path, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setValue</span>(manager.<span class="hljs-property">current</span>.<span class="hljs-title function_">get</span>(path));
    });
  }, [path]);

  <span class="hljs-keyword">return</span> value;
}

<span class="hljs-comment">// Memoized real-time component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RealTimeDataRow</span> = <span class="hljs-title function_">memo</span>(
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">RealTimeDataRow</span>(<span class="hljs-params">{ data, fields }: { data: <span class="hljs-built_in">any</span>; fields: <span class="hljs-built_in">string</span>[] }</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-row&quot;</span>&gt;</span>
        {fields.map((field) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">RealTimeCell</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{field}</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">data.id</span>}<span class="hljs-attr">.</span>\${<span class="hljs-attr">field</span>}\`} /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Custom comparison - only re-render if specified fields change</span>
    <span class="hljs-keyword">return</span> prevProps.<span class="hljs-property">fields</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> prevProps.<span class="hljs-property">data</span>[field] === nextProps.<span class="hljs-property">data</span>[field]);
  },
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RealTimeCell</span>(<span class="hljs-params">{ path }: { path: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useSelectiveUpdate</span>(path, <span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-cell&quot;</span>&gt;</span>{value}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أحداث-الخادم-المرسلة-sse">أحداث الخادم المرسلة (SSE)</h2>
<p>بديل عن WebSockets للبثّ أحادي الاتجاه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// SSE manager for real-time updates</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">SSEManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">eventSource</span>: <span class="hljs-title class_">EventSource</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">subscribers</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> reconnectAttempts = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">lastEventId</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">connect</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">connect</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">url</span>);

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">lastEventId</span>) {
      url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;lastEventId&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastEventId</span>);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">EventSource</span>(url.<span class="hljs-title function_">toString</span>());

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>.<span class="hljs-property">onopen</span> = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;SSE connected&#x27;</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span> = <span class="hljs-number">0</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;connected&#x27;</span>, <span class="hljs-literal">null</span>);
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>.<span class="hljs-property">onerror</span> = <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;SSE error:&#x27;</span>, error);

      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>?.<span class="hljs-property">readyState</span> === <span class="hljs-title class_">EventSource</span>.<span class="hljs-property">CLOSED</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reconnect</span>();
      }
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastEventId</span> = event.<span class="hljs-property">lastEventId</span>;

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;message&#x27;</span>, data);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to parse SSE message:&#x27;</span>, error);
      }
    };

    <span class="hljs-comment">// Custom event handlers</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;update&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;update&#x27;</span>, data);
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;delete&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;delete&#x27;</span>, data);
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">emit</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event);
    <span class="hljs-keyword">if</span> (handlers) {
      handlers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">handler</span>) =&gt;</span> {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">handler</span>(data);
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error in SSE handler for <span class="hljs-subst">\${event}</span>:\`</span>, error);
        }
      });
    }
  }

  <span class="hljs-title function_">subscribe</span>(<span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">has</span>(event)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">set</span>(event, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event)!.<span class="hljs-title function_">add</span>(handler);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(event);
      <span class="hljs-keyword">if</span> (handlers) {
        handlers.<span class="hljs-title function_">delete</span>(handler);
        <span class="hljs-keyword">if</span> (handlers.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">delete</span>(event);
        }
      }
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reconnect</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span> &gt;= <span class="hljs-number">5</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Max SSE reconnection attempts reached&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> delay = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">1000</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">2</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span>), <span class="hljs-number">30000</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">reconnectAttempts</span>++;

    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`SSE reconnecting... (attempt <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.reconnectAttempts}</span>)\`</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">connect</span>();
    }, delay);
  }

  <span class="hljs-title function_">close</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span>?.<span class="hljs-title function_">close</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">eventSource</span> = <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-comment">// React hook for SSE</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useSSE</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> [manager] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSEManager</span>(url));
  <span class="hljs-keyword">const</span> [isConnected, setIsConnected] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> unsubConnect = manager.<span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;connected&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setIsConnected</span>(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-keyword">const</span> unsubError = manager.<span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setIsConnected</span>(<span class="hljs-literal">false</span>);
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">unsubConnect</span>();
      <span class="hljs-title function_">unsubError</span>();
      manager.<span class="hljs-title function_">close</span>();
    };
  }, [manager]);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">subscribe</span>: manager.<span class="hljs-property">subscribe</span>.<span class="hljs-title function_">bind</span>(manager),
    isConnected,
  };
}
</code></pre>
<h2 id="المعالجة-بواسطة-web-worker">المعالجة بواسطة Web Worker</h2>
<p>عالج البيانات الزمنية الحقيقية خارج الخيط الرئيسي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// worker/realtime-processor.ts</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">Worker</span> = <span class="hljs-variable language_">self</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataPoint</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">RealTimeProcessor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">buffer</span>: <span class="hljs-title class_">DataPoint</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">aggregates</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">process</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffer</span>.<span class="hljs-title function_">push</span>(data);

    <span class="hljs-comment">// Keep buffer size limited</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buffer</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10000</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffer</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-comment">// Update aggregates</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateAggregates</span>(data);

    <span class="hljs-comment">// Send processed data back</span>
    ctx.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;processed&#x27;</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">latest</span>: data,
        <span class="hljs-attr">aggregates</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>),
        <span class="hljs-attr">bufferSize</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffer</span>.<span class="hljs-property">length</span>,
      },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateAggregates</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span></span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-variable language_">window</span> = <span class="hljs-number">60000</span>; <span class="hljs-comment">// 1 minute window</span>

    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> windowData = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffer</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> now - d.<span class="hljs-property">timestamp</span> &lt; <span class="hljs-variable language_">window</span>);

    <span class="hljs-keyword">const</span> values = windowData.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> d.<span class="hljs-property">value</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;count&#x27;</span>, windowData.<span class="hljs-property">length</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(
      <span class="hljs-string">&#x27;sum&#x27;</span>,
      values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>),
    );
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;avg&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;sum&#x27;</span>) / windowData.<span class="hljs-property">length</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;min&#x27;</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(...values));
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">aggregates</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;max&#x27;</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...values));
  }

  <span class="hljs-title function_">batch</span>(<span class="hljs-params"><span class="hljs-attr">dataPoints</span>: <span class="hljs-title class_">DataPoint</span>[]</span>) {
    dataPoints.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">point</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">process</span>(point));
  }
}

<span class="hljs-keyword">const</span> processor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RealTimeProcessor</span>();

ctx.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;process&#x27;</span>:
      processor.<span class="hljs-title function_">process</span>(data);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;batch&#x27;</span>:
      processor.<span class="hljs-title function_">batch</span>(data);
      <span class="hljs-keyword">break</span>;
  }
});

<span class="hljs-comment">// React hook for worker processing</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useRealTimeWorker</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [aggregates, setAggregates] = useState&lt;<span class="hljs-built_in">any</span>&gt;({});

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    workerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;../workers/realtime-processor.ts&#x27;</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
    });

    workerRef.<span class="hljs-property">current</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;processed&#x27;</span>) {
        <span class="hljs-title function_">setAggregates</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">data</span>.<span class="hljs-property">aggregates</span>);
      }
    };

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">terminate</span>();
    };
  }, []);

  <span class="hljs-keyword">const</span> process = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span></span>) =&gt;</span> {
    workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;process&#x27;</span>, data });
  }, []);

  <span class="hljs-keyword">const</span> processBatch = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span>[]</span>) =&gt;</span> {
    workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;batch&#x27;</span>, data });
  }, []);

  <span class="hljs-keyword">return</span> { process, processBatch, aggregates };
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>تتبّع مقاييس الأداء في الزمن الحقيقي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Real-time performance monitor</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">RealTimePerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> metrics = {
    <span class="hljs-attr">messagesPerSecond</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">updatesPerSecond</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">droppedFrames</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">avgLatency</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">maxLatency</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">memoryUsage</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-keyword">private</span> <span class="hljs-attr">messageTimestamps</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">updateTimestamps</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> frameDrops = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> lastFrameTime = performance.<span class="hljs-title function_">now</span>();

  <span class="hljs-title function_">trackMessage</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageTimestamps</span>.<span class="hljs-title function_">push</span>(now);

    <span class="hljs-comment">// Keep only last second</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageTimestamps</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageTimestamps</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> now - t &lt; <span class="hljs-number">1000</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">messagesPerSecond</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageTimestamps</span>.<span class="hljs-property">length</span>;
  }

  <span class="hljs-title function_">trackUpdate</span>(<span class="hljs-params"><span class="hljs-attr">latency</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimestamps</span>.<span class="hljs-title function_">push</span>(now);

    <span class="hljs-comment">// Keep only last second</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimestamps</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimestamps</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> now - t &lt; <span class="hljs-number">1000</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">updatesPerSecond</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimestamps</span>.<span class="hljs-property">length</span>;

    <span class="hljs-comment">// Update latency metrics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">avgLatency</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">avgLatency</span> * <span class="hljs-number">0.9</span> + latency * <span class="hljs-number">0.1</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">maxLatency</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">maxLatency</span>, latency);
  }

  <span class="hljs-title function_">trackFrame</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> now = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> frameDuration = now - <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFrameTime</span>;

    <span class="hljs-keyword">if</span> (frameDuration &gt; <span class="hljs-number">16.67</span>) {
      <span class="hljs-comment">// Slower than 60fps</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameDrops</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">droppedFrames</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameDrops</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastFrameTime</span> = now;
  }

  <span class="hljs-title function_">trackMemory</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (performance.<span class="hljs-property">memory</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">memoryUsage</span> = performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
    }
  }

  <span class="hljs-title function_">getMetrics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">trackMemory</span>();
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> };
  }

  <span class="hljs-title function_">reset</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageTimestamps</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">updateTimestamps</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameDrops</span> = <span class="hljs-number">0</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">maxLatency</span> = <span class="hljs-number">0</span>;
  }
}

<span class="hljs-comment">// React component for monitoring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">RealTimeMonitor</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> monitor = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">RealTimePerformanceMonitor</span>());
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = <span class="hljs-title function_">useState</span>(monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">getMetrics</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setMetrics</span>(monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">getMetrics</span>());
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">const</span> frameInterval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">trackFrame</span>();
    }, <span class="hljs-number">16</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearInterval</span>(interval);
      <span class="hljs-built_in">clearInterval</span>(frameInterval);
    };
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;realtime-monitor&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Messages/sec: {metrics.messagesPerSecond}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Updates/sec: {metrics.updatesPerSecond}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Dropped frames: {metrics.droppedFrames}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Avg latency: {metrics.avgLatency.toFixed(2)}ms<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Max latency: {metrics.maxLatency.toFixed(2)}ms<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RealTimeBestPractices</span> {
  <span class="hljs-comment">// Connection management</span>
  <span class="hljs-attr">connection</span>: {
    <span class="hljs-attr">autoReconnect</span>: <span class="hljs-string">&#x27;Implement automatic reconnection with backoff&#x27;</span>;
    <span class="hljs-attr">heartbeat</span>: <span class="hljs-string">&#x27;Send periodic heartbeats to detect disconnections&#x27;</span>;
    <span class="hljs-attr">queueMessages</span>: <span class="hljs-string">&#x27;Queue messages during disconnection&#x27;</span>;
    <span class="hljs-attr">compression</span>: <span class="hljs-string">&#x27;Enable compression for large payloads&#x27;</span>;
  };

  <span class="hljs-comment">// Update optimization</span>
  <span class="hljs-attr">updates</span>: {
    <span class="hljs-attr">throttleUpdates</span>: <span class="hljs-string">&#x27;Limit update frequency to 60fps max&#x27;</span>;
    <span class="hljs-attr">batchUpdates</span>: <span class="hljs-string">&#x27;Group multiple updates together&#x27;</span>;
    <span class="hljs-attr">selectiveUpdates</span>: <span class="hljs-string">&#x27;Update only changed components&#x27;</span>;
    <span class="hljs-attr">virtualizeList</span>: <span class="hljs-string">&#x27;Use virtualization for large lists&#x27;</span>;
  };

  <span class="hljs-comment">// Memory management</span>
  <span class="hljs-attr">memory</span>: {
    <span class="hljs-attr">limitBuffer</span>: <span class="hljs-string">&#x27;Cap message buffer size&#x27;</span>;
    <span class="hljs-attr">clearOldData</span>: <span class="hljs-string">&#x27;Remove data outside viewport&#x27;</span>;
    <span class="hljs-attr">unsubscribe</span>: <span class="hljs-string">&#x27;Clean up subscriptions on unmount&#x27;</span>;
    <span class="hljs-attr">monitorGrowth</span>: <span class="hljs-string">&#x27;Track memory usage over time&#x27;</span>;
  };

  <span class="hljs-comment">// Performance</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">useWorkers</span>: <span class="hljs-string">&#x27;Process data in Web Workers&#x27;</span>;
    <span class="hljs-attr">debounceRenders</span>: <span class="hljs-string">&#x27;Debounce rapid state changes&#x27;</span>;
    <span class="hljs-attr">memoComponents</span>: <span class="hljs-string">&#x27;Memoize expensive components&#x27;</span>;
    <span class="hljs-attr">profileRegularly</span>: <span class="hljs-string">&#x27;Monitor performance metrics&#x27;</span>;
  };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
