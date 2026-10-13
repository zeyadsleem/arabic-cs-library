---
title: "الموجِّهات"
book: hono
chapter: concepts
slug: routers
order: 22
source: https://hono.dev/docs/concepts/routers
lang: ar
---

تُعدّ الموجِّهات (routers) أهم ميزات Hono.

يمتلك Hono خمسة موجّهات.

## RegExpRouter

**RegExpRouter** هو أسرع موجِّه (router) في عالم JavaScript.

على الرغم من أن هذا يُسمى "RegExp"، إلا أنه ليس تنفيذًا شبيهًا بـ Express يستخدم [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp).
إنها تستخدم حلقات خطية.
لذلك، سيتم إجراء مطابقة التعبيرات النمطية (regular expression) لجميع المسارات وستتدهور الأداء كلما زاد عدد المسارات لديك.

![](/images/hono/router-linear.jpg)

يحوّل RegExpRouter الخاص بـ Hono نمط المسار إلى "تعبير نمطي (regular expression) واحد كبير".
ثم يمكنه الحصول على النتيجة بمطابقة لمرة واحدة.

![](/images/hono/router-regexp.jpg)

يعمل هذا بشكل أسرع من الطرق التي تستخدم خوارزميات قائمة على الأشجار مثل radix-tree في معظم الحالات.

ومع ذلك، لا يدعم RegExpRouter جميع أنماط التوجيه، لذا يُستخدم عادةً مع أحد الموجهات الأخرى أدناه التي تدعم جميع أنماط التوجيه.

## TrieRouter

**TrieRouter** هو الموجِّه (router) الذي يستخدم خوارزمية شجرة Trie.
مثل RegExpRouter، فإنه لا يستخدم حلقات خطية.

![](/images/hono/router-tree.jpg)

هذا الموجّه ليس بنفس سرعة RegExpRouter، لكنه أسرع بكثير من موجّه Express.
يدعم الموجّه TrieRouter جميع الأنماط.

## SmartRouter

**SmartRouter** مفيد عندما تستخدم عدة موجهات (routers). يختار أفضل موجه عن طريق الاستدلال من الموجهات المسجلة.
يستخدم Hono SmartRouter وRegExpRouter وTrieRouter افتراضياً:

```ts
// Inside the core of Hono.
readonly defaultRouter: Router = new SmartRouter({
  routers: [new RegExpRouter(), new TrieRouter()],
})
```

عند بدء تشغيل التطبيق، يكتشف SmartRouter أسرع موجّه بناءً على التوجيه ويستمر في استخدامه.

## LinearRouter

RegExpRouter سريع، لكن مرحلة تسجيل المسارات قد تكون بطيئة بعض الشيء.
لذا، فهو غير مناسب لبيئة تتم تهيئتها مع كل طلب.

**LinearRouter** مُحسَّن لحالات "المرة الواحدة" (one shot).
تسجيل المسار أسرع بشكل ملحوظ من RegExpRouter لأنه يضيف المسار دون تجميع السلاسل، باستخدام نهج خطي.

فيما يلي إحدى نتائج الاختبارات المعيارية (benchmark)، والتي تتضمن مرحلة تسجيل المسارات.

```console
• GET /user/lookup/username/hey
----------------------------------------------------- -----------------------------
LinearRouter     1.82 µs/iter      (1.7 µs … 2.04 µs)   1.84 µs   2.04 µs   2.04 µs
MedleyRouter     4.44 µs/iter     (4.34 µs … 4.54 µs)   4.48 µs   4.54 µs   4.54 µs
FindMyWay       60.36 µs/iter      (45.5 µs … 1.9 ms)  59.88 µs  78.13 µs  82.92 µs
KoaTreeRouter    3.81 µs/iter     (3.73 µs … 3.87 µs)   3.84 µs   3.87 µs   3.87 µs
TrekRouter       5.84 µs/iter     (5.75 µs … 6.04 µs)   5.86 µs   6.04 µs   6.04 µs

summary for GET /user/lookup/username/hey
  LinearRouter
   2.1x faster than KoaTreeRouter
   2.45x faster than MedleyRouter
   3.21x faster than TrekRouter
   33.24x faster than FindMyWay
```

## PatternRouter

**PatternRouter** هو أصغر موجِّه (router) بين موجِّهات Hono.

بينما Hono مضغوط بالفعل، إذا كنت بحاجة إلى جعله أصغر حتى لبيئة ذات موارد محدودة، استخدم PatternRouter.

التطبيق الذي يستخدم PatternRouter فقط حجمه أقل من 15KB.

```console
$ npx wrangler deploy --minify ./src/index.ts
 ⛅️ wrangler 3.20.0
-------------------
Total Upload: 14.68 KiB / gzip: 5.38 KiB
```
