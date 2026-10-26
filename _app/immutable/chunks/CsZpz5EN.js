const s="kinney",a="react-typescript",n="React مع TypeScript",l="prop-combinations-and-unions",p="تركيبات الخصائص والأنواع الاتحادية",t=[{depth:2,id:"المشكلة-مع-الخصائص-المتساهلة",text:"المشكلة مع الخصائص المتساهلة"},{depth:2,id:"النمط-1-السماح-بتركيبات-محددة",text:"النمط 1: السماح بتركيبات محدّدة"},{depth:2,id:"النمط-2-التقييد-بحسب-الشروط",text:"النمط 2: التقييد بحسب الشروط"},{depth:2,id:"النمط-3-اشتراط-الخصائص-المترابطة",text:"النمط 3: اشتراط الخصائص المترابطة"},{depth:2,id:"مثال-من-العالم-الحقيقي-تركيبات-حقول-النماذج",text:"مثال من العالم الحقيقي: تركيبات حقول النماذج"},{depth:2,id:"النمط-المتقدم-التحميلات-الزائدة-للدوال",text:"النمط المتقدم: التحميلات الزائدة للدوال"},{depth:2,id:"التحقق-وقت-التشغيل-باستخدام-zod",text:"التحقق وقت التشغيل باستخدام Zod"},{depth:2,id:"متى-تستخدم-كل-نمط",text:"متى تستخدم كل نمط"},{depth:2,id:"الأداء-وقابلية-الصيانة",text:"الأداء وقابلية الصيانة"},{depth:2,id:"الأخطاء-الشائعة",text:"الأخطاء الشائعة"},{depth:3,id:"تقييد-الحالات-البسيطة-أكثر-من-اللازم",text:"تقييد الحالات البسيطة أكثر من اللازم"},{depth:3,id:"نسيان-التطبيق-الجزئي",text:"نسيان التطبيق الجزئي"},{depth:3,id:"جعل-الصيانة-أصعب",text:"جعل الصيانة أصعب"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>واجهات مكوّنات React عقود — فهي تحدّد أي تركيبات من الخصائص منطقية وأيها غير منطقي. لكننا كثيرًا ما نصمّم واجهات تسمح بمرور تركيبات بلا معنى، فتخلّق ارتباكًا وقت التشغيل وصعوبات في الصيانة. ويمنحنا TypeScript الأدوات لتشفير هذه القواعد مباشرةً في أنواعنا، بحيث تصبح الحالات غير الصالحة مستحيلةَ التمثيل حرفيًا.</p>
<p>وفي نهاية هذا الدليل ستصبح تعرف كيف تصمّم واجهات مكوّنات تسمح بالتركيبات الصالحة، وتقيّد المشكلة منها، وتشترط المجموعات الضرورية — كل ذلك مع توفير تجربة مطوّرين ممتازة عبر IntelliSense وأمان وقت الترجمة (compile-time).</p>
<h2 id="المشكلة-مع-الخصائص-المتساهلة">المشكلة مع الخصائص المتساهلة</h2>
<p>تأمّل سيناريو شائعًا: مكوّن <code>Dialog</code> يمكن التحكم به أو يمكن أن يكون غير محكوم، بسلوكات مختلفة حسب طريقة استخدامه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This allows confusing combinations</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DialogProps</span> {
  <span class="hljs-attr">open</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onOpenChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">open</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dialog</span>(<span class="hljs-params">{ open, defaultOpen, onOpenChange, children }: <span class="hljs-title class_">DialogProps</span></span>) {
  <span class="hljs-comment">// What happens when both open AND defaultOpen are provided?</span>
  <span class="hljs-comment">// What if open is provided without onOpenChange?</span>
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(defaultOpen ?? <span class="hljs-literal">false</span>);

  <span class="hljs-comment">// Confusing logic to handle all the edge cases...</span>
  <span class="hljs-keyword">const</span> actualOpen = open !== <span class="hljs-literal">undefined</span> ? open : isOpen;

  <span class="hljs-keyword">return</span> actualOpen ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="hljs-literal">null</span>;
}
</code></pre>
<p>هذه الواجهة مرنة من الناحية التقنية، لكنها مربكة أيضًا. فليس هناك ما يمنع هذه التركيبات المشكِلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// All of these compile but create unclear behavior</span>
&lt;<span class="hljs-title class_">Dialog</span> open={<span class="hljs-literal">true</span>} defaultOpen={<span class="hljs-literal">false</span>} /&gt; {<span class="hljs-comment">/* Which wins? */</span>}
&lt;<span class="hljs-title class_">Dialog</span> open={isOpen} /&gt; {<span class="hljs-comment">/* Missing onOpenChange handler */</span>}
&lt;<span class="hljs-title class_">Dialog</span> onOpenChange={setOpen} /&gt; {<span class="hljs-comment">/* Handler but no way to control */</span>}
</code></pre>
<h2 id="النمط-1-السماح-بتركيبات-محددة">النمط 1: السماح بتركيبات محدّدة</h2>
<p>يتعلق النمط الأول بإنشاء صيغ واضحة ومتبادلة الحصرية. إليك كيف تصمّم مكوّنًا يسمح بأنماط التحكم وعدم التحكم الصالحة فقط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ControlledDialogProps</span> = {
  <span class="hljs-attr">open</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onOpenChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">open</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// Explicitly forbidden</span>
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UncontrolledDialogProps</span> = {
  <span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">open</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// Explicitly forbidden</span>
  <span class="hljs-attr">onOpenChange</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// Explicitly forbidden</span>
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DialogProps</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
} &amp; (<span class="hljs-title class_">ControlledDialogProps</span> | <span class="hljs-title class_">UncontrolledDialogProps</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dialog</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">DialogProps</span></span>) {
  <span class="hljs-keyword">const</span> { children, title } = props;

  <span class="hljs-comment">// TypeScript narrows the type based on the presence of &#x27;open&#x27;</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;open&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-comment">// Controlled variant - TypeScript knows onOpenChange exists</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">open</span>=<span class="hljs-string">{props.open}</span>&gt;</span>
        {title &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>}
        {children}
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> props.onOpenChange(false)}&gt;
          Close
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></span>
    );
  }

  <span class="hljs-comment">// Uncontrolled variant - manage state internally</span>
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(props.<span class="hljs-property">defaultOpen</span> ?? <span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">open</span>=<span class="hljs-string">{isOpen}</span>&gt;</span>
      {title &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>}
      {children}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsOpen(false)}&gt;
        Close
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></span>
  );
}
</code></pre>
<p>يصبح الاستخدام واضحًا تمامًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Controlled - all required props present</span>
&lt;<span class="hljs-title class_">Dialog</span>
  open={isOpen}
  onOpenChange={setIsOpen}
