const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",o="error-handling",e="معالجة الأخطاء",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"من-أين-يأتي-هذا-الخطأ",text:"من أين يأتي هذا الخطأ؟"},{depth:2,id:"رصد-الخطأ-عند-وقوعه-onerror",text:"رصد الخطأ عند وقوعه: onError"},{depth:2,id:"مكون-الخطأ-errorcomponent",text:"مكوّن الخطأ: errorComponent"},{depth:2,id:"أن-يعود-الجلب-مع-النقر-routerinvalidate",text:"أن يعود الجلب مع النقر: router.invalidate()"},{depth:2,id:"خطأ-من-أثناء-التصيير-oncatch",text:"خطأ من أثناء التصيير: onCatch"},{depth:2,id:"الآلية-الخفية-catchboundary-يغلف-مكونات-المسار",text:"الآلية الخفية: CatchBoundary يغلف مكونات المسار"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],c=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>جاءت صفحةُ المنشور في الدروس السابقة مكتملة الأدوار: مكوّنُ انتظارٍ يُشعِر بما يجري في أثناء الجلب، ومُحمِّل (loader) يجلب المنشورَ ويجلب تعليقاتِه في الخلفية بلا انتظار. وبقي سؤالٌ لم نطرحه بعدُ: ماذا يُعرَض حين يرمي المُحمِّلُ خطأً؟ وتبدأ تجربةُ الدرس من الشاشة نفسِها: افتح مسار المنشور برقمٍ لا وجود له — أرقامًا أو حروفًا لا تقابل منشورًا — فيفشل الجلب وتظهر رسالةُ الرمي على الشاشة حرفًا بحرف: <code>Failed to fetch post</code>. وهذا هو مضمون الدرس: نجعل لصفحة الخطأ وجهًا من صنعنا، ونرصد الخطأَ حيث وقع، ثم نفصّل سلوك الزرّ الذي يعيد المحاولة، ونختم بحالةٍ مقلوبة: خطأٌ يُرمى في أثناء التصيير لا في أثناء التحميل.</p>
<p>ويمرُّ الدرس بأربع محطات. أولًا نتعقّب منبع الخطأ: دالّةُ الجلب التي ترمي خطأها حين يفشل الطلب، والمُحمِّلُ الذي يستدعيها برقمٍ انتُزِع من العنوان. ثانيًا نُعِدّ المسارَ لحظةَ الفشل: خيار <code>onError</code> لرصد الخطأ والإبلاغ عنه عند وقوعه، ومكوّنُ خطأ (<code>errorComponent</code>) يحلّ محلَّ المحتوى ويعرض رسالةَ الخطأ مع زرّ يعيد المحاولة. ثالثًا نقف عند الزرِّ بتدقيق: دالّة <code>reset</code> التي أعتمدناها أولًا تعيد التصيير فقط ولا تعيد الجلب، فنستبدلها بـ<code>router.invalidate()</code> التي تشغّل الطلبَ من جديد. رابعًا نكتشف صنفًا آخر من الأخطاء يُرمى في أثناء تصيير المكوّن لا في أثناء التحميل، فلا يلمحه <code>onError</code> إطلاقًا، وإنما يقبض عليه خيار <code>onCatch</code> عبر حدّ الأخطاء (<code>error boundary</code>) الذي يغلّف مكونات المسار تلقائيًّا.</p>
<h2 id="من-أين-يأتي-هذا-الخطأ">من أين يأتي هذا الخطأ؟</h2>
<p>الرسالة الخام التي رأيتَها في المقدمة لها مسيرة واضحة في الشيفرة، ومصدرُها في <code>src/data/posts.ts</code>: دالّةُ جلب المنشور ترمي خطأها حين لا تجيب الخدمة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPost</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://dummyjson.com/posts/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()) <span class="hljs-keyword">as</span> <span class="hljs-title class_">Post</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Failed to fetch post&quot;</span>);
  }
}
</code></pre>
<p>كلُّ شيء في الدالة يدور على الشرط المألوف <code>res.ok</code>: إذا جاء جوابٌ سليم أُعيد المنشور، وإلا رُمي خطأ برسالةٍ ثابتة هي <code>Failed to fetch post</code>. فإذا كتبتَ في العنوان رقمًا لا يقابل أيَّ منشور، سقط الشرطُ ورُمِي الخطأ، ولم يبقَ لما بعد الرمي دورٌ في تكييف الشاشة: ظهرت الرسالة كما هي بمظهرٍ عامٍّ لا يُشبه تطبيقنا، وهذا ما قصده المؤلف حين قال إنّ صفحة الخطأ تستحقّ تخصيصًا يقرّبها من شكل التطبيق.</p>
<p>وأما الرقم الذي يصل إلى الدالة فواردٌ من مُحمِّل مسار المنشور في <code>src/routes/posts.$postId.tsx</code>، حيث يُستدعى <code>getPost</code> برقم المنشور المقتطع من خصائص المسار (<code>params</code>):</p>
<pre><code class="language-tsx">  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ params }) =&gt; {
    <span class="hljs-keyword">const</span> commentsPromise = <span class="hljs-title function_">getPostComments</span>(+params.<span class="hljs-property">postId</span>);
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(+params.<span class="hljs-property">postId</span>);

    <span class="hljs-keyword">return</span> {
      post,
      commentsPromise,
    };
  },
