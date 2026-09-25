---
title: الترطيب التدريجي
lang: ar
source: https://www.patterns.dev/react/progressive-hydration/
---

الصفحة المعروضة في الخادم تُرسم بسرعة. يظهر HTML على الشاشة قبل تشغيل أي شيفرة React بوقت طويل. لكن الصفحة لا تصبح *تفاعلية* إلا بعد أن ينزّل React حزمة JS ويمر على DOM كامل ويطابق كل عقدة بمكوّن ويربط مستمعي الأحداث. تحدث هذه الخطوة — وهي الترطيب (hydration) — دفعة واحدة بصورة متزامنة، وتنمو خطيًا مع حجم شجرة المكوّنات.

النتيجة وضع فشل مألوف: تبدو صفحة كاملة على الشاشة لمدة نصف ثانية أو أكثر، فتفقد النقرات وتبدو معطلة. والمقياس الذي يستخدمه Google لقياس ذلك هو **Interaction to Next Paint (INP)**، الذي حل محل First Input Delay في Core Web Vitals في مارس 2024. ويعد الترطيب أحد أكبر المساهمين في درجات INP السيئة على المواقع التي بُنيت جيدًا بخلاف ذلك.



الترطيب التدريجي (progressive hydration) هو مجموعة التقنيات التي تقسّم الترطيب إلى أجزاء وتشغّل كل جزء في اللحظة التي تهم فيها فعلًا — عند وصول JavaScript الخاص به، أو عندما يمرره المستخدم إلى مجال الرؤية، أو عندما يحاول التفاعل معه. والهدف هو النتيجة نفسها للترطيب مع عمل أقل بكثير على المسار الحرج للصفحة.

## ما الذي يكلّفه التنفيذ «دفعة واحدة» فعليًا

لترسيخ المناقشة، إليك بعض الأرقام. على هاتف Android من الفئة المتوسطة لعام 2019:

- يستغرق تحليل 200 KB من JS المضغوط نحو 300–500 مللي ثانية.
- يستغرق ترطيب صفحة متوسطة التعقيد —لنقل 1,500 عقدة React— نحو 150–300 مللي ثانية أخرى.
- يظل الخيط الرئيسي محجوبًا طوال الوقت، ما يعني أن النقرات والتمرير وتحركات CSS تتلعثم أو تنتظر في طابور.

إذا تم ترطيب القسم الرئيسي وشريط التنقل وعنصر دردشة مضمّن في التذييل معًا، فإن عنصر الدردشة — وهو الجزء الذي لا يلمسه أحد لمدة 30 ثانية — يكون جزءًا من ميزانية حجب INP لديك منذ لحظة تحميل الصفحة. وتفترض الترطيب التدريجي على أن هذا تصرف سخيف. ارطّب ما هو تفاعلي *الآن*، وأجّل الباقي.



## شكل التقنية

يحتاج نظام ترطيب تدريجي شامل إلى خمسة أمور:

- يعرض الخادم HTML الكامل لكل مكوّن، فلا ينقص المحتوى أثناء انتظار الترطيب.
- تكون JavaScript الخاص بكل مكوّن في مقطع شيفرة مقسّم خاص به.
- يعمل الترطيب لكل مقطع، وفق ترتيب محدد أو وفق محفّزات الاستخدام.
- تبقى المناطق التي رُطّبت تفاعلية بينما لا تزال مناطق أخرى قيد الترطيب.
- تظهر حالة تحميل مرئية وغير مزعجة عند الحاجة.

تقدّم React 18 معظم هذه القدرات افتراضيًا. تعرض الأقسام التالية كيفية استخدامها.

## الترطيب الانتقائي: خط الأساس المدمج

إذا كنت تستخدم `hydrateRoot` مع `` بالفعل، فأنت تمارس أبسط أشكال الترطيب التدريجي. كل شجرة ملفوفة بـ `` تُرطَّب *بشكل مستقل* عن بقية الصفحة. وإذا ضغط المستخدم داخل منطقة لم تُرطَّب بعد، فإن React يعيد ترتيب الأولويات؛ فتقفز تلك المنطقة إلى مقدمة الطابور.

