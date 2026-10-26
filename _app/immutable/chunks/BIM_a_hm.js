const s="kinney",a="react-typescript",n="React مع TypeScript",l="accessibility-and-aria-typing",p="الوصولية وتحديد أنواع ARIA",t=[{depth:2,id:"لماذا-نرمز-قيود-الوصولية-في-الأنواع",text:"لماذا نُرمِّز قيود الوصولية في الأنواع؟"},{depth:2,id:"فهم-aria-في-react",text:"فهم ARIA في React"},{depth:2,id:"أنواع-قيود-aria-الأساسية",text:"أنواع قيود ARIA الأساسية"},{depth:2,id:"قيود-حالة-أزرار-التبديل",text:"قيود حالة أزرار التبديل"},{depth:2,id:"ترابط-عناصر-النماذج",text:"ترابط عناصر النماذج"},{depth:2,id:"قيود-أدوار-aria-المتقدمة",text:"قيود أدوار ARIA المتقدّمة"},{depth:2,id:"إنشاء-مكتبات-مكونات-قابلة-للوصول",text:"إنشاء مكتبات مكوّنات قابلة للوصول"},{depth:2,id:"التحقق-وقت-التشغيل-باستخدام-zod",text:"التحقّق وقت التشغيل باستخدام Zod"},{depth:2,id:"أنماط-شائعة-ومزالق",text:"أنماط شائعة ومزالق"},{depth:3,id:"خصائص-aria-الشرطية",text:"خصائص ARIA الشرطية"},{depth:3,id:"التركيبات-غير-الصالحة",text:"التركيبات غير الصالحة"},{depth:3,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"اختبار-أنواع-الوصولية",text:"اختبار أنواع الوصولية"},{depth:2,id:"التكامل-مع-أنظمة-التصميم",text:"التكامل مع أنظمة التصميم"},{depth:2,id:"التكامل-في-الواقع-العملي",text:"التكامل في الواقع العملي"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],c=`<p>يتألّق TypeScript في التقاط الأخطاء وقت التصريف، لكنّ الوصولية (accessibility) غالبًا ما تُفحَص وقت التشغيل—إن مُيِّز لها فحص أصلًا. فماذا لو جعلنا حالات المكوّنات غير القابلة للوصول مستحيلة التصريف حرفيًا؟ بتقنيات TypeScript السليمة، يمكنك ترميز قيود ARIA (Accessible Rich Internet Applications) مباشرةً في أنواعك، بما يضمن أن تعمل قارئات الشاشة (screen readers) والتنقّل بلوحة المفاتيح بشكل صحيح قبل أن تُنفَّذ شيفرتك أصلًا.</p>
<p>سنتعرّف على كيفية الاستفادة من نظام أنواع TypeScript لفرض أفضل ممارسات الوصولية، وإنشاء واجهات الخصائص (props) الخاصة بـ ARIA آمنة الأنواع، وبناء مكوّنات (components) ترشد المطوّرين نحو أنماط التصميم الشموليّ. وفي النهاية، ستكتشف مخالفات الوصولية في بيئة التطوير لديك بدلًا من أثناء الاختبار (أو الأسوأ: في الإنتاج).</p>
<h2 id="لماذا-نرمز-قيود-الوصولية-في-الأنواع">لماذا نُرمِّز قيود الوصولية في الأنواع؟</h2>
<p>قبل التعمّق في التنفيذ، لنحدّد أولًا لماذا من المهمّ ترميز قواعد الوصولية في TypeScript. تعتمد المقاربات التقليدية على أدوات الفحص وقت التشغيل مثل <code>eslint-plugin-jsx-a11y</code> أو على الاختبار اليدوي—وكلاهما ذو قيمة، لكنهما يلتقطان المشكلات بعد كتابة الشيفرة.</p>
<p>وتقدّم قيود الوصولية في TypeScript عدّة مزايا:</p>
<ul>
<li><strong>الأمان وقت التصريف</strong>: التركيبات غير الصالحة من خصائص ARIA تصبح أخطاء TypeScript</li>
<li><strong>تجربة المطوّر</strong>: يرشدك IntelliSense إلى الاستخدام الصحيح لـ ARIA</li>
<li><strong>التوثيق</strong>: تصلح الأنواع توثيقًا حيًّا لمتطلبات الوصولية</li>
<li><strong>أمان إعادة الهيكلة</strong>: انكسار عقود الوصولية يتجلّى أثناء تعديل الشيفرة</li>
</ul>
<p>انظر هذه المخالفة الشائعة للوصولية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This compiles but creates accessibility issues</span>
&lt;button disabled aria-pressed=<span class="hljs-string">&quot;true&quot;</span>&gt;
  <span class="hljs-title class_">Toggle</span>
&lt;/button&gt;
</code></pre>
<p>زرٌّ معطَّل وعليه <code>aria-pressed</code> يسبّب ارتباكًا لقارئات الشاشة—فالعناصر المعطَّلة لا ينبغي أن تملك حالات ضغط. وبتحديد أنواع سليم، يتحوّل هذا إلى خطأ تصريف بدلًا من اكتشافٍ متأخّر وقت التشغيل.</p>
<h2 id="فهم-aria-في-react">فهم ARIA في React</h2>
<p>تقدّم خصائص ARIA (Accessible Rich Internet Applications) معلومات دلالية إلى التقنيات المساعدة. يدعم React كل خصائص ARIA، لكنّ أنواع TypeScript المدمجة لا تفرض العلاقات المعقّدة بينها.</p>
<p>هكذا يبدو تحديد أنواع ARIA الافتراضي في React:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AriaAttributes</span> {
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-pressed&#x27;</span>?: <span class="hljs-built_in">boolean</span> | <span class="hljs-string">&#x27;false&#x27;</span> | <span class="hljs-string">&#x27;true&#x27;</span> | <span class="hljs-string">&#x27;mixed&#x27;</span>;
  <span class="hljs-comment">// ... many more</span>
}
</code></pre>
<p>هذه الأنواع متساهلة—فهي تسمح بأي تركيبة من خصائص ARIA دون اعتبار للسياق أو للاستثناءات المتبادلة. أما الوصولية الفعلية فتتطلّب فهم العلاقات بين الخصائص، وأدوار العناصر (roles)، وحالات التفاعل.</p>
<h2 id="أنواع-قيود-aria-الأساسية">أنواع قيود ARIA الأساسية</h2>
<p>لنبدأ بمثال بسيط: التأكد من أنّ الأزرار ذات وسمٍ سليم. فالزر يحتاج إما إلى محتوى نصّي ظاهر، وإما إلى <code>aria-label</code>، وإما إلى إشارة <code>aria-labelledby</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonLabelProps</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
} | {
  <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-built_in">string</span>;
} | {
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AccessibleButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ButtonLabelProps</span> {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// ✅ All of these work</span>
&lt;<span class="hljs-title class_">AccessibleButton</span> onClick={handleClick}&gt;
  <span class="hljs-title class_">Save</span> <span class="hljs-title class_">Changes</span>
&lt;/<span class="hljs-title class_">AccessibleButton</span>&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Close dialog&quot;</span> /&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">&quot;save-label&quot;</span> /&gt;</span></span>

<span class="hljs-comment">// ❌ TypeScript error: button needs a label</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span></span>
</code></pre>
<p>يضمن النوع الاتحادي (union type) هذا أنّ كل زرٍّ منشأ منها يملك شكلًا ما من الوسم القابل للقراءة ليست، فيلتقط الأزرار بلا وسم وقت التصريف.</p>
<h2 id="قيود-حالة-أزرار-التبديل">قيود حالة أزرار التبديل</h2>
<p>تطرح أزرار التبديل (toggle buttons) تحديات مثيرة في تحديد الأنواع. فخاصية <code>aria-pressed</code> ألا تظهر إلا على الأزرار التي تُبدّل حالتها فعلًا، وأن تعكس قيمتها الحالة الراهنة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ToggleButtonProps</span> = {
  <span class="hljs-attr">pressed</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-string">&#x27;aria-pressed&#x27;</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onToggle</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">pressed</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
} | {
  <span class="hljs-comment">// Regular button - no toggle state</span>
  <span class="hljs-attr">pressed</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-pressed&#x27;</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">onToggle</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ToggleButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ children, disabled, ...props }</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;onToggle&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
        <span class="hljs-attr">aria-pressed</span>=<span class="hljs-string">{props.pressed}</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> props.onToggle(!props.pressed)}
      &gt;
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ Toggle button with proper state</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">pressed</span>=<span class="hljs-string">{isExpanded}</span> <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{setIsExpanded}</span> <span class="hljs-attr">aria-pressed</span>=<span class="hljs-string">{isExpanded}</span>&gt;</span>
  Expand Details
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>

<span class="hljs-comment">// ✅ Regular button</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSave}</span>&gt;</span>
  Save
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>

<span class="hljs-comment">// ❌ TypeScript error: can&#x27;t mix toggle and regular button props</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">pressed</span>=<span class="hljs-string">{true}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSave}</span>&gt;</span>
  Invalid
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
</code></pre>
<p>يمنع النوع الاتحادي المتمايز (discriminated union) هذا خلط نمط زر التبديل مع الزر العادي، ويضمن ظهور <code>aria-pressed</code> فقط مع إدارة الحالة المناسبة.</p>
<h2 id="ترابط-عناصر-النماذج">ترابط عناصر النماذج</h2>
<p>تحتاج عناصر التحكم في النماذج إلى وسمٍ سليم، وكثيرًا ما تحتاج إلى الإعلان عن الأخطاء. لننشئ أنواعًا تفرض هذه الارتباطات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormControlLabel</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>: <span class="hljs-built_in">string</span>;
} | {
  <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">id</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormControlError</span> = {
  <span class="hljs-string">&#x27;aria-invalid&#x27;</span>: <span class="hljs-literal">true</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>: <span class="hljs-built_in">string</span>;
} | {
  <span class="hljs-string">&#x27;aria-invalid&#x27;</span>?: <span class="hljs-literal">false</span> | <span class="hljs-literal">undefined</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TextInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FormControlLabel</span>, <span class="hljs-title class_">FormControlError</span> {
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TextInput</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">TextInputProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{
  id,
  value,
  onChange,
  required,
  ...ariaProps
}</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">{id}</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
    <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
    <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
    required={required}
    {...ariaProps}
  /&gt;</span>
);

<span class="hljs-comment">// ✅ Properly labeled input</span>
<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;email&quot;</span>&gt;</span>Email Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">value</span>=<span class="hljs-string">{email}</span>
    <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setEmail}</span>
    <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">&quot;email&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/&gt;</span></span>

<span class="hljs-comment">// ✅ Input with error state</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span>
  <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Username&quot;</span>
  <span class="hljs-attr">value</span>=<span class="hljs-string">{username}</span>
  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setUsername}</span>
  <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{true}</span>
  <span class="hljs-attr">aria-describedby</span>=<span class="hljs-string">&quot;username-error&quot;</span>
/&gt;</span></span>

<span class="hljs-comment">// ❌ TypeScript error: invalid input needs error description</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span>
  <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Username&quot;</span>
  <span class="hljs-attr">value</span>=<span class="hljs-string">{username}</span>
  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setUsername}</span>
  <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{true}</span>
  // <span class="hljs-attr">Missing</span> <span class="hljs-attr">aria-describedby</span>
/&gt;</span></span>
</code></pre>
<h2 id="قيود-أدوار-aria-المتقدمة">قيود أدوار ARIA المتقدّمة</h2>
<p>بعض العناصر تحمل علاقات ARIA معقّدة. فنوافذ الحوار المنبثقة (modal dialogs) مثلًا تتطلّب خصائص محدّدة وإدارةً للتركيز:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Modal</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ModalProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{
  isOpen,
  onClose,
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>: labelledby,
  <span class="hljs-string">&#x27;aria-describedby&#x27;</span>: describedby,
  children,
}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> modalRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (isOpen &amp;&amp; modalRef.<span class="hljs-property">current</span>) {
      modalRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
    }
  }, [isOpen]);

  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{modalRef}</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;dialog&quot;</span>
      <span class="hljs-attr">aria-modal</span>=<span class="hljs-string">&quot;true&quot;</span>
      <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">{labelledby}</span>
      <span class="hljs-attr">aria-describedby</span>=<span class="hljs-string">{describedby}</span>
      <span class="hljs-attr">tabIndex</span>=<span class="hljs-string">{-1}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.target === e.currentTarget &amp;&amp; onClose()}
    &gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ Properly structured modal</span>
<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
    <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{showModal}</span>
    <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setShowModal(false)}
    aria-labelledby=&quot;modal-title&quot;
    aria-describedby=&quot;modal-description&quot;
  &gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;modal-title&quot;</span>&gt;</span>Confirm Action<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;modal-description&quot;</span>&gt;</span>This action cannot be undone.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleConfirm}</span>&gt;</span>Confirm<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
<span class="hljs-tag">&lt;/&gt;</span></span>;
</code></pre>
<p>يضمن نظام الأنواع أنّ النوافذ المنبثقة تحمل دومًا وسمًا سليمًا، ما يمنع الخطأ الشائع المتمثّل في نوافذ حوار بلا وسم.</p>
<h2 id="إنشاء-مكتبات-مكونات-قابلة-للوصول">إنشاء مكتبات مكوّنات قابلة للوصول</h2>
<p>عند بناء مكتبات المكوّنات (component libraries)، تكتسب قيود الوصولية قيمة أكبر. لننشئ نظام أزرار شاملًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Base button requirements</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonRole</span> = <span class="hljs-string">&#x27;button&#x27;</span> | <span class="hljs-string">&#x27;switch&#x27;</span> | <span class="hljs-string">&#x27;tab&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonLabel</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>?: <span class="hljs-built_in">never</span>;
} | {
  <span class="hljs-attr">children</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>?: <span class="hljs-built_in">never</span>;
} | {
  <span class="hljs-attr">children</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-label&#x27;</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-labelledby&#x27;</span>: <span class="hljs-built_in">string</span>;
};

<span class="hljs-comment">// Role-specific constraints</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonByRole</span>&lt;R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ButtonRole</span>&gt; = R <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;switch&#x27;</span> ? {
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;switch&#x27;</span>;
  <span class="hljs-string">&#x27;aria-checked&#x27;</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">checked</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
} : R <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;tab&#x27;</span> ? {
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;tab&#x27;</span>;
  <span class="hljs-string">&#x27;aria-selected&#x27;</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-string">&#x27;aria-controls&#x27;</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
} : {
  <span class="hljs-attr">role</span>?: <span class="hljs-string">&#x27;button&#x27;</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AccessibleButtonProps</span>&lt;R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ButtonRole</span> = <span class="hljs-string">&#x27;button&#x27;</span>&gt; =
  <span class="hljs-title class_">ButtonLabel</span> &amp;
  <span class="hljs-title class_">ButtonByRole</span>&lt;R&gt; &amp; {
    <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  };

<span class="hljs-keyword">function</span> <span class="hljs-title class_">AccessibleButton</span>&lt;R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ButtonRole</span> = <span class="hljs-string">&#x27;button&#x27;</span>&gt;({
  role = <span class="hljs-string">&#x27;button&#x27;</span> <span class="hljs-keyword">as</span> R,
  disabled,
  className,
  ...props
}: <span class="hljs-title class_">AccessibleButtonProps</span>&lt;R&gt;) {
  <span class="hljs-keyword">if</span> (role === <span class="hljs-string">&#x27;switch&#x27;</span>) {
    <span class="hljs-keyword">const</span> switchProps = props <span class="hljs-keyword">as</span> <span class="hljs-title class_">ButtonByRole</span>&lt;<span class="hljs-string">&#x27;switch&#x27;</span>&gt;;
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;switch&quot;</span>
        <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
        <span class="hljs-attr">aria-checked</span>=<span class="hljs-string">{switchProps[</span>&#x27;<span class="hljs-attr">aria-checked</span>&#x27;]}
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> switchProps.onClick(!switchProps[&#x27;aria-checked&#x27;])}
        {...((&#x27;children&#x27; in props) ? { children: props.children } : {})}
        {...((&#x27;aria-label&#x27; in props) ? { &#x27;aria-label&#x27;: props[&#x27;aria-label&#x27;] } : {})}
        {...((&#x27;aria-labelledby&#x27; in props) ? { &#x27;aria-labelledby&#x27;: props[&#x27;aria-labelledby&#x27;] } : {})}
      /&gt;</span>
    );
  }

  <span class="hljs-keyword">if</span> (role === <span class="hljs-string">&#x27;tab&#x27;</span>) {
    <span class="hljs-keyword">const</span> tabProps = props <span class="hljs-keyword">as</span> <span class="hljs-title class_">ButtonByRole</span>&lt;<span class="hljs-string">&#x27;tab&#x27;</span>&gt;;
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;tab&quot;</span>
        <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
        <span class="hljs-attr">aria-selected</span>=<span class="hljs-string">{tabProps[</span>&#x27;<span class="hljs-attr">aria-selected</span>&#x27;]}
        <span class="hljs-attr">aria-controls</span>=<span class="hljs-string">{tabProps[</span>&#x27;<span class="hljs-attr">aria-controls</span>&#x27;]}
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{tabProps.onClick}</span>
        {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">children</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { <span class="hljs-attr">children:</span> <span class="hljs-attr">props.children</span> } <span class="hljs-attr">:</span> {})}
        {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">aria-label</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { &#x27;<span class="hljs-attr">aria-label</span>&#x27;<span class="hljs-attr">:</span> <span class="hljs-attr">props</span>[&#x27;<span class="hljs-attr">aria-label</span>&#x27;] } <span class="hljs-attr">:</span> {})}
        {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">aria-labelledby</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { &#x27;<span class="hljs-attr">aria-labelledby</span>&#x27;<span class="hljs-attr">:</span> <span class="hljs-attr">props</span>[&#x27;<span class="hljs-attr">aria-labelledby</span>&#x27;] } <span class="hljs-attr">:</span> {})}
      /&gt;</span></span>
    );
  }

  <span class="hljs-keyword">const</span> buttonProps = props <span class="hljs-keyword">as</span> <span class="hljs-title class_">ButtonByRole</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt;;
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{buttonProps.onClick}</span>
      {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">children</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { <span class="hljs-attr">children:</span> <span class="hljs-attr">props.children</span> } <span class="hljs-attr">:</span> {})}
      {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">aria-label</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { &#x27;<span class="hljs-attr">aria-label</span>&#x27;<span class="hljs-attr">:</span> <span class="hljs-attr">props</span>[&#x27;<span class="hljs-attr">aria-label</span>&#x27;] } <span class="hljs-attr">:</span> {})}
      {<span class="hljs-attr">...</span>((&#x27;<span class="hljs-attr">aria-labelledby</span>&#x27; <span class="hljs-attr">in</span> <span class="hljs-attr">props</span>) ? { &#x27;<span class="hljs-attr">aria-labelledby</span>&#x27;<span class="hljs-attr">:</span> <span class="hljs-attr">props</span>[&#x27;<span class="hljs-attr">aria-labelledby</span>&#x27;] } <span class="hljs-attr">:</span> {})}
    /&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage examples with full type safety</span>
&lt;<span class="hljs-title class_">AccessibleButton</span>&gt;
  <span class="hljs-title class_">Regular</span> <span class="hljs-title class_">Button</span>
&lt;/<span class="hljs-title class_">AccessibleButton</span>&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span>
  <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;switch&quot;</span>
  <span class="hljs-attr">aria-checked</span>=<span class="hljs-string">{isEnabled}</span>
  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{setIsEnabled}</span>
  <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Enable notifications&quot;</span>
/&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span>
  <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;tab&quot;</span>
  <span class="hljs-attr">aria-selected</span>=<span class="hljs-string">{activeTab</span> === <span class="hljs-string">&#x27;settings&#x27;</span>}
  <span class="hljs-attr">aria-controls</span>=<span class="hljs-string">&quot;settings-panel&quot;</span>
  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setActiveTab(&#x27;settings&#x27;)}
&gt;
  Settings
<span class="hljs-tag">&lt;/<span class="hljs-name">AccessibleButton</span>&gt;</span></span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عند بناء مكتبات المكوّنات، ابدأ بأكثر الأنواع تقييدًا ممكنًا. فتخفيف القيود لاحقًا ممكن دائمًا، أما إضافة قيود إلى واجهات برمجية موجودة فيخلق تغييرات كاسِرة.</p>
</blockquote>
<h2 id="التحقق-وقت-التشغيل-باستخدام-zod">التحقّق وقت التشغيل باستخدام Zod</h2>
<p>لمزيد من الأمان، اربط قيود TypeScript بالتحقّق وقت التشغيل باستخدام Zod. هذا يلتقط مخالفات الوصولية الآتية من بيانات ديناميكية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonPropsSchema</span> = z
  .<span class="hljs-title function_">discriminatedUnion</span>(<span class="hljs-string">&#x27;role&#x27;</span>, [
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">role</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;button&#x27;</span>).<span class="hljs-title function_">optional</span>(),
      <span class="hljs-attr">onClick</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>),
      <span class="hljs-attr">children</span>: z.<span class="hljs-title function_">any</span>().<span class="hljs-title function_">optional</span>(),
      <span class="hljs-string">&#x27;aria-label&#x27;</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
    }),
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">role</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;switch&#x27;</span>),
      <span class="hljs-string">&#x27;aria-checked&#x27;</span>: z.<span class="hljs-title function_">boolean</span>(),
      <span class="hljs-attr">onClick</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>),
      <span class="hljs-string">&#x27;aria-label&#x27;</span>: z.<span class="hljs-title function_">string</span>(),
    }),
  ])
  .<span class="hljs-title function_">refine</span>(
    <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
      <span class="hljs-comment">// Ensure button has some form of label</span>
      <span class="hljs-keyword">if</span> (props.<span class="hljs-property">role</span> !== <span class="hljs-string">&#x27;switch&#x27;</span>) {
        <span class="hljs-keyword">return</span> props.<span class="hljs-property">children</span> || props[<span class="hljs-string">&#x27;aria-label&#x27;</span>];
      }
      <span class="hljs-keyword">return</span> props[<span class="hljs-string">&#x27;aria-label&#x27;</span>];
    },
    { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Button must have accessible label&#x27;</span> },
  );

<span class="hljs-keyword">const</span> <span class="hljs-title class_">SafeButton</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">ButtonPropsSchema</span>&gt;&gt; = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-comment">// Runtime validation</span>
  <span class="hljs-keyword">const</span> validatedProps = <span class="hljs-title class_">ButtonPropsSchema</span>.<span class="hljs-title function_">parse</span>(props);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AccessibleButton</span> {<span class="hljs-attr">...validatedProps</span>} /&gt;</span></span>;
};
</code></pre>
<p>يوفر هذا النهج أمانًا وقت التصريف ووقت التشغيل معًا، ويكون ذا قيمة خاصة عندما تأتي الخصائص من واجهات برمجية أو من ملفات إعداد.</p>
<h2 id="أنماط-شائعة-ومزالق">أنماط شائعة ومزالق</h2>
<h3 id="خصائص-aria-الشرطية">خصائص ARIA الشرطية</h3>
<p>قد ينبغي أحيانًا أن تظهر خصائص ARIA تحت شروط معيّنة فقط. استخدم الأنواع المعيَّنة (mapped types) للتعامل مع ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ConditionalAria</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? {
  <span class="hljs-string">&#x27;aria-expanded&#x27;</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-string">&#x27;aria-controls&#x27;</span>: <span class="hljs-built_in">string</span>;
} : {
  <span class="hljs-string">&#x27;aria-expanded&#x27;</span>?: <span class="hljs-built_in">never</span>;
  <span class="hljs-string">&#x27;aria-controls&#x27;</span>?: <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CollapsibleProps</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span> = false&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ConditionalAria</span>&lt;T&gt; {
  <span class="hljs-attr">isCollapsible</span>: T;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-comment">// ✅ Collapsible section with proper ARIA</span>
&lt;<span class="hljs-title class_">Collapsible</span>
  isCollapsible={<span class="hljs-literal">true</span>}
  aria-expanded={isExpanded}
  aria-controls=<span class="hljs-string">&quot;content-panel&quot;</span>
&gt;
  <span class="hljs-title class_">Section</span> <span class="hljs-title class_">Content</span>
&lt;/<span class="hljs-title class_">Collapsible</span>&gt;

<span class="hljs-comment">// ✅ Regular section without ARIA clutter</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Collapsible</span> <span class="hljs-attr">isCollapsible</span>=<span class="hljs-string">{false}</span>&gt;</span>
  Static Content
<span class="hljs-tag">&lt;/<span class="hljs-name">Collapsible</span>&gt;</span></span>
</code></pre>
<h3 id="التركيبات-غير-الصالحة">التركيبات غير الصالحة</h3>
<p>استخدم النوع <code>never</code> لمنع تركيبات الخصائص غير الصالحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">LinkOrButton</span> =
  | {
      <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">onClick</span>?: <span class="hljs-built_in">never</span>;
      <span class="hljs-attr">type</span>?: <span class="hljs-built_in">never</span>;
    }
  | {
      <span class="hljs-attr">href</span>?: <span class="hljs-built_in">never</span>;
      <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
      <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;button&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span> | <span class="hljs-string">&#x27;reset&#x27;</span>;
    };

<span class="hljs-comment">// This prevents the classic &quot;button with href&quot; antipattern</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ActionElementProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">LinkOrButton</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}
</code></pre>
<h3 id="اعتبارات-الأداء">اعتبارات الأداء</h3>
<p>يحدث التحقّق من الأنواع في TypeScript وقت التصريف، فلا تؤثر قيود الوصولية المعقّدة على أداء وقت التشغيل. لكن انتبه إلى ما يلي:</p>
<ul>
<li><strong>وقت البناء</strong>: قد تُبطئ الأنواع المعقّدة للغاية عملية تصريف TypeScript</li>
<li><strong>حجم الحزمة</strong>: التحقّق وقت التشغيل باستخدام Zod يزيد حجم الحزمة</li>
<li><strong>تجربة المطوّر</strong>: قد تُحبط الأنواع المفرطة في التقييد المطوّرين</li>
</ul>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تدع الكمال في تحديد أنواع الوصولية يغدو عدوًّا للممارسة الجيدة للوصولية. ابدأ بالبساطة، وكرّر التحسين وفق احتياجات فريقك.</p>
</blockquote>
<h2 id="اختبار-أنواع-الوصولية">اختبار أنواع الوصولية</h2>
<p>ينبغي اختبار قيود الوصولية لديك كما تُختبر أي شيفرات أخرى. وهذا نهج يستخدم الأنواع المساعدة (utility types) في TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expectType } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tsd&#x27;</span>;

<span class="hljs-comment">// Test valid button configurations</span>
expectType&lt;<span class="hljs-title class_">AccessibleButtonProps</span>&gt;({
  <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Click me&#x27;</span>,
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {},
});

expectType&lt;<span class="hljs-title class_">AccessibleButtonProps</span>&gt;({
  <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-string">&#x27;Close&#x27;</span>,
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {},
});

<span class="hljs-comment">// Test that invalid configurations don&#x27;t compile</span>
<span class="hljs-comment">// This would cause a TypeScript error in your test file</span>
<span class="hljs-comment">/* 
expectType&lt;AccessibleButtonProps&gt;({
  onClick: () =&gt; {},
  // Missing label - should error
});
*/</span>
</code></pre>
<p>فكّر في استخدام أدوات مثل <code>tsd</code> لاختبار الأنواع الرسمي، بما يضمن أنّ قيود الوصولية لديك تعمل كما يُتوقَّع.</p>
<h2 id="التكامل-مع-أنظمة-التصميم">التكامل مع أنظمة التصميم</h2>
<p>عند بناء أنظمة التصميم (design systems)، تتحوّل أنواع الوصولية إلى آلية توثيق وفرضٍ في آنٍ واحد. وهذا نمط لوصولية منهجية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define accessibility levels</span>
<span class="hljs-keyword">type</span> A11yLevel = <span class="hljs-string">&#x27;AA&#x27;</span> | <span class="hljs-string">&#x27;AAA&#x27;</span>;

<span class="hljs-comment">// Component metadata</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentA11</span>y {
  <span class="hljs-attr">level</span>: A11yLevel;
  <span class="hljs-attr">features</span>: (<span class="hljs-string">&#x27;keyboard&#x27;</span> | <span class="hljs-string">&#x27;screen-reader&#x27;</span> | <span class="hljs-string">&#x27;high-contrast&#x27;</span>)[];
  <span class="hljs-attr">wcagCriteria</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-comment">// Attach metadata to components</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonA11</span><span class="hljs-attr">y</span>: <span class="hljs-title class_">ComponentA11</span>y = {
  <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;AA&#x27;</span>,
  <span class="hljs-attr">features</span>: [<span class="hljs-string">&#x27;keyboard&#x27;</span>, <span class="hljs-string">&#x27;screen-reader&#x27;</span>],
  <span class="hljs-attr">wcagCriteria</span>: [<span class="hljs-string">&#x27;2.1.1&#x27;</span>, <span class="hljs-string">&#x27;4.1.2&#x27;</span>],
};

<span class="hljs-comment">// Runtime and build-time accessibility checks</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AccessibleButton</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">AccessibleButtonProps</span>&gt; &amp; {
  <span class="hljs-attr">a11y</span>: <span class="hljs-title class_">ComponentA11</span>y;
} = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
};

<span class="hljs-title class_">AccessibleButton</span>.<span class="hljs-property">a11y</span> = <span class="hljs-title class_">ButtonA11</span>y;
</code></pre>
<p>بهذا تنشأ منهجية منظمة للوصولية تتوسّع عبر مكتبات المكوّنات الكبيرة.</p>
<h2 id="التكامل-في-الواقع-العملي">التكامل في الواقع العملي</h2>
<p>هكذا تُدمج أنواع الوصولية في مشروع React قائم:</p>
<ol>
<li><strong>ابدأ صغيرًا</strong>: انطلق من المكوّنات الحساسة (الأزرار، النماذج، النوافذ المنبثقة)</li>
<li><strong>تبنٍّ تدريجي</strong>: ابدأ بالأنواع العامة (generics) في البداية، ثم أضف القيود مع الوقت</li>
<li><strong>تثقيف الفريق</strong>: وثّق الأنماط وقدّم أمثلة</li>
<li><strong>دمج الأدوات</strong>: اضبط ESLint وPrettier ليعملا مع أنواعك</li>
<li><strong>استراتيجية الاختبار</strong>: أدرج الوصولية في نهجك لاختبار المكوّنات</li>
</ol>
<pre><code class="language-typescript"><span class="hljs-comment">// Example migration strategy</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LegacyButtonProps</span> {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// ... other props</span>
}

<span class="hljs-comment">// Extend existing interface with accessibility constraints</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModernButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">LegacyButtonProps</span>, &#x27;children&#x27;&gt;, <span class="hljs-title class_">ButtonLabelProps</span> {
  <span class="hljs-comment">// New accessibility requirements</span>
}

<span class="hljs-comment">// Gradual migration helper</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">LegacyButtonProps</span> | <span class="hljs-title class_">ModernButtonProps</span>;
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>بما أنّك أدمجت الوصولية في نظام أنواعك، فقد ركعتَ أساسًا للتطوير الشموليّ الذي يتوسّع مع مستودع شيفرتك. فكّر في استكشاف:</p>
<ul>
<li><strong>قواعد ESLint مخصّصة</strong> تفرض أنواع الوصولية لديك</li>
<li><strong>تكامل مع Storybook</strong> يتحقّق من الوصولية في توثيق مكوّناتك</li>
<li><strong>فحوص وقت البناء</strong> تمنع نشر شيفرة غير قابلة للوصول</li>
<li><strong>أنماط متقدّمة</strong> مثل المكوّنات متعدّدة الأشكال (polymorphic components) مع قيود وصولية</li>
</ul>
<p>الهدف ليس التقاط كل مشكلة وصولية وقت التصريف—فذلك مستحيل وغير عملي. بل استخدم TypeScript لترميز أحرج الأنماط والعلاقات، منشئًا حواجز أمان ترشد المطوّرين نحو الحلول القابلة للوصول.</p>
<p>تذكّر: الوصولية تتعلّق في نهاية المطاف بالناس، لا بالأنواع وحدها. استخدم هذه التقنيات لدعم الممارسات الجيدة، لكن تحقّق دومًا مع مستخدمين حقيقيين وتقنيات مساعدة. يقدر TypeScript منع كثير من أخطاء الوصولية، لكنه لا يحلّ محل الاختبار البشري والتعاطف.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
