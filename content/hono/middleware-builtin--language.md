---
title: "البرمجية الوسيطة Language"
book: hono
chapter: middleware-builtin
slug: language
order: 43
source: https://hono.dev/docs/middleware/builtin/language
lang: ar
---

يحدد وسيط كاشف اللغة (Language Detector) تلقائيًا اللغة المفضلة للمستخدم (locale) من مصادر مختلفة ويجعلها متاحة عبر `c.get('language')`. تشمل استراتيجيات الكشف معاملات الاستعلام (query parameters) وملفات تعريف الارتباط والترويسات ومقاطع مسار URL. مثالية للتدويل (i18n) والمحتوى الخاص باللغة (locale).

## Import

```ts
import { Hono } from 'hono'
import { languageDetector } from 'hono/language'
```

## الاستخدام الأساسي

اكتشف اللغة من سلسلة الاستعلام (query string) وملف تعريف الارتباط والترويسة (بالترتيب الافتراضي)، مع الرجوع إلى الإنجليزية كبديل:

```ts
const app = new Hono()

app.use(
  languageDetector({
    supportedLanguages: ['en', 'ar', 'ja'], // Must include fallback
    fallbackLanguage: 'en', // Required
  })
)

app.get('/', (c) => {
  const lang = c.get('language')
  return c.text(`Hello! Your language is ${lang}`)
})
```

### أمثلة العميل

```sh
# Via path
curl http://localhost:8787/ar/home

# Via query parameter
curl http://localhost:8787/?lang=ar

# Via cookie
curl -H 'Cookie: language=ja' http://localhost:8787/

# Via header
curl -H 'Accept-Language: ar,en;q=0.9' http://localhost:8787/
```

## التكوين الافتراضي

```ts
export const DEFAULT_OPTIONS: DetectorOptions = {
  order: ['querystring', 'cookie', 'header'],
  lookupQueryString: 'lang',
  lookupCookie: 'language',
  lookupFromHeaderKey: 'accept-language',
  lookupFromPathIndex: 0,
  caches: ['cookie'],
  ignoreCase: true,
  fallbackLanguage: 'en',
  supportedLanguages: ['en'],
  cookieOptions: {
    sameSite: 'Strict',
    secure: true,
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: true,
  },
  debug: false,
}
```

## السلوكيات الأساسية

### سير عمل الاكتشاف

1. **الترتيب (Order)**: يفحص المصادر بهذا التسلسل افتراضياً:
   - معامل الاستعلام (?lang=ar)
   - ملف تعريف الارتباط (language=ar)
   - ترويسة Accept-Language

2. **التخزين المؤقت (Caching)**: يخزّن اللغة المكتشفة في ملف تعريف ارتباط (cookie) (سنة واحدة افتراضيًا)

3. **الاحتياطي**: يستخدم `fallbackLanguage` إذا لم يكن هناك اكتشاف صالح (يجب أن يكون في `supportedLanguages`)

## التكوين المتقدم

### ترتيب اكتشاف مخصص

أعطِ الأولوية لكشف مسار URL (مثل /en/about):

```ts
app.use(
  languageDetector({
    order: ['path', 'cookie', 'querystring', 'header'],
    lookupFromPathIndex: 0, // /en/profile → index 0 = 'en'
    supportedLanguages: ['en', 'ar'],
    fallbackLanguage: 'en',
  })
)
```

### المطابقة التدريجية للغة

عندما يكون رمز لغة مكتشف مثل `ja-JP` ليس في `supportedLanguages`، يقوم الوسيط (middleware) باقتطاع العلامات الفرعية (subtags) تدريجيًا للعثور على تطابق. على سبيل المثال، `zh-Hant-CN` سيحاول `zh-Hant`، ثم `zh`. تُفضَّل المطابقة التامة دائمًا.

```ts
app.use(
  languageDetector({
    supportedLanguages: ['en', 'ja', 'zh-Hant'],
    fallbackLanguage: 'en',
  })
)

// Accept-Language: ja-JP → matches 'ja'
// Accept-Language: zh-Hant-CN → matches 'zh-Hant'
```

### تحويل رمز اللغة

وحّد الرموز المعقّدة (مثل en-US → en):

```ts
app.use(
  languageDetector({
    convertDetectedLanguage: (lang) => lang.split('-')[0],
    supportedLanguages: ['en', 'ja'],
    fallbackLanguage: 'en',
  })
)
```

