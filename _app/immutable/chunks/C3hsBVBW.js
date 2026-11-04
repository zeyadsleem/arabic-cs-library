const s="ocaml-manual",a="ch02",n="نظام الوحدات",l="index",p="نظام الوحدات",e=[{depth:2,id:"21-البنى",text:"2.1 البنى"},{depth:2,id:"22-التوقيعات",text:"2.2 التوقيعات"},{depth:2,id:"23-الموصلات",text:"2.3 الموصِّلات"},{depth:2,id:"24-الموصلات-وتجريد-الأنواع",text:"2.4 الموصِّلات وتجريد الأنواع"},{depth:2,id:"25-الوحدات-والترجمة-المنفصلة",text:"2.5 الوحدات والترجمة المنفصلة"}],t=`<h1>الفصل 2: نظام الوحدات</h1>
<p>يعرّفنا هذا الفصل بنظام الوحدات في OCaml.</p>
<h2 id="21-البنى">2.1 البنى</h2>
<p>من أهم دوافع الوحدات جمع تعريفات مترابطة (كتعريف نوع بيانات والعمليات المقترنة به) في حزمة واحدة، وفرض مخطط تسمية متّسق لهذه التعريفات، فيتجنّب المرء نفاد الأسماء أو الخلط بينها عرضًا. وتُسمّى هذه الحزمة <em>بنية</em>، وتُدخل بالبنية <code>struct</code>…<code>end</code> التي تحوي متتالية اعتباطية من التعريفات. وتُعطى البنية عادةً اسمًا بالربط <code>module</code>. فمثلًا، هذه بنية تجمع نوعًا من طوابير FIFO وعملياته:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">Fifo</span> =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue = { front: <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>; rear: <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> }
      <span class="hljs-keyword">let</span> make front rear =
        <span class="hljs-keyword">match</span> front <span class="hljs-keyword">with</span>
        | <span class="hljs-literal">[]</span> -&gt; { front = <span class="hljs-type">List</span>.rev rear; rear = <span class="hljs-literal">[]</span> }
        | _  -&gt; { front; rear }
      <span class="hljs-keyword">let</span> empty = { front = <span class="hljs-literal">[]</span>; rear = <span class="hljs-literal">[]</span> }
      <span class="hljs-keyword">let</span> is_empty = <span class="hljs-keyword">function</span> { front = <span class="hljs-literal">[]</span>; _ } -&gt; <span class="hljs-literal">true</span> | _ -&gt; <span class="hljs-literal">false</span>
      <span class="hljs-keyword">let</span> add x q = make q.front (x :: q.rear)
      <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
      <span class="hljs-keyword">let</span> top = <span class="hljs-keyword">function</span>
        | { front = <span class="hljs-literal">[]</span>; _ } -&gt; raise <span class="hljs-type">Empty</span>
        | { front = x :: _; _ } -&gt; x
      <span class="hljs-keyword">let</span> pop = <span class="hljs-keyword">function</span>
        | { front = <span class="hljs-literal">[]</span>; _ } -&gt; raise <span class="hljs-type">Empty</span>
        | { front = _ :: f; rear = r } -&gt; make f r
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">Fifo</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue = { front : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>; rear : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>; }
    <span class="hljs-keyword">val</span> make : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> is_empty : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">val</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
    <span class="hljs-keyword">val</span> top : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">val</span> pop : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
  <span class="hljs-keyword">end</span>
</code></pre>
<p>ويمكن الإشارة إلى مكوّنات البنية من خارجها باستعمال «التدوين النقطي»، أي معرّفات مسبوقة باسم البنية. فمثلًا، <code>Fifo.add</code> هي الدالة <code>add</code> المعرَّفة داخل البنية <code>Fifo</code>، و<code>Fifo.queue</code> هو النوع <code>queue</code> المعرَّف في <code>Fifo</code>.</p>
<pre><code class="language-ocaml"># <span class="hljs-type">Fifo</span>.add <span class="hljs-string">&quot;hello&quot;</span> <span class="hljs-type">Fifo</span>.empty;;

- : <span class="hljs-built_in">string</span> <span class="hljs-type">Fifo</span>.queue = {<span class="hljs-type">Fifo</span>.front = [<span class="hljs-string">&quot;hello&quot;</span>]; rear = <span class="hljs-literal">[]</span>}
</code></pre>
<p>وثمّة إمكانية أخرى هي فتح الوحدة، وهو يجلب جميع المعرّفات المعرَّفة داخل الوحدة إلى نطاق البنية الحالية.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">open</span> <span class="hljs-type">Fifo</span>;;

# add <span class="hljs-string">&quot;hello&quot;</span> empty;;

- : <span class="hljs-built_in">string</span> <span class="hljs-type">Fifo</span>.queue = {front = [<span class="hljs-string">&quot;hello&quot;</span>]; rear = <span class="hljs-literal">[]</span>}
</code></pre>
<p>يفتح فتحُ الوحدة سبيلًا أخفّ إلى مكوّناتها، لكنه يجعل تحديد الوحدة التي عُرِّف فيها معرّف ما أصعب. وعلى وجه الخصوص، يمكن للوحدات المفتوحة أن تحجب معرّفات موجودة في النطاق الحالي، وقد يؤدّي ذلك إلى أخطاء مربكة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> empty = <span class="hljs-literal">[]</span>
  <span class="hljs-keyword">open</span> <span class="hljs-type">Fifo</span>;;

<span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> = <span class="hljs-literal">[]</span>

# <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span> :: empty ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> empty has <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> <span class="hljs-type">Fifo</span>.queue
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span> <span class="hljs-built_in">int</span> <span class="hljs-built_in">list</span>
</code></pre>
<p>والحل الجزئي لهذه المعضلة هو فتح الوحدات محليًا، بحيث تصير مكوّنات الوحدة متاحة في التعبير المعني فقط. وقد يجعل هذا الشيفرة أسهل قراءةً (لأنّ عبارة الفتح أقرب إلى موضع استعمالها) وأسهل إعادةَ هيكلة (لأنّ مقطع الشيفرة أكثر استقلالًا). وتتوفر بنيتان لهذا الغرض:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> <span class="hljs-keyword">open</span> <span class="hljs-type">Fifo</span> <span class="hljs-keyword">in</span>
  add <span class="hljs-string">&quot;hello&quot;</span> empty;;

- : <span class="hljs-built_in">string</span> <span class="hljs-type">Fifo</span>.queue = {front = [<span class="hljs-string">&quot;hello&quot;</span>]; rear = <span class="hljs-literal">[]</span>}
</code></pre>
<p>و</p>
<pre><code class="language-ocaml"># <span class="hljs-type">Fifo</span>.(add <span class="hljs-string">&quot;hello&quot;</span> empty);;

- : <span class="hljs-built_in">string</span> <span class="hljs-type">Fifo</span>.queue = {front = [<span class="hljs-string">&quot;hello&quot;</span>]; rear = <span class="hljs-literal">[]</span>}
</code></pre>
<p>وفي الصيغة الثانية، إذا كان جسم الفتح المحلي محصورًا هو نفسه بين أقواس أو أقواس معقوفة أو أقواس مربّعة، جاز إغفال أقواس الفتح المحلي. فمثلًا،</p>
<pre><code class="language-ocaml"># <span class="hljs-type">Fifo</span>.[empty] = <span class="hljs-type">Fifo</span>.([empty]);;

- : <span class="hljs-built_in">bool</span> = <span class="hljs-literal">true</span>

# <span class="hljs-type">Fifo</span>.[|empty|] = <span class="hljs-type">Fifo</span>.([|empty|]);;

- : <span class="hljs-built_in">bool</span> = <span class="hljs-literal">true</span>

# <span class="hljs-type">Fifo</span>.{ contents = empty } = <span class="hljs-type">Fifo</span>.({ contents = empty });;

- : <span class="hljs-built_in">bool</span> = <span class="hljs-literal">true</span>
</code></pre>
<p>وتعمل هذه الصيغة الثانية أيضًا في الأنماط:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> at_most_one_element x = <span class="hljs-keyword">match</span> x <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Fifo</span>.{ front = (<span class="hljs-literal">[]</span> | [_]); rear = <span class="hljs-literal">[]</span> } -&gt; <span class="hljs-literal">true</span>
  | _ -&gt; <span class="hljs-literal">false</span> ;;

<span class="hljs-keyword">val</span> at_most_one_element : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-type">Fifo</span>.queue -&gt; <span class="hljs-built_in">bool</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>ويمكن أيضًا نسخ مكوّنات وحدة داخل وحدة أخرى باستعمال العبارة <code>include</code>، وهذا نافع بوجه خاص لتوسيع وحدات قائمة. وللتوضيح، يمكننا إضافة دوال تُعيد قيمة اختيارية بدلًا من رفع استثناء عندما يكون الطابور فارغًا.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">FifoOpt</span> =
  <span class="hljs-keyword">struct</span>
    <span class="hljs-keyword">include</span> <span class="hljs-type">Fifo</span>
    <span class="hljs-keyword">let</span> top_opt q = <span class="hljs-keyword">if</span> is_empty q <span class="hljs-keyword">then</span> <span class="hljs-type">None</span> <span class="hljs-keyword">else</span> <span class="hljs-type">Some</span>(top q)
    <span class="hljs-keyword">let</span> pop_opt q = <span class="hljs-keyword">if</span> is_empty q <span class="hljs-keyword">then</span> <span class="hljs-type">None</span> <span class="hljs-keyword">else</span> <span class="hljs-type">Some</span>(pop q)
  <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">FifoOpt</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue = <span class="hljs-symbol">&#x27;a</span> <span class="hljs-type">Fifo</span>.queue = { front : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>; rear : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>; }
    <span class="hljs-keyword">val</span> make : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> is_empty : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">val</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
    <span class="hljs-keyword">val</span> top : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">val</span> pop : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> top_opt : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> option
    <span class="hljs-keyword">val</span> pop_opt : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue option
  <span class="hljs-keyword">end</span>
</code></pre>
<h2 id="22-التوقيعات">2.2 التوقيعات</h2>
<p>التوقيعات واجهات للبنى. يحدّد التوقيع مكوّنات البنية المتاحة من الخارج، وأنواعها. ويمكن استعماله لإخفاء بعض مكوّنات البنية (كتعريفات الدوال المحلية) أو لتصدير بعضها بنوع مقيَّد. فمثلًا، يحدّد التوقيع التالي عمليات الطابور <code>empty</code> و<code>add</code> و<code>top</code> و<code>pop</code>، لا الدالة المساعدة <code>make</code>. وبالمثل، يجعل نوع <code>queue</code> مجرّدًا (بعدم تقديم تمثيله الفعلي كنوع ملموس)، وهذا يضمن ألّا يستطيع مستعملو الوحدة <code>Fifo</code> خرق ثوابت بنية البيانات التي تعتمد عليها العمليات، مثل «إذا كانت القائمة الأمامية فارغة وجبت أن تكون القائمة الخلفية فارغة أيضًا».</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">FIFO</span> =
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue               <span class="hljs-comment">(* now an abstract type *)</span>
      <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> queue
      <span class="hljs-keyword">val</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
      <span class="hljs-keyword">val</span> top : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span>
      <span class="hljs-keyword">val</span> pop : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
      <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">FIFO</span> =
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> top : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">val</span> pop : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>ويؤدّي تقييد البنية <code>Fifo</code> بهذا التوقيع إلى رؤية أخرى للبنية <code>Fifo</code> لا تكون فيها الدالة <code>make</code> متاحة ويُخفى فيها التمثيل الفعلي للطوابير:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">AbstractQueue</span> = (<span class="hljs-type">Fifo</span> : <span class="hljs-type">FIFO</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">AbstractQueue</span> : <span class="hljs-type">FIFO</span>

# <span class="hljs-type">AbstractQueue</span>.make [<span class="hljs-number">1</span>] [<span class="hljs-number">2</span>;<span class="hljs-number">3</span>] ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">Unbound</span> <span class="hljs-keyword">value</span> <span class="hljs-type">AbstractQueue</span>.make

# <span class="hljs-type">AbstractQueue</span>.add <span class="hljs-string">&quot;hello&quot;</span> <span class="hljs-type">AbstractQueue</span>.empty;;

- : <span class="hljs-built_in">string</span> <span class="hljs-type">AbstractQueue</span>.queue = &lt;abstr&gt;
</code></pre>
<p>ويمكن إجراء التقييد أيضًا أثناء تعريف البنية، كما في</p>
<pre><code class="language-text">module Fifo = (struct ... end : FIFO);;
</code></pre>
<p>وتُقدَّم صيغة بديلة لما سبق:</p>
<pre><code class="language-text">module Fifo : FIFO = struct ... end;;
</code></pre>
<p>وكما في الوحدات، يمكن إدراج توقيع لنسخ مكوّناته داخل التوقيع الحالي. فمثلًا، يمكننا توسيع التوقيع <code>FIFO</code> بالدالتين <code>top_opt</code> و<code>pop_opt</code>:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">FIFO_WITH_OPT</span> =
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">include</span> <span class="hljs-type">FIFO</span>
      <span class="hljs-keyword">val</span> top_opt: <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> option
      <span class="hljs-keyword">val</span> pop_opt: <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue option
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">FIFO_WITH_OPT</span> =
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">val</span> top : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">val</span> pop : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue
    <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>
    <span class="hljs-keyword">val</span> top_opt : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> option
    <span class="hljs-keyword">val</span> pop_opt : <span class="hljs-symbol">&#x27;a</span> queue -&gt; <span class="hljs-symbol">&#x27;a</span> queue option
  <span class="hljs-keyword">end</span>
</code></pre>
<h2 id="23-الموصلات">2.3 الموصِّلات</h2>
<p>الموصِّلات «دوال» من وحدات إلى وحدات. وهي تتيح إنشاء وحدات ذات وسائط، ثم تقديم وحدات أخرى وسائطَ للحصول على تنفيذ معيّن. فمثلًا، يمكن أن تكون وحدة <code>Set</code> التي تنفّذ المجموعات كقوائم مرتّبة ذات وسيط، فتعمل مع أي وحدة توفّر نوع عنصر ودالة مقارنة <code>compare</code> (مثل <code>OrderedString</code>):</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> comparison = <span class="hljs-type">Less</span> | <span class="hljs-type">Equal</span> | <span class="hljs-type">Greater</span>;;

<span class="hljs-keyword">type</span> comparison = <span class="hljs-type">Less</span> | <span class="hljs-type">Equal</span> | <span class="hljs-type">Greater</span>

# <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">ORDERED_TYPE</span> =
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> t
      <span class="hljs-keyword">val</span> compare: t -&gt; t -&gt; comparison
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">ORDERED_TYPE</span> = <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> t <span class="hljs-keyword">val</span> compare : t -&gt; t -&gt; comparison <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">Set</span> =
    <span class="hljs-keyword">functor</span> (<span class="hljs-type">Elt</span>: <span class="hljs-type">ORDERED_TYPE</span>) -&gt;
      <span class="hljs-keyword">struct</span>
        <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t
        <span class="hljs-keyword">type</span> set = element <span class="hljs-built_in">list</span>
        <span class="hljs-keyword">let</span> empty = <span class="hljs-literal">[]</span>
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> add x s =
          <span class="hljs-keyword">match</span> s <span class="hljs-keyword">with</span>
            <span class="hljs-literal">[]</span> -&gt; [x]
          | hd::tl -&gt;
             <span class="hljs-keyword">match</span> <span class="hljs-type">Elt</span>.compare x hd <span class="hljs-keyword">with</span>
               <span class="hljs-type">Equal</span>   -&gt; s         <span class="hljs-comment">(* x is already in s *)</span>
             | <span class="hljs-type">Less</span>    -&gt; x :: s    <span class="hljs-comment">(* x is smaller than all elements of s *)</span>
             | <span class="hljs-type">Greater</span> -&gt; hd :: add x tl
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> member x s =
          <span class="hljs-keyword">match</span> s <span class="hljs-keyword">with</span>
            <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">false</span>
          | hd::tl -&gt;
              <span class="hljs-keyword">match</span> <span class="hljs-type">Elt</span>.compare x hd <span class="hljs-keyword">with</span>
                <span class="hljs-type">Equal</span>   -&gt; <span class="hljs-literal">true</span>     <span class="hljs-comment">(* x belongs to s *)</span>
              | <span class="hljs-type">Less</span>    -&gt; <span class="hljs-literal">false</span>    <span class="hljs-comment">(* x is smaller than all elements of s *)</span>
              | <span class="hljs-type">Greater</span> -&gt; member x tl
      <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">Set</span> :
  (<span class="hljs-type">Elt</span> : <span class="hljs-type">ORDERED_TYPE</span>) -&gt;
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t
      <span class="hljs-keyword">type</span> set = element <span class="hljs-built_in">list</span>
      <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
      <span class="hljs-keyword">val</span> add : <span class="hljs-type">Elt</span>.t -&gt; <span class="hljs-type">Elt</span>.t <span class="hljs-built_in">list</span> -&gt; <span class="hljs-type">Elt</span>.t <span class="hljs-built_in">list</span>
      <span class="hljs-keyword">val</span> member : <span class="hljs-type">Elt</span>.t -&gt; <span class="hljs-type">Elt</span>.t <span class="hljs-built_in">list</span> -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">end</span>
</code></pre>
<p>وبتطبيق الموصِّل <code>Set</code> على بنية تنفّذ نوعًا مرتّبًا، نحصل على عمليات مجموعات لهذا النوع:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">OrderedString</span> =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">string</span>
      <span class="hljs-keyword">let</span> compare x y = <span class="hljs-keyword">if</span> x = y <span class="hljs-keyword">then</span> <span class="hljs-type">Equal</span> <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> x &lt; y <span class="hljs-keyword">then</span> <span class="hljs-type">Less</span> <span class="hljs-keyword">else</span> <span class="hljs-type">Greater</span>
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">OrderedString</span> :
  <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">string</span> <span class="hljs-keyword">val</span> compare : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; comparison <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">StringSet</span> = <span class="hljs-type">Set</span>(<span class="hljs-type">OrderedString</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">StringSet</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> element = <span class="hljs-type">OrderedString</span>.t
    <span class="hljs-keyword">type</span> set = element <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">val</span> empty : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">val</span> add : <span class="hljs-type">OrderedString</span>.t -&gt; <span class="hljs-type">OrderedString</span>.t <span class="hljs-built_in">list</span> -&gt; <span class="hljs-type">OrderedString</span>.t <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">val</span> member : <span class="hljs-type">OrderedString</span>.t -&gt; <span class="hljs-type">OrderedString</span>.t <span class="hljs-built_in">list</span> -&gt; <span class="hljs-built_in">bool</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-type">StringSet</span>.member <span class="hljs-string">&quot;bar&quot;</span> (<span class="hljs-type">StringSet</span>.add <span class="hljs-string">&quot;foo&quot;</span> <span class="hljs-type">StringSet</span>.empty);;

- : <span class="hljs-built_in">bool</span> = <span class="hljs-literal">false</span>
</code></pre>
<h2 id="24-الموصلات-وتجريد-الأنواع">2.4 الموصِّلات وتجريد الأنواع</h2>
<p>كما في مثال <code>Fifo</code>، من حسن الأسلوب إخفاء التنفيذ الفعلي للنوع <code>set</code> كي لا يعتمد مستعملو البنية على كون المجموعات قوائم، فنستطيع لاحقًا الانتقال إلى تمثيل آخر أعلى كفاءة للمجموعات دون إفساد شيفرتهم. ويتحقّق ذلك بتقييد <code>Set</code> بتوقيع موصِّل مناسب:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">SETFUNCTOR</span> =
    (<span class="hljs-type">Elt</span>: <span class="hljs-type">ORDERED_TYPE</span>) -&gt;
      <span class="hljs-keyword">sig</span>
        <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t      <span class="hljs-comment">(* concrete *)</span>
        <span class="hljs-keyword">type</span> set                  <span class="hljs-comment">(* abstract *)</span>
        <span class="hljs-keyword">val</span> empty : set
        <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
        <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
      <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">SETFUNCTOR</span> =
  (<span class="hljs-type">Elt</span> : <span class="hljs-type">ORDERED_TYPE</span>) -&gt;
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t
      <span class="hljs-keyword">type</span> set
      <span class="hljs-keyword">val</span> empty : set
      <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
      <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">AbstractSet</span> = (<span class="hljs-type">Set</span> : <span class="hljs-type">SETFUNCTOR</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">AbstractSet</span> : <span class="hljs-type">SETFUNCTOR</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">AbstractStringSet</span> = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">OrderedString</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">AbstractStringSet</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> element = <span class="hljs-type">OrderedString</span>.t
    <span class="hljs-keyword">type</span> set = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">OrderedString</span>).set
    <span class="hljs-keyword">val</span> empty : set
    <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
    <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-type">AbstractStringSet</span>.add <span class="hljs-string">&quot;gee&quot;</span> <span class="hljs-type">AbstractStringSet</span>.empty;;

- : <span class="hljs-type">AbstractStringSet</span>.set = &lt;abstr&gt;
</code></pre>
<p>سعيًا إلى كتابة قيد النوع أعلاه على نحو أنيق أكثر، قد يرغب المرء في تسمية توقيع البنية التي يُعيدها الموصِّل، ثم استعمال ذلك التوقيع في القيد:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">SET</span> =
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> element
      <span class="hljs-keyword">type</span> set
      <span class="hljs-keyword">val</span> empty : set
      <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
      <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">SET</span> =
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> element
    <span class="hljs-keyword">type</span> set
    <span class="hljs-keyword">val</span> empty : set
    <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
    <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">WrongSet</span> = (<span class="hljs-type">Set</span> : (<span class="hljs-type">Elt</span>: <span class="hljs-type">ORDERED_TYPE</span>) -&gt; <span class="hljs-type">SET</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">WrongSet</span> : (<span class="hljs-type">Elt</span> : <span class="hljs-type">ORDERED_TYPE</span>) -&gt; <span class="hljs-type">SET</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">WrongStringSet</span> = <span class="hljs-type">WrongSet</span>(<span class="hljs-type">OrderedString</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">WrongStringSet</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> element = <span class="hljs-type">WrongSet</span>(<span class="hljs-type">OrderedString</span>).element
    <span class="hljs-keyword">type</span> set = <span class="hljs-type">WrongSet</span>(<span class="hljs-type">OrderedString</span>).set
    <span class="hljs-keyword">val</span> empty : set
    <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
    <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-type">WrongStringSet</span>.add <span class="hljs-string">&quot;gee&quot;</span> <span class="hljs-type">WrongStringSet</span>.empty ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">This</span> constant has <span class="hljs-keyword">type</span> <span class="hljs-built_in">string</span> but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span>
         <span class="hljs-type">WrongStringSet</span>.element = <span class="hljs-type">WrongSet</span>(<span class="hljs-type">OrderedString</span>).element
</code></pre>
<p>المشكلة هنا أنّ <code>SET</code> يحدّد النوع <code>element</code> على نحو مجرّد، فتضيع المساواة النوعية بين <code>element</code> في نتيجة الموصِّل و<code>t</code> في وسيطه. وبالتالي فـ <code>WrongStringSet.element</code> ليس النوع نفسه الذي هو <code>string</code>، ولا يمكن تطبيق عمليات <code>WrongStringSet</code> على السلاسل. وكما بُرِهَن أعلاه، من المهم أن يُصرَّح بأنّ النوع <code>element</code> في التوقيع <code>SET</code> مساوٍ لـ <code>Elt.t</code>؛ وللأسف هذا مستحيل في ما سبق لأنّ <code>SET</code> معرَّف في سياق لا وجود فيه لـ <code>Elt</code>. وللتغلّب على هذه الصعوبة، يوفّر OCaml بنية <code>with type</code> على التوقيعات تتيح إغناء توقيع بمساوٍات نوعية إضافية:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">AbstractSet2</span> =
    (<span class="hljs-type">Set</span> : (<span class="hljs-type">Elt</span>: <span class="hljs-type">ORDERED_TYPE</span>) -&gt; (<span class="hljs-type">SET</span> <span class="hljs-keyword">with</span> <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t));;

<span class="hljs-keyword">module</span> <span class="hljs-type">AbstractSet2</span> :
  (<span class="hljs-type">Elt</span> : <span class="hljs-type">ORDERED_TYPE</span>) -&gt;
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> element = <span class="hljs-type">Elt</span>.t
      <span class="hljs-keyword">type</span> set
      <span class="hljs-keyword">val</span> empty : set
      <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
      <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">end</span>
</code></pre>
<p>وكما في حالة البنى البسيطة، تُقدَّم صيغة بديلة لتعريف الموصِّلات وتقييد نتيجتها:</p>
<pre><code class="language-text">module AbstractSet2(Elt: ORDERED_TYPE) : (SET with type element = Elt.t) =
  struct ... end;;
</code></pre>
<p>تجريد مكوّن نوعي في نتيجة موصِّل تقنية قوية توفّر قدرًا عاليًا من أمان الأنواع، كما نوضّح الآن. لننظر إلى ترتيب على سلاسل المحارف يختلف عن الترتيب القياسي المنفَّذ في البنية <code>OrderedString</code>؛ مثلًا، نقارن السلاسل دون تمييز بين الحروف الكبيرة والصغيرة.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">NoCaseString</span> =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">string</span>
      <span class="hljs-keyword">let</span> compare s1 s2 =
        <span class="hljs-type">OrderedString</span>.compare (<span class="hljs-type">String</span>.lowercase_ascii s1) (<span class="hljs-type">String</span>.lowercase_ascii s2)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">module</span> <span class="hljs-type">NoCaseString</span> :
  <span class="hljs-keyword">sig</span> <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">string</span> <span class="hljs-keyword">val</span> compare : <span class="hljs-built_in">string</span> -&gt; <span class="hljs-built_in">string</span> -&gt; comparison <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">module</span> <span class="hljs-type">NoCaseStringSet</span> = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">NoCaseString</span>);;

<span class="hljs-keyword">module</span> <span class="hljs-type">NoCaseStringSet</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-keyword">type</span> element = <span class="hljs-type">NoCaseString</span>.t
    <span class="hljs-keyword">type</span> set = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">NoCaseString</span>).set
    <span class="hljs-keyword">val</span> empty : set
    <span class="hljs-keyword">val</span> add : element -&gt; set -&gt; set
    <span class="hljs-keyword">val</span> member : element -&gt; set -&gt; <span class="hljs-built_in">bool</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-type">NoCaseStringSet</span>.add <span class="hljs-string">&quot;FOO&quot;</span> <span class="hljs-type">AbstractStringSet</span>.empty ;;

<span class="hljs-type">Error</span>: <span class="hljs-type">The</span> <span class="hljs-keyword">value</span> <span class="hljs-type">AbstractStringSet</span>.empty has <span class="hljs-keyword">type</span>
         <span class="hljs-type">AbstractStringSet</span>.set = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">OrderedString</span>).set
       but an expression was expected <span class="hljs-keyword">of</span> <span class="hljs-keyword">type</span>
         <span class="hljs-type">NoCaseStringSet</span>.set = <span class="hljs-type">AbstractSet</span>(<span class="hljs-type">NoCaseString</span>).set
</code></pre>
<p>لاحظ أنّ النوعين <code>AbstractStringSet.set</code> و<code>NoCaseStringSet.set</code> غير متوافقين، وأنّ قيم هذين النوعين لا تتطابق. وهذا هو السلوك الصحيح: فمع أنّ نوعي المجموعتين يحويان عناصر من النوع نفسه (سلاسل)، فهما مبنيان على ترتيبين مختلفين لذلك النوع، وعلى العمليات أن تحفظ ثوابت مختلفة (التزايد الصارم في الترتيب القياسي وفي الترتيب غير المتأثّر بحالة الأحرف). وتطبيق عمليات من <code>AbstractStringSet</code> على قيم من النوع <code>NoCaseStringSet.set</code> قد يعطي نتائج خاطئة أو يبني قوائم تخرق ثوابت <code>NoCaseStringSet</code>.</p>
<h2 id="25-الوحدات-والترجمة-المنفصلة">2.5 الوحدات والترجمة المنفصلة</h2>
<p>قُدِّمت جميع أمثلة الوحدات حتى الآن في سياق النظام التفاعلي. غير أنّ الوحدات أنفع ما تكون في البرامج الكبيرة المترجمة دفعيًا. وفي هذه البرامج، من الضروري عمليًا تقسيم المصدر إلى عدّة ملفات تُسمّى وحدات ترجمة، يمكن ترجمتها منفصلةً، فيُقلَّل بذلك إعادة الترجمة بعد التغييرات.</p>
<p>وحدات الترجمة في OCaml حالات خاصة من البنى والتوقيعات، ويمكن تفسير العلاقة بين الوحدات بسهولة بمصطلحات نظام الوحدات. تتكوّن وحدة الترجمة <em>A</em> من ملفّين:</p>
<ul>
<li>
<p>ملف التنفيذ <em>A</em><code>.ml</code>، وهو يحوي متتالية من التعريفات نظيرة لما في داخل بنية <code>struct</code>…<code>end</code>؛</p>
</li>
<li>
<p>ملف الواجهة <em>A</em><code>.mli</code>، وهو يحوي متتالية من المواصفات نظيرة لما في داخل بنية <code>sig</code>…<code>end</code>.</p>
</li>
</ul>
<p>ويُعرّف هذان الملفان معًا بنية باسم <em>A</em> كأنّ التعريف التالي أُدخل على المستوى الأعلى:</p>
<pre><code class="language-text">module A: sig (* contents of file A.mli *) end
        = struct (* contents of file A.ml *) end;;
</code></pre>
<p>ويمكن ترجمة الملفات التي تعرّف وحدات الترجمة منفصلةً بالأمر <code>ocamlc -c</code> (والخيار <code>-c</code> يعني «ترجمة فقط، لا تحاول الربط»)؛ وينتج عن ذلك ملفات واجهة مترجمة (بامتداد <code>.cmi</code>) وملفات شيفرة كائن مترجمة (بامتداد <code>.cmo</code>). وبعد ترجمة جميع الوحدات، تُربط ملفات <code>.cmo</code> معًا بالأمر <code>ocamlc</code>. فمثلًا، تترجم الأوامر التالية برنامجًا يتكوّن من وحدتَي ترجمة <code>Aux</code> و<code>Main</code> وتربطه:</p>
<pre><code class="language-text">$ ocamlc -c Aux.mli                     # produces aux.cmi
$ ocamlc -c Aux.ml                      # produces aux.cmo
$ ocamlc -c Main.mli                    # produces main.cmi
$ ocamlc -c Main.ml                     # produces main.cmo
$ ocamlc -o theprogram Aux.cmo Main.cmo
</code></pre>
<p>ويسلك البرنامج سلوكًا مطابقًا تمامًا لما لو أُدخلت العبارات التالية على المستوى الأعلى:</p>
<pre><code class="language-text">module Aux: sig (* contents of Aux.mli *) end
          = struct (* contents of Aux.ml *) end;;
module Main: sig (* contents of Main.mli *) end
           = struct (* contents of Main.ml *) end;;
</code></pre>
<p>وعلى وجه الخصوص، يمكن لـ <code>Main</code> أن تشير إلى <code>Aux</code>: فالتعريفات والتصريحات الواردة في <code>Main.ml</code> و<code>Main.mli</code> يمكنها الإشارة إلى تعريفات في <code>Aux.ml</code> باستعمال تدوين <code>Aux.</code><em>ident</em>، بشرط أن تكون تلك التعريفات مصرَّحًا بها في <code>Aux.mli</code>.</p>
<p>ويحدّد ترتيب إعطاء ملفات <code>.cmo</code> للأمر <code>ocamlc</code> في مرحلة الربط ترتيبَ حدوث تعريفات الوحدات. وعلى هذا، يظهر <code>Aux</code> أولًا في المثال أعلاه، فيمكن لـ <code>Main</code> أن تشير إليه، لكن <code>Aux</code> لا يمكنها أن تشير إلى <code>Main</code>.</p>
<p>لاحظ أنّ البنى على المستوى الأعلى وحدها هي التي يمكن إسقاطها على ملفات مترجمة منفصلة، لا الموصِّلات ولا أنواع الوحدات. غير أنّ جميع كائنات صنف الوحدات يمكن أن تظهر مكوّنات في بنية، فالحلّ إذًا وضع الموصِّل أو نوع الوحدة داخل بنية، ثم إسقاط تلك البنية على ملف.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
