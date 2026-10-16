const n="mooc",s="part-3",e="الجزء 3: الحلقات",p="2-working-with-strings",a="العمل مع السلاسل النصية",t=[{depth:2,id:"عمليات-السلاسل-النصية",text:"عمليات السلاسل النصية"},{depth:2,id:"طول-السلسلة-النصية-وفهرسها",text:"طول السلسلة النصية وفهرسها"},{depth:2,id:"indexerror-فهرس-السلسلة-النصية-خارج-النطاق",text:"IndexError: فهرس السلسلة النصية خارج النطاق"},{depth:2,id:"السلاسل-الفرعية-والشرائح",text:"السلاسل الفرعية والشرائح"},{depth:2,id:"البحث-عن-السلاسل-الفرعية",text:"البحث عن السلاسل الفرعية"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستتمكّن من استخدام المشغّلَين <code>+</code> و<code>*</code> مع السلاسل النصية</li>
<li>ستعرف كيف تجد طول سلسلة نصية</li>
<li>ستعرف ما المقصود بفهرسة السلاسل النصية</li>
<li>ستعرف كيف تبحث عن السلاسل الفرعية داخل سلسلة نصية</li>
</ul>
</blockquote>
<h2 id="عمليات-السلاسل-النصية">عمليات السلاسل النصية</h2>
<p>يمكن دمج السلاسل النصية، أو <em>دمجها معًا</em> (<em>concatenating</em>)، بواسطة المشغّل <code>+</code>:</p>
<pre><code class="language-python">begin = <span class="hljs-string">&quot;ex&quot;</span>
end = <span class="hljs-string">&quot;ample&quot;</span>
word = begin+end
<span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>example
</code></pre>
<p>ويمكن أيضًا استخدام المشغّل <code>*</code> مع سلسلة نصية عندما يكون الطرف الآخر عددًا صحيحًا. عندئذٍ تُكرَّر السلسلة النصية بقدر المرات الذي يحدده ذلك العدد. فمثلًا، سيعمل هذا:</p>
<pre><code class="language-python">word = <span class="hljs-string">&quot;banana&quot;</span>
<span class="hljs-built_in">print</span>(word*<span class="hljs-number">3</span>)
</code></pre>
<pre><code>bananabananabanana
</code></pre>
<p>وباستخدام عمليات السلاسل النصية مع حلقة، يمكننا كتابة برنامج يرسم هرمًا:</p>
<pre><code class="language-python">n = <span class="hljs-number">10</span> <span class="hljs-comment"># number of layers in the pyramid</span>
row = <span class="hljs-string">&quot;*&quot;</span>

<span class="hljs-keyword">while</span> n &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; &quot;</span> * n + row)
    row += <span class="hljs-string">&quot;**&quot;</span>
    n -= <span class="hljs-number">1</span>
</code></pre>
<p>يطبع هذا ما يلي:</p>
<pre><code class="language-x">          *
         ***
        *****
       *******
      *********
     ***********
    *************
   ***************
  *****************
 *******************
</code></pre>
<p>يطبع الأمر <code>print</code> داخل الحلقة سطرًا يبدأ بـ<code>n</code> محارف مسافة، ثم يليه ما هو مخزّن في المتغيّر <code>row</code>. ثم تُضاف نجمتان إلى نهاية المتغيّر <code>row</code>، وتُنقص قيمة المتغيّر <code>n</code> بمقدار 1.</p>
<blockquote>
<p><strong>تمرين تفاعلي: سلسلة نصية مضروبة</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلة نصية ومقدارًا. ثم يطبع البرنامج السلسلة النصية بقدر المرات الذي يحدده المقدار. وينبغي أن يكون المخرَج كله في سطر واحد، دون إضافة أي مسافات أو رموز زائدة.</p>
</blockquote>
<p>مثال على السلوك المتوقَّع:</p>
<pre><code>Please type in a string: **hiya**
Please type in an amount: **4**
hiyahiyahiyahiya
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="طول-السلسلة-النصية-وفهرسها">طول السلسلة النصية وفهرسها</h2>
<p>تعيد الدالة <code>len</code> عدد المحارف في السلسلة النصية، وهو قيمة عدد صحيح دائمًا. فمثلًا، تعيد <code>len(&quot;hey&quot;)</code> العدد 3، لأن في السلسلة النصية <code>hey</code> ثلاثة محارف.</p>
<p>يطلب البرنامج التالي من المستخدم سلسلة نصية ثم يطبعها «مشطوبة». ويطبع البرنامج سطرًا ثانيًا بعدد من محارف <code>-</code> يساوي طول المُدخَل:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(input_string)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span>*<span class="hljs-built_in">len</span>(input_string))
</code></pre>
<pre><code>Hi there!
---------
</code></pre>
<p>يشمل طول السلسلة النصية جميع المحارف الموجودة فيها، بما في ذلك محارف المسافات الفارغة. فمثلًا، طول السلسلة النصية <code>bye bye</code> هو 7.</p>
<blockquote>
<p><strong>تمرين تفاعلي: السلسلة النصية الأطول</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلتين نصيتين ثم يطبع أيّهما أطول - أي التي تحتوي على محارف أكثر. وإذا كانت السلسلتان متساويتين في الطول، فينبغي للبرنامج أن يطبع &quot;The strings are equally long&quot;.</p>
</blockquote>
<p>بعض الأمثلة على السلوك المتوقَّع:</p>
<pre><code>Please type in string 1: **hey**
Please type in string 2: **hiya**
hiya is longer
</code></pre>
<pre><code>Please type in string 1: **howdy doody**
Please type in string 2: **hola**
howdy doody is longer
</code></pre>
<pre><code>Please type in string 1: **hey**
Please type in string 2: **bye**
The strings are equally long
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<p>ولأن السلاسل النصية هي في جوهرها تتابعات من المحارف، فبإمكانك أيضًا استرجاع أي محرف منفرد في السلسلة النصية. فالمشغّل <code>[]</code> يجد المحرف الذي له الـ_فهرس_ (<em>index</em>) المحدَّد بين الأقواس المربّعة.</p>
<p>يشير الفهرس إلى موضع في السلسلة النصية، ويُعدّ بدءًا من الصفر. فالمحرف الأول في السلسلة النصية فهرسه 0، والمحرف الثاني فهرسه 1، وهكذا.</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_2_1.png" alt="3_2_1.png"></p>
<p>فمثلًا، هذا البرنامج</p>
<pre><code class="language-python">
input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">3</span>])

