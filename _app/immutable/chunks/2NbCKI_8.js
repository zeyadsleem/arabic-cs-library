const n="kinney",s="openclaw",a="OpenClaw: مساعدك الذكي الشخصي",t="running-openclaw-on-railway-with-tailscale",e="تشغيل OpenClaw على Railway مع Tailscale",o=[{depth:2,id:"لماذا-خدمة-tailscale-منفصلة",text:"لماذا خدمة Tailscale منفصلة؟"},{depth:3,id:"لماذا-tcp-الخام-لا-وسيط-http",text:"لماذا TCP الخام لا وسيط HTTP؟"},{depth:2,id:"قبل-أن-تبدأ",text:"قبل أن تبدأ"},{depth:2,id:"الخطوة-1-جهز-سياسة-الوصول-لشبكة-tailnet",text:"الخطوة 1: جهّز سياسة الوصول لشبكة tailnet"},{depth:2,id:"الخطوة-2-ولد-مفتاح-مصادقة",text:"الخطوة 2: ولّد مفتاح مصادقة"},{depth:3,id:"تفضل-عدم-الوسم",text:"تفضّل عدم الوسم؟"},{depth:2,id:"الخطوة-3-انشر-القالب",text:"الخطوة 3: انشر القالب"},{depth:2,id:"الخطوة-4-تحقق-من-جهة-شبكة-tailnet",text:"الخطوة 4: تحقق من جهة شبكة tailnet"},{depth:2,id:"الخطوة-5-أكمل-إعداد-البوابة",text:"الخطوة 5: أكمل إعداد البوابة"},{depth:2,id:"الخطوة-6-صل-أجهزتك",text:"الخطوة 6: صِل أجهزتك"},{depth:3,id:"تطبيق-macos",text:"تطبيق macOS"},{depth:3,id:"وافق-على-الجهاز",text:"وافق على الجهاز"},{depth:3,id:"المتصفحات-والهواتف",text:"المتصفحات والهواتف"},{depth:2,id:"الخطوة-7-نظف",text:"الخطوة 7: نظّف"},{depth:2,id:"كيف-تعمل-خدمة-tailscale",text:"كيف تعمل خدمة Tailscale"},{depth:2,id:"من-يعرف-من-أنت",text:"من يعرف من أنت؟"},{depth:2,id:"مقايضات-يجب-معرفتها",text:"مقايضات يجب معرفتها"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:3,id:"إن-كانت-tailscale-متوقفة",text:"إن كانت Tailscale متوقفة"}],l=`<p><a href="https://railway.com/?referralCode=kinney">Railway</a> مكان مريح لتشغيل بوابة (Gateway) تعمل باستمرار: فأنت لا تدير خادمًا، وتحتفظ وحدات التخزين (volumes) بحالتك بين عمليات النشر. غير أن عملية نشر نمطية على Railway تمنح البوابة عنوان URL عامًا، وذلك نقيض ما نريده لشيء يستطيع قراءة ملفاتك واستخدام حساباتك.</p>
<p>يستخدم هذا الدرس قالب <a href="https://github.com/stevekinney/openclaw-railway-template"><code>stevekinney/openclaw-railway-template</code></a>، وهو نشر بالغ البساطة <strong>بلا نطاق عام على الإطلاق</strong>. وتعمل خدمتان على Railway جنبًا إلى جنب:</p>
<ul>
<li><strong><code>openclaw</code></strong> تشغّل البوابة على شبكة Railway الخاصة.</li>
<li><strong><code>tailscale</code></strong> تنضم إلى شبكة tailnet لديك وتمرّر حركة المرور إلى البوابة.</li>
</ul>
<pre><code> Mac app / browser / phone          (devices on your tailnet)
            │
            │  WireGuard (Tailscale)
            ▼
 ┌──────────────── Railway project (private network only) ────────────────┐
 │                                                                        │
 │  tailscale service ── raw TCP forward ──►  openclaw service            │
 │  joins your tailnet                        Gateway on :8080            │
 │  volume: node identity                     volume: /data (all state)   │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
</code></pre>
<blockquote>
<p><strong>هذا إعداد مختلف عن الدرس السابق</strong></p>
<p>في <a href="https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale">الاتصال بـ OpenClaw بأمان عبر Tailscale</a>، تدير البوابة Tailscale بنفسها عبر <code>gateway.tailscale.mode: serve</code>. ويتطلب ذلك أن يعمل Tailscale على الجهاز نفسه الذي تعمل عليه البوابة. وهذا لا ينجح على Railway، لذا تحصل Tailscale على خدمة خاصة بها ويبقى تكامل OpenClaw المدمج معطّلًا. الأفكار واحدة، أما طريقة الربط فمختلفة.</p>
</blockquote>
<h2 id="لماذا-خدمة-tailscale-منفصلة">لماذا خدمة Tailscale منفصلة؟</h2>
<p>ثمة أمور قليلة تجعل Railway مختلفًا عن خادم VPS:</p>
<ul>
<li>لا تستطيع حاويات Railway استخدام شبكات النواة (kernel networking) التي يحتاجها تثبيت Tailscale العادي، ولا يمكنك تشغيل عمليتين طويلتي الأمد في حاوية واحدة دون مشرف (supervisor).</li>
<li><strong>موجّه الشبكة الفرعية (subnet router)</strong> في Tailscale سيكشف كل خدمة في بيئة Railway لديك لشبكة tailnet.</li>
<li>أسماء المضيفين الخاصة في Railway (مثل <code>openclaw.railway.internal</code>) لا تُحلّ إلا داخل Railway.</li>
</ul>
<p>لذا تشغّل خدمة <code>tailscale</code> برنامج Tailscale في وضع <strong>الشبكات في فضاء المستخدم (userspace networking)</strong>، وتنضم إلى شبكة tailnet كجهاز قائم بذاته باسم <code>openclaw</code>، وتمرّر الاتصالات عبر شبكة Railway الخاصة إلى البوابة.</p>
<h3 id="لماذا-tcp-الخام-لا-وسيط-http">لماذا TCP الخام لا وسيط HTTP؟</h3>
<p>يستطيع Tailscale Serve التمرير بطريقتين. الطريقة البديهية هي وسيط عكسي (reverse proxy) لـ HTTP، لكنها تضيف ترويسات <code>X-Forwarded-*</code> و<code>Tailscale-User-*</code> إلى كل طلب. وترفض البوابة الطلبات التي تحمل تلك الترويسات إلا إذا جاءت من وسيط أُخبرت بالثقة به، كما أن عنوان IP الخاص بحاوية Tailscale يتغيّر مع كل عملية نشر. وستنتهي إلى الثقة بنطاق كامل من شبكة Railway، أو إلى الاصطدام بخطأ <code>Proxy client attribution is required</code>.</p>
<p>هذا القالب يمرّر <strong>TCP الخام</strong> بدلًا من ذلك. فالبايتات تمر كما هي دون تغيير، لذا ترى البوابة عميلًا عاديًا على الشبكة الخاصة بلا أي ادعاءات ممرَّرة، ولا شيء موثوق يمكن تزويره. ولا يزال TLS يُعالج في Tailscale على المنفذ 443، باستخدام شهادة شبكة tailnet الحقيقية.</p>
<h2 id="قبل-أن-تبدأ">قبل أن تبدأ</h2>
<p>ستحتاج إلى:</p>
<ul>
<li>حساب <a href="https://railway.com/?referralCode=kinney">Railway</a> على خطة مدفوعة (فوحدات التخزين أكبر مما تسمح به الخطة المجانية)، وأداة <a href="https://docs.railway.com/cli">Railway CLI</a>: <code>brew install railway</code> ثم <code>railway login</code>.</li>
<li>شبكة tailnet مفعَّلة فيها <strong>MagicDNS</strong> و<strong>شهادات HTTPS (HTTPS Certificates)</strong>، كما هو موصوف في الدرس السابق. دوّن اسم DNS لشبكة tailnet في وحدة تحكم الإدارة تحت <strong>DNS</strong>. وهو يبدو مثل <code>tail1234.ts.net</code>.</li>
<li>مفتاح API لمزوّد نماذج. تستخدم الأمثلة Anthropic.</li>
</ul>
<blockquote>
<p><strong>استخدم بيئة Railway جديدة</strong></p>
<p>لا تستطيع البوابة الارتباط إلا بـ IPv4، وبيئات Railway التي أُنشئت قبل 2025-10-16 تُحلّ أسماء المضيفين الخاصة فيها إلى IPv6 فقط. وبيئة <code>production</code> في مشروع جديد سليمة. أما بيئة قديمة فسيفشل اتصالها.</p>
</blockquote>
<h2 id="الخطوة-1-جهز-سياسة-الوصول-لشبكة-tailnet">الخطوة 1: جهّز سياسة الوصول لشبكة tailnet</h2>
<p>افعل ذلك قبل نشر أي شيء. في <a href="https://login.tailscale.com/admin">وحدة تحكم الإدارة</a>، افتح <strong>ضوابط الوصول (Access controls)</strong> وأضف وسمًا (tag)، مع منح (grant) لا يسمح لأحد سواك بالوصول إلى البوابة. واستبدل <code>you@example.com</code> بتسجيل الدخول الخاص بك في Tailscale:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;tagOwners&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tag:openclaw&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;autogroup:admin&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;grants&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-comment">// Only the operator&#x27;s devices may reach the Gateway, and only its two ports.</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;src&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;you@example.com&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;dst&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;tag:openclaw&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;ip&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;tcp:443&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tcp:18789&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;src&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;you@example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;tag:openclaw:443&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tag:openclaw:18789&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ادمج هذا في سياستك القائمة بدلًا من استبدالها. وإن كنت تفضّل عدم استخدام وسم، فراجع <a href="#prefer-not-to-tag">تفضّل عدم الوسم؟</a> في الخطوة 2.</p>
<p>ثمة أمران يجب التحقق منهما:</p>
<ul>
<li>إذا كانت سياستك لا تزال تحوي قاعدة السماح الشاملة الافتراضية (<code>&quot;src&quot;: [&quot;*&quot;], &quot;dst&quot;: [&quot;*:*&quot;]</code>)، فإن <strong>كل عضو في شبكة tailnet يستطيع الوصول إلى البوابة</strong>. فضيِّقها.</li>
<li>لا يحصل جهاز <code>openclaw</code> الجديد على أي منح خاص به، لذا حتى لو اختُرقت البوابة لما استطاعت فتح اتصالات بأي شيء آخر في شبكة tailnet.</li>
</ul>
<h2 id="الخطوة-2-ولد-مفتاح-مصادقة">الخطوة 2: ولّد مفتاح مصادقة</h2>
<p>تحتاج خدمة <code>tailscale</code> إلى مفتاح يُستخدم مرة واحدة كي تنضم إلى شبكة tailnet دون أن يسجّل أحد الدخول يدويًا. اذهب إلى <strong>الإعدادات (Settings) → المفاتيح (Keys) → توليد مفتاح مصادقة (Generate auth key)</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/32fcd84b09c248cb.webp" alt="مربّع الحوار Generate auth key في Tailscale وفيه مفاتيح تبديل الخيارات Reusable وEphemeral وTags."></p>
<p>اضبطه على هذا النحو:</p>
<table>
<thead>
<tr>
<th>الإعداد</th>
<th>القيمة</th>
<th>السبب</th>
</tr>
</thead>
<tbody>
<tr>
<td>Reusable (قابل لإعادة الاستخدام)</td>
<td><strong>معطّل</strong></td>
<td>يُستخدم المفتاح مرة واحدة. بعد ذلك تعيش هوية العقدة على وحدة تخزينها (volume).</td>
</tr>
<tr>
<td>Expiration (الانتهاء)</td>
<td><strong>يوم واحد</strong></td>
<td>لا يلزم أن يدوم إلا حتى أول عملية نشر. (القيمة الافتراضية في مربع الحوار 90 يومًا.)</td>
</tr>
<tr>
<td>Ephemeral (مؤقت)</td>
<td><strong>معطّل</strong></td>
<td>الجهاز المؤقت يختفي حين ينقطع اتصاله، بما في ذلك أثناء كل إعادة نشر.</td>
</tr>
<tr>
<td>Pre-approved (موافَق عليه مسبقًا)</td>
<td><strong>مفعّل</strong> إن كان مطلوبًا</td>
<td>فعّله إذا كانت شبكة tailnet تتطلب الموافقة على الأجهزة، كي لا تبقى العقدة في انتظار.</td>
</tr>
<tr>
<td>Tags (الوسوم)</td>
<td><strong>مفعّل</strong>: <code>tag:openclaw</code></td>
<td>الأجهزة الموسومة لا تحصل إلا على الوصول الذي تمنحه سياستك، ومفاتيح عقدها لا تنتهي صلاحيتها.</td>
</tr>
</tbody>
</table>
<p>انسخ المفتاح حين يُعرض. فلن يعرضه Tailscale كاملًا مرة أخرى.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>عامل المفتاح كأنه كلمة مرور. فمن يملكه يستطيع إضافة جهاز إلى شبكة tailnet. لا تلصقه في محادثة ولا تُثبّته في المستودع، واستخدم انتهاء الصلاحية ليوم واحد كي يصبح المفتاح المسرَّب عديم القيمة سريعًا.</p>
</blockquote>
<h3 id="تفضل-عدم-الوسم">تفضّل عدم الوسم؟ <span class="content-anchor" id="prefer-not-to-tag"></span></h3>
<p>الوسم مستحسن، لكنه ليس مطلوبًا. وإن كنت تفضّل عدم تعديل <code>tagOwners</code> في سياستك، فاترك <strong>Tags</strong> معطّلًا في مربع الحوار وستنضم العقدة كجهاز عادي يملكه مستخدمك. وكل ما عدا ذلك في هذا الدرس يعمل. وثمة ثلاثة أشياء تتغير:</p>
<ol>
<li><strong>عليك تعطيل انتهاء صلاحية المفتاح بنفسك.</strong> فالعقد غير الموسومة تنتهي صلاحيتها بعد 180 يومًا افتراضيًا، وحينها تسقط البوابة من شبكة tailnet بصمت. بعد انضمام الجهاز، افتح <code>openclaw</code> في وحدة تحكم الإدارة واختر <strong>تعطيل انتهاء صلاحية المفتاح (Disable key expiry)</strong>. والعقد الموسومة تتجاوز هذه الخطوة.</li>
<li><strong>منح الخطوة 1 لن ينطبق.</strong> فهو يستهدف <code>tag:openclaw</code>، وهو وسم لا تملكه عقدة غير موسومة. فتجاوز كتلة <code>tagOwners</code>، وحين يظهر الجهاز وجّه المنح إليه مباشرة: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;grants&quot;</span><span style="color:#D6DEEB">: [</span></span>
<span class="line"><span style="color:#D6DEEB"> {</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;src&quot;</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">you@example.com</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;dst&quot;</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">&lt;openclaw-tailnet-ip&gt;</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;ip&quot;</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">tcp:443</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">, </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">tcp:18789</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB"> ],</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;tests&quot;</span><span style="color:#D6DEEB">: [{ </span><span style="color:#7FDBCA">&quot;src&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">you@example.com</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">, </span><span style="color:#7FDBCA">&quot;accept&quot;</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">&lt;openclaw-tailnet-ip&gt;:443</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">] }],</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> وستجد عنوان IP في صفحة الجهاز في وحدة تحكم الإدارة.</li>
<li><strong>العقدة تحمل هويتك.</strong> فالعقدة الموسومة لا تحصل إلا على الوصول الذي تمنحه سياستها، وهذه العقدة لم تُمنح شيئًا. أما العقدة غير الموسومة فهي <em>أنت</em> بقدر ما تعنيه السياسة، لذا يمكن لحاوية بوابة مخترقة أن تصل إلى كل ما يستطيع حسابك الوصول إليه. ولا تتناول وثائق القالب هذه الحالة، لذا عاملها كسلوك عام في Tailscale لا كشيء يضمنه القالب. وإن كانت سياستك لا تزال السماح الشامل الافتراضي، فذلك يعني كل شيء في شبكة tailnet، لذا ضيّقها في كل الأحوال.</li>
</ol>
<p>بالنسبة إلى بوابة تستطيع تشغيل الأوامر، الوسم تأمين رخيص. أما على شبكة tailnet شخصية صغيرة بسياسة محكمة، فالاستغناء عنه مقايضة معقولة.</p>
<h2 id="الخطوة-3-انشر-القالب">الخطوة 3: انشر القالب</h2>
<p>افتح <a href="https://railway.com/deploy/openclaw-private-gateway?referralCode=kinney">قالب بوابة OpenClaw الخاصة</a> على Railway واملأ متغيرين:</p>
<table>
<thead>
<tr>
<th>المتغير</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>OPENCLAW_PUBLIC_ORIGIN</code></td>
<td><code>https://openclaw.&lt;your-tailnet&gt;.ts.net</code></td>
</tr>
<tr>
<td><code>TS_AUTHKEY</code></td>
<td>المفتاح من الخطوة 2</td>
</tr>
</tbody>
</table>
<p><code>OPENCLAW_PUBLIC_ORIGIN</code> هو العنوان الذي ستتصل به. وتستخدمه البوابة أيضًا قائمةً بأصول المتصفحات المسموح بها. أما رمز البوابة (<code>OPENCLAW_GATEWAY_TOKEN</code>) فيُولَّد لك.</p>
<p>انتظر حتى تصبح الخدمتان باللون الأخضر. يستغرق ذلك نحو أربع دقائق، لأن البناء الأول يسحب صورة كبيرة. وعند انتهائه يظهر جهاز باسم <code>openclaw</code> في صفحة <strong>الأجهزة (Machines)</strong> في شبكة tailnet.</p>
<p>إن كان لديك جهاز باسم <code>openclaw</code> بالفعل، فسيسمّي Tailscale الجديد <code>openclaw-1</code>. أزل القديم، أو اضبط <code>OPENCLAW_PUBLIC_ORIGIN</code> ليطابق الاسم الجديد.</p>
<blockquote>
<p><strong>تريد النشر من نسختك المتفرعة؟</strong></p>
<p>يصف المستودع الخدمتين أيضًا بـ Railway Infrastructure as Code في <code>.railway/railway.ts</code>. استخدم ذلك إن كنت تنوي تغيير الشيفرة. ويشرح <code>DEPLOYMENT.md</code> في القالب ذلك خطوة بخطوة.</p>
</blockquote>
<h2 id="الخطوة-4-تحقق-من-جهة-شبكة-tailnet">الخطوة 4: تحقق من جهة شبكة tailnet</h2>
<p>من جهاز على شبكة tailnet تسمح به سياستك:</p>
<pre><code class="language-bash">tailscale ping openclaw
curl -fsS https://openclaw.&lt;your-tailnet&gt;.ts.net/healthz
</code></pre>
<p>ينبغي أن تحصل على رد من <code>tailscale ping</code>، وأن يطبع <code>curl</code> القيمة <code>{&quot;ok&quot;:true,&quot;status&quot;:&quot;live&quot;}</code>. وقد يستغرق أول طلب HTTPS بضع ثوانٍ بينما يصدر Tailscale الشهادة.</p>
<p>ثم شغّل الأمر <code>curl</code> نفسه من جهاز <strong>لا</strong> تسمح به سياستك. ينبغي أن تنتهي المهلة. فذلك هو عمل سياسة الوصول؛ فتحقق منها بعناية تماثل عنايتك بحالة النجاح.</p>
<p>وأخيرًا، افتح لوحة تحكم Railway وانظر إلى <strong>الإعدادات (Settings) → الشبكات (Networking)</strong> في كل خدمة. لا ينبغي أن يوجد أي نطاق ولا أي وسيط TCP في أي منهما.</p>
<h2 id="الخطوة-5-أكمل-إعداد-البوابة">الخطوة 5: أكمل إعداد البوابة</h2>
<p>في هذه المرحلة تعمل البوابة، لكن ليس لديها مزوّد نماذج بعد. اربط Railway CLI بالمشروع، وسجّل مفتاح SSH، وتأكد من قدرتك على الوصول إلى الحاوية:</p>
<pre><code class="language-bash">railway <span class="hljs-built_in">link</span>
railway ssh keys add --key ~/.ssh/id_ed25519.pub
railway ssh --service openclaw -- openclaw health
</code></pre>
<p>يطلب منك أول <code>railway ssh</code> الثقة بـ <code>ssh.railway.com</code>. ولا ينشر Railway بصمات مفاتيح المضيف (host-key fingerprints)، لذا لا يمكنك إلا قبولها في المرة الأولى.</p>
<p>أضف مفتاح مزوّد النماذج. انسخه إلى الحافظة، ثم:</p>
<pre><code class="language-bash">pbpaste | <span class="hljs-built_in">tr</span> -d <span class="hljs-string">&#x27;\\n&#x27;</span> | railway variable <span class="hljs-built_in">set</span> ANTHROPIC_API_KEY --stdin --service openclaw
</code></pre>
<p>حين يصبح ذلك النشر أخضر، شغّل الإعداد الأولي غير التفاعلي داخل الحاوية:</p>
<pre><code class="language-bash">railway ssh --service openclaw -- openclaw onboard --non-interactive --accept-risk --skip-health \\
  --mode <span class="hljs-built_in">local</span> --auth-choice apiKey --secret-input-mode ref \\
  --gateway-auth token --gateway-token-ref-env OPENCLAW_GATEWAY_TOKEN \\
  --gateway-bind lan --skip-channels --no-install-daemon
</code></pre>
<p>يغيّر الإعداد الأولي إعدادًا يحتاج إلى إعادة تشغيل. وRailway هو المشرف هنا، لذا تخرج البوابة بسلام ويعيد Railway تشغيلها في نحو 30 ثانية. ثم تحقق من أن الوكيل يجيب:</p>
<pre><code class="language-bash">railway ssh --service openclaw -- openclaw agent --agent main --message <span class="hljs-string">&quot;Reply with exactly: OK&quot;</span>
</code></pre>
<p>لمزوّد غير Anthropic، اضبط متغير مفتاحه بدلًا من ذلك وغيّر <code>--auth-choice</code>. ويسرد <code>openclaw onboard --help</code> الخيارات.</p>
<h2 id="الخطوة-6-صل-أجهزتك">الخطوة 6: صِل أجهزتك</h2>
<p>كل شيء يستخدم عنوانًا واحدًا. استخدم العنوان الآمن <code>wss://</code>:</p>
<pre><code>wss://openclaw.&lt;your-tailnet&gt;.ts.net
</code></pre>
<p>وثمة بديل نصي صريح (plaintext) على <code>ws://openclaw.&lt;your-tailnet&gt;.ts.net:18789</code>. لا تزال حركة المرور مشفّرة بـ WireGuard داخل شبكة tailnet، لكن فضّل <code>wss://</code> إلا إذا كانت شبكة tailnet لا تستطيع إصدار شهادات HTTPS.</p>
<h3 id="تطبيق-macos">تطبيق macOS</h3>
<ol>
<li>في شريط القوائم، افتح <strong>الاتصال… (Connection…)</strong>.</li>
<li>تحت <strong>OpenClaw runs</strong>، اختر <strong>بعيد (Remote — مضيف آخر)</strong>.</li>
<li>اختر <strong>عنوان البوابة أو رمز الإعداد (Gateway address or setup code)</strong> وأدخل عنوان <code>wss://</code>.</li>
<li>أدخل رمز البوابة، الذي يمكنك قراءته من متغيرات خدمة <code>openclaw</code> في Railway.</li>
<li>اختر <strong>حفظ الاتصال (Save connection)</strong>، ثم <strong>اختبار (Test)</strong>.</li>
</ol>
<p>يبلّغ الاختبار الأول عن لزوم الاقتران (pairing). وهذا متوقع.</p>
<h3 id="وافق-على-الجهاز">وافق على الجهاز</h3>
<p>تُعدّ اتصالات شبكة tailnet اتصالات بعيدة، لذا لا يُوافق على شيء تلقائيًا. وافق على كل طلب معلّق من البوابة:</p>
<pre><code class="language-bash">railway ssh --service openclaw -- openclaw devices list
railway ssh --service openclaw -- openclaw devices approve &lt;requestId&gt;
</code></pre>
<p>يرفع تطبيق Mac طلبين، أحدهما لدور المشغّل (operator) والآخر لدور العقدة (node). وافق على كليهما. ثم سيطلب إذنًا لكشف الأوامر على جهاز Mac، بما في ذلك تشغيل أوامر shell. اقرأ ذلك الطلب بعناية قبل الموافقة. ويشرح <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">درس العقدة المقترنة</a> ما توافق عليه.</p>
<h3 id="المتصفحات-والهواتف">المتصفحات والهواتف</h3>
<ul>
<li><strong>متصفح:</strong> افتح <code>https://openclaw.&lt;your-tailnet&gt;.ts.net/</code> على جهاز في شبكة tailnet وسجّل الدخول برمز البوابة. كل ملف تعريف في المتصفح يُعدّ جهازًا منفصلًا، لذا وافق عليه بالطريقة نفسها.</li>
<li><strong>iOS وAndroid:</strong> بعد وضع الهاتف على شبكة tailnet، شغّل <code>railway ssh --service openclaw -- openclaw qr</code> وامسح الرمز في تطبيق OpenClaw. أضف <code>--limited</code> لحجب الوصول الإداري عن الهاتف. ويحتوي الرمز على رمز قصير الأمد، فلا تنشره في أي مكان.</li>
</ul>
<p>تُخزَّن سجلات الاقتران على وحدة تخزين البوابة، لذا تبقى بعد عمليات إعادة النشر.</p>
<h2 id="الخطوة-7-نظف">الخطوة 7: نظّف</h2>
<ul>
<li><strong>أزل مفتاح المصادقة.</strong> بعد انضمام الجهاز يمكنك حذف <code>TS_AUTHKEY</code> من خدمة <code>tailscale</code>. فالمفتاح المستخدم لمرة واحدة عديم الفائدة على أي حال.</li>
<li><strong>تحقق من انتهاء صلاحية المفتاح.</strong> إن وسمت المفتاح، فإن العقدة لا تنتهي صلاحيتها أبدًا. وإن لم تفعل، فعطّل انتهاء صلاحية المفتاح على جهاز <code>openclaw</code> في وحدة تحكم الإدارة، وإلا سقط الجهاز من شبكة tailnet بعد 180 يومًا.</li>
<li><strong>فعّل النسخ الاحتياطي.</strong> في كل خدمة، افتح <strong>النسخ الاحتياطي (Backups)</strong> وفعّل النسخ الاحتياطي اليومي. فوحدة تخزين <code>openclaw</code> تحوي رموز OAuth وسجلات الاقتران وسجل المحادثات.</li>
<li><strong>التدقيق.</strong> شغّل التدقيق الأمني وتأكد من أنه يعود نظيفًا: <code><span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> security</span><span style="color:#ECC48D"> audit</span></span></code></li>
</ul>
<p>ثم تابع بقية الدورة: <a href="https://stevekinney.com/courses/openclaw/adding-telegram-as-a-channel">أضف قناة</a> و<a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">اختر سياسة رسائل مباشرة</a>، وشدّد ما يُسمح للوكيل بتشغيله.</p>
<h2 id="كيف-تعمل-خدمة-tailscale">كيف تعمل خدمة Tailscale</h2>
<p>لا تحتاج إلى لمس أي من هذا لاستخدام القالب، لكنه يفسّر السلوك. فخدمة <code>tailscale</code> تُبنى من ملف Dockerfile صغير فوق صورة Tailscale الرسمية، إضافة إلى إعداد Serve مضمَّن في الصورة لأن Railway لا يستطيع تركيب ملفات داخل خدمة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TCP&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;443&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;TCPForward&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openclaw.railway.internal:8080&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;TerminateTLS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${TS_CERT_DOMAIN}&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;18789&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;TCPForward&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openclaw.railway.internal:8080&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ينتج عن ذلك الملف نتيجتان:</p>
<ul>
<li><strong>يجب أن تكون خدمة البوابة باسم <code>openclaw</code>.</strong> فاسم مضيفها الخاص مكتوب مباشرة هنا.</li>
<li><strong>المنفذ 443 ينهي TLS في Tailscale</strong>، باستخدام شهادة شبكة tailnet. والمنفذ 18789 هو البديل النصي الصريح. وكلاهما يذهب إلى منفذ البوابة نفسه.</li>
</ul>
<p>متغيرات البيئة المهمة:</p>
<table>
<thead>
<tr>
<th>المتغير</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TS_USERSPACE=true</code></td>
<td>الشبكات في فضاء المستخدم، فلا حاجة إلى <code>/dev/net/tun</code> ولا إلى قدرات Linux إضافية.</td>
</tr>
<tr>
<td><code>TS_STATE_DIR</code></td>
<td>يخزّن هوية العقدة على وحدة تخزين الخدمة.</td>
</tr>
<tr>
<td><code>TS_AUTH_ONCE=true</code></td>
<td>يسجّل الدخول فقط حين لا يكون مسجّلًا بالفعل، فلا تستهلك إعادة التشغيل مفتاحًا آخر.</td>
</tr>
<tr>
<td><code>TS_SERVE_CONFIG</code></td>
<td>يشير إلى إعداد Serve أعلاه.</td>
</tr>
<tr>
<td><code>TS_HOSTNAME</code></td>
<td>اسم MagicDNS. القيمة الافتراضية <code>openclaw</code>.</td>
</tr>
<tr>
<td><code>TS_ACCEPT_DNS</code></td>
<td>متروك معطّلًا كي يستمر مُحلِّل Railway نفسه في العمل. و<code>openclaw.railway.internal</code> يعتمد عليه.</td>
</tr>
<tr>
<td><code>TS_DEBUG_MTU=1236</code></td>
<td>يصغّر حزم النفق لتناسب شبكة Railway. راجع جدول استكشاف الأخطاء.</td>
</tr>
<tr>
<td><code>TS_AUTHKEY</code></td>
<td>لتسجيل الدخول الأول فقط.</td>
</tr>
</tbody>
</table>
<p>ولأن هوية العقدة تعيش على وحدة تخزين، تحافظ عمليات إعادة النشر وإعادة التشغيل على الجهاز والعنوان والشهادة نفسها.</p>
<h2 id="من-يعرف-من-أنت">من يعرف من أنت؟</h2>
<p>حين تتصل من جهاز Mac وهاتفك ومتصفح، فمن الطبيعي أن تفترض أن شيئًا ما يعرف أنها كلها أنت. وثمة ثلاث طبقات مختلفة تعرف كل منها شيئًا مختلفًا، ويستحق الأمر إبقاءها واضحة.</p>
<table>
<thead>
<tr>
<th>الطبقة</th>
<th>ما تعرفه</th>
<th>ما تقرره</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Tailscale</strong></td>
<td>أي مستخدم يملك كل جهاز على شبكة tailnet</td>
<td>هل يستطيع الجهاز الوصول إلى البوابة أصلًا</td>
</tr>
<tr>
<td><strong>رمز البوابة</strong></td>
<td>لا شيء عنك. فهو سر مشترك</td>
<td>هل يجوز لعميل التحدث إلى البوابة</td>
</tr>
<tr>
<td><strong>اقتران الأجهزة</strong></td>
<td>المفتاح الخاص بجهاز واحد، الذي وافقت عليه يدويًا</td>
<td>ما يُسمح لذلك الجهاز بعينه بفعله</td>
</tr>
</tbody>
</table>
<p><strong>Tailscale</strong> هي الطبقة الوحيدة التي تعرف أن أجهزتك تخص الشخص نفسه. فكل جهاز على شبكة tailnet له هوية مرتبطة بتسجيل دخولك، وسياسة وصولك (<code>&quot;src&quot;: [&quot;you@example.com&quot;]</code>) تُفحص مقابلها. وهكذا يُعدّ جهاز Mac وهاتفك وحاسوبك المحمول كلها «أنت»، وهكذا يُردّ جهاز غريب قبل أن يمسّ البوابة أصلًا.</p>
<p><strong>البوابة لا تحصل على تلك المعلومات.</strong> فخدمة <code>tailscale</code> تمرّر TCP الخام، وهو يمرّر البايتات دون إضافة أي ترويسات هوية، وتكامل Tailscale في OpenClaw معطّل. بل إن البوابة ترفض الطلبات التي تصل بترويسة <code>Tailscale-User-Login</code>، لأنها لا تملك وسيلة للتحقق منها. ومن وجهة نظرها، كل عميل هو عنوان IP الخاص لخدمة Tailscale. (ولهذا السبب نفسه تُقيَّد محاولات تسجيل الدخول الفاشلة معًا، ولهذا لا تستطيع سجلاتها التمييز بين أجهزتك.)</p>
<p>لذا تبني البوابة صورتها عنك من أمرين:</p>
<ul>
<li><strong>الرمز</strong> سر مشترك. فكل عميل يقدّم الرمز نفسه. وهو يثبت أن العميل يعرف السر ولا شيء غير ذلك.</li>
<li><strong>اقتران الأجهزة</strong> يمنح كل عميل زوج مفاتيح خاصًا به. ويبقى الجهاز الجديد معلّقًا حتى توافق عليه، والاتصال الذي لا يحمل هوية جهاز مقترن لا يحصل على أي نطاقات صلاحية للمشغّل. والعميل الذي يملك الرمز وحده يستطيع استدعاء <code>health</code> لكنه لا يستطيع قراءة الإعدادات.</li>
</ul>
<p>والنتيجة أن OpenClaw يرى تطبيق Mac وكل ملف تعريف في المتصفح وهاتفك <strong>أجهزة منفصلة</strong>. تُوافق عليها منفصلة وتُلغى منفصلة، ولا شيء يربطها إلا أنها كلها تعرف الرمز. ونافذة المتصفح الخاصة تنسى هوية جهازها، لذا تحتاج إلى موافقة في كل مرة.</p>
<p>ولهذا نتائج عملية قليلة:</p>
<ul>
<li><strong>الرمز هو الشيء الذي «هو أنت».</strong> أبقِه محكمًا في Railway، وبدّله إن تسرّب.</li>
<li><strong>ألغِ بحسب الجهاز.</strong> لقطع هاتف مفقود دون المساس بأجهزتك الأخرى، ألغِ ذلك الجهاز وحده: <code><span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> devices</span><span style="color:#ECC48D"> list</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> devices</span><span style="color:#ECC48D"> revoke</span><span style="color:#82AAFF"> --device</span><span style="color:#7FDBCA"> &lt;</span><span style="color:#ECC48D">i</span><span style="color:#D6DEEB">d</span><span style="color:#7FDBCA">&gt;</span><span style="color:#82AAFF"> --role</span><span style="color:#7FDBCA"> &lt;</span><span style="color:#ECC48D">rol</span><span style="color:#D6DEEB">e</span><span style="color:#7FDBCA">&gt;</span></span></code></li>
<li><strong>لسؤال «أي جهاز فعل ذلك؟»، راجع سجلات Tailscale.</strong> فسجلات البوابة لا تُظهر إلا عنوان IP المشترك.</li>
</ul>
<p>إعداد <a href="https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale">الدرس السابق</a> يعمل بشكل مختلف. فحين يعمل Tailscale على مضيف البوابة، يستطيع OpenClaw أن يسأل الخادم الخفي المحلي لـ Tailscale عن هوية المتصل ويستخدم ذلك لتسجيل الدخول إلى واجهة التحكم (Control UI). وRailway لا يستطيع فعل ذلك، وهي المقايضة التي تقبلها لإبقاء البوابة خارج الإنترنت العام هناك.</p>
<h2 id="مقايضات-يجب-معرفتها">مقايضات يجب معرفتها</h2>
<ul>
<li><strong>الجميع يتشاركون عنوان IP واحدًا.</strong> فالبوابة ترى كل عميل على شبكة tailnet كعنوان IP الخاص بخدمة Tailscale. ولن تُظهر سجلاتها أي جهاز اتصل (ستُظهره سجلات Tailscale)، وتقييد محاولات تسجيل الدخول الفاشلة مشترك. فعشر محاولات سيئة في دقيقة تقفل <strong>كل</strong> أجهزتك خمس دقائق.</li>
<li><strong>من يملك وصولًا إلى Railway يملك صدفة جذر (root shell).</strong> فأعضاء المشروع يستطيعون الدخول إلى الحاويات عبر <code>railway ssh</code>. ووحدة التخزين تحوي الرموز والسجل، فحدّد من يكون في المشروع.</li>
<li><strong>لا تفعّل Funnel لهذه العقدة أبدًا.</strong> فاختبارات القالب تفشل إن فعّل إعداد Serve خاصية Funnel أو تحوّل إلى وسيط HTTP.</li>
</ul>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<p>ابدأ بالسجلات:</p>
<pre><code class="language-bash">railway logs --service tailscale
railway logs --service openclaw
</code></pre>
<table>
<thead>
<tr>
<th>العرَض</th>
<th>السبب المحتمل والإصلاح</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>tailscale</code> غير سليمة ويقول السجل <code>To authenticate, visit:</code></td>
<td>إنها غير مسجّلة الدخول. اضبط <code>TS_AUTHKEY</code>، أو افتح عنوان URL المطبوع في غضون خمس دقائق. فمن يستطيع قراءة السجلات في تلك النافذة يمكنه الاستيلاء على العقدة.</td>
</tr>
<tr>
<td>الجهاز اسمه <code>openclaw-1</code></td>
<td>كان الاسم محجوزًا. أزل الجهاز القديم أو اضبط <code>TS_HOSTNAME</code>، وأبقِ <code>OPENCLAW_PUBLIC_ORIGIN</code> متطابقًا.</td>
</tr>
<tr>
<td>ينتهي <code>curl</code> إلى عنوان <code>wss://</code> بمهلة</td>
<td>سياستك لا تسمح بجهازك، أو العقدة غير متصلة. تحقق من المنح وشغّل <code>tailscale ping openclaw</code>.</td>
</tr>
<tr>
<td>يفشل HTTPS، لكن المنفذ <code>18789</code> يعمل</td>
<td>شهادات HTTPS غير مفعّلة لشبكة tailnet. فعّلها تحت <strong>DNS</strong>.</td>
</tr>
<tr>
<td>يقول السجل <code>failed to TCP proxy port … to openclaw.railway.internal:8080</code></td>
<td>البوابة متوقفة، أو الخدمة ليست باسم <code>openclaw</code>، أو البيئة قديمة من نوع IPv6 فقط.</td>
</tr>
<tr>
<td>الاتصال يعمل لكنه بطيء (تستغرق المصافحة نحو ثانية)</td>
<td>تُفقد الحزم الأكبر من وحدة MTU في شبكة Railway. أبقِ <code>TS_DEBUG_MTU=1236</code> ولا تتجاوزه.</td>
</tr>
<tr>
<td><code>pairing required</code> أو <code>disconnected (1008)</code></td>
<td>جهاز جديد. شغّل <code>openclaw devices list</code>، ثم <code>devices approve</code>.</td>
</tr>
<tr>
<td><code>Proxy client attribution is required</code> (403)</td>
<td>شيء ما يضيف ترويسات ممرَّرة، غالبًا لأن إعداد Serve غُيّر إلى وسيط HTTP. أعد تمرير TCP الخام. ولا تضف وكلاء موثوقين.</td>
</tr>
<tr>
<td><code>401 Unauthorized</code> في كل مكان</td>
<td>الرمز خاطئ أو بُدّل، أو أن تقييد المعدل أقفل الجميع. انتظر خمس دقائق.</td>
</tr>
</tbody>
</table>
<h3 id="إن-كانت-tailscale-متوقفة">إن كانت Tailscale متوقفة</h3>
<p>توفّر بوابة SSH في Railway بديلًا للطوارئ. ويحتاج إلى حساب Railway في المشروع ومفتاح SSH مسجّل. انسخ معرّف نسخة خدمة <code>openclaw</code> (اضغط ⌘K في لوحة التحكم واختر <strong>نسخ معرّف نسخة الخدمة (Copy Service Instance ID)</strong>)، ثم مرّر منفذ البوابة:</p>
<pre><code class="language-bash">ssh -N -L 18789:127.0.0.1:8080 &lt;service-instance-id&gt;@ssh.railway.com
</code></pre>
<p>وجّه التطبيق إلى <code>ws://127.0.0.1:18789</code> مع رمز البوابة. فعبر النفق ترى البوابة عميلًا على الواجهة المحلية (loopback)، لذا يُوافق على الاقتران تلقائيًا. وذلك ليس وصولًا أكثر مما منحك النفق أصلًا، لأن من يستطيع فتحه يملك بالفعل صدفة جذر في الحاوية.</p>
<blockquote>
<p><strong>الإصدارات والتحديثات</strong></p>
<p>يتبع هذا الدرس القالب كما هو في OpenClaw <code>2026.9.8</code> وTailscale <code>1.102.5</code>. والترقيات تغيير للصورة، لذا راجع مستودع القالب للحصول على التعليمات الحالية قبل التحديث.</p>
</blockquote>
`,c={book:n,chapter:s,chapterTitle:a,slug:t,title:e,headings:o,html:l};export{n as book,s as chapter,a as chapterTitle,c as default,o as headings,l as html,t as slug,e as title};
