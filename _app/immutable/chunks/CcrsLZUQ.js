const e="kinney",t="self-testing-ai-agents",o="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="lab-locator-challenges",d="مختبر",s=[{depth:2,id:"التهيئة",text:"التهيئة"},{depth:2,id:"ما-يمكنك-التحقق-منه-محليا",text:"ما يمكنك التحقق منه محليًا"},{depth:2,id:"ما-يبقى-يدويا-أو-خارجيا",text:"ما يبقى يدويًا أو خارجيًا"},{depth:2,id:"تسخين-أساسيات-الدور",text:"تسخين: أساسيات الدور"},{depth:2,id:"متوسط-رفع-الالتباس-والتسلسل",text:"متوسط: رفع الالتباس والتسلسل"},{depth:2,id:"النص-والمحتوى",text:"النص والمحتوى"},{depth:2,id:"الجداول-والقوائم",text:"الجداول والقوائم"},{depth:2,id:"المحتوى-الديناميكي",text:"المحتوى الديناميكي"},{depth:2,id:"النوافذ-الحوارية",text:"النوافذ الحوارية"},{depth:2,id:"aria-والأدوار",text:"ARIA والأدوار"},{depth:2,id:"الأنماط-المضادة-والبدائل",text:"الأنماط المضادة والبدائل"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"إضافي-إصلاح-المحددات-وتركيبها",text:"إضافي: إصلاح المحدِّدات وتركيبها"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>تدرّج المحدِّدات سهل الفهم وصعب الاستيعاب. أنت تعرف أن <code>getByRole</code> تأتي أولًا. وتعرف أن <code>data-testid</code> هي الملاذ الأخير. لكن حين تحدّق في صفحة وتحتاج إلى استهداف زر «Delete» <em>الثاني</em>، أو حقل إدخال بلا تسمية، أو عنصر قائمة على عمق ثلاثة مستويات — فمعرفة التدرّج شيء، وأن يكون التدرّج في عضلاتك شيء آخر.</p>
<p>هذا المختبر يعالج ذلك. يشحن Shelf صفحة <code>/playground</code> مبنية لهذا الغرض تحديدًا: أحد عشر قسمًا من أنماط واجهة المستخدم، كل واحد منها مصمَّم لتمرين جزء مختلف من عدّة المحدِّدات. مهمتك أن تكتب محدِّدات Playwright لكل تحدٍّ، وتشغّلها، وتراها تنجح. والمسار نفسه يعيش في <code>src/routes/playground/+page.svelte</code> في البادئ — لا تحتاج إلى تعديله، بل إلى استهدافه فقط.</p>
<p><img src="/arabic-cs-library/images/kinney/3690cd23a95816fb.webp" alt="الأقسام الأحد عشر لتمرين المحدِّدات في صفحة /playground المشحونة"></p>
<blockquote>
<p><strong>متطلب مسبق</strong></p>
<p>اسحب أحدث بادئ لـShelf، وشغّله بوضعك المحلي المعتاد، وانتقل إلى <code>/playground</code> لترى الصفحة التي ستستهدفها.</p>
</blockquote>
<blockquote>
<p><strong>أهداف الملاذ الأخير مقصودة أيضًا</strong></p>
<p>يُبقي الملعب عمدًا حفنة من الأنماط المضادة في إمكانية الوصول — <code>div</code> يتظاهر بأنه زر، وزر أيقونة فقط بلا اسم متاح — حتى يكون للتحدّيين 23 و24 هدف حقيقي. ويكتم بادئ Shelf الحالي تحذيرات Svelte المقابلة في تلك الصفحة كي يبقى <code>npm run typecheck</code> و<code>npm run build</code> نظيفين. والدرس المستفاد لم يتغيّر: إن لم تستطع الوصول إلى شيء إلا عبر <code>getByTestId</code>، فالمشكلة في الترميز نفسه.</p>
</blockquote>
<h2 id="التهيئة">التهيئة</h2>
<p>أنشئ ملف اختبار جديدًا في <code>tests/playground.spec.ts</code>. كل تحدٍّ كتلة <code>test()</code> واحدة. ويمكنك تشغيل الملف بالأمر:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> tests/playground.spec.ts
</code></pre>
<h2 id="ما-يمكنك-التحقق-منه-محليا">ما يمكنك التحقق منه محليًا</h2>
<p>هذا المختبر محلي بالكامل. وبما أن Shelf يعمل بالفعل، استهدف مسار الملعب المشحون في <code>src/routes/playground/+page.svelte</code>، واكتب التمارين في <code>tests/playground.spec.ts</code>، وشغّل <code>npx playwright test tests/playground.spec.ts</code> حتى يخضرّ الملف. واختم بـ<code>npm run typecheck</code> و<code>npm run build</code> لتكون قد أكّدت أن الملعب ما زال نظيفًا رغم أن القسمين 23 و24 ترميز سيئ عمدًا.</p>
<h2 id="ما-يبقى-يدويا-أو-خارجيا">ما يبقى يدويًا أو خارجيًا</h2>
<p>لا شيء هنا يعتمد على GitHub، ولا على معاينة نشر، ولا على خدمة طرف ثالث. والحكم الوحيد هو هل استخدم كل حل فعلًا المحدِّد الأعلى أولويةً المتاح له. فإن نجح اختبار لكنك مددت يدك إلى <code>getByTestId</code> أو إلى بديل مبكرًا، فذلك يُحتسب إخفاقًا لغرض المختبر.</p>
<h2 id="تسخين-أساسيات-الدور">تسخين: أساسيات الدور</h2>
<p><strong>التحدّي 1.</strong> حدّد زر «Add to shelf».</p>
<p><strong>التحدّي 2.</strong> حدّد زر «Cancel».</p>
<p><strong>التحدّي 3.</strong> حدّد زر «Out of stock» المعطّل، وتحقق أنه معطّل.</p>
<p><strong>التحدّي 4.</strong> حدّد حقل البحث عبر تسميته.</p>
<h2 id="متوسط-رفع-الالتباس-والتسلسل">متوسط: رفع الالتباس والتسلسل</h2>
<p><strong>التحدّي 5.</strong> يوجد زرّا «Delete» في الصفحة. حدّد <em>الأول</em>. (تلميح: <code>.first()</code> أو <code>.nth(0)</code> على محدِّد.)</p>
<p><strong>التحدّي 6.</strong> حدّد زر «Remove» داخل العنصر الثالث في «Reading list». ستحتاج إلى التسلسل: اعثر على القائمة، ثم على العناصر، ثم ضيّق إلى الثالث، ثم اعثر على الزر داخله.</p>
<p><strong>التحدّي 7.</strong> داخل المقالة المسمّاة «Piranesi by Susanna Clarke»، حدّد زر «Rate this book».</p>
<p><strong>التحدّي 8.</strong> حدّد حقل «Author» وتحقق أن نص تلميحه («Last name, first name») مرئي.</p>
<h2 id="النص-والمحتوى">النص والمحتوى</h2>
<p><strong>التحدّي 9.</strong> اعثر على الفقرة التي تذكر «42 days».</p>
<p><strong>التحدّي 10.</strong> اعثر على النص «3 of 12 books finished».</p>
<p><strong>التحدّي 11.</strong> فقرتان في الصفحة تحتويان كلمة «shelf». اعثر على التي تقول «You have 4 books on your shelf right now» — دون مطابقة الأخرى. (تلميح: <code>{ exact: true }</code> لن يفيدك هنا لأن أيًّا منهما ليس مطابقة دقيقة لـ«shelf». استخدم تعبيرًا نمطيًا أو سلسلة أطول.)</p>
<h2 id="الجداول-والقوائم">الجداول والقوائم</h2>
<p><strong>التحدّي 12.</strong> عُدّ صفوف البيانات في جدول «Book ratings» (دون صف الترويسة). تحقق أن عددها 3 بالضبط.</p>
<p><strong>التحدّي 13.</strong> حدّد «Reading list» وتحقق أن فيها 4 عناصر بالضبط.</p>
<h2 id="المحتوى-الديناميكي">المحتوى الديناميكي</h2>
<p><strong>التحدّي 14.</strong> انقر «Show details» وتحقق من ظهور فقرة التفاصيل الخاصة بـStation Eleven.</p>
<p><strong>التحدّي 15.</strong> انقر «Load more» وانتظر ظهور عنصري القائمة الجديدين. تحقق أن قائمة «Newly loaded books» فيها عنصران.</p>
<p><strong>التحدّي 16.</strong> تحقق أن «Loading…» مرئي، ثم انتظر اختفاءه وظهور «Content loaded». (في الصفحة تأخير ثانية واحدة مدمج — وتحققاتك يجب أن تتعامل معه.)</p>
<h2 id="النوافذ-الحوارية">النوافذ الحوارية</h2>
<p><strong>التحدّي 17.</strong> انقر زر «Rate this book» في قسم Dialogs وتحقق من ظهور نافذة حوارية.</p>
<p><strong>التحدّي 18.</strong> داخل النافذة الحوارية، اختر 4 نجوم وانقر «Save rating».</p>
<p><strong>التحدّي 19.</strong> افتح النافذة الحوارية مرة أخرى وأغلقها بزر «Cancel». تحقق أن النافذة الحوارية لم تعد مرئية.</p>
<h2 id="aria-والأدوار">ARIA والأدوار</h2>
<p><strong>التحدّي 20.</strong> حدّد التنبيه الذي يقول «Unsaved changes will be lost».</p>
<p><strong>التحدّي 21.</strong> حدّد شريط التقدّم وتحقق أن <code>aria-valuenow</code> قيمته <code>65</code>.</p>
<p><strong>التحدّي 22.</strong> حدّد زر «Toggle panel». تحقق أن <code>aria-expanded</code> مضبوطة على <code>false</code>. انقرها. تحقق أن <code>aria-expanded</code> صارت الآن <code>true</code> وأن محتوى اللوحة مرئي.</p>
<h2 id="الأنماط-المضادة-والبدائل">الأنماط المضادة والبدائل</h2>
<p><strong>التحدّي 23.</strong> جرّب تحديد <code>&lt;div&gt;</code> القابل للنقر بالدور (<code>getByRole('button')</code>). لن ينجح — فـ div بلا دور. حدّده عبر <code>data-testid</code> بدلًا من ذلك (<code>fake-button</code>). وهذه هي لحظة الدرس: إن لم تستطع العثور عليه بالدور، فالترميز مكسور.</p>
<p><strong>التحدّي 24.</strong> حدّد زر الأيقونة الوحيدة عبر <code>data-testid</code> (<code>icon-only-button</code>). هذا الزر بلا اسم متاح — ولا يستطيع <code>getByRole('button', { name: ... })</code> استهدافه. والقاعدة الحقيقية يجب أن تصلح الزر. ومجموعة الاختبارات يجب أن تستخدم <code>getByTestId</code> حتى يُصلَح.</p>
<h2 id="معايير-القبول">معايير القبول</h2>
<ul>
<li><code>tests/playground.spec.ts</code> موجود ويحتوي 20 اختبارًا ناجحًا على الأقل.</li>
<li>كل اختبار يستخدم استراتيجية المحدِّد الأعلى أولويةً المتاحة لهدفه.</li>
<li>لا اختبار يستخدم <code>page.locator()</code> بمحدِّد CSS خام قائم على الصنف. ومحدِّد <code>id</code> المشار إليه من <code>aria-controls</code> (انظر التحدّي 22) هو الاستثناء الطبيعي الوحيد.</li>
<li>اختبارات المحتوى الديناميكي (14–16) لا تستخدم <code>page.waitForTimeout</code>.</li>
<li>تشغيل <code>npx playwright test tests/playground.spec.ts</code> يُنتج كل شيء أخضر.</li>
</ul>
<h2 id="إضافي-إصلاح-المحددات-وتركيبها">إضافي: إصلاح المحدِّدات وتركيبها</h2>
<p>إن أردت التكرارات الأعلى عائدًا، فأضف هذه بعد الـ24 الأساسية:</p>
<ul>
<li><strong>التحدّي 25.</strong> ابدأ من محدِّد عريض عمدًا مثل <code>page.getByRole('article')</code>، ثم استخدم <code>filter({ hasText: 'Piranesi' })</code> أو <code>filter({ has: ... })</code> لتضييقه إلى البطاقة الوحيدة التي تريدها فعلًا. وانقر «Rate this book» داخل تلك البطاقة المفلترة.</li>
<li><strong>التحدّي 26.</strong> اكتب اختبارًا واحدًا ينتظر ظهور زر «Compose» <em>أو</em> نافذة حوارية أمنية باستخدام <code>locator.or(...).first()</code>. وإن فازت النافذة الحوارية، فأغلقها وواصل.</li>
<li><strong>التحدّي 27.</strong> اختر محدِّدًا متكررًا من الملف، وأعطه تسمية <code>describe('...')</code>، وافحص مخرجات التتبّع أو وضع واجهة المستخدم لترى المحدِّد المسمّى يظهر في الأدوات.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>المحدِّدات عضلة، لا حقيقة. يمكنك أن تقرأ عن <code>getByRole</code> طوال اليوم، لكن لحظة أن تضطر إلى رفع الالتباس بين زرّي «Delete» في صفحة حقيقية، إما أن يعيش التدرّج في أصابعك أو لا يعيش. هذا المختبر هو التكرارات.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحدّدات وتدرّج إمكانية الوصول</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locator-challenges-solution">تحدّيات المحدّدات: الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode">وضع واجهة المستخدم في Playwright</a></li>
</ul>
`,p={book:e,chapter:t,chapterTitle:o,slug:n,title:d,headings:s,html:c};export{e as book,t as chapter,o as chapterTitle,p as default,s as headings,c as html,n as slug,d as title};
