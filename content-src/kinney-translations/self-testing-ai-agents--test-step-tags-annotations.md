---
title: "test.step والوسوم والتعليقات التوضيحية"
---

الاختبار الفاشل الذي يقول `Error: expected 5, got 0` هو تقرير خطأ كتبه شخص لا يريد أن يكون مفيدًا. يخبرك بما حدث من خطأ، ولا يخبرك بشيء عن أين حدث، ولا لماذا، ولا في أي ظروف. كان الاختبار الفاشل *هناك تمامًا*، يشاهد كل شيء يحدث، وكل ما استطاع أن يقوله هو «expected 5, got 0».

`test.step` هو الطريقة التي تكتب بها اختبارات فاشلة تُقرأ كتقارير حوادث. والوسوم هي الطريقة التي تقطع بها مجموعة اختبارات حسب *القصد* بدلًا من الملف. أما التعليقات التوضيحية فهي الطريقة التي تربط بها اختبارًا بالمشكلة التي جعلته يوجد. لا شيء من هذه الأشياء يغيّر سلوك الاختبار — إنها تغيّر ما يقوله الاختبار عندما يفشل، وفي عالم يقرأ فيه وكيل ملفّ الفشل ليقرر ما يجب إصلاحه، فإن ذلك الفارق هو كل شيء.

## `test.step` صيغة توثيق تقرأها أدواتك

لفّ مجموعة من الإجراءات داخل `test.step(label, fn)`، فتصبح تلك المجموعة قسمًا قابلًا للطي في عارض التتبع، وسطرًا في مُخبر `list`، وحقلًا في تقرير HTML. وتصبح أيضًا جزءًا من رسالة الخطأ عندما يفشل الاختبار. التسمية التي تكتبها هي التسمية التي يقرأها الوكيل.

إليك اختبار تقييم الكتاب مع الخطوات وبدونها، لترى كيف يبدو الفشل.

بدون خطوات:

```typescript
test('user can rate Station Eleven', async ({ page, request }) => {
  await page.goto('/shelf');
  const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
  await stationEleven.getByRole('button', { name: 'Rate this book' }).click();
  const dialog = page.getByRole('dialog', { name: /Rate Station Eleven/ });
  await dialog.getByRole('radio', { name: '4 stars' }).check();
  await dialog.getByRole('button', { name: 'Save rating' }).click();
  await expect(stationEleven.getByText('Rated: 4/5')).toBeVisible();
});
```

عندما يفشل ذلك، تكون رسالة الخطأ تتبّعًا مكدّسًا يشير إلى السطر الذي انفجر فيه `expect`. وعلى الوكيل الذي يقرأ ملفّ الفشل أن يعمل بالعكس: الاختبار اسمه «user can rate Station Eleven»، والتأكيد الفاشل على `Rated: 4/5`، إذن *شيء ما* في السلسلة من الانتقال إلى النقر إلى الإرسال إلى الحفظ قد انكسر. حظًا سعيدًا.

مع الخطوات:

```typescript
test('user can rate Station Eleven', async ({ page, request }) => {
  await test.step('open the shelf', async () => {
    await page.goto('/shelf');
  });

  await test.step('open the rate-book dialog for Station Eleven', async () => {
    const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
    await stationEleven.getByRole('button', { name: 'Rate this book' }).click();
  });

  await test.step('submit 4 stars', async () => {
    const dialog = page.getByRole('dialog', { name: /Rate Station Eleven/ });
    await dialog.getByRole('radio', { name: '4 stars' }).check();
    await dialog.getByRole('button', { name: 'Save rating' }).click();
  });

  await test.step('verify the rating persists on the shelf', async () => {
    const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
    await expect(stationEleven.getByText('Rated: 4/5')).toBeVisible();
  });
});
```

الآن يقول الفشل `Error in step: verify the rating persists on the shelf — expected "Rated: 4/5" to be visible`. والوكيل الذي يقرأ ملفّ الفشل يعرف بالضبط أي مرحلة فشلت. ويعرض عارض التتبع الخطوات كأقسام قابلة للطي. ويسرد تقرير HTML هذه الخطوات كأقسام فرعية تحت الاختبار. ويُصدر مُخبر JSON هذه الخطوات كبيانات مُهيكلة يستطيع مُلخِّص ملفّ الفشل تحليلها.

> **الخطوات تتداخل**
>
> يمكنك استدعاء `test.step` داخل `test.step` آخر، ويظهر التداخل في جميع التقارير. استخدم ذلك باعتدال — مستويان من العمق هما السقف المناسب عادةً. إن احتجت ثلاثة مستويات، فالاختبار على الأرجح يفعل أكثر مما ينبغي.

القاعدة الإرشادية التي أستخدمها: كل إجراء مستخدم على المستوى الأعلى يحصل على خطوة. الانتقال، والنقر خلال تدفّق، وتأكيد النتيجة. أربع خطوات لاختبار من أربعة فصول. لا خطوة لكل سطر.

