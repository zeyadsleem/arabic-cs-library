const o="kinney",n="storybook",s="بناء أنظمة التصميم في Storybook",t="add-an-addon",a="إضافة ملحق إلى Storybook",e=[],c=`<p>إذا احتجت إلى إضافة ملحق يدويًا في Storybook، فيمكنك اتباع هذه الخطوات للبدء. أولًا، سنحتاج إلى تثبيت الملحق المعني.</p>
<pre><code class="language-bash"> npm i -D @storybook/addon-themes
</code></pre>
<p>بعد ذلك، ننتقل إلى <code>.storybook/main.ts</code> ونضيفه إلى مصفوفة الملحقات.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/.storybook/main.ts b/.storybook/main.ts</span>
<span class="hljs-comment">index 098b7b7..63965e0 100644</span>
<span class="hljs-comment">--- a/.storybook/main.ts</span>
<span class="hljs-comment">+++ b/.storybook/main.ts</span>
<span class="hljs-meta">@@ -8,6 +8,7 @@</span> const config: StorybookConfig = {
     &#x27;@storybook/addon-essentials&#x27;,
     &#x27;@chromatic-com/storybook&#x27;,
     &#x27;@storybook/addon-interactions&#x27;,
<span class="hljs-addition">+    &#x27;@storybook/addon-themes&#x27;,</span>
   ],
   framework: {
     name: &#x27;@storybook/react-vite&#x27;,
</code></pre>
`,d={book:o,chapter:n,chapterTitle:s,slug:t,title:a,headings:e,html:c};export{o as book,n as chapter,s as chapterTitle,d as default,e as headings,c as html,t as slug,a as title};
