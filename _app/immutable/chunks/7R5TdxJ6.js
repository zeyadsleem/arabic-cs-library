const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="adding-types-to-express-responses",p="إضافة الأنواع إلى استجابات Express",t=[{depth:2,id:"أنماط-استجابة-api",text:"أنماط استجابة API"},{depth:2,id:"بث-الاستجابات-والأنواع-المعقدة",text:"بث الاستجابات والأنواع المعقّدة"},{depth:2,id:"تقنيات-تنميط-متقدمة-أدوات-قوية",text:"تقنيات تنميط متقدمة: أدوات قوية"},{depth:3,id:"أنواع-موسومة-لمزيد-من-الأمان",text:"أنواع موسومة لمزيد من الأمان"},{depth:3,id:"سلاسل-وسيط-آمنة-الأنواع",text:"سلاسل وسيط آمنة الأنواع"},{depth:3,id:"التعامل-مع-معالجات-المسارات-اللامتزامنة",text:"التعامل مع معالجات المسارات اللامتزامنة"},{depth:2,id:"معالجة-الأخطاء-المتكاملة-شبكة-الأمان",text:"معالجة الأخطاء المتكاملة: شبكة الأمان"},{depth:3,id:"وسيط-أخطاء-متنمط",text:"وسيط أخطاء متنمّط"},{depth:3,id:"أنواع-الأخطاء-الشاملة",text:"أنواع الأخطاء الشاملة"},{depth:2,id:"تكامل-النظام-جعل-typescript-يعمل-مع-منظومتك",text:"تكامل النظام: جعل TypeScript يعمل مع منظومتك"},{depth:3,id:"التكامل-مع-قواعد-البيانات",text:"التكامل مع قواعد البيانات"},{depth:3,id:"التكامل-مع-واجهات-api-الخارجية",text:"التكامل مع واجهات API الخارجية"},{depth:3,id:"التكامل-مع-الواجهة-الأمامية-عقود-api",text:"التكامل مع الواجهة الأمامية: عقود API"},{depth:2,id:"التنقيح-واستكشاف-الأخطاء-عندما-تسوء-الأنواع",text:"التنقيح واستكشاف الأخطاء: عندما تسوء الأنواع"},{depth:3,id:"أخطاء-الأنواع-الشائعة-وحلولها",text:"أخطاء الأنواع الشائعة وحلولها"},{depth:3,id:"تقنيات-التنقيح",text:"تقنيات التنقيح"},{depth:2,id:"اعتبارات-الأداء-أنواع-بلا-تنازلات",text:"اعتبارات الأداء: أنواع بلا تنازلات"},{depth:3,id:"حجم-الحزمة-وزمن-البدء",text:"حجم الحزمة وزمن البدء"},{depth:3,id:"إدارة-الذاكرة",text:"إدارة الذاكرة"},{depth:3,id:"تحسين-أداء-التحقق",text:"تحسين أداء التحقق"}],e=`<p>تمامًا كما ننمّط مدخلات الطلب، ينبغي أن ننمّط مخرجات الاستجابة لضمان اتساق API.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserResponse</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-built_in">string</span>;
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ id: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">UserResponse</span> | { error: <span class="hljs-built_in">string</span> }&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Fetch user logic...</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">UserResponse</span> = {
        <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
        <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;johndoe&#x27;</span>,
        <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
        <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      };

      res.<span class="hljs-title function_">json</span>(user);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// TypeScript ensures this matches the error shape we declared</span>
      res.<span class="hljs-title function_">status</span>(<span class="hljs-number">404</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User not found&#x27;</span> });
    }
  },
);
</code></pre>
<h2 id="أنماط-استجابة-api">أنماط استجابة API</h2>
<p>من أجل استجابات API متسقة، فكّر في تعريف أنماط قياسية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a standard API response structure</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
  };
}

<span class="hljs-comment">// Create helper functions for consistent responses</span>
<span class="hljs-keyword">function</span> sendSuccess&lt;T&gt;(<span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;T&gt;&gt;, <span class="hljs-attr">data</span>: T, status = <span class="hljs-number">200</span>) {
  <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(status).<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    data,
  });
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">sendError</span>(<span class="hljs-params">
  <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-built_in">never</span>&gt;&gt;,
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>,
  code = <span class="hljs-string">&#x27;INTERNAL_ERROR&#x27;</span>,
  status = <span class="hljs-number">500</span>,
  <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>,
</span>) {
  <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(status).<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">error</span>: {
      message,
      code,
      ...(details &amp;&amp; { details }),
    },
  });
}

<span class="hljs-comment">// Example usage</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">UserResponse</span>&gt;&gt;) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">findUser</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

      <span class="hljs-keyword">if</span> (!user) {
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">sendError</span>(res, <span class="hljs-string">&#x27;User not found&#x27;</span>, <span class="hljs-string">&#x27;USER_NOT_FOUND&#x27;</span>, <span class="hljs-number">404</span>);
      }

      <span class="hljs-keyword">return</span> <span class="hljs-title function_">sendSuccess</span>(res, user);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">sendError</span>(res, <span class="hljs-string">&#x27;Failed to retrieve user&#x27;</span>, <span class="hljs-string">&#x27;RETRIEVAL_ERROR&#x27;</span>, <span class="hljs-number">500</span>, error);
    }
  },
);
</code></pre>
<p>يوفر هذا النمط فوائد عدة:</p>
<ol>
<li>تنسيق استجابة API متسق في كل نقاط النهاية</li>
<li>سلامة الأنواع لكل من استجابات النجاح والأخطاء</li>
<li>فصل واضح بين معالجة النجاح ومعالجة الأخطاء</li>
<li>شيفرة متكررة أقل بفضل دوال المساعدة</li>
</ol>
<h2 id="بث-الاستجابات-والأنواع-المعقدة">بث الاستجابات والأنواع المعقّدة</h2>
<p>يستطيع Express إرسال أكثر من JSON فحسب. وبالنسبة إلى استجابات البث أو الأنواع المعقّدة، نحتاج إلى معالجة مخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Streaming file response</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/files/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ id: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// For streams, the Response generic type isn&#x27;t as helpful</span>
  <span class="hljs-comment">// because we&#x27;re not using res.json()</span>
  <span class="hljs-keyword">const</span> fileStream = <span class="hljs-title function_">getFileStream</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;application/pdf&#x27;</span>);
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Disposition&#x27;</span>, <span class="hljs-string">&#x27;attachment; filename=&quot;document.pdf&quot;&#x27;</span>);

  fileStream.<span class="hljs-title function_">pipe</span>(res);
});

<span class="hljs-comment">// For HTML responses</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">HtmlResponse</span> {
  <span class="hljs-attr">html</span>: <span class="hljs-built_in">string</span>;
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">HtmlResponse</span>&gt;</span>) =&gt;</span> {
  <span class="hljs-comment">// This isn&#x27;t ideal, as we&#x27;re using res.send() with HTML</span>
  <span class="hljs-comment">// but typing it as if it&#x27;s JSON</span>
  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;&lt;body&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/body&gt;&#x27;</span>);
});
</code></pre>
<p>في هذه الحالات، للنوع العام Response قيود. والنهج الأفضل هو استخدام أنواع اتحادية بحسب نوع المحتوى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define response types for different content types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">JsonResponse</span>&lt;T&gt; = <span class="hljs-title class_">Response</span>&lt;T&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">HtmlResponse</span> = <span class="hljs-title class_">Response</span>; <span class="hljs-comment">// HTML responses don&#x27;t benefit as much from typing</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StreamResponse</span> = <span class="hljs-title class_">Response</span>; <span class="hljs-comment">// Same for streams</span>

<span class="hljs-comment">// Create more specific route handler types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteHandlers</span> {
  json&lt;T, P = {}, Q = {}&gt;(<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;P, {}, {}, Q&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">JsonResponse</span>&lt;T&gt;): <span class="hljs-built_in">void</span>;

  <span class="hljs-title function_">html</span>(<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">HtmlResponse</span>): <span class="hljs-built_in">void</span>;

  <span class="hljs-title function_">stream</span>(<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">StreamResponse</span>): <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// Example usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">handlers</span>: <span class="hljs-title class_">RouteHandlers</span> = {
  json&lt;<span class="hljs-title class_">UserResponse</span>&gt;(req, res) {
    <span class="hljs-comment">// Handle JSON response</span>
    res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;johndoe&#x27;</span> });
  },

  <span class="hljs-title function_">html</span>(<span class="hljs-params">req, res</span>) {
    <span class="hljs-comment">// Handle HTML response</span>
    res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;&lt;body&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/body&gt;&#x27;</span>);
  },

  <span class="hljs-title function_">stream</span>(<span class="hljs-params">req, res</span>) {
    <span class="hljs-comment">// Handle stream response</span>
    <span class="hljs-title function_">getFileStream</span>().<span class="hljs-title function_">pipe</span>(res);
  },
};

<span class="hljs-comment">// Register routes</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>, handlers.<span class="hljs-property">json</span>);
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page&#x27;</span>, handlers.<span class="hljs-property">html</span>);
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/download&#x27;</span>, handlers.<span class="hljs-property">stream</span>);
</code></pre>
<p>يوفر هذا النهج وضوحًا أكبر بشأن نوع الاستجابة في معالجات مساراتك.</p>
<h2 id="تقنيات-تنميط-متقدمة-أدوات-قوية">تقنيات تنميط متقدمة: أدوات قوية</h2>
<p>الآن وقد غطّينا الأساسيات، لنستكشف تقنيات تنميط متقدمة تجعل Express مع TypeScript أقوى.</p>
<h3 id="أنواع-موسومة-لمزيد-من-الأمان">أنواع موسومة لمزيد من الأمان</h3>
<p>أحيانًا لا تكفي الأنواع الأساسية. فبالنسبة إلى المعرّفات والرموز وسلاسل النصوص الخاصة الأخرى، يمكننا استخدام الأنواع الموسومة (branded types):</p>
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
<p>تضمن الأنواع الموسومة ألا تخلط خطأً بين أنواع مختلفة من المعرّفات أو الرموز، مع أنها كلها سلاسل نصية في الأصل.</p>
<h3 id="سلاسل-وسيط-آمنة-الأنواع">سلاسل وسيط آمنة الأنواع</h3>
<p>قد يكون تنميط وسيط Express صعبًا على نحو صحيح، خصوصًا عندما يضيف الوسيط خصائص إلى الطلب:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define middleware that adds user to request</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RequestWithUser</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-title class_">UserId</span>;
    <span class="hljs-attr">roles</span>: <span class="hljs-built_in">string</span>[];
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">attachUser</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Authenticate and attach user</span>
  (req <span class="hljs-keyword">as</span> <span class="hljs-title class_">RequestWithUser</span>).<span class="hljs-property">user</span> = {
    <span class="hljs-attr">id</span>: <span class="hljs-title function_">createUserId</span>(<span class="hljs-string">&#x27;123&#x27;</span>),
    <span class="hljs-attr">roles</span>: [<span class="hljs-string">&#x27;user&#x27;</span>],
  };
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Type guard middleware</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isAuthenticated</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;user&#x27;</span> <span class="hljs-keyword">in</span> req)) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>);
  }
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Create a type-safe middleware chain builder</span>
<span class="hljs-keyword">function</span> createProtectedRoute&lt;
  P = <span class="hljs-title class_">ParamsDictionary</span>,
  <span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqQuery</span> = <span class="hljs-title class_">ParsedQs</span>,
&gt;(
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">RequestWithUser</span> &amp; <span class="hljs-title class_">Request</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ResBody</span>&gt;,
    <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span>,
  </span>) =&gt;</span> <span class="hljs-built_in">void</span>,
) {
  <span class="hljs-keyword">return</span> [attachUser, isAuthenticated, handler <span class="hljs-keyword">as</span> <span class="hljs-title class_">RequestHandler</span>];
}

<span class="hljs-comment">// Use it to define protected routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/admin&#x27;</span>,
  ...createProtectedRoute&lt;{}, { <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-comment">// req.user is properly typed and guaranteed to exist</span>
    <span class="hljs-keyword">if</span> (!req.<span class="hljs-property">user</span>.<span class="hljs-property">roles</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;admin&#x27;</span>)) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">403</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Forbidden&#x27;</span> });
    }

    res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Welcome to admin area&#x27;</span> });
  }),
);
</code></pre>
<p>يضمن هذا النمط وجود <code>req.user</code> وتنميطه على النحو الصحيح في معالج المسار، بفحوص في وقت التصريف ووقت التشغيل معًا.</p>
<h3 id="التعامل-مع-معالجات-المسارات-اللامتزامنة">التعامل مع معالجات المسارات اللامتزامنة</h3>
<p>لا يتعامل Express أصليًا مع الوعود، ما قد يؤدي إلى رفض غير معالَج. ويساعد غلاف آمن الأنواع في ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a wrapper for async route handlers</span>
<span class="hljs-keyword">function</span> asyncHandler&lt;P = <span class="hljs-title class_">ParamsDictionary</span>, <span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>, <span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>, <span class="hljs-title class_">ReqQuery</span> = <span class="hljs-title class_">ParsedQs</span>&gt;(
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ResBody</span>&gt;,
    <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span>,
  </span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;,
): <span class="hljs-title class_">RequestHandler</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-title function_">handler</span>(req, res, next)).<span class="hljs-title function_">catch</span>(next);
  };
}

<span class="hljs-comment">// Use it with async routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  asyncHandler&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }, <span class="hljs-title class_">UserResponse</span>&gt;(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">404</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User not found&#x27;</span> } <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>);
    }

    res.<span class="hljs-title function_">json</span>(user);
  }),
);
</code></pre>
<p>يضمن هذا النمط تمرير أي أخطاء في المعالجات اللامتزامنة إلى وسيط معالجة الأخطاء في Express على النحو الصحيح.</p>
<h2 id="معالجة-الأخطاء-المتكاملة-شبكة-الأمان">معالجة الأخطاء المتكاملة: شبكة الأمان</h2>
<p>معالجة الأخطاء السليمة حاسمة لـ APIs المتينة. ويساعد TypeScript على ضمان معالجة الأخطاء باتساق.</p>
<h3 id="وسيط-أخطاء-متنمط">وسيط أخطاء متنمّط</h3>
<p>لوسيط أخطاء Express بصمة مميزة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define structured error types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Error</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
}

<span class="hljs-comment">// Create typed error classes</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">NotFoundError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">AppError</span> {
  statusCode = <span class="hljs-number">404</span>;
  code = <span class="hljs-string">&#x27;NOT_FOUND&#x27;</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Resource not found&#x27;</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;NotFoundError&#x27;</span>;
  }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">AppError</span> {
  statusCode = <span class="hljs-number">400</span>;
  code = <span class="hljs-string">&#x27;VALIDATION_ERROR&#x27;</span>;
  <span class="hljs-attr">details</span>: <span class="hljs-built_in">unknown</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Validation failed&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;ValidationError&#x27;</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">details</span> = details;
  }
}

<span class="hljs-comment">// Create a type-safe error handler</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">errorHandler</span>(<span class="hljs-params"><span class="hljs-attr">err</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err);

  <span class="hljs-comment">// Handle known error types</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;statusCode&#x27;</span> <span class="hljs-keyword">in</span> err &amp;&amp; <span class="hljs-string">&#x27;code&#x27;</span> <span class="hljs-keyword">in</span> err) {
    <span class="hljs-keyword">const</span> appError = err <span class="hljs-keyword">as</span> <span class="hljs-title class_">AppError</span>;

    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(appError.<span class="hljs-property">statusCode</span>).<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">error</span>: {
        <span class="hljs-attr">message</span>: appError.<span class="hljs-property">message</span>,
        <span class="hljs-attr">code</span>: appError.<span class="hljs-property">code</span>,
        ...(appError.<span class="hljs-property">details</span> &amp;&amp; { <span class="hljs-attr">details</span>: appError.<span class="hljs-property">details</span> }),
      },
    });
  }

  <span class="hljs-comment">// Handle unknown errors</span>
  res.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>).<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">error</span>: {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;INTERNAL_ERROR&#x27;</span>,
    },
  });
}

<span class="hljs-comment">// Register the error handler (must be last)</span>
app.<span class="hljs-title function_">use</span>(errorHandler);

<span class="hljs-comment">// Usage in routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NotFoundError</span>(<span class="hljs-string">\`User with ID <span class="hljs-subst">\${req.params.id}</span> not found\`</span>);
    }

    res.<span class="hljs-title function_">json</span>(user);
  }),
);

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Validation logic</span>
      <span class="hljs-keyword">const</span> validatedData = <span class="hljs-title function_">validateUser</span>(req.<span class="hljs-property">body</span>);

      <span class="hljs-comment">// Create user</span>
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(validatedData);

      res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>(user);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (error.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;ValidationError&#x27;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ValidationError</span>(<span class="hljs-string">&#x27;User validation failed&#x27;</span>, error.<span class="hljs-property">details</span>);
      }
      <span class="hljs-keyword">throw</span> error;
    }
  }),
);
</code></pre>
<p>تضمن هذه المقاربة المنظمة لمعالجة الأخطاء ما يلي:</p>
<ol>
<li>كل الأخطاء متنمّطة على النحو الصحيح</li>
<li>استجابات الأخطاء تتبع تنسيقًا متسقًا</li>
<li>أنواع الأخطاء المختلفة تؤدي إلى رموز حالة HTTP مناسبة</li>
<li>تفاصيل الأخطاء محفوظة عند الحاجة</li>
</ol>
<h3 id="أنواع-الأخطاء-الشاملة">أنواع الأخطاء الشاملة</h3>
<p>لمقاربة متسقة في تطبيقك كله، عرّف أنواع الأخطاء في موضع مركزي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// errors.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">ErrorCode</span> {
  <span class="hljs-variable constant_">NOT_FOUND</span> = <span class="hljs-string">&#x27;NOT_FOUND&#x27;</span>,
  <span class="hljs-variable constant_">VALIDATION_ERROR</span> = <span class="hljs-string">&#x27;VALIDATION_ERROR&#x27;</span>,
  <span class="hljs-variable constant_">UNAUTHORIZED</span> = <span class="hljs-string">&#x27;UNAUTHORIZED&#x27;</span>,
  <span class="hljs-variable constant_">FORBIDDEN</span> = <span class="hljs-string">&#x27;FORBIDDEN&#x27;</span>,
  <span class="hljs-variable constant_">INTERNAL_ERROR</span> = <span class="hljs-string">&#x27;INTERNAL_ERROR&#x27;</span>,
  <span class="hljs-variable constant_">DATABASE_ERROR</span> = <span class="hljs-string">&#x27;DATABASE_ERROR&#x27;</span>,
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorResponse</span> {
  <span class="hljs-attr">error</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>;
    <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>;
  <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>, <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;AppError&#x27;</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">code</span> = code;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">statusCode</span> = statusCode;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">details</span> = details;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NotFoundError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AppError</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Resource not found&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message, <span class="hljs-title class_">ErrorCode</span>.<span class="hljs-property">NOT_FOUND</span>, <span class="hljs-number">404</span>, details);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;NotFoundError&#x27;</span>;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AppError</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Validation failed&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message, <span class="hljs-title class_">ErrorCode</span>.<span class="hljs-property">VALIDATION_ERROR</span>, <span class="hljs-number">400</span>, details);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;ValidationError&#x27;</span>;
  }
}

<span class="hljs-comment">// Additional error classes...</span>
</code></pre>
<p>ثم استخدم هذه الأنواع في تطبيقك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">NotFoundError</span>, <span class="hljs-title class_">ValidationError</span>, <span class="hljs-title class_">ErrorResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./errors&#x27;</span>;

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ id: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">UserResponse</span> | <span class="hljs-title class_">ErrorResponse</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-comment">// Route implementation...</span>
  },
);
</code></pre>
<h2 id="تكامل-النظام-جعل-typescript-يعمل-مع-منظومتك">تكامل النظام: جعل TypeScript يعمل مع منظومتك</h2>
<p>نادرًا ما توجد تطبيقات Express بمعزل عن غيرها. فهي تتكامل مع قواعد البيانات وواجهات API الخارجية وتطبيقات الواجهة الأمامية. ويستطيع TypeScript المساعدة في ضمان أن هذه التكاملات آمنة الأنواع.</p>
<h3 id="التكامل-مع-قواعد-البيانات">التكامل مع قواعد البيانات</h3>
<p>بالنسبة إلى عمليات قواعد البيانات، فكّر في استخدام ORM مثل TypeORM أو Prisma أو Sequelize يوفر دعم TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Using Prisma with TypeScript</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@prisma/client&#x27;</span>;

<span class="hljs-keyword">const</span> prisma = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PrismaClient</span>();

<span class="hljs-comment">// The User type is automatically generated from your schema</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserById</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> prisma.<span class="hljs-property">user</span>.<span class="hljs-title function_">findUnique</span>({
    <span class="hljs-attr">where</span>: { id },
  });
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NotFoundError</span>(<span class="hljs-string">\`User with ID <span class="hljs-subst">\${req.params.id}</span> not found\`</span>);
    }

    <span class="hljs-comment">// Prisma types match your database schema</span>
    res.<span class="hljs-title function_">json</span>(user);
  }),
);
</code></pre>
<h3 id="التكامل-مع-واجهات-api-الخارجية">التكامل مع واجهات API الخارجية</h3>
<p>عند نداء واجهات API خارجية، عرّف أنواعًا للاستجابات المتوقعة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define types for external API responses</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GithubUser</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">avatar_url</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Type-safe API client</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getGithubUser</span>(<span class="hljs-params"><span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">GithubUser</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://api.github.com/users/<span class="hljs-subst">\${username}</span>\`</span>);

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`GitHub API error: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
  }

  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">GithubUser</span>&gt;;
}

