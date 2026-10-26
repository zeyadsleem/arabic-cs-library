const e="kinney",t="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",s="git-worktrees",a="أشجار عمل Git",i=[{depth:2,id:"لماذا-تساعد-أشجار-العمل",text:"لماذا تساعد أشجار العمل"},{depth:2,id:"الأوامر-الأساسية",text:"الأوامر الأساسية"},{depth:2,id:"انضباط-المراجعة",text:"انضباط المراجعة"}],p=`<p>تتيح <a href="https://git-scm.com/docs/git-worktree">أشجار عمل Git</a> لمستودع واحد أن يملك عدة أدلة عمل مُستخرَجة عند فروع مختلفة. وهي مفيدة مع الوكلاء لأن الوكلاء يُنتجون تغييرات في الملفات، وتغييرات الملفات تحتاج إلى عزل.</p>
<h2 id="لماذا-تساعد-أشجار-العمل">لماذا تساعد أشجار العمل</h2>
<p>استخدم أشجار العمل عندما:</p>
<ul>
<li>تريد تشغيل تجربتين لوكيلين بالتوازي.</li>
<li>يجب ألّا يلمس وكيل سحابي أو وكيل سطر أوامر شجرة عملك الرئيسية.</li>
<li>تحتاج فرعًا نظيفًا للمراجعة بينما يستمر العمل المحلي في مكان آخر.</li>
<li>تريد مقارنة مسارَي تنفيذ دون استخدام stash.</li>
</ul>
<h2 id="الأوامر-الأساسية">الأوامر الأساسية</h2>
<pre><code class="language-bash">git worktree add ../project-feature feature/agent-experiment
git worktree list
git worktree remove ../project-feature
</code></pre>
<p>شغّل الوكيل من داخل شجرة العمل:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> ../project-feature
claude
</code></pre>
<p>أو:</p>
<pre><code class="language-bash">agent
</code></pre>
<h2 id="انضباط-المراجعة">انضباط المراجعة</h2>
<p>تعزل شجرة العمل الملفات. لكنها لا تُثبت الصحّة. قبل دمج العمل القادم من أي فرع أنشأه وكيل:</p>
<pre><code class="language-bash">git status --short
git diff
bun run lint
bun run <span class="hljs-built_in">test</span>:unit
</code></pre>
<p>استخدم أشجار العمل لجعل العمل المتوازي قابلًا للمراجعة، لا لتجنّب المراجعة.</p>
`,r={book:e,chapter:t,chapterTitle:n,slug:s,title:a,headings:i,html:p};export{e as book,t as chapter,n as chapterTitle,r as default,i as headings,p as html,s as slug,a as title};
