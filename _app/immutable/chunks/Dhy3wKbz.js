const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="clearing-restoring-and-resetting-mocks",t="مسح البدائل المُحاكاة واستعادتها وإعادة ضبطها",c=[{depth:2,id:"متى-تستخدم-كلا-منها",text:"متى تستخدم كلًا منها"},{depth:2,id:"مسح-البدائل-المحاكاة",text:"مسح البدائل المُحاكاة"},{depth:2,id:"إعادة-ضبط-البدائل-المحاكاة",text:"إعادة ضبط البدائل المُحاكاة"},{depth:2,id:"استعادة-البدائل-المحاكاة",text:"استعادة البدائل المُحاكاة"},{depth:2,id:"توابع-الكائن",text:"توابع الكائن"},{depth:2,id:"توابع-دورة-حياة-البدائل-المحاكاة",text:"توابع دورة حياة البدائل المُحاكاة"},{depth:3,id:"الخاتمة",text:"الخاتمة"}],e=`<p>المضاهاة أمر جيد تمامًا عندما تكون مقصودة، لكنها ستطاردك إن بقيت البدائل المُحاكاة القديمة فترة أطول من اللازم. فبعد أن تُحاكي شيئًا، تريد أن تتأكّد من أن تلك البدائل المُحاكاة لا تبقى كرائحة شيفرة كريهة. ولهذا فإن <strong>مسح</strong> البدائل المُحاكاة و<strong>استعادتها</strong> و<strong>إعادة ضبطها</strong> أجزاء جوهرية في صندوق أدوات الاختبار لديك. فلنفكّك الأمر كما نفكّك جحيم ردود النداء المربك إلى سلاسل وعود.</p>
<h2 id="متى-تستخدم-كلا-منها">متى تستخدم كلًا منها</h2>
<p>سنخوض في تفاصيل كل واحدة بعد قليل، لكن لنقارن بينها على مستوى عالٍ قبل أن نغوص.</p>
<ul>
<li><strong>المسح</strong>: أنشأت بعض منطق المضاهاة المعقّد، وأنت الآن تعيد تتبّع الخطوات وتمسح سجل الاستدعاءات لتختبر بشكل نظيف.</li>
<li><strong>إعادة الضبط</strong>: أحدثت فوضى في القيم المُعادة أو <code>.mockImplementation</code>—والآن تريد ببساطة أن تبدأ من جديد دون إعادة بناء البديل المُحاكى.</li>
<li><strong>الاستعادة</strong>: انتهيت من المضاهاة، وتريد إعادة الوظيفة الأصلية، والانصراف وكأن شيئًا لم يكن.</li>
</ul>
<h2 id="مسح-البدائل-المحاكاة">مسح البدائل المُحاكاة</h2>
<p>مسح بديل مُحاكى يُزيل كل <em>سجل الاستدعاءات</em>. لنفترض أن لديك بديلًا مُحاكى استُدعي بضع مرات، وتريد إعادة ضبط عدد الاستدعاءات إلى الصفر. هذا هو <em>المسح</em> في العمل.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> myFunc = vi.<span class="hljs-title function_">fn</span>();

<span class="hljs-comment">// Call it a few times</span>
<span class="hljs-title function_">myFunc</span>(<span class="hljs-string">&#x27;arg1&#x27;</span>);
<span class="hljs-title function_">myFunc</span>(<span class="hljs-string">&#x27;arg2&#x27;</span>);

<span class="hljs-comment">// Clear the mock&#x27;s call history</span>
myFunc.<span class="hljs-title function_">mockClear</span>();

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(myFunc.<span class="hljs-property">mock</span>.<span class="hljs-property">calls</span>.<span class="hljs-property">length</span>); <span class="hljs-comment">// Ah, nice! Back to 0.</span>
</code></pre>
<p>استخدم <code>mockClear()</code> عندما تريد ضمان أن اختباراتك تفحص بيانات استدعاء جديدة. بهذه الطريقة، لن تطاردك أي استدعاءات شبحية من اختبارات سابقة. حالة الاستخدام الشائعة؟ عندما تشغّل البديل المُحاكى نفسه عبر تحقّقات متعددة لكنك تريد صفحة بيضاء لكل منها.</p>
<blockquote>
<p><strong>نصيحة احترافية</strong></p>
<p>إذا كانت اختباراتك تعتمد على <strong>عدد مرات</strong> استدعاء دالة، فأعد ضبط عدد الاستدعاءات ذلك قبل كل اختبار—حتى تحصل دائمًا على أرقام جديدة.</p>
</blockquote>
<h2 id="إعادة-ضبط-البدائل-المحاكاة">إعادة ضبط البدائل المُحاكاة</h2>
<p>بينما <strong>المسح</strong> يمحو سجل الاستدعاءات، فإن <strong>إعادة الضبط</strong> أشبه بالضغط على زر إعادة ضبط المصنع في ميكروويفك—فهي لا تمسح الاستدعاءات السابقة فحسب، بل تمسح أيضًا أي تنفيذات بديلة مُحاكاة مخصّصة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> myFunc = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;I got mocked&#x27;</span>);

<span class="hljs-comment">// Call the function</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">myFunc</span>()); <span class="hljs-comment">// “I got mocked”</span>

<span class="hljs-comment">// Reset the mock to its initial state</span>
myFunc.<span class="hljs-title function_">mockReset</span>();

<span class="hljs-comment">// Now, it&#x27;s just an empty mock function again</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">myFunc</span>()); <span class="hljs-comment">// undefined</span>
</code></pre>
<p>متى ينبغي أن تعيد الضبط؟ فكّر في الأمر كضغط على <em>تراجع</em>. إذا غيّرت ما يُعيده البديل المُحاكى، وقلت لنفسك: «لا، لم يكن ينبغي أن أفعل ذلك أبدًا»، فهذه بطاقتك إلى السلامة العقلية.</p>
<blockquote>
<p><strong>كلمة عن إعادة الضبط</strong></p>
<p>مع إعادة الضبط، سيظل لديك كائن البديل المُحاكى، لكنه يتصرّف كما كان عند إنشائه—عدد الاستدعاءات مضبوط على <code>0</code>، ولا توجد قيم مُعادة أو آثار جانبية.</p>
</blockquote>
<h2 id="استعادة-البدائل-المحاكاة">استعادة البدائل المُحاكاة</h2>
<p>الآن، إليك الخيار النووي: <strong>استعادة</strong> البدائل المُحاكاة. هذا يزيل تنفيذ البديل المُحاكى تمامًا ويعيد الأمور إلى ما كانت عليه قبل أن تلمسه أصلًا. وإذا كنت تُحاكي دالة أصلية أو شيئًا من مكتبة مشتركة، فهذه طريقتك لتجنّب إفساد الأمور لاحقًا عن غير قصد.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Let&#x27;s mock Math.random</span>
vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-title class_">Math</span>, <span class="hljs-string">&#x27;random&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-number">0.5</span>);

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()); <span class="hljs-comment">// 0.5</span>

<span class="hljs-comment">// Restore the original implementation</span>
<span class="hljs-title class_">Math</span>.<span class="hljs-property">random</span>.<span class="hljs-title function_">mockRestore</span>();

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()); <span class="hljs-comment">// Now we&#x27;re back to good ol&#x27; randomness</span>
</code></pre>
<p>عندما تستعيد بديلًا مُحاكى، فإنه يُعيد الدالة الأصلية غير المحاكاة. هذا مفيد جدًا، خصوصًا عندما تعبث بواجهات أصلية—لأنه، ثق بي، إبقاء <code>Math.random()</code> محاكاةً في كل تطبيقك سيُنتج كوابيس اختبار لاحقًا بكل تأكيد.</p>
<h2 id="توابع-الكائن">توابع الكائن</h2>
<p>لنفترض للحظة أن <code>const fn = vi.fn()</code>.</p>
<ul>
<li><code>fn.mockClear()</code>: يمسح كل المعلومات عن كيفية استدعائه وما أعاده. هذا يعادل فعليًا إعادة ضبط <code>fn.mock.calls</code> و<code>fn.mock.results</code> إلى مصفوفتين فارغتين.</li>
<li><code>fn.mockReset()</code>: إضافةً إلى فعل ما يفعله <code>fn.mockClear()</code>، يستبدل هذا التابع التنفيذ الداخلي بدالة فارغة.</li>
<li><code>fn.mockRestore()</code>: إضافةً إلى فعل ما يفعله <code>fn.mockReset()</code>، يستبدل التنفيذ بالدوال الأصلية.</li>
</ul>
<h2 id="توابع-دورة-حياة-البدائل-المحاكاة">توابع دورة حياة البدائل المُحاكاة</h2>
<p>عادةً ما تضع هذه في كتلة <code>afterEach</code> داخل مجموعة اختباراتك.</p>
<ul>
<li><code>vi.clearAllMocks</code>: يمسح سجل الاستدعاءات والقيم المُعادة في الجواسيس، لكنه <em>لا</em> يعيد ضبطها إلى تنفيذها الافتراضي. هذا يعادل فعليًا استدعاء <code>.mockClear()</code> على كل جاسوس.</li>
<li><code>vi.resetAllMocks</code>: يستدعي <code>.mockReset()</code> على كل الجواسيس. وسيستبدل أي تنفيذات بديلة مُحاكاة بدالة فارغة.</li>
<li><code>vi.restoreAllMocks</code>: يستدعي <code>.mockRestore()</code> على كل بديل مُحاكى. وهذا يُعيد العالم إلى حالته الأصلية.</li>
</ul>
<h3 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h3>
<p>يمنحك Vitest الأدوات التي تحتاجها لإبقاء اختباراتك نظيفة، وبدائلك المُحاكاة بسيطة، وإحباطاتك تحت السيطرة (في الأغلب). مفتاح الأمر هو معرفة متى تنظّف بعد نفسك. قد تكون البدائل المُحاكاة قوية، لكن إن لم تمسحها أو تعِد ضبطها أو تستعدها بشكل سليم، فستجد نفسك تتساءل عن سبب اندلاع النيران وأنت تتعامل مع أمتعة المضاهاة من اختبارات سابقة.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:c,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,c as headings,e as html,l as slug,t as title};