<span class="hljs-comment">// Use in a route</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/github/:username&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> githubUser = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getGithubUser</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">username</span>);

      <span class="hljs-comment">// Transform to our API format</span>
      <span class="hljs-keyword">const</span> user = {
        <span class="hljs-attr">id</span>: githubUser.<span class="hljs-property">id</span>.<span class="hljs-title function_">toString</span>(),
        <span class="hljs-attr">username</span>: githubUser.<span class="hljs-property">login</span>,
        <span class="hljs-attr">name</span>: githubUser.<span class="hljs-property">name</span>,
        <span class="hljs-attr">email</span>: githubUser.<span class="hljs-property">email</span>,
        <span class="hljs-attr">avatarUrl</span>: githubUser.<span class="hljs-property">avatar_url</span>,
      };

      res.<span class="hljs-title function_">json</span>(user);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;GitHub API error&#x27;</span>)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NotFoundError</span>(<span class="hljs-string">\`GitHub user <span class="hljs-subst">\${req.params.username}</span> not found\`</span>);
      }
      <span class="hljs-keyword">throw</span> error;
    }
  }),
);
</code></pre>
<h3 id="التكامل-مع-الواجهة-الأمامية-عقود-api">التكامل مع الواجهة الأمامية: عقود API</h3>
<p>بالنسبة إلى تطبيقات الواجهة الأمامية التي تستهلك API الخاص بك، أنشئ تعريفات أنواع مشتركة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// shared/api-types.ts (used by both frontend and backend)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">CreateUserRequest</span> {
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">PaginatedResponse</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">pageSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">hasMore</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// API endpoints type definitions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiEndpoints</span> {
  <span class="hljs-string">&#x27;GET /users&#x27;</span>: {
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">page</span>?: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">limit</span>?: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">search</span>?: <span class="hljs-built_in">string</span>;
    };
    <span class="hljs-attr">response</span>: <span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">PaginatedResponse</span>&lt;<span class="hljs-title class_">User</span>&gt;&gt;;
  };

  <span class="hljs-string">&#x27;GET /users/:id&#x27;</span>: {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    };
    <span class="hljs-attr">response</span>: <span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">User</span>&gt;;
  };

  <span class="hljs-string">&#x27;POST /users&#x27;</span>: {
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">CreateUserRequest</span>;
    <span class="hljs-attr">response</span>: <span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">User</span>&gt;;
  };

  <span class="hljs-comment">// Define other endpoints...</span>
}
</code></pre>
<p>ثم استخدم هذه الأنواع المشتركة في كل من خادم Express لديك وشيفرة الواجهة الأمامية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Backend usage</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ApiEndpoints</span>, <span class="hljs-title class_">User</span>, <span class="hljs-title class_">ApiResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../shared/api-types&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">GetUserParams</span> = <span class="hljs-title class_">ApiEndpoints</span>[<span class="hljs-string">&#x27;GET /users/:id&#x27;</span>][<span class="hljs-string">&#x27;params&#x27;</span>];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GetUserResponse</span> = <span class="hljs-title class_">ApiEndpoints</span>[<span class="hljs-string">&#x27;GET /users/:id&#x27;</span>][<span class="hljs-string">&#x27;response&#x27;</span>];

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-title class_">GetUserParams</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">GetUserResponse</span>&gt;</span>) =&gt;</span> {
  <span class="hljs-comment">// Implementation...</span>
});

