const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="guessing-game-solution",t="حل لعبة التخمين",e=[{depth:2,id:"مثال-مكتمل",text:"مثال مكتمل"}],p=`<p>للبدء، نريد أن نتأكد من أننا نستطيع تثبيت القيمة المُعادة من <code>Math.random()</code> في مكانها كي نتمكن من الاختبار مقابلها.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-title class_">Math</span>, <span class="hljs-string">&#x27;random&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-number">0.5</span>);
});
</code></pre>
<p>نريد أيضًا أن نتأكد من أننا نعيد كل شيء بعد كل اختبار. هذا احترازي في معظمه. لكنه ممارسة جيدة. فلنفعل ذلك.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">restoreAllMocks</span>();
});
</code></pre>
<p>الآن، على الأرجح لن أحتفظ بهذا الاختبار. لكنه، لأغراضنا، يوضّح أن دالتنا تُحاكى بشكل صحيح.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should have a secret number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeTypeOf</span>(<span class="hljs-string">&#x27;number&#x27;</span>);
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">50</span>); <span class="hljs-comment">// This is the new part.</span>
});
</code></pre>
<p>وبما أنه يمكننا الآن الاعتماد باطراد على بقاء الرقم السري ثابتًا، يمكننا اختبار بقية تنفيذنا.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is too low&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Too low!&#x27;</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is too low&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">51</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Too high!&#x27;</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is correct&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">50</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Correct! You guessed the number in 1 attempts.&#x27;</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is already guessed&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
  game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>);
  <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;You already guessed that number!&#x27;</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct number of guesses made&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();

  game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>);
  game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">51</span>);
  game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">50</span>);

  <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">guesses</span>.<span class="hljs-property">size</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
});
</code></pre>
<h2 id="مثال-مكتمل">مثال مكتمل</h2>
<p>هذا هو الملف بأكمله إن أردت رؤية كل شيء في مكان واحد.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { it, expect, describe, vi, beforeEach, afterEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Game</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./game&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Game&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-title class_">Math</span>, <span class="hljs-string">&#x27;random&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-number">0.5</span>);
  });

  <span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">restoreAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return an instance of a game&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This is mostly a dummy test.</span>
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    <span class="hljs-title function_">expect</span>(game).<span class="hljs-title function_">toBeInstanceOf</span>(<span class="hljs-title class_">Game</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should have a secret number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Thisn&#x27;t really a useful test.</span>
    <span class="hljs-comment">// Do I *really* care about the type of the secret number?</span>
    <span class="hljs-comment">// Do I *really* care about the name of a &quot;private&quot; property?</span>
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeTypeOf</span>(<span class="hljs-string">&#x27;number&#x27;</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">50</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is too low&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Too low!&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is too low&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">51</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Too high!&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is correct&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">50</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Correct! You guessed the number in 1 attempts.&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct response if the number is already guessed&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();
    game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;You already guessed that number!&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the correct number of guesses made&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Game</span>();

    game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">49</span>);
    game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">51</span>);
    game.<span class="hljs-title function_">guess</span>(<span class="hljs-number">50</span>);

    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">guesses</span>.<span class="hljs-property">size</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
  });
});
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
