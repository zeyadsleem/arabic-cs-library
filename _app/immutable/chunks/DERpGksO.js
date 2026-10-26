const s="kinney",a="storybook",t="بناء أنظمة التصميم في Storybook",n="decorators",l="استخدام المزيّنات (Decorators) للسياق",p=[{depth:2,id:"إعادة-تهيئة-منطقة-النص-لدينا",text:"إعادة تهيئة منطقة النص لدينا"}],o=`<p>تتيح لك المزيّنات (decorators) تغليف المكوّن في قصتك بمكوّن آخر. وهذا مفيد في جملة من الحالات.</p>
<ul>
<li>أنت تستخدم React ومكوّنك يتوقع أن يُغلَّف في <a href="https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context">مزوّد سياق</a>.</li>
<li>تريد تغليف مكوّن ابن داخل مكوّن أب (مثلًا: أنت تصيّر مكوّن عنصر قائمة، لكنك تريد تغليف كل منها في مكوّن القائمة).</li>
<li>تريد إضافة بعض العلامات الإضافية (markup) حول المكوّن نفسه. و<a href="https://storybook.js.org/docs/writing-stories/decorators#wrap-stories-with-extra-markup">التوثيق الرسمي يستخدم مثال إضافة بعض الهامش</a> حول المكوّن.</li>
</ul>
<p>وإضافة إلى ذلك، يستخدم <a href="https://storybook.js.org/addons/@storybook/addon-themes/"><code>@storybook/addons-themes</code></a> المزيّنات لتطبيق السمات على قصصك.</p>
<h2 id="إعادة-تهيئة-منطقة-النص-لدينا">إعادة تهيئة منطقة النص لدينا</h2>
<p>لنتخيل أن لدينا قائمة مهام تعتمد على Context API.</p>
<p>يمكننا إضافة ما يلي إلى قصتنا أو إلى الميتا (meta):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> meta = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Components/TaskList&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">TaskList</span>,
  <span class="hljs-attr">decorators</span>: [
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-title class_">Story</span></span>) =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TaskListProvider</span>
        <span class="hljs-attr">tasks</span>=<span class="hljs-string">{[</span>
          { <span class="hljs-attr">id:</span> &#x27;<span class="hljs-attr">1</span>&#x27;, <span class="hljs-attr">title:</span> &#x27;<span class="hljs-attr">Task</span> <span class="hljs-attr">1</span>&#x27;, <span class="hljs-attr">completed:</span> <span class="hljs-attr">false</span> },
          { <span class="hljs-attr">id:</span> &#x27;<span class="hljs-attr">2</span>&#x27;, <span class="hljs-attr">title:</span> &#x27;<span class="hljs-attr">Task</span> <span class="hljs-attr">2</span>&#x27;, <span class="hljs-attr">completed:</span> <span class="hljs-attr">true</span> },
        ]}
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Story</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">TaskListProvider</span>&gt;</span></span>
    ),
  ],
} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">TaskList</span>&gt;;
</code></pre>
`,e={book:s,chapter:a,chapterTitle:t,slug:n,title:l,headings:p,html:o};export{s as book,a as chapter,t as chapterTitle,e as default,p as headings,o as html,n as slug,l as title};
