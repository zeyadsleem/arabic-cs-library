const s="patterns-dev",a="vanilla",n="أنماط JavaScript",p="static-import",l="الاستيراد الساكن (Static Import)",t=[],c=`<p>تتيح لنا الكلمة المفتاحية <code>import</code> استيراد الشيفرة التي تم تصديرها من وحدة أخرى. بشكل افتراضي، تُضاف جميع الوحدات التي نقوم بـ<em>استيرادها بشكل ساكن</em> (static import) إلى حزمة التحميل الأولية (bundle). وأي وحدة يتم استيرادها باستخدام صيغة الاستيراد الافتراضية في ES2015، أي <code>import module from 'module'</code>، فهي مستوردة بشكل ساكن.</p>
<p>لننظر إلى مثال! يحتوي تطبيق دردشة بسيط على مكوّن <code>Chat</code>، نقوم فيه باستيراد ثلاثة مكونات بشكل ساكن وعرضها: <code>UserProfile</code> و<code>ChatList</code> و<code>ChatInput</code> لكتابة الرسائل وإرسالها! وداخل وحدة <code>ChatInput</code>، نقوم باستيراد مكوّن <code>EmojiPicker</code> بشكل ساكن كي نتمكّن من إظهار منتقي الإيموجي للمستخدم عندما يُبدّل حالة زر الإيموجي.</p>
<p>JavaScript iconApp.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-comment">// Statically import Chatlist, ChatInput and UserInfo</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">UserInfo</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/UserInfo&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatList</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChatList&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatInput</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChatInput&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./styles.css&quot;</span>;

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;App loading&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

<span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">UserInfo</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChatList</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChatInput</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">App</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/staticimport-b0cgl">افتح CodeSandbox</a></p>
<p>تُنفَّذ الوحدات فور وصول المحرك (engine) إلى السطر الذي استوردناها فيه. وعندما تفتح وحدة التحكم، يمكنك أن ترى الترتيب الذي حُمِّلت به الوحدات!</p>
<p>JavaScript iconApp.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-comment">// Statically import Chatlist, ChatInput and UserInfo</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">UserInfo</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/UserInfo&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatList</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChatList&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">ChatInput</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/ChatInput&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./styles.css&quot;</span>;

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;App loading&quot;</span>, <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

<span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">UserInfo</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChatList</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ChatInput</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">App</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/pedantic-keldysh-bv7cj">افتح CodeSandbox</a></p>
<p>ولأن المكونات تم استيرادها بشكل ساكن، قام Webpack بتجميع الوحدات في حزمة التحميل الأولية. يمكننا رؤية الحزمة التي ينشئها Webpack بعد بناء التطبيق:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Asset</span>           <span class="hljs-title class_">Size</span>      <span class="hljs-title class_">Chunks</span>            <span class="hljs-title class_">Chunk</span> <span class="hljs-title class_">Names</span>

main.<span class="hljs-property">bundle</span>.<span class="hljs-property">js</span>  <span class="hljs-number">1.5</span> <span class="hljs-title class_">MiB</span>    main  [emitted]  main
</code></pre>
<p>يتم تجميع الشيفرة المصدرية لتطبيق الدردشة الخاص بنا في حزمة واحدة: <code>main.bundle.js</code>. ويمكن لحجم الحزمة الكبير أن يؤثر بشكل كبير في زمن تحميل تطبيقنا، وذلك يعتمد على جهاز المستخدم واتصاله بالشبكة. وقبل أن يتمكّن مكوّن <code>App</code> من عرض محتوياته على شاشة المستخدم، عليه أولًا أن يحمّل جميع الوحدات ويحللها.</p>
<p>ولحسن الحظ، هناك طرق كثيرة لتسريع زمن التحميل! فنحن لا نضطر دائمًا إلى استيراد جميع الوحدات دفعة واحدة: ربما توجد وحدات ينبغي ألا تُعرض إلا استنادًا إلى تفاعل المستخدم، مثل <code>EmojiPicker</code> في هذه الحالة، أو تُعرض في موضع أدنى في الصفحة. وبدلًا من استيراد جميع المكونات بشكل ساكن، يمكننا <em>استيراد</em> الوحدات ديناميكيًا (dynamic import) بعد أن يكون مكوّن <code>App</code> قد عرض محتوياته وأصبح بإمكان المستخدم التفاعل مع تطبيقنا.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,p as slug,l as title};
