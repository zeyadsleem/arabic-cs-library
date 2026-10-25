---
title: "تهيئة OpenClaw"
lang: ar
source: "https://stevekinney.com/courses/openclaw/openclaw-setup"
---

وبعد أن ننهي [التثبيت](https://stevekinney.com/courses/openclaw/installation)، سنحتاج إلى بعض أعمال التهيئة كي تبدأ نسخة OpenClaw الخاصة بنا العمل.

أول ما سنفعله هو تعيين النماذج التي سنستخدمها. وهذا قرار شخصي بطبيعة الحال، لكن إليك بعض الافتراضيات المعقولة.

![إعدادات النماذج تعرض النموذج الأساسي، والنموذج المساعد، ونموذج القرار، ونموذج الاحتياط، والتفكير، والوضع السريع](/images/kinney/0ef6e78fd52956bc.webp)

## ضبط إعدادات الأمان

**اختياري:** يملك OpenClaw افتراضيًا صلاحية كاملة لتنفيذ الأوامر. ومن أمر قد ترغب في التفكير فيه أن يطلب منك الإذن قبل تشغيل أي أمر غير موجود في قائمة السماح (allowlist).

```bash
openclaw exec-policy preset cautious
```

شغّل هذا على الجهاز الذي تعمل عليه البوابة. ويشرح [الأمن والموافقات](https://stevekinney.com/courses/openclaw/security-and-approvals) ما الذي يغيّره، وكيف تصلك طلبات الموافقة، وبقية ضوابط الأمان في OpenClaw.
