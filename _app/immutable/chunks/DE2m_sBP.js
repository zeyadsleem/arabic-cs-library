const s="hono",n="concepts",a="المفاهيم",t="benchmarks",l="معايير الأداء",p=[{depth:2,id:"الموجهات",text:"الموجهات"},{depth:3,id:"على-nodejs",text:"على Node.js"},{depth:3,id:"على-bun",text:"على Bun"},{depth:2,id:"cloudflare-workers",text:"Cloudflare Workers"},{depth:2,id:"deno",text:"Deno"},{depth:2,id:"bun",text:"Bun"}],r=`<p>الاختبارات المعيارية (Benchmarks) مجرد اختبارات معيارية، لكنها مهمة لنا.</p>
<h2 id="الموجهات">الموجهات</h2>
<p>قمنا بقياس سرعات مجموعة من موجِّهات JavaScript.
على سبيل المثال، <code>find-my-way</code> موجّه سريع جدًا يُستخدم داخل Fastify.</p>
<ul>
<li>@medley/router</li>
<li>find-my-way</li>
<li>koa-tree-router</li>
<li>trek-router</li>
<li>express (يتضمن المعالجة)</li>
<li>koa-router</li>
</ul>
<p>أولًا، سجّلنا التوجيه (routing) التالي على كلٍ من موجّهاتنا (routers).
هذه مشابهة لتلك المستخدمة في العالم الحقيقي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Route</span> {
  <span class="hljs-attr">method</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>
}
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: <span class="hljs-title class_">Route</span>[] = [
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/comments&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/avatar&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/lookup/username/:username&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/lookup/email/:address&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/event/:id&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/event/:id/comments&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/event/:id/comment&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/map/:location/events&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/status&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/very/deeply/nested/route/hello/there&#x27;</span> },
  { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/static/*&#x27;</span> },
]
</code></pre>
<p>ثم أرسلنا الطلب (Request) إلى نقاط النهاية كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Route</span> {
  <span class="hljs-attr">method</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>
}
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: (<span class="hljs-title class_">Route</span> &amp; { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> })[] = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;short static&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;static with same radix&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/comments&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;dynamic route&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/user/lookup/username/hey&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;mixed static dynamic&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/event/abcd1234/comments&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;post&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/event/abcd1234/comment&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;long static&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/very/deeply/nested/route/hello/there&#x27;</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;wildcard&#x27;</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/static/index.html&#x27;</span>,
  },
]
</code></pre>
<p>لنرَ النتائج.</p>
<h3 id="على-nodejs">على Node.js</h3>
<p>تُظهر لقطات الشاشة التالية النتائج على Node.js.</p>
<p><img src="/arabic-cs-library/images/hono/bench01.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench02.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench03.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench04.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench05.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench06.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench07.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench08.png" alt=""></p>
<h3 id="على-bun">على Bun</h3>
<p>تُظهر اللقطات التالية النتائج على Bun.</p>
<p><img src="/arabic-cs-library/images/hono/bench09.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench10.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench11.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench12.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench13.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench14.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench15.png" alt=""></p>
<p><img src="/arabic-cs-library/images/hono/bench16.png" alt=""></p>
<h2 id="cloudflare-workers">Cloudflare Workers</h2>
<p><strong>Hono هو الأسرع</strong>، مقارنةً بالموجّهات (routers) الأخرى لـ Cloudflare Workers.</p>
<ul>
<li>الجهاز: Apple MacBook Pro، 32 GiB، M1 Pro</li>
<li>Scripts: <a href="https://github.com/honojs/hono/tree/main/benchmarks/handle-event">benchmarks/handle-event</a></li>
</ul>
<pre><code>Hono x 402,820 ops/sec ±4.78% (80 runs sampled)
itty-router x 212,598 ops/sec ±3.11% (87 runs sampled)
sunder x 297,036 ops/sec ±4.76% (77 runs sampled)
worktop x 197,345 ops/sec ±2.40% (88 runs sampled)
Fastest is Hono
✨  Done in 28.06s.
</code></pre>
<h2 id="deno">Deno</h2>
<p><strong>Hono هو الأسرع</strong>، مقارنةً بأطر عمل أخرى لـ Deno.</p>
<ul>
<li>الجهاز: Apple MacBook Pro، 32 GiB، M1 Pro، Deno v1.22.0</li>
<li>Scripts: <a href="https://github.com/honojs/hono/tree/main/benchmarks/deno">benchmarks/deno</a></li>
<li>Method: <code>bombardier --fasthttp -d 10s -c 100 'http://localhost:8000/user/lookup/username/foo'</code></li>
</ul>
<table>
<thead>
<tr>
<th>الإطار</th>
<th style="text-align:center">الإصدار</th>
<th style="text-align:right">النتائج</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Hono</strong></td>
<td style="text-align:center">3.0.0</td>
<td style="text-align:right"><strong>الطلبات/ثانية: 136112</strong></td>
</tr>
<tr>
<td>Fast</td>
<td style="text-align:center">4.0.0-beta.1</td>
<td style="text-align:right">الطلبات/ثانية: 103214</td>
</tr>
<tr>
<td>Megalo</td>
<td style="text-align:center">0.3.0</td>
<td style="text-align:right">الطلبات/ثانية: 64597</td>
</tr>
<tr>
<td>Faster</td>
<td style="text-align:center">5.7</td>
<td style="text-align:right">الطلبات/ثانية: 54801</td>
</tr>
<tr>
<td>oak</td>
<td style="text-align:center">10.5.1</td>
<td style="text-align:right">الطلبات/ثانية: 43326</td>
</tr>
<tr>
<td>opine</td>
<td style="text-align:center">2.2.0</td>
<td style="text-align:right">الطلبات/ثانية: 30700</td>
</tr>
</tbody>
</table>
<p>نتيجة معيار أداء أخرى: <a href="https://github.com/denosaurs/bench">denosaurs/bench</a></p>
<h2 id="bun">Bun</h2>
<p>Hono هو أحد أسرع الأطر لـ Bun.
يمكنك رؤيته أدناه.</p>
<ul>
<li><a href="https://github.com/SaltyAom/bun-http-framework-benchmark">SaltyAom/bun-http-framework-benchmark</a></li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:r};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,r as html,t as slug,l as title};
