const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="testing-zod-schema",e="اختبار مخطط Zod",l=[{depth:2,id:"اختبار-المدخلات-الصحيحة",text:"اختبار المدخلات الصحيحة"},{depth:2,id:"اختبار-المدخلات-غير-الصحيحة",text:"اختبار المدخلات غير الصحيحة"},{depth:2,id:"اختبار-الحالات-الحدية-والشروط-الحدودية",text:"اختبار الحالات الحدية والشروط الحدودية"},{depth:2,id:"اختبار-التحسينات-والتحويلات-المخصصة",text:"اختبار التحسينات والتحويلات المخصّصة"}],t=`<p>تُعدّ كتابة اختبارات وحدة شاملة لمخططات Zod ضرورية لضمان صحتها ومنع الانحدارات مع تطوّر تطبيقك. وإليك استراتيجيات أساسية لاختبار مخططات Zod:</p>
<h2 id="اختبار-المدخلات-الصحيحة">اختبار المدخلات الصحيحة</h2>
<p>أنشئ حالات اختبار ببيانات مدخلة صحيحة ينبغي أن تُحلَّل بنجاح وفق مخططك. وتأكد من أن <code>schema.parse()</code> أو <code>schema.safeParse()</code> يعيد البيانات المتحقَّق منها المتوقعة دون أخطاء.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>; <span class="hljs-comment">// Example using Vitest</span>

<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;User Schema&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should parse valid user data&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> validUserData = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> };
    <span class="hljs-keyword">const</span> parsedUser = userSchema.<span class="hljs-title function_">parse</span>(validUserData);
    <span class="hljs-title function_">expect</span>(parsedUser).<span class="hljs-title function_">toEqual</span>(validUserData); <span class="hljs-comment">// Assert parsed data is as expected</span>
  });
});
</code></pre>
<h2 id="اختبار-المدخلات-غير-الصحيحة">اختبار المدخلات غير الصحيحة</h2>
<p>أنشئ حالات اختبار ببيانات مدخلة غير صحيحة ينبغي أن <em>تفشل</em> في التحقق. وتأكد من أن <code>schema.parse()</code> يرمي <code>ZodError</code> أو أن <code>schema.safeParse()</code> يعيد <code>success: false</code>. وافحص مصفوفة <code>error.errors</code> للتحقق من أن رسائل الخطأ ومسارات الخطأ المحددة كما هي متوقعة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;User Schema&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw ZodError for invalid age&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> invalidUserData = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span>, <span class="hljs-attr">age</span>: -<span class="hljs-number">5</span> };
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> userSchema.<span class="hljs-title function_">parse</span>(invalidUserData)).<span class="hljs-title function_">toThrowError</span>(z.<span class="hljs-property">ZodError</span>); <span class="hljs-comment">// Assert ZodError is thrown</span>
    <span class="hljs-keyword">try</span> {
      userSchema.<span class="hljs-title function_">parse</span>(invalidUserData);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> z.<span class="hljs-property">ZodError</span>) {
        <span class="hljs-title function_">expect</span>(error.<span class="hljs-property">errors</span>[<span class="hljs-number">0</span>].<span class="hljs-property">message</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Number must be greater than 0&#x27;</span>); <span class="hljs-comment">// Assert specific error message</span>
        <span class="hljs-title function_">expect</span>(error.<span class="hljs-property">errors</span>[<span class="hljs-number">0</span>].<span class="hljs-property">path</span>).<span class="hljs-title function_">toEqual</span>([<span class="hljs-string">&#x27;age&#x27;</span>]); <span class="hljs-comment">// Assert error path</span>
      }
    }
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return success: false and ZodError for safeParse with invalid name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> invalidUserData = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;C&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span> };
    <span class="hljs-keyword">const</span> result = userSchema.<span class="hljs-title function_">safeParse</span>(invalidUserData);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// Assert safeParse returns failure</span>
    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
      <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBeInstanceOf</span>(z.<span class="hljs-property">ZodError</span>); <span class="hljs-comment">// Assert error is ZodError</span>
      <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span>[<span class="hljs-number">0</span>].<span class="hljs-property">message</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;String must be at least 2 characters&#x27;</span>); <span class="hljs-comment">// Assert error message</span>
    }
  });
});
</code></pre>
<h2 id="اختبار-الحالات-الحدية-والشروط-الحدودية">اختبار الحالات الحدية والشروط الحدودية</h2>
<p>خُذ في الحسبان الحالات الحدية والشروط الحدودية لمخططاتك (مثل السلاسل الفارغة، وقيم null حين لا يُحدَّد القبول بها، والأطوال القصوى المسموح بها، والقيم الدنيا والعليا). وأنشئ حالات اختبار للتأكد من أن مخططاتك تعالج هذه السيناريوهات على نحو صحيح.</p>
<h2 id="اختبار-التحسينات-والتحويلات-المخصصة">اختبار التحسينات والتحويلات المخصّصة</h2>
<p>اختبر دوالك <code>.refine()</code> و<code>.superRefine()</code> و<code>.transform()</code> اختبارًا شاملًا للتأكد من أن منطق التحقق والتحويل المخصّص لديك يعمل كما هو متوقع.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:e,headings:l,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,t as html,p as slug,e as title};
