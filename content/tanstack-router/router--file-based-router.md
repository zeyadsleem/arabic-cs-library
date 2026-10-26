---
title: "الموجّه بالملفات (File Based Router)"
lang: ar
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=1295s"
---

## ماذا سنتعلّم؟

في الدرس السابق بنينا الموجّه كاملًا داخل الشيفرة: مسارُ جذر، ومسارُ صفحة البداية، ومسارُ صفحة `about`، ثم ركّبنا شجرة المسارات بأيدينا وسلّمناها إلى `createRouter`. يعمل هذا الأسلوب جيدًا، لكنه يضع بنية التطبيق كلّها في ملفٍّ واحد، ويجعل أيّ تعديلٍ على المسارات تعديلًا على الشجرة المجمَّعة في الذاكرة.

في هذا الدرس نحوّل الموجّه إلى الأسلوب المعتمد على الملفات: يصير مجلّد `src/routes/` مصدر الحقيقة الوحيد، وتصير لكلّ صفحةٍ فيه ملفٌّ واحد. سنرى ما الذي يكتبه المولِّد آليًا في `routeTree.gen.ts`، وكيف تبقى المسارات متزامنةً مع أسماء ملفاتها، وما الذي تكسبه من سلامة الأنواع بمجرّد تبنّي هذا الأسلوب.

## الشرح

### مجلّد المسارات: نقطة البداية

أوّل خطوة هي إنشاء مجلّد `src/routes/` داخل المشروع. هذا هو الاسم الافتراضي لمجلّد المسارات، ويمكن تخصيصه إن أردت. وتضع داخله كلَّ ما يخصّ المسارات، وفي هذا الدرس ثلاثة ملفات:

- `src/routes/__root.tsx` — المسارُ الجذر، وهو الإطارُ الذي يحيط بكلّ الصفحات
- `src/routes/index.tsx` — الصفحة الرئيسية، أي العنوان `/`
- `src/routes/about.tsx` — صفحة `about`، أي العنوان `/about`

في الشجرة التي كتبناها بأيدينا في الدرس السابق كان لكلّ مسارٍ تعريفٌ داخل الذاكرة؛ أمّا هنا فالمسارُ هو الملفُ نفسه، وما عدا ذلك من تفاصيل الشجرة صار من شأن المولِّد وحده.

### ملف الجذر: `__root.tsx`

المسارُ الجذر في هذا الأسلوب ملفٌ واحد داخل مجلّد المسارات. وحين تنشئ هذا الملف، يضيف المولِّد آليًا سطرَ تعريف المسار، فلا تحتاج إلى استدعاء `createRootRoute` بنفسك ولا إلى تمرير المكوّن إليه؛ يكفي أن تضع مكوّنك في مكانه:

```tsx
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-blue-950 p-2">
      <h1 className="text-2xl font-bold">Root Route</h1>
      <div className="p-2 flex gap-2 mb-4 bg-teal-600">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link className="[&.active]:font-bold" to="/about">
          About
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </div>
  );
}
```

المكوّن نفسه لم يتغيّر عن الدرس السابق: ترويسةٌ، وشريطُ تنقّلٍ فيه رابطان، و`<Outlet />` مكانَ عرض المسار الابن، وأدواتُ المطوّر في الزاوية. والتغيّرُ الوحيد أنّ تعريف المسار صار في الملف المولَّد، وأنّ شجرةَ المسارات اليدوية التي كانت في `src/main.tsx` اختفت.

### صفحةٌ واحدة لكلّ ملف

صفحةُ `about` صارت ملفًا واحدًا هو `src/routes/about.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-pink-600">
      <h3 className="text-xl font-bold">About</h3>
    </div>
  );
}
```

المولِّد كتب سطرَ `createFileRoute("/about")` نيابةً عنك، فلا تكتب العنوان بيدك. وحين تعيد تسمية الملف إلى `about-us.tsx` يُعاد كتابة السطر نفسه ليطابق الاسم الجديد، فيتحدّث العنوان المولَّد تلقائيًا.

### الصفحة الرئيسية: `index.tsx`

