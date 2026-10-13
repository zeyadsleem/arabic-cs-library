const s="hono",p="api",n="مرجع الواجهة",a="presets",o="الإعدادات المسبقة",t=[{depth:2,id:"hono",text:"hono"},{depth:2,id:"honoquick",text:"hono/quick"},{depth:2,id:"honotiny",text:"hono/tiny"},{depth:2,id:"أي-إعداد-مسبق-يجب-أن-أستخدم",text:"أي إعداد مسبق يجب أن أستخدم؟"}],e=`<p>لدى Hono عدة موجّهات (routers)، كل منها مُصمَّم لغرض محدد.
يمكنك تحديد الموجّه (router) الذي تريد استخدامه في مُنشئ (constructor) Hono.</p>
<p><strong>تُوفَّر قوالب جاهزة (Presets)</strong> لحالات الاستخدام الشائعة، لذلك لا يتعين عليك تحديد الموجّه في كل مرة.
الـ <code>Hono</code> الكلاس المستورد من جميع القوالب الجاهزة (presets) هو نفسه، والفرق الوحيد هو الموجّه.
لذلك، يمكنك استخدامها بالتبادل.</p>
<h2 id="hono"><code>hono</code></h2>
<p>الاستخدام:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
</code></pre>
<p>الموجِّهات:</p>
<pre><code class="language-ts"><span class="hljs-variable language_">this</span>.<span class="hljs-property">router</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SmartRouter</span>({
  <span class="hljs-attr">routers</span>: [<span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExpRouter</span>(), <span class="hljs-keyword">new</span> <span class="hljs-title class_">TrieRouter</span>()],
})
</code></pre>
<h2 id="honoquick"><code>hono/quick</code></h2>
<p>الاستخدام:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/quick&#x27;</span>
</code></pre>
<p>الموجِّه:</p>
<pre><code class="language-ts"><span class="hljs-variable language_">this</span>.<span class="hljs-property">router</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SmartRouter</span>({
  <span class="hljs-attr">routers</span>: [<span class="hljs-keyword">new</span> <span class="hljs-title class_">LinearRouter</span>(), <span class="hljs-keyword">new</span> <span class="hljs-title class_">TrieRouter</span>()],
})
</code></pre>
<h2 id="honotiny"><code>hono/tiny</code></h2>
<p>الاستخدام:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/tiny&#x27;</span>
</code></pre>
<p>الموجِّه:</p>
<pre><code class="language-ts"><span class="hljs-variable language_">this</span>.<span class="hljs-property">router</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PatternRouter</span>()
</code></pre>
<h2 id="أي-إعداد-مسبق-يجب-أن-أستخدم">أي إعداد مسبق يجب أن أستخدم؟</h2>
<table>
<thead>
<tr>
<th>الإعداد المسبق (Preset)</th>
<th>المنصات المناسبة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>hono</code></td>
<td>هذا موصى به بشدة لمعظم حالات الاستخدام. على الرغم من أن مرحلة التسجيل قد تكون أبطأ من <code>hono/quick</code>، فإنه يُظهر أداءً عاليًا بمجرد تشغيله. إنه مثالي للخوادم طويلة العمر المبنية بـ <strong>Deno</strong> أو <strong>Bun</strong> أو <strong>Node.js</strong>. وهو مناسب أيضًا لـ <strong>Fastly Compute</strong>، حيث يحدث تسجيل المسار أثناء مرحلة بناء التطبيق على تلك المنصة. بالنسبة لبيئات مثل <strong>Cloudflare Workers</strong> و <strong>Deno Deploy</strong> حيث تُستخدم عوازل v8 (isolates)، فإن هذا الإعداد المسبق مناسب أيضًا لأن العوازل تستمر لفترة معينة من الوقت بعد التشغيل.</td>
</tr>
<tr>
<td><code>hono/quick</code></td>
<td>هذا الإعداد المسبق مصمم للبيئات التي تتم فيها تهيئة التطبيق لكل طلب.</td>
</tr>
<tr>
<td><code>hono/tiny</code></td>
<td>هذه هي أصغر حزمة موجه (router) وهي مناسبة للبيئات ذات الموارد المحدودة.</td>
</tr>
</tbody>
</table>
`,l={book:s,chapter:"api",chapterTitle:n,slug:a,title:o,headings:t,html:e};export{s as book,p as chapter,n as chapterTitle,l as default,t as headings,e as html,a as slug,o as title};
