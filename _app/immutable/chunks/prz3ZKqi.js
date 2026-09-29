const t="go-style",o="index",e="نظرة عامة على دليل أسلوب Go",i="index",n="نظرة عامة على دليل أسلوب Go",l=[{depth:2,id:"حول",text:"حول"},{depth:3,id:"المستندات",text:"المستندات"},{depth:2,id:"التعريفات",text:"التعريفات"},{depth:2,id:"مراجع-إضافية",text:"مراجع إضافية"}],g=`<p>أسلوب Go | أدلة أسلوب Google</p>
<h1>أسلوب Go</h1>
<p>https://google.github.io/styleguide/go</p>
<p><a href="https://google.github.io/styleguide/go/index">نظرة عامة</a> | <a href="/arabic-cs-library/book/go-style/guide/index">دليل</a> | <a href="/arabic-cs-library/book/go-style/decisions-2/index">قرارات</a> | <a href="/arabic-cs-library/book/go-style/best-practices-2/index">أفضل الممارسات</a></p>
<h2 id="حول">حول</h2>
<p>يُقنِّن دليل أسلوب Go (Style Guide) والمستندات المصاحبة له أفضل المقاربات الحالية لكتابة شيفرة Go قابلة للقراءة (readability) ومتوافقة مع أعراف اللغة (idiomatic). ليس المقصود أن يكون الالتزام بدليل الأسلوب مطلقًا، ولن تكون هذه المستندات شاملة أبدًا. غايتنا هي تقليل التخمين في كتابة شيفرة Go قابلة للقراءة كي يتجنب القادمون الجدد إلى اللغة الأخطاء الشائعة. كذلك يخدم دليل الأسلوب توحيد إرشادات الأسلوب التي يقدمها أي شخص يراجع شيفرة Go في Google.</p>
<table>
<thead>
<tr>
<th>المستند</th>
<th>الرابط</th>
<th>الجمهور الأساسي</th>
<th><a href="#normative">معياري (normative)</a></th>
<th><a href="#canonical">مرجعي (canonical)</a></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>دليل الأسلوب</strong></td>
<td>https://google.github.io/styleguide/go/guide</td>
<td>الجميع</td>
<td>نعم</td>
<td>نعم</td>
</tr>
<tr>
<td><strong>قرارات الأسلوب</strong></td>
<td>https://google.github.io/styleguide/go/decisions</td>
<td>مرشدو قابلية القراءة</td>
<td>نعم</td>
<td>لا</td>
</tr>
<tr>
<td><strong>أفضل الممارسات</strong></td>
<td>https://google.github.io/styleguide/go/best-practices</td>
<td>كل من يهتم</td>
<td>لا</td>
<td>لا</td>
</tr>
</tbody>
</table>
<h3 id="المستندات">المستندات</h3>
<ol>
<li>يحدد <strong><a href="https://google.github.io/styleguide/go/guide">دليل الأسلوب</a></strong> أساس أسلوب Go في Google. هذا المستند نهائي ويُستخدم أساسًا للتوصيات الواردة في قرارات الأسلوب وأفضل الممارسات.</li>
<li><strong><a href="https://google.github.io/styleguide/go/decisions">قرارات الأسلوب</a></strong> مستند أكثر إسهابًا يلخص قرارات حول نقاط أسلوبية محددة ويناقش، حيثما كان ذلك مناسبًا، المنطق الكامن وراء هذه القرارات. قد تتغير هذه القرارات أحيانًا استنادًا إلى بيانات جديدة أو ميزات لغوية جديدة أو مكتبات جديدة أو أنماط ناشئة، لكن لا يُتوقع من مبرمجي Go الأفراد في Google مواكبة هذا المستند.</li>
<li><strong><a href="https://google.github.io/styleguide/go/best-practices">أفضل الممارسات</a></strong> توثق بعض الأنماط التي تطورت بمرور الوقت والتي تحل مشكلات شائعة، وتُقرأ جيدًا، وتصمد أمام احتياجات صيانة الشيفرة. أفضل الممارسات هذه ليست مرجعية (canonical)، لكن يُشجَّع مبرمجو Go في Google على استخدامها حيثما أمكن للحفاظ على وحدة قاعدة الشيفرة واتساقها.</li>
</ol>
<p>تهدف هذه المستندات إلى:</p>
<ul>
<li>الاتفاق على مجموعة من المبادئ لموازنة الأساليب البديلة</li>
<li>تقنين المسائل المستقرة في أسلوب Go</li>
<li>توثيق عادات Go اللغوية وتقديم أمثلة مرجعية لها</li>
<li>توثيق إيجابيات وسلبيات قرارات الأسلوب المختلفة</li>
<li>المساعدة في تقليل المفاجآت في مراجعات قابلية قراءة Go</li>
<li>مساعدة مرشدي قابلية القراءة على استخدام مصطلحات وإرشادات متسقة</li>
</ul>
<p>هذه المستندات <strong>لا</strong> تهدف إلى:</p>
<ul>
<li>أن تكون قائمة شاملة بالتعليقات التي يمكن تقديمها في مراجعة قابلية القراءة</li>
<li>سرد كل القواعد التي يُتوقع من الجميع تذكرها واتباعها في جميع الأوقات</li>
<li>أن تحل محل الحكم السليم في استخدام ميزات اللغة والأسلوب</li>
<li>تبرير تغييرات واسعة النطاق للتخلص من فروق الأسلوب</li>
</ul>
<p>ستوجد دائمًا فروق بين مبرمج Go وآخر، وبين قاعدة شيفرة فريق وآخر. ومع ذلك، فإن من مصلحة Google وAlphabet أن تكون قاعدة شيفرتنا متسقة قدر الإمكان. (راجع <a href="/arabic-cs-library/book/go-style/guide/index#consistency">الدليل (guide)</a> لمزيد من التفاصيل حول الاتساق (consistency).) وتحقيقًا لذلك، لا تتردد في إجراء تحسينات أسلوبية كما تراه مناسبًا، لكن ليس عليك التنقيب عن كل مخالفة لدليل الأسلوب تجدها. على وجه الخصوص، قد تتغير هذه المستندات بمرور الوقت، وهذا ليس سببًا لإحداث تغيير إضافي في قواعد الشيفرة القائمة؛ يكفي أن تكتب شيفرة جديدة باستخدام أحدث أفضل الممارسات وأن تعالج المسائل القريبة بمرور الوقت.</p>
<p>من المهم الإقرار بأن مسائل الأسلوب شخصية بطبيعتها وأن المقايضات متأصلة دائمًا. كثير من الإرشادات في هذه المستندات ذاتية، ولكن كما هو الحال مع <code>gofmt</code>، هناك قيمة كبيرة في التوحيد الذي توفره. وبناءً على ذلك، لن تُغيَّر توصيات الأسلوب دون نقاش مستحق، ويُشجَّع مبرمجو Go في Google على اتباع دليل الأسلوب حتى حين قد يختلفون معه.</p>
<h2 id="التعريفات">التعريفات</h2>
<p>الكلمات التالية، المستخدمة في جميع مستندات الأسلوب، معرَّفة أدناه:</p>
<ul>
<li><strong>مرجعي (Canonical)</strong>: يرسي قواعد إلزامية ودائمة. في هذه المستندات، يُستخدم مصطلح &quot;مرجعي&quot; لوصف شيء يُعتبر معيارًا ينبغي أن تتبعه كل الشيفرة (القديمة والجديدة) ولا يُتوقع أن يتغير جوهريًا بمرور الوقت. ينبغي أن يفهم المؤلفون والمراجعون على حد سواء المبادئ الواردة في المستندات المرجعية، لذا يجب أن يستوفي كل ما يُدرج في مستند مرجعي معيارًا عاليًا. وبناءً على ذلك، تكون المستندات المرجعية عمومًا أقصر وتفرض عناصر أسلوبية أقل من المستندات غير المرجعية. https://google.github.io/styleguide/go#canonical</li>
<li><strong>معياري (Normative)</strong>: يهدف إلى إرساء الاتساق. في هذه المستندات، يُستخدم مصطلح &quot;معياري&quot; لوصف عنصر أسلوبي متفق عليه لاستخدامه من قِبَل مراجعي شيفرة Go، حتى تكون الاقتراحات والمصطلحات والمبررات متسقة. قد تتغير هذه العناصر بمرور الوقت، وستعكس هذه المستندات مثل هذه التغييرات كي يبقى المراجعون متسقين ومواكبين. لا يُتوقع من مؤلفي شيفرة Go الإلمام بالمستندات المعيارية، لكن المراجعين سيستخدمون هذه المستندات كثيرًا كمرجع في مراجعات قابلية القراءة. https://google.github.io/styleguide/go#normative</li>
<li><strong>متوافق مع أعراف اللغة (Idiomatic)</strong>: شائع ومألوف. في هذه المستندات، يُستخدم مصطلح &quot;متوافق مع أعراف اللغة&quot; للإشارة إلى شيء شائع في شيفرة Go وأصبح نمطًا مألوفًا يسهل التعرف عليه. عمومًا، ينبغي تفضيل النمط المتوافق مع أعراف اللغة على نمط غير متوافق معها إذا كان كلاهما يخدم الغرض نفسه في السياق، لأن هذا هو ما سيكون الأكثر ألفة للقراء. https://google.github.io/styleguide/go#idiomatic</li>
</ul>
<h2 id="مراجع-إضافية">مراجع إضافية</h2>
<p>يفترض هذا الدليل أن القارئ على دراية بـ <a href="https://go.dev/doc/effective_go">Effective Go</a>، إذ يوفر خط أساس مشتركًا لشيفرة Go في مجتمع Go بأكمله.</p>
<p>فيما يلي بعض الموارد الإضافية لمن يرغب في تعليم نفسه أسلوب Go، وللمراجعين الذين يبحثون عن سياق إضافي قابل للربط في مراجعاتهم. لا يُتوقع من المشاركين في عملية قابلية قراءة Go الإلمام بهذه الموارد، لكنها قد تظهر كسياق في مراجعات قابلية القراءة.</p>
<p><strong>مراجع خارجية</strong></p>
<ul>
<li><a href="https://go.dev/ref/spec">مواصفات لغة Go</a></li>
<li><a href="https://go.dev/doc/faq">الأسئلة الشائعة عن Go</a></li>
<li><a href="https://go.dev/ref/mem">نموذج ذاكرة Go</a></li>
<li><a href="https://research.swtch.com/godata">بنى بيانات Go</a></li>
<li><a href="https://research.swtch.com/interfaces">واجهات Go</a></li>
<li><a href="https://go-proverbs.github.io/">أمثال Go</a></li>
<li>حلقات Go Tip - ترقّبوا المزيد.</li>
<li>ممارسات اختبار الوحدات - ترقّبوا المزيد.</li>
</ul>
<p><strong>مقالات Testing-on-the-Toilet ذات الصلة</strong></p>
<ul>
<li><a href="https://testing.googleblog.com/2017/10/code-health-identifiernamingpostforworl.html">TotT: تسمية المعرّفات (Identifier Naming)</a></li>
<li><a href="https://testing.googleblog.com/2013/03/testing-on-toilet-testing-state-vs.html">TotT: اختبار الحالة مقابل اختبار التفاعلات</a></li>
<li><a href="https://testing.googleblog.com/2014/05/testing-on-toilet-effective-testing.html">TotT: الاختبار الفعّال</a></li>
<li><a href="https://testing.googleblog.com/2014/05/testing-on-toilet-risk-driven-testing.html">TotT: الاختبار المدفوع بالمخاطر</a></li>
<li><a href="https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html">TotT: اختبارات كاشف التغيير تُعد ضارة</a></li>
</ul>
<p><strong>كتابات خارجية إضافية</strong></p>
<ul>
<li><a href="https://research.swtch.com/dogma">Go والدوغمائية</a></li>
<li><a href="https://commandcenter.blogspot.com/2012/06/less-is-exponentially-more.html">القليل أكثر أضعافًا مضاعفة</a></li>
<li><a href="https://commandcenter.blogspot.com/2011/12/esmereldas-imagination.html">خيال Esmerelda</a></li>
<li><a href="https://commandcenter.blogspot.com/2011/08/regular-expressions-in-lexing-and.html">التعابير النمطية للتحليل</a></li>
<li><a href="https://www.youtube.com/watch?v=PAAkCSZUG1c&amp;t=8m43s">أسلوب Gofmt ليس المفضل لدى أحد، ومع ذلك فـ Gofmt هو المفضل لدى الجميع</a> (YouTube)</li>
</ul>
<p>هذا الموقع مفتوح المصدر. <a href="https://github.com/google/styleguide/edit/gh-pages/go/index.md">حسّن هذه الصفحة</a>.</p>
`,s={book:t,chapter:o,chapterTitle:e,slug:i,title:n,headings:l,html:g};export{t as book,o as chapter,e as chapterTitle,s as default,l as headings,g as html,i as slug,n as title};
