const e="kinney",d="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",s="claude-dot-md",a="ملف CLAUDE.md",t=[{depth:2,id:"claudemd",text:"CLAUDE.md"},{depth:2,id:"الاستيراد-و-agentsmd",text:"الاستيراد و AGENTS.md"},{depth:2,id:"clauderules",text:".claude/rules"},{depth:2,id:"المهارات-مقابل-القواعد",text:"المهارات مقابل القواعد"},{depth:2,id:"الذاكرة-التلقائية",text:"الذاكرة التلقائية"}],c=`<p>لدى <a href="https://code.claude.com/docs/en/memory">Claude Code</a> نظاما ذاكرة واسعان: ذاكرة يكتبها الإنسان، وذاكرة تلقائية يكتبها Claude. وكلتاهما سياق لا فرض. وإذا وجب فرض شيء، فشفّره في الاختبارات أو الفحص أو الصلاحيات أو الخطّافات أو التكامل المستمر.</p>
<h2 id="claudemd">CLAUDE.md</h2>
<p><code>CLAUDE.md</code> هو ملف تعليمات المشروع الرئيسي الذي يكتبه الإنسان. ويمكن أن يسكن في جذر المستودع أو تحت <code>.claude/</code>. ويمكن أن تسكن التعليمات على مستوى المستخدم في <code>~/.claude/CLAUDE.md</code>.</p>
<p>استخدم <code>CLAUDE.md</code> للإرشاد الدائم بالمشروع:</p>
<pre><code class="language-markdown"><span class="hljs-section"># Project Instructions</span>

<span class="hljs-bullet">-</span> Use Bun for package management.
<span class="hljs-bullet">-</span> Run <span class="hljs-code">\`bun run lint\`</span> and the closest test before reporting completion.
<span class="hljs-bullet">-</span> Do not edit generated files directly.
</code></pre>
<p>أبقِه قصيرًا. واربط بتوثيق أعمق بدلًا من تحويل الملف إلى دليل.</p>
<p>لا تعتمد على ذاكرة محلية فقط لسياسة مشروع مشتركة. وإذا احتاج الشخص التالي إلى التعليمة، فضعها في ملف مُصدَّر بإصدارات.</p>
<h2 id="الاستيراد-و-agentsmd">الاستيراد و AGENTS.md</h2>
<p>يدعم Claude Code الاستيراد بمراجع <code>@path</code>. واعتبارًا من التوثيق الحالي، لا يقرأ Claude Code ملف <a href="https://agents.md/"><code>AGENTS.md</code></a> مباشرةً. وإذا استخدم مستودع <code>AGENTS.md</code>، فأنشئ <code>CLAUDE.md</code> يستورده:</p>
<pre><code class="language-markdown">@AGENTS.md
</code></pre>
<p>يحافظ ذلك على مصدر تعليمات مشترك واحد دون التظاهر بأن كل وكيل يكتشف الملفات بالطريقة نفسها.</p>
<h2 id="clauderules">.claude/rules</h2>
<p>القواعد في <code>.claude/rules/*.md</code> مفيدة للسياق المُنطَّق. ويمكن أن تتضمن ترويسة مثل <code>paths</code> كي ترتبط القاعدة بالملفات ذات الصلة.</p>
<p>استخدم القواعد للقيود:</p>
<pre><code class="language-markdown">---
paths:
<span class="hljs-section">  - &#x27;src/routes/api/<span class="hljs-strong">**/<span class="hljs-emphasis">*.ts&#x27;
---

API routes must validate input at the boundary and return the shared error
shape.
</span></span></span></code></pre>
<h2 id="المهارات-مقابل-القواعد">المهارات مقابل القواعد</h2>
<p>استخدم المهارات لسير العمل الخاص بمهمة. وإذا كانت التعليمة لها مراحل وسكربتات ومراجع وموجودات، فالأرجح أن موضعها <code>.claude/skills/&lt;name&gt;/SKILL.md</code> لا قاعدة.</p>
<p>القواعد تُشكّل الجلسة. والمهارات تشغّل سير عمل.</p>
<h2 id="الذاكرة-التلقائية">الذاكرة التلقائية</h2>
<p>الذاكرة التلقائية يكتبها Claude وقد تساعد في نقل التفضيلات إلى الأمام، لكن ينبغي ألا تصير المكان الوحيد الذي يسكن فيه سلوك مشروع مهم. وإذا التقطت ذاكرة تلقائية قرارًا حقيقيًا للفريق، فانقل ذلك القرار إلى ملف مُصدَّر بإصدارات.</p>
`,o={book:e,chapter:d,chapterTitle:n,slug:s,title:a,headings:t,html:c};export{e as book,d as chapter,n as chapterTitle,o as default,t as headings,c as html,s as slug,a as title};
