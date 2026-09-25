const t="patterns-dev",p="vanilla",e="أنماط JavaScript",n="compression",s="ضغط JavaScript (Compressing JavaScript)",o=[{depth:2,id:"ضغط-http",text:"ضغط HTTP"},{depth:2,id:"التصغير",text:"التصغير"},{depth:2,id:"الضغط-الساكن-مقابل-الديناميكي",text:"الضغط الساكن مقابل الديناميكي"},{depth:2,id:"خوارزميات-الضغط",text:"خوارزميات الضغط"},{depth:3,id:"gzip",text:"Gzip"},{depth:3,id:"brotli",text:"Brotli"},{depth:3,id:"مقارنة-gzip-وbrotli",text:"مقارنة Gzip وBrotli"},{depth:2,id:"تمكين-الضغط",text:"تمكين الضغط"},{depth:2,id:"تدقيق-الضغط",text:"تدقيق الضغط"},{depth:2,id:"ضغط-javascript-ودقة-التحميل",text:"ضغط JavaScript ودقة التحميل"},{depth:3,id:"مصطلحات-التجميع",text:"مصطلحات التجميع"},{depth:3,id:"مقايضة-الدقة",text:"مقايضة الدقة"},{depth:2,id:"splitchunksplugin-والتقسيم-الدقيق",text:"SplitChunksPlugin والتقسيم الدقيق"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],i=`<blockquote>
<p>اضغط JavaScript وراقب أحجام الأجزاء (chunks) للحصول على أفضل أداء. قد تساعد دقة الأجزاء العالية في حزمة JavaScript على إزالة التكرار والتخزين المؤقت، لكنها قد تعتمد ضغطًا أضعف وتؤثر في التحميل عندما يكون عدد الأجزاء بين 50 و100. اختر في النهاية استراتيجية الضغط الأنسب لك.</p>
</blockquote>
<p>JavaScript هو ثاني أكبر <a href="https://almanac.httparchive.org/en/2020/page-weight#fig-2">مساهم في حجم الصفحة</a> وثاني أكثر <a href="https://almanac.httparchive.org/en/2020/page-weight#fig-4">مورد ويب مطلوب</a> على الإنترنت بعد الصور. نستخدم أنماطًا تقلل زمن نقل JavaScript وتحميله وتنفيذه لتحسين أداء المواقع. ويمكن أن يساعد الضغط في تقليل الزمن اللازم لنقل السكربتات عبر الشبكة.</p>
<p>يمكنك جمع الضغط مع تقنيات أخرى مثل التصغير وتقسيم الشيفرة (code splitting) والتجميع والتخزين المؤقت والتحميل الكسول لتقليل تأثير كميات JavaScript الكبيرة على الأداء. لكن أهداف هذه التقنيات قد تتعارض أحيانًا. يستعرض هذا القسم تقنيات ضغط JavaScript والفروق التي يجب مراعاتها عند اختيار استراتيجية للتقسيم والضغط.</p>
<ul>
<li><strong>Gzip</strong> و<strong>Brotli</strong> هما أكثر طريقتين شيوعًا لضغط JavaScript، وتدعمهما المتصفحات الحديثة على نطاق واسع.</li>
<li>يوفر <strong>Brotli</strong> <strong>نسبة ضغط أفضل</strong> عند مستويات ضغط متشابهة.</li>
<li>يوفر <strong>Next.js</strong> <a href="https://nextjs.org/docs/api-reference/next.config.js/compression">ضغط Gzip افتراضيًا</a>، لكنه يوصي بتمكينه على وكيل HTTP مثل Nginx.</li>
<li>إذا استخدمت <strong>Webpack</strong> لتجميع الشيفرة، فيمكنك استخدام <strong><a href="https://github.com/webpack-contrib/compression-webpack-plugin">CompressionPlugin</a></strong> لضغط Gzip أو <a href="https://github.com/mynameiswhm/brotli-webpack-plugin">BrotliWebpackPlugin</a> لضغط Brotli.</li>
<li>لاحظ Oyo انخفاضًا بنسبة <strong>15–20%</strong>، ولاحظت Wix انخفاضًا بنسبة <strong>21–25%</strong> في أحجام الملفات بعد الانتقال إلى <strong>ضغط Brotli بدل Gzip</strong>.</li>
<li><strong>compress(a + b) &lt;= compress(a) + compress(b)</strong> - تمنح الحزمة الكبيرة الواحدة ضغطًا أفضل من عدة حزم صغيرة. وهذا يسبب مقايضة الدقة، حيث تتعارض <strong>إزالة التكرار والتخزين المؤقت</strong> مع أداء المتصفح والضغط. ويمكن أن يساعد التقسيم الدقيق على التعامل مع هذه المقايضة.</li>
</ul>
<h2 id="ضغط-http">ضغط HTTP</h2>
<p>يقلل الضغط أحجام المستندات والملفات، فتستهلك مساحة قرص أقل ويمكن نقلها عبر الشبكة بسرعة. يستخدم ضغط HTTP هذا المفهوم البسيط لضغط محتوى المواقع، وتقليل <a href="https://almanac.httparchive.org/en/2020/page-weight">أوزان الصفحات</a>، وخفض متطلبات النطاق الترددي، وتحسين الأداء.</p>
<p>يمكن تصنيف ضغط بيانات HTTP بطرق مختلفة، ومن ذلك الضغط الفاقد للبيانات مقابل الضغط غير الفاقد لها.</p>
<p><strong>الضغط الفاقد للبيانات</strong> يعني أن دورة الضغط وفك الضغط تنتج مستندًا مختلفًا قليلًا مع الاحتفاظ بصلاحيته. والتغيير لا يلاحظه المستخدم النهائي عادةً. وأشهر مثال هو ضغط JPEG للصور.</p>
<p>في <strong>الضغط غير الفاقد للبيانات</strong>، تطابق البيانات المستردة بعد الضغط وفك الضغط البيانات الأصلية تمامًا. وتُعد صور PNG مثالًا على ذلك. يناسب هذا النوع نقل النصوص، وينبغي تطبيقه على صيغ HTML وCSS وJavaScript.</p>
<p>لأنك تريد كل شيفرة JS صالحة في المتصفح، استخدم خوارزميات ضغط غير فاقد للبيانات لشيفرة JavaScript. وقبل ضغط JS، تساعد عملية التصغير على إزالة الصياغة غير الضرورية وتقليلها إلى الشيفرة المطلوبة للتنفيذ فقط.</p>
<h2 id="التصغير">التصغير</h2>
<p>لتقليل أحجام الحمولة، يمكنك تصغير JavaScript قبل الضغط. و<a href="https://web.dev/reduce-network-payloads-using-text-compression/#minification">التصغير</a> يكمّل الضغط بإزالة المسافات والشيفرة غير الضرورية لإنشاء ملف أصغر صالح. نستخدم أثناء الكتابة فواصل أسطر ومسافات بادئة وأسماء متغيرات ذات دلالة وتعليقات لتحسين القراءة والصيانة، لكنها لا تلزم المتصفح للتنفيذ. ويقلل التصغير الشيفرة إلى الحد الأدنى اللازم.</p>
<p>التصغير ممارسة معتادة لتحسين JS وCSS. غالبًا ما يقدم مطوّرو مكتبات JavaScript نسخًا مصغرة من ملفاتهم لنشرات الإنتاج، ويشار إليها عادةً بامتداد min.js. (مثل <code>jquery.js</code> و<code>jquery.min.js</code>)</p>
<p>تتوفر أدوات متعددة لتصغير موارد <a href="https://developers.google.com/speed/docs/insights/MinifyResources">HTML وCSS وJS</a>. و<a href="https://github.com/terser-js/terser">Terser</a> أداة شائعة لضغط JavaScript لدعم ES6+، ويأتي <a href="https://webpack.js.org/">Webpack</a> v4 مع إضافتها افتراضيًا لإنشاء ملفات بناء مصغرة. ويمكن استخدام <code>TerserWebpackPlugin</code> مع الإصدارات الأقدم أو Terser كأداة CLI دون أداة تجميع.</p>
<h2 id="الضغط-الساكن-مقابل-الديناميكي">الضغط الساكن مقابل الديناميكي</h2>
<p>يساعد التصغير على تقليل أحجام الملفات بدرجة كبيرة، لكن ضغط JS قد يحقق مكاسب أكبر. يمكنك تنفيذ ضغط الخادم (server-side) بطريقتين.</p>
<p><strong>الضغط الساكن:</strong> يمكنك ضغط الموارد مسبقًا وحفظها أثناء عملية البناء. ويمكنك استخدام مستويات ضغط أعلى لتحسين زمن تنزيل الشيفرة. لن يؤثر الوقت الطويل للبناء في أداء الموقع. الأفضل استخدام الضغط الساكن للملفات التي لا تتغير كثيرًا.</p>
<p><strong>الضغط الديناميكي:</strong> يحدث الضغط أثناء طلب المتصفح للموارد. الضغط الديناميكي أسهل في التنفيذ، لكنه يحد من مستويات الضغط المتاحة. تتطلب المستويات الأعلى وقتًا أكثر، وقد تفقد ميزة الصغر الناتج. استخدمه مع المحتوى الذي يتغير كثيرًا أو الذي يولده التطبيق.</p>
<p>يمكنك استخدام الضغط الساكن أو الديناميكي حسب نوع محتوى التطبيق. ويمكنك تمكين النوعين بخوارزميات شائعة، لكن مستويات الضغط الموصى بها تختلف في كل حالة. فلننظر إلى خوارزميات الضغط لفهم ذلك.</p>
<h2 id="خوارزميات-الضغط">خوارزميات الضغط</h2>
<p><a href="https://datatracker.ietf.org/doc/html/rfc1952">Gzip</a> و<a href="https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html">Brotli</a> هما <a href="https://almanac.httparchive.org/en/2020/compression#fig-5">الخوارزميتان الأكثر شيوعًا</a> المستخدمتان في ضغط بيانات HTTP اليوم.</p>
<h3 id="gzip">Gzip</h3>
<p>موجود تنسيق ضغط Gzip منذ نحو 30 عامًا، وهو خوارزمية غير فاقد للبيانات تعتمد على <a href="https://www.youtube.com/watch?v=whGwm0Lky2s&amp;t=851s">خوارزمية Deflate</a>. تستخدم Deflate مزيجًا من <a href="https://cs.stanford.edu/people/eroberts/courses/soco/projects/data-compression/lossless/lz77/algorithm.htm">خوارزمية LZ77</a> و<a href="https://cs.stanford.edu/people/eroberts/courses/soco/projects/data-compression/lossless/huffman/algorithm.htm">ترميز Huffman</a> على كتل البيانات في تدفق الإدخال.</p>
<p>تحدد خوارزمية LZ77 السلاسل المكررة وتستبدلها بإشارة مرجعية، وهي مؤشر إلى الموضع الذي ظهرت فيه من قبل، يتبعه طول السلسلة. ثم يحدد ترميز Huffman المراجع الشائعة ويستبدلها بمراجع ذات تسلسلات بت أقصر. وتستخدم التسلسلات الأطول للمراجع النادرة.</p>
<p><img src="/images/patterns-dev/vanilla-compression-0-compressingjav__zhfjmtap05.webp" alt="حجم ملف JavaScript قبل الضغط"></p>
<p>مصدر الصورة: <a href="https://www.youtube.com/watch?v=whGwm0Lky2s&amp;t=851s">https://www.youtube.com/watch?v=whGwm0Lky2s&amp;t=851s</a></p>
<p>تدعم جميع المتصفحات الرئيسية Gzip. و<a href="https://github.com/google/zopfli">Zopfli</a> خوارزمية أبطأ لكن محسنة من Deflate/Gzip، تنتج ملفات GZip متوافقة أصغر. وهي مناسبة للضغط الساكن، حيث توفر مكاسب أكبر.</p>
<h3 id="brotli">Brotli</h3>
<p>في عام 2015، قدست Google خوارزمية <a href="https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html">Brotli</a> و<a href="https://datatracker.ietf.org/doc/html/rfc7932">صيغة بيانات Brotli المضغوطة</a>. تعد Brotli خوارزمية غير فاقد للبيانات تعتمد على LZ77 وترميز Huffman، وتستخدم نمذجة سياق من الرتبة الثانية لضغط أكثف عند سرعات مشابهة. كما تدعم <a href="https://github.com/google/brotli">Brotli</a> <a href="https://blog.cloudflare.com/results-experimenting-brotli/">نافذة أكبر</a> للمراجع الخلفية، ولديها قاموس ثابت.</p>
<p>تدعم جميع الخوادم والمتصفحات الرئيسية Brotli اليوم، وأصبحت <a href="https://almanac.httparchive.org/en/2020/compression#fig-5">شائعة</a> بشكل متزايد. كما <a href="https://caniuse.com/?search=brotli">مدعومة</a> من مزودات الاستضافة والبرمجيات الوسيطة مثل <a href="https://www.netlify.com/blog/2020/05/20/gain-instant-performance-boosts-as-brotli-comes-to-netlify-edge/">Netlify</a> و<a href="https://aws.amazon.com/about-aws/whats-new/2020/09/cloudfront-brotli-compression/">AWS</a> و<a href="https://vercel.com/docs/concepts/edge-network/compression">Vercel</a>.</p>
<p>حسّنت المواقع ذات قاعدة المستخدمين الكبيرة، مثل <a href="https://tech.oyorooms.com/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4">OYO</a> و<a href="https://web.dev/wix/#brotli-compression-(vs.-gzip)">Wix</a>، أدائها كثيرًا بعد استبدال Gzip بـ Brotli.</p>
<h3 id="مقارنة-gzip-وbrotli">مقارنة Gzip وBrotli</h3>
<p>يعرض <a href="https://paulcalvano.com/2018-07-25-brotli-compression-how-much-will-it-reduce-your-content/">الجدول التالي</a> مقارنة معيارية لنسب وسرعات ضغط Brotli وGzip عند مستويات مختلفة.</p>
<p><img src="/images/patterns-dev/vanilla-compression-1-compressingjav__zz1j9i0tui.webp" alt="حجم ملف JavaScript بعد الضغط"></p>
<p>إليك بعض النتائج من بحث Chrome حول ضغط JS باستخدام Gzip وBrotli.</p>
<ul>
<li>يحقق Gzip 9 أفضل نسبة ضغط مع سرعة جيدة، وينبغي التفكير في استخدامه قبل مستويات Gzip الأخرى.</li>
<li>مع Brotli، استخدم المستويات 6–11. وفي غير ذلك،يمكن تحقيق نسبة مماثلة بسرعة أكبر باستخدام Gzip.</li>
<li>عبر جميع أحجام المحتوى، يكون Brotli 9–11 أفضل بكثير من Gzip، لكنه بطيء.</li>
<li>كلما كانت الحزمة أكبر، تحسنت نسبة الضغط والسرعة.</li>
<li>العلاقة بين الخوارزميات متشابهة لكل أحجام الحزم، على سبيل المثال Brotli 7 أفضل من Gzip 9 لكل حجم، وGzip 9 أسرع من Brotli 5 لكل النطاقات.</li>
</ul>
<p>لننظر الآن إلى طريقة تواصل الخوادم والمتصفحات حول تنسيق الضغط المختار.</p>
<h2 id="تمكين-الضغط">تمكين الضغط</h2>
<p>يمكنك تمكين الضغط الساكن أثناء البناء. إذا استخدمت Webpack لتجميع الشيفرة، فيمكنك استخدام <a href="https://github.com/webpack-contrib/compression-webpack-plugin">CompressionPlugin</a> لضغط Gzip أو <a href="https://github.com/mynameiswhm/brotli-webpack-plugin">BrotliWebpackPlugin</a> لضغط Brotli. ويمكن إضافة الإضافة إلى ملف إعداد Webpack كما يلي.</p>
<pre><code class="language-javascript"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {

<span class="hljs-comment">//...</span>

<span class="hljs-attr">plugins</span>: [

<span class="hljs-comment">//...</span>

<span class="hljs-keyword">new</span> <span class="hljs-title class_">CompressionPlugin</span>(),

],

};
</code></pre>
<p>يوفر Next.js <a href="https://nextjs.org/docs/api-reference/next.config.js/compression">ضغط Gzip افتراضيًا</a>، لكنه يوصي بتمكينه على وكيل HTTP مثل Nginx. ويدعم كل من Gzip وBrotli على <a href="https://vercel.com/docs/concepts/edge-network/compression">منصة Vercel</a> عند مستوى الوكيل.</p>
<p>يمكنك تمكين ضغط ديناميكي غير فاقد للبيانات على الخوادم التي تدعم خوارزميات مختلفة، بما فيها Node.js. ويخبر المتصفح الخادم الخوارزميات التي يدعمها عبر رأس HTTP <a href="https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Encoding">Accept-Encoding</a> في الطلب. على سبيل المثال، <code>Accept-Encoding: gzip, br</code>.</p>
<p>يوضح هذا أن المتصفح يدعم Gzip وBrotli. يمكنك تمكين أنواع الضغط على خادمك باتباع تعليمات نوع الخادم. على سبيل المثال، تجد تعليمات تمكين Brotli على خادم Apache <a href="https://httpd.apache.org/docs/2.4/mod/mod_brotli.html#enable">هنا</a>. و<a href="https://expressjs.com/">Express</a> إطار ويب شائع لـ Node ويقدم مكتبة برمجيات وسيطة <a href="https://github.com/expressjs/compression">compression</a>. استخدمها لضغط أي أصل عند طلبه.</p>
<p>يُنصح بـ Brotli بدل خوارزميات الضغط الأخرى لأنه ينتج ملفات أصغر. يمكنك تمكين Gzip كبديل للمتصفحات التي لا تدعم Brotli. وإذا أعدت التهيئة بنجاح، سيعيد الخادم رأس استجابة HTTP <a href="https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Encoding">Content-Encoding</a> للإشارة إلى الخوارزمية المستخدمة، مثل <code>Content-Encoding: br</code>.</p>
<h2 id="تدقيق-الضغط">تدقيق الضغط</h2>
<p>يمكنك التحقق مما إذا كان الخادم ضغط السكربتات أو النصوص التي نزلتها في Chrome -&gt; DevTools -&gt; network -&gt; Headers. وتعرض DevTools ترميز المحتوى المستخدم في الاستجابة كما هو موضح أدناه.</p>
<p><img src="/images/patterns-dev/vanilla-compression-2-compressingjav__4gwntp0et8s.webp" alt="مقارنة الأحجام قبل الضغط وبعده"></p>
<p>يتضمن تقرير Lighthouse تدقيق أداء لـ «Enable Text Compression» يبحث عن موارد نصية وصلت دون رأس content-encoding المضبوط على br أو gzip أو deflate. ويستخدم Lighthouse Gzip لحساب الوفر الممكن.</p>
<p><img src="/images/patterns-dev/vanilla-compression-3-compressingjav__qmwdq1rskk8.webp" alt="أثر الضغط على زمن التحليل"></p>
<p>مصدر الصورة: <a href="https://web.dev/uses-text-compression/#how-to-enable-text-compression-on-your-server">https://web.dev/uses-text-compression/#how-to-enable-text-compression-on-your-server</a></p>
<h2 id="ضغط-javascript-ودقة-التحميل">ضغط JavaScript ودقة التحميل</h2>
<p>لفهم تأثيرات ضغط JavaScript تمامًا، عليك أيضًا النظر في جوانب أخرى لتحسين JavaScript، مثل <a href="https://www.patterns.dev/posts/route-based/">التقسيم حسب المسار</a> و<a href="https://webpack.js.org/guides/code-splitting/">تقسيم الشيفرة</a> و<a href="https://www.patterns.dev/posts/bundle-splitting/">التجميع</a>.</p>
<p>غالبًا ما تستخدم تطبيقات الويب الحديثة التي تحتوي على كميات كبيرة من شيفرة JavaScript تقنيات لتقسيم الشيفرة وتجميعها وتحميلها بكفاءة. تستخدم التطبيقات حدودًا منطقية لتقسيم الشيفرة، مثل التقسيم حسب المسار في تطبيقات الصفحة الواحدة أو تقديم JavaScript تدريجيًا عند التفاعل أو الظهور في إطار العرض. ويمكنك إعداد أدوات التجميع للتعرف على هذه الحدود.</p>
<p>لنغطي بعض التعريفات الأساسية المتعلقة لتقسيم الشيفرة والتجميع قبل بيان كيفية تأثير ذلك في الضغط.</p>
<h3 id="مصطلحات-التجميع">مصطلحات التجميع</h3>
<p>فيما يلي بعض المصطلحات المهمة المتعلقة بنقاشنا.</p>
<ul>
<li><strong>الوحدة (Module)</strong>: وحدات مستقلة من الوظائف مصممة لتوفير تجريدات قوية وعزل. راجع <a href="https://www.patterns.dev/posts/module-pattern/">نمط الوحدة</a> لمزيد من التفاصيل.</li>
<li><strong>الحزمة (Bundle)</strong>: مجموعة وحدات مختلفة تحتوي على الإصدارات النهائية لملفات المصدر، وقد مرّت بعملية التحميل والترجمة في أداة التجميع.</li>
<li><strong>تقسيم الحزمة (Bundle splitting)</strong>: العملية التي تستخدمها أدوات التجميع لتقسيم التطبيق إلى حزم متعددة، بحيث يمكن عزل كل حزمة أو نشرها أو تنزيلها أو تخزينها بشكل مستقل.</li>
<li><strong>الجزء (Chunk)</strong>: مصطلح مستعار من Webpack، ويشير إلى الناتج النهائي لعملية التجميع وتقسيم الشيفرة. ويمكن لـ Webpack تقسيم الحزم إلى أجزاء وفق إعداد <a href="https://webpack.js.org/configuration/entry-context/">entry</a> أو <a href="https://webpack.js.org/plugins/split-chunks-plugin/">SplitChunksPlugin</a> أو <a href="https://webpack.js.org/plugins/split-chunks-plugin/">الاستيرادات الديناميكية</a>.</li>
</ul>
<p>إذا كانت الوحدات موجودة في ملفات المصدر، فإن الناتج النهائي لعملية البناء بعد تقسيم الشيفرة أو الحزمة يسمى <strong>جزءًا (chunk)</strong>. ولاحظ أن ملفات المصدر والأجزاء قد يعتمد كل منهما على الآخر.</p>
<p><img src="/images/patterns-dev/vanilla-compression-4-compressingjav__50dz6giz2pa.webp" alt="إحصاء ملفات JavaScript حسب الحجم"></p>
<p>مصدر الصورة: <a href="https://www.youtube.com/watch?v=ImjzA7EMI6I&amp;list=PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5&amp;index=29">https://www.youtube.com/watch?v=ImjzA7EMI6I&amp;list=PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5&amp;index=29</a></p>
<p>يشير حجم JavaScript الناتج إلى حجم الأجزاء أو الحجم الخام بعد تحسينه بواسطة أداة تجميع أو مترجم JavaScript. ويمكن تفكيك تطبيقات JS الكبيرة إلى أجزاء من ملفات JavaScript قابلة للتحميل بشكل مستقل. و<strong>دقة التحميل (loading granularity)</strong> تعني عدد أجزاء الناتج؛ فكلما زاد العدد، صغر حجم كل جزء وزادت الدقة.</p>
<p>بعض الأجزاء أكثر أهمية من غيرها لأنها تحمّل أكثر أو تنتمي إلى مسارات شيفرة أكثر تأثيرًا، مثل تحميل أداة «checkout». ومعرفة الأجزاء الأكثر أهمية تتطلب معرفة التطبيق، لكن من الآمن افتراض أن جزء «base» أساسي دائمًا.</p>
<p>كل بايت في الأجزاء التي تحتاجها الصفحة يجب أن تنزّله أجهزة المستخدم ثم تحلله أو تنفذه. وهذه هي الشيفرة التي <a href="https://v8.dev/blog/cost-of-javascript-2019">تؤثر مباشرة</a> في أداء التطبيق. ولأن الأجزاء هي الشيفرة التي ستنزّل في النهاية، يمكن أن يؤدي ضغطها إلى سرعات تنزيل أفضل.</p>
<p>بهذه الخلفية، لنناقش التفاعل بين دقة التحميل والضغط.</p>
<h3 id="مقايضة-الدقة">مقايضة الدقة</h3>
<p>في العالم المثالي، يجب أن تحقق استراتيجية الدقة والتقسيم الأهداف التالية، وهي أهداف متعارضة فيما بينها.</p>
<ul>
<li><strong>تحسين سرعة التنزيل:</strong> يمكن تحسين سرعة التنزيل بالضغط، لكن ضغط جزء كبير واحد يعطي نتيجة أفضل أو ملفًا أصغر من ضغط أجزاء صغيرة تحتوي على الشيفرة نفسها.</li>
</ul>
<p><code>compress(a + b) &lt;= compress(a) + compress(b)</code></p>
<blockquote>
<p>تشير البيانات المحلية المحدودة إلى فقدان بنسبة 5% إلى 10% للأجزاء الأصغر. وتظهر حالة الأجزاء غير المجمعة زيادة بنسبة 20% في الحجم. وتُضاف تكاليف IPC وI/O والمعالجة إلى كل جزء مشترك في حالة الأجزاء الأكبر. ولدى محرك v8 عتبة بث/تحليل قدرها 30K، ما يعني أن كل جزء أصغر من 30K سيُحلل في مسار التحميل الحرج حتى لو لم يكن حرجًا.</p>
</blockquote>
<blockquote>
<p>للأسباب المذكورة أعلاه، قد تكون الأجزاء الأكبر أكفأ من الأصغر للشيفرة نفسها عند تحسين التنزيل وأداء المتصفح.</p>
</blockquote>
<ul>
<li>
<p><strong>تحسين مرات إصابة الذاكرة المؤقتة وكفاءتها:</strong> تحقق الأجزاء الصغيرة كفاءة أفضل، خصوصًا في التطبيقات التي تحمّل JS تدريجيًا.</p>
</li>
<li>
<p>التغييرات مع الأجزاء الأصغر تكون معزولة في أجزاء أقل. وإذا حدث تغيير، يلزم تنزيل الأجزاء المتأثرة فقط، وحجم الشيفرة المقابل لها صغير غالبًا. ويمكن العثور على بقية الأجزاء في الذاكرة المؤقتة، مما يزيد مرات الإصابة.</p>
</li>
<li>
<p>مع الأجزاء الأكبر، من المرجح أن تتغير كمية كبيرة من الشيفرة وتلزم إعادة تنزيلها. لذلك تفيد الأجزاء الأصغر في استخدام آلية الذاكرة المؤقتة.</p>
</li>
<li>
<p><strong>تنفيذ سريع</strong> - لتنفيذ الشيفرة بسرعة يجب تحقق الشروط التالية.</p>
</li>
<li>
<p>تكون جميع الاعتماديات المطلوبة متاحة فورًا، فقد نُزّلت معًا أو موجودة في الذاكرة المؤقتة. وهذا يعني تجميع الشيفرة المرتبطة في جزء أكبر.</p>
</li>
<li>
<p>لا ينبغي تنفيذ سوى الشيفرة التي تحتاجها الصفحة أو المسار. وهذا يتطلب عدم تنزيل أو تنفيذ شيفرة إضافية. قد تحتوي جزء <code>commons</code> على اعتماديات تحتاجها معظم الصفحات لا كلها، إزالة التكرار تتطلب أجزاء مستقلة أصغر.</p>
</li>
<li>
<p>يمكن للمهام الطويلة على الخيط الرئيسي أن تحجبه وقتًا طويلًا، لذلك يجب تقسيمها إلى أجزاء أصغر.</p>
</li>
</ul>
<p><img src="/images/patterns-dev/vanilla-compression-5-compressingjav__oj44b7q1hxl.webp" alt="أكبر الملفات قبل الضغط"></p>
<p>مصدر الصورة: <a href="https://www.youtube.com/watch?v=ImjzA7EMI6I&amp;list=PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5&amp;index=29">https://www.youtube.com/watch?v=ImjzA7EMI6I&amp;list=PLyspMSh4XhLP-mqulUMcaqTbLo-ZJxSX5&amp;index=29</a></p>
<p>كما يوضح المثلث أعلاه، فإن دقة التحميل التي تحاول تحسين أحد هذه الأهداف قد تبتعد عن الأهداف الأخرى. هذه هي مشكلة مقايضة الدقة.</p>
<p><strong>إزالة التكرار والتخزين المؤقت يتعارضان مع أداء المتصفح والضغط.</strong></p>
<p>نتيجة لهذه المقايضة، يستخدم معظم تطبيقات الإنتاج اليوم نحو 10 أجزاء كحد أقصى. ينبغي رفع هذا الحد لدعم أفضل للتخزين المؤقت وإزالة التكرار في التطبيقات التي تحتوي على كميات كبيرة من JavaScript.</p>
<h2 id="splitchunksplugin-والتقسيم-الدقيق"><code>SplitChunksPlugin</code> والتقسيم الدقيق</h2>
<p>يمكن أن يعالج الحل المحتمل لمقايضة الدقة المتطلبات التالية:</p>
<ul>
<li>السماح بعدد أكبر من الأجزاء، من 40 إلى 100، بأحجام أصغر لتحسين الذاكرة المؤقتة وإزالة التكرار دون التأثير في الأداء.</li>
<li>معالجة تكاليف الأداء التي تسببها الأجزاء الصغيرة المتعددة بسبب IPC وI/O والمعالجة ووسوم السكربتات الكثيرة.</li>
<li>معالجة فقد الضغط عند استخدام أجزاء صغيرة متعددة.</li>
</ul>
<p>لا يزال الحل المحتمل الذي يعالج هذه المتطلبات قيد العمل. لكن <a href="https://webpack.js.org/plugins/split-chunks-plugin/">SplitChunksPlugin</a> في Webpack v4 واستراتيجية التقسيم الدقيق يمكنهما مساعدة رفع دقة التحميل إلى حد ما.</p>
<p>استخدم Webpack القديم <code>CommonsChunkPlugin</code> لتجميع الاعتماديات المشتركة في جزء واحد. وقد قدم Webpack <code>SplitChunksPlugin</code> في الإصدار v4 لتحسين الصفحات التي لا تستخدم هذه الوحدات، ومنع جلب الشيفرة المكررة عبر المسارات.</p>
<p>اعتمد Next.js ‏SplitChunksPlugin ونفذ استراتيجية <a href="https://web.dev/granular-chunking-nextjs/">التقسيم الدقيق (Granular Chunking)</a> لإنشاء أجزاء Webpack تعالج مقايضة الدقة.</p>
<ul>
<li>يُقسَّم أي وحدة طرف ثالث كبيرة بما يكفي، أكبر من 160KB، إلى جزء مستقل.</li>
<li>يُنشأ جزء منفصل لعناصر إطار العمل، مثل react وreact-dom.</li>
<li>يُنشأ عدد من الأجزاء المشتركة حسب الحاجة، حتى 25.</li>
<li>يُغيَّر الحد الأدنى لحجم الجزء الذي يُنشأ إلى 20KB.</li>
</ul>
<p>يُنشئ إصدار عدة أجزاء مشتركة بدل جزء واحد أقل شيفرة غير ضرورية أو مكررة تُنزّل أو تُنفذ في الصفحات المختلفة. كما تحسن الأجزاء المستقلة للمكتبات الكبيرة لدى الأطراف الخارجية التخزين المؤقت لأنها نادرًا ما تتغير. ويضمن حد أدنى قدره 20KB ألّا يكون فقد الضغط كبيرًا.</p>
<p>ساعدت استراتيجية التقسيم الدقيق عدة تطبيقات Next.js على تقليل إجمالي JavaScript المستخدم في الموقع.</p>
<p><img src="/images/patterns-dev/vanilla-compression-6-compressingjav__ja7cji39g8m.webp" alt="أكبر الملفات بعد الضغط"></p>
<p>طُبقت استراتيجية التقسيم الدقيق أيضًا في <a href="https://github.com/gatsbyjs/gatsby/pull/22253">Gatsby</a> ولوحظت فوائد مماثلة.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>لا يمكن للضغط وحده حل مشكلات أداء JavaScript كلها، لكن فهم طريقة عمل المتصفحات وأدوات التجميع في الخلفية يساعد على إنشاء استراتيجية تجميع أفضل تدعم ضغطًا أفضل. ويجب معالجة مشكلة دقة التحميل عبر منصات مختلفة في النظام البيئي. قد يكون التقسيم الدقيق خطوة في هذا الاتجاه، لكننا ما زلنا بعيدين عن الحل.</p>
`,a={book:t,chapter:p,chapterTitle:e,slug:n,title:s,headings:o,html:i};export{t as book,p as chapter,e as chapterTitle,a as default,o as headings,i as html,n as slug,s as title};
