const s="hono",n="agents",a="الوكلاء",e="cli",o="Hono CLI",t=[{depth:2,id:"التثبيت",text:"التثبيت"},{depth:2,id:"المخرجات",text:"المخرجات"},{depth:2,id:"الأوامر",text:"الأوامر"},{depth:3,id:"routes",text:"routes"},{depth:3,id:"request",text:"request"},{depth:3,id:"batch",text:"batch"},{depth:3,id:"snapshot",text:"snapshot"},{depth:3,id:"diff",text:"diff"},{depth:3,id:"benchmark",text:"benchmark"},{depth:3,id:"ssg",text:"ssg"},{depth:3,id:"init",text:"init"}],c=`<p>Hono CLI (<code>hono</code>) هي أداة سطر أوامر (CLI) لـ Hono، مصممة للوكلاء البرمجيين (coding agents). تحمّل تطبيق Hono الخاص بك مباشرة، لذا يمكن للوكيل فحص التطبيق واختباره دون تشغيل خادم. تطبع الأوامر JSON افتراضيًا. <code>routes</code>, <code>request</code>, <code>benchmark</code>، و <code>ssg</code> خذ <code>--plain</code> عندما يقرأ الإنسان المخرجات.</p>
<h2 id="التثبيت">التثبيت</h2>
<p>ثبّته في مشروعك. يجد وكلاء البرمجة في <code>package.json</code>.</p>
<pre><code class="language-sh">npm install -D @hono/cli
</code></pre>
<p>أو بشكل عام:</p>
<pre><code class="language-sh">npm install -g @hono/cli
</code></pre>
<h2 id="المخرجات">المخرجات</h2>
<p>تطبع الأوامر JSON إلى stdout. <code>snapshot</code> يطبع بدلاً من ذلك أسطر JSONL دفعةً واحدة.</p>
<ul>
<li>النجاح: <code>{ &quot;ok&quot;: true, &quot;data&quot;: ... }</code> مع رمز الخروج 0</li>
<li>الفشل: <code>{ &quot;ok&quot;: false, &quot;error&quot;: { &quot;code&quot;, &quot;message&quot;, &quot;suggestions&quot;, &quot;docs&quot; } }</code> مع رمز الخروج 1</li>
</ul>
<p>عند الفشل، <code>error.suggestions</code> يذكر ما يجب تجربته لاحقًا، و <code>error.docs</code> يشير إلى صفحة على هذا الموقع. تذهب السجلات إلى stderr.</p>
<p><code>hono --help</code> يبدأ بملاحظة قصيرة لوكلاء البرمجة، و <code>hono &lt;command&gt; --help</code> يحتوي على أمثلة وملاحظات لكل أمر. لا يحتاج الوكيل (agent) إلى أي شيء آخر لاستخدام واجهة CLI.</p>
<h2 id="الأوامر">الأوامر</h2>
<table>
<thead>
<tr>
<th>الأمر</th>
<th>ما الذي يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>hono routes [file]</code></td>
<td>اعرض مسارات تطبيق Hono الخاص بك</td>
</tr>
<tr>
<td><code>hono request [path] [file]</code></td>
<td>أرسل طلبًا إلى تطبيقك باستخدام <code>app.request()</code></td>
</tr>
<tr>
<td><code>hono batch &lt;source&gt; [file]</code></td>
<td>شغّل طلبات متعددة من JSONL باستخدام <code>app.request()</code></td>
</tr>
<tr>
<td><code>hono snapshot [file]</code></td>
<td>اطبع السلوك الحالي كأسطر JSONL دفعية</td>
</tr>
<tr>
<td><code>hono diff</code></td>
<td>اعرض ما تغيّره تغييراتك غير المُلتزَم بها</td>
</tr>
<tr>
<td><code>hono benchmark [file]</code></td>
<td>قِس أداء تطبيق Hono الخاص بك</td>
</tr>
<tr>
<td><code>hono ssg [file]</code></td>
<td>ولِّد ملفات ثابتة من تطبيق Hono الخاص بك</td>
</tr>
<tr>
<td><code>hono init</code></td>
<td>أضِف تطبيق Hono إلى الدليل الحالي</td>
</tr>
</tbody>
</table>
<p><code>file</code> هو المسار إلى ملف تطبيقك. عند حذفه، يتم العثور على التطبيق في <code>src/index.ts</code>, <code>src/index.tsx</code>, <code>src/index.js</code>، أو <code>src/index.jsx</code>. TypeScript وJSX مدعومان.</p>
<h3 id="routes">routes</h3>
<p>اعرض جميع مسارات تطبيق Hono لديك، مثل <a href="https://hono.dev/docs/helpers/dev#showroutes"><code>showRoutes()</code></a>. يتم حل المسارات (routes) من مثيل التطبيق الفعلي، لذا فإن التطبيقات الفرعية المُثبَّتة (sub-apps) و <code>basePath</code> يتم توسيعها.</p>
<pre><code class="language-sh">hono routes
hono routes --verbose src/app.ts
</code></pre>
<ul>
<li><code>--verbose</code> - تضمين البرمجيات الوسيطة</li>
<li><code>--plain</code> - مخرجات مقروءة للبشر بدلاً من JSON</li>
<li><code>-e, --external &lt;package&gt;</code> - وضع علامة على حزمة كخارجية (external) (يمكن استخدامه عدة مرات)</li>
</ul>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;router&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SmartRouter + RegExpRouter&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;routes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;[handler]&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;isMiddleware&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/posts&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;[handler]&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;isMiddleware&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="request">request</h3>
<p>أرسل طلبًا إلى تطبيقك عبر <code>app.request()</code>. لا حاجة إلى خادم. <code>path</code> يُضبط افتراضيًا على <code>/</code>.</p>
<pre><code class="language-sh">hono request /
hono request /users/123
hono request /api/users -X POST -d <span class="hljs-string">&#x27;{&quot;name&quot;:&quot;Alice&quot;}&#x27;</span>
hono request /todos -X POST -d <span class="hljs-string">&#x27;title=milk&#x27;</span>
hono request /api/protected -H <span class="hljs-string">&#x27;Authorization: Bearer token&#x27;</span>
<span class="hljs-built_in">cat</span> payload.json | hono request /api/users -X POST -d @-
hono request /api/users/123 --trace
hono request / --runtime bun
</code></pre>
<ul>
<li><code>-X, --method &lt;method&gt;</code> - طريقة HTTP (الافتراضي: <code>GET</code>)</li>
<li><code>-d, --data &lt;data&gt;</code> - جسم الطلب (<code>@file</code> يقرأ ملفًا، <code>@-</code> يقرأ من stdin). يتم إرسال كائن أو مصفوفة JSON بصيغة JSON، وأي شيء آخر كنموذج (form)، ما لم <code>-H</code> يعيّن <code>Content-Type</code></li>
<li><code>-H, --header &lt;header&gt;</code> - ترويسة مخصّصة (يمكن استخدامها عدة مرات)</li>
<li><code>--trace</code> - تضمين المسارات المطابقة في المخرجات</li>
<li><code>--runtime &lt;runtime&gt;</code> - شغِّل التطبيق على <code>node</code> (افتراضي)، <code>bun</code>, <code>deno</code>, <code>workerd</code>، أو <code>vite</code></li>
<li><code>--compact</code> - JSON في سطر واحد بدون الترويسات</li>
<li><code>--no-bindings</code> - تخطّي تحميل ارتباطات Cloudflare المحلية</li>
<li><code>-w, --watch</code> - مراقبة التغييرات وإعادة إرسال الطلب</li>
<li><code>-o, --output &lt;file&gt;</code> - كتابة جسم الاستجابة إلى ملف</li>
<li><code>--plain</code> - طباعة الجسم الخام كما في curl (<code>-i</code> يضيف الحالة والترويسات، <code>-I</code> يعرضها فقط)</li>
</ul>
<p>يُضمَّن جسم استجابة JSON ككائن:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;content-type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Hello World&quot;</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>مع <code>--trace</code>، المخرجات تحتوي على <code>matchedRoutes</code>: أي وسيطة وأي معالج تطابق مع الطلب، وأيهما استجاب. تشير نتيجة 404 إلى ضرورة تشغيله.</p>
<p>يمكنك أيضًا تمرير شفرة التطبيق من stdin عبر <code>-</code> كالملف. <code>app</code> معرّف مسبقًا ومُصدَّر لك:</p>
<pre><code class="language-sh"><span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;app.get(&quot;/hello&quot;, (c) =&gt; c.json({ ok: true }))&#x27;</span> | hono request /hello -
</code></pre>
<h4>ارتباطات Cloudflare</h4>
<p>في مشروع يحتوي على إعدادات wrangler، <code>c.env</code> يحمل الارتباطات المحلية الحقيقية (KV و D1 و R2 و vars) تلقائيًا، بينما يعمل التطبيق على Node.js. يعمل هذا في <code>request</code>, <code>batch</code>, <code>snapshot</code>، و <code>ssg</code>. تخطَّه باستخدام <code>--no-bindings</code>. يحتاج <a href="https://developers.cloudflare.com/workers/wrangler/">wrangler</a> المثبّتة في المشروع.</p>
<p><code>--runtime workerd</code> يشغّل التطبيق بالكامل داخل workerd بدلًا من ذلك، مع إعداد wrangler. إنه أثقل، لكنه وقت التشغيل الكامل. نقطة الدخول هي <code>main</code> في إعداد wrangler، لذا لا تمرّر وسيط ملف.</p>
<h4>Vite</h4>
<p><code>--runtime vite</code> يرسل الطلبات عبر خادم تطوير Vite الخاص بالمشروع، لتطبيق يبنيه إضافة (plugin) Vite. يأتي التطبيق من إعداد Vite، لذا لا تمرر وسيطة ملف. وهو الافتراضي في مشروع به <code>cloudflare.config.ts</code> وإعداد Vite، حيث <code>c.env</code> يحتوي على الارتباطات، وفي مشروع Vite بدون <code>src/index.ts</code>. يعمل هذا في <code>request</code>, <code>batch</code>، و <code>snapshot</code>. وسيط ملف، <code>--no-bindings</code>, <code>--trace</code>، أو <code>--watch</code> يشغّل التطبيق على Node.js بدلاً من ذلك.</p>
<h3 id="batch">batch</h3>
<p>شغّل طلبات متعددة من JSONL في استدعاء واحد، بالترتيب، مقابل مثيل تطبيق واحد. تنتقل الحالة في الذاكرة (in-memory) بين الخطوات.</p>
<pre><code class="language-sh">hono batch - &lt;&lt;<span class="hljs-string">&#x27;JSONL&#x27;</span>
{<span class="hljs-string">&quot;path&quot;</span>:<span class="hljs-string">&quot;/users&quot;</span>,<span class="hljs-string">&quot;expect&quot;</span>:{<span class="hljs-string">&quot;status&quot;</span>:200}}
{<span class="hljs-string">&quot;method&quot;</span>:<span class="hljs-string">&quot;POST&quot;</span>,<span class="hljs-string">&quot;path&quot;</span>:<span class="hljs-string">&quot;/users&quot;</span>,<span class="hljs-string">&quot;body&quot;</span>:{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Momo&quot;</span>},<span class="hljs-string">&quot;expect&quot;</span>:{<span class="hljs-string">&quot;status&quot;</span>:201,<span class="hljs-string">&quot;body&quot;</span>:{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Momo&quot;</span>}},<span class="hljs-string">&quot;save&quot;</span>:{<span class="hljs-string">&quot;id&quot;</span>:<span class="hljs-string">&quot;.id&quot;</span>}}
{<span class="hljs-string">&quot;path&quot;</span>:<span class="hljs-string">&quot;/users/{{id}}&quot;</span>,<span class="hljs-string">&quot;expect&quot;</span>:{<span class="hljs-string">&quot;status&quot;</span>:200}}
{<span class="hljs-string">&quot;method&quot;</span>:<span class="hljs-string">&quot;DELETE&quot;</span>,<span class="hljs-string">&quot;path&quot;</span>:<span class="hljs-string">&quot;/users/{{id}}&quot;</span>,<span class="hljs-string">&quot;expect&quot;</span>:{<span class="hljs-string">&quot;status&quot;</span>:204}}
JSONL
</code></pre>
<p>كائن JSON واحد لكل سطر: <code>method</code>, <code>path</code>, <code>body</code>, <code>headers</code>, <code>expect</code>، و <code>save</code>.</p>
<ul>
<li><code>expect</code> يعلن معايير القبول. <code>status</code> يتطابق تمامًا. <code>body</code> هي مطابقة جزئية عميقة (deep partial match): يجب أن تتطابق الحقول المعلنة، ويتم تجاهل الحقول الإضافية في الاستجابة.</li>
<li><code>save</code> يخزّن قيمة من نص الاستجابة (response body) عبر مسار نقطي (dot path)، وتستخدمها الخطوات اللاحقة كـ <code>{{id}}</code>.</li>
<li>سلسلة نصية <code>body</code> يُرسل كنموذج (form)، أو بصيغة JSON عندما يكون كائن JSON أو مصفوفة، ما لم <code>headers</code> يضبط نوع المحتوى. كائن <code>body</code> يُرسَل بصيغة JSON.</li>
<li>تنتقل ملفات تعريف الارتباط (cookies) عبر الخطوات كما في المتصفح. خطوة تسجيل الدخول التي تعيّن ملف تعريف ارتباط تسجّل الدخول في الخطوات التي تليها. <code>cookie</code> الترويسة في خطوة ما تفوز.</li>
<li>خطوة بدون <code>expect</code> ينجح مع أي استجابة 2xx أو 3xx ويفشل مع 4xx أو 5xx. لقبول 4xx عن قصد، أعلن عنها بـ <code>expect.status</code>.</li>
<li>خطوة فاشلة تحمل <code>diff</code>، سطر واحد لكل عدم تطابق.</li>
</ul>
<p>تحتوي المخرجات على القيمة الفعلية <code>status</code> و <code>body</code> لكل خطوة، <code>pass</code> لكل خطوة، و <code>summary</code>. أعد التشغيل حتى <code>failed</code> هو 0.</p>
<ul>
<li><code>-H, --header &lt;header&gt;</code> - ترويسة مشتركة لكل خطوة</li>
<li><code>--compact</code> - طباعة الخطوات الفاشلة والملخّص فقط</li>
<li><code>--runtime &lt;runtime&gt;</code> - <code>node</code> (افتراضي)، <code>workerd</code>، أو <code>vite</code></li>
<li><code>--no-bindings</code> - تخطّي تحميل ارتباطات Cloudflare المحلية</li>
</ul>
<h3 id="snapshot">snapshot</h3>
<p>اطبع السلوك الحالي للتطبيق كأسطر JSONL مجمعة إلى stdout. لا تتم كتابة أي ملف.</p>
<pre><code class="language-sh">hono snapshot
hono snapshot --status-only src/app.ts
</code></pre>
<p>يتم تنفيذ مسارات GET الخالية من المعاملات (paramless)، وتصبح حالتها ونصها الفعليان <code>expect</code>. يتم تنفيذ مسار GET بمعامل أيضًا عندما يعرض التطبيق مسارًا له بالفعل، في رابط أو في حقل JSON باسم المعامل. المسارات الأخرى ذات المعاملات ومسارات غير GET تُطبع بدون <code>expect</code>، لتقوم بملئها. يسجل سطر فحص (probe) واحد الاستجابة لمسار لا يطابق أي مسار.</p>
<p>بخلاف <code>routes</code>، يرسل هذا الأمر طلبات حقيقية، لذا تُنفَّذ الوسيطة (middleware).</p>
<p>التقط قبل إعادة الهيكلة، ثم أعد تشغيل الأسطر بـ <code>hono batch</code> حتى <code>failed</code> هو 0.</p>
<ul>
<li><code>--status-only</code> - التقاط رموز الحالة فقط، وليس الأجسام</li>
<li><code>--runtime &lt;runtime&gt;</code> - <code>node</code> (افتراضي)، <code>workerd</code>، أو <code>vite</code></li>
<li><code>--no-bindings</code> - تخطّي تحميل ارتباطات Cloudflare المحلية</li>
</ul>
<h3 id="diff">diff</h3>
<p>أظهر ما تفعله تغييراتك غير الملتزمة (uncommitted) بالتطبيق. يشغّل التطبيق عند آخر commit وكما هو الآن، ويقارن الإجابات. لا شيء لالتقاطه أولًا.</p>
<pre><code class="language-sh">hono diff
hono diff --base main
</code></pre>
<ul>
<li><code>--base &lt;ref&gt;</code> - الالتزام (commit) للمقارنة معه (الافتراضي: <code>HEAD</code>)</li>
</ul>
<p>مسارات GET التي <code>hono snapshot</code> يُشغَّل وفحص 404 على كلا الجانبين. <code>changed</code> يسرد كل واحد يستجيب بشكل مختلف، مع الاختلافات في الحالة (status) والنص (body). المسارات التي تظهر أو تختفي تكون في <code>added</code> و <code>removed</code>. لا يتم تشغيل مسارات المعاملات (param routes) الأخرى والمسارات غير GET، لذا تحقق منها باستخدام <code>hono batch</code>.</p>
<p>يعمل كل جانب في شجرة عمل (worktree) مؤقتة في git مع بيانات محلية جديدة، لذا فإن البيانات التي كتبتها أثناء الاختبار لا تُحتسب. <code>node_modules</code> مشترك، و <code>.dev.vars</code> يُنسخ. فارغ <code>changed</code> بعد إعادة الهيكلة يعني أن مسارات GET تستجيب كما كانت سابقاً.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;base&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;compared&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;changed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;route&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET /api/posts&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;200 -&gt; 401&quot;</span> <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;added&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;POST /login&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;removed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="benchmark">benchmark</h3>
<p>قم بقياس أداء تطبيق Hono الخاص بك. إنه معيار مصغر (micro benchmark) للتوجيه والمعالجات: <code>app.request()</code> يُستدعى مباشرة، دون مجموعة تقنيات HTTP ودون شبكة. كل تشغيل يحدث في عملية جديدة، لذا تكون النتائج قابلة للمقارنة.</p>
<pre><code class="language-sh">hono benchmark
hono benchmark -P /users
hono benchmark -P /users -X POST -d <span class="hljs-string">&#x27;{&quot;name&quot;:&quot;Alice&quot;}&#x27;</span> -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span>
hono benchmark --hono 4.12.3 --hono 4.13.0
hono benchmark --hono ../hono
</code></pre>
<ul>
<li><code>-P, --path &lt;path&gt;</code> - قياس أداء هذا المسار فقط (يمكن استخدامه عدة مرات)</li>
<li><code>-X</code>, <code>-d</code>, <code>-H</code> - الطريقة والجسم والترويسات لـ <code>-P</code> المسارات</li>
<li><code>--duration &lt;ms&gt;</code> - مدة قياس كل مسار (الافتراضي: <code>500</code>)</li>
<li><code>--warmup &lt;count&gt;</code> - الطلبات قبل القياس (الافتراضي: <code>30</code>)</li>
<li><code>--hono &lt;version-or-path&gt;</code> - قِس أداء (benchmark) التطبيق نفسه مع نسخة Hono أخرى: إصدار npm، أو نسخة محلية (checkout)</li>
</ul>
<p>فرق بضعة بالمئة يعتبر ضجيجًا (noise). للمقارنة، شغّله أكثر من مرة وتحقق من أن الفرق يتكرر.</p>
<h3 id="ssg">ssg</h3>
<p>أنشئ ملفات ثابتة من تطبيق Hono الخاص بك، مثل <a href="https://hono.dev/docs/helpers/ssg">مساعد SSG</a>.</p>
<pre><code class="language-sh">hono ssg
hono ssg -o dist/static src/app.ts
hono ssg --exclude <span class="hljs-string">&#x27;/api/*&#x27;</span>
</code></pre>
<ul>
<li><code>-o, --outdir &lt;dir&gt;</code> - دليل المخرجات (الافتراضي: <code>static</code>)</li>
<li><code>--include &lt;path&gt;</code> / <code>--exclude &lt;path&gt;</code> - تحديد المسارات حسب المسار. <code>*</code> يطابق أي شيء</li>
<li><code>--no-bindings</code> - تخطّي تحميل ارتباطات Cloudflare المحلية</li>
</ul>
<p>الصفحة التي لا تستجيب برمز 200 لا تتم كتابتها، بل تُدرج في <code>skipped</code> مع حالته، لذا تحقق منه بـ <code>hono request &lt;path&gt;</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;output&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;static&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;static/index.html&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;static/about.html&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipped&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/counter&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">500</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="init">init</h3>
<p>أضف تطبيق Hono من <a href="https://hono.dev/docs/guides/create-hono"><code>create-hono</code></a> القالب إلى الدليل الحالي. استخدمه في مشروع موجود بالفعل، حيث <code>npm create hono</code> لا يمكن.</p>
<pre><code class="language-sh">npm install -D @hono/cli
npx hono init --template cloudflare-workers --install
npx hono request /
</code></pre>
<ul>
<li><code>-t, --template &lt;template&gt;</code> - القالب، أحد <code>aws-lambda</code>, <code>bun</code>, <code>cloudflare-workers</code>, <code>deno</code>, <code>fastly</code>, <code>lambda-edge</code>, <code>netlify</code>, <code>nextjs</code>, <code>nodejs</code>, <code>vercel</code>، أو <code>x-basic</code></li>
<li><code>-i, --install</code> - ثبّت التبعيات باستخدام مدير الحزم من ملف القفل (lockfile)، أو من الأمر الذي بدأ <code>hono</code></li>
</ul>
<p>بدون <code>--template</code>، يأتي القالب (template) من الملفات الموجودة في الدليل: <code>wrangler.jsonc</code> أو <code>cloudflare.config.ts</code> يعني <code>cloudflare-workers</code>, <code>deno.json</code> يعني <code>deno</code>, <code>bun.lock</code> يعني <code>bun</code>'، وهكذا دواليك. بدون تلميح، تعرض الطرفية قائمة للاختيار منها. بدون طرفية، يدرج الخطأ القوالب.</p>
<p>لا يتم أبدًا استبدال ملف موجود مسبقًا، بل يُدرج في <code>skipped</code>. <code>package.json</code> يُدمج، وتفوز قيمه الموجودة، باستثناء <code>type</code>، الذي يضبطه القالب إلى <code>module</code>. عند وجود تهيئة wrangler، لا يضيف القالب (template) <code>cloudflare.config.ts</code>، والعكس صحيح. بدون <code>--install</code>، شغّل مدير الحزم لديك بعد ذلك.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;template&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cloudflare-workers&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;detectedFrom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;wrangler.jsonc&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;written&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/index.ts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipped&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;wrangler.jsonc&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,p={book:s,chapter:n,chapterTitle:a,slug:"cli",title:o,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,t as headings,c as html,e as slug,o as title};
