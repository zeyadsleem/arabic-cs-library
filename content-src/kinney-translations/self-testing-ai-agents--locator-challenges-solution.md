---
title: "الحل"
---

هذه هي حلولي المفضّلة. وقد تختلف حلولك — فإن كان المحدِّد (locator) مستقرًا وقابلًا للوصول ومقروءًا، فهو صحيح. والملاحظات بعد كل حل تشرح *لماذا* هذا النهج بعينه، لا *ماذا* فقط.

كل مقتطف يفترض أن الاختبار استدعى بالفعل `await page.goto('/playground')`.

## تسخين: أساسيات الدور

### التحدّي 1: زر «Add to shelf»

```typescript
await expect(page.getByRole('button', { name: 'Add to shelf' })).toBeVisible();
```

أبسط حالة. `getByRole` مع مطابقة `name`. وهذا هو المحدِّد الذي ينبغي أن تمدّ يدك إليه أولًا، في كل مرة.

### التحدّي 2: زر «Cancel»

```typescript
await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
```

النمط نفسه. فمحتوى نص الزر *هو* اسمه المتاح للوصول.

### التحدّي 3: زر «Out of stock» المعطّل

```typescript
const outOfStock = page.getByRole('button', { name: 'Out of stock' });
await expect(outOfStock).toBeDisabled();
```

`toBeDisabled()` تحقّق يعيد المحاولة تلقائيًا. فلا تحتاج إلى فحص `getAttribute('disabled')` — فـ Playwright يفهم الدلالة.

### التحدّي 4: حقل البحث عبر التسمية

```typescript
await expect(page.getByLabel('Search')).toBeVisible();
```

يطابق `getByLabel` عنصر `<label>` المرتبط بحقل الإدخال. وهذه هي الطبقة الثانية من الهرم، وبالنسبة لحقول النماذج ذات التسميات الظاهرة تكون غالبًا الخيار الأكثر طبيعية.

## متوسط: رفع الالتباس والتسلسل

### التحدّي 5: أول زر «Delete»

```typescript
await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
```

عنصران يطابقان `getByRole('button', { name: 'Delete' })`. واستدعاء `.first()` يضيّق النطاق إلى الأول بترتيب DOM. و`.nth(0)` يفعل الشيء نفسه. وفي اختبار حقيقي كنت ستضيّق النطاق بالأب على الأرجح — لكن هذا التمرين هدفه معرفة أن `.first()` موجود.

### التحدّي 6: «Remove» في عنصر القائمة الثالث

```typescript
const readingList = page.getByRole('list', { name: 'Reading list' });
const thirdItem = readingList.getByRole('listitem').nth(2);
await expect(thirdItem.getByRole('button', { name: 'Remove' })).toBeVisible();
```

سلسلة من ثلاثة مستويات: القائمة ← العنصر الثالث ← الزر. وكل خطوة تضيّق النطاق. وهذا بديل المحدِّد المركّب في CSS مثل `.reading-list li:nth-child(3) button.remove` — ويُقرأ بالترتيب نفسه الذي يفكّر به الإنسان.

### التحدّي 7: «Rate this book» داخل مقالة Piranesi

```typescript
const article = page.getByRole('article', { name: /Piranesi/ });
await expect(article.getByRole('button', { name: 'Rate this book' })).toBeVisible();
```

يحمل عنصر `<article>` السمة `aria-label="Piranesi by Susanna Clarke"`. ومطابقة تعبير نمطي على `/Piranesi/` كافية لتعريفه بشكل فريد. ثم تضيّق النطاق داخله للعثور على الزر.

### التحدّي 8: نص التلميح في حقل المؤلف

```typescript
await expect(page.getByLabel('Author')).toBeVisible();
await expect(page.getByText('Last name, first name')).toBeVisible();
```

التلميح عنصر منفصل — ليس جزءًا من تسمية حقل الإدخال. ويمكنك تحديد حقل الإدخال بالتسمية والتلميح بالنص، كلًّا على حدة.

## النص والمحتوى

### التحدّي 9: فقرة تذكر «42 days»

```typescript
await expect(page.getByText('This book has been on your shelf for 42 days.')).toBeVisible();
```

مطابقة نصية دقيقة. وعندما يكون النص فريدًا في الصفحة، فـ `getByText` بالسلسلة الكاملة هو أنظف خيار.

### التحدّي 10: «3 of 12 books finished»

```typescript
await expect(page.getByText('3 of 12 books finished')).toBeVisible();
```

النهج نفسه. نص فريد، ومطابقة كاملة.

### التحدّي 11: فقرة «shelf» الصحيحة

```typescript
await expect(page.getByText('You have 4 books on your shelf right now.')).toBeVisible();
```

