const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="color-palette",p="لوحة الألوان",t=[{depth:2,id:"إنشاء-سمة-من-الألوان-الدلالية",text:"إنشاء سمة من الألوان الدلالية"},{depth:2,id:"تمرين",text:"تمرين"}],o=`<p>توفّر Storybook كتلة توثيق لتصيير لوحة ألوان نظام تصميمك. فمثلًا، يمكنك إنشاء ملف <code>.mdx</code> يشبه هذا.</p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">ColorPalette</span>, <span class="hljs-title class_">ColorItem</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/blocks&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Meta</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Colors&quot;</span> /&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ColorPalette</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">ColorItem</span>
		<span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Brand&quot;</span>
		<span class="hljs-attr">subtitle</span>=<span class="hljs-string">&quot;Brand Colors&quot;</span>
		<span class="hljs-attr">colors</span>=<span class="hljs-string">{{</span>
			<span class="hljs-attr">Subtle:</span> &#x27;#<span class="hljs-attr">a5b4fc</span>&#x27;,
			<span class="hljs-attr">Default:</span> &#x27;#<span class="hljs-attr">4f46e5</span>&#x27;,
		}}
	/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ColorPalette</span>&gt;</span></span>
</code></pre>
<p>ستصيّر Storybook لوحة الألوان البسيطة هذه.</p>
<p><img src="/arabic-cs-library/images/kinney/2482be08aa1a3910.webp" alt="Storybook تصيّر لوحة ألوان"></p>
<p>والأفضل من ذلك أنك تستطيع تصيير لوحة الألوان برمجيًا، لأن كامل قوة JSX تحت تصرفك. وهذا يتيح لك توليد لوحة ألوان بسهولة بناءً على سمتك.</p>
<p>لنقل إننا أردنا جلب كل الألوان من Tailwind. يمكننا أن نفعل شيئًا كهذا.</p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> colors <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss/colors&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ColorPalette</span>&gt;</span>
  {Object.entries(colors)
    .filter(([, value]) =&gt; typeof value !== &#x27;string&#x27;)
    .map(([name, value]) =&gt; (
      <span class="hljs-tag">&lt;<span class="hljs-name">ColorItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{name}</span> <span class="hljs-attr">title</span>=<span class="hljs-string">{name}</span> <span class="hljs-attr">colors</span>=<span class="hljs-string">{value}</span> /&gt;</span>
    ))}
<span class="hljs-tag">&lt;/<span class="hljs-name">ColorPalette</span>&gt;</span></span>;
</code></pre>
<p>من الواضح أن هذا سيختلف قليلًا حسب تصنيف سمتك، لكن يمكنك أن تتوقع شيئًا على هذه الشاكلة.</p>
<p><img src="/arabic-cs-library/images/kinney/0a2f83a2f2f62e9b.webp" alt="لوحة ألوان مبنية على سمة Tailwind الافتراضية"></p>
<h2 id="إنشاء-سمة-من-الألوان-الدلالية">إنشاء سمة من الألوان الدلالية</h2>
<p>من الأمور التي تعلمناها بالطريقة الصعبة أن استخدام قيم الألوان مباشرة قد يصبح مشكلة. فلو أردت تغيير لون كل مسارات العمل الملغاة—وهو مثال افتراضي تمامًا—فلا يمكنك تغيير اللون في مكان واحد فحسب. عليك أن تتعقّب كل موضع تستخدم فيه اللون الأصفر وتقيّم ما إذا كان يشير إلى مسار عمل ملغى أم لا.</p>
<p>ستكون دلالاتك فريدة لك على الأرجح، لكني وجدت بعض الأنماط الشائعة في ترحالي. فمثلًا، سيكون لديك عادةً القيم الدلالية التالية على الأقل:</p>
<ul>
<li>اللون الأساسي لعلامتك التجارية.</li>
<li>لون للدلالة على إجراء خطير أو مدمِّر.</li>
<li>لون أقل حدّة قليلًا لعرض التحذيرات.</li>
<li>لون للدلالة على النجاح الحلو الحلو.</li>
<li>لون عام للمعلومات التي لا تتعلق بالخطر ولا بالنجاح.</li>
<li>مجموعة من درجات الرمادي لأسطح وعناوين مختلفة في تطبيقك.</li>
</ul>
<p>يمكننا إعداد ذلك في سمة Tailwind لدينا ثم استخدام تلك القيم في كل أنحاء تطبيقنا. ويمكنها أن ترتبط بألوان Tailwind المدمجة أو أن ننشئ ألواننا الخاصة.</p>
<blockquote>
<p><strong>إنشاء لوحة ألوان خاصة بك</strong></p>
<p>يعجبني حقًا <a href="https://uicolors.app/create">uicolors.app</a> لتوليد لوحات ألوان تترجم تقريبًا إلى دلالات Tailwind.</p>
</blockquote>
<p>أيًا كان المسار الذي تختاره، ستنتهي على الأرجح إلى شيء يشبه هذا على الأقل نوعًا ما.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Config</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">import</span> colors <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss/colors&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">content</span>: [<span class="hljs-string">&#x27;./src/**/*.{js,jsx,ts,tsx,mdx,html}&#x27;</span>],
  <span class="hljs-attr">darkMode</span>: [<span class="hljs-string">&#x27;class&#x27;</span>, <span class="hljs-string">&#x27;[data-mode=&quot;dark&quot;]&#x27;</span>],
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">extend</span>: {
      <span class="hljs-attr">colors</span>: {
        <span class="hljs-attr">primary</span>: colors.<span class="hljs-property">indigo</span>,
        <span class="hljs-attr">success</span>: colors.<span class="hljs-property">green</span>,
        <span class="hljs-attr">warning</span>: colors.<span class="hljs-property">amber</span>,
        <span class="hljs-attr">danger</span>: colors.<span class="hljs-property">red</span>,
        <span class="hljs-attr">info</span>: colors.<span class="hljs-property">blue</span>,
        <span class="hljs-attr">surface</span>: colors.<span class="hljs-property">slate</span>,
      },
    },
  },
  <span class="hljs-attr">plugins</span>: [],
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Config</span>;
</code></pre>
<h2 id="تمرين">تمرين</h2>
<p>هل يمكنك أن تأخذ المجموعة الأكثر تحديدًا من الألوان من سمتنا وتولّد لوحة ألوان؟ وإن واجهتك صعوبة <a href="https://stevekinney.com/courses/storybook/color-palette-solution">يمكنك الاطلاع على هذا الحل المحتمل</a>.</p>
<p><img src="/arabic-cs-library/images/kinney/34d45b950e2a797f.webp" alt="لوحة ألوان مولَّدة برمجيًا معروضة في Storybook"></p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:o};export{s as book,a as chapter,n as chapterTitle,r as default,t as headings,o as html,l as slug,p as title};
