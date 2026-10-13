const s="better-auth",a="concepts",n="المفاهيم",t="email",e="البريد الإلكتروني",l=[{depth:2,id:"أحضر-مزود-البريد-الإلكتروني-الخاص-بك",text:"أحضِر مزوّد البريد الإلكتروني الخاص بك"},{depth:2,id:"التحقق-من-البريد-الإلكتروني",text:"التحقق من البريد الإلكتروني"},{depth:3,id:"إضافة-التحقق-من-البريد-الإلكتروني-إلى-تطبيقك",text:"إضافة التحقق من البريد الإلكتروني إلى تطبيقك"},{depth:3,id:"تشغيل-التحقق-من-البريد-الإلكتروني",text:"تشغيل التحقق من البريد الإلكتروني"},{depth:3,id:"توثيق-البريد-الإلكتروني",text:"توثيق البريد الإلكتروني"},{depth:3,id:"تسجيل-الدخول-التلقائي-بعد-التحقق",text:"تسجيل الدخول التلقائي بعد التحقق"},{depth:3,id:"الاستدعاء-callback-قبل-التحقق-من-البريد-الإلكتروني",text:"الاستدعاء (callback) قبل التحقق من البريد الإلكتروني"},{depth:3,id:"الاستدعاء-callback-بعد-نجاح-التحقق-من-البريد-الإلكتروني",text:"الاستدعاء (callback) بعد نجاح التحقق من البريد الإلكتروني"},{depth:3,id:"الاستدعاء-callback-عند-محاولة-تسجيل-مكررة",text:"الاستدعاء (callback) عند محاولة تسجيل مكرّرة"},{depth:2,id:"رسالة-إعادة-تعيين-كلمة-المرور",text:"رسالة إعادة تعيين كلمة المرور"}],p=`<h1>البريد الإلكتروني (/docs/concepts/email)</h1>
<p>تعرّف على كيفية إعداد التحقق من البريد الإلكتروني، واشتراط عناوين بريد موثّقة لتسجيل الدخول، وتسجيل الدخول التلقائي بعد التحقق، ومعالجة عمليات الاستدعاء (callbacks) بعد التحقق، وتنفيذ رسائل إعادة تعيين كلمة المرور.</p>
<p>يُعدّ البريد الإلكتروني جزءًا أساسيًا من Better Auth، وهو مطلوب لجميع المستخدمين بغض النظر عن طريقة المصادقة لديهم. يوفّر Better Auth المصادقة بالبريد الإلكتروني وكلمة المرور جاهزةً للاستخدام، إضافة إلى الكثير من الأدوات المساعدة لإدارة التحقق من البريد الإلكتروني، وإعادة تعيين كلمة المرور، والمزيد.</p>
<h2 id="أحضر-مزود-البريد-الإلكتروني-الخاص-بك">أحضِر مزوّد البريد الإلكتروني الخاص بك</h2>
<p>يعمل Better Auth مع أي مزوّد بريد إلكتروني معاملاتي (transactional)، ما يمنحك تحكمًا كاملًا في كيفية إرسال رسائل المصادقة الخاصة بك. لإرسال الرسائل، ابدأ بإعداد المزوّد الذي تفضّله.</p>
<p>على سبيل المثال، قد تفكّر في مزوّد البريد الإلكتروني التالي:</p>
<ul>
<li><a href="https://resend.com/better-auth">Resend</a></li>
<li><a href="https://docs.supersendtx.com/guides/better-auth">SuperSend TX</a></li>
<li><a href="https://docs.mailtrap.io/guides/integrations/better-auth">Mailtrap</a></li>
<li><a href="https://wraps.dev/docs/guides/better-auth">Wraps</a></li>
<li><a href="https://eusend.dev/docs/integrations/better-auth">eusend</a></li>
</ul>
<h2 id="التحقق-من-البريد-الإلكتروني">التحقق من البريد الإلكتروني</h2>
<p>التحقق من البريد الإلكتروني ميزة أمنية تضمن أن يقدّم المستخدمون عنوان بريد إلكتروني صالحًا. وهي تساعد في منع البريد المزعج وإساءة الاستخدام من خلال التأكد من أن عنوان البريد الإلكتروني يخصّ المستخدم. في هذا الدليل، ستحصل على شرح تفصيلي لكيفية تنفيذ التحقق من البريد الإلكتروني المعتمد على الرمز (token) في تطبيقك.
لاستخدام التحقق من البريد الإلكتروني المعتمد على رمز OTP، اطّلع على دليل <a href="https://better-auth.com/docs/plugins/email-otp">OTP Verification</a>.</p>
<h3 id="إضافة-التحقق-من-البريد-الإلكتروني-إلى-تطبيقك">إضافة التحقق من البريد الإلكتروني إلى تطبيقك</h3>
<p>لتمكين التحقق من البريد الإلكتروني، تحتاج إلى تمرير دالة ترسل رسالة تحقق تتضمن رابطًا.</p>
<ul>
<li><strong>sendVerificationEmail</strong>: تُستدعى هذه الدالة عند بدء التحقق من البريد الإلكتروني. وهي تقبل كائن بيانات بالخصائص التالية:
<ul>
<li><code>user</code>: كائن المستخدم الذي يحتوي على عنوان البريد الإلكتروني.</li>
<li><code>url</code>: رابط التحقق الذي يجب على المستخدم النقر عليه لتأكيد بريده الإلكتروني.</li>
<li><code>token</code>: رمز التحقق المستخدم لإتمام عملية التحقق من البريد الإلكتروني، ويُستخدم عند تنفيذ رابط تحقق مخصّص.</li>
</ul>
</li>
</ul>
<p>وكائن <code>request</code> كمعامل ثانٍ.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;
<span class="hljs-keyword">import</span> { sendEmail } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./email&#x27;</span>; <span class="hljs-comment">// your email sending function</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailVerification</span>: {
        <span class="hljs-attr">sendVerificationEmail</span>: <span class="hljs-title function_">async</span> ({ user, url, token }, request) =&gt; {
            <span class="hljs-built_in">void</span> <span class="hljs-title function_">sendEmail</span>({
                <span class="hljs-attr">to</span>: user.<span class="hljs-property">email</span>,
                <span class="hljs-attr">subject</span>: <span class="hljs-string">&#x27;Verify your email address&#x27;</span>,
                <span class="hljs-attr">text</span>: <span class="hljs-string">\`Click the link to verify your email: <span class="hljs-subst">\${url}</span>\`</span>
            })
        }
    }
})
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>تجنّب انتظار (await) إرسال البريد الإلكتروني لمنع
هجمات التوقيت. على المنصات بلا خادم (serverless)، استخدم <code>waitUntil</code> أو ما شابه لضمان إرسال البريد الإلكتروني.</p>
</div>
<h3 id="تشغيل-التحقق-من-البريد-الإلكتروني">تشغيل التحقق من البريد الإلكتروني</h3>
<p>يمكنك بدء التحقق من البريد الإلكتروني بعدة طرق:</p>
<h4>١. أثناء التسجيل</h4>
<p>لإرسال رسالة تحقق تلقائيًا عند التسجيل، اضبط <code>emailVerification.sendOnSignUp</code> على <code>true</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailVerification</span>: {
        <span class="hljs-attr">sendOnSignUp</span>: <span class="hljs-literal">true</span>
    }
})
</code></pre>
<p>يؤدي هذا إلى إرسال رسالة تحقق عند تسجيل المستخدم. أما بالنسبة لتسجيلات الدخول الاجتماعية، فيُقرأ حالة التحقق من البريد الإلكتروني من SSO.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>عند تمكين <code>sendOnSignUp</code>، إذا سجّل المستخدم الدخول عبر SSO لا يصرّح بأن البريد الإلكتروني موثّق، فسيقوم Better Auth بإرسال رسالة تحقق، لكن التحقق غير مطلوب لتسجيل الدخول حتى عند تمكين <code>requireEmailVerification</code>.</p>
</div>
<h4>٢. اشتراط التحقق من البريد الإلكتروني</h4>
<p>إذا مكّنت اشتراط التحقق من البريد الإلكتروني، فيجب على المستخدمين توثيق بريدهم الإلكتروني قبل أن يتمكنوا من تسجيل الدخول. وفي كل مرة يحاول فيها المستخدم تسجيل الدخول، تُستدعى <code>sendVerificationEmail</code>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يعمل هذا فقط إذا كان لديك <code>sendVerificationEmail</code> مُنفَّذة، وإذا كانت <code>sendOnSignIn</code> مضبوطة على true، وإذا كان المستخدم يحاول تسجيل الدخول بالبريد الإلكتروني وكلمة المرور.</p>
</div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { sendEmail } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./email&#x27;</span>; <span class="hljs-comment">// your email sending function</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">emailVerification</span>: {
    <span class="hljs-attr">sendVerificationEmail</span>: <span class="hljs-title function_">async</span> ({ user, url }) =&gt; {
      <span class="hljs-built_in">void</span> <span class="hljs-title function_">sendEmail</span>({
        <span class="hljs-attr">to</span>: user.<span class="hljs-property">email</span>,
        <span class="hljs-attr">subject</span>: <span class="hljs-string">&quot;Verify your email address&quot;</span>,
        <span class="hljs-attr">text</span>: <span class="hljs-string">\`Click the link to verify your email: <span class="hljs-subst">\${url}</span>\`</span>,
      });
    },
    <span class="hljs-attr">sendOnSignIn</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">emailAndPassword</span>: {
    <span class="hljs-attr">requireEmailVerification</span>: <span class="hljs-literal">true</span>,
  },
});
</code></pre>
<p>إذا حاول مستخدم تسجيل الدخول دون توثيق بريده الإلكتروني، فيمكنك معالجة الخطأ وعرض رسالة للمستخدم.</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> authClient.<span class="hljs-property">signIn</span>.<span class="hljs-title function_">email</span>({
    <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;email@example.com&quot;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;password&quot;</span>
}, {
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
        <span class="hljs-comment">// Handle the error</span>
        <span class="hljs-keyword">if</span>(ctx.<span class="hljs-property">error</span>.<span class="hljs-property">status</span> === <span class="hljs-number">403</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Please verify your email address&quot;</span>)
        }
        <span class="hljs-comment">//you can also show the original error message</span>
        <span class="hljs-title function_">alert</span>(ctx.<span class="hljs-property">error</span>.<span class="hljs-property">message</span>)
    }
})
</code></pre>
<h4>٣. يدويًا</h4>
<p>يمكنك أيضًا تشغيل التحقق من البريد الإلكتروني يدويًا عبر استدعاء <code>sendVerificationEmail</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">sendVerificationEmail</span>({
    <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;user@email.com&quot;</span>,
    <span class="hljs-attr">callbackURL</span>: <span class="hljs-string">&quot;/&quot;</span> <span class="hljs-comment">// The redirect URL after verification</span>
})
</code></pre>
<h3 id="توثيق-البريد-الإلكتروني">توثيق البريد الإلكتروني</h3>
<p>إذا نقر المستخدم على رابط التحقق المقدَّم، فيُوثَّق بريده الإلكتروني تلقائيًا، ويُعاد توجيهه إلى <code>callbackURL</code>.</p>
<p>أما للتحقق اليدوي، فيمكنك إرسال رابط مخصّص للمستخدم يتضمن <code>token</code> واستدعاء الدالة <code>verifyEmail</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">verifyEmail</span>({
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Pass the token here</span>
    }
})
</code></pre>
<h3 id="تسجيل-الدخول-التلقائي-بعد-التحقق">تسجيل الدخول التلقائي بعد التحقق</h3>
<p>لتسجيل دخول المستخدم تلقائيًا بعد توثيقه بريده الإلكتروني بنجاح، اضبط الخيار <code>autoSignInAfterVerification</code> على <code>true</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...your other options</span>
    <span class="hljs-attr">emailVerification</span>: {
        <span class="hljs-attr">autoSignInAfterVerification</span>: <span class="hljs-literal">true</span>
    }
})
</code></pre>
<h3 id="الاستدعاء-callback-قبل-التحقق-من-البريد-الإلكتروني">الاستدعاء (callback) قبل التحقق من البريد الإلكتروني</h3>
<p>يمكنك تشغيل كود مخصّص قبيل وسم بريد المستخدم الإلكتروني بأنه موثّق باستخدام الاستدعاء <code>beforeEmailVerification</code>. يفيد هذا في التحقق، أو الفحوصات المسبقة، أو تحضير البيانات قبل إنهاء عملية التحقق.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailVerification</span>: {
        <span class="hljs-keyword">async</span> <span class="hljs-title function_">beforeEmailVerification</span>(<span class="hljs-params">user, request</span>) {
            <span class="hljs-comment">// Run pre-verification logic</span>
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`About to verify <span class="hljs-subst">\${user.email}</span>\`</span>);
        }
    }
})
</code></pre>
<h3 id="الاستدعاء-callback-بعد-نجاح-التحقق-من-البريد-الإلكتروني">الاستدعاء (callback) بعد نجاح التحقق من البريد الإلكتروني</h3>
<p>يمكنك تشغيل كود مخصّص مباشرةً بعد توثيق المستخدم لبريده الإلكتروني باستخدام الاستدعاء <code>afterEmailVerification</code>. يفيد هذا في أي تأثيرات جانبية ترغب في تشغيلها، مثل منح الوصول إلى ميزات خاصة أو تسجيل الحدث.</p>
<p>تعمل الدالة <code>afterEmailVerification</code> تلقائيًا عند تأكيد بريد المستخدم الإلكتروني، وتستقبل كائن <code>user</code> وتفاصيل <code>request</code> حتى تتمكن من تنفيذ إجراءات لهذا المستخدم تحديدًا.</p>
<p>إليك كيفية إعداده:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailVerification</span>: {
        <span class="hljs-keyword">async</span> <span class="hljs-title function_">afterEmailVerification</span>(<span class="hljs-params">user, request</span>) {
            <span class="hljs-comment">// Your custom logic here, e.g., grant access to premium features</span>
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${user.email}</span> has been successfully verified!\`</span>);
        }
    }
})
</code></pre>
<h3 id="الاستدعاء-callback-عند-محاولة-تسجيل-مكررة">الاستدعاء (callback) عند محاولة تسجيل مكرّرة</h3>
<p>يُستدعى الاستدعاء <code>onExistingUserSignUp</code> عندما يحاول شخص ما التسجيل ببريد إلكتروني موجود بالفعل. يفيد هذا في إخطار المستخدم الحالي بأن أحدهم حاول التسجيل باستخدام عنوان بريده الإلكتروني.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>لا يُستدعى هذا الاستدعاء إلا عندما يكون <code>emailAndPassword.requireEmailVerification</code> مضبوطًا على <code>true</code>، وهو ما يفعّل الاستجابة العامة للتكرار (مستخدم اصطناعي) بدلًا من رفع خطأ بريد إلكتروني مكرّر.</p>
</div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailAndPassword</span>: {
        <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">onExistingUserSignUp</span>: <span class="hljs-title function_">async</span> ({ user }, request) =&gt; {
            <span class="hljs-comment">// Notify the existing user about the sign-up attempt</span>
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Someone tried to sign up with <span class="hljs-subst">\${user.email}</span>\`</span>);
        }
    }
})
</code></pre>
<h2 id="رسالة-إعادة-تعيين-كلمة-المرور">رسالة إعادة تعيين كلمة المرور</h2>
<p>تتيح إعادة تعيين كلمة المرور للمستخدمين إعادة تعيين كلمة مرورهم إذا نسوها. يوفّر Better Auth طريقة بسيطة لتنفيذ وظيفة إعادة تعيين كلمة المرور.</p>
<p>يمكنك تمكين إعادة تعيين كلمة المرور عبر تمرير دالة ترسل رسالة إعادة تعيين كلمة المرور تتضمن رابطًا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-auth&#x27;</span>;
<span class="hljs-keyword">import</span> { sendEmail } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./email&#x27;</span>; <span class="hljs-comment">// your email sending function</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">emailAndPassword</span>: {
        <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">sendResetPassword</span>: <span class="hljs-title function_">async</span> ({ user, url, token }, request) =&gt; {
            <span class="hljs-built_in">void</span> <span class="hljs-title function_">sendEmail</span>({
                <span class="hljs-attr">to</span>: user.<span class="hljs-property">email</span>,
                <span class="hljs-attr">subject</span>: <span class="hljs-string">&#x27;Reset your password&#x27;</span>,
                <span class="hljs-attr">text</span>: <span class="hljs-string">\`Click the link to reset your password: <span class="hljs-subst">\${url}</span>\`</span>
            })
        }
    }
})
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>تجنّب انتظار (await) إرسال البريد الإلكتروني لمنع
هجمات التوقيت. على المنصات بلا خادم (serverless)، استخدم <code>waitUntil</code> أو ما شابه لضمان إرسال البريد الإلكتروني.</p>
</div>
<p>اطّلع على دليل <a href="https://better-auth.com/docs/authentication/email-password#request-password-reset">Email and Password</a> لمزيد من التفاصيل حول كيفية تنفيذ إعادة تعيين كلمة المرور في تطبيقك.
ويمكنك أيضًا الاطّلاع على دليل <a href="https://better-auth.com/docs/plugins/email-otp#reset-password-with-otp">Otp verification</a> لمعرفة كيفية تنفيذ إعادة تعيين كلمة المرور باستخدام OTP في تطبيقك.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