&gt;
  <span class="hljs-title class_">Content</span> here
&lt;/<span class="hljs-title class_">Dialog</span>&gt;

<span class="hljs-comment">// ✅ Uncontrolled - simple and self-contained</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span> <span class="hljs-attr">defaultOpen</span>=<span class="hljs-string">{true}</span>&gt;</span>
  Content here
<span class="hljs-tag">&lt;/<span class="hljs-name">Dialog</span>&gt;</span></span>

<span class="hljs-comment">// ❌ These combinations are impossible</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span> <span class="hljs-attr">open</span>=<span class="hljs-string">{true}</span> <span class="hljs-attr">defaultOpen</span>=<span class="hljs-string">{false}</span> /&gt;</span></span> {<span class="hljs-comment">/* TypeScript error */</span>}
&lt;<span class="hljs-title class_">Dialog</span> open={isOpen} /&gt; {<span class="hljs-comment">/* Missing onOpenChange */</span>}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم النوع <code>never</code> لمنع خصائص معيّنة صراحةً في صيغ بعينها. هذا يجعل التنافر المتبادل واضحًا لكل من TypeScript والمطوّرين القارئين للشيفرة.</p>
</blockquote>
<h2 id="النمط-2-التقييد-بحسب-الشروط">النمط 2: التقييد بحسب الشروط</h2>
<p>أحيانًا تريد تقييد بعض تركيبات الخصائص بحسب السياق. إليك مكوّن <code>Button</code> يتكيّف خصائصه المتاحة بحسب صيغته:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">BaseButtonProps</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PrimaryButtonProps</span> = <span class="hljs-title class_">BaseButtonProps</span> &amp; {
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-comment">// Primary buttons must have click handlers</span>
  <span class="hljs-attr">href</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">target</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SecondaryButtonProps</span> = <span class="hljs-title class_">BaseButtonProps</span> &amp; {
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>; <span class="hljs-comment">// Optional for secondary</span>
  <span class="hljs-attr">href</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">target</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LinkButtonProps</span> = <span class="hljs-title class_">BaseButtonProps</span> &amp; {
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;link&#x27;</span>;
  <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">target</span>?: <span class="hljs-string">&#x27;_blank&#x27;</span> | <span class="hljs-string">&#x27;_self&#x27;</span> | <span class="hljs-string">&#x27;_parent&#x27;</span> | <span class="hljs-string">&#x27;_top&#x27;</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// Links don&#x27;t need onClick</span>
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">PrimaryButtonProps</span> | <span class="hljs-title class_">SecondaryButtonProps</span> | <span class="hljs-title class_">LinkButtonProps</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> { children, disabled, className, variant } = props;

  <span class="hljs-keyword">const</span> baseClasses = <span class="hljs-string">\`btn btn-<span class="hljs-subst">\${variant}</span> <span class="hljs-subst">\${className || <span class="hljs-string">&#x27;&#x27;</span>}</span>\`</span>;

  <span class="hljs-keyword">if</span> (variant === <span class="hljs-string">&#x27;link&#x27;</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">{props.href}</span>
        <span class="hljs-attr">target</span>=<span class="hljs-string">{props.target}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{baseClasses}</span>
      &gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{baseClasses}</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>يقيّد هذا التصميم تركيبات الخصائص بحسب السلوك المقصود للزر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Primary buttons require onClick</span>
&lt;<span class="hljs-title class_">Button</span> variant=<span class="hljs-string">&quot;primary&quot;</span> onClick={handleSubmit}&gt;
  <span class="hljs-title class_">Submit</span> <span class="hljs-title class_">Form</span>
&lt;/<span class="hljs-title class_">Button</span>&gt;

<span class="hljs-comment">// ✅ Link buttons require href</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;link&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/dashboard&quot;</span> <span class="hljs-attr">target</span>=<span class="hljs-string">&quot;_blank&quot;</span>&gt;</span>
  Go to Dashboard
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>

<span class="hljs-comment">// ✅ Secondary buttons work with or without onClick</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;secondary&quot;</span>&gt;</span>
  Cancel
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>

<span class="hljs-comment">// ❌ Invalid combinations caught at compile time</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/somewhere&quot;</span> /&gt;</span></span> {<span class="hljs-comment">/* href not allowed */</span>}
&lt;<span class="hljs-title class_">Button</span> variant=<span class="hljs-string">&quot;link&quot;</span> onClick={handleClick} /&gt; {<span class="hljs-comment">/* onClick not allowed */</span>}
</code></pre>
<h2 id="النمط-3-اشتراط-الخصائص-المترابطة">النمط 3: اشتراط الخصائص المترابطة</h2>
<p>بعض الخصائص لا معنى لها إلا إذا استُعملت مع بعضها. إليك نمطًا لاشتراط التركيبات المترابطة باستخدام الأنواع الشرطية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">HasIcon</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">icon</span>: <span class="hljs-built_in">string</span> }
  ? T &amp; { <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-built_in">string</span> } <span class="hljs-comment">// Icon requires aria-label</span>
  : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">HasTooltip</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">tooltip</span>: <span class="hljs-built_in">string</span> }
  ? T &amp; { <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span> } <span class="hljs-comment">// Tooltip can have describedby</span>
  : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">IconButtonProps</span> = <span class="hljs-title class_">HasTooltip</span>&lt;<span class="hljs-title class_">HasIcon</span>&lt;{
  <span class="hljs-attr">icon</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">tooltip</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// Icon buttons don&#x27;t show text</span>
}&gt;&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">IconButton</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">IconButtonProps</span></span>) {
  <span class="hljs-keyword">if</span> (!props.<span class="hljs-property">icon</span>) {
    <span class="hljs-comment">// Without icon, this becomes a regular button</span>
    <span class="hljs-comment">// But TypeScript still enforces the constraints above</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>
      <span class="hljs-attr">aria-label</span>=<span class="hljs-string">{props[</span>&#x27;<span class="hljs-attr">aria-label</span>&#x27;]} // <span class="hljs-attr">Required</span> <span class="hljs-attr">when</span> <span class="hljs-attr">icon</span> <span class="hljs-attr">exists</span>
      <span class="hljs-attr">aria-describedby</span>=<span class="hljs-string">{props[</span>&#x27;<span class="hljs-attr">aria-describedby</span>&#x27;]}
      <span class="hljs-attr">title</span>=<span class="hljs-string">{props.tooltip}</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{props.icon}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>يوفّر الاستخدام متطلبات إمكانية الوصول:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Icon with required aria-label</span>
&lt;<span class="hljs-title class_">IconButton</span>
  icon=<span class="hljs-string">&quot;search&quot;</span>
  aria-label=<span class="hljs-string">&quot;Search products&quot;</span>
  onClick={handleSearch}
/&gt;

<span class="hljs-comment">// ✅ Icon with tooltip and aria-label</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span>
  <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;help&quot;</span>
  <span class="hljs-attr">tooltip</span>=<span class="hljs-string">&quot;Get help with this feature&quot;</span>
  <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Help&quot;</span>
  <span class="hljs-attr">aria-describedby</span>=<span class="hljs-string">&quot;help-tooltip&quot;</span>
  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{showHelp}</span>
/&gt;</span></span>

<span class="hljs-comment">// ❌ Icon without aria-label is caught</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;search&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSearch}</span> /&gt;</span></span> {<span class="hljs-comment">/* Missing aria-label */</span>}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-تركيبات-حقول-النماذج">مثال من العالم الحقيقي: تركيبات حقول النماذج</h2>
<p>لنبنِ مكوّن حقول نموذج شاملًا يوضّح الأنماط الثلاثة جميعها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">BaseFieldProps</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// Pattern 1: Permit specific input types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TextFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;password&#x27;</span> | <span class="hljs-string">&#x27;tel&#x27;</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-comment">// These don&#x27;t make sense for text inputs</span>
  <span class="hljs-attr">multiple</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">options</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SelectFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;select&#x27;</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span> }&gt;;
  <span class="hljs-comment">// Pattern 2: Limit multiple based on value type</span>
  <span class="hljs-attr">multiple</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// These don&#x27;t make sense for selects</span>
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FileFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;file&#x27;</span>;
  <span class="hljs-attr">value</span>?: <span class="hljs-built_in">never</span>; <span class="hljs-comment">// File inputs handle their own state</span>
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">files</span>: <span class="hljs-title class_">FileList</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">accept</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">multiple</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// These don&#x27;t make sense for file inputs</span>
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">options</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-comment">// Pattern 3: Require validation when needed</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithValidation</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span> }
  ? T &amp; { <span class="hljs-attr">validationMessage</span>?: <span class="hljs-built_in">string</span> }
  : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldProps</span> = <span class="hljs-title class_">WithValidation</span>&lt;<span class="hljs-title class_">TextFieldProps</span> | <span class="hljs-title class_">SelectFieldProps</span> | <span class="hljs-title class_">FileFieldProps</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Field</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">FieldProps</span></span>) {
  <span class="hljs-keyword">const</span> { label, name, error, disabled, required } = props;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">renderInput</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">switch</span> (props.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;text&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;email&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;password&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;tel&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">{props.type}</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{props.value}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> props.onChange(e.target.value)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            disabled={disabled}
            required={required}
          /&gt;</span>
        );

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;select&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{props.value}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
              if (props.multiple) {
                const values = Array.from(e.target.selectedOptions).map(o =&gt; o.value);
                props.onChange(values);
              } else {
                props.onChange(e.target.value);
              }
            }}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          &gt;
            {props.options.map((option) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">option</span>
                <span class="hljs-attr">key</span>=<span class="hljs-string">{option.value}</span>
                <span class="hljs-attr">value</span>=<span class="hljs-string">{option.value}</span>
                <span class="hljs-attr">disabled</span>=<span class="hljs-string">{option.disabled}</span>
              &gt;</span>
                {option.label}
              <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
        );

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;file&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> props.onChange(e.target.files)}
            accept={props.accept}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          /&gt;</span>
        );
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">{name}</span>&gt;</span>
        {label}
        {required &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;required&quot;</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      {renderInput()}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يخلق هذا التصميم مكوّن حقول متينًا وآمنًا من ناحية الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Text field with proper props</span>
&lt;<span class="hljs-title class_">Field</span>
  <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;email&quot;</span>
  name=<span class="hljs-string">&quot;email&quot;</span>
  label=<span class="hljs-string">&quot;Email Address&quot;</span>
  value={email}
  onChange={setEmail}
  placeholder=<span class="hljs-string">&quot;you@example.com&quot;</span>
  required
/&gt;

<span class="hljs-comment">// ✅ Multi-select with array value</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Field</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;select&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;skills&quot;</span>
  <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Skills&quot;</span>
  <span class="hljs-attr">value</span>=<span class="hljs-string">{selectedSkills}</span>
  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSelectedSkills}</span>
  <span class="hljs-attr">options</span>=<span class="hljs-string">{skillOptions}</span>
  <span class="hljs-attr">multiple</span>
/&gt;</span></span>

<span class="hljs-comment">// ✅ File upload with proper handlers</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Field</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;resume&quot;</span>
  <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Upload Resume&quot;</span>
  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleFileChange}</span>
  <span class="hljs-attr">accept</span>=<span class="hljs-string">&quot;.pdf,.doc,.docx&quot;</span>
/&gt;</span></span>

<span class="hljs-comment">// ❌ Invalid combinations prevented</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Field</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">options</span>=<span class="hljs-string">{[]}</span> /&gt;</span></span> {<span class="hljs-comment">/* options not allowed on text */</span>}
&lt;<span class="hljs-title class_">Field</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;select&quot;</span> placeholder=<span class="hljs-string">&quot;Choose&quot;</span> /&gt; {<span class="hljs-comment">/* placeholder not allowed on select */</span>}
</code></pre>
<h2 id="النمط-المتقدم-التحميلات-الزائدة-للدوال">النمط المتقدم: التحميلات الزائدة للدوال</h2>
<p>للتحكم الأدقّ من ذلك، يمكنك استخدام التحميلات الزائدة للدوال (overloads) لتعريف تركيبات الخصائص بدقّة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define overloads for different use cases</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Toast</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;success&#x27;</span>;
  message: <span class="hljs-built_in">string</span>;
  duration?: <span class="hljs-built_in">number</span>;
}</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Toast</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;error&#x27;</span>;
  message: <span class="hljs-built_in">string</span>;
  action?: { label: <span class="hljs-built_in">string</span>; onClick: () =&gt; <span class="hljs-built_in">void</span> };
  persistent?: <span class="hljs-literal">true</span>; // <span class="hljs-built_in">Error</span> toasts can be persistent
}</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Toast</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&#x27;loading&#x27;</span>;
  message: <span class="hljs-built_in">string</span>;
  duration?: <span class="hljs-built_in">never</span>; // Loading toasts don<span class="hljs-string">&#x27;t auto-dismiss
  persistent?: true;
}): JSX.Element;

// Implementation handles all cases
function Toast(props: {
  type: &#x27;</span>success<span class="hljs-string">&#x27; | &#x27;</span>error<span class="hljs-string">&#x27; | &#x27;</span>loading<span class="hljs-string">&#x27;;
  message: string;
  duration?: number;
  action?: { label: string; onClick: () =&gt; void };
  persistent?: boolean;
}) {
  const { type, message, duration, action, persistent } = props;

  useEffect(() =&gt; {
    if (type === &#x27;</span>success<span class="hljs-string">&#x27; &amp;&amp; !persistent &amp;&amp; duration !== undefined) {
      const timer = setTimeout(() =&gt; dismiss(), duration);
      return () =&gt; clearTimeout(timer);
    }
  }, [type, persistent, duration]);

  return (
    &lt;div className={\`toast toast-\${type}\`}&gt;
      &lt;span&gt;{message}&lt;/span&gt;
      {action &amp;&amp; (
        &lt;button onClick={action.onClick}&gt;
          {action.label}
        &lt;/button&gt;
      )}
    &lt;/div&gt;
  );
}
</span></span></code></pre>
<h2 id="التحقق-وقت-التشغيل-باستخدام-zod">التحقق وقت التشغيل باستخدام Zod</h2>
<p>للمكوّنات التي تستقبل خصائصها من مصادر خارجية، اجمع أنماط TypeScript مع التحقق وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ControlledDialogSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">open</span>: z.<span class="hljs-title function_">boolean</span>(),
  <span class="hljs-attr">onOpenChange</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>).<span class="hljs-title function_">args</span>(z.<span class="hljs-title function_">boolean</span>()).<span class="hljs-title function_">returns</span>(z.<span class="hljs-title function_">void</span>()),
  <span class="hljs-attr">defaultOpen</span>: z.<span class="hljs-title function_">undefined</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UncontrolledDialogSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">defaultOpen</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">open</span>: z.<span class="hljs-title function_">undefined</span>(),
  <span class="hljs-attr">onOpenChange</span>: z.<span class="hljs-title function_">undefined</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DialogPropsSchema</span> = z
  .<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">children</span>: z.<span class="hljs-title function_">any</span>(),
    <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  })
  .<span class="hljs-title function_">and</span>(z.<span class="hljs-title function_">union</span>([<span class="hljs-title class_">ControlledDialogSchema</span>, <span class="hljs-title class_">UncontrolledDialogSchema</span>]));

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DialogProps</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">DialogPropsSchema</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dialog</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">DialogProps</span></span>) {
  <span class="hljs-comment">// Runtime validation for props from external sources</span>
  <span class="hljs-keyword">const</span> validatedProps = <span class="hljs-title class_">DialogPropsSchema</span>.<span class="hljs-title function_">safeParse</span>(props);

  <span class="hljs-keyword">if</span> (!validatedProps.<span class="hljs-property">success</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid props: <span class="hljs-subst">\${validatedProps.error.message}</span>\`</span>);
  }

  <span class="hljs-comment">// Your component logic here...</span>
}
</code></pre>
<h2 id="متى-تستخدم-كل-نمط">متى تستخدم كل نمط</h2>
<p><strong>أنماط السماح</strong> تعمل بشكل أفضل حين:</p>
<ul>
<li>لديك أوضاع تشغيل متمايزة (محكوم مقابل غير محكوم)</li>
<li>لدى الخصائص معانٍ مختلفة جوهريًا في سياقات مختلفة</li>
<li>تريد منع الالتباس المفاهيمي</li>
</ul>
<p><strong>أنماط التقييد</strong> مثالية لـ:</p>
<ul>
<li>المكوّنات ذات الصيغ المتعدّدة التي تحتاج خصائص مختلفة</li>
<li>منع الخصائص التي لا منطق في جمعها معًا</li>
<li>إنشاء واجهات مركّزة ذات غرض واحد</li>
</ul>
<p><strong>أنماط الاشتراط</strong> تتألّق حين:</p>
<ul>
<li>يجب فرض متطلبات إمكانية الوصول</li>
<li>للخصائص اعتماديات قويّة (مثل قواعد التحقق)</li>
<li>تريد توجيه المطوّرين نحو أفضل الممارسات</li>
</ul>
<h2 id="الأداء-وقابلية-الصيانة">الأداء وقابلية الصيانة</h2>
<p>هذه الأنماط بنى وقت ترجمة (compile-time) — فهي تضيف عبئًا صفريًا وقت التشغيل. لكن راعِ هذه المفاضلات:</p>
<ul>
<li><strong>الأنواع الاتحادية المعقّدة</strong> قد تُبطئ ترجمة TypeScript في قواعد الشيفرة الكبيرة</li>
<li><strong>الشروط المتداخلة بعمق</strong> قد تنتج رسائل خطأ مربكة</li>
<li><strong>الإفراط في هندسة</strong> المكوّنات البسيطة يقلّل قابلية القراءة</li>
</ul>
<p>الهدف هو استخدام هذه الأنماط بحكمة — حين تمنع أخطاءً حقيقية وتحسّن تجربة المطوّر، لا لمجرد أنك تستطيع.</p>
<h2 id="الأخطاء-الشائعة">الأخطاء الشائعة</h2>
<h3 id="تقييد-الحالات-البسيطة-أكثر-من-اللازم">تقييد الحالات البسيطة أكثر من اللازم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Overkill for a simple optional prop</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OverEngineered</span> = { <span class="hljs-attr">showIcon</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">iconName</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">showIcon</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">iconName</span>?: <span class="hljs-built_in">never</span> };

<span class="hljs-comment">// ✅ Sometimes simple is better</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Simple</span> = { <span class="hljs-attr">showIcon</span>?: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">iconName</span>?: <span class="hljs-built_in">string</span> };
</code></pre>
<h3 id="نسيان-التطبيق-الجزئي">نسيان التطبيق الجزئي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This breaks when props are spread or partially applied</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StrictProps</span> = { <span class="hljs-attr">a</span>: <span class="hljs-built_in">string</span> } &amp; { <span class="hljs-attr">b</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// ✅ More resilient to partial application</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FlexibleProps</span> = { <span class="hljs-attr">a</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">b</span>?: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">a</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-attr">b</span>: <span class="hljs-built_in">string</span> };
</code></pre>
<h3 id="جعل-الصيانة-أصعب">جعل الصيانة أصعب</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Brittle - adding new variants requires touching everything</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Variant</span> = <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">Variant</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;primary&#x27;</span>
  ? <span class="hljs-title class_">PrimaryProps</span>
  : <span class="hljs-title class_">Variant</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;secondary&#x27;</span>
    ? <span class="hljs-title class_">SecondaryProps</span>
    : <span class="hljs-title class_">DangerProps</span>;

<span class="hljs-comment">// ✅ More maintainable union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">PrimaryProps</span> | <span class="hljs-title class_">SecondaryProps</span> | <span class="hljs-title class_">DangerProps</span>;
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>الآن وقد أصبحت قادرًا على تصميم واجهات مكوّنات دقيقة، فكّر في استكشاف:</p>
<ul>
<li><strong>أنماط القيود العامة</strong> لتركيبات الخصائص القابلة لإعادة الاستخدام</li>
<li><strong>أنواع النصوص الحرفية (template literal types)</strong> للتحقق الديناميكي من الخصائص</li>
<li><strong>الأنواع المُحوَّلة (mapped types)</strong> لتحويل الواجهات القائمة</li>
<li><strong>الأنواع المُعلَّمة (branded types)</strong> لضمانات أقوى</li>
</ul>
<p>تذكّر: أفضل واجهة برمجية لمكوّن هي التي تجعل الاستخدام الصحيح سهلًا والاستخدام الخاطئ مستحيلًا. تساعدك هذه الأنماط على بناء واجهة من هذا النوع مصفولة — استخدمها حين تضيف قيمة، لا حين تضيف تعقيدًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
