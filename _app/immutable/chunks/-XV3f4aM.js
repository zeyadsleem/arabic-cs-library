const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="generating-types-from-open-api",l="توليد الأنواع من مواصفة OpenAPI",t=[{depth:2,id:"توليد-عميل-من-أنواع-openapi",text:"توليد عميل من أنواع OpenAPI"},{depth:3,id:"إنشاء-عميل-api-آمن-الأنواع",text:"إنشاء عميل API آمن الأنواع"},{depth:2,id:"تنفيذ-دوال-api-آمنة-الأنواع",text:"تنفيذ دوال API آمنة الأنواع"},{depth:3,id:"جلب-مجموعة-get",text:"جلب مجموعة (GET)"},{depth:3,id:"جلب-مورد-واحد-get-مع-معامل-مسار",text:"جلب مورد واحد (GET مع معامل مسار)"},{depth:3,id:"إنشاء-مورد-post",text:"إنشاء مورد (POST)"},{depth:3,id:"تحديث-مورد-put",text:"تحديث مورد (PUT)"},{depth:3,id:"حذف-مورد-delete",text:"حذف مورد (DELETE)"},{depth:2,id:"فوائد-هذا-النهج",text:"فوائد هذا النهج"}],e=`<p>بعد أن تصبح لديك مواصفة OpenAPI، يمكنك استخدام <a href="https://npm.im/openapi-typescript"><code>openapi-typescript</code></a> لتوليد الأنواع.</p>
<pre><code class="language-bash">npx openapi-typescript ./openapi.json -o src/api.types.ts
</code></pre>
<p>النتائج كبيرة ومتشابكة. ويمكنك إلقاء نظرة على المخرجات <a href="https://gist.github.com/stevekinney/a43731e45e8822bc0b7b7d814938ab27">هنا</a>.</p>
<h2 id="توليد-عميل-من-أنواع-openapi">توليد عميل من أنواع OpenAPI</h2>
<p>الآن وقد صارت لدينا الأنواع، يمكننا توليد عميل تلقائيًا. بل لم نعد نحتاج إلى Zod!</p>
<p>لنبدأ بتوليد تعريفات الأنواع من مواصفة OpenAPI لديك:</p>
<pre><code class="language-bash">npx openapi-typescript openapi.json -o src/api.types.ts
</code></pre>
<p>وهذا ينشئ ملف TypeScript بتعريفات أنواع تطابق بنية API لديك.</p>
<h3 id="إنشاء-عميل-api-آمن-الأنواع">إنشاء عميل API آمن الأنواع</h3>
<p>لنُنفّذ الآن عميل API باستخدام الأنواع المولَّدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// src/api.ts</span>
<span class="hljs-keyword">import</span> createClient <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;openapi-fetch&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { paths } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api.types&#x27;</span>;

<span class="hljs-comment">// Set your API base URL</span>

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">API_URL</span> = <span class="hljs-string">&#x27;http://localhost:4001&#x27;</span>;

<span class="hljs-comment">// Create the client with type information</span>

<span class="hljs-keyword">const</span> { <span class="hljs-variable constant_">GET</span>, <span class="hljs-variable constant_">POST</span>, <span class="hljs-variable constant_">PUT</span>, <span class="hljs-variable constant_">DELETE</span> } = createClient&lt;paths&gt;({ <span class="hljs-attr">baseUrl</span>: <span class="hljs-variable constant_">API_URL</span> });
</code></pre>
<h2 id="تنفيذ-دوال-api-آمنة-الأنواع">تنفيذ دوال API آمنة الأنواع</h2>
<p>لنستبدل نداءات fetch التقليدية بدوال API متنمّطة:</p>
<h3 id="جلب-مجموعة-get">جلب مجموعة (GET)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTasks</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">showCompleted</span>: <span class="hljs-built_in">boolean</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> { data, error } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">GET</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">query</span>: showCompleted ? { <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> } : {},
    },
  });

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch tasks&#x27;</span>);

  <span class="hljs-keyword">return</span> data || [];
};
</code></pre>
<h3 id="جلب-مورد-واحد-get-مع-معامل-مسار">جلب مورد واحد (GET مع معامل مسار)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">getTask</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> { data, error } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">GET</span>(<span class="hljs-string">&#x27;/tasks/{id}&#x27;</span>, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">path</span>: { <span class="hljs-attr">id</span>: <span class="hljs-title class_">Number</span>(id) },
    },
  });

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch task&#x27;</span>);

  <span class="hljs-keyword">return</span> data;
};
</code></pre>
<h3 id="إنشاء-مورد-post">إنشاء مورد (POST)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">createTask</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">task</span>: { title: <span class="hljs-built_in">string</span>; description?: <span class="hljs-built_in">string</span> }</span>) =&gt; {
  <span class="hljs-keyword">const</span> { error } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">POST</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, {
    <span class="hljs-attr">body</span>: task,
  });

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to create task&#x27;</span>);
};
</code></pre>
<h3 id="تحديث-مورد-put">تحديث مورد (PUT)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateTask</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params">
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>,

  <span class="hljs-attr">task</span>: { title?: <span class="hljs-built_in">string</span>; description?: <span class="hljs-built_in">string</span>; completed?: <span class="hljs-built_in">boolean</span> },
</span>) =&gt; {
  <span class="hljs-keyword">const</span> { error } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">PUT</span>(<span class="hljs-string">&#x27;/tasks/{id}&#x27;</span>, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">path</span>: { <span class="hljs-attr">id</span>: <span class="hljs-title class_">Number</span>(id) },
    },

    <span class="hljs-attr">body</span>: task,
  });

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to update task&#x27;</span>);
};
</code></pre>
<h3 id="حذف-مورد-delete">حذف مورد (DELETE)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTask</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> { error } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">DELETE</span>(<span class="hljs-string">&#x27;/tasks/{id}&#x27;</span>, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">path</span>: { <span class="hljs-attr">id</span>: <span class="hljs-title class_">Number</span>(id) },
    },
  });

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete task&#x27;</span>);
};
</code></pre>
<h2 id="فوائد-هذا-النهج">فوائد هذا النهج</h2>
<ol>
<li><strong>سلامة الأنواع</strong>: التقاط الأخطاء في وقت التصريف بدلًا من وقت التشغيل</li>
<li><strong>تجربة المطوّر</strong>:</li>
</ol>
<ul>
<li>إكمال تلقائي لنقاط نهاية API</li>
<li>تلميحات أنواع للمعاملات المطلوبة والاختيارية</li>
<li>تنميط سليم لأجسام الطلبات والاستجابات</li>
</ul>
<ol>
<li><strong>معالجة الأخطاء</strong>: نمط متسق لمعالجة الأخطاء</li>
<li><strong>قابلية الصيانة</strong>: عندما يتغيّر API، حدّث مواصفة OpenAPI وأعد توليد الأنواع</li>
</ol>
<p>إن استخدام <code>openapi-fetch</code> مع أنواع TypeScript المولَّدة ينشئ عميل API سهلًا للغاية وآمن الأنواع، يحسّن إنتاجية المطوّر ويقلل أخطاء وقت التشغيل. ومع تطوّر API لديك، ما عليك سوى تحديث مواصفة OpenAPI وإعادة توليد الأنواع لإبقاء عميلك متزامنًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
