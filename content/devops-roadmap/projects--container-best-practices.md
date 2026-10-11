---
title: "مشروع حالة استخدام: تطبيق أفضل ممارسات حاويات Docker"
lang: ar
source: https://devopsroadmap.io/projects/container-best-practices
---

# مشروع حالة استخدام: تطبيق أفضل ممارسات حاويات Docker

## الحالة

لديك [تطبيق JavaScript نموذجي](https://github.com/docker/getting-started-app)، وهو مدير قوائم مهام بسيط يعمل على Node.js، ومع ذلك لا حاجة إلى خبرة حقيقية في JavaScript. سنشغّله فقط.

## المهمة

- أنشئ `Dockerfile` لتغليف المشروع في حاوية.
- طبّق أفضل ممارسات حاويات Docker للعمل بفعالية وفق أبرز قواعد «أفعل» و«لا تفعل».
- أنشئ خط أنابيب CI لأتمتة فحوص أفضل الممارسات.

## المتطلّبات

تأكّد من تطبيق أفضل الممارسات التالية.

- **الممارسات الأساسية**
  - استخدم مدقّق (linter) لـ Dockerfile
  - تحقّق من أفضل الممارسات الخاصة بلغة Docker
  - اكتب تطبيقًا واحدًا لكل صورة Docker
  - أنشئ حاويات مؤقّتة (ephemeral) قابلة للضبط

- **ممارسات الصورة**
  - استخدم صورة أساس (base image) مثالية
  - ثبّت الإصدارات في كل مكان
  - أنشئ صورة بالحجم الأمثل
  - استخدم المراحل المتعدّدة (multi-stage) متى أمكن
  - تجنّب أي ملفات غير ضرورية

- **ممارسات الأمان**
  - استخدم دائمًا صورًا موثوقة
  - لا تستخدم أبدًا مصادر غير موثوقة
  - لا تخزّن أبدًا بيانات حسّاسة داخل الصورة
  - استخدم مستخدمًا غير جذري (non-root)
  - افحص ثغرات الصورة

- **ممارسات متنوّعة**
  - استفد من ذاكرة بناء Docker المؤقّتة (build cache)
  - تجنّب ذاكرة النظام المؤقّتة
  - أنشئ صورة موحّدة عبر البيئات
  - استخدم ENTRYPOINT مع CMD

## إضافات

البناء:

```shell
docker build . -t docker-sample-app:v1
```

التشغيل:

```shell
docker run -p 3000:3000 docker-sample-app:v1
```

العرض:

```
http://localhost:3000
```

## المصادر

- [الحاويات - أساسيات Docker](#27-containers---docker-fundamentals)
- [الحاويات - أفضل ممارسات Docker](#35-containers---docker-best-practices)
- [التكامل المستمر - أساسيات GitHub Actions](#37-continuous-integration---github-actions-essentials)
- [التكامل المستمر - خطوط الأنابيب وبوابات الجودة](#38-continuous-integration---pipelines-and-quality-gates)

## المرجع

::: {.tip}

حين تنتهي، قارن حلّك بـ[المرجع](https://github.com/DevOpsHiveHQ/dynamic-devops-roadmap/blob/main/docs/projects/container-best-practices/reference).

تأكّد من فهمك لجميع جوانب المرجع.
:::
