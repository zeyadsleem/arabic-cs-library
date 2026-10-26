const e="kinney",n="ai-development",s="التطوير بأدوات الذكاء الاصطناعي",c="cursor-skills",o="مهارات Cursor",d=[{depth:2,id:"شكل-الدليل",text:"شكل الدليل"},{depth:2,id:"مهارة-دنيا",text:"مهارة دنيا"},{depth:2,id:"القواعد-مقابل-المهارات",text:"القواعد مقابل المهارات"},{depth:2,id:"نظافة-المهارات",text:"نظافة المهارات"}],t=`<p>تُغلّف <a href="https://cursor.com/docs/skills">مهارات Cursor</a> سلوك الوكيل القابل لإعادة الاستخدام. استخدم مهارة عندما يحتاج سير عمل إلى أكثر من قاعدة قصيرة: خطوات، وأمثلة، وسكربتات، ومراجع، وموجودات.</p>
<h2 id="شكل-الدليل">شكل الدليل</h2>
<p>يمكن لمهارة مشروع أن تسكن تحت <code>.cursor/skills</code>:</p>
<pre><code>.cursor/
  skills/
    release-check/
      SKILL.md
      scripts/
      references/
      assets/
</code></pre>
<p>يفهم Cursor أيضًا المهارات في <code>.agents/skills</code> و<code>.claude/skills</code> و<code>.codex/skills</code>. وهذه التوافقية مهمة عندما يستخدم مستودع أكثر من وكيل.</p>
<h2 id="مهارة-دنيا">مهارة دنيا</h2>
<pre><code class="language-markdown">---
name: release-check
<span class="hljs-section">description: Verify package release readiness before publishing.
---</span>

Read the package manifest, changelog, generated exports, and test commands.
Run the documented verification commands. Stop and report the exact blocker if a
command fails.
</code></pre>
<p>أبقِ نقطة الدخول قصيرة. ضع الأمثلة الطويلة في <code>references/</code>، والأوامر القابلة لإعادة الاستخدام في <code>scripts/</code>، والمدخلات المرئية أو الثنائية في <code>assets/</code>.</p>
<h2 id="القواعد-مقابل-المهارات">القواعد مقابل المهارات</h2>
<p>استخدم القواعد للقيود:</p>
<pre><code>Always add regression tests for bug fixes.
</code></pre>
<p>استخدم المهارات للإجراءات:</p>
<pre><code>Run the release readiness process and produce the shipping checklist.
</code></pre>
<p>إذا كانت التعليمة لها مراحل وملفات لفحصها وإشارة إتمام، فالأرجح أنها مهارة.</p>
<h2 id="نظافة-المهارات">نظافة المهارات</h2>
<p>المهارات سياق قابل للتنفيذ. عاملها كشيفرة مصدر:</p>
<ul>
<li>أبقِها مُصدَّرة بإصدارات.</li>
<li>أبقِها صغيرة بما يكفي للمراجعة.</li>
<li>احذف الأوامر البائدة عندما يتغيّر المستودع.</li>
<li>اجعل أوامر التحقق صريحة.</li>
<li>تجنّب نسخ توثيق المورّد الذي سينحرف.</li>
</ul>
<p>ينبغي أن يستطيع الوكيل تشغيل سير العمل من نظام الملفات، لا من ذاكرة محادثة سابقة.</p>
`,r={book:e,chapter:n,chapterTitle:s,slug:c,title:o,headings:d,html:t};export{e as book,n as chapter,s as chapterTitle,r as default,d as headings,t as html,c as slug,o as title};
