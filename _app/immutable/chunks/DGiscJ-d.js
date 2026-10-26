const o="kinney",t="storybook",n="بناء أنظمة التصميم في Storybook",e="color-palette-solution",l="إنشاء لوحة ألوان من سمة Tailwind لديك",c=[],a=`<p>بدلًا من الرجوع إلى سمة Tailwind الافتراضية، يمكننا النظر في ملف تهيئة Tailwind لدينا. أضف ما يلي إلى <code>src/colors.mdx</code>.</p>
<pre><code class="language-mdx">import config from '../tailwind.config';

## Application Colors

&lt;ColorPalette&gt;
  {Object.entries(config.theme.extend.colors).map(([name, value]) =&gt; (
    &lt;ColorItem key={name} title={name} colors={value} /&gt;
  ))}
&lt;/ColorPalette&gt;
</code></pre>
`,i={book:o,chapter:t,chapterTitle:n,slug:e,title:l,headings:c,html:a};export{o as book,t as chapter,n as chapterTitle,i as default,c as headings,a as html,e as slug,l as title};
