const s="kinney",a="tailwind",n="Tailwind CSS",t="cva-tailwind",l="أداة Class Variance Authority",p=[{depth:2,id:"مثال",text:"مثال"}],e=`<p><a href="https://cva.style/">Class Variance Authority</a> هي أداة محايدة تجاه الأطر لإنشاء تنويعات المكوّن بأصناف مختلفة. إنها بسيطة جدًا، ومن المرجّح أنك <em>تستطيع</em> كتابتها بنفسك إن اضطررت — لكنك لست مضطرًا لذلك لأنها موجودة بالفعل.</p>
<p>تتيح لك CVA أن:</p>
<ol>
<li>تعرّف مجموعة من الأنماط الأساسية للمكوّن.</li>
<li>تعرّف الأنماط الفريدة لكل تنويع.</li>
<li>تتيح لك تعريف تنويعات افتراضية حين لا يُحدَّد أحدها صراحةً.</li>
<li>تتيح لك إنشاء تنويعات مركّبة.</li>
</ol>
<p>تعمل <em>بشكل ممتاز</em> مع Tailwind، لكنك لا تحتاج إلى استخدام Tailwind لاستخدام CVA. يمكنك استخدام أي أصناف مساعدة تريدها، أو حتى مجرد الأصناف من وحدات CSS الخاصة بنا كما فعلنا في وقت سابق.</p>
<blockquote>
<p><strong>استخدام IntelliSense الخاص بـ Tailwind مع Class Variance Authority</strong></p>
<p>إن كنت تستخدم Tailwind وVisual Studio Code وCVA و<a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">امتداد Tailwind CSS IntelliSense</a>، فقد ترغب في إجراء <a href="https://cva.style/docs/getting-started/installation#tailwind-css">هذا</a> التعديل على ملف <code>settings.json</code> في مشروعك.</p>
</blockquote>
<h2 id="مثال">مثال</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;preact&#x27;</span>;
<span class="hljs-keyword">import</span> { cva, <span class="hljs-keyword">type</span> <span class="hljs-title class_">VariantProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-variance-authority&#x27;</span>;
<span class="hljs-keyword">import</span> { twMerge } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwind-merge&#x27;</span>;

<span class="hljs-keyword">const</span> buttonVariants = <span class="hljs-title function_">cva</span>(
  <span class="hljs-comment">// Base classes</span>
  <span class="hljs-string">&#x27;font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2&#x27;</span>,
  {
    <span class="hljs-attr">variants</span>: {
      <span class="hljs-attr">variant</span>: {
        <span class="hljs-attr">primary</span>: <span class="hljs-string">&#x27;bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600&#x27;</span>,
        <span class="hljs-attr">secondary</span>: <span class="hljs-string">&#x27;bg-white text-slate-900 ring-1 ring-slate-300 ring-inset hover:bg-slate-50&#x27;</span>,
        <span class="hljs-attr">danger</span>: <span class="hljs-string">&#x27;bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600&#x27;</span>,
        <span class="hljs-attr">ghost</span>: <span class="hljs-string">&#x27;bg-transparent text-slate-900 hover:bg-slate-50&#x27;</span>,
      },
      <span class="hljs-attr">size</span>: {
        <span class="hljs-string">&#x27;extra-small&#x27;</span>: <span class="hljs-string">&#x27;rounded-sm px-2 py-1 text-xs&#x27;</span>,
        <span class="hljs-attr">small</span>: <span class="hljs-string">&#x27;rounded-sm px-2 py-1 text-sm&#x27;</span>,
        <span class="hljs-attr">medium</span>: <span class="hljs-string">&#x27;rounded-md px-2.5 py-1.5 text-sm&#x27;</span>,
        <span class="hljs-attr">large</span>: <span class="hljs-string">&#x27;rounded-md px-3 py-2 text-sm&#x27;</span>,
        <span class="hljs-string">&#x27;extra-large&#x27;</span>: <span class="hljs-string">&#x27;rounded-md px-3.5 py-2.5 text-sm&#x27;</span>,
      },
    },
    <span class="hljs-attr">defaultVariants</span>: {
      <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
      <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
    },
  },
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt; &amp;
  <span class="hljs-title class_">VariantProps</span>&lt;<span class="hljs-keyword">typeof</span> buttonVariants&gt; &amp; {
    <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  };

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ className, variant, size, ...props }: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{twMerge(buttonVariants({</span> <span class="hljs-attr">variant</span>, <span class="hljs-attr">size</span> }), <span class="hljs-attr">className</span>)} {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
};
</code></pre>
`,i={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,i as default,p as headings,e as html,t as slug,l as title};
