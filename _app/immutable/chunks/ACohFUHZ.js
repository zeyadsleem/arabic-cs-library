const n="kinney",s="openclaw",t="OpenClaw: مساعدك الذكي الشخصي",a="connecting-a-remote-node",o="الاتصال بـ OpenClaw البعيد بوصفه عقدة مقترنة",e=[{depth:2,id:"قبل-أن-تبدأ",text:"قبل أن تبدأ"},{depth:2,id:"الخطوة-1-تأكد-من-أن-البوابة-سليمة-وخاصة",text:"الخطوة 1: تأكد من أن البوابة سليمة وخاصة"},{depth:2,id:"الخطوة-2-اضبط-سياسة-تنفيذ-على-جهاز-mac-أولا",text:"الخطوة 2: اضبط سياسة تنفيذ على جهاز Mac أولًا"},{depth:2,id:"الخطوة-3-اختر-كيف-توصل-جهاز-mac",text:"الخطوة 3: اختر كيف توصل جهاز Mac"},{depth:3,id:"الخيار-أ-تطبيق-macos",text:"الخيار أ: تطبيق macOS"},{depth:3,id:"الخيار-ب-عقدة-بلا-واجهة",text:"الخيار ب: عقدة بلا واجهة"},{depth:2,id:"الخطوة-4-وافق-على-العقدة",text:"الخطوة 4: وافق على العقدة"},{depth:2,id:"الخطوة-5-تحقق-من-الاتصال",text:"الخطوة 5: تحقق من الاتصال"},{depth:2,id:"الخطوة-6-أرسل-العمل-إلى-العقدة-عن-قصد",text:"الخطوة 6: أرسل العمل إلى العقدة عن قصد"},{depth:2,id:"الخطوة-7-شغل-اختبار-قبول",text:"الخطوة 7: شغّل اختبار قبول"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"إزالة-عقدة",text:"إزالة عقدة"}],l=`<p>حتى الآن، كان كل شيء يعمل على جهاز واحد. والخطوة التالية الشائعة هي وضع <strong>البوابة (Gateway)</strong> على خادم يعمل دائمًا، وإبقاء جهاز Mac لديك <strong>عقدة (node)</strong>: جهاز يتصل <em>بالبوابة</em> ويقدّم لها قدرات يجب أن تحدث على جهاز Mac، مثل تشغيل أمر، أو قيادة متصفح، أو التقاط لقطة شاشة.</p>
<p>ويبدو هذا التقسيم هكذا:</p>
<ul>
<li><strong>البوابة هي المنسّق.</strong> فهي تستقبل رسائل القنوات، وتشغّل الوكيل، وتتحدث إلى مزوّد النموذج لديك، وتملك الجلسات وبيانات الاعتماد والحالة.</li>
<li><strong>العقدة هي مقدّم القدرات.</strong> فهي ليست بوابة ثانية ولا مساعدًا مستقلًا. («العقدة» هنا دور في OpenClaw، ولا علاقة له ببيئة تشغيل Node.js.)</li>
</ul>
<p>يفتح جهاز Mac اتصال WebSocket صادرًا إلى البوابة، وهذا الاتصال الواحد يحمل الحركة في الاتجاهين معًا. وهذا يعني أن حاسوبك المحمول لا يحتاج أبدًا إلى كشف خادم أوامر على الإنترنت.</p>
<blockquote>
<p><strong>الاقتران يوسّع نطاق وصول البوابة إلى جهاز Mac</strong></p>
<p>بعد الموافقة على عقدة، تستطيع بوابة مخترقة أن تطلب منها فعل كل ما سمحت به. فوضع البوابة على خادم يحسّن التوفّر، لكنه لا يحمي جهاز Mac. أبقِ مجموعة القدرات الموافَق عليها صغيرة.</p>
</blockquote>
<h2 id="قبل-أن-تبدأ">قبل أن تبدأ</h2>
<p>ستحتاج إلى:</p>
<ul>
<li>بوابة بعيدة تعمل بالفعل، والمصادقة مفعّلة عليها.</li>
<li>طريقة خاصة للوصول إليها. يفترض هذا الدرس استخدام Tailscale Serve، مع تسجيل دخول جهاز Mac لديك إلى شبكة tailnet نفسها. وإن لم تكن قد أعددت ذلك، فابدأ بـ <a href="https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale">الاتصال بـ OpenClaw بأمان عبر Tailscale</a>. ونفق SSH يعمل أيضًا، وهناك ملاحظة عنه في الخطوة 3.</li>
<li>بيانات اعتماد البوابة (رمز أو كلمة مرور) التي أعددتها حين نشرتها.</li>
</ul>
<p>افصل بين ثلاثة أسئلة، لأن النجاح في أحدها لا يجيب عن الآخرين:</p>
<table>
<thead>
<tr>
<th>السؤال</th>
<th>الطبقة</th>
</tr>
</thead>
<tbody>
<tr>
<td>هل يستطيع جهاز Mac هذا الوصول إلى البوابة؟</td>
<td>الوصول إلى الشبكة</td>
</tr>
<tr>
<td>هل يُسمح لهذا الجهاز بالاتصال؟</td>
<td>المصادقة</td>
</tr>
<tr>
<td>ما الذي يُسمح له بفعله فعليًا؟</td>
<td>سياسة الأدوات والتنفيذ</td>
</tr>
</tbody>
</table>
<h2 id="الخطوة-1-تأكد-من-أن-البوابة-سليمة-وخاصة">الخطوة 1: تأكد من أن البوابة سليمة وخاصة</h2>
<p>على الجهاز الذي يشغّل البوابة، تحقق من أنها تعمل وتستمع على الواجهة المحلية (loopback) فقط، وأن Tailscale Serve ينشرها بشكل خاص:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> gateway.bind loopback
openclaw config <span class="hljs-built_in">set</span> gateway.tailscale.mode serve
openclaw gateway restart
openclaw gateway status
tailscale serve status
</code></pre>
<p>يبقى مستمع البوابة العادي على <code>127.0.0.1:18789</code>، وينشر Serve بروتوكول HTTPS على المنفذ 443. لا تفتح المنفذ 18789 على الإنترنت العام كي يتصل جهاز Mac؛ فإبقاء ذلك المستمع خاصًا هو جوهر الأمر.</p>
<p>استخدم <code>serve</code> لا <code>funnel</code>. فـ Funnel يجعل نقطة النهاية عامة، وهذا هو الخيار الخاطئ هنا.</p>
<p>ينبغي أن يعرض <code>tailscale serve status</code> اسم مضيف يشبه هذا. وستستخدمه بعد قليل.</p>
<pre><code>https://gateway-host.your-tailnet.ts.net
</code></pre>
<h2 id="الخطوة-2-اضبط-سياسة-تنفيذ-على-جهاز-mac-أولا">الخطوة 2: اضبط سياسة تنفيذ على جهاز Mac أولًا</h2>
<p><strong>افعل هذا قبل الاقتران.</strong> فبشكل افتراضي، تكون موافقات التنفيذ المحلية للعقدة مضبوطة على <code>full</code> مع إيقاف <code>ask</code>. والعقدة التي تتصل قبل كتابة سياستها ستشغّل الأوامر دون سؤال.</p>
<p>على جهاز Mac، طبّق سياسة بداية متحفظة:</p>
<pre><code class="language-bash">openclaw approvals <span class="hljs-built_in">set</span> --stdin &lt;&lt;<span class="hljs-string">&#x27;JSON&#x27;</span>
{
  <span class="hljs-string">&quot;version&quot;</span>: 1,
  <span class="hljs-string">&quot;defaults&quot;</span>: {
    <span class="hljs-string">&quot;security&quot;</span>: <span class="hljs-string">&quot;allowlist&quot;</span>,
    <span class="hljs-string">&quot;ask&quot;</span>: <span class="hljs-string">&quot;always&quot;</span>,
    <span class="hljs-string">&quot;askFallback&quot;</span>: <span class="hljs-string">&quot;deny&quot;</span>,
    <span class="hljs-string">&quot;autoAllowSkills&quot;</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-string">&quot;agents&quot;</span>: {}
}
JSON
</code></pre>
<p>ثم اقرأها مرة أخرى لتتأكد من أنها سُجّلت:</p>
<pre><code class="language-bash">openclaw approvals get
</code></pre>
<p>أمور قليلة يجدر معرفتها:</p>
<ul>
<li>من دون علم هدف، يقرأ <code>approvals</code> المستند <strong>المحلي</strong> ويكتب فيه، وهذا ما تريده على جهاز Mac.</li>
<li><code>set</code> <strong>يستبدل</strong> المستند كله. فعلى جهاز لديه قواعد بالفعل، شغّل <code>openclaw approvals get</code> أولًا واحفظ ما هو موجود.</li>
<li>سياسة الموافقات ليست صندوقًا رمليًا لنظام الملفات. فالأمر الموافَق عليه يعمل بكل ما يملكه حساب macOS لديك من وصول.</li>
<li>لمعرفة معاني <code>security</code> و<code>ask</code> و<code>askFallback</code>، وكيف تصل إليك الموافقات، راجع <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#layer-3-exec-approvals">الأمان والموافقات</a>.</li>
</ul>
<h2 id="الخطوة-3-اختر-كيف-توصل-جهاز-mac">الخطوة 3: اختر كيف توصل جهاز Mac</h2>
<p>اختر <strong>واحدًا</strong> من هذه. فتطبيق سطح المكتب يتضمّن بيئة تشغيل العقدة أصلًا، لذا فإن تشغيل عقدة منفصلة بلا واجهة إلى جانبه يمنح جهازًا واحدًا هويتين.</p>
<ul>
<li><strong>تطبيق macOS</strong> هو الخيار الأفضل حين تريد ميزات أصلية مثل الإشعارات أو التقاط الشاشة أو التحكم بالحاسوب إلى جانب تنفيذ الأوامر.</li>
<li><strong>عقدة بلا واجهة</strong> هي الخيار الأفضل لجهاز ليس فيه جلسة سطح مكتب.</li>
</ul>
<blockquote>
<p><strong>استخدام نفق SSH بدل Tailscale</strong></p>
<p>إن كنت تفضّل إنشاء نفق إلى بوابة مرتبطة بالواجهة المحلية، فوجّه منفذًا محليًا على جهاز Mac إليها، ثم اتصل بذلك المنفذ الموجّه بدل اسم مضيف Tailscale:</p>
<pre><code class="language-bash">ssh -N -o ExitOnForwardFailure=<span class="hljs-built_in">yes</span> \\
  -L 127.0.0.1:18790:127.0.0.1:18789 \\
  openclaw@gateway-host
</code></pre>
</blockquote>
<h3 id="الخيار-أ-تطبيق-macos">الخيار أ: تطبيق macOS</h3>
<ol>
<li>افتح تطبيق OpenClaw وانتقل إلى <strong>الإعدادات → الاتصال</strong>.</li>
<li>اختر <strong>بعيد (مضيف آخر)</strong>.</li>
<li>اختر <strong>مباشر (ws/wss)</strong>.</li>
<li>أدخل عنوان البوابة لديك، مستخدمًا <code>wss://</code>: <code>wss://gateway-host.your-tailnet.ts.net</code></li>
<li>أدخل بيانات اعتماد البوابة.</li>
<li>شغّل اختبار الاتصال.</li>
</ol>
<p>استخدم <strong>الاتصال البعيد الأساسي</strong> لعلاقة العقدة. أما إضافة لوحة تحكم محفوظة للبوابة فأمر مختلف؛ فهي تحفظ واجهة التحكم (Control UI) في المفضلة فقط ولا تجعل جهاز Mac عقدة.</p>
<h3 id="الخيار-ب-عقدة-بلا-واجهة">الخيار ب: عقدة بلا واجهة</h3>
<ol>
<li>ثبّت أداة سطر الأوامر (CLI) دون تشغيل التهيئة الأولية. فأنت تثبّت مضيف عقدة، لا بوابة ثانية: <code><span class="line"><span style="color:#82AAFF;font-style:italic">curl</span><span style="color:#82AAFF"> -fsSL</span><span style="color:#82AAFF"> -o</span><span style="color:#ECC48D"> openclaw-install.sh</span><span style="color:#ECC48D"> https://openclaw.ai/install.sh</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">less</span><span style="color:#ECC48D"> openclaw-install.sh</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">bash</span><span style="color:#ECC48D"> openclaw-install.sh</span><span style="color:#82AAFF"> --no-onboard</span></span></code></li>
<li>في صفحة <strong>الأجهزة (Devices)</strong> في البوابة (<strong>الإعدادات → الأجهزة</strong> في واجهة التحكم)، أنشئ رابط إعداد. يبدو مثل <code>oc-pair://&lt;setup-code&gt;</code>. تحذير: تعامل مع رابط الإعداد كأنه كلمة مرور. لا تلصقه في الدردشة ولا تُدرجه في أي commit.</li>
<li>شغّل العقدة في الواجهة الأمامية باستخدام ذلك الرابط: <code><span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> node</span><span style="color:#ECC48D"> run</span><span style="color:#82AAFF"> --pair</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">oc-pair://&lt;setup-code&gt;</span><span style="color:#D9F5DD">&quot;</span><span style="color:#82AAFF"> --display-name</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">MacBook</span><span style="color:#D9F5DD">&quot;</span></span></code></li>
<li>بعد أن ينجح اتصال الواجهة الأمامية، ثبّتها كخدمة في الخلفية. استخدم اسم المضيف والمنفذ وإعدادات TLS نفسها لتطابق الاتصال المحفوظ: <code><span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> node</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --host</span><span style="color:#ECC48D"> gateway-host.your-tailnet.ts.net</span><span style="color:#82AAFF"> --port</span><span style="color:#F78C6C"> 443</span><span style="color:#82AAFF"> --tls</span><span style="color:#82AAFF"> --display-name</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">MacBook</span><span style="color:#D9F5DD">&quot;</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> node</span><span style="color:#ECC48D"> start</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> node</span><span style="color:#ECC48D"> status</span></span></code></li>
</ol>
<p>اترك <code>--commands</code> معطّلًا في الوقت الحالي. فهو يضيّق مجموعة الأوامر المعلنة، لكنه يعطّل أيضًا نشر المهارات وأدوات الإضافات وخوادم MCP واستخدام الحاسوب واستضافة العمال.</p>
<h2 id="الخطوة-4-وافق-على-العقدة">الخطوة 4: وافق على العقدة</h2>
<p>الاتصال ليس كالثقة. فهناك موافقتان منفصلتان:</p>
<table>
<thead>
<tr>
<th>الموافقة</th>
<th>ما تقرره</th>
</tr>
</thead>
<tbody>
<tr>
<td>موافقة الجهاز</td>
<td>هل يُسمح لهوية هذا الجهاز بالاتصال أصلًا؟</td>
</tr>
<tr>
<td>موافقة الأوامر</td>
<td>أي القدرات المعلنة يُسمح لها بتقديمها؟</td>
</tr>
</tbody>
</table>
<p>حين تطلب العقدة قدراتها، سترى مطالبة مثل هذه.</p>
<p><img src="/arabic-cs-library/images/kinney/ca7384a348b9f784.webp" alt="مطالبة «السماح بقدرات هذه العقدة» التي تسرد اسم العقدة والوصول المطلوب والقدرات والأوامر، مع أزرار «ليس الآن» و«رفض» و«الموافقة على العقدة»"></p>
<p>اقرأها قبل أن تنقر أي شيء:</p>
<ul>
<li><strong>اسم العقدة ونظامها</strong> في الأعلى ينبغي أن يطابقا الجهاز الذي قصدت اقترانه.</li>
<li><strong>الوصول المطلوب</strong> هو العنوان الأبرز. و«يستطيع تشغيل أوامر النظام» هو الأهم، وهو سبب مجيء الخطوة 2 أولًا.</li>
<li><strong>قائمة القدرات</strong> (اللوحة، والتقاط الشاشة، والمتصفح، ونقل الملفات، وMCP، وما إلى ذلك) هي ما تطلبه العقدة <em>لتقديمه</em>.</li>
<li><strong>قائمة الأوامر</strong> في الأسفل هي المجموعة الدقيقة من العمليات التي تعلنها.</li>
</ul>
<p>هذه ادعاءات، لا منح. فالقدرة لا تعمل إلا عند تقاطع ما تعلنه العقدة، وما توافق عليه أنت، وسياسة البوابة، وسياسة التنفيذ المحلية لديك، وما يسمح به macOS. اختر <strong>الموافقة على العقدة</strong> للمتابعة، أو <strong>رفض</strong> إذا أردت الرفض، أو <strong>ليس الآن</strong> للبت لاحقًا.</p>
<p>يمكنك فعل الشيء نفسه من سطر أوامر البوابة. فمعرّفا الطلب مختلفان، لذا انسخ المعرّف الصحيح في كل مرة:</p>
<pre><code class="language-bash">openclaw devices list
openclaw devices approve <span class="hljs-string">&quot;&lt;device-request-id&gt;&quot;</span>
<span class="hljs-comment"># reconnect the node, then:</span>
openclaw nodes pending
openclaw nodes approve <span class="hljs-string">&quot;&lt;node-request-id&gt;&quot;</span>
</code></pre>
<p>بعض مسارات التسجيل توافق على المرحلتين نيابة عنك، فلا تتفاجأ إن رأيت مطالبة واحدة فقط. وإن طلبت العقدة لاحقًا قدرات إضافية، فتوقع أن يُطلب منك الموافقة مرة أخرى.</p>
<h2 id="الخطوة-5-تحقق-من-الاتصال">الخطوة 5: تحقق من الاتصال</h2>
<p>على البوابة، تأكد من أن العقدة متصلة، وانظر فيما وُوفق عليه:</p>
<pre><code class="language-bash">openclaw nodes status
openclaw nodes describe --node <span class="hljs-string">&quot;&lt;node-id&gt;&quot;</span>
</code></pre>
<p>حين تشير إلى عقدة في الإعدادات، استخدم <strong>معرّف العقدة (node ID)</strong> لا اسمها المعروض.</p>
<p>تعرض واجهة التحكم الصورة نفسها تحت <strong>الإعدادات → الأجهزة</strong>: كل جهاز مقترن، وما إذا كان متصلًا، والقدرات التي تقدّمها العقدة. وزر <strong>اقتران جهاز</strong> في أعلى تلك الصفحة هو نقطة بدء الاقترانات الجديدة.</p>
<p><img src="/arabic-cs-library/images/kinney/4a7a797fb91997f3.webp" alt="أعلى صفحة الأجهزة في إعدادات OpenClaw، مع عدد الأجهزة المقترنة وزر اقتران جهاز"></p>
<p>ثم تحقق من أن جهاز Mac يملك الأدوات التي تتوقعها. فهذا يبحث عن الملفات التنفيذية دون تشغيلها:</p>
<pre><code class="language-bash">openclaw nodes invoke --node <span class="hljs-string">&quot;&lt;node-id&gt;&quot;</span> --<span class="hljs-built_in">command</span> system.which \\
  --params <span class="hljs-string">&#x27;{&quot;bins&quot;:[&quot;git&quot;,&quot;node&quot;,&quot;bun&quot;]}&#x27;</span>
</code></pre>
<p>إن اخترت التطبيق وأردت ميزات أصلية، فسيطلب macOS أيضًا أذوناته الخاصة لميزات مثل التقاط الشاشة. امنح فقط ما تنوي استخدامه. فالاتصال السليم لا يقول شيئًا عن مدى توفّر تلك الميزات.</p>
<h2 id="الخطوة-6-أرسل-العمل-إلى-العقدة-عن-قصد">الخطوة 6: أرسل العمل إلى العقدة عن قصد</h2>
<p>اقتران عقدة <strong>لا</strong> يرسل الأوامر إليها. فبشكل افتراضي، لن يختار <code>host=auto</code> العقدة نيابة عنك. لتشغيل شيء على جهاز Mac، صرّح بذلك:</p>
<pre><code>/exec host=node security=allowlist node=&lt;node-id&gt;
</code></pre>
<p>لجعل العقدة الافتراضية لجلسة ما، اضبط <code>tools.exec.host=node</code>. وإن كان بإمكان أكثر من عقدة تشغيل الأوامر، فاختر هدفًا لكل نداء أو اربط التنفيذ بعقدة واحدة.</p>
<p>الهدف غير المتصل <strong>يُرفض ولا يُعاد توجيهه</strong>. فإن كان جهاز Mac لديك نائمًا، يفشل الأمر بدلًا من أن يعمل بهدوء على الخادم. وهذا ما تريده.</p>
<blockquote>
<p><strong>هل تريد وكيل برمجة على جهاز Mac لديك؟</strong></p>
<p>العقدة المقترنة لا تجعل ACP يعمل عليها. فأُطر ACP تعمل على مضيف البوابة. أما Codex الأصلي فيستطيع استخدام عقدة، ويغطي <a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin#acp-and-mac-nodes">ACP وعقد Mac</a> ما ينجح وما لا ينجح.</p>
</blockquote>
<h2 id="الخطوة-7-شغل-اختبار-قبول">الخطوة 7: شغّل اختبار قبول</h2>
<p>فحص الاتصال لا يكفي. أثبت أن نمط الفشل يعمل أيضًا:</p>
<ol>
<li>اطلب من الوكيل شيئًا يحتاج إلى جهاز Mac، مثل سرد مجلد على حاسوبك المحمول. ينبغي أن ينجح.</li>
<li>افصل جهاز Mac عن قصد: أغلق التطبيق، أو أوقف خدمة العقدة، أو أطفئ Tailscale.</li>
<li>اطلب مهمة تحتاج إلى البوابة وحدها. ينبغي أن تعمل رغم ذلك.</li>
<li>اطلب مهمة جهاز Mac مرة أخرى. ينبغي أن يخبرك الوكيل بأن العقدة غير متاحة بدلًا من الرجوع إلى جهاز آخر.</li>
</ol>
<p>سجل اقتران محفوظ لا يعني أن العقدة متصلة الآن، لذا صمّم سير عملك ليبلّغ عن عقدة مفقودة بدلًا من افتراض وجودها.</p>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<table>
<thead>
<tr>
<th>العرَض</th>
<th>أول ما تتحقق منه</th>
</tr>
</thead>
<tbody>
<tr>
<td>تعذّر على جهاز Mac الاتصال</td>
<td>سلامة البوابة، ونقطة النهاية، وTailscale، والمصادقة</td>
</tr>
<tr>
<td>تعمل واجهة التحكم لكن ميزات Mac لا تعمل</td>
<td>ما إذا كانت العقدة متصلة، وأي الأوامر وافقت عليها</td>
</tr>
<tr>
<td>يُنفَّذ أمر على الخادم</td>
<td>مضيف <code>exec</code> واختيار العقدة</td>
</tr>
<tr>
<td>يُرفض أمر ما</td>
<td>سياسة أدوات البوابة، والموافقات المحلية، وتجاوزات الجلسة</td>
</tr>
<tr>
<td>يفشل التقاط الشاشة أو التحكم بالحاسوب</td>
<td>أذونات macOS</td>
</tr>
</tbody>
</table>
<p>تغطي هذه الأوامر معظم التحقيقات:</p>
<pre><code class="language-bash">openclaw gateway status
openclaw nodes status
openclaw nodes pending
openclaw logs --follow
</code></pre>
<h2 id="إزالة-عقدة">إزالة عقدة</h2>
<p>لإبطال عقدة، شغّل هذا على البوابة:</p>
<pre><code class="language-bash">openclaw nodes remove --node <span class="hljs-string">&quot;&lt;node-id&gt;&quot;</span>
</code></pre>
<p>هذا يبطل دور <code>node</code> للجهاز ويقطع جلسات دور العقدة الخاصة به. وإن كان الجهاز نفسه يحمل أدوارًا أخرى، فتلك تحتاج إلى إبطال منفصل.</p>
<blockquote>
<p><strong>الأوامر والأعلام تتغير</strong></p>
<p>الأعلام أعلاه تطابق OpenClaw <code>2026.9.8</code>. وإن لم يتصرف أمر بالطريقة الموصوفة هنا، فشغّله مع <code>--help</code> وتحقق من <a href="https://docs.openclaw.ai/">توثيق OpenClaw</a>.</p>
</blockquote>
`,p={book:n,chapter:s,chapterTitle:t,slug:a,title:o,headings:e,html:l};export{n as book,s as chapter,t as chapterTitle,p as default,e as headings,l as html,a as slug,o as title};
