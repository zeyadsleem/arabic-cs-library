const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="class-variance-authority",l="إنشاء المتغيّرات باستخدام Class Variance Authority",p=[{depth:2,id:"إعادة-تهيئة-خاصية-variant",text:"إعادة تهيئة خاصية variant"},{depth:2,id:"توليد-الأنواع-تلقائيا",text:"توليد الأنواع تلقائيًا"}],r=`<p><a href="https://cva.style/">Class Variance Authority</a> أداة مستقلة عن إطار العمل، تُنشئ بها متغيّرات لمكوّن بأصناف مختلفة. وهي بسيطة جدًا، وربما <em>تستطيع</em> كتابتها بنفسك لو اضطررت—لكنك لا تحتاج إلى ذلك لأنها موجودة بالفعل.</p>
<p>تتيح لك CVA ما يلي:</p>
<ol>
<li>تعريف مجموعة من الأنماط الأساسية للمكوّن.</li>
<li>تعريف الأنماط الخاصة بكل متغيّر.</li>
<li>تعريف متغيّرات افتراضية عندما لا يُحدَّد أحدها صراحةً.</li>
<li>إنشاء متغيّرات مركّبة.</li>
</ol>
<p>وهي تعمل <em>بشكل ممتاز</em> مع Tailwind، لكنك لا تحتاج إلى استخدام Tailwind لاستخدام CVA. ويمكنك استخدام أي أصناف مساعدة تريدها، أو حتى أصناف وحدات CSS فقط كما فعلنا سابقًا.</p>
<blockquote>
<p><strong>استخدام IntelliSense الخاص بـ Tailwind مع مكتبة Class Variance Authority</strong></p>
<p>إذا كنت تستخدم Tailwind وVisual Studio Code وCVA و<a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">إضافة Tailwind CSS IntelliSense</a>، فقد ترغب في إجراء <a href="https://cva.style/docs/getting-started/installation#tailwind-css">هذا</a> التعديل في <code>settings.json</code> في مشروعك.</p>
</blockquote>
<p>لننظر في مثال نُعيد فيه تهيئة <a href="https://stevekinney.com/courses/storybook/adding-variants">مكوّن الزر</a> من قبل لاستخدام CVA.</p>
<h2 id="إعادة-تهيئة-خاصية-variant">إعادة تهيئة خاصية variant</h2>
<p>أنا نادم على بعض خياراتي السابقة في التسمية، لكننا هنا. لننظر في بعض الشيفرة ونتحدث عنها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { cva, <span class="hljs-keyword">type</span> <span class="hljs-title class_">VariantProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-variance-authority&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> variants = <span class="hljs-title function_">cva</span>(
  [
    <span class="hljs-string">&#x27;font-semibold&#x27;</span>,
    <span class="hljs-string">&#x27;border&#x27;</span>,
    <span class="hljs-string">&#x27;rounded&#x27;</span>,
    <span class="hljs-string">&#x27;shadow-sm&#x27;</span>,
    <span class="hljs-string">&#x27;inline-flex&#x27;</span>,
    <span class="hljs-string">&#x27;items-center&#x27;</span>,
    <span class="hljs-string">&#x27;cursor-pointer&#x27;</span>,
    <span class="hljs-string">&#x27;gap-1.5&#x27;</span>,
    <span class="hljs-string">&#x27;focus-visible:outline&#x27;</span>,
    <span class="hljs-string">&#x27;focus-visible:outline-2&#x27;</span>,
    <span class="hljs-string">&#x27;focus-visible:outline-offset-2&#x27;</span>,
    <span class="hljs-string">&#x27;transition-colors&#x27;</span>,
    <span class="hljs-string">&#x27;disabled:opacity-50&#x27;</span>,
    <span class="hljs-string">&#x27;disabled:cursor-not-allowed&#x27;</span>,
    <span class="hljs-string">&#x27;disabled:pointer-events-none&#x27;</span>,
  ],
  {
    <span class="hljs-attr">variants</span>: {
      <span class="hljs-attr">variant</span>: {
        <span class="hljs-attr">primary</span>: [
          <span class="hljs-string">&#x27;bg-primary-600&#x27;</span>,
          <span class="hljs-string">&#x27;text-white&#x27;</span>,
          <span class="hljs-string">&#x27;border-transparent&#x27;</span>,
          <span class="hljs-string">&#x27;hover:bg-primary-500&#x27;</span>,
          <span class="hljs-string">&#x27;active:bg-primary-400&#x27;</span>,
        ],
        <span class="hljs-attr">secondary</span>: [
          <span class="hljs-string">&#x27;bg-white&#x27;</span>,
          <span class="hljs-string">&#x27;text-slate-900&#x27;</span>,
          <span class="hljs-string">&#x27;border-slate-300&#x27;</span>,
          <span class="hljs-string">&#x27;hover:bg-slate-50&#x27;</span>,
          <span class="hljs-string">&#x27;active:bg-slate-100&#x27;</span>,
        ],
        <span class="hljs-attr">destructive</span>: [
          <span class="hljs-string">&#x27;bg-danger-600&#x27;</span>,
          <span class="hljs-string">&#x27;text-white&#x27;</span>,
          <span class="hljs-string">&#x27;border-transparent&#x27;</span>,
          <span class="hljs-string">&#x27;hover:bg-danger-500&#x27;</span>,
          <span class="hljs-string">&#x27;active:bg-danger-400&#x27;</span>,
        ],
      },
    },
    <span class="hljs-attr">defaultVariants</span>: {
      <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;secondary&#x27;</span>,
    },
  },
);
</code></pre>
<p>من الأمور التي ستلاحظها أن هذا مجرّد كائن JavaScript. ويمكنك استخدامه مع Svelte بالسهولة نفسها التي تستخدمه بها مع React أو أي شيء آخر.</p>
<h2 id="توليد-الأنواع-تلقائيا">توليد الأنواع تلقائيًا</h2>
<p>يمكننا أيضًا إضافة ما يلي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonVariants</span> = <span class="hljs-title class_">VariantProps</span>&lt;<span class="hljs-keyword">typeof</span> variants&gt;;
</code></pre>
<p>ينظر <code>VariantProps</code> في الكائن الذي تعيده CVA وينشئ نوعًا يمكنك استخدامه كخاصية مع أي إطار عمل تقريبًا—ما دمت تستخدم TypeScript بالطبع. وهذا يمنحك القدرة على مشاركة تصميم مكوّنك (أي لغتك التصميمية) عبر مشاريع متعددة—حتى لو كانت تستخدم أطر عمل مختلفة.</p>
<p>الآن، يمكننا تحديث المكوّن لاستخدام نوع مبني على المتغيّرات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&#x27;button&#x27;</span>&gt; &amp; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-title class_">ButtonVariants</span>[<span class="hljs-string">&#x27;variant&#x27;</span>];
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
};
</code></pre>
<blockquote>
<p><strong>تمرين</strong></p>
<p>هل يمكنك إضافة متغيّر إضافي للخاصية <code>size</code>؟ سنطّلع على حل <a href="https://stevekinney.com/courses/storybook/adding-a-size-variant">هنا</a>.</p>
</blockquote>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:r};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,r as html,t as slug,l as title};
