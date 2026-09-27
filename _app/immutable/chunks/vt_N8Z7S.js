const s="ahastack",a="ai-agents",e="حزمة AHA للوكلاء الذكيين",t="index",n="حزمة AHA للوكلاء الذكيين",p=[{depth:2,id:"ثبتها",text:"ثبّتها"},{depth:2,id:"أو-أضفها-إلى-agentsmd",text:"أو أضِفها إلى AGENTS.md"},{depth:2,id:"لماذا-مهارة-بدل-ملف-agentsmd-أطول",text:"لماذا مهارة بدل ملف AGENTS.md أطول"},{depth:2,id:"وكلاء-يتصفحون-الموقع",text:"وكلاء يتصفّحون الموقع"},{depth:2,id:"إبقاؤها-محدثة",text:"إبقاؤها محدَّثة"}],l=`<p>تُكتب معظم الشيفرة اليوم وفي حلقة العمل وكيل ذكي (agent). الوكلاء يعرفون React جيّدًا جدًا. ويعرفون htmx أقلّ، و htmx 4 أقلّ من ذلك، ويميلون بدافع من العادة إلى واجهة برمجية بصيغة JSON وإلى استدعاء <code>fetch()</code>.</p>
<p>لذلك دوّنت قواعد هذه الحزمة (stack) بصيغة يستطيع الوكلاء قراءتها. إنها مهارة (skill): ملف Markdown يضمّ النموذج الذهني، وتفاصيل Astro، وسمات htmx 4 وكيف تختلف عن htmx 2، والفصل بين htmx و Alpine، والأنماط المأخوذة من <a href="https://demo.ahastack.dev">العروض التوضيحية</a>.</p>
<p>يمكنك قراءته هنا: <a href="https://ahastack.dev/skill.md">https://ahastack.dev/skill.md</a></p>
<h2 id="ثبتها">ثبّتها</h2>
<p><a href="#install-it">القسم بعنوان «ثبّتها»</a></p>
<p>إذا كنت تستخدم Skills CLI (وهو يعمل مع Cursor و Claude Code و Codex وغيرها):</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh">npx skills add flaviocopes/ahastack.dev@aha-stack
</code></pre>
<p>أو انسخ الملف يدويًا إلى مجلد المهارات لدى وكيلك:</p>
<p>نافذة الطرفية</p>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> -p .cursor/skills/aha-stack
curl -o .cursor/skills/aha-stack/SKILL.md https://ahastack.dev/skill.md
</code></pre>
<p>بالنسبة إلى Claude Code استخدم <code>.claude/skills/aha-stack/SKILL.md</code>. وبالنسبة إلى Codex استخدم <code>.agents/skills/aha-stack/SKILL.md</code>.</p>
<p>بعد تثبيتها، يحمّلها الوكيل عندما تذكر htmx أو Alpine أو حزمة AHA.</p>
<h2 id="أو-أضفها-إلى-agentsmd">أو أضِفها إلى AGENTS.md</h2>
<p><a href="#or-add-it-to-agentsmd">القسم بعنوان «أو أضِفها إلى AGENTS.md»</a></p>
<p>إن كنت تفضّل ألّا تثبّت شيئًا، فانسخ ما يلي إلى <code>AGENTS.md</code> الخاص بمشروعك (أو <code>CLAUDE.md</code>). وهذه هي النسخة المختصرة.</p>
<pre><code class="language-markdown"><span class="hljs-section">## Stack</span>

This is an AHA stack app: Astro (output: &#x27;server&#x27;) + htmx 4 + Alpine.js 3.
Full rules: https://ahastack.dev/skill.md

<span class="hljs-bullet">-</span> The server owns the state. Endpoints return HTML fragments, never JSON.
<span class="hljs-bullet">-</span> Fragments are <span class="hljs-code">\`.astro\`</span> files under <span class="hljs-code">\`src/pages/api/\`</span> with <span class="hljs-code">\`export const partial = true\`</span>.
<span class="hljs-bullet">-</span> htmx for anything that talks to the server. Alpine for UI-only state (open, editing, hover).
<span class="hljs-bullet">-</span> One <span class="hljs-code">\`.astro\`</span> component renders a piece of UI both on page load and inside an htmx response.
<span class="hljs-bullet">-</span> htmx 4: attributes do not inherit (use <span class="hljs-code">\`:inherited\`</span>), 4xx/5xx responses are swapped,
  oob-only responses skip the main swap, events are <span class="hljs-code">\`htmx:after:request\`</span> style.
<span class="hljs-bullet">-</span> Alpine directives need an <span class="hljs-code">\`x-data\`</span> ancestor. Never keep app data in <span class="hljs-code">\`x-data\`</span>.
<span class="hljs-bullet">-</span> Read-modify-write goes in one SQL statement (<span class="hljs-code">\`UPDATE ... RETURNING\`</span>).
<span class="hljs-bullet">-</span> Astro 7 collapses newlines between text and inline tags. Keep such paragraphs on one line.
</code></pre>
<p>يحتوي <a href="https://github.com/flaviocopes/ahastack.dev/tree/main/demo">مشروع العرض التوضيحي</a> على ملف <code>AGENTS.md</code> يمكنك الاطلاع عليه كنموذج.</p>
<h2 id="لماذا-مهارة-بدل-ملف-agentsmd-أطول">لماذا مهارة بدل ملف AGENTS.md أطول</h2>
<p><a href="#why-a-skill-and-not-a-longer-agentsmd">القسم بعنوان «لماذا مهارة بدل ملف AGENTS.md أطول»</a></p>
<p>يُحمَّل <code>AGENTS.md</code> في كل دورة. أما المهارة فلا تُحمَّل إلا حين تكون ذات صلة. والمهارة نحو 250 سطرًا. وهذا كثيرٌ لتحمّله معك وأنت تُصلح خطأً في CSS.</p>
<p>المقتطف أعلاه هو الجزء الذي يستحق التحميل في كل مرة. أما المهارة فهي الجزء الذي يستحق التحميل حين يكون الوكيل على وشك كتابة نقطة نهاية (endpoint) بـ htmx.</p>
<h2 id="وكلاء-يتصفحون-الموقع">وكلاء يتصفّحون الموقع</h2>
<p><a href="#agents-that-browse-the-site">القسم بعنوان «وكلاء يتصفّحون الموقع»</a></p>
<p>هناك أيضًا ملف <a href="https://ahastack.dev/llms.txt">llms.txt</a> في جذر الموقع. وهو خريطة للموقع موجّهة إلى الوكلاء: المهارة أولًا، ثم صفحات التوثيق والعروض التوضيحية مع سطر واحد عن كلٍّ منها. والوكيل الذي يصل إلى ahastack.dev ويعرف هذا العرف يجد المهارة من تلقاء نفسه.</p>
<h2 id="إبقاؤها-محدثة">إبقاؤها محدَّثة</h2>
<p><a href="#keeping-it-current">القسم بعنوان «إبقاؤها محدَّثة»</a></p>
<p>تعيش المهارة في <a href="https://github.com/flaviocopes/ahastack.dev/blob/main/skills/aha-stack/SKILL.md">مستودع الموقع</a>. وحين يغيّر htmx أو Astro شيئًا مهمًا، تتغيّر المهارة معهما. وإن ثبّتّها عبر Skills CLI، فإن <code>npx skills update</code> يجلب النسخة الجديدة.</p>
`,d={book:s,chapter:a,chapterTitle:e,slug:t,title:n,headings:p,html:l};export{s as book,a as chapter,e as chapterTitle,d as default,p as headings,l as html,t as slug,n as title};
