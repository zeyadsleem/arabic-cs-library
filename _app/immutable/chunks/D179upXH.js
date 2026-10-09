const e="use-the-index-luke",n="sql-explain-plan-sqlbase-getting-an-execution-plan",o="الحصول على خطة تنفيذ",t="index",s="الحصول على خطة تنفيذ",c=[{depth:2,id:"set-planonly-on",text:"SET PLANONLY ON"},{depth:2,id:"session-execution-plan-زر-الشجرة",text:"Session → Execution Plan / زر الشجرة"}],p=`<p>هناك طريقتان للحصول على خطة تنفيذ:</p>
<h2 id="set-planonly-on">SET PLANONLY ON</h2>
<p>يمكنك إدخال جلسة قاعدة البيانات الحالية في نمط «الخطة فقط» بإصدار هذا الأمر:</p>
<pre><code>SET PLANONLY ON
</code></pre>
<p>وكل أمر يُنفَّذ تتابعياً بعد ذلك سيعيد خطته فقط بدلاً من تنفيذه. وهذا هو النهج الأفضل للحصول على خطة تنفيذ لأن الخرج أكثر تفصيلاً.</p>
<p>ويمكنك طبعاً تعطيل نمط «الخطة فقط» مرة أخرى بضبطه على <code>OFF</code>.</p>
<p>وتُخزَّن خطة التنفيذ التي يعرضها نمط «الخطة فقط» في <code>SYSADM.PLAN_TABLE</code> أيضاً. لاحظ أنك تحتاج إلى تعطيل نمط «الخطة فقط» قبل الاستعلام من <code>PLAN_TABLE</code> — وإلا فأنت تخطّط فقط الاستعلام على <code>PLAN_TABLE</code>.</p>
<h2 id="session-execution-plan-زر-الشجرة">Session → Execution Plan / زر الشجرة</h2>
<p>بعد تشغيل استعلام فعلياً يمكنك الحصول على خطة تنفيذه عبر القائمة <code>Session</code> → <code>Execution Plan</code> أو بالضغط على «أيقونة الشجرة» في شريط الأدوات. ويفتح ذلك نافذة جديدة تعرض خطة التنفيذ. لاحظ أن صيغة الخرج مختلفة عن الخرج الذي يوفره نهج «الخطة فقط».</p>
`,d={book:e,chapter:n,chapterTitle:o,slug:t,title:s,headings:c,html:p};export{e as book,n as chapter,o as chapterTitle,d as default,c as headings,p as html,t as slug,s as title};