<span class="hljs-comment">// Frontend usage (e.g., with fetch or axios)</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">User</span>&gt; = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">success</span> || !data.<span class="hljs-property">data</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(data.<span class="hljs-property">error</span>?.<span class="hljs-property">message</span> || <span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> data.<span class="hljs-property">data</span>;
}
</code></pre>
<p>تضمن مقاربة الأنواع المشتركة هذه فرض عقد API الخاص بك باتساق في الواجهة الأمامية والخلفية معًا.</p>
<h2 id="التنقيح-واستكشاف-الأخطاء-عندما-تسوء-الأنواع">التنقيح واستكشاف الأخطاء: عندما تسوء الأنواع</h2>
<p>حتى مع TypeScript، ستصادف أحيانًا مشكلات متعلقة بالأنواع. وإليك كيفية تنقيحها وحلها.</p>
<h3 id="أخطاء-الأنواع-الشائعة-وحلولها">أخطاء الأنواع الشائعة وحلولها</h3>
<h4>خطأ: الخاصية غير موجودة على النوع</h4>
<pre><code class="language-typescript"><span class="hljs-title class_">Property</span> <span class="hljs-string">&#x27;user&#x27;</span> does not exist on <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;Request&lt;ParamsDictionary, any, any, ParsedQs, Record&lt;string, any&gt;&gt;&#x27;</span>.
</code></pre>
<p>يحدث هذا غالبًا عندما تحاول الوصول إلى خصائص أضافها وسيط. والحلول:</p>
<ol>
<li>أعلن الخاصية في مساحة أسماء Express</li>
<li>استخدم واجهة مخصّصة توسّع Request</li>
<li>استخدم توكيد النوع (كملاذ أخير)</li>
</ol>
<h4>خطأ: النوع غير قابل للإسناد</h4>
<pre><code class="language-typescript"><span class="hljs-title class_">Type</span> <span class="hljs-string">&#x27;{ id: string; name: string; }&#x27;</span> is not assignable to <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;User&#x27;</span>.
  <span class="hljs-title class_">Property</span> <span class="hljs-string">&#x27;email&#x27;</span> is missing <span class="hljs-keyword">in</span> <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;{ id: string; name: string; }&#x27;</span> but required <span class="hljs-keyword">in</span> <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;User&#x27;</span>.
