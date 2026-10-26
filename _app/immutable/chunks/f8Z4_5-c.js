const n="kinney",s="openclaw",a="OpenClaw: مساعدك الذكي الشخصي",e="connecting-securely-with-tailscale",t="الاتصال بـ OpenClaw بأمان عبر Tailscale",l=[{depth:2,id:"serve-مقابل-funnel",text:"Serve مقابل Funnel"},{depth:2,id:"قبل-أن-تبدأ",text:"قبل أن تبدأ"},{depth:2,id:"الخطوة-1-ثبت-tailscale-على-مضيف-البوابة",text:"الخطوة 1: ثبّت Tailscale على مضيف البوابة"},{depth:2,id:"الخطوة-2-فعل-magicdns-وشهادات-https",text:"الخطوة 2: فعّل MagicDNS وشهادات HTTPS"},{depth:2,id:"الخطوة-3-تأكد-من-أن-البوابة-تتطلب-المصادقة",text:"الخطوة 3: تأكد من أن البوابة تتطلب المصادقة"},{depth:2,id:"الخطوة-4-وجه-البوابة-إلى-tailscale-serve",text:"الخطوة 4: وجّه البوابة إلى Tailscale Serve"},{depth:2,id:"الخطوة-5-اسمح-لأجهزتك-بالوصول-إلى-البوابة",text:"الخطوة 5: اسمح لأجهزتك بالوصول إلى البوابة"},{depth:2,id:"الخطوة-6-تحقق-من-نجاح-الأمر",text:"الخطوة 6: تحقق من نجاح الأمر"},{depth:2,id:"الخطوة-7-صل-أجهزتك",text:"الخطوة 7: صِل أجهزتك"},{depth:2,id:"اختياري-سجل-الدخول-بهوية-tailscale",text:"اختياري: سجّل الدخول بهوية Tailscale"},{depth:2,id:"دقق-في-مدى-تعرضك",text:"دقّق في مدى تعرّضك"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],c=`<p>حين تصبح البوابة (Gateway) مقيمة على جهاز آخر، تحتاج إلى طريقة للوصول إليها. والخيارات البديهية ليست جيدة. ففتح منفذ إلى الإنترنت يدعو الغرباء إلى تجربة بيانات اعتمادك، ونفق SSH يعني إعداده على كل حاسوب محمول، وهو ليس خيارًا على الإطلاق على الهاتف.</p>
<p>يمنحك <a href="https://tailscale.com/">Tailscale</a> خيارًا ثالثًا. فهو يبني شبكة خاصة (<strong>tailnet</strong>) من الأجهزة التي تسجّل الدخول منها، ويستطيع OpenClaw أن ينشر البوابة على تلك الشبكة وحدها دون سواها. والنتيجة هي ما يُسمّى غالبًا إعداد «صفر منافذ مفتوحة»:</p>
<ul>
<li>البوابة تستمع فقط على الواجهة المحلية (loopback) (<code>127.0.0.1</code>).</li>
<li>لا شيء مرتبط بـ <code>0.0.0.0</code> ولا شيء يُعاد توجيه منافذه.</li>
<li>لا توجد قاعدة جدار ناري للاتصالات الواردة تحتاج إلى صيانة.</li>
<li>تحصل على عنوان HTTPS واحد ثابت، <code>https://&lt;host&gt;.&lt;tailnet&gt;.ts.net</code>، يعمل من جهاز Mac لديك وهاتفك وأي <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">عقدة مقترنة</a>.</li>
</ul>
<p>الجانب المتعلق بـ OpenClaw في هذا (<code>gateway.tailscale.*</code>) مبنيّ في النواة (core)، لذا لا توجد إضافة (plugin) تحتاج إلى تثبيت. أما أداة <code>tailscale</code> عبر سطر الأوامر (CLI) والخادم الخفي (daemon) فهما برنامجان منفصلان تثبّتهما بنفسك.</p>
<blockquote>
<p><strong>هل تستضيف على Railway؟</strong></p>
<p>لا يستطيع <a href="https://railway.com/?referralCode=kinney">Railway</a> تشغيل Tailscale إلى جانب البوابة، لذا يحتاج إلى ترتيب مختلف. راجع <a href="https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale">تشغيل OpenClaw على Railway مع Tailscale</a>.</p>
</blockquote>
<h2 id="serve-مقابل-funnel">Serve مقابل Funnel</h2>
<p>يملك Tailscale طريقتين لنشر خدمة، والخلط بينهما هو الخطأ الأكثر شيوعًا.</p>
<table>
<thead>
<tr>
<th></th>
<th>Serve</th>
<th>Funnel</th>
</tr>
</thead>
<tbody>
<tr>
<td>من يستطيع الوصول إليه</td>
<td>أجهزة شبكة tailnet الخاصة بك فقط، وفقًا لسياستك</td>
<td><strong>أي شخص على الإنترنت العام</strong></td>
</tr>
<tr>
<td>المصادقة التي يحتاجها OpenClaw</td>
<td>رمز (token)، أو كلمة مرور، أو وسيط موثوق</td>
<td>كلمة مرور، مفروضة (فلن يبدأ بدونها)</td>
</tr>
<tr>
<td>هل هو المناسب هنا؟</td>
<td><strong>نعم، هذا هو الافتراضي</strong></td>
<td>نادرًا، وفقط عن قصد</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>استخدم Serve لا Funnel</strong></p>
<p>يضع Funnel واجهة التحكم (Control UI) في بوابتك على الإنترنت العام خلف كلمة مرور مشتركة واحدة. ومن يملك تلك الكلمة يحصل على صلاحية مشغّل كاملة. وكل ما في هذا الدرس يستخدم Serve.</p>
</blockquote>
<h2 id="قبل-أن-تبدأ">قبل أن تبدأ</h2>
<p>ستحتاج إلى:</p>
<ul>
<li>بوابة تستطيع تسجيل الدخول إليها (خادم VPS، أو خادم منزلي، أو جهاز Mac آخر).</li>
<li><a href="https://login.tailscale.com/">حساب Tailscale</a>.</li>
<li>Tailscale مثبّت على <strong>كلٍّ</strong> من مضيف البوابة وكل جهاز تريد الاتصال منه.</li>
</ul>
<h2 id="الخطوة-1-ثبت-tailscale-على-مضيف-البوابة">الخطوة 1: ثبّت Tailscale على مضيف البوابة</h2>
<p>يجب تثبيت Tailscale <strong>وتسجيل الدخول إليه</strong> على الجهاز الذي تشغّل عليه البوابة. على مضيف Linux:</p>
<pre><code class="language-bash">curl -fsSL https://tailscale.com/install.sh | <span class="hljs-built_in">sudo</span> sh
<span class="hljs-built_in">sudo</span> tailscale up
</code></pre>
<p>تطبع <code>tailscale up</code> رابط تسجيل دخول. افتحه في متصفح ووافق على الجهاز.</p>
<p>إن أردت اسمًا متوقّعًا للجهاز، وSSH الخاص بـ Tailscale لتتمكن من إدارة الجهاز دون كشف المنفذ 22، فاستخدم هذا البديل بدلًا من ذلك:</p>
<pre><code class="language-bash">curl -fsSL https://tailscale.com/install.sh | sh
<span class="hljs-built_in">sudo</span> tailscale up --ssh --hostname=openclaw
</code></pre>
<p>على جهاز Mac، ثبّت تطبيق Tailscale وسجّل الدخول. يجد OpenClaw أداة سطر الأوامر داخل حزمة التطبيق (app bundle) بنفسه، فلا حاجة إلى إضافتها إلى <code>PATH</code> لديك.</p>
<h2 id="الخطوة-2-فعل-magicdns-وشهادات-https">الخطوة 2: فعّل MagicDNS وشهادات HTTPS</h2>
<p>في <a href="https://login.tailscale.com/admin">وحدة تحكم إدارة Tailscale</a>، تأكد من أن كليهما مفعّل:</p>
<ol>
<li><strong>MagicDNS</strong>، لتحصل الأجهزة على أسماء مثل <code>openclaw.your-tailnet.ts.net</code>.</li>
<li><strong>شهادات HTTPS (HTTPS Certificates)</strong>، تحت <strong>DNS → شهادات HTTPS</strong>. يستخدمها Tailscale لمنح البوابة شهادة حقيقية.</li>
</ol>
<h2 id="الخطوة-3-تأكد-من-أن-البوابة-تتطلب-المصادقة">الخطوة 3: تأكد من أن البوابة تتطلب المصادقة</h2>
<p>لا يمكن الجمع بين Serve و<code>gateway.auth.mode: &quot;none&quot;</code>. تحقق من أن لديك رمزًا (وهو الافتراضي)، أو كلمة مرور، أو مصادقة عبر وسيط موثوق مضبوطة. وإن لم يكن لديك رمز بعد، فولّد واحدًا:</p>
<pre><code class="language-bash">openclaw doctor --generate-gateway-token
</code></pre>
<p>أو افعلها بنفسك:</p>
<pre><code class="language-bash">openssl rand -hex 32
</code></pre>
<p>استخدم قيمة عشوائية طويلة. فالتدقيق الأمني يبلّغ عن الأسرار الأقصر من 24 حرفًا، ويرفض بدء التشغيل الرموز الفارغة، والسلاسل الحرفية <code>undefined</code> و<code>null</code>، والعناصر النائبة في الأمثلة.</p>
<p>فضّل متغير البيئة <code>OPENCLAW_GATEWAY_TOKEN</code> على كتابة السر في ملف الإعدادات، حتى لا ينتهي به الأمر في مستودع أبدًا.</p>
<h2 id="الخطوة-4-وجه-البوابة-إلى-tailscale-serve">الخطوة 4: وجّه البوابة إلى Tailscale Serve</h2>
<p>على مضيف البوابة:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> gateway.bind loopback
openclaw config <span class="hljs-built_in">set</span> gateway.tailscale.mode serve
openclaw gateway restart
</code></pre>
<p>هذا هو الإعداد كله. وإن كنت تفضّل تعديل <code>~/.openclaw/openclaw.json</code> مباشرة، فهو يبدو هكذا:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  gateway<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    bind<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;loopback&#x27;</span><span class="hljs-punctuation">,</span>
    tailscale<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> mode<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;serve&#x27;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>خلف الكواليس، يطلب OpenClaw من Tailscale تقديم HTTPS على المنفذ <code>443</code> وتمريره عبر وسيط (proxy) إلى مستمع محلي خاص تملكه البوابة. يُنهي Tailscale اتصال TLS؛ ولا تواجه البوابة الشبكة مباشرة أبدًا. ويبقى المستمع العادي على <code>127.0.0.1:18789</code> للبرامج على الجهاز نفسه.</p>
<blockquote>
<p><strong>قد يكون الطلب الأول بطيئًا</strong></p>
<p>قد يستغرق أول طلب HTTPS بعد تفعيل Serve بعض الوقت لأن الشهادة قيد الإصدار. دعه يكتمل ثم حاول مجددًا.</p>
</blockquote>
<h2 id="الخطوة-5-اسمح-لأجهزتك-بالوصول-إلى-البوابة">الخطوة 5: اسمح لأجهزتك بالوصول إلى البوابة</h2>
<p>يطيع Serve سياسة الوصول في شبكة tailnet لديك. وإن لم تسمح سياستك بذلك، يعمل العنوان على مضيف البوابة <strong>بينما تنتهي المهلة بصمت في كل مكان آخر</strong>. وهذا هو السبب الأول وراء عبارة «لا يعمل».</p>
<p>في وحدة تحكم الإدارة، افتح <strong>ضوابط الوصول (Access Controls)</strong> واسمح لأجهزتك بالوصول إلى مضيف البوابة على منفذ TCP <code>443</code>. وبصيغة المنح (grants) الحديثة، أضف مدخلًا إلى مصفوفة <code>grants</code> الموجودة:</p>
<pre><code class="language-json5"><span class="hljs-comment">// Tailscale policy files are HuJSON, so these // comments are valid</span>
<span class="hljs-punctuation">{</span> src<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;autogroup:member&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> dst<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;&lt;gateway-host-or-ip&gt;&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ip<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;tcp:443&#x27;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span>
</code></pre>
<p>وعلى سياسة أقدم بنمط ACL، أضف هذا إلى مصفوفة <code>acls</code> بدلًا من ذلك:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span> action<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;accept&#x27;</span><span class="hljs-punctuation">,</span> src<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;autogroup:member&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> dst<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;&lt;gateway-host-or-ip&gt;:443&#x27;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span>
</code></pre>
<p>يعني <code>autogroup:member</code> كل من على شبكة tailnet لديك. وإن شاركها آخرون، فضيِّق <code>src</code> إلى مستخدم أو مجموعة أو وسم محدّد يغطي فقط الأجهزة التي ينبغي أن تملك الوصول.</p>
<h2 id="الخطوة-6-تحقق-من-نجاح-الأمر">الخطوة 6: تحقق من نجاح الأمر</h2>
<p>أولًا، على مضيف البوابة، تحقق من وجود المسار:</p>
<pre><code class="language-bash">tailscale serve status
</code></pre>
<p>ينبغي أن ترى مسار HTTPS للعنوان <code>https://&lt;host&gt;.&lt;tailnet&gt;.ts.net</code> يمرّ عبر وسيط إلى منفذ محلي خاص تملكه البوابة. تلك هي النتيجة المتوقعة. وهو <strong>لا</strong> يشير مباشرة إلى المنفذ 18789.</p>
<p>بعد ذلك، من جهاز <strong>مختلف</strong> على شبكة tailnet لديك:</p>
<pre><code class="language-bash">curl -sS -o /dev/null -w <span class="hljs-string">&#x27;%{http_code}\\n&#x27;</span> https://&lt;host&gt;.&lt;tailnet&gt;.ts.net/
</code></pre>
<p>ينبغي أن تحصل على <code>200</code>. وإن انتهت المهلة من أجهزة أخرى بينما يعمل على مضيف البوابة، فارجع إلى الخطوة 5.</p>
<p>وأخيرًا، أثبت أن البوابة لم تفتح منفذًا خاصًا بها:</p>
<pre><code class="language-bash">lsof -nP -iTCP:18789 -sTCP:LISTEN
</code></pre>
<p>يجب أن يكون المستمع على <code>127.0.0.1:18789</code>. وإن رأيت <code>0.0.0.0</code>، أو عنوان شبكة محلية (LAN)، أو عنوان tailnet، فقد ذهبت خاصية صفر المنافذ المفتوحة بالفعل. وعلى Linux يمكنك أيضًا سرد كل ما يستمع خارج الواجهة المحلية:</p>
<pre><code class="language-bash"><span class="hljs-built_in">sudo</span> ss -tlnp | grep -v <span class="hljs-string">&#x27;127.0.0.1\\|::1&#x27;</span>
</code></pre>
<h2 id="الخطوة-7-صل-أجهزتك">الخطوة 7: صِل أجهزتك</h2>
<p>كل شيء يستخدم العنوان نفسه. افتحه في متصفح للوصول إلى واجهة التحكم (Control UI):</p>
<pre><code>https://&lt;host&gt;.&lt;tailnet&gt;.ts.net
</code></pre>
<p>وبالنسبة للعملاء الذين يتحدثون WebSocket، بدّل المخطّط (scheme):</p>
<pre><code>wss://&lt;host&gt;.&lt;tailnet&gt;.ts.net
</code></pre>
<ul>
<li><strong>تطبيق macOS:</strong> اذهب إلى <strong>الإعدادات (Settings) → الاتصال (Connection) → بعيد (Remote — مضيف آخر) → مباشر (Direct — ws/wss)</strong> وأدخل عنوان <code>wss://</code>.</li>
<li><strong>تطبيقا iOS وAndroid:</strong> وجّههما إلى عنوان <code>wss://</code> نفسه. فليس فيهما خيار نفق SSH، ما يجعل Serve الطريقة العملية للوصول إلى بوابة بعيدة من هاتف.</li>
<li><strong>العُقد المقترنة:</strong> تستخدم العُقد نقطة نهاية WebSocket نفسها في البوابة، لذا هذا هو العنوان الذي ستدخله في <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">الاتصال بـ OpenClaw بعيد كعقدة مقترنة</a>.</li>
</ul>
<p>ما زال كل جهاز جديد يحتاج إلى هويته الخاصة وإلى موافقة. فالشبكة الخاصة توصل الجهاز إلى الباب الأمامي، لكنها لا تتخطى القفل.</p>
<h2 id="اختياري-سجل-الدخول-بهوية-tailscale">اختياري: سجّل الدخول بهوية Tailscale</h2>
<p>مع Serve، يستطيع OpenClaw أن يتعرّف على هويتك من Tailscale نفسه بدل طلب الرمز المشترك في كل مرة. فهو يفحص الطلب مقابل الخادم الخفي المحلي لـ Tailscale (<code>tailscale whois</code>)، لذا لا يستطيع أي عميل تزوير الهوية.</p>
<p>هذا مفعّل افتراضيًا عندما تستخدم Serve مع مصادقة الرمز، ويتحكم فيه <code>gateway.auth.allowTailscale</code>. وهو أضيق مما يبدو:</p>
<ul>
<li>يغطي تسجيل الدخول إلى واجهة التحكم فقط.</li>
<li>نقاط نهاية HTTP API (<code>/v1/*</code>، و<code>/tools/invoke</code>، و<code>/api/channels/*</code>) <strong>لا</strong> تستخدمه أبدًا. فهي تتبع دائمًا المصادقة المضبوطة لديك.</li>
<li>لا يحل محل هوية الجهاز. فالمتصفح الذي يملك هوية جهاز بالفعل يمكنه تخطي رمز الاقتران (pairing code) لمرة واحدة، لكن العملاء الذين لا يملكونها يُرفضون رغم ذلك، واتصالات العُقد (nodes) يجب أن تُقترن كذلك.</li>
</ul>
<p>وهو يفترض أيضًا أنك تثق بمضيف البوابة. وإن كان يمكن لشيفرة غير موثوقة أن تعمل على ذلك الجهاز، فأوقفه واطلب الرمز أو كلمة المرور:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> gateway.auth.allowTailscale <span class="hljs-literal">false</span>
</code></pre>
<h2 id="دقق-في-مدى-تعرضك">دقّق في مدى تعرّضك</h2>
<p>شغّل التدقيق المدمج، ثم تحقق مجددًا من جهة Tailscale:</p>
<pre><code class="language-bash">openclaw security audit
tailscale serve status --json
lsof -nP -iTCP:18789 -sTCP:LISTEN
</code></pre>
<p>ينبغي أن يُبلّغ <code>openclaw status</code> عن تعرّض Tailscale بالقيمة <code>serve</code> (أو <code>off</code>)، وليس <code>funnel</code> أبدًا. ووجود Funnel عام أو ربط على شبكة محلية (LAN) نتيجة يطلب منك التدقيق إصلاحها فورًا.</p>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<table>
<thead>
<tr>
<th>العرَض</th>
<th>أول ما تفحصه</th>
</tr>
</thead>
<tbody>
<tr>
<td>يعمل العنوان على مضيف البوابة وليس في مكان آخر</td>
<td>سياسة الوصول إلى TCP <code>443</code> من الخطوة 5</td>
</tr>
<tr>
<td>تفشل البوابة في البدء مع Serve</td>
<td>وضع المصادقة ليس <code>none</code>، والخادم الخفي لـ Tailscale يعمل ومسجَّل الدخول</td>
</tr>
<tr>
<td>يتوقف الطلب الأول دون استجابة</td>
<td>إصدار الشهادة. انتظر ثم أعد المحاولة</td>
</tr>
<tr>
<td>لا يُتعرَّف على <code>tailscale serve</code></td>
<td>حدّث Tailscale. فقد تغيّرت أداة Serve في الإصدار 1.52</td>
</tr>
<tr>
<td><code>proxy_attribution_required</code></td>
<td>أنت تشغّل مسار <code>tailscale serve</code> خاصًا بك. راجع الملاحظة أدناه</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>دع OpenClaw يدير Serve</strong></p>
<p>ضبط <code>gateway.tailscale.mode</code> على <code>serve</code> يتيح لـ OpenClaw إعداد Tailscale بنفسه. وإن وجّهت بدلًا من ذلك مسار <code>tailscale serve</code> <em>الخاص بك</em> إلى مستمع البوابة العادي، سيعامله OpenClaw كوسيط موثوق عام: ستحتاج إلى ضبط <code>gateway.trustedProxies</code> بضيق، والتأكد من أن الوسيط يكتب فوق <code>X-Forwarded-For</code>، والإبقاء على مصادقة الرمز أو كلمة المرور. ولا ينطبق هناك تسجيل الدخول بهوية Tailscale. وإن لم يكن لديك سبب، فدع OpenClaw يقوم بذلك.</p>
</blockquote>
<p>وهناك أمران آخران يستحقان المعرفة:</p>
<ul>
<li><strong><code>mode: &quot;off&quot;</code> لا يوقف Tailscale.</strong> فهو يعني فقط أن OpenClaw لا يدير Serve أو Funnel. ويستمر الخادم الخفي، وأي مسار أنشأته بنفسك، في العمل. افحص <code>tailscale serve status</code> بدل الوثوق بالإعدادات.</li>
<li><strong>ترتيب الإقلاع.</strong> إذا بدأت البوابة قبل أن يتصل الخادم الخفي لـ Tailscale، فإنها تنتظر حتى 90 ثانية قبل أن تستسلم.</li>
</ul>
<blockquote>
<p><strong>الأوامر والأعلام تتغير</strong></p>
<p>يطابق هذا الدرس OpenClaw <code>2026.9.8</code>. وإن لم يتصرف شيء كما هو موصوف، فشغّل الأمر مع <code>--help</code> واطّلع على <a href="https://docs.openclaw.ai/gateway/tailscale">وثائق OpenClaw</a>.</p>
</blockquote>
`,o={book:n,chapter:s,chapterTitle:a,slug:e,title:t,headings:l,html:c};export{n as book,s as chapter,a as chapterTitle,o as default,l as headings,c as html,e as slug,t as title};
