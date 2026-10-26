const e="kinney",t="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",i="test-driven-development-with-claude",s="التطوير الموجَّه بالاختبارات",o=[{depth:2,id:"طلب-جيد-للتطوير-الموجه-بالاختبارات",text:"طلب جيد للتطوير الموجَّه بالاختبارات"},{depth:2,id:"راقب-الاختبار-الأول",text:"راقب الاختبار الأول"},{depth:2,id:"أبق-إعادة-الهيكلة-منفصلة",text:"أبقِ إعادة الهيكلة منفصلة"}],a=`<p>يكون <a href="https://code.claude.com/docs/en/overview">Claude Code</a> في أقوى حالاته عندما يكون تعريف الإنجاز قابلًا للتنفيذ. ويمنح التطوير الموجَّه بالاختبارات الوكيل حلقة محكمة: أعِد إنتاج العلّة، واجعل الاختبار ينجح، ثم أعد الهيكلة فقط عند الحاجة.</p>
<h2 id="طلب-جيد-للتطوير-الموجه-بالاختبارات">طلب جيد للتطوير الموجَّه بالاختبارات</h2>
<pre><code>Bug:
Expired invite tokens are accepted.

Task:
Write the failing regression test first in the closest test file. Then implement
the smallest production change that makes it pass.

Verification:
Run bun test:unit -- src/lib/server/invitations.test.ts and bun run lint.

Stop:
If either command fails for an unrelated reason, stop and report the failure
instead of editing unrelated files.
</code></pre>
<p>يمنح هذا الطلب Claude سلوكًا لإعادة إنتاجه، وحدًّا للنطاق، وخط نهاية.</p>
<h2 id="راقب-الاختبار-الأول">راقب الاختبار الأول</h2>
<p>لا تدع الوكيل يكتب اختبارًا ينجح بالفعل. اطلب منه الإبلاغ عن التحقّق الفاشل قبل التنفيذ:</p>
<pre><code>After writing the regression test, run it and show the failing assertion before
changing production code.
</code></pre>
<p>تلك الجملة الواحدة تمنع كثيرًا من التغطية الزائفة.</p>
<h2 id="أبق-إعادة-الهيكلة-منفصلة">أبقِ إعادة الهيكلة منفصلة</h2>
<p>بعد نجاح الاختبار، اسأل هل إعادة الهيكلة ضرورية. كثير من الإصلاحات أفضل أن تبقى صغيرة. وإذا كان التنفيذ واضحًا والاختبارات تنجح، فتوقّف.</p>
<p>وعندما تكون إعادة الهيكلة مبرَّرة، شغّل أمر التحقق نفسه بعدها. فالاختبار الأخضر قبل إعادة الهيكلة لا يثبت أن إعادة الهيكلة آمنة.</p>
`,d={book:e,chapter:t,chapterTitle:n,slug:i,title:s,headings:o,html:a};export{e as book,t as chapter,n as chapterTitle,d as default,o as headings,a as html,i as slug,s as title};
