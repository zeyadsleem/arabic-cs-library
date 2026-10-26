const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="adding-client-side-validation",p="إضافة التحقق من جهة العميل",t=[{depth:2,id:"التحقق-من-مهامنا",text:"التحقق من مهامنا"},{depth:2,id:"جلب-مهمة",text:"جلب مهمة"},{depth:2,id:"إنشاء-مهمة",text:"إنشاء مهمة"},{depth:2,id:"حذف-مهمة",text:"حذف مهمة"}],c=`<p>الآن وقد أعددنا كل شيء في تطبيق Express لدينا، فهل يمكننا فعل شيء مشابه في تطبيق React لدينا؟</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">NewTask</span>,
  <span class="hljs-title class_">NewTaskSchema</span>,
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">Task</span>,
  <span class="hljs-title class_">TaskSchema</span>,
  <span class="hljs-title class_">TasksSchema</span>,
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">UpdateTask</span>,
  <span class="hljs-title class_">UpdateTaskSchema</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;busy-bee-schema&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">API_URL</span> = <span class="hljs-string">&#x27;http://localhost:4001&#x27;</span>;
</code></pre>
<h2 id="التحقق-من-مهامنا">التحقق من مهامنا</h2>
<p>لنتأكد من أن استجابتنا هي ما نعتقد أنها كذلك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchTasks = <span class="hljs-title function_">async</span> (<span class="hljs-attr">showCompleted</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Task</span>[]&gt; =&gt; {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">\`/tasks\`</span>, <span class="hljs-variable constant_">API_URL</span>);

  <span class="hljs-keyword">if</span> (showCompleted) {
    url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;completed&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
  }

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch tasks&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-title class_">TasksSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>());
};
</code></pre>
<h2 id="جلب-مهمة">جلب مهمة</h2>
<p>سنتحقق من مهمة واحدة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Task</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">\`/tasks/<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-variable constant_">API_URL</span>);
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch task&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>());
};
</code></pre>
<h2 id="إنشاء-مهمة">إنشاء مهمة</h2>
<p>بالنسبة إلى طلبات <code>POST</code>، سنرغب في التحقق من الجسم.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">task</span>: <span class="hljs-title class_">NewTask</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-variable constant_">API_URL</span>);

  <span class="hljs-keyword">const</span> body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(<span class="hljs-title class_">NewTaskSchema</span>.<span class="hljs-title function_">parse</span>(task));

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    },
    body,
  });

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to create task&#x27;</span>);
  }
};
</code></pre>
<p>لنتحقق من الجسم الخاص بتحديث المهمة أيضًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">task</span>: <span class="hljs-title class_">UpdateTask</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">\`/tasks/<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-variable constant_">API_URL</span>);

  <span class="hljs-keyword">const</span> body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(<span class="hljs-title class_">UpdateTaskSchema</span>.<span class="hljs-title function_">parse</span>(task));

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    },
    body,
  });

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to update task&#x27;</span>);
  }
};
</code></pre>
<h2 id="حذف-مهمة">حذف مهمة</h2>
<p>لا يوجد في الواقع شيء نفعله هنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">\`/tasks/<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-variable constant_">API_URL</span>);

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
  });

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete task&#x27;</span>);
  }
};
</code></pre>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/full-stack-typescript/validating-the-data-layer">التحقق من طبقة البيانات</a></p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
