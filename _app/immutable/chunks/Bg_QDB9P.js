const s="kinney",a="react-typescript",n="React مع TypeScript",l="styling-csstype-and-css-modules",p="التنسيق (Styling) باستخدام Csstype ووحدات CSS (CSS Modules)",t=[{depth:2,id:"التحدي-في-التنسيق-وtypescript",text:"التحدي في التنسيق وTypeScript"},{depth:2,id:"دخول-csstype-الأساس",text:"دخول csstype: الأساس"},{depth:3,id:"الاستخدام-الأساسي-لـ-csstype",text:"الاستخدام الأساسي لـ csstype"},{depth:2,id:"كتابة-anماط-inline-inline-styles-بشكل-صحيح",text:"كتابة Anماط Inline (Inline Styles) بشكل صحيح"},{depth:3,id:"إنشاء-أنواع-نمط-style-types-مخصصة",text:"إنشاء أنواع نمط (Style Types) مخصّصة"}],c=`<p>التنسيق في React مع TypeScript لا يجب أن يشعر وكأنه معركة مستمرة مع مدقق الأنواع. سواء كنت تستخدم أنماط inline، أو وحدات CSS (CSS Modules)، أو تبني نظام تصميم (design system)، يمكن لـ TypeScript أن يجعل تنسيقك أكثر متانة وودية للمطوّر. لنتعرّف على كيفية كتابة أنماطك بشكل آمن الأنواع باستخدام <code>csstype</code>، ووحدات CSS، وأنماط inline styles التي تتوسّع.</p>
<h2 id="التحدي-في-التنسيق-وtypescript">التحدي في التنسيق وTypeScript</h2>
<p>عند تنسيق مكوّنات React، 종종 تجد نفسك في أحد هذه المواقف:</p>
<ul>
<li>كتابة أنماط inline والتساؤل أي الخصائص فعليًا صالحة</li>
<li>استخدام وحدات CSS وفقدان سلامة الأنواع بين CSS وTypeScript</li>
<li>بناء مكوّنات نظام تصميم حيث خصائص النمط (style props) بحاجة إلى كتابة صارمة</li>
<li>الإحباط من escapes <code>any</code> فقط لإرضاء مدقق الأنواع</li>
</ul>
<p>الخبر السار؟ تطوّر نظام TypeScript أدوات متطوّرة للتعامل مع كل هذه السيناريوهات بسلاسة.</p>
<h2 id="دخول-csstype-الأساس">دخول csstype: الأساس</h2>
<p>حزمة <a href="https://www.npmjs.com/package/csstype"><code>csstype</code></a> توفّر تعريفات TypeScript شاملة لجميع خصائص وقيم CSS. هي ما بُني عليه نوع <code>CSSProperties</code> المدمج في React، وفهمها يفتح أنماط تنسيق أفضل.</p>
<pre><code class="language-bash">npm install csstype
</code></pre>
<h3 id="الاستخدام-الأساسي-لـ-csstype">الاستخدام الأساسي لـ <code>csstype</code> <span class="content-anchor" id="basic-usage"></span></h3>
<p>في أبسط صوره، يمنحك <code>csstype</code> أنواعًا دقيقة لخصائص CSS:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Property</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;csstype&#x27;</span>;

<span class="hljs-comment">// ✅ Specific property types</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">borderRadius</span>: <span class="hljs-title class_">Property</span>.<span class="hljs-property">BorderRadius</span> = <span class="hljs-string">&#x27;8px&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">display</span>: <span class="hljs-title class_">Property</span>.<span class="hljs-property">Display</span> = <span class="hljs-string">&#x27;flex&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">color</span>: <span class="hljs-title class_">Property</span>.<span class="hljs-property">Color</span> = <span class="hljs-string">&#x27;#3b82f6&#x27;</span>;

<span class="hljs-comment">// ❌ TypeScript will catch invalid values</span>
<span class="hljs-comment">// const invalidDisplay: Property.Display = &#x27;invalid&#x27;; // Type error!</span>
</code></pre>
<p>هذا بالفعل أدق من استخدام <code>string</code> في كل مكان، لكن القوة الحقيقية تأتي عند بناء مكوّنات قابلة لإعادة الاستخدام.</p>
<h2 id="كتابة-anماط-inline-inline-styles-بشكل-صحيح">كتابة Anماط Inline (Inline Styles) بشكل صحيح</h2>
<p><code>CSSProperties</code> في React مبني على <code>csstype</code>، لكن يمكنك توسيعه لحالات استخدام أكثر تحديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CSSProperties</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">StyledBoxProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">CSSProperties</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">StyledBox</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">StyledBoxProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ children, style }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">1rem</span>&#x27;,
        <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
        <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">f3f4f6</span>&#x27;,
        <span class="hljs-attr">...style</span>, // <span class="hljs-attr">User</span> <span class="hljs-attr">styles</span> <span class="hljs-attr">override</span> <span class="hljs-attr">defaults</span>
      }}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Usage with full type safety</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StyledBox</span>
  <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
    <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">3b82f6</span>&#x27;, // ✅ <span class="hljs-attr">Valid</span>
    <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">2rem</span>&#x27;,           // ✅ <span class="hljs-attr">Valid</span>
    // <span class="hljs-attr">invalidProp:</span> &#x27;<span class="hljs-attr">value</span>&#x27;    // ❌ <span class="hljs-attr">Type</span> <span class="hljs-attr">error</span>
  }}
&gt;</span>
  Content here
<span class="hljs-tag">&lt;/<span class="hljs-name">StyledBox</span>&gt;</span></span>
</code></pre>
<h3 id="إنشاء-أنواع-نمط-style-types-مخصصة">إنشاء أنواع نمط (Style Types) مخصّصة</h3>
<p>لأنظمة التصميم، 종종 تريد تقييد خصائص معينة بقيم محدّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">CSSProperties</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Property</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;csstype&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DesignSystemColors</span> {
  <span class="hljs-attr">primary</span>: <span class="hljs-string">&#x27;#3b82f6&#x27;</span>;
  <span class="hljs-attr">secondary</span>: <span class="hljs-string">&#x27;#6b7280&#x27;</span>;
  <span class="hljs-attr">success</span>: <span class="hljs-string">&#x27;#10b981&#x27;</span>;
  <span class="hljs-attr">warning</span>: <span class="hljs-string">&#x27;#f59e0b&#x27;</span>;
  <span class="hljs-attr">danger</span>: <span class="hljs-string">&#x27;#ef4444&#x27;</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ThemeSpacing</span> {
  <span class="hljs-attr">xs</span>: <span class="hljs-string">&#x27;0.25rem&#x27;</span>;
  <span class="hljs-attr">sm</span>: <span class="hljs-string">&#x27;0.5rem&#x27;</span>;
  <span class="hljs-attr">md</span>: <span class="hljs-string">&#x27;1rem&#x27;</span>;
  <span class="hljs-attr">lg</span>: <span class="hljs-string">&#x27;1.5rem&#x27;</span>;
  <span class="hljs-attr">xl</span>: <span class="hljs-string">&#x27;2rem&#x27;</span>;
}

<span class="hljs-comment">// Restrict certain CSS properties to design system values</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RestrictedStyleProps</span> {
  <span class="hljs-attr">color</span>?: keyof <span class="hljs-title class_">DesignSystemColors</span>;
  <span class="hljs-attr">backgroundColor</span>?: keyof <span class="hljs-title class_">DesignSystemColors</span>;
  <span class="hljs-attr">padding</span>?: keyof <span class="hljs-title class_">ThemeSpacing</span>;
  <span class="hljs-attr">margin</span>?: keyof <span class="hljs-title class_">ThemeSpacing</span>;
  <span class="hljs-comment">// Allow other CSS properties without restriction</span>
  [K <span class="hljs-keyword">in</span> keyof <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">CSSProperties</span>, <span class="hljs-string">&#x27;color&#x27;</span> | <span class="hljs-string">&#x27;backgroundColor&#x27;</span> | <span class="hljs-string">&#x27;padding&#x27;</span> | <span class="hljs-string">&#x27;margin&#x27;</span>&gt;]?: <span class="hljs-title class_">CSSProperties</span>[K];
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">RestrictedStyleProps</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ children, variant = <span class="hljs-string">&#x27;primary&#x27;</span>, style }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">baseStyles</span>: <span class="hljs-title class_">CSSProperties</span> = {
    <span class="hljs-attr">padding</span>: <span class="hljs-string">&#x27;0.75rem 1.5rem&#x27;</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">&#x27;none&#x27;</span>,
    <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&#x27;0.375rem&#x27;</span>,
    <span class="hljs-attr">cursor</span>: <span class="hljs-string">&#x27;pointer&#x27;</span>,
    <span class="hljs-attr">fontWeight</span>: <span class="hljs-number">600</span>,
  };

  <span class="hljs-keyword">const</span> <span class="hljs-attr">variantStyles</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-title class_">ButtonProps</span>[<span class="hljs-string">&#x27;variant&#x27;</span>]&gt;, <span class="hljs-title class_">CSSProperties</span>&gt; = {
    <span class="hljs-attr">primary</span>: {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;#3b82f6&#x27;</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;white&#x27;</span>,
    },
    <span class="hljs-attr">secondary</span>: {
      <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;#6b7280&#x27;</span>,
      <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;white&#x27;</span>,
    },
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">...baseStyles</span>,
        <span class="hljs-attr">...variantStyles</span>[<span class="hljs-attr">variant</span>],
        <span class="hljs-attr">...style</span>,
      }}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
};
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
