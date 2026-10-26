const s="kinney",n="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="dead-code-detection",t="كشف الشيفرة الميتة",p=[{depth:2,id:"الأدوات",text:"الأدوات"},{depth:2,id:"تشغيل-knip-فعليا",text:"تشغيل knip فعليًا"},{depth:2,id:"ماذا-تفعل-بالنتائج",text:"ماذا تفعل بالنتائج"},{depth:2,id:"ربط-كشف-الشيفرة-الميتة-بالحلقة",text:"ربط كشف الشيفرة الميتة بالحلقة"},{depth:2,id:"كتلة-قواعد-للوكيل-تستحق-الإضافة",text:"كتلة قواعد للوكيل تستحق الإضافة"},{depth:2,id:"الطبقة-المعمارية-dependency-cruiser-لحدود-المجلدات",text:"الطبقة المعمارية: dependency-cruiser لحدود المجلدات"},{depth:2,id:"حين-يصير-كشف-اليتائم-صاخبا",text:"حين يصير كشف اليتائم صاخبًا"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],o=`<p><em>يحب</em> الوكلاء ترك الشيفرة الميتة خلفهم. تطلب منهم إعادة كتابة وحدة، فيكتبون النسخة الجديدة، وتبقى النسخة القديمة هناك، بلا مرجع، في ملف لن يحذفه أحد لأن أحدًا لن ينتبه. تطلب منهم إعادة تسمية دالة، فينشئون الاسم الجديد، ويستخدمون الاسم الجديد في المواضع التي يعرفونها، ويبقى الاسم القديم موجودًا في مكان ما، وما زال يُصدَّر من ملف برميل، وما زال يُستورد في اختبار نسيته. تطلب منهم إزالة ميزة، فيزيلون واجهتها ويتركون معالج API، أو يزيلون معالج API ويتركون عمود قاعدة البيانات.</p>
<p>هذا ليس فشلًا أخلاقيًا من جانب الوكيل. إنه نتيجة متوقعة لطريقة عمل الوكلاء—فهم يجعلون التغييرات <em>الإضافية</em> بكفاءة، ولا يجعلون التغييرات <em>الطارحة</em> إلا على الأشياء المحددة التي طُلب منهم تغييرها. والنتيجة قاعدة شيفرة تتراكم فيها الشيفرة اليتيمة بمعدل سرعة عمل الوكيل تقريبًا، وإن لم تكن تلتقط اليتائم، فستغرق فيها خلال شهر.</p>
<p>الجواب هو كشف الشيفرة الميتة. شغّله باستمرار. تعامل مع اليتائم كبوابة جودة، لا كمهمة تنظيف. هذا هو الدرس الذي نحوّل فيه كشف اليتائم إلى مواطن من الدرجة الأولى في الحلقة.</p>
<h2 id="الأدوات">الأدوات</h2>
<p>اثنتان أستخدمهما، بترتيب مقدار اعتمادي عليهما.</p>
<p><strong><a href="https://knip.dev/">knip</a></strong> هي الشاملة، وهي الخيار الافتراضي الذي أمدّ يدي إليه. إنها تفهم مخطط الوحدات كاملًا في مشروعك وتخبرك عن الملفات غير المستخدمة، والتصديرات غير المستخدمة، والاعتماديات غير المستخدمة، والأنواع غير المستخدمة، و<code>devDependencies</code> غير المستخدمة. وهي قابلة للتهيئة لكن لها قيم افتراضية معقولة لمعظم الكومات (بما فيها SvelteKit).</p>
<pre><code class="language-bash">npm install -D knip
npx knip
</code></pre>
<p>أول تشغيل على Shelf: سترى على الأرجح دستة من النتائج. معظمها سيكون مشروعًا. وقليل منها سيكون إيجابيات كاذبة—أشياء تحسبها knip غير مستخدمة بينما تُشار إليها ديناميكيًا في الحقيقة. هيّئ knip لتتجاهل تلك الحالات المحددة وامضِ.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>قد تصادف مقالات أقدم توصي بـ<code>ts-prune</code> كندّ لـknip. تجاهلها. فالمشروع لم يعد مُصانًا وملف README الخاص به يوجّه القراء إلى knip كبديل.</p>
</blockquote>
<p><strong><a href="https://github.com/sverweij/dependency-cruiser">dependency-cruiser</a></strong> هي المعمارية. إنها تفهم مخطط وحداتك بعمق يكفي لفرض قواعد مثل «لا يجوز استيراد أي شيء تحت <code>src/lib/server/</code> من شيفرة العميل في <code>src/routes/</code>» أو «لا يُسمح لمجلد <code>legacy-auth/</code> بأن ترد إليه حواف من خارجه». وهذه ليست أداة شيفرة ميتة في المقام الأول—إنها أداة اعتماديات دائرية وفرض حدود وقواعد معمارية—لكنها تلتقط الشيفرة الميتة كأثر جانبي لأن الوحدات اليتيمة يسهل رصدها في مخطط.</p>
<pre><code class="language-bash">npm install -D dependency-cruiser
npx depcruise --init
</code></pre>
<p>لا يحتاج الجميع إلى dependency-cruiser. إنها تستحق عناءها حين تكون لقاعدة شيفرتك حدود معمارية تهمك. وفي Shelf، أستخدمها أساسًا لتثبيت مجلد <code>legacy-auth/</code> كي لا يستورد منه شيء ونستطيع معرفة متى يصبح حذفه آمنًا.</p>
<h2 id="تشغيل-knip-فعليا">تشغيل knip فعليًا</h2>
<p>تهيئة knip تعيش في <code>knip.json</code> (أو <code>knip.jsonc</code>). وهذه نقطة بداية معقولة لـShelf:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://unpkg.com/knip@6/schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;entry&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;src/app.html&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;src/hooks.server.ts&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;src/routes/**/+*.{ts,svelte}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;tests/**/*.{test,spec}.ts&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;scripts/*.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;project&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*.{ts,svelte}&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tests/**/*.ts&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;scripts/**/*.ts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ignore&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/lib/legacy-auth/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><code>entry</code> هي قائمة الملفات التي تعاملها knip كجذور لمخطط الاستيراد—وأي شيء لا يُستورد استيرادًا متعديًا من مدخل ما يكون غير مستخدم. وفي SvelteKit، المدخلات هي ملفات المسارات والخُطّافات وقالب التطبيق. والاختبارات مدخلات أيضًا، وإلا فعّلت knip على ملفات الاختبار كغير مستخدمة.</p>
<p><code>project</code> هو نطاق ما تحلله knip. و<code>ignore</code> يتخطى ملفات لا تهمنا عمدًا.</p>
<p>شغّلها:</p>
<pre><code class="language-bash">npx knip
</code></pre>
<p>اقرأ المخرجات. احذف الأشياء الميتة فعلًا. وهيّئ الأشياء التي هي إيجابيات كاذبة. هذه الجولة الأولى هي الأبطأ—وبعدها يصبح كل تشغيل لاحق سريعًا ومملًا.</p>
<h2 id="ماذا-تفعل-بالنتائج">ماذا تفعل بالنتائج</h2>
<p>لكل نتيجة ثلاثة خيارات:</p>
<ol>
<li><strong>احذفها.</strong> معظم النتائج ينبغي أن تكون حذفًا. فالتصدير ميت لأن الشيفرة التي كانت تستخدمه أُعيد هيكلتها قبل ستة أسابيع ولم ينظّفها أحد. نفّذ <code>rm</code> على الملف (أو التصدير)، وأعد تشغيل الاختبارات، وأودِع. وإن شعرت بالقلق، فسيذكرها git إلى الأبد.</li>
<li><strong>استخدمها.</strong> أحيانًا تكشف النتيجة أنك نسيت ربط شيء ما. التصدير موجود، والتنفيذ موجود، لكن لا أحد يستورده. إما لأن الميزة نصف مبنية أو لأن وكيلًا كتب النصفين منفصلين ولم يوصلهما قط. أصلح الربط.</li>
<li><strong>هيّئها كمسموح بها.</strong> بعض الأشياء مستخدمة فعلًا لكن knip لا تستطيع رؤية الاستخدام—استيرادات ديناميكية، وشيفرة كثيفة الانعكاس، وسحر الأطر. أضف الملف أو النمط المحدد إلى قائمة تجاهل knip مع <em>تعليق يشرح السبب</em>. هذه هي التفصيلة المفتاحية: فالمدخلات المتجاهَلة تتعفّن بمرور الوقت، والتعليق هو الطريقة الوحيدة التي يعرف بها أنت المستقبلي ما إذا كان التجاهل ما زال مطلوبًا.</li>
</ol>
<p>لا تكتم النتائج فحسب. فكل تجاهل عيب مستقبلي.</p>
<h2 id="ربط-كشف-الشيفرة-الميتة-بالحلقة">ربط كشف الشيفرة الميتة بالحلقة</h2>
<p>الحيلة في كشف الشيفرة الميتة هي تشغيله <em>بما يكفي من التكرار</em> كي لا تتراكم اليتائم. والخيارات، بترتيب الإحكام:</p>
<ul>
<li><strong>في كل تشغيل CI.</strong> احجب الدمج إن أبلغت knip عن نتائج جديدة.</li>
<li><strong>عند كل إيداع عبر خُطّاف git.</strong> درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خُطّافات Git مع Lefthook</a> فيه التفاصيل.</li>
<li><strong>عند كل حفظ، عبر مراقب ملفات.</strong> لا تملك knip امتداد محرر، لكن يمكنك ربط <code>npx knip --no-progress</code> بمراقب <code>chokidar</code> إن أردت النتائج دون مغادرة المحرر.</li>
<li><strong>في مهمة ليلية</strong> تفتح طلب سحب للتنظيف. وهذه النسخة الأقل احتكاكًا—لا أحد محجوب، لكن التنظيف يحدث تلقائيًا.</li>
</ul>
<p>الخيار الافتراضي عندي هو «في كل تشغيل CI، مع عدد مثبَّت». والسكربت:</p>
<pre><code class="language-bash"><span class="hljs-comment"># package.json</span>
<span class="hljs-string">&quot;knip&quot;</span>: <span class="hljs-string">&quot;knip --reporter compact&quot;</span>,
<span class="hljs-string">&quot;knip:check&quot;</span>: <span class="hljs-string">&quot;knip --reporter compact --max-issues 12&quot;</span>
</code></pre>
<p>النهج: ثبّت الإجمالي الحالي في <code>--max-issues</code>. ويفشل CI إن تجاوز العدد ذلك الرقم. ويمكن للمطورين خفضه متى شاؤوا بتحرير السكربت نزولًا مع تسديدهم للنتائج. ويرى الوكلاء فشل الفحص، فيذهبون للبحث عن اليتيم الذي أنشأوه للتو، وينظّفونه. ومع الوقت، ينزل العدد المثبَّت إلى الصفر.</p>
<p>نهج بديل، أبسط: أفشل CI إن وجدت knip أي شيء إطلاقًا. هذا صارم لكنه يفرض التنظيف في طلب السحب الذي أدخل اليتيم، وهو أرخص وقت ممكن للإصلاح. أفضّل هذا في قواعد الشيفرة الجديدة ونهج السقّاطة في القديمة.</p>
<h2 id="كتلة-قواعد-للوكيل-تستحق-الإضافة">كتلة قواعد للوكيل تستحق الإضافة</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Dead code</span>

