const n="devops-roadmap",i="projects",e="مشاريع عملية",l="container-best-practices",o="مشروع حالة استخدام: تطبيق أفضل ممارسات حاويات Docker",t=[{depth:2,id:"الحالة",text:"الحالة"},{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"المتطلبات",text:"المتطلّبات"},{depth:2,id:"إضافات",text:"إضافات"},{depth:2,id:"المصادر",text:"المصادر"},{depth:2,id:"المرجع",text:"المرجع"}],a=`<h1>مشروع حالة استخدام: تطبيق أفضل ممارسات حاويات Docker</h1>
<h2 id="الحالة">الحالة</h2>
<p>لديك <a href="https://github.com/docker/getting-started-app">تطبيق JavaScript نموذجي</a>، وهو مدير قوائم مهام بسيط يعمل على Node.js، ومع ذلك لا حاجة إلى خبرة حقيقية في JavaScript. سنشغّله فقط.</p>
<h2 id="المهمة">المهمة</h2>
<ul>
<li>أنشئ <code>Dockerfile</code> لتغليف المشروع في حاوية.</li>
<li>طبّق أفضل ممارسات حاويات Docker للعمل بفعالية وفق أبرز قواعد «أفعل» و«لا تفعل».</li>
<li>أنشئ خط أنابيب CI لأتمتة فحوص أفضل الممارسات.</li>
</ul>
<h2 id="المتطلبات">المتطلّبات</h2>
<p>تأكّد من تطبيق أفضل الممارسات التالية.</p>
<ul>
<li>
<p><strong>الممارسات الأساسية</strong></p>
<ul>
<li>استخدم مدقّق (linter) لـ Dockerfile</li>
<li>تحقّق من أفضل الممارسات الخاصة بلغة Docker</li>
<li>اكتب تطبيقًا واحدًا لكل صورة Docker</li>
<li>أنشئ حاويات مؤقّتة (ephemeral) قابلة للضبط</li>
</ul>
</li>
<li>
<p><strong>ممارسات الصورة</strong></p>
<ul>
<li>استخدم صورة أساس (base image) مثالية</li>
<li>ثبّت الإصدارات في كل مكان</li>
<li>أنشئ صورة بالحجم الأمثل</li>
<li>استخدم المراحل المتعدّدة (multi-stage) متى أمكن</li>
<li>تجنّب أي ملفات غير ضرورية</li>
</ul>
</li>
<li>
<p><strong>ممارسات الأمان</strong></p>
<ul>
<li>استخدم دائمًا صورًا موثوقة</li>
<li>لا تستخدم أبدًا مصادر غير موثوقة</li>
<li>لا تخزّن أبدًا بيانات حسّاسة داخل الصورة</li>
<li>استخدم مستخدمًا غير جذري (non-root)</li>
<li>افحص ثغرات الصورة</li>
</ul>
</li>
<li>
<p><strong>ممارسات متنوّعة</strong></p>
<ul>
<li>استفد من ذاكرة بناء Docker المؤقّتة (build cache)</li>
<li>تجنّب ذاكرة النظام المؤقّتة</li>
<li>أنشئ صورة موحّدة عبر البيئات</li>
<li>استخدم ENTRYPOINT مع CMD</li>
</ul>
</li>
</ul>
<h2 id="إضافات">إضافات</h2>
<p>البناء:</p>
<pre><code class="language-shell">docker build . -t docker-sample-app:v1
</code></pre>
<p>التشغيل:</p>
<pre><code class="language-shell">docker run -p 3000:3000 docker-sample-app:v1
</code></pre>
<p>العرض:</p>
<pre><code>http://localhost:3000
</code></pre>
<h2 id="المصادر">المصادر</h2>
<ul>
<li><a href="/arabic-cs-library/book/devops-roadmap/foundations/module-02#27-containers---docker-fundamentals">الحاويات - أساسيات Docker</a></li>
<li><a href="/arabic-cs-library/book/devops-roadmap/foundations/module-03#35-containers---docker-best-practices">الحاويات - أفضل ممارسات Docker</a></li>
<li><a href="/arabic-cs-library/book/devops-roadmap/foundations/module-03#37-continuous-integration---github-actions-essentials">التكامل المستمر - أساسيات GitHub Actions</a></li>
<li><a href="/arabic-cs-library/book/devops-roadmap/foundations/module-03#38-continuous-integration---pipelines-and-quality-gates">التكامل المستمر - خطوط الأنابيب وبوابات الجودة</a></li>
</ul>
<h2 id="المرجع">المرجع</h2>
<div class="callout callout--tip">
<p><strong>تلميح</strong></p>
<p>حين تنتهي، قارن حلّك بـ<a href="https://github.com/DevOpsHiveHQ/dynamic-devops-roadmap/blob/main/docs/projects/container-best-practices/reference">المرجع</a>.</p>
<p>تأكّد من فهمك لجميع جوانب المرجع.</p>
</div>
`,r={book:n,chapter:i,chapterTitle:e,slug:l,title:o,headings:t,html:a};export{n as book,i as chapter,e as chapterTitle,r as default,t as headings,a as html,l as slug,o as title};