</code></pre>
<p>يحدث هذا عندما لا يطابق كائنك النوع المتوقع. والحلول:</p>
<ol>
<li>أضف الخصائص الناقصة</li>
<li>اجعل الخاصية اختيارية في الواجهة</li>
<li>استخدم نوعًا جزئيًا: <code>Partial&lt;User&gt;</code></li>
</ol>
<h4>خطأ: لا تحميل مطابق لهذا النداء</h4>
<pre><code class="language-typescript"><span class="hljs-title class_">No</span> overload matches <span class="hljs-variable language_">this</span> call.
  <span class="hljs-title class_">The</span> last overload gave the following error.
    <span class="hljs-title class_">Argument</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;(req: Request&lt;{ id: string; }&gt;, res: Response) =&gt; Promise&lt;void&gt;&#x27;</span> is not assignable to parameter <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-string">&#x27;RequestHandler&lt;...&gt;&#x27;</span>.
</code></pre>
<p>يحدث هذا غالبًا مع المعالجات اللامتزامنة. والحلول:</p>
<ol>
<li>استخدم غلافًا للمعالج اللامتزامن</li>
<li>أعد الوعد صراحةً</li>
<li>أضف معالجة أخطاء سليمة في الدالة اللامتزامنة</li>
</ol>
<h3 id="تقنيات-التنقيح">تقنيات التنقيح</h3>
<h4>فحص الأنواع</h4>
<p>استخدم معلومات التمرير في Visual Studio Code لفحص الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Hover over &#x27;req&#x27; to see its inferred type</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-comment">// Check req&#x27;s type</span>
});
</code></pre>
<h4>المعامل <code>typeof</code></h4>
<p>استخدم <code>typeof</code> لفحص أنواع وقت التشغيل:</p>
<pre><code class="language-typescript">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/data&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">typeof</span> req.<span class="hljs-property">body</span>); <span class="hljs-comment">// &quot;object&quot; if JSON, &quot;string&quot; if text, etc.</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> req.<span class="hljs-property">body</span> !== <span class="hljs-string">&#x27;object&#x27;</span> || req.<span class="hljs-property">body</span> === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Expected object body&#x27;</span>);
  }
});
</code></pre>
<h4>حرّاس الأنواع</h4>
<p>أنشئ حرّاس أنواع مخصّصين للتحقق من الأنواع في وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a type guard for User objects</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isUser</span>(<span class="hljs-params"><span class="hljs-attr">obj</span>: <span class="hljs-built_in">any</span></span>): obj is <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">return</span> (
    <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">&#x27;object&#x27;</span> &amp;&amp;
    obj !== <span class="hljs-literal">null</span> &amp;&amp;
    <span class="hljs-keyword">typeof</span> obj.<span class="hljs-property">id</span> === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp;
    <span class="hljs-keyword">typeof</span> obj.<span class="hljs-property">username</span> === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp;
    <span class="hljs-keyword">typeof</span> obj.<span class="hljs-property">email</span> === <span class="hljs-string">&#x27;string&#x27;</span>
  );
}

