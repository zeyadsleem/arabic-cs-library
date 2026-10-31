const t="kinney",e="testing",s="مدخل إلى الاختبارات",n="differences-between-jest-and-vitest",i="الفروق بين Jest وVitest",p=[{depth:2,id:"أي-إطار-اختبارات-ينبغي-أن-أستخدم",text:"أي إطار اختبارات ينبغي أن أستخدم؟"},{depth:2,id:"السرعة-والأداء",text:"السرعة والأداء"},{depth:3,id:"jest",text:"Jest"},{depth:3,id:"vitest",text:"Vitest"},{depth:2,id:"الإعداد-ومنحنى-التعلم",text:"الإعداد ومنحنى التعلّم"},{depth:3,id:"jest-1",text:"Jest"},{depth:3,id:"vitest-1",text:"Vitest"},{depth:2,id:"المحاكاة-والبدائل",text:"المحاكاة والبدائل"},{depth:3,id:"jest-2",text:"Jest"},{depth:3,id:"vitest-2",text:"Vitest"},{depth:2,id:"دعم-typescript",text:"دعم TypeScript"},{depth:3,id:"jest-3",text:"Jest"},{depth:3,id:"vitest-3",text:"Vitest"},{depth:2,id:"اختبار-لقطات-الحالة",text:"اختبار لقطات الحالة"},{depth:3,id:"jest-4",text:"Jest"},{depth:3,id:"vitest-4",text:"Vitest"},{depth:2,id:"أيهما-يناسبك",text:"أيّهما يناسبك؟"}],a=`<blockquote>
<p><strong>لست بحاجة إلى قراءة هذا</strong></p>
<p>الفرق بينهما ضئيل جدًا، والأرجح أنه لا يهم أيّهما تختار. أنا أستخدم Vitest لأنني أعمل على مشاريع تستخدم عادةً <a href="https://vite.dev/">Vite</a>. الأمر بهذه البساطة.</p>
</blockquote>
<h2 id="أي-إطار-اختبارات-ينبغي-أن-أستخدم">أي إطار اختبارات ينبغي أن أستخدم؟</h2>
<p>بصراحة، لا يهم حقًا. Jest مبني على Jasmine، و<a href="https://vitest.dev/guide/comparisons.html">Vitest بديل مباشر لـ Jest</a> (في معظمه). سنستخدم Vitest خلال وقتنا معًا، لكن كل ما نفعله ينبغي أن ينطبق على Jest أيضًا. وإذا حدث ولم ينطبق، فسأحرص على الإشارة إلى ذلك.</p>
<p>لكن إن كنت تريد حقًا معرفة القاعدة التي أستند إليها، فهي:</p>
<ul>
<li>Jest تدعمه Facebook، التي تدعم أيضًا بالمناسبة <a href="https://reactjs.org/docs/testing-recipes.html#gatsby-focus-wrapper">React</a>. وهو يأتي مدمجًا مع <a href="https://reactjs.org/docs/create-a-new-react-app.html#create-react-app">Create React App</a>. لذا سأستخدم Jest عادةً إن كان موجودًا أصلًا لأنني <em>كسول جدًا</em>.</li>
<li><a href="https://vitest.dev/">Vitest</a> مُحسّن للعمل مع Vite (بديل لـ Webpack). وبشكل افتراضي، تستخدم تطبيقات Vue وSvelte أداة Vite. ويمكن لتطبيقات React استخدام Vite أيضًا، بل ثمّة قالب جاهز (مثل <code>npm create vite@latest my-app --template react</code>، الذي يعمل بشكل يثير الشك في تشابهه مع <code>create-react-app</code>). اخترته لهذه الدورة لأنه الأوسع قابلية للتطبيق.</li>
<li><a href="https://angular.io/guide/testing">Angular</a> يستخدم Jasmine افتراضيًا. لكن كما قلت، Jest مبني على Jasmine وVitest بديل مباشر لـ Jest.</li>
</ul>
<h2 id="السرعة-والأداء">السرعة والأداء</h2>
<h3 id="jest">Jest</h3>
<p>Jest موجود منذ زمن طويل. بنته Facebook، وهو مثالي لاختبار تطبيقات React (وغيرها!)، وله سمعة في أنه يمنحك كل ما تحتاجه جاهزًا: المحاكاة، ولقطات الحالة، وكل ما تسمّيه. لكن إليك المشكلة. قد يبدو Jest أحيانًا… <em>بطيئًا</em> قليلًا. ليس بطيئًا بطء الجليد، لكنه بطيء بما يكفي لتبدأ في التساؤل إن كانت شيفرتك تعاني أزمة وجودية في كل مرة تُشغّل فيها مجموعة الاختبارات. وهو يستخدم بيئة تشغيل Node حصريًا، وهذا رائع للاستقرار، لكنه قد يحدّ من سرعة تنفيذه مقارنةً بأساليب أخرى.</p>
<h3 id="vitest">Vitest</h3>
<p>وVitest؟ مبني على <strong>Vite</strong>، أجل، ذلك المُجمّع فائق السرعة، وتصبح ميزة السرعة هذه إحدى بطاقاته التعريفية. يتكئ Vitest على منظومة Vite ويستخدم <strong>ESM (وحدات EcmaScript)</strong>، مما يتيح أوقات بدء سريعة جدًا واختبارًا فائق السرعة، خاصةً في <em>وضع التطوير</em>. والقدرة على تشغيل الاختبارات مباشرةً في متصفّح دون إعداد إضافي تمنح دفعة كبيرة في السرعة للمشاريع الكثيفة الواجهات الأمامية، وهي كما نعرف جميعًا 90% مما نفعله هذه الأيام، أليس كذلك؟</p>
<h2 id="الإعداد-ومنحنى-التعلم">الإعداد ومنحنى التعلّم</h2>
<h3 id="jest-1">Jest</h3>
<p>إعداد Jest ليس أسوأ ما ستواجهه كمهندس؛ هل جرّبت يومًا تهيئة Webpack من الصفر في نحو 2018؟ إنه يأتي بكل ما تحتاجه مضمّنًا، لذا في 90% من الأوقات تثبّته، وانتهى الأمر: لديك مجموعة اختبارات عاملة.</p>
<p>لكن، وهو «لكن» كبير، قد تتحول مجموعة ميزات واجهة Jest أحيانًا إلى منطقة «حسنًا، دعني أعود إليك بعد أسبوع». فإن كنت تتعامل مع ميزات أحدث مثل الاختبار المتوازي أو حتى تلميحات الأنواع أحيانًا، فستجد نفسك فجأة غارقًا في التوثيق.</p>
<h3 id="vitest-1">Vitest</h3>
<p>أما Vitest، فبالمقارنة، يقدّم بداية أكثر سلاسة إن كنت <em>بالفعل</em> داخل منظومة Vite. فبالطريقة نفسها التي «يعمل بها» Jest مع React، «يعمل بها» Vitest مع المشاريع المدعومة بـ Vite. التهيئة بسيطة، والصياغة تكاد تطابق Jest (فلا يشعر من ينتقل بأنه أُلقي في بلد أجنبي)، وهو خفيف جدًا من حيث الإعداد.</p>
<p>هل أعددت Vite مسبقًا؟ إذن أنت تقريبًا على بعد 90% من الطريق. كأن Vitest اقترب منك في المقهى وقال بهدوء: «مرحبًا… لا شيء مهم، لكن… أتريد اختبار هذا؟»</p>
<h2 id="المحاكاة-والبدائل">المحاكاة والبدائل</h2>
<h3 id="jest-2">Jest</h3>
<p>الآن، إن كان ثمة جانب يتألّق فيه Jest، فهو المحاكاة المدمجة. بعض المطورين يعيشون ويموتون بقدرة Jest القوية على محاكاة الوحدات والدوال والكائنات، وكل ما تسمّيه. يجعلها Jest سهلة للغاية، ولا تحتاج عادةً إلى مكتبات خارجية للقيام بالعمل الشاق.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> myModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;./myModule&#x27;</span>);
jest.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./myModule&#x27;</span>);
</code></pre>
<p>وها قد حصلت على بديل مُحاكى. وهي ميزة مفضّلة لدى كثيرين لأن المحاكاة كثيرًا ما تصنع الفرق بين تشغيل اختبارات في ثلاث دقائق وقضاء أصيل في مصارعة الاعتمادات.</p>
<h3 id="vitest-2">Vitest</h3>
<p>يستطيع Vitest المحاكاة أيضًا، لكنه ليس على مستوى Jest تمامًا… بعد. فرغم أنه يدعم محاكاة الوحدات والدوال وما شابه، فإن بعض الاستخدامات الأكثر تعقيدًا، مثل المحاكاة التلقائية، ما زالت تلحق بالركب. غير أنه يتكامل بسهولة مع <strong>Sinon.js</strong> ويستطيع التعامل مع معظم البدائل المُحاكاة الشائعة الحاجة دون عناء.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> myModule <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./myModule&#x27;</span>;
vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./myModule&#x27;</span>);
</code></pre>
<p>أرأيت؟ متشابه نحويًا مع Jest، لكنه مختلف قليلًا تحت الغطاء.</p>
<h2 id="دعم-typescript">دعم TypeScript</h2>
<h3 id="jest-3">Jest</h3>
<p>يعمل Jest مع TypeScript بالفعل، لكن إعداده يتطلّب بعض الجهد. سيكون عليك التأكد من أن مُحوّلك (عادةً <strong>Babel</strong> أو <strong>ts-jest</strong>) مُهيّأ بشكل صحيح مع المحوّلات المناسبة، وهذا بصراحة مصدر إزعاج، وغالبًا المصدر الأساسي للحظات «أي جحيم جديد دخلت فيه للتو».</p>
<h3 id="vitest-3">Vitest</h3>
<p>القصة مختلفة مع Vitest. فبما أن Vite يدعم <strong>ESM</strong> و<strong>TypeScript</strong> بطبيعته، يرث Vitest هذه الروعة. لا حاجة إلى <strong>Babel</strong> أو محوّلات خاصة؛ فقط وجّهه إلى ملفات TypeScript لديك وانطلق. بجد، يبدو الأمر كالغش عندما ترى مدى سلاسة ذلك. لا حيل طبقة ترجمة هنا!</p>
<h2 id="اختبار-لقطات-الحالة">اختبار لقطات الحالة</h2>
<h3 id="jest-4">Jest</h3>
<p>اختبار لقطات الحالة ميزة قاتلة أخرى من ميزات Jest. تُنشئ لقطة لدوال واجهتك أو مكوناتك، ويحرص Jest على ألا تتغير تلك اللقطات إلا إذا أردت ذلك صراحةً. وهو مناسب جدًا لـ React أو أي واجهة تريد مراقبتها عن كثب.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">expect</span>(component.<span class="hljs-title function_">toJSON</span>()).<span class="hljs-title function_">toMatchSnapshot</span>();
</code></pre>
<p>طمأنينة فورية.</p>
<h3 id="vitest-4">Vitest</h3>
<p>يدعم Vitest لقطات الحالة أيضًا. لكن إن كنت قد بنيت جبلًا من لقطات Jest، فهي ليست قابلة للنقل <em>مباشرة</em>. هذا يعني أن الانتقال قد يتطلب بعض العمل في التحويل، وأن وظيفة لقطات الحالة في Vitest ليست بالمستوى نفسه من النضج، في الوقت الحالي على الأقل. إنها تؤدي الغرض، لكنني لن أعلن الاحتفال بالانتقال من أجل اللقطات وحدها.</p>
<h2 id="أيهما-يناسبك">أيّهما يناسبك؟</h2>
<p>في نهاية اليوم، <em>كلاهما</em> رائع لاختبار مشاريع JavaScript لديك. لكن إليك الخلاصة العملية:</p>
<ul>
<li><strong>هل تستخدم Vite ومنظومة حديثة؟</strong> ستنعم على الأرجح بأوقات بدء أسرع في Vitest، وتكاملات سلسة مع TypeScript، وبساطة.</li>
<li><strong>هل تعتمد اعتمادًا عميقًا على واجهات المحاكاة أو التوازي أو لقطات الحالة في Jest؟</strong> قد يظل Jest متوّجًا بالنسبة إليك، خاصةً إن كان مدمجًا أصلًا في أدواتك وسير عملك.</li>
</ul>
`,c={book:t,chapter:e,chapterTitle:s,slug:n,title:i,headings:p,html:a};export{t as book,e as chapter,s as chapterTitle,c as default,p as headings,a as html,n as slug,i as title};
