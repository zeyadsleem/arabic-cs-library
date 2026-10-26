const e="kinney",t="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",s="cursor-bugbot-and-security-review",o="Bugbot والمراجعة الأمنية",i=[{depth:2,id:"bugbot",text:"Bugbot"},{depth:2,id:"المراجعة-الأمنية",text:"المراجعة الأمنية"},{depth:2,id:"الأمان-و-mcp",text:"الأمان و MCP"},{depth:2,id:"انضباط-الدمج",text:"انضباط الدمج"}],r=`<p>يضيف <a href="https://cursor.com/docs/bugbot">Cursor Bugbot</a> و<a href="https://cursor.com/docs/security-agent">وكلاء الأمان في Cursor</a> أسطح مراجعة آلية حول تغييرات الشيفرة. وهي مفيدة لأنها تنظر إلى الفرق بعينين مختلفتين. لكنها ليست بديلًا عن الملكية.</p>
<h2 id="bugbot">Bugbot</h2>
<p>يراجع Bugbot التغييرات ويشير إلى العيوب المحتملة. استخدمه كمراجع ثانٍ لطلبات السحب، خصوصًا عندما يمسّ تغيير حالات حافة أو معالجة أخطاء أو سلوكًا بين الملفات.</p>
<p>المتابعة الجيدة مع Bugbot تطلب دليلًا:</p>
<pre><code>For each Bugbot finding, verify whether the issue is real by reading the changed
code and the closest tests. Fix only confirmed issues. If a finding is invalid,
explain why with file references.
</code></pre>
<p>لا تقبل نتيجة روبوت بشكل أعمى. ولا تتجاهلها بشكل أعمى أيضًا.</p>
<h2 id="المراجعة-الأمنية">المراجعة الأمنية</h2>
<p>يركّز وكلاء الأمان على المخاطر: الأسرار، والتفويض، والحقن، وسطح الاعتماديات، والأوامر الخطيرة، وما شابه. وهم أكثر قيمة عندما يسمّي الطلب نموذج التهديد:</p>
<pre><code>Review this pull request for authorization bypasses and secret exposure.
Ignore style issues. Cite exact files and propose the smallest fix for confirmed
security issues.
</code></pre>
<h2 id="الأمان-و-mcp">الأمان و MCP</h2>
<p>يمكن أن تكشف خوادم MCP أدوات وبيانات قوية. وينبغي أن يعامل وكيل المراجعة تهيئة MCP كجزء من سطح التطبيق، لا كزينة للمحرّر. ابحث عن خوادم غير موثوقة، وصلاحيات واسعة، وتسرّبات متغيّرات البيئة، وأدوات تستطيع الكتابة إلى أنظمة خارجية.</p>
<h2 id="انضباط-الدمج">انضباط الدمج</h2>
<p>مخرَج المراجعة الآلية مُدخَل. ويبقى قرار الدمج لإنسان. وقبل الدمج، تأكد من حلّ الملاحظات، ونجاح الاختبارات، وأن الفرق النهائي مفهوم دون محادثة الروبوت.</p>
`,p={book:e,chapter:t,chapterTitle:n,slug:s,title:o,headings:i,html:r};export{e as book,t as chapter,n as chapterTitle,p as default,i as headings,r as html,s as slug,o as title};
