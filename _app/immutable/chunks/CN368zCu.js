const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",e="loading-data-in-parallel-single-blog-post-page",o="التحميل المتوازي: صفحة التدوينة المفردة",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"موردان-لصفحة-واحدة",text:"موردان لصفحة واحدة"},{depth:3,id:"تشغيل-الطلبين-معا",text:"تشغيل الطلبين معًا"},{depth:3,id:"أين-يتوقف-promiseall",text:"أين يتوقّف Promise.all؟"},{depth:3,id:"استهلاك-البيانات-في-المكون",text:"استهلاك البيانات في المكوّن"},{depth:3,id:"إصلاح-نوع-التعليق",text:"إصلاح نوع التعليق"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق اكتفى مسار قائمة التدوينات بطلب واحد إلى الشبكة، فكان المُحمِّل (loader) ينتظر استجابةً واحدة ثم يسلّم بياناته إلى المكوّن. أمّا مسار التدوينة المفردة <code>posts/$postId</code> فيحتاج إلى موردين: التدوينة نفسها، وتعليقاتها. والطلبان مستقلّان تمامًا، لا يعرف أحدهما شيئًا عن الآخر، لكنّ كتابتهما على التوالي داخل <code>loader</code> تجعل زمن الانتظار مجموع الزمنين لا أقصرهما.</p>
<p>نتعلّم في هذا الدرس ثلاثة أمور مترابطة. أوّلها: كيف نرسل الطلبين معًا بدل أن ينتظر أحدهما الآخر. وثانيها: كيف نستهلك ناتج <code>loader</code> في مكوّن منفصل عبر <code>getRouteApi</code> و<code>useLoaderData</code>، وكيف يصلح تعريف النوع في طبقة البيانات خطأً ظهر في التصيير. وثالثها: أين يقف <code>Promise.all</code> عاجزًا. فهو ينتظر الطلبين حتى ينتهيا معًا، فإن كان جزء من الصفحة يستطيع الظهور قبل الآخر صار هذا الانتظار تكلفةً لا مقابل لها. ونرى كيف يعالج TanStack Router ذلك بإعادة وعد غير منتهٍ من <code>loader</code> وحلّه عند حدود <code>Suspense</code> بواسطة <code>Await</code>.</p>
<p>ملاحظة على الشيفرة قبل البدء: فرع هذا الدرس <code>loaders-3</code> يطبّق النسخة المتوازية بـ<code>Promise.all</code>، وهي المعروضة في المقتطفات أدناه. أمّا نمط تأجيل التعليقات فيظهر في فرع لاحق من الدورة، وهو ما يشرحه توثيق TanStack Router الرسمي، ولذلك نعرضه شرحًا لا مقتطفًا.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="موردان-لصفحة-واحدة">موردان لصفحة واحدة</h3>
<p>تقع دالتا الجلب في <code>src/data/posts.ts</code>، وقد كتبناهما في درس سابق. <code>getPost</code> تجلب التدوينة من العنوان <code>posts/\${id}</code>، و<code>getPostComments</code> تجلب تعليقات التدوينة نفسها من مسار فرعي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPostComments</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://dummyjson.com/posts/<span class="hljs-subst">\${id}</span>/comments\`</span>);
  <span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()) <span class="hljs-keyword">as</span> <span class="hljs-title class_">PostCommentsResponse</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Failed to fetch post comments&quot;</span>);
  }
}
</code></pre>
<p>الدالتان تنتظران عددًا، بينما معامل المسار يصل من العنوان نصًّا. لذلك نحوّله عند الاستعمال بـ<code>+params.postId</code>، وهو ما يفعله المُحمِّل في المقتطف التالي. لاحظ أيضًا أنّ الدالتين ترميان خطأً حين تفشل الاستجابة، فالمُحمِّل لا يحتاج إلى فحص حالة الاستجابة مرّة أخرى؛ الخطأ يصعد إلى <code>errorComponent</code> إن وُجد.</p>
<p>الطريقة الأولى التي يبدأ بها أيّ مطوّر هي التسلسل: <code>await</code> للتدوينة، ثم <code>await</code> للتعليقات، ثم إعادة الكائنين. الشيفرة تعمل، والبيانات تصل، ولا خطأ ظاهرًا. لكن إذا فتحت لوحة الشبكة في أدوات المطوّر وراقبت الطلبين، رأيت الطلب الثاني لا يُرسل إلا بعد اكتمال الأول، مع أنّ أحدهما لا يعتمد على الآخر. الزمن الكلي هنا يساوي زمن التدوينة مضافًا إليه زمن التعليقات.</p>
<h3 id="تشغيل-الطلبين-معا">تشغيل الطلبين معًا</h3>
<p>بدل أن ننتظر الطلب الأول لنبدأ الثاني، ننشئ الوعدين أوّلًا ثم ننتظر مجموعهما. نستورد الدالتين في ملف المسار <code>src/routes/posts.$postId.tsx</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Post</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./-components/Post&quot;</span>;
<span class="hljs-keyword">import</span> { getPost, getPostComments } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../data/posts&quot;</span>;
</code></pre>
<p>ثم نكتب <code>loader</code> كما يلي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ params }) =&gt; {
    <span class="hljs-keyword">const</span> [post, comments] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
      <span class="hljs-title function_">getPost</span>(+params.<span class="hljs-property">postId</span>),
      <span class="hljs-title function_">getPostComments</span>(+params.<span class="hljs-property">postId</span>),
    ]);
    <span class="hljs-keyword">return</span> {
      post,
      comments,
    };
  },
});
</code></pre>
<p>الترتيب هنا هو الفكرة كلها. الاستدعاءان داخل المصفوفة يبدأان فورًا، قبل أن ينتظر <code>await</code> أيًّا منهما، فالشبكة ترى الطلبين في اللحظة نفسها. ثم ينتظر <code>Promise.all</code> حتى ينتهيا، ويعيد النتائج في المصفوفة بالترتيب نفسه الذي مرّرناه، ولهذا يصحّ التفكيك إلى <code>post</code> و<code>comments</code>. والزمن الكلي صار أطول الطلبين فقط لا مجموعهما.</p>
<p>لاحظ أنّ الترتيب في المصفوفة ليس اختياريًا: لو عكسته لحصل المتغيّر <code>post</code> على التعليقات والعكس. هذه نقطة يسهل السهو عنها لأنّ كلا الوعدين يعيد كائنًا، ولا يشتكي TypeScript من شيء قبل أن تصل إلى حقل لا وجود له.</p>
<p>بعد التعديل، أعِد تحميل الصفحة وراقب الشبكة: الطلبان يُرسلان معًا، والفرق في الزمن يظهر فورًا على الشبكات البطيئة. والناتج <code>{ post, comments }</code> هو ما ستحصل عليه لاحقًا من <code>useLoaderData</code>.</p>
<h3 id="أين-يتوقف-promiseall">أين يتوقّف <code>Promise.all</code>؟</h3>
<p><code>Promise.all</code> ممتاز حين تكون البيانات كلها لازمة قبل أن ترى شيئًا. لكن انظر إلى ما يفعله من منظور التصيير: <code>loader</code> كتلة واحدة، والمسار لا يُصيَّر حتى ينتهي <code>loader</code> كاملًا. أي أنّ <code>Promise.all</code> لا يحرّك الطلبين معًا فحسب، بل يجعل التصيير ينتظر الأبطأ منهما. وبشكل افتراضي ينتظر الموجّه ثانيةً كاملة (<code>pendingMs</code>) قبل أن يعرض <code>pendingComponent</code>، فإن لم تعرّفه بقي المستخدم على الصفحة السابقة أو على شاشة فارغة. فإذا كانت التدوينة تصل في مئة ميلي ثانية والتعليقات في تسعمئة، لم يظهر عنوان التدوينة قبل التسعمئة، مع أنّه جاهز في المئة الأولى.</p>
<p>متى يكون ذلك مقبولًا؟ حين تكون الأجزاء كلها ضرورية لفهم الصفحة، فلا معنى لعرض نصفها. ومتى يكون مكلفًا؟ حين تكون التدوينة هي المهمة والتعليقات ملحقًا يمكن أن يظهر بعدها. هنا لا يعطّل <code>Promise.all</code> الطلب الشبكي، بل يعطّل الظهور، وهذا فرق جوهري.</p>
<p>الحلّ الذي يوثّقه TanStack Router اسمه التأجيل (<code>deferred data loading</code>). الفكرة بسيطة: لا تنتظر التعليقات في المُحمِّل، لكن لا تتخلَّ عنها. تبدأ طلبها أوّلًا وتحفظ وعده في متغيّر اسمه <code>commentsPromise</code>، ثم تنتظر التدوينة وحدها، ثم تعيد كائنًا فيه <code>post</code> جاهزة و<code>commentsPromise</code> كما هو. لأنّ إنشاء الوعد سبق <code>await</code>، فالطلب انطلق مع طلب التدوينة؛ ولأنّنا لم ننتظره، بدأ التصيير عند وصول التدوينة، وبقي الوعد معلّقًا ضمن بيانات المسار.</p>
<p>في المكوّن تستعمل <code>useLoaderData</code> فتحصل على <code>post</code> جاهزة وعلى <code>commentsPromise</code> غير منتهٍ، ثم تسلّم الوعد إلى المكوّن <code>Await</code> في الخاصية <code>promise</code>، وتضع العنصر البديل في الخاصية <code>fallback</code>، وتضع في ابنه دالةً تستقبل البيانات المحلولة وتصيَّر التعليقات. <code>Await</code> يحلّ الوعد عند حدود <code>Suspense</code> أقرب، ويعرض <code>fallback</code> في مكانه وحده، ثم يستدعي الدالة الابنة بالبيانات المحلولة. هذا هو الفرق العملي: العنوان والمتن وشريط التنقّل تُصيَّر وتصبح قابلة للاستعمال، والتعليقات وحدها تنتظر. ولو رُفض الوعد، رمى <code>Await</code> الخطأ إلى أقرب حدّ أخطاء، فلا تختفي الصفحة كلها بسبب تعليق فشل جلبه. ولاحظ أيضًا أنّ هذا النمط لا يقلّل عدد الطلبات ولا يغيّر توقيتها؛ الطلبان يبدآن في اللحظة نفسها في الحالتين. الفرق كلّه في من ينتظر ماذا.</p>
<p>إن كنت على React 19، فالتوثيق يشير إلى أنّ الخطّاف <code>use</code> يقوم مقام <code>Await</code>. وأمّا <code>Promise.all</code> فيبقى الخيار الصحيح حين تكون الأجزاء كلها لازمة معًا؛ فالقاعدة ليست «تجنّب <code>Promise.all</code>»، بل «لا تؤجّل جزءًا يحتاجه المستخدم ليفهم الصفحة، ولا تنتظر جزءًا لا يحتاجه ليبدأ».</p>
<h3 id="استهلاك-البيانات-في-المكون">استهلاك البيانات في المكوّن</h3>
<p>بقي أن نعرض البيانات. في درس سابق فصلنا واجهة التدوينة في مكوّن مستقل <code>src/routes/-components/Post.tsx</code>، ولا يملك هذا المكوّن كائن <code>Route</code> لأنّه ليس ملف مسار. لهذا يستعمل <code>getRouteApi</code> ويأخذ منه الخطّافات:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { getRouteApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { useParams, useLoaderData } = <span class="hljs-title function_">getRouteApi</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>);
  <span class="hljs-keyword">const</span> { postId } = <span class="hljs-title function_">useParams</span>();
  <span class="hljs-keyword">const</span> { post, comments } = <span class="hljs-title function_">useLoaderData</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-3xl font-bold mb-6&quot;</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{post.body}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;border-2 p-4 mt-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold mb-2&quot;</span>&gt;</span>Comments<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {comments.comments.map((comment) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{comment.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-purple-800 border-1 p-2 mb-2&quot;</span>&gt;</span>
              {comment.body}
              <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-sm text-gray-200&quot;</span>&gt;</span>
                - {comment.user.username}
              <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><code>getRouteApi(&quot;/posts/$postId&quot;)</code> يعيد واجهة المسار نفسها بأنواعها، لكن دون استيراد ملف المسار؛ وهذا يمنع الاعتماد الدائري بين المكوّن وملف المسار، ويعمل بسلاسة مع تقسيم الشيفرة. أمّا <code>useLoaderData</code> فهي تعيد شكل ما أعاده <code>loader</code> بالضبط، أي <code>post</code> و<code>comments</code>، بلا حاجة إلى تحديد النوع يدويًا.</p>
<p>في الترميز، يظهر عنوان التدوينة ومتنها أوّلًا، ثم صندوق التعليقات. ولاحظ <code>comments.comments.map</code>: <code>getPostComments</code> تعيد استجابةً كاملة فيها حقل <code>comments</code> هو المصفوفة، وحقول أخرى مثل <code>total</code> و<code>skip</code> و<code>limit</code>، فالمصفوفة ليست الاستجابة نفسها. وكلّ عنصر يُصيَّر في <code>li</code> بخلفية بنفسجية، وفيه متن التعليق ثم اسم كاتبه بعد شرطة.</p>
<p>كذلك يستدعي المكوّن <code>useParams</code> ويأخذ منه <code>postId</code> ثم لا يستعمله في شيء. وجوده لا يضرّ، لكن لا فائدة منه الآن، ويمكن حذف السطر مع الاستيراد دون أن يتغيّر شيء في الصفحة.</p>
<h3 id="إصلاح-نوع-التعليق">إصلاح نوع التعليق</h3>
<p>عند حفظ هذا الترميز ظهر خطأ في TypeScript عند <code>comment.user.username</code>، والسبب أنّ نوع <code>PostComment</code> في <code>src/data/posts.ts</code> كان يصف التعليق دون الحقل <code>user</code> الذي تعيده الواجهة فعلًا. النوع الصحيح:</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PostComment</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">body</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">postId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  };
};
</code></pre>
<p>هذا الخطأ درس صغير في مكان العقد بين الطبقات: الاستجابة من الشبكة تحمل <code>user</code>، لكنّ النوع الذي كتبناه لم يعلن عنه، فاعترض TypeScript في موضع الاستهلاك. الإصلاح ليس في المكوّن ولا في <code>as any</code>، بل في تعريف النوع نفسه، عند مصدر البيانات. وفي المقابل لا نعلن كلّ ما تعيده الواجهة، بل ما نستهلكه فعلًا.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--loading-data-in-parallel-single-blog-post-page--post.png" alt="صفحة التدوينة المفردة بعد التحميل المتوازي: عنوان التدوينة ومتنها، وتحتهما صندوق التعليقات بثلاثة تعليقات بخلفية بنفسجية يعرض كلّ منها نصّه ثم اسم كاتبه"></p>
<p>في الصورة نرى صفحة <code>posts/1</code> بعد اكتمال الدرس: تخطيط الجذر في الأعلى كما هو، ثم عنوان التدوينة بخطّ عريض، ومتنها في سطر واحد. تحتهما صندوق بحدود واضحة عنوانه <code>Comments</code>، وفيه ثلاثة تعليقات، لكلّ واحد خلفية بنفسجية، ونصّ التعليق، ثم اسم الكاتب بحرف صغير وباهت مثل <code>michael.williams</code>. لم يعد الصندوق فارغًا ولا ناقصًا: البيانات وصلت من طلبين متوازيين، والمكوّن عرضهما من كائن واحد.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أعِد كتابة <code>loader</code> على التسلسل: انتظر <code>getPost</code> ثم انتظر <code>getPostComments</code>، وافتح لوحة الشبكة على سرعة بطيئة لتقارن ترتيب الطلبين وزمن اكتمال الصفحة.</li>
<li>أضف <code>pendingMs: 0</code> و<code>pendingComponent</code> يعرض <code>Loading...</code> إلى المسار، ثم بدّل بين التسلسل والتوازي لترى متى يظهر هذا المكوّن ومتى لا يظهر.</li>
<li>طبّق نمط التأجيل: أعِد <code>{ post, commentsPromise }</code> من <code>loader</code>، واعرض التعليقات داخل <code>Await</code> مع <code>fallback</code>. اضغط على رابط التدوينة أثناء تقييد الشبكة، ولاحظ أنّ العنوان يظهر بينما التعليقات تنتظر وحدها.</li>
<li>اجعل <code>getPostComments</code> تنتظر ثانيتين قبل الطلب، ثم قارن بين الحالتين: هل تأخّرت الصفحة كلها أم صندوق التعليقات فقط؟</li>
<li>احذف <code>useParams</code> وسطر <code>postId</code> من المكوّن، وتأكّد من أنّ الصفحة تعمل كما هي.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=8507s">فيديو الدرس: Loading Data in Parallel: Single Blog Post Page</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/loaders-3">شيفرة الدرس: فرع loaders-3</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading">التوثيق الرسمي: تحميل البيانات المؤجّل في TanStack Router</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/data-loading">التوثيق الرسمي: تحميل بيانات المسارات في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Loading Data in Parallel: Single Blog Post Page» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي. أمّا شرح نمط تأجيل التعليقات ومقارنته بـ<code>Promise.all</code> فهو إضافة توضيحية من المترجم مبنية على توثيق TanStack الرسمي، ولا تُنسب إلى المؤلف.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:o,headings:t,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,l as html,e as slug,o as title};
