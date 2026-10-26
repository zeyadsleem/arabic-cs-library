const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-card",t="بناء مكوّن بطاقة",p=[{depth:2,id:"تطبيق-ما-تعلمناه",text:"تطبيق ما تعلمناه"},{depth:2,id:"إعطاؤه-بعض-المساحة",text:"إعطاؤه بعض المساحة"},{depth:2,id:"جعل-الصورة-تتصرف-بشكل-صحيح",text:"جعل الصورة تتصرف بشكل صحيح"},{depth:2,id:"الخطوط",text:"الخطوط"},{depth:3,id:"أنماط-العنوان",text:"أنماط العنوان"},{depth:3,id:"أنماط-الوصف",text:"أنماط الوصف"},{depth:3,id:"أنماط-السعر",text:"أنماط السعر"},{depth:2,id:"التباعد",text:"التباعد"},{depth:2,id:"إضافة-تفاعلات-التحويم",text:"إضافة تفاعلات التحويم"},{depth:2,id:"تقييد-العرض",text:"تقييد العرض"}],c=`<p>لنبدأ ببنية HTML الأساسية لدينا.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/4237ee4e875d7a422bbf9ecbc5d4554ef04a4628db957194e930625b9ca8f3d0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>من الواضح أنه ليس شيئًا يستحق النظر، لكن لنبدأ بإضافة المزيد إليه.</p>
<h2 id="تطبيق-ما-تعلمناه">تطبيق ما تعلمناه</h2>
<p>رأينا هذا سابقًا عندما كنا <a href="https://stevekinney.com/courses/tailwind/building-a-button">نبني زرًا</a>، لكن لا ضرر من المزيد من التمرين. لنضف الأصناف التالية إلى الحاوية: <code>bg-white</code> و<code>rounded-lg</code> و<code>shadow-md</code>.</p>
<p><em>تطبيق ما تعلمناه — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/71f625ed22f27861d5734eb6fd3882a11737316b8fc9b7c69bf43f8e84e3c256.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white shadow-md&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لا يزال لا يبدو بهذه الجودة، لكننا نتقدم — على ما أظن. نستخدم <code>shadow-md</code> بدلًا من <code>shadow-xs</code> (كما استخدمنا للزر) لأن البطاقات تحتاج إلى بروز أكبر بصفتها حاويات محتوى أكبر. يساعد الظل في تأسيس التسلسل البصري — ينبغي أن تبدو البطاقات أكثر ثقلًا من الأزرار.</p>
<h2 id="إعطاؤه-بعض-المساحة">إعطاؤه بعض المساحة</h2>
<p>رأينا هذا مع الزر أيضًا، لكننا نضيف الحشو بسهولة فائقة باستخدام الصنف <code>p-6</code>.</p>
<p><em>إعطاؤه بعض المساحة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/7fa20b8b66e72e3bce57153b487fb654bf071aae2fef795200a587afdf4eb7d4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white shadow-md&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يضيف الصنف المساعد <code>p-6</code> حشوًا بسماكة 24px من جميع الجهات.</p>
<h2 id="جعل-الصورة-تتصرف-بشكل-صحيح">جعل الصورة تتصرف بشكل صحيح</h2>
<p><em>جعل الصورة تتصرف بشكل صحيح — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/c1460915b080f5711eac1a0aaff9d067e8b8df6061fd5f903d7dab3ba1163d62.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white shadow-md&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>التغييرات على الصورة:</p>
<ul>
<li><code>w-full</code>: يجعل الصورة تملأ عرض البطاقة.</li>
<li><code>h-48</code>: يضبط ارتفاعًا ثابتًا قدره 192px لتناسب أبعاد البطاقة بشكل متسق.</li>
<li><code>object-cover</code>: يقص الصورة لملء المساحة مع الحفاظ على نسبة الأبعاد.</li>
</ul>
<p>تغييرات الحاوية:</p>
<p><code>overflow-hidden</code>: يضمن أن تحترم الصورةُ الزوايا المستديرة للبطاقة.</p>
<h2 id="الخطوط">الخطوط</h2>
<p><em>الخطوط — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/9deb228b2331811db396274728cc725b62d750b1aae54f9ef3377fe7ed492bc6.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white shadow-md&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg leading-tight font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm leading-relaxed text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>أجريت التعديلات التالية على الخطوط:</p>
<h3 id="أنماط-العنوان">أنماط العنوان</h3>
<ul>
<li><code>text-lg</code>: حجم خط 18px للبروز دون إثقال</li>
<li><code>font-semibold</code>: وزن 600 لتسلسل هرمي واضح</li>
<li><code>text-slate-900</code>: شبه أسود لأقصى قدر من القراءة</li>
</ul>
<h3 id="أنماط-الوصف">أنماط الوصف</h3>
<ul>
<li><code>text-slate-600</code>: رمادي متوسط للمعلومات الثانوية</li>
<li>حجم النص الافتراضي (<code>text-base</code>) يوفر قراءة جيدة</li>
</ul>
<h3 id="أنماط-السعر">أنماط السعر</h3>
<ul>
<li><code>text-xl</code>: حجم 20px يجعل السعر بارزًا — فهو غالبًا عامل القرار الأساسي</li>
<li><code>font-bold</code>: وزن 700 يؤكد على السعر أكثر من اسم المنتج</li>
<li><code>text-slate-900</code>: تباين عالٍ للوضوح</li>
</ul>
<h2 id="التباعد">التباعد</h2>
<p>يمكننا إضافة بعض التباعد بين النصوص باستخدام <code>space-y-4</code> على الحاوية المحيطة بالنص.</p>
<p><em>التباعد — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/51bdb56d0a9c5316a8d4eaff8720a9b8128c259dd460cb4c6aa1679371b01838.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white shadow-md&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg leading-tight font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm leading-relaxed text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يضيف <code>space-y-4</code> خاصية <code>margin-top: 1rem (16px)</code> إلى جميع العناصر التابعة <em>عدا</em> الأولى منها. إنه طريقة نظيفة لإنشاء تباعد رأسي متسق دون إضافة هوامش يدويًا إلى كل عنصر. هذا يسهّل أيضًا ضبط التباعد بين جميع العناصر بدلًا من محاولة التبجّح بالهوامش وما شابه.</p>
<h2 id="إضافة-تفاعلات-التحويم">إضافة تفاعلات التحويم</h2>
<p><em>إضافة تفاعلات التحويم — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/ad166de7bd7f38bfcf20be15f4312ae5c44eca17334afbd5ecb71667df96272f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg leading-tight font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm leading-relaxed text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>أضفنا الأصناف التالية إلى الحاوية:</p>
<ul>
<li><code>hover:shadow-lg</code>: يزيد الظل عند التحويم، ما يجعل البطاقة تبدو مرتفعة</li>
<li><code>transition-shadow</code>: يحرّك تغييرات الظل بسلاسة</li>
<li><code>duration-200</code>: يضبط انتقالًا سريعًا (200ms) لإحساس سريع الاستجابة</li>
</ul>
<h2 id="تقييد-العرض">تقييد العرض</h2>
<p>لا يزال عريضًا قليلًا أكثر من ذوقي. لنضبط حدًّا أقصى لعرض البطاقة باستخدام <code>max-w-sm</code> على الحاوية.</p>
<p><em>تقييد العرض — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/599b22793a1c743b5b51904bdcc66b398daefc279053fdfddeeb68fd47867df6.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
