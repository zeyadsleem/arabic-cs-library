---
title: "تشغيل الاختبارات بالتوازي باستخدام سياق الاختبار"
---

**ملاحظة مهمة**: كي تُشغّل الاختبارات بالتوازي، عليك استخدام [سياق الاختبار](https://stevekinney.com/courses/testing/test-context). لذا إن لم نكن قد تحدثنا عن ذلك، فلنتوقف ونفعله الآن.

**باختصار**: تشغيل الاختبارات بالتوازي مفيد *أساسًا* فقط عندما تكون لديك مجموعة من الاختبارات غير المتزامنة طويلة التنفيذ (أي *غير الحاجزة*).

تأمّل هذا المثال السخيف كممارسة ذهنية:

```typescript
const sleep = (time = 1000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

describe('sleep', () => {
  it('should sleep for 500ms', async () => {
    await sleep(500);
    expect(true).toBe(true);
  });

  it('should sleep for 750ms', async () => {
    await sleep(750);
    expect(true).toBe(true);
  });

  it('should sleep for 1000ms', async () => {
    await sleep(1000);
    expect(true).toBe(true);
  });

  it('should sleep for 1500ms', async () => {
    await sleep(1500);
    expect(true).toBe(true);
  });
});
```

عادةً، تُشغّل مجموعة اختباراتك هذه الاختبارات على التوالي. هذا يعني أن كل اختبار يجب أن ينتهي قبل أن يبدأ التالي. ومع ذلك، قد يتراكم هذا الوقت.

```typescript
❯ sleep (4)
  ✓ should sleep for 500ms 502ms
  ✓ should sleep for 750ms 752ms
  ✓ should sleep for 1000ms 1001ms
  ⠴ should sleep for 1500ms 1502ms
```

يمكننا *أن* نختار تشغيل اختباراتنا بالتوازي. معظم الوقت لا تكون الحاجة إلى ذلك قائمة، ولهذا ليس هو السلوك الافتراضي، لكنه قد يكون مفيدًا في حالات معيّنة.

ثمّة قاعدتان أساسيتان:

1. عليك استخدام نسخة `expect` المرتبطة بالاختبار عبر وسيط `context` الممرَّر إلى كل دالة اختبار (مثل `context.expect`).
2. عليك أن تضع تعليقًا على الاختبارات الفردية التي تريد تشغيلها بالتزامن *أو* على المجموعة بأكملها.

على سبيل المثال، إن أعدنا كتابة اختباراتنا على النحو التالي، فستعمل بالتوازي:

```typescript
describe.concurrent('sleep', () => {
  it('should sleep for 500ms', async ({ expect }) => {
    await sleep(500);
    expect(true).toBe(true);
  });

  it('should sleep for 750ms', async ({ expect }) => {
    await sleep(750);
    expect(true).toBe(true);
  });

  it('should sleep for 1000ms', async ({ expect }) => {
    await sleep(1000);
    expect(true).toBe(true);
  });

  it('should sleep for 1500ms', async ({ expect }) => {
    await sleep(1500);
    expect(true).toBe(true);
  });
});
```

الآن سينطلق كل اختبار من الاختبارات الأربعة في الوقت نفسه. وقد قلّص هذا الزمن الكلي للمجموعة من نحو 3.77 ثانية إلى 1.5 ثانية (وهو أطول زمن نوم مرّرناه).

## قراءات إضافية

- [Vitest: تشغيل الاختبارات بالتزامن](https://vitest.dev/guide/features.html#running-tests-concurrently)
