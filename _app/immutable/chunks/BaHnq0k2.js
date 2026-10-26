const s="kinney",n="testing",a="مدخل إلى الاختبارات",p="vitest-reporters",e="المُبلِّغون في Vitest",t=[{depth:3,id:"المبلغ-الافتراضي",text:"المُبلِّغ الافتراضي"},{depth:3,id:"المبلغون-المدمجون",text:"المُبلِّغون المدمجون"},{depth:3,id:"دمج-المبلغين",text:"دمج المُبلِّغين"},{depth:2,id:"المبلغون-المخصصون",text:"المُبلِّغون المخصصون"},{depth:2,id:"لماذا-تهم-المبلغون-المخصصون",text:"لماذا تهم المُبلِّغون المخصصون"},{depth:2,id:"إعداد-مبلغ-مخصص",text:"إعداد مُبلِّغ مخصص"},{depth:2,id:"توصيله-بـ-vitest",text:"توصيله بـ Vitest"},{depth:2,id:"تشغيل-اختباراتك-مع-المبلغ-المخصص",text:"تشغيل اختباراتك مع المُبلِّغ المخصص"},{depth:2,id:"إلى-أين-تأخذ-هذا-بعد-ذلك",text:"إلى أين تأخذ هذا بعد ذلك"}],l=`<p>المُبلِّغون (reporters) هم ما تراه في طرفيتك عند تشغيل اختباراتك. اتضح أن هناك بعض الخيارات هنا. لطالما استخدمت المُبلِّغ المدمج الافتراضي تقريبًا دائمًا. لكن ربما تريد شيئًا مختلفًا. أو ربما <em>تحتاج</em> إلى صيغة مختلفة لبعض الأدوات الأخرى لتستوعبها أو ما شابه.</p>
<h3 id="المبلغ-الافتراضي">المُبلِّغ الافتراضي</h3>
<p>افتراضيًا، يعتمد Vitest صيغة بسيطة جدًا في طرفيتك. إنها أساسًا <em>إحساس غرفة الأخبار الكلاسيكي</em>: تحصل على قائمة بكل مجموعات الاختبارات، مع ما نجح منها وما فشل.</p>
<p>لنبسّط هذا بتهيئة وتشغيل سريعين:</p>
<h4>ثبّت Vitest (إن لم تكن قد فعلت)</h4>
<pre><code class="language-bash">npm install vitest --save-dev
</code></pre>
<h4>أنشئ ملف اختبار بسيطًا (<code>example.test.js</code>)</h4>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;math works&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;this one will fail&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-number">2</span> + <span class="hljs-number">2</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<h4>شغّل اختباراتك</h4>
<pre><code class="language-bash">npx vitest
</code></pre>
<p>إليك المخرجات من طرفيتك:</p>
<pre><code class="language-typescript"> <span class="hljs-variable constant_">PASS</span>  example.<span class="hljs-property">test</span>.<span class="hljs-property">js</span> &gt; math works
 <span class="hljs-variable constant_">FAIL</span>  example.<span class="hljs-property">test</span>.<span class="hljs-property">js</span> &gt; <span class="hljs-variable language_">this</span> one will fail
     <span class="hljs-title function_">expect</span>(received).<span class="hljs-title function_">toBe</span>(expected) <span class="hljs-comment">// Object.is equality</span>

     <span class="hljs-title class_">Expected</span>: <span class="hljs-number">5</span>
     <span class="hljs-title class_">Received</span>: <span class="hljs-number">4</span>

   ● example.<span class="hljs-property">test</span>.<span class="hljs-property">js</span>:<span class="hljs-number">6</span>:<span class="hljs-number">20</span>

<span class="hljs-title class_">Test</span> <span class="hljs-title class_">Files</span>  <span class="hljs-number">1</span> failed | <span class="hljs-number">1</span> passed
</code></pre>
<p>بسيط وفي صلب الموضوع، أليس كذلك؟ لكن أحيانًا نريد <strong>أكثر</strong> أو <strong>أقل</strong>.</p>
<h3 id="المبلغون-المدمجون">المُبلِّغون المدمجون</h3>
<p>يأتي Vitest مع مجموعة من المُبلِّغين المدمجين مثل «مذيعي الأخبار» المعتادين، ولكل منهم أسلوب مختلف في الإبلاغ عن حالة الاختبار. إليك بعض أكثرها استخدامًا:</p>
<h4>مُبلِّغ النقاط</h4>
<p>مُبلِّغ <strong>dot</strong> لمن يرون أن وظيفة الطرفية الأساسية هي أن تبقى هادئة وغير مطوّلة قدر الإمكان. يعطيك نقطة لكل اختبار، والفشل يعني أن النقطة تتحول إلى الحمراء. فكّر فيه كالمقاربة الأقلية في الاختبار:</p>
<pre><code class="language-bash">npx vitest --reporter dot
</code></pre>
<p>وإليك ما سيخرجه:</p>
<pre><code class="language-typescript">  ..<span class="hljs-property">F</span>
</code></pre>
<p>الترجمة: نجح اختباران (.) وفشل واحد (F). قصير ولطيف وجاهز ليفكّ شيفرته دماغك.</p>
<h4>المُبلِّغ المطوّل</h4>
<p>ربما أنت من نوع <em>أعطني كل شيء</em>. إن أردت أن تشعر مخرجات اختبارك كسجل كامل لكل صغيرة وجليلة تحدث، فمُبلِّغ <strong>verbose</strong> هو خيارك.</p>
<pre><code class="language-bash">npx vitest --reporter verbose
</code></pre>
<p>بهذا ستحصل على سرد تفصيلي خطوة بخطوة يشمل مجموعات الاختبارات والاختبارات الفردية والنتائج المفصّلة. المُبلِّغ المطوّل كالمعلّق الرياضي الذي يصف المباراة كلها بتفصيل كامل.</p>
<h4>مُبلِّغ JSON</h4>
<p>أحيانًا لا نهتم حتى بالصيغ المقروءة للبشر. من يحتاجها، أليس كذلك؟ ربما تخطّط لتغذية نتائج اختبارك في لوحة معلومات خارجية أو خط أنابيب CI/CD كجزء من عملية آلية. سيخرج مُبلِّغ <strong>json</strong> نتائج اختبارك في كائن JSON:</p>
<pre><code class="language-bash">npx vitest --reporter json
</code></pre>
<p>إليك نسخة مبسّطة من المخرجات:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;numFailedTests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;numPassedTests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;testResults&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;math works&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;passed&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;this one will fail&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;failed&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h4>مُبلِّغ Tap</h4>
<p>للمهندسين القدامى أو الفرق التي تستخدم أنظمة CI معيّنة، صيغة <strong>tap</strong> (بروتوكول Test Anything Protocol) أداة مجرَّبة عبر الزمن ستعرفها. إنها تُخرج النتائج بصيغة مصمّمة لتعالجها أنظمة أخرى:</p>
<pre><code class="language-bash">npx vitest --reporter tap
</code></pre>
<p>ستحصل على مخرجات كهذه:</p>
<pre><code class="language-typescript"><span class="hljs-variable constant_">TAP</span> version <span class="hljs-number">13</span>
<span class="hljs-number">1.</span><span class="hljs-number">.2</span>
ok <span class="hljs-number">1</span> math works
not ok <span class="hljs-number">2</span> <span class="hljs-variable language_">this</span> one will fail
</code></pre>
<p>نعم، بهذه البساطة والمباشرة. الأمر كله للآلات يا صاحبي.</p>
<h3 id="دمج-المبلغين">دمج المُبلِّغين</h3>
<p>ماذا لو أردت أفضل ما في العالمين؟ لنفترض أنك تريد مُبلِّغ <strong>dot</strong> لمسح سطر الأوامر، ومُبلِّغ <strong>json</strong> لإرسال النتائج إلى CI؟</p>
<p>خبر سار: يمكنك دمجهما معًا تمامًا، كالكاتشب والخردل. مرّر كليهما فقط:</p>
<pre><code class="language-bash">npx vitest --reporter dot --reporter json
</code></pre>
<p>بوم. الآن لديك نقاط في طرفيتك وبيانات JSON تطير حيثما تريدها!</p>
<h2 id="المبلغون-المخصصون">المُبلِّغون المخصصون</h2>
<p>اختباراتك تعمل الآن مع Vitest، وكل شيء يبدو لامعًا… إلا أن المخرجات الافتراضية ربما لا تحكّ حكة المطوّر تلك، أليس كذلك؟ ربما لديك شخص مهم يراقب خط أنابيب CI لديك ويقول: «لا بأس، لكني أتمنى لو بدا <em>أجمل</em>».</p>
<p>أو ربما تحدّق في طرفيتك وتفكّر: «هل يمكن أن تحمل معلومات أكثر — <em>أو</em> أن تكرمني بمعلومات <em>أقل</em>؟» حان وقت رفع الأكمام وإعداد <strong>مُبلِّغ مخصص</strong>.</p>
<p>يتيح لك Vitest إنشاء مُبلِّغين مخصصين للتحكم في ما يُخرجه سطر أوامرك. لنمضِ في صناعة مُبلِّغ مخصص يجعل اختباراتك تشعر بأنها في موطنها، سواء كان ذلك مبهرجًا أو أقليًا.</p>
<h2 id="لماذا-تهم-المبلغون-المخصصون">لماذا تهم المُبلِّغون المخصصون</h2>
<p>تخيّل هذا: خط أنابيب CI لديك ينكسر <em>أحيانًا</em> (أوف)، وتحتاج إلى الوصول إلى السبب الجذري في أسرع وقت. مخرجات المُبلِّغ الافتراضي مقبولة، لكن ماذا لو أمكنك منحها <em>قليلًا</em> من السياق الإضافي؟ تتيح لك المُبلِّغون المخصصون إبراز معلومات محددة مفيدة في حالتك — سواء كان ذلك سجلات أنظف أو مقاييس محددة أو لمسة إبداعية تنعش تقارير اختبارك.</p>
<p>بعض حالات الاستخدام الافتراضية الأخرى:</p>
<ul>
<li>جعل الرؤساء والمديرين يشعرون <em>بشيء</em> عندما يرون نتائج الاختبار.</li>
<li>تلبية متطلبات خاصة لأسباب تدقيق أو امتثال.</li>
<li>التحكم في مستوى الضجيج — أحيانًا تريد التفاصيل فقط، لا الاستعراض.</li>
</ul>
<h2 id="إعداد-مبلغ-مخصص">إعداد مُبلِّغ مخصص</h2>
<p>عظيم، «لماذا» واضحة الآن. لنبدأ العمل ونكتب واحدًا.</p>
<p>يمنحك Vitest خُطّافًا إلى مشغّل الاختبارات عبر <strong>Reporter API</strong>. تتضمن البنية الأساسية إنشاء صنف بتابع أو توابع تقابل أحداث اختبار معيّنة — مثل بدء اختبار أو انتهائه أو (أعاننا الله) فشله.</p>
<p>لنصنع مُبلِّغًا مخصصًا بسيطًا يقول «مرحبًا يا عالم الاختبار» كلما بدأ اختبار.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// hello-world-reporter.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorldReporter</span> {
  <span class="hljs-title function_">onTestStart</span>(<span class="hljs-params">test</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Hello from <span class="hljs-subst">\${test.name}</span>\`</span>);
  }

  <span class="hljs-comment">// Optional: here&#x27;s where all your reporting dreams can come true</span>
  <span class="hljs-title function_">onTestPass</span>(<span class="hljs-params">test</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`🎉 Hooray! Test passed: <span class="hljs-subst">\${test.name}</span>\`</span>);
  }

  <span class="hljs-title function_">onTestFail</span>(<span class="hljs-params">test</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`💥 Oh no! Test failed: <span class="hljs-subst">\${test.name}</span>\`</span>);
  }
}
</code></pre>
<h2 id="توصيله-بـ-vitest">توصيله بـ Vitest</h2>
<p>حسنًا، صار <em>HelloWorldReporter</em> جاهزًا للاستخدام. الآن نحتاج فقط إلى إخبار Vitest باستخدامه.</p>
<p>إليك كيفية توصيله في ملف <code>vitest.config.js</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">HelloWorldReporter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./hello-world-reporter&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">reporters</span>: [<span class="hljs-keyword">new</span> <span class="hljs-title class_">HelloWorldReporter</span>()],
  },
});
</code></pre>
<p>في هذه الحالة، تتوقع <code>reporters</code> مصفوفة. يمكنك إضافة عدة مُبلِّغين لدمج المخصصين مع المدمجين في Vitest (مثل <code>['default', new HelloWorldReporter()]</code>). الأمر أشبه ببناء فريق أبطال خارقين لمعالجة مخرجات الاختبار.</p>
<h2 id="تشغيل-اختباراتك-مع-المبلغ-المخصص">تشغيل اختباراتك مع المُبلِّغ المخصص</h2>
<p>بوم! هذا كل شيء. الآن، عند تشغيل <code>vitest</code>، ستبدأ برؤية رسائلك المخصصة تظهر.</p>
<pre><code class="language-bash">$ vitest

 Hello from Sample Test
 🎉 Hooray! Test passed: Sample Test
</code></pre>
<p>إن فشل اختبار؟ توقّع بعض الألعاب النارية:</p>
<pre><code class="language-bash"> 💥 Oh no! Test failed: Crazy Edge Case
</code></pre>
<h2 id="إلى-أين-تأخذ-هذا-بعد-ذلك">إلى أين تأخذ هذا بعد ذلك</h2>
<p>تتنوّع المُبلِّغون المخصصون <em>تنوّعًا هائلًا</em> حسب ما تحاول تحقيقه. ربما تريد توليد ملف بإحصاءات ملخّصة، أو إخراج تقرير أكثر إحكامًا لقراءة أسرع، أو بناء لوحة معلومات بصرية من النتائج.</p>
<p>يمكنك المضي ببساطة أو تعقيد ما تحتاج. بل يمكنك حتى تمرير نتائجك إلى webhook في <code>Slack</code> أو بثّها بشيفرة مورس عبر مكبّرات صوت المكتب (لا أنصح بذلك، لكن <em>يا</em>، إنه عالمك).</p>
<p>أهم الأشياء التي يمكنك الارتباط بها:</p>
<ul>
<li><code>onTestStart(test)</code> – لحظة بدء الاختبار</li>
<li><code>onTestPass(test)</code> – عندما يمرّ اختبار بسلام</li>
<li><code>onTestFail(test)</code> – عندما يرتطم اختبارك بـ<em>جبل الفشل الجليدي</em></li>
<li><code>onRunComplete(testResults)</code> – عندما ينتهي كل شيء ويُطوى</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,p as slug,e as title};
