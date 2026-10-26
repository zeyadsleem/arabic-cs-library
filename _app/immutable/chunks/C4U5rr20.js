const s="kinney",a="react-typescript",n="React مع TypeScript",l="security-and-escaping-types",t="الأمن وأنواع التهريب",p=[{depth:2,id:"المشكلة-مع-الثقة",text:"المشكلة مع الثقة"},{depth:2,id:"نمذجة-الثقة-عبر-الأنواع",text:"نمذجة الثقة عبر الأنواع"},{depth:2,id:"تصيير-html-الآمن-من-حيث-الأنواع",text:"تصيير HTML الآمن من حيث الأنواع"},{depth:2,id:"التعامل-الآمن-مع-مدخلات-النماذج",text:"التعامل الآمن مع مدخلات النماذج"},{depth:2,id:"التحقق-من-البريد-الإلكتروني-بأمان",text:"التحقّق من البريد الإلكتروني بأمان"},{depth:2,id:"التكامل-مع-واجهات-البرمجة-في-العالم-الحقيقي",text:"التكامل مع واجهات البرمجة في العالم الحقيقي"},{depth:2,id:"متقدم-سياسات-أمن-المحتوى",text:"متقدّم: سياسات أمن المحتوى"},{depth:2,id:"دوال-مساعدة-للحالات-الشائعة",text:"دوالّ مساعدة للحالات الشائعة"},{depth:2,id:"اختبار-إجراءاتك-الأمنية",text:"اختبار إجراءاتك الأمنية"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"ما-أنجزناه",text:"ما أنجزناه"}],e=`<p>لا تزال هجمات البرمجة العابرة للموقع (XSS) واحدة من أكثر ثغرات أمن الويب شيوعًا، وتطبيقات React ليست بمنأى منها. ولأنّ JSX في React يوفّر بعض الحماية المدمجة عبر تهريب القيم افتراضيًا، ما زالت هناك طرق كثيرة لإيذاء نفسك — خاصةً عند التعامل مع المحتوى الذي ينشئه المستخدم، أو واجهات برمجية من طرف ثالث، أو تلك الخاصية التي تبدو بريئة <code>dangerouslySetInnerHTML</code>. لنستكشف كيف يمكن لـ TypeScript أن يساعدنا في بناء تطبيقات React أكثر أمانًا عبر إنشاء تجريدات آمنة من حيث الأنواع للتعامل مع المحتوى غير الموثوق.</p>
<p>وفي نهاية هذا الدليل ستفهم كيف تستعمل نظام أنواع TypeScript لإلزام التنقية الصحيحة، وكيف تصنع أغلفة آمنة حول العمليات الخطرة، وكيف تبني نموذجًا ذهنيًا للتفكير في البيانات الموثوقة مقابل غير الموثوقة في كل أنحاء تطبيقك.</p>
<h2 id="المشكلة-مع-الثقة">المشكلة مع الثقة</h2>
<p>قبل أن نغوص في الحلول، لنُرسِخ المشكلة الجوهرية: في تطبيق ويب، لا كل السلاسل متساوية. بعض السلاسل آمنة للتصيير مباشرةً، بينما يحتاج بعضها إلى تنقية أو تهريب أولًا.</p>
<p>تأمّل هذا المكوّن في React الذي يبدو بريئًا تمامًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Dangerous - what if content contains &lt;script&gt; tags?</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ bio }: { bio: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">bio</span> }} /&gt;</span></span>;
}
</code></pre>
<p>إذا احتوى <code>bio</code> على شيء مثل <code>&lt;script&gt;alert('XSS!');&lt;/script&gt;</code>، فقد نفّذت للتوّ شيفرة JavaScript عشوائية في متصفّح المستخدم. ليس مثاليًا.</p>
<p>النهج التقليدي هو أن تتذكّر أن تنقّي المدخلات يدويًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">DOMPurify</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;dompurify&#x27;</span>;

<span class="hljs-comment">// ✅ Better, but easy to forget</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ bio }: { bio: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> sanitizedBio = <span class="hljs-title class_">DOMPurify</span>.<span class="hljs-title function_">sanitize</span>(bio);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">sanitizedBio</span> }} /&gt;</span></span>;
}
</code></pre>
<p>هذا يعمل، لكنه يعتمد على انضباط المطوّر. وماذا يحدث عندما يضيف أحدهم مكوّنًا جديدًا بعد ستّة أشهر ويتّنسى خطوة التنقية؟ يمكن لـ TypeScript أن يساعدنا في جعل هذا الخطأ مستحيلًا.</p>
<h2 id="نمذجة-الثقة-عبر-الأنواع">نمذجة الثقة عبر الأنواع</h2>
<p>الفكرة المحورية أنّنا يمكننا استعمال نظام أنواع TypeScript للتمييز بين السلاسل الموثوقة وغير الموثوقة. وبعد أن تُنقّى السلسلة تنقيةً سليمة، سنغلّفها في نوع موسوم (branded) لا يمكن إنشاؤه إلّا عبر عمليات آمنة.</p>
<p>لنبدأ بتعريف أنواعنا الأساسية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Brand types to distinguish trusted from untrusted content</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UntrustedString</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-keyword">readonly</span> <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;UntrustedString&#x27;</span> };
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">TrustedHtml</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-keyword">readonly</span> <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;TrustedHtml&#x27;</span> };
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">TrustedText</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-keyword">readonly</span> <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;TrustedText&#x27;</span> };

<span class="hljs-comment">// Helper to create untrusted strings from user input</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">untrusted</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">UntrustedString</span> {
  <span class="hljs-keyword">return</span> value <span class="hljs-keyword">as</span> <span class="hljs-title class_">UntrustedString</span>;
}
</code></pre>
<p>هذه <strong>أنواع موسومة</strong> — ما زالت نصوصًا وقت التشغيل، لكنّ TypeScript يتعامل معها كأنواع متمايزة. وخاصية <code>__brand</code> موجودة في نظام الأنواع وحده، وتساعد على منع الخلط العرضي بين المحتوى الموثوق وغير الموثوق.</p>
<p>الآن يمكننا إنشاء دوالّ تحوّل المحتوى غير الموثوق إلى محتوى موثوق بأمان:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">DOMPurify</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;dompurify&#x27;</span>;

<span class="hljs-comment">// Sanitize HTML content, removing dangerous elements and attributes</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-params"><span class="hljs-attr">content</span>: <span class="hljs-title class_">UntrustedString</span></span>): <span class="hljs-title class_">TrustedHtml</span> {
  <span class="hljs-keyword">const</span> sanitized = <span class="hljs-title class_">DOMPurify</span>.<span class="hljs-title function_">sanitize</span>(content, {
    <span class="hljs-attr">ALLOWED_TAGS</span>: [<span class="hljs-string">&#x27;p&#x27;</span>, <span class="hljs-string">&#x27;br&#x27;</span>, <span class="hljs-string">&#x27;strong&#x27;</span>, <span class="hljs-string">&#x27;em&#x27;</span>, <span class="hljs-string">&#x27;ul&#x27;</span>, <span class="hljs-string">&#x27;ol&#x27;</span>, <span class="hljs-string">&#x27;li&#x27;</span>, <span class="hljs-string">&#x27;a&#x27;</span>],
    <span class="hljs-attr">ALLOWED_ATTR</span>: [<span class="hljs-string">&#x27;href&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>],
    <span class="hljs-attr">FORBID_ATTR</span>: [<span class="hljs-string">&#x27;style&#x27;</span>, <span class="hljs-string">&#x27;onerror&#x27;</span>, <span class="hljs-string">&#x27;onload&#x27;</span>],
  });
  <span class="hljs-keyword">return</span> sanitized <span class="hljs-keyword">as</span> <span class="hljs-title class_">TrustedHtml</span>;
}

<span class="hljs-comment">// Escape text content for safe display</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">escapeText</span>(<span class="hljs-params"><span class="hljs-attr">content</span>: <span class="hljs-title class_">UntrustedString</span></span>): <span class="hljs-title class_">TrustedText</span> {
  <span class="hljs-keyword">return</span> content
    .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">&#x27;&amp;&#x27;</span>)
    .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;/g</span>, <span class="hljs-string">&#x27;&lt;&#x27;</span>)
    .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&gt;/g</span>, <span class="hljs-string">&#x27;&gt;&#x27;</span>)
    .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&quot;/g</span>, <span class="hljs-string">&#x27;&quot;&#x27;</span>)
    .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&#x27;/g</span>, <span class="hljs-string">&#x27;&amp;#x27;&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">TrustedText</span>;
}
</code></pre>
<h2 id="تصيير-html-الآمن-من-حيث-الأنواع">تصيير HTML الآمن من حيث الأنواع</h2>
<p>الآن يمكننا إنشاء مكوّن يقبل HTML موثوقًا فقط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SafeHtmlProps</span> {
  <span class="hljs-attr">content</span>: <span class="hljs-title class_">TrustedHtml</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SafeHtml</span>(<span class="hljs-params">{ content, className }: <span class="hljs-title class_">SafeHtmlProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">content</span> }} /&gt;</span></span>;
}
</code></pre>
<p>جمال هذا النهج أنّ <code>SafeHtml</code> لا يمكن استعماله إلّا مع محتوى تنقيته صراحةً:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ bio }: { bio: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// This forces explicit sanitization</span>
  <span class="hljs-keyword">const</span> trustedBio = <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-title function_">untrusted</span>(bio));

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SafeHtml</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{trustedBio}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ❌ TypeScript error - can&#x27;t pass raw string</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BrokenProfile</span>(<span class="hljs-params">{ bio }: { bio: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SafeHtml</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{bio}</span> /&gt;</span></span>; <span class="hljs-comment">// Error: Type &#x27;string&#x27; is not assignable to type &#x27;TrustedHtml&#x27;</span>
}
</code></pre>
<h2 id="التعامل-الآمن-مع-مدخلات-النماذج">التعامل الآمن مع مدخلات النماذج</h2>
<p>مدخلات النماذج مصدر شائع آخر لثغرات XSS. لنصنع نمطًا آمنًا من حيث الأنواع للتعامل مع إدخال المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormData</span> {
  <span class="hljs-attr">username</span>: <span class="hljs-title class_">UntrustedString</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-title class_">UntrustedString</span>;
  <span class="hljs-attr">bio</span>: <span class="hljs-title class_">UntrustedString</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = useState&lt;<span class="hljs-title class_">FormData</span>&gt;({
    <span class="hljs-attr">username</span>: <span class="hljs-title function_">untrusted</span>(<span class="hljs-string">&#x27;&#x27;</span>),
    <span class="hljs-attr">email</span>: <span class="hljs-title function_">untrusted</span>(<span class="hljs-string">&#x27;&#x27;</span>),
    <span class="hljs-attr">bio</span>: <span class="hljs-title function_">untrusted</span>(<span class="hljs-string">&#x27;&#x27;</span>),
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();

    <span class="hljs-comment">// Validate and sanitize before sending to server</span>
    <span class="hljs-keyword">const</span> safeData = {
      <span class="hljs-attr">username</span>: <span class="hljs-title function_">escapeText</span>(formData.<span class="hljs-property">username</span>),
      <span class="hljs-attr">email</span>: <span class="hljs-title function_">validateEmail</span>(formData.<span class="hljs-property">email</span>),
      <span class="hljs-attr">bio</span>: <span class="hljs-title function_">sanitizeHtml</span>(formData.<span class="hljs-property">bio</span>),
    };

    <span class="hljs-title function_">submitUserData</span>(safeData);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputChange</span> =
    (<span class="hljs-params"><span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">FormData</span></span>) =&gt; <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span> | <span class="hljs-title class_">HTMLTextAreaElement</span>&gt;</span>) =&gt;</span> {
      <span class="hljs-title function_">setFormData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
        ...prev,
        [field]: <span class="hljs-title function_">untrusted</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>),
      }));
    };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.username}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange(</span>&#x27;<span class="hljs-attr">username</span>&#x27;)}
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Username&quot;</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.email}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange(</span>&#x27;<span class="hljs-attr">email</span>&#x27;)}
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.bio}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange(</span>&#x27;<span class="hljs-attr">bio</span>&#x27;)} <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Bio&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحقق-من-البريد-الإلكتروني-بأمان">التحقّق من البريد الإلكتروني بأمان</h2>
<p>إليك كيف يمكننا تنفيذ دالة <code>validateEmail</code> تلك مع معالجة أخطاء سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">public</span> <span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>,
  </span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;ValidationError&#x27;</span>;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">validateEmail</span>(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-title class_">UntrustedString</span></span>): <span class="hljs-title class_">TrustedText</span> {
  <span class="hljs-keyword">const</span> emailRegex = <span class="hljs-regexp">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</span>;

  <span class="hljs-keyword">if</span> (!emailRegex.<span class="hljs-title function_">test</span>(email)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ValidationError</span>(<span class="hljs-string">&#x27;Invalid email format&#x27;</span>, <span class="hljs-string">&#x27;email&#x27;</span>);
  }

  <span class="hljs-comment">// Additional sanitization - remove any potential HTML/JS</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">escapeText</span>(email);
}
</code></pre>
<h2 id="التكامل-مع-واجهات-البرمجة-في-العالم-الحقيقي">التكامل مع واجهات البرمجة في العالم الحقيقي</h2>
<p>عند العمل مع واجهات برمجية خارجية، غالبًا ما لا يمكنك الوثوق بالبيانات التي تتلقّاها. وإليك كيف تتعامل مع استجابات الواجهات البرمجية بأمان:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Define expected API response structure</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ApiUserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">number</span>(),
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">bio</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">avatar_url</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ApiUser</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">ApiUserSchema</span>&gt;;

<span class="hljs-comment">// Transform API data into our trusted types</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-title class_">Promise</span>&lt;{
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">username</span>: <span class="hljs-title class_">TrustedText</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-title class_">TrustedText</span>;
  <span class="hljs-attr">bio</span>: <span class="hljs-title class_">TrustedHtml</span>;
  <span class="hljs-attr">avatarUrl</span>?: <span class="hljs-built_in">string</span>;
}&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>);
  <span class="hljs-keyword">const</span> rawData = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

  <span class="hljs-comment">// Validate the structure first</span>
  <span class="hljs-keyword">const</span> userData = <span class="hljs-title class_">ApiUserSchema</span>.<span class="hljs-title function_">parse</span>(rawData);

  <span class="hljs-comment">// Then sanitize the content</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">id</span>: userData.<span class="hljs-property">id</span>,
    <span class="hljs-attr">username</span>: <span class="hljs-title function_">escapeText</span>(<span class="hljs-title function_">untrusted</span>(userData.<span class="hljs-property">username</span>)),
    <span class="hljs-attr">email</span>: <span class="hljs-title function_">escapeText</span>(<span class="hljs-title function_">untrusted</span>(userData.<span class="hljs-property">email</span>)),
    <span class="hljs-attr">bio</span>: <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-title function_">untrusted</span>(userData.<span class="hljs-property">bio</span>)),
    <span class="hljs-attr">avatarUrl</span>: userData.<span class="hljs-property">avatar_url</span>,
  };
}
</code></pre>
<p>يجمع هذا النهج بين تحقّق Zod وقت التشغيل وأنواع الأمان لدينا، بما يضمن أنّ البيانات صحيحة بنيويًا ومنقّاة تنقيةً سليمة في آنٍ واحد.</p>
<h2 id="متقدم-سياسات-أمن-المحتوى">متقدّم: سياسات أمن المحتوى</h2>
<p>لأمان إضافي، فكّر في تنفيذ ترويسات سياسة أمن المحتوى (CSP) إلى جانب تنقيتك الآمنة من حيث الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In your HTML head or Next.js app</span>
<span class="hljs-keyword">const</span> cspDirectives = [
  <span class="hljs-string">&quot;default-src &#x27;self&#x27;&quot;</span>,
  <span class="hljs-string">&quot;script-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;&quot;</span>,
  <span class="hljs-string">&quot;style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;&quot;</span>,
  <span class="hljs-string">&quot;img-src &#x27;self&#x27; data: https:&quot;</span>,
].<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;; &#x27;</span>);

<span class="hljs-comment">// This would typically be set as an HTTP header</span>
<span class="hljs-comment">// Content-Security-Policy: default-src &#x27;self&#x27;; script-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;; ...</span>
</code></pre>
<p>تعمل CSP كخطّ دفاع ثانٍ — حتى لو تسلّل المحتوى الخبيث بشكلٍ ما عبر تنقيتك، فسيحظر المتصفّح تنفيذه.</p>
<h2 id="دوال-مساعدة-للحالات-الشائعة">دوالّ مساعدة للحالات الشائعة</h2>
<p>إليك بعض الدوالّ العملية التي قد ترغب في وجودها في حقيبة أدوات الأمان لديك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Create trusted content from compile-time constants</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> trusted&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr">content</span>: T): <span class="hljs-title class_">TrustedHtml</span> {
  <span class="hljs-keyword">return</span> content <span class="hljs-keyword">as</span> <span class="hljs-title class_">TrustedHtml</span>;
}

<span class="hljs-comment">// Combine multiple trusted HTML pieces</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">joinTrustedHtml</span>(<span class="hljs-params"><span class="hljs-attr">pieces</span>: <span class="hljs-title class_">TrustedHtml</span>[], separator = <span class="hljs-string">&#x27;&#x27;</span></span>): <span class="hljs-title class_">TrustedHtml</span> {
  <span class="hljs-keyword">return</span> pieces.<span class="hljs-title function_">join</span>(separator) <span class="hljs-keyword">as</span> <span class="hljs-title class_">TrustedHtml</span>;
}

<span class="hljs-comment">// Template literal helper for trusted HTML</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">html</span>(<span class="hljs-params"><span class="hljs-attr">strings</span>: <span class="hljs-title class_">TemplateStringsArray</span>, ...<span class="hljs-attr">values</span>: <span class="hljs-title class_">TrustedHtml</span>[]</span>): <span class="hljs-title class_">TrustedHtml</span> {
  <span class="hljs-keyword">let</span> result = strings[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; values.<span class="hljs-property">length</span>; i++) {
    result += values[i] + strings[i + <span class="hljs-number">1</span>];
  }
  <span class="hljs-keyword">return</span> result <span class="hljs-keyword">as</span> <span class="hljs-title class_">TrustedHtml</span>;
}

<span class="hljs-comment">// Usage examples:</span>
<span class="hljs-keyword">const</span> staticContent = <span class="hljs-title function_">trusted</span>(<span class="hljs-string">&#x27;&lt;p&gt;This is safe static content&lt;/p&gt;&#x27;</span>);
<span class="hljs-keyword">const</span> userContent = <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-title function_">untrusted</span>(userInput));
<span class="hljs-keyword">const</span> combined = html\`<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-subst">\${staticContent}</span><span class="hljs-subst">\${userContent}</span><span class="language-xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\`</span>;
</code></pre>
<h2 id="اختبار-إجراءاتك-الأمنية">اختبار إجراءاتك الأمنية</h2>
<p>لا تنسَ اختبار منطق التنقية لديك! وإليك بعض حمولات XSS الشائعة التي يمكنك الاختبار مقابلها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// security.test.ts</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { sanitizeHtml, escapeText, untrusted } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./security&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;sanitization&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> xssPayloads = [
    <span class="hljs-string">&#x27;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&#x27;</span>,
    <span class="hljs-string">&#x27;&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;&#x27;</span>,
    <span class="hljs-string">&#x27;&lt;svg onload=&quot;alert(1)&quot;&gt;&#x27;</span>,
    <span class="hljs-string">&#x27;javascript:alert(1)&#x27;</span>,
    <span class="hljs-string">&#x27;&lt;iframe src=&quot;javascript:alert(1)&quot;&gt;&#x27;</span>,
  ];

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should remove dangerous script tags&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    xssPayloads.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">payload</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> sanitized = <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-title function_">untrusted</span>(payload));
      <span class="hljs-title function_">expect</span>(sanitized).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;&lt;script&#x27;</span>);
      <span class="hljs-title function_">expect</span>(sanitized).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;javascript:&#x27;</span>);
      <span class="hljs-title function_">expect</span>(sanitized).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;onerror&#x27;</span>);
      <span class="hljs-title function_">expect</span>(sanitized).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;onload&#x27;</span>);
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should escape text content properly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> dangerous = <span class="hljs-string">&#x27;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&#x27;</span>;
    <span class="hljs-keyword">const</span> escaped = <span class="hljs-title function_">escapeText</span>(<span class="hljs-title function_">untrusted</span>(dangerous));
    <span class="hljs-title function_">expect</span>(escaped).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&#x27;</span>);
  });
});
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>التنقية ليست مجّانية — يحتاج DOMPurify إلى تحليل HTML وتنظيفه، وقد يكون ذلك مكلفًا مع المحتوى الكبير. فكّر في هذه التحسينات:</p>
<ul>
<li><strong>التخزين المؤقت (memoization)</strong>: خزّن المحتوى المنقّى مؤقتًا لتفادي إعادة معالجته</li>
<li><strong>التنقية الكسولة (lazy sanitization)</strong>: لا تنقِّ المحتوى إلّا عندما يُعرض فعلًا</li>
<li><strong>التنقية في الخادم</strong>: نظّف المحتوى مرّة واحدة في الخادم بدلًا من كل تصيير في العميل</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedUserProfile</span>(<span class="hljs-params">{ bio }: { bio: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Memoize expensive sanitization</span>
  <span class="hljs-keyword">const</span> trustedBio = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">sanitizeHtml</span>(<span class="hljs-title function_">untrusted</span>(bio)), [bio]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SafeHtml</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{trustedBio}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="ما-أنجزناه">ما أنجزناه</h2>
<p>بالاستفادة من نظام أنواع TypeScript، أنشأنا نموذج أمان:</p>
<ul>
<li><strong>يجعل العمليات غير الآمنة صريحة</strong> عبر الأنواع الموسومة</li>
<li><strong>يفرض التنقية</strong> قبل العمليات الخطرة مثل <code>dangerouslySetInnerHTML</code></li>
<li><strong>يوفّر حدودًا واضحة</strong> بين البيانات الموثوقة وغير الموثوقة</li>
<li><strong>يندمج مع مكتبات التحقّق</strong> القائمة مثل Zod</li>
<li><strong>يتّسع عبر تطبيقك</strong> دون الاعتماد على انضباط المطوّر</li>
</ul>
<blockquote>
<p><strong>تلميح</strong></p>
<p>ابدأ بتحديد كل المواضع في تطبيقك التي يدخل فيها المحتوى غير الموثوق إلى النظام — مدخلات النماذج، استجابات الواجهات البرمجية، معاملات URL، قيم localStorage. هذه هي حدودك الأمنية.</p>
</blockquote>
<p>لن يلتقط نظام الأنواع كل مشكلة أمنية ممكنة، لكنّه سيُلغي أكثر ثغرات XSS شيوعًا بجعل تنفيذ العمليات غير الآمنة بالخطأ مستحيلًا. ومع الاختبارات الصحيحة وترويسات CSP ومراجعة الشيفرة بعقلية أمنية، تملك دفاعًا متينًا ضد هجمات العميل.</p>
<p>وتذكّر: الأمن هو الدفاع متعدّد الطبقات. الأنواع طبقة واحدة — تأكّد من التفكير شموليًا في الوضع الأمني لتطبيقك.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
