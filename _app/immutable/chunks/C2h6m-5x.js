const s="kinney",e="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="recording-hars-for-network-isolation",t="تسجيل ملفات HAR لعزل الشبكة",o=[{depth:2,id:"ما-هو-ملف-har",text:"ما هو ملف HAR"},{depth:2,id:"التسجيل",text:"التسجيل"},{depth:2,id:"إعادة-التشغيل",text:"إعادة التشغيل"},{depth:2,id:"قواعد-المطابقة-ولماذا-تلدغ",text:"قواعد المطابقة، ولماذا تلدغ"},{depth:2,id:"تحديث-ملفات-har",text:"تحديث ملفات HAR"},{depth:2,id:"ما-ينبغي-للوكيل-فعله-وما-لا-ينبغي",text:"ما ينبغي للوكيل فعله وما لا ينبغي"},{depth:2,id:"حين-تكون-pageroute-هي-الأداة-الأفضل",text:"حين تكون page.route هي الأداة الأفضل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>يتحدّث Shelf إلى <a href="https://openlibrary.org/developers/api">واجهة Open Library البرمجية</a> للبحث عن الكتب. إنها خدمة مجانية رائعة — وهي أيضًا ليست شيئًا أريد أن تعتمد عليه مجموعة اختباراتي من طرف إلى طرف.</p>
<p>وها هي المشكلة. يشغّل خط CI اختبارًا يبحث عن «Station Eleven» عبر واجهة Open Library الحقيقية. في معظم الأيام ينجح. وفي بعض الأيام يكونون بطيئين، أو يغيّرون شكل الاستجابة، أو يحدّون من معدّل طلباتك. فيتحوّل فرع <code>main</code> إلى الأحمر ويقضي فريقك عشرين دقيقة ليكتشف أن العطل ليس في شيفرتك — بل في خادم شخص آخر.</p>
<p>الحل هو التوقّف عن مخاطبة الخادم الحقيقي في الاختبارات وإعادة تشغيل تسجيل بدلًا من ذلك. لدى Playwright أداة مدمجة لهذا — تسجيل HAR — وهي واحدة من أكثر ميزات الإطار إهمالًا.</p>
<h2 id="ما-هو-ملف-har">ما هو ملف HAR</h2>
<p>HAR اختصار HTTP Archive. وهو صيغة JSON — معيارية، وإن كان كل أداة يضيف نكهته الخاصة (يضمّن Chrome توقيتات الصفحة، وتخزّن Playwright أجسام الاستجابات مفكوكة الترميز) — تسجّل جلسة HTTP كاملة. والبنية الجوهرية واحدة في كل مكان: <code>log.entries[]</code>، حيث تحمل كل مدخلة زوج طلب/استجابة واحدًا مع الـ URL والطريقة والترويسات والجسم والتوقيت. يستطيع Chrome DevTools تصدير واحد. وتستطيع Playwright تسجيلها وإعادة تشغيلها معًا.</p>
<p>الـ HAR المسجّل هو لقطة لما <em>فعلته</em> الشبكة فعلًا خلال جلسة متصفح واحدة. وحين تعيد تشغيله، تعترض Playwright الطلبات الصادرة وتقدّم الاستجابة المسجّلة المطابقة بدلًا من ترك الطلب يصل إلى الشبكة الحقيقية. ولا يستطيع المتصفح التمييز بين الاثنين.</p>
<h2 id="التسجيل">التسجيل</h2>
<p>تسجّل ملف HAR بتشغيل اختبار (أو سكربت) في وضع التسجيل. الواجهة المفضّلة في Playwright هي <a href="https://playwright.dev/docs/mock#mocking-with-har-files"><code>page.routeFromHAR</code></a> مع <code>update: true</code>. ومسار <code>tests/fixtures/</code> أدناه هو الاصطلاح الذي تتبنّاه هذه الدورة لملفات HAR الثابتة؛ وهو ليس مجلدًا يأتي مع نسخة Shelf الانطلاقية، لذا ستنشئه أول مرة تسجّل فيها.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;search for books&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/open-library-search.har&#x27;</span>, {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span>,
    <span class="hljs-attr">update</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &lt;-- record mode</span>
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Search&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;Station Eleven&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Search&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Emily St. John Mandel&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>يأخذ خيار <code>url</code> <a href="https://playwright.dev/docs/network#glob-url-patterns">نمط glob</a> (<code>*</code> يطابق أي شيء عدا <code>/</code>، و<code>**</code> يطابق أي شيء بما فيه <code>/</code>، ويجب أن يطابق الـ glob الـ URL الكامل). وتقبل Playwright أيضًا <code>RegExp</code> هنا. أما خيار <code>update</code> فهو قيمة منطقية افتراضها <code>false</code> (وضع إعادة التشغيل).</p>
<p>شغّل هذا مرة واحدة، مع <code>update: true</code>، موجّهًا إلى الـ API الحقيقي. تسجّل Playwright كل طلب مطابق وتكتب ملف HAR إلى <code>tests/fixtures/open-library-search.har</code>. افتحه في محرّرك — إنه JSON، وهو ضخم، وعليك أن تقاوم تحريره يدويًا.</p>
<p>وثمّة تفصيل من توثيق <a href="https://playwright.dev/docs/api/class-page">واجهة Page</a> يهمّ هنا: حين تسجّل مع <code>update: true</code>، تكتب Playwright الـ HAR المحدّث عند إغلاق الصفحة أو سياق المتصفح. وإذا قتلت التشغيل مبكرًا، فقد تجد نفسك تتساءل إلى أين ذهب التحديث. والجواب عادة «لم تدع السياق يُغلق بنظافة أبدًا».</p>
<p>وهذا يهمّ أكثر حين تنشئ السياقات يدويًا. أغلق السياق صراحةً قبل أن تغلق المتصفح أو تعلن انتهاء المهمة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>();
<span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();

