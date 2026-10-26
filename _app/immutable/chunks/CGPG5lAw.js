const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",l="branded-types-express",p="الأنواع الموسومة مع Express",e=[],t=`<p>أحيانًا لا تكفي الأنواع الأساسية. فالمعرّفات والرموز (tokens) وغيرها من النصوص الخاصة يمكن أن نستخدم لها الأنواع الموسومة (branded types):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define branded types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserId</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-keyword">readonly</span> <span class="hljs-attr">_brand</span>: unique <span class="hljs-built_in">symbol</span> };
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SessionToken</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-keyword">readonly</span> <span class="hljs-attr">_brand</span>: unique <span class="hljs-built_in">symbol</span> };

<span class="hljs-comment">// Create functions to safely create branded types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createUserId</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">UserId</span> {
  <span class="hljs-keyword">return</span> id <span class="hljs-keyword">as</span> <span class="hljs-title class_">UserId</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createSessionToken</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">SessionToken</span> {
  <span class="hljs-keyword">return</span> token <span class="hljs-keyword">as</span> <span class="hljs-title class_">SessionToken</span>;
}

<span class="hljs-comment">// Use in request and response types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GetUserRequest</span> {
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">userId</span>: <span class="hljs-title class_">UserId</span>;
  };
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserResponse</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-title class_">UserId</span>;
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthResponse</span> {
  <span class="hljs-attr">token</span>: <span class="hljs-title class_">SessionToken</span>;
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">UserResponse</span>;
}

<span class="hljs-comment">// Example usage</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users/:userId&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-title class_">GetUserRequest</span>[<span class="hljs-string">&#x27;params&#x27;</span>]&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">UserResponse</span>&gt;</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> rawUserId = req.<span class="hljs-property">params</span>.<span class="hljs-property">userId</span>;

  <span class="hljs-comment">// Convert string to branded type</span>
  <span class="hljs-keyword">const</span> userId = <span class="hljs-title function_">createUserId</span>(rawUserId);

  <span class="hljs-comment">// Now we have a type-safe userId that can&#x27;t be confused with other string IDs</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">getUserById</span>(userId);

  res.<span class="hljs-title function_">json</span>(user);
});

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">AuthResponse</span>&gt;</span>) =&gt;</span> {
  <span class="hljs-comment">// Generate a session token</span>
  <span class="hljs-keyword">const</span> token = <span class="hljs-title function_">createSessionToken</span>(<span class="hljs-title function_">generateRandomToken</span>());

  <span class="hljs-comment">// Get user</span>
  <span class="hljs-keyword">const</span> userId = <span class="hljs-title function_">createUserId</span>(<span class="hljs-string">&#x27;123&#x27;</span>);
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">getUserById</span>(userId);

  <span class="hljs-comment">// Return typed response</span>
  res.<span class="hljs-title function_">json</span>({
    token,
    user,
  });
});
</code></pre>
<p>تضمن الأنواع الموسومة ألّا تخلط بالخطأ بين أنواع مختلفة من المعرّفات أو الرموز، حتى وإن كانت جميعها نصوصًا في جوهرها.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
