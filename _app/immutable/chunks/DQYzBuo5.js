const s="patterns-dev",e="vue",a="أنماط Vue",n="provide-inject",p="التوفير/الحقن",l=[{depth:2,id:"التوفيرالحقن-provideinject",text:"التوفير/الحقن (Provide/Inject)"},{depth:2,id:"الخصائص-مقابل-التوفيرالحقن-props-vs-provideinject",text:"الخصائص مقابل التوفير/الحقن (Props vs. provide/inject)"},{depth:3,id:"مع-الخصائص-props",text:"مع الخصائص (props):"},{depth:3,id:"مع-التوفيرالحقن-provideinject",text:"مع التوفير/الحقن (provide/inject)"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],t=`<p>عند إدارة البيانات بين المكوّنات الأم والمكوّنات الفرعية، تمنحنا Vue القدرة على استخدام ما يُعرف بـ<strong>الخصائص (props)</strong> لتمرير البيانات من الأب إلى الابن. ولا يمكن أن تتدفّق الخصائص إلا في اتجاه واحد، من المكوّنات الأم إلى المكوّنات الفرعية (وما دونها). وعندما تحدث تغييرات في الحالة على العناصر الأمّية، فإن Vue ستعيد عرض المكوّنات التي تعتمد على تلك القيم.</p>
<p><img src="/images/patterns-dev/vue-provide-inject-0-props.webp" alt="تمرير الخصائص من الأعلى إلى الأسفل"></p>
<p>تعمل الخصائص (props) بشكل جيّد في معظم الحالات. لكن عند العمل في تطبيقات كبيرة تحتوي على عدد كبير من المكوّنات في شجرة المكوّنات، قد يصبح صعبًا صيانة الخصائص، إذ يلزم التصريح بها في <em>كل مكوّن على حدة</em> ضمن شجرة المكوّنات.</p>
<p><img src="/images/patterns-dev/vue-provide-inject-1-nested_props.webp" alt="خصائص متداخلة عبر مستويات متعددة"></p>
<p>وعند التفكير في كيفية إدارة البيانات بين عدد كبير من المكوّنات، فإن الأفضل غالبًا هو التوجّه نحو حلّ يتيح إدارة حالة على مستوى التطبيق بطريقة قابلة للصيانة والتسيير (مثل إنشاء مخزن قابل لإعادة الاستخدام، أو استخدام Pinia، إلخ). وقد تناولنا هذا بالتفصيل في دليل <a href="/book/patterns-dev/vue/state-management">إدارة الحالة</a>.</p>
<p>لكن Vue توفّر أيضًا نمطًا معيّنًا يساعد على تجنّب الحاجة إلى حَفْر الخصائص (prop drilling) المعقّد في تطبيق Vue، ويُعرف بـ provide/inject.</p>
<h2 id="التوفيرالحقن-provideinject">التوفير/الحقن (Provide/Inject)</h2>
<p>تتيح لنا الدالة <code>provide()</code> في Vue تمرير البيانات عبر شجرة مكوّنات دون الحاجة إلى <em>حَفْر الخصائص</em> (أي تمرير الخصائص يدويًا في كل مستوى). ومن جهة أخرى، يُستخدم الخيار <code>inject()</code> في المكوّنات الفرعية للوصول إلى البيانات أو الدوال الموفَّرة من المكوّن الأب أو أيّ مكوّن سلف (ancestor).</p>
<p><img src="/images/patterns-dev/vue-provide-inject-2-provide_inject.webp" alt="مقارنة بين تمرير الخصائص والتوفير والحقن"></p>
<p>لنمرّ على مثال بسيط لتوضيح كيفية accomplishing ذلك. لنفترض لدينا مكوّن أب اسمه <code>App</code> يريد مشاركة جزء من البيانات مع مكوّنه الابن <code>ChildComponent</code>. وبدلًا من تمرير هذه البيانات كخاصية (prop)، يمكننا استخدام <code>provide()</code> في المكوّن الأب لجعل البيانات متاحة لجميع مكوّناته الفرعية.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { provide } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChildComponent&quot;</span>;

<span class="hljs-title function_">provide</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;Data from parent!&quot;</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمكننا عندها الوصول إلى هذه البيانات الموفَّرة في <code>ChildComponent</code> بفضل الدالة <code>inject()</code>.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{{ data }}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { inject } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> data = <span class="hljs-title function_">inject</span>(<span class="hljs-string">&quot;data&quot;</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>بتحديد <code>inject(&quot;data&quot;)</code> في المكوّن الفرعي (<code>ChildComponent</code>)، فإننا نصل مباشرةً إلى قيمة <code>data</code> الموفَّرة من المكوّن الأب. ثم نربط <code>data</code> بالقالب لعرض قيمتها.</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { provide } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChildComponent&quot;</span>;

<span class="hljs-title function_">provide</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;Data from parent!&quot;</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/provide-inject-1-xqhxlm">فتح CodeSandbox</a></p>
<p>مع provide/inject، سنلاحظ السلوك نفسه الذي رأيناه أعلاه حتى لو كان لدينا عدد كبير من المكوّنات الفرعية ضمن شجرة التسلسل الهرمي للمكوّنات. وكمثال، لنفترض لدينا المكوّنات <code> و</code> و<code> و</code> و\`\` بحيث يكون كل مكوّن فرعي أبًا للمكوّن الذي يليه.</p>
<pre><code class="language-javascript">&lt;!-- <span class="hljs-title class_">ChildComponent5</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{{ data }}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { inject } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> data = <span class="hljs-title function_">inject</span>(<span class="hljs-string">&quot;data&quot;</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;

&lt;!-- <span class="hljs-title class_">ChildComponent4</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent5</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent5</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent5&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;

&lt;!-- <span class="hljs-title class_">ChildComponent3</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent4</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent4</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent4&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;

&lt;!-- <span class="hljs-title class_">ChildComponent2</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent3</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent3</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent3&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;

&lt;!-- <span class="hljs-title class_">ChildComponent</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent2</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent2</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ChildComponent2&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;

&lt;!-- <span class="hljs-title class_">App</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { provide } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChildComponent&quot;</span>;

<span class="hljs-title function_">provide</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;Data from parent!&quot;</span>);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;!--  ------------- --&gt;
</code></pre>
<p>ستُعرض البيانات القادمة من المكوّن الأب <code>في المكوّن</code> دون الحاجة إلى حَفْر الخصائص عبر كل مكوّن في الشجرة، وذلك بفضل provide/inject!</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { provide } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChildComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChildComponent&quot;</span>;

<span class="hljs-title function_">provide</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;Data from parent!&quot;</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/provide-inject-2-6d5sd7">فتح CodeSandbox</a></p>
<p>إلى جانب قدرتنا على استدعاء <code>provide()</code> بالبيانات من مكوّن أب، يمكننا رفع <code>provide()</code> إلى مستوى التطبيق أيضًا (أي الموضع الذي أنشئ فيه تطبيق Vue).</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./App.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./styles.css&quot;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">createApp</span>(<span class="hljs-title class_">App</span>);

<span class="hljs-comment">// app-level provide</span>

app.<span class="hljs-title function_">provide</span>(<span class="hljs-string">&quot;data&quot;</span>, <span class="hljs-string">&quot;Data from parent!&quot;</span>);

app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&quot;#app&quot;</span>);
</code></pre>
<p>وبما أن عمليات التوفير على مستوى التطبيق تجعل البيانات متاحة لـ<em>جميع</em> المكوّنات، فإنها غالبًا مفيدة عند إنشاء <a href="https://vuejs.org/guide/reusability/plugins.html">الإضافة (plugins)</a> — وهي شيفرة مكتفية بذاتها تضيف وظائف إلى تطبيق Vue بأكمله.</p>
<h2 id="الخصائص-مقابل-التوفيرالحقن-props-vs-provideinject">الخصائص مقابل التوفير/الحقن (Props vs. provide/inject)</h2>
<p>متى نختار بين الخصائص ونمط provide/inject؟ كلا النهجين له مزاياه وعيوبه.</p>
<h3 id="مع-الخصائص-props">مع الخصائص (props):</h3>
<ul>
<li>نتبع نمطًا واضحًا يمرّر البيانات تدريجيًا من مستوى إلى آخر (ميزة).</li>
<li>لكن إذا احتوت شجرة التسلسل الهرمي لمكوّناتنا على عدد كبير من المكوّنات، فإن عملية تمرير بيانات الخصائص مستوى بعد مستوى قد تصبح مرهقة (عيب).</li>
</ul>
<h3 id="مع-التوفيرالحقن-provideinject">مع التوفير/الحقن (provide/inject)</h3>
<ul>
<li>يمكن للمكوّنات الفرعية الوصول مباشرةً إلى بيانات المكوّنات الأمّية التي تقع عدة مستويات أعلى، مما يلغي الحاجة إلى تمرير البيانات في كل مستوى (ميزة).</li>
<li>لكن عند ظهور الأخطاء،قد يصبح التصحيح (debugging) أصعب مع provide/inject. ويصبح هذا التحدي أكثر وضوحًا في التطبيقات واسعة النطاق التي تحتوي على مزوّدين (providers) مختلفين كثيرين (عيب).</li>
</ul>
<p>نمط provide/inject هو الأنسب على الإطلاق لبيانات العميل على مستوى التطبيق، مثل معلومات السمة (theme)، وتفضيلات اللغة أو المنطقة المحلية (locale)، وتفاصيل مصادقة المستخدم. فهذه الأنواع من البيانات تُدار بشكل أفضل عبر provide/inject، لأن أيّ مكوّن داخل التطبيق قد يحتاج إلى الوصول إليها في أي وقت.</p>
<p>ومن جهة أخرى، تكون الخصائص (props) مثالية عندما تحتاج البيانات إلى أن تبقى معزولة ضمن مجموعة محدّدة من المكوّنات فقط.</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/components/provide-inject.html">Provide / Inject | توثيق Vue</a></li>
</ul>
`,c={book:s,chapter:"vue",chapterTitle:a,slug:n,title:p,headings:l,html:t};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,t as html,n as slug,p as title};
