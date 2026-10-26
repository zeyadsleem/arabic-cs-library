const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="file-based-router",e="الموجّه بالملفات (File Based Router)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"مجلد-المسارات-نقطة-البداية",text:"مجلّد المسارات: نقطة البداية"},{depth:3,id:"ملف-الجذر-roottsx",text:"ملف الجذر: __root.tsx"},{depth:3,id:"صفحة-واحدة-لكل-ملف",text:"صفحةٌ واحدة لكلّ ملف"},{depth:3,id:"الصفحة-الرئيسية-indextsx",text:"الصفحة الرئيسية: index.tsx"},{depth:3,id:"شجرة-المسارات-المولدة",text:"شجرة المسارات المولَّدة"},{depth:3,id:"المسار-يتبع-اسم-الملف",text:"المسار يتبع اسم الملف"},{depth:3,id:"ما-الذي-يكسبه-هذا-الأسلوب",text:"ما الذي يكسبه هذا الأسلوب"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق بنينا الموجّه كاملًا داخل الشيفرة: مسارُ جذر، ومسارُ صفحة البداية، ومسارُ صفحة <code>about</code>، ثم ركّبنا شجرة المسارات بأيدينا وسلّمناها إلى <code>createRouter</code>. يعمل هذا الأسلوب جيدًا، لكنه يضع بنية التطبيق كلّها في ملفٍّ واحد، ويجعل أيّ تعديلٍ على المسارات تعديلًا على الشجرة المجمَّعة في الذاكرة.</p>
<p>في هذا الدرس نحوّل الموجّه إلى الأسلوب المعتمد على الملفات: يصير مجلّد <code>src/routes/</code> مصدر الحقيقة الوحيد، وتصير لكلّ صفحةٍ فيه ملفٌّ واحد. سنرى ما الذي يكتبه المولِّد آليًا في <code>routeTree.gen.ts</code>، وكيف تبقى المسارات متزامنةً مع أسماء ملفاتها، وما الذي تكسبه من سلامة الأنواع بمجرّد تبنّي هذا الأسلوب.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="مجلد-المسارات-نقطة-البداية">مجلّد المسارات: نقطة البداية</h3>
<p>أوّل خطوة هي إنشاء مجلّد <code>src/routes/</code> داخل المشروع. هذا هو الاسم الافتراضي لمجلّد المسارات، ويمكن تخصيصه إن أردت. وتضع داخله كلَّ ما يخصّ المسارات، وفي هذا الدرس ثلاثة ملفات:</p>
<ul>
<li><code>src/routes/__root.tsx</code> — المسارُ الجذر، وهو الإطارُ الذي يحيط بكلّ الصفحات</li>
<li><code>src/routes/index.tsx</code> — الصفحة الرئيسية، أي العنوان <code>/</code></li>
<li><code>src/routes/about.tsx</code> — صفحة <code>about</code>، أي العنوان <code>/about</code></li>
</ul>
<p>في الشجرة التي كتبناها بأيدينا في الدرس السابق كان لكلّ مسارٍ تعريفٌ داخل الذاكرة؛ أمّا هنا فالمسارُ هو الملفُ نفسه، وما عدا ذلك من تفاصيل الشجرة صار من شأن المولِّد وحده.</p>
<h3 id="ملف-الجذر-roottsx">ملف الجذر: <code>__root.tsx</code></h3>
<p>المسارُ الجذر في هذا الأسلوب ملفٌ واحد داخل مجلّد المسارات. وحين تنشئ هذا الملف، يضيف المولِّد آليًا سطرَ تعريف المسار، فلا تحتاج إلى استدعاء <code>createRootRoute</code> بنفسك ولا إلى تمرير المكوّن إليه؛ يكفي أن تضع مكوّنك في مكانه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Link</span>, <span class="hljs-title class_">Outlet</span>, createRootRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TanStackRouterDevtools</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router-devtools&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createRootRoute</span>({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RootComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RootComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-blue-950 p-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>Root Route<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 flex gap-2 mb-4 bg-teal-600&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Home
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
          About
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TanStackRouterDevtools</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;top-right&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>المكوّن نفسه لم يتغيّر عن الدرس السابق: ترويسةٌ، وشريطُ تنقّلٍ فيه رابطان، و<code>&lt;Outlet /&gt;</code> مكانَ عرض المسار الابن، وأدواتُ المطوّر في الزاوية. والتغيّرُ الوحيد أنّ تعريف المسار صار في الملف المولَّد، وأنّ شجرةَ المسارات اليدوية التي كانت في <code>src/main.tsx</code> اختفت.</p>
<h3 id="صفحة-واحدة-لكل-ملف">صفحةٌ واحدة لكلّ ملف</h3>
<p>صفحةُ <code>about</code> صارت ملفًا واحدًا هو <code>src/routes/about.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/about&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-pink-600&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>المولِّد كتب سطرَ <code>createFileRoute(&quot;/about&quot;)</code> نيابةً عنك، فلا تكتب العنوان بيدك. وحين تعيد تسمية الملف إلى <code>about-us.tsx</code> يُعاد كتابة السطر نفسه ليطابق الاسم الجديد، فيتحدّث العنوان المولَّد تلقائيًا.</p>
<h3 id="الصفحة-الرئيسية-indextsx">الصفحة الرئيسية: <code>index.tsx</code></h3>
<p>الصفحةُ الرئيسية في هذا الأسلوب ملفٌّ اسمه <code>index.tsx</code>، ويقابله العنوان <code>/</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-violet-500&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>ولاحظ أنّ شيفرة هذا الملف لا تتجاوز سطرَ تعريف المسار والمكوّن: لا استيرادَ إضافي، ولا ربطٌ مع شجرةٍ ما، ولا تعريفُ مسارٍ في مكان آخر. المسارُ معروفٌ من اسم ملفه.</p>
<h3 id="شجرة-المسارات-المولدة">شجرة المسارات المولَّدة</h3>
<p>بعد نقل الملفات إلى <code>src/routes/</code> ظهر في المشروع ملفٌ جديد اسمه <code>routeTree.gen.ts</code>. هذا هو الملف المولَّد الذي يحوي شجرة المسارات — أي الشجرة نفسها التي كنّا نكتبها بأيدينا في الدرس السابق — إضافةً إلى ما يلزم من أنواع TypeScript.</p>
<p>ولا حاجة من الآن فصاعدًا إلى تركيب الشجرة في الذاكرة؛ يكفي أن تستوردها من الملف المولَّد وتمرّرها إلى <code>createRouter</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">StrictMode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> { createRoot } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom/client&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./index.css&quot;</span>;
<span class="hljs-keyword">import</span> { createRouter, <span class="hljs-title class_">RouterProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> { routeTree } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./routeTree.gen&quot;</span>;

<span class="hljs-keyword">const</span> router = <span class="hljs-title function_">createRouter</span>({ routeTree });

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Register</span> {
    <span class="hljs-attr">router</span>: <span class="hljs-keyword">typeof</span> router;
  }
}

<span class="hljs-title function_">createRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;root&quot;</span>)!).<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StrictMode</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">RouterProvider</span> <span class="hljs-attr">router</span>=<span class="hljs-string">{router}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">StrictMode</span>&gt;</span></span>
);
</code></pre>
<p>سطرُ الاستيراد <code>import { routeTree } from &quot;./routeTree.gen&quot;;</code> يشير إلى الملف المولَّد في جذر <code>src</code>، بجوار <code>main.tsx</code> مباشرة. أمّا كتلة <code>declare module</code> فتسجّل نوعَ الموجّه في واجهة <code>Register</code> من المكتبة، فتصير أنواعُ المسارات معروفةً في كلّ المشروع.</p>
<p>ولكي يعمل هذا كلُّه أصلًا، يحتاج المشروع إضافة <code>tanstackRouter</code> من حزمة <code>@tanstack/router-plugin/vite</code> داخل <code>vite.config.ts</code>، وهي موجودةٌ فيه منذ درس التثبيت:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vite&quot;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@vitejs/plugin-react&quot;</span>;
<span class="hljs-keyword">import</span> tailwindcss <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tailwindcss/vite&quot;</span>;
<span class="hljs-keyword">import</span> { tanstackRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/router-plugin/vite&quot;</span>;

<span class="hljs-comment">// https://vite.dev/config/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">tanstackRouter</span>({
      <span class="hljs-attr">target</span>: <span class="hljs-string">&quot;react&quot;</span>,
    }),
    <span class="hljs-title function_">react</span>(),
    <span class="hljs-title function_">tailwindcss</span>(),
  ],
});
</code></pre>
<h3 id="المسار-يتبع-اسم-الملف">المسار يتبع اسم الملف</h3>
<p>يستحقّ هذا الجزء وقفةً: العنوان يبقى مكتوبًا داخل الملف في <code>createFileRoute(&quot;/about&quot;)</code>، لكنّ المشروع هو من يكتبه ويصحّحه. فإن غيّرتَه بيدك إلى قيمةٍ لا تطابق اسم الملف، ظهر خطأٌ في الأنواع في محرّرك. وإذا غيّرتَ اسم الملف أو اسم المجلّد، تُحدَّث العناوين تحتهما تلقائيًا.</p>
<p>وهنا يكمن الفرق العمليّ بين الأسلوبين: في الأسلوب اليدوي كان العنوانُ سطرًا تكتبه في شجرةٍ واحدة، وفي هذا الأسلوب صارت العناوينُ أسماءَ ملفات. وأيُّ خطأ في المطابقة يظهر لك في محرّرك فورًا بدل أن يظهر في المتصفّح بعد النشر.</p>
<h3 id="ما-الذي-يكسبه-هذا-الأسلوب">ما الذي يكسبه هذا الأسلوب</h3>
<p>وتجدر الإشارة إلى الفوائد الأخرى: المساراتُ مجموعةٌ في مجلّدٍ واحد فيصير فهمُها أسهل، وتنظيمُ الشيفرة أوضح وأقرب إلى التوسّع؛ وتقسيمُ الشيفرة إلى أجزاءٍ منفصلة لاحقًا يصير أسهل بكثير ممّا كان عليه في الأسلوب اليدوي؛ كما تأتيك ميزاتُ سلامة الأنواع جاهزةً بمجرّد أن يسمح المشروع للمكتبة بتوليد ما تحتاجه من أنواع TypeScript.</p>
<p>ثمّ ننتقل في الدرس التالي إلى ما هو أهمّ: المسارات المتداخلة والتخطيطات.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--file-based-router--home.png" alt="الصفحة الرئيسية بعد التحويل إلى الأسلوب المعتمد على الملفات: ترويسة المسار الجذر وشريط التنقّل وصفحة البداية البنفسجية"></p>
<p>في الصورة: الترويسةُ الداكنة في الأعلى هي المسارُ الجذر، وتحتها الشريطُ الفيروزّي وفيه رابطا <code>Home</code> و<code>About</code>، ثم الصندوقُ البنفسجيّ الذي يعرض الصفحة الرئيسية. كلُّ ذلك صار الآن ملفَّين اثنين في <code>src/routes/</code> بدل شجرةٍ مكتوبةٍ في الذاكرة، وفي الزاوية العليا اليمنى تظهر أداة المطوّر، وبفتح لوحتها تُعرض شجرة المسارات المولَّدة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أنشئ مجلّد <code>src/routes/</code>، وانقل إليه مكوّن المسار الجذر في ملف <code>__root.tsx</code>.</li>
<li>أضف <code>src/routes/about.tsx</code> و<code>src/routes/index.tsx</code>، وضع في كلٍّ منهما مكوّن الصفحة.</li>
<li>احذف شجرة المسارات اليدوية من <code>src/main.tsx</code>، واستورد <code>routeTree</code> من <code>./routeTree.gen</code> بدلًا منها.</li>
<li>شغّل <code>npm run dev</code>، ثم افتح <code>/</code> و<code>/about</code> وتأكّد من عمل الروابط بينهما.</li>
<li>أعد تسمية <code>about.tsx</code> إلى <code>about-us.tsx</code> وشاهد كيف يتغيّر العنوان المولَّد تلقائيًا، ثم أعِدها إلى <code>about</code>.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=1295s">فيديو الدرس: File Based Router</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/file-based-conversion">شيفرة الدرس: فرع file-based-conversion</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «File Based Router» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,p as default,l as headings,o as html,t as slug,e as title};
