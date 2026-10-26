const t="kinney",e="ai-development",i="التطوير بأدوات الذكاء الاصطناعي",o="integrating-with-github-actions",n="التكامل مع GitHub Actions",c=[{depth:2,id:"إجراءات-github-actions-في-claude-code",text:"إجراءات GitHub Actions في Claude Code"},{depth:2,id:"مراجعة-cursor-والأتمتة",text:"مراجعة Cursor والأتمتة"},{depth:2,id:"حدود-الأمان",text:"حدود الأمان"},{depth:2,id:"معايير-الإكمال",text:"معايير الإكمال"}],d=`<p>يستطيع <a href="https://code.claude.com/docs/en/github-actions">Claude Code GitHub Actions</a> و<a href="https://cursor.com/docs/integrations/github">Cursor</a> إدخال الوكلاء في سير عمل <a href="https://github.com/">GitHub</a>. والنمط الشائع بسيط: يمنح حدث أو تعليق الوكيل مهمة محدودة النطاق، ثم يعود الوكيل بالتقرير عبر طلب سحب أو تعليق.</p>
<h2 id="إجراءات-github-actions-في-claude-code">إجراءات GitHub Actions في Claude Code</h2>
<p>تُبنى إجراءات GitHub Actions في Claude Code على <a href="https://code.claude.com/docs/en/agent-sdk/overview">Claude Agent SDK</a>. ويستخدم سير العمل الحالي <a href="https://github.com/anthropics/claude-code-action"><code>@anthropics/claude-code-action@v1</code></a>، و<code>prompt</code>، و<code>claude_args</code> الاختياري. ولا ينبغي نسخ أنماط <code>mode</code> التجريبية القديمة إلى دروس جديدة.</p>
<p>استخدم <code>/install-github-app</code> للإعداد الموجّه عندما يكون ذلك ممكنًا. وفي الإعداد اليدوي، أبقِ مفتاح Anthropic API في GitHub Secrets وحدّد صلاحيات المستودع بضيق.</p>
<h2 id="مراجعة-cursor-والأتمتة">مراجعة Cursor والأتمتة</h2>
<p>يستطيع Cursor المشاركة في GitHub عبر الوكلاء السحابيين والأتمتات وBugbot ووكلاء الأمان. ويمكن أن تشمل محفّزات GitHub تعليقات القضايا، وتعليقات مراجعة طلبات السحب، والمراجعات المُرسَلة، وتحديثات خيوط المراجعة، واكتمال تشغيل سير العمل.</p>
<p>استخدم هذه التكاملات للأعمال محدودة النطاق:</p>
<pre><code>When CI fails, inspect the failing job. Open a pull request only if the fix is
confined to test configuration. Otherwise, comment with the diagnosis and the
failing command.
</code></pre>
<h2 id="حدود-الأمان">حدود الأمان</h2>
<p>تحتاج سير عمل الوكلاء في GitHub إلى عناية خاصة:</p>
<ul>
<li>لا تعرّض أسرارًا واسعة لسير عمل طلبات السحب القادمة من التفريعات (forks).</li>
<li>أبقِ صلاحيات الكتابة ضيقة.</li>
<li>اشترط مراجعة بشرية لطلبات السحب المُولَّدة.</li>
<li>عامل خوادم MCP والأدوات الخارجية كجزء من قاعدة الحوسبة الموثوقة لسير العمل.</li>
<li>ثبّت إصدارات الإجراءات (actions) وفقًا لسياسة الأمان في المستودع.</li>
</ul>
<h2 id="معايير-الإكمال">معايير الإكمال</h2>
<p>لا يُعدّ طلب السحب المدعوم بالوكيل منتهيًا عندما ينشر الروبوت تعليقًا، بل يكون منتهيًا عندما يُراجَع الفرق، وتُحلّ التعليقات، ويصبح التكامل المستمر أخضر، ويظل الفرع يُدمج بسلاسة مع الفرع الأساسي.</p>
`,a={book:t,chapter:e,chapterTitle:i,slug:o,title:n,headings:c,html:d};export{t as book,e as chapter,i as chapterTitle,a as default,c as headings,d as html,o as slug,n as title};
