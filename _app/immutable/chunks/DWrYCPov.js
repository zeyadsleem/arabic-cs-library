const s="kinney",a="react-typescript",n="React مع TypeScript",l="mirror-dom-props",p="محاكاة خصائص DOM",t=[{depth:2,id:"المشكلة-تمرير-الخصائص-يدويا",text:"المشكلة: تمرير الخصائص يدويًا"},{depth:2,id:"الحل-componentpropswithoutref",text:"الحل: ComponentPropsWithoutRef"},{depth:2,id:"فهم-سحر-الأنواع",text:"فهم سحر الأنواع"},{depth:2,id:"العمل-مع-عناصر-html-مختلفة",text:"العمل مع عناصر HTML مختلفة"},{depth:2,id:"التعامل-بأناقة-مع-تعارض-الخصائص",text:"التعامل بأناقة مع تعارض الخصائص"},{depth:2,id:"إضافة-دعم-forwardref",text:"إضافة دعم forwardRef"},{depth:2,id:"مثال-من-العالم-الحقيقي-بناء-مكون-رابط",text:"مثال من العالم الحقيقي: بناء مكوّن رابط"},{depth:2,id:"النمط-المتقدم-المكونات-متعددة-الأشكال",text:"النمط المتقدّم: المكوّنات متعددة الأشكال"},{depth:2,id:"الأنماط-الشائعة-وأفضل-الممارسات",text:"الأنماط الشائعة وأفضل الممارسات"},{depth:3,id:"النمط-1-مكون-الغلاف",text:"النمط 1: مكوّن الغلاف"},{depth:3,id:"النمط-2-المكون-المحسن",text:"النمط 2: المكوّن المحسَّن"},{depth:3,id:"النمط-3-المكون-المركب",text:"النمط 3: المكوّن المركّب"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"نصائح-التنقيح",text:"نصائح التنقيح"},{depth:2,id:"ترسانة-أنواع-dom-في-react",text:"ترسانة أنواع DOM في React"},{depth:3,id:"مقارنة-بين-htmlattributes-وhtmlprops-وallhtmlattributes",text:"مقارنة بين HTMLAttributes وHTMLProps وAllHTMLAttributes"},{depth:3,id:"htmlattributes-الأساس",text:"HTMLAttributes: الأساس"},{depth:3,id:"htmlprops-الحزمة-الكاملة",text:"HTMLProps: الحزمة الكاملة"},{depth:3,id:"allhtmlattributes-كل-الصفات-مجتمعة",text:"AllHTMLAttributes: كل الصفات مجتمعة"},{depth:3,id:"jsxintrinsicelements-خرائط-عناصر-آمنة-الأنواع",text:"JSX.IntrinsicElements: خرائط عناصر آمنة الأنواع"},{depth:3,id:"اختيار-النوع-الصحيح-مصفوفة-قرار",text:"اختيار النوع الصحيح: مصفوفة قرار"},{depth:3,id:"مثال-من-العالم-الحقيقي-بناء-نظام-حقول-للنماذج",text:"مثال من العالم الحقيقي: بناء نظام حقول للنماذج"},{depth:3,id:"اعتبارات-الأداء-وحجم-الحزمة",text:"اعتبارات الأداء وحجم الحزمة"},{depth:2,id:"استراتيجية-الترحيل",text:"استراتيجية الترحيل"},{depth:2,id:"إلى-الأمام",text:"إلى الأمام"},{depth:2,id:"زر-منمط-بـ-as-ومراجع-آمنة",text:"زر مُنمَّط بـ as ومراجع آمنة"}],e=`<p>بناء مكوّنات غلاف (wrapper components) حول عناصر DOM الأصلية هو أحد تلك الأمور التي تبدو بسيطة حتى تدرك أنك تحتاج إلى دعم جميع الخصائص. أنت تعرف الإجراء: تبني مكوّن <code>Button</code> جميلًا، ثم يحتاج أحدهم إلى <code>onClick</code>، ثم <code>disabled</code>، ثم <code>aria-label</code>، ثم <code>onMouseEnter</code>، وقبل أن تدري إنك تكتب يدويًا عشرات الخصائص التي يدعمها <code>&lt;button&gt;</code> الأصلي دعمًا مثاليًا.</p>
<p>وهنا يأتي <code>ComponentPropsWithoutRef</code> — نوع أدوات في React يمنحك جميع خصائص عنصر أصلي دون فوضى المراجع. وكأنك حصلت على تذكرة دعوة VIP إلى وليمة خصائص DOM مع إبقاء TypeScript راضيًا وإكمالك التلقائي سريعًا.</p>
<h2 id="المشكلة-تمرير-الخصائص-يدويا">المشكلة: تمرير الخصائص يدويًا</h2>
<p>لنبدأ بالمنهج الشائع الذي يجعل حياة الجميع أصعب:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - manually defining every prop you might need</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;button&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span> | <span class="hljs-string">&#x27;reset&#x27;</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>;
  <span class="hljs-comment">// ... what about onMouseEnter? onFocus? aria-label?</span>
  <span class="hljs-comment">// This list gets unwieldy fast</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ children, onClick, disabled, <span class="hljs-keyword">type</span>, className, style }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">{type}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>
      // <span class="hljs-attr">Oops</span>, <span class="hljs-attr">forgot</span> <span class="hljs-attr">to</span> <span class="hljs-attr">spread</span> <span class="hljs-attr">the</span> <span class="hljs-attr">rest</span> <span class="hljs-attr">props</span>!
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>لهذا النهج عدة مشكلات:</p>
<ul>
<li><strong>ناقصة</strong>: ستنسى حتمًا خصائص يحتاجها المستخدمون</li>
<li><strong>عبء صيانة</strong>: كل متطلب خاصية جديد يعني تحديث الواجهة</li>
<li><strong>انزياح الأنواع</strong>: قد لا تتطابق خصائصك المخصّصة مع سلوك عنصر DOM الفعلي</li>
<li><strong>بلا إكمال تلقائي</strong>: لا يحصل المستخدمون على IntelliSense لخصائص HTML القياسية</li>
</ul>
<h2 id="الحل-componentpropswithoutref">الحل: ComponentPropsWithoutRef</h2>
<p><code>ComponentPropsWithoutRef</code> هو نوع أدوات يستخرج جميع الخصائص من نوع عنصر HTML معيّن، بطرح خاصية <code>ref</code> (التي سنتعامل معها على حدة عند الحاجة):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Good - get all button props automatically</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;sm&#x27;</span> | <span class="hljs-string">&#x27;md&#x27;</span> | <span class="hljs-string">&#x27;lg&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, size = <span class="hljs-string">&#x27;md&#x27;</span>, className, ...props }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> variantClass = <span class="hljs-string">\`btn--<span class="hljs-subst">\${variant}</span>\`</span>;
  <span class="hljs-keyword">const</span> sizeClass = <span class="hljs-string">\`btn--<span class="hljs-subst">\${size}</span>\`</span>;
  <span class="hljs-keyword">const</span> classes = <span class="hljs-string">\`btn <span class="hljs-subst">\${variantClass}</span> <span class="hljs-subst">\${sizeClass}</span> <span class="hljs-subst">\${className || <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>.<span class="hljs-title function_">trim</span>();

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classes}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}
</code></pre>
<p>الآن يدعم مكوّن <code>Button</code> تلقائيًا كل خاصية تدعمها عناصر <code>&lt;button&gt;</code> الأصلية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ All of these work automatically with full TypeScript support</span>
&lt;<span class="hljs-title class_">Button</span> onClick={<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;clicked&#x27;</span>)}&gt;<span class="hljs-title class_">Basic</span>&lt;/<span class="hljs-title class_">Button</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">disabled</span>&gt;</span>Disabled<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">form</span>=<span class="hljs-string">&quot;my-form&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;hover&#x27;)} aria-label=&quot;Close dialog&quot;&gt;
  ×
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
  <span class="hljs-attr">onKeyDown</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.key === &#x27;Enter&#x27; &amp;&amp; console.log(&#x27;enter pressed&#x27;)}
  tabIndex={0}
&gt;
  Accessible
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
</code></pre>
<h2 id="فهم-سحر-الأنواع">فهم سحر الأنواع</h2>
<p>لنُطل على الآلية الداخلية لفهم ما يقدّمه <code>ComponentPropsWithoutRef</code> فعليًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// This is roughly what ComponentPropsWithoutRef&lt;&#x27;button&#x27;&gt; expands to:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonElementProps</span> = {
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onMouseEnter</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onFocus</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FocusEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;button&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span> | <span class="hljs-string">&#x27;reset&#x27;</span>;
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">tabIndex</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>;
  <span class="hljs-comment">// ... and about 50+ more props</span>
};
</code></pre>
<p>الجميل في الأمر أنك لا تحتاج إلى معرفة هذه القائمة أو صيانتها — تتولّى تعريفات أنواع React ذلك نيابةً عنك، وتبقى محدَّثة مع معايير الويب.</p>
<h2 id="العمل-مع-عناصر-html-مختلفة">العمل مع عناصر HTML مختلفة</h2>
<p>يعمل <code>ComponentPropsWithoutRef</code> مع أي عنصر HTML. ما عليك سوى تغيير السلسلة الحرفية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Input component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;input&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ label, error, className, ...props }: <span class="hljs-title class_">InputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">input</span> \${<span class="hljs-attr">error</span> ? &#x27;<span class="hljs-attr">input--error</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`} {<span class="hljs-attr">...props</span>} /&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Div wrapper component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;div&#x27;&gt; {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">actions</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ title, actions, children, className, ...props }: <span class="hljs-title class_">CardProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">card</span> \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`} {<span class="hljs-attr">...props</span>}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card-header&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        {actions &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card-actions&quot;</span>&gt;</span>{actions}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card-content&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-بأناقة-مع-تعارض-الخصائص">التعامل بأناقة مع تعارض الخصائص</h2>
<p>أحيانًا قد تتعارض خصائصك المخصّصة مع خصائص DOM الأصلية. إليك كيفية التعامل مع ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// What if your custom &#x27;size&#x27; conflicts with the native &#x27;size&#x27; attribute?</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;input&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-comment">// Our custom size prop (different from input&#x27;s native size)</span>
  <span class="hljs-attr">inputSize</span>?: <span class="hljs-string">&#x27;sm&#x27;</span> | <span class="hljs-string">&#x27;md&#x27;</span> | <span class="hljs-string">&#x27;lg&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ label, inputSize = <span class="hljs-string">&#x27;md&#x27;</span>, ...props }: <span class="hljs-title class_">InputProps</span></span>) {
  <span class="hljs-comment">// Native &#x27;size&#x27; prop is still available in ...props if needed</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">input</span> <span class="hljs-attr">input--</span>\${<span class="hljs-attr">inputSize</span>}\`} {<span class="hljs-attr">...props</span>} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage:</span>
