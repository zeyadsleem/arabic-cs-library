const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="importing-fontsource-fonts",o="استيراد الخطوط من Fontsource",p=[],e=`<p>هناك طرق كثيرة لتضمين خطوط خارجية. لكن دعني أخبرك بـ<strong>المفضّلة</strong> لدي: تثبيتها من npm من <a href="https://fontsource.org/">Fontsource</a>.</p>
<p>سيستخدم نظام التصميم لدينا خط Inter، أساسًا لأنه ما نستخدمه في مكان عملي ولأنني لا أكرهه. وتثبيت الخط بهذه السهولة:</p>
<pre><code class="language-bash">npm install @fontsource-variable/inter
</code></pre>
<p>إن كنت تستخدم المستودع المثال، فقد أُنجز هذا الجزء لك بالفعل.</p>
<p>بعد ذلك، في ملف الأنماط لديك، <code>index.css</code> في حالتنا، استورد الاعتماد ببساطة. (أفترض أنك تستخدم <a href="https://postcss.org/">PostCSS</a>، وهو يأتي مجانًا مع <a href="https://vite.dev/">Vite</a>.)</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;@fontsource-variable/inter&#x27;</span>;
</code></pre>
<p>الآن، يمكنك استخدام مكدس الخطوط في CSS لديك، لكننا نستخدم Tailwind، فلنستبدل ببساطة <code>font-sans</code> بخطنا الجديد.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">content</span>: [<span class="hljs-string">&#x27;./src/**/*.{js,jsx,ts,tsx,mdx,html}&#x27;</span>],
  <span class="hljs-attr">darkMode</span>: [<span class="hljs-string">&#x27;class&#x27;</span>, <span class="hljs-string">&#x27;[data-mode=&quot;dark&quot;]&#x27;</span>],
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">extend</span>: {
      <span class="hljs-attr">fontFamily</span>: {
        <span class="hljs-attr">sans</span>: [<span class="hljs-string">&#x27;Inter Variable&#x27;</span>, <span class="hljs-string">&#x27;sans-serif&#x27;</span>],
      },
    },
  },
  <span class="hljs-attr">plugins</span>: [],
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Config</span>;
</code></pre>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,e as html,t as slug,o as title};
