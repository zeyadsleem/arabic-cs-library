const o="kinney",n="tailwind",t="Tailwind CSS",e="tailwind-4",i="الفروق في Tailwind 4",s=[{depth:2,id:"قائمة-تحقق-التغييرات-الكاسرة",text:"قائمة تحقق التغييرات الكاسرة"},{depth:3,id:"تغييرات-التهيئة",text:"تغييرات التهيئة"},{depth:3,id:"الأدوات-المحذوفةالمهجورة",text:"الأدوات المحذوفة/المهجورة"},{depth:3,id:"تغييرات-الحدود-والألوان",text:"تغييرات الحدود والألوان"},{depth:3,id:"صيغة-متغيرات-css",text:"صيغة متغيّرات CSS"},{depth:3,id:"تغييرات-طبقة-المكونات",text:"تغييرات طبقة المكوّنات"},{depth:2,id:"الترحيل-المؤتمت",text:"الترحيل المؤتمت"}],c=`<p>Tailwind 4 إعادة كتابة كاملة للأُطر من الأساس.</p>
<ul>
<li><strong><a href="https://stevekinney.com/courses/tailwind/tailwind-oxide">محرك Oxide</a>:</strong> محرك مبني بـ Rust مع بناءات كاملة أسرع 5 مرات، وبناءات تزايدية أسرع 100 مرة</li>
<li><strong>تهيئة أولًا بـ CSS:</strong> هيّئ في CSS باستخدام <code>@theme</code> و<code>@utility</code> و<code>@custom-variant</code> و<code>@plugin</code> (تهيئة JavaScript ما زالت مدعومة عبر <code>@config</code>)</li>
<li><strong>متغيّرات CSS الأصلية:</strong> رموز <code>@theme</code> تُعرض تلقائيًا كخصائص CSS مخصصة</li>
<li><strong>CSS الحديث:</strong> <code>@layer</code> الأصلية، <a href="https://stevekinney.com/courses/tailwind/at-property"><code>@property</code></a>، <a href="https://stevekinney.com/courses/tailwind/color-mix"><code>color-mix()</code></a>، <a href="https://stevekinney.com/courses/tailwind/oklch-colors">ألوان OKLCH</a></li>
<li><strong><a href="https://stevekinney.com/courses/tailwind/oklch-colors">ألوان OKLCH</a>:</strong> موحّدة إدراكيًا، مع دعم النطاق اللوني الواسع P3</li>
<li><strong>تثبيت مبسّط:</strong> الأمر الواحد <code>@import &quot;tailwindcss&quot;;</code> يحل محل ثلاثة توجيهات</li>
<li><strong>كشف تلقائي للمحتوى:</strong> لا حاجة إلى مصفوفة <code>content</code>، ويُحترم <code>.gitignore</code></li>
<li><strong>أدوات جديدة:</strong> <a href="https://stevekinney.com/courses/tailwind/container-queries">استعلامات الحاويات</a>، وتحويلات ثلاثية الأبعاد، والتدرجات (الشعاعية/المخروطية)، وظلال النصوص، والأقنعة، و<a href="https://stevekinney.com/courses/tailwind/not-utility"><code>not-*</code></a>، و<a href="https://stevekinney.com/courses/tailwind/starting-style"><code>starting:</code></a>، و<code>user-valid/invalid</code>، و<code>pointer-*</code>، و<code>inset-shadow/ring</code>، و<a href="https://stevekinney.com/courses/tailwind/inert-utility"><code>inert</code></a></li>
<li><strong>متغيّرات قابلة للتركيب:</strong> سلسلة <a href="https://stevekinney.com/courses/tailwind/group-and-peer-modifiers"><code>group-*</code></a> و<a href="https://stevekinney.com/courses/tailwind/group-and-peer-modifiers"><code>peer-*</code></a> و<a href="https://stevekinney.com/courses/tailwind/has-utility"><code>has-*</code></a> و<a href="https://stevekinney.com/courses/tailwind/not-utility"><code>not-*</code></a></li>
<li><strong>تغييرات كاسرة:</strong> إزالة الأدوات المهجورة، والحد الافتراضي أصبح <code>currentColor</code>، ومتغيّرات CSS تستخدم <code>(…)</code> لا <code>[…]</code>، وتغيّر المتغيّرات في <code>@layer components</code></li>
<li><strong>دعم المتصفحات:</strong> Safari 16.4+، Chrome 111+، Firefox 128+ (استخدم v3.x للمتصفحات الأقدم)</li>
<li><strong>أداة الترقية:</strong> <code>npx @tailwindcss/upgrade@next</code> تؤتمت الترحيل من v3 إلى Tailwind 4</li>
<li><strong>الفلسفة:</strong> الأولوية للأدوات مع متغيّرات CSS دلالية، تبدو كـ CSS أصلي</li>
</ul>
<h2 id="قائمة-تحقق-التغييرات-الكاسرة">قائمة تحقق التغييرات الكاسرة</h2>
<p>عند الترحيل من Tailwind CSS v3 إلى Tailwind 4، استخدم قائمة التحقق هذه لضمان انتقال سلس:</p>
<h3 id="تغييرات-التهيئة">تغييرات التهيئة</h3>
<ul>
<li><strong>استبدل استيرادات CSS:</strong> غيّر <code>@tailwind base; @tailwind components; @tailwind utilities;</code> إلى <code>@import &quot;tailwindcss&quot;;</code></li>
<li><strong>حدّث صيغة التهيئة:</strong> فكّر في الترحيل من تهيئة JavaScript إلى التهيئة أولًا بـ CSS باستخدام <code>@theme</code> و<code>@utility</code> وغيرها.</li>
<li><strong>أزل مصفوفة المحتوى:</strong> الكشف التلقائي للمحتوى يعني أنه يمكنك إزالة تهيئة <code>content</code> (لكن تهيئة JavaScript ما زالت مدعومة)</li>
<li><strong>حدّث امتدادات الملفات:</strong> تأكد من أن عملية البناء لديك تتعرّف على صيغة التهيئة الجديدة أولًا بـ CSS</li>
</ul>
<h3 id="الأدوات-المحذوفةالمهجورة">الأدوات المحذوفة/المهجورة</h3>
<ul>
<li><strong>أزل الأدوات المهجورة:</strong> افحص أي أدوات هُجرت في v3 وأُزيلت في Tailwind 4 واستبدلها</li>
<li><strong>حدّث أدوات التحويل:</strong> بعض أدوات التحويل قد تتغير صيغتها أو تُدمج</li>
<li><strong>افحص أدوات التصفية:</strong> تحقق من أن أدوات backdrop-filter وfilter تعمل كما هو متوقع</li>
</ul>
<h3 id="تغييرات-الحدود-والألوان">تغييرات الحدود والألوان</h3>
<ul>
<li><strong>ألوان الحدود الافتراضية:</strong> أصبحت الحدود افتراضيًا <code>currentColor</code> بدلًا من الرمادي — أضف ألوان حدود صريحة عند الحاجة</li>
<li><strong>حدّث أدوات الحدود:</strong> تحقق من أن أنماط الحدود تُصيَّر كما هو متوقع مع القيم الافتراضية الجديدة</li>
<li><strong>تحقق من لوحة الألوان:</strong> تأكد من أن الألوان المخصصة تعمل مع نظام ألوان OKLCH الجديد</li>
</ul>
<h3 id="صيغة-متغيرات-css">صيغة متغيّرات CSS</h3>
<ul>
<li><strong>حدّث صيغة المتغيّرات:</strong> غيّر متغيّرات CSS من الأقواس المربعة <code>[…]</code> إلى الأقواس <code>(…)</code></li>
<li><strong>مثال:</strong> <code>var(--my-color-[500])</code> تصبح <code>var(--my-color-(500))</code></li>
<li><strong>افحص الخصائص المخصصة:</strong> تحقق من أن جميع متغيّرات CSS المخصصة تستخدم الصيغة الجديدة</li>
</ul>
<h3 id="تغييرات-طبقة-المكونات">تغييرات طبقة المكوّنات</h3>
<ul>
<li><strong>راجع أنماط المكوّنات:</strong> تغيّر سلوك المتغيّرات في <code>@layer components</code></li>
<li><strong>حدّث CSS المكوّنات:</strong> تحقق من أن أنماط مستوى المكوّن تعمل كما هو متوقع</li>
<li><strong>اختبر التخصيص:</strong> تأكد من أن أنماط المكوّنات تمتلك التخصيص الصحيح مع نظام الطبقات الجديد</li>
</ul>
<h2 id="الترحيل-المؤتمت">الترحيل المؤتمت</h2>
<p>فكّر في استخدام أداة الترقية الرسمية لأتمتة كثير من هذه التغييرات. فقط تأكد من أنك تفعل ذلك على فرع git نظيف. لم أرَ واحدة من هذه الأدوات مثالية قط.</p>
<pre><code class="language-bash">npx @tailwindcss/upgrade@next
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>احتفظ دائمًا بنسخة احتياطية من مشروعك قبل تشغيل أدوات الترحيل المؤتمتة، وراجع جميع التغييرات بعناية قبل الإيداع.</p>
</blockquote>
`,d={book:o,chapter:n,chapterTitle:t,slug:e,title:i,headings:s,html:c};export{o as book,n as chapter,t as chapterTitle,d as default,s as headings,c as html,e as slug,i as title};
