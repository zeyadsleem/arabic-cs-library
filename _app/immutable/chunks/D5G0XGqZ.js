const s="kinney",a="react-typescript",n="React مع TypeScript",l="tailwind-cva-typed-variants",p="متغيّرات Tailwind المكتوبة (Typed) باستخدام CVA",t=[{depth:2,id:"النمط-الأساسي",text:"النمط الأساسي"},{depth:2,id:"slots-والتعدد-polymorphism",text:"Slots والتعدّد (Polymorphism)"},{depth:2,id:"المتغيرات-المركبة-compound-variants-والصرامة",text:"المتغيّرات المركّبة (Compound Variants) والصرامة"},{depth:2,id:"نمط-slots-للأصناف",text:"نمط Slots للأصناف"}],c=`<p>اقترن Tailwind بـ <code>class-variance-authority</code> (CVA) لإنشاء واجهات متغيّرات (variants) قابلة للاكتشاف وآمنة الأنواع — لا مزيد من «حساء» الأصناف stringly-typed.</p>
<h2 id="النمط-الأساسي">النمط الأساسي</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { cva, <span class="hljs-keyword">type</span> <span class="hljs-title class_">VariantProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-variance-authority&#x27;</span>;

<span class="hljs-keyword">const</span> button = <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;inline-flex items-center justify-center rounded-md font-medium&#x27;</span>, {
  <span class="hljs-attr">variants</span>: {
    <span class="hljs-attr">variant</span>: { <span class="hljs-attr">primary</span>: <span class="hljs-string">&#x27;bg-blue-600 text-white&#x27;</span>, <span class="hljs-attr">ghost</span>: <span class="hljs-string">&#x27;hover:bg-gray-100&#x27;</span> },
    <span class="hljs-attr">size</span>: { <span class="hljs-attr">sm</span>: <span class="hljs-string">&#x27;h-8 px-3&#x27;</span>, <span class="hljs-attr">md</span>: <span class="hljs-string">&#x27;h-10 px-4&#x27;</span> },
  },
  <span class="hljs-attr">compoundVariants</span>: [{ <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;md&#x27;</span>, <span class="hljs-attr">class</span>: <span class="hljs-string">&#x27;shadow&#x27;</span> }],
  <span class="hljs-attr">defaultVariants</span>: { <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;md&#x27;</span> },
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonVariants</span> = <span class="hljs-title class_">VariantProps</span>&lt;<span class="hljs-keyword">typeof</span> button&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{
  variant,
  size,
  className,
  ...rest
}: <span class="hljs-title class_">ButtonVariants</span> &amp; <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ButtonHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{button({</span> <span class="hljs-attr">variant</span>, <span class="hljs-attr">size</span>, <span class="hljs-attr">className</span> })} {<span class="hljs-attr">...rest</span>} /&gt;</span></span>;
}
</code></pre>
<h2 id="slots-والتعدد-polymorphism">Slots والتعدّد (Polymorphism)</h2>
<p>استخدم CVA لكل slot وprop <code>as</code> متعدّد الأشكال (polymorphic) مع generics مقيدة للحفاظ على refs والخصائص مكتوبة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">ComponentPropsWithRef</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">const</span> card = <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;rounded-lg border bg-white&#x27;</span>, {
  <span class="hljs-attr">variants</span>: { <span class="hljs-attr">elevated</span>: { <span class="hljs-attr">true</span>: <span class="hljs-string">&#x27;shadow-md&#x27;</span>, <span class="hljs-attr">false</span>: <span class="hljs-string">&#x27;&#x27;</span> } },
  <span class="hljs-attr">defaultVariants</span>: { <span class="hljs-attr">elevated</span>: <span class="hljs-literal">true</span> },
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CardVariants</span> = <span class="hljs-title class_">VariantProps</span>&lt;<span class="hljs-keyword">typeof</span> card&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PolymorphicProps</span>&lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span>, P&gt; = P &amp; {
  <span class="hljs-attr">as</span>?: C;
} &amp; <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ComponentPropsWithRef</span>&lt;C&gt;, keyof P | <span class="hljs-string">&#x27;as&#x27;</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Card</span> = <span class="hljs-title function_">forwardRef</span>(
  &lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span> = <span class="hljs-string">&#x27;div&#x27;</span>&gt;<span class="hljs-function">(<span class="hljs-params">
    { <span class="hljs-keyword">as</span>, elevated, className, ...rest }: <span class="hljs-title class_">PolymorphicProps</span>&lt;C, <span class="hljs-title class_">CardVariants</span>&gt;,
    <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">Ref</span>&lt;<span class="hljs-title class_">Element</span>&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title class_">Comp</span> = (<span class="hljs-keyword">as</span> ?? <span class="hljs-string">&#x27;div&#x27;</span>) <span class="hljs-keyword">as</span> C;
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Comp</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref</span> <span class="hljs-attr">as</span> <span class="hljs-attr">any</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">{card({</span> <span class="hljs-attr">elevated</span>, <span class="hljs-attr">className</span> })} {<span class="hljs-attr">...rest</span>} /&gt;</span></span>;
  },
);
</code></pre>
<h2 id="المتغيرات-المركبة-compound-variants-والصرامة">المتغيّرات المركّبة (Compound Variants) والصرامة</h2>
<p>عرّف حالات متبادلة الاستبعاد أو مجمّعة مع أمان at compile-time.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> badge = <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;inline-flex items-center rounded px-2 py-0.5 text-xs&#x27;</span>, {
  <span class="hljs-attr">variants</span>: {
    <span class="hljs-attr">color</span>: { <span class="hljs-attr">gray</span>: <span class="hljs-string">&#x27;bg-gray-100 text-gray-800&#x27;</span>, <span class="hljs-attr">red</span>: <span class="hljs-string">&#x27;bg-red-100 text-red-800&#x27;</span> },
    <span class="hljs-attr">tone</span>: { <span class="hljs-attr">solid</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">outline</span>: <span class="hljs-string">&#x27;bg-transparent ring-1&#x27;</span> },
  },
  <span class="hljs-attr">compoundVariants</span>: [{ <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-attr">tone</span>: <span class="hljs-string">&#x27;outline&#x27;</span>, <span class="hljs-attr">class</span>: <span class="hljs-string">&#x27;ring-red-300&#x27;</span> }],
  <span class="hljs-attr">defaultVariants</span>: { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;gray&#x27;</span>, <span class="hljs-attr">tone</span>: <span class="hljs-string">&#x27;solid&#x27;</span> },
});
</code></pre>
<h2 id="نمط-slots-للأصناف">نمط Slots للأصناف</h2>
<p>استخدم record من CVAs لمكوّنات متعدّدة الأجزاء (مثل <code>input</code>، <code>label</code>، <code>helper</code>).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> inputSlots = {
  <span class="hljs-attr">root</span>: <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;grid gap-1&#x27;</span>),
  <span class="hljs-attr">label</span>: <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;text-sm font-medium&#x27;</span>),
  <span class="hljs-attr">input</span>: <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;rounded border px-3 py-2 focus:outline-none focus:ring&#x27;</span>),
  <span class="hljs-attr">helper</span>: <span class="hljs-title function_">cva</span>(<span class="hljs-string">&#x27;text-xs text-gray-500&#x27;</span>),
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">InputProps</span> = {
  <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">helper</span>?: <span class="hljs-built_in">string</span>;
} &amp; <span class="hljs-title class_">React</span>.<span class="hljs-property">InputHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ label, helper, className, ...rest }: <span class="hljs-title class_">InputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{inputSlots.root()}</span>&gt;</span>
      {label &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{inputSlots.label()}</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{inputSlots.input({</span> <span class="hljs-attr">className</span> })} {<span class="hljs-attr">...rest</span>} /&gt;</span>
      {helper &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{inputSlots.helper()}</span>&gt;</span>{helper}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
