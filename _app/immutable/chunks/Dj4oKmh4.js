const n="devops-roadmap",e="projects",i="مشاريع عملية",t="hivebox",l="مشروع من البداية إلى النهاية: HiveBox",a=[{depth:2,id:"المقاربة",text:"المقاربة"},{depth:2,id:"الهدف",text:"الهدف"},{depth:2,id:"المرحلة-1",text:"المرحلة 1"},{depth:3,id:"11-الانطلاق",text:"1.1 الانطلاق"},{depth:3,id:"12-التحضير",text:"1.2 التحضير"},{depth:2,id:"المرحلة-2",text:"المرحلة 2"},{depth:3,id:"21-الأدوات",text:"2.1 الأدوات"},{depth:3,id:"22-الشيفرة",text:"2.2 الشيفرة"},{depth:3,id:"23-الحاويات",text:"2.3 الحاويات"},{depth:3,id:"24-الاختبار",text:"2.4 الاختبار"},{depth:2,id:"المرحلة-3",text:"المرحلة 3"},{depth:3,id:"31-الأدوات",text:"3.1 الأدوات"},{depth:3,id:"32-الشيفرة",text:"3.2 الشيفرة"},{depth:3,id:"33-الحاويات",text:"3.3 الحاويات"},{depth:3,id:"34-التكامل-المستمر",text:"3.4 التكامل المستمر"},{depth:3,id:"35-الاختبار",text:"3.5 الاختبار"},{depth:2,id:"المرحلة-4",text:"المرحلة 4"},{depth:3,id:"41-الأدوات",text:"4.1 الأدوات"},{depth:3,id:"42-الشيفرة",text:"4.2 الشيفرة"},{depth:3,id:"43-الحاويات",text:"4.3 الحاويات"},{depth:3,id:"44-التكامل-المستمر",text:"4.4 التكامل المستمر"},{depth:3,id:"45-التسليم-المستمر",text:"4.5 التسليم المستمر"},{depth:2,id:"المرحلة-5",text:"المرحلة 5"},{depth:3,id:"51-الأدوات",text:"5.1 الأدوات"},{depth:3,id:"52-الشيفرة",text:"5.2 الشيفرة"},{depth:3,id:"53-الحاويات",text:"5.3 الحاويات"},{depth:3,id:"54-البنية-التحتية-كشيفرة",text:"5.4 البنية التحتية كشيفرة"},{depth:3,id:"55-التكامل-المستمر",text:"5.5 التكامل المستمر"},{depth:3,id:"56-التسليم-المستمر",text:"5.6 التسليم المستمر"},{depth:2,id:"المرحلة-6",text:"المرحلة 6"},{depth:2,id:"المرحلة-7",text:"المرحلة 7"}],o=`<h1>مشروع من البداية إلى النهاية: HiveBox</h1>
<p>يحبّ الجميع تقريبًا العسل، ونحن في <a href="https://devopshive.com/">DevOps Hive</a> نحبّه أيضًا ونُقدّر دور النحل في كوكبنا! لأنّ <a href="https://www.unep.org/news-and-stories/story/why-bees-are-essential-people-and-planet">النحل أساسي للناس والكوكب</a>. ولهذا السبب، سيكون مشروعنا العملي الرئيسي في خارطة الطريق هذه من أجل النحل!</p>
<p>في هذا المشروع العملي المتكامل من البداية إلى النهاية، سنوظّف التقنية والبرمجيات مفتوحة المصدر لبناء واجهة برمجية (API) لتتبّع بيانات المستشعرات البيئية من <a href="https://opensensemap.org/">openSenseMap</a>، وهي منصّة لبيانات المستشعرات المفتوحة يمكن للجميع المشاركة فيها.</p>
<p>في هذا المشروع، ستغطّي موضوعات كثيرة:</p>
<ul>
<li>إنتاج البرمجيات.</li>
<li>التخطيط الرشيق.</li>
<li>ضمان الجودة وبوابات الجودة.</li>
<li>الشيفرة والبرمجة.</li>
<li>نظام التشغيل.</li>
<li>حاويات Docker.</li>
<li>Kubernetes والسحابة.</li>
<li>القابلية للملاحظة والمراقبة.</li>
<li>التكامل/التسليم/النشر المستمر.</li>
<li>الأتمتة والبنية التحتية كشيفرة.</li>
</ul>
<div class="callout callout--tip">
<p><strong>تلميح</strong></p>
<p>إن كنت تبحث عن خارطة الطريق الكاملة، بما فيها هذا المشروع، فعُد إلى <a href="/arabic-cs-library/book/devops-roadmap/getting-started/index">صفحة البدء</a>.</p>
</div>
<hr>
<h2 id="المقاربة">المقاربة</h2>
<p>يتبع هذا المشروع العقلية الديناميكية بأسلوب MVP ذاتها المستخدمة في <a href="/arabic-cs-library/book/devops-roadmap/getting-started/index">خارطة الطريق</a>، والتي تهدف إلى تغطية دورة حياة تطوير البرمجيات (SDLC) كاملة. وهذا يعني أنّ كل مرحلة من مراحل هذا المشروع ستغطّي جميع جوانب مجالات DevOps، مثل التخطيط والبرمجة والحاويات والاختبار والتكامل المستمر والتسليم المستمر والبنية التحتية وغيرها.</p>
<p>يعمل هذا المشروع على أفضل وجه في وضع <code>الاقتران</code> (Pairing)، حيث يكون لديك شخص آخر يساعدك متى تعثّرت (مثل موجّه أو ما شابه). لكن إن لم يتوفر ذلك، فعُد دائمًا إلى <code>الوحدة ذات الصلة</code> (Related Module) حيث تجد تفاصيل أكثر قد تساعدك في المشروع.</p>
<p><strong>نصائح</strong></p>
<ul>
<li>تجنّب الصور النمطية عن نفسك! عليك أن تفكّر بطريقة مختلفة هذه المرة!</li>
<li>قُلها <code>لا</code> أكثر للأمور الأخرى أثناء تنفيذ المشروع. حتى الأمور الجيدة، أي ابقَ مركّزًا!</li>
<li>تذكّر أنّ الحياة كلها مقايضات! <a href="https://www.oliveremberton.com/p/you-can-do-anything-if-you-stop-trying">يمكنك فعل أي شيء إن توقّفت عن محاولة فعل كل شيء</a>.</li>
</ul>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>تُعالَج كل مرحلة من هذا المشروع تدريجيًّا كجزء من وحدات خارطة الطريق. لكنها أيضًا <strong>مستقلّة</strong>، ويمكنك العمل عليها إن كانت لديك المعرفة المطلوبة لكل مرحلة.</p>
</div>
<div class="callout callout--warning">
<p><strong>تحذير</strong></p>
<p>تذكّر أنّ الهدف هو تنفيذ المشروع وتعلّم أفضل الممارسات الصناعية في مجال DevOps!
فمجرد تطبيق هذا المشروع دون فهم المشكلات المراد حلّها لن يساعدك على أن تصبح مهندس DevOps!</p>
</div>
<h2 id="الهدف">الهدف</h2>
<p>شكل توضيحي: معمارية HiveBox. يهدف هذا المشروع إلى بناء نظام حقيقي من الشيفرة إلى البنية التحتية وكل ما بينهما، على مراحل متكرّرة.</p>
<p>هدف هذا المشروع هو بناء واجهة برمجية RESTful قابلة للتوسّع حول <a href="https://opensensemap.org/">openSenseMap</a>، لكن مخصّصة لمساعدة مربّي النحل في أعمالهم. وينبغي أن يكون ناتج الواجهة بصيغة JSON. ستبدأ بتنفيذ أساسي ثم توسّع النظام كاملًا ليتعامل مع آلاف الطلبات في الثانية. لكن تذكّر دائمًا أنّ لكل قرار كلفة.</p>
<p><strong>Happy DevOpsing</strong></p>
<hr>
<h2 id="المرحلة-1">المرحلة 1 <span class="content-anchor" id="phase-1"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-01">مرحبًا بك في عالم DevOps</a></p>
<h3 id="11-الانطلاق">1.1 الانطلاق</h3>
<ul>
<li>افهم دورك في هذا المشروع وكيف تعمل مع الفرق الأخرى (افترض أنك في فريق ولا تتصرّف كما لو كنت تعمل منفردًا!).</li>
<li>راجع معلوماتك عن إدارة مشاريع البرمجيات (تلميح: <a href="https://www.apm.org.uk/resources/find-a-resource/agile-project-management/">ما هي إدارة المشاريع الرشيقة؟</a>).</li>
<li>حدّد منهجية أجايل التي ستستخدمها، مثل Scrum أو Kanban أو Scrumban (يُوصى بـ Kanban لهذا المشروع).</li>
<li>تجنّب <a href="https://www.pmi.org/learning/library/top-five-causes-scope-creep-6675">تضخّم النطاق</a>! <strong>اجعله يعمل، ثم اجعله صحيحًا، ثم اجعله سريعًا</strong>!</li>
<li>لا تنسَ! أنت <a href="https://handbook.gitlab.com/handbook/leadership/#managers-of-one">مدير نفسك</a>!</li>
</ul>
<h3 id="12-التحضير">1.2 التحضير</h3>
<ul>
<li><a href="https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github">أنشئ حساب GitHub</a> (إن لم يكن لديك واحد)، ثم <a href="https://github.com/DevOpsHiveHQ/devops-hands-on-project-hivebox/fork">اعمل تفريعًا (fork) لمستودع HiveBox على GitHub</a> وابدأ من هناك.</li>
<li><a href="https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project">أنشئ لوحة مشروع GitHub</a> لهذا المستودع (استخدم قالب <code>Kanban</code>).</li>
<li>ينبغي تقديم كل مرحلة كطلب سحب (pull request) مقابل الفرع <code>main</code>. لا تدفع (push) مباشرة إلى الفرع الرئيسي!</li>
<li>وثّق أثناء العمل. افترض دائمًا أنّ شخصًا آخر سيقرأ مشروعك في أي مرحلة.</li>
<li>يمكنك الحصول على معرّفات senseBox من موقع <a href="https://opensensemap.org/">openSenseMap</a>. استخدم 3 معرّفات senseBox قريبة من بعضها (يمكنك استخدام ما يلي <a href="https://opensensemap.org/explore/5eba5fbad46fb8001b799786">5eba5fbad46fb8001b799786</a> و<a href="https://opensensemap.org/explore/5c21ff8f919bf8001adf2488">5c21ff8f919bf8001adf2488</a> و<a href="https://opensensemap.org/explore/5ade1acf223bd80019a1011c">5ade1acf223bd80019a1011c</a>). انسخ المعرّفات فقط، فستحتاجها في الخطوات التالية.</li>
</ul>
<hr>
<h2 id="المرحلة-2">المرحلة 2 <span class="content-anchor" id="phase-2"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-02">الأساسيات - جوهر DevOps</a></p>
<h3 id="21-الأدوات">2.1 الأدوات</h3>
<ul>
<li>Git</li>
<li>VS Code</li>
<li>Docker</li>
</ul>
<h3 id="22-الشيفرة">2.2 الشيفرة</h3>
<ul>
<li>نفّذ متطلّبات الشيفرة في تفريع مستودع GitHub الخاص بمشروعك (الذي أنشأته في المرحلة 1).</li>
</ul>
<p><strong>المتطلّبات:</strong></p>
<ul>
<li>كإصدار أوّلي لتطبيق HiveBox، استخدم <a href="https://semver.org/">الإصدار الدلالي</a> <code>v0.0.1</code>.</li>
<li>أنشئ دالة تطبع إصدار التطبيق الحالي. ولا تحتاج إلا لطباعة الإصدار ثم الخروج.</li>
</ul>
<h3 id="23-الحاويات">2.3 الحاويات</h3>
<ul>
<li>أنشئ <code>Dockerfile</code> للمشروع.</li>
<li>ابنِ صورة Docker وشغّلها محليًّا.</li>
</ul>
<h3 id="24-الاختبار">2.4 الاختبار</h3>
<ul>
<li>محليًّا، شغّل حاوية التطبيق وتأكّد من أنها تُرجع القيمة الصحيحة.</li>
<li>تأكّد من توفير توثيق حول كيفية اختبار التطبيق.</li>
</ul>
<hr>
<h2 id="المرحلة-3">المرحلة 3 <span class="content-anchor" id="phase-3"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-03">الانطلاق - إرساء القاعدة</a></p>
<h3 id="31-الأدوات">3.1 الأدوات</h3>
<ul>
<li><a href="https://github.com/hadolint/hadolint">Hadolint</a> <strong>و</strong> <a href="https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint">إضافة hadolint لـ VS Code</a></li>
<li><a href="https://pypi.org/project/pylint/">Pylint</a> <strong>و</strong> <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.pylint">إضافة Pylint لـ VS Code</a></li>
</ul>
<h3 id="32-الشيفرة">3.2 الشيفرة</h3>
<ul>
<li>استخدم <a href="https://www.conventionalcommits.org/en/v1.0.0/">الالتزامات التقليدية</a> لالتزامات Git.</li>
<li>تعرّف على <a href="https://docs.opensensemap.org/">واجهة openSenseMap البرمجية</a>.</li>
<li>نفّذ متطلّبات الشيفرة (تلميح: <a href="https://flask.palletsprojects.com/en/2.3.x/quickstart/">البدء السريع مع Flask</a> أو <a href="https://fastapi.tiangolo.com/tutorial/first-steps/">FastAPI</a>).</li>
<li>اكتب اختبارات وحدة لجميع نقاط النهاية (endpoints).</li>
</ul>
<p><strong>المتطلّبات:</strong></p>
<p><strong>الإصدار:</strong></p>
<ul>
<li>نقطة النهاية: <code>/version</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>تُرجع إصدار التطبيق المنشور.</li>
</ul>
</li>
</ul>
<p><strong>درجة الحرارة:</strong></p>
<ul>
<li>نقطة النهاية: <code>/temperature</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>تُرجع متوسط درجة الحرارة الحالي استنادًا إلى بيانات جميع صناديق senseBox.</li>
<li>تأكّد من أنّ البيانات لا يزيد عمرها على ساعة واحدة.</li>
</ul>
</li>
</ul>
<h3 id="33-الحاويات">3.3 الحاويات</h3>
<ul>
<li>طبّق أفضل الممارسات الخاصة بالحاويات (تلميح: <a href="https://tech.aabouzaid.com/2021/09/docker-best-practices-workshop-presentation.html">أفضل ممارسات Docker</a>).</li>
</ul>
<h3 id="34-التكامل-المستمر">3.4 التكامل المستمر</h3>
<ul>
<li>أنشئ سير عمل GitHub Actions للتكامل المستمر (CI).</li>
<li>أضف خطوة لفحص الشيفرة وDockerfile.</li>
<li>أضف خطوة لبناء صورة Docker.</li>
<li>أضف خطوة لاختبارات الوحدة.</li>
<li>أعدّ <a href="https://securityscorecards.dev/#using-the-github-action">إجراء GitHub لبطاقة تقييم OpenSSF</a> وأصلح أي مشكلات يُبلغ عنها.</li>
</ul>
<h3 id="35-الاختبار">3.5 الاختبار</h3>
<ul>
<li>في خط أنابيب CI، استدعِ نقطة النهاية <code>/version</code> وتأكّد من أنها تُرجع القيمة الصحيحة.</li>
</ul>
<hr>
<h2 id="المرحلة-4">المرحلة 4 <span class="content-anchor" id="phase-4"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-04">التوسّع - بناء القشرة</a></p>
<h3 id="41-الأدوات">4.1 الأدوات</h3>
<ul>
<li>Kind</li>
<li>Kubectl</li>
</ul>
<h3 id="42-الشيفرة">4.2 الشيفرة</h3>
<ul>
<li>نفّذ متطلّبات الشيفرة.</li>
<li>اكتب اختبار تكامل (تلميح: <a href="https://opensource.com/article/21/9/unit-test-python">3 طرق لاختبار واجهتك البرمجية بلغة Python</a>).</li>
</ul>
<p><strong>المتطلّبات:</strong></p>
<p><strong>عام:</strong></p>
<ul>
<li>ينبغي أن يكون صندوق senseBox قابلًا للضبط عبر متغيّرات البيئة (env vars).</li>
</ul>
<p><strong>المقاييس:</strong></p>
<ul>
<li>نقطة النهاية: <code>/metrics</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>تُرجع مقاييس Prometheus الافتراضية الخاصة بالتطبيق.</li>
</ul>
</li>
</ul>
<p><strong>درجة الحرارة:</strong></p>
<ul>
<li>نقطة النهاية: <code>/temperature</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>أضف حقل &quot;status&quot; استنادًا إلى قيمة متوسط درجة الحرارة.
<ul>
<li>أقل من 10: بارد جدًّا</li>
<li>بين 11-36: جيد</li>
<li>أكثر من 37: حار جدًّا</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="43-الحاويات">4.3 الحاويات</h3>
<ul>
<li>أنشئ إعداد KIND ليعمل مع Ingress-Nginx.</li>
<li>أنشئ ملفات Kubernetes الأساسية (manifests) لنشر التطبيق.</li>
</ul>
<h3 id="44-التكامل-المستمر">4.4 التكامل المستمر</h3>
<ul>
<li>شغّل اختبارات تكامل الشيفرة.</li>
<li>شغّل SonarQube لجودة الشيفرة والأمن والتحليل الساكن (تلميح: استخدم إجراء <a href="https://github.com/marketplace/actions/sonarqube-quality-gate-check">فحص بوابة الجودة في SonarQube</a>، وفكّر أيضًا في <a href="https://github.com/semgrep/semgrep">Semgrep</a>).</li>
<li>شغّل Terrascan لاكتشاف حالات الضبط الخاطئ والثغرات في ملفات Kubernetes (تلميح: <a href="https://github.com/marketplace/actions/terrascan-iac-scanner">إجراء Terrascan على GitHub</a>).</li>
<li>طبّق أفضل الممارسات في CI (تلميح: <a href="https://github.com/resources/articles/devops/continuous-integration#best-practices-when-adopting-continuous-integration">أفضل الممارسات عند تبنّي التكامل المستمر</a>).</li>
</ul>
<h3 id="45-التسليم-المستمر">4.5 التسليم المستمر</h3>
<ul>
<li>أنشئ سير عمل GitHub Actions للتسليم المستمر (CD).</li>
<li>أضف خطوة للإصدار عبر دفع صورة Docker ذات إصدار إلى سجل الحاويات (تلميح: <a href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry">استخدم سجل حاويات GitHub</a>).</li>
</ul>
<hr>
<h2 id="المرحلة-5">المرحلة 5 <span class="content-anchor" id="phase-5"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-05">التحوّل - إتمام البنية</a></p>
<h3 id="51-الأدوات">5.1 الأدوات</h3>
<ul>
<li>Kind</li>
<li>Kubectl</li>
</ul>
<h3 id="52-الشيفرة">5.2 الشيفرة</h3>
<ul>
<li>نفّذ متطلّبات الشيفرة.</li>
</ul>
<p><strong>المتطلّبات:</strong></p>
<p><strong>عام:</strong></p>
<ul>
<li><strong>التخزين المؤقّت (Cache):</strong>
<ul>
<li>أضف طبقة تخزين مؤقّت باستخدام المشروع المتوافق مع Redis وهو <a href="https://github.com/valkey-io/valkey">Valkey</a>.</li>
<li>اضبط دورة التخزين المؤقّت على 5 دقائق. وأثناء كل دورة، ينبغي أن يُحدّث التطبيق الذاكرة المؤقّتة بأحدث نسخة من البيانات.</li>
</ul>
</li>
<li><strong>المخزن (Store):</strong>
<ul>
<li>أضف طبقة تخزين باستخدام المشروع المتوافق مع S3 وهو <a href="https://min.io/">MinIO</a>.</li>
<li>اضبط دورة التخزين على 5 دقائق. وأثناء كل دورة، ينبغي أن يخزّن التطبيق نسخة أخرى من البيانات.</li>
</ul>
</li>
</ul>
<p><strong>درجة الحرارة:</strong></p>
<ul>
<li>نقطة النهاية: <code>/temperature</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>ينبغي أن يقرأ التطبيق البيانات من الذاكرة المؤقّتة ما لم تكن البيانات المخزّنة مؤقّتًا قديمة، وفي هذه الحالة ينبغي أن يُحدّث الذاكرة المؤقّتة أولًا.</li>
</ul>
</li>
</ul>
<p><strong>التخزين المؤقّت:</strong></p>
<ul>
<li>نقطة النهاية: <code>/cache</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>عند استدعاء نقطة النهاية هذه، ينبغي أن تُحدّث البيانات المخزّنة مؤقّتًا مباشرةً على Valkey (خارج الدورة).</li>
</ul>
</li>
</ul>
<p><strong>المخزن:</strong></p>
<ul>
<li>نقطة النهاية: <code>/store</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>عند استدعاء نقطة النهاية هذه، ينبغي أن تخزّن نسخة جديدة من البيانات مباشرةً على MinIO (خارج الدورة).</li>
</ul>
</li>
</ul>
<p><strong>المقاييس:</strong></p>
<ul>
<li>نقطة النهاية: <code>/metrics</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>وسّع مقاييس Prometheus بإضافة مقاييس مخصّصة استنادًا إلى منطق الشيفرة.</li>
</ul>
</li>
</ul>
<p><strong>Readyz:</strong></p>
<ul>
<li>نقطة النهاية: <code>/readyz</code></li>
<li>المعاملات: بلا معاملات.</li>
<li>المتطلّبات:
<ul>
<li>تُرجع HTTP 200 إلا في الحالات التالية:
<ul>
<li>%50 + 1 من صناديق senseBox المضبوطة غير قابلة للوصول.</li>
<li>أو إن كان المحتوى <strong>المخزّن مؤقّتًا</strong> أقدم من دورتين (أي أنّ البيانات المخزّنة مؤقّتًا قديمة وأنّ شيئًا ما لا يعمل كما هو متوقّع).</li>
<li>أو إن كان المحتوى <strong>المخزّن</strong> أقدم من دورتين (أي أنّ البيانات المخزّنة قديمة وأنّ شيئًا ما لا يعمل كما هو متوقّع).</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="53-الحاويات">5.3 الحاويات</h3>
<ul>
<li>أنشئ مخطط Helm للتطبيق (تلميح: <a href="https://github.com/cdwv/awesome-helm">قائمة Helm الرائعة</a>).</li>
<li>أنشئ ملفات Kustomize لموارد البنية التحتية مثل KeyVal (تلميح: <a href="https://github.com/DevOpsHiveHQ/awesome-kustomize">قائمة Kustomize الرائعة</a>).</li>
<li>راجع أفضل ممارسات أمان Kubernetes (تلميح: <a href="https://tech.aabouzaid.com/2022/07/kubernetes-security-best-practices-with-tips-for-the-cks-exam.html">أفضل ممارسات أمان Kubernetes مع نصائح لاختبار CKS</a>).</li>
<li>اضبط ملف تطبيق Kubernetes لاستخدام <code>/readyz</code> كمسبار الجاهزية (readiness probe).</li>
</ul>
<h3 id="54-البنية-التحتية-كشيفرة">5.4 البنية التحتية كشيفرة</h3>
<ul>
<li>انشر وكيل Grafana لجمع السجلات والمقاييس (تلميح: أنشئ حساب <a href="https://grafana.com/products/cloud/">Grafana Cloud</a> مجانيًا لاستخدام Loki وGrafana).</li>
<li>أنشئ عنقود Kubernetes باستخدام Terraform IaC (تلميح: استخدم الطبقة المجانية من أي مزوّد سحابي أو استخدم محاكيًا محليًّا مثل <a href="https://github.com/floci-io/floci">Floci</a>).</li>
</ul>
<h3 id="55-التكامل-المستمر">5.5 التكامل المستمر</h3>
<ul>
<li>أنشئ اختبارًا من البداية إلى النهاية (تلميح: <a href="https://github.com/ovh/venom">Venom، مجموعة اختبارات تصريحية</a>).</li>
<li>شغّل عنقود KIND، وانشر التطبيق والبنية التحتية، ثم شغّل اختبار البداية إلى النهاية.</li>
</ul>
<h3 id="56-التسليم-المستمر">5.6 التسليم المستمر</h3>
<ul>
<li>طبّق أفضل الممارسات في CD.</li>
</ul>
<hr>
<h2 id="المرحلة-6">المرحلة 6 <span class="content-anchor" id="phase-6"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-06">التحسين - واصل التحسّن</a></p>
<p>هذه المرحلة عبارة عن تحسينات حرّة يحدّدها المستخدم، أي أنّ التحسينات قد تتعلّق بأي جزء من المشروع.</p>
<p>في ما يلي بعض الاقتراحات الموصى بها بشدّة:</p>
<ul>
<li>انشر التطبيق بأسلوب GitOps التصريحي باستخدام <a href="https://argo-cd.readthedocs.io/en/stable/getting_started/">Argo CD</a>.</li>
<li>استعدّ للإنتاج بإعداد DNS (<a href="https://kubernetes-sigs.github.io/external-dns/">ExternalDNS</a>) والشهادات (<a href="https://cert-manager.io/">Cert-Manager</a>).</li>
<li>أتمت تحديثات الاعتماديات باستخدام <a href="https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide">Dependabot</a>.</li>
<li>انقل جميع الخدمات الخارجية (مثل Grafana.com وTerraform Cloud) إلى عنقود Kubernetes باستخدام حلول مفتوحة المصدر.</li>
</ul>
<p>وفي ما يلي بعض الاقتراحات الإضافية:</p>
<ul>
<li>أعدّ <a href="https://kyverno.io/">Kyverno</a> للسياسة كشيفرة (Policy as Code).</li>
<li>ابنِ عناقيد Kubernetes متعدّدة البيئات (Dev وStage وProd) باستخدام Terraform وKustomize.</li>
<li>استخدم <a href="https://testkube.io/">TestKube</a> لتنفيذ اختبارات أفضل.</li>
<li>طوّر Kubernetes Operator للتعامل مع عمليات التطبيق (تلميح: <a href="https://tech.aabouzaid.com/2020/03/introduction-to-kubernetes-operators-presentation.html">مقدّمة إلى Kubernetes Operators</a>).</li>
</ul>
<hr>
<h2 id="المرحلة-7">المرحلة 7 <span class="content-anchor" id="phase-7"></span></h2>
<p>وحدة خارطة الطريق: <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-07">مشروع التخرّج</a></p>
<p>في هذه المرحلة، ستصمّم وتنفّذ مشروعك الخاص على غرار مشروع HiveBox، لكن بفكرة وحزمة تقنيات تختارها أنت. اطّلع على صفحة <a href="/arabic-cs-library/book/devops-roadmap/foundations/module-07">مشروع التخرّج</a> لمزيد من التفاصيل.</p>
`,s={book:n,chapter:e,chapterTitle:i,slug:t,title:l,headings:a,html:o};export{n as book,e as chapter,i as chapterTitle,s as default,a as headings,o as html,t as slug,l as title};