```
import { Suspense, lazy } from "react";\n
const ProductReviews = lazy(() => import("./ProductReviews"));
const RelatedProducts = lazy(() => import("./RelatedProducts"));
const Comments = lazy(() => import("./Comments"));\n
export default function ProductPage({ product }) {
  return (
    <>
      <ProductDetails product={product} /> {/* hydrates first */}\n
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={product.id} />
      </Suspense>\n
      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedProducts productId={product.id} />
      </Suspense>\n
      <Suspense fallback={null}>
        <Comments productId={product.id} />
      </Suspense>
    </>
  );
}
```

النتيجة على الشبكة:

- يُرطَّب `ProductDetails` كجزء من الحزمة الرئيسية.
- تجلب المناطق الثلاث الأخرى كل منها مقطعها الخاص وتُرطَّب عند وصوله.
- إذا ضغط المستخدم على «نشر تعليق» قبل تحميل مقطع التعليقات، فإن React يحمّل ويَرطّب *تلك* المنطقة أولًا.

هذا كافٍ لمعظم المواقع. لا تحتاج إلى مرطّب مخصص أو مكتبة خارجية — فاستخدام `` مع `lazy()` و`hydrateRoot` يمثل الآلية كاملة.

## الترطيب المعتمد على الظهور

بالنسبة إلى المحتوى أسفل الطية، يمكنك أن تفعل أفضل من «حمّله في وقت ما»؛ إذ يمكنك الانتظار حتى يمرره المستخدم فعلًا إلى مجال الرؤية. هذه الفكرة نفسها المستخدمة في التحميل الكسول للصور، لكن مطبقة على JavaScript.

إليك غلافًا صغيرًا لـ `` باستخدام `IntersectionObserver`:

```
"use client";
import { useState, useEffect, useRef, Suspense } from "react";\n
export function LazyHydrate({ children, rootMargin = "200px" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);\n
  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;\n
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);\n
  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
```

في Next.js، النسخة الأكثر ملاءمة هي `next/dynamic`:

```
import dynamic from "next/dynamic";\n
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <ChartSkeleton />,
});
```

يظل هذا العنصر معروضًا في الخادم افتراضيًا. استخدم `{ ssr: false }` لتخطي العرض في الخادم لمكونات تقيم في جانب العميل فعليًا، مثل خريطة Mapbox أو محرر شيفرة، مع السماح بتنزيل JavaScript وتنفيذه بعيدًا عن المسار الحرج.

## الترطيب المعتمد على التفاعل («ارطّب عند المرور»، «ارطّب عند النقر»)

بالنسبة إلى واجهة قد يتعامل معها المستخدم — قائمة بحث منسدلة أو منتقي تاريخ أو قائمة معقدة — يمكنك تأخير تحميل المقطع نفسه حتى يبدّل المستخدم نية التفاعل. هذا ما ترسّخ له أطر عمل مثل Astro وQwik في `client:idle` و`client:visible` و`client:media` و`client:only`.

في تطبيق Next.js يمكنك محاكاته بغلاف صغير:

```
"use client";
import { useState, lazy, Suspense } from "react";\n
const SearchModal = lazy(() => import("./SearchModal"));\n
export function SearchTrigger() {
  const [open, setOpen] = useState(false);\n
  return (
    <>
      <button onClick={() => setOpen(true)}>Search</button>
      {open && (
        <Suspense fallback={<p>Loading search...</p>}>
          <SearchModal onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
```

يُرطَّب زر بدء التشغيل كجزء من الحزمة الرئيسية لأنه صغير جدًا. أما النافذة المنبثقة — التي تحمل التبعيات الثقيلة، مثل مكتبة البحث الضبابي وحالة سجل البحث الأخير وبيانات القياس — فلا تُرسَل إلى العميل حتى يضغط المستخدم. تكلفة ترطيب أولية معدومة، وزمن استجابة صغير عند أول تفاعل.

## انتقالات React 19 تساعد هنا أيضًا

ينافس الترطيب الخيط الرئيسي مع كل شيء آخر يفعله المتصفح. وقد استقرت في React 19 **الانتقالات غير المتزامنة (async transitions)** و**الإجراءات (Actions)**، وهما أداتان تمنحانك وسائل لمنع الترطيب من حجب التفاعل:

