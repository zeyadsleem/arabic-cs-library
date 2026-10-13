const s="hono",a="middleware-builtin",n="الوسائط المدمجة",l="jsx-renderer",p="البرمجية الوسيطة JSX Renderer",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"doctype-boolean-string",text:"docType: boolean | string"},{depth:3,id:"stream-boolean-recordltstring-stringgt",text:"stream: boolean | Record&lt;string, string&gt;"},{depth:3,id:"خيارات-قائمة-على-الدوال",text:"خيارات قائمة على الدوال"},{depth:2,id:"التخطيطات-المتداخلة",text:"التخطيطات المتداخلة"},{depth:2,id:"userequestcontext",text:"useRequestContext()"},{depth:2,id:"التوسيع-contextrenderer",text:"التوسيع ContextRenderer"}],e=`<p>تتيح لك وسيطة عارض JSX (JSX Renderer Middleware) إعداد التخطيط (layout) عند عرض JSX باستخدام <code>c.render()</code> الدالة، دون الحاجة إلى استخدام <code>c.setRenderer()</code>. بالإضافة إلى ذلك، يتيح الوصول إلى نسخ من Context داخل المكونات من خلال استخدام <code>useRequestContext()</code>.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { jsxRenderer, useRequestContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx-renderer&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-jsx"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/page/*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page/about&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>About me!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>)
})
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="doctype-boolean-string"><Badge type="info" text="optional" /> docType: <code>boolean</code> | <code>string</code></h3>
<p>إذا كنت لا تريد إضافة DOCTYPE في بداية HTML، فاضبط <code>docType</code> الخيار إلى <code>false</code>.</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(
    <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
        
      )
    },
    { <span class="hljs-attr">docType</span>: <span class="hljs-literal">false</span> }
  )
)
</code></pre>
<p>ويمكنك تحديد DOCTYPE.</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(
    <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
        
      )
    },
    {
      <span class="hljs-attr">docType</span>:
        <span class="hljs-string">&#x27;&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.1//EN&quot; &quot;http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd&quot;&gt;&#x27;</span>,
    }
  )
)
</code></pre>
<h3 id="stream-boolean-recordltstring-stringgt"><Badge type="info" text="optional" /> stream: <code>boolean</code> | <code>Record&lt;string, string&gt;</code></h3>
<p>إذا ضبطته على <code>true</code> أو قدم قيمة سجل (Record)، فسيتم عرضها كاستجابة بث (streaming response).</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-title function_">AsyncComponent</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">1000</span>)) <span class="hljs-comment">// sleep 1s</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hi!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(
    <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>SSR Streaming<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            {children}
          <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
        
      )
    },
    { <span class="hljs-attr">stream</span>: <span class="hljs-literal">true</span> }
  )
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">AsyncComponent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  )
})
</code></pre>
<p>إذا <code>true</code> مضبوط، تُضاف الترويسات التالية:</p>
<pre><code class="language-ts">{
  <span class="hljs-string">&#x27;Transfer-Encoding&#x27;</span>: <span class="hljs-string">&#x27;chunked&#x27;</span>,
  <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html; charset=UTF-8&#x27;</span>,
  <span class="hljs-string">&#x27;Content-Encoding&#x27;</span>: <span class="hljs-string">&#x27;Identity&#x27;</span>
}
</code></pre>
<p>يمكنك تخصيص قيم الرؤوس (headers) عن طريق تحديد قيم السجل (Record).</p>
<h3 id="خيارات-قائمة-على-الدوال">خيارات قائمة على الدوال</h3>
<p>يمكنك تمرير دالة تستقبل <code>Context</code> كائنًا بدلًا من كائن خيارات ثابت. يتيح لك هذا تعيين الخيارات ديناميكيًا بناءً على سياق الطلب، مثل متغيرات البيئة أو معاملات الطلب.</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(
    <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
        
      )
    },
    <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> ({
      <span class="hljs-attr">stream</span>: c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Enable-Streaming&#x27;</span>) === <span class="hljs-string">&#x27;true&#x27;</span>,
    })
  )
)
</code></pre>
<p>كمثال ملموس، يمكنك استخدام هذا لتعطيل البث (streaming) عند توليد المواقع الثابتة (SSG) باستخدام <code>&lt;Suspense&gt;</code>، باستخدام <a href="https://hono.dev/docs/helpers/ssg#isssgcontext"><code>isSSGContext</code></a> helper:</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(
    <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&#x27;<span class="hljs-attr">loading...</span>&#x27;}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
    },
    <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> ({
      <span class="hljs-attr">stream</span>: !<span class="hljs-title function_">isSSGContext</span>(c),
    })
  )
)
</code></pre>
<h2 id="التخطيطات-المتداخلة">التخطيطات المتداخلة</h2>
<p>الـ <code>Layout</code> تتيح المكوّنة (component) تعشيش التخطيطات (layouts).</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
)

<span class="hljs-keyword">const</span> blog = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
blog.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children, Layout }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>Blog Menu<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
    )
  })
)

app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/blog&#x27;</span>, blog)
</code></pre>
<h2 id="userequestcontext"><code>useRequestContext()</code></h2>
<p><code>useRequestContext()</code> يُرجع نسخة من Context.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useRequestContext, jsxRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx-renderer&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">jsxRenderer</span>())

<span class="hljs-keyword">const</span> <span class="hljs-title class_">RequestUrlBadge</span>: <span class="hljs-variable constant_">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> c = <span class="hljs-title function_">useRequestContext</span>()
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>{c.req.url}<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span></span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page/info&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      You are accessing: <span class="hljs-tag">&lt;<span class="hljs-name">RequestUrlBadge</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
})
</code></pre>
<p>لا يمكنك استخدام <code>useRequestContext()</code> باستخدام Deno <code>precompile</code> خيار JSX. استخدم <code>react-jsx</code>:</p>
<pre><code class="language-json">   <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
     <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;precompile&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// [!code --]</span>
     <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// [!code ++]</span>
     <span class="hljs-attr">&quot;jsxImportSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;hono/jsx&quot;</span>
   <span class="hljs-punctuation">}</span>
 <span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="التوسيع-contextrenderer">التوسيع <code>ContextRenderer</code></h2>
<p>من خلال تعريف <code>ContextRenderer</code> كما هو موضح أدناه، يمكنك تمرير محتوى إضافي إلى المُصيِّر (renderer). هذا مفيد، على سبيل المثال، عندما تريد تغيير محتويات وسم head اعتمادًا على الصفحة.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextRenderer</span> {
    (
      <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;,
      <span class="hljs-attr">props</span>: { <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }
    ): <span class="hljs-title class_">Response</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/page/*&#x27;</span>,
  <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children, title }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page/favorites&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Eating sushi<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Watching baseball games<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
    {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;My favorites&#x27;</span>,
    }
  )
})
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
