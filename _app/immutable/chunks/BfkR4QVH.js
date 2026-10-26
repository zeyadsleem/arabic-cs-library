const e="kinney",n="ai-development",a="التطوير بأدوات الذكاء الاصطناعي",s="installing-claude-code",t="التثبيت والتهيئة",d=[{depth:2,id:"المثبت-الأصلي",text:"المثبّت الأصلي"},{depth:2,id:"مديرو-الحزم",text:"مديرو الحزم"},{depth:2,id:"windows-و-wsl",text:"Windows و WSL"},{depth:2,id:"تحقق-من-الإعداد",text:"تحقّق من الإعداد"},{depth:2,id:"قنوات-الإصدار",text:"قنوات الإصدار"}],l=`<p><a href="https://code.claude.com/docs/en/overview">Claude Code</a> هي أداة التطوير الوكيلية من <a href="https://www.anthropic.com/">Anthropic</a>. وهي تعمل في الطرفية وبيئات التطوير المتكاملة وأسطح سطح المكتب والويب وسياقات الأتمتة.</p>
<p>مسار التثبيت الأساسي الحالي هو المثبّت الأصلي (native installer). فلا تُعلّم npm كمسار التثبيت الافتراضي للمستخدمين الجدد.</p>
<h2 id="المثبت-الأصلي">المثبّت الأصلي</h2>
<p>على macOS و Linux:</p>
<pre><code class="language-bash">curl -fsSL https://claude.ai/install.sh | bash
</code></pre>
<p>على Windows PowerShell:</p>
<pre><code class="language-powershell"><span class="hljs-built_in">irm</span> https://claude.ai/install.ps1 | <span class="hljs-built_in">iex</span>
</code></pre>
<p>يدعم المثبّت الأصلي التحديثات التلقائية وقنوات الإصدار. وهذا هو السبب الرئيسي لتفضيله على التثبيت عبر مديري الحزم عند معظم المطوّرين.</p>
<h2 id="مديرو-الحزم">مديرو الحزم</h2>
<p><a href="https://brew.sh/">Homebrew</a> و<a href="https://learn.microsoft.com/windows/package-manager/winget/">WinGet</a> بديلان مدعومان:</p>
<pre><code class="language-bash">brew install --cask claude-code
</code></pre>
<pre><code class="language-powershell">winget install Anthropic.ClaudeCode
</code></pre>
<p>والمقايضة هي سلوك التحديث. فتثبيت Homebrew و WinGet لا يستخدم مسار التحديث التلقائي المدمج في Claude Code، لذا يتولّى مدير الحزم مسؤولية التحديثات.</p>
<h2 id="windows-و-wsl">Windows و WSL</h2>
<p>يدعم Claude Code التثبيت الأصلي على Windows. ولا يزال Windows Subsystem for Linux مفيدًا عندما يكون المستودع وسلسلة الأدوات موجّهين إلى Linux. فاختر البيئة التي تناسب المشروع، لا البيئة التي تجعل التثبيت يبدو أقصر.</p>
<h2 id="تحقق-من-الإعداد">تحقّق من الإعداد</h2>
<p>شغّل:</p>
<pre><code class="language-bash">claude --version
claude doctor
</code></pre>
<p>يفحص <code>claude doctor</code> مشكلات البيئة والمصادقة الشائعة. فاستخدمه قبل تشخيص فشل خاص بمستودع بعينه.</p>
<h2 id="قنوات-الإصدار">قنوات الإصدار</h2>
<p>يدعم Claude Code قناتَي stable و latest عبر إعدادات مثل <code>autoUpdatesChannel</code>. ولأغراض التعليم وتهيئة الفريق، فضّل stable إلا إذا كان درس ما يعتمد صراحة على ميزة جديدة من قناة latest.</p>
`,o={book:e,chapter:n,chapterTitle:a,slug:s,title:t,headings:d,html:l};export{e as book,n as chapter,a as chapterTitle,o as default,d as headings,l as html,s as slug,t as title};
