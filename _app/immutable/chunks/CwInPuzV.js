const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="typing-express-with-zod-walkthrough",p="إضافة الأنواع إلى Express مع Zod",t=[{depth:2,id:"التحقق-من-المهام-القادمة-من-قاعدة-البيانات",text:"التحقق من المهام القادمة من قاعدة البيانات"},{depth:3,id:"التحقق-من-كل-المهام",text:"التحقق من كل المهام"},{depth:2,id:"إضافة-التحقق-من-المخطط-إلى-جسم-الطلب",text:"إضافة التحقق من المخطط إلى جسم الطلب"},{depth:3,id:"تحديث-المهام",text:"تحديث المهام"},{depth:2,id:"التالي",text:"التالي"}],e=`<p>لنضف بعض التحقق من المخطط إلى تطبيق Express لدينا. وسنبدأ برسم مخططاتنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">description</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">completed</span>: z.<span class="hljs-title function_">boolean</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">NewTaskSchema</span> = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">omit</span>({ <span class="hljs-attr">id</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> });
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UpdateTaskSchema</span> = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">partial</span>().<span class="hljs-title function_">omit</span>({ <span class="hljs-attr">id</span>: <span class="hljs-literal">true</span> });
</code></pre>
<h2 id="التحقق-من-المهام-القادمة-من-قاعدة-البيانات">التحقق من المهام القادمة من قاعدة البيانات</h2>
<p>الخطوة الأولى هي التأكد من أن ما نسترجعه من قاعدة البيانات صالح.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Validate the task</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">parse</span>(task);

<span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>(result);
</code></pre>
<p>سينفجر الأمر تقنيًا، لكن السبب أن SQLite تخزّن قيمة <code>completed</code> المنطقية إما كـ <code>1</code> أو <code>0</code>. ولحسن الحظ، يمكننا تحويلها قسريًا إلى ما نتوقعه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">number</span>(),
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">description</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">completed</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">boolean</span>(),
});
</code></pre>
<p>ويمكننا أيضًا اختيار اختصار كل شيء هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> task = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">or</span>(z.<span class="hljs-title function_">undefined</span>()).<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> getTask.<span class="hljs-title function_">get</span>([id]));
</code></pre>
<h3 id="التحقق-من-كل-المهام">التحقق من كل المهام</h3>
<p>يمكننا فعل شيء مشابه للمسار <code>/tasks</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TasksSchema</span> = z.<span class="hljs-title function_">array</span>(<span class="hljs-title class_">TaskSchema</span>);
</code></pre>
<p>وسيصبح الآن بهذا الشكل:</p>
<pre><code class="language-typescript">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
  <span class="hljs-keyword">const</span> { completed } = req.<span class="hljs-property">query</span>;
  <span class="hljs-keyword">const</span> query = completed === <span class="hljs-string">&#x27;true&#x27;</span> ? completedTasks : incompleteTasks;

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> tasks = <span class="hljs-title class_">TasksSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> query.<span class="hljs-title function_">all</span>());
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>(tasks);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
  }
});
</code></pre>
<h2 id="إضافة-التحقق-من-المخطط-إلى-جسم-الطلب">إضافة التحقق من المخطط إلى جسم الطلب</h2>
<p>يمكننا استخدام <code>NewTaskSchema</code> هنا.</p>
<pre><code class="language-typescript">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> task = <span class="hljs-title class_">NewTaskSchema</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-keyword">await</span> createTask.<span class="hljs-title function_">run</span>([task.<span class="hljs-property">title</span>, task.<span class="hljs-property">description</span>]);
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">sendStatus</span>(<span class="hljs-number">201</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
  }
});
</code></pre>
<h3 id="تحديث-المهام">تحديث المهام</h3>
<p>ومرة أخرى، لا مفاجآت هنا.</p>
<pre><code class="language-typescript">app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/tasks/:id&#x27;</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> { id } = req.<span class="hljs-property">params</span>;

    <span class="hljs-keyword">const</span> previous = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> getTask.<span class="hljs-title function_">get</span>([id]));
    <span class="hljs-keyword">const</span> updates = <span class="hljs-title class_">UpdateTaskSchema</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-keyword">const</span> task = { ...previous, ...updates };

    <span class="hljs-keyword">await</span> updateTask.<span class="hljs-title function_">run</span>([task.<span class="hljs-property">title</span>, task.<span class="hljs-property">description</span>, task.<span class="hljs-property">completed</span>, id]);
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">sendStatus</span>(<span class="hljs-number">200</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
  }
});
</code></pre>
<h2 id="التالي">التالي</h2>
<ul>
<li><a href="https://stevekinney.com/courses/full-stack-typescript/express-zod-params">التحقق من معاملات الطلب</a></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
