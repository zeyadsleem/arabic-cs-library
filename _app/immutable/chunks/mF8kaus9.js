const s="kinney",a="react-typescript",n="React مع TypeScript",l="advanced-error-handling-patterns",p="أنماط متقدّمة للتعامل مع الأخطاء",t=[{depth:2,id:"فلسفة-التعامل-مع-الأخطاء",text:"فلسفة التعامل مع الأخطاء"},{depth:2,id:"نظام-أخطاء-محكم-الأنواع",text:"نظام أخطاء مُحكَم الأنواع"},{depth:2,id:"نمط-result-في-التعامل-مع-الأخطاء",text:"نمط Result في التعامل مع الأخطاء"},{depth:2,id:"عميل-api-واعي-بالأخطاء",text:"عميل API واعي بالأخطاء"},{depth:2,id:"خطاف-react-للتعامل-مع-الأخطاء",text:"خُطّاف React للتعامل مع الأخطاء"},{depth:2,id:"حد-أخطاء-متقدم",text:"حدّ أخطاء متقدّم"},{depth:2,id:"خطاف-للعمليات-غير-المتزامنة-مع-التعامل-مع-الأخطاء",text:"خُطّاف للعمليات غير المتزامنة مع التعامل مع الأخطاء"},{depth:2,id:"التعامل-مع-الأخطاء-على-مستوى-المكون",text:"التعامل مع الأخطاء على مستوى المكوّن"},{depth:2,id:"التعامل-مع-الأخطاء-على-مستوى-التطبيق",text:"التعامل مع الأخطاء على مستوى التطبيق"},{depth:2,id:"اختبار-التعامل-مع-الأخطاء",text:"اختبار التعامل مع الأخطاء"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"خلاصة-أفضل-الممارسات",text:"خلاصة أفضل الممارسات"}],r=`<p>التعامل مع الأخطاء هو المجال الذي تنهار فيه تطبيقات كثيرة بُنيت بـ React. يرى المستخدمون رسائل عامّة من نوع «حدث خطأ ما»، ويضيع المطوّرون معلومات أساسية عن التشخيص، ويصبح التعافي من الخطأ مستحيلًا. لكن مع TypeScript والأنماط السليمة، يمكننا بناء تطبيقات مرنة تتعامل مع الأخطاء بلياقة، وتقدّم تغذية راجعة ذات معنًى، وتتعافى تلقائيًا كلما أمكن ذلك.</p>
<h2 id="فلسفة-التعامل-مع-الأخطاء">فلسفة التعامل مع الأخطاء</h2>
<p>التعامل الجيّد مع الأخطاء يقوم على ثلاثة أمور:</p>
<ol>
<li><strong>الوقاية</strong> - التقاط الأخطاء قبل أن تقع</li>
<li><strong>التعافي</strong> - التعامل مع الأخطاء بلياقة عندما تقع</li>
<li><strong>الإبلاغ</strong> - تزويد المستخدمين والمطوّرين بمعلومات قابلة للتنفيذ</li>
</ol>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Poor error handling</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">getUser</span>(id);
  <span class="hljs-title function_">setUser</span>(user);
} <span class="hljs-keyword">catch</span> (error) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  <span class="hljs-title function_">setError</span>(<span class="hljs-string">&#x27;Something went wrong&#x27;</span>);
}

<span class="hljs-comment">// ✅ Good error handling</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">getUser</span>(id);
  <span class="hljs-title function_">setUser</span>(user);
} <span class="hljs-keyword">catch</span> (error) {
  <span class="hljs-keyword">const</span> errorInfo = <span class="hljs-title function_">categorizeError</span>(error);
  <span class="hljs-title function_">logError</span>(errorInfo, { <span class="hljs-attr">userId</span>: id, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;getUser&#x27;</span> });

  <span class="hljs-keyword">if</span> (errorInfo.<span class="hljs-property">isRetryable</span>) {
    <span class="hljs-title function_">scheduleRetry</span>(<span class="hljs-function">() =&gt;</span> api.<span class="hljs-title function_">getUser</span>(id));
  }

  <span class="hljs-title function_">setError</span>(errorInfo.<span class="hljs-property">userMessage</span>);
}
</code></pre>
<h2 id="نظام-أخطاء-محكم-الأنواع">نظام أخطاء مُحكَم الأنواع</h2>
<p>ابدأ بنظام أنواع أخطاء شامل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/errors.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">BaseError</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">correlationId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;critical&#x27;</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">NetworkError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseError</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;network&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">status</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">isTimeout</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">isRetryable</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseError</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;validation&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">rule</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">BusinessError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseError</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;business&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">domain</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SystemError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseError</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;system&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">component</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">isRecoverable</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppError</span> = <span class="hljs-title class_">NetworkError</span> | <span class="hljs-title class_">ValidationError</span> | <span class="hljs-title class_">BusinessError</span> | <span class="hljs-title class_">SystemError</span>;

<span class="hljs-comment">// Error factory functions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorFactory</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">network</span>(<span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>, isTimeout = <span class="hljs-literal">false</span>): <span class="hljs-title class_">NetworkError</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;network&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">\`NET_<span class="hljs-subst">\${status}</span>\`</span>,
      message,
      status,
      url,
      isTimeout,
      <span class="hljs-attr">isRetryable</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isRetryableStatus</span>(status),
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      <span class="hljs-attr">correlationId</span>: <span class="hljs-title function_">generateId</span>(),
      <span class="hljs-attr">severity</span>: status &gt;= <span class="hljs-number">500</span> ? <span class="hljs-string">&#x27;high&#x27;</span> : <span class="hljs-string">&#x27;medium&#x27;</span>,
    };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">validation</span>(<span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">rule</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">ValidationError</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;validation&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">\`VAL_<span class="hljs-subst">\${rule.toUpperCase()}</span>\`</span>,
      message,
      field,
      value,
      rule,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      <span class="hljs-attr">correlationId</span>: <span class="hljs-title function_">generateId</span>(),
      <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;low&#x27;</span>,
    };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">business</span>(<span class="hljs-attr">domain</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">code</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">BusinessError</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;business&#x27;</span>,
      <span class="hljs-attr">code</span>: code || <span class="hljs-string">\`BIZ_<span class="hljs-subst">\${domain.toUpperCase()}</span>_<span class="hljs-subst">\${action.toUpperCase()}</span>\`</span>,
      message,
      domain,
      action,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      <span class="hljs-attr">correlationId</span>: <span class="hljs-title function_">generateId</span>(),
      <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-title function_">isRetryableStatus</span>(<span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> status &gt;= <span class="hljs-number">500</span> || status === <span class="hljs-number">408</span> || status === <span class="hljs-number">429</span>;
  }
}
</code></pre>
<h2 id="نمط-result-في-التعامل-مع-الأخطاء">نمط Result في التعامل مع الأخطاء</h2>
<p>نفّذ نمط <code>Result</code> من أجل تعامل صريح مع الأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/result.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span>&lt;T, E = <span class="hljs-title class_">AppError</span>&gt; = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: E };

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Ok</span>&lt;T&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">data</span>: T</span>) {}

  <span class="hljs-keyword">static</span> <span class="hljs-keyword">of</span>&lt;T&gt;(<span class="hljs-attr">data</span>: T): <span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-built_in">never</span>&gt; {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, data };
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Err</span>&lt;E&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">error</span>: E</span>) {}

  <span class="hljs-keyword">static</span> <span class="hljs-keyword">of</span>&lt;E&gt;(<span class="hljs-attr">error</span>: E): <span class="hljs-title class_">Result</span>&lt;<span class="hljs-built_in">never</span>, E&gt; {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, error };
  }
}

<span class="hljs-comment">// Utility functions for Result handling</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Result</span> = {
  <span class="hljs-attr">ok</span>: &lt;T&gt;(<span class="hljs-attr">data</span>: T): <span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-built_in">never</span>&gt; =&gt; ({ <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, data }),

  <span class="hljs-attr">err</span>: &lt;E&gt;(<span class="hljs-attr">error</span>: E): <span class="hljs-title class_">Result</span>&lt;<span class="hljs-built_in">never</span>, E&gt; =&gt; ({ <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, error }),

  <span class="hljs-attr">from</span>: &lt;T&gt;(<span class="hljs-attr">promise</span>: <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">AppError</span>&gt;&gt; =&gt; {
    <span class="hljs-keyword">return</span> promise.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">ok</span>(data)).<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(error));
  },

  <span class="hljs-attr">map</span>: &lt;T, U, E&gt;(<span class="hljs-attr">result</span>: <span class="hljs-title class_">Result</span>&lt;T, E&gt;, <span class="hljs-attr">fn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T</span>) =&gt;</span> U): <span class="hljs-title class_">Result</span>&lt;U, E&gt; =&gt; {
    <span class="hljs-keyword">return</span> result.<span class="hljs-property">success</span> ? <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">ok</span>(<span class="hljs-title function_">fn</span>(result.<span class="hljs-property">data</span>)) : result;
  },

  <span class="hljs-attr">mapError</span>: &lt;T, E, F&gt;(<span class="hljs-attr">result</span>: <span class="hljs-title class_">Result</span>&lt;T, E&gt;, <span class="hljs-attr">fn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: E</span>) =&gt;</span> F): <span class="hljs-title class_">Result</span>&lt;T, F&gt; =&gt; {
    <span class="hljs-keyword">return</span> result.<span class="hljs-property">success</span> ? result : <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(<span class="hljs-title function_">fn</span>(result.<span class="hljs-property">error</span>));
  },

  <span class="hljs-attr">flatMap</span>: &lt;T, U, E&gt;(<span class="hljs-attr">result</span>: <span class="hljs-title class_">Result</span>&lt;T, E&gt;, <span class="hljs-attr">fn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T</span>) =&gt;</span> <span class="hljs-title class_">Result</span>&lt;U, E&gt;): <span class="hljs-title class_">Result</span>&lt;U, E&gt; =&gt; {
    <span class="hljs-keyword">return</span> result.<span class="hljs-property">success</span> ? <span class="hljs-title function_">fn</span>(result.<span class="hljs-property">data</span>) : result;
  },

  <span class="hljs-attr">match</span>: &lt;T, E, U&gt;(
    <span class="hljs-attr">result</span>: <span class="hljs-title class_">Result</span>&lt;T, E&gt;,
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T</span>) =&gt;</span> U,
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: E</span>) =&gt;</span> U,
  ): <span class="hljs-function"><span class="hljs-params">U</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> result.<span class="hljs-property">success</span> ? <span class="hljs-title function_">onSuccess</span>(result.<span class="hljs-property">data</span>) : <span class="hljs-title function_">onError</span>(result.<span class="hljs-property">error</span>);
  },
};
</code></pre>
<h2 id="عميل-api-واعي-بالأخطاء">عميل API واعي بالأخطاء</h2>
<p>ابنِ عميل API يتعامل مع الأخطاء بمنهجية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// api/client.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RequestConfig</span> {
  <span class="hljs-attr">retries</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retryDelay</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retryBackoff</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">signal</span>?: <span class="hljs-title class_">AbortSignal</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ApiClient</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">baseUrl</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">defaultConfig</span>: <span class="hljs-title class_">RequestConfig</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">baseUrl</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">config</span>: <span class="hljs-title class_">RequestConfig</span> = {}</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseUrl</span> = baseUrl;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">defaultConfig</span> = {
      <span class="hljs-attr">retries</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">10000</span>,
      <span class="hljs-attr">retryDelay</span>: <span class="hljs-number">1000</span>,
      <span class="hljs-attr">retryBackoff</span>: <span class="hljs-number">2</span>,
      ...config,
    };
  }

  <span class="hljs-keyword">async</span> request&lt;T&gt;(
    <span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">options</span>: <span class="hljs-title class_">RequestInit</span> &amp; <span class="hljs-title class_">RequestConfig</span> = {},
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">const</span> config = { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">defaultConfig</span>, ...options };
    <span class="hljs-keyword">const</span> url = <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.baseUrl}</span><span class="hljs-subst">\${endpoint}</span>\`</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">executeWithRetry</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> controller = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();
      <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> controller.<span class="hljs-title function_">abort</span>(), config.<span class="hljs-property">timeout</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
          ...options,
          <span class="hljs-attr">signal</span>: config.<span class="hljs-property">signal</span> || controller.<span class="hljs-property">signal</span>,
        });

        <span class="hljs-built_in">clearTimeout</span>(timeoutId);

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(
            <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(response.<span class="hljs-property">status</span>, url, <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extractErrorMessage</span>(response)),
          );
        }

        <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">ok</span>(data);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">clearTimeout</span>(timeoutId);

        <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">DOMException</span> &amp;&amp; error.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(<span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">408</span>, url, <span class="hljs-string">&#x27;Request timeout&#x27;</span>, <span class="hljs-literal">true</span>));
        }

        <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">TypeError</span> &amp;&amp; error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;fetch&#x27;</span>)) {
          <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(<span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">0</span>, url, <span class="hljs-string">&#x27;Network error - check your connection&#x27;</span>));
        }

        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(
          <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">0</span>, url, error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>),
        );
      }
    }, config);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> executeWithRetry&lt;T&gt;(
    <span class="hljs-attr">operation</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt;,
    <span class="hljs-attr">config</span>: <span class="hljs-title class_">RequestConfig</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">lastError</span>: <span class="hljs-title class_">NetworkError</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">let</span> delay = config.<span class="hljs-property">retryDelay</span>!;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attempt = <span class="hljs-number">0</span>; attempt &lt;= config.<span class="hljs-property">retries</span>!; attempt++) {
      <span class="hljs-keyword">if</span> (attempt &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, delay));
        delay *= config.<span class="hljs-property">retryBackoff</span>!;
      }

      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">operation</span>();

      <span class="hljs-keyword">if</span> (result.<span class="hljs-property">success</span>) {
        <span class="hljs-keyword">return</span> result;
      }

      lastError = result.<span class="hljs-property">error</span>;

      <span class="hljs-comment">// Don&#x27;t retry if error is not retryable</span>
      <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">error</span>.<span class="hljs-property">isRetryable</span>) {
        <span class="hljs-keyword">break</span>;
      }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">err</span>(lastError!);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">extractErrorMessage</span>(<span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-keyword">return</span> error.<span class="hljs-property">message</span> || error.<span class="hljs-property">error</span> || <span class="hljs-string">\`HTTP <span class="hljs-subst">\${response.status}</span>\`</span>;
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`HTTP <span class="hljs-subst">\${response.status}</span> <span class="hljs-subst">\${response.statusText}</span>\`</span>;
    }
  }

  <span class="hljs-comment">// Convenience methods</span>
  <span class="hljs-keyword">async</span> get&lt;T&gt;(<span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">config</span>?: <span class="hljs-title class_">RequestConfig</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">request</span>(endpoint, { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, ...config });
  }

  <span class="hljs-keyword">async</span> post&lt;T&gt;(
    <span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">data</span>?: <span class="hljs-built_in">any</span>,
    <span class="hljs-attr">config</span>?: <span class="hljs-title class_">RequestConfig</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">request</span>(endpoint, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: data ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data) : <span class="hljs-literal">undefined</span>,
      ...config,
    });
  }

  <span class="hljs-keyword">async</span> put&lt;T&gt;(
    <span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">data</span>?: <span class="hljs-built_in">any</span>,
    <span class="hljs-attr">config</span>?: <span class="hljs-title class_">RequestConfig</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">request</span>(endpoint, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: data ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data) : <span class="hljs-literal">undefined</span>,
      ...config,
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-keyword">delete</span>&lt;T&gt;(<span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">config</span>?: <span class="hljs-title class_">RequestConfig</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Result</span>&lt;T, <span class="hljs-title class_">NetworkError</span>&gt;&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">request</span>(endpoint, { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>, ...config });
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> api = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiClient</span>(<span class="hljs-string">&#x27;/api&#x27;</span>);
</code></pre>
<h2 id="خطاف-react-للتعامل-مع-الأخطاء">خُطّاف React للتعامل مع الأخطاء</h2>
<p>أنشئ خُطّافًا شاملًا للتعامل مع الأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useErrorHandler.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorHandlerOptions</span> {
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">enableRetry</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retryDelay</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">enableReporting</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorState</span> {
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">isRetrying</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">retryCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">canRetry</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useErrorHandler</span>(<span class="hljs-params"><span class="hljs-attr">options</span>: <span class="hljs-title class_">ErrorHandlerOptions</span> = {}</span>) {
  <span class="hljs-keyword">const</span> [errorState, setErrorState] = useState&lt;<span class="hljs-title class_">ErrorState</span>&gt;({
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">canRetry</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">const</span> {
    onError,
    enableRetry = <span class="hljs-literal">true</span>,
    maxRetries = <span class="hljs-number">3</span>,
    retryDelay = <span class="hljs-number">1000</span>,
    enableReporting = <span class="hljs-literal">true</span>,
  } = options;

  <span class="hljs-keyword">const</span> handleError = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span>, <span class="hljs-attr">retryAction</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;) =&gt; {
      <span class="hljs-comment">// Report error if enabled</span>
      <span class="hljs-keyword">if</span> (enableReporting) {
        <span class="hljs-title function_">reportError</span>(error);
      }

      <span class="hljs-comment">// Call custom error handler</span>
      onError?.(error);

      <span class="hljs-comment">// Determine if retry is possible</span>
      <span class="hljs-keyword">const</span> canRetry =
        enableRetry &amp;&amp;
        retryAction !== <span class="hljs-literal">undefined</span> &amp;&amp;
        <span class="hljs-title function_">isRetryableError</span>(error) &amp;&amp;
        errorState.<span class="hljs-property">retryCount</span> &lt; maxRetries;

      <span class="hljs-title function_">setErrorState</span>({
        error,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">retryCount</span>: errorState.<span class="hljs-property">retryCount</span>,
        canRetry,
      });
    },
    [onError, enableRetry, maxRetries, errorState.<span class="hljs-property">retryCount</span>, enableReporting],
  );

  <span class="hljs-keyword">const</span> retry = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">retryAction</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;) =&gt; {
      <span class="hljs-keyword">if</span> (!errorState.<span class="hljs-property">canRetry</span> || errorState.<span class="hljs-property">isRetrying</span>) <span class="hljs-keyword">return</span>;

      <span class="hljs-title function_">setErrorState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
        ...prev,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">true</span>,
      }));

      <span class="hljs-comment">// Wait before retrying</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, retryDelay));

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">retryAction</span>();

        <span class="hljs-comment">// Clear error on successful retry</span>
        <span class="hljs-title function_">setErrorState</span>({
          <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
          <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attr">canRetry</span>: <span class="hljs-literal">false</span>,
        });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-title function_">setErrorState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
          ...prev,
          <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">retryCount</span>: prev.<span class="hljs-property">retryCount</span> + <span class="hljs-number">1</span>,
          <span class="hljs-attr">canRetry</span>: prev.<span class="hljs-property">retryCount</span> + <span class="hljs-number">1</span> &lt; maxRetries &amp;&amp; <span class="hljs-title function_">isRetryableError</span>(error <span class="hljs-keyword">as</span> <span class="hljs-title class_">AppError</span>),
        }));
      }
    },
    [errorState.<span class="hljs-property">canRetry</span>, errorState.<span class="hljs-property">isRetrying</span>, retryDelay, maxRetries],
  );

  <span class="hljs-keyword">const</span> clearError = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setErrorState</span>({
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">canRetry</span>: <span class="hljs-literal">false</span>,
    });
  }, []);

  <span class="hljs-keyword">return</span> {
    ...errorState,
    handleError,
    retry,
    clearError,
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">isRetryableError</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">switch</span> (error.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;network&#x27;</span>:
      <span class="hljs-keyword">return</span> error.<span class="hljs-property">isRetryable</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;system&#x27;</span>:
      <span class="hljs-keyword">return</span> error.<span class="hljs-property">isRecoverable</span>;
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">reportError</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Send to error reporting service</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error reported:&#x27;</span>, {
    <span class="hljs-attr">code</span>: error.<span class="hljs-property">code</span>,
    <span class="hljs-attr">message</span>: error.<span class="hljs-property">message</span>,
    <span class="hljs-attr">type</span>: error.<span class="hljs-property">type</span>,
    <span class="hljs-attr">timestamp</span>: error.<span class="hljs-property">timestamp</span>,
    <span class="hljs-attr">correlationId</span>: error.<span class="hljs-property">correlationId</span>,
  });

  <span class="hljs-comment">// Could send to Sentry, LogRocket, etc.</span>
}
</code></pre>
<h2 id="حد-أخطاء-متقدم">حدّ أخطاء متقدّم</h2>
<p>أنشئ حدّ أخطاء متطوّرًا مع إمكانية التعافي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// components/ErrorBoundary.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorInfo</span> {
  <span class="hljs-attr">componentStack</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">errorBoundary</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryState</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">errorId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">retryCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">lastErrorTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-title class_">ErrorFallbackProps</span>&gt;;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span>, <span class="hljs-attr">errorId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">isolate</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">resetTimeWindow</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorFallbackProps</span> {
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>;
  <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span>;
  <span class="hljs-attr">retry</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">canRetry</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">retryCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">errorId</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">React.Component</span>&lt;<span class="hljs-title class_">ErrorBoundaryProps</span>, <span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">resetTimeoutId</span>: <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ErrorBoundaryProps</span></span>) {
    <span class="hljs-variable language_">super</span>(props);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = {
      <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">errorInfo</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">errorId</span>: <span class="hljs-string">&#x27;&#x27;</span>,
      <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">lastErrorTime</span>: <span class="hljs-number">0</span>
    };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> errorId = <span class="hljs-string">\`ERR_<span class="hljs-subst">\${now}</span>_<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substr(<span class="hljs-number">2</span>, <span class="hljs-number">9</span>)}</span>\`</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>,
      error,
      errorId,
      <span class="hljs-attr">lastErrorTime</span>: now
    };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-keyword">const</span> { onError } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;
    <span class="hljs-keyword">const</span> { errorId } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;

    <span class="hljs-comment">// Enhanced error info</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">enhancedErrorInfo</span>: <span class="hljs-title class_">ErrorInfo</span> = {
      <span class="hljs-attr">componentStack</span>: errorInfo.<span class="hljs-property">componentStack</span>,
      <span class="hljs-attr">errorBoundary</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">constructor</span>.<span class="hljs-property">name</span>
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">errorInfo</span>: enhancedErrorInfo });

    <span class="hljs-comment">// Report error</span>
    onError?.(error, enhancedErrorInfo, errorId);

    <span class="hljs-comment">// Log detailed error information</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">\`🚨 Error Boundary: <span class="hljs-subst">\${errorId}</span>\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error:&#x27;</span>, error);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error Info:&#x27;</span>, enhancedErrorInfo);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Props:&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();

    <span class="hljs-comment">// Set up automatic reset</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scheduleReset</span>();
  }

  <span class="hljs-keyword">private</span> scheduleReset = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> { resetTimeWindow = <span class="hljs-number">10000</span> } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">resetTimeoutId</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">resetTimeoutId</span>);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">resetTimeoutId</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
        <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">errorInfo</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">lastErrorTime</span>: <span class="hljs-number">0</span>
      }));
    }, resetTimeWindow);
  };

  <span class="hljs-keyword">private</span> handleRetry = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> { maxRetries = <span class="hljs-number">3</span>, resetTimeWindow = <span class="hljs-number">10000</span> } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

    <span class="hljs-comment">// Reset retry count if enough time has passed</span>
    <span class="hljs-keyword">const</span> timeSinceLastError = now - <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">lastErrorTime</span>;
    <span class="hljs-keyword">const</span> shouldResetCount = timeSinceLastError &gt; resetTimeWindow;

    <span class="hljs-keyword">const</span> newRetryCount = shouldResetCount ? <span class="hljs-number">0</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">retryCount</span> + <span class="hljs-number">1</span>;

    <span class="hljs-keyword">if</span> (newRetryCount &gt;= maxRetries) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Max retries (<span class="hljs-subst">\${maxRetries}</span>) exceeded for error boundary\`</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({
      <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">errorInfo</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">retryCount</span>: newRetryCount,
      <span class="hljs-attr">lastErrorTime</span>: shouldResetCount ? <span class="hljs-number">0</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">lastErrorTime</span>
    });
  };

  <span class="hljs-title function_">componentWillUnmount</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">resetTimeoutId</span>) {
      <span class="hljs-built_in">clearTimeout</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">resetTimeoutId</span>);
    }
  }

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> { hasError, error, errorInfo, errorId, retryCount } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;
    <span class="hljs-keyword">const</span> { children, <span class="hljs-attr">fallback</span>: <span class="hljs-title class_">FallbackComponent</span>, maxRetries = <span class="hljs-number">3</span>, isolate = <span class="hljs-literal">false</span> } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;

    <span class="hljs-keyword">if</span> (hasError &amp;&amp; error &amp;&amp; errorInfo) {
      <span class="hljs-keyword">const</span> canRetry = retryCount &lt; maxRetries;

      <span class="hljs-keyword">const</span> <span class="hljs-attr">fallbackProps</span>: <span class="hljs-title class_">ErrorFallbackProps</span> = {
        error,
        errorInfo,
        <span class="hljs-attr">retry</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">handleRetry</span>,
        canRetry,
        retryCount,
        errorId
      };

      <span class="hljs-keyword">if</span> (<span class="hljs-title class_">FallbackComponent</span>) {
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FallbackComponent</span> {<span class="hljs-attr">...fallbackProps</span>} /&gt;</span></span>;
      }

      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DefaultErrorFallback</span> {<span class="hljs-attr">...fallbackProps</span>} /&gt;</span></span>;
    }

    <span class="hljs-comment">// Isolate component tree if requested</span>
    <span class="hljs-keyword">if</span> (isolate) {
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-error-boundary</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }

    <span class="hljs-keyword">return</span> children;
  }
}

<span class="hljs-comment">// Default error fallback component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DefaultErrorFallback</span>(<span class="hljs-params">{
  error,
  retry,
  canRetry,
  retryCount,
  errorId
}: <span class="hljs-title class_">ErrorFallbackProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-boundary-fallback&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-content&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>🚨 Something went wrong<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-details&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>Error details<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">pre</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-message&quot;</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-id&quot;</span>&gt;</span>Error ID: {errorId}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          {retryCount &gt; 0 &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;retry-count&quot;</span>&gt;</span>Retry attempt: {retryCount}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-actions&quot;</span>&gt;</span>
          {canRetry &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
              <span class="hljs-attr">onClick</span>=<span class="hljs-string">{retry}</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;retry-button&quot;</span>
            &gt;</span>
              Try Again
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          )}

          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> window.location.reload()}
            className=&quot;reload-button&quot;
          &gt;
            Reload Page
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="خطاف-للعمليات-غير-المتزامنة-مع-التعامل-مع-الأخطاء">خُطّاف للعمليات غير المتزامنة مع التعامل مع الأخطاء</h2>
<p>أنشئ خُطّافًا للتعامل مع العمليات غير المتزامنة مع تغطية شاملة للأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useAsyncOperation.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AsyncState</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isSuccess</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isError</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AsyncOptions</span> {
  <span class="hljs-attr">immediate</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">retries</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retryDelay</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">onSuccess</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">throwOnError</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useAsyncOperation&lt;T, <span class="hljs-title class_">Args</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[] = []&gt;(
  <span class="hljs-attr">operation</span>: <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Args</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;,
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">AsyncOptions</span> = {},
) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AsyncState</span>&lt;T&gt;&gt;({
    <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">isSuccess</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">isError</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">const</span> {
    immediate = <span class="hljs-literal">false</span>,
    retries = <span class="hljs-number">0</span>,
    retryDelay = <span class="hljs-number">1000</span>,
    onSuccess,
    onError,
    throwOnError = <span class="hljs-literal">false</span>,
  } = options;

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Args</span>) =&gt; {
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
        ...prev,
        <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">isSuccess</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">isError</span>: <span class="hljs-literal">false</span>,
      }));

      <span class="hljs-keyword">let</span> <span class="hljs-attr">lastError</span>: <span class="hljs-title class_">AppError</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attempt = <span class="hljs-number">0</span>; attempt &lt;= retries; attempt++) {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">if</span> (attempt &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, retryDelay));
          }

          <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">operation</span>(...args);

          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">data</span>: result,
            <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">isSuccess</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">isError</span>: <span class="hljs-literal">false</span>,
          });

          onSuccess?.(result);
          <span class="hljs-keyword">return</span> result;
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-keyword">const</span> appError =
            error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>
              ? <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;operation&#x27;</span>, error.<span class="hljs-property">message</span>)
              : <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;operation&#x27;</span>, <span class="hljs-string">&#x27;Unknown error&#x27;</span>);

          lastError = appError;

          <span class="hljs-comment">// Don&#x27;t retry on final attempt</span>
          <span class="hljs-keyword">if</span> (attempt === retries) {
            <span class="hljs-title function_">setState</span>({
              <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
              <span class="hljs-attr">error</span>: appError,
              <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
              <span class="hljs-attr">isSuccess</span>: <span class="hljs-literal">false</span>,
              <span class="hljs-attr">isError</span>: <span class="hljs-literal">true</span>,
            });

            onError?.(appError);

            <span class="hljs-keyword">if</span> (throwOnError) {
              <span class="hljs-keyword">throw</span> appError;
            }
          }
        }
      }

      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    },
    [operation, retries, retryDelay, onSuccess, onError, throwOnError],
  );

  <span class="hljs-keyword">const</span> reset = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setState</span>({
      <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">isSuccess</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">isError</span>: <span class="hljs-literal">false</span>,
    });
  }, []);

  <span class="hljs-comment">// Execute immediately if requested</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (immediate) {
      <span class="hljs-title function_">execute</span>();
    }
  }, [immediate, execute]);

  <span class="hljs-keyword">return</span> {
    ...state,
    execute,
    reset,
  };
}
</code></pre>
<h2 id="التعامل-مع-الأخطاء-على-مستوى-المكون">التعامل مع الأخطاء على مستوى المكوّن</h2>
<p>ادمج التعامل مع الأخطاء داخل المكوّنات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// components/UserProfile.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: <span class="hljs-title class_">UserProfileProps</span></span>) {
  <span class="hljs-keyword">const</span> { error, handleError, retry, clearError, canRetry } = <span class="hljs-title function_">useErrorHandler</span>({
    <span class="hljs-attr">enableRetry</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">maxRetries</span>: <span class="hljs-number">3</span>
  });

  <span class="hljs-keyword">const</span> {
    <span class="hljs-attr">data</span>: user,
    isLoading,
    isError,
    <span class="hljs-attr">execute</span>: fetchUser
  } = <span class="hljs-title function_">useAsyncOperation</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>) =&gt; {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> api.<span class="hljs-property">get</span>&lt;<span class="hljs-title class_">User</span>&gt;(<span class="hljs-string">\`/users/<span class="hljs-subst">\${id}</span>\`</span>);

      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">match</span>(
        result,
        <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> data,
        <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
          <span class="hljs-title function_">handleError</span>(error, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(id));
          <span class="hljs-keyword">throw</span> error;
        }
      );
    },
    { <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span> }
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdateUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> api.<span class="hljs-property">put</span>&lt;<span class="hljs-title class_">User</span>&gt;(<span class="hljs-string">\`/users/<span class="hljs-subst">\${userId}</span>\`</span>, updates);

      <span class="hljs-title class_">Result</span>.<span class="hljs-title function_">match</span>(
        result,
        <span class="hljs-function">(<span class="hljs-params">updatedUser</span>) =&gt;</span> {
          <span class="hljs-comment">// Success handling</span>
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;User updated successfully&#x27;</span>);
          <span class="hljs-title function_">fetchUser</span>(userId); <span class="hljs-comment">// Refresh user data</span>
        },
        <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
          <span class="hljs-title function_">handleError</span>(error, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">handleUpdateUser</span>(updates));
        }
      );
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// This shouldn&#x27;t happen with Result pattern, but just in case</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Unexpected error:&#x27;</span>, error);
    }
  };

  <span class="hljs-comment">// Loading state</span>
  <span class="hljs-keyword">if</span> (isLoading &amp;&amp; !user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfileSkeleton</span> /&gt;</span></span>;
  }

  <span class="hljs-comment">// Error state with recovery options</span>
  <span class="hljs-keyword">if</span> (error) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorCard</span>
        <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span>
        <span class="hljs-attr">onRetry</span>=<span class="hljs-string">{canRetry</span> ? () =&gt;</span> retry(() =&gt; fetchUser(userId)) : undefined}
        onDismiss={clearError}
        title=&quot;Failed to load user profile&quot;
      /&gt;</span>
    );
  }

  <span class="hljs-comment">// No user found</span>
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">EmptyState</span>
        <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;👤&quot;</span>
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;User not found&quot;</span>
        <span class="hljs-attr">description</span>=<span class="hljs-string">&quot;The user you&#x27;re looking for doesn&#x27;t exist or has been deleted.&quot;</span>
      /&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-profile&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-header&quot;</span>&gt;</span>
        {user.avatar &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
            <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatar}</span>
            <span class="hljs-attr">alt</span>=<span class="hljs-string">{user.name}</span>
            <span class="hljs-attr">onError</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
              // Handle image load errors
              e.currentTarget.style.display = &#x27;none&#x27;;
            }}
          /&gt;
        )}
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfileForm</span>
        <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>
        <span class="hljs-attr">onUpdate</span>=<span class="hljs-string">{handleUpdateUser}</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Error card component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorCardProps</span> {
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span>;
  <span class="hljs-attr">onRetry</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onDismiss</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorCard</span>(<span class="hljs-params">{
  error,
  onRetry,
  onDismiss,
  title = <span class="hljs-string">&quot;An error occurred&quot;</span>
}: <span class="hljs-title class_">ErrorCardProps</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">getErrorIcon</span> = (<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>) =&gt; {
    <span class="hljs-keyword">switch</span> (error.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;network&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;🌐&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;validation&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;⚠️&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;business&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;🏢&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;system&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;⚙️&#x27;</span>;
      <span class="hljs-attr">default</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;❌&#x27;</span>;
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">getErrorColor</span> = (<span class="hljs-params"><span class="hljs-attr">severity</span>: <span class="hljs-title class_">AppError</span>[<span class="hljs-string">&#x27;severity&#x27;</span>]</span>) =&gt; {
    <span class="hljs-keyword">switch</span> (severity) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;low&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;text-yellow-600&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;medium&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;text-orange-600&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;high&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;text-red-600&#x27;</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;critical&#x27;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;text-red-800&#x27;</span>;
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">error-card</span> <span class="hljs-attr">border-l-4</span> <span class="hljs-attr">p-4</span> \${<span class="hljs-attr">getErrorColor</span>(<span class="hljs-attr">error.severity</span>)}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-start&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-2xl mr-3&quot;</span>&gt;</span>{getErrorIcon(error)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex-1&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-semibold text-lg&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-1 text-sm&quot;</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-2 text-xs opacity-75&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Error ID: {error.correlationId}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4&quot;</span>&gt;</span>Time: {error.timestamp.toLocaleString()}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-4 flex gap-2&quot;</span>&gt;</span>
            {onRetry &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onRetry}</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600&quot;</span>
              &gt;</span>
                Try Again
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            )}

            {onDismiss &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onDismiss}</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;px-3 py-1 border border-gray-300 rounded hover:bg-gray-50&quot;</span>
              &gt;</span>
                Dismiss
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="التعامل-مع-الأخطاء-على-مستوى-التطبيق">التعامل مع الأخطاء على مستوى التطبيق</h2>
<p>اضبط معالجة أخطاء على نطاق التطبيق كلّه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// contexts/ErrorContext.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorContextType</span> {
  <span class="hljs-attr">errors</span>: <span class="hljs-title class_">AppError</span>[];
  <span class="hljs-attr">addError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">removeError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">correlationId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">clearAllErrors</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ErrorContext</span> = createContext&lt;<span class="hljs-title class_">ErrorContextType</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorProvider</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">AppError</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> addError = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">AppError</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setErrors</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> {
      <span class="hljs-comment">// Prevent duplicate errors</span>
      <span class="hljs-keyword">if</span> (prev.<span class="hljs-title function_">some</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e.<span class="hljs-property">correlationId</span> === error.<span class="hljs-property">correlationId</span>)) {
        <span class="hljs-keyword">return</span> prev;
      }
      <span class="hljs-keyword">return</span> [...prev, error];
    });

    <span class="hljs-comment">// Auto-remove low severity errors</span>
    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">severity</span> === <span class="hljs-string">&#x27;low&#x27;</span>) {
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">removeError</span>(error.<span class="hljs-property">correlationId</span>);
      }, <span class="hljs-number">5000</span>);
    }
  }, []);

  <span class="hljs-keyword">const</span> removeError = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">correlationId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setErrors</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e.<span class="hljs-property">correlationId</span> !== correlationId));
  }, []);

  <span class="hljs-keyword">const</span> clearAllErrors = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setErrors</span>([]);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span>
      <span class="hljs-attr">errors</span>,
      <span class="hljs-attr">addError</span>,
      <span class="hljs-attr">removeError</span>,
      <span class="hljs-attr">clearAllErrors</span>
    }}&gt;</span>
      {children}
      <span class="hljs-tag">&lt;<span class="hljs-name">ErrorToastContainer</span> <span class="hljs-attr">errors</span>=<span class="hljs-string">{errors}</span> <span class="hljs-attr">onRemove</span>=<span class="hljs-string">{removeError}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorContext.Provider</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">useErrorContext</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">ErrorContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useErrorContext must be used within ErrorProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
};

<span class="hljs-comment">// Global error toast container</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorToastContainer</span>(<span class="hljs-params">{ errors, onRemove }: {
  errors: AppError[];
  onRemove: (correlationId: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fixed top-4 right-4 z-50 space-y-2&quot;</span>&gt;</span>
      {errors.map(error =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ErrorToast</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{error.correlationId}</span>
          <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span>
          <span class="hljs-attr">onDismiss</span>=<span class="hljs-string">{()</span> =&gt;</span> onRemove(error.correlationId)}
        /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorToast</span>(<span class="hljs-params">{ error, onDismiss }: {
  error: AppError;
  onDismiss: () =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Auto-dismiss after timeout based on severity</span>
    <span class="hljs-keyword">const</span> timeout = error.<span class="hljs-property">severity</span> === <span class="hljs-string">&#x27;critical&#x27;</span> ? <span class="hljs-number">15000</span> :
                   error.<span class="hljs-property">severity</span> === <span class="hljs-string">&#x27;high&#x27;</span> ? <span class="hljs-number">10000</span> :
                   error.<span class="hljs-property">severity</span> === <span class="hljs-string">&#x27;medium&#x27;</span> ? <span class="hljs-number">7000</span> : <span class="hljs-number">5000</span>;

    <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(onDismiss, timeout);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timeoutId);
  }, [error.<span class="hljs-property">severity</span>, onDismiss]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`
      <span class="hljs-attr">max-w-sm</span> <span class="hljs-attr">bg-white</span> <span class="hljs-attr">border-l-4</span> <span class="hljs-attr">rounded-lg</span> <span class="hljs-attr">shadow-lg</span> <span class="hljs-attr">p-4</span>
      \${<span class="hljs-attr">error.severity</span> === <span class="hljs-string">&#x27;critical&#x27;</span> ? &#x27;<span class="hljs-attr">border-red-600</span>&#x27; <span class="hljs-attr">:</span>
        <span class="hljs-attr">error.severity</span> === <span class="hljs-string">&#x27;high&#x27;</span> ? &#x27;<span class="hljs-attr">border-red-500</span>&#x27; <span class="hljs-attr">:</span>
        <span class="hljs-attr">error.severity</span> === <span class="hljs-string">&#x27;medium&#x27;</span> ? &#x27;<span class="hljs-attr">border-yellow-500</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">border-blue-500</span>&#x27;}
    \`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex justify-between items-start&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium text-sm&quot;</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xs text-gray-500 mt-1&quot;</span>&gt;</span>
            {error.timestamp.toLocaleTimeString()}
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onDismiss}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-2 text-gray-400 hover:text-gray-600&quot;</span>
        &gt;</span>
          ✕
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="اختبار-التعامل-مع-الأخطاء">اختبار التعامل مع الأخطاء</h2>
<p>اكتب اختبارات شاملة لحالات الأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// __tests__/errorHandling.test.tsx</span>
<span class="hljs-keyword">import</span> { render, screen, waitFor, fireEvent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ErrorProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../contexts/ErrorContext&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserProfile</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../components/UserProfile&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ErrorFactory</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../types/errors&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../api/client&#x27;</span>;

<span class="hljs-comment">// Mock the API</span>
jest.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;../api/client&#x27;</span>);
<span class="hljs-keyword">const</span> mockApi = api <span class="hljs-keyword">as</span> jest.<span class="hljs-property">Mocked</span>&lt;<span class="hljs-keyword">typeof</span> api&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">renderWithErrorProvider</span> = (<span class="hljs-params"><span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ReactElement</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorProvider</span>&gt;</span>
      {component}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorProvider</span>&gt;</span></span>
  );
};

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Error Handling&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    jest.<span class="hljs-title function_">clearAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should display error message when API call fails&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> networkError = <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">500</span>, <span class="hljs-string">&#x27;/users/123&#x27;</span>, <span class="hljs-string">&#x27;Internal Server Error&#x27;</span>);
    mockApi.<span class="hljs-property">get</span>.<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: networkError });

    <span class="hljs-title function_">renderWithErrorProvider</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span></span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Failed to load user profile&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Internal Server Error&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should retry failed requests&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> networkError = <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">500</span>, <span class="hljs-string">&#x27;/users/123&#x27;</span>, <span class="hljs-string">&#x27;Internal Server Error&#x27;</span>);
    mockApi.<span class="hljs-property">get</span>
      .<span class="hljs-title function_">mockResolvedValueOnce</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: networkError })
      .<span class="hljs-title function_">mockResolvedValueOnce</span>({
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span> }
      });

    <span class="hljs-title function_">renderWithErrorProvider</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span></span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Try Again&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });

    fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Try Again&#x27;</span>));

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;John&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });

    <span class="hljs-title function_">expect</span>(mockApi.<span class="hljs-property">get</span>).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should show different error styles based on severity&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> criticalError = <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">500</span>, <span class="hljs-string">&#x27;/users/123&#x27;</span>, <span class="hljs-string">&#x27;Critical Error&#x27;</span>);
    criticalError.<span class="hljs-property">severity</span> = <span class="hljs-string">&#x27;critical&#x27;</span>;

    mockApi.<span class="hljs-property">get</span>.<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: criticalError });

    <span class="hljs-title function_">renderWithErrorProvider</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span></span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> errorCard = screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Critical Error&#x27;</span>).<span class="hljs-title function_">closest</span>(<span class="hljs-string">&#x27;.error-card&#x27;</span>);
      <span class="hljs-title function_">expect</span>(errorCard).<span class="hljs-title function_">toHaveClass</span>(<span class="hljs-string">&#x27;text-red-800&#x27;</span>);
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle network timeouts gracefully&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> timeoutError = <span class="hljs-title class_">ErrorFactory</span>.<span class="hljs-title function_">network</span>(<span class="hljs-number">408</span>, <span class="hljs-string">&#x27;/users/123&#x27;</span>, <span class="hljs-string">&#x27;Request timeout&#x27;</span>, <span class="hljs-literal">true</span>);
    mockApi.<span class="hljs-property">get</span>.<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: timeoutError });

    <span class="hljs-title function_">renderWithErrorProvider</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span></span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Request timeout&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Try Again&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>(); <span class="hljs-comment">// Should be retryable</span>
    });
  });
});

<span class="hljs-comment">// Test error boundary</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Error Boundary&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">ThrowError</span> = (<span class="hljs-params">{ shouldThrow }: { shouldThrow: <span class="hljs-built_in">boolean</span> }</span>) =&gt; {
    <span class="hljs-keyword">if</span> (shouldThrow) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Test error&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No error<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  };

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should catch and display errors&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> onError = jest.<span class="hljs-title function_">fn</span>();

    <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">onError</span>=<span class="hljs-string">{onError}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ThrowError</span> <span class="hljs-attr">shouldThrow</span>=<span class="hljs-string">{true}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
    );

    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;🚨 Something went wrong&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Test error&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    <span class="hljs-title function_">expect</span>(onError).<span class="hljs-title function_">toHaveBeenCalledWith</span>(
      expect.<span class="hljs-title function_">objectContaining</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Test error&#x27;</span> }),
      expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Object</span>),
      expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">String</span>)
    );
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should allow retry after error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> { rerender } = <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ThrowError</span> <span class="hljs-attr">shouldThrow</span>=<span class="hljs-string">{true}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
    );

    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;🚨 Something went wrong&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Try Again&#x27;</span>));

    <span class="hljs-title function_">rerender</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ThrowError</span> <span class="hljs-attr">shouldThrow</span>=<span class="hljs-string">{false}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
    );

    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;No error&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>راقب معدّلات الأخطاء والأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/monitoring.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetric</span> {
  <span class="hljs-attr">operation</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">AppError</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetric</span>[] = [];
  <span class="hljs-keyword">private</span> errorCounts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;();

  recordOperation&lt;T&gt;(<span class="hljs-attr">operation</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> timestamp = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">fn</span>()
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordMetric</span>({
          operation,
          duration,
          <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
          timestamp,
        });
        <span class="hljs-keyword">return</span> result;
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;
        <span class="hljs-keyword">const</span> appError = error <span class="hljs-keyword">as</span> <span class="hljs-title class_">AppError</span>;

        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordMetric</span>({
          operation,
          duration,
          <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: appError,
          timestamp,
        });

        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">incrementErrorCount</span>(appError.<span class="hljs-property">code</span>);
        <span class="hljs-keyword">throw</span> error;
      });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">recordMetric</span>(<span class="hljs-params"><span class="hljs-attr">metric</span>: <span class="hljs-title class_">PerformanceMetric</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">push</span>(metric);

    <span class="hljs-comment">// Keep only last 1000 metrics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1000</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">1000</span>);
    }

    <span class="hljs-comment">// Send to analytics service</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendToAnalytics</span>(metric);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">incrementErrorCount</span>(<span class="hljs-params"><span class="hljs-attr">errorCode</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> count = <span class="hljs-variable language_">this</span>.<span class="hljs-property">errorCounts</span>.<span class="hljs-title function_">get</span>(errorCode) || <span class="hljs-number">0</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">errorCounts</span>.<span class="hljs-title function_">set</span>(errorCode, count + <span class="hljs-number">1</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendToAnalytics</span>(<span class="hljs-params"><span class="hljs-attr">metric</span>: <span class="hljs-title class_">PerformanceMetric</span></span>) {
    <span class="hljs-comment">// Send to your analytics service</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span> &amp;&amp; <span class="hljs-variable language_">window</span>.<span class="hljs-property">gtag</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;operation&#x27;</span>, {
        <span class="hljs-attr">event_category</span>: <span class="hljs-string">&#x27;performance&#x27;</span>,
        <span class="hljs-attr">event_label</span>: metric.<span class="hljs-property">operation</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(metric.<span class="hljs-property">duration</span>),
        <span class="hljs-attr">custom_map</span>: {
          <span class="hljs-attr">success</span>: metric.<span class="hljs-property">success</span>,
          <span class="hljs-attr">error_code</span>: metric.<span class="hljs-property">error</span>?.<span class="hljs-property">code</span>,
        },
      });
    }
  }

  <span class="hljs-title function_">getErrorStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> totalOperations = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> failedOperations = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> !m.<span class="hljs-property">success</span>).<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> errorRate = totalOperations &gt; <span class="hljs-number">0</span> ? (failedOperations / totalOperations) * <span class="hljs-number">100</span> : <span class="hljs-number">0</span>;

    <span class="hljs-keyword">return</span> {
      totalOperations,
      failedOperations,
      <span class="hljs-attr">errorRate</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(errorRate * <span class="hljs-number">100</span>) / <span class="hljs-number">100</span>,
      <span class="hljs-attr">topErrors</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">errorCounts</span>.<span class="hljs-title function_">entries</span>())
        .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">[, a], [, b]</span>) =&gt;</span> b - a)
        .<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>),
    };
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> errorMonitor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ErrorMonitor</span>();

<span class="hljs-comment">// Usage in API calls</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> monitoredApi = {
  <span class="hljs-attr">get</span>: &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span>
    errorMonitor.<span class="hljs-title function_">recordOperation</span>(<span class="hljs-string">\`GET <span class="hljs-subst">\${endpoint}</span>\`</span>, <span class="hljs-function">() =&gt;</span> api.<span class="hljs-property">get</span>&lt;T&gt;(endpoint)),

  <span class="hljs-attr">post</span>: &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">endpoint</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span>
    errorMonitor.<span class="hljs-title function_">recordOperation</span>(<span class="hljs-string">\`POST <span class="hljs-subst">\${endpoint}</span>\`</span>, <span class="hljs-function">() =&gt;</span> api.<span class="hljs-property">post</span>&lt;T&gt;(endpoint, data)),
};
</code></pre>
<h2 id="خلاصة-أفضل-الممارسات">خلاصة أفضل الممارسات</h2>
<ol>
<li><strong>استخدم أخطاء مُحكَمة الأنواع</strong> - أنشئ أنواع أخطاء شاملة بدلًا من كائنات <code>Error</code> عامّة</li>
<li><strong>نفّذ نمط <code>Result</code></strong> - اجعل التعامل مع الأخطاء صريحًا وآمنًا من ناحية الأنواع</li>
<li><strong>أضف منطق إعادة المحاولة</strong> - أعد المحاولة تلقائيًا للأخطاء القابلة لإعادة المحاولة مع تراجع أُسّي (exponential backoff)</li>
<li><strong>قدّم تغذية راجعة للمستخدم</strong> - اعرض رسائل خطأ ذات معنًى وخيارات للتعافي</li>
<li><strong>سجّل وراقب</strong> - تتبّع معدّلات الأخطاء وأنماطها لأغراض التشخيص</li>
<li><strong>اختبر مسارات الخطأ</strong> - اكتب اختبارات لحالات الأخطاء لا لمسارات النجاح وحدها</li>
<li><strong>استخدم حدود الأخطاء</strong> - التقط أخطاء مكوّنات React وتعامل معها بلياقة</li>
<li><strong>أخفق مبكّرًا (Fail Fast)</strong> - تحقّق من المدخلات مبكّرًا وقدّم تغذية راجعة فورية</li>
</ol>
<p>مع هذه الأنماط، ستبني تطبيقات React تتعامل مع الأخطاء بلياقة، وتقدّم تجربة مستخدم ممتازة، وتمنحك معلومات التشخيص التي تحتاجها حين تسوء الأمور.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:r};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,r as html,l as slug,p as title};