</code></pre>
<p>سيطبع ما يلي:</p>
<pre><code>Please type in a string: **monkey**
m
o
k
</code></pre>
<p>ولأن المحرف الأول في السلسلة النصية فهرسه 0، فإن المحرف الأخير فهرسه <em>الطول - 1</em>. ويطبع البرنامج التالي المحرفَ الأول والمحرفَ الأخير لسلسلة نصية:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;First character: &quot;</span> + input_string[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Last character: &quot;</span> + input_string[<span class="hljs-built_in">len</span>(input_string) - <span class="hljs-number">1</span>])
</code></pre>
<pre><code>Please type in a string: **testing**
First character: t
Last character: g
</code></pre>
<p>يدور البرنامج التالي على جميع محارف السلسلة النصية من الأول إلى الأخير:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
index = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> index &lt; <span class="hljs-built_in">len</span>(input_string):
    <span class="hljs-built_in">print</span>(input_string[index])
    index += <span class="hljs-number">1</span>
</code></pre>
<pre><code>Please type in a string: **test**
t
e
s
t
</code></pre>
<p>ويمكنك أيضًا استخدام الفهرسة السالبة للوصول إلى المحارف بدءًا من نهاية السلسلة النصية. فالمحرف الأخير في السلسلة النصية فهرسه -1، والمحرف الذي يسب الأخير فهرسه -2، وهكذا. ويمكنك أن تنظر إلى <code>input_string[-1]</code> على أنها صيغة مختصرة لـ <code>input_string[len(input_string) - 1]</code>.</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_2_2.png" alt="3_2_2.png"></p>
<p>ويمكن تبسيط المثال السابق باستخدام الفهرسة السالبة:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;First character: &quot;</span> + input_string[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Last character: &quot;</span> + input_string[-<span class="hljs-number">1</span>])
</code></pre>
<pre><code>Please type in a string: **testing**
First character: t
Last character: g
</code></pre>
<h2 id="indexerror-فهرس-السلسلة-النصية-خارج-النطاق">IndexError: فهرس السلسلة النصية خارج النطاق</h2>
<p>إذا جرّبت الأمثلة أعلاه بنفسك، فقد تكون صادفت رسالة الخطأ <em>IndexError: string index out of range</em>. ويظهر هذا الخطأ إذا حاولت الوصول إلى فهرس غير موجود في السلسلة النصية.</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The tenth character: &quot;</span> + input_string[<span class="hljs-number">9</span>])
</code></pre>
<pre><code>Please type in a string: **introduction to programming**
The tenth character: i
</code></pre>
<pre><code>Please type in a string: **python**

Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;
IndexError: string index out of range
</code></pre>
<p>أحيانًا يكون خطأ الفهرسة ناتجًا عن خلل في الشيفرة. فمثلًا، من الشائع جدًا أن تُفرط في الفهرسة عند محاولة الوصول إلى المحرف الأخير في سلسلة نصية:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Last character: &quot;</span> + input_string[<span class="hljs-built_in">len</span>(input_string)])
</code></pre>
<p>ولأن فهرسة السلاسل النصية تبدأ من الصفر، فإن المحرف الأخير فهرسه <code>len(input_string) - 1</code> وليس <code>len(input_string)</code>.</p>
<p>وهناك حالات ينبغي فيها للبرنامج أن يستعدّ للأخطاء الناتجة عن مُدخَل المستخدم:</p>
<pre><code class="language-python">input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(input_string) &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;First character: &quot;</span> + input_string[<span class="hljs-number">0</span>])
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The input string is empty. There is no first character.&quot;</span>)
</code></pre>
<p>في المثال أعلاه، لو لم يكن المبرمج قد أدرج فحصًا لطول سلسلة المُدخَل النصية، لأسفرت سلسلة نصية طولها صفر عن خطأ. وتُسمّى السلسلة النصية التي طولها صفر أيضًا السلسلة النصية الفارغة (<em>empty string</em>)، ويمكن الحصول عليها هنا بالضغط على Enter عند مُوجّه الإدخال.</p>
<blockquote>
<p><strong>تمرين تفاعلي: من النهاية إلى البداية</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلة نصية. ثم يطبع البرنامج سلسلة المُدخَل بالترتيب المعكوس، من النهاية إلى البداية. وينبغي أن يكون كل محرف في سطر منفصل.</p>
</blockquote>
<p>مثال على السلوك المتوقَّع:</p>
<pre><code>Please type in a string: **hiya**
a
y
i
h
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المحرف الثاني والمحرف الذي يسب الأخير</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلة نصية. ثم يطبع البرنامج رسالة بناءً على ما إذا كان المحرف الثاني والمحرف الذي يسب الأخير متطابقين أم لا. انظر الأمثلة أدناه.</p>
</blockquote>
<pre><code>Please type in a string: **python**
The second and the second to last characters are different
</code></pre>
<pre><code>Please type in a string: **pascal**
The second and the second to last characters are a
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: سطر من محارف <code>#</code></strong></p>
<p>يُرجى كتابة برنامج يطبع سطرًا من محارف <code>#</code> يختار المستخدم عرضه.</p>
</blockquote>
<pre><code>###
</code></pre>
<pre><code>########
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: مستطيل من محارف <code>#</code></strong></p>
<p>يُرجى تعديل البرنامج السابق بحيث يطلب الارتفاع أيضًا، ويطبع مستطيلًا من محارف <code>#</code> بناءً على ذلك.</p>
</blockquote>
<pre><code>Width: **10**
Height: **3**
##########
##########
##########
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: التشطيب</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلاسل نصية باستخدام حلقة. ويطبع البرنامج كل سلسلة نصية مشطوبة كما هو مبيّن في الأمثلة أدناه. وينتهي التنفيذ حين يدخل المستخدم سلسلة نصية فارغة - أي حين يضغط Enter عند المُوجّه فقط.</p>
</blockquote>
<pre><code>Hi there!
---------
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: محاذاة إلى اليمين</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلة نصية ثم يطبعها بحيث يُعرَض بالضبط 20 محرفًا. فإذا كان المُدخَل أقصر من 20 محرفًا، فإن بداية السطر تُملأ بمحارف <code>*</code>.</p>
</blockquote>
<p>يمكنك افتراض أن سلسلة المُدخَل النصية طولها 20 محرفًا على الأكثر.</p>
<pre><code>**************python
</code></pre>
<pre><code>*******alongerstring
</code></pre>
<pre><code>*averyverylongstring
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: كلمة داخل إطار</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سلسلة نصية ثم يطبع إطارًا من محارف <code>*</code> تتوسّطه الكلمة. وينبغي أن يكون عرض الإطار 30 محرفًا. ويمكنك افتراض أن سلسلة المُدخَل النصية ستأخذ مكانها دائمًا داخل الإطار.</p>
</blockquote>
<p>وإذا كان طول سلسلة المُدخَل النصية عددًا فرديًا، فيجوز لك أن تطبع الكلمة في أيٍّ من موضعي المنتصف الممكنين.</p>
<pre><code>******************************
*          testing           *
******************************
</code></pre>
<pre><code>******************************
*           python           *
******************************
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="السلاسل-الفرعية-والشرائح">السلاسل الفرعية والشرائح</h2>
<p>السلسلة الفرعية (<em>substring</em>) من سلسلة نصية هي تتابع من المحارف يشكّل جزءًا من تلك السلسلة النصية. فمثلًا، تحتوي السلسلة النصية <code>example</code> على السلاسل الفرعية <code>exam</code> و<code>amp</code> و<code>ple</code> وغيرها. وفي برمجة Python، تُسمّى عملية اختيار السلاسل الفرعية عادةً <em>التقطيع</em> (<em>slicing</em>)، وكثيرًا ما تُشار إلى السلسلة الفرعية بأنها <em>شريحة</em> (<em>slice</em>) من السلسلة النصية. ويمكن استخدام المصطلحين في أغلب الأحيان بشكل متبادل.</p>
<p>إذا كنت تعرف فهرسي بداية الشريحة ونهايتها التي تريد استخراجها، فيمكنك فعل ذلك باستخدام الترميز <code>[a:b]</code>. وهذا يعني أن الشريحة تبدأ عند الفهرس <code>a</code> وتنتهي عند آخر محرف قبل الفهرس <code>b</code> - أي أنها تضم الأول وتستثني الأخير. ويمكنك أن تتخيّل الفهارس كخطوط فاصلة مرسومة على الجانب الأيسر من المحرف المُفهرَس، كما هو موضَّح في الصورة أدناه:</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_2_3.png" alt="3_2_3.png"></p>
<p>فلننظر عن قرب إلى بعض السلاسل النصية المقطَّعة:</p>
<pre><code class="language-python">input_string = <span class="hljs-string">&quot;presumptious&quot;</span>

