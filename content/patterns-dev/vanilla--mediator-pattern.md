---
title: نمط الوسيط/البرمجيات الوسيطة (mediator/middleware)
lang: ar
source: https://www.patterns.dev/vanilla/mediator-pattern/
---

الوسيط (mediator) هو الكائن الموجود في الوسط. بدلًا من أن تعرف المكونات بعضها بعضًا، تتحدث المكونات إلى الوسيط، الذي يقرر ما ينبغي أن يحدث تاليًا. تخيل مشرفًا في غرفة محادثة مزدحمة: تمر كل رسالة عبره، وهو يفرض القواعد — من يحق له التحدث، ومن يُكتم، وأي رسالة تُثبت. لا يحتاج المشاركون إلى معرفة الآخرين بالاسم. كل ما يحتاجونه هو معرفة وجود مشرف يستمع إليهم.

من دون وسيط، ينتهي نظام فيه N مكونات يحتاج كل منها إلى التحدث مع جميع الآخرين إلى عدد اتصالات من رتبة N². يعرف كل مكون بقية المكونات، وتغيير واحد يجعل نطاق الضرر كل شيء. أما مع الوسيط، فلدى كل مكون قناة اتصال واحدة: إلى الوسط. والوسط هو الشيء الوحيد الذي عليه أن يفهم رقصة التنسيق.

## وسيط مخصص بسيط

إليك وسيطًا صغيرًا ينسق خطوات معالج نموذج متعدد الخطوات. لدى المعالج مكونات خطوات مستقلة (المعلومات الشخصية، وعنوان الشحن، والدفع)، ويحتاج أحدها إلى تحديد معنى «التالي» وفق الحالة الحالية. هذا القرار يقع على الوسيط، ولا يتكرر في كل خطوة.

```
class WizardMediator {
  #steps = [];
  #current = 0;
  #data = {};
  #listeners = new Set();

  registerSteps(steps) {
    this.#steps = steps;
  }

  notify(sender, event, payload) {
    switch (event) {
      case "submit": {
        Object.assign(this.#data, payload);
        const nextIndex = this.#computeNext(sender, payload);
        if (nextIndex >= this.#steps.length) {
          this.#emit({ type: "complete", data: this.#data });
        } else {
          this.#current = nextIndex;
          this.#emit({ type: "advance", step: this.#steps[nextIndex] });
        }
        break;
      }
      case "back":
        this.#current = Math.max(0, this.#current - 1);
        this.#emit({ type: "advance", step: this.#steps[this.#current] });
        break;
      case "cancel":
        this.#data = {};
        this.#current = 0;
        this.#emit({ type: "reset" });
        break;
    }
  }

  // The conditional flow lives here, not in any one step.
  #computeNext(sender, payload) {
    if (sender === "personal" && payload.accountType === "guest") {
      return this.#steps.indexOf("payment"); // skip address-on-file
    }
    return this.#current + 1;
  }

  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }

  #emit(event) {
    for (const fn of this.#listeners) fn(event);
  }
}
```

لدى كل مكون خطوة عقد صغير مع الوسيط: استدعِ `notify("submit", { ... })` عندما ينقر المستخدم على «التالي». لا تستورد الخطوة أي خطوة أخرى، ولا تعرف أي خطوة تأتي بعدها، ولا تتخذ قرارات بشأن المسار. فالوسيط يملك كل ذلك.

إذا أخبرك قسم التسويق في الربع المقبل بأن خطوة العنوان ينبغي تخطيها لحسابات B2B، فغيّر فرعًا واحدًا في `#computeNext`. ولا تحتاج مكونات الخطوة إلى معرفة وجود القاعدة.

## الوسيط مقابل البرمجيات الوسيطة

البرمجيات الوسيطة (middleware) — برمجيات Redux الوسيطة، وApollo Link، وHono، وfastify، وأطر الخادم (server) بكل أشكالها — هي وسيط مقدم في صورة خط أنابيب. بدلًا من كائن واحد يقرر ما يجب فعله، تكوّن سلسلة من الدوال الصغيرة، يمكن لكل منها فحص الرسالة أو تحويلها أو قطع مسارها أو تمريرها.

