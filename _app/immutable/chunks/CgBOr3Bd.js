const e="kinney",n="ai-development",s="التطوير بأدوات الذكاء الاصطناعي",t="claude-code-sub-agents",o="الوكلاء الفرعيون",p=[{depth:2,id:"الوكلاء-المدمجون",text:"الوكلاء المدمجون"},{depth:2,id:"الوكلاء-المخصصون",text:"الوكلاء المخصّصون"},{depth:2,id:"الوكلاء-الفرعيون-في-الخلفية",text:"الوكلاء الفرعيون في الخلفية"},{depth:2,id:"ذاكرة-الوكيل",text:"ذاكرة الوكيل"}],d=`<p><a href="https://code.claude.com/docs/en/sub-agents">وكلاء Claude Code الفرعيون</a> وكلاء لهم سياقهم وأدواتهم ونموذجهم وصلاحياتهم وذاكرتهم الاختيارية الخاصة. وهم مفيدون عندما يمكن عزل جزء من المهمة عن المحادثة الرئيسية.</p>
<p>أستخدمهم عندما يجعل العزل الخيط الرئيسي أبسط، لا عندما أريد أن تبدو المهمة أكثر تقدّمًا مما هي عليه.</p>
<h2 id="الوكلاء-المدمجون">الوكلاء المدمجون</h2>
<p>يتضمن Claude Code وكلاء مدمجين مثل Explore و Plan و general-purpose. و Explore مفيد للتحقيق للقراءة فقط. و Plan مفيد للتصميم. ويستطيع وكيل general-purpose تولّي عمل أوسع عندما تحتاج مساعدًا له وصول إلى الأدوات.</p>
<p>اختر الوكيل حسب المهمة لا حسب الجِدّة.</p>
<h2 id="الوكلاء-المخصصون">الوكلاء المخصّصون</h2>
<p>يمكن أن يسكن وكلاء المشروع في <code>.claude/agents/</code>:</p>
<pre><code class="language-markdown">---
name: regression-finder
description: Find the closest missing regression test for a described bug.
tools:
<span class="hljs-bullet">  -</span> Read
<span class="hljs-bullet">  -</span> Grep
<span class="hljs-bullet">  -</span> Glob
model: sonnet
<span class="hljs-section">permissionMode: plan
---</span>

Inspect the changed files and closest tests. Return missing coverage with file
references. Do not edit files.
</code></pre>
<p>ويمكن أن تتحكم ترويسة الوكيل أيضًا بالأدوات الممنوعة وخوادم MCP والخطّافات والحد الأقصى للأدوار والمهارات والجهد والسلوك في الخلفية والعزل.</p>
<h2 id="الوكلاء-الفرعيون-في-الخلفية">الوكلاء الفرعيون في الخلفية</h2>
<p>الوكلاء الفرعيون في الخلفية مفيدون للبحث المستقل. ويعرض Claude Code الحالي طلبات صلاحيات الوكلاء الفرعيين في الخلفية في الجلسة الرئيسية، ما يجعل أفعالهم أسهل في التدقيق.</p>
<p>أعطِ وكلاء الخلفية عقد إعادة صارمًا:</p>
<pre><code>Return only confirmed findings, file references, and whether the main task
should stop.
</code></pre>
<h2 id="ذاكرة-الوكيل">ذاكرة الوكيل</h2>
<p>يستطيع الوكلاء الفرعيون الاحتفاظ بذاكرة. استخدم ذلك للسلوك المتخصص المتكرر، لا للحقائق التي ينبغي إيداعها في المستودع. وإذا أثّرت الذاكرة في الصحة مستقبلًا، فانقلها إلى قاعدة أو مهارة أو اختبار أو ملف توثيق.</p>
`,a={book:e,chapter:n,chapterTitle:s,slug:t,title:o,headings:p,html:d};export{e as book,n as chapter,s as chapterTitle,a as default,p as headings,d as html,t as slug,o as title};
