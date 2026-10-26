const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="spies",l="الجواسيس (Spies)",t=[{depth:2,id:"الخصائص-الرئيسية-للجواسيس",text:"الخصائص الرئيسية للجواسيس"},{depth:2,id:"متى-تستخدم-الجواسيس",text:"متى تستخدم الجواسيس"},{depth:2,id:"إنشاء-جاسوس-في-vitest",text:"إنشاء جاسوس في Vitest"},{depth:2,id:"التجسس-على-استدعاءات-الدوال-ووسائطها-وقيمها-المعادة",text:"التجسّس على استدعاءات الدوال ووسائطها وقيمها المُعادة"},{depth:2,id:"التحقق-من-عدد-الاستدعاءات-والوسائط-الممررة-وسياق-الاستدعاءات-باستخدام-الجواسيس",text:"التحقّق من عدد الاستدعاءات والوسائط الممرّرة وسياق الاستدعاءات باستخدام الجواسيس"},{depth:2,id:"توابع-expect",text:"توابع Expect"},{depth:2,id:"مثال-آخر-الرياضيات-الأساسية",text:"مثال آخر: الرياضيات الأساسية"}],p=`<p>الجاسوس نوع من <a href="https://stevekinney.com/courses/testing/test-doubles">البدائل الاختبارية</a> يُستخدم لمراقبة معلومات عن استدعاءات الدوال وتسجيلها دون تعديل سلوك الدالة الفعلي افتراضيًا. وتُستخدم الجواسيس لملاحظة كيفية استدعاء الدوال أثناء التنفيذ، بما يتيح لك التحقّق من تفاصيل مثل عدد مرات استدعاء الدالة، والوسائط الممرّرة إليها، وقيمها المُعادة. وخلافًا للبدائل أو البدائل المُحاكاة، لا تستبدل الجواسيس الدالة بسلوك محدّد مسبقًا إلا إذا ضُبطت صراحةً على ذلك.</p>
<p>تكون الجواسيس مفيدة بشكل خاص عندما تريد فحص التفاعلات داخل النظام قيد الاختبار مع السماح للدالة الحقيقية بالتنفيذ كالمعتاد.</p>
<h2 id="الخصائص-الرئيسية-للجواسيس">الخصائص الرئيسية للجواسيس</h2>
<ul>
<li><strong>تتبّع السلوك</strong>: تستطيع الجواسيس تتبّع ما إذا استُدعيت دالة، وكم مرة استُدعيت، وبأي وسائط.</li>
<li><strong>التحقّق</strong>: يمكنك استخدام الجواسيس للتحقّق من أن دوال معيّنة أُطلقت في الظروف المناسبة.</li>
<li><strong>غير تدخّلية</strong>: لا تعدّل الجواسيس سلوك الدالة الأصلي إلا إذا ضُبطت صراحةً على ذلك.</li>
</ul>
<h2 id="متى-تستخدم-الجواسيس">متى تستخدم الجواسيس</h2>
<ul>
<li>تريد التحقّق من عدد مرات استدعاء دالة وبأي وسائط.</li>
<li>الدالة التي تختبرها تتفاعل مع دوال خارجية أو داخلية، وتحتاج إلى مراقبة تلك التفاعلات.</li>
<li>تريد تأكيد ما إذا استُدعي رد نداء أو معالج أثناء عملية معيّنة.</li>
<li>تختبر دوالًا ليس من السهل عزلها أو تعديلها، لكنك ما زلت بحاجة إلى ملاحظة استخدامها.</li>
</ul>
<h2 id="إنشاء-جاسوس-في-vitest">إنشاء جاسوس في Vitest</h2>
<p>في Vitest، يمكنك إنشاء جواسيس باستخدام التابع <code>vi.spyOn()</code>، الذي يراقب دالة موجودة. وهو لا يغيّر السلوك الفعلي للدالة إلا إذا أمرته صراحةً بذلك.</p>
<p>إليك كيف تُنشئ جاسوسًا أساسيًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);
</code></pre>
<p>سيراقب هذا الجاسوس دالة <code>console.log</code> ويسجّل عدد مرات استدعائها، والوسائط الممرّرة إليها، وتفاصيل أخرى عن الاستدعاء.</p>
<h2 id="التجسس-على-استدعاءات-الدوال-ووسائطها-وقيمها-المعادة">التجسّس على استدعاءات الدوال ووسائطها وقيمها المُعادة</h2>
<p>لنمضِ عبر مثال نتجسّس فيه على دالة ونتحقّق من سلوكها. تأمّل دالة تسجّل رسالة خطأ عندما تفشل عملية بيع تذكرة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handleTicketSaleError</span>(<span class="hljs-params">errorMessage</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error: <span class="hljs-subst">\${errorMessage}</span>\`</span>);
}
</code></pre>
<p>في اختبارنا، يمكننا التجسّس على <code>console.error</code> لضمان استدعائها بالوسيط الصحيح:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;handleTicketSaleError&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;logs an error message when ticket sale fails&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Spy on console.error</span>
    <span class="hljs-keyword">const</span> errorSpy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;error&#x27;</span>);

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-title function_">handleTicketSaleError</span>(<span class="hljs-string">&#x27;Payment declined&#x27;</span>);

    <span class="hljs-comment">// Assert that the spy tracked the correct call</span>
    <span class="hljs-title function_">expect</span>(errorSpy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Error: Payment declined&#x27;</span>);

    <span class="hljs-comment">// Clean up: Restore the original function</span>
    errorSpy.<span class="hljs-title function_">mockRestore</span>();
  });
});
</code></pre>
<p>في هذا المثال، يراقب <code>errorSpy</code> دالة <code>console.error</code> ويتحقّق من تسجيل رسالة الخطأ الصحيحة عند استدعاء <code>handleTicketSaleError</code>.</p>
<h2 id="التحقق-من-عدد-الاستدعاءات-والوسائط-الممررة-وسياق-الاستدعاءات-باستخدام-الجواسيس">التحقّق من عدد الاستدعاءات والوسائط الممرّرة وسياق الاستدعاءات باستخدام الجواسيس</h2>
<p>من أهم مزايا الجواسيس قدرتها على تقديم معلومات مفصّلة عن كيفية استدعاء الدوال. يمكنك التحقّق من:</p>
<ul>
<li><strong>عدد مرات استدعاء الدالة</strong>.</li>
<li><strong>الوسائط الممرّرة إلى الدالة</strong>.</li>
<li><strong>القيمة المُعادة من الدالة</strong>.</li>
<li><strong>السياق (قيمة <code>this</code>)</strong> الذي استُدعيت فيه الدالة.</li>
</ul>
<p>إليك مثالًا يوضّح كيفية فحص هذه الخصائص:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processOrder</span>(<span class="hljs-params">orderId</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Processing order: <span class="hljs-subst">\${orderId}</span>\`</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;processOrder&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should log the correct order ID&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Spy on console.log</span>
    <span class="hljs-keyword">const</span> logSpy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-title function_">processOrder</span>(<span class="hljs-string">&#x27;12345&#x27;</span>);

    <span class="hljs-comment">// Verify the spy was called exactly once</span>
    <span class="hljs-title function_">expect</span>(logSpy).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);

    <span class="hljs-comment">// Verify the spy was called with the correct argument</span>
    <span class="hljs-title function_">expect</span>(logSpy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Processing order: 12345&#x27;</span>);

    <span class="hljs-comment">// Clean up: Restore the original function</span>
    logSpy.<span class="hljs-title function_">mockRestore</span>();
  });
});
</code></pre>
<p>في هذا الاختبار، نستخدم <code>logSpy</code> للتحقّق من:</p>
<ol>
<li>أن الدالة استُدعيت مرة واحدة (<code>toHaveBeenCalledTimes</code>).</li>
<li>أن الدالة استُدعيت بالوسيط <code>'Processing order: 12345'</code> (<code>toHaveBeenCalledWith</code>).</li>
</ol>
<p>تمنحك الجواسيس تحكّمًا قويًا في اختبار التفاعلات، فتتيح لك التحقّق من أن شيفرتك تُجري الاستدعاءات الصحيحة وتمرّر الوسائط الصحيحة دون تغيير السلوك الحقيقي للدوال قيد الاختبار.</p>
<h2 id="توابع-expect">توابع Expect</h2>
<ul>
<li><code>toHaveBeenCalled()</code>: ينجح إذا استُدعي الجاسوس في أي وقت.</li>
<li><code>toHaveBeenCalledTimes(times)</code>: ينجح إذا استُدعي الجاسوس العدد الصحيح من المرات.</li>
<li><code>toHaveBeenCalledWith(…args)</code>: ينجح إذا استُدعيت الدالة <em>في أي وقت</em> بالوسائط التي تحدّدها.</li>
<li><code>toHaveBeenLastCalledWith</code>: ينجح إذا استُدعيت الدالة في أحدث مرة بالوسائط التي تحدّدها.</li>
<li><code>toHaveBeenNthCalledWith(time, …args)</code>: ينجح إذا استُدعيت الدالة في المرة التي تحدّدها بالوسائط التي تحدّدها.</li>
<li><code>toHaveReturned()</code>: ينجح إذا أعادت الدالة (أي أنها لم ترمِ خطأً).</li>
<li><code>toHaveReturnedTimes(times)</code>: ينجح إذا أعادت الدالة بعدد المرات الذي تحدّده.</li>
<li><code>toHaveReturnedWith(value)</code>: ينجح إذا أعادت الدالة بنجاح في أي وقت القيمة التي تحدّدها.</li>
<li><code>toHaveLastReturnedWith(value)</code>: ينجح إذا أعادت الدالة في أحدث مرة القيمة التي تحدّدها.</li>
<li><code>toHaveNthReturnedWith(time, value)</code>: ينجح إذا أعادت الدالة في المرة التي تحدّدها القيمة التي تحدّدها.</li>
</ul>
<h2 id="مثال-آخر-الرياضيات-الأساسية">مثال آخر: الرياضيات الأساسية</h2>
<pre><code class="language-javascript"><span class="hljs-comment">// math.test.js</span>
<span class="hljs-keyword">import</span> { test, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> math <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./arithmetic&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;calls add with correct arguments&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> addSpy = vi.<span class="hljs-title function_">spyOn</span>(math, <span class="hljs-string">&#x27;add&#x27;</span>);

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> result = math.<span class="hljs-title function_">add</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(addSpy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);

  <span class="hljs-comment">// Cleanup</span>
  addSpy.<span class="hljs-title function_">mockRestore</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><strong><code>vi.spyOn(object, methodName)</code></strong>: يُنشئ جاسوسًا على التابع المحدّد.</li>
<li>يتيح لنا الجاسوس التحقّق من استدعاء <code>add</code> بالوسائط الصحيحة.</li>
<li><strong>التنظيف</strong>: أعِد التابع الأصلي لتجنّب الآثار الجانبية.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,p as html,e as slug,l as title};
