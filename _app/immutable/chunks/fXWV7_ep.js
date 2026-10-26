const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="refactoring-in-vscode",e="إعادة الهيكلة في Visual Studio Code",c=[{depth:2,id:"إعادة-تسمية-رمز",text:"إعادة تسمية رمز"},{depth:2,id:"استخراج-تابع-أو-دالة",text:"استخراج تابع أو دالة"},{depth:2,id:"استخراج-متغير-أو-ثابت",text:"استخراج متغيّر أو ثابت"},{depth:2,id:"إصلاحات-سريعة",text:"إصلاحات سريعة"},{depth:2,id:"لوحة-المشكلات",text:"لوحة المشكلات"},{depth:2,id:"إعادة-الهيكلة-التضمينية",text:"إعادة الهيكلة التضمينية"},{depth:2,id:"ترتيب-الاستيرادات",text:"ترتيب الاستيرادات"},{depth:2,id:"النقل-إلى-ملف-جديد",text:"النقل إلى ملف جديد"},{depth:2,id:"تحويل-الدالة-إلى-دالة-سهمية",text:"تحويل الدالة إلى دالة سهمية"},{depth:2,id:"التغليف-بـ-surround-with",text:"التغليف بـ Surround With"}],l=`<p>هناك مجموعة من اللمسات الجميلة في Visual Studio Code تجعل إعادة الهيكلة <em>أسهل بكثير</em>.</p>
<h2 id="إعادة-تسمية-رمز">إعادة تسمية رمز</h2>
<p>حسنًا، هذه على الأرجح ميزتي المفضّلة التي أستخدمها كل يوم تقريبًا.</p>
<p>عندما تحتاج إلى إعادة تسمية متغيّر أو دالة أو صنف في مشروعك كله، اضغط <code>F2</code> على الرمز الذي تريد إعادة تسميته. وسيطلب منك Visual Studio Code الاسم الجديد، ثم يحدّث كل مرجع ليطابقه. وهذه العملية مفيدة خصوصًا في اللغات قوية الأنواع مثل TypeScript، حيث يمكن للمحرّر تتبّع الاستخدام في أنحاء قاعدة شيفرتك بدقة.</p>
<blockquote>
<p><strong>إذا كان مشروعك يحتوي على خادم لغة (مثل TypeScript Language Server)، فيمكن لميزة إعادة التسمية أن تعمل بسلاسة عبر ملفات متعددة، فتضمن ألّا يبقى شيء دون تحديث.</strong></p>
</blockquote>
<h2 id="استخراج-تابع-أو-دالة">استخراج تابع أو دالة</h2>
<p>أحيانًا تكبر كتلة شيفرة في دالة كثيرًا أو تتولّى مسؤوليات متعددة. ويمكنك إبراز مقطع الشيفرة هذا، ثم البحث عن إجراء «Extract Method» أو «Extract Function». وغالبًا ما توفّره إضافات اللغات، مثل إضافتي TypeScript و JavaScript الرسميتين. وحينها يلفّ Visual Studio Code الشيفرة المبرزة في دالة جديدة، ويستبدل المقطع الأصلي باستدعاء للدالة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processNumbers</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Original code that can be extracted</span>
  <span class="hljs-keyword">const</span> total = nums.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, curr</span>) =&gt;</span> acc + curr, <span class="hljs-number">0</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Sum of numbers: <span class="hljs-subst">\${total}</span>\`</span>);

  <span class="hljs-comment">// … more code …</span>
}

<span class="hljs-comment">// After extracting method/function:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processNumbers</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-title function_">calculateAndLogSum</span>(nums);
  <span class="hljs-comment">// … more code …</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">calculateAndLogSum</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">const</span> total = nums.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, curr</span>) =&gt;</span> acc + curr, <span class="hljs-number">0</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Sum of numbers: <span class="hljs-subst">\${total}</span>\`</span>);
}
</code></pre>
<p>وتجعل هذه المقاربة شيفرتك أكثر وحداتية وأسهل صيانة.</p>
<h2 id="استخراج-متغير-أو-ثابت">استخراج متغيّر أو ثابت</h2>
<p>ينطبق سير عمل مشابه عند استخراج تعبيرات شائعة إلى متغيّر أو ثابت منفصل. فقد تبدأ بحسابات متكرّرة أو قيمة مكتوبة مباشرة مبعثرة في شيفرتك. أبرز التعبير، وانقر بزر الفأرة الأيمن، واختر إعادة هيكلة «Extract to constant» أو «Extract to variable». وسيستبدل Visual Studio Code كل حالة من ذلك التعبير بمتغيّر أو ثابت جديد، معرَّف مرة واحدة في أعلى النطاق.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before extraction:</span>
<span class="hljs-keyword">const</span> area = width * height;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Area is <span class="hljs-subst">\${width * height}</span>\`</span>);

<span class="hljs-comment">// After extracting variable:</span>
<span class="hljs-keyword">const</span> area = width * height;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Area is <span class="hljs-subst">\${area}</span>\`</span>);
</code></pre>
<p>استخدم هذه الميزة لجعل شيفرتك توثّق نفسها بنفسها ولتقليل التكرار.</p>
<blockquote>
<p><strong>راقب مصباح إجراء الشيفرة الذي يظهر في هامش المحرّر عند تحديد شيفرة أو تمرير المؤشر فوقها. فكثيرًا ما تشير هذه الأيقونة إلى خيارات إعادة هيكلة آلية، بما فيها الاستخراج.</strong></p>
</blockquote>
<h2 id="إصلاحات-سريعة">إصلاحات سريعة</h2>
<p>أثناء البرمجة، قد تلاحظ أيقونة مصباح أو خطوطًا متعرّجة صفراء تحت بعض الشيفرة. وتشير هذه إلى أن Visual Studio Code (أو خادم اللغة أو الفاحص الساكن) لديه اقتراحات. فمثلًا، في ملف JS، إن كان لديك متغيّر غير مستخدم، فقد ترى تسطيرًا رماديًا. أو إن كتبت <code>console</code> خطأً هكذا <code>consle</code>، فقد يظهر خط متعرّج أحمر ومصباح يعرض «هل تقصد ‘console’؟». ولتشغيل اقتراحات <strong>الإصلاح السريع</strong> هذه يدويًا، ضع المؤشر على الخطأ أو الشيفرة المسطّرة واضغط <code>Ctrl-.</code> أو <code>Cmd+.</code>. فتظهر قائمة سياقية بالإصلاحات وعمليات إعادة الهيكلة. ويمكنك التنقل فيها بالأسهم أو النقر. فمثلًا، على <code>consle</code> المكتوبة خطأً، قد يقترح <code>Ctrl+.</code> تغييرها إلى «console» – واختيار ذلك سيصحّح الخطأ تلقائيًا. ومثال آخر: في TypeScript أو C#، إن كان لديك استدعاء لدالة غير موجودة، فقد يقدّم الإصلاح السريع «إنشاء تعريف دالة لـ …» ويولّد لك بديلًا.</p>
<p><strong>عمليات إعادة هيكلة أخرى:</strong> حسب اللغة، قد يقدّم <code>Ctrl+.</code> أشياء مثل «استخراج دالة من التحديد» أو «التحويل إلى نص قالب» أو «التغليف بـ try/catch». ويستحق الأمر فحص المصباح إن فكرت «ليتني أستطيع فعل كذا سريعًا» – فأحيانًا يوفّره دعم اللغة. فمثلًا، في ملف JSX، قد تحصل على «التغليف في div» وغير ذلك كإصلاح سريع. أو ببساطة «إزالة الاستيراد غير المستخدم» إن كانت وحدة مستوردة لكنها غير مستخدمة.</p>
<h2 id="لوحة-المشكلات">لوحة المشكلات</h2>
<p>راقب لوحة المشكلات (يمكنك تبديلها بـ <code>Ctrl+Shift+M</code>). وإن ظهر رقم في أسفل اليسار (شريط الحالة) مثل ❗3 أو ⚠️1، فهو عدد الأخطاء أو التحذيرات. والنقر عليه يفتح لوحة المشكلات. ويمكنك النقر على عنصر للانتقال إليه. وكثيرًا ما يستطيع الإصلاح السريع (إن توفّر) معالجة تلك التحذيرات (مثل إضافة استيراد مفقود، أو إضافة <code>// @ts-ignore</code>، وغير ذلك حسب السياق).</p>
<h2 id="إعادة-الهيكلة-التضمينية">إعادة الهيكلة التضمينية</h2>
<p>عندما يتبيّن أن متغيّرًا أو دالة استخرجتها سابقًا باتت زائدة، فاستخدم إعادة الهيكلة التضمينية لعكس العملية. يستبدل هذا الأمر كل حالات الرمز بقيمته أو شيفرته الأصلية، ثم يزيل إعلانه. انقر بزر الفأرة الأيمن على الرمز واختر «Inline Variable» (أو «Inline Function»)، أو استدعِ الأمر من لوحة الأوامر بالبحث عن «Inline». ويساعدك هذا على تبسيط شيفرتك عندما لا تعود هناك حاجة إلى تجريد إضافي.</p>
<h2 id="ترتيب-الاستيرادات">ترتيب الاستيرادات</h2>
<p>قد تزدحم ملفاتك باستيرادات غير مستخدمة أو غير مرتّبة، خصوصًا في مشاريع TypeScript. ويوفّر VS Code إجراء «Organize Imports» الذي يزيل الاستيرادات غير المستخدمة تلقائيًا ويرتّب الباقي. واستدعِه من لوحة الأوامر أو اضبطه ليعمل عند الحفظ. وتنظّف إعادة الهيكلة هذه ترويسة ملفك، فتحسّن الوضوح وقابلية الصيانة.</p>
<h2 id="النقل-إلى-ملف-جديد">النقل إلى ملف جديد</h2>
<p>مع تطوّر شيفرتك، قد ترى أن دوال أو أصناف أو ثوابت معيّنة أفضل موضعًا في وحدتها الخاصة. وتوفّر بعض إضافات اللغات إعادة هيكلة «Move to New File» التي تستخرج الرمز المحدّد تلقائيًا إلى ملف جديد وتحدّث كل المراجع وفق ذلك. وتجعل هذه الوحداتية قاعدة شيفرتك أسهل في التنقل وإعادة الاستخدام في أنحاء مشروعك.</p>
<h2 id="تحويل-الدالة-إلى-دالة-سهمية">تحويل الدالة إلى دالة سهمية</h2>
<p>في JavaScript و TypeScript، قد يؤدي تحويل تعبيرات الدوال التقليدية إلى دوال سهمية إلى صيغة أكثر إيجازًا وحداثة. ويمكن لأدوات إعادة الهيكلة في VS Code أن تقدّم خيار «Convert to Arrow Function» الذي يحوّل شيفرتك مع الحفاظ على سلوكها. وهذا مفيد خصوصًا عند إعادة هيكلة شيفرة قديمة أو الالتزام بمعايير برمجية معاصرة.</p>
<h2 id="التغليف-بـ-surround-with">التغليف بـ Surround With</h2>
<p>كثيرًا ما يمكن أتمتة تغليف كتل الشيفرة ببنى شائعة — مثل كتل <code>try</code>/<code>catch</code> أو عبارات if/else أو مقتطفات مخصّصة — باستخدام إعادة هيكلة «Surround With». حدّد كتلة الشيفرة، ثم استدعِ إعادة الهيكلة من لوحة الأوامر لاختيار قالب تغليف من المتاح. وتسريع هذه الميزة المهام المتكرّرة وتضمن الاتساق في طريقة تغليفك لأنماط الشيفرة.</p>
<p>وتمكّنك كل أداة من أدوات إعادة الهيكلة الإضافية هذه من تبسيط تغييرات شيفرتك والحفاظ على قاعدة شيفرة نظيفة ووحداتية وحديثة.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:c,html:l};export{s as book,n as chapter,a as chapterTitle,p as default,c as headings,l as html,t as slug,e as title};
