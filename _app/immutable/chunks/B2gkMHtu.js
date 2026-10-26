const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="more-on-the-link-component",o="مزيد عن مكوّن الرابط (Link)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"التوجيه-الديناميكي-عبر-routeto",text:"التوجيه الديناميكي عبر Route.to"},{depth:2,id:"التنقل-النسبي-باستخدام-الخاصية-from",text:"التنقّل النسبي باستخدام الخاصية from"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدروس السابقة استخدمنا مكوّن <code>Link</code> للتنقّل بين الصفحات عبر تمرير مسارات مطلقة صريحة إلى الخاصية <code>to</code>، مثل <code>to=&quot;/products&quot;</code> أو <code>to=&quot;/posts&quot;</code>. ورغم أن هذه الطريقة تؤدي الغرض ومحمية بالكامل بأنواع <code>TypeScript</code>، فإن <code>TanStack Router</code> يوفّر إمكانيات متقدمة تجعل التنقّل أكثر مرونة وديناميكية.</p>
<p>في هذا الدرس سنتعلّم:</p>
<ol>
<li>تمرير المسارات بصورة ديناميكية باستخدام الخاصية <code>to</code> المشتقة مباشرة من كائن المسار المصدر <code>Route.to</code>.</li>
<li>التنقّل النسبي (<code>relative navigation</code>) باستخدام الخاصية <code>from</code> لتحديد نقطة الانطلاق، واستخدام المسارات النسبية في <code>to</code>.</li>
<li>الصعود في شجرة المسارات إلى المسار الأب مباشرة باستخدام المسار النسبي <code>to=&quot;..&quot;</code>.</li>
</ol>
<h2 id="التوجيه-الديناميكي-عبر-routeto">التوجيه الديناميكي عبر <code>Route.to</code></h2>
<p>بدلًا من كتابة المسار نصيًّا في كل رابط، يمكننا تصدير كائن المسار واستيراده حيث نحتاجه، ثم استخدام خاصية <code>to</code> الموجودة بداخله. ففي ملف <code>src/routes/index.tsx</code>، نستورد مسار المنتجات باسم <code>productsRoute</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Route</span> <span class="hljs-keyword">as</span> productsRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./products.index&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});
</code></pre>
<p>ثم نمرّر <code>productsRoute.to</code> إلى مكوّن الرابط <code>Link</code>:</p>
<pre><code class="language-tsx">      &lt;<span class="hljs-title class_">Link</span>
        to={productsRoute.<span class="hljs-property">to</span>}
        search={{
          <span class="hljs-attr">sort_by</span>: <span class="hljs-string">&quot;price&quot;</span>,
          <span class="hljs-attr">product_type</span>: <span class="hljs-string">&quot;shoes&quot;</span>,
          <span class="hljs-attr">pagination</span>: {
            <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">pageSize</span>: <span class="hljs-number">10</span>,
          },
          <span class="hljs-comment">// colors: [&quot;red&quot;, &quot;blue&quot;],</span>
          <span class="hljs-comment">// sale: true,</span>
        }}
      &gt;
        <span class="hljs-title class_">Products</span> <span class="hljs-keyword">with</span> <span class="hljs-title class_">Filters</span>
      &lt;/<span class="hljs-title class_">Link</span>&gt;
</code></pre>
<p>تفيد هذه الطريقة عند إعادة تسمية المسارات أو تعديل بنيتها؛ حيث تُحدَّث الروابط تلقائيًا دون الحاجة لتتبع السلاسل النصية يدويًا عبر صفحات التطبيق.</p>
<h2 id="التنقل-النسبي-باستخدام-الخاصية-from">التنقّل النسبي باستخدام الخاصية <code>from</code></h2>
<p>في المسارات المتداخلة، قد نرغب في الرجوع إلى الوراء أو الانتقال بالنسبة للمسار الحالي بدل كتابة المسار المطلق من الجذر.</p>
<p>داخل صفحة تعديل المنشور في <code>src/routes/posts_.$postId.edit.tsx</code>، يمكننا تحديد المسار الذي ننطلق منه عبر الخاصية <code>from</code>، ثم استخدام <code>..</code> في الخاصية <code>to</code> للصعود في شجرة المسارات:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts_/$postId/edit&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/posts/$postId/edit&quot;!
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/posts&quot;</span>&gt;</span>All Posts<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">from</span>=<span class="hljs-string">&quot;/posts/$postId/edit&quot;</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;../../../posts&quot;</span>&gt;</span>
        All Posts
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">from</span>=<span class="hljs-string">{Route.fullPath}</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;../../../posts&quot;</span>&gt;</span>
        All Posts
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;..&quot;</span>&gt;</span>Back to Post<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ الخيارات المتاحة في الشيفرة السابقة:</p>
<ul>
<li><code>to=&quot;/posts&quot;</code>: مسار مطلق مباشر إلى قائمة المنشورات.</li>
<li><code>from=&quot;/posts/$postId/edit&quot; to=&quot;../../../posts&quot;</code>: تنقّل نسبي يحدّد نقطة البداية ويصعد عبر المستويات للوصول إلى المسار المطلوب مع إكمال تلقائي وتدقيق نوعي صارم.</li>
<li><code>from={Route.fullPath}</code>: طريقة ديناميكية تحدّد مسار الصفحة الحالية تلقائيًا دون كتابته نصيًّا.</li>
<li><code>to=&quot;..&quot;</code>: يوجّه المستخدِم خطوة واحدة إلى المسار الأب المباشر في الشجرة (وهو صفحة المنشور نفسه <code>/posts/$postId</code>) دون الحاجة لتحديد خاصية <code>from</code>.</li>
</ul>
<h2 id="النتيجة">النتيجة</h2>
<p>عند زيارة صفحة تعديل المنشور، تظهر الروابط النسبية والمطلقة وهي تؤدي وظائف التنقّل بكفاءة وأمان كامل للأنواع:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--more-on-the-link-component--post.png" alt="روابط التنقل النسبي والمطلق في صفحة تعديل المنشور"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>انقر على رابط <code>Back to Post</code> ذي المسار النسبي <code>to=&quot;..&quot;</code> وتأكد من أنه يعيدك إلى تفاصيل المنشور الحالي.</li>
<li>جرّب تغيير عدد مستويات الصعود في الرابط النسبي مثل <code>../../posts</code> ولاحظ كيف يكتشف <code>TypeScript</code> فورًا أن المسار غير صحيح ويحذّرك من الخطأ أثناء الكتابة.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=5776s">فيديو الدرس: مزيد عن مكوّن الرابط (Link)</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/more-on-link">فرع الدرس على GitHub (<code>more-on-link</code>)</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/navigation">توثيق التنقّل ومكوّن Link في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «مزيد عن مكوّن الرابط» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>more-on-link</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,e={book:s,chapter:a,chapterTitle:n,slug:t,title:o,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,e as default,l as headings,p as html,t as slug,o as title};
