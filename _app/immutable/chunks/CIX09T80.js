const n="devops-roadmap",t="foundations",i="الأساسيات",e="module-03",s="الانطلاق - إرساء القاعدة",o=[{depth:2,id:"نظرة-عامة-على-الوحدة",text:"نظرة عامة على الوحدة"},{depth:2,id:"31-التخطيط-تحديد-الأهداف-والمتطلبات",text:"3.1 التخطيط - تحديد الأهداف والمتطلبات"},{depth:3,id:"الجمهور",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر",text:"المصادر"},{depth:2,id:"32-البرمجة-الوحدات-وإعادة-الاستخدام",text:"3.2 البرمجة - الوحدات وإعادة الاستخدام"},{depth:3,id:"الجمهور-1",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-1",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-1",text:"المصادر"},{depth:2,id:"33-البرمجة-الاختبار-وضمان-الجودة",text:"3.3 البرمجة - الاختبار وضمان الجودة"},{depth:3,id:"الجمهور-2",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-2",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-2",text:"المصادر"},{depth:2,id:"34-البرمجة-كتابة-اختبارات-الوحدة",text:"3.4 البرمجة - كتابة اختبارات الوحدة"},{depth:3,id:"الجمهور-3",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-3",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-3",text:"المصادر"},{depth:2,id:"35-الحاويات-أفضل-ممارسات-docker",text:"3.5 الحاويات - أفضل ممارسات Docker"},{depth:3,id:"الجمهور-4",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-4",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-4",text:"المصادر"},{depth:2,id:"36-التكامل-المستمر-مقدمة-وحلول-السوق",text:"3.6 التكامل المستمر - مقدمة وحلول السوق"},{depth:3,id:"الجمهور-5",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-5",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-5",text:"المصادر"},{depth:2,id:"37-التكامل-المستمر-أساسيات-github-actions",text:"3.7 التكامل المستمر - أساسيات GitHub Actions"},{depth:3,id:"الجمهور-6",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-6",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-6",text:"المصادر"},{depth:2,id:"38-التكامل-المستمر-خطوط-الأنابيب-وبوابات-الجودة",text:"3.8 التكامل المستمر - خطوط الأنابيب وبوابات الجودة"},{depth:3,id:"الجمهور-7",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-7",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-7",text:"المصادر"},{depth:2,id:"الاختبار",text:"الاختبار"},{depth:2,id:"التطبيق-العملي",text:"التطبيق العملي"},{depth:2,id:"أسئلة-المقابلات",text:"أسئلة المقابلات"}],a=`<h1>الانطلاق - إرساء القاعدة</h1>
<h2 id="نظرة-عامة-على-الوحدة">نظرة عامة على الوحدة <span class="content-anchor" id="module-overview"></span></h2>
<ul>
<li>حدّد الأهداف، ورتّب المتطلبات حسب الأولوية، واستكشف وحدات الشيفرة (modularity)، ثم انتقل إلى الاختبار وضمان الجودة.</li>
<li>نفّذ اختبارات الوحدة، واتبع أفضل ممارسات Docker، واستكشف بوابات الجودة في التكامل المستمر مع GitHub Actions.</li>
<li>نفّذ المشروع العملي التدريجي HiveBox المرحلة 3.</li>
</ul>
<div class="callout callout--tip">
<p><strong>تلميح — مجالات التركيز</strong></p>
<p>التخطيط (12.5%)، البرمجة (37.5%)، الحاويات (12.5%)، التكامل المستمر (CI) (37.5%)</p>
</div>
<h2 id="31-التخطيط-تحديد-الأهداف-والمتطلبات">3.1 التخطيط - تحديد الأهداف والمتطلبات <span class="content-anchor" id="31-planning---define-goals-and-requirements"></span></h2>
<h3 id="الجمهور">الجمهور <span class="content-anchor" id="31-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> جميع الأدوار (بما فيها أدوار DevOps والبرمجيات وغيرها)</p>
<h3 id="ما-تحتاج-إلى-معرفته">ما تحتاج إلى معرفته <span class="content-anchor" id="31-what-you-need-to-know"></span></h3>
<ul>
<li>الخطوة الأولى في العمل هي التخطيط، الذي يبدأ بتحديد الأهداف والمتطلبات.</li>
<li>قرّر أيّ منهجية أجايل ستستخدم. (Scrum أو Kanban أو Scrumban، إلخ). لنلتزم بـ Kanban.</li>
<li>وثّق أثناء العمل. افترض دائمًا أنّ شخصًا آخر سيقرأ مشروعك في أي طور.</li>
<li>تجنّب <code>تضخّم النطاق</code> (Scope Creep)! اجعله يعمل، ثم اجعله صحيحًا، ثم اجعله سريعًا!</li>
<li>لا تنسَ! أنت <code>مدير نفسك</code> (Managers of One)! وهنا أقتبس من <a href="https://signalvnoise.com/posts/1430-hire-managers-of-one">Signal v. Noise</a>: &quot;مدير النفس هو شخص يضع أهدافه الخاصة وينفّذها. لا يحتاج إلى توجيه ثقيل. ولا يحتاج إلى متابعة يومية&quot;.</li>
</ul>
<h3 id="المصادر">المصادر <span class="content-anchor" id="31-resources"></span></h3>
<ul>
<li><a href="https://businessmap.io/agile/project-management">ما هي إدارة المشاريع بأسلوب أجايل؟ - Businessmap</a></li>
<li><a href="https://www.pmi.org/learning/library/top-five-causes-scope-creep-6675">أهم خمسة أسباب لتضخّم النطاق وما يمكن فعله حيالها - Project Management Institute</a></li>
<li><a href="https://handbook.gitlab.com/handbook/leadership/#managers-of-one">القيادة - مديرو أنفسهم - دليل GitLab</a></li>
</ul>
<h2 id="32-البرمجة-الوحدات-وإعادة-الاستخدام">3.2 البرمجة - الوحدات وإعادة الاستخدام <span class="content-anchor" id="32-code---modularity-and-reusability"></span></h2>
<h3 id="الجمهور-1">الجمهور <span class="content-anchor" id="32-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-1">ما تحتاج إلى معرفته <span class="content-anchor" id="32-what-you-need-to-know"></span></h3>
<ul>
<li>تقسيم شيفرة البرمجيات إلى وحدات أصغر وقائمة بذاتها له فوائد كثيرة، منها فصل الاهتمامات (separation of concerns) والتغليف (encapsulation) والتطوير والاختبار المستقلّين.</li>
<li>لكن ينبغي أن توازن دائمًا بين الوحدات وتجنّب الهندسة المفرطة (over-engineering). فإن كانت الشيفرة صغيرة أصلًا، فلا حاجة إلى تقسيمها إلى وحدات دقيقة.</li>
<li>وحتى في الشيفرة الصغيرة، استهدف دائمًا الوضوح والبساطة. وفكّر في الشخص التالي الذي سيعمل على تلك الشيفرة (وهو في حالات كثيرة نسخة مستقبلية منك!) وتذكّر دائمًا أنّ <code>الشيفرة تُقرأ أكثر مما تُكتب</code>!</li>
<li>لا يهمّ أيّ لغة تستخدم، نصّ Bash أو لغة برمجة حقيقية، فطبّق المبادئ نفسها دائمًا.</li>
<li>وكمهندس DevOps، فإنّ إعادة الاستخدام مهمّة للغاية بالنسبة لك، ليس على المستوى العملي فحسب بل كطريقة تفكير أيضًا.</li>
</ul>
<h3 id="المصادر-1">المصادر <span class="content-anchor" id="32-resources"></span></h3>
<ul>
<li><a href="https://devops.com/taking-the-modular-route/">اتّخاذ المسار المعياري - DevOps.com</a>: يتيح استخدام مقاربة معيارية (قائمة على الوحدات) في البرمجة وDevOps عمومًا تطويرًا أسرع وتحديثات أسهل واستكشافًا أبسط للأعطال.</li>
<li><a href="https://peps.python.org/pep-0020/">زِن Python</a>: لدى Python بعض المبادئ التوجيهية الرائعة للمطوّرين يمكن تطبيقها على أي شيفرة.</li>
</ul>
<h2 id="33-البرمجة-الاختبار-وضمان-الجودة">3.3 البرمجة - الاختبار وضمان الجودة <span class="content-anchor" id="33-code---testing-and-quality-assurance"></span></h2>
<h3 id="الجمهور-2">الجمهور <span class="content-anchor" id="33-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-2">ما تحتاج إلى معرفته <span class="content-anchor" id="33-what-you-need-to-know"></span></h3>
<ul>
<li>هدف الاختبار وضمان الجودة (QA) في البرمجيات هو التأكّد من أنّ البرمجيات تلبي المتطلبات وأنها خالية من العيوب قدر الإمكان.</li>
<li>تقنيًّا، <code>الاختبار</code> (Testing) و<code>ضمان الجودة</code> (QA) شيئان مختلفان، لكنهما يُستخدمان عادةً بالتبادل.</li>
<li>عادةً يوجد مختصّ مخصّص يتولّى ضمان الجودة في دورة حياة تطوير البرمجيات (SDLC)، ويتعاون معه مهندسو DevOps، وقد يكون الاختبار يدويًّا أو مؤتمتًا.</li>
<li>ولكن كمهندس DevOps أيضًا، تحتاج إلى تطبيق ضمان الجودة على شيفرتك وأدواتك الخاصة.</li>
<li>للاختبار أنواع كثيرة، يخدم كل منها أغراضًا مختلفة، مثل:
<ul>
<li><strong>اختبار الوحدات (Unit Testing):</strong> اختبار المكوّنات أو الوحدات الفردية للبرمجيات للتأكّد من أنها تعمل بشكل صحيح بمعزل عن غيرها.</li>
<li><strong>اختبار التكامل (Integration Testing):</strong> اختبار التفاعل بين الوحدات/المكوّنات المتكاملة للتأكّد من أنها تعمل معًا كما هو متوقّع.</li>
<li><strong>الاختبار من البداية إلى النهاية (End-to-end Testing):</strong> اختبار البرمجيات الكاملة والمتكاملة للتحقّق من أنها تلبي المتطلبات المحدّدة من البداية إلى النهاية.</li>
<li><strong>اختبار القبول (Acceptance Testing):</strong> التحقّق من البرمجيات مقابل متطلبات المستخدم وتحديد ما إذا كانت جاهزة للإصدار. وكثيرًا ما يتضمّن ذلك اختبارًا تجريبيًّا (beta testing) مع مستخدمين حقيقيين.</li>
<li><strong>اختبار الانحدار (Regression Testing):</strong> إعادة اختبار البرمجيات بعد التغييرات (مثل إصلاحات العلل أو الميزات الجديدة) للتأكّد من عدم تعطّل الوظائف القائمة.</li>
<li><strong>اختبار الأداء (Performance Testing):</strong> تقييم أداء البرمجيات في ظروف مختلفة، مثل اختبار الحِمل (load testing) واختبار الإجهاد (stress testing).</li>
<li><strong>اختبار الأمان (Security Testing):</strong> تحديد الثغرات والتأكّد من أنّ البرمجيات آمنة ضد التهديدات المحتملة.</li>
</ul>
</li>
<li>توجد أيضًا أنواع أخرى من الاختبارات لا تتعلّق بالجودة مثل <strong>اختبار A/B</strong>، الذي يعرض نسختين مختلفتين من البرمجيات لتحديد أيّ نسخة تحقّق أفضل النتائج واستخدام تلك المعلومات لاتخاذ قرارات مبنية على البيانات لتحسين تجربة المستخدم وتحقيق أهداف العمل.</li>
</ul>
<h3 id="المصادر-2">المصادر <span class="content-anchor" id="33-resources"></span></h3>
<ul>
<li><a href="https://www.browserstack.com/guide/quality-assurance-vs-testing">ضمان الجودة مقابل الاختبار - BrowserStack</a>: رغم أنهما يُستخدمان عادةً بالتبادل، فمن الجيد فهم الفرق الفعلي بينهما.</li>
<li><a href="https://smartbear.com/blog/devops-testing-strategy-best-practices-tools/">استراتيجية اختبار DevOps - SmartBear</a>: مقال مفصّل عن تطوير استراتيجية اختبار DevOps، والفوائد، وأفضل الممارسات، والأدوات.</li>
</ul>
<h2 id="34-البرمجة-كتابة-اختبارات-الوحدة">3.4 البرمجة - كتابة اختبارات الوحدة <span class="content-anchor" id="34-code---writing-unit-tests"></span></h2>
<h3 id="الجمهور-3">الجمهور <span class="content-anchor" id="34-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-3">ما تحتاج إلى معرفته <span class="content-anchor" id="34-what-you-need-to-know"></span></h3>
<ul>
<li>كما ذُكر من قبل، يركّز <strong>اختبار الوحدة (Unit Testing)</strong> على اختبار المكوّنات أو الوحدات أو الدوال/الطرق الفردية في الشيفرة للتأكّد من أنها تعمل بشكل صحيح بمعزل عن غيرها.</li>
<li>يُعدّ فهم اختبار الوحدة عمومًا أمرًا جوهريًّا، وكمهندس DevOps ينبغي أن تكون قادرًا على كتابة اختبارات الوحدة بلغة البرمجة الرئيسية لديك.</li>
<li>يُعدّ اختبار وحدة أي شيفرة نقطة دخول جيدة لفهم أي شيفرة جديدة.</li>
<li>في معظم الأحيان لا تكتب اختبارات الوحدة بالشيفرة الأصلية بل باستخدام إطار عمل أو مكتبة مخصّصة لذلك.</li>
<li>ينبغي أن يغطّي اختبار الوحدة معظم شيفرتك، لكنّ تغطية اختبار الوحدة بنسبة 100% غير واقعية عادةً ولا تقدّم قيمة كبيرة.</li>
<li>تذكّر دائمًا أنّ اختبار الوحدة شيفرة مساعدة تُكتب للتأكّد من أنّ الشيفرة الرئيسية تعمل كما هو متوقّع، ومن ثمّ ينبغي أن تكون شيفرة اختبار الوحدة بالغة البساطة ولا تحتوي على منطق كثير.</li>
</ul>
<h3 id="المصادر-3">المصادر <span class="content-anchor" id="34-resources"></span></h3>
<ul>
<li><a href="https://codefresh.io/learn/unit-testing/">اختبار الوحدة: المبادئ والفوائد و6 من أفضل الممارسات السريعة - Codefresh</a></li>
<li><a href="https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters">اختبار الوحدة والبرمجة: لماذا تهمّ الشيفرة القابلة للاختبار</a></li>
</ul>
<h2 id="35-الحاويات-أفضل-ممارسات-docker">3.5 الحاويات - أفضل ممارسات Docker <span class="content-anchor" id="35-containers---docker-best-practices"></span></h2>
<h3 id="الجمهور-4">الجمهور <span class="content-anchor" id="35-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-4">ما تحتاج إلى معرفته <span class="content-anchor" id="35-what-you-need-to-know"></span></h3>
<ul>
<li>في الوحدة السابقة غطّينا أساسيات Docker. وفي هذه المرحلة، ينبغي أن تبدأ بتطبيق أفضل ممارسات Docker والحاويات.</li>
<li>عمومًا، وكحال كل أفضل الممارسات، لست بحاجة إلى حفظها، بل ابدأ دائمًا بأداة تساعدك على التحقّق من أفضل الممارسات الشائعة.</li>
<li><a href="https://github.com/hadolint/hadolint">Hadolint</a> من مدقّقات (linters) ملفات Dockerfile الشائعة. وهو يتكامل أيضًا مع بيئات تطوير متكاملة (IDEs) مختلفة مثل <a href="https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint">VS Code</a>.</li>
<li>في ما يلي بعض الفئات الرئيسية لأفضل الممارسات (اطّلع على المصادر للقائمة الكاملة):
<ul>
<li>الشائعة</li>
<li>الخاصة بلغة معيّنة</li>
<li>الأمان</li>
<li>ملف الحاوية</li>
<li>صورة الحاوية</li>
<li>بيئة تشغيل الحاوية</li>
</ul>
</li>
</ul>
<h3 id="المصادر-4">المصادر <span class="content-anchor" id="35-resources"></span></h3>
<ul>
<li><a href="https://docs.docker.com/build/building/best-practices/">أفضل ممارسات بناء Dockerfile - Docker Docs</a></li>
<li><a href="https://tech.aabouzaid.com/2021/09/docker-best-practices-workshop-presentation.html">ورشة أفضل ممارسات Docker - Ahmed AbouZaid</a></li>
</ul>
<h2 id="36-التكامل-المستمر-مقدمة-وحلول-السوق">3.6 التكامل المستمر - مقدمة وحلول السوق <span class="content-anchor" id="36-continuous-integration---introduction-and-solutions-in-the-market"></span></h2>
<h3 id="الجمهور-5">الجمهور <span class="content-anchor" id="36-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-5">ما تحتاج إلى معرفته <span class="content-anchor" id="36-what-you-need-to-know"></span></h3>
<ul>
<li>بعبارات بسيطة، <code>التكامل المستمر</code> (Continuous Integration) ممارسة تُدمَج فيها تغييرات الشيفرة بانتظام في مستودع مشترك، ويُشغّل كل دمج عملية بناء واختبار مؤتمتة، ما يتيح للفرق اكتشاف الأخطاء بسرعة، وضمان جودة الشيفرة، وتسهيل تكامل الميزات الجديدة.</li>
<li>توجد أنظمة تكامل مستمر (CI) مختلفة مثل Jenkins وGitHub Actions وGitLab CI وغيرها.</li>
<li>لا يهمّ النظام ما دمت تفهم مبادئ التكامل المستمر.</li>
<li>لكن <strong>لا تبدأ بـ Jenkins! فلا أحد يتعلّم القيادة باستخدام دبّابة!</strong> ابدأ بشيء أكثر مباشرة مثل GitHub Actions.</li>
<li>التكامل المستمر ممارسة حاسمة في تطوير البرمجيات الحديث لجودة شيفرة أفضل وسرعة تسليم أكبر.</li>
</ul>
<h3 id="المصادر-5">المصادر <span class="content-anchor" id="36-resources"></span></h3>
<ul>
<li><a href="https://github.com/resources/articles/devops/continuous-integration">أساسيات التكامل المستمر في DevOps - GitHub</a></li>
<li><a href="https://www.atlassian.com/continuous-delivery/continuous-integration">ما هو التكامل المستمر؟ - Atlassian</a></li>
<li><a href="https://codefresh.io/learn/ci-cd/7-ci-cd-concepts-you-must-know/">7 مفاهيم في CI/CD يجب أن تعرفها - Codefresh</a></li>
</ul>
<h2 id="37-التكامل-المستمر-أساسيات-github-actions">3.7 التكامل المستمر - أساسيات GitHub Actions <span class="content-anchor" id="37-continuous-integration---github-actions-essentials"></span></h2>
<h3 id="الجمهور-6">الجمهور <span class="content-anchor" id="37-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-6">ما تحتاج إلى معرفته <span class="content-anchor" id="37-what-you-need-to-know"></span></h3>
<ul>
<li>كما ذُكر في القسم السابق، ابدأ بمنصّة تكامل مستمر مباشرة وتجنّب Jenkins في البداية! فـ Jenkins قوي جدًّا بحيث لا يصلح كنقطة بداية، وستجد نفسك تتعامل مع مجالات كثيرة تتعلّق بـ Jenkins نفسه أكثر ممّا تتعلّق بالتكامل المستمر كمفهوم.</li>
<li>لهذا السبب، يُعدّ GitHub Actions بداية رائعة. فهو منصّة قوية مدمجة مباشرة في GitHub، وتتيح للمهندسين أتمتة مسارات عملهم، بما يشمل بناء الشيفرة واختبارها ونشرها.</li>
<li>لـ GitHub Actions المفاهيم الجوهرية التالية:
<ul>
<li><strong>مسارات العمل (Workflows):</strong> بيان YAML الرئيسي الذي يؤتمت عمليات مثل بناء الشيفرة واختبارها. وتتكوّن من مهمة واحدة أو أكثر يمكن أن تعمل بالتوازي أو بالتسلسل.</li>
<li><strong>المهام (Jobs):</strong> المهمة مجموعة من الخطوات تُنفَّذ على الجهاز نفسه. ويمكن أن تعمل المهام على أنواع مختلفة من الأجهزة (مثل Ubuntu وmacOS وWindows).</li>
<li><strong>الخطوات (Steps):</strong> مهام فردية داخل المهمة. ويمكن أن تتضمّن الخطوات إجراءات (actions، وهي وحدات قابلة لإعادة الاستخدام) أو أوامر صدفة مخصّصة.</li>
<li><strong>الإجراءات (Actions):</strong> قطع شيفرة قابلة لإعادة الاستخدام تؤدّي مهام محدّدة. فكّر في Actions كإضافات (extensions) أو ملحقات (plugins). ويمكنك الحصول عليها من <a href="https://github.com/marketplace?type=actions">GitHub Marketplace</a>.</li>
<li><strong>المُشغّلات (Runners):</strong> خوادم تشغّل مسارات العمل. ويوفّر GitHub هذه المُشغّلات لك مع بعض القيود، لكن يمكنك أيضًا استضافة المُشغّلات بنفسك لتحكّم أكبر.</li>
</ul>
</li>
<li>تذكّر دائمًا أنّ الخطوات في GHA تتسلسل، وأنّ المهام متوازية افتراضيًّا لكنها قد تكون متسلسلة أيضًا بضبط الاعتماديات بين المهام. لكن كل مهمة تعمل على جهازها الخاص وتحتاج إلى خطوات إضافية لمشاركة المعلومات بينها.</li>
</ul>
<h3 id="المصادر-6">المصادر <span class="content-anchor" id="37-resources"></span></h3>
<ul>
<li><a href="https://docs.github.com/en/actions/quickstart">بداية سريعة لـ GitHub Actions - GitHub Docs</a></li>
<li><a href="https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/">كيف تبني خطّ أنابيب CI/CD باستخدام GitHub Actions في أربع خطوات بسيطة - GitHub Blog</a></li>
</ul>
<h2 id="38-التكامل-المستمر-خطوط-الأنابيب-وبوابات-الجودة">3.8 التكامل المستمر - خطوط الأنابيب وبوابات الجودة <span class="content-anchor" id="38-continuous-integration---pipelines-and-quality-gates"></span></h2>
<h3 id="الجمهور-7">الجمهور <span class="content-anchor" id="38-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-7">ما تحتاج إلى معرفته <span class="content-anchor" id="38-what-you-need-to-know"></span></h3>
<ul>
<li>كما ذُكر من قبل، تُنشأ خطوط أنابيب التكامل المستمر (CI) لضمان جودة شيفرتك (أي شيفرة، بما يشمل لغة برمجة أو نصًّا بسيطًا أو شيفرة بنية تحتية مثل ملفات Dockerfile أو بيانات Kubernetes الوصفية).</li>
<li>فكرة بوابات الجودة هي وجود بعض الإجراءات المفروضة للتأكّد من أنّ أي تغييرات تستوفي معايير معيّنة قبل الدمج أو الانتقال إلى الخطوات التالية.</li>
<li>في أيامنا هذه، ينبغي أن يكون لدى 100% من المشاريع خطّ أنابيب تكامل مستمر بسيط على الأقل يتضمّن <code>التدقيق</code> (linting) و<code>نمط الشيفرة</code> (code style)، وربما أداة <code>أمان</code> (security) إضافة إلى خطوات <code>البناء</code> (build) المعتادة لإنشاء المخرجات (artifact) مثل صورة Docker أو ما شابه.</li>
<li>يُوصى باستخدام منصّة التكامل المستمر مثل GitHub Actions أو Jenkins <strong>كمُشغّل (runner) فحسب</strong>، وهذا يعني أنّه ينبغي أن يكون ممكنًا تشغيل كل ما في خطّ أنابيب CI محليًّا أيضًا. ويستخدم كثير من الناس أدوات مثل <code>Make</code> لذلك، لكن توجد أدوات حديثة مثل <a href="https://taskfile.dev/">Task</a>.</li>
<li>كما ينبغي تشغيل بوابات الجودة تلك (الجوهرية والسريعة على الأقل) محليًّا حتى قبل الدفع إلى المستودع البعيد لتجنّب تنفيذ غير ضروري لخطوط أنابيب CI. ويمكن فعل ذلك عبر خطافات Git الأصلية (Git hooks) أو أداة مثل <a href="https://pre-commit.com/">pre-commit</a>، وهي إطار عمل لإدارة خطافات ما قبل الالتزام (pre-commit hooks) متعدّدة اللغات وصيانتها.</li>
</ul>
<h3 id="المصادر-7">المصادر <span class="content-anchor" id="38-resources"></span></h3>
<ul>
<li><a href="https://www.infoq.com/articles/pipeline-quality-gates/">أهمية بوابات الجودة في خطوط الأنابيب وكيفية تنفيذها - InfoQ</a></li>
</ul>
<h2 id="الاختبار">الاختبار <span class="content-anchor" id="quiz"></span></h2>
<h2 id="التطبيق-العملي">التطبيق العملي <span class="content-anchor" id="hands-on"></span></h2>
<p>اتبع التعليمات في <a href="/arabic-cs-library/book/devops-roadmap/projects/hivebox#phase-3">المرحلة 3 من مشروع HiveBox</a>.</p>
<h2 id="أسئلة-المقابلات">أسئلة المقابلات <span class="content-anchor" id="interview-questions"></span></h2>
<p>راجع أسئلة المقابلات المتعلّقة بـ <a href="/arabic-cs-library/book/devops-roadmap/interview/common-questions#module-3">الوحدة 3</a>.</p>
`,l={book:n,chapter:t,chapterTitle:i,slug:e,title:s,headings:o,html:a};export{n as book,t as chapter,i as chapterTitle,l as default,o as headings,a as html,e as slug,s as title};