<span class="hljs-comment">// Use it in a route</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!<span class="hljs-title function_">isUser</span>(req.<span class="hljs-property">body</span>)) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Invalid user data&#x27;</span>);
  }

  <span class="hljs-comment">// req.body is now typed as User</span>
  <span class="hljs-keyword">const</span> { id, username, email } = req.<span class="hljs-property">body</span>;
});
</code></pre>
<h2 id="اعتبارات-الأداء-أنواع-بلا-تنازلات">اعتبارات الأداء: أنواع بلا تنازلات</h2>
<p>يضيف TypeScript أمانًا في وقت التصريف دون كلفة في وقت التشغيل، لكن لا تزال هناك اعتبارات أداء.</p>
<h3 id="حجم-الحزمة-وزمن-البدء">حجم الحزمة وزمن البدء</h3>
<p>يُصرَّف TypeScript بعيدًا، لكن فحص الأنواع في الشيفرة قد يضيف كلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Runtime type checking can impact performance</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateUser</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">if</span> (
    <span class="hljs-keyword">typeof</span> data !== <span class="hljs-string">&#x27;object&#x27;</span> ||
    data === <span class="hljs-literal">null</span> ||
    !(<span class="hljs-string">&#x27;username&#x27;</span> <span class="hljs-keyword">in</span> data) ||
    !(<span class="hljs-string">&#x27;email&#x27;</span> <span class="hljs-keyword">in</span> data) ||
    <span class="hljs-keyword">typeof</span> data.<span class="hljs-property">username</span> !== <span class="hljs-string">&#x27;string&#x27;</span> ||
    <span class="hljs-keyword">typeof</span> data.<span class="hljs-property">email</span> !== <span class="hljs-string">&#x27;string&#x27;</span>
  ) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ValidationError</span>(<span class="hljs-string">&#x27;Invalid user data&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> data <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>;
}

<span class="hljs-comment">// More efficient with schema validation libraries</span>
<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateUser</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">return</span> userSchema.<span class="hljs-title function_">parse</span>(data);
}
</code></pre>
<p>مكتبات التحقق من المخططات محسّنة للأداء، ما يجعلها أفضل من التحقق المكتوب يدويًا.</p>
<h3 id="إدارة-الذاكرة">إدارة الذاكرة</h3>
<p>لا يغيّر TypeScript إدارة الذاكرة في JavaScript، لكنه يساعد في منع تسريبات الذاكرة عبر التنميط السليم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without proper typing, this could leak</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">userCache</span>: <span class="hljs-built_in">any</span> = {};

