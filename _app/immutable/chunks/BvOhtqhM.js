const s="patterns-dev",n="react",a="أنماط React وNext.js",t="incremental-static-rendering",p="التوليد الساكن التزايدي",l=[{depth:2,id:"نمطان-ضمن-isr",text:"نمطان ضمن ISR"},{depth:2,id:"إعادة-التحقق-المبنية-على-الوقت",text:"إعادة التحقق المبنية على الوقت"},{depth:2,id:"إعادة-التحقق-الفورية-باستخدام-المسارات-والوسوم",text:"إعادة التحقق الفورية باستخدام المسارات والوسوم"},{depth:2,id:"توليد-الصفحات-عند-الطلب",text:"توليد الصفحات عند الطلب"},{depth:2,id:"أين-يعمل-isr",text:"أين يعمل ISR"},{depth:2,id:"متى-تكون-isr-الأداة-المناسبة",text:"متى تكون ISR الأداة المناسبة"},{depth:2,id:"المقايضات",text:"المقايضات"},{depth:2,id:"isr-مقابل-ssr-مقابل-ssg-نظرة-سريعة",text:"ISR مقابل SSR مقابل SSG، نظرة سريعة"}],e=`<p>للتوليد الساكن (static generation) الصِرف حدٌّ صارم: أي تغيير في الصفحة يستلزم إعادة البناء والنشر بالكامل. بالنسبة إلى موقع توثيق صغير، يستغرق ذلك بضع ثوانٍ ولا يلاحظه أحد. أما في سوق تضم مئة ألف صفحة منتج، فهو خط أنابيب يستغرق ساعات ويوقف إصلاح كل خطأ مطبعي.</p>
<p>يخفف <strong>التوليد الساكن التزايدي (Incremental Static Regeneration، ISR)</strong> هذا القيد. يظل الموقع معروضًا إلى HTML ويُقدَّم من ذاكرة CDN المؤقتة (cache)، لكن يمكن تحديث مدخلات الذاكرة <em>بعد</em> النشر — إما وفق مؤقت، أو استجابة مباشرة لحدث ما، مثل «جرى تحرير منتج، فأبطِل هذه الصفحة». ويمكن عرض المسارات (routes) الجديدة التي لم تكن جزءًا من البناء عند أول طلب، ثم تخزينها لكل من يأتي بعدها.</p>
<p>نموذج السلوك هو الأسلوب الكلاسيكي في ذاكرة HTTP، <strong>stale-while-revalidate</strong>: يحصل الطلب على HTML المخزّن فورًا، وإذا تجاوز المدخل نافذة حداثته، أعاد الإطار توليده في الخلفية من أجل الزائر التالي. لا ينتظر أحد إعادة التوليد، وتلحق الذاكرة المؤقتة بالواقع في النهاية.</p>
<h2 id="نمطان-ضمن-isr">نمطان ضمن ISR</h2>
<p>يمثل ISR في الحقيقة قدرتين مترابطتين أُدمجتا معًا:</p>
<ul>
<li><strong>التوليد الفوري للمسارات الجديدة</strong> — اعرض صفحة في أول مرة يطلبها أحد، ثم خزّنها مؤقتًا.</li>
<li><strong>إعادة التحقق (revalidation) للمسارات الحالية</strong> — حدّث صفحة سبق عرضها إما بعد فاصل زمني أو بعد طلب إبطال صريح.</li>
</ul>
<p>يعرض App Router هاتين القدرتين عبر أدوات تحكم مختلفة عن تلك التي كان 제공한다 Pages Router القديم. لم يعد هناك <code>getStaticProps({ revalidate })</code> أو <code>fallback: true</code>.</p>
<h2 id="إعادة-التحقق-المبنية-على-الوقت">إعادة التحقق المبنية على الوقت</h2>
<p>الحالة الأبسط: اعرض صفحة مسبقًا، ثم حدّثها كل <code>N</code> ثانية على الأكثر. يبقى HTML المخزّن حيًا حتى انقضاء <code>N</code> ثانية وطلب أحدهم الصفحة مجددًا، وعندها يعيد الإطار عرضها في الخلفية.</p>
<p>في App Router، تضبط ذلك إما على مستوى المسار أو لكل عملية جلب.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/blog/page.tsx</span>

<span class="hljs-comment">// Re-render at most once every 5 minutes.</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> revalidate = <span class="hljs-number">300</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BlogIndex</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAllPosts</span>();

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PostList</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span></span>;

}
</code></pre>
<p>تمنحك إعادة التحقق لكل عملية جلب تحكمًا أدق؛ إذ يمكن لبيانات مختلفة في الصفحة نفسها أن تمتلك نوافذ حداثة مختلفة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/dashboard/page.tsx</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {

<span class="hljs-comment">// Hourly: company-wide stats</span>

<span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/stats&quot;</span>, {

<span class="hljs-attr">next</span>: { <span class="hljs-attr">revalidate</span>: <span class="hljs-number">3600</span> },

}).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>());\\n

<span class="hljs-comment">// Every 30 seconds: live notifications</span>

<span class="hljs-keyword">const</span> alerts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/alerts&quot;</span>, {

<span class="hljs-attr">next</span>: { <span class="hljs-attr">revalidate</span>: <span class="hljs-number">30</span> },

}).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>());\\n

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DashboardView</span> <span class="hljs-attr">stats</span>=<span class="hljs-string">{stats}</span> <span class="hljs-attr">alerts</span>=<span class="hljs-string">{alerts}</span> /&gt;</span></span>;

}
</code></pre>
<p>تحدد عملية الجلب ذات نافذة إعادة التحقق الأقصر مدى تكرار إعادة عرض الصفحة نفسها. ولاحظ أن <code>fetch</code> في Next.js 15 <strong>لم يعد مخزّنًا مؤقتًا افتراضيًا</strong>؛ فعّل ذلك عبر <code>next.revalidate</code> أو <code>cache: &quot;force-cache&quot;</code>.</p>
<h2 id="إعادة-التحقق-الفورية-باستخدام-المسارات-والوسوم">إعادة التحقق الفورية باستخدام المسارات والوسوم</h2>
<p>ISR على أساس الوقت مناسب لفهرس مدونة يُسمح له بأن يكون قديمًا خمس دقائق. لكنه غير صحيح للمحتوى الذي لا تُقبل فيه البيانات القديمة — فحين ينشر محرر منشورًا أو يتغير سعر، ينبغي أن تُحدَّث الصفحة المخزنة <em>الآن</em>، لا عند انتهاء نافذة اعتباطية.</p>
<p>يوفر App Router لك أداتين دقيقتين: <code>revalidatePath</code> و<code>revalidateTag</code>.</p>
<p><strong><code>revalidatePath</code></strong> يبطّل عنوان URL محددًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/api/revalidate/route.ts</span>

<span class="hljs-keyword">import</span> { revalidatePath } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/cache&quot;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">NextResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/server&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">POST</span>(<span class="hljs-params">req: Request</span>) {

<span class="hljs-keyword">const</span> { secret, slug } = <span class="hljs-keyword">await</span> req.<span class="hljs-title function_">json</span>();

<span class="hljs-keyword">if</span> (secret !== process.<span class="hljs-property">env</span>.<span class="hljs-property">REVALIDATE_SECRET</span>) {

<span class="hljs-keyword">return</span> <span class="hljs-title class_">NextResponse</span>.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">false</span> }, { <span class="hljs-attr">status</span>: <span class="hljs-number">401</span> });

}\\n

<span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">\`/blog/<span class="hljs-subst">\${slug}</span>\`</span>);

<span class="hljs-keyword">return</span> <span class="hljs-title class_">NextResponse</span>.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">revalidated</span>: <span class="hljs-literal">true</span> });

}
</code></pre>
<p>اربط CMS ليستدعي نقطة النهاية هذه عند النشر. خلال ثانية أو ثانيتين، سيحصل الطلب التالي إلى <code>/blog/</code> على النسخة الحديثة.</p>
<p><strong><code>revalidateTag</code></strong> يبطّل <em>كل</em> عملية جلب وُسمت بالسلسلة المعطاة، مهما كان المسار الذي تقع فيه.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/products/[id]/page.tsx</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Product</span>(<span class="hljs-params">{ params }</span>) {

<span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">await</span> params;

<span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://api/products/<span class="hljs-subst">\${id}</span>\`</span>, {

<span class="hljs-attr">next</span>: { <span class="hljs-attr">tags</span>: [<span class="hljs-string">\`product:<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-string">&quot;products&quot;</span>] },

}).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>());

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductView</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span></span>;

}
</code></pre>
<p>عندما يتغير المنتج، تستدعي <code>revalidateTag(&quot;product:&quot; + id)</code> فتتحدث صفحات ذلك المنتج وحدها. وعندما تغيّر الأسعار في الكتالوج كله، يبطّل <code>revalidateTag(&quot;products&quot;)</code> كل صفحة استخدمت جلب منتج. وهذه أنظف طريقة لنمذجة إبطال الذاكرة المؤقتة في موقع يدعم CMS؛ إذ تتوافق وسومك مع نموذج التحرير، لا مع بنية عناوين URL.</p>
<p>يمكنك أيضًا استدعاء <code>revalidateTag</code> و<code>revalidatePath</code> مباشرة من <strong>Server Action</strong>، وهي الطريقة غالبًا أنظف من إنشاء نقطة نهاية منفصلة لإعادة التحقق:</p>
<pre><code class="language-javascript"><span class="hljs-string">&quot;use server&quot;</span>;

<span class="hljs-keyword">import</span> { revalidateTag } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/cache&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">publishPost</span>(<span class="hljs-params">formData: FormData</span>) {

<span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> db.<span class="hljs-property">posts</span>.<span class="hljs-title function_">create</span>({

<span class="hljs-attr">title</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;title&quot;</span>),

<span class="hljs-attr">body</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;body&quot;</span>),

});

<span class="hljs-title function_">revalidateTag</span>(<span class="hljs-string">&quot;posts&quot;</span>);

<span class="hljs-keyword">return</span> post;

}
</code></pre>
<h2 id="توليد-الصفحات-عند-الطلب">توليد الصفحات عند الطلب</h2>
<p>بالنسبة إلى المواقع التي تملك عددًا كبيرًا جدًا من المسارات الممكنة يتعذر عرضها جميعًا مسبقًا — مثل سوق يضم ملايين وحدات المخزون أو CMS بأسماء غير محدودة — فاعرض المسارات الشائعة مسبقًا ودع الباقي يُعرض عند أول طلب.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/products/[id]/page.tsx\\n</span>

<span class="hljs-comment">// Prerender the top 1,000 most-viewed products at build time.</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateStaticParams</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> top = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getTopProducts</span>(<span class="hljs-number">1000</span>);

<span class="hljs-keyword">return</span> top.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> ({ <span class="hljs-attr">id</span>: p.<span class="hljs-property">id</span> }));

}\\n

<span class="hljs-comment">// Allow other ids to render on demand and be cached afterward.</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> dynamicParams = <span class="hljs-literal">true</span>;\\n

<span class="hljs-comment">// Re-render any cached entry at most once an hour.</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> revalidate = <span class="hljs-number">3600</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Product</span>(<span class="hljs-params">{ params }</span>) {

<span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">await</span> params;

<span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProduct</span>(id);

<span class="hljs-keyword">if</span> (!product) <span class="hljs-title function_">notFound</span>();

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductView</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span></span>;

}
</code></pre>
<p>يؤدي أول طلب لمنتج غير مخزّن إلى تشغيل العرض على الخادم، ثم تدخل النتيجة ذاكرة CDN المؤقتة لتخدم الجميع. يبقى البناء سريعًا، إذ يضم 1,000 صفحة لا 1,000,000 صفحة، ويظل الذيل الطويل سريع التحميل بعد إحمائه الأول، وتتحدث المدخلات القديمة تلقائيًا في الخلفية.</p>
<p>إذا أردت للمعاملات غير المعروفة أن تُعيد 404 بدل أن تُولَّد عند أول استخدام، فاضبط <code>dynamicParams = false</code>.</p>
<h2 id="أين-يعمل-isr">أين يعمل ISR</h2>
<p>يكون ISR أقوى ما يكون عند تشغيله على الحافة (edge). تنفذ Vercel وNetlify وCloudflare عمليات إعادة التوليد الفورية من بيئة تشغيل الحافة وتحفظ النتيجة في ذاكرة مؤقتة عالمية. يرى الزوار في كل قارة ردودًا ساكنة سريعة من دون أن يضطر أحد إلى رحلة ذهاب وعودة إلى أصل مركزي.</p>
<p>هناك نقطة دقيقة لكنها مهمة: <strong>إعادة التحقق لا تنتشر فورًا إلى كل نقطة حضور (POP) على الحافة</strong>. عندما تستدعي <code>revalidatePath</code>، تُوسم مدخلة الذاكرة المؤقتة <em>قديمة</em>. ويؤدي الطلب التالي إلى نقطة حضور بعينها إلى إعادة توليدها هناك. تنتشر معظم المنصات إشارة الإبطال بسرعة، لكن إذا احتاج محرروك إلى اتساق عالمي دقيق بمجرد الضغط على نشر، فخطط أيضًا لمسح ذاكرة CDN المؤقتة مباشرة.</p>
<h2 id="متى-تكون-isr-الأداة-المناسبة">متى تكون ISR الأداة المناسبة</h2>
<table>
<thead>
<tr>
<th>نوع الصفحة</th>
<th>مناسبة؟</th>
</tr>
</thead>
<tbody>
<tr>
<td>صفحات تسويق تُحدَّث أسبوعيًا</td>
<td>نعم — <code>revalidate: 86400</code>.</td>
</tr>
<tr>
<td>مقالات أخبار ومنشورات مدونات</td>
<td>نعم — إعادة التحقق بالوسوم عند النشر.</td>
</tr>
<tr>
<td>صفحات فئات التجارة الإلكترونية</td>
<td>نعم — بالوسوم، مع إعادة التحقق عند تغير المخزون.</td>
</tr>
<tr>
<td>صفحات تفاصيل المنتج</td>
<td>نعم — اعرض المنتجات الأكثر مبيعًا مسبقًا، والذيل الطويل عند الطلب.</td>
</tr>
<tr>
<td>النتائج الرياضية المباشرة</td>
<td>لا — استخدم SSR أو SSR بالبث.</td>
</tr>
<tr>
<td>لوحة معلومات مخصصة</td>
<td>لا — استخدم SSR أو PPR مع فتحات ديناميكية.</td>
</tr>
<tr>
<td>نتائج البحث</td>
<td>لا — عدد التوليفات كبير جدًا؛ استخدم SSR.</td>
</tr>
</tbody>
</table>
<h2 id="المقايضات">المقايضات</h2>
<p><strong>إبطال الذاكرة المؤقتة مشكلة حقيقية</strong> — وهي المسألة الصعبة الثانية في علوم الحاسوب. يضع ISR الصعوبة بين يديك: عليك تذكّر الوسوم أو المسارات التي يجب إبطالها عند تغير البيانات، ونسيان أي منها يعني أن يرى المستخدمون أسعارًا أو مخزونًا أو عناوين قديمة. تجعل إعادة التحقق بالوسوم هذه المهمة قابلة للإدارة، لكن عاملها كأداة انضباط لا كميزة.</p>
<p><strong>توليد سيئ يبقى في المكان.</strong> إذا أعاد مصدر البيانات استجابة جزئية أو فشل عرض ما، فقد تُخزَّن النسخة السيئة وتُقدَّم للزائر التالي. ضع جلب البيانات داخل حد أخطاء حقيقي وأعد خطأً عند الفشل للحفاظ على آخر HTML جيد في الذاكرة المؤقتة؛ إذ لن يستبدل Next.js مدخلة ذاكرة صالحة بمدخلة أخرى في حالة الخطأ.</p>
<p><strong>قابلية مراقبة ISR مهارة قائمة بذاتها.</strong> نسب الإصابة/الخطأ لكل مسار، ومتوسط زمن إعادة التوليد، وعدد عمليات إعادة التحقق في الخلفية — لا شيء من ذلك موجود في حزمة المراقبة الافتراضية. تعرض معظم المنصات مقاييس له؛ فتعرّف على مقاييس منصتك.</p>
<p><strong>المحتوى الذي يتطلب مصادقة لا ينتمي هنا.</strong> الفكرة الأساسية لـ ISR هي أن HTML واحدًا معروضًا يخدم مستخدمين كثيرين. وإذا كان HTML يجب أن يختلف لكل مستخدم، فاستخدم SSR، أو هيكلًا ساكنًا مع منطقة مخصصة يجلبها العميل.</p>
<h2 id="isr-مقابل-ssr-مقابل-ssg-نظرة-سريعة">ISR مقابل SSR مقابل SSG، نظرة سريعة</h2>
<table>
<thead>
<tr>
<th>الخاصية</th>
<th>SSG</th>
<th>ISR</th>
<th>SSR</th>
</tr>
</thead>
<tbody>
<tr>
<td>زمن العرض</td>
<td>البناء</td>
<td>البناء + عند الطلب + في الخلفية</td>
<td>لكل طلب</td>
</tr>
<tr>
<td>الحداثة</td>
<td>حتى النشر التالي</td>
<td>حتى إشارة إعادة التحقق التالية</td>
<td>محدّثة دائمًا</td>
</tr>
<tr>
<td>TTFB</td>
<td>ذاكرة الحافة (ممتاز)</td>
<td>ذاكرة الحافة (ممتاز)، مع إعادة توليد أحيانًا</td>
<td>الأصل أو الحافة (جيد)</td>
</tr>
<tr>
<td>التخصيص</td>
<td>لا</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>تكلفة التشغيل</td>
<td>الأدنى</td>
<td>منخفضة</td>
<td>الأعلى</td>
</tr>
<tr>
<td>وضع الفشل</td>
<td>يلزم إعادة البناء بالكامل لإصلاحه</td>
<td>إعادة تحقق سيئة؛ يقدَّم آخر إصدار جيد</td>
<td>يفشل الطلب برمز 500</td>
</tr>
</tbody>
</table>
<p>تكون ISR هي الحل الصحيح عندما تستحق معظم حركاتك اقتصاديات SSG، لكن <em>المحتوى</em> يحتاج إلى الاستمرار في التغير. يعالج النمط التالي — SSR بالبث — مشكلة مختلفة: الصفحات التي تحتاج فعلًا إلى أن تكون ديناميكية، لكن يجب ألا تجعل المستخدم ينتظر حتى تصبح كل بايت جاهزة قبل بدء الرسم.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
