const s="ocaml-manual",a="ch05",n="المتغيّرات متعدّدة الأشكال",l="index",p="المتغيّرات متعدّدة الأشكال",c=[{depth:2,id:"51-الاستعمال-الأساسي",text:"5.1 الاستعمال الأساسي"},{depth:2,id:"52-الاستعمال-المتقدم",text:"5.2 الاستعمال المتقدّم"},{depth:2,id:"53-مواطن-ضعف-المتغيرات-متعددة-الأشكال",text:"5.3 مواطن ضعف المتغيّرات متعدّدة الأشكال"}],e=`<h1>الفصل 5: المتغيّرات متعدّدة الأشكال</h1>
<p><em>كتب هذا الفصل جاك غاريغ</em></p>
<p>المتغيّرات كما عُرضت في القسم 1.4 أداة قوية لبناء بنى المعطيات والخوارزميات. غير أنها تفتقر أحيانًا إلى المرونة عند استعمالها في البرمجة المعيارية. والسبب أنّ كل باني يُنسب إلى نوع وحيد عند تعريفه واستعماله. فحتى لو ظهر الاسم نفسه في تعريف أنواع متعدّدة، فإنّ الباني نفسه ينتمي إلى نوع واحد فقط. ولذلك لا يمكن الحكم بأنّ بانيًا معيّنًا ينتمي إلى أنواع متعدّدة، ولا اعتبار قيمة من نوع ما تنتمي إلى نوع آخر ذي بوانٍ أكثر.</p>
<p>ومع المتغيّرات متعدّدة الأشكال يُرفع هذا الافتراض الأصلي. أي أنّ وسم المتغيّر لا ينتمي إلى أي نوع بعينه، بل يتحقّق نظام الأنواع فقط من أنه قيمة مقبولة بحسب استعماله. فلا حاجة إلى تعريف نوع قبل استعمال وسم متغيّر. وسيُستنتج نوع متغيّر مستقلًّا لكل استعمال من استعمالاته.</p>
<h2 id="51-الاستعمال-الأساسي">5.1 الاستعمال الأساسي</h2>
<p>تعمل المتغيّرات متعدّدة الأشكال في البرامج عمل المتغيّرات العادية. ما عليك إلا أن تسبق أسماءها بعلامة الخلف.</p>
<pre><code class="language-ocaml"># [<span class="hljs-type">\`On</span>; <span class="hljs-type">\`Off</span>];;

- : [&gt; <span class="hljs-type">\`Off</span> | <span class="hljs-type">\`On</span> ] <span class="hljs-built_in">list</span> = [<span class="hljs-type">\`On</span>; <span class="hljs-type">\`Off</span>]

# <span class="hljs-type">\`Number</span> <span class="hljs-number">1</span>;;

- : [&gt; <span class="hljs-type">\`Number</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> ] = <span class="hljs-type">\`Number</span> <span class="hljs-number">1</span>

# <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">function</span> <span class="hljs-type">\`On</span> -&gt; <span class="hljs-number">1</span> | <span class="hljs-type">\`Off</span> -&gt; <span class="hljs-number">0</span> | <span class="hljs-type">\`Number</span> n -&gt; n;;

<span class="hljs-keyword">val</span> f : [&lt; <span class="hljs-type">\`Number</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`Off</span> | <span class="hljs-type">\`On</span> ] -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-type">List</span>.map f [<span class="hljs-type">\`On</span>; <span class="hljs-type">\`Off</span>];;

- : <span class="hljs-built_in">int</span> <span class="hljs-built_in">list</span> = [<span class="hljs-number">1</span>; <span class="hljs-number">0</span>]
</code></pre>
<p>النوع <code>[&gt;\`Off|\`On] list</code> يعني أنه لمطابقة هذه القائمة، يجب أن تكون قادرًا على مطابقة <code>\`Off</code> و<code>\`On</code> على الأقل، من دون وسيط. والنوع <code>[&lt;\`On|\`Off|\`Number of int]</code> يعني أنه يجوز تطبيق <code>f</code> على <code>\`Off</code> و<code>\`On</code> (كلاهما من دون وسيط)، أو على <code>\`Number</code> <em>n</em> حيث <em>n</em> عدد صحيح. وتُظهر علامتا <code>&gt;</code> و<code>&lt;</code> داخل أنواع المتغيّرات أنها قد تُصقَل بعد، إمّا بتعريف وسوم أكثر، وإمّا بالسماح بوسوم أقل. ومن ثمّ فهي تحتوي متغيّر نوع ضمنيًا. ولأنّ كلًّا من أنواع المتغيّرات هذه يظهر مرّة واحدة فقط في النوع كله، فلا تُعرض متغيّرات نوعها الضمنية.</p>
<p>كانت أنواع المتغيّرات أعلاه متعدّدة الأشكال، إذ تسمح بمزيد من الصقل. أمّا عند كتابة إضافات الأنواع، فسيصف المرء في الغالب أنواع متغيّرات مثبّتة، أي أنواعًا لا يمكن صقلها. وهذا هو الحال أيضًا في اختصارات الأنواع. فلا تحتوي مثل هذه الأنواع علامتي <code>&lt;</code> أو <code>&gt;</code>، بل مجرّد تعداد للوسوم وأنواعها المرتبطة، تمامًا كما في تعريف نوع معطيات عادي.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> vlist = [<span class="hljs-type">\`Nil</span> | <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> vlist];;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> vlist = [ <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> vlist | <span class="hljs-type">\`Nil</span> ]

# <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f : <span class="hljs-symbol">&#x27;a</span> vlist -&gt; <span class="hljs-symbol">&#x27;b</span> vlist = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`Nil</span> -&gt; <span class="hljs-type">\`Nil</span>
    | <span class="hljs-type">\`Cons</span>(a, l) -&gt; <span class="hljs-type">\`Cons</span>(f a, map f l)
  ;;

<span class="hljs-keyword">val</span> map : (<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> vlist -&gt; <span class="hljs-symbol">&#x27;b</span> vlist = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<h2 id="52-الاستعمال-المتقدم">5.2 الاستعمال المتقدّم</h2>
<p>فحص أنواع المتغيّرات متعدّدة الأشكال أمر دقيق، وقد تُنتج بعض التعابير معلومات نوع أعقد.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">function</span> <span class="hljs-type">\`A</span> -&gt; <span class="hljs-type">\`C</span> | <span class="hljs-type">\`B</span> -&gt; <span class="hljs-type">\`D</span> | x -&gt; x;;

<span class="hljs-keyword">val</span> f : ([&gt; <span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> | <span class="hljs-type">\`D</span> ] <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;a</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# f <span class="hljs-type">\`E</span>;;

- : [&gt; <span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> | <span class="hljs-type">\`D</span> | <span class="hljs-type">\`E</span> ] = <span class="hljs-type">\`E</span>
</code></pre>
<p>نرى هنا ظاهرتين. أولًا، بما أنّ هذه المطابقة مفتوحة (فالحالة الأخيرة تلتقط أي وسم)، نحصل على النوع <code>[&gt; \`A | \`B]</code> بدلًا من <code>[&lt; \`A | \`B]</code> كما في مطابقة مغلقة. ثم، بما أنّ <code>x</code> يُعاد كما هو، فنوعا المدخل والمخرج متطابقان. والتدوين <code>as 'a</code> يدلّ على هذا التشارك في النوع. وإذا طبّقنا <code>f</code> على وسم آخر <code>\`E</code>، أُضيف إلى القائمة.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f1 = <span class="hljs-keyword">function</span> <span class="hljs-type">\`A</span> x -&gt; x = <span class="hljs-number">1</span> | <span class="hljs-type">\`B</span> -&gt; <span class="hljs-literal">true</span> | <span class="hljs-type">\`C</span> -&gt; <span class="hljs-literal">false</span>
  <span class="hljs-keyword">let</span> f2 = <span class="hljs-keyword">function</span> <span class="hljs-type">\`A</span> x -&gt; x = <span class="hljs-string">&quot;a&quot;</span> | <span class="hljs-type">\`B</span> -&gt; <span class="hljs-literal">true</span> ;;

<span class="hljs-keyword">val</span> f1 : [&lt; <span class="hljs-type">\`A</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> ] -&gt; <span class="hljs-built_in">bool</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
<span class="hljs-keyword">val</span> f2 : [&lt; <span class="hljs-type">\`A</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">string</span> | <span class="hljs-type">\`B</span> ] -&gt; <span class="hljs-built_in">bool</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> f x = f1 x &amp;&amp; f2 x;;

<span class="hljs-keyword">val</span> f : [&lt; <span class="hljs-type">\`A</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">string</span> &amp; <span class="hljs-built_in">int</span> | <span class="hljs-type">\`B</span> ] -&gt; <span class="hljs-built_in">bool</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>هنا تقبل كل من <code>f1</code> و<code>f2</code> الوسمين <code>\`A</code> و<code>\`B</code>، لكنّ وسيط <code>\`A</code> من النوع <code>int</code> في <code>f1</code> ومن النوع <code>string</code> في <code>f2</code>. وفي نوع <code>f</code> يختفي <code>\`C</code>، الذي لا يقبله إلا <code>f1</code>، أمّا نوعا الوسيط فيظهران معًا لـ <code>\`A</code> على شكل <code>int &amp; string</code>. وهذا يعني أنه إذا مرّرنا الوسم <code>\`A</code> إلى <code>f</code>، وجب أن يكون وسيطه <code>int</code> و<code>string</code> معًا في الوقت نفسه. ولأنّ مثل هذه القيمة غير موجودة، لا يمكن تطبيق <code>f</code> على <code>\`A</code>، ويكون <code>\`B</code> المدخل الوحيد المقبول.</p>
<p>وحتى إذا كان لقيمة نوع متغيّر مثبّت، يمكن إعطاؤها نوعًا أكبر عبر الإكراهات. وتُكتب الإكراهات عادةً بنوعي المصدر والهدف، لكن يمكن حذف نوع المصدر في الحالات البسيطة.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> wlist = [<span class="hljs-type">\`Nil</span> | <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> wlist | <span class="hljs-type">\`Snoc</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> wlist * <span class="hljs-symbol">&#x27;a</span>];;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> wlist = [ <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> wlist | <span class="hljs-type">\`Nil</span> | <span class="hljs-type">\`Snoc</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> wlist * <span class="hljs-symbol">&#x27;a</span> ]

# <span class="hljs-keyword">let</span> wlist_of_vlist  l = (l : <span class="hljs-symbol">&#x27;a</span> vlist :&gt; <span class="hljs-symbol">&#x27;a</span> wlist);;

<span class="hljs-keyword">val</span> wlist_of_vlist : <span class="hljs-symbol">&#x27;a</span> vlist -&gt; <span class="hljs-symbol">&#x27;a</span> wlist = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> open_vlist l = (l : <span class="hljs-symbol">&#x27;a</span> vlist :&gt; [&gt; <span class="hljs-symbol">&#x27;a</span> vlist]);;

<span class="hljs-keyword">val</span> open_vlist : <span class="hljs-symbol">&#x27;a</span> vlist -&gt; [&gt; <span class="hljs-symbol">&#x27;a</span> vlist ] = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">fun</span> x -&gt; (x :&gt; [<span class="hljs-type">\`A</span>|<span class="hljs-type">\`B</span>|<span class="hljs-type">\`C</span>]);;

- : [&lt; <span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> ] -&gt; [ <span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> ] = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>ويمكنك أيضًا إكراه القيم إكراهًا انتقائيًا عبر مطابقة الأنماط.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> split_cases = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`Nil</span> | <span class="hljs-type">\`Cons</span> _ <span class="hljs-keyword">as</span> x -&gt; <span class="hljs-type">\`A</span> x
    | <span class="hljs-type">\`Snoc</span> _ <span class="hljs-keyword">as</span> x -&gt; <span class="hljs-type">\`B</span> x
  ;;

<span class="hljs-keyword">val</span> split_cases :
  [&lt; <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">\`Nil</span> | <span class="hljs-type">\`Snoc</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;b</span> ] -&gt;
  [&gt; <span class="hljs-type">\`A</span> <span class="hljs-keyword">of</span> [&gt; <span class="hljs-type">\`Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">\`Nil</span> ] | <span class="hljs-type">\`B</span> <span class="hljs-keyword">of</span> [&gt; <span class="hljs-type">\`Snoc</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;b</span> ] ] = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وعندما يُغلَّف نمط «أو» مؤلَّف من وسوم متغيّرات داخل نمط مستعار، يُعطى الاسم المستعار نوعًا يحتوي فقط الوسوم المعدودة في نمط «أو». وهذا يسمح بأدوات مفيدة كثيرة، مثل التعريف التدريجي للدوال.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> num x = <span class="hljs-type">\`Num</span> x
  <span class="hljs-keyword">let</span> eval1 eval (<span class="hljs-type">\`Num</span> x) = x
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> eval x = eval1 eval x ;;

<span class="hljs-keyword">val</span> num : <span class="hljs-symbol">&#x27;a</span> -&gt; [&gt; <span class="hljs-type">\`Num</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> ] = &lt;<span class="hljs-keyword">fun</span>&gt;
<span class="hljs-keyword">val</span> eval1 : <span class="hljs-symbol">&#x27;a</span> -&gt; [&lt; <span class="hljs-type">\`Num</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;b</span> ] -&gt; <span class="hljs-symbol">&#x27;b</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
<span class="hljs-keyword">val</span> eval : [&lt; <span class="hljs-type">\`Num</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> ] -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> plus x y = <span class="hljs-type">\`Plus</span>(x,y)
  <span class="hljs-keyword">let</span> eval2 eval = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`Plus</span>(x,y) -&gt; eval x + eval y
    | <span class="hljs-type">\`Num</span> _ <span class="hljs-keyword">as</span> x -&gt; eval1 eval x
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> eval x = eval2 eval x ;;

<span class="hljs-keyword">val</span> plus : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; [&gt; <span class="hljs-type">\`Plus</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;b</span> ] = &lt;<span class="hljs-keyword">fun</span>&gt;
<span class="hljs-keyword">val</span> eval2 : (<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">int</span>) -&gt; [&lt; <span class="hljs-type">\`Num</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`Plus</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> ] -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
<span class="hljs-keyword">val</span> eval : ([&lt; <span class="hljs-type">\`Num</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`Plus</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> ] <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;a</span>) -&gt; <span class="hljs-built_in">int</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>ولجعل هذا أيسر، يمكنك استعمال تعريفات الأنواع اختصاراتٍ لأنماط «أو». أي أنه إذا عرّفت <code>type myvariant = [\`Tag1 of int | \`Tag2 of bool]</code>، فإنّ النمط <code>#myvariant</code> يكافئ كتابة <code>(\`Tag1(_ : int) | \`Tag2(_ : bool))</code>.</p>
<p>ويمكن استعمال هذه الاختصارات وحدها،</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">function</span>
    | #myvariant -&gt; <span class="hljs-string">&quot;myvariant&quot;</span>
    | <span class="hljs-type">\`Tag3</span> -&gt; <span class="hljs-string">&quot;Tag3&quot;</span>;;

<span class="hljs-keyword">val</span> f : [&lt; <span class="hljs-type">\`Tag1</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`Tag2</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">bool</span> | <span class="hljs-type">\`Tag3</span> ] -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>أو مقترنة بأسماء مستعارة.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> g1 = <span class="hljs-keyword">function</span> <span class="hljs-type">\`Tag1</span> _ -&gt; <span class="hljs-string">&quot;Tag1&quot;</span> | <span class="hljs-type">\`Tag2</span> _ -&gt; <span class="hljs-string">&quot;Tag2&quot;</span>;;

<span class="hljs-keyword">val</span> g1 : [&lt; <span class="hljs-type">\`Tag1</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">\`Tag2</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;b</span> ] -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> g = <span class="hljs-keyword">function</span>
    | #myvariant <span class="hljs-keyword">as</span> x -&gt; g1 x
    | <span class="hljs-type">\`Tag3</span> -&gt; <span class="hljs-string">&quot;Tag3&quot;</span>;;

<span class="hljs-keyword">val</span> g : [&lt; <span class="hljs-type">\`Tag1</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> | <span class="hljs-type">\`Tag2</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">bool</span> | <span class="hljs-type">\`Tag3</span> ] -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<h2 id="53-مواطن-ضعف-المتغيرات-متعددة-الأشكال">5.3 مواطن ضعف المتغيّرات متعدّدة الأشكال</h2>
<p>بعد أن رأينا قوة المتغيّرات متعدّدة الأشكال، قد يتساءل المرء لماذا أُضيفت إلى متغيّرات اللغة الأساسية بدلًا من أن تحلّ محلّها.</p>
<p>والجواب ذو شقّين. الشقّ الأول أنه رغم كونها فعّالة جدًّا، فإنّ غياب معلومات الأنواع الساكنة يسمح بتحسينات أقل، ويجعل المتغيّرات متعدّدة الأشكال أثقل قليلًا من متغيّرات اللغة الأساسية. غير أنّ الفروق الملحوظة لا تظهر إلا في بنى معطيات ضخمة.</p>
<p>والأهمّ أنّ المتغيّرات متعدّدة الأشكال، رغم كونها آمنة نوعيًا، تؤدّي إلى انضباط نوعي أضعف. أي أنّ متغيّرات اللغة الأساسية تفعل في الواقع أكثر بكثير من ضمان السلامة النوعية، فهي تتحقّق أيضًا من أنك لا تستعمل إلا البواني المعلنة، وأنّ كل البواني الحاضرة في بنية معطيات متوافقة، وتفرض قيود أنواع على وسائطها.</p>
<p>ولهذا السبب، يجب أن تكون أكثر حرصًا على جعل الأنواع صريحة عند استعمال المتغيّرات متعدّدة الأشكال. وحين تكتب مكتبة، يكون هذا سهلًا لأنك تستطيع وصف أنواع دقيقة في الواجهات، أمّا في البرامج البسيطة فالأرجح أن تكون متغيّرات اللغة الأساسية أفضل لك.</p>
<p>واحذر أيضًا أنّ بعض الأساليب تجعل الأخطاء التافهة صعبة الاكتشاف جدًّا. فمثلًا الشيفرة التالية خاطئة على الأرجح، لكن لا سبيل للمترجم إلى رؤية ذلك.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> abc = [<span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span>] ;;

<span class="hljs-keyword">type</span> abc = [ <span class="hljs-type">\`A</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> ]

# <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`As</span> -&gt; <span class="hljs-string">&quot;A&quot;</span>
    | #abc -&gt; <span class="hljs-string">&quot;other&quot;</span> ;;

<span class="hljs-keyword">val</span> f : [&lt; <span class="hljs-type">\`A</span> | <span class="hljs-type">\`As</span> | <span class="hljs-type">\`B</span> | <span class="hljs-type">\`C</span> ] -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> f : abc -&gt; <span class="hljs-built_in">string</span> = f ;;

<span class="hljs-keyword">val</span> f : abc -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>ويمكنك تجنّب مثل هذه المخاطر بإضافة نوع إلى التعريف نفسه.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> f : abc -&gt; <span class="hljs-built_in">string</span> = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">\`As</span> -&gt; <span class="hljs-string">&quot;A&quot;</span>
    | #abc -&gt; <span class="hljs-string">&quot;other&quot;</span> ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> pattern matches values <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> [? <span class="hljs-type">\`As</span> ]
       but a pattern was expected which matches values <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> abc
       <span class="hljs-type">The</span> second variant <span class="hljs-keyword">type</span> does not allow tag(s) <span class="hljs-type">\`As</span>
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:c,html:e};export{s as book,a as chapter,n as chapterTitle,t as default,c as headings,e as html,l as slug,p as title};
