const s="ocaml-manual",n="ch04",a="الوسائط المُعنونة",l="index",p="الوسائط المُعنونة",t=[{depth:2,id:"41-الوسائط-الاختيارية",text:"4.1 الوسائط الاختيارية"},{depth:2,id:"42-الوسوم-واستنتاج-الأنواع",text:"4.2 الوسوم واستنتاج الأنواع"},{depth:2,id:"43-اقتراحات-لوضع-الوسوم",text:"4.3 اقتراحات لوضع الوسوم"}],e=`<h1>الفصل 4: الوسائط المُعنونة</h1>
<p><em>كتب هذا الفصل جاك غاريغ</em></p>
<p>إذا نظرت في الوحدات التي تنتهي بـ <code>Labels</code> في المكتبة القياسية، فسترى أنّ أنواع الدوال تحمل إضافات لم تكن لديك في الدوال التي عرّفتها بنفسك.</p>
<pre><code class="language-ocaml"># <span class="hljs-type">ListLabels</span>.map;;

- : f:(<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;b</span> <span class="hljs-built_in">list</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-type">StringLabels</span>.sub;;

- : <span class="hljs-built_in">string</span> -&gt; pos:<span class="hljs-built_in">int</span> -&gt; len:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>تُسمّى هذه الإضافات من الشكل <code>name:</code> <em>وسومًا</em>. والغرض منها توثيق الشيفرة، والسماح بمزيد من الفحص، وإعطاء مرونة أكبر في تطبيق الدوال. ويمكنك إعطاء مثل هذه الأسماء للوسائط في برامجك بوضع علامة المدّة <code>~</code> قبلها.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f ~x ~y = x - y;;

<span class="hljs-keyword">val</span> f : x:<span class="hljs-built_in">int</span> -&gt; y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> x = <span class="hljs-number">3</span> <span class="hljs-keyword">and</span> y = <span class="hljs-number">2</span> <span class="hljs-keyword">in</span> f ~x ~y;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>
</code></pre>
<p>وحين تريد استعمال اسمين مختلفين للمتغيّر وللوسم الظاهر في النوع، يمكنك استعمال وسم تسمية من الشكل <code>~name:</code>. وهذا ينطبق أيضًا حين لا يكون الوسيط متغيّرًا.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f ~x:x1 ~y:y1 = x1 - y1;;

<span class="hljs-keyword">val</span> f : x:<span class="hljs-built_in">int</span> -&gt; y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# f ~x:<span class="hljs-number">3</span> ~y:<span class="hljs-number">2</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>
</code></pre>
<p>تخضع الوسوم للقواعد نفسها التي تخضع لها المعرّفات الأخرى في OCaml، أي لا يمكنك استعمال كلمة محجوزة (مثل <code>in</code> أو <code>to</code>) وسمًا.</p>
<p>تُقابَل الوسائط الصورية والوسائط الفعلية وفق وسومها، ويُفسَّر غياب الوسم بأنه الوسم الفارغ. وهذا يسمح بتبديل ترتيب الوسائط في التطبيقات. ويمكن أيضًا تطبيق دالة جزئيًا على أي وسيط، فيُنشأ بذلك دالة جديدة بالوسائط المتبقية.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f ~x ~y = x - y;;

<span class="hljs-keyword">val</span> f : x:<span class="hljs-built_in">int</span> -&gt; y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# f ~y:<span class="hljs-number">2</span> ~x:<span class="hljs-number">3</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">1</span>

# <span class="hljs-type">ListLabels</span>.fold_left;;

- : f:(<span class="hljs-symbol">&#x27;acc</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;acc</span>) -&gt; init:<span class="hljs-symbol">&#x27;acc</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;acc</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-type">ListLabels</span>.fold_left [<span class="hljs-number">1</span>;<span class="hljs-number">2</span>;<span class="hljs-number">3</span>] ~init:<span class="hljs-number">0</span> ~f:( + );;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">6</span>

# <span class="hljs-type">ListLabels</span>.fold_left ~init:<span class="hljs-number">0</span>;;

- : f:(<span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">int</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وإذا حمل عدّة وسائط للدالة الوسم نفسه (أو لم تحمل وسمًا)، فإنها لا تتبادل المواضع بينها، ويكون الترتيب مهمًّا. لكنها تظلّ قادرة على تبادل المواضع مع وسائط أخرى.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> hline ~x:x1 ~x:x2 ~y = (x1, x2, y);;

<span class="hljs-keyword">val</span> hline : x:<span class="hljs-symbol">&#x27;a</span> -&gt; x:<span class="hljs-symbol">&#x27;b</span> -&gt; y:<span class="hljs-symbol">&#x27;c</span> -&gt; <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;b</span> * <span class="hljs-symbol">&#x27;c</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# hline ~x:<span class="hljs-number">3</span> ~y:<span class="hljs-number">2</span> ~x:<span class="hljs-number">5</span>;;

- : <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = (<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>)
</code></pre>
<h2 id="41-الوسائط-الاختيارية">4.1 الوسائط الاختيارية</h2>
<p>من الميزات المثيرة للانتباه في الوسائط المعنونة إمكان جعلها اختيارية. ففي الوسائط الاختيارية تحلّ علامة الاستفهام <code>?</code> محلّ علامة المدّة <code>~</code> التي في غير الاختيارية، ويُسبق الوسم أيضًا بعلامة <code>?</code> في نوع الدالة. ويمكن إعطاء قيم افتراضية لمثل هذه الوسائط الاختيارية.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> bump ?(step = <span class="hljs-number">1</span>) x = x + step;;

<span class="hljs-keyword">val</span> bump : ?step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# bump <span class="hljs-number">2</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span>

# bump ~step:<span class="hljs-number">3</span> <span class="hljs-number">2</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">5</span>
</code></pre>
<p>والدالة التي تأخذ وسائط اختيارية يجب أن تأخذ أيضًا وسيطًا واحدًا غير اختياري على الأقل. والمعيار في الحكم على حذف وسيط اختياري هو التطبيق غير المعنون لوسيط يظهر بعد هذا الوسيط الاختياري في نوع الدالة. لاحظ أنه إذا كان ذلك الوسيط معنونًا، فلن تتمكّن من إزالة الوسائط الاختيارية إلا بتطبيق الدالة تطبيقًا تامًّا، مع حذف كل الوسائط الاختيارية وحذف كل الوسوم من كل الوسائط المتبقية.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> test ?(x = <span class="hljs-number">0</span>) ?(y = <span class="hljs-number">0</span>) <span class="hljs-literal">()</span> ?(z = <span class="hljs-number">0</span>) <span class="hljs-literal">()</span> = (x, y, z);;

<span class="hljs-keyword">val</span> test : ?x:<span class="hljs-built_in">int</span> -&gt; ?y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span> -&gt; ?z:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> =
  &lt;<span class="hljs-keyword">fun</span>&gt;

# test <span class="hljs-literal">()</span>;;

- : ?z:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# test ~x:<span class="hljs-number">2</span> <span class="hljs-literal">()</span> ~z:<span class="hljs-number">3</span> <span class="hljs-literal">()</span>;;

- : <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = (<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>)
</code></pre>
<p>ويمكن أن تتبادل الوسائط الاختيارية مواضعها مع الوسائط غير الاختيارية أو غير المعنونة، ما دامت تُطبَّق في الوقت نفسه. وبحكم طبيعتها، لا تتبادل الوسائط الاختيارية مواضعها مع الوسائط غير المعنونة المطبَّقة مستقلّةً.</p>
<pre><code class="language-ocaml"># test ~y:<span class="hljs-number">2</span> ~x:<span class="hljs-number">3</span> <span class="hljs-literal">()</span> <span class="hljs-literal">()</span>;;

- : <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = (<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>)

# test <span class="hljs-literal">()</span> <span class="hljs-literal">()</span> ~z:<span class="hljs-number">1</span> ~y:<span class="hljs-number">2</span> ~x:<span class="hljs-number">3</span>;;

- : <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = (<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>)

# (test <span class="hljs-literal">()</span> <span class="hljs-literal">()</span>) ~z:<span class="hljs-number">1</span> ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> expression has <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span>
       <span class="hljs-type">This</span> is not a <span class="hljs-keyword">function</span>; it cannot be applied.
</code></pre>
<p>فهنا <code>(test () ())</code> هو <code>(0,0,0)</code> سلفًا، ولا يمكن تطبيقه أكثر.</p>
<p>والوسائط الاختيارية تُنفَّذ في الواقع كأنواع خيارية. فإن لم تعطِ قيمة افتراضية، أمكنك الوصول إلى تمثيلها الداخلي، <code>type 'a option = None | Some of 'a</code>. وحينها يمكنك تقديم سلوكيات مختلفة بحسب حضور الوسيط أو غيابه.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> bump ?step x =
    <span class="hljs-keyword">match</span> step <span class="hljs-keyword">with</span>
    | <span class="hljs-type">None</span> -&gt; x * <span class="hljs-number">2</span>
    | <span class="hljs-type">Some</span> y -&gt; x + y
  ;;

<span class="hljs-keyword">val</span> bump : ?step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وقد يكون مفيدًا أيضًا تمرير وسيط اختياري من استدعاء دالة إلى آخر. ويتم ذلك بوضع علامة <code>?</code> قبل الوسيط المطبَّق. فعلامة الاستفهام هذه تُعطّل تغليف الوسيط الاختياري في نوع خياري.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> test2 ?x ?y <span class="hljs-literal">()</span> = test ?x ?y <span class="hljs-literal">()</span> <span class="hljs-literal">()</span>;;

<span class="hljs-keyword">val</span> test2 : ?x:<span class="hljs-built_in">int</span> -&gt; ?y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# test2 ?x:<span class="hljs-type">None</span>;;

- : ?y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span> -&gt; <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> * <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<h2 id="42-الوسوم-واستنتاج-الأنواع">4.2 الوسوم واستنتاج الأنواع</h2>
<p>رغم أنها تزيد الراحة في كتابة تطبيقات الدوال، فإنّ في الوسوم والوسائط الاختيارية مَزلقًا هو أنها لا يمكن استنتاجها استنتاجًا تامًّا كما هي الحال في بقيّة اللغة.</p>
<p>ويمكنك رؤية ذلك في المثالين التاليين.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> h&#x27; g = g ~y:<span class="hljs-number">2</span> ~x:<span class="hljs-number">3</span>;;

<span class="hljs-keyword">val</span> h&#x27; : (y:<span class="hljs-built_in">int</span> -&gt; x:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# h&#x27; f ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> f has <span class="hljs-keyword">type</span> x:<span class="hljs-built_in">int</span> -&gt; y:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> y:<span class="hljs-built_in">int</span> -&gt; x:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span>
       <span class="hljs-type">Labels</span> x <span class="hljs-keyword">and</span> y <span class="hljs-keyword">do</span> not <span class="hljs-keyword">match</span>

# <span class="hljs-keyword">let</span> bump_it bump x =
    bump ~step:<span class="hljs-number">2</span> x;;

<span class="hljs-keyword">val</span> bump_it : (step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# bump_it bump <span class="hljs-number">1</span> ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> bump has <span class="hljs-keyword">type</span> ?step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
       <span class="hljs-type">The</span> label ?step was expected <span class="hljs-keyword">to</span> not be optional
</code></pre>
<p>الحالة الأولى بسيطة: يُمرَّر إلى <code>g</code> الوسم <code>~y</code> ثم <code>~x</code>، بينما تتوقّع <code>f</code> الوسم <code>~x</code> ثم <code>~y</code>. ويُعالَج هذا معالجة صحيحة إذا عرفنا نوع <code>g</code> سلفًا أنه <code>x:int -&gt; y:int -&gt; int</code>، وإلّا حصل التعارض النوعي المذكور أعلاه. وأبسط حلّ هو تطبيق الوسائط الصورية بترتيب معياري.</p>
<p>أمّا المثال الثاني فأدقّ: فرغم أننا قصدنا أن يكون الوسيط <code>bump</code> من النوع <code>?step:int -&gt; int -&gt; int</code>، استُنتج أن نوعه <code>step:int -&gt; int -&gt; 'a</code>. ولأنّ هذين النوعين غير متوافقين (فالوسائط العادية والاختيارية مختلفة داخليًا)، يحدث خطأ نوع عند تطبيق <code>bump_it</code> على الدالة <code>bump</code> الحقيقية.</p>
<p>لن نحاول هنا شرح كيفية عمل استنتاج الأنواع بالتفصيل. يكفي أن تفهم أنّ في البرنامج أعلاه معلومات غير كافية لاستنتاج النوع الصحيح لـ <code>g</code> أو لـ <code>bump</code>. أي أنه لا سبيل إلى معرفة ما إذا كان الوسيط اختياريًا أم لا، ولا إلى معرفة الترتيب الصحيح، بالنظر إلى كيفية تطبيق الدالة فقط. والاستراتيجية التي يستعملها المترجم هي افتراض عدم وجود وسائط اختيارية، وأنّ التطبيقات تجري بالترتيب الصحيح.</p>
<p>والطريقة الصحيحة لحلّ هذه المشكلة في الوسائط الاختيارية هي إضافة إضافة نوع إلى الوسيط <code>bump</code>.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> bump_it (bump : ?step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) x =
    bump ~step:<span class="hljs-number">2</span> x;;

<span class="hljs-keyword">val</span> bump_it : (?step:<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# bump_it bump <span class="hljs-number">1</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span>
</code></pre>
<p>وعمليًا، تظهر مثل هذه المشكلات غالبًا عند استعمال كائنات دوالها ذات وسائط اختيارية، لذا فكتابة نوع وسائط الكائنات فكرة حسنة في الغالب.</p>
<p>وبشكل عادي يولّد المترجم خطأ نوع إذا حاولت تمرير وسيط نوعه مختلف عن المتوقّع إلى دالة. غير أنه في الحالة الخاصة التي يكون فيها النوع المتوقّع نوع دالة غير معنون، والوسيط دالة تتوقّع وسائط اختيارية، سيحاول المترجم تحويل الوسيط ليطابق النوع المتوقّع، بتمرير <code>None</code> لكل الوسائط الاختيارية.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> twice f (x : <span class="hljs-built_in">int</span>) = f(f x);;

<span class="hljs-keyword">val</span> twice : (<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# twice bump <span class="hljs-number">2</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">8</span>
</code></pre>
<p>وهذا التحويل متّسق مع الدلالة المقصودة، بما في ذلك الآثار الجانبية. أي أنه إذا كان تطبيق الوسائط الاختيارية سيُنتج آثارًا جانبية، فإنّ هذه الآثار تؤجَّل إلى أن تُطبَّق الدالة المستقبِلة فعلًا على وسيط.</p>
<h2 id="43-اقتراحات-لوضع-الوسوم">4.3 اقتراحات لوضع الوسوم</h2>
<p>كما في اختيار الأسماء، ليس اختيار وسوم الدوال مهمّة سهلة. والوسم الجيّد هو الذي</p>
<ul>
<li>
<p>يجعل البرامج أكثر قابلية للقراءة،</p>
</li>
<li>
<p>يسهل تذكّره،</p>
</li>
<li>
<p>يسمح، حين أمكن، بتطبيقات جزئية مفيدة.</p>
</li>
</ul>
<p>نشرح هنا القواعد التي طبّقناها عند وضع وسوم مكتبات OCaml.</p>
<p>إذا تحدّثنا بطريقة «كائنية»، يمكن اعتبار أنّ لكل دالة وسيطًا رئيسيًا، هو <em>كائنها</em>، ووسائط أخرى تتعلّق بفعلها، هي <em>المعاملات</em>. وللسماح بتركيب الدوال عبر الدوال العليا في نمط الوسوم المتبادلة، لن يُوسم الكائن. فدوره واضح من الدالة نفسها. أمّا المعاملات فتُوسم بأسماء تُذكِّر بطبيعتها أو بدورها. وأفضل الوسوم ما يجمع بين الطبيعة والدور. وحين يتعذّر ذلك يُفضَّل الدور، لأنّ الطبيعة سيُعطيها النوع نفسه في الغالب. وينبغي تجنّب الاختصارات الغامضة.</p>
<pre><code class="language-text">ListLabels.map : f:(&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list
UnixLabels.write : file_descr -&gt; buf:bytes -&gt; pos:int -&gt; len:int -&gt; unit
</code></pre>
<p>وحين تكون هناك عدّة كائنات بالطبيعة والدور نفسيهما، تُترك كلها بلا وسم.</p>
<pre><code class="language-text">ListLabels.iter2 : f:(&#x27;a -&gt; &#x27;b -&gt; unit) -&gt; &#x27;a list -&gt; &#x27;b list -&gt; unit
</code></pre>
<p>وحين لا يوجد كائن مفضَّل، تُوسم كل الوسائط.</p>
<pre><code class="language-text">BytesLabels.blit :
  src:bytes -&gt; src_pos:int -&gt; dst:bytes -&gt; dst_pos:int -&gt; len:int -&gt; unit
</code></pre>
<p>غير أنه حين يكون هناك وسيط واحد فقط، يُترك في الغالب بلا وسم.</p>
<pre><code class="language-text">BytesLabels.create : int -&gt; bytes
</code></pre>
<p>وينطبق هذا المبدأ أيضًا على دوال بعدّة وسائط نوع إرجاعها متغيّر نوع، ما دام دور كل وسيط غير ملتبس. فوضع وسوم على مثل هذه الدوال قد يقود إلى رسائل خطأ رديئة حين تحاول حذف الوسوم في تطبيق ما، كما رأينا مع <code>ListLabels.fold_left</code>.</p>
<p>وفي ما يلي بعض أسماء الوسوم التي ستجدها في أنحاء المكتبات.</p>
<table>
<thead>
<tr>
<th><strong>الوسم</strong></th>
<th><strong>المعنى</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>f:</code></td>
<td>دالة يُطبَّق عليها</td>
</tr>
<tr>
<td><code>pos:</code></td>
<td>موضع في سلسلة أو مصفوفة أو متتالية بايتات</td>
</tr>
<tr>
<td><code>len:</code></td>
<td>طول</td>
</tr>
<tr>
<td><code>buf:</code></td>
<td>متتالية بايتات أو سلسلة تُستعمل مخزنًا مؤقتًا</td>
</tr>
<tr>
<td><code>src:</code></td>
<td>مصدر العملية</td>
</tr>
<tr>
<td><code>dst:</code></td>
<td>هدف العملية</td>
</tr>
<tr>
<td><code>init:</code></td>
<td>القيمة الابتدائية لمكرِّر</td>
</tr>
<tr>
<td><code>cmp:</code></td>
<td>دالة مقارنة، <em>مثل</em> <code>Stdlib.compare</code></td>
</tr>
<tr>
<td><code>mode:</code></td>
<td>نمط عملية أو قائمة أعلام</td>
</tr>
</tbody>
</table>
<p>كل هذه مجرّد اقتراحات، لكن تذكّر أنّ اختيار الوسوم أساسي لقابلية القراءة. فالاختيارات الغريبة ستجعل البرنامج أصعب في الصيانة.</p>
<p>وفي الحالة المثالية، ينبغي أن يكفي اسم الدالة الصحيح مع الوسوم الصحيحة لفهم معنى الدالة. ولأنّ هذه المعلومات متاحة في OCamlBrowser أو في المستوى الأعلى <code>ocaml</code>، لا يُستعمل التوثيق إلا عند الحاجة إلى مواصفة أكثر تفصيلًا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
