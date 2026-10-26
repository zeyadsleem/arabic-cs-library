const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="callout-component-solution",p="تنفيذ مكوّن Callout",t=[{depth:2,id:"تهيئة-المتغيرات",text:"تهيئة المتغيّرات"},{depth:2,id:"إضافة-أصناف-الوضع-الداكن",text:"إضافة أصناف الوضع الداكن"},{depth:2,id:"إضافة-قصص-أكثر",text:"إضافة قصص أكثر"},{depth:2,id:"تحسين-القصص",text:"تحسين القصص"},{depth:2,id:"جولة-إضافية-إضافة-صفحة-توثيق",text:"جولة إضافية: إضافة صفحة توثيق"}],r=`<blockquote>
<p><strong>هذا حل تمرين سابق</strong></p>
<p>يمكنك رؤية إعداد هذا التمرين <a href="https://stevekinney.com/courses/storybook/callout-component-exercise">هنا</a>—أو يمكنك ببساطة المتابعة.</p>
</blockquote>
<h2 id="تهيئة-المتغيرات">تهيئة المتغيّرات</h2>
<p>أول شيء سأفعله هو ملء المتغيّرات، فهذا سهل جدًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> variants = <span class="hljs-title function_">cva</span>([<span class="hljs-string">&#x27;p-4&#x27;</span>, <span class="hljs-string">&#x27;rounded&#x27;</span>, <span class="hljs-string">&#x27;border&#x27;</span>, <span class="hljs-string">&#x27;shadow-md&#x27;</span>, <span class="hljs-string">&#x27;space-y-4&#x27;</span>], {
  <span class="hljs-attr">variants</span>: {
    <span class="hljs-attr">type</span>: {
      <span class="hljs-attr">default</span>: [<span class="hljs-string">&#x27;bg-slate-200&#x27;</span>, <span class="hljs-string">&#x27;border-slate-500&#x27;</span>, <span class="hljs-string">&#x27;text-slate-900&#x27;</span>],
      <span class="hljs-attr">primary</span>: [<span class="hljs-string">&#x27;bg-primary-200&#x27;</span>, <span class="hljs-string">&#x27;border-primary-500&#x27;</span>, <span class="hljs-string">&#x27;text-primary-900&#x27;</span>],
      <span class="hljs-attr">information</span>: [<span class="hljs-string">&#x27;bg-information-200&#x27;</span>, <span class="hljs-string">&#x27;border-information-500&#x27;</span>, <span class="hljs-string">&#x27;text-information-900&#x27;</span>],
      <span class="hljs-attr">success</span>: [<span class="hljs-string">&#x27;bg-success-200&#x27;</span>, <span class="hljs-string">&#x27;border-success-500&#x27;</span>, <span class="hljs-string">&#x27;text-success-900&#x27;</span>],
      <span class="hljs-attr">warning</span>: [<span class="hljs-string">&#x27;bg-warning-200&#x27;</span>, <span class="hljs-string">&#x27;border-warning-500&#x27;</span>, <span class="hljs-string">&#x27;text-warning-900&#x27;</span>],
      <span class="hljs-attr">danger</span>: [<span class="hljs-string">&#x27;bg-danger-200&#x27;</span>, <span class="hljs-string">&#x27;border-danger-500&#x27;</span>, <span class="hljs-string">&#x27;text-danger-900&#x27;</span>],
    },
  },
  <span class="hljs-attr">defaultVariants</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
  },
});
</code></pre>
<p>أحتاج إلى تمرير تلك المعلومة إلى المكوّن.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Callout</span> = (<span class="hljs-params">{ title, children, <span class="hljs-keyword">type</span> }: <span class="hljs-title class_">CalloutProps</span></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{variants({</span> <span class="hljs-attr">type</span> })}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-semibold&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
</code></pre>
<h2 id="إضافة-أصناف-الوضع-الداكن">إضافة أصناف الوضع الداكن</h2>
<p>يمكن القول إن هذا تكرار لِما سبق، لكني أردت إجراء فحص سريع على الجزء الأول قبل الغوص بعيدًا. فالأمر حقًا مجرّد لعبة إضافة أصناف أكثر.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> variants = <span class="hljs-title function_">cva</span>([<span class="hljs-string">&#x27;p-4&#x27;</span>, <span class="hljs-string">&#x27;rounded&#x27;</span>, <span class="hljs-string">&#x27;border&#x27;</span>, <span class="hljs-string">&#x27;shadow-md&#x27;</span>, <span class="hljs-string">&#x27;space-y-4&#x27;</span>], {
  <span class="hljs-attr">variants</span>: {
    <span class="hljs-attr">type</span>: {
      <span class="hljs-attr">default</span>: [
        <span class="hljs-string">&#x27;bg-slate-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-slate-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-slate-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-slate-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-slate-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-slate-50&#x27;</span>,
      ],
      <span class="hljs-attr">primary</span>: [
        <span class="hljs-string">&#x27;bg-primary-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-primary-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-primary-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-primary-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-primary-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-primary-50&#x27;</span>,
      ],
      <span class="hljs-attr">information</span>: [
        <span class="hljs-string">&#x27;bg-information-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-information-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-information-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-information-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-information-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-information-50&#x27;</span>,
      ],
      <span class="hljs-attr">success</span>: [
        <span class="hljs-string">&#x27;bg-success-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-success-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-success-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-success-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-success-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-success-50&#x27;</span>,
      ],
      <span class="hljs-attr">warning</span>: [
        <span class="hljs-string">&#x27;bg-warning-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-warning-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-warning-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-warning-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-warning-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-warning-50&#x27;</span>,
      ],
      <span class="hljs-attr">danger</span>: [
        <span class="hljs-string">&#x27;bg-danger-200&#x27;</span>,
        <span class="hljs-string">&#x27;border-danger-500&#x27;</span>,
        <span class="hljs-string">&#x27;text-danger-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:bg-danger-800&#x27;</span>,
        <span class="hljs-string">&#x27;dark:border-danger-900&#x27;</span>,
        <span class="hljs-string">&#x27;dark:text-danger-50&#x27;</span>,
      ],
    },
  },
  <span class="hljs-attr">defaultVariants</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
  },
});
</code></pre>
<p>يُفترض أنني الآن أدعم الوضع الداكن جاهزًا.</p>
<h2 id="إضافة-قصص-أكثر">إضافة قصص أكثر</h2>
<p>أريد قصة لكل واحد من هذه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Default</span>: <span class="hljs-title class_">Story</span> = {};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Information</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;information&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Success</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Warning</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;warning&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Danger</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;danger&#x27;</span>,
  },
};
</code></pre>
<h2 id="تحسين-القصص">تحسين القصص</h2>
<p>يمكنني العبث بـ <a href="https://stevekinney.com/courses/storybook/arg-types"><code>argTypes</code></a> لإنشاء تجربة أجمل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> meta = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Components/Callout&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Callout</span>,
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;An Important Message&#x27;</span>,
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;This is a message that you should read.&#x27;</span>,
  },
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">title</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Title&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;text&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Title of the callout&#x27;</span>,
    },
    <span class="hljs-attr">children</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Content&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;text&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Content of the callout&#x27;</span>,
    },
    <span class="hljs-attr">type</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Type&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;select&#x27;</span>,
      <span class="hljs-attr">options</span>: [<span class="hljs-string">&#x27;default&#x27;</span>, <span class="hljs-string">&#x27;primary&#x27;</span>, <span class="hljs-string">&#x27;information&#x27;</span>, <span class="hljs-string">&#x27;success&#x27;</span>, <span class="hljs-string">&#x27;warning&#x27;</span>, <span class="hljs-string">&#x27;danger&#x27;</span>],
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Type of callout&#x27;</span>,
      <span class="hljs-attr">table</span>: {
        <span class="hljs-attr">defaultValue</span>: {
          <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
        },
      },
    },
  },
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Callout</span>&gt;;
</code></pre>
<h2 id="جولة-إضافية-إضافة-صفحة-توثيق">جولة إضافية: إضافة صفحة توثيق</h2>
<p>في <code>src/components/callout/callout.mdx</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">Stories</span>, <span class="hljs-title class_">Story</span>, <span class="hljs-title class_">Controls</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/blocks&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">CalloutStories</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./callout.stories&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Meta</span> <span class="hljs-attr">of</span>=<span class="hljs-string">{CalloutStories}</span> /&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Stories</span> /&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Controls</span> /&gt;</span></span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,r as html,l as slug,p as title};
