const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="writing-stories",t="كيف تكتب قصة (Story)",p=[{depth:2,id:"استخدام-args",text:"استخدام args"},{depth:2,id:"زرنا-الأساسي",text:"زرّنا الأساسي"}],c=`<p>فكّر في هذا المكوّن البسيط جدًّا للزرّ. لنفترض أن هذا الملف موجود في <code>src/components/button.tsx</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
};
</code></pre>
<p>ثم سننشئ أول قصة لنا تُسمّى — دون مفاجأة — <code>button.stories.tsx</code>.</p>
<p>أولًا، استورد النوعين <code>Meta</code> و<code>StoryObj</code> لتحصل على الإكمال التلقائي الرائع في قصص TypeScript وكذلك الأمان النوعي المسؤول.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">StoryObj</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/react&#x27;</span>;
</code></pre>
<p>ثم، لنستورد مكوّنًا. في هذه الحالة، مكوّن <code>Button</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./button&#x27;</span>;
</code></pre>
<p>يحتوي التصدير الافتراضي، <code>Meta</code>، على البيانات الوصفية الخاصة بقصص هذا المكوّن. ويتحكّم حقل العنوان في مكان ظهور القصص في الشريط الجانبي.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> meta;
</code></pre>
<p>كل تصدير باسم هو قصة. وستحتاج إلى تصدير واحد على الأقل باسم إن أردت أن ترى أي شيء.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Story</span> = <span class="hljs-title class_">StoryObj</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">render</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>,
};
</code></pre>
<p>في المجموع، ينبغي أن تبدو قصتك شيئًا كهذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">StoryObj</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/react&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./button&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Story</span> = <span class="hljs-title class_">StoryObj</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> meta;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">render</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>,
};
</code></pre>
<p>إن شغّلت Storybook باستخدام <code>npm run storybook</code>، فسترى شيئًا مثل ما يلي:</p>
<p>قصة زرّ أساسية في Storybook. ليست شيئًا يُذكر للنظر إليه، لكنها أول قصة لنا، وأظن أننا كان علينا البدء من مكان ما، أليس كذلك؟</p>
<h2 id="استخدام-args">استخدام <code>args</code></h2>
<p>بدلًا من تصيير المكوّن نفسه، يمكنك أن تختار استخدام كائن <code>args</code> سيُستخدم كخصائص (<code>props</code>) للمكوّن المصيَّر في القصة. وهذا يستفيد من <a href="https://storybook.js.org/docs/api/csf">صيغة قصة المكوّن في Storybook</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  },
};
</code></pre>
<p>ستلاحظ أن بإمكانك ضبط الخصائص (<code>props</code>) في تبويب <strong>التحكّم (Controls)</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/60d2c9b175606449.webp" alt="تنفيذ أساسي للتحكّم في Storybook"></p>
<h2 id="زرنا-الأساسي">زرّنا الأساسي</h2>
<p>فيما يلي النتيجة النهائية لزرّنا في هذه المرحلة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">StoryObj</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/react&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./button&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Story</span> = <span class="hljs-title class_">StoryObj</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> meta;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  },
};
</code></pre>
<p>في الوقت الحالي، لا يفعل مكوّن <code>Button</code> لدينا شيئًا يُذكر وشكله <em>قبيح حقًّا</em>. لنُضِف شيئًا إلى الزرّ. لنُضِف بعض <a href="https://stevekinney.com/courses/storybook/adding-variants">الأنماط (variants)</a> إلى القصة.</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,c as html,l as slug,t as title};
