const s="tanstack-router",a="router",t="دورة TanStack Router الكاملة",n="dynamic-path-segments",o="مقاطع المسار الديناميكية",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"خطة-المسارات-الثلاثة",text:"خطة المسارات الثلاثة"},{depth:3,id:"قائمة-المنشورات",text:"قائمة المنشورات"},{depth:3,id:"المقطع-الديناميكي-وعلامة-الدولار",text:"المقطع الديناميكي وعلامة الدولار"},{depth:3,id:"صفحة-التحرير-وفصلها-عن-سابقيها",text:"صفحة التحرير وفصلها عن سابقيها"},{depth:2,id:"قراءة-قيمة-المعرف-في-المكون",text:"قراءة قيمة المعرّف في المكوّن"},{depth:3,id:"في-ملف-المسار-نفسه",text:"في ملف المسار نفسه"},{depth:3,id:"مكون-في-ملف-مستقل-getrouteapi",text:"مكوّنٌ في ملف مستقل: getRouteApi"},{depth:2,id:"روابط-إلى-المسار-الديناميكي",text:"روابط إلى المسار الديناميكي"},{depth:3,id:"تمرير-params-كدالة",text:"تمرير params كدالّة"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في حالات كثيرة يلزم بعناوين التطبيق قيمةٌ لا تعرفها مسبقًا: مدوّنة مثلًا تعرض منشوراتها بعناوين على الصيغة <code>/posts</code> ثم معرّف المنشور، وأنت لا تعرف هذا المعرّف قبل الوصول إليه. هذا المقطع المتغيّر هو مقطع المسار الديناميكي (dynamic path segments)، ويسمّى في التوثيق معامل المسار (path params). ويعلمك هذا الدرس صياغته في التوجيه المبني على الملفات: تكفيك علامة الدولار في اسم الملف، فيصير ما بعدها مقطعًا يطابق أيّ قيمة تلحق بالعنوان. ويتابع المؤلف أسلوبَ الملفات المسطّحة (flat) الذي بدأناه في درس سابق، على أنّه يذكّرك بأنّ كلَّ ما تُنجزه الملفاتُ المسطّحة يمكن إنجازه بطريقة المجلدات كذلك.</p>
<p>يبني الدرس ثلاثة مسارات في التطبيق: <code>/posts</code> لقائمة المنشورات، و<code>/posts/$postId</code> لصفحة منشورٍ واحد، و<code>/posts/$postId/edit</code> لتحريره. ويشدّد على أنّ المسارات الثلاثة ستكون مستقلة في شجرة المسارات (<code>route tree</code>): فليس مسار المنشور ابنًا لقائمة المنشورات، وليست صفحةُ التحرير ابنًا لصفحة المنشور. ثم يجيب الدرس عن سؤالين يفرضهما ذلك المقطع الديناميكي: كيف تقرأ قيمة <code>postId</code> في مكوّن المسار وفي مكوّنٍ مستقل في ملف آخر بالدالة <code>getRouteApi</code>، وكيف تُنشئ روابط <code>Link</code> تؤدي إلى المسار الديناميكي بتسليم القيمة في الخاصية <code>params</code> كائنًا أو دالّة.</p>
<h2 id="خطة-المسارات-الثلاثة">خطة المسارات الثلاثة</h2>
<p>ينتظر هذا الدرس ثلاثة ملفات تخدم ثلاث صفحات مختلفة تمامًا:</p>
<ul>
<li><code>posts.index.tsx</code>: مسار القائمة، ويطابق العنوان <code>/posts</code> تمامًا.</li>
<li><code>posts.$postId.tsx</code>: صفحة المنشور، ويطابق <code>/posts</code> متبوعًا بأيّ مقطعٍ كقيمة للمعرّف.</li>
<li><code>posts.$postId.edit.tsx</code>: صفحة التحرير، ويطابق العنوان السابق متبوعًا بـ<code>edit</code>.</li>
</ul>
<p>كل ما يلزم لإنشاء هذه الملفات تعلّمناه في دروسٍ سابقة، عدا صياغة المقطع الديناميكي التي سيعلمك إياها هذا الدرس: فالتسمية بالنقاط بين المقاطع عرفتها من درس الملفات المسطّحة، واللاحقة <code>index</code> المُلحقة بنهاية الاسم عرفتَ أثرها كذلك. والقيد الذي يشدّد عليه المؤلف في الخطة أن تصير الصفحات الثلاث مستقلات في شجرة المسارات لا في علاقة أب وابن، لأنّ محتواها يختلف من صفحةٍ إلى أخرى تمامًا فلا بينها ما يبرر التداخل؛ والصورة النهائية التي نريدها في أدوات المطوّر شجرةٌ بثلاثة مسارات مستقلة لا يورّث بعضُها بعضًا.</p>
<h3 id="قائمة-المنشورات">قائمة المنشورات</h3>
<p>نبدأ بملف <code>posts.index.tsx</code>: أول الاسم مقطع المسار <code>posts</code>، ولاحقة <code>index</code> في ذيله. وأثر هذه اللاحقة رأيتَه في درسٍ سابق: بوجودها لن يكون مسار المنشورات أبًا لأيّ مسار، ولن يُطابق هذا المسار إلا العنوانَ <code>/posts</code> تمامًا لا <code>/posts</code> متبوعًا بشيءٍ ما.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});
</code></pre>
<p>وبمجرّد أنشائه صار في التطبيق مسارُ القائمة، وظهر ذلك في النصّ الترحيبي الافتراضي الذي يطبع المكوّن المولَّد باسم المسار: <code>Hello &quot;/posts/&quot;!</code>. وأما ما سيزاد فيه من روابط فستصل إلى شرحه في قسم الروابط قرب نهاية الدرس.</p>
<h3 id="المقطع-الديناميكي-وعلامة-الدولار">المقطع الديناميكي وعلامة الدولار</h3>
<p>الملف الثاني هو الجديد الحقيقي في هذا الدرس. أنشئ ملفًا وسمِّه <code>posts.$postId.tsx</code>: أول الاسم هو اسمُ المسار كما تعلم، وبعد النقطة تأتي علامة الدولار ثم اسمٌ تختاره أنت للمقطع، واختار المؤلف <code>postId</code>. وطريقة المجلدات تكافئ هذه الصياغة: مجلّد اسمه <code>posts</code> وداخله ملف يبدأ اسمه بالعلامة ذاتها، مثل <code>$postId.tsx</code>.</p>
<p>والأثر الذي تُحدثه العلامة كاملُه يظهر في تعريف المسار، إذ كُتب المقطع في المعرف بعلامته واسمه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});
</code></pre>
<p>فتصير الصفحة مستعدّة لأيّ قيمة: من الآن تستطيع زيارة <code>/posts/</code> متبوعة بأيّ معرّف — مثل <code>/posts/434</code> — فيستقبِل هذا المسار زيارتك، ومثلَها زيارةُ <code>/posts/1</code> التي ستراها في لقطات النتيجة.</p>
<h3 id="صفحة-التحرير-وفصلها-عن-سابقيها">صفحة التحرير وفصلها عن سابقيها</h3>
<p>يبقى الملف الثالث: تبني على النمط نفسه وتضيف مقطع التحرير <code>edit</code> في نهاية الاسم، فصار لدينا ملف <code>posts.$postId.edit.tsx</code> يخدم العنوان <code>/posts/$postId/edit</code>. لكن إن فتحت أدوات المطوّر (devtools) وشاهدت شجرة المسارات فيها رأيت ما لا نريده: مسار التحرير ظهر ابنًا لصفحة المنشور. واتفقنا منذ الخطة أن تكون الصفحات الثلاث مستقلة، لأنّ محتواها ومكوناتها تختلف كلُّها من صفحةٍ إلى أخرى.</p>
<p>يطرح المؤلف طريقتين للفصل، ومشى في الأولى ثم عاد عنها إلى الثانية، وكلتاهما تعطي النتيجة ذاتها: ثلاثة مسارات مستقلة في الشجرة. الأولى إلحاق <code>index</code> بنهاية اسم ملف المسار؛ يذكر المؤلف أنّ هذا يجعله مسارًا مستقلًّا بذاته، وأنّ الشجرة تعرض بعده المسارات الثلاثة منفصلة: <code>/posts</code> ثم <code>/posts/$postId</code> ثم <code>/posts/$postId/edit</code>. وبعد العرض أعاد الاسم إلى ما كان عليه بلا <code>index</code> ليتجه إلى الأسلوب الثاني، وهو الذي استقر في فرع الدرس: الشرطة السفلية التي تعرفها من درس التخطيطات غير المسّطّحة، إذ تمنع المسارَ الابنَ من أن يستخدم أباه تخطيطًا (layout) له.</p>
<p>وبتلك العلامة قطع مسارُ التحرير صلته بأبيه: أضِف الشرطة السفلية بعد <code>posts</code> في اسم الملف فيصير <code>posts_.$postId.edit.tsx</code>، فلن يعود مسار التحرير يستخدم مسارَ المنشور ولا مسارَ القائمة أبًا له. هذا هو الملف كما استقر عند فرع الدرس:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-router&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&#x27;/posts_/$postId/edit&#x27;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
})

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/posts/$postId/edit&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}
</code></pre>
<p>وهنا أثر العلامة يتثبّت في معرّف المسار الممرَّر إلى <code>createFileRoute</code>: <code>/posts_/$postId/edit</code>، حيث بقيت الشرطة موضعها. وبهذا صارت الشجرة كما خططنا: ثلاثة مسارات مستقلة لا يورّث أحدها آخر.</p>
<h2 id="قراءة-قيمة-المعرف-في-المكون">قراءة قيمة المعرّف في المكوّن</h2>
<p>زرتَ للتو العنوانَ <code>/posts/</code> متبوعًا بمعرّفٍ ما، فمن أين يستخرج المكوّن قيمةَ هذا المعرف؟ سنناقش في درسٍ لاحق دالّاتِ التحميل (loader)، وهي على الأرجح الموضعُ الذي تحتاج فيه إلى هذه القيمة، لأنّك تحمّل بياناتك فيها. وإن احتجتها في المكوّن نفسه لعرضها مثلًا فالأداة في عندك: فكائن المسار الذي أعلنه <code>createFileRoute</code> يجمع خُطّافات (hook) هذا المسار، فتقرأ بها القيمة أينما استدعتك الحاجة، ونبدأ بأبسط حالاتها: في ملف المسار نفسه.</p>
<h3 id="في-ملف-المسار-نفسه">في ملف المسار نفسه</h3>
<p>افتح في ملف المسار خُطّاف <code>Route.useParams()</code>؛ يرجع لك كائنًا مفتاحُه هو المقطع الذي اخترتَه في العلامة، فتفكّك منه <code>postId</code>. وستحظى هنا بالإكمال التلقائي على المفاتيح فيبقى كلُّ شيء آمن الأنواع (type-safe). فيمكن أن تعرض القيمةَ في سطر نصّي بجوار تحية المسار، وهو ما فعلَه المؤلف أمام الفيديو في هذا الموضع.</p>
<h3 id="مكون-في-ملف-مستقل-getrouteapi">مكوّنٌ في ملف مستقل: <code>getRouteApi</code></h3>
<p>ولنفترض بعد ذلك أنّ مكوّن المنشور يسكن في ملفٍ مستقل لا صلة له بملف المسار؛ فكيف تقرأ القيمة هناك؟ أنشأ المؤلف لهذا الغرض مكوّنًا في المجلد <code>routes/-components/</code>، وهو المجلد الذي تعرفه من درسٍ سابق فلا تصير ما دونه مسارات، وسمّاه <code>Post.tsx</code>. فصار ملف المسار يُرجِع المكوّن الذي عرّفه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Post</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./-components/Post&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Post</span> /&gt;</span></span>;
}
</code></pre>
<p>والدرس يمرّ على الخيارات في ترتيبها: تمرير <code>postId</code> في الخصائص يجوز، واستيراد كائن <code>Route</code> من ملف المسار إلى ملف المكوّن لاستدعاء خُطّافه من هناك خيارٌ يصفه المؤلف بأنّه غير موصى به. فالطريقة الموصى بها هي الدالة <code>getRouteApi</code>: تمرّر إليها معرّف المسار المطلوبَ خُطّافه، فتحصل على كائن يجمع خُطّافات ذلك المسار، وتستدعي منها <code>useParams</code> كما لو كنتَ في ملف المسار نفسه. هذا هو المكوّن كاملًا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { getRouteApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { useParams } = <span class="hljs-title function_">getRouteApi</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>);
  <span class="hljs-keyword">const</span> { postId } = <span class="hljs-title function_">useParams</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/posts/$postId&quot;!
      <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span> Post ID: {postId}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>راجع الشيفرة في الترتيب: استُدعيت <code>getRouteApi(&quot;/posts/$postId&quot;)</code> فأعادت كائن خُطّافات المسار، وفُكّ منه <code>useParams</code>، ومِن ثمّ انفُكّ <code>postId</code> ليطبع في السطر النصّي التالي: <code>Post ID: {postId}</code>. وبذلك بقى الأمان بذاته: إكمالٌ تلقائي وأنواعٌ سليمة كما لو كنتَ في ملف المسار.</p>
