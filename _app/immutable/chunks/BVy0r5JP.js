const s="patterns-dev",e="vue",n="أنماط Vue",a="composables",p="دوال التركيب",l=[{depth:2,id:"options-api",text:"Options API"},{depth:2,id:"composition-api",text:"Composition API"},{depth:2,id:"دوال-التركيب-composables",text:"دوال التركيب (composables)"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],t=`<h2 id="options-api">Options API</h2>
<p>قبل تقديم Composition API في Vue، كان المطوّرون يعتمدون على <strong>Options API</strong> لتنظيم منطق المكوّنات، والذي يشمل البيانات التفاعلية (reactive data)، ودورات الحياة، والخصائص المحسوبة (computed properties)، وغيرها. سمحت Options API بتعريف هذه الجوانب ضمن خيارات محدّدة، كما هو موضح في المثال أدناه:</p>
<pre><code class="language-javascript">&lt;!-- <span class="hljs-title class_">Template</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;MyComponent&quot;</span>,

<span class="hljs-attr">props</span>: {

<span class="hljs-comment">// props</span>

},

<span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {

<span class="hljs-comment">// data</span>

},

<span class="hljs-attr">computed</span>: {

<span class="hljs-comment">// computed properties</span>

},

<span class="hljs-attr">watch</span>: {

<span class="hljs-comment">// properties to watch</span>

},

<span class="hljs-attr">methods</span>: {

<span class="hljs-comment">// methods</span>

},

<span class="hljs-title function_">created</span>(<span class="hljs-params"></span>) {

<span class="hljs-comment">// lifecyle methods like created</span>

},

<span class="hljs-comment">// ...</span>

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!-- <span class="hljs-title class_">Styles</span> --&gt;
</code></pre>
<p>رغم أن هذا النهج يؤدّي غرضه ولا يزال قابلًا للتطبيق في Vue v3، إلا أنه قد يصبح صعب الإدارة والصيانة مع نمو المكوّنات وتعقيدها. فتعريف منطق المكوّن ضمن خيارات محدّدة يجعل قراءة الشيفرة وفهمها أصعب، خصوصًا عند التعامل مع مكوّنات كبيرة. كما يصبح استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات صعبًا في هذا الإعداد.</p>
<p>لننظر إلى مثال بسيط لمكوّن <code>App</code> يعرض مكوّنين فرديين تابعين له — <code>Count</code> و<code>Width</code>.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,

<span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> {

<span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,

<span class="hljs-attr">width</span>: <span class="hljs-number">0</span>,

};

},

<span class="hljs-title function_">mounted</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">handleResize</span>();

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">handleResize</span>);

},

<span class="hljs-title function_">beforeUnmount</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">handleResize</span>);

},

<span class="hljs-attr">methods</span>: {

<span class="hljs-title function_">increment</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">count</span>++;

},

<span class="hljs-title function_">decrement</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">count</span>--;

},

<span class="hljs-title function_">handleResize</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">width</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;

},

},

<span class="hljs-attr">components</span>: {

<span class="hljs-title class_">Count</span>,

<span class="hljs-title class_">Width</span>,

},

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمثّل مقتطف الشيفرة أعلاه مكوّن Vue أحادي الملف (SFC) باسم <code>App</code>.</p>
<p>يحدّد قسم <code>ترميز المكوّن (markup). وفي حالتنا هذه، يحتوي على عنصر</code> بالتصنيف “App” يلتف بمكوّنين تابعين: <code> و</code>. وتُمرَّر بعض الخصائص إلى هذين المكوّنين التابعين باستخدام صيغة ربط السمات في Vue (<code>:count</code> و<code>:increment</code> و<code>:decrement</code> و<code>:width</code>).</p>
<p>يحتوي قسم \`\` على شيفرة JavaScript الخاصة بالمكوّن. وهو يبدأ باستيراد المكوّنَين <code>Count</code> و<code>Width</code> من ملفّيهما. وتُستخدم عبارة <code>export default</code> لتصدير تعريف المكوّن. وداخل تعريف المكوّن لدينا:</p>
<ul>
<li>الدالة <code>data</code> التي تُعيد كائنًا يحتوي على خصائص البيانات الأولية للمكوّن، وهي <code>count</code> و<code>width</code> المهيّأَين إلى 0.</li>
<li>خطّاف دورة الحياة <code>mounted()</code> يُستخدم لتنفيذ الشيفرة بعد أن يكون المكوّن قد ثُبِّت في DOM. وفي هذه الحالة، يستدعي الدالة <code>handleResize()</code> ويضيف مستمعًا لحدث تغيير الحجم (resize).</li>
<li>خطّاف دورة الحياة <code>beforeUnmount()</code> يُستخدم لتنفيذ الشيفرة قبل أن يُزال المكوّن ويُدمَّر. وهنا يزيل مستمع الحدث الخاص بتغيير الحجم.</li>
<li>يحتوي الكائن <code>methods</code> على دوال المكوّن. وهو يعرّف الدوال <code>increment()</code> و<code>decrement()</code> و<code>handleResize()</code> التي تتلاعب بخصائص البيانات <code>count</code> و<code>width</code> استنادًا إلى أحداث أو إجراءات معيّنة.</li>
</ul>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
 &lt;/template&gt;
 
 <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
 <span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;
 <span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;
 
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,
  <span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">width</span>: <span class="hljs-number">0</span>,
    };
  },
  <span class="hljs-title function_">mounted</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">handleResize</span>();
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">handleResize</span>);
  },
  <span class="hljs-title function_">beforeUnmount</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">handleResize</span>);
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-title function_">increment</span>(<span class="hljs-params"></span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">count</span>++;
    },
    <span class="hljs-title function_">decrement</span>(<span class="hljs-params"></span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">count</span>--;
    },
    <span class="hljs-title function_">handleResize</span>(<span class="hljs-params"></span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">width</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;
    },
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-title class_">Count</span>,
    <span class="hljs-title class_">Width</span>,
  },
 };
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-1-srzc9w">فتح CodeSandbox</a></p>
<p>عند تشغيل التطبيق، يُعرض العدد الحالي والعرض الداخلي للنافذة في الوقت الفعلي. ويمكن للمستخدم التفاعل مع المكوّن عبر زيادة العدد أو إنقاصه باستخدام الأزرار في مكوّن \`\`.</p>
<p><img src="/images/patterns-dev/vue-composables-0-composables_count.webp" alt="دالة تركيب تُدار العدّاد"></p>
<p>وبالمثل، يُحدَّث العرض تلقائيًا كلما أُعيد تغيير حجم النافذة.</p>
<p><img src="/images/patterns-dev/vue-composables-1-composables_width.webp" alt="توسيع وتصغير عرض النافذة"></p>
<p>يمكن تصور بنية مكوّن <code>App.vue</code> أحادي الملف على النحو التالي:</p>
<p><img src="/images/patterns-dev/vue-composables-2-options_api_breakdown.webp" alt="مخطط تدفّق يوضّح الخيارات وOptions API"></p>
<p>رغم أن حجم هذا المكوّن صغير، فإن المنطق بداخله أصبح متشابكًا بالفعل. فبعض الأجزاء مخصّصة لوظيفة العدّاد، بينما تتعلّق أجزاء أخرى بمنطق العرض. ومع نمو المكوّن، يصبح تنظيم المنطق المرتبط داخله والعثور عليه أكثر صعوبة.</p>
<p>لمعالجة هذه التحديات، قدّم فريق Vue واجهة Composition API في Vue v3.</p>
<h2 id="composition-api">Composition API</h2>
<p>يمكن النظر إلى Composition API على أنها <strong>واجهة برمجية توفّر دوال مستقلة تمثّل القدرات الأساسية لـ Vue</strong>. وتُستخدم هذه الدوال أساسًا داخل خيار <code>setup()</code> واحد يعمل كنقطة دخول لاستخدام Composition API.</p>
<pre><code class="language-javascript">&lt;!-- <span class="hljs-title class_">Template</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;MyComponent&quot;</span>,

<span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {

<span class="hljs-comment">// the setup function</span>

},

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!-- <span class="hljs-title class_">Styles</span> --&gt;
</code></pre>
<p>تُنفَّذ الدالة <code>setup()</code> قبل إنشاء المكوّن، وحين تكون خصائص المكوّن متاحة.</p>
<p>مع Composition API، يمكننا استيراد دوال مستقلة تساعدنا على الوصول إلى القدرات الأساسية لـ Vue داخل مكوّننا. لنُعِد كتابة مثال العدّاد والعرض الذي رأيناه أعلاه مع الاعتماد على صيغة Composition API.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref, onMounted, onBeforeUnmount } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,

<span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> width = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {

count.<span class="hljs-property">value</span>++;

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">decrement</span> = (<span class="hljs-params"></span>) =&gt; {

count.<span class="hljs-property">value</span>--;

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleResize</span> = (<span class="hljs-params"></span>) =&gt; {

width.<span class="hljs-property">value</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;

};

<span class="hljs-title function_">onMounted</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-title function_">handleResize</span>();

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);

});

<span class="hljs-title function_">onBeforeUnmount</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);

});

<span class="hljs-keyword">return</span> {

count,

width,

increment,

decrement,

};

},

<span class="hljs-attr">components</span>: {

<span class="hljs-title class_">Count</span>,

<span class="hljs-title class_">Width</span>,

},

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يبقى قسم <code>لمكوّننا كما هو، لكن في قسم</code> من مكوّننا نستخدم الآن Composition API مع الدالة <code>setup()</code>.</p>
<p>داخل الدالة <code>setup()</code>، نحن:</p>
<ul>
<li>نعرّف المتغيّرين التفاعليَّين <code>count</code> و<code>width</code> باستخدام الدالة <code>ref()</code> — وهي الدالة التي تقبل قيمة أولية واحدة (مثل سلسلة نصية أو رقم وغيرها) وتُعيد كائنًا تفاعليًّا قابلًا للتغيير.</li>
<li>نعرّف كذلك الدوال المخصّصة <code>increment()</code> و<code>decrement()</code> و<code>handleResize()</code>. وهذه الدوال مشابهة للدوال التي عرّفناها في مثال Options API السابق.</li>
<li>نستخدم دالة دورة الحياة <code>onMounted()</code> لاستدعاء الدالة المخصّصة <code>handleResize()</code> وإضافة مستمع لحدث تغيير الحجم عند تركيب المكوّن. وبالمثل، نستخدم دالة دورة الحياة <code>onBeforeUnmount()</code> لإزالة مستمع حدث تغيير الحجم قبل إزالة المكوّن.</li>
<li>تُعاد بعدها المتغيّرات التفاعلية والدوال المعرَّفة في الدالة <code>setup()</code>، مما يجعلها متاحة في قالب المكوّن.</li>
</ul>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref, onMounted, onBeforeUnmount } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,
  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">const</span> width = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
      count.<span class="hljs-property">value</span>++;
    };

<span class="hljs-keyword">const</span> <span class="hljs-title function_">decrement</span> = (<span class="hljs-params"></span>) =&gt; {
      count.<span class="hljs-property">value</span>--;
    };

<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleResize</span> = (<span class="hljs-params"></span>) =&gt; {
      width.<span class="hljs-property">value</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;
    };

<span class="hljs-title function_">onMounted</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">handleResize</span>();
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);
    });

<span class="hljs-title function_">onBeforeUnmount</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);
    });

<span class="hljs-keyword">return</span> {
      count,
      width,
      increment,
      decrement,
    };
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-title class_">Count</span>,
    <span class="hljs-title class_">Width</span>,
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-2-0j3l8z">فتح CodeSandbox</a></p>
<h2 id="دوال-التركيب-composables">دوال التركيب (composables)</h2>
<p>مع مثال الشيفرة السابق، قد لا يزال يتساءل أحد كيف تقدّم الدالة <code>setup()</code> أي ميزة للتطوير، إذ يبدو أنها ببساطة تطلب إلينا تصريح خيارات المكوّن ضمن دالة واحدة.</p>
<p>من بين الفوائد الرائعة لاعتماد Composition API هي <strong>القدرة على استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات</strong>. ويرجع هذا الأمر إلى أننا نستطيع ببساطة تصريح دوال خاصة بنا تستخدم دوال التركيب (composition functions) المتاحة عالميًا في Vue، ويصبح من الممكن أن تكون دوالنا <em>سهلة الاستخدام في عدّة مكوّنات لتحقيق النتيجة نفسها</em>.</p>
<p>لنأخذ مثال العدّاد والعرض السابق خطوة أبعد، بإنشاء دوال تركيب (composables) تُغلّف المنطق المشترك بحيث يمكن إعادة استخدامه عبر المكوّنات.</p>
<p>أولًا، لننشئ دالة تركيب (composable) اسمها <code>useCounter</code>، وهي دالة تركيب تُغلّف وظيفة العدّاد وتُعيد القيمة الحالية لـ <code>count</code>، إضافة إلى دالة <code>increment()</code> ودالة <code>decrement()</code>.</p>
<blockquote>
<p>بحكم العرف، تبدأ أسماء دوال التركيب بكلمة المفتاح &quot;use&quot;.</p>
</blockquote>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useCounter</span>(<span class="hljs-params">initialCount = <span class="hljs-number">0</span></span>) {

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(initialCount);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">increment</span>(<span class="hljs-params"></span>) {

count.<span class="hljs-property">value</span>++;

}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">decrement</span>(<span class="hljs-params"></span>) {

count.<span class="hljs-property">value</span>--;

}

<span class="hljs-keyword">return</span> {

count,

increment,

decrement,

};

}
</code></pre>
<p>وبالمثل، يمكننا إنشاء دالة تركيب اسمها <code>useWidth()</code> تُغلّف وظيفة العرض في تطبيقنا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { ref, onMounted, onBeforeUnmount } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useWidth</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> width = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleResize</span>(<span class="hljs-params"></span>) {

width.<span class="hljs-property">value</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;

}

<span class="hljs-title function_">onMounted</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-title function_">handleResize</span>();

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);

});

<span class="hljs-title function_">onBeforeUnmount</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;resize&quot;</span>, handleResize);

});

<span class="hljs-keyword">return</span> {

width,

};

}
</code></pre>
<p>في مكوّن <code>App</code> لدينا، يمكننا الآن استخدام دوال التركيب لتحقيق النتيجة نفسها:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;

<span class="hljs-keyword">import</span> { useCounter } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./composables/useCounter&quot;</span>;

<span class="hljs-keyword">import</span> { useWidth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./composables/useWidth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,

<span class="hljs-attr">components</span>: {

<span class="hljs-title class_">Count</span>,

<span class="hljs-title class_">Width</span>,

},

<span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> { count, increment, decrement } = <span class="hljs-title function_">useCounter</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> { width } = <span class="hljs-title function_">useWidth</span>();

<span class="hljs-keyword">return</span> {

count,

increment,

decrement,

width,

};

},

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع هذه التغييرات، سيعمل تطبيقنا كما كان عليه من قبل، لكن ضمن إعداد أكثر قابلية للتركيب.</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Count</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:increment</span>=<span class="hljs-string">&quot;increment&quot;</span> <span class="hljs-attr">:decrement</span>=<span class="hljs-string">&quot;decrement&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;divider&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Width</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">&quot;width&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Count</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Count.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Width</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Width.vue&quot;</span>;
<span class="hljs-keyword">import</span> { useCounter } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./composables/useCounter&quot;</span>;
<span class="hljs-keyword">import</span> { useWidth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./composables/useWidth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-title class_">Count</span>,
    <span class="hljs-title class_">Width</span>,
  },
  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> { count, increment, decrement } = <span class="hljs-title function_">useCounter</span>(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">const</span> { width } = <span class="hljs-title function_">useWidth</span>();

<span class="hljs-keyword">return</span> {
      count,
      increment,
      decrement,
      width,
    };
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-3-zr4q7x">فتح CodeSandbox</a></p>
<p>باستخدام دوال التركيب ضمن إعداد Composition API، تمكّنّا من تفكيك سياق تطبيقنا إلى أجزاء أصغر قابلة لإعادة الاستخدام تفصل المنطق عن بعضها.</p>
<p>لنُصوِّر التغييرات التي أجريناها للتو مقارنةً بمثال المكوّن الأول في Options API.</p>
<p><img src="/images/patterns-dev/vue-composables-3-composables_breakdown.webp" alt="مخطط تدفّق لتفكيك دالة التركيب إلى أجزاء"></p>
<p>أدى استخدام دوال التركيب في Vue إلى تسهيل فصل منطق مكوّننا إلى عدة أجزاء أصغر. وأصبحت إعادة استخدام المنطق ذي الحالة نفسه سهلة الآن، إذ لم نعد مقيدين بتنظيم شيفرتنا ضمن خيارات محدّدة في Options API.</p>
<p>مع دوال التركيب، لدينا المرونة لاستخراج المنطق المشترك وإعادة استخدامه عبر المكوّنات. وهذا الفصل بين المسؤوليات يتيح لنا التركيز على وظيفة محدّدة داخل كل دالة تركيب، مما يجعل شيفرتنا <strong>أكثر وحداتية وأسهل في الصيانة</strong>.</p>
<p>وبتقسيم المنطق إلى أجزاء أصغر قابلة لإعادة الاستخدام، يمكننا تركيب مكوّناتنا باستخدام دوال التركيب هذه، فتجتمع الوظائف اللازمة دون تكرار الشيفرة. ويشجّع هذا النهج على <strong>إعادة استخدام الشيفرة</strong> ويقلّل خطر ازدواج الشيفرة والتعارضات فيها.</p>
<p>إضافةً إلى ذلك، يوفّر استخدام Composition API <strong>قابلية قراءة</strong> و<strong>فَهْم</strong> أفضل لمنطق المكوّن. فكل دالة تركيب تُغلّف جانبًا محدّدًا من سلوك المكوّن، مما يجعل التفكير فيه واختباره أسهل. كما يتيح تعاونًا أسهل بين أعضاء الفريق، لأن الشيفرة تصبح أكثر تنظيمًا ونظامًا.</p>
<p>وأخيرًا، يتيح بناء تطبيقات Vue باستخدام Composition API <strong>استنتاج الأنواع (type inference)</strong> بشكل أفضل. ولأن Composition API تساعدنا على التعامل مع منطق المكوّن عبر المتغيّرات ودوال JavaScript القياسية، يصبح بناء تطبيقات Vue واسعة النطاق باستخدام نظام أنواع ساكن مثل TypeScript أسهل بكثير!</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/reusability/composables.html">دوال التركيب | توثيق Vue</a></li>
<li><a href="https://vueuse.org/">مجموعة من أدوات Utility الخاصة بـ Vue Composition API | VueUse</a></li>
</ul>
`,c={book:s,chapter:"vue",chapterTitle:n,slug:a,title:p,headings:l,html:t};export{s as book,e as chapter,n as chapterTitle,c as default,l as headings,t as html,a as slug,p as title};
