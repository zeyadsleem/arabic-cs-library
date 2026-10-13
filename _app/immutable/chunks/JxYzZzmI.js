const e="hono",a="middleware-third-party",i="الوسائط الخارجية",t="index",o="برمجيات وسيطة من طرف ثالث",h=[{depth:3,id:"المصادقة",text:"المصادقة"},{depth:3,id:"المدققات",text:"المدققات"},{depth:3,id:"openapi",text:"OpenAPI"},{depth:3,id:"التطوير",text:"التطوير"},{depth:3,id:"المراقبة-التتبع",text:"المراقبة / التتبع"},{depth:3,id:"الخادم-المهايئ",text:"الخادم / المهايئ"},{depth:3,id:"المحول",text:"المُحوِّل"},{depth:3,id:"واجهة-المستخدم-العارض",text:"واجهة المستخدم / العارض"},{depth:3,id:"الطابور-معالجة-المهام",text:"الطابور / معالجة المهام"},{depth:3,id:"التدويل",text:"التدويل"},{depth:3,id:"الأدوات-المساعدة",text:"الأدوات المساعدة"}],n=`<p>يشير مصطلح الوسائط من طرف ثالث (third-party middleware) إلى الوسائط غير المضمّنة داخل حزمة Hono.
يعتمد معظم هذه الوسيطة (middleware) على مكتبات خارجية.</p>
<h3 id="المصادقة">المصادقة</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/auth-js">Auth.js(Next Auth)</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/casbin">Casbin</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/clerk-auth">مصادقة Clerk</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/cloudflare-access">Cloudflare Access</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/oauth-providers">موفرو OAuth</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/oidc-auth">مصادقة OIDC</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/firebase-auth"><code>Firebase Auth</code></a></li>
<li><a href="https://github.com/wataruoguchi/verify-rsa-jwt-cloudflare-worker">التحقق من RSA JWT (JWKS)</a></li>
<li><a href="https://github.com/ssojet/ssojet-hono">مصادقة SSOJet</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/stytch-auth">مصادقة Stytch</a></li>
<li><a href="https://github.com/besart-k/hono-shopify-auth"><code>Shopify Auth</code></a></li>
</ul>
<h3 id="المدققات">المدققات</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/ajv-validator">مدقّق <code>Ajv</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/arktype-validator">مُدقِّق ArkType</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/class-validator">مُدقِّق Class</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/conform-validator">مُدقِّق Conform</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/effect-validator">مُحقِّق Effect Schema</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/standard-validator">مدقّق Standard Schema</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/typebox-validator">مُدقِّق TypeBox</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/typia-validator">مُدقِّق Typia</a></li>
<li><a href="https://github.com/ryoppippi/hono-unknownutil-validator">مُحقِّق unknownutil</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/valibot-validator">مُدقِّق Valibot</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/zod-validator">مدقّق <code>Zod</code></a></li>
</ul>
<h3 id="openapi">OpenAPI</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/zod-openapi">Zod OpenAPI</a></li>
<li><a href="https://github.com/scalar/scalar/tree/main/integrations/hono">Scalar</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/swagger-ui">Swagger UI</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/swagger-editor">محرّر <code>Swagger</code></a></li>
<li><a href="https://github.com/rhinobase/hono-openapi"><code>Hono OpenAPI</code></a></li>
<li><a href="https://github.com/paolostyle/hono-zod-openapi">hono-zod-openapi</a></li>
</ul>
<h3 id="التطوير">التطوير</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/eslint-config">إعداد <code>ESLint</code></a></li>
<li><a href="https://github.com/md-sagban/hono-testkit"><code>hono-testkit</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/ssg-plugins-essential">إضافة SSG الأساسية</a></li>
</ul>
<h3 id="المراقبة-التتبع">المراقبة / التتبع</h3>
<ul>
<li><a href="https://docs.apitally.io/frameworks/hono">Apitally (مراقبة وتحليلات API)</a></li>
<li><a href="https://www.highlight.io/docs/getting-started/backend-sdk/js/hono"><code>Highlight.io</code></a></li>
<li><a href="https://logtape.org/manual/integrations#hono">LogTape (التسجيل)</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/otel"><code>OpenTelemetry</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/prometheus">مقاييس Prometheus</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/sentry">Sentry</a></li>
<li><a href="https://github.com/maou-shonen/hono-pino">مسجِّل Pino</a></li>
</ul>
<h3 id="الخادم-المهايئ">الخادم / المهايئ</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/graphql-server">خادم <code>GraphQL</code></a></li>
<li><a href="https://orpc.dev/docs/adapters/hono">oRPC</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/trpc-server">خادم tRPC</a></li>
<li><a href="https://github.com/mcp-use/mcp-use">mcp-use (خادم MCP)</a></li>
</ul>
<h3 id="المحول">المُحوِّل</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/bun-transpiler">مُحوّل <code>Bun</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/esbuild-transpiler">مُحوِّل esbuild</a></li>
</ul>
<h3 id="واجهة-المستخدم-العارض">واجهة المستخدم / العارض</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/qwik-city">Qwik City</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/react-compat">التوافق مع React</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/react-renderer">مُصيّر <code>React</code></a></li>
</ul>
<h3 id="الطابور-معالجة-المهام">الطابور / معالجة المهام</h3>
<ul>
<li><a href="https://github.com/avifenesh/glidemq-hono">GlideMQ (واجهة REST API لقائمة انتظار الرسائل + SSE)</a></li>
</ul>
<h3 id="التدويل">التدويل</h3>
<ul>
<li><a href="https://intlayer.org/doc/environment/hono"><code>Intlayer i18n</code></a></li>
</ul>
<h3 id="الأدوات-المساعدة">الأدوات المساعدة</h3>
<ul>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/bun-compress"><code>Bun Compress</code></a></li>
<li><a href="https://capjs.js.org/guide/middleware/hono.html"><code>Cap Checkpoint</code></a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/event-emitter">باعث الأحداث</a></li>
<li><a href="https://github.com/ktkongtong/hono-geo-middleware/tree/main/packages/middleware"><code>Geo</code></a></li>
<li><a href="https://github.com/rhinobase/hono-rate-limiter">محدِّد معدّل Hono</a></li>
<li><a href="https://github.com/paveg/hono-problem-details">تفاصيل مشاكل Hono (RFC 9457)</a></li>
<li><a href="https://github.com/maou-shonen/hono-simple-DI"><code>Hono Simple DI</code></a></li>
<li><a href="https://github.com/inferdi/inferdi/tree/main/packages/hono">InferDI</a></li>
<li><a href="https://github.com/paveg/hono-idempotency">اللااتّساقية (Idempotency) (مفاتيح idempotency بنمط Stripe)</a></li>
<li><a href="https://js.idempot.dev">idempot-js</a> - وسيطة متوافقة مع المواصفات، تدعم عدة خلفيات تخزين (redis و postgres و mysql و sqlite)</li>
<li><a href="https://github.com/dswbx/jsonv-ts">jsonv-ts (Validator، OpenAPI، MCP)</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/mcp"><code>MCP</code></a></li>
<li><a href="https://github.com/ronin-co/hono-client">RONIN (قاعدة بيانات)</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/session">الجلسة</a></li>
<li><a href="https://github.com/rejifald/StitchAPI/tree/main/packages/hono">StitchAPI (نداءات API مُنمّطة ومرنة + SSE)</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/tsyringe">tsyringe</a></li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/ua-blocker">حاجب قائم على User Agent</a></li>
</ul>
`,l={book:e,chapter:a,chapterTitle:i,slug:t,title:o,headings:h,html:n};export{e as book,a as chapter,i as chapterTitle,l as default,h as headings,n as html,t as slug,o as title};