هناك بعض خيارات الخطوة الأقل شهرة المتاحة من [واجهة Test API](https://playwright.dev/docs/api/class-test) والتي تستحق الاستخدام بمجرد أن تصبح مجموعة الاختبارات جدية:

- `box: true` يجعل الإخفاقات تشير إلى موضع استدعاء الخطوة بدلًا من سطر أعمق داخل الدالة المُرجعة
- `timeout` يُطبَّق على تلك الخطوة فقط
- `location` يتيح لك التحكم في كيفية ظهور الخطوة في التقارير
- `test.step(...)` يعيد قيمة الدالة المُرجعة، فيمكن للدوال المساعدة استخدامه كحد تجريد حقيقي

```typescript
async function login(page: Page) {
  return test.step(
    'login',
    async () => {
      await page.getByLabel('Email').fill('steve@example.com');
      await page.getByLabel('Password').fill(process.env.PW_PASSWORD!);
      await page.getByRole('button', { name: 'Sign in' }).click();
    },
    { box: true, timeout: 15_000 },
  );
}
```

هذا ليس «تجميعًا جميلًا للتقارير». هذه بنية اختبار ذات بيئة فشل أفضل.

## الوسوم هي كيف تقطع مجموعة اختبارات حسب القصد

كل استدعاء `test()` يمكن أن يأخذ خيار `tag`:

```typescript
test('user can rate Station Eleven', { tag: ['@critical', '@authenticated'] }, async ({ page }) => {
  // ...
});
```

اجمعه مع `--grep @critical` لتشغيل المجموعة الموسومة وحدها:

```bash
npx playwright test --grep @critical
```

هكذا توزّع مجموعة الاختبارات حسب *الغرض* بدلًا من الملف. `@critical` هي الحفنة القليلة من الاختبارات التي ستشغّلها على كل طلب سحب؛ و`@slow` هي الاختبارات المكلفة التي تؤجلها إلى التشغيل الليلي؛ و`@flaky-quarantine` هي التي لست مستعدًا لحذفها لكنها لا ينبغي أن تعطّل خط الأنابيب. لا شيء من ذلك يتوافق بنظافة مع حدود الملفات، لأن تعريف «حرج» يتغيّر بتغيّر المنتج.

> **لا تستخدم `@smoke` في Shelf**
>
> احتفظ بـ `@smoke` لمجموعات الاختبار السريعة على مستوى الملف أو المشروع إن أضفتها لاحقًا في الدورة. وإن بدأت أيضًا بوسم الاختبارات العادية بـ `@smoke`، فستنتهي بتعريفين متنافسين للكلمة نفسها. مفردات الوسوم المعتمدة في هذه الدورة هي `@critical` و`@slow` و`@flaky-quarantine`. أما `@smoke` فيبقى خارج نظام الوسوم.

الوسوم بيانات وصفية تكميلية، وليست مصدر الحقيقة. بنية الملفات والمشاريع هي المكان الذي تقرر فيه *أي* الاختبارات تعمل؛ أما الوسوم فهي كيفية تقرير أي مجموعة فرعية من *تلك* الاختبارات تشغّلها الآن.

## التعليقات التوضيحية لربط الاختبارات بالمشكلات، لا للتعليقات داخل الاختبار

```typescript
test('search handles the empty-results case', async ({ page }) => {
  test.info().annotations.push({
    type: 'issue',
    description: 'https://github.com/stevekinney/shelf-life/issues/TBD',
  });
  // ...
});
```

تظهر التعليقات التوضيحية في تقرير HTML وفي مخرجات مُخبر JSON. استخدمها من أجل:

- ربط اختبار بالمشكلة التي كُتب من أجلها.
- ربط اختبار بالحادثة التي ارتدّ بسببها.
- وسم اختبار بأنه متقلب معروف مع إشارة إلى نقاش الحجر الصحي.
- تسجيل افتراضات البيئة (`{ type: 'requires', description: 'DATABASE_URL points at a disposable test database' }`).

لا تستخدم التعليقات التوضيحية بديلًا عن التعليقات النصية. فهي بيانات مُهيكلة موجهة للأدوات، لا نثرًا موجهًا للقارئ التالي. التعليق فوق الاختبار أوضح من تعليق توضيحي يقول «هذا يختبر حالة النتائج الفارغة».

## تخطّي خطوة ليس مثل تخطّي اختبار

هناك دالة مساعدة `test.step.skip()`، لكن الوثائق تدفعك نحو `testStepInfo.skip()` حين تكون بالفعل داخل خطوة وتحتاج إلى الانسحاب من *تلك* الوحدة من العمل. والفرق مهم لأن «تخطّي الاختبار بأكمله» و«تخطّي هذه الخطوة لأن البيئة لا تدعمها» ليسا القصة نفسها في التقرير.

## `expect.soft` رفيق `test.step`

أداة أخرى، وهي التي تقترن بالخطوات لتحويل اختبار فاشل إلى تقرير فشل مفيد. `expect.soft(value).toBe(...)` يفعل كل ما يفعله `expect` *عدا* التوقف عند أول إخفاق. يظل الاختبار فاشلًا في النهاية، لكن يُبلَّغ عن كل تأكيد ناعم لم ينجح، لا عن الأول وحده.

```typescript
await test.step('verify all four result fields render', async () => {
  const result = page.getByRole('article', { name: /Piranesi/ });
  await expect.soft(result.getByRole('heading')).toHaveText('Piranesi');
  await expect.soft(result.getByText('Susanna Clarke')).toBeVisible();
  await expect.soft(result.getByText(/house of infinite halls/)).toBeVisible();
  await expect.soft(result.getByRole('button', { name: 'Add to shelf' })).toBeVisible();
});
```

إن كان العنوان خاطئًا، والمؤلف مفقودًا، والزر بلا تسمية، فستظهر *الإخفاقات الثلاثة* كلها في التقرير. أما `expect` العادي فسيتوقف عند العنوان، ولن تعرف بالاثنين الآخرين حتى التشغيل التالي.

استخدم التأكيدات الناعمة عندما تتحقق الخطوة من قائمة أشياء *ينبغي أن تكون كلها* صحيحة بعد إجراء. ولا تستخدمها للشروط المسبقة — فأنت تريد أن تفشل تلك بسرعة.

## كيف يستخدم الوكيل هذا

الوكيل الذي يقرأ [ملفّ الفشل](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) يحصل على `Step: verify the rating persists on the shelf — expected "Rated: 4/5" to be visible` بدلًا من تتبّع مكدّس في اختبار بلا اسم. ذلك السطر هو الفرق بين أن يقضي الوكيل أول تسعين ثانية له في *معرفة ما كان الاختبار يحاول فعله* وأن يقضيها في *معرفة سبب فشل الاختبار*. `test.step` يقع في المنبع من كل ملفّ فشل يُقرأ بوضوح.

بمجرد أن تضيف مُلخِّص ملفّ الفشل، فإنه يقرأ الخطوات من مخرجات مُخبر JSON في Playwright. لا شيء آخر يحتاج إلى تغيير — بمجرد أن يحتوي ملف الاختبار على خطوات، يصبح ملفّ الفشل يحتوي عليها أيضًا.

في مسار الدورة الحالي، التمارين العملية الملموسة هي `tests/rate-book.spec.ts` (أنشأها سابقًا [مختبر تحصين اختبار تقييم الكتاب المتقلب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test)، ولم تُشحن في المشروع الأولي) و`tests/smoke.spec.ts`. وكيفما تعزل شريحة التمرين للمختبر، فبمجرد أن تصبح تسميات الخطوات والوسوم مستقرة فإنها تنتمي إلى حلقة `npm run test` العادية مع بقية مجموعة الاختبارات.

## قواعد الوكيل

```markdown
## test.step, tags, annotations

- Every top-level user action in a test gets a `test.step('...', async () => { ... })` wrapper with a human-readable label.
- Tag every test with at least one of `@critical` / `@slow` / `@flaky-quarantine`. Never tag a test `@smoke` in Shelf — reserve that term for any future smoke-only file or project split.
- Use `test.info().annotations.push(...)` to link a test to its issue, incident, or known-flake record. Do not use annotations as a substitute for comments.
- Use `expect.soft` when a single step is verifying a list of things that should all be true. Use plain `expect` for preconditions.
- Use step options on purpose: `box: true` when the step call site is the
  useful failure location, and per-step `timeout` when one phase is slower
  than the rest of the test.
- Use `testStepInfo.skip()` when the decision is "skip this step," not
  "skip the whole test."
- Keep `test.step` nesting to two levels deep at most. If you need three, the test is doing too much.
```

## الشيء الذي يجب تذكّره

الاختبار الذي يفشل بـ `expected 5, got 0` هو اختبار لا يريد مساعدتك. كل شيء في هذا الدرس يدور حول كتابة اختبارات *تريد* مساعدتك — والأهم من ذلك، اختبارات تريد مساعدة الوكيل الذي يقرأ ملفّ الفشل. الخطوات تسمّي المراحل. والوسوم تقطع مجموعة الاختبارات. والتعليقات التوضيحية تربط بالسياق الخارجي. والتأكيدات الناعمة تجمع كل الإخفاقات بدلًا من التوقف عند الأول. أربع أدوات، كلها إضافية، ولا شيء منها يغيّر ما *يفعله* اختبارك. إنها تغيّر ما *يقوله* اختبارك عندما يفشل، وهذه هي اللعبة بأكملها.

## قراءات إضافية

- [ملفات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) — الدرس الذي يسلّم هذا الدرس إليه. بمجرد أن تصبح لاختباراتك خطوات، يقرأ ملفّ الفشل تلك الخطوات تلقائيًا.
- [قراءة تتبّع](https://stevekinney.com/courses/self-testing-ai-agents/reading-a-trace) — يعرض عارض التتبع كتل `test.step` كأقسام قابلة للطي، وهو أسرع طريقة لتحديد موضع فشل في تدفّق طويل.
- [مشاريع Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects) — الدرس الخاص بالتنظيم على مستوى الملف والمشروع، وهو الطبقة التي تقع تحت الوسوم. الوسوم تكمّل المشاريع؛ ولا تحلّ محلها.
