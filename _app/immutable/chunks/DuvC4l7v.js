const s="patterns-dev",c="vue",a="أنماط Vue",n="dynamic-components",l="المكوّنات الديناميكية",p=[{depth:2,id:"الحفاظ-على-الحالة-state",text:"الحفاظ على الحالة (state)"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],t=`<p>تمثّل المكوّنات الديناميكية (dynamic components) القدرة على تغيير (أي التبديل بين) المكوّنات ديناميكيًا عبر ربط سمة <code>is</code> بالعنصر المحجوز \`\`.</p>
<p>سنمرّ على مثال لفهم كيفية عمل المكوّنات الديناميكية على أفضل وجه. لنفترض لدينا مكوّنات منفصلة بعنوان <code>Home</code> و<code>Feed</code> و<code>History</code> تعرض ببساطة نصًا يوضّح أي مكوّن هي.</p>
<pre><code class="language-javascript">&lt;!-- <span class="hljs-title class_">Home</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span>Home component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;!-- <span class="hljs-title class_">Feed</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span>Feed component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;!-- <span class="hljs-title class_">History</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span>History component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
</code></pre>
<p>هدفنا هو بناء واجهة تعرض قائمة من علامات التبويب (tabs) يمكن النقر عليها. وبحسب علامة التبويب التي يتم النقر عليها، نريد عرض مكوّن معيّن ديناميكيًا.</p>
<p><img src="/images/patterns-dev/vue-dynamic-components-0-dynamic_tabs.webp" alt="تبويبات ديناميكية"></p>
<p>عند التنقّل بين علامات التبويب، نريد أن يتم فكّ تركيب المكوّنات وتركيبها ديناميكيًا دون استخدام التوجيه (routing). ورغم أن تأمين شيء كهذا ممكن عبر عرض قوالب فرعية بشكل مشروط بمساعدة توجيهات مثل <a href="https://vuejs.org/guide/essentials/conditional.html"><code>v-if</code> و<code>v-else</code></a>، فإنها حالة مثالية لاستخدام المكوّنات الديناميكية في Vue.</p>
<p>في مكوّن <code>App</code> الأب الخاص بتطبيقنا، يمكننا أولًا استيراد المكوّنات الثلاثة منفردة لتكون متاحة في القالب. وسننشئ أيضًا خاصية تفاعلية باسم <code>currentTab</code> تُسنِد إليها قيمة أولية وهي <code>&quot;Home&quot;</code>.</p>
<pre><code class="language-javascript">&lt;script setup&gt;

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Home</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Home.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Feed</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Feed.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">History</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/History.vue&quot;</span>;

<span class="hljs-keyword">const</span> currentTab = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&quot;Home&quot;</span>);

<span class="hljs-keyword">const</span> tabs = {

<span class="hljs-title class_">Home</span>,

<span class="hljs-title class_">Feed</span>,

<span class="hljs-title class_">History</span>,

};

&lt;/script&gt;
</code></pre>
<p>لاحظ أن كائن <code>tabs</code> لدينا يُشير إلى تعريفات المكوّنات الفعلية وليس إلى أسماء المكوّنات فقط.</p>
<p>في قالب مكوّن <code>App</code>، سنرغب في عرض ثلاثة أزرار تبويب منفصلة — واحد لكل مكوّن نعتزم عرضه. وسنستخدم <a href="https://vuejs.org/api/built-in-directives.html#v-for">التوجيه <code>v-for</code></a> للمساعدة في تحقيق ذلك. سنمرّ عبر قائمة <code>tabs</code> ونعرض قائمة من عناصر <code>. ولكل عنصر </code> يُعرض، سنربط قيمة علامة التبويب بسمة <code>key</code> في العنصر، ونعرض ديناميكيًا التصنيف <code>.active</code> إذا كانت علامة التبويب محدّدة/نشطة، ونضع معالج نقر (click handler) لتحديث قيمة المكوّن <code>currentTab</code> عند تحديد علامة التبويب.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span>

<span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(_, tab) in tabs&quot;</span>

<span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;tab&quot;</span>

<span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[&#x27;tab-button&#x27;, { active: currentTab === tab }]&quot;</span>

@<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;currentTab = tab&quot;</span>

&gt;</span>

{{ tab }}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Home</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Home.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Feed</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Feed.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">History</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/History.vue&quot;</span>;

<span class="hljs-keyword">const</span> currentTab = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&quot;Home&quot;</span>);

<span class="hljs-keyword">const</span> tabs = {

<span class="hljs-title class_">Home</span>,

<span class="hljs-title class_">Feed</span>,

<span class="hljs-title class_">History</span>,

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع هذه التغييرات، ستظهر لنا ثلاثة أزرار تبويب في الوقت الحالي.</p>
<p><img src="/images/patterns-dev/vue-dynamic-components-1-dynamic_tabs_initial.webp" alt="التبويبات الديناميكية في حالتها الأولى"></p>
<p>لعرض مكوّن فرعي معيّن ديناميكيًا، سنربط سمة <code>is</code> بالعنصر المحجوز \`\`. وينبغي أن تطابق القيمة المُسنَدة إلى السمة <code>is</code> المكوّن الفرعي الذي نريد عرضه ديناميكيًا. وفي حالتنا، سنستخدم خاصية البيانات <code>currentTab</code> لتحديد المكوّن الفرعي المختار في لحظة معيّنة.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span>

<span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(_, tab) in tabs&quot;</span>

<span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;tab&quot;</span>

<span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[&#x27;tab-button&#x27;, { active: currentTab === tab }]&quot;</span>

@<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;currentTab = tab&quot;</span>

&gt;</span>

{{ tab }}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;tabs[currentTab]&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Home</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Home.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Feed</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Feed.vue&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">History</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/History.vue&quot;</span>;

<span class="hljs-comment">// eslint-disable-next-line no-unused-vars</span>

<span class="hljs-keyword">const</span> currentTab = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&quot;Home&quot;</span>);

<span class="hljs-comment">// eslint-disable-next-line no-unused-vars</span>

<span class="hljs-keyword">const</span> tabs = {

<span class="hljs-title class_">Home</span>,

<span class="hljs-title class_">Feed</span>,

<span class="hljs-title class_">History</span>,

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع وضع العنصر الديناميكي \`\` في قالبنا، سنلاحظ أن المكوّنات الفرعية يتم الآن فكّ تركيبها وتركيبها ديناميكيًا بحسب علامة التبويب التي تمّ اختيارها.</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(_, tab) in tabs&quot;</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;tab&quot;</span>
      <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[<span class="hljs-symbol">&amp;#x27;</span>tab-button<span class="hljs-symbol">&amp;#x27;</span>, { active: currentTab === tab }]&quot;</span>
      @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;currentTab = tab&quot;</span>
    &gt;</span>
      {{ tab }}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;tabs[currentTab]&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Home</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Home.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Feed</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Feed.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">History</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/History.vue&quot;</span>;

<span class="hljs-keyword">const</span> currentTab = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&quot;Home&quot;</span>);
<span class="hljs-keyword">const</span> tabs = {
  <span class="hljs-title class_">Home</span>,
  <span class="hljs-title class_">Feed</span>,
  <span class="hljs-title class_">History</span>,
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/dynamic-components-1-7qlvhk">فتح CodeSandbox</a></p>
<h2 id="الحفاظ-على-الحالة-state">الحفاظ على الحالة (state)</h2>
<p>قد يكون الحفاظ على الحالة اعتبارًا مهمًا ينبغي الإبقاء عليه في الاعتبار عند استخدام المكوّنات الديناميكية. وبالافتراضي، عند فكّ تركيب المكوّن تُفقد حالته. لكن Vue توفّر طريقة للحفاظ على حالة المكوّنات الديناميكية باستخدام مكوّن \`\`.</p>
<p>للحفاظ على حالة المكوّنات الديناميكية، يمكننا تغليف العنصر \`\` بمكوّن <code>&lt;KeepAlive</code>&gt;.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>

<span class="hljs-comment">&lt;!--  --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">KeepAlive</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;tabs[currentTab]&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">KeepAlive</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-comment">// ...</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع تغليف مكوّن <code>للعنصر</code>، ستُحفظ حالة المكوّنات الديناميكية عند فكّ تركيبها. وهذا يعني أن أيّ بيانات أو حالة للمكوّن ستبقى محفوظة، وسيحتفظ المكوّن بحالته السابقة عند تركيبه مرة أخرى.</p>
<p>ولرؤية مثال على ذلك، يمكننا تحديث كل مكوّن من مكوّناتنا الفرعية ليحتوي على عدّاد بسيط تتم زيادته.</p>
<pre><code class="language-javascript">&lt;!-- <span class="hljs-title class_">Repeat</span> <span class="hljs-variable language_">this</span> counter example <span class="hljs-keyword">for</span> <span class="hljs-title class_">Home</span>, <span class="hljs-title class_">Feed</span>, and <span class="hljs-title class_">History</span> --&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span>

Home component

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Counter: {{ counter }}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;incrementCounter&quot;</span>&gt;</span>Increment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> counter = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-comment">// eslint-disable-next-line no-unused-vars</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">incrementCounter</span> = (<span class="hljs-params"></span>) =&gt; {

counter.<span class="hljs-property">value</span>++;

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>مع هذه التغييرات، سنلاحظ أن حالة العدّاد لكل مكوّن فرعي تبقى محفوظة حتى مع تبديلنا الديناميكي بين المكوّنات.</p>
<p><img src="/images/patterns-dev/vue-dynamic-components-2-dynamic_components_preserve.webp" alt="الحفاظ على حالة المكوّنات الديناميكية"></p>
<p>وباستخدام مكوّن \`\`، يمكننا تحسين سلوك المكوّنات الديناميكية بحفظ حالتها وتوفير تجربة مستخدم أكثر سلاسة عند التنقّل بين علامات التبويب.</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(_, tab) in tabs&quot;</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;tab&quot;</span>
      <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[<span class="hljs-symbol">&amp;#x27;</span>tab-button<span class="hljs-symbol">&amp;#x27;</span>, { active: currentTab === tab }]&quot;</span>
      @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;currentTab = tab&quot;</span>
    &gt;</span>
      {{ tab }}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">KeepAlive</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;tabs[currentTab]&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">KeepAlive</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Home</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Home.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Feed</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/Feed.vue&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">History</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/History.vue&quot;</span>;

<span class="hljs-keyword">const</span> currentTab = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&quot;Home&quot;</span>);
<span class="hljs-keyword">const</span> tabs = {
  <span class="hljs-title class_">Home</span>,
  <span class="hljs-title class_">Feed</span>,
  <span class="hljs-title class_">History</span>,
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/dynamic-components-2-7q9q4r">فتح CodeSandbox</a></p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/essentials/component-basics.html#dynamic-components">المكوّنات الديناميكية | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/built-ins/keep-alive.html">KeepAlive | توثيق Vue</a></li>
</ul>
`,e={book:s,chapter:"vue",chapterTitle:a,slug:n,title:l,headings:p,html:t};export{s as book,c as chapter,a as chapterTitle,e as default,p as headings,t as html,n as slug,l as title};
