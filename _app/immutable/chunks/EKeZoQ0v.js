const n="kinney",s="enterprise-ui",t="واجهات المؤسسات",e="authentication-and-authorization",a="المصادقة والتخويل وتعدّد المستأجرين (Authentication, Authorization, and Multi-Tenancy)",o=[{depth:2,id:"بروتوكولات-المصادقة-في-المؤسسات",text:"بروتوكولات المصادقة في المؤسسات"},{depth:3,id:"بروتوكولات-saml-وoauth-20-وopenid-connect",text:"بروتوكولات SAML وOAuth 2.0 وOpenID Connect"},{depth:3,id:"مسار-رمز-التخويل-authorization-code-flow",text:"مسار رمز التخويل (Authorization Code Flow)"},{depth:2,id:"إدارة-الرموز-في-تطبيقات-الصفحة-الواحدة",text:"إدارة الرموز في تطبيقات الصفحة الواحدة"},{depth:3,id:"أين-لا-ينبغي-أن-تعيش-الرموز",text:"أين لا ينبغي أن تعيش الرموز"},{depth:3,id:"نمط-الواجهة-الخلفية-للواجهة-الأمامية",text:"نمط الواجهة الخلفية للواجهة الأمامية"},{depth:3,id:"دورة-حياة-الرمز-التحديث-والتجديد",text:"دورة حياة الرمز: التحديث والتجديد"},{depth:3,id:"إدارة-الجلسات",text:"إدارة الجلسات"},{depth:3,id:"الحماية-من-csrf",text:"الحماية من CSRF"},{depth:2,id:"نماذج-التخويل",text:"نماذج التخويل"},{depth:3,id:"rbac-الأدوار-وحدودها",text:"RBAC: الأدوار وحدودها"},{depth:3,id:"abac-الخصائص-والسياق",text:"ABAC: الخصائص والسياق"},{depth:3,id:"rebac-العلاقات-كمخطط",text:"ReBAC: العلاقات كمخطط"},{depth:3,id:"pbac-السياسات-كشيفرة",text:"PBAC: السياسات كشيفرة"},{depth:2,id:"التخويل-في-الواجهة-الأمامية",text:"التخويل في الواجهة الأمامية"},{depth:3,id:"حراس-على-مستوى-المسار",text:"حرّاس على مستوى المسار"},{depth:3,id:"التصيير-الشرطي-على-مستوى-المكون",text:"التصيير الشرطي على مستوى المكوّن"},{depth:3,id:"مزامنة-منطق-الواجهة-الأمامية-والخادم",text:"مزامنة منطق الواجهة الأمامية والخادم"},{depth:3,id:"إظهار-أم-إخفاء-أم-تعطيل",text:"إظهار أم إخفاء أم تعطيل؟"},{depth:2,id:"المصادقة-في-معماريات-الواجهات-الأمامية-المصغرة",text:"المصادقة في معماريات الواجهات الأمامية المصغّرة"},{depth:3,id:"الغلاف-يملك-المصادقة",text:"الغلاف يملك المصادقة"},{depth:3,id:"توزيع-حالة-المصادقة-على-الواجهات-المصغرة",text:"توزيع حالة المصادقة على الواجهات المصغّرة"},{depth:3,id:"حدود-التخويل-عبر-الوحدات",text:"حدود التخويل عبر الوحدات"},{depth:2,id:"تعدد-المستأجرين-في-الواجهة-الأمامية",text:"تعدّد المستأجرين في الواجهة الأمامية"},{depth:3,id:"تحديد-المستأجر",text:"تحديد المستأجر"},{depth:3,id:"السمات-الواعية-بالمستأجر",text:"السمات الواعية بالمستأجر"},{depth:3,id:"عزل-البيانات-في-الواجهة-الأمامية",text:"عزل البيانات في الواجهة الأمامية"},{depth:3,id:"استراتيجيات-التخزين-المؤقت-وcdn",text:"استراتيجيات التخزين المؤقت وCDN"},{depth:2,id:"الملكية-التنظيمية",text:"الملكية التنظيمية"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"المصادقة-في-الواجهات-الأمامية-الموزعة",text:"المصادقة في الواجهات الأمامية الموزّعة"},{depth:3,id:"نمط-رموز-bff",text:"نمط رموز BFF"},{depth:3,id:"نماذج-التخويل-1",text:"نماذج التخويل"},{depth:3,id:"انتشار-الجلسة-عبر-الوحدات-البعيدة",text:"انتشار الجلسة عبر الوحدات البعيدة"}],p=`<p>المصادقة والتخويل وتعدّد المستأجرين ثلاث مشكلات تنزع فرق الواجهات الأمامية في المؤسسات إلى اعتبارها «عمل شخص آخر» حتى تصير عملها هي. يتولّى مزوّد الهوية أمر المصادقة، ويفرض الخادم الأذونات، ويدير فريق المنصة المستأجرين — والواجهة الأمامية فقط… تستدعي واجهة API وتأمل أن يكون كل شيء على ما يرام.</p>
<p>وهذا ينجح حتى تحتاج إلى تصيير واجهة تُخفي زر «حذف المؤسسة» عن غير المديرين، وتُظهر هوية بصرية خاصة بمستأجر دون إعادة نشر كاملة، وتتعامل مع تحديث الرمز (token) دون مقاطعة نموذج يملؤه المستخدم منذ عشرين دقيقة، وتفعل كل هذا عبر خمس واجهات أمامية مصغّرة منشورة باستقلال لكل منها رأيها في أين يوجد المستخدم الحالي.</p>
<p>يغطي هذا القسم الهموم الخاصة بالواجهة الأمامية: كيف تعمل بروتوكولات الهوية عند حدّ المتصفح، وأين ينبغي أن تعيش الرموز (وأين لا ينبغي)، وكيف تُنمذج التخويل في الواجهة دون تكرار منطق الخادم، وكيف يعمل التوجيه والسمات (theming) متعددو المستأجرين عمليًا.</p>
<h2 id="بروتوكولات-المصادقة-في-المؤسسات">بروتوكولات المصادقة في المؤسسات</h2>
<p>المصادقة المؤسسية ليست بروتوكولًا واحدًا. إنها كومة من البروتوكولات متراكبة بعضها فوق بعض، يحلّ كل منها مشكلة مختلفة، ومهمة الواجهة الأمامية أن تشارك في المراسم دون أن تصبح الحلقة الأمنية الأضعف.</p>
<h3 id="بروتوكولات-saml-وoauth-20-وopenid-connect">بروتوكولات SAML وOAuth 2.0 وOpenID Connect</h3>
<p>تهيمن ثلاثة بروتوكولات على الهوية المؤسسية، وهي غير قابلة للتبادل.</p>
<p><strong>SAML 2.0</strong> هو أساس الدخول الموحّد (SSO) المؤسسي التقليدي. يستخدم تأكيدات قائمة على XML لنقل بيانات المصادقة بين مزوّد هوية (مثل Okta أو Microsoft Entra ID) ومزوّد خدمة (تطبيقك). يُعاد توجيه المستخدم إلى مزوّد الهوية، ويُصادق هناك — غالبًا مقابل Active Directory — ثم يُعاد توجيهه راجعًا بتأكيد موقّع. لا يرى التطبيق كلمة مرور المستخدم قط. بروتوكول SAML مطوّل ومثقل بـ XML، لكنه راسخ بعمق في تطبيقات القوى العاملة المتصلة بأدلة الشركات. تصف <a href="https://learn.microsoft.com/en-us/entra/identity-platform/authentication-vs-authorization">وثائق منصة الهوية من Microsoft</a> مسار SAML بالتفصيل.</p>
<p><strong>OAuth 2.0</strong> إطار <em>تخويل</em>. يجيب عن «ما المسموح لهذا العميل أن يفعله بالنيابة عن المستخدم؟» لا «من المستخدم؟». يصدر OAuth رموز وصول (access tokens) تمنح أذونات محدودة النطاق على الموارد. وهو أساس تخويل الـ API عبر الويب الحديث.</p>
<p><strong>OpenID Connect</strong> (OIDC) طبقة <em>هوية</em> مبنية فوق OAuth 2.0. يجيب عن «من المستخدم؟» بإضافة رمز هوية (ID token) — وهو JWT يحمل ادّعاءات عن المستخدم المُصادَق — إلى مسار OAuth. تصفه <a href="https://openid.net/developers/how-connect-works/">وثائق OIDC نفسها</a> بأنه يقدّم إجابة قابلة للتحقّق عن «ما هوية الشخص الذي يستخدم المتصفح حاليًا؟»</p>
<pre><code>graph TD
    subgraph &quot;Protocol Stack&quot;
        OIDC[&quot;OpenID Connect&lt;br/&gt;(Identity Layer)&quot;]
        OAuth[&quot;OAuth 2.0&lt;br/&gt;(Authorization Framework)&quot;]
        HTTP[&quot;HTTP / TLS&quot;]
    end

    OIDC --&gt; OAuth
    OAuth --&gt; HTTP

    OIDC -.- IDToken[&quot;ID Token (JWT)&lt;br/&gt;Who is the user?&quot;]
    OAuth -.- AccessToken[&quot;Access Token&lt;br/&gt;What can they do?&quot;]
</code></pre>
<p>الفرق العملي مهم. في سياق مؤسسي، غالبًا ما يكون SAML الخيار لتطبيقات القوى العاملة الداخلية المتصلة بأدلة قديمة، بينما يُفضَّل OIDC للبوابات الجديدة المواجهة للعملاء وتطبيقات الجوال. وتشغّل مؤسسات كثيرة الاثنين معًا — SAML لأدوات الموظفين التي سبقت الانتقال إلى السحابة، وOIDC لكل ما بُني في السنوات الخمس الأخيرة.</p>
<table>
<thead>
<tr>
<th>الخصيصة</th>
<th>SAML 2.0</th>
<th>OpenID Connect</th>
<th>OAuth 2.0</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الهدف الأساسي</strong></td>
<td>اتحاد الهوية / الدخول الموحّد</td>
<td>التحقّق من الهوية</td>
<td>تخويل الموارد</td>
</tr>
<tr>
<td><strong>صيغة البيانات</strong></td>
<td>XML</td>
<td>JSON / JWT</td>
<td>JSON / JWT</td>
</tr>
<tr>
<td><strong>النقل</strong></td>
<td>إعادات توجيه المتصفح</td>
<td>ملائم لـ API / REST</td>
<td>ملائم لـ API / REST</td>
</tr>
<tr>
<td><strong>مزوّد الهوية المعتاد</strong></td>
<td>Active Directory، Okta</td>
<td>Google، Auth0، Entra ID</td>
<td>GitHub، Salesforce، Stripe</td>
</tr>
<tr>
<td><strong>الأفضل لـ</strong></td>
<td>تطبيقات القوى العاملة القديمة</td>
<td>تطبيقات السحابة/الجوال الحديثة</td>
<td>تفويض الوصول إلى API</td>
</tr>
</tbody>
</table>
<h3 id="مسار-رمز-التخويل-authorization-code-flow">مسار رمز التخويل (Authorization Code Flow)</h3>
<p>للتطبيقات القائمة في المتصفح، مسار OIDC المعياري هو <strong>مسار رمز التخويل مع PKCE</strong> (مفتاح إثبات لتبادل الرمز). صُمّم PKCE أصلًا لتطبيقات الجوال لكنه صار اليوم التوصية لكل العملاء العامّين، بمن فيهم تطبيقات الصفحة الواحدة (SPAs).</p>
<pre><code>sequenceDiagram
    participant Browser as Browser (SPA)
    participant Auth as Authorization Server
    participant API as Resource API

    Browser-&gt;&gt;Browser: Generate code_verifier + code_challenge
    Browser-&gt;&gt;Auth: /authorize?code_challenge=...&amp;redirect_uri=...
    Auth--&gt;&gt;Browser: Login page
    Browser-&gt;&gt;Auth: User enters credentials
    Auth--&gt;&gt;Browser: Redirect with authorization code
    Browser-&gt;&gt;Auth: /token (code + code_verifier)
    Auth--&gt;&gt;Browser: ID token + access token
    Browser-&gt;&gt;API: Request with access token
    API--&gt;&gt;Browser: Protected resource
</code></pre>
<p>الـ <code>code_verifier</code> سلسلة عشوائية يولّدها العميل. والـ <code>code_challenge</code> تجزئة SHA-256 لتلك السلسلة، تُرسَل مع طلب التخويل الأولي. وحين يستبدل العميل رمز التخويل بالرموز، يرسل الـ <code>code_verifier</code> الأصلي. فيُجزّئه خادم التخويل ويقارن — فإن تطابقا، لم يُعترض الرمز ويُعاد تشغيله من مهاجم. يُغلق PKCE هجوم اعتراض رمز التخويل دون الحاجة إلى سرّ عميل، وهو ما لا تستطيع التطبيقات القائمة في المتصفح تخزينه بأمان.</p>
<h2 id="إدارة-الرموز-في-تطبيقات-الصفحة-الواحدة">إدارة الرموز في تطبيقات الصفحة الواحدة</h2>
<p>تواجه تطبيقات الصفحة الواحدة توتّرًا جوهريًا: فهي تحتاج الرموز لاستدعاء الـ APIs، لكنها تعمل بالكامل في المتصفح، حيث يكون أي شيء مخزّن متاحًا نظريًا للسكربتات الخبيثة.</p>
<h3 id="أين-لا-ينبغي-أن-تعيش-الرموز">أين لا ينبغي أن تعيش الرموز</h3>
<p>انتقلت الصناعة بحسم بعيدًا عن تخزين الرموز في <code>localStorage</code> أو <code>sessionStorage</code>. فكلاهما متاح لأي JavaScript تعمل في أصل التطبيق، ما يعني أن ثغرة XSS واحدة — وسم <code>&lt;script&gt;</code> واحد يُحقن عبر اعتمادية مخترقة، أو معامل استعلام منعكس، أو إدخال مستخدم غير مُنقّى — يمكن أن يسرّب كل رمز ويرسله إلى خادم المهاجم. يصف <a href="https://fusionauth.io/blog/backend-for-frontend">دليل BFF من FusionAuth</a> هذه المخاطرة الجوهرية: فالبيانات في تخزين المتصفح يمكن أن تصل إليها JavaScript وتُرسَل إلى مكان آخر لانتحال هوية المستخدم.</p>
<h3 id="نمط-الواجهة-الخلفية-للواجهة-الأمامية">نمط الواجهة الخلفية للواجهة الأمامية</h3>
<p>الجواب الحديث هو <strong>نمط الواجهة الخلفية للواجهة الأمامية (BFF)</strong>، المشروح بالتفصيل في قسم <a href="https://stevekinney.com/courses/enterprise-ui/backends-for-frontends">خوادم الواجهات</a>. وبالنسبة إلى المصادقة تحديدًا، يعمل الـ BFF كعميل OAuth سريّ: يستقبل رمز التخويل، ويستبدله بالرموز، ويخزّنها من جهة الخادم (عادةً في Redis أو مخزن جلسات مشفّر)، ويصدر ملف تعريف ارتباط جلسة للمتصفح.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simplified BFF token exchange</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/auth/callback&#x27;</span>, <span class="hljs-title function_">async</span> (request, response) =&gt; {
  <span class="hljs-keyword">const</span> { code } = request.<span class="hljs-property">query</span>;

  <span class="hljs-keyword">const</span> tokens = <span class="hljs-keyword">await</span> authClient.<span class="hljs-title function_">exchangeCode</span>(code, {
    <span class="hljs-attr">clientId</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">OIDC_CLIENT_ID</span>,
    <span class="hljs-attr">clientSecret</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">OIDC_CLIENT_SECRET</span>,
    <span class="hljs-attr">redirectUri</span>: <span class="hljs-string">\`<span class="hljs-subst">\${process.env.APP_URL}</span>/auth/callback\`</span>,
  });

  <span class="hljs-comment">// Tokens stay server-side. The browser gets a session cookie.</span>
  request.<span class="hljs-property">session</span>.<span class="hljs-property">accessToken</span> = tokens.<span class="hljs-property">accessToken</span>;
  request.<span class="hljs-property">session</span>.<span class="hljs-property">refreshToken</span> = tokens.<span class="hljs-property">refreshToken</span>;
  request.<span class="hljs-property">session</span>.<span class="hljs-property">idToken</span> = tokens.<span class="hljs-property">idToken</span>;

  response.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/&#x27;</span>);
});
</code></pre>
<p><em>ملاحظة:</em> الـ BFF عميل <em>سريّ</em> — يملك سرّ عميل لا يراه المتصفح قط.</p>
<p>يُوسَم ملف تعريف ارتباط الجلسة بـ <code>HttpOnly</code> (لا تستطيع JavaScript قراءته)، و<code>Secure</code> (يُرسَل فقط عبر HTTPS)، و<code>SameSite=Strict</code> (لا يُرسَل في الطلبات عابرة الأصل). ولأن ملف تعريف الارتباط <code>HttpOnly</code>، يمكن لهجوم XSS ناجح أن يجري طلبات <em>بالنيابة عن</em> المستخدم خلال مدة الجلسة، لكنه لا يستطيع سرقة الرموز واستخدامها من جهاز آخر. وهذا تقليص ذو معنى لنطاق الضرر.</p>
<table>
<thead>
<tr>
<th>نمط التخزين</th>
<th>أين تعيش الرموز</th>
<th>خطر XSS</th>
<th>خطر سرقة الرموز</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>localStorage</code></td>
<td>JavaScript في المتصفح</td>
<td>وصول كامل إلى الرموز</td>
<td>مرتفع</td>
</tr>
<tr>
<td><code>sessionStorage</code></td>
<td>JavaScript في المتصفح</td>
<td>وصول كامل إلى الرموز (محدود بالتبويب)</td>
<td>مرتفع</td>
</tr>
<tr>
<td><strong>BFF + ملف تعريف ارتباط</strong></td>
<td>جلسة من جهة الخادم</td>
<td>إساءة استخدام الجلسة فقط (لا تسريب)</td>
<td>منخفض</td>
</tr>
</tbody>
</table>
<h3 id="دورة-حياة-الرمز-التحديث-والتجديد">دورة حياة الرمز: التحديث والتجديد</h3>
<p>رموز الوصول قصيرة العمر عن قصد — عادةً من 15 دقيقة إلى ساعة — حتى تكون نافذة فائدة الرمز المسروق محدودة. أما رموز التحديث (refresh tokens) فطويلة العمر وتُستخدم للحصول على رموز وصول جديدة دون إجبار المستخدم على إعادة المصادقة.</p>
<p>بالنسبة إلى العملاء العامّين (تطبيقات الصفحة الواحدة بلا BFF)، التوصية الحالية هي <strong>تدوير رمز التحديث</strong>: في كل مرة يُستخدم فيها رمز تحديث، يُبطله خادم التخويل ويصدر واحدًا جديدًا. فإن ظهر الرمز القديم مرة أخرى، فهذه إشارة واضحة إلى سرقة، فيُبطِل الخادم سلسلة الرموز كاملة. تصف <a href="https://developer.okta.com/docs/guides/refresh-tokens/main/">وثائق Okta لرموز التحديث</a> آلية التدوير هذه بالتفصيل.</p>
<p>مع وجود BFF، يصبح التحديث أبسط. يحتفظ الـ BFF برمز التحديث من جهة الخادم ويحصل على رموز وصول جديدة بصمت عند انتهائها. ولا يشارك المتصفح في التجديد قط — بل يواصل إرسال ملف تعريف ارتباط جلسته فقط، ويضمن الـ BFF أن رمز الوصول الكامن حديث.</p>
<pre><code>sequenceDiagram
    participant Browser
    participant BFF
    participant Auth as Auth Server
    participant API

    Browser-&gt;&gt;BFF: GET /api/data (session cookie)
    Note over BFF: Access token expired
    BFF-&gt;&gt;Auth: POST /token (refresh_token)
    Auth--&gt;&gt;BFF: New access token + new refresh token
    Note over BFF: Tokens updated in session store
    BFF-&gt;&gt;API: GET /data (new access token)
    API--&gt;&gt;BFF: Response
    BFF--&gt;&gt;Browser: Response
    Note over Browser: User noticed nothing
</code></pre>
<h3 id="إدارة-الجلسات">إدارة الجلسات</h3>
<p>تحتاج تطبيقات المؤسسات أكثر من مجرد «مسجّل الدخول» أو «مسجّل الخروج». تشمل متطلبات الجلسة الشائعة:</p>
<ul>
<li><strong>الجلسات المنزلقة</strong>: يمتد الانتهاء ما دام المستخدم نشطًا. ولا ينبغي إجبار مستخدم يعمل ثماني ساعات على إعادة المصادقة في منتصف مهمة.</li>
<li><strong>المهلات المطلقة</strong>: حدّ صارم تُشترط بعده إعادة المصادقة بصرف النظر عن النشاط. يخفّف هذا من خطر طرفية مهجورة بجلسة نشطة.</li>
<li><strong>حدود الجلسات المتزامنة</strong>: تقييد المستخدم بجلسة أو جلستين نشطتين يمنع مشاركة الحسابات ويحدّ من بصمة حساب مخترق. فـ Salesforce، مثلًا، تتيح للمسؤولين <a href="https://help.salesforce.com/s/articleView?id=xcloud.security_login_flow_limit_concurrent_sessions.htm&amp;language=en_US&amp;type=5">تهيئة حدود الجلسات المتزامنة</a> عبر مسارات تسجيل الدخول.</li>
</ul>
<h3 id="الحماية-من-csrf">الحماية من CSRF</h3>
<p>حتى مع ملفات تعريف ارتباط <code>HttpOnly</code> وBFF، يبقى تزوير الطلبات عابر المواقع (CSRF) تهديدًا. لا تستطيع صفحة خبيثة <em>قراءة</em> ملف تعريف ارتباط الجلسة، لكن المتصفح سيرسله تلقائيًا في أي طلب إلى أصل الـ BFF.</p>
<p>الدفاعات المعيارية:</p>
<ul>
<li><strong><code>SameSite=Strict</code></strong> على ملف تعريف ارتباط الجلسة يمنع المتصفح من إرساله في الطلبات عابرة الأصل. وهذا أقوى دفاع على مستوى ملف تعريف الارتباط لكنه يكسر التنقّل الشرعي عابر المواقع (مثل النقر على رابط من بريد إلكتروني).</li>
<li><strong><code>SameSite=Lax</code></strong> حلّ وسط شائع: يُرسَل ملف تعريف الارتباط في التنقّلات العلوية (طلبات GET من روابط خارجية) لكن لا في طلبات POST أو نداءات API من أصول أخرى.</li>
<li><strong>شرط ترويسة مخصّصة</strong>: اشترط ترويسة مخصّصة مثل <code>X-Requested-With</code> في كل نداءات API. يفرض المتصفح فحصًا مسبقًا لـ CORS على الطلبات عابرة الأصل ذات الترويسات المخصّصة، ويمكن للـ BFF أن يرفض أي طلب تنقصه الترويسة.</li>
</ul>
<h2 id="نماذج-التخويل">نماذج التخويل</h2>
<p>تخبرك المصادقة <em>من</em> المستخدم. ويخبرك التخويل <em>بما يمكنه فعله</em>. هذان هَمّان مختلفان جوهريًا، وخلطهما هو السبيل الذي تنتهي به الفرق إلى منطق أذونات متفرّق عبر دستة ملفات وسيط وثلاثة خطّافات في الواجهة الأمامية وجدول Google مشترك لا يحدّثه أحد.</p>
<h3 id="rbac-الأدوار-وحدودها">RBAC: الأدوار وحدودها</h3>
<p><strong>التحكّم في الوصول القائم على الأدوار</strong> هو نقطة البداية الأكثر شيوعًا. يُسنَد المستخدمون إلى أدوار (<code>Admin</code>، <code>Editor</code>، <code>Viewer</code>)، وتُربَط الأدوار بأذونات، ويفحص التطبيق الدور قبل السماح بإجراء.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple RBAC check</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">canDeleteProject</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">return</span> user.<span class="hljs-property">roles</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;admin&#x27;</span>);
}
</code></pre>
<p>إن RBAC سهل الفهم وسهل التنفيذ. وله أيضًا نمط فشل موثّق جيدًا: <strong>انفجار الأدوار</strong>. فمع نمو المؤسسة وصيرورة الأذونات أكثر تفصيلًا، ينتهي بك الأمر إلى إنشاء أدوار مثل <code>billing-admin-east-coast-read-only</code> لأن الأدوار الموجودة لا تلتقط التوليفة الدقيقة من الأذونات التي يحتاجها أحدهم. يصف <a href="https://www.osohq.com/learn/rbac-vs-abac-vs-pbac">مقارنة التحكّم في الوصول من Oso</a> هذا التضخّم بأنه المشكلة الجوهرية في قابلية توسّع RBAC الصرف.</p>
<h3 id="abac-الخصائص-والسياق">ABAC: الخصائص والسياق</h3>
<p><strong>التحكّم في الوصول القائم على الخصائص</strong> يقيّم السياسات بناءً على خصائص المستخدم والمورد والبيئة. فبدل ربط المستخدمين بأدوار ثابتة، يقيّم ABAC قواعد ديناميكية:</p>
<pre><code>// Pseudocode: ABAC policy
allow if:
  user.department == resource.department
  AND user.clearance &gt;= resource.sensitivity
  AND request.time is within business_hours
</code></pre>
<p>إن ABAC قوي لأنه يتعامل مع قرارات حساسة للسياق دون إنشاء دور جديد لكل توليفة من الشروط. وهو أيضًا أصعب في الاستيعاب، لأن مساحة سطح السياسة تنمو مع كل خصيصة جديدة تضيفها.</p>
<h3 id="rebac-العلاقات-كمخطط">ReBAC: العلاقات كمخطط</h3>
<p><strong>التحكّم في الوصول القائم على العلاقات</strong> ينمذج التخويل كمخطط من العلاقات بين الكيانات. وقد ذاع صيته بعد أن نشرت Google [ورقة Zanzibar][7]، التي وصفت نظام التخويل الذي يسند Google Drive وYouTube وخدمات Google الأخرى.</p>
<p>يجيب ReBAC عن أسئلة مثل «هل يمكن لهذا المستخدم تعديل هذا المستند؟» باجتياز مخطط علاقات: المستخدم عضو في فريق، والفريق يملك مشروعًا، والمشروع يحتوي المستند، والمستند يرث أذونات المشروع.</p>
<pre><code>graph LR
    Alice[&quot;Alice (User)&quot;]
    Eng[&quot;Engineering (Team)&quot;]
    Proj[&quot;Project Alpha&quot;]
    Doc[&quot;Design Doc&quot;]

    Alice --&gt;|member of| Eng
    Eng --&gt;|owns| Proj
    Proj --&gt;|contains| Doc
    Doc -.-&gt;|inherits permissions from| Proj
</code></pre>
<p>تطبّق أدوات مثل <a href="https://openfga.dev/">OpenFGA</a> وOry Keto هذا النموذج الذي يضع العلاقة أولًا. وReBAC فعّال بشكل خاص مع التطبيقات التعاونية ذات البنى الهرمية — مشاركة المستندات، وإدارة المشاريع، والتسلسلات التنظيمية — حيث لا يكون السؤال «ما الدور الذي يملكه هذا المستخدم؟» بل «ما علاقة هذا المستخدم بهذا المورد؟»</p>
<h3 id="pbac-السياسات-كشيفرة">PBAC: السياسات كشيفرة</h3>
<p><strong>التحكّم في الوصول القائم على السياسات</strong> أقلّ نموذجًا وأكثر استراتيجية نشر. فهو يُخرِج منطق التخويل إلى محرّك سياسات مركزي — مثل <a href="https://www.openpolicyagent.org/">Open Policy Agent</a> (OPA) مع Rego، أو <a href="https://docs.cedarpolicy.com/">Cedar</a> لـ AWS — حيث تُكتب السياسات بلغة تصريحية وتُدار بنظام الإصدارات وتُقيَّم وقت التشغيل.</p>
<pre><code class="language-rego"># OPA/Rego: allow project deletion only for org admins
package project.authz

default allow := false

allow if {
    input.action == &quot;delete&quot;
    input.user.role == &quot;org_admin&quot;
    input.resource.org_id == input.user.org_id
}
</code></pre>
<p>ميزة PBAC أنه يفصل السياسة عن شيفرة التطبيق. تستطيع فرق الأمن إدارة السياسات وتدقيقها وتحديثها باستقلال عن دورة إصدار الهندسة. ويصبح محرّك السياسات مصدر الحقيقة الوحيد، وتقيّم كل خدمة — واجهة أمامية وخلفية — مقابل القواعد نفسها.</p>
<table>
<thead>
<tr>
<th>النموذج</th>
<th>المفهوم الجوهري</th>
<th>القوة</th>
<th>تحدّي التوسّع</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>RBAC</strong></td>
<td>مستخدم → دور → صلاحية</td>
<td>البساطة</td>
<td>انفجار الأدوار</td>
</tr>
<tr>
<td><strong>ABAC</strong></td>
<td>خصائص + قواعد</td>
<td>مرونة ديناميكية</td>
<td>تعقيد السياسات</td>
</tr>
<tr>
<td><strong>ReBAC</strong></td>
<td>مخطط علاقات</td>
<td>وصول هرمي</td>
<td>أداء استعلام المخطط</td>
</tr>
<tr>
<td><strong>PBAC</strong></td>
<td>محرّك سياسات خارجي</td>
<td>منفصل وقابل للتدقيق</td>
<td>عبء تشغيلي للمحرّك</td>
</tr>
</tbody>
</table>
<p>عمليًا، تستخدم معظم الأنظمة المؤسسية مزيجًا هجينًا. يوفّر RBAC البنية الخشنة (مديرون، محرّرون، مشاهدون)، ويتولّى ABAC أو ReBAC السياق الدقيق (وصول محدود بالقسم، مشاركة على مستوى المستند)، ويوفّر PBAC آلية النشر التي تُبقي الأمر كله متسقًا عبر الخدمات.</p>
<h2 id="التخويل-في-الواجهة-الأمامية">التخويل في الواجهة الأمامية</h2>
<p>يخدم التخويل في الواجهة الأمامية غرضين: تحسين تجربة المستخدم بتوجيهه نحو الإجراءات المسموح له بها، وتوفير طبقة دفاع ثانوية قبل أن يصل الطلب إلى الخادم. والقاعدة الحاسمة أن <strong>الواجهة الأمامية ليست أبدًا الحكم النهائي على الوصول</strong>. يجب إعادة التحقّق من كل إجراء من جهة الخادم.</p>
<h3 id="حراس-على-مستوى-المسار">حرّاس على مستوى المسار</h3>
<p>أبسط نمط تخويل في الواجهة الأمامية هو منع المستخدمين غير المصرّح لهم من الوصول إلى صفحات معيّنة. وفي React، يبدو هذا عادةً كمكوّن مُغلِّف:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ProtectedRoute</span>(<span class="hljs-params">{
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole: <span class="hljs-built_in">string</span>;
}</span>) {
  <span class="hljs-keyword">const</span> { user, isLoading } = <span class="hljs-title function_">useAuth</span>();

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSpinner</span> /&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!user || !user.<span class="hljs-property">roles</span>.<span class="hljs-title function_">includes</span>(requiredRole)) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigate</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/unauthorized&quot;</span> <span class="hljs-attr">replace</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> children;
}

<span class="hljs-comment">// Usage</span>
&lt;<span class="hljs-title class_">Route</span>
  path=<span class="hljs-string">&quot;/admin&quot;</span>
  element={
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProtectedRoute</span> <span class="hljs-attr">requiredRole</span>=<span class="hljs-string">&quot;admin&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">AdminDashboard</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ProtectedRoute</span>&gt;</span></span>
  }
/&gt;;
</code></pre>
<p><em>ملاحظة:</em> ما زال الخادم يفرض هذا. فحارس المسار تحسين لتجربة المستخدم، لا حدّ أمني.</p>
<h3 id="التصيير-الشرطي-على-مستوى-المكون">التصيير الشرطي على مستوى المكوّن</h3>
<p>للتحكّم الأدقّ، يمكن لمكوّن واعٍ بالأذونات أن يُظهر عناصر الواجهة أو يخفيها أو يعطّلها بناءً على استحقاقات المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Can</span>(<span class="hljs-params">{
  permission,
  children,
  fallback = <span class="hljs-literal">null</span>,
}: {
  permission: <span class="hljs-built_in">string</span>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}</span>) {
  <span class="hljs-keyword">const</span> { permissions } = <span class="hljs-title function_">useAuth</span>();
  <span class="hljs-keyword">return</span> permissions.<span class="hljs-title function_">includes</span>(permission) ? children : fallback;
}

<span class="hljs-comment">// Usage</span>
&lt;<span class="hljs-title class_">Can</span>
  permission=<span class="hljs-string">&quot;project.delete&quot;</span>
  fallback={
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tooltip</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;You don&#x27;t have permission to delete projects&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">disabled</span>&gt;</span>Delete Project<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Tooltip</span>&gt;</span></span>
  }
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleDelete}</span>&gt;</span>Delete Project<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">Can</span>&gt;;
</code></pre>
<p><em>ملاحظة:</em> تأتي <code>permissions</code> من «ملف تعريف الواجهة» في الخادم — وهو قائمة بالإجراءات المسموح بها تُحسَب عند تسجيل الدخول.</p>
<h3 id="مزامنة-منطق-الواجهة-الأمامية-والخادم">مزامنة منطق الواجهة الأمامية والخادم</h3>
<p>أكبر صداع في الصيانة هو إبقاء منطق التخويل متزامنًا بين الواجهة الأمامية والخادم دون تكراره. وأكثر الاستراتيجيات فعّالية أن يحسب الخادم <strong>ملف تعريف واجهة (UI profile)</strong> — مجموعة الإجراءات المسموح بها — عند مصادقة المستخدم، ويضمّنه في حالة الجلسة أو كاستجابة API مخصّصة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Backend computes the UI profile</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserProfile</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">tenantId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">UIProfile</span>&gt; {
  <span class="hljs-keyword">const</span> policies = <span class="hljs-keyword">await</span> policyEngine.<span class="hljs-title function_">evaluate</span>({
    <span class="hljs-attr">user</span>: userId,
    <span class="hljs-attr">tenant</span>: tenantId,
  });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">permissions</span>: policies.<span class="hljs-property">allowedActions</span>,
    <span class="hljs-attr">featureFlags</span>: policies.<span class="hljs-property">enabledFeatures</span>,
    <span class="hljs-attr">uiHints</span>: {
      <span class="hljs-attr">canDeleteProjects</span>: policies.<span class="hljs-property">allowedActions</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;project.delete&#x27;</span>),
      <span class="hljs-attr">canInviteMembers</span>: policies.<span class="hljs-property">allowedActions</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;member.invite&#x27;</span>),
      <span class="hljs-attr">maxUploadSizeMb</span>: policies.<span class="hljs-property">limits</span>.<span class="hljs-property">uploadSize</span>,
    },
  };
}
</code></pre>
<p><em>ملاحظة:</em> تستهلك الواجهة الأمامية هذا الملف، ويفرض الخادم السياسات نفسها في كل طلب API.</p>
<p>تستهلك الواجهة الأمامية هذا الملف لتصيير الواجهة. ويواصل الخادم فرض السياسات نفسها في كل طلب API. ويمنع هذا النهج «مصدر الحقيقة الواحد» الانحراف البطيء حيث تظنّ الواجهة الأمامية أن شيئًا ما مسموح بينما يخالفها الخادم.</p>
<h3 id="إظهار-أم-إخفاء-أم-تعطيل">إظهار أم إخفاء أم تعطيل؟</h3>
<p>حين تنقص المستخدم صلاحية إجراء ما، أمامك ثلاثة خيارات:</p>
<ul>
<li><strong>إخفاء العنصر كليًا</strong>: واجهة نظيفة، وحمل معرفي أقل، لكن المستخدم قد لا يعلم بوجود الميزة. الأفضل حين تكون الميزة خارج دور المستخدم بالكامل.</li>
<li><strong>تعطيل العنصر مع شرح</strong>: يشير إلى أن الميزة موجودة لكنها غير متاحة. الأفضل حين تكون الميزة متاحة في طبقة اشتراك أعلى أو حين لا يتحقق شرط معيّن. ولا غنى عن تلميح أو نص مجاور يشرح <em>سبب</em> التعطيل — فزر رمادي بلا شرح محيّر فقط.</li>
<li><strong>الإظهار والمنع عند التفاعل</strong>: السماح بالنقر ثم عرض خطأ. هذا خيار خاطئ دائمًا تقريبًا للتخويل (وهو مناسب للتحقّق من الصحة)، لأنه يهدر وقت المستخدم ويخلق إحباطًا.</li>
</ul>
<p>من منظور إمكانية الوصول، تحتاج العناصر المعطّلة إلى عناية. فقارئات الشاشة كثيرة تتخطّى أزرار <code>disabled</code> كليًا، لذا قد لا يعلم مستخدمو التقنيات المساعدة بوجود الميزة إطلاقًا. وقرن عنصر تحكّم معطّل بنص توضيحي مرئي أو مرجع <code>aria-describedby</code> يضمن توفّر السياق للجميع.</p>
<h2 id="المصادقة-في-معماريات-الواجهات-الأمامية-المصغرة">المصادقة في معماريات الواجهات الأمامية المصغّرة</h2>
<p>حين يتفكّك تطبيق إلى واجهات أمامية مصغّرة منشورة باستقلال، تصبح المصادقة مسؤولية مشتركة بين غلاف التطبيق والوحدات البعيدة. والخطأ في هذا يعني حالة مصادقة مكرّرة، وحالات تسابق أثناء تحديث الرمز، ومسارات خروج تترك جلسات يتيمة في وحدات فردية.</p>
<h3 id="الغلاف-يملك-المصادقة">الغلاف يملك المصادقة</h3>
<p>النمط الموصى به هو <strong>المصادقة على مستوى الغلاف</strong>:</p>
<pre><code>graph TD
    Shell[&quot;Application Shell&lt;br/&gt;(Auth Owner)&quot;]
    BFF[&quot;BFF / Auth Server&quot;]
    MFE1[&quot;MFE: Dashboard&quot;]
    MFE2[&quot;MFE: Settings&quot;]
    MFE3[&quot;MFE: Billing&quot;]

    Shell &lt;--&gt;|&quot;Session cookie ↔ Tokens&quot;| BFF
    Shell --&gt;|&quot;Auth context&lt;br/&gt;(user, permissions)&quot;| MFE1
    Shell --&gt;|&quot;Auth context&lt;br/&gt;(user, permissions)&quot;| MFE2
    Shell --&gt;|&quot;Auth context&lt;br/&gt;(user, permissions)&quot;| MFE3
</code></pre>
<p>يتولّى الغلاف كل مسارات المصادقة: تسجيل الدخول، وتسجيل الخروج، وتحديث الرمز. ويكشف هوية المستخدم المُصادَق وأذوناته للواجهات المصغّرة المحمّلة عبر آلية سياق مشتركة. ولا تُهيّئ أي واجهة مصغّرة فردية مسارات مصادقتها الخاصة ولا تخزّن رموزها.</p>
<p>يوفّر هذا مصدر حقيقة واحد لحالة المصادقة، ويمنع تكرار الرموز عبر الوحدات، ويمركز منطق تحديث الرمز (فيتجنّب حالات التسابق حيث تحاول وحدات عدة التحديث في الوقت نفسه)، ويضمن أن يُبطل تسجيل الخروج كل شيء دفعة واحدة.</p>
<h3 id="توزيع-حالة-المصادقة-على-الواجهات-المصغرة">توزيع حالة المصادقة على الواجهات المصغّرة</h3>
<p>توجد آليات عدة لمشاركة حالة المصادقة عبر حدود الوحدات:</p>
<ul>
<li><strong>React Context</strong>: <code>&lt;AuthProvider&gt;</code> في الغلاف يغلّف التطبيق كله ويوفّر خُطّاف <code>useAuth()</code> يمكن لأي واجهة مصغّرة استدعاؤه. يعمل هذا جيدًا حين تكون كل الوحدات React، لكنه ينهار في بيئة متعددة الأطر.</li>
<li><strong>ناقل أحداث (Event bus)</strong>: تشترك الواجهات المصغّرة في أحداث تغيّر المصادقة (<code>user:authenticated</code>، <code>user:logout</code>، <code>permissions:updated</code>). محايد إطار العمل ويعمل عبر أي نموذج تركيب.</li>
<li><strong>عام يُحقنه الغلاف</strong>: يضبط الغلاف كائنًا عامًّا أو يستخدم النطاق المشترك في Module Federation لتوفير حالة المصادقة. بسيط لكنه يتطلب انضباطًا لتجنّب القراءات القديمة.</li>
<li><strong>API خلفية</strong>: تستدعي كل وحدة باستقلال <code>/api/auth/me</code> للحصول على المستخدم الحالي. ويخزّن الـ BFF الاستجابة مؤقتًا لتفادي رحلات ذهاب وإياب زائدة. هذا أكثر الخيارات فصلًا لكنه يُدخل كمونًا.</li>
</ul>
<h3 id="حدود-التخويل-عبر-الوحدات">حدود التخويل عبر الوحدات</h3>
<p>ينبغي لكل واجهة مصغّرة أن تفحص الأذونات قبل تصيير واجهة محمية، باستخدام سياق المصادقة المشترك من الغلاف. لكن — وهذا ما تنساه الفرق — يجب أن تتحقّق واجهات API الخلفية خلف كل وحدة من الأذونات <em>أيضًا</em>. ففحص الواجهة الأمامية تحسين لتجربة المستخدم؛ وفحص الخادم هو الحدّ الأمني.</p>
<p>يجمع الغلاف عادةً كل الأذونات المتاحة من الخادم ويشاركها، تاركًا لكل وحدة اتخاذ قرارات الظهور المحلية. يُبقي هذا منطق جلب الأذونات في مكان واحد بدل أن تستعلم كل وحدة عن محرّك السياسات باستقلال.</p>
<h2 id="تعدد-المستأجرين-في-الواجهة-الأمامية">تعدّد المستأجرين في الواجهة الأمامية</h2>
<p>تعدّد المستأجرين — خدمة عملاء متعددين من نسخة تطبيق واحدة — هو الأساس المعماري لبرمجيات B2B كخدمة. وبالنسبة إلى الواجهة الأمامية، فهو يُدخل تعقيدًا في التوجيه والهوية البصرية وعزل البيانات والتخزين المؤقت.</p>
<h3 id="تحديد-المستأجر">تحديد المستأجر</h3>
<p>تحتاج الواجهة الأمامية إلى معرفة سياق المستأجر الذي يعمل فيه المستخدم الحالي. ويحدث هذا التحديد عادةً في طبقة التوجيه ويتبع أحد ثلاثة أنماط:</p>
<pre><code>graph TD
    subgraph &quot;Subdomain&quot;
        URL1[&quot;acme.app.com&quot;]
        URL1 --&gt; Resolve1[&quot;Tenant: acme&quot;]
    end

    subgraph &quot;Path&quot;
        URL2[&quot;app.com/t/acme&quot;]
        URL2 --&gt; Resolve2[&quot;Tenant: acme&quot;]
    end

    subgraph &quot;Identity-first&quot;
        URL3[&quot;app.com&quot;]
        URL3 --&gt; Login[&quot;Login / Org picker&quot;]
        Login --&gt; Resolve3[&quot;Tenant: acme&quot;]
    end
</code></pre>
<p><strong>نطاق فرعي لكل مستأجر</strong> (<code>acme.app.com</code>) يمنح أقوى إحساس بملكية المستأجر ويسمح بشهادات SSL وتهيئات CDN خاصة بالمستأجر. وهو يتطلب أيضًا إدارة DNS بنطاق شامل ويُعقّد تدوير الشهادات.</p>
<p><strong>مسار لكل مستأجر</strong> (<code>app.com/t/acme</code>) أبسط في الإدارة بشهادة SSL واحدة لكنه قد يؤدي إلى توليد معقّد للعناوين النسبية. وإن لم تكن ملفات تعريف ارتباط الجلسة محدّدة النطاق بشكل سليم، يوجد خطر تسرّب الجلسة عبر المسارات.</p>
<p><strong>الهوية أولًا / نطاق واحد</strong> (<code>app.com</code>) يحدّد المستأجر من بيانات اعتماد تسجيل دخول المستخدم أو من مُنتقي مؤسسة. وهذا شائع في تطبيقات مثل Slack حيث ينتمي المستخدم إلى مساحات عمل متعددة. يغطّي [دليل WorkOS للمعمارية متعددة المستأجرين][11] الأنماط الثلاثة ومقايضاتها.</p>
<table>
<thead>
<tr>
<th>النمط</th>
<th>قوة الهوية البصرية</th>
<th>تعقيد الإدارة</th>
<th>عزل الجلسات</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>النطاق الفرعي</strong></td>
<td>مرتفعة</td>
<td>مرتفع (DNS، الشهادات)</td>
<td>قوي (الأصل)</td>
</tr>
<tr>
<td><strong>قائم على المسار</strong></td>
<td>منخفضة</td>
<td>منخفض</td>
<td>يتطلب عناية</td>
</tr>
<tr>
<td><strong>نطاق واحد</strong></td>
<td>متوسطة</td>
<td>منخفض</td>
<td>يتطلب عناية</td>
</tr>
</tbody>
</table>
<h3 id="السمات-الواعية-بالمستأجر">السمات الواعية بالمستأجر</h3>
<p>يتوقّع عملاء المؤسسات أن يطابق التطبيق هويتهم البصرية للشركة. وأكثر التنفيذات فعّالية يستخدم خصائص CSS مخصّصة تُحقَن وقت التشغيل من تهيئة المستأجر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">applyTenantTheme</span>(<span class="hljs-params"><span class="hljs-attr">tenantId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> config = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/tenants/<span class="hljs-subst">\${tenantId}</span>/theme\`</span>);
  <span class="hljs-keyword">const</span> theme = <span class="hljs-keyword">await</span> config.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">const</span> root = <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>;

  root.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--tenant-primary-color&#x27;</span>, theme.<span class="hljs-property">primaryColor</span>);
  root.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--tenant-accent-color&#x27;</span>, theme.<span class="hljs-property">accentColor</span>);
  root.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--tenant-heading-font&#x27;</span>, theme.<span class="hljs-property">headingFont</span>);
  root.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--tenant-logo-url&#x27;</span>, <span class="hljs-string">\`url(<span class="hljs-subst">\${theme.logoUrl}</span>)\`</span>);
}
</code></pre>
<p><em>ملاحظة:</em> قاعدة شيفرة واحدة، وهويات بصرية كثيرة. دون حاجة إلى عمليات بناء خاصة بالمستأجر.</p>
<pre><code class="language-css"><span class="hljs-selector-class">.navbar</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--tenant-primary-color);
  <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--tenant-heading-font);
}

<span class="hljs-selector-class">.logo</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">var</span>(--tenant-logo-url);
}
</code></pre>
<p>يتعامل هذا النهج مع السمة كحالة وقت تشغيل لا كتهيئة وقت بناء. فحزمة بناء واحدة تخدم كل مستأجر، والتخصيص البصري مجرد استجابة API أخرى.</p>
<h3 id="عزل-البيانات-في-الواجهة-الأمامية">عزل البيانات في الواجهة الأمامية</h3>
<p>يُفرض عزل البيانات أساسًا في الخادم — عبر أمن مستوى الصفوف (Row-Level Security)، أو مخططات قواعد بيانات منفصلة، أو قواعد بيانات منفصلة لكل مستأجر. ومهمة الواجهة الأمامية ألا تقوّض ذلك العزل عن غير قصد.</p>
<p>والهموم العملية:</p>
<ul>
<li><strong>يجب أن يتضمّن كل طلب API سياق المستأجر</strong>. وهذا عادةً ادّعاء <code>tenant_id</code> في JWT أو ترويسة مستمدّة من الجلسة. وإن خرج طلب دون سياق مستأجر، ينبغي أن يرفضه الخادم بدل التخمين.</li>
<li><strong>امسح الحالة عند تبديل المستأجر</strong>. حين ينتقل مستخدم بين مؤسسات (في نموذج الهوية أولًا)، يجب أن تُفرِغ الواجهة الأمامية كل البيانات المخزّنة مؤقتًا، وتمسح أي إدارة حالة في الذاكرة (Redux، Zustand، أيًّا كان)، وتعيد جلب كل شيء في سياق المستأجر الجديد. وتسرّب بيانات قديمة من مستأجر سابق إلى العرض الحالي فشل في عزل البيانات.</li>
<li><strong>حدّد مفاتيح الذاكرة المؤقتة حسب المستأجر</strong>. يجب أن يضمّ أي تخزين مؤقت من جهة العميل (React Query، SWR، عامل الخدمة) معرّف المستأجر في مفتاح الذاكرة المؤقتة. فإصابة ذاكرة مؤقتة لـ <code>projects:list</code> تعيد مشاريع المستأجر ألف حين يكون المستأجر باء نشطًا هي نوع العلة الذي يستحق قناة Slack مخصّصة.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Tenant-scoped cache key pattern</span>
<span class="hljs-keyword">function</span> useTenantQuery&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> { tenantId } = <span class="hljs-title function_">useTenant</span>();
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useQuery</span>({
    <span class="hljs-attr">queryKey</span>: [tenantId, key],
    <span class="hljs-attr">queryFn</span>: fetcher,
  });
}
</code></pre>
<p><em>ملاحظة:</em> معرّف المستأجر جزء من مفتاح الذاكرة المؤقتة. لا إصابات عابرة للمستأجرين.</p>
<h3 id="استراتيجيات-التخزين-المؤقت-وcdn">استراتيجيات التخزين المؤقت وCDN</h3>
<p>يتطلب التخزين المؤقت في بيئة متعددة المستأجرين موازنة الأداء بالعزل. والقواعد مباشرة بمجرد تصنيف الأصول:</p>
<table>
<thead>
<tr>
<th>نوع الأصل</th>
<th>استراتيجية التخزين المؤقت</th>
<th>TTL</th>
<th>العزل</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>حزمة التطبيق</strong></td>
<td>ذاكرة مؤقتة عامة (مُجزَّأة)</td>
<td>طويل (سنة واحدة)</td>
<td>مشترك</td>
</tr>
<tr>
<td><strong>تهيئة المستأجر</strong></td>
<td>ذاكرة مؤقتة خاصة بالمستأجر</td>
<td>قصير (1–5 دقائق)</td>
<td>لكل مستأجر</td>
</tr>
<tr>
<td><strong>بيانات المستخدم</strong></td>
<td>بلا تخزين مؤقت (<code>private</code>)</td>
<td>لا ينطبق</td>
<td>لكل مستخدم</td>
</tr>
<tr>
<td><strong>التسويق العام</strong></td>
<td>ذاكرة مؤقتة عامة</td>
<td>متوسط (يوم واحد)</td>
<td>مشترك</td>
</tr>
</tbody>
</table>
<p>الأصول الثابتة مثل حزم JavaScript وCSS والخطوط مشتركة عبر كل المستأجرين ويمكن تخزينها مؤقتًا بقوة بأسماء ملفات مُجزَّأة بالمحتوى. أما الأصول الخاصة بالمستأجر (الشعارات المرفوعة، الأنماط المخصّصة) فينبغي عزلها ببادئة مسار (<code>cdn.app.com/assets/{tenant-id}/logo.png</code>) وتخزينها مؤقتًا باستقلال. ويجب أن تستخدم بيانات المستخدم واستجابات API المُصادَقة <code>Cache-Control: private, no-store</code>.</p>
<p>بالنسبة إلى التوجيه القائم على النطاقات الفرعية، يجزّئ اسم المضيف ذاكرة CDN المؤقتة طبيعيًا. أما في التوجيه القائم على المسار أو نطاق واحد، فيجب تهيئة CDN لتضمين معرّف المستأجر في مفتاح الذاكرة المؤقتة — وإلا فقد تُقدَّم لوحة معلومات المستأجر ألف من الذاكرة المؤقتة إلى المستأجر باء.</p>
<h2 id="الملكية-التنظيمية">الملكية التنظيمية</h2>
<p>من <em>يملك</em> المصادقة في مؤسسة كبيرة؟ هذا سؤال تنظيمي أكثر منه تقنيًا، لكن الخطأ فيه يخلق احتكاكًا لا يصلحه أي قدر من المعمار الجيد.</p>
<p>عمليًا، تتقاسم ثلاث مجموعات المسؤولية:</p>
<ul>
<li><strong>فريق الهوية</strong> يملك مزوّد الهوية الأساسي (Entra ID، Okta، Auth0)، وبروتوكولات الاتحاد، وسياسات MFA، ودورة حياة بيانات الاعتماد. وهمّه الأمن والامتثال.</li>
<li><strong>فريق المنصة</strong> يملك طبقة الـ BFF، وبوابة API، والتوجيه متعدد المستأجرين، وتهيئة CDN. ويوفّر البنية التحتية التي تجعل المصادقة تعمل عند حدّ التطبيق.</li>
<li><strong>فرق الواجهة الأمامية والمنتج</strong> تملك تجلّي المصادقة في الواجهة: حرّاس المسارات، والتصيير الشرطي، وسمات المستأجر، ومبدّلات المؤسسات. وهدفها استهلاك حالة المصادقة التي يوفّرها فريقا الهوية والمنصة، لا إعادة اختراعها.</li>
</ul>
<p>النموذج الذي ينجح هو <strong>الفرض المفصول</strong>: يوفّر فريق الهوية الرمز، ويوفّر فريق المنصة نقطة الفرض (BFF، البوابة)، وتستهلك الواجهة الأمامية الحالة الناتجة. ويعيش منطق التخويل في محرّك سياسات يُدار مركزيًا لكن تستهلكه فرق المنتج عبر مكتبات مشتركة. ويلتحق المطوّرون بالمصادقة عبر حِزم SDK وواجهات API موثّقة بدل تنفيذ مسارات OAuth من الصفر لكل خدمة جديدة.</p>
<p>المؤسسات التي تتعامل مع إدارة الهوية كخدمة منصة — لا كمشكلة لكل فريق يحلّها باستقلال وبطريقة مختلفة قليلًا — هي التي تعمل فيها المصادقة فعلًا على نطاق واسع.</p>
<p>[7]: <a href="https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/">https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/</a> ‘Zanzibar: Google’s Consistent, Global Authorization System’</p>
<p>[11]: <a href="https://workos.com/blog/developers-guide-saas-multi-tenant-architecture">https://workos.com/blog/developers-guide-saas-multi-tenant-architecture</a> ‘The developer’s guide to SaaS multi-tenant architecture | WorkOS’</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="المصادقة-في-الواجهات-الأمامية-الموزعة">المصادقة في الواجهات الأمامية الموزّعة</h3>
<blockquote>
<p>أكثر هَمّ عابر للجوانب صعوبة.</p>
</blockquote>
<ul>
<li>المصادقة: <em>من أنت؟</em> (OIDC، SAML، OAuth 2.0)</li>
<li>التخويل: <em>ماذا يمكنك أن تفعل؟</em> (RBAC، ABAC، ReBAC)</li>
</ul>
<p><strong>تحدّي الواجهات الأمامية المصغّرة:</strong></p>
<ul>
<li>تطبيقات متعددة منشورة باستقلال تحتاج مشاركة جلسة واحدة.</li>
<li>قد تحتاج كل وحدة بعيدة فحوص أذونات مختلفة.</li>
<li>يجب تنسيق تحديث الرمز — فإن حدّثت وحدة بعيدة، ينبغي ألا تُطلق الأخريات تحديثًا ثانيًا.</li>
</ul>
<hr>
<h3 id="نمط-رموز-bff">نمط رموز BFF</h3>
<blockquote>
<p>تبقى الرموز من جهة الخادم. ويحصل المتصفح على ملف تعريف ارتباط جلسة.</p>
</blockquote>
<pre><code>Browser ←→ BFF (session cookie, httpOnly)
                ├→ Identity Provider (OIDC)
                ├→ API Gateway (access token)
                └→ Downstream Services (forwarded token)
</code></pre>
<ul>
<li><strong>لا رموز في المتصفح.</strong> لا <code>localStorage</code>، ولا <code>sessionStorage</code>، ولا ملفات تعريف ارتباط يمكن لـ JavaScript الوصول إليها.</li>
<li>يحتفظ الـ BFF برمز الوصول ورمز التحديث من جهة الخادم.</li>
<li>يحصل المتصفح على ملف تعريف ارتباط جلسة <code>httpOnly</code> و<code>Secure</code> و<code>SameSite=Strict</code>.</li>
<li>يمرّ كل نداء API عبر الـ BFF، الذي يرفق الرمز.</li>
</ul>
<p><strong>السبب:</strong> لا يمكن لـ XSS سرقة ما لا تستطيع JavaScript قراءته.</p>
<hr>
<h3 id="نماذج-التخويل-1">نماذج التخويل</h3>
<blockquote>
<p>اختر النموذج الذي يناسب تعقيدك.</p>
</blockquote>
<table>
<thead>
<tr>
<th>النموذج</th>
<th>كيف يعمل</th>
<th>جيد لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>RBAC</strong></td>
<td>مستخدم → دور → صلاحيات</td>
<td>تطبيقات بسيطة، تسلسلات أدوار واضحة</td>
</tr>
<tr>
<td><strong>ABAC</strong></td>
<td>قواعد مبنية على خصائص المستخدم/المورد/البيئة</td>
<td>تعدد المستأجرين، وصول معتمد على السياق</td>
</tr>
<tr>
<td><strong>ReBAC</strong></td>
<td>صلاحيات مبنية على علاقات بين الكيانات</td>
<td>مشاركة المستندات، تسلسلات المؤسسة</td>
</tr>
<tr>
<td><strong>PBAC</strong></td>
<td>محرّك سياسات مركزي (OPA، Cedar) يقيّم القواعد</td>
<td>متطلبات سياسات معقّدة وقابلة للتدقيق</td>
</tr>
</tbody>
</table>
<ul>
<li>إن RBAC نقطة البداية. انتقل إلى ABAC/ReBAC حين لا تكون الأدوار دقيقة بما يكفي.</li>
<li><strong>التخويل في الواجهة الأمامية لأجل تجربة المستخدم، لا للأمن.</strong> أخفِ الأزرار التي لا يستطيع المستخدم استخدامها، لكن افرض على الخادم.</li>
</ul>
<hr>
<h3 id="انتشار-الجلسة-عبر-الوحدات-البعيدة">انتشار الجلسة عبر الوحدات البعيدة</h3>
<blockquote>
<p>تشترك كل الوحدات البعيدة في جلسة واحدة. وإليك كيف.</p>
</blockquote>
<ul>
<li><strong>نشر بأصل واحد:</strong> كل الوحدات البعيدة على النطاق نفسه ← تعمل ملفات تعريف الارتباط طبيعيًا.</li>
<li><strong>نشر بأصول متعددة:</strong> يلزم خدمة مصادقة مشتركة أو مُرحّل رموز.</li>
</ul>
<p><strong>الأنماط:</strong></p>
<ol>
<li><strong>ملف تعريف ارتباط مشترك</strong> — النطاق نفسه، الـ BFF يضبط ملف تعريف الارتباط، وكل الوحدات البعيدة ترثه.</li>
<li><strong>مزوّد سياق المصادقة</strong> — يصادق التطبيق المضيف ويمرّر الجلسة إلى الوحدات البعيدة عبر الخصائص أو مخزن مشترك.</li>
<li><strong>مُرحّل PostMessage</strong> — وحدات بعيدة قائمة على iframe تتواصل بحالة المصادقة عبر <code>window.postMessage</code>.</li>
</ol>
<p><strong>تنسيق تحديث الرموز:</strong> استخدم قفل تحديث واحد (مثل BroadcastChannel) حتى لا تتسابق وحدات بعيدة عدة لتحديث الرمز نفسه.</p>
`,l={book:n,chapter:s,chapterTitle:t,slug:e,title:a,headings:o,html:p};export{n as book,s as chapter,t as chapterTitle,l as default,o as headings,p as html,e as slug,a as title};
