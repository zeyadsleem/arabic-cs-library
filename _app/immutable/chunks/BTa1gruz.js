const s="better-auth",n="concepts",a="المفاهيم",t="hooks",e="الخطافات",p=[{depth:2,id:"خطافات-before",text:"خطافات before"},{depth:3,id:"مثال-فرض-قيد-على-نطاق-البريد-الإلكتروني",text:"مثال: فرض قيد على نطاق البريد الإلكتروني"},{depth:3,id:"مثال-تعديل-سياق-الطلب",text:"مثال: تعديل سياق الطلب"},{depth:2,id:"خطافات-after",text:"خطافات after"},{depth:3,id:"مثال-إرسال-إشعار-إلى-قناتك-عند-تسجيل-مستخدم-جديد",text:"مثال: إرسال إشعار إلى قناتك عند تسجيل مستخدم جديد"},{depth:3,id:"مثال-التعامل-مع-عدة-نقاط-نهاية-في-خطاف-واحد",text:"مثال: التعامل مع عدة نقاط نهاية في خطاف واحد"},{depth:2,id:"ctx",text:"Ctx"},{depth:3,id:"الطلب-والاستجابة",text:"الطلب والاستجابة"},{depth:3,id:"السياق-context",text:"السياق (Context)"},{depth:2,id:"الخطافات-القابلة-لإعادة-الاستخدام",text:"الخطافات القابلة لإعادة الاستخدام"}],l=`<h1>الخطافات (/docs/concepts/hooks)</h1>
<p>تعرّف على كيفية استخدام خطافات before و after لتخصيص سلوك نقاط النهاية (endpoints)، وتعديل الطلبات والاستجابات، والتعامل مع ملفات تعريف الارتباط (cookies)، ورفع الأخطاء، والوصول إلى سياق المصادقة، وتشغيل المهام في الخلفية.</p>
<p>تتيح لك الخطافات في Better Auth &quot;التشبّث&quot; بدورة الحياة وتنفيذ منطق مخصّص. وهي توفّر طريقة لتخصيص سلوك Better Auth دون كتابة إضافة (plugin) كاملة.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>نوصي بشدة باستخدام الخطافات إذا كنت تحتاج إلى إجراء تعديلات مخصّصة على نقطة نهاية بدلًا من إنشاء نقطة نهاية أخرى خارج Better Auth.</p>
</div>
<h2 id="خطافات-before">خطافات before</h2>
<p>تعمل <strong>خطافات before</strong> <em>قبل</em> تنفيذ نقطة النهاية. استخدمها لتعديل الطلبات، أو التحقق المسبق من البيانات، أو الإرجاع المبكر.</p>
<h3 id="مثال-فرض-قيد-على-نطاق-البريد-الإلكتروني">مثال: فرض قيد على نطاق البريد الإلكتروني</h3>
<p>يضمن هذا الخطاف أن المستخدمين لا يمكنهم التسجيل إلا إذا انتهى بريدهم الإلكتروني بـ <code>@example.com</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware, <span class="hljs-title class_">APIError</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">hooks</span>: {
        <span class="hljs-attr">before</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
            <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> !== <span class="hljs-string">&quot;/sign-up/email&quot;</span>) {
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">if</span> (!ctx.<span class="hljs-property">body</span>?.<span class="hljs-property">email</span>.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&quot;@example.com&quot;</span>)) {
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">APIError</span>(<span class="hljs-string">&quot;BAD_REQUEST&quot;</span>, {
                    <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Email must end with @example.com&quot;</span>,
                });
            }
        }),
    },
});
</code></pre>
<h3 id="مثال-تعديل-سياق-الطلب">مثال: تعديل سياق الطلب</h3>
<p>لضبط سياق الطلب قبل المتابعة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">hooks</span>: {
        <span class="hljs-attr">before</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
            <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/sign-up/email&quot;</span>) {
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">context</span>: {
                        ...ctx,
                        <span class="hljs-attr">body</span>: {
                            ...ctx.<span class="hljs-property">body</span>,
                            <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,
                        },
                    }
                };
            }
        }),
    },
});
</code></pre>
<h2 id="خطافات-after">خطافات after</h2>
<p>تعمل <strong>خطافات after</strong> <em>بعد</em> تنفيذ نقطة النهاية. استخدمها لتعديل الاستجابات.</p>
<h3 id="مثال-إرسال-إشعار-إلى-قناتك-عند-تسجيل-مستخدم-جديد">مثال: إرسال إشعار إلى قناتك عند تسجيل مستخدم جديد</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;
<span class="hljs-keyword">import</span> { sendMessage } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/notification&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">hooks</span>: {
        <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
            <span class="hljs-keyword">if</span>(ctx.<span class="hljs-property">path</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&quot;/sign-up&quot;</span>)){
                <span class="hljs-keyword">const</span> newSession = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">newSession</span>;
                <span class="hljs-keyword">if</span>(newSession){
                    <span class="hljs-title function_">sendMessage</span>({
                        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;user-register&quot;</span>,
                        <span class="hljs-attr">name</span>: newSession.<span class="hljs-property">user</span>.<span class="hljs-property">name</span>,
                    })
                }
            }
        }),
    },
});
</code></pre>
<h3 id="مثال-التعامل-مع-عدة-نقاط-نهاية-في-خطاف-واحد">مثال: التعامل مع عدة نقاط نهاية في خطاف واحد</h3>
<p>بما أن <code>before</code> و <code>after</code> يقبل كل منهما استدعاء <code>createAuthMiddleware</code> واحدًا فقط، فاستخدم فحوصات شرطية على <code>ctx.path</code> للتعامل مع عدة نقاط نهاية داخل الخطاف نفسه:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">hooks</span>: {
        <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
            <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/reset-password&quot;</span>) {
                <span class="hljs-comment">// Auto-login user after password reset</span>
            }
            <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&quot;/sign-up&quot;</span>)) {
                <span class="hljs-comment">// Send welcome notification after signup</span>
            }
            <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/sign-in/email&quot;</span>) {
                <span class="hljs-comment">// Track login analytics</span>
            }
        }),
    },
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يأخذ كل خطاف (<code>before</code> / <code>after</code>) دالة وسيط (middleware) واحدة، وليس مصفوفة. لتشغيل منطق لنقاط نهاية مختلفة، تفرّع حسب <code>ctx.path</code> داخل تلك الدالة الواحدة.</p>
</div>
<h2 id="ctx">Ctx</h2>
<p>عند استدعاء <code>createAuthMiddleware</code> يُمرَّر كائن <code>ctx</code> يوفّر الكثير من الخصائص المفيدة، ومنها:</p>
<ul>
<li><strong>Path:</strong> <code>ctx.path</code> للحصول على مسار نقطة النهاية الحالية.</li>
<li><strong>Body:</strong> <code>ctx.body</code> للحصول على جسم الطلب المُحلَّل (متاح لطلبات POST).</li>
<li><strong>Headers:</strong> <code>ctx.headers</code> للوصول إلى ترويسات الطلب.</li>
<li><strong>Request:</strong> <code>ctx.request</code> للوصول إلى كائن الطلب (قد لا يكون موجودًا في نقاط النهاية الخاصة بالخادم فقط).</li>
<li><strong>Query Parameters:</strong> <code>ctx.query</code> للوصول إلى معاملات الاستعلام.</li>
<li><strong>Context</strong>: <code>ctx.context</code> سياق متعلق بالمصادقة، مفيد للوصول إلى الجلسة الجديدة، وإعدادات ملفات تعريف الارتباط الخاصة بالمصادقة، وتجزئة كلمة المرور، والإعدادات...</li>
</ul>
<p>وغير ذلك.</p>
<h3 id="الطلب-والاستجابة">الطلب والاستجابة</h3>
<p>تتيح لك هذه الأدوات الحصول على معلومات الطلب وإرسال استجابة من داخل الخطاف.</p>
<h4>استجابات JSON</h4>
<p>استخدم <code>ctx.json</code> لإرسال استجابات JSON:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">const</span> hook = <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">return</span> ctx.<span class="hljs-title function_">json</span>({
        <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Hello World&quot;</span>,
    });
});
</code></pre>
<h4>عمليات إعادة التوجيه</h4>
<p>استخدم <code>ctx.redirect</code> لإعادة توجيه المستخدمين:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">const</span> hook = <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">throw</span> ctx.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&quot;/sign-up/name&quot;</span>);
});
</code></pre>
<h4>ملفات تعريف الارتباط (Cookies)</h4>
<ul>
<li>لضبط ملفات تعريف الارتباط: <code>ctx.setCookie</code> أو <code>ctx.setSignedCookie</code>.</li>
<li>لقراءة ملفات تعريف الارتباط: <code>ctx.getCookie</code> أو <code>ctx.getSignedCookie</code>.</li>
</ul>
<p>مثال:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">const</span> hook = <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    ctx.<span class="hljs-title function_">setCookie</span>(<span class="hljs-string">&quot;my-cookie&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>);
    <span class="hljs-keyword">await</span> ctx.<span class="hljs-title function_">setSignedCookie</span>(<span class="hljs-string">&quot;my-signed-cookie&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>, ctx.<span class="hljs-property">context</span>.<span class="hljs-property">secret</span>, {
        <span class="hljs-attr">maxAge</span>: <span class="hljs-number">1000</span>,
    });

    <span class="hljs-keyword">const</span> cookie = ctx.<span class="hljs-title function_">getCookie</span>(<span class="hljs-string">&quot;my-cookie&quot;</span>);
    <span class="hljs-keyword">const</span> signedCookie = <span class="hljs-keyword">await</span> ctx.<span class="hljs-title function_">getSignedCookie</span>(<span class="hljs-string">&quot;my-signed-cookie&quot;</span>, ctx.<span class="hljs-property">context</span>.<span class="hljs-property">secret</span>);
});
</code></pre>
<h4>الأخطاء</h4>
<p>ارفع الأخطاء باستخدام <code>APIError</code> لرمز حالة ورسالة محدّدين:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware, <span class="hljs-title class_">APIError</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">const</span> hook = <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">APIError</span>(<span class="hljs-string">&quot;BAD_REQUEST&quot;</span>, {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Invalid request&quot;</span>,
    });
});
</code></pre>
<h3 id="السياق-context">السياق (Context)</h3>
<p>يحتوي كائن <code>ctx</code> بداخله على كائن <code>context</code> آخر مخصّص لاحتواء السياقات المتعلقة بالمصادقة، بما في ذلك جلسة أُنشئت حديثًا في خطاف after، وإعدادات ملفات تعريف الارتباط، وأداة تجزئة كلمة المرور، وما إلى ذلك.</p>
<h4>الجلسة الجديدة</h4>
<p>الجلسة المُنشأة حديثًا بعد تشغيل نقطة النهاية. وهي موجودة فقط في خطاف after.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">const</span> newSession = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">newSession</span>
});
</code></pre>
<h4>القيمة المُرجَعة (Returned)</h4>
<p>تُمرَّر القيمة المُرجَعة من الخطاف إلى الخطاف التالي في السلسلة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">const</span> returned = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">returned</span>; <span class="hljs-comment">//this could be a successful response or an APIError</span>
});
</code></pre>
<h4>ترويسات الاستجابة</h4>
<p>ترويسات الاستجابة التي تضيفها نقاط النهاية والخطافات التي تعمل قبل هذا الخطاف.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">const</span> responseHeaders = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">responseHeaders</span>;
});
</code></pre>
<h4>ملفات تعريف الارتباط المسبقة للمصادقة</h4>
<p>الوصول إلى خصائص ملفات تعريف الارتباط المسبقة في BetterAuth:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
    <span class="hljs-keyword">const</span> cookieName = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">authCookies</span>.<span class="hljs-property">sessionToken</span>.<span class="hljs-property">name</span>;
});
</code></pre>
<h4>السر (Secret)</h4>
<p>يمكنك الوصول إلى <code>secret</code> الخاص بنسخة المصادقة لديك عبر <code>ctx.context.secret</code></p>
<h4>كلمة المرور</h4>
<p>يوفّر كائن كلمة المرور <code>hash</code> و <code>verify</code></p>
<ul>
<li><code>ctx.context.password.hash</code>: يتيح لك تجزئة كلمة مرور معطاة.</li>
<li><code>ctx.context.password.verify</code>: يتيح لك التحقق من <code>password</code> و <code>hash</code> معطيين.</li>
</ul>
<h4>المحوّل (Adapter)</h4>
<p>يعرض المحوّل طرق المحوّل التي يستخدمها Better Auth، بما في ذلك <code>findOne</code> و <code>findMany</code> و <code>create</code> و <code>delete</code> و <code>update</code> و <code>updateMany</code>. وينبغي لك عمومًا استخدام نسخة <code>db</code> الفعلية من ORM لديك بدلًا من هذا المحوّل.</p>
<h4>المحوّل الداخلي</h4>
<p>هذه استدعاءات لقاعدة بياناتك تنفّذ إجراءات محدّدة، مثل <code>createUser</code> و <code>createSession</code> و <code>updateSession</code>...</p>
<p>قد يكون استخدامها مفيدًا بدلًا من استخدام قاعدة بياناتك مباشرةً للحصول على وصول إلى <code>databaseHooks</code>، ودعم سليم لـ <code>secondaryStorage</code>، وما إلى ذلك. إذا كنت تجري استعلامًا مشابهًا لما هو موجود في إجراءات هذا المحوّل الداخلي، فمن الجدير إلقاء نظرة عليه.</p>
<h4>generateId</h4>
<p>يمكنك استخدام <code>ctx.context.generateId</code> لتوليد معرّف (Id) لأسباب متنوّعة.</p>
<h4>runInBackground</h4>
<p>يجدول مهمة لتُنفَّذ بعد إرسال الاستجابة. استخدمها لعمليات أطلق وانسَ (fire-and-forget) مثل التنظيف، والتحليلات، وتحديث عدّاد حد المعدل. اضبط المعالج في <a href="https://better-auth.com/docs/reference/options#backgroundtasks">advanced.backgroundTasks</a>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">hooks</span>: {
    <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
      <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&quot;/sign-up&quot;</span>)) {
        <span class="hljs-keyword">const</span> newSession = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">newSession</span>;
        <span class="hljs-keyword">if</span> (newSession) {
          ctx.<span class="hljs-property">context</span>.<span class="hljs-title function_">runInBackground</span>(<span class="hljs-title function_">sendAnalyticsEvent</span>(newSession.<span class="hljs-property">user</span>.<span class="hljs-property">id</span>));
        }
      }
    }),
  },
});
</code></pre>
<h4>runInBackgroundOrAwait</h4>
<p>يؤجّل المهمة عندما يكون هناك معالج مهيّأ، وإلا فإنه ينتظرها. استخدمها للعمليات التي يجب أن تكتمل (مثل إرسال رسائل البريد الإلكتروني) لكنها تستفيد من عدم الحجب عند وجود معالج. اضبط المعالج في <a href="https://better-auth.com/docs/reference/options#backgroundtasks">advanced.backgroundTasks</a>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">hooks</span>: {
    <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
      <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&quot;/sign-up&quot;</span>)) {
        <span class="hljs-keyword">const</span> newSession = ctx.<span class="hljs-property">context</span>.<span class="hljs-property">newSession</span>;
        <span class="hljs-keyword">if</span> (newSession) {
          <span class="hljs-keyword">await</span> ctx.<span class="hljs-property">context</span>.<span class="hljs-title function_">runInBackgroundOrAwait</span>(
            <span class="hljs-title function_">sendWelcomeEmail</span>(newSession.<span class="hljs-property">user</span>)
          );
        }
      }
    }),
  },
});
</code></pre>
<h2 id="الخطافات-القابلة-لإعادة-الاستخدام">الخطافات القابلة لإعادة الاستخدام</h2>
<p>إذا كنت تحتاج إلى إعادة استخدام خطاف عبر عدة نقاط نهاية، ففكّر في إنشاء إضافة (plugin). اعرف المزيد في <a href="https://better-auth.com/docs/concepts/plugins">Plugins Documentation</a>.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,t as slug,e as title};
