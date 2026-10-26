const s="kinney",a="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="refactor-shelf-fixtures-solution",t="الحل: إعادة هيكلة تجهيزات Shelf",l=[{depth:2,id:"الإيداع-1-أعد-تسمية-كل-شيء",text:"الإيداع 1: أعد تسمية كل شيء"},{depth:2,id:"الإيداع-2-أضف-التفكيك-للتجهيزات-المغيرة-للحالة",text:"الإيداع 2: أضف التفكيك للتجهيزات المغيّرة للحالة"},{depth:2,id:"الإيداع-3-أنزل-رتبة-الأدوات-المساعدة",text:"الإيداع 3: أنزل رتبة الأدوات المساعدة"},{depth:2,id:"الإيداع-4-أضف-تعليقات-تبرير-النطاق",text:"الإيداع 4: أضف تعليقات تبرير النطاق"},{depth:2,id:"الملف-النهائي",text:"الملف النهائي"},{depth:2,id:"ما-ينبغي-أن-تشعر-به",text:"ما ينبغي أن تشعر به"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>الحل التالي من الدورة نقطة وصول معقولة واحدة. وقد تبدو نسختك مختلفة — فالمختبر يُقيّم جودة قراراتك، لا تطابقًا حرفيًا بايتًا ببايت. وما يلي سرد لكيفية انتقالي من <code>fixtures.ts</code> إلى شكل نهائي أنظف، إيداعًا تلو الآخر.</p>
<p>هذا المختبر يقع الآن بعد درس الزرع الحتمي عن قصد. فلا تصبح إعادة الهيكلة حقيقية إلا حين يوجد <code>tests/helpers/seed.ts</code> وتعمل <code>resetShelfContent()</code> فعلًا.</p>
<p>إن كنت قد أنهيت المختبر بالفعل وتريد المقارنة، فمرّر إلى <a href="#the-final-file">الملف النهائي</a> في الأسفل.</p>
<h2 id="الإيداع-1-أعد-تسمية-كل-شيء">الإيداع 1: أعد تسمية كل شيء</h2>
<p>أولًا، الأسماء. <code>setupUser</code> تصف ما <em>تفعله</em> التجهيزة (تعدّ مستخدمًا)؛ و<code>seededReader</code> تصف ما <em>توفّره</em> التجهيزة (القارئ الذي جرى زرعه). وكانت <code>setupEmptyShelf</code> و<code>setupShelfWithBooks</code> تكذبان على القارئ — فكلتاهما تستدعي <code>resetShelfContent</code>، والأداة المساعدة للزرع التي بنيتها سابقًا تضع Station Eleven وPiranesi على الرف <em>دائمًا</em>. ولا واحدة منهما توفّر رفًا فارغًا. فادمجهما في <code>seededShelf</code> واحدة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before:</span>
<span class="hljs-attr">setupUser</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span> });
},

<span class="hljs-attr">setupEmptyShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(request);
},

<span class="hljs-attr">setupShelfWithBooks</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(request);
},
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// After:</span>
<span class="hljs-attr">seededReader</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice Reader&#x27;</span> });
},

