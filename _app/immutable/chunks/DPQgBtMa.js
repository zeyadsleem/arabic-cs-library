const s="hono",a="guides",n="الأدلة",p="validation",l="التحقق",e=[{depth:2,id:"مدقق-يدوي",text:"مُدقّق يدوي"},{depth:2,id:"مدققات-متعددة",text:"مُدقّقات متعددة"},{depth:2,id:"مع-zod",text:"مع Zod"},{depth:2,id:"برمجية-وسيطة-للتحقق-بـ-zod",text:"برمجية وسيطة للتحقق بـ Zod"},{depth:2,id:"برمجية-وسيطة-للتحقق-بـ-standard-schema",text:"برمجية وسيطة للتحقق بـ Standard Schema"},{depth:3,id:"مع-zod-1",text:"مع Zod"},{depth:3,id:"مع-valibot",text:"مع Valibot"},{depth:3,id:"مع-arktype",text:"مع ArkType"}],c=`<p>يوفّر Hono مدقّقًا رفيعًا جدًا فقط.
ومع ذلك، يمكن أن يكون قويًا عند دمجه مع مدقق (Validator) من جهة خارجية.
بالإضافة إلى ذلك، تتيح لك ميزة RPC مشاركة مواصفات API مع عملائك من خلال الأنواع (types).</p>
<h2 id="مدقق-يدوي">مُدقّق يدوي</h2>
<p>أولًا، قدّم طريقة للتحقق من القيم الواردة دون استخدام أداة التحقق (Validator) من طرف ثالث.</p>
<p>استيراد <code>validator</code> من <code>hono/validator</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { validator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/validator&#x27;</span>
</code></pre>
<p>للتحقق من بيانات النموذج، حدّد <code>form</code> كوسيط أول ورد نداء (callback) كوسيط ثانٍ.
في دالة الاستدعاء (callback)، يتم التحقق من القيمة وإرجاع القيم التي تم التحقق منها في النهاية.
الـ <code>validator</code> يمكن استخدامه كوسيط (middleware).</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;form&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">value, c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> body = value[<span class="hljs-string">&#x27;body&#x27;</span>]
    <span class="hljs-keyword">if</span> (!body || <span class="hljs-keyword">typeof</span> body !== <span class="hljs-string">&#x27;string&#x27;</span>) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Invalid!&#x27;</span>, <span class="hljs-number">400</span>)
    }
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">body</span>: body,
    }
  }),
  <span class="hljs-comment">//...</span>
</code></pre>
<p>داخل المعالج (handler)، يمكنك الحصول على القيمة المتحقَّق منها عبر <code>c.req.valid('form')</code>.</p>
<pre><code class="language-ts">, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { body } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;form&#x27;</span>)
  <span class="hljs-comment">// ... do something</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(
    {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created!&#x27;</span>,
    },
    <span class="hljs-number">201</span>
  )
}
</code></pre>
<p>تشمل أهداف التحقق <code>json</code>, <code>query</code>, <code>header</code>, <code>param</code> و <code>cookie</code> بالإضافة إلى <code>form</code>.</p>
<p>عندما تتحقق من <code>json</code> أو <code>form</code>، يجب أن يحتوي الطلب <em>بالضرورة</em> على مطابق <code>content-type</code> الترويسة (على سبيل المثال <code>Content-Type: application/json</code> لـ <code>json</code>). وإلا، فلن يتم تحليل جسم الطلب وستتلقى كائنًا فارغًا (<code>{}</code>) كقيمة في دالة الاستدعاء.</p>
<p>من المهم تعيين <code>content-type</code> الترويسة عند الاختبار باستخدام
<a href="https://hono.dev/docs/api/request"><code>app.request()</code></a>.</p>
<p>بالنظر إلى تطبيق كهذا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/testing&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">value, c</span>) =&gt;</span> {
    <span class="hljs-comment">// pass-through validator</span>
    <span class="hljs-keyword">return</span> value
  }),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> body = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;json&#x27;</span>)
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(body)
  }
)
</code></pre>
<p>يمكن كتابة اختباراتك هكذا.</p>
<pre><code class="language-ts"><span class="hljs-comment">// ❌ this will not work</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/testing&#x27;</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;value&#x27;</span> }),
})
<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data) <span class="hljs-comment">// {}</span>

<span class="hljs-comment">// ✅ this will work</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/testing&#x27;</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;value&#x27;</span> }),
  <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Headers</span>({ <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> }),
})
<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data) <span class="hljs-comment">// { key: &#x27;value&#x27; }</span>
</code></pre>
<p>عندما تتحقق من <code>header</code>، تحتاج إلى استخدام اسم <strong>بحروف صغيرة</strong> كمفتاح.</p>
<p>إذا أردت التحقق من <code>Idempotency-Key</code> الترويسة، تحتاج إلى استخدام <code>idempotency-key</code> كمفتاح.</p>
<pre><code class="language-ts"><span class="hljs-comment">// ❌ this will not work</span>
app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/api&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;header&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">value, c</span>) =&gt;</span> {
    <span class="hljs-comment">// idempotencyKey is always undefined</span>
    <span class="hljs-comment">// so this middleware always return 400 as not expected</span>
    <span class="hljs-keyword">const</span> idempotencyKey = value[<span class="hljs-string">&#x27;Idempotency-Key&#x27;</span>]

    <span class="hljs-keyword">if</span> (idempotencyKey == <span class="hljs-literal">undefined</span> || idempotencyKey === <span class="hljs-string">&#x27;&#x27;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">400</span>, {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Idempotency-Key is required&#x27;</span>,
      })
    }
    <span class="hljs-keyword">return</span> { idempotencyKey }
  }),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { idempotencyKey } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;header&#x27;</span>)
    <span class="hljs-comment">// ...</span>
  }
)

<span class="hljs-comment">// ✅ this will work</span>
app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/api&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;header&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">value, c</span>) =&gt;</span> {
    <span class="hljs-comment">// can retrieve the value of the header as expected</span>
    <span class="hljs-keyword">const</span> idempotencyKey = value[<span class="hljs-string">&#x27;idempotency-key&#x27;</span>]

    <span class="hljs-keyword">if</span> (idempotencyKey == <span class="hljs-literal">undefined</span> || idempotencyKey === <span class="hljs-string">&#x27;&#x27;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">400</span>, {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Idempotency-Key is required&#x27;</span>,
      })
    }
    <span class="hljs-keyword">return</span> { idempotencyKey }
  }),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { idempotencyKey } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;header&#x27;</span>)
    <span class="hljs-comment">// ...</span>
  }
)
</code></pre>
<h2 id="مدققات-متعددة">مُدقّقات متعددة</h2>
<p>يمكنك أيضًا تضمين عدة أدوات تحقق (validators) للتحقق من أجزاء مختلفة من الطلب:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/posts/:id&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;param&#x27;</span>, ...),
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;query&#x27;</span>, ...),
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, ...),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">//...</span>
  }
)
</code></pre>
<h2 id="مع-zod">مع Zod</h2>
<p>يمكنك استخدام <a href="https://zod.dev"><code>Zod</code></a>، وهو أحد المدقّقات الخارجية.
نوصي باستخدام مدقّق خارجي.</p>
<p>التثبيت من سجل Npm.</p>
<pre><code class="language-sh">npm i zod
</code></pre>
<pre><code class="language-sh">yarn add zod
</code></pre>
<pre><code class="language-sh">pnpm add zod
</code></pre>
<pre><code class="language-sh">bun add zod
</code></pre>
<p>استيراد <code>z</code> من <code>zod</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>
</code></pre>
<p>اكتب مخططك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> schema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">body</span>: z.<span class="hljs-title function_">string</span>(),
})
</code></pre>
<p>يمكنك استخدام المخطط (schema) في دالة الاستدعاء للتحقق وإرجاع القيمة التي تم التحقق منها.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;form&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">value, c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> parsed = schema.<span class="hljs-title function_">safeParse</span>(value)
    <span class="hljs-keyword">if</span> (!parsed.<span class="hljs-property">success</span>) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Invalid!&#x27;</span>, <span class="hljs-number">401</span>)
    }
    <span class="hljs-keyword">return</span> parsed.<span class="hljs-property">data</span>
  }),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { body } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;form&#x27;</span>)
    <span class="hljs-comment">// ... do something</span>
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(
      {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created!&#x27;</span>,
      },
      <span class="hljs-number">201</span>
    )
  }
)
</code></pre>
<h2 id="برمجية-وسيطة-للتحقق-بـ-zod">برمجية وسيطة للتحقق بـ Zod</h2>
<p>يمكنك استخدام <a href="https://github.com/honojs/middleware/tree/main/packages/zod-validator">وسيط التحقق Zod</a> لجعله أسهل.</p>
<pre><code class="language-sh">npm i @hono/zod-validator
</code></pre>
<pre><code class="language-sh">yarn add @hono/zod-validator
</code></pre>
<pre><code class="language-sh">pnpm add @hono/zod-validator
</code></pre>
<pre><code class="language-sh">bun add @hono/zod-validator
</code></pre>
<p>واستورد <code>zValidator</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { zValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/zod-validator&#x27;</span>
</code></pre>
<p>واكتب كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;form&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">body</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> validated = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;form&#x27;</span>)
    <span class="hljs-comment">// ... use your validated data</span>
  }
)
</code></pre>
<h2 id="برمجية-وسيطة-للتحقق-بـ-standard-schema">برمجية وسيطة للتحقق بـ Standard Schema</h2>
<p><a href="https://standardschema.dev/">المخطط القياسي (Standard Schema)</a> هي مواصفة توفر واجهة مشتركة لمكتبات التحقق في TypeScript. أنشأها القائمون على صيانة Zod و Valibot و ArkType للسماح لأدوات النظام البيئي بالعمل مع أي مكتبة تحقق دون الحاجة إلى محولات مخصصة.</p>
<p>الـ <a href="https://github.com/honojs/middleware/tree/main/packages/standard-validator">برمجية Standard Schema Validator الوسيطة</a> يتيح لك استخدام أي مكتبة تحقق متوافقة مع Standard Schema مع Hono، مما يمنحك المرونة لاختيار أداة التحقق المفضلة لديك مع الحفاظ على أمان الأنواع بشكل متسق.</p>
<pre><code class="language-sh">npm i @hono/standard-validator
</code></pre>
<pre><code class="language-sh">yarn add @hono/standard-validator
</code></pre>
<pre><code class="language-sh">pnpm add @hono/standard-validator
</code></pre>
<pre><code class="language-sh">bun add @hono/standard-validator
</code></pre>
<p>استيراد <code>sValidator</code> من الحزمة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { sValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/standard-validator&#x27;</span>
</code></pre>
<h3 id="مع-zod-1">مع Zod</h3>
<p>يمكنك استخدام Zod مع مُدقّق Standard Schema:</p>
<pre><code class="language-sh">npm i zod
</code></pre>
<pre><code class="language-sh">yarn add zod
</code></pre>
<pre><code class="language-sh">pnpm add zod
</code></pre>
<pre><code class="language-sh">bun add zod
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>
<span class="hljs-keyword">import</span> { sValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/standard-validator&#x27;</span>

<span class="hljs-keyword">const</span> schema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>(),
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/author&#x27;</span>, <span class="hljs-title function_">sValidator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, schema), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;json&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`<span class="hljs-subst">\${data.name}</span> is <span class="hljs-subst">\${data.age}</span>\`</span>,
  })
})
</code></pre>
<h3 id="مع-valibot">مع Valibot</h3>
<p><a href="https://valibot.dev/">Valibot</a> بديل خفيف الوزن لـ Zod بتصميم معياري (modular):</p>
<pre><code class="language-sh">npm i valibot
</code></pre>
<pre><code class="language-sh">yarn add valibot
</code></pre>
<pre><code class="language-sh">pnpm add valibot
</code></pre>
<pre><code class="language-sh">bun add valibot
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> v <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;valibot&#x27;</span>
<span class="hljs-keyword">import</span> { sValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/standard-validator&#x27;</span>

<span class="hljs-keyword">const</span> schema = v.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: v.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: v.<span class="hljs-title function_">number</span>(),
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/author&#x27;</span>, <span class="hljs-title function_">sValidator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, schema), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;json&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`<span class="hljs-subst">\${data.name}</span> is <span class="hljs-subst">\${data.age}</span>\`</span>,
  })
})
</code></pre>
<h3 id="مع-arktype">مع ArkType</h3>
<p><a href="https://arktype.io/">ArkType</a> يوفّر صيغة أصلية في TypeScript للتحقق في وقت التشغيل:</p>
<pre><code class="language-sh">npm i arktype
</code></pre>
<pre><code class="language-sh">yarn add arktype
</code></pre>
<pre><code class="language-sh">pnpm add arktype
</code></pre>
<pre><code class="language-sh">bun add arktype
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-keyword">type</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;arktype&#x27;</span>
<span class="hljs-keyword">import</span> { sValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/standard-validator&#x27;</span>

<span class="hljs-keyword">const</span> schema = <span class="hljs-title function_">type</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;string&#x27;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-string">&#x27;number&#x27;</span>,
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/author&#x27;</span>, <span class="hljs-title function_">sValidator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, schema), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;json&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`<span class="hljs-subst">\${data.name}</span> is <span class="hljs-subst">\${data.age}</span>\`</span>,
  })
})
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,p as slug,l as title};
