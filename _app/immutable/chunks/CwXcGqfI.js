const t="patterns-dev",e="vanilla",o="أنماط JavaScript",n="prpl",r="نمط PRPL (PRPL Pattern)",i=[{depth:2,id:"مراجعة-سريعة-للأعمدة-الأربعة",text:"مراجعة سريعة للأعمدة الأربعة"},{depth:2,id:"لماذا-وجد-prpl-في-المقام-الأول",text:"لماذا وُجد PRPL في المقام الأول"},{depth:2,id:"الدفع-من-دفع-الخادم-إلى-early-hints",text:"الدفع: من دفع الخادم إلى Early Hints"},{depth:2,id:"العرض-تحسين-lcp-لا-التفاعلية",text:"العرض: تحسين LCP، لا «التفاعلية»"},{depth:2,id:"التخزين-المسبق-عامل-الخدمة-الجلب-المسبق-وحواف-cdn",text:"التخزين المسبق: عامل الخدمة، الجلب المسبق، وحواف CDN"},{depth:2,id:"التحميل-الكسول-الأوليات-الأصلية-تكفي-عادة",text:"التحميل الكسول: الأوليات الأصلية تكفي عادةً"},{depth:2,id:"هل-ما-زال-هيكل-التطبيق-موجودا",text:"هل ما زال هيكل التطبيق موجودًا؟"},{depth:2,id:"هل-ما-زال-prpl-الإطار-الصحيح",text:"هل ما زال PRPL الإطار الصحيح؟"},{depth:2,id:"المراجع",text:"المراجع"}],s=`<p>PRPL — <strong>الدفع، العرض، التخزين المسبق، التحميل الكسول (Push, Render, Pre-cache, Lazy-load)</strong> — هي استراتيجية طورتها Google عام 2016 لجعل تطبيقات الويب قابلة للاستخدام على شبكات الهاتف المحمول المتقطعة والهواتف ضعيفة الإمكانات. كان هذا النمط سائدًا في التسليم ذو الأولوية الأولى من نحو 2016 حتى 2019؛ ولا تزال أعمدتها نصائح جيدة اليوم، لكن <em>التنفيذات</em> تطورت. زال دفع الخادم (server push) من Chrome، وامتزجت هياكل التطبيقات (app shells) إلى حد كبير مع SSR الحديث مع البث، وأصبحت المقاييس التي نقيسها LCP وINP بدلاً من تقديرات time-to-interactive.</p>
<p>يحافظ هذا المقال على تأطير الأعمدة الأربعة الأصلي لأنه لا يزال قائمة تحقق مفيدة، ثم يوضح شكل كل عمود اليوم.</p>
<h2 id="مراجعة-سريعة-للأعمدة-الأربعة">مراجعة سريعة للأعمدة الأربعة</h2>
<table>
<thead>
<tr>
<th>العمود</th>
<th>نية عام 2016</th>
<th>التنفيذ الحالي</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الدفع</strong></td>
<td>تسليم الموارد الحرجة إلى جانب المستند عبر دفع خادم HTTP/2</td>
<td><code>، </code>، و<code>103 Early Hints</code> عبر HTTP</td>
</tr>
<tr>
<td><strong>العرض</strong></td>
<td>جعل أول مسار تفاعلي في أقرب وقت ممكن</td>
<td>تحسين LCP وINP عبر SSR والبث وتقسيم الشيفرة على مستوى المسار</td>
</tr>
<tr>
<td><strong>التخزين المسبق</strong></td>
<td>استخدام عامل خدمة لملء ذاكرة المسارات المرجّحة التالية</td>
<td>ذاكرة Workbox وقت التشغيل، \`\`، والجلب المسبق على مستوى الإطار (Next/Remix/SvelteKit)</td>
</tr>
<tr>
<td><strong>التحميل الكسول</strong></td>
<td>تأجيل كل ما ليس ضروريًا لأول رسم</td>
<td><code>import()</code> الديناميكي، التحميل الكسول الأصلي (<code>loading=&quot;lazy&quot;</code>)، تلميحات الأولوية (<code>fetchpriority</code>)، <code>content-visibility</code></td>
</tr>
</tbody>
</table>
<h2 id="لماذا-وجد-prpl-في-المقام-الأول">لماذا وُجد PRPL في المقام الأول</h2>
<p>تحميل صفحة ساذج هو سلسلة من رحلات الذهاب والإياب. يطلب المتصفح HTML، يحلله، يكتشف ورقة أنماط، يطلبها، يكتشف سكربتًا، يطلبه، يكتشف خطًا، وهكذا. في اتصال 4G بزمن استجابة دائري يزيد على 100ms، تكون كل خطوة ظاهرة للمستخدم. كان PRPL استجابة لذلك: افعل كل ما تستطيع لتقليل تلك الرحلات، ثم خزّن النتيجة بقوة بحيث تدفع <em>الزيارة التالية</em> تكلفة أقل.</p>
<p>اعتمد مقال PRPL الأصلي بقوة على دفع خادم HTTP/2 كحل لمشكلة رحلات الذهاب والإياب. لقد تغيرت هذه القصة.</p>
<h2 id="الدفع-من-دفع-الخادم-إلى-early-hints">الدفع: من دفع الخادم إلى Early Hints</h2>
<p>عند نشر PRPL، كانت التوصية بدفع CSS الحرج وأجزاء JavaScript الأولية مع استجابة HTML كي لا يضطر المتصفح إلى اكتشافها وطلبها. كانت الآلية هي دفع خادم HTTP/2.</p>
<p><strong>دفع الخادم مات عمليًا.</strong> عطّل Chrome <a href="https://developer.chrome.com/blog/removing-push">دفع خادم HTTP/2 افتراضيًا في الإصدار 106 (أواخر 2022)</a> بعد أن أظهرت سنوات من القياس أنه لم يكن ناجحًا؛ إذ استخدمه نحو 1.25% فقط من مواقع HTTP/2، وفي كثير من الحالات كررت الموارد المدفوعة بايتات كانت الذاكرة المؤقتة تحتوي عليها بالفعل. وتخلت مواصفة HTTP/3 من الدفع إلى حد كبير.</p>
<p>ما الذي حل محل ذلك:</p>
<p><strong>\`\`</strong> يعلن جلبًا عالي الأولوية مباشرة في HTML. إنه الأداة الأساسية لإخبار المتصفح: «سوف تحتاج إلى هذا الخط أو السكربت أو الصورة؛ لا تنتظر حتى تحلل ما يكفي لاكتشافه».</p>
<pre><code>&lt;link rel=&quot;preload&quot; href=&quot;/fonts/inter.woff2&quot; as=&quot;font&quot; type=&quot;font/woff2&quot; crossorigin&gt;
&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/app.js&quot;&gt;
</code></pre>
<p><strong><code>103 Early Hints</code> عبر HTTP</strong> هو الوريث الحديث لدفع الخادم، وهو الحل الذي يعالج فعلاً مشكلة رحلات الذهاب والإياب التي كان PRPL يهتم بها. قبل أن ينتهي الخادم من إنشاء الاستجابة الكاملة، يمكنه إرسال استجابة مؤقتة <code>103</code> مع رؤوس <code>Link</code> تخبر المتصفح بما يبدأ في جلبه:</p>
<pre><code>HTTP/1.1 103 Early Hints
Link: &lt;/assets/app.js&gt;; rel=preload; as=script
Link: &lt;/assets/app.css&gt;; rel=preload; as=style

HTTP/1.1 200 OK
Content-Type: text/html
...
</code></pre>
<p>على عكس دفع الخادم، تترك Early Hints المتصفح مسؤولًا: يمكنه تجاهل التلميح إذا كان المورد مخزنًا بالفعل، فلا تهدر بايتات. وهي مدعومة في Chrome وEdge وFirefox، وتتاح عبر Cloudflare وFastly وVercel.</p>
<p><strong>تلميحات الأولوية</strong> (<code>fetchpriority=&quot;high&quot;</code>) و\`\` تكملان مجموعة الأدوات. استخدم preconnect مع مضيفات الأصول عبر النطاقات، واستخدم <code>fetchpriority</code> لدفع صورة LCP إلى مقدمة قائمة الانتظار.</p>
<h2 id="العرض-تحسين-lcp-لا-التفاعلية">العرض: تحسين LCP، لا «التفاعلية»</h2>
<p>كان حرف «R» في PRPL يعني عرض المسار الأولي في أسرع وقت ممكن. النصيحة نفسها؛ لكن المقياس قد تغير.</p>
<p>الأرقام المهمة حاليًا هي Core Web Vitals: <strong>LCP</strong> (Largest Contentful Paint، الهدف ≤ 2.5s)، و<strong>INP</strong> (Interaction to Next Paint، الذي <a href="https://web.dev/articles/inp">حل محل FID في مارس 2024</a>، الهدف ≤ 200ms)، و<strong>CLS</strong> (Cumulative Layout Shift، الهدف ≤ 0.1). LCP هو المقياس الأكثر تأثرًا بعمود العرض.</p>
<p>أساليب ملموسة تحسّن LCP اليوم:</p>
<ul>
<li><strong>اعرض المحتوى الموجود أعلى الطية من جانب الخادم</strong> بحيث يكون عنصر LCP في HTML الأولي. تفعل أطر مثل Next.js وRemix وSvelteKit وNuxt وAstro ذلك افتراضيًا.</li>
<li><strong>بث الاستجابة</strong> كي يبدأ المتصفح في تحليل الأصول واكتشافها قبل أن ينتهي الخادم من العرض. تجعل <code>renderToPipeableStream</code> في React 18 و\`\` الحدود هذا التقدم تدريجيًا: تُشحن القشرة فورًا وتصل الأجزاء الأبطأ مع حلها.</li>
<li><strong>ضمّن CSS الحرج</strong> الخاص بأنماط أعلى الطية كي لا يتأخر أول رسم بسبب رحلة ذهاب وإياب إلى ورقة أنماط.</li>
<li><strong>استضف الخطوط محليًا وحمّلها مسبقًا</strong> مع <code>crossorigin</code>؛ فالخطوط على الويب سبب شائع للتراجع في LCP.</li>
<li><strong>امنح صورة LCP أولوية <code>fetchpriority=&quot;high&quot;</code></strong> وتجاوز التحميل الكسول لها.</li>
</ul>
<p>كُتب مقال PRPL الأصلي قبل أن يصبح لـ«render» معايير نجاح موحدة. الارتباط بـ LCP/INP يجعل العمود قابلًا للاختبار؛ فيمكنك إثبات أن التغيير ساعد بدل التخمين.</p>
<h2 id="التخزين-المسبق-عامل-الخدمة-الجلب-المسبق-وحواف-cdn">التخزين المسبق: عامل الخدمة، الجلب المسبق، وحواف CDN</h2>
<p>يستخدم العمود الثالث وقت الخمول للتحضير لطلب المستخدم <em>التالي</em>. هناك ثلاث طبقات يجدر استخدامها معًا:</p>
<p><strong>التخزين المؤقت وقت التشغيل باستخدام عامل خدمة.</strong> <a href="https://developer.chrome.com/docs/workbox">Workbox</a> هي المكتبة الفعلية: اختر استراتيجية لكل مسار (<code>StaleWhileRevalidate</code> لهيكل التطبيق، و<code>CacheFirst</code> مع انتهاء الصلاحية للصور، و<code>NetworkFirst</code> لاستجابات API)، ويولّد Workbox عامل الخدمة نيابةً عنك. هذه هي الطبقة التي توفر لك تجربة غير متصلة مفيدة.</p>
<pre><code>import { registerRoute } from &quot;workbox-routing&quot;;
import { StaleWhileRevalidate, CacheFirst } from &quot;workbox-strategies&quot;;
import { ExpirationPlugin } from &quot;workbox-expiration&quot;;

registerRoute(
  ({ request }) =&gt; request.destination === &quot;script&quot;,
  new StaleWhileRevalidate({ cacheName: &quot;scripts&quot; })
);

registerRoute(
  ({ request }) =&gt; request.destination === &quot;image&quot;,
  new CacheFirst({
    cacheName: &quot;images&quot;,
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  })
);
</code></pre>
<p><strong>الجلب المسبق للروابط على مستوى الإطار.</strong> جلب Next.js وRemix وSvelteKit وNuxt حزم JavaScript للروابط الموجودة في إطار العرض (أو عند التحويم) كي يبدو التنقل فوريًا. لا تحتاج عادةً إلى إعداد ذلك؛ فهو مفعّل افتراضيًا. إذا كنت تبني يدويًا، فإن \`\` هي الأولية منخفضة المستوى.</p>
<p><strong>التخزين المؤقت على حافة CDN.</strong> الكثير مما كان يفعله إعداد هيكل التطبيق مع عامل الخدمة صار الآن مشمولًا عبر وضع ذاكرة مؤقتة على الحافة (Cloudflare أو Fastly أو Vercel أو Netlify) أمام المصدر وتخزين HTML الخاص بـ SSR طالما تسمح البيانات بذلك. أصبحت ISR (Next.js) والتخزين مع إعادة التحقق على الحافة هما البديلان الحديثان لـ«تسخين الصفحة التالية في الخلفية».</p>
<h2 id="التحميل-الكسول-الأوليات-الأصلية-تكفي-عادة">التحميل الكسول: الأوليات الأصلية تكفي عادةً</h2>
<p>كان التحميل الكسول أكثر الأعمدة تطلبًا للعمل عام 2016؛ إذ كان يعني تقسيم الشيفرة حسب المسار، والاستيرادات الديناميكية اليدوية، وتحميل الصور بواسطة IntersectionObserver. معظم ذلك مدمج الآن في منصة الويب.</p>
<ul>
<li><strong><code>import()</code> الديناميكي</strong> هو الطريقة الأصلية لتقسيم JavaScript وقت التشغيل. تحوّل أدوات التجميع كل استدعاء <code>import()</code> تلقائيًا إلى جزء منفصل.</li>
<li><strong><code>** و**</code></strong> يؤجلان الوسائط خارج الشاشة من دون سطر واحد من JavaScript. ادمجهما مع <code>decoding=&quot;async&quot;</code> للصور.</li>
<li><strong><code>content-visibility: auto</code></strong> يتيح للمتصفح تخطي التخطيط والرسم للأقسام خارج الشاشة، وهو مكسب كبير للصفحات الطويلة.</li>
<li><strong>التقسيم على مستوى المسار</strong> هو الوضع الافتراضي في كل إطار عمل حديث؛ ونادرًا ما تحتاج إلى تهيئته.</li>
</ul>
<p>المكان الوحيد الذي لا يزال التحميل الكسول يحتاج فيه إلى العناية هو عنصر LCP. لا تحمّل صورة الغلاف كسولًا أبدًا، ولا تقسم المكوّن الذي يحتويها إلى أجزاء أبدًا.</p>
<h2 id="هل-ما-زال-هيكل-التطبيق-موجودا">هل ما زال هيكل التطبيق موجودًا؟</h2>
<p>اعتمد العرض الأصلي لـ PRPL على <strong>نموذج هيكل التطبيق</strong>: شحن قشرة HTML+JS دنيا أولًا، ثم عرض الهياكل العظمية، ثم ملء المحتوى. كان منطقيًا لتطبيقات SPA التي يعرضها العميل على هواتف بطيئة.</p>
<p>حاليًا، حُلّ هيكل التطبيق إلى حد كبير بواسطة:</p>
<ul>
<li><strong>SSR مع البث</strong> (React 18 وSolid وAstro وQwik) — الخادم <em>هو</em> القشرة، وحواجز Suspense هي الهيكل العظمي.</li>
<li><strong>PWA مع Workbox</strong> لتجربة عدم الاتصال والتثبيت.</li>
<li><strong>العرض على الحافة</strong> كي تكون البايت الأول سريعًا بغض النظر عن مسافة المستخدم عن المصدر.</li>
</ul>
<p>لا يزال بإمكانك بناء PWA بهيكل تطبيق، وللطبيقات الويب شديدة التفاعل (المحررات التعاونية ولوحات المعلومات) غالبًا ما يكون الخيار الصحيح، لكنه لم يعد الإجابة <em>الافتراضية</em> لـ«اجعل هذا التحميل سريعًا».</p>
<h2 id="هل-ما-زال-prpl-الإطار-الصحيح">هل ما زال PRPL الإطار الصحيح؟</h2>
<p>يمكن فهم PRPL على أفضل صورة كحزمة أفكار من عام 2016 لا تزال كل فكرة منها صحيحة منفردة. لكن الحزمة نفسها تبدو قديمة: زال دفع الخادم، واندمجت رواية هيكل التطبيق في SSR المتدفق، وانتقل ما نقيسه من «زمن حتى التفاعل» إلى LCP وINP.</p>
<p>لا تزال الأعمدة الأربعة قائمة تحقق مفيدة عند تدقيق صفحة:</p>
<ul>
<li><strong>الدفع:</strong> هل تستخدم <code>preload</code> و<code>modulepreload</code> وEarly Hints للموارد التي تعرف أن المتصفح سيحتاجها؟</li>
<li><strong>العرض:</strong> هل عنصر LCP موجود في HTML الأولي، وهل LCP أقل من 2.5 ثانية عند المئين الـ75 من بيانات المستخدمين الحقيقيين؟</li>
<li><strong>التخزين المسبق:</strong> هل التنقل المرجح التالي مجلب مسبقًا؟ وهل لديك عامل خدمة للزيارات المتكررة؟</li>
<li><strong>التحميل الكسول:</strong> هل كل ما ليس ضروريًا لأول تفاعل مؤجل، وهل عنصر LCP <em>ليس</em> في هذه المجموعة؟</li>
</ul>
<p>إذا أردت الصيغة الحديثة: ابنِ على إطار عمل حديث يوفر SSR متدفقًا، وضعه خلف CDN حافي، وفعّل Early Hints، واتبع Core Web Vitals، لتحصل على PRPL دون التفكير فيه بوصفه PRPL.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://developer.chrome.com/blog/removing-push">إزالة دفع خادم HTTP/2 من Chrome</a> - Chrome Developers</li>
<li><a href="https://developer.chrome.com/docs/web-platform/early-hints">Early Hints</a> - Chrome Developers</li>
<li><a href="https://web.dev/articles/inp">التفاعل حتى الرسم التالي (INP)</a> - web.dev</li>
<li><a href="https://developer.chrome.com/docs/workbox">Workbox</a> - Chrome Developers</li>
<li><a href="https://web.dev/articles/apply-instant-loading-with-prpl">نمط PRPL</a> - web.dev (مؤرشف)</li>
</ul>
`,l={book:t,chapter:e,chapterTitle:o,slug:n,title:r,headings:i,html:s};export{t as book,e as chapter,o as chapterTitle,l as default,i as headings,s as html,n as slug,r as title};