<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">0</span>:<span class="hljs-number">3</span>])
<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">4</span>:<span class="hljs-number">10</span>])

<span class="hljs-comment"># if the beginning index is left out, it defaults to 0</span>
<span class="hljs-built_in">print</span>(input_string[:<span class="hljs-number">3</span>])

<span class="hljs-comment"># if the end index is left out, it defaults to the length of the string</span>
<span class="hljs-built_in">print</span>(input_string[<span class="hljs-number">4</span>:])
</code></pre>
<pre><code>pre
umptio
pre
umptious
</code></pre>
<blockquote>
<p><strong>الفترات نصف المفتوحة</strong></p>
<p>في معالجة السلاسل النصية في Python، الفترة <code>[a:b]</code> <em>نصف مفتوحة</em> (<em>half open</em>)، وهذا يعني في هذه الحالة أن المحرف عند فهرس البداية <code>a</code> مُضمَّن في الفترة، بينما المحرف عند فهرس النهاية <code>b</code> مُستثنى منها. ولماذا ذلك؟</p>
<p>لا يوجد سبب عميق لهذه الميزة. إنها بالأحرى عُرف متوارث من لغات برمجة أخرى.</p>
<p>قد تبدو الفترات نصف المفتوحة غير بديهية، لكنها في الواقع تتمتّع ببعض المزايا. فمثلًا، يمكنك بسهولة حساب طول الشريحة بـ<code>b-a</code>. ومن الجهة الأخرى، عليك دائمًا أن تتذكّر أن المحرف عند فهرس النهاية <code>b</code> لن يكون مُضمَّنًا في الشريحة.</p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: السلاسل الفرعية، الجزء 1</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال سلسلة نصية. ثم يطبع البرنامج جميع السلاسل الفرعية التي تبدأ بالمحرف الأول، من الأقصر إلى الأطول. انظر المثال أدناه.</p>
</blockquote>
<pre><code>Please type in a string: **test**
t
te
tes
test
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: السلاسل الفرعية، الجزء 2</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال سلسلة نصية. ثم يطبع البرنامج جميع السلاسل الفرعية التي تنتهي بالمحرف الأخير، من الأقصر إلى الأطول. انظر المثال أدناه.</p>
</blockquote>
<pre><code>Please type in a string: **test**
t
st
est
test
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="البحث-عن-السلاسل-الفرعية">البحث عن السلاسل الفرعية</h2>
<p>يمكن للمشغّل <code>in</code> أن يخبرنا ما إذا كانت سلسلة نصية تحتوي على سلسلة فرعية معيّنة. فالتعبير المنطقي <code>a in b</code> يكون صحيحًا إذا كانت <code>b</code> تحتوي على السلسلة الفرعية <code>a</code>.</p>
<p>فمثلًا، فإن هذه القطعة من الشيفرة</p>
<pre><code class="language-python">input_string = <span class="hljs-string">&quot;test&quot;</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;t&quot;</span> <span class="hljs-keyword">in</span> input_string)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;x&quot;</span> <span class="hljs-keyword">in</span> input_string)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;es&quot;</span> <span class="hljs-keyword">in</span> input_string)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ets&quot;</span> <span class="hljs-keyword">in</span> input_string)
</code></pre>
<p>تطبع ما يلي:</p>
<pre><code>True
False
True
False
</code></pre>
<p>يتيح البرنامج التالي للمستخدم البحث عن سلاسل فرعية داخل سلسلة نصية مُرمَّزة ثابتًا في البرنامج:</p>
<pre><code class="language-python">input_string = <span class="hljs-string">&quot;perpendicular&quot;</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    substring = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What are you looking for? &quot;</span>)
    <span class="hljs-keyword">if</span> substring <span class="hljs-keyword">in</span> input_string:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Found it&quot;</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Not found&quot;</span>)
