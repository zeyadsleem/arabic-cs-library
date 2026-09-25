const s="patterns-dev",t="vue",n="أنماط Vue",a="render-functions",p="دوال العرض",l=[{depth:2,id:"لكن-لماذا",text:"لكن لماذا؟"},{depth:2,id:"دوال-العرض",text:"دوال العرض"},{depth:2,id:"دوال-العرض-وjsx",text:"دوال العرض وJSX"},{depth:2,id:"المكونات-الوظيفية",text:"المكوّنات الوظيفية"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],e=`<p>يوصي Vue بأن نستخدم القوالب (أي صيغة \`\`) لبناء ترميز (markup) مكوّنات Vue. غير أننا نُتاح لنا أيضًا فرصة استخدام ما يُعرف بـ <strong>دوال العرض</strong> (render functions) مباشرة لبناء ترميز مكوّناتنا كذلك.</p>
<p>يأخذ Vue القوالب التي ننشئها لمكوّناتنا وقت البناء (build time) ويترجمها إلى دوال عرض. وعند دوال العرض المترجمة هذه، يبني Vue تمثيلًا افتراضيًا للعقد التي تشكّل الـ DOM الافتراضي (virtual DOM).</p>
<blockquote>
<p>إذا كنت مهتمًا، فإن قسم <a href="https://vuejs.org/guide/extras/rendering-mechanism.html">آلية العرض</a> في توثيق Vue يتعمّق أكثر في مفهوم الـ DOM الافتراضي وآلية العرض الداخلية في Vue.</p>
</blockquote>
<p>باستخدام دوال العرض، فإننا نتخطّى خطوة الترجمة التي يقوم بها Vue لترجمة قوالبنا، ونتمكّن من بناء قوالب مكوّناتنا بمساعدة JavaScript البرمجية.</p>
<h2 id="لكن-لماذا">لكن لماذا؟</h2>
<p>تدخل دوال العرض إلى الصورة عندما نحتاج إلى مستوى أعلى من التخصيص والمرونة ليسهل تحقيقه بصيغة القوالب المعيارية. قد يبدو هذا غير بديهي في البداية، ولا سيما بالنظر إلى تركيز Vue على بساطة نظام القوالب وقابليته للقراءة. باختصار، قد تفضّل استخدام دوال العرض:</p>
<ul>
<li>عندما تحتاج إلى عرض المكوّنات أو العناصر ديناميكيًا بناءً على منطق معقّد يكون التعبير عنه داخل قالب مرهقًا.</li>
<li>عندما تريد الإمساك مباشرةً بالـ DOM الافتراضي لإجراء تعديلات متقدّمة.</li>
<li>عندما تريد استخدام JSX لبناء قالب مكوّناتك.</li>
</ul>
<p>خارج هذه الحالات الفريدة، ينبغي أن تبقى صيغة قوالب Vue هي الطريقة المفضّلة لبناء ترميز المكوّنات. لكن في المواقف الفريدة، قد يكون من المهمّ فهم كيفية عمل دوال العرض. لذا سنغوص في هذا المقال في دوال العرض ونستكشف كيفية استخدامها لبناء مكوّن أساسي.</p>
<h2 id="دوال-العرض">دوال العرض</h2>
<p>لنفترض لدينا المكوّن التالي الذي يحتوي على عنصر <code>يضمّ عنصر</code> بداخله. ويعرض المحتوى النصّي للعنصر \`\` ببساطة قيمة الخاصية <code>message</code>.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;render-card&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-header card-header-title&quot;</span>&gt;</span>{{ message }}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>سنعيد إنشاء ترميز المكوّن خطوةً بخطوة بمساعدة دالة العرض — أي الدالة <code>h()</code>.</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

&lt;/script&gt;
</code></pre>
<p><code>h</code> اختصار لكلمة <strong>hyperscript</strong>، وهي مصطلح يُستخدم كثيرًا في تطبيقات الـ DOM الافتراضي للإشارة إلى صيغة JavaScript التي تُنتج HTML. وبعبارة مبسّطة، الدالة <code>h()</code> هي دالة العرض التي تتيح لنا إنشاء التمثيل «الافتراضي» لعقد الـ DOM التي يستخدمها Vue لتتبّعها ثمّ عرضها على الصفحة.</p>
<p>تأخذ الدالة <code>h()</code> ثلاثة وسائط خاصة بها:</p>
<ul>
<li>اسم وسم HTML أو تعريف مكوّن.</li>
<li>الخصائص (props) والسمات (attributes) التي ستُمرَّر إلى العنصر (مستمعات الأحداث، سمات <code>class</code>، إلخ).</li>
<li>العقد الفرعية للعقدة الأصل.</li>
</ul>
<p>اسم وسم HTML للعقدة الأصل التي نريد إنشاءها هو عنصر \`\`. سنُسند نتيجة الدالة <code>h()</code> إلى ثابت يحمل الاسم <code>render</code> ونمرّر سلسلة قيمتها <code>'div'</code> كوسيط أول:</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(<span class="hljs-string">&quot;div&quot;</span>);

};

&lt;/script&gt;
</code></pre>
<p>سنهتمّ بتطبيق صنف CSS ذا الاسم <code>.render-card</code> على عنصر \`\` الأصل. ولتحقيق ذلك، سنصرّح في الوسيط الثاني من الدالة <code>h()</code> بأن كائن البيانات يحتوي على خاصية <code>class</code> قيمتها سلسلة نصّية هي <code>'render-card'</code>:</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(<span class="hljs-string">&quot;div&quot;</span>, {

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

});

};

&lt;/script&gt;
</code></pre>
<blockquote>
<p>ورغم أننا لن نفعل الكثير في هذا المثال، هناك طرق عديدة ومختلفة لتعريف السمات باستخدام كائن البيانات في الوسيط الثاني. إذا كنت مهتمًا، فبالتأكّد من الاطّلاع على <a href="https://vuejs.org/guide/extras/render-function.html#creating-vnodes">توثيق Vue</a> للحصول على ملخّص جيّد.</p>
</blockquote>
<p>سنريد أن يحتوي عنصر <code>الأصل على عنصر</code> فرعي خاص به. وفي الوسيط الثالث من الدالة <code>h()</code>، يمكننا إمّا تحديد سلسلة نصّية بسيطة لعرض نصّ، أو مصفوفة لعرض عقد افتراضية أكثر (أي عناصر أكثر).</p>
<p>ولأننا سنعرض عنصرًا آخر مُولَّدًا كعنصر فرعي، سنصرّح بالدالة <code>h()</code> داخل مصفوفة العقد الفرعية ونعطيها قيمة سلسلة نصّية هي <code>'header'</code>:</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;div&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

},

[<span class="hljs-title function_">h</span>(<span class="hljs-string">&quot;header&quot;</span>)]

);

};

&lt;/script&gt;
</code></pre>
<p>العنصر الفرعي <code>header</code> ينبغي أن يكون له أصناف خاصة به، لذا سنمرّر كائن سمات في الدالة <code>h()</code> المتداخلة تصريحًا بالأصناف التي ينبغي أن يحملها عنصر <code>header</code>:</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;div&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

},

[

<span class="hljs-title function_">h</span>(<span class="hljs-string">&quot;header&quot;</span>, {

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;card-header card-header-title&quot;</span>,

}),

]

);

};

&lt;/script&gt;
</code></pre>
<p>العنصر الفرعي <code>header</code> ينبغي ألّا يحتوي على أي عناصر فرعية خاصة به، وأن يعرض ببساطة قيمة الخاصية <code>message</code>. ولكي يعرض عنصر <code>header</code> الخاصية <code>message</code> كمحتوى فرعي له، سنصرّح بقيمة <code>message</code> في الوسيط الثالث من الدالة <code>h()</code> المتداخلة.</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;div&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

},

[

<span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;header&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;card-header card-header-title&quot;</span>,

},

message

),

]

);

};

&lt;/script&gt;
</code></pre>
<p>وهذا كل شيء! آخر ما تبقى لنا فعله هو وضع عنصر العقدة الافتراضية <code>render</code> الذي أنشأناه في قسم القالب داخل المكوّن.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">render</span> /&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-comment">/* eslint-disable-next-line no-undef, no-unused-vars */</span>

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-comment">/* eslint-disable-next-line no-unused-vars */</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;div&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

},

[

<span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;header&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;card-header card-header-title&quot;</span>,

},

message

),

]

);

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمكنك الآن المضي قدمًا وعرض المكوّن أعلاه في نسخة <code>App.vue</code> الأصل وتمرير قيمة <code>&quot;Hello World!&quot;</code> إلى الخاصية <code>message</code>.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RenderComponent</span> <span class="hljs-attr">message</span>=<span class="hljs-string">&quot;Hello world!&quot;</span> /&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> <span class="hljs-title class_">RenderComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/RenderComponent.vue&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>عند حفظ هذه التغييرات، سيُعرض لنا في واجهة المستخدم <code>“Hello World!”</code> ما يخبرنا أننا قد عرضنا المكوّن الفرعي على النحو المناسب.</p>
<p><img src="/images/patterns-dev/vue-render-functions-0-render_function.webp" alt="دالة العرض التي تُنتج العنصر"></p>
<p>يا إلهي. إذا كنت تشعر بالارتباك هنا، فلا داعي للقلق. فرغم أن دوال العرض تمنحنا قوة أكبر في تخصيص ترميز مكوّناتنا كما نرغب، فإن استخدام القوالب القياسية يكون عادةً <em>أسهل بكثير</em> في الغالبية العظمى من الوقت. ولا يُلجأ إلى دوال العرض إلا في الحالات الفريدة التي تتطلّب عرضًا ديناميكيًا معقّدًا أو تخصيصًا.</p>
<p>JavaScript iconRenderComponent.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">render</span> /&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-comment">/* eslint-disable-next-line no-undef, no-unused-vars */</span>
<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-comment">/* eslint-disable-next-line no-unused-vars */</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">render</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(
    <span class="hljs-string">&quot;div&quot;</span>,
    {
      <span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,
    },
    [
      <span class="hljs-title function_">h</span>(
        <span class="hljs-string">&quot;header&quot;</span>,
        {
          <span class="hljs-attr">class</span>: <span class="hljs-string">&quot;card-header card-header-title&quot;</span>,
        },
        message
      ),
    ]
  );
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/render-functions-1-r27yxv">Open CodeSandbox</a></p>
<h2 id="دوال-العرض-وjsx">دوال العرض وJSX</h2>
<p>كان سبب رئيسي يجعل التطبيق الذي أنجزناه أعلاه يبدو نوعًا ما مؤلمًا هو أننا كتبنا دالة العرض باستخدام JavaScript أصلية خام. وللمساعدة في جعل كتابة دوال العرض أسهل بكثير، يمنحنا Vue القدرة على كتابة دوال العرض باستخدام JSX بمساعدة <a href="https://github.com/vuejs/babel-plugin-jsx">إضافة Babel</a> مناسبة!</p>
<blockquote>
<p>إذا كنت قادمًا من خلفية React، فقد يكون JSX موضوعًا مألوفًا لك. وببساطة، JavaScript XML (أو ما هو معروف أكثر باسم JSX) هو امتداد يتيح لنا كتابة JavaScript يشبه HTML (أي كتابة صيغة شبيهة بـ XML داخل JavaScript).</p>
</blockquote>
<p>يمكن أن يساعد JSX على إعادة إنشاء تطبيق العرض الخاص بنا بطريقة أسهل بكثير في القراءة، لأننا نستطيع الكتابة بأمان داخل دالة العرض بصيغة HTML:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">render</span> /&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;jsx&quot;</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> render = (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;render-card&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-header card-header-title&quot;</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع JSX، لا تبدو دالة العرض صعبة البتّة! ومن المهمّ أن ندرك أن JSX هو أداة تطوير تحتاج دائمًا إلى أن تُترجم (transpile) بمساعدة حزمة Babel (مثل <a href="https://github.com/vuejs/babel-plugin-jsx">babel-plugin-jsx</a>) إلى JavaScript قياسية. ويمتلك كلٌّ من <a href="https://github.com/vuejs/create-vue">create-vue</a> و<a href="https://cli.vuejs.org/">Vue CLI</a> خيارات لتوليد مشاريع ذات دعم JSX مُهيّأ مسبقًا.</p>
<p>JavaScript iconRenderComponent.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">render</span> /&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;jsx&quot;</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">const</span> { message } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;message&quot;</span>]);

<span class="hljs-keyword">const</span> render = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;render-card&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-header card-header-title&quot;</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/render-functions-2-347w23">Open CodeSandbox</a></p>
<h2 id="المكونات-الوظيفية">المكوّنات الوظيفية</h2>
<p>المكوّنات الوظيفية (functional components)، وهي نوع من دوال العرض، توفّر طريقة لتعريف المكوّنات <strong>باستخدام دوال عادية</strong>. والمكوّنات الوظيفية هي نوع مميّز من المكوّنات يفتقر إلى حالة داخلية. وهي تشبه الدوال الخالصة (pure functions)، إذ تقبل الخصائص (props) كمدخلات وتُنتج عقدًا افتراضية كمخرجات.</p>
<p>ولإنشاء مكوّن وظيفي، نستخدم دالة بسيطة بدلًا من كائن خيارات (options). وتؤدي هذه الدالة فعليًا دور دالة العرض المسؤولة عن توليد ناتج المكوّن.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RenderComponent</span>(<span class="hljs-params">props, { slots, emit, attrs }</span>) {

<span class="hljs-comment">// ...</span>

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">RenderComponent</span>;
</code></pre>
<p>يمكنك استخدام الدالة <code>h()</code> لإنشاء قالب مكوّننا كما رأينا سابقًا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RenderComponent</span>(<span class="hljs-params">props</span>) {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;div&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;render-card&quot;</span>,

},

[

<span class="hljs-title function_">h</span>(

<span class="hljs-string">&quot;header&quot;</span>,

{

<span class="hljs-attr">class</span>: <span class="hljs-string">&quot;card-header card-header-title&quot;</span>,

},

props.<span class="hljs-property">message</span>

),

]

);

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">RenderComponent</span>;
</code></pre>
<p>بالإضافة إلى ذلك، يمكننا أيضًا استخدام JSX لعرض قالب المكوّن بطريقة أسهل في القراءة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RenderComponent</span>(<span class="hljs-params">props</span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;render-card&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-header card-header-title&quot;</span>&gt;</span>{props.message}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">RenderComponent</span>;
</code></pre>
<p>مع هذا الإعداد للمكوّن الوظيفي، سيعرض مكوّننا نفس العبارة “Hello World!” في واجهة المستخدم.</p>
<p>JavaScript iconRenderComponent.vue</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RenderComponent</span>(<span class="hljs-params">props</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;render-card&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-header card-header-title&quot;</span>&gt;</span>{props.message}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">RenderComponent</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/render-functions-3-cvvf2m">Open CodeSandbox</a></p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تقدّم دوال العرض طريقة قوية لبناء ترميز مكوّنات Vue برمجيًا باستخدام JavaScript. وهي تتيح لنا إنشاء تمثيلات افتراضية لعقد الـ DOM التي يستخدمها Vue لتتبّعها وعرضها على الصفحة.</p>
<p>وبينما توفّر دوال العرض مرونة وتخصيصًا، فإنها قد تكون أعقد مقارنةً باستخدام القوالب القياسية. إذا شعرت أنك لم تفهم المعلومات الواردة في هذا المقال فهمًا كاملًا — <strong>فهذا أمر طبيعي تمامًا</strong>. يوصي Vue بأن نستخدم القوالب القياسية كلما أمكننا ذلك، لأن دوال العرض أصعب في الفهم والتنفيذ داخل التطبيق. لكن دوال العرض قد تكون مفيدة في السيناريوهات الفريدة التي تحتاج فيها إلى قوة ومرونة أكبر في تخصيص ترميز المكوّنات.</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/extras/render-function.html">دوال العرض وJSX | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/extras/rendering-mechanism.html">آلية العرض | توثيق Vue</a></li>
</ul>
`,c={book:s,chapter:"vue",chapterTitle:n,slug:a,title:p,headings:l,html:e};export{s as book,t as chapter,n as chapterTitle,c as default,l as headings,e as html,a as slug,p as title};
