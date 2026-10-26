const s="tanstack-router",a="router",o="دورة TanStack Router الكاملة",e="validating-search-params-with-zod",n="التحقّق من معاملات البحث بـZod",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"المشكلة-قبل-المخطط-نص-لا-نوع",text:"المشكلة قبل المخطط: نصّ لا نوع"},{depth:3,id:"تثبيت-المحول",text:"تثبيت المحوّل"},{depth:3,id:"تعريف-المخطط",text:"تعريف المخطط"},{depth:3,id:"ربط-المخطط-بالمسار",text:"ربط المخطط بالمسار"},{depth:3,id:"حين-تمرر-قيمة-لا-يقبلها-المخطط",text:"حين تمرّر قيمة لا يقبلها المخطط"},{depth:3,id:"ما-تقرأه-الصفحة-فعلا",text:"ما تقرأه الصفحة فعلًا"},{depth:3,id:"الأنواع-التي-يستنتجها-routeusesearch",text:"الأنواع التي يستنتجها Route.useSearch()"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],c=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق كتبنا دالّة <code>validateSearch</code> بأيدينا: نقرأ <code>search.sort_by</code>، ونحوّله بـ<code>as string</code>، ونضع قيمة احتياطية إن غاب. هذا يعمل مع معامل واحد، لكن صفحة المنتجات عندنا تحمل خمسة معاملات: واحد نصّي محدود القيم، وآخر رقمي متداخل في كائن، ومصفوفة ألوان، وقيمة منطقية للعرض. كتابة التحقّق اليدوي لكلّ ذلك تعني أن نصف الشكل مرتين، وأن نتذكّر عند كل تعديل أن نضيف الحقل الجديد في الموضعين.</p>
<p>في هذا الدرس نستبدل الدالّة اليدوية بمخطط <code>Zod</code>: نُعلن فيه الشكل الذي نقبله، فيتولّى هو التحقّق، ويستنتج <code>TypeScript</code> أنواع معاملات البحث من الإعلان نفسه. ونرى ما يحدث حين ينقص معامل مطلوب، أو تصل قيمة خارج القائمة المسموحة، وكيف يظهر المعامل الاختياري في نوعه بوصفه احتمالًا لا يقينًا.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="المشكلة-قبل-المخطط-نص-لا-نوع">المشكلة قبل المخطط: نصّ لا نوع</h3>
<p>تذكّر أنّ ما يصل إلى التطبيق يأتي من عنوان الصفحة، وهو حدّ خارجي يكتبه المستخدم أو ينسخه من رابط آخر. قد يكتب <code>?product_type=boots</code> وليس عندنا إلّا <code>shoes</code> و<code>t-shirts</code>، وقد يكتب <code>?sale=yes</code>، وقد يحذف <code>pagination</code> كلّها. ومع دالّة <code>validateSearch</code> اليدوية كان <code>sort_by</code> وحده هو ما نتحقّق منه؛ أمّا بقية المعاملات فلا أحد يفحصها، فإن وصلت بشكل غير متوقّع ظهر الخطأ داخل المكوّن أثناء التشغيل، أي بعد أن يكون المستخدم قد فتح الصفحة. ونقيض ذلك أيضًا مشكلة: حين نطبّع القيم في الدالّة اليدوية نكتب الأنواع بأنفسنا، فقد ننسى حقلًا جديدًا فلا يراه أحد.</p>
<h3 id="تثبيت-المحول">تثبيت المحوّل</h3>
<p>لا يربط <code>TanStack Router</code> نفسه بـ<code>Zod</code>؛ يربطه بمحوّل صغير اسمه <code>zodValidator</code> تعرضه حزمة <code>@tanstack/zod-adapter</code>. نثبّتها فنحصل عليها وعلى <code>Zod</code> معها، ولهذا لا تجد في ملفّ <code>package.json</code> بعد الدرس سطرًا مستقلًّا لـ<code>zod</code>:</p>
<pre><code class="language-json">  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@tailwindcss/vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.12&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-router&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.28&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-router-devtools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.28&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/zod-adapter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.32&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tailwindcss&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.12&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
</code></pre>
<h3 id="تعريف-المخطط">تعريف المخطط</h3>
<p>نفتح <code>src/routes/products.index.tsx</code> ونستورد المحوّل و<code>Zod</code>، ثم نُعلن مخططًا واحدًا يصف كلّ ما نتوقّعه في معاملات البحث:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { zodValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/zod-adapter&quot;</span>;
<span class="hljs-keyword">import</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;zod&quot;</span>;

<span class="hljs-keyword">const</span> productSearchParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">sort_by</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&quot;newest&quot;</span>, <span class="hljs-string">&quot;oldest&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]),
  <span class="hljs-attr">product_type</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&quot;shoes&quot;</span>, <span class="hljs-string">&quot;t-shirts&quot;</span>]).<span class="hljs-title function_">default</span>(<span class="hljs-string">&quot;shoes&quot;</span>),
  <span class="hljs-attr">pagination</span>: z
    .<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">page</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">default</span>(<span class="hljs-number">1</span>),
      <span class="hljs-attr">pageSize</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">default</span>(<span class="hljs-number">10</span>),
    })
    .<span class="hljs-title function_">default</span>({}),
  <span class="hljs-attr">colors</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;green&quot;</span>])).<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">sale</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">default</span>(<span class="hljs-literal">true</span>),
});
</code></pre>
<p>ولنقرأ الحقول واحدًا واحدًا، فكلّ سطر منها قرار تصميمي:</p>
<p><code>sort_by</code> نصّ لكنّه ليس أيّ نصّ. لو كتبناه <code>z.string()</code> لقبلنا <code>?sort_by=banana</code> ولم نعرف كيف نرتّب النتائج. لذلك نستخدم <code>z.enum</code> بقائمة القيم المسموحة، فيصير نوعه اتحادًا من ثلاثة ثوابت، ويصير إرسال غيرها خطأً في المحرّر قبل التشغيل. ولاحظ أنّه بلا <code>default</code> وبلا <code>optional</code>، أي أنّه <strong>مطلوب</strong>: لا بدّ أن يصل مع كلّ طلب.</p>
<p><code>product_type</code> أيضًا <code>enum</code> لكنّه بقيمة افتراضية <code>shoes</code>: إن لم يذكره الرابط، ملأه المخطط، فحصلت الصفحة على قيمة صالحة بدل قيمة غائبة تحتاج فحصًا في كلّ موضع تستعملها فيه.</p>
<p><code>pagination</code> كائن متداخل، وفيه الرقمان <code>page</code> و<code>pageSize</code> بقيمتين افتراضيتين <code>1</code> و<code>10</code>. والقيمة الافتراضية على الكائن الخارجي <code>.default({})</code> هي التي تجعل الكائن كلّه اختياريًا: إن غاب من العنوان كاملًا وُلد فارغًا ثم ملأ المخطط حقلَيه الداخليَّين. ولأنّ الحقلين <code>z.number()</code> صارا رقمين لا نصّين، فلا حاجة إلى <code>Number(...)</code> في المكوّن. وهنا يظهر الفرق قبل المخطط وبعده: ما في العنوان نصّ، فإن وصل <code>page</code> بلا تحقّق وقارنته بـ<code>page &gt; 1</code> حصلت على مقارنة نصّية صامتة تعطي نتيجة خاطئة بلا رسالة خطأ. أمّا الآن فقيمة مثل <code>?pagination={&quot;page&quot;:&quot;2&quot;}</code> تُرفض عند الحدّ بدل أن تتسرّب إلى الحساب.</p>
<p><code>colors</code> مصفوفة، وكلّ عنصر فيها واحد من ثلاثة ألوان. هنا نستخدم <code>.optional()</code> لا قيمة افتراضية، والفرق مقصود: قد لا يختار المستخدم لونًا أصلًا، ولا معنى لاختيار لون نيابةً عنه. وثمن ذلك أنّ نوعه يصبح <code>(&quot;red&quot; | &quot;blue&quot; | &quot;green&quot;)[] | undefined</code>، فمن يقرأه عليه أن يتحقّق من وجوده أولًا.</p>
<p><code>sale</code> قيمة منطقية افتراضية <code>true</code>، فالمعامل الذي لا يُذكر يعني «اعرض ما هو معروض للبيع». وبها صار <code>search.sale</code> قيمة منطقية دائمًا، لا نصًّا مثل <code>&quot;true&quot;</code> نحتاج إلى مقارنته.</p>
<h3 id="ربط-المخطط-بالمسار">ربط المخطط بالمسار</h3>
<p>بعد أن وصفنا الشكل، لا نكتب دالّة تحقّق. نمرّر المخطط إلى <code>zodValidator</code> ونضع الناتج في <code>validateSearch</code> كما كنّا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/products/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">validateSearch</span>: <span class="hljs-title function_">zodValidator</span>(productSearchParamsSchema),
});
</code></pre>
<p>هذا هو موضع الاستبدال الذي أشار إليه المؤلف: الدالّة التي كانت تكتب الأنواع والقيم الافتراضية بيدها اختفت، وحلّ محلها سطر واحد يشتقّ الاثنين من المخطط. ووجود المحوّل هنا ليس تزيينًا: هو الذي يفصل بين نوع <strong>ما يُكتب</strong> في الرابط ونوع <strong>ما يُقرأ</strong> منه. المخطط نفسه يقبل <code>product_type</code> غائبًا بسبب القيمة الافتراضية، لكنّ <code>Link</code> الذي يبني الرابط يجب أن يمرّر <code>sort_by</code> لأنّه مطلوب. لو مرّرنا المخطط مباشرة بلا محوّل لاختلط النوعان وصار على كلّ رابط أن يذكر الحقول الافتراضية أيضًا، وهو ما لا معنى له. ويمكنك في مشاريع أخرى تمرير المخطط وحده إن كان كلّ حقوله لها قيمة افتراضية أو كانت اختيارية.</p>
<h3 id="حين-تمرر-قيمة-لا-يقبلها-المخطط">حين تمرّر قيمة لا يقبلها المخطط</h3>
<p>الاختبار الأول: ماذا لو لم نمرّر <code>sort_by</code>؟ هذا مقتطف من الصفحة الرئيسية حيث نبني الرابط إلى المنتجات:</p>
<pre><code class="language-tsx">      &lt;<span class="hljs-title class_">Link</span>
        to=<span class="hljs-string">&quot;/products&quot;</span>
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
</code></pre>
<p>احذف <code>sort_by</code> من هذا الكائن وستحصل على خطأ نوع فوري: <code>search</code> ناقص حقلًا مطلوبًا. والسبب في المخطط نفسه، لا في <code>Link</code>؛ فالحقل الذي لا <code>default</code> له ولا <code>optional</code> لا يمكن أن يغيب، والمحرّر يخبرك بذلك قبل أن تفتح الصفحة. وهذا هو الفرق العملي بين «معامل لا بدّ منه» و«معامل له قيمة افتراضية»: الأول يفرض على كلّ رابط أن يذكره، والثاني يحرّرك من ذكره.</p>
<p>الاختبار الثاني: غيّر <code>sort_by: &quot;price&quot;</code> إلى <code>sort_by: &quot;cheapest&quot;</code>. القيمة ليست في القائمة، فيرفضها النوع. والأمر نفسه في <code>product_type</code>: المخطط يقبل <code>shoes</code> أو <code>t-shirts</code> فقط، لا مصفوفة منهما ولا قيمة أخرى. ولو أضفت إلى <code>colors</code> لونًا مثل <code>&quot;yellow&quot;</code> لظهر الخطأ في العنصر نفسه، لأنّ عناصر المصفوفة مقيّدة أيضًا بـ<code>enum</code> داخلي.</p>
<p>وإن وصلت قيمة مخالفة لا من المحرّر بل من عنوان كتبه المستخدم بيده، فلا يمرّ المخطط: يرمي التحقّق خطأً يحمل الرمز <code>VALIDATE_SEARCH</code>، ويتولّاه <code>errorComponent</code> بدل مكوّن المسار. ولهذا تكون القيم الافتراضية أهمّ من كونها اختصارًا: هي ما يمنع عنوانًا ناقصًا من أن يتحوّل إلى شاشة خطأ.</p>
<h3 id="ما-تقرأه-الصفحة-فعلا">ما تقرأه الصفحة فعلًا</h3>
<p>نعود إلى المكوّن. لم يتغيّر فيه شيء عن الدرس السابق، لكنّ ما يعود من <code>Route.useSearch()</code> تغيّر:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> search = <span class="hljs-title class_">Route</span>.<span class="hljs-title function_">useSearch</span>();
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(search);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/products/&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>في مخرجات <code>console.log</code> تجد <code>sort_by</code> كما مرّرته، ومعه <code>product_type: &quot;shoes&quot;</code> و<code>pagination: { page: 1, pageSize: 10 }</code> و<code>sale: true</code>، مع أنّ كائن <code>search</code> في <code>src/routes/index.tsx</code> لم يذكر <code>sale</code> أصلًا. هذه هي القيم الافتراضية تعمل: العنوان يحمل ما اخترته، والكائن الذي تقرأه الصفحة يحمل ما اخترته <strong>زائد</strong> ما افترضه المخطط. أمّا <code>colors</code> فغائب تمامًا، لأنّه <code>optional</code> ولا افتراضي له.</p>
<h3 id="الأنواع-التي-يستنتجها-routeusesearch">الأنواع التي يستنتجها <code>Route.useSearch()</code></h3>
<p>هنا مكسب <code>Zod</code> الحقيقي: لم نكتب نوع <code>search</code> في أيّ مكان، ومع ذلك يعرفه المحرّر بالتفصيل. مرّر المؤشّر على <code>search</code> في المكوّن، أو اكتب <code>search.</code> لتقترح عليك القائمة الحقول. <code>search.pagination.page</code> رقم، و<code>search.product_type</code> اتحاد ثابتين، و<code>search.sale</code> قيمة منطقية، و<code>search.colors</code> نوعه مصفوفة أو <code>undefined</code>. فإن حاولت <code>search.colors.map(...)</code> مباشرة اعترض المحرّر، واضطرّك إلى فحص مثل <code>search.colors?.length</code> أولًا. وهذا سلوك صحيح وليس عقبة: المخطط قال إنّ اللون قد لا يوجد، فالشيفرة يجب أن تقول ما ستفعله في هذه الحالة.</p>
<p>في المقابل، كلّ حقل له قيمة افتراضية أو غير اختياري مضمون في النوع، فلا فحص ولا <code>!</code> ولا قيمة احتياطية مكرّرة في المكوّن. وبهذا انتقل التحقّق من داخل كلّ مكوّن يقرأ المعاملات إلى موضع واحد عند تعريف المسار، وهو المكان الوحيد الذي يملك صلاحية أن يقرّر ما هو مقبول.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--validating-search-params-with-zod--products-validated.png" alt="صفحة المنتجات بعد التحقّق من معاملات البحث بمخطط Zod: تخطيط الجذر وقائمة التنقّل، وفي وسط الصفحة نصّ الصفحة وحدها"></p>
<p>في الصورة نرى تطبيقنا بعد الدرس: عنوان <code>Root Route</code> في الأعلى، وشريط التنقّل الذي يحوي <code>Home</code> و<code>About</code>، وأداة المطوّر في الزاوية، وفي الموضع المخصّص للصفحة يظهر <code>Hello &quot;/products/&quot;!</code>. الواجهة لم تتغيّر لأنّ الدرس لم يبنِ واجهة منتجات؛ ما تغيّر أنّ الصفحة التي تصل إلى هذا الموضع لم تعد تقبل معاملات بحث بغير الشكل الذي وصفناه. جرّب أن تفتح <code>/products</code> بلا <code>sort_by</code>، أو بقيمة ليست من الثلاث، وسترى أنّ الخطأ يُمسك عند حدود المسار قبل أن يصل إلى منطق المكوّن.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أزل <code>sort_by</code> من كائن <code>search</code> في <code>src/routes/index.tsx</code>، ثم أعد إضافة <code>sort_by: &quot;cheapest&quot;</code>، وقارن رسالة الخطأ في الحالتين.</li>
<li>اجعل <code>sort_by</code> له قيمة افتراضية <code>newest</code> بدل أن يكون مطلوبًا، ولاحظ أنّ الخطأ في <code>Link</code> يختفي وأنّ الصفحة تقرأ القيمة الافتراضية.</li>
<li>أضف حقلًا جديدًا للمخطط، مثل <code>minPrice: z.number().default(0)</code>، ثم اطبع <code>search</code> ولاحظ أنّه ظهر في الكائن دون أن تعدّل المكوّن.</li>
<li>أزل <code>.optional()</code> عن <code>colors</code> وأضف له <code>.default([])</code>، ثم حاول استعمال <code>search.colors.map(...)</code> وراقب كيف يتغيّر نوعه وما إذا بقي <code>undefined</code> في النوع.</li>
<li>غيّر <code>.default({})</code> في <code>pagination</code> إلى <code>.optional()</code>، وافتح الصفحة بلا معامل <code>pagination</code>، ثم لاحظ ما يعود به <code>search.pagination</code>.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=5016s">فيديو الدرس: Validating Search Params with Zod</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/search-2">شيفرة الدرس: فرع search-2</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/search-params">التوثيق الرسمي: معاملات البحث والتحقّق منها في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Validating Search Params with Zod» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:o,slug:e,title:n,headings:t,html:c};export{s as book,a as chapter,o as chapterTitle,p as default,t as headings,c as html,e as slug,n as title};
