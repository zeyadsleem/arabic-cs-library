const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="caching",l="التخزين المؤقّت (Caching)",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"زرع-بطء-اصطناعي-كي-نراه-بأعيننا",text:"زرعُ بطءٍ اصطناعيٍّ كي نراه بأعيننا"},{depth:3,id:"قدم-المخزون-وتحقق-في-الخلفية",text:"قدّم المخزون، وتحقّق في الخلفية"},{depth:3,id:"ذاكرة-لا-تصمد-أمام-التحديث",text:"ذاكرةٌ لا تصمد أمام التحديث"},{depth:2,id:"مسار-الكلمة-العشوائية-مثال-يبرز-مفاتيح-الذاكرة",text:"مسار الكلمة العشوائية: مثالٌ يُبرز مفاتيح الذاكرة"},{depth:3,id:"مكون-الصفحة-الكلمة-وشريط-اللغات",text:"مكوّن الصفحة: الكلمة وشريط اللغات"},{depth:2,id:"القائمة-العلوية-ترتبط-بالمسار-الجديد",text:"القائمة العلوية ترتبط بالمسار الجديد"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>يرافق الموجّهَ <code>TanStack Router</code> التنقّلَ بين المساراتِ ذاكرةُ مؤقّتة (cache) مدمجة سبق الإشارة إليها في الدورة، وهذا الدرس موعدها عمليًّا: كيف تُقدَّم بياناتُ مسارٍ زرته قبل قليل فورًا بينما يُعاد جلبُها في الخلفية، وكيف تختفي كلّها بمجرّد تحديث الصفحة، وكيف يقوم مفتاحُ كلّ قيمةٍ مخزَّنة على «تبعياتٍ» معلَنة كي لا تختلط ذاكرةُ قيمةٍ بذاكرة غيرها.</p>
<p>يفتتح المؤلّف الدرسَ بنصيحةٍ عملية: فإن كنت تعمل على مشروعٍ فعليّ فاقرأ صفحة التوثيق التي تسرد مزايا هذه الذاكرة وعيوبها، فمستواها كافٍ غالبًا للتطبيقات الصغيرة والمتوسطة، ومن احتاج حلاً أكثر تقدّمًا فخياره التكامل مع <code>TanStack Query</code>. ولسنا في هذا الدرس سنستعمل <code>TanStack Query</code>؛ سنقف عند الذاكرة المدمجة: نُبطئ مسار التدوينة عمدًا لكي نشاهد الحفظ، ثم نبني مسار كلمةٍ عشوائية يعتمد على معاملات البحث (search params) لكي نشاهد ذاكرةً منفصلةً لكلّ قيمة.</p>
<h2 id="زرع-بطء-اصطناعي-كي-نراه-بأعيننا">زرعُ بطءٍ اصطناعيٍّ كي نراه بأعيننا</h2>
<p>كي نلاحظ أثر الذاكرة نحتاج أزمانَ تحميلٍ نرى فرقَها، والجلب الحقيقيّ أسرع من أن يُلاحَظ. لذلك يعود المؤلّف إلى مسار التدوينة <code>posts.$postId.tsx</code> ويدسّ في دالّة المُحمِّل (loader) انتظارًا اصطناعيًّا، ويبقى ما بعده كما بنيناه في الدروس السابقة:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ params }) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">3000</span>));
    <span class="hljs-keyword">const</span> commentsPromise = <span class="hljs-title function_">getPostComments</span>(+params.<span class="hljs-property">postId</span>);
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(+params.<span class="hljs-property">postId</span>);

    <span class="hljs-keyword">return</span> {
      post,
      commentsPromise,
    };
  },
