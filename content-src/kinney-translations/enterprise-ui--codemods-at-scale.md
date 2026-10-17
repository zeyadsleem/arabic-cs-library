---
title: "Codemods على نطاق واسع"
---

إن احتجت يومًا إلى إعادة تسمية استيراد عبر ألفَي ملف، فحدسك الأول كان على الأرجح البحث والاستبدال. وبالنسبة إلى إعادة تسمية بسيطة—`oldThing` إلى `newThing`—فهذا ينجح. لكن بمجرد أن تحتاج شيئًا أكثر بنيوية بقليل—تحويل استيراد مُسمّى إلى استيراد افتراضي، أو إعادة كتابة نداء دالة ليستخدم ترتيب وسائط مختلفًا، أو استبدال واجهة برمجية مهجورة بأخرى تأخذ خيارات مختلفة—يبدأ البحث والاستبدال في إنتاج نتائج إيجابية خاطئة، وإغفال حالات حدّية، وإتلاف القوالب النصية (template literals) أحيانًا.

**codemod** هو تحويل آلي للشيفرة يعمل على *بنية* الشيفرة لا على نصها. فبدلًا من مطابقة السلاسل النصية، يحلّل codemod الشيفرة المصدرية إلى شجرة صياغة مجرّدة (Abstract Syntax Tree)، ويبحث عن العُقد المطابقة لنمط ما، ويستبدل تلك العُقد بأخرى جديدة، ويطبع الشجرة المعدَّلة عائدةً إلى المصدر. والنتيجة تحويل يفهم الفرق بين `React.createClass` في عبارة استيراد و`React.createClass` في تعليق.

## لماذا تنكسر التحويلات القائمة على النص

تأمّل ترحيلًا تحتاج فيه إلى تغيير كل نداء إلى `analytics.track(eventName)` ليصبح `analytics.send({ event: eventName })`. يستطيع التعبير النمطي (regex) معالجة الحالة البسيطة، لكن قواعد الشيفرة الحقيقية فيها:

- أسماء استيراد مستعارة مختلفة (`import { track as logEvent }`)
- نداءات تمتد على عدة أسطر
- السلسلة `analytics.track` نفسها داخل خاصية JSX وقالب نصي وتعليق
- وصول ديناميكي إلى الخصائص (`analytics[method]()`)

فإما أن يفوت التعبير النمطي هذه الحالات أو يشوّهها. أما التحويل القائم على AST فيتعامل مع الثلاث الأولى طبيعيًا لأنه يعمل على البنية المحلَّلة لا على النص الخام. والحالة الرابعة—الوصول الديناميكي—يتخطّاها بشكل صحيح لأن نوع العقدة لا يطابق. أنت تريد أداة دقيقة في ما تغيّره وصادقة في ما لا تستطيع تغييره.

## خط أنابيب AST

يتبع كل codemod خط الأنابيب نفسه ذا المراحل الأربع:

```
flowchart LR
    Source["Source Code"] --> Parse
    Parse --> AST["Abstract\nSyntax Tree"]
    AST --> Transform["Find &\nTransform"]
    Transform --> Print
    Print --> Output["Modified Source"]
```

يقرأ المحلّل (parser) الشيفرة المصدرية وينتج شجرة. وتمثّل كل عقدة في الشجرة تركيبًا لغويًا—`ImportDeclaration` أو `CallExpression` أو `JSXElement` أو `VariableDeclarator`. وتمشي خطوة التحويل في الشجرة، فتجد العُقد المطابقة لنمط وتستبدلها بعُقد جديدة. ويُسلسل الطابع (printer) الشجرة المعدَّلة عائدةً إلى الشيفرة المصدرية، محافظًا على التنسيق والتعليقات التي لم تكن جزءًا من التحويل.

كلمة «مجرّدة» في **شجرة الصياغة المجرّدة** تعني أن الشجرة تُسقط الضجيج الصياغي—الأقواس المستخدمة للتجميع فقط، والفواصل المنقوطة، والمسافات. وما يبقى هو البنية المنطقية للبرنامج. ولهذا يُنتج ملفان بتنسيق مختلف لكن بمنطق متطابق الشجرة نفسها، ولهذا يستطيع codemod إيجاد نمط دون القلق من عدد المسافات التي استخدمها أحدهم للإزاحة.

إليك شكل عبارة استيراد بسيطة كشجرة:

