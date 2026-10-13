const s="hono",n="guides",a="الأدلة",t="jsx-dom",e="مكوّنات العميل",l=[{depth:2,id:"مثال-العداد",text:"مثال العدّاد"},{depth:2,id:"render",text:"render()"},{depth:2,id:"خطافات-متوافقة-مع-react",text:"خطافات متوافقة مع React"},{depth:2,id:"startviewtransition-العائلة",text:"startViewTransition() العائلة"},{depth:3,id:"1-مثال-بسيط-جدا",text:"1. مثال بسيط جدًا"},{depth:3,id:"2-استخدام-viewtransition-مع-keyframes",text:"2. استخدام viewTransition() مع keyframes()"},{depth:3,id:"3-استخدام-useviewtransition",text:"3. استخدام useViewTransition"},{depth:2,id:"ال-honojsxdom-بيئة-التشغيل",text:"ال hono/jsx/dom بيئة التشغيل"}],o=`<p><code>hono/jsx</code> يدعم ليس فقط جانب الخادم بل أيضًا جانب العميل. هذا يعني أنه من الممكن إنشاء واجهة مستخدم تفاعلية تعمل في المتصفح. نسميها مكونات العميل (Client Components) أو <code>hono/jsx/dom</code>.</p>
<p>إنه سريع وصغير جدًا. برنامج العدّاد في <code>hono/jsx/dom</code> بحجم 2.8KB فقط مع ضغط Brotli، لكن 47.8KB لـ React.</p>
<p>يقدّم هذا القسم ميزات خاصة بمكوّنات العميل (Client Components).</p>
<h2 id="مثال-العداد">مثال العدّاد</h2>
<p>فيما يلي مثال على عداد بسيط، نفس الكود يعمل كما في React.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx/dom&#x27;</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>)
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;Increment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
}

<span class="hljs-keyword">const</span> root = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>)
<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>, root)
</code></pre>
<h2 id="render"><code>render()</code></h2>
<p>يمكنك استخدام <code>render()</code> لإدراج مكوّنات JSX داخل عنصر HTML محدَّد.</p>
<pre><code class="language-tsx"><span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span></span>, container)
</code></pre>
<p>يمكنك رؤية كود المثال الكامل هنا: <a href="https://github.com/honojs/examples/tree/main/hono-vite-jsx">مثال العدّاد</a>.</p>
<h2 id="خطافات-متوافقة-مع-react">خطافات متوافقة مع React</h2>
<p>يحتوي hono/jsx/dom على خطافات (Hooks) متوافقة أو متوافقة جزئيًا مع React. يمكنك التعرف على هذه الواجهات البرمجية (APIs) بالنظر إلى <a href="https://react.dev/reference/react/hooks">وثائق React</a>.</p>
<ul>
<li><code>useState()</code></li>
<li><code>useEffect()</code></li>
<li><code>useRef()</code></li>
<li><code>useCallback()</code></li>
<li><code>use()</code></li>
<li><code>startTransition()</code></li>
<li><code>useTransition()</code></li>
<li><code>useDeferredValue()</code></li>
<li><code>useMemo()</code></li>
<li><code>useLayoutEffect()</code></li>
<li><code>useReducer()</code></li>
<li><code>useDebugValue()</code></li>
<li><code>createElement()</code></li>
<li><code>memo()</code></li>
<li><code>isValidElement()</code></li>
<li><code>useId()</code></li>
<li><code>createRef()</code></li>
<li><code>forwardRef()</code></li>
<li><code>useImperativeHandle()</code></li>
<li><code>useSyncExternalStore()</code></li>
<li><code>useInsertionEffect()</code></li>
<li><code>useFormStatus()</code></li>
<li><code>useActionState()</code></li>
<li><code>useOptimistic()</code></li>
</ul>
<h2 id="startviewtransition-العائلة"><code>startViewTransition()</code> العائلة</h2>
<p>الـ <code>startViewTransition()</code> تحتوي العائلة على خطافات (hooks) ودوال أصلية للتعامل مع <a href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API">View Transitions API</a> بسهولة. توضّح الأمثلة أدناه كيفية استخدامها.</p>
<h3 id="1-مثال-بسيط-جدا">1. مثال بسيط جدًا</h3>
<p>يمكنك كتابة انتقال (transition) باستخدام <code>document.startViewTransition</code> قريبًا باستخدام <code>startViewTransition()</code>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useState, startViewTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>
<span class="hljs-keyword">import</span> { css, <span class="hljs-title class_">Style</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/css&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [showLargeImage, setShowLargeImage] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>)
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Style</span> /&gt;</span><span class="language-css">
      &lt;<span class="hljs-selector-tag">button</span>
        onClick={() =&gt;
          startViewTransition(() =&gt;
            setShowLargeImage((state) =&gt; !state)
          )
        }
      &gt;
        Click!
      &lt;/<span class="hljs-selector-tag">button</span>&gt;
      &lt;<span class="hljs-selector-tag">div</span>&gt;
        {!showLargeImage ? (
          &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-attribute">src</span>=&#x27;https://hono.dev/images/logo.png<span class="hljs-string">&#x27; /&gt;
        ) : (
          &lt;div
            class={css\`
              background: url(&#x27;</span>https://hono.dev/images/logo-large.png<span class="hljs-string">&#x27;);
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
            \`}
          &gt;&lt;/div&gt;
        )}
      &lt;/div&gt;
    &lt;/&gt;</span></span></span>
  )
}
</code></pre>
<h3 id="2-استخدام-viewtransition-مع-keyframes">2. استخدام <code>viewTransition()</code> مع <code>keyframes()</code></h3>
<p>الـ <code>viewTransition()</code> تسمح لك الدالة بالحصول على المعرّف الفريد <code>view-transition-name</code>.</p>
<p>يمكنك استخدامه مع <code>keyframes()</code>، الـ <code>::view-transition-old()</code> يُحوَّل إلى <code>::view-transition-old(\${uniqueName))</code>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useState, startViewTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>
<span class="hljs-keyword">import</span> { viewTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx/dom/css&#x27;</span>
<span class="hljs-keyword">import</span> { css, keyframes, <span class="hljs-title class_">Style</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/css&#x27;</span>

<span class="hljs-keyword">const</span> rotate = keyframes<span class="hljs-string">\`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
\`</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [showLargeImage, setShowLargeImage] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>)
  <span class="hljs-keyword">const</span> [transitionNameClass] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-title function_">viewTransition</span>(css\`<span class="language-css">
      ::<span class="hljs-built_in">view-transition-old</span>() {
        <span class="hljs-attribute">animation-name</span>: </span><span class="hljs-subst">\${rotate}</span><span class="language-css">;
      }
      ::<span class="hljs-built_in">view-transition-new</span>() {
        <span class="hljs-attribute">animation-name</span>: </span><span class="hljs-subst">\${rotate}</span><span class="language-css">;
      }
    \`</span>)
  )
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Style</span> /&gt;</span><span class="language-css">
      &lt;<span class="hljs-selector-tag">button</span>
        onClick={() =&gt;
          startViewTransition(() =&gt;
            setShowLargeImage((state) =&gt; !state)
          )
        }
      &gt;
        Click!
      &lt;/<span class="hljs-selector-tag">button</span>&gt;
      &lt;<span class="hljs-selector-tag">div</span>&gt;
        {!showLargeImage ? (
          &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-attribute">src</span>=&#x27;https://hono.dev/images/logo.png<span class="hljs-string">&#x27; /&gt;
        ) : (
          &lt;div
            class={css\`
              \${transitionNameClass}
              background: url(&#x27;</span>https://hono.dev/images/logo-large.png<span class="hljs-string">&#x27;);
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
            \`}
          &gt;&lt;/div&gt;
        )}
      &lt;/div&gt;
    &lt;/&gt;</span></span></span>
  )
}
</code></pre>
<h3 id="3-استخدام-useviewtransition">3. استخدام <code>useViewTransition</code></h3>
<p>إذا أردت تغيير النمط (style) فقط أثناء الحركة (animation). يمكنك استخدام <code>useViewTransition()</code>. تُرجع هذه الخطافة <code>[boolean, (callback: () =&gt; void) =&gt; void]</code>، وهي <code>isUpdating</code> الخيار و <code>startViewTransition()</code> الدالة.</p>
<p>عند استخدام هذا الخطاف (hook)، يتم تقييم المكوّن (Component) في الوقتين التاليين.</p>
<ul>
<li>داخل دالة الاستدعاء لاستدعاء <code>startViewTransition()</code>.</li>
<li>عندما <a href="https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/finished">الـ <code>finish</code> يصبح الوعد (promise) منجَزًا</a></li>
</ul>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useState, useViewTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>
<span class="hljs-keyword">import</span> { viewTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx/dom/css&#x27;</span>
<span class="hljs-keyword">import</span> { css, keyframes, <span class="hljs-title class_">Style</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/css&#x27;</span>

<span class="hljs-keyword">const</span> rotate = keyframes<span class="hljs-string">\`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
\`</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isUpdating, startViewTransition] = <span class="hljs-title function_">useViewTransition</span>()
  <span class="hljs-keyword">const</span> [showLargeImage, setShowLargeImage] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>)
  <span class="hljs-keyword">const</span> [transitionNameClass] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-title function_">viewTransition</span>(css\`<span class="language-css">
      ::<span class="hljs-built_in">view-transition-old</span>() {
        <span class="hljs-attribute">animation-name</span>: </span><span class="hljs-subst">\${rotate}</span><span class="language-css">;
      }
      ::<span class="hljs-built_in">view-transition-new</span>() {
        <span class="hljs-attribute">animation-name</span>: </span><span class="hljs-subst">\${rotate}</span><span class="language-css">;
      }
    \`</span>)
  )
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Style</span> /&gt;</span><span class="language-css">
      &lt;<span class="hljs-selector-tag">button</span>
        onClick={() =&gt;
          startViewTransition(() =&gt;
            setShowLargeImage((state) =&gt; !state)
          )
        }
      &gt;
        Click!
      &lt;/<span class="hljs-selector-tag">button</span>&gt;
      &lt;<span class="hljs-selector-tag">div</span>&gt;
        {!showLargeImage ? (
          &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-attribute">src</span>=&#x27;https://hono.dev/images/logo.png<span class="hljs-string">&#x27; /&gt;
        ) : (
          &lt;div
            class={css\`
              \${transitionNameClass}
              background: url(&#x27;</span>https://hono.dev/images/logo-large.png<span class="hljs-string">&#x27;);
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
              position: relative;
              \${isUpdating &amp;&amp;
              css\`
                &amp;:before {
                  content: &#x27;</span>Loading...<span class="hljs-string">&#x27;;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                }
              \`}
            \`}
          &gt;&lt;/div&gt;
        )}
      &lt;/div&gt;
    &lt;/&gt;</span></span></span>
  )
}
</code></pre>
<h2 id="ال-honojsxdom-بيئة-التشغيل">ال <code>hono/jsx/dom</code> بيئة التشغيل</h2>
<p>يوجد وقت تشغيل JSX صغير (JSX Runtime) لمكوّنات العميل (Client Components). استخدامه ينتج حزمًا (bundles) أصغر من استخدام <code>hono/jsx</code>. حدِّد <code>hono/jsx/dom</code> في <code>tsconfig.json</code>. بالنسبة إلى Deno، عدّل deno.json.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsxImportSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;hono/jsx/dom&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بدلاً من ذلك، يمكنك تحديد <code>hono/jsx/dom</code> في خيارات تحويل esbuild في <code>vite.config.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">esbuild</span>: {
    <span class="hljs-attr">jsxImportSource</span>: <span class="hljs-string">&#x27;hono/jsx/dom&#x27;</span>,
  },
})
</code></pre>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,o as html,t as slug,e as title};
