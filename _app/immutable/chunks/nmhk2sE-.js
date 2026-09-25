const s="patterns-dev",a="vanilla",n="أنماط JavaScript",p="prefetch",l="الجلب المسبق (Prefetch)",t=[{depth:2,id:"الجلب-المسبق",text:"الجلب المسبق"}],e=`<p>الجلب المسبق (prefetch) (\`\`) هو تحسين للمتصفح يتيح لنا جلب الموارد التي قد تكون مطلوبة للمسارات (routes) أو الصفحات اللاحقة قبل أن نحتاج إليها. ويمكن تحقيق الجلب المسبق بعدة طرق. ويمكن تحقيق ذلك بشكل مصرَّح به في HTML (كما في المثال أدناه)، أو عبر ترويسة HTTP (<code>Link: ; rel=prefetch</code>)، أو عبر <a href="https://googlechrome.github.io/samples/service-worker/prefetch/">Service Workers</a>، أو عبر وسائل أكثر تخصيصًا مثل Webpack.</p>
<pre><code class="language-javascript">&lt;link rel=<span class="hljs-string">&quot;prefetch&quot;</span> href=<span class="hljs-string">&quot;/pages/next-page.html&quot;</span> /&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;prefetch&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/js/emoji-picker.js&quot;</span> /&gt;</span></span>
</code></pre>
<h2 id="الجلب-المسبق">الجلب المسبق</h2>
<p>في الأمثلة التي توضّح كيف يمكننا استيراد الوحدات بناءً على الظهور أو التفاعل، رأينا أن هناك كثيرًا ما يحدث من تأخير بين النقر على الزر من أجل إظهار المكوّن، وظهور المكوّن الفعلي على الشاشة. وقد حدث ذلك لأن الوحدة ما زالت بحاجة إلى أن تُطلب وتُحمَّل عندما ينقر المستخدم على الزر!</p>
<p>في كثير من الحالات، نعرف أن المستخدمين سيطلبون موارد معينة بعد العرض الأولي للصفحة بوقت قصير. ورغم أنها قد لا تكون مرئية فورًا، فلا ينبغي أن تُشمَل في حزمة التحميل الأولية (bundle)، سيكون رائعًا 줄 منهما زمن التحميل قدر الإمكان لمنح تجربة مستخدم أفضل!</p>
<p>يمكن <strong>جلب</strong> المكونات أو الموارد التي نعرف أنها من المحتمل أن تُستخدم في مرحلة ما من التطبيق مسبقًا. يمكننا إخبار Webpack بأن الحزم معينة تحتاج إلى جلب مسبق، وذلك بإضافة <a href="https://webpack.js.org/api/module-methods/#magic-comments">تعليق سحري</a> إلى جملة الاستيراد: <code>/* webpackPrefetch: true */</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackPrefetch: true */</span> <span class="hljs-string">&quot;./EmojiPicker&quot;</span>);
</code></pre>
<p>JavaScript iconChatInput.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Suspense</span>, lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Send</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Send&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Emoji</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Emoji&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-comment">/*webpackPrefetch: true,
    webpackChunkName: &quot;emoji-picker&quot;*/</span>
  <span class="hljs-string">&quot;./EmojiPicker&quot;</span>)
);
<span class="hljs-keyword">const</span> <span class="hljs-title function_">ChatInput</span> = (<span class="hljs-params">{ emojiPicker, gifPicker }</span>) =&gt; {
  <span class="hljs-keyword">const</span> [pickerOpen, togglePicker] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> !state, <span class="hljs-literal">false</span>);

<span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chat-input-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type a message...&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Emoji</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{togglePicker}</span> /&gt;</span>
      {pickerOpen &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>loading<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">EmojiPicker</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
      )}
      <span class="hljs-tag">&lt;<span class="hljs-name">Send</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;ChatInput loading&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">ChatInput</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/prefetch-trni2">افتح CodeSandbox</a></p>
<p>بعد بناء التطبيق، يمكننا أن نرى أن <code>EmojiPicker</code> سيتم جلبه مسبقًا.</p>
<pre><code class="language-javascript"> <span class="hljs-title class_">Asset</span>                             <span class="hljs-title class_">Size</span>       <span class="hljs-title class_">Chunks</span>                          <span class="hljs-title class_">Chunk</span> <span class="hljs-title class_">Names</span>

emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>         <span class="hljs-number">1.49</span> <span class="hljs-title class_">KiB</span>   emoji-picker [emitted]          emoji-picker

vendors~emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span> <span class="hljs-number">171</span> <span class="hljs-title class_">KiB</span>    vendors~emoji-picker [emitted]  vendors~emoji-picker

main.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>                 <span class="hljs-number">1.34</span> <span class="hljs-title class_">MiB</span>   main  [emitted]                 main

<span class="hljs-title class_">Entrypoint</span> main = main.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>

(<span class="hljs-attr">prefetch</span>: vendors~emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span> emoji-picker.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>)
</code></pre>
<p>يظهر الناتج الفعلي على شكل وسم <code>link</code> يحمل <code>rel=&quot;prefetch&quot;</code> في <code>head</code> الخاص بمستندنا.</p>
<pre><code class="language-javascript">&lt;link rel=<span class="hljs-string">&quot;prefetch&quot;</span> href=<span class="hljs-string">&quot;emoji-picker.bundle.js&quot;</span> <span class="hljs-keyword">as</span>=<span class="hljs-string">&quot;script&quot;</span> /&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;prefetch&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;vendors~emoji-picker.bundle.js&quot;</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;script&quot;</span> /&gt;</span></span>
</code></pre>
<p>الوحدات التي يتم جلبها مسبقًا يطلبها المتصفح ويحمّلها <strong>قبل أن يطلب المستخدم المورد</strong>. وعندما يكون المتصفح خاملًا ويحتسب أنه يملك عرض نطاق كافيًا، فإنه سيُصدر طلبًا من أجل تحميل المورد وتخزينه مؤقتًا (cache). وتؤدي وجود المورد في ذاكرة المؤقتة إلى تقليل زمن التحميل بشكل كبير، إذ لا نحتاج إلى انتظار انتهاء الطلب بعد أن ينقر المستخدم على الزر. يمكننا ببساطة الحصول على المورد المحمَّل من الذاكرة المؤقتة.</p>
<p>ورغم أن الجلب المسبق طريقة ممتازة لتحسين زمن التحميل، فلا تفرط في ذلك. إذا لم يطلب المستخدم مكوّن <code>EmojiPicker</code> في النهاية، فقد حمّلنا المورد بلا داعٍ. وقد يكلّف هذا المستخدم مالًا أو يُبطئ التطبيق. لا تجلب مسبقًا إلا الموارد الضرورية.</p>
<p>قد تجد الموارد التالية عن الجلب المسبق مفيدة:</p>
<ul>
<li><a href="https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf">Preload, prefetch and priorities in Chrome</a></li>
<li><a href="https://web.dev/predictive-prefetching/">Faster navigations with predictive prefetching</a></li>
<li><a href="https://blog.mgechev.com/2021/02/07/prefetching-strategies-heuristics-faster-web-apps/">Prefetching heuristics</a></li>
<li><a href="https://addyosmani.com/blog/what-not-to-prefetch-prerender/">What not to prefetch</a></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