</code></pre>
<p>فحين يكون الرقم في العنوان لا يطابق أيَّ منشور، يفشل الطلب ويُرمى الخطأ، فيسلّمه الموجّه ويُعرض على الشاشة من مكوّن خطأٍ عامّ، وهو ما كان يعمل قبل هذا الدرس كله. وسيعطيها الدرس وجهًا خاصًّا فيما بعد، ونبدأ أولًا برصدها:</p>
<h2 id="رصد-الخطأ-عند-وقوعه-onerror">رصد الخطأ عند وقوعه: <code>onError</code></h2>
<p>أولُ إضافةٍ في هذا الدرس إلى تعريف المسار خيارٌ باسم <code>onError</code>. وهو ردُّ نداء (<code>callback</code>) يستقبل خطأ المسار ليُنفَّذ عند وقوعه، ووظيفتُه في التطبيقات الفعلية إرسالُ الخطأ إلى خدمة إبلاغ عن الأخطاء (<code>error reporting service</code>) كي يعلم فريقُ التطبيق بما وقع. وفي الدرس يكتب المؤلف أبسطَ استخدامٍ، وهو تسجيلٌ في وحدة التحكم (<code>console</code>) برسالةٍ تمهّد للخطأ:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;Error loading post:&quot;</span>, error);
  },
