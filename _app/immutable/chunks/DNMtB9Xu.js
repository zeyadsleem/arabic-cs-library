const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="in-source-testing",e="الاختبار داخل المصدر (In-Source Testing)",p=[{depth:2,id:"لماذا-تستخدم-الاختبار-داخل-المصدر",text:"لماذا تستخدم الاختبار داخل المصدر؟"},{depth:2,id:"إعداد-الاختبارات-داخل-المصدر-مع-vitest",text:"إعداد الاختبارات داخل المصدر مع Vitest"},{depth:2,id:"ماذا-حدث-هنا-للتو",text:"ماذا حدث هنا للتو؟"},{depth:2,id:"تشغيل-الاختبارات-داخل-المصدر",text:"تشغيل الاختبارات داخل المصدر"},{depth:2,id:"بعض-المزالق",text:"بعض المزالق"},{depth:2,id:"الاختبار-داخل-المصدر-عمليا",text:"الاختبار داخل المصدر عمليًا"},{depth:2,id:"ختاما",text:"ختامًا"}],l=`<p>تخيل هذا: أنت منطلق بسرعة، تكتب ميزتك الجديدة. كل شيء رائع، وربما تحتسي فنجان قهوة طازجًا. ثم تصدمك الحقيقة — <strong>لقد نسيت كتابة اختبارات الوحدات</strong>. لكن مجرد التفكير في تبديل السياق، وإنشاء ملفات اختبار مخصصة، وإعداد المزيد من الشيفرة النمطية… <em>أوف</em>. في هذه اللحظات تتألق فكرة <strong>الاختبار داخل المصدر</strong>.</p>
<blockquote>
<p><strong>لحظة صراحة</strong></p>
<p>أنا عادةً <em>لا</em> أستخدم هذا إلا عندما أشعر بالكسل. وعادةً — على مدى زمني طويل بما يكفي — أنتهي إلى نقل الاختبارات إلى ملفها الخاص.</p>
</blockquote>
<p>بدلًا من إنشاء اختبار منفصل لكل ملف صغير في مشروعك، ماذا لو استطعت… الاختبار مباشرة <strong>داخل ملف المصدر نفسه</strong>؟ جنون؟ ربما. مريح؟ أوه، بالتأكيد. يدعم Vitest الاختبار داخل المصدر، الذي يمكن أن يكون سلاحك السري للتجريب السريع أثناء التطوير. ليس بالضرورة ما ستشغّله في الإنتاج، لكن للتأسيس السريع، إنه ذهب.</p>
<h2 id="لماذا-تستخدم-الاختبار-داخل-المصدر">لماذا تستخدم الاختبار داخل المصدر؟</h2>
<ul>
<li><strong>تبديلات سياق أقل</strong>. يبقى دماغك في ملف واحد. لا بحث عن ملفات اختبار مقابلة.</li>
<li><strong>فحص سريع للفرضيات</strong>. تحتاج إلى اختبار بعض المنطق بسرعة؟ بام. افعل ذلك بجوار الشيفرة التي تزعجك.</li>
<li><strong>أبقِه عشوائيًا</strong>. أنت لا تستهدف كمال الاختبار هنا. إنه نوع من ساحة لعبك، حيث تصقل قطعًا صغيرة من الوظائف.</li>
</ul>
<h2 id="إعداد-الاختبارات-داخل-المصدر-مع-vitest">إعداد الاختبارات داخل المصدر مع Vitest</h2>
<p>كفى حديثًا. لننتقل إلى بعض الشيفرة.</p>
<p>تخيل أن لديك هذه الدالة المساعدة الصغيرة التي تجمع رقمين، <code>add.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">return</span> a + b;
}
</code></pre>
<p>تريد أن تلصق اختبارًا سريعًا. لا حاجة لسحب ملف منفصل كامل لهذا. تجلب الاختبار إلى باب الدالة مباشرة. قل مرحبًا لمجموعة اختباراتك المدمجة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-comment">// Here&#x27;s your function:</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// And now… here&#x27;s your in-source test!</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">vitest</span>) {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;add&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;adds two numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
    });

    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;handles negative numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(-<span class="hljs-number">2</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">5</span>);
    });
  });
}
</code></pre>
<h2 id="ماذا-حدث-هنا-للتو">ماذا حدث هنا للتو؟</h2>
<p>أولًا، هذا <code>import.meta.vitest</code> هناك؟ إنه خدعة مدمجة صغيرة في Vitest تتحقق مما إذا كنت حاليًا في بيئة اختبار. إن نعم، يشغّل كتلة اختبارك. وإن لا، يتخطاها ببساطة. بعبارة أخرى، لن تشغّل اختبارات في الإنتاج، لذا فهو أنيق وآمن.</p>
<p>لدينا بضعة اختبارات <code>it()</code> بسيطة في الملف نفسه الذي فيه دالتنا. تعمل <code>describe</code> و<code>it</code> و<code>expect</code> في Vitest كالمعتاد — لا سحر أساسي هنا.</p>
<h2 id="تشغيل-الاختبارات-داخل-المصدر">تشغيل الاختبارات داخل المصدر</h2>
<p>الآن، واصل وشغّل Vitest كما تفعل عادةً:</p>
<pre><code class="language-bash">npx vitest
</code></pre>
<p>سينتقي Vitest حالات اختبارك المدمجة في ملفات المصدر وينفذها إلى جانب أي اختبارات تقليدية لديك. كأنك تضاعف: المطور نفسه، وملفات أقل!</p>
<h2 id="بعض-المزالق">بعض المزالق</h2>
<p>لا تنجرف <em>كثيرًا</em>. الاختبار داخل المصدر مثالي للفحوص السريعة غير الرسمية أثناء التطوير. لكن مع نمو تطبيقك (تمامًا مثل ذلك الزحف الطفيف للدين التقني الذي تتظاهر بعدم رؤيته)، تبقى <strong>أفضل الممارسات</strong> لتنظيم الاختبارات مهمة.</p>
<ul>
<li><strong>أبقِ شيفرة الإنتاج نظيفة</strong>. لا تريد شيفرة اختبار مشحونة إلى الإنتاج، لذا تأكد من أن بوابة <code>import.meta.vitest</code> تمنعك من تحميل تلك الاختبارات خارج بيئات التطوير/الاختبار.</li>
<li><strong>عندما تنمو الميزات</strong>، ربما <em>فكّر</em> في الانتقال إلى ملف اختبار مخصص. ينبغي أن يكون اختبارك داخل المصدر للتجارب السريعة والعابرة، لا للمسوخ ذات 400 سطر التي تبكيك.</li>
</ul>
<h2 id="الاختبار-داخل-المصدر-عمليا">الاختبار داخل المصدر عمليًا</h2>
<p>هنا يتألق هذا حقًا: أنت في منتصف كتابة خوارزمية، وتريد اختبار حالات طرفية محددة بسرعة — دون كسر تدفقك. أو لديك دوال مساعدة متناثرة وتريد أن تعرف أن كل خطوة تدريجية في عملك <em>صلبة كالصخر</em>. يبقيك الاختبار داخل المصدر سلسًا ومرنًا. مثالي لإثبات المفهوم أو عندما ينطلق الإلهام على لوحة المفاتيح.</p>
<h2 id="ختاما">ختامًا</h2>
<p>لن يكون الاختبار داخل المصدر بديلًا كاملًا لمجموعة اختباراتك، ولا ينبغي أن يكون. لكن عندما تكون في خضم العمل، وآخر ما تريده هو فتح ملف آخر لتبديل السياق لمجرد اختبار تلك القطعة الصغيرة من المنطق، فقد توفر عليك هذه الميزة الصغيرة <em>أطنانًا</em> من الوقت. إنه <strong>اختبار منخفض الاستثمار</strong>: تسديدات سريعة أثناء تنطيطك عبر ميزة.</p>
<p>استخدمه، واستمتع به، لكن الأهم ألا تدعه يصبح اختصارًا آخر يجعل مستقبلك يعاني عند تصحيح الأخطاء بعد ستة أشهر.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,c as default,p as headings,l as html,a as slug,e as title};
