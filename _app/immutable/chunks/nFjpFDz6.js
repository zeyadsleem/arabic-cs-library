const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="controls",t="إضافة أدوات تحكم إلى قصة",p=[{depth:2,id:"أسلوب-بديل-لتعيين-قيمة-افتراضية",text:"أسلوب بديل لتعيين قيمة افتراضية"}],c=`<p>في القسم السابق، أضفنا أنماطًا للزر عندما يكون في الحالة <code>disabled</code>، لكن ليس لدينا طريقة جيدة بشكل خاص لتفعيل ذلك في قصصنا. <em>يمكننا</em> إضافة قصص إضافية للحالة المعطّلة لكل من متغيّرات أزرارنا، لكن هذا يبدو وكأنه قد يخرج عن السيطرة.</p>
<p>ولحسن حظنا، تتيح لنا Storybook إنشاء أدوات تحكم مخصّصة نستطيع التلاعب بها في قصصنا.</p>
<p>وكل ما نحتاج إلى فعله هو إضافة ما يلي إلى <code>Meta</code> في قصتنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">disabled</span>: {
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;boolean&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disables the button&#x27;</span>,
    },
  },
};
</code></pre>
<p>الآن، ستلاحظ أن لدينا القدرة على تعيين تلك الخاصية في أدوات التحكم لدينا.</p>
<p><img src="/arabic-cs-library/images/kinney/c6ba4cec4ca955cc.webp" alt="أداة تحكم إضافية لإظهار الحالة المعطّلة"></p>
<p>علينا النقر عليها لتعيينها. وإن لم نرد فعل ذلك، يمكننا تعيين القيمة في كل من قصصنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Secondary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;secondary&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Destructive</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;destructive&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
};
</code></pre>
<p>والآن، سنرى أنها معيَّنة ويمكننا توفير نقرة إضافية. وسأترك لك قرار ما إذا كان ذلك يستحق ذلك أم لا.</p>
<p><img src="/arabic-cs-library/images/kinney/9290bb28d9bfb379.webp" alt="تعيين قيمة النوع صراحةً"></p>
<h2 id="أسلوب-بديل-لتعيين-قيمة-افتراضية">أسلوب بديل لتعيين قيمة افتراضية</h2>
<p>من الأمور الرائعة في قصص Storybook أنها مجرّد وحدات ES. و<em>يمكنك</em> استخدام معامل النشر (spread) إن وجدت نفسك بحاجة إلى إجراء تغييرات واسعة النطاق كثيرًا. وهذا مفيد إذا أردنا استخدام جوانب من قصة في سياق قصة أخرى.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Secondary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    ...<span class="hljs-title class_">Primary</span>.<span class="hljs-property">args</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;secondary&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Destructive</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    ...<span class="hljs-title class_">Primary</span>.<span class="hljs-property">args</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;destructive&#x27;</span>,
  },
};
</code></pre>
<p>ومع ذلك، توجد أيضًا طريقة لاستخدام <a href="https://stevekinney.com/courses/storybook/default-args">الوسائط الافتراضية</a> التي تُمرَّر إلى كل قصة ثم تُتجاوَز عند الحاجة إليها. لكن أولًا، لنؤدِّ <a href="https://stevekinney.com/courses/storybook/adding-button-sizes-exercise">تمرينًا</a> صغيرًا.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,p as headings,c as html,l as slug,t as title};