&lt;<span class="hljs-title class_">Input</span>
  label=<span class="hljs-string">&quot;Username&quot;</span>
  inputSize=<span class="hljs-string">&quot;lg&quot;</span> <span class="hljs-comment">// Our custom size</span>
  size={<span class="hljs-number">20</span>} <span class="hljs-comment">// Native size attribute (character width)</span>
  maxLength={<span class="hljs-number">50</span>} <span class="hljs-comment">// Native maxLength works too</span>
/&gt;;
</code></pre>
<p>وإذا احتجت إلى تجاوز خاصية أصلية تمامًا، استخدم <code>Omit</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CustomButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt;, &#x27;onClick&#x27;&gt; {
  <span class="hljs-comment">// Replace the native onClick with our own signature</span>
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">buttonType</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">buttonType</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CustomButton</span>(<span class="hljs-params">{ onClick, buttonType, ...props }: <span class="hljs-title class_">CustomButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onClick(buttonType)} /&gt;</span>;
}
</code></pre>
<h2 id="إضافة-دعم-forwardref">إضافة دعم <code>forwardRef</code></h2>
<p>حين تحتاج إلى تمرير المراجع، اجمع بين <code>ComponentPropsWithoutRef</code> و<code>forwardRef</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;sm&#x27;</span> | <span class="hljs-string">&#x27;md&#x27;</span> | <span class="hljs-string">&#x27;lg&#x27;</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span> = forwardRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, size = <span class="hljs-string">&#x27;md&#x27;</span>, className, ...props }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> classes = <span class="hljs-string">\`btn btn--<span class="hljs-subst">\${variant}</span> btn--<span class="hljs-subst">\${size}</span> <span class="hljs-subst">\${className || <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>.<span class="hljs-title function_">trim</span>();

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classes}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
  },
);

