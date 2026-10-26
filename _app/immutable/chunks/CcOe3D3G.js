const s="kinney",n="testing",e="مدخل إلى الاختبارات",t="debugging-vitest-tests",a="تنقيح أخطاء اختبارات Vitest",p=[{depth:2,id:"رسائل-الخطأ-في-vitest-أول-دليل-لديك",text:"رسائل الخطأ في Vitest: أول دليل لديك"},{depth:2,id:"تشغيل-اختبار-واحد-فقط",text:"تشغيل اختبار واحد فقط"},{depth:2,id:"استخدام-consolelog",text:"استخدام console.log"},{depth:2,id:"استخدام-وضع-inspect-في-vitest-للتنقيح-في-chrome-devtools",text:"استخدام وضع inspect في Vitest للتنقيح في Chrome DevTools"}],l=`<p>كتبت للتوّ أفضل شيفرة في حياتك، ثم تنفّذ <code>npm run test</code>، وإذا بشيء معطوب. لكن هنا تبدأ المتعة الحقيقية: <em>تنقيح الأخطاء</em>. أجل، إن لم يكن تنقيح شيفرتك كافيًا، فها أنت تُنقّح اختباراتك أيضًا.</p>
<p>وكما في كل تنقيح أخطاء، فهي مزيج من عمل المحقّق والحيرة التي وافقنا جميعًا على خوضها في لحظة ما بعد اختيار هذا المسار المهني مباشرة. لا تقلق، مع ذلك. سنستعرض الأدوات الأساسية التي يقدّمها Vitest لتنقيح الأخطاء، وأعدك بأنها ليست مخيفة كمعرفة سبب عدم اصطفاف شبكة CSS لديك.</p>
<h2 id="رسائل-الخطأ-في-vitest-أول-دليل-لديك">رسائل الخطأ في Vitest: أول دليل لديك</h2>
<p>قبل أن نغوص في أدوات التنقيح الفاخرة، لنتحدث عن قراءة رسائل الخطأ في Vitest. قد يبدو ذلك بديهيًا، لكنه مهم جدًا. تُشغّل الاختبار فيفشل. وVitest <em>بارع</em> حقًا في إخبارك <em>بما</em> حدث خطأ، وفي أي سطر، وغالبًا بالسبب أيضًا. لذا عندما ترى كلمة «FAIL» الحمراء، تمهّل واقرأ أثر المكدّس بعناية.</p>
<p>لنفترض أن لديك هذا الاختبار الفاشل:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { addNumbers } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./addNumbers&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds two numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">addNumbers</span>(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<p>يخبرك Vitest بالضبط بمكان الخطأ:</p>
<pre><code class="language-typescript"><span class="hljs-variable constant_">FAIL</span>  src/addNumbers.<span class="hljs-property">test</span>.<span class="hljs-property">js</span> &gt; adds two numbers
      <span class="hljs-title class_">Expected</span>: <span class="hljs-number">5</span>
      <span class="hljs-title class_">Received</span>: <span class="hljs-number">4</span>
</code></pre>
<p>رائع. الحساب أخطأ. أحيانًا تفشل الاختبارات لأسباب بسيطة: خطأ مطبعي، أو وسائط خاطئة، أو دالة تتصرف بشكل سيئ. أصلح التنفيذ وامضِ قدمًا.</p>
<p>لكن في أحيان أخرى، تحتاج إلى رفع مستوى لعبة التنقيح لديك.</p>
<h2 id="تشغيل-اختبار-واحد-فقط">تشغيل اختبار واحد فقط</h2>
<p>عندما تكون لديك مشكلة عويصة، ولنقل 135 اختبارًا في انتظار التنفيذ، فلا سبب على الإطلاق لتشغيل كل شيء. هذه فوضى محضة. ركّز على اختبار <strong>واحد</strong> في كل مرة. وVitest هنا لإنقاذك باستخدام <code>.only</code>.</p>
<pre><code class="language-javascript">test.<span class="hljs-title function_">only</span>(<span class="hljs-string">&#x27;adds two numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">addNumbers</span>(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<p>هذا كل شيء: يشغّل Vitest ذلك الاختبار الوحيد فقط. الآن ينصرف <em>كل</em> انتباهك إلى المشتبه به. ضيّق النطاق ونقّح الأخطاء أسرع.</p>
<h2 id="استخدام-consolelog">استخدام <code>console.log</code></h2>
<p>حسنًا، إن أردنا الصدق، فمعظم تنقيح الأخطاء ليس إلا تزيينًا للمكان بـ <code>console.log</code>. أحيانًا تكون أسرع طريقة لمعرفة ما يجري هي رشّ <em>بضعة <code>console.log</code> في شيفرتك</em>. وإن كنت تضيف مليون عبارة تسجيل إلى ملفات اختبارك الفعلية، فلا حكم عليك، فكلنا نفعل ذلك.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds two numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">addNumbers</span>(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;The result is:&#x27;</span>, result);
  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<p>يمنحك هذا التسجيل السريع إحساسًا فوريًا بما يحدث داخل دوالك. أضف إلى ذلك <strong>وضع المراقبة</strong>، وستصلح الأخطاء في لمح البصر.</p>
<h2 id="استخدام-وضع-inspect-في-vitest-للتنقيح-في-chrome-devtools">استخدام وضع <code>inspect</code> في Vitest للتنقيح في Chrome DevTools</h2>
<p>إليك الحيلة الفاخرة التي يحبها الجميع. لدى Vitest <strong>وضع inspection</strong> يتيح لك التنقيح باستخدام DevTools في Chrome إن لم يكن <code>console.log</code> كافيًا. تمامًا كما تفعل عندما تُحدث واجهتك الأمامية جلبة كبيرة في الإنتاج. يمكنك حتى إضافة نقاط توقف والتقدّم خطوة بخطوة عبر اختباراتك.</p>
<p>لبدء وضع inspection:</p>
<pre><code class="language-bash">npx vitest --inspect
</code></pre>
<p>سيطبع هذا رابطًا مثل:</p>
<pre><code class="language-typescript"><span class="hljs-title class_">Debugger</span> listening on <span class="hljs-attr">ws</span>:<span class="hljs-comment">//127.0.0.1:9229/xxxxx</span>
</code></pre>
<p>الصق ذلك في Chrome، وافتح DevTools (<code>Cmd+Opt+I</code> أو F12)، والآن يمكنك تعيين نقاط التوقف، وتتبّع المتغيّرات، وعيش حياة التنقيح بأناقة بصفة عامة. لا مزيد من التظاهر بأنك تجاوزت <code>console.log</code>!</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:p,html:l};export{s as book,n as chapter,e as chapterTitle,c as default,p as headings,l as html,t as slug,a as title};
