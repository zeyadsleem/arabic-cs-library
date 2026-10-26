const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",t="trpc-on-the-server",p="استخدام tRPC على الخادم",e=[{depth:2,id:"تثبيت-الاعتمادات",text:"تثبيت الاعتمادات"},{depth:2,id:"تعريف-واجهة-trpc-البرمجية",text:"تعريف واجهة tRPC البرمجية"},{depth:3,id:"إنشاء-قاعدة-trpc",text:"إنشاء قاعدة tRPC"},{depth:3,id:"إعداد-السياق",text:"إعداد السياق"},{depth:3,id:"إنشاء-محول-لـ-express",text:"إنشاء محوّل لـ Express"},{depth:3,id:"إضافة-trpc-إلى-تطبيق-express-لديك",text:"إضافة tRPC إلى تطبيق Express لديك"},{depth:2,id:"استخدام-trpc",text:"استخدام tRPC"},{depth:2,id:"فوائد-trpc",text:"فوائد tRPC"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],l=`<h2 id="تثبيت-الاعتمادات">تثبيت الاعتمادات</h2>
<pre><code class="language-bash">npm install express @trpc/server zod sqlite3
npm install -D typescript ts-node nodemon @types/node @types/express
</code></pre>
<ul>
<li><a href="https://npm.im/express"><code>express</code></a>: لخادم HTTP الخاص بنا.</li>
<li><a href="https://npm.im/@trpc/server"><code>@trpc/server</code></a>: لنواة tRPC وتكاملها مع Express.</li>
<li><a href="https://npm.im/zod"><code>zod</code></a>: مكتبة للتحقق من المخططات (الرفيق الذي لا يكلّ في التحقق من المدخلات).</li>
<li><a href="https://npm.im/sqlite3"><code>sqlite3</code></a>: مشغّل قاعدة البيانات في مثالنا (لأن «SQLite أو لا شيء» في الأمثلة السريعة).</li>
<li><a href="https://npm.im/typescript"><code>typescript</code></a>: أنت تعرف السبب.</li>
</ul>
<h2 id="تعريف-واجهة-trpc-البرمجية">تعريف واجهة tRPC البرمجية</h2>
<p>يعمل tRPC حول <strong>الموجّهات (routers)</strong> (مجموعات من الإجراءات) و<strong>الإجراءات (procedures)</strong> (دوال يمكن أن تكون استعلامات أو تعديلات أو اشتراكات).</p>
<h3 id="إنشاء-قاعدة-trpc">إنشاء قاعدة tRPC</h3>
<p>أنشئ ملف <code>trpc.ts</code> يهيّئ الوظائف الأساسية لـ tRPC:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { initTRPC } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/server&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">NewTaskSchema</span>,
  <span class="hljs-title class_">TaskParamsSchema</span>,
  <span class="hljs-title class_">TaskQuerySchema</span>,
  <span class="hljs-title class_">UpdateTaskSchema</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;busy-bee-schema&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./trpc-context.js&#x27;</span>;

<span class="hljs-comment">// Initialize tRPC with context</span>
<span class="hljs-keyword">const</span> t = initTRPC.<span class="hljs-property">context</span>&lt;<span class="hljs-title class_">Context</span>&gt;().<span class="hljs-title function_">create</span>();

<span class="hljs-comment">// Create router and procedure helpers</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> router = t.<span class="hljs-property">router</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> publicProcedure = t.<span class="hljs-property">procedure</span>;

<span class="hljs-comment">// Create the task router with procedures</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> taskRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-comment">// Get all tasks with optional filtering by completion status</span>
  <span class="hljs-attr">getTasks</span>: publicProcedure
    .<span class="hljs-title function_">input</span>(<span class="hljs-title class_">TaskQuerySchema</span>) <span class="hljs-comment">// Use Zod schema for input validation</span>
    .<span class="hljs-title function_">query</span>(<span class="hljs-title function_">async</span> ({ input, ctx }) =&gt; {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">taskClient</span>.<span class="hljs-title function_">getTasks</span>(input);
    }),

  <span class="hljs-comment">// Get a single task by ID</span>
  <span class="hljs-attr">getTask</span>: publicProcedure.<span class="hljs-title function_">input</span>(<span class="hljs-title class_">TaskParamsSchema</span>).<span class="hljs-title function_">query</span>(<span class="hljs-title function_">async</span> ({ input, ctx }) =&gt; {
    <span class="hljs-keyword">const</span> task = <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">taskClient</span>.<span class="hljs-title function_">getTask</span>(input.<span class="hljs-property">id</span>);
    <span class="hljs-keyword">return</span> task;
  }),

  <span class="hljs-comment">// Create a new task</span>
  <span class="hljs-attr">createTask</span>: publicProcedure.<span class="hljs-title function_">input</span>(<span class="hljs-title class_">NewTaskSchema</span>).<span class="hljs-title function_">mutation</span>(<span class="hljs-title function_">async</span> ({ input, ctx }) =&gt; {
    <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">taskClient</span>.<span class="hljs-title function_">createTask</span>({ <span class="hljs-attr">task</span>: input });
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
  }),

  <span class="hljs-comment">// Update an existing task</span>
  <span class="hljs-attr">updateTask</span>: publicProcedure
    .<span class="hljs-title function_">input</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">id</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>(),
        <span class="hljs-attr">task</span>: <span class="hljs-title class_">UpdateTaskSchema</span>,
      }),
    )
    .<span class="hljs-title function_">mutation</span>(<span class="hljs-title function_">async</span> ({ input, ctx }) =&gt; {
      <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">taskClient</span>.<span class="hljs-title function_">updateTask</span>(input.<span class="hljs-property">id</span>, input.<span class="hljs-property">task</span>);
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
    }),

  <span class="hljs-comment">// Delete a task</span>
  <span class="hljs-attr">deleteTask</span>: publicProcedure.<span class="hljs-title function_">input</span>(<span class="hljs-title class_">TaskParamsSchema</span>).<span class="hljs-title function_">mutation</span>(<span class="hljs-title function_">async</span> ({ input, ctx }) =&gt; {
    <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">taskClient</span>.<span class="hljs-title function_">deleteTask</span>(input.<span class="hljs-property">id</span>);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
  }),
});

