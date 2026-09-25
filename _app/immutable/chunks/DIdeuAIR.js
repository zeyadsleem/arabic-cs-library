const s="patterns-dev",e="vue",n="أنماط Vue",a="state-management",p="إدارة الحالة",l=[{depth:2,id:"الخصائص",text:"الخصائص"},{depth:2,id:"أحداث-المكونات",text:"أحداث المكوّنات"},{depth:2,id:"إدارة-حالة-بسيطة",text:"إدارة حالة بسيطة"},{depth:2,id:"pinia",text:"Pinia"},{depth:2,id:"ما-هي-الطريقة-الصحيحة",text:"ما هي الطريقة الصحيحة؟"},{depth:3,id:"مخزن-بسيط",text:"مخزن بسيط"},{depth:3,id:"pinia",text:"Pinia"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],t=`<p><strong>مكوّنات Vue هي لبنات البناء الأساسية لتطبيقات Vue</strong>، إذ تتيح لنا دمج الترميز (HTML) والمنطق (JS) والأنماط (CSS) داخلها.</p>
<p>إليك مثالًا على مكوّن أحادي الملف (Single-File component) يعرض سلسلة من الأعداد انطلاقًا من خاصية بيانات:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>The numbers are {{ numbers }}!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>تُهيّئ الدالة <code>ref()</code> المكوّن ليكون <em>تفاعليًا</em> (reactive). وإذا تغيّرت قيمة خاصية تفاعلية مستخدَمة في القالب، فإن عرض المكوّن سيُعاد عرضه ليُظهر التغيير.</p>
<p>في المثال أعلاه، تكون <code>numbers</code> هي قيمة البيانات التفاعلية المستخدَمة في المكوّن. وماذا لو كانت <code>numbers</code> قيمة بيانات،تحتاج الوصول إليها من مكوّن آخر؟ على سبيل المثال، قد نحتاج إلى مكوّن يكون مسؤولًا عن عرض <code>numbers</code> (كما في الأعلى) وآخر للتعامل مع قيمة <code>numbers</code>.</p>
<p>إذا أردنا مشاركة <code>numbers</code> بين عدّة مكوّنات، فإن <code>numbers</code> لا تصبح بيانات على مستوى المكوّن فحسب <em>بل أيضًا</em> بيانات على مستوى التطبيق. وهذا يقودنا إلى موضوع <strong>إدارة الحالة</strong> (state management) — أي إدارة بيانات مستوى التطبيق.</p>
<p>قبل أن نتناول كيفية إدارتنا للحالة في التطبيق، سنبدأ بالنظر في كيفيةVERBirement <strong>الخصائص</strong> (props) مشاركة البيانات بين المكوّنات الأصل والفرعية.</p>
<h2 id="الخصائص">الخصائص</h2>
<p>لنفترض لدينا تطبيقًا افتراضيًا يحتوي في البداية على مكوّن أصل ومكوّن فرعي فقط. ويمنحنا Vue القدرة على استخدام <strong>الخصائص</strong> (props) لتمرير البيانات من المكوّن الأصل إلى المكوّن الفرعي.</p>
<p><img src="/images/patterns-dev/vue-state-management-0-props.webp" alt="إدارة الحالة عبر الخصائص"></p>
<p>استخدام الخصائص بسيط إلى حدٍّ كبير. فكل ما نحتاج إليه فعليًا هو ربط قيمة بسمة الخاصية في الموضع الذي يُعرض فيه المكوّن الفرعي. وإليك مثالًا على استخدام الخصائص لتمرير مصفوفة قيم إلى الأسفل بمساعدة التوجيه <a href="https://vuejs.org/api/built-in-directives.html#v-bind">v-bind</a>:</p>
<p><strong>ParentComponent</strong></p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">:numbers</span>=<span class="hljs-string">&quot;numbers&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent&quot;</span>;

<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><strong>ChildComponent</strong></p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{{ numbers }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">const</span> { buttonText } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;numbers&quot;</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمرّر المكوّن <code>ParentComponent</code> مصفوفة <code>numbers</code> كخصائص (props) تحمل الاسم نفسه إلى <code>ChildComponent</code>. و<code>ChildComponent</code> يربط ببساطة قيمة <code>numbers</code> على قالبه.</p>
<p>JavaScript iconParentComponent.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">:numbers</span>=<span class="hljs-string">&quot;numbers&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
  <span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent&quot;</span>;

<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/state-management-1-wsgmql">Open CodeSandbox</a></p>
<h2 id="أحداث-المكونات">أحداث المكوّنات</h2>
<p>ماذا لو احتجنا إلى إيجاد طريقة للتواصل في الاتجاه المعاكس؟ ويمكن أن يكون أحد الأمثلة السماح للمستخدم بإدخال عدد جديد إلى المصفوفة المعروضة في المثال أعلاه من المكوّن الفرعي.</p>
<p>لا يمكننا استخدام <code>props</code> لأن <code>props</code> لا يمكن استخدامها إلّا لتمرير البيانات بصيغة أحادية الاتجاه (من الأصل إلى الفرعي إلى حفيد…). ولتسهيل إعلام المكوّن الفرعي للمكوّن الأصل بشيء ما، يمكننا استخدام الأحداث المخصّصة.</p>
<p><img src="/images/patterns-dev/vue-state-management-1-custom_events.webp" alt="إدارة الحالة عبر الأحداث المخصّصة"></p>
<p>تُرسَل الأحداث المخصّصة في Vue كأحداث <a href="https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent">CustomEvents</a> أصيلة، وتُستخدم للتواصل بين المكوّنات.</p>
<p>إليك مثالًا على استخدام الأحداث المخصّصة لتمكين <code>ChildComponent</code> من تيسير تغيير في خاصية بيانات <code>numbers</code> الخاصة بـ <code>ParentComponent</code>:</p>
<p><strong>ChildComponent</strong></p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{{ numbers }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;$emit(&#x27;number-added&#x27;, Number(number))&quot;</span>&gt;</span>

Add new number

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">const</span> { numbers } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;numbers&quot;</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><strong>ParentComponent</strong></p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">:numbers</span>=<span class="hljs-string">&quot;numbers&quot;</span> @<span class="hljs-attr">number-added</span>=<span class="hljs-string">&quot;(n) =&gt; numbers.push(n)&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent&quot;</span>;

<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمتلك المكوّن <code>ChildComponent</code> حقل إدخال يلتقط قيمة <code>number</code> وزرًّا يُصدر حدثًا مخصّصًا اسمه <code>number-added</code> يحمل قيمة <code>number</code> الملتقطة.</p>
<p>وفي <code>ParentComponent</code>، يُحدَّد مستمع للحدث المخصّص يُشار إليه بـ <code>@number-added</code> في الموضع الذي يُعرض فيه المكوّن الفرعي. وعندما يُصدر هذا الحدث في المكوّن الفرعي، فإنه يدفع قيمة <code>number</code> القادمة من الحدث إلى مصفوفة <code>numbers</code> الخاصة بـ <code>ParentComponent</code>.</p>
<p>JavaScript iconParentComponent.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">:numbers</span>=<span class="hljs-string">&quot;numbers&quot;</span> @<span class="hljs-attr">number-added</span>=<span class="hljs-string">&quot;(n) =&gt; numbers.push(n)&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-comment">// eslint-disable-next-line no-unused-vars</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent&quot;</span>;

<span class="hljs-comment">// eslint-disable-next-line no-unused-vars</span>
<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/state-management-2-m52vxf">Open CodeSandbox</a></p>
<h2 id="إدارة-حالة-بسيطة">إدارة حالة بسيطة</h2>
<p>يمكننا استخدام الخصائص لتمرير البيانات إلى الأسفل والأحداث المخصّصة لإرسال الرسائل إلى الأعلى. وكيف يمكننا تمرير البيانات أو تيسير التواصل بين مكوّنين مختلفين شقيقين؟</p>
<p><img src="/images/patterns-dev/vue-state-management-2-sibling_components_communication.webp" alt="التواصل بين المكوّنات الشقيقة"></p>
<p>لا يمكننا استخدام الأحداث المخصّصة بالطريقة التي استخدمناها أعلاه، لأن تلك الأحداث تُصدر داخل واجهة مكوّن معيّن، ونتيجة لذلك فإن مستمع الحدث المخصّص يحتاج إلى التصريح عند الموضع الذي يُعرض فيه المكوّن. وفي مكوّنين منعزلين، لا يُعرض أحدهما داخل الآخر.</p>
<p>إحدى الطرق البسيطة لإدارة حالة مستوى التطبيق هي إنشاء نمط مخزن (store) قائم على مشاركة مخزن بيانات بين المكوّنات. ويمكن للمخزن إدارة حالة تطبيقنا فضلًا عن الطرق المسؤولة عن تغيير الحالة.</p>
<p>على سبيل المثال، يمكننا أن يكون لدينا مخزن بسيط على النحو التالي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { reactive } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">reactive</span>({

<span class="hljs-attr">numbers</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],

<span class="hljs-title function_">addNumber</span>(<span class="hljs-params">newNumber</span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">numbers</span>.<span class="hljs-title function_">push</span>(newNumber);

},

});
</code></pre>
<p>يحتوي المخزن على مصفوفة <code>numbers</code> وطريقة <code>addNumber</code> التي تقبل حمولة (payload) وتُحدّث مباشرةً قيمة <code>numbers</code> في المخزن.</p>
<p>لاحظ استخدام الدالة <code>reactive()</code> لتعريف كائن الحالة؟ مع Vue 3.x، يمكننا استيراد الدالة <code>reactive()</code> واستخدامها للتصريح بحالة تفاعلية انطلاقًا من كائن JavaScript. وعندما تتغيّر هذه الحالة التفاعلية عبر الطريقة <code>addNumber()</code>، فإن أي مكوّن يستخدم هذه الحالة التفاعلية سيُحدَّث تلقائيًا!</p>
<p>يمكننا أن يكون لدينا مكوّن واحد مسؤول عن عرض مصفوفة <code>numbers</code> من المخزن، وسنسميه <code>NumberDisplay</code>:</p>
<p><strong>NumberDisplay</strong>:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{{ store.numbers }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { store } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../store.js&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>ويمكننا الآن أن يكون لدينا مكوّن آخر يُسمّى <code>NumberSubmit</code> يسمح للمستخدم بإضافة عدد جديد إلى مصفوفة بياناتنا:</p>
<p><strong>NumberSubmit</strong>:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;numberInput&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;store.addNumber(numberInput)&quot;</span>&gt;</span>Add new number<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> { store } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../store.js&quot;</span>;

<span class="hljs-keyword">const</span> numberInput = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمتلك المكوّن <code>NumberSubmit</code> طريقة <code>addNumber()</code> تستدعي تغيير (mutation) المخزن <code>store.addNumber()</code> وتمرّر الحمولة المتوقّعة.</p>
<p>تتلقّى طريقة المخزن الحمولة وتُعدّل مباشرةً مصفوفة <code>store.numbers</code>. وبفضل تفاعلية Vue، فكلما تغيّرت مصفوفة <code>numbers</code> في حالة المخزن، فإن الـ DOM ذي الصلة الذي يعتمد على هذه القيمة (قالب المكوّن <code>NumberDisplay</code>) <em>يُحدَّث تلقائيًا</em>.</p>
<p>JavaScript iconstore.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { reactive } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">reactive</span>({
    <span class="hljs-attr">numbers</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
    <span class="hljs-title function_">addNumber</span>(<span class="hljs-params">newNumber</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">numbers</span>.<span class="hljs-title function_">push</span>(newNumber);
    },
  });
</code></pre>
<p><a href="https://codesandbox.io/embed/state-management-3-78vzcy">Open CodeSandbox</a></p>
<p>حين نقول هنا إن المكوّنات تتفاعل بعضها مع بعض، فإننا نستخدم كلمة «تفاعل» بالمعنى الواسع. فالمكوّنات لن تفعل شيئًا تجاه بعضها، بل ستُحدث تغييرات على بعضها الآخر <em>عبر</em> المخزن.</p>
<p><img src="/images/patterns-dev/vue-state-management-3-simple_store.webp" alt="مخزن حالة تفاعلي بسيط"></p>
<p>وإذا أمعنا النظر في جميع القطع التي تتفاعل مباشرةً مع المخزن، يمكننا حينها من المسى:</p>
<ul>
<li>الطريقة الموجودة في <code>NumberSubmit</code> هي المسؤولة عن العمل مباشرةً على طريقة المخزن، لذا يمكننا وسمها بـ <strong>إجراء المخزن</strong> (store action).</li>
<li>طريقة المخزن هي أيضًا تحمل مسؤولية معيّنة — وهي تعديل حالة المخزن مباشرةً. لذا سنقول إنها <strong>تغيير في المخزن</strong> (store mutation).</li>
<li>لا يهتمّ <code>NumberDisplay</code> حقًا بنوع الطرق الموجودة في المخزن أو في <code>NumberSubmit</code>، وكل ما يعنيه هو الحصول على المعلومات من المخزن. لذا سنقول إن <code>NumberDisplay</code> هو نوعًا ما <strong>جالب من المخزن</strong> (store getter).</li>
</ul>
<p>يترتّب <strong>الإجراء</strong> (action) على <strong>التغيير</strong> (mutation). و<strong>التغيير</strong> يعدّل الحالة، وهو ما يؤثر بدوره في العرض/المكوّنات. أمّا العرض/المكوّنات فتسترجع بيانات المخزن عبر <strong>الجوالب</strong> (getters). إننا نبدأ بالاقتراب من طريقة أكثر تنظيمًا للتعامل مع حالة مستوى التطبيق.</p>
<h2 id="pinia">Pinia</h2>
<p><a href="https://pinia.vuejs.org/">Pinia</a> هو نمط إدارة حالة ومكتبة (library) لـ Vue.js توفّر طريقة أكثر تنظيمًا وقابلية للتوسّع للتعامل مع حالة مستوى التطبيق.</p>
<p>يُعدّ Pinia بديلًا لحلول إدارة الحالة الأخرى مثل <a href="https://vuex.vuejs.org/">Vuex</a> وهو الآن مكتبة إدارة الحالة الرسمية لـ Vue. وهو يوفّر طريقة بسيطة وفعّالة لإنشاء المخازن وإدارتها، حيث تغلق هذه المخازن الحالة والإجراءات والجوالب.</p>
<p>في Pinia، يمكننا تعريف مخزن باستخدام الدالة <code>defineStore()</code>. ويتيح لنا Pinia تعريف مخزن بصيغة تحاكي واجهة الخيارات (Options API) أو واجهة التركيب (Composition API). وهنا نستخدم صيغة واجهة التركيب لتعريف دالة <code>useNumbersStore()</code> لإنشاء مخزن <code>numbers</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> { defineStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;pinia&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> useNumbersStore = <span class="hljs-title function_">defineStore</span>(<span class="hljs-string">&quot;numbers&quot;</span>, <span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">addNumber</span>(<span class="hljs-params">newNumber</span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">numbers</span>.<span class="hljs-title function_">push</span>(newNumber);

}

<span class="hljs-keyword">return</span> { numbers, addNumber };

});
</code></pre>
<p>في المثال أعلاه، نعرّف مخزنًا يُسمّى <code>numbers</code> بحالة أولية تحتوي على خاصية <code>numbers</code>. ونعرّف أيضًا إجراءً واحدًا هو <code>addNumber()</code> يعدّل حالة <code>numbers</code>.</p>
<p>ويمكننا بعد ذلك إنشاء نسخة Pinia وتثبيتها في تطبيق Vue لدينا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> { createPinia } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;pinia&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./App.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./styles.css&quot;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">createApp</span>(<span class="hljs-title class_">App</span>);

<span class="hljs-keyword">const</span> pinia = <span class="hljs-title function_">createPinia</span>();

app.<span class="hljs-title function_">use</span>(pinia);

app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&quot;#app&quot;</span>);
</code></pre>
<p>في هذه اللحظة، يمكننا استخدام المخزن الذي أنشأناه حديثًا في مكوّناتنا. وفي المكوّن <code>NumberDisplay</code>، سنستورد الدالة <code>useNumbersStore()</code> من ملف المخزن ونستدعيها للحصول على الوصول إلى نسخة المخزن. ويمكننا بعد ذلك الإشارة إلى قيمة <code>numbers</code> في المخزن داخل قالب المكوّن.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{{ store.numbers }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { useNumbersStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../store&quot;</span>;

<span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useNumbersStore</span>();

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>وفي المكوّن <code>NumberSubmit</code>، يمكننا فعل الشيء نفسه كما في الأعلى للوصول إلى طريقة المخزن <code>addNumber()</code> التي ستُستخدم لتحديث خاصية <code>numbers</code> في المخزن.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;numberInput&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;store.addNumber(numberInput)&quot;</span>&gt;</span>Add new number<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> { useNumbersStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../store&quot;</span>;

<span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useNumbersStore</span>();

<span class="hljs-keyword">const</span> numberInput = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع هذه التغييرات، سيتصرّف تطبيقنا تمامًا كما كان من قبل.</p>
<p>JavaScript iconstore.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { defineStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;pinia&quot;</span>;
  <span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> useNumbersStore = <span class="hljs-title function_">defineStore</span>(<span class="hljs-string">&quot;numbers&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">ref</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
  
    <span class="hljs-keyword">function</span> <span class="hljs-title function_">addNumber</span>(<span class="hljs-params">newNumber</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">numbers</span>.<span class="hljs-title function_">push</span>(newNumber);
    }
  
    <span class="hljs-keyword">return</span> { numbers, addNumber };
  });
</code></pre>
<p><a href="https://codesandbox.io/embed/state-management-4-3tr5qr">Open CodeSandbox</a></p>
<p>بالنسبة إلى تطبيق بسيط كتطبيق، قد لا يكون مخزن Pinia ضروريًا حقًا، وسلوكه قريب جدًا من مجرد استخدام مخزن أُنشئ بالدالة <code>reactive()</code> ومع ذلك، يقدّم Pinia قدرات إضافية لحالات الاستخدام الأكثر تعقيدًا، مثل القدرة على <a href="https://pinia.vuejs.org/core-concepts/plugins.html">توسيع ميزات Pinia عبر الإضافات</a>، والحصول على دعم لأدوات المطوّر (devtools)، وامتياز <a href="https://pinia.vuejs.org/core-concepts/state.html#typescript">دعم TypeScript</a> و<a href="https://pinia.vuejs.org/ssr/nuxt.html">دعم العرض في الخادم</a> الأكثر ملاءمة.</p>
<p><img src="/images/patterns-dev/vue-state-management-4-pinia_vue_devtools.webp" alt="Pinia داخل أدوات مطوّر Vue"></p>
<h2 id="ما-هي-الطريقة-الصحيحة">ما هي الطريقة الصحيحة؟</h2>
<p>لكل طريقة لإدارة حالة مستوى التطبيق مزاياها وعيوبها.</p>
<h3 id="مخزن-بسيط">مخزن بسيط</h3>
<ul>
<li><strong>الإيجابي</strong>: سهل الإنشاء نسبيًا.</li>
<li><strong>السلبي</strong>: الحالة وتغيّرات الحالة المحتملة غير معرّفة صراحةً.</li>
</ul>
<h3 id="pinia">Pinia</h3>
<ul>
<li><strong>الإيجابي</strong>: دعم أدوات المطوّر، وإضافات + typescript + دعم العرض في الخادم</li>
<li><strong>السلبي</strong>: شيفرة تمهيدية (boilerplate) إضافية.</li>
</ul>
<p>في النهاية، الأمر يعود إلينا في فهم ما هو مطلوب في تطبيقنا وما قد يكون أفضل نهج.</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/components/props.html#props">الخصائص | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/components/events.html#component-events">أحداث المكوّنات | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api">إدارة حالة بسيطة عبر واجهة التفاعلية | توثيق Vue</a></li>
<li><a href="https://pinia.vuejs.org/core-concepts/">المفاهيم الأساسية | Pinia</a></li>
</ul>
`,c={book:s,chapter:"vue",chapterTitle:n,slug:a,title:p,headings:l,html:t};export{s as book,e as chapter,n as chapterTitle,c as default,l as headings,t as html,a as slug,p as title};
