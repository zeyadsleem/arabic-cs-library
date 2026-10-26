const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="flat-routes",e="المسارات المسطحة",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"فكرة-التسطيح-باستخدام-الفواصل-النقطية",text:"فكرة التسطيح باستخدام الفواصل النقطية"},{depth:2,id:"تداخل-المسارات-الفرعية-في-التخطيط",text:"تداخل المسارات الفرعية في التخطيط"},{depth:2,id:"استثناء-المسارات-من-التخطيطات",text:"استثناء المسارات من التخطيطات"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدروس السابقة نظّمنا المسارات والتخطيطات المتداخلة بإنشاء مجلدات فرعية متداخلة داخل مجلد <code>routes</code>؛ فكان لكل تخطيط أو مسار فرعي مجلدٌ يحمل اسمه وبداخله ملفات المسارات. ورغم وضوح هذا الأسلوب، فإنه قد يؤدي في المشاريع الكبيرة إلى تداخلات شجرية عميقة في بنية الملفات.</p>
<p>في هذا الدرس سنتعلّم أسلوب <strong>المسارات المسطحة (flat routes)</strong> في <code>TanStack Router</code>، وهو بديلٌ يتيح لنا تسطيح مجلد <code>routes</code> بالكامل؛ بحيث تصبح جميع المسارات والتخطيطات ملفات مفردة على نفس المستوى، ونعبّر عن التداخل والتخطيطات باستخدام الفواصل النقطية (<code>.</code>) في أسماء الملفات.</p>
<h2 id="فكرة-التسطيح-باستخدام-الفواصل-النقطية">فكرة التسطيح باستخدام الفواصل النقطية</h2>
<p>الفكرة الجوهرية بسيطة: بدلًا من إنشاء مجلد باسم <code>_settingsLayout</code> وبداخله <code>route.tsx</code>، ننشئ ملفًا مباشرًا باسم <code>_settingsLayout.tsx</code> ليمثّل التخطيط. ثم نربط المسارات الفرعية بهذا التخطيط بكتابة اسم التخطيط متبوعًا بنقطة ثم اسم المسار الفرعي.</p>
<p>هكذا يبدو ملف التخطيط المسطح <code>src/routes/_settingsLayout.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Outlet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Nav</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./-components/Nav&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/_settingsLayout&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      _settingsLayout
      <span class="hljs-tag">&lt;<span class="hljs-name">Nav</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ أننا نقلنا مكوّن التنقّل <code>Nav</code> إلى مجلد <code>-components</code> داخل <code>routes</code>، واستوردناه في ملف التخطيط مباشرة دون الحاجة إلى مجلدات متداخلة.</p>
<h2 id="تداخل-المسارات-الفرعية-في-التخطيط">تداخل المسارات الفرعية في التخطيط</h2>
<p>لإنشاء مسار فرعي يتبع تخطيط <code>_settingsLayout</code>، نستخدم النقطة (<code>.</code>) للفصل بين مقاطع المسار في اسم الملف. فبدلًا من وضع الملفات داخل مجلدات، نعرّف مسار الإعدادات العام <code>_settingsLayout.settings.tsx</code> هكذا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Outlet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/_settingsLayout/settings&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/_settingsLayout/settings/&quot;!
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>ولإضافة صفحات فرعية إضافية داخل مسار الإعدادات، مثل صفحة الدفع وصفحة الملف الشخصي، ننشئ ملفين مسطحين باسمين يعبّران عن المسار الكامل:</p>
<ul>
<li><code>src/routes/_settingsLayout.settings.payment.tsx</code></li>
<li><code>src/routes/_settingsLayout.settings.profile.tsx</code></li>
</ul>
<p>هذا هو محتوى مسار الدفع في <code>src/routes/_settingsLayout.settings.payment.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-router&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&#x27;/_settingsLayout/settings/payment&#x27;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
})

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/_settingsLayout/settings/payment&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}
</code></pre>
<p>يفهم مُولِّد المسارات التلقائي في <code>TanStack Router</code> هذه التسمية ويبني شجرة المسارات بنفس البنية والتداخل تمامًا كما لو كانت مقسمة عبر مجلدات متداخلة.</p>
<h2 id="استثناء-المسارات-من-التخطيطات">استثناء المسارات من التخطيطات</h2>
<p>تعلّمنا في درس التخطيطات متعدية المسار كيفية استخدام الشرطة السفلية اللاحقة (<code>_</code>) لكسر وراثة التخطيط. في أسلوب المسارات المسطحة يظل هذا المبدأ ساريًا بالكامل؛ فإذا أردنا إنشاء مسار لكلمة المرور لا يرث تخطيط <code>settings</code>، ننشئ ملفًا باسم <code>src/routes/_settingsLayout.settings_.password.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-router&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&#x27;/_settingsLayout/settings_/password&#x27;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
})

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/settings_/password&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}
</code></pre>
<p>تخبر الشرطة السفلية بعد <code>settings_</code> الموجّه بأن هذا المسار لا يرث مكوّنات التخطيط السابقة له في الشجرة، مع بقائه متاحًا على العنوان المطلوب.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>بعد تحويل مجلد المسارات إلى بنية مسطحة بالكامل، يعمل التطبيق والتنقل بين صفحات الإعدادات والدفع بنفس الكفاءة والسلوك:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--flat-routes--settings-payment.png" alt="صفحة الدفع داخل تخطيط الإعدادات باستخدام المسارات المسطحة"></p>
<p>تمنحنا المسارات المسطحة حرية الاختيار؛ فيمكنك الاعتماد عليها بالكامل لتجنّب شجرة المجلدات العميقة، أو الدمج بينها وبين المجلدات بحسب ما يناسب حجم مشروعك وفريقك.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>راقب شجرة المسارات في أدوات التطوير (<code>TanStack Router Devtools</code>) ولاحظ كيف تتطابق تمامًا مع الشجرة التي بُنيت سابقًا باستخدام المجلدات المتداخلة.</li>
<li>أضف مسارًا مسطحًا جديدًا باسم <code>_settingsLayout.settings.notifications.tsx</code> وتأكد من ظهوره تلقائيًا داخل تخطيط الإعدادات مع إمكانية الوصول إليه عبر الرابط المناسب.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=2743s">فيديو الدرس: المسارات المسطحة</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/flat-routes">فرع الدرس على GitHub (<code>flat-routes</code>)</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/route-trees">توثيق شجرة المسارات والمسارات المسطحة في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «المسارات المسطحة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>flat-routes</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,p as default,l as headings,o as html,t as slug,e as title};
