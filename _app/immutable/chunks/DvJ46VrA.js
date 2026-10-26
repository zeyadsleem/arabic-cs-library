const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="creating-an-icon-component",p="إنشاء مكوّن أيقونة",t=[],c=`<p>لست متأكدًا من أننا سنفعل هذا معًا، لكني فكرت أن أريك تنفيذي الساذج جدًا لمكوّن <code>Icon</code>. أريد تحديد عدد الأيقونات المتاحة <em>و</em>أريد أن تساعدني الإكمال التلقائي في العثور على الأيقونة التي أحتاجها. وإليك مكوّن الأيقونة البسيط جدًا الذي يمكننا البدء به.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">LucideIcon</span>,
  <span class="hljs-title class_">AlertTriangle</span>,
  <span class="hljs-title class_">Check</span>,
  <span class="hljs-title class_">HelpCircle</span>,
  <span class="hljs-title class_">Info</span>,
  X,
  <span class="hljs-title class_">Zap</span>,
  <span class="hljs-title class_">ChevronDown</span>,
  <span class="hljs-title class_">Skull</span>,
  <span class="hljs-title class_">Star</span>,
  <span class="hljs-title class_">ExternalLink</span>,
  <span class="hljs-title class_">Heart</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lucide-react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">IconProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-title class_">LucideIcon</span>&gt; &amp; {
  <span class="hljs-attr">type</span>:
    | <span class="hljs-string">&#x27;warning&#x27;</span>
    | <span class="hljs-string">&#x27;check&#x27;</span>
    | <span class="hljs-string">&#x27;help&#x27;</span>
    | <span class="hljs-string">&#x27;info&#x27;</span>
    | <span class="hljs-string">&#x27;x&#x27;</span>
    | <span class="hljs-string">&#x27;zap&#x27;</span>
    | <span class="hljs-string">&#x27;chevron&#x27;</span>
    | <span class="hljs-string">&#x27;skull&#x27;</span>
    | <span class="hljs-string">&#x27;star&#x27;</span>
    | <span class="hljs-string">&#x27;external&#x27;</span>
    | <span class="hljs-string">&#x27;heart&#x27;</span>;
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">iconComponents</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">IconProps</span>[<span class="hljs-string">&#x27;type&#x27;</span>], <span class="hljs-title class_">LucideIcon</span>&gt; = {
  <span class="hljs-attr">warning</span>: <span class="hljs-title class_">AlertTriangle</span>,
  <span class="hljs-attr">check</span>: <span class="hljs-title class_">Check</span>,
  <span class="hljs-attr">help</span>: <span class="hljs-title class_">HelpCircle</span>,
  <span class="hljs-attr">info</span>: <span class="hljs-title class_">Info</span>,
  <span class="hljs-attr">x</span>: X,
  <span class="hljs-attr">zap</span>: <span class="hljs-title class_">Zap</span>,
  <span class="hljs-attr">chevron</span>: <span class="hljs-title class_">ChevronDown</span>,
  <span class="hljs-attr">skull</span>: <span class="hljs-title class_">Skull</span>,
  <span class="hljs-attr">star</span>: <span class="hljs-title class_">Star</span>,
  <span class="hljs-attr">external</span>: <span class="hljs-title class_">ExternalLink</span>,
  <span class="hljs-attr">heart</span>: <span class="hljs-title class_">Heart</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Icon</span> = (<span class="hljs-params">{ <span class="hljs-keyword">type</span>, ...props }: <span class="hljs-title class_">IconProps</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">IconComponent</span> = iconComponents[<span class="hljs-keyword">type</span>];
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconComponent</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> icons = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(iconComponents) <span class="hljs-keyword">as</span> <span class="hljs-title class_">IconProps</span>[<span class="hljs-string">&#x27;type&#x27;</span>][];
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