<span class="hljs-title class_">Button</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Button&#x27;</span>;
</code></pre>
<p>الآن يدعم مكوّنك المراجع <em>و</em>كل خصائص الزر الأصلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> buttonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{buttonRef}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> buttonRef.current?.focus()}
      onMouseEnter={() =&gt; console.log(&#x27;hovered&#x27;)}
      disabled={false}
      type=&quot;button&quot;
      aria-label=&quot;Focus me&quot;
    &gt;
      Click to focus myself
    <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-بناء-مكون-رابط">مثال من العالم الحقيقي: بناء مكوّن رابط</h2>
<p>إليك مثالًا شاملًا يوضّح <code>ComponentPropsWithoutRef</code> في العمل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, <span class="hljs-title class_">ComponentPropsWithoutRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Support both internal links (to) and external links (href)</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">BaseLinkProps</span> = <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;a&#x27;</span>&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InternalLinkProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">BaseLinkProps</span>, &#x27;href&#x27;&gt; {
  <span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">external</span>?: <span class="hljs-literal">false</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExternalLinkProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">BaseLinkProps</span>, &#x27;href&#x27;&gt; {
  <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">external</span>: <span class="hljs-literal">true</span>;
  <span class="hljs-attr">openInNewTab</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LinkProps</span> = <span class="hljs-title class_">InternalLinkProps</span> | <span class="hljs-title class_">ExternalLinkProps</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Link</span> = forwardRef&lt;<span class="hljs-title class_">HTMLAnchorElement</span>, <span class="hljs-title class_">LinkProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (props.<span class="hljs-property">external</span>) {
    <span class="hljs-keyword">const</span> { href, openInNewTab = <span class="hljs-literal">true</span>, ...rest } = props;
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">{href}</span>
        <span class="hljs-attr">target</span>=<span class="hljs-string">{openInNewTab</span> ? &#x27;<span class="hljs-attr">_blank</span>&#x27; <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}
        <span class="hljs-attr">rel</span>=<span class="hljs-string">{openInNewTab</span> ? &#x27;<span class="hljs-attr">noopener</span> <span class="hljs-attr">noreferrer</span>&#x27; <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}
        {<span class="hljs-attr">...rest</span>}
      /&gt;</span></span>
    );
  }

  <span class="hljs-keyword">const</span> { to, ...rest } = props;
  <span class="hljs-comment">// In a real app, you&#x27;d use your router&#x27;s Link component here</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{to}</span> {<span class="hljs-attr">...rest</span>} /&gt;</span></span>;
});

<span class="hljs-title class_">Link</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Link&#x27;</span>;

<span class="hljs-comment">// Usage with full type safety and autocomplete:</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/dashboard&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;nav-link&quot;</span>&gt;</span>
  Dashboard
<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
  <span class="hljs-attr">external</span>
  <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://example.com&quot;</span>
  <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;external link hovered&#x27;)}
  aria-label=&quot;Visit external site&quot;
&gt;
  External Site
<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
</code></pre>
<h2 id="النمط-المتقدم-المكونات-متعددة-الأشكال">النمط المتقدّم: المكوّنات متعددة الأشكال</h2>
<p>لأقصى قدر من المرونة، يمكنك إنشاء مكوّنات قادرة على التصيير كعناصر HTML مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentPropsWithoutRef</span>, <span class="hljs-title class_">ElementType</span>, forwardRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PolymorphicProps</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span>&gt; {
  <span class="hljs-attr">as</span>?: T;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PolymorphicComponentProps</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span>&gt; =
  <span class="hljs-title class_">PolymorphicProps</span>&lt;T&gt; &amp; <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;T&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">PolymorphicComponent</span> = <span class="hljs-title function_">forwardRef</span>(
  &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span> = <span class="hljs-string">&#x27;div&#x27;</span>&gt;<span class="hljs-function">(<span class="hljs-params">
    { <span class="hljs-keyword">as</span>, variant = <span class="hljs-string">&#x27;primary&#x27;</span>, className, ...props }: <span class="hljs-title class_">PolymorphicComponentProps</span>&lt;T&gt;,
    <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">Ref</span>&lt;<span class="hljs-built_in">any</span>&gt;
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = <span class="hljs-keyword">as</span> || <span class="hljs-string">&#x27;div&#x27;</span>;
    <span class="hljs-keyword">const</span> classes = <span class="hljs-string">\`component component--<span class="hljs-subst">\${variant}</span> <span class="hljs-subst">\${className || <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>.<span class="hljs-title function_">trim</span>();

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classes}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
  }
);

<span class="hljs-comment">// Usage: same component, different elements, all properly typed</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PolymorphicComponent</span>&gt;</span>Default div<span class="hljs-tag">&lt;/<span class="hljs-name">PolymorphicComponent</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PolymorphicComponent</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> alert(&#x27;clicked&#x27;)}&gt;
  Button variant
<span class="hljs-tag">&lt;/<span class="hljs-name">PolymorphicComponent</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PolymorphicComponent</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/link&quot;</span>&gt;</span>
  Link variant
<span class="hljs-tag">&lt;/<span class="hljs-name">PolymorphicComponent</span>&gt;</span></span>
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>المكوّنات متعددة الأشكال قويّة لكنها معقّدة. استخدمها باعتدال — معظم المكوّنات تعمل بشكل أفضل مع نوع عنصر ثابت.</p>
</blockquote>
<h2 id="الأنماط-الشائعة-وأفضل-الممارسات">الأنماط الشائعة وأفضل الممارسات</h2>
<h3 id="النمط-1-مكون-الغلاف">النمط 1: مكوّن الغلاف</h3>
<p>مثالي لإضافة التنسيق أو السلوك إلى العناصر الأصلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">StyledInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;input&#x27;&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;outline&#x27;</span> | <span class="hljs-string">&#x27;filled&#x27;</span> | <span class="hljs-string">&#x27;underline&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">StyledInput</span>(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;outline&#x27;</span>, className, ...props }: <span class="hljs-title class_">StyledInputProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">input</span> <span class="hljs-attr">input--</span>\${<span class="hljs-attr">variant</span>} \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`} {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-2-المكون-المحسن">النمط 2: المكوّن المحسَّن</h3>
<p>إضافة وظائف مع الحفاظ على الواجهة الأصلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AutoResizeTextareaProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;textarea&#x27;&gt; {
  <span class="hljs-attr">minRows</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">maxRows</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AutoResizeTextarea</span>(<span class="hljs-params">{
  minRows = <span class="hljs-number">1</span>,
  maxRows = <span class="hljs-number">10</span>,
  style,
  onChange,
  ...props
}: <span class="hljs-title class_">AutoResizeTextareaProps</span></span>) {
  <span class="hljs-keyword">const</span> [rows, setRows] = <span class="hljs-title function_">useState</span>(minRows);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLTextAreaElement</span>&gt;</span>) =&gt; {
    <span class="hljs-comment">// Auto-resize logic here...</span>
    <span class="hljs-keyword">const</span> newRows = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(maxRows, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(minRows <span class="hljs-comment">/* calculated rows */</span>));
    <span class="hljs-title function_">setRows</span>(newRows);
    onChange?.(e);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">{rows}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">resize:</span> &#x27;<span class="hljs-attr">none</span>&#x27;, <span class="hljs-attr">...style</span> }} <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>
  );
}
</code></pre>
<h3 id="النمط-3-المكون-المركب">النمط 3: المكوّن المركّب</h3>
<p>بناء مكوّنات معقّدة من مكوّنات بسيطة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;div&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FormField</span>(<span class="hljs-params">{ label, error, required, children, className, ...props }: <span class="hljs-title class_">FormFieldProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">form-field</span> \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`} {<span class="hljs-attr">...props</span>}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;form-label&quot;</span>&gt;</span>
        {label}
        {required &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;required&quot;</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      {children}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;form-error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage:</span>
&lt;<span class="hljs-title class_">FormField</span> label=<span class="hljs-string">&quot;Email&quot;</span> required error={emailError}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StyledInput</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">FormField</span>&gt;;
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p><code>ComponentPropsWithoutRef</code> له كلفة تشغيل ضئيلة لأنه مجرّد بنية على مستوى الأنواع. لكن هناك بعض الأمور التي ينبغي مراعاتها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - destructuring commonly used props</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ disabled, className, ...props }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-comment">// Process disabled and className specifically</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{processClassName(className)}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Less ideal - spreading everything always</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-comment">// This works but you lose the ability to process specific props</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}
</code></pre>
<h2 id="نصائح-التنقيح">نصائح التنقيح</h2>
<p>حين تسوء الأمور مع أنواع الخصائص، تساعدك هذه الأنماط على التنقيح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Add type assertions to understand what you&#x27;re working with</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">debugComponent</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt;</span>) {
  <span class="hljs-comment">// Hover over this in your IDE to see all available props</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">allProps</span>: <span class="hljs-keyword">typeof</span> props = props;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Available props:&#x27;</span>, <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(allProps));

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}

