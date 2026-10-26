const e="kinney",n="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",p="claude-code-mcp",c="استخدام خوادم MCP",d=[{depth:2,id:"أضف-الخوادم-وافحصها",text:"أضف الخوادم وافحصها"},{depth:2,id:"فضل-http-للخوادم-البعيدة-الجديدة",text:"فضّل HTTP للخوادم البعيدة الجديدة"},{depth:2,id:"الصلاحيات",text:"الصلاحيات"},{depth:2,id:"مراجعة-الأمان",text:"مراجعة الأمان"}],o=`<p>يتصل <a href="https://code.claude.com/docs/en/mcp">Claude Code</a> بخوادم <a href="https://modelcontextprotocol.io/">MCP</a> للحصول على أدوات وبيانات خارجية. استخدمه عندما يحتاج الوكيل إلى سياق موثوق أو يجب أن يتفاعل مع نظام آخر عبر واجهة منظَّمة.</p>
<h2 id="أضف-الخوادم-وافحصها">أضف الخوادم وافحصها</h2>
<p>استخدم واجهة سطر الأوامر:</p>
<pre><code class="language-bash">claude mcp add
claude mcp list
claude mcp get
claude mcp remove
</code></pre>
<p>وللخوادم المدعومة بـ OAuth، استخدم:</p>
<pre><code class="language-bash">claude mcp login
claude mcp <span class="hljs-built_in">logout</span>
</code></pre>
<p>يمكن أن تسكن الخوادم ذات النطاق المشروع في <code>.mcp.json</code>. استخدم نطاق المشروع عندما يكون الخادم جزءًا من سير عمل المستودع. واستخدم نطاق المستخدم للأدوات الشخصية.</p>
<h2 id="فضل-http-للخوادم-البعيدة-الجديدة">فضّل HTTP للخوادم البعيدة الجديدة</h2>
<p>يدعم Claude Code ناقلات <code>stdio</code> و HTTP و SSE. وللخوادم البعيدة الجديدة، فضّل HTTP حيث أمكن. ويظل SSE مدعومًا للتوافق، لكن التوثيق الحالي يصفه بأنه مهجور.</p>
<h2 id="الصلاحيات">الصلاحيات</h2>
<p>تعمل أدوات MCP عبر نموذج صلاحيات Claude Code. أبقِ أدوات الكتابة خلف قواعد السؤال إلا إذا كانت البيئة معزولة والإجراء منخفض الخطورة.</p>
<p>اطلب استخدام الأدوات المهمة صراحةً:</p>
<pre><code>Use the GitHub MCP server only to read the pull request checks and comments.
Do not post comments or update labels.
</code></pre>
<h2 id="مراجعة-الأمان">مراجعة الأمان</h2>
<p>قبل إضافة خادم، أجب عن:</p>
<ul>
<li>ما الأنظمة الخارجية التي يستطيع الوصول إليها؟</li>
<li>ما بيانات الاعتماد التي يتلقاها؟</li>
<li>هل يستطيع الكتابة إلى أنظمة مشتركة؟</li>
<li>هل يكشف السجلات أو الطلبات أو وسائط الأدوات؟</li>
<li>هل تستطيع تهيئة المشروع إضافة الخادم أو استبداله؟</li>
</ul>
<p>MCP حدّ قدرات. فعامله على هذا الأساس.</p>
`,l={book:e,chapter:n,chapterTitle:t,slug:p,title:c,headings:d,html:o};export{e as book,n as chapter,t as chapterTitle,l as default,d as headings,o as html,p as slug,c as title};
