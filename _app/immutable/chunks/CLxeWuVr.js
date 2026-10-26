const s="kinney",a="visual-studio-code",n="Visual Studio Code",l="vscode-emmet",p="اختصارات Emmet",t=[{depth:2,id:"اختصارات-emmet",text:"اختصارات Emmet"},{depth:2,id:"emmet-في-jsxtsx",text:"Emmet في JSX/TSX"},{depth:2,id:"تقنيات-emmet-المتقدمة",text:"تقنيات Emmet المتقدّمة"},{depth:3,id:"استخدام-التجميع-بالأقواس",text:"استخدام التجميع بالأقواس ()"},{depth:3,id:"استخدام-مرشحات-emmet",text:"استخدام مرشّحات Emmet"},{depth:3,id:"الوسوم-الضمنية",text:"الوسوم الضمنية"},{depth:3,id:"توليد-نص-lorem-ipsum",text:"توليد نص Lorem Ipsum"},{depth:3,id:"مثال-شبه-واقعي-وشبه-معقد",text:"مثال شبه واقعي وشبه معقّد"},{depth:2,id:"اللف-باختصار-wrap-with-abbreviation",text:"اللفّ باختصار (Wrap with Abbreviation)"},{depth:2,id:"مقتطفات-emmet-المخصصة",text:"مقتطفات Emmet المخصّصة"}],e=`<p>Emmet نظام اختصارات قوي لـ HTML و CSS، مدمج مباشرة في Visual Studio Code. وهو يسرّع سير عملك في الواجهات الأمامية سرعة كبيرة، إذ يتيح لك كتابة اختصارات موجزة تتوسّع إلى وسوم كاملة أو قواعد تنسيق كاملة. وفيما يلي الميزات الأساسية ونصائح لجعل Emmet يخدمك، خصوصًا عند كتابة React بصيغة TSX أو JSX.</p>
<h2 id="اختصارات-emmet">اختصارات Emmet</h2>
<p>يحوّل Emmet مقاطع نصية قصيرة إلى بنى HTML كاملة. فمثلًا، إذا كتبت <code>div&gt;ul&gt;li*3</code> في ملف HTML وضغطت <code>Tab</code>، حصلت على:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>وإليك نظرة سريعة على أنماط شائعة أخرى:</p>
<p>يتوسّع <code>header+main+footer</code> إلى ثلاثة عناصر شقيقة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
</code></pre>
<p>ينشئ <code>ul&gt;li.item*5</code> قائمة غير مرتّبة تضم خمسة عناصر قائمة، لكل منها الصنف <code>item</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>وينتج <code>div.container&gt;img.logo[src=&quot;logo.png&quot;]+p</code> عنصر <code>div</code> له ابنان: صورة وفقرة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;logo.png&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<blockquote>
<p><strong>إذا لم تكن متأكدًا من الاختصار الذي تستخدمه، فاكتب جزءًا من المقتطف واضغط <code>Ctrl+Space</code> (أو <code>Cmd+Space</code> على macOS) لترى اقتراحات Emmet.</strong></p>
</blockquote>
<h2 id="emmet-في-jsxtsx">Emmet في JSX/TSX</h2>
<p>يستطيع Emmet أيضًا أن يرفع إنتاجيتك في ملفات React. ولتضمن عمله بشكل صحيح في ملفات <code>.jsx</code> أو <code>.tsx</code>، اضبط إعدادات Visual Studio Code ليُعامل Emmet هذه الملفات كملفات HTML. ومن الأساليب الشائعة إضافة الإعداد التالي في <code>settings.json</code>:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;emmet.includeLanguages&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;javascript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;html&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;javascriptreact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;html&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;typescriptreact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;html&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وبعد إضافة ذلك، يمكنك استخدام الاختصارات نفسها التي تستخدمها في ملف HTML. فمثلًا، في <code>MyComponent.tsx</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div.wrapper</span>&gt;</span>div.title{Hello, Emmet!}^^p.subtitle{It even works in React!}<span class="hljs-tag">&lt;/<span class="hljs-name">div.wrapper</span>&gt;</span></span>
  );
}
</code></pre>
<p>وإذا كتبت <code>div.wrapper&gt;div.title{Hello, Emmet!}^^p.subtitle{It even works in React!}</code> وضغطت <code>Tab</code>، ولّد Emmet ما يلي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;wrapper&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Hello, Emmet!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;subtitle&quot;</span>&gt;</span>It even works in React!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>Emmet يدرك JSX</strong></p>
<p>في JSX، يحوّل Emmet تلقائيًا خصائص مثل <code>class</code> إلى <code>className</code> عند الحاجة. لكن راجع نتائج التوسّع دائمًا، إذ قد تحتاج بعض ميزات خادم اللغة ثانية إضافية لتضمن أن كل شيء مصطفّ بشكل صحيح.</p>
</blockquote>
<h2 id="تقنيات-emmet-المتقدمة">تقنيات Emmet المتقدّمة</h2>
<h3 id="استخدام-التجميع-بالأقواس">استخدام التجميع بالأقواس <code>()</code></h3>
<p>تتيح لك الأقواس إنشاء بنى متداخلة معقّدة وتطبيق معاملات التكرار على مجموعات من العناصر. وهذا مفيد للغاية في إنشاء بنى مركّبة متكرّرة.</p>
<pre><code class="language-css">(<span class="hljs-selector-tag">header</span>&gt;<span class="hljs-selector-tag">h1</span>)+(<span class="hljs-selector-tag">main</span>&gt;<span class="hljs-selector-tag">section</span>*<span class="hljs-number">3</span>)+(<span class="hljs-selector-tag">footer</span>&gt;<span class="hljs-selector-tag">p</span>)
</code></pre>
<p>يتوسّع إلى:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
</code></pre>
<p>ويمكنك أيضًا استخدام التجميع لتطبيق خصائص أو محتوى على عناصر متعددة:</p>
<pre><code class="language-css">(<span class="hljs-selector-tag">div</span>&gt;<span class="hljs-selector-tag">h2</span>+<span class="hljs-selector-tag">p</span>)<span class="hljs-selector-class">.card</span>*<span class="hljs-number">3</span>
</code></pre>
<p>ينشئ ثلاثة عناصر <code>div</code> بالصنف card، لكل منها عنصر <code>h2</code> وعنصر <code>p</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="استخدام-مرشحات-emmet">استخدام مرشّحات Emmet</h3>
<p>تعدّل المرشّحات طريقة توسّع اختصارات Emmet، وتُضاف في نهاية الاختصار بالمحرف الأنبوبي (<code>|</code>).</p>
<h4>مرشّح قصّ المسافات البيضاء (<code>|t</code>)</h4>
<p>يزيل المسافات البيضاء غير المؤثّرة من المخرَج:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-tag">li</span>*<span class="hljs-number">3</span>|t
</code></pre>
<p>فيُنتج مخرَجًا أكثر إحكامًا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<h4>مرشّح التعليقات (<code>|c</code>)</h4>
<p>يضيف تعليقات تساعد على تمييز وسوم الإغلاق في البنى الكبيرة:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">div</span>&gt;<span class="hljs-selector-tag">header</span>+<span class="hljs-selector-tag">main</span>+<span class="hljs-selector-tag">footer</span>|c
</code></pre>
<p>يتوسّع إلى:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- /div --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>مرشّح BEM (<code>|bem</code>)</h4>
<p>يسهّل كتابة ترميز Block Element Modifier (BEM):</p>
<pre><code class="language-css"><span class="hljs-selector-tag">form</span><span class="hljs-selector-class">.search</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.field</span>|bem
</code></pre>
<p>فيُنتج:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;search&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;search__field&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<h3 id="الوسوم-الضمنية">الوسوم الضمنية</h3>
<p>يملك Emmet نظامًا ذكيًا يستنتج أسماء الوسوم بناءً على علاقات الأب بالابن، وهذا يختصر اختصاراتك أكثر.</p>
<p>فمثلًا، عند إنشاء قائمة يمكنك ترك اسم الوسم <code>li</code>:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-class">.item</span>*<span class="hljs-number">3</span>
</code></pre>
<p>يعرف Emmet أن عناصر <code>ul</code> تحتوي عادةً على أبناء من نوع <code>li</code>، لذا يُنتج:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>ومن الوسوم الضمنية الشائعة:</p>
<ul>
<li><code>li</code> داخل <code>ul</code> و <code>ol</code></li>
<li><code>tr</code> داخل <code>table</code></li>
<li><code>td</code> داخل <code>tr</code></li>
<li><code>option</code> داخل <code>select</code></li>
</ul>
<h3 id="توليد-نص-lorem-ipsum">توليد نص Lorem Ipsum</h3>
<p>يتضمّن Emmet مولّدًا قويًا لنص lorem ipsum لإضافة نص بديل سريعًا:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">p</span>&gt;lorem
</code></pre>
<p>فينشئ فقرة بنص lorem ipsum القياسي:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae
  natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti
  eos cupiditate dolore doloribus!
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>ويمكنك تحديد عدد الكلمات:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">p</span>&gt;lorem10
</code></pre>
<p>فيولّد عشر كلمات بالضبط:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, laboriosam.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>واجمع ذلك مع معاملات التكرار للحصول على فقرات متعددة:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">article</span>&gt;(<span class="hljs-selector-tag">h2</span>&gt;lorem5)+<span class="hljs-selector-tag">p</span>*<span class="hljs-number">3</span>&gt;lorem20
</code></pre>
<p>فينشئ مقالًا بعنوان وثلاث فقرات:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Lorem ipsum dolor sit amet.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi fugiat veritatis culpa quos
    aspernatur! Laboriosam alias iure fuga possimus officiis.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci labore repellat, asperiores
    quas quae maxime doloremque aliquam? Eius, illo excepturi.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sapiente distinctio illum
    perspiciatis, pariatur at libero. Placeat laboriosam asperiores esse.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre>
<h3 id="مثال-شبه-واقعي-وشبه-معقد">مثال شبه واقعي وشبه معقّد</h3>
<p>إليك بطاقة مقال كاملة بمحتوى منظّم:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">article</span><span class="hljs-selector-class">.card</span>&gt;(<span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.card__header</span>&gt;<span class="hljs-selector-tag">h2</span><span class="hljs-selector-class">.card__title</span>{Post Title $}+<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.card__meta</span>&gt;<span class="hljs-selector-tag">time</span>+<span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.card__author</span>{Author Name})+(<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.card__content</span>&gt;<span class="hljs-selector-tag">p</span>*<span class="hljs-number">2</span>&gt;lorem)+<span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.card__footer</span>&gt;<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.btn</span><span class="hljs-selector-class">.btn--primary</span>{Read More}
</code></pre>
<p>ينتج هذا الاختصار الواحد بطاقة مقال كاملة البنية بأصناف مناسبة ونص صوري وأزرار منسّقة، وهو ما يبيّن القوة الحقيقية لـ Emmet في تطوير الواجهات الأمامية بسرعة.</p>
<h2 id="اللف-باختصار-wrap-with-abbreviation">اللفّ باختصار (Wrap with Abbreviation)</h2>
<p>لا يقتصر Emmet على توليد وسوم جديدة، بل يستطيع أيضًا لفّ الشيفرة الموجودة داخل بنية جديدة. حدّد الشيفرة التي تريد لفّها، ثم نفّذ أمر <strong>Wrap with Abbreviation</strong> من لوحة الأوامر. اكتب اختصارك (مثل <code>section&gt;div.wrapper</code>) واضغط <code>Tab</code>، فيحيط Emmet تحديدك بالوسوم الجديدة، موفّرًا عليك عناء التحرير اليدوي.</p>
<blockquote>
<p><strong>استخدم هذه الميزة لإعادة هيكلة كتل الشيفرة سريعًا، بإضافة أغلفة دلالية أو تطبيق تنسيق متّسق دون مقاطعة سيرك.</strong></p>
</blockquote>
<h2 id="مقتطفات-emmet-المخصصة">مقتطفات Emmet المخصّصة</h2>
<p>للأنماط المتكرّرة أو الوسوم الخاصة بمشروعك، يمكنك تعريف مقتطفات Emmet مخصّصة. خصّصها بإضافة مُدخل <code>emmet.extensionsPath</code> في إعداداتك ليشير إلى مجلد يحتوي مقتطفاتك. فمثلًا، أنشئ ملفًا باسم <code>snippets.json</code> في مجلدك المخصّص بمحتوى مثل:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;html&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;snippets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;btn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&lt;button class=\\&quot;btn\\&quot;&gt;$0&lt;/button&gt;&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم اضبط المسار في <code>settings.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;emmet.extensionsPath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;path/to/your/snippets&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وبهذه الطريقة، سؤدي كتابة <code>btn</code> والضغط على <code>Tab</code> إلى إدراج قالب الزر المخصّص بسرعة.</p>
<blockquote>
<p><strong>قد تُحدث المقتطفات المخصّصة فرقًا كبيرًا عند العمل على مشاريع بعناصر واجهة متكرّرة. فصّمها على مقاس شيفرتك لتوفّر الوقت وتقلّل الأخطاء.</strong></p>
</blockquote>
<p>ترتقي هذه التقنيات والإعدادات الإضافية بـ Emmet من أداة اختصارات بسيطة إلى مساعد قابل للتخصيص بالكامل يتلاءم مع احتياجاتك التطويرية الخاصة.</p>
<p>والآن، لنلقِ نظرة على <a href="https://stevekinney.com/courses/visual-studio-code/vscode-emmet-exercises">بعض التمارين</a>.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