- ضع تحديثات الحالة الثقيلة في انتقالات باستخدام `startTransition` كي يتمكّن React من مقاطعتها.
- تشغّل `Actions API` إرسال النماذج عبر انتقال تلقائيًا، لذا يظل النقر الذي يرسل نموذجًا مستجيبًا حتى عندما تكون المكوّنات المرتبطة ما تزال قيد الترطيب.
- تتيح `useActionState` و`useFormStatus` معالجة نماذج ملائمة للتحسين التدريجي؛ إذ يعمل النموذج قبل تحميل JavaScript أصلًا.

```
"use client";
import { useActionState } from "react";
import { subscribeAction } from "./actions";\n
export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);\n
  return (
    <form action={formAction}>
      <input type="email" name="email" required />
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

لأن `action` الخاص بالنموذج هو Server Action حقيقي، يظل النموذج قابلًا للإرسال حتى قبل ترطيب هذا المكوّن. ويوفر التحسين التدريجي خط أساس بلا ترطيب، بينما تتيح لك خطافات React 19 الارتقاء إلى تجربة تفاعلية غنية لاحقًا.

## مكوّنات React الخادمية: مخرج آخر للترطيب

الشكل الأكثر عدوانية لـ«لا ترطّب هذا» هو «لا ترسل JavaScript الخاص به إطلاقًا». يُعرض مكوّن React الخادمي (server component) بالكامل على الخادم، ولا ينتج حزمة عميل، ولا يوجد ما يحتاج إلى ترطيب. تكلفة ترطيب RSC تساوي الصفر تمامًا.

```
// app/page.tsx  -- Server Component by default
import ClientCounter from "./ClientCounter";\n
export default async function Home() {
  const posts = await db.posts.findMany();\n
  return (
    <main>
      <h1>Latest posts</h1>
      <ul>
        {posts.map((p) => <li key={p.id}>{p.title}</li>)} {/* no client JS */}
      </ul>
      <ClientCounter /> {/* the only thing that hydrates */}
    </main>
  );
}
```

هذا هو التصور الذي ظل فريق React يدعو إليه: بدلًا من تحسين طريقة عمل الترطيب، ألغِه للأجزاء التي لا تحتاج إليه من الصفحة. اجمع بين RSC للأجزاء الساكنة والمعتمدة على البيانات وجزر `'use client'` للجزاء التفاعلية فعلًا، فتقلل الترطيب إلى جزء ضئيل جدًا من الصفحة.

## ما الذي ينبغي قياسه

يكون الترطيب التدريجي غير مرئي إذا لم تقس الأشياء الصحيحة. تابع:

- **INP (Interaction to Next Paint)** — المقياس الأهم. أي قيمة تقل عن 200 مللي ثانية جيدة، وما يزيد على 500 مللي ثانية سيئة.
- **Total Blocking Time (TBT)** في اختبارات المختبر، مثل Lighthouse وWebPageTest. ويظهر TBT المرتفع أثناء الترطيب هنا.
- **Long Animation Frames (LoAF)** — واجهة أحدث تكشف مهام JavaScript محددة التي تحجب الخيط الرئيسي.
- **عدد بايتات JS لكل مسار** — تابع حجم حزمة كل مسار في CI كي لا تتسلل حالات الانحدار.

## شجرة القرار

لكل مكوّن في صفحة معروضة في الخادم:

- هل يحتاج إلى التفاعل أصلًا؟ إن لم يكن كذلك، اجعله مكوّنًا خادميًا أو HTML خالصًا.
- هل هو أعلى الطية ومفيد فورًا؟ ارطّبه في الحزمة الرئيسية.
- هل هو أسفل الطية，但从 المحتمل أن يُستخدم لاحقًا؟ استخدم `next/dynamic` أو الترطيب المعتمد على الظهور.
- هل يشغله إجراء صريح من المستخدم، مثل نافذة منبثقة أو قائمة منسدلة؟ استخدم الترطيب المعتمد على التفاعل.
- هل يتوقف تشغيله على مجال الرؤية أو الشبكة أو وسائط أخرى؟ استخدم توجيهات العميل الشرطية.

طبق ذلك على كل منطقة في صفحتك، فتتقلص التكلفة الكلية للوصول إلى قابلية التفاعل بصورة هائلة. والترطيب التدريجي ليس ميزة مفردة بقدر ما هو موقف تصميمي: افترض أن الترطيب مكلف، وتعامل مع لحظة ترطيب كل مكوّن على أنها قرار لا وضع افتراضي.
