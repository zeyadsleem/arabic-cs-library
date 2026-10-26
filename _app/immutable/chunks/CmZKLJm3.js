const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="search-parameters",l="معاملات البحث (Search Parameters)",p=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"صفحة-المنتجات-ومسارها-الجديد",text:"صفحةُ المنتجات ومسارُها الجديد"},{depth:3,id:"تمرير-معاملات-البحث-مع-الرابط",text:"تمريرُ معاملات البحث مع الرابط"},{depth:3,id:"قراءة-معاملات-البحث-في-الصفحة",text:"قراءةُ معاملات البحث في الصفحة"},{depth:3,id:"التحقق-من-معاملات-البحث-وأمان-الأنواع",text:"التحقّقُ من معاملات البحث وأمانُ الأنواع"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],e=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>كثيرٌ من تطبيقات الويب حالةٌ لا تنتهي: تصفيةٌ وترقيمٌ صفحيّ وترتيبٌ للنتائج. وحين تُخزَّن هذه الحالةُ في حالةِ React وحدها، تفقدها في اللحظة التي تبتعد فيها عن الصفحة أو تُحدِّثها. أمّا حين تعيش في عنوان الصفحة، فيمكنك أن تشارك الرابطَ أو تحفظه في المفضّلة أو تفتحه في تبويبٍ جديد، وتجد التطبيقَ بالحالة نفسها.</p>
<p>في هذا الدرس نتعلّم كيف يدير TanStack Router هذه المعاملات: كيف نمرّرها مع الرابط، وكيف تقرأها الصفحة، وكيف نتحقّق منها فنحصل على أمانِ أنواعٍ يكشف أخطاءَ الكتابة قبل أن تصل إلى المتصفّح.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="صفحة-المنتجات-ومسارها-الجديد">صفحةُ المنتجات ومسارُها الجديد</h3>
<p>لنتخيّل صفحةَ منتجاتٍ فيها قائمةٌ ومرشّحاتٌ وترقيمٌ صفحيّ، ونضع لها مسارًا جديدًا:</p>
<ul>
<li><code>src/routes/products.index.tsx</code></li>
</ul>
<p>ولاحقةُ <code>index</code> تجعل <code>/products</code> مسارًا مستقلًّا لا أبًا لأحد، على نحو ما تعلّمناه في درس المقاطع الديناميكية. والصفحةُ في فرع الدرس كالتالي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/products/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">validateSearch</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">search</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">sort_by</span>: (search.<span class="hljs-property">sort_by</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>) || <span class="hljs-string">&quot;&quot;</span>,
    };
  },
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> search = <span class="hljs-title class_">Route</span>.<span class="hljs-title function_">useSearch</span>();
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(search);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/products/&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>ولاحظ فيها <code>validateSearch</code>: دالّةٌ تستقبل ما في عنوان الصفحة كما هو، بلا أنواعٍ ولا تحقّق، وتُعيد كائنًا مُتحقَّقًا منه ومُمنَحًا أنواعَه. وسنعود إلى ذلك بتفصيلٍ أدناه.</p>
<h3 id="تمرير-معاملات-البحث-مع-الرابط">تمريرُ معاملات البحث مع الرابط</h3>
<p>كي نصل إلى الصفحة بمعاملات بحثٍ في عنوانها، نضيف إلى <code>Link</code> خاصيةً اسمها <code>search</code>، ونضع فيها المعاملاتَ في كائن. والصفحةُ الرئيسيةُ في فرع الدرس صارت كالتالي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-violet-500&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/{-$locale}/archive/{-$year}/{-$month}/{-$day}&quot;</span>
        <span class="hljs-attr">params</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">locale:</span> &quot;<span class="hljs-attr">fr</span>&quot;,
          <span class="hljs-attr">year:</span> &quot;<span class="hljs-attr">2009</span>&quot;,
        }}
      &gt;</span>
        Go to Archive
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/products&quot;</span>
        <span class="hljs-attr">search</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">sort_by:</span> &quot;<span class="hljs-attr">price</span>&quot;,
          // <span class="hljs-attr">product_type:</span> [&quot;<span class="hljs-attr">shoes</span>&quot;, &quot;<span class="hljs-attr">t-shirts</span>&quot;],
          // <span class="hljs-attr">pagination:</span> {
          //   <span class="hljs-attr">page:</span> <span class="hljs-attr">1</span>,
          //   <span class="hljs-attr">pageSize:</span> <span class="hljs-attr">10</span>,
          // },
          // <span class="hljs-attr">colors:</span> [&quot;<span class="hljs-attr">red</span>&quot;, &quot;<span class="hljs-attr">blue</span>&quot;],
          // <span class="hljs-attr">sale:</span> <span class="hljs-attr">true</span>,
        }}
      &gt;</span>
        Products with Filters
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وفي الشيفرة أمثلةٌ معطَّلةٌ بتعليقاتٍ توضّح ما يمكن أن يحمله <code>search</code>: سلسلةً نصيةً واحدة مثل <code>sort_by</code>، ومصفوفةً مثل <code>product_type</code>، وكائنًا متداخلًا مثل <code>pagination</code> الذي يحوي <code>page</code> و<code>pageSize</code>، ومصفوفةً أخرى مثل <code>colors</code>، وقيمةً منطقيةً مثل <code>sale</code>. وما نُفعّله في هذا الدرس هو <code>sort_by</code> وحدَه.</p>
<p>وكلُّ ما في <code>search</code> يجب أن يكون قابلًا للتسلسل بصيغة JSON. يحوّلُ TanStack Router هذه البنيةَ إلى نصٍّ في عنوان الصفحة، ثم يعيدها إلى كائنٍ بغيرها حين تقرأها الصفحة، فتجد المصفوفاتِ والكائناتِ كما مرّرتها لا نصوصًا.</p>
<h3 id="قراءة-معاملات-البحث-في-الصفحة">قراءةُ معاملات البحث في الصفحة</h3>
<p>نقرأ معاملات البحث من المسار نفسه عبر <code>Route.useSearch()</code>، وهذه هما السطران المسؤولان عن ذلك في المكوّن:</p>
<pre><code class="language-tsx">  <span class="hljs-keyword">const</span> search = <span class="hljs-title class_">Route</span>.<span class="hljs-title function_">useSearch</span>();
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(search);
</code></pre>
<p>ما يطبعه <code>console.log</code> هو الكائنُ نفسه الذي رأيناه في أدوات المطوّر: النصوصُ والمصفوفاتُ والكائناتُ كما مرّرناها. وبه نستطيع مثلًا أن نُبرز المرشّحاتِ المختارةَ حاليًا في واجهة الصفحة.</p>
<h3 id="التحقق-من-معاملات-البحث-وأمان-الأنواع">التحقّقُ من معاملات البحث وأمانُ الأنواع</h3>
<p>المشكلةُ فيما سبق: حين مرّرنا <code>sort_by</code> من الصفحة الرئيسية لم نحصل على أيّ أمانِ أنواع، فمَن يمرّر قيمةً منطقيةً مكان سلسلةٍ نصيةٍ لا يكتشف الخطأ إلّا في وقت التشغيل. وهنا يأتي دورُ <code>validateSearch</code>، وهي الدالّةُ التي تُمرَّر إلى المسار:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">validateSearch</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">search</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">sort_by</span>: (search.<span class="hljs-property">sort_by</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>) || <span class="hljs-string">&quot;&quot;</span>,
    };
  },
