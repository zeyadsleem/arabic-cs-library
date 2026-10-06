const e="go-style",n="decisions-1",o="قرارات أسلوب Go (1 من 2)",t="index",a="قرارات أسلوب Go (1 من 2)",s=[{depth:2,id:"نبذة",text:"نبذة"},{depth:2,id:"التسمية",text:"التسمية"},{depth:3,id:"الشرطات-السفلية-underscores",text:"الشرطات السفلية (Underscores)"},{depth:3,id:"أسماء-الحزم-package-names",text:"أسماء الحزم (Package names)"},{depth:3,id:"أسماء-المستقبل-receiver-names",text:"أسماء المستقبِل (Receiver names)"},{depth:3,id:"أسماء-الثوابت-constant-names",text:"أسماء الثوابت (Constant names)"},{depth:3,id:"الاختصارات-initialisms",text:"الاختصارات (Initialisms)"},{depth:3,id:"الدوال-الجالبة-getters",text:"الدوال الجالبة (Getters)"},{depth:3,id:"أسماء-المتغيرات-variable-names",text:"أسماء المتغيّرات (Variable names)"},{depth:3,id:"التكرار-repetition",text:"التكرار (Repetition)"},{depth:2,id:"التعليقات-commentary",text:"التعليقات (Commentary)"},{depth:3,id:"طول-سطر-التعليق",text:"طول سطر التعليق"},{depth:3,id:"التعليقات-التوثيقية-doc-comments",text:"التعليقات التوثيقية (Doc comments)"},{depth:3,id:"جمل-التعليقات",text:"جُمل التعليقات"},{depth:3,id:"الأمثلة",text:"الأمثلة"},{depth:3,id:"وسائط-النتائج-المسماة",text:"وسائط النتائج المسماة"},{depth:3,id:"تعليقات-الحزم",text:"تعليقات الحزم"},{depth:2,id:"الاستيرادات",text:"الاستيرادات"},{depth:3,id:"إعادة-تسمية-الاستيرادات",text:"إعادة تسمية الاستيرادات"},{depth:3,id:"تجميع-الاستيرادات",text:"تجميع الاستيرادات"},{depth:3,id:"الاستيراد-quotالفارغquot-import",text:"الاستيراد &quot;الفارغ&quot; (import _)"},{depth:3,id:"الاستيراد-quotالنقطيquot-import",text:"الاستيراد &quot;النقطي&quot; (import .)"},{depth:2,id:"الأخطاء",text:"الأخطاء"},{depth:3,id:"إرجاع-الأخطاء",text:"إرجاع الأخطاء"},{depth:3,id:"نصوص-الأخطاء",text:"نصوص الأخطاء"},{depth:3,id:"التعامل-مع-الأخطاء",text:"التعامل مع الأخطاء"},{depth:3,id:"الأخطاء-داخل-النطاق-in-band-errors",text:"الأخطاء داخل النطاق (In-band errors)"},{depth:3,id:"إزاحة-مسار-الأخطاء",text:"إزاحة مسار الأخطاء"}],d=`<h2 id="نبذة">نبذة</h2>
<p>يحتوي هذا المستند على قرارات أسلوبية تهدف إلى توحيد النصائح التي يقدّمها مرشدو قابلية القراءة في Go، وتوفير إرشادات وتفسيرات وأمثلة معيارية لها.</p>
<p>هذا المستند <strong>ليس شاملًا</strong> وسينمو بمرور الوقت. وفي الحالات التي يتعارض فيها <a href="/arabic-cs-library/book/go-style/guide/index">دليل الأسلوب الأساسي</a> مع النصائح الواردة هنا، <strong>فإن دليل الأسلوب هو المرجع</strong>، وينبغي تحديث هذا المستند وفقًا لذلك.</p>
<p>راجع <a href="https://google.github.io/styleguide/go#about">النظرة العامة</a> للاطّلاع على المجموعة الكاملة من مستندات أسلوب Go.</p>
<p>انتقلت الأقسام التالية من قرارات الأسلوب إلى جزء آخر من الدليل:</p>
<ul>
<li><strong>أسماء الحروف المختلطة (MixedCaps)</strong>: راجع <a href="/arabic-cs-library/book/go-style/guide/index#mixed-caps">guide#mixed-caps</a></li>
<li><strong>التنسيق (Formatting)</strong>: راجع <a href="/arabic-cs-library/book/go-style/guide/index#formatting">guide#formatting</a></li>
<li><strong>طول السطر (Line Length)</strong>: راجع <a href="/arabic-cs-library/book/go-style/guide/index#line-length">guide#line-length</a></li>
</ul>
<h2 id="التسمية">التسمية <span class="content-anchor" id="naming"></span></h2>
<p>راجع قسم التسمية في <a href="/arabic-cs-library/book/go-style/guide/index#naming">دليل الأسلوب الأساسي</a> للحصول على إرشادات شاملة حول التسمية. وتقدّم الأقسام التالية توضيحات إضافية حول مجالات محدّدة في التسمية.</p>
<h3 id="الشرطات-السفلية-underscores">الشرطات السفلية (Underscores)</h3>
<p>ينبغي عمومًا ألّا تحتوي الأسماء في Go على شرطات سفلية (underscores). وهناك ثلاثة استثناءات لهذا المبدأ:</p>
<ol>
<li>يجوز أن تحتوي أسماء الحزم التي لا يستوردها إلا الكود المولَّد على شرطات سفلية. راجع <a href="#package-names">أسماء الحزم</a> لمزيد من التفاصيل حول كيفية اختيار أسماء حزم متعدّدة الكلمات.</li>
<li>يجوز أن تتضمّن أسماء دوال الاختبار (Test) والقياس (Benchmark) والمثال (Example) داخل ملفات <code>*_test.go</code> شرطات سفلية.</li>
<li>قد تعيد المكتبات منخفضة المستوى التي تتفاعل مع نظام التشغيل أو cgo استخدام معرّفات، كما هو الحال في <a href="https://pkg.go.dev/syscall#pkg-constants"><code>syscall</code></a>. ويُتوقَّع أن يكون هذا نادرًا جدًا في معظم قواعد الكود.</li>
</ol>
<p><strong>ملاحظة:</strong> أسماء ملفات الكود المصدري ليست معرّفات Go ولا يلزم أن تتبع هذه الأعراف. ويجوز أن تحتوي على شرطات سفلية.</p>
<h3 id="أسماء-الحزم-package-names">أسماء الحزم (Package names) <span class="content-anchor" id="package-names"></span></h3>
<p>في Go، يجب أن تكون أسماء الحزم موجزة وأن تستخدم الأحرف الصغيرة والأرقام فقط (مثل <a href="https://pkg.go.dev/k8s.io/client-go/kubernetes"><code>k8s</code></a> و<a href="https://pkg.go.dev/golang.org/x/oauth2"><code>oauth2</code></a>). وينبغي أن تبقى أسماء الحزم متعدّدة الكلمات موصولة وبأحرف صغيرة بالكامل (مثل <a href="https://pkg.go.dev/text/tabwriter"><code>tabwriter</code></a> بدلًا من <code>tabWriter</code> أو <code>TabWriter</code> أو <code>tab_writer</code>).</p>
<p>تجنّب اختيار أسماء حزم يُرجَّح أن تُحجب (shadowed) بأسماء متغيّرات محلية شائعة الاستخدام. على سبيل المثال، <code>usercount</code> اسم حزمة أفضل من <code>count</code>، لأن <code>count</code> اسم متغيّر شائع الاستخدام.</p>
<p>لا ينبغي أن تحتوي أسماء حزم Go على شرطات سفلية. وإذا احتجت إلى استيراد حزمة يحوي اسمها شرطة سفلية (عادةً من كود مولَّد أو من طرف ثالث)، فيجب إعادة تسميتها وقت الاستيراد إلى اسم مناسب للاستخدام في كود Go.</p>
<p>ويُستثنى من ذلك أن أسماء الحزم التي لا يستوردها إلا الكود المولَّد يجوز أن تحتوي على شرطات سفلية. وتشمل الأمثلة المحدّدة:</p>
<ul>
<li>استخدام اللاحقة <code>_test</code> لاختبارات الوحدة التي تختبر فقط الواجهة البرمجية المصدَّرة للحزمة (تسمّي حزمة <code>testing</code> هذه الاختبارات <a href="https://pkg.go.dev/testing">&quot;black box tests&quot;</a>). على سبيل المثال، يجب أن تعرّف الحزمة <code>linkedlist</code> اختبارات وحدتها ذات الصندوق الأسود في حزمة تُسمّى <code>linkedlist_test</code> (وليس <code>linked_list_test</code>)</li>
<li>استخدام الشرطات السفلية واللاحقة <code>_test</code> للحزم التي تحدّد اختبارات وظيفية أو تكاملية. على سبيل المثال، يمكن تسمية اختبار تكامل خدمة قائمة مرتبطة <code>linked_list_service_test</code></li>
<li>استخدام اللاحقة <code>_test</code> لـ<a href="https://go.dev/blog/examples">أمثلة التوثيق على مستوى الحزمة</a></li>
</ul>
<p>تجنّب أسماء الحزم غير المفيدة مثل <code>util</code> و<code>utility</code> و<code>common</code> و<code>helper</code> و<code>model</code> و<code>testhelper</code> وما شابهها، لأنها تغري مستخدمي الحزمة بـ<a href="#import-renaming">إعادة تسميتها عند الاستيراد</a>. راجع:</p>
<ul>
<li><a href="/arabic-cs-library/book/go-style/best-practices-2/index#util-packages">إرشادات حول ما يسمّى &quot;حزم الأدوات المساعدة&quot;</a></li>
<li><a href="https://google.github.io/styleguide/go/index.html#gotip">Go Tip #97: What's in a Name</a></li>
<li><a href="https://google.github.io/styleguide/go/index.html#gotip">Go Tip #108: The Power of a Good Package Name</a></li>
</ul>
<p>عند إعادة تسمية حزمة مستوردة (مثل <code>import foopb &quot;path/to/foo_go_proto&quot;</code>)، يجب أن يتوافق الاسم المحلي للحزمة مع القواعد المذكورة أعلاه، لأن الاسم المحلي يحدّد كيفية الإشارة إلى الرموز في الحزمة داخل الملف. وإذا أُعيدت تسمية استيراد معيّن في عدة ملفات، خصوصًا في الحزم نفسها أو الحزم المجاورة، فينبغي استخدام الاسم المحلي نفسه قدر الإمكان للاتساق.</p>
<p>راجع أيضًا: <a href="https://go.dev/blog/package-names">تدوينة مدونة Go حول أسماء الحزم</a>.</p>
<h3 id="أسماء-المستقبل-receiver-names">أسماء المستقبِل (Receiver names) <span class="content-anchor" id="receiver-names"></span></h3>
<p>يجب أن تكون أسماء متغيّرات <a href="https://golang.org/ref/spec#Method_declarations">المستقبِل</a> كما يلي:</p>
<ul>
<li>قصيرة (عادةً بحرف أو حرفين)</li>
<li>اختصارات للنوع نفسه</li>
<li>مطبَّقة باتساق على كل مستقبِل لذلك النوع</li>
<li>ألّا تكون شرطة سفلية؛ احذف الاسم إذا لم يُستخدم</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم الطويل</th>
<th>اسم أفضل</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>func (tray Tray)</code></td>
<td><code>func (t Tray)</code></td>
</tr>
<tr>
<td><code>func (info *ResearchInfo)</code></td>
<td><code>func (ri *ResearchInfo)</code></td>
</tr>
<tr>
<td><code>func (this *ReportWriter)</code></td>
<td><code>func (w *ReportWriter)</code></td>
</tr>
<tr>
<td><code>func (self *Scanner)</code></td>
<td><code>func (s *Scanner)</code></td>
</tr>
</tbody>
</table>
<h3 id="أسماء-الثوابت-constant-names">أسماء الثوابت (Constant names)</h3>
<p>يجب أن تستخدم أسماء الثوابت <a href="/arabic-cs-library/book/go-style/guide/index#mixed-caps">MixedCaps</a> مثل جميع الأسماء الأخرى في Go. (تبدأ الثوابت <a href="https://tour.golang.org/basics/3">المصدَّرة</a> بحرف كبير، بينما تبدأ الثوابت غير المصدَّرة بحرف صغير.) وينطبق ذلك حتى عندما يخالف أعراف لغات أخرى. ولا ينبغي أن تكون أسماء الثوابت مشتقّة من قيمها، بل ينبغي أن تشرح ما تدلّ عليه القيمة.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Good:</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MaxPacketSize</span> = <span class="hljs-number">512</span>
<span class="hljs-title function_">const</span> (
    <span class="hljs-title class_">ExecuteBit</span> = <span class="hljs-number">1</span> &lt;&lt; iota
    <span class="hljs-title class_">WriteBit</span>
    <span class="hljs-title class_">ReadBit</span>
)
</code></pre>
<p>لا تستخدم أسماء ثوابت غير MixedCaps أو ثوابت بادئتها <code>K</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Bad:</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">MAX_PACKET_SIZE</span> = <span class="hljs-number">512</span>
<span class="hljs-keyword">const</span> kMaxBufferSize = <span class="hljs-number">1024</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">KMaxUsersPergroup</span> = <span class="hljs-number">500</span>
</code></pre>
<p>سمِّ الثوابت بناءً على دورها، لا على قيمها. وإذا لم يكن للثابت دور غير قيمته، فلا حاجة إلى تعريفه كثابت.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Bad:</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Twelve</span> = <span class="hljs-number">12</span>
<span class="hljs-title function_">const</span> (
    <span class="hljs-title class_">UserNameColumn</span> = <span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-title class_">GroupColumn</span>    = <span class="hljs-string">&quot;group&quot;</span>
)
</code></pre>
<h3 id="الاختصارات-initialisms">الاختصارات (Initialisms)</h3>
<p>ينبغي أن تكون الكلمات في الأسماء التي هي اختصارات (initialisms) أو أحرف أولى (acronyms) (مثل <code>URL</code> و<code>NATO</code>) بحالة أحرف موحّدة. فينبغي أن يظهر <code>URL</code> بصيغة <code>URL</code> أو <code>url</code> (كما في <code>urlPony</code> أو <code>URLPony</code>)، وليس بصيغة <code>Url</code> أبدًا. وكقاعدة عامة، ينبغي أيضًا كتابة المعرّفات (مثل <code>ID</code> و<code>DB</code>) بأحرف كبيرة على نحو مماثل لاستخدامها في النثر الإنجليزي.</p>
<ul>
<li>في الأسماء التي تحتوي على عدة اختصارات (مثل <code>XMLAPI</code> لأنه يحتوي على <code>XML</code> و<code>API</code>)، ينبغي أن يكون كل حرف داخل اختصار معيّن بالحالة نفسها، لكن لا يلزم أن يكون كل اختصار في الاسم بالحالة نفسها.</li>
<li>في الأسماء التي تحتوي على اختصار يتضمّن حرفًا صغيرًا (مثل <code>DDoS</code> و<code>iOS</code> و<code>gRPC</code>)، ينبغي أن يظهر الاختصار كما يظهر في النثر القياسي، إلا إذا احتجت إلى تغيير الحرف الأول من أجل <a href="https://golang.org/ref/spec#Exported_identifiers">التصدير</a>. في هذه الحالات، ينبغي أن يكون الاختصار كاملًا بالحالة نفسها (مثل <code>ddos</code> و<code>IOS</code> و<code>GRPC</code>).</li>
</ul>
<table>
<thead>
<tr>
<th>الاستخدام الإنجليزي</th>
<th>النطاق</th>
<th>الصحيح</th>
<th>غير الصحيح</th>
</tr>
</thead>
<tbody>
<tr>
<td>XML API</td>
<td>Exported</td>
<td><code>XMLAPI</code></td>
<td><code>XmlApi</code>, <code>XMLApi</code>, <code>XmlAPI</code>, <code>XMLapi</code></td>
</tr>
<tr>
<td>XML API</td>
<td>Unexported</td>
<td><code>xmlAPI</code></td>
<td><code>xmlapi</code>, <code>xmlApi</code></td>
</tr>
<tr>
<td>iOS</td>
<td>Exported</td>
<td><code>IOS</code></td>
<td><code>Ios</code>, <code>IoS</code></td>
</tr>
<tr>
<td>iOS</td>
<td>Unexported</td>
<td><code>iOS</code></td>
<td><code>ios</code></td>
</tr>
<tr>
<td>gRPC</td>
<td>Exported</td>
<td><code>GRPC</code></td>
<td><code>Grpc</code></td>
</tr>
<tr>
<td>gRPC</td>
<td>Unexported</td>
<td><code>gRPC</code></td>
<td><code>grpc</code></td>
</tr>
<tr>
<td>DDoS</td>
<td>Exported</td>
<td><code>DDoS</code></td>
<td><code>DDOS</code>, <code>Ddos</code></td>
</tr>
<tr>
<td>DDoS</td>
<td>Unexported</td>
<td><code>ddos</code></td>
<td><code>dDoS</code>, <code>dDOS</code></td>
</tr>
<tr>
<td>ID</td>
<td>Exported</td>
<td><code>ID</code></td>
<td><code>Id</code></td>
</tr>
<tr>
<td>ID</td>
<td>Unexported</td>
<td><code>id</code></td>
<td><code>iD</code></td>
</tr>
<tr>
<td>DB</td>
<td>Exported</td>
<td><code>DB</code></td>
<td><code>Db</code></td>
</tr>
<tr>
<td>DB</td>
<td>Unexported</td>
<td><code>db</code></td>
<td><code>dB</code></td>
</tr>
<tr>
<td>Txn</td>
<td>Exported</td>
<td><code>Txn</code></td>
<td><code>TXN</code></td>
</tr>
</tbody>
</table>
<h3 id="الدوال-الجالبة-getters">الدوال الجالبة (Getters)</h3>
<p>لا ينبغي أن تستخدم أسماء الدوال والطرق بادئة <code>Get</code> أو <code>get</code>، إلا إذا كان المفهوم الأساسي يستخدم كلمة &quot;get&quot; (مثل طلب HTTP GET). يُفضَّل أن يبدأ الاسم بالاسم مباشرةً، فاستخدم مثلًا <code>Counts</code> بدلًا من <code>GetCounts</code>.</p>
<p>إذا كانت الدالة تتضمّن إجراء عملية حسابية معقّدة أو تنفيذ استدعاء بعيد، فيمكن استخدام كلمة مختلفة مثل <code>Compute</code> أو <code>Fetch</code> بدلًا من <code>Get</code>، ليتّضح للقارئ أن استدعاء الدالة قد يستغرق وقتًا وقد يحجب التنفيذ أو يفشل.</p>
<h3 id="أسماء-المتغيرات-variable-names">أسماء المتغيّرات (Variable names)</h3>
<p>القاعدة العامة هي أن يتناسب طول الاسم طرديًا مع حجم نطاقه وعكسيًا مع عدد مرات استخدامه داخل ذلك النطاق. وقد يحتاج المتغيّر المُعرَّف على مستوى الملف إلى عدة كلمات، بينما قد يكون متغيّر نطاقه كتلة داخلية واحدة كلمةً واحدة أو حتى حرفًا أو حرفين، للحفاظ على وضوح الكود وتجنّب معلومات لا لزوم لها.</p>
<p>وفيما يلي خط أساس تقريبي. هذه الإرشادات العددية ليست قواعد صارمة. طبّق حكمك بناءً على السياق و<a href="/arabic-cs-library/book/go-style/guide/index#clarity">الوضوح</a> و<a href="/arabic-cs-library/book/go-style/guide/index#concision">الإيجاز</a>.</p>
<ul>
<li>النطاق الصغير هو نطاق تُنفَّذ فيه عملية أو عمليتان صغيرتان، من 1 إلى 7 أسطر مثلًا.</li>
<li>النطاق المتوسط هو بضع عمليات صغيرة أو عملية كبيرة واحدة، من 8 إلى 15 سطرًا مثلًا.</li>
<li>النطاق الكبير هو عملية كبيرة واحدة أو بضع عمليات كبيرة، من 15 إلى 25 سطرًا مثلًا.</li>
<li>النطاق الكبير جدًا هو أي شيء يتجاوز صفحة واحدة (أكثر من 25 سطرًا مثلًا).</li>
</ul>
<p>قد يكون الاسم واضحًا تمامًا (مثل <code>c</code> لعدّاد) في نطاق صغير لكنه لا يكفي في نطاق أكبر، وسيحتاج إلى توضيح لتذكير القارئ بغرضه لاحقًا في الكود. وقد يستدعي النطاق الذي توجد فيه متغيّرات كثيرة، أو متغيّرات تمثّل قيمًا أو مفاهيم متشابهة، أسماءً أطول مما يوحي به حجم النطاق.</p>
<p>يمكن أن تساعد خصوصية المفهوم أيضًا في إبقاء اسم المتغيّر موجزًا. فمثلًا، بافتراض وجود قاعدة بيانات واحدة فقط قيد الاستخدام، قد يبقى اسم قصير مثل <code>db</code> — الذي قد يُحجز عادةً للنطاقات الصغيرة جدًا — واضحًا تمامًا حتى لو كان النطاق كبيرًا جدًا. وفي هذه الحالة، يُرجَّح أن تكون الكلمة الواحدة <code>database</code> مقبولة بناءً على حجم النطاق، لكنها ليست مطلوبة لأن <code>db</code> اختصار شائع جدًا للكلمة وله تفسيرات بديلة قليلة.</p>
<p>ينبغي أن يعبّر اسم المتغيّر المحلي عن محتواه وكيفية استخدامه في السياق الحالي، لا عن مصدر القيمة. فمثلًا، غالبًا لا يكون أفضل اسم لمتغيّر محلي مطابقًا لاسم الحقل في بنية أو رسالة protocol buffer.</p>
<p>وبشكل عام:</p>
<ul>
<li>الأسماء المفردة مثل <code>count</code> أو <code>options</code> نقطة بداية جيدة.</li>
<li>يمكن إضافة كلمات لتمييز الأسماء المتشابهة، مثل <code>userCount</code> و<code>projectCount</code>.</li>
<li>لا تحذف الحروف لمجرد توفير الكتابة. فمثلًا <code>Sandbox</code> أفضل من <code>Sbx</code>، خصوصًا للأسماء المصدَّرة.</li>
<li>احذف <a href="#repetitive-with-type">الأنواع والكلمات الشبيهة بالأنواع</a> من معظم أسماء المتغيّرات. فللأعداد، <code>userCount</code> اسم أفضل من <code>numUsers</code> أو <code>usersInt</code>.</li>
<li>للشرائح (slice)، <code>users</code> اسم أفضل من <code>userSlice</code>.</li>
<li>لا بأس في تضمين وصف شبيه بالنوع إذا وُجدت نسختان من قيمة ما في النطاق، فمثلًا قد تخزّن المُدخل في <code>ageString</code> وتستخدم <code>age</code> للقيمة المحلَّلة.</li>
</ul>
<p>احذف الكلمات الواضحة من <a href="#repetitive-in-context">السياق المحيط</a>. فمثلًا، في تنفيذ دالة <code>UserCount</code>، من المرجّح أن يكون متغيّر محلي باسم <code>userCount</code> زائدًا عن الحاجة؛ فـ<code>count</code> أو <code>users</code> أو حتى <code>c</code> بنفس القدر من الوضوح.</p>
<h4>أسماء المتغيّرات المكوّنة من حرف واحد</h4>
<p>قد تكون أسماء المتغيّرات المكوّنة من حرف واحد أداة مفيدة لتقليل <a href="#repetition">التكرار</a>، لكنها قد تجعل الكود غامضًا بلا داعٍ. اقتصر على استخدامها في الحالات التي تكون فيها الكلمة الكاملة واضحة والتي يكون فيها ظهورها مكان المتغيّر المكوّن من حرف واحد متكرّرًا.</p>
<p>وبشكل عام:</p>
<ul>
<li>بالنسبة إلى <a href="#receiver-names">متغيّر مستقبِل الطريقة</a>، يُفضَّل اسم من حرف واحد أو حرفين.</li>
<li>غالبًا ما يكون استخدام أسماء متغيّرات مألوفة للأنواع الشائعة مفيدًا: <code>r</code> لـ<code>io.Reader</code> أو <code>*http.Request</code></li>
<li><code>w</code> لـ<code>io.Writer</code> أو <code>http.ResponseWriter</code></li>
</ul>
<p>تُعدّ المعرّفات المكوّنة من حرف واحد مقبولة كمتغيّرات حلقات صحيحة، خصوصًا للفهارس (مثل <code>i</code>) والإحداثيات (مثل <code>x</code> و<code>y</code>). ويمكن قبول الاختصارات كمعرّفات حلقات عندما يكون النطاق قصيرًا، مثل <code>for _, n := range nodes { ... }</code>.</p>
<h3 id="التكرار-repetition">التكرار (Repetition) <span class="content-anchor" id="repetition"></span></h3>
<p>ينبغي أن يتجنّب الكود المصدري في Go التكرار غير الضروري. ومن المصادر الشائعة لذلك الأسماء المتكرّرة، التي كثيرًا ما تتضمّن كلمات غير ضرورية أو تكرّر سياقها أو نوعها. وقد يكون الكود نفسه متكرّرًا بلا داعٍ إذا ظهر المقطع نفسه أو مقطع مشابه عدة مرات على مقربة من بعضها.</p>
<p>قد تأتي التسمية المتكرّرة في أشكال عديدة، منها:</p>
<h4>اسم الحزمة مقابل اسم الرمز المصدَّر</h4>
<p>عند تسمية الرموز المصدَّرة، يكون اسم الحزمة مرئيًا دائمًا خارج حزمتك، لذا ينبغي تقليل المعلومات المكرّرة بين الاثنين أو إزالتها. وإذا كانت الحزمة تصدّر نوعًا واحدًا فقط وكان اسمه مشتقًّا من اسم الحزمة نفسها، فإن الاسم المتعارف عليه للدالة البانية هو <code>New</code> إذا كانت هناك حاجة إليها.</p>
<blockquote>
<p><strong>أمثلة:</strong> اسم متكرّر -&gt; اسم أفضل</p>
<blockquote>
<p><code>widget.NewWidget</code> -&gt; <code>widget.New</code> <code>widget.NewWidgetWithName</code> -&gt; <code>widget.NewWithName</code> <code>db.LoadFromDatabase</code> -&gt; <code>db.Load</code> <code>goatteleportutil.CountGoatsTeleported</code> -&gt; <code>gtutil.CountGoatsTeleported</code> أو <code>goatteleport.Count</code> <code>myteampb.MyTeamMethodRequest</code> -&gt; <code>mtpb.MyTeamMethodRequest</code> أو <code>myteampb.MethodRequest</code></p>
</blockquote>
</blockquote>
<h4>اسم المتغيّر مقابل النوع <span class="content-anchor" id="repetitive-with-type"></span></h4>
<p>يعرف المترجم دائمًا نوع المتغيّر، وفي معظم الحالات يكون نوع المتغيّر واضحًا أيضًا للقارئ من طريقة استخدامه. ولا يلزم توضيح نوع المتغيّر إلا إذا ظهرت قيمته مرتين في النطاق نفسه.</p>
<table>
<thead>
<tr>
<th>اسم متكرّر</th>
<th>اسم أفضل</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>var numUsers int</code></td>
<td><code>var users int</code></td>
</tr>
<tr>
<td><code>var nameString string</code></td>
<td><code>var name string</code></td>
</tr>
<tr>
<td><code>var primaryProject *Project</code></td>
<td><code>var primary *Project</code></td>
</tr>
</tbody>
</table>
<p>إذا ظهرت القيمة بأشكال متعدّدة، فيمكن توضيح ذلك بكلمة إضافية مثل <code>raw</code> و<code>parsed</code> أو بالتمثيل الأساسي:</p>
<pre><code>// Good:
limitRaw := r.FormValue(&quot;limit&quot;)
limit, err := strconv.Atoi(limitRaw)
</code></pre>
<pre><code>// Good:
limitStr := r.FormValue(&quot;limit&quot;)
limit, err := strconv.Atoi(limitStr)
</code></pre>
<h4>السياق الخارجي مقابل الأسماء المحلية <span class="content-anchor" id="repetitive-in-context"></span></h4>
<p>غالبًا ما تُنشئ الأسماء التي تتضمّن معلومات من سياقها المحيط ضوضاء إضافية بلا فائدة. فاسم الحزمة واسم الطريقة واسم النوع واسم الدالة ومسار الاستيراد وحتى اسم الملف يمكن أن توفّر جميعها سياقًا يؤهّل تلقائيًا كل الأسماء داخلها.</p>
<pre><code>// Bad:
// In package &quot;ads/targeting/revenue/reporting&quot;
type AdsTargetingRevenueReport struct{}
func (p *Project) ProjectName() string
</code></pre>
<pre><code>// Good:
// In package &quot;ads/targeting/revenue/reporting&quot;
type Report struct{}
func (p *Project) Name() string
</code></pre>
<pre><code>// Bad:
// In package &quot;sqldb&quot;
type DBConnection struct{}
</code></pre>
<pre><code>// Good:
// In package &quot;sqldb&quot;
type Connection struct{}
</code></pre>
<pre><code>// Bad:
// In package &quot;ads/targeting&quot;
func Process(in *pb.FooProto) *Report {
    adsTargetingID := in.GetAdsTargetingID()
}
</code></pre>
<pre><code>// Good:
// In package &quot;ads/targeting&quot;
func Process(in *pb.FooProto) *Report {
    id := in.GetAdsTargetingID()
}
</code></pre>
<p>ينبغي عمومًا تقييم التكرار في سياق مستخدم الرمز، لا بمعزل عنه. فمثلًا، يحتوي الكود التالي على أسماء كثيرة قد تكون مقبولة في بعض الظروف، لكنها مكرّرة في السياق:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Bad:</span>
<span class="hljs-title function_">func</span> (db *<span class="hljs-variable constant_">DB</span>) <span class="hljs-title class_">UserCount</span>() (userCount int, err error) {
    <span class="hljs-keyword">var</span> userCountInt64 int64
    <span class="hljs-keyword">if</span> dbLoadError := db.<span class="hljs-title class_">LoadFromDatabase</span>(<span class="hljs-string">&quot;count(distinct users)&quot;</span>, &amp;userCountInt64); dbLoadError != nil {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>, fmt.<span class="hljs-title class_">Errorf</span>(<span class="hljs-string">&quot;failed to load user count: %s&quot;</span>, dbLoadError)
    }
    userCount = <span class="hljs-title function_">int</span>(userCountInt64)
    <span class="hljs-keyword">return</span> userCount, nil
}
</code></pre>
<p>وبدلًا من ذلك، يمكن غالبًا حذف المعلومات المتعلّقة بالأسماء الواضحة من السياق أو الاستخدام:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Good:</span>
<span class="hljs-title function_">func</span> (db *<span class="hljs-variable constant_">DB</span>) <span class="hljs-title class_">UserCount</span>() (int, error) {
    <span class="hljs-keyword">var</span> count int64
    <span class="hljs-keyword">if</span> err := db.<span class="hljs-title class_">Load</span>(<span class="hljs-string">&quot;count(distinct users)&quot;</span>, &amp;count); err != nil {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>, fmt.<span class="hljs-title class_">Errorf</span>(<span class="hljs-string">&quot;failed to load user count: %s&quot;</span>, err)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">int</span>(count), nil
}
</code></pre>
<h2 id="التعليقات-commentary">التعليقات (Commentary)</h2>
<p>تهدف الأعراف المتعلّقة بالتعليقات (التي تشمل ما يجب التعليق عليه، والأسلوب المستخدم، وكيفية تقديم أمثلة قابلة للتشغيل، وما إلى ذلك) إلى دعم تجربة قراءة توثيق واجهة برمجية عامة. راجع <a href="http://golang.org/doc/effective_go.html#commentary">Effective Go</a> لمزيد من المعلومات.</p>
<p>ويناقش قسم <a href="/arabic-cs-library/book/go-style/best-practices-2/index#documentation-conventions">أعراف التوثيق</a> في مستند أفضل الممارسات هذا الأمر بمزيد من التفصيل.</p>
<p><strong>أفضل ممارسة:</strong> استخدم <a href="/arabic-cs-library/book/go-style/best-practices-2/index#documentation-preview">معاينة التوثيق</a> أثناء التطوير ومراجعة الكود للتحقق مما إذا كان التوثيق والأمثلة القابلة للتشغيل مفيدة وتُعرض بالطريقة التي تتوقعها.</p>
<p><strong>نصيحة:</strong> يستخدم Godoc تنسيقًا خاصًا قليلًا جدًا؛ وينبغي عادةً إزاحة القوائم ومقاطع الكود لتجنّب التفاف الأسطر. وبعيدًا عن الإزاحة، ينبغي عمومًا تجنّب الزخرفة.</p>
<h3 id="طول-سطر-التعليق">طول سطر التعليق</h3>
<p>لا يوجد <a href="/arabic-cs-library/book/go-style/guide/index#line-length">طول سطر</a> ثابت للتعليقات في Go.</p>
<p>ينبغي لفّ أسطر التعليقات الطويلة لضمان قابلية قراءة المصدر في الأدوات التي لا تقوم باللفّ التلقائي لأسطر التعليقات. وإذا لم تكن متأكدًا من مكان اللفّ، فمن الخيارات الشائعة 80 أو 100 عمود. ومع ذلك، هذا ليس حدًّا صارمًا؛ فهناك حالات يكون فيها كسر نص حرفي طويل ضارًّا. ولا يوجد اشتراط لعرض عمود معيّن يتم عنده اللفّ. استهدف <a href="/arabic-cs-library/book/go-style/guide/index#consistency">الاتساق</a> داخل الملف.</p>
<p>راجع <a href="https://blog.golang.org/godoc-documenting-go-code">هذه التدوينة من مدونة Go حول التوثيق</a> لمزيد من المعلومات عن التعليقات.</p>
<pre><code># Good:
// This is a comment paragraph.
// The length of individual lines doesn't matter in Godoc;
// but the choice of wrapping makes it easy to read on narrow screens.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
//
// Similarly, if you have other information that is made awkward
// by too many line breaks, use your judgment and include a long line
// if it helps rather than hinders.
</code></pre>
<p>تجنّب التعليقات التي تحشر كميات كبيرة من النص في سطر واحد، فهي تجربة قراءة سيئة.</p>
<pre><code># Bad:
// This is a comment paragraph. While some code editors and viewers will wrap the paragraph for the reader, others will display a very long line that will overflow most windows and require users to scroll horizontally. In addition, even on a screen capable of displaying the entire line, it is easier to read a narrower paragraph than very wide one.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
</code></pre>
<h3 id="التعليقات-التوثيقية-doc-comments">التعليقات التوثيقية (Doc comments) <span class="content-anchor" id="doc-comments"></span></h3>
<p>يجب أن تحتوي جميع الأسماء المصدَّرة على المستوى الأعلى على تعليقات توثيقية، وكذلك إعلانات الأنواع أو الدوال غير المصدَّرة ذات السلوك أو المعنى غير الواضح. وينبغي أن تكون هذه التعليقات <a href="#comment-sentences">جُملًا كاملة</a> تبدأ باسم الكائن الموصوف. ويمكن أن تسبق أداة التعريف (&quot;a&quot; أو &quot;an&quot; أو &quot;the&quot;) الاسم ليُقرأ بشكل أكثر طبيعية.</p>
<pre><code>// Good:
// A Request represents a request to run a command.
type Request struct { ...
// Encode writes the JSON encoding of req to w.
func Encode(w io.Writer, req *Request) { ...
</code></pre>
<p>تظهر التعليقات التوثيقية في <a href="https://pkg.go.dev/">Godoc</a> وتعرضها بيئات التطوير، ولذلك ينبغي كتابتها لأي شخص يستخدم الحزمة.</p>
<p>وينطبق تعليق التوثيق على الرمز التالي، أو على مجموعة الحقول إذا ظهر داخل بنية.</p>
<pre><code>// Good:
// Options configure the group management service.
type Options struct {
    // General setup:
    Name  string
    Group *FooGroup
    // Dependencies:
    DB *sql.DB
    // Customization:
    LargeGroupThreshold int // optional; default: 10
    MinimumMembers      int // optional; default: 2
}
</code></pre>
<p><strong>أفضل ممارسة:</strong> إذا كانت لديك تعليقات توثيقية لكود غير مصدَّر، فاتبع العرف نفسه كما لو كان مصدَّرًا (أي البدء بالتعليق بالاسم غير المصدَّر). وهذا يسهّل تصديره لاحقًا بمجرد استبدال الاسم غير المصدَّر بالاسم المصدَّر الجديد في التعليقات والكود معًا.</p>
<h3 id="جمل-التعليقات">جُمل التعليقات <span class="content-anchor" id="comment-sentences"></span></h3>
<p>التعليقات التي هي جُمل كاملة ينبغي أن تبدأ بحرف كبير وتُضبط بالترقيم مثل جُمل اللغة الإنجليزية القياسية. (وكاستثناء، لا بأس في بدء جملة باسم معرّف يبدأ بحرف صغير إذا كان ذلك واضحًا. ومن الأفضل على الأرجح أن يقتصر ذلك على بداية الفقرة.)</p>
<p>أما التعليقات التي هي أجزاء من جُمل فليس لها متطلبات مماثلة فيما يخص الترقيم أو بدء الحرف الكبير.</p>
<p>ينبغي أن تكون <a href="#doc-comments">تعليقات التوثيق</a> جُملًا كاملة دائمًا، وبالتالي ينبغي دائمًا أن تبدأ بحرف كبير وأن تُضبط بالترقيم. أما التعليقات البسيطة في نهاية السطر (خصوصًا لحقول البنى) فيمكن أن تكون عبارات بسيطة تفترض أن اسم الحقل هو الفاعل.</p>
<pre><code class="language-python">// Good:
// A Server handles serving quotes <span class="hljs-keyword">from</span> the collected works of Shakespeare.
<span class="hljs-built_in">type</span> Server struct {
    // BaseDir points to the base directory under which Shakespeare<span class="hljs-string">&#x27;s works are stored.
    //
    // The directory structure is expected to be the following:
    //   {BaseDir}/manifest.json
    //   {BaseDir}/{name}/{name}-part{number}.txt
    BaseDir string
    WelcomeMessage  string // displayed when user logs in
    ProtocolVersion string // checked against incoming requests
    PageLength      int    // lines per page when printing (optional; default: 20)
}
</span></code></pre>
<h3 id="الأمثلة">الأمثلة <span class="content-anchor" id="examples"></span></h3>
<p>ينبغي أن توثّق الحزم بوضوح الاستخدام المقصود لها. حاول تقديم <a href="http://blog.golang.org/examples">مثال قابل للتشغيل</a>؛ تظهر الأمثلة في Godoc. وتنتمي الأمثلة القابلة للتشغيل إلى ملف الاختبار، لا إلى ملف المصدر الإنتاجي. راجع هذا المثال (<a href="https://pkg.go.dev/time#example-Duration">Godoc</a>، <a href="https://cs.opensource.google/go/go/+/HEAD:src/time/example_test.go">المصدر</a>).</p>
<p>إذا لم يكن تقديم مثال قابل للتشغيل ممكنًا، فيمكن تقديم كود مثال داخل تعليقات الكود. وكما هو الحال مع مقاطع الكود وسطر الأوامر الأخرى في التعليقات، ينبغي أن يتبع أعراف التنسيق القياسية.</p>
<h3 id="وسائط-النتائج-المسماة">وسائط النتائج المسماة</h3>
<p>عند تسمية الوسائط، ضع في اعتبارك كيف تظهر توقيعات الدوال في Godoc. فغالبًا ما يكون اسم الدالة نفسه ونوع وسائط النتيجة واضحين بما يكفي.</p>
<pre><code>// Good:
func (n *Node) Parent1() *Node
func (n *Node) Parent2() (*Node, error)
</code></pre>
<p>إذا أعادت دالة وسيطين أو أكثر من النوع نفسه، فقد يكون إضافة الأسماء مفيدًا.</p>
<pre><code>// Good:
func (n *Node) Children() (left, right *Node, err error)
</code></pre>
<p>إذا كان على المستدعي اتخاذ إجراء بشأن وسائط نتيجة معيّنة، فقد تساعد تسميتها في بيان الإجراء المطلوب:</p>
<pre><code class="language-python">// Good:
// WithTimeout returns a context that will be canceled no later than d duration
// <span class="hljs-keyword">from</span> now.
//
// The caller must arrange <span class="hljs-keyword">for</span> the returned cancel function to be called when
// the context <span class="hljs-keyword">is</span> no longer needed to prevent a resource leak.
func WithTimeout(parent Context, d time.Duration) (ctx Context, cancel func())
</code></pre>
<p>في الكود أعلاه، الإلغاء إجراء محدّد يجب على المستدعي اتخاذه. لكن لو كُتبت وسائط النتيجة بصيغة <code>(Context, func())</code> وحدها، لكان غير واضح المقصود بـ&quot;دالة الإلغاء&quot;.</p>
<p>لا تستخدم وسائط النتائج المسماة عندما تنتج الأسماء <a href="#repetitive-with-type">تكرارًا غير ضروري</a>.</p>
<pre><code>// Bad:
func (n *Node) Parent1() (node *Node)
func (n *Node) Parent2() (node *Node, err error)
</code></pre>
<p>لا تسمِّ وسائط النتائج لتجنّب الإعلان عن متغيّر داخل الدالة. فهذه الممارسة تؤدي إلى إسهاب غير ضروري في الواجهة البرمجية مقابل إيجاز بسيط في التنفيذ.</p>
<p>لا تُقبل <a href="https://tour.golang.org/basics/7">الإرجاعات المجرّدة</a> إلا في دالة صغيرة. وبمجرد أن تصبح الدالة متوسطة الحجم، كن صريحًا في القيم المُعادة. وبالمثل، لا تسمِّ وسائط النتائج لمجرد أن ذلك يمكّنك من استخدام الإرجاعات المجرّدة. فـ<a href="/arabic-cs-library/book/go-style/guide/index#clarity">الوضوح</a> أهم دائمًا من توفير بضعة أسطر في دالتك.</p>
<p>ومن المقبول دائمًا تسمية وسيط نتيجة إذا كان يجب تغيير قيمته في إغلاق مؤجَّل.</p>
<blockquote>
<p><strong>نصيحة:</strong> غالبًا ما تكون الأنواع أوضح من الأسماء في توقيعات الدوال. ويوضّح <a href="https://google.github.io/styleguide/go/index.html#gotip">GoTip #38: Functions as Named Types</a> ذلك.</p>
<blockquote>
<p>في <a href="https://pkg.go.dev/context#WithTimeout"><code>WithTimeout</code></a> أعلاه، يستخدم الكود الحقيقي <a href="https://pkg.go.dev/context#CancelFunc"><code>CancelFunc</code></a> بدلًا من <code>func()</code> خام في قائمة وسائط النتيجة ولا يتطلّب سوى جهد ضئيل للتوثيق.</p>
</blockquote>
</blockquote>
<h3 id="تعليقات-الحزم">تعليقات الحزم</h3>
<p>يجب أن تظهر تعليقات الحزم مباشرة فوق عبارة الحزمة (package clause) دون سطر فارغ بين التعليق واسم الحزمة. مثال:</p>
<pre><code>// Good:
// Package math provides basic constants and mathematical functions.
//
// This package does not guarantee bit-identical results across architectures.
package math
</code></pre>
<p>يجب أن يكون هناك تعليق حزمة واحد لكل حزمة. وإذا تألفت الحزمة من عدة ملفات، فينبغي أن يحتوي أحد الملفات بالضبط على تعليق الحزمة.</p>
<p>وتأخذ التعليقات الخاصة بحزم <code>main</code> شكلًا مختلفًا قليلًا، حيث يحل اسم قاعدة <code>go_binary</code> في ملف BUILD محل اسم الحزمة.</p>
<pre><code class="language-python">// Good:
// The seed_generator command <span class="hljs-keyword">is</span> a utility that generates a Finch seed file
// <span class="hljs-keyword">from</span> a <span class="hljs-built_in">set</span> of JSON study configs.
package main
</code></pre>
<p>الأنماط الأخرى من التعليقات مقبولة ما دام اسم الملف الثنائي مكتوبًا تمامًا كما في ملف BUILD. وعندما يكون اسم الملف الثنائي هو الكلمة الأولى، يجب كتابته بحرف كبير حتى وإن لم يطابق تمامًا كتابة استدعاء سطر الأوامر.</p>
<pre><code>// Good:
// Binary seed_generator ...
// Command seed_generator ...
// Program seed_generator ...
// The seed_generator command ...
// The seed_generator program ...
// Seed_generator ...
</code></pre>
<p>نصائح:</p>
<p>يمكن أن تكون أمثلة استدعاءات سطر الأوامر واستخدام الواجهة البرمجية توثيقًا مفيدًا. وبالنسبة إلى تنسيق Godoc، أزح أسطر التعليق التي تحتوي على كود.</p>
<p>إذا لم يكن هناك ملف رئيسي واضح أو إذا كان تعليق الحزمة طويلًا للغاية، فلا بأس في وضع التعليق التوثيقي في ملف باسم <code>doc.go</code> يحتوي فقط على التعليق وعبارة الحزمة.</p>
<p>يمكن استخدام التعليقات متعدّدة الأسطر بدلًا من عدة تعليقات أحادية السطر. وهذا مفيد أساسًا إذا كان التوثيق يحتوي على أقسام قد يكون من المفيد نسخها ولصقها من الملف المصدري، كما هو الحال مع نماذج أسطر الأوامر (للملفات الثنائية) وأمثلة القوالب.</p>
<pre><code class="language-python">// Good:
/*
The seed_generator command <span class="hljs-keyword">is</span> a utility that generates a Finch seed file
<span class="hljs-keyword">from</span> a <span class="hljs-built_in">set</span> of JSON study configs.

    seed_generator *.json | base64 &gt; finch-seed.base64
*/
package template
</code></pre>
<p>التعليقات الموجّهة إلى المشرفين والتي تنطبق على الملف بأكمله توضع عادةً بعد إعلانات الاستيراد. وهذه لا تظهر في Godoc ولا تخضع للقواعد المذكورة أعلاه بشأن تعليقات الحزم.</p>
<h2 id="الاستيرادات">الاستيرادات</h2>
<h3 id="إعادة-تسمية-الاستيرادات">إعادة تسمية الاستيرادات <span class="content-anchor" id="import-renaming"></span></h3>
<p>لا ينبغي عادةً إعادة تسمية استيرادات الحزم، لكن هناك حالات يجب فيها إعادة تسميتها أو تكون إعادة التسمية فيها تحسينًا للقابلية للقراءة.</p>
<p>يجب أن تتبع الأسماء المحلية للحزم المستوردة <a href="#package-names">الإرشادات المتعلّقة بتسمية الحزم</a>، بما في ذلك حظر استخدام الشرطات السفلية والأحرف الكبيرة. حاول أن تكون <a href="/arabic-cs-library/book/go-style/guide/index#consistency">متسقًا</a> باستخدام الاسم المحلي نفسه دائمًا للحزمة المستوردة نفسها.</p>
<p><em>يجب</em> إعادة تسمية الحزمة المستوردة لتجنّب تعارض الاسم مع استيرادات أخرى. (ومن لوازم ذلك أن <a href="#package-names">أسماء الحزم الجيدة</a> ينبغي ألّا تتطلّب إعادة تسمية.) وفي حال حدوث تعارض بالأسماء، فضّل إعادة تسمية الاستيراد الأكثر محلية أو الأكثر ارتباطًا بالمشروع.</p>
<p><em>يجب</em> إعادة تسمية حزم protocol buffer المولَّدة لإزالة الشرطات السفلية من أسمائها، ويجب أن تكون أسماؤها المحلية منتهية باللاحقة <code>pb</code>. راجع <a href="/arabic-cs-library/book/go-style/best-practices-2/index#import-protos">أفضل ممارسات proto والـ stub</a> لمزيد من المعلومات.</p>
<pre><code class="language-python">// Good:
<span class="hljs-keyword">import</span> (
    foosvcpb <span class="hljs-string">&quot;path/to/package/foo_service_go_proto&quot;</span>
)
</code></pre>
<p>وأخيرًا، <em>يمكن</em> إعادة تسمية حزمة مستوردة غير مولَّدة تلقائيًا إذا كان اسمها غير مفيد (مثل <code>util</code> أو <code>v1</code>). افعل ذلك باعتدال: لا تعد تسمية الحزمة إذا كان الكود المحيط باستخدامها ينقل سياقًا كافيًا. وعند الإمكان، فضّل إعادة هيكلة الحزمة نفسها باسم أكثر ملاءمة.</p>
<pre><code class="language-python">// Good:
<span class="hljs-keyword">import</span> (
    core <span class="hljs-string">&quot;github.com/kubernetes/api/core/v1&quot;</span>
    meta <span class="hljs-string">&quot;github.com/kubernetes/apimachinery/pkg/apis/meta/v1beta1&quot;</span>
)
</code></pre>
<p>إذا احتجت إلى استيراد حزمة يتعارض اسمها مع اسم متغيّر محلي شائع تريد استخدامه (مثل <code>url</code> و<code>ssh</code>) وأردت إعادة تسمية الحزمة، فالطريقة المفضّلة لذلك هي استخدام اللاحقة <code>pkg</code> (مثل <code>urlpkg</code>). لاحظ أنه يمكن حجب حزمة بمتغيّر محلي؛ ولا تكون إعادة التسمية ضرورية إلا إذا كانت الحزمة ما زالت بحاجة إلى الاستخدام عندما يكون هذا المتغيّر في النطاق.</p>
<h3 id="تجميع-الاستيرادات">تجميع الاستيرادات</h3>
<p>ينبغي تنظيم الاستيرادات في المجموعات التالية، بهذا الترتيب:</p>
<ol>
<li>حزم المكتبة القياسية</li>
<li>الحزم الأخرى (الخاصة بالمشروع والمضمّنة)</li>
<li>استيرادات protocol buffer (مثل <code>fpb &quot;path/to/foo_go_proto&quot;</code>)</li>
<li>الاستيراد من أجل <a href="https://go.dev/doc/effective_go#blank_import">الآثار الجانبية</a> (مثل <code>_ &quot;path/to/package&quot;</code>)</li>
</ol>
<pre><code class="language-python">// Good:
package main
<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;hash/adler32&quot;</span>
    <span class="hljs-string">&quot;os&quot;</span>
    <span class="hljs-string">&quot;github.com/dsnet/compress/flate&quot;</span>
    <span class="hljs-string">&quot;golang.org/x/text/encoding&quot;</span>
    <span class="hljs-string">&quot;google.golang.org/protobuf/proto&quot;</span>
    foopb <span class="hljs-string">&quot;myproj/foo/proto/proto&quot;</span>
    _ <span class="hljs-string">&quot;myproj/rpc/protocols/dial&quot;</span>
    _ <span class="hljs-string">&quot;myproj/security/auth/authhooks&quot;</span>
)
</code></pre>
<h3 id="الاستيراد-quotالفارغquot-import">الاستيراد &quot;الفارغ&quot; (<code>import _</code>)</h3>
<p>الحزم التي تُستورد من أجل آثارها الجانبية فقط (باستخدام الصيغة <code>import _ &quot;package&quot;</code>) لا يجوز استيرادها إلا في حزمة main، أو في الاختبارات التي تحتاج إليها.</p>
<p>ومن أمثلة هذه الحزم:</p>
<ul>
<li><a href="https://pkg.go.dev/time/tzdata">time/tzdata</a></li>
<li><a href="https://pkg.go.dev/image/jpeg">image/jpeg</a> في كود معالجة الصور</li>
</ul>
<p>تجنّب الاستيرادات الفارغة في حزم المكتبات، حتى لو كانت المكتبة تعتمد عليها بشكل غير مباشر. فحصر استيرادات الآثار الجانبية في حزمة main يساعد في التحكم بالاعتماديات، ويجعل من الممكن كتابة اختبارات تعتمد على استيراد مختلف دون تعارض أو تكاليف بناء مهدورة.</p>
<p>والاستثناءات الوحيدة التالية هي:</p>
<ul>
<li>يمكنك استخدام استيراد فارغ لتجاوز فحص الاستيرادات غير المسموح بها في <a href="https://github.com/bazelbuild/rules_go/blob/master/go/nogo.rst">فاحص nogo الساكن</a>.</li>
<li>يمكنك استخدام استيراد فارغ لحزمة <a href="https://pkg.go.dev/embed">embed</a> في ملف مصدري يستخدم توجيه المترجم <code>//go:embed</code>.</li>
</ul>
<p><strong>نصيحة:</strong> إذا أنشأت حزمة مكتبة تعتمد بشكل غير مباشر على استيراد ذي أثر جانبي في الإنتاج، فوثّق الاستخدام المقصود.</p>
<h3 id="الاستيراد-quotالنقطيquot-import">الاستيراد &quot;النقطي&quot; (<code>import .</code>)</h3>
<p>صيغة <code>import .</code> ميزة لغوية تتيح جلب المعرّفات المصدَّرة من حزمة أخرى إلى الحزمة الحالية دون تأهيل. راجع <a href="https://go.dev/ref/spec#Import_declarations">مواصفات اللغة</a> لمزيد من المعلومات.</p>
<p>لا تستخدم هذه الميزة في قاعدة كود Google؛ فهي تجعل من الصعب معرفة مصدر الوظائف.</p>
<pre><code class="language-python">// Bad:
package foo_test
<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;bar/testutil&quot;</span> // also imports <span class="hljs-string">&quot;foo&quot;</span>
    . <span class="hljs-string">&quot;foo&quot;</span>
)
var myThing = Bar() // Bar defined <span class="hljs-keyword">in</span> package foo; no qualification needed.
</code></pre>
<pre><code class="language-python">// Good:
package foo_test
<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;bar/testutil&quot;</span> // also imports <span class="hljs-string">&quot;foo&quot;</span>
    <span class="hljs-string">&quot;foo&quot;</span>
)
var myThing = foo.Bar()
</code></pre>
<h2 id="الأخطاء">الأخطاء <span class="content-anchor" id="documentation-conventions-errors"></span></h2>
<h3 id="إرجاع-الأخطاء">إرجاع الأخطاء</h3>
<p>استخدم <code>error</code> للإشارة إلى أن دالة قد تفشل. وبحسب العرف، يكون <code>error</code> آخر وسيط في النتائج.</p>
<pre><code>// Good:
func Good() error { /* ... */ }
</code></pre>
<p>إرجاع قيمة <code>nil</code> من نوع error هو الطريقة المتعارف عليها للإشارة إلى عملية ناجحة كان يمكن أن تفشل. وإذا أعادت دالة خطأً، فيجب على المستدعين التعامل مع جميع قيم الإرجاع غير الخاصة بالخطأ على أنها غير محدّدة ما لم يُوثَّق خلاف ذلك صراحةً. وشائع أن تكون قيم الإرجاع غير الخاصة بالخطأ هي قيمها الصفرية، لكن لا يمكن افتراض ذلك.</p>
<pre><code>// Good:
func GoodLookup() (*Result, error) {
    // ...
    if err != nil {
        return nil, err
    }
    return res, nil
}
</code></pre>
<p>ينبغي أن تُرجع الدوال المصدَّرة التي تُرجع أخطاءً هذه الأخطاء باستخدام نوع <code>error</code>. فالأنواع الملموسة للأخطاء معرّضة لأخطاء دقيقة: إذ يمكن لف مؤشّر <code>nil</code> ملموس داخل واجهة فيصبح قيمة غير nil (راجع <a href="https://golang.org/doc/faq#nil_error">مدخل Go FAQ حول هذا الموضوع</a>).</p>
<pre><code>// Bad:
func Bad() *os.PathError { /*...*/ }
</code></pre>
<p><strong>نصيحة:</strong> الدالة التي تأخذ وسيطًا من نوع <a href="https://pkg.go.dev/context"><code>context.Context</code></a> ينبغي أن تُرجع عادةً <code>error</code> ليتمكّن المستدعي من تحديد ما إذا أُلغي السياق أثناء تشغيل الدالة.</p>
<h3 id="نصوص-الأخطاء">نصوص الأخطاء</h3>
<p>لا ينبغي أن تبدأ نصوص الأخطاء بحرف كبير (إلا إذا بدأت باسم مصدَّر أو اسم علم أو اختصار) ولا أن تنتهي بعلامة ترقيم. وذلك لأن نصوص الأخطاء تظهر عادةً ضمن سياق آخر قبل طبعها للمستخدم.</p>
<pre><code>// Bad:
err := fmt.Errorf(&quot;Something bad happened.&quot;)
</code></pre>
<pre><code>// Good:
err := fmt.Errorf(&quot;something bad happened&quot;)
</code></pre>
<p>ومن ناحية أخرى، يعتمد أسلوب الرسالة الكاملة المعروضة (التسجيل أو فشل الاختبار أو استجابة الواجهة البرمجية أو أي واجهة مستخدم أخرى) على السياق، لكن ينبغي عادةً أن تبدأ بحرف كبير.</p>
<pre><code>// Good:
log.Infof(&quot;Operation aborted: %v&quot;, err)
log.Errorf(&quot;Operation aborted: %v&quot;, err)
t.Errorf(&quot;Op(%q) failed unexpectedly; err=%v&quot;, args, err)
</code></pre>
<h3 id="التعامل-مع-الأخطاء">التعامل مع الأخطاء <span class="content-anchor" id="handle-errors"></span></h3>
<p>ينبغي للكود الذي يواجه خطأً أن يتخذ قرارًا مدروسًا بشأن كيفية التعامل معه. وليس من المناسب عادةً تجاهل الأخطاء باستخدام متغيّرات <code>_</code>. وإذا أعادت دالة خطأً، فافعل أحد الأمور التالية:</p>
<ul>
<li>تعامل مع الخطأ وعالجه فورًا.</li>
<li>أعد الخطأ إلى المستدعي.</li>
<li>في الحالات الاستثنائية، استدعِ <a href="https://pkg.go.dev/github.com/golang/glog#Fatal"><code>log.Fatal</code></a> أو <code>panic</code> (إذا كان ضروريًا للغاية).</li>
</ul>
<p><strong>ملاحظة:</strong> <code>log.Fatalf</code> ليس هو log المكتبة القياسية. راجع [#logging].</p>
<p>في الحالة النادرة التي يكون فيها تجاهل خطأ أو التخلص منه مناسبًا (مثل استدعاء <a href="https://pkg.go.dev/bytes#Buffer.Write"><code>(*bytes.Buffer).Write</code></a> الموثّق بأنه لا يفشل أبدًا)، ينبغي أن يشرح تعليق مصاحب لماذا هذا آمن.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Good:</span>
<span class="hljs-keyword">var</span> b *bytes.<span class="hljs-property">Buffer</span>
n, _ := b.<span class="hljs-title class_">Write</span>(p) <span class="hljs-comment">// never returns a non-nil error</span>
</code></pre>
<p>لمزيد من النقاش والأمثلة حول معالجة الأخطاء، راجع <a href="http://golang.org/doc/effective_go.html#errors">Effective Go</a> و<a href="/arabic-cs-library/book/go-style/best-practices-2/index#error-handling">أفضل الممارسات</a>.</p>
<h3 id="الأخطاء-داخل-النطاق-in-band-errors">الأخطاء داخل النطاق (In-band errors) <span class="content-anchor" id="in-band-errors"></span></h3>
<p>في C واللغات المشابهة، من الشائع أن تُرجع الدوال قيمًا مثل ‎-1 أو null أو السلسلة الفارغة للإشارة إلى أخطاء أو نتائج مفقودة. ويُعرف هذا بمعالجة الأخطاء داخل النطاق (in-band error handling).</p>
<pre><code>// Bad:
// Lookup returns the value for key or -1 if there is no mapping for key.
func Lookup(key string) int
</code></pre>
<p>قد يؤدي عدم التحقق من قيمة خطأ داخل النطاق إلى أخطاء برمجية وقد ينسب الأخطاء إلى الدالة الخطأ.</p>
<pre><code>// Bad:
// The following line returns an error that Parse failed for the input value,
// whereas the failure was that there is no mapping for missingKey.
return Parse(Lookup(missingKey))
</code></pre>
<p>توفّر دعم Go لقيم الإرجاع المتعدّدة حلًّا أفضل (راجع <a href="http://golang.org/doc/effective_go.html#multiple-returns">قسم Effective Go حول الإرجاعات المتعدّدة</a>). وبدلًا من إلزام العملاء بالتحقق من قيمة خطأ داخل النطاق، ينبغي أن تُرجع الدالة قيمة إضافية للإشارة إلى ما إذا كانت قيم الإرجاع الأخرى صالحة. وقد تكون قيمة الإرجاع هذه خطأً أو قيمة منطقية عندما لا تكون هناك حاجة إلى تفسير، وينبغي أن تكون قيمة الإرجاع الأخيرة.</p>
<pre><code>// Good:
// Lookup returns the value for key or ok=false if there is no mapping for key.
func Lookup(key string) (value string, ok bool)
</code></pre>
<p>تمنع هذه الواجهة البرمجية المستدعي من كتابة <code>Parse(Lookup(key))</code> بشكل خاطئ، وهو ما يسبب خطأ وقت الترجمة، لأن <code>Lookup(key)</code> لها مخرجان.</p>
<p>وإرجاع الأخطاء بهذه الطريقة يشجّع على معالجة أخطاء أكثر متانة وصريحة:</p>
<pre><code>// Good:
value, ok := Lookup(key)
if !ok {
    return fmt.Errorf(&quot;no value for %q&quot;, key)
}
return Parse(value)
</code></pre>
<p>بعض دوال المكتبة القياسية، مثل تلك الموجودة في الحزمة <code>strings</code>، تُرجع قيم أخطاء داخل النطاق. وهذا يبسّط كود معالجة السلاسل كثيرًا مقابل طلب مزيد من الحرص من المبرمج. وبشكل عام، ينبغي أن يُرجع كود Go في قاعدة كود Google قيمًا إضافية للأخطاء.</p>
<h3 id="إزاحة-مسار-الأخطاء">إزاحة مسار الأخطاء</h3>
<p>تعامل مع الأخطاء قبل المتابعة إلى بقية الكود. فهذا يحسّن قابلية قراءة الكود بتمكين القارئ من إيجاد المسار الطبيعي بسرعة. وينطبق المنطق نفسه على أي كتلة تختبر شرطًا ثم تنتهي بحالة نهائية (مثل <code>return</code> أو <code>panic</code> أو <code>log.Fatal</code>).</p>
<p>والكود الذي يعمل إذا لم تتحقق الحالة النهائية ينبغي أن يظهر بعد كتلة <code>if</code>، وألّا يكون مُزاحًا داخل جملة <code>else</code>.</p>
<pre><code>// Good:
if err != nil {
    // error handling
    return // or continue, etc.
}
// normal code
</code></pre>
<pre><code>// Bad:
if err != nil {
    // error handling
} else {
    // normal code that looks abnormal due to indentation
}
</code></pre>
<p><strong>نصيحة:</strong> إذا كنت تستخدم متغيّرًا لأكثر من بضعة أسطر من الكود، فعادةً لا يستحق استخدام نمط <code>if</code> مع المعلوم الابتدائي. وفي هذه الحالات، يكون من الأفضل عادةً نقل الإعلان إلى الخارج واستخدام جملة <code>if</code> عادية:</p>
<pre><code>// Good:
x, err := f()
if err != nil {
  // error handling
  return
}
// lots of code that uses x
// across multiple lines
</code></pre>
<pre><code>// Bad:
if x, err := f(); err != nil {
  // error handling
  return
} else {
  // lots of code that uses x
  // across multiple lines
}
</code></pre>
<p>راجع <a href="https://google.github.io/styleguide/go/index.html#gotip">Go Tip #1: Line of Sight</a> و<a href="https://testing.googleblog.com/2017/06/code-health-reduce-nesting-reduce.html">TotT: Reduce Code Complexity by Reducing Nesting</a> لمزيد من التفاصيل.</p>
`,r={book:e,chapter:n,chapterTitle:o,slug:t,title:a,headings:s,html:d};export{e as book,n as chapter,o as chapterTitle,r as default,s as headings,d as html,t as slug,a as title};
