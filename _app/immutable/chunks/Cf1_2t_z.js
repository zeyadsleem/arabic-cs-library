const s="patterns-dev",e="vue",a="أنماط Vue",n="components",t="المكوّنات",l=[{depth:2,id:"المكونات-لبنات-البناء",text:"المكوّنات = لبنات البناء"},{depth:2,id:"الحالة-التفاعلية",text:"الحالة التفاعلية"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],p=`<p>مكوّنات Vue هي لبنات البناء الأساسية لتطبيقات Vue، إذ تتيح لنا دمج الترميز (HTML) والمنطق (JS) والأنماط (CSS) داخلها.</p>
<p>وحين نعمل داخل تطبيق Vue، من المهمّ أن نفهم أن كل عنصر تقريبًا يُعرض في واجهة المستخدم يكون غالبًا جزءًا من مكوّن Vue. والسبب في ذلك أن تطبيق Vue غالبًا ما يتكوّن من مكوّنات متداخلة داخل مكوّنات أخرى، مما يُشكّل بنية هرمية.</p>
<p>قابلية إعادة الاستخدام وقابلية الصيانة هما من أبرز الأسباب التي تجعل بناء تطبيق بمكوّنات ذات بنية جيدة أمرًا مهمًا بشكل خاص.</p>
<p>ولفهم المكوّنات فهمًا أفضل، سنقوم بإنشاء أحدها. وأبسط طريقة لإنشاء مكوّن Vue في تطبيق لا يحتوي على عملية بناء (build process) (مثل Webpack) هي إنشاء كائن JavaScript عادي يحتوي على خيارات خاصة بـ Vue.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

<span class="hljs-attr">props</span>: [<span class="hljs-string">&quot;name&quot;</span>],

<span class="hljs-attr">template</span>: <span class="hljs-string">\`&lt;h1&gt;Hello, my name is {{ name }}&lt;/h1&gt;\`</span>,

};
</code></pre>
<p>يحتوي المكوّن على خاصية <code>props</code> معرّفة، وهي تقبل خاصية واحدة اسمها <code>name</code>. والخصائص (props) هي وسيلة لتمرير البيانات إلى مكوّن من مكوّنه الأصل.</p>
<p>أما خاصية <code>template</code> فتعرّف قالب HTML الخاص بالمكوّن. وفي حالتنا هذه، تحتوي على وسم عنوان \`\` يعرض النص <code>&quot;Hello, my name is&quot;</code> تليه قيمة الخاصية <code>name</code>، يتم تصييرها باستخدام صيغة الأقواس المعقوفة المزدوجة في Vue وهي <code>{{ }}</code>.</p>
<p><img src="/images/patterns-dev/vue-components-0-badge.webp" alt="مكوّن الشارة"></p>
<p>إلى جانب تعريف المكوّنات ككائنات JavaScript عادية، فإن الطريقة الأكثر شيوعًا لإنشاء المكوّنات في Vue هي استخدام المكوّنات أحادية الملف (SFCs). والمكوّنات أحادية الملف هي مكوّنات تتيح لنا تعريف HTML وCSS وJS الخاص بالمكوّن كلٍّ منها داخل ملف <code>.vue</code> خاص، كما هو موضح أدناه:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, my name is {{ name }}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">const</span> { name } = <span class="hljs-title function_">defineProps</span>([<span class="hljs-string">&quot;name&quot;</span>]);

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<blockquote>
<p>ملاحظة: المكوّنات أحادية الملف في Vue ممكنة بفضل أدوات البناء مثل <a href="https://vitejs.dev/">Vite</a>. فهذه الأدوات تساعد على ترجمة مكوّنات <code>.vue</code> إلى وحدات JavaScript عادية يمكن للمتصفحات فهمها.</p>
</blockquote>
<h2 id="المكونات-لبنات-البناء">المكوّنات = لبنات البناء</h2>
<p>سنمرّ على تمرين بسيط لتوضيح كيف يمكن تقسيم المكوّنات إلى مكوّنات أصغر. خذ المكوّن الخيالي <code>Tweet</code> التالي:</p>
<p><img src="/images/patterns-dev/vue-components-1-tweet_component.webp" alt="مكوّن التغريدة"></p>
<p>يمكن تنفيذ المكوّن أعلاه على النحو التالي:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-image&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;image.imageUrl&quot;</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">&quot;image.description&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;User&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Avatar&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;author.avatarUrl&quot;</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">&quot;author.name&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;User-name&quot;</span>&gt;</span>{{ author.name }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Details&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-text&quot;</span>&gt;</span>{{ text }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-date&quot;</span>&gt;</span>{{ formatDate(date) }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ... --&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-comment">// ...</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يمكن النظر إلى المكوّن أعلاه والاعتبار أنه صعب التعديل بسبب مدى ازدحام محتواه، كما قد يكون الأمر صعبًا أيضًا عند إعادة استخدام أجزاء منه على حدة. ولجعل الأمور أكثر قابلية للتركيب (composable)، يمكننا استخراج بضعة مكوّنات من هذا المكوّن الواحد.</p>
<p><img src="/images/patterns-dev/vue-components-2-tweet_component_diagram_breakdown.webp" alt="التفصيل الداخلي لمكوّن التغريدة"></p>
<p>يمكن أن يكون المكوّن الرئيسي <code>Tweet</code> هو الأصل للمكوّنَي <code>TweetUser</code> و<code>TweetDetails</code>. وسيعرض <code>TweetUser</code> معلومات المستخدم، وسيكون هو الأصل لمكوّن <code>TweetAvatar</code> الذي يعرض صورة المستخدم الرمزية (avatar). وأما <code>TweetDetails</code> سيعرض ببساطة معلومات إضافية في التغريدة مثل نصّ التغريدة وتاريخ نشرها. وستبدو شجرة المكوّنات على النحو التالي:</p>
<p><img src="/images/patterns-dev/vue-components-3-tweet_component_breakdown_diagram.webp" alt="التسلسل الهرمي لمكوّن التغريدة ومكوّناته الفرعية"></p>
<p>يمكننا أولًا إنشاء المكوّن الفرعي <code>TweetAvatar</code> ليحتوي على عنصر صورة المستخدم الرمزية.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Avatar&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;author.avatarUrl&quot;</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">&quot;author.name&quot;</span> /&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-comment">// ...</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>و بعدها يمكننا إنشاء المكوّن <code>TweetUser</code> الذي يعرض المكوّن <code>TweetAvatar</code> ومعلومات المستخدم ذات الصلة.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;User&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">TweetAvatar</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;User-name&quot;</span>&gt;</span>{{ author.name }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TweetAvatar</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./TweetAvatar.vue&quot;</span>;

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>و يمكننا إنشاء المكوّن <code>TweetDetails</code> لعرض بقية المعلومات الموجودة في التغريدة.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Details&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-text&quot;</span>&gt;</span>{{ text }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-date&quot;</span>&gt;</span>{{ formatDate(date) }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ... --&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-comment">// ...</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>وأخيرًا، يمكننا استخدام هذه المكوّنات الفرعية المُنشأة حديثًا لتبسيط قالب المكوّن الأصل <code>Tweet</code>.</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;Tweet-image&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;image.imageUrl&quot;</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">&quot;image.description&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">TweetUser</span> <span class="hljs-attr">:author</span>=<span class="hljs-string">&quot;author&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">TweetDetails</span> <span class="hljs-attr">:text</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">:date</span>=<span class="hljs-string">&quot;date&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-comment">// ...</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>يبدو استخراج المكوّنات عملًا مملًّا، لكن وجود مكوّنات قابلة لإعادة الاستخدام يجعل الأمور أسهل عند كتابة الشيفرة لتطبيقات أكبر. والمعيار الجيّد الذي يمكن نفكّره فيه عند تبسيط المكوّنات هو هذا — إذا كان جزء من واجهة المستخدم لديك يُستخدم عدّة مرّات (<code>Button</code>، <code>Panel</code>، <code>Avatar</code>)، أو كان معقّدًا بما يكفي بمفرده (<code>App</code>، <code>FeedStory</code>، <code>Comment</code>)، فإنّه مرشّح جيّد لاستخراجه في مكوّن منفصل.</p>
<h2 id="الحالة-التفاعلية">الحالة التفاعلية</h2>
<p>الحالة التفاعلية (reactive state) هي مفهوم أساسي في مكوّنات Vue يتيح واجهات مستخدم ديناميكية ومتجاوبة. وهو يتيح للمكوّنات <strong>أن تُحدِّث بيانات وتعكس تغييراتها تلقائيًا</strong>.</p>
<p>في Vue، يمكننا تعريف خصائص البيانات التفاعلية باستخدام الدالة <code>ref()</code> (للقيم الأولية المستقلّة) والدالة <code>reactive()</code> (للكائنات). ولنأخذ مثالًا بسيطًا لمكوّن عدّاد:</p>
<pre><code class="language-javascript">&lt;template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Counter: {{ count }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>Increment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;decrement&quot;</span>&gt;</span>Decrement<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">

<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {

count.<span class="hljs-property">value</span>++;

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">decrement</span> = (<span class="hljs-params"></span>) =&gt; {

count.<span class="hljs-property">value</span>--;

};

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p>في المثال أعلاه، نعرّف خاصية تفاعلية اسمها <code>count</code> ونهيّئها بقيمة 0. ثم يستخدم القالب الأقواس المعقوفة المزدوجة <code>{{ }}</code> لعرض القيمة الحالية لـ <code>count</code>.</p>
<p>يتضمّن القالب أيضًا زرّين: <code>&quot;Increment&quot;</code> و<code>&quot;Decrement&quot;</code>، وهما مربوطان بالطريقتَي <code>increment()</code> و<code>decrement()</code> المقابلتين باستخدام التوجيه <code>@click</code>. وداخل هاتين الطريقتين، نصل إلى قيمة الخاصية التفاعلية <code>count</code> ونعدّلها. <strong>يكتشف Vue التغييرات ويحدّث عرض المكوّن تلقائيًا ليعكس القيمة الجديدة.</strong></p>
<p><img src="/images/patterns-dev/vue-components-4-components_reactivity.webp" alt="زر زيادة وإنقاص العدّاد عبر حالة تفاعلية"></p>
<p>توفّر الحالة التفاعلية في مكوّنات Vue طريقة سلسة لإدارة تتبّع تغييرات البيانات، مما يجعل بناء واجهات مستخدم تفاعلية وديناميكية أسهل.</p>
<p>JavaScript iconApp.vue</p>
<pre><code class="language-javascript">&lt;template&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo tab&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Counter: {{ count }}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>Increment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;decrement&quot;</span>&gt;</span>Decrement<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vue&quot;</span>;

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
  count.<span class="hljs-property">value</span>++;
};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">decrement</span> = (<span class="hljs-params"></span>) =&gt; {
  count.<span class="hljs-property">value</span>--;
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
</code></pre>
<p><a href="https://codesandbox.io/embed/components-1-lkx35t">Open CodeSandbox</a></p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>يهدف هذا المقال إلى تقديم مقدّمة بسيطة لمفهوم المكوّنات. وفي المقالات والأدلة الأخرى، سنغوص أعمق في فهم الأنماط الشائعة والمهمة عند العمل مع Vue ومكوّنات Vue. ويشمل ذلك على سبيل المثال لا الحصر:</p>
<ul>
<li><a href="/book/patterns-dev/vue/script-setup">استخدام صيغة \`\`</a></li>
<li><a href="/book/patterns-dev/vue/composables">إنشاء دوال مركّبة لإعادة استخدام المنطق ذي الحالة</a></li>
<li><a href="/book/patterns-dev/vue/provide-inject">تمرير البيانات عبر عدّة مكوّنات باستخدام provide/inject</a></li>
<li><a href="/book/patterns-dev/vue/state-management">فهم إدارة الحالة على مستوى التطبيق</a></li>
<li><a href="/book/patterns-dev/vue/dynamic-components">استخدام المكوّنات الديناميكية للتبدّل بين المكوّنات ديناميكيًا</a></li>
<li><a href="/book/patterns-dev/vue/render-functions">عرض قوالب المكوّنات باستخدام JSX</a></li>
<li>وغيرها الكثير.</li>
</ul>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/essentials/component-basics.html#components-basics">أساسيات المكوّنات | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html">أساسيات التفاعلية | توثيق Vue</a></li>
</ul>
`,c={book:s,chapter:"vue",chapterTitle:a,slug:n,title:t,headings:l,html:p};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,p as html,n as slug,t as title};
