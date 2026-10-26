const e="kinney",n="ai-development",s="التطوير بأدوات الذكاء الاصطناعي",o="cursor-rules",t="قواعد Cursor",r=[{depth:2,id:"أنواع-القواعد",text:"أنواع القواعد"},{depth:2,id:"أوضاع-التطبيق",text:"أوضاع التطبيق"},{depth:2,id:"قاعدة-صغيرة-مفيدة",text:"قاعدة صغيرة مفيدة"},{depth:2,id:"القواعد-مقابل-المهارات",text:"القواعد مقابل المهارات"},{depth:2,id:"الصيانة",text:"الصيانة"}],l=`<p><a href="https://cursor.com/docs/rules">Cursor Rules</a> تعليمات على مستوى النظام لوكيل Cursor. وهي المكان الصحيح للسلوك الذي ينبغي أن ينطبق قبل وجود طلب محدّد.</p>
<p>أضيف القواعد عندما يكرّر Cursor الخطأ نفسه مرتين. فالمرة الأولى مشكلة طلب. والمرة الثانية مشكلة مستودع.</p>
<h2 id="أنواع-القواعد">أنواع القواعد</h2>
<p>يدعم Cursor أربعة مصادر تعليمات عملية:</p>
<ul>
<li><strong>قواعد المشروع</strong> تسكن في <code>.cursor/rules/*.mdc</code> وتنتمي إلى المستودع.</li>
<li><strong>قواعد المستخدم</strong> تسكن في إعدادات Cursor وتتبع مطوّرًا واحدًا عبر المشاريع.</li>
<li><strong>قواعد الفريق</strong> تُدار مركزيًا للفرق.</li>
<li>ملفات <strong><a href="https://agents.md/">AGENTS.md</a></strong> يمكن أن تقدّم أيضًا تعليمات المستودع.</li>
</ul>
<p>تستخدم قواعد المشروع Markdown مع ترويسة. وامتداد الملف مهم: <code>.mdc</code> هو صيغة قاعدة Cursor. أما ملفات <code>.md</code> العادية في <code>.cursor/rules</code> فلا تُعامل كقواعد مشروع.</p>
<h2 id="أوضاع-التطبيق">أوضاع التطبيق</h2>
<p>يمكن أن تنطبق قاعدة المشروع بطرق مختلفة:</p>
<ul>
<li>تنطبق دائمًا.</li>
<li>تنطبق بذكاء عندما يطابق وصفها المهمة.</li>
<li>تنطبق على أنماط ملفات محددة.</li>
<li>تنطبق فقط عند الإشارة إليها يدويًا.</li>
</ul>
<p>استخدم أضعف وضع يبقى موثوقًا. فالقواعد الدائمة مكلفة وقد تنشئ تعليمات متعارضة عندما تحاول وصف كل مهمة ممكنة.</p>
<h2 id="قاعدة-صغيرة-مفيدة">قاعدة صغيرة مفيدة</h2>
<pre><code class="language-markdown">---
description: Testing expectations for server-side TypeScript changes.
globs:
<span class="hljs-bullet">  -</span> &#x27;src/<span class="hljs-strong">**/<span class="hljs-emphasis">*.ts&#x27;
alwaysApply: false
---

When changing server-side TypeScript, update or add the closest unit test before
implementation. Run the targeted test command and the repository lint command
before reporting completion.
</span></span></code></pre>
<p>هذه محدّدة بما يكفي للعمل بها وصغيرة بما يكفي لتدقيقها.</p>
<h2 id="القواعد-مقابل-المهارات">القواعد مقابل المهارات</h2>
<p>استخدم قاعدة لِقيد. واستخدم مهارة لسير عمل.</p>
<p>على سبيل المثال، «فضّل الأخطاء المُنمَّطة في شيفرة الخادم» قاعدة. أما «شغّل قائمة تحقق الإصدار، وحدّث سجل التغييرات، وابنِ الحزم، وتحقق من الصادرات المولَّدة» فمهارة لأنها تحتاج خطوات ومراجع وأرجح سكربتات.</p>
<p>يستطيع Cursor قراءة المهارات من <code>.cursor/skills</code> و<code>.agents/skills</code> و<code>.claude/skills</code> و<code>.codex/skills</code>، لذا يمكن لمهارة مكتوبة جيدًا أن تخدم أكثر من وكيل.</p>
<h2 id="الصيانة">الصيانة</h2>
<p>أبقِ القواعد تحت نحو بضع مئات من الأسطر وقسّمها حسب الشاغل. واحذف القواعد المهجورة في طلب السحب نفسه الذي يجعلها مهجورة. فالقاعدة البائدة ليست توثيقًا غير ضار؛ إنها تعليمة نشطة.</p>
`,d={book:e,chapter:n,chapterTitle:s,slug:o,title:t,headings:r,html:l};export{e as book,n as chapter,s as chapterTitle,d as default,r as headings,l as html,o as slug,t as title};