</code></pre>
<p>فإذا فشل تحميلُ المنشور ظهرت في الوحدة رسالةُ التمهيد ثم الخطأ معها. وما جرى هنا على مسار المنشور يجري على أيِّ مسارٍ آخر، فالخيار من خواصّ تعريف المسار عمومًا. وننبه من الآن إلى حدٍّ سيعود في آخر الدرس: ما يقبض عليه هذا الخيار هو أخطاءُ التحميل وحدها.</p>
<h2 id="مكون-الخطأ-errorcomponent">مكوّن الخطأ: <code>errorComponent</code></h2>
<p>ثم يجيء الخيار الثاني على نمط مكوّن الانتظار الذي درسناه (<code>pendingComponent</code>): ذاك يُعرض في أثناء التحميل، وهذا يُعرض حين يرمي التحميلُ خطأه، فتحلّ وجهتُه محلَّ المحتوى. ويستلم المكوّنُ في خصائصه اثنين: <code>error</code> كائنُ الخطأ برسالته وما فيها، و<code>reset</code> دالّة تعيد المحاولة.</p>
<p>وبنى المؤلفُ أولَ نسخةٍ من هذا المكوّن من سطرينَ: سطرٌ يعرض رسالة الخطأ عبر <code>error.message</code>، وزرٌّ نصُّه <code>Retry</code> يستدعي عند النقر دالّة <code>reset</code> من الخصائص ذاتها. ووظيفةُ <code>reset</code> كما يصفها المؤلف: إعادةُ المحاولة وإعادةُ تصيير المسار.</p>
<p>ثم جرّب المؤلفُ الزرَّ تفحّصًا: الضغطُ يعيد تصيير مكوّن المسار فقط، ولا يعيد تشغيل المُحمِّل، فلا يُعاد الطلب. وفتح في الفيديو تبويب الشبكة (<code>Network</code>) وضغط <code>Retry</code> فلم يمرَّ أيُّ طلب، وبقي الخطأ كما هو. وبما أنّ خطأنا في هذا الدرس مصدرُه الجلب نفسُه، لم تَفد إعادةُ التصيير بشيء. وهنا صارت الحاجة واضحة إلى وسيلةٍ تعيد الطلبَ مع التصيير، وهي موضوع القسم التالي.</p>
<h2 id="أن-يعود-الجلب-مع-النقر-routerinvalidate">أن يعود الجلب مع النقر: <code>router.invalidate()</code></h2>
<p>ولهذا لم يبتكر المؤلفُ شيئًا جديدًا: <code>router.invalidate()</code> التي استخدمناها في درس أسبق لإعادة حساب السياق (<code>context</code>) بعد الدخول والخروج تصلح هنا. فيجعل المؤلف الموجّه متناولًا داخل مكوّن الخطأ عبر خُطّاف (hook) باسم <code>useRouter</code> من الحزمة نفسها، ثم يجعل الزرّ يستدعي <code>router.invalidate()</code> بدل <code>reset</code>. وهذا هو مكوّن الخطأ كما استقر عند فرع الدرس:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">errorComponent</span>: <span class="hljs-function">(<span class="hljs-params">{ error, reset }</span>) =&gt;</span> {
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
</code></pre>
<ul>
<li>رسالة الخطأ تُعرض عبر <code>error.message</code>، وفي الكائن تفاصيلُ أكثر من الرسالة إن احتجتها.</li>
<li>الزرّ نصُّه <code>Retry</code> وعند نقره يستدعي <code>router.invalidate()</code> فتعود المحاولة إلى الطلب لا إلى التصيير وحده.</li>
</ul>
<p>وجرّب المؤلف بعد الحفظ والتحديث ومسح سجلّ الشبكة: نقرٌ على <code>Retry</code> فتُرسَل الطلبات هذه المرة فعلًا، فصار زرُّ المحاولة يعيد الجلب مع إعادة التصيير. ويظل الخطأ يعود طبعًا لأنّ الرقم في العنوان لا يقابل منشورًا؛ وقد شاهد المؤلفُ ذلك حين زار منشورًا موجودًا فعملت الصفحةُ بلا خطأ.</p>
<h2 id="خطأ-من-أثناء-التصيير-oncatch">خطأ من أثناء التصيير: <code>onCatch</code></h2>
<p>في آخر الدرس يقول المؤلف: فلتخيّل خطأً لا يقع في أثناء تحميل البيانات، بل في أثناء تصيير المكوّن نفسِه. ولإظهار هذه الحالة صنع المؤلف خطأً بيده في مكوّن <code>Post</code> في <code>src/routes/-components/Post.tsx</code>: قراءةُ خصيصة من متغيّرٍ لا وجود له، بحرفٍ زائد في الاسم — <code>poste</code> بدل <code>post</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Await</span>, getRouteApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { useParams, useLoaderData } = <span class="hljs-title function_">getRouteApi</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>);
  <span class="hljs-keyword">const</span> { postId } = <span class="hljs-title function_">useParams</span>();
  <span class="hljs-keyword">const</span> { post, commentsPromise } = <span class="hljs-title function_">useLoaderData</span>();
  <span class="hljs-keyword">return</span> (
    &lt;div&gt;
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-3xl font-bold mb-6&quot;</span>&gt;</span>{poste.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{post.body}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
</code></pre>
<p>الحرفُ الزائد في الاسم يكفي ليُصير المتغيّرَ غيرَ معرَّف، فيُرمى الخطأ لحظةَ تصيير المكوّن. وسينكشف هذا الخطأ في محرّر <code>TypeScript</code> فورًا، لكن تخيّل — كما يقول المؤلف — أنّ خطأً كهذا لحقَ بالشيفرة متسلّلًا؛ ماذا يحدث حينئذٍ؟</p>
<p>يظهر مكوّنُ الخطأ مع الرسالة كما توقعنا، لكن وحدةُ التحكم لا تُظهر تسجيل <code>Error loading post:</code> الذي وضعناه في <code>onError</code> — إذ يخصّ هذا الخيارُ أخطاءَ التحميل وحدها. والبديل الذي يقدّمه المؤلف خيارٌ ثانٍ باسم <code>onCatch</code>:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">onCatch</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;onCatch&quot;</span>, error);
  },
</code></pre>
<p>وفي الفيديو تحقّق ما توقّعه المؤلف بعد الحفظ والتحديث: ظهر تسجيلُ <code>onCatch</code> في الوحدة. وله عملٌ شبيه بعمل أخيه: يتلقّى الخطأ فتُقرأ رسالتُه، أو يُرسَل إلى خدمة الإبلاغ.</p>
<h2 id="الآلية-الخفية-catchboundary-يغلف-مكونات-المسار">الآلية الخفية: <code>CatchBoundary</code> يغلف مكونات المسار</h2>
<p>ثم يشرح المؤلف ما يجري خلف المشهد: عند تصيير مكوّن المسار يغلفه <code>TanStack Router</code> تلقائيًّا بمكوّنٍ اسمه <code>CatchBoundary</code>، وهو حدُّ أخطاء (<code>error boundary</code>) يقبض على أي خطأ يرميه أبناؤه. فإذا وقع خطأ تصيير في المكوّن الذي يغلفه، قبض عليه الحدّ، فحلّ مكوّنُ الخطأ محلَّ المحتوى، ويُمرَّر الخطأُ المقبوض إلى خيار <code>onCatch</code> كي يُطبعه أو يُرسَل إلى من يسجّل الأخطاء. ولم نبْنِ ذلك بأيدينا؛ فقد أجره <code>TanStack Router</code> عنا تلقائيًّا.</p>
<p>ولو فتحت ملف المسار رأيتَ اسم <code>CatchBoundary</code> في قائمة ما يستورده من الحزمة، وسنعود له استعمالًا مباشرًا في دروس الدورة اللاحقة.</p>
<h2 id="النتيجة">النتيجة</h2>
<p>بعد هذا الدرس صار لفشل تحميل مسار المنشور وجهٌ من صنعتنا: مكوّنُ خطأٍ يعرض رسالة الخطأ نفسِها — <code>Failed to fetch post</code> — وزرّ <code>Retry</code> يعيد الطلب لا التصيير عبر <code>router.invalidate()</code>. وصار الرصد موزّعًا في وحدة التحكم على المنبعين: أخطاءُ التحميل تُسجَّل من <code>onError</code> برسالة <code>Error loading post:</code>، وأخطاءُ التصيير تُسجَّل من <code>onCatch</code>.</p>
<p>واللقطة التالية ملتقطة من فرع الدرس، وهي تُظهر التطبيق على مسار القائمة <code>/posts</code> بحالته المعتادة. ومن هنا تبدأ تجربة الدرس: اختر أيَّ منشور من القائمة، ثم استبدل رقمَه في شريط العنوان برقمٍ لا وجود له، فتظهر لك صفحةُ الخطأ الجديدة برسالتها وزرّها:</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--error-handling--posts-error.png" alt="لقطة من فرع الدرس: تطبيق الدورة يعرض قائمة المنشورات في المسار /posts مع رابط الانتقال إلى الصفحة التالية في أسفلها"></p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>اكتب في شريط العنوان مسارَ منشورٍ برقمٍ لا وجود له، وافتح تبويب الشبكة (<code>Network</code>) ثم انقر <code>Retry</code>: ترى الطلبات تعود إلى وجهة البيانات، ثم تعود رسالةُ الخطأ نفسُها إذ الرقم في العنوان لم يتغيّر.</li>
<li>استبدل استدعاء <code>router.invalidate()</code> مؤقتًا بـ<code>reset</code> من خصائص المكوّن، ثم انقر: يُعاد التصيير وحده ولا يمرّ أيُّ طلب في الشبكة؛ ثم أعِد التغيير وقد عرفتَ الفرق.</li>
<li>قلّب الرقم في العنوان إلى رقم منشورٍ موجود: يزول الخطأ ولا تظهر شاشته، فتتميّز أنّ العلّة كانت في البيانات — الرقم لا يقابل منشورًا — لا في المكوّن.</li>
<li>اجعل دالّة مكوّن المسار <code>RouteComponent</code> ترمي خطأً في أول سطرٍ منها، ثم استعرض منشورًا: يظهر تسجيل الخطأ من <code>onCatch</code> في وحدة التحكم بينما صَمَتَ <code>onError</code>، فهذا خطأُ تصييرٍ لا تحميل. ثم أعِد السطرَ كما كان.</li>
<li>أضف داخل مكوّن الخطأ رابطَ عودة إلى قائمة المنشورات <code>/posts</code> عبر مكوّن <code>Link</code> من الحزمة نفسها، كي لا يجد الزائرُ نفسَه محاصَرًا في صفحة الخطأ.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=9310s">فيديو الدرس: معالجة الأخطاء</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/error-handling-1">شيفرة الدرس: فرع <code>error-handling-1</code> في مستودع الدورة</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/data-loading">توثيق معالجة الأخطاء في دليل تحميل البيانات من التوثيق الرسمي لـTanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «معالجة الأخطاء» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع <code>error-handling-1</code> للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:n,slug:o,title:e,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,p as default,t as headings,c as html,o as slug,e as title};
