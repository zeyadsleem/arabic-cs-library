const e="kinney",n="ai-development",s="التطوير بأدوات الذكاء الاصطناعي",t="cursor-subagents",o="وكلاء Cursor الفرعيون",r=[{depth:2,id:"الوكلاء-الفرعيون-المدمجون",text:"الوكلاء الفرعيون المدمجون"},{depth:2,id:"الوكلاء-الفرعيون-المخصصون",text:"الوكلاء الفرعيون المخصّصون"},{depth:2,id:"العمل-الأمامي-والخلفي",text:"العمل الأمامي والخلفي"},{depth:2,id:"متى-لا-تستخدم-وكيلا-فرعيا",text:"متى لا تستخدم وكيلًا فرعيًا"}],d=`<p><a href="https://cursor.com/docs/subagents">الوكلاء الفرعيون في Cursor</a> وكلاء متخصصون لهم سياقهم الخاص. ويستطيعون العمل في المحرّر وواجهة سطر الأوامر ووكلاء السحابة.</p>
<p>القيمة في العزل. يستطيع وكيل فرعي فحص شاغل واحد بعمق دون أن يلوّث سياق الوكيل الرئيسي بكل تفصيل وسيط.</p>
<h2 id="الوكلاء-الفرعيون-المدمجون">الوكلاء الفرعيون المدمجون</h2>
<p>يتضمن Cursor وكلاء فرعيين مدمجين مثل Explore و Bash و Browser. وهم مفيدون للمهام المحدودة:</p>
<ul>
<li>Explore: فحص مستودع أو فضاء تصميم.</li>
<li>Bash: تشغيل تحقيق كثيف الطرفية.</li>
<li>Browser: فحص سلوك الويب أو التطبيق.</li>
</ul>
<p>استخدمهم عندما يطابق شكل المهمة الأداة. لا تجزّأ العمل فقط لكي يبدو الطلب متطورًا.</p>
<h2 id="الوكلاء-الفرعيون-المخصصون">الوكلاء الفرعيون المخصّصون</h2>
<p>يسكن الوكلاء الفرعيون المخصّصون في <code>.cursor/agents/</code>:</p>
<pre><code class="language-markdown">---
name: test-auditor
description: Find missing regression coverage for a described bug.
model: auto
<span class="hljs-section">readonly: true
---</span>

Inspect the changed files and closest tests. Report missing coverage with file
references. Do not edit files.
</code></pre>
<p>يدعم Cursor أيضًا تعريفات وكلاء متوافقة من <code>.claude/agents</code> و<code>.codex/agents</code>، وهو مفيد في المستودعات المختلطة الوكلاء.</p>
<h2 id="العمل-الأمامي-والخلفي">العمل الأمامي والخلفي</h2>
<p>يمنع الوكيل الفرعي الأمامي المهمة الرئيسية حتى يعيد. ويستطيع الوكيل الفرعي في الخلفية المواصلة بينما يتقدّم الوكيل الرئيسي. والعمل في الخلفية مفيد للبحث المستقل، لكنه يحتاج صيغة إعادة حادة:</p>
<pre><code>Return only: findings, file references, and whether the main task should stop.
</code></pre>
<p>دون عقد إعادة، كثيرًا ما ينشئ العمل المتوازٍ سياقًا أكثر مما ينشئ قيمة.</p>
<h2 id="متى-لا-تستخدم-وكيلا-فرعيا">متى لا تستخدم وكيلًا فرعيًا</h2>
<p>لا تستخدم الوكلاء الفرعيين للتعديلات الصغيرة أو إصلاحات الملف الواحد أو المهام التي يحتاج فيها مطوّر واحد إلى إبقاء النموذج الذهني كله أمامه. فالوكلاء الفرعيون وسيلة لتخفيف ضغط السياق، لا وسيلة للتهرب من التفكير.</p>
`,i={book:e,chapter:n,chapterTitle:s,slug:t,title:o,headings:r,html:d};export{e as book,n as chapter,s as chapterTitle,i as default,r as headings,d as html,t as slug,o as title};
