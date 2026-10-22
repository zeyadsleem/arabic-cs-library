---
title: "حاويات التطوير وملفات Dockerfile"
---

توفّر حاويات التطوير درجة عالية من التخصيص لتلائم احتياجات مشروعك وتفضيلاتك الشخصية تمامًا. لنغص في تقنيات التخصيص المتقدّمة. فمع أن استخدام صور جاهزة عبر خاصية `image` في `devcontainer.json` مناسب، فإن استخدام **Dockerfile** للتخصيص الأكثر تقدمًا يوفّر تحكّمًا لا يُضاهى في صورة حاويتك.

1. **أنشئ `Dockerfile`:** أنشئ ملفًا باسم `Dockerfile` داخل مجلد `.devcontainer` في مشروعك.
2. **عدّل `devcontainer.json`:** في `devcontainer.json`، استبدل خاصية `image` بـ`dockerFile` وحدّد مسار Dockerfile الخاص بك.

```json
{
  "dockerFile": "Dockerfile"
}
```

إذا كان Dockerfile في المجلد نفسه الذي يضمّ `devcontainer.json`، فاستخدم `"dockerFile": "Dockerfile"` ببساطة. وإذا كان في مجلد فرعي، فاستخدم مسارًا نسبيًا مثل `"dockerFile": "./path/to/Dockerfile"`.

## أمثلة على تخصيص Dockerfile

### تثبيت برمجيات إضافية

استخدم تعليمات `RUN` في Dockerfile لتثبيت أي حزم برمجية أو مكتبات أو أدوات يحتاجها بيئتك.

```dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:18
RUN apt-get update && apt-get install -y --no-install-recommends \

graphicsmagick
```

يضيف هذا المثال مكتبة معالجة الصور `graphicsmagick` إلى حاوية تطوير Node.js.

### ضبط إعدادات النظام

استخدم تعليمات `RUN` لتعديل إعدادات النظام داخل الحاوية.

```dockerfile
FROM mcr.microsoft.com/devcontainers/python:3.10
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen && \

locale-gen

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
```

يضبط هذا المثال اللغة المحلية (locale) داخل حاوية تطوير Python على UTF-8.

### إعداد الخدمات (قواعد البيانات، ونواقل الرسائل)

مع أن ملفات Dockerfile مخصّصة أساسًا لبناء الصور، يمكنك استخدام أوامر `RUN` لإعداد خدمات بسيطة. لكن بالنسبة إلى البنى الأكثر تعقيدًا متعدّدة الحاويات مع قواعد البيانات ونواقل الرسائل وغيرها، فكّر في استخدام **Docker Compose** (وسنتناوله لاحقًا).

```dockerfile
FROM mcr.microsoft.com/devcontainers/go:1.20
RUN apt-get update && apt-get install -y --no-install-recommends \

postgresql-client
```

يثبّت هذا المثال أدوات عميل PostgreSQL في حاوية تطوير Go.

### صور أساسية مخصّصة

يمكنك استخدام أي صورة Docker كصورة أساسية في Dockerfile، بما في ذلك صور مخصّصة تنشئها وتستضيفها بنفسك أو صور من سجلات خاصة.

## أفضل الممارسات لملفات Dockerfile في حاويات التطوير

- **ابدأ بصورة أساسية جيدة الصيانة:** ابدأ `Dockerfile` بـ`FROM` من صورة أساسية موثوقة وجيدة الصيانة وذات صلة بمنظومتك التقنية (مثل الصور الرسمية للغات، وصور Microsoft Dev Container).
- **تحسين الطبقات:** اتبع أفضل ممارسات Dockerfile في الطبقات الفعّالة والتخزين المؤقت لتسريع عمليات بناء الحاويات (اجمع الأوامر المترابطة في تعليمة `RUN` واحدة، ورتّب التعليمات بذكاء).
- **أبقِه بسيطًا (في البداية):** ابدأ بملف Dockerfile يضمّ البرمجيات والإعدادات الأساسية. وأضف التخصيصات تدريجيًا عند الحاجة. فملفات Dockerfile المعقّدة أكثر من اللازم قد تزيد زمن البناء وعبء الصيانة.
- **تثبيت الإصدارات (الاعتمادات):** فكّر في تثبيت إصدارات حزم البرمجيات والاعتمادات في Dockerfile لضمان قابلية إعادة الإنتاج وتجنّب التغييرات غير المتوقّعة عند تحديث الصور الأساسية.
