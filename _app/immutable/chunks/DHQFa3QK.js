const s="kinney",n="enterprise-ui",e="واجهات المؤسسات",o="monorepo-setup-exercise",p="التمرين 4: إعداد المستودع الأحادي",a=[{depth:2,id:"لماذا-يهم",text:"لماذا يهمّ"},{depth:2,id:"اشعر-بالمشكلة",text:"اشعر بالمشكلة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"كيف-ينسق-turborepo-البناءات",text:"كيف ينسّق Turborepo البناءات"},{depth:2,id:"ثبت-turborepo-وأنشئ-turbojson",text:"ثبّت Turborepo وأنشئ turbo.json"},{depth:3,id:"ماذا-يعني-كل-حقل",text:"ماذا يعني كل حقل"},{depth:2,id:"حدث-سكربتات-packagejson-في-الجذر",text:"حدّث سكربتات package.json في الجذر"},{depth:2,id:"شغل-turborepo-لأول-مرة",text:"شغّل Turborepo لأول مرة"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقّق"},{depth:2,id:"راقب-البناءات-الجزئية",text:"راقب البناءات الجزئية"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقّق"},{depth:2,id:"افحص-رسم-الاعتمادات",text:"افحص رسم الاعتمادات"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقّق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],t=`<p>تضم مساحة العمل أربع حزم (<code>analytics</code> و<code>users</code> و<code>ui</code> و<code>shared</code>) وتطبيق لوحة معلومات، لكن لا يوجد تنسيق للبناء. وتشغيل <code>pnpm -r build</code> يعيد بناء كل شيء في كل مرة، حتى الحزم غير المتغيرة. وأنت ستنشئ تهيئة <code>turbo.json</code> وتربط Turborepo كي تصير البناءات مخزّنة مؤقتًا وواعية بالاعتمادات وسريعة.</p>
<h2 id="لماذا-يهم">لماذا يهمّ</h2>
<p>بلا منسّق بناء، تبدأ كل تشغيلة CI وكل بناء محلي من الصفر. وفي مستودع أحادي بخمس حزم يستغرق ذلك ثوانٍ؛ وفي مستودع بخمسين حزمة يستغرق دقائق. ويعني التجزئة الواعية بالمحتوى في Turborepo أن بناءً نجح سابقًا بالمدخلات نفسها لا يُعاد أبدًا. فالبناء الثاني مجاني. وتغيير حزمة ورقية واحدة يعيد بناء المعتمَدات عليها فقط، لا الرسم البياني كامل. وهذه هي الأداة التي تجعل المستودعات الأحادية مجدية على نطاق واسع.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>في هذه المرحلة، تضم مساحة العمل <code>packages/users</code> — حزمة ميزة لإدارة المستخدمين. وهي تتبع النمط نفسه الذي يتبعه <code>packages/analytics</code>: ملف <code>package.json</code> خاص بها، و<code>tsconfig.json</code>، و<code>src/index.ts</code> بواجهة برمجية عامة صريحة.</p>
</blockquote>
<h2 id="اشعر-بالمشكلة">اشعر بالمشكلة</h2>
<p>شغّل البناء دون Turborepo لتفهم ما الذي تصلحه.</p>
<p>شغّل البناء عبر كل حزم مساحة العمل:</p>
<pre><code class="language-bash">pnpm -r build
</code></pre>
<p>لاحظ المخرَج — كل حزمة تُبنى بالتتابع. ولاحظ كم يستغرق.</p>
<p>والآن شغّله مجددًا فورًا، دون تغيير أي شيء:</p>
<pre><code class="language-bash">pnpm -r build
</code></pre>
<p>الوقت نفسه. المخرَج نفسه. أُعيد بناء كل حزمة رغم أن شيئًا لم يتغيّر. فعلم <code>--recursive</code> في pnpm بلا تخزين مؤقت — إنه يشغّل سكربت <code>build</code> في كل حزمة لديها واحد فقط.</p>
<blockquote>
<p><strong>لماذا لا تكفي pnpm وحدها</strong></p>
<p>تتولّى مساحات عمل pnpm حلّ الحزم وربط الاعتمادات — فهي تضمن أن <code>@pulse/analytics</code> يستطيع استيراد <code>@pulse/ui</code> عبر بروتوكول مساحة العمل (<code>workspace:*</code>). لكن pnpm ليس له رأي في تنسيق المهام. فهو لا يعرف أن <code>@pulse/analytics</code> يعتمد على <code>@pulse/ui</code>، وأنه لذلك يجب بناء <code>@pulse/ui</code> أولًا. ولا يخزّن المخرجات مؤقتًا. ولا يتخطى الحزم غير المتغيرة. وهذا ما يضيفه منسّق بناء مثل Turborepo فوق ذلك.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّلت <code>pnpm -r build</code> مرتين واستغرقت التشغيلتان وقتًا متقاربًا. لا تخزين مؤقت، ولا ترتيب اعتمادات، ولا توازٍ.</p>
<h2 id="كيف-ينسق-turborepo-البناءات">كيف ينسّق Turborepo البناءات</h2>
<p>يقرأ Turborepo رسم الاعتمادات من ملفات <code>package.json</code> لديك ويستخدم سابقة <code>^</code> في <code>dependsOn</code> لتحديد ترتيب البناء. وتُبنى الحزم في العمق نفسه بالتوازي. ويخزّن المخزن المؤقت المخرجات بمفاتيح من تجزئة مدخلات كل حزمة.</p>
<pre><code>graph TD
    Shared[&quot;@pulse/shared&quot;]
    UI[&quot;@pulse/ui&quot;]
    Analytics[&quot;@pulse/analytics&quot;]
    Users[&quot;@pulse/users&quot;]
    Dashboard[&quot;@pulse/dashboard&quot;]

    Dashboard --&gt; Analytics
    Dashboard --&gt; Users
    Dashboard --&gt; UI
    Dashboard --&gt; Shared
    Analytics --&gt; UI
    Analytics --&gt; Shared
    Users --&gt; UI
    Users --&gt; Shared
    UI --&gt; Shared
</code></pre>
<pre><code>flowchart LR
    subgraph Inputs
        Src[&quot;Source Files&quot;]
        Deps[&quot;Dependency Hashes&quot;]
        Env[&quot;Environment Variables&quot;]
        Lock[&quot;Lockfile Entries&quot;]
        Config[&quot;turbo.json Task Config&quot;]
    end

    Hash[&quot;Content Hash&quot;]
    Cache{{&quot;Cache Lookup&quot;}}
    Hit[&quot;Cache Hit → Restore dist/ + replay logs&quot;]
    Miss[&quot;Cache Miss → Execute build → Store in cache&quot;]

    Src --&gt; Hash
    Deps --&gt; Hash
    Env --&gt; Hash
    Lock --&gt; Hash
    Config --&gt; Hash
    Hash --&gt; Cache
    Cache --&gt;|&quot;match&quot;| Hit
    Cache --&gt;|&quot;no match&quot;| Miss
</code></pre>
<h2 id="ثبت-turborepo-وأنشئ-turbojson">ثبّت Turborepo وأنشئ <code>turbo.json</code></h2>
<p>ثبّت Turborepo كاعتماد تطوير في جذر مساحة العمل:</p>
<pre><code class="language-bash">pnpm add -Dw turbo
</code></pre>
<p>أنشئ <code>turbo.json</code> في جذر المستودع:</p>
<p><em>turbo.json</em></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://turbo.build/schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;^build&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;outputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dist/**&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typecheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;^typecheck&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;^build&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;cache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;persistent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> سابقة ^ تبني الاعتمادات أولًا. و«outputs» تخبر Turborepo بما يخزّنه مؤقتًا.</p>
<p><em>ملاحظة:</em> لا ينبغي تخزين خوادم التطوير طويلة التشغيل مؤقتًا أبدًا.</p>
<h3 id="ماذا-يعني-كل-حقل">ماذا يعني كل حقل</h3>
<ul>
<li><strong><code>&quot;dependsOn&quot;: [&quot;^build&quot;]</code></strong>: سابقة <code>^</code> تعني «شغّل هذه المهمة في اعتماداتي أولًا». فقبل بناء <code>@pulse/analytics</code>، يتأكد Turborepo أن <code>@pulse/ui</code> و<code>@pulse/shared</code> بُنيتا سابقًا. وبلا السابقة، سيعني <code>dependsOn: [&quot;build&quot;]</code> «شغّل build في <em>هذه</em> الحزمة أولًا» (اعتماد على الذات، وهو عادةً ليس ما تريد).</li>
<li><strong><code>“outputs”: [“dist/**”]</code></strong>: يخبر Turborepo أي الملفات يخزّن. فبعد بناء ناجح، يجزّئ المدخلات (ملفات المصدر، والاعتمادات، ومتغيّرات البيئة) ويخزّن المخرجات. وفي التشغيل التالي بالمدخلات نفسها، يعيد تشغيل المخرجات المخزّنة بدل تنفيذ البناء مجددًا.</li>
<li><strong><code>&quot;lint&quot;: {}</code></strong>: بلا <code>dependsOn</code>، وبلا <code>outputs</code>. ففحص كل حزمة مستقل — لا تحتاج إلى فحص الاعتمادات أولًا، ولا شيء يُخزَّن مؤقتًا أبعد من نتيجة النجاح أو الفشل.</li>
<li><strong><code>&quot;cache&quot;: false</code></strong>: يجب ألا تُخزَّن مهمة <code>dev</code> مؤقتًا أبدًا. فهي عملية طويلة التشغيل (خادم تطوير)، لا أمرًا لمرة واحدة.</li>
<li><strong><code>&quot;persistent&quot;: true</code></strong>: يخبر Turborepo أن <code>dev</code> عملية طويلة التشغيل لا تنتهي. وبدونه، سينتظر Turborepo انتهاءها قبل تشغيل المهام المعتمدة (وهو ما سيتعلّق إلى الأبد).</li>
</ul>
<blockquote>
<p><strong>سابقة <code>^</code> أهم مفهوم في Turborepo</strong></p>
<p>إنها ترمّز رسم الاعتمادات في خط أنابيب مهامك. فعندما تشغّل <code>turbo build</code>، يقرأ Turborepo ملف <code>package.json</code> لكل حزمة ليبني رسم الاعتمادات، ثم يستخدم <code>^build</code> لتحديد ترتيب التنفيذ. فـ<code>@pulse/shared</code> بلا اعتمادات، فتُبنى أولًا. و<code>@pulse/ui</code> تعتمد على <code>@pulse/shared</code>، فتُبنى ثانيًا. و<code>@pulse/analytics</code> تعتمد على الاثنتين، فتُبنى ثالثًا. ولوحة المعلومات تعتمد على كل شيء، فتُبنى أخيرًا. ويشغّل Turborepo الحزم في العمق نفسه بالتوازي — فيمكن بناء <code>@pulse/ui</code> و<code>@pulse/users</code> في الوقت نفسه لأن إحداهما لا تعتمد على الأخرى.</p>
</blockquote>
<h2 id="حدث-سكربتات-packagejson-في-الجذر">حدّث سكربتات <code>package.json</code> في الجذر</h2>
<p>افتح <code>package.json</code> الجذري واستبدل قسم <code>scripts</code> القائم. كانت السكربتات القديمة تشغّل أوامر pnpm مباشرة — أما الجديدة فتفوّض الأمر إلى Turborepo:</p>
<p><em>package.json</em></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;turbo build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typecheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;turbo typecheck&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;turbo lint&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;turbo test&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;turbo dev&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> كل السكربتات الآن تفوّض الأمر إلى Turborepo بدل تشغيل pnpm -r مباشرةً.</p>
<p>الآن يفوّض <code>pnpm build</code> الأمر إلى Turborepo بدل تشغيل السكربتات مباشرةً.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p><strong>ما زال بوسعك استخدام مرشّحات pnpm إلى جانب Turborepo.</strong> فتشغيل <code>pnpm turbo build --filter=@pulse/analytics</code> يبني <code>@pulse/analytics</code> واعتماداتها فقط. وتشغيل <code>pnpm turbo build --filter=@pulse/analytics...</code> (باللاحقة <code>...</code>) يبني <code>@pulse/analytics</code> وكل ما يعتمد عليها. وبهذه المرشّحات تبني خطوط CI ما غيّره طلب سحب فقط.</p>
</blockquote>
<h2 id="شغل-turborepo-لأول-مرة">شغّل Turborepo لأول مرة</h2>
<p>شغّل البناء عبر Turborepo:</p>
<pre><code class="language-bash">pnpm turbo build
</code></pre>
<p>راقب المخرَج. يطبع Turborepo كل مهمة أثناء تشغيلها، عارضًا ترتيب الاعتمادات:</p>
<pre><code>@pulse/shared:build: cache miss, executing
@pulse/legacy:build: cache miss, executing
@pulse/ui:build: cache miss, executing
@pulse/analytics:build: cache miss, executing
@pulse/users:build: cache miss, executing
@pulse/dashboard:build: cache miss, executing
</code></pre>
<p>كل مهمة تقول «cache miss» لأن هذه أول تشغيلة — لا يوجد مخزن مؤقت بعد.</p>
<p>شغّله مجددًا فورًا:</p>
<pre><code class="language-bash">pnpm turbo build
</code></pre>
<p>الآن يختلف المخرَج:</p>
<pre><code>@pulse/shared:build: cache hit, replaying logs
@pulse/legacy:build: cache hit, replaying logs
@pulse/ui:build: cache hit, replaying logs
@pulse/analytics:build: cache hit, replaying logs
@pulse/users:build: cache hit, replaying logs
@pulse/dashboard:build: cache hit, replaying logs

 Tasks:    6 successful, 6 total
Cached:    6 cached, 6 total
  Time:    103ms &gt;&gt;&gt; FULL TURBO
</code></pre>
<p>كل مهمة تعرض «cache hit». وينخفض الزمن الكامل إلى أقل من ثانية. و<code>FULL TURBO</code> تعني أن كل مهمة جاءت من المخزن المؤقت.</p>
<blockquote>
<p><strong>كيف يعمل المخزن المؤقت في Turborepo</strong></p>
<p>لكل مهمة، يحسب Turborepo تجزئة من:</p>
<ol>
<li>ملفات المصدر في الحزمة</li>
<li>تجزئات كل حزم الاعتماد</li>
<li>تعريف المهمة في <code>turbo.json</code></li>
<li>متغيّرات البيئة ذات الصلة</li>
<li>مدخلات ملف القفل للاعتمادات الخارجية</li>
</ol>
<p>فإن طابقت التجزئة تشغيلة سابقة، استعاد Turborepo المخرجات المخزّنة (<code>outputs</code>، أي مجلد <code>dist/</code>) وأعاد تشغيل المخرجات المسجّلة stdout/stderr بدل تنفيذ الأمر. والمخزن محلي افتراضيًا (يُحفظ في <code>node_modules/.cache/turbo</code>)، لكن يمكن مشاركته عبر عوامل CI بالتخزين المؤقت البعيد.</p>
</blockquote>
<h3 id="نقطة-تحقق-1">نقطة تحقّق</h3>
<p><code>pnpm turbo build</code> بمخزن مؤقت نظيف يبني كل شيء. والتشغيلة الثانية تعرض <code>FULL TURBO</code> وتكتمل في أقل من ثانية.</p>
<p><img src="/arabic-cs-library/images/kinney/97f966da08c122d2.webp" alt="أول بناء بـturbo يعرض حالات cache miss لكل الحزم"></p>
<p><img src="/arabic-cs-library/images/kinney/72f4d6eb0a1c7233.webp" alt="البناء الثاني بـturbo يعرض FULL TURBO مع كل حالات cache hit"></p>
<h2 id="راقب-البناءات-الجزئية">راقب البناءات الجزئية</h2>
<p>والآن غيّر شيئًا وراقب Turborepo يعيد بناء ما يلزم فقط.</p>
<p>افتح <code>packages/ui/src/button.tsx</code> وأجرِ تغييرًا صغيرًا — أضف تعليقًا في أعلى الملف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Updated button styling</span>
</code></pre>
<p>احفظ الملف وشغّل البناء مجددًا:</p>
<pre><code class="language-bash">pnpm turbo build
</code></pre>
<p>انظر إلى المخرَج بعناية:</p>
<pre><code>@pulse/shared:build: cache hit, replaying logs
@pulse/legacy:build: cache hit, replaying logs
@pulse/ui:build: cache miss, executing
@pulse/analytics:build: cache miss, executing
@pulse/users:build: cache miss, executing
@pulse/dashboard:build: cache miss, executing
</code></pre>
<p><code>@pulse/shared</code> و<code>@pulse/legacy</code> حالات cache hit — لم تتغيّرا ولا اعتماد لهما على <code>@pulse/ui</code>. لكن <code>@pulse/ui</code> حالة cache miss (لأنك غيّرتها)، وكل ما يعتمد على <code>@pulse/ui</code> يُعاد بناؤه أيضًا: <code>@pulse/analytics</code> و<code>@pulse/users</code> و<code>@pulse/dashboard</code>.</p>
<blockquote>
<p><strong>يعيد Turborepo بناء المعتمَدات، لا الحزمة المتغيرة فقط</strong></p>
<p>لأن التجزئة تضم تجزئات الاعتمادات. فعندما تتغيّر <code>@pulse/ui</code>، تتغيّر تجزئتها. و<code>@pulse/analytics</code> تعتمد على <code>@pulse/ui</code>، فتضم تجزئة مدخلاتها تجزئة <code>@pulse/ui</code> — التي تغيّرت. وتستمر السلسلة صعودًا في الرسم البياني. وهذا صحيح: فتغيير في <code>@pulse/ui</code> قد يؤثر في مخرجات بناء أي حزمة تستوردها. والتحسين الآمن الوحيد هو تخطي الحزم التي يستحيل إثبات تأثرها — أي الحزم التي لا مسار اعتماد يصل بها إلى الحزمة المتغيرة.</p>
</blockquote>
<p>أعد تغييرك في <code>packages/ui/src/button.tsx</code> (أزل التعليق) وشغّل <code>pnpm turbo build</code> مجددًا. ينبغي أن يكون <code>FULL TURBO</code> — فقد عادت الملفات إلى الحالة المخزّنة.</p>
<h3 id="نقطة-تحقق-2">نقطة تحقّق</h3>
<p>بعد تغيير <code>packages/ui</code>، تظهر <code>@pulse/shared</code> وحدها كحالة cache hit. ويُعاد بناء كل ما هو أسفل <code>@pulse/ui</code>. وبعد التراجع، يُستعاد المخزن المؤقت.</p>
<h2 id="افحص-رسم-الاعتمادات">افحص رسم الاعتمادات</h2>
<p>يستطيع Turborepo عرض رسم المهام الذي يبنيه.</p>
<p>ولّد الرسم:</p>
<pre><code class="language-bash">pnpm turbo build --graph=graph.html
</code></pre>
<p>يولّد هذا ملف HTML فيه تصوّر لرسم الاعتمادات. افتح <code>graph.html</code> في متصفحك. ينبغي أن ترى:</p>
<ul>
<li><code>@pulse/shared</code> في الأسفل (بلا اعتمادات)</li>
<li><code>@pulse/ui</code> في مستوى واحد أعلى (تعتمد على <code>@pulse/shared</code>)</li>
<li><code>@pulse/analytics</code> و<code>@pulse/users</code> في المستوى التالي (كلتاهما تعتمد على <code>@pulse/ui</code> و<code>@pulse/shared</code>)</li>
<li><code>@pulse/dashboard</code> في الأعلى (تعتمد على كل شيء)</li>
</ul>
<blockquote>
<p><strong>الرسم البياني هو المعمارية</strong></p>
<p>هذا التصوّر ليس أداة تنقيح فقط — بل خريطة لاقتران نظامك. فإن رأيت حزمة في أسفل الرسم بحواف تصل إلى كل حزمة أخرى، فتلك أهم اعتماد مشترك لديك. وإن رأيت حزمتين بلا حواف بينهما، فبوسعهما البناء والاختبار بالتوازي. ويخبرك الرسم حيث يكون التوازي ممكنًا، وأين توجد الاختناقات، وما نطاق تأثير أي تغيير.</p>
</blockquote>
<p>والآن جرّب المرشّح مع الرسم:</p>
<pre><code class="language-bash">pnpm turbo build --filter=@pulse/analytics... --graph=graph-analytics.html
</code></pre>
<p>يولّد هذا رسمًا يعرض فقط الرسم الفرعي المتصل بـ<code>@pulse/analytics</code> واعتماداتها.</p>
<h3 id="نقطة-تحقق-3">نقطة تحقّق</h3>
<p>تستطيع تصوّر رسم الاعتمادات وتحديد أي الحزم أعلى وأسفل أي حزمة معينة.</p>
<pre><code>graph TD
    Dashboard[&quot;@pulse/dashboard#build&quot;]
    Users[&quot;@pulse/users#build&quot;]
    Analytics[&quot;@pulse/analytics#build&quot;]
    UI[&quot;@pulse/ui#build&quot;]
    Shared[&quot;@pulse/shared#build&quot;]
    Legacy[&quot;@pulse/legacy#build&quot;]
    Mocks[&quot;@pulse/mocks#build&quot;]
    Codemods[&quot;@pulse/codemods#build&quot;]
    Root((&quot;Root&quot;))

    Dashboard --&gt; Users
    Dashboard --&gt; Analytics
    Dashboard --&gt; UI
    Dashboard --&gt; Shared
    Users --&gt; UI
    Users --&gt; Shared
    Analytics --&gt; UI
    Analytics --&gt; Shared
    UI --&gt; Shared
    Legacy --&gt; Mocks
    Mocks --&gt; Shared
    Codemods --&gt; Shared
    Codemods --&gt; Root
    Shared --&gt; Root
</code></pre>
<h2 id="الحل">الحل</h2>
<p>إن احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة في فرع <code>05-typescript-start</code>:</p>
<pre><code class="language-bash">git checkout 05-typescript-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>بناءات مرشَّحة:</strong> شغّل <code>pnpm turbo build --filter=@pulse/analytics...</code> لبناء analytics واعتماداتها فقط. وقارن عدد المهام ببناء كامل.</li>
<li><strong>تشغيل تجريبي:</strong> شغّل <code>pnpm turbo build --dry-run=json</code> لترى بالضبط ما سينفّذه Turborepo دون تشغيل أي شيء. وافحص مخرَج JSON لفهم حساب التجزئة.</li>
<li><strong>متغيّرات البيئة:</strong> أضف متغيّر بيئة إلى مفتاح <code>env</code> في مهمة <code>build</code> داخل <code>turbo.json</code> ولاحظ أن تغيير المتغيّر يُبطل المخزن المؤقت.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>لديك الآن بناءات مخزّنة مؤقتًا وواعية بالاعتمادات. لكن TypeScript ما زال يفحص كل حزمة باستقلال — لا يوجد فحص أنواع تزايدي عبر حدود الحزم. فتغيير نوع في <code>@pulse/shared</code> يفرض إعادة فحص كاملة لكل حزمة. وفي التمرين التالي، ستضيف <code>composite: true</code> ومراجع المشاريع كي يستطيع TypeScript فحص الأنواع تزايديًا عبر الحزم.</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:o,title:p,headings:a,html:t};export{s as book,n as chapter,e as chapterTitle,c as default,a as headings,t as html,o as slug,p as title};
