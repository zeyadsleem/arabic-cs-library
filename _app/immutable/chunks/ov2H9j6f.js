const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",l="add-a-nightly-verification-workflow-solution",t="الحل",p=[{depth:2,id:"ما-الذي-تضيفه",text:"ما الذي تضيفه"},{depth:3,id:"githubworkflowsnightlyyml",text:".github/workflows/nightly.yml"},{depth:3,id:"المهمة-1-عنصر-نائب-لتحديث-har",text:"المهمة 1: عنصر نائب لتحديث HAR"},{depth:3,id:"المهمة-2-تدقيق-الاعتماد",text:"المهمة 2: تدقيق الاعتماد"},{depth:3,id:"المهمة-3-دخان-عبر-المتصفحات",text:"المهمة 3: دخان عبر المتصفحات"},{depth:3,id:"كيف-ترتبط-المهام-بالأوامر-المحلية",text:"كيف ترتبط المهام بالأوامر المحلية"},{depth:2,id:"ما-يبقى-عليك-تشغيله",text:"ما يبقى عليك تشغيله"},{depth:2,id:"محلي-مقابل-مستضاف",text:"محلي مقابل مستضاف"},{depth:2,id:"أنماط-تأخذها-معك",text:"أنماط تأخذها معك"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>سير العمل الليلي هو حيث تعيش الفحوص البطيئة. وكل ما في هذا الملف استُبعد عمدًا من حلقة طلبات السحب لأنه أبطأ أو أوسع أو أكثر عرضة للانحراف من أن يعمل عند كل دفعة. وهذا لا يجعله اختياريًا. إنه يعني فقط أنه ينتمي إلى إيقاع مختلف.</p>
<h2 id="ما-الذي-تضيفه">ما الذي تضيفه</h2>
<h3 id="githubworkflowsnightlyyml"><code>.github/workflows/nightly.yml</code></h3>
<p>امشِ فيه من الأعلى.</p>
<p><strong>المُشغِّلات:</strong></p>
<pre><code class="language-yaml"><span class="hljs-attr">on:</span>
  <span class="hljs-attr">schedule:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">cron:</span> <span class="hljs-string">&#x27;17 4 * * *&#x27;</span>
  <span class="hljs-attr">workflow_dispatch:</span>
</code></pre>
<p>مُشغِّلان. <code>schedule</code> يشغّل سير العمل كل يوم عند 04:17 بالتوقيت العالمي. و<code>workflow_dispatch</code> يتيح لك تشغيله يدويًا من تبويب Actions، وهي الطريقة العاقلة لاختبار سير العمل دون انتظار الغد.</p>
<p>والرقم <code>17</code> ليس سحريًا. إنه فقط ليس <code>0</code>. فـGitHub Actions يزدحم عند رأس الساعة لأن الجميع ينسخ <code>0 4 * * *</code> من تدوينة ثم يتساءل لماذا يجلس سير عمله في طابور. فحرّك التشغيل بضع دقائق بعيدًا عن الساعة تتحسّن الحياة.</p>
<p><strong>الأذونات:</strong></p>
<pre><code class="language-yaml"><span class="hljs-attr">permissions:</span>
  <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>
