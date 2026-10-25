---
title: "حكاية الانتظار"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story"
---

إن كان الانضباط في محدّدات الموقع هو أول ما سيخطئ فيه الوكيل في مجموعة اختبارات Playwright، فإن الانتظار يليه مباشرة بفارق ضئيل جدًا. وحيث تكون المحدّدات سيئة لأنها تنكسر مع كل إعادة هيكلة، يكون الانتظار سيئًا لأنه ينكسر *على الشيفرة نفسها بالضبط، على نحو متقطّع، لأسباب لا يستطيع أحد تفسيرها*. وهذا أسوأ. هذا هو الشيء الذي يجعل فريقك يكفّ عن الوثوق باختبارات طرف إلى طرف.

## الخطيئة

```typescript
await page.click('button.add-book');
await page.waitForTimeout(2000);
await expect(page.getByText('Added to your shelf')).toBeVisible();
```

ثانيتان. ولماذا ثانيتان؟ لأن واحدة لم تنجح في محاولة الوكيل الأولى، وثلاثًا بدت مضيعة للوقت. هذا هو النمط الأكثر شيوعًا الذي أراه في شيفرة Playwright التي يولّدها الوكيل، وهو خاطئ من كل وجه ممكن.

إنه خاطئ حين تكون الآلة سريعة، لأنك تجلس هناك 1.9 ثانية لا تفعل شيئًا. وهو خاطئ حين تكون الآلة بطيئة، لأن الثانيتين لم تكفيا فيتقلّب الاختبار. وهو خاطئ في CI، لأن CI بطيء أيام الثلاثاء وسريع أيام الأربعاء ولا أحد يعرف السبب، فصار اختبارك الآن رمية عملة. وهو خاطئ على وجه الخصوص لأن الآلية التي *ينبغي* أن تستخدمها ليست أكثر موثوقية فحسب، بل أسرع أيضًا في الحالة السعيدة.

```
flowchart LR
  A["Click button"] --> B["Wait 2 seconds<br>waitForTimeout"]
  B --> C{"Is text<br>visible?"}
  C -->|Yes| D["PASS<br>~2 seconds elapsed"]
  C -->|No| E["FAIL<br>Timeout"]

  F["Click button"] --> G["Auto-retry assertion<br>for 5 seconds"]
  G --> H{"Is text<br>visible?"}
  H -->|Yes| I["PASS<br>~50ms elapsed"]
  H -->|No| J["FAIL<br>Timeout"]

  style B fill:#ffcccc
  style G fill:#ccffcc
  style D fill:#ffcccc
  style I fill:#ccffcc
```

لديّ قاعدة بسيطة في هذا الشأن: `page.waitForTimeout` محظور. لا «غير مستحسَن». محظور. ملف الإرشادات يحظره. وقاعدة lint تحظره. الحالة الوحيدة التي يكون فيها مقبولًا هي جلسة تنقيح عابرة داخل `test.skip`، وحتى حينها ينبغي أن تشعر بالسوء تجاهه.

## النسخة الأفضل، بلا سحر

