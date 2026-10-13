---
title: "Hono CLI"
book: hono
chapter: agents
slug: cli
order: 90
source: https://hono.dev/docs/agents/cli
lang: ar
---

Hono CLI (`hono`) هي أداة سطر أوامر (CLI) لـ Hono، مصممة للوكلاء البرمجيين (coding agents). تحمّل تطبيق Hono الخاص بك مباشرة، لذا يمكن للوكيل فحص التطبيق واختباره دون تشغيل خادم. تطبع الأوامر JSON افتراضيًا. `routes`, `request`, `benchmark`، و `ssg` خذ `--plain` عندما يقرأ الإنسان المخرجات.

## التثبيت

ثبّته في مشروعك. يجد وكلاء البرمجة في `package.json`.

```sh
npm install -D @hono/cli
```

أو بشكل عام:

```sh
npm install -g @hono/cli
```

## المخرجات

تطبع الأوامر JSON إلى stdout. `snapshot` يطبع بدلاً من ذلك أسطر JSONL دفعةً واحدة.

- النجاح: `{ "ok": true, "data": ... }` مع رمز الخروج 0
- الفشل: `{ "ok": false, "error": { "code", "message", "suggestions", "docs" } }` مع رمز الخروج 1

عند الفشل، `error.suggestions` يذكر ما يجب تجربته لاحقًا، و `error.docs` يشير إلى صفحة على هذا الموقع. تذهب السجلات إلى stderr.

`hono --help` يبدأ بملاحظة قصيرة لوكلاء البرمجة، و `hono <command> --help` يحتوي على أمثلة وملاحظات لكل أمر. لا يحتاج الوكيل (agent) إلى أي شيء آخر لاستخدام واجهة CLI.

## الأوامر

| الأمر                      | ما الذي يفعله                                           |
| ---------------------------- | ------------------------------------------------------ |
| `hono routes [file]`         | اعرض مسارات تطبيق Hono الخاص بك                           |
| `hono request [path] [file]` | أرسل طلبًا إلى تطبيقك باستخدام `app.request()`       |
| `hono batch <source> [file]` | شغّل طلبات متعددة من JSONL باستخدام `app.request()` |
| `hono snapshot [file]`       | اطبع السلوك الحالي كأسطر JSONL دفعية        |
| `hono diff`                  | اعرض ما تغيّره تغييراتك غير المُلتزَم بها              |
| `hono benchmark [file]`      | قِس أداء تطبيق Hono الخاص بك               |
| `hono ssg [file]`            | ولِّد ملفات ثابتة من تطبيق Hono الخاص بك               |
| `hono init`                  | أضِف تطبيق Hono إلى الدليل الحالي                |

`file` هو المسار إلى ملف تطبيقك. عند حذفه، يتم العثور على التطبيق في `src/index.ts`, `src/index.tsx`, `src/index.js`، أو `src/index.jsx`. TypeScript وJSX مدعومان.

### routes