</code></pre>
<p>أقلّ صلاحية. فسير العمل الليلي يقرأ المستودع ويشغّل الفحوص. وهو لا يحتاج صلاحية كتابة إلى أن تضيف عمدًا شيئًا مثل فاتح مشكلات أو خطوة طلب سحب آلية.</p>
<h3 id="المهمة-1-عنصر-نائب-لتحديث-har">المهمة 1: عنصر نائب لتحديث HAR</h3>
<pre><code class="language-yaml"><span class="hljs-attr">har-refresh:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Refresh</span> <span class="hljs-string">HAR</span> <span class="hljs-string">fixtures</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Placeholder</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        echo &quot;Placeholder: re-record the HAR fixtures the network-isolation lab will add (e.g. tests/fixtures/*.har) against the real Open Library API&quot;
        echo &quot;  and open a pull request with the diff so a human can review upstream drift.&quot;
</span></code></pre>
<p>هذا عنصر نائب صادق. وهو لا يتظاهر بتحديث ملفات HAR. بل يخبرك، في واجهة GitHub، بما يجب أن تفعله النسخة الحقيقية حين يوصّلها أحد. وذلك أفضل من إخفاء النية في TODO بصيغة ماركداون لا يراه أحد.</p>
<p>والأتمتة الحقيقية ستعيد تسجيل ملفات HAR، وتُظهر فرقها، وتفتح طلب سحب قابلًا للمراجعة. و«قابلًا للمراجعة» مهمّ. فقبول انحراف واجهة API في المنبع بهدوء طريقة جيدة لإيداع غرابة لا تفهمها.</p>
<h3 id="المهمة-2-تدقيق-الاعتماد">المهمة 2: تدقيق الاعتماد</h3>
<pre><code class="language-yaml"><span class="hljs-attr">dependency-audit:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Dependency</span> <span class="hljs-string">audit</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">npm</span> <span class="hljs-string">audit</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">audit</span> <span class="hljs-string">--audit-level=high</span> <span class="hljs-string">||</span> <span class="hljs-literal">true</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Placeholder</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        echo &quot;Placeholder: open an issue or create tracked work for new high-severity findings.&quot;
</span></code></pre>
<p><code>npm audit --audit-level=high</code> هو الفحص الحقيقي. وأما <code>|| true</code> فموجودة لأن هذه النسخة من سير العمل تُظهر النتائج، ولا توجّهها بعد إلى عمل متعقَّب. فمهمة تدقيق ليلية حمراء لا يفرزها أحد هي فنّ أدائي. وأما عنصر نائب أخضر يقول «وصّل المتابعة لاحقًا» فهو صادق على الأقل.</p>
<p>وحين تضيف فاتح مشكلات أو أي تسليم حقيقي آخر، فأزل <code>|| true</code> واجعل سير العمل يفعل الشيء الأعلى صوتًا.</p>
<h3 id="المهمة-3-دخان-عبر-المتصفحات">المهمة 3: دخان عبر المتصفحات</h3>
<pre><code class="language-yaml"><span class="hljs-attr">cross-browser-smoke:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Cross-browser</span> <span class="hljs-string">smoke</span>
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
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">browsers</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">playwright</span> <span class="hljs-string">install</span> <span class="hljs-string">--with-deps</span> <span class="hljs-string">firefox</span> <span class="hljs-string">webkit</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Create</span> <span class="hljs-string">.env</span> <span class="hljs-string">for</span> <span class="hljs-string">preview</span> <span class="hljs-string">server</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        cat &gt; .env &lt;&lt;&#x27;EOF&#x27;
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
</span>    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">cross-browser</span> <span class="hljs-string">smoke</span> <span class="hljs-string">tests</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">test:cross-browser</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">report</span>
      <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v7</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">cross-browser-smoke-report</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">playwright-report/</span>
        <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
</code></pre>
<p>هذه أكمل مهمة في سير العمل لأن المختبر السابق لهذا واحد كان قد جعلك تبني الأمر الأساسي.</p>
<p>والتخزين المؤقت يغطّي حزم npm ومتصفّحات Playwright معًا. وخطوة تثبيت المتصفّحات صريحة لأن Playwright لا يتضمّن افتراضيًا إلا Chromium. وتمهيد <code>.env</code> صغير عن قصد: <code>DATABASE_URL=file:./ci.db</code> إضافةً إلى عنوان Open Library الأساسي الذي يتوقّعه التطبيق أصلًا. وأبقِ هذا التمهيد مركّزًا على ما تحتاجه حلقة الدخان العامة فعلًا — وقاوم الرغبة في تحميل أسرار مصادقة أو قواعد بيانات إضافية أو أصول لا يستخدمها البادئ الحالي.</p>
<p>ومرة أخرى، اسم الأثر يهمّ. فحين يفشل تشغيل ليلي، تريد أن تقوم أسماء المهام والآثار بعملية الفرز لك قبل أن تنقر أي شيء.</p>
<h3 id="كيف-ترتبط-المهام-بالأوامر-المحلية">كيف ترتبط المهام بالأوامر المحلية</h3>
<p>يجب أن تقابل كل مهمة ليلية أمرًا محليًا حقيقيًا:</p>
<table>
<thead>
<tr>
<th>المهمة الليلية</th>
<th>الأمر المحلي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>har-refresh</code></td>
<td>عنصر نائب فقط في الوقت الحالي</td>
</tr>
<tr>
<td><code>dependency-audit</code></td>
<td><code>npm audit --audit-level=high</code></td>
</tr>
<tr>
<td><code>cross-browser-smoke</code></td>
<td><code>npm run test:cross-browser</code></td>
</tr>
</tbody>
</table>
<p>وهذا التطابق هو قاعدة التصميم. فإن كان فشل ليلي لا يمكن إعادة إنتاجه محليًا بالأمر نفسه الذي تستخدمه المهمة، فسير العمل يخفي منطقًا أكثر من اللازم.</p>
<h2 id="ما-يبقى-عليك-تشغيله">ما يبقى عليك تشغيله</h2>
<p>تحقّق من أن YAML يُحلَّل:</p>
<pre><code class="language-bash">yq <span class="hljs-built_in">eval</span> <span class="hljs-string">&#x27;.jobs | keys&#x27;</span> .github/workflows/nightly.yml
</code></pre>
<p>شغّل المكافئات المحلية للمهام الحقيقية:</p>
<pre><code class="language-bash">npm audit --audit-level=high
npm run <span class="hljs-built_in">test</span>:cross-browser
</code></pre>
<p>ثم افترض فشلًا واحدًا عمدًا. اكسر تحقّق دخان موسومًا، أو وجّه العنصر النائب لـHAR إلى اسم ملف بلا معنى حين تستبدل العنصر النائب بشيفرة حقيقية. ويجب أن يمنحك سير العمل اسم مهمة حمراء واضحًا وخطوة تالية ملموسة، لا شعورًا غامضًا بأن شيئًا في مكان ما غير سعيد.</p>
<h2 id="محلي-مقابل-مستضاف">محلي مقابل مستضاف</h2>
<p><strong>محليًا:</strong> تستطيع التحقّق من YAML ومن كل أمر حقيقي الآن.</p>
<p><strong>مستضافًا:</strong> لا يوجد مُشغِّل cron الفعلي، ولا الاحتفاظ بالآثار، ولا واجهة Actions، إلا حين يكون سير العمل على الفرع الافتراضي لمستودع GitHub مع تمكين Actions. استخدم <code>workflow_dispatch</code> أولًا. أما انتظار الجدولة فهو لمن عنده وقت فراغ كثير.</p>
<h2 id="أنماط-تأخذها-معك">أنماط تأخذها معك</h2>
<ul>
<li>الجدولة خارج رأس الساعة تتجنّب ازدحام Actions. اختر دقيقة ليست <code>0</code>.</li>
<li>المهام النائبة أفضل من نية غير مرئية. فإن لم تكن الأتمتة مبنية بعد، فقل ذلك في سير العمل نفسه.</li>
<li>كل مهمة ليلية تُقابل أمرًا مسمّى واحدًا. فلا يجب أن يكون الليلي كيسًا من تفاصيل الشِل التي لا يستطيع مطوّر إعادة إنتاجها.</li>
<li>الآثار تحتاج مدة احتفاظ محدودة. وسبعة أيام قيمة افتراضية جيدة لأدلة العمل الليلي.</li>
<li>الفشل الليلي يحتاج مسار تسليم. فتشغيل cron أحمر لا يقرأه أحد ليس تغطية. إنه زينة.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-a-nightly-verification-workflow">مختبر: إضافة سير عمل تحقّق ليلي</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">حلقات التحقّق الليلية</a></li>
</ul>
`,r={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,r as default,p as headings,e as html,l as slug,t as title};
