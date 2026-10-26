const n="kinney",p="aws",t="نشر تطبيقات الويب على AWS",s="iam-mental-model",o="نموذج IAM الذهني",e=[{depth:2,id:"الكتل-الأربع-الأساسية",text:"الكتل الأربع الأساسية"},{depth:3,id:"المستخدمون",text:"المستخدمون"},{depth:3,id:"المجموعات",text:"المجموعات"},{depth:3,id:"الأدوار",text:"الأدوار"},{depth:3,id:"السياسات",text:"السياسات"},{depth:2,id:"كيف-تقيم-aws-الصلاحيات",text:"كيف تقيّم AWS الصلاحيات"},{depth:2,id:"كيف-تتركب-القطع-معا",text:"كيف تتركّب القطع معًا"},{depth:2,id:"هرم-iam-بصريا",text:"هرم IAM بصريًا"},{depth:2,id:"تشبيه-سريع-لمهندسي-الواجهة-الأمامية",text:"تشبيه سريع لمهندسي الواجهة الأمامية"}],a=`<p>فكّر في IAM كأنه تحكّم بالوصول قائم على الأدوار، لكن للبنية التحتية. فإن كنت قد أعددت صلاحيات في نظام إدارة محتوى أو ضبطت أدوار فريق في GitHub، فلديك الحدس اللازم بالفعل. الفرق أن IAM يتحكّم في مَن يستطيع إنشاء خوادم وقراءة ملفات واستدعاء دوال وتكديس رسوم على بطاقتك الائتمانية. أعني أن المخاطر <em>أعلى قليلًا</em> من «مَن يستطيع الدمج إلى main».</p>
<p>وإن أردت النسخة المعتمدة من النموذج نفسه من AWS أثناء القراءة، فمن المفيد إبقاء <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html">دليل مستخدم IAM</a> و<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">دليل أفضل ممارسات IAM</a> مفتوحين.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p><strong>IAM (إدارة الهوية والوصول)</strong> هو نظام AWS للإجابة عن سؤالين في كل استدعاء API على حدة: <em>مَن أنت؟</em> و<em>هل يُسمح لك بذلك؟</em> فكل طلب إلى أي خدمة AWS — سواء جاء من لوحة التحكم أو من CLI أو من SDK يعمل داخل دالة Lambda — يمرّ عبر تقييم IAM. بلا استثناءات.</p>
</blockquote>
<p><img src="/arabic-cs-library/images/kinney/a2c84993a05d9faa.svg" alt="مخطط يوضح مستخدمي IAM ومجموعاته وأدواره وسياساته داخل حساب AWS، إضافة إلى تدفّق تقييم الرفض الصريح والسماح."></p>
<h2 id="الكتل-الأربع-الأساسية">الكتل الأربع الأساسية</h2>
<p>لدى IAM أربعة مفاهيم تحتاج إلى استيعابها. وكل ما عداها مبني فوقها.</p>
<h3 id="المستخدمون">المستخدمون</h3>
<p>يمثّل <strong>مستخدم IAM</strong> شخصًا واحدًا أو تطبيقًا واحدًا يحتاج إلى التفاعل مع AWS. ويحصل كل مستخدم على بيانات اعتماده الخاصة — كلمة مرور للوصول إلى لوحة التحكم، أو مفاتيح وصول للوصول البرمجي. وقد أنشأت واحدًا في <a href="https://stevekinney.com/courses/aws/creating-and-securing-an-aws-account">إنشاء حساب AWS وتأمينه</a> عندما أعددت مستخدم <code>admin</code>.</p>
<p>المستخدمون موجودون داخل حساب AWS الخاص بك، ولا يُشاركون بين الحسابات. فإن كان لديك ثلاثة مطوّرين يحتاجون إلى الوصول إلى AWS، فأنشئ ثلاثة مستخدمي IAM. (أو استخدم IAM Identity Center لتسجيل الدخول الموحّد، لكن ذلك تعقيد أكثر مما نحتاجه الآن.)</p>
<blockquote>
<p><strong>IAM Identity Center</strong></p>
<p>في الإنتاج، لم تعد <em>تكاد</em> تنشئ مستخدمي IAM للبشر إطلاقًا. النمط الحديث هو <strong>IAM Identity Center</strong> الذي يوحّد الهوية من مزوّد الهوية لديك (Google أو Okta أو Entra أو GitHub)، فيمنح البشر جلسات SSO قصيرة الأجل بدلًا من كلمات مرور أو مفاتيح وصول طويلة الأجل. ومفاهيم IAM الواردة أدناه — السياسات والأدوار وتقييم السماح/المنع — متطابقة في النموذجين؛ فـ Identity Center يستبدل نقطة الدخول «مستخدم IAM» فقط. وتلتزم الدورة بمستخدمي IAM لأنهم أنظف طريقة لتعليم هذه الأمور.</p>
</blockquote>
<h3 id="المجموعات">المجموعات <span class="content-anchor" id="groups"></span></h3>
<p><strong>مجموعة IAM</strong> هي مجموعة من المستخدمين. والمجموعات موجودة للراحة فقط: فبدلًا من إرفاق السياسات الخمس نفسها بكل مطوّر على حدة، تنشئ مجموعة «developers»، وتُرفق السياسات بالمجموعة، وتضيف كل مطوّر إليها.</p>
<p>لا تملك المجموعات بيانات اعتماد خاصة بها. ولا يمكنك تسجيل الدخول بوصفك مجموعة. فهي مجرّد حاوية لتنظيم إسنادات الصلاحيات.</p>
<p>ويمكن للمستخدم أن ينتمي إلى عدة مجموعات. فإن كنت في مجموعة «developers» ومجموعة «deployers» معًا، فأنت ترث الصلاحيات من كلتيهما. ويعمل هذا بالضبط كما تتوقّع.</p>
<h3 id="الأدوار">الأدوار</h3>
<p><strong>دور IAM</strong> يشبه المستخدم، لكن بلا بيانات اعتماد دائمة. فبدلًا من تسجيل الدخول بوصفك دورًا، <strong>تتبنّى</strong> الدور مؤقتًا. ويعيد الدور بيانات اعتماد قصيرة الأجل تنتهي بعد مدة محدّدة.</p>
<p>الأدوار حاسمة في سيناريوهين:</p>
<ul>
<li><strong>خدمات AWS التي تحتاج إلى صلاحيات.</strong> عندما تحتاج دالة Lambda إلى القراءة من S3 أو الكتابة إلى DynamoDB، فإنها تتبنّى دورًا. فالدالة لا تملك مفاتيح وصول خاصة بها — بل تستعير الصلاحيات من الدور في كل مرة تعمل فيها.</li>
<li><strong>الوصول بين الحسابات.</strong> يمكن لمستخدم في الحساب B أن يتبنّى دورًا في الحساب A. وهكذا تدير المؤسسات الوصول عبر حسابات AWS متعددة دون مشاركة بيانات الاعتماد.</li>
</ul>
<p>إذا كان المستخدمون شارات موظفين، فالأدوار <strong>تصاريح زائر</strong>: تحدّد ما يُسمح لك بفعله، لكنها تنتهي وعليك الحصول على تصريح جديد في كل مرة.</p>
<h3 id="السياسات">السياسات</h3>
<p><strong>سياسة IAM</strong> مستند JSON يحدّد الإجراءات المسموح بها أو الممنوعة على الموارد المعنية. فالسياسات هي قواعد الصلاحيات الفعلية. والمستخدمون والمجموعات والأدوار لا تملك أي صلاحيات أصيلة — بل تحصل عليها من السياسات المُرفقة.</p>
<p>وهذه أبسط سياسة ممكنة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تقول هذه السياسة: اسمح بإجراء <code>GetObject</code> على كل كائن داخل حاوية <code>my-frontend-app-assets</code>. وسنفكّك كل حقل في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>.</p>
<p>هناك نوعان من السياسات:</p>
<ul>
<li><strong>السياسات القائمة على الهوية</strong> تُرفق بالمستخدمين أو المجموعات أو الأدوار. وهي تحدّد ما يمكن لتلك الهوية فعله.</li>
<li><strong>السياسات القائمة على المورد</strong> تُرفق بمورد (مثل حاوية S3). وهي تحدّد مَن يمكنه الوصول إلى ذلك المورد.</li>
</ul>
<p>ستصادف النوعين معًا في هذه الدورة. أما الآن، فتركيزنا على السياسات القائمة على الهوية.</p>
<h2 id="كيف-تقيم-aws-الصلاحيات">كيف تقيّم AWS الصلاحيات</h2>
<p>في كل مرة ترسل فيها طلبًا إلى AWS — بالنقر على زر في لوحة التحكم، أو تشغيل أمر CLI، أو إجراء استدعاء SDK من الكود — يجري IAM تقييمًا. والمنطق بسيط لكنه قاطع:</p>
<ol>
<li><strong>ابدأ بالمنع الافتراضي.</strong> فكل طلب ممنوع ما لم يسمح به شيء صراحةً. ومستخدم IAM جديد تمامًا بلا سياسات مُرفقة لا يستطيع فعل أي شيء.</li>
<li><strong>افحص حالات المنع الصريحة.</strong> ينظر AWS في كل سياسة تنطبق على هذا الطلب. فإن كان في أي سياسة عبارة <code>&quot;Effect&quot;: &quot;Deny&quot;</code> تطابق الإجراء والمورد، فالطلب <strong>ممنوع فورًا</strong>. ولا يمكن لأي سماح أن يتجاوز منعًا صريحًا.</li>
<li><strong>افحص حالات السماح الصريحة.</strong> فإن لم يوجد منع صريح، يبحث AWS عن عبارة <code>&quot;Effect&quot;: &quot;Allow&quot;</code> مطابقة. فإن وُجدت، يُسمح بالطلب.</li>
<li><strong>إن لم يسمح به شيء، فارفضه.</strong> عودة إلى الافتراضي: لا سماح صريح يعني منعًا ضمنيًا.</li>
</ol>
<p>الخلاصة الحاسمة: <strong>المنع الصريح يفوز دائمًا</strong>. فإذا قالت سياسة «اسمح بكل شيء على S3» وقالت أخرى «امنع الوصول إلى هذه الحاوية تحديدًا»، فالمنع يفوز. دائمًا. وهكذا تنشئ حواجز حماية لا يمكن تجاوزها عن غير قصد.</p>
<pre><code>Request comes in
    → Any explicit Deny? → YES → Request DENIED (game over)
    → Any explicit Allow? → YES → Request ALLOWED
    → Neither? → Request DENIED (implicit deny)
</code></pre>
<p>يغطّي هذا التدفق السياسات القائمة على الهوية. أما السياسات القائمة على المورد (مثل سياسات حاوية S3) فتتفاعل مع هذا التقييم بطريقة مختلفة — ولا سيما الوصول بين الحسابات الذي يتطلّب سماحًا في كل من السياسة القائمة على الهوية والسياسة القائمة على المورد.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>من الأخطاء الشائعة الاعتقاد بأن إضافة سياسة Allow تُصلح الوصول. فإذا وُجد منع صريح في مكان ما — ربما في مجموعة المستخدم أو في سياسة على مستوى المؤسسة — فلن يتجاوزه أي قدر من السماح. وعند تصحيح مشكلات الوصول، افحص عبارات المنع أولًا دائمًا.</p>
</blockquote>
<h2 id="كيف-تتركب-القطع-معا">كيف تتركّب القطع معًا</h2>
<p>في الإنتاج، تستخدم خطوط أنابيب CI/CD <strong>دور IAM موحّدًا عبر OIDC</strong> بدلًا من مستخدم IAM طويل الأجل بمفاتيح وصول. فـ GitHub Actions، على سبيل المثال، يمكنه طلب بيانات اعتماد قصيرة الأجل من AWS بتقديم رمز هوية موقّع تشفيريًا — بلا أي أسرار ثابتة مخزّنة في أي مكان. ويغطّي درس CI/CD هذا بالتفصيل. أما الآن، فستبني المكافئ باستخدام مستخدم IAM ومفاتيح وصول، وهي نقطة البداية الصحيحة لفهم الصلاحيات المطلوبة فعلًا ولماذا.</p>
<p>وهذا شكل إعداد IAM في صورة مسار التعلّم ذاك:</p>
<ol>
<li><strong>أنشئ مستخدم IAM</strong> باسم <code>deploy-bot</code>. ويمثّل هذا خط أنابيب CI. ولا حاجة إلى وصول إلى لوحة التحكم — فقط مفاتيح وصول برمجية.</li>
<li><strong>اكتب سياسة</strong> تسمح بـ <code>s3:PutObject</code> و<code>s3:DeleteObject</code> على حاويتك المحدّدة، إضافة إلى <code>cloudfront:CreateInvalidation</code> على توزيعك المحدّد.</li>
<li><strong>أنشئ مجموعة</strong> باسم <code>deployers</code> وأرفق السياسة بالمجموعة.</li>
<li><strong>أضف المستخدم <code>deploy-bot</code></strong> إلى تلك المجموعة.</li>
</ol>
<p>الآن يستطيع روبوت النشر رفع الملفات وإبطال ذاكرات التخزين المؤقت — ولا شيء غير ذلك. فلا يمكنه قراءة جداول DynamoDB لديك. ولا إنشاء مستخدمين جدد. ولا تغيير إعدادات الفوترة. فالسياسة تقيّده بما يحتاجه بالضبط.</p>
<p>ولو استخدمت الأدوار بدلًا من ذلك (وهو النهج الأحدث)، لأنشأت دورًا بالسياسة نفسها وأعددت GitHub Actions ليتبنّى ذلك الدور باستخدام OpenID Connect. بلا حاجة إلى مفاتيح وصول طويلة الأجل.</p>
<h2 id="هرم-iam-بصريا">هرم IAM بصريًا</h2>
<pre><code>AWS Account
├── IAM Users
│   ├── admin (member of Administrators)
│   └── deploy-bot (member of deployers)
├── IAM Groups
│   ├── Administrators
│   │   ├── Members: admin
│   │   └── Attached policies: AdministratorAccess
│   └── deployers
│       ├── Members: deploy-bot
│       └── Attached policies: DeployPolicy
├── IAM Roles
│   └── my-frontend-app-lambda-role
│       └── Attached policies: LambdaBasicExecution, S3ReadOnly
└── IAM Policies
    ├── AdministratorAccess (AWS managed)
    ├── AmazonS3ReadOnlyAccess (AWS managed)
    └── DeployPolicy (customer managed)
</code></pre>
<p><strong>السياسات المُدارة من AWS</strong> سياسات تصونها AWS لحالات استخدام شائعة. وأسماؤها مثل <code>AdministratorAccess</code> و<code>AmazonS3ReadOnlyAccess</code> و<code>AWSLambdaBasicExecutionRole</code>. وهي مريحة للبدء، لكنها غالبًا أوسع مما تريده في الإنتاج.</p>
<p><strong>السياسات المُدارة من العميل</strong> سياسات تكتبها وتصونها بنفسك. وهي تتيح لك الدقة في تحديد الإجراءات والموارد التي يحتاجها مستخدم أو دور بالضبط.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تجنّب استخدام السياسة المُدارة <code>AdministratorAccess</code> في أي شيء عدا مستخدم المسؤول الخاص بك. فإرفاقها بدور Lambda أو بروبوت CI/CD يعني أن أي خطأ برمجي أو اختراق يمنح المهاجم تحكّمًا كاملًا في حساب AWS لديك. ونغطّي هذا في <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ الامتياز الأقل</a>.</p>
</blockquote>
<h2 id="تشبيه-سريع-لمهندسي-الواجهة-الأمامية">تشبيه سريع لمهندسي الواجهة الأمامية</h2>
<p>إن كنت قد عملت مع RBAC في تطبيق واجهة أمامية، فالربط مباشر:</p>
<table>
<thead>
<tr>
<th>RBAC في الواجهة الأمامية</th>
<th>AWS IAM</th>
</tr>
</thead>
<tbody>
<tr>
<td>حساب مستخدم</td>
<td>مستخدم IAM</td>
</tr>
<tr>
<td>دور (مسؤول، محرّر، مشاهد)</td>
<td>مجموعة IAM أو دور IAM</td>
</tr>
<tr>
<td>صلاحية (can_edit_posts)</td>
<td>عبارة سياسة IAM</td>
</tr>
<tr>
<td>فحص وقت الطلب</td>
<td>تقييم IAM في كل استدعاء API</td>
</tr>
</tbody>
</table>
<p>الفرق الأساسي: في تطبيق واجهة أمامية، قد تسمح صلاحية سيئة الإعداد لشخص بتحرير تدوينة لا ينبغي له تحريرها. أما في AWS، فبإمكان صلاحية سيئة الإعداد أن تسمح لشخص بتشغيل موارد حوسبة مكلفة، أو تسريب بيانات من قاعدة بيانات، أو حذف نشرك بالكامل. نموذج التقييم نفسه — لكن نطاق الأثر مختلف. أمور سيئة جدًا.</p>
<p>والآن بعد أن صار لديك النموذج الذهني، لنكتب سياسة فعلية من الصفر في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>.</p>
`,c={book:n,chapter:"aws",chapterTitle:t,slug:s,title:o,headings:e,html:a};export{n as book,p as chapter,t as chapterTitle,c as default,e as headings,a as html,s as slug,o as title};
