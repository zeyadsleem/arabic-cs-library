const s="tanstack-router",t="router",n="دورة TanStack Router الكاملة",a="pathless-layouts",e="التخطيطات بلا مسار (Pathless Layouts)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"المسار-الأب-الذي-نحتاجه",text:"المسارُ الأب الذي نحتاجه"},{depth:2,id:"اصطلاح-الشرطة-السفلية",text:"اصطلاح الشرطة السفلية"},{depth:2,id:"إبقاء-العناوين-كما-كانت",text:"إبقاء العناوين كما كانت"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"تمييز-الرابط-النشط-بدقة",text:"تمييز الرابط النشطّ بدقّة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق بنينا إعداداتٍ متداخلة: <code>/settings</code> مسارٌ أب، و<code>/settings/payment</code> و<code>/settings/profile</code> أبناء له، ويعرض المسارُ الأبُ تنقّلًا مشتركًا فوق أبنائه. لكن هذا المسارَ الأب له <strong>عنوان</strong> في الرابط، فإن أردتَ تنقّلًا مشتركًا يجمع مجموعة صفحاتٍ لا تريد لها عنوانًا خاصًّا، ستضطر إلى اختلاق عنوان زائد مثل <code>/settings-group</code> لا معنى له.</p>
<p>في هذا الدرس نتعلّم كيف يجعل TanStack Router المسارَ الأب بلا عنوان في الرابط، مع إبقائه أبًا حقيقيًا في شجرة المسارات: تضع ملفاته في مجلّدٍ يبدأ بشرطةٍ سفلية (<code>_</code>)، فيبقى في الشجرة ويُعرض كتخطيطٍ مشترك، لكن عنوان الصفحة يبقى <code>/settings/payment</code> لا <code>/_settingsLayout/settings/payment</code>.</p>
<h2 id="المسار-الأب-الذي-نحتاجه">المسارُ الأب الذي نحتاجه</h2>
<p>تخيّل شجرة المسارات على النحو التالي:</p>
<ul>
<li><code>settings/route.tsx</code> — تخطيطٌ فيه شريط تنقّل</li>
<li><code>settings/payment.tsx</code> — صفحة الدفع</li>
<li><code>settings/profile.tsx</code> — صفحة الملف الشخصي</li>
</ul>
<p>المسارُ الأب <code>/settings</code> هنا له عنوان، فكل رابطٍ إلى أحد أبنائه يبدأ بـ<code>/settings</code>. ولأننا نريد واجهةً مشتركة بين هذه الصفحات، نحتاج أحيانًا إلى أبٍّ يشترك أبناؤه في واجهته دون أن يفرض عنوانًا على الرابط.</p>
<p>الحلّ الذي تقدّمه المكتبة هو <strong>تخطيطٌ بلا مسار</strong> (pathless layout): أبٌ في شجرة المسارات يعرض واجهته المشتركة، لكنّه لا يُسهم في بناء عنوان الصفحة.</p>
<h2 id="اصطلاح-الشرطة-السفلية">اصطلاح الشرطة السفلية</h2>
<p>اصطلاح TanStack Router بسيط: <strong>أيّ مجلّدٍ يبدأ بشرطةٍ سفلية لا يُسهم في المسار</strong>. وهذا ما نراه في شجرة الملفات بعد التعديل:</p>
<ul>
<li><code>_settingsLayout/route.tsx</code> — المسارُ الأب بلا عنوان</li>
<li><code>_settingsLayout/settings/index.tsx</code> — الصفحة <code>/settings</code></li>
<li><code>_settingsLayout/settings/payment.tsx</code> — الصفحة <code>/settings/payment</code></li>
<li><code>_settingsLayout/settings/profile.tsx</code> — الصفحة <code>/settings/profile</code></li>
</ul>
<p>وهكذا يكون الملفُ الأب هكذا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span>, <span class="hljs-title class_">Outlet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/_settingsLayout&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      _settingsLayout
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 flex gap-2 mb-4 bg-yellow-600 border-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
          <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/settings&quot;</span>
          <span class="hljs-attr">activeOptions</span>=<span class="hljs-string">{{</span>
            <span class="hljs-attr">exact:</span> <span class="hljs-attr">true</span>,
          }}
          <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>
        &gt;</span>
          General
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/settings/payment&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Payment
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/settings/profile&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Profile
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ ثلاث نقاط في هذا الملف:</p>
<ol>
<li><strong>اسم المسار</strong> في <code>createFileRoute(&quot;/_settingsLayout&quot;)</code> يحمل الشرطةَ السفلية، وهي التي تُخرج المجلّد من المسار.</li>
<li><strong><code>&lt;Outlet /&gt;</code></strong> هو مكانُ عرض المسار الابن، كما في المساراتِ الأبِّ الاعتيادية تمامًا.</li>
<li><strong>روابط التنقّل</strong> تشير إلى العناوين النهائية (<code>/settings/payment</code>)، لا إلى مسارات المجلّدات؛ فالعلاقة بين شجرة المسارات وعنوان الصفحة أمران منفصلان.</li>
</ol>
<h2 id="إبقاء-العناوين-كما-كانت">إبقاء العناوين كما كانت</h2>
<p>نقلنا المجلّد <code>settings/</code> كاملًا إلى <code>_settingsLayout/</code>، فصارت أسماؤُ الملفات <code>_settingsLayout/settings/payment.tsx</code>، وبما أنّ الشرطةَ السفلية لا تُسهم في المسار فصار العنوان <code>/settings/payment</code> كما كان. أمّا الصفحةُ الأمّ <code>/settings</code> فلم تعد لها ملفٌ مستقلّ، لأنّ المجلّد <code>settings</code> لم يعد مجلّدًا فيه <code>route.tsx</code>، فأنشأنا له ملفَّ <code>index.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-router&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&#x27;/_settingsLayout/settings/&#x27;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
})

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/_settingsLayout/settings/&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}
</code></pre>
<p>وثمّة صفحاتُ الإعدادات نفسها، وكلّها فارغةٌ من المنطق:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/_settingsLayout/settings/payment&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-amber-700 border-2&quot;</span>&gt;</span>Hello &quot;/settings/payment&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--pathless-layouts--settings.png" alt="تخطيطٌ بلا مسار يعرض شريط تنقّل بين صفحات الإعدادات فوق صفحة «General»"></p>
<p>في الصورة: الشريطُ الأصفر في الأعلى (General / Payment / Profile) هو التخطيطُ بلا مسار، وهو معروضٌ فوق أيٍّ من أبنائه الثلاثة. ولو انتقلتَ إلى <code>/settings/payment</code> لبقي الشريطُ نفسه معروضًا، لأنّ المسارَ الأب يبقى والدًا في شجرة المسارات وإن لم يكن له عنوان.</p>
<h2 id="تمييز-الرابط-النشط-بدقة">تمييز الرابط النشطّ بدقّة</h2>
<p>لاحظ في الشيفرة أعلاه أنّ رابط «General» يمرّر <code>activeOptions</code> بخيار <code>exact</code>. السبب: الرابطُ إلى <code>/settings</code> يُعدّ نشطًا تلقائيًا عندما يكون العنوانُ الحالي هو <code>/settings</code> <strong>أو</strong> أيّ عنوانٍ يبدأ به، مثل <code>/settings/payment</code>. وبما أنّنا نريد إبراز «General» وحده على <code>/settings</code>، منعنا التطابقَ الجزئي:</p>
<pre><code class="language-tsx">        &lt;<span class="hljs-title class_">Link</span>
          to=<span class="hljs-string">&quot;/settings&quot;</span>
          activeOptions={{
            <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
          }}
          className=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>
        &gt;
          <span class="hljs-title class_">General</span>
        &lt;/<span class="hljs-title class_">Link</span>&gt;
</code></pre>
<p>ويمكن تمرير <code>exact</code> على مستوى الرابط الواحد كما هنا، أو على مستوى الموجّه كلّه عند تعريفه.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أنشئ المجلّد <code>src/routes/_settingsLayout/</code> وانقل إليه مجلّد <code>settings</code> كاملًا.</li>
<li>أضف ملف <code>_settingsLayout/route.tsx</code> فيه شريطُ تنقّل و<code>&lt;Outlet /&gt;</code>، كما في المثال أعلاه.</li>
<li>أضف <code>src/routes/_settingsLayout/settings/index.tsx</code> ليظهر العنوان <code>/settings</code>.</li>
<li>شغّل <code>npm run dev</code>، ثم افتح <code>/settings/payment</code> وتأكّد من ظهور الشريط المشترك وأنّ عنوان المتصفّح لا يحوي <code>_settingsLayout</code>.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=2239s">فيديو الدرس: Pathless Layouts</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/pathless-layouts">شيفرة الدرس: فرع pathless-layouts</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Pathless Layouts» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,p={book:s,chapter:t,chapterTitle:n,slug:a,title:e,headings:l,html:o};export{s as book,t as chapter,n as chapterTitle,p as default,l as headings,o as html,a as slug,e as title};