<span class="hljs-comment">// Create the app router</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">task</span>: taskRouter,
});

<span class="hljs-comment">// Export type definition of API for client usage</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppRouter</span> = <span class="hljs-keyword">typeof</span> appRouter;
</code></pre>
<h3 id="إعداد-السياق">إعداد السياق</h3>
<p>أنشئ ملف <code>trpc-context.ts</code> لتزويد كل إجراءات tRPC بالسياق اللازم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { inferAsyncReturnType } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/server&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TaskClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./client.js&#x27;</span>;
<span class="hljs-keyword">import</span> { getDatabase } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./database.js&#x27;</span>;

<span class="hljs-comment">/**
 * Creates context for tRPC procedures
 * Initializes database connection and task client
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createContext</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> database = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getDatabase</span>();
  <span class="hljs-keyword">const</span> taskClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TaskClient</span>(database);

  <span class="hljs-keyword">return</span> {
    taskClient,
  };
}

<span class="hljs-comment">// Export the context type for use in tRPC setup</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Context</span> = inferAsyncReturnType&lt;<span class="hljs-keyword">typeof</span> createContext&gt;;
</code></pre>
<h3 id="إنشاء-محول-لـ-express">إنشاء محوّل لـ Express</h3>
<p>أنشئ ملف <code>trpc-adapter.ts</code> لدمج tRPC مع Express:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createExpressMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/server/adapters/express&#x27;</span>;
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { createContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./trpc-context.js&#x27;</span>;
<span class="hljs-keyword">import</span> { appRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./trpc.js&#x27;</span>;

<span class="hljs-comment">/**
 * Creates an Express router with tRPC endpoints
 * <span class="hljs-doctag">@returns</span> Express router with tRPC middleware
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createTRPCRouter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> router = express.<span class="hljs-title class_">Router</span>();

  router.<span class="hljs-title function_">use</span>(
    <span class="hljs-string">&#x27;/trpc&#x27;</span>,
    <span class="hljs-title function_">createExpressMiddleware</span>({
      <span class="hljs-attr">router</span>: appRouter,
      createContext,
    }),
  );

  <span class="hljs-keyword">return</span> router;
}
</code></pre>
<h3 id="إضافة-trpc-إلى-تطبيق-express-لديك">إضافة tRPC إلى تطبيق Express لديك</h3>
<p>حدّث ملف <code>server.ts</code> الرئيسي لديك ليتضمّن موجّه tRPC:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createTRPCRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./trpc-adapter.js&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createServer</span>(<span class="hljs-params"><span class="hljs-attr">database</span>: <span class="hljs-title class_">Database</span></span>) {
  <span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
  app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">cors</span>());
  app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

  <span class="hljs-comment">// Add tRPC router</span>
  app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, <span class="hljs-title function_">createTRPCRouter</span>());

  <span class="hljs-comment">// ... rest of your Express setup</span>
}
</code></pre>
<h2 id="استخدام-trpc">استخدام tRPC</h2>
<p>بعد تنفيذ هذه الخطوات، ستكون واجهة tRPC البرمجية متاحة على:</p>
<pre><code class="language-typescript">/api/cprt / [procedure - path];
</code></pre>
<p>على سبيل المثال:</p>
<ul>
<li><code>GET /api/trpc/task.getTasks</code> - جلب كل المهام</li>
<li><code>GET /api/trpc/task.getTask</code> - جلب مهمة محدّدة بعينها</li>
<li><code>POST /api/trpc/task.createTask</code> - إنشاء مهمة</li>
<li><code>POST /api/trpc/task.updateTask</code> - تحديث مهمة</li>
<li><code>POST /api/trpc/task.deleteTask</code> - حذف مهمة</li>
</ul>
<h2 id="فوائد-trpc">فوائد tRPC</h2>
<ol>
<li><strong>أمان الأنواع</strong>: أمان كامل للأنواع من طرف إلى طرف بين العميل والخادم</li>
<li><strong>التحقق من المخططات</strong>: تحقّق تلقائي من المدخلات باستخدام مخططات Zod</li>
<li><strong>تجربة المطوّر</strong>: إكمال تلقائي أفضل وفحص للأنواع في محرّرك</li>
<li><strong>توثيق الواجهة البرمجية</strong>: تعمل تعريفات الأنواع كتوثيق لواجهتك البرمجية</li>
<li><strong>الأداء</strong>: يستخدم tRPC تقنية WebSockets للاشتراكات ونقلًا فعّالًا للبيانات</li>
</ol>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<ul>
<li>أنشئ عميل tRPC في تطبيق الواجهة الأمامية لديك لاستهلاك نقاط النهاية هذه</li>
<li>أضف وسيطًا للمصادقة والتفويض</li>
<li>نفّذ استراتيجيات لمعالجة الأخطاء</li>
<li>أضف إجراءات أكثر تعقيدًا بموجّهات متداخلة</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
