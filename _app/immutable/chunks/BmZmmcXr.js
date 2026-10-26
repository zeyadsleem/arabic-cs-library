const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="validating-the-data-layer",p="التحقق من طبقة البيانات",t=[{depth:2,id:"إضافة-نموذج-المهمة-إلى-طبقة-api",text:"إضافة نموذج المهمة إلى طبقة API"}],e=`<p>ما زلنا نضع ثقة كبيرة في طبقة قاعدة بياناتنا كذلك. وينبغي أن نتأكد من أنها تعيد إلينا ما نعتقد أنه هو.</p>
<p>هناك طرق عديدة لفعل ذلك، لكننا قد نبدأ بتجريد بسيط.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TaskClient</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">database</span>: <span class="hljs-title class_">Database</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">database</span>: <span class="hljs-title class_">Database</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span> = database;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">getTasks</span>(<span class="hljs-params">{ completed }: { completed: <span class="hljs-built_in">boolean</span> }</span>) {
    <span class="hljs-keyword">const</span> query = completed
      ? <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;SELECT * FROM tasks WHERE completed = 1&#x27;</span>)
      : <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;SELECT * FROM tasks WHERE completed = 0&#x27;</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">TasksSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> query.<span class="hljs-title function_">all</span>());
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">getTask</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> query = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;SELECT * FROM tasks WHERE id = ?&#x27;</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">or</span>(z.<span class="hljs-title function_">undefined</span>()).<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> query.<span class="hljs-title function_">get</span>([id]));
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">createTask</span>(<span class="hljs-params">{ task }: { task: NewTask }</span>) {
    <span class="hljs-keyword">const</span> query = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(
      <span class="hljs-string">&#x27;INSERT INTO tasks (title, description) VALUES (?, ?)&#x27;</span>,
    );
    <span class="hljs-keyword">await</span> query.<span class="hljs-title function_">run</span>([task.<span class="hljs-property">title</span>, task.<span class="hljs-property">description</span>]);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">updateTask</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">task</span>: <span class="hljs-title class_">NewTask</span></span>) {
    <span class="hljs-keyword">const</span> previous = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getTask</span>(id));
    <span class="hljs-keyword">const</span> updated = { ...previous, ...task };

    <span class="hljs-keyword">const</span> query = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(
      <span class="hljs-string">\`UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?\`</span>,
    );

    <span class="hljs-keyword">await</span> query.<span class="hljs-title function_">run</span>([updated.<span class="hljs-property">title</span>, updated.<span class="hljs-property">description</span>, updated.<span class="hljs-property">completed</span>, id]);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">deleteTask</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> query = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">database</span>.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;DELETE FROM tasks WHERE id = ?&#x27;</span>);
    <span class="hljs-keyword">await</span> query.<span class="hljs-title function_">run</span>([id]);
  }
}
</code></pre>
<h2 id="إضافة-نموذج-المهمة-إلى-طبقة-api">إضافة نموذج المهمة إلى طبقة API</h2>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
