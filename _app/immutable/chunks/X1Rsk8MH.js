const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="adding-button-sizes-solution",p="الحل: إضافة متغيّرات أحجام الأزرار وأدوات التحكم",t=[],c=`<p>يجدر بنا على الأرجح أن نحدّث المكوّن أيضًا، أليس كذلك؟</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> clsx <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;clsx&#x27;</span>;

<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./button.module.css&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt; &amp; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;destructive&#x27;</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, size = <span class="hljs-string">&#x27;medium&#x27;</span>, ...props }: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{clsx(styles.button,</span> <span class="hljs-attr">styles</span>[<span class="hljs-attr">variant</span>], <span class="hljs-attr">styles</span>[<span class="hljs-attr">size</span>])} {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
};
</code></pre>
<p>وأخيرًا، نحتاج إلى إضافة قصص إضافية لأحجام أزرارنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Small</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;small&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Medium</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Large</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;large&#x27;</span>,
  },
};
</code></pre>
<p>كما وعدنا، حان وقت الحديث عن <a href="https://stevekinney.com/courses/storybook/default-args">الوسائط الافتراضية</a>.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,t as headings,c as html,l as slug,p as title};
