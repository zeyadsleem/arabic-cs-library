const e="missing-semester",t="version-control",o="التحكم في الإصدارات وGit",i="index",n="التحكم في الإصدارات وGit",c=[{depth:2,id:"اللقطات-snapshots",text:"اللقطات (Snapshots)"},{depth:2,id:"نمذجة-التاريخ-ربط-اللقطات",text:"نمذجة التاريخ: ربط اللقطات"},{depth:2,id:"نموذج-البيانات-ككود-زائف-pseudocode",text:"نموذج البيانات، ككودٍ زائف (pseudocode)"},{depth:2,id:"الكائنات-والمعالجة-بالمحتوى-content-addressing",text:"الكائنات والمعالجة بالمحتوى (Content-Addressing)"},{depth:2,id:"المراجع-references",text:"المراجع (References)"},{depth:2,id:"المستودعات-repositories",text:"المستودعات (Repositories)"},{depth:2,id:"الأساسيات",text:"الأساسيات"},{depth:2,id:"التفرع-والدمج",text:"التفرع والدمج"},{depth:2,id:"المستودعات-البعيدة-remotes",text:"المستودعات البعيدة (Remotes)"},{depth:2,id:"التراجع",text:"التراجع"}],l=`<p class="lecture-video"><iframe src="https://www.youtube-nocookie.com/embed/9K8lB61dl3Y" title="التحكم في الإصدارات وGit" loading="lazy" allowfullscreen></iframe></p>
<p>أنظمة التحكم في الإصدارات (version control systems / VCSs) هي أدواتٌ تُستخدم لتتبّع التغييرات على الكود المصدري (أو مجموعاتٍ أخرى من الملفات والمجلدات). وكما يوحي الاسم، تساعد هذه الأدوات على الحفاظ على سجلٍّ (history) من التغييرات؛ كما أنها تُسهّل التعاون بين المطوّرين. منطقيًا، تتتبّع أنظمة التحكم في الإصدارات التغييرات على مجلدٍ ومحتوياته في سلسلةٍ من <em>اللقطات</em> (snapshots)، حيث تجسّد كل لقطةٍ الحالة الكاملة للملفات/المجلدات داخل دليلٍ أعلى مستوى (top-level directory). كما تحتفظ أنظمة التحكم في الإصدارات ببياناتٍ وصفية مثل: من أنشأ كل لقطة، وما الرسائل المرتبطة بكل لقطة، وهكذا.</p>
<p>لماذا يعد التحكم في الإصدارات مفيدًا؟ حتى عندما تعمل وحدك، يتيح لك الاطلاع على اللقطات القديمة للمشروع، والاحتفاظ بسجلٍّ يوضّح سبب إجراء تغييراتٍ معيّنة، والعمل على فروع (branches) متوازيةٍ من التطوير، وغير ذلك الكثير. وعند العمل مع الآخرين، إنها أداةٌ لا تُقدَّر بثمن لمعرفة ما غيّره الآخرون، وكذلك لحل تعارضات التطوير المتزامن.</p>
<p>كما تتيح لك أنظمة التحكم في الإصدارات الحديثة الإجابة بسهولةٍ (وغالبًا تلقائيًا) عن أسئلةٍ مثل:</p>
<ul>
<li>من كتب هذه الوحدة؟</li>
<li>متى عُدِّل هذا السطر بالذات من هذا الملف بالذات؟ وبواسطة من؟ ولماذا عُدِّل؟</li>
<li>خلال آخر 1000 مراجعة، متى ولماذا توقّف اختبار وحدةٍ معيّن عن العمل؟</li>
</ul>
<p>في حين توجد أنظمة تحكم في الإصدارات أخرى، فإن <strong>Git</strong> هو المعيار الفعلي (de facto) للتحكم في الإصدارات. هذه <a href="https://xkcd.com/1597/">رسوم XKCD</a> الهزلية تلتقط سمعة Git:</p>
<p><img src="https://imgs.xkcd.com/comics/git.png" alt="xkcd 1597"></p>
<p>لأن واجهة Git تجريدٌ مُسرِّب (leaky abstraction)، فإن تعلّم Git من الأعلى إلى الأسفل (بدءًا بواجهته / واجهة سطر الأوامر) قد يقود إلى الكثير من الارتباك. من الممكن حفظ حفنةٍ من الأوامر والتفكير فيها كتعويذاتٍ سحرية، واتّباع المنهج في الرسوم الهزلية أعلاه كلما حدث خطأٌ ما.</p>
<p>في حين أن واجهة Git قبيحةٌ بلا خلاف، فإن تصميمها الأساسي وأفكارها جميلة. فبينما يجب <em>حفظ</em> واجهةٍ قبيحةٍ عن ظهر قلب، يمكن <em>فهم</em> تصميمٍ جميل. لهذا السبب، نقدم شرحًا تصاعديًا (bottom-up) لـGit، بدءًا من نموذج البيانات (data model) الخاص به، ثم تغطية واجهة سطر الأوامر لاحقًا. وبمجرد فهم نموذج البيانات، يمكن فهم الأوامر بشكلٍ أفضل من حيث كيفية تلاعبها بنموذج البيانات الأساسي.</p>
<h1>نموذج بيانات Git</h1>
<p>تكمن براعة Git في نموذج البيانات المُصمَّم بعناية الذي يتيح كل ميزات التحكم في الإصدارات الرائعة، مثل الحفاظ على السجل، ودعم الفروع، وتمكين التعاون.</p>
<h2 id="اللقطات-snapshots">اللقطات (Snapshots)</h2>
<p>يمثّل Git تاريخ مجموعةٍ من الملفات والمجلدات داخل دليلٍ أعلى مستوى كسلسلةٍ من اللقطات. في مصطلحات Git، يُسمّى الملف &quot;blob&quot;، وهو مجرد مجموعةٍ من البايتات. أما الدليل فيُسمّى &quot;tree&quot;، وهو يربط الأسماء بالـblob أو الـtree (وبالتالي يمكن أن تحتوي الأدلة على أدلةٍ أخرى). اللقطة هي الـtree الأعلى مستوى الذي يتم تتبّعه. على سبيل المثال، قد يكون لدينا tree على النحو التالي:</p>
<pre><code>&lt;root&gt; (tree)
|
+- foo (tree)
|  |
|  + bar.txt (blob, contents = &quot;hello world&quot;)
|
+- baz.txt (blob, contents = &quot;git is wonderful&quot;)
</code></pre>
<p>يحتوي الـtree الأعلى مستوى على عنصرين: tree اسمه &quot;foo&quot; (يحتوي هو نفسه على عنصرٍ واحدٍ: blob اسمه &quot;bar.txt&quot;)، وblob اسمه &quot;baz.txt&quot;.</p>
<h2 id="نمذجة-التاريخ-ربط-اللقطات">نمذجة التاريخ: ربط اللقطات</h2>
<p>كيف ينبغي لنظام التحكم في الإصدارات ربط اللقطات ببعضها؟ أحد النماذج البسيطة هو امتلاك تاريخٍ خطّي. سيكون التاريخ قائمةً باللقطات بترتيبٍ زمني. ولأسبابٍ عديدة، لا يستخدم Git نموذجًا بسيطًا مثل هذا.</p>
<p>في Git، التاريخ هو رسم بياني موجَّه لا حلقاتيّ (directed acyclic graph / DAG) من اللقطات. قد يبدو ذلك كلفظةٍ رياضيةٍ فاخرة، لكن لا تُرعَب. كل ما يعنيه هذا أن كل لقطةٍ في Git تشير إلى مجموعةٍ من &quot;الآباء&quot; (parents)، أي اللقطات التي سبقتها. إنها مجموعةُ آباءٍ وليس أبًا واحدًا (كما في التاريخ الخطّي) لأن اللقطة قد تنحدر من آباء متعددين، على سبيل المثال بسبب دمج (merging) فرعين متوازيين من التطوير.</p>
<p>يسمّي Git هذه اللقطات &quot;commits&quot;. قد يبدو تصوّر سجل الـcommits شيئًا مثل هذا:</p>
<pre><code>o &lt;-- o &lt;-- o &lt;-- o
            ^
             \\
              --- o &lt;-- o
</code></pre>
<p>في الرسم الحرفي أعلاه، تقابل <code>o</code>س الـcommits الفردية (اللقطات). تشير الأسهم إلى والد كل commit (إنها علاقة &quot;يأتي قبل&quot;، وليست &quot;يأتي بعد&quot;). بعد الـcommit الثالث، يتفرّع التاريخ إلى فرعين منفصلين. قد يقابل هذا، على سبيل المثال، تطوير ميزتين منفصلتين بالتوازي، وبشكلٍ مستقلٍ عن بعضهما. في المستقبل، قد يُدمج هذان الفرعان لإنشاء لقطةٍ جديدةٍ تدمج الميزتين معًا، منتجةً تاريخًا جديدًا يبدو هكذا، مع عرض commit الدمج المُنشأ حديثًا بخطٍ عريض:</p>
<pre><code>o &lt;-- o &lt;-- o &lt;-- o &lt;---- o
            ^            /
             \\          v
              --- o &lt;-- o
</code></pre>
<p>الـcommits في Git غير قابلةٍ للتغيير (immutable). هذا لا يعني أنه لا يمكن تصحيح الأخطاء؛ بل إن &quot;تعديلات&quot; سجل الـcommits تُنشئ في الواقع commits جديدةً بالكامل، ويُحدَّث المراجع (references، انظر أدناه) لتشير إلى الجديدة.</p>
<h2 id="نموذج-البيانات-ككود-زائف-pseudocode">نموذج البيانات، ككودٍ زائف (pseudocode)</h2>
<p>قد يكون من المفيد رؤية نموذج بيانات Git مكتوبًا في شكل كودٍ زائف:</p>
<pre><code>// a file is a bunch of bytes
type blob = array&lt;byte&gt;

// a directory contains named files and directories
type tree = map&lt;string, tree | blob&gt;

// a commit has parents, metadata, and the top-level tree
type commit = struct {
    parents: array&lt;commit&gt;
    author: string
    message: string
    snapshot: tree
}
</code></pre>
<p>إنه نموذجٌ نظيفٌ وبسيطٌ للتاريخ.</p>
<h2 id="الكائنات-والمعالجة-بالمحتوى-content-addressing">الكائنات والمعالجة بالمحتوى (Content-Addressing)</h2>
<p>&quot;الكائن&quot; (object) هو blob أو tree أو commit:</p>
<pre><code>type object = blob | tree | commit
</code></pre>
<p>في مخزن بيانات Git، تُعالَج جميع الكائنات بالمحتوى عبر <a href="https://en.wikipedia.org/wiki/SHA-1">تجزئة SHA-1</a> الخاصة بها.</p>
<pre><code>objects = map&lt;string, object&gt;

def store(object):
    id = sha1(object)
    objects[id] = object

def load(id):
    return objects[id]
</code></pre>
<p>تُوحَّد الـblob والـtree والـcommit بهذه الطريقة: فهي جميعًا كائنات. وعندما تشير إلى كائناتٍ أخرى، فإنها لا <em>تحتويها</em> فعليًا في تمثيلها على القرص، بل تحمل مرجعًا لها عبر تجزئتها.</p>
<p>على سبيل المثال، يبدو الـtree الخاص بهيكل الدليل المثال أعلاه (مُصوَّرًا باستخدام <code>git cat-file -p 698281bc680d1995c5f4caaf3359721a5a58d48d</code>) هكذا:</p>
<pre><code>100644 blob 4448adbf7ecd394f42ae135bbeed9676e894af85    baz.txt
040000 tree c68d233a33c5c06e0340e4c224f0afca87c8ce87    foo
</code></pre>
<p>يحتوي الـtree نفسه على مؤشراتٍ لمحتوياته، <code>baz.txt</code> (blob) و<code>foo</code> (tree). وإذا نظرنا إلى المحتويات المُعالَجة بالعنوان بالتجزئة المقابلة لـbaz.txt باستخدام <code>git cat-file -p 4448adbf7ecd394f42ae135bbeed9676e894af85</code>، نحصل على ما يلي:</p>
<pre><code>git is wonderful
</code></pre>
<h2 id="المراجع-references">المراجع (References)</h2>
<p>الآن، يمكن تحديد جميع اللقطات عبر تجزئات SHA-1 الخاصة بها. هذا أمرٌ غير مريح، لأن البشر ليسوا جيدين في تذكّر سلاسلٍ من 40 حرفًا سداسيًا عشريًا.</p>
<p>حلّ Git لهذه المشكلة هو أسماءٌ قابلةٌ للقراءة البشرية لتجزئات SHA-1، تُسمّى &quot;مراجع&quot; (references). المراجع هي مؤشراتٌ إلى commits. وعلى عكس الكائنات، التي غير قابلةٍ للتغيير، فإن المراجع قابلةٌ للتغيير (يمكن تحديثها لتشير إلى commit جديد). على سبيل المثال، يشير المرجع <code>master</code> عادةً إلى أحدث commit في فرع التطوير الرئيسي.</p>
<pre><code>references = map&lt;string, string&gt;

def update_reference(name, id):
    references[name] = id

def read_reference(name):
    return references[name]

def load_reference(name_or_id):
    if name_or_id in references:
        return load(references[name_or_id])
    else:
        return load(name_or_id)
</code></pre>
<p>بهذا، يمكن لـGit استخدام أسماءٍ قابلةٍ للقراءة البشرية مثل &quot;master&quot; للإشارة إلى لقطةٍ معيّنةٍ في التاريخ، بدلًا من سلسلةٍ سداسيةٍ عشريةٍ طويلة.</p>
<p>أحد التفاصيل هو أننا غالبًا نريد مفهوم &quot;أين نحن الآن&quot; في التاريخ، حتى نعرف، عندما نلتقط لقطةً جديدة، بالنسبة إلى ماذا هي (كيف نضبط حقل <code>parents</code> في الـcommit). في Git، ذلك &quot;المكان الذي نحن فيه الآن&quot; هو مرجعٌ خاصٌّ يُسمّى &quot;HEAD&quot;.</p>
<h2 id="المستودعات-repositories">المستودعات (Repositories)</h2>
<p>أخيرًا، يمكننا تعريف ما هو مستودع Git (بشكلٍ تقريبي): إنه بيانات <code>objects</code> و<code>references</code>.</p>
<p>على القرص، كل مخازن Git هي كائناتٌ ومراجع: هذا كل ما في نموذج بيانات Git. كل أوامر <code>git</code> تقابل تلاعبًا ما في رسم الـcommit البياني بإضافة كائناتٍ وإضافة/تحديث المراجع.</p>
<p>عندما تكتب أي أمرٍ، فكّر في التلاعب الذي يجريه الأمر على بنية الرسم البياني الأساسية. وعلى العكس، إذا كنت تحاول إجراء نوعٍ معيّنٍ من التغيير على رسم الـcommit البياني، مثل &quot;تجاهل التغييرات غير الملتزمة واجعل مرجع 'master' يشير إلى commit <code>5d83f9e</code>&quot;، فمن المحتمل وجود أمرٍ لفعل ذلك (مثلًا، في هذه الحالة: <code>git checkout master; git reset --hard 5d83f9e</code>).</p>
<h1>منطقة التدريج (Staging area)</h1>
<p>هذا مفهومٌ آخر مستقلٌّ عن نموذج البيانات، لكنه جزءٌ من واجهة إنشاء الـcommits.</p>
<p>إحدى الطرق التي قد تتخيّل بها تنفيذ التقاط اللقطات الموصوف أعلاه هي امتلاك أمر &quot;إنشاء لقطة&quot; يُنشئ لقطةً جديدةً استنادًا إلى <em>الحالة الحالية</em> لدليل العمل (working directory). تعمل بعض أدوات التحكم في الإصدارات بهذه الطريقة، لكن ليس Git. نحن نريد لقطاتٍ نظيفة، وقد لا يكون من المثالي دائمًا صنع لقطةٍ من الحالة الحالية. على سبيل المثال، تخيّل سيناريو نفّذت فيه ميزتين منفصلتين، وتريد إنشاء commitين منفصلين، حيث يُدخل الأول الميزة الأولى، والثاني الميزة الثانية. أو تخيّل سيناريو أضفت فيه جمل طباعةٍ لتصفية الأخطاء في كل أنحاء كودك، مع إصلاحٍ لخللٍ؛ تريد الالتزام بإصلاح الخلل مع تجاهل جميع جمل الطباعة.</p>
<p>يستوعب Git مثل هذه السيناريوهات بالسماح لك بتحديد أيّ التعديلات ينبغي تضمينها في اللقطة التالية عبر آليةٍ تسمى &quot;منطقة التدريج&quot; (staging area).</p>
<h1>واجهة سطر أوامر Git</h1>
<p>لتجنّب تكرار المعلومات، لن نشرح الأوامر أدناه بالتفصيل في هذه الملاحظات. راجع كتاب <a href="https://git-scm.com/book/en/v2">Pro Git</a> الموصى به بشدة لمزيدٍ من المعلومات، أو شاهد فيديو المحاضرة.</p>
<h2 id="الأساسيات">الأساسيات</h2>
<ul>
<li><code>git help &lt;command&gt;</code>: الحصول على مساعدةٍ لأمر git</li>
<li><code>git init</code>: إنشاء مستودع git جديد، تُخزَّن بياناته في دليل <code>.git</code></li>
<li><code>git status</code>: يخبرك بما يجري</li>
<li><code>git add &lt;filename&gt;</code>: إضافة ملفات إلى منطقة التدريج</li>
<li><code>git commit</code>: إنشاء commit جديد
<ul>
<li>اكتب <a href="https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html">رسائل commit جيدة</a>!</li>
<li>والمزيد من الأسباب لكتابة <a href="https://chris.beams.io/posts/git-commit/">رسائل commit جيدة</a>!</li>
</ul>
</li>
<li><code>git log</code>: يعرض سجلًّا مبسّطًا للتاريخ</li>
<li><code>git log --all --graph --decorate</code>: يصور التاريخ كرسمٍ بيانيٍّ موجَّهٍ لا حلقاتي</li>
<li><code>git diff &lt;filename&gt;</code>: يعرض التغييرات التي أجريتها بالنسبة إلى منطقة التدريج</li>
<li><code>git diff &lt;revision&gt; &lt;filename&gt;</code>: يعرض الفروقات في ملفٍ بين اللقطات</li>
<li><code>git checkout &lt;revision&gt;</code>: تحديث HEAD (والفرع الحالي إذا كنت تتفقد فرعًا)</li>
</ul>
<h2 id="التفرع-والدمج">التفرع والدمج</h2>
<ul>
<li><code>git branch</code>: يعرض الفروع</li>
<li><code>git branch &lt;name&gt;</code>: إنشاء فرع</li>
<li><code>git switch &lt;name&gt;</code>: التبديل إلى فرع</li>
<li><code>git checkout -b &lt;name&gt;</code>: إنشاء فرعٍ والتبديل إليه
<ul>
<li>نفس <code>git branch &lt;name&gt;; git switch &lt;name&gt;</code></li>
</ul>
</li>
<li><code>git merge &lt;revision&gt;</code>: دمجٌ في الفرع الحالي</li>
<li><code>git mergetool</code>: استخدام أداةٍ فاخرة للمساعدة في حل تعارضات الدمج</li>
<li><code>git rebase</code>: إعادة بناء مجموعة الرقع (patches) على قاعدةٍ جديدة</li>
</ul>
<h2 id="المستودعات-البعيدة-remotes">المستودعات البعيدة (Remotes)</h2>
<ul>
<li><code>git remote</code>: سرد المستودعات البعيدة</li>
<li><code>git remote add &lt;name&gt; &lt;url&gt;</code>: إضافة مستودعٍ بعيد</li>
<li><code>git push &lt;remote&gt; &lt;local branch&gt;:&lt;remote branch&gt;</code>: إرسال الكائنات إلى المستودع البعيد وتحديث مرجعه</li>
<li><code>git branch --set-upstream-to=&lt;remote&gt;/&lt;remote branch&gt;</code>: إعداد المراسلة بين الفرع المحلي والفرع البعيد</li>
<li><code>git fetch</code>: جلب الكائنات/المراجع من مستودعٍ بعيد</li>
<li><code>git pull</code>: نفس <code>git fetch; git merge</code></li>
<li><code>git clone</code>: تنزيل المستودع من مستودعٍ بعيد</li>
</ul>
<h2 id="التراجع">التراجع</h2>
<ul>
<li><code>git commit --amend</code>: تعديل محتويات/رسالة commit</li>
<li><code>git reset &lt;file&gt;</code>: إزالة ملفٍ من التدريج</li>
<li><code>git restore</code>: تجاهل التغييرات</li>
</ul>
<h1>Git المتقدم</h1>
<ul>
<li><code>git config</code>: Git <a href="https://git-scm.com/docs/git-config">قابلٌ للتخصيص بدرجةٍ كبيرة</a></li>
<li><code>git clone --depth=1</code>: استنساخٌ ضحل، دون سجل الإصدارات الكامل</li>
<li><code>git add -p</code>: تدريجٌ تفاعلي</li>
<li><code>git rebase -i</code>: إعادة بناءٍ تفاعلية</li>
<li><code>git blame</code>: يظهر من عدّل آخر سطرٍ</li>
<li><code>git stash</code>: إزالة التعديلات مؤقتًا من دليل العمل</li>
<li><code>git bisect</code>: بحثٌ ثنائي في التاريخ (مثلًا للانحدارات)</li>
<li><code>git revert</code>: إنشاء commit جديدٍ يعكس تأثير commitٍ سابق</li>
<li><code>git worktree</code>: تفقّد فروعٍ متعددةٍ في الوقت نفسه</li>
<li><code>.gitignore</code>: <a href="https://git-scm.com/docs/gitignore">حدّد</a> الملفات غير المتتبَّعة عمدًا لتجاهلها</li>
</ul>
<h1>أمور متفرقة</h1>
<ul>
<li><strong>واجهات رسومية (GUIs)</strong>: يوجد <a href="https://git-scm.com/downloads/guis">عملاء واجهاتٍ رسومية</a> عديدةٌ لـGit. نحن شخصيًا لا نستخدمها ونستخدم واجهة سطر الأوامر بدلًا منها.</li>
<li><strong>تكامل مع مُعالج الأوامر</strong>: من المفيد جدًا وجود حالة Git كجزءٍ من موجه مُعالج الأوامر الخاص بك (<a href="https://github.com/olivierverdier/zsh-git-prompt">zsh</a>، <a href="https://github.com/magicmonty/bash-git-prompt">bash</a>). وغالبًا ما تكون مضمّنةً في أطرٍ مثل <a href="https://github.com/ohmyzsh/ohmyzsh">Oh My Zsh</a>.</li>
<li><strong>تكامل مع المحرر</strong>: على نحوٍ مماثل لما سبق، تكاملاتٌ مفيدةٌ بميزاتٍ عديدة. <a href="https://github.com/tpope/vim-fugitive">fugitive.vim</a> هو التكامل القياسي لـVim.</li>
<li><strong>سير العمل (Workflows)</strong>: علّمناك نموذج البيانات، إضافةً إلى بعض الأوامر الأساسية؛ لم نخبرك بالممارسات التي ينبغي اتباعها عند العمل على مشاريع كبيرة (وهناك <a href="https://nvie.com/posts/a-successful-git-branching-model/">مقارباتٌ</a> <a href="https://www.endoflineblog.com/gitflow-considered-harmful">متعددةٌ</a> <a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow">ومختلفةٌ</a>).</li>
<li><strong>GitHub</strong>: Git ليس GitHub. لدى GitHub طريقةٌ محددةٌ للمساهمة بالكود في مشاريع الآخرين، تُسمّى <a href="https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests">طلبات السحب (pull requests)</a>.</li>
<li><strong>مزودو Git آخرون</strong>: GitHub ليس مميزًا: هناك مضيفاتٌ عديدةٌ لمستودعات Git، مثل <a href="https://about.gitlab.com/">GitLab</a> و<a href="https://bitbucket.org/">BitBucket</a>.</li>
</ul>
<h1>موارد</h1>
<ul>
<li><a href="https://git-scm.com/book/en/v2">Pro Git</a> <strong>قراءةٌ موصى بها بشدة</strong>. قراءة الفصول 1–5 ستعلمك معظم ما تحتاجه لاستخدام Git بكفاءة، الآن بعد أن فهمت نموذج البيانات. الفصول اللاحقة تحتوي على مادةٍ متقدمةٍ مثيرة للاهتمام.</li>
<li><a href="https://ohshitgit.com/">Oh Shit, Git!?!</a> دليلٌ قصيرٌ عن كيفية التعافي من بعض أخطاء Git الشائعة.</li>
<li><a href="https://eagain.net/articles/git-for-computer-scientists/">Git for Computer Scientists</a> شرحٌ قصيرٌ لنموذج بيانات Git، برمزٍ زائفٍ أقل ورسومٍ بيانيةٍ أكثر فخامةً من هذه الملاحظات.</li>
<li><a href="https://jwiegley.github.io/git-from-the-bottom-up/">Git from the Bottom Up</a> شرحٌ مفصّلٌ لتفاصيل تنفيذ Git بما يتجاوز نموذج البيانات فقط، للمهتمين.</li>
<li><a href="https://smusamashah.github.io/blog/2017/10/14/explain-git-in-simple-words">How to explain git in simple words</a></li>
<li><a href="https://learngitbranching.js.org/">Learn Git Branching</a> لعبةٌ قائمةٌ على المتصفح تُعلّمك Git.</li>
</ul>
<div class="exercises"><h1>تمارين</h1>
<ol>
<li>إذا لم تكن لديك أي خبرةٍ سابقة مع Git، فجرّب إما قراءة الفصلين الأولين من <a href="https://git-scm.com/book/en/v2">Pro Git</a> أو متابعة برنامجٍ تعليميٍّ مثل <a href="https://learngitbranching.js.org/">Learn Git Branching</a>. وأثناء عملك فيه، اربط أوامر Git بنموذج البيانات.</li>
<li>استنسخ <a href="https://github.com/missing-semester/missing-semester">مستودع موقع المقرر الدراسي</a>.
<ol>
<li>استكشف سجل الإصدارات بتصويره كرسمٍ بياني.</li>
<li>من هو آخر شخصٍ عدّل <code>README.md</code>؟ (تلميح: استخدم <code>git log</code> مع وسيطٍ).</li>
<li>ما رسالة commit المرتبطة بآخر تعديلٍ على سطر <code>collections:</code> في <code>_config.yml</code>؟ (تلميح: استخدم <code>git blame</code> و<code>git show</code>).</li>
</ol>
</li>
<li>من الأخطاء الشائعة عند تعلّم Git الالتزام بملفاتٍ كبيرةٍ لا ينبغي أن يديرها Git، أو إضافة معلوماتٍ حساسة. جرّب إضافة ملفٍ إلى مستودعٍ، وإجراء بعض الـcommits ثم حذف ذلك الملف من <em>السجل</em> (وليس من أحدث commit فقط). قد تريد الاطلاع على <a href="https://help.github.com/articles/removing-sensitive-data-from-a-repository/">هذا</a>.</li>
<li>استنسخ مستودعًا ما من GitHub، وعدّل أحد ملفاته الموجودة. ماذا يحدث عند تنفيذ <code>git stash</code>؟ ماذا ترى عند تشغيل <code>git log --all --oneline</code>؟ نفّذ <code>git stash pop</code> للتراجع عمّا فعلته بـ<code>git stash</code>. في أي سيناريو قد يكون هذا مفيدًا؟</li>
<li>مثل الكثير من أدوات سطر الأوامر، يوفر Git ملف إعداداتٍ (أو ملف نقطة (dotfile)) يُسمّى <code>~/.gitconfig</code>. أنشئ اسمًا مستعارًا (alias) في <code>~/.gitconfig</code> بحيث يعطيك تنفيذ <code>git graph</code> مخرجات <code>git log --all --graph --decorate --oneline</code>. يمكنك فعل ذلك إما بتحرير ملف <code>~/.gitconfig</code> مباشرةً، أو باستخدام أمر <code>git config</code> لإضافة الاسم المستعار. يمكن العثور على معلوماتٍ حول أسماء Git المستعارة <a href="https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases">هنا</a>.</li>
<li>يمكنك تعريف أنماط التجاهل العامة في <code>~/.gitignore_global</code> بعد تنفيذ <code>git config --global core.excludesfile ~/.gitignore_global</code>. يحدد هذا موقع ملف التجاهل العام الذي سيستخدمه Git، لكنك ما زلت بحاجةٍ إلى إنشاء الملف يدويًا في ذلك المسار. أعدد ملف gitignore العام لديك لتجاهل الملفات المؤقتة الخاصة بنظام التشغيل أو المحرر، مثل <code>.DS_Store</code>.</li>
<li>اعمل fork على <a href="https://github.com/missing-semester/missing-semester">مستودع موقع المقرر الدراسي</a>، وابحث عن خطأٍ إملائيٍّ أو أي تحسينٍ آخر يمكنك إجراؤه، وقدّم طلب سحبٍ (pull request) على GitHub (قد تريد الاطلاع على <a href="https://github.com/firstcontributions/first-contributions">هذا</a>). يُرجى تقديم طلبات سحبٍ مفيدةٍ فقط (لا تُرسل لنا رسائل مزعجة من فضلك!). إذا لم تجد تحسينًا لتجريه، يمكنك تخطّي هذا التمرين.</li>
<li>تدرب على حل تعارضات الدمج بمحاكاة سيناريو تعاونٍ:
<ol>
<li>أنشئ مستودعًا جديدًا بالأمر <code>git init</code> وأنشئ ملفًا اسمه <code>recipe.txt</code> بأسطرٍ قليلة (مثلًا، وصفةً بسيطة).</li>
<li>التزم به، ثم أنشئ فرعين: <code>git branch salty</code> و<code>git branch sweet</code>.</li>
<li>في فرع <code>salty</code>، عدّل سطرًا (مثلًا، غيّر &quot;1 cup sugar&quot; إلى &quot;1 cup salt&quot;) والتزم.</li>
<li>في فرع <code>sweet</code>، عدّل السطر نفسه بشكلٍ مختلف (مثلًا، غيّر &quot;1 cup sugar&quot; إلى &quot;2 cups sugar&quot;) والتزم.</li>
<li>الآن بدّل إلى <code>master</code> وجرّب <code>git merge salty</code> ثم <code>git merge sweet</code>. ماذا يحدث؟ انظر إلى محتويات <code>recipe.txt</code> — ماذا تعني العلامات <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> و<code>=======</code> و<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>؟</li>
<li>حلّ التعارض بتحرير الملف لإبقاء المحتوى الذي تريده، وإزالة علامات التعارض، وإكمال الدمج بالأمرين <code>git add</code> و<code>git commit</code> (أو <code>git merge --continue</code>). بدلًا من ذلك، جرّب استخدام <code>git mergetool</code> لحل التعارض بأداة دمجٍ رسوميةٍ أو قائمةٍ على الطرفية.</li>
<li>استخدم <code>git log --graph --oneline</code> لتصوّر سجل الدمج الذي أنشأته للتو.</li>
</ol>
</li>
</ol>
</div>`,d={book:e,chapter:t,chapterTitle:o,slug:i,title:n,headings:c,html:l};export{e as book,t as chapter,o as chapterTitle,d as default,c as headings,l as html,i as slug,n as title};