<span class="hljs-comment">// Use satisfies to ensure your component meets the interface</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyButton</span> = (<span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}) <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt;&gt;;
</code></pre>
<h2 id="ترسانة-أنواع-dom-في-react">ترسانة أنواع DOM في React</h2>
<p>في حين أن <code>ComponentPropsWithoutRef</code> هو خيارك الأول في معظم الحالات، يوفّر React مجموعة من أدوات ربط DOM أكثر تخصّصًا. وفهم متى ولماذا تستخدم كل واحدة منها سيرفع مستواك في TypeScript.</p>
<h3 id="مقارنة-بين-htmlattributes-وhtmlprops-وallhtmlattributes">مقارنة بين HTMLAttributes وHTMLProps وAllHTMLAttributes</h3>
<p>توفّر هذه الأنواع مستويات مختلفة من دعم خصائص HTML، ولكل منها حالات استخدام محدّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTMLAttributes</span>, <span class="hljs-title class_">HTMLProps</span>, <span class="hljs-title class_">AllHTMLAttributes</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// HTMLAttributes: Standard HTML attributes without form-specific props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DivWrapperProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;card&#x27;</span> | <span class="hljs-string">&#x27;panel&#x27;</span>;
}

<span class="hljs-comment">// HTMLProps: HTMLAttributes + form element props (value, checked, etc.)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CustomInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// AllHTMLAttributes: Union of all possible HTML attributes</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GenericWrapperProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">AllHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLElement</span>&gt; {
  <span class="hljs-attr">as</span>?: keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>;
}
</code></pre>
<p>لنُفصّل الفروقات:</p>
<h3 id="htmlattributes-الأساس">HTMLAttributes: الأساس</h3>
<p>يتضمّن <code>HTMLAttributes</code> جميع خصائص HTML الشائعة لكنه يستثني الخصائص الخاصة بنوع العنصر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// HTMLAttributes includes these common props:</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">HTMLAttributes</span>&lt;T&gt; {
  <span class="hljs-comment">// Core attributes</span>
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">id</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">CSSProperties</span>;

  <span class="hljs-comment">// Event handlers</span>
  <span class="hljs-attr">onClick</span>?: <span class="hljs-title class_">MouseEventHandler</span>&lt;T&gt;;
  <span class="hljs-attr">onMouseEnter</span>?: <span class="hljs-title class_">MouseEventHandler</span>&lt;T&gt;;
  <span class="hljs-attr">onKeyDown</span>?: <span class="hljs-title class_">KeyboardEventHandler</span>&lt;T&gt;;

  <span class="hljs-comment">// ARIA and data attributes</span>
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;data-testid&#x27;</span>?: <span class="hljs-built_in">string</span>;

  <span class="hljs-comment">// And many more...</span>
  <span class="hljs-comment">// But NOT element-specific like &#x27;value&#x27;, &#x27;checked&#x27;, &#x27;href&#x27;, etc.</span>
}

