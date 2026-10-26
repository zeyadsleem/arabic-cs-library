const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="strategies-for-testing-conditional-logic",l="استراتيجيات اختبار المنطق الشرطي",p=[{depth:2,id:"أولا-اعرف-ما-تختبره",text:"أولًا، اعرف ما تختبره"},{depth:2,id:"الخطوة-1-حدد-حالات-الاختبار",text:"الخطوة 1: حدّد حالات الاختبار"},{depth:2,id:"الخطوة-2-اكتب-اختبارات-لكل-شرط",text:"الخطوة 2: اكتب اختبارات لكل شرط"},{depth:2,id:"الخطوة-3-فكر-في-الحالات-الحدية",text:"الخطوة 3: فكّر في الحالات الحدّية"},{depth:2,id:"الخطوة-4-أعد-الهيكلة-بثقة",text:"الخطوة 4: أعد الهيكلة بثقة"},{depth:2,id:"الخلاصة-احتضن-اختبار-الفروع",text:"الخلاصة: احتضن اختبار الفروع"}],c=`<p>المنطق الشرطي من الأمور التي تتسلل إليك دون أن تشعر. تبدأ بشيء بسيط: «تعامل مع هذه الحالة الحدّية الواحدة فقط». وقبل أن تدرك، صار لديك من عبارات <code>if</code> أكثر مما لديك من أسطر شيفرة فعلية. وحين تسوء الأمور — وهي <em>ستسوء</em> — يكون السبب عادةً أن أحد فروع منطقك الشرطي خرج عن السيطرة.</p>
<p>قد يبدو اختبار هذه الشروط كفكّ كرة من الصوف المتشابك، لكن لا تقلق. لنمضِ في هذا خطوة بخطوة ونفكّكه.</p>
<h2 id="أولا-اعرف-ما-تختبره">أولًا، اعرف ما تختبره</h2>
<p>قبل أن نكتب اختبارًا واحدًا، علينا أن نعرف ما الشروط التي نتعامل معها. لنتخيّل دالة بسيطة تحسب خصمًا بناءً على عدد العناصر التي يشتريها المستخدم. شيء كهذا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">calculateDiscount</span> = (<span class="hljs-params">items</span>) =&gt; {
  <span class="hljs-keyword">if</span> (items &gt; <span class="hljs-number">10</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">0.2</span>; <span class="hljs-comment">// 20% discount</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (items &gt; <span class="hljs-number">5</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">0.1</span>; <span class="hljs-comment">// 10% discount</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>; <span class="hljs-comment">// No discount</span>
  }
};
</code></pre>
<p>يبدو مباشرًا، أليس كذلك؟ ثلاثة شروط مختلفة، وعلينا التأكد من تغطيتها جميعًا.</p>
<h2 id="الخطوة-1-حدد-حالات-الاختبار">الخطوة 1: حدّد حالات الاختبار</h2>
<p>قد يبدو هذا بديهيًا أكثر من اللازم، لكنه <em>بالغ</em> الأهمية. عليك اختبار <strong>كل فرع</strong>. كل شرط في <code>if</code> أو <code>switch</code> لديك (إن كنت من محبي الفخامة) يحتاج إلى حالة اختبار.</p>
<p>لنفكّك هذا:</p>
<ol>
<li><strong>اختبر العناصر الأكبر من 10</strong>: تأكد من أننا نحصل على خصم 20% الرائع ذاك عندما يتجاوز عدد العناصر 10.</li>
<li><strong>اختبر العناصر الأكبر من 5 والأصغر من أو تساوي 10</strong>: هنا نتوقع خصم 10% الأكثر تواضعًا.</li>
<li><strong>اختبر العناصر 5 أو أقل</strong>: عذرًا يا صديقي، لا خصم لك.</li>
</ol>
<h2 id="الخطوة-2-اكتب-اختبارات-لكل-شرط">الخطوة 2: اكتب اختبارات لكل شرط</h2>
<p>لنكتب بعض الاختبارات باستخدام Vitest لنرى هذا السحر يحدث. لا حاجة إلى بدائل مُحاكاة أو بدائل هذه المرة — فقط منطق شرطي خالص.</p>
<p>أولًا وقبل كل شيء، لنشغّل Vitest. إن لم تكن قد فعلت ذلك بعد، رشّ قليلًا من هذا الأمر في مشروعك:</p>
<pre><code class="language-bash">npm install vitest --save-dev
</code></pre>
<p>نحن جاهزون. الآن لنتأكد من أننا نغطي كل فرع من دالتنا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { calculateDiscount } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./discounts&#x27;</span>; <span class="hljs-comment">// Assume your function lives here</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;calculateDiscount - conditional logic tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return a 20% discount if more than 10 items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">11</span>);
    <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0.2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return a 10% discount if more than 5 items but less than or equal to 10&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">7</span>);
    <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0.1</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return 0 discount if 5 or fewer items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">3</span>);
    <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
  });
});
</code></pre>
<p>بوم. <strong>ثلاثة اختبارات.</strong> كل المسارات مغطاة. لم يُختبر منطقنا اختبارًا شاملًا فحسب، بل صرنا الآن نعرف تحديدًا أين ننظر عندما يسوء شيء.</p>
<h2 id="الخطوة-3-فكر-في-الحالات-الحدية">الخطوة 3: فكّر في الحالات الحدّية</h2>
<p>كلنا <em>جميعًا</em> نعلم أنه لا شيء يخرّب بيئة الإنتاج مثل حالة حدّية. لذا لنفكّر في مواقف ليست بهذه المباشرة — مثل تلك الحدود المزعجة.</p>
<ol>
<li>ماذا يحدث عند الحد <em>بالضبط</em> (أي 5 و10)؟</li>
<li>ماذا يحدث إذا كانت <code>items</code> تساوي <code>0</code>؟</li>
<li>وماذا عن الأعداد السالبة؟ هل ينبغي أن يكون ذلك ممكنًا أصلًا؟</li>
</ol>
<p>إن كنت تريد أن تنام مرتاحًا حقًا، فلنغطِّ تلك أيضًا:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return 0 discount for exactly 5 items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">5</span>);
  <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return 0 discount for exactly 10 items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">10</span>);
  <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0.1</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return 0 discount for 0 items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">0</span>);
  <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return 0 discount for negative number of items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">calculateDiscount</span>(-<span class="hljs-number">1</span>);
  <span class="hljs-title function_">expect</span>(discount).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
});
</code></pre>
<p>إن كان هناك درس واحد تعلمناه في هذه الصناعة، فهو أن المستخدمين سيجدون طرقًا مبتكرة لكسر كل شيء <strong>حرفيًا في كل مرة</strong>، فلنستعد لذلك بينما نحن فيه.</p>
<h2 id="الخطوة-4-أعد-الهيكلة-بثقة">الخطوة 4: أعد الهيكلة بثقة</h2>
<p>وهنا الجزء الأفضل — يمكنك الآن العبث بمنطقك بثقة. تريد تعديل حدود الخصم لاحقًا؟ تفضّل! اختباراتك تسند ظهرك. إنها توفر تلك الشبكة الأمان السحرية التي تضمن أنك لا تغيّر السلوك يمينًا ويسارًا دون أن تدري.</p>
<p>ربما تقرر لاحقًا: «لنمنح خصم 15% عند 10 عناصر بالضبط». يمكنك تغيير:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">if</span> (items &gt; <span class="hljs-number">10</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-number">0.2</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (items &gt;= <span class="hljs-number">10</span>) {
  <span class="hljs-comment">// Adjusted!</span>
  <span class="hljs-keyword">return</span> <span class="hljs-number">0.15</span>; <span class="hljs-comment">// New sweet spot</span>
}
</code></pre>
<p>ثم أعد تشغيل اختباراتك:</p>
<pre><code class="language-bash">npx vitest run
</code></pre>
<p>إن انكسر شيء في إعادة الهيكلة — احزر ماذا؟ ستصرخ في وجهك الاختبارات. وستعرف <em>بالضبط</em> أين تنظر.</p>
<h2 id="الخلاصة-احتضن-اختبار-الفروع">الخلاصة: احتضن اختبار الفروع</h2>
<p>اختبار المنطق الشرطي أقل اهتمامًا بالتأكد من أن الأمور تنجح، وأكثر اهتمامًا بالتأكد من أنك تغطي كل الزوايا. كل شرط، وكل فرع، وكل حالة حدّية — كلها في اللعبة. الوصول إلى تغطية 100% ليس مجرد مقياس مظهري هنا؛ بل ضرورة. بدونه، أنت تمشي على حبل مشدود بلا شبكة.</p>
<p>لذا في المرة القادمة التي ترشّ فيها الشروط كما يرشّ الطاهي البهارات في طبق، تأكد من أنك تتبّل اختباراتك بالقدر المناسب. لأن لا شيء يخرّب إعادة الهيكلة أسرع من جملة <code>else</code> منسيّة.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