</code></pre>
<p>ما يدخلُ الدالّةَ هو كلُّ ما في العنوان بلا نوعٍ ولا تحقّق، أي مجموعةُ معاملاتِ البحث كما وصلت، وما تخرجه هو المعاملاتُ المُتحقَّقُ منها. وبتحديد <code>sort_by</code> على أنّه سلسلةٌ نصيةٌ يُصير نوعُه معروفًا للمحرّر: فالقيمةُ الصحيحةُ تُقبل، والقيمةُ المنطقيةُ خطأٌ يُعرض قبل التشغيل. ولاحظ أنّ ما تُعيده الدالّةُ هو كلُّ ما تراه الصفحة، فالمعاملاتُ التي لا تذكرها لا تصل إليها أصلًا.</p>
<p>وإن كانت معاملاتُك كثيرةً فمكتبةُ <code>Zod</code> أسهلُ من كتابة دالّة تحقّقٍ يدويّة، وفي الدورة درسٌ مستقلٌّ لها.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--search-parameters--products.png" alt="صفحةُ منتجاتٍ فُتحت على عنوانٍ يحمل معامل بحثٍ في نهايته وتعرض نصَّ الصفحة"></p>
<p>في الصورة صفحةُ <code>/products?sort_by=price</code>: النصُّ الظاهر هو <code>Hello &quot;/products/&quot;!</code> وهو محتوى الصفحة، وفي الزاوية العليا اليمنى تظهر أداةُ المطوّر. ولاحظ أنّ عنوان الصفحة يحوي معاملَ البحث في نهايته، فالعنوانُ وحدَه يصفُّ الحالةَ التي تعرضها الصفحة، ولهذا يمكنُ نسخُه ومشاركةُه فيؤدّي إلى النتيجة نفسها.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>استنسخ مستودعَ الدورة وانتقل إلى فرع <code>search-1</code>.</li>
<li>أنشئ الملف <code>src/routes/products.index.tsx</code> بالاستعانة بالشيفرة أعلاه، وهو في فرع الدرس جاهز.</li>
<li>أضف إلى <code>src/routes/index.tsx</code> رابطًا إلى <code>/products</code> مع <code>search={{ sort_by: &quot;price&quot; }}</code>.</li>
<li>شغّل <code>npm run dev</code> ثم افتح <code>/products</code> وحدَها، وبعدها اضغط الرابطَ «منتجات مع مرشّحات» ولاحظ عنوان الصفحة النهائي.</li>
<li>غيّر <code>sort_by: &quot;price&quot;</code> إلى <code>true</code> ولاحظ خطأ المحرّر الذي يقول إنّ النوعَ المطلوب نصٌّ لا قيمةٌ منطقية.</li>
<li>أضف إلى كائن <code>search</code> معاملًا جديدًا لا تذكره <code>validateSearch</code>، ولاحظ أنّه لا يظهر في عنوان الصفحة.</li>
<li>أزل <code>validateSearch</code> من المسار وأعد تمرير معاملٍ منطقيّ، ولاحظ أنّ الخطأ يختفي لأنّ أحدًا لم يعد يفحص الأنواع.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=4610s">فيديو الدرس: Search Parameters</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/search-1">شيفرة الدرس: فرع search-1</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Search Parameters» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
