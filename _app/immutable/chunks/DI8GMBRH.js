const s="patterns-dev",n="react",a="أنماط React وNext.js",l="progressive-hydration",t="الترطيب التدريجي",p=[{depth:2,id:"ما-الذي-يكلفه-التنفيذ-دفعة-واحدة-فعليا",text:"ما الذي يكلّفه التنفيذ «دفعة واحدة» فعليًا"},{depth:2,id:"شكل-التقنية",text:"شكل التقنية"},{depth:2,id:"الترطيب-الانتقائي-خط-الأساس-المدمج",text:"الترطيب الانتقائي: خط الأساس المدمج"},{depth:2,id:"الترطيب-المعتمد-على-الظهور",text:"الترطيب المعتمد على الظهور"},{depth:2,id:"الترطيب-المعتمد-على-التفاعل-ارطب-عند-المرور-ارطب-عند-النقر",text:"الترطيب المعتمد على التفاعل («ارطّب عند المرور»، «ارطّب عند النقر»)"},{depth:2,id:"انتقالات-react-19-تساعد-هنا-أيضا",text:"انتقالات React 19 تساعد هنا أيضًا"},{depth:2,id:"مكونات-react-الخادمية-مخرج-آخر-للترطيب",text:"مكوّنات React الخادمية: مخرج آخر للترطيب"},{depth:2,id:"ما-الذي-ينبغي-قياسه",text:"ما الذي ينبغي قياسه"},{depth:2,id:"شجرة-القرار",text:"شجرة القرار"}],e=`<p>الصفحة المعروضة في الخادم تُرسم بسرعة. يظهر HTML على الشاشة قبل تشغيل أي شيفرة React بوقت طويل. لكن الصفحة لا تصبح <em>تفاعلية</em> إلا بعد أن ينزّل React حزمة JS ويمر على DOM كامل ويطابق كل عقدة بمكوّن ويربط مستمعي الأحداث. تحدث هذه الخطوة — وهي الترطيب (hydration) — دفعة واحدة بصورة متزامنة، وتنمو خطيًا مع حجم شجرة المكوّنات.</p>
<p>النتيجة وضع فشل مألوف: تبدو صفحة كاملة على الشاشة لمدة نصف ثانية أو أكثر، فتفقد النقرات وتبدو معطلة. والمقياس الذي يستخدمه Google لقياس ذلك هو <strong>Interaction to Next Paint (INP)</strong>، الذي حل محل First Input Delay في Core Web Vitals في مارس 2024. ويعد الترطيب أحد أكبر المساهمين في درجات INP السيئة على المواقع التي بُنيت جيدًا بخلاف ذلك.</p>
<p>الترطيب التدريجي (progressive hydration) هو مجموعة التقنيات التي تقسّم الترطيب إلى أجزاء وتشغّل كل جزء في اللحظة التي تهم فيها فعلًا — عند وصول JavaScript الخاص به، أو عندما يمرره المستخدم إلى مجال الرؤية، أو عندما يحاول التفاعل معه. والهدف هو النتيجة نفسها للترطيب مع عمل أقل بكثير على المسار الحرج للصفحة.</p>
<h2 id="ما-الذي-يكلفه-التنفيذ-دفعة-واحدة-فعليا">ما الذي يكلّفه التنفيذ «دفعة واحدة» فعليًا</h2>
<p>لترسيخ المناقشة، إليك بعض الأرقام. على هاتف Android من الفئة المتوسطة لعام 2019:</p>
<ul>
<li>يستغرق تحليل 200 KB من JS المضغوط نحو 300–500 مللي ثانية.</li>
<li>يستغرق ترطيب صفحة متوسطة التعقيد —لنقل 1,500 عقدة React— نحو 150–300 مللي ثانية أخرى.</li>
<li>يظل الخيط الرئيسي محجوبًا طوال الوقت، ما يعني أن النقرات والتمرير وتحركات CSS تتلعثم أو تنتظر في طابور.</li>
</ul>
<p>إذا تم ترطيب القسم الرئيسي وشريط التنقل وعنصر دردشة مضمّن في التذييل معًا، فإن عنصر الدردشة — وهو الجزء الذي لا يلمسه أحد لمدة 30 ثانية — يكون جزءًا من ميزانية حجب INP لديك منذ لحظة تحميل الصفحة. وتفترض الترطيب التدريجي على أن هذا تصرف سخيف. ارطّب ما هو تفاعلي <em>الآن</em>، وأجّل الباقي.</p>
<h2 id="شكل-التقنية">شكل التقنية</h2>
<p>يحتاج نظام ترطيب تدريجي شامل إلى خمسة أمور:</p>
<ul>
<li>يعرض الخادم HTML الكامل لكل مكوّن، فلا ينقص المحتوى أثناء انتظار الترطيب.</li>
<li>تكون JavaScript الخاص بكل مكوّن في مقطع شيفرة مقسّم خاص به.</li>
<li>يعمل الترطيب لكل مقطع، وفق ترتيب محدد أو وفق محفّزات الاستخدام.</li>
<li>تبقى المناطق التي رُطّبت تفاعلية بينما لا تزال مناطق أخرى قيد الترطيب.</li>
<li>تظهر حالة تحميل مرئية وغير مزعجة عند الحاجة.</li>
</ul>
<p>تقدّم React 18 معظم هذه القدرات افتراضيًا. تعرض الأقسام التالية كيفية استخدامها.</p>
<h2 id="الترطيب-الانتقائي-خط-الأساس-المدمج">الترطيب الانتقائي: خط الأساس المدمج</h2>
<p>إذا كنت تستخدم <code>hydrateRoot</code> مع <code>بالفعل، فأنت تمارس أبسط أشكال الترطيب التدريجي. كل شجرة ملفوفة بـ</code> تُرطَّب <em>بشكل مستقل</em> عن بقية الصفحة. وإذا ضغط المستخدم داخل منطقة لم تُرطَّب بعد، فإن React يعيد ترتيب الأولويات؛ فتقفز تلك المنطقة إلى مقدمة الطابور.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span>, lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;\\n

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductReviews</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./ProductReviews&quot;</span>));

<span class="hljs-keyword">const</span> <span class="hljs-title class_">RelatedProducts</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./RelatedProducts&quot;</span>));

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Comments</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./Comments&quot;</span>));\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ product }</span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span> {/* hydrates first */}\\n

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ReviewsSkeleton</span> /&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">ProductReviews</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>\\n

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">RelatedSkeleton</span> /&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">RelatedProducts</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>\\n

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Comments</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

<span class="hljs-tag">&lt;/&gt;</span></span>

);

}
</code></pre>
<p>النتيجة على الشبكة:</p>
<ul>
<li>يُرطَّب <code>ProductDetails</code> كجزء من الحزمة الرئيسية.</li>
<li>تجلب المناطق الثلاث الأخرى كل منها مقطعها الخاص وتُرطَّب عند وصوله.</li>
<li>إذا ضغط المستخدم على «نشر تعليق» قبل تحميل مقطع التعليقات، فإن React يحمّل ويَرطّب <em>تلك</em> المنطقة أولًا.</li>
</ul>
<p>هذا كافٍ لمعظم المواقع. لا تحتاج إلى مرطّب مخصص أو مكتبة خارجية — فاستخدام \`\` مع <code>lazy()</code> و<code>hydrateRoot</code> يمثل الآلية كاملة.</p>
<h2 id="الترطيب-المعتمد-على-الظهور">الترطيب المعتمد على الظهور</h2>
<p>بالنسبة إلى المحتوى أسفل الطية، يمكنك أن تفعل أفضل من «حمّله في وقت ما»؛ إذ يمكنك الانتظار حتى يمرره المستخدم فعلًا إلى مجال الرؤية. هذه الفكرة نفسها المستخدمة في التحميل الكسول للصور، لكن مطبقة على JavaScript.</p>
<p>إليك غلافًا صغيرًا لـ \`\` باستخدام <code>IntersectionObserver</code>:</p>
<pre><code class="language-javascript"><span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useState, useEffect, useRef, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LazyHydrate</span>(<span class="hljs-params">{ children, rootMargin = <span class="hljs-string">&quot;200px&quot;</span> }</span>) {

<span class="hljs-keyword">const</span> [visible, setVisible] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

<span class="hljs-keyword">const</span> ref = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);\\n

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">if</span> (visible) <span class="hljs-keyword">return</span>;

<span class="hljs-keyword">const</span> node = ref.<span class="hljs-property">current</span>;

<span class="hljs-keyword">if</span> (!node) <span class="hljs-keyword">return</span>;\\n

<span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(

<span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {

<span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {

<span class="hljs-title function_">setVisible</span>(<span class="hljs-literal">true</span>);

observer.<span class="hljs-title function_">disconnect</span>();

}

},

{ rootMargin }

);

observer.<span class="hljs-title function_">observe</span>(node);

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();

}, [visible]);\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>

{visible ? <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span> : null}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

}
</code></pre>
<p>في Next.js، النسخة الأكثر ملاءمة هي <code>next/dynamic</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> dynamic <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/dynamic&quot;</span>;\\n

<span class="hljs-keyword">const</span> <span class="hljs-title class_">HeavyChart</span> = <span class="hljs-title function_">dynamic</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./HeavyChart&quot;</span>), {

<span class="hljs-attr">loading</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChartSkeleton</span> /&gt;</span></span>,

});
</code></pre>
<p>يظل هذا العنصر معروضًا في الخادم افتراضيًا. استخدم <code>{ ssr: false }</code> لتخطي العرض في الخادم لمكونات تقيم في جانب العميل فعليًا، مثل خريطة Mapbox أو محرر شيفرة، مع السماح بتنزيل JavaScript وتنفيذه بعيدًا عن المسار الحرج.</p>
<h2 id="الترطيب-المعتمد-على-التفاعل-ارطب-عند-المرور-ارطب-عند-النقر">الترطيب المعتمد على التفاعل («ارطّب عند المرور»، «ارطّب عند النقر»)</h2>
<p>بالنسبة إلى واجهة قد يتعامل معها المستخدم — قائمة بحث منسدلة أو منتقي تاريخ أو قائمة معقدة — يمكنك تأخير تحميل المقطع نفسه حتى يبدّل المستخدم نية التفاعل. هذا ما ترسّخ له أطر عمل مثل Astro وQwik في <code>client:idle</code> و<code>client:visible</code> و<code>client:media</code> و<code>client:only</code>.</p>
<p>في تطبيق Next.js يمكنك محاكاته بغلاف صغير:</p>
<pre><code class="language-javascript"><span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useState, lazy, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;\\n

<span class="hljs-keyword">const</span> <span class="hljs-title class_">SearchModal</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./SearchModal&quot;</span>));\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchTrigger</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [open, setOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setOpen(true)}&gt;Search<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

{open &amp;&amp; (

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">p</span>&gt;</span>Loading search...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">SearchModal</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setOpen(false)} /&gt;

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

)}

<span class="hljs-tag">&lt;/&gt;</span></span>

);

}
</code></pre>
<p>يُرطَّب زر بدء التشغيل كجزء من الحزمة الرئيسية لأنه صغير جدًا. أما النافذة المنبثقة — التي تحمل التبعيات الثقيلة، مثل مكتبة البحث الضبابي وحالة سجل البحث الأخير وبيانات القياس — فلا تُرسَل إلى العميل حتى يضغط المستخدم. تكلفة ترطيب أولية معدومة، وزمن استجابة صغير عند أول تفاعل.</p>
<h2 id="انتقالات-react-19-تساعد-هنا-أيضا">انتقالات React 19 تساعد هنا أيضًا</h2>
<p>ينافس الترطيب الخيط الرئيسي مع كل شيء آخر يفعله المتصفح. وقد استقرت في React 19 <strong>الانتقالات غير المتزامنة (async transitions)</strong> و<strong>الإجراءات (Actions)</strong>، وهما أداتان تمنحانك وسائل لمنع الترطيب من حجب التفاعل:</p>
<ul>
<li>ضع تحديثات الحالة الثقيلة في انتقالات باستخدام <code>startTransition</code> كي يتمكّن React من مقاطعتها.</li>
<li>تشغّل <code>Actions API</code> إرسال النماذج عبر انتقال تلقائيًا، لذا يظل النقر الذي يرسل نموذجًا مستجيبًا حتى عندما تكون المكوّنات المرتبطة ما تزال قيد الترطيب.</li>
<li>تتيح <code>useActionState</code> و<code>useFormStatus</code> معالجة نماذج ملائمة للتحسين التدريجي؛ إذ يعمل النموذج قبل تحميل JavaScript أصلًا.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> { subscribeAction } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./actions&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">SubscribeForm</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [state, formAction, isPending] = <span class="hljs-title function_">useActionState</span>(subscribeAction, <span class="hljs-literal">null</span>);\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>

{isPending ? &quot;Subscribing...&quot; : &quot;Subscribe&quot;}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

{state?.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}

<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>

);

}
</code></pre>
<p>لأن <code>action</code> الخاص بالنموذج هو Server Action حقيقي، يظل النموذج قابلًا للإرسال حتى قبل ترطيب هذا المكوّن. ويوفر التحسين التدريجي خط أساس بلا ترطيب، بينما تتيح لك خطافات React 19 الارتقاء إلى تجربة تفاعلية غنية لاحقًا.</p>
<h2 id="مكونات-react-الخادمية-مخرج-آخر-للترطيب">مكوّنات React الخادمية: مخرج آخر للترطيب</h2>
<p>الشكل الأكثر عدوانية لـ«لا ترطّب هذا» هو «لا ترسل JavaScript الخاص به إطلاقًا». يُعرض مكوّن React الخادمي (server component) بالكامل على الخادم، ولا ينتج حزمة عميل، ولا يوجد ما يحتاج إلى ترطيب. تكلفة ترطيب RSC تساوي الصفر تمامًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/page.tsx  -- Server Component by default</span>

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ClientCounter</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ClientCounter&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Home</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> db.<span class="hljs-property">posts</span>.<span class="hljs-title function_">findMany</span>();\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Latest posts<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

{posts.map((p) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{p.id}</span>&gt;</span>{p.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)} {/* no client JS */}

<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ClientCounter</span> /&gt;</span> {/* the only thing that hydrates */}

<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>

);

}
</code></pre>
<p>هذا هو التصور الذي ظل فريق React يدعو إليه: بدلًا من تحسين طريقة عمل الترطيب، ألغِه للأجزاء التي لا تحتاج إليه من الصفحة. اجمع بين RSC للأجزاء الساكنة والمعتمدة على البيانات وجزر <code>'use client'</code> للجزاء التفاعلية فعلًا، فتقلل الترطيب إلى جزء ضئيل جدًا من الصفحة.</p>
<h2 id="ما-الذي-ينبغي-قياسه">ما الذي ينبغي قياسه</h2>
<p>يكون الترطيب التدريجي غير مرئي إذا لم تقس الأشياء الصحيحة. تابع:</p>
<ul>
<li><strong>INP (Interaction to Next Paint)</strong> — المقياس الأهم. أي قيمة تقل عن 200 مللي ثانية جيدة، وما يزيد على 500 مللي ثانية سيئة.</li>
<li><strong>Total Blocking Time (TBT)</strong> في اختبارات المختبر، مثل Lighthouse وWebPageTest. ويظهر TBT المرتفع أثناء الترطيب هنا.</li>
<li><strong>Long Animation Frames (LoAF)</strong> — واجهة أحدث تكشف مهام JavaScript محددة التي تحجب الخيط الرئيسي.</li>
<li><strong>عدد بايتات JS لكل مسار</strong> — تابع حجم حزمة كل مسار في CI كي لا تتسلل حالات الانحدار.</li>
</ul>
<h2 id="شجرة-القرار">شجرة القرار</h2>
<p>لكل مكوّن في صفحة معروضة في الخادم:</p>
<ul>
<li>هل يحتاج إلى التفاعل أصلًا؟ إن لم يكن كذلك، اجعله مكوّنًا خادميًا أو HTML خالصًا.</li>
<li>هل هو أعلى الطية ومفيد فورًا؟ ارطّبه في الحزمة الرئيسية.</li>
<li>هل هو أسفل الطية，但从 المحتمل أن يُستخدم لاحقًا؟ استخدم <code>next/dynamic</code> أو الترطيب المعتمد على الظهور.</li>
<li>هل يشغله إجراء صريح من المستخدم، مثل نافذة منبثقة أو قائمة منسدلة؟ استخدم الترطيب المعتمد على التفاعل.</li>
<li>هل يتوقف تشغيله على مجال الرؤية أو الشبكة أو وسائط أخرى؟ استخدم توجيهات العميل الشرطية.</li>
</ul>
<p>طبق ذلك على كل منطقة في صفحتك، فتتقلص التكلفة الكلية للوصول إلى قابلية التفاعل بصورة هائلة. والترطيب التدريجي ليس ميزة مفردة بقدر ما هو موقف تصميمي: افترض أن الترطيب مكلف، وتعامل مع لحظة ترطيب كل مكوّن على أنها قرار لا وضع افتراضي.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
