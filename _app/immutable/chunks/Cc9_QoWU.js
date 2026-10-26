const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="the-basics",l="كتابة اختباراتك الأولى",p=[{depth:2,id:"إضافة-الاختبارات",text:"إضافة الاختبارات"},{depth:2,id:"قراءات-ذات-صلة",text:"قراءات ذات صلة"}],e=`<blockquote>
<p><strong>مستودع الشيفرة النموذجية</strong></p>
<p>إن لم تكن قد فعلت ذلك بعد، فهذا وقت مناسب لاستنساخ <a href="https://github.com/stevekinney/introduction-to-testing">المستودع الذي يحتوي على الشيفرة النموذجية لهذه الدورة</a>.</p>
</blockquote>
<p>لنبدأ بأبسط اختبار في العالم. لديّ مثال على هذه الشيفرة في <code>examples/scratchpad/index.test.js</code>، لكنك على الأرجح لست بحاجة إلى القلق بشأن تشغيله الآن.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;is a super simple test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
});
</code></pre>
<p>يمكنك <em>أن</em> تشغّل هذا الاختبار بتنفيذ <code>npm test</code> من سطر الأوامر، لكن لا تتوقّع أي مفاجآت.</p>
<p>على أعلى مستوى، يمكننا ملاحظة ما يلي:</p>
<ul>
<li>توجد دالة تُسمّى <code>test</code> تأخذ وسيطين: نصًّا يمثّل اسم الاختبار. ودالة تحتوي على جسم الاختبار.
<ul>
<li>نصًّا يمثّل اسم الاختبار.</li>
<li>ودالة تحتوي على جسم الاختبار.</li>
</ul>
</li>
<li>داخل تلك الدالة، نستخدم مكتبة تحقّق لنُصدر حكمًا على ما نتوقّع أن تكون عليه طريقة عمل العالم. في هذه الحالة، نتوقّع أن يكون هذان الشيئان متساويين، وهما كذلك.
<ul>
<li>في هذه الحالة، نتوقّع أن يكون هذان الشيئان متساويين، وهما كذلك.</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>نصيحة احترافية</strong></p>
<p>سترى اختبارات أخرى نستخدم فيها <code>it</code> بدلًا من <code>test</code>. لا يوجد حرفيًا أي فرق بين هاتين الدالتين. إنهما اسمان مستعاران لبعضهما. يمكنك استخدامهما بالتبادل.</p>
</blockquote>
<p>حسنًا، هذا يعمل—لكنه سخيف بعض الشيء. لنختبر فعليًا بعض التعابير، أو ربما دالة أيضًا.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;another test, but with some logic&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
});
</code></pre>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;a test with a function&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; a + b;
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
});
</code></pre>
<p>نقطة الجذب هنا أننا حين نكتب الاختبارات، يمكننا إصدار مجموعة من الأحكام حول كيف <em>نتوقّع</em> أن تعمل شيفرتنا. ومهمة مجموعة اختباراتنا أن توفّر علينا عناء التحقّق يدويًا من كل هذه الأشياء. بدلًا من ذلك، سيأخذ مُشغّل الاختبارات شيفرتنا ويتأكّد من أن كل شيء لا يزال يعمل بالطريقة التي نتوقّعها أثناء مضيّنا في عملنا بإضافة الميزات وإعادة هيكلة الشيفرة.</p>
<p>بوجه عام، من غير المرجّح أن تعيش دالتنا <code>add</code> داخل اختبار. والأرجح أنها دالة مساعدة من نوع ما نستخدمها في تطبيقنا.</p>
<p>سنُبقي مساحة التجارب لدينا في المستودع لأي وقت نريد فيه إجراء بعض التجارب السريعة، لكن لننتقل بدلًا من ذلك إلى <code>examples/basic-math/src/arithmetic.js</code>.</p>
<p>يمكننا استخراج دالتنا <em>الشيّقة جدًا</em> إلى ملف خاص بها كما قد نتوقّع أن نراه في يومنا العادي.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// arithmetic.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a + b;
};
</code></pre>
<p>يمكننا إضافة الاختبار في <code>arithmetic.test.js</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/arithmetic.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { add } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./arithmetic&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;add&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should add two numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
  });
});

describe.<span class="hljs-title function_">todo</span>(<span class="hljs-string">&#x27;subtract&#x27;</span>, <span class="hljs-function">() =&gt;</span> {});

describe.<span class="hljs-title function_">todo</span>(<span class="hljs-string">&#x27;multiply&#x27;</span>, <span class="hljs-function">() =&gt;</span> {});

describe.<span class="hljs-title function_">todo</span>(<span class="hljs-string">&#x27;divide&#x27;</span>, <span class="hljs-function">() =&gt;</span> {});
</code></pre>
<h2 id="إضافة-الاختبارات">إضافة الاختبارات</h2>
<p>كل اختبار تكتبه يأتي بتكلفة صغيرة للغاية، يمكن أن تتراكم بمرور الوقت على ما أظن. القاعدة غير المفيدة لعدد الاختبارات التي ينبغي أن تكتبها هي «بالقدر الذي تحتاجه». لكن بوجه عام—نريد على الأقل تغطية بعض الحالات الحدّية.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/arithmetic.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { add } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./arithmetic&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;add&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should add two positive numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should two negative numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(-<span class="hljs-number">2</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">5</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should a positive and a negative number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">5</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
  });
});
</code></pre>
<p>سنضيف المزيد في قسم لاحق، لكن هذه بداية جيدة جدًا الآن. خصوصًا لأننا لم ننظر بعد إلى <a href="https://stevekinney.com/courses/testing/running-tests">تشغيل اختباراتك</a>.</p>
<p>لكن أولًا، لنأخذ لحظة قصيرة للحديث عن <a href="https://stevekinney.com/courses/testing/how-tests-work">كيف تعمل الاختبارات</a>.</p>
<h2 id="قراءات-ذات-صلة">قراءات ذات صلة</h2>
<ul>
<li><a href="https://stevekinney.com/courses/testing/running-tests">تشغيل الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/how-tests-work">كيف تعمل الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/filtering-tests">تصفية الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/organizing-and-annotating-tests">تنظيم الاختبارات والتعليق عليها</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
