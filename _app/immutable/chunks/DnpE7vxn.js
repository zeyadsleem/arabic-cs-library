const s="kinney",l="aws",n="نشر تطبيقات الويب على AWS",a="ab-testing-at-the-edge",e="اختبار A/B على الحافة",p=[{depth:2,id:"كيف-يعمل",text:"كيف يعمل"},{depth:2,id:"دالة-cloudfront-الكاملة",text:"دالة CloudFront الكاملة"},{depth:3,id:"ضبط-ملف-تعريف-الارتباط-على-الاستجابة",text:"ضبط ملف تعريف الارتباط على الاستجابة"},{depth:2,id:"إعداد-بنية-s3",text:"إعداد بنية S3"},{depth:2,id:"بديل-lambdaedge",text:"بديل Lambda@Edge"},{depth:2,id:"تقسيمات-مرجحة",text:"تقسيمات مرجّحة"},{depth:2,id:"اعتبارات-التخزين-المؤقت",text:"اعتبارات التخزين المؤقت"},{depth:2,id:"إنهاء-التجربة",text:"إنهاء التجربة"}],t=`<p>يتضمن اختبار A/B في الواجهة الأمامية عادةً مكتبة على جهة العميل مثل LaunchDarkly أو Optimizely تبدّل المحتوى بعد تحميل الصفحة. المشكلة: هناك وميض للمحتوى، أو إزاحة في التخطيط، أو تأخير أثناء تهيئة المكتبة وتحديد المتغيّر الذي تعرضه. وتتلقى درجة Lighthouse ضربة.</p>
<p>إن أردت نسخة AWS من سلوك وقت التشغيل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل دوال CloudFront</a> هو المرجع الرسمي.</p>
<p>تزيل دوال الحافة هذه المشكلة تمامًا. يحدث قرار التوجيه <strong>قبل</strong> وصول الاستجابة إلى المتصفح. يحصل المستخدم على نسخة واحدة من الصفحة—بلا وميض، وبلا SDK على جهة العميل، وبلا حزمة JavaScript إضافية. من منظور المستخدم، لا يوجد اختبار A/B يحدث على الإطلاق.</p>
<h2 id="كيف-يعمل">كيف يعمل</h2>
<p>تتكون الآلية من ثلاثة أجزاء:</p>
<ol>
<li><strong>تخصيص الزوار الجدد لمتغيّر.</strong> عندما يرسل المستخدم طلبه الأول وليس لديه ملف تعريف ارتباط للتجربة، تخصصه دالة الحافة عشوائيًا للمتغيّر A أو B وتضبط ملف تعريف ارتباط.</li>
<li><strong>توجيه الزوار العائدين حسب ملف تعريف الارتباط.</strong> في الطلبات اللاحقة، تقرأ دالة الحافة ملف تعريف الارتباط وتوجّه إلى المتغيّر نفسه—فيحصل المستخدم على تجربة متسقة.</li>
<li><strong>تعديل الطلب بناءً على المتغيّر.</strong> تعيد الدالة كتابة URI (فتقدّم ملفات ثابتة مختلفة) أو تضبط رأسًا يستخدمه أصلك لإعادة محتوى مختلف.</li>
</ol>
<pre><code>flowchart LR
    Request[&quot;Viewer request for /&quot;] --&gt; Cookie{&quot;ab-variant cookie present?&quot;}
    Cookie -- &quot;No&quot; --&gt; Assign[&quot;Assign variant A or B&quot;]
    Cookie -- &quot;Yes&quot; --&gt; Reuse[&quot;Reuse existing variant&quot;]
    Assign --&gt; Rewrite[&quot;Rewrite URI to /a/index.html or /b/index.html&quot;]
    Reuse --&gt; Rewrite
    Rewrite --&gt; Cache[&quot;CloudFront cache by rewritten URI&quot;]
    Cache --&gt; Response[&quot;Viewer response sets or refreshes cookie&quot;]
</code></pre>
<p>يعمل هذا النهج مع دوال CloudFront وLambda@Edge معًا. يستخدم المثال أدناه دالة CloudFront لأن اختبار A/B على مستوى طلب المشاهد بسيط عادةً بما يكفي ليتسع ضمن قيودها. أما إذا كان منطق التوجيه لديك يتطلب استدعاءات شبكة أو حسابات معقدة، فاستخدم Lambda@Edge بدلًا منها.</p>
<h2 id="دالة-cloudfront-الكاملة">دالة CloudFront الكاملة</h2>
<p>إليك تنفيذًا كاملًا يقسم الزيارات مناصفةً 50/50 بين متغيّرين:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> cookies = request.<span class="hljs-property">cookies</span>;
  <span class="hljs-keyword">var</span> variant;

  <span class="hljs-comment">// Check if the user already has a variant assignment</span>
  <span class="hljs-keyword">if</span> (cookies[<span class="hljs-string">&#x27;ab-variant&#x27;</span>]) {
    variant = cookies[<span class="hljs-string">&#x27;ab-variant&#x27;</span>].<span class="hljs-property">value</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// Assign a new variant randomly</span>
    variant = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() &lt; <span class="hljs-number">0.5</span> ? <span class="hljs-string">&#x27;a&#x27;</span> : <span class="hljs-string">&#x27;b&#x27;</span>;
  }

  <span class="hljs-comment">// Normalize invalid cookie values</span>
  <span class="hljs-keyword">if</span> (variant !== <span class="hljs-string">&#x27;a&#x27;</span> &amp;&amp; variant !== <span class="hljs-string">&#x27;b&#x27;</span>) {
    variant = <span class="hljs-string">&#x27;a&#x27;</span>;
  }

  <span class="hljs-comment">// Rewrite the URI to serve the variant-specific page</span>
  <span class="hljs-keyword">if</span> (request.<span class="hljs-property">uri</span> === <span class="hljs-string">&#x27;/&#x27;</span> || request.<span class="hljs-property">uri</span> === <span class="hljs-string">&#x27;/index.html&#x27;</span>) {
    request.<span class="hljs-property">uri</span> = <span class="hljs-string">&#x27;/&#x27;</span> + variant + <span class="hljs-string">&#x27;/index.html&#x27;</span>;
  }

  <span class="hljs-comment">// Set the cookie on the response (via request header that CloudFront forwards)</span>
  request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-ab-variant&#x27;</span>] = { <span class="hljs-attr">value</span>: variant };

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p><em>ملاحظة:</em> احترس من ملفات تعريف الارتباط المتلاعب بها بالرجوع إلى متغيّر معروف.</p>
<p>تفعل هذه الدالة ثلاثة أشياء:</p>
<ol>
<li>تقرأ ملف تعريف الارتباط <code>ab-variant</code> من الطلب. إذا كان موجودًا، يحتفظ المستخدم بتخصيصه الحالي.</li>
<li>إذا لم يوجد ملف تعريف ارتباط، تخصص الدالة المستخدم للمتغيّر <code>a</code> أو <code>b</code> باحتمال متساوٍ.</li>
<li>تعيد كتابة URI بحيث يقدّم <code>/</code> إما <code>/a/index.html</code> أو <code>/b/index.html</code>.</li>
</ol>
<h3 id="ضبط-ملف-تعريف-الارتباط-على-الاستجابة">ضبط ملف تعريف الارتباط على الاستجابة</h3>
<p>تضبط دالة طلب المشاهد أعلاه رأسًا مخصصًا (<code>x-ab-variant</code>) لكنها لا تضبط ملف تعريف الارتباط—فدوال طلب المشاهد لا تستطيع تعديل الاستجابة. تحتاج إلى دالة <strong>استجابة المشاهد</strong> مرافقة لضبط ملف تعريف الارتباط:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> response = event.<span class="hljs-property">response</span>;
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> variant = request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-ab-variant&#x27;</span>] ? request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-ab-variant&#x27;</span>].<span class="hljs-property">value</span> : <span class="hljs-string">&#x27;a&#x27;</span>;

  response.<span class="hljs-property">cookies</span>[<span class="hljs-string">&#x27;ab-variant&#x27;</span>] = {
    <span class="hljs-attr">value</span>: variant,
    <span class="hljs-attr">attributes</span>: <span class="hljs-string">&#x27;Path=/; Max-Age=2592000; SameSite=Lax&#x27;</span>,
  };

  <span class="hljs-keyword">return</span> response;
}
</code></pre>
<p><em>ملاحظة:</em> <code>Max-Age=2592000</code> يساوي 30 يومًا. يبقى المستخدم في المتغيّر نفسه لمدة شهر.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تحتاج إلى <strong>دالتَي</strong> CloudFront لهذا النمط—واحدة على <code>viewer-request</code> لتوجيه الطلب، وواحدة على <code>viewer-response</code> لضبط ملف تعريف الارتباط. تستطيع دالة CloudFront الواحدة التعامل مع نوع حدث واحد فقط لكل سلوك، لكن يمكن أن يكون للسلوك الواحد دالة طلب مشاهد ودالة استجابة مشاهد مرتبطتان به معًا.</p>
</blockquote>
<h2 id="إعداد-بنية-s3">إعداد بنية S3</h2>
<p>لكي يعمل هذا، يحتاج دلو S3 الخاص بك إلى محتوى خاص بكل متغيّر. أبسط نهج: أنشئ بنيتين متوازيتين من المجلدات.</p>
<pre><code>my-frontend-app-assets/
├── a/
│   └── index.html     ← Variant A homepage
├── b/
│   └── index.html     ← Variant B homepage
├── style.css           ← Shared assets (not A/B tested)
└── script.js           ← Shared assets
</code></pre>
<p>ارفع محتوى المتغيّرات إلى دلو S3:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> ./build/variant-a/index.html \\
  s3://my-frontend-app-assets/a/index.html \\
  --region us-east-1 \\
  --output json

aws s3 <span class="hljs-built_in">cp</span> ./build/variant-b/index.html \\
  s3://my-frontend-app-assets/b/index.html \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لا تحتاج الأصول المشتركة (CSS وJS والصور) إلى التكرار. الصفحات المختلفة بين المتغيرات وحدها تحتاج إلى نسخ منفصلة.</p>
<h2 id="بديل-lambdaedge">بديل Lambda@Edge</h2>
<p>إذا كان اختبار A/B لديك يحتاج إلى التوجيه إلى <strong>أصول مختلفة</strong> (مثل دلوَي S3 مختلفين أو نقطتي نهاية API مختلفتين)، فأنت بحاجة إلى Lambda@Edge مع محفّز <strong>طلب الأصل</strong>. لا تستطيع دوال CloudFront تغيير الأصل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">const</span> cookies = request.<span class="hljs-property">headers</span>.<span class="hljs-property">cookie</span> || [];

  <span class="hljs-keyword">let</span> variant = <span class="hljs-string">&#x27;a&#x27;</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> cookie <span class="hljs-keyword">of</span> cookies) {
    <span class="hljs-keyword">const</span> match = cookie.<span class="hljs-property">value</span>.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/ab-variant=([ab])/</span>);
    <span class="hljs-keyword">if</span> (match) {
      variant = match[<span class="hljs-number">1</span>];
      <span class="hljs-keyword">break</span>;
    }
  }

  <span class="hljs-comment">// Route to different S3 paths based on variant</span>
  <span class="hljs-keyword">if</span> (variant === <span class="hljs-string">&#x27;b&#x27;</span>) {
    request.<span class="hljs-property">origin</span> = {
      <span class="hljs-attr">s3</span>: {
        <span class="hljs-attr">domainName</span>: <span class="hljs-string">&#x27;my-frontend-app-assets.s3.amazonaws.com&#x27;</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/variant-b&#x27;</span>,
        <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span>,
        <span class="hljs-attr">authMethod</span>: <span class="hljs-string">&#x27;none&#x27;</span>,
      },
    };
    request.<span class="hljs-property">headers</span>.<span class="hljs-property">host</span> = [
      {
        <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;Host&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;my-frontend-app-assets.s3.amazonaws.com&#x27;</span>,
      },
    ];
  }

  <span class="hljs-keyword">return</span> request;
};
</code></pre>
<p>تعدّل هذه الدالة <strong>مسار الأصل</strong> بدلًا من URI، ما يعني أنه يمكنك تنظيم متغيراتك بشكل مختلف في S3 أو حتى الإشارة إلى دلاء منفصلة تمامًا.</p>
<blockquote>
<p><strong>لماذا <code>authMethod: 'none'</code></strong></p>
<p>يتتبع حقل <code>authMethod</code> OAI فقط، لا OAC—وتوثّق AWS أنها <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html">لا تدعم OAC</a> على الإطلاق. مع OAC، تحدث المصادقة في طبقة التوزيع وتكون غير مرئية لحدث Lambda@Edge، لذا فإن <code>'none'</code> صحيحة. استخدم <code>'origin-access-identity'</code> فقط مع نمط OAI القديم.</p>
</blockquote>
<h2 id="تقسيمات-مرجحة">تقسيمات مرجّحة</h2>
<p>50/50 هو أبسط تقسيم، لكنك سترغب غالبًا في طرح التغييرات على نسبة أصغر من المستخدمين أولًا. عدّل التخصيص العشوائي:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// 90/10 split: 90% variant A, 10% variant B</span>
variant = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() &lt; <span class="hljs-number">0.9</span> ? <span class="hljs-string">&#x27;a&#x27;</span> : <span class="hljs-string">&#x27;b&#x27;</span>;
</code></pre>
<p>لأكثر من متغيّرين:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">var</span> rand = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
<span class="hljs-keyword">if</span> (rand &lt; <span class="hljs-number">0.33</span>) {
  variant = <span class="hljs-string">&#x27;a&#x27;</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rand &lt; <span class="hljs-number">0.66</span>) {
  variant = <span class="hljs-string">&#x27;b&#x27;</span>;
} <span class="hljs-keyword">else</span> {
  variant = <span class="hljs-string">&#x27;c&#x27;</span>;
}
</code></pre>
<h2 id="اعتبارات-التخزين-المؤقت">اعتبارات التخزين المؤقت</h2>
<p>هذا هو الجزء الذي يربك الناس. (لقد أربكني أنا بالتأكيد في المرة الأولى.) إذا خزّن CloudFront استجابة <code>/</code> مؤقتًا وقدّمها للجميع، ينكسر اختبار A/B لديك—ويحصل كل مستخدم على المتغيّر الذي خُزّن مؤقتًا أولًا.</p>
<p>تحتاج إلى إخبار CloudFront بأن <strong>يخزّن مؤقتًا بشكل منفصل حسب المتغيّر</strong>. هناك نهجان:</p>
<p><strong>النهج 1: التخزين المؤقت حسب ملف تعريف الارتباط.</strong> هيّئ سلوك التخزين المؤقت لديك ليتضمن ملف تعريف الارتباط <code>ab-variant</code> في مفتاح التخزين المؤقت. تُخزَّن الطلبات التي تحمل <code>ab-variant=a</code> و<code>ab-variant=b</code> مؤقتًا بشكل منفصل. تضبط هذا في سياسة التخزين المؤقت المرتبطة بالسلوك (تذكّر <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكيات التخزين المؤقت والإبطال</a>).</p>
<p><strong>النهج 2: التخزين المؤقت حسب URI المعاد كتابته.</strong> إذا أعادت دالة طلب المشاهد كتابة <code>/</code> إلى <code>/a/index.html</code> أو <code>/b/index.html</code>، يخزّنها CloudFront مؤقتًا بشكل طبيعي ككائنات منفصلة لأن URI مختلف. يتجنب هذا النهج تغييرات سياسة التخزين المؤقت.</p>
<p>نهج إعادة كتابة URI (النهج 2) أبسط، وهو ما يستخدمه مثال دالة CloudFront أعلاه. يعمل التخزين المؤقت ببساطة لأن <code>/a/index.html</code> و<code>/b/index.html</code> مفتاحان مختلفان للتخزين المؤقت.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا استخدمت نهج مفتاح التخزين المؤقت القائم على ملف تعريف الارتباط، فكن واعيًا بأنه يزيد معدل إخفاقات التخزين المؤقت لديك. كل تركيبة فريدة من ملفات تعريف الارتباط تنشئ كائنًا مخزّنًا مؤقتًا منفصلًا. بالنسبة لاختبار A/B بمتغيّرين، يضاعف هذا إخفاقات التخزين المؤقت لديك على الأكثر—وهو أمر مقبول. أما التجارب ذات المتغيرات الكثيرة، فنهج URI المعاد كتابته يتوسع بشكل أفضل.</p>
</blockquote>
<h2 id="إنهاء-التجربة">إنهاء التجربة</h2>
<p>عندما يكون لديك فائز، أزل دوال الحافة وقدّم المتغيّر الفائز مباشرة. حدّث عملية النشر لنسخ محتوى المتغيّر الفائز إلى المسار الجذري، وأزل مجلدَي <code>/a/</code> و<code>/b/</code>، وافصل دوال CloudFront عن السلوك.</p>
<p>لا تنسَ معالجة المستخدمين الذين لا يزالون يحملون ملف تعريف الارتباط القديم—سينتهي من تلقاء نفسه (يتولى Max-Age ذلك)، لكن إذا أردت تنظيفه فورًا، فيمكن لدالة استجابة مشاهد مؤقتة مسحه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> response = event.<span class="hljs-property">response</span>;
  response.<span class="hljs-property">cookies</span>[<span class="hljs-string">&#x27;ab-variant&#x27;</span>] = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">attributes</span>: <span class="hljs-string">&#x27;Path=/; Max-Age=0&#x27;</span>,
  };
  <span class="hljs-keyword">return</span> response;
}
</code></pre>
<p>ضبط <code>Max-Age=0</code> يخبر المتصفح بحذف ملف تعريف الارتباط.</p>
`,r={book:s,chapter:"aws",chapterTitle:n,slug:a,title:e,headings:p,html:t};export{s as book,l as chapter,n as chapterTitle,r as default,p as headings,t as html,a as slug,e as title};
