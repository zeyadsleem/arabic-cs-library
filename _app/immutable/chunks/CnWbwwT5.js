const s="kinney",a="react-typescript",n="React مع TypeScript",l="function-overloads-in-react",p="الأحمال الزائدة للدوال واجهات برمجية مرنة",t=[{depth:2,id:"المشكلة-واجهات-جامدة-مقابل-الاستخدام-الواقعي",text:"المشكلة: واجهات جامدة مقابل الاستخدام الواقعي"},{depth:2,id:"الأحمال-الزائدة-للدوال-توقيعات-متعددة-وتنفيذ-واحد",text:"الأحمال الزائدة للدوال: توقيعات متعددة وتنفيذ واحد"},{depth:2,id:"نمط-واقعي-خصائص-مشروطة",text:"نمط واقعي: خصائص مشروطة"},{depth:2,id:"الأحمال-الزائدة-للخطافات-إدارة-حالة-مرنة",text:"الأحمال الزائدة للخُطّافات: إدارة حالة مرنة"},{depth:2,id:"نمط-متقدم-تابعات-محملة-زائدا",text:"نمط متقدم: تابِعات محمّلة زائداً"},{depth:2,id:"الفخاخ-وأفضل-الممارسات",text:"الفخاخ وأفضل الممارسات"},{depth:3,id:"يجب-أن-يعالج-التنفيذ-جميع-الحالات",text:"يجب أن يعالج التنفيذ جميع الحالات"},{depth:3,id:"الترتيب-مهم",text:"الترتيب مهم"},{depth:3,id:"لا-تبالغ-في-استخدام-الأحمال-الزائدة",text:"لا تبالغ في استخدام الأحمال الزائدة"},{depth:2,id:"متى-تلجأ-إلى-الأحمال-الزائدة",text:"متى تلجأ إلى الأحمال الزائدة"}],c=`<p>تتيح لك الأحمال الزائدة للدوال (function overloads) في TypeScript تعريف أكثر من توقيع نوع واحد لدالة واحدة، مما يخلق واجهات برمجية تبدو بديهية وتتكيّف مع الطريقة التي يرغب المطورون فعلاً في استخدامها. في تطبيقات React، يترجم ذلك إلى مكوّنات وخُطّافات تعمل ببساطة بغض النظر عما إذا كنت تمرّر سلسلة نصية أو كائناً أو تركيبات مختلفة من الوسائط. سنستكشف كيفية تصميم واجهات مرنة وآمنة من ناحية الأنواع تجعل مكوّناتك بمستوى مكوّنات React المدمجة (built-ins).</p>
<p>فكّر في الأحمال الزائدة باعتبارها طريقة للقول: «هذه الدالة يمكن استدعاؤها بهذه الطرق المحددة، وسيعرف TypeScript تماماً ما يمكن توقعه في كل حالة». بدلاً من إجبار المستخدمين على واجهة برمجية جامدة واحدة، يمكنك دعم أنماط استدعاء متعددة مع الحفاظ على أمان أنواع كامل.</p>
<h2 id="المشكلة-واجهات-جامدة-مقابل-الاستخدام-الواقعي">المشكلة: واجهات جامدة مقابل الاستخدام الواقعي</h2>
<p>اعتبر مكوّن <code>Button</code> بسيطاً يقبل إما سلسلة نصية أو كائن تهيئة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Awkward: forces everyone into the same pattern</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">config</span>: <span class="hljs-built_in">string</span> | { <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>; <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span> };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ config }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> config === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>{config}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{config.disabled}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn-</span>\${<span class="hljs-attr">config.variant</span>}\`}&gt;</span>
      {config.text}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage feels clunky</span>
&lt;<span class="hljs-title class_">Button</span> config=<span class="hljs-string">&quot;Click me&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">text:</span> &quot;<span class="hljs-attr">Submit</span>&quot;, <span class="hljs-attr">variant:</span> &quot;<span class="hljs-attr">primary</span>&quot;, <span class="hljs-attr">disabled:</span> <span class="hljs-attr">false</span> }} /&gt;</span></span>
</code></pre>
<p>هذا يعمل، لكنه يبدو غير طبيعي. يضطر المستخدمون إلى تغليف السلاسل النصية البسيطة داخل كائن <code>config</code>، ولا يستطيع TypeScript توفير إكمال تلقائي دقيق بناءً على طريقة استدعائك للمكوّن.</p>
<h2 id="الأحمال-الزائدة-للدوال-توقيعات-متعددة-وتنفيذ-واحد">الأحمال الزائدة للدوال: توقيعات متعددة وتنفيذ واحد</h2>
<p>تتيح لك الأحمال الزائدة تعريف عدة «توقيعات استدعاء» (call signatures) تشير جميعها إلى نفس الدالة الأساسية. وإليك كيف سنحسّن مكوّن Button:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Multiple call signatures</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: { text: <span class="hljs-built_in">string</span>; variant: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>; disabled?: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">textOrConfig</span>: <span class="hljs-built_in">string</span> | { text: <span class="hljs-built_in">string</span>; variant: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>; disabled?: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> textOrConfig === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>{textOrConfig}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">const</span> { text, variant = <span class="hljs-string">&#x27;primary&#x27;</span>, disabled = <span class="hljs-literal">false</span> } = textOrConfig;
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn-</span>\${<span class="hljs-attr">variant</span>}\`}&gt;</span>
      {text}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage feels natural</span>
&lt;<span class="hljs-title class_">Button</span> text=<span class="hljs-string">&quot;Click me&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">text:</span> &quot;<span class="hljs-attr">Submit</span>&quot;, <span class="hljs-attr">variant:</span> &quot;<span class="hljs-attr">primary</span>&quot; }} /&gt;</span></span>
</code></pre>
<p>الآن يعرف TypeScript أنه عند تمرير سلسلة نصية ستحصل على زر أساسي. وعند تمرير كائن، يتوقع واجهة التهيئة الكاملة ويوفر الإكمال التلقائي لـ <code>variant</code> و<code>disabled</code>.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>يجب أن يكون التوقيع المنفِّذ (جسم الدالة الفعلي) متوافقاً مع جميع توقيعات الأحمال الزائدة. سيعرض TypeScript للمستخدمين توقيعات الأحمال الزائدة في IntelliSense فقط، وليس التوقيع المنفِّذ.</p>
</blockquote>
<h2 id="نمط-واقعي-خصائص-مشروطة">نمط واقعي: خصائص مشروطة</h2>
<p>إليك مثالاً أكثر تطوراً — مكوّن <code>Modal</code> يغيّر خصائصه بناءً على كونه متحكَّماً فيه (controlled) أو غير متحكَّم فيه (uncontrolled):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">BaseModalProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ControlledModalProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UncontrolledModalProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseModalProps</span> {
  <span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Overload signatures</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ControlledModalProps</span></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">UncontrolledModalProps</span></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ControlledModalProps</span> | <span class="hljs-title class_">UncontrolledModalProps</span></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> {
  <span class="hljs-comment">// Type guards help us narrow the implementation</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;isOpen&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-comment">// TypeScript knows this is ControlledModalProps</span>
    <span class="hljs-keyword">const</span> { isOpen, onClose, title, children } = props;
    <span class="hljs-keyword">return</span> isOpen ? (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-content&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          {children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    ) : <span class="hljs-literal">null</span>;
  }

  <span class="hljs-comment">// TypeScript knows this is UncontrolledModalProps</span>
  <span class="hljs-keyword">const</span> { defaultOpen = <span class="hljs-literal">false</span>, title, children } = props;
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(defaultOpen);

  <span class="hljs-keyword">return</span> isOpen ? (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-content&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsOpen(false)}&gt;×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  ) : <span class="hljs-literal">null</span>;
}
</code></pre>
<p>يحصل المستخدمون على تجربة TypeScript مختلفة بناءً على نيتهم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Controlled usage - TypeScript requires isOpen and onClose</span>
&lt;<span class="hljs-title class_">Modal</span>
  isOpen={showModal}
  onClose={<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setShowModal</span>(<span class="hljs-literal">false</span>)}
  title=<span class="hljs-string">&quot;Settings&quot;</span>
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SettingsForm</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Modal</span>&gt;

<span class="hljs-comment">// Uncontrolled usage - TypeScript knows onClose doesn&#x27;t exist</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
  <span class="hljs-attr">defaultOpen</span>=<span class="hljs-string">{true}</span>
  <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Welcome&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">WelcomeMessage</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>
</code></pre>
<h2 id="الأحمال-الزائدة-للخطافات-إدارة-حالة-مرنة">الأحمال الزائدة للخُطّافات: إدارة حالة مرنة</h2>
<p>تستفيد الخُطّافات المخصّصة من الأحمال الزائدة بشكل كبير. إليك خُطّاف <code>useLocalStorage</code> يعيد أشكالاً مختلفة بناءً على رغبتك في تضمين حالات التحميل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Overload 1: Simple usage</span>
<span class="hljs-keyword">function</span> useLocalStorage&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">defaultValue</span>: T,
): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> <span class="hljs-built_in">void</span>];

<span class="hljs-comment">// Overload 2: With loading state</span>
<span class="hljs-keyword">function</span> useLocalStorage&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">defaultValue</span>: T,
  <span class="hljs-attr">includeLoading</span>: <span class="hljs-literal">true</span>,
): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> <span class="hljs-built_in">void</span>, <span class="hljs-built_in">boolean</span>];

<span class="hljs-comment">// Implementation</span>
<span class="hljs-keyword">function</span> useLocalStorage&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">defaultValue</span>: T,
  <span class="hljs-attr">includeLoading</span>?: <span class="hljs-built_in">boolean</span>,
):
  [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> <span class="hljs-built_in">void</span>] | [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> <span class="hljs-built_in">void</span>, <span class="hljs-built_in">boolean</span>] {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> item = <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">getItem</span>(key);
      <span class="hljs-keyword">return</span> item ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(item) : defaultValue;
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> defaultValue;
    }
  });

  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(includeLoading ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> setValue = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> newValue = value <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Function</span> ? <span class="hljs-title function_">value</span>(state) : value;
        <span class="hljs-title function_">setState</span>(newValue);
        <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(newValue));
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error setting localStorage key &quot;<span class="hljs-subst">\${key}</span>&quot;:\`</span>, error);
      }
    },
    [key, state],
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (includeLoading) {
      <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, [includeLoading]);

  <span class="hljs-comment">// TypeScript uses the overloads to determine the return type</span>
  <span class="hljs-keyword">if</span> (includeLoading) {
    <span class="hljs-keyword">return</span> [state, setValue, loading];
  }

  <span class="hljs-keyword">return</span> [state, setValue];
}
</code></pre>
<p>الآن يحصل المستخدمون على الواجهة البرمجية التي يتوقعونها تماماً:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple usage - no loading state</span>
<span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useLocalStorage</span>(<span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-literal">null</span>);

<span class="hljs-comment">// With loading - includes loading boolean</span>
<span class="hljs-keyword">const</span> [settings, setSettings, isLoading] = <span class="hljs-title function_">useLocalStorage</span>(<span class="hljs-string">&#x27;settings&#x27;</span>, {}, <span class="hljs-literal">true</span>);

<span class="hljs-keyword">if</span> (isLoading) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading settings...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="نمط-متقدم-تابعات-محملة-زائدا">نمط متقدم: تابِعات محمّلة زائداً</h2>
<p>يمكنك أيضاً استخدام الأحمال الزائدة مع توابِع الكائنات، وهو أمر مفيد بشكل خاص لأنماط الباني أو الواجهات المتسلسلة (fluent interfaces):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">QueryBuilder</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">conditions</span>: <span class="hljs-built_in">string</span>[] = [];

  <span class="hljs-comment">// Overload for single condition</span>
  <span class="hljs-title function_">where</span>(<span class="hljs-attr">field</span>: keyof T, <span class="hljs-attr">operator</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">QueryBuilder</span>&lt;T&gt;;
  <span class="hljs-comment">// Overload for object condition</span>
  <span class="hljs-title function_">where</span>(<span class="hljs-attr">conditions</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">any</span>&gt;&gt;): <span class="hljs-title class_">QueryBuilder</span>&lt;T&gt;;
  <span class="hljs-comment">// Implementation</span>
  <span class="hljs-title function_">where</span>(
    <span class="hljs-attr">fieldOrConditions</span>: keyof T | <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">any</span>&gt;&gt;,
    <span class="hljs-attr">operator</span>?: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">value</span>?: <span class="hljs-built_in">any</span>,
  ): <span class="hljs-title class_">QueryBuilder</span>&lt;T&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fieldOrConditions === <span class="hljs-string">&#x27;object&#x27;</span>) {
      <span class="hljs-comment">// Handle object conditions</span>
      <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(fieldOrConditions).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[field, val]</span>) =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">conditions</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">String</span>(field)}</span> = <span class="hljs-subst">\${<span class="hljs-built_in">JSON</span>.stringify(val)}</span>\`</span>);
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Handle single condition</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">conditions</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">String</span>(fieldOrConditions)}</span> <span class="hljs-subst">\${operator}</span> <span class="hljs-subst">\${<span class="hljs-built_in">JSON</span>.stringify(value)}</span>\`</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>;
  }

  <span class="hljs-title function_">build</span>(): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">conditions</span>.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27; AND &#x27;</span>);
  }
}

<span class="hljs-comment">// Usage supports both patterns</span>
<span class="hljs-keyword">const</span> query1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryBuilder</span>&lt;<span class="hljs-title class_">User</span>&gt;()
  .<span class="hljs-title function_">where</span>(<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;&gt;&#x27;</span>, <span class="hljs-number">18</span>)
  .<span class="hljs-title function_">where</span>(<span class="hljs-string">&#x27;status&#x27;</span>, <span class="hljs-string">&#x27;=&#x27;</span>, <span class="hljs-string">&#x27;active&#x27;</span>)
  .<span class="hljs-title function_">build</span>();

<span class="hljs-keyword">const</span> query2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryBuilder</span>&lt;<span class="hljs-title class_">User</span>&gt;().<span class="hljs-title function_">where</span>({ <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;active&#x27;</span> }).<span class="hljs-title function_">build</span>();
</code></pre>
<h2 id="الفخاخ-وأفضل-الممارسات">الفخاخ وأفضل الممارسات</h2>
<h3 id="يجب-أن-يعالج-التنفيذ-جميع-الحالات">يجب أن يعالج التنفيذ جميع الحالات</h3>
<p>يجب أن تعالج دالة التنفيذ كل تركيبة ممكنة معرّفة في أحمالك الزائدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Implementation doesn&#x27;t handle all overload cases</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">toUpperCase</span>();
  }
  <span class="hljs-comment">// Forgot to handle number[] case!</span>
  <span class="hljs-comment">// This will cause runtime errors</span>
}

<span class="hljs-comment">// ✅ Complete implementation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">toUpperCase</span>();
  }

  <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, num</span>) =&gt;</span> sum + num, <span class="hljs-number">0</span>);
}
</code></pre>
<h3 id="الترتيب-مهم">الترتيب مهم</h3>
<p>يفحص TypeScript الأحمال الزائدة من أعلى إلى أسفل ويستخدم أول تطابق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Order can cause unexpected behavior</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>): <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Too broad - matches everything</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Never reached!</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Never reached!</span>

<span class="hljs-comment">// ✅ Most specific first</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">format</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>): <span class="hljs-built_in">string</span>;
</code></pre>
<h3 id="لا-تبالغ-في-استخدام-الأحمال-الزائدة">لا تبالغ في استخدام الأحمال الزائدة</h3>
<p>أحياناً يكون نوع اتحادي بسيط أو نوع عام أوضح من الأحمال الزائدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Overloads for something simple</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getId</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getId</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getId</span>(<span class="hljs-params"><span class="hljs-attr">userOrId</span>: <span class="hljs-title class_">User</span> | <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> userOrId === <span class="hljs-string">&#x27;string&#x27;</span> ? userOrId : userOrId.<span class="hljs-property">id</span>;
}

<span class="hljs-comment">// ✅ Simple union is clearer</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getId</span>(<span class="hljs-params"><span class="hljs-attr">userOrId</span>: <span class="hljs-title class_">User</span> | <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> userOrId === <span class="hljs-string">&#x27;string&#x27;</span> ? userOrId : userOrId.<span class="hljs-property">id</span>;
}
</code></pre>
<p>استخدم الأحمال الزائدة عندما ترغب في توفير أنواع إرجاع مختلفة جوهرياً أو عندما تكون أنماط الاستدعاء متباينة بما يكفي لتستحق واجهات منفصلة.</p>
<h2 id="متى-تلجأ-إلى-الأحمال-الزائدة">متى تلجأ إلى الأحمال الزائدة</h2>
<p>تتألق الأحمال الزائدة للدوال عندما يكون لديك:</p>
<ul>
<li><strong>أنواع إرجاع مختلفة بناءً على المدخلات</strong>: مثل <code>useLocalStorage</code> الذي يعيد أطوالاً مختلفة للصفوف (tuples)</li>
<li><strong>أنماط خصائص متعارضة بالكامل</strong>: مكوّنات متحكَّم فيها مقابل غير متحكَّم فيها</li>
<li><strong>تحسين تدريجي (progressive enhancement)</strong>: الاستخدام الأساسي مقابل التهيئة المتقدمة</li>
<li><strong>التوافق مع الإصدارات السابقة</strong>: دعم واجهة برمجية قديمة بجانب ميزات جديدة</li>
</ul>
<p>تحوّل الأحمال الزائدة واجهات TypeScript الجيدة إلى واجهات رائعة. فهي تتيح لك دعم أنماط استخدام متعددة دون التضحية بأمان الأنواع، مما يخلق مكوّنات وخُطّافات تبدو بديهية وتتكيّف مع الطريقة التي يرغب المطورون فعلاً في العمل بها. المفتاح هو إيجاد التوازن الصحيح — استخدمها عندما تحسّن تجربة المطور فعلاً، وليس لمجرد أنك تستطيع ذلك.</p>
<p>عند تصميمها بعناية، تصبح الدوال المحمّلة زائداً غير قابلة للتمييز عن واجهات React المدمجة. فلا يفكر المستخدمون في الأحمال الزائدة؛ بل يستخدمون واجهتك البرمجية بشكل طبيعي ويحصلون على تجربة TypeScript التي يتوقعونها بالضبط.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
