const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="code-splitting",p="تقسيم الشيفرة",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"ما-المقصود-بتقسيم-الشيفرة",text:"ما المقصود بتقسيم الشيفرة؟"},{depth:3,id:"ما-يبقى-في-الحزمة-الرئيسية-الشيفرة-الحرجة",text:"ما يبقى في الحزمة الرئيسية: الشيفرة الحرجة"},{depth:3,id:"ما-يحمل-عند-الطلب-الشيفرة-غير-الحرجة",text:"ما يُحمّل عند الطلب: الشيفرة غير الحرجة"},{depth:2,id:"تجهيز-مسار-التجربة",text:"تجهيز مسار التجربة"},{depth:2,id:"التفعيل-في-إعدادات-vite",text:"التفعيل في إعدادات Vite"},{depth:2,id:"التجربة-في-تبويب-الشبكة",text:"التجربة في تبويب الشبكة"},{depth:3,id:"بعد-التفعيل-المقاطع-تصل-عند-الطلب",text:"بعد التفعيل: المقاطع تصل عند الطلب"},{depth:3,id:"مسار-المنشور-المفرد-مكوناته-تقسم-هي-الأخرى",text:"مسار المنشور المفرد: مكوّناته تُقسَّم هي الأخرى"},{depth:3,id:"منشور-ثان-دون-مقاطع-جديدة",text:"منشور ثانٍ دون مقاطع جديدة"},{depth:2,id:"التخصيص-ماذا-يقسم-بالضبط",text:"التخصيص: ماذا يُقسَّم بالضبط؟"},{depth:2,id:"إن-تعذر-التفعيل-تلقائيا-التقسيم-بلاحقة-lazytsx",text:"إن تعذّر التفعيلُ تلقائيًا: التقسيم بلاحقة lazy.tsx"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>حتى هذا الدرس كان كلُّ ما تكتبه في ملفات المسارات — تعريف المسار ومكوّنِه ومكوّناتُ الخطأ والانتظار وغيرها — يُجمع في الحزمة (bundle) الرئيسية التي يحملها المتصفّح دفعةً واحدة عند فتح التطبيق. ويعرض المؤلف في هذا الدرس تقسيمَ الشيفرة (Code Splitting): أسلوبًا لتحسين حجم الحزمة وأداء التحميل، يقوم على تقليل الشيفرة التي تُحمَّل عند التحميل الابتدائي فيفتح التطبيق أسرع، ثم إحضار بقية مقاطع الشيفرة (<code>chunks</code>) عند الطلب كلما طُلب مسارٌ جديد.</p>
<p>يفرز الموجّه شيفرةَ كل مسار في فئتين فيهما خلاصةُ الدرس: شيفرةٌ حرجة (<code>critical</code>) لا يستقيم بها مطابقةُ المسار وبدءُ تحميل بياناته مبكرًا، فلا تُمسَّ ولا تُقسَّم؛ وشيفرةٌ غير حرجة قابلة للتأجيل، أبرزُها المكوّنات. ثم نفعّل في التجربة مفتاحًا واحدًا في إعدادات <code>Vite</code> ليتولّى التقسيمَ كله تلقائيًا، ونتابعه في تبويب الشبكة (<code>Network</code>) في أدوات المطوّر: صفحة about لا تحمّل شيئًا قبل التفعيل، وبعده تصل مقاطعُ مكوّنها عند أول زيارة فقط. ونختم بخيارات التخصيص التي يصفها التوثيق، وبالطريقة اليدوية بلاحقة <code>lazy.tsx</code> لمن لا يستطيع استعمال التقسيم التلقائي. أما التحميل المسبق (preloading) الذي يختم به المؤلف المقطعَ، فله درسٌ لاحق مستقل ولا تعالجه هذه الصفحة.</p>
<h2 id="ما-المقصود-بتقسيم-الشيفرة">ما المقصود بتقسيم الشيفرة؟</h2>
<p>تقسيم الشيفرة كما يقدّمه المؤلف تقنيةٌ لتحسين حجم الحزمة وأداء التحميل في تطبيقك: تقلّلُ ما يلزم تحميله عند التحميل الابتدائي، فيفتح التطبيق أسرع، ثمّ عندما تطلب مسارًا معيّنًا تُحمَّل حينئذٍ مقاطعُ شيفرةٍ إضافية عند الطلب. والحاصل أنّ زائرَ التطبيق لا يستقبل الحزمةَ كلها مرةً واحدة، بل يستقبل أولًا ما يكفي المكان الذي يقف فيه، ويؤجَّل له الباقي حتى يحتاجه.</p>
<h3 id="ما-يبقى-في-الحزمة-الرئيسية-الشيفرة-الحرجة">ما يبقى في الحزمة الرئيسية: الشيفرة الحرجة</h3>
<p>الشيفرة الحرجة هي التي تُلزم لتصيير المسار الحالي وبدء عملية تحميل البيانات في أقرب وقت ممكن: تعريفُ المسار ذاته، والتحقّق من الصحة (validation) لمعاملات البحث، ودالّة المُحمِّل (loader) وسياقها (context) وما إليها. هذه لا يُطبَّق عليها التقسيم؛ فوجودها من البداية في الحزمة الرئيسية هو ما يسمح للموجّه أن يعرِف بنية المسارات كلها دون انتظار، ويحرّك جلب البيانات قبل أن يتحمّل أي مكوّن.</p>
<h3 id="ما-يحمل-عند-الطلب-الشيفرة-غير-الحرجة">ما يُحمّل عند الطلب: الشيفرة غير الحرجة</h3>
<p>أمّا الشيفرة غير الضرورية لمطابقة المسار فهي قابلة للتأجيل: على رأسها مكوّن المسار (route component) الذي تكتبه كي يُعرَض المسار، ومكوّن الخطأ (<code>error component</code>) ومكوّن الانتظار (<code>pending component</code>) ومكوّن عدم العثور (<code>not-found component</code>). هذه تُفصل في مقاطع لا تنتقل مع الحزمة الابتدائية، بل يطلبها المتصفّح لاحقًا حين تزير الصفحة التي تحتاجها، فلا تشحن مكوّناتِ كل مساراتِك من البداية.</p>
<h2 id="تجهيز-مسار-التجربة">تجهيز مسار التجربة</h2>
<p>قبل التجربة رتّب المؤلف الميدانَ: كان مسار about في درسٍ سابق يحمل مثالًا يوجّه الزائر نحو /posts، كُتب حينئذٍ لا غير لاختبار مكوّن <code>Navigate</code>. هذا المثال سيعكّر تجربتَنا هنا لأنّ التنقّل إليه سيقفزُ إلى مكانٍ آخر قبل أن نرى ما يُحمَّل، فينزعه المؤلف أمام الكاميرا، فيصير المسار مكوّنًا بسيطًا كما هو الآن:</p>
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
<p>فصار التنقّل إلى about من الشريط العلوي تنقّلًا عاديًا، فترى إضافةً إلى ترويسة الجذر وشريطِ التنقّل القادمَين من ملف المسار الجذري <code>__root.tsx</code> بانرَ مسار about الوردي وعنوانَه كاملًا.</p>
<h2 id="التفعيل-في-إعدادات-vite">التفعيل في إعدادات Vite</h2>
<p>جرّب أولًا الحالَ قبل التفعيل من فرع الدرس: حدّث الصفحة الرئيسية، وافتح تبويب الشبكة، ثمّ انقر about. لن يتحرك شيء في الشبكة؛ لم يُطلَب أي مقطع. والسبب أنّ التقسيم غير مفعّل بعد، فشيفرة المسار كلّها — مكوّنَه وما يسنده — مضمّنة في الحزمة الرئيسية منذ التحميل الأول.</p>
<p>وتفعيلُ ذلك يقع في ملف إعدادات <code>Vite</code>: يسير المؤلف إلى خيارات إضافة الموجّه، فيضيف المفتاحَ <code>autoCodeSplitting</code> منصوبًا على <code>true</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vite&quot;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@vitejs/plugin-react&quot;</span>;
<span class="hljs-keyword">import</span> tailwindcss <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tailwindcss/vite&quot;</span>;
<span class="hljs-keyword">import</span> { tanstackRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/router-plugin/vite&quot;</span>;

<span class="hljs-comment">// https://vite.dev/config/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">tanstackRouter</span>({
      <span class="hljs-attr">target</span>: <span class="hljs-string">&quot;react&quot;</span>,
      <span class="hljs-attr">autoCodeSplitting</span>: <span class="hljs-literal">true</span>,
    }),
    <span class="hljs-title function_">react</span>(),
    <span class="hljs-title function_">tailwindcss</span>(),
  ],
});
</code></pre>
<p>بهذا المفتاح تتولّى إضافةُ الموجّه في ملف الإعدادات تقسيمَ ملفات المسارات كلها تلقائيًا بحسب الفئتين اللتين رأيتهما: يبقى ما هو حرج في الحزمة الرئيسية، وينفصل ما يمكن تأجيله في مقاطع خاصة به. ويلمّح المؤلف أنّ التفعيل قد يستلزم إعادة تشغيل خادم التطوير، ثم يجد الخادم قد أعد التشغيل بنفسه تلقائيًا.</p>
<h2 id="التجربة-في-تبويب-الشبكة">التجربة في تبويب الشبكة</h2>
<h3 id="بعد-التفعيل-المقاطع-تصل-عند-الطلب">بعد التفعيل: المقاطع تصل عند الطلب</h3>
<p>عد إلى الصفحة الرئيسية وحدّثها وفرّغ تبويب الشبكة، ثمّ انقر about: ستظهر هذه المرة طلباتٌ لمقاطع لم تكن تظهر قبل قليل. وفي تلك المقاطع شيفرةُ مكوّن المسار؛ فإن دقّقتَ النظر أو بحثتَ في محتواها عن نص العنوان قد تجده هناك: وسم <code>h3</code> بنص about وبأصناف التنسيق نفسِها التي كتبناها. فيتبيّن لك أنّ شيفرة هذا المكوّن حُمّلت عند الطلب لا غير.</p>
<h3 id="مسار-المنشور-المفرد-مكوناته-تقسم-هي-الأخرى">مسار المنشور المفرد: مكوّناته تُقسَّم هي الأخرى</h3>
<p>فلنجرب الآن مسارًا أغنى بمكوّناته: مسار المنشور المفرد الذي بنينا عليه درسَي حالة الانتظار وحدّ الأخطاء. ليس في المسار مكوّنُه فحسب، بل فيه أيضًا مكوّنُ الانتظار ومكوّنُ الخطأ ومكوّنُ عدم العثور، وكلُّها تُقسَّم كذلك:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;Error loading post:&quot;</span>, error);
  },
  <span class="hljs-attr">onCatch</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;onCatch&quot;</span>, error);
  },
  <span class="hljs-attr">notFoundComponent</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Post Not Found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
  <span class="hljs-attr">errorComponent</span>: <span class="hljs-function">(<span class="hljs-params">{ error, reset }</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> router = <span class="hljs-title function_">useRouter</span>();
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {error.message} <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
            router.invalidate();
          }}
        &gt;
          Retry
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-attr">pendingComponent</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
  <span class="hljs-attr">pendingMs</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">pendingMinMs</span>: <span class="hljs-number">500</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ params }) =&gt; {
    <span class="hljs-keyword">const</span> commentsPromise = <span class="hljs-title function_">getPostComments</span>(+params.<span class="hljs-property">postId</span>);
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(+params.<span class="hljs-property">postId</span>);

    <span class="hljs-keyword">return</span> {
      post,
      commentsPromise,
    };
  },
});
</code></pre>
<p>المكوّنات الثلاثة في المقتطف أعلاه — <code>notFoundComponent</code> و<code>errorComponent</code> و<code>pendingComponent</code> — هي الجزء غير الحرج من هذا المسار، فتُقسَّم كلُّ واحدةٍ منها في مقطعٍ تطلُبه الشبكةُ عند أول زيارة، أما <code>loader</code> فشيفرةٌ حرجة تبقى في الحزمة الرئيسية.</p>
<h3 id="منشور-ثان-دون-مقاطع-جديدة">منشور ثانٍ دون مقاطع جديدة</h3>
<p>يمضي المؤلف بعدئذٍ إلى قائمة المنشورات فيفتح المنشورَ الأول: إلى جانب طلبَي المنشور والتعليقات تظهر طلباتُ مقاطع المكوّن، وطلباتُ المكوّنات الأخرى كذلك: الخطأ وعدم العثور. ثم يفرّغ الشبكة ويعود ليفتح منشورًا ثانيًا: لا تظهر هذه المرة إلا طلبا المنشور والتعليقات، ولا شيء من طلبات المقاطع. فلماذا؟ لأنّ المكوّنات المطلوبة للمنشور الثاني هي ذاتها التي استُعملت للمنشور الأول؛ فالمنشوران يفتحان المسارَ نفسه بالمكوّنات نفسها، فلا داعي إلى تحميلها من جديد في كل مرة تفتح فيها منشورًا آخر.</p>
<h2 id="التخصيص-ماذا-يقسم-بالضبط">التخصيص: ماذا يُقسَّم بالضبط؟</h2>
<p>يعود المؤلف هنا إلى صفحة التوثيق التي رافقته في الفيديو. وفي عامة الأحوال يكفي السلوكُ الافتراضي بلا تعديل، لكنّ التوثيق يفتح بابًا لتحديد ما يُقسَّم بدقة: المكوّن الرئيسي ومكوّن الخطأ ومكوّن الانتظار ومكوّن عدم العثور، فكلُّها تقسَّم افتراضيًا. ويجوز أيضًا تقسيم دالّة المُحمِّل نفسها — غير أنّ المؤلف والتوثيق ينصحان بإبقائها في الحزمة الرئيسية؛ فالمُحمِّل هو من يشغّل جلبَ البيانات مبكرًا، وإبقاؤه متاحًا من البداية أفضل للأداء عادة. والتفصيلُ في صفحتَي التوثيق اللتين في المراجع.</p>
<p>فإن أردت أن تتحكم في السلوك فالخياران من إعدادات <code>Vite</code>: تعديلُ التقسيم الافتراضي عالميًا عبر <code>defaultBehavior</code>، أو تحكّمٌ برمجي بتمرير دالّة <code>splitBehavior</code> بدل ذلك؛ تستقبل الدالّة معرّف المسار (<code>routeId</code>)، فتقرّر أنت بحسب ذلك المعرّف ماذا يُقسَّم لكل مسارٍ على حدة، فيُعطى مسارٌ ما معاملةً خاصة دون سائر المسارات. ويختم المؤلف بأنّ السلوك الافتراضي غالبًا ما يفي بالغرض، فلا تطارد التخصيصَ دون حاجة.</p>
<h2 id="إن-تعذر-التفعيل-تلقائيا-التقسيم-بلاحقة-lazytsx">إن تعذّر التفعيلُ تلقائيًا: التقسيم بلاحقة <code>lazy.tsx</code></h2>
<p>يبقى في التوثيق بابٌ قد تحتاجه: إن لم يكن في مقدورك لأسبابٍ من إعدادات <code>Vite</code> أن تستعمل التقسيمَ التلقائي، فما زال بإمكانك تقسيم ملفات المسارات يدويًا باللاحقة <code>lazy.tsx</code>. وعمله تقسيمُ ملف المسار الواحد إلى ملفين: ملفٍ يحمل الشيفرةَ الحرجة، كدالّة المُحمِّل في مثال التوثيق، وملفٍ ثانٍ اسمُه اسمُ الأول مُلحقًا بلاحقة <code>lazy.tsx</code> — كـ<code>posts.tsx</code> و<code>posts.lazy.tsx</code> — يُنشأ فيه المسار بـ<code>createLazyFileRoute</code> بدل <code>createFileRoute</code>، ويُمرَّر إليه ما تريد أن يُقسَّم، كالمكوّن. وهذا هو التقسيم اليدوي حيث التعذر؛ أما بالتفعيل التلقائي فيجري كلُّ ذلك نيابةً عنك في الخفاء لكل مسارات التطبيق.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>لم يغيّر هذا الدرس وجه التطبيق؛ تغيّره في الشبكة: أبقيتَ شيفرة المطابقة وجلب البيانات في الحزمة الرئيسية، وانفصلت شيفرة المكوّنات إلى مقاطع تصل عند الطلب. فصفحة about هي نفسها ببانرها الوردي وعنوانها، لكنّ خبرَ التغيّر يكشفه التنقّلُ إليها وتبويبُ الشبكة المفتوح: أولُ زيارة تطلب مقاطعَ المكوّن، وما بعدها لا يطلُبها من جديد ما دام المكوّن نفسه هو الظاهر.</p>
<p>واللقطة التالية ملتقطة من فرع الدرس بعد التفعيل، وهي صفحة about كما تظهر مع ترويسة الجذر وشريط التنقّل:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--code-splitting--about.png" alt="مسار /about وهو يعرض عنوان About داخل بانر وردي، مع ترويسة الجذر ذات زر Login وروابط Home وAbout أعلاه، وهي الواجهة التي يُحمّل مقطعُها مكوّنِها من الشبكة عند التنقّل إليها"></p>
<h2 id="جرب-بنفسك">جرب بنفسك</h2>
<ol>
<li>شاهد الحالَ قبل التفعيل: على فرع الدرس ضع <code>autoCodeSplitting</code> مؤقتًا على <code>false</code> في <code>vite.config.ts</code>، وحدّث الصفحة الرئيسية وافتح تبويب الشبكة، ثم انقر about: لن يظهر أي طلب جديد، لأنّ المكوّن كله في الحزمة الابتدائية.</li>
<li>أعِد المفتاح إلى <code>true</code> وانتظر الخادم حتى يعيد التشغيل، ثم كرّر التنقّل: يظهر مقطعُ المكوّن، وإن بحثتَ في محتواه عن كلمة about فستعثر على نص العنوان وأصنافه.</li>
<li>افتح من قائمة /posts المنشور الأول ثم الثاني، وقارن ما يظهر في الشبكة: مقاطع المكوّنات لا تُطلَب إلا في أول مرة، ويعيد المنشورُ الثاني استعمالها بلا تحميل جديد.</li>
<li>اقرأ في صفحة التوثيق عن خيار <code>splitBehavior</code> البرمجي، واعتزم تمرير دالّةٍ تستقبل معرّف المسار، فتخصّص التقسيمَ لمسارٍ بعينه دون سائر المسارات التي يكفيها السلوك الافتراضي.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=10307s">فيديو الدرس: تقسيم الشيفرة</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/code-splitting">شيفرة الدرس: فرع <code>code-splitting</code> في مستودع الدورة</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting">توثيق تقسيم الشيفرة (Code Splitting) في TanStack Router</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/automatic-code-splitting">توثيق التقسيم التلقائي للشيفرة في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «تقسيم الشيفرة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>code-splitting</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,l as html,t as slug,p as title};
