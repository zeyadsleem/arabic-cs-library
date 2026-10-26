const s="kinney",a="visual-studio-code",n="Visual Studio Code",p="prebuilt-dev-containers-in-vscode",l="حاويات التطوير الجاهزة في Visual Studio Code",t=[{depth:2,id:"الوصول-إلى-التعريفات-الجاهزة",text:"الوصول إلى التعريفات الجاهزة"},{depth:2,id:"العمل-مع-حاويات-التطوير-سير-عمل-تطويرك-اليومي",text:"العمل مع حاويات التطوير: سير عمل تطويرك اليومي"},{depth:3,id:"فتح-مجلد-في-حاوية-الاتصال-ببيئتك",text:"فتح مجلد في حاوية: الاتصال ببيئتك"},{depth:3,id:"بناء-الحاويات-وإعادة-بنائها-تحديث-بيئتك",text:"بناء الحاويات وإعادة بنائها: تحديث بيئتك"},{depth:3,id:"الوصول-إلى-الطرفية-بوابتك-إلى-الحاوية",text:"الوصول إلى الطرفية: بوابتك إلى الحاوية"},{depth:3,id:"تثبيت-الإضافات-تعزيز-بيئة-تطويرك-المحوسة",text:"تثبيت الإضافات: تعزيز بيئة تطويرك المحوَسة"},{depth:3,id:"مشاركة-مساحات-العمل-تطوير-محوس-تعاوني",text:"مشاركة مساحات العمل: تطوير محوَس تعاوني"},{depth:2,id:"تخصيص-حاويات-التطوير-تفصيل-بيئتك-على-مقاسك",text:"تخصيص حاويات التطوير: تفصيل بيئتك على مقاسك"},{depth:3,id:"ملفات-dockerfile-تحكم-دقيق",text:"ملفات Dockerfile: تحكّم دقيق"},{depth:3,id:"ملفات-dotfiles-تخصيص-بيئتك",text:"ملفات dotfiles: تخصيص بيئتك"},{depth:3,id:"قدرات-متقدمة",text:"قدرات متقدّمة"},{depth:2,id:"حل-المشكلات-وأفضل-الممارسات",text:"حلّ المشكلات وأفضل الممارسات"},{depth:3,id:"مشكلات-شائعة",text:"مشكلات شائعة"},{depth:3,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"اعتبارات-أمنية",text:"اعتبارات أمنية"},{depth:2,id:"أمثلة-واقعية-حاويات-التطوير-في-العمل",text:"أمثلة واقعية: حاويات التطوير في العمل"},{depth:3,id:"بيئة-تطوير-nodejs",text:"بيئة تطوير Node.js"}],m=`<p>يوفّر Visual Studio Code والمجتمع مجموعة غنية من تعريفات حاويات التطوير الجاهزة. وهي مفيدة للغاية للإعداد السريع لبيئات تطوير شائعة دون كتابة <code>devcontainer.json</code> من الصفر.</p>
<h2 id="الوصول-إلى-التعريفات-الجاهزة">الوصول إلى التعريفات الجاهزة</h2>
<p>عندما تستخدم الأمر “Dev Containers: Add Dev Container Configuration Files…“، سيعرض عليك Visual Studio Code قائمة من التعريفات المعرّفة مسبقًا. ويُجلب ذلك من <a href="https://github.com/devcontainers/templates">مستودع vscode-dev-containers على GitHub</a>.</p>
<p><strong>مثال: استخدام تعريف Python جاهز:</strong></p>
<ol>
<li>افتح مجلد مشروعك في Visual Studio Code.</li>
<li>افتح لوحة الأوامر واختر “Dev Containers: Add Dev Container Configuration Files…“.</li>
<li>اختر “Python 3”.</li>
<li>يُنشئ Visual Studio Code مجلد <code>.devcontainer</code> يضمّ ملف <code>devcontainer.json</code> مهيّأً مسبقًا لتطوير Python.</li>
<li>افتح المجلد في حاوية تطوير (كما هو موضّح في القسم التالي).</li>
</ol>
<p><strong>تخصيص التعريفات الجاهزة:</strong></p>
<p>التعريفات الجاهزة نقاط انطلاق ممتازة. ويمكنك تخصيصها أكثر بتعديل ملف <code>devcontainer.json</code> المُولَّد — بإضافة مزيد من الإضافات، وتخصيص الإعدادات، وتحويل المنافذ، وإضافة <code>postCreateCommand</code>، وغير ذلك، لتفصيل البيئة على مقاس احتياجات مشروعك.</p>
<h2 id="العمل-مع-حاويات-التطوير-سير-عمل-تطويرك-اليومي">العمل مع حاويات التطوير: سير عمل تطويرك اليومي</h2>
<p>ما إن تُعدّ حاوية تطوير، لنستكشف كيف تعمل معها بفاعلية.</p>
<h3 id="فتح-مجلد-في-حاوية-الاتصال-ببيئتك">فتح مجلد في حاوية: الاتصال ببيئتك</h3>
<p>ما إن يصبح لديك مجلد <code>.devcontainer</code> في مشروعك، حتى يتعرّف عليه Visual Studio Code ويعرض عليك خيارات للعمل داخل حاوية التطوير.</p>
<p><strong>فتح مجلد في حاوية تطوير:</strong></p>
<ul>
<li><strong>الخيار 1 (مُوصى به): Reopen in Container</strong> افتح مجلد مشروعك في Visual Studio Code (والملف يشمل مجلد <code>.devcontainer</code>). ويكتشف Visual Studio Code إعداد حاوية التطوير ويعرض إشعارًا: “Dev Container: Folder contains a Dev Container configuration file.” فانقر “Reopen in Container.” وسيبني Visual Studio Code حاوية التطوير (عند الحاجة) ويشغّلها. وما إن تصبح جاهزة، يعيد التحميل ويعرض “(Dev Container)” في أسفل اليسار.
<ol>
<li>افتح مجلد مشروعك في Visual Studio Code (والمجلد يضمّ مجلد <code>.devcontainer</code>).</li>
<li>يكتشف Visual Studio Code إعداد حاوية التطوير ويعرض إشعارًا: “Dev Container: Folder contains a Dev Container configuration file.”</li>
<li>انقر “Reopen in Container.”</li>
<li>سيبني Visual Studio Code حاوية التطوير (عند الحاجة) ويشغّلها. وما إن تصبح جاهزة، يعيد التحميل ويعرض “(Dev Container)” في أسفل اليسار.</li>
</ol>
</li>
<li><strong>الخيار 2: لوحة الأوامر — “Dev Containers: Reopen in Container”</strong> افتح مجلد مشروعك. وافتح لوحة الأوامر واختر “Dev Containers: Reopen in Container.” ثم اتبع العملية نفسها كما في الخيار 1.
<ol>
<li>افتح مجلد مشروعك.</li>
<li>افتح لوحة الأوامر واختر “Dev Containers: Reopen in Container.”</li>
<li>اتبع العملية نفسها كما في الخيار 1.</li>
</ol>
</li>
<li><strong>الخيار 3: Remote Explorer (اختياري)</strong> يعرض أيضًا عرض Remote Explorer (المتاح عبر أيقونة Remote في شريط النشاط) حاويات التطوير المتاحة. لكن “Reopen in Container” أكثر مباشرة عمومًا.</li>
</ul>
<p><strong>ماذا يحدث عندما تختار “Reopen in Container”؟</strong></p>
<ul>
<li><strong>بناء الحاوية (عند الحاجة):</strong>
يُطلق Visual Studio Code عملية بناء Docker إذا كانت الصورة المحدّدة (أو Dockerfile) بحاجة إلى بناء. وتظهر سجلات البناء في لوحة Output، وتكون عمليات إعادة الفتح اللاحقة أسرع بفضل التخزين المؤقت في Docker.</li>
<li><strong>بدء الحاوية:</strong>
يبدأ Docker تشغيل الحاوية وفقًا للإعدادات.</li>
<li><strong>اتصال Visual Studio Code:</strong>
يتّصل Visual Studio Code بالحاوية قيد التشغيل.</li>
<li><strong>تثبيت مساحة العمل:</strong>
يُثبَّت مجلد مشروعك بـ<strong>ربط مباشر</strong> (bind mount) في الحاوية عند <code>workspaceFolder</code> (والافتراضي <code>/workspace</code>)، بما يضمن تزامن التغييرات بين المضيف والحاوية.</li>
<li><strong>تثبيت الإضافات (داخل الحاوية):</strong>
تُثبَّت الإضافات المدرَجة في <code>devcontainer.json</code> تلقائيًا داخل الحاوية.</li>
<li><strong>تطبيق الإعدادات (داخل الحاوية):</strong>
تُطبَّق الإعدادات المعرّفة في <code>devcontainer.json</code> داخل بيئة الحاوية.</li>
</ul>
<h3 id="بناء-الحاويات-وإعادة-بنائها-تحديث-بيئتك">بناء الحاويات وإعادة بنائها: تحديث بيئتك</h3>
<p>تحتاج أحيانًا إلى تعديل إعدادات حاوية التطوير. وفي هذه الحالات، أعد بناء الحاوية.</p>
<p><strong>بناء حاوية تطوير أو إعادة بنائها:</strong></p>
<ul>
<li><strong>الخيار 1: لوحة الأوامر — “Dev Containers: Rebuild Container”</strong> تأكّد من أنك متّصل بحاوية التطوير. وافتح لوحة الأوامر واختر “Dev Containers: Rebuild Container.” فيعيد Visual Studio Code بناء صورة الحاوية استنادًا إلى Dockerfile المحدَّث أو مواصفة الصورة، ثم يعيد تشغيل الحاوية.
<ol>
<li>تأكّد من أنك متّصل بحاوية التطوير.</li>
<li>افتح لوحة الأوامر واختر “Dev Containers: Rebuild Container.”</li>
<li>يعيد Visual Studio Code بناء صورة الحاوية استنادًا إلى Dockerfile المحدَّث أو مواصفة الصورة، ثم يعيد تشغيل الحاوية.</li>
</ol>
</li>
<li><strong>الخيار 2: لوحة الأوامر — “Dev Containers: Rebuild and Reopen in Container”</strong> يشبه الخيار السابق، لكنه يعيد فتح مشروعك تلقائيًا في الحاوية المُعاد بناؤها حديثًا.
<ol>
<li>يشبه الخيار السابق، لكنه يعيد فتح مشروعك تلقائيًا في الحاوية المُعاد بناؤها حديثًا.</li>
</ol>
</li>
<li><strong>متى تعيد البناء:</strong> تغييرات في <code>Dockerfile</code> (إضافة برمجيات، أو تحديث اعتمادات، أو تغيير الصورة الأساسية). وتغييرات في <code>devcontainer.json</code> (الانتقال إلى صورة أساسية مختلفة أو Dockerfile مختلف). وتحديثات البرمجيات يدويًا داخل الحاوية (مع أن الأفضل تعريفها في Dockerfile).
<ul>
<li>تغييرات في <code>Dockerfile</code> (إضافة برمجيات، أو تحديث اعتمادات، أو تغيير الصورة الأساسية).</li>
<li>تغييرات في <code>devcontainer.json</code> (الانتقال إلى صورة أساسية مختلفة أو Dockerfile مختلف).</li>
<li>تحديثات البرمجيات يدويًا داخل الحاوية (مع أن الأفضل تعريفها في Dockerfile).</li>
</ul>
</li>
</ul>
<h3 id="الوصول-إلى-الطرفية-بوابتك-إلى-الحاوية">الوصول إلى الطرفية: بوابتك إلى الحاوية</h3>
<p>تعمل الطرفية المدمجة في Visual Studio Code <em>داخل</em> حاوية التطوير.</p>
<p><strong>الوصول إلى طرفية حاوية التطوير:</strong></p>
<ul>
<li><strong>الخيار 1: الطرفية المدمجة في Visual Studio Code</strong> تأكّد من أنك متّصل بحاوية التطوير. وافتح الطرفية المدمجة (Ctrl+<code> أو Cmd+</code>). ويُظهر لك موجّه الطرفية أنك داخل الحاوية (باستخدام الأوامر المهيّأة في صورة حاويتك أو في <code>devcontainer.json</code>).
<ol>
<li>تأكّد من أنك متّصل بحاوية التطوير.</li>
<li>افتح الطرفية المدمجة (Ctrl+<code> أو Cmd+</code>).</li>
<li>يوضّح لك موجّه الطرفية أنك داخل الحاوية (باستخدام الطرفية المهيّأة في صورة حاويتك أو في <code>devcontainer.json</code>).</li>
</ol>
</li>
</ul>
<p><strong>الاستخدام:</strong></p>
<ul>
<li><strong>تنفيذ الأوامر:</strong> شغّل أوامر مثل سكربتات البناء، أو الاختبارات، أو إدارة الاعتمادات مباشرة داخل الحاوية.</li>
<li><strong>تثبيت برمجيات مؤقّت:</strong> ثبّت حزمًا (عبر apt أو npm أو pip أو غيرها) عند الحاجة، لكن التغييرات لن تستمر بعد إعادة التشغيل ما لم تُضَف إلى Dockerfile.</li>
<li><strong>التنقيح وحلّ المشكلات:</strong> استخدم الطرفية لفحص السجلات وتشخيص مشكلات الحاوية.</li>
</ul>
<h3 id="تثبيت-الإضافات-تعزيز-بيئة-تطويرك-المحوسة">تثبيت الإضافات: تعزيز بيئة تطويرك المحوَسة</h3>
<p>تتيح لك حاويات التطوير تثبيت إضافات Visual Studio Code مباشرة داخل الحاوية.</p>
<p><strong>تثبيت الإضافات داخل حاوية التطوير:</strong></p>
<ul>
<li><strong>التثبيت التلقائي:</strong>
أدرج الإضافات الأساسية في خاصية <code>extensions</code> في <code>devcontainer.json</code> لتُثبَّت تلقائيًا عند بدء الحاوية.</li>
<li><strong>التثبيت اليدوي:</strong> تأكّد من أنك متّصل بحاوية التطوير. وافتح عرض Extensions (<code>Ctrl+Shift+X</code> أو <code>Cmd+Shift+X</code>). وابحث عن قسم “Dev Container: [Container Name] - Installed” وثبّت الإضافات هناك.
<ol>
<li>تأكّد من أنك متّصل بحاوية التطوير.</li>
<li>افتح عرض Extensions (<code>Ctrl+Shift+X</code> أو <code>Cmd+Shift+X</code>).</li>
<li>ابحث عن قسم “Dev Container: [Container Name] - Installed” وثبّت الإضافات هناك.</li>
</ol>
</li>
</ul>
<p><strong>الفوائد:</strong></p>
<ul>
<li>تضمن الاتساق بين أعضاء الفريق.</li>
<li>تقلّل الفوضى على جهازك المضيف.</li>
<li>تتيح إعدادات خاصة بكل مشروع.</li>
</ul>
<h3 id="مشاركة-مساحات-العمل-تطوير-محوس-تعاوني">مشاركة مساحات العمل: تطوير محوَس تعاوني</h3>
<p>تضمن مشاركة إعداد حاوية التطوير عبر التحكّم في الإصدارات أن يستخدم كل عضو في الفريق البيئة نفسها.</p>
<p><strong>كيف تشارك:</strong></p>
<ul>
<li><strong>التحكّم في الإصدارات:</strong>
أودِع مجلد <code>.devcontainer</code> (بما يشمل <code>devcontainer.json</code> واختياريًا <code>Dockerfile</code> أو <code>docker-compose.yml</code>) في Git.</li>
<li><strong>استنساخ الفريق:</strong>
عندما يستنسخ أعضاء الفريق المستودع ويفتحونه في Visual Studio Code مع إضافة Remote - Containers، سيُطلب منهم “Reopen in Container” وسيحصلون على البيئة نفسها.</li>
</ul>
<p><strong>الفوائد:</strong></p>
<ul>
<li>الاتساق بين أعضاء الفريق.</li>
<li>سجل إصدارات لتغييرات الإعدادات.</li>
<li>تهيئة مبسّطة لأعضاء الفريق الجدد.</li>
</ul>
<h2 id="تخصيص-حاويات-التطوير-تفصيل-بيئتك-على-مقاسك">تخصيص حاويات التطوير: تفصيل بيئتك على مقاسك</h2>
<p>توفّر حاويات التطوير خيارات تخصيص واسعة.</p>
<h3 id="ملفات-dockerfile-تحكم-دقيق">ملفات Dockerfile: تحكّم دقيق</h3>
<p>للتخصيص المتقدّم، استخدم Dockerfile.</p>
<p><strong>استخدام ملفات Dockerfile:</strong></p>
<ol>
<li>أنشئ <code>Dockerfile</code> داخل مجلد <code>.devcontainer</code>.</li>
<li>في <code>devcontainer.json</code>، استبدل خاصية <code>image</code> بـ<code>dockerFile</code> وحدّد مسار Dockerfile: <code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;dockerFile&quot;</span><span>: </span><span>&quot;</span><span>Dockerfile</span><span>&quot;</span></span>
<span class="line"><span>}</span></span></code> استخدم مسارًا نسبيًا إذا لم يكن Dockerfile في المجلد نفسه.</li>
</ol>
<p><strong>أمثلة:</strong></p>
<ul>
<li><strong>تثبيت برمجيات:</strong> <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/javascript-node:18</span></span>
<span class="line"><span>RUN</span><span> apt-get update &amp;&amp; apt-get install -y --no-install-recommends &lt;/span&gt;</span>
<span class="line"><span> graphicsmagick</span></span></code></li>
<li><strong>ضبط الإعدادات:</strong> <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/python:3.10</span></span>
<span class="line"><span>RUN</span><span> echo </span><span>&quot;en_US.UTF-8 UTF-8&quot;</span><span> &gt;&gt; /etc/locale.gen &amp;&amp; locale-gen</span></span>
<span class="line"><span>ENV</span><span> LANG en_US.UTF-8</span></span>
<span class="line"><span>ENV</span><span> LANGUAGE en_US:en</span></span>
<span class="line"><span>ENV</span><span> LC_ALL en_US.UTF-8</span></span></code></li>
<li><strong>إعداد الخدمات:</strong> <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/go:1.20</span></span>
<span class="line"><span>RUN</span><span> apt-get update &amp;&amp; apt-get install -y --no-install-recommends &lt;/span&gt;</span>
<span class="line"><span> postgresql-client</span></span></code></li>
</ul>
<p><strong>أفضل الممارسات:</strong></p>
<ul>
<li>استخدم صورة أساسية موثوقة.</li>
<li>حسّن الطبقات من أجل التخزين المؤقت.</li>
<li>أبقِ Dockerfile بسيطًا.</li>
<li>ثبّت إصدارات الاعتمادات لضمان قابلية إعادة الإنتاج.</li>
</ul>
<h3 id="ملفات-dotfiles-تخصيص-بيئتك">ملفات dotfiles: تخصيص بيئتك</h3>
<p>ثبّت ملفات dotfiles من مضيفك لتخصيص حاويتك.</p>
<p><strong>استخدام ملفات dotfiles:</strong></p>
<ol>
<li>أضف خاصية <code>dotfiles</code> في <code>devcontainer.json</code>: <code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;dotfiles&quot;</span><span>: {</span></span>
<span class="line"><span> &quot;repository&quot;</span><span>: </span><span>&quot;</span><span>https://github.com/your-username/dotfiles</span><span>&quot;</span><span>,</span></span>
<span class="line"><span> &quot;targetPath&quot;</span><span>: </span><span>&quot;</span><span>~</span><span>&quot;</span><span>,</span></span>
<span class="line"><span> &quot;installCommand&quot;</span><span>: </span><span>&quot;</span><span>install.sh</span><span>&quot;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code> <strong>repository:</strong> عنوان URL لمستودع dotfiles لديك. و<strong>targetPath:</strong> المسار داخل الحاوية (والافتراضي <code>~</code>). و<strong>installCommand:</strong> سكربت يُنفَّذ بعد الاستنساخ.</li>
</ol>
<ul>
<li><strong>repository:</strong> عنوان URL لمستودع dotfiles لديك.</li>
<li><strong>targetPath:</strong> المسار داخل الحاوية (والافتراضي <code>~</code>).</li>
<li><strong>installCommand:</strong> سكربت يُنفَّذ بعد الاستنساخ.</li>
</ul>
<ol start="2">
<li>نظّم مستودع dotfiles لديك بملفات مثل <code>.bashrc</code> و<code>.gitconfig</code> وسكربت <code>install.sh</code>: <code>dotfiles-repository/
├── .bashrc
├── .gitconfig
├── .vimrc
└── install.sh</code></li>
<li><strong>مثال على <code>install.sh</code>:</strong> <code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> &quot;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>D</mi><mi>O</mi><mi>T</mi><mi>F</mi><mi>I</mi><mi>L</mi><mi>E</mi><msub><mi>S</mi><mi>R</mi></msub><mi>E</mi><mi>P</mi><mi>O</mi><mi>S</mi><mi>I</mi><mi>T</mi><mi>O</mi><mi>R</mi><mi>Y</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">/</mi><mi mathvariant="normal">.</mi><mi>b</mi><mi>a</mi><mi>s</mi><mi>h</mi><mi>r</mi><mi>c</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">DOTFILES_REPOSITORY&lt;/span&gt;&lt;span&gt;/.bashrc&lt;/span&gt;&lt;span&gt;&quot;&lt;/span&gt;&lt;span&gt; &quot;&lt;/span&gt;&lt;span&gt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">D</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal">L</span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0077em;">R</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord mathnormal" style="margin-right:0.1389em;">P</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.2222em;">Y</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/.</span><span class="mord mathnormal">ba</span><span class="mord mathnormal">s</span><span class="mord mathnormal">h</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">c</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span>HOME</span><span>/.bashrc</span><span>&quot;</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> &quot;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>D</mi><mi>O</mi><mi>T</mi><mi>F</mi><mi>I</mi><mi>L</mi><mi>E</mi><msub><mi>S</mi><mi>R</mi></msub><mi>E</mi><mi>P</mi><mi>O</mi><mi>S</mi><mi>I</mi><mi>T</mi><mi>O</mi><mi>R</mi><mi>Y</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">/</mi><mi mathvariant="normal">.</mi><mi>g</mi><mi>i</mi><mi>t</mi><mi>c</mi><mi>o</mi><mi>n</mi><mi>f</mi><mi>i</mi><mi>g</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">DOTFILES_REPOSITORY&lt;/span&gt;&lt;span&gt;/.gitconfig&lt;/span&gt;&lt;span&gt;&quot;&lt;/span&gt;&lt;span&gt; &quot;&lt;/span&gt;&lt;span&gt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">D</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal">L</span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0077em;">R</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord mathnormal" style="margin-right:0.1389em;">P</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.2222em;">Y</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/.</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mord mathnormal">co</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span>HOME</span><span>/.gitconfig</span><span>&quot;</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> &quot;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>D</mi><mi>O</mi><mi>T</mi><mi>F</mi><mi>I</mi><mi>L</mi><mi>E</mi><msub><mi>S</mi><mi>R</mi></msub><mi>E</mi><mi>P</mi><mi>O</mi><mi>S</mi><mi>I</mi><mi>T</mi><mi>O</mi><mi>R</mi><mi>Y</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">/</mi><mi mathvariant="normal">.</mi><mi>v</mi><mi>i</mi><mi>m</mi><mi>r</mi><mi>c</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mi mathvariant="normal">&quot;</mi><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo><mo>&lt;</mo><mi>s</mi><mi>p</mi><mi>a</mi><mi>n</mi><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">DOTFILES_REPOSITORY&lt;/span&gt;&lt;span&gt;/.vimrc&lt;/span&gt;&lt;span&gt;&quot;&lt;/span&gt;&lt;span&gt; &quot;&lt;/span&gt;&lt;span&gt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">D</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal">L</span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0077em;">R</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.0576em;">E</span><span class="mord mathnormal" style="margin-right:0.1389em;">P</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.2222em;">Y</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/.</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">im</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">c</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7335em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">s</span><span class="mord mathnormal">p</span><span class="mord mathnormal">an</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span>HOME</span><span>/.vimrc</span><span>&quot;</span></span>
<span class="line"><span>echo</span><span> &quot;</span><span>Dotfiles installation complete!</span><span>&quot;</span></span></code></li>
</ol>
<p><strong>الفوائد:</strong></p>
<ul>
<li>تخصّص بيئة الحاوية.</li>
<li>تضمن الاتساق بين الأنظمة.</li>
<li>تُخضع إعداداتك للتحكّم في الإصدارات.</li>
<li>تمكّن قابلية النقل.</li>
</ul>
<h3 id="قدرات-متقدمة">قدرات متقدّمة</h3>
<p><strong>عمليات التثبيت المباشر (Bind Mounts):</strong></p>
<ul>
<li>ثبّت أدلة المضيف داخل الحاوية.</li>
<li>عرّفها في <code>devcontainer.json</code> باستخدام خاصية <code>mounts</code>: <code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;mounts&quot;</span><span>: [</span></span>
<span class="line"><span> &quot;</span><span>source=\${localWorkspaceFolder}/data,target=/container/data,type=bind,consistency=cached</span><span>&quot;</span></span>
<span class="line"><span> ]</span></span>
<span class="line"><span>}</span></span></code> <strong>source:</strong> مسار المضيف. و<strong>target:</strong> مسار الحاوية. و<strong>type:</strong> يُضبط على <code>bind</code>. و<strong>consistency:</strong> اختياري (مثل <code>cached</code>).
<ul>
<li><strong>source:</strong> مسار المضيف.</li>
<li><strong>target:</strong> مسار الحاوية.</li>
<li><strong>type:</strong> يُضبط على <code>bind</code>.</li>
<li><strong>consistency:</strong> اختياري (مثل <code>cached</code>).</li>
</ul>
</li>
</ul>
<p><strong>تحويل المنافذ:</strong></p>
<ul>
<li>استخدم خاصية <code>forwardPorts</code> لتحويل منافذ الحاوية إلى المضيف.</li>
<li>يمكن لـ Visual Studio Code أن يكتشف المنافذ المحوَّلة تلقائيًا ويعرض تحويلها.</li>
</ul>
<p><strong>Docker Compose:</strong></p>
<ul>
<li>عرّف بيئات متعدّدة الحاويات بملف <code>docker-compose.yml</code>.</li>
<li>عدّل <code>devcontainer.json</code> لاستخدام <code>dockerComposeFile</code>، وحدّد <code>service</code> و<code>workspaceFolder</code>: <code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;dockerComposeFile&quot;</span><span>: </span><span>&quot;</span><span>docker-compose.yml</span><span>&quot;</span><span>,</span></span>
<span class="line"><span> &quot;service&quot;</span><span>: </span><span>&quot;</span><span>app</span><span>&quot;</span><span>,</span></span>
<span class="line"><span> &quot;workspaceFolder&quot;</span><span>: </span><span>&quot;</span><span>/app</span><span>&quot;</span></span>
<span class="line"><span>}</span></span></code></li>
<li><strong>مثال على <code>docker-compose.yml</code>:</strong> <code><span class="line"><span>version</span><span>: </span><span>'</span><span>3.8</span><span>'</span></span>
<span class="line"><span>services</span><span>:</span></span>
<span class="line"><span> app</span><span>:</span></span>
<span class="line"><span> build</span><span>:</span></span>
<span class="line"><span> context</span><span>: </span><span>./app</span></span>
<span class="line"><span> dockerfile</span><span>: </span><span>Dockerfile</span></span>
<span class="line"><span> ports</span><span>:</span></span>
<span class="line"><span> - </span><span>'</span><span>3000:3000</span><span>'</span></span>
<span class="line"><span> volumes</span><span>:</span></span>
<span class="line"><span> - </span><span>./app:/app</span></span>
<span class="line"><span> db</span><span>:</span></span>
<span class="line"><span> image</span><span>: </span><span>postgres:14</span></span>
<span class="line"><span> environment</span><span>:</span></span>
<span class="line"><span> POSTGRES_USER</span><span>: </span><span>devuser</span></span>
<span class="line"><span> POSTGRES_PASSWORD</span><span>: </span><span>devpassword</span></span>
<span class="line"><span> ports</span><span>:</span></span>
<span class="line"><span> - </span><span>'</span><span>5432:5432</span><span>'</span></span>
<span class="line"><span> volumes</span><span>:</span></span>
<span class="line"><span> - </span><span>db_data:/var/lib/postgresql/data</span></span>
<span class="line"><span>volumes</span><span>:</span></span>
<span class="line"><span> db_data</span><span>:</span></span></code></li>
</ul>
<p><strong>التكامل مع GitHub Codespaces:</strong></p>
<ul>
<li>إذا كان المشروع يضمّ مجلد <code>.devcontainer</code>، فيستخدمه Codespaces لإنشاء بيئة سحابية.</li>
<li><strong>الفوائد:</strong> وصول سحابي، وبيئات مهيّأة مسبقًا، وانتقالات سلسة من المحلي إلى السحابة.</li>
</ul>
<h2 id="حل-المشكلات-وأفضل-الممارسات">حلّ المشكلات وأفضل الممارسات</h2>
<h3 id="مشكلات-شائعة">مشكلات شائعة</h3>
<ul>
<li><strong>أخطاء بناء الحاوية:</strong> راجع سجلات البناء. وافحص صيغة Dockerfile، والشبكة، وحدود الموارد، وحدود المعدّل (rate limits). وأعد البناء بذاكرة مؤقتة نظيفة عند الحاجة.
<ul>
<li>راجع سجلات البناء.</li>
<li>افحص صيغة Dockerfile، والشبكة، وحدود الموارد، وحدود المعدّل.</li>
<li>أعد البناء بذاكرة مؤقتة نظيفة عند الحاجة.</li>
</ul>
</li>
<li><strong>فشل بدء الحاوية:</strong> افحص سجلات الحاوية. وتحقّق من تخصيص الموارد وتعارضات المنافذ. وافحص مشكلات Dockerfile أو الصورة.
<ul>
<li>افحص سجلات الحاوية.</li>
<li>تحقّق من تخصيص الموارد وتعارضات المنافذ.</li>
<li>افحص مشكلات Dockerfile أو الصورة.</li>
</ul>
</li>
<li><strong>مشكلات تثبيت الإضافات:</strong> تأكّد من اتصال الحاوية بالإنترنت. وتحقّق من توافق الإضافات. وأعد تشغيل Visual Studio Code أو أعد تحميل الحاوية.
<ul>
<li>تأكّد من اتصال الحاوية بالإنترنت.</li>
<li>تحقّق من توافق الإضافات.</li>
<li>أعد تشغيل Visual Studio Code أو أعد تحميل الحاوية.</li>
</ul>
</li>
<li><strong>مشكلات الأداء:</strong> زد موارد Docker Desktop. وحسّن طبقات Dockerfile وحجم الصورة الأساسية. وفكّر في استخدام وحدات تخزين Docker بدلًا من عمليات التثبيت المباشر. وقلّل الإضافات المثبّتة.
<ul>
<li>زد موارد Docker Desktop.</li>
<li>حسّن طبقات Dockerfile وحجم الصورة الأساسية.</li>
<li>فكّر في استخدام وحدات تخزين Docker بدلًا من عمليات التثبيت المباشر.</li>
<li>قلّل الإضافات المثبّتة.</li>
</ul>
</li>
</ul>
<h3 id="تحسين-الأداء">تحسين الأداء</h3>
<ul>
<li>خصّص موارد CPU وذاكرة كافية في Docker Desktop.</li>
<li>حسّن ملفات Dockerfile من أجل التخزين المؤقت وتقليل حجم الصورة.</li>
<li>استخدم وحدات تخزين Docker حيث يكون ذلك مفيدًا.</li>
<li>ثبّت الإضافات الأساسية فقط.</li>
<li>قلّل العمليات الخلفية.</li>
<li>اختر صورًا أساسية فعّالة.</li>
<li>اضبط التخزين المؤقت في Visual Studio Code على النحو الأمثل.</li>
</ul>
<h3 id="اعتبارات-أمنية">اعتبارات أمنية <span class="content-anchor" id="security-considerations"></span></h3>
<ul>
<li><strong>أمن صورة الحاوية:</strong> استخدم صورًا أساسية موثوقة وافحصها بحثًا عن الثغرات. وقلّل حجم الصورة. وحدّث الصور والاعتمادات بانتظام.
<ul>
<li>استخدم صورًا أساسية موثوقة وافحصها بحثًا عن الثغرات.</li>
<li>قلّل حجم الصورة.</li>
<li>حدّث الصور والاعتمادات بانتظام.</li>
</ul>
</li>
<li><strong>أمن الشبكة:</strong> حوّل المنافذ الضرورية فقط. وافهم شبكات الحاويات. وأدر الأسرار بأمان (باستخدام متغيّرات البيئة).
<ul>
<li>حوّل المنافذ الضرورية فقط.</li>
<li>افهم شبكات الحاويات.</li>
<li>أدر الأسرار بأمان (باستخدام متغيّرات البيئة).</li>
</ul>
</li>
<li><strong>الوصول إلى المضيف:</strong> اتبع مبادئ الامتياز الأقل لعمليات التثبيت المباشر. واستخدم عمليات تثبيت للقراءة فقط عند الإمكان.
<ul>
<li>اتبع مبادئ الامتياز الأقل لعمليات التثبيت المباشر.</li>
<li>استخدم عمليات تثبيت للقراءة فقط عند الإمكان.</li>
</ul>
</li>
<li><strong>أذونات المستخدم:</strong> شغّل الحاويات بوصفك مستخدمًا غير جذر. وفكّر في استخدام نطاقات مستخدمي Docker لعزل إضافي.
<ul>
<li>شغّل الحاويات بوصفك مستخدمًا غير جذر.</li>
<li>فكّر في استخدام نطاقات مستخدمي Docker لعزل إضافي.</li>
</ul>
</li>
</ul>
<h2 id="أمثلة-واقعية-حاويات-التطوير-في-العمل">أمثلة واقعية: حاويات التطوير في العمل</h2>
<h3 id="بيئة-تطوير-nodejs">بيئة تطوير Node.js</h3>
<p>إعداد بيئة Node.js بحزم npm وإعدادات محدّدة لتطبيق ويب.</p>
<p><code>devcontainer.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Node.js Web App&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;image&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;mcr.microsoft.com/devcontainers/javascript-node:18&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;extensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dbaeumer.vscode-eslint&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;esbenp.prettier-vscode&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;ms-vscode.js-debug-nodejs&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;terminal.integrated.shell.linux&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/bin/bash&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;editor.formatOnSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;forwardPorts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3000</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;postCreateCommand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm install&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>يستخدم صورة Node.js 18.</li>
<li>يثبّت ESLint وPrettier ومُنقّحًا.</li>
<li>يضبط الطرفية على bash مع تمكين التنسيق عند الحفظ.</li>
<li>يحوّل المنفذ 3000.</li>
<li>يشغّل <code>npm install</code> بعد إنشاء الحاوية.</li>
</ul>
`,i={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:m};export{s as book,a as chapter,n as chapterTitle,i as default,t as headings,m as html,p as slug,l as title};
