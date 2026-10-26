const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",l="performance-budgets-as-a-feedback-loop",t="ميزانيات الأداء كحلقة تغذية راجعة",p=[{depth:2,id:"لماذا-تحتاج-الأداءات-حلقتها-الخاصة",text:"لماذا تحتاج الأداءات حلقتها الخاصة"},{depth:2,id:"نموذج-الميزانيتين",text:"نموذج الميزانيتين"},{depth:2,id:"ميزانيات-وقت-البناء-التقط-زيادة-الوزن-مبكرا",text:"ميزانيات وقت البناء: التقط زيادة الوزن مبكرًا"},{depth:3,id:"كيف-يبدو-buildstatsjson-فعليا",text:"كيف يبدو build/stats.json فعليًا"},{depth:3,id:"سكربت-الفحص",text:"سكربت الفحص"},{depth:2,id:"ميزانيات-وقت-التشغيل-التقط-البطء-حيث-يشعر-به-المستخدم",text:"ميزانيات وقت التشغيل: التقط البطء حيث يشعر به المستخدم"},{depth:2,id:"لماذا-لا-ألجأ-افتراضيا-إلى-lighthouse-هنا",text:"لماذا لا ألجأ افتراضيًا إلى Lighthouse هنا"},{depth:2,id:"كيف-تضبط-الأرقام-دون-أن-تجعلها-زائفة",text:"كيف تضبط الأرقام دون أن تجعلها زائفة"},{depth:2,id:"ما-ينبغي-أن-يفعله-الوكيل-عندما-تخترق-الميزانية",text:"ما ينبغي أن يفعله الوكيل عندما تُخترق الميزانية"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"كيف-تعرف-أن-الميزانية-حقيقية",text:"كيف تعرف أن الميزانية حقيقية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>ثمة صنف من الأخطاء يبرع الوكلاء في إدخاله بشكل غريب: الميزة تعمل، والاختبارات تنجح، ولقطة الشاشة تطابق، والصفحة صارت الآن أبطأ بشكل ملحوظ.</p>
<p>لا أحد يكتب ذلك الخطأ عن قصد. ومع ذلك يُشحن طوال الوقت.</p>
<p>إذن هذا الدرس عن إضافة حلقة أخرى: ميزانية أداء رخيصة ومملّة وقابلة للفرض. ليست بطولية. وليست من نوع «لنبنِ برنامج رصد كاملًا قبل الغداء». مجرد بوابة كافية لأن لا يستطيع وكيل أن يضاعف وزن مسارك بهدوء أو يحوّل تفاعلًا سريعًا إلى تفاعل لزج.</p>
<blockquote>
<p><strong>المتطلّبات المسبقة</strong></p>
<p>يفترض هذا الدرس أنك ربطت الانحدار البصري بالفعل. فروق لقطات الشاشة تخبرك <em>بما تغيّر بصريًا</em>. أما ميزانيات الأداء فتخبرك ما إن كان التغيير نفسه قد جعل التطبيق أثقل أو أبطأ.</p>
</blockquote>
<h2 id="لماذا-تحتاج-الأداءات-حلقتها-الخاصة">لماذا تحتاج الأداءات حلقتها الخاصة</h2>
<p>معظم الحلقات التي بنيناها حتى الآن تجيب عن أسئلة الصحة.</p>
<ul>
<li>هل تتصرّف الواجهة كما ينبغي؟</li>
<li>هل ما تزال تبدو صحيحة؟</li>
<li>هل تتبع الشيفرة القواعد؟</li>
<li>هل رصد مراجع ثانٍ شيئًا غريبًا؟</li>
</ul>
<p>الأداء مختلف لأن نمط الفشل عادةً ليس ثنائيًا. الصفحة ما تزال تُرسَم. والنموذج ما يزال يُرسَل. الخطأ هو أنها صارت تستغرق 900 مللي ثانية أطول، أو أن حزمة المسار نمت بمقدار 140 كيلوبايت، أو أن حالة التحميل تبقى على الشاشة مدة كافية لتشعر باللزوجة.</p>
<p>هذا النوع من الانحدار يتسرّب من كل حلقة أخرى ما لم تقرّر مسبقًا أن أرقامًا معيّنة غير مسموح لها بالانحراف بهدوء.</p>
<p>وذلك هو الميزانية: حدّ له عواقب.</p>
<h2 id="نموذج-الميزانيتين">نموذج الميزانيتين</h2>
<p>لا أريد برنامج أداء عملاقًا في ورشة من يوم واحد. أريد رقمين يستطيع الوكيل فرضهما فعلًا.</p>
<p>النموذج:</p>
<ul>
<li><strong>ميزانية وقت البناء</strong>: كم كبرت حزمة العميل المشحونة؟</li>
<li><strong>ميزانية وقت التشغيل</strong>: كم استغرق مسار حرج واحد أو تفاعل واحد في بيئة قابلة لإعادة الإنتاج؟</li>
</ul>
<p>هذا يكفي لالتقاط معظم الانحدارات العرضية.</p>
<p>بنهاية المختبر المرافق، سيكون لدى Shelf ملف <code>tests/performance.spec.ts</code> للجانب التشغيلي، وعائلة سكربتات <code>npm run performance:*</code> للجانب البنائي، مع <code>npm run performance:build</code> كنقطة الدخول الضيّقة «اجمع الأرقام فقط». وبيت القصيد أن تعيش الميزانية خلف أوامر مسمّاة يستطيع الوكيل تشغيلها، لا خلف مقال مدوّنة عن ثقافة الأداء.</p>
<h2 id="ميزانيات-وقت-البناء-التقط-زيادة-الوزن-مبكرا">ميزانيات وقت البناء: التقط زيادة الوزن مبكرًا</h2>
<p>في المختبر ستضيف <code>npm run build:stats</code> إلى Shelf، وهي تقلب متغيّر بيئة <code>BUNDLE_STATS=1</code> وتخبر تهيئة Vite بأن تمرّر <a href="https://github.com/btd/rollup-plugin-visualizer"><code>rollup-plugin-visualizer</code></a> إلى الناتج—فتنتج خريطة شجرية <code>build/stats.html</code> للبشر وملف بيانات خام <code>build/stats.json</code> للأتمتة. ويمكنك اتّباع الشكل نفسه مع أي مُجمِّع؛ فالمقصود ليس الإضافة.</p>
<p>التوصيل داخل <code>vite.config.ts</code> صغير. تستورد <code>visualizer</code> من <code>rollup-plugin-visualizer</code>، وتضمّن نسختين شرطيًا في قائمة إضافات Vite (واحدة HTML وواحدة JSON)، وتقيّد الكتلة كلها براية <code>BUNDLE_STATS</code> كي يبقى <code>npm run build</code> العادي سريعًا وصامتًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts (trimmed)</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;
<span class="hljs-keyword">import</span> { sveltekit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@sveltejs/kit/vite&#x27;</span>;
<span class="hljs-keyword">import</span> { visualizer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;rollup-plugin-visualizer&#x27;</span>;
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;

<span class="hljs-keyword">const</span> shouldEmitBundleStats = process.<span class="hljs-property">env</span>.<span class="hljs-property">BUNDLE_STATS</span> === <span class="hljs-string">&#x27;1&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">sveltekit</span>(),
    ...(shouldEmitBundleStats
      ? [
          <span class="hljs-title function_">visualizer</span>({
            <span class="hljs-attr">filename</span>: path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;build/stats.html&#x27;</span>),
            <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;treemap&#x27;</span>,
            <span class="hljs-attr">gzipSize</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">brotliSize</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">emitFile</span>: <span class="hljs-literal">false</span>,
          }),
          <span class="hljs-title function_">visualizer</span>({
            <span class="hljs-attr">filename</span>: path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;build/stats.json&#x27;</span>),
            <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;raw-data&#x27;</span>,
            <span class="hljs-attr">gzipSize</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">brotliSize</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">emitFile</span>: <span class="hljs-literal">false</span>,
          }),
        ]
      : []),
  ],
});
</code></pre>
<p>ملاحظتان عن تلك الكتلة:</p>
<ul>
<li><strong><code>template: 'treemap'</code></strong> ينتج الخريطة الشجرية HTML التي يستطيع إنسان التمرير فيها. و**<code>template: 'raw-data'</code>** ينتج JSON الذي سيحلّله سكربت الفحص. تريد الاثنين معًا — البشر يستخدمون أحدهما، والحلقة تستخدم الآخر.</li>
<li><strong><code>emitFile: false</code></strong> يكتب التقرير إلى القرص عبر <code>filename</code> بدلًا من دفعه عبر رسم ناتج Rollup. وهذا يُبقي ملفات التقرير خارج الحزمة المنشورة.</li>
</ul>
<p>بعد المختبر المرافق، سيحمل <code>vite.config.ts</code> في Shelf هذا النمط بالضبط. والمقصود أن البناء الناجح ينتج أرقامًا مقروءة آليًا يمكنك مقارنتها بحدّ في التحكم بالمصادرات.</p>
<p>ما أريده من حلقة الجانب البنائي:</p>
<ul>
<li>الحجم الكلي لحزمة العميل</li>
<li>أكبر حزمة مسار أو نقطة دخول</li>
<li>ملف ناتج مستقر يستطيع الوكيل تحليله</li>
</ul>
<p>إن قفزت تلك الأرقام، تصبح الحلقة حمراء قبل أن تسنح للانحدار فرصة أن يصير «حسنًا، ما يزال يعمل تقنيًا».</p>
<h3 id="كيف-يبدو-buildstatsjson-فعليا">كيف يبدو <code>build/stats.json</code> فعليًا</h3>
<p>قبل أن تستطيع تحليله، عليك أن تعرف ما يحويه. فـ<code>rollup-plugin-visualizer</code> مع <code>template: 'raw-data'</code> يُخرج ملفًا يشبه هذا تقريبًا (مقتطع للقراءة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tree&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;root&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;children&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-comment">/* the whole module tree */</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;nodeMetas&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;abc-1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/src/routes/(app)/shelf/+page.svelte&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;moduleParts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;_app/immutable/nodes/4.CdrmuZQ8.js&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc-1-part&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;nodeParts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;abc-1-part&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;renderedLength&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1820</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;gzipLength&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">640</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;brotliLength&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">560</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>مفتاحان يحملان الإشارة التي نريدها:</p>
<ul>
<li><strong><code>nodeMetas</code></strong> — مدخل واحد لكل ملف مصدري في الرسم. ولكل meta خريطة <code>moduleParts</code> مفاتيحها ملفات الحزمة <em>الناتجة</em> (مثل <code>_app/immutable/chunks/BiOosUrW.js</code>) وقيمها معرّفات uid داخل <code>nodeParts</code>.</li>
<li><strong><code>nodeParts</code></strong> — معلومات الحجم لكل قطعة شيفرة مُخرَجة: <code>renderedLength</code> (بايتات خام)، و<code>gzipLength</code>، و<code>brotliLength</code>.</li>
</ul>
<p>وجمع بايتات gzip لكل <code>nodePart</code> ينتمي إلى ملف ناتج معيّن يعطيك الحجم المضغوط لذلك الملف. وجمع ذلك عبر كل ملف تحت <code>_app/immutable/</code> (بادئة حزم العميل في SvelteKit) يعطيك الحجم الكلي لحزمة العميل بعد gzip. وأكبر تلك المجاميع هو حزمة المسار في أسوأ حالة.</p>
<h3 id="سكربت-الفحص">سكربت الفحص</h3>
<p>حين تعرف الشكل، يصبح الفحص قصيرًا. إنه يقرأ الملفين، ويمشي <code>nodeMetas</code> → <code>moduleParts</code> → <code>nodeParts</code>، ويجمّع حسب ملف الحزمة، ويصفّي إلى حزم العميل، ويقارن الإجماليات بالحدود المخزّنة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// scripts/check-performance-budgets.mjs</span>
<span class="hljs-keyword">import</span> { readFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs/promises&#x27;</span>;
<span class="hljs-keyword">import</span> { resolve } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">STATS_PATH</span> = <span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;build/stats.json&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">BUDGETS_PATH</span> = <span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;performance-budgets.json&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLIENT_BUNDLE_PREFIX</span> = <span class="hljs-string">&#x27;_app/immutable&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">formatKilobytes</span> = (<span class="hljs-params">bytes</span>) =&gt; (bytes / <span class="hljs-number">1024</span>).<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">1</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">computeClientBundleSizes</span> = (<span class="hljs-params">stats</span>) =&gt; {
  <span class="hljs-keyword">const</span> parts = stats.<span class="hljs-property">nodeParts</span> ?? {};
  <span class="hljs-keyword">const</span> metas = stats.<span class="hljs-property">nodeMetas</span> ?? {};
  <span class="hljs-keyword">const</span> bundleGzipByFile = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> meta <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(metas)) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [bundleFile, uid] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(meta.<span class="hljs-property">moduleParts</span> ?? {})) {
      <span class="hljs-keyword">const</span> part = parts[uid];
      <span class="hljs-keyword">if</span> (!part) <span class="hljs-keyword">continue</span>;
      bundleGzipByFile.<span class="hljs-title function_">set</span>(
        bundleFile,
        (bundleGzipByFile.<span class="hljs-title function_">get</span>(bundleFile) ?? <span class="hljs-number">0</span>) + (part.<span class="hljs-property">gzipLength</span> ?? <span class="hljs-number">0</span>),
      );
    }
  }

  <span class="hljs-keyword">const</span> clientEntries = [...bundleGzipByFile.<span class="hljs-title function_">entries</span>()].<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">[file]</span>) =&gt;</span>
    file.<span class="hljs-title function_">startsWith</span>(<span class="hljs-variable constant_">CLIENT_BUNDLE_PREFIX</span>),
  );
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">totalClientGzipBytes</span>: clientEntries.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, [, bytes]</span>) =&gt;</span> sum + bytes, <span class="hljs-number">0</span>),
    <span class="hljs-attr">largestClientChunkBytes</span>: clientEntries.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">max, [, bytes]</span>) =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(max, bytes), <span class="hljs-number">0</span>),
  };
};

