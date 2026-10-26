const e="kinney",s="visual-studio-code",n="Visual Studio Code",l="search-and-replace-vscode",o="البحث والاستبدال",c=[{depth:2,id:"البحث-في-الملفات",text:"البحث في الملفات"},{depth:2,id:"البحث-والاستبدال-في-الملفات",text:"البحث والاستبدال في الملفات"},{depth:2,id:"تضمين-الملفات-والمجلدات-واستبعادها",text:"تضمين الملفات والمجلدات واستبعادها"},{depth:2,id:"التعبيرات-النمطية-أداة-القوة-المتقدمة",text:"التعبيرات النمطية: أداة القوة المتقدّمة"},{depth:2,id:"الحفاظ-على-حالة-الأحرف",text:"الحفاظ على حالة الأحرف"},{depth:2,id:"محرر-البحث-عرض-مخصص-لنتائج-البحث",text:"محرّر البحث: عرض مخصّص لنتائج البحث"},{depth:3,id:"فوائد-محرر-البحث",text:"فوائد محرّر البحث:"},{depth:3,id:"سير-عمل-مثال",text:"سير عمل مثال"},{depth:2,id:"مجموعات-الالتقاط-المتقدمة-في-الاستبدالات",text:"مجموعات الالتقاط المتقدّمة في الاستبدالات"},{depth:3,id:"إعادة-ترتيب-النص-بمجموعات-الالتقاط",text:"إعادة ترتيب النص بمجموعات الالتقاط"},{depth:3,id:"تحويل-صيغ-التواريخ",text:"تحويل صيغ التواريخ"},{depth:3,id:"تحويل-html-إلى-jsx",text:"تحويل HTML إلى JSX"},{depth:3,id:"إنشاء-معرفات-url-من-العناوين",text:"إنشاء معرّفات URL من العناوين"},{depth:3,id:"التحويل-بين-أساليب-البرمجة",text:"التحويل بين أساليب البرمجة"},{depth:2,id:"حفظ-استعلامات-البحث",text:"حفظ استعلامات البحث"}],d=`<p>ميزات البحث والاستبدال في Visual Studio Code أشبه بكرية بلورية ترى كل شيء في قاعدة شيفرتك — فهي تحدّد الأسطر التي تحتاج إلى تعديل، ثم تغيّرها على نطاق واسع بأقل عناء.</p>
<h2 id="البحث-في-الملفات">البحث في الملفات</h2>
<p>اضغط <code>Ctrl+Shift+F</code> (أو <code>Cmd+Shift+F</code> على macOS) لفتح عرض البحث، الذي يفحص مساحة عملك كلها افتراضيًا. اكتب استعلامك أو نمطك، وشاهد Visual Studio Code يمشّط كل الملفات ويعرض المطابقات في شجرة نتائج قابلة للطي.</p>
<p>ويمكنك تنقيح هذا البحث بتحديد <code>Files to include</code> أو <code>Files to exclude</code>. فمثلًا، إن أردت البحث في ملفات TypeScript فقط، فاكتب <code>**/*.ts</code> في حقل التضمين. وإن أردت تجاوز مجلدات معيّنة (مثل <code>node_modules</code>)، فاستبعدها صراحةً بنمط مثل <code>**/node_modules</code>.</p>
<h2 id="البحث-والاستبدال-في-الملفات">البحث والاستبدال في الملفات</h2>
<p>عندما تحتاج إلى تصحيح الشيفرة أو تحديثها في مشروعك كله، فلوحة الاستبدال صديقتك. وبمجرد إدخالك نصًا في حقل <code>Replace</code>، يمكنك معاينة التغييرات المقترحة قبل إنهائها. ويجمع Visual Studio Code كل تغيير حسب الملف، ويمكنك قبول التغييرات أو رفضها فرديًا أو كلها دفعة واحدة.</p>
<p>وتضمن هذه المقاربة الحذرة ألّا تسحق بشكل أعمى أسطرًا لم تقصد لمسها قط. إنها مثل وجود مساعد تصحيح شيفرة ينتظر كلمتك الأخيرة قبل إجراء تعديلات واسعة.</p>
<blockquote>
<p><strong>منطقة الخطر</strong></p>
<p>تحقق من كل استبدال مرتين عند التعامل مع شيفرة حساسة — خصوصًا إن كان تعبيرك النمطي واسعًا. فـ«عذرًا، استبدلت عنوان URL لقاعدة بياناتي في كل مكان بالخطأ» ليس إعلانًا ممتعًا في Slack.</p>
</blockquote>
<h2 id="تضمين-الملفات-والمجلدات-واستبعادها">تضمين الملفات والمجلدات واستبعادها</h2>
<p>يعمل حقلَا <code>Files to include</code> و<code>Files to exclude</code> في عرض البحث بأنماط glob للتركيز على مجلدات وأنواع ملفات محدّدة أو تجاهلها. وإليك بعض السيناريوهات التي تستحق النظر:</p>
<ul>
<li>البحث في مجلد <code>src</code> وحده: <code>src/**/*.ts</code></li>
<li>استبعاد ملفات الاختبار: <code>!**/*.test.ts</code></li>
<li>تجاهل مجلدات متعددة: <code>**/*</code> في Include، و<code>**/node_modules, **/dist</code> في Exclude</li>
</ul>
<p>وتجعل هذه الأنماط إبقاء نتائج بحثك ذات صلة أمرًا سهلًا، وتنجيك من التنقيب في الشيفرة المولّدة تلقائيًا أو المكتبات الخارجية.</p>
<h2 id="التعبيرات-النمطية-أداة-القوة-المتقدمة">التعبيرات النمطية: أداة القوة المتقدّمة</h2>
<p>عندما لا تكفي عمليات البحث النصي البسيطة، تأتي التعبيرات النمطية للإنقاذ. بدّل زر <code>.*</code> في عرض البحث لتفعيل وضع التعبيرات النمطية. وهذا يتيح لك إنشاء أنماط مرنة لكل شيء بدءًا من إعادة تسمية المتغيّرات إلى تنظيف الشيفرة.</p>
<p>تخيّل أن لديك قاعدة شيفرة React تريد فيها استبدال كل تعريفات <code>myVariable</code> بـ <code>myVar</code>، لكن في تعريفات let فقط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">let</span> myVariable = <span class="hljs-string">&quot;Hello&quot;</span>;
…
<span class="hljs-keyword">let</span> myVariableAgain = <span class="hljs-number">42</span>;
<span class="hljs-keyword">const</span> myVariable = <span class="hljs-number">9000</span>; <span class="hljs-comment">// should remain untouched</span>
</code></pre>
<p>ويمكنك صياغة تعبير نمطي مثل:</p>
<pre><code class="language-typescript"><span class="hljs-title class_">Find</span>:    (<span class="hljs-keyword">let</span>\\s+)myVariable\\b
<span class="hljs-title class_">Replace</span>: $1myVar
</code></pre>
<p>هنا تلتقط <code>(let\\s+)</code> الكلمة الحرفية <code>let</code> مع المسافة التالية لها، فيشير الاستبدال إليها بـ <code>$1</code>، حافظًا السياق الأصلي. ويضمن استخدام <code>\\b</code> (حد الكلمة) ألّا تطابق كلمات جزئية مثل <code>myVariableAgain</code>.</p>
<blockquote>
<p><strong>اختبر أولًا</strong></p>
<p>اختبر أنماطك النمطية على أسطر قليلة قبل الاستبدال في قاعدة شيفرتك كلها. فقد تؤدي الاستبدالات الجماعية غير المقصودة إلى نتائج مضحكة أو كارثية (حسب منظورك).</p>
</blockquote>
<h2 id="الحفاظ-على-حالة-الأحرف">الحفاظ على حالة الأحرف</h2>
<p>يمتلك Visual Studio Code ميزة لطيفة هي «Preserve Case»، وهي مفيدة خصوصًا عند إعادة هيكلة أسماء متغيّرات بأحرف كبيرة مختلفة. افترض أنك تبحث عن <code>name</code> وتستبدلها بـ <code>thing</code>. فإن فعّلت Preserve Case، يصبح <code>Name</code> هو <code>Thing</code>، ويصبح <code>NAME</code> هو <code>THING</code>، بما يطابق نمط الأحرف الكبيرة الأصلي.</p>
<p>ويمكنك تبديل هذا الخيار بالنقر على أيقونة <code>AB</code> في عرض البحث. إنها طريقة سهلة لتجنّب الأخطاء المتعلقة بحالة الأحرف مع الاستمرار في أتمتة معظم إعادة الهيكلة.</p>
<h2 id="محرر-البحث-عرض-مخصص-لنتائج-البحث">محرّر البحث: عرض مخصّص لنتائج البحث</h2>
<p>يقدّم Visual Studio Code محرّر بحث مخصّصًا يوفّر طريقة أقوى للتعامل مع نتائج البحث. اضغط <code>Ctrl+Shift+J</code> (أو <code>Cmd+Shift+J</code> على macOS) لفتح محرّر البحث، الذي يعرض نتائج بحثك في عرض محرّر كامل.</p>
<h3 id="فوائد-محرر-البحث">فوائد محرّر البحث:</h3>
<ol>
<li><strong>نتائج دائمة</strong>: يحفظ محرّر البحث نتائج بحثك كمستند، ما يتيح لك الرجوع إليها لاحقًا دون إعادة تشغيل البحث.</li>
<li><strong>قدرات محرّر كاملة</strong>: استخدم كل ميزات المحرّر القياسية مثل المؤشرات المتعددة والتحديد والتنقل بلوحة المفاتيح على نتائج بحثك.</li>
<li><strong>عرض سياقي</strong>: تُعرض كل مطابقة مع عدة أسطر من السياق، ما يسهّل فهم الشيفرة المحيطة.</li>
<li><strong>تصفية متقدّمة</strong>: طبّق تصفية إضافية على نتائج بحثك دون البدء من جديد.</li>
<li><strong>نتائج قابلة للبحث</strong>: يمكنك إجراء بحث داخل نتائج بحثك — أي إنشاء بحث متداخل.</li>
</ol>
<h3 id="سير-عمل-مثال">سير عمل مثال</h3>
<ol>
<li>اضغط <code>Ctrl+Shift+J</code> لفتح محرّر البحث</li>
<li>أدخل مصطلح البحث أو النمط النمطي</li>
<li>اضبط أنماط التضمين والاستبعاد</li>
<li>اضغط Enter لتشغيل البحث</li>
<li>استخدم اختصارات لوحة مفاتيح المحرّر القياسية للتنقل في النتائج</li>
<li>طبّق تصفية إضافية عبر شريط البحث في الأعلى</li>
<li>انقر نقرًا مزدوجًا على أي نتيجة للانتقال إلى ذلك الموضع في ملف المصدر</li>
</ol>
<p>عند العمل مع قواعد شيفرة كبيرة أو عمليات بحث معقّدة، يصبح محرّر البحث لا يُقدّر بثمن لتنظيم النتائج الكثيرة والتنقل فيها. ويمكنك حتى فتح عدة محرّرات بحث في الوقت نفسه لاستعلامات مختلفة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك حفظ محرّر بحث للرجوع إلى البحث نفسه لاحقًا. استخدم <code>File &gt; Save As…</code> أو الاختصار <code>Ctrl+S</code> (<code>Cmd+S</code> على macOS).</p>
</blockquote>
<h2 id="مجموعات-الالتقاط-المتقدمة-في-الاستبدالات">مجموعات الالتقاط المتقدّمة في الاستبدالات</h2>
<p>مجموعات الالتقاط في التعبيرات النمطية ليست للحفاظ على أجزاء من المطابقة فحسب — بل يمكن إعادة ترتيبها وتكرارها وتحويلها لإجراء معالجات نصية قوية.</p>
<h3 id="إعادة-ترتيب-النص-بمجموعات-الالتقاط">إعادة ترتيب النص بمجموعات الالتقاط</h3>
<p>تخيّل أن لديك قائمة أسماء بصيغة «LastName, FirstName» تحتاج إلى عكسها:</p>
<pre><code class="language-typescript">(<span class="hljs-title class_">Smith</span>, <span class="hljs-title class_">John</span>);
(<span class="hljs-title class_">Johnson</span>, <span class="hljs-title class_">Sarah</span>);
(<span class="hljs-title class_">Williams</span>, <span class="hljs-title class_">Michael</span>);
</code></pre>
<p>يمكنك استخدام مجموعات الالتقاط لتبديل الترتيب:</p>
<ul>
<li>بحث: <code>([^,]+),\\s*(.+)</code></li>
<li>استبدال: <code>$2 $1</code></li>
</ul>
<p>فيحوّل هذا النص إلى:</p>
<pre><code class="language-typescript"><span class="hljs-title class_">John</span> <span class="hljs-title class_">Smith</span>
<span class="hljs-title class_">Sarah</span> <span class="hljs-title class_">Johnson</span>
<span class="hljs-title class_">Michael</span> <span class="hljs-title class_">Williams</span>
</code></pre>
<p>يلتقط النمط كل ما قبل الفاصلة كـ <code>$1</code> وكل ما بعدها (باستثناء المسافة) كـ <code>$2</code>، ثم يبدّلهما في الاستبدال.</p>
<h3 id="تحويل-صيغ-التواريخ">تحويل صيغ التواريخ</h3>
<p>هل تحتاج إلى تحويل التواريخ من صيغة <code>MM/DD/YYYY</code> إلى صيغة <code>YYYY-MM-DD</code>؟</p>
<ul>
<li>بحث: <code>(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})</code></li>
<li>استبدال: <code>$3-$1-$2</code></li>
</ul>
<p>فيغيّر هذا:</p>
<pre><code class="language-typescript"><span class="hljs-number">12</span> / <span class="hljs-number">25</span> / <span class="hljs-number">2023</span>;
<span class="hljs-number">1</span> / <span class="hljs-number">15</span> / <span class="hljs-number">2024</span>;
</code></pre>
<p>إلى:</p>
<pre><code class="language-typescript"><span class="hljs-number">2023</span> - <span class="hljs-number">12</span> - <span class="hljs-number">25</span>;
<span class="hljs-number">2024</span> - <span class="hljs-number">1</span> - <span class="hljs-number">15</span>;
</code></pre>
<p>ولنسخة أكثر متانة تضمن شهرًا ويومًا من رقمين:</p>
<ul>
<li>بحث: <code>(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})</code></li>
<li>استبدال: <code>$3-\${1.padStart(2, '0')}-\${2.padStart(2, '0')}</code></li>
</ul>
<h3 id="تحويل-html-إلى-jsx">تحويل HTML إلى JSX</h3>
<p>عند تحويل HTML إلى JSX، غالبًا ما تحتاج إلى تغيير أسماء الخصائص:</p>
<ul>
<li>بحث: <code>&lt;([a-z]+)([^&gt;]*)\\sclass=&quot;([^&quot;]*)&quot;([^&gt;]*)&gt;</code></li>
<li>استبدال: <code>&lt;$1$2 className=&quot;$3&quot;$4&gt;</code></li>
</ul>
<p>فيغيّر هذا <code>&lt;div class=&quot;container&quot;&gt;</code> إلى <code>&lt;div className=&quot;container&quot;&gt;</code>.</p>
<h3 id="إنشاء-معرفات-url-من-العناوين">إنشاء معرّفات URL من العناوين</h3>
<p>حوّل عناوين المقالات إلى معرّفات صديقة لعنوان URL:</p>
<ul>
<li>بحث: <code>([A-Z])([A-Za-z\\s]+)</code></li>
<li>استبدال: <code>\${1.toLowerCase()}\${2.toLowerCase().replace(/\\s+/g, '-')}</code></li>
</ul>
<p>فيحوّل هذا «My Article Title» إلى «my-article-title».</p>
<h3 id="التحويل-بين-أساليب-البرمجة">التحويل بين أساليب البرمجة</h3>
<p>حوّل snake_case إلى camelCase:</p>
<ul>
<li>بحث: <code>([a-z])_([a-z])</code></li>
<li>استبدال: <code>$1\${2.toUpperCase()}</code></li>
</ul>
<p>فيغيّر هذا «user_profile_id» إلى «userProfileId».</p>
<p>أو حوّل camelCase إلى kebab-case:</p>
<ul>
<li>بحث: <code>([a-z])([A-Z])</code></li>
<li>استبدال: <code>$1-\${2.toLowerCase()}</code></li>
</ul>
<p>فيغيّر هذا «userProfileId» إلى «user-profile-id».</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تذكّر أن عمليات الاستبدال بالتعبيرات النمطية في Visual Studio Code تحدث من اليسار إلى اليمين، لذا قد تتطلّب التحويلات المعقّدة عدة مرات بأنماط مختلفة.</p>
</blockquote>
<h2 id="حفظ-استعلامات-البحث">حفظ استعلامات البحث</h2>
<p>نعم، يمكنك حفظ استعلامات البحث باستخدام محرّر البحث. وبمجرد أن تفتح محرّر البحث (اضغط <code>Ctrl+Shift+J</code> على Windows/Linux أو <code>Cmd+Shift+J</code> على macOS) وتشغّل بحثك، يمكنك حفظ النتائج — بما فيها الاستعلام نفسه — في ملف. ما عليك سوى استخدام <strong>File → Save As…</strong> (أو الاختصار المقابل) لتخزين مستند بحثك. ولا يحفظ هذا الملف المخرجات فحسب، بل معاملات البحث أيضًا، فيمكنك إعادة تشغيل الاستعلام أو تعديله لاحقًا بسهولة. وهو مفيد خصوصًا للبحوث المتكرّرة في قواعد شيفرة كبيرة أو عندما تريد مشاركة استعلام بحث معقّد مع فريقك.</p>
<blockquote>
<p><strong>استفد من محرّر البحث للحفاظ على مكتبة من استعلاماتك الأكثر استخدامًا. وهذا يضمن ألّا تضطر إلى إعادة بناء أنماط نمطية معقّدة أو مرشّحات تضمين واستبعاد من الصفر كلما احتجت إليها.</strong></p>
</blockquote>
`,a={book:e,chapter:s,chapterTitle:n,slug:l,title:o,headings:c,html:d};export{e as book,s as chapter,n as chapterTitle,a as default,c as headings,d as html,l as slug,o as title};