</code></pre>
<pre><code>What are you looking for? **perp**
Found it
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it
...
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: هل تحتوي على حروف العلة</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال سلسلة نصية. ثم يطبع البرنامج رسائل مختلفة إذا كانت السلسلة النصية تحتوي على أيٍّ من حروف العلة a أو e أو o.</p>
</blockquote>
<p>يمكنك افتراض أن المُدخَل سيكون بأحرف صغيرة بالكامل. انظر الأمثلة أدناه.</p>
<pre><code>Please type in a string: **hello there**
a not found
e found
o found
</code></pre>
<pre><code>Please type in a string: **hiya**
a found
e not found
o not found
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<p>يعيد المشغّل <code>in</code> قيمة منطقية، لذا فإنه لا يخبرنا سوى <em>بما إذا</em> كانت هناك سلسلة فرعية داخل سلسلة نصية، لكنه لا يكون مفيدًا في تحديد <em>مكانها</em> بالضبط. وبدلًا من ذلك، يمكن استخدام تابع السلاسل النصية <code>find</code> في Python لهذا الغرض. وهو يأخذ السلسلة الفرعية المُبحَث عنها وسيطًا، ويعيد إمّا أول فهرس وُجدت عنده أو <code>-1</code> إذا لم تُعثر على السلسلة الفرعية داخل السلسلة النصية.</p>
<p>توضّح الصورة التالية كيف يُستخدم:</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_2_4.png" alt="3_2_4.png"></p>
<p>بعض أمثلة استخدام <code>find</code>:</p>
<pre><code class="language-python">input_string = <span class="hljs-string">&quot;test&quot;</span>