<h2 id="روابط-إلى-المسار-الديناميكي">روابط إلى المسار الديناميكي</h2>
<p>بقي الجزء الأخير: كيف تنقل الزائر روابطُ القائمة إلى صفحة المنشور؟ قائمة المنشورات الحقيقية ستوصل بياناتها في دروسٍ لاحقة، فنكتفي الآن برابطَين تجريبيّين ثابتَي النصّ، والمطلوب إتقان صياغة الانتقال إلى مسارٍ ديناميكي. هذا هو المكوّن بعد إضافة الرابطين:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/posts/&quot;! <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/posts/$postId&quot;</span>
        <span class="hljs-attr">params</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">postId:</span> &quot;<span class="hljs-attr">434</span>&quot;,
        }}
      &gt;</span>
        Go to Post
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/posts/$postId&quot;</span>
        <span class="hljs-attr">params</span>=<span class="hljs-string">{(prev)</span> =&gt;</span> ({ ...prev, postId: &quot;34435&quot; })}
      &gt;
        Go to Post
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>ثلاثُ نقاط تلخّصها الدرس. الأولى أنّ المكوّن <code>Link</code> نفسه الذي تعرفه من دروسٍ سابقة، وأنّ الخاصية <code>to</code> تأخذ المسارَ الديناميكي بصيغته الظاهرة في المعرف: <code>/posts/$postId</code>؛ فأنت لا تكتب في <code>to</code> معرّفَ المنشور نفسه، بل تكتب المقطع بعلامته واسمه. الثانية أنّ القيمة موضعُها الخاصيّة <code>params</code>، وقد مرّرت فيها كائنًا مفتاحُه اسم المقطع <code>postId</code> وقيمتُه <code>434</code>. والثالثة أنّ هذا النقل محميٌّ بالأنواع: إذا بدأت كتابة اسم المفتاح ظهر الإكمال التلقائي في مساعدك، وإذا مرّرت القيمة رقمًا بلا تنصيص حصلت على خطأ لأنّ القيمة يجب أن تكون سلسلةً نصّية، وإذا وقعتَ خطأً مطبعيًا في اسم المفتاح حصلت على خطأ كذلك. وبالنقر على هذا الرابط انتقلتَ إلى صفحة المنشور تلك.</p>
<h3 id="تمرير-params-كدالة">تمرير <code>params</code> كدالّة</h3>
<p>والشكل الثاني للخاصية يجعلها دالّة لا كائنًا: تستقبل الدالة قيم المعاملات السابقة — في الوسيط <code>prev</code> في الشيفرة — وتعيد كائنًا بالقيم الجديدة:</p>
<pre><code class="language-tsx">      &lt;<span class="hljs-title class_">Link</span>
        to=<span class="hljs-string">&quot;/posts/$postId&quot;</span>
        params={<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">postId</span>: <span class="hljs-string">&quot;34435&quot;</span> })}
      &gt;
        <span class="hljs-title class_">Go</span> to <span class="hljs-title class_">Post</span>
      &lt;/<span class="hljs-title class_">Link</span>&gt;
</code></pre>
<p>هذا الشكل يثمر مع تعدد المعاملات: فإذا كان لديك أكثر من معاملٍ ديناميكي في العنوان وأردت تحديث أحدها والإبقاء على الباقي، كفاك توسيعُ <code>...prev</code> ذلك؛ فهو يحفظ القيم السابقة ويعدّل ما تريده فقط. وفي مسارنا معاملٌ واحد، لذلك لا فرقَ فعلًا بين الشكلين كما يجزم المؤلف: النقر على هذين الرابطين يسلك السلوكَ ذاته ويقودك إلى صفحة المنشور.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>بعد هذا الدرس صار في التطبيق ما خططنا له: صفحةُ قائمة على <code>/posts</code>، وصفحةُ منشورٍ تخدم أيّ معرّفٍ يلحق بها، وصفحةُ تحريرٍ مستقلة عن سابقيها في الشجرة. وصار انتقال القيمة من العنوان إلى الشاشة ظاهرًا: تخرج القيمة من العنوان إلى الشيفرة عبر <code>useParams</code> المستمد من <code>getRouteApi</code>، والروابط تدفعها عند الانتقال على وجهَيها: ككائنٍ وكدالّة.</p>
<p>واللقطتان التاليتان ملتقطتان من فرع الدرس: الأولى صفحةُ القائمة على <code>/posts</code> وتطبع تحيةَ المسار وتعرض رابطين نصُّهما <code>Go to Post</code>، والثانية صفحةُ زيارة <code>/posts/1</code> حيث طبعها المكوّن بقيمة المعرّف المستخرجة من العنوان: <code>Post ID: 1</code>.</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--dynamic-path-segments--posts.png" alt="صفحة مسار /posts وهي تطبع تحية المسار وتعرض رابطي Go to Post متجاورَين"></p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--dynamic-path-segments--post.png" alt="صفحة زيارة /posts/1 وهي تطبع سطر Post ID: 1 بقيمة المعرّف المستخرَجة من العنوان"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>انقر <code>Go to Post</code> الأول في صفحة القائمة: يقفز شريط العنوان إلى <code>/posts/434</code>، وهي القيمة الممرَّرة في الشيفرة، وسترى النص <code>Post ID: 434</code> في الصفحة. فالقيمة وصلت من <code>params</code> إلى العنوان ثم خرجت منه إلى الشاشة.</li>
<li>غيّر قيمة المعرّف في شريط العنوان إلى <code>123</code> وسترى <code>Post ID: 123</code> بلا أيّ تعديل في الشيفرة؛ فالمقطع الديناميكي يطابق كل قيمة، والصفحة ذاتها تعرض القيمة التي وصلتها.</li>
<li>زُر <code>/posts/123/edit</code> وتأكّد في شجرة المسارات داخل أدوات المطوّر أنّ صفحة التحرير ظهرت مستقلة، لا ابنًا لصفحة المنشور.</li>
<li>اختبِر أمان الأنواع بنفسك: في <code>posts.index.tsx</code> حاول تمرير <code>postId: 434</code> بلا علامتي تنصيص، فيرفضك المحرّر ويذكّرك بأنّ القيمة سلسلةً نصّية، ثم أخطئ عمدًا في اسم المفتاح بإسقاط حرفٍ منه، فيردّ المحرّر الاسمَ الذي لا يعرفه لهذا المسار.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=3199s">فيديو الدرس: مقاطع المسار الديناميكية</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/dynamic-path-segments">شيفرة الدرس: فرع <code>dynamic-path-segments</code> في مستودع الدورة</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/path-params">توثيق معاملات المسار (path-params) في TanStack Router</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing">دليل التوجيه المبني على الملفات (file-based-routing) في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «مقاطع المسار الديناميكية» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>dynamic-path-segments</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:t,slug:n,title:o,headings:e,html:p};export{s as book,a as chapter,t as chapterTitle,c as default,e as headings,p as html,n as slug,o as title};
