const s="better-auth",n="concepts",a="المفاهيم",e="session-management",t="إدارة الجلسات",p=[{depth:2,id:"جدول-الجلسة",text:"جدول الجلسة"},{depth:2,id:"انتهاء-صلاحية-الجلسة",text:"انتهاء صلاحية الجلسة"},{depth:3,id:"تعطيل-تحديث-الجلسة",text:"تعطيل تحديث الجلسة"},{depth:3,id:"تأجيل-تحديث-الجلسة",text:"تأجيل تحديث الجلسة"},{depth:2,id:"حداثة-الجلسة",text:"حداثة الجلسة"},{depth:2,id:"إدارة-الجلسات",text:"إدارة الجلسات"},{depth:3,id:"الحصول-على-الجلسة",text:"الحصول على الجلسة"},{depth:3,id:"استخدام-الجلسة",text:"استخدام الجلسة"},{depth:3,id:"سرد-الجلسات",text:"سرد الجلسات"},{depth:3,id:"إبطال-الجلسة",text:"إبطال الجلسة"},{depth:3,id:"إبطال-الجلسات-الأخرى",text:"إبطال الجلسات الأخرى"},{depth:3,id:"إبطال-جميع-الجلسات",text:"إبطال جميع الجلسات"},{depth:3,id:"تحديث-الجلسة",text:"تحديث الجلسة"},{depth:3,id:"إبطال-الجلسات-عند-تغيير-كلمة-المرور",text:"إبطال الجلسات عند تغيير كلمة المرور"},{depth:2,id:"التخزين-المؤقت-للجلسات",text:"التخزين المؤقت للجلسات"},{depth:3,id:"التخزين-المؤقت-للكوكيز",text:"التخزين المؤقت للكوكيز"},{depth:3,id:"رموز-jwt-للتخزين-المؤقت-للكوكيز-المدعومة-بـ-jwks",text:"رموز JWT للتخزين المؤقت للكوكيز المدعومة بـ JWKS"},{depth:2,id:"الجلسات-في-التخزين-الثانوي",text:"الجلسات في التخزين الثانوي"},{depth:3,id:"تخزين-الجلسات-في-قاعدة-البيانات",text:"تخزين الجلسات في قاعدة البيانات"},{depth:3,id:"الحفاظ-على-الجلسات",text:"الحفاظ على الجلسات"},{depth:2,id:"إدارة-الجلسات-عديمة-الحالة",text:"إدارة الجلسات عديمة الحالة"},{depth:3,id:"الإعداد-الأساسي-عديم-الحالة",text:"الإعداد الأساسي عديم الحالة"},{depth:3,id:"فهم-refreshcache",text:"فهم refreshCache"},{depth:3,id:"إصدار-الجلسات-عديمة-الحالة",text:"إصدار الجلسات عديمة الحالة"},{depth:3,id:"عديم-الحالة-مع-التخزين-الثانوي",text:"عديم الحالة مع التخزين الثانوي"},{depth:2,id:"تخصيص-استجابة-الجلسة",text:"تخصيص استجابة الجلسة"},{depth:3,id:"تحذيرات-بشأن-تخصيص-استجابة-الجلسة",text:"تحذيرات بشأن تخصيص استجابة الجلسة"}],l=`<h1>إدارة الجلسات (/docs/concepts/session-management)</h1>
<p>تعرّف على إدارة الجلسات في Better Auth، بما في ذلك انتهاء صلاحية الجلسة وحداثتها واستراتيجيات التخزين المؤقت للكوكيز والتخزين الثانوي والجلسات عديمة الحالة وتخصيص استجابات الجلسة.</p>
<p>تدير Better Auth الجلسة باستخدام إدارة جلسات تقليدية قائمة على الكوكيز. تُخزَّن الجلسة في كوكي وتُرسَل إلى الخادم مع كل طلب. ثم يتحقق الخادم من الجلسة ويعيد بيانات المستخدم إذا كانت الجلسة صالحة.</p>
<p>لا يزال الكوكي الرئيسي <code>session_token</code> هو معرّف الجلسة من جهة الخادم. إذا فعّلت <code>session.cookieCache</code>، تكتب Better Auth أيضًا كوكي <code>session_data</code> منفصلًا لبيانات الجلسة المخزَّنة مؤقتًا قصيرة العمر. هذا الكوكي المؤقت متميز عن نقطة النهاية <code>/token</code> الخاصة بإضافة JWT وعن ناتج الترويسة <code>set-auth-jwt</code>.</p>
<h2 id="جدول-الجلسة">جدول الجلسة</h2>
<p>يخزّن جدول الجلسة بيانات الجلسة. يحتوي جدول الجلسة على الحقول التالية:</p>
<ul>
<li><code>id</code>: معرّف فريد للجلسة.</li>
<li><code>token</code>: رمز الجلسة. ويُستخدم أيضًا ككوكي الجلسة.</li>
<li><code>userId</code>: معرّف المستخدم.</li>
<li><code>expiresAt</code>: تاريخ انتهاء صلاحية الجلسة.</li>
<li><code>ipAddress</code>: عنوان IP الخاص بالمستخدم.</li>
<li><code>userAgent</code>: وكيل المستخدم الخاص بالمستخدم. يخزّن ترويسة وكيل المستخدم من الطلب.</li>
</ul>
<h2 id="انتهاء-صلاحية-الجلسة">انتهاء صلاحية الجلسة</h2>
<p>تنتهي صلاحية الجلسة بعد 7 أيام افتراضيًا. لكن كلما استُخدمت الجلسة وتم الوصول إلى <code>updateAge</code>، يُحدَّث انتهاء صلاحية الجلسة إلى الوقت الحالي زائد قيمة <code>expiresIn</code>.</p>
<p>يمكنك تغيير قيمتَي <code>expiresIn</code> و <code>updateAge</code> بتمرير كائن <code>session</code> إلى إعداد <code>auth</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//... other config options</span>
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span> * <span class="hljs-number">7</span>, <span class="hljs-comment">// 7 days</span>
        <span class="hljs-attr">updateAge</span>: <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span> <span class="hljs-comment">// 1 day (every 1 day the session expiration is updated)</span>
    }
})
</code></pre>
<h3 id="تعطيل-تحديث-الجلسة">تعطيل تحديث الجلسة</h3>
<p>يمكنك تعطيل تحديث الجلسة بحيث لا تُحدَّث الجلسة بغضّ النظر عن خيار <code>updateAge</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//... other config options</span>
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">disableSessionRefresh</span>: <span class="hljs-literal">true</span>
    }
})
</code></pre>
<h3 id="تأجيل-تحديث-الجلسة">تأجيل تحديث الجلسة</h3>
<p>افتراضيًا، ينفّذ <code>GET /get-session</code> عمليات كتابة في قاعدة البيانات لتحديث الجلسة. قد يسبب ذلك مشكلات في إعدادات قاعدة البيانات ذات النسخ المتماثلة للقراءة حيث تُوجَّه طلبات GET إلى نسخ متماثلة للقراءة فقط.</p>
<p>عند تفعيله، يصبح GET للقراءة فقط ويعيد <code>needsRefresh: true</code> عند الحاجة إلى التحديث. ويستدعي العميل تلقائيًا POST لتنفيذ التحديث.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">deferSessionRefresh</span>: <span class="hljs-literal">true</span>
    }
})
</code></pre>
<h2 id="حداثة-الجلسة">حداثة الجلسة</h2>
<p>تتطلب بعض نقاط النهاية في Better Auth أن تكون الجلسة <strong>حديثة</strong>. تُعدّ الجلسة حديثة إذا كان <code>createdAt</code> الخاص بها ضمن حد <code>freshAge</code>. افتراضيًا، تُضبط <code>freshAge</code> على <strong>يوم واحد</strong> (60 * 60 * 24).</p>
<p>يمكنك تخصيص قيمة <code>freshAge</code> بتمرير كائن <code>session</code> في إعداد <code>auth</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//... other config options</span>
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">freshAge</span>: <span class="hljs-number">60</span> * <span class="hljs-number">5</span> <span class="hljs-comment">// 5 minutes (the session is fresh if created within the last 5 minutes)</span>
    }
})
</code></pre>
<p><strong>لتعطيل فحص الحداثة</strong>، اضبط <code>freshAge</code> على <code>0</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//... other config options</span>
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">freshAge</span>: <span class="hljs-number">0</span> <span class="hljs-comment">// Disable freshness check</span>
    }
})
</code></pre>
<h2 id="إدارة-الجلسات">إدارة الجلسات</h2>
<p>توفّر Better Auth مجموعة من الدوال لإدارة الجلسات.</p>
<h3 id="الحصول-على-الجلسة">الحصول على الجلسة</h3>
<p>تسترد دالة <code>getSession</code> الجلسة النشطة الحالية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: session } = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">getSession</span>()
</code></pre>
<p>لمعرفة كيفية تخصيص استجابة الجلسة، راجع قسم <a href="#customizing-session-response">تخصيص استجابة الجلسة</a>.</p>
<h3 id="استخدام-الجلسة">استخدام الجلسة</h3>
<p>توفّر أداة <code>useSession</code> طريقة تفاعلية للوصول إلى الجلسة الحالية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: session } = authClient.<span class="hljs-title function_">useSession</span>()
</code></pre>
<h3 id="سرد-الجلسات">سرد الجلسات</h3>
<p>تُعيد دالة <code>listSessions</code> قائمة بالجلسات النشطة للمستخدم.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">const</span> sessions = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">listSessions</span>()
</code></pre>
<h3 id="إبطال-الجلسة">إبطال الجلسة</h3>
<p>عندما يسجّل المستخدم خروجه من جهاز، تُنهى الجلسة تلقائيًا. ومع ذلك، يمكنك أيضًا إنهاء جلسة يدويًا من أي جهاز مسجَّل فيه دخول المستخدم.</p>
<p>لإنهاء جلسة، استخدم دالة <code>revokeSession</code>. مرِّر رمز الجلسة فقط كمعامل.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">revokeSession</span>({
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;session-token&quot;</span>
})
</code></pre>
<h3 id="إبطال-الجلسات-الأخرى">إبطال الجلسات الأخرى</h3>
<p>لإبطال جميع الجلسات الأخرى باستثناء الجلسة الحالية، يمكنك استخدام دالة <code>revokeOtherSessions</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">revokeOtherSessions</span>()
</code></pre>
<h3 id="إبطال-جميع-الجلسات">إبطال جميع الجلسات</h3>
<p>لإبطال جميع الجلسات، يمكنك استخدام دالة <code>revokeSessions</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">revokeSessions</span>()
</code></pre>
<h3 id="تحديث-الجلسة">تحديث الجلسة</h3>
<p>إذا كانت لديك <a href="https://better-auth.com/docs/concepts/database#extending-core-schema">حقول إضافية</a> مهيّأة على الجلسة، يمكنك تحديثها باستخدام دالة <code>updateSession</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">updateSession</span>({
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&quot;dark&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;en&quot;</span>,
})
</code></pre>
<p>لا يمكن تحديث حقول الجلسة الأساسية (<code>token</code> و<code>userId</code> و<code>expiresAt</code> و<code>createdAt</code> و<code>updatedAt</code> و<code>ipAddress</code> و<code>userAgent</code>) عبر نقطة النهاية هذه. يُسمح فقط بالحقول الإضافية المخصّصة.</p>
<p>على الخادم:</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">updateSession</span>({
    <span class="hljs-attr">body</span>: {
        <span class="hljs-attr">theme</span>: <span class="hljs-string">&quot;dark&quot;</span>,
    },
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
});
</code></pre>
<h3 id="إبطال-الجلسات-عند-تغيير-كلمة-المرور">إبطال الجلسات عند تغيير كلمة المرور</h3>
<p>يمكنك إبطال جميع الجلسات عندما يغيّر المستخدم كلمة مروره بتمرير <code>revokeOtherSessions</code> بالقيمة true على دالة <code>changePassword</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">changePassword</span>({
    <span class="hljs-attr">newPassword</span>: newPassword,
    <span class="hljs-attr">currentPassword</span>: currentPassword,
    <span class="hljs-attr">revokeOtherSessions</span>: <span class="hljs-literal">true</span>,
})
</code></pre>
<p>بالنسبة للجلسات المخزّنة في قاعدة البيانات، يجري تغيير كلمة المرور وإبطال الجلسات في معاملة واحدة عندما تكون المعاملات مفعّلة لمُهايئك، وتُبطَل الجلسات أولًا. إذا فشل الإبطال، يعيد الطلب خطأً وتبقى كلمة المرور الحالية كما هي. وبدون المعاملات، يؤدي الفشل أثناء حفظ كلمة المرور الجديدة إلى بقاء كلمة المرور الحالية مع كون الجلسات قد أُبطِلت بالفعل. ومع <a href="https://better-auth.com/docs/concepts/database#secondary-storage">التخزين الثانوي</a>، تُزال الجلسات منه بعد الالتزام (commit). ويُسجَّل أي فشل هناك، وتُحتفظ بكلمة المرور الجديدة، ويمكن لتلك الجلسات أن تظل صالحة حتى تنتهي صلاحيتها.</p>
<h2 id="التخزين-المؤقت-للجلسات">التخزين المؤقت للجلسات</h2>
<h3 id="التخزين-المؤقت-للكوكيز">التخزين المؤقت للكوكيز</h3>
<p>ليس مثاليًا استدعاء قاعدة بياناتك في كل مرة يُستدعى فيها <code>useSession</code> أو <code>getSession</code>، خاصةً إذا لم تتغيّر الجلسات كثيرًا. يعالج التخزين المؤقت للكوكيز ذلك عبر تخزين بيانات الجلسة في كوكي موقّع قصير العمر—على غرار طريقة استخدام رموز وصول JWT مع رموز التحديث.</p>
<p>عند تفعيل التخزين المؤقت للكوكيز، يمكن للخادم التحقق من صلاحية الجلسة من الكوكي نفسه بدلًا من الوصول إلى قاعدة البيانات في كل مرة. يُوقَّع الكوكي لمنع التلاعب، وتضمن <code>maxAge</code> القصيرة تحديث بيانات الجلسة بانتظام. وإذا أُبطِلت الجلسة أو انتهت صلاحيتها، يُبطَل الكوكي تلقائيًا.</p>
<p>لتفعيل التخزين المؤقت للكوكيز، ما عليك سوى ضبط <code>session.cookieCache</code> في إعداد auth:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">maxAge</span>: <span class="hljs-number">5</span> * <span class="hljs-number">60</span> <span class="hljs-comment">// Cache duration in seconds (5 minutes)</span>
        }
    }
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p><strong>ملاحظات</strong></p>
<p>عند تفعيل <code>cookieCache</code>، قد تظل الجلسات المُبطَلة نشطة على الأجهزة الأخرى حتى ينتهي التخزين المؤقت للكوكيز (<code>maxAge</code>). ويعود ذلك إلى:</p>
<ul>
<li>يخزّن التخزين المؤقت للكوكيز بيانات الجلسة في متصفح العميل</li>
<li>لا يمكن للخادم حذف الكوكيز مباشرةً من الأجهزة الأخرى</li>
<li>لا يُعاد التحقق من الجلسات إلا عند انتهاء التخزين المؤقت أو عند استخدام <code>disableCookieCache: true</code></li>
</ul>
<p><strong>إذا كان الإبطال الفوري للجلسة أمرًا بالغ الأهمية:</strong></p>
<ul>
<li>عطّل <code>cookieCache</code> بالكامل، أو</li>
<li>اضبط <code>maxAge</code> أقصر (مثل 60 ثانية)، أو</li>
<li>استخدم <code>disableCookieCache: true</code> للعمليات الحساسة</li>
</ul>
</div>
<h4>استراتيجيات التخزين المؤقت للكوكيز</h4>
<p>تدعم Better Auth ثلاث استراتيجيات ترميز مختلفة للتخزين المؤقت للكوكيز:</p>
<ul>
<li><strong><code>compact</code></strong> (افتراضي): يستخدم ترميز base64url مع توقيع HMAC-SHA256. الصيغة الأكثر إحكامًا دون أي عبء إضافي من مواصفة JWT. الأفضل للأداء والحجم.</li>
<li><strong><code>jwt</code></strong>: JWT قياسي. يستخدم افتراضيًا HMAC-SHA256 (HS256) مع سرّ Better Auth الخاص بك. موقّع لكن غير مشفّر - يمكن لأي شخص قراءته لكنه محصّن ضد التلاعب. إذا كنت بحاجة إلى كوكيز تخزين مؤقت للجلسة تتحقق مقابل JWKS الخاص بإضافة JWT، فثبّت إضافة <code>jwt()</code> مع <code>sessionCookieCache: true</code> لاستخدام مفاتيح التوقيع غير المتماثلة الخاصة بها بدلًا من ذلك.</li>
<li><strong><code>jwe</code></strong>: يستخدم JWE (تشفير الويب JSON) مع A256CBC-HS512 واشتقاق مفاتيح HKDF. رموز مشفّرة بالكامل - غير قابلة للقراءة ولا للتلاعب. الأكثر أمانًا لكن الأكبر حجمًا.</li>
</ul>
<p><strong>المقارنة:</strong></p>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>الحجم</th>
<th>الأمان</th>
<th>قابل للقراءة</th>
<th>قابل للتشغيل المتبادل</th>
<th>حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>compact</code></td>
<td>الأصغر</td>
<td>جيد (موقّع)</td>
<td>نعم</td>
<td>لا</td>
<td>حرج الأداء، الاستخدام الداخلي</td>
</tr>
<tr>
<td><code>jwt</code></td>
<td>متوسط</td>
<td>جيد (موقّع)</td>
<td>نعم</td>
<td>نعم</td>
<td>الحاجة إلى توافق JWT، التكاملات الخارجية</td>
</tr>
<tr>
<td><code>jwe</code></td>
<td>الأكبر</td>
<td>الأفضل (مشفّر)</td>
<td>لا</td>
<td>نعم</td>
<td>البيانات الحساسة، أقصى أمان</td>
</tr>
</tbody>
</table>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">maxAge</span>: <span class="hljs-number">5</span> * <span class="hljs-number">60</span>,
            <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;compact&quot;</span> <span class="hljs-comment">// or &quot;jwt&quot; or &quot;jwe&quot;</span>
        }
    }
});
</code></pre>
<p><strong>ملاحظة:</strong> جميع الاستراتيجيات آمنة تشفيريًا وتمنع التلاعب. الفروق الأساسية هي الحجم وقابلية القراءة والتوافق مع مواصفة JWT.</p>
<p><strong>متى تستخدم كلًّا منها:</strong></p>
<ul>
<li><strong>استخدم <code>compact</code></strong> عندما تحتاج إلى أقصى أداء وأصغر حجم كوكي. الأفضل لمعظم التطبيقات التي تُستخدم فيها الكوكيز داخليًا فقط من قِبل Better Auth.</li>
<li><strong>استخدم <code>jwt</code></strong> عندما تحتاج إلى توافق JWT مع الأنظمة الخارجية، أو عندما تريد رموز JWT قياسية يمكن التحقق منها بواسطة أدوات خارجية. الرموز قابلة للقراءة (JSON بترميز base64) لكنها محصّنة ضد التلاعب. فعّل <code>sessionCookieCache</code> على إضافة JWT إذا أردت أن يتحقق JWT الخاص بالتخزين المؤقت للكوكيز مقابل JWKS الخاصة بها بدلًا من سرّ مشترك.</li>
<li><strong>استخدم <code>jwe</code></strong> عندما تحتاج إلى أقصى أمان وتريد إخفاء بيانات الجلسة عن العميل. الرموز مشفّرة بالكامل ولا يمكن قراءتها دون المفتاح السري. استخدم هذا للبيانات الحساسة أو متطلبات الامتثال.</li>
</ul>
<h3 id="رموز-jwt-للتخزين-المؤقت-للكوكيز-المدعومة-بـ-jwks">رموز JWT للتخزين المؤقت للكوكيز المدعومة بـ JWKS</h3>
<p>إذا أردت أن يكون كوكي <code>session_data</code> قابلًا للتحقق عبر نقطة نهاية JWKS الخاصة بإضافة JWT بدلًا من سرّ مشترك، ففعّل إضافة JWT واختر صراحةً التوقيع المدعوم بـ JWKS:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>
<span class="hljs-keyword">import</span> { jwt } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/plugins&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">jwt</span>({
        <span class="hljs-attr">sessionCookieCache</span>: <span class="hljs-literal">true</span>
    })],
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;jwt&quot;</span>
        }
    }
})
</code></pre>
<p>يؤثر هذا فقط على كوكي <code>session_data</code>. لا يزال كوكي <code>session_token</code> الأساسي معرّف جلسة مبهمًا ولا يُكشَف عنه عبر JWKS. كما تستخدم رموز JWT الخاصة بالتخزين المؤقت للكوكيز ملف تعريف رمز منفصلًا عن نقطة النهاية <code>/token</code> الخاصة بإضافة JWT، لذا فإن تلك الرموز غير قابلة للتبادل.</p>
<p>إذا أردت تعطيل الإرجاع من التخزين المؤقت للكوكيز عند جلب الجلسة، فيمكنك تمرير <code>disableCookieCache:true</code>؛ سيفرض هذا على الخادم جلب الجلسة من قاعدة البيانات وتحديث التخزين المؤقت للكوكيز أيضًا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { authClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth-client&quot;</span>

<span class="hljs-keyword">const</span> session = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">getSession</span>({ <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">disableCookieCache</span>: <span class="hljs-literal">true</span>
}})
</code></pre>
<p>أو على الخادم</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">getSession</span>({
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">disableCookieCache</span>: <span class="hljs-literal">true</span>,
    }, 
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
});
</code></pre>
<h2 id="الجلسات-في-التخزين-الثانوي">الجلسات في التخزين الثانوي</h2>
<p>افتراضيًا، إذا وفّرت <a href="https://better-auth.com/docs/concepts/database#secondary-storage">تخزينًا ثانويًا</a> في إعداد auth الخاص بك، فستُخزَّن الجلسة في التخزين الثانوي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// ... other options</span>
  <span class="hljs-attr">secondaryStorage</span>: {
    <span class="hljs-comment">// Your implementation here</span>
  },
});
</code></pre>
<h3 id="تخزين-الجلسات-في-قاعدة-البيانات">تخزين الجلسات في قاعدة البيانات</h3>
<p>افتراضيًا، تخزّن Better Auth الجلسات بالفعل في قاعدة البيانات، لكن إذا وفّرت تخزينًا ثانويًا، فستخزّن Better Auth الجلسات في التخزين الثانوي بدلًا من قاعدة البيانات.</p>
<p>اضبط <code>storeSessionInDatabase: true</code> لتخزين الجلسات في كلٍّ من قاعدة البيانات والتخزين الثانوي. تتحقق عمليات البحث عن رمز الجلسة في التخزين الثانوي أولًا، ثم تعود إلى قاعدة البيانات للإدخالات المفقودة ما لم تكن <code>preserveSessionInDatabase</code> مفعّلة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">secondaryStorage</span>: { <span class="hljs-comment">/** your secondary storage implementation here */</span> },
    <span class="hljs-attr">session</span>: { <span class="hljs-comment">// [!code highlight]</span>
        <span class="hljs-attr">storeSessionInDatabase</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// [!code highlight]</span>
    } <span class="hljs-comment">// [!code highlight]</span>
});
</code></pre>
<h3 id="الحفاظ-على-الجلسات">الحفاظ على الجلسات</h3>
<p>عند إبطال جلسة، ستُزال من التخزين الثانوي، لكن إذا فعّلت <code>preserveSessionInDatabase</code>، فسيُحتفظ بصف الجلسة في قاعدة البيانات بدلًا من حذفه. يُعلَّم الصف المحفوظ كمنتهٍ (تُضبط <code>expiresAt</code> الخاصة به على وقت الإبطال)، لذا لا يُستعاد أبدًا كجلسة حية وتُعامَل أي رموز مرتبطة به (مثل رموز وصول مزوّد OAuth) كمنتهية.</p>
<p>يفيد هذا إذا أردت تتبّع الجلسات التي أُبطِلت.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">secondaryStorage</span>: { <span class="hljs-comment">/** your secondary storage implementation here */</span> },
    <span class="hljs-attr">session</span>: { <span class="hljs-comment">// [!code highlight]</span>
        <span class="hljs-attr">preserveSessionInDatabase</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// [!code highlight]</span>
    } <span class="hljs-comment">// [!code highlight]</span>
});
</code></pre>
<h2 id="إدارة-الجلسات-عديمة-الحالة">إدارة الجلسات عديمة الحالة</h2>
<p>تدعم Better Auth إدارة الجلسات عديمة الحالة دون أي قاعدة بيانات. وهذا يعني أن بيانات الجلسة تُخزَّن في كوكي موقّع/مشفّر ولا يستعلم الخادم أبدًا من قاعدة بيانات للتحقق من صحة الجلسات - بل يتحقق فقط من توقيع الكوكي ويفحص انتهاء الصلاحية.</p>
<h3 id="الإعداد-الأساسي-عديم-الحالة">الإعداد الأساسي عديم الحالة</h3>
<p>إذا لم تمرّر إعداد قاعدة بيانات، فستفعّل Better Auth تلقائيًا الوضع عديم الحالة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">// No database configuration</span>
    <span class="hljs-attr">socialProviders</span>: {
        <span class="hljs-attr">google</span>: {
            <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_ID</span>,
            <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_SECRET</span>,
        },
    },
});
</code></pre>
<p>لتفعيل الوضع عديم الحالة يدويًا، تحتاج إلى تهيئة <code>cookieCache</code> و<code>account</code> بالخيارات التالية:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">maxAge</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>, <span class="hljs-comment">// 7 days cache duration</span>
            <span class="hljs-attr">strategy</span>: <span class="hljs-string">&quot;jwe&quot;</span>, <span class="hljs-comment">// can be &quot;jwe&quot;, &quot;jwt&quot; or &quot;compact&quot;</span>
            <span class="hljs-attr">refreshCache</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable stateless refresh</span>
        },
    },
    <span class="hljs-attr">account</span>: {
        <span class="hljs-attr">storeStateStrategy</span>: <span class="hljs-string">&quot;cookie&quot;</span>,
        <span class="hljs-attr">storeAccountCookie</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Store provider account data after OAuth flow in an encrypted cookie</span>
    }
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>إذا لم توفّر قاعدة بيانات، نوفّر لك الإعداد أعلاه افتراضيًا.</p>
</div>
<p>في تدفقات OAuth عديمة الحالة، يخزّن <code>storeAccountCookie</code> بيانات حساب المزوّد، بما في ذلك مادة رمز OAuth، في كوكي <code>account_data</code> المشفّر. ويمكن لـ <code>getAccessToken({ useAccountCookie: true })</code> تحديث رموز وصول المزوّد المنتهية الصلاحية عندما يحتوي كوكي الحساب على رمز تحديث وانتهاء صلاحية معروف لرمز الوصول. وتضبط استجابات تحديث الرموز كوكي حساب محدَّثًا، لذا يجب على التكاملات من جهة الخادم تمرير ترويسة <code>Set-Cookie</code> المُعادة إلى المتصفح.</p>
<p>تقسّم Better Auth كوكيز الحساب المفرطة الحجم إلى أجزاء، لكن قد تفرض المتصفحات والوسطاء حدودًا إجمالية للكوكيز أو الترويسات. استخدم تخزين الحساب المدعوم بقاعدة بيانات للمزوّدين الذين يصدرون رموز JWT كبيرة أو لتدفقات الإنتاج التي تحتاج إلى تخزين رموز دائم.</p>
<h3 id="فهم-refreshcache">فهم <code>refreshCache</code></h3>
<p>يتحكم خيار <code>refreshCache</code> في التحديث التلقائي للكوكي <strong>قبل انتهاء الصلاحية</strong> دون الاستعلام من أي قاعدة بيانات:</p>
<ul>
<li><strong><code>false</code></strong> (افتراضي): لا يوجد تحديث تلقائي. وعندما ينتهي التخزين المؤقت للكوكيز (يصل إلى <code>maxAge</code>)، سيحاول الجلب من قاعدة البيانات إن كانت متاحة.</li>
<li><strong><code>true</code></strong>: تفعيل التحديث التلقائي بالإعدادات الافتراضية. يحدّث عند بلوغ 80% من <code>maxAge</code> (تبقّي 20% من الوقت).</li>
<li><strong><code>object</code></strong>: إعداد تحديث مخصّص بخاصية <code>updateAge</code>.</li>
</ul>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">maxAge</span>: <span class="hljs-number">300</span>, <span class="hljs-comment">// 5 minutes</span>
            <span class="hljs-attr">refreshCache</span>: {
                <span class="hljs-attr">updateAge</span>: <span class="hljs-number">60</span> <span class="hljs-comment">// Refresh when 60 seconds remain before expiry</span>
            }
        }
    }
});
</code></pre>
<h3 id="إصدار-الجلسات-عديمة-الحالة">إصدار الجلسات عديمة الحالة</h3>
<p>من أكبر مساوئ الجلسات عديمة الحالة أنه لا يمكنك إبطال الجلسة بسهولة. لحل ذلك مع Better Auth، إذا أردت إبطال جميع الجلسات، يمكنك تغيير إصدار التخزين المؤقت للكوكيز وإعادة نشر تطبيقك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">version</span>: <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-comment">// [!code highlight] Change the version to invalidate all sessions</span>
        }
    }
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>سيؤدي هذا إلى إبطال جميع الجلسات التي لا تطابق الإصدار الجديد.</p>
</div>
<h3 id="عديم-الحالة-مع-التخزين-الثانوي">عديم الحالة مع التخزين الثانوي</h3>
<p>يمكنك الجمع بين الجلسات عديمة الحالة والتخزين الثانوي (Redis، إلخ) للحصول على أفضل ما في العالمين:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>
<span class="hljs-keyword">import</span> { redis } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./redis&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">// No primary database needed</span>
    <span class="hljs-attr">secondaryStorage</span>: {
        <span class="hljs-attr">get</span>: <span class="hljs-title function_">async</span> (key) =&gt; <span class="hljs-keyword">await</span> redis.<span class="hljs-title function_">get</span>(key),
        <span class="hljs-attr">set</span>: <span class="hljs-title function_">async</span> (key, value, ttl) =&gt; <span class="hljs-keyword">await</span> redis.<span class="hljs-title function_">set</span>(key, value, <span class="hljs-string">&quot;EX&quot;</span>, ttl),
        <span class="hljs-attr">delete</span>: <span class="hljs-title function_">async</span> (key) =&gt; <span class="hljs-keyword">await</span> redis.<span class="hljs-title function_">del</span>(key)
    },
    <span class="hljs-attr">session</span>: {
        <span class="hljs-attr">cookieCache</span>: {
            <span class="hljs-attr">maxAge</span>: <span class="hljs-number">5</span> * <span class="hljs-number">60</span>, <span class="hljs-comment">// [!code highlight] 5 minutes (short-lived cookie)</span>
            <span class="hljs-attr">refreshCache</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// [!code highlight] Disable stateless refresh</span>
        }
    }
});
</code></pre>
<p>هذا الإعداد:</p>
<ul>
<li>يستخدم الكوكيز للتحقق من الجلسة (دون استعلامات قاعدة بيانات)</li>
<li>يستخدم Redis لتخزين بيانات الجلسة وتحديث التخزين المؤقت للكوكيز قبل انتهاء الصلاحية</li>
<li>يمكنك إبطال الجلسات من التخزين الثانوي وسيُبطَل التخزين المؤقت للكوكيز عند التحديث</li>
</ul>
<h2 id="تخصيص-استجابة-الجلسة">تخصيص استجابة الجلسة</h2>
<p>عند استدعاء <code>getSession</code> أو <code>useSession</code>، تُعاد بيانات الجلسة ككائنَي <code>user</code> و<code>session</code>. يمكنك تخصيص هذه الاستجابة باستخدام إضافة <code>customSession</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { customSession } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/plugins&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-title function_">customSession</span>(<span class="hljs-title function_">async</span> ({ user, session }) =&gt; {
            <span class="hljs-keyword">const</span> roles = <span class="hljs-title function_">findUserRoles</span>(session.<span class="hljs-property">session</span>.<span class="hljs-property">userId</span>);
            <span class="hljs-keyword">return</span> {
                roles,
                <span class="hljs-attr">user</span>: {
                    ...user,
                    <span class="hljs-attr">newField</span>: <span class="hljs-string">&quot;newField&quot;</span>,
                },
                session
            };
        }),
    ],
});
</code></pre>
<p>سيضيف هذا <code>roles</code> و<code>user.newField</code> إلى استجابة الجلسة.</p>
<p><strong>الاستدلال على العميل</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { customSessionClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client/plugins&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>; <span class="hljs-comment">// Import the auth instance as a type</span>

<span class="hljs-keyword">const</span> authClient = <span class="hljs-title function_">createAuthClient</span>({
    <span class="hljs-attr">plugins</span>: [customSessionClient&lt;<span class="hljs-keyword">typeof</span> auth&gt;()],
});

<span class="hljs-keyword">const</span> { data } = authClient.<span class="hljs-title function_">useSession</span>();
<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: sessionData } = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">getSession</span>();
<span class="hljs-comment">// data.roles</span>
<span class="hljs-comment">// data.user.newField</span>
</code></pre>
<h3 id="تحذيرات-بشأن-تخصيص-استجابة-الجلسة">تحذيرات بشأن تخصيص استجابة الجلسة</h3>
<ol>
<li>لا يستدلّ كائن <code>session</code> المُمرَّر إلى دالة الاستدعاء على الحقول التي تضيفها الإضافات.</li>
</ol>
<p>ومع ذلك، كحل بديل، يمكنك رفع خيارات auth الخاصة بك وتمريرها إلى الإضافة للاستدلال على الحقول.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth, <span class="hljs-title class_">BetterAuthOptions</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">const</span> options = {
  <span class="hljs-comment">//...config options</span>
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">//...plugins </span>
  ]
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">BetterAuthOptions</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    ...options,
    <span class="hljs-attr">plugins</span>: [
        ...(options.<span class="hljs-property">plugins</span> ?? []),
        <span class="hljs-title function_">customSession</span>(<span class="hljs-title function_">async</span> ({ user, session }, ctx) =&gt; {
            <span class="hljs-comment">// now both user and session will infer the fields added by plugins and your custom fields</span>
            <span class="hljs-keyword">return</span> {
                user,
                session
            }
        }, options), <span class="hljs-comment">// pass options here  // [!code highlight]</span>
    ]
})
</code></pre>
<ol start="2">
<li>عندما يكون كود الخادم والعميل في مشروعين أو مستودعين منفصلين، ولا يمكنك استيراد نسخة <code>auth</code> كمرجع نوع، فلن يعمل استدلال الأنواع لحقول الجلسة المخصّصة على جانب العميل.</li>
<li>لا يشمل التخزين المؤقت للجلسة، بما في ذلك التخزين الثانوي أو التخزين المؤقت للكوكيز، الحقول المخصّصة. وفي كل مرة تُجلَب فيها الجلسة، ستُستدعى دالة الجلسة المخصّصة الخاصة بك.</li>
</ol>
<p><strong>تعديل نقطة النهاية list-device-sessions</strong>
تُستخدم نقطة النهاية <code>/multi-session/list-device-sessions</code> من إضافة <a href="https://better-auth.com/docs/plugins/multi-session">multi-session</a> لسرد الأجهزة المسجَّل فيها دخول المستخدم.</p>
<p>يمكنك تعديل استجابة نقطة النهاية هذه بتمرير خيار <code>shouldMutateListDeviceSessionsEndpoint</code> إلى إضافة <code>customSession</code>.</p>
<p>افتراضيًا، لا نعدّل استجابة نقطة النهاية هذه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { customSession } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/plugins&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-title function_">customSession</span>(<span class="hljs-title function_">async</span> ({ user, session }, ctx) =&gt; {
            <span class="hljs-keyword">return</span> {
                user,
                session
            }
        }, {}, { <span class="hljs-attr">shouldMutateListDeviceSessionsEndpoint</span>: <span class="hljs-literal">true</span> }), <span class="hljs-comment">// [!code highlight]</span>
    ],
});
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
