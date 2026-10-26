const s="kinney",a="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",l="write-the-ci-workflow-from-scratch-solution",p="الحل",t=[{depth:2,id:"ما-يجب-إضافته",text:"ما يجب إضافته"},{depth:3,id:"mainyml-خط-الأنابيب-ثلاثي-المهام",text:"main.yml: خط الأنابيب ثلاثي المهام"},{depth:3,id:"nightlyyml-يعيش-في-الملحق",text:"nightly.yml يعيش في الملحق"},{depth:2,id:"ما-ما-زلت-بحاجة-إلى-تشغيله",text:"ما ما زلت بحاجة إلى تشغيله"},{depth:2,id:"المحلي-مقابل-المستضاف",text:"المحلي مقابل المستضاف"},{depth:2,id:"أنماط-تستحق-الاحتفاظ-بها",text:"أنماط تستحق الاحتفاظ بها"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>هذا مختبر هجين آخر. ملفات سير العمل لا تأتي مع بادئة Shelf، لكن المهام ما زالت تقابل أوامر محلية حقيقية. الأجزاء المستضافة — رفع المخرجات، ومشغّلات cron، والفحوصات المطلوبة — تحتاج إلى مستودع GitHub بعيد مع تفعيل Actions. سأُبقي هذين الحقيقتين منفصلتين كي لا يدّعي الحل أن تحليل YAML محليًا هو الشيء نفسه تشغيل CI حقيقي.</p>
<h2 id="ما-يجب-إضافته">ما يجب إضافته</h2>
<h3 id="mainyml-خط-الأنابيب-ثلاثي-المهام"><code>main.yml</code>: خط الأنابيب ثلاثي المهام</h3>
<p>افتح <code>.github/workflows/main.yml</code>. يعمل سير العمل عند كل <code>push</code> و<code>pull_request</code> ويطلب فقط <code>contents: read</code>. جيد. أبقِه مملًا.</p>
<h4>مهمة <code>static</code></h4>
<pre><code class="language-yaml"><span class="hljs-attr">static:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Static</span> <span class="hljs-string">layer</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Cache</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/cache@v5</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">|
          ~/.npm
          ~/.cache/ms-playwright
</span>        <span class="hljs-attr">key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">runner.os</span> <span class="hljs-string">}}-deps-\${{</span> <span class="hljs-string">hashFiles(&#x27;package-lock.json&#x27;)</span> <span class="hljs-string">}}-playwright-\${{</span> <span class="hljs-string">hashFiles(&#x27;playwright.config.ts&#x27;)</span> <span class="hljs-string">}}</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Lint</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">lint</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Typecheck</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">typecheck</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Dead</span> <span class="hljs-string">code</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">knip</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">gitleaks</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        curl -sSL https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_linux_x64.tar.gz \\
          | tar -xz -C /tmp gitleaks
        sudo install /tmp/gitleaks /usr/local/bin/gitleaks
        gitleaks version
</span>    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Secret</span> <span class="hljs-string">scan</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">gitleaks</span> <span class="hljs-string">dir</span> <span class="hljs-string">.</span> <span class="hljs-string">--redact</span> <span class="hljs-string">--config</span> <span class="hljs-string">.gitleaks.toml</span>
</code></pre>
<p>هذه هي النسخة الأكمل بعد طبقة التحقق الساكن. إن لم تكن قد بنيت <code>knip</code> أو gitleaks بعد، فاحذف هاتين الخطوتين في الجولة الأولى وأعدهما لاحقًا. المقصود ليس تقليد YAML نفسه تقليدًا أعمى. المقصود هو إغلاق البوابة أمام الإخفاقات الرخيصة قبل أن تنفق دقائق المتصفح.</p>
<p>هذه خطوات، لا مهام منفصلة، لأن كلفة التهيئة مشتركة. تقسيم lint وtypecheck وknip وgitleaks إلى أربع مهام يشتري لك مزيدًا من عمليات البدء الباردة، لا مزيدًا من البصيرة.</p>
<h4>مهمة <code>unit</code></h4>
<pre><code class="language-yaml"><span class="hljs-attr">unit:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Unit</span> <span class="hljs-string">tests</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">needs:</span> <span class="hljs-string">static</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Cache</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/cache@v5</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">|
          ~/.npm
          ~/.cache/ms-playwright
</span>        <span class="hljs-attr">key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">runner.os</span> <span class="hljs-string">}}-deps-\${{</span> <span class="hljs-string">hashFiles(&#x27;package-lock.json&#x27;)</span> <span class="hljs-string">}}-playwright-\${{</span> <span class="hljs-string">hashFiles(&#x27;playwright.config.ts&#x27;)</span> <span class="hljs-string">}}</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Vitest</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">test:unit</span>
</code></pre>
<p><code>needs: static</code> هو أول قرار حامل في الملف. إذا كان lint أو typecheck قد فشل بالفعل، فلا سبب لحرق منفّذ آخر لتشغيل اختبارات الوحدة على شيفرة معطوبة.</p>
<h4>مهمة <code>end-to-end</code></h4>
<pre><code class="language-yaml"><span class="hljs-attr">end-to-end:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">End-to-end</span> <span class="hljs-string">tests</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">needs:</span> <span class="hljs-string">static</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Cache</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/cache@v5</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">|
          ~/.npm
          ~/.cache/ms-playwright
</span>        <span class="hljs-attr">key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">runner.os</span> <span class="hljs-string">}}-deps-\${{</span> <span class="hljs-string">hashFiles(&#x27;package-lock.json&#x27;)</span> <span class="hljs-string">}}-playwright-\${{</span> <span class="hljs-string">hashFiles(&#x27;playwright.config.ts&#x27;)</span> <span class="hljs-string">}}</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">browsers</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">playwright</span> <span class="hljs-string">install</span> <span class="hljs-string">--with-deps</span> <span class="hljs-string">chromium</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Create</span> <span class="hljs-string">.env</span> <span class="hljs-string">for</span> <span class="hljs-string">preview</span> <span class="hljs-string">server</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        cat &gt; .env &lt;&lt;&#x27;EOF&#x27;
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
</span>    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Playwright</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">test</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Generate</span> <span class="hljs-string">failure</span> <span class="hljs-string">dossier</span>
      <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">dossier</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">report</span>
      <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v7</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">playwright-report</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">playwright-report/</span>
        <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">failure</span> <span class="hljs-string">dossier</span>
      <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v7</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">failure-dossier</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">playwright-report/dossier.md</span>
        <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
</code></pre>
<p>ثلاثة تفاصيل تهمّ هنا.</p>
<p>أولًا: <code>npm run test</code>، لا <code>npm run test:e2e</code>. سطح أوامر Playwright في بادئة Shelf الحالية هو <code>test</code>، ولا ينبغي للحل أن يخترع سكربتًا ثانيًا لمجرد أن نسخة أقدم من المستودع كانت تفعل ذلك.</p>
<p>ثانيًا: <code>DATABASE_URL=file:./ci.db</code>. لا تحتاج البادئة الحالية إلى <code>tmp/ci.db</code> ولا إلى مجلد <code>tmp/</code> مُنشأ مسبقًا لتشغيل خادم المعاينة. أبقِ بيئة CI صغيرة وحقيقية.</p>
<p>ثالثًا: رفع ملف الحصيلة مشروط ومنفصل. تقرير HTML كبير. وحصيلة markdown صغيرة. ينبغي أن يستطيع الوكيل التقاط الصغيرة أولًا ولا يسحب التقرير الكامل إلا إذا احتاج إلى الآثار.</p>
<p>إن لم تكن قد أكملت مختبر الحصيلة بعد، فاحذف خطوة الحصيلة ورفع مخرجها في الجولة الأولى. مخرج تقرير Playwright يشتري لك معظم قيمة التنقيح على أي حال.</p>
<h3 id="nightlyyml-يعيش-في-الملحق"><code>nightly.yml</code> يعيش في الملحق</h3>
<p>سير العمل الليلي ليس جزءًا من هذا المختبر. إنه يقع في مختبرات الملحق (<a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage">مختبر: إضافة تغطية عبر المتصفحات</a> و<a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-a-nightly-verification-workflow">مختبر: إضافة سير عمل تحقّق ليلي</a>) إلى جانب الأوامر التي يشغّلها فعلًا. العنصر النائب المستقل أسوأ من عدم وجود ملف أصلًا — فهو يستدعي أسماء مهام منقولة تقليدًا وانحرافًا صامتًا في الجدولة. ابنِ <code>nightly.yml</code> عندما تبني الأشياء التي يحرسها.</p>
<h2 id="ما-ما-زلت-بحاجة-إلى-تشغيله">ما ما زلت بحاجة إلى تشغيله</h2>
<p>محليًا، تحقّق من صحة YAML:</p>
<pre><code class="language-bash">python3 -c <span class="hljs-string">&quot;import yaml; yaml.safe_load(open(&#x27;.github/workflows/main.yml&#x27;))&quot;</span>
</code></pre>
<p>ثم شغّل الأوامر التي تقابلها المهام:</p>
<pre><code class="language-bash">npm run lint
npm run typecheck
npm run knip
npm run <span class="hljs-built_in">test</span>:unit
npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>إن كنت قد وصّلت الحصيلة بالفعل، فيمكنك التحقق السريع من الأمر أيضًا:</p>
<pre><code class="language-bash">npm run dossier 2&gt;/dev/null || <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;dossier only becomes interesting after a failure&quot;</span>
</code></pre>
<p>وإن كان gitleaks CLI مثبتًا محليًا:</p>
<pre><code class="language-bash">gitleaks <span class="hljs-built_in">dir</span> . --redact --config .gitleaks.toml
</code></pre>
<h2 id="المحلي-مقابل-المستضاف">المحلي مقابل المستضاف</h2>
<p><strong>محليًا:</strong> يمكنك إثبات أن ملفات سير العمل تُحلَّل وأن كل أمر مسمّى يتصرف كما تتوقع المهام.</p>
<p><strong>مستضافًا:</strong> تشغيلات سير العمل الفعلية، وتنزيل المخرجات، والفحوصات المطلوبة، ومشغّل cron ما زالت تحتاج إلى مستودع GitHub مع تفعيل Actions. لا تدّعِ أن حلقة المخرجات تعمل حتى تنزّل مخرجًا فعلًا من تشغيل حقيقي.</p>
<h2 id="أنماط-تستحق-الاحتفاظ-بها">أنماط تستحق الاحتفاظ بها</h2>
<ul>
<li>بوابة واحدة، ثم توزيع. <code>static</code> يحجب <code>unit</code> و<code>end-to-end</code>، وهذا يوفّر وقت المنفّذ ويحصل على عمليات بناء حمراء أسرع.</li>
<li>استخدم سطح الأوامر الحقيقي للمستودع. إن كانت البادئة تقول <code>npm run test</code>، فسير العمل يقول <code>npm run test</code>.</li>
<li>أبقِ بيئة CI صغيرة وصريحة. أضف فقط المتغيرات التي يقرأها التطبيق اليوم.</li>
<li>ارفع الحصيلة منفصلة عندما تكون لديك. المخرجات الصغيرة تجعل تعافي الوكيل أسرع.</li>
<li>الليلي موجود لإبقاء الفحوصات الواسعة أو البطيئة خارج حلقة طلبات السحب السريعة. ابنِ مهام الليل الحقيقية عندما تضيف مختبرات الملحق الأوامر التي تعتمد عليها.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-write-the-ci-workflow-from-scratch">مختبر: اكتب سير عمل CI من الصفر</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI كحلقة الملاذ الأخير</a></li>
</ul>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
