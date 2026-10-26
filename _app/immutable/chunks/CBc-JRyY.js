const s="kinney",n="visual-studio-code",o="Visual Studio Code",t="personalizing-dev-containers",a="تخصيص بيئة حاويتك",l=[{depth:2,id:"استخدام-ملفات-dotfiles-مع-حاويات-التطوير",text:"استخدام ملفات dotfiles مع حاويات التطوير"},{depth:3,id:"تحديد-dotfiles-في-devcontainerjson",text:"تحديد dotfiles في devcontainer.json"},{depth:3,id:"أنشئ-مستودعا-لملفات-dotfiles",text:"أنشئ مستودعًا لملفات dotfiles"},{depth:2,id:"مثال-على-بنية-مستودع-dotfiles-مبسط",text:"مثال على بنية مستودع dotfiles (مبسّط)"},{depth:2,id:"مثال-على-سكربت-installsh",text:"مثال على سكربت install.sh"},{depth:2,id:"فوائد-استخدام-ملفات-dotfiles",text:"فوائد استخدام ملفات dotfiles"},{depth:2,id:"الميزات-قدرات-متقدمة-لحاويات-التطوير",text:"الميزات: قدرات متقدّمة لحاويات التطوير"},{depth:3,id:"عمليات-التثبيت-المباشر-bind-mounts",text:"عمليات التثبيت المباشر (Bind Mounts)"},{depth:3,id:"تحويل-المنافذ",text:"تحويل المنافذ"}],e=`<p>ملفات <code>dotfiles</code> هي ملفات إعدادات (تبدأ غالبًا بنقطة، ومن هنا جاءت التسمية) تتحكّم في سلوك بيئات الأوامر والمحرّرات وأدوات أخرى، وتوجد عادةً في دليلك الرئيسي (مثل <code>.bashrc</code> و<code>.zshrc</code> و<code>.vimrc</code> و<code>.gitconfig</code>).</p>
<p>تتيح لك حاويات التطوير <strong>تثبيت ملفات dotfiles من جهازك المضيف داخل حاويتك</strong> بسهولة، مما يمكّنك من تخصيص بيئة حاويتك بأسماء الأوامر المستعارة (aliases) المألوفة لديك، وإعدادات المحرّر، وإعدادات Git، وغيرها.</p>
<h2 id="استخدام-ملفات-dotfiles-مع-حاويات-التطوير">استخدام ملفات dotfiles مع حاويات التطوير</h2>
<h3 id="تحديد-dotfiles-في-devcontainerjson">تحديد <code>dotfiles</code> في <code>devcontainer.json</code></h3>
<p>أضف خاصية <code>dotfiles</code> إلى إعداد <code>devcontainer.json</code> لديك.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;dotfiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;repository&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://github.com/your-username/dotfiles&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-attr">&quot;targetPath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;~&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-attr">&quot;installCommand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;install.sh&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong><code>repository</code> (مطلوب):</strong> عنوان URL الخاص بمستودع dotfiles لديك (وعادةً على GitHub أو GitLab أو غيرهما). وينبغي أن يكون مستودع Git عامًا أو خاصًا يضمّ ملفات dotfiles الخاصة بك.</li>
<li><strong><code>targetPath</code> (اختياري، الافتراضي: <code>~</code>):</strong> المسار داخل الحاوية الذي ينبغي استنساخ مستودع dotfiles فيه. وقيمته الافتراضية الدليل الرئيسي (<code>~</code>).</li>
<li><strong><code>installCommand</code> (اختياري):</strong> سكربت داخل مستودع dotfiles لديك ينبغي تنفيذه <em>بعد</em> الاستنساخ لتثبيت ملفات dotfiles في الحاوية أو ضبطها. ويُستخدم هذا السكربت غالبًا (مثل <code>install.sh</code> و<code>install.bash</code>) لإنشاء روابط رمزية (symbolic links)، وإعداد تكوينات الأوامر، وغير ذلك.</li>
</ul>
<h3 id="أنشئ-مستودعا-لملفات-dotfiles">أنشئ مستودعًا لملفات dotfiles</h3>
<p>إن لم يكن لديك واحد بالفعل، فأنشئ مستودع Git لتخزين ملفات dotfiles الخاصة بك. ونظّم ملفات dotfiles داخل المستودع حسب حاجتك. وضمّن سكربت <code>install.sh</code> (أو ما يشبهه) إذا احتجت إلى منطق تثبيت مخصّص.</p>
<h2 id="مثال-على-بنية-مستودع-dotfiles-مبسط">مثال على بنية مستودع dotfiles (مبسّط)</h2>
<pre><code>dotfiles-repository/
  ├── .bashrc
  ├── .gitconfig
  ├── .vimrc
  └── install.sh
</code></pre>
<h2 id="مثال-على-سكربت-installsh">مثال على سكربت <code>install.sh</code></h2>
<pre><code class="language-bash"><span class="hljs-meta">#!/bin/bash</span>

<span class="hljs-comment"># Create symlinks for bash configuration</span>
<span class="hljs-built_in">ln</span> -sf <span class="hljs-string">&quot;<span class="hljs-variable">$DOTFILES_REPOSITORY</span>/.bashrc&quot;</span> <span class="hljs-string">&quot;<span class="hljs-variable">$HOME</span>/.bashrc&quot;</span>

<span class="hljs-comment"># Create symlinks for Git configuration</span>
<span class="hljs-built_in">ln</span> -sf <span class="hljs-string">&quot;<span class="hljs-variable">$DOTFILES_REPOSITORY</span>/.gitconfig&quot;</span> <span class="hljs-string">&quot;<span class="hljs-variable">$HOME</span>/.gitconfig&quot;</span>

<span class="hljs-comment"># Create symlinks for Vim configuration</span>
<span class="hljs-built_in">ln</span> -sf <span class="hljs-string">&quot;<span class="hljs-variable">$DOTFILES_REPOSITORY</span>/.vimrc&quot;</span> <span class="hljs-string">&quot;<span class="hljs-variable">$HOME</span>/.vimrc&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Dotfiles installation complete!&quot;</span>
</code></pre>
<h2 id="فوائد-استخدام-ملفات-dotfiles">فوائد استخدام ملفات dotfiles</h2>
<ul>
<li><strong>بيئة حاوية مخصّصة:</strong> اجلب بيئة الأوامر المألوفة لديك وإعدادات المحرّر والأدوات إلى حاويات تطويرك.</li>
<li><strong>الاتساق بين البيئات:</strong> حافظ على تجربة تطوير متّسقة بين الأجهزة المختلفة وحاويات التطوير.</li>
<li><strong>تحكّم في الإصدارات للإعدادات:</strong> تخضع ملفات dotfiles لديك للتحكّم في الإصدارات في مستودعك، مما يسهّل إدارة إعداداتك الشخصية وتحديثها.</li>
<li><strong>قابلية النقل:</strong> انقل بيئة تطويرك المخصّصة بسهولة إلى حاويات تطوير جديدة أو حتى إلى أنظمة أخرى.3</li>
</ul>
<h2 id="الميزات-قدرات-متقدمة-لحاويات-التطوير">الميزات: قدرات متقدّمة لحاويات التطوير</h2>
<p>توفّر حاويات التطوير مجموعة من الميزات المتقدّمة التي تعزّز المرونة والتكامل أكثر.</p>
<h3 id="عمليات-التثبيت-المباشر-bind-mounts">عمليات التثبيت المباشر (Bind Mounts)</h3>
<ul>
<li><strong>المفهوم:</strong> تتيح لك عمليات التثبيت المباشر تثبيت دليل أو ملف من جهازك المضيف داخل الحاوية مباشرة. وهكذا يُثبَّت مجلد مشروعك داخل الحاوية افتراضيًا، مما يتيح تحرير الملفات بسلاسة.</li>
<li><strong>عمليات تثبيت مباشر مخصّصة:</strong> يمكنك تعريف عمليات تثبيت إضافية في <code>devcontainer.json</code> باستخدام خاصية <code>mounts</code> (أو <code>dockerComposeFile</code> عند استخدام Docker Compose، وسنراه لاحقًا).</li>
</ul>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mounts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;source=\${localWorkspaceFolder}/data,target=/container/data,type=bind,consistency=cached&quot;</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong><code>source</code>:</strong> المسار على الجهاز المضيف. و<code>\${localWorkspaceFolder}</code> متغيّر يمثّل مجلد مشروعك.</li>
<li><strong><code>target</code>:</strong> المسار داخل الحاوية الذي ينبغي تثبيت مسار المضيف فيه.</li>
<li><strong><code>type</code>:</strong> يُضبط على <code>bind</code> لعمليات التثبيت المباشر.</li>
<li><strong><code>consistency</code>:</strong> اختياري. و<code>cached</code> يمكن أن يحسّن الأداء.</li>
<li><strong>حالات الاستخدام:</strong></li>
<li><strong>تثبيت أدلة البيانات:</strong> ثبّت أدلة بيانات محلية داخل الحاوية لمعالجة البيانات أو تحليلها.</li>
<li><strong>مشاركة ملفات الإعدادات:</strong> ثبّت ملفات إعدادات من مضيفك داخل الحاوية.</li>
<li><strong>الوصول إلى موارد نظام المضيف (استخدمه بحذر):</strong> ثبّت أدلة المضيف مثل <code>/var/run/docker.sock</code> للسماح للحاويات بالتفاعل مع خفّي Docker على المضيف (متقدّم، فاستخدمه بحذر لأسباب أمنية).</li>
</ul>
<h3 id="تحويل-المنافذ">تحويل المنافذ</h3>
<ul>
<li><strong>تناولناه سابقًا في <code>devcontainer.json</code>:</strong> تتيح لك خاصية <code>forwardPorts</code> تحويل منافذ من الحاوية إلى مضيفك.</li>
<li><strong>تحويل المنافذ الديناميكي:</strong> تكتشف إضافة Dev Containers في Visual Studio Code تلقائيًا المنافذ التي تكشفها التطبيقات العاملة في الحاوية وتعرض عليك تحويلها. وسترى إشعارًا عندما يبدأ تطبيق يعمل داخل الحاوية الاستماع على منفذ ما.</li>
</ul>
`,i={book:s,chapter:n,chapterTitle:o,slug:t,title:a,headings:l,html:e};export{s as book,n as chapter,o as chapterTitle,i as default,l as headings,e as html,t as slug,a as title};