الفقرة الأخرى التي تحتوي «shelf» تقول «Add a book to your shelf to get started.» واستخدام الجملة الكاملة يتجنّب الالتباس تمامًا. وتعبير نمطي مثل `/4 books on your shelf/` يعمل أيضًا — والهدف أن تكون محدّدًا بما يكفي بحيث يطابق عنصر واحد فقط.

## الجداول والقوائم

### التحدّي 12: عدّ صفوف البيانات في جدول التقييمات

```typescript
const table = page.getByRole('table', { name: 'Book ratings' });
const dataRows = table.getByRole('row').filter({ hasNot: page.getByRole('columnheader') });
await expect(dataRows).toHaveCount(3);
```

`getByRole('row')` تُعيد *كل* الصفوف، بما فيها الترويسة. واستبعاد الصفوف التي تحتوي خلايا `columnheader` يمنحك صفوف البيانات. والبديل هو `table.locator('tbody tr')`، لكنه ينزل إلى CSS — استخدمه إن بدا نهج الترشيح ثقيلًا.

### التحدّي 13: قائمة القراءة فيها 4 عناصر

```typescript
const list = page.getByRole('list', { name: 'Reading list' });
await expect(list.getByRole('listitem')).toHaveCount(4);
```

`toHaveCount` يعيد المحاولة تلقائيًا. فلو كانت القائمة تُملأ ديناميكيًا، لانتظر هذا التحقّق ظهور 4 عناصر (حتى المهلة المُعدّة).

## المحتوى الديناميكي

### التحدّي 14: إظهار التفاصيل

```typescript
await page.getByRole('button', { name: 'Show details' }).click();
await expect(page.getByText(/Station Eleven is a post-apocalyptic novel/)).toBeVisible();
```

انقر الزر، وتحقق من ظهور النص. لا `waitForTimeout` — فـ `toBeVisible()` يعيد المحاولة تلقائيًا.

### التحدّي 15: تحميل المزيد

```typescript
await page.getByRole('button', { name: 'Load more' }).click();
const newList = page.getByRole('list', { name: 'Newly loaded books' });
await expect(newList.getByRole('listitem')).toHaveCount(2);
```

يطلق الزر تأخيرًا قدره 500ms قبل ظهور العناصر. و`toHaveCount(2)` ينتظره. لا نوم، ولا مهلة.

### التحدّي 16: من التحميل إلى تحميل المحتوى

```typescript
await expect(page.getByText('Loading...')).toBeVisible();
await expect(page.getByText('Content loaded')).toBeVisible();
await expect(page.getByText('Loading...')).toBeHidden();
```

تبدأ الصفحة و«Loading...» ظاهر، ثم تتبدّل إلى «Content loaded» بعد ثانية واحدة. والتحقّقات التي تعيد المحاولة تتعامل مع التوقيت. ملاحظة: إن حُمّلت الصفحة بسرعة كافية، فقد يكون «Loading...» قد اختفى بحلول تنفيذ تحقّقك. وفي هذه الحالة، احذف التحقّق الأول واكتفِ بالتحقّق من الحالة النهائية.

## النوافذ الحوارية

### التحدّي 17: افتح النافذة الحوارية

```typescript
await page.getByRole('button', { name: 'Rate this book' }).last().click();
await expect(page.getByRole('dialog')).toBeVisible();
```

يُصيّر مكوّن `RateBookDialog` عنصر `<div role="dialog">`. و`getByRole('dialog')` يعثر عليه.

> **لماذا `.last()`؟**
>
> يُوفّر الملعب **زرَّي** «Rate this book» عن قصد: واحدًا داخل مقالة Piranesi في قسم «Intermediate: disambiguation and chaining»، وآخر داخل قسم «Dialogs» الذي يفتح نافذة فعلية. وبدون `.last()` (أو نطاق مكافئ)، يرفض الوضع الصارم في Playwright النقر لأن المحدِّد يطابق الاثنين. والحل الأنظف في قاعدة شيفرة حقيقية هو تضييق النطاق داخل منطقة مسمّاة — مثلًا `page.getByRole('region', { name: 'Dialogs' }).getByRole('button', { name: 'Rate this book' })` — لكن أقسام الملعب ليس لها أسماء متاحة للوصول، لذا `.last()` هو الحد الأدنى المقبول لرفع الالتباس في هذا التمرين. وإن أردت تحدّيًا إضافيًا، فلفّ قسم Dialogs في منطقة مسمّاة بشكل صحيح وأعد كتابة المحدِّد كسلسلة أب.

### التحدّي 18: اختر 4 نجوم واحفظ

```typescript
await page.getByRole('button', { name: 'Rate this book' }).last().click();
await page.getByLabel('4 stars').check();
await page.getByRole('button', { name: 'Save rating' }).click();
await expect(page.getByRole('dialog')).toBeHidden();
```

