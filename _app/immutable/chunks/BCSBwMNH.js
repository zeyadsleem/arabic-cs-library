const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="advanced-debugging-techniques",p="تقنيات تنقيح متقدّمة",l=[{depth:2,id:"نقاط-التوقف-الشرطية",text:"نقاط التوقّف الشرطية"},{depth:2,id:"logpoints-مقابل-consolelog-مقارنة-مباشرة",text:"Logpoints مقابل console.log: مقارنة مباشرة"},{depth:3,id:"المقاربة-التقليدية-بـ-consolelog",text:"المقاربة التقليدية بـ console.log"},{depth:3,id:"مقاربة-logpoint",text:"مقاربة Logpoint"},{depth:3,id:"الفروق-الجوهرية",text:"الفروق الجوهرية"},{depth:3,id:"متى-تستخدم-كل-مقاربة",text:"متى تستخدم كل مقاربة"},{depth:2,id:"نقاط-توقف-العد-التراكمي",text:"نقاط توقّف العدّ التراكمي"},{depth:2,id:"نقاط-توقف-البيانات-مقاربات-عملية",text:"نقاط توقّف البيانات: مقاربات عملية"},{depth:3,id:"دعم-اللغات-لنقاط-توقف-البيانات",text:"دعم اللغات لنقاط توقّف البيانات"},{depth:3,id:"مثال-c-نقاط-توقف-بيانات-قوية",text:"مثال C#: نقاط توقّف بيانات قوية"},{depth:3,id:"مثال-c-مراقبة-على-مستوى-الذاكرة",text:"مثال C++: مراقبة على مستوى الذاكرة"},{depth:3,id:"حلول-بديلة-في-javascript-كائنات-proxy",text:"حلول بديلة في JavaScript: كائنات Proxy"},{depth:3,id:"بديل-آخر-تتبع-التغييرات-عبر-اللقطات",text:"بديل آخر: تتبّع التغييرات عبر اللقطات"},{depth:3,id:"متى-تستخدم-نقاط-توقف-البيانات",text:"متى تستخدم نقاط توقّف البيانات"},{depth:2,id:"نقاط-توقف-الدوال",text:"نقاط توقّف الدوال"},{depth:2,id:"التنقيح-عن-بعد",text:"التنقيح عن بُعد"},{depth:2,id:"تنقيح-الاختبارات-مقاربات-خاصة-بكل-إطار",text:"تنقيح الاختبارات: مقاربات خاصة بكل إطار"},{depth:3,id:"استخدام-واجهة-test-explorer",text:"استخدام واجهة Test Explorer"},{depth:3,id:"اختبارات-jest-javascripttypescript",text:"اختبارات Jest (JavaScript/TypeScript)"},{depth:3,id:"اختبارات-mocha-javascripttypescript",text:"اختبارات Mocha (JavaScript/TypeScript)"},{depth:3,id:"اختبارات-python-pytest",text:"اختبارات Python (pytest)"},{depth:3,id:"اختبارات-net-xunit-وnunit-وmstest",text:"اختبارات .NET (xUnit وNUnit وMSTest)"},{depth:3,id:"تنقيح-اختبارات-مكونات-الواجهة",text:"تنقيح اختبارات مكوّنات الواجهة"},{depth:3,id:"نصائح-لتنقيح-الاختبارات",text:"نصائح لتنقيح الاختبارات"},{depth:2,id:"فحص-المتغيرات",text:"فحص المتغيّرات"},{depth:2,id:"تعبيرات-المراقبة",text:"تعبيرات المراقبة"}],o=`<h2 id="نقاط-التوقف-الشرطية">نقاط التوقّف الشرطية</h2>
<p>تتيح لك نقاط التوقّف الشرطية إيقاف التنفيذ فقط عند تحقّق شرط محدّد. وهذا مفيد للغاية حين تحتاج إلى التحقيق في خطأ لا يظهر إلا في ظروف معيّنة، فيغني عن التقدّم سطرًا بسطر عبر شيفرة لا علاقة لها بالمشكلة.</p>
<p>لضبط نقطة توقّف شرطية، انقر بزر الفأرة الأيمن على نقطة توقّف قائمة (أو في الهامش الأيسر حيث توضع نقاط التوقّف) واختر “Edit Breakpoint…“. ثم اختر “Expression” من القائمة المنسدلة. وأدخل تعبير JavaScript يُقيَّم إلى <code>true</code> أو <code>false</code>. ولن تُفعَّل نقطة التوقّف إلا إذا كان التعبير <code>true</code>.</p>
<p>فمثلًا، تخيّل أنك تنقّح حلقة ولا تريد التوقّف إلا عندما يكون المتغيّر <code>i</code> أكبر من 100 والمتغيّر <code>data[i].status</code> مساويًا لـ “error”:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Your code</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.<span class="hljs-property">length</span>; i++) {
  <span class="hljs-comment">// … some code …</span>
}

<span class="hljs-comment">// Conditional Breakpoint Expression:</span>
i &gt; <span class="hljs-number">100</span> &amp;&amp; data[i].<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>;
</code></pre>
<p>لن يتوقّف المُنقّح الآن إلا <em>داخل</em> الحلقة عندما يكون <em>كلا</em> الشرطين صحيحًا. وهذا أكفأ بكثير من التقدّم يدويًا عبر الحلقة مئات المرّات.</p>
<h2 id="logpoints-مقابل-consolelog-مقارنة-مباشرة">Logpoints مقابل console.log: مقارنة مباشرة</h2>
<p>يساعدك كلٌّ من Logpoints وعبارات <code>console.log</code> على تتبّع تنفيذ البرنامج وفحص القيم، لكنهما يختلفان اختلافًا كبيرًا في طريقة عملهما ووقت استخدام كلٍّ منهما.</p>
<h3 id="المقاربة-التقليدية-بـ-consolelog">المقاربة التقليدية بـ console.log</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params">item</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Processing item:&#x27;</span>, item.<span class="hljs-property">id</span>, <span class="hljs-string">&#x27;name:&#x27;</span>, item.<span class="hljs-property">name</span>); <span class="hljs-comment">// Added manually</span>

  <span class="hljs-comment">// Process the item...</span>

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Processing completed, result:&#x27;</span>, result); <span class="hljs-comment">// Added manually</span>
  <span class="hljs-keyword">return</span> result;
}
</code></pre>
<h3 id="مقاربة-logpoint">مقاربة Logpoint</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params">item</span>) {
  <span class="hljs-comment">// No code modification needed! Logpoint added through Visual Studio Code UI:</span>
  <span class="hljs-comment">// &quot;Processing item: {item.id}, name: {item.name}&quot;</span>

  <span class="hljs-comment">// Process the item...</span>

  <span class="hljs-comment">// Another logpoint added through Visual Studio Code UI:</span>
  <span class="hljs-comment">// &quot;Processing completed, result: {result}&quot;</span>
  <span class="hljs-keyword">return</span> result;
}
</code></pre>
<h3 id="الفروق-الجوهرية">الفروق الجوهرية</h3>
<table>
<thead>
<tr>
<th>الميزة</th>
<th>console.log</th>
<th>Logpoints</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>تعديل الشيفرة</strong></td>
<td>يتطلّب تغيير الشيفرة المصدرية</td>
<td>لا حاجة إلى أي تغيير في الشيفرة المصدرية</td>
</tr>
<tr>
<td><strong>التحكّم في الإصدارات</strong></td>
<td>تظهر التغييرات في الإيداعات</td>
<td>غير مرئية لنظام التحكّم في الإصدارات</td>
</tr>
<tr>
<td><strong>النشر</strong></td>
<td>يجب حذفها أو تحويلها إلى تعليقات قبل الإنتاج</td>
<td>تُزال تلقائيًا عند انتهاء التنقيح</td>
</tr>
<tr>
<td><strong>التسجيل الشرطي</strong></td>
<td>يتطلّب عبارات if صريحة</td>
<td>دعم مدمج لتعبيرات الشروط</td>
</tr>
<tr>
<td><strong>أثر الأداء</strong></td>
<td>تُنفَّذ دائمًا، حتى في الإنتاج</td>
<td>نشطة أثناء التنقيح فقط</td>
</tr>
<tr>
<td><strong>الاستمرارية</strong></td>
<td>تبقى في الشيفرة حتى تُحذف يدويًا</td>
<td>تستمر بين جلسات التنقيح لكنها لا تؤثّر في الإنتاج</td>
</tr>
<tr>
<td><strong>التعاون</strong></td>
<td>يرى زملاؤك سجلات التنقيح الخاصة بك</td>
<td>لا تؤثّر في تجربة زملائك</td>
</tr>
</tbody>
</table>
<h3 id="متى-تستخدم-كل-مقاربة">متى تستخدم كل مقاربة</h3>
<p><strong>استخدم console.log عندما:</strong></p>
<ul>
<li>تحتاج إلى سجلات في الإنتاج لأغراض المراقبة أو التدقيق</li>
<li>تريد أن يرى أعضاء الفريق السجلات نفسها</li>
<li>تستخدمه كجزء من استراتيجيتك الدائمة للتسجيل</li>
</ul>
<p><strong>استخدم Logpoints عندما:</strong></p>
<ul>
<li>تحتاج إلى مخرَج تنقيح مؤقّت</li>
<li>تستكشف شيفرة غير مألوفة</li>
<li>تنقّح مكتبات طرف ثالث</li>
<li>تريد تجنّب إثقال الإيداعات بشيفرة تنقيح</li>
<li>تحتاج إلى مخرَج تنقيح شرطي من دون تعديل الشيفرة</li>
</ul>
<p>لإضافة logpoint، انقر بزر الفأرة الأيمن في هامش نقاط التوقّف واختر “Add Logpoint…“. وأدخل رسالة تُسجَّل. ويمكنك استخدام الأقواس المعقوفة <code>{}</code> لتضمين تعبيرات داخل رسالة السجل، على غرار القوالب النصية (template literals).</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Your code</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-built_in">any</span></span>) {
  <span class="hljs-comment">// … some code …</span>
}

<span class="hljs-comment">// Logpoint Message:</span>
(<span class="hljs-string">&#x27;Processing item: {item.id}, name: {item.name}&#x27;</span>);
</code></pre>
<p>عند بلوغ نقطة الـ logpoint، تُطبع الرسالة في Debug Console، مع القيم المُقيَّمة لـ <code>item.id</code> و<code>item.name</code>.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تُعدّ Logpoints مفيدة للغاية لتنقيح شيفرة لا تملكها أو لا تستطيع تعديلها مباشرة. وهي أيضًا ممتازة لتشخيص المشكلات في بيئات الإنتاج حيث لا يمكنك بسهولة إعادة تشغيل التطبيق بشيفرة معدّلة.</p>
</blockquote>
<h2 id="نقاط-توقف-العد-التراكمي">نقاط توقّف العدّ التراكمي</h2>
<p>تتيح لك نقاط توقّف العدّ التراكمي (hit count breakpoints) إيقاف التنفيذ فقط بعد أن تُصاب نقطة التوقّف عددًا محدّدًا من المرّات. وهذا مفيد في الحالات التي لا يظهر فيها خطأ إلا بعد عدد معيّن من الدورات في حلقة، أو بعد استدعاء دالة مرارًا.</p>
<p>لضبط نقطة توقّف عدّ تراكمي، انقر بزر الفأرة الأيمن على نقطة توقّف واختر “Edit Breakpoint…“. واختر “Hit Count” من القائمة المنسدلة. وأدخل رقمًا. ولن تُفعَّل نقطة التوقّف إلا بعد أن تُصاب ذلك العدد من المرّات.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Your code</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
  <span class="hljs-comment">// … some code …</span>
  <span class="hljs-comment">// Breakpoint set to hit count 500</span>
}
</code></pre>
<p>سيتوقّف المُنقّح داخل الحلقة عند الدورة الـ500 فقط.</p>
<p>ويمكنك أيضًا استخدام عوامل المقارنة: <code>&gt;</code> (أكبر من)، و<code>&gt;=</code> (أكبر أو يساوي)، و<code>&lt;</code> (أصغر من)، و<code>&lt;=</code> (أصغر أو يساوي)، أو <code>=</code> (يساوي). فمثلًا، <code>&gt;10</code> سيُفعّل نقطة التوقّف بعد 10 إصابات.</p>
<h2 id="نقاط-توقف-البيانات-مقاربات-عملية">نقاط توقّف البيانات: مقاربات عملية</h2>
<p>صُمّمت نقاط توقّف البيانات (المعروفة أيضًا بـ“watchpoints”) لإيقاف التنفيذ عندما <em>تتغيّر</em> قيمة متغيّر محدّد. وهي قوية استثنائيًا لتتبّع التعديلات غير المتوقّعة على بياناتك.</p>
<h3 id="دعم-اللغات-لنقاط-توقف-البيانات">دعم اللغات لنقاط توقّف البيانات</h3>
<p>يتفاوت مستوى دعم نقاط توقّف البيانات في Visual Studio Code حسب اللغة:</p>
<table>
<thead>
<tr>
<th>اللغة</th>
<th>مستوى الدعم</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>JavaScript/TypeScript</strong></td>
<td>محدود</td>
<td>دعم أساسي لتغيّرات الخصائص على الكائنات العامة</td>
</tr>
<tr>
<td><strong>C/C++</strong></td>
<td>كامل</td>
<td>دعم شامل لعناوين الذاكرة</td>
</tr>
<tr>
<td><strong>C#/.NET</strong></td>
<td>كامل</td>
<td>كشف قوي لتغيّرات الخصائص</td>
</tr>
<tr>
<td><strong>Java</strong></td>
<td>متوسّط</td>
<td>يعتمد الدعم على إصدار إضافة Java</td>
</tr>
<tr>
<td><strong>Python</strong></td>
<td>محدود</td>
<td>دعم أساسي في بعض إضافات التنقيح</td>
</tr>
</tbody>
</table>
<h3 id="مثال-c-نقاط-توقف-بيانات-قوية">مثال C#: نقاط توقّف بيانات قوية</h3>
<p>في C#، تُدعَم نقاط توقّف البيانات جيدًا. فعند تنقيح تطبيق C#:</p>
<ol>
<li>شغّل التطبيق في وضع التنقيح</li>
<li>عند التوقّف، اعثر على متغيّر في لوحة Variables</li>
<li>انقر بزر الفأرة الأيمن واختر “Break When Value Changes”</li>
</ol>
<pre><code class="language-csharp"><span class="hljs-comment">// C# Example</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">User</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-built_in">string</span> Name { <span class="hljs-keyword">get</span>; <span class="hljs-keyword">set</span>; }
    <span class="hljs-keyword">public</span> <span class="hljs-built_in">int</span> Age { <span class="hljs-keyword">get</span>; <span class="hljs-keyword">set</span>; }
}

<span class="hljs-comment">// In your code</span>
<span class="hljs-keyword">var</span> user = <span class="hljs-keyword">new</span> User { Name = <span class="hljs-string">&quot;John&quot;</span>, Age = <span class="hljs-number">30</span> };
UpdateUserData(user);  <span class="hljs-comment">// Set a data breakpoint on user.Age</span>
</code></pre>
<p>سيتوقّف المُنقّح تلقائيًا عند تغيّر خاصية <code>Age</code>، ويُظهر لك بالضبط موضع التعديل.</p>
<h3 id="مثال-c-مراقبة-على-مستوى-الذاكرة">مثال C++: مراقبة على مستوى الذاكرة</h3>
<p>يوفّر C++ دعمًا منخفض المستوى عبر نقاط مراقبة الذاكرة:</p>
<pre><code class="language-cpp"><span class="hljs-comment">// C++ Example</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">Product</span> {
    <span class="hljs-type">int</span> id;
    <span class="hljs-type">double</span> price;
};

<span class="hljs-comment">// In your code</span>
Product product{<span class="hljs-number">1</span>, <span class="hljs-number">9.99</span>};
<span class="hljs-comment">// Set a data breakpoint on product.price</span>
<span class="hljs-built_in">UpdateInventory</span>(&amp;product);
</code></pre>
<p>يستطيع مُنقّح C++ مراقبة عنوان الذاكرة الخاص بـ <code>product.price</code> والتوقّف بدقّة عند تغيّر موضع الذاكرة ذلك.</p>
<h3 id="حلول-بديلة-في-javascript-كائنات-proxy">حلول بديلة في JavaScript: كائنات Proxy</h3>
<p>مع أن دعم نقاط توقّف البيانات الأصلية محدود في JavaScript، يمكنك استخدام كائن <code>Proxy</code> في JavaScript لتحقيق وظائف مشابهة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Create a monitored version of your object</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createMonitored</span>(<span class="hljs-params">obj, onChange</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(obj, {
    <span class="hljs-title function_">set</span>(<span class="hljs-params">target, property, value</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Property &#x27;<span class="hljs-subst">\${property}</span>&#x27; changing from <span class="hljs-subst">\${target[property]}</span> to <span class="hljs-subst">\${value}</span>\`</span>);
      <span class="hljs-title function_">onChange</span>(target, property, value);
      target[property] = value;
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    },
  });
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">100</span> };
<span class="hljs-keyword">const</span> monitoredUser = <span class="hljs-title function_">createMonitored</span>(user, <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {
  <span class="hljs-keyword">debugger</span>; <span class="hljs-comment">// This will pause execution whenever a property changes</span>
});

<span class="hljs-comment">// Now use monitoredUser instead of user</span>
monitoredUser.<span class="hljs-property">score</span> = <span class="hljs-number">150</span>; <span class="hljs-comment">// Will trigger the debugger</span>
</code></pre>
<p>تتيح لك هذه المقاربة إنشاء “نسخة تنقيح” من كائن يُوقف التنفيذ تلقائيًا عند تغيّر أي خاصية.</p>
<h3 id="بديل-آخر-تتبع-التغييرات-عبر-اللقطات">بديل آخر: تتبّع التغييرات عبر اللقطات</h3>
<p>بالنسبة إلى الكائنات المعقّدة التي لا تناسبها مقاربة الـ proxy، يمكنك تنفيذ تتبّع يدوي للتغييرات:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">trackChanges</span>(<span class="hljs-params">obj, label = <span class="hljs-string">&#x27;Object&#x27;</span></span>) {
  <span class="hljs-keyword">const</span> snapshot = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(obj);

  <span class="hljs-comment">// Create a conditional breakpoint with this expression:</span>
  <span class="hljs-comment">// JSON.stringify(obj) !== snapshot</span>

  <span class="hljs-comment">// Or use a logpoint with this message:</span>
  <span class="hljs-comment">// \`\${label} changed: before=\${snapshot}, after=\${JSON.stringify(obj)}\`</span>
}

<span class="hljs-comment">// In your code</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params">data</span>) {
  <span class="hljs-title function_">trackChanges</span>(data, <span class="hljs-string">&#x27;data&#x27;</span>);
  <span class="hljs-comment">// ... processing ...</span>
}
</code></pre>
<h3 id="متى-تستخدم-نقاط-توقف-البيانات">متى تستخدم نقاط توقّف البيانات</h3>
<p>نقاط توقّف البيانات مفيدة بوجه خاص في تنقيح:</p>
<ol>
<li><strong>تغيّرات الحالة غير المتوقّعة</strong>: عندما تُعدَّل قيمة لكنك لا تعرف أين</li>
<li><strong>حالات التسابق (race conditions)</strong>: عندما قد تكون أجزاء متعدّدة من الشيفرة تغيّر البيانات نفسها</li>
<li><strong>التفاعلات مع مكتبات الطرف الثالث</strong>: عندما تعدّل شيفرة خارجية كائناتك</li>
<li><strong>تحوّلات الكائنات المعقّدة</strong>: عند تتبّع التغييرات في أعماق تسلسلات الكائنات</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>حتى في اللغات ذات الدعم المحدود لنقاط توقّف البيانات، يمكن أن يوفّر الجمع بين نقاط التوقّف الشرطية والـ logpoints وكائنات proxy المخصّصة وظائف مشابهة مع قليل من الإعداد الإضافي.</p>
</blockquote>
<h2 id="نقاط-توقف-الدوال">نقاط توقّف الدوال</h2>
<p>تتيح لك نقاط توقّف الدوال إيقاف التنفيذ كلما <em>استُدعيت</em> دالة محدّدة، بصرف النظر عن موضع الاستدعاء. وهذا مفيد للغاية حين تريد فهم كيف تُستخدم دالة معيّنة في أنحاء تطبيقك، وخصوصًا في قواعد الشيفرة الكبيرة أو عند التعامل مع دوال الاستدعاء أو معالجات الأحداث.</p>
<p>لإنشاء نقطة توقّف دالة، انتقل إلى قسم “Breakpoints” في عرض Debug. وانقر على زر ”+” واختر “Function Breakpoint”. ثم أدخل اسم الدالة. ويمكنك أيضًا تحديد شرط أو عدّ تراكمي لنقاط توقّف الدوال.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Function Breakpoint:</span>
myFunction;
</code></pre>
<p>سيتوقّف المُنقّح الآن عند بداية <code>myFunction</code> في كل مرة تُستدعى فيها.</p>
<h2 id="التنقيح-عن-بعد">التنقيح عن بُعد</h2>
<p>يتيح لك التنقيح عن بُعد تنقيح تطبيق يعمل على جهاز مختلف، أو داخل جهاز افتراضي، أو داخل حاوية Docker. وهذا ضروري لتنقيح تطبيقات جهة الخادم، أو عمليات النشر السحابية، أو الحالات التي تختلف فيها بيئة التنفيذ عن جهاز التطوير لديك.</p>
<p>يدعم Visual Studio Code التنقيح عن بُعد عبر إضافات وإعدادات تنقيح متنوّعة. وتتضمّن المقاربة العامة ما يلي:</p>
<ol>
<li><strong>تهيئة البيئة البعيدة:</strong> تأكّد من تثبيت أدوات التنقيح اللازمة في البيئة البعيدة (مثل مُنقّح Node.js، ومُنقّح Python، وغيرها).</li>
<li><strong>ضبط المُنقّح:</strong> أنشئ إعدادًا في <code>launch.json</code> يكون فيه نوع <code>request</code> مضبوطًا على <code>&quot;attach&quot;</code>. وستحتاج إلى تحديد المضيف والمنفذ وتفاصيل الاتصال الأخرى الخاصة بالمُنقّح البعيد.</li>
<li><strong>الاتصال بالعملية البعيدة:</strong> شغّل التطبيق في وضع التنقيح على الجهاز البعيد، ثم استخدم عرض Debug في Visual Studio Code للاتصال به.</li>
</ol>
<p>فمثلًا، لتنقيح تطبيق Node.js يعمل عن بُعد:</p>
<p>JSON</p>
<pre><code class="language-typescript"><span class="hljs-comment">// launch.json</span>
{
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;0.2.0&quot;</span>,
    <span class="hljs-string">&quot;configurations&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pwa-node&quot;</span>,
            <span class="hljs-string">&quot;request&quot;</span>: <span class="hljs-string">&quot;attach&quot;</span>,
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Attach to Remote&quot;</span>,
            <span class="hljs-string">&quot;address&quot;</span>: <span class="hljs-string">&quot;192.168.1.100&quot;</span>, <span class="hljs-comment">// IP address of the remote machine</span>
            <span class="hljs-string">&quot;port&quot;</span>: <span class="hljs-number">9229</span>,              <span class="hljs-comment">// Debugging port</span>
            <span class="hljs-string">&quot;localRoot&quot;</span>: <span class="hljs-string">&quot;\${workspaceFolder}&quot;</span>,
            <span class="hljs-string">&quot;remoteRoot&quot;</span>: <span class="hljs-string">&quot;/path/to/app/on/remote&quot;</span>, <span class="hljs-comment">// Path to the app on the remote machine</span>
            <span class="hljs-string">&quot;skipFiles&quot;</span>: [<span class="hljs-string">&quot;&lt;node_internals&gt;/**&quot;</span>]
        }
    ]
}
</code></pre>
<p>على الجهاز البعيد، ستشغّل تطبيق Node.js الخاص بك مع العَلَم <code>--inspect</code>:</p>
<p>Bash</p>
<pre><code class="language-typescript">node --inspect=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">9229</span> index.<span class="hljs-property">js</span>  # <span class="hljs-title class_">Allow</span> connections <span class="hljs-keyword">from</span> <span class="hljs-built_in">any</span> <span class="hljs-variable constant_">IP</span>
</code></pre>
<p>توفّر حاويات التطوير Dev Containers (التي تناولناها في أقسامك السابقة) طريقة انسيابية للتعامل مع التنقيح عن بُعد داخل حاويات Docker، إذ تؤتمت كثيرًا من خطوات هذا الإعداد.</p>
<h2 id="تنقيح-الاختبارات-مقاربات-خاصة-بكل-إطار">تنقيح الاختبارات: مقاربات خاصة بكل إطار</h2>
<p>تنقيح الاختبارات ضروري لفهم سبب فشلها ولإصلاح شيفرتك أو اختباراتك وفقًا لذلك. ويوفّر Visual Studio Code دعمًا شاملًا لتنقيح مختلف أطر الاختبار، مما يتيح لك التقدّم في تنفيذ الاختبارات سطرًا بسطر وفحص المتغيّرات كما تفعل مع أي شيفرة أخرى.</p>
<h3 id="استخدام-واجهة-test-explorer">استخدام واجهة Test Explorer</h3>
<p>يوفّر Test Explorer في Visual Studio Code واجهة موحّدة لاكتشاف الاختبارات وعرضها وتشغيلها عبر أطر مختلفة:</p>
<ol>
<li>ثبّت إضافة الاختبار المناسبة لإطارك</li>
<li>افتح لوحة Testing في الشريط الجانبي (أيقونة القارورة)</li>
<li>تُكتشف الاختبارات تلقائيًا وتُعرض في عرض شجري</li>
<li>انقر بزر الفأرة الأيمن على اختبار واختر “Debug Test” لتشغيله في وضع التنقيح</li>
</ol>
<p>![Test Explorer يعرض شجرة اختبارات مع خيارات التنقيح]</p>
<h3 id="اختبارات-jest-javascripttypescript">اختبارات Jest (JavaScript/TypeScript)</h3>
<p>بالنسبة إلى Jest، وهو أشهر إطار اختبار في JavaScript:</p>
<pre><code class="language-json"><span class="hljs-comment">// launch.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Debug Jest Tests&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/node_modules/.bin/jest&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;--runInBand&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;\${fileBasename}&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integratedTerminal&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;internalConsoleOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;neverOpen&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;disableOptimisticBPs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>مع هذا الإعداد:</p>
<ul>
<li>يضمن <code>--runInBand</code> تشغيل الاختبارات بالتتابع، وهو أفضل للتنقيح</li>
<li>يشغّل <code>\${fileBasename}</code> الاختبارات في الملف الحالي</li>
<li>يمكنك ضبط نقاط التوقّف مباشرة في اختبارك أو في الشيفرة التي تُختبر</li>
</ul>
<p>ولمقاربة أكثر تفاعلًا، ثبّت إضافة “Jest Runner” التي تضيف أزرار “Debug” مضمّنة فوق كل اختبار:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Example Jest test with breakpoint</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;calculates total correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> cart = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ShoppingCart</span>();
  cart.<span class="hljs-title function_">addItem</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">10</span> });
  cart.<span class="hljs-title function_">addItem</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">20</span> });

  <span class="hljs-comment">// Set a breakpoint on the next line to inspect the cart before checking</span>
  <span class="hljs-keyword">const</span> total = cart.<span class="hljs-title function_">calculateTotal</span>();

  <span class="hljs-title function_">expect</span>(total).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">30</span>);
});
</code></pre>
<h3 id="اختبارات-mocha-javascripttypescript">اختبارات Mocha (JavaScript/TypeScript)</h3>
<p>بالنسبة إلى Mocha، وهو إطار اختبار آخر شائع في JavaScript:</p>
<pre><code class="language-json"><span class="hljs-comment">// launch.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Debug Mocha Tests&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/node_modules/mocha/bin/_mocha&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;--timeout&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;999999&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;--colors&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;\${file}&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;internalConsoleOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openOnSessionStart&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="اختبارات-python-pytest">اختبارات Python (pytest)</h3>
<p>بالنسبة إلى Python باستخدام pytest:</p>
<pre><code class="language-json"><span class="hljs-comment">// launch.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Debug pytest&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;python&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pytest&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;\${file}&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;-v&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;justMyCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تضيف إضافة “Python” في Visual Studio Code عدسات شيفرة فوق دوال الاختبار تحمل زرّي “Run Test” و“Debug Test”:</p>
<pre><code class="language-python"><span class="hljs-comment"># Example pytest test</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">test_calculate_area</span>():
    rectangle = Rectangle(width=<span class="hljs-number">5</span>, height=<span class="hljs-number">10</span>)

    <span class="hljs-comment"># Set a breakpoint here to inspect the rectangle</span>
    area = rectangle.calculate_area()

    <span class="hljs-keyword">assert</span> area == <span class="hljs-number">50</span>
</code></pre>
<h3 id="اختبارات-net-xunit-وnunit-وmstest">اختبارات .NET (xUnit وNUnit وMSTest)</h3>
<p>توفّر إضافة C# دعمًا مدمجًا ممتازًا لأطر اختبار .NET:</p>
<pre><code class="language-json"><span class="hljs-comment">// launch.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Debug xUnit Tests&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;coreclr&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;preLaunchTask&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dotnet&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;test&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;\${workspaceFolder}/tests/MyProject.Tests/MyProject.Tests.csproj&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;cwd&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;internalConsole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;stopAtEntry&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="تنقيح-اختبارات-مكونات-الواجهة">تنقيح اختبارات مكوّنات الواجهة</h3>
<p>بالنسبة إلى اختبارات المكوّنات في أطر مثل React أو Vue أو Angular:</p>
<ol>
<li><strong>React Testing Library / Enzyme</strong>: استخدم إعداد Jest لكن أضف الوسيطة <code>--env=jsdom</code>
<ul>
<li>استخدم إعداد Jest لكن أضف الوسيطة <code>--env=jsdom</code></li>
</ul>
</li>
<li><strong>اختبارات مكوّنات Cypress</strong>: استخدم إضافة Cypress لفتح Cypress في وضع التنقيح، واضبط نقاط التوقّف في شيفرة مكوّنك
<ul>
<li>استخدم إضافة Cypress لفتح Cypress في وضع التنقيح</li>
<li>اضبط نقاط التوقّف في شيفرة مكوّنك</li>
</ul>
</li>
<li><strong>اختبارات Storybook</strong>: انقّح خادم تطوير Storybook باستخدام مُنقّح Chrome
<ul>
<li>انقّح خادم تطوير Storybook باستخدام مُنقّح Chrome</li>
</ul>
</li>
</ol>
<h3 id="نصائح-لتنقيح-الاختبارات">نصائح لتنقيح الاختبارات</h3>
<ol>
<li><strong>اقتصر على الاختبارات الفاشلة في التنقيح</strong>: تتيح لك معظم أطر الاختبار تشغيل الاختبارات المطابقة لنمط فقط <code><span class="line"><span style="color:#637777;font-style:italic"># Jest example</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">jest</span><span style="color:#82AAFF"> -t</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">calculates total</span><span style="color:#D9F5DD">&quot;</span><span style="color:#82AAFF"> --runInBand</span></span></code></li>
<li><strong>استخدم وضع المراقبة مع نقاط التوقّف</strong>: شغّل مُشغّل الاختبارات في وضع المراقبة واضبط نقاط التوقّف للتنقيح تلقائيًا عند التغييرات</li>
<li><strong>انقّح الاختبار والتنفيذ معًا</strong>: اضبط نقاط التوقّف في ملفات الاختبار وفي الشيفرة قيد الاختبار لفهم المسار كاملًا</li>
<li><strong>استخدم Debug Console في Visual Studio Code</strong>: قيّم التعبيرات وعدّل القيم أثناء تنفيذ الاختبار</li>
<li><strong>حاكِ الاعتمادات</strong>: اعزل اختباراتك بتهيئة بدائل محاكاة في Debug Console أثناء تنفيذ متوقّف</li>
</ol>
<h2 id="فحص-المتغيرات">فحص المتغيّرات</h2>
<p>لوحة “Variables” في عرض Debug هي أداتك الأساسية لفحص حالة تطبيقك أثناء التنقيح. وهي تعرض:</p>
<ul>
<li><strong>المتغيّرات المحلية:</strong> المتغيّرات داخل النطاق الحالي (دالة أو كتلة).</li>
<li><strong>المتغيّرات العامة:</strong> المتغيّرات المتاحة من أي موضع في شيفرتك.</li>
<li><strong>الإغلاقات (Closures):</strong> متغيّرات من نطاقات خارجية يمكن الوصول إليها داخل الدالة الحالية (وهذا مهم في JavaScript واللغات الأخرى التي تملك إغلاقات).</li>
<li><strong>مكدّس الاستدعاءات (Call Stack):</strong> تسلسل استدعاءات الدوال الذي أدّى إلى نقطة التنفيذ الحالية. ويمكنك النقر على إطارات مختلفة في مكدّس الاستدعاءات لفحص المتغيّرات في تلك النطاقات.</li>
</ul>
<p>ويمكنك توسيع الكائنات والمصفوفات لرؤية خصائصها وعناصرها. كما يمكنك تعديل قيم المتغيّرات مباشرة في لوحة Variables (في معظم الحالات) لاختبار سيناريوهات مختلفة.</p>
<h2 id="تعبيرات-المراقبة">تعبيرات المراقبة</h2>
<p>تتيح لك تعبيرات المراقبة مراقبة قيم تعبيرات أو متغيّرات محدّدة باستمرار أثناء التنقيح. وتُعاد تقييم هذه التعبيرات في كل مرة يتوقّف فيها المُنقّح، مما يوفّر عرضًا ديناميكيًا لبياناتك.</p>
<p>لإضافة تعبير مراقبة، انتقل إلى قسم “Watch” في عرض Debug وانقر على زر ”+”. وأدخل تعبير JavaScript. وسيُقيَّم التعبير وتُعرض قيمته.</p>
<p>فمثلًا، قد تراقب:</p>
<ul>
<li><code>myVariable</code>: لرؤية القيمة الحالية لمتغيّر.</li>
<li><code>myArray.length</code>: لتتبّع حجم مصفوفة.</li>
<li><code>myObject.property1 + myObject.property2</code>: لرؤية نتيجة حساب.</li>
<li><code>typeof myVariable</code>: لتتبّع نوع البيانات.</li>
</ul>
<p>تعبيرات المراقبة ذات قيمة كبيرة لتتبّع تغيّرات الحالة المعقّدة وفهم كيف تتطوّر بياناتك أثناء التنفيذ.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>اجمع تعبيرات المراقبة مع نقاط التوقّف الشرطية لتنقيح أكثر استهدافًا. فمثلًا، يمكنك ضبط نقطة توقّف شرطية لا تُفعَّل إلا عندما يستوفي تعبير مراقَب شرطًا معيّنًا.</p>
</blockquote>
<p>بإتقانك هذه التقنيات المتقدّمة في التنقيح، ستكون مجهّزًا جيدًا للتعامل حتى مع أصعب حالات التنقيح في Visual Studio Code. وتذكّر أن تجرّب هذه الميزات وأن تجد سير العمل الأنسب لاحتياجاتك. تنقيحًا ممتعًا!</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,o as html,t as slug,p as title};
