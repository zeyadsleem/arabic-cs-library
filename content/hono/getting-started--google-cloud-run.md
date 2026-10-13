---
title: "Google Cloud Run"
book: hono
chapter: getting-started
slug: google-cloud-run
order: 14
source: https://hono.dev/docs/getting-started/google-cloud-run
lang: ar
---

[Google Cloud Run](https://cloud.google.com/run) هي منصة بدون خادم (serverless) مبنية بواسطة Google Cloud. يمكنك تشغيل كودك استجابةً للأحداث وتدير Google تلقائيًا موارد الحوسبة الأساسية نيابة عنك.

يستخدم Google Cloud Run الحاويات لتشغيل خدمتك. هذا يعني أنه يمكنك استخدام أي وقت تشغيل تريده (مثلًا Deno أو Bun) من خلال توفير Dockerfile. إذا لم يتم توفير Dockerfile، سيستخدم Google Cloud Run حزمة البناء (buildpack) الافتراضية لـ Node.js.

يفترض هذا الدليل أن لديك بالفعل حساب Google Cloud وحساب فوترة.

## 1. تثبيت CLI

عند العمل مع Google Cloud Platform، من الأسهل التعامل مع [gcloud CLI](https://cloud.google.com/sdk/docs/install).

على سبيل المثال، على MacOS باستخدام Homebrew:

```sh
brew install --cask gcloud-cli
```

صادِق باستخدام CLI.

```sh
gcloud auth login
```

## 2. إعداد المشروع

أنشئ مشروعًا. اقبل معرف المشروع (project ID) المُنشأ تلقائيًا عند المطالبة (prompt).

```sh
gcloud projects create --set-as-default --name="my app"
```

أنشئ متغيرات بيئة لمعرّف مشروعك (project ID) ورقم مشروعك لسهولة إعادة الاستخدام. قد يستغرق الأمر حوالي 30 ثانية قبل أن يُرجع المشروع بنجاح مع `gcloud projects list` الأمر.

```sh
PROJECT_ID=$(gcloud projects list \
    --format='value(projectId)' \
    --filter='name="my app"')

PROJECT_NUMBER=$(gcloud projects list \
    --format='value(projectNumber)' \
    --filter='name="my app"')

echo $PROJECT_ID $PROJECT_NUMBER
```

ابحث عن معرّف حساب الفوترة الخاص بك.

```sh
gcloud billing accounts list
```

أضِف حساب الفوترة (billing) من الأمر السابق إلى المشروع.

```sh
gcloud billing projects link $PROJECT_ID \
    --billing-account=[billing_account_id]
```

فعّل واجهات API المطلوبة.

```sh
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com
```

حدّث صلاحيات حساب الخدمة (service account) للوصول إلى Cloud Build.

```sh
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

## 3. مرحبًا بالعالم

ابدأ مشروعك باستخدام الأمر "create-hono". اختر `nodejs`.

```sh
npm create hono@latest my-app
```

انتقل إلى `my-app` وثبّت التبعيات.

```sh
cd my-app
npm i
```

حدّث المنفذ في `src/index.ts` ليكون `8080`.

<!-- prettier-ignore -->
```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000 // [!code --]
  port: 8080 // [!code ++]
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
```

شغّل خادم التطوير محليًا. ثم افتح http://localhost:8080 في متصفح الويب الخاص بك.

```sh
npm run dev
```

## 4. النشر

ابدأ النشر واتبع المطالبات التفاعلية (على سبيل المثال، حدد منطقة).

```sh
gcloud run deploy my-app --source . --allow-unauthenticated
```

## تغيير بيئات التشغيل

إذا كنت تريد النشر باستخدام بيئتي تشغيل Deno أو Bun (أو حاوية Nodejs مخصصة)، أضف `Dockerfile` (واختياريًا `.dockerignore`) بالبيئة التي تريدها.

لمعلومات حول الحَوسَبة (containerizing)، يُرجى الرجوع إلى:

- [Node.js](https://hono.dev/docs/getting-started/nodejs#building-deployment)
- [`Bun`](https://bun.com/guides/ecosystem/docker)
- [Deno](https://docs.deno.com/examples/google_cloud_run_tutorial)
