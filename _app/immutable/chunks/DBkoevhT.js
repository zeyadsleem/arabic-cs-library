const s="kinney",n="testing",t="مدخل إلى الاختبارات",e="assert-versus-expect",a="الفرق الجوهري بين assert و expect",o=[{depth:2,id:"assert-أسلوب-التحقق",text:"assert: أسلوب التحقق"},{depth:2,id:"expect-أسلوب-التطوير-المدفوع-بالسلوك",text:"expect: أسلوب التطوير المدفوع بالسلوك"},{depth:3,id:"مثال-باستخدام-expect",text:"مثال باستخدام expect"},{depth:2,id:"الفروق-الجوهرية",text:"الفروق الجوهرية"},{depth:2,id:"متى-تستخدم-assert-أو-expect",text:"متى تستخدم assert أو expect؟"}],l=`<blockquote>
<p><strong>لن نغطي هذا في الدورة</strong></p>
<p>هذا <em>بصراحة</em> ليس مهمًا كثيرًا. أدرجه هنا فقط في حال راودك الفضول.</p>
</blockquote>
<p>يكمن الفرق الجوهري بين <code>assert</code> و<code>expect</code> في <strong>أنماط الاستخدام</strong> و<strong>أنماط الواجهة</strong> في مكتبات الاختبار. يُستخدم كلاهما لكتابة التحققات (أي التحقق من صحة شروط معينة في اختباراتك)، لكنهما يختلفان في الصياغة والأسلوب والمرونة.</p>
<h2 id="assert-أسلوب-التحقق"><code>assert</code>: أسلوب التحقق</h2>
<ul>
<li><strong><code>assert</code></strong> يتبع <strong>أسلوب تحقق تقليديًا</strong>، حيث تُؤكَّد شروط محددة صراحةً في عبارة.</li>
<li>يُستخدم في <strong>مكتبات مثل وحدة <code>assert</code> المدمجة في Node.js</strong> أو في أطر اختبار تستخدم <strong>مكتبات تحقق</strong> مثل <strong>Chai</strong> (بوضع <code>assert</code>).</li>
<li><strong>تسلسل أقل</strong>: صياغة <code>assert</code> لا تناسب تسلسل التوابع. بل تأخذ الشرط كمعامل.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> assert <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;assert&#x27;</span>;

assert.<span class="hljs-title function_">strictEqual</span>(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// Passes if 1 + 1 equals 2</span>
assert.<span class="hljs-title function_">strictEqual</span>(<span class="hljs-string">&#x27;foo&#x27;</span>, <span class="hljs-string">&#x27;foo&#x27;</span>); <span class="hljs-comment">// Passes if strings are equal</span>
assert.<span class="hljs-title function_">ok</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// Passes if the condition is truthy</span>
assert.<span class="hljs-title function_">deepEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }, { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }); <span class="hljs-comment">// Deep comparison of objects</span>
</code></pre>
<ul>
<li><strong>المزايا</strong> واجهة بسيطة ومصغّرة. توفرها Node.js خارج الصندوق.
<ul>
<li>واجهة بسيطة ومصغّرة.</li>
<li>توفرها Node.js خارج الصندوق.</li>
</ul>
</li>
<li><strong>العيوب</strong> أقل تعبيرية، وقد تنتج حالات اختبار مطوّلة أو أقل قابلية للقراءة. مرونة محدودة في التخصيص (مثل المطابقات المخصصة أو أنواع تحقق أكثر تحديدًا).
<ul>
<li>أقل تعبيرية، وقد تنتج حالات اختبار مطوّلة أو أقل قابلية للقراءة.</li>
<li>مرونة محدودة في التخصيص (مثل المطابقات المخصصة أو أنواع تحقق أكثر تحديدًا).</li>
</ul>
</li>
</ul>
<h2 id="expect-أسلوب-التطوير-المدفوع-بالسلوك"><code>expect</code>: أسلوب التطوير المدفوع بالسلوك</h2>
<ul>
<li><strong><code>expect</code></strong> يتبع أسلوب <strong><a href="https://en.wikipedia.org/wiki/Behavior-driven_development">التطوير المدفوع بالسلوك</a> (BDD)</strong> ويُستخدم عادةً في مكتبات اختبار مثل Jest وVitest وMocha/Chai.</li>
<li>يُعرف بأنه <strong>أكثر تعبيرية</strong> و<strong>قابل للتسلسل</strong>، ما يتيح للمطورين كتابة اختبارات أكثر قابلية للقراءة البشرية.</li>
<li><strong>التسلسل</strong>: يمكنك تسلسل مطابقات مختلفة (مثل <code>.toBe()</code> و<code>.toEqual()</code> و<code>.toContain()</code>) مع <code>expect</code> لإنشاء تحققات أكثر مرونة وقوة.</li>
</ul>
<h3 id="مثال-باستخدام-expect">مثال باستخدام <code>expect</code></h3>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">expect</span>(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>); <span class="hljs-comment">// Checks if 1 + 1 equals 2</span>
<span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;foo&#x27;</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;foo&#x27;</span>); <span class="hljs-comment">// Checks if strings are equal</span>
<span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBeTruthy</span>(); <span class="hljs-comment">// Checks if value is truthy</span>
<span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }); <span class="hljs-comment">// Deep comparison of objects</span>
</code></pre>
<h4>المزايا</h4>
<ul>
<li>أكثر تعبيرية وقابلية للقراءة بفضل التسلسل والمطابقات المرنة.</li>
<li>يدعم <strong>المطابقات المخصصة</strong> وفحوصًا إضافية مثل <code>.toBeTruthy()</code> و<code>.toHaveLength()</code> وغيرها.</li>
<li>أسهل في كتابة الاختبارات بأسلوب BDD (لغة أكثر طبيعية).</li>
</ul>
<h4>العيوب</h4>
<ul>
<li>واجهة أكبر قليلًا مقارنة بـ <code>assert</code> بسبب المطابقات الإضافية.</li>
<li>قد يتطلب مكتبة اختبار مثل Jest أو Vitest للعمل الكامل.</li>
</ul>
<h2 id="الفروق-الجوهرية">الفروق الجوهرية</h2>
<table>
<thead>
<tr>
<th>الميزة</th>
<th><code>assert</code></th>
<th><code>expect</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الأسلوب</strong></td>
<td>تقليدي، أمري</td>
<td>BDD (التطوير المدفوع بالسلوك)</td>
</tr>
<tr>
<td><strong>التسلسل</strong></td>
<td>لا تسلسل</td>
<td>يدعم التسلسل</td>
</tr>
<tr>
<td><strong>الاستخدام</strong></td>
<td>يُستخدم في وحدة <code>assert</code> في Node.js، وChai</td>
<td>يُستخدم في Jest وVitest وMocha (وضع BDD)</td>
</tr>
<tr>
<td><strong>قابلية القراءة</strong></td>
<td>أقل تعبيرية، أكثر إطالة</td>
<td>صياغة أكثر قابلية للقراءة والتعبير</td>
</tr>
<tr>
<td><strong>الواجهة</strong></td>
<td>مصغّرة، تركز على تحققات صارمة</td>
<td>واجهة غنية بمطابقات مثل <code>.toBe()</code> و<code>.toEqual()</code> و<code>.toContain()</code></td>
</tr>
<tr>
<td><strong>المرونة</strong></td>
<td>مرونة وتخصيص محدودان</td>
<td>مرنة مع مطابقات مخصصة وتحققات مفصّلة</td>
</tr>
</tbody>
</table>
<h2 id="متى-تستخدم-assert-أو-expect">متى تستخدم <code>assert</code> أو <code>expect</code>؟</h2>
<ul>
<li>استخدم <strong><code>assert</code></strong> إن أردت <strong>مكتبة تحقق مصغّرة ومباشرة</strong> ولا تحتاج تعبيرية اختبارات أسلوب BDD.</li>
<li>استخدم <strong><code>expect</code></strong> إن كنت تفضل اختبارًا <strong>أكثر قابلية للقراءة بأسلوب BDD</strong> يتيح <strong>التسلسل والمطابقات المرنة</strong>. وهو شائع في أطر الاختبار الحديثة مثل Jest أو Vitest ويساعد في إنشاء اختبارات أكثر قابلية للقراءة البشرية.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-comment">// Using assert</span>
assert.<span class="hljs-title function_">strictEqual</span>(result, expected);

<span class="hljs-comment">// Using expect</span>
<span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(expected);
</code></pre>
<p>باختصار، يُستخدم كلاهما لكتابة التحققات، لكن <code>expect</code> أكثر مرونة وتعبيرية وأنسب للتطوير المدفوع بالسلوك، بينما <code>assert</code> أبسط وأكثر مباشرة.</p>
<p>لقد استخدمت كليهما في نقاط مختلفة من مسيرتي — وليس لدي تفضيل حقيقي. سنستخدم <code>expect</code> في هذه الدورة، لأنه <em>يبدو</em> أكثر شيوعًا في هذه اللحظة الزمنية.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:e,title:a,headings:o,html:l};export{s as book,n as chapter,t as chapterTitle,c as default,o as headings,l as html,e as slug,a as title};