الصفحةُ الرئيسية في هذا الأسلوب ملفٌّ اسمه `index.tsx`، ويقابله العنوان `/`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-violet-500">
      <h3 className="text-xl font-bold">Home</h3>
    </div>
  );
}
```

ولاحظ أنّ شيفرة هذا الملف لا تتجاوز سطرَ تعريف المسار والمكوّن: لا استيرادَ إضافي، ولا ربطٌ مع شجرةٍ ما، ولا تعريفُ مسارٍ في مكان آخر. المسارُ معروفٌ من اسم ملفه.

### شجرة المسارات المولَّدة

بعد نقل الملفات إلى `src/routes/` ظهر في المشروع ملفٌ جديد اسمه `routeTree.gen.ts`. هذا هو الملف المولَّد الذي يحوي شجرة المسارات — أي الشجرة نفسها التي كنّا نكتبها بأيدينا في الدرس السابق — إضافةً إلى ما يلزم من أنواع TypeScript.

ولا حاجة من الآن فصاعدًا إلى تركيب الشجرة في الذاكرة؛ يكفي أن تستوردها من الملف المولَّد وتمرّرها إلى `createRouter`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

سطرُ الاستيراد `import { routeTree } from "./routeTree.gen";` يشير إلى الملف المولَّد في جذر `src`، بجوار `main.tsx` مباشرة. أمّا كتلة `declare module` فتسجّل نوعَ الموجّه في واجهة `Register` من المكتبة، فتصير أنواعُ المسارات معروفةً في كلّ المشروع.

ولكي يعمل هذا كلُّه أصلًا، يحتاج المشروع إضافة `tanstackRouter` من حزمة `@tanstack/router-plugin/vite` داخل `vite.config.ts`، وهي موجودةٌ فيه منذ درس التثبيت:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
    }),
    react(),
    tailwindcss(),
  ],
});
```

### المسار يتبع اسم الملف

يستحقّ هذا الجزء وقفةً: العنوان يبقى مكتوبًا داخل الملف في `createFileRoute("/about")`، لكنّ المشروع هو من يكتبه ويصحّحه. فإن غيّرتَه بيدك إلى قيمةٍ لا تطابق اسم الملف، ظهر خطأٌ في الأنواع في محرّرك. وإذا غيّرتَ اسم الملف أو اسم المجلّد، تُحدَّث العناوين تحتهما تلقائيًا.

وهنا يكمن الفرق العمليّ بين الأسلوبين: في الأسلوب اليدوي كان العنوانُ سطرًا تكتبه في شجرةٍ واحدة، وفي هذا الأسلوب صارت العناوينُ أسماءَ ملفات. وأيُّ خطأ في المطابقة يظهر لك في محرّرك فورًا بدل أن يظهر في المتصفّح بعد النشر.

### ما الذي يكسبه هذا الأسلوب

وتجدر الإشارة إلى الفوائد الأخرى: المساراتُ مجموعةٌ في مجلّدٍ واحد فيصير فهمُها أسهل، وتنظيمُ الشيفرة أوضح وأقرب إلى التوسّع؛ وتقسيمُ الشيفرة إلى أجزاءٍ منفصلة لاحقًا يصير أسهل بكثير ممّا كان عليه في الأسلوب اليدوي؛ كما تأتيك ميزاتُ سلامة الأنواع جاهزةً بمجرّد أن يسمح المشروع للمكتبة بتوليد ما تحتاجه من أنواع TypeScript.

ثمّ ننتقل في الدرس التالي إلى ما هو أهمّ: المسارات المتداخلة والتخطيطات.

## النتيجة

![الصفحة الرئيسية بعد التحويل إلى الأسلوب المعتمد على الملفات: ترويسة المسار الجذر وشريط التنقّل وصفحة البداية البنفسجية](/images/tanstack-router/router--file-based-router--home.png)

في الصورة: الترويسةُ الداكنة في الأعلى هي المسارُ الجذر، وتحتها الشريطُ الفيروزّي وفيه رابطا `Home` و`About`، ثم الصندوقُ البنفسجيّ الذي يعرض الصفحة الرئيسية. كلُّ ذلك صار الآن ملفَّين اثنين في `src/routes/` بدل شجرةٍ مكتوبةٍ في الذاكرة، وفي الزاوية العليا اليمنى تظهر أداة المطوّر، وبفتح لوحتها تُعرض شجرة المسارات المولَّدة.

## جرّب بنفسك

1. أنشئ مجلّد `src/routes/`، وانقل إليه مكوّن المسار الجذر في ملف `__root.tsx`.
2. أضف `src/routes/about.tsx` و`src/routes/index.tsx`، وضع في كلٍّ منهما مكوّن الصفحة.
3. احذف شجرة المسارات اليدوية من `src/main.tsx`، واستورد `routeTree` من `./routeTree.gen` بدلًا منها.
4. شغّل `npm run dev`، ثم افتح `/` و`/about` وتأكّد من عمل الروابط بينهما.
5. أعد تسمية `about.tsx` إلى `about-us.tsx` وشاهد كيف يتغيّر العنوان المولَّد تلقائيًا، ثم أعِدها إلى `about`.

## المراجع

- [فيديو الدرس: File Based Router](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=1295s)
- [شيفرة الدرس: فرع file-based-conversion](https://github.com/alialaa/tanstack-router-course/tree/file-based-conversion)
- [التوثيق الرسمي لـ TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «File Based Router» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.
