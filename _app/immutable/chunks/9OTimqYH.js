const s="kinney",e="self-testing-ai-agents",t="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="approaches-to-har-recording",a="مقاربات تسجيل HAR",o=[{depth:2,id:"التسجيل-البرمجي-داخل-اختبار",text:"التسجيل البرمجي داخل اختبار"},{depth:3,id:"تبديل-وضع-التسجيل-بمتغير-بيئة",text:"تبديل وضع التسجيل بمتغيّر بيئة"},{depth:3,id:"ما-يحدث-حين-تعيد-التسجيل",text:"ما يحدث حين تعيد التسجيل"},{depth:2,id:"سطر-أوامر-playwright",text:"سطر أوامر Playwright"},{depth:2,id:"chrome-devtools",text:"Chrome DevTools"},{depth:2,id:"مقارنة",text:"مقارنة"},{depth:2,id:"تنقية-بيانات-الاعتماد",text:"تنقية بيانات الاعتماد"},{depth:2,id:"سير-عملي-الافتراضي",text:"سير عملي الافتراضي"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>أنت تعرف أنك تريد ملف HAR. فقد عرض <a href="https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation">الدرس السابق</a> الفكرة، والآن تحتاج فعلًا إلى تسجيل واحد. ثلاث طرق لفعل ذلك، لكل منها نقطة تلاؤم مختلفة، والاختيار يتلخّص في سؤال واحد: هل لديك أصلًا اختبار يمارس نداءات الشبكة التي تحتاج إلى التقاطها؟</p>
<p>أستخدم الثلاث جميعًا حسب الموقف. وهذا هو الوقت الذي يستحق فيه كل منها مكانه.</p>
<h2 id="التسجيل-البرمجي-داخل-اختبار">التسجيل البرمجي داخل اختبار</h2>
<p>هذا هو الأسلوب الذي عرضه الدرس السابق — <code>page.routeFromHAR</code> مع <code>update: true</code>. وتستخدم الأمثلة أدناه <code>tests/fixtures/</code> مجلدًا لملفات HAR — وهو اصطلاح تتبنّاه هذه الدورة لا مجلد موجود أصلًا في نسخة Shelf الانطلاقية. أنشئه أول مرة تسجّل فيها:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;search for books&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/open-library-search.har&#x27;</span>, {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span>,
    <span class="hljs-attr">update</span>: <span class="hljs-literal">true</span>,
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Search&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;Station Eleven&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Search&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Emily St. John Mandel&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>شغّل الاختبار مرة واحدة مع <code>update: true</code>، فتسجّل Playwright كل طلب مطابق على القرص. واقلب <code>update</code> إلى <code>false</code> (أو احذفه)، فتكون في وضع إعادة التشغيل. وإلى جانب <code>url</code> و<code>update</code>، تقبل <a href="https://playwright.dev/docs/api/class-page#page-route-from-har"><code>routeFromHAR</code></a> أيضًا <code>updateContent</code> (يتحكم في حفظ أجسام الاستجابات مضمّنة أو في ملفات منفصلة) و<code>updateMode</code> (<code>'minimal'</code> يسجّل فقط ما تحتاجه إعادة التشغيل — وهو الافتراضي — بينما <code>'full'</code> يحفظ بيانات HAR وصفية أوسع). والقيم الافتراضية جيدة في معظم الحالات.</p>
<h3 id="تبديل-وضع-التسجيل-بمتغير-بيئة">تبديل وضع التسجيل بمتغيّر بيئة</h3>
<p>إضافة <code>update: true</code> وحذفه يدويًا يعمل، لكنه مزعج — وهو من النوع الذي تنسى التراجع عنه قبل الإيداع. ولا تملك Playwright راية مدمجة لهذا (فراية <code>--update-snapshots</code> تنطبق فقط على لقطات المقارنة البصرية، لا على ملفات HAR)، لكن متغيّر بيئة يصلك إلى هناك:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;search for books&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/open-library-search.har&#x27;</span>, {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span>,
    <span class="hljs-attr">update</span>: !!process.<span class="hljs-property">env</span>.<span class="hljs-property">UPDATE_HARS</span>,
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Search&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;Station Eleven&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Search&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Emily St. John Mandel&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>الآن يعيد الاختبار التشغيل افتراضيًا ويسجّل حين تطلب منه ذلك:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Record—hits the real API, writes the HAR</span>
UPDATE_HARS=1 npx playwright <span class="hljs-built_in">test</span>

