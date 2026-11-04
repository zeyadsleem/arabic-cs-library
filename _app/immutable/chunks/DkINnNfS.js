const s="ocaml-manual",a="ch06",n="تعدّد الأشكال وحدوده",l="index",p="تعدّد الأشكال وحدوده",e=[{depth:2,id:"61-ضعف-تعدد-الأشكال-والتحوير",text:"6.1 ضعف تعدّد الأشكال والتحوير"},{depth:3,id:"611-الأنواع-ضعيفة-تعدد-الأشكال",text:"6.1.1 الأنواع ضعيفة تعدّد الأشكال"},{depth:3,id:"612-قيد-القيمة",text:"6.1.2 قيد القيمة"},{depth:3,id:"613-قيد-القيمة-المخفف",text:"6.1.3 قيد القيمة المخفَّف"},{depth:3,id:"614-التغاير-وقيد-القيمة",text:"6.1.4 التغاير وقيد القيمة"},{depth:3,id:"615-الأنواع-البيانية-المجردة",text:"6.1.5 الأنواع البيانية المجرّدة"},{depth:2,id:"62-العودية-متعددة-الأشكال",text:"6.2 العودية متعدّدة الأشكال"},{depth:3,id:"621-التعليقات-متعددة-الأشكال-الصريحة",text:"6.2.1 التعليقات متعدّدة الأشكال الصريحة"},{depth:3,id:"622-أمثلة-أخرى",text:"6.2.2 أمثلة أخرى"},{depth:2,id:"63-الدوال-متعددة-الأشكال-عالية-الرتبة",text:"6.3 الدوال متعدّدة الأشكال عالية الرتبة"}],c=`<h1>الفصل 6: تعدّد الأشكال وحدوده</h1>
<p>يتناول هذا الفصل مسائل أكثر تقدّمًا تتعلّق بحدود الدوال والأنواع متعدّدة الأشكال. فهناك حالات في OCaml قد يكون فيها النوع الذي يستنتجه مدقّق الأنواع أقل عموميةً مما هو متوقّع. وقد ينشأ هذا النقص في العمومية إمّا من التفاعلات بين الآثار الجانبية والتنميط، أو من صعوبات العودية متعدّدة الأشكال الضمنية وتعدّد الأشكال عالي الرتبة.</p>
<p>ويفصّل هذا الفصل كلًّا من هذه الحالات، ويبيّن — حيثما أمكن — كيفية استعادة العمومية.</p>
<h2 id="61-ضعف-تعدد-الأشكال-والتحوير">6.1 ضعف تعدّد الأشكال والتحوير</h2>
<h3 id="611-الأنواع-ضعيفة-تعدد-الأشكال">6.1.1 الأنواع ضعيفة تعدّد الأشكال</h3>
<p>لعلّ أكثر أمثلة النقص في العمومية شيوعًا تنشأ من التفاعلات بين الأنواع متعدّدة الأشكال والتحوير. ويظهر مثال بسيط عند تنميط التعبير التالي:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> store = <span class="hljs-built_in">ref</span> <span class="hljs-type">None</span> ;;

<span class="hljs-keyword">val</span> store : <span class="hljs-symbol">&#x27;_weak1</span> option <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-type">None</span>}
</code></pre>
<p>بما أن نوع <code>None</code> هو <code>'a option</code> وللدالة <code>ref</code> النوع <code>'b -&gt; 'b ref</code>، فإن الاستنتاج الطبيعي لنوع <code>store</code> سيكون <code>'a option ref</code>. غير أنّ النوع المستنتج، <code>'_weak1 option ref</code>، مختلف. إنّ متغيّرات النوع التي تبدأ أسماؤها بالسابقة <code>_weak</code> مثل <code>'_weak1</code> هي متغيّرات نوع ضعيفة التعدّد، ويُختصر اسمها أحيانًا إلى «متغيّرات النوع الضعيفة». ومتغيّر النوع الضعيف هو عنصر نائب عن نوع واحد غير معروف حاليًا. فحين يُعرف النوع المحدّد <code>t</code> الكامن وراء النوع النائب <code>'_weak1</code>، تُستبدل جميع ورادات <code>'_weak1</code> بـ <code>t</code>. ويمكننا، مثلًا، تعريف مرجع اختياري آخر وتخزين قيمة من النوع <code>int</code> داخله:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> another_store = <span class="hljs-built_in">ref</span> <span class="hljs-type">None</span> ;;

<span class="hljs-keyword">val</span> another_store : <span class="hljs-symbol">&#x27;_weak2</span> option <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-type">None</span>}

# another_store := <span class="hljs-type">Some</span> <span class="hljs-number">0</span>;
  another_store ;;

- : <span class="hljs-built_in">int</span> option <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-type">Some</span> <span class="hljs-number">0</span>}
</code></pre>
<p>بعد تخزين قيمة من النوع <code>int</code> داخل <code>another_store</code>، جرى تحديث نوع <code>another_store</code> من <code>'_weak2 option ref</code> إلى <code>int option ref</code>. ويحمي هذا التمييز بين متغيّرات النوع الضعيفة ومتغيّرات النوع العامة برامج OCaml من عدم السلامة وأخطاء وقت التشغيل. ولتفهم من أين قد يأتي عدم السلامة، تأمّل هذه الدالة البسيطة التي تبدّل قيمة <code>x</code> بالقيمة المخزّنة داخل مرجع <code>store</code>، إن وُجدت:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> swap store x = <span class="hljs-keyword">match</span> !store <span class="hljs-keyword">with</span>
    | <span class="hljs-type">None</span> -&gt; store := <span class="hljs-type">Some</span> x; x
    | <span class="hljs-type">Some</span> y -&gt; store := <span class="hljs-type">Some</span> x; y;;

<span class="hljs-keyword">val</span> swap : <span class="hljs-symbol">&#x27;a</span> option <span class="hljs-built_in">ref</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>يمكننا تطبيق هذه الدالة على مرجعنا:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> one = swap store <span class="hljs-number">1</span>
  <span class="hljs-keyword">let</span> one_again = swap store <span class="hljs-number">2</span>
  <span class="hljs-keyword">let</span> two = swap store <span class="hljs-number">3</span>;;

<span class="hljs-keyword">val</span> one : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>
<span class="hljs-keyword">val</span> one_again : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>
<span class="hljs-keyword">val</span> two : <span class="hljs-built_in">int</span> = <span class="hljs-number">2</span>
</code></pre>
<p>بعد هذه التبديلات الثلاثة تكون القيمة المخزّنة هي <code>3</code>. وكل شيء على ما يرام حتى الآن. ثم يمكننا أن نحاول تبديل <code>3</code> بقيمة أكثر تشويقًا، ولتكن دالة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> error = swap store (<span class="hljs-keyword">fun</span> x -&gt; x);;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> expression should not be a <span class="hljs-keyword">function</span>, the expected <span class="hljs-keyword">type</span> is <span class="hljs-built_in">int</span>
</code></pre>
<p>عند هذه النقطة يشكو مدقّق الأنواع، عن حقّ، من أنه لا يمكن تبديل عدد صحيح بدالة، وأنّه ينبغي دائمًا مبادلة <code>int</code> بـ <code>int</code> آخر. وزيادةً على ذلك، يمنعنا مدقّق الأنواع من تغيير نوع القيمة المخزّنة في <code>store</code> يدويًا:</p>
<pre><code class="language-ocaml"># store := <span class="hljs-type">Some</span> (<span class="hljs-keyword">fun</span> x -&gt; x);;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> expression should not be a <span class="hljs-keyword">function</span>, the expected <span class="hljs-keyword">type</span> is <span class="hljs-built_in">int</span>
</code></pre>
<p>وبالفعل، إذا نظرنا إلى نوع <code>store</code>، نجد أنّ النوع الضعيف <code>'_weak1</code> قد استُبدل بالنوع <code>int</code>:</p>
<pre><code class="language-ocaml"># store;;

- : <span class="hljs-built_in">int</span> option <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-type">Some</span> <span class="hljs-number">3</span>}
</code></pre>
<p>لذلك، بعد وضع <code>int</code> في <code>store</code>، لا يمكننا استعماله لتخزين أي قيمة غير <code>int</code>. وبصفة أعمّ، تحمي الأنواع الضعيفة البرنامج من التحوير غير المشروع للقيم ذات النوع متعدّد الأشكال.</p>
<p>علاوةً على ذلك، لا يمكن أن تظهر الأنواع الضعيفة في توقيع وحدات المستوى الأعلى: إذ يجب أن تكون الأنواع معروفة عند الترجمة. ومن ثَمّ، قد تستبدل وحدات ترجمة مختلفة النوع الضعيف بأنواع مختلفة وغير متوافقة. ولهذا السبب، فإن ترجمة قطعة الشيفرة الصغيرة التالية:</p>
<pre><code class="language-text">let option_ref = ref None
</code></pre>
<p>ينتج عنها خطأ في الترجمة:</p>
<pre><code class="language-text">Error: The type of this expression, &#x27;_weak1 option ref,
       contains type variables that cannot be generalized
</code></pre>
<p>ولحلّ هذا الخطأ يكفي إضافة تعليمة نوع صريحة تحدّد النوع عند التصريح:</p>
<pre><code class="language-text">let option_ref: int option ref = ref None
</code></pre>
<p>وهذا في كل الأحوال ممارسة جيدة عند التعامل مع المتغيّرات العامة القابلة للتحوير هذه. فبدون ذلك ستأخذ هذه المتغيّرات نوع أول استعمال لها. وإن وقع خطأ عند هذه النقطة، فقد يفضي ذلك إلى أخطاء تنميط محيّرة حين تُعلَّم الاستعمالات الصحيحة اللاحقة كأخطاء.</p>
<h3 id="612-قيد-القيمة">6.1.2 قيد القيمة</h3>
<p>تحديد السياق الدقيق الذي ينبغي أن تُستبدل فيه الأنواع متعدّدة الأشكال بأنواع ضعيفة بطريقة معيارية مسألة صعبة. فالواجب على نظام الأنواع أن يعالج إمكان أن تُخفي الدوال حالات تحويرية دائمة. مثلًا، تستعمل الدالة التالية مرجعًا داخليًا لتطبيق دالة هوية مؤجّلة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> make_fake_id <span class="hljs-literal">()</span> =
    <span class="hljs-keyword">let</span> store = <span class="hljs-built_in">ref</span> <span class="hljs-type">None</span> <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">fun</span> x -&gt; swap store x ;;

<span class="hljs-keyword">val</span> make_fake_id : <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> fake_id = make_fake_id<span class="hljs-literal">()</span>;;

<span class="hljs-keyword">val</span> fake_id : <span class="hljs-symbol">&#x27;_weak3</span> -&gt; <span class="hljs-symbol">&#x27;_weak3</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>سيكون غير سليم تطبيق دالة <code>fake_id</code> هذه على قيم ذات أنواع مختلفة. ولذلك تُسند إلى الدالة <code>fake_id</code>، عن حقّ، النوع <code>'_weak3 -&gt; '_weak3</code> بدلًا من <code>'a -&gt; 'a</code>. وفي الوقت ذاته، ينبغي أن يكون ممكنًا استعمال حالة تحويرية محلية دون التأثير في نوع دالة.</p>
<p>وللتغلب على هاتين الصعوبتين المتلازمتين، يعتبر مدقّق الأنواع أنّ أي قيمة تُعيدها دالة قد تعتمد في الخفاء على حالات تحويرية دائمة، وينبغي إعطاؤها نوعًا ضعيفًا. ويُسمّى هذا القيد على نوع القيم القابلة للتحوير وعلى نتائج تطبيق الدوال «قيد القيمة». ولاحظ أنّ قيد القيمة هذا محافظ: فهناك حالات يكون فيها قيد القيمة شديد الحذر فيمنح نوعًا ضعيفًا لقيمة كان يمكن تعميمها بأمان إلى نوع متعدّد الأشكال:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> not_id = (<span class="hljs-keyword">fun</span> x -&gt; x) (<span class="hljs-keyword">fun</span> x -&gt; x);;

<span class="hljs-keyword">val</span> not_id : <span class="hljs-symbol">&#x27;_weak4</span> -&gt; <span class="hljs-symbol">&#x27;_weak4</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وكثيرًا ما يحدث هذا عند تعريف دوال باستعمال دوال عالية الرتبة. ولتجنّب هذه المشكلة، من الحلول إضافة وسيطة صريحة إلى الدالة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> id_again = <span class="hljs-keyword">fun</span> x -&gt; (<span class="hljs-keyword">fun</span> x -&gt; x) (<span class="hljs-keyword">fun</span> x -&gt; x) x;;

<span class="hljs-keyword">val</span> id_again : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وبهذه الوسيطة يرى مدقّق الأنواع في <code>id_again</code> تعريفًا لدالة، ومن ثَمّ يمكن تعميمه. ويُسمّى هذا النوع من المعالجة في حساب لامبدا «توسيع إيتا»، ويُشار إليه أحيانًا بهذا الاسم.</p>
<h3 id="613-قيد-القيمة-المخفف">6.1.3 قيد القيمة المخفَّف</h3>
<p>هناك حل جزئي آخر لمشكلة الأنواع الضعيفة غير الضرورية، وهو مطبَّق مباشرةً داخل مدقّق الأنواع. وبإيجاز، يمكن إثبات أنّ الأنواع الضعيفة التي لا تظهر إلا كوسائط نوع في مواضع متغايرة طرديًا — وتُسمّى أيضًا المواضع الموجبة — يمكن تعميمها بأمان إلى أنواع متعدّدة الأشكال. مثلًا، النوع <code>'a list</code> متغاير طرديًا في <code>'a</code>:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> f <span class="hljs-literal">()</span> = <span class="hljs-literal">[]</span>;;

<span class="hljs-keyword">val</span> f : <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

#   <span class="hljs-keyword">let</span> empty = f <span class="hljs-literal">()</span>;;

<span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> = <span class="hljs-literal">[]</span>
</code></pre>
<p>لاحظ أنّ النوع المستنتج لـ <code>empty</code> هو <code>'a list</code> لا <code>'_weak5 list</code> الذي كان ينبغي أن يظهر مع قيد القيمة.</p>
<p>ويُسمّى قيد القيمة مقترنًا بهذا التعميم لوسائط النوع المتغايرة طرديًا «قيد القيمة المخفَّف».</p>
<h3 id="614-التغاير-وقيد-القيمة">6.1.4 التغاير وقيد القيمة</h3>
<p>يصف التغاير كيفية سلوك بانيات الأنواع إزاء علاقة النوع الفرعي. تخيّل مثلًا زوجًا من النوعين <code>x</code> و<code>xy</code> حيث <code>x</code> نوع فرعي من <code>xy</code>، ويُرمز إلى ذلك بـ <code>x :&gt; xy</code>:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">type</span> x = [ <span class="hljs-type">\`X</span> ];;

<span class="hljs-keyword">type</span> x = [ <span class="hljs-type">\`X</span> ]

#   <span class="hljs-keyword">type</span> xy = [ <span class="hljs-type">\`X</span> | <span class="hljs-type">\`Y</span> ];;

<span class="hljs-keyword">type</span> xy = [ <span class="hljs-type">\`X</span> | <span class="hljs-type">\`Y</span> ]
</code></pre>
<p>ولأن <code>x</code> نوع فرعي من <code>xy</code>، يمكننا تحويل قيمة من النوع <code>x</code> إلى قيمة من النوع <code>xy</code>:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> x:x = <span class="hljs-type">\`X</span>;;

<span class="hljs-keyword">val</span> x : x = <span class="hljs-type">\`X</span>

#   <span class="hljs-keyword">let</span> x&#x27; = ( x :&gt; xy);;

<span class="hljs-keyword">val</span> x&#x27; : xy = <span class="hljs-type">\`X</span>
</code></pre>
<p>وبالمثل، إذا كانت لدينا قيمة من النوع <code>x list</code>، أمكننا تحويلها إلى قيمة من النوع <code>xy list</code>، لأنّنا نستطيع تحويل كل عنصر على حدة:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> l:x <span class="hljs-built_in">list</span> = [<span class="hljs-type">\`X</span>; <span class="hljs-type">\`X</span>];;

<span class="hljs-keyword">val</span> l : x <span class="hljs-built_in">list</span> = [<span class="hljs-type">\`X</span>; <span class="hljs-type">\`X</span>]

#   <span class="hljs-keyword">let</span> l&#x27; = ( l :&gt; xy <span class="hljs-built_in">list</span>);;

<span class="hljs-keyword">val</span> l&#x27; : xy <span class="hljs-built_in">list</span> = [<span class="hljs-type">\`X</span>; <span class="hljs-type">\`X</span>]
</code></pre>
<p>وبعبارة أخرى، <code>x :&gt; xy</code> يقتضي <code>x list :&gt; xy list</code>، ومن ثَمّ فإنّ باني النوع <code>'a list</code> متغاير طرديًا (أي يحفظ علاقة النوع الفرعي) في وسيطه <code>'a</code>.</p>
<p>وعلى العكس، إذا كانت لدينا دالة تستطيع معالجة قيم من النوع <code>xy</code>:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> f: xy -&gt; <span class="hljs-built_in">unit</span> = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`X</span> -&gt; <span class="hljs-literal">()</span>
    | <span class="hljs-type">\`Y</span> -&gt; <span class="hljs-literal">()</span>;;

<span class="hljs-keyword">val</span> f : xy -&gt; <span class="hljs-built_in">unit</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>فإنّها تستطيع أيضًا معالجة قيم من النوع <code>x</code>:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> f&#x27; = (f :&gt; x -&gt; <span class="hljs-built_in">unit</span>);;

<span class="hljs-keyword">val</span> f&#x27; : x -&gt; <span class="hljs-built_in">unit</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>لاحظ أنّنا نستطيع إعادة كتابة نوعي <code>f</code> و<code>f'</code> على النحو التالي:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> proc = <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">let</span> f&#x27; = (f: xy proc :&gt; x proc);;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> proc = <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
<span class="hljs-keyword">val</span> f&#x27; : x proc = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>في هذه الحالة لدينا <code>x :&gt; xy</code> يقتضي <code>xy proc :&gt; x proc</code>. ولاحظ أنّ علاقة النوع الفرعي الثانية تعكس ترتيب <code>x</code> و<code>xy</code>: فباني النوع <code>'a proc</code> متغاير عكسيًا في وسيطه <code>'a</code>. وبصفة أعمّ، فإنّ باني نوع الدالة <code>'a -&gt; 'b</code> متغاير طرديًا في نوع عائده <code>'b</code> ومتغاير عكسيًا في نوع وسيطه <code>'a</code>.</p>
<p>وقد يكون باني النوع ثابتًا (لا متغايرًا ولا متغايرًا عكسيًا) في بعض وسائط نوعه. ومن الأمثلة النمطية على ذلك المرجع:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> x: x <span class="hljs-built_in">ref</span> = <span class="hljs-built_in">ref</span> <span class="hljs-type">\`X</span>;;

<span class="hljs-keyword">val</span> x : x <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-type">\`X</span>}
</code></pre>
<p>فلو استطعنا إكراه <code>x</code> إلى النوع <code>xy ref</code> بوصفه متغيّرًا <code>xy</code>، لأمكننا استعمال <code>xy</code> لتخزين القيمة <code>\`Y</code> داخل المرجع، ثم استعمال القيمة <code>x</code> لقراءة هذا المحتوى بوصفه قيمة من النوع <code>x</code>، وهو ما ينقض نظام الأنواع.</p>
<p>وبصفة أعمّ، بمجرّد أن يظهر متغيّر نوع في موضع يصف حالة قابلة للتحوير يصبح ثابتًا. وكنتيجة مساوية، فإنّ المتغيّرات المتغايرة طرديًا لن تدلّ قطّ على مواقع قابلة للتحوير، ومن ثَمّ يمكن تعميمها بأمان. ولمزيد من التوضيح، يمكن للقارئ المهتم أن يرجع إلى المقال الأصلي لجاك غاريغ على <a href="http://www.math.nagoya-u.ac.jp/~garrigue/papers/morepoly-long.pdf"><code>http://www.math.nagoya-u.ac.jp/~garrigue/papers/morepoly-long.pdf</code></a>.</p>
<p>ومعًا، يساعد قيد القيمة المخفَّف وتغاير وسائط النوع على تجنّب توسيع إيتا في حالات كثيرة.</p>
<h3 id="615-الأنواع-البيانية-المجردة">6.1.5 الأنواع البيانية المجرّدة</h3>
<p>علاوةً على ذلك، حين تكون تعريفات الأنواع مكشوفة، يستطيع مدقّق الأنواع أن يستنتج معلومات التغاير بنفسه، فيستفيد المرء من قيد القيمة المخفَّف حتى دون أن يدري. غير أنّ الأمر لم يعد كذلك عند تعريف أنواع مجرّدة جديدة. وللتوضيح، يمكننا تعريف نوع وحدة <code>collection</code> على النحو التالي:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">COLLECTION</span> = <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> t
    <span class="hljs-keyword">val</span> empty: <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> t
  <span class="hljs-keyword">end</span>

  <span class="hljs-keyword">module</span> <span class="hljs-type">Implementation</span> = <span class="hljs-keyword">struct</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> t = <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">let</span> empty <span class="hljs-literal">()</span>= <span class="hljs-literal">[]</span>
  <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">COLLECTION</span> = <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> t <span class="hljs-keyword">val</span> empty : <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> t <span class="hljs-keyword">end</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">Implementation</span> :
  <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> t = <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> <span class="hljs-keyword">val</span> empty : <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">List2</span>: <span class="hljs-type">COLLECTION</span> = <span class="hljs-type">Implementation</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">List2</span> : <span class="hljs-type">COLLECTION</span>
</code></pre>
<p>في هذه الحالة، عند إكراه الوحدة <code>List2</code> إلى نوع الوحدة <code>COLLECTION</code>، ينسى مدقّق الأنواع أنّ <code>'a List2.t</code> كان متغايرًا طرديًا في <code>'a</code>. وبالتالي لم يعد قيد القيمة المخفَّف ينطبق:</p>
<pre><code class="language-ocaml">#   <span class="hljs-type">List2</span>.empty <span class="hljs-literal">()</span>;;

- : <span class="hljs-symbol">&#x27;_weak5</span> <span class="hljs-type">List2</span>.t = &lt;abstr&gt;
</code></pre>
<p>وللحفاظ على قيد القيمة المخفَّف، نحتاج إلى التصريح بأنّ النوع المجرّد <code>'a COLLECTION.t</code> متغاير طرديًا في <code>'a</code>:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">COLLECTION</span> = <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> +<span class="hljs-symbol">&#x27;a</span> t
    <span class="hljs-keyword">val</span> empty: <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> t
  <span class="hljs-keyword">end</span>

  <span class="hljs-keyword">module</span> <span class="hljs-type">List2</span>: <span class="hljs-type">COLLECTION</span> = <span class="hljs-type">Implementation</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">COLLECTION</span> = <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> +<span class="hljs-symbol">&#x27;a</span> t <span class="hljs-keyword">val</span> empty : <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span> t <span class="hljs-keyword">end</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">List2</span> : <span class="hljs-type">COLLECTION</span>
</code></pre>
<p>حينئذٍ نستعيد تعدّد الأشكال:</p>
<pre><code class="language-ocaml">#   <span class="hljs-type">List2</span>.empty <span class="hljs-literal">()</span>;;

- : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-type">List2</span>.t = &lt;abstr&gt;
</code></pre>
<h2 id="62-العودية-متعددة-الأشكال">6.2 العودية متعدّدة الأشكال</h2>
<p>ترتبط فئة النقص الثانية الكبرى في العمومية ارتباطًا مباشرًا بمشكلة استنتاج الأنواع للدوال متعدّدة الأشكال. ففي بعض الظروف قد لا يكون النوع الذي يستنتجه OCaml عامًّا بما يكفي للسماح بتعريف بعض الدوال العودية، ولا سيّما الدوال العودية التي تعمل على أنواع بيانات جبرية غير منتظمة.</p>
<p>في نوع البيانات الجبري المنتظم متعدّد الأشكال تكون وسائط نوع باني النوع ثابتة داخل تعريف النوع. مثلًا، يمكننا النظر إلى قائمة متداخلة تعسّفيًا معرّفة على النحو التالي:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> regular_nested = <span class="hljs-type">List</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> | <span class="hljs-type">Nested</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> regular_nested <span class="hljs-built_in">list</span>;;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> regular_nested = <span class="hljs-type">List</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> | <span class="hljs-type">Nested</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> regular_nested <span class="hljs-built_in">list</span>

# <span class="hljs-keyword">let</span> l = <span class="hljs-type">Nested</span>[ <span class="hljs-type">List</span> [<span class="hljs-number">1</span>]; <span class="hljs-type">Nested</span> [<span class="hljs-type">List</span>[<span class="hljs-number">2</span>;<span class="hljs-number">3</span>]]; <span class="hljs-type">Nested</span>[<span class="hljs-type">Nested</span><span class="hljs-literal">[]</span>] ];;

<span class="hljs-keyword">val</span> l : <span class="hljs-built_in">int</span> regular_nested =
  <span class="hljs-type">Nested</span> [<span class="hljs-type">List</span> [<span class="hljs-number">1</span>]; <span class="hljs-type">Nested</span> [<span class="hljs-type">List</span> [<span class="hljs-number">2</span>; <span class="hljs-number">3</span>]]; <span class="hljs-type">Nested</span> [<span class="hljs-type">Nested</span> <span class="hljs-literal">[]</span>]]
</code></pre>
<p>لاحظ أنّ باني النوع <code>regular_nested</code> يظهر دائمًا في التعريف السابق بصيغة <code>'a regular_nested</code>، بالوسيط نفسه <code>'a</code>. وبهذا النوع يمكن حساب العمق بدالة عودية تقليدية:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> regular_depth = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">List</span> _ -&gt; <span class="hljs-number">1</span>
    | <span class="hljs-type">Nested</span> n -&gt; <span class="hljs-number">1</span> + <span class="hljs-type">List</span>.fold_left max <span class="hljs-number">1</span> (<span class="hljs-type">List</span>.map regular_depth n);;

<span class="hljs-keyword">val</span> regular_depth : <span class="hljs-symbol">&#x27;a</span> regular_nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>أما أنواع البيانات الجبرية العودية غير المنتظمة فتقابل أنواع البيانات الجبرية متعدّدة الأشكال التي تختلف أنواع وسائطها بين الطرف الأيسر والطرف الأيمن من تعريف النوع. مثلًا، قد يكون من المفيد تعريف نوع بياني يضمن أنّ جميع القوائم متداخلة في العمق نفسه:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> nested = <span class="hljs-type">List</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> | <span class="hljs-type">Nested</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> nested;;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> nested = <span class="hljs-type">List</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> | <span class="hljs-type">Nested</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> nested
</code></pre>
<p>حدسيًا، قيمة من النوع <code>'a nested</code> هي قائمة من قوائم … من قوائم عناصر <code>a</code>، بعدد <code>k</code> من القوائم المتداخلة. ثم يمكننا تكييف الدالة <code>regular_depth</code> المعرّفة على <code>regular_nested</code> لتصبح دالة <code>depth</code> تحسب هذا <code>k</code>. وكمحاولة أولى يمكننا تعريف:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> depth = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">List</span> _ -&gt; <span class="hljs-number">1</span>
    | <span class="hljs-type">Nested</span> n -&gt; <span class="hljs-number">1</span> + depth n;;

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> n has <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> nested
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> nested
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> variable <span class="hljs-symbol">&#x27;a</span> occurs inside <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
</code></pre>
<p>ينشأ خطأ النوع هنا من أنّ مدقّق الأنواع، أثناء تعريف <code>depth</code>، يُسند إليه أولًا النوع <code>'a -&gt; 'b</code>. وعند تنميط مطابقة الأنماط يصبح <code>'a -&gt; 'b</code> هو <code>'a nested -&gt; 'b</code>، ثم <code>'a nested -&gt; int</code> بعد تنميط فرع <code>List</code>. غير أنّ مدقّق الأنواع، عند تنميط التطبيق <code>depth n</code> في فرع <code>Nested</code>، يواجه مشكلة: فـ <code>depth n</code> مطبَّق على <code>'a list nested</code>، ومن ثَمّ يجب أن يكون نوعه <code>'a list nested -&gt; 'b</code>. وتوحيد هذا القيد مع القيد السابق يفضي إلى القيد المستحيل <code>'a list nested = 'a nested</code>. وبعبارة أخرى، تُطبَّق الدالة العودية <code>depth</code> داخل تعريفها على قيم من النوع <code>'a t</code> بأنواع <code>'a</code> مختلفة، بسبب عدم انتظام باني النوع <code>nested</code>. وهذا يخلق مشكلة لأنّ مدقّق الأنواع كان قد أدخل متغيّر نوع جديدًا <code>'a</code> عند <em>تعريف</em> الدالة <code>depth</code> فقط، بينما نحتاج هنا إلى متغيّر نوع مختلف لكل <em>تطبيق</em> للدالة <code>depth</code>.</p>
<h3 id="621-التعليقات-متعددة-الأشكال-الصريحة">6.2.1 التعليقات متعدّدة الأشكال الصريحة</h3>
<p>حلّ هذا الإشكال هو استعمال تعليمة نوع صريحة متعدّدة الأشكال للنوع <code>'a</code>:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> depth: <span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">List</span> _ -&gt; <span class="hljs-number">1</span>
    | <span class="hljs-type">Nested</span> n -&gt; <span class="hljs-number">1</span> + depth n;;

<span class="hljs-keyword">val</span> depth : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# depth ( <span class="hljs-type">Nested</span>(<span class="hljs-type">List</span> [ [<span class="hljs-number">7</span>]; [<span class="hljs-number">8</span>] ]) );;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">2</span>
</code></pre>
<p>في نوع <code>depth</code>، أي <code>'a.'a nested -&gt; int</code>، يكون متغيّر النوع <code>'a</code> مكمَّمًا كليًا. وبعبارة أخرى، تُقرأ <code>'a.'a nested -&gt; int</code> كما يلي: «لكل نوع <code>'a</code>، تربط <code>depth</code> قيم <code>'a nested</code> بأعداد صحيحة». أما النوع القياسي <code>'a nested -&gt; int</code> فيمكن تفسيره كما يلي: «ليكن <code>'a</code> متغيّر نوع، عندئذٍ تربط <code>depth</code> قيم <code>'a nested</code> بأعداد صحيحة». وهناك فرقان كبيران بين تعبيري النوع هذين. أولًا، تشير التعليمة الصريحة متعدّدة الأشكال إلى مدقّق الأنواع بأنّه يحتاج إلى إدخال متغيّر نوع جديد في كل مرة تُطبَّق فيها الدالة <code>depth</code>. وهذا يحلّ مشكلتنا مع تعريف الدالة <code>depth</code>.</p>
<p>ثانيًا، تُعلم هذه التعليمة مدقّق الأنواع أيضًا بأنّ نوع الدالة ينبغي أن يكون متعدّد الأشكال. فبدون تعليمة نوع صريحة متعدّدة الأشكال، تكون تعليمة النوع التالية صحيحة تمامًا:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> sum: <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;c</span> = <span class="hljs-keyword">fun</span> x y -&gt; x + y;;

<span class="hljs-keyword">val</span> sum : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>لأنّ <code>'a</code> و<code>'b</code> و<code>'c</code> تدلّ على متغيّرات نوع قد تكون متعدّدة الأشكال أو لا تكون. بينما يكون توحيد نوع صريح متعدّد الأشكال مع نوع غير متعدّد الأشكال خطأً:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> sum: <span class="hljs-symbol">&#x27;a</span> <span class="hljs-symbol">&#x27;b</span> <span class="hljs-symbol">&#x27;c</span>. <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;c</span> = <span class="hljs-keyword">fun</span> x y -&gt; x + y;;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> definition has <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> which is less general than
         <span class="hljs-symbol">&#x27;a</span> <span class="hljs-symbol">&#x27;b</span> <span class="hljs-symbol">&#x27;c</span>. <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;c</span>
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> is not a <span class="hljs-keyword">type</span> variable.
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> is not a <span class="hljs-keyword">type</span> variable.
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> is not a <span class="hljs-keyword">type</span> variable.
</code></pre>
<p>ومن الملاحظات المهمة هنا أنّه لا حاجة إلى التصريح الكامل بنوع <code>depth</code>: يكفي إضافة تعليقات لمتغيّرات النوع المكمَّمة كليًا فقط:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> depth: <span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; _ = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">List</span> _ -&gt; <span class="hljs-number">1</span>
    | <span class="hljs-type">Nested</span> n -&gt; <span class="hljs-number">1</span> + depth n;;

<span class="hljs-keyword">val</span> depth : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# depth ( <span class="hljs-type">Nested</span>(<span class="hljs-type">List</span> [ [<span class="hljs-number">7</span>]; [<span class="hljs-number">8</span>] ]) );;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">2</span>
</code></pre>
<h3 id="622-أمثلة-أخرى">6.2.2 أمثلة أخرى</h3>
<p>بالتعليقات الصريحة متعدّدة الأشكال يصبح ممكنًا تطبيق أي دالة عودية تعتمد على بنية القوائم المتداخلة وحدها لا على نوع العناصر. ومن الأمثلة الأكثر تعقيدًا حساب العدد الإجمالي لعناصر القوائم المتداخلة:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> len nested =
      <span class="hljs-keyword">let</span> map_and_sum f = <span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc x -&gt; acc + f x) <span class="hljs-number">0</span> <span class="hljs-keyword">in</span>
      <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> len: <span class="hljs-symbol">&#x27;a</span>. (<span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-built_in">int</span> ) -&gt; <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> =
      <span class="hljs-keyword">fun</span> nested_len n -&gt;
        <span class="hljs-keyword">match</span> n <span class="hljs-keyword">with</span>
        | <span class="hljs-type">List</span> l -&gt; nested_len l
        | <span class="hljs-type">Nested</span> n -&gt; len (map_and_sum nested_len) n
      <span class="hljs-keyword">in</span>
    len <span class="hljs-type">List</span>.length nested;;

<span class="hljs-keyword">val</span> len : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# len (<span class="hljs-type">Nested</span>(<span class="hljs-type">Nested</span>(<span class="hljs-type">List</span> [ [ [<span class="hljs-number">1</span>;<span class="hljs-number">2</span>]; [<span class="hljs-number">3</span>] ]; [ <span class="hljs-literal">[]</span>; [<span class="hljs-number">4</span>]; [<span class="hljs-number">5</span>;<span class="hljs-number">6</span>;<span class="hljs-number">7</span>]]; [<span class="hljs-literal">[]</span>] ])));;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">7</span>
</code></pre>
<p>وبالمثل، قد يلزم استعمال أكثر من متغيّر نوع صريح متعدّد الأشكال، كما في حساب قائمة أطوال القوائم المتداخلة للقائمة المتداخلة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> shape n =
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> shape: <span class="hljs-symbol">&#x27;a</span> <span class="hljs-symbol">&#x27;b</span>. (<span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> nested) -&gt;
      (<span class="hljs-symbol">&#x27;b</span> <span class="hljs-built_in">list</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>) -&gt; <span class="hljs-symbol">&#x27;b</span> nested -&gt; <span class="hljs-built_in">int</span> nested
      = <span class="hljs-keyword">fun</span> nest nested_shape -&gt;
        <span class="hljs-keyword">function</span>
        | <span class="hljs-type">List</span> l -&gt; raise
         (<span class="hljs-type">Invalid_argument</span> <span class="hljs-string">&quot;shape requires nested_list of depth greater than 1&quot;</span>)
        | <span class="hljs-type">Nested</span> (<span class="hljs-type">List</span> l) -&gt; nest @@ <span class="hljs-type">List</span> (nested_shape l)
        | <span class="hljs-type">Nested</span> n -&gt;
          <span class="hljs-keyword">let</span> nested_shape = <span class="hljs-type">List</span>.map nested_shape <span class="hljs-keyword">in</span>
          <span class="hljs-keyword">let</span> nest x = nest (<span class="hljs-type">Nested</span> x) <span class="hljs-keyword">in</span>
          shape nest nested_shape n <span class="hljs-keyword">in</span>
    shape (<span class="hljs-keyword">fun</span> n -&gt; n ) (<span class="hljs-keyword">fun</span> l -&gt; <span class="hljs-type">List</span>.map <span class="hljs-type">List</span>.length l ) n;;

<span class="hljs-keyword">val</span> shape : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> nested = &lt;<span class="hljs-keyword">fun</span>&gt;

# shape (<span class="hljs-type">Nested</span>(<span class="hljs-type">Nested</span>(<span class="hljs-type">List</span> [ [ [<span class="hljs-number">1</span>;<span class="hljs-number">2</span>]; [<span class="hljs-number">3</span>] ]; [ <span class="hljs-literal">[]</span>; [<span class="hljs-number">4</span>]; [<span class="hljs-number">5</span>;<span class="hljs-number">6</span>;<span class="hljs-number">7</span>]]; [<span class="hljs-literal">[]</span>] ])));;

- : <span class="hljs-built_in">int</span> nested = <span class="hljs-type">Nested</span> (<span class="hljs-type">List</span> [[<span class="hljs-number">2</span>; <span class="hljs-number">1</span>]; [<span class="hljs-number">0</span>; <span class="hljs-number">1</span>; <span class="hljs-number">3</span>]; [<span class="hljs-number">0</span>]])
</code></pre>
<h2 id="63-الدوال-متعددة-الأشكال-عالية-الرتبة">6.3 الدوال متعدّدة الأشكال عالية الرتبة</h2>
<p>غير أنّ التعليقات الصريحة متعدّدة الأشكال لا تكفي لتغطية جميع الحالات التي يكون فيها النوع المستنتج لدالة أقل عموميةً مما هو متوقّع. وتنشأ مشكلة مماثلة عند استعمال دوال متعدّدة الأشكال كوسائط لدوال عالية الرتبة. مثلًا، قد نريد حساب متوسط العمق أو الطول لقائمتين متداخلتين:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> average_depth x y = (depth x + depth y) / <span class="hljs-number">2</span>;;

<span class="hljs-keyword">val</span> average_depth : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-symbol">&#x27;b</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

#   <span class="hljs-keyword">let</span> average_len x y = (len x + len y) / <span class="hljs-number">2</span>;;

<span class="hljs-keyword">val</span> average_len : <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-symbol">&#x27;b</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

#   <span class="hljs-keyword">let</span> one = average_len (<span class="hljs-type">List</span> [<span class="hljs-number">2</span>]) (<span class="hljs-type">List</span> [<span class="hljs-literal">[]</span>]);;

<span class="hljs-keyword">val</span> one : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>
</code></pre>
<p>سيكون من الطبيعي تجميع هذين التعريفين على النحو التالي:</p>
<pre><code class="language-ocaml">#     <span class="hljs-keyword">let</span> average f x y = (f x + f y) / <span class="hljs-number">2</span>;;

<span class="hljs-keyword">val</span> average : (<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">int</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>غير أنّ نوع <code>average len</code> أقل عموميةً من نوع <code>average_len</code>، لأنّه يشترط أن يكون نوع الوسيط الأول والثاني واحدًا:</p>
<pre><code class="language-ocaml">#   average_len (<span class="hljs-type">List</span> [<span class="hljs-number">2</span>]) (<span class="hljs-type">List</span> [<span class="hljs-literal">[]</span>]);;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>

#   average len (<span class="hljs-type">List</span> [<span class="hljs-number">2</span>]) (<span class="hljs-type">List</span> [<span class="hljs-literal">[]</span>]);;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> expression should not be a <span class="hljs-built_in">list</span> literal, the expected <span class="hljs-keyword">type</span> is <span class="hljs-built_in">int</span>
</code></pre>
<p>وكما كان الحال سابقًا مع العودية متعدّدة الأشكال، تنشأ المشكلة من أنّ متغيّرات النوع لا تُدخل إلا في بداية تعريفات <code>let</code>. فحين نحسب <code>f x</code> و<code>f y</code> معًا، يُوحَّد نوعا <code>x</code> و<code>y</code>. ولتجنّب هذا التوحيد، نحتاج إلى إعلام مدقّق الأنواع بأنّ <code>f</code> متعدّدة الأشكال في وسيطها الأول. وبمعنى ما، نريد أن يكون نوع <code>average</code> كما يلي:</p>
<pre><code class="language-text">val average: (&#x27;a. &#x27;a nested -&gt; int) -&gt; &#x27;a nested -&gt; &#x27;b nested -&gt; int
</code></pre>
<p>لاحظ أنّ هذه الصيغة غير صحيحة داخل OCaml: فـ <code>average</code> لها نوع مكمَّم كليًا <code>'a</code> داخل نوع إحدى وسائطها، بينما في العودية متعدّدة الأشكال كان النوع المكمَّم كليًا يُدخل قبل بقية النوع. وهذا الموضع للنوع المكمَّم كليًا يعني أنّ <code>average</code> دالة متعدّدة الأشكال من الرتبة الثانية. وهذا النوع من الدوال عالية الرتبة غير مدعوم مباشرةً في OCaml: إذ إنّ استنتاج الأنواع للدوال متعدّدة الأشكال من الرتبة الثانية وما فوقها غير قابل للتقرير؛ ومن ثَمّ فإنّ استعمال هذا النوع من الدوال عالية الرتبة يستلزم معالجة هذه الأنواع المكمَّمة كليًا يدويًا.</p>
<p>وفي OCaml، هناك طريقتان لإدخال هذا النوع من الأنواع المكمَّمة كليًا الصريحة: حقول السجلات المكمَّمة كليًا،</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> nested_reduction = { f:<span class="hljs-symbol">&#x27;elt</span>. <span class="hljs-symbol">&#x27;elt</span> nested -&gt; <span class="hljs-symbol">&#x27;a</span> };;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> nested_reduction = { f : <span class="hljs-symbol">&#x27;elt</span>. <span class="hljs-symbol">&#x27;elt</span> nested -&gt; <span class="hljs-symbol">&#x27;a</span>; }

#   <span class="hljs-keyword">let</span> boxed_len = { f = len };;

<span class="hljs-keyword">val</span> boxed_len : <span class="hljs-built_in">int</span> nested_reduction = {f = &lt;<span class="hljs-keyword">fun</span>&gt;}
</code></pre>
<p>ودوال الكائنات المكمَّمة كليًا:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> obj_len = <span class="hljs-keyword">object</span> <span class="hljs-keyword">method</span> f:<span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-symbol">&#x27;b</span> = len <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">val</span> obj_len : &lt; f : <span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> &gt; = &lt;obj&gt;
</code></pre>
<p>ولحلّ مشكلتنا يمكننا بالتالي استعمال حلّ السجل:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> average nsm x y = (nsm.f x + nsm.f y) / <span class="hljs-number">2</span> ;;

<span class="hljs-keyword">val</span> average : <span class="hljs-built_in">int</span> nested_reduction -&gt; <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-symbol">&#x27;b</span> nested -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>أو حلّ الكائن:</p>
<pre><code class="language-ocaml">#   <span class="hljs-keyword">let</span> average (obj:&lt;f:<span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; _ &gt; ) x y = (obj#f x + obj#f y) / <span class="hljs-number">2</span> ;;

<span class="hljs-keyword">val</span> average : &lt; f : <span class="hljs-symbol">&#x27;a</span>. <span class="hljs-symbol">&#x27;a</span> nested -&gt; <span class="hljs-built_in">int</span> &gt; -&gt; <span class="hljs-symbol">&#x27;b</span> nested -&gt; <span class="hljs-symbol">&#x27;c</span> nested -&gt; <span class="hljs-built_in">int</span> =
  &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,l as slug,p as title};
