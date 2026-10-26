const s="kinney",a="react-typescript",n="React مع TypeScript",l="error-boundaries-and-suspense-boundaries",p="حدود الأخطاء وحدود Suspense",r=[{depth:2,id:"حدود-الأخطاء-التقاط-ما-يحدث-خطأ",text:"حدود الأخطاء: التقاط ما يحدث خطأً"},{depth:3,id:"التنفيذ-الأساسي-لحد-الأخطاء",text:"التنفيذ الأساسي لحدّ الأخطاء"},{depth:3,id:"مكونات-بديل-منمطة",text:"مكوّنات بديل مُنمَّطة"},{depth:3,id:"حد-أخطاء-محسن-مع-إمكانية-إعادة-التعيين",text:"حدّ أخطاء محسَّن مع إمكانية إعادة التعيين"},{depth:2,id:"حدود-suspense-التعامل-بأناقة-مع-اللاتزامنية",text:"حدود Suspense: التعامل بأناقة مع اللاتزامنية"},{depth:3,id:"الجمع-بين-حدود-الخطأ-وحدود-suspense",text:"الجمع بين حدود الخطأ وحدود Suspense"},{depth:2,id:"أنماط-من-العالم-الحقيقي",text:"أنماط من العالم الحقيقي"},{depth:3,id:"حدود-على-مستوى-المسارات",text:"حدود على مستوى المسارات"},{depth:3,id:"حدود-أخطاء-واعية-بالسياق",text:"حدود أخطاء واعية بالسياق"},{depth:2,id:"أنواع-معلومات-الخطأ",text:"أنواع معلومات الخطأ"},{depth:2,id:"المآخذ-الشائعة-والحلول",text:"المآخذ الشائعة والحلول"},{depth:3,id:"لا-تلتقط-كل-شيء",text:"لا تلتقط كل شيء"},{depth:3,id:"الإبلاغ-عن-الأخطاء-بأمان-الأنواع",text:"الإبلاغ عن الأخطاء بأمان الأنواع"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],t=`<p>حدود الأخطاء وحدود Suspense هما أدوات React للتعامل بلياقة مع ما لا يتوقّع — الانهيارات وحالات التحميل على التوالي. لكنّ هذا هو بيت القصيد: إنّهما مكوّنات صنفية وواجهات برمجية خاصّة لا تحظى بنفس اهتمام TypeScript الذي تحظى به خُطّافاتك ومكوّناتك الدالية المعتادة. لنُصلح ذلك بتعلّم كيفية تحديد أنواع هذه الحدود على نحو صحيح، حتى تصير بدائل العرض (fallbacks) ومعالجة الأخطاء لديك متينة كسائر تطبيقك.</p>
<p>كلتا الحدّين تعملان كشبكات أمان في شجرة المكوّنات لديك. فحدود الأخطاء تلتقط أخطاء JavaScript أثناء التصيير وفي توابع دورة الحياة وفي البانِي، بينما تتعامل حدود Suspense مع العمليات غير المتزامنة عبر التقاط الوعود المرمية وعرض حالات التحميل. ويضمن ضبط الأنواع أن تكون معلومات الخطأ لديك منظّمة على نحو صحيح وأن يتلقّى مكوّنات البديل الخصائص التي تتوقّعها بالضبط.</p>
<h2 id="حدود-الأخطاء-التقاط-ما-يحدث-خطأ">حدود الأخطاء: التقاط ما يحدث خطأً</h2>
<p>حدود الأخطاء هي مكوّنات صنفية تُنفّذ إمّا <code>componentDidCatch</code> أو الأسلوب الساكن <code>getDerivedStateFromError</code>. وبما أنّنا نعمل مع TypeScript، فنحتاج إلى تحديد نوعَي حالة المكوّن ومعلومات الخطأ التي نتلقّاها على نحو صحيح.</p>
<h3 id="التنفيذ-الأساسي-لحد-الأخطاء">التنفيذ الأساسي لحدّ الأخطاء</h3>
<p>لنبدأ بحدّ أخطاء مُحكم الأنواع يلتقط الخطأ ومعلومات الخطأ الإضافية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span>, <span class="hljs-title class_">ErrorInfo</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryState</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
  <span class="hljs-attr">errorInfo</span>?: <span class="hljs-title class_">ErrorInfo</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">ErrorBoundaryProps</span>, <span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ErrorBoundaryProps</span></span>) {
    <span class="hljs-variable language_">super</span>(props);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span> };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">ErrorBoundaryState</span> {
    <span class="hljs-comment">// Update state to trigger fallback UI</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>,
      error,
    };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-comment">// Log error information</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ errorInfo });

    <span class="hljs-comment">// Call optional error reporting callback</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">onError</span>?.(error, errorInfo);
  }

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">hasError</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span>) {
      <span class="hljs-comment">// Custom fallback or default error message</span>
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">fallback</span> ? (
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-title function_">fallback</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">errorInfo</span>!)
      ) : (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Something went wrong.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>;
  }
}
</code></pre>
<p>لاحظ كيف نُحدّد نوع كائن <code>ErrorInfo</code> القادم من React على نحو صحيح، وهو يحتوي على معلومات تنقيب قيّمة مثل أثر مكدّس المكوّنات. أمّا خاصية fallback فهي دالة تتلقّى الخطأ ومعلومات الخطأ معًا، فتمنحك تحكّمًا كاملًا في كيفية عرض تفاصيل الخطأ.</p>
<h3 id="مكونات-بديل-منمطة">مكوّنات بديل مُنمَّطة</h3>
<p>ينبغي أن تكون مكوّنات البديل لديك مُحكمة الأنواع لتتلقّى معلومات الخطأ التي تحتاج إليها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorFallbackProps</span> {
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>;
  <span class="hljs-attr">errorInfo</span>?: <span class="hljs-title class_">ErrorInfo</span>;
  <span class="hljs-attr">resetErrorBoundary</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorFallback</span>(<span class="hljs-params">{ error, errorInfo, resetErrorBoundary }: <span class="hljs-title class_">ErrorFallbackProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-boundary&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Oops! Something went wrong<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

      {process.env.NODE_ENV === &#x27;development&#x27; &amp;&amp; errorInfo &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>Error Details (Dev Only)<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{errorInfo.componentStack}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
      )}

      {resetErrorBoundary &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{resetErrorBoundary}</span>&gt;</span>Try Again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="حد-أخطاء-محسن-مع-إمكانية-إعادة-التعيين">حدّ أخطاء محسَّن مع إمكانية إعادة التعيين</h3>
<p>غالبًا ما تحتاج حدود الأخطاء في العالم الحقيقي إلى القدرة على إعادة تعيين حالتها. وإليك كيفية تنفيذ ذلك بدعم TypeScript على نحو صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryState</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
  <span class="hljs-attr">errorInfo</span>?: <span class="hljs-title class_">ErrorInfo</span>;
  <span class="hljs-attr">retryCount</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorBoundaryProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">fallback</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-title class_">ErrorFallbackProps</span>&gt;;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">ErrorBoundaryProps</span>, <span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ErrorBoundaryProps</span></span>) {
    <span class="hljs-variable language_">super</span>(props);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span> };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>, error };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ errorInfo });
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">onError</span>?.(error, errorInfo);
  }

  resetErrorBoundary = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> { maxRetries = <span class="hljs-number">3</span> } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;
    <span class="hljs-keyword">const</span> { retryCount } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;

    <span class="hljs-keyword">if</span> (retryCount &lt; maxRetries) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">error</span>: <span class="hljs-literal">undefined</span>,
        <span class="hljs-attr">errorInfo</span>: <span class="hljs-literal">undefined</span>,
        <span class="hljs-attr">retryCount</span>: retryCount + <span class="hljs-number">1</span>,
      });
    }
  };

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> { hasError, error, errorInfo, retryCount } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;
    <span class="hljs-keyword">const</span> { maxRetries = <span class="hljs-number">3</span>, <span class="hljs-attr">fallback</span>: <span class="hljs-title class_">FallbackComponent</span> } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;

    <span class="hljs-keyword">if</span> (hasError &amp;&amp; error) {
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FallbackComponent</span>
          <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span>
          <span class="hljs-attr">errorInfo</span>=<span class="hljs-string">{errorInfo}</span>
          <span class="hljs-attr">resetErrorBoundary</span>=<span class="hljs-string">{retryCount</span> &lt; <span class="hljs-attr">maxRetries</span> ? <span class="hljs-attr">this.resetErrorBoundary</span> <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}
          <span class="hljs-attr">retryCount</span>=<span class="hljs-string">{retryCount}</span>
          <span class="hljs-attr">maxRetries</span>=<span class="hljs-string">{maxRetries}</span>
        /&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>;
  }
}
</code></pre>
<blockquote>
<p><strong>تلميح</strong></p>
<p>استخدم الأنواع العامة حين تحتاج حدود أخطائك إلى التعامل مع أنواع أخطاء محدّدة. فمثلًا <code>ErrorBoundary&lt;ApiError&gt;</code> يمكن أن يوفّر وصولًا مُنمَّطًا إلى خصائص الأخطاء الخاصة بواجهة البرمجة.</p>
</blockquote>
<h2 id="حدود-suspense-التعامل-بأناقة-مع-اللاتزامنية">حدود <code>Suspense</code>: التعامل بأناقة مع اللاتزامنية</h2>
<p>حدود Suspense أسهل بكثير في تحديد الأنواع لأنّها مكوّنات مدمجة في React، لكنّ خاصية fallback ومعالجة الأخطاء ما زالت تحتاج إلى تحديد دقيق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoadingFallbackProps</span> {
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">progress</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LoadingFallback</span>(<span class="hljs-params">{ message = <span class="hljs-string">&#x27;Loading...&#x27;</span>, progress }: <span class="hljs-title class_">LoadingFallbackProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-boundary&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;spinner&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      {progress !== undefined &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;progress-bar&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;progress-fill&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> \`\${<span class="hljs-attr">progress</span>}%\` }} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AsyncWrapperProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">loadingMessage</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncWrapper</span>(<span class="hljs-params">{ children, fallback, loadingMessage }: <span class="hljs-title class_">AsyncWrapperProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{fallback</span> || &lt;<span class="hljs-attr">LoadingFallback</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{loadingMessage}</span> /&gt;</span>}&gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الجمع-بين-حدود-الخطأ-وحدود-suspense">الجمع بين حدود الخطأ وحدود <code>Suspense</code></h3>
<p>في الممارسة العملية، ستحتاج غالبًا إلى التعامل مع الأخطاء والتعليق معًا. وإليك غلافًا مُنمَّطًا يتعامل مع القيدين:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">BoundaryWrapperProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">loadingFallback</span>?: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">errorFallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-title class_">ErrorFallbackProps</span>&gt;;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BoundaryWrapper</span>(<span class="hljs-params">{
  children,
  loadingFallback = &lt;LoadingFallback /&gt;,
  errorFallback = ErrorFallback,
  onError,
}: <span class="hljs-title class_">BoundaryWrapperProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{errorFallback}</span> <span class="hljs-attr">onError</span>=<span class="hljs-string">{onError}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{loadingFallback}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage with proper type safety</span>
&lt;<span class="hljs-title class_">BoundaryWrapper</span>
  loadingFallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingFallback</span> <span class="hljs-attr">message</span>=<span class="hljs-string">&quot;Loading user data...&quot;</span> /&gt;</span></span>}
  errorFallback={<span class="hljs-title class_">UserErrorFallback</span>}
  onError={<span class="hljs-function">(<span class="hljs-params">error, errorInfo</span>) =&gt;</span> {
    <span class="hljs-comment">// TypeScript knows exactly what error and errorInfo contain</span>
    analytics.<span class="hljs-title function_">track</span>(<span class="hljs-string">&#x27;error_boundary_triggered&#x27;</span>, {
      <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span>,
      <span class="hljs-attr">stack</span>: errorInfo.<span class="hljs-property">componentStack</span>,
    });
  }}
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{userId}</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">BoundaryWrapper</span>&gt;;
</code></pre>
<h2 id="أنماط-من-العالم-الحقيقي">أنماط من العالم الحقيقي</h2>
<h3 id="حدود-على-مستوى-المسارات">حدود على مستوى المسارات</h3>
<p>عند بناء تطبيقات تستخدم التوجيه (routing)، ستحتاج إلى حدود على مستوى المسار لمنع أخطاء التنقل من إسقاط التطبيق بأكمله:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteErrorBoundaryProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">routeName</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteErrorBoundary</span>(<span class="hljs-params">{ children, routeName }: <span class="hljs-title class_">RouteErrorBoundaryProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{(error,</span> <span class="hljs-attr">errorInfo</span>) =&gt;</span> (
        <span class="hljs-tag">&lt;<span class="hljs-name">RouteFallback</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> <span class="hljs-attr">errorInfo</span>=<span class="hljs-string">{errorInfo}</span> <span class="hljs-attr">routeName</span>=<span class="hljs-string">{routeName}</span> /&gt;</span>
      )}
      onError={(error, errorInfo) =&gt; {
        logError(\`Route \${routeName} error:\`, error, errorInfo);
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">RouteLoadingSpinner</span> /&gt;</span>}&gt;{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteFallbackProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ErrorFallbackProps</span> {
  <span class="hljs-attr">routeName</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteFallback</span>(<span class="hljs-params">{ error, routeName }: <span class="hljs-title class_">RouteFallbackProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;route-error&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Page Unavailable<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The {routeName} page encountered an error:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> window.location.reload()}&gt;Refresh Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="حدود-أخطاء-واعية-بالسياق">حدود أخطاء واعية بالسياق</h3>
<p>أحيانًا تحتاج إلى حدود أخطاء تفهم سياقها وتستطيع تقديم معالجة أدقّ للأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextualErrorBoundaryProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">context</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">criticalErrors</span>?: <span class="hljs-built_in">string</span>[]; <span class="hljs-comment">// Error types that should bubble up</span>
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ContextualErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">ContextualErrorBoundaryProps</span>, <span class="hljs-title class_">ErrorBoundaryState</span>&gt; {
  <span class="hljs-comment">// ... basic error boundary implementation</span>

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-keyword">const</span> { criticalErrors = [], context } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>;

    <span class="hljs-comment">// If this is a critical error type, re-throw to bubble up</span>
    <span class="hljs-keyword">if</span> (criticalErrors.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">criticalError</span>) =&gt;</span> error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(criticalError))) {
      <span class="hljs-keyword">throw</span> error;
    }

    <span class="hljs-comment">// Otherwise, handle locally</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ errorInfo });

    <span class="hljs-title function_">logError</span>(<span class="hljs-string">\`<span class="hljs-subst">\${context}</span> boundary caught error:\`</span>, error, errorInfo);
  }

  <span class="hljs-comment">// ... rest of implementation</span>
}

<span class="hljs-comment">// Usage</span>
&lt;<span class="hljs-title class_">ContextualErrorBoundary</span>
  context=<span class="hljs-string">&quot;UserDashboard&quot;</span>
  criticalErrors={[<span class="hljs-string">&#x27;AuthenticationError&#x27;</span>, <span class="hljs-string">&#x27;NetworkError&#x27;</span>]}
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserDashboard</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">ContextualErrorBoundary</span>&gt;;
</code></pre>
<h2 id="أنواع-معلومات-الخطأ">أنواع معلومات الخطأ</h2>
<p>توفّر واجهة <code>ErrorInfo</code> في TypeScript معلومات منظّمة عن مكان وقوع الأخطاء. وإليك كيفية الاستفادة منها على نحو صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ErrorInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ErrorInfo contains:</span>
<span class="hljs-comment">// - componentStack: string (component hierarchy where error occurred)</span>
<span class="hljs-comment">// - errorBoundary?: Component (the boundary that caught the error)</span>
<span class="hljs-comment">// - errorBoundaryStack?: string (stack trace of the boundary)</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">logDetailedError</span> = (<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> errorReport = {
    <span class="hljs-attr">message</span>: error.<span class="hljs-property">message</span>,
    <span class="hljs-attr">stack</span>: error.<span class="hljs-property">stack</span>,
    <span class="hljs-attr">componentStack</span>: errorInfo.<span class="hljs-property">componentStack</span>,
    <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
    <span class="hljs-attr">userAgent</span>: navigator.<span class="hljs-property">userAgent</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>,
  };

  <span class="hljs-comment">// Send to your error reporting service</span>
  errorReportingService.<span class="hljs-title function_">report</span>(errorReport);
};
</code></pre>
<h2 id="المآخذ-الشائعة-والحلول">المآخذ الشائعة والحلول</h2>
<h3 id="لا-تلتقط-كل-شيء">لا تلتقط كل شيء</h3>
<p>حدود الأخطاء تلتقط فقط الأخطاء الموجودة في شجرة المكوّنات التي تقع تحتها. فهي لا تلتقط:</p>
<ul>
<li>الأخطاء في معالجات الأحداث</li>
<li>الأخطاء في الشيفرة غير المتزامنة</li>
<li>الأخطاء أثناء التصيير على الخادم</li>
<li>الأخطاء داخل حدّ الأخطاء نفسه</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This won&#x27;t be caught by error boundaries</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">BadComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Event handler error&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Wrap async operations properly</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">GoodAsyncComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAsyncOperation</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">riskyAsyncOperation</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setError</span>(error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>));
    }
  };

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> error; <span class="hljs-comment">// Now the error boundary can catch it</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleAsyncOperation}</span>&gt;</span>Safe Async<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};
</code></pre>
<h3 id="الإبلاغ-عن-الأخطاء-بأمان-الأنواع">الإبلاغ عن الأخطاء بأمان الأنواع</h3>
<p>عند التكامل مع خدمات الإبلاغ عن الأخطاء، تأكّد من تحديد أنواع بيانات الخطأ لديك على نحو صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorReport</span> {
  <span class="hljs-attr">error</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">stack</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">errorInfo</span>: {
    <span class="hljs-attr">componentStack</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">metadata</span>: {
    <span class="hljs-attr">userId</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
  };
}

<span class="hljs-keyword">const</span> reportError = (
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>,
  <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span>,
  <span class="hljs-attr">metadata</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ErrorReport</span>[<span class="hljs-string">&#x27;metadata&#x27;</span>], <span class="hljs-string">&#x27;timestamp&#x27;</span>&gt;,
): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">report</span>: <span class="hljs-title class_">ErrorReport</span> = {
    <span class="hljs-attr">error</span>: {
      <span class="hljs-attr">message</span>: error.<span class="hljs-property">message</span>,
      <span class="hljs-attr">stack</span>: error.<span class="hljs-property">stack</span>,
      <span class="hljs-attr">name</span>: error.<span class="hljs-property">name</span>,
    },
    <span class="hljs-attr">errorInfo</span>: {
      <span class="hljs-attr">componentStack</span>: errorInfo.<span class="hljs-property">componentStack</span>,
    },
    <span class="hljs-attr">metadata</span>: {
      ...metadata,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
    },
  };

  errorReportingService.<span class="hljs-title function_">send</span>(report);
};
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>حدود الأخطاء وحدود Suspense ضرورية لبناء تطبيقات React مرنة. ومع التكامل السليم مع TypeScript، يمكنك ضمان أنّ معالجتك للأخطاء متينة بقدر منطق تطبيقك الرئيسي. والمفتاح هو:</p>
<ol>
<li><strong>حدّد أنواع معلومات الخطأ</strong> على نحو شامل ليسهل التنقيح</li>
<li><strong>أنشئ مكوّنات حدود قابلة لإعادة الاستخدام</strong> يمكن تركيبها في أنحاء تطبيقك</li>
<li><strong>تعامل مع سياقات الخطأ المختلفة</strong> على نحو ملائم بدلًا من الاعتماد على مقاسٍ واحد يناسب الجميع</li>
<li><strong>تكامل مع خدمات المراقبة</strong> لتتبّع الأخطاء في بيئة الإنتاج</li>
</ol>
<p>تصير حدود أخطائك توثيقًا لكيفية تعامل تطبيقك مع الإخفاق، ويجعل تحديد الأنواع على نحو صحيح هذا التوثيق قابلًا للتنفيذ والتحقّق. وهذه أساس متين جدًا لإطلاق برمجيات موثوقة.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:r,html:t};export{s as book,a as chapter,n as chapterTitle,e as default,r as headings,t as html,l as slug,p as title};
