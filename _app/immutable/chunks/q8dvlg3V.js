const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="placeholders-and-variables-in-vscode-snippets",p="العناصر النائبة والمتغيّرات",o=[{depth:2,id:"التنقل-في-العناصر-النائبة",text:"التنقّل في العناصر النائبة"},{depth:2,id:"تحويل-المتغيرات",text:"تحويل المتغيّرات"},{depth:3,id:"تحويل-اسم-الملف-إلى-أحرف-كبيرة",text:"تحويل اسم الملف إلى أحرف كبيرة"},{depth:3,id:"استخراج-السنة-من-التاريخ-الكامل",text:"استخراج السنة من التاريخ الكامل"},{depth:2,id:"خيارات-العناصر-النائبة",text:"خيارات العناصر النائبة"},{depth:2,id:"تغليف-النص-بـ-tmselectedtext",text:"تغليف النص بـ TM_SELECTED_TEXT"},{depth:2,id:"استخدام-tmselectedtext-المتقدم-مع-التحويلات",text:"استخدام TM_SELECTED_TEXT المتقدّم مع التحويلات"},{depth:3,id:"تحويلات-حالة-الأحرف",text:"تحويلات حالة الأحرف"},{depth:3,id:"لف-النص-المحدد-بوسوم-html-وخصائصها",text:"لفّ النص المحدّد بوسوم HTML وخصائصها"},{depth:3,id:"توليد-شيفرة-من-اسم-صنف-محدد",text:"توليد شيفرة من اسم صنف محدّد"},{depth:3,id:"مولد-مسارات-من-نقطة-نهاية-محددة",text:"مولّد مسارات من نقطة نهاية محدّدة"},{depth:2,id:"استخدام-المتغير-clipboard",text:"استخدام المتغيّر CLIPBOARD"},{depth:2,id:"موضع-المؤشر-النهائي",text:"موضع المؤشر النهائي"},{depth:2,id:"تشغيل-المقتطفات-المتداخلة",text:"تشغيل المقتطفات المتداخلة"}],l=`<h2 id="التنقل-في-العناصر-النائبة">التنقّل في العناصر النائبة</h2>
<p>بعد إدراج مقتطف فيه عناصر نائبة، يسهّل Visual Studio Code التنقّل بين قيم العناصر النائبة وملأها:</p>
<ul>
<li><strong>مفتاح Tab (<code>Tab</code>):</strong> بعد إدراج المقتطف، ينتقل المؤشر تلقائيًا إلى العنصر النائب الأول (<code>$1</code>). ويؤدي الضغط على مفتاح <code>Tab</code> إلى انتقال المؤشر إلى العنصر النائب التالي (<code>$2</code>) ثم <code>$3</code> وهكذا، بالترتيب الرقمي.</li>
<li><strong>مفتاحا Shift+Tab (<code>Shift+Tab</code>):</strong> للتنقّل في العناصر النائبة إلى الخلف، اضغط <code>Shift+Tab</code>. وسينقل ذلك المؤشر إلى العنصر النائب السابق بالترتيب الرقمي العكسي.</li>
<li><strong>التحرير المتزامن للعناصر النائبة المتطابقة:</strong> إذا استخدمت رقم العنصر النائب نفسه أكثر من مرة في جسم مقتطفك (مثل <code>\${1:variableName}</code> المستخدم مرتين)، فسيؤدي تحرير قيمة إحدى الحالات إلى تحديث كل الحالات الأخرى للرقم نفسه <em>داخل إدراج المقتطف الحالي</em> تلقائيًا. وهذا مفيد جدًا لإعادة تسمية المتغيّرات أو المعاملات باتساق في كتلة شيفرة كاملة.</li>
</ul>
<h2 id="تحويل-المتغيرات">تحويل المتغيّرات</h2>
<p>تصبح متغيّرات المقتطف أقوى بإدماجها مع التحويلات (transformations). وتتيح لك التحويلات تعديل قيمة متغيّر قبل إدراجه في المقتطف. وصياغة التحويلات هي:</p>
<pre><code class="language-typescript">\${variable_name/regular_expression/format_string/options}
</code></pre>
<p>ولنفصّل صياغة التحويل:</p>
<ul>
<li><strong><code>variable_name</code>:</strong> اسم المتغيّر الذي تريد تحويله (مثل <code>TM_FILENAME_BASE</code> و <code>CURRENT_YEAR</code>).</li>
<li><strong><code>/regular_expression/</code>:</strong> تعبير نمطي للمطابقة مع قيمة المتغيّر.</li>
<li><strong><code>format_string</code>:</strong> النص الذي سيحلّ محلّ النص المطابق. ويمكنك استخدام تسلسلات إفلات خاصة داخل <code>format_string</code>: <code>$0</code>: يُدرج النص المطابق كاملًا. <code>$1</code> و <code>$2</code> و … <code>$9</code>: يُدرج النص الذي التقطته مجموعة الالتقاط المقابلة في التعبير النمطي.
<ul>
<li><code>$0</code>: يُدرج النص المطابق كاملًا.</li>
<li><code>$1</code> و <code>$2</code> و … <code>$9</code>: يُدرج النص الذي التقطته مجموعة الالتقاط المقابلة في التعبير النمطي.</li>
</ul>
</li>
<li><strong><code>options</code> (اختياري):</strong> أعلام لتعديل سلوك مطابقة التعبير النمطي: <code>i</code>: مطابقة غير حساسة لحالة الأحرف. <code>g</code>: مطابقة شاملة (استبدال كل الحالات). <code>m</code>: وضع الأسطر المتعددة.
<ul>
<li><code>i</code>: مطابقة غير حساسة لحالة الأحرف.</li>
<li><code>g</code>: مطابقة شاملة (استبدال كل الحالات).</li>
<li><code>m</code>: وضع الأسطر المتعددة.</li>
</ul>
</li>
</ul>
<h3 id="تحويل-اسم-الملف-إلى-أحرف-كبيرة">تحويل اسم الملف إلى أحرف كبيرة</h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;Uppercase Filename&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;upperfile&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;// File: \${TM_FILENAME_BASE/^(.*)$/\${1:/upcase}/}.js&quot;</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Insert filename in uppercase&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><code>TM_FILENAME_BASE</code>: يجلب اسم الملف دون الامتداد.</li>
<li><code>/^(.*)$/</code>: يطابق اسم الملف كاملًا (ملتقطًا في المجموعة 1).</li>
<li><code>/\${1:/upcase}/</code>: يستبدل النص المطابق بالنسخة المكتوبة بأحرف كبيرة من مجموعة الالتقاط 1 (<code>$1</code>).</li>
<li><code>/upcase</code>: دالة تحويل معرّفة مسبقًا للتحويل إلى أحرف كبيرة. ومن الدوال الأخرى المعرّفة مسبقًا <code>/downcase</code> و <code>/capitalize</code>.</li>
</ul>
<h3 id="استخراج-السنة-من-التاريخ-الكامل">استخراج السنة من التاريخ الكامل</h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;Year from Date&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;yearfromdate&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
	  <span class="hljs-string">&quot;// Year: \${CURRENT_DATE/^(\\\\d{4})-(\\\\d{2})-(\\\\d{2})$/$1/}&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Extract year from current date&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><code>CURRENT_DATE</code>: يجلب التاريخ الحالي (مثل <code>2025-03-07</code>).</li>
<li><code>/^(\\\\d{4})-(\\\\d{2})-(\\\\d{2})$/</code>: تعبير نمطي لمطابقة الصيغة YYYY-MM-DD، ويلتقط السنة والشهر واليوم في المجموعات 1 و 2 و 3 على الترتيب.</li>
<li><code>/$1/</code>: يستبدل النص المطابق بمجموعة الالتقاط 1 وحدها (السنة).</li>
</ul>
<p>وتحويلات المتغيّرات قوية للغاية في تكييف المقتطفات ديناميكيًا مع سياقات مختلفة واحتياجات تنسيق مختلفة. واستكشف <a href="https://www.google.com/search?q=https://code.visualstudio.com/docs/editor/userdefinedsnippets%23_snippet-syntax&amp;authuser=1">توثيق Visual Studio Code لصياغة المقتطفات</a> لمزيد من أمثلة التحويل وخياراته المتقدّمة.</p>
<h2 id="خيارات-العناصر-النائبة">خيارات العناصر النائبة</h2>
<p>يمكن تخصيص العناصر النائبة أكثر باستخدام خيارات للتحكّم في سلوكها:</p>
<ul>
<li><strong>القيم الافتراضية:</strong> كما رأيت في <code>\${1:array}</code>، يمكنك توفير قيمة افتراضية تُدرج ابتداءً. وإن لم ترغب في تغيير القيمة الافتراضية، فاضغط ببساطة <code>Tab</code> للانتقال إلى العنصر النائب التالي.</li>
<li><strong>الخيارات (قوائم الانتقاء السريع):</strong> تنشئ <code>\${1|option1,option2,option3|}</code> قائمة منسدلة بالخيارات، كما نوقش سابقًا.</li>
<li><strong>تحويلات العناصر النائبة (داخل العناصر النائبة):</strong> يمكنك حتى تطبيق التحويلات <em>داخل</em> العناصر النائبة. فمثلًا، يمكنك دمج متغيّر وتحويل داخل عنصر نائب: <code>\${1:\${TM_FILENAME_BASE/^(.*)$/\${1:/capitalize}/}}</code>. وسيحوّل ذلك اسم الملف الأساسي إلى أحرف كبيرة في بداية الكلمات ويستخدمه قيمة افتراضية للعنصر النائب الأول.</li>
<li><strong>العنصر النائب كمُشغّل لمقتطف:</strong> يمكنك تداخل المقتطفات واستخدام عنصر نائب كمُشغّل لمقتطف آخر. فعند وصولك إلى عنصر نائب، قد تؤدي كتابة بادئة مقتطف داخله إلى تشغيل إدراج مقتطف آخر داخل ذلك العنصر النائب. وهذا مفهوم أساسي في إنشاء المقتطفات المتداخلة (وسيُناقش في القسم التالي).</li>
</ul>
<h2 id="تغليف-النص-بـ-tmselectedtext">تغليف النص بـ <code>TM_SELECTED_TEXT</code></h2>
<p>تخيّل أن لديك شيفرة React وتريد لفّ JSX المحدّد سريعًا بمكوّن مخصّص. وإليك مقتطفًا مفيدًا لذلك:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Wrap with MyComponent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;wrapMyComp&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;&lt;MyComponent&gt;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  \${TM_SELECTED_TEXT}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&lt;/MyComponent&gt;&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Wrap selected JSX with MyComponent&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إذا حدّدت شيفرة وشغّلت هذا المقتطف (<code>wrapMyComp</code>)، صار النص المحدّد متداخلًا داخل <code>&lt;MyComponent&gt;</code> على الفور. سهل، أليس كذلك؟</p>
<blockquote>
<p><strong>لكي يعمل هذا المقتطف، تأكّد من تحديد نص قبل تنشيط المقتطف. وإلا بقي المتغيّر فارغًا.</strong></p>
</blockquote>
<p>ومثال سريع آخر، وهو تغليف تحديد باستدعاء دالة في TypeScript:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Log selected expression&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;logsel&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;console.log(&#x27;\${TM_SELECTED_TEXT}&#x27;, \${TM_SELECTED_TEXT});&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Logs selected expression to console&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يكرّر هذا المقتطف النص المحدّد مرتين: مرة كنص (لتعرف ما سيُسجَّل)، ومرة كقيمة فعلية.</p>
<h2 id="استخدام-tmselectedtext-المتقدم-مع-التحويلات">استخدام <code>TM_SELECTED_TEXT</code> المتقدّم مع التحويلات</h2>
<p>تظهر القوة الحقيقية لـ <code>TM_SELECTED_TEXT</code> عند دمجه مع دوال التحويل في Visual Studio Code. فهي تتيح لك تعديل النص المحدّد بطرق متنوّعة، وتفتح أمامك عالمًا من الاحتمالات.</p>
<h3 id="تحويلات-حالة-الأحرف">تحويلات حالة الأحرف</h3>
<p>يمكنك تغيير حالة أحرف النص فورًا بتحويلات مدمجة:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Transform Selected Text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;transform&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;Original: \${TM_SELECTED_TEXT}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;Uppercase: \${TM_SELECTED_TEXT/(.*)/\${1:/upcase}/}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;Lowercase: \${TM_SELECTED_TEXT/(.*)/\${1:/downcase}/}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;Title Case: \${TM_SELECTED_TEXT/(.*)/\${1:/pascalcase}/}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;Camel Case: \${TM_SELECTED_TEXT/(.*)/\${1:/camelcase}/}&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Demonstrates various text transformations&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حدّد أي نص، وشغّل المقتطف، وسترى كل التحويلات دفعة واحدة.</p>
<h3 id="لف-النص-المحدد-بوسوم-html-وخصائصها">لفّ النص المحدّد بوسوم HTML وخصائصها</h3>
<p>يلفّ هذا المقتطف النص المحدّد بوسوم HTML قابلة للتخصيص:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Wrap with HTML Element&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;wraphtml&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;&lt;\${1:div} class=\\&quot;\${2:container}\\&quot; id=\\&quot;\${3:unique-id}\\&quot;&gt;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  \${TM_SELECTED_TEXT}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&lt;/\${1:div}&gt;&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Wraps selected text with HTML element and attributes&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وتكمن القوة هنا في دمج النص المحدّد مع مواضع التوقّف للتخصيص. فحدّد نصًا، وشغّل المقتطف، ثم خصّص نوع العنصر وخصائصه.</p>
<h3 id="توليد-شيفرة-من-اسم-صنف-محدد">توليد شيفرة من اسم صنف محدّد</h3>
<p>يأخذ هذا المقتطف اسم صنف محدّدًا ويولّد مكوّن React كاملًا بحالة أحرف مناسبة:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;React Component from Selection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rcs&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;import React from &#x27;react&#x27;;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;interface \${TM_SELECTED_TEXT/(.*)/\${1:/pascalcase}/}Props {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  \${1}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;export const \${TM_SELECTED_TEXT/(.*)/\${1:/pascalcase}/}: React.FC&lt;\${TM_SELECTED_TEXT/(.*)/\${1:/pascalcase}/}Props&gt; = (props) =&gt; {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  return (&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    &lt;div className=\\&quot;\${TM_SELECTED_TEXT/(.*)/\${1:/downcase}/}\\&quot;&gt;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;      \${2}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    &lt;/div&gt;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  );&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;};&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Creates React component from selected text&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حدّد اسمًا بسيطًا مثل <code>user-profile</code>، وشغّل المقتطف، فيحوّله إلى اسم مكوّن بحالة أحرف مناسبة (<code>UserProfile</code>) مع استخدام أحرف صغيرة لصنف CSS.</p>
<h3 id="مولد-مسارات-من-نقطة-نهاية-محددة">مولّد مسارات من نقطة نهاية محدّدة</h3>
<p>في تطوير واجهات API، يولّد هذا المقتطف معالج مسار في Express من مسار نقطة نهاية محدّد:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Express Route from Path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;exproute&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;/**&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot; * \${TM_SELECTED_TEXT} endpoint&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot; */&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;router.\${1|get,post,put,delete|}(&#x27;\${TM_SELECTED_TEXT}&#x27;, async (req, res) =&gt; {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  try {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    $2&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    return res.status(200).json({ success: true, data: {$3} });&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  } catch (error) {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    console.error(\`Error in \${TM_SELECTED_TEXT}: \${error.message}\`);&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    return res.status(500).json({ success: false, error: error.message });&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  }&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;});&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Create Express route handler from selected endpoint path&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حدّد مسارًا مثل <code>/api/users/:id</code>، وشغّل المقتطف، واختر طريقة HTTP، فتحصل على معالج مسار مكتمل.</p>
<h2 id="استخدام-المتغير-clipboard">استخدام المتغيّر <code>CLIPBOARD</code></h2>
<p>يُدرج المتغيّر <code>CLIPBOARD</code> محتوى الحافظة الحالي في مقتطفك. افترض أنك نسخت اسم صنف من مكان آخر وتريد إنشاء ملف مكوّن React سريعًا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;React component from Clipboard&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rcclip&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;import React from &#x27;react&#x27;;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;interface \${CLIPBOARD}Props {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  $1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;const \${CLIPBOARD}: React.FC&lt;\${CLIPBOARD}Props&gt; = (props) =&gt; {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  return (&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;    &lt;div&gt;\${2}&lt;/div&gt;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  );&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;};&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;export default \${CLIPBOARD};&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Generates React component using clipboard content as the component name&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>انسخ اسم المكوّن، وشغّل هذا المقتطف، فيظهر هيكل مكوّنك فورًا، كامل الاسم والنوع.</p>
<blockquote>
<p><strong>تأكّد من أن الحافظة تحتوي فعلًا ما تتوقّعه. وإلا انتهى بك الأمر إلى مكوّنات مثل <code>const BuyMilkReminder</code>، وهو طريف لكنه غير مقصود على الأرجح.</strong></p>
</blockquote>
<h2 id="موضع-المؤشر-النهائي">موضع المؤشر النهائي</h2>
<p>عند اكتمال توسّع مقتطفك، يحدّد موضع التوقّف الخاص <code>$0</code> أين يستقرّ المؤشر بعد ذلك. وهذا يتيح لك التحكّم بدقة في مكان متابعة البرمجة بعد ملء كل العناصر النائبة. مثلًا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Complete Function&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;fn&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;function \${1:funcName}(\${2:params}) {&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;  $0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;}&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Creates a function with a final cursor position for the function body&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في هذا المقتطف، بعد ملء اسم الدالة والمعاملات، يؤدي الضغط على <code>Tab</code> إلى نقل المؤشر مباشرةً إلى موضع <code>$0</code>، لتبدأ كتابة جسم الدالة.</p>
<h2 id="تشغيل-المقتطفات-المتداخلة">تشغيل المقتطفات المتداخلة</h2>
<p>لسير عمل أكثر تقدمًا، يمكنك تشغيل مقتطفات متداخلة داخل عنصر نائب. فأثناء تحرير عنصر نائب، إذا كتبت بادئة مقتطف وشغّلت توسّعه، سيُدرج المقتطف الجديد داخل العنصر النائب الحالي. ويفيد ذلك بوجه خاص في توليد محتوى متكرّر أو منظّم ديناميكيًا. فمثلًا، إذا كنت تكتب مكوّنًا وتحتاج كثيرًا إلى إدراج بنية نوع خصائص محدّدة، فإن تشغيل مقتطف متداخل يبسّط تلك العملية.</p>
<blockquote>
<p><strong>جرّب تداخل المقتطفات لتقليل الكتابة المتكرّرة والحفاظ على بنية متّسقة، لكن كن حذرًا، فقد تجعل المقتطفات المتداخلة المعقّدة أكثر من اللازم التنقّل صعبًا بعض الشيء.</strong></p>
</blockquote>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:o,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,l as html,t as slug,p as title};