<span class="hljs-comment">// Perfect for wrapper components that don&#x27;t need specific element props</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">Panel</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span> = <span class="hljs-title class_">HTMLDivElement</span>&gt;({
  children,
  className,
  ...props
}: <span class="hljs-title class_">HTMLAttributes</span>&lt;T&gt; &amp; { <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span> }) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">panel</span> \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`} {<span class="hljs-attr">...props</span>}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="htmlprops-الحزمة-الكاملة">HTMLProps: الحزمة الكاملة</h3>
<p>يوسّع <code>HTMLProps</code> نوع <code>HTMLAttributes</code> بالخصائص الخاصة بنوع العنصر. وهذا هو ما يستخدمه <code>ComponentPropsWithoutRef</code> في الخلفية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// HTMLProps includes everything from HTMLAttributes PLUS element-specific props</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InputHTMLProps</span> = <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;;
<span class="hljs-comment">// Includes: value, checked, type, placeholder, etc.</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AnchorHTMLProps</span> = <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLAnchorElement</span>&gt;;
<span class="hljs-comment">// Includes: href, target, rel, download, etc.</span>

<span class="hljs-comment">// Use HTMLProps when you need ALL props including element-specific ones</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EnhancedInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">EnhancedInput</span>(<span class="hljs-params">{ label, error, ...inputProps }: <span class="hljs-title class_">EnhancedInputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;form-field&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> {<span class="hljs-attr">...inputProps</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">{error</span> ? &#x27;<span class="hljs-attr">error</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} /&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-message&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// All input-specific props work:</span>
&lt;<span class="hljs-title class_">EnhancedInput</span>
  label=<span class="hljs-string">&quot;Email&quot;</span>
  <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;email&quot;</span>
  value={email}
  onChange={handleChange}
  required
  placeholder=<span class="hljs-string">&quot;Enter your email&quot;</span>
