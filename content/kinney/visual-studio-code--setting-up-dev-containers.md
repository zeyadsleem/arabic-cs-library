---
title: "تهيئة حاويات التطوير"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/setting-up-dev-containers"
---

![تهيئة حاويات التطوير](/images/kinney/75da7687ea1671cb.webp)

يوفّر Visual Studio Code والمجتمع مجموعة غنية من تعريفات حاويات التطوير الجاهزة. وهي مفيدة للغاية للإعداد السريع لبيئات تطوير شائعة دون كتابة `devcontainer.json` من الصفر.

**الوصول إلى التعريفات الجاهزة:**

1. **عند إنشاء حاوية تطوير:** عندما تستخدم الأمر “Dev Containers: Add Dev Container Configuration Files…“، سيعرض عليك Visual Studio Code قائمة من التعريفات المعرّفة مسبقًا. ويُجلب ذلك من [مستودع vscode-dev-containers على GitHub](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/devcontainers/templates&authuser=1).
2. **وثائق إضافة Visual Studio Code Dev Containers:** توفّر وثائق إضافة “Remote - Containers” أيضًا روابط إلى قوائم منسّقة من التعريفات الجاهزة.

ويمكنك البدء بـ**Add Dev Container Configuration Files** من مركز الأوامر.

واجهة Visual Studio Code تعرض موضع أمر Dev Containers. بعد ذلك، اختر الحاوية التي تريد استخدامها.

![نافذة حوارية لاختيار إعداد حاوية جاهز](/images/kinney/0ba8e3ca93e05f43.webp)

في حال صورة **Node.js & TypeScript**، سيُسألك عن إصدار Node الذي تريد استخدامه.

![نافذة حوارية لاختيار إصدار Node.js للحاوية](/images/kinney/3e25a5bbebec65af.webp)

 بعد أن تختار حاويتك، يمكنك أيضًا انتقاء بعض البرمجيات الإضافية التي تريد ضمّها.

![نافذة حوارية لاختيار ميزات إضافية لحاوية التطوير](/images/kinney/97b1d1101062b295.webp)

ويمكنك تصفية هذه القائمة للعثور على ما تبحث عنه.

![قائمة مصفّاة بميزات حاويات التطوير](/images/kinney/065f0e4697e08a55.webp)

وأخيرًا، يمكنك إضافة بعض الملفات الإضافية.

![نافذة حوارية لاختيار ملفات إعدادات اختيارية](/images/kinney/92dfff9ebad73dd7.webp)

## النتيجة النهائية

في النهاية، ينبغي أن ترى شيئًا مثل هذا.

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/typescript-node
{
  "name": "Node.js & TypeScript",
  // Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm"

  // Features to add to the dev container. More info: https://containers.dev/features.
  // "features": {},

  // Use 'forwardPorts' to make a list of ports inside the container available locally.
  // "forwardPorts": [],

  // Use 'postCreateCommand' to run commands after the container is created.
  // "postCreateCommand": "yarn install",

  // Configure tool-specific properties.
  // "customizations": {},

  // Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
  // "remoteUser": "root"
}
```

## تخصيص التعريفات الجاهزة

التعريفات الجاهزة نقاط انطلاق ممتازة. ويمكنك تخصيصها أكثر بسهولة عبر تعديل ملف `devcontainer.json` المُولَّد. فيمكنك إضافة مزيد من الإضافات، وتخصيص الإعدادات، وتحويل المنافذ (forward ports)، وإضافة `postCreateCommand`، وغير ذلك، لتفصيل البيئة الجاهزة على مقاس احتياجات مشروعك تحديدًا.
