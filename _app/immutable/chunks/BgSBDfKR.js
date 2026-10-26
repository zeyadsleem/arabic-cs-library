const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="loading-data-in-the-background",p="تحميل البيانات في الخلفية",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"المشكلة-محمل-ينتظر-كل-شيء",text:"المشكلة: مُحمِّل ينتظر كلّ شيء"},{depth:3,id:"بدء-الطلب-دون-انتظاره",text:"بدء الطلب دون انتظاره"},{depth:3,id:"ترتيب-السطرين-ليس-تفصيلا",text:"ترتيب السطرين ليس تفصيلًا"},{depth:3,id:"عرض-البديل-ثم-البيانات-مكون-await",text:"عرض البديل ثم البيانات: مكوّن Await"},{depth:3,id:"انتظار-المسار-وانتظار-جزء-منه",text:"انتظار المسار وانتظار جزء منه"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق كان المُحمِّل (loader) في مسار <code>posts/$postId</code> ينتظر كلّ شيء قبل أن يُصيَّر المسار: نصّ التدوينة وتعليقاتها معًا. هذا مقبول حين تصل البيانات كلّها بالسرعة نفسها، لكنه يصير مؤلمًا حين تكون التعليقات أبطأ بكثير من نصّ التدوينة؛ يقف الزائر أمام شاشة انتظار كاملة، مع أنّ ما جاء من أجله — العنوان والنصّ — جاهز منذ اللحظة الأولى.</p>
<p>فكرة هذا الدرس أنّ البيانات ليست كلّها متساوية. هناك بيانات حرجة يجب أن ينتظرها المسار قبل التصيير، وبيانات ثانوية يمكن أن تصل بعد التصيير. سنعيد ترتيب المُحمِّل بحيث يبدأ طلب التعليقات ثم ينتظر نصّ التدوينة وحده، ونُرجع الوعد (promise) غير المحلول إلى المكوّن بدل بيانات التعليقات الجاهزة. بعد ذلك نستعمل مكوّن <code>Await</code> من TanStack Router لعرض بديل مؤقّت في مكان التعليقات، ثم نستبدله بالبيانات حين تصل.</p>
<p>النتيجة: يرى الزائر الصفحة فورًا ويقرأ التدوينة بينما تُحمَّل التعليقات في الخلفية.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="المشكلة-محمل-ينتظر-كل-شيء">المشكلة: مُحمِّل ينتظر كلّ شيء</h3>
<p>لنجعل البطء مرئيًا قبل أن نعالجه، نضيف تأخيرًا صناعيًا إلى دالة جلب التعليقات في <code>src/data/posts.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPostComments</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://dummyjson.com/posts/<span class="hljs-subst">\${id}</span>/comments\`</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">3000</span>));
  <span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()) <span class="hljs-keyword">as</span> <span class="hljs-title class_">PostCommentsResponse</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Failed to fetch post comments&quot;</span>);
  }
}
</code></pre>
<p>السطر <code>await new Promise((r) =&gt; setTimeout(r, 3000));</code> يؤخّر الدالة ثلاث ثوانٍ بعد وصول الاستجابة. الغرض منه تعليمي فقط: أن يجعل سلوك الشبكة البطيئة واضحًا أمامك في كلّ تحديث للصفحة، لا أن يبقى في الإنتاج.</p>
<p>مع هذا التأخير، إذا انتظر المُحمِّل التعليقات كما ينتظر نصّ التدوينة، فلن يُصيَّر المسار إلّا بعد مرور ثلاث ثوانٍ على الأقل. ولا يستطيع <code>pendingComponent</code> أن ينقذ الموقف هنا: فهو يعرض شاشة انتظار للمسار كلّه، فيبقى العنوان والنصّ محجوبين بسبب بيانات لا علاقة لهما بهما.</p>
<h3 id="بدء-الطلب-دون-انتظاره">بدء الطلب دون انتظاره</h3>
<p>الحلّ يبدأ من المُحمِّل نفسه. نطلب التعليقات، ونحفظ وعدها في متغيّر، ثم ننتظر نصّ التدوينة وحده:</p>
<pre><code class="language-ts">  <span class="hljs-attr">loader</span>: <span class="hljs-title function_">async</span> ({ params }) =&gt; {
    <span class="hljs-keyword">const</span> commentsPromise = <span class="hljs-title function_">getPostComments</span>(+params.<span class="hljs-property">postId</span>);
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(+params.<span class="hljs-property">postId</span>);

    <span class="hljs-keyword">return</span> {
      post,
      commentsPromise,
    };
  },