<span class="hljs-comment"># Replay—reads from disk, no network</span>
npx playwright <span class="hljs-built_in">test</span>
</code></pre>
<p>لا مزيد من تحرير ملف الاختبار لتبديل الأوضاع. فـ <code>!!</code> يحوّل متغيّر البيئة إلى قيمة منطقية — إذا كان مضبوطًا على أي قيمة، فأنت تسجّل. وإذا كان غائبًا، فأنت تعيد التشغيل.</p>
<h3 id="ما-يحدث-حين-تعيد-التسجيل">ما يحدث حين تعيد التسجيل</h3>
<p>حين تشغّل <code>UPDATE_HARS=1</code>، تستبدل Playwright ملف الـ HAR الموجود كليًا — ولا تدمج مدخلات جديدة في الملف القديم. فالتسجيل القديم ذهب؛ والجديد يعكس ما فعله الاختبار هذه المرة. فالـ HAR لقطة لجلسة واحدة، لا تراكم لجلسات. وإذا احتجت مدخلات من سيناريوهات متعددة، فاستخدم ملفات HAR منفصلة.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>سير عمل <code>UPDATE_HARS</code> هذا مخصّص لإعادة التسجيل <em>المتعمّدة</em> — حين تتغيّر الـ API أو يتغيّر اختبارك فتحتاج لقطة جديدة. وهو ليس لجعل اختبار فاشل ينجح بإعادة تسجيل أعمى. راجع <a href="https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation">درس التسجيل</a> للتمييز بين التحديث المعتمد وإعادة التسجيل العابرة.</p>
</blockquote>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إعادات المحاولة في Playwright تعيد تشغيل الاختبار من الصفر. وفي وضع إعادة التشغيل، ترى كل إعادة محاولة استجابات HAR نفسها — حتمية بالتصميم. أما في وضع التسجيل، فكل إعادة محاولة تصل إلى الـ API الحقيقي مرة أخرى وتكتب فوق الـ HAR، فتغلب تسجيل إعادة المحاولة الأخيرة.</p>
</blockquote>
<p>هذا ما أستخدمه لمجموعة اختبارات Shelf، وهو أحكم حلقات التغذية الراجعة بين المقاربات الثلاث. فالتسجيل يلتقط <em>بالضبط</em> الطلبات التي يصدرها الاختبار، بالترتيب الذي يصدرها به. لا ضجيج إضافي — لا حركة إضافات، ولا طلبات preflight من أصل مختلف، ولا عمليات جلب favicon. فالـ HAR يطابق الاختبار لأن الاختبار هو من <em>أنتج</em> الـ HAR.</p>
<p>والجانب السلبي: تحتاج اختبارًا عاملًا أولًا. فإذا كنت تُعدّ إعادة تشغيل HAR لميزة لا اختبارات لها بعد، فأنت تكتب الاختبار <em>وبنية التسجيل</em> في الجلسة نفسها. أحيانًا يكون ذلك مقبولًا. وأحيانًا تريد التسجيل أولًا كي تكتب الاختبار مقابل محاكاة مستقرة.</p>
<p><strong>متى تلجأ إلى هذا:</strong> لديك أصلًا اختبار ناجح يخاطب الـ API الحقيقي وتريد تجميد حركة الشبكة التي ينتجها. اكتب الاختبار، وسجّل مرة، وأعد التشغيل إلى الأبد.</p>
<h2 id="سطر-أوامر-playwright">سطر أوامر Playwright</h2>
<p>تشحن Playwright الراية <code>--save-har</code> في الأمرين <code>open</code> و<code>codegen</code> معًا. فلا تحتاج إلى اختبار أصلًا — تحصل على متصفح، وتتفاعل معه، وحين تغلقه تكتب Playwright الـ HAR.</p>
<p>أبسط نسخة:</p>
<pre><code class="language-bash">npx playwright open --save-har=tests/fixtures/session.har https://your-app.localhost:5173
</code></pre>
<p>هذا يطلق نسخة Chromium موجّهة إلى تطبيقك. انقر هنا وهناك، وابحث عن كتاب، وأضفه إلى رفك. وحين تغلق المتصفح، تكتب Playwright كل طلب شبكة إلى <code>tests/fixtures/session.har</code>.</p>
<p>لكن ذلك <em>كل</em> طلب — HTML، وCSS، وJavaScript، والصور، ونداءات الـ API. وإذا كان يهمّك فقط حركة Open Library، فضيّقها بـ <code>--save-har-glob</code>:</p>
<pre><code class="language-bash">npx playwright open \\
	--save-har=tests/fixtures/open-library-search.har \\
	--save-har-glob=<span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span> \\
	https://your-app.localhost:5173
