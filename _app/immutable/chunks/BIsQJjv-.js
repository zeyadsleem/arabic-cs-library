const e="kinney",n="visual-studio-code",o="Visual Studio Code",i="working-with-dev-containers",t="العمل مع حاويات التطوير",d=[{depth:2,id:"البناء-وإعادة-البناء-والتحديث",text:"البناء وإعادة البناء والتحديث"},{depth:3,id:"الخيار-1-لوحة-الأوامر-dev-containers-rebuild-container",text:"الخيار 1: لوحة الأوامر — “Dev Containers: Rebuild Container"},{depth:3,id:"الخيار-2-لوحة-الأوامر-dev-containers-rebuild-and-reopen-in-container",text:"الخيار 2: لوحة الأوامر — “Dev Containers: Rebuild and Reopen in Container”"},{depth:3,id:"متى-تعيد-البناء",text:"متى تعيد البناء"},{depth:2,id:"الوصول-إلى-الطرفية",text:"الوصول إلى الطرفية"}],r=`<p>ما إن يصبح لديك مجلد <code>.devcontainer</code> في مشروعك، حتى يتعرّف عليه Visual Studio Code ويعرض عليك خيارات للعمل داخل حاوية التطوير.</p>
<p><img src="/arabic-cs-library/images/kinney/9794dd1ba1106eb3.webp" alt="نافذة حوارية في Visual Studio Code تعرض خيار إعادة الفتح في الحاوية"></p>
<blockquote>
<p><strong>تثبيت Docker</strong></p>
<p>إن لم يكن Docker مثبّتًا، فسيحاول Visual Studio Code تثبيته.</p>
</blockquote>
<p><strong>ماذا يحدث عندما تختار “Reopen in Container”؟</strong></p>
<ul>
<li><strong>بناء الحاوية — عند الحاجة:</strong> إذا كانت صورة الحاوية المحدّدة (أو Dockerfile) بحاجة إلى بناء، فسيُطلق Visual Studio Code عملية بناء Docker. وسترى سجلات البناء في لوحة Output (اختر “Dev Containers” من القائمة المنسدلة). وستكون عمليات “Reopen in Container” اللاحقة أسرع إذا كانت الصورة مبنية بالفعل (بفضل التخزين المؤقت في Docker).</li>
<li><strong>بدء الحاوية:</strong> يبدأ Docker تشغيل الحاوية وفقًا للإعدادات.</li>
<li><strong>اتصال Visual Studio Code:</strong> يُنشئ Visual Studio Code اتصالًا بالحاوية قيد التشغيل.</li>
<li><strong>تثبيت مساحة العمل:</strong> يُثبَّت مجلد مشروعك من جهازك المضيف في الحاوية بـ<strong>ربط مباشر</strong> (bind mount) عند مسار <code>workspaceFolder</code> (والافتراضي <code>/workspace</code>). ويعني ذلك أن التغييرات التي تجريها على الملفات داخل الحاوية تنعكس في مجلد مشروعك على المضيف، والعكس صحيح. وهذا يتيح تحرير الملفات بسلاسة بين المضيف والحاوية.</li>
<li><strong>تثبيت الإضافات (داخل الحاوية):</strong> يثبّت Visual Studio Code تلقائيًا الإضافات المدرَجة في خاصية <code>extensions</code> في <code>devcontainer.json</code> <em>داخل</em> الحاوية. وهذه منفصلة عن إضافات جهازك المضيف.</li>
<li><strong>تطبيق الإعدادات (داخل الحاوية):</strong> يطبّق Visual Studio Code الإعدادات المعرّفة في خاصية <code>settings</code> في <code>devcontainer.json</code> <em>داخل</em> بيئة الحاوية.</li>
</ul>
<p>ما إن تصبح الحاوية قيد التشغيل، ستتمكّن من رؤيتها في <strong>Docker Desktop</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/03d25a73fc176c38.webp" alt="Docker Desktop يعرض حاوية قيد التشغيل"></p>
<h2 id="البناء-وإعادة-البناء-والتحديث">البناء وإعادة البناء والتحديث</h2>
<p>تحتاج أحيانًا إلى تعديل إعدادات حاوية التطوير — تحديث الاعتمادات في Dockerfile، أو إضافة إضافات جديدة، أو تغيير الإعدادات، وغير ذلك. وفي هذه الحالات، يلزمك إعادة بناء حاوية التطوير.</p>
<h3 id="الخيار-1-لوحة-الأوامر-dev-containers-rebuild-container">الخيار 1: لوحة الأوامر — “Dev Containers: Rebuild Container</h3>
<ol>
<li>تأكّد من أنك متّصل بحاوية التطوير (سترى في أسفل يسار نافذة Visual Studio Code عبارة “(Dev Container)”).</li>
<li>لوحة الأوامر -&gt; “Dev Containers: Rebuild Container”.</li>
<li>سيؤدّي ذلك إلى إعادة بناء صورة الحاوية استنادًا إلى <code>Dockerfile</code> المحدَّث أو مواصفة الصورة، ثم إعادة تشغيل الحاوية. وتُطبَّق أيضًا تغييرات <code>devcontainer.json</code> (مثل الإضافات أو الإعدادات) أثناء إعادة البناء.</li>
</ol>
<h3 id="الخيار-2-لوحة-الأوامر-dev-containers-rebuild-and-reopen-in-container">الخيار 2: لوحة الأوامر — “Dev Containers: Rebuild and Reopen in Container”</h3>
<ol>
<li>يشبه “Rebuild Container”، لكنه بعد إعادة البناء يعيد فتح مشروعك تلقائيًا في الحاوية المُعاد بناؤها حديثًا. وهذا غالبًا أكثر ملاءمة.</li>
</ol>
<h3 id="متى-تعيد-البناء">متى تعيد البناء</h3>
<ul>
<li><strong>تغييرات في <code>Dockerfile</code>:</strong> كلما عدّلت <code>Dockerfile</code> لإضافة برمجيات، أو تحديث اعتمادات، أو تغيير الصورة الأساسية.</li>
<li><strong>تغييرات في <code>devcontainer.json</code> (صورة أو dockerFile):</strong> إذا انتقلت إلى صورة أساسية مختلفة أو Dockerfile مختلف.</li>
<li><strong>تحديثات البرمجيات داخل الحاوية (أقل شيوعًا):</strong> إذا ثبّتت برمجيات يدويًا داخل الحاوية عبر الطرفية وأردت إبقاء هذه التغييرات، فقد تحتاج إلى إعادة بناء صورة الحاوية (مع أن الأفضل عمومًا تعريف عمليات تثبيت البرمجيات في Dockerfile).</li>
</ul>
<h2 id="الوصول-إلى-الطرفية">الوصول إلى الطرفية</h2>
<p>من الجوانب الأساسية في العمل مع حاويات التطوير الوصول إلى الطرفية المدمجة في Visual Studio Code. فهذه الطرفية تعمل <em>داخل</em> حاوية التطوير، وتوفّر لك بيئة أوامر داخل بيئتك المحوَسة مباشرة.</p>
<ol>
<li>تأكّد من أنك متّصل بحاوية التطوير.</li>
<li>افتح الطرفية المدمجة في Visual Studio Code (<code>Ctrl+Backtick</code> أو <code>Command+Backtick</code>).</li>
<li>سيشير موجّه الطرفية إلى أنك الآن داخل بيئة الحاوية. وستكون الأوامر (مثل bash وzsh) هي نفسها المهيّأة في صورة حاويتك أو في إعدادات <code>devcontainer.json</code>.</li>
</ol>
`,c={book:e,chapter:n,chapterTitle:o,slug:i,title:t,headings:d,html:r};export{e as book,n as chapter,o as chapterTitle,c as default,d as headings,r as html,i as slug,t as title};
