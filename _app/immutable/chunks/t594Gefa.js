const s="learn-ocaml",e="queues",a="الطوابير",n="index",p="الطوابير",c=[{depth:2,id:"6-الطوابير",text:"6. الطوابير"},{depth:3,id:"61-الطوابير-الأمرية-imperative-queues",text:"6.1 الطوابير الأمرية (imperative queues)"},{depth:3,id:"62-الطوابير-الدائمة-persistent-queues",text:"6.2 الطوابير الدائمة (persistent queues)"},{depth:3,id:"63-طوابير-الأولوية-الأمرية-imperative-priority-queues",text:"6.3 طوابير الأولوية الأمرية (imperative priority queues)"},{depth:3,id:"64-طوابير-الأولوية-الدائمة-persistent-priority-queues",text:"6.4 طوابير الأولوية الدائمة (persistent priority queues)"},{depth:3,id:"65-تمارين",text:"6.5 تمارين"}],l=`<h2 id="6-الطوابير">6. الطوابير</h2>
<p>يعرض هذا الفصل عدة بنى معطيات تُعرف باسم <em>الطوابير (queues)</em>. والطابور (queue) بنية معطيات تُستخرج عناصرها بالترتيب الذي أُدرجت به، وهو ما يقابل بدقة المفهوم المعتاد للطابور. ويمكننا أيضًا إقران العناصر بأولويات، وفي هذه الحالة لا تُستخرج العناصر بعد ذلك بالترتيب الذي أُدرجت به. ويُسمى هذا <em>طابور الأولوية (priority queue)</em>.</p>
<h3 id="61-الطوابير-الأمرية-imperative-queues">6.1 الطوابير الأمرية (imperative queues)</h3>
<p>يعرض هذا القسم بنية معطيات للطوابير الأمرية مبنية على القوائم المترابطة. وتُعطى توقيعة هذه البنية في البرنامج <a href="#x20-201002r57">57</a> (انظر الصفحة التالية).</p>
<blockquote></blockquote>
<p>الفكرة كما يلي: إذا احتوى طابور <code>q</code> على العناصر 1، 2، 3، مُدرجة بهذا الترتيب، فإنه يُمثَّل بقائمة مترابطة دائرية يشير فيها كل عنصر إلى العنصر التالي له في الطابور، ويشير العنصر الأخير إلى الأول. ولكي نتمكن من إدراج العناصر وإزالتها في زمن ثابت، يكفي أن نحتفظ بمؤشر إلى العنصر الأخير في الطابور، وهنا العنصر 3. وبذلك تكون لدينا الحالة التالية:</p>
<p>وهكذا، لإدراج عنصر جديد، هو 4، يكفي إدراجه بعد 3، أي بين 3 و1، ثم نقل المؤشر إلى 4.</p>
<p>نصل إلى العنصر الأول، وهنا 1، بتتبع المؤشر الموجود في العنصر الأخير. ولإزالة العنصر الأول، يكفي أن نجعل العنصر الأخير يشير إلى العنصر الثاني، وهنا 2، الذي نحصل عليه بتتبع مؤشرين.</p>
<p>نبدأ بتعريف نوع <code>’acell</code> لتمثيل خلايا القائمة المترابطة، بالطريقة المعتادة.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> ’a cell = { elt : ’a; <span class="hljs-keyword">mutable</span> next : ’a cell }
</code></pre>
<p>ثم نمثّل الطابور بمرجع إلى الخلية الأخيرة. وتنشأ مشكلة عند تمثيل الطابور الفارغ، الذي لا نريد أن يحتوي على أي خلايا قائمة على الإطلاق. لذلك نختار تمثيل الطابور بمرجع إلى قيمة من النوع <code>’acelloption</code>، حيث يمثّل <code>None</code> الطابور الفارغ.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> ’a t = ((’a cell) option) <span class="hljs-built_in">ref</span>
</code></pre>
<p>تنفيذ الدالتين <code>create</code> و<code>is_empty</code> واضح.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> create <span class="hljs-literal">()</span> =
    <span class="hljs-built_in">ref</span> <span class="hljs-type">None</span>
  <span class="hljs-keyword">let</span> is_empty q =
    !q = <span class="hljs-type">None</span>
</code></pre>
<h4>إدراج عنصر</h4>
<p>يتبع إدراج عنصر <code>x</code> في طابور <code>q</code> المخطط المذكور أعلاه. فإذا كان <code>q</code> فارغًا، ننشئ قائمة دائرية من عنصر واحد ونعدّل <code>q</code> بحيث يشير إلى هذا العنصر. ونستعمل هنا الإمكانية التي يتيحها OCaml لبناء قيمة دورية بواسطة <code>letrec</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> push x q = <span class="hljs-keyword">match</span> !q <span class="hljs-keyword">with</span>
    | <span class="hljs-type">None</span> -&gt;
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> c = { elt = x; next = c } <span class="hljs-keyword">in</span>
        q := <span class="hljs-type">Some</span> c
</code></pre>
<p>وإذا لم يكن <code>q</code> فارغًا، ننشئ خلية جديدة <code>c</code> تحتوي على <code>x</code>، ندرجها بين العنصرين الأخير والأول، ثم نعدّل <code>q</code> بحيث يشير إلى هذه الخلية الجديدة.</p>
<pre><code class="language-ocaml">    | <span class="hljs-type">Some</span> last -&gt;
        <span class="hljs-keyword">let</span> c = { elt = x; next = last.next } <span class="hljs-keyword">in</span>
        last.next &lt;- c;
        q := <span class="hljs-type">Some</span> c
</code></pre>
<h4>استخراج عنصر</h4>
<p>لاستخراج العنصر الأول من طابور <code>q</code>، نبدأ باختبار ما إذا كان <code>q</code> فارغًا. وفي هذه الحالة نرفع استثناءً.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> pop q = <span class="hljs-keyword">match</span> !q <span class="hljs-keyword">with</span>
    | <span class="hljs-type">None</span> -&gt;
        invalid_arg <span class="hljs-string">&quot;pop&quot;</span>
</code></pre>
<p>عندما لا يكون <code>q</code> فارغًا، يكون من المناسب معالجة الحالة التي يحتوي فيها <code>q</code> على عنصر واحد فقط بشكل منفصل. وهنا يشير العنصر الأخير إلى نفسه. لذا يكفي إفراغ الطابور بإعطائه القيمة <code>None</code> وإرجاع العنصر الوحيد الذي كان يحتويه.</p>
<pre><code class="language-ocaml">    | <span class="hljs-type">Some</span> last <span class="hljs-keyword">when</span> last.next == last -&gt;
        q := <span class="hljs-type">None</span>;
        last.elt
</code></pre>
<p>في الحالة العامة، عندما يحتوي <code>q</code> على عنصرين على الأقل، نبدأ بتحديد العنصر الأول في الطابور، <code>first</code>. ثم نزيله من القائمة المترابطة بجعل العنصر الأخير يشير إلى العنصر الثاني. والقيمة الواجب إرجاعها موجودة في الخلية <code>first</code>.</p>
<pre><code class="language-ocaml">    | <span class="hljs-type">Some</span> last -&gt;
        <span class="hljs-keyword">let</span> first = last.next <span class="hljs-keyword">in</span>
        last.next &lt;- first.next;
        first.elt
</code></pre>
<p>الكود الكامل معطى في البرنامج <a href="#x20-203014r58">58</a> (انظر الصفحة التالية).</p>
<blockquote></blockquote>
<h4>التعقيد</h4>
<p>من الواضح أن العمليات <code>create</code> و<code>is_empty</code> و<code>push</code> و<code>pop</code> تُنفَّذ كلها في زمن ثابت. والطابور الذي يحتوي على N عنصرًا يشغل ثلاث كلمات لكل عنصر في الذاكرة (لكونه سجلًا بحقلين، هما <code>elt</code> و<code>next</code>)، إضافة إلى كلمتين للمرجع.</p>
<blockquote></blockquote>
<h3 id="62-الطوابير-الدائمة-persistent-queues">6.2 الطوابير الدائمة (persistent queues)</h3>
<p>في هذا القسم، نعرض بنية معطيات للطوابير <em>الدائمة (persistent)</em>. وتُعطى توقيعة هذه البنية في البرنامج <a href="#x20-205010r59">59</a>. ونرى، على وجه الخصوص، أن العمليتين <code>push</code> و<code>pop</code> تُعيدان نسخة معدَّلة من بنية المعطيات.</p>
<p>قد تتمثل فكرة ساذجة في تمثيل طابور بقائمة. لكن هذا الحل غير فعّال جدًا للأسف، لأنه سيتعين إمّا تنفيذ عملية الإدراج أو عملية الاستخراج في نهاية القائمة. ولتنفيذ هاتين العمليتين بكفاءة أكبر، تتمثل فكرة بسيطة في استعمال قائمتين لا قائمة واحدة. فالقائمة الأولى تحتوي على العناصر الموجودة في مقدمة الطابور، بالترتيب. والقائمة الثانية تحتوي على العناصر الموجودة في مؤخرة الطابور، بترتيب معكوس. وبهذه الطريقة، يتم الإدراج والاستخراج معًا عند رأس القائمة. وعلى سبيل المثال، قد يُمثَّل الطابور الذي يحتوي على العناصر 1، 2، 3، 4، 5، المُدرجة بهذا الترتيب، بالقائمتين <code>[1;2]</code> و<code>[5;4;3]</code>. غير أن الطابور قد يُمثَّل بالقدر نفسه بالقائمتين <code>[1]</code> و<code>[5;4;3;2]</code>، أو حتى بـ <code>[1;2;3;4;5]</code> و<code>[]</code>، وكلها تمثيلات مكافئة للطابور نفسه.</p>
<p>لذلك نعرّف نوع الطوابير الدائمة ببساطة كمرادف لزوج من القوائم.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> ’a t = ’a <span class="hljs-built_in">list</span> * ’a <span class="hljs-built_in">list</span>
</code></pre>
<p>تمثّل القائمة الأولى مقدمة الطابور. وتمثّل الثانية مؤخرة الطابور. وتعريفا الطابور الفارغ <code>empty</code> والدالة <code>is_empty</code> واضحان.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> empty = <span class="hljs-literal">[]</span>, <span class="hljs-literal">[]</span>

  <span class="hljs-keyword">let</span> is_empty = <span class="hljs-keyword">function</span>
    | <span class="hljs-literal">[]</span>, <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">true</span>
    | _ -&gt; <span class="hljs-literal">false</span>
</code></pre>
<blockquote></blockquote>
<p>لإدراج عنصر <code>x</code>، يكفي إضافته إلى رأس القائمة الثانية.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> push x (o, i) =
    (o, x :: i)
</code></pre>
<p>الاستخراج عملية أكثر دقة. وهناك ثلاث حالات ممكنة. أولًا، عندما يكون الطابور فارغًا، نرفع استثناءً.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> pop = <span class="hljs-keyword">function</span>
    | <span class="hljs-literal">[]</span>, <span class="hljs-literal">[]</span> -&gt;
        invalid_arg <span class="hljs-string">&quot;pop&quot;</span>
</code></pre>
<p>ثانيًا، عندما تحتوي القائمة الأولى، التي تمثّل مقدمة الطابور، على عنصر واحد على الأقل، يكفي استخراج هذا العنصر.</p>
<pre><code class="language-ocaml">    | x :: o, i -&gt;
        x, (o, i)
</code></pre>
<p>ثالثًا، عندما تكون جميع العناصر في مؤخرة الطابور، يكفي عكس القائمة <code>i</code> والمضي كما في الحالة السابقة، حيث كان العنصر الواجب استخراجه عند رأس القائمة. ويصبح ذيل القائمة الناتجة بذلك المقدمة الجديدة للطابور، ولم تعد مؤخرة الطابور الجديد تحتوي على أي عناصر.</p>
<pre><code class="language-ocaml">    | <span class="hljs-literal">[]</span>, i -&gt;
        <span class="hljs-keyword">match</span> <span class="hljs-type">List</span>.rev i <span class="hljs-keyword">with</span>
        | x :: o -&gt; x, (o, <span class="hljs-literal">[]</span>)
</code></pre>
<p>بما أن القائمة <code>i</code> ليست فارغة، فإن القائمة <code>List.revi</code> ليست فارغة أيضًا. وبدلًا من كتابة مطابقة نمط غير شاملة تُطلق تحذيرًا من المترجم، نذكر صراحةً أن حالة القائمة الفارغة لا يمكن أن تحدث.</p>
<pre><code class="language-ocaml">        | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-keyword">assert</span> <span class="hljs-literal">false</span>
</code></pre>
<p>الكود الكامل معطى في البرنامج <a href="#x20-205036r60">60</a>.</p>
<blockquote></blockquote>
<h4>التعقيد</h4>
<p>من الواضح أن العمليتين <code>is_empty</code> و<code>push</code> تُنفَّذان في زمن ثابت. غير أن العملية <code>pop</code> قد تكون كلفتها O(N) لطابور يحتوي على N عنصرًا. وهذا هو الحال عندما تكون جميع العناصر في مؤخرة الطابور بحيث يجب عكس القائمة. ومع ذلك، إذا نظرنا إلى متتالية من M عملية متعاقبة من <code>push</code> و<code>pop</code>، انطلاقًا من طابور فارغ، فإن الكلفة الإجمالية لا يمكن أن تتجاوز O(M). وفعلًا، قد يشارك كل عنصر في عملية عكس واحدة للقائمة على الأكثر. ومن ثمّ فإن للعملية <code>pop</code> كلفة مطفأة O(1). أما تعقيد المساحة فهو نفسه كما في حالة الطوابير الأمرية، بثلاث كلمات لكل عنصر من الطابور.</p>
<h3 id="63-طوابير-الأولوية-الأمرية-imperative-priority-queues">6.3 طوابير الأولوية الأمرية (imperative priority queues)</h3>
<p>في هذا القسم والقسم التالي، سنتناول طوابير تُقرن فيها العناصر بأولويات. وفي مثل هذه الطوابير، المسماة <em>طوابير الأولوية (priority queues)</em>، تُزال العناصر بالترتيب الذي تحدده أولوياتها لا بالترتيب الذي أُدخلت به. ونعرض هنا بنية معطيات <em>أمرية (imperative)</em> لطوابير الأولوية، تُعطى توقيعتها في البرنامج <a href="#x20-207004r61">61</a> (انظر الصفحة التالية).</p>
<p>في هذه الواجهة، يتوافق مفهوم الصغر مع مفهوم الأولوية العليا. وخلافًا للطوابير العادية، نميّز هنا بين الوصول إلى العنصر الأول وإزالته باستعمال عمليتين منفصلتين. وذلك لأجل الكفاءة، كما سيُوضَّح لاحقًا. وبناءً على ذلك، تُعيد الدالة <code>get_min</code> العنصر ذا الأولوية الأعلى في الطابور، وتزيله الدالة <code>remove_min</code>.</p>
<p>لتنفيذ طابور أولوية فعّال، من الضروري استعمال بنية معطيات أكثر تعقيدًا من حالة الطوابير العادية. ويتمثل أحد الحلول في تنظيم العناصر في <em>كومة (heap)</em>. والكومة شجرة ثنائية يحمل فيها العنصر المخزَّن عند كل عقدة أولوية أعلى من أولوية العنصرين الواقعين تحتها مباشرة. لذا يوجد العنصر ذو الأولوية الأعلى عند الجذر. وهكذا، قد يكون للكومة التي تحتوي على العناصر {3,7,9,12,21}، مرتبة حسب المقدار، الشكل التالي:</p>
<p>نلاحظ أن هناك أكوامًا أخرى تحتوي على العناصر نفسها. غير أنه، لأجل الكفاءة، يُفضَّل اختيار كومة ذات ارتفاع أدنى. والأكوام الممثَّلة بأشجار ثنائية كاملة (تُملأ فيها جميع المستويات عدا الأخير ربما) لها ارتفاع أدنى. ويتضح أنه يمكن تمثيل شجرة ثنائية كاملة بسهولة باستعمال مصفوفة. وتتمثل الفكرة في ترقيم عقد الشجرة من أعلى إلى أسفل ومن اليسار إلى اليمين، بدءًا من 0. وتُنتج نتيجة هذا الترقيم للكومة أعلاه التسميات التالية:</p>
<p>ويتيح هذا الترقيم تمثيل الكومة في مصفوفة من خمسة عناصر كما يلي:</p>
<p>بوجه عام، يشغل جذر الشجرة الخلية ذات الفهرس 0، ويُخزَّن جذرا الشجرتين الفرعيتين للعقدة المخزَّنة في الخلية i في الخليتين 2i + 1 و2i + 2 على التوالي. وبالعكس، يُخزَّن أب العقدة i في ⌊(i − 1)∕2⌋.</p>
<blockquote></blockquote>
<p>تبقى مشكلة واحدة: لا نعرف حجم طابور الأولوية مسبقًا، ومن ثمّ لا يمكننا تحديد الحجم الأقصى للمصفوفة بشكل مسبق. ويتمثل أحد الحلول الأنيقة في استعمال المصفوفات القابلة لتغيير الحجم. وقد عُرضت مثل هذه المصفوفات في القسم <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#resizeable-arrays"><em>4.1</em></a><em>المصفوفات القابلة لتغيير الحجم (resizeable arrays)</em>. لذا يكفي عندئذ كتابة دالة تصنيف (functor) مُعامَلة ببنية للمصفوفات القابلة لتغيير الحجم. وتُعطى توقيعة لمثل هذه المصفوفات، هي <code>ResizeableArray</code>، في البرنامج <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#x15-133002r17">17</a>، في بداية الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1">4</a>. وفيما يخص العناصر، نحتاج إلى نوع مزوَّد بترتيب كلي وقيمة افتراضية. وتُعطى التوقيعة المقابلة، وهي <code>OrderedWithDummy</code>، في البرنامج <a href="#x20-207027r62">62</a>.</p>
<p>تأخذ دالة تصنيف طوابير الأولوية عندئذ الشكل التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">Make</span>(<span class="hljs-type">X</span>: <span class="hljs-type">OrderedWithDummy</span>)(<span class="hljs-type">A</span>: <span class="hljs-type">ResizeableArray</span>)
  : <span class="hljs-type">ImperativePriorityQueue</span> <span class="hljs-keyword">with</span> <span class="hljs-keyword">type</span> elt = <span class="hljs-type">X</span>.t =
<span class="hljs-keyword">struct</span>
</code></pre>
<p>الوحدة <code>X</code> هي وحدة العناصر حينئذ، والوحدة <code>A</code> هي وحدة المصفوفات القابلة لتغيير الحجم.</p>
<p>والنوعان <code>elt</code> و<code>t</code> مرادفان على التوالي لـ <code>X.t</code> و<code>eltA.t</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> elt = <span class="hljs-type">X</span>.t
  <span class="hljs-keyword">type</span> t = elt <span class="hljs-type">A</span>.t
</code></pre>
<p>في الواقع، ليست الكومة سوى مصفوفة قابلة لتغيير الحجم. وتبني الدالة <code>create</code> مصفوفة فارغة بواسطة <code>A.make</code>، وتختبر الدالة <code>is_empty</code> ما إذا كانت المصفوفة فارغة.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> create <span class="hljs-literal">()</span> = <span class="hljs-type">A</span>.make <span class="hljs-number">0</span> <span class="hljs-type">X</span>.dummy
  <span class="hljs-keyword">let</span> is_empty h = <span class="hljs-type">A</span>.length h = <span class="hljs-number">0</span>
</code></pre>
<blockquote></blockquote>
<p>تُعيد الدالة <code>get_min</code> جذر الكومة، إذا كان موجودًا، وترفع استثناءً في الحالة المعاكسة.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> get_min h =
    <span class="hljs-keyword">if</span> <span class="hljs-type">A</span>.length h = <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> invalid_arg <span class="hljs-string">&quot;get_min&quot;</span>;
    <span class="hljs-type">A</span>.get h <span class="hljs-number">0</span>
</code></pre>
<p>الكود معطى في البرنامج <a href="#x20-208020r63">63</a>.</p>
<h4>إدراج عنصر</h4>
<p>يتمثل إدراج عنصر <code>x</code> في كومة <code>h</code> في إضافة <code>x</code> إلى الشجرة التي تمثّل <code>h</code> مع الحفاظ على بنية الكومة. ويتمثل أحد الأساليب في إضافة <code>x</code> في أسفل اليمين ثم تحريكه صعودًا في الشجرة بالقدر اللازم. وفي تنفيذنا، يُختصر هذا إلى توسيع المصفوفة بخلية واحدة، وإدراج القيمة <code>x</code> فيها، ثم تحريك <code>x</code> صعودًا حتى يبلغ موضعه الصحيح. ولهذا نستعمل الخوارزمية التالية: إذا كان <code>x</code> أصغر من أبيه، نبادل القيمتين ونكرر.</p>
<p>على سبيل المثال، لنعاين مرة أخرى الكومة التالية:</p>
<p>ويُنفَّذ إدراج العنصر 1 في هذه الكومة في ثلاث خطوات:</p>
<p>نبدأ بكتابة دالة <code>move_up</code> تُدرج عنصرًا <code>x</code> في الكومة <code>h</code>، انطلاقًا من الموضع <code>i</code>. وتفترض هذه الدالة أن شجرة الجذر <code>i</code>، الناتجة عن وضع <code>x</code> عند <code>i</code>، هي كومة. وتعالج الدالة <code>move_up</code> أولًا الحالة التي يكون فيها <code>i</code> مساويًا 0، أي عندما نكون قد بلغنا الجذر. حينئذ يكفي إدراج <code>x</code> عند الموضع <code>i</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> move_up h x i =
    <span class="hljs-keyword">if</span> i = <span class="hljs-number">0</span> <span class="hljs-keyword">then</span>
      <span class="hljs-type">A</span>.set h i x
</code></pre>
<p>أما إذا كنا عند عقدة داخلية، فنحسب الفهرس <code>fi</code> لأب <code>i</code> والقيمة <code>y</code> المخزَّنة في هذه العقدة. وإذا كان <code>y</code> أكبر من <code>x</code>، يجب أن نحرّك <code>x</code> صعودًا مع تحريك <code>y</code> نزولًا إلى الموضع <code>i</code>. ثم نستدعي <code>move_up</code> استدعاءً تكراريًا انطلاقًا من <code>fi</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">else</span>
      <span class="hljs-keyword">let</span> fi = (i - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
      <span class="hljs-keyword">let</span> y = <span class="hljs-type">A</span>.get h fi <span class="hljs-keyword">in</span>
      <span class="hljs-keyword">if</span> <span class="hljs-type">X</span>.compare y x &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> <span class="hljs-keyword">begin</span>
        <span class="hljs-type">A</span>.set h i y;
        move_up h x fi
      <span class="hljs-keyword">end</span>
</code></pre>
<p>أما إذا كان <code>y</code> أصغر من <code>x</code> أو مساويًا له، فإن <code>x</code> عند موضعه النهائي، ويكفي تخزينه هناك.</p>
<pre><code class="language-ocaml">      <span class="hljs-keyword">else</span> <span class="hljs-type">A</span>.set h i x
</code></pre>
<p>تسير الدالة <code>add</code> في خطوتين. فهي تزيد حجم المصفوفة بمقدار وحدة واحدة، بإضافة خلية في نهاية المصفوفة. ثم تستدعي الدالة <code>move_up</code> انطلاقًا من هذه الخلية.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> add x h =
    <span class="hljs-keyword">let</span> n = <span class="hljs-type">A</span>.length h <span class="hljs-keyword">in</span>
    <span class="hljs-type">A</span>.resize h (n + <span class="hljs-number">1</span>);
    move_up h x n
</code></pre>
<p>الكود معطى في البرنامج <a href="#x20-208020r63">63</a> (انظر الصفحة التالية).</p>
<blockquote></blockquote>
<h4>إزالة أصغر عنصر</h4>
<p>تُعدّ إزالة أصغر عنصر من كومة عملية أكثر دقة. والسبب في ذلك أننا نزيل جذر الشجرة، ومن ثمّ يجب أن نجد عنصرًا لنستبدله به. وتتمثل الفكرة في اختيار العنصر الواقع في أسفل يمين الكومة، أي العنصر الذي يشغل الخلية الأخيرة من المصفوفة، ووضعه عند الجذر، ثم تحريكه نزولًا في الكومة حتى يبلغ موضعه. وهذا تقريبًا ما فعلناه عند إدراج عنصر، حيث حرّكنا العنصر الجديد صعودًا.</p>
<p>لنفترض، على سبيل المثال، أننا نريد إزالة أصغر عنصر من الكومة التالية:</p>
<p>نستبدل الجذر، وهو 1، بالعنصر الواقع في أسفل اليمين، وهو 8. ثم نجعل 8 ينزل حتى يبلغ موضعه. ولهذا نقارن 8 بجذري الشجرتين الفرعيتين a وb. فإذا كان a وb كلاهما أكبر من 8، يكتمل النزول. وإلا، نبادل 8 بالأصغر من العقدتين a وb، ونواصل النزول. وفي المثال، يُبادَل 8 على التوالي بـ 4 و5:</p>
<p>نبدأ بكتابة دالة تقارن عقدتين، معطاتين بفهرسيهما <code>l</code> و<code>r</code>، وتُعيد الأصغر منهما.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> min h l r =
    <span class="hljs-keyword">if</span> <span class="hljs-type">X</span>.compare (<span class="hljs-type">A</span>.get h r) (<span class="hljs-type">A</span>.get h l) &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> r <span class="hljs-keyword">else</span> l
</code></pre>
<p>بعد ذلك، نكتب دالة <code>smallest_node</code> تحدّد ما إذا كانت قيمة <code>x</code>، الواقعة عند العقدة <code>i</code>، بحاجة إلى النزول في الكومة أم لا. ولا تكون القيمة <code>x</code> هي قيمة العقدة <code>i</code> لأننا لا نعرف بعد ما إذا كان هذا سيكون موضعها النهائي. غير أن الدالة <code>smallest_node</code> تتصرّف كما لو كانت العقدة <code>i</code> تحمل القيمة <code>x</code>. وبناءً على ذلك، تأخذ الدالة <code>smallest_node</code> وسائط هي الكومة <code>h</code> والقيمة <code>x</code> والفهرس <code>i</code>. ونبدأ بحساب الابن الأيسر <code>l</code> للعقدة <code>i</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> smallest_node h x i =
    <span class="hljs-keyword">let</span> l = <span class="hljs-number">2</span> * i + <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
</code></pre>
<p>إذا لم تكن للعقدة <code>i</code> أي أبناء، نُعيد <code>i</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> n = <span class="hljs-type">A</span>.length h <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">if</span> l &gt;= n <span class="hljs-keyword">then</span>
      i
</code></pre>
<p>أما إذا كانت العقدة <code>l</code> جزءًا من الكومة، فنحدّد الفهرس <code>j</code> لأصغر ابن للعقدة <code>i</code>. ولهذا، من المناسب تحديد ما إذا كان الابن الأيمن <code>r=l+1</code> موجودًا. فإن كان موجودًا، نقارن العقدتين <code>l</code> و<code>r</code> بالدالة <code>min</code>. وإلا، يكون الفهرس <code>j</code> مساويًا لـ <code>l</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">else</span>
      <span class="hljs-keyword">let</span> r = l + <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
      <span class="hljs-keyword">let</span> j = <span class="hljs-keyword">if</span> r &lt; n <span class="hljs-keyword">then</span> min h l r <span class="hljs-keyword">else</span> l <span class="hljs-keyword">in</span>
</code></pre>
<p>وأخيرًا، نقارن قيمة العقدة <code>j</code> بقيمة <code>x</code>.</p>
<pre><code class="language-ocaml">      <span class="hljs-keyword">if</span> <span class="hljs-type">X</span>.compare (<span class="hljs-type">A</span>.get h j) x &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> j <span class="hljs-keyword">else</span> i
</code></pre>
<p>يُنجَز النزول في الكومة بدالة تكرارية <code>move_down</code> تأخذ وسائط هي الكومة <code>h</code> والقيمة <code>x</code> التي تنزل والفهرس <code>i</code> للعقدة المرشَّحة. ونبدأ باستدعاء الدالة <code>smallest_node</code> لحساب الفهرس <code>j</code> الذي ينبغي أن يستقبل القيمة <code>x</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> move_down h x i =
    <span class="hljs-keyword">let</span> j = smallest_node h x i <span class="hljs-keyword">in</span>
</code></pre>
<p>إذا كان <code>j=i</code>، اكتمل النزول ويكفي تخزين القيمة <code>x</code> عند الفهرس <code>i</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">if</span> j = i <span class="hljs-keyword">then</span>
      <span class="hljs-type">A</span>.set h i x
</code></pre>
<p>وإلا، ننقل قيمة العقدة <code>j</code> صعودًا إلى العقدة <code>i</code> ثم نواصل النزول من <code>j</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">else</span> <span class="hljs-keyword">begin</span>
      <span class="hljs-type">A</span>.set h i (<span class="hljs-type">A</span>.get h j);
      move_down h x j
    <span class="hljs-keyword">end</span>
</code></pre>
<p>وتكون دالة إزالة أصغر عنصر من كومة <code>h</code> عندئذ كما يلي:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> remove_min h =
    <span class="hljs-keyword">let</span> n = <span class="hljs-type">A</span>.length h - <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> invalid_arg <span class="hljs-string">&quot;remove_min&quot;</span>;
    <span class="hljs-keyword">let</span> x = <span class="hljs-type">A</span>.get h n <span class="hljs-keyword">in</span>
    <span class="hljs-type">A</span>.resize h n;
    <span class="hljs-keyword">if</span> n &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> move_down h x <span class="hljs-number">0</span>
</code></pre>
<p>ننظر في ثلاث حالات: إذا كانت الكومة فارغة، نرفع استثناءً. ثم إذا كانت تحتوي على عنصر واحد فقط، ليس من الضروري استدعاء الدالة <code>move_down</code>. وأخيرًا، إذا كانت الكومة تحتوي على أكثر من عنصر واحد، يجدر تغيير حجم المصفوفة بـ <code>A.resize</code>. والكود الكامل معطى في البرنامجين <a href="#x20-208020r63">63</a> (انظر الصفحة <a href="#x20-208020r63">542</a>) و<a href="#x20-209035r64">64</a>.</p>
<blockquote></blockquote>
<h4>التعقيد</h4>
<p>من الواضح أن للدوال <code>create</code> و<code>is_empty</code> و<code>get_min</code> كلفة ثابتة. أما في حالة الدالتين <code>add</code> و<code>remove_min</code>، فكلفتهما محدودة بارتفاع الكومة. وفعلًا، ننتقل في إحدى الحالتين من الأوراق نحو الجذر، وفي الأخرى من الجذر نحو الأوراق. وبما أن الكومة شجرة ثنائية كاملة، فإن ارتفاعها لوغاريتمي في عدد العناصر. لذا فإن للدالتين <code>add</code> و<code>remove_min</code>، في طابور أولوية يحتوي على N عنصرًا، كلفة O(log N). وثمة طريقة أبسط للنظر إلى الأمر تتمثل في ملاحظة أن الدالة <code>move_up</code> تقسم وسيطها <code>i</code> على اثنين عند كل استدعاء تكراري. ومن ثمّ لا يمكن استدعاؤها أكثر من O(log N) مرة. وبالمثل، تضرب الدالة <code>move_down</code> وسيطها في اثنين عند كل استدعاء تكراري، ومن ثمّ لا يمكن استدعاؤها أكثر من O(log N) مرة. وبالطبع، لا ينطبق كل هذا إلا بصورة مطفأة بحكم الاستدعاءات إلى <code>resize</code>، وهي مطفأة O(1)، كما بيّنّا في الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1">4</a>.</p>
<p>يعتمد تعقيد المساحة على تنفيذ المصفوفة القابلة لتغيير الحجم. فإذا استعملنا التنفيذ المعروض في بداية الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1">4</a>، حيث كان حجم المصفوفة يُضاعَف عند الحاجة إلى زيادته، فإن المصفوفة تحتوي على ضعف عدد العناصر المطلوب على الأكثر. ومن ثمّ يشغل طابور أولوية يحتوي على N عنصرًا 2N كلمة ذاكرة على الأكثر.</p>
<h3 id="64-طوابير-الأولوية-الدائمة-persistent-priority-queues">6.4 طوابير الأولوية الدائمة (persistent priority queues)</h3>
<p>في هذا القسم، نعرض بنية معطيات لطوابير الأولوية <em>الدائمة (persistent)</em>، تُعطى توقيعتها في البرنامج <a href="#x20-211018r65">65</a>.</p>
<p>كما في القسم السابق، نستعمل بنية معطيات الكومة، إلا أنها هنا ممثَّلة مباشرة بشجرة ثنائية. وخلافًا لحالة أشجار AVL، لا تُخزَّن أي معلومات إضافية في العقد لأغراض الموازنة. وسنرى لاحقًا أن لهذه الأكوام مع ذلك تعقيدًا لوغاريتميًا مطفأً. ونقول إن هذه الأشجار <em>ذاتية الموازنة (self-balancing)</em>.</p>
<p>لذلك تأخذ دالة تصنيف طوابير الأولوية الدائمة الشكل التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">module</span> <span class="hljs-type">Make</span>(<span class="hljs-type">X</span>: <span class="hljs-type">Ordered</span>) :
  <span class="hljs-type">PersistentPriorityQueue</span> <span class="hljs-keyword">with</span> <span class="hljs-keyword">type</span> elt = <span class="hljs-type">X</span>.t =
<span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">type</span> elt = <span class="hljs-type">X</span>.t
</code></pre>
<p>تحدّد الوسيطة <code>X</code>، من النوع <code>Ordered</code>، نوع العناصر. ويجب أن تكون هذه مزوَّدة بدالة مقارنة تقابل ترتيب الأولوية (انظر البرنامج <a href="https://usr.lmf.cnrs.fr/lpo/mainch5.html#x16-156015r33">33</a> من الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch5.html#sets-and-dictionaries">5</a> للحصول على التوقيعة <code>Ordered</code>). ومن ثمّ يكون النوع <code>elt</code> لعناصر الطابور مرادفًا لـ <code>X.t</code>. والنوع <code>t</code> هو نوع الأشجار الثنائية.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> t = <span class="hljs-type">Empty</span> | <span class="hljs-type">Node</span> <span class="hljs-keyword">of</span> t * elt * t
</code></pre>
<p>تعريفا الكومة الفارغة والدالة <code>is_empty</code> واضحان.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> empty = <span class="hljs-type">Empty</span>
  <span class="hljs-keyword">let</span> is_empty h =
    h = <span class="hljs-type">Empty</span>
</code></pre>
<p>تتيح بنية الكومة وصولًا فوريًا إلى أصغر عنصر.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> get_min = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">Empty</span> -&gt; invalid_arg <span class="hljs-string">&quot;get_min&quot;</span>
    | <span class="hljs-type">Node</span> (_, x, _) -&gt; x
</code></pre>
<blockquote></blockquote>
<p>يكمن كل التلطّف في هذه البنية في الدالة <code>merge</code> التي تدمج كومتين. وبافتراض أننا كتبنا هذه الدالة بالفعل، يصبح من السهل كتابة الدالتين <code>add</code> و<code>remove_min</code>. وفعلًا، تتمثل إضافة عنصر <code>x</code> إلى كومة <code>h</code> في دمج الكومة التي تحتوي على العنصر الوحيد <code>x</code> مع <code>h</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> add x h =
    merge (<span class="hljs-type">Node</span> (<span class="hljs-type">Empty</span>, x, <span class="hljs-type">Empty</span>)) h
</code></pre>
<p>وبالمثل، تتمثل إزالة أصغر عنصر من كومة في دمج كومتي الابن للجذر.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> remove_min = <span class="hljs-keyword">function</span>
    | <span class="hljs-type">Empty</span> -&gt; invalid_arg <span class="hljs-string">&quot;remove_min&quot;</span>
    | <span class="hljs-type">Node</span> (a, _, b) -&gt; merge a b
</code></pre>
<p>لم يبق علينا الآن سوى كتابة الدالة <code>merge</code> التي تدمج كومتين <code>ha</code> و<code>hb</code>. وإذا كانت إحدى الكومتين فارغة، فطريقة ذلك واضحة.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> merge ha hb = <span class="hljs-keyword">match</span> ha, hb <span class="hljs-keyword">with</span>
    | <span class="hljs-type">Empty</span>, h | h, <span class="hljs-type">Empty</span> -&gt;
        h
</code></pre>
<p>أما إذا لم تكن أيا من الكومتين فارغة، فإننا نبني الكومة الناتجة كما يلي. جذرها هو الأصغر بين جذري <code>ha</code> و<code>hb</code>. ولنفترض أن جذر <code>ha</code> هو الأصغر.</p>
<pre><code class="language-ocaml">    | <span class="hljs-type">Node</span> (la, xa, ra), <span class="hljs-type">Node</span> (lb, xb, rb) -&gt;
        <span class="hljs-keyword">if</span> <span class="hljs-type">X</span>.compare xa xb &lt;= <span class="hljs-number">0</span> <span class="hljs-keyword">then</span>
</code></pre>
<p>يجب علينا الآن تحديد الشجرتين الفرعيتين للعقدة <code>Node(_,xa,_)</code>. وهناك عدة إمكانات تنتج عن استدعاء <code>merge</code> استدعاءً تكراريًا على اثنتين من الأشجار الثلاث <code>la</code> و<code>ra</code> و<code>hb</code>، وعن اختيار النتيجة شجرةً فرعية يسرى أو يمنى. ومن بين هذه الإمكانات، نختار تلك التي تُجري دورانًا للشجرتين الفرعيتين من اليمين إلى اليسار، بما يضمن الموازنة الذاتية. وهكذا، تتخذ <code>ra</code> موضع <code>la</code>، وتُدمج <code>la</code> مع <code>hb</code>.</p>
<pre><code class="language-ocaml">          <span class="hljs-type">Node</span> (ra, xa, merge la hb)
</code></pre>
<p>أما الحالة الأخرى، التي يكون فيها جذر <code>hb</code> هو الأصغر، فهي متناظرة.</p>
<pre><code class="language-ocaml">        <span class="hljs-keyword">else</span> <span class="hljs-type">Node</span> (rb, xb, merge lb ha)
</code></pre>
<p>الكود الكامل لطوابير الأولوية الدائمة معطى في البرنامج <a href="#x20-211048r66">66</a>.</p>
<blockquote></blockquote>
<h4>التعقيد</h4>
<p>من الواضح أن للدوال <code>empty</code> و<code>is_empty</code> و<code>get_min</code> كلفة ثابتة. ويكون التحليل أكثر دقة في حالة الدالة <code>merge</code>، ومن ثمّ <code>add</code> و<code>remove_min</code>. وفي أسوأ الحالات، قد تكون كلفة <code>merge</code> بقدر العدد الإجمالي للعناصر. غير أنه، بالنسبة إلى متتالية من عمليات <code>add</code> و<code>remove_min</code>، تُنفَّذ على التوالي على كومة، لا يمكن أن تحدث أسوأ حالة كهذه في كل مرة. ويمكننا أن نبيّن أن الكلفة <em>المطفأة (amortized)</em> لكل عملية هي في الواقع O(log N)، حيث N هو عدد العناصر في الكومة. ولتحليل هذا التعقيد، نحيل القارئ إلى مقالة Sleator وTarjan التي قدّمت الأكوام ذاتية الموازنة [<a href="https://usr.lmf.cnrs.fr/lpo/mainli3.html#XSleatorTarjan1986heaps">22</a>] أو إلى الفصل الخاص بالأكوام بقلم Okasaki في <em>متعة البرمجة (The Fun of Programming)</em> [<a href="https://usr.lmf.cnrs.fr/lpo/mainli3.html#XGibbonsdeMoor2003">10</a>].</p>
<div class="exercises"><h3 id="65-تمارين">6.5 تمارين</h3>
<h4>القوائم المترابطة</h4>
<p><strong>6.1</strong> اكتب دالة <code>iter:(’a-&gt;unit)-&gt;’at-&gt;unit</code> تمرّ على عناصر طابور بالترتيب الذي أُدرجت به.</p>
<p><strong>6.2</strong> اكتب دالة <code>transfer:’at-&gt;’at-&gt;unit</code> تأخذ طابورين <code>q1</code> و<code>q2</code> وسيطين، وتنقل جميع عناصر <code>q1</code> إلى <code>q2</code>، وتُفرغ الطابور <code>q1</code>. واحرص على أن تُنفَّذ هذه العملية في زمن ثابت.</p>
<p><strong>6.3</strong> عدّل بنية الطابور في البرنامج <a href="#x20-203014r58">58</a> بحيث تتعقّب العدد الإجمالي للعناصر باستمرار. ويمكنك جعل النوع <code>t</code> سجلًا بحقل قابل للتعديل يحتوي على عدد عناصر الطابور.</p>
<h4>أزواج القوائم</h4>
<p><strong>6.4</strong> انظر في حالة طابور <code>q</code> تكون فيه القائمة الممثِّلة للمقدمة فارغة. فإذا نُفِّذت العملية <code>pop</code> عدة مرات، فسيُنفَّذ أيضًا عكس القائمة <code>i</code>، الممثِّلة لمؤخرة الطابور، عدة مرات. ولمعالجة ذلك، يمكننا تخزين نتيجة عكس <code>i</code> في الطابور الأصلي <code>q</code> بواسطة أثر جانبي. وبناءً على ذلك، نعتمد تمثيلًا مكافئًا للطابور <code>q</code> يظل دائمًا. عدّل النوع <code>’at</code> كما يلي:</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">type</span> ’a t = { <span class="hljs-keyword">mutable</span> o : ’a <span class="hljs-built_in">list</span>; <span class="hljs-keyword">mutable</span> i : ’a <span class="hljs-built_in">list</span> }
</code></pre>
<p>أعد تنفيذ العمليات على هذه الطوابير. ولا تتيح الطبيعة القابلة للتعديل لحقول هذا النوع تعريف قيمة <code>empty</code> متعددة الأشكال. ويكفي استبدالها بدالة <code>create:unit-&gt;’at</code>.</p>
<p><strong>6.5</strong> لاحظ أن تمثيل الطوابير كأزواج من القوائم متماثل. لذا يمكننا تنفيذ عمليات الإدراج والإزالة من طرفي الطابور بالسهولة نفسها. ونسمي البنية الناتجة طابورًا مزدوج النهاية (double-ended queue) أو <em>dequeue</em>. ويمكننا تسمية العمليات الأربع كما يلي:</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">val</span> push_front : ’a -&gt; ’a t -&gt; ’a t
    <span class="hljs-keyword">val</span> push_back : ’a -&gt; ’a t -&gt; ’a t
    <span class="hljs-keyword">val</span> pop_front : ’a t -&gt; ’a * ’a t
    <span class="hljs-keyword">val</span> pop_back : ’a t -&gt; ’a * ’a t
</code></pre>
<p>تقابل الدالتان <code>push_back</code> و<code>pop_front</code> الدالتين <code>push</code> و<code>pop</code> المكتوبتين بالفعل. اكتب الدالتين <code>push_front</code> و<code>pop_back</code>.</p>
<p><strong>6.6</strong> قد تكون الطوابير مزدوجة النهاية في التمرين السابق غير فعّالة. وفعلًا، قد تنتهي عمليات الإزالة المتناوبة من طرفي الطابور إلى اقتضاء العديد من عمليات عكس القوائم. ولمعالجة ذلك، يمكننا محاولة موازنة طولي القائمتين، بما يضمن نسبة دنيا من العناصر عند كل طرف. ولهذا، نعتبر c ≥ 2 ثابتًا ونفرض الثابت التالي على الطولين li وlo للقائمتين:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>l</mi><mi>i</mi><mo>≤</mo><mi>c</mi><mo>×</mo><mi>l</mi><mi>o</mi><mo>+</mo><mn>1</mn><mi>a</mi><mi>n</mi><mi>d</mi><mi>l</mi><mi>o</mi><mo>≤</mo><mi>c</mi><mo>×</mo><mi>l</mi><mi>i</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">li \\le c\\times lo + 1 and lo \\le c\\times li + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8304em;vertical-align:-0.136em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">c</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8304em;vertical-align:-0.136em;"></span><span class="mord">1</span><span class="mord mathnormal">an</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">c</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span>
<p>عدّل النوع <code>’at</code> كما يلي، بحيث تتعقّب طول كل قائمة.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">type</span> ’a t = { li : <span class="hljs-built_in">int</span>; i : ’a <span class="hljs-built_in">list</span>; lo : <span class="hljs-built_in">int</span>; o : ’a <span class="hljs-built_in">list</span> }
</code></pre>
<p>أعد تنفيذ العمليات الخاصة بالطوابير مزدوجة النهاية. ولمزيد من التفاصيل بشأن هذه البنية، ولا سيما تحليلها، يمكنك الرجوع إلى كتاب Okasaki [<a href="https://usr.lmf.cnrs.fr/lpo/mainli3.html#Xokasaki98">19</a>, sec. 8.4].</p>
<h4>بنى الأكوام</h4>
<p><strong>6.7</strong> يمكنك استعمال بنية الكومة لتنفيذ خوارزمية فرز فعّالة بسهولة، تُسمى <em>الفرز بالكومة (heapsort)</em>. والفكرة كما يلي: نُدرج جميع العناصر الواجب فرزها في كومة، ثم نستخرجها على التوالي بالدالتين <code>get_min</code> و<code>remove_min</code>. أضف دالة <code>sort:X.tarray-&gt;unit</code> إلى دالة التصنيف <code>Make</code> لفرز مصفوفة باستعمال هذه الخوارزمية. وإذا كان تعقيد عمليات الكومة لوغاريتميًا (وهو الحال عندما تستعمل مصفوفات قابلة لتغيير الحجم ذات تعقيد مطفأ ثابت)، فإن تعقيد خوارزمية الفرز هذه هو O(nlog n)، أي الأمثل. وسيُوصَف الفرز بالكومة بالتفصيل في الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch12.html#sorting-algorithms">12</a>.</p>
<p><strong>6.8</strong> قد يكون لعناصر مختلفة متعددة في كومة الأولوية نفسها. وهذا هو الحال، على سبيل المثال، عندما تكون العناصر أزواجًا لا تأخذ فيها الدالة <code>compare</code> في الحسبان سوى إحدى المركّبتين. بيّن أن ترتيب الإدراج في طابور أولوية محفوظ، أي أن العناصر ذات الأولوية المتساوية تُستخرج من الطابور بالترتيب نفسه الذي أُدرجت به.</p>
<p><strong>6.9</strong> نريد إضافة عملية <code>remove</code> لإزالة عنصر من طابور أولوية. وتنشأ عدة مشاكل. فمن جهة، قد يتكرر العنصر نفسه عدة مرات في الطابور. ومن جهة أخرى، لتنفيذ إزالة عنصر x بكفاءة، من الضروري تحديد الفهرس الذي يظهر عنده دون المرور على المصفوفة بأكملها، وهو أمر غير ممكن مع البنية الحالية.</p>
<p>نقترح حلّ هاتين المشكلتين كما يلي. عندما يُضاف عنصر إلى طابور الأولوية، نُعيد إلى المستخدم «مؤشرًا» (pointer) يمكن استعماله لاحقًا لإزالة هذا العنصر. وتُعدَّل التوقيعة بناءً على ذلك كما يلي:</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">type</span> pointer
    <span class="hljs-keyword">val</span> add: elt -&gt; t -&gt; pointer
</code></pre>
<p>داخليًا، يحتوي النوع <code>pointer</code> على الفهرس الذي يُخزَّن عنده العنصر المقابل في المصفوفة. ويُحدَّث هذا الفهرس عندما يُنقل العنصر داخل المصفوفة. وعمليًا، الأبسط هو تضمين قيمة العنصر أيضًا إلى جانب الفهرس:</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">type</span> pointer = { elt: elt; <span class="hljs-keyword">mutable</span> index: <span class="hljs-built_in">int</span> }
</code></pre>
<p>تحتوي المصفوفة القابلة لتغيير الحجم حينئذ على قيم من النوع <code>pointer</code> بدلًا من <code>elt</code>. عدّل بنية طابور الأولوية وفق هذه الفكرة وقدّم دالة <code>remove:pointer-&gt;t-&gt;unit</code>. تلميح: لإزالة العنصر الواقع عند الفهرس i، استبدله بالعنصر الأخير في المصفوفة القابلة لتغيير الحجم. ويكفي حينئذ إعادة إرساء خاصية الكومة، باستعمال <code>move_up</code> أو <code>move_down</code>. بيّن أن تعقيد <code>remove</code> من الرتبة O(log n).</p>
<p><strong>6.10</strong> في سياق التمرين أعلاه، قد تشير قيمة من النوع <code>pointer</code> إلى عنصر لم يعد موجودًا في الطابور. ومن ثمّ قد يؤدي استدعاء <code>remove</code> إلى إفساد البنية. عالج هذه المشكلة بإبطال جميع المؤشرات المقابلة لعنصر لم يعد موجودًا في الطابور، بحيث تتمكن الدالة <code>remove</code> من الفشل بشكل نظيف.</p>
<p><strong>6.11</strong> قد يكون من المثير للاهتمام أن تكون لدينا طوابير أولوية تقدّم عملية <code>change_priority</code> لتعديل أولوية عنصر موجود. وبإعادة استعمال فكرة التمرين <a href="#x20-216005r9">6.9</a>، قدّم العملية الجديدة التالية:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">val</span> change_priority : pointer -&gt; elt -&gt; t -&gt; <span class="hljs-built_in">unit</span>
</code></pre>
<p>تعدّل هذه العملية قيمة عنصر موجود بالفعل في الطابور. بيّن أن تعقيد <code>change_priority</code> من الرتبة O(log n).</p>
<p><strong>6.12</strong> في بعض الحالات، قد نرغب في التمييز بين أولوية العنصر وقيمته. عدّل تنفيذ طوابير الأولوية بحيث تعطيها التوقيعة التالية:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">module</span> <span class="hljs-type">Make</span>(<span class="hljs-type">P</span>: <span class="hljs-type">Ordered</span>)(<span class="hljs-type">V</span>: <span class="hljs-type">WithDummy</span>) :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> t
    <span class="hljs-keyword">type</span> priority = <span class="hljs-type">P</span>.t
    <span class="hljs-keyword">type</span> <span class="hljs-keyword">value</span> = <span class="hljs-type">V</span>.t
    <span class="hljs-keyword">val</span> create : <span class="hljs-built_in">unit</span> -&gt; t
    <span class="hljs-keyword">val</span> is_empty : t -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">val</span> add : priority -&gt; <span class="hljs-keyword">value</span> -&gt; t -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">val</span> get_min : t -&gt; priority * <span class="hljs-keyword">value</span>
    <span class="hljs-keyword">val</span> remove_min : t -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>النوع <code>P.t</code> هو نوع الأولويات، والنوع <code>V.t</code> هو نوع القيم. وكما تشير التوقيعات، فإن الأول مزوَّد بدالة <code>compare</code> والثاني بقيمة افتراضية.</p>
<h4>أكوام ذاتية الموازنة</h4>
<p><strong>6.13</strong> أعد التمرين <a href="#x20-216001r7">6.7</a> (الفرز بالكومة) باستعمال أكوام ذاتية الموازنة. ما تعقيد خوارزمية الفرز هذه؟</p>
<p><strong>6.14</strong> باستعمال مرجع، غلّف كود البرنامج <a href="#x20-211048r66">66</a> في وحدة ذات التوقيعة الأمرية للبرنامج <a href="#x20-201002r57">57</a>.</p>
</div>`,o={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:c,html:l};export{s as book,e as chapter,a as chapterTitle,o as default,c as headings,l as html,n as slug,p as title};
