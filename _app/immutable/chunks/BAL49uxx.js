const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="zod-to-open-api",l="من Zod إلى OpenAPI",t=[{depth:2,id:"توسيع-مخططات-zod-ببيانات-openapi-الوصفية",text:"توسيع مخططات Zod ببيانات OpenAPI الوصفية"},{depth:2,id:"تعريف-مستند-openapi",text:"تعريف مستند OpenAPI"},{depth:2,id:"الوصول-إلى-التوثيق",text:"الوصول إلى التوثيق"}],e=`<p>لنمرّ عبر عملية إضافة توثيق OpenAPI إلى خادم Express مكتوب بـ TypeScript يستخدم Zod للتحقق.</p>
<h2 id="توسيع-مخططات-zod-ببيانات-openapi-الوصفية">توسيع مخططات Zod ببيانات OpenAPI الوصفية</h2>
<p>أنشئ ملفًا جديدًا <code>openapi.ts</code> سيحوّل مخططات Zod لديك إلى صيغة OpenAPI:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { extendZodWithOpenApi, generateSchema } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@anatine/zod-openapi&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">OpenAPIObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;openapi3-ts/oas31&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> schemas <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./your-schemas&#x27;</span>; <span class="hljs-comment">// Import your Zod schemas</span>

<span class="hljs-title function_">extendZodWithOpenApi</span>(z);

<span class="hljs-comment">// Define TaskSchema with OpenAPI metadata</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskSchema</span> = schemas.<span class="hljs-property">TaskSchema</span>.<span class="hljs-title function_">openapi</span>({
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;A task item&#x27;</span>,
  <span class="hljs-attr">example</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Complete OpenAPI integration&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Add OpenAPI specs to the tasks API&#x27;</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
  },
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TasksSchema</span> = schemas.<span class="hljs-property">TasksSchema</span>.<span class="hljs-title function_">openapi</span>({
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;A collection of task items&#x27;</span>,
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">NewTaskSchema</span> = schemas.<span class="hljs-property">NewTaskSchema</span>.<span class="hljs-title function_">openapi</span>({
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Data required to create a new task&#x27;</span>,
  <span class="hljs-attr">example</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Create a new task&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;This is a new task to be created&#x27;</span>,
  },
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UpdateTaskSchema</span> = schemas.<span class="hljs-property">UpdateTaskSchema</span>.<span class="hljs-title function_">openapi</span>({
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Data for updating an existing task&#x27;</span>,
  <span class="hljs-attr">example</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Updated task title&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Updated task description&#x27;</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>,
  },
});
</code></pre>
<h2 id="تعريف-مستند-openapi">تعريف مستند OpenAPI</h2>
<p>أضف مواصفة OpenAPI الكاملة إلى ملف <code>openapi.ts</code> لديك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">openApiDocument</span>: <span class="hljs-title class_">OpenAPIObject</span> = {
  <span class="hljs-attr">openapi</span>: <span class="hljs-string">&#x27;3.1.0&#x27;</span>,
  <span class="hljs-attr">info</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Tasks API&#x27;</span>,
    <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;1.0.0&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;API for managing tasks&#x27;</span>,
    <span class="hljs-attr">contact</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Steve Kinney&#x27;</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;hello@stevekinney.net&#x27;</span>,
    },
  },
  <span class="hljs-attr">paths</span>: {
    <span class="hljs-string">&#x27;/tasks&#x27;</span>: {
      <span class="hljs-attr">get</span>: {
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;Tasks&#x27;</span>],
        <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;Get all tasks&#x27;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Retrieve all tasks, optionally filtered by completion status&#x27;</span>,
        <span class="hljs-attr">parameters</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;completed&#x27;</span>,
            <span class="hljs-attr">in</span>: <span class="hljs-string">&#x27;query&#x27;</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">schema</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;boolean&#x27;</span>,
            },
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Filter tasks by completion status&#x27;</span>,
          },
        ],
        <span class="hljs-attr">responses</span>: {
          <span class="hljs-string">&#x27;200&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;List of tasks&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">TasksSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;500&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Server error&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
        },
      },
      <span class="hljs-attr">post</span>: {
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;Tasks&#x27;</span>],
        <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;Create a new task&#x27;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Add a new task to the database&#x27;</span>,
        <span class="hljs-attr">requestBody</span>: {
          <span class="hljs-attr">content</span>: {
            <span class="hljs-string">&#x27;application/json&#x27;</span>: {
              <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">NewTaskSchema</span>),
            },
          },
          <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">responses</span>: {
          <span class="hljs-string">&#x27;201&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task created successfully&#x27;</span>,
          },
          <span class="hljs-string">&#x27;400&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Invalid input&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;500&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Server error&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
        },
      },
    },
    <span class="hljs-string">&#x27;/tasks/{id}&#x27;</span>: {
      <span class="hljs-attr">get</span>: {
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;Tasks&#x27;</span>],
        <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;Get a task by ID&#x27;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Retrieve a single task by its ID&#x27;</span>,
        <span class="hljs-attr">parameters</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
            <span class="hljs-attr">in</span>: <span class="hljs-string">&#x27;path&#x27;</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">schema</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;integer&#x27;</span>,
            },
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;ID of the task to retrieve&#x27;</span>,
          },
        ],
        <span class="hljs-attr">responses</span>: {
          <span class="hljs-string">&#x27;200&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task found&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">TaskSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;404&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task not found&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;500&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Server error&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
        },
      },
      <span class="hljs-attr">put</span>: {
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;Tasks&#x27;</span>],
        <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;Update a task&#x27;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Update an existing task by its ID&#x27;</span>,
        <span class="hljs-attr">parameters</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
            <span class="hljs-attr">in</span>: <span class="hljs-string">&#x27;path&#x27;</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">schema</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;integer&#x27;</span>,
            },
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;ID of the task to update&#x27;</span>,
          },
        ],
        <span class="hljs-attr">requestBody</span>: {
          <span class="hljs-attr">content</span>: {
            <span class="hljs-string">&#x27;application/json&#x27;</span>: {
              <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">UpdateTaskSchema</span>),
            },
          },
          <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">responses</span>: {
          <span class="hljs-string">&#x27;200&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task updated successfully&#x27;</span>,
          },
          <span class="hljs-string">&#x27;404&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task not found&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;400&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Invalid input&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;500&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Server error&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
        },
      },
      <span class="hljs-attr">delete</span>: {
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;Tasks&#x27;</span>],
        <span class="hljs-attr">summary</span>: <span class="hljs-string">&#x27;Delete a task&#x27;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Delete a task by its ID&#x27;</span>,
        <span class="hljs-attr">parameters</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
            <span class="hljs-attr">in</span>: <span class="hljs-string">&#x27;path&#x27;</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">schema</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;integer&#x27;</span>,
            },
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;ID of the task to delete&#x27;</span>,
          },
        ],
        <span class="hljs-attr">responses</span>: {
          <span class="hljs-string">&#x27;200&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task deleted successfully&#x27;</span>,
          },
          <span class="hljs-string">&#x27;404&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Task not found&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
          <span class="hljs-string">&#x27;500&#x27;</span>: {
            <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Server error&#x27;</span>,
            <span class="hljs-attr">content</span>: {
              <span class="hljs-string">&#x27;application/json&#x27;</span>: {
                <span class="hljs-attr">schema</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
              },
            },
          },
        },
      },
    },
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">schemas</span>: {
      <span class="hljs-title class_">Task</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">TaskSchema</span>),
      <span class="hljs-title class_">Tasks</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">TasksSchema</span>),
      <span class="hljs-title class_">NewTask</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">NewTaskSchema</span>),
      <span class="hljs-title class_">UpdateTask</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">UpdateTaskSchema</span>),
      <span class="hljs-title class_">ErrorResponse</span>: <span class="hljs-title function_">generateSchema</span>(<span class="hljs-title class_">ErrorResponseSchema</span>),
    },
  },
};
</code></pre>
<p>ثم ادمجه مع خادم Express لديك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> swaggerUi <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;swagger-ui-express&#x27;</span>;
<span class="hljs-keyword">import</span> { openApiDocument } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./openapi&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createServer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
  app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

  <span class="hljs-comment">// Serve OpenAPI docs</span>
  app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api-docs&#x27;</span>, swaggerUi.<span class="hljs-property">serve</span>, swaggerUi.<span class="hljs-title function_">setup</span>(openApiDocument));

  <span class="hljs-comment">// Expose OpenAPI spec as JSON</span>
  app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/openapi.json&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    res.<span class="hljs-title function_">json</span>(openApiDocument);
  });

  <span class="hljs-comment">// Your existing routes...</span>

  <span class="hljs-keyword">return</span> app;
}
</code></pre>
<h2 id="الوصول-إلى-التوثيق">الوصول إلى التوثيق</h2>
<p>بعد التنفيذ، يمكنك الوصول إلى:</p>
<ul>
<li>توثيق API التفاعلي على: <code>/api-docs</code></li>
<li>مواصفة OpenAPI JSON الخام على: <code>/openapi.json</code></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
