const t="patterns-dev",n="react",e="أنماط React وNext.js",o="static-rendering",r="العرض الساكن",d=[{depth:2,id:"أين-يتقدم-العرض-الساكن",text:"أين يتقدم العرض الساكن"},{depth:2,id:"الصفحات-الساكنة-في-app-router",text:"الصفحات الساكنة في App Router"},{depth:2,id:"العرض-الساكن-مع-البيانات",text:"العرض الساكن مع البيانات"},{depth:2,id:"المسارات-الديناميكية-باستخدام-generatestaticparams",text:"المسارات الديناميكية باستخدام generateStaticParams"},{depth:2,id:"العرض-الساكن-مع-جلب-في-جانب-العميل",text:"العرض الساكن مع جلب في جانب العميل"},{depth:2,id:"العرض-الجزئي-المسبق-هيكل-ساكن-فتحات-ديناميكية-مبثوثة",text:"العرض الجزئي المسبق: هيكل ساكن + فتحات ديناميكية مبثوثة"},{depth:2,id:"ملف-الأداء",text:"ملف الأداء"},{depth:2,id:"اعتبارات-وقت-البناء",text:"اعتبارات وقت البناء"},{depth:2,id:"متى-لا-يكفي-العرض-الساكن",text:"متى لا يكفي العرض الساكن"}],a=`<p>يُنتج العرض الساكن (static rendering) — الذي يُسمى أيضًا توليد المواقع الساكنة (static site generation، SSG) — ملف HTML لكل مسار (route) وقت البناء. يقابل كل عنوان URL ملفًا على القرص يمكن لـ CDN تقديمه من ذاكرة المؤقتة (cache) خلال أجزاء من الثانية، بغض النظر عن موقع المستخدم أو عدد الطلبات الأخرى الجاري تنفيذها في الوقت نفسه. لا يؤدي الخادم أي عمل لكل طلب، لذا لا يتجاوز TTFB سوى زمن استجابة الشبكة.</p>
<p>هذه هي استراتيجية العرض ذات ملف الأداء (performance profile) الأبسط وتكلفة التشغيل الأدنى. لكنها أيضًا الاستراتيجية الأكثر تقييدًا: كل زائر يرى HTML نفسه. إذا كان مستخدمان مختلفان سيريان محتوى مختلفًا، فلن يكفي العرض الساكن وحده، لكنه ينسجم جيدًا مع عمليات الجلب في جانب العميل وISR والعرض الجزئي المسبق (partial prerendering) للتعامل مع البيانات الديناميكية من دون التخلي عن الذاكرة المؤقتة.</p>
<h2 id="أين-يتقدم-العرض-الساكن">أين يتقدم العرض الساكن</h2>
<p>العرض الساكن هو الخيار الصحيح عندما:</p>
<ul>
<li>يُحدَّث المحتوى وفق جدول نشر، لا وفق وتيرة الطلبات، مثل صفحات التسويق والتوثيق ومنشورات المدونات وسجلات التغييرات وصفحات الوصول والصفحات القانونية.</li>
<li>يكون HTML نفسه صحيحًا لكل زائر، أو يمكن جعله كذلك بتأجيل الأجزاء الخاصة بكل مستخدم إلى مكوّن في جانب العميل.</li>
<li>تريد تكلفة تشغيل ثابتة — فاتورة CDN بدل فاتورة دالة عديمة الخوادم.</li>
<li>تحتاج إلى مرونة: يظل الموقع المعروض مسبقًا بالكامل في الخدمة حتى لو تعطل الأصل أو قاعدة البيانات.</li>
</ul>
<p>لا يناسبه عندما:</p>
<ul>
<li>يتغير المحتوى مع كل طلب، مثل نتائج البحث ولوحات المعلومات وكل ما يتطلب مصادقة.</li>
<li>تكبر أوقات البناء بما يكفي لإبطاء دورة النشر، وستتعلم المزيد عن ذلك أدناه.</li>
<li>تحتاج إلى مراعاة موقع المستخدم الجغرافي أو ملفات تعريف الارتباط أو مجموعة اختبار A/B داخل HTML.</li>
</ul>
<h2 id="الصفحات-الساكنة-في-app-router">الصفحات الساكنة في App Router</h2>
<p>في App Router الخاص بـ Next.js، يُعرض أي مكوّن خادمي (server component) لا يملك مصادر بيانات ديناميكية تلقائيًا بصورة ساكنة. لا حاجة إلى استدعاء <code>getStaticProps</code>؛ فالمكوّن نفسه يعمل وقت البناء.</p>
<pre><code>// app/pricing/page.tsx
export default function Pricing() {
  return (
    &lt;main&gt;
      &lt;h1&gt;Pricing&lt;/h1&gt;
      &lt;p&gt;Three tiers, no surprises.&lt;/p&gt;
    &lt;/main&gt;
  );
}
</code></pre>
<p>نفّذ <code>next build</code>، فيُصدر Next ملف HTML ساكنًا للمسار <code>/pricing</code>. لا يُشرك أي خادم وقت التشغيل عند وصول الطلب.</p>
<p>هناك أمور تجعل المسار <em>يخرج</em> من العرض الساكن ويدخل العرض الديناميكي:</p>
<ul>
<li>قراءة <code>cookies()</code> أو <code>headers()</code> أو <code>draftMode()</code>.</li>
<li>استخدام <code>searchParams</code> في مكوّن خادمي؛ وهي غير متزامنة في Next.js 15.</li>
<li>استدعاء <code>fetch()</code> مع <code>cache: &quot;no-store&quot;</code> أو <code>next: { revalidate: 0 }</code>.</li>
<li>تصدير <code>dynamic = &quot;force-dynamic&quot;</code> من ملف المسار.</li>
</ul>
<p>إذا لم يحدث أي من ذلك، فالمسار ساكن.</p>
<h2 id="العرض-الساكن-مع-البيانات">العرض الساكن مع البيانات</h2>
<p>تسحب معظم المواقع الحقيقية المحتوى من CMS أو قاعدة بيانات أو نظام ملفات. في App Router يكون ذلك مكوّنًا خادميًا غير متزامن عاديًا؛ إذ ينفذه Next وقت البناء ويخزّن نتيجته مؤقتًا.</p>
<pre><code>// app/blog/page.tsx
import Link from &quot;next/link&quot;;\\n
export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    &lt;ul&gt;
      {posts.map((post) =&gt; (
        &lt;li key={post.slug}&gt;
          &lt;Link href={\`/blog/\${post.slug}\`}&gt;{post.title}&lt;/Link&gt;
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>
<p>سيكتشف Next.js أن هذا المكوّن لا يملك مدخلات مرتبطة بالطلب، ومن ثم سيعرض <code>/blog</code> مسبقًا وقت البناء. يُنفَّذ جلب البيانات مرة واحدة على خادم البناء، ثم يُرسل HTML المعروض إلى CDN.</p>
<h2 id="المسارات-الديناميكية-باستخدام-generatestaticparams">المسارات الديناميكية باستخدام <code>generateStaticParams</code></h2>
<p>البديل في App Router لـ <code>getStaticPaths</code> هو <code>generateStaticParams</code>. صدّره من ملف مسار ذي مقطع ديناميكي، فيعرض Next ملف HTML واحدًا لكل مجموعة معاملات يُعيدها.</p>
<pre><code>// app/blog/[slug]/page.tsx
import { notFound } from &quot;next/navigation&quot;;\\n
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) =&gt; ({ slug: post.slug }));
}\\n
// Reject params not returned above. Default in Next 15 is true.
export const dynamicParams = false;\\n
export default async function Post({ params }) {
  const { slug } = await params; // params is async in Next 15
  const post = await getPost(slug);
  if (!post) notFound();\\n
  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;div dangerouslySetInnerHTML={{ __html: post.html }} /&gt;
    &lt;/article&gt;
  );
}
</code></pre>
<p>اضبط <code>dynamicParams = true</code> أو احذفه لعرض المعرّفات غير المعروفة عند الطلب ثم خزّن النتيجة مؤقتًا. هذا هو مجال ISR، وسنغطيه في النمط التالي.</p>
<h2 id="العرض-الساكن-مع-جلب-في-جانب-العميل">العرض الساكن مع جلب في جانب العميل</h2>
<p>عندما يكون معظم الصفحة ساكنًا لكن جزءًا واحدًا يعتمد فعليًا على كل طلب — مثل عدّاد «المشاهدون الآن» أو شريط توصيات مخصص أو ترحيب لمن سجّل الدخول — يمكنك إبقاء الصفحة ساكنة وطلب من مكوّن في جانب العميل (client component) أن يملأ الجزء الديناميكي بعد الترطيب (hydration).</p>
<pre><code>// app/products/[id]/page.tsx
import RecommendationsClient from &quot;./RecommendationsClient&quot;;\\n
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) =&gt; ({ id: p.id }));
}\\n
export default async function Product({ params }) {
  const { id } = await params;
  const product = await getProduct(id);\\n
  return (
    &lt;&gt;
      &lt;ProductDetails product={product} /&gt;
      {/* hydrated separately, fetches at runtime */}
      &lt;RecommendationsClient productId={product.id} /&gt;
    &lt;/&gt;
  );
}
</code></pre>
<p>لا يزال HTML يصل معروضًا مسبقًا. ترطب أداة التوصيات وتنفّذ عملية جلب خاصة بها، عادةً عبر TanStack Query أو SWR من أجل التخزين المؤقت وإعادة التحقق (revalidation). يمنحك هذا النمط TTFB الخاص بالعرض الساكن للمحتوى الرئيسي وحداثة البيانات لكل مستخدم في المكان الذي يهم.</p>
<h2 id="العرض-الجزئي-المسبق-هيكل-ساكن-فتحات-ديناميكية-مبثوثة">العرض الجزئي المسبق: هيكل ساكن + فتحات ديناميكية مبثوثة</h2>
<p>العرض الجزئي المسبق (Partial Prerendering، PPR) هو ميزة تجريبية في Next.js تمزج المحتوىين الساكن والديناميكي في عملية عرض <em>واحدة</em>. تُرسَل الأجزاء الساكنة من الصفحة هيكلًا معروضًا مسبقًا. أما الأجزاء الديناميكية — المغلّفة بـ \`\` — فتُبث من بيئة تشغيل الخادم ضمن الاستجابة نفسها.</p>
<pre><code>// app/page.tsx
import { Suspense } from &quot;react&quot;;
import { cookies } from &quot;next/headers&quot;;\\n
export const experimental_ppr = true;\\n
async function GreetingForUser() {
  const cookieStore = await cookies(); // dynamic
  const session = cookieStore.get(&quot;session&quot;);
  const name = session ? await lookupName(session.value) : &quot;there&quot;;
  return &lt;p&gt;Hello, {name}&lt;/p&gt;;
}\\n
export default function Home() {
  return (
    &lt;main&gt;
      &lt;h1&gt;Welcome to the store&lt;/h1&gt; {/* static */}
      &lt;Hero /&gt; {/* static */}\\n
      &lt;Suspense fallback={&lt;p&gt;Hello...&lt;/p&gt;}&gt;
        &lt;GreetingForUser /&gt; {/* dynamic, streamed */}
      &lt;/Suspense&gt;\\n
      &lt;FeaturedProducts /&gt; {/* static, data fetched at build */}
    &lt;/main&gt;
  );
}
</code></pre>
<p>يحصل المستخدم على الهيكل الساكن بسرعة CDN. تُبث الفتحة الديناميكية كإضافة مجزأة إلى الاستجابة نفسها، بينما يسدّ البديل الاحتياطي (fallback) الفجوة المؤقتة. فتحصل على TTFB الخاص بالعرض الساكن في الأجزاء الساكنة، وحداثة SSR في بقية الأجزاء، من دون تقسيم الصفحة إلى مسارات منفصلة.</p>
<p>فعّل PPR في <code>next.config.js</code> باستخدام <code>experimental.ppr = &quot;incremental&quot;</code> لتفعيله على مستوى كل مسار.</p>
<h2 id="ملف-الأداء">ملف الأداء</h2>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>SSG خالص</th>
<th>SSG مع جلب في العميل</th>
<th>SSR</th>
<th>PPR</th>
</tr>
</thead>
<tbody>
<tr>
<td>TTFB</td>
<td>ممتاز (ذاكرة CDN المؤقتة)</td>
<td>ممتاز</td>
<td>بطيء (لكل طلب)</td>
<td>ممتاز (يُبث الهيكل الساكن أولًا)</td>
</tr>
<tr>
<td>LCP</td>
<td>ممتاز</td>
<td>جيد</td>
<td>متغير</td>
<td>ممتاز</td>
</tr>
<tr>
<td>التخصيص داخل HTML</td>
<td>لا</td>
<td>بعد الترطيب</td>
<td>نعم</td>
<td>نعم (داخل الفتحات الديناميكية)</td>
</tr>
<tr>
<td>تكلفة الخادم لكل طلب</td>
<td>$0</td>
<td>منخفضة</td>
<td>لكل عملية عرض</td>
<td>لكل مقطع ديناميكي</td>
</tr>
<tr>
<td>إبطال الذاكرة المؤقتة</td>
<td>إعادة البناء وإعادة النشر</td>
<td>لا ينطبق على الجزء الديناميكي</td>
<td>لا ينطبق</td>
<td>إعادة التحقق لكل مقطع</td>
</tr>
</tbody>
</table>
<h2 id="اعتبارات-وقت-البناء">اعتبارات وقت البناء</h2>
<p>للعرض الساكن تكلفة تشغيلية واحدة تتناسب مع حجم المحتوى: زمن البناء. إذا كان موقع التجارة الإلكترونية لديك يملك 200,000 منتج واستغرق عرض كل صفحة تفصيلية 50 مللي ثانية، فإن البناء الكامل يستغرق نحو 3 ساعات من العرض أحادي الخيط. وتساعدك الاستراتيجيات التالية:</p>
<ul>
<li><strong>اعرض الصفحات N الأولى مسبقًا فقط</strong> باستخدام <code>generateStaticParams</code>، واعرض الباقي ديناميكيًا عند أول طلب مع التخزين المؤقت عبر ISR. هذا ما تفعله معظم المواقع الكبيرة.</li>
<li><strong>وازِن البناء بالتوازي</strong> عبر عدة عمّال؛ فمعظم أطر العمل الحديثة تفعل ذلك تلقائيًا، لكنه يتوسع مع عدد أنوية المعالج.</li>
<li><strong>خزّن عمليات الجلب مؤقتًا بين عمليات البناء</strong> باستخدام ذاكرة المؤقتة التدريجية (incremental cache)؛ إذ يحفظ Next.js نتائج الجلب السابقة ويعيد استخدامها عند عدم تغيرها.</li>
<li><strong>استخدم إعادة التحقق عند الطلب (on-demand revalidation)</strong> بدلًا من إعادة بناء الموقع بأكمله عند تغير صفحة واحدة.</li>
</ul>
<h2 id="متى-لا-يكفي-العرض-الساكن">متى لا يكفي العرض الساكن</h2>
<p>القيد الأساسي للعرض الساكن — HTML نفسه لكل زائر، لا يتغير إلا وقت البناء — هو ما يجعله رخيصًا وسريعًا. وعندما يسبب هذا القيد مشكلة، يخفّف النمط التالي، <strong>التوليد الساكن التزايدي (Incremental Static Regeneration، ISR)</strong>، جانب «لا يُحدَّث إلا وقت البناء». وبعد ذلك، يعالج <strong>البث مع SSR</strong> و<strong>مكوّنات React الخادمية</strong> جانب «HTML نفسه للجميع».</p>
<p><img src="/images/patterns-dev/react-static-rendering-10-Screen_Shot_2021_04_03_at_5.52.41_PM.webp" alt="Static Rendering"></p>
`,i={book:t,chapter:n,chapterTitle:e,slug:o,title:r,headings:d,html:a};export{t as book,n as chapter,e as chapterTitle,i as default,d as headings,a as html,o as slug,r as title};