</code></pre>
<p>الفرق الجوهري أنّ <code>getPostComments</code> تُستدعى دون <code>await</code>. الاستدعاء يبدأ طلب الشبكة فورًا ويعيد وعدًا، لكنّ المُحمِّل لا يتوقّف عنده. الذي يتوقّف عنده هو <code>await getPost(...)</code> فقط، وأثناء ذلك يكون طلب التعليقات قد انطلق بالفعل.</p>
<p>ثم نُرجع الوعد كما هو داخل كائن البيانات. هذه النقطة هي قلب الدرس: TanStack Router ينتظر القيم المحلولة في نتيجة المُحمِّل، ولا ينتظر الوعود غير المحلولة. فبمجرّد أن يحلّ وعد نصّ التدوينة، يعتبر المسار جاهزًا ويصيّره، ويترك وعد التعليقات يكمل طريقه في الخلفية.</p>
<h3 id="ترتيب-السطرين-ليس-تفصيلا">ترتيب السطرين ليس تفصيلًا</h3>
<p>لو عكست السطرين فانتظرت نصّ التدوينة أولًا ثم طلبت التعليقات، لبقي الحلّ صحيحًا من ناحية النتيجة: سيُصيَّر المسار بعد وصول النصّ وستصل التعليقات بعده. لكنّ التوقيت سيكون أسوأ، لأنّ طلب التعليقات لن يبدأ إلّا بعد أن ينتهي طلب النصّ. بهذا الترتيب يصبح الزمن الكلّي مجموع الطلبين تقريبًا، أما بترتيبنا فيصبح قريبًا من زمن الطلب الأبطأ وحده، لأنّ الطلبين يعملان في الوقت نفسه.</p>
<p>لذلك ضع طلب البيانات الثانوية أولًا، ثم انتظر البيانات الحرجة. القاعدة عامّة: كلّ ما تريد أن يبدأ مبكرًا، أطلقه قبل أوّل <code>await</code> في المُحمِّل.</p>
<h3 id="عرض-البديل-ثم-البيانات-مكون-await">عرض البديل ثم البيانات: مكوّن <code>Await</code></h3>
<p>الآن يصل إلى المكوّن كائنٌ فيه <code>post</code> جاهز و<code>commentsPromise</code> غير محلول. لا يمكن المرور على التعليقات بـ<code>map</code> كما كان الحال سابقًا، لأنّ ما لدينا وعد لا مصفوفة. نستورد <code>Await</code> مع <code>getRouteApi</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Await</span>, getRouteApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { useParams, useLoaderData } = <span class="hljs-title function_">getRouteApi</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>);
  <span class="hljs-keyword">const</span> { postId } = <span class="hljs-title function_">useParams</span>();
  <span class="hljs-keyword">const</span> { post, commentsPromise } = <span class="hljs-title function_">useLoaderData</span>();