إليك محركًا صغيرًا للبرمجيات الوسيطة، بالشكل نفسه الذي تستخدمه كل أطر تحاكي Express في داخلها:

```
function createPipeline(...middleware) {
  return function dispatch(ctx) {
    let index = -1;

    function runFrom(i) {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      const fn = middleware[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, () => runFrom(i + 1)));
    }

    return runFrom(0);
  };
}
```

المعالج هو `(context, next) => ...`. ويفوض استدعاء `next()` التنفيذ إلى الحلقة التالية في السلسلة، بينما عدم استدعائه يقطع بقية المسار. ولأن كل خطوة تحصل على `ctx` نفسه، تتراكم التعديلات بالطريقة نفسها في Express أو Koa أو Hono.

```
const handle = createPipeline(
  async (ctx, next) => {
    const started = performance.now();
    await next();
    console.log(`${ctx.path} ${performance.now() - started}ms`);
  },

  async (ctx, next) => {
    const token = ctx.headers.authorization;
    if (!token) {
      ctx.response = { status: 401, body: "Unauthorized" };
      return; // short-circuit
    }
    ctx.user = await verify(token);
    await next();
  },

  async (ctx) => {
    ctx.response = { status: 200, body: `Hello, ${ctx.user.name}` };
  }
);

await handle({ path: "/me", headers: { authorization: "Bearer ..." } });
```

الشكل نفسه يشغل **البرمجيات الوسيطة في Redux** (ترى كل برمجية وسيطة الإجراء وتقرر هل تُطلق الإجراء التالي)، و**Apollo Link** (يلتف كل رابط حول عملية)، و**Hono / Koa** (يلتف كل برمجية وسيطة حول الطلب (request)). وحين تتعرف على النمط، فستراه في كل مكان.

## عندما يكون الوسيط آلة حالات

للتنسيق المعقد فعلًا — مثل تدفق الدفع مع إعادة المحاولة، أو رفع ملف مع إيقاف مؤقت واستئناف وإلغاء، أو مشغل فيديو مع تخزين مؤقت وتعطل واسترداد من الأخطاء — تكون آلة الحالات المحدودة (finite state machine) غالبًا الشكل المناسب للوسيط. الحالات والانتقالات هي البروتوكول، وترسل المكونات الأحداث إلى الآلة بدلًا من استدعاء بعضها بعض.

