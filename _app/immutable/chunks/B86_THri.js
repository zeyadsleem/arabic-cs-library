const n="devops-roadmap",e="foundations",t="الأساسيات",o="module-02",i="الأساسيات - جوهر DevOps",s=[{depth:2,id:"نظرة-عامة-على-الوحدة",text:"نظرة عامة على الوحدة"},{depth:2,id:"21-البرمجة-أساسيات-python",text:"2.1 البرمجة - أساسيات Python"},{depth:3,id:"الجمهور",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر",text:"المصادر"},{depth:2,id:"22-البرمجة-أدوات-التطوير-الشائعة",text:"2.2 البرمجة - أدوات التطوير الشائعة"},{depth:3,id:"الجمهور-1",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-1",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-1",text:"المصادر"},{depth:2,id:"23-البرمجة-أساسيات-git",text:"2.3 البرمجة - أساسيات Git"},{depth:3,id:"الجمهور-2",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-2",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-2",text:"المصادر"},{depth:2,id:"24-نظام-التشغيل-أساسيات-linux",text:"2.4 نظام التشغيل - أساسيات Linux"},{depth:3,id:"الجمهور-3",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-3",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-3",text:"المصادر"},{depth:2,id:"25-نظام-التشغيل-الأدوات-والأوامر-الشائعة",text:"2.5 نظام التشغيل - الأدوات والأوامر الشائعة"},{depth:3,id:"الجمهور-4",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-4",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-4",text:"المصادر"},{depth:2,id:"26-نظام-التشغيل-أساسيات-البرمجة-النصية-بـ-bash",text:"2.6 نظام التشغيل - أساسيات البرمجة النصية بـ Bash"},{depth:3,id:"الجمهور-5",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-5",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-5",text:"المصادر"},{depth:2,id:"27-الحاويات-أساسيات-docker",text:"2.7 الحاويات - أساسيات Docker"},{depth:3,id:"الجمهور-6",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-6",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-6",text:"المصادر"},{depth:2,id:"28-الحاويات-أساسيات-واجهة-أوامر-docker-docker-cli",text:"2.8 الحاويات - أساسيات واجهة أوامر Docker (Docker CLI)"},{depth:3,id:"الجمهور-7",text:"الجمهور"},{depth:3,id:"ما-تحتاج-إلى-معرفته-7",text:"ما تحتاج إلى معرفته"},{depth:3,id:"المصادر-7",text:"المصادر"},{depth:2,id:"الاختبار",text:"الاختبار"},{depth:2,id:"التطبيق-العملي",text:"التطبيق العملي"},{depth:2,id:"أسئلة-المقابلات",text:"أسئلة المقابلات"}],a=`<h1>الأساسيات - جوهر DevOps</h1>
<h2 id="نظرة-عامة-على-الوحدة">نظرة عامة على الوحدة <span class="content-anchor" id="module-overview"></span></h2>
<ul>
<li>تعلّم أساسيات Python وأدوات التطوير الشائعة وأساسيات Git.</li>
<li>اكتسب أساسيات Linux والأدوات الشائعة ومهارات البرمجة النصية بـ Bash.</li>
<li>غطِّ أساسيات Docker والحاويات.</li>
<li>نفّذ المشروع العملي التدريجي HiveBox المرحلة 2.</li>
</ul>
<div class="callout callout--tip">
<p><strong>تلميح — مجالات التركيز</strong></p>
<p>البرمجة (40%)، نظام التشغيل (40%)، الحاويات (20%)</p>
</div>
<h2 id="21-البرمجة-أساسيات-python">2.1 البرمجة - أساسيات Python <span class="content-anchor" id="21-code---python-fundamentals"></span></h2>
<h3 id="الجمهور">الجمهور <span class="content-anchor" id="21-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته">ما تحتاج إلى معرفته <span class="content-anchor" id="21-what-you-need-to-know"></span></h3>
<ul>
<li>كبداية، تحتاج إلى تعلّم لغة برمجة حقيقية.</li>
<li>Python بداية جيدة، وهي من أشهر لغات البرمجة اليوم.</li>
<li>تعلّم الأساسيات مثل أنواع البيانات والتحكّم في التدفّق والحلقات والدوال.</li>
<li>لكن الفكرة ليست مجرّد تعلّم الصياغة (syntax) بل تبنّي عقلية المطوّر أيضًا (أي لا تكتب شيفرة Python كما تكتب نصوص Bash!).</li>
<li>ستُغطّى مواضيع أكثر تقدّمًا في الوحدات التالية.</li>
</ul>
<div class="callout callout--tip">
<p><strong>تلميح</strong></p>
<p>إن كنت آتيًا من خلفية تطوير، يمكنك استخدام أي لغة تعرفها. ويظلّ Python أو Golang موصى بهما.</p>
</div>
<h3 id="المصادر">المصادر <span class="content-anchor" id="21-resources"></span></h3>
<ul>
<li><a href="https://www.codecademy.com/learn/learn-python">تعلّم Python - Codecademy</a>: تعلّم تفاعلي خطوة بخطوة لاكتساب المعرفة الأساسية بـ Python (الدورة مخصّصة لـ Python 2، لكن لا بأس).</li>
<li><a href="https://exercism.org/tracks/python">مسار Python - Exercism</a>: أكثر من 130 تمرينًا مجمَّعة في 16 مفهومًا من Python مع تحليل للشيفرة (أكمل <code>تمرين التعلّم</code> (Learning Exercise) فقط).</li>
</ul>
<h2 id="22-البرمجة-أدوات-التطوير-الشائعة">2.2 البرمجة - أدوات التطوير الشائعة <span class="content-anchor" id="22-code---common-development-tools"></span></h2>
<h3 id="الجمهور-1">الجمهور <span class="content-anchor" id="22-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-1">ما تحتاج إلى معرفته <span class="content-anchor" id="22-what-you-need-to-know"></span></h3>
<p>شكل توضيحي: حلقة DevOps.</p>
<ul>
<li>حين تكتب الشيفرة، فأنت لا تستخدم محرّر نصوص فحسب بل محرّر شيفرة (وربما بيئة تطوير متكاملة IDE أيضًا).</li>
<li>أدوات التطوير ترفع الإنتاجية، وتُبسّط عملية التطوير، وترفع جودة الشيفرة.</li>
<li>من الميزات الشائعة في أدوات التطوير تمييز الصياغة (syntax highlighting)، وإكمال الشيفرة، والتنقّل في الشيفرة، وتصحيح الأخطاء (debugging).</li>
<li>عبر خارطة الطريق هذه، ستكتسب مزيدًا من الأدوات التي تساعدك في عملك اليومي.</li>
</ul>
<h3 id="المصادر-1">المصادر <span class="content-anchor" id="22-resources"></span></h3>
<ul>
<li><a href="https://code.visualstudio.com/">Visual Studio Code</a>: محرّر الشيفرة الرئيسي الذي سيُستخدم في خارطة الطريق هذه.</li>
<li><a href="https://code.visualstudio.com/docs/python/python-tutorial">البدء مع Python في VS Code</a>: كيفية استخدام VS Code كأداة تطوير لـ Python.</li>
<li><a href="https://marketplace.visualstudio.com/items?itemName=ms-python.python">إضافة Python لـ Visual Studio Code</a>: إضافة VS Code توفّر ميزات أساسية لـ Python مثل الإكمال التلقائي وفحص الصياغة، إلخ.</li>
</ul>
<h2 id="23-البرمجة-أساسيات-git">2.3 البرمجة - أساسيات Git <span class="content-anchor" id="23-code---git-basics"></span></h2>
<h3 id="الجمهور-2">الجمهور <span class="content-anchor" id="23-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-2">ما تحتاج إلى معرفته <span class="content-anchor" id="23-what-you-need-to-know"></span></h3>
<ul>
<li>حين تنشئ الشيفرة، تحتاج إلى تخزينها في مكان آمن باستخدام نظام إدارة الشيفرة المصدرية (Source Code Management, SCM).</li>
<li>من أنظمة SCM المعروفة <a href="https://git-scm.com/">Git</a>، وهو مستخدم على نطاق واسع الآن عبر منصّات كثيرة مثل GitHub وGitLab.</li>
<li>تحتاج إلى فهم أساسيات Git مثل المستودع (repository) والفرع (branch) والسحب (pull) والدفع (push) والالتزام (commit) وغيرها، لأنك ستستخدمها كل يوم تقريبًا.</li>
<li>لا يقتصر فهم Git على التطوير فقط، بل تعتمد عليه أيضًا مسارات عمل كثيرة كمصدر حقيقة وحيد (Source of Truth) مثل <code>GitOps</code> (وسيُغطّى ذلك في الوحدات التالية).</li>
</ul>
<h3 id="المصادر-2">المصادر <span class="content-anchor" id="23-resources"></span></h3>
<ul>
<li><a href="https://rogerdudler.github.io/git-guide/">Git، الدليل المبسّط</a>: دليل مرئي خطوة بخطوة للبدء مع Git.</li>
<li><a href="https://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf">ورقة مرجعية لأوامر Git</a>: مرجع سريع لأوامر Git.</li>
<li><a href="https://www.atlassian.com/git">إتقان Git - Atlassian</a>: دليل مفصّل لـ Git مع كثير من الدروس والنصائح.</li>
</ul>
<h2 id="24-نظام-التشغيل-أساسيات-linux">2.4 نظام التشغيل - أساسيات Linux <span class="content-anchor" id="24-operating-system---linux-fundamentals"></span></h2>
<h3 id="الجمهور-3">الجمهور <span class="content-anchor" id="24-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-3">ما تحتاج إلى معرفته <span class="content-anchor" id="24-what-you-need-to-know"></span></h3>
<ul>
<li>في عالم الخوادم، يسيطر Linux على السوق. لذا من الضروري تعلّم نظام Linux واستخدامه كمهندس DevOps.</li>
<li>وكمهندس DevOps، من غير المرجّح أن تنجح دون معرفة جيدة بـ Linux.</li>
<li>لـ Linux عائلتان رئيسيتان: Debian/Ubuntu وRed Hat/CentOS، ومن الأفضل الالتزام بإحداهما في البداية.</li>
<li>ابدأ باستخدام توزيعة Linux سهلة الاستخدام مثل <a href="https://ubuntu.com/">Ubuntu</a> على حاسوبك المحمول/المكتبي.</li>
<li>فرغم أنه لا يزال ممكنًا للمستخدم إنجاز الكثير باستخدام الواجهة الرسومية (UI)، فإنّ <code>الطرفية صديقتك</code>!</li>
<li>كنقطة بداية، تحتاج على الأقل إلى معرفة <code>بنية الأدلّة</code> (Directory Structure) و<code>الأذونات</code> (Permissions) و<code>عمليات سطر الأوامر</code> (Command Line Operations).</li>
</ul>
<h3 id="المصادر-3">المصادر <span class="content-anchor" id="24-resources"></span></h3>
<ul>
<li><a href="https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux">مقدمة في Linux - LinuxFoundationX</a>: نقطة بداية جيدة للتعوّد على نظام Linux (روّج لهذه الدورة Linus Torvalds، مؤسّس نواة Linux).</li>
<li><a href="https://www.freecodecamp.org/news/introduction-to-linux/">مقدمة في Linux - الفصول 1-6 - freeCodeCamp</a>: مصدر ممتاز لتعلّم كل أساسيات Linux.</li>
</ul>
<h2 id="25-نظام-التشغيل-الأدوات-والأوامر-الشائعة">2.5 نظام التشغيل - الأدوات والأوامر الشائعة <span class="content-anchor" id="25-operating-system---common-tools-and-commands"></span></h2>
<h3 id="الجمهور-4">الجمهور <span class="content-anchor" id="25-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-4">ما تحتاج إلى معرفته <span class="content-anchor" id="25-what-you-need-to-know"></span></h3>
<ul>
<li>كما ذُكر، الطرفية صديقتك! تكمن قوة Linux في الطرفية، وعليك أن تعتاد عليها لأنك ستستخدمها يوميًّا.</li>
<li>تعرّف على أداة الواجهة الرسومية (GUI) للنظام الذي لديك، مثل Ubuntu.</li>
<li>توجد أدوات قليلة تحتاج إلى إتقانها مثل <code>echo</code> و<code>vim</code> و<code>grep</code> و<code>find</code> و<code>top</code> و<code>cut</code> و<code>sort</code> و<code>uniq</code> و<code>less</code> و<code>head</code> و<code>tail</code>.</li>
<li>لست بحاجة إلى حفظ كل الأدوات أو معاملاتها (args)، فكّر فحسب &quot;أي أداة قد تساعدني في فعل ذلك؟&quot; ثم يمكنك دائمًا قراءة توثيقها.</li>
</ul>
<h3 id="المصادر-4">المصادر <span class="content-anchor" id="25-resources"></span></h3>
<ul>
<li><a href="https://www.freecodecamp.org/news/introduction-to-linux/#chapter-7-command-line-operations">مقدمة في Linux - الفصل 7 - freeCodeCamp</a>: يركّز هذا الفصل على عمليات سطر الأوامر وأكثر الأدوات شيوعًا.</li>
<li><a href="https://www.digitalocean.com/community/tutorials/linux-commands">أكثر من 50 أمرًا في Linux يجب أن تعرفها - DigitalOcean</a>: أهم أوامر Linux التي ينبغي أن يعرفها الجميع (لكن دون حفظها!).</li>
<li><a href="https://opensource.com/article/17/7/20-sysadmin-commands">20 أمرًا في Linux ينبغي أن يعرفها كل مسؤول نظام - Opensource.com</a>: مقال آخر عن أدوات سطر أوامر (CLI) مفيدة.</li>
</ul>
<h2 id="26-نظام-التشغيل-أساسيات-البرمجة-النصية-بـ-bash">2.6 نظام التشغيل - أساسيات البرمجة النصية بـ Bash <span class="content-anchor" id="26-operating-system---bash-scripting-basics"></span></h2>
<h3 id="الجمهور-5">الجمهور <span class="content-anchor" id="26-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-5">ما تحتاج إلى معرفته <span class="content-anchor" id="26-what-you-need-to-know"></span></h3>
<ul>
<li>الآن تعرف عشرات من أوامر CLI الفردية، لكن Linux يتيح لك أتمتة مهام كثيرة بمجرّد ربط سلسلة من الأوامر معًا.</li>
<li>في نصوص الصدفة (shell scripts) يمكنك استخدام كل أوامر CLI بالإضافة إلى صياغة مشابهة للغة برمجة من أجل شروط if والحلقات وغيرها من المساعدات.</li>
<li>وحتى لو كنت تعرف لغة برمجة مثل Python، فستظلّ بحاجة إلى نصوص الصدفة وستستخدمها كثيرًا.</li>
<li>توجد صدفات (shells) كثيرة، ولكل منها صياغة مختلفة قليلًا، لكن <code>Bash</code> من أكثرها شيوعًا.</li>
</ul>
<h3 id="المصادر-5">المصادر <span class="content-anchor" id="26-resources"></span></h3>
<ul>
<li><a href="https://exercism.org/tracks/bash">مسار Bash - Exercism</a>: أكثر من 90 تمرينًا بمستويات مختلفة (أكمل المهام السهلة والمتوسطة فقط).</li>
<li><a href="https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/">درس البرمجة النصية بـ Bash – نص صدفة Linux وسطر الأوامر للمبتدئين - freeCodeCamp</a>: دليل جيد ومنظَّم للبدء بالبرمجة النصية بـ Bash.</li>
<li><a href="https://www.datacamp.com/tutorial/how-to-write-bash-script-tutorial">كيف تكتب نصًا بـ Bash - درس مبسّط للبرمجة النصية بـ Bash - DataCamp</a>: دليل بدء مبسّط مع ذكاء اصطناعي مدمج لشرح الشيفرة.</li>
</ul>
<h2 id="27-الحاويات-أساسيات-docker">2.7 الحاويات - أساسيات Docker <span class="content-anchor" id="27-containers---docker-fundamentals"></span></h2>
<h3 id="الجمهور-6">الجمهور <span class="content-anchor" id="27-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-6">ما تحتاج إلى معرفته <span class="content-anchor" id="27-what-you-need-to-know"></span></h3>
<ul>
<li>يمكن تتبّع ثورة الحاويات إلى تقديم Docker في عام 2013 حين ظهر Docker لأول مرة في PyCon.</li>
<li>أصبح تبنّي الحاويات سائدًا منذ فترة، بل إنّ <a href="https://www.cncf.io/reports/cncf-annual-survey-2022/">الحاويات هي القاعدة الجديدة</a>!</li>
<li>وهذا يعني أنّ تحويل تطبيقك إلى حاوية (containerization) ليس خيارًا، بل ضرورة من اليوم الأول!</li>
<li>أولًا، تحتاج إلى فهم لماذا اخترعت الحاويات وما المشكلات التي تحلّها هذه التقنية.</li>
<li>وتحتاج أيضًا إلى فهم العلاقة بين الحاويات وKubernetes (وسيُغطّى ذلك في الوحدات التالية).</li>
<li>لم يعد Docker الأداة الوحيدة للحاويات اليوم، لكننا سنلتزم به في خارطة الطريق هذه.</li>
<li>من المهم فهم الفرق بين Dockerfile وصورة Docker (Docker image) وحاوية Docker (Docker container).</li>
</ul>
<p>شكل توضيحي: العلاقة بين النظام والحاويات والشيفرة.</p>
<h3 id="المصادر-6">المصادر <span class="content-anchor" id="27-resources"></span></h3>
<ul>
<li><a href="https://docs.docker.com/get-started/">دليل البدء - Docker Docs</a>: دليل البدء الرسمي لـ Docker.</li>
<li><a href="https://www.youtube.com/watch?v=zJ6WbK9zFpI">تعلّم Docker في ساعتين - KodeKloud</a>: دورة مكثّفة تغطّي نظرة عامة كاملة على كل أساسيات Docker.</li>
</ul>
<h2 id="28-الحاويات-أساسيات-واجهة-أوامر-docker-docker-cli">2.8 الحاويات - أساسيات واجهة أوامر Docker (Docker CLI) <span class="content-anchor" id="28-containers---docker-cli-basics"></span></h2>
<h3 id="الجمهور-7">الجمهور <span class="content-anchor" id="28-audience"></span></h3>
<p><strong>الجمهور المستهدف:</strong> أدوار DevOps وأدوار البرمجيات</p>
<h3 id="ما-تحتاج-إلى-معرفته-7">ما تحتاج إلى معرفته <span class="content-anchor" id="28-what-you-need-to-know"></span></h3>
<ul>
<li>توجد واجهات رسومية (GUIs) قليلة لـ Docker، لكنك مهندس DevOps، فاعتد على واجهة أوامر Docker (Docker CLI)!</li>
<li>تحتاج إلى معرفة كيفية إنشاء حاويات Docker وتشغيلها وإيقافها وحذفها من واجهة الأوامر.</li>
<li>لن نغطّي Docker Compose في خارطة الطريق هذه لأنّ Kubernetes سيكون محور تركيزنا كمنصّة تنسيق (orchestration). لكن إن احتجت إلى استخدام Docker Compose، فاستخدم الإصدار V2، المدمج الآن في واجهة أوامر Docker <code>docker compose</code>.</li>
</ul>
<h3 id="المصادر-7">المصادر <span class="content-anchor" id="28-resources"></span></h3>
<ul>
<li><a href="https://docs.docker.com/engine/reference/commandline/cli/">استخدام سطر أوامر Docker - Docker Docs</a>: التوثيق الرسمي لواجهة أوامر Docker (Docker CLI). إنه مفيد ومباشر جدًّا.</li>
<li><a href="https://docs.docker.com/get-started/docker_cheatsheet.pdf">ورقة مرجعية لسطر الأوامر - Docker Docs</a>: ورقة مرجعية من صفحة واحدة لأوامر Docker CLI.</li>
<li><a href="https://linuxhandbook.com/essential-docker-commands/">21 أمرًا أساسيًّا ينبغي أن يعرفها كل مستخدم لـ Docker - Linux Handbook</a>: قائمة جيدة أخرى بأوامر Docker CLI الشائعة.</li>
</ul>
<h2 id="الاختبار">الاختبار <span class="content-anchor" id="quiz"></span></h2>
<h2 id="التطبيق-العملي">التطبيق العملي <span class="content-anchor" id="hands-on"></span></h2>
<p>اتبع التعليمات في <a href="/arabic-cs-library/book/devops-roadmap/projects/hivebox#phase-2">المرحلة 2 من مشروع HiveBox</a>.</p>
<h2 id="أسئلة-المقابلات">أسئلة المقابلات <span class="content-anchor" id="interview-questions"></span></h2>
<p>راجع أسئلة المقابلات المتعلّقة بـ <a href="/arabic-cs-library/book/devops-roadmap/interview/common-questions#module-2">الوحدة 2</a>.</p>
`,c={book:n,chapter:e,chapterTitle:t,slug:o,title:i,headings:s,html:a};export{n as book,e as chapter,t as chapterTitle,c as default,s as headings,a as html,o as slug,i as title};