<span class="hljs-comment">// With proper typing, it&#x27;s clear what&#x27;s stored</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">userCache</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span> }&gt; = {};

<span class="hljs-comment">// Even better, with a proper cache interface</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Cache</span>&lt;T&gt; {
  <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): T | <span class="hljs-literal">undefined</span>;
  <span class="hljs-title function_">set</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: T, <span class="hljs-attr">ttl</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span>;
  <span class="hljs-title function_">delete</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">UserCache</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Cache</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">cache</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">value</span>: <span class="hljs-title class_">User</span>; <span class="hljs-attr">expires</span>: <span class="hljs-built_in">number</span> }&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">User</span> | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">const</span> item = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key);

    <span class="hljs-keyword">if</span> (!item) <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;

    <span class="hljs-keyword">if</span> (item.<span class="hljs-property">expires</span> &lt; <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>()) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
    }

    <span class="hljs-keyword">return</span> item.<span class="hljs-property">value</span>;
  }

  <span class="hljs-title function_">set</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-title class_">User</span>, ttl = <span class="hljs-number">3600000</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">set</span>(key, {
      value,
      <span class="hljs-attr">expires</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() + ttl,
    });
  }

  <span class="hljs-title function_">delete</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
  }
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> userCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">UserCache</span>();
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-comment">// Try cache first</span>
    <span class="hljs-keyword">const</span> cachedUser = userCache.<span class="hljs-title function_">get</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (cachedUser) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>(cachedUser);
    }

    <span class="hljs-comment">// Fetch and cache</span>
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (user) {
      userCache.<span class="hljs-title function_">set</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>, user);
    }

    res.<span class="hljs-title function_">json</span>(user);
  }),
);
</code></pre>
<h3 id="تحسين-أداء-التحقق">تحسين أداء التحقق</h3>
<p>بالنسبة إلى APIs ذات الإنتاجية العالية، قد يصبح التحقق عنق زجاجة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Optimize schema validation for performance</span>
<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
});

<span class="hljs-comment">// Precompile the validation schema</span>
<span class="hljs-keyword">const</span> validateUser = userSchema.<span class="hljs-property">parse</span>;

<span class="hljs-comment">// Use in route handlers</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">validateUser</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-comment">// ...</span>
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-comment">// ...</span>
  }
});
</code></pre>
<p>بالنسبة إلى المسارات الحرجة، فكّر في التحقق الانتقائي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Validate only what you use</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> page = <span class="hljs-title class_">Number</span>(req.<span class="hljs-property">query</span>.<span class="hljs-property">page</span> || <span class="hljs-string">&#x27;1&#x27;</span>);
  <span class="hljs-keyword">const</span> limit = <span class="hljs-title class_">Number</span>(req.<span class="hljs-property">query</span>.<span class="hljs-property">limit</span> || <span class="hljs-string">&#x27;10&#x27;</span>);

  <span class="hljs-comment">// Only validate pagination parameters</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(page) || page &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Invalid page parameter&#x27;</span>);
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(limit) || limit &lt; <span class="hljs-number">1</span> || limit &gt; <span class="hljs-number">100</span>) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Invalid limit parameter&#x27;</span>);
  }

  <span class="hljs-comment">// Proceed with validated parameters</span>
});
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
