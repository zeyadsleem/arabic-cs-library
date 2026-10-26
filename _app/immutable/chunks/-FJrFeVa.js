const s="kinney",a="react-typescript",n="React مع TypeScript",l="jsx-types-reactnode-reactelement",t="أنواع JSX: ReactNode وReactElement",p=[{depth:2,id:"الصورة-الكبيرة",text:"الصورة الكبيرة"},{depth:2,id:"reactnode-السكين-السويسري",text:"ReactNode: السكين السويسري"},{depth:2,id:"أنماط-العناصر-الفرعية-في-العالم-الحقيقي",text:"أنماط العناصر الفرعية في العالم الحقيقي"},{depth:3,id:"الحاوية-الأساسية",text:"الحاوية الأساسية"},{depth:3,id:"العناصر-الفرعية-الاختيارية",text:"العناصر الفرعية الاختيارية"},{depth:3,id:"خانات-متعددة-للعناصر-الفرعية",text:"خانات متعدّدة للعناصر الفرعية"},{depth:3,id:"دوال-التصيير-مع-العناصر-الفرعية",text:"دوال التصيير مع العناصر الفرعية"},{depth:3,id:"التصيير-الشرطي-للعناصر-الفرعية",text:"التصيير الشرطي للعناصر الفرعية"},{depth:2,id:"التعامل-مع-العناصر-الفرعية-دوال-مساعدة-من-react",text:"التعامل مع العناصر الفرعية: دوال مساعدة من React"},{depth:3,id:"reactchildrenmap",text:"React.Children.map"},{depth:3,id:"reactchildrencount",text:"React.Children.count"},{depth:3,id:"reactchildrenonly",text:"React.Children.only"},{depth:3,id:"حراس-الأنواع-للعناصر-الفرعية",text:"حرّاس الأنواع للعناصر الفرعية"},{depth:2,id:"reactelement-ناتج-jsx",text:"ReactElement: ناتج JSX"},{depth:2,id:"reactelement-مقابل-jsxelement-مقابل-reactnode-الصورة-الكاملة",text:"ReactElement مقابل JSX.Element مقابل ReactNode: الصورة الكاملة"},{depth:3,id:"jsxelement-موقف-typescript",text:"JSX.Element: موقف TypeScript"},{depth:3,id:"reactelement-الحل-الوسط",text:"ReactElement: الحل الوسط"},{depth:3,id:"التسلسل-الهرمي-للأنواع",text:"التسلسل الهرمي للأنواع"},{depth:3,id:"متى-تستخدم-كل-نوع-شجرة-قرار",text:"متى تستخدم كل نوع: شجرة قرار"},{depth:3,id:"مثال-من-العالم-الحقيقي-خانات-مكونات-آمنة-من-ناحية-الأنواع",text:"مثال من العالم الحقيقي: خانات مكوّنات آمنة من ناحية الأنواع"},{depth:3,id:"reactfragment-المصفوفات-والعناصر-الفرعية-ذات-المفاتيح",text:"ReactFragment: المصفوفات والعناصر الفرعية ذات المفاتيح"},{depth:3,id:"reactportal-التصيير-خارج-الشجرة",text:"ReactPortal: التصيير خارج الشجرة"},{depth:3,id:"فهم-نوع-reactnode-الاتحادي-الكامل",text:"فهم نوع ReactNode الاتحادي الكامل"},{depth:3,id:"متى-تستخدم-هذه-الأنواع-المحددة",text:"متى تستخدم هذه الأنواع المحددة"},{depth:2,id:"إرشادات-من-العالم-الحقيقي",text:"إرشادات من العالم الحقيقي"},{depth:3,id:"خصائص-العناصر-الفرعية-reactnode-في-أغلب-الحالات",text:"خصائص العناصر الفرعية: ReactNode في أغلب الحالات"},{depth:3,id:"دوال-التصيير-reactnode-عادة",text:"دوال التصيير: ReactNode عادةً"},{depth:3,id:"خصائص-العناصر-reactelement-حين-تحتاج-إلى-المعالجة",text:"خصائص العناصر: ReactElement حين تحتاج إلى المعالجة"},{depth:3,id:"أنواع-عائدات-المكونات-دع-typescript-يستنتج",text:"أنواع عائدات المكوّنات: دع TypeScript يستنتج"},{depth:2,id:"الأخطاء-الشائعة-والحلول",text:"الأخطاء الشائعة والحلول"},{depth:3,id:"الخطأ-1-استخدام-reactelement-للعناصر-الفرعية",text:"الخطأ 1: استخدام ReactElement للعناصر الفرعية"},{depth:3,id:"الخطأ-2-نسيان-التصيير-الشرطي",text:"الخطأ 2: نسيان التصيير الشرطي"},{depth:3,id:"الخطأ-3-تقييد-دوال-التصيير-أكثر-من-اللازم",text:"الخطأ 3: تقييد دوال التصيير أكثر من اللازم"},{depth:2,id:"شجرة-قرار-لكتابة-أنواع-العناصر-الفرعية",text:"شجرة قرار لكتابة أنواع العناصر الفرعية"},{depth:2,id:"الخلاصة-النهائية",text:"الخلاصة النهائية"}],e=`<p>قد تكون العناصر الفرعية (children) في React أي شيء تقريبًا: نصوصًا أو أرقامًا أو عناصر JSX أو مصفوفات عناصر أو أجزاءً (fragments) أو حتى <code>null</code>. لكن حين تكتب TypeScript، فكيف تكتب نوع خاصية <code>children</code> دون أن تكسر نصف حالات الاستخدام أو تكون متساهلًا أكثر من اللازم؟</p>
<p>المفتاح يكمن في فهم ثلاثة أنواع أساسية: <code>ReactNode</code> و<code>ReactElement</code> و<code>JSX.Element</code>. قد تبدو متشابهة، لكن اختيار الخطأ منها سيكسر مرونة مكوّنك أو يمنح مستهلكيه رسائل خطأ نوعية مربكة. وما إن تفهم تسلسلها الهرمي وغرضها حتى لا تشكّ في خصائص العناصر الفرعية مرة أخرى.</p>
<h2 id="الصورة-الكبيرة">الصورة الكبيرة</h2>
<p>قبل الغوص في التفاصيل، إليك النموذج الذهني الذي تحتاجه:</p>
<ul>
<li><strong><code>ReactNode</code></strong>: أي شيء يستطيع React تصييره (الأوسع تسامحًا)</li>
<li><strong><code>ReactElement</code></strong>: ناتج تعبيرات JSX (الخيار الوسط)</li>
<li><strong><code>JSX.Element</code></strong>: تمثيل TypeScript الخاص بتعبيرات JSX (الأضيق)</li>
</ul>
<p>في أغلب الأوقات، ستستخدم <code>ReactNode</code> لخصائص العناصر الفرعية، و<code>ReactElement</code> أو <code>JSX.Element</code> لأنواع عائدات المكوّنات. لكن دعنا نرِ لماذا.</p>
<h2 id="reactnode-السكين-السويسري">ReactNode: السكين السويسري</h2>
<p><code>ReactNode</code> هو أوسع الأنواع تسامحًا — إذ يمثّل أي شيء يستطيع React تصييره. ويشمل ذلك النصوص والأرقام والعناصر والمصفوفات والأجزاء، وحتى <code>null</code> أو <code>undefined</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactNode</span> =
  <span class="hljs-title class_">ReactElement</span> | <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-title class_">Iterable</span>&lt;<span class="hljs-title class_">ReactNode</span>&gt; | <span class="hljs-title class_">ReactPortal</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
</code></pre>
<p>هذا يجعله مثاليًا لكتابة نوع خصائص <code>children</code>، لأن الآباء غالبًا يحتاجون إلى قبول مجموعة واسعة من المحتويات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: ReactNode accepts anything renderable</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">CardProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// All of these work:</span>
&lt;<span class="hljs-title class_">Card</span>&gt;<span class="hljs-title class_">Hello</span> world&lt;/<span class="hljs-title class_">Card</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{42}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{[<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>]}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{null}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
</code></pre>
<p>قارن هذا بالبدائل الأكثر تقييدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too restrictive: only accepts JSX elements</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactElement</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">CardProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Type errors!</span>
&lt;<span class="hljs-title class_">Card</span>&gt;<span class="hljs-title class_">Hello</span> world&lt;<span class="hljs-regexp">/Card&gt; /</span>/ ❌ <span class="hljs-built_in">string</span> not assignable to <span class="hljs-title class_">ReactElement</span>
&lt;<span class="hljs-title class_">Card</span>&gt;{<span class="hljs-number">42</span>}&lt;<span class="hljs-regexp">/Card&gt;         /</span>/ ❌ <span class="hljs-built_in">number</span> not assignable to <span class="hljs-title class_">ReactElement</span>
&lt;<span class="hljs-title class_">Card</span>&gt;{<span class="hljs-literal">null</span>}&lt;<span class="hljs-regexp">/Card&gt;       /</span>/ ❌ <span class="hljs-literal">null</span> not assignable to <span class="hljs-title class_">ReactElement</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عند الشك في خصائص العناصر الفرعية، استخدم <code>ReactNode</code>. فهو يمنح مستهلكي المكوّن أقصى قدر من المرونة مع ضمان أمان الأنواع في الوقت نفسه.</p>
</blockquote>
<h2 id="أنماط-العناصر-الفرعية-في-العالم-الحقيقي">أنماط العناصر الفرعية في العالم الحقيقي</h2>
<p>الآن بعد أن فهمت <code>ReactNode</code>، دعنا نطّلع على أكثر أنماط العناصر الفرعية شيوعًا التي ستصادفها، وكيف تُكتَب أنواعها بشكل صحيح.</p>
<h3 id="الحاوية-الأساسية">الحاوية الأساسية</h3>
<p>تحتاج معظم مكوّنات التفاف إلى قبول أي محتوى قابل للتصيير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ children, className }: <span class="hljs-title class_">CardProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">card</span> \${<span class="hljs-attr">className</span> || &#x27;&#x27;}\`}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// All of these just work:</span>
&lt;<span class="hljs-title class_">Card</span>&gt;<span class="hljs-title class_">Simple</span> text&lt;/<span class="hljs-title class_">Card</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{user ? <span class="hljs-tag">&lt;<span class="hljs-name">Profile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span> : &#x27;Please log in&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{items.map(item =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>)}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>
</code></pre>
<h3 id="العناصر-الفرعية-الاختيارية">العناصر الفرعية الاختيارية</h3>
<p>أحيانًا تكون العناصر الفرعية اختيارية، وتريد عندها تصيير عناصر التفاف شرطيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SectionProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// Optional children</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Section</span>(<span class="hljs-params">{ title, children }: <span class="hljs-title class_">SectionProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      {children &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Both of these work:</span>
&lt;<span class="hljs-title class_">Section</span> title=<span class="hljs-string">&quot;Empty section&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Section</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;With content&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some content here<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Section</span>&gt;</span></span>
</code></pre>
<h3 id="خانات-متعددة-للعناصر-الفرعية">خانات متعدّدة للعناصر الفرعية</h3>
<p>تستخدم أنماط React الحديثة غالبًا «خانات» متعدّدة لأنواع مختلفة من المحتوى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">LayoutProps</span> {
  <span class="hljs-attr">header</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">sidebar</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">footer</span>?: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Layout</span>(<span class="hljs-params">{ header, sidebar, children, footer }: <span class="hljs-title class_">LayoutProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;layout&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{header}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>{sidebar}<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      {footer &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>{footer}<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage allows maximum flexibility:</span>
&lt;<span class="hljs-title class_">Layout</span>
  header={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>}
  sidebar=<span class="hljs-string">&quot;Simple text sidebar&quot;</span>
  footer={<span class="hljs-literal">null</span>} <span class="hljs-comment">// Explicitly no footer</span>
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Article</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Layout</span>&gt;;
</code></pre>
<h3 id="دوال-التصيير-مع-العناصر-الفرعية">دوال التصيير مع العناصر الفرعية</h3>
<p>حين تبني مكوّنات تستخدم دوال التصيير (render props)، تُبقي <code>ReactNode</code> الأمور مرنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataFetcherProps</span> {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataFetcher</span>(<span class="hljs-params">{ url, children }: <span class="hljs-title class_">DataFetcherProps</span></span>) {
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(url)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-title function_">setData</span>(data);
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      });
  }, [url]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children(data, loading)}<span class="hljs-tag">&lt;/&gt;</span></span>;
}

<span class="hljs-comment">// The render function can return anything renderable:</span>
&lt;<span class="hljs-title class_">DataFetcher</span> url=<span class="hljs-string">&quot;/api/users&quot;</span>&gt;
  {<span class="hljs-function">(<span class="hljs-params">users, loading</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Loading...&#x27;</span>;
    <span class="hljs-keyword">if</span> (!users) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>);
  }}
&lt;/<span class="hljs-title class_">DataFetcher</span>&gt;;
</code></pre>
<h3 id="التصيير-الشرطي-للعناصر-الفرعية">التصيير الشرطي للعناصر الفرعية</h3>
<p>من أكثر الأنماط شيوعًا هو تصيير العناصر الفرعية شرطًا استنادًا إلى الحالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CollapsibleProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Collapsible</span>(<span class="hljs-params">{ title, children, defaultOpen = <span class="hljs-literal">false</span> }: <span class="hljs-title class_">CollapsibleProps</span></span>) {
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(defaultOpen);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;collapsible&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsOpen(!isOpen)}&gt;
        {title} {isOpen ? &#x27;▼&#x27; : &#x27;▶&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {isOpen &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;collapsible-content&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Works with any content that might be conditionally hidden:</span>
&lt;<span class="hljs-title class_">Collapsible</span> title=<span class="hljs-string">&quot;Advanced Options&quot;</span>&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Advanced setting&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">Collapsible</span>&gt;;
</code></pre>
<h2 id="التعامل-مع-العناصر-الفرعية-دوال-مساعدة-من-react">التعامل مع العناصر الفرعية: دوال مساعدة من React</h2>
<p>حين تحتاج إلى معالجة العناصر الفرعية أو فحصها، يوفّر React عدة دوال مساعدة. إليك كيفية استخدامها مع كتابة أنواع TypeScript صحيحة:</p>
<h3 id="reactchildrenmap">React.Children.map</h3>
<p>حين تحتاج إلى تحويل كل عنصر فرعي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span>, cloneElement, isValidElement } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WrapperProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AddClassToChildren</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">WrapperProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {React.Children.map(children, (child, index) =&gt; {
        // Type guard to ensure we have a valid React element
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: \`\${child.props.className || &#x27;&#x27;} wrapped-\${index}\`.trim(),
          });
        }
        // Return non-element children (strings, numbers) unchanged
        return child;
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="reactchildrencount">React.Children.count</h3>
<p>يعدّ العناصر الفرعية القابلة للتصيير (يتجاهل <code>null</code> و<code>undefined</code> والقيم المنطقية):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">showCount</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">List</span>(<span class="hljs-params">{ children, showCount }: <span class="hljs-title class_">ListProps</span></span>) {
  <span class="hljs-keyword">const</span> count = <span class="hljs-title class_">React</span>.<span class="hljs-property">Children</span>.<span class="hljs-title function_">count</span>(children);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {showCount &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;count&quot;</span>&gt;</span>Total items: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>}
      {React.Children.map(children, (child, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{child}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="reactchildrenonly">React.Children.only</h3>
<p>حين تحتاج إلى عنصر فرعي واحد بالضبط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SingleChildProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SingleChildWrapper</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">SingleChildProps</span></span>) {
  <span class="hljs-comment">// This will throw if children is not exactly one element</span>
  <span class="hljs-keyword">const</span> singleChild = <span class="hljs-title class_">React</span>.<span class="hljs-property">Children</span>.<span class="hljs-title function_">only</span>(children);

  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isValidElement</span>(singleChild)) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">cloneElement</span>(singleChild, {
      <span class="hljs-attr">className</span>: <span class="hljs-string">\`<span class="hljs-subst">\${singleChild.props.className || <span class="hljs-string">&#x27;&#x27;</span>}</span> enhanced\`</span>.<span class="hljs-title function_">trim</span>()
    });
  }

  <span class="hljs-keyword">return</span> singleChild;
}

<span class="hljs-comment">// ✅ Works:</span>
&lt;<span class="hljs-title class_">SingleChildWrapper</span>&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">SingleChildWrapper</span>&gt;

<span class="hljs-comment">// ❌ Throws error (multiple children):</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SingleChildWrapper</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">SingleChildWrapper</span>&gt;</span></span>
</code></pre>
<h3 id="حراس-الأنواع-للعناصر-الفرعية">حرّاس الأنواع للعناصر الفرعية</h3>
<p>أحيانًا تحتاج إلى التمييز بين أنواع مختلفة من العناصر الفرعية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isReactElement</span>(<span class="hljs-params"><span class="hljs-attr">child</span>: <span class="hljs-title class_">ReactNode</span></span>): child is <span class="hljs-title class_">ReactElement</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">isValidElement</span>(child);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">isStringChild</span>(<span class="hljs-params"><span class="hljs-attr">child</span>: <span class="hljs-title class_">ReactNode</span></span>): child is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> child === <span class="hljs-string">&#x27;string&#x27;</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SmartListProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SmartList</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">SmartListProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {React.Children.map(children, (child, index) =&gt; {
        if (isStringChild(child)) {
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-item&quot;</span>&gt;</span>
              {child}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          );
        }

        if (isReactElement(child)) {
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;element-item&quot;</span>&gt;</span>
              {child}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          );
        }

        // Handle other types (numbers, etc.)
        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;other-item&quot;</span>&gt;</span>
            {String(child)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>كن حذرًا مع <code>React.Children.only</code> — فهو يرمي خطأً إن لم يكن لديك عنصر فرعي واحد بالضبط. استخدمه دائمًا حين تحتاج إلى هذا القيد تحديدًا، لا كمعالج عام للعناصر الفرعية.</p>
</blockquote>
<h2 id="reactelement-ناتج-jsx">ReactElement: ناتج JSX</h2>
<p>يمثّل <code>ReactElement</code> الكائنات التي تنشئها تعبيرات JSX — أي عقد DOM الافتراضية التي يستخدمها React داخليًا. وهو أكثر تحديدًا من <code>ReactNode</code> وأكثر مرونة من <code>JSX.Element</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ReactElement</span>&lt;
  P = <span class="hljs-built_in">any</span>,
  T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> | <span class="hljs-title class_">JSXElementConstructor</span>&lt;<span class="hljs-built_in">any</span>&gt; = <span class="hljs-built_in">string</span> | <span class="hljs-title class_">JSXElementConstructor</span>&lt;<span class="hljs-built_in">any</span>&gt;,
&gt; {
  <span class="hljs-attr">type</span>: T;
  <span class="hljs-attr">props</span>: P;
  <span class="hljs-attr">key</span>: <span class="hljs-title class_">Key</span> | <span class="hljs-literal">null</span>;
}
</code></pre>
<p>ستستخدم <code>ReactElement</code> عادةً حين تحتاج إلى التأكد من أنك تحصل على عنصر حقيقي (وليس نصًا أو رقمًا)، مع رغبتك في قبول أي نوع من العناصر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IconButtonProps</span> {
  <span class="hljs-attr">icon</span>: <span class="hljs-title class_">ReactElement</span>;
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">IconButton</span>(<span class="hljs-params">{ icon, label }: <span class="hljs-title class_">IconButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>
      {icon}
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Works with any JSX element</span>
&lt;<span class="hljs-title class_">IconButton</span> icon={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">HomeIcon</span> /&gt;</span></span>} label=<span class="hljs-string">&quot;Home&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>📁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>} label=&quot;Folder&quot; /&gt;</span>

<span class="hljs-comment">// ❌ Doesn&#x27;t work with strings or numbers</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;🏠&quot;</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Home&quot;</span> /&gt;</span></span> <span class="hljs-comment">// Type error</span>
</code></pre>
<p>وهذا مفيد بشكل خاص مع خانات المكوّنات أو حين تحتاج إلى نسخ العناصر أو معالجتها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">trigger</span>: <span class="hljs-title class_">ReactElement</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ trigger, children }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-comment">// We can clone the trigger and add props because it&#x27;s a ReactElement</span>
  <span class="hljs-keyword">const</span> triggerWithClick = <span class="hljs-title function_">cloneElement</span>(trigger, {
    <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setIsOpen</span>(<span class="hljs-literal">true</span>),
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {triggerWithClick}
      {isOpen &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal&quot;</span>&gt;</span>
          {children}
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsOpen(false)}&gt;Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage:</span>
&lt;<span class="hljs-title class_">Modal</span> trigger={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Open Modal<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Modal content here<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">Modal</span>&gt;;
</code></pre>
<h2 id="reactelement-مقابل-jsxelement-مقابل-reactnode-الصورة-الكاملة">ReactElement مقابل JSX.Element مقابل ReactNode: الصورة الكاملة</h2>
<p>الآن بعد أن فهمت الأساسيات، دعنا نتعمّق في متى ولماذا تختار كل نوع. هذه الأنواع الثلاثة تشكّل تسلسلًا هرميًا، ومعرفة فروقها الدقيقة ستجعلك مستخدمًا متقدمًا لـ TypeScript مع React.</p>
<h3 id="jsxelement-موقف-typescript">JSX.Element: موقف TypeScript</h3>
<p><code>JSX.Element</code> هو نوع TypeScript الخاص بتعبيرات JSX. وهو في الأساس اسم بديل (alias) لـ <code>ReactElement&lt;any, any&gt;</code>، لكنه ما يستنتجه TypeScript حين تكتب JSX:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers JSX.Element for these expressions:</span>
<span class="hljs-keyword">const</span> element1 = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>; <span class="hljs-comment">// JSX.Element</span>
<span class="hljs-keyword">const</span> element2 = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>; <span class="hljs-comment">// JSX.Element</span>
</code></pre>
<p>الفكرة المفتاحية: <code>JSX.Element</code> هو تمثيل TypeScript، بينما <code>ReactElement</code> هو تمثيل React. الاثنان متطابقان تقريبًا، لكن <code>JSX.Element</code> له قيد جوهري:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// JSX.Element is always ReactElement&lt;any, any&gt;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">JSXElement</span> = <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;;

<span class="hljs-comment">// This means JSX.Element loses generic type information:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createTypedElement</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">ReactElement</span>&lt;{ <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span> }&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>; <span class="hljs-comment">// Preserves prop types</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createJSXElement</span>(<span class="hljs-params"></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>; <span class="hljs-comment">// Props become &#x27;any&#x27;</span>
}
</code></pre>
<h3 id="reactelement-الحل-الوسط">ReactElement: الحل الوسط</h3>
<p>يمثّل <code>ReactElement</code> الكائنات التي تنشئها تعبيرات JSX — أي عقد DOM الافتراضية التي يستخدمها React داخليًا. وهو أكثر تحديدًا من <code>ReactNode</code> وأكثر مرونة من <code>JSX.Element</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ReactElement</span>&lt;
  P = <span class="hljs-built_in">any</span>,
  T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> | <span class="hljs-title class_">JSXElementConstructor</span>&lt;<span class="hljs-built_in">any</span>&gt; = <span class="hljs-built_in">string</span> | <span class="hljs-title class_">JSXElementConstructor</span>&lt;<span class="hljs-built_in">any</span>&gt;,
&gt; {
  <span class="hljs-attr">type</span>: T;
  <span class="hljs-attr">props</span>: P;
  <span class="hljs-attr">key</span>: <span class="hljs-title class_">Key</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// ReactElement can preserve type information</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">typedElement</span>: <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt; = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>;

<span class="hljs-comment">// You can extract props from a ReactElement</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ExtractedProps</span> = <span class="hljs-keyword">typeof</span> typedElement.<span class="hljs-property">props</span>; <span class="hljs-comment">// ButtonProps</span>
</code></pre>
<h3 id="التسلسل-الهرمي-للأنواع">التسلسل الهرمي للأنواع</h3>
<p>إليك العلاقة الجوهرية التي ينبغي فهمها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ReactNode is the superset of everything React can render</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactNode</span> =
  | <span class="hljs-title class_">ReactElement</span> <span class="hljs-comment">// ← This includes JSX.Element</span>
  | <span class="hljs-built_in">string</span>
  | <span class="hljs-built_in">number</span>
  | <span class="hljs-title class_">Iterable</span>&lt;<span class="hljs-title class_">ReactNode</span>&gt;
  | <span class="hljs-title class_">ReactPortal</span>
  | <span class="hljs-built_in">boolean</span>
  | <span class="hljs-literal">null</span>
  | <span class="hljs-literal">undefined</span>;

<span class="hljs-comment">// JSX.Element is a specific ReactElement</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">JSXElement</span> = <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;;

<span class="hljs-comment">// The hierarchy:</span>
<span class="hljs-comment">// ReactNode &gt; ReactElement &gt; JSX.Element</span>
</code></pre>
<h3 id="متى-تستخدم-كل-نوع-شجرة-قرار">متى تستخدم كل نوع: شجرة قرار</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Question 1: Are you typing children props?</span>
<span class="hljs-comment">// → Use ReactNode (99% of cases)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContainerProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// ✅ Maximum flexibility</span>
}

<span class="hljs-comment">// Question 2: Do you need to clone or inspect the element?</span>
<span class="hljs-comment">// → Use ReactElement</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">trigger</span>: <span class="hljs-title class_">ReactElement</span>; <span class="hljs-comment">// ✅ Can clone and add props</span>
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// ✅ Just rendering</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ trigger, children }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-comment">// Can safely clone because trigger is ReactElement</span>
  <span class="hljs-keyword">const</span> enhancedTrigger = <span class="hljs-title function_">cloneElement</span>(trigger, {
    <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setOpen</span>(<span class="hljs-literal">true</span>),
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {enhancedTrigger}
      {children}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-comment">// Question 3: Are you constraining return types?</span>
<span class="hljs-comment">// → Let TypeScript infer or use ReactNode for conditionals</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalComponent</span>(<span class="hljs-params">{ show }: { show: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-title class_">ReactNode</span> {
  <span class="hljs-keyword">if</span> (!show) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// ✅ ReactNode allows null</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Question 4: Do you need specific prop types preserved?</span>
<span class="hljs-comment">// → Use ReactElement with generics</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processElement</span>(<span class="hljs-params"><span class="hljs-attr">element</span>: <span class="hljs-title class_">ReactElement</span>&lt;{ className?: <span class="hljs-built_in">string</span> }&gt;</span>) {
  <span class="hljs-comment">// TypeScript knows element.props has className</span>
  <span class="hljs-keyword">const</span> className = element.<span class="hljs-property">props</span>.<span class="hljs-property">className</span> || <span class="hljs-string">&#x27;default&#x27;</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">cloneElement</span>(element, { <span class="hljs-attr">className</span>: <span class="hljs-string">\`<span class="hljs-subst">\${className}</span> processed\`</span> });
}
</code></pre>
<h3 id="مثال-من-العالم-الحقيقي-خانات-مكونات-آمنة-من-ناحية-الأنواع">مثال من العالم الحقيقي: خانات مكوّنات آمنة من ناحية الأنواع</h3>
<p>إليك نمطًا يوضّح الفروق العملية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">LayoutProps</span> {
  <span class="hljs-comment">// ReactNode: Just render as-is</span>
  <span class="hljs-attr">header</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">footer</span>: <span class="hljs-title class_">ReactNode</span>;

  <span class="hljs-comment">// ReactElement: Need to manipulate</span>
  <span class="hljs-attr">sidebar</span>: <span class="hljs-title class_">ReactElement</span>;

  <span class="hljs-comment">// Specific ReactElement: Type-safe props</span>
  <span class="hljs-attr">navigation</span>: <span class="hljs-title class_">ReactElement</span>&lt;{ <span class="hljs-attr">isActive</span>?: <span class="hljs-built_in">boolean</span> }&gt;;

  <span class="hljs-comment">// Main content</span>
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Layout</span>(<span class="hljs-params">{ header, footer, sidebar, navigation, children }: <span class="hljs-title class_">LayoutProps</span></span>) {
  <span class="hljs-comment">// Can render ReactNode directly</span>
  <span class="hljs-keyword">const</span> headerContent = header; <span class="hljs-comment">// Could be string, element, null, etc.</span>

  <span class="hljs-comment">// Can clone and enhance ReactElement</span>
  <span class="hljs-keyword">const</span> enhancedSidebar = <span class="hljs-title function_">cloneElement</span>(sidebar, {
    <span class="hljs-attr">className</span>: <span class="hljs-string">&#x27;layout-sidebar&#x27;</span>
  });

  <span class="hljs-comment">// Can access specific props on typed ReactElement</span>
  <span class="hljs-keyword">const</span> navWithHighlight = <span class="hljs-title function_">cloneElement</span>(navigation, {
    <span class="hljs-attr">isActive</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">className</span>: navigation.<span class="hljs-property">props</span>.<span class="hljs-property">isActive</span> ? <span class="hljs-string">&#x27;nav-active&#x27;</span> : <span class="hljs-string">&#x27;nav&#x27;</span>
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{headerContent}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>{navWithHighlight}<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>{enhancedSidebar}<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>{footer}<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

## <span class="hljs-title class_">The</span> <span class="hljs-title class_">Building</span> <span class="hljs-title class_">Blocks</span>: <span class="hljs-title class_">ReactChild</span>, <span class="hljs-title class_">ReactFragment</span>, and <span class="hljs-title class_">ReactPortal</span>

<span class="hljs-title class_">While</span> <span class="hljs-string">\`ReactNode\`</span> is the umbrella <span class="hljs-keyword">type</span> <span class="hljs-keyword">for</span> everything <span class="hljs-title class_">React</span> can render, it<span class="hljs-string">&#x27;s actually composed of several more specific types. Understanding these building blocks helps you write more precise types when needed and debug type errors more effectively.

### ReactChild: The Simple Renderable

\`ReactChild\` represents the simplest things React can render—individual primitive values or elements:

\`\`\`tsx
// ReactChild is a union of the basic renderable units
type ReactChild = ReactElement | string | number;

// These are all valid ReactChild values:
const textChild: ReactChild = &quot;Hello World&quot;;
const numberChild: ReactChild = 42;
const elementChild: ReactChild = &lt;div&gt;Content&lt;/div&gt;;

// But these are NOT ReactChild:
const nullChild: ReactChild = null;        // ❌ Not included
const arrayChild: ReactChild = [1, 2, 3];  // ❌ Arrays not included
const boolChild: ReactChild = true;        // ❌ Booleans not included
</span></code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>صار <code>ReactChild</code> مهملًا (deprecated) في أنواع React الأحدث. ينبغي أن تستخدم <code>ReactNode</code> أو أن تكون أكثر تحديدًا باستخدام <code>ReactElement | string | number</code> بدلًا منه.</p>
</blockquote>
<h3 id="reactfragment-المصفوفات-والعناصر-الفرعية-ذات-المفاتيح">ReactFragment: المصفوفات والعناصر الفرعية ذات المفاتيح</h3>
<p>يمثّل <code>ReactFragment</code> قدرة React على تصيير عدة عناصر فرعية دون عنصر التفاف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ReactFragment represents grouped children</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactFragment</span> = <span class="hljs-title class_">Iterable</span>&lt;<span class="hljs-title class_">ReactNode</span>&gt;;

<span class="hljs-comment">// Using fragments in practice</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ItemList</span>(<span class="hljs-params">{ items }: { items: <span class="hljs-built_in">string</span>[] }</span>) {
  <span class="hljs-comment">// Explicit fragment with key</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {items.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">React.Fragment</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">dt</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">dt</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">dd</span>&gt;</span>Description of {item}<span class="hljs-tag">&lt;/<span class="hljs-name">dd</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">React.Fragment</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-comment">// ReactFragment in component props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span> {
  <span class="hljs-comment">// When you specifically need an array of nodes</span>
  <span class="hljs-attr">items</span>: <span class="hljs-title class_">ReactFragment</span>;
  <span class="hljs-comment">// vs ReactNode which could be a single item</span>
  <span class="hljs-attr">header</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">List</span>(<span class="hljs-params">{ items, header }: <span class="hljs-title class_">ListProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{header}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {React.Children.map(items, (item, index) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الفرق الأساسي: <code>ReactFragment</code> مخصّص للمجموعات، بينما <code>ReactNode</code> قد يكون عنصرًا مفردًا أو مجموعة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ReactNode: Single item OR array</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">node1</span>: <span class="hljs-title class_">ReactNode</span> = <span class="hljs-string">&#x27;Single string&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">node2</span>: <span class="hljs-title class_">ReactNode</span> = [<span class="hljs-string">&#x27;Array&#x27;</span>, <span class="hljs-string">&#x27;of&#x27;</span>, <span class="hljs-string">&#x27;strings&#x27;</span>];

<span class="hljs-comment">// ReactFragment: Always represents a collection</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">fragment1</span>: <span class="hljs-title class_">ReactFragment</span> = [<span class="hljs-string">&#x27;Array&#x27;</span>, <span class="hljs-string">&#x27;of&#x27;</span>, <span class="hljs-string">&#x27;items&#x27;</span>];
<span class="hljs-keyword">const</span> <span class="hljs-attr">fragment2</span>: <span class="hljs-title class_">ReactFragment</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// Any iterable works</span>
</code></pre>
<h3 id="reactportal-التصيير-خارج-الشجرة">ReactPortal: التصيير خارج الشجرة</h3>
<p><code>ReactPortal</code> هو النوع الذي تعيده <code>ReactDOM.createPortal</code>، ويتيح لك تصيير العناصر الفرعية داخل شجرة DOM مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createPortal } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ReactPortal</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ children, isOpen }: <span class="hljs-title class_">ModalProps</span></span>): <span class="hljs-title class_">ReactPortal</span> | <span class="hljs-literal">null</span> {
  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-comment">// createPortal returns a ReactPortal</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">createPortal</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-backdrop&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-content&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;modal-root&#x27;</span>)!,
  );
}

<span class="hljs-comment">// When you need to type portal-specific behavior</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PortalManager</span>(<span class="hljs-params">{ portals }: { portals: ReactPortal[] }</span>) {
  <span class="hljs-comment">// ReactPortal has specific properties</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {portals.map((portal) =&gt; {
        // Each portal has key, children, containerInfo
        console.log(&#x27;Portal container:&#x27;, portal.containerInfo);
        return portal;
      })}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}
</code></pre>
<h3 id="فهم-نوع-reactnode-الاتحادي-الكامل">فهم نوع ReactNode الاتحادي الكامل</h3>
<p>الآن يمكنك أن ترى كيف يُبنى <code>ReactNode</code> من هذه القطع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// The full ReactNode type decomposed</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactNode</span> =
  | <span class="hljs-title class_">ReactElement</span>     <span class="hljs-comment">// JSX elements</span>
  | <span class="hljs-built_in">string</span>          <span class="hljs-comment">// Text nodes</span>
  | <span class="hljs-built_in">number</span>          <span class="hljs-comment">// Numeric values</span>
  | <span class="hljs-title class_">Iterable</span>&lt;<span class="hljs-title class_">ReactNode</span>&gt;  <span class="hljs-comment">// Arrays and fragments (includes ReactFragment)</span>
  | <span class="hljs-title class_">ReactPortal</span>     <span class="hljs-comment">// Portal nodes</span>
  | <span class="hljs-built_in">boolean</span>         <span class="hljs-comment">// Conditionals (rendered as nothing)</span>
  | <span class="hljs-literal">null</span>            <span class="hljs-comment">// Absence of content</span>
  | <span class="hljs-literal">undefined</span>;      <span class="hljs-comment">// Undefined values</span>

<span class="hljs-comment">// This is why ReactNode is so flexible:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FlexibleComponent</span>(<span class="hljs-params">{ content }: { content: ReactNode }</span>) {
  <span class="hljs-comment">// content could be ANY of the above types</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// All of these work:</span>
&lt;<span class="hljs-title class_">FlexibleComponent</span> content=<span class="hljs-string">&quot;text&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{42}</span> /&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">span</span>&gt;</span>element<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>} /&gt;</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{[1,</span> <span class="hljs-attr">2</span>, <span class="hljs-attr">3</span>]} /&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{createPortal(</span>&lt;<span class="hljs-attr">div</span> /&gt;</span>, document.body)} /&gt;</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{null}</span> /&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlexibleComponent</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{true</span> &amp;&amp; &lt;<span class="hljs-attr">div</span>&gt;</span>Conditional<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>} /&gt;</span>
</code></pre>
<h3 id="متى-تستخدم-هذه-الأنواع-المحددة">متى تستخدم هذه الأنواع المحددة</h3>
<p>بينما ستستخدم <code>ReactNode</code> في 95% من الوقت، فإن معرفة هذه الأنواع المحددة تساعد في سيناريوهات بعينها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// When you&#x27;re building a table and need pairs</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TableRowProps</span> {
  <span class="hljs-comment">// Ensures we get an array, not a single element</span>
  <span class="hljs-attr">cells</span>: <span class="hljs-title class_">ReactFragment</span>;
}

<span class="hljs-comment">// When handling portal-specific logic</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OverlayManagerProps</span> {
  <span class="hljs-comment">// Specifically portal elements</span>
  <span class="hljs-attr">overlays</span>: <span class="hljs-title class_">ReactPortal</span>[];
  <span class="hljs-comment">// Regular children</span>
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-comment">// When you need to exclude certain types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TextOnly</span> = <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">ReactNode</span>, <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TextDisplayProps</span> {
  <span class="hljs-comment">// Only accepts text or numbers, not elements</span>
  <span class="hljs-attr">content</span>: <span class="hljs-title class_">TextOnly</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TextDisplay</span>(<span class="hljs-params">{ content }: <span class="hljs-title class_">TextDisplayProps</span></span>) {
  <span class="hljs-comment">// TypeScript knows content is string | number</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-only&quot;</span>&gt;</span>{String(content)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عمليًا، التزم بـ <code>ReactNode</code> ما لم يكن لديك سبب محدد لتكون أكثر تقييدًا. فهذه الأنواع المحددة مفيدة أساسًا لمؤلفي المكتبات أو حين تبني مكوّنات شديدة التخصص.</p>
</blockquote>
<h2 id="إرشادات-من-العالم-الحقيقي">إرشادات من العالم الحقيقي</h2>
<p>إليك كيفية الاختيار بين هذه الأنواع في السيناريوهات الشائعة:</p>
<h3 id="خصائص-العناصر-الفرعية-reactnode-في-أغلب-الحالات">خصائص العناصر الفرعية: ReactNode في أغلب الحالات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Flexible children prop</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-comment">// ❌ Too restrictive for most use cases</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactElement</span>;
}
</code></pre>
<h3 id="دوال-التصيير-reactnode-عادة">دوال التصيير: ReactNode عادةً</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">renderHeader</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// ✅ Flexible</span>
  <span class="hljs-attr">renderFooter</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>; <span class="hljs-comment">// ❌ Too restrictive</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Layout</span>(<span class="hljs-params">{ renderHeader, renderFooter }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{renderHeader()}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>{renderFooter()}<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// With ReactNode, both of these work:</span>
&lt;<span class="hljs-title class_">Layout</span>
  renderHeader={<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;Simple string header&#x27;</span>}
  renderFooter={<span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Complex footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>}
/&gt;;
</code></pre>
<h3 id="خصائص-العناصر-reactelement-حين-تحتاج-إلى-المعالجة">خصائص العناصر: ReactElement حين تحتاج إلى المعالجة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-comment">// Use ReactElement when you need to clone or inspect the element</span>
  <span class="hljs-attr">trigger</span>: <span class="hljs-title class_">ReactElement</span>;
  <span class="hljs-comment">// Use ReactNode when you just need to render it</span>
  <span class="hljs-attr">icon</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dropdown</span>(<span class="hljs-params">{ trigger, icon }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Can clone trigger because it&#x27;s guaranteed to be an element</span>
  <span class="hljs-keyword">const</span> enhancedTrigger = <span class="hljs-title function_">cloneElement</span>(trigger, {
    <span class="hljs-string">&#x27;aria-expanded&#x27;</span>: isOpen,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {icon} {/* Just render the icon */}
      {enhancedTrigger}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="أنواع-عائدات-المكونات-دع-typescript-يستنتج">أنواع عائدات المكوّنات: دع TypeScript يستنتج</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Let TypeScript infer JSX.Element</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// ⚠️ Explicit typing usually unnecessary</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Explicit typing when returning conditional content</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalButton</span>(<span class="hljs-params">{ show }: { show: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-title class_">ReactNode</span> {
  <span class="hljs-keyword">if</span> (!show) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h2 id="الأخطاء-الشائعة-والحلول">الأخطاء الشائعة والحلول</h2>
<h3 id="الخطأ-1-استخدام-reactelement-للعناصر-الفرعية">الخطأ 1: استخدام ReactElement للعناصر الفرعية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This breaks with strings, numbers, arrays</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactElement</span>;
}

<span class="hljs-comment">// ✅ Use ReactNode instead</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}
</code></pre>
<h3 id="الخطأ-2-نسيان-التصيير-الشرطي">الخطأ 2: نسيان التصيير الشرطي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This can return null, but JSX.Element doesn&#x27;t allow it</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalComponent</span>(<span class="hljs-params">{ show }: { show: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> {
  <span class="hljs-keyword">if</span> (!show) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// Type error!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Visible<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Use ReactNode for conditional rendering</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalComponent</span>(<span class="hljs-params">{ show }: { show: <span class="hljs-built_in">boolean</span> }</span>): <span class="hljs-title class_">ReactNode</span> {
  <span class="hljs-keyword">if</span> (!show) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Visible<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="الخطأ-3-تقييد-دوال-التصيير-أكثر-من-اللازم">الخطأ 3: تقييد دوال التصيير أكثر من اللازم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too restrictive—breaks with conditional rendering</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">Item</span></span>) =&gt;</span> <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;
}

<span class="hljs-comment">// ✅ More flexible</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">Item</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
}
</code></pre>
<h2 id="شجرة-قرار-لكتابة-أنواع-العناصر-الفرعية">شجرة قرار لكتابة أنواع العناصر الفرعية</h2>
<p>إليك دليلك المعتمد لكتابة أنواع العناصر الفرعية والخصائص المرتبطة بها:</p>
<p><strong>لخصائص العناصر الفرعية (95% من الحالات):</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Almost always correct</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}
</code></pre>
<p><strong>حين تكون العناصر الفرعية اختيارية:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use optional ReactNode</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span>;
}
</code></pre>
<p><strong>حين تحتاج إلى معالجة العناصر الفرعية:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use ReactNode, then type-guard with isValidElement</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">Children</span>.<span class="hljs-title function_">map</span>(children, <span class="hljs-function">(<span class="hljs-params">child</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isValidElement</span>(child)) {
      <span class="hljs-comment">// Now you can safely use cloneElement, etc.</span>
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">cloneElement</span>(child, {<span class="hljs-comment">/* additional props */</span>});
    }
    <span class="hljs-keyword">return</span> child;
  });
}
</code></pre>
<p><strong>لدوال خاصية التصيير:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Return ReactNode for maximum flexibility</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Data</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
}
</code></pre>
<p><strong>لخصائص العناصر تحديدًا (نادرة):</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Only when you specifically need an element</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">trigger</span>: <span class="hljs-title class_">ReactElement</span>; <span class="hljs-comment">// Will be cloned/enhanced</span>
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// Will be rendered as-is</span>
}
</code></pre>
<h2 id="الخلاصة-النهائية">الخلاصة النهائية</h2>
<p>حين تكتب أنواع العناصر الفرعية، فكّر بهذا الترتيب:</p>
<ol>
<li><strong>ابدأ بـ <code>ReactNode</code></strong> — فهو يتعامل مع 95% من حالات الاستخدام بشكل صحيح</li>
<li><strong>فكّر في <code>ReactElement</code></strong> فقط حين تحتاج إلى معالجة العنصر (نسخه، فحص خصائصه، إلخ)</li>
<li><strong>تجنّب <code>JSX.Element</code></strong> للعناصر الفرعية — فهو مقيّد أكثر من اللازم ولا يقدّم أي إضافة</li>
</ol>
<p>بُني نظام React على المرونة والتركيب. وينبغي أن تعكس كتابتك لأنواعك هذه الفلسفة. حين تستخدم <code>ReactNode</code> للعناصر الفرعية، فأنت تتيح للمستهلكين تمرير نصوص أو عناصر أو مصفوفات أو محتوى شرطي أو حتى <code>null</code> — وهو بالضبط ما صُمم React للتعامل معه.</p>
<p>لا تبالغ في التفكير: إن كان الاسم <code>children</code> ويقع بين وسمَي JSX، فاكتب نوعه <code>ReactNode</code>. وسيشكرَك مستقبلك (ومستخدمو مكوّنك) على هذه المرونة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
