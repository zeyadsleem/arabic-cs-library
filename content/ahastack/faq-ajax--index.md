---
title: "أليس هذا مجرد AJAX؟"
lang: ar
source: https://ahastack.dev/faq/6/
---

لقد رأيت هذا النوع من الكلام على Twitter في إشارة إلى htmx:

![](/images/ahastack/faq-ajax-0-faq-ajax-1.CkPYS-s7_Z72IOa.webp)

![](/images/ahastack/faq-ajax-1-faq-ajax-2.NmTQt93N_20cLMO.webp)

![](/images/ahastack/faq-ajax-2-faq-ajax-3.CM2xLC79_9Q9Kj.webp)

أودّ أن أحثّك على النظر إليه بعقلٍ من جديد، وأن تجرّبه أولًا، بدلًا من القول «إنه مجرد AJAX».

إذا كان المقصود بـ AJAX «التواصل بين جهة العميل والخادم خارج طلب صفحة كاملة»، فنعم، htmx هي AJAX. تمامًا كما يحدث عندما تستخدم fetch() في شيفرة JavaScript في جهة العميل، أو Axios، أو react-query، أو أي مكتبة لجلب البيانات.

إلى جانب ذلك، لا يوجد شيء يشبه AJAX القديمة.

في AJAX القديمة، كان هناك كمّ هائل من شيفرة JavaScript.

جرّب قراءة أحد كتب AJAX التي كُتبت بين عامَي 2006 و2007 وسترى ذلك.

بين إطلاق الطلبات ومعالجة الاستجابة، كان الأمر كثيرًا.

htmx هي مقاربة تصريحية (declarative) لجلب البيانات، وللتفاعل بين الخادم وجهة العميل عبر HTTP بشكل عام، وهي أيضًا مقاربة تصريحية لتحديد ما يحدث *بعد* الاستجابة.

هي في الحقيقة امتداد لـ HTML.

تقدّم طبقة تجريد مذهلة، ويمكنها أن تقوم بالكثير من العمل نيابةً عنا.

وهذا يصنع فرقًا هائلًا.

مثل استخدام `p { color: red }` في CSS، أو استخدام [CSS Paint API](https://developer.chrome.com/blog/paintapi/) لتحقيق الأثر نفسه.

حتى ChatGPT لا يوصي بهذا:

![](/images/ahastack/faq-ajax-3-houdini.m5fFPpKF_Z1zXm0n.webp)
