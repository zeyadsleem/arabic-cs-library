const s="kinney",e="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="fixtures-worker-scoped-test-scoped",t="التجهيزات: على مستوى العامل، وعلى مستوى الاختبار، والفخّ بينهما",p=[{depth:2,id:"ما-هي-التجهيزة-فعلا",text:"ما هي التجهيزة فعلًا"},{depth:2,id:"التفكيك-هو-كل-الفكرة",text:"التفكيك هو كل الفكرة"},{depth:2,id:"تركيب-التجهيزات-هو-حيث-يترسخ-النموذج-الذهني",text:"تركيب التجهيزات هو حيث يترسّخ النموذج الذهني"},{depth:2,id:"تجاوز-التجهيزات-المدمجة",text:"تجاوز التجهيزات المدمجة"},{depth:2,id:"هندسة-التقارير-جزء-من-تصميم-التجهيزة",text:"هندسة التقارير جزء من تصميم التجهيزة"},{depth:2,id:"محدودة-بالاختبار-مقابل-محدودة-بالعامل",text:"محدودة بالاختبار مقابل محدودة بالعامل"},{depth:2,id:"متى-لا-تجعل-الشيء-تجهيزة",text:"متى لا تجعل الشيء تجهيزة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الذي-يجب-تذكره",text:"الشيء الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>أول <code>test.extend</code> تكتبه يبدو كالسحر. خمسة اختبارات تنطوي في توقيع واحد نظيف بلا <code>beforeEach</code>، ويقصر ملف المواصفات، وتشعر أنك ساحر. والخامس يبدو كقفص. الوكلاء يعشقون التجهيزات لأنها تطوي الإعداد، <em>ويعشقونها</em> أيضًا لأن التجهيزة مكان رائع لإخفاء الحالة. والحالة المخفية هي كيف تصبح مجموعات الاختبار بطيئة ومتذبذبة ويستحيل التفكير فيها.</p>
<p>فلنتحدّث إذن عمّا هي التجهيزات فعلًا، ومتى تلجأ إليها، والخطأين المحددين الذين سيرتكبهما الوكلاء إن لم تضع قضبانًا حول هذا.</p>
<p>مختبر Shelf لهذا الدرس ملموس عن قصد: نقطة البداية في <code>tests/labs/fixtures/fixtures.ts</code>، والمجلد المرجعي <code>tests/labs/fixtures/</code>، وملف المواصفات الممارس هو <code>fixtures-lab.spec.ts</code>. ولا تشحن نسخة Shelf الانطلاقية إعدادًا أو سكربتًا مخصصًا للمختبر في هذه الشريحة، لذا يطلب منك المختبر عزله بنفسك بإعداد مؤقت أو أمر ضيق مكافئ. وعمليًا يعني ذلك عادةً نسخ <code>playwright.config.ts</code> الجذري إلى <code>playwright.lab.local.config.ts</code> مؤقت وحذف تجاهل <code>tests/labs/fixtures/**</code> وحده. أبقِ أسماء الملفات هذه في ذهنك وأنت تقرأ بقية الدرس، لأن المختبر يطلب منك إعادة هيكلة الشيء الحقيقي لا اختراع مثال لعبة.</p>
<h2 id="ما-هي-التجهيزة-فعلا">ما هي التجهيزة فعلًا</h2>
<p>كل اختبار Playwright كتبته يومًا يستخدم تجهيزات أصلًا. <code>page</code> و<code>context</code> و<code>browser</code> و<code>request</code> — ليست متغيرات عامة يمنحك إياها الإطار. إنها <em>تجهيزات</em>. تفحص Playwright الوسائط التي تفكّكها دالة اختبارك، وتبحث عن تعريفات التجهيزات المطابقة، وتشغّلها (بترتيب التبعيات، مع التفكيك)، وتسلّم النتائج لاختبارك. و<code>test.extend</code> هي طريقتك لإضافة تجهيزاتك إلى ذلك النظام.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> base } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-property">extend</span>&lt;{ <span class="hljs-attr">seededReader</span>: { <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span> } }&gt;({
  <span class="hljs-attr">seededReader</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span> });
  },
});
</code></pre>
<p>هذا هو الشكل. تتلقى دالة التجهيزة <em>التجهيزات الأخرى</em> التي تعتمد عليها (وهذه لا تعتمد على شيء، ومن هنا التفكيك الفارغ) ونداء <code>use</code>. وأي شيء تمرّره إلى <code>use</code> هو ما يحصل عليه اختبارك حين يطلب <code>seededReader</code>. وكل ما بعد <code>await use(...)</code> هو تفكيك.</p>
<blockquote>
<p><strong>التفكيك الفارغ</strong></p>
<p>ستصرخ قاعدة <code>no-empty-pattern</code> في ESLint بشأن <code>async ({}, use) =&gt;</code>. إما أن تعطّلها سطريًا أو تبني التجهيزة لتعتمد على <code>request</code> أو <code>browser</code> على الأقل. فشكل الكائن الفارغ هو صيغة Playwright الاصطلاحية — لا تخترع حلًا بديلًا يخفي حقيقة أنها تجهيزة.</p>
</blockquote>
<h2 id="التفكيك-هو-كل-الفكرة">التفكيك هو كل الفكرة</h2>
<p>هنا أرى الوكلاء يخطئون في هذا بانتظام. يرون إعداد التجهيزة، ويتركون تفكيكها، فينتهون بحالة تتسرّب إلى الاختبار التالي. فنداء <code>use</code> <em>هو</em> الفاصل بين الإعداد والتفكيك. وكل ما قبل <code>use</code> يعمل قبل الاختبار. وكل ما بعده يعمل بعده.</p>
<pre><code class="language-typescript"><span class="hljs-attr">seededShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(request);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>(); <span class="hljs-comment">// teardown: leaves the server clean</span>
};
</code></pre>
<p><code>resetShelfContent</code> الثاني هو ما سينساه الوكيل. وهذه هي طريقة الفشل التي تكلفك يومًا: الاختبار التالي يرث أي حالة تركها هذا الاختبار. فيبدو العرَض كتذبذب. والسبب نصف تفكيك ناقص. والإصلاح أربعة أحرف: كلمة <code>await</code> في سطر لم يكن موجودًا.</p>
<p>ونسخة «الـ await المفقود» أسوأ. فإذا كان التفكيك موجودًا لكنه غير مُنتظَر، حسبت Playwright أن التجهيزة انتهت ومضت. فيتسابق التفكيك مع إعداد الاختبار التالي، فتحصل على فساد حالة لا يظهر إلا تحت الحمل. انتظر تفكيكك بـ <code>await</code> دائمًا. دائمًا.</p>
<h2 id="تركيب-التجهيزات-هو-حيث-يترسخ-النموذج-الذهني">تركيب التجهيزات هو حيث يترسّخ النموذج الذهني</h2>
<p>تستطيع تجهيزة أن تعتمد على تجهيزة أخرى. هذا كل شيء. هذه هي الميزة. يبدو صغيرًا، وهو أنفع شيء واحد في المنظومة كلها:</p>
<pre><code class="language-typescript"><span class="hljs-attr">authenticatedRequest</span>: <span class="hljs-title function_">async</span> ({ playwright }, use) =&gt; {
  <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> playwright.<span class="hljs-property">request</span>.<span class="hljs-title function_">newContext</span>({
    <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>,
  });
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(context);
  <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">dispose</span>();
};
</code></pre>
<p>الآن أي اختبار يطلب <code>authenticatedRequest</code> يحصل على <code>APIRequestContext</code> يحمل أصلًا كوكي جلسة القارئ. لم تكن مضطرًا لتسجيل الدخول من جديد. ولم تكن مضطرًا لقراءة ملف حالة التخزين بنفسك. ركّبت تجهيزة على أخرى، فحصل المستدعي على شيء أعلى مستوى مما تمنحه Playwright جاهزًا.</p>
<p>هذه هي اللحظة التي يترسّخ فيها النموذج الذهني: تجهيزاتك وتجهيزات Playwright المدمجة لها الشكل نفسه. تستطيع البناء فوقها، و — كما يوضّح القسم التالي — تستطيع حتى استبدالها.</p>
<h2 id="تجاوز-التجهيزات-المدمجة">تجاوز التجهيزات المدمجة</h2>
<p><code>page</code> و<code>context</code> و<code>browser</code> في Playwright هي نفسها تجهيزات معرّفة في <code>test</code> الأساسي. تستطيع تجاوزها بـ <code>test.extend</code>، فيصبح فجأة كل ما كان صحيحًا في تجهيزاتك المخصصة صحيحًا في تجهيزات الإطار.</p>
<p>نسخة Shelf المكتملة بملفات تشخيص الفشل تفعل هذا بالضبط. فبعد مختبر ملفات التشخيص، سيتجاوز <code>tests/fixtures.ts</code> لديك <code>page</code> ليمرّر أخطاء وحدة تحكّم المتصفح وطلبات الشبكة الفاشلة إلى stderr، فتظهر في مبلّغ <code>list</code>، وتقرير HTML، وملف تشخيص JSON:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-title function_">extend</span>({
  <span class="hljs-attr">page</span>: <span class="hljs-title function_">async</span> ({ page }, use) =&gt; {
    page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;console&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">message</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (message.<span class="hljs-title function_">type</span>() === <span class="hljs-string">&#x27;error&#x27;</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`[browser error] <span class="hljs-subst">\${message.text()}</span>\`</span>);
      }
    });
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(page);
  },
});
</code></pre>
<p>لاحظ الشكل. <code>page: async ({ page }, use)</code> — التجهيزة <em>مسماة</em> <code>page</code> و<em>تعتمد على</em> <code>page</code>. ذلك الـ <code>page</code> الثاني هو المدمج. فالتجهيزة تغلّف المدمج وتسلّم نسخة مزخرفة للاختبار. وكل مواصفة تستورد <code>test</code> من هذا الملف تحصل على تمرير أخطاء وحدة التحكّم مجانًا. لا دالة غلاف. لا <code>beforeEach</code>. لا شرح في وصف الـ PR.</p>
<p>وإعادة التأطير التي أريدك أن تستوعبها: حين تجد نفسك تكتب دالة مساعدة تغلّف <code>page</code>، توقف. لا تحتاج إلى غلاف. تحتاج إلى تجاوز.</p>
<h2 id="هندسة-التقارير-جزء-من-تصميم-التجهيزة">هندسة التقارير جزء من تصميم التجهيزة</h2>
<p>لا تشكّل التجهيزات بيئة الاختبار وحدها. بل تشكّل أيضًا التقرير الذي يقرأه الوكيل لاحقًا.</p>
<p>تمنحك <a href="https://playwright.dev/docs/test-fixtures">وثائق التجهيزات</a> بضع أدوات تحكّم أنفع مما تبدو:</p>
<ul>
<li><code>box: true</code> يخفي تجهيزات المساعدة المزعجة من التقرير</li>
<li><code>box: 'self'</code> يخفي تجهيزة الغلاف مع إبقاء خطواتها الداخلية ظاهرة</li>
<li><code>title</code> يمنح التجهيزة اسمًا بشريًا مفيدًا في الأخطاء والتقارير</li>
</ul>
<p>وهذا يعني أن تجهيزة بنية تحتية قليلة الإشارة يمكن أن تبقى بعيدًا عن الطريق، بينما تجهيزة عالية الإشارة تعرّف نفسها بوضوح بدلًا من الظهور كعصيدة إعداد مجهولة.</p>
<h2 id="محدودة-بالاختبار-مقابل-محدودة-بالعامل">محدودة بالاختبار مقابل محدودة بالعامل</h2>
<blockquote>
<p><strong>قاعدة من سطر واحد</strong></p>
<p>اجعل التجهيزة محدودة بالعامل فقط حين تكون البيانات <em>للقراءة فقط</em> و<em>مكلفة</em> معًا. وإلا فمحدودة بالاختبار.</p>
</blockquote>
<p>التجهيزات محدودة بالاختبار افتراضيًا: تعمل جديدة لكل اختبار وتتفكك بعده. وتتيح لك Playwright أيضًا تحديد نطاق التجهيزة بالعامل، أي أنها تعمل مرة واحدة لكل عامل وتُشارك بين كل اختبار ينفّذه ذلك العامل. والصيغة هي مجموعة:</p>
<pre><code class="language-typescript"><span class="hljs-attr">constantsFromEnv</span>: [
  <span class="hljs-title function_">async</span> ({}, use) =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadExpensiveReadOnlyThing</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(data);
  },
  { <span class="hljs-attr">scope</span>: <span class="hljs-string">&#x27;worker&#x27;</span> },
];
</code></pre>
<p>الفخّ: أي شيء قابل للتغيير يصبح تسرّب حالة حين ترفعه إلى نطاق العامل. فتجهيزة «الرف المزروع» التي تعدّل قاعدة البيانات أسوأ مرشح ممكن، لأن كل اختبار في ذلك العامل يرى الحالة المعدّلة نفسها. فينجح الاختبار الأول، ويفشل الثاني لأن الأول أضاف كتابًا، وتقضي ساعة تحاول معرفة لماذا لا يصلح <code>test.describe.configure({ mode: 'serial' })</code> لذلك. (لن يصلح. فنطاق التجهيزة هو المشكلة.)</p>
<p>سيمدّ الوكلاء أيديهم إلى نطاق العامل لجعل المجموعة أسرع. لا تدعهم يفعلون ذلك دون تبرير من سطر واحد: هل البيانات للقراءة فقط، وهل هي مكلفة بما يكفي لتستحق النطاق المشترك؟ إذا كان أي الجوابين لا، فهي محدودة بالاختبار.</p>
<h2 id="متى-لا-تجعل-الشيء-تجهيزة">متى <em>لا</em> تجعل الشيء تجهيزة</h2>
<p>إذا كانت مساعدة تُستخدم في اختبار واحد، فهي دالة مساعدة، لا تجهيزة. فالتجهيزات تستحق تعقيدها بأنها تُشارك بين الاختبارات وبأنها تملك التفكيك. والسطر الواحد الذي ينشئ ثابتًا ليس تجهيزة. والدالة التي تستوردها في مواصفة واحدة ليست تجهيزة. فاحتفال <code>test.extend</code> موجود للحالات التي يكون فيها <em>ذلك</em> الاحتفال أرخص من البديل.</p>
<p>والنمط المضاد المحدد الذي أراه أكثر من غيره: يكتب وكيل «تجهيزة» لا تفعل شيئًا سوى نداء <code>page.goto('/shelf')</code> وتأكيد عنوان. تلك ليست تجهيزة. ذلك سطر شيفرة. احذفه، وضع الملاحة مباشرة في الاختبار، فيتقلّص ملف تجهيزاتك بالثلث.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Playwright fixtures</span>

<span class="hljs-bullet">-</span> Name fixtures after what they <span class="hljs-emphasis">_provide_</span>, not what they <span class="hljs-emphasis">_do_</span> (<span class="hljs-code">\`seededReader\`</span>, not <span class="hljs-code">\`setupUser\`</span>).
<span class="hljs-bullet">-</span> Every fixture that mutates state has a teardown half after <span class="hljs-code">\`await use(...)\`</span>, and the teardown is awaited.
<span class="hljs-bullet">-</span> Worker-scope a fixture only when the data is read-only AND expensive enough to justify sharing it. Add a one-line comment justifying the choice.
<span class="hljs-bullet">-</span> If a &quot;fixture&quot; is used in exactly one test, it&#x27;s a helper function. Move it out of the fixtures file.
<span class="hljs-bullet">-</span> Override Playwright&#x27;s built-in <span class="hljs-code">\`page\`</span>/<span class="hljs-code">\`context\`</span>/<span class="hljs-code">\`browser\`</span> with <span class="hljs-code">\`test.extend\`</span> when the wrapper would otherwise be a helper. Don&#x27;t reinvent a wrapper when an override already exists.
<span class="hljs-bullet">-</span> Use fixture report ergonomics on purpose: hide noisy fixtures with
  <span class="hljs-code">\`box\`</span>, use <span class="hljs-code">\`box: &#x27;self&#x27;\`</span> when only the wrapper is noise, and give
  important fixtures a human <span class="hljs-code">\`title\`</span>.
</code></pre>
<h2 id="الشيء-الذي-يجب-تذكره">الشيء الذي يجب تذكّره</h2>
<p>التجهيزة كائن مع تفكيك. الشكل سهل؛ والانضباط صعب. فإذا كتبت تجهيزة واحدة نسيت نصفها الثاني، فالثمن اختبار متذبذب بعد ست ساعات. وإذا كتبت تجهيزة واحدة وتركتها محدودة بالعامل على حالة قابلة للتغيير، فالثمن ظهيرة اليوم التالي بأكملها. والقضبان أعلاه موجودة لأنني دفعت الفاتورتين.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a> — حيث يُثمر انضباط التفكيك في هذا الدرس، لأن تجهيزة «ازرع ثم أعد الضبط» هي النسخة <em>الصحيحة</em> من «انتظر حتى يصبح التطبيق جاهزًا».</li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a> — الدرس الذي قدّم <code>resetShelfContent</code> و<code>seedFreshDatabase</code>، وهما المساعدتان التي تركّب عليهما معظم هذه التجهيزات.</li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests">اختبارات API وUI الهجينة</a> — الدرس الذي تظهر فيه تجهيزة <code>request</code> أول مرة كـ«شيء تستطيع نداءه في اختبار»، قبل أن يطلب منك هذا الدرس تركيبها.</li>
</ul>
`,l={book:s,chapter:e,chapterTitle:a,slug:n,title:t,headings:p,html:c};export{s as book,e as chapter,a as chapterTitle,l as default,p as headings,c as html,n as slug,t as title};
