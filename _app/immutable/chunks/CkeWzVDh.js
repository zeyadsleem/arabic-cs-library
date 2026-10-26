const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",p="testing-with-zod-and-express",t="الاختبار مع Zod وExpress",e=[{depth:2,id:"تثبيت-الاعتمادات",text:"تثبيت الاعتمادات"},{depth:2,id:"تعريف-مخططات-zod",text:"تعريف مخططات Zod"},{depth:2,id:"إنشاء-بيانات-اختبار-ثابتة-من-zod",text:"إنشاء بيانات اختبار ثابتة من Zod"},{depth:2,id:"كتابة-حالات-الاختبار",text:"كتابة حالات الاختبار"},{depth:2,id:"تشغيل-الاختبارات",text:"تشغيل الاختبارات"},{depth:2,id:"الفوائد",text:"الفوائد"}],l=`<p>يُعدّ اختبار API الخاص بـ Express أمرًا حاسمًا لضمان موثوقيته وصحته. ويوضح هذا الدليل كيفية استخدام <a href="https://www.npmjs.com/package/zod-fixture"><code>zod-fixture</code></a> لتوليد بيانات اختبار واقعية انطلاقًا من مخططات Zod لديك، و<a href="https://www.npmjs.com/package/superagent"><code>superagent</code></a> لتوجيه طلبات HTTP إلى API الخاص بك.</p>
<h2 id="تثبيت-الاعتمادات">تثبيت الاعتمادات</h2>
<p>ثبّت الاعتمادات اللازمة:</p>
<pre><code class="language-bash">npm install superagent zod zod-fixture --save-dev
npm install @types/superagent --save-dev <span class="hljs-comment"># if using TypeScript</span>
</code></pre>
<p>وهذا يثبّت:</p>
<ul>
<li><a href="https://www.npmjs.com/package/superagent"><code>superagent</code></a>: عميل HTTP لاختبار API الخاص بك</li>
<li><a href="https://www.npmjs.com/package/zod"><code>zod</code></a>: مكتبة التحقق من المخططات</li>
<li><a href="https://www.npmjs.com/package/zod-fixture"><code>zod-fixture</code></a>: يولّد بيانات اختبار من مخططات Zod</li>
</ul>
<h2 id="تعريف-مخططات-zod">تعريف مخططات Zod</h2>
<p>تأكد من أن API الخاص بـ Express يستخدم مخططات Zod للتحقق من الطلبات والاستجابات.</p>
<p><strong>مثال:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// schemas.ts</span>
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">3</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> userResponseSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">optional</span>(),
});
</code></pre>
<h2 id="إنشاء-بيانات-اختبار-ثابتة-من-zod">إنشاء بيانات اختبار ثابتة من Zod</h2>
<p>استخدم <code>zod-fixture</code> لتوليد بيانات اختبار انطلاقًا من مخططات Zod لديك.</p>
<p><strong>مثال:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// fixtures.ts</span>
<span class="hljs-keyword">import</span> { generateMock } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod-fixture&#x27;</span>;
<span class="hljs-keyword">import</span> { createUserSchema, userResponseSchema } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./schemas&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">createUserFixture</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">generateMock</span>(createUserSchema);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">userResponseFixture</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">generateMock</span>(userResponseSchema);
</code></pre>
<h2 id="كتابة-حالات-الاختبار">كتابة حالات الاختبار</h2>
<p>استخدم <code>superagent</code> لتوجيه طلبات HTTP إلى API الخاص بـ Express، و<code>zod-fixture</code> لتوليد بيانات الاختبار.</p>
<p><strong>مثال (باستخدام Jest):</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// app.test.ts</span>
<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;superagent&#x27;</span>;
<span class="hljs-keyword">import</span> { createUserFixture, userResponseFixture } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./fixtures&#x27;</span>;
<span class="hljs-keyword">import</span> { createUserSchema, userResponseSchema } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./schemas&#x27;</span>;
<span class="hljs-keyword">import</span> express, { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, z.infer&lt;<span class="hljs-keyword">typeof</span> createUserSchema&gt;&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;z.infer&lt;<span class="hljs-keyword">typeof</span> userResponseSchema&gt;&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">newUser</span>: z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userResponseSchema&gt; = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123e4567-e89b-12d3-a456-426614174000&#x27;</span>,
      <span class="hljs-attr">username</span>: req.<span class="hljs-property">body</span>.<span class="hljs-property">username</span>,
      <span class="hljs-attr">email</span>: req.<span class="hljs-property">body</span>.<span class="hljs-property">email</span>,
      <span class="hljs-attr">age</span>: req.<span class="hljs-property">body</span>.<span class="hljs-property">age</span>,
    };
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>(newUser);
  },
);

<span class="hljs-keyword">const</span> server = app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3001</span>); <span class="hljs-comment">// Use a different port for testing</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;User API&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">afterAll</span>(<span class="hljs-function">() =&gt;</span> {
    server.<span class="hljs-title function_">close</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a user&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> userData = <span class="hljs-title function_">createUserFixture</span>();
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;http://localhost:3001/users&#x27;</span>).<span class="hljs-title function_">send</span>(userData);

    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>).<span class="hljs-title function_">toEqual</span>(expect.<span class="hljs-title function_">objectContaining</span>(userData));
    <span class="hljs-title function_">expect</span>(userResponseSchema.<span class="hljs-title function_">safeParse</span>(response.<span class="hljs-property">body</span>).<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle invalid input&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> invalidUserData = { <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;invalid-email&#x27;</span> }; <span class="hljs-comment">// Invalid username and email</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;http://localhost:3001/users&#x27;</span>).<span class="hljs-title function_">send</span>(invalidUserData);
    } <span class="hljs-keyword">catch</span> (<span class="hljs-attr">error</span>: <span class="hljs-built_in">any</span>) {
      <span class="hljs-title function_">expect</span>(error.<span class="hljs-property">response</span>.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">400</span>); <span class="hljs-comment">// Assuming your API returns 400 for invalid input</span>
    }
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should generate a valid user response fixture&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> responseData = <span class="hljs-title function_">userResponseFixture</span>();
    <span class="hljs-title function_">expect</span>(userResponseSchema.<span class="hljs-title function_">safeParse</span>(responseData).<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });
});
</code></pre>
<h2 id="تشغيل-الاختبارات">تشغيل الاختبارات</h2>
<p>شغّل اختباراتك باستخدام إطار الاختبار الذي اخترته (مثل Jest أو Mocha).</p>
<pre><code class="language-bash">npx jest app.test.ts
</code></pre>
<h2 id="الفوائد">الفوائد</h2>
<ul>
<li><strong>بيانات اختبار واقعية:</strong> يولّد <code>zod-fixture</code> بيانات اختبار واقعية انطلاقًا من مخططات Zod لديك، ما يضمن أن اختباراتك تشبه السيناريوهات الواقعية عن قرب.</li>
<li><strong>سلامة الأنواع:</strong> توفّر مخططات Zod وبياناتها الثابتة سلامة الأنواع، فتقلّل خطر الأخطاء.</li>
<li><strong>اختبار مبسّط:</strong> يبسّط <code>superagent</code> عملية توجيه طلبات HTTP، فيجعل اختباراتك أكثر قابلية للقراءة والصيانة.</li>
<li><strong>التحقق:</strong> يمكنك بسهولة التحقق من جسم الاستجابة مقابل مخططات zod لديك.</li>
<li><strong>موثوقية محسّنة:</strong> يحسّن الاختبار الشامل موثوقية API الخاص بك المبني على Express.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,p as slug,t as title};