### تكوين ملفات تعريف الارتباط

```ts
app.use(
  languageDetector({
    lookupCookie: 'app_lang',
    caches: ['cookie'],
    cookieOptions: {
      path: '/', // Cookie path
      sameSite: 'Lax', // Cookie same-site policy
      secure: true, // Only send over HTTPS
      maxAge: 86400 * 365, // 1 year expiration
      httpOnly: true, // Not accessible via JavaScript
      domain: '.example.com', // Optional: specific domain
    },
  })
)
```

لتعطيل التخزين المؤقت للكوكيز:

```ts
languageDetector({
  caches: false,
})
```

### التصحيح

تسجيل خطوات الكشف:

```ts
languageDetector({
  debug: true, // Shows: "Detected from querystring: ar"
})
```

## مرجع الخيارات

### الخيارات الأساسية

| الخيار (Option) | النوع (Type) | الافتراضي (Default) | مطلوب (Required) | الوصف (Description) |
| :------------------- | :--------------- | :------------------------------------ | :------- | :--------------------- |
| `supportedLanguages` | `string[]`       | `['en']`                              | نعم      | رموز اللغات المسموح بها |
| `fallbackLanguage`   | `string`         | `'en'`                                | نعم      | اللغة الافتراضية       |
| `order`              | `DetectorType[]` | `['querystring', 'cookie', 'header']` | لا       | تسلسل الكشف            |
| `debug`              | `boolean`        | `false`                               | لا       | تفعيل التسجيل          |

### خيارات الاكتشاف

| الخيار                | النوع     | الافتراضي             | الوصف          |
| :-------------------- | :------- | :------------------ | :------------------- |
| `lookupQueryString`   | `string` | `'lang'`            | اسم معامل الاستعلام |
| `lookupCookie`        | `string` | `'language'`        | اسم ملف تعريف الارتباط          |
| `lookupFromHeaderKey` | `string` | `'accept-language'` | اسم الترويسة          |
| `lookupFromPathIndex` | `number` | `0`                 | فهرس مقطع المسار   |

### خيارات ملفات تعريف الارتباط

| الخيار                   | النوع                          | الافتراضي      | الوصف          |
| :----------------------- | :---------------------------- | :----------- | :------------------- |
| `caches`                 | `CacheType[] \| false`        | `['cookie']` | إعدادات التخزين المؤقت       |
| `cookieOptions.path`     | `string`                      | `'/'`        | مسار ملف تعريف الارتباط          |
| `cookieOptions.sameSite` | `'Strict' \| 'Lax' \| 'None'` | `'Strict'`   | سياسة SameSite      |
| `cookieOptions.secure`   | `boolean`                     | `true`       | HTTPS فقط           |
| `cookieOptions.maxAge`   | `number`                      | `31536000`   | الانتهاء (بالثواني) |
| `cookieOptions.httpOnly` | `boolean`                     | `true`       | إمكانية وصول JS     |
| `cookieOptions.domain`   | `string`                      | `undefined`  | نطاق ملف تعريف الارتباط        |

### خيارات متقدمة

| الخيار                    | النوع                       | الافتراضي     | الوصف               |
| :------------------------ | :------------------------- | :---------- | :------------------------ |
| `ignoreCase`              | `boolean`                  | `true`      | المطابقة بغض النظر عن حالة الأحرف |
| `convertDetectedLanguage` | `(lang: string) => string` | `undefined` | محوّل رمز اللغة |

## التحقق ومعالجة الأخطاء

- `fallbackLanguage` يجب أن يكون في `supportedLanguages` (يرفع خطأً أثناء الإعداد)
- `lookupFromPathIndex` يجب أن يكون ≥ 0
- التكوينات غير الصالحة تُلقي أخطاءً أثناء تهيئة (initialization) الوسيط
- تستخدم عمليات الكشف الفاشلة بصمت `fallbackLanguage`

## وصفات شائعة

### التوجيه على أساس المسار

```ts
app.get('/:lang/home', (c) => {
  const lang = c.get('language') // 'en', 'ar', etc.
  return c.json({ message: getLocalizedContent(lang) })
})
```

### لغات متعددة مدعومة

```ts
languageDetector({
  supportedLanguages: ['en', 'en-GB', 'ar', 'ar-EG'],
  convertDetectedLanguage: (lang) => lang.replace('_', '-'), // Normalize
})
```
