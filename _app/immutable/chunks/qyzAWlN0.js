const o="hono",n="agents",s="الوكلاء",e="index",t="Hono لوكلاء البرمجة",h=[{depth:2,id:"البدء",text:"البدء"},{depth:2,id:"التوثيق-للوكلاء-agents",text:"التوثيق للوكلاء (agents)"},{depth:2,id:"مهارات-hono",text:"مهارات Hono"},{depth:2,id:"hono-cli",text:"Hono CLI"},{depth:2,id:"agentsmd",text:"AGENTS.md"},{depth:2,id:"ما-مدى-جودة-استخدام-الوكلاء-لـ-hono",text:"ما مدى جودة استخدام الوكلاء لـ Hono؟"}],a=`<p>Hono مناسب جدًا للوكلاء البرمجيين (coding agents). الواجهة البرمجية (API) صغيرة ومبنية على معايير الويب، لذا يعرف الوكيل معظمها بالفعل. تسرد هذه الصفحة ما نقدمه لكي يعمل الوكلاء بشكل جيد مع Hono.</p>
<h2 id="البدء">البدء</h2>
<p>أنشئ مشروعًا، ثم شغّل وكيلك فيه.</p>
<pre><code class="language-sh">npm create hono@next my-app
</code></pre>
<p>تأتي القوالب بما يحتاجه الوكيل: ملف <code>AGENTS.md</code> يخبر الوكيل بكيفية فحص التطبيق، و <a href="https://hono.dev/docs/agents/cli">Hono CLI</a> كاعتمادية تطوير. لا شيء آخر لإعداده.</p>
<h2 id="التوثيق-للوكلاء-agents">التوثيق للوكلاء (agents)</h2>
<p>كل صفحة في هذا الموقع متاحة بصيغة Markdown. يمكنك جلبها باستخدام <code>Accept: text/markdown</code> header:</p>
<pre><code class="language-sh">curl -H <span class="hljs-string">&#x27;Accept: text/markdown&#x27;</span> https://hono.dev/docs/api/routing
</code></pre>
<p>للعثور على الصفحة الصحيحة، ابدأ من <a href="https://hono.dev/llms.txt"><code>/llms.txt</code></a>. يسرد كل صفحة مع وصف من سطر واحد. <a href="https://hono.dev/llms-full.txt"><code>/llms-full.txt</code></a> يحتوي على التوثيق بالكامل في ملف واحد، و <a href="https://hono.dev/llms-small.txt"><code>/llms-small.txt</code></a> نسخة أقصر.</p>
<h2 id="مهارات-hono">مهارات Hono</h2>
<p><a href="https://github.com/honojs/skills">مهارات <code>Hono</code></a> هي <a href="https://agentskills.io">مهارات الوكيل</a> لـ <code>Hono</code>. إن <code>hono</code> تمنح المهارة الوكيل مرجعًا سطريًا لواجهة API وطريقة اختبار الطلبات باستخدام Hono CLI. <code>hono-jsx</code> تغطي المهارة واجهة المستخدم بـ <code>hono/jsx</code>.</p>
<p>ثبِّتها باستخدام <a href="https://skills.sh">skills.sh</a> أو <a href="https://cli.github.com">GitHub CLI</a>. كلاهما يضع المهارات حيث يقرؤها وكيلك.</p>
<pre><code class="language-sh"><span class="hljs-comment"># skills.sh</span>
npx skills add honojs/skills

<span class="hljs-comment"># GitHub CLI</span>
gh skill install honojs/skills hono
gh skill install honojs/skills hono-jsx
</code></pre>
<h2 id="hono-cli">Hono CLI</h2>
<p><a href="https://hono.dev/docs/agents/cli">Hono CLI</a> يحمّل تطبيقك مباشرة، لذا يمكن للوكيل (agent) فحصه واختباره دون تشغيل خادم. كل أمر يطبع JSON.</p>
<pre><code class="language-sh">hono routes          <span class="hljs-comment"># all routes, without reading the source</span>
hono request /users  <span class="hljs-comment"># one request, through app.request()</span>
hono batch -         <span class="hljs-comment"># many requests with expectations, until &quot;failed&quot;: 0</span>
hono snapshot        <span class="hljs-comment"># the current behavior, as batch lines</span>
hono diff            <span class="hljs-comment"># what changed vs the last commit</span>
</code></pre>
<p><code>hono --help</code> يبدأ بملاحظة للوكيل (agent)، و <code>hono &lt;command&gt; --help</code> يحتوي على أمثلة. لا حاجة لإعداد آخر.</p>
<h2 id="agentsmd">AGENTS.md</h2>
<p>تتبع الوكلاء (Agents) الطريقة التي يحددها مشروعك لتشغيل الأمور والتحقق منها. سطر واحد في <code>AGENTS.md</code> كافٍ لدفعهم لاستخدام Hono CLI بدلاً من خادم التطوير. يتعلم الوكيل البقية من <code>hono --help</code>. قوالب create-hono تحتوي عليه بالفعل.</p>
<pre><code class="language-md"><span class="hljs-section">## Hono CLI</span>

Run <span class="hljs-code">\`npx hono --help\`</span> first, and use the CLI instead of a dev server.
</code></pre>
<p>أو قل ذلك للوكيل (agent) مباشرة. السطر نفسه يعمل كمطالَبة (prompt).</p>
<h2 id="ما-مدى-جودة-استخدام-الوكلاء-لـ-hono">ما مدى جودة استخدام الوكلاء لـ Hono؟</h2>
<p>نحن نقيسه. راجع <a href="https://agent-dx.hono.dev">Agent DX</a> للنتائج.</p>
`,c={book:o,chapter:n,chapterTitle:s,slug:e,title:t,headings:h,html:a};export{o as book,n as chapter,s as chapterTitle,c as default,h as headings,a as html,e as slug,t as title};
