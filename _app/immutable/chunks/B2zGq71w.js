const s="kinney",a="react-typescript",n="React مع TypeScript",l="fetching-data-usestate",p="جلب البيانات باستخدام `useState` و`useEffect`",t=[{depth:2,id:"النمط-الأساسي-للجلب",text:"النمط الأساسي للجلب"},{depth:2,id:"نمط-asyncawait-مع-معالجة-أخطاء-سليمة",text:"نمط async/await مع معالجة أخطاء سليمة"},{depth:2,id:"منع-سباقات-الطلبات-عبر-التنظيف",text:"منع سباقات الطلبات عبر التنظيف"},{depth:2,id:"استخدام-abortcontroller-للإلغاء-الحقيقي",text:"استخدام AbortController للإلغاء الحقيقي"},{depth:2,id:"خطاف-جلب-عام-لإعادة-الاستخدام",text:"خُطّاف جلب عام لإعادة الاستخدام"},{depth:2,id:"التعامل-مع-عدة-حالات-غير-متزامنة",text:"التعامل مع عدة حالات غير متزامنة"},{depth:2,id:"الجلب-المتوازي-عبر-promiseall",text:"الجلب المتوازي عبر Promise.all"},{depth:2,id:"الترقيم-الصفحي-والتمرير-اللانهائي",text:"الترقيم الصفحي والتمرير اللانهائي"},{depth:2,id:"البحث-المؤجل-debounced",text:"البحث المؤجَّل (Debounced)"},{depth:2,id:"منطق-إعادة-المحاولة-للطلبات-الفاشلة",text:"منطق إعادة المحاولة للطلبات الفاشلة"},{depth:2,id:"أفضل-الممارسات-والأخطاء-الشائعة",text:"أفضل الممارسات والأخطاء الشائعة"},{depth:3,id:"تعامل-دائما-مع-حالة-التحميل",text:"تعامل دائمًا مع حالة التحميل"},{depth:3,id:"لا-تنس-التنظيف",text:"لا تنسَ التنظيف"},{depth:3,id:"صرح-بأنواع-استجابات-الواجهة-البرمجية",text:"صرّح بأنواع استجابات الواجهة البرمجية"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],e=`<p>جلب البيانات هو النقطة التي تلتقي فيها تطبيقات React بالعالم الحقيقي، وهو أيضًا حيث يبدع TypeScript حقًا. حين تجمع بين <code>useState</code> و<code>useEffect</code> لجلب البيانات، يساعدك TypeScript على التعامل مع جميع الحالات الحدّية: حالات التحميل، ومعالجة الأخطاء، وسباقات الطلبات (race conditions)، والتنظيف (cleanup). لا مزيد من أخطاء «Cannot read property 'title' of undefined» في بيئة الإنتاج.</p>
<p>في هذا الدليل سنبني أنماطًا متينة لجلب البيانات باستخدام واجهة مهام JSONPlaceholder، بدءًا من الجلب الأساسي وصولًا إلى أنماط جاهزة للإنتاج مع معالجة أخطاء سليمة ومنع سباقات الطلبات.</p>
<h2 id="النمط-الأساسي-للجلب">النمط الأساسي للجلب</h2>
<p>لنبدأ بجلب بسيط يجلب كل المهام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }
        <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
      })
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[]</span>) =&gt;</span> {
        <span class="hljs-title function_">setTodos</span>(data);
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
        <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      });
  }, []); <span class="hljs-comment">// Empty dependency array = run once on mount</span>

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
          {todo.completed ? &#x27;✅&#x27; : &#x27;⭕&#x27;} {todo.title}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<p>هذا يعمل، لكن هناك عدة تحسينات يمكننا إجراءها لشيفرة الإنتاج.</p>
<h2 id="نمط-asyncawait-مع-معالجة-أخطاء-سليمة">نمط async/await مع معالجة أخطاء سليمة</h2>
<p>صياغة async/await أنظف تجعل معالجة الأخطاء أكثر وضوحًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ImprovedTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
        <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>); <span class="hljs-comment">// Clear previous errors</span>

        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setTodos</span>(data);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-comment">// Type guard to ensure we have an Error object</span>
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>) {
          <span class="hljs-title function_">setError</span>(err);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-title function_">setError</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;An unknown error occurred&#x27;</span>));
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchTodos</span>();
  }, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos ({todos.length})<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">readOnly</span> /&gt;</span>
            {todo.title}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="منع-سباقات-الطلبات-عبر-التنظيف">منع سباقات الطلبات عبر التنظيف</h2>
<p>حين تجلب البيانات اعتمادًا على الخصائص (props) أو الحالة، عليك التعامل مع الحالة التي يُحدَّث فيها المكوّن قبل اكتمال الطلب السابق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserTodos</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This flag prevents setting state after unmount</span>
    <span class="hljs-keyword">let</span> isCancelled = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchUserTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?userId=<span class="hljs-subst">\${userId}</span>\`</span>);

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to fetch todos for user <span class="hljs-subst">\${userId}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

        <span class="hljs-comment">// Only update state if this effect hasn&#x27;t been cancelled</span>
        <span class="hljs-keyword">if</span> (!isCancelled) {
          <span class="hljs-title function_">setTodos</span>(data);
          <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
        }
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">if</span> (!isCancelled) {
          <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>);
          <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
        }
      }
    };

    <span class="hljs-title function_">fetchUserTodos</span>();

    <span class="hljs-comment">// Cleanup function - runs when component unmounts or userId changes</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      isCancelled = <span class="hljs-literal">true</span>;
    };
  }, [userId]); <span class="hljs-comment">// Re-run when userId changes</span>

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos for user {userId}...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>User {userId}&#x27;s Todos<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">opacity:</span> <span class="hljs-attr">todo.completed</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span> }}&gt;</span>
            {todo.title}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استخدام-abortcontroller-للإلغاء-الحقيقي">استخدام AbortController للإلغاء الحقيقي</h2>
<p>للتحكم الأفضل، استخدم AbortController لإلغاء طلب الشبكة فعليًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CancellableTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>, {
          <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>, <span class="hljs-comment">// Pass the abort signal</span>
        });

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setTodos</span>(data);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-comment">// Check if the error is from aborting</span>
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>) {
          <span class="hljs-keyword">if</span> (err.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Fetch aborted&#x27;</span>);
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
          }
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchTodos</span>();

    <span class="hljs-comment">// Cleanup: abort the fetch if component unmounts</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خطاف-جلب-عام-لإعادة-الاستخدام">خُطّاف جلب عام لإعادة الاستخدام</h2>
<p>لنصنع خُطّافًا قابلًا لإعادة الاستخدام يتولى كل الشيفرة المتكرّرة (boilerplate):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic type for any API response</span>
<span class="hljs-keyword">function</span> useFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">dependencies</span>: <span class="hljs-built_in">any</span>[] = []) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
          <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
        });

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setData</span>(json);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; err.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-title function_">setError</span>(err);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchData</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, dependencies); <span class="hljs-comment">// Re-run when dependencies change</span>

  <span class="hljs-keyword">return</span> { data, isLoading, error, <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> {} };
}

<span class="hljs-comment">// Usage with type inference</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListWithHook</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> {
    <span class="hljs-attr">data</span>: todos,
    isLoading,
    error,
  } = useFetch&lt;<span class="hljs-title class_">Todo</span>[]&gt;(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!todos) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No todos found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-مع-عدة-حالات-غير-متزامنة">التعامل مع عدة حالات غير متزامنة</h2>
<p>حين تحتاج إلى تنسيق عدة عمليات جلب:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoWithUserInfo</span>(<span class="hljs-params">{ todoId }: { todoId: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [todo, setTodo] = useState&lt;<span class="hljs-title class_">Todo</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTodoAndUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
        <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

        <span class="hljs-comment">// Fetch todo first</span>
        <span class="hljs-keyword">const</span> todoResponse = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
          <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
        });

        <span class="hljs-keyword">if</span> (!todoResponse.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todo&#x27;</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">todoData</span>: <span class="hljs-title class_">Todo</span> = <span class="hljs-keyword">await</span> todoResponse.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setTodo</span>(todoData);

        <span class="hljs-comment">// Then fetch the user</span>
        <span class="hljs-keyword">const</span> userResponse = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
          <span class="hljs-string">\`https://jsonplaceholder.typicode.com/users/<span class="hljs-subst">\${todoData.userId}</span>\`</span>,
          { <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span> },
        );

        <span class="hljs-keyword">if</span> (!userResponse.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">userData</span>: <span class="hljs-title class_">User</span> = <span class="hljs-keyword">await</span> userResponse.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setUser</span>(userData);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; err.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchTodoAndUser</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, [todoId]);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!todo || !user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Data not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        Assigned to: {user.name} ({user.email})
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Status: {todo.completed ? &#x27;Completed&#x27; : &#x27;Pending&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الجلب-المتوازي-عبر-promiseall">الجلب المتوازي عبر Promise.all</h2>
<p>حين لا تعتمد عمليات الجلب بعضها على بعض، شغّلها بالتوازي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">DashboardData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchDashboardData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
        <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

        <span class="hljs-comment">// Fetch both in parallel</span>
        <span class="hljs-keyword">const</span> [todosResponse, usersResponse] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
          <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>, {
            <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
          }),
          <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/users&#x27;</span>, {
            <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
          }),
        ]);

        <span class="hljs-comment">// Check both responses</span>
        <span class="hljs-keyword">if</span> (!todosResponse.<span class="hljs-property">ok</span> || !usersResponse.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch dashboard data&#x27;</span>);
        }

        <span class="hljs-comment">// Parse both responses</span>
        <span class="hljs-keyword">const</span> [todosData, usersData] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
          todosResponse.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;,
          usersResponse.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>[]&gt;,
        ]);

        <span class="hljs-title function_">setTodos</span>(todosData);
        <span class="hljs-title function_">setUsers</span>(usersData);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; err.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchDashboardData</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading dashboard...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Users ({users.length})<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Total Todos ({todos.length})<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Completed ({todos.filter((t) =&gt; t.completed).length})<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الترقيم-الصفحي-والتمرير-اللانهائي">الترقيم الصفحي والتمرير اللانهائي</h2>
<p>التعامل مع البيانات المقسّمة إلى صفحات باستخدام TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">PaginatedTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [page, setPage] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> [hasMore, setHasMore] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> limit = <span class="hljs-number">10</span>;

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchPage</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
        <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
          <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?_page=<span class="hljs-subst">\${page}</span>&amp;_limit=<span class="hljs-subst">\${limit}</span>\`</span>,
          { <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span> },
        );

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">newTodos</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

        <span class="hljs-keyword">if</span> (newTodos.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-title function_">setHasMore</span>(<span class="hljs-literal">false</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...newTodos]);
        }
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; err.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchPage</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, [page]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadMore</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!isLoading &amp;&amp; hasMore) {
      <span class="hljs-title function_">setPage</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos (Paginated)<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

      {isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading more...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      {hasMore &amp;&amp; !isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{loadMore}</span>&gt;</span>Load More<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>}

      {!hasMore &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No more todos to load<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="البحث-المؤجل-debounced">البحث المؤجَّل (Debounced)</h2>
<p>في ميزة البحث، أجّل استدعاءات الواجهة البرمجية (debounce):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchTerm, setSearchTerm] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isSearching, setIsSearching] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!searchTerm.<span class="hljs-title function_">trim</span>()) {
      <span class="hljs-title function_">setTodos</span>([]);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Debounce the search</span>
    <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

      <span class="hljs-keyword">const</span> <span class="hljs-title function_">searchTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">true</span>);

          <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
            <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?q=<span class="hljs-subst">\${<span class="hljs-built_in">encodeURIComponent</span>(searchTerm)}</span>\`</span>,
            { <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span> },
          );

          <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Search failed&#x27;</span>);
          }

          <span class="hljs-keyword">const</span> <span class="hljs-attr">results</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
          <span class="hljs-title function_">setTodos</span>(results);
        } <span class="hljs-keyword">catch</span> (err) {
          <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> &amp;&amp; err.<span class="hljs-property">name</span> !== <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Search error:&#x27;</span>, err);
          }
        } <span class="hljs-keyword">finally</span> {
          <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">false</span>);
        }
      };

      <span class="hljs-title function_">searchTodos</span>();

      <span class="hljs-comment">// Cleanup for the fetch</span>
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
        abortController.<span class="hljs-title function_">abort</span>();
      };
    }, <span class="hljs-number">500</span>); <span class="hljs-comment">// 500ms debounce delay</span>

    <span class="hljs-comment">// Cleanup for the timeout</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearTimeout</span>(timeoutId);
    };
  }, [searchTerm]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{searchTerm}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setSearchTerm(e.target.value)}
        placeholder=&quot;Search todos...&quot;
      /&gt;

      {isSearching &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="منطق-إعادة-المحاولة-للطلبات-الفاشلة">منطق إعادة المحاولة للطلبات الفاشلة</h2>
<p>أضف إعادة محاولة تلقائية للأعطال العابرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodosWithRetry</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [retryCount, setRetryCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> maxRetries = <span class="hljs-number">3</span>;

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchWithRetry</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attempt = <span class="hljs-number">0</span>; attempt &lt;= maxRetries; attempt++) {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>, {
            <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
          });

          <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
          }

          <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
          <span class="hljs-title function_">setTodos</span>(data);
          <span class="hljs-title function_">setRetryCount</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// Reset on success</span>
          <span class="hljs-keyword">break</span>; <span class="hljs-comment">// Exit retry loop on success</span>
        } <span class="hljs-keyword">catch</span> (err) {
          <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>) {
            <span class="hljs-keyword">if</span> (err.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
              <span class="hljs-keyword">break</span>; <span class="hljs-comment">// Don&#x27;t retry if aborted</span>
            }

            <span class="hljs-keyword">if</span> (attempt === maxRetries) {
              <span class="hljs-title function_">setError</span>(<span class="hljs-string">\`Failed after <span class="hljs-subst">\${maxRetries + <span class="hljs-number">1</span>}</span> attempts: <span class="hljs-subst">\${err.message}</span>\`</span>);
              <span class="hljs-title function_">setRetryCount</span>(attempt);
            } <span class="hljs-keyword">else</span> {
              <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Attempt <span class="hljs-subst">\${attempt + <span class="hljs-number">1</span>}</span> failed, retrying...\`</span>);
              <span class="hljs-comment">// Wait before retrying (exponential backoff)</span>
              <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">2</span>, attempt) * <span class="hljs-number">1000</span>));
            }
          }
        }
      }

      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    };

    <span class="hljs-title function_">fetchWithRetry</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      abortController.<span class="hljs-title function_">abort</span>();
    };
  }, []); <span class="hljs-comment">// Add retryCount to deps if you want manual retry</span>

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">manualRetry</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setRetryCount</span>(<span class="hljs-number">0</span>);
    <span class="hljs-comment">// Trigger re-fetch by updating a dependency</span>
  };

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading (Attempt {retryCount + 1})...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{manualRetry}</span>&gt;</span>Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أفضل-الممارسات-والأخطاء-الشائعة">أفضل الممارسات والأخطاء الشائعة</h2>
<h3 id="تعامل-دائما-مع-حالة-التحميل">تعامل دائمًا مع حالة التحميل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: No loading state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setData);
  }, []);

  <span class="hljs-comment">// This will show &quot;No todos&quot; while loading!</span>
  <span class="hljs-keyword">return</span> data.<span class="hljs-property">length</span> === <span class="hljs-number">0</span> ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No todos<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Explicit loading state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-title function_">setData</span>(data);
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      });
  }, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">return</span> data.<span class="hljs-property">length</span> === <span class="hljs-number">0</span> ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No todos<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="لا-تنس-التنظيف">لا تنسَ التنظيف</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: No cleanup, can cause memory leaks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadCleanup</span>(<span class="hljs-params">{ id }: { id: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/item/<span class="hljs-subst">\${id}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setData); <span class="hljs-comment">// This might run after unmount!</span>
  }, [id]);
}

<span class="hljs-comment">// ✅ Good: Proper cleanup</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodCleanup</span>(<span class="hljs-params">{ id }: { id: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> cancelled = <span class="hljs-literal">false</span>;

    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/item/<span class="hljs-subst">\${id}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (!cancelled) {
          <span class="hljs-title function_">setData</span>(data);
        }
      });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      cancelled = <span class="hljs-literal">true</span>;
    };
  }, [id]);
}
</code></pre>
<h3 id="صرح-بأنواع-استجابات-الواجهة-البرمجية">صرّح بأنواع استجابات الواجهة البرمجية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Using &#x27;any&#x27; type</span>
<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

<span class="hljs-comment">// ✅ Good: Explicit typing</span>
<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

<span class="hljs-comment">// ✅ Better: Runtime validation (covered in next tutorial)</span>
<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>);
<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
<span class="hljs-keyword">const</span> validatedData = <span class="hljs-title class_">TodoSchema</span>.<span class="hljs-title function_">parse</span>(data); <span class="hljs-comment">// Using Zod</span>
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>جلب البيانات باستخدام <code>useState</code> و<code>useEffect</code> يتطلب عناية دقيقة بما يلي:</p>
<ol>
<li><strong>حالات التحميل</strong> — اعرض دائمًا تغذية راجعة مناسبة</li>
<li><strong>معالجة الأخطاء</strong> — التقط الأخطاء واعرضها برشاقة</li>
<li><strong>سباقات الطلبات</strong> — ألغِ الطلبات القديمة</li>
<li><strong>التنظيف</strong> — امنع تسريبات الذاكرة وتحديثات الحالة بعد إزالة المكوّن</li>
<li><strong>أنواع TypeScript</strong> — صرّح بأنواع استجابات الواجهة البرمجية صراحةً</li>
</ol>
<p>بهذه الأنماط تستطيع بناء جلب بيانات متين يتعامل مع جميع الحالات الحدّية التي سيواجهها المستخدمون في بيئة الإنتاج.</p>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>في الدليل التالي، سنغوص أعمق في أنماط حالات التحميل ومعالجة الأخطاء، بما في ذلك الاتحادات المُميَّزة لتمثيل الحالات غير المتزامنة، وحدود الأخطاء، ورسائل الأخطاء المفهومة للمستخدم.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
