const e="missing-semester",t="security",a="الأمان والتشفير",s="index",i="الأمان والتشفير",n=[{depth:2,id:"التطبيقات",text:"التطبيقات"},{depth:2,id:"التطبيقات",text:"التطبيقات"},{depth:2,id:"التطبيقات",text:"التطبيقات"},{depth:2,id:"توزيع-المفاتيح-key-distribution",text:"توزيع المفاتيح (Key distribution)"},{depth:2,id:"مديرو-كلمات-المرور",text:"مديرو كلمات المرور"},{depth:2,id:"المصادقة-ثنائية-العوامل",text:"المصادقة ثنائية العوامل"},{depth:2,id:"تشفير-القرص-الكامل",text:"تشفير القرص الكامل"},{depth:2,id:"المراسلة-الخاصة",text:"المراسلة الخاصة"},{depth:2,id:"ssh",text:"SSH"}],o=`<p class="lecture-video"><iframe src="https://www.youtube-nocookie.com/embed/tjwobAmnKTo" title="الأمان والتشفير" loading="lazy" allowfullscreen></iframe></p>
<p>ركّزت <a href="/book/missing-semester/security/index">محاضرة الأمان والخصوصية</a> في العام الماضي على كيف يمكنك أن تكون أكثر أمانًا كمستخدمِ حاسوبٍ. أمّا هذا العام، فسنركّز على مفاهيم الأمان والتشفير ذات الصلة بفهم الأدوات التي غُطّيت سابقًا في هذا المقرر، مثل استخدام دوال التجزئة (hash functions) في Git، أو دوال اشتقاق المفاتيح (key derivation functions) وأنظمة التشفير المتماثل وغير المتماثل (symmetric/asymmetric cryptosystems) في SSH.</p>
<p>هذه المحاضرة ليست بديلًا عن مقررٍ أكثر صرامةً واكتمالًا في أمان أنظمة الحاسوب (<a href="https://css.csail.mit.edu/6.858/">6.858</a>) أو التشفير (<a href="https://courses.csail.mit.edu/6.857/">6.857</a> و6.875). لا تقم بأي عملٍ في مجال الأمان دون تدريبٍ رسميٍّ في الأمان. ما لم تكن خبيرًا، فلا <a href="https://www.schneier.com/blog/archives/2015/05/amateurs_produc.html">تخترع تشفيرك الخاص</a>. ينطبق المبدأ نفسه على أمان الأنظمة.</p>
<p>تتناول هذه المحاضرة معالجةً غير رسميةٍ جدًا (لكنها عمليةٌ في اعتقادنا) للمفاهيم الأساسية في التشفير. لن تكون هذه المحاضرة كافيةً لتعليمك كيفية <em>تصميم</em> أنظمةٍ آمنةٍ أو بروتوكولات تشفير، لكننا نأمل أن تكون كافيةً لتعطيك فهمًا عامًا للبرامج والبروتوكولات التي تستخدمها فعلًا.</p>
<h1>الإنتروبيا (Entropy)</h1>
<p><a href="https://en.wikipedia.org/wiki/Entropy_(information_theory)">الإنتروبيا</a> هي مقياسٌ للعشوائية. هذا مفيدٌ، على سبيل المثال، عند تحديد قوة كلمة المرور.</p>
<p><img src="https://imgs.xkcd.com/comics/password_strength.png" alt="XKCD 936: قوة كلمة المرور"></p>
<p>كما توضّح <a href="https://xkcd.com/936/">شريطة XKCD</a> أعلاه، فإن كلمة مرور مثل &quot;correcthorsebatterystaple&quot; أكثر أمانًا من مثل &quot;Tr0ub4dor&amp;3&quot;. لكن كيف تكمّم شيئًا كهذا؟</p>
<p>تُقاس الإنتروبيا بوحدة <em>البتات</em> (bits)، وعند الاختيار بشكلٍ عشوائيٍّ منتظمٍ من مجموعة النتائج المحتملة، تكون الإنتروبيا مساويةً لـ <code>log_2(عدد الاحتمالات)</code>. رمي عملةٍ عادلةٍ يعطي 1 بتٍ من الإنتروبيا. رمي نردةٍ (سداسية الأوجه) لديه ~2.58 بتٍ من الإنتروبيا.</p>
<p>يجب أن تعتبر أن المهاجم يعرف <em>نموذج</em> كلمة المرور، لكنه لا يعرف العشوائية (مثلًا من <a href="https://en.wikipedia.org/wiki/Diceware">رمي النرد</a>) المستخدمة لاختيار كلمة مرورٍ معيّنة.</p>
<p>كم عدد بتات الإنتروبيا الكافية؟ يعتمد ذلك على نموذج التهديد الخاص بك. للتخمين عبر الإنترنت، كما تشير شريطة XKCD، فإن ~40 بتًا من الإنتروبيا جيدةٌ جدًا. لمقاومة التخمين دون اتصالٍ بالإنترنت، ستكون هناك حاجةٌ إلى كلمة مرورٍ أقوى (مثل 80 بتًا أو أكثر).</p>
<h1>دوال التجزئة (Hash functions)</h1>
<p>تُرسم <a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">دالة التجزئة المشفّرة</a> بياناتٍ ذات حجمٍ عشوائيٍّ إلى حجمٍ ثابت، ولها خصائص خاصةٌ. المواصفة التقريبية لدالة التجزئة هي كما يلي:</p>
<pre><code>hash(value: array&lt;byte&gt;) -&gt; vector&lt;byte, N&gt;  (for some fixed N)
</code></pre>
<p>مثالٌ على دالة تجزئةٍ هو <a href="https://en.wikipedia.org/wiki/SHA-1">SHA1</a>، والتي تُستخدم في Git. إنها ترسم مدخلاتٍ ذات أحجامٍ عشوائيةٍ إلى مخرجاتٍ من 160 بتًا (والتي يمكن تمثيلها بـ40 حرفًا سداسيًا عشريًا). يمكننا تجربة تجزئة SHA1 على مدخلٍ باستخدام الأمر <code>sha1sum</code>:</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">printf</span> <span class="hljs-string">&#x27;hello&#x27;</span> | <span class="hljs-built_in">sha1sum</span></span>
aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">printf</span> <span class="hljs-string">&#x27;hello&#x27;</span> | <span class="hljs-built_in">sha1sum</span></span>
aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">printf</span> <span class="hljs-string">&#x27;Hello&#x27;</span> | <span class="hljs-built_in">sha1sum</span></span>
f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0
</code></pre>
<p>على مستوىً عالٍ، يمكن التفكير في دالة التجزئة كدالةٍ يصعب عكسها وتبدو عشوائيةً (لكنها حتمية) (وهذا هو <a href="https://en.wikipedia.org/wiki/Random_oracle">النموذج المثالي لدالة التجزئة</a>). تمتلك دالة التجزئة الخصائص التالية:</p>
<ul>
<li>حتمية (Deterministic): نفس المدخل يولّد دائمًا نفس المخرج.</li>
<li>غير قابلةٍ للعكس (Non-invertible): من الصعب إيجاد مدخلٍ <code>m</code> بحيث <code>hash(m) = h</code> لمخرجٍ مرغوبٍ <code>h</code> معيّن.</li>
<li>مقاومة اصطدام الهدف (Target collision resistant): بمعلومية مدخلٍ <code>m_1</code>، من الصعب إيجاد مدخلٍ مختلفٍ <code>m_2</code> بحيث <code>hash(m_1) = hash(m_2)</code>.</li>
<li>مقاومة الاصطدام (Collision resistant): من الصعب إيجاد مدخلين <code>m_1</code> و<code>m_2</code> بحيث <code>hash(m_1) = hash(m_2)</code> (لاحظ أن هذه خاصيةٌ أقوى بصرامةٍ من مقاومة اصطدام الهدف).</li>
</ul>
<p>ملاحظة: على الرغم من أنه قد يعمل لأغراضٍ معيّنة، فإن SHA-1 <a href="https://web.archive.org/web/20260207211148/https://shattered.io/">لم يعد</a> يُعتبر دالة تجزئةٍ مشفّرةٍ قوية. قد تجد هذا الجدول الخاص بـ<a href="https://valerieaurora.org/hash.html">أعمار دوال التجزئة المشفّرة</a> مثيرًا للاهتمام. لكن لاحظ أن التوصية بدوال تجزئةٍ معيّنة خارج نطاق هذه المحاضرة. إذا كنت تقوم بعملٍ يهمّ فيه هذا الأمر، فأنت بحاجةٍ إلى تدريبٍ رسميٍّ في الأمان/التشفير.</p>
<h2 id="التطبيقات">التطبيقات</h2>
<ul>
<li>Git، للتخزين الموجّه بالمحتوى (content-addressed storage). فكرة <a href="https://en.wikipedia.org/wiki/Hash_function">دالة التجزئة</a> مفهومٌ أكثر عموميةً (هناك دوال تجزئةٍ غير مشفّرة). لماذا يستخدم Git دالة تجزئةٍ مشفّرة؟</li>
<li>ملخصٌ قصيرٌ لمحتويات الملف. غالبًا ما يمكن تنزيل البرمجيات من خوادم مرآةٍ (مترجّحةٍ ربما) (potentially less trustworthy mirrors)، مثل صور Linux ISO، وسيكون من الجيد ألا تضطر إلى الثقة بها. تنشر المواقع الرسمية عادةً التجزئات إلى جانب روابط التنزيل (التي تشير إلى خوادم مرآةٍ تابعةٍ لجهاتٍ ثالثة)، بحيث يمكن التحقق من التجزئة بعد تنزيل الملف.</li>
<li><a href="https://en.wikipedia.org/wiki/Commitment_scheme">مخططات الالتزام</a>. لنفترض أنك تريد الالتزام بقيمةٍ معيّنة، لكنك تكشف القيمة نفسها لاحقًا. على سبيل المثال، أريد إجراء قرعة عملةٍ عادلةٍ &quot;في رأسي&quot;، دون عملةٍ مشتركةٍ موثوقةٍ يمكن لطرفين رؤيتها. يمكنني اختيار قيمةٍ <code>r = random()</code>، ثم مشاركة <code>h = sha256(r)</code>. بعدها يمكنك أن تقول &quot;صورة&quot; أو &quot;كتابة&quot; (سنتفق على أن <code>r</code> الزوجي يعني صورة، و<code>r</code> الفردي يعني كتابة). بعد اختيارك، يمكنني كشف قيمتي <code>r</code>، ويمكنك تأكيد أنني لم أغشّ بالتحقق من أن <code>sha256(r)</code> يطابق التجزئة التي شاركتها سابقًا.</li>
</ul>
<h1>دوال اشتقاق المفاتيح (Key derivation functions)</h1>
<p>مفهومٌ ذو صلةٍ بالتجزئات المشفّرة، <a href="https://en.wikipedia.org/wiki/Key_derivation_function">دوال اشتقاق المفاتيح</a> (KDFs) تُستخدم لعددٍ من التطبيقات، بما في ذلك إنتاج مخرجاتٍ ذات طولٍ ثابتٍ لاستخدامها كمفاتيحٍ في خوارزميات تشفيرٍ أخرى. عادةً، تكون KDFs بطيئةً عن قصد، من أجل إبطاء هجمات القوة الغاشمة دون اتصالٍ بالإنترنت.</p>
<h2 id="التطبيقات">التطبيقات</h2>
<ul>
<li>إنتاج مفاتيح من عبارات المرور (passphrases) لاستخدامها في خوارزميات تشفيرٍ أخرى (مثل التشفير المتماثل، انظر أدناه).</li>
<li>تخزين بيانات اعتماد تسجيل الدخول. تخزين كلمات المرور كنصٍّ صريحٍ أمرٌ سيئ؛ النهج الصحيح هو توليد وتخزين <a href="https://en.wikipedia.org/wiki/Salt_(cryptography)">ملحٍ</a> عشوائيٍّ <code>salt = random()</code> لكل مستخدمٍ، وتخزين <code>KDF(password + salt)</code>، والتحقق من محاولات تسجيل الدخول بإعادة حساب KDF بإعطاء كلمة المرور المُدخلة والملح المخزّن.</li>
</ul>
<h1>التشفير المتماثل (Symmetric cryptography)</h1>
<p>إخفاء محتويات الرسائل ربما يكون أول مفهومٍ يخطر ببالك عندما تفكر في التشفير. يحقق التشفير المتماثل ذلك بالمجموعة الوظيفية التالية:</p>
<pre><code>keygen() -&gt; key  (this function is randomized)

encrypt(plaintext: array&lt;byte&gt;, key) -&gt; array&lt;byte&gt;  (the ciphertext)
decrypt(ciphertext: array&lt;byte&gt;, key) -&gt; array&lt;byte&gt;  (the plaintext)
</code></pre>
<p>لدالة التشفير (encrypt) الخاصية التالية: بمعلومية المخرج (النص المشفَّر)، من الصعب تحديد المدخل (النص الصريح) دون المفتاح. ودالة فك التشفير (decrypt) لها خاصية الصحة الواضحة، وهي أن <code>decrypt(encrypt(m, k), k) = m</code>.</p>
<p>مثالٌ على نظام تشفيرٍ متماثلٍ واسع الاستخدام اليوم هو <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">AES</a>.</p>
<h2 id="التطبيقات">التطبيقات</h2>
<ul>
<li>تشفير الملفات لتخزينها في خدمة سحابيةٍ غير موثوقة. يمكن دمج هذا مع KDFs، بحيث يمكنك تشفير ملفٍ بعبارة مرور. ولّد <code>key = KDF(passphrase)</code> ثم خزّن <code>encrypt(file, key)</code>.</li>
</ul>
<h1>التشفير غير المتماثل (Asymmetric cryptography)</h1>
<p>يشير المصطلح &quot;غير متماثل&quot; إلى وجود مفتاحين لهما دورين مختلفين. المفتاح الخاص (private key)، كما يوحي اسمه، يُقصد إبقاؤه خاصًا، بينما يمكن مشاركة المفتاح العام (public key) علنًا ولن يؤثر ذلك على الأمان (بخلاف مشاركة المفتاح في نظامٍ متماثل). توفر أنظمة التشفير غير المتماثل المجموعة الوظيفية التالية، للتشفير/فك التشفير وللتوقيع/التحقق:</p>
<pre><code>keygen() -&gt; (public key, private key)  (this function is randomized)

encrypt(plaintext: array&lt;byte&gt;, public key) -&gt; array&lt;byte&gt;  (the ciphertext)
decrypt(ciphertext: array&lt;byte&gt;, private key) -&gt; array&lt;byte&gt;  (the plaintext)

sign(message: array&lt;byte&gt;, private key) -&gt; array&lt;byte&gt;  (the signature)
verify(message: array&lt;byte&gt;, signature: array&lt;byte&gt;, public key) -&gt; bool  (whether or not the signature is valid)
</code></pre>
<p>لدوال التشفير/فك التشفير خصائص مشابهةٌ لنظيراتها في الأنظمة المتماثلة. يمكن تشفير رسالةٍ باستخدام المفتاح <em>العام</em>. بمعلومية المخرج (النص المشفَّر)، من الصعب تحديد المدخل (النص الصريح) دون المفتاح <em>الخاص</em>. ودالة فك التشفير لها خاصية الصحة الواضحة، وهي أن <code>decrypt(encrypt(m, public key), private key) = m</code>.</p>
<p>يمكن مقارنة التشفير المتماثل وغير المتماثل بالأقفال المادية. النظام المتماثل مثل قفل الباب: أي شخصٍ يملك المفتاح يمكنه قفله وفتحه. التشفير غير المتماثل مثل قفلٍ معلّقٍ مع مفتاح. يمكنك إعطاء القفل المفتوح لشخصٍ ما (المفتاح العام)، ويمكنه وضع رسالةٍ في صندوقٍ ثم وضع القفل، وبعد ذلك، لن تتمكن إلا أنت من فتح القفل لأنك احتفظت بالمفتاح (المفتاح الخاص).</p>
<p>لدوال التوقيع/التحقق الخصائص نفسها التي تتمنى أن تكون للتوقيعات المادية، من حيث صعوبة تزوير التوقيع. مهما كانت الرسالة، دون المفتاح <em>الخاص</em>، من الصعب إنتاج توقيعٍ بحيث يُرجع <code>verify(message, signature, public key)</code> صحيحًا. وبالطبع، لدالة التحقق خاصية الصحة الواضحة، وهي أن <code>verify(message, sign(message, private key), public key) = true</code>.</p>
<h2 id="توزيع-المفاتيح-key-distribution">توزيع المفاتيح (Key distribution)</h2>
<p>التشفير غير المتماثل رائع، لكنه يواجه تحديًا كبيرًا في توزيع المفاتيح العامة / ربط المفاتيح العامة بالهويات في العالم الحقيقي. هناك حلولٌ عديدةٌ لهذه المشكلة. تمتلك Signal حلًا بسيطًا: الثقة عند أول استخدام (trust on first use)، ودعم تبادل المفاتيح العامة خارج النطاق (out-of-band) (تتحقق من &quot;أرقام الأمان&quot; safety numbers الخاصة بأصدقائك شخصيًا). وتمتلك PGP حلًا مختلفًا، وهو <a href="https://en.wikipedia.org/wiki/Web_of_trust">شبكة الثقة</a>. وتمتلك Keybase حلاً آخر هو <a href="https://keybase.io/blog/chat-apps-softer-than-tofu">الإثبات الاجتماعي</a> (إلى جانب أفكارٍ أخرى لطيفة). لكل نموذجٍ مزاياه؛ نحن (المدرّسون) نفضّل نموذج Keybase.</p>
<h1>دراسات حالة (Case studies)</h1>
<h2 id="مديرو-كلمات-المرور">مديرو كلمات المرور</h2>
<p>هذه أداةٌ أساسيةٌ يجب على الجميع محاولة استخدامها (مثل <a href="https://keepassxc.org/">KeePassXC</a> و<a href="https://git.zx2c4.com/password-store/about/">pass</a> و<a href="https://1password.com">1Password</a>). يجعل مديرو كلمات المرور من المناسب استخدام كلمات مرورٍ فريدةٍ وعشوائيةٍ عالية الإنتروبيا لجميع عمليات تسجيل الدخول، ويحفظون جميع كلمات مرورك في مكانٍ واحدٍ مشفّرٍ بتشفيرٍ متماثلٍ بمفتاحٍ منتجٍ من عبارة مرورٍ باستخدام KDF.</p>
<p>استخدام مدير كلمات المرور يتيح لك تجنب إعادة استخدام كلمات المرور (لذا تتأثر أقل عندما تُخترق المواقع)، واستخدام كلمات مرورٍ عالية الإنتروبيا (لذا تقل احتمالية اختراقك)، وتحتاج فقط إلى تذكّر كلمة مرورٍ واحدةٍ عالية الإنتروبيا.</p>
<h2 id="المصادقة-ثنائية-العوامل">المصادقة ثنائية العوامل</h2>
<p>تتطلب <a href="https://en.wikipedia.org/wiki/Multi-factor_authentication">المصادقة ثنائية العوامل</a> (2FA) منك استخدام عبارة مرور (&quot;شيء تعرفه&quot;) إلى جانب أداة مصادقة 2FA (مثل <a href="https://www.yubico.com/">YubiKey</a> — &quot;شيء تملكه&quot;) من أجل الحماية من كلمات المرور المسروقة وهجمات <a href="https://en.wikipedia.org/wiki/Phishing">التصيّد</a>.</p>
<h2 id="تشفير-القرص-الكامل">تشفير القرص الكامل</h2>
<p>إبقاء قرص حاسوبك المحمول مشفّرًا بالكامل طريقةٌ سهلةٌ لحماية بياناتك في حالة سرقة حاسوبك. يمكنك استخدام <a href="https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_a_non-root_file_system">cryptsetup + LUKS</a> على لينكس، أو <a href="https://fossbytes.com/enable-full-disk-encryption-windows-10/">BitLocker</a> على ويندوز، أو <a href="https://support.apple.com/en-us/HT204837">FileVault</a> على macOS. هذا يشفر القرص بأكمله بتشفيرٍ متماثلٍ، بمفتاحٍ محميٍّ بعبارة مرور.</p>
<h2 id="المراسلة-الخاصة">المراسلة الخاصة</h2>
<p>استخدم <a href="https://signal.org/">Signal</a> أو <a href="https://keybase.io/">Keybase</a>. يُبنى الأمان من طرفٍ إلى طرفٍ انطلاقًا من تشفير المفاتيح غير المتماثلة. الحصول على المفاتيح العامة لجهات اتصالك هو الخطوة الحاسمة هنا. إذا أردت أمانًا جيدًا، فأنت بحاجةٍ إلى مصادقة المفاتيح العامة خارج النطاق (مع Signal أو Keybase)، أو الثقة بالإثباتات الاجتماعية (مع Keybase).</p>
<h2 id="ssh">SSH</h2>
<p>لقد غطّينا استخدام SSH ومفاتيح SSH في <a href="/book/missing-semester/command-line-environment/index">محاضرةٍ سابقة</a>. لننظر إلى الجوانب التشفيرية لهذا.</p>
<p>عندما تشغّل <code>ssh-keygen</code>، فإنه يولّد زوج مفاتيحٍ غير متماثل، <code>public_key, private_key</code>. يولَّد هذا بشكلٍ عشوائيٍّ، باستخدام إنتروبيا يوفّرها نظام التشغيل (مجمّعةً من أحداثٍ عتاديةٍ، إلخ). يُخزَّن المفتاح العام كما هو (إنه عام، لذا فإبقاؤه سرًا ليس مهمًا)، لكن في حالة السكون، يجب تشفير المفتاح الخاص على القرص. يطالب برنامج <code>ssh-keygen</code> المستخدم بعبارة مرور، ويُمرَّر ذلك عبر دالة اشتقاق مفاتيحٍ لإنتاج مفتاحٍ، يُستخدم بعد ذلك لتشفير المفتاح الخاص بتشفيرٍ متماثل.</p>
<p>أثناء الاستخدام، بمجرد أن يعرف الخادم المفتاح العام للعميل (المخزّن في ملف <code>.ssh/authorized_keys</code>)، يمكن للعميل المتصل إثبات هويته باستخدام التوقيعات غير المتماثلة. يتم ذلك عبر <a href="https://en.wikipedia.org/wiki/Challenge%E2%80%93response_authentication">الاستجابة للتحدي</a>. على مستوىً عالٍ، يختار الخادم رقمًا عشوائيًا ويرسله إلى العميل. يوقّع العميل بعد ذلك هذه الرسالة ويرسل التوقيع إلى الخادم، الذي يتحقق من التوقيع مقابل المفتاح العام المسجَّل. هذا يثبت بفعاليةٍ أن العميل يملك المفتاح الخاص المطابق للمفتاح العام الموجود في ملف <code>.ssh/authorized_keys</code> الخاص بالخادم، لذا يمكن للخادم السماح للعميل بتسجيل الدخول.</p>
<h1>الموارد</h1>
<ul>
<li><a href="/book/missing-semester/security/index">ملاحظات العام الماضي</a>: من حين كانت هذه المحاضرة تركّز أكثر على الأمان والخصوصية كمستخدمِ حاسوبٍ</li>
<li><a href="https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html">الإجابات التشفيرية الصحيحة</a>: تجيب عن سؤال &quot;أيّ تشفيرٍ يجب أن أستخدمه لـX؟&quot; للعديد من X الشائعة.</li>
</ul>
<div class="exercises"><h1>تمارين</h1>
<ol>
<li><strong>الإنتروبيا.</strong>
<ol>
<li>لنفترض أن كلمة مرورٍ تُختار كتراصٍّ لأربع كلماتٍ قاموسيةٍ صغيرة (lower-case)، حيث تُختار كل كلمةٍ بشكلٍ عشوائيٍّ منتظمٍ من قاموسٍ حجمه 100,000. مثالٌ على هذه الكلمة هو <code>correcthorsebatterystaple</code>. كم عدد بتات الإنتروبيا التي تمتلكها؟</li>
<li>فكّر في مخططٍ بديلٍ حيث تُختار كلمة المرور كتسلسلٍ من 8 محارفٍ أبجديةٍ رقميةٍ عشوائيةٍ (تشمل الحروف الصغيرة والكبيرة). مثالٌ <code>rg8Ql34g</code>. كم عدد بتات الإنتروبيا التي تمتلكها؟</li>
<li>أيّهما أقوى؟</li>
<li>لنفترض أن المهاجم يمكنه تجربة تخمين 10,000 كلمة مرورٍ في الثانية. في المتوسط، كم من الوقت سيستغرق كسر كلٍّ من كلمتي المرور؟</li>
</ol>
</li>
<li><strong>دوال التجزئة المشفّرة.</strong> نزّل صورة Debian من <a href="https://www.debian.org/CD/http-ftp/">خادم مرآةٍ</a> (مثلًا <a href="http://debian.xfree.com.ar/debian-cd/current/amd64/iso-cd/">من هذا الخادم الأرجنتيني</a>). تحقّق من التجزئة (مثلًا باستخدام الأمر <code>sha256sum</code>) مع التجزئة المسترجعة من موقع Debian الرسمي (مثلًا <a href="https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/SHA256SUMS">هذا الملف</a> المستضاف على <code>debian.org</code>، إذا كنت قد نزّلت الملف المرتبط من الخادم الأرجنتيني).</li>
<li><strong>التشفير المتماثل.</strong> شفّر ملفًا بتشفير AES، باستخدام <a href="https://www.openssl.org/">OpenSSL</a>: <code>openssl aes-256-cbc -salt -in {input filename} -out {output filename}</code>. انظر إلى المحتويات باستخدام <code>cat</code> أو <code>hexdump</code>. فك تشفيره بالأمر <code>openssl aes-256-cbc -d -in {input filename} -out {output filename}</code> وتأكد من تطابق المحتويات مع الأصل باستخدام <code>cmp</code>.</li>
<li><strong>التشفير غير المتماثل.</strong>
<ol>
<li>أعد إعداد <a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2">مفاتيح SSH</a> على حاسوبٍ تملك حق الوصول إليه (وليس Athena، لأن Kerberos يتفاعل بشكلٍ غريبٍ مع مفاتيح SSH). تأكد من أن مفتاحك الخاص مشفّرٌ بعبارة مرور، بحيث يكون محميًا في حالة السكون.</li>
<li><a href="https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages">أعد إعداد GPG</a></li>
<li>أرسل إلى Anish بريدًا إلكترونيًا مشفّرًا (<a href="https://keybase.io/anish">المفتاح العام</a>).</li>
<li>وقّع التزامًا (commit) في Git بالأمر <code>git commit -S</code> أو أنشئ وسمًا (tag) موقّعًا بالأمر <code>git tag -s</code>. تحقق من التوقيع على الالتزام بالأمر <code>git show --show-signature</code> أو على الوسم بالأمر <code>git tag -v</code>.</li>
</ol>
</li>
</ol>
</div>`,r={book:e,chapter:t,chapterTitle:a,slug:s,title:i,headings:n,html:o};export{e as book,t as chapter,a as chapterTitle,r as default,n as headings,o as html,s as slug,i as title};