```
graph TD
    ID["ImportDeclaration"]
    ID --> Specifiers
    ID --> Source["Source: '@pulse/analytics'"]
    Specifiers --> IS["ImportSpecifier"]
    IS --> Imported["imported: 'Chart'"]
    IS --> Local["local: 'Chart'"]
```

عندما «يجد codemod كل الاستيرادات من `./legacy-chart`»، فهو يبحث عن عُقد `ImportDeclaration` التي تطابق `source.value` فيها تلك السلسلة. وعندما يستبدل المصدر بـ `@pulse/analytics`، فهو يبادل عقدة AST بأخرى. ويتولّى الطابع تحويل الشجرة المعدَّلة عائدةً إلى شيفرة مصدرية صالحة.

## jscodeshift

[jscodeshift](https://github.com/facebook/jscodeshift) هو صندوق أدوات Meta لكتابة codemods وتشغيلها. وهو يلفّ [recast](https://github.com/benjamn/recast) (الذي يتولّى التحليل والطبع مع الحفاظ على التنسيق) ويوفّر واجهة برمجية شبيهة بـ jQuery للبحث في AST وتحويله.

يبدو codemod بسيط هكذا:

*rename-import.ts*

```typescript
import type { API, FileInfo } from 'jscodeshift';

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.ImportDeclaration, {
      source: { value: '@old/package' },
    })
    .forEach((path) => {
      path.node.source.value = '@new/package';
    });

  return root.toSource();
}
```

*ملاحظة:* `j(file.source)` يحلّل الملف ويعيد مجموعة قابلة للاجتياز.

*ملاحظة:* يجد كل استيراد من `@old/package` ويعيد كتابة سلسلة المصدر.

تشغّله على دليل من الملفات:

```bash
npx jscodeshift --parser tsx --transform rename-import.ts src/
```

يعالج jscodeshift الملفات على التوازي افتراضيًا، فيتوسّع ليشمل قواعد شيفرة كبيرة دون دفعات مخصّصة. ويخبر علم `--parser tsx` أداة recast باستخدام محلّل مدرك لـ TypeScript، يتعامل مع ملفات `.ts` و`.tsx` معًا.

تتبع الواجهة البرمجية نمطًا: `find` لتحديد موقع العُقد، و`filter` لتضييق النتائج، و`forEach` أو `replaceWith` لإجراء التغييرات. وإن كنت قد استخدمت jQuery أو تحديدات D3، فسيبدو أسلوب التسلسل مألوفًا.

## تحويل أكثر واقعية

إعادة تسمية مصدر حزمة هي الحالة السهلة. وإليك شيئًا أقرب إلى عمل ترحيل حقيقي—تحويل نمط نداء واجهة برمجية قديمة إلى نمط حديث:

*migrate-api-calls.ts*

```typescript
import type { API, FileInfo } from 'jscodeshift';

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find: analytics.track("event_name", { key: value })
  // Replace: analytics.send({ event: "event_name", properties: { key: value } })
  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { name: 'analytics' },
        property: { name: 'track' },
      },
    })
    .forEach((path) => {
      const args = path.node.arguments;
      if (args.length < 1) return;

      const eventArg = args[0];
      const propsArg = args[1] || j.objectExpression([]);

      // Build the new call: analytics.send({ event, properties })
      path.node.callee.property.name = 'send';
      path.node.arguments = [
        j.objectExpression([
          j.property('init', j.identifier('event'), eventArg),
          j.property('init', j.identifier('properties'), propsArg),
        ]),
      ];
    });

  return root.toSource();
}
```

*ملاحظة:* يطابق الشكل الدقيق لنداءات `analytics.track(...)` في AST.

*ملاحظة:* يعيد هيكلة الوسائط في كائن خيارات واحد.

يأخذ هذا التحويل `analytics.track("page_view", { url: "/" })` وينتج `analytics.send({ event: "page_view", properties: { url: "/" } })`. ولا يستطيع التعبير النمطي التمييز بشكل موثوق بين هذا وسلسلة تحتوي `analytics.track` صدفةً أو نداء بعدد وسائط مختلف. ويتعامل تحويل AST مع الحالتين بشكل صحيح لأنه يعمل على بنية الشيفرة لا على نصها.

> **ابدأ بالحالات الميكانيكية**
>
> لا يحتاج codemod إلى معالجة كل حالة حدّية ليكون ذا قيمة. فإن كان يحوّل 80% من مواضع النداء بشكل صحيح ويؤشّر على الـ20% المتبقية للمراجعة اليدوية، فقد وفّر أيامًا من العمل بالفعل. اكتب التحويل للنمط الشائع، وأضف `console.warn` للأنماط التي لا تستطيع معالجتها تلقائيًا، وراجع الفرق (diff).

## حلقة الاختبار

codemods هي دوال من سلاسل نصية إلى سلاسل نصية، ما يجعل اختبارها مباشرًا. فتكتب مدخلًا، وتشغّل التحويل، وتتحقق من المخرَج:

*rename-import.test.ts*

```typescript
import { describe, it, expect } from 'vitest';
import jscodeshift from 'jscodeshift';
import transform from '../rename-import';

function run(input: string): string {
  return transform(
    { source: input, path: 'test.tsx' },
    { jscodeshift, j: jscodeshift, stats: () => {}, report: () => {} },
  );
}

describe('rename-import', () => {
  it('rewrites the package source', () => {
    const input = `import { Button } from "@old/package";`;
    const output = run(input);
    expect(output).toContain('@new/package');
    expect(output).not.toContain('@old/package');
  });

  it('leaves unrelated imports alone', () => {
    const input = `import { useState } from "react";`;
    expect(run(input)).toBe(input);
  });
});
```

*ملاحظة:* سلسلة تدخل، وسلسلة تخرج. لا نظام ملفات، ولا مُجمِّع، ولا إطار.

عندما ينتج codemod مخرَجًا غير صحيح على ملف حقيقي، انسخ المقتطف المشكِل إلى حالة اختبار، وأصلح التحويل، وتحقق من نجاح الاختبار. ومع الوقت، تجمع مجموعة اختباراتك فهرسًا من الحالات الحدّية يمنع التراجعات عند توسيعك نطاق codemod.

## التوزيع المؤسسي

في شركات مثل Meta وGoogle، ليست codemods بدعة ترحيل—بل جزء من سير عمل التطوير القياسي. فعندما تُدخل مكتبة داخلية تغييرًا كاسرًا في واجهتها البرمجية، يشحن الفريق المالك للمكتبة codemod إلى جانب الإصدار الجديد. ويصف [مقال Martin Fowler عن codemods](https://martinfowler.com/articles/codemods-api-refactoring.html) هذا كعُرف ثقافي: فمؤلّف المكتبة يتحمّل مسؤولية ترحيل المستهلكين، لا العكس.

هذا يقلب ديناميكية الترقية المعتادة. فبدلًا من أن يكتشف كل فريق مستهلك باستقلالية كيف يتكيّف مع تغيير كاسر، يكتب فريق المكتبة تحويلًا واحدًا يتولّى الترحيل عبر المستودع الأحادي بأكمله. وعلى مقياس Meta—آلاف المهندسين، وملايين أسطر الشيفرة—فإن البديل (فتح تذاكر والأمل في أن يهاجر كل فريق يدويًا) لا ينجح ببساطة.

وينطبق النمط نفسه على ترحيلات نظام التصميم. فعندما تعيد مكتبة مكوّنات تسمية خاصية (prop)، أو تغيّر واجهة مكوّن البرمجية، أو تُهجر نمطًا، يستطيع codemod تحديث كل مستهلك تلقائيًا. ويبني [Hypermod](https://www.hypermod.io/blog/7-automating-design-system-evolution) على هذه الفكرة، موفّرًا منصة مخصّصة لتوزيع codemods نظام التصميم التي تستطيع الفرق تشغيلها كجزء من سير عمل ترقيتها.

يستحق الاستنتاج التنظيمي التسطير: تنقل codemods كلفة تطوّر الواجهة البرمجية من المستهلكين إلى المنتِجين. فالفريق الذي يُجري التغيير الكاسر يتحمّل كلفة كتابة سكربت الترحيل، وهذا عادل—فهو الأكثر دراية بما تغيّر ولماذا. وهذا يجعل التغييرات الكاسرة *أرخص* على المؤسسة ككل، ما يعني أن المكتبات تستطيع التطور أسرع دون ترك المستهلكين عالقين على إصدارات قديمة.

## متى تستحق codemods كلفتها

تصبح codemods منطقية عندما يكون لديك تحويل:

- **ميكانيكي**: يُقابل النمط القديم النمط الجديد دون أحكام شخصية.
- **متكرّر**: يحتاج التغيير نفسه إلى الحدوث عبر عشرات أو مئات الملفات.
- **قابل للاختبار**: تستطيع كتابة أزواج مدخل/مخرَج تتحقق من التحويل.

وهي أقل فائدة عندما يتطلّب التحويل فهم منطق العمل، أو عندما تكون الشيفرة غير متسقة إلى حد لا يغطّي فيه نمط واحد معظم الحالات، أو عندما يكون عدد الملفات المتأثرة صغيرًا بما يكفي لتكون التعديلات اليدوية أسرع من كتابة التحويل.

اختبار عباد الشمس الجيد: إن كنت تصف التغيير بأنه «اعثر على كل X واستبدله بـ Y، حيث X وY نمطان بنيويان في الشيفرة»، فهذا codemod. وإن كنت تصفه بأنه «انظر إلى كل استخدام وقرّر ما تفعله بناءً على السياق»، فهذا إنسان مع قائمة تحقّق.

## ما هو أبعد من jscodeshift

jscodeshift هو الأداة الأوسع استخدامًا في منظومة JavaScript، لكنه ليس الخيار الوحيد. ويوفّر [ts-morph](https://ts-morph.com/) واجهة برمجية أصلية لـ TypeScript غالبًا أكثر ملاءمة للتحويلات الخاصة بـ TypeScript لأنه يفهم الأنواع لا الصياغة فقط. وبالنسبة إلى تحويلات CSS، يوفّر [PostCSS](https://postcss.org/) خط أنابيب مكافئًا قائمًا على AST. وبالنسبة إلى قوالب HTML، تقدّم أدوات مثل [parse5](https://github.com/inikulin/parse5) معالجة شجرية بمستوى DOM.

الفكرة الكامنة هي نفسها في كل مكان: حلّل محتوى مُهيكلًا إلى شجرة، وعالج الشجرة، ثم اطبعها عائدةً. وبمجرد أن تكتب تحويل AST واحدًا، ينتقل النمط إلى أي لغة أو صيغة لها محلّل.

سنضع هذا موضع التطبيق في [التمرين 9](https://stevekinney.com/courses/enterprise-ui/strangler-fig-and-codemods-exercise)، حيث ستكتب codemod بـ jscodeshift يحوّل استيرادات المكوّنات القديمة إلى استيرادات حزم حديثة—وهو بالضبط نوع عمل الترحيل الميكانيكي المتكرّر الذي تتعامل معه codemods جيدًا.

---

## الخلاصة السريعة (TL;DR)

### خط أنابيب AST

> حلّل → اعثر → حوّل → اطبع. هذه هي الفكرة كلها.

```
Source Code → Parse → Abstract Syntax Tree → Find & Transform → Print → Modified Source
```

- تنكسر التحويلات القائمة على النص (regex، sed) عند التعبيرات متعددة الأسطر، وأسماء الاستيراد المستعارة، والمحتوى داخل التعليقات أو السلاسل النصية.
- تفهم تحويلات AST *بنية* البرنامج. فهي تطابق عُقدًا لا أحرفًا.
- يحافظ الطابع على التنسيق الأصلي (المسافات، والعلامات، والفواصل المنقوطة) لكل ما لم يمسّه.

---

### jscodeshift

> صندوق أدوات Meta لكتابة تحويلات الشيفرة القائمة على AST وتشغيلها على نطاق واسع.

```typescript
export default function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.ImportDeclaration, { source: { value: '@legacy/analytics' } }).forEach((path) => {
    path.node.source.value = '@modern/analytics';
  });

  return root.toSource();
}
```

- واجهة برمجية شبيهة بـ jQuery: `find()`، `filter()`، `forEach()`، `replaceWith()`.
- يشغّل التحويلات على التوازي عبر قواعد شيفرة كبيرة.
- استخدم AST Explorer لنمذجة التحويلات قبل الالتزام بها.

---

### متى تستحق codemods كلفتها

> تستحق codemods العناء عندما يكون التحويل ميكانيكيًا ومتكرّرًا وقابلًا للاختبار.

- **ميكانيكي:** يُقابل النمط القديم النمط الجديد مباشرةً. ولا يلزم حكم على منطق العمل.
- **متكرّر:** من عشرات إلى مئات مواضع النداء. وإن كانت ثلاثة ملفات، فأنجزها يدويًا.
- **قابل للاختبار:** سلسلة تدخل وسلسلة تخرج. اكتب أزواج مدخل/مخرَج، وشغّل التحويل، وقارن.
- اشحن codemods *مع* التغييرات الكاسرة. ففريق المكتبة الذي يعيد تسمية الواجهة البرمجية يكتب codemod. وتنتقل كلفة الترحيل من المستهلكين إلى المنتِجين.