<span class="hljs-attr">seededShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(request);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
},
</code></pre>
<p>حدّث تفكيكات معاملات المواصفة لتطابق ذلك: تصبح <code>setupUser</code> هي <code>seededReader</code>، وتصبح كل من <code>setupEmptyShelf</code> و<code>setupShelfWithBooks</code> هي <code>seededShelf</code>. وادمج الاختبارين اللذين استخدما اسمين مختلفين للتجهيزة نفسها في اختبار واحد، أو أبقِهما منفصلين — القرار لك. أنا أبقيتهما منفصلين لأن التحققات التي يفحصانها مختلفة.</p>
<p>شغّل المواصفة. ما زالت تنجح. أودِع.</p>
<h2 id="الإيداع-2-أضف-التفكيك-للتجهيزات-المغيرة-للحالة">الإيداع 2: أضف التفكيك للتجهيزات المغيّرة للحالة</h2>
<p>لاحظ <code>await resetShelfContent()</code> الجديد <em>بعد</em> <code>await use(request)</code> في <code>seededShelf</code>. هذا هو نصف التفكيك. لم تكن الحالة الابتدائية تحتوي عليه. وكان الاختبار ينجح بدونه، لأن الاختبار التالي في الملف الابتدائي كان يستدعي <code>resetShelfContent</code> أيضًا، وأداة الزرع عديمة الأثر عند التكرار. لكن لحظة أن تضيف اختبارًا جديدًا <em>لا</em> يستدعيها، يصبح التسريب مرئيًا.</p>
<p>القاعدة من الدرس: كل تجهيزة تغيّر الحالة لها نصف تفكيك، وهو دائمًا مسبوق بـ<code>await</code>. صفر استثناءات. وإن وُجد التفكيك لكن بلا <code>await</code>، فـ Playwright يظن أن التجهيزة انتهت فيتسابق مع إعداد الاختبار التالي.</p>
<p>أودِع التفكيك.</p>
<h2 id="الإيداع-3-أنزل-رتبة-الأدوات-المساعدة">الإيداع 3: أنزل رتبة الأدوات المساعدة</h2>
<p>كانت <code>authedPage</code> كذبة. كانت تقول «ها هي صفحة موثَّقة»، لكن بحلول وصولك إلى هذا المختبر يفترض أن تكون لديك بالفعل تهيئة Playwright موثَّقة افتراضية لصفحات Shelf المحمية — عادةً حالة تخزين من دروس المصادقة السابقة. وكانت التجهيزة تنتقل إلى <code>/shelf</code> وتتحقق من المسار، وهذا ليس تجهيزة — بل سطرا شيفرة. احذفها، وضع الانتقال مباشرةً في المواصفة.</p>
<p>وكانت <code>loggedOutPage</code> مشكلة مختلفة. كانت تجهيزة حقيقية (تبني سياق متصفح جديدًا)، لكنها استُخدمت في اختبار واحد فقط، وكان تركيبها عسيرًا لأنها تصارع أي حالة متصفح موثَّقة افتراضية أعددتها بالفعل لتشغيل المختبر. فملف الحل ينقلها خارجًا كدالة مساعدة عادية ويترك التفكيك للمستدعي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In fixtures.ts after the refactor:</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">openLoggedOutPage</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">browser</span>: <span class="hljs-title class_">Browser</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>({ <span class="hljs-attr">storageState</span>: { <span class="hljs-attr">cookies</span>: [], <span class="hljs-attr">origins</span>: [] } });
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();
  <span class="hljs-keyword">return</span> { page, context };
};
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// In the spec:</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;logged-out page is redirected to login when it asks for /shelf&#x27;</span>, <span class="hljs-title function_">async</span> ({ browser }) =&gt; {
  <span class="hljs-keyword">const</span> { page, context } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">openLoggedOutPage</span>(browser);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveURL</span>(<span class="hljs-regexp">/\\/login/</span>);
  <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">close</span>();
});
</code></pre>
<p>لاحظ المقايضة: الأداة المساعدة تعيد مسؤولية التفكيك إلى المستدعي، لأن التجهيزات وحدها تستطيع أن <em>تملك</em> التفكيك داخل دورة حياة Playwright. وإن نسيت <code>await context.close()</code>، فسينبّهك Playwright في نهاية التشغيل. ذلك التنبيه هو شبكة الأمان — ليست محكمة كتفكيك تجهيزة، لكنها مرئية.</p>
<p>شغّل المواصفة. ما زالت خضراء. أودِع.</p>
<h2 id="الإيداع-4-أضف-تعليقات-تبرير-النطاق">الإيداع 4: أضف تعليقات تبرير النطاق</h2>
<p>قاعدة الدرس: كل تجهيزة لها تعليق من سطر واحد يسمّي اختيار النطاق وسببه. وهذا ما يقوله ملف الحل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Test-scoped: the reader identity is a small, read-only value used</span>
<span class="hljs-comment">// across multiple labs. It&#x27;s a constant right now; the fixture shape</span>
<span class="hljs-comment">// lets us swap in a different seeded user later without touching</span>
<span class="hljs-comment">// specs.</span>
<span class="hljs-attr">seededReader</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; { ... },

