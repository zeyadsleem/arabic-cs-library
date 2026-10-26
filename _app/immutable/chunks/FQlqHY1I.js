const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",t="forcing-dark-mode",p="فرض الوضع الداكن",l=[],e=`<p>مثلما لا أريد تعيين الوسائط افتراضيًا، أريد أحيانًا فرض قصة في الوضع الداكن. ويُفعل ذلك بسهولة بميزة في Storybook تُسمّى <strong>المعاملات (parameters)</strong>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Dark</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">parameters</span>: {
    <span class="hljs-attr">themes</span>: {
      <span class="hljs-attr">themeOverride</span>: <span class="hljs-string">&#x27;dark&#x27;</span>,
    },
  },
};
</code></pre>
<p>وطالما نحن في الموضوع، يمكنك أيضًا فرض إطار عرض (viewport):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Mobile</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">parameters</span>: {
    <span class="hljs-attr">viewport</span>: {
      <span class="hljs-attr">defaultViewport</span>: <span class="hljs-string">&#x27;mobile1&#x27;</span>,
    },
  },
};
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:l,html:e};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,e as html,t as slug,p as title};