اعرض جميع مسارات تطبيق Hono لديك، مثل [`showRoutes()`](https://hono.dev/docs/helpers/dev#showroutes). يتم حل المسارات (routes) من مثيل التطبيق الفعلي، لذا فإن التطبيقات الفرعية المُثبَّتة (sub-apps) و `basePath` يتم توسيعها.

```sh
hono routes
hono routes --verbose src/app.ts
```

- `--verbose` - تضمين البرمجيات الوسيطة
- `--plain` - مخرجات مقروءة للبشر بدلاً من JSON
- `-e, --external <package>` - وضع علامة على حزمة كخارجية (external) (يمكن استخدامه عدة مرات)

```json
{
  "ok": true,
  "data": {
    "router": "SmartRouter + RegExpRouter",
    "routes": [
      {
        "method": "GET",
        "path": "/",
        "name": "[handler]",
        "isMiddleware": false
      },
      {
        "method": "POST",
        "path": "/posts",
        "name": "[handler]",
        "isMiddleware": false
      }
    ]
  }
}
```

### request

أرسل طلبًا إلى تطبيقك عبر `app.request()`. لا حاجة إلى خادم. `path` يُضبط افتراضيًا على `/`.

```sh
hono request /
hono request /users/123
hono request /api/users -X POST -d '{"name":"Alice"}'
hono request /todos -X POST -d 'title=milk'
hono request /api/protected -H 'Authorization: Bearer token'
cat payload.json | hono request /api/users -X POST -d @-
hono request /api/users/123 --trace
hono request / --runtime bun
```

- `-X, --method <method>` - طريقة HTTP (الافتراضي: `GET`)
- `-d, --data <data>` - جسم الطلب (`@file` يقرأ ملفًا، `@-` يقرأ من stdin). يتم إرسال كائن أو مصفوفة JSON بصيغة JSON، وأي شيء آخر كنموذج (form)، ما لم `-H` يعيّن `Content-Type`
- `-H, --header <header>` - ترويسة مخصّصة (يمكن استخدامها عدة مرات)
- `--trace` - تضمين المسارات المطابقة في المخرجات
- `--runtime <runtime>` - شغِّل التطبيق على `node` (افتراضي)، `bun`, `deno`, `workerd`، أو `vite`
- `--compact` - JSON في سطر واحد بدون الترويسات
- `--no-bindings` - تخطّي تحميل ارتباطات Cloudflare المحلية
- `-w, --watch` - مراقبة التغييرات وإعادة إرسال الطلب
- `-o, --output <file>` - كتابة جسم الاستجابة إلى ملف
- `--plain` - طباعة الجسم الخام كما في curl (`-i` يضيف الحالة والترويسات، `-I` يعرضها فقط)

يُضمَّن جسم استجابة JSON ككائن:

```json
{
  "ok": true,
  "data": {
    "status": 200,
    "headers": { "content-type": "application/json" },
    "body": { "message": "Hello World" }
  }
}
```

مع `--trace`، المخرجات تحتوي على `matchedRoutes`: أي وسيطة وأي معالج تطابق مع الطلب، وأيهما استجاب. تشير نتيجة 404 إلى ضرورة تشغيله.

يمكنك أيضًا تمرير شفرة التطبيق من stdin عبر `-` كالملف. `app` معرّف مسبقًا ومُصدَّر لك:

```sh
echo 'app.get("/hello", (c) => c.json({ ok: true }))' | hono request /hello -
```

#### ارتباطات Cloudflare

في مشروع يحتوي على إعدادات wrangler، `c.env` يحمل الارتباطات المحلية الحقيقية (KV و D1 و R2 و vars) تلقائيًا، بينما يعمل التطبيق على Node.js. يعمل هذا في `request`, `batch`, `snapshot`، و `ssg`. تخطَّه باستخدام `--no-bindings`. يحتاج [wrangler](https://developers.cloudflare.com/workers/wrangler/) المثبّتة في المشروع.

`--runtime workerd` يشغّل التطبيق بالكامل داخل workerd بدلًا من ذلك، مع إعداد wrangler. إنه أثقل، لكنه وقت التشغيل الكامل. نقطة الدخول هي `main` في إعداد wrangler، لذا لا تمرّر وسيط ملف.

#### Vite

`--runtime vite` يرسل الطلبات عبر خادم تطوير Vite الخاص بالمشروع، لتطبيق يبنيه إضافة (plugin) Vite. يأتي التطبيق من إعداد Vite، لذا لا تمرر وسيطة ملف. وهو الافتراضي في مشروع به `cloudflare.config.ts` وإعداد Vite، حيث `c.env` يحتوي على الارتباطات، وفي مشروع Vite بدون `src/index.ts`. يعمل هذا في `request`, `batch`، و `snapshot`. وسيط ملف، `--no-bindings`, `--trace`، أو `--watch` يشغّل التطبيق على Node.js بدلاً من ذلك.

### batch

شغّل طلبات متعددة من JSONL في استدعاء واحد، بالترتيب، مقابل مثيل تطبيق واحد. تنتقل الحالة في الذاكرة (in-memory) بين الخطوات.

```sh
hono batch - <<'JSONL'
{"path":"/users","expect":{"status":200}}
{"method":"POST","path":"/users","body":{"name":"Momo"},"expect":{"status":201,"body":{"name":"Momo"}},"save":{"id":".id"}}
{"path":"/users/{{id}}","expect":{"status":200}}
{"method":"DELETE","path":"/users/{{id}}","expect":{"status":204}}
JSONL
```

كائن JSON واحد لكل سطر: `method`, `path`, `body`, `headers`, `expect`، و `save`.

- `expect` يعلن معايير القبول. `status` يتطابق تمامًا. `body` هي مطابقة جزئية عميقة (deep partial match): يجب أن تتطابق الحقول المعلنة، ويتم تجاهل الحقول الإضافية في الاستجابة.
- `save` يخزّن قيمة من نص الاستجابة (response body) عبر مسار نقطي (dot path)، وتستخدمها الخطوات اللاحقة كـ `{{id}}`.
- سلسلة نصية `body` يُرسل كنموذج (form)، أو بصيغة JSON عندما يكون كائن JSON أو مصفوفة، ما لم `headers` يضبط نوع المحتوى. كائن `body` يُرسَل بصيغة JSON.
- تنتقل ملفات تعريف الارتباط (cookies) عبر الخطوات كما في المتصفح. خطوة تسجيل الدخول التي تعيّن ملف تعريف ارتباط تسجّل الدخول في الخطوات التي تليها. `cookie` الترويسة في خطوة ما تفوز.
- خطوة بدون `expect` ينجح مع أي استجابة 2xx أو 3xx ويفشل مع 4xx أو 5xx. لقبول 4xx عن قصد، أعلن عنها بـ `expect.status`.
- خطوة فاشلة تحمل `diff`، سطر واحد لكل عدم تطابق.

تحتوي المخرجات على القيمة الفعلية `status` و `body` لكل خطوة، `pass` لكل خطوة، و `summary`. أعد التشغيل حتى `failed` هو 0.

- `-H, --header <header>` - ترويسة مشتركة لكل خطوة
- `--compact` - طباعة الخطوات الفاشلة والملخّص فقط
- `--runtime <runtime>` - `node` (افتراضي)، `workerd`، أو `vite`
- `--no-bindings` - تخطّي تحميل ارتباطات Cloudflare المحلية

### snapshot

اطبع السلوك الحالي للتطبيق كأسطر JSONL مجمعة إلى stdout. لا تتم كتابة أي ملف.

```sh
hono snapshot
hono snapshot --status-only src/app.ts
```

يتم تنفيذ مسارات GET الخالية من المعاملات (paramless)، وتصبح حالتها ونصها الفعليان `expect`. يتم تنفيذ مسار GET بمعامل أيضًا عندما يعرض التطبيق مسارًا له بالفعل، في رابط أو في حقل JSON باسم المعامل. المسارات الأخرى ذات المعاملات ومسارات غير GET تُطبع بدون `expect`، لتقوم بملئها. يسجل سطر فحص (probe) واحد الاستجابة لمسار لا يطابق أي مسار.

بخلاف `routes`، يرسل هذا الأمر طلبات حقيقية، لذا تُنفَّذ الوسيطة (middleware).

التقط قبل إعادة الهيكلة، ثم أعد تشغيل الأسطر بـ `hono batch` حتى `failed` هو 0.

- `--status-only` - التقاط رموز الحالة فقط، وليس الأجسام
- `--runtime <runtime>` - `node` (افتراضي)، `workerd`، أو `vite`
- `--no-bindings` - تخطّي تحميل ارتباطات Cloudflare المحلية

### diff

أظهر ما تفعله تغييراتك غير الملتزمة (uncommitted) بالتطبيق. يشغّل التطبيق عند آخر commit وكما هو الآن، ويقارن الإجابات. لا شيء لالتقاطه أولًا.

```sh
hono diff
hono diff --base main
```

- `--base <ref>` - الالتزام (commit) للمقارنة معه (الافتراضي: `HEAD`)

مسارات GET التي `hono snapshot` يُشغَّل وفحص 404 على كلا الجانبين. `changed` يسرد كل واحد يستجيب بشكل مختلف، مع الاختلافات في الحالة (status) والنص (body). المسارات التي تظهر أو تختفي تكون في `added` و `removed`. لا يتم تشغيل مسارات المعاملات (param routes) الأخرى والمسارات غير GET، لذا تحقق منها باستخدام `hono batch`.

يعمل كل جانب في شجرة عمل (worktree) مؤقتة في git مع بيانات محلية جديدة، لذا فإن البيانات التي كتبتها أثناء الاختبار لا تُحتسب. `node_modules` مشترك، و `.dev.vars` يُنسخ. فارغ `changed` بعد إعادة الهيكلة يعني أن مسارات GET تستجيب كما كانت سابقاً.

```json
{
  "ok": true,
  "data": {
    "base": "HEAD",
    "compared": 6,
    "changed": [
      { "route": "GET /api/posts", "status": "200 -> 401" }
    ],
    "added": ["POST /login"],
    "removed": []
  }
}
```

### benchmark

قم بقياس أداء تطبيق Hono الخاص بك. إنه معيار مصغر (micro benchmark) للتوجيه والمعالجات: `app.request()` يُستدعى مباشرة، دون مجموعة تقنيات HTTP ودون شبكة. كل تشغيل يحدث في عملية جديدة، لذا تكون النتائج قابلة للمقارنة.

```sh
hono benchmark
hono benchmark -P /users
hono benchmark -P /users -X POST -d '{"name":"Alice"}' -H 'Content-Type: application/json'
hono benchmark --hono 4.12.3 --hono 4.13.0
hono benchmark --hono ../hono
```

- `-P, --path <path>` - قياس أداء هذا المسار فقط (يمكن استخدامه عدة مرات)
- `-X`, `-d`, `-H` - الطريقة والجسم والترويسات لـ `-P` المسارات
- `--duration <ms>` - مدة قياس كل مسار (الافتراضي: `500`)
- `--warmup <count>` - الطلبات قبل القياس (الافتراضي: `30`)
- `--hono <version-or-path>` - قِس أداء (benchmark) التطبيق نفسه مع نسخة Hono أخرى: إصدار npm، أو نسخة محلية (checkout)

فرق بضعة بالمئة يعتبر ضجيجًا (noise). للمقارنة، شغّله أكثر من مرة وتحقق من أن الفرق يتكرر.

### ssg

أنشئ ملفات ثابتة من تطبيق Hono الخاص بك، مثل [مساعد SSG](https://hono.dev/docs/helpers/ssg).

```sh
hono ssg
hono ssg -o dist/static src/app.ts
hono ssg --exclude '/api/*'
```

- `-o, --outdir <dir>` - دليل المخرجات (الافتراضي: `static`)
- `--include <path>` / `--exclude <path>` - تحديد المسارات حسب المسار. `*` يطابق أي شيء
- `--no-bindings` - تخطّي تحميل ارتباطات Cloudflare المحلية

الصفحة التي لا تستجيب برمز 200 لا تتم كتابتها، بل تُدرج في `skipped` مع حالته، لذا تحقق منه بـ `hono request <path>`.

```json
{
  "ok": true,
  "data": {
    "output": "static",
    "files": ["static/index.html", "static/about.html"],
    "skipped": [{ "path": "/counter", "status": 500 }]
  }
}
```

### init

أضف تطبيق Hono من [`create-hono`](https://hono.dev/docs/guides/create-hono) القالب إلى الدليل الحالي. استخدمه في مشروع موجود بالفعل، حيث `npm create hono` لا يمكن.

```sh
npm install -D @hono/cli
npx hono init --template cloudflare-workers --install
npx hono request /
```

- `-t, --template <template>` - القالب، أحد `aws-lambda`, `bun`, `cloudflare-workers`, `deno`, `fastly`, `lambda-edge`, `netlify`, `nextjs`, `nodejs`, `vercel`، أو `x-basic`
- `-i, --install` - ثبّت التبعيات باستخدام مدير الحزم من ملف القفل (lockfile)، أو من الأمر الذي بدأ `hono`

بدون `--template`، يأتي القالب (template) من الملفات الموجودة في الدليل: `wrangler.jsonc` أو `cloudflare.config.ts` يعني `cloudflare-workers`, `deno.json` يعني `deno`, `bun.lock` يعني `bun`'، وهكذا دواليك. بدون تلميح، تعرض الطرفية قائمة للاختيار منها. بدون طرفية، يدرج الخطأ القوالب.

لا يتم أبدًا استبدال ملف موجود مسبقًا، بل يُدرج في `skipped`. `package.json` يُدمج، وتفوز قيمه الموجودة، باستثناء `type`، الذي يضبطه القالب إلى `module`. عند وجود تهيئة wrangler، لا يضيف القالب (template) `cloudflare.config.ts`، والعكس صحيح. بدون `--install`، شغّل مدير الحزم لديك بعد ذلك.

```json
{
  "ok": true,
  "data": {
    "template": "cloudflare-workers",
    "detectedFrom": "wrangler.jsonc",
    "written": ["src/index.ts"],
    "skipped": ["wrangler.jsonc"]
  }
}
```
