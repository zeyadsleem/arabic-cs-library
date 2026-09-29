const n="cryptopals",p="set-3",e="Set 3",t="index",d="المجموعة 3",a=[{depth:2,id:"17-أوراكل-حشو-cbc",text:"17. أوراكل حشو CBC"},{depth:3,id:"ما-الذي-تفعله-هنا",text:"ما الذي تفعله هنا."},{depth:2,id:"18-تنفيذ-ctr-وضع-شيفرة-التيار",text:"18. تنفيذ CTR، وضع شيفرة التيار"},{depth:3,id:"هذا-هو-وضع-شيفرة-الكتل-الوحيد-المهم-في-الشيفرة-الجيدة",text:"هذا هو وضع شيفرة الكتل الوحيد المهم في الشيفرة الجيدة."},{depth:2,id:"19-كسر-وضع-ctr-ذي-القيمة-العشوائية-الوحيدة-الثابتة-باستخدام-الاستبدالات",text:"19. كسر وضع CTR ذي القيمة العشوائية الوحيدة الثابتة باستخدام الاستبدالات"},{depth:3,id:"لا-تفرط-في-التفكير",text:"لا تفرط في التفكير."},{depth:2,id:"20-كسر-ctr-ذي-القيمة-العشوائية-الوحيدة-الثابتة-إحصائيا",text:"20. كسر CTR ذي القيمة العشوائية الوحيدة الثابتة إحصائيًا"},{depth:2,id:"21-تنفيذ-مولد-الأرقام-العشوائية-mt19937-mersenne-twister",text:"21. تنفيذ مولّد الأرقام العشوائية MT19937 Mersenne Twister"},{depth:2,id:"22-كسر-بذرة-mt19937",text:"22. كسر بذرة MT19937"},{depth:2,id:"23-استنساخ-مولد-mt19937-من-مخرجاته",text:"23. استنساخ مولّد MT19937 من مخرجاته"},{depth:3,id:"توقف-وفكر-لحظة",text:"توقف وفكّر لحظة."},{depth:2,id:"24-إنشاء-شيفرة-تيار-mt19937-وكسرها",text:"24. إنشاء شيفرة تيار MT19937 وكسرها"}],G=`<p>هذه هي المجموعة التالية من تحديات <strong>تشفير شيفرات الكتل (block cipher cryptography)</strong> (حتى أمور العشوائية هنا تخدم تشفير شيفرات الكتل).</p>
<p>هذه المجموعة <strong>متوسطة الصعوبة</strong>. تتضمن هجومًا شهيرًا على وضع CBC، وهجوم «استنساخ» على مولّد أرقام عشوائية شائع قد يكون من المزعج إتقانه.</p>
<p>وقد وصلنا أيضًا في تحديات التشفير إلى نقطة تكون فيها جميع التحديات، باستثناء واحد محتمل، قيّمة في كسر التشفير الواقعي.</p>
<h2 id="17-أوراكل-حشو-cbc">17. أوراكل حشو CBC</h2>
<p>هذا أشهر هجوم على تشفير شيفرات الكتل الحديثة.</p>
<p>اجمع شيفرة الحشو (padding) وشيفرة CBC لكتابة دالتين.</p>
<p>ينبغي أن تختار الدالة الأولى عشوائيًا واحدة من السلاسل العشر التالية:</p>
<pre><code class="language-text">MDAwMDAwTm93IHRoYXQgdGhlIHBhcnR5IGlzIGp1bXBpbmc=
MDAwMDAxV2l0aCB0aGUgYmFzcyBraWNrZWQgaW4gYW5kIHRoZSBWZWdhJ3MgYXJlIHB1bXBpbic=
MDAwMDAyUXVpY2sgdG8gdGhlIHBvaW50LCB0byB0aGUgcG9pbnQsIG5vIGZha2luZw==
MDAwMDAzQ29va2luZyBNQydzIGxpa2UgYSBwb3VuZCBvZiBiYWNvbg==
MDAwMDA0QnVybmluZyAnZW0sIGlmIHlvdSBhaW4ndCBxdWljayBhbmQgbmltYmxl
MDAwMDA1SSBnbyBjcmF6eSB3aGVuIEkgaGVhciBhIGN5bWJhbA==
MDAwMDA2QW5kIGEgaGlnaCBoYXQgd2l0aCBhIHNvdXBlZCB1cCB0ZW1wbw==
MDAwMDA3SSdtIG9uIGEgcm9sbCwgaXQncyB0aW1lIHRvIGdvIHNvbG8=
MDAwMDA4b2xsaW4nIGluIG15IGZpdmUgcG9pbnQgb2g=
MDAwMDA5aXRoIG15IHJhZy10b3AgZG93biBzbyBteSBoYWlyIGNhbiBibG93
</code></pre>
<p>... وأن تولّد مفتاح AES عشوائيًا (ينبغي أن تحفظه لكل عمليات التشفير المستقبلية)، وتحشو السلسلة إلى حجم كتلة AES البالغ 16 بايت وتشفّرها بـ CBC تحت ذلك المفتاح، وتقدّم للمستدعي النص المشفَّر ومتجه التهيئة (IV).</p>
<p>ينبغي أن تستهلك الدالة الثانية النص المشفَّر الذي تنتجه الدالة الأولى، وتفك تشفيره، وتتحقق من حشوه، وتعيد true أو false بناءً على صلاحية الحشو.</p>
<h3 id="ما-الذي-تفعله-هنا">ما الذي تفعله هنا.</h3>
<p>هذا الزوج من الدوال يحاكي تشفير AES-CBC كما يُنشر على الخادم في تطبيقات الويب؛ والدالة الثانية تحاكي استهلاك الخادم لرمز جلسة مشفَّر، كما لو كان كوكيز.</p>
<p>واتضح أنه من الممكن فك تشفير النصوص المشفَّرة التي تنتجها الدالة الأولى.</p>
<p>يعتمد فك التشفير هنا على تسرّب عبر قناة جانبية من دالة فك التشفير. التسرّب هو رسالة الخطأ التي تفيد بصلاحية الحشو أو عدمها.</p>
<p>يمكنك أن تجد مئة صفحة ويب تشرح كيف يعمل هذا الهجوم، لذا لن أعيد شرحه. ما سأقوله هو هذا:</p>
<p>الرؤية الأساسية وراء هذا الهجوم هي أن البايت 01h حشو صحيح، ويحدث في 1 من 256 تجربة من النصوص الصريحة «العشوائية» الناتجة عن فك تشفير نص مشفَّر مُتلاعَب به.</p>
<p>أما 02h منفردًا فليس حشوًا صحيحًا.</p>
<p>و02h 02h <em>حشو</em> صحيح، لكنه أقل احتمالًا بكثير للحدوث عشوائيًا من 01h.</p>
<p>و03h 03h 03h أقل احتمالًا حتى من ذلك.</p>
<p>لذا يمكنك أن تفترض أنه إن أفسدت عملية فك تشفير وكان حشوها صحيحًا، فأنت تعرف ما بايت الحشو ذلك.</p>
<p>من السهل أن تتعثر بحقيقة أن النصوص الصريحة في CBC «محشوّة». <em>لا علاقة لأوراكلات الحشو بالحشو الفعلي لنص صريح CBC.</em> إنه هجوم يستهدف قطعة شيفرة محددة تتولى فك التشفير. يمكنك تنصيب أوراكل حشو على <em>أي كتلة CBC</em>، سواء كانت محشوّة أم لا.</p>
<h2 id="18-تنفيذ-ctr-وضع-شيفرة-التيار">18. تنفيذ CTR، وضع شيفرة التيار</h2>
<p>السلسلة:</p>
<pre><code class="language-text">L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==
</code></pre>
<p>... تُفك تشفيرها إلى شيء يقارب الإنجليزية في وضع CTR، وهو وضع لشيفرة كتل AES يحوّل AES إلى شيفرة تيار (stream cipher)، بالمعطيات التالية:</p>
<pre><code class="language-text">      key=YELLOW SUBMARINE
      nonce=0
      format=64 bit unsigned little endian nonce,
             64 bit little endian block count (byte count / 16)
</code></pre>
<p>وضع CTR بسيط جدًا.</p>
<p>بدلًا من تشفير النص الصريح، يشفّر وضع CTR عدّادًا جاريًا، منتجًا كتلة من 16 بايت من تيار المفاتيح (keystream)، تُدمج بـ XOR مع النص الصريح.</p>
<p>على سبيل المثال، لأول 16 بايت من رسالة بهذه المعطيات:</p>
<pre><code class="language-text">keystream = AES(&quot;YELLOW SUBMARINE&quot;,
                &quot;\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00&quot;)
</code></pre>
<p>... وللـ16 بايت التالية:</p>
<pre><code class="language-text">keystream = AES(&quot;YELLOW SUBMARINE&quot;,
                &quot;\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x00&quot;)
</code></pre>
<p>... ثم:</p>
<pre><code class="language-text">keystream = AES(&quot;YELLOW SUBMARINE&quot;,
                &quot;\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x02\\x00\\x00\\x00\\x00\\x00\\x00\\x00&quot;)
</code></pre>
<p>لا يتطلب وضع CTR حشوًا؛ عندما ينفد النص الصريح، تتوقف ببساطة عن دمج تيار المفاتيح بـ XOR وعن توليده.</p>
<p>فك التشفير مطابق للتشفير. ولّد تيار المفاتيح نفسه، وادمجه بـ XOR، واستعد النص الصريح.</p>
<p>فك تشفير السلسلة الموجودة في أعلى هذه الدالة، ثم استخدم دالة CTR الخاصة بك لتشفير وفك تشفير أشياء أخرى.</p>
<h3 id="هذا-هو-وضع-شيفرة-الكتل-الوحيد-المهم-في-الشيفرة-الجيدة">هذا هو وضع شيفرة الكتل الوحيد المهم في الشيفرة الجيدة.</h3>
<p>تعتمد معظم التشفير الحديث على وضع CTR لتكييف شيفرات الكتل مع شيفرات التيار، لأن معظم ما نريد تشفيره يوصف بشكل أفضل كتيار لا كسلسلة كتل. قال دانيال بيرنشتاين مرة مازحًا لفيل روغاواي إن أنظمة التشفير الجيدة لا تحتاج تحويلات «فك التشفير». تراكيب مثل CTR هي ما كان يقصده.</p>
<h2 id="19-كسر-وضع-ctr-ذي-القيمة-العشوائية-الوحيدة-الثابتة-باستخدام-الاستبدالات">19. كسر وضع CTR ذي القيمة العشوائية الوحيدة الثابتة باستخدام الاستبدالات</h2>
<p>خذ دالة تشفير/فك تشفير CTR الخاصة بك وثبّت قيمة nonce على 0. ولّد مفتاح AES عشوائيًا.</p>
<p>في <em>عمليات تشفير متتالية</em> (<em>لا</em> في تيار CTR واحد كبير جارٍ)، شفّر كل سطر من فك ترميز base64 للأسطر التالية، منتجًا نصوصًا مشفَّرة مستقلة متعددة:</p>
<pre><code class="language-text">SSBoYXZlIG1ldCB0aGVtIGF0IGNsb3NlIG9mIGRheQ==
Q29taW5nIHdpdGggdml2aWQgZmFjZXM=
RnJvbSBjb3VudGVyIG9yIGRlc2sgYW1vbmcgZ3JleQ==
RWlnaHRlZW50aC1jZW50dXJ5IGhvdXNlcy4=
SSBoYXZlIHBhc3NlZCB3aXRoIGEgbm9kIG9mIHRoZSBoZWFk
T3IgcG9saXRlIG1lYW5pbmdsZXNzIHdvcmRzLA==
T3IgaGF2ZSBsaW5nZXJlZCBhd2hpbGUgYW5kIHNhaWQ=
UG9saXRlIG1lYW5pbmdsZXNzIHdvcmRzLA==
QW5kIHRob3VnaHQgYmVmb3JlIEkgaGFkIGRvbmU=
T2YgYSBtb2NraW5nIHRhbGUgb3IgYSBnaWJl
VG8gcGxlYXNlIGEgY29tcGFuaW9u
QXJvdW5kIHRoZSBmaXJlIGF0IHRoZSBjbHViLA==
QmVpbmcgY2VydGFpbiB0aGF0IHRoZXkgYW5kIEk=
QnV0IGxpdmVkIHdoZXJlIG1vdGxleSBpcyB3b3JuOg==
QWxsIGNoYW5nZWQsIGNoYW5nZWQgdXR0ZXJseTo=
QSB0ZXJyaWJsZSBiZWF1dHkgaXMgYm9ybi4=
VGhhdCB3b21hbidzIGRheXMgd2VyZSBzcGVudA==
SW4gaWdub3JhbnQgZ29vZCB3aWxsLA==
SGVyIG5pZ2h0cyBpbiBhcmd1bWVudA==
VW50aWwgaGVyIHZvaWNlIGdyZXcgc2hyaWxsLg==
V2hhdCB2b2ljZSBtb3JlIHN3ZWV0IHRoYW4gaGVycw==
V2hlbiB5b3VuZyBhbmQgYmVhdXRpZnVsLA==
U2hlIHJvZGUgdG8gaGFycmllcnM/
VGhpcyBtYW4gaGFkIGtlcHQgYSBzY2hvb2w=
QW5kIHJvZGUgb3VyIHdpbmdlZCBob3JzZS4=
VGhpcyBvdGhlciBoaXMgaGVscGVyIGFuZCBmcmllbmQ=
V2FzIGNvbWluZyBpbnRvIGhpcyBmb3JjZTs=
SGUgbWlnaHQgaGF2ZSB3b24gZmFtZSBpbiB0aGUgZW5kLA==
U28gc2Vuc2l0aXZlIGhpcyBuYXR1cmUgc2VlbWVkLA==
U28gZGFyaW5nIGFuZCBzd2VldCBoaXMgdGhvdWdodC4=
VGhpcyBvdGhlciBtYW4gSSBoYWQgZHJlYW1lZA==
QSBkcnVua2VuLCB2YWluLWdsb3Jpb3VzIGxvdXQu
SGUgaGFkIGRvbmUgbW9zdCBiaXR0ZXIgd3Jvbmc=
VG8gc29tZSB3aG8gYXJlIG5lYXIgbXkgaGVhcnQs
WWV0IEkgbnVtYmVyIGhpbSBpbiB0aGUgc29uZzs=
SGUsIHRvbywgaGFzIHJlc2lnbmVkIGhpcyBwYXJ0
SW4gdGhlIGNhc3VhbCBjb21lZHk7
SGUsIHRvbywgaGFzIGJlZW4gY2hhbmdlZCBpbiBoaXMgdHVybiw=
VHJhbnNmb3JtZWQgdXR0ZXJseTo=
QSB0ZXJyaWJsZSBiZWF1dHkgaXMgYm9ybi4=
</code></pre>
<p>(هذا ينبغي أن ينتج 40 نصًا مشفَّرًا قصيرًا بـ CTR).</p>
<p>لأن قيمة nonce في CTR لم تكن عشوائية لكل تشفير، فقد شُفّر كل نص مشفَّر مقابل تيار المفاتيح نفسه. هذا سيئ جدًا.</p>
<p>بعد إدراك ذلك، وكما في معظم شيفرات التيار (بما فيها RC4، وأي شيفرة كتل تُشغَّل بوضع CTR بوضوح)، فإن «التشفير» الفعلي لبايت من البيانات لا يعدو عملية XOR واحدة، فينبغي أن يكون واضحًا أن:</p>
<pre><code class="language-text">CIPHERTEXT-BYTE XOR PLAINTEXT-BYTE = KEYSTREAM-BYTE
</code></pre>
<p>وبما أن تيار المفاتيح هو نفسه لكل نص مشفَّر:</p>
<pre><code class="language-text">CIPHERTEXT-BYTE XOR KEYSTREAM-BYTE = PLAINTEXT-BYTE (ie, &quot;you don&#x27;t
say!&quot;)
</code></pre>
<p>هاجم هذا النظام التشفيري قطعة قطعة: خمّن الحروف، واستخدم تكرار اللغة الإنجليزية المتوقع للتحقق من التخمينات، والتقط ثلاثيات الحروف الإنجليزية الشائعة، وهكذا.</p>
<h3 id="لا-تفرط-في-التفكير">لا تفرط في التفكير.</h3>
<p>هناك نقاط لأتمتة هذا، لكن جزءًا من سبب جعلي إياك تفعله هو اعتقادي أن هذا الأسلوب دون المستوى الأمثل.</p>
<h2 id="20-كسر-ctr-ذي-القيمة-العشوائية-الوحيدة-الثابتة-إحصائيا">20. كسر CTR ذي القيمة العشوائية الوحيدة الثابتة إحصائيًا</h2>
<p>في هذا الملف ستجد مجموعة مشابهة من النصوص الصريحة المُرمَّزة بـ Base64. افعل بها تمامًا ما فعلته بالأولى، لكن حُلّ المسألة بطريقة مختلفة.</p>
<p>بدلًا من تخمينات موضعية لنص صريح معروف، عامل مجموعة النصوص المشفَّرة كما تعامل XOR متكرر المفتاح.</p>
<p>من الواضح أن تشفير CTR يبدو مختلفًا عن XOR متكرر المفتاح، <em>لكن مع قيمة nonce ثابتة هما الشيء نفسه فعليًا.</em></p>
<p>لاستغلال ذلك: خذ مجموعة نصوصك المشفَّرة واقتطعها إلى طول مشترك (طول أصغر نص مشفَّر سيفي بالغرض).</p>
<p>حُلّ التسلسل الناتج من النصوص المشفَّرة كما لو كان XOR متكرر المفتاح، بحجم مفتاح يساوي طول النص المشفَّر الذي دمجته بـ XOR.</p>
<h2 id="21-تنفيذ-مولد-الأرقام-العشوائية-mt19937-mersenne-twister">21. تنفيذ مولّد الأرقام العشوائية MT19937 Mersenne Twister</h2>
<p>يمكنك الحصول على الشيفرة الزائفة لهذا من ويكيبيديا.</p>
<p>إن كنت تكتب بـ Python أو Ruby أو (للأسف) PHP، فمن المرجح أن لغتك تمنحك MT19937 أصلًا باسم &quot;rand()&quot;؛ <strong>لا تستخدم rand()</strong>. اكتب المولّد بنفسك.</p>
<h2 id="22-كسر-بذرة-mt19937">22. كسر بذرة MT19937</h2>
<p>تأكد من أن MT19937 الخاص بك يقبل قيمة بذرة (seed) صحيحة. اختبره (تحقق من حصولك على التسلسل نفسه من المخرجات عند بذرة معينة).</p>
<p>اكتب روتينًا ينفّذ العملية التالية:</p>
<ul>
<li>انتظر عددًا عشوائيًا من الثواني بين، لا أعرف، 40 و1000.</li>
<li>ابدأ المولّد ببذرة من الطابع الزمني الحالي لنظام Unix</li>
<li>انتظر عددًا عشوائيًا من الثواني مرة أخرى.</li>
<li>أعِد أول مخرج 32 بتًا من المولّد.</li>
</ul>
<p>فهمت الفكرة. اذهب لتناول القهوة أثناء تشغيله. أو حاكِ مرور الوقت فقط، وإن كنت ستفوّت بعض متعة هذا التمرين إن فعلت ذلك.</p>
<p>من مخرج المولّد ذي 32 بتًا، اكتشف البذرة.</p>
<h2 id="23-استنساخ-مولد-mt19937-من-مخرجاته">23. استنساخ مولّد MT19937 من مخرجاته</h2>
<p>تتكون الحالة الداخلية لـ MT19937 من 624 عددًا صحيحًا بطول 32 بتًا.</p>
<p>لكل دفعة من 624 مخرجًا، يبدّل MT حالته الداخلية. وبتدوير الحالة بانتظام، يحقق MT19937 دورة مقدارها 2**19937، وهو رقم كبير.</p>
<p>في كل مرة يُقرَع فيها MT19937، يخضع عنصر من حالته الداخلية لدالة طبع (tempering) تنشر البتّات في النتيجة.</p>
<p>دالة الطبع قابلة للعكس؛ يمكنك كتابة دالة «نزع الطبع» (untemper) تأخذ مخرج MT19937 وتحوّله مرة أخرى إلى العنصر المقابل في مصفوفة حالة MT19937.</p>
<p>لعكس تحويل الطبع، طبّق معكوس كل عملية من عمليات تحويل الطبع بترتيب معاكس. هناك نوعان من العمليات في تحويل الطبع، كل منهما مطبَّق مرتين؛ إحداهما XOR مع قيمة مُزاحة لليمين، والأخرى XOR مع قيمة مُزاحة لليسار بعد دمجها بعملية AND مع عدد سحري. لذا ستحتاج إلى شيفرة لعكس عمليتي «اليمين» و«اليسار».</p>
<p>بمجرد أن يعمل «نزع الطبع»، أنشئ مولّد MT19937 جديدًا، واقرعه للحصول على 624 مخرجًا، وانزع الطبع من كل منها لإعادة إنشاء حالة المولّد، وألصق تلك الحالة في نسخة جديدة من مولّد MT19937.</p>
<p>ينبغي أن يتنبأ المولّد «المُلصَّق» الجديد بقيم المولّد الأصلي.</p>
<h3 id="توقف-وفكر-لحظة">توقف وفكّر لحظة.</h3>
<p>كيف تعدّل MT19937 لتجعل هذا الهجوم صعبًا؟ ماذا سيحدث لو أخضعت كل مخرج مطبوع لعملية تجزئة (hash) تشفيرية؟</p>
<h2 id="24-إنشاء-شيفرة-تيار-mt19937-وكسرها">24. إنشاء شيفرة تيار MT19937 وكسرها</h2>
<p>يمكنك إنشاء شيفرة تيار بدائية من أي مولّد أعداد شبه عشوائية (PRNG)؛ استخدمه لتوليد تسلسل من مخرجات 8 بتات وسمِّ هذه المخرجات تيار مفاتيح. ادمج كل بايت من النص الصريح بـ XOR مع كل بايت متتالٍ من تيار المفاتيح.</p>
<p>اكتب الدالة التي تفعل ذلك لـ MT19937 باستخدام بذرة 16 بتًا. تحقق من قدرتك على التشفير وفك التشفير بشكل صحيح. ينبغي أن تبدو هذه الشيفرة مشابهة لشيفرة CTR الخاصة بك.</p>
<p>استخدم دالتك لتشفير نص صريح معروف (لنقل 14 محرف 'A' متتاليًا) مسبوق بعدد عشوائي من المحارف العشوائية.</p>
<p>من النص المشفَّر، استعد «المفتاح» (البذرة ذات 16 بتًا).</p>
<p>استخدم الفكرة نفسها لتوليد «رمز إعادة تعيين كلمة المرور» عشوائي باستخدام MT19937 مبذور من الوقت الحالي.</p>
<p>اكتب دالة للتحقق مما إذا كان أي رمز كلمة مرور معطى ناتجًا فعليًا عن مولّد MT19937 مبذور بالوقت الحالي.</p>
`,l={book:n,chapter:p,chapterTitle:e,slug:t,title:d,headings:a,html:G};export{n as book,p as chapter,e as chapterTitle,l as default,a as headings,G as html,t as slug,d as title};
