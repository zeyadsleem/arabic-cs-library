const t="patterns-dev",n="react",e="أنماط React وNext.js",o="nextjs",r="نظرة عامة على Next.js",i=[{depth:2,id:"البنية-الأساسية",text:"البنية الأساسية"},{depth:3,id:"app-router-والتوجيه-وتنظيم-الشيفرة",text:"App Router والتوجيه وتنظيم الشيفرة"},{depth:3,id:"تقسيم-الشيفرة-وتحسين-الحزمة-bundle",text:"تقسيم الشيفرة وتحسين الحزمة (bundle)"},{depth:3,id:"العرض-الهجين",text:"العرض الهجين"},{depth:2,id:"جلب-البيانات-الحديث",text:"جلب البيانات الحديث"},{depth:3,id:"أنماط-بيانات-app-router",text:"أنماط بيانات App Router"},{depth:3,id:"إمكانات-المكدس-الكامل",text:"إمكانات المكدس الكامل"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"معالجة-الصور",text:"معالجة الصور"},{depth:3,id:"تحسين-الخطوط",text:"تحسين الخطوط"},{depth:2,id:"الميزات-المتقدمة",text:"الميزات المتقدمة"},{depth:3,id:"middleware-والتوجيه-المتقدم",text:"Middleware والتوجيه المتقدم"},{depth:3,id:"العرض-الجزئي-المسبق-تجريبي",text:"العرض الجزئي المسبق (تجريبي)"},{depth:2,id:"البداية",text:"البداية"}],a=`<p>Next.js، الذي أنشأته Vercel، هو إطار عمل React (framework) كامل المكدس ومحسّن للإنتاج. مع التحديثات الحديثة، يركّز Next.js على بنية App Router ومكوّنات React الخادمية (React Server Components) وإمكانات المكدس الكامل السلسة. لنستكشف ميزات Next.js وأنماطه الحديثة.</p>
<h2 id="البنية-الأساسية">البنية الأساسية</h2>
<h3 id="app-router-والتوجيه-وتنظيم-الشيفرة">App Router والتوجيه وتنظيم الشيفرة</h3>
<p>قدّم Next.js 13+ <a href="https://nextjs.org/docs/app">App Router</a> بوصفه الأسلوب الموصى به لبناء التطبيقات، بما يجلبه من إمكانات قوية للتوجيه وتنظيم الشيفرة:</p>
<pre><code>app/
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
</code></pre>
<p>ميزات التوجيه (routing) الأساسية:</p>
<ul>
<li><strong>التوجيه القائم على الملفات</strong>: تعكس روابط URL بنية ملفاتك</li>
<li><strong>الشرائح الديناميكية</strong>: <code>[param]</code> للمسارات (routes) الديناميكية</li>
<li><strong>مسارات Catch-all</strong>: <code>[...slug]</code> للمسارات المرنة</li>
<li><strong>مجموعات المسارات</strong>: <code>(group)</code> للتنظيم المنطقي</li>
<li><strong>المسارات المتوازية</strong>: <code>@name</code> للعروض المتزامنة</li>
<li><strong>مسارات الاعتراض</strong>: <code>(..)photo</code> لواجهات تشبه النوافذ المنبثقة</li>
</ul>
<p>الميزات الأساسية:</p>
<ul>
<li><strong>مكوّنات خادمية افتراضيًا</strong> (من دون أي JavaScript للعميل)</li>
<li><strong>تخطيطات متداخلة</strong> مع العرض الجزئي</li>
<li><strong>البث (streaming)</strong> لتحميل المحتوى تدريجيًا</li>
<li><strong>جلب البيانات (data fetching)</strong> المبسّط باستخدام async/await</li>
<li><strong>معالجة أخطاء مدمجة</strong> مع error.tsx</li>
<li><strong>حالات تحميل</strong> مع loading.tsx</li>
<li><strong>صفحات 404</strong> مع not-found.tsx</li>
</ul>
<h3 id="تقسيم-الشيفرة-وتحسين-الحزمة-bundle">تقسيم الشيفرة وتحسين الحزمة (bundle)</h3>
<p>ينفّذ Next.js تلقائيًا عدة استراتيجيات لتقسيم الشيفرة:</p>
<ul>
<li><strong>التقسيم القائم على المسارات</strong>: يُقسّم كل مسار تلقائيًا</li>
<li>يُحمَّل فقط الشيفرة اللازمة للمسار الحالي</li>
<li>الجلب المسبق (prefetching) للمسارات المرجّحة بحسب مجال الرؤية</li>
<li>التحسين الساكن التلقائي كلما أمكن</li>
<li><strong>التقسيم على مستوى المكوّنات</strong>:</li>
</ul>
<pre><code>// Dynamic imports for components
import dynamic from 'next/dynamic'

const DynamicChart = dynamic(() =&gt; import('@/components/Chart'), {
  loading: () =&gt; &lt;p&gt;Loading chart...&lt;/p&gt;,
  ssr: false // Disable server-rendering
})

// Conditional imports
const AdminPanel = dynamic(() =&gt; 
  import('@/components/Admin').then(mod =&gt; mod.AdminPanel), {
  loading: () =&gt; &lt;p&gt;Loading admin panel...&lt;/p&gt;
})
</code></pre>
<ul>
<li><strong>التقسيم على مستوى المكتبات</strong>: تُقسَّم وحدات الطرف الثالث تلقائيًا</li>
<li>أجزاء مشتركة للشيفرة المستخدمة كثيرًا</li>
<li>دعم module federation للواجهات الأمامية المصغّرة</li>
<li><strong>تحسين الصور</strong>: التحميل الكسول التلقائي للصور</li>
<li>استراتيجيات تحميل قائمة على مجال الرؤية</li>
<li>تحسين الصيغة (WebP/AVIF)</li>
</ul>
<h3 id="العرض-الهجين">العرض الهجين</h3>
<p>يدعم Next.js استراتيجيات عرض متعددة في تطبيق واحد:</p>
<ul>
<li><strong>توليد المواقع الساكنة (SSG)</strong>: العرض المسبق وقت البناء</li>
<li><strong>إعادة التوليد الساكن التزايدي (ISR)</strong>: تحديث المحتوى الساكن بعد البناء</li>
<li><strong>العرض من جانب الخادم (SSR)</strong>: العرض عند كل طلب</li>
<li><strong>العرض من جانب العميل (CSR)</strong>: الترطيب (hydration) التقليدي لـReact</li>
</ul>
<p>النمط الحديث:</p>
<pre><code>// app/page.tsx
export default async function Home() {
  const data = await fetchData(); // Server-side fetch
  
  return (
    &lt;main&gt;
      &lt;StaticContent data={data} /&gt;
      &lt;ClientComponent /&gt;
    &lt;/main&gt;
  )
}
</code></pre>
<h2 id="جلب-البيانات-الحديث">جلب البيانات الحديث</h2>
<h3 id="أنماط-بيانات-app-router">أنماط بيانات App Router</h3>
<table>
<thead>
<tr>
<th>الميزة</th>
<th>أسلوب App Router</th>
</tr>
</thead>
<tbody>
<tr>
<td>الخصائص الساكنة</td>
<td><code>generateStaticParams()</code></td>
</tr>
<tr>
<td>الخصائص من جانب الخادم</td>
<td>مكوّنات خادمية غير متزامنة</td>
</tr>
<tr>
<td>بيانات العميل</td>
<td>SWR/TanStack Query + <code>use()</code></td>
</tr>
</tbody>
</table>
<p>مثال على التوليد الساكن:</p>
<pre><code>// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) =&gt; ({ slug: post.slug }));
}
</code></pre>
<h3 id="إمكانات-المكدس-الكامل">إمكانات المكدس الكامل</h3>
<p>يقدّم Next.js 14 <a href="https://nextjs.org/docs/app/api-reference/functions/server-actions">Server Actions</a> لعمليات الخلفية الآمنة:</p>
<pre><code>// app/actions.ts
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
    &lt;form action={createPost}&gt;
      &lt;input name=&quot;title&quot; /&gt;
      &lt;button type=&quot;submit&quot;&gt;Create&lt;/button&gt;
    &lt;/form&gt;
  )
}
</code></pre>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<h3 id="معالجة-الصور">معالجة الصور</h3>
<p>الاستخدام الحديث لمكوّن Image:</p>
<pre><code>import Image from 'next/image';

&lt;Image
  src=&quot;/hero.jpg&quot;
  alt=&quot;Hero Image&quot;
  width={1200}
  height={800}
  priority
  className=&quot;rounded-lg&quot;
/&gt;
</code></pre>
<p>أفضل الممارسات:</p>
<ul>
<li>استخدم <code>priority</code> للصور الموجودة أعلى الطية</li>
<li>اضبط <code>remotePatterns</code> في next.config.js</li>
<li>فضّل صيغة AVIF مع تحسين <code>quality</code></li>
</ul>
<h3 id="تحسين-الخطوط">تحسين الخطوط</h3>
<p>نظام الخطوط المدمج:</p>
<pre><code>import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    &lt;html lang=&quot;en&quot; className={inter.className}&gt;
      {children}
    &lt;/html&gt;
  )
}
</code></pre>
<h2 id="الميزات-المتقدمة">الميزات المتقدمة</h2>
<h3 id="middleware-والتوجيه-المتقدم">Middleware والتوجيه المتقدم</h3>
<p>Middleware جاهز لـEdge:</p>
<pre><code>// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return validateUserSession(request);
  }
}
</code></pre>
<p>معالجات المسارات الديناميكية:</p>
<pre><code>// app/api/route.ts
export async function GET(request: Request) {
  return new Response(JSON.stringify({ data: 'Hello' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
</code></pre>
<h3 id="العرض-الجزئي-المسبق-تجريبي">العرض الجزئي المسبق (تجريبي)</h3>
<p>قدّم Next.js 14 <a href="https://nextjs.org/blog/next-14#partial-prerendering">Partial Prerendering</a> للصفحات الساكنة الديناميكية:</p>
<pre><code>// app/dashboard/page.tsx
import { unstable_noStore as noStore } from 'next/cache';

export default function Page() {
  noStore(); // Opt-out of static rendering
  return &lt;RealTimeDashboard /&gt;;
}
</code></pre>
<h2 id="البداية">البداية</h2>
<ul>
<li>أنشئ مشروعًا جديدًا:</li>
</ul>
<pre><code>npx create-next-app@latest
</code></pre>
<ul>
<li>اختر الإعداد الحديث:</li>
</ul>
<pre><code>✔ Would you like to use TypeScript? … Yes
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
</code></pre>
<ul>
<li>سير العمل أثناء التطوير:</li>
</ul>
<pre><code>npm run dev    # Local development
npm run build  # Production build
npm run start  # Start production server
</code></pre>
<p>يوكّد Next.js الحديث على:</p>
<ul>
<li><strong>App Router</strong> للتوجيه القائم على الملفات</li>
<li><strong>React Server Components</strong> افتراضيًا</li>
<li><strong>Edge Runtime</strong> لأفضل أداء</li>
<li><strong>TypeScript</strong> بدعم من الدرجة الأولى</li>
<li><strong>Turbopack</strong> لتطوير أسرع (beta)</li>
</ul>
`,l={book:t,chapter:n,chapterTitle:e,slug:o,title:r,headings:i,html:a};export{t as book,n as chapter,e as chapterTitle,l as default,i as headings,a as html,o as slug,r as title};
