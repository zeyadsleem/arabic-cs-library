const e="kinney",n="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",o="referencing-files-in-claude-code",d="الإشارة إلى الملفات",s=[{depth:2,id:"استخدم-إشارات-path",text:"استخدم إشارات @path"},{depth:2,id:"الاستيرادات-في-ملفات-الذاكرة",text:"الاستيرادات في ملفات الذاكرة"},{depth:2,id:"الصور-والسياق-غير-البرمجي",text:"الصور والسياق غير البرمجي"},{depth:2,id:"اطلب-الاستشهادات",text:"اطلب الاستشهادات"}],i=`<p>يستطيع <a href="https://code.claude.com/docs/en/overview">Claude Code</a> البحث في المستودع، لكن الإشارات الصريحة إلى الملفات ما زالت مفيدة؛ فهي تخبر Claude أي الملفات تحدّد الصواب، لا مجرد أي الملفات تصادف وجودها قريبًا.</p>
<h2 id="استخدم-إشارات-path">استخدم إشارات @path</h2>
<p>استخدم <code>@</code> للإشارة إلى الملفات والمجلدات:</p>
<pre><code>Read @src/lib/server/invitations.ts and
@src/lib/server/invitations.test.ts. Add the missing expired-token regression
test before editing production code.
</code></pre>
<p>واستخدم المجلدات عندما يهمّ النمط:</p>
<pre><code>Inspect @src/routes/api/ for existing error response conventions.
</code></pre>
<p>لا تُرفق المستودع بأكمله حين يكفي ملفان واختبار واحد لتحديد المهمة.</p>
<h2 id="الاستيرادات-في-ملفات-الذاكرة">الاستيرادات في ملفات الذاكرة</h2>
<p>يستطيع <code>CLAUDE.md</code> استيراد ملفات أخرى بإشارات <code>@path</code>:</p>
<pre><code class="language-markdown">@AGENTS.md
@docs/testing.md
</code></pre>
<p>استخدم الاستيرادات لإبقاء التعليمات المشتركة في مكان واحد. ولا تكرّر الإرشادات الطويلة عبر <code>CLAUDE.md</code> والقواعد والمهارات.</p>
<h2 id="الصور-والسياق-غير-البرمجي">الصور والسياق غير البرمجي</h2>
<p>يستطيع Claude Code العمل بالصور وسياق آخر عندما يدعم سطح الأداة ذلك. استخدم ذلك لعلل واجهة المستخدم والمخططات وأعمال الانحدار البصري، لكن اربط الطلب دائمًا بالملفات والتحقق:</p>
<pre><code>Compare this screenshot to @src/lib/components/checkout-form.svelte.
Fix the spacing regression and run the component test.
</code></pre>
<h2 id="اطلب-الاستشهادات">اطلب الاستشهادات</h2>
<p>في أعمال التحقيق، اشترط إشارات الملفات:</p>
<pre><code>Explain where billing webhooks are handled. Cite the files and functions you
used. Do not edit files.
</code></pre>
<p>وإذا لم تستطع الإجابة الاستشهاد بالملفات المعنية، فالخطوة التالية هي مزيد من السياق لا التنفيذ.</p>
`,c={book:e,chapter:n,chapterTitle:t,slug:o,title:d,headings:s,html:i};export{e as book,n as chapter,t as chapterTitle,c as default,s as headings,i as html,o as slug,d as title};
