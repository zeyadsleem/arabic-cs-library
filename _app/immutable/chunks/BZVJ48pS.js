const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="ignored-folders",l="المجلدات المتجاهلة ومجموعات المسارات",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"تجنب-إنشاء-مسارات-غير-مرغوبة-عبر-بادئة-الشرطة",text:"تجنّب إنشاء مسارات غير مرغوبة عبر بادئة الشرطة -"},{depth:2,id:"تنظيم-المسارات-عبر-المجموعات-group",text:"تنظيم المسارات عبر المجموعات (group)"},{depth:2,id:"تكامل-المسارات-الفرعية-مع-التخطيطات",text:"تكامل المسارات الفرعية مع التخطيطات"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في نظام التوجيه المبني على الملفات (file-based routing) في <code>TanStack Router</code>، يُعدّ أي مجلد أو ملف يُضاف إلى داخل مجلد <code>routes</code> جزءًا من شجرة المسارات. ولكن في التطبيقات الواقعية، غالبًا ما نحتاج إلى وضع مكوّنات مساعدة خاصة بصفحة أو تخطيط معين بجوار ملفات المسار نفسها لتسهيل تنظيم الشيفرة وتجاورها (<code>colocation</code>).</p>
<p>في هذا الدرس سنتعلّم:</p>
<ol>
<li>كيفية إنشاء مجلدات متجاهلة (<code>ignored folders</code>) داخل مجلد المسارات باستخدام بادئة الشرطة (<code>-</code>)، بحيث يتجاهلها مُولِّد المسارات تمامًا ولا يحوّلها إلى عناوين على الويب.</li>
<li>التعرّف على مجموعات المسارات (<code>route groups</code>) باستخدام الأقواس <code>(group)</code> للتنظيم المكتبي دون التأثير في روابط العناوين.</li>
</ol>
<h2 id="تجنب-إنشاء-مسارات-غير-مرغوبة-عبر-بادئة-الشرطة">تجنّب إنشاء مسارات غير مرغوبة عبر بادئة الشرطة <code>-</code></h2>
<p>إذا أنشأنا مجلدًا عاديًا باسم <code>components</code> داخل مسار مثل <code>_settingsLayout</code>، فسيعتبره <code>TanStack Router</code> مقطع مسار جديد وينشئ له عنوانًا مثل <code>/settings/components</code>.</p>
<p>لتجنّب هذا السلوك وإخبار الموجّه بتجاهل المجلد كليًّا، نضع شرطة أو ناقصًا (<code>-</code>) قبل اسم المجلد، مثل <code>-components</code>. أي مجلد يبدأ بهذه البادئة يُستثنى تلقائيًا من شجرة المسارات، مما يتيح لنا حفظ مكوّنات الواجهة داخله بأمان:</p>
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
<p>داخل هذا التخطيط نستخدم روابط التنقّل <code>Link</code> للتوجّه بين المسارات الفرعية للإعدادات، ونستطيع عزل عناصر واجهة المستخدم داخل المجلد المتجاهل واستيرادها عند الحاجة.</p>
<h2 id="تنظيم-المسارات-عبر-المجموعات-group">تنظيم المسارات عبر المجموعات <code>(group)</code></h2>
<p>بالإضافة إلى المجلدات المتجاهلة، يتيح لنا <code>TanStack Router</code> تنظيم المسارات باستخدام مجموعات المسارات (<code>route groups</code>). وتُعرَّف بوضع اسم المجلد بين قوسين دائريين مثل <code>(app)</code> أو <code>(marketing)</code>.</p>
<p>الميزة في مجموعات المسارات أنها لا تظهر إطلاقًا في رابط العنوان (URL)؛ فهي مخصصة فقط للتنظيم المكتبي لملفات المشروع داخل المحرّر، وتسمح بفصل مناطق التطبيق منطقيًا دون تغيير هيكل الروابط الخارجية التي يراها المستخدِم.</p>
<h2 id="تكامل-المسارات-الفرعية-مع-التخطيطات">تكامل المسارات الفرعية مع التخطيطات</h2>
<p>تبقى المسارات الفرعية داخل التخطيط نظيفة ومباشرة. فمثلًا يعرض مسار الدفع في <code>src/routes/_settingsLayout/settings/payment.tsx</code> محتواه المخصص داخل التخطيط الحاوي:</p>
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
<p>وبفضل المجلدات المتجاهلة، نستطيع تنظيم كل ما يحتاجه هذا المسار بجواره مباشرة دون تلويث شجرة التوجيه.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>عند فتح صفحة الإعدادات أو المسارات المتفرعة منها، نرى شجرة التوجيه في أدوات التطوير (<code>TanStack Router Devtools</code>) محتفظةً بمساراتها النظيفة دون أي ظهور للمجلدات التنظيمية:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--ignored-folders--settings-password.png" alt="شجرة المسارات مع الحفاظ على التخطيطات واستثناء المجلدات التنظيمية"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أنشئ مجلدًا باسم <code>-helpers</code> داخل مجلد <code>routes</code> وضع بداخله ملف دوال مساعدة، وتأكد من أن أدوات التطوير لم تُنشئ أي مسار لهذا المجلد.</li>
<li>احذف الشرطة من بداية اسم المجلد ليصبح <code>helpers</code> ولاحظ كيف يلتقطه الموجّه فورًا ويضيفه إلى شجرة المسارات كمسار جديد.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=2592s">فيديو الدرس: المجلدات المتجاهلة ومجموعات المسارات</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/pathless-layouts">فرع الدرس على GitHub (<code>pathless-layouts</code>)</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/route-trees">توثيق شجرة المسارات في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «المجلدات المتجاهلة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>pathless-layouts</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,p as html,t as slug,l as title};
