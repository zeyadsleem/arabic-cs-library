const e="kinney",n="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",s="claude-code-and-bash-scripts",a="Claude Code وسكربتات Bash",o=[{depth:2,id:"فضل-سكربتات-المستودع",text:"فضّل سكربتات المستودع"},{depth:2,id:"اجعل-الأوامر-محدودة",text:"اجعل الأوامر محدودة"},{depth:2,id:"حول-عمل-الصدفة-المتكرر-إلى-سكربتات",text:"حوّل عمل الصدفة المتكرر إلى سكربتات"}],d=`<p>في أول مرة يشغّل فيها الوكيل أمر صدفة خاطئًا بثقة، تتعلم لماذا يحتاج مخرَج الطرفية إلى أن يكون دليلًا لا انطباعًا.</p>
<p>يستطيع <a href="https://code.claude.com/docs/en/overview">Claude Code</a> تشغيل أوامر الصدفة، ويستطيع المستخدمون تشغيل أوامر bash داخل الجلسة. واعتبارًا من <a href="https://code.claude.com/docs/en/changelog">Claude Code 2.1.186</a>، فإن الأوامر المُدخَلة بـ <code>!</code> تُطلق استجابة من Claude افتراضيًا إلا إذا ضُبط <a href="https://code.claude.com/docs/en/settings"><code>respondToBashCommands</code></a> على <code>false</code>.</p>
<p>وهذا يجعل مخرَج الطرفية جزءًا من المحادثة. فتعامل معه كدليل.</p>
<h2 id="فضل-سكربتات-المستودع">فضّل سكربتات المستودع</h2>
<p>اطلب من Claude تشغيل السكربتات الموثّقة بدلًا من سلاسل أوامر مرتجلة:</p>
<pre><code>Run the targeted test command from package.json. If it fails, report the command
and failure before editing files.
</code></pre>
<p>السكربتات الجيدة قابلة للتكرار. أما خطوط أنابيب الصدفة الطويلة ذات الاستخدام الواحد فمراجعتها أصعب، والخطأ فيها أسهل.</p>
<h2 id="اجعل-الأوامر-محدودة">اجعل الأوامر محدودة</h2>
<p>تجنّب الأوامر التي قد تتوقف بلا نهاية، أو تكتب إلى الإنتاج، أو تغيّر حالة واسعة. وللتحقيق، فضّل:</p>
<pre><code class="language-bash">rg <span class="hljs-string">&quot;expired token&quot;</span> src tests
git status --short
bun <span class="hljs-built_in">test</span> src/lib/server/invitations.test.ts
</code></pre>
<p>وللعمليات الخطيرة، اشترط شرحًا صريحًا قبل التنفيذ:</p>
<pre><code>Before running any command that deletes files, changes branches, or writes to an
external service, explain the command and wait for approval.
</code></pre>
<h2 id="حول-عمل-الصدفة-المتكرر-إلى-سكربتات">حوّل عمل الصدفة المتكرر إلى سكربتات</h2>
<p>إذا صار تسلسل أوامر جزءًا من سير العمل، فأودعه سكربتًا باسم واضح. عندئذٍ تستطيع القواعد والمهارات والخطّافات والبشر أن تنادي الشيء نفسه.</p>
<p>الوكلاء بارعون في الاستدلال على مخرَج الأوامر. ومع ذلك يجب أن تبقى أنظمة البناء مملوكة للمستودع.</p>
`,c={book:e,chapter:n,chapterTitle:t,slug:s,title:a,headings:o,html:d};export{e as book,n as chapter,t as chapterTitle,c as default,o as headings,d as html,s as slug,a as title};
