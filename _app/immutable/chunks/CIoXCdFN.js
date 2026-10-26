const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="other-ways-to-navigate-programmatically",e="طرق أخرى للتنقّل البرمجي",o=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"التوجيه-بعد-العمليات-عبر-خطاف-usenavigate",text:"التوجيه بعد العمليات عبر خُطّاف useNavigate"},{depth:2,id:"التنقل-خارج-المكونات-عبر-كائن-router",text:"التنقّل خارج المكوّنات عبر كائن router"},{depth:2,id:"إعادة-التوجيه-الشرطي-عبر-مكون-navigate",text:"إعادة التوجيه الشرطي عبر مكوّن Navigate"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>الأصل في التنقّل داخل تطبيقات الويب أن يُبنى على الروابط الصريحة باستخدام مكوّن <code>Link</code>؛ فهو الخيار الأمثل لسهولة الوصول (<code>accessibility</code>) وتجربة المستخدِم. غير أنّ هناك حالات يتعذّر فيها استخدام الرابط، مثل الرغبة في التوجيه تلقائيًا بعد إرسال استمارة (<code>form submission</code>) أو اكتمال عملية غير متزامنة، أو عند الحاجة لإعادة التوجيه الشرطي أثناء التصيير.</p>
<p>في هذا الدرس سنتعلّم:</p>
<ol>
<li>كيفية استخدام خُطّاف التوجيه البرمجي <code>useNavigate</code> داخل مكوّنات <code>React</code>.</li>
<li>إمكانية التنقّل البرمجي المباشر عبر كائن <code>router</code> من خارج مكوّنات <code>React</code>.</li>
<li>إعادة التوجيه الإعلاني (<code>declarative redirection</code>) باستخدام مكوّن <code>Navigate</code>.</li>
</ol>
<h2 id="التوجيه-بعد-العمليات-عبر-خطاف-usenavigate">التوجيه بعد العمليات عبر خُطّاف <code>useNavigate</code></h2>
<p>تخيّل أن لدينا استمارة لتعديل المنشور في المسار <code>src/routes/posts_.$postId.edit.tsx</code>، وبعد حفظ البيانات نريد إعادة المستخدِم تلقائيًا إلى صفحة المنشور السابقة. لا يمكننا هنا وضع رابط ينقر عليه المستخدِم، بل نحتاج إلى كود برمجي ينفّذ الانتقال عند انتهاء الإرسال.</p>
<p>نستورد خُطّاف <code>useNavigate</code> من <code>@tanstack/react-router</code>، وننشئ دالة التنقّل مع تمرير <code>from: Route.fullPath</code> لدعم المسارات النسبية:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span>, useNavigate } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts_/$postId/edit&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> navigate = <span class="hljs-title function_">useNavigate</span>({
    <span class="hljs-attr">from</span>: <span class="hljs-title class_">Route</span>.<span class="hljs-property">fullPath</span>,
  });
</code></pre>
<p>ثم نستدعي دالة <code>navigate</code> داخل معالج الإرسال <code>onSubmit</code>:</p>
<pre><code class="language-tsx">      &lt;form
        onSubmit={<span class="hljs-title function_">async</span> (e) =&gt; {
          e.<span class="hljs-title function_">preventDefault</span>();
          <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">2000</span>));
          <span class="hljs-title function_">navigate</span>({
            <span class="hljs-attr">to</span>: <span class="hljs-string">&quot;..&quot;</span>,
          });
        }}
      &gt;
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      &lt;/form&gt;
</code></pre>
<p>تقبل دالة <code>navigate</code> نفس الخيارات التي نمررها إلى مكوّن <code>Link</code>، بما فيها المسارات النسبية والمعاملات، وبفضل تحديد نقطة البداية <code>from</code> تمكّنا من استخدام <code>to: &quot;..&quot;</code> للرجوع مستوى واحدًا إلى الوراء في شجرة المسارات.</p>
<h2 id="التنقل-خارج-المكونات-عبر-كائن-router">التنقّل خارج المكوّنات عبر كائن <code>router</code></h2>
<p>بالإضافة إلى الخُطّاف <code>useNavigate</code> الذي يعمل داخل مكوّنات <code>React</code>، يتيح لنا كائن الموجّه العام <code>router</code> (المُعرَّف في <code>src/main.tsx</code>) استدعاء دالة <code>router.navigate()</code> مباشرة من أي مكان داخل التطبيق، حتى خارج دورة حياة المكوّنات، مثل معالجات الأخطاء العامة أو طبقات الشبكة.</p>
<h2 id="إعادة-التوجيه-الشرطي-عبر-مكون-navigate">إعادة التوجيه الشرطي عبر مكوّن <code>Navigate</code></h2>
<p>إذا أردنا تحويل المستخدِم إلى مسار آخر فور محاولته زيارة صفحة معينة وفق شرط محدد، فمن الأفضل عدم استخدام الخُطّاف داخل مؤثرات جانبية؛ بل نعتمد على مكوّن <code>Navigate</code> الذي يوفره <code>TanStack Router</code> للتوجيه الإعلاني المباشر.</p>
<p>في ملف <code>src/routes/about.tsx</code>، يمكننا فحص الشرط وإرجاع مكوّن <code>Navigate</code> بدل تصيير محتوى الصفحة:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Navigate</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/about&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigate</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/posts&quot;</span> /&gt;</span></span>;
  }
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-pink-600&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>عند محاولة زيارة المسار <code>/about</code>، يتحقّق الشرط فورًا ويُوجَّه المستخدِم مباشرة إلى مسار المنشورات <code>/posts</code> دون وميض في الصفحة أو تصيير غير ضروري.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>عند زيارة صفحة «عن الموقع» بعد تطبيق التحويل الشرطي، ينتقل المتصفح تلقائيًا إلى مسار المنشورات ويعرض القائمة:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--other-ways-to-navigate-programmatically--posts.png" alt="إعادة التوجيه البرمجي التلقائي إلى مسار المنشورات"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>املأ الاستمارة في صفحة تعديل المنشور واضغط زر الإرسال، ولاحظ كيف ينتظر التطبيق مدة المحاكاة (ثانيتين) ثم ينقلك تلقائيًا إلى صفحة تفاصيل المنشور الأب.</li>
<li>غيّر الشرط في صفحة <code>about</code> ليصبح غير متحقق، وتأكد من أن الصفحة الوردية تُعرض بشكل طبيعي عند زيارتها.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=6326s">فيديو الدرس: طرق أخرى للتنقّل البرمجي</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/other-navigation">فرع الدرس على GitHub (<code>other-navigation</code>)</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/navigation">توثيق التنقّل البرمجي في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «طرق أخرى للتنقّل البرمجي» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>other-navigation</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:o,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,o as headings,l as html,t as slug,e as title};
