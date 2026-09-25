const s="patterns-dev",n="react",a="أنماط React وNext.js",t="static-rendering",l="العرض الساكن",p=[{depth:2,id:"أين-يتقدم-العرض-الساكن",text:"أين يتقدم العرض الساكن"},{depth:2,id:"الصفحات-الساكنة-في-app-router",text:"الصفحات الساكنة في App Router"},{depth:2,id:"العرض-الساكن-مع-البيانات",text:"العرض الساكن مع البيانات"},{depth:2,id:"المسارات-الديناميكية-باستخدام-generatestaticparams",text:"المسارات الديناميكية باستخدام generateStaticParams"},{depth:2,id:"العرض-الساكن-مع-جلب-في-جانب-العميل",text:"العرض الساكن مع جلب في جانب العميل"},{depth:2,id:"العرض-الجزئي-المسبق-هيكل-ساكن-فتحات-ديناميكية-مبثوثة",text:"العرض الجزئي المسبق: هيكل ساكن + فتحات ديناميكية مبثوثة"},{depth:2,id:"ملف-الأداء",text:"ملف الأداء"},{depth:2,id:"اعتبارات-وقت-البناء",text:"اعتبارات وقت البناء"},{depth:2,id:"متى-لا-يكفي-العرض-الساكن",text:"متى لا يكفي العرض الساكن"}],e=`<p>يُنتج العرض الساكن (static rendering) — الذي يُسمى أيضًا توليد المواقع الساكنة (static site generation، SSG) — ملف HTML لكل مسار (route) وقت البناء. يقابل كل عنوان URL ملفًا على القرص يمكن لـ CDN تقديمه من ذاكرة المؤقتة (cache) خلال أجزاء من الثانية، بغض النظر عن موقع المستخدم أو عدد الطلبات الأخرى الجاري تنفيذها في الوقت نفسه. لا يؤدي الخادم أي عمل لكل طلب، لذا لا يتجاوز TTFB سوى زمن استجابة الشبكة.</p>
<p>هذه هي استراتيجية العرض ذات ملف الأداء (performance profile) الأبسط وتكلفة التشغيل الأدنى. لكنها أيضًا الاستراتيجية الأكثر تقييدًا: كل زائر يرى HTML نفسه. إذا كان مستخدمان مختلفان سيريان محتوى مختلفًا، فلن يكفي العرض الساكن وحده، لكنه ينسجم جيدًا مع عمليات الجلب في جانب العميل وISR والعرض الجزئي المسبق (partial prerendering) للتعامل مع البيانات الديناميكية من دون التخلي عن الذاكرة المؤقتة.</p>
<h2 id="أين-يتقدم-العرض-الساكن">أين يتقدم العرض الساكن</h2>
<p>العرض الساكن هو الخيار الصحيح عندما:</p>
<ul>
<li>يُحدَّث المحتوى وفق جدول نشر، لا وفق وتيرة الطلبات، مثل صفحات التسويق والتوثيق ومنشورات المدونات وسجلات التغييرات وصفحات الوصول والصفحات القانونية.</li>
<li>يكون HTML نفسه صحيحًا لكل زائر، أو يمكن جعله كذلك بتأجيل الأجزاء الخاصة بكل مستخدم إلى مكوّن في جانب العميل.</li>
<li>تريد تكلفة تشغيل ثابتة — فاتورة CDN بدل فاتورة دالة عديمة الخوادم.</li>
<li>تحتاج إلى مرونة: يظل الموقع المعروض مسبقًا بالكامل في الخدمة حتى لو تعطل الأصل أو قاعدة البيانات.</li>
</ul>
<p>لا يناسبه عندما:</p>
<ul>
<li>يتغير المحتوى مع كل طلب، مثل نتائج البحث ولوحات المعلومات وكل ما يتطلب مصادقة.</li>
<li>تكبر أوقات البناء بما يكفي لإبطاء دورة النشر، وستتعلم المزيد عن ذلك أدناه.</li>
<li>تحتاج إلى مراعاة موقع المستخدم الجغرافي أو ملفات تعريف الارتباط أو مجموعة اختبار A/B داخل HTML.</li>
</ul>
<p><img src="/images/patterns-dev/react-static-rendering-0-Screen_Shot_2021_04_03_at_5.52.41_PM.webp" alt="صفحة مُولَّدة ساكناً كما تظهر في المتصفح"></p>
<h2 id="الصفحات-الساكنة-في-app-router">الصفحات الساكنة في App Router</h2>
<p>في App Router الخاص بـ Next.js، يُعرض أي مكوّن خادمي (server component) لا يملك مصادر بيانات ديناميكية تلقائيًا بصورة ساكنة. لا حاجة إلى استدعاء <code>getStaticProps</code>؛ فالمكوّن نفسه يعمل وقت البناء.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/pricing/page.tsx</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Pricing</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Pricing<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Three tiers, no surprises.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>

);

}
</code></pre>
<p>نفّذ <code>next build</code>، فيُصدر Next ملف HTML ساكنًا للمسار <code>/pricing</code>. لا يُشرك أي خادم وقت التشغيل عند وصول الطلب.</p>
<p>هناك أمور تجعل المسار <em>يخرج</em> من العرض الساكن ويدخل العرض الديناميكي:</p>
<ul>
<li>قراءة <code>cookies()</code> أو <code>headers()</code> أو <code>draftMode()</code>.</li>
<li>استخدام <code>searchParams</code> في مكوّن خادمي؛ وهي غير متزامنة في Next.js 15.</li>
<li>استدعاء <code>fetch()</code> مع <code>cache: &quot;no-store&quot;</code> أو <code>next: { revalidate: 0 }</code>.</li>
<li>تصدير <code>dynamic = &quot;force-dynamic&quot;</code> من ملف المسار.</li>
</ul>
<p>إذا لم يحدث أي من ذلك، فالمسار ساكن.</p>
<h2 id="العرض-الساكن-مع-البيانات">العرض الساكن مع البيانات</h2>
<p>تسحب معظم المواقع الحقيقية المحتوى من CMS أو قاعدة بيانات أو نظام ملفات. في App Router يكون ذلك مكوّنًا خادميًا غير متزامن عاديًا؛ إذ ينفذه Next وقت البناء ويخزّن نتيجته مؤقتًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/blog/page.tsx</span>

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Link</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/link&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BlogIndex</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAllPosts</span>();

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

{posts.map((post) =&gt; (

<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.slug}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>\`/<span class="hljs-attr">blog</span>/\${<span class="hljs-attr">post.slug</span>}\`}&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

))}

<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>

);

}
</code></pre>
<p>سيكتشف Next.js أن هذا المكوّن لا يملك مدخلات مرتبطة بالطلب، ومن ثم سيعرض <code>/blog</code> مسبقًا وقت البناء. يُنفَّذ جلب البيانات مرة واحدة على خادم البناء، ثم يُرسل HTML المعروض إلى CDN.</p>
<h2 id="المسارات-الديناميكية-باستخدام-generatestaticparams">المسارات الديناميكية باستخدام <code>generateStaticParams</code></h2>
<p>البديل في App Router لـ <code>getStaticPaths</code> هو <code>generateStaticParams</code>. صدّره من ملف مسار ذي مقطع ديناميكي، فيعرض Next ملف HTML واحدًا لكل مجموعة معاملات يُعيدها.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/blog/[slug]/page.tsx</span>

<span class="hljs-keyword">import</span> { notFound } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/navigation&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateStaticParams</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAllPosts</span>();

<span class="hljs-keyword">return</span> posts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> ({ <span class="hljs-attr">slug</span>: post.<span class="hljs-property">slug</span> }));

}\\n

<span class="hljs-comment">// Reject params not returned above. Default in Next 15 is true.</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> dynamicParams = <span class="hljs-literal">false</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params">{ params }</span>) {

<span class="hljs-keyword">const</span> { slug } = <span class="hljs-keyword">await</span> params; <span class="hljs-comment">// params is async in Next 15</span>

<span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(slug);

<span class="hljs-keyword">if</span> (!post) <span class="hljs-title function_">notFound</span>();\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">post.html</span> }} /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>

);

}
</code></pre>
<p>اضبط <code>dynamicParams = true</code> أو احذفه لعرض المعرّفات غير المعروفة عند الطلب ثم خزّن النتيجة مؤقتًا. هذا هو مجال ISR، وسنغطيه في النمط التالي.</p>
<h2 id="العرض-الساكن-مع-جلب-في-جانب-العميل">العرض الساكن مع جلب في جانب العميل</h2>
<p>عندما يكون معظم الصفحة ساكنًا لكن جزءًا واحدًا يعتمد فعليًا على كل طلب — مثل عدّاد «المشاهدون الآن» أو شريط توصيات مخصص أو ترحيب لمن سجّل الدخول — يمكنك إبقاء الصفحة ساكنة وطلب من مكوّن في جانب العميل (client component) أن يملأ الجزء الديناميكي بعد الترطيب (hydration).</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/products/[id]/page.tsx</span>

<span class="hljs-keyword">import</span> <span class="hljs-title class_">RecommendationsClient</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./RecommendationsClient&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateStaticParams</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> products = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAllProducts</span>();

<span class="hljs-keyword">return</span> products.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> ({ <span class="hljs-attr">id</span>: p.<span class="hljs-property">id</span> }));

}\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Product</span>(<span class="hljs-params">{ params }</span>) {

<span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">await</span> params;

<span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProduct</span>(id);\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>

{/* hydrated separately, fetches at runtime */}

<span class="hljs-tag">&lt;<span class="hljs-name">RecommendationsClient</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>

<span class="hljs-tag">&lt;/&gt;</span></span>

);

}
</code></pre>
<p>لا يزال HTML يصل معروضًا مسبقًا. ترطب أداة التوصيات وتنفّذ عملية جلب خاصة بها، عادةً عبر TanStack Query أو SWR من أجل التخزين المؤقت وإعادة التحقق (revalidation). يمنحك هذا النمط TTFB الخاص بالعرض الساكن للمحتوى الرئيسي وحداثة البيانات لكل مستخدم في المكان الذي يهم.</p>
<h2 id="العرض-الجزئي-المسبق-هيكل-ساكن-فتحات-ديناميكية-مبثوثة">العرض الجزئي المسبق: هيكل ساكن + فتحات ديناميكية مبثوثة</h2>
<p>العرض الجزئي المسبق (Partial Prerendering، PPR) هو ميزة تجريبية في Next.js تمزج المحتوىين الساكن والديناميكي في عملية عرض <em>واحدة</em>. تُرسَل الأجزاء الساكنة من الصفحة هيكلًا معروضًا مسبقًا. أما الأجزاء الديناميكية — المغلّفة بـ \`\` — فتُبث من بيئة تشغيل الخادم ضمن الاستجابة نفسها.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/page.tsx</span>

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> { cookies } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/headers&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> experimental_ppr = <span class="hljs-literal">true</span>;\\n

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">GreetingForUser</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> cookieStore = <span class="hljs-keyword">await</span> <span class="hljs-title function_">cookies</span>(); <span class="hljs-comment">// dynamic</span>

<span class="hljs-keyword">const</span> session = cookieStore.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;session&quot;</span>);

<span class="hljs-keyword">const</span> name = session ? <span class="hljs-keyword">await</span> <span class="hljs-title function_">lookupName</span>(session.<span class="hljs-property">value</span>) : <span class="hljs-string">&quot;there&quot;</span>;

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello, {name}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;

}\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Home</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to the store<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span> {/* static */}

<span class="hljs-tag">&lt;<span class="hljs-name">Hero</span> /&gt;</span> {/* static */}\\n

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">p</span>&gt;</span>Hello...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">GreetingForUser</span> /&gt;</span> {/* dynamic, streamed */}

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>\\n

<span class="hljs-tag">&lt;<span class="hljs-name">FeaturedProducts</span> /&gt;</span> {/* static, data fetched at build */}

<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>

);

}
</code></pre>
<p>يحصل المستخدم على الهيكل الساكن بسرعة CDN. تُبث الفتحة الديناميكية كإضافة مجزأة إلى الاستجابة نفسها، بينما يسدّ البديل الاحتياطي (fallback) الفجوة المؤقتة. فتحصل على TTFB الخاص بالعرض الساكن في الأجزاء الساكنة، وحداثة SSR في بقية الأجزاء، من دون تقسيم الصفحة إلى مسارات منفصلة.</p>
<p>فعّل PPR في <code>next.config.js</code> باستخدام <code>experimental.ppr = &quot;incremental&quot;</code> لتفعيله على مستوى كل مسار.</p>
<h2 id="ملف-الأداء">ملف الأداء</h2>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>SSG خالص</th>
<th>SSG مع جلب في العميل</th>
<th>SSR</th>
<th>PPR</th>
</tr>
</thead>
<tbody>
<tr>
<td>TTFB</td>
<td>ممتاز (ذاكرة CDN المؤقتة)</td>
<td>ممتاز</td>
<td>بطيء (لكل طلب)</td>
<td>ممتاز (يُبث الهيكل الساكن أولًا)</td>
</tr>
<tr>
<td>LCP</td>
<td>ممتاز</td>
<td>جيد</td>
<td>متغير</td>
<td>ممتاز</td>
</tr>
<tr>
<td>التخصيص داخل HTML</td>
<td>لا</td>
<td>بعد الترطيب</td>
<td>نعم</td>
<td>نعم (داخل الفتحات الديناميكية)</td>
</tr>
<tr>
<td>تكلفة الخادم لكل طلب</td>
<td>$0</td>
<td>منخفضة</td>
<td>لكل عملية عرض</td>
<td>لكل مقطع ديناميكي</td>
</tr>
<tr>
<td>إبطال الذاكرة المؤقتة</td>
<td>إعادة البناء وإعادة النشر</td>
<td>لا ينطبق على الجزء الديناميكي</td>
<td>لا ينطبق</td>
<td>إعادة التحقق لكل مقطع</td>
</tr>
</tbody>
</table>
<h2 id="اعتبارات-وقت-البناء">اعتبارات وقت البناء</h2>
<p>للعرض الساكن تكلفة تشغيلية واحدة تتناسب مع حجم المحتوى: زمن البناء. إذا كان موقع التجارة الإلكترونية لديك يملك 200,000 منتج واستغرق عرض كل صفحة تفصيلية 50 مللي ثانية، فإن البناء الكامل يستغرق نحو 3 ساعات من العرض أحادي الخيط. وتساعدك الاستراتيجيات التالية:</p>
<ul>
<li><strong>اعرض الصفحات N الأولى مسبقًا فقط</strong> باستخدام <code>generateStaticParams</code>، واعرض الباقي ديناميكيًا عند أول طلب مع التخزين المؤقت عبر ISR. هذا ما تفعله معظم المواقع الكبيرة.</li>
<li><strong>وازِن البناء بالتوازي</strong> عبر عدة عمّال؛ فمعظم أطر العمل الحديثة تفعل ذلك تلقائيًا، لكنه يتوسع مع عدد أنوية المعالج.</li>
<li><strong>خزّن عمليات الجلب مؤقتًا بين عمليات البناء</strong> باستخدام ذاكرة المؤقتة التدريجية (incremental cache)؛ إذ يحفظ Next.js نتائج الجلب السابقة ويعيد استخدامها عند عدم تغيرها.</li>
<li><strong>استخدم إعادة التحقق عند الطلب (on-demand revalidation)</strong> بدلًا من إعادة بناء الموقع بأكمله عند تغير صفحة واحدة.</li>
</ul>
<h2 id="متى-لا-يكفي-العرض-الساكن">متى لا يكفي العرض الساكن</h2>
<p>القيد الأساسي للعرض الساكن — HTML نفسه لكل زائر، لا يتغير إلا وقت البناء — هو ما يجعله رخيصًا وسريعًا. وعندما يسبب هذا القيد مشكلة، يخفّف النمط التالي، <strong>التوليد الساكن التزايدي (Incremental Static Regeneration، ISR)</strong>، جانب «لا يُحدَّث إلا وقت البناء». وبعد ذلك، يعالج <strong>البث مع SSR</strong> و<strong>مكوّنات React الخادمية</strong> جانب «HTML نفسه للجميع».</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
