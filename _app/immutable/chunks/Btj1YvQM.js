const s="kinney",a="react-typescript",n="React مع TypeScript",l="loading-states-error-handling",t="حالات التحميل ومعالجة الأخطاء",p=[{depth:2,id:"المشكلة-مع-الأعلام-المنطقية",text:"المشكلة مع الأعلام المنطقية"},{depth:2,id:"الاتحادات-المميزة-جعل-الحالات-المستحيلة-مستحيلة",text:"الاتحادات المُميَّزة: جعل الحالات المستحيلة مستحيلة"},{depth:2,id:"نوع-عام-للحالة-غير-المتزامنة",text:"نوع عام للحالة غير المتزامنة"},{depth:2,id:"معالجة-الأخطاء-المحسنة-بأنواع-الأخطاء",text:"معالجة الأخطاء المحسّنة بأنواع الأخطاء"},{depth:2,id:"التحديثات-المتفائلة-مع-التراجع",text:"التحديثات المتفائلة مع التراجع"},{depth:2,id:"حالات-التحميل-الهيكلية",text:"حالات التحميل الهيكلية"},{depth:2,id:"حدود-الأخطاء-للأخطاء-غير-المتوقعة",text:"حدود الأخطاء للأخطاء غير المتوقعة"},{depth:2,id:"دمج-عدة-حالات-غير-متزامنة",text:"دمج عدة حالات غير متزامنة"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"1-استخدم-دائما-الاتحادات-المميزة-للحالة-غير-المتزامنة",text:"1. استخدم دائمًا الاتحادات المُميَّزة للحالة غير المتزامنة"},{depth:3,id:"2-قدم-رسائل-أخطاء-مفهومة-للمستخدم",text:"2. قدّم رسائل أخطاء مفهومة للمستخدم"},{depth:3,id:"3-تعامل-مع-جميع-انتقالات-الحالة",text:"3. تعامل مع جميع انتقالات الحالة"},{depth:3,id:"4-خذ-بعين-الاعتبار-البيانات-القديمة-stale-data",text:"4. خذ بعين الاعتبار البيانات القديمة (stale data)"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],c=`<p>نصف العمل في بناء تجربة مستخدم رائعة هو التعامل مع المسارات غير الموفّقة برشاقة. حين تجلب المهام (todos) من واجهة برمجية (API)، يحتاج المستخدمون إلى معرفة وقت تحميل البيانات، ووقت نجاحها، والأهم من ذلك: وقت فشلها وما الذي يمكنهم فعله حيال ذلك. تتيح لنا الاتحادات المُميَّزة (discriminated unions) في TypeScript نمذجة هذه الحالات بطريقة تجعل كتابة الأخطاء مستحيلةً حرفيًا.</p>
<p>في هذا الدليل سنستكشف أنماطًا لتمثيل الحالات غير المتزامنة تُزيل فئات كاملة من الأخطاء، وتوفّر تجربة مستخدم أفضل، وتجعل شيفرتك أكثر قابلية للصيانة.</p>
<h2 id="المشكلة-مع-الأعلام-المنطقية">المشكلة مع الأعلام المنطقية</h2>
<p>لنبدأ بما لا ينبغي فعله. هذه هي الطريقة التي يقترب بها كثير من المطوّرين من الحالة غير المتزامنة في البداية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ The problematic boolean approach</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [hasError, setHasError] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [errorMessage, setErrorMessage] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// This allows impossible states:</span>
  <span class="hljs-comment">// - isLoading=true AND hasError=true?</span>
  <span class="hljs-comment">// - todos.length &gt; 0 AND isLoading=true?</span>
  <span class="hljs-comment">// - hasError=false BUT errorMessage=&#x27;Something went wrong&#x27;?</span>

  <span class="hljs-comment">// Your UI logic becomes a maze of conditionals</span>
  <span class="hljs-keyword">if</span> (isLoading &amp;&amp; hasError) {
    <span class="hljs-comment">// This shouldn&#x27;t be possible but it is!</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading... but also error?<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (hasError) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {errorMessage}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (todos.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No todos<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>; <span class="hljs-comment">// Or are we still loading?</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>المشكلة؟ إنك تستطيع تمثيل حالات مستحيلة، وفي النهاية ستقوم بذلك.</p>
<h2 id="الاتحادات-المميزة-جعل-الحالات-المستحيلة-مستحيلة">الاتحادات المُميَّزة: جعل الحالات المستحيلة مستحيلة</h2>
<p>إليك طريقة أفضل باستخدام الاتحادات المُميَّزة في TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Each state is mutually exclusive</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TodosState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">TodosState</span>&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);
        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }
        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-title function_">setState</span>({
          <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
          <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>),
        });
      }
    };

    <span class="hljs-title function_">fetchTodos</span>();
  }, []);

  <span class="hljs-comment">// TypeScript ensures we handle every case</span>
  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Ready to load todos<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Failed to load todos<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setState({ status: &#x27;idle&#x27; })}&gt;Try Again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {state.data.map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
      );

    <span class="hljs-comment">// TypeScript knows this is exhaustive</span>
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = state;
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}
</code></pre>
<p>الآن أصبح من المستحيل أن تكون الحالة في تحميل وفي الوقت نفسه هناك خطأ. لن يسمح لك TypeScript بالوصول إلى <code>data</code> ما لم تكن الحالة <code>success</code>. رائع!</p>
<h2 id="نوع-عام-للحالة-غير-المتزامنة">نوع عام للحالة غير المتزامنة</h2>
<p>لنجعل هذا النمط قابلًا لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic type for any async operation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// Helper functions to create states</span>
<span class="hljs-keyword">const</span> asyncStates = {
  <span class="hljs-attr">idle</span>: &lt;T&gt;(): <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =&gt; ({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }),
  <span class="hljs-attr">loading</span>: &lt;T&gt;(): <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =&gt; ({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }),
  <span class="hljs-attr">success</span>: &lt;T&gt;(<span class="hljs-attr">data</span>: T): <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =&gt; ({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data }),
  <span class="hljs-attr">error</span>: &lt;T&gt;(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =&gt; ({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>, error })
};

<span class="hljs-comment">// Custom hook using the generic type</span>
<span class="hljs-keyword">function</span> useAsyncState&lt;T&gt;(<span class="hljs-attr">asyncFunction</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AsyncState</span>&lt;T&gt;&gt;(asyncStates.<span class="hljs-title function_">idle</span>());

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setState</span>(asyncStates.<span class="hljs-title function_">loading</span>());

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">asyncFunction</span>();
      <span class="hljs-title function_">setState</span>(asyncStates.<span class="hljs-title function_">success</span>(data));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>(asyncStates.<span class="hljs-title function_">error</span>(
        error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>)
      ));
    }
  }, [asyncFunction]);

  <span class="hljs-keyword">const</span> reset = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setState</span>(asyncStates.<span class="hljs-title function_">idle</span>());
  }, []);

  <span class="hljs-keyword">return</span> { state, execute, reset };
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListWithHook</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { state, execute, reset } = <span class="hljs-title function_">useAsyncState</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;;
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">execute</span>();
  }, [execute]);

  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{execute}</span>&gt;</span>Load Todos<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Error: {state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{execute}</span>&gt;</span>Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{reset}</span>&gt;</span>Reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {state.data.map(todo =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
  }
}
</code></pre>
<h2 id="معالجة-الأخطاء-المحسنة-بأنواع-الأخطاء">معالجة الأخطاء المحسّنة بأنواع الأخطاء</h2>
<p>الأخطاء المختلفة تحتاج معالجة مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Classify different error types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ErrorType</span> = <span class="hljs-string">&#x27;network&#x27;</span> | <span class="hljs-string">&#x27;timeout&#x27;</span> | <span class="hljs-string">&#x27;server&#x27;</span> | <span class="hljs-string">&#x27;validation&#x27;</span> | <span class="hljs-string">&#x27;unknown&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TypedError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Error</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">ErrorType</span>;
  <span class="hljs-attr">statusCode</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retry</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">classifyError</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">TypedError</span> {
  <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">TypeError</span> &amp;&amp; error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;Failed to fetch&#x27;</span>)) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;NetworkError&#x27;</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Network connection failed. Please check your internet connection.&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;network&#x27;</span>,
      <span class="hljs-attr">retry</span>: <span class="hljs-literal">true</span>,
    };
  }

  <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; error.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;TimeoutError&#x27;</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Request timed out. Please try again.&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;timeout&#x27;</span>,
      <span class="hljs-attr">retry</span>: <span class="hljs-literal">true</span>,
    };
  }

  <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Response</span>) {
    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">status</span> &gt;= <span class="hljs-number">500</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;ServerError&#x27;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Server error. Please try again later.&#x27;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;server&#x27;</span>,
        <span class="hljs-attr">statusCode</span>: error.<span class="hljs-property">status</span>,
        <span class="hljs-attr">retry</span>: <span class="hljs-literal">true</span>,
      };
    }

    <span class="hljs-keyword">if</span> (error.<span class="hljs-property">status</span> &gt;= <span class="hljs-number">400</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;ClientError&#x27;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Request failed. Please check your input.&#x27;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;validation&#x27;</span>,
        <span class="hljs-attr">statusCode</span>: error.<span class="hljs-property">status</span>,
        <span class="hljs-attr">retry</span>: <span class="hljs-literal">false</span>,
      };
    }
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;UnknownError&#x27;</span>,
    <span class="hljs-attr">message</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;An unknown error occurred&#x27;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;unknown&#x27;</span>,
    <span class="hljs-attr">retry</span>: <span class="hljs-literal">true</span>,
  };
}

<span class="hljs-comment">// Enhanced async state with typed errors</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">EnhancedAsyncState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>; <span class="hljs-attr">progress</span>?: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">TypedError</span>; <span class="hljs-attr">attemptCount</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListWithEnhancedErrors</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">EnhancedAsyncState</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchWithRetry</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params">attemptCount = <span class="hljs-number">0</span></span>) =&gt; {
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> response;
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
        data,
        <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">const</span> typedError = <span class="hljs-title function_">classifyError</span>(error);
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-attr">error</span>: typedError,
        <span class="hljs-attr">attemptCount</span>: attemptCount + <span class="hljs-number">1</span>,
      });

      <span class="hljs-comment">// Auto-retry for certain errors</span>
      <span class="hljs-keyword">if</span> (typedError.<span class="hljs-property">retry</span> &amp;&amp; attemptCount &lt; <span class="hljs-number">3</span>) {
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchWithRetry</span>(attemptCount + <span class="hljs-number">1</span>), <span class="hljs-number">2000</span> * (attemptCount + <span class="hljs-number">1</span>));
      }
    }
  };

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchWithRetry</span>();
  }, []);

  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Initializing...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          {state.progress &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">progress</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{state.progress}</span> <span class="hljs-attr">max</span>=<span class="hljs-string">{100}</span>&gt;</span>
              {state.progress}%
            <span class="hljs-tag">&lt;/<span class="hljs-name">progress</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-container&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>
            {state.error.type === &#x27;network&#x27; &amp;&amp; &#x27;🌐&#x27;}
            {state.error.type === &#x27;timeout&#x27; &amp;&amp; &#x27;⏱️&#x27;}
            {state.error.type === &#x27;server&#x27; &amp;&amp; &#x27;🖥️&#x27;} Error Loading Todos
          <span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          {state.error.statusCode &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>Status: {state.error.statusCode}<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>}
          {state.attemptCount &gt; 1 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Attempted {state.attemptCount} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
          {state.error.retry &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> fetchWithRetry(state.attemptCount)}&gt;Try Again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Loaded {state.data.length} todos at {state.timestamp.toLocaleTimeString()}
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {state.data.map((todo) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
  }
}
</code></pre>
<h2 id="التحديثات-المتفائلة-مع-التراجع">التحديثات المتفائلة مع التراجع</h2>
<p>تعامل مع التحديثات المتفائلة التي قد تفشل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">OptimisticState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;stable&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;updating&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">optimisticData</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;reverting&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListWithOptimisticUpdates</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">OptimisticState</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;stable&#x27;</span>,
    <span class="hljs-attr">data</span>: [],
  });

  <span class="hljs-comment">// Load initial data</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos?_limit=5&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[]</span>) =&gt;</span> <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;stable&#x27;</span>, data }));
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-comment">// Get current data</span>
    <span class="hljs-keyword">const</span> currentData = <span class="hljs-string">&#x27;data&#x27;</span> <span class="hljs-keyword">in</span> state ? state.<span class="hljs-property">data</span> : [];
    <span class="hljs-keyword">const</span> todoIndex = currentData.<span class="hljs-title function_">findIndex</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === id);
    <span class="hljs-keyword">if</span> (todoIndex === -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Create optimistic data</span>
    <span class="hljs-keyword">const</span> optimisticData = [...currentData];
    optimisticData[todoIndex] = {
      ...optimisticData[todoIndex],
      <span class="hljs-attr">completed</span>: !optimisticData[todoIndex].<span class="hljs-property">completed</span>,
    };

    <span class="hljs-comment">// Apply optimistic update</span>
    <span class="hljs-title function_">setState</span>({
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;updating&#x27;</span>,
      <span class="hljs-attr">data</span>: currentData,
      optimisticData,
    });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Simulate API call</span>
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
          <span class="hljs-attr">completed</span>: optimisticData[todoIndex].<span class="hljs-property">completed</span>,
        }),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to update todo&#x27;</span>);
      }

      <span class="hljs-comment">// Commit the optimistic update</span>
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;stable&#x27;</span>, <span class="hljs-attr">data</span>: optimisticData });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Revert on failure</span>
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;reverting&#x27;</span>,
        <span class="hljs-attr">data</span>: currentData,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Update failed&#x27;</span>),
      });

      <span class="hljs-comment">// After showing error, revert to stable</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;stable&#x27;</span>, <span class="hljs-attr">data</span>: currentData });
      }, <span class="hljs-number">2000</span>);
    }
  };

  <span class="hljs-keyword">const</span> displayData = state.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;updating&#x27;</span> ? state.<span class="hljs-property">optimisticData</span> : state.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {state.status === &#x27;reverting&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-banner&quot;</span>&gt;</span>Failed to update. Reverting changes...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {displayData.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">opacity:</span> <span class="hljs-attr">state.status</span> === <span class="hljs-string">&#x27;updating&#x27;</span> ? <span class="hljs-attr">0.6</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
              <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">opacity</span> <span class="hljs-attr">0.2s</span>&#x27;,
            }}
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
              <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)}
              disabled={state.status !== &#x27;stable&#x27;}
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
              }}
            &gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="حالات-التحميل-الهيكلية">حالات التحميل الهيكلية</h2>
<p>وفّر أداءً إدراكيًا أفضل باستخدام شاشات الهيكل (skeleton):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoSkeleton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;todo-skeleton&quot;</span>&gt;</span>
      {[...Array(5)].map((_, i) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton-item&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton-checkbox&quot;</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton-text&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoadingState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;skeleton&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>; <span class="hljs-attr">progress</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>; <span class="hljs-attr">canRetry</span>: <span class="hljs-built_in">boolean</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListWithSkeleton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">LoadingState</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;skeleton&#x27;</span>,
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Show skeleton immediately</span>
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;skeleton&#x27;</span> });

    <span class="hljs-comment">// Simulate progress updates</span>
    <span class="hljs-keyword">const</span> progressInterval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;skeleton&#x27;</span>
          ? { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>, <span class="hljs-attr">progress</span>: <span class="hljs-number">10</span> }
          : prev.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;loading&#x27;</span> &amp;&amp; prev.<span class="hljs-property">progress</span> &lt; <span class="hljs-number">90</span>
            ? { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>, <span class="hljs-attr">progress</span>: prev.<span class="hljs-property">progress</span> + <span class="hljs-number">20</span> }
            : prev,
      );
    }, <span class="hljs-number">200</span>);

    <span class="hljs-comment">// Fetch actual data</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos?_limit=5&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!res.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch&#x27;</span>);
        <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>();
      })
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[]</span>) =&gt;</span> {
        <span class="hljs-built_in">clearInterval</span>(progressInterval);
        <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data });
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-built_in">clearInterval</span>(progressInterval);
        <span class="hljs-title function_">setState</span>({
          <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
          <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>),
          <span class="hljs-attr">canRetry</span>: <span class="hljs-literal">true</span>,
        });
      });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(progressInterval);
  }, []);

  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;skeleton&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoSkeleton</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoSkeleton</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">progress</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{state.progress}</span> <span class="hljs-attr">max</span>=<span class="hljs-string">{100}</span>&gt;</span>
            {state.progress}%
          <span class="hljs-tag">&lt;/<span class="hljs-name">progress</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-state&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>😔 {state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          {state.canRetry &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> window.location.reload()}&gt;Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {state.data.map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">readOnly</span> /&gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
      );
  }
}
</code></pre>
<h2 id="حدود-الأخطاء-للأخطاء-غير-المتوقعة">حدود الأخطاء للأخطاء غير المتوقعة</h2>
<p>التقط الأخطاء التي تحدث أثناء التصيير (render):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span>, <span class="hljs-title class_">ErrorInfo</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">retry</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">Props</span>, <span class="hljs-title class_">State</span>&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">Props</span></span>) {
    <span class="hljs-variable language_">super</span>(props);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">State</span> {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>, error };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error boundary caught:&#x27;</span>, error, errorInfo);
    <span class="hljs-comment">// Send to error reporting service</span>
  }

  retry = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });
  };

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">hasError</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">fallback</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-title function_">fallback</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">retry</span>);
      }

      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-boundary-default&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Something went wrong<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>Error details<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{this.state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.retry}</span>&gt;</span>Try again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>;
  }
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{(error,</span> <span class="hljs-attr">retry</span>) =&gt;</span> (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;custom-error&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Oops! The todos couldn&#x27;t load<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{retry}</span>&gt;</span>Reload<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoListWithEnhancedErrors</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="دمج-عدة-حالات-غير-متزامنة">دمج عدة حالات غير متزامنة</h2>
<p>حين تكون لديك عدة عمليات غير متزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">MultiAsyncState</span>&lt;T, U&gt; = {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">AsyncState</span>&lt;T&gt;;
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">AsyncState</span>&lt;U&gt;;
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DashboardWithMultipleStates</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">MultiAsyncState</span>&lt;<span class="hljs-title class_">Todo</span>[], <span class="hljs-title class_">User</span>&gt;&gt;({
    <span class="hljs-attr">todos</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> },
    <span class="hljs-attr">user</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> },
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Fetch todos</span>
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      <span class="hljs-attr">todos</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> },
    }));

    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos?_limit=5&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[]</span>) =&gt;</span> {
        <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
          ...prev,
          <span class="hljs-attr">todos</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data },
        }));
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
          ...prev,
          <span class="hljs-attr">todos</span>: {
            <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
            <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>),
          },
        }));
      });

    <span class="hljs-comment">// Fetch user</span>
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      <span class="hljs-attr">user</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> },
    }));

    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/users/1&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">User</span></span>) =&gt;</span> {
        <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
          ...prev,
          <span class="hljs-attr">user</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data },
        }));
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
          ...prev,
          <span class="hljs-attr">user</span>: {
            <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
            <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>),
          },
        }));
      });
  }, []);

  <span class="hljs-comment">// Derive overall state</span>
  <span class="hljs-keyword">const</span> isLoading = state.<span class="hljs-property">todos</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;loading&#x27;</span> || state.<span class="hljs-property">user</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;loading&#x27;</span>;
  <span class="hljs-keyword">const</span> hasError = state.<span class="hljs-property">todos</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span> || state.<span class="hljs-property">user</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-keyword">const</span> isReady = state.<span class="hljs-property">todos</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;success&#x27;</span> &amp;&amp; state.<span class="hljs-property">user</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;success&#x27;</span>;

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading dashboard...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">if</span> (hasError) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {state.todos.status === &#x27;error&#x27; &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Todos error: {state.todos.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
        {state.user.status === &#x27;error&#x27; &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>User error: {state.user.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">if</span> (isReady) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome, {state.user.data.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Your Todos:<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {state.todos.data.map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Initializing...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="1-استخدم-دائما-الاتحادات-المميزة-للحالة-غير-المتزامنة">1. استخدم دائمًا الاتحادات المُميَّزة للحالة غير المتزامنة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Impossible states are impossible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">State</span> =
  { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> } | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// ❌ Bad: Many impossible states</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
}
</code></pre>
<h3 id="2-قدم-رسائل-أخطاء-مفهومة-للمستخدم">2. قدّم رسائل أخطاء مفهومة للمستخدم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Helpful error message with action</span>
&lt;div&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Unable to load your todos<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Please check your internet connection and try again.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{retry}</span>&gt;</span>Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
&lt;/div&gt;

<span class="hljs-comment">// ❌ Bad: Technical error message</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: NetworkError: Failed to fetch<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre>
<h3 id="3-تعامل-مع-جميع-انتقالات-الحالة">3. تعامل مع جميع انتقالات الحالة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Clear state flow</span>
idle -&gt; loading -&gt; success/error
error -&gt; loading -&gt; success/error
success -&gt; <span class="hljs-title function_">loading</span> (refresh) -&gt; success/error

<span class="hljs-comment">// ❌ Bad: Unclear transitions</span>
loading -&gt; <span class="hljs-title function_">loading</span> (what happened?)
success -&gt; <span class="hljs-title function_">error</span> (without loading?)
</code></pre>
<h3 id="4-خذ-بعين-الاعتبار-البيانات-القديمة-stale-data">4. خذ بعين الاعتبار البيانات القديمة (stale data)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">DataState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>; <span class="hljs-attr">staleData</span>?: T } <span class="hljs-comment">// Show old data while loading</span>
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">isStale</span>?: <span class="hljs-built_in">boolean</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>; <span class="hljs-attr">lastValidData</span>?: T };
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>حالات التحميل ومعالجة الأخطاء السليمة أمران حاسمان لتطبيقات React الإنتاجية. أهم ما تأخذه معك:</p>
<ol>
<li><strong>استخدم الاتحادات المُميَّزة</strong> — اجعل الحالات المستحيلة غير قابلة للتمثيل</li>
<li><strong>صنّف الأخطاء</strong> — الأخطاء المختلفة تحتاج معالجة مختلفة</li>
<li><strong>قدّم تغذية راجعة</strong> — يجب أن يعرف المستخدمون دائمًا ما يحدث</li>
<li><strong>وفّر وسيلة للتعافي</strong> — اعرض دائمًا طريقة لإعادة المحاولة أو للتعافي</li>
<li><strong>فكّر في التحديثات المتفائلة</strong> — لكن عالج التراجع دائمًا</li>
<li><strong>استخدم حدود الأخطاء</strong> — التقط أخطاء التصيير غير المتوقعة</li>
</ol>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>الآن وقد استطعنا التعامل مع التحميل والأخطاء على النحو الصحيح، لنبدأ بتنفيذ عمليات CRUD. يغطي الدليل التالي إنشاء المهام عبر طلبات POST.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
