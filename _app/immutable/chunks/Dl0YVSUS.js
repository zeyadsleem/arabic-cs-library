const s="kinney",n="visual-studio-code",t="Visual Studio Code",a="exploring-devcontainer-json",o="استكشاف devcontainer.json",e=[{depth:2,id:"context",text:"context"},{depth:2,id:"الإضافات",text:"الإضافات"},{depth:2,id:"الإعدادات",text:"الإعدادات"},{depth:2,id:"تحويل-المنافذ",text:"تحويل المنافذ"},{depth:2,id:"إعدادات-أخرى-متنوعة",text:"إعدادات أخرى متنوّعة"},{depth:2,id:"مثال",text:"مثال"}],p=`<p>خاصية <strong><code>image</code>:</strong> تحدّد هذه الخاصية <strong>صورة Docker</strong> التي تُستخدم أساسًا لحاوية التطوير.</p>
<ul>
<li><strong>مثال:</strong> <code>&quot;image&quot;: &quot;mcr.microsoft.com/devcontainers/javascript-node:18&quot;</code> (يستخدم صورة Node.js 18 جاهزة من سجل Dev Containers الخاص بمايكروسوفت).</li>
<li><strong>الاستخدام:</strong> يمكنك استخدام صور جاهزة من سجلات عامة (مثل Docker Hub و<a href="https://www.google.com/search?q=mcr.microsoft.com&amp;authuser=1">mcr.microsoft.com</a>)، أو صورك المخصّصة الخاصة. والصور الجاهزة مناسبة للبيئات الشائعة، أما الصور المخصّصة فتوفّر تحكّمًا أكبر وإعدادًا مسبقًا أوسع.</li>
<li><strong><code>dockerFile</code>:</strong> بدلًا من <code>image</code>، يمكنك استخدام <code>dockerFile</code> لتحديد مسار <strong>Dockerfile</strong> داخل مشروعك.</li>
<li><strong>مثال:</strong> <code>&quot;dockerFile&quot;: &quot;Dockerfile&quot;</code> (يفترض وجود Dockerfile باسم <code>Dockerfile</code> في مجلد <code>.devcontainer</code> نفسه).</li>
<li><strong>الاستخدام:</strong> استخدم <code>dockerFile</code> عندما تحتاج إلى تخصيص بيئة الحاوية تخصيصًا واسعًا يتجاوز ما توفّره الصور الجاهزة. فملفات Dockerfile تتيح لك تعريف كل جانب من جوانب صورة الحاوية.</li>
</ul>
<h2 id="context"><code>context</code></h2>
<p>عند استخدام <code>dockerFile</code>، تحدّد هذه الخاصية الاختيارية <strong>سياق البناء</strong> (build context) لعملية بناء Docker. وهي افتراضيًا المجلد نفسه الذي يضمّ <code>dockerFile</code>. ويمكنك تغييرها عند الحاجة.</p>
<h2 id="الإضافات">الإضافات</h2>
<p>خاصية <code>extensions</code> هي <strong>مصفوفة من معرّفات إضافات Visual Studio Code</strong> التي ينبغي تثبيتها تلقائيًا <em>داخل</em> حاوية التطوير عند بدء تشغيلها.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;extensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;dbaeumer.vscode-eslint&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;esbenp.prettier-vscode&quot;</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>ويضمن ذلك أن تكون المجموعة نفسها من الإضافات متاحة لكل من يستخدم حاوية التطوير. وتجد معرّفات الإضافات في عنوان URL الخاص بـ Visual Studio Code Marketplace، أو بالنقر بزر الفأرة الأيمن على إضافة في عرض Extensions واختيار “Copy Extension ID”.</p>
<h2 id="الإعدادات">الإعدادات</h2>
<p>خاصية <code>settings</code> هي <strong>كائن JSON</strong> يتيح لك تعريف إعدادات Visual Studio Code التي ستُطبَّق <em>داخل</em> حاوية التطوير.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;terminal.integrated.shell.linux&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/bin/bash&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;editor.formatOnSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="تحويل-المنافذ">تحويل المنافذ</h2>
<p>خاصية <code>forwardPorts</code> هي <strong>مصفوفة منافذ</strong> تريد تحويلها من الحاوية إلى جهازك المضيف.</p>
<p>فمثلًا، <code>&quot;forwardPorts&quot;: [3000, 8080, 5432]</code> (يحوّل المنافذ 3000 و8080 و5432 من الحاوية إلى مضيفك).</p>
<p>وإذا كان تطبيق الويب لديك يعمل على المنفذ 3000 داخل الحاوية، فإن تحويل المنفذ 3000 يتيح لك الوصول إليه عبر <code>http://localhost:3000</code> في متصفح جهازك المضيف.</p>
<h2 id="إعدادات-أخرى-متنوعة">إعدادات أخرى متنوّعة</h2>
<p><strong><code>workspaceFolder</code>:</strong> يحدّد المسار <em>داخل الحاوية</em> الذي سيُثبَّت فيه مجلد مشروعك. وقيمته الافتراضية <code>/workspace</code>. ولا تحتاج عادةً إلى تغييرها.</p>
<p><strong><code>postCreateCommand</code>:</strong> تتيح لك هذه الخاصية تشغيل أوامر الطرفية <strong>مرة واحدة بعد إنشاء الحاوية وتشغيلها للمرة الأولى.</strong></p>
<ul>
<li><strong>مثال:</strong> <code>&quot;postCreateCommand&quot;: &quot;npm install&quot;</code> (يشغّل <code>npm install</code> بعد إنشاء الحاوية لتثبيت اعتمادات المشروع).</li>
<li><strong>الاستخدام:</strong> استخدمه لتثبيت اعتمادات خاصة بالمشروع، أو تهيئة قواعد البيانات، أو تنفيذ مهام إعداد أخرى ينبغي أن تُنفَّذ مرة واحدة فقط.</li>
</ul>
<p><strong><code>postStartCommand</code>:</strong> يشبه <code>postCreateCommand</code>، لكن هذا الأمر يُنفَّذ <strong>في كل مرة تبدأ فيها حاوية التطوير.</strong> فاستخدمه بحذر لأن التنفيذ المتكرّر قد يؤثّر في زمن بدء التشغيل. ويُستخدم غالبًا لتشغيل خدمات خلفية أو برامج خفية (daemons) تحتاجها بيئة التطوير.</p>
<p><strong><code>remoteUser</code>:</strong> يحدّد المستخدم الذي تتّصل به داخل الحاوية. وقيمته الافتراضية هي المستخدم المستخدَم عند بناء الصورة أو المستخدَم في تعليمة <code>USER</code> في Dockerfile. وقد تحتاج إلى تغييره إذا احتجت إلى سياق مستخدم محدّد.</p>
<h2 id="مثال">مثال</h2>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Node.js Development Container&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;image&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;mcr.microsoft.com/devcontainers/javascript-node:18&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;extensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dbaeumer.vscode-eslint&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;esbenp.prettier-vscode&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;ms-vscode.js-debug-nodejs&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;terminal.integrated.shell.linux&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/bin/bash&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;editor.formatOnSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eslint.alwaysShowStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;forwardPorts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3000</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;postCreateCommand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm install&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:o,headings:e,html:p};export{s as book,n as chapter,t as chapterTitle,c as default,e as headings,p as html,a as slug,o as title};
