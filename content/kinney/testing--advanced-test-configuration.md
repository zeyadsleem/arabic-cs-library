---
title: "إعداد اختبارات متقدم باستخدام Vitest"
lang: ar
source: "https://stevekinney.com/courses/testing/advanced-test-configuration"
---

## تخصيص `vitest.config.ts`

Vitest رائع جدًا خارج الصندوق، لكنك تحتاج أحيانًا إلى تخصيص الأشياء لتلائم مشروعك. وهذا يقودنا إلى ملف `vitest.config.ts`.

> **هذا محتوى متعلق بـ Vite في معظمه**
>
> معظم ما نغطيه هنا يتعلق بـ Vite — وبالتالي بـ Vitest. لدى أصدقائنا في [Frontend Masters](https://frontendmasters.com/?utm_source=kinney&utm_medium=social&code=kinney) [دورة كاملة عن Vite](https://frontendmasters.com/courses/vite/?utm_source=kinney&utm_medium=social&code=kinney) يدرّسها مدرّب *بالغ الأناقة*.

إليك إعدادًا أساسيًا للتذكير:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

يمنحك هذا إعدادًا معقولًا — متغيرات عامة متاحة عبر كل الاختبارات، باستخدام `jsdom` — لكن قوة Vitest الحقيقية تظهر عندما تبدأ في ثني هذا الإعداد.

### إعداد أسماء مستعارة للمسارات

لننجز شيئًا بسيطًا لكنه قوي: **الأسماء المستعارة للمسارات**. إن كنت غارقًا في مشروع كبير، فمن المحتمل أن استيراداتك بدأت تبدو فوضى متشابكة من المسارات النسبية.

```typescript
import MyComponent from '../../../../../component/MyComponent';
```

*يا للهول*، أليس كذلك؟ حان وقت الاستفادة من قابلية ضبط Vitest. يمكنك إعداد أسماء مستعارة للمسارات لترتيب الأمور.

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
```

الآن في اختباراتك، الأمر أنظف بكثير:

```typescript
import MyComponent from '@components/MyComponent'; // Phew.
```

أنيق ومقروء. وإضافةً إلى ذلك، صرنا أقرب بخطوة إلى قاعدة شيفرة قابلة للصيانة.

### التعامل مع ESM وCommonJS معًا

آه، فوضى وحدات JavaScript الحديثة. من المحتمل أنك تصادف كليهما في مشروعك، وقد يصبح الأمر سيئًا عندما تحاول اختبارهما. تحتاج أحيانًا إلى معالجة CommonJS وESM *بشكل مختلف*. لا مشكلة — Vitest يغطيك.

```typescript
export default defineConfig({
  test: {
    deps: {
      fallbackCJS: true, // Handle CommonJS dependencies that break ESM resolution
    },
  },
});
```

قد يوفر عليك هذه الإضافة الصغيرة صداعًا عند اختبار حزم تعمل بـ `require()` بينما تعيش شيفرتك في أرض `import` المجيدة.

### عزل بيئات الاختبار

إليك سيناريو سريع. لنفترض أنك تختبر تطبيق Node. أنت تستخدم **قراءات ملفات** فعلية، وهي *بطيئة*. لكنك تعرف المحاكاة، أليس كذلك؟ لكن انتظر! قبل أن تدخل في المحاكاة (وهي قصة أخرى)، يتيح لك Vitest تشغيل كل ملف اختبار في **عزل** تام — أشبه بإعادة ضبط صغيرة بين كل تشغيل.

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    isolate: true, // Ensure each test file runs in its own VM context
  },
});
```

يحوّل هذا كل ملف اختبار إلى فقاعة خاصة به. يعني ذلك أنك إن كنت تغيّر `global variables`، أو تعبث بالخوادم، أو تعدّل حالات API، فسيستعيد Vitest الهدوء وينظّف الحي تلقائيًا بعد كل ملف.

## مهل الاختبار وإعادة التشغيل

إذن، ماذا يحدث عندما يستمر أحد اختباراتك، مثلًا… إلى الأبد. ربما يعتمد على زمن استجابة الشبكة أو يستغرق ثانية لإطلاق الموارد. لا تريد أن تتعطل مجموعة اختباراتك لأن اختبارًا واحدًا يشعر بالكسل، أليس كذلك؟ يتيح لك Vitest ضبط **مهل عامة**، ويمكنك أيضًا ضبطها على أساس *اختبار باختبار*. استعد لتوفير دقائق ثمينة من حياتك:

### المهل العامة

```typescript
export default defineConfig({
  test: {
    testTimeout: 5000, // 5 seconds, if it takes longer, something is wrong.
  },
});
```

هذا صحيح، 5000 مللي ثانية. وقت أكثر من كافٍ لمعظم الاختبارات. إن استغرق أي شيء وقتًا أطول، سيصرخ Vitest في وجهك، وربما حان الوقت للتحقيق في **السبب**.

### إعادة تشغيل الاختبار: تأمين ضد الاختبارات المتقلبة

ذلك الاختبار العارض الذي يقرر فجأة أنه يريد بعض الاهتمام بالفشل عشوائيًا؟ (نعم، *كلنا* لدينا ذلك الاختبار *الواحد*.) لنخبر Vitest أن يعيد تشغيله تلقائيًا بضع مرات قبل اعتباره فاشلًا:

```typescript
export default defineConfig({
  test: {
    retry: 2, // Will rerun a failing test 2 times before marking it as failed
  },
});
```

بوم — لا مزيد من ضرب الرأس بسبب «فشل في CI لكنه نجح محليًا». لكن مهما كان، إن كان يفشل أكثر من مرتين، فحان وقت **أنت** لتشغيل قبعة المحقق.

## ضبط دقيق لوضع المراقبة

إليك ما يحدث عادةً بعد أن تبدأ دمج **وضع المراقبة** في حياتك: تجري تغييرًا صغيرًا في الشيفرة، يكتشفه Vitest، يشغّل مئات الاختبارات، وفجأة تشتعل وحدة المعالجة المركزية. نعم، تشغيل كل شيء قد يكون مبالغة. لحسن الحظ، يمكننا تحسين الاختبارات التي تُشغَّل في كل دورة مراقبة لسرعة أفضل.

### تشغيل الاختبارات المتغيرة فقط

```typescript
export default defineConfig({
  test: {
    watch: {
      include: ['src/**'],
      exclude: ['node_modules/**', '*.spec.js'], // avoid triggering for these
    },
  },
});
```

بهذه الطريقة، تصبح أكثر انتخابية بكثير أثناء تشغيل اختباراتك — ما يتيح لك التركيز على التغييرات المهمة فقط.

## الخاتمة {#conclusion}

الهدف هنا ليس كتابة اختبارات نظيفة تمامًا فحسب — **بل البقاء عاقلًا** أثناء ذلك. خذ هذه النصائح كصندوق أدواتك المتقدم لاستخدام Vitest في المرة القادمة التي يضرب فيها التعقيد.
