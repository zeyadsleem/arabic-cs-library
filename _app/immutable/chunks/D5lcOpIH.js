const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="preloading",e="التحميل المسبق (Preloading)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"استراتيجيات-التحميل-المسبق-في-الروابط",text:"استراتيجيات التحميل المسبق في الروابط"},{depth:2,id:"الضبط-العام-للتحميل-المسبق-في-createrouter",text:"الضبط العام للتحميل المسبق في createRouter"},{depth:2,id:"مكون-الجذر-والروابط-المسبقة",text:"مكوّن الجذر والروابط المسبقة"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>بعد أن تعرّفنا في الدرس السابق على تقسيم الشيفرة (<code>code splitting</code>) وكيف يقلل من حجم الحزمة المبدئية للتطبيق، نأتي الآن إلى الميزة المكمّلة التي تجعل التنقّل فوريًا: <strong>التحميل المسبق (<code>preloading</code>)</strong>.</p>
<p>في هذا الدرس سنتعلّم:</p>
<ol>
<li>مفهوم التحميل المسبق لكل من شيفرة المكوّنات وبيانات دوالّ التحميل (<code>loaders</code>) قبل أن يضغط المستخدِم على الرابط.</li>
<li>استراتيجيات التحميل المسبق الثلاث: النيّة (<code>intent</code>)، والتصيير (<code>render</code>)، ومجال الرؤية (<code>viewport</code>).</li>
<li>الضبط العام للتحميل المسبق على مستوى الموجّه (<code>createRouter</code>) وضبط التأخير الزمني (<code>defaultPreloadDelay</code>).</li>
</ol>
<h2 id="استراتيجيات-التحميل-المسبق-في-الروابط">استراتيجيات التحميل المسبق في الروابط</h2>
<p>عند تفعيل التحميل المسبق على رابط ما، يراقب <code>TanStack Router</code> تفاعل المستخدِم، وما إن يتحقق شرط الاستراتيجية حتى يبدأ في جلب ملفات الجافاسكريبت المقسمة للمسار وتشغيل دوال التحميل (<code>loader</code>) لجلب بياناته وتخزينها مسبقًا في الذاكرة المؤقتة.</p>
<p>تتوفّر ثلاث استراتيجيات رئيسية عبر الخاصية <code>preload</code>:</p>
<ul>
<li><strong>النيّة (<code>intent</code>)</strong>: يتم التحميل بمجرّد تمرير مؤشر الفأرة (<code>hover</code>) فوق الرابط أو لمسه، بافتراض أن حركة المستخدِم نحو الرابط تعبّر عن نية النقر عليه.</li>
<li><strong>التصيير (<code>render</code>)</strong>: يتم جلب بيانات المسار وشيفرته فور تصيير مكوّن الرابط في الصفحة، دون انتظار أي تفاعل من المستخدِم.</li>
<li><strong>مجال الرؤية (<code>viewport</code>)</strong>: يبدأ التحميل بمجرّد ظهور الرابط على شاشة العرض أثناء التمرير (<code>scrolling</code>).</li>
</ul>
<h2 id="الضبط-العام-للتحميل-المسبق-في-createrouter">الضبط العام للتحميل المسبق في <code>createRouter</code></h2>
<p>بدلًا من كتابة خاصية <code>preload</code> يدويًا على كل مكوّن <code>Link</code> في التطبيق، يتيح لنا <code>TanStack Router</code> تفعيلها عالميًا على مستوى التطبيق بالكامل داخل ملف <code>src/main.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> router = <span class="hljs-title function_">createRouter</span>({
  routeTree,
  <span class="hljs-attr">notFoundMode</span>: <span class="hljs-string">&quot;fuzzy&quot;</span>,
  <span class="hljs-attr">defaultPreload</span>: <span class="hljs-string">&quot;intent&quot;</span>,
  <span class="hljs-attr">defaultPreloadDelay</span>: <span class="hljs-number">1000</span>,
  <span class="hljs-attr">defaultNotFoundComponent</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Default Not Found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
  <span class="hljs-attr">context</span>: {
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">login</span>: <span class="hljs-function">() =&gt;</span> {},
    <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> {},
  },
});
</code></pre>
<ul>
<li><code>defaultPreload: &quot;intent&quot;</code>: يجعل التحميل المسبق عند التمرير هو السلوك الافتراضي لكافة الروابط في التطبيق.</li>
<li><code>defaultPreloadDelay: 1000</code>: يضيف مهلة انتظار بالمللي ثانية (هنا ثانية واحدة) قبل بدء التحميل؛ مما يمنع إرسال طلبات شبكة غير ضرورية إذا مرّ مؤشر الفأرة سريعًا وعَرَضيًا فوق الرابط دون نية حقيقية للزيارة.</li>
</ul>
<h2 id="مكون-الجذر-والروابط-المسبقة">مكوّن الجذر والروابط المسبقة</h2>
<p>في ملف الجذر <code>src/routes/__root.tsx</code>، تستفيد الروابط الطبيعية مثل رابط صفحة «عن الموقع» من الإعدادات العامة للموجّه دون أي تعقيد إضافي:</p>
<pre><code class="language-tsx">      &lt;div className=<span class="hljs-string">&quot;p-2 flex gap-2 mb-4 bg-teal-600 border-2&quot;</span>&gt;
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Home
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
          About
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
      &lt;/div&gt;
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TanStackRouterDevtools</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;top-right&quot;</span> /&gt;</span></span>
    &lt;/div&gt;
  );
}
</code></pre>
<p>وعند الرغبة في استثناء رابط محدد من التحميل المسبق، يمكن تمرير <code>preload={false}</code> مباشرة على ذلك الرابط لتجاوز الإعداد العام.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>عند فتح أدوات المطور ومراقبة لسان الشبكة (<code>Network</code>)، نلاحظ تحميل الشيفرة والبيانات تلقائيًا بمجرّد تمرير المؤشر فوق روابط المنشورات، فيكتمل الجلب في الخلفية ويصبح فتح الصفحة فوريًا:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--preloading--posts.png" alt="تحميل البيانات مسبقًا في شبكة المتصفح عند التمرير على الروابط"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>افتح لسان الشبكة في المتصفح ونظّف السجل، ثم مرّر المؤشر فوق رابط منشور دون أن تنقر عليه؛ راقب كيف تُرسل طلبات الجافاسكريبت والبيانات فورًا.</li>
<li>انقر على الرابط بعد انتهاء تحميله مسبقًا، ولاحظ كيف تُعرض الصفحة في لمح البصر دون ظهور حالة الانتظار (<code>pending component</code>).</li>
<li>جرّب ضبط <code>defaultPreloadDelay: 50</code> ولاحظ سرعة استجابة المتصفح في جلب البيانات بمجرّد ملامسة المؤشر للرابط.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=10777s">فيديو الدرس: التحميل المسبق (Preloading)</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/preloading">فرع الدرس على GitHub (<code>preloading</code>)</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/preloading">توثيق التحميل المسبق في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «التحميل المسبق» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>preloading</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,o as html,t as slug,e as title};
