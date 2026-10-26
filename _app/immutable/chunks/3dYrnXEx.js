const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",t="testing-components-with-storybook",l="اختبار المكوّنات",p=[],c=`<p>في كل تطبيق تقريبًا عملت عليه توجد فكرة أن الرابط قد يبدو كزرّ. وهناك نمط في React يمكننا فيه استخدام مكوّنات متعدّدة الأشكال (polymorphic). لقد تحدثنا كثيرًا عن كيفية فعل ذلك في دورة React وTypeScript، لكن دعنا الآن نتجاوز التفاصيل قليلًا.</p>
<p>سنحدّث النوع كما يلي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt; &amp;
  <span class="hljs-title class_">ButtonVariants</span> &amp; {
    <span class="hljs-attr">href</span>?: <span class="hljs-built_in">never</span>;
  };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AnchorProps</span> = <span class="hljs-title class_">ComponentPropsWithoutRef</span>&lt;<span class="hljs-string">&#x27;a&#x27;</span>&gt; &amp;
  <span class="hljs-title class_">ButtonVariants</span> &amp; {
    <span class="hljs-attr">href</span>?: <span class="hljs-built_in">string</span>;
  };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonOrLinkProps</span> = <span class="hljs-title class_">ButtonProps</span> | <span class="hljs-title class_">AnchorProps</span>;
</code></pre>
<p>ثم سنُجري تعديلًا صغيرًا واحدًا على مكوّن <code>Button</code> لدينا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, size = <span class="hljs-string">&#x27;medium&#x27;</span>, ...props }: <span class="hljs-title class_">ButtonOrLinkProps</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> className = <span class="hljs-title function_">clsx</span>(<span class="hljs-title function_">variants</span>({ variant, size }));

  <span class="hljs-keyword">if</span> (props.<span class="hljs-property">href</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">ComponentPropsWithoutRef</span>&lt;&#x27;<span class="hljs-attr">a</span>&#x27;&gt;</span>)} /&gt;</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">ComponentPropsWithoutRef</span>&lt;&#x27;<span class="hljs-attr">button</span>&#x27;&gt;</span>)} /&gt;</span>;
  }
};
</code></pre>
<p>من الأمور الرائعة حقًّا التي يمكنك فعلها مع Storybook و<a href="https://stevekinney.com/courses/storybook/play-functions">دوال التشغيل (Play functions)</a> أنك تستطيع استخدامها لاختبار مكوّنك نيابةً عنك. لنفترض أن لديّ زرًّا يمكن أن يكون رابطًا أيضًا إذا مرّرنا خاصية <code>href</code> إلى الزرّ.</p>
<p>أريد الاختبار وفق الشروط التالية:</p>
<ul>
<li>إذا لم أمرّر <code>href</code>، فينبغي أن يُصيَّر المكوّن كـ <code>&lt;button&gt;</code>.</li>
<li>إذا <em>مرّرت</em> <code>href</code>، فينبغي أن يُصيَّر المكوّن كـ <code>&lt;a&gt;</code>.</li>
</ul>
<p>يمكنني تعزيز قصصي ببعض عمليات التحقّق السريعة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Primary</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-function">(<span class="hljs-params">{ canvasElement }</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> button = canvas.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>);

    <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">tagName</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;BUTTON&#x27;</span>);
  },
};
</code></pre>
<p>ويمكنني فعل شيء مشابه مع الزرّ الذي ينبغي أن يُصيَّر كرابط أيضًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonAsLink</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://example.com&#x27;</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-title function_">async</span> ({ canvasElement }) =&gt; {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> button = canvas.<span class="hljs-title function_">findByText</span>(<span class="hljs-string">&#x27;Button&#x27;</span>);

    <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">tagName</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;A&#x27;</span>);
    <span class="hljs-title function_">expect</span>(button).<span class="hljs-title function_">toHaveRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    <span class="hljs-title function_">expect</span>(button).<span class="hljs-title function_">toHaveAttribute</span>(<span class="hljs-string">&#x27;href&#x27;</span>, <span class="hljs-string">&#x27;https://example.com&#x27;</span>);
  },
};
</code></pre>
<p>الآن، إن أعددت <a href="https://stevekinney.com/courses/storybook/test-runner">مشغّل اختبارات Storybook</a>، يمكنني حتى تشغيل هذه الاختبارات كجزء من إعداد CI/CD لديّ أو إلى جانب اختباراتي الوحدية الأخرى.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