</code></pre>
<p>ثم نستعمل <code>Await</code> في موضع قائمة التعليقات داخل المكوّن:</p>
<pre><code class="language-tsx">      &lt;div className=<span class="hljs-string">&quot;border-2 p-4 mt-4&quot;</span>&gt;
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold mb-2&quot;</span>&gt;</span>Comments<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Await</span> <span class="hljs-attr">promise</span>=<span class="hljs-string">{commentsPromise}</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
          {(comments) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              {comments.comments.map((comment) =&gt; (
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
                  <span class="hljs-attr">key</span>=<span class="hljs-string">{comment.id}</span>
                  <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-purple-800 border-1 p-2 mb-2&quot;</span>
                &gt;</span>
                  {comment.body}
                  <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-sm text-gray-200&quot;</span>&gt;</span>
                    - {comment.user.username}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              ))}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Await</span>&gt;</span></span>
      &lt;/div&gt;
</code></pre>
<p>لـ<code>Await</code> خاصيتان: <code>promise</code> هو الوعد الذي ننتظره، و<code>fallback</code> هو ما يُعرض ريثما يحلّ. أما <code>children</code> فهي دالة لا عنصر جاهز، ويُمرَّر إليها ناتج الوعد بعد حلوله. هذا التصميم مقصود: قبل الحلول لا وجود للبيانات، فلا معنى لكتابة كود يتعامل معها كأنّها موجودة. الدالة تضمن أنّك لا تلمس التعليقات إلّا في اللحظة التي صارت فيها متاحة فعلًا.</p>
<p>أثناء الانتظار يعرض <code>Await</code> البديل، وهو هنا نصّ <code>Loading...</code> بسيط. ويمكنك بدله بهيكل تحميل (<code>skeleton</code>) بثلاثة أعمدة رمادية مثلًا، المهم أن يشغل المساحة نفسها تقريبًا حتى لا تقفز الصفحة حين تصل التعليقات.</p>
<h3 id="انتظار-المسار-وانتظار-جزء-منه">انتظار المسار وانتظار جزء منه</h3>
<p>يبقى التمييز الذي يفسّر لماذا لم نستغنِ عن <code>pendingComponent</code>. انظر إلى تعريف المسار:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/posts/$postId&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
  <span class="hljs-attr">pendingComponent</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
  <span class="hljs-attr">pendingMs</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">pendingMinMs</span>: <span class="hljs-number">500</span>,
</code></pre>
<p><code>pendingComponent</code> هو ما يعرضه الموجّه حين يكون الانتقال نفسه قيد الانتظار، أي حين لا يزال المُحمِّل ينتظر نصّ التدوينة. القيمة <code>pendingMs: 0</code> تجعله يظهر فورًا بدل أن ينتظر ثانية قبل إظهار أيّ شيء، و<code>pendingMinMs: 500</code> تُبقيه نصف ثانية على الأقل حتى لا يومض ويختفي بسرعة مربكة.</p>
<p>أما بديل <code>Await</code> فيظهر بعد أن صار المسار مصيَّرًا، ولا يخصّ إلّا التعليقات. الفرق عملي: لو أعدت التعليقات إلى قائمة الانتظار في المُحمِّل، عاد <code>pendingComponent</code> يغطّي الصفحة كلّها وعدنا إلى المشكلة الأولى. ولو أزلت <code>Await</code> وأبقيت الوعد في البيانات، لما عرف المكوّن كيف يعرضه. الركنان معًا — وعد غير منتظر في المُحمِّل، و<code>Await</code> في المكوّن — هما ما يجعل التحميل في الخلفية ممكنًا.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--loading-data-in-the-background--post.png" alt="صفحة التدوينة بعد التعديل: الترويسة والقائمة ثم عنوان التدوينة ونصّها كاملين، وفي صندوق التعليقات عبارة Loading... وحدها"></p>
<p>في الصورة نرى التخطيط الجذري كما هو، ثم عنوان التدوينة ونصّها قد ظهرا كاملين، مع أنّ التعليقات لم تصل بعد: صندوق <code>Comments</code> لا يحتوي إلّا على <code>Loading...</code>. هذا هو الفرق الذي أحدثه الدرس؛ قبل التعديل كانت الصفحة كلّها تنتظر تلك الثواني الثلاث، أما الآن فقد وصل القارئ إلى ما يهمّه، وستحلّ التعليقات مكان العبارة حين يجهز طلبها.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>احذف سطر التأخير من <code>getPostComments</code> وأعد التحديث؛ لاحظ أنّ البديل يكاد لا يظهر، لأنّ الوعد يحلّ قبل أن يراه أحد.</li>
<li>عكّس السطرين في المُحمِّل: انتظر نصّ التدوينة أولًا ثم أطلق طلب التعليقات. راقب لوحة الشبكة في أدوات مطوّر المتصفح ولاحظ أنّ الطلب الثاني يبدأ متأخرًا.</li>
<li>أضف تأخيرًا مشابهًا إلى <code>getPost</code> بدل التعليقات؛ سترى <code>pendingComponent</code> يغطّي الصفحة كلّها، وهذا يوضّح الفرق بين انتظار المسار وانتظار جزء منه.</li>
<li>استبدل بديل <code>Await</code> بهيكل تحميل من ثلاثة أعمدة رمادية، ثم قارن ارتفاع الصندوق قبل وصول التعليقات وبعده.</li>
<li>غيّر عنوان طلب التعليقات إلى عنوان خاطئ وراقب أين يظهر الخطأ وأيّ عرض يتولّاه، ثم أعد العنوان الصحيح.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=9022s">فيديو الدرس: Loading Data in the Background</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/loaders-5">شيفرة الدرس: فرع loaders-5</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading">التوثيق الرسمي: تحميل البيانات المؤجّل في TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Loading Data in the Background» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,l as html,t as slug,p as title};
