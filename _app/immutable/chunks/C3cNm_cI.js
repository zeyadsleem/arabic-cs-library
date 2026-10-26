const s="kinney",a="react-performance",n="أداء React",l="apollo-client-optimization",p="تحسين أداء Apollo Client",t=[{depth:2,id:"تحسين-الذاكرة-المؤقتة-في-apollo-client",text:"تحسين الذاكرة المؤقتة في Apollo Client"},{depth:2,id:"تجميع-الاستعلامات-وإزالة-تكرارها",text:"تجميع الاستعلامات وإزالة تكرارها"},{depth:2,id:"التحديثات-المتفائلة-والطفرات",text:"التحديثات المتفائلة والطفرات"},{depth:2,id:"أداء-الاشتراكات",text:"أداء الاشتراكات"}],e=`<p>يوفّر Apollo Client أدوات قوية لتحسين أداء GraphQL، لكنها تتطلّب تهيئة دقيقة للوصول إلى أفضل النتائج. يغطّي هذا الدليل تقنيات Apollo Client المتقدّمة في التخزين المؤقت، والتجميع في دفعات، والتحديثات المتفائلة، وإدارة الاشتراكات، وهي تقنيات يمكن أن تحسّن أداء تطبيق React لديك تحسّنًا هائلًا.</p>
<h2 id="تحسين-الذاكرة-المؤقتة-في-apollo-client">تحسين الذاكرة المؤقتة في Apollo Client</h2>
<p>الذاكرة المؤقتة المعيارية في Apollo قوية، لكنها تحتاج إلى تهيئة صحيحة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Cache configuration for performance</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">InMemoryCache</span>, <span class="hljs-title class_">ApolloClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@apollo/client&#x27;</span>;

<span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">InMemoryCache</span>({
  <span class="hljs-comment">// Type policies for normalization</span>
  <span class="hljs-attr">typePolicies</span>: {
    <span class="hljs-title class_">Query</span>: {
      <span class="hljs-attr">fields</span>: {
        <span class="hljs-comment">// Paginated field with custom merge</span>
        <span class="hljs-attr">posts</span>: {
          <span class="hljs-attr">keyArgs</span>: [<span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-string">&#x27;sort&#x27;</span>],
          <span class="hljs-title function_">merge</span>(<span class="hljs-params">existing = { edges: [], pageInfo: {} }, incoming</span>) {
            <span class="hljs-keyword">return</span> {
              ...incoming,
              <span class="hljs-attr">edges</span>: [...(existing.<span class="hljs-property">edges</span> || []), ...incoming.<span class="hljs-property">edges</span>],
            };
          },
        },

        <span class="hljs-comment">// Singleton field</span>
        <span class="hljs-attr">viewer</span>: {
          <span class="hljs-attr">merge</span>: <span class="hljs-literal">true</span>,
        },
      },
    },

    <span class="hljs-title class_">User</span>: {
      <span class="hljs-comment">// Custom cache key</span>
      <span class="hljs-attr">keyFields</span>: [<span class="hljs-string">&#x27;uuid&#x27;</span>],

      <span class="hljs-attr">fields</span>: {
        <span class="hljs-comment">// Computed field</span>
        <span class="hljs-attr">fullName</span>: {
          <span class="hljs-title function_">read</span>(<span class="hljs-params">_, { readField }</span>) {
            <span class="hljs-keyword">const</span> firstName = <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;firstName&#x27;</span>);
            <span class="hljs-keyword">const</span> lastName = <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;lastName&#x27;</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${firstName}</span> <span class="hljs-subst">\${lastName}</span>\`</span>;
          },
        },

        <span class="hljs-comment">// Optimistic field</span>
        <span class="hljs-attr">isFollowing</span>: {
          <span class="hljs-title function_">read</span>(<span class="hljs-params">existing, { readField, toReference }</span>) {
            <span class="hljs-keyword">if</span> (existing !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> existing;

            <span class="hljs-comment">// Check if user is in followed list</span>
            <span class="hljs-keyword">const</span> viewerId = <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-title function_">toReference</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;viewer&#x27;</span> }));
            <span class="hljs-keyword">const</span> followedIds = readField&lt;<span class="hljs-built_in">string</span>[]&gt;(
              <span class="hljs-string">&#x27;followedUserIds&#x27;</span>,
              <span class="hljs-title function_">toReference</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-attr">id</span>: viewerId }),
            );
            <span class="hljs-keyword">const</span> userId = <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;id&#x27;</span>);

            <span class="hljs-keyword">return</span> followedIds?.<span class="hljs-title function_">includes</span>(userId <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>) || <span class="hljs-literal">false</span>;
          },
        },
      },
    },

    <span class="hljs-title class_">Post</span>: {
      <span class="hljs-attr">fields</span>: {
        <span class="hljs-comment">// Invalidate on update</span>
        <span class="hljs-attr">comments</span>: {
          <span class="hljs-title function_">merge</span>(<span class="hljs-params">existing, incoming, { readField }</span>) {
            <span class="hljs-comment">// Custom merge strategy for comments</span>
            <span class="hljs-keyword">const</span> merged = existing ? existing.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>) : [];
            <span class="hljs-keyword">const</span> existingIdSet = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(merged.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">comment</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;id&#x27;</span>, comment)));

            incoming.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">comment</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
              <span class="hljs-keyword">const</span> id = <span class="hljs-title function_">readField</span>(<span class="hljs-string">&#x27;id&#x27;</span>, comment);
              <span class="hljs-keyword">if</span> (!existingIdSet.<span class="hljs-title function_">has</span>(id)) {
                merged.<span class="hljs-title function_">push</span>(comment);
              }
            });

            <span class="hljs-keyword">return</span> merged;
          },
        },
      },
    },
  },

  <span class="hljs-comment">// Possess object identity</span>
  <span class="hljs-attr">possibleTypes</span>: {
    <span class="hljs-title class_">Node</span>: [<span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-string">&#x27;Post&#x27;</span>, <span class="hljs-string">&#x27;Comment&#x27;</span>],
    <span class="hljs-title class_">SearchResult</span>: [<span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-string">&#x27;Post&#x27;</span>],
  },

  <span class="hljs-comment">// Data ID from object</span>
  <span class="hljs-title function_">dataIdFromObject</span>(<span class="hljs-params"><span class="hljs-attr">object</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">switch</span> (<span class="hljs-built_in">object</span>.<span class="hljs-property">__typename</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;User&#x27;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">\`User:<span class="hljs-subst">\${<span class="hljs-built_in">object</span>.uuid}</span>\`</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;Post&#x27;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">\`Post:<span class="hljs-subst">\${<span class="hljs-built_in">object</span>.id}</span>\`</span>;
      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">defaultDataIdFromObject</span>(<span class="hljs-built_in">object</span>);
    }
  },
});

<span class="hljs-comment">// Cache persistence for performance</span>
<span class="hljs-keyword">import</span> { persistCache } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;apollo3-cache-persist&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">setupCache</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">persistCache</span>({
    cache,
    <span class="hljs-attr">storage</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>,
    <span class="hljs-attr">maxSize</span>: <span class="hljs-number">1048576</span>, <span class="hljs-comment">// 1MB</span>
    <span class="hljs-attr">debug</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>,
  });

  <span class="hljs-keyword">return</span> cache;
}
</code></pre>
<h2 id="تجميع-الاستعلامات-وإزالة-تكرارها">تجميع الاستعلامات وإزالة تكرارها</h2>
<p>قلّل طلبات الشبكة عبر التجميع في دفعات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Apollo Link setup for batching</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">BatchHttpLink</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@apollo/client/link/batch-http&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RetryLink</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@apollo/client/link/retry&#x27;</span>;

<span class="hljs-keyword">const</span> batchLink = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BatchHttpLink</span>({
  <span class="hljs-attr">uri</span>: <span class="hljs-string">&#x27;/graphql&#x27;</span>,
  <span class="hljs-attr">batchMax</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max queries per batch</span>
  <span class="hljs-attr">batchInterval</span>: <span class="hljs-number">20</span>, <span class="hljs-comment">// Ms to wait before batching</span>
  <span class="hljs-attr">batchKey</span>: <span class="hljs-function">(<span class="hljs-params">operation</span>) =&gt;</span> {
    <span class="hljs-comment">// Group by operation type</span>
    <span class="hljs-keyword">const</span> operationType = operation.<span class="hljs-property">query</span>.<span class="hljs-property">definitions</span>[<span class="hljs-number">0</span>].<span class="hljs-property">operation</span>;
    <span class="hljs-keyword">return</span> operationType;
  },
});

<span class="hljs-comment">// Query deduplication</span>
<span class="hljs-keyword">const</span> dedupLink = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApolloLink</span>(<span class="hljs-function">(<span class="hljs-params">operation, forward</span>) =&gt;</span> {
  <span class="hljs-comment">// Track in-flight queries</span>
  <span class="hljs-keyword">const</span> key = <span class="hljs-string">\`<span class="hljs-subst">\${operation.operationName}</span>:<span class="hljs-subst">\${<span class="hljs-built_in">JSON</span>.stringify(operation.variables)}</span>\`</span>;

  <span class="hljs-keyword">if</span> (inFlightQueries.<span class="hljs-title function_">has</span>(key)) {
    <span class="hljs-comment">// Return existing promise</span>
    <span class="hljs-keyword">return</span> inFlightQueries.<span class="hljs-title function_">get</span>(key);
  }

  <span class="hljs-keyword">const</span> observable = <span class="hljs-title function_">forward</span>(operation);
  <span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Observable</span>(<span class="hljs-function">(<span class="hljs-params">observer</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> subscription = observable.<span class="hljs-title function_">subscribe</span>({
      <span class="hljs-attr">next</span>: observer.<span class="hljs-property">next</span>.<span class="hljs-title function_">bind</span>(observer),
      <span class="hljs-attr">error</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        inFlightQueries.<span class="hljs-title function_">delete</span>(key);
        observer.<span class="hljs-title function_">error</span>(error);
      },
      <span class="hljs-attr">complete</span>: <span class="hljs-function">() =&gt;</span> {
        inFlightQueries.<span class="hljs-title function_">delete</span>(key);
        observer.<span class="hljs-title function_">complete</span>();
      },
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> subscription.<span class="hljs-title function_">unsubscribe</span>();
  });

  inFlightQueries.<span class="hljs-title function_">set</span>(key, promise);
  <span class="hljs-keyword">return</span> promise;
});

<span class="hljs-comment">// DataLoader for N+1 prevention</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">DataLoader</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;dataloader&#x27;</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">UserLoader</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loader</span>: <span class="hljs-title class_">DataLoader</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">User</span>&gt;;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">loader</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">DataLoader</span>(
      <span class="hljs-title function_">async</span> (ids) =&gt; {
        <span class="hljs-comment">// Batch load users</span>
        <span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> db.<span class="hljs-property">users</span>.<span class="hljs-title function_">findMany</span>({
          <span class="hljs-attr">where</span>: { <span class="hljs-attr">id</span>: { <span class="hljs-attr">in</span>: ids <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>[] } },
        });

        <span class="hljs-comment">// Map to preserve order</span>
        <span class="hljs-keyword">const</span> userMap = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> [u.<span class="hljs-property">id</span>, u]));
        <span class="hljs-keyword">return</span> ids.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> userMap.<span class="hljs-title function_">get</span>(id) || <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`User <span class="hljs-subst">\${id}</span> not found\`</span>));
      },
      {
        <span class="hljs-attr">maxBatchSize</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">cacheKeyFn</span>: <span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> key,
        <span class="hljs-attr">batchScheduleFn</span>: <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(callback, <span class="hljs-number">10</span>),
      },
    );
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">load</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loader</span>.<span class="hljs-title function_">load</span>(id);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadMany</span>(<span class="hljs-attr">ids</span>: <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>[]&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loader</span>.<span class="hljs-title function_">loadMany</span>(ids);
  }

  <span class="hljs-title function_">clearCache</span>(<span class="hljs-attr">id</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (id) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loader</span>.<span class="hljs-title function_">clear</span>(id);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loader</span>.<span class="hljs-title function_">clearAll</span>();
    }
  }
}
</code></pre>
<h2 id="التحديثات-المتفائلة-والطفرات">التحديثات المتفائلة والطفرات</h2>
<p>اجعل الطفرات تبدو فورية عبر التحديثات المتفائلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Optimistic mutation pattern</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">ADD_COMMENT</span> = gql\`<span class="language-graphql">
  <span class="hljs-keyword">mutation</span> AddComment<span class="hljs-punctuation">(</span><span class="hljs-variable">$postId</span>: ID<span class="hljs-punctuation">!</span>, <span class="hljs-variable">$content</span>: String<span class="hljs-punctuation">!</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>
    addComment<span class="hljs-punctuation">(</span><span class="hljs-symbol">postId</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$postId</span>, <span class="hljs-symbol">content</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$content</span>) <span class="hljs-punctuation">{</span>
      id
      content
      createdAt
      author <span class="hljs-punctuation">{</span>
        id
        name
        avatar
      <span class="hljs-punctuation">}</span>
      post <span class="hljs-punctuation">{</span>
        id
        commentCount
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
\`</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CommentForm</span>(<span class="hljs-params">{ postId }: { postId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [content, setContent] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [addComment] = <span class="hljs-title function_">useMutation</span>(<span class="hljs-variable constant_">ADD_COMMENT</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> optimisticComment = {
      <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;Comment&#x27;</span>,
      <span class="hljs-attr">id</span>: <span class="hljs-string">\`temp-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>\`</span>,
      content,
      <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      <span class="hljs-attr">author</span>: {
        <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
        <span class="hljs-attr">id</span>: currentUser.<span class="hljs-property">id</span>,
        <span class="hljs-attr">name</span>: currentUser.<span class="hljs-property">name</span>,
        <span class="hljs-attr">avatar</span>: currentUser.<span class="hljs-property">avatar</span>,
      },
    };

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">addComment</span>({
      <span class="hljs-attr">variables</span>: { postId, content },
      <span class="hljs-attr">optimisticResponse</span>: {
        <span class="hljs-attr">addComment</span>: optimisticComment,
      },
      <span class="hljs-attr">update</span>: <span class="hljs-function">(<span class="hljs-params">cache, { data }</span>) =&gt;</span> {
        <span class="hljs-comment">// Update post&#x27;s comment list</span>
        cache.<span class="hljs-title function_">modify</span>({
          <span class="hljs-attr">id</span>: cache.<span class="hljs-title function_">identify</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;Post&#x27;</span>, <span class="hljs-attr">id</span>: postId }),
          <span class="hljs-attr">fields</span>: {
            <span class="hljs-title function_">comments</span>(<span class="hljs-params">existingComments = []</span>) {
              <span class="hljs-keyword">const</span> newCommentRef = cache.<span class="hljs-title function_">writeFragment</span>({
                <span class="hljs-attr">data</span>: data.<span class="hljs-property">addComment</span>,
                <span class="hljs-attr">fragment</span>: gql\`<span class="language-graphql">
                  <span class="hljs-keyword">fragment</span> NewComment <span class="hljs-keyword">on</span> Comment <span class="hljs-punctuation">{</span>
                    id
                    content
                    createdAt
                    author <span class="hljs-punctuation">{</span>
                      id
                      name
                      avatar
                    <span class="hljs-punctuation">}</span>
                  <span class="hljs-punctuation">}</span>
                \`</span>,
              });

              <span class="hljs-keyword">return</span> [...existingComments, newCommentRef];
            },
            <span class="hljs-title function_">commentCount</span>(<span class="hljs-params">existingCount</span>) {
              <span class="hljs-keyword">return</span> existingCount + <span class="hljs-number">1</span>;
            },
          },
        });
      },
      <span class="hljs-comment">// Rollback on error</span>
      <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to add comment:&#x27;</span>, error);
        <span class="hljs-comment">// Apollo automatically rolls back optimistic update</span>
      },
    });

    <span class="hljs-title function_">setContent</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>
      <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
        e.preventDefault();
        handleSubmit();
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{content}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setContent(e.target.value)}
        placeholder=&quot;Add a comment...&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Post<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Optimistic cache updates for complex operations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimisticFollow</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [followUser] = <span class="hljs-title function_">useMutation</span>(<span class="hljs-variable constant_">FOLLOW_USER</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>) =&gt; {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">followUser</span>({
        <span class="hljs-attr">variables</span>: { userId },
        <span class="hljs-attr">optimisticResponse</span>: {
          <span class="hljs-attr">followUser</span>: {
            <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
            <span class="hljs-attr">id</span>: userId,
            <span class="hljs-attr">isFollowing</span>: <span class="hljs-literal">true</span>,
          },
        },
        <span class="hljs-attr">update</span>: <span class="hljs-function">(<span class="hljs-params">cache</span>) =&gt;</span> {
          <span class="hljs-comment">// Update multiple cache entries</span>
          cache.<span class="hljs-title function_">modify</span>({
            <span class="hljs-attr">id</span>: cache.<span class="hljs-title function_">identify</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-attr">id</span>: userId }),
            <span class="hljs-attr">fields</span>: {
              <span class="hljs-attr">isFollowing</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">true</span>,
              <span class="hljs-attr">followerCount</span>: <span class="hljs-function">(<span class="hljs-params">existing</span>) =&gt;</span> existing + <span class="hljs-number">1</span>,
            },
          });

          cache.<span class="hljs-title function_">modify</span>({
            <span class="hljs-attr">id</span>: cache.<span class="hljs-title function_">identify</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-attr">id</span>: currentUser.<span class="hljs-property">id</span> }),
            <span class="hljs-attr">fields</span>: {
              <span class="hljs-attr">followingCount</span>: <span class="hljs-function">(<span class="hljs-params">existing</span>) =&gt;</span> existing + <span class="hljs-number">1</span>,
              <span class="hljs-attr">following</span>: <span class="hljs-function">(<span class="hljs-params">existingRefs = [], { toReference }</span>) =&gt;</span> {
                <span class="hljs-keyword">const</span> newRef = <span class="hljs-title function_">toReference</span>({ <span class="hljs-attr">__typename</span>: <span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-attr">id</span>: userId });
                <span class="hljs-keyword">return</span> [...existingRefs, newRef];
              },
            },
          });
        },
      });
    },
    [followUser],
  );
}
</code></pre>
<h2 id="أداء-الاشتراكات">أداء الاشتراكات</h2>
<p>نفّذ تحديثات فورية فعّالة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// WebSocket subscriptions with performance considerations</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">WebSocketLink</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@apollo/client/link/ws&#x27;</span>;
<span class="hljs-keyword">import</span> { getMainDefinition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@apollo/client/utilities&#x27;</span>;

<span class="hljs-keyword">const</span> wsLink = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocketLink</span>({
  <span class="hljs-attr">uri</span>: <span class="hljs-string">&#x27;wss://api.example.com/graphql&#x27;</span>,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">reconnect</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">reconnectionAttempts</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">connectionParams</span>: <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">authToken</span>: <span class="hljs-title function_">getAuthToken</span>(),
    }),
    <span class="hljs-comment">// Lazy connection - only connect when needed</span>
    <span class="hljs-attr">lazy</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// Keep alive</span>
    <span class="hljs-attr">keepAlive</span>: <span class="hljs-number">10000</span>,
    <span class="hljs-comment">// Connection timeout</span>
    <span class="hljs-attr">timeout</span>: <span class="hljs-number">30000</span>,
  },
});

<span class="hljs-comment">// Smart subscription management</span>
<span class="hljs-keyword">function</span> useSmartSubscription&lt;T&gt;(<span class="hljs-attr">subscription</span>: <span class="hljs-title class_">DocumentNode</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_">SubscriptionOptions</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> subscriptionRef = useRef&lt;<span class="hljs-built_in">any</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Only subscribe when component is visible</span>
    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span> &amp;&amp; !subscriptionRef.<span class="hljs-property">current</span>) {
          <span class="hljs-comment">// Start subscription</span>
          subscriptionRef.<span class="hljs-property">current</span> = client
            .<span class="hljs-title function_">subscribe</span>({
              <span class="hljs-attr">query</span>: subscription,
              <span class="hljs-attr">variables</span>: options?.<span class="hljs-property">variables</span>,
            })
            .<span class="hljs-title function_">subscribe</span>({
              <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> <span class="hljs-title function_">setData</span>(data),
              <span class="hljs-attr">error</span>: setError,
            });
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!entry.<span class="hljs-property">isIntersecting</span> &amp;&amp; subscriptionRef.<span class="hljs-property">current</span>) {
          <span class="hljs-comment">// Pause subscription when not visible</span>
          subscriptionRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">unsubscribe</span>();
          subscriptionRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
        }
      },
      { <span class="hljs-attr">threshold</span>: <span class="hljs-number">0.1</span> },
    );

    <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(options?.<span class="hljs-property">elementId</span> || <span class="hljs-string">&#x27;root&#x27;</span>);
    <span class="hljs-keyword">if</span> (element) observer.<span class="hljs-title function_">observe</span>(element);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      observer.<span class="hljs-title function_">disconnect</span>();
      subscriptionRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">unsubscribe</span>();
    };
  }, [subscription, options]);

  <span class="hljs-keyword">return</span> { data, error };
}

<span class="hljs-comment">// Subscription with deduplication</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">MESSAGE_SUBSCRIPTION</span> = gql\`<span class="language-graphql">
  <span class="hljs-keyword">subscription</span> OnMessage<span class="hljs-punctuation">(</span><span class="hljs-variable">$channelId</span>: ID<span class="hljs-punctuation">!</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>
    messageAdded<span class="hljs-punctuation">(</span><span class="hljs-symbol">channelId</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$channelId</span>) <span class="hljs-punctuation">{</span>
      id
      content
      author <span class="hljs-punctuation">{</span>
        id
        name
      <span class="hljs-punctuation">}</span>
      createdAt
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
\`</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MessageList</span>(<span class="hljs-params">{ channelId }: { channelId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: queryData } = <span class="hljs-title function_">useQuery</span>(<span class="hljs-variable constant_">MESSAGES_QUERY</span>, {
    <span class="hljs-attr">variables</span>: { channelId },
  });

  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: subData } = <span class="hljs-title function_">useSubscription</span>(<span class="hljs-variable constant_">MESSAGE_SUBSCRIPTION</span>, {
    <span class="hljs-attr">variables</span>: { channelId },
    <span class="hljs-comment">// Prevent duplicate messages</span>
    <span class="hljs-attr">onSubscriptionData</span>: <span class="hljs-function">(<span class="hljs-params">{ client, subscriptionData }</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> newMessage = subscriptionData.<span class="hljs-property">data</span>?.<span class="hljs-property">messageAdded</span>;
      <span class="hljs-keyword">if</span> (!newMessage) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">const</span> existing = client.<span class="hljs-title function_">readQuery</span>({
        <span class="hljs-attr">query</span>: <span class="hljs-variable constant_">MESSAGES_QUERY</span>,
        <span class="hljs-attr">variables</span>: { channelId },
      });

      <span class="hljs-comment">// Check for duplicates</span>
      <span class="hljs-keyword">const</span> messageExists = existing?.<span class="hljs-property">messages</span>?.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">msg</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> msg.<span class="hljs-property">id</span> === newMessage.<span class="hljs-property">id</span>);

      <span class="hljs-keyword">if</span> (!messageExists) {
        client.<span class="hljs-title function_">writeQuery</span>({
          <span class="hljs-attr">query</span>: <span class="hljs-variable constant_">MESSAGES_QUERY</span>,
          <span class="hljs-attr">variables</span>: { channelId },
          <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">messages</span>: [...(existing?.<span class="hljs-property">messages</span> || []), newMessage],
          },
        });
      }
    },
  });

  <span class="hljs-keyword">const</span> messages = queryData?.<span class="hljs-property">messages</span> || [];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {messages.map((message: any) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{message.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>{message.author.name}:<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> {message.content}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
