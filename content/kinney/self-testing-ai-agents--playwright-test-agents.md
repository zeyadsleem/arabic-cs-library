---
title: "وكلاء الاختبار في Playwright"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/playwright-test-agents"
---

أطلقت [Playwright](https://playwright.dev/) الإصدار 1.56 بشيء جديد حقًا: ثلاثة وكلاء مدمجين—**المخطِّط** و**المولِّد** و**المعالِج**—يمكنهم كتابة حزمة اختباراتك وصيانتها من داخل حلقة وكيل البرمجة الخاص بك. ليس «إكمالًا تلقائيًا بمساعدة الذكاء الاصطناعي لكود الاختبار». بل وكلاء فعليون يملكون أدوات وتعليمات وقدرة على تشغيل متصفح، وفحص النتيجة، والتكرار.

هذا يهمنا لأنه يغيّر شكل حلقة التغذية الراجعة. حتى الآن، كان الوكيل يكتب الكود، ويشغّل الاختبارات، ويقرأ المخرجات، ويحاول مرة أخرى. مع وكلاء الاختبار في Playwright، يمكن للوكيل أيضًا *كتابة الاختبارات نفسها*—وعندما تتعطل تلك الاختبارات، يعالجها دون أن تلصق أثر المكدس مرة أخرى. تصبح طبقة التحقق شيئًا يمكن للوكيل بناؤه *وصيانته*، لا مجرد استهلاكه.

## الوكلاء الثلاثة

يتولى كل وكيل مرحلة واحدة من دورة حياة الاختبار. يمكنك استخدامها بشكل مستقل، أو ربطها ببعضها، أو تركها تعمل كحلقة.

- **المخطِّط:** يستكشف تطبيقك في متصفح حقيقي وينتج خطة اختبار Markdown منظمة.
- **المولِّد:** يأخذ خطة Markdown تلك ويحوّلها إلى ملفات اختبار Playwright قابلة للتنفيذ، ويتحقق من المحددات والتأكيدات مباشرة أثناء ذلك.
- **المعالِج:** يشغّل اختبارًا فاشلًا، ويفحص الواجهة الحالية، ويصلح الاختبار، ويعيد التشغيل حتى ينجح—أو يعلّمه بـ `test.fixme()` إذا بدت الوظيفة نفسها معطلة.

الفكرة الأساسية هي أنها قابلة للتركيب. لا يحتاج المخطِّط إلى المولِّد، ولا يحتاج المعالِج إلى أي من الاثنين الآخرين. لكن عندما تربط الثلاثة، تحصل على خط أنابيب يمتد من «هذا تطبيقي» إلى «هذه حزمة اختبارات ناجحة» إلى «الاختبارات ما زالت تنجح بعد إعادة الهيكلة» دون أن تكتب محددًا واحدًا.

> **هؤلاء الوكلاء أدوات، لا سحر**
>
> إنهم ينتجون ملفات اختبار Playwright حقيقية—نفس كتل `test()` وتأكيدات `expect()` ومحددات `getByRole()` التي كنت ستكتبها يدويًا. يمكنك (بل وينبغي لك) قراءة المخرجات وتحريرها وإيداعها. إنهم مسرّعات للحلقة، وليسوا بديلًا عن فهم ما تفعله الاختبارات. إذا تعطّل وكيل أو أخطأ، فأعد تشغيله—لكن راجع الفروق أولًا، لأن تشغيلًا جزئيًا ربما عدّل ملفات بالفعل.

## البدء

أضف تعريفات الوكلاء إلى مشروعك بالأمر `init-agents`. هذه التعريفات عبارة عن مجموعات من أدوات [MCP](https://modelcontextprotocol.io/) وتعليمات يوفرها Playwright، وينبغي إعادة توليدها كلما حدّثت Playwright لالتقاط القدرات الجديدة.

لـ [Claude Code](https://docs.claude.com/en/docs/claude-code/overview):

```bash
npx playwright init-agents --loop=claude
```

لـ [VS Code](https://code.visualstudio.com/):

```bash
npx playwright init-agents --loop=vscode
```

لـ [GitHub Copilot](https://github.com/features/copilot):

```bash
npx playwright init-agents --loop=copilot
```

لـ [OpenCode](https://opencode.ai/):

```bash
npx playwright init-agents --loop=opencode
```

> **نصيحة**
>
> تحتاج إلى VS Code الإصدار 1.105 أو أحدث لكي تعمل التجربة الوكيلة بشكل صحيح.

بالنسبة إلى Claude Code، ينشئ هذا ثلاثة تعريفات وكلاء في `.claude/agents/` (المخطِّط والمولِّد والمعالِج) وإعداد خادم MCP في `.mcp.json`. وقد ينشئ أيضًا ملف `specs/README.md` واختبار بذرة افتراضيًا إذا لم يكن أي منهما موجودًا. أما الأدوات الأخرى فتضع التعريفات في أماكن أخرى—يستخدم VS Code وCopilot المسار `.github/agents/` ويكتبان إضافةً إلى ذلك `.github/workflows/copilot-setup-steps.yml` وملف `.vscode/mcp.json` مُلحَقًا، بينما يكتب OpenCode مطالبات الوكلاء تحت `.opencode/prompts/` مع ملف `opencode.json` في جذر المستودع. توقّع ملفات خارج مجلد الوكلاء الأعلى في تلك الحلقات، وراجع الفروق كاملة بعد تشغيل `init-agents`.

ثمة أمر يجب معرفته: `init-agents` يستبدل ملف `.mcp.json` الخاص بالمستودع. لا يشحن Shelf هذا الملف، لذا الأمر غير ضار داخل الورشة. أما إذا كنت تشغّله على مستودعك الخاص الذي يسجّل خوادم MCP بالفعل، فخذ نسخة احتياطية من الملف أولًا ثم ادمج `playwright-test` بعده.

بمجرد توليد الوكلاء، توجّههم عبر أداة الذكاء الاصطناعي التي تختارها. تتبع المخرجات المولّدة بنية نظيفة سنلقي نظرة عليها بعد قليل.

## خيارات سطر الأوامر التي تهم فعلًا

مخرجات المساعدة لـ `init-agents` قصيرة:

```
--loop <loop>
-c, --config <file>
--project <project>
--prompts
-h, --help
```

المساعدة القصيرة لطيفة. لكنها أيضًا ليست شرحًا كافيًا بحد ذاتها.

### `--loop <loop>`

هذا هو القرار الوحيد المطلوب. يخبر Playwright بمضيف الوكيل الذي ينبغي تهيئته:

- `claude`: يكتب تعريفات وكلاء Claude Code تحت `.claude/agents/` وإعداد MCP في `.mcp.json`
- `copilot`: يكتب تعريفات وكلاء بنمط GitHub Copilot تحت `.github/agents/`
- `opencode`: يكتب إعداد OpenCode مع مطالبات الوكلاء تحت `.opencode/`
- `vscode`: يستخدم تخطيط وكيل VS Code / GitHub الحالي تحت `.github/agents/`
- `vscode-legacy`: يستخدم تخطيط أوضاع الدردشة (chatmodes) الأقدم في VS Code تحت `.github/chatmodes/` و`.vscode/mcp.json`

اعتبارًا من Playwright 1.59، يوجّه `--loop=vscode` و`--loop=copilot` إلى المولِّد نفسه، وينتج عنهما مخرجات متطابقة. العلمان مترادفان اليوم؛ اختر الاسم الأوضح في سير عملك.

التمييز المهم هو أن `vscode` هو المسار الحالي. أما `vscode-legacy` فيوجد لإعدادات VS Code الأقدم التي ما زالت تتوقع أوضاع الدردشة بدلًا من صيغة تعريف الوكيل الأحدث.

### `-c, --config <file>`

يوجّه هذا `init-agents` إلى ملف إعداد Playwright الذي ينبغي تحميله قبل محاولة العثور على مشروع بذرة.

استخدمه عندما:

- لا يكون إعدادك هو `playwright.config.ts` الافتراضي في المجلد الحالي
- يكون لديك عدة إعدادات Playwright في المستودع
- تشغّل `init-agents` من مجلد فرعي ولا تريد أن يخمّن Playwright

هذا العلم مهم لأن المولِّد يستخدم الإعداد المحمّل للعثور على `testDir` الخاص بالمشروع، ثم يبحث في ذلك المشروع عن ملف يتضمن اسمه `seed`. وإذا لم يجد واحدًا، ينشئ `seed.spec.ts` افتراضيًا في `testDir` لذلك المشروع.

### `--project <project>`

هذا يختار مشروع Playwright الذي سيُعامَل بوصفه **مشروع البذرة الأساسي**.

إذا حذفته، يستخدم Playwright أول مشروع من المستوى الأعلى في الإعداد المحمّل. هذا مقبول عندما يحتوي إعدادك على مشروع رئيسي واحد واضح. لكنه غير مقبول عندما يحتوي إعدادك على أدوار أو بيئات متعددة، ويصادف أن أول مشروع شيء غريب مثل `setup` أو `firefox` أو `mobile`.

استخدم `--project` عندما ينبغي أن تأتي البذرة بوضوح من مشروع محدد واحد:

```bash
npx playwright init-agents --loop=claude --project=authenticated
```

هذا يخبر Playwright بمكان البحث عن ملف بذرة موجود، وبمكان إنشاء الملف الافتراضي إذا لم تكن هناك بذرة بعد.

### `--prompts`

هذا يخبر Playwright بكتابة قوالب المطالبات إلى جانب تهيئة الوكيل بدلًا من كتابة تعريفات الوكلاء فقط.

عمليًا، يعني ذلك مجلدات مطالبات خاصة بكل مزوّد مثل:

- `.claude/prompts/`
- `.opencode/prompts/`
- `.github/prompts/`

هذا مفيد عندما تريد نص المطالبة تحت تحكم الإصدارات كقطعة أثرية قابلة للتحرير بدلًا من أن يعيش فقط داخل ملفات الوكلاء المولّدة.

ثمة فارق دقيق: `--prompts` ذو معنى لتخطيطات Claude وCopilot وOpenCode وVS Code الحديثة الحالية. وهو ليس العلم المثير في وضع `vscode-legacy`، لأن ذلك المسار الأقدم مبني حول chatmodes بدلًا من تخطيط قوالب المطالبات الأحدث.

### `-h, --help`

هذا يطبع مساعدة الأمر ويخرج فحسب:

```bash
npx playwright init-agents --help
```

يبدو ذلك تافهًا، لكنه أسرع طريقة للتأكد من مزوّدي الحلقات الذين يدعمهم إصدار Playwright المثبّت لديك فعلًا، قبل أن تبدأ في تقليد الأمثلة من مقالة مدونة كُتبت لإصدار مختلف.

## المخطِّط

يستكشف وكيل المخطِّط تطبيقك العامل في متصفح حقيقي وينتج خطة اختبار Markdown. إنه يفعل ما يفعله مهندس ضمان الجودة في أول جولة له في تطبيق غير مألوف: ينقر هنا وهناك، ويلاحظ ما يفعله التطبيق، ويكتب ما ينبغي اختباره.

**ما يحتاجه منك:**

- طلب واضح—«أنشئ خطة لمسار الدفع كزائر» أو «خطّط لاختبارات سير عمل تقييم الكتب على الرف».
- **اختبار بذرة** يهيئ البيئة التي يحتاجها تطبيقك. يشغّل المخطِّط اختبار البذرة لتهيئة البيئة—الإعداد العام، وتبعيات المشروع، والتجهيزات، والخطافات—ثم يستكشف من هناك. ويقرأ أيضًا بنية البذرة كمرجع أسلوبي للخطة المولّدة.
- اختياريًا، وثيقة PRD أو وثيقة متطلبات لسياق إضافي.

اختبار البذرة هو مجرد اختبار Playwright عادي يضع التطبيق في حالة قابلة للاستخدام:

```typescript
import { test, expect } from '@playwright/test';
import { resetShelfContent } from './helpers/seed';

test('seed', async ({ page }) => {
  await resetShelfContent();
  await page.goto('/shelf');
  await expect(page.getByRole('heading', { name: /shelf/i })).toBeVisible();
});
```

إذا كنت قد وصلت بالفعل إلى مختبر ملف أدلة الفشل وأضفت `tests/fixtures.ts`، فالاستيراد من `./fixtures` مقبول أيضًا. الجزء المهم هنا هو نقطة البداية المهيأة والمصادَقة—لا ملف الغلاف.

في Shelf، ستكون تلك البذرة `tests/seed.spec.ts`—ملف ستنشئه في المختبر المرافق، لا ملفًا يأتي مع المشروع الأولي. وبعد أن يحدث التوليد ويصبح اختبار ما أحمر، يُوجّه المعالِج عادة إلى ملف ملموس واحد تحت `tests/<failing-spec>.spec.ts`. هذان المساران هما نقطتا التسليم للحلقة بأكملها.

**ما ينتجه:**

ملف Markdown في `specs/`—شيء مثل `specs/basic-operations.md`. الخطة مقروءة بشريًا لكنها دقيقة بما يكفي لكي يعمل المولِّد عليها آليًا. يتضمن كل سيناريو خطوات مرقّمة ونتائج متوقعة وسياقًا كافيًا بحيث لو سلّمتها لمختبِر بشري لعرف ما يجب فعله.

وهذا مثال مبتور من نوع المخرجات التي ينبغي أن تحصل عليها:

```markdown
# TodoMVC Application - Basic Operations Test Plan

## Application Overview

The TodoMVC application is a React-based todo list manager. Key features
include task management, bulk operations, filtering by status, a real-time
counter, edit-in-place, and state persistence during navigation.

## Test Scenarios

### Adding New Todos

**Seed:** `tests/seed.spec.ts`

#### Add Valid Todo

**Steps:**

1. Click in the "What needs to be done?" input field
2. Type "Buy groceries"
3. Press Enter key

**Expected Results:**

- Todo appears in the list with unchecked checkbox
- Counter shows "1 item left"
- Input field is cleared and ready for next entry
```

لاحظ البنية: كل سيناريو يسمّي بذرته، ويسرد خطوات ملموسة، ويحدد نتائج متوقعة قابلة للملاحظة. هذه ليست وثيقة متطلبات غامضة—إنها خطة اختبار يمكن لوكيل (أو إنسان) تنفيذها خطوة بخطوة.

## المولِّد

يأخذ المولِّد خطة Markdown من `specs/` وينتج ملفات اختبار Playwright قابلة للتنفيذ. الأمر المهم: إنه لا يترجم النص إلى كود فحسب. بل يتحقق من المحددات والتأكيدات *مباشرة* أثناء تنفيذه كل سيناريو، لذا تعكس الاختبارات المولّدة ما يفعله التطبيق فعلًا، لا ما خمّنته الخطة.

يزوّد Playwright المولِّد بتلميحات توليد وكتالوج من التأكيدات، لذا تميل المخرجات إلى الاستقرار على محددات `getByRole` وتأكيدات تعيد المحاولة تلقائيًا—وهي بالضبط الأنماط التي كنا نبني نحوها في هذه الدورة.

**ما يحتاجه منك:**

- خطة Markdown من `specs/`. أدرج الملف في سياق مطالبتك كي يعرف المولِّد أين يجده.

**ما ينتجه:**

ملفات اختبار تحت `tests/`، بمقابلة واحد لواحد مع سيناريوهات المواصفة. قد تكون للاختبارات المولّدة مشكلات أولية—محددات لا تتطابق تمامًا، وتأكيدات تحتاج إلى إحكام—وهنا يأتي دور المعالِج.

قد يبدو اختبار مولّد هكذا:

```typescript
// spec: specs/basic-operations.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('Add Valid Todo', async ({ page }) => {
    const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    await todoInput.click();
    await todoInput.fill('Buy groceries');
    await todoInput.press('Enter');

    await expect(page.getByText('Buy groceries')).toBeVisible();

    const todoCheckbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
    await expect(todoCheckbox).toBeVisible();
    await expect(todoCheckbox).not.toBeChecked();

    await expect(page.getByText('1 item left')).toBeVisible();
    await expect(todoInput).toHaveValue('');
  });
});
```

ثمة أمران يستحقان الملاحظة. أولًا، التعليقات في الأعلى تتعقب الاختبار عائدًا إلى مواصفته وبذرته—حتى تتمكن دائمًا من العثور على الخطة التي ولّدت اختبارًا معينًا. ثانيًا، إنه يستخدم `getByRole` وتأكيدات تعيد المحاولة تلقائيًا، لا محددات CSS و`waitForTimeout`. لقد استوعب المولِّد هرمية المحددات التي غطيناها سابقًا في هذه الدورة.

## المعالِج

هذا هو الوكيل الذي يغلق الحلقة. عندما يفشل اختبار—لأن الواجهة تغيرت، أو انزلق محدد، أو لم يكن الكود المولّد صحيحًا تمامًا—يعيد المعالِج تشغيل الخطوات الفاشلة، ويفحص الحالة الحالية للواجهة، ويصلح الاختبار.

**ما يفعله:**

- يعيد تشغيل خطوات الاختبار الفاشلة في متصفح حقيقي.
- يفحص DOM الحالي للعثور على عناصر أو تدفقات مكافئة.
- يقترح تصحيحًا: تحديث محدد، أو تعديل انتظار، أو إصلاح بيانات.
- يعيد تشغيل الاختبار للتحقق من نجاح التصحيح.
- يكرر حتى ينجح الاختبار، أو حتى توقفه الحواجز. إذا استمر الخطأ وكان المعالِج واثقًا من صحة الاختبار، فإنه يعلّم الاختبار بـ `test.fixme()` ويضيف تعليقًا قبل الخطوة الفاشلة يشرح ما يحدث بدلًا من السلوك المتوقع.

تلك النقطة الأخيرة دقيقة ومهمة. المعالِج الجيد لا يُجبر الاختبارات على النجاح فحسب. بل يميّز بين «الاختبار قديم» و«الميزة معطلة». عندما يتخطى المعالِج اختبارًا، فهو يخبرك بشيء يستحق التحقيق.

**ما يحتاجه منك:**

- اسم الاختبار الفاشل.

**ما ينتجه:**

- اختبار ناجح، أو تعليق `test.fixme()` مع تعليق يشرح سبب اعتقاد المعالِج أن الوظيفة نفسها معطلة. ويبدو الاختبار الذي تخطاه المعالِج هكذا:

```typescript
test('Rate a book from the shelf', async ({ page }) => {
  await page.goto('/shelf');
  // Healer: the "Rate this book" button no longer appears in the shelf view.
  // This looks like a removed feature, not a stale locator.
  test.fixme();
  await page.getByRole('button', { name: 'Rate this book' }).click();
  // ...
});
```

## بنية المخرجات

ينتج الوكلاء ملفات في تخطيط متوقع:

```
repo/
  .claude/agents/             # agent definitions for Claude Code
  .mcp.json                   # MCP server config for the test agents
  specs/                      # human-readable test plans from the planner
    basic-operations.md
  tests/                      # generated Playwright tests
    seed.spec.ts              # seed test for environment bootstrap
    create/
      add-valid-todo.spec.ts  # generated from specs/basic-operations.md
  playwright.config.ts
```

> **نصيحة**
>
> يضع VS Code وCopilot تعريفات الوكلاء تحت `.github/agents/` بدلًا من ذلك. ويستخدم OpenCode المسار `.opencode/prompts/`. التخطيط أعلاه يعكس الافتراضي في Claude Code.

**تعريفات الوكلاء** توفرها Playwright وينبغي إعادة توليدها عند تحديث إصدارات Playwright. إنها تحتوي على تعريفات أدوات MCP والتعليمات التي تشغّل كل وكيل.

**المواصفات** في `specs/` هي الخطط المنظمة. إنها تحت تحكم الإصدارات، وقابلة للمراجعة، وقابلة للتحرير. إذا لم تكن خطة المخطِّط صحيحة تمامًا، يمكنك تحرير Markdown قبل تسليمها إلى المولِّد.

**الاختبارات** في `tests/` هي اختبارات Playwright المولّدة. إنها ملفات `.spec.ts` عادية—لا شيء مميز فيها. تُودعها، وتراجعها في طلبات السحب، وتشغّلها في CI مثل أي اختبار آخر.

**اختبارات البذرة** مثل `seed.spec.ts` توفر السياق الابتدائي. إنها تتولى المصادقة، وإعداد التجهيزات، وأي شيء آخر يحتاجه المخطِّط للاستكشاف من حالة معروفة.

أودع تعريفات الوكلاء في تحكم الإصدارات. إنها ملفات Markdown صغيرة، وإبقاؤها في المستودع يعني أن كل مطور في الفريق يحصل على سلوك الوكيل نفسه.

## أين تقع وكلاء الاختبار في الحلقة

تندرج وكلاء الاختبار في حلقة التغذية الراجعة عند نقطة محددة: إنها الطبقة بين «كتب الوكيل بعض الكود» و«يعرف الوكيل ما إذا كان الكود يعمل». وهكذا يبدو ذلك عمليًا.

بدون وكلاء الاختبار، تكون الحلقة: اكتب الكود ← شغّل الاختبارات الموجودة ← اقرأ الإخفاقات ← أصلح ← كرر. الاختبارات ثابتة—شخص ما (أنت) كتبها، والوكيل يجريها فقط.

مع وكلاء الاختبار، تتوسع الحلقة: اكتب الكود ← خطّط لاختبارات السلوك الجديد ← ولّد الاختبارات ← شغّلها ← عالج ما يفشل منها ← أبلغ. يمكن للوكيل الآن *توسيع* حزمة الاختبارات كجزء من سير عمله، لا مجرد استهلاك ما هو موجود بالفعل.

هذا تحول ذو معنى. فهو يعني أن وكيلًا يعمل على ميزة جديدة يمكنه أيضًا إنتاج التحقق لتلك الميزة، في المحادثة نفسها. يستكشف المخطِّط ما تفعله الميزة فعلًا (لا ما قالته المطالبة إنه ينبغي أن تفعله)، ويكتب المولِّد اختبارات تطابق الواجهة الحقيقية، ويُبقي المعالِج تلك الاختبارات حية مع تطور الكود.

يستعرض المختبر هذا الخط مرة واحدة، من البداية إلى النهاية. عمليًا، تعود إلى المخطِّط كلما تغيرت المتطلبات أو اكتسب التطبيق تدفقات جديدة.

التحذير—وأريد أن أكون صريحًا بشأنه—هو أن جودة الاختبارات المولّدة من الوكيل لا تتجاوز جودة الخطة. إذا أساء المخطِّط فهم الميزة، فسينتج المولِّد بأمانة اختبارات للشيء الخطأ، وسيحافظ المعالِج بأمانة على نجاح تلك الاختبارات الخاطئة. ما زلت بحاجة إلى مراجعة المواصفات في `specs/` بالعناية نفسها التي تراجع بها أي اختبار. الوكلاء يسرّعون العمل الميكانيكي. أما الحكم على *ما يجب اختباره* فما زال لك.

## قواعد الوكيل

إذا كنت تستخدم وكلاء الاختبار في مشروعك، فأضف شيئًا مثل هذا إلى ملف التعليمات:

```markdown
## Playwright Test Agents

- The planner, generator, and healer agent definitions live under
  `.claude/agents/` with an MCP config in `.mcp.json`. Regenerate them
  with `npx playwright init-agents --loop=claude` after updating Playwright.
- Plans live in `specs/`. Review them before generating tests—the generator
  will faithfully implement whatever the plan says, including mistakes.
- Generated tests live in `tests/`. They are regular Playwright tests—commit
  them, review them in PRs, run them in CI.
- When a test fails after a UI change, try the healer before manually fixing
  the test. If the healer skips the test, investigate—it believes the feature
  is broken, not just the test.
- Seed tests (`seed.spec.ts`) must use the project's custom fixtures. Do not
  bypass fixtures or global setup in seed tests.
```

## الشيء الوحيد الذي يجب تذكره

تحوّل وكلاء الاختبار في Playwright طبقة التحقق من شيء تبنيه *من أجل* الوكيل إلى شيء يمكن للوكيل بناؤه *معك*. المخطِّط يستكشف، والمولِّد يكتب، والمعالِج يصون. يصبح العمل الميكانيكي لإبقاء حزمة الاختبارات محدثة أرخص. أما الحكم على ما يهم—ما يجب تخطيطه، وما يجب مراجعته، ومتى تتجاوز المعالِج—فيبقى معك.

## قراءة إضافية

- [المحددات وهرمية إمكانية الوصول](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy)
- [قصة الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [الحالة الحتمية وعزل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
- [مختبر: توليد حزمة اختبارات ومعالجتها بوكلاء Playwright](https://stevekinney.com/courses/self-testing-ai-agents/lab-generate-and-heal-with-playwright-agents)
