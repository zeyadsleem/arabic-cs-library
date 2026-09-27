const n="crypto-101",e="glossary",o="المسرد",c="index",t="المسرد",p=[],i=`<h1>المسرد</h1>
<p>AEAD
التشفير الموثَّق مع بيانات مرتبطة (Authenticated Encryption with
Associated Data)</p>
<p>AES
معيار التشفير المتقدّم (Advanced Encryption Standard)</p>
<p>AKE
تبادل المفاتيح الموثَّق (authenticated key exchange)</p>
<p>ARX
جمع وإزاحة والاو الحصري (add, rotate, XOR)</p>
<p>BEAST
استغلال المتصفّح ضد SSL/TLS (Browser Exploit Against SSL/TLS)</p>
<p>CBC
سَلْسَلة كتل الشيفرة (cipher block chaining)</p>
<p>CDN
شبكة توزيع المحتوى (content distribution network)</p>
<p>CSPRNG
مولّد أرقام شبه عشوائي آمن تشفيريًّا (cryptographically secure
pseudorandom number generator)</p>
<p>CSRF
<code>cross-site request forgery</code></p>
<p>DES
معيار تشفير البيانات (Data Encryption Standard)</p>
<p>FIPS
معايير معالجة المعلومات الفيدرالية (Federal Information Processing
Standards)</p>
<p>GCM
وضع عدّاد غالوا (Galois Counter Mode)</p>
<p>HKDF
دالة اشتقاق المفاتيح القائمة على HMAC وبأسلوب الاستخلاص والتوسيع
(HMAC-based (Extract-and-Expand) Key Derivation Function)</p>
<p>HMAC
رمز مصادقة الرسالة القائم على التجزئة (Hash-based Message
Authentication Code)</p>
<p>HSTS
أمن النقل الصارم لـ HTTP (HTTP Strict Transport Security)</p>
<p>IV
<code>initialization vector</code></p>
<p>KDF
دالة اشتقاق المفاتيح (key derivation function)</p>
<p>MAC
رمز مصادقة الرسالة (message authentication code)</p>
<p>MITM
الوسيط في المنتصف (man-in-the-middle)</p>
<p>OCB
كتاب الشيفرات بالإزاحة (offset codebook)</p>
<p>OTR
خارج السجلّ (off-the-record)</p>
<p>PRF
دالة شبه عشوائية (pseudorandom function)</p>
<p>PRNG
مولّد أرقام شبه عشوائية (pseudorandom number generator)</p>
<p>PRP
تبديل شبه عشوائي (pseudorandom permutation)</p>
<p>RSA
ريفست-شامير-أدلمان (Rivest Shamir Adleman)</p>
<p>SMP
بروتوكول المليونير الاشتراكي (socialist millionaire protocol)</p>
<p>secret-key encryption
تشفير بالمفتاح السرّي (secret-key encryption): تشفير يستعمل المفتاح
نفسه في التعمية وفي فكّ التعمية معًا. ويُعرف أيضًا بالتشفير بالمفتاح
المتماثل (symmetric-key encryption). قارن <code>public-key encryption</code></p>
<p>symmetric-key encryption
انظر <code>secret-key encryption</code></p>
<p>keyspace
فضاء المفاتيح (keyspace): مجموعة كلّ المفاتيح الممكنة</p>
<p>block cipher
شيفرة كتل (block cipher): خوارزمية تشفير متماثل تُعمّي وتُفكّ تشفير
كتل ذات مقاس ثابت</p>
<p>substitution-permutation network
شبكة الاستبدال والتبديل (substitution-permutation network): تصميم
عامّ لشيفرات الكتل تُعمَّى فيه الكتلة بتكرار الاستبدالات والتبديلات</p>
<p>stream cipher
شيفرة تيار (stream cipher): خوارزمية تشفير متماثل تُعمّي وتُفكّ تشفير
تيارات ذات مقاس غير محدّد</p>
<p>mode of operation
modes of operation
طريقة التشغيل (mode of operation): بناء عامّ يُعمّي ويفكّ تشفير
التيارات، مبنيٌّ على شيفرة كتل</p>
<p>ECB mode
وضع ECB: وضع كتاب الشيفرات الإلكتروني (Electronic Codebook)؛ طريقة
تشغيل تُقسَّم فيها النصّ الصريح إلى كتل تُعمَّى كلٌّ منها على حدة
بالمفتاح نفسه. وهو الوضع الافتراضي في كثير من مكتبات التشفير، رغم
وجود مشاكل أمنية كثيرة</p>
<p>CBC mode
وضع CBC: تسلسل كتل الشيفرة (Cipher Block Chaining)؛ طريقة تشغيل
شائعة يُطبَّق فيها الاو الحصري على الكتلة المشفّرة السابقة مع
الكتلة الصريحة أثناء التعمية. ويأخذ متجه تهيئة
(initialization vector)، الذي يتولّى دور «الكتلة التي تسبق الكتلة
الأولى»</p>
<p>initialization vector
متجه التهيئة (initialization vector): بيانات تستعمل لتهيئة بعض
الخوارزميات مثل <code>CBC mode</code>. ولا يُشترط عادةً أن تكون سرّية، لكن
يُشترط ألّا يمكن التنبّؤ بها. قارن <code>nonce</code> و<code>salt</code></p>
<p>CTR mode
وضع CTR: وضع العدّاد (Counter)؛ يُنتج <code>nonce</code> مُدمجًا مع عدّاد
تسلسلًا من المداخل لشيفرة الكتل؛ وتُعدّ كتل النصّ المشفَّر الناتجة
هي تدفّق المفاتيح (keystream)</p>
<p>nonce
قيمة عشوائية وحيدة (nonce): <strong>N</strong>\\umber used <strong>once</strong>، أي «رقم»
(number) يُستعمل «مرّة واحدة» (once). تُستعمل في كثير من بروتوكولات
التشفير. ولا يلزم عادةً أن تكون سرّية أو غير قابلة للتنبّؤ، لكن يلزم
أن تكون فريدة. قارن <code>initialization vector</code> و<code>salt</code></p>
<p>AEAD mode
وضع AEAD: صنف من <code>mode of operation</code> لـ <code>block cipher</code> يوفّر تشفيرًا
موثَّقًا، فضلًا عن توثيق بعض البيانات المرتبطة غير المعمّاة</p>
<p>OCB mode
وضع OCB: وضع كتاب الشيفرات بالإزاحة (Offset Codebook)؛
<code>AEAD mode</code> عالي الأداء، وللأسف يعترضه براءات الاختراع</p>
<p>GCM mode
وضع GCM: وضع عدّاد غالوا (Galois Counter)؛ <code>AEAD mode</code> يجمع
<code>CTR mode</code> مع <code>Carter-Wegman MAC</code></p>
<p>message authentication code
رمز مصادقة الرسالة (message authentication code): قطعة معلومات صغيرة
تستعمل للتحقّق من أصالة الرسالة وسلامتها. ويُشار إليه غالبًا باسم
الوسم (tag)</p>
<p>one-time MAC
MAC لمرّة واحدة (one-time MAC): <code>message authentication code</code> لا
يمكن استعماله بأمان إلّا لرسالة واحدة. وفائدته الرئيسة زيادة الأداء
مقارنةً بـ <code>MAC</code> القابل لإعادة الاستعمال</p>
<p>Carter-Wegman MAC
MAC كارتر-ويغمان (Carter-Wegman MAC): مخطّط
<code>message authentication code</code> قابل لإعادة الاستعمال مبنيٌّ من
<code>one-time MAC</code>. ويجمع بين مزايا الأداء وسهولة الاستعمال</p>
<p>GMAC
GMAC: جزء <code>message authentication code</code> في <code>GCM mode</code> يُستعمل على
حدة</p>
<p>salt
ملح (salt): بيانات عشوائية تُضاف إلى آلة تشفيرية (crypto
primitive)، عادةً دالة في اتجاه واحد مثل دالة تجزئة تشفيرية أو دالة
اشتقاق مفاتيح، فتُخصّص هذه الدوالّ لتُنتج مخرجات مختلفة (بشرط أن
يكون الملح مختلفًا). ويمكن استعماله لمنع هجمات المعجم مثلًا. ولا
يلزم عادةً أن يكون سرّيًا، لكنّ سرّيته قد تحسّن الخصائص الأمنية
للنظام. قارن <code>nonce</code> و<code>initialization vector</code></p>
<p>public-key algorithm
خوارزمية المفتاح العام (public-key algorithm): خوارزمية تستعمل زوجًا
من مفتاحين مترابطين لكن مختلفين. وتُعرف أيضًا بـ
<code>asymmetric-key algorithm</code>. ومن أمثلتها :term:<code>public-key       encryption</code> وأغلب بروتوكولات <code>key exchange</code></p>
<p>asymmetric-key algorithm
انظر <code>public-key algorithm</code></p>
<p>public-key encryption
تشفير بالمفتاح العام (public-key encryption): تشفير يستعمل زوجًا من
مفتاحين مختلفين للتعمية ولفكّ التعمية. ويُعرف أيضًا بالتشفير
بالمفتاح غير المتماثل. قارن :term:<code>secret-key       encryption</code></p>
<p>asymmetric-key encryption
انظر <code>public-key encryption</code></p>
<p>key exchange
تبادل المفاتيح (key exchange): عمليّة تبادل المفاتيح عبر وسيط غير
آمن باستعمال بروتوكول تشفيريّ معيّن. ويُصمَّم عادةً ليكون آمنًا في
وجه المتجسّسين. ويُعرف أيضًا باتّفاق المفاتيح (key agreement)</p>
<p>key agreement
انظر <code>key exchange</code></p>
<p>oracle
آلة إجابة (oracle): «صندوق أسود» يؤدّي لك حسابًا ما</p>
<p>encryption oracle
آلة إجابة تشفيرية (encryption oracle): <code>oracle</code> تُعمّي بعض البيانات</p>
<p>OTR messaging
رسائل OTR: مراسلة خارج السجلّ (off-the-record messaging)، وهي
بروتوكول مراسلة يرمي إلى محاكاة خصائص محادثة خاصة في الواقع. ويعمل
فوق بروتوكولات المراسلة الفورية الموجودة</p>
<p>cross-site request forgery
انتحال الطلب عبر المواقع (cross-site request forgery): نوع من
الهجمات يخدع فيها موقعٌ خبيث المتصفّح كي يُجري طلبات إلى موقع آخر.
ويمكن منعه عبر المصادقة الصحيحة على الطلبات بدل الاعتماد على صلاحية
ضمنية مثل كوكيز الجلسة</p>
<p>\\renewcommand{\\indexname}{Index}
\\printindex</p>
`,r={book:n,chapter:e,chapterTitle:o,slug:c,title:t,headings:p,html:i};export{n as book,e as chapter,o as chapterTitle,r as default,p as headings,i as html,c as slug,t as title};