[تأكيدات Playwright ذاتية الإعادة](https://playwright.dev/docs/test-assertions) تفعل تقريبًا كل ما تحتاجه منها إن سمحت لها بذلك. يُعاد كل تأكيد لمدّة انتظار قابلة للضبط (خمس ثوانٍ افتراضيًا) حتى ينجح أو تنتهي المدة. وهذا يعني أنك لست مضطرًا للانتظار بنفسك—فالتأكيد *هو* الانتظار.

```typescript
await page.getByRole('button', { name: 'Add book' }).click();
await expect(page.getByText('Added to your shelf')).toBeVisible();
```

هذا كل شيء. لا `waitForTimeout`، ولا `waitForSelector`، ولا `sleep`. ينتظر تأكيد `toBeVisible()` حتى يظهر النص أو تنتهي مدة الانتظار. على آلة سريعة ينجح في عشر مللي ثانية. وعلى آلة بطيئة ينجح في ثانيتين. وعلى آلة معطوبة يفشل بخطأ مفيد. والنتائج الثلاث كلها صحيحة.

وهذا يعمل لأكثر من الظهور. فالعائلة كلها `expect(locator).*` تعيد المحاولة تلقائيًا:

- `toBeVisible()`، و`toBeHidden()`، و`toBeEnabled()`، و`toBeDisabled()`
- `toHaveText(text)`، و`toHaveValue(value)`، و`toHaveAttribute(name, value)`
- `toHaveCount(n)`—وهو المفضّل عندي شخصيًا لـ«انتظر حتى تُرسَم المدخلات الثلاثة كلها في قائمة الكتب»
- `toBeInViewport()`

أي شيء تريد تأكيده ويكون صحيحًا في النهاية، استخدم عليه `expect` مربوطًا بمحدّد موقع. ذلك هو انتظارك.

## الأفعال تنتظر أصلًا قابلية التنفيذ

هذا هو الجزء الذي تقاومه فرق كثيرة بدلًا من استخدامه. أفعال Playwright تنتظر تلقائيًا قابلية التنفيذ: الظهور، والاستقرار، وتلقّي الأحداث، والتمكين، وكل ذلك. معظم «مساعدات الجاهزية قبل النقر» ليست إلا إعادة تنفيذ أبطأ وأسوأ لما يفعله Playwright أصلًا.

وإن أردت أن تسأل «هل صار هذا العنصر قابلًا للنقر بعد؟» دون أن تنقر عليه فعلًا، فإن كثيرًا من أفعال محدّد الموقع تدعم [`trial: true`](https://playwright.dev/docs/actionability):

```typescript
await page.getByRole('button', { name: 'Publish' }).click({ trial: true });
```

ينفّذ ذلك فحوص قابلية التنفيذ ويتخطّى النقر. وهو بديل أنيق للمساعدات المفصّلة على المقاس من نوع «انتظر حتى يجهز الزر»، ويُبقي الانتظار متوائمًا مع الفعل الحقيقي بدلًا من اختراع تعريف ثانٍ للجاهزية.

## المجسّات المنطقية ليست انتظارًا

[واجهة Locator](https://playwright.dev/docs/api/class-locator) صريحة في هذا: دوال مثل `isVisible()` تعود فورًا. فهي تجيب عن «ما الصحيح *الآن*»، لا عن «انتظر حتى يصير هذا صحيحًا».

إذن هذا:

```typescript
if (await page.getByText('Saved').isVisible()) {
  // ...
}
```

لا بأس به كفرع بعد أن تكون الصفحة مستقرّة أصلًا. لكنه ليس بدائية مزامنة. فإن كانت الصفحة تتحدّث لا تزامنيًا، فاستخدم التأكيد الذي يعيد المحاولة:

```typescript
await expect(page.getByText('Saved')).toBeVisible();
```

النمط المضاد الذي أراه باستمرار هو `expect(await locator.isVisible()).toBe(true)`. ذلك يتجاوز نموذج إعادة المحاولة كله، ثم يتظاهر بالدهشة حين يصل CI إلى هناك بعد حاسوبك المحمول بـ200 مللي ثانية.

## الانتظار على الشبكة، لا على الساعات

أحيانًا لا يكون الشيء الذي تنتظره تغيّرًا في DOM، بل استجابة شبكة. النقرة تُطلق طلب POST، وتحتاج إلى أن ينتهي POST قبل أن تتفاعل مع الشيء التالي، ولا توجد حالة DOM تخبرك بوضوح أن POST قد انتهى. هنا يستحق [`page.waitForResponse`](https://playwright.dev/docs/api/class-page#page-wait-for-response) مكانه.

```typescript
const responsePromise = page.waitForResponse(
  (res) => res.url().endsWith('/api/shelf') && res.request().method() === 'POST',
);
await page.getByRole('button', { name: 'Add book' }).click();
await responsePromise;
```

ثمة أمران يجب ملاحظتهما. أولًا، تنصب المنتظِر *قبل* الفعل، لأن الاستجابة قد تصل أسرع مما يعمل السطر التالي من الشيفرة. وثانيًا، تطابق على العنوان (URL) والطريقة، لا على مقارنة نصية للعنوان كله—وإلا أربكتك معاملات الاستعلام والمعرّفات.

و`page.waitForRequest` موجود أيضًا، لحالة «أريد فقط أن أثبت أن الطلب قد خرج». وكلاهما دقيق، وكلاهما يتغلّب على مهلة الانتظار في كل مرة.

> **نصيحة**
>
> إن كانت الواجهة تعرض أصلًا حالة النهاية التي تهمّك، ففضّل تأكيد محدّد موقع على انتظار شبكي. `waitForResponse` للحالات التي يكون فيها حدث الشبكة *هو* الإشارة. فإن كانت الصفحة تعرض «Saved» أو ظهر السطر الجديد في الجدول، فأكّد على ذلك بدلًا من الانتظار.

## `fill()` أولًا، و`pressSequentially()` عن قصد

معظم إدخال النصوص ينبغي أن يستخدم `locator.fill()`. فهو يضبط القيمة مباشرة ويترك Playwright يفعل الشيء المملّ الموثوق.

و[`locator.pressSequentially()`](https://playwright.dev/docs/api/class-locator) موجود للحالات الخاصة حقًا:

- أن يتفاعل المكوّن مع كل ضغطة مفتاح
- أن يعتمد منطق الإكمال التلقائي أو الإشارات على أحداث مفاتيح حقيقية
- أن يكون الحقل مقنّعًا أو منسّقًا أثناء الكتابة
- أن يكون الخطأ الذي تعيد إنتاجه متعلقًا بمعالجة ضغطات المفاتيح تحديدًا

إن لم يكن أي من ذلك صحيحًا، فـ`fill()` هو النداء الصحيح. فحدس «الكتابة الحقيقية أكثر واقعية» يبدو لطيفًا، ويخلق بعضًا من أغبى أعطال الإدخال التي لن تقع إلا في CI وستنقّحها في حياتك.

## الساعات والحركات وواجهة Clock

الصنف القبيح من الانتظارات هو حين يكون في الواجهة `setTimeout` في مكان ما. إشعار يختفي تلقائيًا بعد ثلاث ثوانٍ. طابع زمني يقول «الآن» ويتحدّث كل دقيقة. حركة تستغرق 250 مللي ثانية. صار اختبارك الآن يعتمد على الوقت الحقيقي للجدار، وهذا أمر شنيع.

يشحن Playwright [واجهة Clock](https://playwright.dev/docs/clock) تتيح لك تثبيت ساعة مزيفة قبل أن تُحمّل الصفحة:

```typescript
await page.clock.install();
await page.goto('/shelf');
// ... interact ...
await page.clock.fastForward('03'); // advance three seconds
await expect(page.getByText('Added to your shelf')).toBeHidden();
```

هكذا تختبر الإشعار الذي يختفي بعد ثلاث ثوانٍ دون أن تنتظر ثلاث ثوانٍ فعلًا. وهكذا تختبر عروض «قبل X دقيقة» دون تعديل ساعة النظام. وهي قليلة الاستخدام إلى حدّ بعيد وتستحق أن تُوضَع في وعي الوكيل. فإن كان الوكيل يكتب `waitForTimeout` لأنه ينتظر واجهة تقودها ساعة، فالجواب الصحيح دائمًا تقريبًا هو `page.clock`.

## `expect.poll()` مقابل `toPass()`

من أجل الاتّساق النهائي، لديك مطرقتان لإعادة المحاولة. وهما ليستا المطرقة نفسها.

[`expect.poll()`](https://playwright.dev/docs/test-assertions) يعيد محاولة دالة تُنتج قيمة:

```typescript
await expect
  .poll(
    async () => {
      const response = await request.get('/api/shelf');
      const data = await response.json();
      return data.entries.find(
        (entry: { book: { title: string } }) => entry.book.title === 'Station Eleven',
      );
    },
    { message: 'Station Eleven should eventually appear in the persisted shelf state' },
  )
  .toBeTruthy();
```

مهلته الافتراضية خمس ثوانٍ، وهذا عادةً ما يتوقّعه الناس.

و`expect(async () => { ... }).toPass()` يعيد محاولة كتلة تأكيد كاملة:

```typescript
await expect(async () => {
  const response = await request.get('/api/shelf');
  expect(response.ok()).toBe(true);

  const data = await response.json();
  expect(data.entries.some((entry: { rating: number | null }) => entry.rating === 4)).toBe(true);
}).toPass({ timeout: 10_000 });
```

مهلته الافتراضية `0` ما لم تمرّر واحدة. وهذا يُوقع الناس في الحيرة باستمرار. فإن لجأت إلى `toPass()`، فاضبط المهلة عن قصد.

استخدم `poll()` حين تكون قيمة واحدة مرشّحة للاستقرار في النهاية. واستخدم `toPass()` حين تريد حقًا إعادة تشغيل كتلة تأكيدات كاملة.

## امنح `expect` أمزجة مختلفة

[`expect.configure()`](https://playwright.dev/docs/test-assertions) يستحق الاستخدام متى صارت المجموعة كبيرة بما يكفي بحيث لا تتشارك كل التأكيدات المزاج نفسه.

```typescript
const slowExpect = expect.configure({ timeout: 15_000 });
const softExpect = expect.configure({ soft: true });

await slowExpect(page.getByRole('status')).toHaveText(/Report complete/);
await softExpect(page.getByText('Summary')).toBeVisible();
await softExpect(page.getByText('Details')).toBeVisible();
```

هذا يُبقي النية محلية. فلا تضطر إلى إعادة كتابة مهلة التأكيد العامة لأن شاشة واحدة متّسقة نهائيًا أبطأ من بقية المجموعة.

وحين تستخدم التأكيدات اللينة، فافحص `test.info().errors` قبل أن تنطلق إلى المرحلة الخطرة التالية من الاختبار. الفشل اللين مفيد. أما الفشل اللين ثم التظاهر بأن الشرط المسبق قد نجح فليس إلا كذبًا بخطوات إضافية.

## الانتظار حتى «تستقرّ» الصفحة

خطأ شائع من الوكيل: `await page.waitForLoadState('networkidle')`. لا تفعل ذلك. فوثائق التنقّل في Playwright نفسها تصنّف `networkidle` غير مستحسَن للاختبار. وهو يعني «لا نشاط شبكي لمدة 500 مللي ثانية»، وهذا أبطأ مما تحتاجه فعلًا (ولماذا تنتظر *كل* الطلبات؟) وغير موثوق في الصفحات التي فيها استقصاء طويل أو منارات تحليلات أو أي نوع من نبضات الحياة.

بدلًا من ذلك، انتظر الشيء المحدّد الذي يهمّك فعلًا. فإن كنت تنتظر رسم الرفّ، فانتظر محتوى الرفّ، لا سكون الشبكة. وإن كنت تنتظر انتهاء نداء API، فانتظر *ذلك* النداء، لا توقّف كل النداءات. كن محدّدًا.

## قواعد الوكيل

أضف هذه إلى ملف الإرشادات تحت Playwright:

```markdown
## Waiting in Playwright

- Never use `page.waitForTimeout`. There is always a better option.
- Never use `page.waitForLoadState('networkidle')`.
- To wait for a UI change, use `expect(locator).toBeVisible()` or a
  similar assertion. They auto-retry up to the configured timeout.
- Do not use `locator.isVisible()` or similar boolean probes as waits.
  They answer immediately. Use retrying assertions.
- Prefer `locator.fill()` for text entry. Use `pressSequentially()` only
  when the page genuinely depends on real key events.
- To wait for a network call, set up `page.waitForResponse` with a
  URL+method matcher _before_ triggering the action.
- If you need to wait for actionability without acting, use the real
  action with `trial: true` instead of inventing a custom readiness wait.
- Use `expect.poll()` for eventually consistent values. Use `toPass()`
  only when you need to retry a whole assertion block, and set its
  timeout explicitly.
- To wait for clock-driven UI (toasts, timers, "X minutes ago"),
  install `page.clock` at the top of the test and advance it explicitly.
- If you are tempted to add a wait to "fix flakiness," stop. The flakiness
  is a symptom of an assertion not matching the actual end state. Find
  the real end state and assert on it.
```

القاعدة الأخيرة هي المهمة، وهي الأصعب على الوكيل أن يتبعها دون أن يشير إليها إنسان. التقلّب لا يُحلّ أبدًا بانتظار أطول. بل يُحلّ بالتأكيد على الشيء الصحيح.

## مثال ملموس من Shelf

سير عمل تقييم الكتب في Shelf هو المكان النموذجي الذي يظهر فيه كل هذا. النسخة الخامّة من الاختبار تستخدم `waitForTimeout(1500)` بعد إرسال تقييم، لأن الوكيل الذي كتبها أولًا كان يخمّن. وتلك النسخة تنجح معظم الوقت. لكنها تفشل نحو مرة من كل خمس عشرة على حاسوبي، وأكثر من ذلك في CI تحت الحمل—وهذا إقليم «الاختبار المتقلّب الذي يعطّل الإصدارات كل بضعة أيام» الكلاسيكي.

المختبر التالي يمشي معك في إعادة كتابته. وللإصلاح ثلاثة أجزاء: استبدال محدّد الموقع بسلسلة `getByRole`، واستبدال `waitForTimeout` بـ`waitForResponse` على POST، وإضافة تأكيد `expect(locator).toHaveText(/Thanks/)` على إشعار التأكيد. هذا كل شيء. ثلاثة تعديلات، ولا سحر، ويتوقف الاختبار عن التقلّب.

## الشيء الوحيد الذي يجب تذكّره

كل انتظار في اختبارك عبارة عن تصريح بما تتوقّع أن يكون صحيحًا. فإن لم تستطع كتابة ذلك التصريح كتأكيد، فأنت لا تعرف فعلًا ما الذي تنتظره، وسيتقلّب الاختبار حتى تكتشفه. `waitForTimeout` هو غياب التصريح. فاحظره.

## قراءات إضافية

- [المحددات وهرمية إمكانية الوصول](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy)
- [التأكيدات](https://playwright.dev/docs/test-assertions)
- [مصادقة حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [مختبر: تحصين اختبار Rate-Book المتقلّب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test)
