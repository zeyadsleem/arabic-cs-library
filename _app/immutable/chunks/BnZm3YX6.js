const s="kinney",a="react-typescript",n="React مع TypeScript",l="forwardref-memo-and-displayname",p="`forwardRef` و`memo` و`displayName`",t=[{depth:2,id:"مشكلة-المكونات-من-الرتبة-العليا-higher-order-components-مع-typescript",text:"مشكلة المكوّنات من الرتبة العليا (Higher-Order Components) مع TypeScript"},{depth:2,id:"فهم-forwardref-مع-typescript",text:"فهم forwardRef مع TypeScript"},{depth:3,id:"المكونات-العامة-مع-forwardref",text:"المكوّنات العامة مع forwardRef"},{depth:2,id:"memo-متى-تستخدمه-وكيف",text:"memo: متى تستخدمه وكيف"},{depth:3,id:"دوال-المقارنة-المخصصة",text:"دوال المقارنة المخصّصة"},{depth:2,id:"displayname-جعل-أدوات-التطوير-مقروءة",text:"displayName: جعل أدوات التطوير مقروءة"},{depth:2,id:"التركيب-الصحيح-لـ-forwardref-وmemo",text:"التركيب الصحيح لـ forwardRef وmemo"},{depth:3,id:"المكونات-العامة-مع-كلتا-الـ-apiين",text:"المكوّنات العامة مع كلتا الـ APIين"},{depth:2,id:"المزالق-الشائعة-والحلول",text:"المزالق الشائعة والحلول"},{depth:3,id:"المزالق-1-ترتيب-خاطئ-في-التركيب",text:"المزالق 1: ترتيب خاطئ في التركيب"},{depth:3,id:"المزالق-2-أسماء-العرض-المفقودة",text:"المزالق 2: أسماء العرض المفقودة"},{depth:3,id:"المزالق-3-الإفراط-في-استخدام-memo",text:"المزالق 3: الإفراط في استخدام memo"},{depth:3,id:"المزالق-4-نسيان-usecallback-مع-memo",text:"المزالق 4: نسيان useCallback مع memo"},{depth:2,id:"مثال-من-العالم-الحقيقي-مكون-إدخال-قابل-لإعادة-الاستخدام",text:"مثال من العالم الحقيقي: مكوّن إدخال قابل لإعادة الاستخدام"},{depth:2,id:"أنماط-الاستخدام-وأفضل-الممارسات",text:"أنماط الاستخدام وأفضل الممارسات"},{depth:3,id:"متى-تستخدم-كل-api",text:"متى تستخدم كل API"},{depth:3,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"التنقيح-وأدوات-التطوير",text:"التنقيح وأدوات التطوير"},{depth:2,id:"خاتمة",text:"خاتمة"}],e=`<p><code>forwardRef</code> و<code>memo</code> و<code>displayName</code> في React هي أدوات رائعة لبناء مكوّنات سريعة الأداء وقابلة لإعادة الاستخدام. لكن حين تخلطها مع TypeScript — ولا سيما حين تبدأ في تركيبها معًا — تصبح الأمور معقّدة بسرعة. ينكسر استنتاج الأنواع، وتتلخّبط المعاملات العامة (generics)، وتبدأ واجهات مكوّناتك الجميلة في إبهار شكل حروف الأبجدية. لنُصلح ذلك.</p>
<p>بنهاية هذا الدليل، ستعرف كيف تركّب هذه الـ APIs دون أن تفقد أمان الأنواع، وكيف تُبقي أدوات التطوير (DevTools) مقروءة، وكيف تتجنّب المزالق الشائعة التي تجعل المطورين الآخرين يتساءلون عن قراراتك في الحياة.</p>
<h2 id="مشكلة-المكونات-من-الرتبة-العليا-higher-order-components-مع-typescript">مشكلة المكوّنات من الرتبة العليا (Higher-Order Components) مع TypeScript</h2>
<p>إليك ما يحدث عادةً عندما تحاول تركيب هذه الـ APIs:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This looks reasonable but has problems</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = <span class="hljs-title function_">memo</span>(
  forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">Props</span>&gt;(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
  }),
);
</code></pre>
<p>ما الخطأ هنا؟ حسنًا، أشياء كثيرة:</p>
<ol>
<li><strong>اسم العرض مفقود</strong>: ستعرض أدوات التطوير (DevTools) <code>Anonymous</code> أو <code>ForwardRef(memo(...))</code></li>
<li><strong>استنتاج المعاملات العامة (generics)</strong>: إذا كان مكوّنك يستخدم معاملات عامة، سيتلخبط TypeScript بشأن الترتيب</li>
<li><strong>تعقيد الأنواع</strong>: ينتج النوع النهائي فوضى من تواقيع الدوال الملفوفة</li>
<li><strong>ضعف IntelliSense</strong>: يتضرّر الإكمال التلقائي عندما تكون الأنواع معقّدة أكثر من اللازم</li>
</ol>
<p>لنعالج هذه المشكلات واحدة تلو الأخرى.</p>
<h2 id="فهم-forwardref-مع-typescript">فهم <code>forwardRef</code> مع TypeScript</h2>
<p>يتيح لك <code>forwardRef</code> تمرير المراجع عبر مكوّنك إلى عناصر DOM أو إلى المكوّنات الأبناء. ومع TypeScript، عليك أن تكون صريحًا بشأن نوع المرجع الذي تمرّره.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, <span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Good: Explicit ref type</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;input&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Input</span> = forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">InputProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ label, ...props }, ref</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
));
</code></pre>
<p>المعامل العام الأول (<code>HTMLInputElement</code>) يخبر TypeScript بنوع العنصر الذي يشير إليه المرجع. أما المعامل الثاني (<code>InputProps</code>) فيعرّف خصائص مكوّنك.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>ComponentPropsWithoutRef&lt;'input'&gt;</code> بدلًا من <code>HTMLProps&lt;HTMLInputElement&gt;</code> للحصول على أنواع الخصائص الصحيحة مع استبعاد خاصية <code>ref</code> (لأن <code>forwardRef</code> يتولّى ذلك).</p>
</blockquote>
<h3 id="المكونات-العامة-مع-forwardref">المكوّنات العامة مع <code>forwardRef</code></h3>
<p>تصبح الأمور أكثر تعقيدًا حين تريد مكوّنات عامة (generic components):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Generic forwardRef component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;ul&#x27;&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-comment">// Note: We need to cast the result to preserve generics</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">List</span> = <span class="hljs-title function_">forwardRef</span>(
  &lt;T,&gt;<span class="hljs-function">(<span class="hljs-params">{ items, renderItem, ...props }: <span class="hljs-title class_">ListProps</span>&lt;T&gt;, <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">Ref</span>&lt;<span class="hljs-title class_">HTMLUListElement</span>&gt;</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>}&gt;</span>
      {items.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{renderItem(item)}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  ),
) <span class="hljs-keyword">as</span> &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ListProps</span>&lt;T&gt; &amp; { ref?: React.Ref&lt;HTMLUListElement&gt; }</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>;
</code></pre>
<p>هذا التأكيد على النوع (type assertion) في النهاية ضروري لأن <code>forwardRef</code> لا يتعامل بلطف مع الدوال العامة. إنه مطوّل، لكنه يحفظ واجهتك العامة.</p>
<h2 id="memo-متى-تستخدمه-وكيف"><code>memo</code>: متى تستخدمه وكيف</h2>
<p>يمنع <code>React.memo</code> التصييرات غير الضرورية عبر تذكير مكوّنك (memoizing). وهو مكافئ React لـ <code>PureComponent</code> في حالة مكوّنات الدوال.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { memo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserCardProps</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ✅ Simple memo usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserCard</span> = memo&lt;<span class="hljs-title class_">UserCardProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ name, email, avatar }</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-card&quot;</span>&gt;</span>
    {avatar &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">name</span>}&#x27;<span class="hljs-attr">s</span> <span class="hljs-attr">avatar</span>\`} /&gt;</span>}
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
));
</code></pre>
<p>غالبًا يستطيع TypeScript استنتاج نوع الخصائص من مكوّنك، لكن التوضيح الصريح يساعد مع أنواع الخصائص المعقّدة.</p>
<h3 id="دوال-المقارنة-المخصصة">دوال المقارنة المخصّصة</h3>
<p>أحيانًا تحتاج إلى منطق مخصّص لتحديد ما إذا كانت الخصائص قد تغيّرت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExpensiveComponentProps</span> {
  <span class="hljs-attr">data</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> }[];
  <span class="hljs-attr">threshold</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">onUpdate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">ids</span>: <span class="hljs-built_in">string</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveComponent</span> = memo&lt;<span class="hljs-title class_">ExpensiveComponentProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ data, threshold, onUpdate }</span>) =&gt;</span> {
    <span class="hljs-comment">// Expensive computation here...</span>
    <span class="hljs-keyword">const</span> importantIds = data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">value</span> &gt; threshold).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {/* Complex rendering logic */}
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onUpdate(importantIds)}&gt;Update Important Items<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-comment">// Custom comparison function</span>
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Only re-render if data length changes or threshold changes</span>
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">data</span>.<span class="hljs-property">length</span> === nextProps.<span class="hljs-property">data</span>.<span class="hljs-property">length</span> &amp;&amp; prevProps.<span class="hljs-property">threshold</span> === nextProps.<span class="hljs-property">threshold</span>
    );
    <span class="hljs-comment">// Note: We&#x27;re ignoring onUpdate for this example</span>
  },
);
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>كن حذرًا مع دوال المقارنة المخصّصة. فهي تعمل عند كل تصيير، ويمكن أن تتحوّل إلى اختناقات أداء إذا كانت معقّدة أكثر من اللازم. كما أن تجاهل خصائص الدوال (مثل <code>onUpdate</code> أعلاه) قد يؤدي إلى إغلاقات قديمة (stale closures).</p>
</blockquote>
<h2 id="displayname-جعل-أدوات-التطوير-مقروءة"><code>displayName</code>: جعل أدوات التطوير مقروءة</h2>
<p><code>displayName</code> أمر حاسم لأغراض التنقيح. من دونه، تعرض أدوات التطوير أسماء عامة تجعل التنقيح كابوسًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span> = forwardRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ children, ...props }, ref</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>}&gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
));

<span class="hljs-comment">// ✅ Always set displayName for HOCs</span>
<span class="hljs-title class_">Button</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Button&#x27;</span>;

<span class="hljs-comment">// With memo, it gets trickier:</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoizedButton</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title class_">Button</span>);
<span class="hljs-title class_">MemoizedButton</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;memo(Button)&#x27;</span>;
</code></pre>
<p>وللتكوينات المعقّدة، كن وصفيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">ComplexButton</span> = <span class="hljs-title function_">memo</span>(
  forwardRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ children, ...props }, ref</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  )),
);

<span class="hljs-comment">// ✅ Clear, hierarchical display name</span>
<span class="hljs-title class_">ComplexButton</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;memo(forwardRef(Button))&#x27;</span>;
</code></pre>
<h2 id="التركيب-الصحيح-لـ-forwardref-وmemo">التركيب الصحيح لـ <code>forwardRef</code> و<code>memo</code></h2>
<p>الآن لنجمع كل ذلك معًا. إليك النمط الذي يعمل بثبات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, memo, <span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;sm&#x27;</span> | <span class="hljs-string">&#x27;md&#x27;</span> | <span class="hljs-string">&#x27;lg&#x27;</span>;
}

<span class="hljs-comment">// Step 1: Create the base component with forwardRef</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonBase</span> = forwardRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, size = <span class="hljs-string">&#x27;md&#x27;</span>, className, children, ...props }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> classes = <span class="hljs-string">\`btn btn-<span class="hljs-subst">\${variant}</span> btn-<span class="hljs-subst">\${size}</span> <span class="hljs-subst">\${className || <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>.<span class="hljs-title function_">trim</span>();

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classes}</span> {<span class="hljs-attr">...props</span>}&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  },
);

<span class="hljs-comment">// Step 2: Wrap with memo</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title class_">ButtonBase</span>);

<span class="hljs-comment">// Step 3: Set display names</span>
<span class="hljs-title class_">ButtonBase</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Button&#x27;</span>;
<span class="hljs-title class_">Button</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;memo(Button)&#x27;</span>;

<span class="hljs-comment">// Step 4: Export the memoized version</span>
<span class="hljs-keyword">export</span> { <span class="hljs-title class_">Button</span> };
</code></pre>
<p>يقدّم لك هذا النهج:</p>
<ul>
<li>✅ استنتاجًا صحيحًا من TypeScript</li>
<li>✅ أسماء مقروءة في أدوات التطوير</li>
<li>✅ تحسينًا للأداء</li>
<li>✅ شيفرة نظيفة وقابلة للصيانة</li>
</ul>
<h3 id="المكونات-العامة-مع-كلتا-الـ-apiين">المكوّنات العامة مع كلتا الـ APIين</h3>
<p>بالنسبة إلى المكوّنات العامة، النمط مشابه لكنه يتطلّب تلك «رقصة» التأكيد على النوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SelectProps</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;select&#x27;&gt; {
  <span class="hljs-attr">options</span>: T[];
  <span class="hljs-attr">value</span>?: T;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">getOptionLabel</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">option</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">getOptionValue</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">option</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Step 1: Base component with forwardRef</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SelectBase</span> = <span class="hljs-title function_">forwardRef</span>(
  &lt;T,&gt;<span class="hljs-function">(<span class="hljs-params">
    { options, value, onChange, getOptionLabel, getOptionValue, ...props }: <span class="hljs-title class_">SelectProps</span>&lt;T&gt;,
    <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">Ref</span>&lt;<span class="hljs-title class_">HTMLSelectElement</span>&gt;,
  </span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value</span> ? <span class="hljs-attr">getOptionValue</span>(<span class="hljs-attr">value</span>) <span class="hljs-attr">:</span> &#x27;&#x27;}
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
        const selectedOption = options.find((option) =&gt; getOptionValue(option) === e.target.value);
        if (selectedOption) onChange(selectedOption);
      }}
      {...props}
    &gt;
      {options.map((option) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{getOptionValue(option)}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{getOptionValue(option)}</span>&gt;</span>
          {getOptionLabel(option)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
  ),
) <span class="hljs-keyword">as</span> &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">SelectProps</span>&lt;T&gt; &amp; { ref?: React.Ref&lt;HTMLSelectElement&gt; }</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>;

<span class="hljs-comment">// Step 2: Wrap with memo</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Select</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title class_">SelectBase</span>) <span class="hljs-keyword">as</span> <span class="hljs-keyword">typeof</span> <span class="hljs-title class_">SelectBase</span>;

<span class="hljs-comment">// Step 3: Display names</span>
<span class="hljs-title class_">SelectBase</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Select&#x27;</span>;
<span class="hljs-title class_">Select</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;memo(Select)&#x27;</span>;

<span class="hljs-keyword">export</span> { <span class="hljs-title class_">Select</span> };
</code></pre>
<p>التأكيد المزدوج على النوع (<code>memo(SelectBase) as typeof SelectBase</code>) يحفظ التوقيع العام عبر غلاف <code>memo</code>.</p>
<h2 id="المزالق-الشائعة-والحلول">المزالق الشائعة والحلول</h2>
<h3 id="المزالق-1-ترتيب-خاطئ-في-التركيب">المزالق 1: ترتيب خاطئ في التركيب</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Wrong: memo wrapping forwardRef loses ref forwarding</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BadComponent</span> = <span class="hljs-title function_">forwardRef</span>(memo&lt;<span class="hljs-title class_">Props</span>&gt;(<span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* ... */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>));

<span class="hljs-comment">// ✅ Correct: forwardRef first, then memo</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GoodComponent</span> = <span class="hljs-title function_">memo</span>(
  forwardRef&lt;<span class="hljs-title class_">HTMLDivElement</span>, <span class="hljs-title class_">Props</span>&gt;(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>{/* ... */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>),
);
</code></pre>
<h3 id="المزالق-2-أسماء-العرض-المفقودة">المزالق 2: أسماء العرض المفقودة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ DevTools will show &quot;ForwardRef&quot; or &quot;Anonymous&quot;</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title function_">forwardRef</span>(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span></span>));

<span class="hljs-comment">// ✅ Always set display names</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title function_">forwardRef</span>(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span></span>));
<span class="hljs-title class_">MyComponent</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;MyComponent&#x27;</span>;
</code></pre>
<h3 id="المزالق-3-الإفراط-في-استخدام-memo">المزالق 3: الإفراط في استخدام <code>memo</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t memo components that always receive new props</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AlwaysNewProps</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ onClick }: { onClick: () =&gt; <span class="hljs-built_in">void</span> }</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
));

<span class="hljs-comment">// Parent component:</span>
<span class="hljs-comment">// &lt;AlwaysNewProps onClick={() =&gt; console.log(&#x27;clicked&#x27;)} /&gt; // New function every render!</span>

<span class="hljs-comment">// ✅ Memo is pointless here—the function prop changes every time</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">JustAButton</span> = (<span class="hljs-params">{ onClick }: { onClick: () =&gt; <span class="hljs-built_in">void</span> }</span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
);
</code></pre>
<h3 id="المزالق-4-نسيان-usecallback-مع-memo">المزالق 4: نسيان <code>useCallback</code> مع <code>memo</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ memo is useless because handleClick changes every render</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Parent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>); <span class="hljs-comment">// New function every render</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MemoizedChild</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Stable callback makes memo effective</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Parent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>), []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MemoizedChild</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span></span>;
};
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-مكون-إدخال-قابل-لإعادة-الاستخدام">مثال من العالم الحقيقي: مكوّن إدخال قابل لإعادة الاستخدام</h2>
<p>لنبنِ مكوّن إدخال شاملًا يوضّح كل هذه المفاهيم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, memo, useId, <span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;input&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">helperText</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Base component with forwardRef</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">InputBase</span> = forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">InputProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ label, error, helperText, className, ...props }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> id = <span class="hljs-title function_">useId</span>();
    <span class="hljs-keyword">const</span> inputId = props.<span class="hljs-property">id</span> || id;

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;input-field&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">{inputId}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;input-label&quot;</span>&gt;</span>
          {label}
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">{inputId}</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">input</span> \${<span class="hljs-attr">error</span> ? &#x27;<span class="hljs-attr">input--error</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`}
          <span class="hljs-attr">aria-describedby</span>=<span class="hljs-string">{error</span> || <span class="hljs-attr">helperText</span> ? \`\${<span class="hljs-attr">inputId</span>}<span class="hljs-attr">-description</span>\` <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}
          {<span class="hljs-attr">...props</span>}
        /&gt;</span>
        {(error || helperText) &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">inputId</span>}<span class="hljs-attr">-description</span>\`} <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;input-description&quot;</span>&gt;</span>
            {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;input-error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
            {!error &amp;&amp; helperText &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;input-helper&quot;</span>&gt;</span>{helperText}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
);

<span class="hljs-comment">// Memoized version</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Input</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-title class_">InputBase</span>);

<span class="hljs-comment">// Display names for DevTools</span>
<span class="hljs-title class_">InputBase</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Input&#x27;</span>;
<span class="hljs-title class_">Input</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;memo(Input)&#x27;</span>;

<span class="hljs-keyword">export</span> { <span class="hljs-title class_">Input</span> };
</code></pre>
<p>هذا المكوّن:</p>
<ul>
<li><strong>يمكن الوصول إليه</strong>: تسمية صحيحة وخصائص ARIA</li>
<li><strong>سريع الأداء</strong>: مُذكَّر (memoized) لمنع التصييرات غير الضرورية</li>
<li><strong>يدعم المراجع</strong>: يمكن تركيز حقل الإدخال بشكل إجرائي</li>
<li><strong>آمن الأنواع</strong>: دعم كامل من TypeScript بأنواع خصائص صحيحة</li>
<li><strong>قابل للتنقيح</strong>: أسماء عرض واضحة في أدوات التطوير</li>
</ul>
<h2 id="أنماط-الاستخدام-وأفضل-الممارسات">أنماط الاستخدام وأفضل الممارسات</h2>
<h3 id="متى-تستخدم-كل-api">متى تستخدم كل API</h3>
<p><strong><code>forwardRef</code></strong>:</p>
<ul>
<li>✅ بناء مكوّنات واجهة قابلة لإعادة الاستخدام (حقول إدخال، أزرار)</li>
<li>✅ إنشاء مكتبات مكوّنات</li>
<li>✅ حين تحتاج المكوّنات الأب إلى وصول إجرائي إلى عناصر DOM</li>
<li>❌ كل مكوّن (استخدمه فقط حين تكون المراجع مطلوبة فعلًا)</li>
</ul>
<p><strong><code>memo</code></strong>:</p>
<ul>
<li>✅ المكوّنات التي تتلقّى خصائص مستقرة معظم الوقت</li>
<li>✅ المكوّنات المكلفة التي تُصيَّر كثيرًا</li>
<li>✅ المكوّنات داخل القوائم الكبيرة (بمفاتيح مستقرة)</li>
<li>❌ المكوّنات التي تتلقّى خصائص جديدة في كل مرة</li>
<li>❌ المكوّنات الرخيصة جدًا (فحص <code>memo</code> قد يكلّف أكثر من إعادة التصيير)</li>
</ul>
<p><strong><code>displayName</code></strong>:</p>
<ul>
<li>✅ استخدمه دائمًا مع المكوّنات من الرتبة العليا (HOCs) مثل <code>memo</code> و<code>forwardRef</code></li>
<li>✅ تركيبات المكوّنات المعقّدة</li>
<li>✅ مكتبات المكوّنات (لتحسين تجربة المطوّر)</li>
<li>❌ المكوّنات البسيطة بلا HOCs (يستنتج React الاسم من الدالة)</li>
</ul>
<h3 id="اعتبارات-الأداء">اعتبارات الأداء</h3>
<p>تذكّر أن <code>memo</code> و<code>forwardRef</code> كلاهما يضيف الحمل الضئيل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good use case: Expensive component with stable props</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveChart</span> = <span class="hljs-title function_">memo</span>(
  forwardRef&lt;<span class="hljs-title class_">SVGSVGElement</span>, <span class="hljs-title class_">ChartProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ data, width, height }, ref</span>) =&gt;</span> {
    <span class="hljs-comment">// Complex chart rendering logic...</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>{/* ... */}<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></span>;
  }),
);

<span class="hljs-comment">// ❌ Probably overkill: Simple component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SimpleDiv</span> = <span class="hljs-title function_">memo</span>(
  forwardRef&lt;<span class="hljs-title class_">HTMLDivElement</span>, { <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span> }&gt;(<span class="hljs-function">(<span class="hljs-params">{ children }, ref</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )),
);
</code></pre>
<h2 id="التنقيح-وأدوات-التطوير">التنقيح وأدوات التطوير</h2>
<p>مع الاستخدام الصحيح لـ <code>displayName</code>، تبدو شجرة مكوّناتك هكذا:</p>
<pre><code>App
├── memo(UserList)
│   ├── memo(forwardRef(UserCard))
│   ├── memo(forwardRef(UserCard))
│   └── memo(forwardRef(UserCard))
└── memo(forwardRef(SearchInput))
</code></pre>
<p>ومن دونه، تحصل على:</p>
<pre><code>App
├── Anonymous
│   ├── ForwardRef
│   ├── ForwardRef
│   └── ForwardRef
└── ForwardRef
</code></pre>
<p>خمّن أيّهما أسهل في التنقيح عند الساعة الثانية فجرًا؟</p>
<h2 id="خاتمة">خاتمة</h2>
<p><code>forwardRef</code> و<code>memo</code> و<code>displayName</code> أدوات قويّة، لكنها سهلة إساءة الاستخدام أيضًا. والمفتاح هو فهم متى تقدّم كل منها قيمة:</p>
<ul>
<li><strong><code>forwardRef</code></strong>: استخدمه حين تحتاج المراجع إلى المرور عبر مكوّنك</li>
<li><strong><code>memo</code></strong>: استخدمه للمكوّنات المكلفة ذات الخصائص المستقرة</li>
<li><strong><code>displayName</code></strong>: استخدمه دائمًا مع المكوّنات من الرتبة العليا لتحسين التنقيح</li>
</ul>
<p>حين تدمجها بعناية مع TypeScript، تحصل على مكوّنات سريعة الأداء وآمنة الأنواع وقابلة للصيانة. وستشكرك نسختك المستقبلية (وزملاؤك) على الجهد الإضافي.</p>
<p>وتذكّر: التحسين المبكّر هو مصدر كل الشرور، لكن حين تحتاج فعلًا إلى هذه الأدوات فاستخدمها بشكل صحيح. ستفيدك الأنماط في هذا الدليل كثيرًا وأنت تبني تطبيقات React متينة باستخدام TypeScript.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
