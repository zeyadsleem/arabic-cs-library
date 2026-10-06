const s="ocaml-cs3110",p="hop",a="Higher-Order Programming",n="index",e="البرمجة من الرتبة العليا",l=[{depth:2,id:"4-البرمجة-من-الرتبة-العليا",text:"4. البرمجة من الرتبة العليا"},{depth:2,id:"41-الدوال-من-الرتبة-العليا",text:"4.1. الدوال من الرتبة العليا"},{depth:3,id:"411-مبدأ-التجريد",text:"4.1.1. مبدأ التجريد"},{depth:3,id:"412-معنى-الرتبة-العليا",text:"4.1.2. معنى «الرتبة العليا»"},{depth:3,id:"413-دوال-شهيرة-من-الرتبة-العليا",text:"4.1.3. دوال شهيرة من الرتبة العليا"},{depth:2,id:"42-map",text:"4.2. Map"},{depth:3,id:"421-الآثار-الجانبية",text:"4.2.1. الآثار الجانبية"},{depth:3,id:"422-map-والتعاود-الذيلي",text:"4.2.2. Map والتعاود الذيلي"},{depth:3,id:"423-map-في-لغات-أخرى",text:"4.2.3. Map في لغات أخرى"},{depth:2,id:"43-filter",text:"4.3. Filter"},{depth:3,id:"431-filter-والتعاود-الذيلي",text:"4.3.1. Filter والتعاود الذيلي"},{depth:3,id:"432-filter-في-لغات-أخرى",text:"4.3.2. Filter في لغات أخرى"},{depth:2,id:"44-fold",text:"4.4. Fold"},{depth:3,id:"441-combine",text:"4.4.1. Combine"},{depth:3,id:"442-الطي-نحو-اليمين-fold-right",text:"4.4.2. الطي نحو اليمين (Fold Right)"},{depth:3,id:"443-التعاود-الذيلي-وcombine",text:"4.4.3. التعاود الذيلي وCombine"},{depth:3,id:"444-الطي-نحو-اليسار-fold-left",text:"4.4.4. الطي نحو اليسار (Fold Left)"},{depth:3,id:"445-الطي-نحو-اليسار-مقابل-الطي-نحو-اليمين",text:"4.4.5. الطي نحو اليسار مقابل الطي نحو اليمين"},{depth:3,id:"446-استطراد-عن-الوسائط-المسماة-وfold",text:"4.4.6. استطراد عن الوسائط المسمّاة وFold"},{depth:3,id:"447-استخدام-fold-لتنفيذ-دوال-أخرى",text:"4.4.7. استخدام Fold لتنفيذ دوال أخرى"},{depth:3,id:"448-fold-مقابل-التعاود-مقابل-المكتبة",text:"4.4.8. Fold مقابل التعاود مقابل المكتبة"},{depth:2,id:"45-ما-بعد-القوائم",text:"4.5. ما بعد القوائم"},{depth:3,id:"451-map-على-الأشجار",text:"4.5.1. Map على الأشجار"},{depth:3,id:"452-fold-على-الأشجار",text:"4.5.2. Fold على الأشجار"},{depth:3,id:"453-filter-على-الأشجار",text:"4.5.3. Filter على الأشجار"},{depth:2,id:"46-خطوط-الأنابيب",text:"4.6. خطوط الأنابيب"},{depth:2,id:"47-الكاري",text:"4.7. الكاري"},{depth:2,id:"48-قوانين-جبرية-للدوال-من-الرتبة-العليا",text:"4.8. قوانين جبرية للدوال من الرتبة العليا"},{depth:3,id:"481-ثلاث-دواليات-صغيرة",text:"4.8.1. ثلاث دواليات صغيرة"},{depth:3,id:"482-دمج-map-وfilter",text:"4.8.2. دمج Map وFilter"},{depth:3,id:"483-دمج-map-أو-filter-في-طي-نحو-اليمين",text:"4.8.3. دمج Map أو Filter في طي نحو اليمين"},{depth:3,id:"484-دمج-خط-أنابيب-كامل",text:"4.8.4. دمج خط أنابيب كامل"},{depth:3,id:"485-قانون-ذو-صلة-للطي-نحو-اليسار",text:"4.8.5. قانون ذو صلة للطي نحو اليسار"},{depth:3,id:"486-عن-الحاجة-إلى-دوال-نقية",text:"4.8.6. عن الحاجة إلى دوال نقية"},{depth:2,id:"49-الملخص",text:"4.9. الملخّص"},{depth:3,id:"491-المصطلحات-والمفاهيم",text:"4.9.1. المصطلحات والمفاهيم"},{depth:3,id:"492-قراءات-إضافية",text:"4.9.2. قراءات إضافية"},{depth:2,id:"410-التمارين",text:"4.10. التمارين"}],t=`<h2 id="4-البرمجة-من-الرتبة-العليا">4. البرمجة من الرتبة العليا <span class="content-anchor" id="higher-order-programming"></span></h2>
<p>الدوال قيم كأي قيمة أخرى في OCaml. وماذا يعني ذلك بالضبط؟ يعني أننا نستطيع تمرير الدوال كوسائط إلى دوال أخرى، وأننا نستطيع تخزين الدوال في بنى بيانات، وأننا نستطيع إعادة الدوال كنتيجة من دوال أخرى، وهكذا.</p>
<p><em>الدوال من الرتبة العليا</em> (higher-order functions) إما تأخذ دوال أخرى كمدخل أو تعيد دوال أخرى كمخرج (أو كليهما معًا). وتُعرف الدوال من الرتبة العليا أيضًا باسم <em>الدواليات</em> (functionals)، ولذا يمكن تسمية البرمجة بها <em>البرمجة الوظيفية</em> — بما يدل على جوهر البرمجة في لغات مثل OCaml.</p>
<p>كانت الدوال من الرتبة العليا من أحدث ما تبنّته اللغات السائدة من اللغات الوظيفية. ومن الأمثلة على ذلك مكتبة Java 8 Streams ووحدات <code>itertools</code> في Python 2.3؛ كما تزيد C++ دعمها لها منذ عام 2011 على الأقل.</p>
<p>ملاحظة</p>
<p>قد يعترض سحرة C بأن هذا التبنّي ليس حديثًا إلى هذا الحد. فبعد كل شيء، تمتلك C منذ زمن طويل القدرة على البرمجة من الرتبة العليا عبر مؤشرات الدوال. لكن تلك القدرة تعتمد أيضًا على نمط برمجي يقوم بتمرير معامل <em>بيئة</em> (environment) إضافي لتوفير قيم المتغيرات في الدالة التي ستُستدعى عبر المؤشر. وكما سنرى في فصلنا اللاحق عن المفسّرات، فإن جوهر الدوال (من الرتبة العليا) في لغة وظيفية أنها في الحقيقة شيء يسمى <em>إغلاقًا</em> (closure) يغني عن الحاجة إلى ذلك المعامل الإضافي. وضع في اعتبارك أن المسألة ليست ما <em>يمكن</em> حسابه بلغة ما — ففي النهاية يُصرَّف كل شيء إلى شيفرة الآلة، فيمكننا ببساطة الكتابة بها حصرًا — بل ما هو <em>ممتع</em> الحساب بها.</p>
<p>في هذا الفصل سنرى ما هذه الضجة كلها. فالدوال من الرتبة العليا تتيح شيفرة جميلة وعامة وقابلة لإعادة الاستخدام.</p>
<h2 id="41-الدوال-من-الرتبة-العليا">4.1. الدوال من الرتبة العليا <span class="content-anchor" id="higher-order-functions"></span></h2>
<p>انظر إلى الدالتين <code>double</code> و<code>square</code> على الأعداد الصحيحة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> double x = <span class="hljs-number">2</span> * x
<span class="hljs-keyword">let</span> square x = x * x
</code></pre>
<pre><code class="language-text">val double : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val square : int -&gt; int = &lt;fun&gt;
</code></pre>
<p>لنستخدم هاتين الدالتين لكتابة دالتين أخريين تضاعفان العدد أربع مرات وترفعانه إلى القوة الرابعة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> quad x = double (double x)
<span class="hljs-keyword">let</span> fourth x = square (square x)
</code></pre>
<pre><code class="language-text">val quad : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val fourth : int -&gt; int = &lt;fun&gt;
</code></pre>
<p>هناك تشابه واضح بين هاتين الدالتين: فما تفعلانه هو تطبيق دالة معطاة مرتين على قيمة. وبتمرير الدالة إلى دالة أخرى <code>twice</code> كوسيط، يمكننا تجريد هذه الوظيفة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> twice f x = f (f x)
</code></pre>
<pre><code class="language-text">val twice : (&#x27;a -&gt; &#x27;a) -&gt; &#x27;a -&gt; &#x27;a = &lt;fun&gt;
</code></pre>
<p>الدالة <code>twice</code> من الرتبة العليا: فمدخلها <code>f</code> دالة. وبما أننا نتذكر أن جميع دوال OCaml تأخذ في الحقيقة وسيطًا واحدًا فقط، فمخرجها تقنيًا هو <code>fun x -&gt; f (f x)</code>، لذا تعيد <code>twice</code> دالة، ومن ثم فهي من الرتبة العليا من هذه الناحية أيضًا.</p>
<p>وباستخدام <code>twice</code>، يمكننا تنفيذ <code>quad</code> و<code>fourth</code> بطريقة موحّدة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> quad x = twice double x
<span class="hljs-keyword">let</span> fourth x = twice square x
</code></pre>
<pre><code class="language-text">val quad : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val fourth : int -&gt; int = &lt;fun&gt;
</code></pre>
<h3 id="411-مبدأ-التجريد">4.1.1. مبدأ التجريد <span class="content-anchor" id="the-abstraction-principle"></span></h3>
<p>أعلاه، استغللنا التشابه البنيوي بين <code>quad</code> و<code>fourth</code> لتوفير الجهد. ومع التسليم بأنه قد لا يبدو جهدًا كبيرًا في هذا المثال اللعبة. لكن تخيّل أن <code>twice</code> كانت في الواقع دالة أكثر تعقيدًا بكثير. عندئذ، لو جاء أحدهم بنسخة أكثر كفاءة منها، لاستفادت كل دالة مكتوبة بدلالتها (مثل <code>quad</code> و<code>fourth</code>) من ذلك التحسن في الكفاءة، دون حاجة إلى إعادة كتابتها.</p>
<p>وجزء من كونك مبرمجًا ممتازًا هو إدراك مثل هذه التشابهات و<em>تجريدها</em> بإنشاء دوال (أو وحدات شيفرة أخرى) تنفّذها. ويسمي بروس ماكلينان هذا <strong>مبدأ التجريد</strong> (Abstraction Principle) في كتابه <em>Functional Programming: Theory and Practice</em> (1990). ويقول مبدأ التجريد إنه ينبغي تجنّب اشتراط قول شيء ما أكثر من مرة؛ بل <em>استخلص</em> النمط المتكرر. وتتيح الدوال من الرتبة العليا إعادة الهيكلة هذه، لأنها تسمح لنا باستخلاص الدوال وجعل الدوال تتضمن معاملات هي دوال أخرى.</p>
<p>وإلى جانب <code>twice</code>، إليك بعض الأمثلة الأخرى البسيطة نسبيًا، وعليها أيضًا فضل لماكلينان:</p>
<p><strong>Apply.</strong> يمكننا كتابة دالة تطبّق مدخلها الأول على مدخلها الثاني:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> apply f x = f x
</code></pre>
<pre><code class="language-text">val apply : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>بالطبع، كتابة <code>apply f</code> عمل أكبر بكثير من كتابة <code>f</code> فحسب.</p>
<p><strong>خط الأنابيب.</strong> مؤثر خط الأنابيب، الذي رأيناه سابقًا، دالة من الرتبة العليا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> pipeline x f = f x
<span class="hljs-keyword">let</span> (|&gt;) = pipeline
<span class="hljs-keyword">let</span> x = <span class="hljs-number">5</span> |&gt; double
</code></pre>
<pre><code class="language-text">val pipeline : &#x27;a -&gt; (&#x27;a -&gt; &#x27;b) -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val ( |&gt; ) : &#x27;a -&gt; (&#x27;a -&gt; &#x27;b) -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val x : int = 10
</code></pre>
<p><strong>Compose.</strong> يمكننا كتابة دالة تركّب دالتين أخريين:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> compose f g x = f (g x)
</code></pre>
<pre><code class="language-text">val compose : (&#x27;a -&gt; &#x27;b) -&gt; (&#x27;c -&gt; &#x27;a) -&gt; &#x27;c -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>ستتيح لنا هذه الدالة إنشاء دالة جديدة يمكن تطبيقها مرات كثيرة، مثل التالية:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> square_then_double = compose double square
<span class="hljs-keyword">let</span> x = square_then_double <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> y = square_then_double <span class="hljs-number">2</span>
</code></pre>
<pre><code class="language-text">val square_then_double : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val x : int = 2
</code></pre>
<pre><code class="language-text">val y : int = 8
</code></pre>
<p><strong>Both.</strong> يمكننا كتابة دالة تطبّق دالتين على الوسيط نفسه وتعيد زوجًا من النتيجتين:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> both f g x = (f x, g x)
<span class="hljs-keyword">let</span> ds = both double square
<span class="hljs-keyword">let</span> p = ds <span class="hljs-number">3</span>
</code></pre>
<pre><code class="language-text">val both : (&#x27;a -&gt; &#x27;b) -&gt; (&#x27;a -&gt; &#x27;c) -&gt; &#x27;a -&gt; &#x27;b * &#x27;c = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val ds : int -&gt; int * int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val p : int * int = (6, 9)
</code></pre>
<p><strong>Cond.</strong> يمكننا كتابة دالة تختار شرطيًا أي الدالتين ستطبّق بناءً على محمول (predicate):</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> cond p f g x =
  <span class="hljs-keyword">if</span> p x <span class="hljs-keyword">then</span> f x <span class="hljs-keyword">else</span> g x
</code></pre>
<pre><code class="language-text">val cond : (&#x27;a -&gt; bool) -&gt; (&#x27;a -&gt; &#x27;b) -&gt; (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<h3 id="412-معنى-الرتبة-العليا">4.1.2. معنى «الرتبة العليا» <span class="content-anchor" id="the-meaning-of-higher-order"></span></h3>
<p>تُستخدم عبارة «الرتبة العليا» في المنطق وعلوم الحاسوب كله، وإن لم يكن لها بالضرورة معنى دقيق أو متسق في جميع الحالات.</p>
<p>في المنطق، يشير <em>التكميم من الرتبة الأولى</em> (first-order quantification) أساسًا إلى المُكمِّمين الكلي والوجودي (<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">∀</mi></mrow><annotation encoding="application/x-tex">\\forall</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord">∀</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">∃</mi></mrow><annotation encoding="application/x-tex">\\exists</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord">∃</span></span></span></span>). وهذان يتيحان لك التكميم على <em>مجال</em> ما يهمنا، مثل الأعداد الطبيعية. لكن في أي تكميم معيّن، لنقل <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">∀</mi><mi>x</mi></mrow><annotation encoding="application/x-tex">\\forall x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord">∀</span><span class="mord mathnormal">x</span></span></span></span>، يمثل المتغير المكمَّم عليه عنصرًا فرديًا من ذلك المجال، لنقل العدد الطبيعي 42.</p>
<p>ويتيح لك <em>التكميم من الرتبة الثانية</em> فعل شيء أقوى تمامًا، وهو التكميم على <em>خصائص</em> المجال. والخصائص عبارة عن تأكيدات حول العناصر الفردية، مثل أن عددًا طبيعيًا زوجي، أو أنه أولي. وفي بعض المنطقيات يمكننا مساواة الخصائص بمجموعات العناصر الفردية، مثل مجموعة الأعداد الطبيعية الزوجية كلها. لذا كثيرًا ما يُفكَّر في التكميم من الرتبة الثانية على أنه تكميم على <em>المجموعات</em>. ويمكنك أيضًا التفكير في الخصائص كدوال تأخذ عنصرًا وتعيد قيمة منطقية تشير إلى ما إذا كان العنصر يحقق الخاصية؛ وتسمى هذه <em>الدالة المميزة</em> (characteristic function) للخاصية.</p>
<p>ويتيح منطق <em>الرتبة الثالثة</em> التكميم على خصائص الخصائص، ومنطق <em>الرتبة الرابعة</em> التكميم على خصائص خصائص الخصائص، وهكذا. ويشير <em>منطق الرتبة العليا</em> إلى كل هذه المنطقيات الأقوى من منطق الرتبة الأولى؛ وإن كانت هناك نتيجة مثيرة للاهتمام في هذا المجال مفادها أن جميع المنطقيات من الرتب العليا يمكن التعبير عنها في منطق الرتبة الثانية.</p>
<p>وفي لغات البرمجة، تشير <em>الدوال من الرتبة الأولى</em> (first-order functions) بالمثل إلى دوال تعمل على عناصر بيانات فردية (مثل السلاسل النصية والأعداد الصحيحة والسجلات والأنواع المتغايرة وغيرها). أما <em>الدوال من الرتبة العليا</em> فيمكنها العمل على الدوال، تمامًا كما يمكن لمنطقيات الرتب العليا التكميم على الخصائص (وهي شبيهة بالدوال).</p>
<h3 id="413-دوال-شهيرة-من-الرتبة-العليا">4.1.3. دوال شهيرة من الرتبة العليا <span class="content-anchor" id="famous-higher-order-functions"></span></h3>
<p>في الأقسام القليلة التالية سنغوص في ثلاث من أشهر الدوال من الرتبة العليا: map وfilter وfold. وهذه دوال يمكن تعريفها لكثير من بنى البيانات، ومنها القوائم والأشجار. والفكرة الأساسية لكل منها هي:</p>
<ul>
<li><em>map</em> تحوّل العناصر،</li>
<li>و<em>filter</em> تحذف العناصر، و</li>
<li><em>fold</em> تدمج العناصر.</li>
</ul>
<h2 id="42-map">4.2. Map <span class="content-anchor" id="map"></span></h2>
<p>إليك دالتين قد نريد كتابتهما:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [add1 lst] adds 1 to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> add1 = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; (h + <span class="hljs-number">1</span>) :: add1 t
<span class="hljs-keyword">let</span> lst1 = add1 [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val add1 : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst1 : int list = [2; 3; 4]
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [concat_bang lst] concatenates &quot;!&quot; to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> concat_bang = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; (h ^ <span class="hljs-string">&quot;!&quot;</span>) :: concat_bang t
<span class="hljs-keyword">let</span> lst2 = concat_bang [<span class="hljs-string">&quot;sweet&quot;</span>; <span class="hljs-string">&quot;salty&quot;</span>]
</code></pre>
<pre><code class="language-text">val concat_bang : string list -&gt; string list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst2 : string list = [&quot;sweet!&quot;; &quot;salty!&quot;]
</code></pre>
<p>هناك تشابه كبير بين هاتين الدالتين:</p>
<ul>
<li>كلتاهما تطابق نمطيًا قائمة.</li>
<li>كلتاهما تعيد القيمة نفسها في الحالة الأساسية للقائمة الفارغة.</li>
<li>كلتاهما تتعاود على الذيل في حالة القائمة غير الفارغة.</li>
</ul>
<p>بل إن الفرق الوحيد (عدا اسميهما) هو ما تفعلانه بعنصر الرأس: الجمع مقابل الدمج. لنعد كتابة الدالتين لجعل ذلك الفرق أكثر وضوحًا:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [add1 lst] adds 1 to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> add1 = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt;
    <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
    f h :: add1 t
<span class="hljs-comment">(** [concat_bang lst] concatenates &quot;!&quot; to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> concat_bang = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt;
    <span class="hljs-keyword">let</span> f = <span class="hljs-keyword">fun</span> x -&gt; x ^ <span class="hljs-string">&quot;!&quot;</span> <span class="hljs-keyword">in</span>
    f h :: concat_bang t
</code></pre>
<pre><code class="language-text">val add1 : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat_bang : string list -&gt; string list = &lt;fun&gt;
</code></pre>
<p>الآن الفرق الوحيد بين الدالتين (مرة أخرى، عدا اسميهما) هو جسم الدالة المساعدة <code>f</code>. فلماذا نكرر كل تلك الشيفرة بينما الفرق بين الدالتين بهذا الصغر؟ قد نستخلص تلك الدالة المساعدة الواحدة من كل دالة رئيسية ونجعلها وسيطًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> add1&#x27; f = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; f h :: add1&#x27; f t
<span class="hljs-comment">(** [add1 lst] adds 1 to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> add1 = add1&#x27; (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>)
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> concat_bang&#x27; f = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; f h :: concat_bang&#x27; f t
<span class="hljs-comment">(** [concat_bang lst] concatenates &quot;!&quot; to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> concat_bang = concat_bang&#x27; (<span class="hljs-keyword">fun</span> x -&gt; x ^ <span class="hljs-string">&quot;!&quot;</span>)
</code></pre>
<pre><code class="language-text">val add1&#x27; : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val add1 : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat_bang&#x27; : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat_bang : string list -&gt; string list = &lt;fun&gt;
</code></pre>
<p>لكن الآن لا يوجد في الحقيقة أي فرق على الإطلاق بين <code>add1'</code> و<code>concat_bang'</code> إلا اسميهما. فهما شيفرة مكررة تمامًا. بل إن نوعيهما أصبحا متماثلين، لأن شيئًا فيهما لا يذكر الأعداد الصحيحة أو السلاسل النصية. فقد نكتفي بالإبقاء على واحدة منهما فحسب ونأتي باسم جديد جيد لها. ومن الاحتمالات اسم <code>transform</code>، لأنهما يحوّلان قائمة بتطبيق دالة على كل عنصر من عناصر القائمة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> transform f = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; f h :: transform f t
<span class="hljs-comment">(** [add1 lst] adds 1 to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> add1 = transform (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>)
<span class="hljs-comment">(** [concat_bang lst] concatenates &quot;!&quot; to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> concat_bang = transform (<span class="hljs-keyword">fun</span> x -&gt; x ^ <span class="hljs-string">&quot;!&quot;</span>)
</code></pre>
<pre><code class="language-text">val transform : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val add1 : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat_bang : string list -&gt; string list = &lt;fun&gt;
</code></pre>
<p>ملاحظة</p>
<p>بدلًا من</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add1 lst = transform (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>) lst
</code></pre>
<p>أعلاه، كتبنا</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add1 = transform (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>)
</code></pre>
<p>وهذه طريقة أخرى لكون الدالة من الرتبة العليا، لكنها طريقة تعلمناها بالفعل تحت غطاء التطبيق الجزئي. فطريقة كتابة الدالة الأخيرة تطبّق <code>transform</code> جزئيًا على وسيط واحد فحسب من وسيطيها، فتعيد دالة. وتلك الدالة تُربط بالاسم <code>add1</code>.</p>
<p>والواقع أن مكتبة C++ تسمي الدالة المكافئة <code>transform</code>. لكن OCaml ولغات أخرى كثيرة (منها Java وPython) تستخدم الكلمة الأقصر <em>map</em>، بالمعنى الرياضي لكيفية ربط دالة مدخلًا بمخرج. فلنُجرِ تغييرًا أخيرًا على ذلك الاسم:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; f h :: map f t
<span class="hljs-comment">(** [add1 lst] adds 1 to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> add1 = map (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>)
<span class="hljs-comment">(** [concat_bang lst] concatenates &quot;!&quot; to each element of [lst]. *)</span>
<span class="hljs-keyword">let</span> concat_bang = map (<span class="hljs-keyword">fun</span> x -&gt; x ^ <span class="hljs-string">&quot;!&quot;</span>)
</code></pre>
<pre><code class="language-text">val map : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val add1 : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat_bang : string list -&gt; string list = &lt;fun&gt;
</code></pre>
<p>طبّقنا الآن مبدأ التجريد بنجاح: فاستُخلصت البنية المشتركة. وما تبقّى يعبّر بوضوح عن الحساب، على الأقل للقارئ المألوف بـ <code>map</code>، على نحو لا توضحه النسخ الأصلية بهذه السرعة.</p>
<h3 id="421-الآثار-الجانبية">4.2.1. الآثار الجانبية <span class="content-anchor" id="side-effects"></span></h3>
<p>توجد الدالة <code>map</code> بالفعل في المكتبة القياسية لـ OCaml باسم <code>List.map</code>، لكن مع فرق صغير عن التنفيذ الذي اكتشفناه أعلاه. أولًا، لنرَ ما قد يكون معيبًا في تنفيذنا، ثم سننظر في تنفيذ المكتبة القياسية.</p>
<p>رأينا سابقًا في مناقشتنا لـ<a href="https://cs3110.github.io/textbook/chapters/data/exceptions.html">الاستثناءات</a> أن مواصفة لغة OCaml لا تحدد عمومًا ترتيب تقييم التعبيرات الفرعية، وأن تنفيذ اللغة الحالي يقيّم عمومًا من اليمين إلى اليسار. وبسبب ذلك، تتسبب الشيفرة التالية (المتكلّفة نوعًا ما) فعليًا في طباعة عناصر القائمة بترتيب قد يبدو معكوسًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> p x = print_int x; print_newline<span class="hljs-literal">()</span>; x + <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> lst = map p [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>]
</code></pre>
<pre><code class="language-text">val p : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">2
</code></pre>
<pre><code class="language-text">1
</code></pre>
<pre><code class="language-text">val lst : int list = [2; 3]
</code></pre>
<p>وإليك السبب:</p>
<ul>
<li>التعبير <code>map p [1; 2]</code> يقيّم إلى <code>p 1 :: map p [2]</code>.</li>
<li>ثم يقيّم الجانب الأيمن من ذلك التعبير إلى <code>p 1 :: (p 2 :: map p [])</code>. ولم يحدث بعد تطبيق <code>p</code> على <code>1</code>.</li>
<li>ويقيّم بعد ذلك الجانب الأيمن من <code>::</code> مرة أخرى، فينتج <code>p 1 :: (p 2 :: [])</code>.</li>
<li>ثم تُطبَّق <code>p</code> على <code>2</code>، وأخيرًا على <code>1</code>.</li>
</ul>
<p>ومن المرجح أن ذلك مفاجئ لأي شخص يميل إلى التفكير بأن التقييم سيحدث من اليسار إلى اليمين. والحل هو استخدام تعبير <code>let</code> لجعل تقييم تطبيق الدالة يحدث قبل النداء التعاودي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; <span class="hljs-keyword">let</span> h&#x27; = f h <span class="hljs-keyword">in</span> h&#x27; :: map f t
<span class="hljs-keyword">let</span> lst2 = map p [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>]
</code></pre>
<pre><code class="language-text">val map : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">1
</code></pre>
<pre><code class="language-text">2
</code></pre>
<pre><code class="language-text">val lst2 : int list = [2; 3]
</code></pre>
<p>وإليك سبب نجاح ذلك:</p>
<ul>
<li>التعبير <code>map p [1; 2]</code> يقيّم إلى <code>let h' = p 1 in h' :: map p [2]</code>.</li>
<li>يقيّم تعبير الربط <code>p 1</code>، فيُطبع <code>1</code> وتُربط <code>h'</code> بـ <code>2</code>.</li>
<li>ثم يقيّم تعبير الجسم <code>h' :: map p [2]</code>، فيؤدي ذلك إلى طباعة <code>2</code> بعد ذلك.</li>
</ul>
<p>وهكذا تعرّف المكتبة القياسية <code>List.map</code>. وينبغي أن نستخدمها بدلًا من إعادة تعريف الدالة بأنفسنا من الآن فصاعدًا. لكن من الجيد أننا اكتشفنا الدالة «من الصفر» إن جاز التعبير، وأننا نستطيع إعادة كتابتها سريعًا إن احتجنا.</p>
<p>والدرس الأكبر الذي نستخلصه من هذه المناقشة هو أنه عندما يهم ترتيب التقييم، نحتاج إلى استخدام <code>let</code> لضمانه. ومتى يهم ذلك؟ فقط عندما توجد آثار جانبية. والطباعة والاستثناءات هما الأثران الجانبيان اللذان رأيناهما حتى الآن. وسنضيف لاحقًا القابلية للتغيير.</p>
<h3 id="422-map-والتعاود-الذيلي">4.2.2. Map والتعاود الذيلي <span class="content-anchor" id="map-and-tail-recursion"></span></h3>
<p>سيلاحظ القراء الفطّن أن تنفيذ <code>map</code> ليس تعاوديًا ذليًا. وهذا لا مفر منه إلى حد ما. وإليك طريقة مغربة لكنها سيئة لإنشاء نسخة تعاودية ذيلية منه:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map_tr_aux f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; map_tr_aux f (acc @ [f h]) t
<span class="hljs-keyword">let</span> map_tr f = map_tr_aux f <span class="hljs-literal">[]</span>
<span class="hljs-keyword">let</span> lst = map_tr (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val map_tr_aux : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;b list -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val map_tr : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst : int list = [2; 3; 4]
</code></pre>
<p>يعمل ذلك إلى حد ما: فالمخرجات صحيحة، و<code>map_tr_aux</code> تعاودية ذيلية. والعيب الخفي هو التعبير الفرعي <code>acc &amp;#64; [f h]</code>. تذكّر أن الإلحاق عملية خطية الزمن على القوائم المترابطة أحادية الاتجاه. أي أنه إذا كان هناك <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من عناصر القائمة فإن الإلحاق يستغرق زمنًا <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. لذا ننفّذ في كل نداء تعاودي عملية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. وسيكون هناك <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من النداءات التعاودية، نداء لكل عنصر من عناصر القائمة. أي مجموع قدره <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>⋅</mo><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n \\cdot O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4445em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> من العمل، وهو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><msup><mi>n</mi><mn>2</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n^2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>. فحققنا التعاود الذيلي، لكن بكلفة باهظة: ما كان ينبغي أن يكون عملية خطية الزمن أصبح تربيعي الزمن.</p>
<p>وفي محاولة لإصلاح ذلك، يمكننا استخدام عملية cons الثابتة الزمن بدلًا من عملية الإلحاق الخطية الزمن:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map_tr_aux f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; map_tr_aux f (f h :: acc) t
<span class="hljs-keyword">let</span> map_tr f = map_tr_aux f <span class="hljs-literal">[]</span>
<span class="hljs-keyword">let</span> lst = map_tr (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val map_tr_aux : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;b list -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val map_tr : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst : int list = [4; 3; 2]
</code></pre>
<p>ويعمل ذلك إلى حد ما: فهو تعاودي ذيلي وخطي الزمن. والعيب غير الخفي هذه المرة هو أن المخرجات معكوسة. فبينما نأخذ كل عنصر من مقدمة قائمة المدخل، نضعه في مقدمة قائمة المخرج، لكن ذلك يعكس ترتيبها.</p>
<p>ملاحظة</p>
<p>لفهم سبب حدوث العكس، قد يساعد التفكير في قائمتي المدخل والمخرج كأشخاص واقفين في طابور:</p>
<ul>
<li>المدخل: Alice، Bob.</li>
<li>المخرج: فارغ.</li>
</ul>
<p>ثم نزيل Alice من المدخل ونضيفها إلى المخرج:</p>
<ul>
<li>المدخل: Bob.</li>
<li>المخرج: Alice.</li>
</ul>
<p>ثم نزيل Bob من المدخل ونضيفه إلى المخرج:</p>
<ul>
<li>المدخل: فارغ.</li>
<li>المخرج: Bob، Alice.</li>
</ul>
<p>والنقطة هي أننا مع القوائم المترابطة أحادية الاتجاه لا نستطيع العمل إلا على رأس القائمة وأن نبقى في زمن ثابت. فلا يمكننا نقل Bob إلى مؤخرة المخرج دون أن يجتاز Alice — وأي شخص آخر قد يكون واقفًا في المخرج.</p>
<p>ولهذا السبب، تسمي المكتبة القياسية هذه الدالة <code>List.rev_map</code>، أي دالة map (تعاودية ذيلية) تعيد مخرجاتها بترتيب معكوس.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> rev_map_aux f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; rev_map_aux f (f h :: acc) t
<span class="hljs-keyword">let</span> rev_map f = rev_map_aux f <span class="hljs-literal">[]</span>
<span class="hljs-keyword">let</span> lst = rev_map (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val rev_map_aux : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;b list -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val rev_map : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst : int list = [4; 3; 2]
</code></pre>
<p>وإذا أردت المخرجات بالترتيب «الصحيح»، فالأمر سهل: طبّق <code>List.rev</code> عليها فحسب:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> lst = <span class="hljs-type">List</span>.rev (<span class="hljs-type">List</span>.rev_map (<span class="hljs-keyword">fun</span> x -&gt; x + <span class="hljs-number">1</span>) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>])
</code></pre>
<pre><code class="language-text">val lst : int list = [2; 3; 4]
</code></pre>
<p>وبما أن <code>List.rev</code> خطية الزمن وتعاودية ذيلية معًا، فإن ذلك يعطي حلًا كاملًا. فنحصل على حساب map خطي الزمن وتعاودي ذيلي. والكلفة أنه يتطلب مرورين على القائمة: أحدهما للتحويل والآخر للعكس. ولن نصل إلى كفاءة أفضل من هذه مع قائمة مترابطة أحادية الاتجاه. وبالطبع، هناك بنى بيانات أخرى تنفّذ القوائم، وسنصل إليها في النهاية. وفي الأثناء، تذكّر أننا عمومًا لا نحتاج إلى القلق بشأن التعاود الذيلي (أي بشأن مساحة المكدّس) حتى تصل القوائم إلى 10,000 عنصر أو أكثر.</p>
<p>ولماذا لا توفر المكتبة القياسية هذه الدالة الجامعة لكل ذلك؟ ربما ستفعل يومًا ما إن وُجد سبب كافٍ. لكنك قد تكتشف في برمجتك الخاصة أن الحاجة إليها ليست كبيرة. ففي حالات كثيرة، يمكننا إما الاستغناء عن التعاود الذيلي، أو الرضا بقائمة معكوسة.</p>
<p>والدرس الأكبر الذي نستخلصه من هذه المناقشة هو أنه قد توجد مقايضة بين كفاءة الزمن وكفاءة المساحة في الدوال التعاودية. فبمحاولة جعل دالة أكثر كفاءة في المساحة (أي تعاودية ذيلية)، قد نجعلها بالخطأ أقل كفاءة زمنيًا من حيث المقاربة (أي تربيعية بدلًا من خطية)، أو إن كنا أذكياء فنبقي كفاءة الزمن المقاربة كما هي (أي خطية) بكلفة عامل ثابت (أي المعالجة مرتين).</p>
<h3 id="423-map-في-لغات-أخرى">4.2.3. Map في لغات أخرى <span class="content-anchor" id="map-in-other-languages"></span></h3>
<p>ذكرنا أعلاه أن فكرة map موجودة في لغات برمجة كثيرة. وإليك مثالًا من Python:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> x: x + <span class="hljs-number">1</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])))
[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
</code></pre>
<p>علينا استخدام الدالة <code>list</code> لتحويل نتيجة <code>map</code> مرة أخرى إلى قائمة، لأن Python، من أجل الكفاءة، تنتج كل عنصر من مخرجات <code>map</code> عند الحاجة إليه. وهنا مرة أخرى نرى موضوع «متى تتم التقييم؟» يعود للظهور.</p>
<p>وفي Java، تعد map جزءًا من تجريد <code>Stream</code> الذي أُضيف في Java 8. وبما أنه لا توجد صياغة Java مدمجة للقوائم أو التدفقات، فإعطاء مثال يكون أكثر إسهابًا قليلًا. وهنا نستخدم دالة مصنع هي <code>Stream.of</code> لإنشاء تدفق:</p>
<pre><code class="language-java">jshell&gt; Stream.of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>).map(x -&gt; x + <span class="hljs-number">1</span>).collect(Collectors.toList())
$<span class="hljs-number">1</span> ==&gt; [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
</code></pre>
<p>وكما في مثال Python، علينا استخدام شيء لتحويل التدفق مرة أخرى إلى قائمة. وفي هذه الحالة هو الطريقة <code>collect</code>.</p>
<h2 id="43-filter">4.3. Filter <span class="content-anchor" id="filter"></span></h2>
<p>افترض أننا أردنا ترشيح الأعداد الزوجية فقط من قائمة، أو الأعداد الفردية فقط. وإليك بعض الدوال لفعل ذلك:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [even n] is whether [n] is even. *)</span>
<span class="hljs-keyword">let</span> even n =
  n <span class="hljs-keyword">mod</span> <span class="hljs-number">2</span> = <span class="hljs-number">0</span>
<span class="hljs-comment">(** [evens lst] is the sublist of [lst] containing only even numbers. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> evens = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; <span class="hljs-keyword">if</span> even h <span class="hljs-keyword">then</span> h :: evens t <span class="hljs-keyword">else</span> evens t
<span class="hljs-keyword">let</span> lst1 = evens [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>; <span class="hljs-number">4</span>]
</code></pre>
<pre><code class="language-text">val even : int -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val evens : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst1 : int list = [2; 4]
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [odd n] is whether [n] is odd. *)</span>
<span class="hljs-keyword">let</span> odd n =
  n <span class="hljs-keyword">mod</span> <span class="hljs-number">2</span> &lt;&gt; <span class="hljs-number">0</span>
<span class="hljs-comment">(** [odds lst] is the sublist of [lst] containing only odd numbers. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> odds = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; <span class="hljs-keyword">if</span> odd h <span class="hljs-keyword">then</span> h :: odds t <span class="hljs-keyword">else</span> odds t
<span class="hljs-keyword">let</span> lst2 = odds [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>; <span class="hljs-number">4</span>]
</code></pre>
<pre><code class="language-text">val odd : int -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val odds : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst2 : int list = [1; 3]
</code></pre>
<p>الدالتان <code>evens</code> و<code>odds</code> شيفرة متطابقة تقريبًا: والفرق الجوهري الوحيد هو الاختبار الذي تطبّقانه على عنصر الرأس. فلنستخلص، كما فعلنا مع <code>map</code> في القسم السابق، ذلك الاختبار كدالة. ولنسمِّ الدالة <code>p</code> اختصارًا لـ «predicate» (محمول)، وهي طريقة منمقة لقول إنها تختبر ما إذا كان شيء صحيحًا أم خاطئًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> filter p = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | h :: t -&gt; <span class="hljs-keyword">if</span> p h <span class="hljs-keyword">then</span> h :: filter p t <span class="hljs-keyword">else</span> filter p t
</code></pre>
<pre><code class="language-text">val filter : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<p>والآن يمكننا إعادة تنفيذ دالتينا الأصليتين:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> evens = filter even
<span class="hljs-keyword">let</span> odds = filter odd
</code></pre>
<pre><code class="language-text">val evens : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val odds : int list -&gt; int list = &lt;fun&gt;
</code></pre>
<p>ما أبسطهما! وما أوضحهما! (على الأقل للقارئ المألوف بـ <code>filter</code>.)</p>
<h3 id="431-filter-والتعاود-الذيلي">4.3.1. Filter والتعاود الذيلي <span class="content-anchor" id="filter-and-tail-recursion"></span></h3>
<p>كما فعلنا مع <code>map</code>، يمكننا إنشاء نسخة تعاودية ذيلية من <code>filter</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> filter_aux p acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; <span class="hljs-keyword">if</span> p h <span class="hljs-keyword">then</span> filter_aux p (h :: acc) t <span class="hljs-keyword">else</span> filter_aux p acc t
<span class="hljs-keyword">let</span> filter p = filter_aux p <span class="hljs-literal">[]</span>
<span class="hljs-keyword">let</span> lst = filter even [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>; <span class="hljs-number">4</span>]
</code></pre>
<pre><code class="language-text">val filter_aux : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val filter : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst : int list = [4; 2]
</code></pre>
<p>ومرة أخرى نكتشف أن المخرجات معكوسة. وهنا تتخذ المكتبة القياسية خيارًا مختلفًا عمّا اتخذته مع <code>map</code>. فهي تبني العكس داخل <code>List.filter</code>، المنفّذة هكذا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> filter_aux p acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-type">List</span>.rev acc <span class="hljs-comment">(* note the built-in reversal *)</span>
  | h :: t -&gt; <span class="hljs-keyword">if</span> p h <span class="hljs-keyword">then</span> filter_aux p (h :: acc) t <span class="hljs-keyword">else</span> filter_aux p acc t
<span class="hljs-keyword">let</span> filter p = filter_aux p <span class="hljs-literal">[]</span>
</code></pre>
<pre><code class="language-text">val filter_aux : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val filter : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<p>ولماذا تعامل المكتبة القياسية <code>map</code> و<code>filter</code> معاملة مختلفة في هذه النقطة؟ سؤال جيد. ربما لم يكن هناك ببساطة طلب على دالة <code>filter</code> تكون كفاءتها الزمنية أفضل بعامل ثابت. أو ربما هي مجرد مصادفة تاريخية.</p>
<h3 id="432-filter-في-لغات-أخرى">4.3.2. Filter في لغات أخرى <span class="content-anchor" id="filter-in-other-languages"></span></h3>
<p>مرة أخرى، فكرة filter موجودة في لغات برمجة كثيرة. وإليك إياها في Python:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">filter</span>(<span class="hljs-keyword">lambda</span> x: x % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>])))
[<span class="hljs-number">2</span>, <span class="hljs-number">4</span>]
</code></pre>
<p>وفي Java:</p>
<pre><code class="language-java">jshell&gt; Stream.of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>).filter(x -&gt; x % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>).collect(Collectors.toList())
$<span class="hljs-number">1</span> ==&gt; [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>]
</code></pre>
<h2 id="44-fold">4.4. Fold <span class="content-anchor" id="fold"></span></h2>
<p>تمنحنا دالة map طريقة لتحويل كل عنصر من عناصر القائمة على حدة. وتمنحنا دالة filter طريقة لتقرير ما إذا كنا سنبقي على كل عنصر من عناصر القائمة أو نحذفه على حدة. لكن كلتيهما في الحقيقة تنظر إلى عنصر واحد في كل مرة فحسب. فماذا لو أردنا دمج جميع عناصر القائمة بطريقة ما؟ هذا ما وُجدت الدالة <em>fold</em> من أجله. وتبيّن أن لها نسختين، وسندرسهما في هذا القسم. لكن لنبدأ بالنظر إلى دالة ذات صلة — ليست فعلًا في المكتبة القياسية — نسميها <em>combine</em>.</p>
<h3 id="441-combine">4.4.1. Combine <span class="content-anchor" id="combine"></span></h3>
<p>مرة أخرى، لنكتب دالتين:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [sum lst] is the sum of all the elements of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> sum = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-number">0</span>
  | h :: t -&gt; h + sum t
<span class="hljs-keyword">let</span> s = sum [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val s : int = 6
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-comment">(** [concat lst] is the concatenation of all the elements of [lst]. *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> concat = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-string">&quot;&quot;</span>
  | h :: t -&gt; h ^ concat t
<span class="hljs-keyword">let</span> c = concat [<span class="hljs-string">&quot;a&quot;</span>; <span class="hljs-string">&quot;b&quot;</span>; <span class="hljs-string">&quot;c&quot;</span>]
</code></pre>
<pre><code class="language-text">val concat : string list -&gt; string = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val c : string = &quot;abc&quot;
</code></pre>
<p>وكما في تماريننا المشابهة مع map وfilter، تتشارك الدالتان قدرًا كبيرًا من البنية المشتركة. والفرق هنا:</p>
<ul>
<li>حالة القائمة الفارغة تعيد قيمة أولية مختلفة، <code>0</code> مقابل <code>&quot;&quot;</code></li>
<li>حالة القائمة غير الفارغة تستخدم مؤثرًا مختلفًا لدمج عنصر الرأس مع نتيجة النداء التعاودي، <code>+</code> مقابل <code>^</code>.</li>
</ul>
<p>فهل يمكننا تطبيق مبدأ التجريد مرة أخرى؟ بالتأكيد! لكننا هذه المرة نحتاج إلى استخلاص <em>وسيطين</em>: واحد لكل من هذين الفرقين.</p>
<p>لنبدأ باستخلاص القيمة الأولية فحسب:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> sum&#x27; init = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; init
  | h :: t -&gt; h + sum&#x27; init t
<span class="hljs-keyword">let</span> sum = sum&#x27; <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> concat&#x27; init = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; init
  | h :: t -&gt; h ^ concat&#x27; init t
<span class="hljs-keyword">let</span> concat = concat&#x27; <span class="hljs-string">&quot;&quot;</span>
</code></pre>
<pre><code class="language-text">val sum&#x27; : int -&gt; int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat&#x27; : string -&gt; string list -&gt; string = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat : string list -&gt; string = &lt;fun&gt;
</code></pre>
<p>الآن الفرق الحقيقي الوحيد المتبقي بين <code>sum'</code> و<code>concat'</code> هو المؤثر المستخدم لدمج الرأس مع النداء التعاودي على الذيل. ويمكن أن يصبح ذلك المؤثر أيضًا وسيطًا لدالة موحّدة نسميها <code>combine</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine op init = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; init
  | h :: t -&gt; op h (combine op init t)
<span class="hljs-keyword">let</span> sum = combine ( + ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> concat = combine ( ^ ) <span class="hljs-string">&quot;&quot;</span>
</code></pre>
<pre><code class="language-text">val combine : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a list -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat : string list -&gt; string = &lt;fun&gt;
</code></pre>
<p>وإحدى طرق التفكير في <code>combine</code> هي أنها:</p>
<ul>
<li>تستبدل القيمة <code>[]</code> في القائمة بـ <code>init</code>، و</li>
<li>تستبدل كل منشئ <code>::</code> بـ <code>op</code>.</li>
</ul>
<p>على سبيل المثال، <code>[a; b; c]</code> مجرد سكر صياغي لـ <code>a :: (b :: (c :: []))</code>. لذا إذا استبدلنا <code>[]</code> بـ <code>0</code> و<code>::</code> بـ <code>(+)</code>، نحصل على <code>a + (b + (c + 0))</code>. ويكون ذلك مجموع القائمة.</p>
<p>ومرة أخرى، قادنا مبدأ التجريد إلى تعبير بسيط وموجز بشكل مذهل عن الحساب.</p>
<h3 id="442-الطي-نحو-اليمين-fold-right">4.4.2. الطي نحو اليمين (Fold Right) <span class="content-anchor" id="fold-right"></span></h3>
<p>دالة <code>combine</code> هي الفكرة الكامنة وراء دالة فعلية من مكتبة OCaml. وللوصول إليها، نحتاج إلى إجراء تغييرين على التنفيذ الذي لدينا حتى الآن.</p>
<p>أولًا، لنعد تسمية بعض الوسائط: سنغيّر <code>op</code> إلى <code>f</code> للتأكيد على أننا في الحقيقة نستطيع تمرير أي دالة، لا مجرد مؤثر مدمج مثل <code>+</code>. وسنغيّر <code>init</code> إلى <code>acc</code>، وهو كما هي العادة اختصار لـ «accumulator» (المجمِّع). فينتج:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; f h (combine f acc t)
</code></pre>
<pre><code class="language-text">val combine : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a list -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>ثانيًا، لنجرِ تغييرًا أقل تبريرًا كما نعترف. سنبادل وسيط القائمة الضمني لـ <code>combine</code> بوسيط <code>init</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine&#x27; f lst acc = <span class="hljs-keyword">match</span> lst <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; f h (combine&#x27; f t acc)
<span class="hljs-keyword">let</span> sum lst = combine&#x27; ( + ) lst <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> concat lst = combine&#x27; ( ^ ) lst <span class="hljs-string">&quot;&quot;</span>
</code></pre>
<pre><code class="language-text">val combine&#x27; : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat : string list -&gt; string = &lt;fun&gt;
</code></pre>
<p>برمجة الدالة بهذه الطريقة أقل ملاءمة قليلًا، لأننا لم نعد نستفيد من الكلمة المفتاحية <code>function</code>، ولا من التطبيق الجزئي في تعريف <code>sum</code> و<code>concat</code>. لكن لا يوجد تغيير خوارزمي.</p>
<p>وما لدينا الآن هو التنفيذ الفعلي لدالة المكتبة القياسية <code>List.fold_right</code>. كل ما بقي علينا فعله هو تغيير اسم الدالة وإضافة تعليق نوعي يدوي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_right f lst (acc : <span class="hljs-symbol">&#x27;acc</span>) = <span class="hljs-keyword">match</span> lst <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; f h (fold_right f t acc)
</code></pre>
<pre><code class="language-text">val fold_right : (&#x27;a -&gt; &#x27;acc -&gt; &#x27;acc) -&gt; &#x27;a list -&gt; &#x27;acc -&gt; &#x27;acc = &lt;fun&gt;
</code></pre>
<p>ولماذا تسمى هذه الدالة «الطي نحو اليمين»؟ الحدس هو أن طريقة عملها هي «الطي للداخل» لعناصر القائمة من اليمين إلى اليسار، بدمج كل عنصر جديد باستخدام المؤثر. على سبيل المثال، ينتج عن <code>fold_right ( + ) [a; b; c] 0</code> تقييم التعبير <code>a + (b + (c + 0))</code>. والأقواس تترابط من التعبير الفرعي الأقصى يمينًا إلى اليسار.</p>
<p>ملاحظة</p>
<p>التعليق النوعي اليدوي ليس ضروريًا لتنفيذ صحيح للدالة. والغرض منه توفير نوع أجمل. فبدون التعليق، سيكون النوع المستنتج لـ <code>fold_right</code> هو <code>('a -&gt; 'b -&gt; 'b) -&gt; 'a list -&gt; 'b -&gt; 'b</code>، حيث يختار المصرّف <code>'b</code> نوعًا للمجمِّع. وبتعليق ذلك الوسيط يدويًا باسم وصفي لذاته، نحصل على النوع الأكثر قابلية للقراءة <code>('a -&gt; 'acc -&gt; 'acc) -&gt; 'a list -&gt; 'acc -&gt; 'acc</code>.</p>
<h3 id="443-التعاود-الذيلي-وcombine">4.4.3. التعاود الذيلي وCombine <span class="content-anchor" id="tail-recursion-and-combine"></span></h3>
<p>لا <code>fold_right</code> ولا <code>combine</code> تعاودية ذيلية: فبعد عودة النداء التعاودي، لا يزال هناك عمل يجب إجراؤه في تطبيق الوسيط الدالي <code>f</code> أو <code>op</code>. لنعد إلى <code>combine</code> ونعد كتابتها لتكون تعاودية ذيلية. وكل ما يتطلبه ذلك هو تغيير فرع cons:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine_tr f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; combine_tr f (f acc h) t  <span class="hljs-comment">(* only real change *)</span>
</code></pre>
<pre><code class="language-text">val combine_tr : (&#x27;a -&gt; &#x27;b -&gt; &#x27;a) -&gt; &#x27;a -&gt; &#x27;b list -&gt; &#x27;a = &lt;fun&gt;
</code></pre>
<p>(سيلاحظ القراء المتيقظون أن نوع <code>combine_tr</code> مختلف عن نوع <code>combine</code>. وسنتناول ذلك قريبًا.)</p>
<p>الآن تُطبَّق الدالة <code>f</code> على عنصر الرأس <code>h</code> والمجمِّع <code>acc</code> <em>قبل</em> إجراء النداء التعاودي، مما يضمن عدم بقاء أي عمل يجب إجراؤه بعد عودة النداء. وإن بدا ذلك غامضًا بعض الشيء، فإليك إعادة كتابة للدالتين قد تساعد:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt;
    <span class="hljs-keyword">let</span> acc&#x27; = combine f acc t <span class="hljs-keyword">in</span>
    f h acc&#x27;
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> combine_tr f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt;
    <span class="hljs-keyword">let</span> acc&#x27; = f acc h <span class="hljs-keyword">in</span>
    combine_tr f acc&#x27; t
</code></pre>
<pre><code class="language-text">val combine : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a list -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val combine_tr : (&#x27;a -&gt; &#x27;b -&gt; &#x27;a) -&gt; &#x27;a -&gt; &#x27;b list -&gt; &#x27;a = &lt;fun&gt;
</code></pre>
<p>انتبه جيدًا إلى تعريف <code>acc'</code>، المجمِّع الجديد، في كل من هاتين النسختين:</p>
<ul>
<li>في النسخة الأصلية، نؤجّل استخدام عنصر الرأس <code>h</code>. فندمج أولًا جميع عناصر الذيل المتبقية لنحصل على <code>acc'</code>. وعندها فقط نستخدم <code>f</code> لطي الرأس للداخل. لذا فالقيمة الممرَّرة كقيمة أولية لـ <code>acc</code> تكون هي نفسها في كل استدعاء تعاودي لـ <code>combine</code>: فهي تمرَّرت نزولًا حتى موضع الحاجة إليها، عند العنصر الأقصى يمينًا في القائمة، ثم تُستخدم هناك مرة واحدة بالضبط.</li>
<li>أما في النسخة التعاودية الذيلية، فنحن «نُقدّم» فورًا بطي <code>h</code> باستخدام المجمِّع القديم <code>acc</code>. ثم نطوي ذلك مع جميع عناصر الذيل. لذا ففي كل استدعاء تعاودي، يمكن أن تكون القيمة الممرَّرة كوسيط <code>acc</code> مختلفة.</li>
</ul>
<p>تعمل النسخة التعاودية الذيلية من combine بشكل جيد تمامًا في الجمع (والدمج، الذي نحذفه):</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> sum = combine_tr ( + ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> s = sum [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val s : int = 6
</code></pre>
<p>لكن شيئًا قد يكون مفاجئًا يحدث مع الطرح:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> sub = combine ( - ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> s = sub [<span class="hljs-number">3</span>; <span class="hljs-number">2</span>; <span class="hljs-number">1</span>]
<span class="hljs-keyword">let</span> sub_tr = combine_tr ( - ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> s&#x27; = sub_tr [<span class="hljs-number">3</span>; <span class="hljs-number">2</span>; <span class="hljs-number">1</span>]
</code></pre>
<pre><code class="language-text">val sub : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val s : int = 2
</code></pre>
<pre><code class="language-text">val sub_tr : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val s&#x27; : int = -6
</code></pre>
<p>النتيجتان مختلفتان!</p>
<ul>
<li>مع <code>combine</code> نحسب <code>3 - (2 - (1 - 0))</code>. فنطوي أولًا <code>1</code>، ثم <code>2</code>، ثم <code>3</code>. أي أننا نعالج القائمة من اليمين إلى اليسار، ونضع المجمِّع الأولي في أقصى اليمين.</li>
<li>أما مع <code>combine_tr</code> فنجري الحساب <code>(((0 - 3) - 2) - 1)</code>. أي أننا نعالج القائمة من اليسار إلى اليمين، ونضع المجمِّع الأولي في أقصى اليسار.</li>
</ul>
<p>وفي الجمع لم يكن يهم بأي ترتيب نعالج القائمة، لأن الجمع تجميعي وإبدالي. لكن الطرح ليس كذلك، لذا ينتج عن الاتجاهين إجابتان مختلفتان.</p>
<p>في الواقع، لا ينبغي أن يكون ذلك مفاجئًا كثيرًا إن تذكرنا حين جعلنا <code>map</code> تعاودية ذيلية. فقد اكتشفنا حينها أن التعاود الذيلي يمكن أن يجعلنا نعالج القائمة بترتيب معكوس عن النسخة غير التعاودية الذيلية من الدالة نفسها. وهذا ما حدث هنا.</p>
<h3 id="444-الطي-نحو-اليسار-fold-left">4.4.4. الطي نحو اليسار (Fold Left) <span class="content-anchor" id="fold-left"></span></h3>
<p>دالتنا <code>combine_tr</code> موجودة أيضًا في المكتبة القياسية باسم <code>List.fold_left</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_left f (acc : <span class="hljs-symbol">&#x27;acc</span>) = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; fold_left f (f acc h) t
<span class="hljs-keyword">let</span> sum = fold_left ( + ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> concat = fold_left ( ^ ) <span class="hljs-string">&quot;&quot;</span>
</code></pre>
<pre><code class="language-text">val fold_left : (&#x27;acc -&gt; &#x27;a -&gt; &#x27;acc) -&gt; &#x27;acc -&gt; &#x27;a list -&gt; &#x27;acc = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val concat : string list -&gt; string = &lt;fun&gt;
</code></pre>
<p>لقد نجحنا مرة أخرى في تطبيق مبدأ التجريد.</p>
<h3 id="445-الطي-نحو-اليسار-مقابل-الطي-نحو-اليمين">4.4.5. الطي نحو اليسار مقابل الطي نحو اليمين <span class="content-anchor" id="fold-left-vs-fold-right"></span></h3>
<p>لنراجع الفروق بين <code>fold_right</code> و<code>fold_left</code>:</p>
<ul>
<li>إنهما تدمجان عناصر القائمة بترتيبين متعاكسين، كما يشير اسماهما. فالدالة <code>fold_right</code> تدمج من اليمين إلى اليسار، بينما تمضي <code>fold_left</code> من اليسار إلى اليمين.</li>
<li>الدالة <code>fold_left</code> تعاودية ذيلية بينما <code>fold_right</code> ليست كذلك.</li>
<li>نوعا الدالتين مختلفان. ففي <code>fold_X</code> يذهب وسيط المجمِّع إلى موضع <code>X</code> من وسيط القائمة. وهذا خيار اتخذته المكتبة القياسية لا فرق تنفيذي ضروري.</li>
</ul>
<p>وإذا وجدت صعوبة في تتبّع ترتيب الوسائط، فقد تساعدك <a href="https://ocaml.org/api/ListLabels.html">وحدة <code>ListLabels</code></a> في المكتبة القياسية. فهي تستخدم وسائط مسمّاة لإعطاء أسماء لمؤثر الدمج (الذي تسميه <code>f</code>) والقيمة الأولية للمجمِّع (التي تسميها <code>init</code>). أما داخليًا، فالتنفيذ في الواقع مطابق لتنفيذ وحدة <code>List</code>.</p>
<pre><code class="language-ocaml"><span class="hljs-type">ListLabels</span>.fold_left ~f:(<span class="hljs-keyword">fun</span> x y -&gt; x - y) ~init:<span class="hljs-number">0</span> [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>];;
</code></pre>
<pre><code class="language-text">- : int = -6
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-type">ListLabels</span>.fold_right ~f:(<span class="hljs-keyword">fun</span> y x -&gt; x - y) ~init:<span class="hljs-number">0</span> [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>];;
</code></pre>
<pre><code class="language-text">- : int = -6
</code></pre>
<p>لاحظ كيف تمكّنا في تطبيقي fold أعلاه من كتابة الوسائط بترتيب موحّد بفضل تسمياتها. ومع ذلك، لا يزال علينا الحذر بشأن أي وسيط لمؤثر الدمج هو عنصر القائمة وأيّها قيمة المجمِّع.</p>
<h3 id="446-استطراد-عن-الوسائط-المسماة-وfold">4.4.6. استطراد عن الوسائط المسمّاة وFold <span class="content-anchor" id="a-digression-on-labeled-arguments-and-fold"></span></h3>
<p>من الممكن كتابة نسختنا الخاصة من دالتي fold تسمّي وسائط مؤثر الدمج، فلا نضطر حتى إلى تذكّر ترتيبها:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_left ~op:(f: acc:<span class="hljs-symbol">&#x27;a</span> -&gt; elt:<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;a</span>) ~init:acc lst =
  <span class="hljs-keyword">match</span> lst <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; fold_left ~op:f ~init:(f ~acc:acc ~elt:h) t
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_right ~op:(f: elt:<span class="hljs-symbol">&#x27;a</span> -&gt; acc:<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) lst ~init:acc =
  <span class="hljs-keyword">match</span> lst <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; acc
  | h :: t -&gt; f ~elt:h ~acc:(fold_right ~op:f t ~init:acc)
</code></pre>
<pre><code class="language-text">val fold_left : op:(acc:&#x27;a -&gt; elt:&#x27;b -&gt; &#x27;a) -&gt; init:&#x27;a -&gt; &#x27;b list -&gt; &#x27;a =
  &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val fold_right : op:(elt:&#x27;a -&gt; acc:&#x27;b -&gt; &#x27;b) -&gt; &#x27;a list -&gt; init:&#x27;b -&gt; &#x27;b =
  &lt;fun&gt;
</code></pre>
<p>لكن هاتين الدالتين ليستا مفيدتين كما قد تبدوان:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> s = fold_left ~op:( + ) ~init:<span class="hljs-number">0</span> [<span class="hljs-number">1</span>;<span class="hljs-number">2</span>;<span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">File &quot;[16]&quot;, line 1, characters 22-27:
1 | let s = fold_left ~op:( + ) ~init:0 [1;2;3]
                          ^^^^^
Error: The value (+) has type int -&gt; int -&gt; int
       but an expression was expected of type acc:&#x27;a -&gt; elt:&#x27;b -&gt; &#x27;a
       A label acc was expected
</code></pre>
<p>المشكلة أن المؤثر المدمج <code>+</code> ليس له وسائط مسمّاة، لذا لا يمكننا تمريره كمؤثر دمج إلى دوالنا المسمّاة. وسنضطر إلى تعريف نسختنا المسمّاة منه:</p>
<pre><code class="language-text">let add ~acc ~elt = acc + elt
let s = fold_left ~op:add ~init:0 [1; 2; 3]
</code></pre>
<p>لكن علينا الآن أن نتذكر أن المعامل <code>~acc</code> في <code>add</code> سيصبح الوسيط الأيسر لـ <code>( + )</code>. وهذا ليس تحسنًا كبيرًا فعلًا عمّا كان علينا تذكّره في البداية.</p>
<h3 id="447-استخدام-fold-لتنفيذ-دوال-أخرى">4.4.7. استخدام Fold لتنفيذ دوال أخرى <span class="content-anchor" id="using-fold-to-implement-other-functions"></span></h3>
<p>الطي قوي إلى حد أننا نستطيع كتابة دوال قوائم كثيرة أخرى بدلالة <code>fold_left</code> أو <code>fold_right</code>. على سبيل المثال،</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> length lst =
  <span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc _ -&gt; acc + <span class="hljs-number">1</span>) <span class="hljs-number">0</span> lst
<span class="hljs-keyword">let</span> rev lst =
  <span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc x -&gt; x :: acc) <span class="hljs-literal">[]</span> lst
<span class="hljs-keyword">let</span> map f lst =
  <span class="hljs-type">List</span>.fold_right (<span class="hljs-keyword">fun</span> x acc -&gt; f x :: acc) lst <span class="hljs-literal">[]</span>
<span class="hljs-keyword">let</span> filter f lst =
  <span class="hljs-type">List</span>.fold_right (<span class="hljs-keyword">fun</span> x acc -&gt; <span class="hljs-keyword">if</span> f x <span class="hljs-keyword">then</span> x :: acc <span class="hljs-keyword">else</span> acc) lst <span class="hljs-literal">[]</span>
</code></pre>
<pre><code class="language-text">val length : &#x27;a list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val rev : &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val map : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val filter : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<p>في هذه المرحلة يصبح من القابل للجدل ما إذا كان الأفضل التعبير عن الحسابات أعلاه بالطي أم بالطرق التي رأيناها بالفعل. فحتى لمبرمج وظيفي متمرس، قد يستغرق فهم ما تفعله fold وقتًا أطول من قراءة التنفيذ التعاودي البديهي. وإذا تصفحت <a href="https://github.com/ocaml/ocaml/blob/trunk/stdlib/list.ml">شيفرة مصادر المكتبة القياسية</a>، فسترى أن أي شيء داخل وحدة <code>List</code> ليس منفّذًا بدلالة الطي، وهذا ربما تعليق على قابلية قراءة fold. وفي المقابل، يضمن استخدام fold ألا يبرمج المبرمج الاجتياز التعاودي على نحو خاطئ بالخطأ. وقد يكون ذلك المتانة مكسبًا لبنية بيانات أكثر تعقيدًا من القوائم.</p>
<h3 id="448-fold-مقابل-التعاود-مقابل-المكتبة">4.4.8. Fold مقابل التعاود مقابل المكتبة <span class="content-anchor" id="fold-vs-recursive-vs-library"></span></h3>
<p>رأينا الآن ثلاث طرق مختلفة لكتابة الدوال التي تتعامل مع القوائم:</p>
<ul>
<li>مباشرةً كدالة تعاودية تطابق نمطيًا القائمة الفارغة وcons،</li>
<li>باستخدام دوال <code>fold</code>، و</li>
<li>باستخدام دوال مكتبة أخرى.</li>
</ul>
<p>لنجرّب استخدام كل من تلك الطرق لحل مسألة، حتى نقدّرها على نحو أفضل.</p>
<p>فكّر في كتابة دالة <code>lst_and: bool list -&gt; bool</code>، بحيث تعيد <code>lst_and [a1; ...; an]</code> ما إذا كانت جميع عناصر القائمة <code>true</code>. أي أنها تقيّم مثل <code>a1 &amp;&amp; a2 &amp;&amp; ... &amp;&amp; an</code>. وعند تطبيقها على قائمة فارغة، تقيّم إلى <code>true</code>.</p>
<p>وإليك ثلاث طرق ممكنة لكتابة دالة كهذه. ونعطي كل طريقة اسم دالة مختلفًا قليلًا للتوضيح.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> lst_and_rec = <span class="hljs-keyword">function</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">true</span>
  | h :: t -&gt; h &amp;&amp; lst_and_rec t
<span class="hljs-keyword">let</span> lst_and_fold =
	<span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc elt -&gt; acc &amp;&amp; elt) <span class="hljs-literal">true</span>
<span class="hljs-keyword">let</span> lst_and_lib =
	<span class="hljs-type">List</span>.for_all (<span class="hljs-keyword">fun</span> x -&gt; x)
</code></pre>
<pre><code class="language-text">val lst_and_rec : bool list -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst_and_fold : bool list -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val lst_and_lib : bool list -&gt; bool = &lt;fun&gt;
</code></pre>
<p>زمن تشغيل الدوال الثلاث في أسوأ الحالات خطي في طول القائمة. لكن:</p>
<ul>
<li>للدالة الأولى، <code>lst_and_rec</code>، ميزة أنها لا تحتاج إلى معالجة القائمة بأكملها. فهي تعيد <code>false</code> فورًا عند أول اكتشافها عنصرًا <code>false</code> في القائمة.</li>
<li>أما الدالة الثانية، <code>lst_and_fold</code>، فستعالج دائمًا كل عنصر من عناصر القائمة.</li>
<li>وأما الدالة الثالثة، <code>lst_and_lib</code>، فوفقًا لتوثيق <code>List.for_all</code>، تعيد <code>(p a1) &amp;&amp; (p a2) &amp;&amp; ... &amp;&amp; (p an)</code>. لذا فهي، مثل <code>lst_and_rec</code>، لا تحتاج إلى معالجة كل عنصر.</li>
</ul>
<h2 id="45-ما-بعد-القوائم">4.5. ما بعد القوائم <span class="content-anchor" id="beyond-lists"></span></h2>
<p>لا تقتصر الدواليات مثل map وfold على القوائم. فهي ذات معنى مع أي نوع تقريبًا من تجميعات البيانات. على سبيل المثال، تذكّر تمثيل الشجرة هذا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> tree =
  | <span class="hljs-type">Leaf</span>
  | <span class="hljs-type">Node</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> tree * <span class="hljs-symbol">&#x27;a</span> tree
</code></pre>
<pre><code class="language-text">type &#x27;a tree = Leaf | Node of &#x27;a * &#x27;a tree * &#x27;a tree
</code></pre>
<h3 id="451-map-على-الأشجار">4.5.1. Map على الأشجار <span class="content-anchor" id="map-on-trees"></span></h3>
<p>هذه سهلة. كل ما علينا فعله هو تطبيق الدالة <code>f</code> على القيمة <code>v</code> في كل عقدة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map_tree f = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Leaf</span> -&gt; <span class="hljs-type">Leaf</span>
  | <span class="hljs-type">Node</span> (v, l, r) -&gt; <span class="hljs-type">Node</span> (f v, map_tree f l, map_tree f r)
</code></pre>
<pre><code class="language-text">val map_tree : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a tree -&gt; &#x27;b tree = &lt;fun&gt;
</code></pre>
<h3 id="452-fold-على-الأشجار">4.5.2. Fold على الأشجار <span class="content-anchor" id="fold-on-trees"></span></h3>
<p>هذه أصعب قليلًا فحسب. لنطوّر دالة fold لـ <code>'a tree</code> شبيهة بـ <code>fold_right</code> لدينا على <code>'a list</code>. وإحدى طرق التفكير في <code>List.fold_right</code> هي أن القيمة <code>[]</code> في القائمة تُستبدل بالوسيط <code>acc</code>، وأن كل منشئ <code>::</code> يُستبدل بتطبيق للوسيط <code>f</code>. على سبيل المثال، <code>[a; b; c]</code> سكر صياغي لـ <code>a :: (b :: (c :: []))</code>. لذا إذا استبدلنا <code>[]</code> بـ <code>0</code> و<code>::</code> بـ <code>( + )</code>، نحصل على <code>a + (b + (c + 0))</code>. وعلى هذا المنوال، إليك طريقة يمكننا بها إعادة كتابة <code>fold_right</code> تساعدنا على التفكير بوضوح أكبر قليلًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> mylist =
  | <span class="hljs-type">Nil</span>
  | <span class="hljs-type">Cons</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> mylist
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_mylist f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Nil</span> -&gt; acc
  | <span class="hljs-type">Cons</span> (h, t) -&gt; f h (fold_mylist f acc t)
</code></pre>
<pre><code class="language-text">type &#x27;a mylist = Nil | Cons of &#x27;a * &#x27;a mylist
</code></pre>
<pre><code class="language-text">val fold_mylist : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a mylist -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>الخوارزمية هي نفسها. كل ما فعلناه هو تغيير تعريف القوائم لاستخدام منشئات مكتوبة بحروف أبجدية بدلًا من علامات ترقيم، وتغيير ترتيب وسائط دالة fold.</p>
<p>وفي الأشجار، سنريد أن تستبدل القيمة الأولية لـ <code>acc</code> كل منشئ <code>Leaf</code>، تمامًا كما استبدلت <code>[]</code> في القوائم. وسنريد أن يستبدل كل منشئ <code>Node</code> بالمؤثر. لكن المؤثر سيحتاج الآن إلى أن يكون <em>ثلاثيًا</em> بدلًا من <em>ثنائي</em> — أي سيحتاج إلى أخذ ثلاثة وسائط بدلًا من اثنين — لأن عقدة الشجرة لها قيمة وطفل أيسر وطفل أيمن، بينما كان cons في القائمة له رأس وذيل فقط.</p>
<p>واستلهامًا من تلك الملاحظات، إليك دالة fold على الأشجار:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fold_tree f acc = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Leaf</span> -&gt; acc
  | <span class="hljs-type">Node</span> (v, l, r) -&gt; f v (fold_tree f acc l) (fold_tree f acc r)
</code></pre>
<pre><code class="language-text">val fold_tree : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a tree -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>وإذا قارنت تلك الدالة بـ <code>fold_mylist</code>، فستلاحظ أنها تكاد تكون مطابقة لها. فلا يزيد الأمر إلا عن نداء تعاودي واحد في فرع التطابق النمطي الثاني، مقابل وجود إضافي واحد لـ <code>'a tree</code> في تعريف ذلك النوع.</p>
<p>ويمكننا بعدها استخدام <code>fold_tree</code> لتنفيذ بعض دوال الأشجار التي رأيناها سابقًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> size t = fold_tree (<span class="hljs-keyword">fun</span> _ l r -&gt; <span class="hljs-number">1</span> + l + r) <span class="hljs-number">0</span> t
<span class="hljs-keyword">let</span> depth t = fold_tree (<span class="hljs-keyword">fun</span> _ l r -&gt; <span class="hljs-number">1</span> + max l r) <span class="hljs-number">0</span> t
<span class="hljs-keyword">let</span> preorder t = fold_tree (<span class="hljs-keyword">fun</span> x l r -&gt; [x] @ l @ r) <span class="hljs-literal">[]</span> t
</code></pre>
<pre><code class="language-text">val size : &#x27;a tree -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val depth : &#x27;a tree -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val preorder : &#x27;a tree -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<p>ولماذا اخترنا <code>fold_right</code> لا <code>fold_left</code> لهذا التطوير؟ لأن <code>fold_left</code> تعاودية ذيلية، وهو أمر لن نحققه أبدًا على الأشجار الثنائية. افترض أننا عالجنا الفرع الأيسر أولًا؛ فسيظل علينا بعد ذلك معالجة الفرع الأيمن قبل أن نتمكن من العودة. لذا سيكون هناك دائمًا عمل متبقٍ يجب إجراؤه بعد النداء التعاودي على أحد الفرعين. وبذلك، يكون مكافئ <code>fold_right</code> هو أفضل ما نطمح إليه في الأشجار.</p>
<p>والتقنية التي استخدمناها لاشتقاق <code>fold_tree</code> تعمل مع أي نوع متغاير <code>t</code> في OCaml:</p>
<ul>
<li>اكتب دالة <code>fold</code> تعاودية تأخذ وسيطًا واحدًا لكل منشئ من منشئات <code>t</code>.</li>
<li>وتطابق تلك الدالة <code>fold</code> المنشئات، وتستدعي نفسها تعاوديًا على أي قيمة من النوع <code>t</code> تصادفها.</li>
<li>واستخدم الوسيط المناسب من <code>fold</code> لدمج نتائج جميع النداءات التعاودية إضافةً إلى جميع البيانات غير من النوع <code>t</code> عند كل منشئ.</li>
</ul>
<p>وتبني هذه التقنية شيئًا يسمى <em>كاتامورفيزم</em> (catamorphism)، أي <em>عملية طي معمّمة</em>. ولمعرفة المزيد عن الكاتامورفيزمات، خذ مقررًا في نظرية الفئات (category theory).</p>
<h3 id="453-filter-على-الأشجار">4.5.3. Filter على الأشجار <span class="content-anchor" id="filter-on-trees"></span></h3>
<p>هذه ربما أصعبها تصميمًا. فالمشكلة هي: إذا قررنا ترشيح عقدة، فماذا نفعل بأطفالها؟</p>
<ul>
<li>يمكننا التعاود على الأطفال. فإذا لم يبقَ بعد ترشيحهم إلا طفل واحد، أمكننا ترقيته ليحل محل والده. لكن ماذا لو بقي الطفلان معًا، أو لم يبقَ أي منهما؟ عندئذ سيتعين علينا إعادة تشكيل الشجرة بطريقة ما. ومن دون معرفة المزيد عن كيفية استعمال الشجرة — أي نوع البيانات الذي تمثله — نكون متعطلين.</li>
<li>وبدلًا من ذلك، يمكننا ببساطة إزالة الأطفال كليًا. فيكون قرار ترشيح عقدة يعني تقليم الشجرة الفرعية كلها المتجذرة عند تلك العقدة.</li>
</ul>
<p>والاحتمال الأخير سهل التنفيذ:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> filter_tree p = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Leaf</span> -&gt; <span class="hljs-type">Leaf</span>
  | <span class="hljs-type">Node</span> (v, l, r) -&gt;
    <span class="hljs-keyword">if</span> p v <span class="hljs-keyword">then</span> <span class="hljs-type">Node</span> (v, filter_tree p l, filter_tree p r) <span class="hljs-keyword">else</span> <span class="hljs-type">Leaf</span>
</code></pre>
<pre><code class="language-text">val filter_tree : (&#x27;a -&gt; bool) -&gt; &#x27;a tree -&gt; &#x27;a tree = &lt;fun&gt;
</code></pre>
<h2 id="46-خطوط-الأنابيب">4.6. خطوط الأنابيب <span class="content-anchor" id="pipelining"></span></h2>
<p>افترض أننا أردنا حساب مجموع مربعات الأعداد من 0 حتى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>. كيف قد نفعل ذلك؟ بالطبع (والرياضيات أفضل أشكال التحسين)، ستكون الطريقة الأكثر كفاءة صيغة مغلقة:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mfrac><mrow><mi>n</mi><mo stretchy="false">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mn>2</mn><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mn>6</mn></mfrac></mrow><annotation encoding="application/x-tex"> \\frac{n (n+1) (2n+1)}{6} </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">6</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord">2</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
<p>لكن لنتخيل أنك نسيت تلك الصيغة. في لغة أمرية قد تستخدم حلقة <code>for</code>:</p>
<pre><code class="language-python"><span class="hljs-comment"># Python</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_sq</span>(<span class="hljs-params">n</span>):
	<span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>
	<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, n+<span class="hljs-number">1</span>):
		<span class="hljs-built_in">sum</span> += i * i
	<span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>
</code></pre>
<p>وتكون الشيفرة التعاودية (الذيلية) المكافئة في OCaml:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> sum_sq n =
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> loop i sum =
    <span class="hljs-keyword">if</span> i &gt; n <span class="hljs-keyword">then</span> sum
    <span class="hljs-keyword">else</span> loop (i + <span class="hljs-number">1</span>) (sum + i * i)
  <span class="hljs-keyword">in</span> loop <span class="hljs-number">0</span> <span class="hljs-number">0</span>
</code></pre>
<pre><code class="language-text">val sum_sq : int -&gt; int = &lt;fun&gt;
</code></pre>
<p>وثمة طريقة أخرى أوضح لإنتاج النتيجة نفسها في OCaml تستخدم الدوال من الرتبة العليا ومؤثر خط الأنابيب:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> ( -- ) i j = <span class="hljs-keyword">if</span> i &gt; j <span class="hljs-keyword">then</span> <span class="hljs-literal">[]</span> <span class="hljs-keyword">else</span> i :: i + <span class="hljs-number">1</span> -- j
<span class="hljs-keyword">let</span> square x = x * x
<span class="hljs-keyword">let</span> sum = <span class="hljs-type">List</span>.fold_left ( + ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> sum_sq n =
  <span class="hljs-number">0</span> -- n              <span class="hljs-comment">(* [0;1;2;...;n]   *)</span>
  |&gt; <span class="hljs-type">List</span>.map square  <span class="hljs-comment">(* [0;1;4;...;n*n] *)</span>
  |&gt; sum              <span class="hljs-comment">(*  0+1+4+...+n*n  *)</span>
</code></pre>
<pre><code class="language-text">val ( -- ) : int -&gt; int -&gt; int list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val square : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_sq : int -&gt; int = &lt;fun&gt;
</code></pre>
<p>تنشئ الدالة <code>sum_sq</code> أولًا قائمة تحتوي على جميع الأعداد <code>0..n</code>. ثم تستخدم مؤثر خط الأنابيب <code>|&gt;</code> لتمرير تلك القائمة عبر <code>List.map square</code>، الذي يربّع كل عنصر. ثم تمر القائمة الناتجة عبر خط أنابيب إلى <code>sum</code>، الذي يجمع جميع العناصر معًا.</p>
<p>أما البدائل الأخرى التي قد تفكر فيها فهي أقبح بعض الشيء:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* Maybe worse: a lot of extra [let..in] syntax and unnecessary names
   for intermediate values we don&#x27;t care about. *)</span>
<span class="hljs-keyword">let</span> sum_sq n =
  <span class="hljs-keyword">let</span> l = <span class="hljs-number">0</span> -- n <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> sq_l = <span class="hljs-type">List</span>.map square l <span class="hljs-keyword">in</span>
  sum sq_l
<span class="hljs-comment">(* Maybe worse: have to read the function applications from right to left
   rather than top to bottom, and extra parentheses. *)</span>
<span class="hljs-keyword">let</span> sum_sq n =
  sum (<span class="hljs-type">List</span>.map square (<span class="hljs-number">0</span>--n))
</code></pre>
<pre><code class="language-text">val sum_sq : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_sq : int -&gt; int = &lt;fun&gt;
</code></pre>
<p>والجانب السلبي في كل هذه البدائل مقارنةً بالنسخة التعاودية الذيلية الأصلية أنها مبذّرة للمساحة — خطية بدلًا من ثابتة — وتستغرق زمنًا أكبر بعامل ثابت. وكما هي الحال في البرمجة كثيرًا، توجد مقايضة بين وضوح الشيفرة وكفاءتها.</p>
<p>لاحظ أن عدم الكفاءة <em>ليس</em> من مؤثر خط الأنابيب نفسه، بل من الاضطرار إلى بناء كل تلك القوائم الوسيطة غير الضرورية. فلا تأخذ الفكرة بأن خطوط الأنابيب سيئة جوهريًا. بل إنها قد تكون مفيدة جدًا. وعندما نصل إلى فصل الوحدات، سنستخدمها كثيرًا مع بعض بنى البيانات التي ندرسها هناك.</p>
<h2 id="47-الكاري">4.7. الكاري <span class="content-anchor" id="currying"></span></h2>
<p>رأينا بالفعل أن دالة OCaml تأخذ وسيطين من النوعين <code>t1</code> و<code>t2</code> وتعيد قيمة من النوع <code>t3</code> لها النوع <code>t1 -&gt; t2 -&gt; t3</code>. ونستخدم متغيرين بعد اسم الدالة في تعبير let:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add x y = x + y
</code></pre>
<pre><code class="language-text">val add : int -&gt; int -&gt; int = &lt;fun&gt;
</code></pre>
<p>وثمة طريقة أخرى لتعريف دالة تأخذ وسيطين هي كتابة دالة تأخذ زوجًا مرتبًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add&#x27; t = fst t + snd t
</code></pre>
<pre><code class="language-text">val add&#x27; : int * int -&gt; int = &lt;fun&gt;
</code></pre>
<p>وبدلًا من استخدام <code>fst</code> و<code>snd</code>، يمكننا استخدام نمط زوج مرتب في تعريف الدالة، فينتج تنفيذ ثالث:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add&#x27;&#x27; (x, y) = x + y
</code></pre>
<pre><code class="language-text">val add&#x27;&#x27; : int * int -&gt; int = &lt;fun&gt;
</code></pre>
<p>الدوال المكتوبة بالأسلوب الأول (بالنوع <code>t1 -&gt; t2 -&gt; t3</code>) تسمى دوال <em>مكارَية</em> (curried)، والدوال المستخدمة بالأسلوب الثاني (بالنوع <code>t1 * t2 -&gt; t3</code>) تسمى <em>غير مكارَية</em> (uncurried). ومن باب الاستعارة، الدوال المكارَية «أكثر بهارات» لأنك تستطيع تطبيقها جزئيًا (وهو ما لا تستطيع فعله بالدوال غير المكارَية: لا يمكنك تمرير نصف زوج). في الواقع، لا يشير مصطلح curry إلى البهارات، بل إلى منطقي اسمه <a href="https://en.wikipedia.org/wiki/Haskell_Curry">Haskell Curry</a> (وهو واحد من مجموعة صغيرة جدًا من الأشخاص الذين سُميت لغات برمجة باسمهم الأول واسمهم الأخير معًا).</p>
<p>أحيانًا ستصادف مكتبات توفر نسخة غير مكارَية من دالة، لكنك تريد نسخة مكارَية منها لاستخدامها في شيفرتك؛ أو العكس. لذا من المفيد معرفة كيفية التحويل بين نوعي الدوال، كما فعلنا مع <code>add</code> أعلاه.</p>
<p>بل يمكنك كتابة بضع دوال من الرتبة العليا تقوم بالتحويل عنك:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> curry f x y = f (x, y)
<span class="hljs-keyword">let</span> uncurry f (x, y) = f x y
</code></pre>
<pre><code class="language-text">val curry : (&#x27;a * &#x27;b -&gt; &#x27;c) -&gt; &#x27;a -&gt; &#x27;b -&gt; &#x27;c = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val uncurry : (&#x27;a -&gt; &#x27;b -&gt; &#x27;c) -&gt; &#x27;a * &#x27;b -&gt; &#x27;c = &lt;fun&gt;
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> uncurried_add = uncurry add
<span class="hljs-keyword">let</span> curried_add = curry add&#x27;&#x27;
</code></pre>
<pre><code class="language-text">val uncurried_add : int * int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val curried_add : int -&gt; int -&gt; int = &lt;fun&gt;
</code></pre>
<h2 id="48-قوانين-جبرية-للدوال-من-الرتبة-العليا">4.8. قوانين جبرية للدوال من الرتبة العليا <span class="content-anchor" id="algebraic-laws-for-higher-order-functions"></span></h2>
<p>استخدمنا <code>map</code> و<code>filter</code> و<code>fold</code> لوصف حسابات على القوائم. وتخضع هذه الدوال أيضًا <em>لقوانين جبرية</em> (algebraic laws): معادلات تتيح لنا استبدال تعبير بآخر يحسب النتيجة نفسها. وعلى وجه الخصوص، يمكن للقوانين أن تدمج عدة اجتيازات في اجتياز واحد، وهو تحويل يسمى <em>الدمج</em> (fusion).</p>
<p>وكقيد تقني مهم، يجب أن نفترض أن الدوال والمحمولات المتضمنة في هذا القسم نقية ومتوقفة. وسنعود إلى سبب أهمية ذلك الافتراض في النهاية.</p>
<h3 id="481-ثلاث-دواليات-صغيرة">4.8.1. ثلاث دواليات صغيرة <span class="content-anchor" id="three-small-functionals"></span></h3>
<p>وكخطوة تمهيدية، لنعرّف بعض الدوال التي سنستخدمها في القوانين. يؤلّف المؤثر <code>&lt;&lt;</code> بين دالتين: فـ <code>f &lt;&lt; g</code> تطبّق <code>g</code> أولًا ثم <code>f</code>. أي أنه يركّب الدوال من اليمين إلى اليسار. ويجمع المؤثر <code>&amp;&amp;&amp;</code> بين محمولين. وأخيرًا، تطبّق <code>guard p f</code> الدالة <code>f</code> فقط عندما يتحقق <code>p</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> ( &lt;&lt; ) f g x = f (g x)
<span class="hljs-keyword">let</span> ( &amp;&amp;&amp; ) p q x = p x &amp;&amp; q x
<span class="hljs-keyword">let</span> id x = x
<span class="hljs-keyword">let</span> guard p f x =
  <span class="hljs-keyword">if</span> p x <span class="hljs-keyword">then</span> f x <span class="hljs-keyword">else</span> id
</code></pre>
<pre><code class="language-text">val ( &lt;&lt; ) : (&#x27;a -&gt; &#x27;b) -&gt; (&#x27;c -&gt; &#x27;a) -&gt; &#x27;c -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val ( &amp;&amp;&amp; ) : (&#x27;a -&gt; bool) -&gt; (&#x27;a -&gt; bool) -&gt; &#x27;a -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val id : &#x27;a -&gt; &#x27;a = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val guard : (&#x27;a -&gt; bool) -&gt; (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;a -&gt; &#x27;b -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>كما سنستخدم هذه الأسماء المختصرة لدوال المكتبة القياسية:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> map = <span class="hljs-type">List</span>.map
<span class="hljs-keyword">let</span> filter = <span class="hljs-type">List</span>.filter
<span class="hljs-keyword">let</span> foldr f z lst = <span class="hljs-type">List</span>.fold_right f lst z
</code></pre>
<pre><code class="language-text">val map : (&#x27;a -&gt; &#x27;b) -&gt; &#x27;a list -&gt; &#x27;b list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val filter : (&#x27;a -&gt; bool) -&gt; &#x27;a list -&gt; &#x27;a list = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val foldr : (&#x27;a -&gt; &#x27;b -&gt; &#x27;b) -&gt; &#x27;b -&gt; &#x27;a list -&gt; &#x27;b = &lt;fun&gt;
</code></pre>
<p>غيّرنا ترتيب معاملات <code>foldr</code> لتصبح القائمة الوسيط الأخير، حتى نتمكن من تركيبها مع <code>map</code> و<code>filter</code> في القوانين أدناه.</p>
<h3 id="482-دمج-map-وfilter">4.8.2. دمج Map وFilter <span class="content-anchor" id="fusing-maps-and-filters"></span></h3>
<p>تخطيط دالة الهوية يترك عناصر القائمة دون تغيير. وتخطيط دالتين على التوالي يكافئ تخطيط تركيبتهما:</p>
<pre><code class="language-ocaml">map id = id
map (f &lt;&lt; g) = map f &lt;&lt; map g
</code></pre>
<p>على سبيل المثال، ينتج هذان التعبيران كلاهما <code>[4; 9; 16]</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> add_one x = x + <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> square x = x * x
<span class="hljs-keyword">let</span> mapped = (map square &lt;&lt; map add_one) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
<span class="hljs-keyword">let</span> mapped_fused = map (square &lt;&lt; add_one) [<span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>]
</code></pre>
<pre><code class="language-text">val add_one : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val square : int -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val mapped : int list = [4; 9; 16]
</code></pre>
<pre><code class="language-text">val mapped_fused : int list = [4; 9; 16]
</code></pre>
<p>تتجنب النسخة المدمجة بناء القائمة الوسيطة <code>map g lst</code>.</p>
<p>ويمكن دمج مرشّحين اثنين أيضًا:</p>
<pre><code class="language-ocaml">filter p &lt;&lt; filter q = filter (p &amp;&amp;&amp; q)
</code></pre>
<p>ومرة أخرى، تتجنب النسخة المدمجة قائمة وسيطة.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> positive x = x &gt; <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> even x = x <span class="hljs-keyword">mod</span> <span class="hljs-number">2</span> = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> selected = (filter positive &lt;&lt; filter even) [-<span class="hljs-number">2</span>; -<span class="hljs-number">1</span>; <span class="hljs-number">0</span>; <span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>; <span class="hljs-number">4</span>]
<span class="hljs-keyword">let</span> selected_fused = filter (positive &amp;&amp;&amp; even) [-<span class="hljs-number">2</span>; -<span class="hljs-number">1</span>; <span class="hljs-number">0</span>; <span class="hljs-number">1</span>; <span class="hljs-number">2</span>; <span class="hljs-number">3</span>; <span class="hljs-number">4</span>]
</code></pre>
<pre><code class="language-text">val positive : int -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val even : int -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val selected : int list = [2; 4]
</code></pre>
<pre><code class="language-text">val selected_fused : int list = [2; 4]
</code></pre>
<p>كل من <code>selected</code> و<code>selected_fused</code> هو <code>[2; 4]</code>.</p>
<h3 id="483-دمج-map-أو-filter-في-طي-نحو-اليمين">4.8.3. دمج Map أو Filter في طي نحو اليمين <span class="content-anchor" id="fusing-map-or-filter-into-a-right-fold"></span></h3>
<p>يزيل القانونان التاليان القائمة التي كانت map أو filter ستنشئها قبل الطي نحو اليمين:</p>
<pre><code class="language-ocaml">foldr f z &lt;&lt; map g = foldr (f &lt;&lt; g) z
foldr f z &lt;&lt; filter p = foldr (guard p f) z
</code></pre>
<p>في القانون الأول، يحسب <code>(f &lt;&lt; g) x acc</code> المقدار <code>f (g x) acc</code>. وفي الثاني، إما أن تدمج <code>guard p f x acc</code> العنصر <code>x</code> مع المجمِّع أو تمرّر المجمِّع دون تغيير. ويحافظ كلا القانونين على الترتيب الذي يدمج به الطي نحو اليمين العناصر.</p>
<h3 id="484-دمج-خط-أنابيب-كامل">4.8.4. دمج خط أنابيب كامل <span class="content-anchor" id="fusing-an-entire-pipeline"></span></h3>
<p>يمكننا تطبيق تلك القوانين على التوالي. وعندما يأتي filter قبل map، تختبر خطوة الطي العنصر الأصلي ثم تحوّله:</p>
<pre><code class="language-ocaml">foldr f z &lt;&lt; map g &lt;&lt; filter p
= foldr (guard p (f &lt;&lt; g)) z
</code></pre>
<p>وعندما يأتي map قبل filter، يجب أن يختبر المحمول العنصر المحوَّل. وهذا يفسّر التركيب الإضافي <code>p &lt;&lt; g</code>:</p>
<pre><code class="language-ocaml">foldr f z &lt;&lt; filter p &lt;&lt; map g
= foldr (guard (p &lt;&lt; g) (f &lt;&lt; g)) z
</code></pre>
<p>وإليك الترتيبين في OCaml:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> sum_even_squares =
  foldr ( + ) <span class="hljs-number">0</span> &lt;&lt; map square &lt;&lt; filter even
<span class="hljs-keyword">let</span> sum_even_squares_fused =
  foldr (guard even (( + ) &lt;&lt; square)) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> large x = x &gt; <span class="hljs-number">10</span>
<span class="hljs-keyword">let</span> sum_large_squares =
  foldr ( + ) <span class="hljs-number">0</span> &lt;&lt; filter large &lt;&lt; map square
<span class="hljs-keyword">let</span> sum_large_squares_fused =
  foldr (guard (large &lt;&lt; square) (( + ) &lt;&lt; square)) <span class="hljs-number">0</span>
</code></pre>
<pre><code class="language-text">val sum_even_squares : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_even_squares_fused : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val large : int -&gt; bool = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_large_squares : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_large_squares_fused : int list -&gt; int = &lt;fun&gt;
</code></pre>
<p>بالنسبة إلى <code>[1; 2; 3; 4]</code>، يعيد الزوج الأول <code>20</code>: فهو يختار المدخلات الزوجية ثم يربّعها. وبالنسبة إلى <code>[1; 2; 4; 5]</code>، يعيد الزوج الثاني <code>41</code>: فهو يربّع كل مدخل ثم يختار النتائج الأكبر من <code>10</code>. وكل دالة مدمجة تجتاز مدخلها مرة واحدة دون بناء قائمة وسيطة.</p>
<h3 id="485-قانون-ذو-صلة-للطي-نحو-اليسار">4.8.5. قانون ذو صلة للطي نحو اليسار <span class="content-anchor" id="a-related-law-for-left-folds"></span></h3>
<p>يمكن أيضًا دمج map في <code>List.fold_left</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-type">List</span>.fold_left f z (<span class="hljs-type">List</span>.map g lst)
= <span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc x -&gt; f acc (g x)) z lst
</code></pre>
<p>يبدأ الطرفان بـ <code>z</code> ويحدّثان المجمِّع بـ <code>f acc (g x)</code> لكل عنصر، من اليسار إلى اليمين. على سبيل المثال:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> sum_of_squares lst =
  lst |&gt; <span class="hljs-type">List</span>.map square |&gt; <span class="hljs-type">List</span>.fold_left ( + ) <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> sum_of_squares_fused lst =
  lst |&gt; <span class="hljs-type">List</span>.fold_left (<span class="hljs-keyword">fun</span> acc x -&gt; acc + square x) <span class="hljs-number">0</span>
</code></pre>
<pre><code class="language-text">val sum_of_squares : int list -&gt; int = &lt;fun&gt;
</code></pre>
<pre><code class="language-text">val sum_of_squares_fused : int list -&gt; int = &lt;fun&gt;
</code></pre>
<h3 id="486-عن-الحاجة-إلى-دوال-نقية">4.8.6. عن الحاجة إلى دوال نقية <span class="content-anchor" id="on-the-need-for-pure-functions"></span></h3>
<p>تصف المعادلات أعلاه تساوي النتائج، لا تساوي كل سلوك قابل للملاحظة. فدوال map المنفصلة تنفّذ كل استدعاءات <code>g</code> قبل أي استدعاء لـ <code>f</code>، بينما يمكن لدالة map مدمجة أن تشابك بينها. ويمكن لقانون filter أيضًا أن يغيّر ترتيب استدعاءات المحمول. وإذا كانت دالة تطبع أو تطلق استثناءً أو تغيّر حالة قابلة للتغيير، فإن تلك الفروق تهم.</p>
<p>لذا لا تطبّق OCaml عمومًا عمليات الدمج هذه تلقائيًا، وإن كان بإمكان مصرّف أن يفعل ذلك إن استطاع إثبات أن الدوال نقية. ومصرّف Haskell، أي GHC، ينفّذ بعض عمليات الدمج هذه تلقائيًا.</p>
<h2 id="49-الملخص">4.9. الملخّص <span class="content-anchor" id="summary"></span></h2>
<p>هذا الفصل من أهم فصول الكتاب. لم يغطِّ أي ميزة لغوية جديدة. بل تعلمنا كيفية استخدام بعض الميزات القائمة بطرق قد تكون جديدة أو مفاجئة أو صعبة. والبرمجة من الرتبة العليا ومبدأ التجريد فكرتان ستساعدانك على أن تصبح مبرمجًا أفضل في أي لغة، لا في OCaml فقط. وبالطبع، تتفاوت اللغات في مدى دعمها لهاتين الفكرتين، فبعضها يوفر مساعدة أقل بكثير في كتابة شيفرة من الرتبة العليا — وهذا أحد أسباب استخدامنا OCaml في هذا المقرر.</p>
<p>أصبح map وfilter وfold وغيرها من الدواليات معترفًا بها على نطاق واسع طرقًا ممتازة لهيكلة الحساب. ومن أسباب ذلك أنها تستخلص <em>الاجتياز</em> (iteration) على بنية بيانات من <em>الحساب</em> الذي يُجرى عند كل عنصر. وتدعم لغات مثل Python وRuby وJava 8 الآن هذا النوع من الاجتياز.</p>
<p>وتتيح لنا القوانين الجبرية لهذه الدواليات الاستدلال على خط أنابيب ودمج بعض خطواته، بشرط أن تكون الدوال المتضمنة نقية.</p>
<h3 id="491-المصطلحات-والمفاهيم">4.9.1. المصطلحات والمفاهيم <span class="content-anchor" id="terms-and-concepts"></span></h3>
<ul>
<li>مبدأ التجريد (Abstraction Principle)</li>
<li>قانون جبري (algebraic law)</li>
<li>المجمِّع (accumulator)</li>
<li>apply</li>
<li>تجميعي (associative)</li>
<li>compose</li>
<li>استخلاص (factor)</li>
<li>filter</li>
<li>دالة من الرتبة الأولى (first-order function)</li>
<li>fold</li>
<li>دالية (functional)</li>
<li>الدمج (fusion)</li>
<li>عملية طي معمّمة (generalized fold operation)</li>
<li>guard</li>
<li>دالة من الرتبة العليا (higher-order function)</li>
<li>map</li>
<li>خط أنابيب (pipeline)</li>
<li>خطوط الأنابيب (pipelining)</li>
</ul>
<h3 id="492-قراءات-إضافية">4.9.2. قراءات إضافية <span class="content-anchor" id="further-reading"></span></h3>
<ul>
<li><em>Introduction to Objective Caml</em>، الفصول 3.1.3 و5.3</li>
<li><em>OCaml from the Very Beginning</em>، الفصل 6</li>
<li><em>More OCaml: Algorithms, Methods, and Diversions</em>، الفصل 1، بقلم John Whitington. وهذا الكتاب تكملة لـ <em>OCaml from the Very Beginning</em>.</li>
<li><em>Real World OCaml</em>، الفصل 3 (احترس من أن مكتبة <code>Core</code> في هذا الكتاب لها وحدة <code>List</code> مختلفة عن وحدة <code>List</code> في المكتبة القياسية، بأنواع مختلفة لـ <code>map</code> و<code>fold</code> عن التي رأيناها هنا)</li>
<li>«Higher Order Functions»، الفصل 6 من <em>Functional Programming: Practice and Theory</em>. Bruce J. MacLennan، Addison-Wesley، 1990. مناقشتنا للدوال من الرتبة العليا ومبدأ التجريد مدينة لهذا الفصل.</li>
<li>«Can Programming be Liberated from the von Neumann Style? A Functional Style and Its Algebra of Programs.» محاضرة جائزة تورينغ لعام 1977 لجون باكوس بصيغتها الموسّعة <a href="https://dl.acm.org/doi/pdf/10.1145/359576.359579">مقالًا منشورًا</a>.</li>
<li>«<a href="http://plato.stanford.edu/entries/logic-higher-order/">Second-order and Higher-order Logic</a>» في <em>The Stanford Encyclopedia of Philosophy</em>.</li>
</ul>
<div class="exercises"><h2 id="410-التمارين">4.10. التمارين <span class="content-anchor" id="exercises"></span></h2>
<p>تتوفر <a href="https://github.com/cs3110/textbook-solutions">حلول</a> لمعظم التمارين. ويسعدنا إضافة الحلول أو تصحيحها. يرجى تقديم المساهمات عبر GitHub.</p>
<p><strong>تمرين: twice، بلا وسائط [★]</strong></p>
<p>انظر إلى التعريفات التالية:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> double x = <span class="hljs-number">2</span> * x
<span class="hljs-keyword">let</span> square x = x * x
<span class="hljs-keyword">let</span> twice f x = f (f x)
<span class="hljs-keyword">let</span> quad = twice double
<span class="hljs-keyword">let</span> fourth = twice square
</code></pre>
<p>استخدم الواجهة التفاعلية لتحديد ما نوعا <code>quad</code> و<code>fourth</code>. واشرح كيف يمكن أن تكون <code>quad</code> غير مكتوبة صياغيًا كدالة تأخذ وسيطًا، ومع ذلك يُظهر نوعها أنها في الواقع دالة.</p>
<p><strong>تمرين: مؤثر غامض 1 [★★]</strong></p>
<p>ماذا يفعل المؤثر التالي؟</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> ( $ ) f x = f x
</code></pre>
<p><em>تلميح: افحص <code>square $ 2 + 2</code> مقابل <code>square 2 + 2</code>.</em></p>
<p><strong>تمرين: مؤثر غامض 2 [★★]</strong></p>
<p>ماذا يفعل المؤثر التالي؟</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> ( @@ ) f g x = x |&gt; g |&gt; f
</code></pre>
<p><em>تلميح: افحص <code>String.length &amp;#64;&amp;#64; string_of_int</code> مطبَّقًا على <code>1</code> و<code>10</code> و<code>100</code> وغيرها.</em></p>
<p><strong>تمرين: repeat [★★]</strong></p>
<p>عمّم <code>twice</code> إلى دالة <code>repeat</code>، بحيث تطبّق <code>repeat f n x</code> الدالة <code>f</code> على <code>x</code> عددًا مجموعه <code>n</code> مرة. أي أن:</p>
<ul>
<li><code>repeat f 0 x</code> يعطي <code>x</code></li>
<li><code>repeat f 1 x</code> يعطي <code>f x</code></li>
<li><code>repeat f 2 x</code> يعطي <code>f (f x)</code> (وهو نفسه <code>twice f x</code>)</li>
<li><code>repeat f 3 x</code> يعطي <code>f (f (f x))</code></li>
<li>…</li>
</ul>
<p><strong>تمرين: الجداء [★]</strong></p>
<p>استخدم <code>fold_left</code> لكتابة دالة <code>product_left</code> تحسب جداء قائمة من أعداد الفاصلة العائمة. وجداء القائمة الفارغة هو <code>1.0</code>. <em>تلميح: تذكّر كيف نفّذنا <code>sum</code> في سطر واحد فقط من الشيفرة في المحاضرة.</em></p>
<p>واستخدم <code>fold_right</code> لكتابة دالة <code>product_right</code> تحسب جداء قائمة من أعداد الفاصلة العائمة. <em>والتلميح نفسه ينطبق.</em></p>
<p><strong>تمرين: الجداء الموجز [★★]</strong></p>
<p>ما مدى إيجاز حلّيك لتمرين <strong>الجداء</strong>؟ <em>تلميحات: تحتاج إلى سطر واحد فقط من الشيفرة لكل منهما، ولا تحتاج إلى الكلمة المفتاحية <code>fun</code>. وفي حالة <code>fold_left</code>، لا يحتاج تعريف دالتك حتى إلى أخذ وسيط قائمة صراحةً. وإذا استخدمت <code>ListLabels</code>، فالأمر نفسه ينطبق على <code>fold_right</code>.</em></p>
<p><strong>تمرين: sum_cube_odd [★★]</strong></p>
<p>اكتب دالة <code>sum_cube_odd n</code> تحسب مجموع مكعبات جميع الأعداد الفردية بين <code>0</code> و<code>n</code> شاملًا الطرفين. ولا تكتب أي دوال تعاودية جديدة. بل استخدم الدواليات map وfold وfilter، ومؤثر <code>( -- )</code> (المعرّف في مناقشة خطوط الأنابيب).</p>
<p><strong>تمرين: sum_cube_odd بخط الأنابيب [★★]</strong></p>
<p>أعد كتابة الدالة <code>sum_cube_odd</code> لتستخدم مؤثر خط الأنابيب <code>|&gt;</code>.</p>
<p><strong>تمرين: exists [★★]</strong></p>
<p>فكّر في كتابة دالة <code>exists: ('a -&gt; bool) -&gt; 'a list -&gt; bool</code>، بحيث تعيد <code>exists p [a1; ...; an]</code> ما إذا كان عنصر واحد على الأقل من القائمة يحقق المحمول <code>p</code>. أي أنها تقيّم مثل <code>(p a1) || (p a2) || ... || (p an)</code>. وعند تطبيقها على قائمة فارغة، تقيّم إلى <code>false</code>.</p>
<p>اكتب ثلاثة حلول لهذه المسألة، كما فعلنا أعلاه:</p>
<ul>
<li><code>exists_rec</code>، ويجب أن تكون دالة تعاودية لا تستخدم وحدة <code>List</code>،</li>
<li><code>exists_fold</code>، وتستخدم إما <code>List.fold_left</code> وإما <code>List.fold_right</code>، لكن لا تستخدم أي دالة أخرى من وحدة <code>List</code> ولا الكلمة المفتاحية <code>rec</code>، و</li>
<li><code>exists_lib</code>، وتستخدم أي جمع من دوال وحدة <code>List</code> غير <code>fold_left</code> أو <code>fold_right</code>، ولا تستخدم الكلمة المفتاحية <code>rec</code>.</li>
</ul>
<p><strong>تمرين: رصيد الحساب [★★★]</strong></p>
<p>اكتب دالة، بالنظر إلى قائمة أعداد تمثل مبالغ مدينة، تخصمها من رصيد حساب، ثم تعيد في النهاية المبلغ المتبقي في الرصيد. واكتب ثلاث نسخ: <code>fold_left</code> و<code>fold_right</code> وتنفيذًا تعاوديًا مباشرًا.</p>
<p><strong>تمرين: مكتبة غير مكارَية [★★]</strong></p>
<p>إليك نسخة غير مكارَية من <code>List.nth</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> uncurried_nth (lst, n) = <span class="hljs-type">List</span>.nth lst n
</code></pre>
<p>وبطريقة مشابهة، اكتب نسخًا غير مكارَية من دوال المكتبة التالية:</p>
<ul>
<li><code>List.append</code></li>
<li><code>Char.compare</code></li>
<li><code>Stdlib.max</code></li>
</ul>
<p><strong>تمرين: تركيب map [★★★]</strong></p>
<p>بيّن كيفية استبدال أي تعبير على الصيغة <code>List.map f (List.map g lst)</code> بتعبير مكافئ يستدعي <code>List.map</code> مرة واحدة فقط.</p>
<p><strong>تمرين: المزيد من دوال القوائم [★★★]</strong></p>
<p>اكتب دوالًا تنفّذ الحسابات التالية. وينبغي أن تستخدم كل دالة تكتبها واحدة من <code>List.fold</code> أو <code>List.map</code> أو <code>List.filter</code>. ولاختيار أيها تستخدم، فكّر فيما يفعله الحساب: دمج العناصر أم تحويلها أم ترشيحها.</p>
<ul>
<li>جد عناصر قائمة من السلاسل النصية التي طولها أكبر تمامًا من 3.</li>
<li>أضف <code>1.0</code> إلى كل عنصر في قائمة من أعداد الفاصلة العائمة.</li>
<li>بالنظر إلى قائمة سلاسل نصية <code>strs</code> وسلسلة أخرى <code>sep</code>، أنتج السلسلة التي تحتوي على كل عنصر من <code>strs</code> مفصولًا بـ <code>sep</code>. على سبيل المثال، بالنظر إلى المدخلين <code>[&quot;hi&quot;;&quot;bye&quot;]</code> و<code>&quot;,&quot;</code>، أنتج <code>&quot;hi,bye&quot;</code>، مع الحرص على عدم إنتاج فاصلة إضافية في بداية سلسلة النتيجة أو نهايتها.</li>
</ul>
<p><strong>تمرين: مفاتيح قائمة الترابط [★★★]</strong></p>
<p>تذكّر أن قائمة الترابط تنفيذ لقاموس بدلالة قائمة من الأزواج، نعامل فيها المكوّن الأول من كل زوج مفتاحًا والمكوّن الثاني قيمة.</p>
<p>اكتب دالة <code>keys: ('a * 'b) list -&gt; 'a list</code> تعيد قائمة بالمفاتيح الفريدة في قائمة ترابط. وبما أنه يجب أن تكون فريدة، فلا ينبغي أن تظهر أي قيمة أكثر من مرة في قائمة المخرجات. ولا يهم ترتيب القيم المخرجة. فما مدى الإيجاز والكفاءة اللذين يمكنك بلوغهما في حلك؟ وهل تستطيع فعل ذلك في سطر واحد وبزمن ومساحة من رتبة خطية-لوغاريتمية؟ <em>تلميح: <code>List.sort_uniq</code>.</em></p>
<p><strong>تمرين: مصفوفة صالحة [★★★]</strong></p>
<p>يمكن تمثيل <em>المصفوفة</em> الرياضية بالقوائم. وفي التمثيل <em>بالترتيب الصفي</em> (row-major)، تُتمثّل هذه المصفوفة</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="right" columnspacing=""><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mo fence="true">[</mo><mtable rowspacing="0.16em" columnalign="center center center" columnspacing="1em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>1</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>1</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>1</mn></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>9</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>8</mn></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="false"><mn>7</mn></mstyle></mtd></mtr></mtable><mo fence="true">]</mo></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\\begin{split} \\begin{bmatrix} 1 &amp; 1 &amp; 1 \\\\ 9 &amp; 8 &amp; 7 \\end{bmatrix} \\end{split}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.45em;"><span class="pstrut" style="height:3.45em;"></span><span class="mord"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">[</span></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">9</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">8</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">7</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">]</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span></span></span></span></span></span>
<p>بالقائمة <code>[[1; 1; 1]; [9; 8; 7]]</code>. ولنتمثّل <em>متجه الصف</em> (row vector) بـ <code>int list</code>. على سبيل المثال، <code>[9; 8; 7]</code> متجه صف.</p>
<p>والمصفوفة <em>الصالحة</em> هي <code>int list list</code> لها صف واحد على الأقل وعمود واحد على الأقل، ويكون في كل عمود منها العدد نفسه من الصفوف. وهناك قيم كثيرة من النوع <code>int list list</code> غير صالحة، على سبيل المثال،</p>
<ul>
<li><code>[]</code></li>
<li><code>[[1; 2]; [3]]</code></li>
</ul>
<p>نفّذ دالة <code>is_valid_matrix: int list list -&gt; bool</code> تعيد ما إذا كانت المصفوفة المدخلة صالحة. واختبر الدالة اختبار وحدة.</p>
<p><strong>تمرين: جمع متجهات الصفوف [★★★]</strong></p>
<p>نفّذ دالة <code>add_row_vectors: int list -&gt; int list -&gt; int list</code> للجمع العنصري لمتجهي صف. على سبيل المثال، جمع <code>[1; 1; 1]</code> و<code>[9; 8; 7]</code> هو <code>[10; 9; 8]</code>. وإذا لم يكن للمتجهين العدد نفسه من العناصر، فسلوك دالتك <em>غير محدد</em> — أي يمكنها أن تفعل ما تشاء. <em>تلميح: هناك حل أنيق من سطر واحد باستخدام <code>List.map2</code>.</em> واختبر الدالة اختبار وحدة.</p>
<p><strong>تمرين: جمع المصفوفات [★★★]</strong></p>
<p>نفّذ دالة <code>add_matrices: int list list -&gt; int list list -&gt; int list list</code> من أجل <a href="http://mathworld.wolfram.com/MatrixAddition.html">جمع المصفوفات</a>. وإذا لم تكن المصفوفتان المدخلتان بالحجم نفسه، فالسلوك غير محدد. <em>تلميح: هناك حل أنيق من سطر واحد باستخدام <code>List.map2</code> و<code>add_row_vectors</code>.</em> واختبر الدالة اختبار وحدة.</p>
<p><strong>تمرين: ضرب المصفوفات [★★★★]</strong></p>
<p>نفّذ دالة <code>multiply_matrices: int list list -&gt; int list list -&gt; int list list</code> من أجل <a href="http://mathworld.wolfram.com/MatrixMultiplication.html">ضرب المصفوفات</a>. وإذا لم تكن المصفوفتان المدخلتان بالحجمين الذين يمكن ضربهما معًا، فالسلوك غير محدد. واختبر الدالة اختبار وحدة. <em>تلميح: عرّف دوالًا لتبديل المصفوفة والجداء النقطي لمتجهي صف.</em></p>
<p><strong>تمرين: دمج خط الأنابيب [★★★]</strong></p>
<p>استخدم <code>&lt;&lt;</code> و<code>&amp;&amp;&amp;</code> و<code>guard</code> و<code>foldr</code> كما هي معرّفة في قسم القوانين الجبرية.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> square x = x * x
<span class="hljs-keyword">let</span> even x = x <span class="hljs-keyword">mod</span> <span class="hljs-number">2</span> = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> large x = x &gt; <span class="hljs-number">10</span>
<span class="hljs-keyword">let</span> score =
  foldr ( + ) <span class="hljs-number">0</span>
  &lt;&lt; filter large
  &lt;&lt; map square
  &lt;&lt; filter even
</code></pre>
<p>عرّف <code>score_fused</code> على الصيغة <code>foldr (guard p f) 0</code>، حيث تستخدم <code>p</code> كلا من <code>&amp;&amp;&amp;</code> و<code>&lt;&lt;</code>، وتستخدم <code>f</code> الرمز <code>&lt;&lt;</code>. واشرح أي قوانين الدمج تبرر تعريفك.</p>
</div>`,c={book:s,chapter:"hop",chapterTitle:a,slug:n,title:e,headings:l,html:t};export{s as book,p as chapter,a as chapterTitle,c as default,l as headings,t as html,n as slug,e as title};
