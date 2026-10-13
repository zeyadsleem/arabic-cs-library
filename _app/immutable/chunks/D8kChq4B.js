const s="hono",a="guides",n="الأدلة",c="jsx",l="`JSX`",p=[{depth:2,id:"الإعدادات",text:"الإعدادات"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"رفع-البيانات-الوصفية",text:"رفع البيانات الوصفية"},{depth:2,id:"fragment",text:"Fragment"},{depth:2,id:"propswithchildren",text:"PropsWithChildren"},{depth:2,id:"إدراج-html-خام",text:"إدراج HTML خام"},{depth:2,id:"الحفظ-المؤقت",text:"الحفظ المؤقت"},{depth:2,id:"السياق",text:"السياق"},{depth:2,id:"مكون-غير-متزامن",text:"مكوّن غير متزامن"},{depth:2,id:"suspense",text:"Suspense"},{depth:2,id:"errorboundary",text:"ErrorBoundary"},{depth:2,id:"streamingcontext",text:"StreamingContext"},{depth:2,id:"التكامل-مع-البرمجية-الوسيطة-html",text:"التكامل مع البرمجية الوسيطة html"},{depth:2,id:"مع-برمجية-وسيطة-لعرض-jsx",text:"مع برمجية وسيطة لعرض JSX"},{depth:2,id:"تجاوز-تعريفات-الأنواع",text:"تجاوز تعريفات الأنواع"}],t=`<p>يمكنك كتابة HTML ببنية JSX باستخدام <code>hono/jsx</code>.</p>
<p>على الرغم من <code>hono/jsx</code> يعمل على العميل، وستستخدمه غالبًا عند تصيير المحتوى على جانب الخادم. إليك بعض الأمور المتعلقة بـ JSX المشتركة بين الخادم والعميل.</p>
<h2 id="الإعدادات">الإعدادات</h2>
<p>لاستخدام JSX، عدّل <code>tsconfig.json</code>:</p>
<p><code>tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsxImportSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;hono/jsx&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بدلًا من ذلك، استخدم توجيهات pragma:</p>
<pre><code class="language-ts"><span class="hljs-comment">/** <span class="hljs-doctag">@jsx</span> jsx */</span>
<span class="hljs-comment">/** <span class="hljs-doctag">@jsxImportSource</span> hono/jsx */</span>
</code></pre>
<p>بالنسبة إلى Deno، عليك تعديل <code>deno.json</code> بدلاً من <code>tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;precompile&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsxImportSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@hono/hono/jsx&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>إذا كنت قادمًا مباشرةً من <a href="https://hono.dev/docs/#quick-start">البدء السريع</a>، يحتوي الملف الرئيسي على <code>.ts</code> الامتداد - تحتاج إلى تغييره إلى <code>.tsx</code> - وإلا فلن تتمكن من تشغيل التطبيق إطلاقًا. يجب عليك أيضًا تعديل <code>package.json</code> (أو <code>deno.json</code> إذا كنت تستخدم Deno) لتعكس ذلك التغيير (على سبيل المثال، بدلًا من وجود <code>bun run --hot src/index.ts</code> في نص التطوير (dev script)، ينبغي أن يكون لديك <code>bun run --hot src/index.tsx</code>).</p>
<p><code>index.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">FC</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Layout</span>: <span class="hljs-variable constant_">FC</span> = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Top</span>: <span class="hljs-variable constant_">FC</span>&lt;{ <span class="hljs-attr">messages</span>: <span class="hljs-built_in">string</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: {
  messages: <span class="hljs-built_in">string</span>[]
}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Hono!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {props.messages.map((message) =&gt; {
          return <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{message}!!<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        })}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
  )
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> messages = [<span class="hljs-string">&#x27;Good Morning&#x27;</span>, <span class="hljs-string">&#x27;Good Evening&#x27;</span>, <span class="hljs-string">&#x27;Good Night&#x27;</span>]
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Top</span> <span class="hljs-attr">messages</span>=<span class="hljs-string">{messages}</span> /&gt;</span></span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h2 id="رفع-البيانات-الوصفية">رفع البيانات الوصفية</h2>
<p>يمكنك كتابة وسوم البيانات الوصفية للمستند مثل <code>&lt;title&gt;</code>, <code>&lt;link&gt;</code>، و <code>&lt;meta&gt;</code> مباشرة داخل مكوناتك. سيتم رفع هذه الوسوم (tags) تلقائيًا إلى <code>&lt;head&gt;</code> قسم من المستند. يكون هذا مفيداً بشكل خاص عندما <code>&lt;head&gt;</code> يتم عرض العنصر بعيدًا عن المكوّن الذي يحدد البيانات الوصفية (metadata) المناسبة.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">setRenderer</span>(<span class="hljs-function">(<span class="hljs-params">content</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>About Page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x27;description&#x27;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&#x27;This is the about page.&#x27;</span> /&gt;</span>
      about page content
    <span class="hljs-tag">&lt;/&gt;</span></span>
  )
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>عند حدوث الرفع (hoisting)، لا تتم إزالة العناصر الموجودة. تتم إضافة العناصر الظاهرة لاحقًا إلى النهاية. على سبيل المثال، إذا كان لديك <code>&lt;title&gt;Default&lt;/title&gt;</code> في <code>&lt;head&gt;</code> ويُصيّر مكوّن <code>&lt;title&gt;Page Title&lt;/title&gt;</code>، سيظهر كلا العنوانين في head.</p>
<h2 id="fragment">Fragment</h2>
<p>استخدم Fragment لتجميع عناصر متعددة دون إضافة عُقد (nodes) إضافية:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Fragment</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">List</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Fragment</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>first child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>second child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>third child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Fragment</span>&gt;</span></span>
)
</code></pre>
<p>أو يمكنك كتابتها باستخدام <code>&lt;&gt;&lt;/&gt;</code> إذا أُعدّ بشكل صحيح.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-title function_">List</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>first child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>second child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>third child<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/&gt;</span></span>
)
</code></pre>
<h2 id="propswithchildren"><code>PropsWithChildren</code></h2>
<p>يمكنك استخدام <code>PropsWithChildren</code> لاستنتاج عنصر فرعي (child element) بشكل صحيح في مكوّن دالة (function component).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PropsWithChildren</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Post</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Component</span>(<span class="hljs-params">{ title, children }: <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">Post</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
</code></pre>
<h2 id="إدراج-html-خام">إدراج HTML خام</h2>
<p>لإدراج HTML مباشرة، استخدم <code>dangerouslySetInnerHTML</code>:</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> inner = { <span class="hljs-attr">__html</span>: <span class="hljs-string">&#x27;JSX &amp;middot; SSR&#x27;</span> }
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Div</span> = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{inner}</span> /&gt;</span></span>
})
</code></pre>
<h2 id="الحفظ-المؤقت">الحفظ المؤقت</h2>
<p>حسِّن مكوّناتك عبر تخزين النصوص المحسوبة مؤقتاً (memoizing) باستخدام <code>memo</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { memo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Header</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>Welcome to Hono<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>)
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Footer</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>Powered by Hono<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></span>)
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Layout</span> = (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hono is cool!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre>
<h2 id="السياق">السياق</h2>
<p>باستخدام <code>useContext</code>، يمكنك مشاركة البيانات عالميًا عبر أي مستوى من شجرة المكونات دون تمرير القيم عبر الخصائص (props).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">FC</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>
<span class="hljs-keyword">import</span> { createContext, useContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span>

<span class="hljs-keyword">const</span> themes = {
  <span class="hljs-attr">light</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#000000&#x27;</span>,
    <span class="hljs-attr">background</span>: <span class="hljs-string">&#x27;#eeeeee&#x27;</span>,
  },
  <span class="hljs-attr">dark</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;#ffffff&#x27;</span>,
    <span class="hljs-attr">background</span>: <span class="hljs-string">&#x27;#222222&#x27;</span>,
  },
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = <span class="hljs-title function_">createContext</span>(themes.<span class="hljs-property">light</span>)

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-variable constant_">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">ThemeContext</span>)
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{theme}</span>&gt;</span>Push!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Toolbar</span>: <span class="hljs-variable constant_">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}

<span class="hljs-comment">// ...</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{themes.dark}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Toolbar</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
})
</code></pre>
<h2 id="مكون-غير-متزامن">مكوّن غير متزامن</h2>
<p><code>hono/jsx</code> يدعم مكوّنًا غير متزامن، لذا يمكنك استخدام <code>async</code>/<code>await</code> في مكوّنك.
إذا قمت بعرضه باستخدام <code>c.html()</code>، سينتظر تلقائيًا.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-title function_">AsyncComponent</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">1000</span>)) <span class="hljs-comment">// sleep 1s</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Done!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">AsyncComponent</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<h2 id="suspense">Suspense <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>الشبيه بـ <code>React</code> <code>Suspense</code> الميزة متاحة.
إذا قمت بتغليف المكوّن غير المتزامن بـ <code>Suspense</code>، سيتم عرض المحتوى في الاحتياط (fallback) أولًا، وبمجرد حل الوعد (Promise)، سيتم عرض المحتوى المُنتظَر.
يمكنك استخدامه مع <code>renderToReadableStream()</code>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { renderToReadableStream, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx/streaming&#x27;</span>

<span class="hljs-comment">//...</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> stream = <span class="hljs-title function_">renderToReadableStream</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">body</span>(stream, {
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html; charset=UTF-8&#x27;</span>,
      <span class="hljs-string">&#x27;Transfer-Encoding&#x27;</span>: <span class="hljs-string">&#x27;chunked&#x27;</span>,
    },
  })
})
</code></pre>
<h2 id="errorboundary">ErrorBoundary <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>يمكنك التقاط الأخطاء في المكوّنات الفرعية باستخدام <code>ErrorBoundary</code>.</p>
<p>في المثال أدناه، سيعرض المحتوى المحدَّد في <code>fallback</code> إذا حدث خطأ.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SyncComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Error&#x27;</span>)
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/sync&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Out of Service<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">SyncComponent</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<p><code>ErrorBoundary</code> يمكن استخدامه أيضًا مع المكوّنات غير المتزامنة و <code>Suspense</code>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">2000</span>))
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Error&#x27;</span>)
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/with-suspense&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Out of Service<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">AsyncComponent</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<h2 id="streamingcontext">StreamingContext <Badge style="vertical-align: middle;" type="warning" text="Experimental" /></h2>
<p>يمكنك استخدام <code>StreamingContext</code> لتوفير تهيئة لمكوّنات البث (streaming) مثل <code>Suspense</code> و <code>ErrorBoundary</code>. هذا مفيد لإضافة قيم nonce إلى وسوم السكربت (script tags) الناتجة عن هذه المكونات لسياسة أمان المحتوى (CSP).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span>, <span class="hljs-title class_">StreamingContext</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx/streaming&#x27;</span>

<span class="hljs-comment">// ...</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> stream = <span class="hljs-title function_">renderToReadableStream</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">StreamingContext</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">scriptNonce:</span> &#x27;<span class="hljs-attr">random-nonce-value</span>&#x27; }}
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">AsyncComponent</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">StreamingContext</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )

  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">body</span>(stream, {
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html; charset=UTF-8&#x27;</span>,
      <span class="hljs-string">&#x27;Transfer-Encoding&#x27;</span>: <span class="hljs-string">&#x27;chunked&#x27;</span>,
      <span class="hljs-string">&#x27;Content-Security-Policy&#x27;</span>:
        <span class="hljs-string">&quot;script-src &#x27;nonce-random-nonce-value&#x27;&quot;</span>,
    },
  })
})
</code></pre>
<p>الـ <code>scriptNonce</code> ستُضاف القيمة تلقائيًا إلى أي <code>&lt;script&gt;</code> الوسوم المولَّدة بواسطة <code>Suspense</code> و <code>ErrorBoundary</code> المكوّنات.</p>
<h2 id="التكامل-مع-البرمجية-الوسيطة-html">التكامل مع البرمجية الوسيطة html</h2>
<p>اجمع بين وسيطتي JSX وHTML للحصول على قوالب (templating) قوية.
للحصول على تفاصيل متعمقة، راجع <a href="https://hono.dev/docs/helpers/html">توثيق وسيط HTML</a>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { html } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/html&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SiteData</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">children</span>?: <span class="hljs-built_in">any</span>
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Layout</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">SiteData</span></span>) =&gt;
  html\`<span class="language-xml"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
    
      <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span></span><span class="hljs-subst">\${props.title}</span><span class="language-xml"><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        </span><span class="hljs-subst">\${props.children}</span><span class="language-xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    \`</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Content</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: { siteData: SiteData; name: <span class="hljs-built_in">string</span> }</span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span> {<span class="hljs-attr">...props.siteData</span>}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:name&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { name } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>()
  <span class="hljs-keyword">const</span> props = {
    <span class="hljs-attr">name</span>: name,
    <span class="hljs-attr">siteData</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;JSX with html sample&#x27;</span>,
    },
  }
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Content</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h2 id="مع-برمجية-وسيطة-لعرض-jsx">مع برمجية وسيطة لعرض JSX</h2>
<p>الـ <a href="https://hono.dev/docs/middleware/builtin/jsx-renderer">البرمجية الوسيطة JSX Renderer</a> يتيح لك إنشاء صفحات HTML بسهولة أكبر باستخدام JSX.</p>
<h2 id="تجاوز-تعريفات-الأنواع">تجاوز تعريفات الأنواع</h2>
<p>يمكنك تجاوز تعريف النوع (type definition) لإضافة عناصرك وسماتك المخصصة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono/jsx&#x27;</span> {
  <span class="hljs-keyword">namespace</span> <span class="hljs-title class_">JSX</span> {
    <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IntrinsicElements</span> {
      <span class="hljs-string">&#x27;my-custom-element&#x27;</span>: <span class="hljs-title class_">HTMLAttributes</span> &amp; {
        <span class="hljs-string">&#x27;x-event&#x27;</span>?: <span class="hljs-string">&#x27;click&#x27;</span> | <span class="hljs-string">&#x27;scroll&#x27;</span>
      }
    }
  }
}
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:"jsx",title:l,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,t as html,c as slug,l as title};
