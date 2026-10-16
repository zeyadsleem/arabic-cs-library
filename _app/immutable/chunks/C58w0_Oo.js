const s="mooc",n="auxiliary",a="صفحات مساعدة",e="error_messages",t="رسائل الأخطاء الشائعة",r=[{depth:3,id:"ناتج-الطباعة-الخاص-بي-يبدو-مطابقا-تماما-للمثال-في-التعليمات-لكن-تقديمي-ما-زال-يفشل",text:"ناتج الطباعة الخاص بي يبدو مطابقًا تمامًا للمثال في التعليمات، لكنّ تقديمي ما زال يفشل"},{depth:3,id:"syntaxerror-إدخال-خاطئ-في-السطر-رقم-السطر",text:"SyntaxError: إدخال خاطئ في السطر [رقم السطر]"},{depth:3,id:"syntaxerror-المسافة-البادئة-في-السطر-رقم-السطر-لا-تطابق-أي-مستوى-بادئة-خارجي",text:"SyntaxError: المسافة البادئة في السطر [رقم السطر] لا تطابق أي مستوى بادئة خارجي"},{depth:3,id:"nameerror-الاسم-اسم-المتغير-غير-معرف-في-السطر-رقم-السطر",text:"NameError: الاسم [اسم المتغيّر] غير معرَّف في السطر [رقم السطر]"},{depth:3,id:"typeerror-نوع-أو-أنواع-المعامل-غير-مدعوم-في-عملية-الجمع-int-و-str-في-السطر-رقم-السطر",text:"TypeError: نوع (أو أنواع) المعامل غير مدعوم في عملية الجمع: 'int' و 'str' في السطر [رقم السطر]"},{depth:3,id:"typeerror-لا-يمكن-دمج-كائني-str-و-int-في-السطر-رقم-السطر",text:"TypeError: لا يمكن دمج كائنَي 'str' و 'int' في السطر [رقم السطر]"},{depth:3,id:"تعطل-pylance",text:"تعطّل Pylance"}],p=`<p>تتضمّن هذه الصفحة معلومات عن أشهر رسائل الأخطاء التي قد تصادفها عند إنجاز تمارين البرمجة في هذه الدورة.</p>
<h3 id="ناتج-الطباعة-الخاص-بي-يبدو-مطابقا-تماما-للمثال-في-التعليمات-لكن-تقديمي-ما-زال-يفشل">ناتج الطباعة الخاص بي يبدو مطابقًا تمامًا للمثال في التعليمات، لكنّ تقديمي ما زال يفشل</h3>
<p>تأكّد من أن برنامجك لا يطبع أي مسافات بيضاء زائدة، مثل محارف المسافة. ولاحظ أن السلوك الافتراضي للدالة <code>print</code> هو إضافة مسافة بين أي سلسلتين نصيتين يفصل بينهما فاصلة.</p>
<pre><code class="language-python">    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>,<span class="hljs-string">&quot;World!&quot;</span>)    <span class="hljs-comment"># This prints out: Hello World!</span>
</code></pre>
<h3 id="syntaxerror-إدخال-خاطئ-في-السطر-رقم-السطر">SyntaxError: إدخال خاطئ في السطر [رقم السطر]</h3>
<p>تظهر رسالة الخطأ هذه عادةً عندما تحتوي شيفرتك على خطأ مطبعي يصعب على مُفسِّر Python تصنيفه بدقة أكبر. فمثلًا، قد ينقص محرف النقطتين في نهاية جملة <code>if</code>، أو قد تكون كلمة مفتاحية مثل <code>while</code> قد كُتبت خطأً. الطريقة الوحيدة لإصلاح هذه المشكلة هي فحص السطر المشار إليه في رسالة الخطأ.</p>
<pre><code class="language-python">    number1 = <span class="hljs-number">1</span>
    number1 = <span class="hljs-number">2</span>
    <span class="hljs-keyword">if</span> number1 &lt; number2    <span class="hljs-comment"># &#x27;:&#x27; missing</span>
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;number2 is greater&#x27;</span>)
</code></pre>
<p>إذا بدا السطر المشار إليه في رسالة الخطأ صحيحًا، فغالبًا يكون الخطأ في السطر الذي يعلوه أو يليه بسطر واحد، لذا افحص المنطقة المحيطة بالمشكلة أيضًا.</p>
<p><strong>ملاحظة: تمارين البرمجة في الأجزاء الأولى من هذه الدورة تستخدم إطارًا اسمه Skulpt لتشغيل شيفرة Python في المتصفّح.</strong> وSkulpt محدود جدًا مقارنةً بمُفسِّر Python الاعتيادي، لذا فإن رسائل الأخطاء المطبوعة غالبًا ما تكون أقلّ إفادة. فمثلًا، قد تشير رسالة الخطأ <code>bad input on line</code> إلى أخطاء برمجية مختلفة كثيرة، ويصعب معرفة السبب الحقيقي للخطأ بالاعتماد على هذه الرسالة وحدها.</p>
<h3 id="syntaxerror-المسافة-البادئة-في-السطر-رقم-السطر-لا-تطابق-أي-مستوى-بادئة-خارجي">SyntaxError: المسافة البادئة في السطر [رقم السطر] لا تطابق أي مستوى بادئة خارجي</h3>
<p>شيفرتك مسنودة بمسافة بادئة غير صحيحة في السطر المشار إليه في رسالة الخطأ. فمثلًا، يجب أن تكون جميع الأسطر داخل كتلة <code>if</code> مسنودة بالمسافة نفسها. ولإصلاح هذا الخطأ، اسند جميع الأسطر داخل كتلة الشيفرة بعدد المسافات البيضاء نفسه تمامًا.
وفي ما يلي شيفرة من شأنها أن تسبّب هذا الخطأ:</p>
<pre><code class="language-python">    <span class="hljs-keyword">if</span> <span class="hljs-literal">True</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Indented correctly&#x27;</span>)
       <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Indented incorrectly!&#x27;</span>)
</code></pre>
<h3 id="nameerror-الاسم-اسم-المتغير-غير-معرف-في-السطر-رقم-السطر">NameError: الاسم [اسم المتغيّر] غير معرَّف في السطر [رقم السطر]</h3>
<p>أنت تحاول الإشارة إلى متغيّر أو كائن غير موجود في تلك النقطة تحديدًا من برنامجك. قد يكون المتغيّر لم يُسنَد إليه قيمة بعد، أو قد يكون في اسم المتغيّر خطأ مطبعي. وقد يكون الأمر أيضًا أنك عرّفت متغيّرًا داخل دالة وتحاول الإشارة إلى المتغيّر نفسه خارج تلك الدالة.</p>
<pre><code class="language-python">    person = <span class="hljs-built_in">input</span>(<span class="hljs-string">&#x27;Please type in your name: &#x27;</span>)
    <span class="hljs-built_in">input</span>(<span class="hljs-string">&#x27;Please type in your age: &#x27;</span>)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, pearson)                <span class="hljs-comment"># error: person was typed pearson</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You are&quot;</span>, age, <span class="hljs-string">&quot;years old&quot;</span>)  <span class="hljs-comment"># error: the variable age has not been defined</span>
</code></pre>
<h3 id="typeerror-نوع-أو-أنواع-المعامل-غير-مدعوم-في-عملية-الجمع-int-و-str-في-السطر-رقم-السطر">TypeError: نوع (أو أنواع) المعامل غير مدعوم في عملية الجمع: 'int' و 'str' في السطر [رقم السطر]</h3>
<p>قد تكون تحاول جمع عدد صحيح وسلسلة نصية معًا، من دون تحويل السلسلة النصية أولًا إلى قيمة عدد صحيح. ويمكن تحويل السلاسل النصية إلى أعداد صحيحة باستخدام الدالة <code>int()</code>. وقد تظهر رسالة خطأ مشابهة إذا حاولت تنفيذ عمليات حسابية أخرى، مثل القسمة أو الطرح، على السلاسل النصية.</p>
<p>قد يكون الأمر أيضًا أنك تحاول إنشاء سلسلة نصية جديدة بدمج سلسلة نصية مع عدد صحيح. ينبغي أن تحوّل أولًا العدد الصحيح إلى سلسلة نصية باستخدام الدالة <code>str()</code>.</p>
<pre><code class="language-python">    my_age = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your age: &quot;</span>)
    my_name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your name: &quot;</span>)

    <span class="hljs-built_in">print</span>(my_age//<span class="hljs-number">2</span>)   <span class="hljs-comment"># error: the variable my_age has not been converted into an integer</span>
</code></pre>
<h3 id="typeerror-لا-يمكن-دمج-كائني-str-و-int-في-السطر-رقم-السطر">TypeError: لا يمكن دمج كائنَي 'str' و 'int' في السطر [رقم السطر]</h3>
<p>انظر أعلاه.</p>
<h3 id="تعطل-pylance">تعطّل Pylance</h3>
<p>عادةً ما يحدث هذا عندما تكون إضافة TMC قد فتحت عددًا كبيرًا جدًا من التمارين في الوقت نفسه. يمكنك محاولة إغلاق التمارين غير المستخدمة من قائمة TMC الموجودة في الشريط الجانبي لـ VS code.
افتح قائمة TMC، ثم اختر &quot;دوراتي&quot; (my courses)، وافتح الدورات التي لديك، ثم انقر على &quot;إغلاق الكل&quot; (close all) في الأجزاء التي لم تعد تعمل عليها.
يمكنك دائمًا إعادة فتح التمارين إذا قرّرت العودة إلى ذلك الجزء.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:r,html:p};export{s as book,n as chapter,a as chapterTitle,l as default,r as headings,p as html,e as slug,t as title};
