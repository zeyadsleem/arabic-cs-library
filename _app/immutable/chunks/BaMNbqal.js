const s="patterns-dev",a="react",n="أنماط React وNext.js",l="render-props-pattern",t="نمط خصائص العرض (render props)",p=[{depth:2,id:"مشهد-يحفز-الحاجة-إلى-هذا-النمط",text:"مشهد يحفّز الحاجة إلى هذا النمط"},{depth:2,id:"مثال-كامل-مدقق-نموذج-قابل-لإعادة-الاستخدام",text:"مثال كامل: مدقّق نموذج قابل لإعادة الاستخدام"},{depth:2,id:"صيغة-الأبناء-في-صورة-دالة",text:"صيغة «الأبناء في صورة دالة»"},{depth:2,id:"عدة-خصائص-عرض-في-مكون-واحد",text:"عدة خصائص عرض في مكوّن واحد"},{depth:2,id:"أين-تظل-خصائص-العرض-مفيدة",text:"أين تظل خصائص العرض مفيدة"},{depth:2,id:"متى-لا-تستخدم-خصائص-العرض",text:"متى لا تستخدم خصائص العرض"},{depth:2,id:"تحديث-خصائص-العرض-إلى-الصيغة-الحديثة-باستخدام-الخطافات",text:"تحديث خصائص العرض إلى الصيغة الحديثة باستخدام الخطافات"},{depth:2,id:"المفاضلات-في-لمحة",text:"المفاضلات في لمحة"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],e=`<h2 id="مشهد-يحفز-الحاجة-إلى-هذا-النمط">مشهد يحفّز الحاجة إلى هذا النمط</h2>
<p>أنت تبني <code>GeolocationProvider</code> لتطبيق الخرائط. يحتاج المزوّد إلى أن يطلب الإذن من المتصفح، ويشترك في تحديثات الموقع، ويتعامل مع الأخطاء عندما يكون المستخدم غير متصل، وينظّف المراقب عندما يفكّ المستهلك تركيب المكوّن. <em>المنطق</em> متطابق في كل مكان يظهر فيه داخل التطبيق، لكن واجهة المستخدم المحيطة به تختلف في كل شاشة: لافتة في صفحة، وعلامة خريطة في أخرى، ولوحة تشخيص مخفية أثناء التطوير.</p>
<p>كيف تنشر المنطق مرة واحدة وتترك لكل مستهلك أن يقرّر ما الذي يُعرض؟</p>
<p><strong>نمط خصائص العرض (render props)</strong> إحدى الإجابات. لا يقرّر المكوّن الذي يغلّف السلوك كيفية عرض النتيجة. بل يقبل دالة كخاصية، ويستدعي تلك الدالة بالبيانات المتوفرة لديه، ويعرض ما تعيده الدالة بصيغة JSX.</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">RenderProp</span>&lt;T&gt; = <span class="hljs-function">(<span class="hljs-params">value: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Geolocation</span>(<span class="hljs-params">{ render }: { render: RenderProp&lt;GeoState&gt; }</span>) {

<span class="hljs-keyword">const</span> state = <span class="hljs-title function_">useGeolocation</span>(); <span class="hljs-comment">// does the actual work</span>

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{render(state)}<span class="hljs-tag">&lt;/&gt;</span></span>;

}
</code></pre>
<p>يوصل المستهلك هذا المكوّن عند موضع الاستدعاء، ويقرّر شكل واجهة المستخدم في <em>هذه</em> الصفحة:</p>
<pre><code class="language-javascript">&lt;<span class="hljs-title class_">Geolocation</span>

render={<span class="hljs-function">(<span class="hljs-params">{ coords, error, status }</span>) =&gt;</span> {

<span class="hljs-keyword">if</span> (status === <span class="hljs-string">&quot;pending&quot;</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> /&gt;</span></span>;

<span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PermissionPrompt</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> /&gt;</span></span>;

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MapMarker</span> <span class="hljs-attr">lat</span>=<span class="hljs-string">{coords.latitude}</span> <span class="hljs-attr">lng</span>=<span class="hljs-string">{coords.longitude}</span> /&gt;</span></span>;

}}

/&gt;
</code></pre>
<p>لا يلزم أن تسمى خاصية العرض باسم <code>render</code>. أي خاصية تكون قيمتها دالة تعيد JSX تنطبق عليها هذه القاعدة، سواء كانت <code>children</code> أو <code>renderItem</code> أو <code>renderEmpty</code> أو أي اسم آخر.</p>
<h2 id="مثال-كامل-مدقق-نموذج-قابل-لإعادة-الاستخدام">مثال كامل: مدقّق نموذج قابل لإعادة الاستخدام</h2>
<p>تخيّل مكوّنًا \`\` يملك القواعد وحالة (state) الحقول، لكنه يترك للصفحة المستدعية أن تقرّر شكل حقول الإدخال ورسائل الخطأ.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

type <span class="hljs-title class_">Errors</span>&lt;T&gt; = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, string&gt;&gt;;

type <span class="hljs-title class_">FormApi</span>&lt;T&gt; = {

<span class="hljs-attr">values</span>: T;

<span class="hljs-attr">errors</span>: <span class="hljs-title class_">Errors</span>&lt;T&gt;;

<span class="hljs-attr">isValid</span>: boolean;

<span class="hljs-attr">setField</span>: &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params">key: K, value: T[K]</span>) =&gt;</span> <span class="hljs-keyword">void</span>;

<span class="hljs-attr">submit</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">void</span>;

};

type <span class="hljs-title class_">Props</span>&lt;T&gt; = {

<span class="hljs-attr">initialValues</span>: T;

<span class="hljs-attr">validate</span>: <span class="hljs-function">(<span class="hljs-params">values: T</span>) =&gt;</span> <span class="hljs-title class_">Errors</span>&lt;T&gt;;

<span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params">values: T</span>) =&gt;</span> <span class="hljs-keyword">void</span>;

<span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params">api: FormApi&lt;T&gt;</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">FormValidator</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;string, unknown&gt;&gt;({

initialValues,

validate,

onSubmit,

children,

}: <span class="hljs-title class_">Props</span>&lt;T&gt;) {

<span class="hljs-keyword">const</span> [values, setValues] = useState&lt;T&gt;(initialValues);

<span class="hljs-keyword">const</span> errors = <span class="hljs-title function_">validate</span>(values);

<span class="hljs-keyword">const</span> isValid = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;

<span class="hljs-keyword">const</span> setField = &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params">key: K, value: T[K]</span>) =&gt;</span>

<span class="hljs-title function_">setValues</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: value }));

<span class="hljs-keyword">const</span> <span class="hljs-title function_">submit</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">if</span> (isValid) <span class="hljs-title function_">onSubmit</span>(values);

};

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children({ values, errors, isValid, setField, submit })}<span class="hljs-tag">&lt;/&gt;</span></span>;

}
</code></pre>
<p>المستهلك حر في عرض النموذج كيفما يشاء، سواء باستخدام نظام تصميم أو تخطيط مخصص أو غلاف معروض على الخادم أو أي شيء آخر:</p>
<pre><code class="language-javascript">&lt;<span class="hljs-title class_">FormValidator</span>

initialValues={{ <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;&quot;</span> }}

validate={<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> ({

<span class="hljs-attr">email</span>: v.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&quot;@&quot;</span>) ? <span class="hljs-literal">undefined</span> : <span class="hljs-string">&quot;Not an email&quot;</span>,

<span class="hljs-attr">password</span>: v.<span class="hljs-property">password</span>.<span class="hljs-property">length</span> &gt;= <span class="hljs-number">8</span> ? <span class="hljs-literal">undefined</span> : <span class="hljs-string">&quot;Too short&quot;</span>,

})}

onSubmit={<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-title function_">signIn</span>(v)}

&gt;

{<span class="hljs-function">(<span class="hljs-params">{ values, errors, isValid, setField, submit }</span>) =&gt;</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>

<span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {

e.preventDefault();

submit();

}}

&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">TextField</span>

<span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Email&quot;</span>

<span class="hljs-attr">value</span>=<span class="hljs-string">{values.email}</span>

<span class="hljs-attr">error</span>=<span class="hljs-string">{errors.email}</span>

<span class="hljs-attr">onChange</span>=<span class="hljs-string">{(v)</span> =&gt;</span> setField(&quot;email&quot;, v)}

/&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">TextField</span>

<span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Password&quot;</span>

<span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>

<span class="hljs-attr">value</span>=<span class="hljs-string">{values.password}</span>

<span class="hljs-attr">error</span>=<span class="hljs-string">{errors.password}</span>

<span class="hljs-attr">onChange</span>=<span class="hljs-string">{(v)</span> =&gt;</span> setField(&quot;password&quot;, v)}

/&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">PrimaryButton</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!isValid}</span>&gt;</span>

Sign in

<span class="hljs-tag">&lt;/<span class="hljs-name">PrimaryButton</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>

)}

&lt;/<span class="hljs-title class_">FormValidator</span>&gt;
</code></pre>
<p>لاحظ أن <code>FormValidator</code> لا يعرض حقول الإدخال أو التسميات أو الأزرار. فهو منطق خالص مع منفذ عرض.</p>
<h2 id="صيغة-الأبناء-في-صورة-دالة">صيغة «الأبناء في صورة دالة»</h2>
<p>يستخدم المثال أعلاه أصلًا صيغة الأبناء في صورة دالة. وهي أكثر الصيغتين ملاءمة؛ إذ تختارها معظم المكتبات الحديثة لأن تمرير JSX بين وسمَي البداية والنهاية يُقرأ بطبيعية أكثر من خاصية <code>render={...}</code> الصريحة. والآلية متطابقة: <code>children</code> مجرد خاصية تكون قيمتها الدالة التي تمررها بين الوسمين.</p>
<p>سترى الصيغتين في الاستخدامات العملية:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Explicit render prop</span>

&lt;<span class="hljs-title class_">Subscribe</span> topic=<span class="hljs-string">&quot;orders&quot;</span> render={<span class="hljs-function">(<span class="hljs-params">orders</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">OrderList</span> <span class="hljs-attr">orders</span>=<span class="hljs-string">{orders}</span> /&gt;</span></span>} /&gt;

<span class="hljs-comment">// children-as-function</span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Subscribe</span> <span class="hljs-attr">topic</span>=<span class="hljs-string">&quot;orders&quot;</span>&gt;</span>

{(orders) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">OrderList</span> <span class="hljs-attr">orders</span>=<span class="hljs-string">{orders}</span> /&gt;</span>}

<span class="hljs-tag">&lt;/<span class="hljs-name">Subscribe</span>&gt;</span></span>
</code></pre>
<p>تعرض بعض المكتبات، مثل Formik تاريخيًا و<a href="https://github.com/downshift-js/downshift">Downshift</a>، الصيغتين كلتيهما من أجل التوافق مع الإصدارات السابقة. اختر أسلوبًا واحدًا لكل قاعدة شيفرة والتزم به.</p>
<h2 id="عدة-خصائص-عرض-في-مكون-واحد">عدة خصائص عرض في مكوّن واحد</h2>
<p>يمكن أن يقبل المكوّن عدة خصائص عرض، تكون كل واحدة مسؤولة عن موضع مختلف. هذا في جوهره واجهة «مواضع» (slots) مكتوبة الأنواع:</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">ListProps</span>&lt;T&gt; = {

<span class="hljs-attr">items</span>: T[];

<span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params">item: T, index: number</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

renderEmpty?: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

renderHeader?: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

};

<span class="hljs-keyword">function</span> <span class="hljs-title class_">List</span>&lt;T&gt;({ items, renderItem, renderEmpty, renderHeader }: <span class="hljs-title class_">ListProps</span>&lt;T&gt;) {

<span class="hljs-keyword">if</span> (items.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{renderEmpty?.()}<span class="hljs-tag">&lt;/&gt;</span></span>;

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>

{renderHeader?.()}

<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{items.map((it, i) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>&gt;</span>{renderItem(it, i)}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>

);

}
</code></pre>
<p>صمد هذا الأسلوب، الذي يعتمد على مواضع عرض صغيرة ومكتوبة أنواعها جيدًا، صمودًا أفضل من أغلفة خصائص العرض الاحادية. وهو في جوهره الأسلوب الذي تعمل به \`\` في React Native (<code>renderItem</code> و<code>ListEmptyComponent</code> و<code>ListHeaderComponent</code>) منذ سنوات.</p>
<h2 id="أين-تظل-خصائص-العرض-مفيدة">أين تظل خصائص العرض مفيدة</h2>
<p>في قاعدة شيفرة عام 2025، لم تعد خصائص العرض الأداة الافتراضية لمشاركة المنطق؛ أصبحت الخطافات (hooks) هي كذلك. لكن النمط يظل مفيدًا في بعض الحالات التي تواجه فيها الخطافات صعوبة:</p>
<ul>
<li><strong>المكوّنات التي تحتاج إلى امتلاك شجرة فرعية وإدراج JSX الخاص بالمستهلك فيها.</strong> فكّر في أغلفة السحب والإفلات مثل <a href="https://github.com/atlassian/react-beautiful-dnd"><code>react-beautiful-dnd</code></a>، التي تتيح لك وسيطي <code>provided</code> و<code>snapshot</code> لربطهما بـ JSX الخاص بك. يمكن للخطاف أن يوفّر لك الحالة، لكنه لا يستطيع التفاف JSX داخل حدود <code>/</code>.</li>
<li><strong>مكتبات المكوّنات بلا واجهة.</strong> تستخدم <a href="https://github.com/downshift-js/downshift">Downshift</a> و<a href="https://react-spectrum.adobe.com/react-aria/">React Aria</a> (واجهات <code>*Builder</code> فيها) و<a href="https://tanstack.com/table">TanStack Table</a> كلها خصائص العرض أو الأبناء في صورة دوال، حتى تتمكن من توفير <em>السلوك</em> (إمكانية الوصول، ومعالجة لوحة المفاتيح، وإدارة التركيز) من دون فرض ترميز محدد.</li>
<li><strong>عناصر الحركة الأساسية.</strong> يستخدم \`\` من <a href="https://www.framer.com/motion/">Framer Motion</a> و<code>Transition</code> من React Spring الأبناء في صورة دوال لتمرير القيم المستقيمة إلى JSX الخاص بك في كل إطار.</li>
</ul>
<p>القاسم المشترك: تتفوق خصائص العرض عندما يحتاج الغلاف إلى أن <em>يكون</em> جزءًا من شجرتك (لأنه يوفّر سياقًا أو مراجع أو بوابة) <em>وأيضًا</em> عندما يحتاج المستهلك إلى كتابة JSX داخله.</p>
<h2 id="متى-لا-تستخدم-خصائص-العرض">متى لا تستخدم خصائص العرض</h2>
<ul>
<li><strong>لمشاركة البيانات الخالصة.</strong> إذا لم يكن وجود مكوّن غلاف إلا لاستدعاء <code>props.children(data)</code>، فسيكون الخطاف المخصص أنظف على نحو شبه دائم. فـ<code>const data = useThing()</code> أفضل من <code>{(data) =&gt; ...}</code> من حيث سهولة القراءة.</li>
<li><strong>عندما تضطر إلى تداخل عدة منها.</strong> يصبح مكوّن <code>داخل مكوّن</code> سريعًا <a href="https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)">ألم أهرامات الاستدعاءات</a> التي صُممت الخطافات جزئيًا لحلها.</li>
<li><strong>عندما يعرض المستهلك الشيء نفسه دائمًا.</strong> هذا هو غرض المكوّن العادي مع الخصائص. لا تكلّف خصائص العرض ثمنها إلا عندما يختلف الناتج المعروض على نحو مشروع بين مواضع الاستدعاء.</li>
</ul>
<h2 id="تحديث-خصائص-العرض-إلى-الصيغة-الحديثة-باستخدام-الخطافات">تحديث خصائص العرض إلى الصيغة الحديثة باستخدام الخطافات</h2>
<p>شجعت معظم المكتبات التي روّجت لنمط خصائص العرض على إطلاق واجهة للخطافات إلى جانبها. ما زالت مكوّنات <code> و</code> في Apollo مصدَّرة، لكن الوثائق تبدأ الآن بـ<code>useQuery</code> و<code>useMutation</code>. واستبدل React Router مكوّن <code>بمكوّن</code> وخطافي <code>useParams</code> و<code>useLoaderData</code>. وانتقل مستخدمو Formik إلى حد كبير إلى واجهة React Hook Form التي تبدأ بالخطافات.</p>
<p>إليك مشكلة <code>Geolocation</code> نفسها في أعلى هذه المقالة، لكن هذه المرة في صورة خطاف مخصص:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useGeolocation</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">GeoState</span>&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;pending&quot;</span> });

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">if</span> (!(<span class="hljs-string">&quot;geolocation&quot;</span> <span class="hljs-keyword">in</span> navigator)) {

<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;error&quot;</span>, <span class="hljs-attr">error</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Unsupported&quot;</span>) });

<span class="hljs-keyword">return</span>;

}

<span class="hljs-keyword">const</span> id = navigator.<span class="hljs-property">geolocation</span>.<span class="hljs-title function_">watchPosition</span>(

<span class="hljs-function">(<span class="hljs-params">pos</span>) =&gt;</span>

<span class="hljs-title function_">setState</span>({

<span class="hljs-attr">status</span>: <span class="hljs-string">&quot;ok&quot;</span>,

<span class="hljs-attr">coords</span>: { <span class="hljs-attr">latitude</span>: pos.<span class="hljs-property">coords</span>.<span class="hljs-property">latitude</span>, <span class="hljs-attr">longitude</span>: pos.<span class="hljs-property">coords</span>.<span class="hljs-property">longitude</span> },

}),

<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;error&quot;</span>, <span class="hljs-attr">error</span>: err }),

);

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> navigator.<span class="hljs-property">geolocation</span>.<span class="hljs-title function_">clearWatch</span>(id);

}, []);

<span class="hljs-keyword">return</span> state;

}

<span class="hljs-comment">// At the call site:</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">NearbyStores</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> geo = <span class="hljs-title function_">useGeolocation</span>();

<span class="hljs-keyword">if</span> (geo.<span class="hljs-property">status</span> === <span class="hljs-string">&quot;pending&quot;</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> /&gt;</span></span>;

<span class="hljs-keyword">if</span> (geo.<span class="hljs-property">status</span> === <span class="hljs-string">&quot;error&quot;</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PermissionPrompt</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{geo.error}</span> /&gt;</span></span>;

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StoreMap</span> <span class="hljs-attr">lat</span>=<span class="hljs-string">{geo.coords.latitude}</span> <span class="hljs-attr">lng</span>=<span class="hljs-string">{geo.coords.longitude}</span> /&gt;</span></span>;

}
</code></pre>
<p>طبقتان أقل من التوجيه غير المباشر، ولا عقدة إضافية في الشجرة، ولا وسائط مغلقة يلزمك استنتاجها. لهذا تواصل معظم الفرق مع استخدام الخطاف أولًا.</p>
<h2 id="المفاضلات-في-لمحة">المفاضلات في لمحة</h2>
<p><strong>نقاط القوة</strong></p>
<ul>
<li><strong>لا تعارضات في الأسماء.</strong> على خلاف المكوّنات من رتبة عليا (higher-order components، HOCs)، تمرّر خصائص العرض البيانات صراحةً كوسائط للدالة. لا يحدث دمج ضمني للخصائص، وتدفق البيانات ظاهر عند موضع الاستدعاء.</li>
<li><strong>أقصى مرونة للمستهلك.</strong> لا يفرض المكوّن الذي يملك المنطق أي ترميز، وهذا تحديدًا سبب حب المكتبات بلا واجهة لهذا النمط.</li>
<li><strong>توافق ممتاز مع تعميمات TypeScript.</strong> توفّر الصيغة <code> renderItem={item =&gt; ...}&gt;</code> لك معامل <code>item</code> مكتوب أنواعه بالكامل مجانًا.</li>
</ul>
<p><strong>نقاط الضعف</strong></p>
<ul>
<li><strong>أهرامات الاستدعاءات.</strong> يصبح تداخل عدة مكوّنات باستخدام خصائص عرض لمصادر بيانات متعددة صعب القراءة بسرعة؛ في المقابل، استدعاءات الخطافات المسطحة أسهل.</li>
<li><strong>تكلفة إعادة العرض (re-render).</strong> إنشاء دالة مضمّنة جديدة عند كل عرض من المكوّن الأصل ليس مشكلة في كل تطبيق تقريبًا، لكنه في المسارات الحرجة للأداء قد يُبطل التخزين المؤقت (memoization). يساعد مصرّف React هنا، لكنه ليس سحرًا.</li>
<li><strong>مفهوم إضافي يجب تعليمه.</strong> على المساهم الجديد أن يدرك أن <code>children</code> يكون أحيانًا دالة.</li>
</ul>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>خاصية العرض خاصية قيمتها دالة تعيد JSX. المكوّن المالك يشغّل المنطق ويستدعي الخاصية لعرضه.</li>
<li>يتألق النمط في المكتبات <strong>بلا واجهة</strong>، مثل السحب والإفلات والحركة وإمكانية الوصول وبناء الجداول، حيث لا تستطيع المكتبة فرض الترميز.</li>
<li>لمشاركة البيانات العادية، يكون الخطاف المخصص عادةً أوضح وأقل تسطحًا وأكثر ملاءمة لمصرّف React.</li>
<li>إذا وجدت نفسك تكتب غلافًا وظيفته الوحيدة هي <code>return props.children(data)</code>، فإن هذا الغلاف يحتاج إلى أن يكون خطافًا.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://legacy.reactjs.org/docs/render-props.html">خصائص العرض — React (الوثائق القديمة)</a></li>
<li><a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة</a></li>
<li><a href="https://github.com/downshift-js/downshift">Downshift — مكتبة combobox بلا واجهة مبنية على خصائص العرض</a></li>
<li><a href="https://react-spectrum.adobe.com/react-aria/">React Aria — عناصر وصولية تستخدم خصائص العرض للسلوك</a></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
