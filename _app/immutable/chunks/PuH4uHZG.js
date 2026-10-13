const s="better-auth",n="concepts",a="المفاهيم",e="cookies",t="ملفات تعريف الارتباط",p=[{depth:3,id:"بادئة-ملفات-تعريف-الارتباط",text:"بادئة ملفات تعريف الارتباط"},{depth:3,id:"ملفات-تعريف-ارتباط-مخصصة",text:"ملفات تعريف ارتباط مخصّصة"},{depth:3,id:"ملفات-تعريف-الارتباط-عبر-النطاقات-الفرعية",text:"ملفات تعريف الارتباط عبر النطاقات الفرعية"},{depth:3,id:"ملفات-تعريف-الارتباط-الآمنة",text:"ملفات تعريف الارتباط الآمنة"},{depth:2,id:"safari-و-itp-والإعدادات-عبر-النطاقات",text:"Safari و ITP والإعدادات عبر النطاقات"},{depth:3,id:"استخدام-وسيط-عكسي",text:"استخدام وسيط عكسي"},{depth:3,id:"استخدام-نطاق-أب-مشترك",text:"استخدام نطاق أب مشترك"}],o=`<h1>ملفات تعريف الارتباط (/docs/concepts/cookies)</h1>
<p>تعرّف على كيفية استخدام Better Auth لملفات تعريف الارتباط، بما في ذلك بادئات ملفات تعريف الارتباط، والسمات المخصّصة لها، والمشاركة عبر النطاقات الفرعية، والملفات الآمنة، والتعامل مع ITP في Safari باستخدام الوسائط (proxies).</p>
<p>تُستخدم ملفات تعريف الارتباط لتخزين بيانات مثل رموز الجلسة (session tokens)، وبيانات الجلسة، وحالة OAuth، والمزيد.</p>
<ul>
<li>تظل ملف تعريف الارتباط الأساسية <code>session_token</code> معرّف جلسة مبهمًا وموقّعًا بالسر.</li>
<li>لا توجد ملف تعريف الارتباط <code>session_data</code> إلا عند تمكين <code>session.cookieCache</code>، ويعتمد ترميزها على الاستراتيجية المهيّأة:
<ul>
<li><code>compact</code>: base64url + HMAC باستخدام سر Better Auth الخاص بك</li>
<li><code>jwt</code>: HS256 افتراضيًا، أو توقيع غير متماثل عند تمكين <code>sessionCookieCache</code> في إضافة JWT</li>
<li><code>jwe</code>: مشفّرة باستخدام سر Better Auth الخاص بك</li>
</ul>
</li>
</ul>
<p>إذا استخدمت <a href="https://better-auth.com/docs/reference/options#secrets">versioned secrets</a> لتدوير المفاتيح، فستستخدم بيانات ملفات تعريف الارتباط المعتمدة على السر (بما في ذلك ملفات تعريف الارتباط الموقّعة وذاكرات جلسة JWE المشفّرة) المفتاح الحالي تلقائيًا وتبقى متوافقة مع المفاتيح السابقة حيث يُدعم ذلك.</p>
<h3 id="بادئة-ملفات-تعريف-الارتباط">بادئة ملفات تعريف الارتباط</h3>
<p>افتراضيًا، تتبع ملفات تعريف الارتباط في Better Auth الصيغة <code>\${prefix}.\${cookie_name}</code>. البادئة الافتراضية هي &quot;better-auth&quot;. يمكنك تغيير البادئة عبر ضبط <code>cookiePrefix</code> في كائن <code>advanced</code> ضمن خيارات المصادقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">cookiePrefix</span>: <span class="hljs-string">&quot;my-app&quot;</span>
    }
})
</code></pre>
<h3 id="ملفات-تعريف-ارتباط-مخصصة">ملفات تعريف ارتباط مخصّصة</h3>
<p>تكون جميع ملفات تعريف الارتباط <code>httpOnly</code> و <code>secure</code> عندما يعمل الخادم في وضع الإنتاج.</p>
<p>إذا أردت ضبط أسماء وسمات مخصّصة لملفات تعريف الارتباط، فيمكنك فعل ذلك عبر ضبط <code>cookies</code> في كائن <code>advanced</code> ضمن خيارات المصادقة.</p>
<p>افتراضيًا، يستخدم Better Auth ملفات تعريف الارتباط التالية:</p>
<ul>
<li><code>session_token</code> لتخزين رمز الجلسة</li>
<li><code>session_data</code> لتخزين بيانات الجلسة إذا كانت ذاكرة ملفات تعريف الارتباط ممكّنة</li>
<li><code>dont_remember</code> لتخزين العلامة عندما تكون <code>rememberMe</code> معطّلة</li>
</ul>
<p>قد تستخدم الإضافات أيضًا ملفات تعريف الارتباط لتخزين البيانات. على سبيل المثال، تستخدم إضافة المصادقة الثنائية (Two Factor Authentication) ملف تعريف الارتباط <code>two_factor</code> لتخزين حالة المصادقة الثنائية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">cookies</span>: {
            <span class="hljs-attr">session_token</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;custom_session_token&quot;</span>,
                <span class="hljs-attr">attributes</span>: {
                    <span class="hljs-comment">// Set custom cookie attributes</span>
                }
            },
        }
    }
})
</code></pre>
<h3 id="ملفات-تعريف-الارتباط-عبر-النطاقات-الفرعية">ملفات تعريف الارتباط عبر النطاقات الفرعية</h3>
<p>قد تحتاج أحيانًا إلى مشاركة ملفات تعريف الارتباط عبر النطاقات الفرعية.
على سبيل المثال، إذا صادقت على <code>auth.example.com</code>، فقد ترغب أيضًا في الوصول إلى الجلسة نفسها على <code>app.example.com</code>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>تتحكم سمة <code>domain</code> في النطاقات التي يمكنها الوصول إلى ملف تعريف الارتباط. ضبطها على نطاقك الجذر (مثل <code>example.com</code>) يجعل ملف تعريف الارتباط متاحًا عبر جميع النطاقات الفرعية. لأغراض الأمان، اتبع هذه الإرشادات:</p>
<ol>
<li>لا تمكّن ملفات تعريف الارتباط عبر النطاقات الفرعية إلا عند الضرورة</li>
<li>اضبط النطاق على أضيق نطاق مطلوب (مثل <code>app.example.com</code> بدلًا من <code>.example.com</code>)</li>
<li>احترس من النطاقات الفرعية غير الموثوقة التي قد تتمكن من الوصول إلى ملفات تعريف الارتباط هذه</li>
<li>فكّر في استخدام نطاقات منفصلة للخدمات غير الموثوقة (مثل <code>status.company.com</code> مقابل <code>app.company.com</code>)</li>
</ol>
</div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">crossSubDomainCookies</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">domain</span>: <span class="hljs-string">&quot;app.example.com&quot;</span>, <span class="hljs-comment">// your domain</span>
        },
    },
    <span class="hljs-attr">trustedOrigins</span>: [
        <span class="hljs-string">&#x27;https://example.com&#x27;</span>,
        <span class="hljs-string">&#x27;https://app1.example.com&#x27;</span>,
        <span class="hljs-string">&#x27;https://app2.example.com&#x27;</span>,
    ],
})
</code></pre>
<h3 id="ملفات-تعريف-الارتباط-الآمنة">ملفات تعريف الارتباط الآمنة</h3>
<p>افتراضيًا، تكون ملفات تعريف الارتباط آمنة فقط عندما يعمل الخادم في وضع الإنتاج. يمكنك فرض أن تكون ملفات تعريف الارتباط آمنة دائمًا عبر ضبط <code>useSecureCookies</code> على <code>true</code> في كائن <code>advanced</code> ضمن خيارات المصادقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">useSecureCookies</span>: <span class="hljs-literal">true</span>
    }
})
</code></pre>
<h2 id="safari-و-itp-والإعدادات-عبر-النطاقات">Safari و ITP والإعدادات عبر النطاقات</h2>
<p>يتضمن Safari ميزة خصوصية تُسمّى Intelligent Tracking Prevention (ITP) تحجب ملفات تعريف الارتباط الخاصة بطرف ثالث.</p>
<p>إذا كانت واجهة Better Auth API مستضافة على نطاق مختلف عن الواجهة الأمامية لديك، فقد يحجب Safari ملفات تعريف الارتباط الخاصة بالمصادقة تمامًا.</p>
<p>مثال لا يعمل في Safari:</p>
<pre><code>Frontend: https://app.domainB.com
API:      https://domainA.com
</code></pre>
<p>إذا أرسلت واجهتك الأمامية طلبًا مثل:</p>
<pre><code class="language-ts"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;https://domainA.com/api/auth/get-session&quot;</span>, {
  <span class="hljs-attr">credentials</span>: <span class="hljs-string">&quot;include&quot;</span>
})
</code></pre>
<p>يعامل Safari النطاق <code>domainA.com</code> باعتباره طرفًا ثالثًا ويحجب ملفات تعريف الارتباط الخاصة به. وقد يؤدي ذلك إلى عدم استمرار الجلسات،
وتجاهل <code>Set-Cookie</code>، وظهور المستخدمين وكأنهم سجّلوا الخروج بعد تسجيل الدخول، أو نجاح المصادقة في Chrome وفشلها في Safari.</p>
<p>لحل هذه المشكلة، هناك حلّان:</p>
<ol>
<li>استخدام وسيط عكسي (reverse proxy) لتمرير الطلب إلى الـ API.</li>
<li>استخدام نطاق أب مشترك.</li>
</ol>
<h3 id="استخدام-وسيط-عكسي">استخدام وسيط عكسي</h3>
<p>بدلًا من استدعاء الـ API مباشرةً، يمكنك تمريره عبر الوسيط باستخدام النطاق نفسه الخاص بواجهتك الأمامية.</p>
<p>على سبيل المثال، بدلًا من استدعاء:</p>
<pre><code>https://domainA.com/api/auth/*
</code></pre>
<p>يمكنك استدعاء:</p>
<pre><code>https://app.domainB.com/api/auth/*
</code></pre>
<p>ثم اضبط مزوّد الاستضافة لديك بحيث يمرّر الطلب إلى خادم الـ API الفعلي.</p>
<p>يجعل هذا الطلب يبدو كطلب طرف أول (first-party) بالنسبة إلى Safari، ما يسمح لملفات تعريف الارتباط بالعمل بشكل صحيح.</p>
<h4>مثال باستخدام Netlify</h4>
<pre><code class="language-toml"><span class="hljs-section">[[redirects]]</span>
  <span class="hljs-attr">from</span> = <span class="hljs-string">&quot;/api/*&quot;</span>
  <span class="hljs-attr">to</span> = <span class="hljs-string">&quot;https://domainA.com/api/:splat&quot;</span>
  <span class="hljs-attr">status</span> = <span class="hljs-number">200</span>
  <span class="hljs-attr">force</span> = <span class="hljs-literal">true</span>
</code></pre>
<h4>مثال باستخدام Vercel</h4>
<pre><code class="language-ts">{
  <span class="hljs-string">&quot;rewrites&quot;</span>: [
    {
      <span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;/api/:path*&quot;</span>,
      <span class="hljs-string">&quot;destination&quot;</span>: <span class="hljs-string">&quot;https://domainA.com/api/:path*&quot;</span>
    }
  ]
}
</code></pre>
<h3 id="استخدام-نطاق-أب-مشترك">استخدام نطاق أب مشترك</h3>
<p>يمكنك أيضًا استخدام نطاق أب مشترك للسماح بمشاركة ملفات تعريف الارتباط عبر النطاقات الفرعية:</p>
<pre><code>https://app.example.com
https://api.example.com
</code></pre>
<p>ثم مكّن ملفات تعريف الارتباط عبر النطاقات الفرعية مع تحديد النطاق:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">crossSubDomainCookies</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">domain</span>: <span class="hljs-string">&quot;example.com&quot;</span>,
        },
    },
})
</code></pre>
<p>اعرف المزيد عن ملفات تعريف الارتباط عبر النطاقات الفرعية في <a href="#cross-subdomain-cookies">documentation above</a>.</p>
<p>يتجنّب هذا أن يعامل Safari الـ API باعتباره طرفًا ثالثًا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,o as html,e as slug,t as title};