تجعل [XState](https://stately.ai/docs/xstate) ذلك صريحًا:

```
import { setup, createActor } from "xstate";

const uploadMachine = setup({
  actions: {
    sendBytes: ({ context }) => api.upload(context.file),
    cleanup:   ({ context }) => api.abort(context.uploadId),
  },
}).createMachine({
  id: "upload",
  initial: "idle",
  context: { file: null, uploadId: null, progress: 0 },
  states: {
    idle:     { on: { START:  "uploading" } },
    uploading: {
      entry: "sendBytes",
      on: {
        PROGRESS: { actions: ({ context, event }) => (context.progress = event.value) },
        DONE:    "success",
        ERROR:   "failed",
        CANCEL:  { target: "idle", actions: "cleanup" },
      },
    },
    success: { type: "final" },
    failed:  { on: { RETRY: "uploading" } },
  },
});

const upload = createActor(uploadMachine).start();
upload.send({ type: "START" });
```

تطلق واجهة المستخدم الأحداث. وتقرر الآلة ما هو مسموح — إذ تُتجاهل `PROGRESS` أثناء `idle` بصمت، ولا تعمل `RETRY` إلا من `failed`، وهكذا. ولا يمكن للانتقالات غير القانونية أن تحدث لأنها ليست في المخطط.

## الوسيط مقابل الواجهة (facade) مقابل ناقل الأحداث

يختلط الناس كثيرًا بين هذه الأنماط الثلاثة. وهي ليست الشيء نفسه.

|  | الوسيط | ناقل الأحداث (نشر/اشتراك) | الواجهة (facade) |
| --- | --- | --- | --- |
| **الاتجاه** | متعدد الاتجاهات — تتحدث المكونات إليه، وهو يتحدث إليها | إرسال بلا انتظار — لا يعرف الناشرون المشتركين | أحادي الاتجاه — يستدعيه المستدعي، وتخفي الواجهة التعقيد |
| **يملك المنطق؟** | نعم — يعيش مسار العمل هنا | لا — توجيه فقط | لا — تفويض فقط |
| **هل تعرف المكونات به؟** | نعم — تستدعي واجهته البرمجية | نعم — تنشر/تشترك | غالبًا يعرفه جانب المستدعي فقط |
| **الاستخدام المعتاد** | تنسيق مسار عمل (معالج متعدد الخطوات، رفع ملف، نموذج) | أحداث عرضية مفككة (تحليلات، قياس عن بعد) | إخفاء نظام فرعي فوضوي خلف نقطة دخول واحدة واضحة |

اختبار مفيد: إذا كان العنصر الأوسط يتخذ القرارات، فهو وسيط. وإذا كان يوجه الرسائل فقط من دون فحصها، فهو ناقل. وإذا كان يبسط الوصول إلى شيء معقد من دون تنسيق أطراف متعددة، فهو واجهة.

## المزالق الشائعة

### وسيط الكائن الإلهي

مهمة الوسيط هي التنسيق، لا تنفيذ العمل. إذا انتهى كل قاعدة عمل في تطبيقك داخل صنف واحد اسمه `AppMediator`، فقد حولته إلى كائن أحادي ضخم من 4000 سطر — وهو تحديدًا ما يفترض أن يمنع النمط. قسّم الوسطاء حسب المجال (`CheckoutMediator` و`UploadMediator` و`ChatMediator`)، واجعل كل واحد مركزًا على مسار عمل واحد.

### مكونات تعرف بعضها سرًا

تأتي قيمة النمط من كون المكونات لا تعرف إلا الوسيط. وفي اللحظة التي يستورد فيها المكون A المكون B «من أجل النوع فقط»، أو يطلق حدثًا يحمل اسم وجود المكون B، تكون قد أعيد إدخال الاقتران. راقب ذلك أثناء مراجعة الشيفرة.

### صعوبة التتبّع في وقت التشغيل

حين يمر كل شيء عبر عبارة `switch` واحدة، قد تصبح «ماذا يحدث عندما أنقر هذا الزر؟» قصة تحرٍ صغيرة. خفف ذلك عبر تسجيل منظم داخل الوسيط نفسه — إذ يُسجل كل `notify`/`emit` مع معرّف ارتباط — وعبر برامج التصور لآلات الحالات عند استخدام XState أو ما شابه.

### إشعارات إعادة الدخول

إذا سبب معالجة حدث في إطلاق الوسيط حدثًا آخر بصورة متزامنة، فقد تنتهي إلى تكرار غير متوقع. وبالنسبة إلى الوسطاء غير البسط، ضع الأحداث في طابور باستخدام `queueMicrotask` كي ينتهي كل حدث قبل بدء التالي.

## متى لا تستخدم وسيطًا

- **مكوّنان يتحدثان دائمًا بعضهما فقط.** لا تضف شيئًا إلى الوسط. فالاستدعاء المباشر أبسط وأسهل في التتبع.
- **أحداث فردية بلا تنسيق.** يكفي ناقل أحداث عادي أو دالة استدعاء.
- **خطوط أنابيب تُنفذ فيها كل خطوة دائمًا بالترتيب.** تركيب الدوال البسيط أوضح من محرك برمجيات وسيطة.

يعود الوسيط بنفعه إلى نفسه عندما يكون لديك ثلاثة مكونات أو أكثر تتفاعل، وتكون قواعد من يتحدث مع من غير بديهية. وفيما دون ذلك، يمثل عبئًا زائدًا.

## المراجع

- [البرمجيات الوسيطة في Redux](https://redux.js.org/understanding/history-and-design/middleware)
- [Apollo Link](https://www.apollographql.com/docs/react/api/link/introduction)
- [Hono — برمجيات وسيطة وفق معيار الويب](https://hono.dev/)
- [XState — آلات حالات لـJavaScript](https://stately.ai/docs/xstate)
- [الوسيط — Refactoring Guru](https://refactoring.guru/design-patterns/mediator)