<span class="hljs-comment">// Test-scoped: each test gets a freshly-seeded shelf. The teardown</span>
<span class="hljs-comment">// resets content on the way out, so any mutation this test made</span>
<span class="hljs-comment">// cannot leak into the next one via worker state.</span>
<span class="hljs-attr">seededShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; { ... },
</code></pre>
<p>لا واحدة من التجهيزتين على مستوى العامل. وهذا هو الجواب الصادق. ولا واحدة منهما تحمل بيانات للقراءة فقط مكلفة بما يكفي لتستحق نطاقًا مشتركًا. والإغراء بجعل <code>seededShelf</code> على نطاق العامل حقيقي — سيكون أسرع — لكن كل اختبار في العامل سيرث عندئذٍ أي حالة خلّفها الاختبار السابق، وهذا بالضبط الخطأ الذي يريد الدرس منعك منه.</p>
<p>كتابة التبرير في تعليق هي طريقة جعل القرار مرئيًا للشخص التالي. (أي أنت المستقبلي، بعد ستة أشهر.)</p>
<h2 id="الملف-النهائي">الملف النهائي <span class="content-anchor" id="the-final-file"></span></h2>
<p>ملف <code>fixtures.ts</code> بعد إعادة الهيكلة هو تقريبًا هذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> base } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIRequestContext</span>, <span class="hljs-title class_">Browser</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> { resetShelfContent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../helpers/seed&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SeededReader</span> = {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">GoodFixtures</span> = {
  <span class="hljs-attr">seededReader</span>: <span class="hljs-title class_">SeededReader</span>;
  <span class="hljs-attr">seededShelf</span>: <span class="hljs-title class_">APIRequestContext</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-property">extend</span>&lt;<span class="hljs-title class_">GoodFixtures</span>&gt;({
  <span class="hljs-comment">// Test-scoped: see above.</span>
  <span class="hljs-attr">seededReader</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice Reader&#x27;</span> });
  },

  <span class="hljs-comment">// Test-scoped: see above.</span>
  <span class="hljs-attr">seededShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(request);
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  },
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">openLoggedOutPage</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">browser</span>: <span class="hljs-title class_">Browser</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>({ <span class="hljs-attr">storageState</span>: { <span class="hljs-attr">cookies</span>: [], <span class="hljs-attr">origins</span>: [] } });
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();
  <span class="hljs-keyword">return</span> { page, context };
};

<span class="hljs-keyword">export</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
</code></pre>
<p>خمس تجهيزات صارت تجهيزتين وأداة مساعدة واحدة. والملف أقصر. والقصد أوضح. والتفكيكات مسبوقة بـ<code>await</code>. واختيارات النطاق موثَّقة.</p>
<h2 id="ما-ينبغي-أن-تشعر-به">ما ينبغي أن تشعر به</h2>
<p>إن كانت نسختك مشابهة في <em>الشكل</em> ومختلفة في <em>التفاصيل</em> — أسماء تجهيزات مختلفة، وقرارات مختلفة حول أي أداة مساعدة تُنزَل رتبتها — فذلك صحيح تمامًا. لا توجد إعادة هيكلة صحيحة واحدة. توجد مجموعة مبادئ، وإما أن يحترمها ملفك أو لا يحترمها.</p>
<p>وما <em>لا</em> ينبغي أن تشعر به هو الرغبة في إضافة تجهيزات أكثر. فالدرس والمختبر كلاهما عن إزالة تعقيد التجهيزات، لا عن إضافته. فإن جعلت إعادة هيكلتك الملف أطول، فأنت تمضي في الاتجاه الخطأ.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped">التجهيزات: على مستوى العامل، وعلى مستوى الاختبار، والفخّ بينهما</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-request-context-beyond-storage-state">APIRequestContext فيما يتجاوز حالة التخزين</a> — الدرس التالي، الذي يبدأ من حيث انتهى مثال تركيب <code>authenticatedRequest</code> ويحوّله إلى نمط حقيقي لتبديل المستخدم في منتصف الاختبار.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:e,slug:n,title:t,headings:l,html:p};export{s as book,a as chapter,e as chapterTitle,c as default,l as headings,p as html,n as slug,t as title};
