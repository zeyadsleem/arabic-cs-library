const n="hono",o="concepts",t="المفاهيم",e="index",s="الفلسفة",r=[{depth:2,id:"الدافع",text:"الدافع"}],p=`<p>في هذا القسم، نتحدث عن مفهوم Hono أو فلسفته.</p>
<h2 id="الدافع">الدافع</h2>
<p>في البداية، أردت فقط إنشاء تطبيق ويب على Cloudflare Workers.
لكن لم يكن هناك إطار عمل (framework) جيد يعمل على Cloudflare Workers.
لذا، بدأت في بناء Hono.</p>
<p>اعتقدت أنها ستكون فرصة جيدة لتعلم كيفية بناء موجّه باستخدام أشجار Trie.
ثم جاء صديق بموجّه (router) سريع للغاية اسمه &quot;RegExpRouter&quot;.
ولدَيَّ أيضًا صديق أنشأ وسيط (middleware) المصادقة الأساسية (Basic authentication).</p>
<p>باستخدام واجهات برمجة تطبيقات الويب القياسية (Web Standard APIs) فقط، تمكنا من جعله يعمل على Deno و Bun. عندما سأل الناس &quot;هل يوجد Express لـ Bun؟&quot;، كان بإمكاننا الإجابة، &quot;لا، لكن يوجد Hono&quot;.
(على الرغم من أن Express يعمل على Bun الآن.)</p>
<p>لدينا أيضًا أصدقاء يصنعون خوادم GraphQL ومصادقة Firebase ووسيطة Sentry.
كما لدينا أيضًا محوّل لـ Node.js.
نشأ نظام بيئي.</p>
<p>بعبارة أخرى، Hono سريع بشكل مذهل، ويجعل الكثير من الأشياء ممكنة، ويعمل في أي مكان.
يمكننا أن نتخيل أن Hono قد يصبح <strong>معيار معايير الويب (Web Standards)</strong>.</p>
`,a={book:n,chapter:o,chapterTitle:t,slug:e,title:s,headings:r,html:p};export{n as book,o as chapter,t as chapterTitle,a as default,r as headings,p as html,e as slug,s as title};
