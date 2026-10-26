const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",t="typeset",p="عرض الخطوط باستخدام Typeset",l=[],c=`<p>مثل <a href="https://stevekinney.com/courses/storybook/color-palette">لوحات الألوان</a> و<a href="https://stevekinney.com/courses/storybook/icon-gallery">معارض الأيقونات</a>، يوفّر Storybook أيضًا مجموعة مفيدة من المكوّنات لتصيير تنضيد نظام التصميم لديك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">Typeset</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/blocks&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Meta</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Typography&quot;</span> /&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Typeset</span>
  <span class="hljs-attr">fontSizes</span>=<span class="hljs-string">{[</span>
    <span class="hljs-attr">12</span>,
    <span class="hljs-attr">14</span>,
    <span class="hljs-attr">16</span>,
    <span class="hljs-attr">18</span>,
    <span class="hljs-attr">20</span>,
    <span class="hljs-attr">24</span>,
    <span class="hljs-attr">30</span>,
    <span class="hljs-attr">36</span>,
    <span class="hljs-attr">48</span>,
    <span class="hljs-attr">60</span>,
    <span class="hljs-attr">72</span>,
    <span class="hljs-attr">96</span>,
    <span class="hljs-attr">128</span>
  ]}
  <span class="hljs-attr">fontWeight</span>=<span class="hljs-string">{400}</span>
  <span class="hljs-attr">sampleText</span>=<span class="hljs-string">{</span>&quot;<span class="hljs-attr">The</span> <span class="hljs-attr">quick</span> <span class="hljs-attr">brown</span> <span class="hljs-attr">fox</span> <span class="hljs-attr">jumps</span> <span class="hljs-attr">over</span> <span class="hljs-attr">the</span> <span class="hljs-attr">lazy</span> <span class="hljs-attr">dog.</span>&quot;}
  <span class="hljs-attr">fontFamily</span>=<span class="hljs-string">{</span>&quot;<span class="hljs-attr">system-ui</span>, <span class="hljs-attr">sans-serif</span>&quot;}
/&gt;</span></span>
</code></pre>
<p>سترى شيئًا على هذا النحو.</p>
<p><img src="/arabic-cs-library/images/kinney/2046b2dd3faff7c0.webp" alt="مكوّن Typeset في Storybook يصيّر تنضيد نظام التصميم لدينا"></p>
`,r={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:l,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,c as html,t as slug,p as title};
