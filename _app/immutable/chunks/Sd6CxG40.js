const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="typesafe-database-with-prisma",e="قاعدة بيانات آمنة الأنواع مع Prisma",l=[{depth:2,id:"تهيئة-prisma",text:"تهيئة Prisma"},{depth:2,id:"دمج-prisma-في-خادم-express-لديك",text:"دمج Prisma في خادم Express لديك"},{depth:3,id:"استبدال-توابع-crud",text:"استبدال توابع CRUD"},{depth:3,id:"get-tasks",text:"GET /tasks"},{depth:3,id:"get-tasksid",text:"GET /tasks/:id"},{depth:3,id:"post-tasks",text:"POST /tasks"},{depth:3,id:"put-tasksid",text:"PUT /tasks/:id"},{depth:3,id:"delete-tasksid",text:"DELETE /tasks/:id"},{depth:2,id:"مثال-serverts-المحدث-بالكامل",text:"مثال server.ts المحدَّث بالكامل"}],t=`<p>في ما يلي درس تعليمي خطوة بخطوة لا يوضّح لك كيفية إعداد Prisma مع Express و TypeScript لتطبيق مهام بسيط فحسب، بل يسلّط الضوء أيضًا على التغييرات التي أجريتها — باستبدالك عميل <code>TaskClient</code> المخصّص لديك بـ Prisma للحصول على أمان كامل للأنواع. لِنبدأ.</p>
<h2 id="تهيئة-prisma">تهيئة Prisma</h2>
<p>هيّئ Prisma بتشغيل:</p>
<pre><code class="language-bash">npx prisma init
</code></pre>
<p>ينشئ هذا مجلد <code>prisma/</code> يحتوي على ملف <code>schema.prisma</code>. حرّر الملف لتعريف نموذج Task لديك:</p>
<pre><code class="language-prisma">datasource db {
  provider = &quot;sqlite&quot;
  url      = &quot;file:./dev.db&quot;
}

generator client {
  provider = &quot;prisma-client-js&quot;
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
}
</code></pre>
<p>ثم شغّل ترحيلًا وولّد عميل Prisma:</p>
<pre><code class="language-bash">npx prisma migrate dev --name init
npx prisma generate
</code></pre>
<h2 id="دمج-prisma-في-خادم-express-لديك">دمج Prisma في خادم Express لديك</h2>
<p>في السابق كنت تستخدم <code>TaskClient</code> مخصّصًا (ونوع <code>Database</code> من SQLite) للتعامل مع عمليات قاعدة البيانات لديك. والآن ننتقل إلى Prisma للحصول على أمان أنواع حقيقي. وإليك نظرة على الفرق مع التغييرات:</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/server/src/server.ts b/server/src/server.ts</span>
<span class="hljs-comment">index bbdd593..53ee07a 100644</span>
<span class="hljs-comment">--- a/server/src/server.ts</span>
<span class="hljs-comment">+++ b/server/src/server.ts</span>
<span class="hljs-meta">@@ -1,8 +1,10 @@</span>
 import cors from &#x27;cors&#x27;;
 import express from &#x27;express&#x27;;
<span class="hljs-deletion">-import type { Database } from &#x27;sqlite&#x27;;</span>
 import swaggerUi from &#x27;swagger-ui-express&#x27;;

<span class="hljs-addition">+import { PrismaClient } from &#x27;@prisma/client&#x27;;</span>
<span class="hljs-addition">+const prisma = new PrismaClient();</span>
<span class="hljs-addition">+</span>
</code></pre>
<h3 id="استبدال-توابع-crud">استبدال توابع CRUD</h3>
<p>بدلًا من استدعاء توابع على عميلك المخصّص، تستخدم الآن توابع Prisma:</p>
<h3 id="get-tasks"><code>GET /tasks</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> tasks = <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">findMany</span>();
</code></pre>
<h3 id="get-tasksid"><code>GET /tasks/:id</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> task = <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">findUnique</span>({ <span class="hljs-attr">where</span>: { id } });
</code></pre>
<h3 id="post-tasks"><code>POST /tasks</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">create</span>({ <span class="hljs-attr">data</span>: task });
</code></pre>
<h3 id="put-tasksid"><code>PUT /tasks/:id</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> data = req.<span class="hljs-property">body</span>;
<span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">update</span>({ <span class="hljs-attr">where</span>: { id }, data });
</code></pre>
<h3 id="delete-tasksid"><code>DELETE /tasks/:id</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">where</span>: { id } });
</code></pre>
<h2 id="مثال-serverts-المحدث-بالكامل">مثال <code>server.ts</code> المحدَّث بالكامل</h2>
<p>إليك كيف قد يبدو ملف <code>server.ts</code> الكامل لديك بعد دمج Prisma:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> cors <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cors&#x27;</span>;
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> swaggerUi <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;swagger-ui-express&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@prisma/client&#x27;</span>;
<span class="hljs-keyword">const</span> prisma = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PrismaClient</span>();

<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">NewTaskSchema</span>,
  <span class="hljs-title class_">TaskParamsSchema</span>,
  <span class="hljs-title class_">TaskQuerySchema</span>,
  <span class="hljs-title class_">UpdateTaskSchema</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;busy-bee-schema&#x27;</span>;

<span class="hljs-keyword">import</span> { handleError } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./handle-error.js&#x27;</span>;
<span class="hljs-keyword">import</span> { openApiDocument } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./openapi.js&#x27;</span>;
<span class="hljs-keyword">import</span> { validate } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./validate.js&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createServer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
  app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">cors</span>());
  app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

  <span class="hljs-comment">// Serve OpenAPI docs</span>
  app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api-docs&#x27;</span>, swaggerUi.<span class="hljs-property">serve</span>, swaggerUi.<span class="hljs-title function_">setup</span>(openApiDocument));

  <span class="hljs-comment">// Expose OpenAPI spec as JSON</span>
  app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/openapi.json&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    res.<span class="hljs-title function_">json</span>(openApiDocument);
  });

  app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-title function_">validate</span>({ <span class="hljs-attr">query</span>: <span class="hljs-title class_">TaskQuerySchema</span> }), <span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> tasks = <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">findMany</span>();
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>(tasks);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
    }
  });

  <span class="hljs-comment">// Get a specific task</span>
  app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/tasks/:id&#x27;</span>, <span class="hljs-title function_">validate</span>({ <span class="hljs-attr">params</span>: <span class="hljs-title class_">TaskParamsSchema</span> }), <span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> { id } = req.<span class="hljs-property">params</span>;
      <span class="hljs-keyword">const</span> task = <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">findUnique</span>({ <span class="hljs-attr">where</span>: { id } });

      <span class="hljs-keyword">if</span> (!task) <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">404</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Task not found&#x27;</span> });

      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>(task);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
    }
  });

  app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-title function_">validate</span>({ <span class="hljs-attr">body</span>: <span class="hljs-title class_">NewTaskSchema</span> }), <span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> task = req.<span class="hljs-property">body</span>;
      <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">create</span>({ <span class="hljs-attr">data</span>: task });
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Task created successfully&#x27;</span> });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
    }
  });

  <span class="hljs-comment">// Update a task</span>
  app.<span class="hljs-title function_">put</span>(
    <span class="hljs-string">&#x27;/tasks/:id&#x27;</span>,
    <span class="hljs-title function_">validate</span>({ <span class="hljs-attr">params</span>: <span class="hljs-title class_">TaskParamsSchema</span>, <span class="hljs-attr">body</span>: <span class="hljs-title class_">UpdateTaskSchema</span> }),
    <span class="hljs-title function_">async</span> (req, res) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> { id } = req.<span class="hljs-property">params</span>;

        <span class="hljs-keyword">const</span> data = req.<span class="hljs-property">body</span>;
        <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">update</span>({ <span class="hljs-attr">where</span>: { id }, data });

        <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Task updated successfully&#x27;</span> });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
      }
    },
  );

  <span class="hljs-comment">// Delete a task</span>
  app.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/tasks/:id&#x27;</span>, <span class="hljs-title function_">validate</span>({ <span class="hljs-attr">params</span>: <span class="hljs-title class_">TaskParamsSchema</span> }), <span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> { id } = req.<span class="hljs-property">params</span>;
      <span class="hljs-keyword">await</span> prisma.<span class="hljs-property">task</span>.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">where</span>: { id } });
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Task deleted successfully&#x27;</span> });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
    }
  });

  <span class="hljs-keyword">return</span> app;
}
</code></pre>
<p><em>ملاحظة:</em> تأكد من التعامل مع تحويلات الأنواع إذا كانت معاملات مساراتك (مثل <code>id</code>) تحتاج إلى أن تكون أرقامًا. ووفقًا لمخطط Prisma لديك، قد تحتاج إلى تحويل <code>id</code> من نص إلى رقم (مثلًا باستخدام <code>Number(id)</code>).</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:e,headings:l,html:t};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,t as html,p as slug,e as title};
