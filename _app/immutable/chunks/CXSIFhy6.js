const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="error-boundaries-and-federation",e="حدود الأخطاء واتحاد الوحدات",l=[{depth:2,id:"لماذا-لا-يعمل-حد-الأخطاء",text:"لماذا لا يعمل حدّ الأخطاء"},{depth:2,id:"الخط-الزمني",text:"الخط الزمني"},{depth:2,id:"ما-ينجح-فعلا",text:"ما ينجح فعلًا"},{depth:3,id:"التقاط-فشل-الإقلاع",text:"التقاط فشل الإقلاع"},{depth:3,id:"اجعل-الوحدة-البعيدة-اختيارية",text:"اجعل الوحدة البعيدة اختيارية"},{depth:3,id:"التسجيل-الديناميكي-للوحدات-البعيدة",text:"التسجيل الديناميكي للوحدات البعيدة"},{depth:2,id:"الدرس",text:"الدرس"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"مشكلة-الإقلاع",text:"مشكلة الإقلاع"},{depth:3,id:"التقاط-أعطال-الإقلاع",text:"التقاط أعطال الإقلاع"},{depth:3,id:"نمط-remoteboundary",text:"نمط RemoteBoundary"},{depth:3,id:"جعل-الوحدات-البعيدة-اختيارية",text:"جعل الوحدات البعيدة اختيارية"}],c=`<p>إن أوقفت خادم تطوير الوحدة البعيدة في <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">تمرين التركيب وقت التشغيل</a> وأعدت تحميل المضيف، فسترى صفحة بيضاء فارغة. لا واجهة <code>&lt;Suspense&gt;</code> الاحتياطية، ولا واجهة حدّ الأخطاء الاحتياطية. لا شيء فحسب. وتخبرك الطرفية بما حدث: <code>ERR_CONNECTION_REFUSED</code> على <code>mf-manifest.json</code>، يتبعها خطأ <code>Federation Runtime</code>. فحدّ الأخطاء لم تسنح له أي فرصة.</p>
<p>وهذا ليس عيبًا في إعداد حدّ الأخطاء لديك، بل مشكلة توقيت جوهرية في كيفية تفاعل اتحاد الوحدات مع React.</p>
<h2 id="لماذا-لا-يعمل-حد-الأخطاء">لماذا لا يعمل حدّ الأخطاء</h2>
<p>تلتقط حدود أخطاء React الأخطاء التي تحدث <em>أثناء التصيير</em>. فهي تلفّ شجرة مكوّنات وتعترض الاستثناءات التي ترميها <code>render()</code>، أو توابع دورة الحياة، أو بواني المكوّنات التابعة. هذا هو العقد—فحدود الأخطاء تلتقط أخطاء وقت التصيير من المكوّنات الواقعة تحتها في الشجرة.</p>
<p>أما جلب بيان اتحاد الوحدات فلا يحدث أثناء التصيير، بل <em>قبل</em> التصيير. فعندما يبدأ تطبيق المضيف، يجلب وقت تشغيل الاتحاد <code>mf-manifest.json</code> من كل وحدة بعيدة مُهيّأة ضمن تفاوض الوحدات المشتركة. وهذا التفاوض هو ما يوجد الحدّ غير المتزامن في <code>index.tsx</code> لدعمه—فنمط <code>import(&quot;./bootstrap&quot;)</code> يؤجّل شيفرة التطبيق حتى يتصل وقت تشغيل الاتحاد بكل الوحدات البعيدة ويحلّ الاعتمادات المشتركة.</p>
<p>وعندما تكون وحدة بعيدة غير قابلة للوصول تمامًا، يفشل جلب البيان. فيرمي وقت تشغيل الاتحاد خطأً قبل أن يُنادى <code>createRoot</code> أصلًا. ولم يُثبَّت React بعد. فمكوّن حدّ الأخطاء موجود في شيفرتك المصدرية، لكنه لم يُنشأ قط في DOM. ولا تستطيع التقاط أخطاء في شجرة مكوّنات غير موجودة بعد.</p>
<h2 id="الخط-الزمني">الخط الزمني</h2>
<p>وهذا ما يحدث عندما تكون الوحدة البعيدة متوقفة:</p>
<ol>
<li>يحمّل المتصفح HTML المضيف وJavaScript.</li>
<li>يشغّل <code>index.tsx</code> الأمر <code>import(&quot;./bootstrap&quot;)</code>.</li>
<li>يعترض وقت تشغيل الاتحاد ذلك ويبدأ تفاوض الوحدات المشتركة.</li>
<li>يجلب وقت تشغيل الاتحاد <code>mf-manifest.json</code> من <code>localhost:3001</code>.</li>
<li>يفشل الجلب بالخطأ <code>ERR_CONNECTION_REFUSED</code>.</li>
<li>يرمي وقت تشغيل الاتحاد خطأً.</li>
<li>يُرفض <code>import(&quot;./bootstrap&quot;)</code> الديناميكي.</li>
<li>لا شيء آخر يحدث—فـ<code>bootstrap.tsx</code> لا يعمل قط، و<code>createRoot</code> لا يُنفَّذ قط، وReact لا يُثبَّت قط.</li>
</ol>
<p>فـ<code>&lt;ErrorBoundary&gt;</code> لديك يعيش داخل <code>&lt;App&gt;</code>، الذي يعيش داخل <code>bootstrap.tsx</code>. والخطوة 8 لا تحدث قط، فلا يوجد حدّ الأخطاء قط.</p>
<h2 id="ما-ينجح-فعلا">ما ينجح فعلًا</h2>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>أين تعمل</th>
<th>تلتقط انهيار الإقلاع</th>
<th>تلتقط أخطاء التصيير</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td>التقاط فشل الإقلاع</td>
<td><code>index.tsx</code> (JS عادي)</td>
<td>نعم</td>
<td>لا</td>
<td>منخفضة</td>
</tr>
<tr>
<td>جعل الوحدة البعيدة اختيارية</td>
<td><code>React.lazy</code> <code>.catch()</code></td>
<td>فقط إن لم تكن في <code>remotes</code> الثابتة</td>
<td>نعم</td>
<td>متوسطة</td>
</tr>
<tr>
<td>التسجيل الديناميكي للوحدات البعيدة</td>
<td>واجهة وقت التشغيل (<code>registerRemotes</code>)</td>
<td>نعم</td>
<td>نعم</td>
<td>أعلى</td>
</tr>
</tbody>
</table>
<p>وهناك عدة استراتيجيات للتعامل مع هذا، وهي تعمل على مستويات مختلفة.</p>
<h3 id="التقاط-فشل-الإقلاع">التقاط فشل الإقلاع</h3>
<p>أكثر إصلاح مباشر هو لفّ الاستيراد الديناميكي في <code>index.tsx</code> نفسه بمعالج <code>try/catch</code> أو <code>.catch()</code>. وهذا معالجة أخطاء JavaScript عادية، لا React—فهي تحدث قبل وجود React.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// index.tsx</span>
<span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./bootstrap&#x27;</span>).<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Application failed to start:&#x27;</span>, error);
  <span class="hljs-keyword">const</span> root = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>);
  <span class="hljs-keyword">if</span> (root) {
    root.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">\`
      &lt;div style=&quot;padding: 2rem; font-family: system-ui;&quot;&gt;
        &lt;h1&gt;Something went wrong&lt;/h1&gt;
        &lt;p&gt;The application failed to load. Please try refreshing the page.&lt;/p&gt;
        &lt;pre style=&quot;color: red;&quot;&gt;<span class="hljs-subst">\${error.message}</span>&lt;/pre&gt;
      &lt;/div&gt;
    \`</span>;
  }
});
</code></pre>
<p>هذا قبيح—فأنت تكتب تلاعبًا خامًا بـDOM داخل تطبيق React. لكنه أيضًا الشيء الوحيد القادر على العمل في هذه النقطة من دورة الحياة، لأن React غير موجود بعد.</p>
<h3 id="اجعل-الوحدة-البعيدة-اختيارية">اجعل الوحدة البعيدة اختيارية</h3>
<p>والنهج الأكثر معمارية هو جعل وقت تشغيل الاتحاد يعامل الوحدة البعيدة كاختيارية لا مطلوبة. ويدعم اتحاد الوحدات ذلك عبر معالجة الأخطاء في إعداد <code>remotes</code> أو بلفّ الاستيراد الكسول باسترداد أخطاء سليم.</p>
<p>وبدل ترك فشل البيان يُسقط التطبيق كامل، تستطيع التقاط الفشل عند حدّ <code>React.lazy</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">AnalyticsDashboard</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;remoteAnalytics/analytics-dashboard&#x27;</span>).<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">default</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Analytics dashboard is unavailable.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> };
  }),
);
</code></pre>
<p>وهذا ينجح لأن <code>React.lazy</code> يتوقع وعدًا يُحلّ إلى وحدة ذات تصدير <code>default</code>. فإن فشل استيراد الوحدة البعيدة، تعيد مكوّنًا احتياطيًا بدل ترك الخطأ ينتشر. وما زال حدّ <code>&lt;Suspense&gt;</code> يتولّى حالة التحميل، ويُصيَّر المكوّن الاحتياطي إن كانت الوحدة البعيدة متوقفة.</p>
<p>لكن هذا لا ينجح إلا إن لم يرمِ وقت تشغيل الاتحاد خطأً <em>أثناء التفاوض</em> قبل أن يعمل الاستيراد الكسول أصلًا. فإن كانت الوحدة البعيدة مدرجة في <code>remotes</code> وفشل جلب البيان في مرحلة التفاوض المُبكِّرة، عدت إلى الصفحة البيضاء. والإصلاح في هذه الحالة إما إزالة الوحدة من <code>remotes</code> تمامًا (بجعلها ديناميكية فعلًا) وإما تهيئة معالجة الأخطاء في وقت تشغيل الاتحاد.</p>
<h3 id="التسجيل-الديناميكي-للوحدات-البعيدة">التسجيل الديناميكي للوحدات البعيدة</h3>
<p>أنظف حل للوحدات البعيدة الاختيارية فعلًا هو تجاوز إعداد <code>remotes</code> الثابت وتسجيل الوحدات البعيدة ديناميكيًا وقت التشغيل. ويدعم اتحاد الوحدات ذلك عبر واجهته البرمجية لوقت التشغيل—فتستطيع تسجيل وحدة بعيدة فقط عندما تكون جاهزًا لتحميلها، والتعامل مع الفشل بلطف.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { registerRemotes } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/runtime&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">loadAnalytics</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-title function_">registerRemotes</span>([
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteAnalytics&#x27;</span>,
        <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;http://localhost:3001/mf-manifest.json&#x27;</span>,
      },
    ]);
    <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;remoteAnalytics/analytics-dashboard&#x27;</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">module</span>;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Analytics remote unavailable:&#x27;</span>, error);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">default</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Analytics is currently offline.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> };
  }
}
</code></pre>
<p>الآن يحدث جلب البيان داخل <code>try/catch</code> تتحكم به أنت، لا في مرحلة التفاوض العامة. وإن كانت الوحدة البعيدة متوقفة، فالتطبيق يُقلع، ويُثبَّت React، ويستطيع حدّ الأخطاء التعامل مع أي خطأ آخر.</p>
<h2 id="الدرس">الدرس</h2>
<p>الدرس الأوسع لا يتعلق باتحاد الوحدات وحده، بل بالفجوة بين «معالجة الأخطاء في React» و«معالجة الأخطاء في إقلاع التطبيق». فحدود أخطاء React ممتازة في التقاط أعطال وقت التصيير، لكنها عديمة الجدوى مع أي شيء يحدث قبل وجود React—طلبات شبكة فاشلة أثناء تفاوض الوحدات، أو وسوم سكربت معطوبة، أو انقطاع CDN، أو أي خطأ تهيئة يمنع شجرة المكوّنات من التثبّت أصلًا.</p>
<p>وفي تطبيق تقليدي ببناء واحد، تكاد هذه الفجوة لا تهم لأن ما يمكن أن يعطب بين «تحميل JavaScript» و«تثبيت React» قليل جدًا. أما اتحاد الوحدات فيوسّع تلك الفجوة كثيرًا بإدخال مرحلة تفاوض كاملة—جلب بيانات، وحلّ اعتمادات مشتركة، وتحميل وحدات بعيدة—في المسافة بين تنفيذ السكربت وتصيير التطبيق.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="مشكلة-الإقلاع">مشكلة الإقلاع</h3>
<blockquote>
<p>حدود الأخطاء لا تلتقط الفشل الذي لديك فعلًا.</p>
</blockquote>
<ul>
<li>تلتقط حدود أخطاء React أخطاء وقت التصيير داخل الشجرة.</li>
<li>الوحدة البعيدة الاتحادية تفشل <em>قبل</em> أن تُصيّر — أثناء جلب السكربت أو تهيئة الحاوية.</li>
<li>لا يعمل حدّ الأخطاء قط لأن المكوّن لا يُثبَّت قط.</li>
</ul>
<pre><code>Timeline:
1. Host renders &lt;Suspense&gt; + &lt;ErrorBoundary&gt;
2. React calls lazy(() =&gt; loadRemote(&quot;checkout/Cart&quot;))
3. Network request for remoteEntry.js → 404 / timeout / JS error
4. Promise rejects → Unhandled rejection (outside React's lifecycle)
5. ErrorBoundary: &quot;I didn't see anything.&quot; 🤷
</code></pre>
<hr>
<h3 id="التقاط-أعطال-الإقلاع">التقاط أعطال الإقلاع</h3>
<blockquote>
<p>الفّ الاستيراد، لا المكوّن فقط.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">SafeRemote</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;checkout/Cart&#x27;</span>).<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">default</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FallbackCart</span> /&gt;</span></span> };
  }),
);
</code></pre>
<ul>
<li>يعيد <code>.catch()</code> وحدة صالحة بمكوّن احتياطي.</li>
<li>لا يعلم React قط أن الوحدة فشلت — فهو يحصل على مكوّن في الحالتين.</li>
<li>ادمجه مع <code>&lt;Suspense&gt;</code> لحالة التحميل.</li>
</ul>
<hr>
<h3 id="نمط-remoteboundary">نمط RemoteBoundary</h3>
<blockquote>
<p>غلاف قابل لإعادة الاستخدام لكل وحدة بعيدة اتحادية.</p>
</blockquote>
<ul>
<li>يلتقط أعطال الإقلاع (أخطاء الشبكة وJS)</li>
<li>يلتقط أخطاء وقت التصيير (حدّ أخطاء قياسي)</li>
<li>يبلّغ عن <em>أي</em> وحدة بعيدة فشلت، لا <em>أن</em> شيئًا ما فشل فقط</li>
<li>يصيّر واجهة احتياطية محصورة في منطقة الوحدة البعيدة</li>
</ul>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">RemoteBoundary</span>
  name=<span class="hljs-string">&quot;checkout&quot;</span>
  fallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FallbackCart</span> /&gt;</span></span>}
  onError={<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> <span class="hljs-title function_">reportError</span>(<span class="hljs-string">&#x27;checkout&#x27;</span>, error)}
&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">CartSkeleton</span> /&gt;</span>}&gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">RemoteCart</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">RemoteBoundary</span>&gt;
</code></pre>
<hr>
<h3 id="جعل-الوحدات-البعيدة-اختيارية">جعل الوحدات البعيدة اختيارية</h3>
<blockquote>
<p>ليست كل الوحدات البعيدة حرجة. عاملها على هذا الأساس.</p>
</blockquote>
<table>
<thead>
<tr>
<th>نوع الوحدة البعيدة</th>
<th>سلوك الفشل</th>
<th>مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>حرجة</strong></td>
<td>إظهار خطأ + حجب التفاعل</td>
<td>Checkout وAuth</td>
</tr>
<tr>
<td><strong>مهمة</strong></td>
<td>إظهار واجهة منقوصة</td>
<td>توصيات المنتجات</td>
</tr>
<tr>
<td><strong>اختيارية</strong></td>
<td>إخفاء صامت</td>
<td>أداة التحليلات، ولافتة A/B</td>
</tr>
</tbody>
</table>
<ul>
<li>أعلام ميزات لتعطيل الوحدات البعيدة كليًا بلا نشر.</li>
<li>فحوص صحة قبل محاولة تحميل الوحدات غير الحرجة.</li>
<li>قديم أثناء إعادة التحقق: قدّم نسخة مخزّنة مؤقتًا أثناء جلب نسخة جديدة.</li>
</ul>
<p>إذن، القاعدة العامة: حدود الأخطاء تتولّى أعطال التصيير وقت التشغيل. وكل ما قبل ذلك يحتاج معالجة أخطاء JavaScript عادية على مستوى الإقلاع. فإن كانت معماريتك تعتمد على توفّر موارد خارجية قبل أن يستطيع React التثبّت، فأنت تحتاج استراتيجية احتياطية لا تعتمد على React.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,t as slug,e as title};
