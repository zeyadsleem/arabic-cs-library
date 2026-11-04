const s="ocaml-manual",a="ch08",n="أمثلة متقدّمة بالأصناف والوحدات",l="index",p="أمثلة متقدّمة بالأصناف والوحدات",e=[{depth:2,id:"81-مثال-موسع-الحسابات-المصرفية",text:"8.1 مثال موسّع: الحسابات المصرفية"},{depth:2,id:"82-وحدات-بسيطة-على-هيئة-أصناف",text:"8.2 وحدات بسيطة على هيئة أصناف"},{depth:3,id:"821-السلاسل",text:"8.2.1 السلاسل"},{depth:3,id:"822-hashtbl",text:"8.2.2 Hashtbl"},{depth:3,id:"823-المجموعات",text:"8.2.3 المجموعات"},{depth:2,id:"83-نمط-الموضوعالمراقب",text:"8.3 نمط الموضوع/المراقب"}],c=`<h1>الفصل 8: أمثلة متقدّمة بالأصناف والوحدات</h1>
<p><em>كتب هذا الفصل ديدييه ريمي</em></p>
<p>نعرض في هذا الفصل بعض الأمثلة الأكبر استعمالًا للكائنات والأصناف والوحدات. نستعرض كثيرًا من ميزات الكائنات في الوقت نفسه على مثال حساب مصرفي. ونبيّن كيف يمكن التعبير عن وحدات مأخوذة من المكتبة القياسية على هيئة أصناف. وأخيرًا نصف نمطًا برمجيًا يُعرف باسم <em>الأنواع الافتراضية</em> من خلال مثال مديري النوافذ.</p>
<h2 id="81-مثال-موسع-الحسابات-المصرفية">8.1 مثال موسّع: الحسابات المصرفية</h2>
<p>نوضّح في هذا القسم معظم جوانب الكائنات والوراثة عبر تنقيح التعريف الأوّلي الساذج التالي لحساب مصرفي بسيط وتصحيحه وتخصيصه. (نعيد استعمال الوحدة <code>Euro</code> المعرّفة في نهاية الفصل 3.)</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> euro = <span class="hljs-keyword">new</span> <span class="hljs-type">Euro</span>.c;;

<span class="hljs-keyword">val</span> euro : <span class="hljs-built_in">float</span> -&gt; <span class="hljs-type">Euro</span>.c = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> zero = euro <span class="hljs-number">0.</span>;;

<span class="hljs-keyword">val</span> zero : <span class="hljs-type">Euro</span>.c = &lt;obj&gt;

# <span class="hljs-keyword">let</span> neg x = x#times (-<span class="hljs-number">1.</span>);;

<span class="hljs-keyword">val</span> neg : &lt; times : <span class="hljs-built_in">float</span> -&gt; <span class="hljs-symbol">&#x27;a</span>; .. &gt; -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">class</span> account =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance = zero
      <span class="hljs-keyword">method</span> balance = balance
      <span class="hljs-keyword">method</span> deposit x = balance &lt;- balance # plus x
      <span class="hljs-keyword">method</span> withdraw x =
        <span class="hljs-keyword">if</span> x#leq balance <span class="hljs-keyword">then</span> (balance &lt;- balance # plus (neg x); x) <span class="hljs-keyword">else</span> zero
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> account :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> account <span class="hljs-keyword">in</span> c # deposit (euro <span class="hljs-number">100.</span>); c # withdraw (euro <span class="hljs-number">50.</span>);;

- : <span class="hljs-type">Euro</span>.c = &lt;obj&gt;
</code></pre>
<p>ننقّح الآن هذا التعريف بإضافة دالة لحساب الفائدة.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> account_with_interests =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">inherit</span> account
      <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> interest = self # deposit (self # balance # times <span class="hljs-number">0.03</span>)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> account_with_interests :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> interest : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>جعلنا الدالة <code>interest</code> خاصة، لأن من الواضح أنها لا ينبغي أن تُستدعى بحرّية من الخارج. وهي هنا متاحة فقط للأصناف الفرعية التي ستتولّى التحديثات الشهرية أو السنوية للحساب.</p>
<p>سرعان ما ينبغي لنا إصلاح عيب في التعريف الحالي: يمكن استعمال الدالة <code>deposit</code> لسحب النقود بإيداع مبالغ سالبة. يمكننا إصلاح ذلك مباشرة:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> safe_account =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> account
      <span class="hljs-keyword">method</span> deposit x = <span class="hljs-keyword">if</span> zero#leq x <span class="hljs-keyword">then</span> balance &lt;- balance#plus x
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> safe_account :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>غير أنّ العيب يمكن إصلاحه على نحو أكثر أمانًا بالتعريف التالي:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> safe_account =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> account <span class="hljs-keyword">as</span> unsafe
      <span class="hljs-keyword">method</span> deposit x =
        <span class="hljs-keyword">if</span> zero#leq x <span class="hljs-keyword">then</span> unsafe # deposit x
        <span class="hljs-keyword">else</span> raise (<span class="hljs-type">Invalid_argument</span> <span class="hljs-string">&quot;deposit&quot;</span>)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> safe_account :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وهذا على وجه الخصوص لا يستلزم معرفة تنفيذ الدالة <code>deposit</code>.</p>
<p>ولتتبّع العمليات، نوسّع الصنف بحقل قابل للتغيير <code>history</code> ودالة خاصة <code>trace</code> تضيف عملية إلى السجل. ثم نعيد تعريف كل دالة نريد تتبّعها.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> operation = <span class="hljs-type">Deposit</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">Retrieval</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span>;;

<span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> operation = <span class="hljs-type">Deposit</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">Retrieval</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span>

# <span class="hljs-keyword">class</span> account_with_history =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">inherit</span> safe_account <span class="hljs-keyword">as</span> super
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> history = <span class="hljs-literal">[]</span>
      <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> trace x = history &lt;- x :: history
      <span class="hljs-keyword">method</span> deposit x = self#trace (<span class="hljs-type">Deposit</span> x);  super#deposit x
      <span class="hljs-keyword">method</span> withdraw x = self#trace (<span class="hljs-type">Retrieval</span> x); super#withdraw x
      <span class="hljs-keyword">method</span> history = <span class="hljs-type">List</span>.rev history
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> account_with_history :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> trace : <span class="hljs-type">Euro</span>.c operation -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>قد يرغب المرء في فتح حساب مع إيداع مبلغ أوّلي في الوقت نفسه. ومع أنّ التنفيذ الأوّلي لم يعالج هذا الشرط، فيمكن تحقيقه باستعمال مهيّئ.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> account_with_deposit x =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> account_with_history
      <span class="hljs-keyword">initializer</span> balance &lt;- x
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> account_with_deposit :
  <span class="hljs-type">Euro</span>.c -&gt;
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> trace : <span class="hljs-type">Euro</span>.c operation -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>والبديل الأفضل هو:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> account_with_deposit x =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">inherit</span> account_with_history
      <span class="hljs-keyword">initializer</span> self#deposit x
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> account_with_deposit :
  <span class="hljs-type">Euro</span>.c -&gt;
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> balance : <span class="hljs-type">Euro</span>.c
    <span class="hljs-keyword">method</span> deposit : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> history : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> trace : <span class="hljs-type">Euro</span>.c operation -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> withdraw : <span class="hljs-type">Euro</span>.c -&gt; <span class="hljs-type">Euro</span>.c
  <span class="hljs-keyword">end</span>
</code></pre>
<p>فالبديل الأخير أكثر أمانًا فعلًا، لأن نداء <code>deposit</code> سيستفيد تلقائيًا من فحوص الأمان ومن التتبّع. لنجرّبه:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> ccp = <span class="hljs-keyword">new</span> account_with_deposit (euro <span class="hljs-number">100.</span>) <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> _balance = ccp#withdraw (euro <span class="hljs-number">50.</span>) <span class="hljs-keyword">in</span>
  ccp#history;;

- : <span class="hljs-type">Euro</span>.c operation <span class="hljs-built_in">list</span> = [<span class="hljs-type">Deposit</span> &lt;obj&gt;; <span class="hljs-type">Retrieval</span> &lt;obj&gt;]
</code></pre>
<p>ويمكن إغلاق حساب بالدالة متعدّدة الأشكال التالية:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> close c = c#withdraw c#balance;;

<span class="hljs-keyword">val</span> close : &lt; balance : <span class="hljs-symbol">&#x27;a</span>; withdraw : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>; .. &gt; -&gt; <span class="hljs-symbol">&#x27;b</span> = &lt;<span class="hljs-keyword">fun</span>&gt;
</code></pre>
<p>وهذا ينطبق بطبيعة الحال على جميع أنواع الحسابات.</p>
<p>وأخيرًا نجمع عدّة نسخ من الحساب في وحدة <code>Account</code> مُجرّدة على عملة ما.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> today <span class="hljs-literal">()</span> = (<span class="hljs-number">01</span>,<span class="hljs-number">01</span>,<span class="hljs-number">2000</span>) <span class="hljs-comment">(* an approximation *)</span>
  <span class="hljs-keyword">module</span> <span class="hljs-type">Account</span> (<span class="hljs-type">M</span>:<span class="hljs-type">MONEY</span>) =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> m = <span class="hljs-type">M</span>.c
      <span class="hljs-keyword">let</span> m = <span class="hljs-keyword">new</span> <span class="hljs-type">M</span>.c
      <span class="hljs-keyword">let</span> zero = m <span class="hljs-number">0.</span>

      <span class="hljs-keyword">class</span> bank =
        <span class="hljs-keyword">object</span> (self)
          <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> balance = zero
          <span class="hljs-keyword">method</span> balance = balance
          <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> history = <span class="hljs-literal">[]</span>
          <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> trace x = history &lt;- x::history
          <span class="hljs-keyword">method</span> deposit x =
            self#trace (<span class="hljs-type">Deposit</span> x);
            <span class="hljs-keyword">if</span> zero#leq x <span class="hljs-keyword">then</span> balance &lt;- balance # plus x
            <span class="hljs-keyword">else</span> raise (<span class="hljs-type">Invalid_argument</span> <span class="hljs-string">&quot;deposit&quot;</span>)
          <span class="hljs-keyword">method</span> withdraw x =
            <span class="hljs-keyword">if</span> x#leq balance <span class="hljs-keyword">then</span>
              (balance &lt;- balance # plus (neg x); self#trace (<span class="hljs-type">Retrieval</span> x); x)
            <span class="hljs-keyword">else</span> zero
          <span class="hljs-keyword">method</span> history = <span class="hljs-type">List</span>.rev history
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> client_view =
        <span class="hljs-keyword">object</span>
          <span class="hljs-keyword">method</span> deposit : m -&gt; <span class="hljs-built_in">unit</span>
          <span class="hljs-keyword">method</span> history : m operation <span class="hljs-built_in">list</span>
          <span class="hljs-keyword">method</span> withdraw : m -&gt; m
          <span class="hljs-keyword">method</span> balance : m
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">class</span> <span class="hljs-keyword">virtual</span> check_client x =
        <span class="hljs-keyword">let</span> y = <span class="hljs-keyword">if</span> (m <span class="hljs-number">100.</span>)#leq x <span class="hljs-keyword">then</span> x
        <span class="hljs-keyword">else</span> raise (<span class="hljs-type">Failure</span> <span class="hljs-string">&quot;Insufficient initial deposit&quot;</span>) <span class="hljs-keyword">in</span>
        <span class="hljs-keyword">object</span> (self)
          <span class="hljs-keyword">initializer</span> self#deposit y
          <span class="hljs-keyword">method</span> <span class="hljs-keyword">virtual</span> deposit: m -&gt; <span class="hljs-built_in">unit</span>
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">module</span> <span class="hljs-type">Client</span> (<span class="hljs-type">B</span> : <span class="hljs-keyword">sig</span> <span class="hljs-keyword">class</span> bank : client_view <span class="hljs-keyword">end</span>) =
        <span class="hljs-keyword">struct</span>
          <span class="hljs-keyword">class</span> account x : client_view =
            <span class="hljs-keyword">object</span>
              <span class="hljs-keyword">inherit</span> <span class="hljs-type">B</span>.bank
              <span class="hljs-keyword">inherit</span> check_client x
            <span class="hljs-keyword">end</span>

          <span class="hljs-keyword">let</span> discount x =
            <span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> account x <span class="hljs-keyword">in</span>
            <span class="hljs-keyword">if</span> today<span class="hljs-literal">()</span> &lt; (<span class="hljs-number">1998</span>,<span class="hljs-number">10</span>,<span class="hljs-number">30</span>) <span class="hljs-keyword">then</span> c # deposit (m <span class="hljs-number">100.</span>); c
        <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>;;
</code></pre>
<p>يبيّن هذا استعمال الوحدات لتجميع عدّة تعريفات أصناف يمكن التفكير فيها في الواقع كوحدة واحدة. وهذه الوحدة يوفّرها مصرف للاستعمال الداخلي والخارجي معًا. وقد نُفّذ ذلك على هيئة موصِّل مُجرَّد على العملة حتى يمكن استعمال الشيفرة نفسها لتوفير حسابات بعملات مختلفة.</p>
<p>الصنف <code>bank</code> هو التنفيذ <em>الحقيقي</em> للحساب المصرفي (وكان يمكن تضمينه في المكان نفسه). وهو الصنف الذي سيُستعمل في التوسيعات والتنقيحات اللاحقة وما إليها. وفي المقابل لن يُعطى العميل إلا واجهة العميل.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">Euro_account</span> = <span class="hljs-type">Account</span>(<span class="hljs-type">Euro</span>);;

# <span class="hljs-keyword">module</span> <span class="hljs-type">Client</span> = <span class="hljs-type">Euro_account</span>.<span class="hljs-type">Client</span> (<span class="hljs-type">Euro_account</span>);;

# <span class="hljs-keyword">new</span> <span class="hljs-type">Client</span>.account (<span class="hljs-keyword">new</span> <span class="hljs-type">Euro</span>.c <span class="hljs-number">100.</span>);;
</code></pre>
<p>وبالتالي لا يستطيع العملاء الوصول المباشر إلى <code>balance</code> ولا إلى <code>history</code> الخاصة بحساباتهم. وسبيلهم الوحيد لتغيير أرصدتهم هو الإيداع أو السحب. ومن المهم إعطاء العملاء صنفًا لا مجرّد القدرة على إنشاء حسابات (كحساب <code>discount</code> الترويجي)، حتى يتسنّى لهم تخصيص حساباتهم. فمثلًا يمكن للعميل أن ينقّح الدالتين <code>deposit</code> و<code>withdraw</code> ليقوم بمسك دفاتره المالية الخاصة تلقائيًا. وفي المقابل تُعطى الدالة <code>discount</code> على هذا النحو، دون أي إمكانية لمزيد من التخصيص.</p>
<p>ومن المهم تقديم واجهة العميل على هيئة موصِّل <code>Client</code> حتى يمكن بناء حسابات العملاء بعد تخصيص محتمل للصنف <code>bank</code>. فقد يبقى الموصِّل <code>Client</code> على حاله ويُمرَّر إليه التعريف الجديد لتهيئة واجهة عميل للحساب الموسّع.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">Investment_account</span> (<span class="hljs-type">M</span> : <span class="hljs-type">MONEY</span>) =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> m = <span class="hljs-type">M</span>.c
      <span class="hljs-keyword">module</span> <span class="hljs-type">A</span> = <span class="hljs-type">Account</span>(<span class="hljs-type">M</span>)

      <span class="hljs-keyword">class</span> bank =
        <span class="hljs-keyword">object</span>
          <span class="hljs-keyword">inherit</span> <span class="hljs-type">A</span>.bank <span class="hljs-keyword">as</span> super
          <span class="hljs-keyword">method</span> deposit x =
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span> <span class="hljs-type">M</span>.c <span class="hljs-number">1000.</span>)#leq x <span class="hljs-keyword">then</span>
              print_string <span class="hljs-string">&quot;Would you like to invest?&quot;</span>;
            super#deposit x
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">module</span> <span class="hljs-type">Client</span> = <span class="hljs-type">A</span>.<span class="hljs-type">Client</span>
    <span class="hljs-keyword">end</span>;;
</code></pre>
<p>ويمكن أيضًا إعادة تعريف الموصِّل <code>Client</code> حين يمكن منح العميل بعض الميزات الجديدة في الحساب.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-type">Internet_account</span> (<span class="hljs-type">M</span> : <span class="hljs-type">MONEY</span>) =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">type</span> m = <span class="hljs-type">M</span>.c
      <span class="hljs-keyword">module</span> <span class="hljs-type">A</span> = <span class="hljs-type">Account</span>(<span class="hljs-type">M</span>)

      <span class="hljs-keyword">class</span> bank =
        <span class="hljs-keyword">object</span>
          <span class="hljs-keyword">inherit</span> <span class="hljs-type">A</span>.bank
          <span class="hljs-keyword">method</span> mail s = print_string s
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> client_view =
        <span class="hljs-keyword">object</span>
          <span class="hljs-keyword">method</span> deposit : m -&gt; <span class="hljs-built_in">unit</span>
          <span class="hljs-keyword">method</span> history : m operation <span class="hljs-built_in">list</span>
          <span class="hljs-keyword">method</span> withdraw : m -&gt; m
          <span class="hljs-keyword">method</span> balance : m
          <span class="hljs-keyword">method</span> mail : <span class="hljs-built_in">string</span> -&gt; <span class="hljs-built_in">unit</span>
        <span class="hljs-keyword">end</span>

      <span class="hljs-keyword">module</span> <span class="hljs-type">Client</span> (<span class="hljs-type">B</span> : <span class="hljs-keyword">sig</span> <span class="hljs-keyword">class</span> bank : client_view <span class="hljs-keyword">end</span>) =
        <span class="hljs-keyword">struct</span>
          <span class="hljs-keyword">class</span> account x : client_view =
            <span class="hljs-keyword">object</span>
              <span class="hljs-keyword">inherit</span> <span class="hljs-type">B</span>.bank
              <span class="hljs-keyword">inherit</span> <span class="hljs-type">A</span>.check_client x
            <span class="hljs-keyword">end</span>
        <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>;;
</code></pre>
<h2 id="82-وحدات-بسيطة-على-هيئة-أصناف">8.2 وحدات بسيطة على هيئة أصناف</h2>
<p>قد يتساءل المرء هل يمكن معاملة أنواع أوّلية كالأعداد الصحيحة والسلاسل كائناتٍ. ومع أنّ ذلك غير مثير للاهتمام عادةً في حالة الأعداد الصحيحة أو السلاسل، فقد توجد بعض الحالات التي يُستحسن فيها ذلك. والصنف <code>money</code> أعلاه مثال من هذا القبيل. ونبيّن هنا كيف نفعل ذلك في حالة السلاسل.</p>
<h3 id="821-السلاسل">8.2.1 السلاسل</h3>
<p>قد يكون التعريف الساذج للسلاسل كائنات كما يلي:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> ostring s =
    <span class="hljs-keyword">object</span>
       <span class="hljs-keyword">method</span> get n = <span class="hljs-type">String</span>.get s n
       <span class="hljs-keyword">method</span> print = print_string s
       <span class="hljs-keyword">method</span> escaped = <span class="hljs-keyword">new</span> ostring (<span class="hljs-type">String</span>.escaped s)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> ostring :
  <span class="hljs-built_in">string</span> -&gt;
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">method</span> escaped : ostring
    <span class="hljs-keyword">method</span> get : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">char</span>
    <span class="hljs-keyword">method</span> print : <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>غير أنّ الدالة <code>escaped</code> تعيد كائنًا من الصنف <code>ostring</code> لا كائنًا من الصنف الحالي. ومن ثمّ، إذا وُسّع الصنف أكثر، فلن تعيد الدالة <code>escaped</code> إلا كائنًا من الصنف الأب.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> sub_string s =
    <span class="hljs-keyword">object</span>
       <span class="hljs-keyword">inherit</span> ostring s
       <span class="hljs-keyword">method</span> sub start len = <span class="hljs-keyword">new</span> sub_string (<span class="hljs-type">String</span>.sub s  start len)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> sub_string :
  <span class="hljs-built_in">string</span> -&gt;
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">method</span> escaped : ostring
    <span class="hljs-keyword">method</span> get : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">char</span>
    <span class="hljs-keyword">method</span> print : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> sub : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; sub_string
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وكما رأينا في القسم 3.16، فالحلّ هو استعمال التحديث الدالي بدلًا من ذلك. ويلزمنا إنشاء متغيّر نسخة يحمل تمثيل السلسلة <code>s</code>.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> better_string s =
    <span class="hljs-keyword">object</span>
       <span class="hljs-keyword">val</span> repr = s
       <span class="hljs-keyword">method</span> get n = <span class="hljs-type">String</span>.get repr n
       <span class="hljs-keyword">method</span> print = print_string repr
       <span class="hljs-keyword">method</span> escaped = {&lt; repr = <span class="hljs-type">String</span>.escaped repr &gt;}
       <span class="hljs-keyword">method</span> sub start len = {&lt; repr = <span class="hljs-type">String</span>.sub s start len &gt;}
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> better_string :
  <span class="hljs-built_in">string</span> -&gt;
  <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;a</span>)
    <span class="hljs-keyword">val</span> repr : <span class="hljs-built_in">string</span>
    <span class="hljs-keyword">method</span> escaped : <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> get : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">char</span>
    <span class="hljs-keyword">method</span> print : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> sub : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وكما يظهر في النوع المستنتَج، تعيد الدالتان <code>escaped</code> و<code>sub</code> الآن كائنات من النوع نفسه الذي للصنف.</p>
<p>وثمّة صعوبة أخرى في تنفيذ الدالة <code>concat</code>. فمن أجل دمج سلسلة مع سلسلة أخرى من الصنف نفسه، يجب أن يتيسّر الوصول إلى متغيّر النسخة من الخارج. لذا يجب تعريف دالة <code>repr</code> تعيد <code>repr</code>. وهذا هو التعريف الصحيح للسلاسل:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> ostring s =
    <span class="hljs-keyword">object</span> (self : <span class="hljs-symbol">&#x27;mytype</span>)
       <span class="hljs-keyword">val</span> repr = s
       <span class="hljs-keyword">method</span> repr = repr
       <span class="hljs-keyword">method</span> get n = <span class="hljs-type">String</span>.get repr n
       <span class="hljs-keyword">method</span> print = print_string repr
       <span class="hljs-keyword">method</span> escaped = {&lt; repr = <span class="hljs-type">String</span>.escaped repr &gt;}
       <span class="hljs-keyword">method</span> sub start len = {&lt; repr = <span class="hljs-type">String</span>.sub s start len &gt;}
       <span class="hljs-keyword">method</span> concat (t : <span class="hljs-symbol">&#x27;mytype</span>) = {&lt; repr = repr ^ t#repr &gt;}
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> ostring :
  <span class="hljs-built_in">string</span> -&gt;
  <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;a</span>)
    <span class="hljs-keyword">val</span> repr : <span class="hljs-built_in">string</span>
    <span class="hljs-keyword">method</span> concat : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> escaped : <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> get : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">char</span>
    <span class="hljs-keyword">method</span> print : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> repr : <span class="hljs-built_in">string</span>
    <span class="hljs-keyword">method</span> sub : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-symbol">&#x27;a</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>ويمكن تعريف باني آخر للصنف <code>ostring</code> ليعيد سلسلة جديدة بطول معطى:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> cstring n = ostring (<span class="hljs-type">String</span>.make n <span class="hljs-string">&#x27; &#x27;</span>);;

<span class="hljs-keyword">class</span> cstring : <span class="hljs-built_in">int</span> -&gt; ostring
</code></pre>
<p>وهنا يكون كشف تمثيل السلاسل غير ضارّ على الأرجح. ويمكننا أيضًا إخفاء تمثيل السلاسل كما أخفينا العملة في الصنف <code>money</code> بالقسم 3.17.</p>
<h4>المكدّسات</h4>
<p>ثمّة أحيانًا بديل بين استعمال الوحدات أو الأصناف لأنواع البيانات ذات المعاملات. فثمّة حالات يكون فيها المنهجان متشابهين إلى حدّ بعيد. فمثلًا يمكن تنفيذ مكدّس تنفيذًا مباشرًا على هيئة صنف:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>;;

<span class="hljs-keyword">exception</span> <span class="hljs-type">Empty</span>

# <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] stack =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> l = (<span class="hljs-literal">[]</span> : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>)
      <span class="hljs-keyword">method</span> push x = l &lt;- x::l
      <span class="hljs-keyword">method</span> pop = <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span> <span class="hljs-literal">[]</span> -&gt; raise <span class="hljs-type">Empty</span> | a::l&#x27; -&gt; l &lt;- l&#x27;; a
      <span class="hljs-keyword">method</span> clear = l &lt;- <span class="hljs-literal">[]</span>
      <span class="hljs-keyword">method</span> length = <span class="hljs-type">List</span>.length l
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] stack :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> l : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> clear : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> length : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> pop : <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> push : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>غير أنّ كتابة دالة للمرور على عناصر المكدّس أعقد. فالدالة <code>fold</code> سيكون نوعها <code>('b -&gt; 'a -&gt; 'b) -&gt; 'b -&gt; 'b</code>. وهنا <code>'a</code> هو معامل المكدّس. أمّا المعامل <code>'b</code> فلا علاقة له بالصنف <code>'a stack</code> بل بالوسيط الذي سيُمرَّر إلى الدالة <code>fold</code>. والنهج الساذج هو جعل <code>'b</code> معاملًا إضافيًا للصنف <code>stack</code>:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] stack2 =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;a</span>] stack
      <span class="hljs-keyword">method</span> fold f (x : <span class="hljs-symbol">&#x27;b</span>) = <span class="hljs-type">List</span>.fold_left f x l
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] stack2 :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> l : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> clear : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> fold : (<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
    <span class="hljs-keyword">method</span> length : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> pop : <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> push : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>غير أنّ الدالة <code>fold</code> لكائن معيّن لا يمكن تطبيقها إلا على دوالّ لها جميعًا النوع نفسه:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> s = <span class="hljs-keyword">new</span> stack2;;

<span class="hljs-keyword">val</span> s : (<span class="hljs-symbol">&#x27;_weak1</span>, <span class="hljs-symbol">&#x27;_weak2</span>) stack2 = &lt;obj&gt;

# s#fold ( + ) <span class="hljs-number">0</span>;;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>

# s;;

- : (<span class="hljs-built_in">int</span>, <span class="hljs-built_in">int</span>) stack2 = &lt;obj&gt;
</code></pre>
<p>والحلّ الأفضل هو استعمال الدوال متعدّدة الأشكال، التي أُدخلت في الإصدار 3.05 من OCaml. فالدوال متعدّدة الأشكال تجعل من الممكن معاملة متغيّر النوع <code>'b</code> في نوع <code>fold</code> كمكمَّم كليًا، فيأخذ <code>fold</code> النوع متعدّد الأشكال <code>Forall 'b. ('b -&gt; 'a -&gt; 'b) -&gt; 'b -&gt; 'b</code>. ويلزم إعلان نوع صريح على الدالة <code>fold</code>، لأن مدقّق الأنواع لا يستطيع استنتاج النوع متعدّد الأشكال بنفسه.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] stack3 =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;a</span>] stack
      <span class="hljs-keyword">method</span> fold : <span class="hljs-symbol">&#x27;b</span>. (<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
                  = <span class="hljs-keyword">fun</span> f x -&gt; <span class="hljs-type">List</span>.fold_left f x l
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] stack3 :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> l : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> clear : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> fold : (<span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>) -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
    <span class="hljs-keyword">method</span> length : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> pop : <span class="hljs-symbol">&#x27;a</span>
    <span class="hljs-keyword">method</span> push : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<h3 id="822-hashtbl">8.2.2 Hashtbl</h3>
<p>ينبغي لنسخة مبسّطة من جداول التجزئة الكائنية أن يكون لها نوع الصنف التالي.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">method</span> find : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
      <span class="hljs-keyword">method</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table =
  <span class="hljs-keyword">object</span> <span class="hljs-keyword">method</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-built_in">unit</span> <span class="hljs-keyword">method</span> find : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span> <span class="hljs-keyword">end</span>
</code></pre>
<p>وأحد التنفيذات البسيطة، وهو معقول تمامًا لجداول التجزئة الصغيرة، استعمال قائمة اقتران:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] small_hashtbl : [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> table = <span class="hljs-literal">[]</span>
      <span class="hljs-keyword">method</span> find key = <span class="hljs-type">List</span>.assoc key table
      <span class="hljs-keyword">method</span> add key <span class="hljs-keyword">value</span> = table &lt;- (key, <span class="hljs-keyword">value</span>) :: table
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] small_hashtbl : [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table
</code></pre>
<p>وثمّة تنفيذ أفضل، وهو يقيس على نحو أفضل، يقوم على استعمال جدول تجزئة حقيقي… عناصره جداول تجزئة صغيرة!</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hashtbl size : [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">val</span> table = <span class="hljs-type">Array</span>.init size (<span class="hljs-keyword">fun</span> i -&gt; <span class="hljs-keyword">new</span> small_hashtbl)
      <span class="hljs-keyword">method</span> <span class="hljs-keyword">private</span> hash key =
        (<span class="hljs-type">Hashtbl</span>.hash key) <span class="hljs-keyword">mod</span> (<span class="hljs-type">Array</span>.length table)
      <span class="hljs-keyword">method</span> find key = table.(self#hash key) # find key
      <span class="hljs-keyword">method</span> add key = table.(self#hash key) # add key
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hashtbl : <span class="hljs-built_in">int</span> -&gt; [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;b</span>] hash_table
</code></pre>
<h3 id="823-المجموعات">8.2.3 المجموعات</h3>
<p>يؤدّي تنفيذ المجموعات إلى صعوبة أخرى. فالدالة <code>union</code> تحتاج إلى القدرة على الوصول إلى التمثيل الداخلي لكائن آخر من الصنف نفسه.</p>
<p>وهذه حالة أخرى من الدوال الصديقة كما رأينا في القسم 3.17. بل هي الآلية نفسها المستعملة في الوحدة <code>Set</code> عند غياب الكائنات.</p>
<p>وفي النسخة الكائنية من المجموعات لا نحتاج إلا إلى إضافة دالة <code>tag</code> تعيد تمثيل مجموعة. ولأن المجموعات ذات معاملات في نوع العناصر، فلدالة <code>tag</code> نوع ذو معاملات هو <code>'a tag</code>، ملموس داخل تعريف الوحدة ومجرّد في توقيعها. ومن الخارج سيُضمن حينها أن كائنين لهما دالة <code>tag</code> من النوع نفسه سيشتركان في التمثيل نفسه.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> <span class="hljs-type">SET</span> =
    <span class="hljs-keyword">sig</span>
      <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> tag
      <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] c :
        <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;b</span>)
          <span class="hljs-keyword">method</span> is_empty : <span class="hljs-built_in">bool</span>
          <span class="hljs-keyword">method</span> mem : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">bool</span>
          <span class="hljs-keyword">method</span> add : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
          <span class="hljs-keyword">method</span> union : <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;b</span>
          <span class="hljs-keyword">method</span> iter : (<span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>) -&gt; <span class="hljs-built_in">unit</span>
          <span class="hljs-keyword">method</span> tag : <span class="hljs-symbol">&#x27;a</span> tag
        <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>;;

# <span class="hljs-keyword">module</span> <span class="hljs-type">Set</span> : <span class="hljs-type">SET</span> =
    <span class="hljs-keyword">struct</span>
      <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> merge l1 l2 =
        <span class="hljs-keyword">match</span> l1 <span class="hljs-keyword">with</span>
          <span class="hljs-literal">[]</span> -&gt; l2
        | h1 :: t1 -&gt;
            <span class="hljs-keyword">match</span> l2 <span class="hljs-keyword">with</span>
              <span class="hljs-literal">[]</span> -&gt; l1
            | h2 :: t2 -&gt;
                <span class="hljs-keyword">if</span> h1 &lt; h2 <span class="hljs-keyword">then</span> h1 :: merge t1 l2
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> h1 &gt; h2 <span class="hljs-keyword">then</span> h2 :: merge l1 t2
                <span class="hljs-keyword">else</span> merge t1 l2
      <span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> tag = <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
      <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] c =
        <span class="hljs-keyword">object</span> (_ : <span class="hljs-symbol">&#x27;b</span>)
          <span class="hljs-keyword">val</span> repr = (<span class="hljs-literal">[]</span> : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>)
          <span class="hljs-keyword">method</span> is_empty = (repr = <span class="hljs-literal">[]</span>)
          <span class="hljs-keyword">method</span> mem x = <span class="hljs-type">List</span>.exists (( = ) x) repr
          <span class="hljs-keyword">method</span> add x = {&lt; repr = merge [x] repr &gt;}
          <span class="hljs-keyword">method</span> union (s : <span class="hljs-symbol">&#x27;b</span>) = {&lt; repr = merge repr s#tag &gt;}
          <span class="hljs-keyword">method</span> iter (f : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>) = <span class="hljs-type">List</span>.iter f repr
          <span class="hljs-keyword">method</span> tag = repr
        <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>;;
</code></pre>
<h2 id="83-نمط-الموضوعالمراقب">8.3 نمط الموضوع/المراقب</h2>
<p>المثال التالي، المعروف بنمط الموضوع/المراقب، يُعرض كثيرًا في المؤلَّفات بوصفه مسألة وراثة صعبة بأصناف مترابطة. ويُجمل النمط العامّ في تعريف زوج من صنفين يتفاعلان مع بعضهما تفاعلًا عوديًا.</p>
<p>وللصنف <code>observer</code> دالة مميّزة <code>notify</code> تحتاج إلى وسيطين: موضوع وحدث، لتنفيذ إجراء.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> <span class="hljs-keyword">virtual</span> [<span class="hljs-symbol">&#x27;subject</span>, <span class="hljs-symbol">&#x27;event</span>] observer =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">method</span> <span class="hljs-keyword">virtual</span> notify : <span class="hljs-symbol">&#x27;subject</span> -&gt;  <span class="hljs-symbol">&#x27;event</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> <span class="hljs-keyword">virtual</span> [<span class="hljs-symbol">&#x27;subject</span>, <span class="hljs-symbol">&#x27;event</span>] observer :
  <span class="hljs-keyword">object</span> <span class="hljs-keyword">method</span> <span class="hljs-keyword">virtual</span> notify : <span class="hljs-symbol">&#x27;subject</span> -&gt; <span class="hljs-symbol">&#x27;event</span> -&gt; <span class="hljs-built_in">unit</span> <span class="hljs-keyword">end</span>
</code></pre>
<p>أمّا الصنف <code>subject</code> فيحفظ قائمة بالمراقبين في متغيّر نسخة، وله دالة مميّزة <code>notify_observers</code> تبثّ الرسالة <code>notify</code> إلى جميع المراقبين مع حدث معيّن <code>e</code>.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;observer</span>, <span class="hljs-symbol">&#x27;event</span>] subject =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> observers = (<span class="hljs-literal">[]</span>:<span class="hljs-symbol">&#x27;observer</span> <span class="hljs-built_in">list</span>)
      <span class="hljs-keyword">method</span> add_observer obs = observers &lt;- (obs :: observers)
      <span class="hljs-keyword">method</span> notify_observers (e : <span class="hljs-symbol">&#x27;event</span>) =
          <span class="hljs-type">List</span>.iter (<span class="hljs-keyword">fun</span> x -&gt; x#notify self e) observers
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>, <span class="hljs-symbol">&#x27;event</span>] subject :
  <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;b</span>)
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; notify : <span class="hljs-symbol">&#x27;b</span> -&gt; <span class="hljs-symbol">&#x27;event</span> -&gt; <span class="hljs-built_in">unit</span>; .. &gt;
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> observers : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">method</span> add_observer : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> notify_observers : <span class="hljs-symbol">&#x27;event</span> -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وتكمن الصعوبة عادةً في تعريف نسخ من النمط السابق بالوراثة. ويمكن فعل ذلك في OCaml على نحو طبيعي وبديهي، كما يظهر في المثال التالي الذي يتعامل مع النوافذ.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">type</span> event = <span class="hljs-type">Raise</span> | <span class="hljs-type">Resize</span> | <span class="hljs-type">Move</span>;;

<span class="hljs-keyword">type</span> event = <span class="hljs-type">Raise</span> | <span class="hljs-type">Resize</span> | <span class="hljs-type">Move</span>

# <span class="hljs-keyword">let</span> string_of_event = <span class="hljs-keyword">function</span>
      <span class="hljs-type">Raise</span> -&gt; <span class="hljs-string">&quot;Raise&quot;</span> | <span class="hljs-type">Resize</span> -&gt; <span class="hljs-string">&quot;Resize&quot;</span> | <span class="hljs-type">Move</span> -&gt; <span class="hljs-string">&quot;Move&quot;</span>;;

<span class="hljs-keyword">val</span> string_of_event : event -&gt; <span class="hljs-built_in">string</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# <span class="hljs-keyword">let</span> count = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>;;

<span class="hljs-keyword">val</span> count : <span class="hljs-built_in">int</span> <span class="hljs-built_in">ref</span> = {contents = <span class="hljs-number">0</span>}

# <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;observer</span>] window_subject =
    <span class="hljs-keyword">let</span> id = count := succ !count; !count <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;observer</span>, event] subject
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> position = <span class="hljs-number">0</span>
      <span class="hljs-keyword">method</span> identity = id
      <span class="hljs-keyword">method</span> move x = position &lt;- position + x; self#notify_observers <span class="hljs-type">Move</span>
      <span class="hljs-keyword">method</span> draw = <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;{Position = %d}\\n&quot;</span>  position;
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] window_subject :
  <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;b</span>)
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; notify : <span class="hljs-symbol">&#x27;b</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>; .. &gt;
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> observers : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> position : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> add_observer : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> draw : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> identity : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> move : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> notify_observers : event -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;subject</span>] window_observer =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;subject</span>, event] observer
      <span class="hljs-keyword">method</span> notify s e = s#draw
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] window_observer :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; draw : <span class="hljs-built_in">unit</span>; .. &gt;
    <span class="hljs-keyword">method</span> notify : <span class="hljs-symbol">&#x27;a</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وكما هو متوقّع، فنوع <code>window</code> عودي.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> window = <span class="hljs-keyword">new</span> window_subject;;

<span class="hljs-keyword">val</span> window :
  (&lt; notify : <span class="hljs-symbol">&#x27;a</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>; .. &gt; <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;_weak3</span>) window_subject <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;a</span> =
  &lt;obj&gt;
</code></pre>
<p>غير أنّ الصنفين <code>window_subject</code> و<code>window_observer</code> ليسا متعائدين.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> window_observer = <span class="hljs-keyword">new</span> window_observer;;

<span class="hljs-keyword">val</span> window_observer : (&lt; draw : <span class="hljs-built_in">unit</span>; .. &gt; <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;_weak4</span>) window_observer =
  &lt;obj&gt;

# window#add_observer window_observer;;

- : <span class="hljs-built_in">unit</span> = <span class="hljs-literal">()</span>

# window#move <span class="hljs-number">1</span>;;

{<span class="hljs-type">Position</span> = <span class="hljs-number">1</span>}
- : <span class="hljs-built_in">unit</span> = <span class="hljs-literal">()</span>
</code></pre>
<p>ويمكن مع ذلك توسيع الصنفين <code>window_observer</code> و<code>window_subject</code> بالوراثة. فمثلًا يمكن إثراء <code>subject</code> بسلوكات جديدة وتنقيح سلوك المراقب.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;observer</span>] richer_window_subject =
    <span class="hljs-keyword">object</span> (self)
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;observer</span>] window_subject
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> size = <span class="hljs-number">1</span>
      <span class="hljs-keyword">method</span> resize x = size &lt;- size + x; self#notify_observers <span class="hljs-type">Resize</span>
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> top = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">method</span> raise = top &lt;- <span class="hljs-literal">true</span>; self#notify_observers <span class="hljs-type">Raise</span>
      <span class="hljs-keyword">method</span> draw = <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;{Position = %d; Size = %d}\\n&quot;</span>  position size;
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] richer_window_subject :
  <span class="hljs-keyword">object</span> (<span class="hljs-symbol">&#x27;b</span>)
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; notify : <span class="hljs-symbol">&#x27;b</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>; .. &gt;
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> observers : <span class="hljs-symbol">&#x27;a</span> <span class="hljs-built_in">list</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> position : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> size : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> top : <span class="hljs-built_in">bool</span>
    <span class="hljs-keyword">method</span> add_observer : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> draw : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> identity : <span class="hljs-built_in">int</span>
    <span class="hljs-keyword">method</span> move : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> notify_observers : event -&gt; <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> raise : <span class="hljs-built_in">unit</span>
    <span class="hljs-keyword">method</span> resize : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>

# <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;subject</span>] richer_window_observer =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;subject</span>] window_observer <span class="hljs-keyword">as</span> super
      <span class="hljs-keyword">method</span> notify s e = <span class="hljs-keyword">if</span> e &lt;&gt; <span class="hljs-type">Raise</span> <span class="hljs-keyword">then</span> s#raise; super#notify s e
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] richer_window_observer :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; draw : <span class="hljs-built_in">unit</span>; raise : <span class="hljs-built_in">unit</span>; .. &gt;
    <span class="hljs-keyword">method</span> notify : <span class="hljs-symbol">&#x27;a</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>ويمكننا كذلك إنشاء نوع آخر من المراقبين:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;subject</span>] trace_observer =
    <span class="hljs-keyword">object</span>
      <span class="hljs-keyword">inherit</span> [<span class="hljs-symbol">&#x27;subject</span>, event] observer
      <span class="hljs-keyword">method</span> notify s e =
        <span class="hljs-type">Printf</span>.printf
          <span class="hljs-string">&quot;&lt;Window %d &lt;== %s&gt;\\n&quot;</span> s#identity (string_of_event e)
    <span class="hljs-keyword">end</span>;;

<span class="hljs-keyword">class</span> [<span class="hljs-symbol">&#x27;a</span>] trace_observer :
  <span class="hljs-keyword">object</span>
    <span class="hljs-keyword">constraint</span> <span class="hljs-symbol">&#x27;a</span> = &lt; identity : <span class="hljs-built_in">int</span>; .. &gt;
    <span class="hljs-keyword">method</span> notify : <span class="hljs-symbol">&#x27;a</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<p>وإرفاق عدّة مراقبين بالكائن نفسه:</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> window = <span class="hljs-keyword">new</span> richer_window_subject;;

<span class="hljs-keyword">val</span> window :
  (&lt; notify : <span class="hljs-symbol">&#x27;a</span> -&gt; event -&gt; <span class="hljs-built_in">unit</span>; .. &gt; <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;_weak5</span>) richer_window_subject
  <span class="hljs-keyword">as</span> <span class="hljs-symbol">&#x27;a</span> = &lt;obj&gt;

# window#add_observer (<span class="hljs-keyword">new</span> richer_window_observer);;

- : <span class="hljs-built_in">unit</span> = <span class="hljs-literal">()</span>

# window#add_observer (<span class="hljs-keyword">new</span> trace_observer);;

- : <span class="hljs-built_in">unit</span> = <span class="hljs-literal">()</span>

# window#move <span class="hljs-number">1</span>; window#resize <span class="hljs-number">2</span>;;

&lt;<span class="hljs-type">Window</span> <span class="hljs-number">1</span> &lt;== <span class="hljs-type">Move</span>&gt;
&lt;<span class="hljs-type">Window</span> <span class="hljs-number">1</span> &lt;== <span class="hljs-type">Raise</span>&gt;
{<span class="hljs-type">Position</span> = <span class="hljs-number">1</span>; <span class="hljs-type">Size</span> = <span class="hljs-number">1</span>}
{<span class="hljs-type">Position</span> = <span class="hljs-number">1</span>; <span class="hljs-type">Size</span> = <span class="hljs-number">1</span>}
&lt;<span class="hljs-type">Window</span> <span class="hljs-number">1</span> &lt;== <span class="hljs-type">Resize</span>&gt;
&lt;<span class="hljs-type">Window</span> <span class="hljs-number">1</span> &lt;== <span class="hljs-type">Raise</span>&gt;
{<span class="hljs-type">Position</span> = <span class="hljs-number">1</span>; <span class="hljs-type">Size</span> = <span class="hljs-number">3</span>}
{<span class="hljs-type">Position</span> = <span class="hljs-number">1</span>; <span class="hljs-type">Size</span> = <span class="hljs-number">3</span>}
- : <span class="hljs-built_in">unit</span> = <span class="hljs-literal">()</span>
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,c as html,l as slug,p as title};
