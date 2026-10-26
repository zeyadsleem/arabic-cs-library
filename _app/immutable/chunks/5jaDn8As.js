const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",t="working-backwards-from-types-with-zod",p="العمل عكسيًا من الأنواع مع Zod",l=[],c=`<p>نعلم أننا نستطيع إنشاء أنواع من مخططات Zod باستخدام <code>z.infer()</code>، لكن أحيانًا نجد أنفسنا في موقف تكون فيه الأنواع <em>جاهزة لدينا بالفعل</em> ونريد إنشاء مخططات والتأكّد بنسبة 100% من أن تلك المخططات تطابق الأنواع.</p>
<p>لنقل إن لدينا النوع التالي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Task</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">description</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
};
</code></pre>
<p>يمكننا استخدام <code>satisfies</code> للتأكّد من مطابقة مخططنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> taskSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">description</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">completed</span>: z.<span class="hljs-title function_">boolean</span>(),
}) <span class="hljs-keyword">satisfies</span> z.<span class="hljs-property">ZodType</span>&lt;<span class="hljs-title class_">Task</span>&gt;;
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل أن يكون <code>z.string().uuid()</code> بالصيغة <code>z.uuid()</code>. وقد تغيّر النوع العام <code>z.ZodType</code> من ثلاثة وسائط إلى اثنين (حُذف وسيط <code>Def</code>)، لكن <code>satisfies z.ZodType&lt;Task&gt;</code> ما زال يعمل لأنه يستخدم الوسيط الأول فقط.</p>
</blockquote>
<p>وإذا كان مخططنا <em>لا</em> يطابق النوع الذي يُفترض أن يرضيه، فسيكون TypeScript هو من يصيح في وجهنا.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,l as headings,c as html,t as slug,p as title};