/&gt;;
</code></pre>
<h3 id="allhtmlattributes-كل-الصفات-مجتمعة">AllHTMLAttributes: كل الصفات مجتمعة</h3>
<p><code>AllHTMLAttributes</code> هو اتحاد جميع خصائص عناصر HTML. استخدمه عند بناء مكوّنات عامة بدرجة عالية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// AllHTMLAttributes includes EVERY possible HTML attribute</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GenericElementProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">AllHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLElement</span>&gt; {
  <span class="hljs-attr">as</span>?: keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">GenericElement</span>(<span class="hljs-params">{
  <span class="hljs-keyword">as</span>: Component = <span class="hljs-string">&#x27;div&#x27;</span>,
  ...props
}: <span class="hljs-title class_">GenericElementProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}

<span class="hljs-comment">// Can use ANY HTML attribute</span>
&lt;<span class="hljs-title class_">GenericElement</span> <span class="hljs-keyword">as</span>=<span class="hljs-string">&quot;input&quot;</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;text&quot;</span> value=<span class="hljs-string">&quot;test&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">GenericElement</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/home&quot;</span> <span class="hljs-attr">target</span>=<span class="hljs-string">&quot;_blank&quot;</span> /&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">GenericElement</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {}} disabled /&gt;</span>
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>قد يؤدّي <code>AllHTMLAttributes</code> إلى واجهات مُربكة لأنه يسمح بأي خاصية HTML مهما كان نوع العنصر. استخدمه باعتدال وفضّل الأنواع الأدقّ كلما أمكن.</p>
</blockquote>
<h3 id="jsxintrinsicelements-خرائط-عناصر-آمنة-الأنواع">JSX.IntrinsicElements: خرائط عناصر آمنة الأنواع</h3>
<p>يوفّر <code>JSX.IntrinsicElements</code> خريطة تربط أسماء عناصر HTML بأنواع خصائصها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// JSX.IntrinsicElements maps element names to their prop types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DivProps</span> = <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;div&#x27;</span>];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InputProps</span> = <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;input&#x27;</span>];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;button&#x27;</span>];

<span class="hljs-comment">// Use it to create type-safe element factories</span>
<span class="hljs-keyword">function</span> createElement&lt;K <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>&gt;(
  <span class="hljs-attr">type</span>: K,
  <span class="hljs-attr">props</span>: <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[K],
): <span class="hljs-title class_">ReactElement</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-keyword">type</span>, props);
}

<span class="hljs-comment">// Type-safe based on element type</span>
<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;input&#x27;</span>, { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;test&#x27;</span> }); <span class="hljs-comment">// ✅</span>
<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>, { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span> }); <span class="hljs-comment">// ❌ Type error: div doesn&#x27;t have &#x27;type&#x27;</span>
</code></pre>
<p>وهذا قويّ للغاية لبناء مكوّنات متعددة الأشكال بأمان أنواع كامل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-safe polymorphic component using JSX.IntrinsicElements</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PolymorphicProps</span>&lt;T <span class="hljs-keyword">extends</span> keyof JSX.<span class="hljs-title class_">IntrinsicElements</span>&gt; {
  <span class="hljs-attr">as</span>?: T;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PolymorphicComponentProps</span>&lt;T <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>&gt; =
  <span class="hljs-title class_">PolymorphicProps</span>&lt;T&gt; &amp; <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[T];

<span class="hljs-keyword">function</span> <span class="hljs-title class_">Polymorphic</span>&lt;T <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span> = <span class="hljs-string">&#x27;div&#x27;</span>&gt;({
  <span class="hljs-keyword">as</span>,
  children,
  ...props
}: <span class="hljs-title class_">PolymorphicComponentProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = <span class="hljs-keyword">as</span> || <span class="hljs-string">&#x27;div&#x27;</span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>}&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Component</span>&gt;</span></span>;
}

<span class="hljs-comment">// Type-safe usage - props are validated based on &#x27;as&#x27; prop</span>
&lt;<span class="hljs-title class_">Polymorphic</span> <span class="hljs-keyword">as</span>=<span class="hljs-string">&quot;button&quot;</span> onClick={<span class="hljs-function">() =&gt;</span> {}} disabled&gt;
  <span class="hljs-title class_">Button</span>
&lt;/<span class="hljs-title class_">Polymorphic</span>&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Polymorphic</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/home&quot;</span> <span class="hljs-attr">target</span>=<span class="hljs-string">&quot;_blank&quot;</span>&gt;</span>
  Link
