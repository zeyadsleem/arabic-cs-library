const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="stubs",e="البدائل (Stubs)",l=[{depth:2,id:"متى-تستخدم-البدائل",text:"متى تستخدم البدائل"},{depth:2,id:"إنشاء-البدائل-مع-vitest",text:"إنشاء البدائل مع Vitest"},{depth:2,id:"مثال-استبدال-الاعتماديات-الخارجية-مثل-استدعاءات-api-والتفاعل-مع-نظام-الملفات",text:"مثال: استبدال الاعتماديات الخارجية (مثل استدعاءات API والتفاعل مع نظام الملفات)"},{depth:2,id:"التأكيد-على-سلوك-الشيفرة-باستخدام-البدائل",text:"التأكيد على سلوك الشيفرة باستخدام البدائل"},{depth:2,id:"البدائل",text:"البدائل"},{depth:3,id:"الخصائص-الرئيسية-للبدائل",text:"الخصائص الرئيسية للبدائل"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"استخدام-البدائل-في-vitest",text:"استخدام البدائل في Vitest"}],p=`<p>البديل (stub) نوع من البدائل الاختبارية يُستخدم لاستبدال دالة حقيقية بنسخة مبسّطة ومحكومة لأغراض الاختبار. الغرض الأساسي من البديل هو محاكاة سلوك الشيفرة الحقيقية بتوفير استجابات محدّدة مسبقًا. ولا تتتبّع البدائل عدد مرات استدعاء الدالة أو الوسائط التي استُدعيت بها—بل تستبدل التنفيذ الحقيقي فقط لضمان أن الاختبارات تعمل في بيئة متوقّعة ومعزولة.</p>
<p>تكون البدائل مفيدة عندما تحتاج إلى عزل وحدة من الشيفرة والتحكّم في سلوك اعتمادياتها دون القلق بشأن أنظمة خارجية مثل واجهات API أو قواعد البيانات.</p>
<h2 id="متى-تستخدم-البدائل">متى تستخدم البدائل</h2>
<p>استخدم البدائل عندما:</p>
<ul>
<li>تريد استبدال اعتمادية لعزل الدالة قيد الاختبار.</li>
<li>تتضمّن الاعتمادية الحقيقية آثارًا جانبية، مثل عمليات الإدخال/الإخراج أو استدعاءات الشبكة أو استعلامات قاعدة البيانات، ولا تريد تشغيلها أثناء الاختبار.</li>
<li>تحتاج إلى محاكاة سلوكيات مختلفة من الأنظمة الخارجية (مثل إعادة بيانات محدّدة أو إطلاق خطأ) لتغطية حالات اختبار متنوّعة.</li>
<li>تريد تسريع الاختبارات بإزالة العمليات المستهلكة للوقت الحقيقي، مثل طلبات الشبكة أو إدخال/إخراج الملفات.</li>
</ul>
<p>البدائل هي الأنسب للحالات التي لا تحتاج فيها إلى التحقّق من عدد مرات استدعاء دالة أو كيفية استدعائها، بل تريد ببساطة التحكّم فيما تُعيده.</p>
<h2 id="إنشاء-البدائل-مع-vitest">إنشاء البدائل مع Vitest</h2>
<p>في Vitest، يمكنك إنشاء البدائل بسهولة باستخدام التابع <code>vi.fn()</code>. يتيح لك هذا التابع استبدال التنفيذ الفعلي لاعتمادية وإعادة قيم محدّدة عند استدعاء الدالة البديلة.</p>
<p>إليك كيف تُنشئ بديلًا بسيطًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> fetchStub = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">band</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span> }),
);
</code></pre>
<p>سيُعيد <code>fetchStub</code> دائمًا وعدًا مُحلًّا ببيانات محدّدة مسبقًا، محاكيًا استجابة API. ويمكن استخدام هذا لاستبدال طلب شبكة فعلي في اختبار.</p>
<h2 id="مثال-استبدال-الاعتماديات-الخارجية-مثل-استدعاءات-api-والتفاعل-مع-نظام-الملفات">مثال: استبدال الاعتماديات الخارجية (مثل استدعاءات API والتفاعل مع نظام الملفات)</h2>
<p>لنمضِ عبر مثال من العالم الحقيقي. تخيّل أنك تختبر دالة تجلب تفاصيل حفلات موسيقية لفرقة عبر استدعاء API. وتريد تجنّب إجراء استدعاء API الفعلي في اختبارك، وأن تتحكّم في السلوك باستخدام بديل بدلًا من ذلك.</p>
<p>إليك الدالة قيد الاختبار:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-params">band</span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/concerts?band=<span class="hljs-subst">\${band}</span>\`</span>);
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">return</span> data;
}
</code></pre>
<p>الآن، في الاختبار، يمكننا إنشاء بديل لدالة <code>fetch</code> لمحاكاة استجابة API دون إجراء طلب شبكة حقيقي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { getConcertDetails } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./concerts&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;getConcertDetails&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns concert details from the API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Stub the fetch function to simulate an API response</span>
    <span class="hljs-keyword">const</span> fetchStub = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
      <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({
        <span class="hljs-attr">json</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">band</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span> }),
      }),
    );

    <span class="hljs-comment">// Replace the global fetch function with our stub</span>
    <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = fetchStub;

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Assert that the stubbed API returned the correct data</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">band</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span> });

    <span class="hljs-comment">// Clean up: Restore the original fetch function</span>
    fetchStub.<span class="hljs-title function_">mockRestore</span>();
  });
});
</code></pre>
<p>في هذا الاختبار، نستبدل دالة <code>fetch</code> الحقيقية ببديل يحاكي استدعاء API ويُعيد استجابة JSON محدّدة مسبقًا. وهذا يتيح لنا اختبار دالة <code>getConcertDetails</code> دون إجراء طلب شبكة حقيقي.</p>
<h2 id="التأكيد-على-سلوك-الشيفرة-باستخدام-البدائل">التأكيد على سلوك الشيفرة باستخدام البدائل</h2>
<p>عند استخدام البدائل، تريد عادةً أن تؤكّد على أن الدالة التي تختبرها تتصرّف بشكل صحيح في ضوء الاستجابات المحدّدة مسبقًا. في المثال أعلاه، نتحقّق من أن <code>getConcertDetails</code> تُعيد معلومات الحفل الصحيحة عندما يوفّر <code>fetchStub</code> بيانات API المحاكاة.</p>
<p>يوفّر Vitest أيضًا توابع للتحقّق من عدد مرات استدعاء البديل، رغم أن هذا ليس الاستخدام الأساسي للبديل. ومع ذلك، يمكنك التأكيد على أن الدالة البديلة استُدعيت إن احتجت:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">expect</span>(fetchStub).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);
</code></pre>
<p>هذا يضمن أن <code>fetchStub</code> استُدعي مرة واحدة بالضبط، مما يساعد في التحقّق من أن دالة <code>getConcertDetails</code> أطلقت سلوك طلب الشبكة المتوقّع.</p>
<p>باستخدام البدائل، يمكنك محاكاة استجابات متنوّعة (مثل أخطاء API أو المهل المنتهية أو بيانات مختلفة) والتأكيد على أن شيفرتك تتفاعل وفقًا لذلك، كل ذلك دون الاعتماد على أنظمة خارجية حقيقية.</p>
<h2 id="البدائل">البدائل</h2>
<p><em>البديل</em> هو بديل اختباري يوفّر استجابات محدّدة سلفًا لاستدعاءات الدوال، وعادةً لاستبدال اعتمادية حقيقية بسلوك محكوم. ولا تتتبّع البدائل كيفية استدعاء الدالة؛ بل تعمل ببساطة كبدائل تُعيد قيمًا ثابتة.</p>
<h3 id="الخصائص-الرئيسية-للبدائل">الخصائص الرئيسية للبدائل</h3>
<ul>
<li><strong>السلوك المحدّد مسبقًا</strong>: تُستخدم البدائل لتعريف كيفية تصرّف دالة في اختبار. يمكنك التحكّم في القيمة المُعادة أو الإجراءات المتّخذة عند استدعاء الدالة البديلة.</li>
<li><strong>العزل</strong>: تساعد البدائل في عزل الدالة قيد الاختبار عن التنفيذ الفعلي لاعتمادياتها.</li>
<li><strong>البساطة</strong>: البدائل استبدالات بسيطة ولا تتتبّع أو تسجّل عدد مرات استدعائها أو الوسائط التي استُدعيت بها.</li>
</ul>
<h3 id="مثال">مثال</h3>
<p>تخيّل دالة تجلب بيانات حفل من API. يمكنك إنشاء بديل لمحاكاة إعادة API للبيانات دون إجراء استدعاء شبكة حقيقي.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Stub the fetch function to always return fixed data</span>
<span class="hljs-keyword">const</span> fetchStub = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">band</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span> }),
);

<span class="hljs-comment">// Now use this stubbed version in your test instead of making a real API call.</span>
</code></pre>
<p>في هذا المثال، يضمن <code>fetchStub</code> أن الاختبار يعمل ببيانات متّسقة، حتى دون إجراء طلب الشبكة الفعلي.</p>
<h3 id="استخدام-البدائل-في-vitest">استخدام البدائل في Vitest</h3>
<p><strong>البديل</strong> شبيه بالبديل المُحاكى لكنه يركّز على توفير استجابات محدّدة مسبقًا بدلًا من تتبّع التفاعلات.</p>
<p><strong>مثال: استبدال دالة</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// notifier.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">notify</span>(<span class="hljs-params">message</span>) {
  <span class="hljs-comment">// Sends a notification (e.g., email, SMS)</span>
}
</code></pre>
<p><strong>الاختبار:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// notifier.test.js</span>
<span class="hljs-keyword">import</span> { test, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { notify } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./notifier&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;sends a notification&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> notifyStub = vi.<span class="hljs-title function_">fn</span>();

  <span class="hljs-comment">// Replace the real notify function with the stub</span>
  <span class="hljs-title function_">notifyStub</span>(<span class="hljs-string">&#x27;Test message&#x27;</span>);

  <span class="hljs-comment">// Act</span>
  <span class="hljs-comment">// (No action needed since we&#x27;re stubbing the function)</span>

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(notifyStub).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Test message&#x27;</span>);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>البديل <code>notifyStub</code> يستبدل دالة <code>notify</code> الحقيقية.</li>
<li>التركيز على ضمان استدعاء <code>notify</code> بالوسائط الصحيحة.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
