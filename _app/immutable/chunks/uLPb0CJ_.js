const s="patterns-dev",a="vanilla",n="أنماط JavaScript",e="preload",t="التحميل المسبق (Preload)",p=[{depth:2,id:"التحميل-المسبق-في-تطبيقات-الصفحة-الواحدة",text:"التحميل المسبق في تطبيقات الصفحة الواحدة"},{depth:2,id:"التحميل-المسبق-مع-حيلة-async",text:"التحميل المسبق مع حيلة async"},{depth:2,id:"التحميل-المسبق-في-chrome-95",text:"التحميل المسبق في Chrome 95+"},{depth:2,id:"الخلاصات",text:"الخلاصات"}],l=`<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content">التحميل المسبق</a> (preload) (\`\`) هو <a href="https://web.dev/uses-rel-preload/">تحسين للمتصفح</a> يتيح طلب الموارد الحرجة (التي قد يُتعرَّف عليها متأخرًا) في وقت أبكر. إذا كنت مرتاحًا للتفكير في كيفية ترتيب تحميل مواردك الأساسية يدويًا، فيمكنه أن يكون له أثر إيجابي على أداء التحميل والمقاييس في <a href="https://web.dev/vitals">Core Web Vitals</a>. ومع ذلك، فإن التحميل المسبق ليس حلًا سحريًا ويتطلب الإلمام ببعض المفاضلات.</p>
<p>HTML5 iconindex.html</p>
<pre><code>&lt;link rel=&quot;preload&quot; href=&quot;emoji-picker.js&quot; as=&quot;script&quot;&gt;
  ...
  &lt;/head&gt;
  &lt;body&gt;
    ...
    &lt;script src=&quot;stickers.js&quot; defer&gt;&lt;/script&gt;
    &lt;script src=&quot;video-sharing.js&quot; defer&gt;&lt;/script&gt;
    &lt;script src=&quot;emoji-picker.js&quot; defer&gt;&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/preload-shvwk">افتح CodeSandbox</a></p>
<p>عند تحسين المقاييس مثل <a href="https://web.dev/tti">Time To Interactive</a> أو <a href="https://web.dev/fid">First Input Delay</a>، يمكن أن يكون التحميل المسبق مفيدًا لتحميل حزم JavaScript (أو القطع، chunks) الضرورية للتفاعلية. وضع في اعتبارك أن استخدام التحميل المسبق يتطلب عناية كبيرة، إذ تريد تجنب تحسين التفاعلية على حساب تأخير الموارد (مثل الصور الرئيسية أو الخطوط) الضرورية لـ <a href="https://web.dev/fcp">First Contentful Paint</a> أو <a href="https://web.dev/lcp">Largest Contentful Paint</a>.</p>
<p>إذا كنت تحاول تحسين تحميل JavaScript الخاص بالطرف الأول، فيمكنك أيضًا التفكير في استخدام <code>في المستند</code> مقابل \`\` للمساعدة في اكتشاف هذه الموارد مبكرًا.</p>
<h2 id="التحميل-المسبق-في-تطبيقات-الصفحة-الواحدة">التحميل المسبق في تطبيقات الصفحة الواحدة</h2>
<p>في حين أن <strong>الجلب المسبق</strong> (prefetch) طريقة ممتازة لتخزين الموارد مؤقتًا (cache) التي قد يُطلب قريبًا، يمكننا <strong>التحميل المسبق</strong> للموارد التي يلزم استخدامها فورًا. ربما يكون خطًا معيّنًا يُستخدم في العرض الأولي، أو صورًا معيّنة يراها المستخدم على الفور.</p>
<p>لنفترض أن مكوّن <code>EmojiPicker</code> لدينا ينبغي أن يكون ظاهرًا فورًا عند العرض الأولي. ورغم أنه لا ينبغي أن يكون مشمولًا في الحزمة الرئيسية (bundle)، فلا بد من أن يتم تحميله <em>بالتوازي</em>. ومثل تمامًا <em>الجلب المسبق</em>، يمكننا إضافة تعليق سحري كي نعلم Webpack بأن هذه الوحدة ينبغي أن يتم تحميلها مسبقًا.</p>
<pre><code>const EmojiPicker = import(/* webpackPreload: true */ &quot;./EmojiPicker&quot;);
</code></pre>
<p>JavaScript iconChatInput.jsicon-square-bigwebpack.config.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Suspense</span>, lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Send</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Send&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Emoji</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./icons/Emoji&quot;</span>;


<span class="hljs-keyword">const</span> <span class="hljs-title class_">EmojiPicker</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./EmojiPicker&quot;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title function_">ChatInput</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [pickerOpen, togglePicker] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> !state, <span class="hljs-literal">true</span>);


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
<p><a href="https://codesandbox.io/embed/preload-shvwk">افتح CodeSandbox</a></p>
<blockquote>
<p>يسمح Webpack 4.6.0+ بالتحميل المسبق للموارد عبر إضافة <code>/* webpackPreload: true */</code> إلى الاستيراد. ولجعل التحميل المسبق يعمل في الإصدارات الأقدم من webpack، ستحتاج إلى إضافة <a href="https://github.com/GoogleChromeLabs/preload-webpack-plugin"><code>preload-webpack-plugin</code></a> إلى إعداد webpack لديك.</p>
</blockquote>
<p>بعد بناء التطبيق، يمكننا أن نرى أن <code>EmojiPicker</code> سيتم جلبه مسبقًا.</p>
<pre><code> Asset                             Size       Chunks                          Chunk Names
    emoji-picker.bundle.js         1.49 KiB   emoji-picker [emitted]          emoji-picker
    vendors~emoji-picker.bundle.js 171 KiB    vendors~emoji-picker [emitted]  vendors~emoji-picker
    main.bundle.js                 1.34 MiB   main  [emitted]                 main

Entrypoint main = main.bundle.js
(preload: vendors~emoji-picker.bundle.js emoji-picker.bundle.js)
</code></pre>
<p>يظهر الناتج الفعلي على شكل وسم <code>link</code> يحمل <code>rel=&quot;preload&quot;</code> في <code>head</code> الخاص بمستندنا.</p>
<pre><code>&lt;link rel=&quot;prefetch&quot; href=&quot;emoji-picker.bundle.js&quot; as=&quot;script&quot; /&gt;
&lt;link rel=&quot;prefetch&quot; href=&quot;vendors~emoji-picker.bundle.js&quot; as=&quot;script&quot; /&gt;
</code></pre>
<p>يمكن تحميل <code>EmojiPicker</code> المحمَّل مسبقًا بالتوازي مع حزمة التحميل الأولية. وبخلاف <code>prefetch</code>، حيث كان للمتصفح دور في تحديد ما إذا كان يظن أنه يملك اتصال إنترنت وعرض نطاق كافيين لجلب المورد فعليًا، فإن المورد <strong>المحمَّل مسبقًا</strong> سيُحمَّل مسبقًا في كل الأحوال.</p>
<p>بدلًا مناضطرارنا إلى انتظار تحميل <code>EmojiPicker</code> بعد العرض الأولي، سيكون المورد متاحًا لنا فورًا! ولأننا نحمّل الأصول بترتيب أذكى، فإن زمن التحميل الأولي قد يزداد بدرجة كبيرة اعتمادًا على جهاز المستخدم واتصاله بالإنترنت. لا تُحمِّل مسبقًا إلا الموارد التي يلزم أن تكون مرئية بعد نحو ثانية واحدة من العرض الأولي.</p>
<h2 id="التحميل-المسبق-مع-حيلة-async">التحميل المسبق مع حيلة <code>async</code></h2>
<p>إذا أردت أن تقوم المتصفحات بتنزيل سكربت بأولوية عالية، من دون أن تعيق المحلل (parser) في انتظار السكربت، فيمكنك الاستفادة من حيلة التحميل المسبق مع async أدناه. وسيؤدي التحميل المسبق في هذه الحالة إلى تأخير تنزيل الموارد الأخرى، لكن هذه مفاضلة على المطوّر أن يجريها:</p>
<pre><code>&lt;link rel=&quot;preload&quot; href=&quot;emoji-picker.js&quot; as=&quot;script&quot;&gt;
&lt;script src=&quot;emoji-picker.js&quot; async&gt;
</code></pre>
<h2 id="التحميل-المسبق-في-chrome-95">التحميل المسبق في Chrome 95+</h2>
<p>بفضل بعض <a href="https://twitter.com/patmeenan/status/1436374668450177026">الإصلاحات</a> لسلوك <a href="https://docs.google.com/document/d/1ZEi-XXhpajrnq8oqs5SiW-CXR3jMc20jWIzN5QRy1QA/edit?usp=sharing">العبور في قائمة الانتظار</a> الخاص بالتحميل المسبق في Chrome 95+، أصبحت هذه الخاصية أكثر أمانًا قليلًا في الاستخدام على نطاق أوسع. وتوصيات Pat Meenan في توصيات Chrome الجديدة للتحميل المسبق تقترح:</p>
<ul>
<li>وضعه في ترويسات HTTP سيجعله يتقدّم على كل ما عداه</li>
<li>عمومًا، ستُحمَّل الموارد المسبقة التحميل بالترتيب الذي يصل به المحلل إليها لكل أولوية متوسطة أو أعلى، لذا كن حذرًا عند وضع التحميل المسبق في بداية HTML.</li>
<li>من الأفضل غالبًا وضع التحميل المسبق للخطوط في نهاية وسم head أو في بداية وسم body</li>
<li>ينبغي أن يتم التحميل المسبق للاستيرادات بعد وسم السكربت الذي يحتاج إلى الاستيراد (حتى يتم تحميل السكربت الفعلي وتحليله أولًا)</li>
<li>سيكون للتحميل المسبق للصور أولوية منخفضة، وينبغي أن يُرتَّب بالنسبة إلى السكربتات غير المتزامنة والوسوم الأخرى ذات الأولوية المنخفضة أو الأدنى</li>
</ul>
<h2 id="الخلاصات">الخلاصات</h2>
<p>مرة أخرى، استخدم التحميل المسبق باعتدال وقِس دائمًا أثره في بيئة الإنتاج. إذا كان التحميل المسبق لصورتك يسبق موضعها في المستند، فقد يساعد ذلك المتصفحات على اكتشافها (وترتيبها بالنسبة إلى الموارد الأخرى). وعند استخدامه بشكل خاطئ، يمكن أن يؤدي التحميل المسبق إلى تأخير صورتك لـ First Contentful Paint (مثل CSS والخطوط) — وهو عكس ما تريده. ولاحظ أيضًا أن فاعلية إجراءات إعادة ترتيب الأولويات هذه تعتمد بدورها على <a href="https://github.com/andydavies/http2-prioritization-issues#cdns--cloud-hosting-services">الخوادم التي تعطي الأولوية للطلبات</a> بشكل صحيح.</p>
<p>قد تجد أيضًا أن \`\` مفيد في الحالات التي تحتاج فيها إلى جلب سكربتات <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content#scripting_and_preloads">دون تنفيذها</a>.</p>
<p>تتناول مجموعة متنوعة من مقالات web.dev كيفية استخدام التحميل المسبق من أجل:</p>
<ul>
<li><a href="https://web.dev/uses-rel-preload/">التحميل المسبق للسكربتات الأساسية المطلوبة للتفاعلية</a></li>
<li><a href="https://web.dev/preload-responsive-images/">التحميل المسبق لصورة Largest Contentful Paint</a></li>
<li><a href="https://web.dev/preload-optional-fonts/">تحميل الخطوط مع منع إزاحات التخطيط</a></li>
</ul>
`,o={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:p,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
