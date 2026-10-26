const n="kinney",s="openclaw",a="OpenClaw: مساعدك الذكي الشخصي",o="choosing-a-dm-policy",t="اختيار سياسة الرسائل المباشرة",e=[{depth:2,id:"السياسات-الأربع",text:"السياسات الأربع"},{depth:3,id:"pairing",text:"pairing"},{depth:3,id:"allowlist",text:"allowlist"},{depth:3,id:"open",text:"open"},{depth:3,id:"disabled",text:"disabled"},{depth:2,id:"السماح-لمرسل-مقبول-بالدخول-ليس-جعله-مالكا",text:"السماح لمرسل مقبول بالدخول ليس جعله مالكًا"},{depth:2,id:"معدل-آخر-نطاق-الجلسة-session-scope",text:"مُعدّل آخر: نطاق الجلسة (Session Scope)"},{depth:2,id:"توصيتنا",text:"توصيتنا"}],p=`<p>عندما <a href="https://stevekinney.com/courses/openclaw/adding-telegram-as-a-channel">تضيف قناة</a>، فأنت تمنح وكيلك بابًا أماميًا يمكن لأي شخص على تلك المنصة أن يطرقه. روبوتات Telegram عامة بالاسم. تطبيقات Slack يمكن لمن في مساحة العمل مراسلتها. رقم هاتف يمكنه تلقي رسالة من أي شخص.</p>
<p>لذلك تملك كل قناة <strong>سياسة رسائل مباشرة (DM policy)</strong> تقرر ما يحدث عندما يرسل شخص لم توافق عليه رسالة مباشرة إلى وكيلك. تُضبط بـ <code>dmPolicy</code>، وتقبل إحدى أربع قيم.</p>
<blockquote>
<p><strong>السياسة تتعلق بمن يدخل، لا بما يمكنه فعله</strong></p>
<p>سياسة الرسائل المباشرة تقرر فقط ما إذا كانت رسائل المرسل تصل إلى وكيلك. ما يُسمح لتلك المحادثة بفعله بعد ذلك يُتحكم به بشكل منفصل عبر <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">سياسة الأدوات والموافقات</a>. أنت بحاجة إلى كليهما.</p>
</blockquote>
<h2 id="السياسات-الأربع">السياسات الأربع</h2>
<table>
<thead>
<tr>
<th>السياسة</th>
<th>ما happens لمرسل غير معروف</th>
<th>لمن هي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pairing</code></td>
<td>يحصل على رمز إقران، وأنت توافق عليه</td>
<td>البداية، أو مجموعة صغيرة متغيرة</td>
</tr>
<tr>
<td><code>allowlist</code></td>
<td>يُتجاهل بصمت ما لم يكن في <code>allowFrom</code></td>
<td>الاستخدام اليومي من مجموعة معروفة من الأشخاص</td>
</tr>
<tr>
<td><code>open</code></td>
<td>أي شخص يمكنه التحدث إلى وكيلك</td>
<td>تقريبًا أبدًا</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td>جميع الرسائل المباشرة تُتجاهل</td>
<td>القنوات التي لا تستخدمها، أو تراجع طارئ</td>
</tr>
</tbody>
</table>
<p>تعيش السياسة تحت القناة التي تُطبق عليها، مثلًا <code>channels.telegram.dmPolicy</code>. إن لم تضبط حساب داخل قناة سياسة خاصة به، فإنه يرث قيمة القناة. القيمة الافتراضية هي <code>pairing</code>.</p>
<p>يمكنك أيضًا رؤيتها وتغييرها في واجهة التحكم (Control UI). افتح <em>القنوات</em> (Channels) في الإعدادات، انقر على القناة، وابحث عن عنصر التحكم بسياسة الرسائل المباشرة. إليك قناة Telegram على بوابة (gateway) ما زالت تستخدم الافتراضي:</p>
<p><img src="/arabic-cs-library/images/kinney/d97e8b0a8b6d04d6.webp" alt="إعدادات قناة Telegram في واجهة التحكم (Control UI) مع عنصر التحكم بسياسة Telegram DM Policy مضبوطًا على pairing، بجوار عنصر التحكم بسياسة المجموعة (Group Policy)"></p>
<p>القيم الأربع تشكل تقدمًا، لا قائمة من المتساوين. إليك ما يعنيه كل منها فعلًا.</p>
<h3 id="pairing"><code>pairing</code></h3>
<p>هذه هي الافتراضية. عندما يرسل شخص لم توافق عليه رسالة مباشرة، لا يصل إلى الوكيل. بدلًا من ذلك، يرد OpenClaw برسالة قصيرة تحتوي على معرّف المستخدم الخاص به، و<strong>رمز إقران</strong>، والأمر الذي تشغله للموافقة عليه. رأيت هذا في درس Telegram:</p>
<pre><code>openclaw pairing approve telegram &lt;code&gt;
</code></pre>
<p>تشغّل هذا الأمر على الجهاز الذي يستضيف البوابة (Gateway). بمجرد الموافقة، تصل رسائل المرسل.</p>
<p>توجد حتى يتمكن أول شخص من الدخول دون أن يعرف أحد معرّف مستخدمه مسبقًا. أرسلت رسالة إلى الروبوت، وأخبرك بمعرّفك، ثم وافقت على نفسك.</p>
<p>بعض الأمور التي يجب معرفتها:</p>
<ul>
<li>يمكنك رؤية طلبات الانتظار بـ <code>openclaw pairing list &lt;channel&gt;</code>.</li>
<li>تنتهي صلاحية رموز الإقران بعد نحو ساعة، لذا لا يمكن استرداد طلب قديم لاحقًا.</li>
<li>الموافقة عبر واجهة سطر الأوامر (CLI) تجعل <strong>الأول</strong> من الموافق عليهم مالك الأمر (command owner) إن لم يكن هناك مالك بعد. هذه هي النتيجة الصحيحة عندما يكون أول شخص أنت.</li>
</ul>
<blockquote>
<p><strong>تحقق من whom توافق</strong></p>
<p>رمز الإقران موثوق بقدر موافقتك. وافق فقط على الطلب الذي تتوقعه، مباشرة بعد أن أرسلت الرسالة بنفسك، وتأكد من أن معرّف المستخدم في الرد يطابق معرّفك. إن ظهر طلب لم تُشغّله، لا توافق عليه.</p>
</blockquote>
<h3 id="allowlist"><code>allowlist</code></h3>
<p>فقط المرسلون المدرّجون في <code>allowFrom</code> يُقبَلون. لا تحدٍّ ولا مطالبة. أي شخص آخر لا يُسمح له بالدخول.</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  channels<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    telegram<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      dmPolicy<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;allowlist&#x27;</span><span class="hljs-punctuation">,</span>
      allowFrom<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;telegram:123456789&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>كل إدخال هو المعرّف المعياري (canonical ID) للمرسل على تلك المنصة، وهو معرّف المستخدم الذي أظهره لك رسالة الإقران.</p>
<p>هناك تفصيلان مهمان:</p>
<ul>
<li><strong><code>allowFrom</code> فارغ يمنع الجميع.</strong> في Telegram، يرفض التحقق من الإعدادات (config validation) ذلك المزيج صراحة. في بعض القنوات الأخرى، مثل الرسائل النصية (SMS)، يسجل OpenClaw تحذيرًا فقط عند البدء، لذا من السهل أن تحبس نفسك خارجًا دون أن تلاحظ.</li>
<li><strong>يمكنك إعادة استخدام قائمة واحدة عبر القنوات.</strong> إن احتاج عدة أشخاص إلى الوصول، عرّف مجموعة وصول مسماة (named access group) مرة واحدة وارجع إليها من كل قناة بـ <code>allowFrom: ['accessGroup:operators']</code>، بدلًا من إبقاء ثلاث قوائم متزامنة يدويًا.</li>
</ul>
<h3 id="open"><code>open</code></h3>
<p>هذا يسمح لأي شخص يجد القناة بالدخول. لا يعمل كمفتاح واحد عمدًا: <code>open</code> يتطلب أيضًا أن تتضمن <code>allowFrom</code> <code>&quot;*&quot;</code>.</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  channels<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    telegram<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      dmPolicy<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;open&#x27;</span><span class="hljs-punctuation">,</span>
      allowFrom<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;*&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إن ضبطت <code>open</code> ونسيت حرف البدل (wildcard)، فتُغلق القناة (fail closed) بدلًا من أن تفتح. هذا يجعل «أي شخص قد يتحدث إلى وكيلي» قرارًا بيدَين (two-handed)، وهو المقصود.</p>
<p>لمساعد شخصي، هذا تقريبًا أبدًا ما تريده. أي شخص يكتشف روبوتك أو رقمك يتحدث إلى وكيل يمكنه قراءة ملفاتك واستخدام حساباتك.</p>
<h3 id="disabled"><code>disabled</code></h3>
<p>جميع الرسائل المباشرة تُتجاهل. هذا هو الإعداد المناسب لقناة اتصلت بها ولكنك لا تستخدمها، وأسرع طريقة لإغلاق باب إن اعتقدت أنك كشفت أكثر من اللازم.</p>
<p>لاحظ أنه يؤثر فقط على <em>الرسائل المباشرة</em>. حركة المجموعات والقنوات يُتحكم بها بشكل منفصل عبر <code>groupPolicy</code>، لذا <code>disabled</code> لا يعطل القناة نفسها.</p>
<h2 id="السماح-لمرسل-مقبول-بالدخول-ليس-جعله-مالكا">السماح لمرسل مقبول بالدخول ليس جعله مالكًا</h2>
<p>هناك منحتان مختلفتان يسهل خلطهما:</p>
<ul>
<li><strong>وصول المحادثة (Chat access)</strong> يقرر ما إذا كانت رسائل شخص ما تصل إلى الوكيل. هذا ما يتحكم به <code>dmPolicy</code> و<code>allowFrom</code>.</li>
<li><strong>ملكية الأمر (Command ownership)</strong> تقرر من يمكنه <em>إدارة</em> التثبيت: تشغيل <code>/update</code>، إعادة تشغيل البوابة، تغيير الإعدادات، والموافقة على الأوامر.</li>
</ul>
<p>إضافة شخص إلى <code>allowFrom</code> يدويًا تمنحه وصول المحادثة ولا شيء أكثر. يمكنه التحدث إلى الوكيل لكن أوامر المالك فقط سترفضه. عندما يحدث ذلك، يرد الوكيل بالأمر الدقيق <code>openclaw config set commands.ownerAllowFrom</code> لتشغيله.</p>
<p>الموافقة على طلب إقران عبر واجهة سطر الأوامر (CLI) هي الاستثناء: إن لم يكن هناك مالك بعد، تجعل ذلك الشخص الأول مالكًا. الموافقات اللاحقة تمنح وصول الرسائل المباشرة فقط.</p>
<h2 id="معدل-آخر-نطاق-الجلسة-session-scope">مُعدّل آخر: نطاق الجلسة (Session Scope)</h2>
<p>هناك إعداد آخر bearing &quot;DM&quot; في اسمه يسهل خلطه بالسياسة. <code>session.dmScope</code> لا يقرر <em>من</em> يدخل. يقرر ما إذا كان المرسلون المقبولون <strong>يشاركون محادثة</strong>.</p>
<table>
<thead>
<tr>
<th>القيمة</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>main</code> (افتراضي)</td>
<td>كل رسالة مباشرة، من الجميع، تهبط في جلسة الوكيل الرئيسية الواحدة</td>
</tr>
<tr>
<td><code>per-peer</code></td>
<td>كل مرسل يحصل على جلسته الخاصة</td>
</tr>
<tr>
<td><code>per-channel-peer</code></td>
<td>كل مرسل يحصل على جلسته الخاصة على كل قناة</td>
</tr>
<tr>
<td><code>per-account-channel-peer</code></td>
<td>نفسه، مفصول لكل حساب أيضًا</td>
</tr>
</tbody>
</table>
<p>بالقيمة الافتراضية، شخصان كلاهما مسموح لهما بمراسلة الوكيل يشاركان محادثة واحدة وتاريخًا واحدًا. هذا مقبول عندما يكون الشخص الوحيد أنت، وتسريب خصوصية عندما لا يكون كذلك.</p>
<p>أثر جانبي واحد يجب معرفته: قدرة الوكيل على تذكر الأشياء عبر محادثاتك الخاصة مفعلة افتراضيًا فقط ما دام <code>dmScope</code> غير مضبوط أو <code>main</code>. تفعيل العزل يعطل ذلك الافتراض.</p>
<h2 id="توصيتنا">توصيتنا</h2>
<p><strong>استخدم <code>pairing</code> للدخول، ثم انتقل إلى <code>allowlist</code> واتركه هناك.</strong></p>
<p>الإقران خطوة تمهيد (bootstrap)، لا سياسة دائمة. إن تركته مفعّلًا بعد أن وافقت على نفسك، فكل غريب يراسل الروبوت يتلقى مطالبة الإقران نفسها طالما وُجد الروبوت. هذا دعوة لمحاولة الهندسة الاجتماعية (social engineer) لموافقتك.</p>
<p>إليك التسلسل:</p>
<ol>
<li>اترك القناة على افتراضها، <code>pairing</code>.</li>
<li>راسل الروبوت بنفسك ودوّن معرّف المستخدم في الرد.</li>
<li>وافق على طلبك: <code><span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> pairing</span><span style="color:#ECC48D"> approve</span><span style="color:#ECC48D"> telegram</span><span style="color:#7FDBCA"> &lt;</span><span style="color:#ECC48D">cod</span><span style="color:#D6DEEB">e</span><span style="color:#7FDBCA">&gt;</span></span></code></li>
<li>سجّل معرّفك في <code>allowFrom</code> وانتقل إلى <code>allowlist</code>: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#ECC48D"> channels</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> telegram</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> dmPolicy</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">allowlist</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#ECC48D"> allowFrom</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">telegram:123456789</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code></li>
<li>تحقق من الملف، ثم أعد تشغيل البوابة: <code><span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> config</span><span style="color:#ECC48D"> validate</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> gateway</span><span style="color:#ECC48D"> restart</span></span></code></li>
<li><strong>اختبر الحالة السالبة.</strong> راسل الروبوت من حساب ثانٍ غير موجود في القائمة وتأكد من أنه لا يصل إلى أي مكان.</li>
</ol>
<p>الخطوة 6 هي التي يتجاوزها الناس. <code>openclaw channels status --probe</code> يتحقق فقط من أن الاتصال بالمنصة يعمل. لا يقول أي شيء عن ما إذا كانت سياستك تفعل ما تعتقد، لذا اختبر بزوج رسائل حقيقية: مقبولة مقابل مرفوضة.</p>
<p>ثم عدّل لتلائم وضعك:</p>
<table>
<thead>
<tr>
<th>وضعك</th>
<th>سياسة الرسائل المباشرة</th>
<th><code>session.dmScope</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>أنت فقط</td>
<td><code>allowlist</code> بمعرّفك</td>
<td>اترك الافتراضي</td>
</tr>
<tr>
<td>أنت وعدد قليل من الموثوقين</td>
<td><code>allowlist</code>، مثاليًا مجموعة وصول</td>
<td><code>per-channel-peer</code></td>
</tr>
<tr>
<td>قناة اتصلت بها ولكنك لا تستخدمها</td>
<td><code>disabled</code></td>
<td>لا يهم</td>
</tr>
<tr>
<td>تعتقد أن شيئًا مفرط التعرض</td>
<td><code>disabled</code> في كل مكان، الآن</td>
<td>لا يهم</td>
</tr>
<tr>
<td>روبوت عام للغرباء</td>
<td>لا. أنشئ وكيلًا منفصلًا، مغلقًا.</td>
<td><code>per-channel-peer</code></td>
</tr>
</tbody>
</table>
<p>وأيًّا اخترت، أبقِ الطبقة الثانية في مكانها. سياسة رسائل مباشرة ضيقة مع وكيل يسأل قبل تشغيل الأوامر أكثر أمانًا بكثير من أيّ منهما بمفرده. إن لم تكن قد فعلت ذلك بعد، فاضبطه كما هو موصوف في <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">الأمان والموافقات</a>.</p>
<blockquote>
<p><strong>الأوامر والأعلام تتغير</strong></p>
<p>هذا الدرس يطابق OpenClaw <code>2026.9.8</code>. إن لم يتصرف شيء كما هو موصوف، شغّل الأمر بـ <code>--help</code> وتحقق من <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,l={book:n,chapter:s,chapterTitle:a,slug:o,title:t,headings:e,html:p};export{n as book,s as chapter,a as chapterTitle,l as default,e as headings,p as html,o as slug,t as title};
