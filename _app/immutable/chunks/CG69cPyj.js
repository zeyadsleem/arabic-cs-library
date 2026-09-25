const s="patterns-dev",a="vanilla",n="أنماط JavaScript",t="import-on-interaction",l="الاستيراد عند التفاعل (Import On Interaction)",p=[{depth:2,id:"تحميل-واجهة-الطرف-الثالث-المزيفة-باستخدام-facade",text:"تحميل واجهة الطرف الثالث «المزيّفة» باستخدام facade"},{depth:2,id:"تضمينات-مشغل-الفيديو",text:"تضمينات مشغل الفيديو"},{depth:2,id:"المصادقة-authentication",text:"المصادقة (Authentication)"},{depth:2,id:"عناصر-الدردشة-chat-widgets",text:"عناصر الدردشة (Chat widgets)"},{depth:2,id:"أخرى",text:"أخرى"},{depth:2,id:"كيف-نستورد-عند-التفاعل",text:"كيف نستورد عند التفاعل؟"},{depth:3,id:"javascript-خام",text:"JavaScript خام"},{depth:2,id:"react",text:"React"},{depth:2,id:"vue",text:"Vue"},{depth:2,id:"الاستيراد-عند-التفاعل-مع-شيفرة-الطرف-الأول-كجزء-من-التحميل-التدرجي",text:"الاستيراد عند التفاعل مع شيفرة الطرف الأول كجزء من التحميل التدرّجي"},{depth:3,id:"ينزل-أولا-الحد-الأدنى-فقط-من-الشيفرة-وبعد-ذلك-يحدد-تفاعل-المستخدم-توقيت-إرسال-بقية-الشيفرة",text:"يُنزَّل أولًا الحد الأدنى فقط من الشيفرة، وبعد ذلك يحدد تفاعل المستخدم توقيت إرسال بقية الشيفرة."},{depth:3,id:"كيف-نتجنب-فقدان-النقرات-المبكرة",text:"كيف نتجنب فقدان النقرات المبكرة؟"},{depth:3,id:"ماذا-عن-البيانات",text:"ماذا عن البيانات؟"},{depth:2,id:"المقايضات",text:"المقايضات"},{depth:2,id:"استبدال-التضمينات-التفاعلية-بنسخة-ساكنة",text:"استبدال التضمينات التفاعلية بنسخة ساكنة"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],e=`<blockquote>
<p>tl;dr: حمّل الموارد غير الحرجة كسولًا (lazy loading) عندما يتفاعل المستخدم مع واجهة المستخدم التي تتطلبها</p>
</blockquote>
<p>قد تحتوي صفحتك على شيفرة أو بيانات لمركبة أو مورد ليس ضروريًا فورًا. على سبيل المثال، قد يكون جزء من واجهة المستخدم لا يراه المستخدم إلا إذا نقر أو مرّر على أجزاء من الصفحة. ينطبق هذا على أنواع كثيرة من شيفرة الطرف الأول (first-party) التي تكتبها، وينطبق أيضًا على عناصر الطرف الثالث (third-party) مثل مشغلات الفيديو أو أدوات الدردشة، حيث تحتاج عادة إلى النقر على زر لعرض الواجهة الرئيسية.</p>
<p>قد يؤدي تحميل هذه الموارد بشكل عاجل (أي فورًا) إلى <a href="https://web.dev/long-tasks-devtools/">حجب الخيط الرئيسي</a> إذا كانت مكلفة، مما يؤخر الوقت الذي يصبح فيه المستخدم قادرًا على التفاعل مع أجزاء أكثر أهمية في الصفحة. وقد يؤثر ذلك في مقاييس جاهزية التفاعل (performance metrics) مثل <a href="https://web.dev/fid/">تأخير أول إدخال (First Input Delay)</a> و<a href="https://web.dev/lighthouse-total-blocking-time/">إجمالي وقت الحجب (Total Blocking Time)</a> و<a href="https://web.dev/interactive/">الزمن حتى التفاعل (Time to Interactive)</a>. بدلاً من تحميل هذه الموارد فورًا، يمكنك تحميلها في لحظة أكثر ملاءمة، مثل:</p>
<ul>
<li>عندما ينقر المستخدم للتفاعل مع هذا المكوّن للمرة الأولى</li>
<li>عندما يمرر المستخدم المكوّن إلى داخل إطار العرض</li>
<li>أو تأجيل تحميل المكوّن حتى يصبح المتصفح خاملًا (عبر <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback">requestIdleCallback</a>).</li>
</ul>
<p>على مستوى عالٍ، طرق تحميل الموارد هي:</p>
<ul>
<li>عاجل (Eager) - حمّل المورد فورًا (الطريقة المعتادة لتحميل النصوص البرمجية)</li>
<li>كسول (<a href="https://web.dev/code-splitting-with-dynamic-imports-in-nextjs/#route-based-and-component-based-code-splitting">التقسيم حسب المسار</a>) - حمّل عندما ينتقل المستخدم إلى مسار أو مكوّن</li>
<li>كسول (عند التفاعل) - حمّل عندما ينقر المستخدم على واجهة المستخدم (مثل Show Chat)</li>
<li>كسول (في إطار العرض) - حمّل عندما يمرر المستخدم باتجاه المكوّن</li>
<li><a href="https://web.dev/link-prefetch/">الجلب المسبق (prefetch)</a> - حمّل قبل الحاجة، لكن بعد تحميل الموارد الحرجة</li>
<li><a href="https://web.dev/preload-critical-assets/">التحميل المسبق (preload)</a> - حمّل بشكل عاجل، بمستوى من الأولوية أعلى</li>
</ul>
<blockquote>
<p>ينبغي ألا يُستخدم الاستيراد عند التفاعل مع شيفرة الطرف الأول إلا إذا تعذّر عليك جلب الموارد قبل التفاعل. ومع ذلك، يظل النمط ذا صلة كبيرة مع شيفرة الطرف الثالث، حيث تريد عادةً تأجيلها إذا لم تكن حرجة إلى وقت لاحق. ويمكن تحقيق ذلك بطرق كثيرة، مثل التأجيل حتى التفاعل، أو حتى يصبح المتصفح خاملًا، أو باستخدام استدلالات أخرى.</p>
</blockquote>
<p>الاستيراد الكسول لشيفرة الميزات عند التفاعل نمط مستخدم في سياقات كثيرة سنغطيها في هذه المقالة. أحد الأماكن التي ربما استخدمته فيها من قبل هو Google Docs، حيث أجّلوا تحميل 500KB من السكربت الخاصة بميزة المشاركة حتى يتفاعل المستخدم.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-0-image1_ohziu6_c_scale_w_1280.webp" alt="الضغط على زر المشاركة في Google Docs يُنزّل شيفرة تقدر حجمها بـ500 كيلوبايت، فيُفضَّل تحميلها عند الطلب لا مع بقية المستند"></p>
<p>مكان آخر يمكن أن يناسبه الاستيراد عند التفاعل جيدًا هو تحميل عناصر الطرف الثالث.</p>
<h2 id="تحميل-واجهة-الطرف-الثالث-المزيفة-باستخدام-facade">تحميل واجهة الطرف الثالث «المزيّفة» باستخدام facade</h2>
<p>قد تستورد سكربتًا من طرف ثالث وتكون لديك تحكم أقل في ما تعرضه أو في وقت تحميله للشيفرة. أحد خيارات تنفيذ التحميل عند التفاعل مباشرًا هو استخدام <a href="https://github.com/patrickhulce/third-party-web/blob/10ec0f8f30bbbb73e2de5640cb652a07dd4d7d11/facades.md">facade</a>. الـfacade هو «معاينة» أو «عنصر نائب» بسيط لمكوّن أكثر كلفة، حيث تحاكي التجربة الأساسية، مثل صورة أو لقطة شاشة. هذا هو المصطلح الذي كنا نستخدمه لهذه الفكرة في فريق Lighthouse.</p>
<p>عندما ينقر المستخدم على «المعاينة» (الـfacade)، يتم تحميل شيفرة المورد. يحد ذلك من دفع المستخدمين لتكلفة تجربة ميزة لن يستخدموها. وبالمثل، يمكن للـfacades استخدام <a href="https://web.dev/uses-rel-preconnect/">preconnect</a> للموارد الضرورية عند التحويم.</p>
<blockquote>
<p>تضاف موارد الأطراف الخارجية غالبًا إلى الصفحات دون مراعاة كاملة لكيفية اندماجها في التحميل العام للموقع. يمكن للسكربتات المحمّلة بشكل متزامن من الطرف الثالث أن تحجب محلّل المتصفح وتؤخر الترطيب (hydration). إذا أمكن، ينبغي تحميل سكربتات 3P باستخدام <code>async</code> أو <code>defer</code> (أو نهج أخرى) لضمان عدم حرمان سكربتات 1P من نطاق الشبكة. ما لم تكن حرجة، يمكن أن تكون مرشحة جيدة للتحويل إلى تحميل متأخر مؤجل باستخدام أنماط مثل الاستيراد عند التفاعل.</p>
</blockquote>
<h2 id="تضمينات-مشغل-الفيديو">تضمينات مشغل الفيديو</h2>
<p>مثال جيد على «facade» هو <a href="https://github.com/paulirish/lite-youtube-embed">YouTube Lite Embed</a> من Paul Irish. يوفر هذا Custom Element الذي يأخذ معرّف فيديو YouTube ويعرض صورة مصغرة وزر تشغيل بسيطين. يؤدي النقر على العنصر إلى تحميل ديناميكي لشيفرة تضمين YouTube الكاملة، ما يعني أن المستخدمين الذين لا ينقرون على التشغيل لن يدفعوا تكلفة جلبها ومعالجتها.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-1-image2_egy8ct_c_scale_w_1280.webp" alt="مكوّن lite-youtube لا يُحمّل سوى 3 كيلوبايت عند فتح الصفحة، ويُحمّل حزمة YouTube الكاملة عند التفاعل"></p>
<p>تُستخدم تقنية مشابهة في الإنتاج على بعض مواقع Google. في Android.com، بدلاً من تحميل مشغل فيديو YouTube المضمّن بشكل عاجل، تُعرض للمستخدم صورة مصغرة مع زر مشغل مزيّف. وعندما ينقرون عليه، تُحمّل نافذة منبثقة تشغّل الفيديو تلقائيًا باستخدام تضمين مشغل YouTube الكامل:</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-2-image3_zykzg7_c_scale_w_1280.webp" alt="موقع Android.com يُحمّل شيفرة الفيديوهات عند ضغط المستخدم على صورة الفيديو المصغّرة"></p>
<h2 id="المصادقة-authentication">المصادقة (Authentication)</h2>
<p>قد تحتاج التطبيقات إلى دعم المصادقة مع خدمة عبر JavaScript SDK من جانب العميل. وقد تكون هذه المكتبات كبيرة أحيانًا ذات تكاليف تنفيذ JavaScript ثقيلة، وقد لا ترغب في تحميلها مسبقًا إذا لم يكن المستخدم سوف يسجل الدخول. بدلاً من ذلك، استورد مكتبات المصادقة ديناميكيًا عندما ينقر المستخدم على زر «تسجيل الدخول»، مع إبقاء الخيط الرئيسي أكثر توفرًا أثناء التحميل الأولي.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-3-image4_qeskzi_c_scale_w_1280.webp" alt="نسخة من زر تسجيل الدخول في Google بـHTML وCSS فقط، تُحمّل حزمة SDK الكاملة عند التفاعل"></p>
<h2 id="عناصر-الدردشة-chat-widgets">عناصر الدردشة (Chat widgets)</h2>
<p>حسّن تطبيق Calibre <a href="https://calibreapp.com/blog/fast-live-chat">أداء الدردشة الحية المستندة إلى Intercom بنسبة 30%</a> عبر استخدام نهج facade مشابه. نفذوا زر دردشة حية «مزيّفًا» سريع التحميل باستخدام CSS وHTML فقط، وكان النقر عليه يحمّل حزم Intercom الخاصة بهم.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-4-image5_x7d5a9_c_scale_w_1280.webp" alt="محاكاة لزر محادثة Intercom الذي يُحمّل أداة المحادثة الكاملة عند التفاعل"></p>
<p>أشار <a href="https://wildbit.com/blog/2020/09/30/getting-postmark-lighthouse-performance-score-to-100">Postmark</a> إلى أن عنصر الدردشة الخاص بالمساعدة كان يُحمّل دائمًا بشكل عاجل، رغم أن العملاء استخدموه أحيانًا فقط. كان العنصر يجلب 314KB من السكربت، أكثر من حجم صفحتهم الرئيسية بالكامل. لتحسين تجربة المستخدم، استبدلوه بنسخة مزيّفة باستخدام HTML وCSS، وحمّلوا النسخة الحقيقية عند النقر. خفّض هذا التغيير الزمن حتى التفاعل من 7.7 ثانية إلى 3.7 ثانية.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-5-image6_wtsthu_c_scale_w_1280.webp" alt="تقريب بـHTML وCSS لأداة مساعدة العملاء"></p>
<h2 id="أخرى">أخرى</h2>
<p>استخدم <a href="https://medium.com/ne-digital/how-to-reduce-next-js-bundle-size-68f7ac70c375">Ne-digital</a> مكتبة React للتمرير المتحرك إلى أعلى الصفحة عندما ينقر المستخدم على زر «التمرير إلى الأعلى». بدلاً من تحميل تبعية <code>react-scroll</code> بشكل عاجل، حمّلوها عند التفاعل مع الزر، مما يوفر نحو 7KB:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">handleScrollToTop</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;react-scroll&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">scroll</span> =&gt;</span> {

scroll.<span class="hljs-property">animateScroll</span>.<span class="hljs-title function_">scrollToTop</span>({

})

})

}
</code></pre>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-6-animation.webp" alt="تحميل الموارد عند التفاعل، مع أدوات المطوّر تُظهر جلب المورد"></p>
<h2 id="كيف-نستورد-عند-التفاعل">كيف نستورد عند التفاعل؟</h2>
<h3 id="javascript-خام">JavaScript خام</h3>
<p>في JavaScript، يتيح <a href="https://v8.dev/features/dynamic-import">الاستيراد الديناميكي <code>import()</code></a> التحميل الكسول للوحدات ويعيد Promise، ويمكن أن يكون قويًا جدًا عند تطبيقه بشكل صحيح. فيما يلي مثال على استخدام الاستيراد الديناميكي في مستمع حدث زر لاستيراد وحدة <code>lodash.sortby</code> ثم استخدامها.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> btn = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;button&quot;</span>);

btn.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {

e.<span class="hljs-title function_">preventDefault</span>();

<span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;lodash.sortby&quot;</span>)

.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-variable language_">module</span></span>) =&gt;</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">default</span>)

.<span class="hljs-title function_">then</span>(<span class="hljs-title function_">sortInput</span>()) <span class="hljs-comment">// use the imported dependency</span>

.<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(err);

});

});
</code></pre>
<p>قبل الاستيراد الديناميكي، أو في حالات الاستخدام التي لا يناسبها جيدًا، كان خيار آخر حقن السكربتات ديناميكيًا في الصفحة باستخدام محمّل سكربتات قائم على Promise (انظر <a href="https://glitch.com/edit/#!/tree-fluffy-stop?path=script.js%3A1%3A0">هنا التطبيق الكامل</a> الذي يوضح facade لتسجيل الدخول):</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> loginBtn = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#login&quot;</span>);

loginBtn.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">const</span> loader = <span class="hljs-keyword">new</span> <span class="hljs-title function_">scriptLoader</span>();

loader

.<span class="hljs-title function_">load</span>([<span class="hljs-string">&quot;//apis.google.com/js/client:platform.js?onload=showLoginScreen&quot;</span>])

.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{ length }</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${length}</span> scripts loaded!\`</span>);

});

});
</code></pre>
<h2 id="react">React</h2>
<p>لنتخيل لدينا تطبيق دردشة يحتوي على <code> و</code> و\`\` مكوّنًا (مدعومًا بـ <a href="https://bundlephobia.com/result?p=emoji-mart@3.0.0">emoji-mart</a>، وهو 98KB بعد التصغير وضغط gzip). من الشائع تحميل جميع هذه المكوّنات بشكل عاجل عند التحميل الأولي للصفحة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageList</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./MessageList&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageInput</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./MessageInput&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">EmojiPicker</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./EmojiPicker&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Channel</span> = (<span class="hljs-params"></span>) =&gt; {

...

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageList</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageInput</span> /&gt;</span>

{emojiPickerOpen &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">EmojiPicker</span> /&gt;</span>}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

};
</code></pre>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-7-image8_pft4f0_c_scale_w_1280.webp" alt="مكوّنات مختلفة تُحمَّل كلٌّ منها على حدة"></p>
<p>تقسيم تحميل هذا العمل نسبيًا مباشر باستخدام <a href="https://web.dev/reduce-javascript-payloads-with-code-splitting/">تقسيم الشيفرة (code splitting)</a>. تجعل طريقة <code>React.lazy</code> من السهل تقسيم شيفرة تطبيق React على مستوى المكوّن باستخدام الاستيرادات الديناميكية. توفر دالة <code>React.lazy</code> طريقة مدمجة لفصل المكوّنات في التطبيق إلى أجزاء JavaScript منفصلة بجهد ضئيل جدًا. ثم يمكنك معالجة حالات التحميل عندما تقترن بمكوّن Suspense.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { lazy, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageList</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./MessageList&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageInput</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./MessageInput&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-title function_">lazy</span>(

<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./EmojiPicker&#x27;</span>)

);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Channel</span> = (<span class="hljs-params"></span>) =&gt; {

...

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageList</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageInput</span> /&gt;</span>

{emojiPickerOpen &amp;&amp; (

<span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">EmojiPicker</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

)}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

};
</code></pre>
<p>يمكننا توسيع هذه الفكرة لاستيراد شيفرة مكوّن Emoji Picker فقط عندما ينقر المستخدم على أيقونة Emoji في \`\`، بدلاً من استيرادها بشكل عاجل عندما يحمّل التطبيق أولًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useState, createElement } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageList</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./MessageList&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">MessageInput</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./MessageInput&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ErrorBoundary</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ErrorBoundary&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Channel</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">const</span> [emojiPickerEl, setEmojiPickerEl] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">openEmojiPicker</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;emoji-picker&quot; */</span> <span class="hljs-string">&quot;./EmojiPicker&quot;</span>)

.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-variable language_">module</span></span>) =&gt;</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">default</span>)

.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">emojiPicker</span>) =&gt;</span> {

<span class="hljs-title function_">setEmojiPickerEl</span>(<span class="hljs-title function_">createElement</span>(emojiPicker));

});

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">closeEmojiPickerHandler</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-title function_">setEmojiPickerEl</span>(<span class="hljs-literal">null</span>);

};

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageList</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">MessageInput</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{openEmojiPicker}</span> /&gt;</span>

{emojiPickerEl}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>

);

};
</code></pre>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-8-image9_h0g6sw_c_scale_w_1280.webp" alt="تحميل مكوّن الإيموجي كسولاً عند التفاعل"></p>
<h2 id="vue">Vue</h2>
<p>في Vue.js، يمكن تحقيق نمط الاستيراد عند التفاعل المماثل بعدة طرق مختلفة. إحدى الطرق هي استيراد مكوّن Vue <code>Emojipicker</code> ديناميكيًا باستخدام استيراد ديناميكي ملفوف في دالة، أي <code>() =&gt; import(&quot;./Emojipicker&quot;)</code>. وبهذه الطريقة، يقوم Vue.js عادةً بتحميل المكوّن كسولًا عندما يحتاج إلى عرضه.</p>
<p>يمكننا بعد ذلك جعل التحميل الكسول مشروطًا بتفاعل المستخدم. باستخدام <code>v-if</code> شرطي على <code>div</code> الأصل للـpicker، الذي يتم تبديله بالنقر على زر، يمكننا جلب مكوّن <code>Emojipicker</code> وعرضه بشكل شرطي عندما ينقر المستخدم.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;show = true&quot;</span>&gt;</span>Load Emoji Picker<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;show&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">emojipicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">emojipicker</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">data</span>: <span class="hljs-function">() =&gt;</span> ({ <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span> }),

<span class="hljs-attr">components</span>: {

<span class="hljs-title class_">Emojipicker</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./Emojipicker&quot;</span>),

},

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>ينبغي أن يكون نمط الاستيراد عند التفاعل ممكنًا مع معظم الأطر والمكتبات التي تدعم التحميل الديناميكي للمكوّنات، بما في ذلك <a href="https://johnpapa.net/angular-9-lazy-loading-components/">Angular</a>.</p>
<h2 id="الاستيراد-عند-التفاعل-مع-شيفرة-الطرف-الأول-كجزء-من-التحميل-التدرجي">الاستيراد عند التفاعل مع شيفرة الطرف الأول كجزء من التحميل التدرّجي</h2>
<p>التحميل عند التفاعل جزء رئيسي أيضًا من طريقة Google في التعامل مع التحميل التدرّجي في تطبيقات كبيرة مثل Flights وPhotos. لتوضيح ذلك، لننظر إلى مثال سابق قدّمه Shubhie Panicker.</p>
<p>تخيل أن مستخدمًا يخطط لرحلة إلى Mumbai في الهند ويزور Google Hotels للاطلاع على الأسعار. يمكن تحميل جميع الموارد اللازمة لهذا التفاعل بشكل عاجل مسبقًا، لكن إذا لم يكن المستخدم قد اختار أي وجهة، فستكون HTML/CSS/JS اللازمة للخريطة غير ضرورية.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-9-image10_ofj3bz_c_scale_w_1280.webp" alt="موقع Google Hotels على الويب المحمول"></p>
<p>في أبسط سيناريو للتحميل، تخيل أن Google Hotels يستخدم <a href="https://developers.google.com/web/updates/2019/02/rendering-on-the-web#csr">العرض من جانب العميل</a> الساذج (CSR). ستُنزَّل كل الشيفرة وتُعالَج مسبقًا: HTML، ثم JS وCSS، ثم جلب البيانات، من أجل العرض فقط بعد توفر كل شيء. لكن هذا يترك المستخدم ينتظر طويلًا دون أي شيء معروض على الشاشة. وقد تكون نسبة كبيرة من JavaScript وCSS غير ضرورية.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-10-image11.webp" alt="عرض أساسي في جانب العميل"></p>
<p>بعد ذلك، تخيل أن هذه التجربة نُقلت إلى <a href="https://developers.google.com/web/updates/2019/02/rendering-on-the-web#server-vs-static">العرض من جانب الخادم</a> (SSR). سنتيح للمستخدم الحصول على صفحة مكتملة بصريًا في وقت أبكر، وهذا رائع، لكنها لن تكون تفاعلية حتى تُجلب البيانات من الخادم ويكمل إطار العمل في العميل عملية الترطيب.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-11-image12.webp" alt="عرض أساسي في جانب الخادم"></p>
<p>يمكن أن يكون SSR تحسينًا، لكن قد يمر المستخدم بتجربة «الوادي الغريب» حيث تبدو الصفحة جاهزة، لكنه لا يستطيع النقر على أي شيء. ويشار إلى ذلك أحيانًا بالنقرات الغاضبة، إذ يميل المستخدمون إلى النقر مرارًا وتكرارًا من الإحباط.</p>
<p>عد إلى مثال البحث في Google Hotels، وإذا تكبيرنا واجهة المستخدم قليلًا، يمكننا أن نرى أن شيفرة المكوّن «المزيد من عوامل التصفية» تُنزَّل عندما ينقر المستخدم على «المزيد من عوامل التصفية» للعثور على الفندق المناسب تمامًا.</p>
<h3 id="ينزل-أولا-الحد-الأدنى-فقط-من-الشيفرة-وبعد-ذلك-يحدد-تفاعل-المستخدم-توقيت-إرسال-بقية-الشيفرة">يُنزَّل أولًا الحد الأدنى فقط من الشيفرة، وبعد ذلك يحدد تفاعل المستخدم توقيت إرسال بقية الشيفرة.</h3>
<p>لنقرب من هذا سيناريو التحميل.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-12-image13.webp" alt="التفاعل مع المرشّحات يجلب 30 كيلوبايت من الشيفرة والبيانات عند الطلب"></p>
<p>هناك عدد من الجوانب المهمة للتحميل المتأخر الذي يقوده التفاعل:</p>
<ul>
<li>أولًا، ننزّل الحد الأدنى من الشيفرة في البداية حتى تكتمل الصفحة بصريًا بسرعة.</li>
<li>بعد ذلك، عندما يبدأ المستخدم في التفاعل مع الصفحة، نستخدم تلك التفاعلات لتحديد الشيفرة الأخرى التي يجب تحميلها؛ على سبيل المثال، تحميل شيفرة مكوّن «المزيد من عوامل التصفية».</li>
<li>وهذا يعني أن شيفرة كثير من ميزات الصفحة لا تُرسَل إلى المتصفح أبدًا، لأن المستخدم لم بحاجة إلى استخدامها.</li>
</ul>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-13-image14.webp" alt="تحميل متأخر يكون مدفوعاً بالتفاعل"></p>
<h3 id="كيف-نتجنب-فقدان-النقرات-المبكرة">كيف نتجنب فقدان النقرات المبكرة؟</h3>
<p>في حزمة الأطر التي تستخدمها فرق Google هذه، يمكننا تتبّع النقرات مبكرًا لأن الجزء الأول من HTML يتضمن مكتبة أحداث صغيرة (<a href="https://github.com/google/jsaction">JSAction</a>) تتتبع كل النقرات قبل أن يتم تشغيل إطار العمل. تُستخدم الأحداث لأمرين:</p>
<ul>
<li>تشغيل تنزيل شيفرة المكوّن بناءً على تفاعلات المستخدم</li>
<li>إعادة تشغيل تفاعلات المستخدم عندما يكتمل تشغيل إطار العمل</li>
</ul>
<p>تشمل الاستدلالات المحتملة الأخرى التي يمكن استخدامها تحميل شيفرة المكوّن:</p>
<ul>
<li>بعد فترة من الخمول</li>
<li>عندما يمرر مستخدم الفأرة فوق واجهة المستخدم أو الزر أو دعوة الإجراء ذات الصلة</li>
<li>استنادًا إلى مقياس متدرج للجهد يعتمد على إشارات المتصفح (مثل سرعة الشبكة ووضع Data Saver وغيرها).</li>
</ul>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-14-image15.webp" alt="مكتبة أحداث صغيرة مضمّنة في HTML الأولي"></p>
<h3 id="ماذا-عن-البيانات">ماذا عن البيانات؟</h3>
<p>تتضمن البيانات الأولية المستخدمة لعرض الصفحة في HTML الخاص بالاستجابة الأولية من الخادم، ويتم بثها. أما البيانات التي يتم تحميلها متأخرًا فتُنزَّل بناءً على تفاعلات المستخدم لأننا نعرف المكوّن الذي تنتمي إليه.</p>
<p>يكمل هذا صورة الاستيراد عند التفاعل، مع عمل جلب البيانات بطريقة مشابهة لطريقة عمل CSS وJS. وبما أن المكوّن على علم بما يحتاجه من شيفرة وبيانات، لا يبعد أي من موارده أكثر من طلب واحد.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-15-image16.webp" alt="كيف يتم جلب البيانات؟ لكل مكوّن على حدة"></p>
<p>يعمل هذا لأننا ننشئ رسمًا بيانيًا للمكوّنات وتبعياتها أثناء وقت البناء. يستطيع تطبيق الويب الرجوع إلى هذا الرسم البياني في أي وقت وجلب الموارد (الشيفرة والبيانات) المطلوبة لأي مكوّن بسرعة. كما يعني أننا نقسم الشيفرة حسب المكوّن بدلاً من المسار.</p>
<p>للاطلاع على شرح تفصيلي للمثال أعلاه، راجع <a href="https://www.youtube.com/watch?v=-xZHWK-vHbQ">الارتقاء بمنصة الويب مع مجتمع JavaScript</a>.</p>
<h2 id="المقايضات">المقايضات</h2>
<p>يمكن أن يؤدي نقل العمل المكلف إلى ما يقترب من تفاعل المستخدم إلى تحسين سرعة التحميل الأولي للصفحات، لكن هذه التقنية ليست خالية من المقايضات.</p>
<p><strong>ماذا يحدث إذا استغرق تحميل سكربت طويلًا بعد نقر المستخدم؟</strong></p>
<p>في مثال Google Hotels، تقلل الأجزاء الصغيرة الدقيقة احتمال أن ينتظر المستخدم طويلًا حتى تُجلب الشيفرة والبيانات وتُنفَّذ. وفي بعض الحالات الأخرى، قد يؤدي تبعية كبيرة إلى هذا القلق على الشبكات البطيئة.</p>
<p>إحدى طرق تقليل احتمال حدوث ذلك هي تقسيم تحميل هذه الموارد بشكل أفضل، أو جلبها مسبقًا بعد انتهاء تحميل المحتوى الحرج في الصفحة. وأشجعك على قياس تأثير ذلك لتحديد مدى كونه مشكلة حقيقية في تطبيقاتك.</p>
<p><strong>ماذا عن نقص الوظائف قبل تفاعل المستخدم؟</strong></p>
<p>من المقايضات الأخرى للـfacades نقص الوظائف قبل تفاعل المستخدم. على سبيل المثال، لن يستطيع مشغل فيديو مضمّن تشغيل الوسائط تلقائيًا. إذا كانت هذه الوظيفة أساسية، فيمكنك التفكير في نهج بديلة لتحميل الموارد، مثل التحميل الكسول لإطارات <code>iframes</code> من الطرف الثالث عندما يمررها المستخدم إلى إطار العرض بدلًا من تأجيل التحميل حتى التفاعل.</p>
<h2 id="استبدال-التضمينات-التفاعلية-بنسخة-ساكنة">استبدال التضمينات التفاعلية بنسخة ساكنة</h2>
<p>ناقشنا نمط الاستيراد عند التفاعل والتحميل التدرّجي، لكن ماذا عن جعل التضمينات ساكنة بالكامل في حالة الاستخدام هذه؟</p>
<p>قد يكون المحتوى النهائي المعروض من التضمين مطلوبًا فورًا في بعض الحالات، مثل منشور على وسائل التواصل ظاهر في إطار العرض الأولي. وقد يجلب هذا تحديات خاصة به عندما يجلب التضمين 2–3MB من JavaScript. ولأن محتوى التضمين مطلوب فورًا، قد يكون التحميل الكسول والـfacades أقل ملاءمة.</p>
<p>إذا كنت تحسّن الأداء، من الممكن استبدال التضمين بالكامل بنسخة ساكنة تبدو مشابهة، مع رابط إلى نسخة أكثر تفاعلية (مثل منشور وسائل التواصل الأصلي). في وقت البناء، يمكن جلب بيانات التضمين وتحويلها إلى نسخة HTML ساكنة.</p>
<p><img src="/images/patterns-dev/vanilla-import-on-interaction-16-janesocial.webp" alt="مقارنة بين تضمين JavaScript ثقيل وبديل مُعرض ساكناً"></p>
<p>هذا هو النهج الذي استخدمه <a href="https://twitter.com/@wongmjane">@wongmjane</a> في <a href="https://twitter.com/wongmjane/status/1330676158724116481">هذه المقالة</a> و<a href="https://twitter.com/wongmjane/status/1330273157245243394">هذه المدونة</a> لنوع واحد من تضمينات وسائل التواصل، مما حسّن أداء تحميل الصفحة وأزال <a href="https://web.dev/cls">التحول التراكمي في التخطيط (Cumulative Layout Shift)</a> الذي سببه شيفرة التضمين وهي تحسّن نص البديل وتسبب تحولات في التخطيط.</p>
<p>على الرغم من أن الاستبدالات الساكنة قد تكون مفيدة للأداء، إلا أنها غالبًا تتطلب عملًا مخصصًا، لذا ضع ذلك في اعتبارك عند تقييم خياراتك.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>غالبًا ما يؤثر JavaScript من الطرف الأول في جاهزية التفاعل للصفحات الحديثة على الويب، لكن يمكن غالبًا تأخيره على الشبكة خلف شيفرة غير حرجة من مصادر الطرف الأول أو الثالث تشغل الخيط الرئيسي.</p>
<p>بشكل عام، تجنب سكربتات الطرف الثالث المتزامنة في رأس المستند، وهدف إلى تحميل سكربتات الطرف الثالث غير الحاجبة بعد انتهاء تحميل شيفرة الطرف الأول. توفر أنماط مثل الاستيراد عند التفاعل طريقة لتأجيل تحميل الموارد غير الحرجة إلى لحظة يكون فيها المستخدم أكثر احتمالًا للحاجة إلى الواجهة التي توفّرها.</p>
<p><em>مع شكر خاص لـ Shubhie Panicker وConnor Clark وPatrick Hulce وAnton Karlovskiy وAdam Raine على مداخلاتهم.</em></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
