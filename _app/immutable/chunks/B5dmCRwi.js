const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="error-handling-and-edge-case-testing",l="اختبار الحالات الحدّية",e=[{depth:2,id:"لماذا-تختبر-معالجة-الأخطاء",text:"لماذا تختبر معالجة الأخطاء؟"},{depth:2,id:"مثال-من-العالم-الحقيقي-اختبار-المدخلات-غير-الصالحة",text:"مثال من العالم الحقيقي: اختبار المدخلات غير الصالحة"},{depth:2,id:"كتابة-اختبارات-الأخطاء-مع-vitest",text:"كتابة اختبارات الأخطاء مع Vitest"},{depth:2,id:"اختبار-أن-دالة-رمت-خطأ",text:"اختبار أن دالة رمت خطأً"},{depth:2,id:"اختبار-الحالات-الحدية",text:"اختبار الحالات الحدّية"},{depth:3,id:"المضي-أبعد",text:"المضي أبعد"},{depth:2,id:"خلاصات-حول-اختبار-الأخطاء-والحالات-الحدية",text:"خلاصات حول اختبار الأخطاء والحالات الحدّية"}],p=`<p>لنتحدّث عن هؤلاء المشاغبين الخفيّين المعرّضين للأخطاء والذين نحب أن نسمّيهم <em>الحالات الحدّية</em>. كما تعرف—الأشياء الغريبة التي يفعلها المستخدمون (والزملاء) ولم تكن تتوقّعها.</p>
<h2 id="لماذا-تختبر-معالجة-الأخطاء">لماذا تختبر معالجة الأخطاء؟</h2>
<p>تحدث الأخطاء. <a href="https://en.wikipedia.org/wiki/Murphy%27s_law">قانون مورفي</a> يأتي للجميع. الفكرة هي: شيفرتك <em>ستتعطّل</em>. هذا أمر مسلّم به. اختبارات معالجة الأخطاء السليمة تتيح لك على الأقل أن تتعطّل <em>بأناقة</em>. فكتلة <code>try/catch</code> في المكان المناسب لا تمنع تطبيق الإنتاج من الانهيار فحسب، بل تمنحك أيضًا تغذية راجعة قيّمة عمّا حدث خطأ.</p>
<ul>
<li><strong>ضمان معالجة الأخطاء السليمة</strong>: التحقّق من أن الدوال ترمي الأخطاء بشكل صحيح يساعد في ضمان أن تطبيقك يتصرّف كما هو متوقّع عندما تسوء الأمور.</li>
<li><strong>منع الإخفاقات الصامتة</strong>: الاختبار بحثًا عن الأخطاء المرمية يساعد في تجنّب حالات تفشل فيها الشيفرة بصمت، مما يجعل التنقيح صعبًا.</li>
<li><strong>فرض التحقّق</strong>: اختبار الدوال التي يُتوقّع أن ترمي أخطاءً لمدخلات غير صالحة أو عمليات فاشلة يضمن أن شيفرتك تتحقّق بشكل سليم وتحمي من السلوك غير الصحيح.</li>
</ul>
<p>عندما تختبر معالجة الأخطاء، فإنك تضمن أن تطبيقك يتعامل بلطف مع أسوأ السيناريوهات. كما تعرف، مثل أن يمرّر أحدهم <code>undefined</code> إلى تابع يتوقّع سلسلة نصية. (يحدث هذا أكثر مما نرغب.)</p>
<h2 id="مثال-من-العالم-الحقيقي-اختبار-المدخلات-غير-الصالحة">مثال من العالم الحقيقي: اختبار المدخلات غير الصالحة</h2>
<p>لنغص في مثال. تخيّل أن لديك دالة تحوّل السلاسل النصية إلى أعداد. تريد أن تتأكّد من أنها لا تنفجر عندما تُعطى شيئًا لا تستطيع التعامل معه، مثل <code>&quot;two&quot;</code> أو <code>null</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/utility-belt/src/string-to-number.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">stringToNumber</span> = (<span class="hljs-params">value</span>) =&gt; {
  <span class="hljs-keyword">const</span> number = <span class="hljs-title class_">Number</span>(value);

  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(number)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`&#x27;<span class="hljs-subst">\${value}</span>&#x27; cannot be parsed as a number.\`</span>);
  }

  <span class="hljs-keyword">return</span> number;
};
</code></pre>
<p>لدينا هنا دالة بسيطة تريد التعامل فقط مع السلاسل النصية <em>الصالحة</em> التي تمثّل أعدادًا. لكن ماذا لو كتب المستخدم <code>&quot;hello&quot;</code> أو مرّر <code>undefined</code> لأن… حسنًا، المستخدمون؟ الأخطاء تتكاثر! لنتأكّد من أن دالتنا ترمي تلك الأخطاء بطريقة محكومة.</p>
<h2 id="كتابة-اختبارات-الأخطاء-مع-vitest">كتابة اختبارات الأخطاء مع Vitest</h2>
<p>الآن، لنكتب بعض اختبارات Vitest لتغطية هذه اللحظات الخاصة. عند كتابة اختبارات حول معالجة الأخطاء، هدفك هو التقاط الاستثناءات. لكن لنبدأ بالمسار السعيد.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/utility-belt/src/string-to-number.test.js</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;stringToNumber&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;converts a string to a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;42&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">42</span>);
  });
});
</code></pre>
<p>حتى الآن، كل شيء جيد. لكن لنبدأ بالمرور على بعض الحالات الحدّية. نعرف الأمور التالية:</p>
<ol>
<li>رمي خطأ داخل اختبار يؤدي إلى فشل الاختبار.</li>
<li>نريد اختبار حالة <em>يجب</em> أن ترمي فيها الدالة خطأً.</li>
</ol>
<p>قد نُغرَى بكتابة شيء كهذا:</p>
<pre><code class="language-javascript">it.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">42</span>);
});
</code></pre>
<p>لكن هذا مقزّز.</p>
<ol>
<li>صحيح أنه ينجح. لكن ربما ليس للسبب الذي نعتقده؟</li>
<li>لم نُقرّ بأي شيء عن طريقة فشله.</li>
</ol>
<p>على سبيل المثال، ما يلي خطأ <em>حقيقي</em> ارتكبته أثناء كتابتي لهذا.</p>
<pre><code class="language-javascript">it.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;foo&#x27;</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">42</span>);
});
</code></pre>
<p>نسيت حتى أن أضمّن الدالة التي كنا نختبرها—ومع ذلك نجح الاختبار. هذا صحيح—حتى شخص ذكي وجاذب مثلي يمكن أن يحصل على نتائج إيجابية كاذبة إن لم يكن حذرًا.</p>
<h2 id="اختبار-أن-دالة-رمت-خطأ">اختبار أن دالة رمت خطأً</h2>
<p>دعني أُحدّث تلك القاعدة الأولى: الأخطاء <strong>غير الملتقطة</strong> ستؤدي إلى فشل الاختبار. لنعد إلى حالة اختبار فاشلة ونعمل من هناك.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">42</span>);
});
</code></pre>
<p>أجل، إنه يفشل ورسالة الخطأ تخبرنا بالسبب. لكننا نحاول اختبار أن مدخلًا زائفًا يسبّب خطأً، لا أن نُهيّئ أنفسنا لعالم تفشل فيه مجموعة اختباراتنا إلى أبد الآبدين.</p>
<p>لنجرّب استدعاء التابع <code>toThrow()</code>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)).<span class="hljs-title function_">toThrow</span>();
});
</code></pre>
<p>همم—لا يزال معطّلًا. هذا فرق دقيق صغير. استدعاء <code>stringToNumber</code> بـ<code>'foo'</code> سيرمي خطأً، لكننا لسنا مُهيّئين لالتقاطه. بدلًا من ذلك، علينا تغليفه في دالة. سيستدعي <code>expect</code> الدالة داخل كتلة <code>try</code>/<code>catch</code> نيابةً عنا ويخبرنا بما حدث.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)).<span class="hljs-title function_">toThrow</span>();
});
</code></pre>
<p>لا يزال بإمكاننا أن نحسّن. نعم. إذا أعطيته سلسلة نصية لا يمكن تحويلها بشكل معقول إلى عدد، فسيرمي خطأً. لكن هناك أسباب أخرى كثيرة لرمي شيء ما خطأً—ثق بي، أعرف ذلك من تجربة مباشرة.</p>
<p>يمكننا التحقّق من أنه يرمي الخطأ الذي نتوقّعه.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">\`&#x27;foo&#x27; cannot be parsed as a number.\`</span>);
});
</code></pre>
<p>قد أستخرج القيمة لأنها تُستخدم مرتين.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> value = <span class="hljs-string">&#x27;foo&#x27;</span>;
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(value)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">\`&#x27;<span class="hljs-subst">\${value}</span>&#x27; cannot be parsed as a number.\`</span>);
});
</code></pre>
<p>يمكنك أيضًا استخدام جزء من الرسالة أو تعبير نمطي إذا أردت فقط التأكّد من تطابق جزء واحد.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error if given a string that is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> value = <span class="hljs-string">&#x27;foo&#x27;</span>;
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(value)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;cannot be parsed as a number&#x27;</span>);
});
</code></pre>
<h2 id="اختبار-الحالات-الحدية">اختبار الحالات الحدّية</h2>
<p>الآن بعد أن غطّينا معالجة الأخطاء، لنُضف بعض الحالات الحدّية. الحالات الحدّية هي تلك السيناريوهات العجيبة التي <em>لن</em> تتوقّعها أبدًا، لكنك ستتعلّم قريبًا أنه <em>يجب</em> أن تتوقّعها دائمًا. جزء من هذا يتضمّن أن تضع قبّعة الخيال. وهذا يتعلّق حقًا بالاختبارات التي تكتبها وبالتنفيذ معًا.</p>
<p>من أعلى رأسي، إليك كل الأشياء التي <em>يمكن</em> أن أمرّرها:</p>
<ul>
<li><code>string</code></li>
<li><code>number</code></li>
<li><code>boolean</code></li>
<li><code>undefined</code></li>
<li><code>null</code></li>
<li><code>NaN</code></li>
<li>كائن</li>
<li>مصفوفة</li>
<li>دالة</li>
<li>وعد (promise)</li>
</ul>
<p>لكل واحد من هذه، لديك الخياران نفسهما:</p>
<ol>
<li>التعامل معها بلطف</li>
<li>رمي خطأ</li>
</ol>
<p>على سبيل المثال، يمكنك أن تقرّر ببساطة أن <code>true</code> و<code>false</code> مقبولان لأنهما سيُحوّلان إلى <code>1</code> و<code>0</code> على الترتيب. ويمكنك أن تقرّر أن العدد مقبول على ما أظن لأنه سيمرّ دون ضرر. في هذه الحالة، تحتاج على الأرجح إلى إعادة تسمية الدالة. وإلا، فسنحتاج على الأرجح إلى شرط آخر ورسالة خطأ، لأنه إن كانت نيتك أن الأعداد والقيم المنطقية سترمي خطأً—حسنًا، فإنها لن تفعل ذلك.</p>
<p>إذا <em>كنت</em> سترمي خطأً، فأنت مدين لنفسك في المستقبل برسائل خطأ جيدة. رسالة الخطأ الحالية لا تصف المشكلة حقًا، وفي قاعدة شيفرة كبيرة أكثر تعقيدًا، فإن <code>'[object Object]' cannot be parsed as a number</code> غير مفيدة على الإطلاق.</p>
<blockquote>
<p><strong>تمرين</strong></p>
<p>هل يمكنك إضافة اختبارات لبعض هذه الأنواع الأقل رغبة؟ ابدأ بالاختبار الفاشل قبل إضافة تحقّق آخر للحالة الحدّية المعنية.</p>
</blockquote>
<h3 id="المضي-أبعد">المضي أبعد</h3>
<p>هناك فئة أخرى من الوسائط التي <em>يمكن</em> أن نحاول رمي أخطاء لها: سلسلة نصية صالحة تمامًا، لكنها قد لا تكون ما نتوقّعه. على سبيل المثال، ماذا يحدث إذا كانت السلسلة سلسلة فارغة؟ (<strong>حرق المفاجأة</strong>: إنها <code>0</code>.) أو ماذا عن سلسلة كلها مسافات تقريبًا؟ لنُدخل تلك الحالات في المزيج ونرَ ما يحدث:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for empty strings&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;&#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Empty strings are not valid input&#x27;</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for strings with only spaces&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">stringToNumber</span>(<span class="hljs-string">&#x27;    &#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Empty strings are not valid input&#x27;</span>);
});
</code></pre>
<p>هنا نُدخل <strong>السلاسل الفارغة</strong> و<strong>السلاسل المملوءة بالمسافات</strong> إلى ساحة الاختبار. لا تهتم دالتك إن كان هناك هواء أو لا شيء خلف جزء من المدخل. يظل ذلك علامة تحذير، ونريد أن نتأكّد من أن اختباراتنا تلتقطها عند رفع تلك الأعلام.</p>
<p>الآن يمكن لخطئك أن يقول بالضبط ما حدث خطأ. رسائل خطأ مخصّصة: تُنقذ المطوّرين في كل مكان من حكّ رؤوس لا داعي له.</p>
<h2 id="خلاصات-حول-اختبار-الأخطاء-والحالات-الحدية">خلاصات حول اختبار الأخطاء والحالات الحدّية</h2>
<ul>
<li>توقّع أن تسوء الأمور—واختبر ذلك.</li>
<li>تعامل بلطف مع المدخلات غير المعقولة برسائل خطأ مخصّصة. سيشكرك مستقبلك—ومستخدموك.</li>
<li>ارمِ حالات حدّية جامحة على شيفرتك أثناء الاختبار. إن نجحت اختباراتك، فأنت تسير نحو بيئة إنتاج بقدر أكبر قليلًا من راحة البال.</li>
</ul>
<blockquote>
<p><strong>تمرين</strong></p>
<p>من المؤكد أن حسابنا الأساسي سيواجه وقتًا عصيبًا مماثلًا مع كل الطرق التي يمكن أن تنحرف بها الأعداد في JavaScript. هل يمكنك تحديث اختباراتنا وتنفيذنا لمراعاة ذلك؟ يمكنك رؤية بعض الحلول المحتملة—لكنها <em>بالتأكيد غير شاملة</em>—<a href="https://stevekinney.com/courses/testing/testing-for-errors-exercise">هنا</a>.</p>
</blockquote>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
