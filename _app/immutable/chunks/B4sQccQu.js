const n="hono",e="getting-started",t="مقدمات",o="index",s="Hono",a=[{depth:2,id:"title-hono-إطار-ويب-مبني-على-معايير-الويب-titletemplate-title",text:`title: Hono - إطار ويب مبني على معايير الويب
titleTemplate: ':title'`},{depth:2,id:"البدء-السريع",text:"البدء السريع"},{depth:2,id:"الميزات",text:"الميزات"},{depth:2,id:"حالات-الاستخدام",text:"حالات الاستخدام"},{depth:2,id:"من-يستخدم-hono",text:"من يستخدم Hono؟"},{depth:2,id:"hono-في-دقيقة-واحدة",text:"Hono في دقيقة واحدة"},{depth:2,id:"فائق-السرعة",text:"فائق السرعة"},{depth:2,id:"خفيف-الوزن",text:"خفيف الوزن"},{depth:2,id:"موجهات-متعددة",text:"موجّهات متعددة"},{depth:2,id:"معايير-الويب",text:"معايير الويب"},{depth:2,id:"البرمجيات-الوسيطة-والمساعدات",text:"البرمجيات الوسيطة والمساعدات"},{depth:2,id:"تجربة-المطور",text:"تجربة المطوّر"}],r=`<hr>
<h2 id="title-hono-إطار-ويب-مبني-على-معايير-الويب-titletemplate-title">title: Hono - إطار ويب مبني على معايير الويب
titleTemplate: ':title'</h2>
<h1>Hono</h1>
<p>Hono - <em><strong>تعني اللهب 🔥 باليابانية</strong></em> - هو إطار عمل ويب صغير وبسيط وفائق السرعة مبني على معايير الويب.
يعمل على أي وقت تشغيل JavaScript: Cloudflare Workers، Fastly Compute، Deno، Bun، Vercel، Netlify، AWS Lambda، Lambda@Edge، و Node.js.</p>
<p>سريع، وليس سريعًا فحسب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hono!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h2 id="البدء-السريع">البدء السريع</h2>
<p>شغّل هذا فقط:</p>
<pre><code class="language-sh">npm create hono@latest
</code></pre>
<pre><code class="language-sh">yarn create hono
</code></pre>
<pre><code class="language-sh">pnpm create hono@latest
</code></pre>
<pre><code class="language-sh">bun create hono@latest
</code></pre>
<pre><code class="language-sh">deno init --npm hono@latest
</code></pre>
<h2 id="الميزات">الميزات</h2>
<ul>
<li><strong>فائق السرعة</strong> 🚀 - الموجّه <code>RegExpRouter</code> سريع حقًا. لا يستخدم حلقات خطية. سريع.</li>
<li><strong>خفيف</strong> 🪶 - الـ <code>hono/tiny</code> القالب الجاهز (preset) أقل من 14kB. لا يمتلك Hono أي تبعيات (dependencies) ولا يستخدم سوى معايير الويب.</li>
<li><strong>متعدد أوقات التشغيل (Multi-runtime)</strong> 🌍 - يعمل على Cloudflare Workers و Fastly Compute و Deno و Bun و AWS Lambda أو Node.js. نفس الكود يعمل على جميع المنصات.</li>
<li><strong>بطاريات مشمولة (Batteries Included)</strong> 🔋 - يمتلك Hono وسائط مدمجة ووسائط مخصصة ووسائط خارجية وأدوات مساعدة. كل شيء مشمول.</li>
<li><strong>تجربة مطور ممتعة (DX)</strong> 😃 - واجهات API نظيفة للغاية. دعم TypeScript من الدرجة الأولى. الآن، لدينا &quot;الأنواع&quot;.</li>
</ul>
<h2 id="حالات-الاستخدام">حالات الاستخدام</h2>
<p>Hono هو إطار عمل بسيط لتطبيقات الويب يشبه Express، دون واجهة أمامية (frontend).
لكنه يعمل على حواف CDN (CDN Edges) ويتيح لك بناء تطبيقات أكبر عند دمجه مع الوسائط.
فيما يلي بعض الأمثلة على حالات الاستخدام.</p>
<ul>
<li>بناء واجهات برمجة تطبيقات الويب</li>
<li>وكيل لخوادم الواجهة الخلفية</li>
<li>أمام CDN</li>
<li>تطبيق Edge</li>
<li>خادم أساسي لمكتبة</li>
<li>تطبيق متكامل (full-stack)</li>
</ul>
<h2 id="من-يستخدم-hono">من يستخدم Hono؟</h2>
<table>
<thead>
<tr>
<th>المشروع (Project)</th>
<th>المنصة (Platform)</th>
<th>الغرض (What for?)</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://cdnjs.com">cdnjs</a></td>
<td>Cloudflare Workers</td>
<td>خدمة CDN مجانية ومفتوحة المصدر. <em>يُستخدم Hono لخادم API</em>.</td>
</tr>
<tr>
<td><a href="https://www.cloudflare.com/developer-platform/d1/"><code>Cloudflare D1</code></a></td>
<td>Cloudflare Workers</td>
<td>قواعد بيانات SQL بدون خادم (Serverless). <em>يُستخدم Hono لخادم API الداخلي</em>.</td>
</tr>
<tr>
<td><a href="https://www.cloudflare.com/developer-platform/workers-kv/">Cloudflare Workers KV</a></td>
<td>Cloudflare Workers</td>
<td>قاعدة بيانات قيم-مفاتيح بدون خادم (key-value). <em>يُستخدم Hono لخادم API الداخلي</em>.</td>
</tr>
<tr>
<td><a href="https://baseai.dev">BaseAI</a></td>
<td>Local AI Server</td>
<td>خطوط أنابيب (pipes) لوكيل AI بدون خادم مع ذاكرة. إطار عمل وكلاء AI مفتوح المصدر للويب. <em>خادم API مع Hono</em>.</td>
</tr>
<tr>
<td><a href="https://unkey.dev">Unkey</a></td>
<td>Cloudflare Workers</td>
<td>مصادقة وتفويض (authentication and authorization) مفتوح المصدر لواجهات API. <em>يُستخدم Hono لخادم API</em>.</td>
</tr>
<tr>
<td><a href="https://openstatus.dev">OpenStatus</a></td>
<td>Bun</td>
<td>منصة مراقبة مواقع وواجهات API مفتوحة المصدر. <em>يُستخدم Hono لخادم API</em>.</td>
</tr>
<tr>
<td><a href="https://deno.com/benchmarks">اختبارات أداء Deno</a></td>
<td>Deno</td>
<td>وقت تشغيل TypeScript آمن مبني على V8. <em>يُستخدم Hono للقياس (benchmarking)</em>.</td>
</tr>
<tr>
<td><a href="https://clerk.com">Clerk</a></td>
<td>Cloudflare Workers</td>
<td>منصة إدارة مستخدمين مفتوحة المصدر. <em>يُستخدم Hono لخادم API</em>.</td>
</tr>
<tr>
<td><a href="https://posthog.com">PostHog</a></td>
<td>Node.js</td>
<td>المنصة مفتوحة المصدر لبناء منتجات ذاتية القيادة. <em>يُستخدم Hono لخادم MCP</em>.</td>
</tr>
</tbody>
</table>
<p>وما يلي.</p>
<ul>
<li><a href="https://driv.ly/">Drivly</a> - Cloudflare Workers</li>
<li><a href="https://repeat.dev/">repeat.dev</a> - Cloudflare Workers</li>
</ul>
<p>هل تريد رؤية المزيد؟ انظر <a href="https://github.com/orgs/honojs/discussions/1510">من يستخدم Hono في بيئة الإنتاج؟</a>.</p>
<h2 id="hono-في-دقيقة-واحدة">Hono في دقيقة واحدة</h2>
<p>عرض توضيحي لإنشاء تطبيق لـ Cloudflare Workers باستخدام Hono.</p>
<p><img src="/arabic-cs-library/images/hono/sc.gif" alt="صورة متحركة (gif) تُظهر إنشاء تطبيق hono بسرعة مع تكرار سريع."></p>
<h2 id="فائق-السرعة">فائق السرعة</h2>
<p><strong>Hono هو الأسرع</strong>، مقارنةً بالموجّهات (routers) الأخرى لـ Cloudflare Workers.</p>
<pre><code>Hono x 402,820 ops/sec ±4.78% (80 runs sampled)
itty-router x 212,598 ops/sec ±3.11% (87 runs sampled)
sunder x 297,036 ops/sec ±4.76% (77 runs sampled)
worktop x 197,345 ops/sec ±2.40% (88 runs sampled)
Fastest is Hono
✨  Done in 28.06s.
</code></pre>
<p>انظر <a href="https://hono.dev/docs/concepts/benchmarks">المزيد من اختبارات الأداء</a>.</p>
<h2 id="خفيف-الوزن">خفيف الوزن</h2>
<p><strong>Hono صغير جدًا</strong>. مع <code>hono/tiny</code> الإعداد المسبق (preset)، حجمه <strong>أقل من 14KB</strong> عند التصغير (minified). هناك العديد من الوسائط والمحولات (adapters)، لكنها تُدمج في الحزمة فقط عند استخدامها. للسياق، حجم Express هو 572KB.</p>
<pre><code>$ npx wrangler dev --minify ./src/index.ts
 ⛅️ wrangler 2.20.0
--------------------
⬣ Listening at http://0.0.0.0:8787
- http://127.0.0.1:8787
- http://192.168.128.165:8787
Total Upload: 11.47 KiB / gzip: 4.34 KiB
</code></pre>
<h2 id="موجهات-متعددة">موجّهات متعددة</h2>
<p><strong>لدى Hono عدة موجّهات</strong>.</p>
<p><strong>RegExpRouter</strong> هو أسرع موجه (router) في عالم JavaScript. يطابق المسار باستخدام Regex كبير واحد يُنشأ قبل التوزيع (dispatch). مع <strong>SmartRouter</strong>، يدعم جميع أنماط المسارات.</p>
<p><strong>LinearRouter</strong> يسجل المسارات بسرعة كبيرة، لذا فهو مناسب لبيئة تهيئ التطبيقات في كل مرة. <strong>PatternRouter</strong> ببساطة يضيف النمط ويطابقه، مما يجعله صغيرًا.</p>
<p>انظر <a href="https://hono.dev/docs/concepts/routers">مزيد من المعلومات حول المسارات</a>.</p>
<h2 id="معايير-الويب">معايير الويب</h2>
<p>بفضل استخدام <strong>معايير الويب (Web Standards)</strong>، يعمل Hono على الكثير من المنصات.</p>
<ul>
<li>Cloudflare Workers</li>
<li>Fastly Compute</li>
<li>Deno</li>
<li>Bun</li>
<li>Vercel</li>
<li>AWS Lambda</li>
<li>Lambda@Edge</li>
<li>أخرى</li>
</ul>
<p>وباستخدام <a href="https://github.com/honojs/node-server">مُهايئ Node.js</a>، يعمل Hono على Node.js.</p>
<p>انظر <a href="https://hono.dev/docs/concepts/web-standard">مزيد من المعلومات حول معايير الويب (Web Standards)</a>.</p>
<h2 id="البرمجيات-الوسيطة-والمساعدات">البرمجيات الوسيطة والمساعدات</h2>
<p><strong>يمتلك Hono العديد من الوسائط (middleware) والأدوات المساعدة</strong>. وهذا يجعل &quot;اكتب أقل، أنجز أكثر&quot; حقيقة واقعة.</p>
<p>من دون إعداد إضافي، يوفّر Hono وسيطات (middleware) ومساعدات (helpers) لـ:</p>
<ul>
<li><a href="https://hono.dev/docs/middleware/builtin/basic-auth">المصادقة الأساسية</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/bearer-auth">مصادقة Bearer</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/body-limit">حدّ حجم الجسم (Body Limit)</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/cache">التخزين المؤقت</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/compress">الضغط (Compress)</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/context-storage">تخزين السياق</a></li>
<li><a href="https://hono.dev/docs/helpers/cookie">Cookie</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/cors">CORS</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/etag">ETag</a></li>
<li><a href="https://hono.dev/docs/helpers/html">html</a></li>
<li><a href="https://hono.dev/docs/guides/jsx"><code>JSX</code></a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/jwt">مصادقة JWT</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/logger">Logger</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/language">اللغة</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/pretty-json">JSON مُنسَّق (Pretty JSON)</a></li>
<li><a href="https://hono.dev/docs/middleware/builtin/secure-headers">الترويسات الآمنة</a></li>
<li><a href="https://hono.dev/docs/helpers/ssg"><code>SSG</code></a></li>
<li><a href="https://hono.dev/docs/helpers/streaming">البث</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/graphql-server">خادم <code>GraphQL</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/firebase-auth">مصادقة Firebase</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/sentry">Sentry</a></li>
<li>أخرى!</li>
</ul>
<p>على سبيل المثال، إضافة ETag وتسجيل الطلبات لا يتطلب سوى بضعة أسطر من الكود باستخدام Hono:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { etag } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/etag&#x27;</span>
<span class="hljs-keyword">import</span> { logger } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/logger&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">etag</span>(), <span class="hljs-title function_">logger</span>())
</code></pre>
<p>انظر <a href="https://hono.dev/docs/concepts/middleware">مزيد من المعلومات حول البرمجيات الوسيطة (Middleware)</a>.</p>
<h2 id="تجربة-المطور">تجربة المطوّر</h2>
<p>يوفّر Hono &quot;<strong>تجربة مطوّر</strong>&quot; (Developer Experience) ممتعة.</p>
<p>وصول سهل إلى Request/Response بفضل <code>Context</code> كائن.
علاوةً على ذلك، Hono مكتوب بـ TypeScript. يمتلك Hono &quot;<strong>أنواعاً</strong>&quot; (Types).</p>
<p>على سبيل المثال، ستكون معاملات المسار (path parameters) من أنواع حرفية (literal types).</p>
<p><img src="/arabic-cs-library/images/hono/ss.png" alt="لقطة شاشة تُظهر Hono بكتابة حرفية (literal typing) صحيحة عند معاملات URL. يسمح عنوان URL &quot;/entry/:date/:id&quot; بأن تكون معاملات الطلب &quot;date&quot; أو &quot;id&quot;"></p>
<p>و، المدقّق (Validator) وعميل Hono <code>hc</code> تفعيل وضع RPC. في وضع RPC،
يمكنك استخدام أداة التحقق (validator) المفضلة لديك مثل Zod ومشاركة مواصفات واجهة API من جانب الخادم مع العميل بسهولة وبناء تطبيقات آمنة من حيث الأنواع (type-safe).</p>
<p>انظر <a href="https://hono.dev/docs/concepts/stacks">Hono Stacks</a>.</p>
`,l={book:n,chapter:e,chapterTitle:t,slug:o,title:s,headings:a,html:r};export{n as book,e as chapter,t as chapterTitle,l as default,a as headings,r as html,o as slug,s as title};
