---
title: نظرة عامة على Next.js
lang: ar
source: https://www.patterns.dev/react/nextjs/
---
Next.js، الذي أنشأته Vercel، هو إطار عمل React (framework) كامل المكدس ومحسّن للإنتاج. مع التحديثات الحديثة، يركّز Next.js على بنية App Router ومكوّنات React الخادمية (React Server Components) وإمكانات المكدس الكامل السلسة. لنستكشف ميزات Next.js وأنماطه الحديثة.

## البنية الأساسية

### App Router والتوجيه وتنظيم الشيفرة

قدّم Next.js 13+ [App Router](https://nextjs.org/docs/app) بوصفه الأسلوب الموصى به لبناء التطبيقات، بما يجلبه من إمكانات قوية للتوجيه وتنظيم الشيفرة:

```javascript
app/

layout.tsx         # Root layout (applies to all routes)

page.tsx          # Home page (/)

about/

page.tsx        # About page (/about)

blog/

layout.tsx      # Blog layout

page.tsx        # Blog list (/blog)

[slug]/

page.tsx      # Dynamic blog post (/blog/post-1)

categories/

[...slug]/    # Catch-all segments (/blog/categories/a/b/c)

page.tsx

(marketing)/      # Route groups

page.tsx

@modal/          # Parallel routes

page.tsx

not-found.tsx    # Custom 404 page

error.tsx        # Error boundary

loading.tsx      # Loading UI
```

ميزات التوجيه (routing) الأساسية:

- **التوجيه القائم على الملفات**: تعكس روابط URL بنية ملفاتك
- **الشرائح الديناميكية**: `[param]` للمسارات (routes) الديناميكية
- **مسارات Catch-all**: `[...slug]` للمسارات المرنة
- **مجموعات المسارات**: `(group)` للتنظيم المنطقي
- **المسارات المتوازية**: `@name` للعروض المتزامنة
- **مسارات الاعتراض**: `(..)photo` لواجهات تشبه النوافذ المنبثقة

الميزات الأساسية:

- **مكوّنات خادمية افتراضيًا** (من دون أي JavaScript للعميل)
- **تخطيطات متداخلة** مع العرض الجزئي
- **البث (streaming)** لتحميل المحتوى تدريجيًا
- **جلب البيانات (data fetching)** المبسّط باستخدام async/await
- **معالجة أخطاء مدمجة** مع error.tsx
- **حالات تحميل** مع loading.tsx
- **صفحات 404** مع not-found.tsx

### تقسيم الشيفرة وتحسين الحزمة (bundle)

ينفّذ Next.js تلقائيًا عدة استراتيجيات لتقسيم الشيفرة:

- **التقسيم القائم على المسارات**: يُقسّم كل مسار تلقائيًا
- يُحمَّل فقط الشيفرة اللازمة للمسار الحالي
- الجلب المسبق (prefetching) للمسارات المرجّحة بحسب مجال الرؤية
- التحسين الساكن التلقائي كلما أمكن
- **التقسيم على مستوى المكوّنات**:

```javascript
// Dynamic imports for components

import dynamic from 'next/dynamic'

const DynamicChart = dynamic(() => import('@/components/Chart'), {

loading: () => <p>Loading chart...</p>,

ssr: false // Disable server-rendering

})

// Conditional imports

const AdminPanel = dynamic(() =>

import('@/components/Admin').then(mod => mod.AdminPanel), {

loading: () => <p>Loading admin panel...</p>

})
```

- **التقسيم على مستوى المكتبات**: تُقسَّم وحدات الطرف الثالث تلقائيًا
- أجزاء مشتركة للشيفرة المستخدمة كثيرًا
- دعم module federation للواجهات الأمامية المصغّرة
- **تحسين الصور**: التحميل الكسول التلقائي للصور
- استراتيجيات تحميل قائمة على مجال الرؤية
- تحسين الصيغة (WebP/AVIF)

### العرض الهجين

يدعم Next.js استراتيجيات عرض متعددة في تطبيق واحد:

- **توليد المواقع الساكنة (SSG)**: العرض المسبق وقت البناء
- **إعادة التوليد الساكن التزايدي (ISR)**: تحديث المحتوى الساكن بعد البناء
- **العرض من جانب الخادم (SSR)**: العرض عند كل طلب
- **العرض من جانب العميل (CSR)**: الترطيب (hydration) التقليدي لـReact

النمط الحديث:

```javascript
// app/page.tsx

export default async function Home() {

const data = await fetchData(); // Server-side fetch

return (

<main>

<StaticContent data={data} />

<ClientComponent />

</main>

)

}
```

## جلب البيانات الحديث

### أنماط بيانات App Router

| الميزة | أسلوب App Router |
| --- | --- |
| الخصائص الساكنة | `generateStaticParams()` |
| الخصائص من جانب الخادم | مكوّنات خادمية غير متزامنة |
| بيانات العميل | SWR/TanStack Query + `use()` |

مثال على التوليد الساكن:

```javascript
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {

const posts = await getPosts();

return posts.map((post) => ({ slug: post.slug }));

}
```

### إمكانات المكدس الكامل

يقدّم Next.js 14 [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions) لعمليات الخلفية الآمنة:

```javascript
// app/actions.ts

'use server'

export async function createPost(formData: FormData) {

await db.post.create({

data: { title: formData.get('title') }

});

}

// app/page.tsx

import { createPost } from './actions';

export default function Page() {

return (

<form action={createPost}>

<input name="title" />

<button type="submit">Create</button>

</form>

)

}
```

## تحسين الأداء

### معالجة الصور

الاستخدام الحديث لمكوّن Image:

```javascript
import Image from 'next/image';

<Image

src="/hero.jpg"

alt="Hero Image"

width={1200}

height={800}

priority

className="rounded-lg"

/>
```

أفضل الممارسات:

- استخدم `priority` للصور الموجودة أعلى الطية
- اضبط `remotePatterns` في next.config.js
- فضّل صيغة AVIF مع تحسين `quality`

### تحسين الخطوط

نظام الخطوط المدمج:

```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {

return (

<html lang="en" className={inter.className}>

{children}

</html>

)

}
```

## الميزات المتقدمة

### Middleware والتوجيه المتقدم

Middleware جاهز لـEdge:

```javascript
// middleware.ts

export function middleware(request: NextRequest) {

if (request.nextUrl.pathname.startsWith('/dashboard')) {

return validateUserSession(request);

}

}
```

معالجات المسارات الديناميكية:

```javascript
// app/api/route.ts

export async function GET(request: Request) {

return new Response(JSON.stringify({ data: 'Hello' }), {

headers: { 'Content-Type': 'application/json' }

});

}
```

### العرض الجزئي المسبق (تجريبي)

قدّم Next.js 14 [Partial Prerendering](https://nextjs.org/blog/next-14#partial-prerendering) للصفحات الساكنة الديناميكية:

```javascript
// app/dashboard/page.tsx

import { unstable_noStore as noStore } from 'next/cache';

export default function Page() {

noStore(); // Opt-out of static rendering

return <RealTimeDashboard />;

}
```

## البداية

- أنشئ مشروعًا جديدًا:

```bash
npx create-next-app@latest
```

- اختر الإعداد الحديث:

```javascript
✔ Would you like to use TypeScript? … Yes

✔ Would you like to use App Router? … Yes

✔ Would you like to customize the default import alias? … No
```

- سير العمل أثناء التطوير:

```bash
npm run dev    # Local development

npm run build  # Production build

npm run start  # Start production server
```

يوكّد Next.js الحديث على:

- **App Router** للتوجيه القائم على الملفات
- **React Server Components** افتراضيًا
- **Edge Runtime** لأفضل أداء
- **TypeScript** بدعم من الدرجة الأولى
- **Turbopack** لتطوير أسرع (beta)
