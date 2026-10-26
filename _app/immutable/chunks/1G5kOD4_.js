const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="adding-types-to-express",p="إضافة الأنواع إلى طلبات Express",t=[{depth:2,id:"معاملات-الطلب",text:"معاملات الطلب"},{depth:3,id:"تنميط-معاملات-url",text:"تنميط معاملات URL"},{depth:3,id:"تنميط-معاملات-الاستعلام",text:"تنميط معاملات الاستعلام"},{depth:3,id:"تنميط-أجسام-الطلبات",text:"تنميط أجسام الطلبات"},{depth:3,id:"تنميط-الطلب-الشامل",text:"تنميط الطلب الشامل"},{depth:2,id:"توسيع-كائن-الطلب",text:"توسيع كائن الطلب"},{depth:3,id:"الإعلان-عن-توسعات-الطلب",text:"الإعلان عن توسعات الطلب"},{depth:3,id:"التوسعات-الخاصة-بالوسيط",text:"التوسعات الخاصة بالوسيط"}],e=`<p>لم يُبنَ نظام الأنواع في Express مع أخذ TypeScript في الحسبان. وتوفّر حزمة <code>@types/express</code> تعريفات أنواع أساسية، لكن استخدامها بفعالية يتطلب فهم دقائقها.</p>
<p>يدور Express أساسًا حول ثلاثة أنواع جوهرية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span>, <span class="hljs-title class_">NextFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
  <span class="hljs-comment">// Route handler logic</span>
});
</code></pre>
<p>واجهتا Request و Response عامتان:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Request</span>&lt;
  P = <span class="hljs-title class_">ParamsDictionary</span>,
  <span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqQuery</span> = <span class="hljs-title class_">ParsedQs</span>,
  <span class="hljs-title class_">Locals</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;,
&gt;
  <span class="hljs-keyword">extends</span> core.<span class="hljs-title class_">Request</span> {}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>, <span class="hljs-title class_">Locals</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt;
  <span class="hljs-keyword">extends</span> core.<span class="hljs-title class_">Response</span> {}
</code></pre>
<p>تلك الأنواع <code>any</code> مناطق خطر. فهي تمثل الأجزاء الجامحة غير المروَّضة من عقد API لديك التي لا يستطيع TypeScript التحقق منها. ومهمتنا أن نستبدلها بأنواع دقيقة تعكس السلوك الفعلي لـ API الخاص بك.</p>
<h2 id="معاملات-الطلب">معاملات الطلب</h2>
<p>تصل معاملات الطلب عبر ثلاث قنوات: معاملات URL، وسلاسل الاستعلام، وأجسام الطلبات. ويحتاج كل منها إلى استراتيجيات تنميط متمايزة.</p>
<h3 id="تنميط-معاملات-url">تنميط معاملات URL</h3>
<p>تمثل معاملات URL متغيّرات المسار في تعريفات مساراتك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define the parameter structure</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserParams</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users/:userId&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-title class_">UserParams</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript now knows req.params.userId exists and is a string</span>
  <span class="hljs-keyword">const</span> userId = req.<span class="hljs-property">params</span>.<span class="hljs-property">userId</span>;
});
</code></pre>
<p>هذا النهج يعمل، لكن فيه قيد: لا يتحقق TypeScript من أن أسماء المعاملات في سلسلة المسار تطابق واجهتك. ولذلك نحتاج أدوات إضافية مثل <a href="https://npm.im/express-validator"><code>express-validator</code></a> أو تقنيات متقدمة سنستكشفها لاحقًا.</p>
<h3 id="تنميط-معاملات-الاستعلام">تنميط معاملات الاستعلام</h3>
<p>تطرح سلاسل الاستعلام تحديًا فريدًا لأنها اختيارية بطبيعتها ويمكن أن تظهر أكثر من مرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserQuery</span> {
  <span class="hljs-attr">sort</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">filter</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">page</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Query params are always strings with basic Express typing</span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, {}, <span class="hljs-title class_">UserQuery</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript knows about req.query.sort, req.query.filter, etc.</span>
  <span class="hljs-keyword">const</span> page = <span class="hljs-title class_">Number</span>(req.<span class="hljs-property">query</span>.<span class="hljs-property">page</span> || <span class="hljs-string">&#x27;1&#x27;</span>);
});
</code></pre>
<p>لاحظ الكائنات الفارغة في النوع العام Request؛ فهي تمثل params و body، وهما غير مستخدمين في هذا المسار.</p>
<h3 id="تنميط-أجسام-الطلبات">تنميط أجسام الطلبات</h3>
<p>تأتي أجسام الطلبات عادةً من طلبات <code>POST</code> أو <code>PUT</code> أو <code>PATCH</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CreateUserBody</span> {
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, <span class="hljs-title class_">CreateUserBody</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript knows req.body has username, email, and password properties</span>
  <span class="hljs-keyword">const</span> { username, email, password } = req.<span class="hljs-property">body</span>;
});
</code></pre>
<p>لكن هناك مأخذ: لا يتحقق Express من أن الطلب الوارد يطابق واجهتك. فقد يرسل طلب خبيث أو مشوّه بيانات مختلفة تمامًا، ولن يلتقط TypeScript ذلك في وقت التشغيل.</p>
<h3 id="تنميط-الطلب-الشامل">تنميط الطلب الشامل</h3>
<p>بالنسبة إلى المسارات التي تستخدم مصادر معاملات متعددة، يمكنك الجمع بين هذه الأساليب:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserRequest</span> {
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">fields</span>?: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
  };
}

app.<span class="hljs-title function_">patch</span>(
  <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-title class_">UserRequest</span>[<span class="hljs-string">&#x27;params&#x27;</span>], {}, <span class="hljs-title class_">UserRequest</span>[<span class="hljs-string">&#x27;body&#x27;</span>], <span class="hljs-title class_">UserRequest</span>[<span class="hljs-string">&#x27;query&#x27;</span>]&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>,
  </span>) =&gt;</span> {
    <span class="hljs-comment">// Fully typed request with params, query, and body</span>
  },
);
</code></pre>
<p>يصبح هذا النمط مطوّلًا سريعًا. ولإدارة التعقيد، سنستكشف مساعدات أنواع مخصّصة لاحقًا.</p>
<h2 id="توسيع-كائن-الطلب">توسيع كائن الطلب</h2>
<p>يتيح Express توسيع كائن Request بخصائص مخصّصة، وغالبًا ما يحدث ذلك في وسيط. ويحتاج TypeScript إلى معرفة هذه التوسعات.</p>
<h3 id="الإعلان-عن-توسعات-الطلب">الإعلان عن توسعات الطلب</h3>
<p>تتيح مساحة أسماء Express توسيع واجهة Request:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In a declaration file (e.g., types.d.ts)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">namespace</span> <span class="hljs-title class_">Express</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Request</span> {
    <span class="hljs-attr">user</span>?: {
      <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">roles</span>: <span class="hljs-built_in">string</span>[];
    };
    <span class="hljs-attr">requestId</span>: <span class="hljs-built_in">string</span>;
  }
}

<span class="hljs-comment">// Now this works everywhere</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/profile&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript knows req.user and req.requestId exist</span>
  <span class="hljs-keyword">if</span> (req.<span class="hljs-property">user</span>) {
    <span class="hljs-comment">// Do something with the authenticated user</span>
  }
});
</code></pre>
<p>يعمل هذا النهج جيدًا للتوسعات على مستوى التطبيق كله، لكن له مساوئ:</p>
<ol>
<li>يطبّق التوسعة عالميًا، حتى حيث قد لا تكون صحيحة.</li>
<li>لا يقدم ضمانات في وقت التصريف بأن الوسيط قد أرفق هذه الخصائص فعلًا.</li>
</ol>
<h3 id="التوسعات-الخاصة-بالوسيط">التوسعات الخاصة بالوسيط</h3>
<p>لمزيد من التحكم الدقيق، يمكننا استخدام وسيط يضمن وجود الخصائص:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a middleware that attaches user data</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">attachUser</span>: <span class="hljs-title class_">RequestHandler</span> = <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  <span class="hljs-comment">// Authenticate and attach user</span>
  req.<span class="hljs-property">user</span> = { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">roles</span>: [<span class="hljs-string">&#x27;admin&#x27;</span>] };
  <span class="hljs-title function_">next</span>();
};

<span class="hljs-comment">// Create a type guard to verify user exists</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ensureAuth</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">if</span> (!req.<span class="hljs-property">user</span>) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>);
  }
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Use them together to ensure type safety</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/admin&#x27;</span>, attachUser, ensureAuth, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript now knows req.user exists and is non-null</span>
  <span class="hljs-keyword">const</span> { id, roles } = req.<span class="hljs-property">user</span>; <span class="hljs-comment">// No need for null check</span>
});
</code></pre>
<p>ولأنماط أكثر تطورًا، يمكننا إنشاء أنواع وسيط مخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a custom request type with guaranteed user property</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthenticatedRequest</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">roles</span>: <span class="hljs-built_in">string</span>[];
  };
}

<span class="hljs-comment">// Define middleware that guarantees the user property</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">authenticateMiddleware</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Authentication logic...</span>
  (req <span class="hljs-keyword">as</span> <span class="hljs-title class_">AuthenticatedRequest</span>).<span class="hljs-property">user</span> = { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">roles</span>: [<span class="hljs-string">&#x27;user&#x27;</span>] };
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Define a route handler that uses the authenticated request</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">adminHandler</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">AuthenticatedRequest</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// TypeScript knows req.user exists and has the correct shape</span>
  <span class="hljs-keyword">const</span> { id, roles } = req.<span class="hljs-property">user</span>;

  <span class="hljs-keyword">if</span> (!roles.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;admin&#x27;</span>)) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">403</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Forbidden&#x27;</span>);
  }

  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">\`Welcome, admin <span class="hljs-subst">\${id}</span>!\`</span>);
}

<span class="hljs-comment">// Wire it all together</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/admin&#x27;</span>, authenticateMiddleware, adminHandler);
</code></pre>
<p>يضمن هذا النمط ألا يعمل معالج المسار إلا عند وجود <code>req.user</code>، فيوفر ضمانات في وقت التشغيل <em>و</em> في وقت التصريف معًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
