const s="kinney",p="aws",a="نشر تطبيقات الويب على AWS",n="api-gateway-authentication",t="المصادقة باستخدام API Gateway",e=[{depth:2,id:"مفوضات-jwt-المسار-السريع",text:"مُفوِّضات JWT: المسار السريع"},{depth:3,id:"إنشاء-مفوض-jwt",text:"إنشاء مُفوِّض JWT"},{depth:3,id:"استخدام-أي-مزود-oidc",text:"استخدام أي مزوّد OIDC"},{depth:3,id:"إرفاق-المفوض-بمسار",text:"إرفاق المُفوِّض بمسار"},{depth:3,id:"ما-يستقبله-المعالج-لديك",text:"ما يستقبله المعالج لديك"},{depth:2,id:"مفوضات-lambda-منطق-مخصص",text:"مُفوِّضات Lambda: منطق مخصّص"},{depth:3,id:"إنشاء-مفوض-lambda",text:"إنشاء مُفوِّض Lambda"},{depth:3,id:"الإرفاق-بمسار",text:"الإرفاق بمسار"},{depth:2,id:"مفوضات-jwt-مقابل-مفوضات-lambda",text:"مُفوِّضات JWT مقابل مُفوِّضات Lambda"},{depth:2,id:"ترك-المسارات-بلا-حماية",text:"ترك المسارات بلا حماية"},{depth:2,id:"استدعاء-واجهة-برمجية-محمية-من-واجهتك-الأمامية",text:"استدعاء واجهة برمجية محمية من واجهتك الأمامية"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],o=`<p>واجهتك البرمجية منشورة، وCORS مُهيّأ، وواجهتك الأمامية تستطيع استدعاءها. لكن في هذه اللحظة، أي شخص يملك الرابط يستطيع استدعاء أي نقطة نهاية. لا شيء يمنع سكربتًا عشوائيًا من قصف <code>POST /items</code> ببيانات لا معنى لها. أنت بحاجة إلى المصادقة—وهي طريقة للتحقق من أن الشخص الذي يرسل الطلب هو بالفعل من يدّعي أنه هو، ومن أنه مسموح له بفعل ما يطلبه.</p>
<p>إن أردت الاطلاع على نسخة AWS الدقيقة من نموذج المصادقة أثناء قراءتك، فإن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html">دليل مُفوِّض JWT لواجهات HTTP البرمجية</a> هو المرجع الرسمي.</p>
<p>يدعم API Gateway نوعين من المُفوِّضات لواجهات HTTP البرمجية: <strong>مُفوِّضات JWT</strong> و<strong>مُفوِّضات Lambda</strong>. تتولى مُفوِّضات JWT الحالة الشائعة—التحقق من الرموز الصادرة من Cognito أو Auth0 أو أي مزوّد OIDC. وتتولى مُفوِّضات Lambda كل ما عدا ذلك.</p>
<blockquote>
<p><strong>يفترض هذا الدرس وجود مصدر للرمز</strong></p>
<p>لا تتناول هذه الدورة إعداد مزوّد الهوية نفسه—فـCognito موجود في <a href="https://stevekinney.com/courses/aws/whats-next-services-youll-eventually-need">ما التالي</a>، أما Auth0 وClerk فهما خارج نطاق AWS. كل ما يلي يفترض أن لديك بالفعل JWT قادمًا من <em>مكان ما</em>: رمز اختبار صادر مسبقًا، أو Cognito User Pool، أو مستأجر Auth0. إن أردت مسارًا سريعًا للحصول على رمز حقيقي لهذا الدرس، فأنشئ مستأجر Auth0 مجانيًا واستخدم تطبيق «Machine-to-Machine» لديهم لإصدار الرموز—فهذا يمنحك شيئًا ملموسًا توجّه إليه المُفوِّض. وفي الإنتاج، على الأرجح ستنتهي إلى Cognito أو مزوّد خارجي. أما <em>تهيئة المُفوِّض</em> أدناه فهي متطابقة بغض النظر عن الجهة التي تصدر الرمز.</p>
</blockquote>
<pre><code>flowchart LR
    Request[&quot;Incoming API request&quot;] --&gt; Choice{&quot;Authorization type&quot;}
    Choice -- &quot;JWT authorizer&quot; --&gt; JWT[&quot;Validate issuer, audience, signature&quot;]
    Choice -- &quot;Lambda authorizer&quot; --&gt; Custom[&quot;Run custom authorizer Lambda&quot;]
    JWT --&gt; Allowed{&quot;Authorized?&quot;}
    Custom --&gt; Allowed
    Allowed -- &quot;No&quot; --&gt; Reject[&quot;401 or 403 response&quot;]
    Allowed -- &quot;Yes&quot; --&gt; Route[&quot;Matched API Gateway route&quot;]
    Route --&gt; Handler[&quot;Backend Lambda handler&quot;]
</code></pre>
<h2 id="مفوضات-jwt-المسار-السريع">مُفوِّضات JWT: المسار السريع</h2>
<p><strong>مُفوِّض JWT</strong> يتحقق من رموز JSON Web Tokens في الطلبات الواردة. أنت تخبر API Gateway بمكان العثور على الرمز (عادةً ترويسة <code>Authorization</code>)، ومن أصدره (رابط مزوّد OIDC)، وأي جمهور يقبل. يتحقق API Gateway من توقيع الرمز وانتهاء صلاحيته ومُصدره وجمهوره قبل أن تعمل دالة Lambda الخاصة بك. وإذا كان الرمز غير صالح، فإن الطلب يحصل على 401—ولا تُنفَّذ شيفرة المعالج لديك إطلاقًا.</p>
<p>هذا هو الشيء نفسه الذي يحدث عندما تستخدم وسيطًا مثل <code>next-auth</code> أو دالة حافة على Vercel للتحقق من الرموز، إلا أن API Gateway يفعل ذلك على مستوى البنية التحتية.</p>
<h3 id="إنشاء-مفوض-jwt">إنشاء مُفوِّض JWT</h3>
<p>إليك كيفية إنشاء مُفوِّض JWT يتحقق من الرموز الصادرة من مجمّع مستخدمي Amazon Cognito:</p>
<pre><code class="language-bash">aws apigatewayv2 create-authorizer \\
  --api-id abc123def4 \\
  --authorizer-type JWT \\
  --name cognito-authorizer \\
  --identity-source <span class="hljs-string">&#x27;$request.header.Authorization&#x27;</span> \\
  --jwt-configuration \\
    Issuer=<span class="hljs-string">&quot;https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AbCdEfGhI&quot;</span>,Audience=<span class="hljs-string">&quot;1a2b3c4d5e6f7g8h9i0j&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AuthorizerId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;auth123&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;AuthorizerType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;JWT&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IdentitySource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$request.header.Authorization&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;JwtConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Audience&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;1a2b3c4d5e6f7g8h9i0j&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Issuer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AbCdEfGhI&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cognito-authorizer&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>المعاملات الأساسية:</p>
<ul>
<li><strong><code>--authorizer-type JWT</code></strong>—يخبر API Gateway أن يتحقق من الرمز بوصفه JWT.</li>
<li><strong><code>--identity-source '$request.header.Authorization'</code></strong>—مكان العثور على الرمز. يقبل مُفوِّض JWT الخاص بواجهات HTTP البرمجية في API Gateway ترويسة <code>Authorization</code> تحتوي إما على رمز مجرّد أو على رمز مسبوق بـ <code>Bearer</code>—ولست بحاجة إلى إزالة البادئة بنفسك. يستخرج المُفوِّض الرمز من مصدر الهوية ويتحقق من JWT مباشرة؛ ويستقبل خادمك الخلفي المطالبات المفكوكة، لا سلسلة الترويسة الخام.</li>
<li><strong><code>--jwt-configuration Issuer</code></strong>—رابط المُصدر. بالنسبة إلى Cognito فهو <code>https://cognito-idp.{region}.amazonaws.com/{userPoolId}</code>. وبالنسبة إلى Auth0 فهو <code>https://{your-domain}.auth0.com/</code>. ويجب أن يطابق المُصدر مطالبة <code>iss</code> في JWT.</li>
<li><strong><code>--jwt-configuration Audience</code></strong>—الجمهور المتوقع. بالنسبة إلى Cognito فهو معرّف عميل التطبيق. وبالنسبة إلى Auth0 فهو معرّف الواجهة البرمجية. ويجب أن يطابق الجمهور مطالبة <code>aud</code> في JWT.</li>
</ul>
<h3 id="استخدام-أي-مزود-oidc">استخدام أي مزوّد OIDC</h3>
<p>تعمل مُفوِّضات JWT مع أي مزوّد يصدر رموز JWT ويكشف نقطة نهاية JSON Web Key Set (JWKS). ويشمل ذلك:</p>
<ul>
<li><strong>Amazon Cognito</strong>—خدمة الهوية المدمجة في AWS</li>
<li><strong>Auth0</strong>—مزوّد مصادقة خارجي شائع</li>
<li><strong>Okta</strong>—مزوّد هوية للمؤسسات</li>
<li><strong>Firebase Auth</strong>—خدمة المصادقة من Google</li>
<li><strong>أي مزوّد متوافق مع OIDC</strong>—أي شيء ينشر نقطة نهاية <code>.well-known/openid-configuration</code></li>
</ul>
<p>يجلب API Gateway مجموعة JWKS الخاصة بالمزوّد (المفاتيح العامة المستخدمة لتوقيع الرموز) من نقطة نهاية <code>/.well-known/openid-configuration</code> الخاصة بالمُصدر، ويستخدمها للتحقق من توقيعات الرموز. لا تحتاج إلى إدارة المفاتيح بنفسك.</p>
<p>إليك الأمر نفسه لرمز صادر من Auth0:</p>
<pre><code class="language-bash">aws apigatewayv2 create-authorizer \\
  --api-id abc123def4 \\
  --authorizer-type JWT \\
  --name auth0-authorizer \\
  --identity-source <span class="hljs-string">&#x27;$request.header.Authorization&#x27;</span> \\
  --jwt-configuration \\
    Issuer=<span class="hljs-string">&quot;https://my-app.us.auth0.com/&quot;</span>,Audience=<span class="hljs-string">&quot;https://api.example.com&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يجب أن يتضمن رابط المُصدر الخاص بـ Auth0 الشرطة المائلة في آخره. أما روابط مُصدر Cognito فلا تتضمن شرطة مائلة في آخرها. وهذا مصدر شائع لأخطاء 401—إذ يجب أن يطابق المُصدر الموجود في الرمز المُصدر الذي تهيّئه على المُفوِّض تمامًا.</p>
</blockquote>
<h3 id="إرفاق-المفوض-بمسار">إرفاق المُفوِّض بمسار</h3>
<p>إنشاء مُفوِّض لا يحمي أي مسار بحد ذاته. تحتاج إلى إرفاقه بمسارات محددة باستخدام <code>update-route</code>:</p>
<pre><code class="language-bash">aws apigatewayv2 update-route \\
  --api-id abc123def4 \\
  --route-id xyz789 \\
  --authorization-type JWT \\
  --authorizer-id auth123 \\
  --authorization-scopes <span class="hljs-string">&quot;items:read&quot;</span> <span class="hljs-string">&quot;items:write&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المعامل <code>--authorization-scopes</code> اختياري. وإذا حُدِّد، يتحقق API Gateway من أن مطالبة <code>scope</code> في الرمز تحتوي على واحد على الأقل من النطاقات المدرجة. وهذا يتيح لك إنشاء أذونات دقيقة: فقد يتطلب مسار <code>GET /items</code> النطاق <code>items:read</code>، بينما يتطلب <code>POST /items</code> النطاق <code>items:write</code>. وأجد أن هذه إحدى تلك الميزات التي لا تحتاجها حتى تحتاجها <em>حقًا</em>.</p>
<p>يمكنك العثور على معرّف المسار بسرد المسارات:</p>
<pre><code class="language-bash">aws apigatewayv2 get-routes \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="ما-يستقبله-المعالج-لديك">ما يستقبله المعالج لديك</h3>
<p>عندما يوافق مُفوِّض JWT على طلب، تصبح مطالبات الرمز المفكوكة متاحة في المعالج لديك عند <code>event.requestContext.authorizer.jwt.claims</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> claims = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">authorizer</span>?.<span class="hljs-property">jwt</span>?.<span class="hljs-property">claims</span>;
  <span class="hljs-keyword">const</span> userId = claims?.<span class="hljs-property">sub</span>;

  <span class="hljs-keyword">if</span> (!userId) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">401</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Unauthorized&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">\`Hello, user <span class="hljs-subst">\${userId}</span>\`</span> }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> مطالبة <code>sub</code> هي المعرّف الفريد للمستخدم في معظم مزوّدي OIDC.</p>
<p>يتضمن كائن المطالبات كل شيء في حِمل JWT: <code>sub</code> (الموضوع/معرّف المستخدم)، و<code>email</code>، و<code>iss</code> (المُصدر)، و<code>exp</code> (الانتهاء)، والمطالبات المخصّصة، وأي شيء آخر يضمّنه مزوّد الهوية.</p>
<h2 id="مفوضات-lambda-منطق-مخصص">مُفوِّضات Lambda: منطق مخصّص</h2>
<p><strong>مُفوِّضات Lambda</strong> تشغّل دالة Lambda لتقرير ما إذا كان الطلب مسموحًا به. وهي أكثر مرونة من مُفوِّضات JWT—يمكنك التحقق من رموز صادرة من مزوّدين غير قياسيين، أو فحص ترويسات مخصّصة، أو البحث عن مفاتيح API في قاعدة بيانات، أو تنفيذ أي منطق مصادقة تحتاجه.</p>
<h3 id="إنشاء-مفوض-lambda">إنشاء مُفوِّض Lambda</h3>
<p>أولًا، اكتب دالة المُفوِّض. هذه دالة Lambda منفصلة عن معالج واجهتك البرمجية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayRequestSimpleAuthorizerHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayRequestSimpleAuthorizerHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> token = event.<span class="hljs-property">headers</span>?.<span class="hljs-property">authorization</span>;

  <span class="hljs-keyword">if</span> (!token) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">isAuthorized</span>: <span class="hljs-literal">false</span>,
    };
  }

  <span class="hljs-comment">// Your custom validation logic here</span>
  <span class="hljs-comment">// Examples: decode a custom token, check a database, validate an API key</span>
  <span class="hljs-keyword">const</span> isValid = token === <span class="hljs-string">&#x27;Bearer my-secret-api-key&#x27;</span>;

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">isAuthorized</span>: isValid,
    <span class="hljs-attr">context</span>: {
      <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;user-123&#x27;</span>,
      <span class="hljs-attr">plan</span>: <span class="hljs-string">&#x27;premium&#x27;</span>,
    },
  };
};
</code></pre>
<p>يعيد المُفوِّض <code>isAuthorized: true</code> أو <code>isAuthorized: false</code>. وكائن <code>context</code> الاختياري يمرّر بيانات إلى معالج واجهتك البرمجية—إذ تظهر القيم في <code>event.requestContext.authorizer.lambda</code>.</p>
<p>انشر هذه الدالة بشكل منفصل (باستخدام العملية نفسها من <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>)، ثم أنشئ المُفوِّض:</p>
<pre><code class="language-bash">aws apigatewayv2 create-authorizer \\
  --api-id abc123def4 \\
  --authorizer-type REQUEST \\
  --name custom-authorizer \\
  --authorizer-uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:<span class="hljs-keyword">function</span>:my-frontend-app-authorizer/invocations \\
  --authorizer-payload-format-version 2.0 \\
  --identity-source <span class="hljs-string">&#x27;$request.header.Authorization&#x27;</span> \\
  --authorizer-result-ttl-in-seconds 300 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>وامنح API Gateway إذنًا باستدعاء دالة المُفوِّض:</p>
<pre><code class="language-bash">aws lambda add-permission \\
  --function-name my-frontend-app-authorizer \\
  --statement-id apigateway-authorizer \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn <span class="hljs-string">&quot;arn:aws:execute-api:us-east-1:123456789012:abc123def4/authorizers/auth456&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تُحتسب استدعاءات مُفوِّض Lambda كاستدعاءات Lambda إضافية وتترتب عليها تكاليفها الخاصة. ويخزّن المعامل <code>--authorizer-result-ttl-in-seconds</code> نتيجة التفويض مؤقتًا حتى لا يُستدعى المُفوِّض في كل طلب. اضبطه على قيمة معقولة (300 ثانية أي خمس دقائق) لتقليل زمن الاستجابة والتكلفة معًا.</p>
</blockquote>
<h3 id="الإرفاق-بمسار">الإرفاق بمسار</h3>
<pre><code class="language-bash">aws apigatewayv2 update-route \\
  --api-id abc123def4 \\
  --route-id xyz789 \\
  --authorization-type CUSTOM \\
  --authorizer-id auth456 \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="مفوضات-jwt-مقابل-مفوضات-lambda">مُفوِّضات JWT مقابل مُفوِّضات Lambda</h2>
<table>
<thead>
<tr>
<th>الميزة</th>
<th>مُفوِّض JWT</th>
<th>مُفوِّض Lambda</th>
</tr>
</thead>
<tbody>
<tr>
<td>التحقق من الرمز</td>
<td>مدمج (التوقيع، الانتهاء، المطالبات)</td>
<td>شيفرتك</td>
</tr>
<tr>
<td>المزوّدون المدعومون</td>
<td>أي مُصدر OIDC/JWT</td>
<td>أي شيء</td>
</tr>
<tr>
<td>منطق تحقق مخصّص</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>تكلفة Lambda إضافية</td>
<td>لا</td>
<td>نعم (استدعاء إضافي)</td>
</tr>
<tr>
<td>زمن الاستجابة</td>
<td>أقل (بلا بدء بارد لـ Lambda)</td>
<td>أعلى (استدعاء Lambda)</td>
</tr>
<tr>
<td>التخزين المؤقت</td>
<td>مدمج</td>
<td>مدة TTL قابلة للتهيئة</td>
</tr>
<tr>
<td>حالة الاستخدام</td>
<td>تدفقات OAuth/OIDC القياسية</td>
<td>مفاتيح API، رموز مخصّصة، استعلامات قواعد البيانات</td>
</tr>
</tbody>
</table>
<p>ابدأ بمُفوِّضات JWT. وانتقل إلى مُفوِّضات Lambda عندما تحتاج إلى منطق لا يستطيع التحقق بواسطة JWT التعبير عنه—مثل فحص قاعدة بيانات، أو التحقق من صيغة رمز مخصّصة، أو تنفيذ تفويض متعدد المستأجرين.</p>
<h2 id="ترك-المسارات-بلا-حماية">ترك المسارات بلا حماية</h2>
<p>ليس كل مسار بحاجة إلى مصادقة. فالنقاط النهائية العامة—فحوصات السلامة، وتدفقات البيانات العامة، ومحتوى صفحة الهبوط—ينبغي أن تبقى متاحة دون رمز. أرفق المُفوِّضات بالمسارات التي تتطلب المصادقة فقط. والمسارات التي لا مُفوِّض لها مفتوحة افتراضيًا.</p>
<h2 id="استدعاء-واجهة-برمجية-محمية-من-واجهتك-الأمامية">استدعاء واجهة برمجية محمية من واجهتك الأمامية</h2>
<p>من تطبيق React لديك، أدرج JWT في ترويسة <code>Authorization</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> token = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAccessToken</span>(); <span class="hljs-comment">// From your auth library</span>

<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://api.example.com/items&#x27;</span>, {
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${token}</span>\`</span>,
  },
});
</code></pre>
<p>إذا كان الرمز منتهي الصلاحية أو غير صالح، فإن الاستجابة تكون 401. وينبغي أن تتعامل واجهتك الأمامية مع ذلك بتحديث الرمز أو بإعادة التوجيه إلى تدفق تسجيل الدخول.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>استخدام جمهور خاطئ.</strong> يجب أن تطابق مطالبة <code>aud</code> في JWT الجمهور المهيّأ على المُفوِّض. وبالنسبة إلى Cognito، الجمهور هو معرّف عميل التطبيق—لا معرّف مجمّع المستخدمين. وهذا هو السبب الأكثر شيوعًا لأخطاء 401 مع رمز يبدو صالحًا.</p>
<p><strong>نسيان منح إذن الاستدعاء لدالة مُفوِّض Lambda.</strong> تمامًا مثل معالج واجهتك البرمجية، تحتاج دالة المُفوِّض إلى سياسة قائمة على الموارد تسمح لـ <code>apigateway.amazonaws.com</code> باستدعائها. وبدون ذلك، يعيد كل طلب رمز 500.</p>
<p><strong>عدم التعامل مع استجابات 401 في الواجهة الأمامية.</strong> عندما يرفض المُفوِّض طلبًا، تكون الاستجابة <code>{&quot;message&quot;:&quot;Unauthorized&quot;}</code> المجرّدة. وينبغي أن تتحقق شيفرة واجهتك الأمامية من حالة 401 وتطلق تحديث الرمز أو إعادة التوجيه إلى تسجيل الدخول، لا أن تعرض خطأً عامًا.</p>
<p>باتت لديك الآن صورة API Gateway كاملة: واجهات HTTP البرمجية، والمسارات، والتكاملات، وCORS، والمراحل، والنطاقات المخصّصة، والمصادقة. وفي التمرين التالي، ستجمع كل هذه القطع معًا وتبني واجهة برمجية عاملة تستطيع واجهتك الأمامية استدعاءها.</p>
`,l={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:e,html:o};export{s as book,p as chapter,a as chapterTitle,l as default,e as headings,o as html,n as slug,t as title};
