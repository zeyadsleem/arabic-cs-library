const s="kinney",a="react-typescript",n="React مع TypeScript",l="reading-todos-get-typescript",p="قراءة المهام (todos) بواسطة TypeScript",t=[{depth:2,id:"طلب-get-أساسي-مع-الأنواع",text:"طلب GET أساسي مع الأنواع"},{depth:2,id:"الترقيم-بمعاملات-آمنة-الأنواع",text:"الترقيم بمعاملات آمنة الأنواع"},{depth:2,id:"التصفية-بمعاملات-استعلام-آمنة-الأنواع",text:"التصفية بمعاملات استعلام آمنة الأنواع"},{depth:2,id:"نمط-التمرير-اللانهائي",text:"نمط التمرير اللانهائي"},{depth:2,id:"استراتيجية-التخزين-المؤقت",text:"استراتيجية التخزين المؤقت"},{depth:2,id:"البحث-مع-تأجيل-النداءات-debouncing",text:"البحث مع تأجيل النداءات (debouncing)"},{depth:2,id:"مثال-كامل-قارئ-مهام-متقدم",text:"مثال كامل: قارئ مهام متقدم"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],e=`<p>قراءة البيانات وعرضها أساسُ أي تطبيق. وجلب المهام قد يبدو بسيطًا — طلب GET فحص، أليس كذلك؟ — لكن التطبيقات الإنتاجية تحتاج ترقيم صفحات وتصفية وبحثًا وترتيبًا وذاكرة تخزين مؤقتة. يساعدنا TypeScript في بناء هذه الميزات بثقة، فيضمن أمان الأنواع من معاملات API إلى المكوّنات المُصرَّعة.</p>
<p>في هذا الدرس سنبني نظامًا جامعًا لقراءة المهام بكل الميزات التي يتوقعها المستخدمون في تطبيق حديث.</p>
<h2 id="طلب-get-أساسي-مع-الأنواع">طلب GET أساسي مع الأنواع</h2>
<p>لنبدأ بالأساسيات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodosResponse</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BasicTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setTodos</span>(data);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchTodos</span>();
  }, []);

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

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
<h2 id="الترقيم-بمعاملات-آمنة-الأنواع">الترقيم بمعاملات آمنة الأنواع</h2>
<p>التطبيقات الواقعية تحتاج ترقيمًا للصفحات حفاظًا على الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">PaginationParams</span> {
  <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PaginatedResponse</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T[];
  <span class="hljs-attr">pagination</span>: {
    <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">totalPages</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">hasNext</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">hasPrev</span>: <span class="hljs-built_in">boolean</span>;
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePaginatedTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [pagination, setPagination] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">totalPages</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">hasNext</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">hasPrev</span>: <span class="hljs-literal">false</span>,
  });
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> fetchPage = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">params</span>: <span class="hljs-title class_">PaginationParams</span>) =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);
      url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_page&#x27;</span>, params.<span class="hljs-property">page</span>.<span class="hljs-title function_">toString</span>());
      url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_limit&#x27;</span>, params.<span class="hljs-property">limit</span>.<span class="hljs-title function_">toString</span>());

      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url.<span class="hljs-title function_">toString</span>());

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>);
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-comment">// JSONPlaceholder returns total count in header</span>
      <span class="hljs-keyword">const</span> totalCount = response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Total-Count&#x27;</span>);
      <span class="hljs-keyword">const</span> total = totalCount ? <span class="hljs-built_in">parseInt</span>(totalCount, <span class="hljs-number">10</span>) : <span class="hljs-number">100</span>;
      <span class="hljs-keyword">const</span> totalPages = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(total / params.<span class="hljs-property">limit</span>);

      <span class="hljs-title function_">setTodos</span>(data);
      <span class="hljs-title function_">setPagination</span>({
        <span class="hljs-attr">page</span>: params.<span class="hljs-property">page</span>,
        <span class="hljs-attr">limit</span>: params.<span class="hljs-property">limit</span>,
        total,
        totalPages,
        <span class="hljs-attr">hasNext</span>: params.<span class="hljs-property">page</span> &lt; totalPages,
        <span class="hljs-attr">hasPrev</span>: params.<span class="hljs-property">page</span> &gt; <span class="hljs-number">1</span>,
      });
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">goToPage</span> = (<span class="hljs-params"><span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">fetchPage</span>({ page, <span class="hljs-attr">limit</span>: pagination.<span class="hljs-property">limit</span> });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">nextPage</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (pagination.<span class="hljs-property">hasNext</span>) {
      <span class="hljs-title function_">goToPage</span>(pagination.<span class="hljs-property">page</span> + <span class="hljs-number">1</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">prevPage</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (pagination.<span class="hljs-property">hasPrev</span>) {
      <span class="hljs-title function_">goToPage</span>(pagination.<span class="hljs-property">page</span> - <span class="hljs-number">1</span>);
    }
  };

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchPage</span>({ <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> });
  }, [fetchPage]);

  <span class="hljs-keyword">return</span> {
    todos,
    pagination,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PaginatedTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { todos, pagination, isLoading, error, goToPage, nextPage, prevPage } = <span class="hljs-title function_">usePaginatedTodos</span>();

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>
        Todos (Page {pagination.page} of {pagination.totalPages})
      <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

      {isLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {todos.map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
              {todo.completed ? &#x27;✅&#x27; : &#x27;⭕&#x27;} {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pagination&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{prevPage}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!pagination.hasPrev</span> || <span class="hljs-attr">isLoading</span>}&gt;</span>
          Previous
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
          Page {pagination.page} of {pagination.totalPages}
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{nextPage}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!pagination.hasNext</span> || <span class="hljs-attr">isLoading</span>}&gt;</span>
          Next
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;page-selector&quot;</span>&gt;</span>
        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i</span> + <span class="hljs-attr">1</span>} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> goToPage(i + 1)} disabled={pagination.page === i + 1}&gt;
            {i + 1}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التصفية-بمعاملات-استعلام-آمنة-الأنواع">التصفية بمعاملات استعلام آمنة الأنواع</h2>
<p>أضف قدرات التصفية بأنواع TypeScript سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FilterStatus</span> = <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortField</span> = <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;title&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortOrder</span> = <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoFilters</span> {
  <span class="hljs-attr">status</span>: <span class="hljs-title class_">FilterStatus</span>;
  <span class="hljs-attr">userId</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">search</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sortBy</span>: <span class="hljs-title class_">SortField</span>;
  <span class="hljs-attr">sortOrder</span>: <span class="hljs-title class_">SortOrder</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">buildQueryParams</span>(<span class="hljs-params"><span class="hljs-attr">filters</span>: <span class="hljs-title class_">TodoFilters</span>, <span class="hljs-attr">pagination</span>: <span class="hljs-title class_">PaginationParams</span></span>): <span class="hljs-title class_">URLSearchParams</span> {
  <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();

  <span class="hljs-comment">// Pagination</span>
  params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_page&#x27;</span>, pagination.<span class="hljs-property">page</span>.<span class="hljs-title function_">toString</span>());
  params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_limit&#x27;</span>, pagination.<span class="hljs-property">limit</span>.<span class="hljs-title function_">toString</span>());

  <span class="hljs-comment">// Filtering</span>
  <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;completed&#x27;</span>) {
    params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;completed&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;active&#x27;</span>) {
    params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;completed&#x27;</span>, <span class="hljs-string">&#x27;false&#x27;</span>);
  }

  <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">userId</span>) {
    params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;userId&#x27;</span>, filters.<span class="hljs-property">userId</span>.<span class="hljs-title function_">toString</span>());
  }

  <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">search</span>) {
    params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;q&#x27;</span>, filters.<span class="hljs-property">search</span>);
  }

  <span class="hljs-comment">// Sorting</span>
  params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_sort&#x27;</span>, filters.<span class="hljs-property">sortBy</span>);
  params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_order&#x27;</span>, filters.<span class="hljs-property">sortOrder</span>);

  <span class="hljs-keyword">return</span> params;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FilteredTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [filters, setFilters] = useState&lt;<span class="hljs-title class_">TodoFilters</span>&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
    <span class="hljs-attr">sortBy</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
    <span class="hljs-attr">sortOrder</span>: <span class="hljs-string">&#x27;asc&#x27;</span>,
  });
  <span class="hljs-keyword">const</span> [pagination, setPagination] = useState&lt;<span class="hljs-title class_">PaginationParams</span>&gt;({
    <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  });
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchFilteredTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> params = <span class="hljs-title function_">buildQueryParams</span>(filters, pagination);
        <span class="hljs-keyword">const</span> url = <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?<span class="hljs-subst">\${params}</span>\`</span>;

        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch&#x27;</span>);

        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

        <span class="hljs-comment">// Apply client-side filtering for search (JSONPlaceholder doesn&#x27;t support it)</span>
        <span class="hljs-keyword">const</span> filtered = filters.<span class="hljs-property">search</span>
          ? data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">title</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(filters.<span class="hljs-property">search</span>!.<span class="hljs-title function_">toLowerCase</span>()))
          : data;

        <span class="hljs-title function_">setTodos</span>(filtered);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error fetching todos:&#x27;</span>, error);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchFilteredTodos</span>();
  }, [filters, pagination]);

  <span class="hljs-keyword">const</span> updateFilter = &lt;K <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">TodoFilters</span>&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">key</span>: K, <span class="hljs-attr">value</span>: <span class="hljs-title class_">TodoFilters</span>[K]</span>) =&gt;</span> {
    <span class="hljs-title function_">setFilters</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: value }));
    <span class="hljs-title function_">setPagination</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">page</span>: <span class="hljs-number">1</span> })); <span class="hljs-comment">// Reset to first page</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;filters&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{filters.status}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateFilter(&#x27;status&#x27;, e.target.value as FilterStatus)}
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;all&quot;</span>&gt;</span>All<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>Active<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;completed&quot;</span>&gt;</span>Completed<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search todos...&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{filters.search</span> || &#x27;&#x27;}
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateFilter(&#x27;search&#x27;, e.target.value)}
        /&gt;

        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{filters.sortBy}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateFilter(&#x27;sortBy&#x27;, e.target.value as SortField)}
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;id&quot;</span>&gt;</span>ID<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;completed&quot;</span>&gt;</span>Status<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateFilter(&#x27;sortOrder&#x27;, filters.sortOrder === &#x27;asc&#x27; ? &#x27;desc&#x27; : &#x27;asc&#x27;)}
        &gt;
          {filters.sortOrder === &#x27;asc&#x27; ? &#x27;↑&#x27; : &#x27;↓&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {isLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading filtered todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {todos.map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">readOnly</span> /&gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نمط-التمرير-اللانهائي">نمط التمرير اللانهائي</h2>
<p>من أجل تجربة مستخدم حديثة، طبّق التمرير اللانهائي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useInfiniteScroll&lt;T&gt;(<span class="hljs-attr">fetchMore</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;, <span class="hljs-attr">hasMore</span>: <span class="hljs-built_in">boolean</span>) {
  <span class="hljs-keyword">const</span> observer = useRef&lt;<span class="hljs-title class_">IntersectionObserver</span>&gt;();
  <span class="hljs-keyword">const</span> lastElementRef = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">node</span>: <span class="hljs-title class_">HTMLElement</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (observer.<span class="hljs-property">current</span>) observer.<span class="hljs-property">current</span>.<span class="hljs-title function_">disconnect</span>();

      observer.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(<span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entries[<span class="hljs-number">0</span>].<span class="hljs-property">isIntersecting</span> &amp;&amp; hasMore) {
          <span class="hljs-title function_">fetchMore</span>();
        }
      });

      <span class="hljs-keyword">if</span> (node) observer.<span class="hljs-property">current</span>.<span class="hljs-title function_">observe</span>(node);
    },
    [fetchMore, hasMore],
  );

  <span class="hljs-keyword">return</span> lastElementRef;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">InfiniteScrollTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [page, setPage] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> [hasMore, setHasMore] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> loadMore = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
        <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?_page=<span class="hljs-subst">\${page}</span>&amp;_limit=20\`</span>,
      );

      <span class="hljs-keyword">const</span> <span class="hljs-attr">newTodos</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-keyword">if</span> (newTodos.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
        <span class="hljs-title function_">setHasMore</span>(<span class="hljs-literal">false</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...newTodos]);
        <span class="hljs-title function_">setPage</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>);
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error loading more todos:&#x27;</span>, error);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, [page, isLoading]);

  <span class="hljs-keyword">const</span> lastTodoRef = <span class="hljs-title function_">useInfiniteScroll</span>(loadMore, hasMore &amp;&amp; !isLoading);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">loadMore</span>();
  }, []); <span class="hljs-comment">// Load first page</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Infinite Scroll Todos<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo, index) =&gt; {
          const isLast = index === todos.length - 1;
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{isLast</span> ? <span class="hljs-attr">lastTodoRef</span> <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}&gt;</span>
              {todo.completed ? &#x27;✅&#x27; : &#x27;⭕&#x27;} {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          );
        })}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

      {isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading more...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {!hasMore &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No more todos to load<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجية-التخزين-المؤقت">استراتيجية التخزين المؤقت</h2>
<p>طبّق التخزين المؤقت للتقليل من نداءات API:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CacheEntry</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">ttl</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time to live in milliseconds</span>
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TodoCache</span> {
  <span class="hljs-keyword">private</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">CacheEntry</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;();

  set&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: T, ttl = <span class="hljs-number">5</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">set</span>(key, {
      data,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      ttl,
    });
  }

  get&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): T | <span class="hljs-literal">null</span> {
    <span class="hljs-keyword">const</span> entry = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key);

    <span class="hljs-keyword">if</span> (!entry) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> isExpired = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - entry.<span class="hljs-property">timestamp</span> &gt; entry.<span class="hljs-property">ttl</span>;
    <span class="hljs-keyword">if</span> (isExpired) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> entry.<span class="hljs-property">data</span>;
  }

  <span class="hljs-title function_">invalidate</span>(<span class="hljs-params"><span class="hljs-attr">pattern</span>?: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">if</span> (!pattern) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">clear</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">keys</span>()) {
      <span class="hljs-keyword">if</span> (key.<span class="hljs-title function_">includes</span>(pattern)) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      }
    }
  }
}

<span class="hljs-keyword">const</span> todoCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TodoCache</span>();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useCachedTodos</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>?: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [isCached, setIsCached] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> fetchTodos = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (forceRefresh = <span class="hljs-literal">false</span>) =&gt; {
      <span class="hljs-keyword">const</span> cacheKey = userId ? <span class="hljs-string">\`todos-user-<span class="hljs-subst">\${userId}</span>\`</span> : <span class="hljs-string">&#x27;todos-all&#x27;</span>;

      <span class="hljs-comment">// Check cache first</span>
      <span class="hljs-keyword">if</span> (!forceRefresh) {
        <span class="hljs-keyword">const</span> cached = todoCache.<span class="hljs-property">get</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt;(cacheKey);
        <span class="hljs-keyword">if</span> (cached) {
          <span class="hljs-title function_">setTodos</span>(cached);
          <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-title function_">setIsCached</span>(<span class="hljs-literal">true</span>);
          <span class="hljs-keyword">return</span>;
        }
      }

      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setIsCached</span>(<span class="hljs-literal">false</span>);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> url = userId
          ? <span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?userId=<span class="hljs-subst">\${userId}</span>\`</span>
          : <span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>;

        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
        <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

        <span class="hljs-comment">// Cache the result</span>
        todoCache.<span class="hljs-title function_">set</span>(cacheKey, data);

        <span class="hljs-title function_">setTodos</span>(data);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error fetching todos:&#x27;</span>, error);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    },
    [userId],
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchTodos</span>();
  }, [fetchTodos]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">refresh</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">fetchTodos</span>(<span class="hljs-literal">true</span>);
  };

  <span class="hljs-keyword">return</span> { todos, isLoading, isCached, refresh };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CachedTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { todos, isLoading, isCached, refresh } = <span class="hljs-title function_">useCachedTodos</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos {isCached &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>(Cached)<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{refresh}</span>&gt;</span>Refresh<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {isLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {todos.slice(0, 10).map((todo) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="البحث-مع-تأجيل-النداءات-debouncing">البحث مع تأجيل النداءات (debouncing)</h2>
<p>طبّق بحثًا كفؤًا مع تأجيل النداءات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useDebounce&lt;T&gt;(<span class="hljs-attr">value</span>: T, <span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span>): T {
  <span class="hljs-keyword">const</span> [debouncedValue, setDebouncedValue] = useState&lt;T&gt;(value);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> handler = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDebouncedValue</span>(value);
    }, delay);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearTimeout</span>(handler);
    };
  }, [value, delay]);

  <span class="hljs-keyword">return</span> debouncedValue;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchableTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [searchTerm, setSearchTerm] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [isSearching, setIsSearching] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [searchResults, setSearchResults] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> debouncedSearchTerm = <span class="hljs-title function_">useDebounce</span>(searchTerm, <span class="hljs-number">500</span>);

  <span class="hljs-comment">// Load all todos initially</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setTodos);
  }, []);

  <span class="hljs-comment">// Search when debounced term changes</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!debouncedSearchTerm) {
      <span class="hljs-title function_">setSearchResults</span>([]);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Simulate API search (JSONPlaceholder doesn&#x27;t have real search)</span>
    <span class="hljs-keyword">const</span> results = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
      todo.<span class="hljs-property">title</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(debouncedSearchTerm.<span class="hljs-title function_">toLowerCase</span>()),
    );

    <span class="hljs-comment">// Simulate network delay</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setSearchResults</span>(results);
      <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">false</span>);
    }, <span class="hljs-number">300</span>);
  }, [debouncedSearchTerm, todos]);

  <span class="hljs-keyword">const</span> displayTodos = searchTerm ? searchResults : todos.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">20</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search todos...&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{searchTerm}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setSearchTerm(e.target.value)}
      /&gt;

      {isSearching &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      {searchTerm &amp;&amp; !isSearching &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Found {searchResults.length} results<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {displayTodos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مثال-كامل-قارئ-مهام-متقدم">مثال كامل: قارئ مهام متقدم</h2>
<p>فيما يلي كل شيء مجتمعاً في مكوّن جاهز للإنتاج:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoQueryOptions</span> {
  <span class="hljs-attr">page</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">limit</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">userId</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">completed</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">search</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sortBy</span>?: <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;title&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
  <span class="hljs-attr">sortOrder</span>?: <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoQueryResult</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">pageSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoQuery</span>(<span class="hljs-params"><span class="hljs-attr">options</span>: <span class="hljs-title class_">TodoQueryOptions</span> = {}</span>): <span class="hljs-title class_">TodoQueryResult</span> {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [total, setTotal] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> {
    page = <span class="hljs-number">1</span>,
    limit = <span class="hljs-number">10</span>,
    userId,
    completed,
    search,
    sortBy = <span class="hljs-string">&#x27;id&#x27;</span>,
    sortOrder = <span class="hljs-string">&#x27;asc&#x27;</span>,
  } = options;

  <span class="hljs-keyword">const</span> fetchTodos = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();
      params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_page&#x27;</span>, page.<span class="hljs-title function_">toString</span>());
      params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_limit&#x27;</span>, limit.<span class="hljs-title function_">toString</span>());
      params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_sort&#x27;</span>, sortBy);
      params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;_order&#x27;</span>, sortOrder);

      <span class="hljs-keyword">if</span> (userId !== <span class="hljs-literal">undefined</span>) params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;userId&#x27;</span>, userId.<span class="hljs-title function_">toString</span>());
      <span class="hljs-keyword">if</span> (completed !== <span class="hljs-literal">undefined</span>) params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;completed&#x27;</span>, completed.<span class="hljs-title function_">toString</span>());
      <span class="hljs-keyword">if</span> (search) params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;q&#x27;</span>, search);

      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos?<span class="hljs-subst">\${params}</span>\`</span>);

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>);
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span>[] = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-keyword">const</span> totalCount = response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Total-Count&#x27;</span>);

      <span class="hljs-title function_">setTodos</span>(data);
      <span class="hljs-title function_">setTotal</span>(totalCount ? <span class="hljs-built_in">parseInt</span>(totalCount, <span class="hljs-number">10</span>) : data.<span class="hljs-property">length</span>);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>));
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, [page, limit, userId, completed, search, sortBy, sortOrder]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchTodos</span>();
  }, [fetchTodos]);

  <span class="hljs-keyword">return</span> {
    todos,
    total,
    page,
    <span class="hljs-attr">pageSize</span>: limit,
    isLoading,
    error,
    <span class="hljs-attr">refetch</span>: fetchTodos,
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AdvancedTodoReader</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [queryOptions, setQueryOptions] = useState&lt;<span class="hljs-title class_">TodoQueryOptions</span>&gt;({
    <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">sortBy</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
    <span class="hljs-attr">sortOrder</span>: <span class="hljs-string">&#x27;asc&#x27;</span>,
  });

  <span class="hljs-keyword">const</span> { todos, total, page, pageSize, isLoading, error, refetch } = <span class="hljs-title function_">useTodoQuery</span>(queryOptions);

  <span class="hljs-keyword">const</span> totalPages = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(total / pageSize);

  <span class="hljs-keyword">const</span> updateOption = &lt;K <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">TodoQueryOptions</span>&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">key</span>: K, <span class="hljs-attr">value</span>: <span class="hljs-title class_">TodoQueryOptions</span>[K]</span>) =&gt;</span> {
    <span class="hljs-title function_">setQueryOptions</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      [key]: value,
      <span class="hljs-comment">// Reset to page 1 when filters change</span>
      ...(key !== <span class="hljs-string">&#x27;page&#x27;</span> ? { <span class="hljs-attr">page</span>: <span class="hljs-number">1</span> } : {}),
    }));
  };

  <span class="hljs-keyword">if</span> (error) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{refetch}</span>&gt;</span>Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Advanced Todo Reader<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

      {/* Controls */}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search...&quot;</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateOption(&#x27;search&#x27;, e.target.value)}
        /&gt;

        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span>
            updateOption(
              &#x27;completed&#x27;,
              e.target.value === &#x27;all&#x27; ? undefined : e.target.value === &#x27;true&#x27;,
            )
          }
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;all&quot;</span>&gt;</span>All<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>Completed<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;false&quot;</span>&gt;</span>Active<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{queryOptions.sortBy}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateOption(&#x27;sortBy&#x27;, e.target.value as &#x27;id&#x27; | &#x27;title&#x27; | &#x27;completed&#x27;)}
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;id&quot;</span>&gt;</span>Sort by ID<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Sort by Title<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;completed&quot;</span>&gt;</span>Sort by Status<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span>
            updateOption(&#x27;sortOrder&#x27;, queryOptions.sortOrder === &#x27;asc&#x27; ? &#x27;desc&#x27; : &#x27;asc&#x27;)
          }
        &gt;
          {queryOptions.sortOrder === &#x27;asc&#x27; ? &#x27;↑&#x27; : &#x27;↓&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {/* Results */}
      {isLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            Showing {todos.length} of {total} todos (Page {page} of {totalPages})
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {todos.map((todo) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">readOnly</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
                  {todo.id}. {todo.title}
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

          {/* Pagination */}
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pagination&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
              <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateOption(&#x27;page&#x27;, Math.max(1, page - 1))}
              disabled={page === 1}
            &gt;
              Previous
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
              Page {page} of {totalPages}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
              <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateOption(&#x27;page&#x27;, Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            &gt;
              Next
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/&gt;</span></span>
      )}
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>استخدم حالات تحميل سليمة</strong> — أظهر التغذية الراجعة دائمًا أثناء الجلب</li>
<li><strong>عالج الأخطاء برفق</strong> — وفّر خيارات إعادة محاولة ورسائل نافعة</li>
<li><strong>طبّق التخزين المؤقت</strong> — قلّل نداءات API غير الضرورية</li>
<li><strong>مهّد إدخالات البحث</strong> — يمنع طلبات API المكثفة</li>
<li><strong>نوّع استجابات API لديك</strong> — لا تثق بالبيانات الخارجية دون تحقق</li>
<li><strong>فكّر في الترقيم مبكرًا</strong> — لا تحمّل آلاف العناصر دفعة واحدة</li>
</ol>
<h2 id="الخلاصة">الخلاصة</h2>
<p>قراءة المهام بكفاءة تتطلب:</p>
<ul>
<li>معاملات استعلام آمنة الأنواع</li>
<li>تنفيذًا سليمًا للترقيم</li>
<li>قدرات التصفية والترتيب</li>
<li>بحثًا مع تأجيل النداءات</li>
<li>استراتيجيات التخزين المؤقت</li>
<li>معالجة الأخطاء ومنطق إعادة المحاولة</li>
</ul>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>بعد أن نستطيع إنشاء المهام وقراءتها، لنطبّق التحديث بتغييراتٍ متفائلة (optimistic updates) واستراتيجيات تراجع سليمة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
