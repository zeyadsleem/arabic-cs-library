const s="crypto-101",a="public-key-encryption",n="التشفير بالمفتاح العام",e="index",p="التشفير بالمفتاح العام",c=[{depth:2,id:"التشفير-بالمفتاح-العام",text:"التشفير بالمفتاح العام"},{depth:3,id:"التشفير-وفك-التشفير",text:"التشفير وفكّ التشفير"},{depth:3,id:"كسر-rsa",text:"كسر RSA"},{depth:3,id:"مزالق-التنفيذ",text:"مزالق التنفيذ"},{depth:3,id:"oaep",text:"OAEP"}],o=`<h2 id="التشفير-بالمفتاح-العام">التشفير بالمفتاح العام</h2>
<h4>الوصف</h4>
<p>حتى الآن، لم نُنجِز إلّا <code>التشفير بالمفتاح السرّي</code> (secret-key encryption). فلنفترض
أنّ بإمكانك امتلاك نظام تشفير لا يتضمّن مفتاحًا سرّيًا واحدًا، بل زوجًا من
المفاتيح: مفتاح عامّ توزّعه بحرّية، ومفتاح خاصّ تحتفظ به لنفسك.</p>
<p>يستطيع الناس تشفير المعلومات الموجَّهة إليك باستعمال مفتاحك العامّ. وعندئذٍ يستحيل
فكّ رموز تلك المعلومات من دون مفتاحك الخاصّ. ويُسمَّى ذلك <code>التشفير بالمفتاح العام</code>
(public-key encryption).</p>
<p>لمدة طويلة، ظنّ الناس أنّ هذا مستحيل. غير أنّه ابتداءً من السبعينيات بدأت هذه
الخوارزميات تظهر. وأول نظام تشفير متاح للعامة أنتجه ثلاثة من خَبَراء التشفير في
MIT: Ron Rivest وAdi Shamir وLeonard Adleman. والخوارزمية التي نشروها لا تزال
الأكثر شيوعًا إلى اليوم، وتحمل الحروف الأولى من أسمائهم العائلية: RSA.</p>
<p><code>خوارزميات المفتاح العام</code> (public-key algorithms)\\s لا تقتصر على التشفير. وفعلًا،
لقد رأيتَ بالفعل في هذا الكتاب خوارزمية مفتاح عامّ لا تُستعمل مباشرةً في التشفير.
وهناك في الواقع ثلاث أصناف متّصلة من <code>خوارزميات المفتاح العام</code>\\s:</p>
<p>#. خوارزميات <code>تبادل المفاتيح &lt;key exchange&gt;</code> (key exchange)، مثل ديفي-هيلمان،
تتيح لك الاتفاق على سرّ مشترك عبر وسيط غير آمن.
#. خوارزميات التشفير، مثل التي سنتحدّث عنها في هذا الفصل، تتيح للناس التشفير من
دون حاجة إلى الاتفاق على سرّ مشترك.
#. خوارزميات التوقيع، التي سنتحدّث عنها في فصل لاحق، تتيح لك توقيع أيّ معلومة
باستعمال مفتاحك الخاصّ بطريقة تتيح لأيّ شخص آخر التحقّق منها بسهولة باستعمال
مفتاحك العامّ.</p>
<p>لماذا لا نستعمل التشفير بالمفتاح العامّ لكلّ شيء؟</p>
<h4>لماذا لا نستعمل التشفير بالمفتاح العامّ لكلّ شيء؟</h4>
<p>للوهلة الأولى، يبدو أنّ خوارزميات <code>التشفير بالمفتاح العام</code> (public-key encryption)
تُبطل جميع خوارزميات <code>التشفير بالمفتاح السرّي</code> (secret-key encryption) السابقة.
فيستطيع المرء ببساطة استعمال التشفير بالمفتاح العامّ لكلّ شيء، فنتجنّب كلّ التعقيد
الإضافي المتمثّل في إجراء <code>اتفاق على المفاتيح</code> (key agreement) من أجل خوارزمياتنا
المتماثلة. غير أنّنا عند النظر في الأنظمة التشفيرية العملية نجد أنّها شبه دومًا أنظمة
<em>هجينة</em> (hybrid): فعلى الرغم من الدور المهمّ جدًّا الذي تلعبه <code>خوارزميات المفتاح العام</code>\\s، فإنّ معظم عمل التشفير والمصادقة تقوم به الخوارزميات ذات المفتاح السرّي.</p>
<p>والسبب الأهمّ لهذا بكثير هو الأداء. فمقارنةً بشيفرات التيار السريعة
(<code>stream cipher</code>\\s) (أصلية كانت أم غير ذلك)، فإنّ آليات <code>التشفير بالمفتاح العام</code>
(public-key encryption) بطيئة إلى حدٍّ متطرّف. فمثلًا، مع مفتاح RSA بطول 2048
بتًّا (256 بايتًا)، يستغرق التشفير 0.29 ميغادورة، بينما يستغرق فكّ التشفير 11.12
ميغادورة. <code>cryptopp:bench</code> ولوضع ذلك في منظور صحيح، تعمل خوارزميات المفتاح
المتماثل ضمن رتبة مقدار تعادل 10 دورات تقريبًا لكلّ بايت في أيّ من الاتجاهين. وهذا
يعني أنّ خوارزمية المفتاح المتماثل تحتاج نحو 3 كيلودورة لفكّ تشفير 256 بايتًا، وهو
أسرع بنحو 4000 مرّة من النسخة اللامتماثلة. وحتى أفضل ما توصّل إليه علم الشيفرات
المتماثلة الآمنة أسرع من ذلك: فـ AES-GCM مع تسريع العتاد أو Salsa20/ChaCha20
يحتاجان نحو 2 إلى 4 دورات لكلّ بايت فقط، مما يوسّع فجوة الأداء أكثر.</p>
<p>وهناك بعض المشكلات الأخرى في معظم الأنظمة التشفيرية العملية. فمثلًا، لا يستطيع RSA
تشفير أيّ شيء أكبر من مقياسه (modulus)، وهو لا يتجاوز عادةً 4096 بتّات، وهو أصغر
بكثير من أكبر الرسائل التي نودّ إرسالها. ومع ذلك، فإنّ السبب الأهمّ هو حجّة السرعة
أعلاه.</p>
<h4>RSA</h4>
<p>وكما ذكرنا من قبل، فإنّ RSA إحدى أوائل أنظمة <code>التشفير بالمفتاح العام</code>
(public-key encryption) العملية. ولا يزال الأكثر شيوعًا إلى هذا اليوم.</p>
<h3 id="التشفير-وفك-التشفير">التشفير وفكّ التشفير</h3>
<p>يعتمد تشفير RSA وفكّ تشفيره على الحساب النمطي (modular arithmetic). وقد ترغب في
مراجعة <code>مقدّمة في الحساب النمطي &lt;modular-arithmetic&gt;</code> قبل المتابعة.</p>
<p>يصف هذا القسم المسألة الرياضية المبسّطة وراء RSA، والمشار إليها عادةً بـ«RSA
الكتاب المدرسي» (textbook RSA). وهي وحدها لا تنتج نظام تشفير آمنًا. وسنرى في قسم
لاحق تركيبًا آمنًا اسمه OAEP مبنيًّا فوقها.</p>
<p>ولتوليد مفتاح، تختار عددين أوّليَّين (prime) كبيرين <code>p</code> و<code>q</code>. ويجب أن يُختار هذان
العددان عشوائيًّا وفي سرّية. ثمّ تضربهما معًا لإنتاج المقياس (modulus) <code>N</code>، وهو
عامّ. ثمّ تختار <em>أس التشفير</em> (encryption exponent) <code>e</code>، وهو أيضًا عامّ. وعادةً ما
تكون هذه القيمة إمّا 3 أو 65537. ولأنّ هذين العددين يحويان عددًا صغيرًا من الآحاد
<code>1</code> في تفككهما الثنائي، فإنا نستطيع حساب الأُسّ بكفاءة أكبر. ومجتمعةً، فإنّ
<code>(N, e)</code> هو المفتاح العامّ. ويستطيع أيّ شخص استعمال المفتاح العامّ لتشفير رسالة
<code>M</code> إلى نصّ مشفَّر <code>C</code>:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>C</mi><mo>≡</mo><msup><mi>M</mi><mi>e</mi></msup><mspace></mspace><mspace width="1em"/><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi></mrow><mspace width="0.3333em"/><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">
C \\equiv M^e \\pmod{N}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≡</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7144em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">M</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">e</span></span></span></span></span></span></span></span><span class="mspace allowbreak"></span><span class="mspace" style="margin-right:1em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord"><span class="mord mathrm">mod</span></span></span><span class="mspace" style="margin-right:0.3333em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mclose">)</span></span></span></span></span>
<p>أمّا المشكلة التالية فهي فكّ التشفير. ويتبيّن أنّ هناك قيمة <code>d</code> هي <em>أس فكّ التشفير</em>
(decryption exponent)، تحوّل <code>C</code> مجدّدًا إلى <code>M</code>. وهذه القيمة سهلة الحساب نسبيًّا
بافتراض أنّك تعرف <code>p</code> و<code>q</code>، وهو ما نعرفه فعلًا. وباستعمال <code>d</code>، تستطيع فكّ تشفير
الرسالة على هذا النحو:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>M</mi><mo>≡</mo><msup><mi>C</mi><mi>d</mi></msup><mspace></mspace><mspace width="1em"/><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi></mrow><mspace width="0.3333em"/><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">
M \\equiv C^d \\pmod{N}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">M</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≡</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8991em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">d</span></span></span></span></span></span></span></span><span class="mspace allowbreak"></span><span class="mspace" style="margin-right:1em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord"><span class="mord mathrm">mod</span></span></span><span class="mspace" style="margin-right:0.3333em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mclose">)</span></span></span></span></span>
<p>يعتمد أمن RSA على استحالة إجراء عملية فكّ التشفير تلك من دون معرفة الأُسّ السرّي
<code>d</code>، وعلى أنّ حساب الأُسّ السرّي <code>d</code> من المفتاح العامّ <code>(N, e)</code> صعب إلى حدٍّ كبير
(مستحيل عمليًّا). وسنرى في القسم التالي طرائق لكسر RSA.</p>
<h3 id="كسر-rsa">كسر RSA</h3>
<p>كثير من الأنظمة التشفيرية، يعتمد RSA على مسألة RSA، وتحديدًا: إيجاد الرسالة
الصريحة <code>M</code>، معطى نصًّا مشفَّرًا <code>C</code> ومفتاحًا عامًّا <code>(N, e)</code> في المعادلة:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>C</mi><mo>≡</mo><msup><mi>M</mi><mi>e</mi></msup><mspace></mspace><mspace width="1em"/><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi></mrow><mspace width="0.3333em"/><mi>N</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">
C \\equiv M^e \\pmod{N}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≡</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7144em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">M</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">e</span></span></span></span></span></span></span></span><span class="mspace allowbreak"></span><span class="mspace" style="margin-right:1em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord"><span class="mord mathrm">mod</span></span></span><span class="mspace" style="margin-right:0.3333em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mclose">)</span></span></span></span></span>
<p>وأيسر طريقة نعرفها للقيام بذلك هي تحليل <code>N</code> (factor) إلى <code>p \\cdot q</code> من جديد. فمعطى
<code>p</code> و<code>q</code>، يستطيع المهاجم ببساطة أن يكرّر العملية التي يجريها المالك الشرعي
للمفتاح أثناء توليد المفتاح، ليحسب الأُسّ الخاصّ <code>d</code>.</p>
<p>ولحسن الحظّ، ليس لدينا خوارزمية تستطيع تحليل هذه الأعداد الكبيرة في وقت معقول.
وللأسف، فإنّنا لم نبرهن كذلك على أنّها غير موجودة. والأمر أقلّ حظًّا هو أنّه توجد
خوارزمية نظرية تُسمّى خوارزمية Shor <em>تستطيع</em> تحليل مثل هذا العدد في وقت معقول على
حاسوب كمّي. أمّا في الوقت الحالي فالحاسوبيات الكمّية بعيدة كلّ البعد عن الاستعمال
العملي، لكنّ يبدو أنّه إذا تمكّن أحدهم في المستقبل من بناء حاسوب كمّي كبير بما يكفي،
فإنّ RSA يصبح عديم الفعالية.</p>
<p>في هذا القسم، لم ندرس إلّا هجوم استعادة المفتاح الخاصّ الذي يهاجم مسألة RSA
الرياضية المجرّدة البحتة عبر تحليل المقياس. أمّا في القسم التالي فسنرى جميع أنواع
الهجمات الواقعية على RSA التي تعتمد على عيوب في <em>التنفيذ</em> (implementation) لا على
المسألة الرياضية المذكورة أعلاه.</p>
<h3 id="مزالق-التنفيذ">مزالق التنفيذ</h3>
<p>لا توجد حتى الآن أيّ كسور عملية كاملة معروفة لـ RSA. لكنّ هذا لا يعني أنّ الأنظمة
التي تستعمل RSA لا تُكسَر باستمرار. فكما في معظم الأنظمة التشفيرية المكسورة، هناك
حالات كثيرة تكون فيها مكوّنات سليمة لكنّها طُبِّقت على نحو خاطئ، فتُنتج نظامًا بلا
فائدة. ولمزيد من الاستعراض الكامل للأشياء التي يمكن أن تخطئ في تنفيذات RSA، راجع
<code>boneh:twentyyears</code> و<code>anderson:mindingyourpsandqs</code>. وسنكتفي في هذا الكتاب بإبراز
بضعة أمثلة مثيرة.</p>
<p>حشو PKCSv1.5
'''''''''''''''</p>
<p>ملح
''''</p>
<p>Salt <sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> هو نظام تهيئة (provisioning) مكتوب بايثون. ولديه عيب رئيسي واحد: فهو
يحوي وحدة تُسمّى <code>crypt</code>. وبدلًا من إعادة استعمال الأنظمة التشفيرية الكاملة القائمة،
فإنّه ينفّذ نظامه الخاصّ، مستعملًا RSA وAES المقدَّمَين من حزمة طرف ثالث.</p>
<p>لمدة طويلة، كان Salt يستعمل أُسًّا عامًّا (<code>e</code>) قدره 1، ما يعني أنّ مرحلة التشفير لم
تكن تفعل شيئًا في الواقع: <code>P^e \\equiv P^1 \\equiv P \\pmod N</code>. وكان هذا يعني أنّ النصّ
المشفَّر الناتج لم يكن في الواقع سوى النصّ الصريح. وبرغم أنّ هذه المشكلة أُصلحت
الآن، فإنّ ذلك يبيّن فقط أنّه على الأغلب ينبغي ألّا تنفّذ التشفير بنفسك. وSalt
يدعم حاليًّا أيضًا SSH كنقل، لكنّ نظام RSA/AES المنزلي المذكور أعلاه ما زال قائمًا،
وهو حتى وقت كتابة هذا الكتاب لا يزال النقل الموصى به والنقل الافتراضي.</p>
<h3 id="oaep">OAEP</h3>
<p>OAEP، اختصارًا لعبارة optimal asymmetric encryption padding (حشو التشفير اللامتماثل
الأمثل)، يمثّل أفضل ما توصّل إليه علم حشو RSA. وقد أدخلاه Mihir Bellare وPhillip
Rogaway سنة 1995. <code>bellarerogaway:oaep</code>. ويبدو بنيته على هذا النحو:</p>
<p><img src="/arabic-cs-library/images/crypto-101/public-key-encryption-fig-0-Diagram.svg" alt="center"></p>
<p>الشيء الذي يُشفَّر في النهاية هو <code>X \\| Y</code>، وطوله <code>n</code> بتًّا، حيث <code>n</code> هو عدد بتّات
<code>N</code> مقياس RSA. وهو يأخذ كتلة عشوائية <code>R</code> بطول <code>k</code> بتًّا، حيث <code>k</code> ثابت يحدّده
المعيار. أوّلًا يُحشو الرسالة بأصفار لتصبح بطول <code>n - k</code> بتًّا. وإذا نظرت إلى
«السُلّم» أعلاه، فإنّ كلّ ما في النصف الأيسر بطول <code>n - k</code> بتًّا، وكلّ ما في النصف
الأيمن بطول <code>k</code> بتًّا. وتُدمج الكتلة العشوائية <code>R</code> مع الرسالة <code>M \\| 000\\ldots</code>
المحشوّة بالأصفار باستعمال دالتَي «الباب الخلفي» (trapdoor)، وهما <code>G</code> و<code>H</code>. ودالة
الباب الخلفي هي دالة يسهل حسابها إلى حدٍّ كبير في اتجاه واحد ويصعب عكسها إلى حدٍّ
كبير. وفي الممارسة العملية، هذه دوالّ تجزئة تشفيرية (cryptographic hash functions)؛
وسنرى المزيد عنها لاحقًا.</p>
<p>وكما يتّضح من المخطّط، تأخذ <code>G</code> مقدار <code>k</code> بتًّا وتحوله إلى <code>n - k</code> بتًّا، و<code>H</code> هي
الأمر بالعكس: تأخذ <code>n - k</code> بتًّا وتحولها إلى <code>k</code> بتًّا.</p>
<p>تُدمج الكتلتان الناتجتان <code>X</code> و<code>Y</code> معًا، ثمّ يُشفَّر الناتج باستعمال عملية تشفير RSA
القياسية، لإنتاج النصّ المشفَّر.</p>
<p>ولنرى كيف يعمل فكّ التشفير، نعكس كلّ الخطوات. فيحصل المستقبِل على <code>X \\| Y</code> عند فكّ
تشفير الرسالة. وهو يعرف <code>k</code> لأنّها ثابتة في البروتوكول، لذا يستطيع تقسيم
<code>X \\| Y</code> إلى <code>X</code> (وهي <code>n - k</code> بتًّا الأولى) و<code>Y</code> (وهي <code>k</code> بتًّا الأخيرة).</p>
<p>في المخطّط السابق، كانت الأسهم تشير إلى تطبيق الحشو. فاعكس أسهم جانب السُلّم لترى كيفية
التراجع عن الحشو:</p>
<p>TODO: اعكس الأسهم</p>
<p>نريد أن نصل إلى <code>M</code>، وهي ضمن <code>M \\| 000\\ldots</code>. وهناك طريقة واحدة فقط لحسابها، وهي:</p>
<pre><code>M \\| 000\\ldots = X \\xor G(R)
</code></pre>
<p>وحساب <code>G(R)</code> أصعب قليلًا:</p>
<pre><code>G(R) = G(H(X) \\xor Y)
</code></pre>
<p>وكما ترى، فإنّنا — على الأقلّ في بعض تعريفات الدالتَي <code>H</code> و<code>G</code> — نحتاج إلى <code>X</code>
كاملة و<code>Y</code> كاملة (وبالتالي الرسالة المشفَّرة بأسرها) كي نعرف أيّ شيء عن <code>M</code>.
وهناك دوالّ كثيرة تصلح اختيارًا جيدًا لـ<code>H</code> و<code>G</code>؛ المبنيّة على دوالّ التجزئة
التشفيرية، التي سنتحدّث عنها بمزيد من التفصيل لاحقًا في الكتاب.</p>
<h4>التشفير بالمنحنيات الإهليلجية</h4>
<p>TODO: هذا</p>
<p>المشكلة المتبقّية: التشفير غير المصادَق</p>
<h4>المشكلة المتبقّية: التشفير غير المصادَق</h4>
<p>لا تستطيع معظم أنظمة <code>التشفير بالمفتاح العام</code> (public-key encryption) إلّا تشفير قطع
صغيرة من البيانات في كلّ مرّة، وهي أصغر بكثير من الرسائل التي نودّ القدرة على
إرسالها. وهي أيضًا بطيئة عمومًا، أبطأ بكثير من نظائرها المتماثلة. لذا تُستعمل الأنظمة
التشفيرية بالمفتاح العامّ جنبًا إلى جنب مع الأنظمة التشفيرية بالمفتاح السرّي في كلّ
الأحوال تقريبًا.</p>
<p>وعند حديثنا عن <code>شيفرات التيار</code> (stream cipher)\\s، كانت إحدى المشكلات المتبقّية التي
واجهناها هي أنّنا ما زلنا بحاجة إلى تبادل المفاتيح السرّية مع عدد كبير من الناس. أمّا
مع الأنظمة التشفيرية بالمفتاح العامّ، مثل التشفير بالمفتاح العامّ وبروتوكولات
<code>تبادل المفاتيح</code> (key exchange)، فقد رأينا الآن طريقتين لحلّ تلك المشكلة. ويعني ذلك
أنّنا يمكننا الآن التواصل مع أيّ شخص، باستعمال المعلومات العامّة وحدها، مع أمان تامّ
من المستقِعين.</p>
<p>حتى الآن لم نتحدّث إلّا عن التشفير من دون أيّ شكل من أشكال المصادقة. وهذا يعني أنّه
بينما يمكننا تشفير الرسائل وفكّ تشفيرها، فإنّنا لا نستطيع التحقّق من أنّ الرسالة هي
ما أرسله المُرسِل فعلًا.</p>
<p>وفيما قد يوفّر التشفير غير المصادَق سرّية، فقد رأينا من قبل أنّه من دون مصادقة
يستطيع المهاجم النشط أن يعدّل عادةً رسائل مشفَّرة صالحة بنجاح، وإن لم يكن يعرف النصّ
الصريح المقابل لها بالضرورة. وقبول هذه الرسائل قد يؤدّي في كثير من الأحيان إلى تسرّب
معلومات سرّية، ما يعني أنّنا لا نصل حتى إلى السرّية. وتوضّح هجمات حشو CBC التي
ناقشناها من قبل هذا الأمر.</p>
<p>ونتيجةً لذلك، صار واضحًا أنّنا بحاجة إلى طرائق للمصادقة إضافةً إلى التشفير في
اتصالاتنا السرّية. ويتم ذلك بإضافة معلومات إضافية إلى الرسالة لا يمكن إلّا للمُرسِل
أن يكون قد حسبها. ومثل التشفير تمامًا، تأتي المصادقة في صيغتين: بالمفتاح الخاصّ
(المتماثل) وبالمفتاح العامّ (اللامتماثل). وتُسمَّى أنظمة المصادقة المتماثلة عادةً
<code>رموز مصادقة الرسائل</code> (message authentication codes)، أمّا مقابل المفتاح العامّ
فيُسمَّى عادةً توقيعًا (signature).</p>
<p>أوّلًا، سنقدّم بناءً تشفيريًا (primitive) جديدًا: دوالّ التجزئة (hash functions).
ويمكن استعمالها لإنتاج أنظمة التوقيع فضلًا عن أنظمة مصادقة الرسائل. وللأسف،
فكثيرًا ما يُساء استعمالها أيضًا لإنتاج أنظمة غير آمنة تمامًا.</p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>إذن، هناك Salt نظام التهيئة، و<code>salt</code>\\s الأشياء المستعملة في مخازن كلمات المرور المكسورة، وNaCl وهي مكتبة التشفير التي تُنطق «salt»، وNaCl التي تشغّل شيفرة أصلية (native code) في بعض المتصفّحات، وربما أشياء أخرى كثيرة أنساها. هل نتوقّف عن تسمية الأشياء باسمه؟ <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,t={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:c,html:o};export{s as book,a as chapter,n as chapterTitle,t as default,c as headings,o as html,e as slug,p as title};
