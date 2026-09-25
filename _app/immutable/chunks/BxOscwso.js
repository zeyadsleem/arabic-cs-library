const s="patterns-dev",n="react",a="أنماط React وNext.js",l="nextjs",p="نظرة عامة على Next.js",t=[{depth:2,id:"البنية-الأساسية",text:"البنية الأساسية"},{depth:3,id:"app-router-والتوجيه-وتنظيم-الشيفرة",text:"App Router والتوجيه وتنظيم الشيفرة"},{depth:3,id:"تقسيم-الشيفرة-وتحسين-الحزمة-bundle",text:"تقسيم الشيفرة وتحسين الحزمة (bundle)"},{depth:3,id:"العرض-الهجين",text:"العرض الهجين"},{depth:2,id:"جلب-البيانات-الحديث",text:"جلب البيانات الحديث"},{depth:3,id:"أنماط-بيانات-app-router",text:"أنماط بيانات App Router"},{depth:3,id:"إمكانات-المكدس-الكامل",text:"إمكانات المكدس الكامل"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"معالجة-الصور",text:"معالجة الصور"},{depth:3,id:"تحسين-الخطوط",text:"تحسين الخطوط"},{depth:2,id:"الميزات-المتقدمة",text:"الميزات المتقدمة"},{depth:3,id:"middleware-والتوجيه-المتقدم",text:"Middleware والتوجيه المتقدم"},{depth:3,id:"العرض-الجزئي-المسبق-تجريبي",text:"العرض الجزئي المسبق (تجريبي)"},{depth:2,id:"البداية",text:"البداية"}],e=`<p>Next.js، الذي أنشأته Vercel، هو إطار عمل React (framework) كامل المكدس ومحسّن للإنتاج. مع التحديثات الحديثة، يركّز Next.js على بنية App Router ومكوّنات React الخادمية (React Server Components) وإمكانات المكدس الكامل السلسة. لنستكشف ميزات Next.js وأنماطه الحديثة.</p>
<h2 id="البنية-الأساسية">البنية الأساسية</h2>
<h3 id="app-router-والتوجيه-وتنظيم-الشيفرة">App Router والتوجيه وتنظيم الشيفرة</h3>
<p>قدّم Next.js 13+ <a href="https://nextjs.org/docs/app">App Router</a> بوصفه الأسلوب الموصى به لبناء التطبيقات، بما يجلبه من إمكانات قوية للتوجيه وتنظيم الشيفرة:</p>
<pre><code class="language-javascript">app/

layout.<span class="hljs-property">tsx</span>         # <span class="hljs-title class_">Root</span> <span class="hljs-title function_">layout</span> (applies to all routes)

page.<span class="hljs-property">tsx</span>          # <span class="hljs-title class_">Home</span> <span class="hljs-title function_">page</span> (/)

about/

page.<span class="hljs-property">tsx</span>        # <span class="hljs-title class_">About</span> <span class="hljs-title function_">page</span> (/about)

blog/

layout.<span class="hljs-property">tsx</span>      # <span class="hljs-title class_">Blog</span> layout

page.<span class="hljs-property">tsx</span>        # <span class="hljs-title class_">Blog</span> <span class="hljs-title function_">list</span> (/blog)

[slug]/

page.<span class="hljs-property">tsx</span>      # <span class="hljs-title class_">Dynamic</span> blog <span class="hljs-title function_">post</span> (<span class="hljs-regexp">/blog/</span>post-<span class="hljs-number">1</span>)

categories/

[...slug]/    # <span class="hljs-title class_">Catch</span>-all <span class="hljs-title function_">segments</span> (<span class="hljs-regexp">/blog/</span>categories/a/b/c)

page.<span class="hljs-property">tsx</span>

(marketing)/      # <span class="hljs-title class_">Route</span> groups

page.<span class="hljs-property">tsx</span>

@modal/          # <span class="hljs-title class_">Parallel</span> routes

page.<span class="hljs-property">tsx</span>

not-found.<span class="hljs-property">tsx</span>    # <span class="hljs-title class_">Custom</span> <span class="hljs-number">404</span> page

error.<span class="hljs-property">tsx</span>        # <span class="hljs-title class_">Error</span> boundary

loading.<span class="hljs-property">tsx</span>      # <span class="hljs-title class_">Loading</span> <span class="hljs-variable constant_">UI</span>
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
<pre><code class="language-javascript"><span class="hljs-comment">// Dynamic imports for components</span>

<span class="hljs-keyword">import</span> dynamic <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/dynamic&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DynamicChart</span> = <span class="hljs-title function_">dynamic</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@/components/Chart&#x27;</span>), {

<span class="hljs-attr">loading</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading chart...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>,

<span class="hljs-attr">ssr</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// Disable server-rendering</span>

})

<span class="hljs-comment">// Conditional imports</span>

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AdminPanel</span> = <span class="hljs-title function_">dynamic</span>(<span class="hljs-function">() =&gt;</span>

<span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@/components/Admin&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">mod</span> =&gt;</span> mod.<span class="hljs-property">AdminPanel</span>), {

<span class="hljs-attr">loading</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading admin panel...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>

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
<pre><code class="language-javascript"><span class="hljs-comment">// app/page.tsx</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Home</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchData</span>(); <span class="hljs-comment">// Server-side fetch</span>

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">StaticContent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ClientComponent</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>

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
<pre><code class="language-javascript"><span class="hljs-comment">// app/blog/[slug]/page.tsx</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateStaticParams</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPosts</span>();

<span class="hljs-keyword">return</span> posts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> ({ <span class="hljs-attr">slug</span>: post.<span class="hljs-property">slug</span> }));

}
</code></pre>
<h3 id="إمكانات-المكدس-الكامل">إمكانات المكدس الكامل</h3>
<p>يقدّم Next.js 14 <a href="https://nextjs.org/docs/app/api-reference/functions/server-actions">Server Actions</a> لعمليات الخلفية الآمنة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/actions.ts</span>

<span class="hljs-string">&#x27;use server&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createPost</span>(<span class="hljs-params">formData: FormData</span>) {

<span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">create</span>({

<span class="hljs-attr">data</span>: { <span class="hljs-attr">title</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;title&#x27;</span>) }

});

}

<span class="hljs-comment">// app/page.tsx</span>

<span class="hljs-keyword">import</span> { createPost } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Page</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{createPost}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;title&quot;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Create<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>

)

}
</code></pre>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<h3 id="معالجة-الصور">معالجة الصور</h3>
<p>الاستخدام الحديث لمكوّن Image:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">Image</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/image&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Image</span>

<span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/hero.jpg&quot;</span>

<span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Hero Image&quot;</span>

<span class="hljs-attr">width</span>=<span class="hljs-string">{1200}</span>

<span class="hljs-attr">height</span>=<span class="hljs-string">{800}</span>

<span class="hljs-attr">priority</span>

<span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg&quot;</span>

/&gt;</span></span>
</code></pre>
<p>أفضل الممارسات:</p>
<ul>
<li>استخدم <code>priority</code> للصور الموجودة أعلى الطية</li>
<li>اضبط <code>remotePatterns</code> في next.config.js</li>
<li>فضّل صيغة AVIF مع تحسين <code>quality</code></li>
</ul>
<h3 id="تحسين-الخطوط">تحسين الخطوط</h3>
<p>نظام الخطوط المدمج:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Inter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/font/google&#x27;</span>;

<span class="hljs-keyword">const</span> inter = <span class="hljs-title class_">Inter</span>({ <span class="hljs-attr">subsets</span>: [<span class="hljs-string">&#x27;latin&#x27;</span>] });

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Layout</span>(<span class="hljs-params">{ children }</span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{inter.className}</span>&gt;</span>

{children}

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span>

)

}
</code></pre>
<h2 id="الميزات-المتقدمة">الميزات المتقدمة</h2>
<h3 id="middleware-والتوجيه-المتقدم">Middleware والتوجيه المتقدم</h3>
<p>Middleware جاهز لـEdge:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// middleware.ts</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">middleware</span>(<span class="hljs-params">request: NextRequest</span>) {

<span class="hljs-keyword">if</span> (request.<span class="hljs-property">nextUrl</span>.<span class="hljs-property">pathname</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>)) {

<span class="hljs-keyword">return</span> <span class="hljs-title function_">validateUserSession</span>(request);

}

}
</code></pre>
<p>معالجات المسارات الديناميكية:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/api/route.ts</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">GET</span>(<span class="hljs-params">request: Request</span>) {

<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;Hello&#x27;</span> }), {

<span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> }

});

}
</code></pre>
<h3 id="العرض-الجزئي-المسبق-تجريبي">العرض الجزئي المسبق (تجريبي)</h3>
<p>قدّم Next.js 14 <a href="https://nextjs.org/blog/next-14#partial-prerendering">Partial Prerendering</a> للصفحات الساكنة الديناميكية:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/dashboard/page.tsx</span>

<span class="hljs-keyword">import</span> { unstable_noStore <span class="hljs-keyword">as</span> noStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/cache&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Page</span>(<span class="hljs-params"></span>) {

<span class="hljs-title function_">noStore</span>(); <span class="hljs-comment">// Opt-out of static rendering</span>

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RealTimeDashboard</span> /&gt;</span></span>;

}
</code></pre>
<h2 id="البداية">البداية</h2>
<ul>
<li>أنشئ مشروعًا جديدًا:</li>
</ul>
<pre><code class="language-bash">npx create-next-app@latest
</code></pre>
<ul>
<li>اختر الإعداد الحديث:</li>
</ul>
<pre><code class="language-javascript">✔ <span class="hljs-title class_">Would</span> you like to use <span class="hljs-title class_">TypeScript</span>? … <span class="hljs-title class_">Yes</span>

✔ <span class="hljs-title class_">Would</span> you like to use <span class="hljs-title class_">App</span> <span class="hljs-title class_">Router</span>? … <span class="hljs-title class_">Yes</span>

✔ <span class="hljs-title class_">Would</span> you like to customize the <span class="hljs-keyword">default</span> <span class="hljs-keyword">import</span> alias? … <span class="hljs-title class_">No</span>
</code></pre>
<ul>
<li>سير العمل أثناء التطوير:</li>
</ul>
<pre><code class="language-bash">npm run dev    <span class="hljs-comment"># Local development</span>

npm run build  <span class="hljs-comment"># Production build</span>

npm run start  <span class="hljs-comment"># Start production server</span>
</code></pre>
<p>يوكّد Next.js الحديث على:</p>
<ul>
<li><strong>App Router</strong> للتوجيه القائم على الملفات</li>
<li><strong>React Server Components</strong> افتراضيًا</li>
<li><strong>Edge Runtime</strong> لأفضل أداء</li>
<li><strong>TypeScript</strong> بدعم من الدرجة الأولى</li>
<li><strong>Turbopack</strong> لتطوير أسرع (beta)</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