</code></pre>
<p>الآن يحتوي الـ HAR على الطلبات المطابقة لذلك الـ glob فقط. وتتبع الصيغة <a href="https://playwright.dev/docs/network#glob-url-patterns">قواعد الـ glob</a> نفسها المستخدمة في <code>routeFromHAR</code>: <code>*</code> يطابق أي شيء عدا <code>/</code>، و<code>**</code> يطابق أي شيء بما فيه <code>/</code>، والمطابقة تجري على URL الطلب الكامل.</p>
<p>ونسخة <code>codegen</code> هي الشيء نفسه، لكن Playwright <em>تولّد</em> أيضًا شيفرة اختبار بينما تتفاعل مع الصفحة:</p>
<pre><code class="language-bash">npx playwright codegen \\
	--save-har=tests/fixtures/open-library-search.har \\
	--save-har-glob=<span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span> \\
	https://your-app.localhost:5173
</code></pre>
<p>فتحصل على ملف HAR، <em>و</em>كذلك مسوّدة أولى خشنة للاختبار الذي كان سيعيد تشغيله. وقد استخدمت هذا مرة واحدة بالضبط في الحاجة الحقيقية — عند الانضمام إلى مشروع شخص آخر ومحاولة فهم ما يرسله تطبيقهم فعلًا على السلك. إنه أداة استكشاف جيدة. ولن أستخدم شيفرة الاختبار المولّدة حرفيًا — فهي تستخدم محددات CSS حيث تريد <code>getByRole</code>، ولا تعرف شيئًا عن ثوابتك أو كائنات صفحاتك — لكنها توفّر وقتًا حين يكون البديل «التحديق في التطبيق والتخمين أي نقاط نهاية ينادي».</p>
<p><strong>متى تلجأ إلى هذا:</strong> حين لا يكون لديك اختبار بعد، أو تريد تسجيل HAR لسير عمل لم تؤتمته. وشجرة القرار بسيطة: لديك اختبار ← تسجيل برمجي. لا اختبار وتريد الاستكشاف ← سطر الأوامر. تنقيح جلسة حيّة ← Chrome.</p>
<h2 id="chrome-devtools">Chrome DevTools</h2>
<p>لا تحتاج إلى Playwright أصلًا في هذه الطريقة. افتح DevTools (F12 أو Cmd+Opt+I)، واختر تبويب Network، وتأكد من أن التسجيل نشط (الدائرة الحمراء). تفاعل مع الصفحة، ثم انقر بزر الفأرة الأيمن في أي مكان في قائمة الطلبات واختر <strong>Save all as HAR with content</strong>. وجزء «with content» مهم — فبدونه تحصل على بيانات وصفية للطلب/الاستجابة بلا أجسام، ولا تستطيع Playwright إعادة تشغيل الاستجابات.</p>
<p>تكتب Chrome <a href="http://www.softwareishard.com/blog/har-12-spec/">ملف HAR</a> قياسيًا — الصيغة نفسها، وبنية JSON نفسها. ويستطيع <a href="https://playwright.dev/docs/mock#mocking-with-har-files"><code>page.routeFromHAR</code> في Playwright</a> إعادة تشغيله، لأن HAR صيغة معيارية بصرف النظر عمّن سجّلها.</p>
<p>هذا هو الأسلوب الذي ألجأ إليه حين أنقّح مشكلة في الإنتاج وأريد التقاط جلسة الشبكة <em>بالضبط</em> التي أنظر إليها. فأنا أصلًا في DevTools. وتبويب Network مفتوح أصلًا. زر أيمن، حفظ، انتهينا. لا رايات سطر أوامر، ولا سقالات اختبار.</p>
<p>لكن ثمّة فجوة ذات معنى بين «سجّلت Chrome ملف HAR» و«تستطيع Playwright إعادة تشغيل ملف HAR هذا بنظافة في اختبار». وفيما يلي أمور قليلة يجب الحذر منها:</p>
<p><strong>الحركة الإضافية.</strong> تسجّل Chrome <em>كل</em> شيء — طلبات الإضافات، وعمليات جلب Service Worker، وطلبات CORS <code>OPTIONS</code> الاستباقية، وأيقونات favicon، ونداءات التحليلات. وتتجاهل Playwright مدخلات HAR التي لا يطابقها أي طلب اختبار، فالمدخلات الإضافية غير ضارة. لكن المشكلة الحقيقية في الاتجاه <em>المعاكس</em>: أن يصدر اختبارك طلبًا <em>ليس</em> في الـ HAR الذي سجّلته Chrome (لأن بيئة الاختبار ترسل ترويسات مختلفة أو تسلسل معاملات الاستعلام بترتيب مختلف). تلك مدخلة ناقصة، ويفشل الاختبار بـ «request not found in HAR».</p>
<p><strong>الترويسات والكوكيز.</strong> يحتوي HAR مسجّل بـ Chrome على كوكيز جلستك الحقيقية، ورموز مصادقتك الحقيقية، وأي ترويسات أرسلها متصفحك. وإذا أودعت الـ HAR في المستودع دون تنقيته أولًا، فقد أودعت بيانات اعتماد في نظام التحكم بالإصدارات. والأسلوب البرمجي يعاني هذه المشكلة أيضًا، لكنها أسوأ مع Chrome لأن جلسة متصفح يدوية تحمل عادةً <em>حالة محيطة أكثر</em> — إضافات متصفح تحقن ترويسات، وكوكيز تحليلات طرف أول، وأشياء لا تدرك حتى أنها تُرسَل.</p>
<p><strong>ترتيب الطلبات.</strong> تسجّل Chrome الطلبات بالترتيب الذي انطلقت به فعلًا. وإذا أطلق تطبيقك ثلاثة نداءات API متزامنة، فقد تسجّلها Chrome بترتيب مختلف عن ترتيب إعادة تشغيل Playwright لها، تبعًا للتوقيت. و<a href="https://playwright.dev/docs/mock#mocking-with-har-files">تطابق Playwright على الـ URL والطريقة</a>، لا على التسلسل، فعادةً ليست مشكلة — لكن إذا أصدر تطبيقك الطلب نفسه مرتين بحمولتين مختلفتين، فقد يهمّ الترتيب.</p>
<p><strong>متى تلجأ إلى هذا:</strong> حين تكون أصلًا في Chrome تنقّح شيئًا وتريد التقاط الجلسة كما هي. أو حين تحتاج HAR من بيئة إنتاج لا تستطيع تشغيل Playwright فيها. وخطّط لمراجعة الملف قبل الإيداع — نقِّ بيانات الاعتماد، وتوقّع بعض التنظيف إذا اختلفت بيئة الاختبار عن Chrome.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لن يعمل HAR مسجّل مقابل أصل واحد (مثلًا <code>api.example.com</code>) في بيئة اختبار تصدر طلبات إلى أصل مختلف (مثلًا <code>localhost:5173</code>). فـ glob الـ <code>url</code> لا يبوّب إلا الطلبات المؤهلة لمعالجة HAR — ولا يعيد كتابة الـ URLs ولا يخفّف المطابقة. وملفات HAR المسجّلة في الإنتاج تعمل مع واجهات API خارجية يخاطبها الاختبار بالـ URL نفسه، لا مع طلبات تذهب إلى مضيف مختلف. وفي سيناريوهات اختلاف النطاق، تكون <code>page.route</code> مع معالج مخصص هي الأداة الصحيحة.</p>
</blockquote>
<h2 id="مقارنة">مقارنة</h2>
<table>
<thead>
<tr>
<th></th>
<th>برمجيًا (<code>routeFromHAR</code>)</th>
<th>سطر أوامر Playwright (<code>--save-har</code>)</th>
<th>Chrome DevTools</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>يحتاج اختبارًا أولًا</strong></td>
<td>نعم</td>
<td>لا</td>
<td>لا</td>
</tr>
<tr>
<td><strong>يلتقط ما يحتاجه الاختبار بالضبط</strong></td>
<td>نعم</td>
<td>مع <code>--save-har-glob</code></td>
<td>لا — يلتقط كل شيء</td>
</tr>
<tr>
<td><strong>خطر بيانات الاعتماد</strong></td>
<td>متوسط</td>
<td>متوسط</td>
<td>مرتفع</td>
</tr>
<tr>
<td><strong>ضجيج إضافي في الـ HAR</strong></td>
<td>أدنى</td>
<td>يعتمد على الـ glob</td>
<td>مرتفع</td>
</tr>
<tr>
<td><strong>جيد للاستكشاف</strong></td>
<td>لا</td>
<td>نعم</td>
<td>نعم</td>
</tr>
<tr>
<td><strong>جيد لتنقيح الإنتاج</strong></td>
<td>لا</td>
<td>لا</td>
<td>نعم</td>
</tr>
</tbody>
</table>
<h2 id="تنقية-بيانات-الاعتماد">تنقية بيانات الاعتماد</h2>
<p>كل أسلوب تسجيل يلتقط بيانات اعتماد. فالتسجيل البرمجي وتسجيل سطر الأوامر يلتقطان ما يرسله مستخدم اختبارك. أما Chrome فيلتقط جلستك <em>الحقيقية</em>. وقبل إيداع أي HAR، ابحث في الـ JSON عن <code>authorization</code> و<code>cookie</code> و<code>set-cookie</code> و<code>token</code> و<code>session</code> و<code>api-key</code> و<code>secret</code>. وتختبئ بيانات الاعتماد في ثلاثة مواضع داخل مدخلة HAR: ترويسات الطلب، وترويسات الاستجابة (<code>Set-Cookie</code>)، وأجسام الطلب أو الاستجابة (تبادلات رموز OAuth، ومفاتيح API كمعاملات استعلام).</p>
<p>وأكثر سير عمل أمانًا هو استخدام مستخدم اختبار مخصص ببيانات اعتماد يمكن التخلّص منها — الحساب نفسه الذي ينشئه <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">إعداد حالة التخزين</a> لديك (مثل <code>alice@example.com</code>). وإذا كان الـ HAR يحتوي جلسة ذلك المستخدم التجريبي فقط، فلا يوجد شيء حقيقي يحتاج إلى تنقية.</p>
<p>وحين تحتاج فعلًا إلى التنقية، استخدم سكربتًا يحلّل الـ HAR كـ JSON — لا <code>sed</code> ولا تعبيرًا نمطيًا، فهما هشّان أمام JSON المتداخل. امشِ على <code>entries[].request.headers</code> و<code>entries[].response.headers</code>، واستبدل القيم الحساسة بـ <code>&quot;REDACTED&quot;</code>، و<strong>أعد دائمًا تشغيل الاختبار في وضع إعادة التشغيل بعد التنقية</strong> للتحقق من أن الـ HAR ما زال يعمل.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يستثني <a href="https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks">درس فحص الأسرار</a> مجلد <code>tests/fixtures/</code> من gitleaks افتراضيًا. وهذا يعني أن الماسح <em>لن</em> يلتقط بيانات الاعتماد في ملفات HAR المودعة. فالمراجعة اليدوية قبل الإيداع هي البوابة الوحيدة.</p>
</blockquote>
<h2 id="سير-عملي-الافتراضي">سير عملي الافتراضي</h2>
<p>لمجموعة اختبارات Shelf، أستخدم التسجيل البرمجي في كل شيء. وسير العمل مباشر:</p>
<p>اكتب الاختبار مع فحص متغيّر البيئة <code>UPDATE_HARS</code>. شغّله مرة مع <code>UPDATE_HARS=1</code> مقابل الـ API الحقيقي. أودِع الـ HAR. شغّله مرة أخرى بلا متغيّر البيئة للتحقق من أن إعادة التشغيل تعمل. هذا كل شيء.</p>
<p>وألجأ إلى أسلوب سطر الأوامر حين أكتب اختبارات لميزة جديدة وأريد فهم شكل الطلب/الاستجابة قبل أن أكتب التأكيدات. سجّل جلسة يدوية، وافتح الـ HAR في محرّري، وانظر بالضبط ما تعيده الـ API، <em>ثم</em> اكتب الاختبار.</p>
<p>وألجأ إلى Chrome DevTools حين أحقّق في خطأ في الإنتاج وأريد أخذ جلسة الشبكة بينما ما زلت أستطيع إعادة إنتاجه. ذلك الـ HAR لن يدخل مجموعة الاختبارات مباشرة — إنه دليل. قد أستخدمه مرجعًا لكتابة تسجيل برمجي سليم لاحقًا، أو قد أحتفظ به فقط توثيقًا لشكل الخطأ.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أي أسلوب تستخدم، راجع الـ HAR قبل الإيداع. راجع قسم التنقية أعلاه لتعرف عمّا تبحث وأين تختبئ بيانات الاعتماد.</p>
</blockquote>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation">تسجيل ملفات HAR لعزل الشبكة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception">اعتراض الشبكة القائم على المسارات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">مصادقة حالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">حلقات التحقق الليلية</a></li>
</ul>
`,r={book:s,chapter:e,chapterTitle:t,slug:n,title:a,headings:o,html:p};export{s as book,e as chapter,t as chapterTitle,r as default,o as headings,p as html,n as slug,a as title};
