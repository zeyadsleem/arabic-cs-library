const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="launch-config",o="ملف launch.json",p=[{depth:2,id:"type-مطلوب",text:"type (مطلوب)"},{depth:2,id:"request-مطلوب",text:"request (مطلوب)"},{depth:2,id:"name-مطلوب",text:"name (مطلوب)"},{depth:2,id:"program-مطلوب-غالبا-مع-launch",text:"program (مطلوب غالبًا مع launch)"},{depth:2,id:"args-اختياري",text:"args (اختياري)"},{depth:2,id:"cwd-اختياري",text:"cwd (اختياري)"},{depth:2,id:"env-اختياري",text:"env (اختياري)"},{depth:2,id:"envfile-اختياري",text:"envFile (اختياري)"},{depth:2,id:"console-اختياري",text:"console (اختياري)"},{depth:2,id:"prelaunchtask-اختياري",text:"preLaunchTask (اختياري)"},{depth:2,id:"postdebugtask-اختياري",text:"postDebugTask (اختياري)"},{depth:2,id:"sourcemaps-اختياري-لكنه-موصى-به-بشدة-مع-كثير-من-اللغات",text:"sourceMaps (اختياري، لكنه مُوصى به بشدة مع كثير من اللغات)"},{depth:2,id:"skipfiles-اختياري",text:"skipFiles (اختياري)"},{depth:2,id:"outfiles-اختياري",text:"outFiles (اختياري)"},{depth:2,id:"runtimeexecutable-اختياري",text:"runtimeExecutable (اختياري)"},{depth:2,id:"نوع-الطلب-attach-خصائص-خاصة",text:"نوع الطلب attach (خصائص خاصة)**"},{depth:2,id:"أمثلة-على-الإعدادات",text:"أمثلة على الإعدادات"},{depth:3,id:"nodejs-تشغيل",text:"Node.js (تشغيل)"},{depth:3,id:"nodejs-الإرفاق-بعملية",text:"Node.js (الإرفاق بعملية)"},{depth:3,id:"python-تشغيل",text:"Python (تشغيل)"},{depth:2,id:"chrome-تشغيل-تنقيح-javascript-على-جهة-العميل",text:"Chrome (تشغيل — تنقيح JavaScript على جهة العميل)"},{depth:2,id:"الإعدادات-المركبة",text:"الإعدادات المركّبة"},{depth:2,id:"استخدام-متغيرات-التنقيح",text:"استخدام متغيّرات التنقيح"},{depth:2,id:"إجراء-جاهزية-الخادم",text:"إجراء جاهزية الخادم"}],c=`<blockquote>
<p><strong>هل أستخدم <code>tasks.json</code> أم <code>launch.json</code> أثناء التطوير؟</strong></p>
<p>إن كان هدفك <strong>تشغيل</strong> خادم التطوير ضمن سير عملك دون تنقيح، فاضبطه في <code>tasks.json</code>. وإن كنت بحاجة إلى <strong>تنقيح</strong> خادم التطوير، فأعدّ الإعدادات اللازمة في <code>launch.json</code>. وفي الحالات التي تريد فيها تشغيل الخادم ثم إرفاق المُنقّح به، يمكنك تعريف مهمة في <code>tasks.json</code> لتشغيل الخادم وإعداد مقابل في <code>launch.json</code> لإرفاق المُنقّح بالخادم قيد التشغيل.</p>
</blockquote>
<p>لنستعرض معًا جميع الإعدادات التي يمكنك التجريب بها في <code>launch.json</code>.</p>
<p><code>launch.json</code> ملف JSON فيه خاصيتان رئيسيتان في المستوى الأعلى:</p>
<ul>
<li><strong><code>version</code>:</strong> تحدّد إصدار مخطط <code>launch.json</code>. وهي عادةً <code>&quot;0.2.0&quot;</code>. ولا تحتاج عمومًا إلى تعديلها.</li>
<li><strong><code>configurations</code>:</strong> هذه <em>مصفوفة</em> من كائنات الإعدادات. يعرّف كل كائن طريقة محدّدة لتشغيل تطبيقك أو الإرفاق به. ويمكنك أن تملك إعدادات متعدّدة لسيناريوهات مختلفة (مثل تنقيح سكربت، أو تنقيح اختبار، أو الإرفاق بعملية بعيدة).</li>
</ul>
<p>يحتوي كل كائن إعداد داخل مصفوفة <code>configurations</code> على مجموعة خصائص تتحكّم في عملية التنقيح. وهذه تفصيلات لأهمّها:</p>
<h2 id="type-مطلوب"><code>type</code> (مطلوب)</h2>
<p>تحدّد نوع المُنقّح المستخدَم. ويتحدّد ذلك عادةً عبر الإضافة التي ثبّتها للغة البرمجة التي تعمل بها.</p>
<ul>
<li><strong>القيم الشائعة:</strong> <code>&quot;node&quot;</code>: لتنقيح Node.js. و<code>&quot;python&quot;</code>: لتنقيح Python (يتطلّب إضافة Python). و<code>&quot;go&quot;</code>: لتنقيح Go (يتطلّب إضافة Go). و<code>&quot;java&quot;</code>: لتنقيح Java (يتطلّب إضافة مُنقّح Java). و<code>&quot;chrome&quot;</code>: لتنقيح JavaScript على جهة العميل في Chrome. و<code>&quot;pwa-chrome&quot;</code>: إصدار أحدث من مُنقّح Chrome (مُوصى به)، و«pwa» اختصار لـ Progressive Web App. و<code>&quot;pwa-node&quot;</code>: مُنقّح أحدث لـ Node.js. و<code>&quot;cppdbg&quot;</code>: لتنقيح C/C++ (يتطلّب إضافة مُنقّح C/C++). و<code>&quot;lldb&quot;</code>: يستخدم مُنقّح LLDB (ويُستخدم غالبًا مع C/C++ وRust). و<code>&quot;coreclr&quot;</code>: لتنقيح تطبيقات .NET Core.
<ul>
<li><code>&quot;node&quot;</code>: لتنقيح Node.js.</li>
<li><code>&quot;python&quot;</code>: لتنقيح Python (يتطلّب إضافة Python).</li>
<li><code>&quot;go&quot;</code>: لتنقيح Go (يتطلّب إضافة Go).</li>
<li><code>&quot;java&quot;</code>: لتنقيح Java (يتطلّب إضافة مُنقّح Java).</li>
<li><code>&quot;chrome&quot;</code>: لتنقيح JavaScript على جهة العميل في Chrome.</li>
<li><code>&quot;pwa-chrome&quot;</code>: إصدار أحدث من مُنقّح Chrome (مُوصى به)، و«pwa» اختصار لـ Progressive Web App.</li>
<li><code>&quot;pwa-node&quot;</code>: مُنقّح أحدث لـ Node.js</li>
<li><code>&quot;cppdbg&quot;</code>: لتنقيح C/C++ (يتطلّب إضافة مُنقّح C/C++).</li>
<li><code>&quot;lldb&quot;</code>: يستخدم مُنقّح LLDB (ويُستخدم غالبًا مع C/C++ وRust).</li>
<li><code>&quot;coreclr&quot;</code>: لتنقيح تطبيقات .NET Core.</li>
</ul>
</li>
</ul>
<pre><code class="language-json"><span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span>
</code></pre>
<h2 id="request-مطلوب"><code>request</code> (مطلوب)</h2>
<p>تحدّد ما إذا كان Visual Studio Code سـ<em>يشغّل</em> عملية جديدة أم <em>سيرفق</em> بعملية قائمة قيد التشغيل.</p>
<ul>
<li><code>&quot;launch&quot;</code>: يبدأ Visual Studio Code تشغيل التطبيق في وضع التنقيح. وهذا هو الإعداد الأكثر شيوعًا.</li>
<li><code>&quot;attach&quot;</code>: يتّصل Visual Studio Code بعملية قيد التشغيل بالفعل. وهذا مفيد لتنقيح الخوادم، أو العمليات طويلة الأمد، أو التطبيقات التي تعمل داخل حاويات.</li>
</ul>
<pre><code class="language-json"><span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span> <span class="hljs-comment">// Or &quot;attach&quot;</span>
</code></pre>
<h2 id="name-مطلوب"><code>name</code> (مطلوب)</h2>
<p>اسم ودّي لهذا الإعداد. ويظهر هذا الاسم في القائمة المنسدلة في عرض Debug، ليتيح لك اختيار الإعداد الذي تريد تشغيله. فاختر أسماءً وصفية!</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Run Main Script&quot;</span>
</code></pre>
<h2 id="program-مطلوب-غالبا-مع-launch"><code>program</code> (مطلوب غالبًا مع <code>launch</code>)</h2>
<p>يحدّد <em>نقطة الدخول</em> لتطبيقك — أي الملف الذي ينبغي أن يشغّله Visual Studio Code عند بدء التنقيح. وهو عادةً مسار نسبي من جذر مساحة العمل.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/src/index.js&quot;</span>
</code></pre>
<p><strong>ملاحظة:</strong> متغيّر <code>\${workspaceFolder}</code> يُحلّ تلقائيًا إلى الدليل الجذر لمشروعك.</p>
<h2 id="args-اختياري"><code>args</code> (اختياري)</h2>
<p>مصفوفة من الوسائط النصية التي تُمرَّر إلى تطبيقك عند تشغيله. وهي الوسائط نفسها التي كنت ستقدّمها على سطر الأوامر.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;--config&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;config.json&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;--verbose&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<h2 id="cwd-اختياري"><code>cwd</code> (اختياري)</h2>
<p>يحدّد <em>دليل العمل الحالي</em> لتطبيقك عند تشغيله. وإن لم يُحدَّد، فالقيمة الافتراضية هي <code>\${workspaceFolder}</code>. وهذا مهم إذا كان تطبيقك يعتمد على مسارات نسبية للوصول إلى الملفات.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;cwd&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/data&quot;</span>
</code></pre>
<h2 id="env-اختياري"><code>env</code> (اختياري)</h2>
<p>كائن يعرّف <em>متغيّرات البيئة</em> التي تُضبط لعملية تطبيقك. وهذا بالغ الأهمية لضبط سلوك تطبيقك أثناء التنقيح.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;NODE_ENV&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;development&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;mongodb://localhost:27017/mydb&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="envfile-اختياري"><code>envFile</code> (اختياري)</h2>
<p>يحدّد مسار ملف <code>.env</code> لتحميل متغيّرات البيئة من ملف.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;envFile&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/.env&quot;</span>
</code></pre>
<h2 id="console-اختياري"><code>console</code> (اختياري)</h2>
<p>يحدّد أين يظهر مخرَج تطبيقك (مثل عبارات <code>console.log</code>).</p>
<ul>
<li><strong>القيم:</strong> <code>&quot;integratedTerminal&quot;</code> (مُوصى به): يظهر المخرَج في الطرفية المدمجة في Visual Studio Code، وهذا يمنح أفضل تجربة، بما في ذلك دعم الألوان والإدخال التفاعلي. و<code>&quot;internalConsole&quot;</code>: يظهر المخرَج في وحدة تحكّم التنقيح (Debug Console) في Visual Studio Code، وهي أقل مرونة من الطرفية المدمجة. و<code>&quot;externalTerminal&quot;</code>: يفتح نافذة طرفية خارجية. استخدم هذا الخيار إذا كان تطبيقك يتطلّب طرفية محدّدة أو إذا واجهت مشكلات مع الطرفية المدمجة.
<ul>
<li><code>&quot;integratedTerminal&quot;</code> (مُوصى به): يظهر المخرَج في الطرفية المدمجة في Visual Studio Code، وهذا يمنح أفضل تجربة، بما في ذلك دعم الألوان والإدخال التفاعلي.</li>
<li><code>&quot;internalConsole&quot;</code>: يظهر المخرَج في وحدة تحكّم التنقيح (Debug Console) في Visual Studio Code، وهي أقل مرونة من الطرفية المدمجة.</li>
<li><code>&quot;externalTerminal&quot;</code>: يفتح نافذة طرفية خارجية. استخدم هذا الخيار إذا كان تطبيقك يتطلّب طرفية محدّدة أو إذا واجهت مشكلات مع الطرفية المدمجة.</li>
</ul>
</li>
</ul>
<pre><code class="language-json"><span class="hljs-attr">&quot;console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integratedTerminal&quot;</span>
</code></pre>
<h2 id="prelaunchtask-اختياري"><code>preLaunchTask</code> (اختياري)</h2>
<p>يحدّد اسم مهمة في Visual Studio Code (معرّفة في <code>tasks.json</code>) تُنفَّذ <em>قبل</em> بدء المُنقّح. وهذا مفيد جدًا لأتمتة خطوات البناء، أو ترجمة الشيفرة، أو تشغيل الخدمات التي يعتمد عليها التطبيق.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;preLaunchTask&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span> <span class="hljs-comment">// Runs the &quot;build&quot; task from tasks.json</span>
</code></pre>
<ul>
<li><strong>ملاحظة:</strong> يجب أن تكون لديك مهمة مقابلة معرّفة في ملف <code>.vscode/tasks.json</code>.</li>
</ul>
<h2 id="postdebugtask-اختياري"><code>postDebugTask</code> (اختياري)</h2>
<p>يشبه <code>preLaunchTask</code>، لكنه ينفّذ مهمة <em>بعد</em> انتهاء جلسة التنقيح. ويمكن استخدامه للتنظيف، أو إيقاف الخدمات، وما إلى ذلك.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;postDebugTask&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;stop-server&quot;</span>
</code></pre>
<h2 id="sourcemaps-اختياري-لكنه-موصى-به-بشدة-مع-كثير-من-اللغات"><code>sourceMaps</code> (اختياري، لكنه <em>مُوصى به بشدة</em> مع كثير من اللغات)</h2>
<p>يتحكّم في ما إذا كان Visual Studio Code يستخدم <em>خرائط المصدر</em> (source maps) للربط بين شيفرتك المصدرية والشيفرة التي تُنفَّذ فعليًا. وخرائط المصدر <em>ضرورية</em> لتنقيح اللغات التي تُترجَم أو تُحوَّل (مثل TypeScript، وJavaScript مع Babel، وSass، وغيرها). فعند ترجمة TypeScript إلى JavaScript، يمكن للمترجم أن يُنشئ ملف <code>.js.map</code> (وهو خريطة المصدر) إلى جانب ملف <code>.js</code>. وتخبر هذه الخريطة المُنقّح كيف يربط أسطر الشيفرة في JavaScript المترجَمة بشيفرة TypeScript الأصلية.</p>
<ul>
<li><code>true</code>: تمكين دعم خرائط المصدر (وهو الافتراضي في كثير من الإعدادات).</li>
<li><code>false</code>: تعطيل دعم خرائط المصدر.</li>
</ul>
<pre><code class="language-json"><span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
</code></pre>
<h2 id="skipfiles-اختياري"><code>skipFiles</code> (اختياري)</h2>
<p>مصفوفة من أنماط glob تحدّد الملفات أو المجلدات التي ينبغي أن <em>يتخطّاها</em> المُنقّح عند التقدّم سطرًا بسطر في الشيفرة. وهذا مفيد للغاية لتجنّب الدخول إلى شيفرة المكتبات (مثل وحدات Node.js الأساسية أو مكتبات الطرف الثالث).</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;skipFiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;&lt;node_internals&gt;/**&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;\${workspaceFolder}/node_modules/**&quot;</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>النمط <code>&quot;&lt;node_internals&gt;/**&quot;</code> نمط خاص يطابق الملفات الداخلية في Node.js.</p>
<h2 id="outfiles-اختياري"><code>outFiles</code> (اختياري)</h2>
<p>مصفوفة من أنماط glob تخبر المُنقّح بمكان الملفات <em>المُولَّدة</em> (مثل ملفات JavaScript المترجَمة من TypeScript). ويُستخدم هذا غالبًا مع <code>sourceMaps</code>.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;outFiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;\${workspaceFolder}/dist/**/*.js&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<p><strong>ملاحظة:</strong> كثيرًا ما تضبط إضافات اللغات خاصية <code>outFiles</code> تلقائيًا استنادًا إلى إعدادات مشروعك (مثل <code>tsconfig.json</code> في TypeScript).</p>
<h2 id="runtimeexecutable-اختياري"><code>runtimeExecutable</code> (اختياري)</h2>
<p>يحدّد المسار المطلق إلى ملف تنفيذي ينبغي استخدامه. فمثلًا، إذا احتجت إلى استخدام إصدار محدّد من Node.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;runtimeExecutable&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/Users/me/.nvm/versions/node/v16.14.0/bin/node&quot;</span>
</code></pre>
<h2 id="نوع-الطلب-attach-خصائص-خاصة">نوع الطلب <code>attach</code> (خصائص خاصة)**</h2>
<p>عند استخدام <code>request: &quot;attach&quot;</code>، تختلف بعض الخصائص أو يتغيّر معناها:</p>
<ul>
<li><strong><code>processId</code> (اختياري):</strong> معرّف العملية التي تريد الإرفاق بها. ويمكنك استخدام <code>\${command:pickProcess}</code> ليجعلك Visual Studio Code تختار من قائمة العمليات قيد التشغيل.</li>
<li><strong><code>port</code> (مطلوب غالبًا مع <code>attach</code>):</strong> رقم المنفذ الذي تتّصل به عند الإرفاق بمُنقّح بعيد.</li>
<li><strong><code>address</code> (اختياري):</strong> اسم المضيف أو عنوان IP للجهاز البعيد (للتنقيح عن بُعد).</li>
<li><strong><code>restart</code> (اختياري):</strong> إذا ضُبط على <code>true</code>، سيعيد Visual Studio Code تشغيل جلسة التنقيح تلقائيًا إذا انتهت العملية المرفوع إليها.</li>
<li><strong><code>localRoot</code> (اختياري):</strong> جذر المصدر المحلي للتنقيح عن بُعد. ويساعد هذا Visual Studio Code في العثور على ملفات المصدر إذا كانت المسارات على الجهاز البعيد مختلفة.</li>
<li><strong><code>remoteRoot</code> (اختياري):</strong> جذر المصدر البعيد للتنقيح عن بُعد.</li>
</ul>
<h2 id="أمثلة-على-الإعدادات">أمثلة على الإعدادات</h2>
<p>فيما يلي بعض إعدادات <code>launch.json</code> الشائعة لسيناريوهات مختلفة:</p>
<h3 id="nodejs-تشغيل">Node.js (تشغيل)</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pwa-node&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Launch Node.js App&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/src/index.js&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integratedTerminal&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;skipFiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;&lt;node_internals&gt;/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;preLaunchTask&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span> <span class="hljs-comment">// Assuming you have a &quot;build&quot; task</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="nodejs-الإرفاق-بعملية">Node.js (الإرفاق بعملية)</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pwa-node&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;attach&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Attach to Process&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;processId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${command:pickProcess}&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;skipFiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;&lt;node_internals&gt;/**&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="python-تشغيل">Python (تشغيل)</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;python&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Run Python Script&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/main.py&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integratedTerminal&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="chrome-تشغيل-تنقيح-javascript-على-جهة-العميل">Chrome (تشغيل — تنقيح JavaScript على جهة العميل)</h2>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pwa-chrome&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Launch Chrome against localhost&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://localhost:8080&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// URL of your web app</span>
      <span class="hljs-attr">&quot;webRoot&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/src&quot;</span> <span class="hljs-comment">// Path to your web app&#x27;s source files</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="الإعدادات-المركبة">الإعدادات المركّبة</h2>
<p>تتيح لك الإعدادات المركّبة تشغيل عدّة إعدادات تنقيح في آنٍ واحد. وهذا مفيد بشكل خاص في السيناريوهات المعقّدة، مثل تشغيل خادم للجهة الخلفية وتطبيق للجهة الأمامية في الوقت نفسه. وتعريف الإعداد المركّب يكون بإضافة مصفوفة <code>compounds</code> في جذر ملف <code>launch.json</code>. ويحدّد كل إعداد مركّب اسمًا ومصفوفة من الإعدادات التي تُشغَّل معًا.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;compounds&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Full Stack Debug&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Launch Node.js App&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Launch Chrome against localhost&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<blockquote>
<p><strong>استخدم الإعدادات المركّبة لتبسيط سير عمل تنقيح العمليات المتعدّدة من دون الحاجة إلى تشغيل كل إعداد يدويًا.</strong></p>
</blockquote>
<h2 id="استخدام-متغيرات-التنقيح">استخدام متغيّرات التنقيح</h2>
<p>يدعم Visual Studio Code مجموعة من المتغيّرات المعرّفة مسبقًا داخل <code>launch.json</code>، مثل <code>\${workspaceFolder}</code> و<code>\${file}</code> و<code>\${env:VARIABLE_NAME}</code>. وتتيح لك هذه المتغيّرات كتابة إعدادات ديناميكية تتلاءم مع بيئتك. فمثلًا، يُحلّ <code>\${workspaceFolder}</code> دائمًا إلى جذر مشروعك، مما يجعل إعدادك قابلًا للنقل بين الأجهزة المختلفة.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;program&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}/src/index.js&quot;</span>
</code></pre>
<blockquote>
<p><strong>استفد من هذه المتغيّرات لإنشاء إعدادات تشغيل مرنة تتكيّف تلقائيًا مع تغيّرات بنية مساحة عملك.</strong></p>
</blockquote>
<h2 id="إجراء-جاهزية-الخادم">إجراء جاهزية الخادم</h2>
<p>عند تنقيح تطبيقات الويب، يلزمك غالبًا انتظار أن يصبح خادم التطوير جاهزًا للعمل بالكامل قبل إرفاق المُنقّح. وتتيح لك خاصية <code>serverReadyAction</code> تحديد نمط تراقبه في المخرَج. وما إن يُكتشف النمط حتى يمكن لـ VS Code أن يفتح عنوان URL تلقائيًا أو يرفق المُنقّح.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;serverReadyAction&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openExternally&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;listening on port ([0-9]+)&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;uriFormat&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://localhost:%s&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>استخدم <code>serverReadyAction</code> لأتمتة انتظار جاهزية خادمك، مما يقلّل الخطوات اليدوية ويبسّط سير عمل التنقيح لديك.</strong></p>
</blockquote>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,c as html,t as slug,o as title};