<span class="hljs-built_in">print</span>(input_string.find(<span class="hljs-string">&quot;t&quot;</span>))
<span class="hljs-built_in">print</span>(input_string.find(<span class="hljs-string">&quot;x&quot;</span>))
<span class="hljs-built_in">print</span>(input_string.find(<span class="hljs-string">&quot;es&quot;</span>))
<span class="hljs-built_in">print</span>(input_string.find(<span class="hljs-string">&quot;ets&quot;</span>))
</code></pre>
<pre><code>0
-1
1
-1
</code></pre>
<p>مثال البحث عن السلاسل الفرعية أعلاه مُنفَّذًا باستخدام <code>find</code>:</p>
<pre><code class="language-python">input_string = <span class="hljs-string">&quot;perpendicular&quot;</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    substring = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What are you looking for? &quot;</span>)
    index = input_string.find(substring)
    <span class="hljs-keyword">if</span> index &gt;= <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found it at the index <span class="hljs-subst">{index}</span>&quot;</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Not found&quot;</span>)
</code></pre>
<pre><code>What are you looking for? **perp**
Found it at the index 0
What are you looking for? **abc**
Not found
What are you looking for? **pen**
Found it at the index 3
...
</code></pre>
<blockquote>
<p><strong>التوابع</strong></p>
<p>استخدمنا أعلاه تابع السلسلة النصية <code>find</code>. وتعمل التوابع بطريقة مشابهة إلى حدٍّ كبير للدوال (functions) التي تناولناها في الجزء السابق. وما يميّزها عن الدوال أن التوابع مرتبطة دائمًا بـ_الكائن_ الذي تُستدعى عليه. والكائن هو الشيء المُسمّى قبل اسم التابع في استدعاءه. وفي حالة <code>find</code> يكون الكائن هو السلسلة النصية التي يبحث فيها التابع عن السلسلة الفرعية المُمرَّرة إليه كوسيط.</p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: أوجد السلسلة الفرعية الأولى</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال سلسلة نصية ومحرف واحد. ثم يطبع البرنامج شريحة المحارف الثلاثة الأولى التي تبدأ بالمحرف الذي يحدده المستخدم. ويمكنك افتراض أن سلسلة المُدخَل النصية طولها ثلاثة محارف على الأقل. ويجب أن يطبع البرنامج ثلاثة محارف، أو لا يطبع شيئًا على الإطلاق.</p>
</blockquote>
<p>انتبه بصفة خاصة إلى الحالة التي يتبقّى فيها أقل من محرفين في السلسلة النصية بعد أول ظهور للمحرف المُبحَث عنه. في هذه الحالة لا ينبغي طباعة شيء، ولا ينبغي أن تحدث أي أخطاء في الفهرسة أثناء تنفيذ البرنامج.</p>
<pre><code>Please type in a word: **mammoth**
Please type in a character: **m**
mam
</code></pre>
<pre><code>Please type in a word: **banana**
Please type in a character: **n**
nan
</code></pre>
<pre><code>Please type in a word: **tomato**
Please type in a character: **x**
</code></pre>
<pre><code>Please type in a word: **python**
Please type in a character: **n**
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: أوجد جميع السلاسل الفرعية</strong></p>
<p>يُرجى إنشاء نسخة موسَّعة من البرنامج السابق، تطبع <em>جميع السلاسل الفرعية التي يبلغ طولها ثلاثة محارف على الأقل</em> والتي تبدأ بالمحرف الذي يحدده المستخدم. ويمكنك افتراض أن سلسلة المُدخَل النصية طولها ثلاثة محارف على الأقل.</p>
</blockquote>
<pre><code>Please type in a word: **mammoth**
Please type in a character: **m**
mam
mmo
mot
</code></pre>
<pre><code>Please type in a word: **banana**
Please type in a character: **n**
nan
</code></pre>
<p><strong>تلميح</strong> قد يمنحك المثال التالي بعض الإلهام حول كيفية معالجة هذا التمرين:</p>
<pre><code class="language-python">word = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Word: &quot;</span>)
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(word) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-built_in">print</span>(word)
    word = word[<span class="hljs-number">2</span>:]
