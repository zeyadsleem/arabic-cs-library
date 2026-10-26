const e="kinney",n="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",d="claude-code-session-management",s="إدارة الجلسات",o=[{depth:2,id:"ابدأ-بالاستكشاف",text:"ابدأ بالاستكشاف"},{depth:2,id:"أبق-الجلسات-محدودة",text:"أبقِ الجلسات محدودة"},{depth:2,id:"الأسطح",text:"الأسطح"},{depth:2,id:"تسليم-الجلسة",text:"تسليم الجلسة"}],a=`<p>جلسات <a href="https://code.claude.com/docs/en/overview">Claude Code</a> هي ذاكرة عمل زائد حالة الأدوات. عاملها كمفيدة لكن مؤقتة. فالمعرفة الدائمة بالمشروع تنتمي إلى ملفات مثل <code>CLAUDE.md</code> و<code>.claude/rules/*.md</code> والمهارات والاختبارات والسكربتات.</p>
<h2 id="ابدأ-بالاستكشاف">ابدأ بالاستكشاف</h2>
<p>لمستودع جديد، ابدأ بطلب للقراءة فقط:</p>
<pre><code>Read this repository and summarize the build, test, lint, and release commands.
Do not edit files. Cite the files you used.
</code></pre>
<p>يمنحك ذلك إشارة سريعة إلى ما إذا كان Claude يفهم شكل المشروع. وإذا اختلق أوامر، فأصلح السياق قبل أن تطلب منه تغيير الشيفرة.</p>
<h2 id="أبق-الجلسات-محدودة">أبقِ الجلسات محدودة</h2>
<p>تتراكم الافتراضات في الجلسات الطويلة. وعندما تتغيّر المهمة، ابدأ جلسة جديدة أو اضغطها عن قصد. فالجلسة الجيدة لها هدف واحد ومسار تحقق واحد وفرق نهائي واحد.</p>
<p>استخدم المتابعة عندما تكون داخل الهدف نفسه. وابدأ من جديد عندما تغيّر الأهداف، أو تراجع شيفرة غير ذات صلة، أو تنتقل بين المستودعات.</p>
<h2 id="الأسطح">الأسطح</h2>
<p>Claude Code متاح في أماكن أكثر من الطرفية: تكاملات بيئات التطوير، وسطح المكتب، والويب، وسير عمل التحكم عن بعد، وأسطح الأتمتة. والمبدأ نفسه ينطبق في كل مكان: قد تساعدك الجلسة في العمل، لكن ملفات المستودع يجب أن تبقى مصدر الحقيقة.</p>
<h2 id="تسليم-الجلسة">تسليم الجلسة <span class="content-anchor" id="session-handoff"></span></h2>
<p>عندما تسلّم عملًا بين Claude Code وأداة أخرى، لخّص حالة نظام الملفات لا المحادثة:</p>
<pre><code class="language-bash">git status --short
git diff --<span class="hljs-built_in">stat</span>
git diff
</code></pre>
<p>ينبغي أن تستطيع الأداة التالية المتابعة من الفرع والاختبارات والملفات. وإذا احتاجت إلى نصّ المحادثة لفهم الصحة، فالعمل غير مُحزَّم جيدًا بعد.</p>
`,i={book:e,chapter:n,chapterTitle:t,slug:d,title:s,headings:o,html:a};export{e as book,n as chapter,t as chapterTitle,i as default,o as headings,a as html,d as slug,s as title};
