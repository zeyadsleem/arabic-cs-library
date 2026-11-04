const s="ocaml-manual",a="ch07",n="أنواع البيانات الجبرية المعمّمة",p="index",l="أنواع البيانات الجبرية المعمّمة",e=[{depth:2,id:"71-الدوال-العودية",text:"7.1 الدوال العودية"},{depth:2,id:"72-استنتاج-الأنواع",text:"7.2 استنتاج الأنواع"},{depth:2,id:"73-حالات-الدحض",text:"7.3 حالات الدحض"},{depth:2,id:"74-أمثلة-متقدمة",text:"7.4 أمثلة متقدّمة"},{depth:2,id:"75-أسماء-الأنواع-الوجودية-في-رسائل-الخطأ",text:"7.5 أسماء الأنواع الوجودية في رسائل الخطأ"},{depth:2,id:"76-التسمية-الصريحة-للأنواع-الوجودية",text:"7.6 التسمية الصريحة للأنواع الوجودية"},{depth:2,id:"77-معادلات-على-أنواع-مجردة-غير-محلية",text:"7.7 معادلات على أنواع مجرّدة غير محلية"},{depth:2,id:"78-أنواع-تستعمل-مؤشرات-gadt",text:"7.8 أنواع تُستعمل مؤشرات GADT"},{depth:3,id:"781-السلوك-القديم-الأنواع-في-الوحدة-الحالية",text:"7.8.1 السلوك القديم: الأنواع في الوحدة الحالية"}],c=`<h1>الفصل 7: أنواع البيانات الجبرية المعمّمة</h1>
<p>توسّع أنواع البيانات الجبرية المعمّمة (GADTs) أنواع المجموع المعتادة من وجهين: فقد تتغيّر القيود على معاملات النوع بحسب باني القيمة، وقد تكون بعض متغيّرات النوع مكمَّمة وجوديًا. ويجري إضافة القيود بإعطاء نوع إرجاع صريح تُجزَّأ فيه معاملات النوع:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ term =
  | <span class="hljs-type">Int</span> : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> term
  | <span class="hljs-type">Add</span> : (<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) term
  | <span class="hljs-type">App</span> : (<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;a</span>) term * <span class="hljs-symbol">&#x27;b</span> term -&gt; <span class="hljs-symbol">&#x27;a</span> term
</code></pre>
<p>يجب أن يستعمل نوع الإرجاع هذا باني النوع نفسه المستعمل في النوع المُعرَّف، وأن يكون له العدد نفسه من المعاملات. وتصبح المتغيّرات وجودية عندما تظهر داخل وسيط الباني دون أن تظهر في نوع إرجاعه. ولأن استعمال نوع الإرجاع يُغني غالبًا عن تسمية معاملات النوع في الطرف الأيسر من تعريف النوع، يمكن في تلك الحالة استبدالها بالأنواع المجهولة <code>_</code>.</p>
<p>ويمكن استعادة القيود المرتبطة بكل باني عبر مطابقة الأنماط. أي أنه إذا كان نوع المفحوص في مطابقة الأنماط يحتوي نوعًا مجرّدًا محليًا، أمكن تنقيح هذا النوع وفقًا للباني المستعمل. وهذه القيود الإضافية لا تكون صالحة إلا داخل الفرع الموافق من مطابقة الأنماط. وإذا كان للباني متغيّرات وجودية، تُولَّد أنواع مجرّدة محلية جديدة، ويجب ألا تفلت من نطاق هذا الفرع.</p>
<h2 id="71-الدوال-العودية">7.1 الدوال العودية</h2>
<p>نكتب دالة <code>eval</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> eval : <span class="hljs-keyword">type</span> a. a term -&gt; a = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Int</span> n    -&gt; n                 <span class="hljs-comment">(* a = int *)</span>
  | <span class="hljs-type">Add</span>      -&gt; (<span class="hljs-keyword">fun</span> x y -&gt; x+y)  <span class="hljs-comment">(* a = int -&gt; int -&gt; int *)</span>
  | <span class="hljs-type">App</span>(f,x) -&gt; (eval f) (eval x)
          <span class="hljs-comment">(* eval called at types (b-&gt;a) and b for fresh b *)</span>
</code></pre>
<p>ثم نستعملها:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> two = eval (<span class="hljs-type">App</span> (<span class="hljs-type">App</span> (<span class="hljs-type">Add</span>, <span class="hljs-type">Int</span> <span class="hljs-number">1</span>), <span class="hljs-type">Int</span> <span class="hljs-number">1</span>))

<span class="hljs-keyword">val</span> two : <span class="hljs-built_in">int</span> = <span class="hljs-number">2</span>
</code></pre>
<p>من المهم ملاحظة أن الدالة <code>eval</code> تستعمل الصيغة متعدّدة الأشكال للأنواع المجرّدة المحلية. وعند تعريف دالة عودية تتعامل مع GADT، ينبغي عمومًا استعمال العودية متعدّدة الأشكال الصريحة. فمثلًا، يفشل التعريف التالي بخطأ في النوع:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> eval (<span class="hljs-keyword">type</span> a) : a term -&gt; a = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Int</span> n    -&gt; n
  | <span class="hljs-type">Add</span>      -&gt; (<span class="hljs-keyword">fun</span> x y -&gt; x+y)
  | <span class="hljs-type">App</span>(f,x) -&gt; (eval f) (eval x)

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> f has <span class="hljs-keyword">type</span> ($b -&gt; a) term
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span>
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> constructor $b would escape its scope
       <span class="hljs-type">Hint</span>: $b is an existential <span class="hljs-keyword">type</span> bound by the constructor <span class="hljs-type">App</span>.
</code></pre>
<p>وفي غياب تعليمة متعدّدة الأشكال صريحة، يُستنتج للدالة العودية نوع أحادي الشكل. وإذا وقع نداء عودي داخل تعريف الدالة عند نوع يشمل متغيّر نوع وجوديًا من GADT، فإن هذا المتغيّر ينتقل إلى نوع الدالة العودية، وبذلك يفلت من نطاقه. وفي المثال أعلاه يحدث ذلك في الفرع <code>App(f,x)</code> حين تُنادى <code>eval</code> بالوسيط <code>f</code>. وفي هذا الفرع يكون نوع <code>f</code> هو <code>($App_'b -&gt; a) term</code>، وهو نوع وجودي يسمّيه المترجم (انظر 7.5). ولأن نوع <code>eval</code> هو <code>'a term -&gt; 'a</code>، فإن النداء <code>eval f</code> يجعل ذلك النوع الوجودي ينتقل إلى متغيّر النوع <code>'a</code> ويفلت من نطاقه. وهذا ما يُطلق الخطأ أعلاه.</p>
<h2 id="72-استنتاج-الأنواع">7.2 استنتاج الأنواع</h2>
<p>يُعرف عن استنتاج الأنواع في GADT أنه صعب. والسبب أن بعض الأنواع قد تصير مُلتبِسة عند الإفلات من فرع. فمثلًا، في حالة <code>Int</code> أعلاه، يمكن أن يكون نوع <code>n</code> هو <code>int</code> أو <code>a</code>، وهما غير متكافئين خارج ذلك الفرع. وكحلّ تقريبي أول، ينجح استنتاج الأنواع دائمًا إذا عُلّقت مطابقة الأنماط بأنواع لا تحتوي متغيّرات نوع حرّة (في المفحوص وفي نوع الإرجاع معًا). وهذا هو الحال في المثال أعلاه، بفضل تعليمة النوع التي لا تحتوي إلا أنواعًا مجرّدة محلية.</p>
<p>وفي الممارسة، يكون استنتاج الأنواع أذكى من ذلك بقليل: فتعليمات النوع لا يلزم أن تكون على مطابقة الأنماط مباشرة، ولا يلزم أن تكون الأنواع مغلقة دائمًا. ونتيجة لذلك، يكفي عادةً تعليق الدوال فقط، كما في المثال أعلاه. وتنتشر تعليمات النوع بطريقتين: أما بالنسبة إلى المفحوص، فتتبع مسار استنتاج الأنواع، على نحو شبيه بالدوال متعدّدة الأشكال؛ وأما بالنسبة إلى نوع الإرجاع، فتتبع بنية البرنامج، إذ تُجزَّأ على الدوال، وتنتشر إلى جميع فروع مطابقة الأنماط، وتعبر الأزواج والسجلات وأنواع المجموع. ثم إن مفهوم الالتباس المستعمل أقوى: فلا يُعدّ النوع مُلتبِسًا إلا إذا مُزج بأنواع غير متوافقة (وُحِّدت بقيود) دون تعليمات نوع تفصل بينها. فمثلًا، يُنمَّط البرنامج التالي بشكل صحيح.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> sum : <span class="hljs-keyword">type</span> a. a term -&gt; _ = <span class="hljs-keyword">fun</span> x -&gt;
  <span class="hljs-keyword">let</span> y =
    <span class="hljs-keyword">match</span> x <span class="hljs-keyword">with</span>
    | <span class="hljs-type">Int</span> n -&gt; n
    | <span class="hljs-type">Add</span>   -&gt; <span class="hljs-number">0</span>
    | <span class="hljs-type">App</span>(f,x) -&gt; sum f + sum x
  <span class="hljs-keyword">in</span> y + <span class="hljs-number">1</span>

<span class="hljs-keyword">val</span> sum : <span class="hljs-symbol">&#x27;a</span> term -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>هنا لا يُخلط نوع الإرجاع <code>int</code> مع <code>a</code> أبدًا، فيُرى غير مُلتبِس، ويمكن استنتاجه. وعند استعمال تعليمات نوع جزئية كهذه نوصي بشدة بتحديد النمط <code>-principal</code> للتحقق من أن الاستنتاج أصلي.</p>
<p>ويكون فحص الشمول مدركًا لقيود GADT، فيستطيع أن يستنتج تلقائيًا أن بعض الحالات لا يمكن أن تقع. فمثلًا، تُرى مطابقة الأنماط التالية شاملة على نحو صحيح (إذ لا يمكن أن تقع حالة <code>Add</code>).</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> get_int : <span class="hljs-built_in">int</span> term -&gt; <span class="hljs-built_in">int</span> = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Int</span> n    -&gt; n
  | <span class="hljs-type">App</span>(_,_) -&gt; <span class="hljs-number">0</span>
</code></pre>
<h2 id="73-حالات-الدحض">7.3 حالات الدحض</h2>
<p>عادةً لا يحاول فحص الشمول إلا التحقق مما إذا كانت الحالات المحذوفة من مطابقة الأنماط قابلة للنمط أم لا. غير أنك تستطيع إجباره على بذل جهد أكبر بإضافة <em>حالات دحض</em>، تُكتب بنقطة كاملة. وفي حضور حالة دحض، يحسب فحص الشمول أولًا تقاطع النمط مع متمّم الحالات السابقة له. ثم يتحقق مما إذا كانت الأنماط الناتجة قادرة فعلًا على مطابقة قيم ملموسة، بمحاولة التحقق من نمطها. وتُعالَج الرموز العامة في الأنماط المولَّدة بطريقة خاصة: فإذا كان نوعها نوع متغيّر لا يحتوي إلا بواني GADT، قُسِّم النمط إلى البواني المختلفة للتحقق مما إذا كان أي منها ممكنًا (ولا يجري هذا التقسيم على وسائط هذه البواني، تجنّبًا لعدم الانتهاء). كما نقسّم الأزواج وأنواع المتغيّرات ذات الحالة الواحدة، لأنها قد تحتوي GADT في داخلها. فمثلًا، تُعدّ الشيفرة التالية شاملة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ t =
  | <span class="hljs-type">Int</span> : <span class="hljs-built_in">int</span> t
  | <span class="hljs-type">Bool</span> : <span class="hljs-built_in">bool</span> t

<span class="hljs-keyword">let</span> deep : (<span class="hljs-built_in">char</span> t * <span class="hljs-built_in">int</span>) option -&gt; <span class="hljs-built_in">char</span> = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">None</span> -&gt; <span class="hljs-string">&#x27;c&#x27;</span>
  | _ -&gt; .
</code></pre>
<p>أي أن الحالة المتبقية المستنتجة هي <code>Some _</code>، وتُقسَّم إلى <code>Some (Int, _)</code> و<code>Some (Bool, _)</code>، وكلتاهما غير قابلتين للنمط لأن <code>deep</code> تتوقع <code>char t</code> غير موجود كعنصر أول في الزوج. ولاحظ أنه كان يمكن حذف حالة الدحض هنا، لأنها تُضاف تلقائيًا عندما تكون في مطابقة الأنماط حالة واحدة فقط.</p>
<p>ومن الإضافات الأخرى أن فحص التكرار صار مدركًا لـ GADT: فتُكتشف الحالة على أنها مكرّرة إذا كان يمكن استبدالها بحالة دحض تستعمل النمط نفسه.</p>
<h2 id="74-أمثلة-متقدمة">7.4 أمثلة متقدّمة</h2>
<p>النوع <code>term</code> الذي عرّفناه أعلاه نوع <em>مُفهرَس</em>، إذ يعكس معامل نوع فيه خاصية من محتوى القيمة. ومن استعمالات GADT الأخرى الأنواع <em>المفردة</em>، حيث تمثّل قيمة GADT نوعًا واحدًا بعينه. ويمكن استعمال هذه القيمة تمثيلًا وقت التشغيل لذلك النوع، ويمكن للدالة التي تتلقاها أن تسلك سلوكًا متعدّد الأنواع.</p>
<p>وهذا مثال على دالة متعدّدة الأشكال تأخذ تمثيل وقت التشغيل لنوع ما <code>t</code> وقيمة من النوع نفسه، ثم تطبع القيمة طباعة جميلة في صورة سلسلة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ typ =
  | <span class="hljs-type">Int</span> : <span class="hljs-built_in">int</span> typ
  | <span class="hljs-type">String</span> : <span class="hljs-built_in">string</span> typ
  | <span class="hljs-type">Pair</span> : <span class="hljs-symbol">&#x27;a</span> typ * <span class="hljs-symbol">&#x27;b</span> typ -&gt; (<span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;b</span>) typ

<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> to_string: <span class="hljs-keyword">type</span> t. t typ -&gt; t -&gt; <span class="hljs-built_in">string</span> =
  <span class="hljs-keyword">fun</span> t x -&gt;
  <span class="hljs-keyword">match</span> t <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Int</span> -&gt; <span class="hljs-type">Int</span>.to_string x
  | <span class="hljs-type">String</span> -&gt; <span class="hljs-type">Printf</span>.sprintf <span class="hljs-string">&quot;%S&quot;</span> x
  | <span class="hljs-type">Pair</span>(t1,t2) -&gt;
      <span class="hljs-keyword">let</span> (x1, x2) = x <span class="hljs-keyword">in</span>
      <span class="hljs-type">Printf</span>.sprintf <span class="hljs-string">&quot;(%s,%s)&quot;</span> (to_string t1 x1) (to_string t2 x2)
</code></pre>
<p>ومن التطبيقات المتكررة لـ GADT كذلك شهود المساواة.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> (_,_) eq = <span class="hljs-type">Eq</span> : (<span class="hljs-symbol">&#x27;a</span>,<span class="hljs-symbol">&#x27;a</span>) eq

<span class="hljs-keyword">let</span> cast : <span class="hljs-keyword">type</span> a b. (a,b) eq -&gt; a -&gt; b = <span class="hljs-keyword">fun</span> <span class="hljs-type">Eq</span> x -&gt; x
</code></pre>
<p>هنا للنوع <code>eq</code> باني واحد فقط، وبمطابقته نضيف قيدًا محليًا يسمح بالتحويل بين <code>a</code> و<code>b</code>. وببناء شهود مساواة كهذه، يمكن جعل أنواع متساوية وهي مختلفة تركيبيًا.</p>
<p>وهذا مثال يستعمل الأنواع المفردة وشهود المساواة معًا لتنفيذ أنواع ديناميكية.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> eq_type : <span class="hljs-keyword">type</span> a b. a typ -&gt; b typ -&gt; (a,b) eq option =
  <span class="hljs-keyword">fun</span> a b -&gt;
  <span class="hljs-keyword">match</span> a, b <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Int</span>, <span class="hljs-type">Int</span> -&gt; <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span>
  | <span class="hljs-type">String</span>, <span class="hljs-type">String</span> -&gt; <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span>
  | <span class="hljs-type">Pair</span>(a1,a2), <span class="hljs-type">Pair</span>(b1,b2) -&gt;
      <span class="hljs-keyword">begin</span> <span class="hljs-keyword">match</span> eq_type a1 b1, eq_type a2 b2 <span class="hljs-keyword">with</span>
      | <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span>, <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span> -&gt; <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span>
      | _ -&gt; <span class="hljs-type">None</span>
      <span class="hljs-keyword">end</span>
  | _ -&gt; <span class="hljs-type">None</span>

<span class="hljs-keyword">type</span> dyn = <span class="hljs-type">Dyn</span> : <span class="hljs-symbol">&#x27;a</span> typ * <span class="hljs-symbol">&#x27;a</span> -&gt; dyn

<span class="hljs-keyword">let</span> get_dyn : <span class="hljs-keyword">type</span> a. a typ -&gt; dyn -&gt; a option =
  <span class="hljs-keyword">fun</span> a (<span class="hljs-type">Dyn</span>(b,x)) -&gt;
  <span class="hljs-keyword">match</span> eq_type a b <span class="hljs-keyword">with</span>
  | <span class="hljs-type">None</span> -&gt; <span class="hljs-type">None</span>
  | <span class="hljs-type">Some</span> <span class="hljs-type">Eq</span> -&gt; <span class="hljs-type">Some</span> x
</code></pre>
<h2 id="75-أسماء-الأنواع-الوجودية-في-رسائل-الخطأ">7.5 أسماء الأنواع الوجودية في رسائل الخطأ</h2>
<p>قد يولّد تنميط مطابقة الأنماط في حضور GADT أنواعًا وجودية كثيرة. وعند الحاجة، تشير رسائل الخطأ إلى هذه الأنواع الوجودية بأسماء يولّدها المترجم. وحاليًا يولّد المترجم هذه الأسماء وفق التسمية التالية:</p>
<ul>
<li>
<p>أولًا، الأنواع التي تبدأ أسماؤها بـ <code>$</code> هي أنواع وجودية.</p>
</li>
<li>
<p>يدل <code>$a</code> على نوع وجودي أُدخل من أجل متغيّر النوع <code>'a</code> في باني GADT:</p>
</li>
</ul>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> any = <span class="hljs-type">Any</span> : <span class="hljs-symbol">&#x27;name</span> -&gt; any
<span class="hljs-keyword">let</span> escape (<span class="hljs-type">Any</span> x) = x

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> x has <span class="hljs-keyword">type</span> $name but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span>
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> constructor $name would escape its scope
       <span class="hljs-type">Hint</span>: $name is an existential <span class="hljs-keyword">type</span> bound by the constructor <span class="hljs-type">Any</span>.
</code></pre>
<ul>
<li>يدل <code>$'a</code> على الحالة التي وُحِّد فيها المتغيّر الوجودي مع متغيّر النوع <code>'a</code> أثناء التنميط:</li>
</ul>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> (<span class="hljs-symbol">&#x27;arg</span>,<span class="hljs-symbol">&#x27;result</span>,<span class="hljs-symbol">&#x27;aux</span>) fn =
  | <span class="hljs-type">Fun</span>: (<span class="hljs-symbol">&#x27;a</span> -&gt;<span class="hljs-symbol">&#x27;b</span>) -&gt; (<span class="hljs-symbol">&#x27;a</span>,<span class="hljs-symbol">&#x27;b</span>,<span class="hljs-built_in">unit</span>) fn
  | <span class="hljs-type">Mem1</span>: (<span class="hljs-symbol">&#x27;a</span> -&gt;<span class="hljs-symbol">&#x27;b</span>) * <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;b</span> -&gt; (<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>, <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;b</span>) fn
<span class="hljs-keyword">let</span> apply: (<span class="hljs-symbol">&#x27;arg</span>,<span class="hljs-symbol">&#x27;result</span>, _ ) fn -&gt; <span class="hljs-symbol">&#x27;arg</span> -&gt; <span class="hljs-symbol">&#x27;result</span> = <span class="hljs-keyword">fun</span> f x -&gt;
  <span class="hljs-keyword">match</span> f <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Fun</span> f -&gt; f x
  | <span class="hljs-type">Mem1</span> (f,y,fy) -&gt; <span class="hljs-keyword">if</span> x = y <span class="hljs-keyword">then</span> fy <span class="hljs-keyword">else</span> f x

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> pattern matches values <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span>
         ($<span class="hljs-symbol">&#x27;arg</span>, <span class="hljs-symbol">&#x27;result</span>, $<span class="hljs-symbol">&#x27;arg</span> * <span class="hljs-symbol">&#x27;result</span>) fn
       but a pattern was expected which matches values <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span>
         ($<span class="hljs-symbol">&#x27;arg</span>, <span class="hljs-symbol">&#x27;result</span>, <span class="hljs-built_in">unit</span>) fn
       <span class="hljs-type">The</span> <span class="hljs-keyword">type</span> constructor $<span class="hljs-symbol">&#x27;arg</span> would escape its scope
</code></pre>
<ul>
<li>يدل <code>$n</code> (حيث n عدد) على نوع وجودي مولَّد داخليًا تعذّرت تسميته بإحدى الطرق السابقة.</li>
</ul>
<p>وكما يبيّن البند الأخير، فإن السلوك الحالي ناقص وقد يُحسَّن في إصدارات لاحقة.</p>
<h2 id="76-التسمية-الصريحة-للأنواع-الوجودية">7.6 التسمية الصريحة للأنواع الوجودية</h2>
<p>كما شرحنا أعلاه، قد تُدخل مطابقة الأنماط على باني GADT أنواعًا وجودية. وقد أُدخلت صيغة تسمح بتسميتها صراحةً. فمثلًا، تسمّي الشيفرة التالية نوع وسيط <code>f</code> وتستعمل هذا الاسم.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ closure = <span class="hljs-type">Closure</span> : (<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) * <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> closure
<span class="hljs-keyword">let</span> eval = <span class="hljs-keyword">fun</span> (<span class="hljs-type">Closure</span> (<span class="hljs-keyword">type</span> a) (f, x : (a -&gt; _) * _)) -&gt; f (x : a)
</code></pre>
<p>ويجب إدخال جميع متغيّرات النوع الوجودية للباني بالتركيب (<code>type</code> ...) وربطها بتعليمة نوع على خارج وسيط الباني.</p>
<p>ويمكن إضافةً إلى ذلك ربط الأنواع الوجودية التي أُدخلت حديثًا بتنقيح نوع وجودي آخر، إذا ظهرت في نوع الوسائط.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ ty =
  | <span class="hljs-type">Int</span> : <span class="hljs-built_in">int</span> ty
  | <span class="hljs-type">Pair</span> : <span class="hljs-symbol">&#x27;b</span> ty * <span class="hljs-symbol">&#x27;c</span> ty -&gt; (<span class="hljs-symbol">&#x27;b</span> * <span class="hljs-symbol">&#x27;c</span>) ty
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> default : <span class="hljs-keyword">type</span> a. a ty -&gt; a = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Int</span> -&gt; <span class="hljs-number">0</span>
  | <span class="hljs-type">Pair</span> (<span class="hljs-keyword">type</span> b c) (b, c : b ty * c ty) -&gt;
      (default b : b), (default c : c)
</code></pre>
<h2 id="77-معادلات-على-أنواع-مجردة-غير-محلية">7.7 معادلات على أنواع مجرّدة غير محلية</h2>
<p>قد تضيف مطابقة أنماط GADT معادلات نوع إلى أنواع مجرّدة غير محلية أيضًا. والسلوك هو نفسه في الأنواع المجرّدة المحلية. وباتّخاذ النوع <code>eq</code> أعلاه، يمكن كتابة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">M</span> : <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> t <span class="hljs-keyword">val</span> x : t <span class="hljs-keyword">val</span> e : (t,<span class="hljs-built_in">int</span>) eq <span class="hljs-keyword">end</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">33</span>
  <span class="hljs-keyword">let</span> e = <span class="hljs-type">Eq</span>
<span class="hljs-keyword">end</span>

<span class="hljs-keyword">let</span> x : <span class="hljs-built_in">int</span> = <span class="hljs-keyword">let</span> <span class="hljs-type">Eq</span> = <span class="hljs-type">M</span>.e <span class="hljs-keyword">in</span> <span class="hljs-type">M</span>.x
</code></pre>
<h2 id="78-أنواع-تستعمل-مؤشرات-gadt">7.8 أنواع تُستعمل مؤشرات GADT</h2>
<p>استعملنا في حديثنا عن حالات الدحض (7.3) المثال التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> _ t =
  | <span class="hljs-type">Int</span> : <span class="hljs-built_in">int</span> t
  | <span class="hljs-type">Bool</span> : <span class="hljs-built_in">bool</span> t

<span class="hljs-keyword">let</span> deep : (<span class="hljs-built_in">char</span> t * <span class="hljs-built_in">int</span>) option -&gt; <span class="hljs-built_in">char</span> = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">None</span> -&gt; <span class="hljs-string">&#x27;c&#x27;</span>
  | _ -&gt; .
</code></pre>
<p>يستطيع مدقّق الأنواع التحقق من أن الحالة <code>Some _</code> مستحيلة لأن النوع <code>char t</code> خالٍ. وهذا يعتمد على أن الأنواع الواقعة في مؤشر GADT معروفة بأنها متمايزة: فالباني <code>Int</code> يُرجع <code>int t</code>، ونعلم أن <code>int</code> و<code>char</code> نوعان متمايزان، فـ <code>Int</code> مستحيل عند النوع <code>char t</code>، وكذلك الأمر في <code>Bool</code>. وبعبارة أخرى، يتطلب التحقق من استحالة حالة GADT (عند نوع بعينه) استدلالًا على المتباينات بين الأنواع.</p>
<p>ولهذا السبب لا يعمل استعمال الأنواع المجرّدة مؤشرات GADT كما هو مقصود. خذ مثلًا:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* type-level natural numbers, in unary notation *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">TypeNat</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> zero
  <span class="hljs-keyword">type</span> !<span class="hljs-symbol">&#x27;a</span> succ
<span class="hljs-keyword">end</span>

<span class="hljs-keyword">type</span> (<span class="hljs-symbol">&#x27;a</span>, _) sized_list =
  | <span class="hljs-type">Nil</span> : (<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-type">TypeNat</span>.zero) sized_list
  | <span class="hljs-type">Cons</span> : <span class="hljs-symbol">&#x27;a</span> * (<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;n</span>) sized_list -&gt; (<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;n</span> <span class="hljs-type">TypeNat</span>.succ) sized_list
</code></pre>
<p>هذا التعريف لا يسمح باستبعاد حالات معيّنة على أنها مستحيلة كما قصدنا؛ فمثلًا يفشل التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> of_singleton : (<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-type">TypeNat</span>.(zero succ)) sized_list -&gt; <span class="hljs-symbol">&#x27;a</span> = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Cons</span> (v, <span class="hljs-type">Nil</span>) -&gt; v
  | _ -&gt; .

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> <span class="hljs-keyword">match</span> case could not be refuted.
       <span class="hljs-type">Here</span> is an example <span class="hljs-keyword">of</span> a <span class="hljs-keyword">value</span> that would reach it: <span class="hljs-type">Nil</span>
</code></pre>
<p>ولأن <code>zero</code> و<code>succ</code> نوعان مجرّدان، يفترض المترجم أن تعريفهما غير معروف، وأنه قد يكونان في الواقع النوع نفسه. وعلى وجه الخصوص، بهذا التوقيع لا يُعرف أن النوعين <code>zero</code> و<code>zero succ</code> متمايزان (حتى لو كان تنفيذهما متمايزًا)، ولا يستطيع المترجم أن يوافق على أن حالة <code>Nil</code> مستحيلة عند النوع <code>zero succ</code>:<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></p>
<p>ومن طرق الاستدلال على ذلك أن وحدة بالتوقيع نفسه <em>كان يمكن</em> تنفيذها كما يلي، وحيث من الواضح أن <code>zero</code> و<code>zero succ</code> غير متوافقين:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">OtherTypeNat</span> : <span class="hljs-keyword">sig</span>
  <span class="hljs-keyword">type</span> zero
  <span class="hljs-keyword">type</span> !<span class="hljs-symbol">&#x27;a</span> succ
<span class="hljs-keyword">end</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> zero = <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> succ = <span class="hljs-symbol">&#x27;a</span>
<span class="hljs-keyword">end</span>
</code></pre>
<p>والطريقة الموصى بها لتجنّب هذه المشكلة إعطاء تعريف ملموس لأنواع مثل <code>zero</code> و<code>succ</code>، وهي أنواع لا يُقصد استعمالها إلا مؤشرات GADT. (وهذا مخالف للحدس، إذ لن نتعامل أبدًا مع قيم من هذا النوع.) ويمكنك استعمال:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">TypeNat</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> zero = <span class="hljs-type">Zero</span>
  <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> succ = <span class="hljs-type">Succ</span>
<span class="hljs-keyword">end</span>
</code></pre>
<p>والأنواع الآن غير متوافقة لأن أسماء بوانيها مكشوفة ومتمايزة.</p>
<p>وكتحسين إضافي، يمكن تعريف أنواع المؤشرات هذه باستعمال تعليمة <code>private</code>، التي توضّح أنها لا يُقصد استعمالها لبناء القيم:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">TypeNat</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> zero = <span class="hljs-keyword">private</span> <span class="hljs-type">Zero</span>
  <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> succ = <span class="hljs-keyword">private</span> <span class="hljs-type">Succ</span>
<span class="hljs-keyword">end</span>
</code></pre>
<p>ملاحظة: يُقصد عادةً استعمال <code>private</code> في الواجهات لا في التنفيذات؛ انظر توثيق الأنواع الخاصة في 12.3. ولا يمكن استعمال بواني نوع بيانات <em>مُعرَّف</em> بأنه <code>private</code> لبناء القيم، فيكون النوع خاليًا فعليًا. وهذا يجعل من الأوضح أن الأنواع لا يُقصد استعمالها إلا مؤشرات GADT.</p>
<h3 id="781-السلوك-القديم-الأنواع-في-الوحدة-الحالية">7.8.1 السلوك القديم: الأنواع في الوحدة الحالية</h3>
<p>كان للإصدارات المبكرة من OCaml، حتى OCaml 5.4، معالجة خاصة للأنواع المعرّفة في الوحدة الحالية. ولا تنطبق هذه الحالة الخاصة على تعريفي <code>succ</code> و<code>zero</code> اللذين ناقشناهما أعلاه، إذ يقعان في وحدتين فرعيتين منفصلتين.</p>
<p>لذا كانت التعريفات التالية تكفي لتعريف <code>sized_list</code>، لأن المترجم كان يقبل أن <code>zero</code> و<code>'a succ</code> متمايزان دائمًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> zero
<span class="hljs-keyword">type</span> !<span class="hljs-symbol">&#x27;a</span> succ
</code></pre>
<p>وكان الاستدلال أن الأنواع المجرّدة، وإن كان يمكن عمومًا تعريفها بأي شيء في مكان ما من البرنامج، فإن الأنواع المجرّدة التي أدخلناها للتوّ غير معرّفة أصلًا، فيصحّ افتراض أنها متمايزة. وعلى المنوال نفسه، كانت أنواع البيانات المعرّفة في الوحدة الحالية تُعدّ متمايزة حتى لو استعملت أسماء بواني أو حقول نفسها بالضبط.</p>
<p>وقد جعلت هذه الحالة الخاصة النظام أكثر تعقيدًا وأقل نمطية. فمثلًا، كانت أمثلة GADT تعمل جيدًا حين يُعرَّف كل شيء في الوحدة نفسها، لكن تعريفات الدوال الواقعة في وحدة أخرى تفشل، وهو أمر مربك جدًا للمستخدمين.</p>
<p>والبرامج التي تستعمل هذه الميزة المدعومة سابقًا يمكن إعادة كتابتها دائمًا باستعمال تعريفات صريحة بدلًا منها:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> zero = <span class="hljs-keyword">private</span> <span class="hljs-type">Zero</span>
<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> succ = <span class="hljs-keyword">private</span> <span class="hljs-type">Succ</span>
</code></pre>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>احتجنا أيضًا إلى تعليمة حقنية صريحة، <code>type !'a succ</code>، وإلا رُفض تعريف <code>sized_list</code> أيضًا لأن <code>succ</code> مجرّد. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,t={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,p as slug,l as title};
