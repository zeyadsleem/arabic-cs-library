const s="patterns-dev",a="vanilla",n="أنماط JavaScript",l="dynamic-import",p="الاستيراد الديناميكي (Dynamic Import)",t=[{depth:2,id:"المكونات-القابلة-للتحميل",text:"المكوّنات القابلة للتحميل"}],c=`<p>في تطبيق الدردشة الخاص بنا، لدينا أربعة مكونات رئيسية: <code>UserInfo</code> و<code>ChatList</code> و<code>ChatInput</code> و<code>EmojiPicker</code>. لكن ثلاثة فقط من هذه المكونات تُستخدم فورًا عند التحميل الأولي للصفحة: <code>UserInfo</code> و<code>ChatList</code> و<code>ChatInput</code>. أما <code>EmojiPicker</code> فلا يظهر مباشرةً، وقد لا يُعرض أصلًا إذا لم ينقر المستخدم على <code>Emoji</code> من أجل إظهار <code>EmojiPicker</code>. وهذا يعني أننا أضفنا وحدة <code>EmojiPicker</code> بلا داعٍ إلى حزمة التحميل الأولية (bundle) لدينا، مما قد يزيد زمن التحميل!</p>
<p>لحل هذه المشكلة، يمكننا <em>استيراد</em> (import) مكوّن <code>EmojiPicker</code> ديناميكيًا، أي الاستيراد الديناميكي (dynamic import). وبدلًا من استيراده بشكل ساكن (static import)، سنستورده فقط عندما نرغب في إظهار <code>EmojiPicker</code>. إحدى الطرق السهلة لاستيراد المكونات ديناميكيًا في React هي استخدام <a href="https://reactjs.org/docs/concurrent-mode-suspense.html"><strong>React Suspense</strong></a>. يتلقى المكوّن <code>React.Suspense</code> المكوّن الذي ينبغي تحميله ديناميكيًا، مما يتيح لمكوّن <code>App</code> أن يعرض محتوياته بسرعة أكبر من خلال تعليق استيراد وحدة <code>EmojiPicker</code>! وعندما ينقر المستخدم على الإيموجي، يُعرض المكوّن <code>EmojiPicker</code> للمرة الأولى. ويعرض المكوّن <code>EmojiPicker</code> بدوره مكوّن <code>Suspense</code>، الذي يتلقى الوحدة المستوردة بشكل كسول (lazily imported)، وهي <code>EmojiPicker</code> في هذه الحالة. ويقبل المكوّن <code>Suspense</code> خاصية <code>fallback</code>، التي تتلقى المكوّن الذي ينبغي عرضه أثناء ما زال المكوّن المعلَّق قيد التحميل!</p>
<p>بدلًا من إضافة <code>EmojiPicker</code> بلا داعٍ إلى حزمة التحميل الأولية، يمكننا تقسيمها إلى حزمة خاصة بها (تقسيم الشيفرة، code splitting) وتقليل حجم حزمة التحميل الأولية!</p>
<p>حجم حزمة التحميل الأولية الأصغر يعني تحميلًا أوليًا أسرع: لا يضطر المستخدم إلى الانتظار أمام شاشة تحميل فارغة لمدى أطول. يخبر المكوّن <code>fallback</code> المستخدم أن تطبيقنا لم يتجمّد: عليه ببساطة الانتظار قليلًا ريثما تُعالَج الوحدة وتُنفَّذ.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Asset</span>                             <span class="hljs-title class_">Size</span>         <span class="hljs-title class_">Chunks</span>            <span class="hljs-title class_">Chunk</span> <span class="hljs-title class_">Names</span>

emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>           <span class="hljs-number">1.48</span> <span class="hljs-title class_">KiB</span>      <span class="hljs-number">1</span>    [emitted]    emoji-picker

main.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>                   <span class="hljs-number">1.33</span> <span class="hljs-title class_">MiB</span>      main [emitted]    main

vendors~emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>   <span class="hljs-number">171</span> <span class="hljs-title class_">KiB</span>       <span class="hljs-number">2</span>    [emitted]    vendors~emoji-picker
</code></pre>
<p>في حين كانت حزمة التحميل الأولية في السابق بحجم <code>1.5MiB</code>، تمكنا من تقليلها إلى <code>1.33 MiB</code> بفضل تعليق استيراد <code>EmojiPicker</code>!</p>
<p>في وحدة التحكم، يمكنك أن ترى أن <code>EmojiPicker</code> لا يُنفَّذ إلا عندما نقوم بإظهار <code>EmojiPicker</code>!</p>
<p>JavaScript iconChatInput.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Suspense</span>, lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
  <span class="hljs-comment">// import Send from &quot;./icons/Send&quot;;</span>
  <span class="hljs-comment">// import Emoji from &quot;./icons/Emoji&quot;;</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Send</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-comment">/*webpackChunkName: &quot;send-icon&quot; */</span> <span class="hljs-string">&quot;./icons/Send&quot;</span>)
  );
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Emoji</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-comment">/*webpackChunkName: &quot;emoji-icon&quot; */</span> <span class="hljs-string">&quot;./icons/Emoji&quot;</span>)
  );
  <span class="hljs-comment">// Lazy load EmojiPicker  when &lt;EmojiPicker /&gt; renders</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Picker</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-comment">/*webpackChunkName: &quot;emoji-picker&quot; */</span> <span class="hljs-string">&quot;./EmojiPicker&quot;</span>)
  );

<span class="hljs-keyword">const</span> <span class="hljs-title function_">ChatInput</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> [pickerOpen, togglePicker] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> !state, <span class="hljs-literal">false</span>);

<span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chat-input-container&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type a message...&quot;</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Emoji</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{togglePicker}</span> /&gt;</span>
          {pickerOpen &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Picker</span> /&gt;</span>}
          <span class="hljs-tag">&lt;<span class="hljs-name">Send</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
    );
  };

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;ChatInput loaded&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">ChatInput</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/dynamicimport-rjcmc">افتح CodeSandbox</a></p>
<p>عند بناء التطبيق، يمكننا أن نرى الحزم (bundles) المختلفة التي أنشأها Webpack.</p>
<p>باستيراد المكوّن <code>EmojiPicker</code> ديناميكيًا، تمكنا من تقليل حجم حزمة التحميل الأولية من <code>1.5MiB</code> إلى <code>1.33 MiB</code>! ورغم أن المستخدم قد يظل مضطرًا إلى الانتظار قليلًا حتى يتم تحميل <code>EmojiPicker</code> بالكامل، فقد حسّنا تجربة المستخدم من خلال ضمان عرض التطبيق وتفاعله بينما ينتظر المستخدم تحميل المكوّن.</p>
<h2 id="المكونات-القابلة-للتحميل">المكوّنات القابلة للتحميل</h2>
<p>لا يدعم التصيير على جانب الخادم (server-side rendering) خاصية React Suspense (بعد). البديل الجيد لـ React Suspense هو مكتبة <a href="https://loadable-components.com/docs/getting-started/"><code>loadable-components</code></a>، التي يمكن استخدامها في تطبيقات SSR.</p>
<p>JavaScript iconChatInput.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> loadable <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@loadable/component&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">Send</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Send&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Emoji</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Emoji&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-title function_">loadable</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./EmojiPicker&quot;</span>), {
  <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">ChatInput</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [pickerOpen, togglePicker] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> !state, <span class="hljs-literal">false</span>);

<span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chat-input-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type a message...&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Emoji</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{togglePicker}</span> /&gt;</span>
      {pickerOpen &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">EmojiPicker</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">Send</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">ChatInput</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/confident-pond-5bil0">افتح CodeSandbox</a></p>
<p>على غرار React Suspense، يمكننا تمرير الوحدة المستوردة بشكل كسول إلى <code>loadable</code>، التي لن تستورد الوحدة إلا عند طلب وحدة <code>EmojiPicker</code>! وأثناء تحميل الوحدة، يمكننا عرض مكوّن <code>fallback</code>.</p>
<p>ورغم أن المكوّنات القابلة للتحميل بديل رائع لـ React Suspense في تطبيقات SSR، فإنها مفيدة أيضًا في تطبيقات CSR من أجل تعليق استيراد الوحدات.</p>
<p>JavaScript iconChatInput.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">Send</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Send&quot;</span>;
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">Emoji</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Emoji&quot;</span>;
  <span class="hljs-keyword">import</span> loadable <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@loadable/component&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-title function_">loadable</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./components/EmojiPicker&quot;</span>), {
    <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  });

<span class="hljs-keyword">const</span> <span class="hljs-title function_">ChatInput</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> [pickerOpen, togglePicker] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> !state, <span class="hljs-literal">false</span>);

<span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chat-input-container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type a message...&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Emoji</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{togglePicker}</span> /&gt;</span>
        {pickerOpen &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">EmojiPicker</span> /&gt;</span>}
        <span class="hljs-tag">&lt;<span class="hljs-name">Send</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  };

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;ChatInput loaded&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">ChatInput</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/loadablecomponents-qr6md">افتح CodeSandbox</a></p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
