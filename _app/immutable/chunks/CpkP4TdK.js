const s="kinney",e="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="rewrite-the-bad-claude-md-solution",a="الحل",o=[{depth:2,id:"ما-يعرضه-المستودع-الحالي",text:"ما يعرضه المستودع الحالي"},{depth:3,id:"الافتتاحية",text:"الافتتاحية"},{depth:3,id:"ما-معنى-الانتهاء",text:"«ما معنى الانتهاء»"},{depth:3,id:"المسارات",text:"المسارات"},{depth:3,id:"كيف-تكتب-الاختبارات",text:"كيف تُكتب الاختبارات"},{depth:3,id:"قواعد-محددات-playwright",text:"قواعد محدّدات Playwright"},{depth:3,id:"مصادقة-playwright-أضيفت-لاحقا",text:"مصادقة Playwright (أُضيفت لاحقًا)"},{depth:3,id:"تهيئة-قاعدة-البيانات-والعزل-أضيفا-لاحقا",text:"تهيئة قاعدة البيانات والعزل (أُضيفا لاحقًا)"},{depth:3,id:"تسجيل-har-أضيف-لاحقا",text:"تسجيل HAR (أُضيف لاحقًا)"},{depth:3,id:"إتاحة-الوصول-أضيفت-لاحقا",text:"إتاحة الوصول (أُضيفت لاحقًا)"},{depth:3,id:"حين-يفشل-اختبار-أضيف-لاحقا",text:"حين يفشل اختبار (أُضيف لاحقًا)"},{depth:3,id:"نصوص-الواجهة",text:"نصوص الواجهة"},{depth:3,id:"الطبقة-الثابتة-أضيفت-لاحقا",text:"الطبقة الثابتة (أُضيفت لاحقًا)"},{depth:3,id:"خطافات-git-والأسرار-أضيفت-لاحقا",text:"خطّافات git والأسرار (أُضيفت لاحقًا)"},{depth:3,id:"لا-تفعل",text:"«لا تفعل»"},{depth:2,id:"ما-زال-عليك-تشغيله",text:"ما زال عليك تشغيله"},{depth:2,id:"ملاحظة-عن-قيد-الستين-سطرا",text:"ملاحظة عن قيد الستين سطرًا"},{depth:2,id:"أنماط-تأخذها-معك",text:"أنماط تأخذها معك"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>ملف <code>CLAUDE.md</code> الحالي في Shelf هو الذي أستخدمه فعلًا حين أوجّه Claude Code إلى المستودع. إنه ليس إجابة مرجعية تُحفظ — بل أثر عمل تطوّر عبر ذلك الإحكام نفسه الذي يطلبه هذا المختبر. ستختلف نسختك، وذلك حسن. المهم أن كل سطر ينجح في اختبارين: هل يستطيع الوكيل التصرّف فيه آليًا، وهل كنت ستلاحظ لو لم يفعل؟</p>
<p>دعني أستعرض ما يفعله الملف المشحون ولماذا.</p>
<h2 id="ما-يعرضه-المستودع-الحالي">ما يعرضه المستودع الحالي</h2>
<p>يعيش الملف في جذر المستودع باسم <code>CLAUDE.md</code>. افتحه وتابع.</p>
<h3 id="الافتتاحية">الافتتاحية</h3>
<pre><code class="language-markdown"><span class="hljs-section"># Shelf Starter Instructions</span>

