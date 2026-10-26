const s="kinney",a="react-typescript",n="React مع TypeScript",l="realtime-typing-websockets-and-sse",p="التحويل في الزمن الحقيقي عبر WebSocket وSSE",t=[{depth:2,id:"مخططات-الرسائل-والنسخ",text:"مخططات الرسائل والنسخ"},{depth:2,id:"عميل-websocket-مع-التحقق",text:"عميل WebSocket مع التحقق"},{depth:2,id:"sse-والتراجع-التدريجي",text:"SSE والتراجع التدريجي"},{depth:2,id:"اشتراكات-trpc",text:"اشتراكات tRPC"},{depth:2,id:"خطاف-usewebsocket-برسائل-منوعة-النوع",text:"خُطّاف useWebSocket برسائل مُنوَّعة النوع"},{depth:2,id:"استراتيجية-تطور-المخطط",text:"استراتيجية تطوّر المخطط"},{depth:2,id:"انتقالات-react-19-للتحديثات-المتدفقة",text:"انتقالات React 19 للتحديثات المتدفقة"}],e=`<p>صمّم طبقة زمن حقيقي (real-time) تبقى آمنة الأنواع عبر إعادة الاتصال وتطوّر البروتوكول — تحقّق من صحة الرسائل عند الحافة (edge) وأبقِ حالة واجهة المستخدم متوقعة.</p>
<h2 id="مخططات-الرسائل-والنسخ">مخططات الرسائل والنسخ</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">MessageV1</span> = z.<span class="hljs-title function_">discriminatedUnion</span>(<span class="hljs-string">&#x27;type&#x27;</span>, [
  z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;welcome&#x27;</span>), <span class="hljs-attr">session</span>: z.<span class="hljs-title function_">string</span>() }),
  z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;update&#x27;</span>), <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(), <span class="hljs-attr">value</span>: z.<span class="hljs-title function_">number</span>() }),
]);

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Message</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">MessageV1</span>&gt;;
</code></pre>
<h2 id="عميل-websocket-مع-التحقق">عميل WebSocket مع التحقق</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(<span class="hljs-string">&#x27;wss://example.com&#x27;</span>);
ws.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(e.<span class="hljs-property">data</span>);
  <span class="hljs-keyword">const</span> msg = <span class="hljs-title class_">MessageV1</span>.<span class="hljs-title function_">parse</span>(data);
  <span class="hljs-comment">// Route by msg.type with exhaustiveness</span>
};
</code></pre>
<h2 id="sse-والتراجع-التدريجي">SSE والتراجع التدريجي</h2>
<ul>
<li>استخدم EventSource للتدفقات خفيفة الحِمل.</li>
<li>أعِد الاتصال بتراجعٍ تدريجي أسّي (exponential backoff) مع تغيير عشوائي (jitter).</li>
<li>اخزّن التحديثات مؤقتًا لانتقالات React.</li>
</ul>
<h2 id="اشتراكات-trpc">اشتراكات tRPC</h2>
<p>استفد من دعم tRPC للاشتراكات لتبقى الأنواع متّصلة من الطرف إلى الطرف (end-to-end) أثناء دفع التحديثات عبر WS.</p>
<h2 id="خطاف-usewebsocket-برسائل-منوعة-النوع">خُطّاف <code>useWebSocket</code> برسائل مُنوَّعة النوع</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">OnMessage</span>&lt;M&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">msg</span>: M</span>) =&gt;</span> <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">function</span> useWebSocket&lt;M <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>&gt;(
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;M&gt;,
  <span class="hljs-attr">onMessage</span>: <span class="hljs-title class_">OnMessage</span>&lt;M&gt;,
) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> stop = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">let</span> retry = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> <span class="hljs-attr">ws</span>: <span class="hljs-title class_">WebSocket</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">connect</span> = (<span class="hljs-params"></span>) =&gt; {
      ws = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(url);
      ws.<span class="hljs-property">onopen</span> = <span class="hljs-function">() =&gt;</span> (retry = <span class="hljs-number">0</span>);
      ws.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(e.<span class="hljs-property">data</span>);
        <span class="hljs-keyword">const</span> parsed = schema.<span class="hljs-title function_">safeParse</span>(data);
        <span class="hljs-keyword">if</span> (parsed.<span class="hljs-property">success</span>) <span class="hljs-title function_">onMessage</span>(parsed.<span class="hljs-property">data</span>);
      };
      ws.<span class="hljs-property">onclose</span> = <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">if</span> (stop) <span class="hljs-keyword">return</span>;
        retry++;
        <span class="hljs-keyword">const</span> delay = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">30_000</span>, <span class="hljs-number">500</span> * <span class="hljs-number">2</span> ** retry) + <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">250</span>;
        <span class="hljs-built_in">setTimeout</span>(connect, delay);
      };
    };
    <span class="hljs-title function_">connect</span>();
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      stop = <span class="hljs-literal">true</span>;
      ws?.<span class="hljs-title function_">close</span>();
    };
  }, [url, schema, onMessage]);
}
</code></pre>
<h2 id="استراتيجية-تطور-المخطط">استراتيجية تطوّر المخطط</h2>
<ul>
<li>أبقِ الصيغ القديمة في الاتحاد وعامِلها برفق؛ وقدّم الحقول الجديدة كاختيارية.</li>
<li>أضف حقل <code>version</code> وتفرّع بحسب الإصدار عند التغييرات الكاسرة.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">MessageV2</span> = z.<span class="hljs-title function_">discriminatedUnion</span>(<span class="hljs-string">&#x27;type&#x27;</span>, [
  ...<span class="hljs-title class_">MessageV1</span>.<span class="hljs-property">options</span>,
  z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;goodbye&#x27;</span>), <span class="hljs-attr">reason</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>() }),
]);
</code></pre>
<h2 id="انتقالات-react-19-للتحديثات-المتدفقة">انتقالات React 19 للتحديثات المتدفقة</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">LiveView</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">any</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-title function_">useWebSocket</span>(<span class="hljs-string">&#x27;wss://example&#x27;</span>, <span class="hljs-title class_">MessageV1</span>, <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (msg.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;update&#x27;</span>) <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, msg]);
    });
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">pending</span>=<span class="hljs-string">{isPending}</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{items}</span> /&gt;</span></span>;
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
