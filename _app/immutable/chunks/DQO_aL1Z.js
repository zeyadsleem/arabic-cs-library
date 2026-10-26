const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="editing-settings-through-json",p="تحرير الإعدادات عبر JSON",l=[{depth:2,id:"الوصول-إلى-settingsjson",text:"الوصول إلى settings.json"},{depth:3,id:"صياغة-json-ومخططه",text:"صياغة JSON ومخطّطه"},{depth:2,id:"تهيئة-متقدمة-باستخدام-settingsjson",text:"تهيئة متقدّمة باستخدام settings.json"}],o=`<p>يوفّر محرّر الإعدادات واجهة مرئية مريحة، لكن تحرير ملف <code>settings.json</code> مباشرةً يمنحك تحكّمًا أكثر تقدمًا وهو ضروري لبعض التخصيصات. وملفات <code>settings.json</code> هي ملفات نصية عادية مصاغة بتنسيق JSON (JavaScript Object Notation).</p>
<h2 id="الوصول-إلى-settingsjson">الوصول إلى <code>settings.json</code></h2>
<ul>
<li><strong>محرّر الإعدادات:</strong> في محرّر الإعدادات، انقر أيقونة “Open Settings (JSON)” في الزاوية العلوية اليمنى. وسيفتح ذلك ملف <code>settings.json</code> للنطاق المحدّد حاليًا (User أو Workspace).</li>
<li><strong>لوحة الأوامر:</strong> افتح لوحة الأوامر (<code>Ctrl+Shift+P</code> أو <code>Cmd+Shift+P</code>) ونفّذ “Preferences: Open Settings (JSON)“. يفتح ذلك ملف <code>settings.json</code> الخاص بـ User. ولفتح ملف <code>settings.json</code> الخاص بـ Workspace، نفّذ “Preferences: Open Workspace Settings (JSON)“.</li>
</ul>
<p>وحسب نظامك الأساسي، يقع ملف إعدادات المستخدم هنا:</p>
<ul>
<li><strong>Windows</strong> <code>%APPDATA%\\Code\\User\\settings.json</code></li>
<li><strong>macOS</strong> <code>$HOME/Library/Application\\ Support/Code/User/settings.json</code></li>
<li><strong>Linux</strong> <code>$HOME/.config/Code/User/settings.json</code></li>
</ul>
<h3 id="صياغة-json-ومخططه">صياغة JSON ومخطّطه</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;editor.fontSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">14</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.fontFamily&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Fira Code&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.lineHeight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">22</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;workbench.colorTheme&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dracula&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;files.autoSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;afterDelay&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;files.autoSaveDelay&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1000</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.tabSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.insertSpaces&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.detectIndentation&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;files.exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;**/.git&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/.svn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/.hg&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/CVS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/.DS_Store&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;explorer.confirmDelete&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;terminal.integrated.fontSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;terminal.integrated.fontFamily&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;monospace&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.wordWrap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;on&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;editor.minimap.enabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="تهيئة-متقدمة-باستخدام-settingsjson">تهيئة متقدّمة باستخدام <code>settings.json</code></h2>
<p><strong>التعليقات:</strong> في حين أن JSON نفسه لا يدعم التعليقات، فإن ملف <code>settings.json</code> في Visual Studio Code يسمح بالتعليقات أحادية السطر (<code>//</code>) ومتعددة الأسطر (<code>/* … */</code>) للتوثيق والملاحظات.</p>
<p><strong>إعدادات شرطية:</strong> يمكنك استخدام إعدادات خاصة بلغة معيّنة داخل <code>settings.json</code> لتطبيق تهيئات على لغات محدّدة فقط. مثلًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;[python]&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;editor.tabSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;editor.insertSpaces&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;python.linting.pylintEnabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;[javascript]&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;editor.tabSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;editor.insertSpaces&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يضبط هذا المثال <code>tabSize</code> على 4 ويمكّن <code>pylint</code> لملفات Python، بينما يضبط <code>tabSize</code> على 2 لملفات JavaScript. ويُحاط معرّف اللغة (مثل <code>python</code> و <code>javascript</code>) بقوسين مربّعين <code>[]</code>. وتجد معرّفات اللغات في محدّد Language Mode في الزاوية السفلية اليمنى من Visual Studio Code.</p>
<p><strong>إعدادات المصفوفات والكائنات:</strong> الإعدادات التي تكون مصفوفات أو كائنات يسهل غالبًا ضبطها مباشرةً في <code>settings.json</code>. فمثلًا، إعداد <code>files.exclude</code>، وهو كائن، يُعدّل عادةً في <code>settings.json</code> لإضافة أنماط الملفات التي تريد استثناءها من مستكشف الملفات أو إزالتها.</p>
<p><strong>البرمجة والأتمتة:</strong> يمكن توليد ملفات <code>settings.json</code> أو تعديلها برمجيًا، ما يتيح برمجة تهيئة Visual Studio Code وأتمتتها. ويفيد ذلك في تهيئة بيئات تطوير متّسقة عبر الفرق، أو في ضبط الإعدادات ديناميكيًا بناءً على سكربتات أو متغيّرات بيئة.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,o as html,t as slug,p as title};