</code></pre>
<pre><code>Word: **mammoth**
mammoth
mmoth
oth
h
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الظهور الثاني</strong></p>
<p>يُرجى كتابة برنامج يجد <em>الظهور الثاني</em> لسلسلة فرعية. وإذا لم يكن هناك ظهور ثانٍ (أو أول)، فينبغي للبرنامج أن يطبع رسالة تصف ذلك.</p>
</blockquote>
<p>في هذا التمرين لا يمكن أن يتداخل الظهوران. فمثلًا، في السلسلة النصية <code>aaaa</code> يقع الظهور الثاني للسلسلة الفرعية <code>aa</code> عند الفهرس 2.</p>
<p>بعض الأمثلة على السلوك المتوقَّع:</p>
<pre><code>Please type in a string: **abcabc**
Please type in a substring: **ab**
The second occurrence of the substring is at index 3.
</code></pre>
<pre><code>Please type in a string: **methodology**
Please type in a substring: **o**
The second occurrence of the substring is at index 6.
</code></pre>
<pre><code>Please type in a string: **aybabtu**
Please type in a substring: **ba**
The substring does not occur twice in the string.
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6bfa7eab-80de-52e2-afe5-285af914099f)

-->
`,l={book:n,chapter:s,chapterTitle:e,slug:p,title:a,headings:t,html:o};export{n as book,s as chapter,e as chapterTitle,l as default,t as headings,o as html,p as slug,a as title};
