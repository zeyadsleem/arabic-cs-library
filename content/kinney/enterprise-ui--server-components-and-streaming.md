---
title: "مكوّنات الخادم والتصيير المتدفّق من الخادم"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/server-components-and-streaming"
---

أنظف طريقة لفهم هذه المنظومة هي الفصل بين التنفيذ والتسليم. فمكوّنات الخادم (Server Components) تقرّر أي شيفرة تعمل مسبقًا على الخادم. و`'use client'` تحدّد أي الوحدات تنتمي إلى المتصفح. والتصيير من الخادم (SSR) يقرّر هل يحوّل React النتيجة إلى HTML على الخادم. والتصيير المتدفّق من الخادم يقرّر هل يُرسل ذلك HTML دفعة واحدة أم تدريجيًا، عادةً حول حدود Suspense. ويستطيع React الجمع بين كل هذه، لكنها تحلّ مشكلات مختلفة.

وهذا نموذج ذهني مفيد لطلب واحد:

```
request
  → render Server Components, combine with Client Component code
  → server-render the result to HTML
  → stream the shell
  → stream later Suspense chunks as they resolve
  → hydrate interactive client islands in the browser
```

## مكوّنات الخادم تتعلق بأين تعمل الشيفرة

تُصيّر مكوّنات الخادم في بيئة منفصلة عن تطبيق العميل—وReact [صريح](https://react.dev/reference/rsc/server-components) في أن هذه البيئة منفصلة حتى عن خادم SSR. ويمكنها العمل مرة واحدة وقت البناء في CI أو مع كل طلب على خادم ويب. وهذا يجعلها موطنًا مناسبًا لتكوين المسارات، والوصول إلى البيانات من جهة الخادم، وقراءات نظام الملفات، والمكتبات المكلفة التي لا تريدها في حزمة المتصفح. وهي تدعم أيضًا المكوّنات `async`، فيمكنك استخدام `await` أثناء التصيير بدل التنقل عبر تأثيرات العميل وطلبات واجهة برمجية إضافية.

والعائد حزم عميل أصغر وتحميل بيانات أبسط. والمقايضة واضحة بالقدر نفسه: مكوّنات الخادم لا تُرسل إلى المتصفح، فلا تستطيع استخدام واجهات المتصفح التفاعلية مثل `useState` أو معالجات الأحداث أو معظم الخُطّافات. وعندما تحتاج التفاعل، تركّب مكوّن خادم *مع* مكوّن عميل بدل محاولة جعل جزء الخادم يؤدي عمل المتصفح الذي لم يُقصد له قط.

وتفصيل دقيق لكن مهم: لا توجد توجيهية تعلّم ملفًا كمكوّن خادم. فـ[وثائق React تقول صراحةً](https://react.dev/reference/rsc/server-components) إن `'use server'` *ليست* لمكوّنات الخادم—بل لدوال الخادم. مهمة مختلفة، ونظام بيئي واحد. وقد ثبّت React 19 مكوّنات الخادم نفسها، لكن واجهات المُجمِّع والإطار المستخدمة لتنفيذ RSC لا تتبع semver عبر الإصدارات الفرعية لـReact 19.x بعد. وعمليًا، هذا يعني أن معظم الفرق ينبغي أن تستخدم RSC عبر إطار بدل تنفيذ التكامل يدويًا.

## الحدّ بين الخادم والعميل حدّ وحدات

تنشئ `'use client'` حدًا في **شجرة اعتماد الوحدات**، لا في شجرة التصيير. فبمجرد أن تُعلَّم وحدة بـ`'use client'`، تصير تلك الوحدة وشجرة اعتمادها العابرة بكاملها شيفرة تُقيَّم في العميل. وReact [صريح في هذا](https://react.dev/reference/rsc/use-client): الشيفرة في شجرة وحدات العميل تُرسل إلى العميل ويعمل بها. ولهذا فإن وضع `'use client'` في أعلى الشجرة مكلف—فهو يوسّع مقدار الشيفرة التي تُشحن إلى المتصفح.

والحدّ أيضًا لا يتبع التداخل بين الآباء والأبناء. فمكوّن عميل ما زال يستطيع تصيير مكوّن خادم باستقبال JSX مُنشأ سابقًا كخواص أو `children`. ومثال React نفسه يجعل القاعدة صريحة: علاقات التصيير بين الآباء والأبناء لا تضمن بيئة تصيير واحدة، لأن الحدّ يعيش في رسم الاستيراد، لا في شجرة المكوّنات.

والنتيجتان العمليتان:

1. **أبقِ `'use client'` في أدنى موضع ممكن**—ويُفضّل على أصغر ورقة تفاعلية، لا على الصفحة أو التخطيط أو وحدة المسار.
2. **أبقِ البيانات العابرة للحدود قابلة للتسلسل.** فوReact يشترط أن تكون الخصائص المنتقلة من مكوّنات الخادم إلى مكوّنات العميل قابلة للتسلسل. والوحدات المساعدة المشتركة يمكن أن تُقيَّم على أي من الجانبين حسب من يستوردها، لذا يلزم أن تبقى محايدة تجاه البيئة ما لم تقسمها عن قصد.

وهذا شكل ذلك عمليًا:

```typescript
// Expandable.tsx
'use client';

import { useState, type ReactNode } from 'react';

export function Expandable({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setOpen((v) => !v)}>{open ? 'Hide' : 'Show'}</button>
      {open ? children : null}
    </section>
  );
}
```

```typescript
// Page.tsx
import { Expandable } from './Expandable';

export default async function Page() {
  const article = await getArticle();

  return (
    <main>
      <h1>{article.title}</h1>
      <Expandable>
        <ArticleBody article={article} />
      </Expandable>
    </main>
  );
}

async function ArticleBody({ article }: { article: Article }) {
  return <div dangerouslySetInnerHTML={{ __html: article.html }} />;
}
```

فـ`Expandable` شيفرة عميل لأن وحدتها معلَّمة بـ`'use client'`. أما `ArticleBody` فما زال مكوّن خادم لأن الخادم أنشأ ذلك JSX قبل تسليمه إلى غلاف العميل. الشجرة نفسها، وبيئات تنفيذ مختلفة. والقاعدة متسقة بمجرد أن تفكّر بالوحدات لا بالتداخل.

## `renderToPipeableStream` هي واجهة البث في SSR لبيئة Node

إن كنت تُجري SSR منخفض المستوى في Node، فـ[`renderToPipeableStream`](https://react.dev/reference/react-dom/server/renderToPipeableStream) هي نقطة الدخول الأساسية للخادم. فهي تصيّر شجرة React إلى دفق Node.js وتعيد `pipe` و`abort`.

> **ملاحظة**
>
> هذه الواجهة خاصة بـNode. أضاف React 19.2 دعم `renderToReadableStream` في Node، لكن فريق React ما زال يوصي بواجهات Node Streams في Node لأنها أسرع هناك، ولأن Web Streams لا تدعم الضغط افتراضيًا.

وعلى هذا المستوى، يتوقع React أن تمثّل الشجرة المُصيَّرة المستند كاملًا، لذا يصيّر تطبيقك العلوي عادةً `<html>`، لا مقطع محتوى فقط. و`bootstrapScripts` يوجّه المتصفح إلى حزمة العميل، ويستخدم العميل `hydrateRoot` لوصل التفاعل بـHTML المولَّد من الخادم.

```typescript
import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from './App';

const app = express();

app.get('*', (req, res) => {
  let didError = false;

  const { pipe, abort } = renderToPipeableStream(<App url={req.url} />, {
    bootstrapScripts: ['/static/client.js'],

    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      pipe(res);
    },

    onShellError(error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<!doctype html><h1>Something went wrong</h1>');
    },

    onError(error) {
      didError = true;
      console.error(error);
    },
  });

  setTimeout(() => abort(), 10_000);
});
```

وتقابل النداءات الراجعة مراحل محدّدة من التصيير:

- **`onShellReady`** يعمل عندما يكون الهيكل قد صُيّر—النقطة الطبيعية لضبط الترويسات وبدء البث.
- **`onAllReady`** ينتظر حتى يكتمل التصيير *كاملًا*. استخدمه عندما تريد HTML نهائيًا بدل مقاطع تدريجية (الزواحف، والتوليد الساكن).
- **`onShellError`** يعمل عند الأعطال قبل إصدار أي بايت—وما زال بوسعك إرسال مستند احتياطي ورمز 500.
- **`onError`** يرى أخطاء الخادم القابلة للاسترداد وغير القابلة له معًا.
- **`abort()`** يوقف الانتظار، ويفرّغ الواجهات الاحتياطية أثناء التحميل، ويترك العميل يكمل الباقي.

وأكبر مأخذ تشغيلي هو رموز الحالة. فبمجرد أن تبدأ البث، لا تستطيع تغيير حالة الاستجابة. وتوجيه React: فكّر من حيث الهيكل مقابل كل ما داخل حدود Suspense. فإن فشل الهيكل، فما زال `onShellError` قادرًا على إرسال 500. وإن فشل شيء *داخل* حدّ Suspense، فغالبًا يستطيع React التعافي في العميل، ويمكنك مع ذلك أن تختار بث الهيكل وإرجاع 200.

## التصيير المتدفّق من الخادم تسليم HTML واعٍ بـSuspense

ليس التصيير المتدفّق من الخادم مجرد «إرسال البايتات أبكر»، بل ينسّقه Suspense في React. و**الهيكل** هو جزء الصفحة الواقع خارج أي حدّ Suspense. وعندما تقع منطقة أبطأ داخل `<Suspense>`، يبثّ React الهيكل أولًا، ويصدر الواجهة الاحتياطية لتلك المنطقة، ثم يبثّ لاحقًا HTML المكتمل مع سكربت مضمّن يستبدل الواجهة الاحتياطية بالمحتوى الحقيقي. وتتيح لك حدود Suspense المتداخلة كشف الصفحة على مراحل بدل انتظار أبطأ جزء.

و[يحذّر React](https://react.dev/reference/react-dom/server/renderToPipeableStream) من النسخة الكسولة من هذا النمط حيث تلفّ التطبيق كامل في حدّ Suspense جذري واحد. فإن فعلت ذلك، فليس هيكلك إلا مؤشر تحميل. والهدف الأفضل هيكل يبدو أدنى ما يمكن لكنه مكتمل—تخطيط حقيقي، وإطار الصفحة، وسياق يكفي ليتوجّه المستخدم فورًا بينما تمتلئ المناطق الأبطأ.

كما أن البث لا يحتاج إلى انتظار تحميل React نفسه في المتصفح قبل ظهور HTML الأولي. لكن مصادر البيانات الممكَّنة بـSuspense وحدها تشارك. ويشير React حاليًا إلى جلب البيانات عبر Suspense الذي يديره الإطار، وإلى `lazy`، وإلى `use` على وعد. وهو [يقول صراحةً](https://react.dev/reference/react-dom/server/renderToPipeableStream) إن Suspense *لا* يكتشف البيانات المجلوبة داخل Effect أو معالج حدث. فإن كان نموذج بياناتك ما زال «صيّر، ثم `useEffect`، ثم اجلب»، فأنت لا تستفيد من التصيير المتدفّق من الخادم فعليًا.

```typescript
import { Suspense } from 'react';
import { SearchBox } from './SearchBox'; // 'use client'

export default async function Page() {
  const hero = await getHero();

  return (
    <main>
      <Hero data={hero} />
      <SearchBox />
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>
    </main>
  );
}

async function Recommendations() {
  const items = await getRecommendations();
  return <RecommendationsList items={items} />;
}
```

فالبانر الرئيسي والتخطيط جزء من الهيكل. و`SearchBox` يُثبَّت في العميل لأنه مكوّن عميل. أما `Recommendations` فيُبثّ لاحقًا خلف واجهة احتياطية. هذا هو التركيب الأساسي الذي يواصل React توجيه الناس إليه: مكوّنات الخادم للتركيب الغني بالبيانات، ومكوّنات العميل للتفاعل، وSuspense للكشف التدريجي.

## أين تقع دوال الخادم

دوال الخادم (Server Functions) هي نصف التغيير في هذا النموذج. فالدالة المعلَّمة بـ[`'use server'`](https://react.dev/reference/rsc/use-server) قابلة للنداء من شيفرة العميل—يسلسل React الوسائط، ويرسل طلب شبكة إلى الخادم، ويشغّل الدالة هناك، ويسلسل النتيجة عائدةً. وReact صريح جدًا في أن هذه الدوال يجب أن تكون غير متزامنة، وأن تعامل وسائطها كمدخلات غير موثوقة وتصرّح بأي تغييرات.

وعندما تُمرَّر دالة خادم إلى [`<form action>`](https://react.dev/reference/react-dom/components/form) من مكوّن خادم، يُحسَّن النموذج تدريجيًا. فيمكن للنموذج أن يُرسل حتى بلا JavaScript أو قبل تحميل شيفرة العميل—وهي قاعدة أفضل بكثير من التجربة المعتادة: «انقر الزر، ولا شيء يحدث حتى تكتمل حزمة التنزيل».

```typescript
// actions.ts
'use server';

export async function saveSearch(formData: FormData) {
  const query = String(formData.get('query') ?? '');
  await persistSearch(query);
}
```

```typescript
// SearchForm.tsx
'use client';

import { saveSearch } from './actions';

export function SearchForm() {
  return (
    <form action={saveSearch}>
      <input name="query" />
      <button type="submit">Save</button>
    </form>
  );
}
```

## معمارية عملية

وهذا إعداد افتراضي معقول: أبقِ الصفحات والتخطيطات وتكوين المسارات وقراءات البيانات من جهة الخادم في مكوّنات الخادم. وضع الأدوات التي تحتاج حالة أو تأثيرات أو واجهات متصفح أو معالجات أحداث في مكوّنات العميل. وضع التغييرات في دوال الخادم. وضع حدود Suspense حول المناطق الأبطأ أو الأدنى أولوية كي يستطيع الهيكل البث بأسرع ما يمكن.

وذلك التقسيم يتوافق مع مزايا مكوّنات الخادم وحدودها كما توثقها React، ومع كيف يعرّف `renderToPipeableStream` الهيكل. وما لم تكن تبني أدوات إطار، دع إطارًا ما يملك نقل RSC وتكامل المُجمِّع—فما زال React يصف تلك الواجهات منخفضة المستوى بأنها غير مستقرة عبر الإصدارات الفرعية 19.x.

## أخطاء شائعة

أسرع طريقة لتضيع هنا هي أن تتعلّم الأسماء وتفوّت الحدود.

- **الظن أن `'use server'` تعلّم مكوّن خادم.** ليست كذلك. فلا توجد توجيهية لمكوّنات الخادم. و`'use server'` تعلّم دوال الخادم.
- **الظن أن الحدّ يتبع تداخل المكوّنات.** لا يتبعه. فالحدّ في شجرة اعتماد الوحدات، لا في شجرة التصيير.
- **تعليم صفحة أو تخطيط بـ`'use client'`.** فشجرة العميل تضم الاعتمادات العابرة، لذا يمكن أن يتضخم حجم الحزمة أبعد بكثير مما قصدت.
- **توقع أن يعمل Suspense مع جلب البيانات في `useEffect`.** لا يكتشف Suspense البيانات المجلوبة في التأثيرات أو معالجات الأحداث. فمصادر البيانات الممكَّنة بـSuspense وحدها (جلب بيانات الإطار، و`lazy`، و`use` على وعد) تشارك.
- **نسيان أن رمز الحالة يُثبَّت بمجرد بدء البث.** فالبث يمنح رسمًا أبكر، لكنه يغيّر نموذج معالجة الأخطاء لديك.
- **تنفيذ بنية RSC يدويًا.** فواجهات تكامل الإطار والمُجمِّع لا تتبع semver عبر الإصدارات الفرعية 19.x من React. دع إطارًا ما يتولّى ذلك.

## النسخة المختصرة

مكوّنات الخادم للقراءات الخادمية فقط وتكوين المسارات. ومكوّنات العميل للتفاعل. ودوال الخادم للتغييرات. وSuspense لتقرير ما ينتمي إلى الهيكل وما يمكن كشفه لاحقًا. و`renderToPipeableStream` عند نقطة دخول Node عندما تريد التصيير المتدفّق من الخادم. وبمجرد فصل هذه المسؤوليات، يتوقف النموذج عن الإحساس بأنه غامض ويبدأ في الإحساس بأنه خط أنابيب معقول جدًا—وهذا مذعج، لأنه يعني أن React كانت محقة هذه المرة.
