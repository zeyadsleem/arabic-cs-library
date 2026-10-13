const s="better-auth",a="concepts",n="المفاهيم",t="oauth",e="بروتوكول OAuth",p=[{depth:2,id:"تهيئة-المزودين-الاجتماعيين",text:"تهيئة المزوّدين الاجتماعيين"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"تسجيل-الدخول",text:"تسجيل الدخول"},{depth:3,id:"ربط-الحساب",text:"ربط الحساب"},{depth:3,id:"التحقق-من-معلومات-مستخدم-oauth",text:"التحقق من معلومات مستخدم OAuth"},{depth:3,id:"الحصول-على-رمز-الوصول",text:"الحصول على رمز الوصول"},{depth:3,id:"تحديث-رمز-الوصول",text:"تحديث رمز الوصول"},{depth:3,id:"الحصول-على-معلومات-الحساب-المقدمة-من-المزود",text:"الحصول على معلومات الحساب المقدَّمة من المزوّد"},{depth:3,id:"طلب-نطاقات-إضافية",text:"طلب نطاقات إضافية"},{depth:3,id:"تخصيص-رابط-التفويض-authorization-url",text:"تخصيص رابط التفويض (Authorization URL)"},{depth:3,id:"تمرير-بيانات-إضافية-عبر-تدفق-oauth",text:"تمرير بيانات إضافية عبر تدفّق OAuth"},{depth:2,id:"التعامل-مع-المزودين-الذين-لا-يوفرون-البريد-الإلكتروني",text:"التعامل مع المزوّدين الذين لا يوفّرون البريد الإلكتروني"},{depth:3,id:"إنشاء-بريد-إلكتروني-بديل-باستخدام-mapprofiletouser",text:"إنشاء بريد إلكتروني بديل باستخدام mapProfileToUser"},{depth:3,id:"ملاحظات-خاصة-بكل-مزود",text:"ملاحظات خاصة بكل مزوّد"},{depth:2,id:"خيارات-المزود",text:"خيارات المزوّد"},{depth:3,id:"clientid",text:"clientId"},{depth:3,id:"scope",text:"scope"},{depth:3,id:"redirecturi",text:"redirectURI"},{depth:3,id:"disablesignup",text:"disableSignUp"},{depth:3,id:"disableidtokensignin",text:"disableIdTokenSignIn"},{depth:3,id:"verifyidtoken",text:"verifyIdToken"},{depth:3,id:"overrideuserinfoonsignin",text:"overrideUserInfoOnSignIn"},{depth:3,id:"requireemailverification",text:"requireEmailVerification"},{depth:3,id:"mapprofiletouser",text:"mapProfileToUser"},{depth:3,id:"refreshaccesstoken",text:"refreshAccessToken"},{depth:3,id:"clientkey",text:"clientKey"},{depth:3,id:"getuserinfo",text:"getUserInfo"},{depth:3,id:"disableimplicitsignup",text:"disableImplicitSignUp"},{depth:3,id:"prompt",text:"prompt"},{depth:3,id:"responsemode",text:"responseMode"},{depth:3,id:"disabledefaultscope",text:"disableDefaultScope"},{depth:3,id:"تهيئات-أخرى-للمزود",text:"تهيئات أخرى للمزوّد"}],l=`<h1>بروتوكول OAuth (/docs/concepts/oauth)</h1>
<p>تعرّف على كيفية تهيئة مزوّدي OAuth الاجتماعيين، وتسجيل الدخول وربط الحسابات، وطلب النطاقات (scopes)، وتمرير بيانات إضافية، وتحديث رموز الوصول (access tokens)، وتعيين الملفات الشخصية (profiles)، وتخصيص خيارات المزوّد.</p>
<p>يأتي Better Auth بدعم مدمج لـ OAuth 2.0 و OpenID Connect. وهذا يتيح لك مصادقة المستخدمين عبر مزوّدي OAuth الشائعين مثل Google وFacebook وGitHub وغيرهم.</p>
<p>إذا لم يكن المزوّد الذي تريده مدعومًا مباشرةً، يمكنك استخدام <a href="https://better-auth.com/docs/plugins/generic-oauth">إضافة OAuth العامة (Generic OAuth Plugin)</a> للتكاملات المخصّصة.</p>
<h2 id="تهيئة-المزودين-الاجتماعيين">تهيئة المزوّدين الاجتماعيين</h2>
<p>لتمكين مزوّد اجتماعي، تحتاج إلى توفير <code>clientId</code> و<code>clientSecret</code> الخاصّين بالمزوّد.</p>
<p>إليك مثالًا لكيفية تهيئة Google كمزوّد:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
    },
  },
});
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<h3 id="تسجيل-الدخول">تسجيل الدخول</h3>
<p>لتسجيل الدخول باستخدام مزوّد اجتماعي، يمكنك استخدام الدالة <code>signIn.social</code> مع <code>authClient</code> أو <code>auth.api</code> للاستخدام من جانب الخادم.</p>
<pre><code class="language-ts"><span class="hljs-comment">// client-side usage</span>
<span class="hljs-keyword">await</span> authClient.<span class="hljs-property">signIn</span>.<span class="hljs-title function_">social</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>, <span class="hljs-comment">// or any other provider id</span>
})
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// server-side usage</span>
<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signInSocial</span>({
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>, <span class="hljs-comment">// or any other provider id</span>
  },
});
</code></pre>
<h3 id="ربط-الحساب">ربط الحساب</h3>
<p>لربط حساب بمزوّد اجتماعي، يمكنك استخدام الدالة <code>linkAccount</code> مع <code>authClient</code> أو <code>auth.api</code> للاستخدام من جانب الخادم.</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">linkSocial</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>, <span class="hljs-comment">// or any other provider id</span>
})
</code></pre>
<p>الاستخدام من جانب الخادم:</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">linkSocialAccount</span>({
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>, <span class="hljs-comment">// or any other provider id</span>
  },
  <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
});
</code></pre>
<h3 id="التحقق-من-معلومات-مستخدم-oauth">التحقق من معلومات مستخدم OAuth</h3>
<p>استخدم <a href="https://better-auth.com/docs/concepts/users-accounts#callbacks"><code>user.validateUserInfo</code></a> لرفض هوية OAuth قبل أن ينشئ Better Auth مستخدمًا أو يربط حسابًا جديدًا أو يعيد تسجيل دخول مستخدم عائد. يستقبل الاستدعاء (callback) كائن <code>user</code> المُعيَّن، ويحمّل في <code>source.oauth</code> معرّف المزوّد والملف الشخصي الخام للمزوّد.</p>
<p>ويُشغَّل عند أول تجهيز (provisioning) لهوية OAuth (<code>create-user</code> من استدعاء عادي، أو تسجيل دخول عبر رمز الهوية (ID token)، أو One Tap، أو OAuth Proxy)، وعند ربط حساب جديد (<code>link-account</code>)، وكذلك في كل مرة يسجّل فيها مستخدم OAuth موجود دخوله (<code>sign-in</code>). وفي إجراء <code>sign-in</code> يحمل <code>user</code> البريد الإلكتروني <em>الحديث</em> الصادر من المزوّد، لذا يرفض فحص النطاق (domain) أي مستخدم انتقل بريده لدى المزوّد لاحقًا إلى نطاق غير مسموح. وهو يعمل في الإعدادات بلا حالة (stateless) لأنه يُنفَّذ في النقاط نفسها بغض النظر عن قاعدة البيانات.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">validateUserInfo</span>: <span class="hljs-function">(<span class="hljs-params">{ user, source }</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (source.<span class="hljs-property">oauth</span>?.<span class="hljs-property">providerId</span> !== <span class="hljs-string">&quot;google&quot;</span>) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">if</span> (!user.<span class="hljs-property">email</span>?.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&quot;@example.com&quot;</span>)) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">error</span>: <span class="hljs-string">&quot;email_not_allowed&quot;</span>,
          <span class="hljs-attr">errorDescription</span>: <span class="hljs-string">&quot;Use your example.com email to sign in&quot;</span>,
        };
      }
    },
  },
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_ID</span>!,
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_SECRET</span>!,
    },
  },
});
</code></pre>
<h3 id="الحصول-على-رمز-الوصول">الحصول على رمز الوصول</h3>
<p>استخدم <code>getAccessToken</code> لاسترداد رمز الوصول لحساب مرتبط. يجب على كل طلب للحصول على رمز أو على ملف شخصي من المزوّد أن يحدّد الحساب صراحةً: مرِّر <code>id</code> الخاص بسجل حساب Better Auth في الحقل <code>accountId</code>، أو مرِّر <code>useAccountCookie: true</code> لتحديد الحساب من ملف تعريف الارتباط (cookie) الموقَّع الخاص به. ولا يُعدّ <code>providerId</code> أبدًا محدِّدًا للحساب، وأي طلب يخلو من أيٍّ من المحدِّدين المدعومين يُعدّ غير صالح.</p>
<p>يتوفّر معرّف سجل الحساب من <code>listAccounts</code>. وإذا كان رمز الوصول الخاص به منتهي الصلاحية، يحدّثه Better Auth قبل إعادته.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: accounts, error } = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">listAccounts</span>();

<span class="hljs-keyword">if</span> (error) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(error.<span class="hljs-property">message</span>);
}

<span class="hljs-keyword">const</span> account = accounts?.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">account</span>) =&gt;</span> account.<span class="hljs-property">providerId</span> === <span class="hljs-string">&quot;google&quot;</span>);

<span class="hljs-keyword">if</span> (!account) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Google account is not linked&quot;</span>);
}

<span class="hljs-keyword">const</span> { accessToken } = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">getAccessToken</span>({
  <span class="hljs-attr">accountId</span>: account.<span class="hljs-property">id</span>,
})
</code></pre>
<p>عند تمكين <a href="https://better-auth.com/docs/reference/options#storeaccountcookie"><code>account.storeAccountCookie</code></a>، حدِّد الحساب من ملف تعريف الارتباط الموقَّع صراحةً:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> { accessToken } = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">getAccessToken</span>({
  <span class="hljs-attr">useAccountCookie</span>: <span class="hljs-literal">true</span>,
});
</code></pre>
<p>للاستخدام من جانب الخادم، مرِّر معرّف سجل الحساب نفسه. ويمكن لاستدعاء خادم موثوق أيضًا توفير <code>userId</code> عندما لا يتضمّن ترويسات الجلسة (session headers).</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">getAccessToken</span>({
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">accountId</span>: account.<span class="hljs-property">id</span>,
  },
  <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>(), <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
});
</code></pre>
<h3 id="تحديث-رمز-الوصول">تحديث رمز الوصول</h3>
<p>استخدم <code>refreshToken</code> عندما تحتاج إلى تحديث رمز الوصول للحساب المحدَّد فورًا. وهو يستعمل عقد المحدِّد الصريح نفسه الذي يستعمله <code>getAccessToken</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> tokens = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">refreshToken</span>({
  <span class="hljs-attr">accountId</span>: account.<span class="hljs-property">id</span>,
});
</code></pre>
<p>لاستخدام ملف تعريف الارتباط الموقَّع للحساب بدلاً من ذلك:</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">refreshToken</span>({
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">useAccountCookie</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>(),
});
</code></pre>
<h3 id="الحصول-على-معلومات-الحساب-المقدمة-من-المزود">الحصول على معلومات الحساب المقدَّمة من المزوّد</h3>
<p>استخدم <code>accountInfo</code> لاسترداد بيانات الملف الشخصي الحالية من المزوّد لحساب مرتبط. مرِّر <code>id</code> الخاص بسجل حساب Better Auth، وليس معرّف الموضوع (subject identifier) الخاص بالمزوّد.</p>
<p>تُبقي الاستجابة بيانات الهوية والملف الشخصي منفصلة. فيحتوي <code>account</code> على سجل Better Auth المحدَّد ومفتاح المزوّد الخاص به، ويحتوي <code>user</code> على حقول الملف الشخصي القابلة للتغيير، ويحتوي <code>data</code> على استجابة المزوّد الخام.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> info = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">accountInfo</span>({
  <span class="hljs-attr">query</span>: { <span class="hljs-attr">accountId</span>: account.<span class="hljs-property">id</span> },
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(info.<span class="hljs-property">data</span>?.<span class="hljs-property">account</span>.<span class="hljs-property">accountId</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(info.<span class="hljs-property">data</span>?.<span class="hljs-property">user</span>.<span class="hljs-property">email</span>);
</code></pre>
<p>عندما ينبغي لملف تعريف الارتباط الموقَّع للحساب أن يحدِّد الحساب:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> info = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">accountInfo</span>({
  <span class="hljs-attr">query</span>: { <span class="hljs-attr">useAccountCookie</span>: <span class="hljs-literal">true</span> },
});
</code></pre>
<p>للاستخدام من جانب الخادم:</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">accountInfo</span>({
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">accountId</span>: account.<span class="hljs-property">id</span>,
  },
  <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>(), <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
});
</code></pre>
<h3 id="طلب-نطاقات-إضافية">طلب نطاقات إضافية</h3>
<p>قد يحتاج تطبيقك أحيانًا إلى نطاقات OAuth إضافية بعد أن يكون المستخدم قد سجّل بالفعل (مثل الوصول إلى مستودعات GitHub أو Google Drive). وقد لا يرغب المستخدمون في منح صلاحيات واسعة مبدئيًا، مفضّلين البدء بأقل صلاحيات ومنح وصول إضافي عند الحاجة.</p>
<p>يمكنك طلب نطاقات إضافية باستخدام الدالة <code>linkSocial</code> مع المزوّد نفسه. وسيؤدي ذلك إلى تشغيل تدفّق OAuth جديد يطلب النطاقات الإضافية مع الحفاظ على اتصال الحساب القائم.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-title function_">requestAdditionalScopes</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">linkSocial</span>({
        <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>,
        <span class="hljs-attr">scopes</span>: [<span class="hljs-string">&quot;https://www.googleapis.com/auth/drive.file&quot;</span>],
    });
};
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>تأكد من تشغيلك الإصدار 1.2.7 من Better Auth أو أحدث. وقد تُظهر الإصدارات الأقدم (مثل 1.2.2) خطأ &quot;Social account already linked&quot; عند محاولة الربط بمزوّد موجود لطلب نطاقات إضافية.</p>
</div>
<h3 id="تخصيص-رابط-التفويض-authorization-url">تخصيص رابط التفويض (Authorization URL)</h3>
<p>لتمرير معاملات استعلام (query parameters) إضافية إلى نقطة نهاية التفويض لدى المزوّد، مرِّر <code>additionalParams</code> عند استدعاء <code>signIn.social</code> أو <code>linkSocial</code>. وتُطبَّق القيم بعد أن يكتب الإطار حالة OAuth وتحدّي PKCE و<code>redirect_uri</code>؛ وتُرفض المفاتيح المحجوزة <code>state</code> و<code>client_id</code> و<code>redirect_uri</code> و<code>response_type</code> و<code>code_challenge</code> و<code>code_challenge_method</code> و<code>scope</code> برمز 400 حتى لا يستطيع المستدعي إفساد ارتباط الاستدعاء.</p>
<pre><code class="language-ts"><span class="hljs-keyword">await</span> authClient.<span class="hljs-property">signIn</span>.<span class="hljs-title function_">social</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;cognito&quot;</span>,
  <span class="hljs-attr">additionalParams</span>: {
    <span class="hljs-attr">identity_provider</span>: <span class="hljs-string">&quot;Google&quot;</span>, <span class="hljs-comment">// skip the Cognito hosted-UI picker</span>
  },
});

<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">linkSocial</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>,
  <span class="hljs-attr">loginHint</span>: <span class="hljs-string">&quot;user@example.com&quot;</span>,
  <span class="hljs-attr">additionalParams</span>: {
    <span class="hljs-attr">access_type</span>: <span class="hljs-string">&quot;offline&quot;</span>,
    <span class="hljs-attr">prompt</span>: <span class="hljs-string">&quot;consent&quot;</span>,
  },
});
</code></pre>
<p>تُدمج معاملات الاستعلام المضمّنة الخاصة بالمزوّد (على سبيل المثال <code>include_granted_scopes=true</code> لدى Google، و<code>config_id</code> لدى Facebook، و<code>identity_provider</code> لدى Cognito عند ضبطه عبر <code>identityProvider</code>) مع <code>additionalParams</code> الممرَّرة وقت الاستدعاء؛ وتفوز القيمة الممرَّرة وقت الاستدعاء عند تعارض المفاتيح.</p>
<h3 id="تمرير-بيانات-إضافية-عبر-تدفق-oauth">تمرير بيانات إضافية عبر تدفّق OAuth</h3>
<p>يتيح لك Better Auth تمرير بيانات إضافية عبر تدفّق OAuth دون تخزينها في قاعدة البيانات. وهذا مفيد في حالات مثل تتبّع رموز الإحالة (referral codes)، أو مصادر التحليلات، أو أي بيانات مؤقتة أخرى ينبغي معالجتها أثناء المصادقة دون حفظها.</p>
<p>عند بدء تسجيل الدخول عبر OAuth أو ربط الحساب، مرِّر البيانات الإضافية:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Client-side: Sign in with additional data</span>
<span class="hljs-keyword">await</span> authClient.<span class="hljs-property">signIn</span>.<span class="hljs-title function_">social</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>,
  <span class="hljs-attr">additionalData</span>: {
    <span class="hljs-attr">referralCode</span>: <span class="hljs-string">&quot;ABC123&quot;</span>,
    <span class="hljs-attr">source</span>: <span class="hljs-string">&quot;landing-page&quot;</span>,
  },
});

<span class="hljs-comment">// Client-side: Link account with additional data</span>
<span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">linkSocial</span>({
  <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>,
  <span class="hljs-attr">additionalData</span>: {
    <span class="hljs-attr">referralCode</span>: <span class="hljs-string">&quot;ABC123&quot;</span>,
  },
});

<span class="hljs-comment">// Server-side: Sign in with additional data</span>
<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signInSocial</span>({
  <span class="hljs-attr">body</span>: {
    <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;google&quot;</span>,
    <span class="hljs-attr">additionalData</span>: {
      <span class="hljs-attr">referralCode</span>: <span class="hljs-string">&quot;ABC123&quot;</span>,
      <span class="hljs-attr">source</span>: <span class="hljs-string">&quot;admin-panel&quot;</span>,
    },
  },
});
</code></pre>
<h4>الوصول إلى البيانات الإضافية في الخطافات (Hooks)</h4>
<p>تتوفّر البيانات الإضافية في خطافاتك أثناء استدعاء OAuth عبر <code>getOAuthState</code>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يعمل هذا عادةً مع مسارات استدعاء OAuth مثل <code>/callback/:id</code>.</p>
</div>
<p>مثال باستخدام خطاف after:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthMiddleware, getOAuthState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">hooks</span>: {
    <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
      <span class="hljs-comment">// Additional data is only available during OAuth callback</span>
      <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/callback/:id&quot;</span>) {
        <span class="hljs-keyword">const</span> additionalData = <span class="hljs-keyword">await</span> getOAuthState&lt;{
          <span class="hljs-attr">referralCode</span>?: <span class="hljs-built_in">string</span>;
          <span class="hljs-attr">source</span>?: <span class="hljs-built_in">string</span>;
        }&gt;();

        <span class="hljs-keyword">if</span> (additionalData) {
          <span class="hljs-comment">// IMPORTANT: Validate and sanitize the data before using it</span>
          <span class="hljs-comment">// This data comes from the client and should not be trusted</span>

          <span class="hljs-comment">// Example: Validate and process referral code</span>
          <span class="hljs-keyword">if</span> (additionalData.<span class="hljs-property">referralCode</span>) {
            <span class="hljs-keyword">const</span> isValidFormat = <span class="hljs-regexp">/^[A-Z0-9]{6}$/</span>.<span class="hljs-title function_">test</span>(additionalData.<span class="hljs-property">referralCode</span>);
            <span class="hljs-keyword">if</span> (isValidFormat) {
              <span class="hljs-comment">// Verify the referral code exists in your database</span>
              <span class="hljs-keyword">const</span> referral = <span class="hljs-keyword">await</span> db.<span class="hljs-property">referrals</span>.<span class="hljs-title function_">findByCode</span>(additionalData.<span class="hljs-property">referralCode</span>);
              <span class="hljs-keyword">if</span> (referral) {
                <span class="hljs-comment">// Safe to use the verified referral</span>
                <span class="hljs-keyword">await</span> db.<span class="hljs-property">referrals</span>.<span class="hljs-title function_">incrementUsage</span>(referral.<span class="hljs-property">id</span>);
              }
            }
          }

          <span class="hljs-comment">// Track analytics (low-risk usage)</span>
          <span class="hljs-keyword">if</span> (additionalData.<span class="hljs-property">source</span>) {
            <span class="hljs-keyword">await</span> analytics.<span class="hljs-title function_">track</span>(<span class="hljs-string">&quot;oauth_signin&quot;</span>, {
              <span class="hljs-attr">source</span>: additionalData.<span class="hljs-property">source</span>,
              <span class="hljs-attr">userId</span>: ctx.<span class="hljs-property">context</span>.<span class="hljs-property">session</span>?.<span class="hljs-property">user</span>.<span class="hljs-property">id</span>,
            });
          }
        }
      }
    }),
  },
});
</code></pre>
<p>مثال باستخدام خطاف قاعدة البيانات:</p>
<pre><code class="language-ts"> <span class="hljs-comment">// You can also access additional data in database hooks</span>
  <span class="hljs-attr">databaseHooks</span>: {
    <span class="hljs-attr">user</span>: {
      <span class="hljs-attr">create</span>: {
        <span class="hljs-attr">before</span>: <span class="hljs-title function_">async</span> (user, ctx) =&gt; {
          <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/callback/:id&quot;</span>) {
            <span class="hljs-keyword">const</span> additionalData = <span class="hljs-keyword">await</span> getOAuthState&lt;{ <span class="hljs-attr">referredFrom</span>?: <span class="hljs-built_in">string</span> }&gt;();
            <span class="hljs-keyword">if</span> (additionalData?.<span class="hljs-property">referredFrom</span>) {
              <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">data</span>: {
                  <span class="hljs-attr">referredFrom</span>: additionalData.<span class="hljs-property">referredFrom</span>,
                },
              };
            }
          }
        },
      },
    },
  },
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>بشكل افتراضي، تتضمّن حالة OAuth البيانات التالية:</p>
<ul>
<li><code>callbackURL</code> - رابط الاستدعاء (callback URL) لتدفّق OAuth</li>
<li><code>codeVerifier</code> - مدقّق الرمز (code verifier) لتدفّق OAuth</li>
<li><code>errorURL</code> - رابط الخطأ لتدفّق OAuth</li>
<li><code>newUserURL</code> - رابط المستخدم الجديد لتدفّق OAuth</li>
<li><code>link</code> - الربط الخاص بتدفّق OAuth (البريد الإلكتروني ومعرّف المستخدم)</li>
<li><code>requestSignUp</code> - ما إذا كان ينبغي طلب التسجيل لتدفّق OAuth</li>
<li><code>expiresAt</code> - وقت انتهاء صلاحية حالة OAuth</li>
<li><code>serverContext</code> - قيم يضبطها الخادم وتبقى عبر إعادة التوجيه (انظر <a href="#passing-server-trusted-data">تمرير بيانات موثوقة من الخادم</a>)</li>
<li><code>[key: string]</code> - البيانات <code>additionalData</code> التي مرّرتها. وهي مصدرها العميل، لذا تعامل معها على أنها غير موثوقة.</li>
</ul>
</div>
<h4>تمرير بيانات موثوقة من الخادم</h4>
<p>البيانات <code>additionalData</code> يوفّرها العميل، لذا يجب التحقق من صحتها قبل استخدامها في الاستدعاء. وعندما تحتاج إضافة (plugin) (أو خطاف <code>before</code> الخاص بك) إلى نقل بيانات مشتقّة من الخادم عبر إعادة التوجيه، استخدم <code>addOAuthServerContext</code>. فهي تكتب في خانة خاصة بالخادم وحده لا يستطيع العميل تعبئتها، ويمكن قراءة القيم في الاستدعاء ضمن <code>serverContext</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> {
  addOAuthServerContext,
  createAuthMiddleware,
  getOAuthState,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">hooks</span>: {
    <span class="hljs-attr">before</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
      <span class="hljs-comment">// Social and generic OAuth providers both sign in here.</span>
      <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/sign-in/social&quot;</span>) {
        <span class="hljs-comment">// Derived on the server, so it is safe to trust on the callback.</span>
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">addOAuthServerContext</span>({ <span class="hljs-attr">tenantId</span>: ctx.<span class="hljs-property">context</span>.<span class="hljs-property">tenantId</span> });
      }
    }),
    <span class="hljs-attr">after</span>: <span class="hljs-title function_">createAuthMiddleware</span>(<span class="hljs-title function_">async</span> (ctx) =&gt; {
      <span class="hljs-keyword">if</span> (ctx.<span class="hljs-property">path</span> === <span class="hljs-string">&quot;/callback/:id&quot;</span>) {
        <span class="hljs-keyword">const</span> tenantId = (<span class="hljs-keyword">await</span> <span class="hljs-title function_">getOAuthState</span>())?.<span class="hljs-property">serverContext</span>?.<span class="hljs-property">tenantId</span>;
        <span class="hljs-comment">// Safe to use without re-validation: the client could not set this.</span>
      }
    }),
  },
});
</code></pre>
<h2 id="التعامل-مع-المزودين-الذين-لا-يوفرون-البريد-الإلكتروني">التعامل مع المزوّدين الذين لا يوفّرون البريد الإلكتروني</h2>
<p>يتطلّب Better Auth حاليًا وجود عنوان بريد إلكتروني في كل سجل مستخدم. ويعيد معظم المزوّدين بريدًا إلكترونيًا مع نطاق <code>email</code>، لكن يمكن لعدة مزوّدين حذفه بشكل مشروع. وعندما يحدث ذلك يفشل تدفّق OAuth بالخطأ <code>error=email_not_found</code> (أو <code>error=email_is_missing</code> لإضافة OAuth العامة).</p>
<p>يلخّص الجدول أدناه، لكل مزوّد متأثّر، متى قد يكون <code>email</code> غائبًا، وأي معرّف مستقرّ يمكنك استخدامه كبديل في <code>mapProfileToUser</code>، وإلى أي مدى ينبغي الوثوق بإشارة <code>email_verified</code> الصادرة من المزوّد.</p>
<table>
<thead>
<tr>
<th>المزوّد</th>
<th>متى قد يكون <code>email</code> غائبًا</th>
<th>معرّف بديل مستقرّ</th>
<th>الثقة بـ <code>email_verified</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>Apple</td>
<td>كل تسجيل دخول بعد الأول (فإن Apple تصدر <code>email</code> عند الموافقة الأولية فقط)</td>
<td><code>profile.sub</code> (مستقرّ لكل فريق Apple)</td>
<td>موثوق؛ كما تُوسم عناوين إعادة التوجيه (relay) كمُتحقَّق منها</td>
</tr>
<tr>
<td>Discord</td>
<td>الحسابات المعتمدة على الهاتف فقط؛ ولم يُمنح نطاق <code>email</code></td>
<td><code>profile.id</code> (snowflake)</td>
<td>موثوق (حقل <code>verified</code> مخصّص)</td>
</tr>
<tr>
<td>Facebook</td>
<td>لا يوجد بريد إلكتروني صالح مسجّل، حتى مع منح إذن <code>email</code></td>
<td><code>profile.id</code> (مقيّد بالتطبيق)</td>
<td>غير معروف: لا يكشف Graph API عن علامة تحقّق لكل بريد</td>
</tr>
<tr>
<td>GitHub</td>
<td>ضبط المستخدم بريده الإلكتروني على الوضع الخاص؛ أو يفتقر تطبيق GitHub إلى إذن &quot;Email addresses&quot;</td>
<td><code>profile.id</code> (رقمي)</td>
<td>موثوق</td>
</tr>
<tr>
<td>LinkedIn</td>
<td>لا يوجد بريد مؤكَّد للعضو؛ ولم يُمنح نطاق <code>email</code></td>
<td><code>profile.sub</code> (مزدوج لكل تطبيق)</td>
<td>موثوق عند وجوده</td>
</tr>
<tr>
<td>Microsoft Entra ID</td>
<td>المستخدمون المُدارون دون سمة <code>mail</code>، ما لم يُضبط <code>email</code> كـ<a href="https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims">مطالبة اختيارية (optional claim)</a></td>
<td><code>profile.oid</code> (مستقرّ ضمن <code>profile.tid</code>)</td>
<td><strong>غير موثوق</strong>: تحذّر Microsoft <a href="https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference">صراحةً</a> من استخدامه للتفويض</td>
</tr>
<tr>
<td>Roblox</td>
<td>لا يعيد تدفّق الملف الشخصي الافتراضي في Roblox بريدًا إلكترونيًا؛ وينشئ Better Auth بديلًا غير قابل للتوجيه من <code>profile.sub</code></td>
<td><code>profile.sub</code> (معرّف مستخدم Roblox)</td>
<td>غير معروف في تدفّق الملف الشخصي الافتراضي</td>
</tr>
</tbody>
</table>
<h3 id="إنشاء-بريد-إلكتروني-بديل-باستخدام-mapprofiletouser">إنشاء بريد إلكتروني بديل باستخدام <code>mapProfileToUser</code></h3>
<p>استخدم المعرّف المستقرّ للمزوّد عند يكون حقل <code>email</code> فارغًا (null) أو غائبًا:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">discord</span>: {
      <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DISCORD_CLIENT_ID</span>!,
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DISCORD_CLIENT_SECRET</span>!,
      <span class="hljs-attr">mapProfileToUser</span>: <span class="hljs-function">(<span class="hljs-params">profile</span>) =&gt;</span> ({
        <span class="hljs-attr">email</span>: profile.<span class="hljs-property">email</span> ?? <span class="hljs-string">\`<span class="hljs-subst">\${profile.id}</span>@discord.placeholder.invalid\`</span>,
      }),
    },
    <span class="hljs-attr">apple</span>: {
      <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">APPLE_CLIENT_ID</span>!,
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">APPLE_CLIENT_SECRET</span>!,
      <span class="hljs-attr">mapProfileToUser</span>: <span class="hljs-function">(<span class="hljs-params">profile</span>) =&gt;</span> ({
        <span class="hljs-attr">email</span>: profile.<span class="hljs-property">email</span> ?? <span class="hljs-string">\`<span class="hljs-subst">\${profile.sub}</span>@apple.placeholder.invalid\`</span>,
      }),
    },
    <span class="hljs-attr">microsoft</span>: {
      <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">MICROSOFT_CLIENT_ID</span>!,
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">MICROSOFT_CLIENT_SECRET</span>!,
      <span class="hljs-attr">mapProfileToUser</span>: <span class="hljs-function">(<span class="hljs-params">profile</span>) =&gt;</span> ({
        <span class="hljs-attr">email</span>: profile.<span class="hljs-property">email</span> ?? <span class="hljs-string">\`<span class="hljs-subst">\${profile.oid}</span>@entra.placeholder.invalid\`</span>,
      }),
    },
  },
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>عناوين البريد الإلكتروني البديلة ليست عناوين تواصل. ولا تستطيع الإضافات التي ترسل بريدًا (إعادة تعيين كلمة المرور، والرابط السحري، والتحقق من البريد الإلكتروني، ودعوات المؤسسة) التسليم إليها. استخدم نطاقًا تملكه أو النطاق المحجوز <code>.invalid</code> حتى لا يُستهدف أي صندوق بريد حقيقي عن طريق الخطأ.</p>
</div>
<h3 id="ملاحظات-خاصة-بكل-مزود">ملاحظات خاصة بكل مزوّد</h3>
<ul>
<li><strong>Apple</strong>: احفظ البريد الإلكتروني في أول مرة تراه. فلا توفّر Apple نقطة نهاية لمعلومات المستخدم، لذا إن لم تخزّنه عند أول تسجيل دخول فلن تستطيع استرداده لاحقًا. ويُسلسَل كلٌّ من <code>email_verified</code> و<code>is_private_email</code> كـ<strong>سلاسل نصية</strong> (<code>&quot;true&quot;</code> / <code>&quot;false&quot;</code>)، لا كقيم منطقية.</li>
<li><strong>GitHub</strong>: يُطلب نطاق <code>user:email</code> افتراضيًا. ومع ذلك تعيد رسائل البريد الخاصة <code>null</code> على <code>/user</code>؛ ويتوفّر العنوان الأساسي المُتحقَّق منه على <a href="https://docs.github.com/en/rest/users/emails"><code>/user/emails</code></a>.</li>
<li><strong>Microsoft Entra ID</strong>: لأن <code>email</code> قابل للتغيير على مستوى المستأجر (tenant) وغير مُتحقَّق منه أبدًا، استخدم <code>profile.oid</code> (ثابت لا يتغيّر، ومستقرّ ضمن المستأجر) كمرتكز للهوية؛ وتعامل مع <code>email</code> كسمة للملف الشخصي فقط. وتحذّر <a href="https://learn.microsoft.com/en-us/entra/identity-platform/claims-validation">إرشادات التحقق من المطالبات</a> من Microsoft صراحةً من استخدام <code>email</code> أو <code>preferred_username</code> أو <code>unique_name</code> لاتخاذ قرارات التفويض.</li>
<li><strong>Facebook</strong>: في غياب علامة تحقّق لكل بريد، تعامل مع كل بريد من Facebook على أنه غير مُتحقَّق منه ما لم تُجرِ تحدّي تحقّق خاصًا بك.</li>
</ul>
<p>يتعرّف Better Auth على حساب OAuth العائد عبر مفتاحه المستقرّ <code>(providerId, accountId)</code>، لكن مستخدم Better Auth المرتبط لا يزال يتطلّب عنوان بريد إلكتروني. وتُتابَع مسألة دعم المستخدمين الذين لا يملكون بريدًا إلكترونيًا في <a href="https://github.com/better-auth/better-auth/issues/9124">#9124</a>.</p>
<h2 id="خيارات-المزود">خيارات المزوّد</h2>
<h3 id="clientid">clientId</h3>
<p>معرّف عميل OAuth 2.0 (Client ID) الصادر من المزوّد.</p>
<p>بالنسبة للمزوّدين الذين يتحقّقون من رموز الهوية (ID tokens) حسب الجمهور (audience) (مثل Google وApple وMicrosoft Entra وFacebook وCognito)، يمكنك تمرير مصفوفة لقبول الرموز الصادرة لأيٍّ من العملاء المهيّئين. وتُستخدم القيمة الأولى عندما يدير Better Auth تدفّق رمز التفويض (authorization code)؛ وتُقبل جميع القيم عند التحقق من مطالبة <code>aud</code> لرمز الهوية. ويتيح ذلك تسجيل دخول عابرًا للمنصات (الويب، وiOS، وAndroid) بتهيئة خلفية واحدة، حيث يُصدر SDK الأصلي لكل منصة رموزًا تحت معرّف العميل الخاص به.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: [
        process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_WEB_CLIENT_ID</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
        process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_IOS_CLIENT_ID</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
        process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_ANDROID_CLIENT_ID</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
      ],
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_SECRET</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
    },
  },
});
</code></pre>
<p>يجب أن تكون جميع معرّفات العميل ضمن مشروع المزوّد نفسه حتى تكون الموافقة مشتركة. وبالنسبة للمزوّدين الذين لا يتحقّقون من رموز الهوية حسب الجمهور، تُقبل سلسلة نصية واحدة فقط.</p>
<h3 id="scope">scope</h3>
<p>نطاق طلب الوصول (scope). على سبيل المثال <code>email</code> أو <code>profile</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">scope</span>: [<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;profile&quot;</span>],
    },
  },
});
</code></pre>
<h3 id="redirecturi">redirectURI</h3>
<p>رابط إعادة التوجيه المخصّص (redirect URI) للمزوّد. ويستخدم افتراضيًا <code>/api/auth/callback/\${providerName}</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">redirectURI</span>: <span class="hljs-string">&quot;https://your-app.com/auth/callback&quot;</span>,
    },
  },
});
</code></pre>
<h3 id="disablesignup">disableSignUp</h3>
<p>يعطّل التسجيل للمستخدمين الجدد.</p>
<h3 id="disableidtokensignin">disableIdTokenSignIn</h3>
<p>يعطّل استخدام رمز الهوية (ID token) لتسجيل الدخول. ويكون مُمكّنًا افتراضيًا لدى بعض المزوّدين مثل Google وApple.</p>
<h3 id="verifyidtoken">verifyIdToken</h3>
<p>دالة مخصّصة للتحقق من رمز الهوية. تستقبل الرمز، وnonce اختياريًا، وسياق نقطة نهاية الطلب حتى تتمكّن من التفرّع حسب الترويسات أو بيانات الطلب الأخرى.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>توفير <code>verifyIdToken</code> <strong>يستبدل</strong> التحقق المدمج لدى المزوّد (التوقيع، والمُصدر، والجمهور، والانتهاء). ويجب على الاستدعاء (callback) الخاص بك إجراء تلك الفحوصات بنفسه. والترويسات التي يوفّرها العميل مثل <code>x-platform</code> يتحكّم بها المهاجم — استخدمها فقط لاختيار الجمهور (أو المطالبة الأخرى) الذي تتحقّق مقابله، لا كدليل على الهوية بحد ذاتها.</p>
</div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { createRemoteJWKSet, jwtVerify } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;jose&quot;</span>;

<span class="hljs-keyword">const</span> appleJwks = <span class="hljs-title function_">createRemoteJWKSet</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&quot;https://appleid.apple.com/auth/keys&quot;</span>),
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">apple</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_APPLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_APPLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">verifyIdToken</span>: <span class="hljs-title function_">async</span> (token, nonce, ctx) =&gt; {
        <span class="hljs-comment">// Select audience from the request, then cryptographically verify.</span>
        <span class="hljs-keyword">const</span> audience =
          ctx?.<span class="hljs-property">headers</span>?.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;x-platform&quot;</span>) === <span class="hljs-string">&quot;ios&quot;</span>
            ? process.<span class="hljs-property">env</span>.<span class="hljs-property">APPLE_APP_BUNDLE_IDENTIFIER</span>!
            : process.<span class="hljs-property">env</span>.<span class="hljs-property">APPLE_CLIENT_ID</span>!;
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">const</span> { payload } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">jwtVerify</span>(token, appleJwks, {
            <span class="hljs-attr">issuer</span>: <span class="hljs-string">&quot;https://appleid.apple.com&quot;</span>,
            audience,
            <span class="hljs-attr">maxTokenAge</span>: <span class="hljs-string">&quot;1h&quot;</span>,
          });
          <span class="hljs-keyword">if</span> (nonce &amp;&amp; payload.<span class="hljs-property">nonce</span> !== nonce) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
          }
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">catch</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      },
    },
  },
});
</code></pre>
<h3 id="overrideuserinfoonsignin">overrideUserInfoOnSignIn</h3>
<p>قيمة منطقية تحدّد ما إذا كان ينبغي تجاوز معلومات المستخدم في قاعدة البيانات عند تسجيل الدخول. وهي مضبوطة افتراضيًا على <code>false</code>، بمعنى عدم تجاوز معلومات المستخدم أثناء تسجيل الدخول. وإذا أردت تحديث معلومات المستخدم في كل مرة يسجّل فيها دخوله، فاضبطها على <code>true</code>.</p>
<h3 id="requireemailverification">requireEmailVerification</h3>
<p>يتطلّب التحقق من البريد الإلكتروني لهذا المزوّد قبل إنشاء جلسة. القيمة الافتراضية <code>false</code>.</p>
<p>عندما يُبلغ المزوّد بأن البريد الإلكتروني غير مُتحقَّق منه، لا يزال Better Auth ينشئ المستخدم والحساب أو يربطهما، لكنه لا يصدر جلسة. ويعيد استدعاء OAuth التوجيه مع <code>?error=email_not_verified</code>، ويعيد تسجيل الدخول عبر رمز الهوية رمز <code>403</code> مع رمز الخطأ <code>EMAIL_NOT_VERIFIED</code>. ويُرسَل بريد التحقق (أو يُعاد إرساله) وفق إعدادات <code>emailVerification</code> لديك: فيغطّي <code>sendOnSignUp</code> المستخدمين الجدد ويغطّي <code>sendOnSignIn</code> المستخدمين العائدين. هيّئ <code>emailVerification.sendVerificationEmail</code> وأبقِ <code>sendOnSignUp</code> مُمكّنًا حتى يتلقّى المستخدمون المحجوبون دائمًا رابطًا للتحقق.</p>
<p>يفحص هذا الحاجز حالة تحقّق المستخدم المحلي بدلاً من ادّعاء المزوّد في كل طلب. ويحتفظ المستخدم الذي تحقّق بالفعل عبر طريقة أخرى (مثل البريد الإلكتروني وكلمة المرور) بوصوله حتى لو أبلغ المزوّد لاحقًا بأن البريد غير مُتحقَّق منه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_ID</span>!,
      <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GOOGLE_CLIENT_SECRET</span>!,
      <span class="hljs-attr">requireEmailVerification</span>: <span class="hljs-literal">true</span>,
    },
  },
});
</code></pre>
<p>هذا خيار اختياري لكل مزوّد ومستقلّ عن <code>emailAndPassword.requireEmailVerification</code>: فتمكين التحقق عبر البريد الإلكتروني وكلمة المرور لا يحجب تسجيل الدخول الاجتماعي.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>مكّن هذا فقط للمزوّدين الذين يُبلغون بإشارة <code>email_verified</code> موثوقة. فعدة مزوّدين يُبلغون دائمًا بأن البريد غير مُتحقَّق منه (أو لا يعيدون بريدًا أصلًا)، لذا فإن تمكينه لديهم يحجب كل عمليات تسجيل الدخول. انظر <a href="https://better-auth.com/docs/concepts/oauth#handling-providers-without-email">التعامل مع المزوّدين الذين لا يوفّرون البريد الإلكتروني</a>.</p>
</div>
<h3 id="mapprofiletouser">mapProfileToUser</h3>
<p>استخدم <code>mapProfileToUser</code> لتغيير تعيين المستخدم الافتراضي أو لتعبئة حقول مستخدم إضافية من ملف المزوّد الشخصي.</p>
<p>يتعامل Better Auth مع القيمة المُعادة من الدالة كمدخل من المزوّد، حتى وإن كانت الدالة تعمل على خادمك. ويطبّق قواعد الإدخال من <code>user.additionalFields</code> أثناء التسجيل عبر OAuth، وتجاوز الملف الشخصي عند تسجيل الدخول، ومزامنة الملف الشخصي عند ربط الحساب. وتُحلَّل الحقول المُعيَّنة التي تسمح بالإدخال وتُخزَّن، بينما تُتجاهل القيم المُعيَّنة للحقول الموسومة بـ <code>input: false</code>.</p>
<p>لا يمكن لتعيين الملف الشخصي إعادة تعريف هوية حساب المزوّد. فالمزوّدون المدمجون يشتقّون الهوية من حقل الملف الشخصي غير القابل للتغيير والموثّق لديهم. ويستعمل مزوّدو OAuth العامة <code>accountSubject</code> عندما لا يكون الحقل الافتراضي <code>sub</code> أو <code>id</code> هو المعرّف الصحيح.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">mapProfileToUser</span>: <span class="hljs-function">(<span class="hljs-params">profile</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">firstName</span>: profile.<span class="hljs-property">given_name</span>,
          <span class="hljs-attr">lastName</span>: profile.<span class="hljs-property">family_name</span>,
        };
      },
    },
  },
});
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>صرّح بالحقول المُعيَّنة في <a href="https://better-auth.com/docs/concepts/database#extending-core-schema">خيار</a> <code>user.additionalFields</code> واسمح بتلك الحقول كمدخلات. وتنطبق القاعدة نفسها على إعدادات المصادقة بلا حالة.</p>
</div>
<h4>الحقول المملوكة للخادم ومطالبات التفويض</h4>
<p>أبقِ الحقول الحسّاسة أمنيًا مثل الأدوار (roles) والحظر (bans) والعلامات الداخلية وعضوية المؤسسة عند <code>input: false</code>. ولا تمكّن الإدخال فقط لكي يتمكّن <code>mapProfileToUser</code> من حفظ مطالبة من المزوّد، لأن الإعداد نفسه يتيح لطلبات التسجيل العامة وتحديث المستخدم توفير ذلك الحقل أيضًا.</p>
<p>يتحكّم <code>input</code> و<code>returned</code> في اتجاهين منفصلين. على سبيل المثال، <code>{ input: false, returned: true }</code> يعرّف حقلًا مملوكًا للخادم قابلًا للقراءة. ولا يمكن لمدخلات API ولا لـ <code>mapProfileToUser</code> توفيره، لكن Better Auth يضمّن قيمته المخزّنة في الاستجابات.</p>
<p>إذا كانت مطالبة من المزوّد تتحكّم في من يحقّ له تسجيل الدخول، ففرض السياسة قبل أن يُكمل Better Auth تسجيل الدخول عبر OAuth. ولا تؤجّل الفحص إلى ما بعد تسجيل الدخول، لأن Better Auth قد يكون قد أصدر بالفعل جلسة صالحة. وفضّل خيارًا خاصًا بالمزوّد إن وُجد، مثل <a href="https://better-auth.com/docs/authentication/google#restrict-sign-in-to-google-workspace">خيار <code>hd</code></a> لدى مزوّد Google لنطاق Google Workspace. وفي التدفّقات التي تستدعي <a href="https://better-auth.com/docs/concepts/oauth#getuserinfo"><code>getUserInfo</code></a>، يمكن لتنفيذ مخصّص التحقق من استجابة المزوّد وإعادة <code>null</code> عند فشل السياسة. وهيّئ فرضًا مماثلًا لمسارات تسجيل الدخول المنفصلة التي لا تستدعي <code>getUserInfo</code>.</p>
<p>وإذا كنت بحاجة أيضًا إلى تخزين المطالبة المُتحقَّق منها، فأبقِ الحقل عند <code>input: false</code> واكتبه عبر طبقة قاعدة بيانات تطبيقك. واستخدم <code>defaultValue</code> فقط لقيمة ثابتة تنطبق على كل مستخدم يُنشأ عبر تهيئة المصادقة تلك، لا لقيمة مشتقّة من ملف المزوّد الشخصي.</p>
<h3 id="refreshaccesstoken">refreshAccessToken</h3>
<p>دالة مخصّصة لتحديث الرمز. هذه الميزة مدعومة فقط للمزوّدين الاجتماعيين المدمجين (Google وFacebook وGitHub وغيرهم)، وغير مدعومة حاليًا لمزوّدي OAuth المخصّصين المهيّئين عبر إضافة OAuth العامة. وبالنسبة للمزوّدين المدمجين، يمكنك توفير دالة مخصّصة لتحديث الرمز عند الحاجة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">refreshAccessToken</span>: <span class="hljs-title function_">async</span> (token) =&gt; {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">accessToken</span>: <span class="hljs-string">&quot;new-access-token&quot;</span>,
          <span class="hljs-attr">refreshToken</span>: <span class="hljs-string">&quot;new-refresh-token&quot;</span>,
        };
      },
    },
  },
});
</code></pre>
<h3 id="clientkey">clientKey</h3>
<p>مفتاح العميل (client key) لتطبيقك. ويستخدمه مزوّد TikTok الاجتماعي بدلاً من <code>clientId</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">tiktok</span>: {
      <span class="hljs-attr">clientKey</span>: <span class="hljs-string">&quot;YOUR_TIKTOK_CLIENT_KEY&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_TIKTOK_CLIENT_SECRET&quot;</span>,
    },
  },
});
</code></pre>
<h3 id="getuserinfo">getUserInfo</h3>
<p>دالة مخصّصة للحصول على معلومات المستخدم من المزوّد. ويتيح لك ذلك تجاوز عملية استرداد معلومات المستخدم الافتراضية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">getUserInfo</span>: <span class="hljs-title function_">async</span> (token) =&gt; {
        <span class="hljs-comment">// Custom implementation to get user info</span>
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;https://www.googleapis.com/oauth2/v2/userinfo&quot;</span>, {
          <span class="hljs-attr">headers</span>: {
            <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${token.accessToken}</span>\`</span>,
          },
        });
        <span class="hljs-keyword">const</span> profile = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">user</span>: {
            <span class="hljs-attr">name</span>: profile.<span class="hljs-property">name</span>,
            <span class="hljs-attr">email</span>: profile.<span class="hljs-property">email</span>,
            <span class="hljs-attr">image</span>: profile.<span class="hljs-property">picture</span>,
            <span class="hljs-attr">emailVerified</span>: profile.<span class="hljs-property">verified_email</span>,
          },
          <span class="hljs-attr">data</span>: profile,
        };
      },
    },
  },
});
</code></pre>
<h3 id="disableimplicitsignup">disableImplicitSignUp</h3>
<p>يعطّل التسجيل الضمني للمستخدمين الجدد. وعند ضبطه على true للمزوّد، يجب استدعاء تسجيل الدخول مع <code>requestSignUp</code> بقيمة true لإنشاء مستخدمين جدد.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">disableImplicitSignUp</span>: <span class="hljs-literal">true</span>,
    },
  },
});
</code></pre>
<h3 id="prompt">prompt</h3>
<p>المطالبة (prompt) المستخدمة لطلب رمز التفويض. وهي تتحكّم في سلوك تدفّق المصادقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">prompt</span>: <span class="hljs-string">&quot;select_account&quot;</span>, <span class="hljs-comment">// or &quot;consent&quot;, &quot;login&quot;, &quot;none&quot;, &quot;select_account+consent&quot;</span>
    },
  },
});
</code></pre>
<h3 id="responsemode">responseMode</h3>
<p>وضع الاستجابة (response mode) المستخدم لطلب رمز التفويض. وهو يحدّد كيفية إرجاع استجابة التفويض.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">responseMode</span>: <span class="hljs-string">&quot;query&quot;</span>, <span class="hljs-comment">// or &quot;form_post&quot;</span>
    },
  },
});
</code></pre>
<h3 id="disabledefaultscope">disableDefaultScope</h3>
<p>يزيل النطاقات الافتراضية للمزوّد. فبشكل افتراضي، يضمّن المزوّدون نطاقات معيّنة مثل <code>email</code> و<code>profile</code>. اضبط هذا على <code>true</code> لإزالة هذه النطاقات الافتراضية واستخدام النطاقات التي تحدّدها فقط.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
  <span class="hljs-comment">// Other configurations...</span>
  <span class="hljs-attr">socialProviders</span>: {
    <span class="hljs-attr">google</span>: {
      <span class="hljs-attr">clientId</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_ID&quot;</span>,
      <span class="hljs-attr">clientSecret</span>: <span class="hljs-string">&quot;YOUR_GOOGLE_CLIENT_SECRET&quot;</span>,
      <span class="hljs-attr">disableDefaultScope</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">scope</span>: [<span class="hljs-string">&quot;https://www.googleapis.com/auth/userinfo.email&quot;</span>], <span class="hljs-comment">// Only this scope will be used</span>
    },
  },
});
</code></pre>
<h3 id="تهيئات-أخرى-للمزود">تهيئات أخرى للمزوّد</h3>
<p>قد يكون لكل مزوّد خيارات إضافية؛ راجع توثيق المزوّد المحدّد لمزيد من التفاصيل.</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:p,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,l as html,t as slug,e as title};
