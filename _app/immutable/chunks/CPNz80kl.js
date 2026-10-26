const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="text-area-disabled-play-function-solution",l="الحل: التحقق من منطقة نص معطّلة",e=[],c=`<!-- ملاحظة مترجم: لا يحتوي هذا المقطع على نصّ ظاهر سوى الشيفرة أدناه؛ وعنوان الصفحة العربي مُدرج في ترويسة الملف. -->
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Disabled</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-title function_">async</span> ({ canvasElement }) =&gt; {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> textArea = canvas.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;textbox&#x27;</span>);

    <span class="hljs-title function_">expect</span>(textArea).<span class="hljs-title function_">toBeDisabled</span>();
    <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(textArea, <span class="hljs-string">&#x27;Hello, world!&#x27;</span>);
    <span class="hljs-title function_">expect</span>(textArea).<span class="hljs-title function_">toHaveValue</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  },
};
</code></pre>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,e as headings,c as html,t as slug,l as title};