Shelf is the starter repository for the <span class="hljs-strong">**Self-Testing AI Agents**</span> course.
It is a real SvelteKit + TypeScript book application, not a generated scaffold.
</code></pre>
<p>جملتان. صار الوكيل يعرف أن هذا تطبيق حقيقي، لا قالبًا مؤقّتًا. وتلك الكلمة الواحدة — «ليس سقالة مولّدة» — تمنع الوكيل من التعامل مع الشيفرة كشيء يُرمى. إنها قاعدة تأطير متنكّرة في هيئة وصف.</p>
<h3 id="ما-معنى-الانتهاء">«ما معنى الانتهاء»</h3>
<pre><code class="language-markdown"><span class="hljs-bullet">1.</span> <span class="hljs-code">\`npm run typecheck\`</span>
<span class="hljs-bullet">2.</span> <span class="hljs-code">\`npm run lint\`</span>
<span class="hljs-bullet">3.</span> <span class="hljs-code">\`npm run test\`</span>
</code></pre>
<p>ثلاثة أوامر مسمّاة، مرتّبة. تقول القاعدة «لا ينتهي حتى تخرج الثلاثة بالرمز صفر، بهذا الترتيب». لا مجال للمراوغة، ولا «ينبغي أن تشغّل على الأرجح». والترتيب مهم: فحص الأنواع يلتقط أرخص الأخطاء أولًا، ثم التدقيق، ثم مجموعة الاختبارات كاملة. يشغّلها الوكيل من أعلى إلى أسفل ويتوقّف عند أول فشل. ولاحقًا في الدورة، سيضيف مختبر الطبقة الثابتة خطوة لكشف الشيفرة الميتة (<code>npm run knip</code>) بين التدقيق والاختبار.</p>
<p>كل واحد من تلك الأوامر موجود في <code>package.json</code>. ويمكنك التحقّق بنفسك:</p>
<pre><code class="language-bash"><span class="hljs-keyword">for</span> cmd <span class="hljs-keyword">in</span> typecheck lint <span class="hljs-built_in">test</span>; <span class="hljs-keyword">do</span>
  grep -q <span class="hljs-string">&quot;\\&quot;<span class="hljs-variable">$cmd</span>\\&quot;:&quot;</span> package.json &amp;&amp; <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-variable">$cmd</span>: found&quot;</span> || <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-variable">$cmd</span>: MISSING&quot;</span>
<span class="hljs-keyword">done</span>
</code></pre>
<h3 id="المسارات">المسارات</h3>
<p>يسمّي الملف مسارات دقيقة — <code>/</code>، <code>/login</code>، <code>/design-system</code>، <code>/search</code>، <code>/shelf</code> — ويقول أيها عام وأيها محمي. ويقول أيضًا <em>كيف</em> تعمل الحماية: «احجب من جهة الخادم على <code>locals.user</code>، لا بحواجز العميل أبدًا». هذا قيد تنفيذ محدّد، لا تعليمة غامضة مثل «أمّن مساراتك».</p>
<p>سطر «لا تُعِد إدخال <code>src/routes/demo/</code>» هو نوع القواعد التي تبدو تافهة حتى يولّد الوكيل صفحة تجريبية في الثانية صباحًا فتقضي عشرين دقيقة في معرفة من أين جاءت.</p>
<h3 id="كيف-تكتب-الاختبارات">كيف تُكتب الاختبارات</h3>
<pre><code class="language-markdown"><span class="hljs-bullet">-</span> Write a failing test before the implementation. Commit the test first.
<span class="hljs-bullet">-</span> Unit tests live next to the file under test as <span class="hljs-code">\`&lt;name&gt;.test.ts\`</span> and run with Vitest.
<span class="hljs-bullet">-</span> End-to-end tests live in <span class="hljs-code">\`tests/end-to-end/\`</span> and run with Playwright.
</code></pre>
<p>ثلاث قواعد، كل واحدة تسمّي نمط ملف أو دليلًا محدّدًا. يعرف الوكيل أين يضع الاختبارات دون سؤال، ويعرف ترتيب TDD دون أن تذكّره في منتصف المهمة.</p>
<h3 id="قواعد-محددات-playwright">قواعد محدّدات Playwright</h3>
<pre><code class="language-markdown"><span class="hljs-bullet">-</span> <span class="hljs-code">\`getByRole\`</span> first. <span class="hljs-code">\`getByLabel\`</span> or <span class="hljs-code">\`getByText\`</span> second.
  <span class="hljs-code">\`data-testid\`</span> only when semantics genuinely don&#x27;t exist.
</code></pre>
<p>هذا يسمّي ثلاث واجهات برمجية محدّدة في Playwright بترتيب أولوية. إنه ليس «استخدم محدّدات متاحة للوصول» — بل «استخدم <code>getByRole</code>، ثم <code>getByLabel</code>، ثم <code>data-testid</code>». يستطيع الوكيل أن يطابق مخرجاته على النمط ويصحّح نفسه.</p>
<p>حظر <code>page.waitForTimeout</code> و<code>waitForLoadState('networkidle')</code> معزّز هنا <em>وأيضًا</em> في إعداد ESLint. حزام وحمّالة. فيصطدم الوكيل بقاعدة التدقيق حتى لو تخطّى قراءة <code>CLAUDE.md</code>.</p>
<h3 id="مصادقة-playwright-أضيفت-لاحقا">مصادقة Playwright (أُضيفت لاحقًا)</h3>
<p>بعد مختبر حالة التخزين، سيسمّي الملف ملف إعداد المصادقة الذي ينتجه المختبر (شيء مثل <code>tests/authentication.setup.ts</code>). وقاعدة «لا تسجّل الدخول أبدًا من داخل اختبار عادي» تمنع أشيع نمط مضادّ في Playwright — وتمنح الوكيل تشخيصًا ملموسًا: «إن أعاد اختبار التوجيه إلى <code>/login</code>، فملف الإعداد مكسور». بذرة اليوم الأول لا تحتوي ملف إعداد مصادقة ولا قسمًا له.</p>
<h3 id="تهيئة-قاعدة-البيانات-والعزل-أضيفا-لاحقا">تهيئة قاعدة البيانات والعزل (أُضيفا لاحقًا)</h3>
<p>بعد مختبر الحالة الحتمية، سيسمّي الملف <code>tests/helpers/seed.ts</code> و<code>tests/data/users.json</code> و<code>src/lib/server/users.ts</code> و<code>resetShelfContent</code> و<code>seedFreshDatabase</code>. كل اسم في هذا القسم ملف أو قيمة إعداد يستطيع الوكيل التحقّق منها. وقاعدة عدم إعادة تعيين المستخدمين داخل المواصفات الفردية من نوع ما يستغرق ساعة لتنقيحه أول مرة تصادفه — وصفر ثانية لمنعه بجملة واحدة. مساعدات البذر موجودة في المستودع اليوم، لكن قسم <code>CLAUDE.md</code> عنها يستحقّه المختبر.</p>
<h3 id="تسجيل-har-أضيف-لاحقا">تسجيل HAR (أُضيف لاحقًا)</h3>
<p>بعد مختبر تسجيل HAR، سيحمل الملف قاعدة تبدو تقريبًا هكذا:</p>
<pre><code class="language-markdown"><span class="hljs-bullet">-</span> HARs live in <span class="hljs-code">\`tests/fixtures/\`</span> and replay through <span class="hljs-code">\`page.routeFromHAR\`</span>
  with <span class="hljs-code">\`notFound: &#x27;abort&#x27;\`</span>.
</code></pre>
<p>دليل محدّد، وواجهة برمجية محدّدة، وخيار محدّد. وقاعدة «لا تلتزم ملف HAR جديدًا دون مراجعة بشرية» من نوع الحواجز التي لا تهمّ إلا مرة — وحين تهمّ، تهمّ <em>حقًا</em>، لأن ملفات HAR قد تحتوي كوكيز جلسات. و<code>tests/fixtures/</code> غير موجود في بذرة اليوم الأول؛ مختبر HAR هو ما يُدخله.</p>
<h3 id="إتاحة-الوصول-أضيفت-لاحقا">إتاحة الوصول (أُضيفت لاحقًا)</h3>
<p>بعد مختبر إتاحة الوصول، سيسمّي الملف <code>tests/accessibility.spec.ts</code> ووثيقة قائمة التحقّق السريعة التي ينتجها المختبر. ملفان بمسؤوليات واضحة: المواصفة تلتقط ما تستطيع الأتمتة إثباته، والقائمة توثّق ما لا تستطيع. ولا وجود لأي من الملفين في بذرة اليوم الأول.</p>
<h3 id="حين-يفشل-اختبار-أضيف-لاحقا">حين يفشل اختبار (أُضيف لاحقًا)</h3>
<p>بعد مختبر ملف التشخيص، سيكون في Shelf قسم إجراء تشخيصي من خمس خطوات. ستسمّي الخطوة الأولى أمرًا محدّدًا (<code>npm run dossier</code>، يضيفه ذلك المختبر)؛ وستسمّي الخطوة الخامسة أداة محدّدة (<code>npx playwright show-trace &lt;path&gt;</code>). وقاعدة «لا تصلح اختبارًا فاشلًا بتغيير التوقّع» تمنع أشيع نمط فشل للوكيل رأيته في الواقع. ملف <code>CLAUDE.md</code> الانطلاقي يحمل أصلًا الصيغة الأضيق من تلك القاعدة («لا تصلح اختبار Playwright فاشلًا بتغيير التوقّع ليطابق واجهة مكسورة»)؛ أما الإجراء التشخيصي الكامل فيُضاف بعد إنجاز مختبر ملف التشخيص.</p>
<h3 id="نصوص-الواجهة">نصوص الواجهة</h3>
<pre><code class="language-markdown"><span class="hljs-bullet">-</span> User-facing copy stays about books, shelves, and reading.
  Do not mention Playwright, seeded fixtures, test IDs, HARs,
  or course material in rendered page copy.
</code></pre>
<p>هذه قاعدة «أبقِ المنتج على شكل منتج». فبدونها سيعرض الوكيل بسرور «Seeded test book #3» على صفحة يُفترض أن تبدو متتبّع قراءة حقيقيًا.</p>
<h3 id="الطبقة-الثابتة-أضيفت-لاحقا">الطبقة الثابتة (أُضيفت لاحقًا)</h3>
<p>بعد مختبر الطبقة الثابتة، سيسمّي الملف ملفات إعداد ملموسة بالمسار: <code>eslint.config.js</code> و<code>tsconfig.json</code> موجودان في جذر المستودع اليوم، وسيضيف المختبر <code>knip.json</code>. ويسرد القسم أعلام مترجم TypeScript الدقيقة المفعّلة ويقول «لا تتجاوزها بـ <code>@ts-expect-error</code>». فيعرف الوكيل مستوى الصرامة دون قراءة <code>tsconfig.json</code> نفسه — وإن كان ينبغي أن يتحقّق مع ذلك. لا شيء من هذا القسم موجود في البذرة.</p>
<h3 id="خطافات-git-والأسرار-أضيفت-لاحقا">خطّافات git والأسرار (أُضيفت لاحقًا)</h3>
<p>بمجرد اكتمال مختبرَي الطبقة الثابتة والخطّافات، سيحمل Shelf قسمًا يسمّي <code>lefthook</code> و<code>gitleaks</code> بالاسم، ويشير إلى ملف إعداد الخطّافات (<code>lefthook.yml</code>)، ويذكر غلاف اللقطة المرحلية الذي ينتجه المختبر. وقاعدة «الطُعم» المتعمّد في الـ fixtures تمنع الوكيل من «إصلاح» تركيبة اختبار مزروعة. لا شيء من هذا في ملف <code>CLAUDE.md</code> لليوم الأول — فالقسم تستحقّه الدروس التي تُدخل تلك الأدوات.</p>
<h3 id="لا-تفعل">«لا تفعل»</h3>
<p>أربعة محظورات محدّدة في الملف المشحون: لا <code>any</code> ولا <code>@ts-expect-error</code>، ولا <code>eslint-disable</code>، ولا إضافات تبعيات دون علم، ولا تحرير يدوي للمخرجات المولّدة. كل واحد يسمّي الشيء الدقيق الذي لا ينبغي فعله. لا غموض، ولا تفسير مطلوب. ولاحقًا في الدورة، سيضيف مختبر الخطّافات حظر <code>--no-verify</code> إلى هذه القائمة — وعندها سيحمل الملف خمسة محظورات.</p>
<h2 id="ما-زال-عليك-تشغيله">ما زال عليك تشغيله</h2>
<p>معايير القبول في المختبر كلها قابلة للفحص آليًا. وهذا كل أمر تحقّق:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Line count (must be 60 or fewer)</span>
<span class="hljs-built_in">wc</span> -l CLAUDE.md

<span class="hljs-comment"># Banned vague words</span>
grep -iE <span class="hljs-string">&#x27;clean|best practices|good|appropriate&#x27;</span> CLAUDE.md

<span class="hljs-comment"># Commands exist in package.json</span>
<span class="hljs-keyword">for</span> cmd <span class="hljs-keyword">in</span> typecheck lint <span class="hljs-built_in">test</span>; <span class="hljs-keyword">do</span>
  grep -q <span class="hljs-string">&quot;\\&quot;<span class="hljs-variable">$cmd</span>\\&quot;:&quot;</span> package.json &amp;&amp; <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-variable">$cmd</span>: ok&quot;</span> || <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-variable">$cmd</span>: MISSING&quot;</span>
<span class="hljs-keyword">done</span>

<span class="hljs-comment"># Playwright locator API named</span>
grep -E <span class="hljs-string">&#x27;getByRole|getByLabel|getByText|data-testid&#x27;</span> CLAUDE.md

<span class="hljs-comment"># Specific file path named (pick any path mentioned, verify it resolves)</span>
<span class="hljs-built_in">ls</span> tests/
<span class="hljs-built_in">ls</span> tests/data/

<span class="hljs-comment"># Linting and tests still pass</span>
npm run typecheck
npm run lint
npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>والالتزام:</p>
<pre><code class="language-bash">git add CLAUDE.md
git commit -m <span class="hljs-string">&#x27;lab(rewrite-the-bad-claude-md): tighten instructions for mechanical enforcement&#x27;</span>
</code></pre>
<h2 id="ملاحظة-عن-قيد-الستين-سطرا">ملاحظة عن قيد الستين سطرًا</h2>
<p>يطلب المختبر أن تُبقي الملف تحت ستين سطرًا. وملف <code>CLAUDE.md</code> المشحون نحو 46 سطرًا اليوم، ويبقى مشدودًا عن قصد. المختبرات اللاحقة — إتاحة الوصول، وتسجيل HAR، وتهيئة قاعدة البيانات، والطبقة الثابتة — يستحقّ كل منها قسمه حين تصل إليه، فينمو الملف كلما أثبتت القواعد قيمتها. والملف الذي تكتبه <em>اليوم</em> ينبغي أن يكون تحت ستين سطرًا. والملف الذي تنتهي به الدورة سيكون أطول، لأن قواعد أكثر استحقّت مكانها.</p>
<p>إن كنت تنفّذ هذا المختبر بمعزل، فاقتطع إلى 60. وإن كنت تقرأ هذا بعد إنجاز عدة دروس لاحقة، فسيكون ملفك قد تراكمت فيه إضافات تتجاوز البذرة المشحونة. وكلاهما صحيح في لحظته.</p>
<h2 id="أنماط-تأخذها-معك">أنماط تأخذها معك</h2>
<ul>
<li><strong>سمِّ الأمر، لا المفهوم.</strong> «<code>npm run typecheck</code>» قابل للفرض. و«تأكّد من صحة الأنواع» ليس كذلك.</li>
<li><strong>سمِّ الملف، لا المبدأ.</strong> «ضع مواصفات Playwright في <code>tests/</code>» يصمد عند النسخ واللصق في مهمة. و«اتّبع اصطلاحات الاختبار» لا يصمد.</li>
<li><strong>احظر الشيء المحدّد.</strong> «لا تستخدم <code>@ts-expect-error</code>» يبعد عن التحقّق خطوة grep واحدة. و«حافظ على سلامة الأنواع» حكم تقديري سيتّخذه الوكيل على نحو مختلف عنك.</li>
<li><strong>الأقصر أعلى صوتًا.</strong> كل سطر تحذفه يجعل قراءة الأسطر الباقية أرجح. ملف <code>CLAUDE.md</code> من 200 سطر اقتراح. وملف من 60 سطرًا أمر.</li>
<li><strong>الملف وثيقة حيّة.</strong> ستضيف إليه كلما نما المستودع. والانضباط ليس «اكتبه مرة واحدة بإتقان» — بل «استحقّ كل سطر».</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-rewrite-the-bad-claude-md">مختبر: أعد كتابة ملف CLAUDE.md السيئ</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in">تعليمات تربط الوكيل بالحلقة</a></li>
</ul>
`,l={book:s,chapter:e,chapterTitle:n,slug:t,title:a,headings:o,html:c};export{s as book,e as chapter,n as chapterTitle,l as default,o as headings,c as html,t as slug,a as title};