<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/open-library-search.har&#x27;</span>, {
  <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span>,
  <span class="hljs-attr">update</span>: <span class="hljs-literal">true</span>,
});

<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search&#x27;</span>);
<span class="hljs-comment">// ... drive the recording flow ...</span>

<span class="hljs-keyword">await</span> context.<span class="hljs-title function_">close</span>();
<span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">close</span>();
</code></pre>
<p>استخدم هذه القاعدة حين «ينجح» تحديث HAR لكن الملف على القرص لا يتغيّر أبدًا، أو حين ينشئ مساعد إضافي سياقات إضافية للنوافذ المنبثقة أو الأدوار البديلة ثم يغلق المتصفح فقط. فـ Playwright تُفرغ تحديث الـ HAR عند تفكيك السياق، لا حسب المزاج.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>ملفات HAR ثابتة يولّدها الآلة، ببيانات طلب/استجابة متداخلة وملفات أجسام مرفقة اختيارية. والتعديلات اليدوية العابرة هشّة — فمن السهل كسر جسم استجابة أو إبطال مطابقة دون أن تدرك. أتمت التغييرات بسكربت وتحقق دائمًا من إعادة التشغيل بعدها.</p>
</blockquote>
<p>أودِع ملف HAR في المستودع. هذا ليس اختياريًا — فالفكرة كلها أن يقرأ الاختبار الـ HAR من القرص في التشغيل التالي ولا يمسّ الشبكة الحقيقية.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ملفات HAR ثابتة اختبارية ومكانها نظام التحكّم بالإصدارات، لكن راجعها قبل الإيداع. فبيانات الاعتماد وكوكيز الجلسة والبيانات الشخصية يمكن أن تختبئ في أجسام الاستجابات والترويسات. راجع <a href="https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording">مقاربات تسجيل HAR</a> لإرشادات التنقية، واستخدم مستخدم اختبار مخصصًا (انظر <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">مصادقة حالة التخزين</a>) لتقليل ما يحتاج إلى تنقية.</p>
</blockquote>
<h2 id="إعادة-التشغيل">إعادة التشغيل</h2>
<p>احذف الآن سطر <code>update: true</code> (أو اضبطه على <code>false</code>):</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;search for books&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/open-library-search.har&#x27;</span>, {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/openlibrary.org/**&#x27;</span>,
    <span class="hljs-comment">// update omitted—replay mode</span>
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Search&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;Station Eleven&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Search&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Emily St. John Mandel&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>شغّل الاختبار. يعمل في أجزاء من الثانية بدلًا من ثوانٍ. يعمل على متن طائرة. يعمل حين تكون Open Library متوقفة. ويعمل بالطريقة نفسها في كل تشغيل، لأن الاستجابة حرفيًا ملف على القرص.</p>
<p>هذه هي الحتمية كملف — لا حتمية مستمدّة من منطق محاكاة تصونه في الشيفرة، بل من أثر مسجّل على القرص. وهذه هي الخدعة السحرية بأكملها.</p>
<h2 id="قواعد-المطابقة-ولماذا-تلدغ">قواعد المطابقة، ولماذا تلدغ</h2>
<p>الجزء الذي يُوقِع الناس في الخطأ هو كيف تقرّر Playwright أي استجابة مسجّلة تقدّم. فمطابقة إعادة تشغيل HAR تعتمد على الـ URL وطريقة HTTP اعتمادًا صارمًا. وللطلبات <code>POST</code> تطابق أيضًا الحمولة. وإذا طابقت مدخلات متعددة، تختار Playwright المدخلة ذات أكبر عدد من الترويسات المطابقة. ونادرًا ما يهمّ هذا الفاصل في نداءات API — فالـ URL مع الطريقة ينتجان عادة مطابقة واحدة — لكنه يظهر في الطلبات التي يبدأها المتصفح حيث تتشارك المدخلات URL واحدًا وتختلف بـ <code>Accept</code> أو <code>Referer</code>.</p>
<p>إذا أرسل اختبارك طلبًا إلى <code>https://openlibrary.org/search.json?q=Station+Eleven</code> وكان في الـ HAR فقط <code>...q=Station%20Eleven&amp;limit=10</code>، فهذا طلب مختلف بقدر ما يخصّ طبقة إعادة التشغيل. وهذا ليس خاصًا بـ Playwright — فـ HTTP يعامل <code>?a=1&amp;b=2</code> و<code>?b=2&amp;a=1</code> كعنوانين مختلفين.</p>
<p>وهذا ميزة وفخّ في آن واحد.</p>
<ul>
<li>إنه ميزة لأن إعادة التشغيل دقيقة — فاختباران يسجّلان استعلامي بحث مختلفين ينتجان مدخلات HAR لا تتصادم أبدًا.</li>
<li>وإنه فخّ لأن عميل HTTP في تطبيقك قد يرسل طلبات تشبه بعضها ظاهريًا لكنها تختلف في ترويسة أو معامل استعلام ما، فلا يطابقها الـ HAR.</li>
</ul>
<p>وفيما يلي بضع طرق لجعله أقل حدّة:</p>
<p><strong>اجعل شكل الطلب حتميًا.</strong> إذا كان غلاف fetch لديك يسلسل معاملات الاستعلام بترتيب مختلف بين تشغيل وآخر، فستخطئ إعادة تشغيلك. أصلح توليد الطلب أولًا — فالـ HAR ليس المكان لتغطية مستدعين غير حتميين.</p>
<p><strong>أبقِ <code>notFound: 'abort'</code> هو الافتراضي.</strong> الخيار <code>'abort'</code> (وهو الافتراضي) يقتل الطلبات غير المطابقة فورًا — فيرى المتصفح خطأ شبكة، ويفشل اختبارك بصوت عالٍ. أما <code>'fallback'</code> فيتيح للطلبات غير المطابقة المرور إلى معالجات مسارات أخرى ثم إلى الشبكة الحقيقية في النهاية. استخدم <code>'fallback'</code> فقط حين تريد أن تكون <em>بعض</em> الطلبات حيّة بينما تعيد تشغيل حركة الـ API وحدها.</p>
<p>خيار <code>'fallback'</code> ذاك ليس افتراضيًا نظريًا. إنه الطريقة النظيفة لبناء إعداد هجين حيّ ومعاد التشغيل: أعد تشغيل الـ API الذي يهمّك، ودع كل شيء آخر يكمل عبر سلسلة المسارات العادية، وأبقِ الاختبار صريحًا بشأن موضع الحدّ الحيّ.</p>
<p><strong>سجّل سيناريو واحدًا في المرة.</strong> ملف HAR واحد لكل ملف اختبار، محصور في سيناريو واحد، أسهل في إعادة التوليد والتنقيح حين ينكسر.</p>
<p><strong>حين ترى «request not found in HAR».</strong> ترمي Playwright هذا الخطأ حين يطابق طلب ما glob الـ <code>url</code> لكن لا تطابق أي مدخلة HAR الـ URL الكامل + الطريقة + الحمولة. والأسباب الشائعة: تغيّر ترتيب معامل استعلام، أو ظهرت ترويسة جديدة، أو جسم الطلب مختلف قليلًا. <strong>افحص الفرق أولًا</strong> — قارن ما يرسله الاختبار بما في الـ HAR. شغّل مع <code>DEBUG=pw:api</code> لترى الطلب المحدد الذي حاولت Playwright مطابقته. ولا تعد التسجيل إلا بعد أن تفهم <em>لماذا</em> تغيّر الطلب.</p>
<p>حين يطلق تطبيقك طلبات متزامنة إلى نقطة النهاية نفسها (مثلًا ثلاثة عمليات fetch متوازية إلى <code>/api/books/:id</code>)، تختار Playwright عمومًا مدخلة غير مستخدمة حين تطابق عدة مدخلات HAR الـ URL والطريقة نفسيهما، فيحصل كل طلب متزامن على استجابة مميزة.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>إذا سلسل تطبيقك نداءات API — باستخدام URL من الاستجابة A لإصدار الطلب B — فقد يختلف الـ URL الثاني بين تسجيل وآخر. فالـ URLs الموقّعة، وإعادات التوجيه الحاملة لـ nonce، ومؤشرات ترقيم الصفحات لن تطابق عند إعادة التشغيل. في هذه الحالات، يكون <a href="https://playwright.dev/docs/mock"><code>page.route</code></a> مع معالج مخصص أداة أفضل من إعادة تشغيل HAR.</p>
</blockquote>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>إعادة تشغيل HAR عديمة الحالة — كل طلب يحصل على الاستجابة المسجّلة نفسها بصرف النظر عمّا حدث سابقًا في الاختبار. وإذا كان اختبارك يتوقع أن <em>تتغيّر</em> استجابة بناءً على إجراء سابق (أضف كتابًا، ثم اسرد الكتب متوقعًا الكتاب الجديد)، فلن يعكس الـ HAR هذا التطور. وللتدفقات المعتمدة على الحالة، ازرع الحالة المتوقعة قبل الاختبار وسجّل الـ HAR مقابل تلك البذرة المعروفة.</p>
</blockquote>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تعترض Service Workers طلبات الشبكة <em>قبل</em> أن يراها معالج المسار في Playwright. فإذا سجّل تطبيقك Service Worker (شائع في تطبيقات PWA أو حين تثبّت مكتبة واحدًا للتخزين المؤقت)، فإن تلك الطلبات تتجاوز <code>routeFromHAR</code> كليًا — إذ تُقدَّم من ذاكرة Service Worker المؤقتة، لا من الـ HAR. اضبط <code>serviceWorkers: 'block'</code> في إعداد Playwright حين تعتمد على إعادة تشغيل HAR.</p>
</blockquote>
<p>وثمّة تجعيدة أخرى في طبقة المسارات: إذا فتح اختبارك نافذة منبثقة، فإن معالجًا محصورًا بالصفحة (بما فيه <code>page.routeFromHAR()</code>) لا يعترض أول طلب في النافذة المنبثقة. فتلك الملاحة الأولى تنتمي إلى سياق المتصفح. وإذا كانت حركة النوافذ المنبثقة جزءًا من التدفق، فسجّل إعادة تشغيل HAR على طبقة <code>browserContext</code> بدلًا من طبقة الصفحة.</p>
<h2 id="تحديث-ملفات-har">تحديث ملفات HAR</h2>
<p>تشيخ ملفات HAR. يضيف فريق Open Library حقلًا إلى استجابة البحث، أو يلغي حقلًا كان تطبيقك يقرأه، ولا يعرف الـ HAR القديم بذلك. فينجح الاختبار مقابل التسجيل بينما التطبيق الحقيقي مكسور.</p>
<p>قاعدتي: <strong>أعد التوليد وفق جدول، في CI، في مهمة ليلية.</strong> لا في كل تشغيل — فذلك يهدم الحتمية. المهمة الليلية تستهدف اختبارات HAR وحدها، وتعيد التسجيل مع تعطيل إعادة المحاولات وبمستخدم اختبار مخصص، وتقارن النتائج، وتفتح PR إذا تغيّر أي شيء. ويراجع إنسان الفرق. والإشارة النمطية: حقل جديد أو محذوف في جسم استجابة.</p>
<p>هذه إعادة توليد <em>مجدولة</em> لالتقاط انحراف المنبع — لا إعادة تسجيل عند الطلب لإسكات اختبار فاشل. وحين يفشل اختبار لأن الـ HAR لا يطابق، فالسؤال الأول هو <em>لماذا</em> تغيّر شكل الطلب. إذا كانت شيفرتك قد غيّرت الطلب، فأصلح الشيفرة أو أعد التسجيل عن قصد. وإذا تغيّرت واجهة API في المنبع، فالمهمة الليلية وُجدت لذلك. فإعادة التسجيل الأعمى تخفي الأخطاء والانحراف معًا.</p>
<p>يعرض <a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">درس التحقّق الليلي</a> سير عمل CI لهذا، بما فيه مهمة <code>har-refresh</code> النائبة.</p>
<h2 id="ما-ينبغي-للوكيل-فعله-وما-لا-ينبغي">ما ينبغي للوكيل فعله وما لا ينبغي</h2>
<p>تسجيل HAR ليس أداة أريد أن يمدّ الوكلاء أيديهم إليها دون طلب. فالتسجيل يتضمن نداءات شبكة حقيقية، وقد تحتوي ملفات HAR على بيانات اعتماد في عدة مواضع: ترويسات الطلب <code>Authorization</code> و<code>Cookie</code>، وترويسات الاستجابة <code>Set-Cookie</code>، وأجسام الطلب أو الاستجابة (تبادلات OAuth، ومعاملات مفاتيح API). عليك تنقيتها.</p>
<p>قاعدة ملف تعليماتي بشأن ملفات HAR:</p>
<pre><code class="language-markdown"><span class="hljs-section">## HAR recording</span>

<span class="hljs-bullet">-</span> HAR files live in <span class="hljs-code">\`tests/fixtures/\`</span> and are replayed via
  <span class="hljs-code">\`page.routeFromHAR\`</span>.
<span class="hljs-bullet">-</span> Never commit a new HAR file without a human reviewing it. HARs can
  contain credentials, session tokens, and private data from third-party
  APIs. Review in the Git diff before committing.
<span class="hljs-bullet">-</span> Do not re-record a HAR to &quot;fix&quot; a failing test. If the HAR no longer
  matches the application&#x27;s requests, the application changed in a way
  that deserves investigation, not a blind rerecording.
<span class="hljs-bullet">-</span> When a HAR must be regenerated (e.g., because the upstream API
  legitimately changed), regenerate it in a standalone commit so the
  diff is clear.
<span class="hljs-bullet">-</span> If a helper or script creates a manual browser context for HAR
  recording, close that context explicitly so the updated HAR is
  flushed to disk.
<span class="hljs-bullet">-</span> Approved HAR refresh (the nightly CI job or a human-initiated
  re-recording workflow) is different from ad-hoc re-recording to
  silence a failing test. The refresh workflow is expected to change
  HARs; an agent fixing a red test is not.
</code></pre>
<p>قاعدة «لا تعد التسجيل لإصلاح اختبار فاشل» هي التي ستشكرني عليها. فالوكلاء يعشقون جعل الاختبارات الفاشلة تنجح بإعادة التسجيل. وغالبًا ما يكون ذلك تغطية على خطأ حقيقي.</p>
<h2 id="حين-تكون-pageroute-هي-الأداة-الأفضل">حين تكون <code>page.route</code> هي الأداة الأفضل</h2>
<p>إذا كنت تحتاج فقط إلى محاكاة نقطة نهاية أو نقطتين باستجابات مكتوبة يدويًا، فإعادة تشغيل HAR عادة مبالغة. استخدم <a href="https://playwright.dev/docs/mock"><code>page.route</code></a> بدلًا من ذلك وأبقِ المحاكاة في الشيفرة.</p>
<p>يغطي الدرس المخصص، <a href="https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception">اعتراض الشبكة القائم على المسارات</a>، متى تستخدم <code>route.fulfill</code> و<code>route.abort</code> و<code>route.continue</code>؛ وكيف يعمل ترتيب المسارات حين يتعايش <code>page.route</code> و<code>page.routeFromHAR</code>؛ ومتى تكون محاكاة صغيرة صريحة أنظف من HAR مسجّل.</p>
<p>والنسخة القصيرة هي:</p>
<ul>
<li>استخدم ملفات HAR حين تريد التقاط شريحة أكبر من الحركة الحقيقية وإعادة تشغيلها.</li>
<li>استخدم المسارات حين تريد محاكاة صغيرة صريحة أو فشلًا محاكى.</li>
<li>استخدم <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">حالة التخزين</a> للمصادقة، لا إعادة تشغيل HAR.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>يجب ألّا تعتمد مجموعة اختباراتك من طرف إلى طرف على أي خادم لا تتحكم به. فملفات HAR تتيح لك تسجيل الواقع مرة واحدة وإعادة تشغيله إلى الأبد، وهكذا تحصل على اختبارات تنجح على متن طائرة. والثمن مهمة تحديث أسبوعية وقاعدة بأن التسجيل ليس طريقتك في إصلاح الاختبارات الفاشلة. وكلاهما رخيص.</p>
<p>وللتنظيم، أبقِ ملف HAR واحدًا لكل ملف اختبار في <code>tests/fixtures/</code>، مسمّى باسم ملف الاختبار الذي يخدمه. وإذا تجاوز حجم الـ HAR بضع مئات من الكيلوبايتات، فقسّم ملف الاختبار كي يغطي كل HAR سيناريو أضيق. ويمكن أن تنمو ملفات HAR الكبيرة (الصور، والبيانات المرقّمة) إلى ميغابايتات — وهي تُضغط جيدًا في git، لكن ذلك إشارة إلى تضييق glob الـ <code>url</code>.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording">مقاربات تسجيل HAR</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception">اعتراض الشبكة القائم على المسارات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">مصادقة حالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a></li>
</ul>
`,l={book:s,chapter:e,chapterTitle:n,slug:a,title:t,headings:o,html:p};export{s as book,e as chapter,n as chapterTitle,l as default,o as headings,p as html,a as slug,t as title};
