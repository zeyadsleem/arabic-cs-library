const s="kinney",n="react-typescript",a="React مع TypeScript",l="use-layout-effect-and-effect-typing",t="استخدام useLayoutEffect وتحديد أنواع التأثيرات",p=[{depth:2,id:"الفرق-الجوهري",text:"الفرق الجوهري"},{depth:2,id:"متى-تستخدم-uselayouteffect",text:"متى تستخدم useLayoutEffect"},{depth:2,id:"تحديد-أنواع-اعتماديات-التأثيرات",text:"تحديد أنواع اعتماديات التأثيرات"},{depth:2,id:"تحديد-أنواع-دوال-التنظيف",text:"تحديد أنواع دوال التنظيف"},{depth:2,id:"اعتبارات-الأداء-وتحديد-الأنواع",text:"اعتبارات الأداء وتحديد الأنواع"},{depth:2,id:"مزالق-typescript-الشائعة",text:"مزالق TypeScript الشائعة"},{depth:3,id:"الإغلاقات-القديمة-مع-معالجات-الأحداث",text:"الإغلاقات القديمة مع معالجات الأحداث"},{depth:3,id:"حراس-الأنواع-على-refcurrent",text:"حراس الأنواع على ref.current"},{depth:2,id:"مثال-من-العالم-الحقيقي-تحديد-موضع-التلميح",text:"مثال من العالم الحقيقي: تحديد موضع التلميح"},{depth:2,id:"اختبار-تأثيرات-التخطيط",text:"اختبار تأثيرات التخطيط"},{depth:2,id:"النقاط-الرئيسية",text:"النقاط الرئيسية"}],e=`<p>يبدو <code>useEffect</code> و<code>useLayoutEffect</code> في React متطابقين تقريبًا على السطح، لكن فروق التوقيت بينهما قد تصنع واجهتك أو تهدمها. أحدهما يعمل بعد تحديث DOM، والآخر يعمل بشكل متزامن قبل أن يرسم المتصفح—واختيار الخطأ قد يؤدي إلى تخطيطات وامضة أو حركات متقطعة. ومع TypeScript، يمكننا جعل هذه التأثيرات آمنة من حيث الأنواع والتقاط المزالق الشائعة قبل أن تصل إلى الإنتاج.</p>
<p>إن فهم متى تلجأ إلى <code>useLayoutEffect</code> بدلًا من <code>useEffect</code> أمر بالغ الأهمية لبناء تطبيقات React عالية الأداء. الفرق الجوهري ليس فقط <em>متى</em> يعمل كل منهما—بل يتعلق بمنع التفاوتات البصرية التي تجعل تطبيقك يبدو معطوبًا في نظر المستخدمين.</p>
<h2 id="الفرق-الجوهري">الفرق الجوهري</h2>
<p>يتبع كلا الخطافين الواجهة البرمجية نفسها، لكن توقيت تنفيذهما مختلف تمامًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ useEffect: Runs asynchronously after DOM updates and paint</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Runs after the browser has painted the screen</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;DOM is painted, user can see changes&#x27;</span>);
}, []);

<span class="hljs-comment">// ✅ useLayoutEffect: Runs synchronously before paint</span>
<span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Runs after DOM mutations but before browser paint</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;DOM is updated, but user hasn&#x27;t seen changes yet&quot;</span>);
}, []);
</code></pre>
<p>فكّر في الأمر هكذا: <code>useEffect</code> يشبه إرسال بطاقة بريدية—تصل في النهاية، بعد الانتهاء من كل شيء آخر. أما <code>useLayoutEffect</code> فيشبه مكالمة هاتفية—تحدث فورًا وتعطّل كل شيء آخر حتى تنتهي.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>لكلا الخطافين توقيعان متطابقان في TypeScript، لكن آثار التوقيت لديهما تؤثر في كيفية تحديد أنواع اعتمادياتهما ودوال التنظيف.</p>
</blockquote>
<h2 id="متى-تستخدم-uselayouteffect">متى تستخدم <code>useLayoutEffect</code></h2>
<p>استخدم <code>useLayoutEffect</code> عندما تحتاج إلى:</p>
<ol>
<li><strong>قياس عناصر DOM</strong> قبل أن يرسم المتصفح</li>
<li><strong>تعديل الأنماط</strong> التي قد تسبب إزاحات تخطيط مرئية</li>
<li><strong>تحديث الحالة بشكل متزامن</strong> بناءً على قياسات DOM</li>
<li><strong>منع الوميض</strong> في الحركات أو الانتقالات</li>
</ol>
<p>إليك حالة استخدام شائعة من العالم الحقيقي™—قياس أبعاد عنصر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useLayoutEffect, useRef, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ElementDimensions</span> {
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> useMeasure&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(): [<span class="hljs-title class_">React</span>.<span class="hljs-property">RefObject</span>&lt;T&gt;, <span class="hljs-title class_">ElementDimensions</span>] {
  <span class="hljs-keyword">const</span> ref = useRef&lt;T&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [dimensions, setDimensions] = useState&lt;<span class="hljs-title class_">ElementDimensions</span>&gt;({
    <span class="hljs-attr">width</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!ref.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> measure = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> { offsetWidth, offsetHeight } = ref.<span class="hljs-property">current</span>!;
      <span class="hljs-title function_">setDimensions</span>({
        <span class="hljs-attr">width</span>: offsetWidth,
        <span class="hljs-attr">height</span>: offsetHeight,
      });
    };

    <span class="hljs-title function_">measure</span>(); <span class="hljs-comment">// Initial measurement</span>

    <span class="hljs-keyword">const</span> resizeObserver = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ResizeObserver</span>(measure);
    resizeObserver.<span class="hljs-title function_">observe</span>(ref.<span class="hljs-property">current</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      resizeObserver.<span class="hljs-title function_">disconnect</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> [ref, dimensions];
}
</code></pre>
<p>لاحظ أننا نستخدم <code>useLayoutEffect</code> هنا لأننا نحتاج إلى قياسات DOM <em>قبل</em> أن يرسم المتصفح. لو استخدمنا <code>useEffect</code>، لكان المكوّن يُرسم بـ <code>width: 0, height: 0</code> في البداية، ثم يقفز إلى الأبعاد الصحيحة—مما يسبب وميضًا بصريًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تساعد فحوصات null الصارمة في TypeScript على التقاط أخطاء الوصول إلى ref. تحقق دائمًا من وجود <code>ref.current</code> قبل استخدامه، حتى في تأثيرات التخطيط.</p>
</blockquote>
<h2 id="تحديد-أنواع-اعتماديات-التأثيرات">تحديد أنواع اعتماديات التأثيرات</h2>
<p>يتطلب كلا التأثيرين تحديد أنواع اعتمادياته بعناية. إليك كيفية تجنب المزالق الشائعة في TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Poorly typed dependencies</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// TypeScript can&#x27;t guarantee userId isn&#x27;t undefined here</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setUser);
  }, [userId]); <span class="hljs-comment">// This dependency could be undefined</span>

  <span class="hljs-keyword">return</span> user ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// ✅ Good: Properly typed with guards</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!userId) {
      <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> controller = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> fetchUser = <span class="hljs-title function_">async</span> (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>, {
          <span class="hljs-attr">signal</span>: controller.<span class="hljs-property">signal</span>,
        });

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to fetch user: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">userData</span>: <span class="hljs-title class_">User</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setUser</span>(userData);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; error.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error fetching user:&#x27;</span>, error);
          <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>);
        }
      }
    };

    <span class="hljs-title function_">fetchUser</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      controller.<span class="hljs-title function_">abort</span>();
    };
  }, [userId]); <span class="hljs-comment">// Now properly guarded against undefined</span>

  <span class="hljs-keyword">return</span> user ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="تحديد-أنواع-دوال-التنظيف">تحديد أنواع دوال التنظيف</h2>
<p>يمكن لكلا التأثيرين إرجاع دوال تنظيف، ويساعد TypeScript على ضمان تحديد أنواعها بشكل صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Properly typed cleanup with explicit return type</span>
<span class="hljs-title function_">useLayoutEffect</span>((): (<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>) | <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (!ref.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>; <span class="hljs-comment">// Early return, no cleanup needed</span>

  <span class="hljs-keyword">const</span> element = ref.<span class="hljs-property">current</span>;
  <span class="hljs-keyword">const</span> handleResize = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
    <span class="hljs-comment">// Handle resize logic</span>
  };

  element.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;resize&#x27;</span>, handleResize);

  <span class="hljs-comment">// TypeScript ensures this returns the correct cleanup type</span>
  <span class="hljs-keyword">return</span> (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
    element.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;resize&#x27;</span>, handleResize);
  };
}, []);
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تُعد أبدًا promise من دالة تنظيف تأثير. يتوقع React أن يكون التنظيف متزامنًا.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Returning a promise from cleanup</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">cleanup</span>(); <span class="hljs-comment">// TypeScript error: cleanup must be synchronous</span>
  };
}, []);

<span class="hljs-comment">// ✅ Good: Synchronous cleanup with async handling</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">cleanup</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Cleanup failed:&#x27;</span>, error);
    });
  };
}, []);
</code></pre>
<h2 id="اعتبارات-الأداء-وتحديد-الأنواع">اعتبارات الأداء وتحديد الأنواع</h2>
<p><code>useLayoutEffect</code> متزامن ويعطّل الرسم، لذلك يمكن أن يساعدنا TypeScript على أن نكون أكثر وعيًا بالعمليات المكلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExpensiveCalculationResult</span> {
  <span class="hljs-attr">result</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">computationTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// ❌ Bad: Expensive sync operation in useLayoutEffect</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadPerformance</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [result, setResult] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This blocks painting! Don&#x27;t do this.</span>
    <span class="hljs-keyword">const</span> expensive = <span class="hljs-title function_">heavyComputation</span>();
    <span class="hljs-title function_">setResult</span>(expensive);
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Move expensive work to useEffect</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodPerformance</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [result, setResult] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [isCalculating, setIsCalculating] = useState&lt;<span class="hljs-built_in">boolean</span>&gt;(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> performCalculation = <span class="hljs-title function_">async</span> (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
      <span class="hljs-title function_">setIsCalculating</span>(<span class="hljs-literal">true</span>);

      <span class="hljs-comment">// Use setTimeout to yield control back to the browser</span>
      <span class="hljs-keyword">const</span> calculation = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ExpensiveCalculationResult</span>&gt;(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
          <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();
          <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">heavyComputation</span>();
          <span class="hljs-keyword">const</span> computationTime = performance.<span class="hljs-title function_">now</span>() - start;

          <span class="hljs-title function_">resolve</span>({ result, computationTime });
        }, <span class="hljs-number">0</span>);
      });

      <span class="hljs-title function_">setResult</span>(calculation.<span class="hljs-property">result</span>);
      <span class="hljs-title function_">setIsCalculating</span>(<span class="hljs-literal">false</span>);
    };

    <span class="hljs-title function_">performCalculation</span>();
  }, []);

  <span class="hljs-keyword">if</span> (isCalculating) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Calculating...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="مزالق-typescript-الشائعة">مزالق TypeScript الشائعة</h2>
<h3 id="الإغلاقات-القديمة-مع-معالجات-الأحداث">الإغلاقات القديمة مع معالجات الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Stale closure captures old count value</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StaleClosureExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> handleKeyPress = (<span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span>): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Enter&#x27;</span>) {
        <span class="hljs-comment">// This captures the initial count value (0) forever</span>
        <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleKeyPress);

    <span class="hljs-keyword">return</span> (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleKeyPress);
    };
  }, []); <span class="hljs-comment">// Empty deps array creates stale closure</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Use functional updates to avoid stale closures</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FreshClosureExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> handleKeyPress = (<span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span>): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Enter&#x27;</span>) {
        <span class="hljs-comment">// Functional update always gets the latest state</span>
        <span class="hljs-title function_">setCount</span>(<span class="hljs-function"><span class="hljs-params">currentCount</span> =&gt;</span> currentCount + <span class="hljs-number">1</span>);
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleKeyPress);

    <span class="hljs-keyword">return</span> (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleKeyPress);
    };
  }, []); <span class="hljs-comment">// Now the empty deps array is safe</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="حراس-الأنواع-على-refcurrent">حراس الأنواع على ref.current</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Not checking ref.current exists</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UnsafeRefAccess</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// TypeScript error: Object is possibly &#x27;null&#x27;</span>
    inputRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Always guard ref access</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SafeRefAccess</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = inputRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!input) <span class="hljs-keyword">return</span>;

    input.<span class="hljs-title function_">focus</span>();

    <span class="hljs-comment">// TypeScript knows input is non-null in this block</span>
    <span class="hljs-keyword">const</span> handleFocus = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      input.<span class="hljs-title function_">select</span>(); <span class="hljs-comment">// Safe to access input here</span>
    };

    input.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;focus&#x27;</span>, handleFocus);

    <span class="hljs-keyword">return</span> (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
      input.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;focus&#x27;</span>, handleFocus);
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-تحديد-موضع-التلميح">مثال من العالم الحقيقي: تحديد موضع التلميح</h2>
<p>إليك مثالًا عمليًا يجمع بين تحديد الأنواع الصحيح و<code>useLayoutEffect</code> لتحديد موضع التلميح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Position</span> {
  <span class="hljs-attr">top</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">left</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TooltipProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">isVisible</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Tooltip</span>(<span class="hljs-params">{ children, content, isVisible }: <span class="hljs-title class_">TooltipProps</span></span>) {
  <span class="hljs-keyword">const</span> triggerRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> tooltipRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [position, setPosition] = useState&lt;<span class="hljs-title class_">Position</span>&gt;({ <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">left</span>: <span class="hljs-number">0</span> });

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!isVisible || !triggerRef.<span class="hljs-property">current</span> || !tooltipRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> calculatePosition = (): <span class="hljs-function"><span class="hljs-params">Position</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> triggerRect = triggerRef.<span class="hljs-property">current</span>!.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-keyword">const</span> tooltipRect = tooltipRef.<span class="hljs-property">current</span>!.<span class="hljs-title function_">getBoundingClientRect</span>();

      <span class="hljs-keyword">const</span> viewportWidth = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;
      <span class="hljs-keyword">const</span> viewportHeight = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerHeight</span>;

      <span class="hljs-keyword">let</span> top = triggerRect.<span class="hljs-property">bottom</span> + <span class="hljs-number">8</span>;
      <span class="hljs-keyword">let</span> left = triggerRect.<span class="hljs-property">left</span> + (triggerRect.<span class="hljs-property">width</span> / <span class="hljs-number">2</span>) - (tooltipRect.<span class="hljs-property">width</span> / <span class="hljs-number">2</span>);

      <span class="hljs-comment">// Prevent tooltip from going off-screen</span>
      <span class="hljs-keyword">if</span> (left &lt; <span class="hljs-number">8</span>) left = <span class="hljs-number">8</span>;
      <span class="hljs-keyword">if</span> (left + tooltipRect.<span class="hljs-property">width</span> &gt; viewportWidth - <span class="hljs-number">8</span>) {
        left = viewportWidth - tooltipRect.<span class="hljs-property">width</span> - <span class="hljs-number">8</span>;
      }

      <span class="hljs-keyword">if</span> (top + tooltipRect.<span class="hljs-property">height</span> &gt; viewportHeight - <span class="hljs-number">8</span>) {
        top = triggerRect.<span class="hljs-property">top</span> - tooltipRect.<span class="hljs-property">height</span> - <span class="hljs-number">8</span>;
      }

      <span class="hljs-keyword">return</span> { top, left };
    };

    <span class="hljs-keyword">const</span> newPosition = <span class="hljs-title function_">calculatePosition</span>();
    <span class="hljs-title function_">setPosition</span>(newPosition);
  }, [isVisible]); <span class="hljs-comment">// Recalculate when visibility changes</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{triggerRef}</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      {isVisible &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{tooltipRef}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tooltip&quot;</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
            <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">fixed</span>&#x27;,
            <span class="hljs-attr">top:</span> <span class="hljs-attr">position.top</span>,
            <span class="hljs-attr">left:</span> <span class="hljs-attr">position.left</span>,
          }}
        &gt;</span>
          {content}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}
</code></pre>
<p>يستخدم هذا المثال <code>useLayoutEffect</code> لأننا نحتاج إلى:</p>
<ol>
<li>قياس عنصري المُشغِّل والتلميح</li>
<li>حساب الموضع الأمثل</li>
<li>تطبيق الموضع قبل أن يرسم المتصفح</li>
</ol>
<p>استخدام <code>useEffect</code> هنا سيجعل التلميح يظهر لفترة وجيزة في الموضع الخاطئ قبل أن يقفز إلى المكان الصحيح.</p>
<h2 id="اختبار-تأثيرات-التخطيط">اختبار تأثيرات التخطيط</h2>
<p>يتطلب اختبار المكوّنات التي تستخدم <code>useLayoutEffect</code> اعتبارًا خاصًا لأنها تعمل بشكل متزامن:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { act } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;

<span class="hljs-comment">// Mock ResizeObserver for tests</span>
<span class="hljs-variable language_">global</span>.<span class="hljs-property">ResizeObserver</span> = jest.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockImplementation</span>(<span class="hljs-function">() =&gt;</span> ({
  <span class="hljs-attr">observe</span>: jest.<span class="hljs-title function_">fn</span>(),
  <span class="hljs-attr">unobserve</span>: jest.<span class="hljs-title function_">fn</span>(),
  <span class="hljs-attr">disconnect</span>: jest.<span class="hljs-title function_">fn</span>(),
}));

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;measures element dimensions synchronously&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">TestComponent</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> [ref, dimensions] = useMeasure&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;();

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
        <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;measured-element&quot;</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">200</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">100</span> }}
      &gt;</span>
        {dimensions.width}x{dimensions.height}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  };

  <span class="hljs-comment">// act() ensures layout effects run before assertions</span>
  <span class="hljs-title function_">act</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> /&gt;</span></span>);
  });

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;measured-element&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;200x100&#x27;</span>);
});
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>غلّف دائمًا عمليات الرسم التي تشغّل تأثيرات التخطيط داخل <code>act()</code> لتضمن اكتمالها قبل تنفيذ التحققات.</p>
</blockquote>
<h2 id="النقاط-الرئيسية">النقاط الرئيسية</h2>
<ul>
<li><strong>استخدم <code>useLayoutEffect</code></strong> عندما تحتاج إلى قياسات DOM متزامنة أو تحديثات أنماط تمنع الوميض البصري</li>
<li><strong>استخدم <code>useEffect</code></strong> للعمليات غير المتزامنة واستدعاءات API والآثار الجانبية التي لا تحتاج إلى تعطيل الرسم</li>
<li><strong>حدد أنواع اعتمادياتك دائمًا</strong> بشكل صريح واستخدم حراس الأنواع المناسبين لقيم ref والقيم القابلة لأن تكون null</li>
<li><strong>كن واعيًا بالأداء</strong>—<code>useLayoutEffect</code> يعطّل دورة الرسم في المتصفح</li>
<li><strong>اختبر تأثيرات التخطيط</strong> باستخدام <code>act()</code> لتضمن اكتمالها قبل التحققات</li>
</ul>
<p>غالبًا ما يتلخص الاختيار بين هذين الخطافين في تجربة المستخدم. إذا كان مستخدموك سيلاحظون قفزة بصرية أو وميضًا، فالجأ إلى <code>useLayoutEffect</code>. وإذا لم يلاحظوا التأخير، فالتزم بـ <code>useEffect</code> وأبقِ الخيط الرئيسي مستجيبًا.</p>
<p>مع تحديد الأنواع الصحيح في TypeScript، يمكنك التقاط المشكلات المحتملة مبكرًا وضمان تعامل تأثيراتك مع الحالات الحدية بأناقة—مما يؤدي إلى تطبيقات React أكثر قوة وأداءً وتبدو مصقولة لمستخدميك.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
