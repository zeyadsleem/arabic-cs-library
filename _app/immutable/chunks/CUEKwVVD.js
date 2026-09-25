const s="patterns-dev",a="react",n="أنماط React وNext.js",t="hoc-pattern",l="نمط المكوّن من رتبة عليا (HOC)",p=[{depth:2,id:"مشهد-يحفز-الحاجة-إلى-هذا-النمط",text:"مشهد يحفّز الحاجة إلى هذا النمط"},{depth:2,id:"بناء-أول-hoc-الخاص-بك",text:"بناء أول HOC الخاص بك"},{depth:2,id:"إضافة-السلوك-لا-مجرد-الآثار-الجانبية",text:"إضافة السلوك، لا مجرد الآثار الجانبية"},{depth:2,id:"تركيب-hocs",text:"تركيب HOCs"},{depth:2,id:"الفخاخ-في-الإنتاج",text:"الفخاخ في الإنتاج"},{depth:3,id:"تعارضات-أسماء-الخصائص",text:"تعارضات أسماء الخصائص"},{depth:3,id:"الدوال-الساكنة-والمراجع-لا-تمر-عبر-الغلاف",text:"الدوال الساكنة والمراجع لا تمر عبر الغلاف"},{depth:3,id:"جحيم-الغلافات",text:"جحيم الغلّافات"},{depth:3,id:"hocs-ومصرف-react",text:"HOCs ومصرّف React"},{depth:2,id:"متى-لا-تستخدم-hoc",text:"متى لا تستخدم HOC"},{depth:2,id:"البديل-الحديث-الخطافات-المخصصة",text:"البديل الحديث: الخطافات المخصصة"},{depth:2,id:"دراسة-حالة-واقعية-react-redux",text:"دراسة حالة واقعية: React Redux"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],e=`<h2 id="مشهد-يحفز-الحاجة-إلى-هذا-النمط">مشهد يحفّز الحاجة إلى هذا النمط</h2>
<p>لديك قاعدة شيفرة React واسعة النطاق. تحتاج كل شاشة إلى إطلاق حدث تحليلي عند التركيب (mount)، لكن فقط عندما يكون المستخدم الحالي قد وافق على التتبّع. رشّ هذا المنطق في كل مكوّن صفحة سيكون مكررًا وسهل النسيان وكارثةً حين تتحدّث حزمة التحليلات.</p>
<p>نمط المكوّن من رتبة عليا (Higher-Order Component، HOC) هو أحد أقدم الحلول في React لمعالجة هذه المشكلات العابرة للطبقات. المكوّن من رتبة عليا مجرد دالة: يقبل مكوّنًا ويعيد مكوّنًا جديدًا يلفّ المكوّن الأصلي بسلوك إضافي. فكّر فيه كأنّه مزخرف (decorator) للمكوّنات.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// The shape of every HOC</span>

type <span class="hljs-variable constant_">HOC</span>&lt;P&gt; = <span class="hljs-function">(<span class="hljs-params">Wrapped: React.ComponentType&lt;P&gt;</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;;
</code></pre>
<p>لا يحتاج المكوّن الملفوف إلى معرفة أي شيء عن السلوك الذي يضيفه HOC. هذا الفصل هو جوهر الأمر كله: يركّز مكوّن <code>Page</code> على العرض، ويتولى <code>withAnalytics(Page)</code> التتبّع بهدوء.</p>
<blockquote>
<p><strong>تنبيه:</strong> في قاعدة شيفرة جديدة تمامًا، ستستخدم عادةً خطافًا مخصصًا (custom hook) قبل HOC. لا يزال هذا النمط حاضرًا في شيفرة الإنتاج طويلة العمر (<code>withAuth</code> و<code>withTranslation</code> و<code>withRouter</code> و<code>connect</code> من React Redux)، ولذلك يستحق الفهم العميق حتى لو كتبت القليل منه بنفسك. سنغطي البدائل الحديثة في نهاية هذه المقالة.</p>
</blockquote>
<h2 id="بناء-أول-hoc-الخاص-بك">بناء أول HOC الخاص بك</h2>
<p>لننفّذ <code>withAnalytics</code>. ينبغي له أن:</p>
<ul>
<li>يُطلق حدث <code>page_view</code> عند تركيب المكوّن الملفوف للمرة الأولى.</li>
<li>يقبل <code>eventName</code> حتى يمكن إعادة استخدام HOC نفسه لأي شاشة.</li>
<li>يمرّر كل خاصية إلى المكوّن الملفوف دون تغيير.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> { track } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./analytics&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> withAnalytics&lt;P <span class="hljs-keyword">extends</span> object&gt;(

<span class="hljs-title class_">Wrapped</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;,

<span class="hljs-attr">eventName</span>: string,

) {

<span class="hljs-keyword">function</span> <span class="hljs-title function_">WithAnalytics</span>(<span class="hljs-params">props: P</span>) {

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-title function_">track</span>(eventName, { <span class="hljs-attr">path</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">pathname</span> });

}, []);

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;

}

<span class="hljs-comment">// Helpful in React DevTools</span>

<span class="hljs-title class_">WithAnalytics</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`withAnalytics(<span class="hljs-subst">\${

Wrapped.displayName ?? Wrapped.name ?? <span class="hljs-string">&quot;Component&quot;</span>

}</span>)\`</span>;

<span class="hljs-keyword">return</span> <span class="hljs-title class_">WithAnalytics</span>;

}
</code></pre>
<p>الاستخدام عبارة عن سطر واحد عند التصدير:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CheckoutPage</span>(<span class="hljs-params">props: CheckoutPageProps</span>) {

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{/* ...checkout UI... */}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>;

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">withAnalytics</span>(<span class="hljs-title class_">CheckoutPage</span>, <span class="hljs-string">&quot;checkout_viewed&quot;</span>);
</code></pre>
<p>هناك بعض التفاصيل التي يوضحها المثال أعلاه وستنسخها في كل HOC تكتبه تقريبًا:</p>
<ul>
<li><strong>التعميمات (generics) على الخصائص.</strong> يقيّد <code>P extends object</code> أنواع المكوّن الملفوف. يحصل مستهلكو <code>withAnalytics(CheckoutPage, ...)</code> على IntelliSense كامل لـ<code>CheckoutPageProps</code>.</li>
<li><strong><code>displayName</code> لأغراض التصحيح.</strong> من دونه، تعرض React DevTools شجرة مليئة بالغلّافات مجهولة الهوية، وهي مشكلة «ما الذي أنظر إليه؟» تحديدًا التي يفترض أن يتجنبها هذا النمط.</li>
<li><strong>نشر <code>{...props}</code> في النهاية (أو في البداية، عن قصد).</strong> الترتيب الذي تنشر به الخصائص يحدّد أيهما يفوز عند التعارض. نتناول هذه الفخ أكثر من ذلك.</li>
</ul>
<h2 id="إضافة-السلوك-لا-مجرد-الآثار-الجانبية">إضافة السلوك، لا مجرد الآثار الجانبية</h2>
<p>يصبح HOCs أكثر إثارة للاهتمام عندما يحقن خصائص (props) يستطيع المكوّن الملفوف قراءتها. يعد <code>withFeatureFlag</code> مثالًا كلاسيكيًا: يوفّر متغيرين من المكوّن، ويدع HOC يقرّر أيّهما يُعرض استنادًا إلى خدمة رايات بعيدة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useFlag } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./flagsClient&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> withFeatureFlag&lt;P <span class="hljs-keyword">extends</span> object&gt;(

<span class="hljs-attr">flagKey</span>: string,

<span class="hljs-title class_">Treatment</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;,

<span class="hljs-title class_">Control</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;,

) {

<span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">WithFeatureFlag</span>(<span class="hljs-params">props: P</span>) {

<span class="hljs-keyword">const</span> enabled = <span class="hljs-title function_">useFlag</span>(flagKey);

<span class="hljs-keyword">return</span> enabled ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Treatment</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Control</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;

};

}

<span class="hljs-comment">// At the call site:</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">PricingPage</span> = <span class="hljs-title function_">withFeatureFlag</span>(

<span class="hljs-string">&quot;pricing_redesign_2025&quot;</span>,

<span class="hljs-title class_">PricingPageNew</span>,

<span class="hljs-title class_">PricingPageLegacy</span>,

);
</code></pre>
<p>لاحظ أن <code>withFeatureFlag</code> لا يعرض أي شيء بنفسه. فهو محضّر تبديل (switch). هذا مقبول؛ إذ يمكن أن يكون «السلوك الإضافي» في HOC أثرًا جانبيًا، أو خاصية محقونة، أو عرضًا شرطيًا، أو الثلاثة معًا.</p>
<h2 id="تركيب-hocs">تركيب HOCs</h2>
<p>الغرض الكامل من هذا النمط هو أن HOCs مجرد دوال، والدوال قابلة للتركيب. تبدو طبقة إنتاجية شائعة بالشكل الآتي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">withErrorBoundary</span>(

<span class="hljs-title function_">withAuthorization</span>(

<span class="hljs-title function_">withAnalytics</span>(<span class="hljs-title class_">CheckoutPage</span>, <span class="hljs-string">&quot;checkout_viewed&quot;</span>),

{ <span class="hljs-attr">requiredRole</span>: <span class="hljs-string">&quot;customer&quot;</span> },

),

{ <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SomethingWentWrong</span> /&gt;</span></span> },

);
</code></pre>
<p>فور بدء تداخل ثلاثة أو أربعة منها، يصبح موضع الاستدعاء صعب القراءة. وفي ما يلي طريقتان شائعتان لتنظيفه:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// 1. Pipe-style composition with a tiny helper</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">compose</span> =

(<span class="hljs-params">...hocs</span>) =&gt;

<span class="hljs-function">(<span class="hljs-params">Component</span>) =&gt;</span>

hocs.<span class="hljs-title function_">reduceRight</span>(<span class="hljs-function">(<span class="hljs-params">acc, hoc</span>) =&gt;</span> <span class="hljs-title function_">hoc</span>(acc), <span class="hljs-title class_">Component</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">compose</span>(

<span class="hljs-title function_">withErrorBoundary</span>({ <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SomethingWentWrong</span> /&gt;</span></span> }),

<span class="hljs-title function_">withAuthorization</span>({ <span class="hljs-attr">requiredRole</span>: <span class="hljs-string">&quot;customer&quot;</span> }),

<span class="hljs-title function_">withAnalyticsEvent</span>(<span class="hljs-string">&quot;checkout_viewed&quot;</span>),

)(<span class="hljs-title class_">CheckoutPage</span>);
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// 2. A decorator-like factory: each HOC takes its config first,</span>

<span class="hljs-comment">//    returns the actual (Component) =&gt; Component function.</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">withAnalyticsEvent</span> = (<span class="hljs-params">eventName: string</span>) =&gt;

&lt;P <span class="hljs-keyword">extends</span> object&gt;<span class="hljs-function">(<span class="hljs-params">C: React.ComponentType&lt;P&gt;</span>) =&gt;</span>

<span class="hljs-title function_">withAnalytics</span>(C, eventName);
</code></pre>
<p>شاع هذا الأسلوب عبر المكتبة <a href="https://github.com/acdlite/recompose"><code>recompose</code></a>. ويوصي ملف README الخاص بها الآن باستخدام الخطافات (hooks) للشيفرة الجديدة، وقد توقّفت صيانة الحزمة منذ سنوات، وهي إشارة مفيدة إلى المكان الذي تبوأه مجتمع React.</p>
<h2 id="الفخاخ-في-الإنتاج">الفخاخ في الإنتاج</h2>
<p>يحتوي نمط HOC على عدد قليل من أنماط الفشل التي يسهل الوقوع فيها. معرفتها أكثر فائدة من حفظ النمط نفسه.</p>
<h3 id="تعارضات-أسماء-الخصائص">تعارضات أسماء الخصائص</h3>
<p>إذا كان HOC الخاص بك يحقن خاصية تحمل الاسم نفسه الذي يمرّره أحد الوالدين، فهناك خاسر. يعتمد السلوك على ترتيب نشر الخصائص:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> withTheme&lt;P <span class="hljs-keyword">extends</span> { theme?: <span class="hljs-title class_">Theme</span> }&gt;(<span class="hljs-title class_">Wrapped</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;) {

<span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">props: Omit&lt;P, <span class="hljs-string">&quot;theme&quot;</span>&gt;</span>) =&gt;</span> {

<span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">useTheme</span>();

<span class="hljs-comment">// Parent-supplied props win because they are spread last</span>

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">P</span>)} /&gt;</span></span>;

};

}
</code></pre>
<p>في قاعدة شيفرة صغيرة، هذا مقبول. وفي قاعدة كبيرة، فضّل وضع الخصائص المحقونة تحت خاصية نطاق مثل <code>analytics={...}</code> و<code>auth={...}</code> حتى تصبح التعارضات مستحيلة.</p>
<h3 id="الدوال-الساكنة-والمراجع-لا-تمر-عبر-الغلاف">الدوال الساكنة والمراجع لا تمر عبر الغلاف</h3>
<p>إن لف <code>MyComponent</code> بـHOC ينتج مكوّنًا جديدًا تمامًا. لن توجد أي دالة ساكنة مثل <code>MyComponent.fetchData</code> على الغلاف، ولن يمرّ إليه أي <code>ref</code> موجَّه، ما لم تتخذ إجراءات إضافية. استخدم <a href="https://react.dev/reference/react/forwardRef"><code>React.forwardRef</code></a> (أو انتظر سلوك React 19+ حيث يصبح <code>ref</code> مجرد خاصية في المكوّنات الدالية)، وأداة مثل <code>hoist-non-react-statics</code> إذا احتجت إليها.</p>
<h3 id="جحيم-الغلافات">جحيم الغلّافات</h3>
<p>يضيف كل HOC عقدة أخرى إلى شجرة المكوّنات. عادةً ما تكون ثلاث أو أربع طبقات مقبولة؛ أما عشر طبقات فيبدأ DevTools فيبدو كدمية روسية وتصبح آثار المكدس مستعصية على الفهم.</p>
<pre><code class="language-javascript">&lt;<span class="hljs-title class_">WithRouter</span>&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">WithAuth</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">WithTheme</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">WithAnalytics</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">CheckoutPage</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">WithAnalytics</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">WithTheme</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">WithAuth</span>&gt;</span></span>

&lt;/<span class="hljs-title class_">WithRouter</span>&gt;
</code></pre>
<p>هذا هو أكبر سبب وحيد جعل الخطافات المخصصة تحلّ إلى حد كبير محل HOCs في الشيفرة الجديدة: الخطاف لا يضيف أي عقدة إلى الشجرة.</p>
<h3 id="hocs-ومصرف-react">HOCs ومصرّف React</h3>
<p>يعمل <a href="https://react.dev/learn/react-compiler">مصرّف React</a> (المحسّن الذي كان يُعرف سابقًا باسم «React Forget») بأفضل صورة عندما يستطيع تحليل جسم المكوّن تحليلًا ساكنًا. تخفي الطبقات الكثيفة من HOCs المنطق خلف استدعاءات دوال معتمة، مما يمنح المصرّف قدرًا أقل من المادة للعمل عليها.</p>
<h2 id="متى-لا-تستخدم-hoc">متى لا تستخدم HOC</h2>
<p>استخدم أداة أخرى عندما:</p>
<ul>
<li><strong>يحتاج السلوك إلى تخصيص في كل موضع استدعاء.</strong> الخطاف أكثر صدقًا في ذلك؛ فهو يعيش داخل المكوّن ويظهر التخصيص من الأعلى إلى الأسفل.</li>
<li><strong>لا تحتاج إليه إلا في موضع أو موضعين.</strong> لا تبرر التكلفة الإضافية لـHOC (مكوّن إضافي وتوجيه إضافي) إلا عندما تكون إعادة الاستخدام حقيقية.</li>
<li><strong>تكون «المنطق المشترك» مجرد غلاف منسّق.</strong> هذا هو الغرض من التركيب باستخدام <code>children</code>؛ إذ تتفوق <code>{...}</code> على <code>withCard(...)</code> في كل مرة.</li>
<li><strong>تستخدمه لمشاركة الحالة (state).</strong> إن تجمع بين Context وخطاف مخصص (<code>const { user } = useAuth()</code>) فسيكون أوضح على نحو شبه دائم من <code>withAuth(Component)</code>.</li>
</ul>
<h2 id="البديل-الحديث-الخطافات-المخصصة">البديل الحديث: الخطافات المخصصة</h2>
<p>إليك فكرة <code>useFeatureFlag</code> نفسها، معادة صياغتها في صورة خطاف:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">PricingPage</span>(<span class="hljs-params">props: PricingPageProps</span>) {

<span class="hljs-keyword">const</span> showRedesign = <span class="hljs-title function_">useFlag</span>(<span class="hljs-string">&quot;pricing_redesign_2025&quot;</span>);

<span class="hljs-keyword">return</span> showRedesign ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PricingPageNew</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PricingPageLegacy</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;

}
</code></pre>
<p>الفروق لافتة:</p>
<ul>
<li>لا يوجد مكوّن غلاف، لذا لا توجد عقدة إضافية في الشجرة ولا حاجة إلى إدارة <code>displayName</code>.</li>
<li>منطق التفريع ظاهر <em>داخل</em> جسم المكوّن، مما يسهل العثور عليه وتنفيذه خطوة بخطوة في مصحّح الأخطاء.</li>
<li>الاستدلال على الأنواع في TypeScript تلقائي، ولا حاجة إلى تمارين تعميم معقدة للحفاظ على خصائص المكوّن الملفوف.</li>
</ul>
<p>تنص وثائق React على ذلك صراحةً: <em>«في معظم الحالات، تكون الخطافات (Hooks) كافية ويمكن أن تساعد على تقليل التداخل في شجرة المكوّنات.»</em> (<a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">reactjs.org</a>)</p>
<p>ومع ذلك، ما زالت HOCs تستحق مكانها في بعض المواقف:</p>
<ul>
<li><strong>واجهات مكتبات تحتاج إلى لف أي شكل من المكوّنات.</strong> يعمل <code>withTranslation</code> من <a href="https://react.i18next.com/">react-i18next</a> و<code>withRouter</code> الخاص بـReact Router (لا يزال مستخدمًا في قواعد شيفرة <code>v5</code>) من دون أن يضطر المستهلك إلى إعادة كتابة مكوّنه على هيئة دالة.</li>
<li><strong>المكوّنات الصنفية.</strong> إذا كنت تصون قاعدة شيفرة قديمة لا تزال تشحن مكوّنات صنفية، فـHOC هو الخيار المريح الوحيد لمشاركة المنطق معها.</li>
<li><strong>اللف بحدود خطأ أو حدود Suspense.</strong> لا يزال كليهما بحاجة إلى أن يوجد كمكوّن في الشجرة، لذا يُعدّ تغليف HOC معقولًا تمامًا عبر <code>withErrorBoundary</code>.</li>
</ul>
<h2 id="دراسة-حالة-واقعية-react-redux">دراسة حالة واقعية: React Redux</h2>
<p>يعد React Redux المثال المرجعي لاستخدام HOC في العالم الحقيقي. طوال عقد من الزمن، كانت طريقة منح مكوّن وصولًا إلى المخزن هي <a href="https://react-redux.js.org/api/connect"><code>connect</code></a>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CartSummary</span>(<span class="hljs-params">{ itemCount, total, checkout }</span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{checkout}</span>&gt;</span>

Checkout ({itemCount}) — \${total}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">mapState</span> = (<span class="hljs-params">state</span>) =&gt; ({

<span class="hljs-attr">itemCount</span>: state.<span class="hljs-property">cart</span>.<span class="hljs-property">items</span>.<span class="hljs-property">length</span>,

<span class="hljs-attr">total</span>: <span class="hljs-title function_">selectCartTotal</span>(state),

});

<span class="hljs-keyword">const</span> mapDispatch = { <span class="hljs-attr">checkout</span>: checkoutAction };

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">connect</span>(mapState, mapDispatch)(<span class="hljs-title class_">CartSummary</span>);
</code></pre>
<p>إن <code>connect</code> مصنع HOC؛ فـ<code>connect(mapState, mapDispatch)</code> يعيد دالة تلتف مكوّنك. كانت هذه الواجهة المهيمنة في تطبيقات React من نحو 2015 إلى 2019.</p>
<p>بعد React 16.8، أطلقت React Redux واجهة قائمة على الخطافات. ويصبح المكوّن نفسه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CartSummary</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> itemCount = <span class="hljs-title function_">useSelector</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">cart</span>.<span class="hljs-property">items</span>.<span class="hljs-property">length</span>);

<span class="hljs-keyword">const</span> total = <span class="hljs-title function_">useSelector</span>(selectCartTotal);

<span class="hljs-keyword">const</span> dispatch = <span class="hljs-title function_">useDispatch</span>();

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(checkoutAction())}&gt;

Checkout ({itemCount}) — \${total}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<p>لا يزال <code>connect</code> يعمل ومن المرجح ألّا يُحذف أبدًا، لأن هناك قدرًا كبيرًا من الشيفرة في العالم الحقيقي، لكن كل مثال في وثائق Redux الحديثة يستخدم صيغة الخطاف. هذا الاتجاه نموذجي: تقدّم مكتبة ناجحة HOC، ثم تطلق نسخة قائمة على الخطافات بعد انتشار الخطافات بوصفها الطريقة المعتادة، ثم توصي بهدوء باستخدام الخطاف في الشيفرة الجديدة.</p>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>HOC دالة تأخذ مكوّنًا وتعيد مكوّنًا جديدًا مدمجًا فيه سلوك إضافي.</li>
<li>استخدمه لـ<strong>الاهتمامات العابرة للطبقات غير المخصصة</strong>، مثل المصادقة والتحليلات وحدود الأخطاء ورايات الميزات والقياسات، عبر مواضع استدعاء كثيرة.</li>
<li>اضبط <code>displayName</code> دائمًا، وقرّر استراتيجية للتعامل مع تعارض الخصائص، وفكّر في توجيه المراجع قبل شحن HOC داخل مكتبة.</li>
<li>فضّل الخطاف المخصص عندما يُستهلك المنطق في موضع أو موضعين فقط، أو عندما يحتاج المستهلك إلى تخصيصه.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://legacy.reactjs.org/docs/higher-order-components.html">المكوّنات من رتبة عليا — React (الوثائق القديمة)</a></li>
<li><a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة</a></li>
<li><a href="https://react-redux.js.org/api/connect"><code>connect</code> — React Redux</a></li>
<li><a href="https://react.dev/learn/react-compiler">مصرّف React</a></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