<span class="hljs-keyword">const</span> [statsRaw, budgetsRaw] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
  <span class="hljs-title function_">readFile</span>(<span class="hljs-variable constant_">STATS_PATH</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>),
  <span class="hljs-title function_">readFile</span>(<span class="hljs-variable constant_">BUDGETS_PATH</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>),
]);
<span class="hljs-keyword">const</span> stats = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(statsRaw);
<span class="hljs-keyword">const</span> budgets = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(budgetsRaw);

<span class="hljs-keyword">const</span> { totalClientGzipBytes, largestClientChunkBytes } = <span class="hljs-title function_">computeClientBundleSizes</span>(stats);
<span class="hljs-keyword">const</span> totalKilobytes = totalClientGzipBytes / <span class="hljs-number">1024</span>;
<span class="hljs-keyword">const</span> largestKilobytes = largestClientChunkBytes / <span class="hljs-number">1024</span>;

<span class="hljs-keyword">const</span> failures = [];
<span class="hljs-keyword">if</span> (totalKilobytes &gt; budgets.<span class="hljs-property">build</span>.<span class="hljs-property">maxTotalGzipKilobytes</span>) {
  failures.<span class="hljs-title function_">push</span>(
    <span class="hljs-string">\`Total client bundle <span class="hljs-subst">\${formatKilobytes(totalClientGzipBytes)}</span> kB exceeds budget of <span class="hljs-subst">\${budgets.build.maxTotalGzipKilobytes}</span> kB\`</span>,
  );
}
<span class="hljs-keyword">if</span> (largestKilobytes &gt; budgets.<span class="hljs-property">build</span>.<span class="hljs-property">maxLargestChunkGzipKilobytes</span>) {
  failures.<span class="hljs-title function_">push</span>(
    <span class="hljs-string">\`Largest client chunk <span class="hljs-subst">\${formatKilobytes(largestClientChunkBytes)}</span> kB exceeds budget of <span class="hljs-subst">\${budgets.build.maxLargestChunkGzipKilobytes}</span> kB\`</span>,
  );
}

<span class="hljs-keyword">if</span> (failures.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Performance budget check FAILED:&#x27;</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> failure <span class="hljs-keyword">of</span> failures) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;  - &#x27;</span> + failure);
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">1</span>);
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
  <span class="hljs-string">\`Performance budget check OK: total <span class="hljs-subst">\${formatKilobytes(totalClientGzipBytes)}</span> kB / <span class="hljs-subst">\${budgets.build.maxTotalGzipKilobytes}</span> kB, \`</span> +
    <span class="hljs-string">\`largest chunk <span class="hljs-subst">\${formatKilobytes(largestClientChunkBytes)}</span> kB / <span class="hljs-subst">\${budgets.build.maxLargestChunkGzipKilobytes}</span> kB\`</span>,
);
</code></pre>
<p>و<code>performance-budgets.json</code> هو ملف الحدود المخزّنة بجانب السكربت. ابدأ بأرقام أعلى قليلًا من خط الأساس المقيس حاليًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;maxTotalGzipKilobytes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">110</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;maxLargestChunkGzipKilobytes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">55</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;shelfRouteDomContentLoadedMilliseconds&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">800</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>المختبر يشحن هذا</strong></p>
<p>حين تُكمل المختبر المرافق، سيكون <code>scripts/check-performance-budgets.mjs</code> في Shelf نسخة أطول قليلًا من هذا المخطط، تضيف <code>try/catch</code> حول تحليل JSON وتُعرّض <code>clientEntries</code> لقواعد مستقبلية. والمسير متطابق. اقرأ المخطط أعلاه لتفهم <em>كيف</em> يعمل التجميع، ثم قارنه بتنفيذ مختبرك أو بحل الدورة لترى الشكل الدقيق.</p>
</blockquote>
<h2 id="ميزانيات-وقت-التشغيل-التقط-البطء-حيث-يشعر-به-المستخدم">ميزانيات وقت التشغيل: التقط البطء حيث يشعر به المستخدم</h2>
<p>حجم البناء ليس الشيء نفسه كسرعة وقت التشغيل. أحيانًا لا تتغيّر الحزمة إلا قليلًا ومع ذلك يصبح المسار أبطأ لأن استعلامًا صار يعمل مرتين، أو مكوّنًا يرسم أكثر من اللازم، أو الصفحة تقوم بعمل مكلف عند التحميل.</p>
<p>هنا يستحق كل من <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Performance_data">واجهة الأداء</a> وتتبّعات Playwright مكانه.</p>
<p>أريد ميزانية وقت تشغيل واحدة موجّهة، لا لوحة معلومات كاملة:</p>
<ul>
<li>أن يُحمَّل مسار <code>/shelf</code> تحت حدّ مختار في معاينة شبيهة بالإنتاج</li>
<li>أو أن يكتمل تفاعل «قيّم كتابًا» تحت حدّ مختار</li>
</ul>
<p>اختر تدفقًا واحدًا يشعر به المستخدمون فعلًا. وقِسه بالطريقة نفسها في كل مرة. وخزّن الحدّ. وافشل حين ينحرف.</p>
<p>هذا يكفي لجعل الحلقة حقيقية.</p>
<h2 id="لماذا-لا-ألجأ-افتراضيا-إلى-lighthouse-هنا">لماذا لا ألجأ افتراضيًا إلى <a href="https://developer.chrome.com/docs/lighthouse">Lighthouse</a> هنا</h2>
<p>أحبّ <a href="https://developer.chrome.com/docs/lighthouse">Lighthouse</a>. وأعرف أيضًا ما يحدث حين يربطه الناس مبكرًا جدًا: يغرقون في الدرجات وضجيج البيئة ونصائح صحيحة تقنيًا لكنها عديمة الفائدة للمهمة المطروحة.</p>
<p>لهذه الورشة، أريد الحلقة الأرخص:</p>
<ul>
<li>إحصاءات البناء للوزن</li>
<li>قياس واحد قابل لإعادة الإنتاج لوقت التشغيل من أجل السرعة</li>
<li>تتبّع Playwright أو بيانات توقيت المتصفّح حين يسوء الرقم</li>
</ul>
<p>حين تستقرّ تلك الحلقة، <em>حينها</em> يمكنك إضافة أدوات أكبر. لكني لن أبدأ من هناك.</p>
<blockquote>
<p><strong>انضباط القياس</strong></p>
<p>قِس ميزانيات وقت التشغيل مقابل هدف معاينة مستقر، لا مقابل خادم تطوير بإعادة تحميل فورية. فإن تغيّرت البيئة في كل تشغيل، فالرقم يخبرك عن البيئة، لا عن الميزة.</p>
</blockquote>
<h2 id="كيف-تضبط-الأرقام-دون-أن-تجعلها-زائفة">كيف تضبط الأرقام دون أن تجعلها زائفة</h2>
<p>الطريقة الخاطئة: تختلق أرقامًا طموحة من الهواء وتراقب الفريق يعطّل الفحص بحلول الخميس.</p>
<p>الطريقة الصحيحة:</p>
<ol>
<li>قِس الحالة الخضراء الحالية.</li>
<li>قرّر أي انحراف مقبول.</li>
<li>خزّن الحدّ في التحكم بالمصادرات.</li>
<li>شدّد لاحقًا إن أثبت الفريق أنه يستطيع الثبات على الخط.</li>
</ol>
<p>عادةً أبدأ بـ«خط الأساس الحالي زائد هامش صغير» لأن ذلك يُبقي الحلقة صادقة. فالميزانية موجودة لالتقاط الانحدارات العرضية أولًا. أما بطولات التحسين فيمكن أن تأتي لاحقًا.</p>
<h2 id="ما-ينبغي-أن-يفعله-الوكيل-عندما-تخترق-الميزانية">ما ينبغي أن يفعله الوكيل عندما تُخترق الميزانية</h2>
<p>حين تُخترق الميزانية، أريد أن يتصرّف الوكيل بالطريقة نفسها التي يتصرّف بها أمام اختبار فاشل:</p>
<ul>
<li>يفحص الملفات المتغيّرة</li>
<li>يفحص إحصاءات البناء أو التتبّع</li>
<li>يحدّد الشيء الذي صار أثقل أو أبطأ</li>
<li>يصلحه أو يقترح تغيير الميزانية صراحةً</li>
</ul>
<p>الجزء الأخير مهم. فالميزانية مسموح لها بالتغيّر. لكن التغيير ينبغي أن يكون متعمّدًا ومراجَعًا ومشروحًا، لا مُهرَّبًا لأن الوكيل أراد أن يتوقف الفحص عن الصراخ.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Performance budgets</span>

<span class="hljs-bullet">-</span> After UI or bundle-affecting changes, run the performance budget
  checks before declaring the task done.
<span class="hljs-bullet">-</span> Track two things: build-size drift and one critical runtime
  measurement on a production-like preview target.
<span class="hljs-bullet">-</span> If a budget fails, inspect the stats or trace before guessing at a
  fix.
<span class="hljs-bullet">-</span> Do not raise a budget just to make the check pass. If the budget needs
  to change, explain why in the summary or commit message.
</code></pre>
<h2 id="كيف-تعرف-أن-الميزانية-حقيقية">كيف تعرف أن الميزانية حقيقية</h2>
<p>لديك هذه الحلقة عندما:</p>
<ul>
<li>يُخرج المستودع إحصاءات بناء يستطيع الوكيل تحليلها</li>
<li>يكون لتدفق واحد حرج في وقت التشغيل حدّ توقيت قابل لإعادة الإنتاج</li>
<li>يتعامل الوكيل مع إخفاقات الميزانية كإخفاقات حقيقية، لا كمخرجات استشارية</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>ميزانيات الأداء ليست عن مطاردة الدرجات المثالية. إنها عن جعل الانحدارات مستحيلة التجاهل. اختر رقمين يهمّان، وافرِضهما بثبات، ودع الوكيل يتعثّر بهما قبل مستخدميك.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop">الانحدار البصري كحلقة تغذية راجعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-performance-budgets-to-shelf">مختبر: إضافة ميزانيات أداء إلى Shelf</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