كل نجمة حقل إدخال راديو بـ `aria-label` مثل «4 stars». و`.check()` يحدّدها. ثم انقر «Save rating» وتأكّد من إغلاق النافذة.

### التحدّي 19: ألغِ النافذة الحوارية

```typescript
await page.getByRole('button', { name: 'Rate this book' }).last().click();
await expect(page.getByRole('dialog')).toBeVisible();
await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
await expect(page.getByRole('dialog')).toBeHidden();
```

في النافذة الحوارية زر «Cancel» — وكذلك في قسم «Buttons» في الملعب. وتضييق النقرة الثانية إلى `page.getByRole('dialog').getByRole('button', { name: 'Cancel' })` يمنع الاختبار من مطابقة الاثنين.

## ARIA والأدوار

### التحدّي 20: التنبيه

```typescript
await expect(page.getByRole('alert')).toBeVisible();
await expect(page.getByRole('alert')).toHaveText('Unsaved changes will be lost');
```

`role="alert"` دور منطقة حيّة. و`getByRole('alert')` يعثر عليه مباشرةً.

### التحدّي 21: قيمة شريط التقدّم

```typescript
const progressBar = page.getByRole('progressbar', { name: 'Reading progress' });
await expect(progressBar).toHaveAttribute('aria-valuenow', '65');
```

`toHaveAttribute` يفحص سمة ARIA مباشرةً. وخيار `name` يطابق `aria-label`.

### التحدّي 22: تبديل اللوحة بـ `aria-expanded`

```typescript
const toggle = page.getByRole('button', { name: 'Toggle panel' });
await expect(toggle).toHaveAttribute('aria-expanded', 'false');

await toggle.click();

await expect(toggle).toHaveAttribute('aria-expanded', 'true');
await expect(page.locator('#expandable-panel')).toBeVisible();
```

قبل النقر: `aria-expanded` قيمته `"false"`. وبعده: `"true"` واللوحة مرئية. ولاحظ أن اللوحة تُحدَّد بـ `#expandable-panel` — وهذه إحدى الحالات التي يكون فيها `id` أطبع محدِّد لأن `aria-controls` يشير إليه مباشرةً.

## الأنماط المضادة والبدائل

### التحدّي 23: الزر المزيّف

```typescript
// This won't work — the div has no role:
// await page.getByRole('button', { name: /Click me/ }).click();

// Use the test ID fallback:
await page.getByTestId('fake-button').click();
```

عنصر `<div>` منسّق كزر لكنه بلا `role="button"`، وبلا `tabindex`، وبلا معالجة للوحة المفاتيح. ولا يستطيع `getByRole` العثور عليه. وهذا دليل ملموس على أن الترميز غير القابل للوصول ليس مجرد مسألة معايير — بل مسألة اختبار.

### التحدّي 24: زر أيقونة فقط

```typescript
await expect(page.getByTestId('icon-only-button')).toBeVisible();
```

الزر موجود كعنصر `<button>` حقيقي، لكنه بلا محتوى نصي وبلا `aria-label`. و`getByRole('button')` سيعثر عليه، لكنك لا تستطيع رفع التباسه عن بقية الأزرار بالاسم. لذا `getByTestId` هو المسار الموثوق الوحيد حتى يضيف أحدهم `aria-label`.

## أنماط تأخذها معك

- **الدور أولًا، دائمًا.** إن استطعت كتابة `getByRole`، فاكتبها. فهي أكثر المحدِّدات استقرارًا وتعمل في الوقت نفسه كفحص لإمكانية الوصول.
- **تسلسل لرفع الالتباس.** عندما تطابق عناصر متعددة، ضيّق النطاق بالأب بدلًا من مدّ اليد إلى `.nth()`. فالنسخة المقيّدة بالأب تنجو من إعادة ترتيب DOM.
- **النص محدِّد، لا مجرد تحقّق.** `getByText` في الطبقة الرابعة، لكنه للنص المرئي الفريد مقبول تمامًا — وغالبًا أوضح من بناء سلسلة أدوار.
- **معرّفات الاختبار تستحقّ مكانها.** ليست عارًا. بل هي الجواب الصحيح للعناصر التي يستحيل تسميتها فعلًا. والعار أن تترك العنصر بلا تسمية حين يكون الإصلاح ممكنًا.
- **التحقّق *هو* الانتظار.** كل استدعاء `expect(locator).*` يعيد المحاولة تلقائيًا. ولن تحتاج أبدًا إلى `waitForTimeout` للتعامل مع التوقيت.

## قراءات إضافية

- [تمرين: تحدّيات المحدِّدات](https://stevekinney.com/courses/self-testing-ai-agents/lab-locator-challenges)
- [المحدِّدات وهرم إمكانية الوصول](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy)
- [وضع واجهة Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode)