<span class="hljs-tag">&lt;/<span class="hljs-name">Polymorphic</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Polymorphic</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;input&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;test&quot;</span> /&gt;</span></span>
</code></pre>
<h3 id="اختيار-النوع-الصحيح-مصفوفة-قرار">اختيار النوع الصحيح: مصفوفة قرار</h3>
<p>إليك متى تستخدم كل نوع من أنواع DOM المساعدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Use ComponentPropsWithoutRef for most wrapper components</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonWrapperProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt; {
  <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Use HTMLAttributes when you DON&#x27;T need element-specific props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PanelProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt; {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Use HTMLProps when you need EVERYTHING (rare)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SuperInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; {
  <span class="hljs-attr">validate</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Use AllHTMLAttributes for highly generic components (use sparingly)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GenericProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">AllHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLElement</span>&gt; {
  <span class="hljs-attr">component</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Use JSX.IntrinsicElements for type-safe polymorphism</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonOrLinkProps</span> =
  ({ <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;button&#x27;</span> } &amp; <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;button&#x27;</span>]) | ({ <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;a&#x27;</span> } &amp; <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;a&#x27;</span>]);
</code></pre>
<h3 id="مثال-من-العالم-الحقيقي-بناء-نظام-حقول-للنماذج">مثال من العالم الحقيقي: بناء نظام حقول للنماذج</h3>
<p>لنرَ كيف تعمل هذه الأنواع معًا في نظام نماذج حقيقي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Base field wrapper using HTMLAttributes (no input-specific props needed)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FieldWrapperProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FieldWrapper</span>(<span class="hljs-params">{ label, error, required, children, ...props }: <span class="hljs-title class_">FieldWrapperProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">field</span> \${<span class="hljs-attr">error</span> ? &#x27;<span class="hljs-attr">field--error</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        {label}
        {required &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;required&quot;</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      {children}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Input field using JSX.IntrinsicElements for precise typing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TextFieldProps</span> <span class="hljs-keyword">extends</span> JSX.<span class="hljs-title class_">IntrinsicElements</span>[&#x27;input&#x27;] {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TextField</span>(<span class="hljs-params">{ label, error, required, ...inputProps }: <span class="hljs-title class_">TextFieldProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldWrapper</span> <span class="hljs-attr">label</span>=<span class="hljs-string">{label}</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> <span class="hljs-attr">required</span>=<span class="hljs-string">{required}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> {<span class="hljs-attr">...inputProps</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field-input&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldWrapper</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Select field with proper option typing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SelectFieldProps</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;JSX.<span class="hljs-title class_">IntrinsicElements</span>[&#x27;select&#x27;], &#x27;value&#x27; | &#x27;onChange&#x27;&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">value</span>: T; <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span> }&gt;;
  <span class="hljs-attr">value</span>?: T;
  <span class="hljs-attr">onChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">SelectField</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;({
  label,
  options,
  value,
  onChange,
  error,
  required,
  ...selectProps
}: <span class="hljs-title class_">SelectFieldProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldWrapper</span> <span class="hljs-attr">label</span>=<span class="hljs-string">{label}</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> <span class="hljs-attr">required</span>=<span class="hljs-string">{required}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
        {<span class="hljs-attr">...selectProps</span>}
        <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange?.(e.target.value as T)}
        className=&quot;field-select&quot;
      &gt;
        {options.map(opt =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{opt.value}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{opt.value}</span>&gt;</span>
            {opt.label}
          <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldWrapper</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="اعتبارات-الأداء-وحجم-الحزمة">اعتبارات الأداء وحجم الحزمة</h3>
<p>هذه الأنواع المساعدة مجرّدات وقت التصريف (compile-time) بلا أي حمل على وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// All of these compile to the same JavaScript</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">props1</span>: <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt; = { <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {} };
<span class="hljs-keyword">const</span> <span class="hljs-attr">props2</span>: <span class="hljs-title class_">HTMLProps</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt; = { <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {} };
<span class="hljs-keyword">const</span> <span class="hljs-attr">props3</span>: <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;button&#x27;</span>] = { <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {} };

<span class="hljs-comment">// In JavaScript, they&#x27;re all just: { onClick: () =&gt; {} }</span>
</code></pre>
<p>الاختيار بينها يتعلق تجربة المطوّر وأمان الأنواع، لا الأداء.</p>
<h2 id="استراتيجية-الترحيل">استراتيجية الترحيل</h2>
<p>هل تنتقل من الخصائص اليدوية إلى <code>ComponentPropsWithoutRef</code>؟ إليك منهجًا آمنًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Step 1: Keep existing interface, extend ComponentPropsWithoutRef</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;&#x27;button&#x27;&gt; {
  <span class="hljs-comment">// Keep your existing custom props</span>
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-comment">// Remove native props you were manually defining</span>
  <span class="hljs-comment">// onClick?: () =&gt; void;  // ← Remove this, comes from ComponentPropsWithoutRef</span>
  <span class="hljs-comment">// disabled?: boolean;    // ← Remove this too</span>
}

<span class="hljs-comment">// Step 2: Update implementation to use rest props</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, className, ...props }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn--</span>\${<span class="hljs-attr">variant</span>} \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`}
      {<span class="hljs-attr">...props</span>} // ← <span class="hljs-attr">Now</span> <span class="hljs-attr">forwards</span> <span class="hljs-attr">all</span> <span class="hljs-attr">native</span> <span class="hljs-attr">props</span>
    /&gt;</span></span>
  );
}
</code></pre>
<p>هذا النهج متوافق مع الإصدارات السابقة ويمنحك فورًا الوصول إلى جميع الخصائص الأصلية.</p>
<h2 id="إلى-الأمام">إلى الأمام</h2>
<p><code>ComponentPropsWithoutRef</code> هو الأساس لبناء مكوّنات متينة وقابلة لإعادة الاستخدام تبدو طبيعية الاستخدام. فهو يزيل الاحتكاك بين مكوّناتك المخصّصة وDOM الأصلي، ويمنح المطوّرين كامل قوة خصائص HTML مع فوائد منطقك المخصّص.</p>
<p>والأنماط التي غطّيناها — من الأغلفة البسيطة إلى المكوّنات متعددة الأشكال — تتوسّع من مكتبات مكوّنات من مكوّن واحد إلى أنظمة تصميم شاملة. تصبح مكوّناتك أكثر قوة ويصبح مطوّروك أكثر إنتاجية، ويبقى TypeScript في الوقت نفسه يراقب الجميع بصرامة بشأن الخصائص المتاحة فعلًا.</p>
<p>وتذكّر: الهدف ليس مجرّد إرضاء TypeScript، بل إنشاء مكوّنات تبدو امتدادات طبيعية لـ HTML. وحين تضبط هذا التوازن، يصبح بناء واجهات المستخدم متعةً لا عبئًا.</p>
<p><strong>التالي</strong>: سنستكشف أنماط خصائص متقدّمة، بما في ذلك render props والمكوّنات المركّبة وتركيب معالِج الأحداث (event handlers) التي تعمل بسلاسة مع أساس خصائص DOM الذي أسّسناه هنا.</p>
<h2 id="زر-منمط-بـ-as-ومراجع-آمنة">زر مُنمَّط بـ <code>as</code> ومراجع آمنة</h2>
<p>ابنِ زرًّا واحدًا <code>Button</code> يحاكي الخصائص الأصلية، ويدعم <code>as=&quot;a&quot; | &quot;button&quot;</code>، ويمرّر المراجع بأنواع صحيحة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonAs</span> = <span class="hljs-string">&#x27;button&#x27;</span> | <span class="hljs-string">&#x27;a&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonCommonProps</span> = {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonAsButton</span> = {
  <span class="hljs-attr">as</span>?: <span class="hljs-string">&#x27;button&#x27;</span>;
} &amp; <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;button&#x27;</span>];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonAsLink</span> = {
  <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;a&#x27;</span>;
} &amp; <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;a&#x27;</span>];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ButtonCommonProps</span> &amp; (<span class="hljs-title class_">ButtonAsButton</span> | <span class="hljs-title class_">ButtonAsLink</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span> = forwardRef&lt;<span class="hljs-title class_">HTMLElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">props, ref</span>) {
  <span class="hljs-keyword">const</span> {
    variant = <span class="hljs-string">&#x27;primary&#x27;</span>,
    children,
    <span class="hljs-keyword">as</span> = <span class="hljs-string">&#x27;button&#x27;</span>,
    ...rest
  } = props <span class="hljs-keyword">as</span> <span class="hljs-title class_">ButtonProps</span> &amp; {
    <span class="hljs-attr">as</span>: <span class="hljs-title class_">ButtonAs</span>;
  };

  <span class="hljs-keyword">const</span> className = <span class="hljs-string">\`btn btn-<span class="hljs-subst">\${variant}</span> <span class="hljs-subst">\${(rest <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).className ?? <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>.<span class="hljs-title function_">trim</span>();

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">as</span> === <span class="hljs-string">&#x27;a&#x27;</span>) {
    <span class="hljs-keyword">const</span> linkProps = rest <span class="hljs-keyword">as</span> <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[<span class="hljs-string">&#x27;a&#x27;</span>];
    <span class="hljs-keyword">return</span> (
      &lt;a ref={ref as React.ForwardedRef&lt;HTMLAnchorElement&gt;} {...linkProps} className={className}&gt;
        {children}
      &lt;/a&gt;
    );
  }

  const buttonProps = rest as JSX.IntrinsicElements[&#x27;button&#x27;];
  return (
    &lt;button
      ref={ref as React.ForwardedRef&lt;HTMLButtonElement&gt;}
      {...buttonProps}
      className={className}
    &gt;
      {children}
    &lt;/button&gt;
  );
});
</code></pre>
<ul>
<li>يحاكي الخصائص الأصلية عبر <code>JSX.IntrinsicElements</code> فتتحصل على خصائص وأحداث دقيقة.</li>
<li>يقيّد <code>as</code> بالقيمة <code>'a' | 'button'</code> لتجنّب التركيبات المفاجئة.</li>
<li>يمرّر المراجع بنوع العنصر الأساسي الصحيح.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
