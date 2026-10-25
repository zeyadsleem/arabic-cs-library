---
title: "واجهات Playwright المتقدمة"
---

تضم Playwright عددًا كبيرًا من الواجهات البرمجية التي تبدو مثيرة للاهتمام في التجريد، لكنها لا صلة لها إطلاقًا بمجموعة اختبارات حقيقية. هذا الملحق ليس تلك القائمة.

وهو قصير عمدًا الآن. فتصحيح أعطال محدِّدات المواقع (locators) له موضعه في [وضع واجهة Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode). وتثبيت لقطات الشاشة له موضعه في [الانحدار البصري كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop). وتفاصيل دورة حياة ملفات HAR لها موضعها في [تسجيل ملفات HAR لعزل الشبكة](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation).

ما يبقى هنا هو [واجهات الصفحة](https://playwright.dev/docs/api/class-page) الغريبة حقًا، التي تستحق بقاءها بمجرد أن تصير مجموعة الاختبارات غريبة بدورها: تشريح سريع لما بعد الحادثة داخل شيفرة الاختبار، وفحوص تسريب صريحة.

## دع الصفحة تحتفظ بسجلاتها بنفسها

تكشف [واجهة الصفحة](https://playwright.dev/docs/api/class-page) عن `page.consoleMessages()` و`page.pageErrors()`، وهما أنسب بكثير من توصيل جامعي أحداث خاصين بك في كل مرة يصبح فيها اختبار ما صاخبًا. وهذا يتناسب جيدًا مع [عارض آثار Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-trace-viewer): فالآثار تبقى وثيقة الأدلة الرئيسية، لكنك أحيانًا تريد تشريحًا سريعًا لما بعد الحادثة داخل شيفرة الاختبار مباشرة.

النمط المفيد ليس «أفرغ كل رسالة إلى الأبد». النمط المفيد هو «التقط العدّادات الحالية، نفّذ الفعل الخطير، ثم افحص ما أُضيف».

استخدم هذه الواجهات عندما:

- تنجح نقرة ما لكن الصفحة تسجّل بهدوء `console.error(...)` فيفشل التحقق المرئي بعد ثلاث خطوات
- ينفجر مسار الحفظ أحيانًا في المتصفح باستثناء غير ملتقط، لكن الأثر أكبر من الأدلة التي تحتاجها في المحاولة الأولى
- تريد أن يفشل اختبار برسالة «رمت الصفحة استثناءً بعد النشر» بدلًا من «كان يُتوقع أن يكون العنوان مرئيًا»

```typescript
const messageCountBefore = (await page.consoleMessages()).length;
const errorCountBefore = (await page.pageErrors()).length;

await page.getByRole('button', { name: 'Publish' }).click();

const consoleMessages = (await page.consoleMessages()).slice(messageCountBefore);
const pageErrors = (await page.pageErrors()).slice(errorCountBefore);

expect(pageErrors).toHaveLength(0);
expect(consoleMessages.map((message) => message.type())).not.toContain('error');
```

هذه هي الحركة كاملة:

- تعطيك `consoleMessages()` و`pageErrors()` أحدث سجل محدود الحجم من الصفحة
- تحتفظ الواجهة بآخر 200 رسالة فقط، لذا فهذه مخصصة لتشريح مركّز لما بعد الحادثة، لا للاحتفاظ الدائم بالسجلات
- العدّ قبل الفعل الخطير والتقطيع بعده يمنحك رؤية بسيطة لسؤال «ما الذي تغيّر؟» دون بناء ناقل أحداث خاص بك

> **حد الـ 200 رسالة**
>
> لأن المخزن المؤقت محدود بنحو 200 رسالة، فإن نمط «العدّ قبل ثم التقطيع بعد» ينكسر بهدوء إذا أنتج الفعل قيد الاختبار أكثر من `200 - messageCountBefore` رسالة — فتسقط الرسائل الأقدم ويشير فهرس التقطيع إلى الموضع الخطأ. للأفعال الصاخبة، استخدم الخيار `{ filter: 'since-navigation' }` مع `consoleMessages()` أو أضف علامة تنقّل صريحة قبل الخطوة الخطيرة.

هذا ليس بديلًا عن عارض الآثار. إنه طريقة جيدة لجعل الاختبار يفشل بشيء أكثر إفادة من «كان يُتوقع أن تكون القيمة true لكنها false».

## `requestGC()` هي طريقتك للتوقف عن التلويح باليد في مسألة التسريبات

تكشف [واجهة الصفحة](https://playwright.dev/docs/api/class-page#page-request-gc) أيضًا عن `page.requestGC()`، وهو ما يبدو منخفض المستوى بشكل مريب حتى تتذكر أن تسريبات الذاكرة تُشخَّص عادة بالإحساس والإنكار. وهذا يتناسب طبيعيًا مع [الحالة الحتمية وعزل الاختبارات](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation): إذا كان يُفترض بالصفحة أن تُسقط كائنًا ما بعد التنقّل أو بعد التهيئة، فيمكنك التحقق بدلًا من التخمين.

استخدم هذا عندما:

- يُنشأ مربّع حوار أو محرّر أو نسخة رسم بياني ثم يُدمَّر مرارًا وتكرارًا، وتشك في أن النسخ القديمة تبقى عالقة
- يُفترض بانتقال مسار ما أن ينهي اشتراكات أو مراقبات أو عناصر واجهة ثقيلة، وتريد فحصًا صارمًا واحدًا بدلًا من تلويح باليد في مراجعة الشيفرة
- تحقق في «التشغيل الخامس أبطأ من الأول» وتحتاج فحص تسريب ضيقًا قبل اللجوء إلى تنميط المتصفح الكامل

توضح الوثائق النمط الصحيح: احتفظ بـ `WeakRef`، اطلب جمع القمامة، ثم أكّد أن الكائن قد اختفى.

```typescript
await page.evaluate(() => {
  globalThis.dialogWeakRef = new WeakRef(window.__testDialog);
  window.__testDialog = undefined;
});

await page.requestGC();

const leaked = await page.evaluate(() => !!globalThis.dialogWeakRef.deref());
expect(leaked).toBe(false);
```

هذا لا يزال استدلالًا تقريبيًا. فجمع القمامة ليس عهدًا مقدّسًا بأن كل كائن غير قابل للوصول قد زال فورًا. لكنه إشارة حقيقية، وهذا أفضل بالفعل من معظم فحوص التسريب التي تصدرها الفرق.

## قواعد الوكيل

```markdown
## Playwright debugging APIs

- Use `page.consoleMessages()` and `page.pageErrors()` for focused
  postmortems, not as permanent log dumping infrastructure.
- If a test needs to assert on new console noise or browser errors, read
  the current buffers first, perform the risky action, then inspect the
  new slice.
- Use `page.requestGC()` only for explicit leak checks where the page
  code exposes a `WeakRef` or similarly testable handle.
```

## الشيء الوحيد الذي يجب تذكّره

واجهات Playwright المتقدمة المفيدة ليست تلك الطريفة. إنها تلك التي تجعل الإخفاقات أسهل في التفسير وفحوص التسريب أصعب في التملّص منها بالتّلويح باليد.

## قراءة إضافية

- [الانحدار البصري كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop)
- [تسجيل ملفات HAR لعزل الشبكة](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation)
- [وضع واجهة Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode)
- [عارض آثار Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-trace-viewer)
- [الحالة الحتمية وعزل الاختبارات](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
- [واجهة الصفحة](https://playwright.dev/docs/api/class-page)
