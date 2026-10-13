const s="hono",a="helpers",n="المساعدات",c="css",l="مساعد css",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"css",text:"css"},{depth:3,id:"التوسيع",text:"التوسيع"},{depth:3,id:"الأنماط-العامة",text:"الأنماط العامة"},{depth:2,id:"keyframes",text:"keyframes"},{depth:2,id:"cx",text:"cx"},{depth:2,id:"الاستخدام-بالاقتران-مع-الترويسات-الآمنة-الوسيط",text:"الاستخدام بالاقتران مع الترويسات الآمنة الوسيط"},{depth:2,id:"createcsscontext",text:"createCssContext"},{depth:3,id:"classnameslug",text:"classNameSlug"},{depth:3,id:"oninvalidslug",text:"onInvalidSlug"},{depth:2,id:"الأمان",text:"الأمان"},{depth:2,id:"نصائح",text:"نصائح"}],p=`<p>مُساعد CSS - <code>hono/css</code> - هو CSS in JS(X) المدمج في Hono.</p>
<p>يمكنك كتابة CSS في JSX داخل قالب نصي (template literal) في JavaScript يُسمّى <code>css</code>. القيمة المُرجَعة من <code>css</code> سيكون اسم الفئة (class name)، وهو مضبوط على قيمة خاصية class. حيث <code>&lt;Style /&gt;</code> سيحتوي المكوّن بعد ذلك على قيمة CSS.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { css, cx, keyframes, <span class="hljs-title class_">Style</span>, createCssContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/css&#x27;</span>
</code></pre>
<h2 id="css"><code>css</code> <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>يمكنك كتابة CSS في <code>css</code> قالب حرفي (template literal). في هذه الحالة، يستخدم <code>headerClass</code> كقيمة لـ <code>class</code> السمة. لا تنسَ إضافة <code>&lt;Style /&gt;</code> لأنه يحتوي على محتوى CSS.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> headerClass = css\`<span class="language-css">
    <span class="hljs-attribute">background-color</span>: orange;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
  \`</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Style</span> /&gt;</span><span class="language-css">
      &lt;/head&gt;</span></span>
      <span class="language-xml"><span class="language-css">&lt;<span class="hljs-selector-tag">body</span>&gt;
        &lt;<span class="hljs-selector-tag">h1</span> class={headerClass}&gt;Hello!&lt;/<span class="hljs-selector-tag">h1</span>&gt;
      &lt;/<span class="hljs-selector-tag">body</span>&gt;</span></span>
    
  )
})
</code></pre>
</div>
<p>يمكنك تنسيق الفئات الزائفة (pseudo-classes) مثل <code>:hover</code> باستخدام <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector">مُحدِّد التداخل</a>, <code>&amp;</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> buttonClass = css\`<span class="language-css">
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  &amp;<span class="hljs-selector-pseudo">:hover</span> {
    <span class="hljs-attribute">background-color</span>: red;
  }
\`</span>
</code></pre>
<h3 id="التوسيع">التوسيع</h3>
<p>يمكنك توسيع تعريف CSS عبر تضمين اسم الصنف (class name).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> baseClass = css\`<span class="language-css">
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">background-color</span>: blue;
\`</span>

<span class="hljs-keyword">const</span> header1Class = css\`<span class="language-css">
  </span><span class="hljs-subst">\${baseClass}</span><span class="language-css">
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3rem</span>;
\`</span>

<span class="hljs-keyword">const</span> header2Class = css\`<span class="language-css">
  </span><span class="hljs-subst">\${baseClass}</span><span class="language-css">
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2rem</span>;
\`</span>
</code></pre>
<p>بالإضافة إلى ذلك، صياغة <code>\${baseClass} {}</code> يتيح تعشيش الأصناف.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> headerClass = css\`<span class="language-css">
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">background-color</span>: blue;
\`</span>
<span class="hljs-keyword">const</span> containerClass = css\`<span class="language-css">
  </span><span class="hljs-subst">\${headerClass}</span><span class="language-css"> {
    <span class="hljs-selector-tag">h1</span> {
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3rem</span>;
    }
  }
\`</span>
<span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{containerClass}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{headerClass}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<h3 id="الأنماط-العامة">الأنماط العامة</h3>
<p>مُحدِّد زائف يُسمى <code>:-hono-global</code> يسمح لك بتعريف أنماط عامة.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> globalClass = css\`<span class="language-css">
  :-hono-global {
    <span class="hljs-selector-tag">html</span> {
      <span class="hljs-attribute">font-family</span>: Arial, Helvetica, sans-serif;
    }
  }
\`</span>

<span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{globalClass}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Today is a good day.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<p>أو يمكنك كتابة CSS في <code>&lt;Style /&gt;</code> مكوّن بـ <code>css</code> حرفي.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> renderer = <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children, title }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Style</span>&gt;</span><span class="language-css">{css\`
          <span class="hljs-selector-tag">html</span> {
            <span class="hljs-attribute">font-family</span>: Arial, Helvetica, sans-serif;
          }
        \`}</span><span class="hljs-tag">&lt;/<span class="hljs-name">Style</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<h2 id="keyframes"><code>keyframes</code> <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>يمكنك استخدام <code>keyframes</code> لكتابة محتويات <code>@keyframes</code>. في هذه الحالة، <code>fadeInAnimation</code> سيكون اسم الرسم المتحرك (animation).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> fadeInAnimation = keyframes<span class="hljs-string">\`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
\`</span>
<span class="hljs-keyword">const</span> headerClass = css\`<span class="language-css">
  <span class="hljs-attribute">animation-name</span>: </span><span class="hljs-subst">\${fadeInAnimation}</span><span class="language-css">;
  <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">2s</span>;
\`</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Header</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{headerClass}</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
</code></pre>
<h2 id="cx"><code>cx</code> <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>الـ <code>cx</code> يدمج اسمي الفئتين (class names).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> buttonClass = css\`<span class="language-css">
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
\`</span>
<span class="hljs-keyword">const</span> primaryClass = css\`<span class="language-css">
  <span class="hljs-attribute">background</span>: orange;
\`</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{cx(buttonClass,</span> <span class="hljs-attr">primaryClass</span>)}&gt;</span>Click!<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
)
</code></pre>
<p>يمكنه أيضًا تركيب سلاسل نصية بسيطة.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Header</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{cx(</span>&#x27;<span class="hljs-attr">h1</span>&#x27;, <span class="hljs-attr">primaryClass</span>)}&gt;</span>Hi<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
</code></pre>
<h2 id="الاستخدام-بالاقتران-مع-الترويسات-الآمنة-الوسيط">الاستخدام بالاقتران مع <a href="https://hono.dev/docs/middleware/builtin/secure-headers">الترويسات الآمنة</a> الوسيط</h2>
<p>إذا أردت استخدام مساعدات CSS (CSS helpers) مع <a href="https://hono.dev/docs/middleware/builtin/secure-headers">الترويسات الآمنة</a> الوسيط، يمكنك إضافة <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce"><code>nonce</code> السمة</a> إلى <code>&lt;Style nonce={c.get('secureHeadersNonce')} /&gt;</code> لتجنّب Content-Security-Policy الناتج عن مساعدات CSS.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { secureHeaders, <span class="hljs-variable constant_">NONCE</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/secure-headers&#x27;</span>

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">contentSecurityPolicy</span>: {
      <span class="hljs-comment">// Set the pre-defined nonce value to \`styleSrc\`:</span>
      <span class="hljs-attr">styleSrc</span>: [<span class="hljs-variable constant_">NONCE</span>],
    },
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> headerClass = css\`<span class="language-css">
    <span class="hljs-attribute">background-color</span>: orange;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
  \`</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        {/* Set the \`nonce\` attribute on the CSS helpers \`style\` and \`script\` elements */}
        <span class="hljs-tag">&lt;<span class="hljs-name">Style</span> <span class="hljs-attr">nonce</span>=<span class="hljs-string">{c.get(</span>&#x27;<span class="hljs-attr">secureHeadersNonce</span>&#x27;)} /&gt;</span><span class="language-css">
      &lt;/head&gt;</span></span>
      <span class="language-xml"><span class="language-css">&lt;<span class="hljs-selector-tag">body</span>&gt;
        &lt;<span class="hljs-selector-tag">h1</span> class={headerClass}&gt;Hello!&lt;/<span class="hljs-selector-tag">h1</span>&gt;
      &lt;/<span class="hljs-selector-tag">body</span>&gt;</span></span>
    
  )
})
</code></pre>
</div>
<h2 id="createcsscontext"><code>createCssContext</code> <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p><code>createCssContext</code> يُنشئ دوال مساعدة CSS (<code>css</code>, <code>cx</code>, <code>keyframes</code>, <code>viewTransition</code>, <code>Style</code>) مع سياق مخصص. يمكنك استخدامه لتخصيص معرف عنصر النمط (style) وأسماء الفئات المُنشأة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createCssContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/css&#x27;</span>

<span class="hljs-keyword">const</span> { css, cx, keyframes, <span class="hljs-title class_">Style</span> } = <span class="hljs-title function_">createCssContext</span>({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;my-app&#x27;</span>,
})
</code></pre>
<h3 id="classnameslug"><code>classNameSlug</code></h3>
<p>افتراضياً، تُولَّد أسماء أصناف CSS (class names) بالصيغة <code>css-1234567890</code>. يمكنك تخصيص هذا بتمرير <code>classNameSlug</code> الدالة.</p>
<p>تستقبل الدالة ثلاثة وسائط (arguments):</p>
<ul>
<li><code>hash</code> - اسم الفئة (class) المولّد الافتراضي (مثل <code>css-1234567890</code>)</li>
<li><code>label</code> - مُستخرَج من <code>/* comment */</code> عند بداية قالب CSS (سلسلة فارغة إن لم يوجد)</li>
<li><code>css</code> - سلسلة CSS المُصغّرة</li>
</ul>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> { css, <span class="hljs-title class_">Style</span> } = <span class="hljs-title function_">createCssContext</span>({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;my-styles&#x27;</span>,
  <span class="hljs-attr">classNameSlug</span>: <span class="hljs-function">(<span class="hljs-params">hash, label</span>) =&gt;</span> (label ? <span class="hljs-string">\`h-<span class="hljs-subst">\${label}</span>\`</span> : hash),
})

<span class="hljs-keyword">const</span> heroClass = css\`<span class="language-css">
  <span class="hljs-comment">/* hero-section */</span>
  <span class="hljs-attribute">background</span>: blue;
\`</span>
<span class="hljs-comment">// Generated class name: &quot;h-hero-section&quot;</span>
</code></pre>
<h3 id="oninvalidslug"><code>onInvalidSlug</code></h3>
<p>إذا كان <code>classNameSlug</code> أرجعت الدالة اسم فئة CSS غير صالح، يتم تسجيل تحذير افتراضيًا. يمكنك تخصيص هذا السلوك باستخدام <code>onInvalidSlug</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> { css, <span class="hljs-title class_">Style</span> } = <span class="hljs-title function_">createCssContext</span>({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;my-styles&#x27;</span>,
  <span class="hljs-attr">classNameSlug</span>: <span class="hljs-function">(<span class="hljs-params">hash, label</span>) =&gt;</span> label || hash,
  <span class="hljs-attr">onInvalidSlug</span>: <span class="hljs-function">(<span class="hljs-params">slug</span>) =&gt;</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid CSS class name: <span class="hljs-subst">\${slug}</span>\`</span>)
  },
})
</code></pre>
<h2 id="الأمان">الأمان</h2>
<p>أدوات CSS المساعدة هي واجهات برمجة لتأليف CSS: مثل مكتبات CSS-in-JS الأخرى، تُدرج القيم المُقحمة (interpolated) كـ <strong>CSS خام</strong>. تمنع الاختراق إلى HTML (علامات الاقتباس والخطوط المائلة العكسية و <code>&lt;/</code>)، لكن <code>{</code>, <code>}</code>، و <code>;</code> تمر مباشرةً لأنها CSS صالحة.</p>
<p>تعامل مع مساعدات CSS مثل بقية المصارف الخام (<code>html</code>, <code>raw</code>, <code>rawCssString</code>): <strong>لا تمرر مدخلات غير موثوقة إليها مباشرة.</strong> القيام بذلك يسمح بحقن CSS. تحقق من صحة المدخلات مقابل قائمة مسموح بها (allowlist) أولًا.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">ALLOWED_COLORS</span> = [<span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-string">&#x27;green&#x27;</span>, <span class="hljs-string">&#x27;blue&#x27;</span>]
<span class="hljs-keyword">const</span> color = <span class="hljs-variable constant_">ALLOWED_COLORS</span>.<span class="hljs-title function_">includes</span>(input) ? input : <span class="hljs-string">&#x27;black&#x27;</span>
<span class="hljs-keyword">const</span> headerClass = css\`<span class="language-css">
  <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${color}</span><span class="language-css">;
\`</span>
</code></pre>
<h2 id="نصائح">نصائح</h2>
<p>إذا كنت تستخدم VS Code، فيمكنك استخدام <a href="https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components">vscode-styled-components</a> لتلوين الصيغة (Syntax highlighting) و IntelliSense للعبارات النصية الموسومة بـ CSS (tagged literals).</p>
<p><img src="/arabic-cs-library/images/hono/css-ss.png" alt=""></p>
`,t={book:s,chapter:a,chapterTitle:n,slug:"css",title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,p as html,c as slug,l as title};
