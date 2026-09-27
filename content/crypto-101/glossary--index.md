---
title: "المسرد"
lang: ar
source: https://www.crypto101.io/
---

# المسرد

   AEAD
      التشفير الموثَّق مع بيانات مرتبطة (Authenticated Encryption with
      Associated Data)

   AES
      معيار التشفير المتقدّم (Advanced Encryption Standard)

   AKE
      تبادل المفاتيح الموثَّق (authenticated key exchange)

   ARX
      جمع وإزاحة والاو الحصري (add, rotate, XOR)

   BEAST
      استغلال المتصفّح ضد SSL/TLS (Browser Exploit Against SSL/TLS)

   CBC
      سَلْسَلة كتل الشيفرة (cipher block chaining)

   CDN
      شبكة توزيع المحتوى (content distribution network)

   CSPRNG
      مولّد أرقام شبه عشوائي آمن تشفيريًّا (cryptographically secure
      pseudorandom number generator)

   CSRF
      `cross-site request forgery`

   DES
      معيار تشفير البيانات (Data Encryption Standard)

   FIPS
      معايير معالجة المعلومات الفيدرالية (Federal Information Processing
      Standards)

   GCM
      وضع عدّاد غالوا (Galois Counter Mode)

   HKDF
      دالة اشتقاق المفاتيح القائمة على HMAC وبأسلوب الاستخلاص والتوسيع
      (HMAC-based (Extract-and-Expand) Key Derivation Function)

   HMAC
      رمز مصادقة الرسالة القائم على التجزئة (Hash-based Message
      Authentication Code)

   HSTS
      أمن النقل الصارم لـ HTTP (HTTP Strict Transport Security)

   IV
      `initialization vector`

   KDF
      دالة اشتقاق المفاتيح (key derivation function)

   MAC
      رمز مصادقة الرسالة (message authentication code)

   MITM
      الوسيط في المنتصف (man-in-the-middle)

   OCB
      كتاب الشيفرات بالإزاحة (offset codebook)

   OTR
      خارج السجلّ (off-the-record)

   PRF
      دالة شبه عشوائية (pseudorandom function)

   PRNG
      مولّد أرقام شبه عشوائية (pseudorandom number generator)

   PRP
      تبديل شبه عشوائي (pseudorandom permutation)

   RSA
      ريفست-شامير-أدلمان (Rivest Shamir Adleman)

   SMP
      بروتوكول المليونير الاشتراكي (socialist millionaire protocol)

   secret-key encryption
      تشفير بالمفتاح السرّي (secret-key encryption): تشفير يستعمل المفتاح
      نفسه في التعمية وفي فكّ التعمية معًا. ويُعرف أيضًا بالتشفير بالمفتاح
      المتماثل (symmetric-key encryption). قارن `public-key encryption`

   symmetric-key encryption
      انظر `secret-key encryption`

   keyspace
      فضاء المفاتيح (keyspace): مجموعة كلّ المفاتيح الممكنة

   block cipher
      شيفرة كتل (block cipher): خوارزمية تشفير متماثل تُعمّي وتُفكّ تشفير
      كتل ذات مقاس ثابت

   substitution-permutation network
      شبكة الاستبدال والتبديل (substitution-permutation network): تصميم
      عامّ لشيفرات الكتل تُعمَّى فيه الكتلة بتكرار الاستبدالات والتبديلات

   stream cipher
      شيفرة تيار (stream cipher): خوارزمية تشفير متماثل تُعمّي وتُفكّ تشفير
      تيارات ذات مقاس غير محدّد

   mode of operation
   modes of operation
      طريقة التشغيل (mode of operation): بناء عامّ يُعمّي ويفكّ تشفير
      التيارات، مبنيٌّ على شيفرة كتل

   ECB mode
      وضع ECB: وضع كتاب الشيفرات الإلكتروني (Electronic Codebook)؛ طريقة
      تشغيل تُقسَّم فيها النصّ الصريح إلى كتل تُعمَّى كلٌّ منها على حدة
      بالمفتاح نفسه. وهو الوضع الافتراضي في كثير من مكتبات التشفير، رغم
      وجود مشاكل أمنية كثيرة

   CBC mode
      وضع CBC: تسلسل كتل الشيفرة (Cipher Block Chaining)؛ طريقة تشغيل
      شائعة يُطبَّق فيها الاو الحصري على الكتلة المشفّرة السابقة مع
      الكتلة الصريحة أثناء التعمية. ويأخذ متجه تهيئة
      (initialization vector)، الذي يتولّى دور «الكتلة التي تسبق الكتلة
      الأولى»

   initialization vector
      متجه التهيئة (initialization vector): بيانات تستعمل لتهيئة بعض
      الخوارزميات مثل `CBC mode`. ولا يُشترط عادةً أن تكون سرّية، لكن
      يُشترط ألّا يمكن التنبّؤ بها. قارن `nonce` و`salt`

   CTR mode
      وضع CTR: وضع العدّاد (Counter)؛ يُنتج `nonce` مُدمجًا مع عدّاد
      تسلسلًا من المداخل لشيفرة الكتل؛ وتُعدّ كتل النصّ المشفَّر الناتجة
      هي تدفّق المفاتيح (keystream)

   nonce
      قيمة عشوائية وحيدة (nonce): **N**\umber used **once**، أي «رقم»
      (number) يُستعمل «مرّة واحدة» (once). تُستعمل في كثير من بروتوكولات
      التشفير. ولا يلزم عادةً أن تكون سرّية أو غير قابلة للتنبّؤ، لكن يلزم
      أن تكون فريدة. قارن `initialization vector` و`salt`

   AEAD mode
      وضع AEAD: صنف من `mode of operation` لـ `block cipher` يوفّر تشفيرًا
      موثَّقًا، فضلًا عن توثيق بعض البيانات المرتبطة غير المعمّاة

   OCB mode
      وضع OCB: وضع كتاب الشيفرات بالإزاحة (Offset Codebook)؛
      `AEAD mode` عالي الأداء، وللأسف يعترضه براءات الاختراع

   GCM mode
      وضع GCM: وضع عدّاد غالوا (Galois Counter)؛ `AEAD mode` يجمع
      `CTR mode` مع `Carter-Wegman MAC`

   message authentication code
      رمز مصادقة الرسالة (message authentication code): قطعة معلومات صغيرة
      تستعمل للتحقّق من أصالة الرسالة وسلامتها. ويُشار إليه غالبًا باسم
      الوسم (tag)

   one-time MAC
      MAC لمرّة واحدة (one-time MAC): `message authentication code` لا
      يمكن استعماله بأمان إلّا لرسالة واحدة. وفائدته الرئيسة زيادة الأداء
      مقارنةً بـ `MAC` القابل لإعادة الاستعمال

   Carter-Wegman MAC
      MAC كارتر-ويغمان (Carter-Wegman MAC): مخطّط
      `message authentication code` قابل لإعادة الاستعمال مبنيٌّ من
      `one-time MAC`. ويجمع بين مزايا الأداء وسهولة الاستعمال

   GMAC
      GMAC: جزء `message authentication code` في `GCM mode` يُستعمل على
      حدة

   salt
      ملح (salt): بيانات عشوائية تُضاف إلى آلة تشفيرية (crypto
      primitive)، عادةً دالة في اتجاه واحد مثل دالة تجزئة تشفيرية أو دالة
      اشتقاق مفاتيح، فتُخصّص هذه الدوالّ لتُنتج مخرجات مختلفة (بشرط أن
      يكون الملح مختلفًا). ويمكن استعماله لمنع هجمات المعجم مثلًا. ولا
      يلزم عادةً أن يكون سرّيًا، لكنّ سرّيته قد تحسّن الخصائص الأمنية
      للنظام. قارن `nonce` و`initialization vector`

   public-key algorithm
      خوارزمية المفتاح العام (public-key algorithm): خوارزمية تستعمل زوجًا
      من مفتاحين مترابطين لكن مختلفين. وتُعرف أيضًا بـ
      `asymmetric-key algorithm`. ومن أمثلتها :term:`public-key
      encryption` وأغلب بروتوكولات `key exchange`

   asymmetric-key algorithm
      انظر `public-key algorithm`

   public-key encryption
      تشفير بالمفتاح العام (public-key encryption): تشفير يستعمل زوجًا من
      مفتاحين مختلفين للتعمية ولفكّ التعمية. ويُعرف أيضًا بالتشفير
      بالمفتاح غير المتماثل. قارن :term:`secret-key
      encryption`

   asymmetric-key encryption
      انظر `public-key encryption`

   key exchange
      تبادل المفاتيح (key exchange): عمليّة تبادل المفاتيح عبر وسيط غير
      آمن باستعمال بروتوكول تشفيريّ معيّن. ويُصمَّم عادةً ليكون آمنًا في
      وجه المتجسّسين. ويُعرف أيضًا باتّفاق المفاتيح (key agreement)

   key agreement
      انظر `key exchange`

   oracle
      آلة إجابة (oracle): «صندوق أسود» يؤدّي لك حسابًا ما

   encryption oracle
      آلة إجابة تشفيرية (encryption oracle): `oracle` تُعمّي بعض البيانات

   OTR messaging
      رسائل OTR: مراسلة خارج السجلّ (off-the-record messaging)، وهي
      بروتوكول مراسلة يرمي إلى محاكاة خصائص محادثة خاصة في الواقع. ويعمل
      فوق بروتوكولات المراسلة الفورية الموجودة

   cross-site request forgery
      انتحال الطلب عبر المواقع (cross-site request forgery): نوع من
      الهجمات يخدع فيها موقعٌ خبيث المتصفّح كي يُجري طلبات إلى موقع آخر.
      ويمكن منعه عبر المصادقة الصحيحة على الطلبات بدل الاعتماد على صلاحية
      ضمنية مثل كوكيز الجلسة

   \renewcommand{\indexname}{Index}
   \printindex