<span class="hljs-bullet">-</span> Run <span class="hljs-code">\`bun run knip\`</span> before declaring a task done. It must report zero
  findings in files you touched.
<span class="hljs-bullet">-</span> If knip reports a file or export you added as unused, either:
  (a) complete the wiring so it&#x27;s actually used, or
  (b) delete it. Do not ignore it in <span class="hljs-code">\`knip.json\`</span> without a written
  justification.
<span class="hljs-bullet">-</span> Do not leave old code &quot;for reference&quot; after a refactor. Git history
  is the reference. Delete the old code.
<span class="hljs-bullet">-</span> When removing a feature, search for every reference to the feature
  and remove them all in one commit. Do not leave the API handler
  behind after deleting the UI, or vice versa.
</code></pre>
<p>القاعدة الأخيرة هي التي أخالفها أكثر من غيرها في المشاريع التي تخلو من كشف الشيفرة الميتة. فالطبقة الساكنة موجودة كي تُفرَض القاعدة ميكانيكيًا بدلًا من الاعتماد على انتباهي.</p>
<h2 id="الطبقة-المعمارية-dependency-cruiser-لحدود-المجلدات">الطبقة المعمارية: dependency-cruiser لحدود المجلدات</h2>
<p>الميزة القاتلة في dependency-cruiser لأغراضنا هي فرض «لا شيء يستورد من <code>legacy-auth/</code>». وهذه تهيئة أدنى:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// .dependency-cruiser.mjs</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">forbidden</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;no-orphans&#x27;</span>,
      <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">comment</span>: <span class="hljs-string">&#x27;Orphaned modules are almost always dead code.&#x27;</span>,
      <span class="hljs-attr">from</span>: {
        <span class="hljs-attr">orphan</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">pathNot</span>: [
          <span class="hljs-string">&#x27;(^|/)\\\\.[^/]+\\\\.(js|cjs|mjs|ts|json)$&#x27;</span>, <span class="hljs-comment">// config dotfiles</span>
          <span class="hljs-string">&#x27;\\\\.d\\\\.ts$&#x27;</span>, <span class="hljs-comment">// type declarations</span>
        ],
      },
      <span class="hljs-attr">to</span>: {},
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;no-legacy-auth-imports&#x27;</span>,
      <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">comment</span>: <span class="hljs-string">&#x27;legacy-auth/ is scheduled for deletion. Nothing new should import from it.&#x27;</span>,
      <span class="hljs-attr">from</span>: { <span class="hljs-attr">pathNot</span>: <span class="hljs-string">&#x27;^src/lib/legacy-auth&#x27;</span> },
      <span class="hljs-attr">to</span>: { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;^src/lib/legacy-auth&#x27;</span> },
    },
  ],
};
</code></pre>
<p>قاعدتان. <code>no-orphans</code> تُعلّم أي ملف غير قابل للوصول من المخطط. و<code>no-legacy-auth-imports</code> تفرض حد المجلد. شغّل <code>npx depcruise src</code> وستُطلق القاعدتان على أي مخالفة.</p>
<p>نعم، قد يمنحك <code>depcruise --init</code> تهيئة CommonJS في بعض الإعدادات، حتى في مستودع ESM. أعد تسميتها إلى <code>.dependency-cruiser.mjs</code> وبدّل إلى <code>export default</code>. فـDependency Cruiser نفسها تستخدم تهيئة <code>.mjs</code> في مستودعها، وهذا المستودع أصلًا ESM أولًا (<code>&quot;type&quot;: &quot;module&quot;</code>)، فلا سبب لتعليم CommonJS من طراز 2019 هنا.</p>
<p>لا أشغّل dependency-cruiser دائمًا في الحلقة المحلية السريعة—إنها أبطأ من knip. عادةً أشغّلها في CI وأدع CI يفشل عند المخالفات. فالحلقة المحلية تلتقط معظم اليتائم عبر knip؛ وdependency-cruiser هي شبكة الأمان للانحدارات البنيوية.</p>
<h2 id="حين-يصير-كشف-اليتائم-صاخبا">حين يصير كشف اليتائم صاخبًا</h2>
<p>أحيانًا ستمر بمرحلة تُعلّم فيها knip أشياء تعرف أنها سليمة، وتجعل الضوضاء الإشارة غير مرئية. وفيما يلي أنماط تعافٍ قليلة:</p>
<ul>
<li><strong>افرز مرة واحدة، بشراسة.</strong> احجز ساعة، وامرّ على كل نتيجة، وحلّ كل واحدة بالحذف أو الإصلاح أو التجاهل مع تعليق. وينبغي أن يكون خط الأساس بعد الفرز قريبًا من الصفر.</li>
<li><strong>أفشل على النتائج الجديدة، لا الموجودة.</strong> نهج سقّاطة خط الأساس. الشيفرة الجديدة نظيفة، والقديمة تُنظَّف انتهازيًا.</li>
<li><strong>أحكِم قائمة المدخلات.</strong> كثير من الإيجابيات الكاذبة يأتي من عدم معرفة knip بنقاط دخولك. دقّق قائمة <code>entry</code> في <code>knip.json</code> وتأكد من دقتها.</li>
<li><strong>تجاهل سحر الأطر صراحة.</strong> لدى SvelteKit وNext.js وما شابههما ملفات لا تستطيع knip رؤيتها كمدخلات (تخطيطات المسارات، وصفحات الخطأ). أضفها إلى <code>entry</code> صراحة.</li>
</ul>
<p>لا تدع الضوضاء تصير سببًا لإيقاف كشف اليتائم. فالمغزى كله أنه <em>مزعج</em>—والانزعاج إشارة إلى وجود شيء يحتاج إصلاحًا.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>يراكم الوكلاء شيفرة ميتة أسرع من البشر لأن التعديلات الإضافية هي الطريق الرخيص والتعديلات الطارحة ليست كذلك. وكشف الشيفرة الميتة هو القوة المضادة للتراكم. شغّله في كل بناء CI، وتعامل مع اليتائم كبوابة لا كتنظيف، فلن تنزلق قاعدة شيفرتك إلى الدين التقني لمجرد أن الوكيل كان منتجًا لأسبوعين متتاليين.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails">Lint والأنواع كحواجز حماية</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خُطّافات Git مع Lefthook</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:p,html:o};export{s as book,n as chapter,e as chapterTitle,c as default,p as headings,o as html,a as slug,t as title};
