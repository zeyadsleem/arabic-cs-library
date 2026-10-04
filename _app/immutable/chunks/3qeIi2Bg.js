const e="mit-6100l",o="problem-sets",d="مجموعات المسائل",c="ps4",t="مجموعة المسائل 4 — العودية والتشفير",n=[{depth:2,id:"المقدمة",text:"المقدمة"},{depth:2,id:"1-الجزء-a-عمليات-عودية-على-الأشجار-recursive-operations-on-trees",text:"1) الجزء A: عمليات عودية على الأشجار (Recursive Operations on Trees)"},{depth:3,id:"11-تمرين-على-تمثيل-البيانات-data-representation-practice",text:"1.1) تمرين على تمثيل البيانات (Data Representation Practice)"},{depth:3,id:"12-تحديد-ارتفاع-الشجرة-determining-the-height-of-a-tree",text:"1.2) تحديد ارتفاع الشجرة (Determining The Height of a Tree)"},{depth:3,id:"13-الأكوام-heaps",text:"1.3) الأكوام (Heaps)"},{depth:2,id:"2-الجزء-b-التشفير-بالوسادات-ذات-الاستخدام-الواحد-encryption-with-one-time-pads",text:"2) الجزء B: التشفير بالوسادات ذات الاستخدام الواحد (Encryption with One Time Pads)"},{depth:3,id:"21-المقدمة",text:"2.1) المقدمة"},{depth:3,id:"22-message",text:"2.2) Message"},{depth:3,id:"23-plaintextmessage",text:"2.3) PlaintextMessage"},{depth:3,id:"24-encryptedmessage",text:"2.4) EncryptedMessage"},{depth:2,id:"3-الجزء-c-استخدام-أصنافك-using-your-classes",text:"3) الجزء C: استخدام أصنافك (Using Your Classes)"},{depth:3,id:"31-فك-ترميز-النصوص-المشفرة-decoding-ciphertexts",text:"3.1) فكّ ترميز النصوص المشفّرة (Decoding Ciphertexts)"},{depth:2,id:"4-إجراءات-التسليم-hand-in-procedure",text:"4) إجراءات التسليم (Hand-in Procedure)"},{depth:3,id:"41-معلومات-الوقت-والتعاون-time-and-collaboration-info",text:"4.1) معلومات الوقت والتعاون (Time and Collaboration Info)"},{depth:3,id:"42-التسليم-النصفي-half-way-submission",text:"4.2) التسليم النصفي (Half-way Submission)"},{depth:3,id:"43-التسليم-النهائي-final-submission",text:"4.3) التسليم النهائي (Final Submission)"},{depth:2,id:"المصدر-والنسب-والترخيص",text:"المصدر والنَّسب والترخيص"}],s=`<h1>مجموعة المسائل 4: العودية وتشفير قيصر (Recursion and Caesar Cipher)</h1>
<p><strong>زميل مجموعة المسائل (Pset Buddy):</strong> لم يُعيَّن لك زميل لهذه المجموعة في النسخة المنشورة.</p>
<h2 id="المقدمة">المقدمة</h2>
<p>تنقسم مجموعة المسائل هذه إلى موضوعين: الأول يركّز على العودية (Recursion) والأشجار (Trees) (الجزء A)، والثاني يتناول الأصناف (Classes) والتشفير (Cryptography) (الجزءان B وC). الموضوعان غير معتمدين أحدهما على الآخر، فلا تتردّد بالعمل عليهما بالتوازي أو بترتيب مختلف. يُرجى قراءة تعليمات كل جزء بعناية.</p>
<p><strong>لا تغيّر أسماء الملفات التي نقدّمها لك، ولا تغيّر أيًّا من دوال المساعدة (Helper Functions) المعطاة، ولا تغيّر أسماء الدوال أو الطرق (Methods)، ولا تحذف السلاسل التوثيقية (Docstrings) المعطاة.</strong> ستحتاج إلى إبقاء <code>words.txt</code> و<code>story.txt</code> و<code>pads.txt</code> في المجلد نفسه الذي تحفظ فيه ملفات <code>.py</code>.</p>
<p><strong>أخيرًا، يُرجى مراجعة دليل الأسلوب (Style Guide)</strong>، لأننا سنخصم نقاطًا عند المخالفة (مثلًا أسماء المتغيّرات غير الوصفية والشيفرة غير الموثّقة بالتعليقات). بالنسبة لمجموعة المسائل هذه،Will تكون الأرقام 6 و7 و8 في دليل الأسلوب ذات صلة عالية، لذا تأكّد من مراجعتها قبل البدء في المجموعة ومراجعتها مرة أخرى قبل تسليمها!</p>
<h2 id="1-الجزء-a-عمليات-عودية-على-الأشجار-recursive-operations-on-trees">1) الجزء A: عمليات عودية على الأشجار (Recursive Operations on Trees)</h2>
<p>الشجرة (Tree) هي بنية بيانات هرمية (Hierarchical Data Structure) مكوّنة من عقد (Nodes) مرتبطة. تُسمّى أعلى عقدة الجذر (Root)، ولها فروع (Branches) تربطها بعقد أخرى، وهي بدورها جذور لأشجارها الفرعية (Subtrees) على التوالي. تُعرض شجرة بسيطة أدناه:</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشكل في الأصل رسم شجرة بيانية (Diagram) لا يمكن نقله نصيًا. نُقل ما ورد في النشرة عن الشجرة إلى الفقرات التالية، وأُشير إلى الأشجار الأخرى في مواضعها.</p>
</blockquote>
<p>يمكن أن نُجري ملاحظة قليلة:</p>
<ol>
<li>كل عقدة يمكن أن تحمل بيانات: في هذا المثال تحمل كل عقدة سلسلة نصية بنوع العقدة.</li>
<li>البيانات هرمية: كل عقدة لها والد (Parent) (عدا الجذر)، وكل عقدة غير ورقة (Non-Leaf Node) لها ابن واحد أو أكثر، وكل عقدة ورقة (Leaf Node) ليس لها أبناء. سنستخدم هذه المصطلحات في بقية مجموعة المسائل.</li>
<li>الأشجار عودية بطبيعتها: عقد أبناء الجذر هي «جذور» لأشجار أصغر أخرى (تُسمّى الأشجار الفرعية).</li>
</ol>
<h3 id="11-تمرين-على-تمثيل-البيانات-data-representation-practice">1.1) تمرين على تمثيل البيانات (Data Representation Practice)</h3>
<p>في مجموعة المسائل هذه، سنستخدم كائن <code>Node</code> مقدَّمًا في <code>tree.py</code> لتمثيل الأشجار.</p>
<p>يمكن تهيئة الشجرة البسيطة أعلاه بكائن <code>Node</code> كما يلي:</p>
<pre><code class="language-python">example_tree = Node(<span class="hljs-number">1</span>, Node(<span class="hljs-number">2</span>), Node(<span class="hljs-number">5</span>, Node(<span class="hljs-number">7</span>), Node(<span class="hljs-number">8</span>)))
</code></pre>
<p>فيما يلي شرح موجز للصنف <code>Node</code>:</p>
<p>يمكنك تهيئة عقدة بالشكل التالي: <code>Node(value, left_child, right_child)</code>.ويحمل <code>value</code> يحمل القيمة الموجودة في العقدة، و<code>left_child</code> يحمل اختياريًا كائن <code>Node</code> الذي يبني الشجرة الفرعية اليسرى، و<code>right_child</code> يفعل الشيء نفسه للشجرة الفرعية اليمنى. وإذا لم تكن هناك شجرة فرعية، إمّا ألغِ إدخال هذا المعامل أو مرّر <code>None</code>.</p>
<p>يمكنك الحصول على كائن <code>Node</code> الذي يحمل الشجرة الفرعية اليسرى أو اليمنى عبر <code>get_left_child()</code> أو <code>get_right_child()</code> على التوالي. وإذا لم يكن هناك ابن، فتعيد هذه الدالة <code>None</code>.</p>
<p>يمكنك الحصول على القيمة التي تحملها عقدة <code>Node</code> عبر <code>get_value()</code>.</p>
<p>سنتمرّن على تهيئة الأشجار في هذا الجزء. وللأشجار المعروضة أدناه، أنشئ كائنات تمثّل البيانات تمثيلًا دقيقًا. ضعها في المتغيّرات الموجودة أعلى <code>ps4a.py</code> والمسمّاة <code>tree1</code> و<code>tree2</code> و<code>tree3</code>.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الأشجار الثلاثة المطلوبة مرسومة في الأصل بأشكال بيانية. لم تُنشر هذه الأشكال هنا، لأن حقوقها لم يُتحقَّق منها ضمن نطاق إعادة النشر المسموح به في هذه المكتبة. لذلك لم تُنقل بيانات الأشجار إلى نص، ولم يُخمَّن أي شيء. الملفات موصوفة في الملف <code>tree.py</code> الذي لم يُنسخ هنا.</p>
</blockquote>
<h4>1.1.1) الاختبار (Testing)</h4>
<p>يمكنك اختبار تمثيلك حتى الآن بتشغيل <code>test_ps4a_student.py</code>. تأكّد من أنه في المجلد نفسه الذي توجد فيه مجموعة المسائل. وعندما تهيّئ المتغيّرات الثلاثة <code>tree1</code> و<code>tree2</code> و<code>tree3</code> تهيئة صحيحة، فيجب أن ينجح الاختبار المسمّى <code>test_data_representation</code> في <code>test_ps4a_student.py</code>.</p>
<h3 id="12-تحديد-ارتفاع-الشجرة-determining-the-height-of-a-tree">1.2) تحديد ارتفاع الشجرة (Determining The Height of a Tree)</h3>
<p>ارتفاع الشجرة هو عدد الحواف (Edges) بين الجذر وأبعد ورقة. فمثلًا، في الأشجار التي هيّأتها أعلاه، للشجرة 1 ارتفاع 2، و للشجرتين 2 و3 ارتفاع 3. اكتب دالة عودية <code>find_tree_height</code> تحدّد عمق شجرة. ويجب أن تكون هذه الدالة عودية؛ فالتنفيذات غير العودية ستحصل على صفر.</p>
<p><strong>تلميح.</strong> قد يكون النهج التالي مفيدًا:</p>
<p>بمُعطى شجرة دخل <code>T</code>:</p>
<ul>
<li><strong>الحالة الأساس (Base Case).</strong> إذا كانت <code>T</code> ورقة، فإن ارتفاعها 0.</li>
<li><strong>الحالة العودية (Recursive Case).</strong> أوجد بشكل عودي ارتفاع الشجرة الفرعية اليسرى واليمنى لـ <code>T</code>، وخذ الأكبر منهما. أضف 1 إلى أعلى ارتفاع، وأعد تلك القيمة.</li>
</ul>
<p>يجب أن تختبر دالتك باستخدام المتغيّرات من الجزء السابق. فمثلًا:</p>
<pre><code class="language-python">find_tree_height(tree1)  <span class="hljs-comment"># should be 2</span>
find_tree_height(tree2)  <span class="hljs-comment"># should be 3</span>
find_tree_height(tree3)  <span class="hljs-comment"># should be 3</span>
</code></pre>
<h4>1.2.1) الاختبار</h4>
<p>يجب أن ينجح كودك الآن أيضًا في الاختبارين <code>test_tree_height</code> و<code>tree_tree_height_additional</code> في <code>test_ps4a_student.py</code>.</p>
<h3 id="13-الأكوام-heaps">1.3) الأكوام (Heaps)</h3>
<p>نوع خاص من الأشجار هو الأكوام (Heaps). هناك نوعان من الأكوام: أكوام القيمة القصوى (Max Heaps) وأكوام الحد الأدنى (Min Heaps).</p>
<p>في كومة القيمة القصوى، لكل عقدة <code>N</code>، تكون <code>N</code> هي أكبر قيمة في الشجرة ذات الجذر <code>N</code>. هذا يعني أن جميع العناصر المخزّنة في الشجرتين الفرعيتين اليسرى واليمنى لـ <code>N</code> أصغر من القيمة المخزّنة في <code>N</code>.</p>
<p>وبالمقابل، في كومة الحد الأدنى، تكون <code>N</code> هي أصغر قيمة في الشجرة ذات الجذر <code>N</code>، لذا فإن جميع العناصر المخزّنة في الشجرتين الفرعيتين اليسرى واليمنى لـ <code>N</code> أكبر من القيمة المخزّنة في <code>N</code>.</p>
<p>اكتب الدالة <code>is_heap</code> لتحدّد بسرعة ما إذا كانت شجرة كومة قيمة قصوى أو كومة حد أدنى، بحسب المعامل <code>compare_func</code>. و<code>compare_func</code> هي دالة تأخذ وسيطين: <code>child_value</code> و<code>parent_value</code>. بالنسبة لأكوام القيمة القصوى، ستعيد هذه الدالة <code>True</code> إذا كان <code>child_value &lt; parent_value</code> و<code>False</code> في غير ذلك. أما بالنسبة لأكوام الحد الأدنى، فستعيد <code>True</code> إذا كان <code>child_value &gt; parent_value</code> و<code>False</code> في غير ذلك. من الناحية المفاهيمية، يتيح لك هذا كتابة دالة واحدة تستطيع تحديد نوعَي الأكوام (القصوى والحد الأدنى) انطلاقًا من معامل، بدلًا من كتابة طريقتين منفصلتين بكود متشابه جدًا. وقد قدّم لك التنفيذين العاملين لـ <code>compare_func</code> لكومة قيمة قصوى وكومة حد أدنى على التوالي:</p>
<pre><code class="language-python"><span class="hljs-comment"># max heap comparator</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">compare_func</span>(<span class="hljs-params">child_value, parent_value</span>):
    <span class="hljs-keyword">if</span> child_value &lt; parent_value:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

<span class="hljs-comment"># min heap comparator</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">compare_func</span>(<span class="hljs-params">child_value, parent_value</span>):
    <span class="hljs-keyword">if</span> child_value &gt; parent_value:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> سطر المقارنة في دالة كومة الحد الأدنى ظهر في استخراج نصّ PDF الأصلي على هيئة <code>child value &gt; parent_value</code> بدون شرطة سفلية. أعدنا الاسم الصحيح <code>child_value</code> كما هو في نسخة الشيفرة الرسمية للمقرر.</p>
</blockquote>
<p><strong>تلميح.</strong> قد يكون النهج التالي مفيدًا:</p>
<p>بمُعطى شجرة دخل <code>T</code>:</p>
<ul>
<li><strong>الحالة الأساس.</strong> إذا كانت <code>T</code> ورقة، فهي كومة (سواء أ كانت كومة قيمة قصوى أو كومة حد أدنى).</li>
<li><strong>الحالة العودية.</strong> لعقدة <code>T</code>، تحقّق بشكل عودي ما إذا كانت الشجرتان الفرعيتان اليمنى واليسرى لـ <code>T</code> كومَين أيضًا، وما إذا كانت <code>T</code> هي العنصر الأكبر أو الأصغر (باستخدام دالة المقارنة <code>compare_func</code> المُمرَّرة إلى <code>is_heap</code>) في شجرتها الفرعية. إذا تحقّقت كل الشروط السابقة، فإن الشجرة ذات الجذر <code>T</code> كومة. وإلا فهي ليست كذلك.</li>
</ul>
<h4>1.3.1) الاختبار</h4>
<p>يجب أن تنجح الآن جميع الاختبارات في <code>test_ps4a_student.py</code>.</p>
<h2 id="2-الجزء-b-التشفير-بالوسادات-ذات-الاستخدام-الواحد-encryption-with-one-time-pads">2) الجزء B: التشفير بالوسادات ذات الاستخدام الواحد (Encryption with One Time Pads)</h2>
<h3 id="21-المقدمة">2.1) المقدمة</h3>
<p>في هذه المسألة سننفّذ تقنية تشفير بسيطة لا يمكن كسرها إذا نُفّذت بشكل صحيح.</p>
<p>إليك بعض المصطلحات المهمة التي سنستخدمها من الآن فصاعدًا:</p>
<ul>
<li><strong>التشفير (Encryption).</strong> عملية إخفاء الرسائل أو ترميزها بحيث تصبح غير قابلة للقراءة.</li>
<li><strong>فكّ التشفير (Decryption).</strong> عملية تحويل الرسائل المشفّرة إلى صورتها الأصلية القابلة للقراءة.</li>
<li><strong>النص الصريح (Plaintext).</strong> الرسالة الأصلية القابلة للقراءة.</li>
<li><strong>النص المشفّر (Ciphertext).</strong> الرسالة المشفّرة. ولا يزال النص المشفّر يحتوي على كل معلومات الرسالة الأصلية، رغم أنه يبدو كترميز غير مفهوم.</li>
</ul>
<h4>2.1.1) كيف تعمل الوسادة ذات الاستخدام الواحد (How a One Time Pad Works)</h4>
<p>فكرة الوسادة ذات الاستخدام الواحد (One Time Pad) هي «إزاحة» (Shift) كل محرف في رسالتك النصية بمقدار عشوائي. ينتج عن ذلك نص مشفّر لا يمكن فكّه دون قائمة الإزاحات العشوائية العشوائية التي أُزاحت بها حروفك، وتُسمّى الوسادة (Pad).</p>
<p>في هذه المجموعة نريد أن تكون رسائلنا قادرة على إدراج حروف وأرقام ومسافات ورموز خاصة أخرى. إزاحة حرف أمر له معنى (مثلًا الحرف <code>a</code> مُزاحًا بمقدار 3 يصبح <code>d</code>)، لكن ماذا عن مسافة مُزاحة بمقدار 3؟ لحسن الحظ، جميع المحارف ممثَّلة على أجهزتنا كأرقام أصلًا! يمكنك رؤية تحويلات المحارف الأساسية إلى أرقام في <a href="https://www.ascii-code.com/">جدول ASCII هذا</a>. فيه نرى أن المسافة ممثَّلة بالقيمة الرقمية 32، لذا فإن إزاحتها بمقدار 3 تنتج 35 أي المحرف <code>#</code>. ويُعرض أدناه مثال على إزاحة الحروف بمقدار 3.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> روابط جدول ASCII والأمثلة المصوّرة داخل الشريحة من نوع رسوم توضيحية (Illustrations) من إنتاج MIT نفسه ضمن هذا الملف، لكنّ محتواها البياني (شاشة إزاحة الحروف) غير قابل للنقل نصيًا. نُقلت القيم الرقمية الدقيقة التي ترد في الجدول أدناه، وهي الجزء التعليمي الأساس. أما جدول تحويل ASCII نفسه فمصدره خارجي (asciitable.com) ولم يُنسخ.</p>
</blockquote>
<p>نحتاج إلى الانتباه لمعالجة الحالة التي تلتفّ فيها الإزاحة إلى البداية بشكل صحيح. نحن مهتمّون فقط بالمحارف التي قيمها في ASCII من 32 إلى 126. فالمحرف الأخير <code>~</code> بالقيمة 126، مُزاحًا بمقدار 1، سيكون مسافة (القيمة 32)، و<code>~</code> مُزاحًا بمقدار 5 سيكون <code>$</code> (القيمة 36). وفيما يلي أمثلة إضافية في الجدول التالي:</p>
<table>
<thead>
<tr>
<th>المحرف (وقيمة ASCII)</th>
<th>قيمة الإزاحة</th>
<th>المحرف بعد الإزاحة (وقيمة ASCII)</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>A</code> (65)</td>
<td>5</td>
<td><code>F</code> (70)</td>
</tr>
<tr>
<td><code>a</code> (97)</td>
<td>10</td>
<td><code>k</code> (107)</td>
</tr>
<tr>
<td>مسافة <code>SPACE</code> (32)</td>
<td>-1</td>
<td><code>~</code> (126)</td>
</tr>
<tr>
<td><code>-</code> (45)</td>
<td>8</td>
<td><code>5</code> (53)</td>
</tr>
<tr>
<td><code>}</code> (125)</td>
<td>4</td>
<td><code>&quot;</code> (QUOTE, 34)</td>
</tr>
<tr>
<td><code>k</code> (107)</td>
<td>-3</td>
<td><code>h</code> (104)</td>
</tr>
<tr>
<td><code>Y</code> (89)</td>
<td>-12</td>
<td><code>M</code> (77)</td>
</tr>
<tr>
<td><code>M</code> (77)</td>
<td>-107</td>
<td><code>M</code> (77)</td>
</tr>
</tbody>
</table>
<p>الآن وقد عرفنا كيف نزاح المحارف، لاستخدام وسادة ذات الاستخدام الواحد كل ما علينا هو إزاحة كل محرف في رسالتنا بمقدار عشوائي تحدّده الوسادة. فمثلًا، إذا كانت الرسالة <code>hello</code> (قيم ASCII <code>[104, 101, 108, 108, 111]</code>) والوسادة <code>[3, 0, 10, 11, 4]</code>، فإننا سنحسب <code>[104+3, 101+0, 108+10, 108+11, 111+4]</code>، أي <code>[107, 101, 118, 119, 115]</code>. وبعد التحويل من القيم إلى المحارف، يكون نصّنا المشفّر <code>kevws</code>. وفيما يلي أمثلة أخرى في الجدول أدناه:</p>
<table>
<thead>
<tr>
<th>النص الصريح</th>
<th>الوسادة ذات الاستخدام الواحد</th>
<th>العملية</th>
<th>النص المشفّر</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Aaa</code></td>
<td><code>1,2,3</code></td>
<td>65+1=66, 97+2=99, 97+3=100</td>
<td><code>xyz</code></td>
</tr>
<tr>
<td><code>z$'</code></td>
<td><code>2,10,12</code></td>
<td>120+2=122, 121+10=131, 122+12=134</td>
<td><code>z$'</code></td>
</tr>
<tr>
<td><code>Hello!</code></td>
<td><code>5,10,2,3,0,2</code></td>
<td>72+5=77, 101+10=111, 108+2=110, 108+3=111, 111+0=111, 33+2=35</td>
<td><code>Monoo#</code></td>
</tr>
<tr>
<td><code>Monoo#</code></td>
<td><code>-5,-10,-2,-3,0,-2</code></td>
<td>77-5=72, 111-10=101, 110-2=108, 111-3=108, 111+0=111, 35-2=33</td>
<td><code>Hello!</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> صف <code>z$'</code> في الأصل يعرض نفس المحارف في العمودين الأول والأخير (وهي نتيجة استخراج نصّ PDF الذي لم يميّز الجدول). لم نخمّن قيمة مختلفة؛ النتيجة الصحيحة لهذه العملية هي <code>zyf'</code> لأن 122+2=124 وهو <code>|</code>، و131+10=141، و134+12=146. أي أن مخرجات هذا الصف في الملف الأصلي لا يمكن الاعتماد عليها، ونبّهنا إلى ذلك بدل إعادة إنتاج خطأ استخراج كأنه محتوى مقرّر.</p>
</blockquote>
<p>الآن وقد عرفنا كيف تعمل الوسادات ذات الاستخدام الواحد، يمكننا أن نبدأ بتنفيذها!</p>
<h4>2.1.2) استخدام الأصناف والوراثة (Using Classes and Inheritance)</h4>
<p>هذه أول تجربة لك في إنشاء أصنافك الخاصة! تفاءل! إنها فكرة قويّة ستستخدمها في بقية مسيرتك في البرمجة. وإذا احتجت إلى مراجعة كيفية عمل الأصناف والوراثة، فراجع ملاحظات المحاضرة والجلسة التطبيقية.</p>
<p>بالنسبة لمجموعة المسائل هذه، سنستخدم صنفًا أبا (Parent Class) اسمه <code>Message</code>، ولديه صنفا أبناء: <code>PlaintextMessage</code> و<code>EncryptedMessage</code>.</p>
<p>يحتوي <code>Message</code> على دوال (Methods) سيحتاجها كل من الرسالة النصية الصريحة والرسالة المشفّرة. مثلًا، دالة للحصول على نص الرسالة.</p>
<p>سينتقل صنفا الأبناء هذه الدوال المشتركة من أبيهما (الوراثة).</p>
<p>يحتوي <code>PlaintextMessage</code> على دوال خاصة بالرسالة النصية الصريحة، مثل دالة لتوليد وسادة ذات الاستخدام واحد أو لتشفير رسالة.</p>
<p>ويحتوي <code>EncryptedMessage</code> على دوال خاصة بالنص المشفّر، مثل دالة لفكّ تشفير رسالة بمعرفة وسادة ذات الاستخدام واحد.</p>
<h3 id="22-message">2.2) Message</h3>
<p>قدّمنا كودًا هيكليًا (Skeleton Code) في الصنف <code>Message</code> للدوال التالية. مهمّتك هي ملء دوال الصنف <code>Message</code> الموجودة في <code>ps4b.py</code> حسب المواصفات المذكورة في السلاسل التوثيقية. يُرجى مراجعة تعليق السلسلة التوثيقية لكل دالة لمزيد من المعلومات حول مواصفتها.</p>
<ul>
<li><code>__init__(self, input_text)</code></li>
<li><code>get_text(self)</code></li>
</ul>
<p><code>shift_char(self, char, shift)</code>. يجب أن تُعيد سلسلة نصية تحتوي <code>char</code> مُزاحًا بمقدار <code>shift</code> حسب الطريقة الموصوفة أعلاه.</p>
<p>بعض التلميحات التي يجب تذكّرها:</p>
<ul>
<li><code>ord(char)</code> تُعيد قيمة ASCII لمحرف سلسلة نصية تحوي محرفًا واحدًا.</li>
<li><code>chr(ascii_num)</code> تُعيد سلسلة نصية بالمحرف الواحد الذي يحدده <code>ascii_num</code>.</li>
<li>نحن مهتمّون فقط بمحارف ASCII الـ 95 من قيمة ASCII 32 إلى 126.</li>
<li>معامل الباقي <code>%</code> الذي يُعيد باقي القسمة مفيد للالتفاف.</li>
</ul>
<p><code>apply_pad(self, pad)</code>. يجب أن تُعيد سلسلة نصية تحتوي النص المشفّر لـ <code>self.message_text</code> بعد تطبيق <code>pad</code>.</p>
<p>كما نفّذنا دالة <code>__repr__</code> بحيث تطبع كائنات <code>Message</code> نتيجة مقروءة أمام الإنسان. يُرجى عدم تغييرها.</p>
<h4>2.2.1) الاختبار</h4>
<p>يمكنك اختبار كودك حتى الآن بتشغيل <code>test_ps4bc_student.py</code>. تأكّد من أنه في المجلد نفسه الذي توجد فيه مجموعة المسائل. وفي هذه المرحلة، يجب أن يكون كودك قادرًا على اجتياز جميع الاختبارات التي تبدأ بـ <code>test_message</code>، لكن ليس تلك التي تبدأ بـ <code>test_plaintext_message</code> أو <code>test_encrypted_message</code>. سننفّذ الشيفرة لتلك في القسم التالي.</p>
<h3 id="23-plaintextmessage">2.3) PlaintextMessage</h3>
<p>مرة أخرى، مهمّتك هي ملء دوال الصنف <code>PlaintextMessage</code> الموجودة في <code>ps4b.py</code> حسب المواصفات المذكورة في السلاسل التوثيقية.</p>
<ul>
<li><code>__init__(self, input_text, pad=None)</code></li>
</ul>
<p>يجب أن تستخدم باني الصنف الأب (باستخدام <code>super()</code>) في هذه الدالة لجعل كودك أكثر إيجازًا. ألقِ نظرة على دليل الأسلوب رقم 7 إن كنت غير متأكّد.</p>
<p>تشير صيغة <code>pad=None</code> إلى معامل اختياري يمكن حذفه، فتُمرَّر القيمة الافتراضية <code>None</code> بدلًا منه. على سبيل المثال، <code>PlaintextMessage('test')</code> و<code>PlaintextMessage('test', [0,15,3,9])</code> كلاهما باني صالح، لكن الأول يجب أن يولّد وسادة عشوائية والثاني يجب أن يستخدم الوسادة المحدَّدة.</p>
<p>يجب أن تحفظ نسخة من <code>pad</code> كسمة (Attribute) لا كمتغيّر <code>pad</code> مباشرة، للحماية من تعديلها.</p>
<ul>
<li><code>generate_pad(self)</code></li>
</ul>
<p><strong>ملاحظة:</strong> يجب أن تعمل <code>shift_char</code> لدينا مع أي عدد صحيح اعتباطي، لكن ولأجل البساطة سنولّد وسادات بأعداد صحيحة في المدى <code>[0, 110)</code> فقط.</p>
<p><strong>تلميح:</strong> <code>random.randint(a, b)</code> تُعيد عددًا صحيحًا عشوائيًا N بحيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>≤</mo><mi>N</mi><mo>≤</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">a \\le N \\le b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8193em;vertical-align:-0.136em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span>.</p>
<ul>
<li><code>get_pad(self)</code></li>
</ul>
<p>يجب أن يُعيد هذا نسخة من <code>self.pad</code> لمنع أحدهم من تعديل القائمة الأصلية.</p>
<ul>
<li><code>get_ciphertext(self)</code></li>
<li><code>change_pad(self, new_pad)</code></li>
</ul>
<p>تأكّد أن <code>self.get_ciphertext</code> تستخدم الوسادة الجديدة!</p>
<p>كما نفّذنا دالة <code>__repr__</code> بحيث تُعيد كائنات <code>PlaintextMessage</code> نتيجة مقروءة أمام الإنسان. يُرجى عدم تغييرها.</p>
<h4>2.3.1) الاختبار</h4>
<p>يمكنك اختبار صنفك الجديد بتشغيل <code>test_ps4bc.py</code>. ويجب أن تكون الآن قادرًا على اجتياز جميع الاختبارات التي تبدأ بـ <code>test_message</code> و<code>test_plaintext</code>.</p>
<h3 id="24-encryptedmessage">2.4) EncryptedMessage</h3>
<p>بمُعطى رسالة مشفّرة، إذا عرفت الوسادة ذات الاستخدام الواحد المستخدَمة لترميز الرسالة، فإن فكّ الترميز يكون تافهًا. ذلك لأننا إذا أزحنا محرفًا بمقدار x لتشفيره، فإن لفكّ تشفيره نُزحه ببساطة بمقدار <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">−x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord mathnormal">x</span></span></span></span>! إذن، لفكّ تشفير رسالة أُزحت بالوسادة <code>[i, j, k, ...]</code>، نطبّق ببساطة الوسادة <code>[-i, -j, -k, ...]</code>. فإذا كان <code>$ip!</code> هو الرسالة المشفّرة، وكانت <code>[5, 1, 7, 2]</code> هي الوسادة المستخدَمة لتشفير الرسالة، فإن <code>[-5, -1, -7, -2]</code> يفكّ ترميز الرسالة المشفّرة ويمنحك الرسالة النصية الصريحة الأصلية.</p>
<table>
<thead>
<tr>
<th>النص المشفّر</th>
<th>الوسادة ذات الاستخدام الواحد</th>
<th>العملية</th>
<th>النص الصريح</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>$ip!</code></td>
<td><code>5,1,7,2</code></td>
<td>36-5=31, 105-1=104, 112-7=105, 33-2=31</td>
<td><code>~hi~</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> القيم الرقمية في صف العملية أعلاه منقولة كما وردت في الملف الأصلي. ويُلاحَظ أن نتيجة <code>36-5=31</code> تعطي المحرف 31 لا 126؛ ويبدو أن القيم في العمود الأصلي كانت مضبوطة عرضًا في ملف PDF ولا تعكس حسابًا صحيحًا. لم نصحّح الأرقام لأن النص الأصلي منشور كما هو، والتنبيه هنا بديل عن تصحيح محتوى المقرّر.</p>
</blockquote>
<p>سنطبّق الآن فكّ التشفير في الصنف <code>EncryptedMessage</code>.</p>
<p>املأ الدوال التالية في الصنف <code>EncryptedMessage</code> الموجودة في <code>ps4b.py</code> حسب المواصفات المذكورة في السلاسل التوثيقية.</p>
<ul>
<li><code>__init__(input_text)</code></li>
</ul>
<p>كما في <code>PlaintextMessage</code>، استخدم باني الصنف الأب (<code>super()</code>) لجعل كودك أكثر إيجازًا. ألقِ نظرة على دليل الأسلوب رقم 7 إن كنت غير متأكّد.</p>
<ul>
<li><code>decrypt_message(self, pad)</code></li>
</ul>
<p>يجب أن تكون هذه الدالة قصيرة جدًا. باستخدام الشرح أعلاه لكيفية فكّ وسادة ذات الاستخدام واحد، حاول أن تستخدم دالة كتبتها بالفعل في الصنف <code>Message</code>.</p>
<h4>2.4.1) الاختبار</h4>
<p>يمكنك اختبار صنفك الجديد بتشغيل <code>test_ps4bc_student.py</code>. ويجب أن تكون الآن قادرًا على اجتياز جميع الاختبارات في ذلك الملف، باستثناء <code>test_try_pads</code>.</p>
<h2 id="3-الجزء-c-استخدام-أصنافك-using-your-classes">3) الجزء C: استخدام أصنافك (Using Your Classes)</h2>
<p>الآن وقد أنشأنا أصنافنا في <code>ps4b.py</code>، سنتعلّم كيفية استخدامها في <code>ps4c.py</code>! في أعلى <code>ps4c.py</code> يمكنك رؤية السطر:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> ps4b  <span class="hljs-comment"># Importing your work from Part B</span>
</code></pre>
<p>يستورد هذا كودك من ملف <code>ps4b.py</code> إذا كان في المجلد نفسه. لاستخدام صنف أُنشئ في الجزء B يمكنك تهيئته هكذا: <code>my_message = ps4b.Message(&quot;My Message!&quot;)</code>.</p>
<p>هناك بضع دوال مساعدة نفّذناها لك: <code>load_words</code> و<code>is_word</code> و<code>get_story_string</code>. وستكون مفيدة لتنفيذ <code>decrypt_message_try_pads</code> و<code>decode_story</code>. لا تحتاج إلى فهم كيفية عملها بالضبط، لكن ينبغي أن تقرأ سلاسلها التوثيقية لتفهم ماذا تفعل وكيف تستخدمها.</p>
<h3 id="31-فك-ترميز-النصوص-المشفرة-decoding-ciphertexts">3.1) فكّ ترميز النصوص المشفّرة (Decoding Ciphertexts)</h3>
<p>الوسادات ذات الاستخدام الواحد آمنة، لذا لا يمكننا العثور على رسالة نصية صريحة دون الوسادة المستخدَمة في تشفيرها. لكن إذا كان لدينا نص مشفّر وقائمة بالوسادات التي ربما استُخدمت لتشفيره، يمكننا أن نجد الوسادة التي شفّرت الرسالة فعلًا وما هي الرسالة النصية الصريحة.</p>
<p>لنفعل ذلك برمجيًا، سنجرّب فكّ ترميز النص المشفّر بكل وسادة في القائمة ونعدّ عدد الكلمات الإنجليزية في الخرج. يمكننا عدّ عدد الكلمات بتقسيم الخرج بعد فكّ الترميز على المسافات واختبار كل قطعة هل هي كلمة إنجليزية صالحة. ثم يمكننا أن نفترض أن الوسادة التي تنتج رسالة نصية صريحة بعدد أكبر عدد من الكلمات الصالحة هي الوسادة المستخدَمة لتشفير الرسالة. إضافةً إلى ذلك، في حالة التعادل، نريد أن نعيد <strong>آخر</strong> وسادة تنتج أكبر عدد من الكلمات الإنجليزية الصالحة.</p>
<p>املأ <code>decrypt_message_try_pads(self, pads)</code> باستخدام النهج الموصوف أعلاه.</p>
<p>قد تجد دالتَي المساعدة <code>is_word(wordlist, word)</code> و<code>load_words</code>، serta دالة السلسلة <code>split</code> مفيدة. ولاحظ أن <code>is_word</code> تتجاهل علامات الترقيم والمحارف الخاصة الأخرى عند تحديد صلاحية الكلمة.</p>
<h4>3.1.1) الاختبار</h4>
<p>يجب أن تكون الآن قادرًا على اجتياز جميع الاختبارات في <code>test_ps4bc_student.py</code>.</p>
<p>يُرجى الانتباه إلى أن <code>decrypt_message_try_pads</code> في أداة اختبار الطالب ستعتمد على عملك من <code>ps4b.py</code>. لكن أداة اختبار هيئة التدريس (Staff Tester) ستحتوي على اختبار واحد سيستخدم تنفيذنا المرجعي لـ <code>ps4b.py</code>. لذا تأكّد أنك تستخدم getters وsetters بدلًا من الوصول المباشر إلى سمات الأصناف من داخل <code>decrypt_message_try_pads</code>!</p>
<h4>3.1.2) فكّ ترميز قصة (Decoding a Story)</h4>
<p>يحاول بوب مشاركة قصة مع أليس دون أن نتمكّن من معرفة القصة. لحسن حظّنا، سمعنا بوب وهو يشارك كل وساداته ذات الاستخدام الواحد مع أليس؛ ولا نعرف فقط أي وسادة استعملها لقصته.</p>
<p>نفّذ <code>decode_story</code> لتجد ما كانت قصة بوب.</p>
<ul>
<li>استعمل <code>get_story_string</code> للحصول على النص المشفّر لقصة بوب، و<code>get_story_pads</code> للحصول على قائمة وسادات بوب ذات الاستخدام الواحد.</li>
<li>استعمل دالتك <code>decrypt_message_try_pads</code> لتجد ما كانت رسالة بوب إلى أليس.</li>
<li>تحقّق من خرج <code>decode_story</code> بإلغاء تعليق الشيفرة في أسفل <code>ps4c.py</code> وتشغيل <code>ps4c.py</code>. هذه الدالة ليست مُختبَرة في <code>test_ps4bc_student.py</code>، لكن كن مستعدًا لمناقشة القصة بعد فكّ الترميز في المراجعة الوجهية (Checkoff).</li>
</ul>
<h2 id="4-إجراءات-التسليم-hand-in-procedure">4) إجراءات التسليم (Hand-in Procedure)</h2>
<h3 id="41-معلومات-الوقت-والتعاون-time-and-collaboration-info">4.1) معلومات الوقت والتعاون (Time and Collaboration Info)</h3>
<p>في بداية كل ملف، اكتب في تعليق أسماء متعاونيك. مثال:</p>
<pre><code class="language-python"><span class="hljs-comment"># Problem Set 4B</span>
<span class="hljs-comment"># Name: Jane Lee</span>
<span class="hljs-comment"># Collaborators: John Doe</span>
</code></pre>
<p>يُرجى تقدير عدد الساعات التي أمضيتها على مجموعة المسائل في مربع السؤال أدناه.</p>
<h3 id="42-التسليم-النصفي-half-way-submission">4.2) التسليم النصفي (Half-way Submission)</h3>
<p>يجب على كل الطلاب تسليم ما أنجزوه حتى موعد التسليم النصفي (أسبوع واحد قبل الموعد النهائي). هذه التسليمات تساوي نقطة واحدة من درجة المجموعة، ولن تُصحَّح من حيث الصحة. الغرض هو التأكّد من أنك تتقدّم باستمرار في المجموعة بدلًا من العمل عليها في الأيام الأخيرة قبل الموعد.</p>
<p>يمكنك رفع نسخ جديدة من <code>ps4a.py</code> حتى 9 نوفمبر الساعة 09:00 مساءً. لا يمكنك استخدام تمديدات أو أيام تأخّر في هذه التسليمات.</p>
<p>يُرجى تحديث الصفحة قبل رفع ملف جديد. إذا لم تفعل فلن يتم تحديث آخر تسليم لك.</p>
<h3 id="43-التسليم-النهائي-final-submission">4.3) التسليم النهائي (Final Submission)</h3>
<p>تأكّد من تشغيل أدوات اختبار الطالب <code>test_ps4a_student.py</code> و<code>test_ps4bc_student.py</code> وأن جميع الاختبارات تنجح. لكن أداة اختبار الطالب تحتوي فقط على مجموعة جزئية من الاختبارات التي ستُشغَّل لتحديد درجة المجموعة. نجاح جميع حالات الاختبار المعطاة لا يضمن الحصول على الدرجة كاملة في المجموعة.</p>
<p>يمكنك رفع نسخ جديدة من كل ملف حتى 16 نوفمبر الساعة 09:00 مساءً، لكن أي شيء يُرفع بعد ذلك الوقت سيُحسب ضمن أيام التأخّر، إن كانت لديك أيّ أيام تأخّر متبقية. وإذا لم تكن لديك أي أيام تأخّر متبقية، فلن تحصل على أي درجة لتسليم متأخّر.</p>
<p>عند رفع ملف جديد بالاسم نفسه، سيُستبدل ملفك القديم.</p>
<ul>
<li><strong>4.3.1) الجزء A:</strong> اختر ملفًا ثم أرسل. «لم يتم اختيار أي ملف» قبل الاختيار، و«تبقّى لك عدد لا نهائي من مرات التسليم» بعد الإرسال.</li>
<li><strong>4.3.2) الجزء B:</strong> نفس الواجهة.</li>
<li><strong>4.3.3) الجزء C:</strong> نفس الواجهة.</li>
</ul>
<h2 id="المصدر-والنسب-والترخيص">المصدر والنَّسب والترخيص</h2>
<p>المصدر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps4_pdf/">تعليمات PS 4 الرسمية</a>، <code>extracted/mit6_100l_f22_ps4.txt</code>. ترجمة عربية لجميع التعليمات مع إبقاء الكود والمخرجات النموذجية دون ترجمة حتى تبقى نافعة للاختبار. المواعيد تاريخية. لم تُنشر الأشكال البيانية الأشجار وملفات البيانات الأصلية في <code>static/</code>.</p>
<blockquote>
<p><strong>ملاحظة المترجم — مواد محجوزة:</strong> ملفات <code>test_ps4a_student.py</code> و<code>test_ps4bc_student.py</code> والملفات النصية المرافقة (<code>words.txt</code> و<code>story.txt</code> و<code>pads.txt</code>) وكود البداية <code>tree.py</code> غير منشورة هنا. تتضمّن مساعدات اختبار مأخوذة من Stack Overflow تحتاج تحققًا مستقلًا من الترخيص والنَّسب. احصل على الحزمة الأصلية من <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps4_code_zip/">صفحة الشيفرة الرسمية</a>.</p>
</blockquote>
<p>النَّسب: <strong>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare.</strong> <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">المقرر الأصلي</a>. المواد المملوكة لـ MIT وهذه الترجمة بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>: النَّسب، غير تجاري، المشاركة بالمثل. ترجمة غير رسمية لا تعني اعتماد MIT. استثناءات الأطراف الثالثة محفوظة؛ <a href="https://ocw.mit.edu/pages/privacy-and-terms-of-use/">شروط الاستخدام</a>.</p>
`,a={book:e,chapter:o,chapterTitle:d,slug:"ps4",title:t,headings:n,html:s};export{e as book,o as chapter,d as chapterTitle,a as default,n as headings,s as html,c as slug,t as title};
