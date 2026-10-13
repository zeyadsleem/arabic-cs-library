---
title: "`Create-hono`"
book: hono
chapter: guides
slug: create-hono
order: 70
source: https://hono.dev/docs/guides/create-hono
lang: ar
---

خيارات سطر الأوامر المدعومة بواسطة `create-hono` - مُهيّئ المشروع الذي يعمل عند تشغيلك `npm create hono@latest`, `npx create-hono@latest`، أو `pnpm create hono@latest`.

> [!NOTE]
> **لماذا هذه الصفحة؟** غالبًا ما تعرض أمثلة التثبيت / البدء السريع إعدادًا أدنى `npm create hono@latest my-app` الأمر. `create-hono` يدعم عدة علامات (flags) مفيدة يمكنك تمريرها لأتمتة وتخصيص إنشاء المشروع (اختيار القوالب، تخطي المطالبات، اختيار مدير الحزم، استخدام ذاكرة التخزين المؤقت المحلية، والمزيد).

## تمرير الوسائط:

عند استخدامك `npm create` (أو `npx`) يجب وضع الوسائط (arguments) المخصصة لسكربت التهيئة (initializer) **بعد** `--`. أي شيء بعد `--` يُمرَّر إلى المُهيِّئ (initializer).


```sh [npm]
# Forwarding arguments to create-hono (npm requires `--`)
npm create hono@latest my-app -- --template cloudflare-workers
```

```sh [yarn]
# "--template cloudflare-workers" selects the Cloudflare Workers template
yarn create hono my-app --template cloudflare-workers
```

```sh [pnpm]
# "--template cloudflare-workers" selects the Cloudflare Workers template
pnpm create hono@latest my-app --template cloudflare-workers
```

```sh [bun]
# "--template cloudflare-workers" selects the Cloudflare Workers template
bun create hono@latest my-app --template cloudflare-workers
```

```sh [deno]
# "--template cloudflare-workers" selects the Cloudflare Workers template
deno init --npm hono@latest my-app --template cloudflare-workers
```


## الوسائط الشائعة الاستخدام

| الوسيطة (Argument) | الوصف (Description) | المثال (Example) |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| `--template <template>` | حدد قالب بداية وتخطَّ مطالبة القالب التفاعلية. قد تتضمن القوالب أسماء مثل `bun`, `cloudflare-workers`, `vercel`، إلخ. | `--template cloudflare-workers` |
| `--install`             | تثبيت التبعيات تلقائيًا بعد إنشاء القالب. | `--install`                     |
| `--pm <packageManager>` | حدد مدير الحزم الذي سيتم تشغيله عند تثبيت التبعيات. القيم الشائعة: `npm`, `pnpm`, `yarn`.                                         | `--pm pnpm`                     |
| `--offline`             | استخدام ذاكرة التخزين المؤقت/القوالب المحلية بدلًا من جلب أحدث القوالب البعيدة. مفيد للبيئات غير المتصلة بالإنترنت أو للتشغيلات المحلية الحتمية (deterministic). | `--offline`                     |

> [!NOTE]
> المجموعة الدقيقة من القوالب (templates) والخيارات المتاحة تتم صيانتها بواسطة `create-hono` مشروع. تلخص صفحة التوثيق هذه العلامات (flags) الأكثر استخدامًا — راجع المستودع المرتبط أدناه للحصول على المرجع الكامل والموثوق.

## أمثلة على التدفقات

### بسيط وتفاعلي

```bash
npm create hono@latest my-app
```

سيسألك هذا عن القَالَب والخيارات.

### غير تفاعلي، اختر القالب (template) ومدير الحزم (package manager)

```bash
npm create hono@latest my-app -- --template vercel --pm npm --install
```

يُنشئ هذا `my-app` باستخدام `vercel` القالب، يثبّت التبعيات باستخدام `npm`، ويتخطى المطالبات التفاعلية.

### استخدام التخزين المؤقت دون اتصال (بدون شبكة)

```bash
pnpm create hono@latest my-app --template deno --offline
```

## استكشاف الأخطاء وإصلاحها ونصائح

- إذا بدا أن أحد الخيارات غير معروف، فتأكد من أنك تمرّره باستخدام `--` عند استخدام `npm create` / `npx` .
- للاطلاع على أحدث قائمة بالقوالب (templates) والأعلام (flags)، راجع `create-hono` المستودع (repository) أو شغّل أداة التهيئة (initializer) محليًا واتبع مخرجات المساعدة الخاصة بها.

## روابط ومراجع

- `create-hono` المستودع: [`create-hono`](https://github.com/honojs/create-hono)
