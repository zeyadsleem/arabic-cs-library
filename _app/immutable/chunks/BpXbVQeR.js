const o="kinney",c="visual-studio-code",e="Visual Studio Code",s="vscode-snippets",n="استخدام المقتطفات",d=[{depth:2,id:"بنية-المقتطف",text:"بنية المقتطف"},{depth:2,id:"مثال-حلقة-forof",text:"مثال: حلقة for/of"},{depth:2,id:"صياغة-المقتطف-العناصر-النائبة-والمتغيرات-والخيارات",text:"صياغة المقتطف: العناصر النائبة والمتغيّرات والخيارات"},{depth:3,id:"إضافة-الخيارات",text:"إضافة الخيارات"},{depth:2,id:"نطاق-المقتطف",text:"نطاق المقتطف"}],t=`<p>المقتطفات (snippets) كتل شيفرة مكتوبة مسبقًا يمكنك إدراجها سريعًا في محرّرك بكلمة مفتاحية أو بادئة قصيرة. ولا يظلمها من يصفها بأنها قوالب شيفرة أو اختصارات لبنى الشيفرة كثيرة الاستخدام. وفي Visual Studio Code، المقتطفات أكثر من مجرد نص ثابت، فهي ديناميكية وتفاعلية وتتيح لك تخصيصها وتكييفها مع احتياجاتك المحدّدة.</p>
<p>لا أظنّ أنك تحتاج فعلًا إلى عرض ترويجي عن المقتطفات، لكن هاك واحدًا على أي حال:</p>
<ul>
<li><strong>أتمتة مهام البرمجة المتكرّرة:</strong> تُغني المقتطفات عن كتابة أنماط الشيفرة الشائعة يدويًا مرارًا وتكرارًا. تخيّل كتابة الحلقات أو تعريفات الدوال أو بنى الأصناف من الصفر في كل مرة. والمقتطفات تؤتمت ذلك، فتوفّر عليك وقتًا وجهدًا ثمينين.</li>
<li><strong>رفع سرعة البرمجة:</strong> بإدراج كتل الشيفرة ببضع ضغطات مفاتيح فقط، تسرّع المقتطفات عملية البرمجة سرعة هائلة. فتقضي وقتًا أقل في كتابة الشيفرة الجاهزة المتكرّرة، ووقتًا أكثر في التركيز على المنطق الأساسي لتطبيقك.</li>
<li><strong>تقليل الأخطاء:</strong> البرمجة اليدوية معرّضة للأخطاء، خصوصًا في المهام المتكرّرة. وتوفّر المقتطفات كتل شيفرة مختبَرة مسبقًا وخالية من الأخطاء، ما يقلّل احتمال الأخطاء المطبعية وأخطاء الصياغة والأخطاء المنطقية.</li>
<li><strong>فرض اتساق الشيفرة:</strong> تضمن المقتطفات الاتساق في قاعدتك البرمجية بتوفير بنى شيفرة موحّدة. وهذا مفيد بوجه خاص في مشاريع الفرق حيث يكون الحفاظ على نمط برمجة موحّد أمرًا بالغ الأهمية. ويمكنك إنشاء مقتطفات لمعايير البرمجة الخاصة بشركتك، فتضمن التزام الجميع بالأنماط نفسها.</li>
<li><strong>تعلّم لغات وأطر جديدة:</strong> يمكن أن تكون المقتطفات مراجع وأدوات تعليمية مفيدة للغات أو الأطر الجديدة. فبإنشاء مقتطفات للبنى الشائعة، تتعوّد على الصياغة وأفضل الممارسات.</li>
</ul>
<h2 id="بنية-المقتطف">بنية المقتطف</h2>
<p>يُعرَّف المقتطف في Visual Studio Code ككائن JSON بالحقول الرئيسية التالية:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Snippet Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;trigger&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;// Code line 1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;// Code line 2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;// ...&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Snippet description&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>اسم المقتطف هو مجرد الاسم الذي تعطيه لمقتطفك، ويُستخدم للتنظيم والتعريف داخل ملف تهيئة المقتطفات. فاختر أسماء وصفية تعبّر عن غرض المقتطف.</p>
<p>ولنفصّل كل حقل:</p>
<ul>
<li><strong><code>prefix</code> (String، مطلوب):</strong> هذه الكلمة أو الأحرف المُشغِّلة التي تكتبها في المحرّر لتفعيل اقتراح المقتطف. وعند كتابتك للـ <code>prefix</code>، سيقترح Visual Studio Code مقتطفك في قائمة IntelliSense المنسدلة. فاختر بادئة قصيرة يسهل تذكّرها وفريدة لتفادي التعارض مع الأوامر أو الكلمات المفتاحية الموجودة.</li>
<li><strong><code>body</code> (Array of Strings، مطلوب):</strong> هذا هو جوهر المقتطف، أي كتلة الشيفرة الفعلية التي ستُدرج. وكل عنصر في المصفوفة يمثّل سطرًا من الشيفرة. وسيضم Visual Studio Code هذه النصوص بعضها إلى بعض ويدرجها في المستند مع مراعاة المسافات البادئة وفواصل الأسطر. ويمكنك استخدام عناصر نائبة ومتغيّرات وخيارات داخل <code>body</code> لتجعل مقتطفاتك ديناميكية.</li>
<li><strong><code>description</code> (String، اختياري):</strong> شرح موجز لما يفعله المقتطف. ويُعرض هذا الوصف في قائمة اقتراحات IntelliSense، ما يساعدك على فهم غرض المقتطف عند الاختيار من بين اقتراحات متعددة. وتوفير أوصاف واضحة أمر بالغ الأهمية لإدارة مجموعة كبيرة من المقتطفات.</li>
<li><strong><code>scope</code> (String، اختياري):</strong> يحدّد اللغات أو أنواع الملفات التي ينبغي أن يكون المقتطف متاحًا فيها. وإذا حُذف، يُعدّ المقتطف عامًّا ومتاحًا في كل اللغات. ويمكنك تحديد معرّف لغة واحد (مثل <code>&quot;javascript&quot;</code> و <code>&quot;python&quot;</code>) أو قائمة معرّفات لغات مفصولة بفواصل (مثل <code>&quot;javascript,typescript&quot;</code>). وتجد قائمة بمعرّفات اللغات <a href="https://www.google.com/url?sa=E&amp;source=gmail&amp;q=https://code.visualstudio.com/docs/languages/identifiers&amp;authuser=1">هنا</a>.</li>
</ul>
<h2 id="مثال-حلقة-forof">مثال: حلقة <code>for</code>/<code>of</code></h2>
<p>JSON</p>
<pre><code class="language-typescript"><span class="hljs-string">&quot;for/of Loop&quot;</span>: {
    <span class="hljs-string">&quot;prefix&quot;</span>: <span class="hljs-string">&quot;forloop&quot;</span>,
    <span class="hljs-string">&quot;body&quot;</span>: [
        <span class="hljs-string">&quot;for (let i = 0; i &lt; \${1:array}.length; i++) {&quot;</span>,
        <span class="hljs-string">&quot;\\tconst \${2:element} = \${1:array}[i];&quot;</span>,
        <span class="hljs-string">&quot;\\t\${0:// body}&quot;</span>,
        <span class="hljs-string">&quot;}&quot;</span>
    ],
    <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;Basic for loop in JavaScript&quot;</span>
}
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li><strong>“for/of Loop”</strong> هو اسم المقتطف.</li>
<li><strong><code>forloop</code></strong> هي البادئة. وكتابة <code>forloop</code> في ملف JavaScript تُشغّل هذا المقتطف.</li>
<li>يحتوي <code>body</code> على بنية حلقة <code>for</code> في JavaScript مع عناصر نائبة.</li>
<li><strong>“Basic for loop in JavaScript”</strong> هو الوصف.</li>
</ul>
<h2 id="صياغة-المقتطف-العناصر-النائبة-والمتغيرات-والخيارات">صياغة المقتطف: العناصر النائبة والمتغيّرات والخيارات</h2>
<p>تكون المقتطفات في Visual Studio Code قوية لأنها تدعم محتوى ديناميكيًا عبر العناصر النائبة والمتغيّرات والخيارات.</p>
<ul>
<li><strong>العناصر النائبة (<code>$1</code> و <code>$2</code> و <code>$3</code> و … و <code>$0</code>):</strong> تمثّل العناصر النائبة مواضع المؤشر داخل المقتطف. فعند إدراج مقتطف، ينتقل المؤشر ابتداءً إلى <code>$1</code>. ويؤدي الضغط على <code>Tab</code> إلى نقل المؤشر إلى <code>$2</code> ثم <code>$3</code> وهكذا. و<code>$0</code> هو موضع المؤشر النهائي بعد تنقّلك في كل العناصر النائبة المرقّمة. ويمكنك أيضًا استخدام أسماء للعناصر النائبة مثل <code>\${1:variableName}</code> لتوفير قيمة افتراضية أو تلميح لها. وفي مثال حلقة <code>for</code> أعلاه: <code>\${1:array}</code>: العنصر النائب الأول، ويقترح “array” كقيمة افتراضية. <code>\${2:element}</code>: العنصر النائب الثاني، ويقترح “element” كقيمة افتراضية. <code>\${0:// body}</code>: موضع المؤشر النهائي، موضوعًا داخل جسم الحلقة مع تعليق.
<ul>
<li>في مثال حلقة <code>for</code> أعلاه: <code>\${1:array}</code>: العنصر النائب الأول، ويقترح “array” كقيمة افتراضية. <code>\${2:element}</code>: العنصر النائب الثاني، ويقترح “element” كقيمة افتراضية. <code>\${0:// body}</code>: موضع المؤشر النهائي، موضوعًا داخل جسم الحلقة مع تعليق.
<ul>
<li><code>\${1:array}</code>: العنصر النائب الأول، ويقترح “array” كقيمة افتراضية.</li>
<li><code>\${2:element}</code>: العنصر النائب الثاني، ويقترح “element” كقيمة افتراضية.</li>
<li><code>\${0:// body}</code>: موضع المؤشر النهائي، موضوعًا داخل جسم الحلقة مع تعليق.</li>
</ul>
</li>
</ul>
</li>
<li><strong>المتغيّرات (<code>\${variable_name}</code>):</strong> يوفّر Visual Studio Code مجموعة غنية من المتغيّرات المعرّفة مسبقًا التي يمكنك استخدامها داخل المقتطفات لإدراج معلومات ديناميكية بناءً على السياق. وتُحاط المتغيّرات بـ <code>\${}</code>. ومن المتغيّرات الشائعة الاستخدام: <strong>متغيّرات الملفات والمسارات:</strong> <code>\${TM_FILENAME}</code>: اسم الملف الحالي (مثل <code>my_script.js</code>). <code>\${TM_FILENAME_BASE}</code>: اسم الملف الحالي دون الامتداد (مثل <code>my_script</code>). <code>\${TM_DIRECTORY}</code>: مجلد الملف الحالي. <code>\${TM_FILEPATH}</code>: المسار الكامل للملف الحالي. <code>\${WORKSPACE_NAME}</code>: اسم مساحة العمل أو المجلد المفتوح. <code>\${WORKSPACE_FOLDER}</code>: مسار مساحة العمل أو المجلد المفتوح. <strong>متغيّرات التاريخ والوقت:</strong> <code>\${CURRENT_YEAR}</code>: السنة الحالية (مثل <code>2025</code>). <code>\${CURRENT_YEAR_SHORT}</code>: السنة الحالية برقمين (مثل <code>25</code>). <code>\${CURRENT_MONTH}</code>: الشهر برقمين (مثل <code>03</code>). <code>\${CURRENT_MONTH_NAME}</code>: اسم الشهر الكامل (مثل <code>March</code>). <code>\${CURRENT_MONTH_NAME_SHORT}</code>: الاسم المختصر للشهر (مثل <code>Mar</code>). <code>\${CURRENT_DATE}</code>: يوم الشهر برقمين (مثل <code>07</code>). <code>\${CURRENT_DAY_NAME}</code>: اسم اليوم (مثل <code>Friday</code>). <code>\${CURRENT_DAY_NAME_SHORT}</code>: الاسم المختصر لليوم (مثل <code>Fri</code>). <code>\${CURRENT_HOUR}</code>: الساعة الحالية بنظام 24 ساعة (مثل <code>17</code>). <code>\${CURRENT_MINUTE}</code>: الدقيقة الحالية (مثل <code>08</code>). <code>\${CURRENT_SECOND}</code>: الثانية الحالية (مثل <code>14</code>). <code>\${CURRENT_TIMEZONE_OFFSET}</code>: إزاحة المنطقة الزمنية عن UTC (مثل <code>-0700</code> لـ MST). <code>\${CURRENT_TIMESTAMP}</code>: الطابع الزمني الحالي بنظام Unix. <strong>متغيّرات المستخدم والبيئة:</strong> <code>\${CLIPBOARD}</code>: محتوى الحافظة لديك. <code>\${RANDOM}</code>: ستة أحرف عشوائية بالنظام السداسي عشري. <code>\${RANDOM_HEX}</code>: رقم عشوائي بالنظام السداسي عشري. <code>\${UUID}</code>: معرّف UUID من الإصدار 4. <code>\${USER_NAME}</code>: اسم مستخدم نظام التشغيل لديك. وتجد قائمة شاملة بالمتغيّرات المعرّفة مسبقًا <a href="https://www.google.com/search?q=https://code.visualstudio.com/docs/editor/userdefinedsnippets%23_variables&amp;authuser=1">هنا</a>.
<ul>
<li><strong>متغيّرات الملفات والمسارات:</strong> <code>\${TM_FILENAME}</code>: اسم الملف الحالي (مثل <code>my_script.js</code>). <code>\${TM_FILENAME_BASE}</code>: اسم الملف الحالي دون الامتداد (مثل <code>my_script</code>). <code>\${TM_DIRECTORY}</code>: مجلد الملف الحالي. <code>\${TM_FILEPATH}</code>: المسار الكامل للملف الحالي. <code>\${WORKSPACE_NAME}</code>: اسم مساحة العمل أو المجلد المفتوح. <code>\${WORKSPACE_FOLDER}</code>: مسار مساحة العمل أو المجلد المفتوح.
<ul>
<li><code>\${TM_FILENAME}</code>: اسم الملف الحالي (مثل <code>my_script.js</code>).</li>
<li><code>\${TM_FILENAME_BASE}</code>: اسم الملف الحالي دون الامتداد (مثل <code>my_script</code>).</li>
<li><code>\${TM_DIRECTORY}</code>: مجلد الملف الحالي.</li>
<li><code>\${TM_FILEPATH}</code>: المسار الكامل للملف الحالي.</li>
<li><code>\${WORKSPACE_NAME}</code>: اسم مساحة العمل أو المجلد المفتوح.</li>
<li><code>\${WORKSPACE_FOLDER}</code>: مسار مساحة العمل أو المجلد المفتوح.</li>
</ul>
</li>
<li><strong>متغيّرات التاريخ والوقت:</strong> <code>\${CURRENT_YEAR}</code>: السنة الحالية (مثل <code>2025</code>). <code>\${CURRENT_YEAR_SHORT}</code>: السنة الحالية برقمين (مثل <code>25</code>). <code>\${CURRENT_MONTH}</code>: الشهر برقمين (مثل <code>03</code>). <code>\${CURRENT_MONTH_NAME}</code>: اسم الشهر الكامل (مثل <code>March</code>). <code>\${CURRENT_MONTH_NAME_SHORT}</code>: الاسم المختصر للشهر (مثل <code>Mar</code>). <code>\${CURRENT_DATE}</code>: يوم الشهر برقمين (مثل <code>07</code>). <code>\${CURRENT_DAY_NAME}</code>: اسم اليوم (مثل <code>Friday</code>). <code>\${CURRENT_DAY_NAME_SHORT}</code>: الاسم المختصر لليوم (مثل <code>Fri</code>). <code>\${CURRENT_HOUR}</code>: الساعة الحالية بنظام 24 ساعة (مثل <code>17</code>). <code>\${CURRENT_MINUTE}</code>: الدقيقة الحالية (مثل <code>08</code>). <code>\${CURRENT_SECOND}</code>: الثانية الحالية (مثل <code>14</code>). <code>\${CURRENT_TIMEZONE_OFFSET}</code>: إزاحة المنطقة الزمنية عن UTC (مثل <code>-0700</code> لـ MST). <code>\${CURRENT_TIMESTAMP}</code>: الطابع الزمني الحالي بنظام Unix.
<ul>
<li><code>\${CURRENT_YEAR}</code>: السنة الحالية (مثل <code>2025</code>).</li>
<li><code>\${CURRENT_YEAR_SHORT}</code>: السنة الحالية برقمين (مثل <code>25</code>).</li>
<li><code>\${CURRENT_MONTH}</code>: الشهر برقمين (مثل <code>03</code>).</li>
<li><code>\${CURRENT_MONTH_NAME}</code>: اسم الشهر الكامل (مثل <code>March</code>).</li>
<li><code>\${CURRENT_MONTH_NAME_SHORT}</code>: الاسم المختصر للشهر (مثل <code>Mar</code>).</li>
<li><code>\${CURRENT_DATE}</code>: يوم الشهر برقمين (مثل <code>07</code>).</li>
<li><code>\${CURRENT_DAY_NAME}</code>: اسم اليوم (مثل <code>Friday</code>).</li>
<li><code>\${CURRENT_DAY_NAME_SHORT}</code>: الاسم المختصر لليوم (مثل <code>Fri</code>).</li>
<li><code>\${CURRENT_HOUR}</code>: الساعة الحالية بنظام 24 ساعة (مثل <code>17</code>).</li>
<li><code>\${CURRENT_MINUTE}</code>: الدقيقة الحالية (مثل <code>08</code>).</li>
<li><code>\${CURRENT_SECOND}</code>: الثانية الحالية (مثل <code>14</code>).</li>
<li><code>\${CURRENT_TIMEZONE_OFFSET}</code>: إزاحة المنطقة الزمنية عن UTC (مثل <code>-0700</code> لـ MST).</li>
<li><code>\${CURRENT_TIMESTAMP}</code>: الطابع الزمني الحالي بنظام Unix.</li>
</ul>
</li>
<li><strong>متغيّرات المستخدم والبيئة:</strong> <code>\${CLIPBOARD}</code>: محتوى الحافظة لديك. <code>\${RANDOM}</code>: ستة أحرف عشوائية بالنظام السداسي عشري. <code>\${RANDOM_HEX}</code>: رقم عشوائي بالنظام السداسي عشري. <code>\${UUID}</code>: معرّف UUID من الإصدار 4. <code>\${USER_NAME}</code>: اسم مستخدم نظام التشغيل لديك.
<ul>
<li><code>\${CLIPBOARD}</code>: محتوى الحافظة لديك.</li>
<li><code>\${RANDOM}</code>: ستة أحرف عشوائية بالنظام السداسي عشري.</li>
<li><code>\${RANDOM_HEX}</code>: رقم عشوائي بالنظام السداسي عشري.</li>
<li><code>\${UUID}</code>: معرّف UUID من الإصدار 4.</li>
<li><code>\${USER_NAME}</code>: اسم مستخدم نظام التشغيل لديك.</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="إضافة-الخيارات">إضافة الخيارات</h3>
<p>توفّر الخيارات قائمة منسدلة بالخيارات عند وصولك إلى عنصر نائب. والصياغة هي <code>\${placeholder_number|option1,option2,option3|}</code>. وعند إدراج المقتطف ووصولك إلى هذا العنصر النائب، سيعرض Visual Studio Code قائمة انتقاء سريعة تضم <code>option1</code> و <code>option2</code> و <code>option3</code>. ويمكنك اختيار أحد هذه الخيارات أو كتابة قيمتك الخاصة.</p>
<pre><code class="language-json">  <span class="hljs-attr">&quot;Log Message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;logmsg&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;import logging&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;logging.basicConfig(level=logging.\${1|DEBUG,INFO,WARNING,ERROR,CRITICAL|})&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;logging.\${1|DEBUG,INFO,WARNING,ERROR,CRITICAL|}(\${2:message})&quot;</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Log message with level choice in Python&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وعند استخدام هذا المقتطف، سيعرض العنصر النائب الأول <code>\${1|DEBUG,INFO,WARNING,ERROR,CRITICAL|}</code> قائمة منسدلة بمستويات السجلّ. وسيؤدي اختيار خيار إلى ملء كل من موضعَي <code>\${1|…|}</code> تلقائيًا بالمستوى المختار.</p>
<h2 id="نطاق-المقتطف">نطاق المقتطف</h2>
<p>يحدّد نطاق المقتطف أين تكون مقتطفاتك متاحة داخل Visual Studio Code. ويمكنك تعريف المقتطفات على ثلاثة مستويات:</p>
<ul>
<li><strong>المقتطفات العامة (مقتطفات المستخدم):</strong> تكون هذه المقتطفات متاحة في كل مساحات عمل Visual Studio Code ولكل اللغات (ما لم يُحدَّد <code>scope</code> صراحةً). وهي مثالية لأنماط الشيفرة كثيرة الاستخدام التي لا ترتبط بلغة بعينها أو تنطبق على مشاريع متعددة.</li>
<li><strong>مقتطفات خاصة بلغة:</strong> تكون هذه المقتطفات خاصة بلغة برمجة معيّنة، ولا تكون متاحة إلا عند العمل على ملفات من نوع تلك اللغة (فمثلًا لا تظهر مقتطفات JavaScript إلا في ملفات <code>.js</code>). وهذا مفيد للصياغة والبنى الخاصة بلغة بعينها.</li>
<li><strong>مقتطفات خاصة بمشروع (مقتطفات مساحة العمل):</strong> تكون هذه المقتطفات خاصة بمساحة عمل Visual Studio Code الحالية أو بمجلد المشروع. وتُخزَّن داخل مجلد <code>.vscode</code> في جذر مشروعك. والمقتطفات الخاصة بمشروع مثالية لفرض معايير البرمجة أو لتوفير اختصارات فريدة لمشروع بعينه.</li>
</ul>
<blockquote>
<p><strong>اسم الملف غير مهم.</strong></p>
<p>اسم الملف نفسه ليس حاسمًا لعمل المقتطفات، فVisual Studio Code يهتم فقط ببنية JSON وبمكان وضع الملف (في مجلد المقتطفات المناسب). ومع ذلك، فإن تسمية ملف مقتطفاتك تسمية وصفية (مثل <code>javascript.json</code> أو <code>global-snippets.json</code>) تسهّل عليك تنظيم مقتطفاتك وصيانتها مع الوقت. وإلا فقد ينتهي بك الأمر إلى البحث عن ذلك الملف كما لو كان كنزًا مخفيًا في مجلد إعداداتك!</p>
</blockquote>
`,a={book:o,chapter:c,chapterTitle:e,slug:s,title:n,headings:d,html:t};export{o as book,c as chapter,e as chapterTitle,a as default,d as headings,t as html,s as slug,n as title};