</code></pre>
<p>السطر الأول هو زرع البطء: ينتظر المُحمِّل 3000 ميلي ثانية قبل أن يبدأ أيّ عملٍ حقيقيّ. وما بعده هو السلوك المألوف من الدروس السابقة: طلبُ التعليقات وعدًا مؤجَّلًا لا ينتظره تصيير المسار (<code>render</code>)، وطلبُ التدوينة انتظارًا كاملًا، ثم إرجاعُ الاثنين معًا ببيانات المسار.</p>
<p>جرّب بعد الحفظ: زُر أيّ تدوينة فستنتظر ثلاث ثوانٍ قبل ظهورها. ثم ارجع إلى قائمة التدوينات وازر التدوينة نفسها: تظهر على الفور. هذه هي الذاكرة المؤقّتة وقد بدأ مفعولها.</p>
<h3 id="قدم-المخزون-وتحقق-في-الخلفية">قدّم المخزون، وتحقّق في الخلفية</h3>
<p>لكن التفصيل الدقيق أنّ الزيارة الثانية لم تتخطَّ المُحمِّل: افتح تبويب <code>Network</code> في أدوات المطوّر، وامسح قائمة الطلبات السابقة ثم كرّر الزيارة: تجد أنّ الصفحة استجابت فورًا، وأنه بعد ثلاث ثوانٍ وصل الطلب الطويل إلى قائمة الشبكة. أي أنّ البيانات تُجلب من جديد في كل زيارة، وإنما لا ينتظر المستخدم ذلك الجلب.</p>
<p>هذا هو السلوك الافتراضيّ من غير أن نضبط خيارًا واحدًا: <strong>ما كان في الذاكرة المؤقّتة يُقدَّم فورًا، ويُعاد جمعُه في الخلفية، وإذا اكتمل الجديد حَلَّ محلَّه.</strong> ومن هذا السلوك أخذ النمط اسمه <code>stale-while-revalidate</code> — قدِّم القديم ثم تجدّد في الخلفية — وله اختصار معروف هو <code>SWR</code>. فيحصل المستخدم على نتيجةٍ سابقةٍ في الحال، وأحدثُها تسير خلف الكواليس حتى تصل.</p>
<h3 id="ذاكرة-لا-تصمد-أمام-التحديث">ذاكرةٌ لا تصمد أمام التحديث</h3>
<p>على أنّ هذه الذاكرة ليست دائمة: فهي كائنة في ذاكرة المتصفّح الجارية وحدها. حدّث الصفحة كاملةً من المتصفّح ثم ازر التدوينة ذاتها: يعود الانتظار ثلاثَ ثوانٍ من البداية، لأنّ إعادة التحميل مسحت الذاكرة كلّها فلم يبقَ في المخزون شيء يُقدَّم. فالذاكرة المؤقّتة تعيش جولة التصفّح نفسها ولا تنجو من تحديث الصفحة.</p>
<p>ويشير المؤلّف إلى وجود خياراتٍ للتحكّم في عمر البيانات المخزّنة وغير ذلك من الإعدادات، لكنّ هذا الدرس سيبقى مثاله على الافتراضات وينتقل إلى سؤالٍ لا يقلّ أهمية: أيّ النتائج المخزّنة تُمنح للطلب الجديد؟ فلسان الذاكرة أوّلًا وأوّلًا هو مفاتيحُها، وهو ما يجيبه المثالُ القادم.</p>
<h2 id="مسار-الكلمة-العشوائية-مثال-يبرز-مفاتيح-الذاكرة">مسار الكلمة العشوائية: مثالٌ يُبرز مفاتيح الذاكرة</h2>
<p>كي ترى المفاتيح عمليًّا، يُقيم المؤلّف مسارًا صغيرًا يعرض كلمةً عشوائية: دالّة مُحمِّل تستغرق ثانيةً ثم تجلب الكلمة من واجهة برمجية خارجية، والصفحة تعرضها. أنشئ ملفًّا جديدًا في مجلّد المسارات اسمه <code>random-word.tsx</code>، وهذا رأسه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> { zodValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/zod-adapter&quot;</span>;
<span class="hljs-keyword">import</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;zod&quot;</span>;

<span class="hljs-keyword">const</span> randomWordSearchParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">lang</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;es&quot;</span>, <span class="hljs-string">&quot;fr&quot;</span>, <span class="hljs-string">&quot;zh&quot;</span>]).<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LangType</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> randomWordSearchParamsSchema&gt;[<span class="hljs-string">&quot;lang&quot;</span>];
</code></pre>
<p>الواردات الثلاثة كلّها مألوفة من الدروس السابقة: <code>createFileRoute</code> لتعريف المسار، و<code>Link</code> لروابطه، و<code>zodValidator</code> من <code>@tanstack/zod-adapter</code> لتحويل مخطط <code>Zod</code> إلى متحقّقٍ صالحٍ لمعاملات البحث. وأمّا المخطط <code>randomWordSearchParamsSchema</code> فيعلن معامل بحثٍ اسمه <code>lang</code> تقتصر قيمه على أربعة: <code>en</code> و<code>es</code> و<code>fr</code> و<code>zh</code>، وهو اختياريّ (<code>optional</code>). والنوع <code>LangType</code> مستنتج من المخطط بواسطة <code>z.infer</code>، فيكون اتحادًا من ذي القيم الأربع أو <code>undefined</code> لأنّ المعامل غير إلزامي، وهذا ما سيلزم شريط التبديل لاحقًا.</p>
<p>والآن هيئة المسار التي تجمع الخيارات معًا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/random-word&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">validateSearch</span>: <span class="hljs-title function_">zodValidator</span>(randomWordSearchParamsSchema),
  <span class="hljs-attr">loaderDeps</span>: <span class="hljs-function">(<span class="hljs-params">{ search }</span>) =&gt;</span> ({ <span class="hljs-attr">lang</span>: search.<span class="hljs-property">lang</span> }),
  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ deps }) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">1000</span>));
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
      <span class="hljs-string">\`https://random-words-api.kushcreates.com/api?words=1&amp;language=<span class="hljs-subst">\${deps.lang || <span class="hljs-string">&quot;en&quot;</span>}</span>\`</span>
    );
    <span class="hljs-keyword">const</span> resJSON = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>();
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">word</span>: resJSON[<span class="hljs-number">0</span>]?.<span class="hljs-property">word</span> };
  },
});
</code></pre>
<p>الخيار <code>validateSearch: zodValidator(randomWordSearchParamsSchema)</code> يعلّق المخططَ حارسًا للمعاملات كما فعلنا في دروس معاملات البحث: لا يمرّ في العنوان إلا ما يقبله المخطط. وأمّا الخيار المحوريّ في الدرس فهو <code>loaderDeps: ({ search }) =&gt; ({ lang: search.lang })</code>.</p>
<p>تذكّر مما شرحناه في درس سابق: المُحمِّل لا يستلم معاملات البحث في وسيطاته مباشرة، وعلَّلنا ذلك بربطها بالذاكرة المؤقّتة والجلب المسبق (preload)؛ فالذاكرة تحتاج أن تعرف صراحةً ما الذي يعتمد عليه المُحمِّل من المعاملات كي تفصل ذاكرة كلّ قيمةٍ عن أخواتها. ولهذا جاء <code>loaderDeps</code>: دالة تستلم معاملات البحث المصحَّحة وتعيد كائنًا صغيرًا من التبعيات — هنا <code>lang</code> وحدها — فيصل الكائنُ إلى المُحمِّل في وسيطه <code>deps</code>. وبهذا التعريف تنتبه المكتبة إلى أنّ <code>lang</code> جزء من مفتاح ما يحفظه المُحمِّل: تغيّرُ قيمته نتيجةً أخرى وذاكرةً أخرى، ولا خلط بينهما.</p>
<p>وأمّا المُحمِّل نفسه فيجعل نفسه بطيئًا بثانيةٍ عبر الوعد المألوف بين السطور، ثم يطلب كلمةً من واجهة برمجية خارجية، ويقرَّر لغةَ الكلمة في عنوان الاستدعاء بالصيغة <code>\${deps.lang || &quot;en&quot;}</code>: إن غاب <code>lang</code> من العنوان كانت الإنجليزية القاعدة. ويُرجع المُحمِّل نتيجتَه الوحيدة في الكائن <code>{ word }</code>.</p>
<p>وبهذا تبدو التجربة من العنوان وحده: <code>/random-word</code> تقدّم كلمة إنجليزية، و<code>/random-word?lang=fr</code> فرنسيةً، و<code>/random-word?lang=zh</code> صينيةً — كل قيمةٍ لها ذاكرة خاصة لا تُمسّ.</p>
<h3 id="مكون-الصفحة-الكلمة-وشريط-اللغات">مكوّن الصفحة: الكلمة وشريط اللغات</h3>
<p>قد لا يجدي توليفُ المعاملات يدويًّا في العنوان لزائرٍ عاديّ، فيكفيه شريطٌ من الروابط بدلًا. هذه هيئة مكوّن الصفحة (component) كاملًا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { word } = <span class="hljs-title class_">Route</span>.<span class="hljs-title function_">useLoaderData</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex flex-col items-center justify-center bg-black p-4 m-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-gray-800 p-2 rounded-md mb-4&quot;</span>&gt;</span>
        {[&quot;en&quot;, &quot;es&quot;, &quot;fr&quot;, &quot;zh&quot;].map((lang) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{lang}</span>
            <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;.&quot;</span>
            <span class="hljs-attr">search</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">lang:</span> <span class="hljs-attr">lang</span> <span class="hljs-attr">as</span> <span class="hljs-attr">LangType</span> }}
            <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold mx-2&quot;</span>
          &gt;</span>
            {lang}
          <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>{word}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يقرأ المكوّن الكلمةَ من بيانات المُحمِّل (<code>loader data</code>) عبر <code>Route.useLoaderData()</code> ويعرضها بخطٍّ عريض، وفوقها شريطُ تبديل اللغة: يمرّ على المصفوفة <code>[&quot;en&quot;, &quot;es&quot;, &quot;fr&quot;, &quot;zh&quot;]</code> ويصوغ لكل لغة رابط <code>Link</code> إلى <code>to=&quot;.&quot;</code> — أي المسار الحالي نفسه بلا تنقّل حقيقيّ — مع خاصية <code>search</code> لا تحمل عن المعامل شيئًا آخر، فيتبيّن المعامل وحده: النقر على <code>fr</code> يجعل العنوان <code>/random-word?lang=fr</code>. وقيمة الحلقة سلسلة حرّة، فتُحوَّل في موضعها إلى النوع المستنتج عبر <code>lang as LangType</code> كي يقبلها الرابط بلا تصاعدٍ في الأنواع.</p>
<h2 id="القائمة-العلوية-ترتبط-بالمسار-الجديد">القائمة العلوية ترتبط بالمسار الجديد</h2>
<p>كي يصل الزائر إلى هذه التجربة من غير كتابة عنوان، تُضاف القائمةُ الرئيسية في المسار الجذر <code>__root.tsx</code> رابطًا ثالثًا:</p>
<pre><code class="language-tsx">      &lt;div className=<span class="hljs-string">&quot;p-2 flex gap-2 mb-4 bg-teal-600 border-2&quot;</span>&gt;
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Home
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
          About
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/random-word&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Random Word
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
      &lt;/div&gt;
</code></pre>
<p>رابطٌ ثالث بين <code>Home</code> و<code>About</code> يشير إلى <code>/random-word</code>، ولم يطرأ جديد: تنسيقة الرابط المألوفة <code>[&amp;.active]:font-bold</code> تجعله عريضَ الخط ما دمتَ عليه، كما في كلّ روابط هذا الشريط.</p>
<p>والآن تجري المشاهدة على حالتين:</p>
<ul>
<li>من <code>About</code> انقل إلى <code>Random Word</code>: الزيارة الأولى تنتظر ثانيةً واحدة (المخزون فارغ)، ثم ارجع إلى <code>About</code> وعُد إلى <code>Random Word</code>: تظهر الكلمة نفسها فورًا من المخزون، وبعد ثانيةٍ تصل كلمةٌ جديدة وتستبدلها. وقد جعلنا مُحمِّله بطيئًا بمقدار ثانيةٍ كي تتميّز عينُك بين اللحظتين من غير تردّد.</li>
<li>والتجربة الأدقّ بين اللغات: انقر <code>en</code> فتظهر كلمة إنجليزية، ثم انقر <code>es</code> فكلمة مختلفة، ثم عُد إلى <code>en</code>: تعود الكلمة الإنجليزية المخزنة سابقًا فورًا، وتتجهّز كلمةُ أحدث في الخلفية. والشيء نفسه إن عُدتَ إلى <code>es</code>: الكلمة القديمة ذاتها أولًا، ووافدها الجديد لاحقًا.</li>
</ul>
<p>فذاكرةُ كلّ لغةٍ قائمةٌ بذاتها، ولا يتقاسم بعضُها مفتاحَه مع بعض.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>بعد هذا الدرس على التطبيق ثلاثة تغيّرات:</p>
<ul>
<li>مسار التدوينة لم يتغير شكلُه، إذ سطرُ انتظارٍ واحد في المُحمِّل كشف سلوكَ الذاكرة الافتراضي: زيارة أولى تنتظر ثلاثِ ثوانٍ، وزيارات لاحقة فورية مع تنشيطٍ جديدٍ في الخلفية (<code>stale-while-revalidate</code>).</li>
<li>مسارٌ جديد على العنوان <code>/random-word</code> يعرض كلمةً عشوائية بعد ثانية، ويعتمد في هوية نتيجته على معامل البحث <code>lang</code> ذي الأربع قيم: <code>en</code> و<code>es</code> و<code>fr</code> و<code>zh</code>، ولكل قيمةٍ ذاكرةٌ منفصلة، وغيابُ المعامل يعني الإنجليزية.</li>
<li>شريطُ تبديل اللغات داخل الصفحة، ورابط <code>Random Word</code> جديد في القائمة العلوية. وهذه لقطةٌ من فرع الدرس بعد اكتماله:</li>
</ul>
<p><img src="/arabic-cs-library/images/tanstack-router/router--caching--random-word.png" alt="صفحة random-word كما تبرز في التطبيق: شريط تبديل اللغات en وes وfr وzh أعلى الكلمة serendipity بخط عريض، ورابط Random Word نشطًا في شريط التنقّل العلوي"></p>
<p>في اللقطة كلمة <code>serendipity</code> المعروضة عن القيمة الإنجليزية، والرابط النشط في شريط التنقّل مميَّزٌ بخطٍّ عريض بتنسيقة الروابط التي شرحناها.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>ادخل تدوينةً ثم عُد إلى القائمة وادخلها مرةً ثانية: الأولى تنتظر ثلاثَ ثوانٍ؛ وفي الثانية راقب تبويب <code>Network</code>: لا انتظار في العرض، والطلب الطويل يظهر في القائمة بعد ثلاث ثوانٍ.</li>
<li>حدّث الصفحة كاملةً ثم أدخل التدوينة ذاتها: لن يُقدَّم من المخزون شيء، لأنّ الذاكرة اختفت مع تحديث الصفحة.</li>
<li>على <code>/random-word</code> بدّل بين اللغات وراقب العنوان: كل قيمة <code>lang</code> عنوانٌ مستقلٌ بذاكرتها، وحذفُ المعامل يعيدك إلى الإنجليزية.</li>
<li>تأمّل العلة: لو قرأ المُحمِّل <code>search.lang</code> بوسائطه مباشرة، فماذا يعني ذلك لمفتاح الذاكرة، ولماذا يكون ذلك خطرًا على الجلب المسبق كما شرحناه في دروس سابقة؟</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=11218s">فيديو الدرس: التخزين المؤقّت</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/caching-1">شيفرة الدرس: فرع <code>caching-1</code></a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/data-loading">التوثيق الرسمي: دليل تحميل البيانات وفيه قسمُ الذاكرة المؤقّتة المدمجة وخياراتها</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/search-params">التوثيق الرسمي: معاملات البحث (search params)</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ معدّ عن درس «التخزين المؤقّت» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما زاده المترجم من شرحٍ أو توضيحٍ لا ينسب إلى المؤلّف.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:o};export{s as book,a as chapter,n as chapterTitle,p as default,e as headings,o as html,t as slug,l as title};
