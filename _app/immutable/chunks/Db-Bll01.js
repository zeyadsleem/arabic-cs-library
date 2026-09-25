const e="patterns-dev",t="react",o="أنماط React وNext.js",n="nextjs-vitals",c="تحسين تطبيقات Next.js وفق Core Web Vitals",p=[{depth:2,id:"مكون-image-في-nextjs",text:"مكوّن Image في Next.js"},{depth:3,id:"التحسينات-المدمجة",text:"التحسينات المدمجة"},{depth:3,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"مكون-script-في-nextjs",text:"مكوّن Script في Next.js"},{depth:2,id:"مكون-font-في-nextjs",text:"مكوّن Font في Next.js"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],a=`<p>يتطلب تحسين تجربة المستخدم (user experience) وفق <a href="https://web.dev/vitals">Core Web Vitals</a> تحسين سرعة الصفحة وتفاعليتها واستقرارها البصري. ويتيح Next.js، عبر عدة مكوّنات بُنيت بالتعاون مع <a href="https://web.dev/aurora">فريق Chrome</a>، تحسين مقاييس Core Web Vitals.</p>
<ul>
<li><code>next/image</code>: مكوّن <code>next/image</code> المصمم لتحسين الصور وتحسين <a href="https://web.dev/lcp">Largest Contentful Paint</a> (LCP) و<a href="https://web.dev/cls">Cumulative Layout Shift</a> (CLS) تلقائيًا عبر تغيير حجمها وضغطها وتحميلها كسولًا. ويمكن أيضًا استخدامه لعرض صور متجاوبة تتكيف مع أحجام الشاشات المختلفة.</li>
<li><code>next/script</code>: يمكن استخدام مكوّن <code>next/script</code> لتحميل سكربتات الأطراف الثالثة بصورة غير متزامنة لتحسين سرعة الصفحة وتفاعليتها. ويمكن استخدامه أيضًا لتأجيل تحميل السكربتات غير الحرجة، مثل سكربتات التحليلات، لمنعها من إبطاء التحميل الأولي للصفحة. ويمكن لهذه التقنيات تحسين مقاييس مثل <a href="https://web.dev/fid">First Input Delay</a> (FID) و<a href="https://web.dev/inp">Interaction To Next Paint</a> (INP).</li>
<li><code>next/font</code>: يمكن استخدام مكوّن <code>next/font</code> لتحسين تحميل خطوط الويب عبر تحميلها بصورة غير متزامنة وإعطاء الأولوية لأنماط الخطوط الأهم في التحميل الأولي للصفحة. ويمكن أن يساعد ذلك على تحسين سرعة الصفحة واستقرارها البصري بمنع إزاحات التخطيط (CLS) الناتجة عن تحميل الخطوط.</li>
</ul>
<p>لنراجع ما يفعله كل مكوّن بمزيد من التفصيل.</p>
<h2 id="مكون-image-في-nextjs">مكوّن Image في Next.js</h2>
<p>مكوّن Image في Next.js، أي <a href="https://nextjs.org/docs/basic-features/image-optimization">next/image</a>، هو امتداد لعنصر HTML <code>&amp;#x3C;img&gt;</code>؛ فهو يوفر تحسينات للأداء (performance) تساعدك على تحقيق نتائج جيدة في <a href="https://web.dev/vitals">Core Web Vitals</a>. هذه الدرجات مؤشرات مهمة عن مدى جودة تجربة المستخدمين لموقعك، وقد تؤثر في ترتيب نتائج بحث Google.</p>
<p>وثائق Next.js الرسمية:</p>
<ul>
<li><a href="https://developer.chrome.com/blog/image-component/">بناء مكوّن Image فعّال</a></li>
<li><a href="https://nextjs.org/docs/basic-features/image-optimization">نظرة عامة على ميزة <code>next/image</code></a></li>
<li><a href="https://nextjs.org/docs/api-reference/next/image">مرجع واجهة <code>next/image</code></a></li>
<li><a href="https://nextjs.org/learn/seo/improve/images">وثائق تحسين محركات البحث لـ <code>next/image</code></a></li>
</ul>
<h3 id="التحسينات-المدمجة">التحسينات المدمجة</h3>
<p>تشمل بعض التحسينات المدمجة في مكوّن Image ما يلي:</p>
<ul>
<li><strong>أداء محسّن</strong>: تقديم صورة بالحجم الصحيح لكل جهاز دومًا، باستخدام صيغ الصور الحديثة</li>
<li><strong>استقرار بصري</strong>: منع <a href="https://web.dev/cls">Cumulative Layout Shift</a> تلقائيًا. <strong>تحميل أسرع للصفحات</strong>: لا تُحمَّل الصور إلا عند دخولها مجال الرؤية، مع عناصر نائبة اختيارية تُظهر نسخة ضبابية أولًا</li>
<li><strong>مرونة الأصول</strong>: تغيير حجم الصور عند الطلب، حتى الصور المخزّنة على خوادم بعيدة. استخدام مكوّن Image</li>
</ul>
<p>لإضافة صورة إلى تطبيقك، استورد مكوّن <code>next/image</code>:</p>
<pre><code>import Image from &quot;next/image&quot;;
</code></pre>
<p>يمكنك الآن تعريف <code>src</code> للصورة، سواء كانت محلية أو بعيدة.</p>
<p><strong>الصور المحلية</strong> لاستخدام صورة محلية، استورد ملفات <code>.jpg</code> أو <code>.png</code> أو <code>.webp</code>:</p>
<pre><code>import profilePic from &quot;../public/me.png&quot;;
</code></pre>
<p>يجب أن يكون الاستيراد ثابتًا كي يمكن تحليله وقت البناء.</p>
<p>يحدد Next.js تلقائيًا عرض الصورة وارتفاعها بناءً على الملف المستورد. وتستخدم هذه القيم لمنع Cumulative Layout Shift أثناء تحميل الصورة.</p>
<pre><code>import Image from &quot;next/image&quot;;
import profilePic from &quot;../public/me.png&quot;;

function Home() {
  return (
    &amp;#x3C;&gt;
      &amp;#x3C;h1&gt;My Homepage&amp;#x3C;/h1&gt;
      &amp;#x3C;Image
        src={profilePic}
        alt=&quot;Picture of the author&quot;
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL=&quot;data:...&quot; automatically provided
        // placeholder=&quot;blur&quot; // Optional blur-up while loading
      /&gt;
      &amp;#x3C;p&gt;Welcome to my homepage!&amp;#x3C;/p&gt;
    &amp;#x3C;/&gt;
  );
}
</code></pre>
<h4>الصور البعيدة</h4>
<p>لاستخدام صورة بعيدة، يجب أن تكون الخاصية <code>src</code> سلسلة URL، نسبية أو مطلقة. ولأن Next.js لا يمكنه الوصول إلى الملفات البعيدة أثناء عملية البناء، فستحتاج إلى توفير خصائص العرض والارتفاع و<code>blurDataURL</code> الاختيارية يدويًا:</p>
<pre><code>import Image from &quot;next/image&quot;;

export default function Home() {
  return (
    &amp;#x3C;&gt;
      &amp;#x3C;h1&gt;My Homepage&amp;#x3C;/h1&gt;
      &amp;#x3C;Image
        src=&quot;/me.png&quot;
        alt=&quot;Picture of the author&quot;
        width={500}
        height={500}
      /&gt;
      &amp;#x3C;p&gt;Welcome to my homepage!&amp;#x3C;/p&gt;
    &amp;#x3C;/&gt;
  );
}
</code></pre>
<p><strong>النطاقات</strong></p>
<p>قد ترغب أحيانًا في تحسين صورة بعيدة مع الاستمرار في استخدام واجهة Next.js المدمجة لتحسين الصور. ولأجل ذلك، اترك المُحمِّل (loader) على إعداده الافتراضي وأدخل عنوان URL مطلقًا لخاصية <code>src</code> في Image.</p>
<p>لحماية تطبيقك من المستخدمين الخبيثين، عليك تحديد قائمة بأسماء المضيفات البعيدة التي تنوي استخدامها مع مكوّن <code>next/image</code>.</p>
<p><strong>المُحمِّلات</strong> لاحظ أن المثال السابق استخدم URL جزئيًا، هو <code>/me.png</code>، لصورة بعيدة. وهذا ممكن بسبب بنية المُحمِّل.</p>
<p>المُحمِّل دالة تولّد عناوين URL لصورتك. تعدّل <code>src</code> المعطى، وتولّد عناوين URL متعددة لطلب الصورة بأحجام مختلفة. وتولّد عناوين URL هذه</p>
<p><strong>الصور البعيدة مع التحجيم التلقائي</strong></p>
<p>إذا كنت تستخدم صورة بعيدة، فعليك توفير الخاصيتين <code>width</code> و<code>height</code> لمكوّن Image. لكن إذا كنت لا تعرف أبعاد الصورة البعيدة، فيمكنك دمج الخاصية <code>layout</code> مع الخاصية <code>aspectRatio</code> كي يحسب Next.js العرض والارتفاع تلقائيًا.</p>
<p>على سبيل المثال، إذا أردت عرض صورة بعيدة بنسبة عرض إلى ارتفاع 16:9 وأردت لمكوّن Image أن يملأ حاويته، فيمكنك استخدام الشيفرة التالية:</p>
<pre><code>import Image from &quot;next/image&quot;;

function Home() {
  return (
    &amp;#x3C;&gt;
      &amp;#x3C;h1&gt;My Homepage&amp;#x3C;/h1&gt;
      &amp;#x3C;div style={{ width: &quot;100%&quot;, height: &quot;50vh&quot; }}&gt;
        &amp;#x3C;Image
          src=&quot;https://example.com/my-image.jpg&quot;
          alt=&quot;My Image&quot;
          layout=&quot;fill&quot;
          objectFit=&quot;cover&quot;
          aspectRatio={16 / 9}
        /&gt;
      &amp;#x3C;/div&gt;
      &amp;#x3C;p&gt;Welcome to my homepage!&amp;#x3C;/p&gt;
    &amp;#x3C;/&gt;
  );
}
</code></pre>
<p>في هذا المثال، تُضبط الخاصية <code>layout</code> على <code>fill</code>، مما يطلب من Next.js ملء أبعاد الحاوية الأصل. وتُضبط الخاصية <code>objectFit</code> على <code>cover</code>، مما يحجم الصورة لتغطية الحاوية كاملة مع الحفاظ على نسبة أبعادها. وتُضبط الخاصية <code>aspectRatio</code> على <code>16 / 9</code>، وهي نسبة أبعاد الصورة.</p>
<p><strong>المُحمِّلات المخصصة</strong></p>
<p>يستخدم Next.js افتراضيًا واجهة تحسين الصور المدمجة لتحسين الصور وتقديمها. لكن إذا أردت تقديم صورك من مصدر آخر، مثل CDN أو خادم صور، فيمكنك تعريف دالة مُحمِّل مخصصة.</p>
<p>دالة المُحمِّل هي دالة تولّد عناوين URL لصورك. تأخذ وسيط <code>src</code>، وهو عنوان URL المصدر للصورة، وتعيد كائنًا بالخصائص التالية:</p>
<ul>
<li><code>src</code>: عنوان URL للصورة الأصلية.</li>
<li><code>width</code>: عرض الصورة.</li>
<li><code>height</code>: ارتفاع الصورة.</li>
<li><code>blurDataURL</code>: سلسلة مرمّزة بـ base64 تمثل نسخة ضبابية من الصورة. تُستخدم كعنصر نائب أثناء تحميل الصورة.</li>
</ul>
<p>إليك مثالًا على دالة مُحمِّل مخصصة تولّد عناوين URL للصور المخزّنة في AWS S3:</p>
<pre><code>import Image from &quot;next/image&quot;;

function myLoader({ src, width, quality }) {
  return \`https://example.com/images/\${src}?w=\${width}&amp;#x26;q=\${quality || 75}\`;
}

function Home() {
  return (
    &amp;#x3C;&gt;
      &amp;#x3C;h1&gt;My Homepage&amp;#x3C;/h1&gt;
      &amp;#x3C;Image
        loader={myLoader}
        src=&quot;my-image.jpg&quot;
        alt=&quot;My Image&quot;
        width={500}
        height={500}
      /&gt;
      &amp;#x3C;p&gt;Welcome to my homepage!&amp;#x3C;/p&gt;
    &amp;#x3C;/&gt;
  );
}
</code></pre>
<p>في هذا المثال، تُضبط الخاصية <code>loader</code> على <code>myLoader</code>، وهي دالة مُحمِّل مخصصة تولّد عناوين URL للصور المخزّنة في AWS S3. وتُضبط الخاصية <code>src</code> على <code>my-image.jpg</code>، وهو اسم ملف الصورة. وتُضبط الخاصيتان <code>width</code> و<code>height</code> على <code>500</code>، وهو حجم الصورة.</p>
<h3 id="الخلاصة">الخلاصة</h3>
<p>باختصار، مكوّن Image في Next.js أداة قوية لتحسين الصور في تطبيق Next.js. فهو يتضمن مجموعة متنوعة من تحسينات الأداء المدمجة لمساعدتك على تحقيق نتائج جيدة في Core Web Vitals، مثل تحسين الأداء والاستقرار البصري وتحميل الصفحات بسرعة ومرونة الأصول.</p>
<p>يمكنك استخدام مكوّن Image لإضافة صور محلية أو بعيدة إلى تطبيقك، وسيحدد Next.js تلقائيًا عرض الصورة وارتفاعها لمنع Cumulative Layout Shift أثناء تحميل الصورة. ويمكنك أيضًا استخدام مُحمِّلات مخصصة.</p>
<h2 id="مكون-script-في-nextjs">مكوّن Script في Next.js</h2>
<p>الوثائق الرسمية:</p>
<ul>
<li><a href="https://developer.chrome.com/blog/script-component/">تحسين تحميل السكربتات في Next.js</a></li>
<li><a href="https://nextjs.org/docs/basic-features/script">وثائق ميزة <code>next/script</code></a></li>
<li><a href="https://nextjs.org/docs/api-reference/next/script">مرجع واجهة <code>next/script</code></a></li>
</ul>
<p>تمثل سكربتات الأطراف الثالثة طريقة شائعة للمطورين لتوفير الوقت والاستفادة من الحلول الموجودة لتنفيذ ميزات شائعة. لكن مطوّري هذه السكربتات كثيرًا ما يهملون تأثير شيفرتها على الأداء في المواقع التي تستخدمها، مما يؤدي إلى تجربة مستخدم دون المستوى الأمثل. كما تشكل هذه السكربتات تحديًا للمطورين، الذين قد لا يعرفون كيفية تحسين أدائها.</p>
<p>تمثل السكربتات كمية كبيرة من بايتات الأطراف الثالثة التي تنزلها المواقع ضمن فئات مختلفة من طلبات الأطراف الثالثة. وافتراضيًا، تعطي المتصفحات الأولوية للسكربتات وفق موقعها في المستند، وقد يؤخر ذلك اكتشاف السكربتات الحرجة لتجربة المستخدم أو تنفيذها. ينبغي تحميل مكتبات الأطراف الثالثة اللازمة للتخطيط مبكرًا من أجل عرض الصفحة، بينما ينبغي تأجيل الأطراف الثالثة غير الحرجة كي لا تحجب عمليات أخرى على الخيط الرئيسي. لدى Lighthouse فحصان لتمييز السكربتات التي تحجب العرض أو الخيط الرئيسي. من المهم مراعاة ترتيب تحميل موارد الصفحة كي لا تتأخر الموارد الحرجة ولا تحجب الموارد غير الحرجة الموارد الحرجة.</p>
<p>طوّر Next.js مكوّن Script يضم ميزات ترتيب تمنح المطورين تحكمًا أفضل في تحميل سكربتات الأطراف الثالثة. وينفذ المكوّن طرائق لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة، ويقدم قالبًا للمطورين لتعريف استراتيجية تحميله. وبمجرد تحديد الاستراتيجية المناسبة، سيُحمَّل بأكفأ طريقة من دون حجب الموارد الحرجة الأخرى.</p>
<p>قبل مناقشة مكوّن Script في Next.js، لنراجع الإرشادات المتاحة لتقليل تأثير السكربتات التي تحجب العرض.</p>
<p><strong>طرائق لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة</strong></p>
<p>تقدّم الإرشادات المتاحة الطرق التالية لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة:</p>
<p>استخدم الخاصية <code>async</code> أو <code>defer</code> مع وسوم <code>&amp;#x3C;script&gt;</code> لتخبر المتصفح بتحميل سكربتات الأطراف الثالثة غير الحرجة من دون حجب محلّل المستند. ويمكن اعتبار السكربتات غير المطلوبة للتحميل الأولي للصفحة أو لأول تفاعل للمستخدم غير حرجة.</p>
<pre><code>&amp;#x3C;script src=&quot;https://example.com/script1.js&quot; defer&gt;&amp;#x3C;/script&gt;
&amp;#x3C;script src=&quot;https://example.com/script2.js&quot; async&gt;&amp;#x3C;/script&gt;
Establish early connections to required origins using preconnect and
dns-prefetch. This allows critical scripts to start downloading earlier.

&amp;#x3C;head&gt;
  &amp;#x3C;link rel=&quot;preconnect&quot; href=&quot;http://PreconnThis.com&quot; /&gt;
  &amp;#x3C;link rel=&quot;dns-prefetch&quot; href=&quot;http://PrefetchThis.com&quot; /&gt;
&amp;#x3C;/head&gt;
</code></pre>
<p>حمّل موارد وتضمينات الأطراف الثالثة كسولًا بعد انتهاء تحميل المحتوى الرئيسي للصفحة أو عندما يمرر المستخدم إلى الجزء الذي توجد فيه.</p>
<p><strong>مكوّن Script في Next.js</strong></p>
<p>يبني مكوّن Script في Next.js على وسم HTML <code>&amp;#x3C;script&gt;</code> ويوفر خيارًا لتعيين أولوية التحميل لسكربتات الأطراف الثالثة باستخدام الخاصية <code>strategy</code>. وبمجرد تحديد الاستراتيجية المناسبة، سيُحمَّل بأكفأ طريقة من دون حجب الموارد الحرجة الأخرى.</p>
<pre><code>// Example for beforeInteractive:

&amp;#x3C;script
  src=&quot;https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver&quot;
  strategy=&quot;beforeInteractive&quot;
/&gt;

// Example for afterInteractive (default):
&amp;#x3C;script src=&quot;https://example.com/samplescript.js&quot; /&gt;

// Example for lazyonload:
&amp;#x3C;script src=&quot;https://connect.facebook.net/en_US/sdk.js&quot; strategy=&quot;lazyOnload&quot; /&gt;
</code></pre>
<p>يمكن أن تأخذ الخاصية <code>strategy</code> ثلاث قيم:</p>
<ul>
<li><code>beforeInteractive</code>: يمكن استخدام هذا الخيار مع السكربتات الحرجة التي ينبغي أن تُنفَّذ قبل أن تصبح الصفحة تفاعلية. يضمن Next.js حقن هذه السكربتات في HTML الأولي على الخادم وتنفيذها قبل JavaScript المجمّع الذاتي. وإدارة موافقة المستخدم وسكربتات كشف الروبوتات أو مكتبات المساعدات اللازمة لعرض المحتوى الحرج مرشحات جيدة لهذه الاستراتيجية.</li>
<li><code>afterInteractive</code>: هذه هي الاستراتيجية الافتراضية المطبقة، وتكافئ تحميل سكربت باستخدام الخاصية <code>defer</code>.</li>
<li><code>lazyOnloadExternal</code>: يمكن استخدام هذا الخيار لتحميل سكربتات ذات أولوية منخفضة مستضافة على خوادم خارجية عندما يكون المتصفح خاملًا. وهذه الاستراتيجية مفيدة خصوصًا عندما لا تكون السكربتات حرجة لعرض صفحة ويمكن تحميلها بعد التحميل الأولي. ومن أمثلتها سكربتات الإعلانات التي يمكن تحميلها بعد التحميل الأولي عندما يكون المستخدم خاملًا.</li>
</ul>
<p>يوفر مكوّن Script كذلك آلية لتضمين سكربتات الأطراف الثالثة داخل الصفحة باستخدام الخاصية <code>inline</code>. ويمكن لتضمين السكربتات أن يقلل عدد الطلبات التي يرسلها الموقع، وقد يكون ذلك مفيدًا 특히ًا مع السكربتات الصغيرة. ومع ذلك، لا يُستحسن تضمين السكربتات الكبيرة لأنها قد تزيد حجم مستند HTML فتجعل تنزيله أبطأ.</p>
<pre><code>// Example for inlining a script:

&amp;#x3C;script inline src=&quot;https://example.com/inlinescript.js&quot; /&gt;
</code></pre>
<p>إلى جانب ما سبق، يوفر مكوّن Script ميزات أخرى مثل تخزين السكربتات مؤقتًا وإزالة تكرارها وإمداد البدائل الاحتياطية لها. ويمكن لتخزين السكربتات مؤقتًا أن يحسن زمن تحميل الصفحة، ولا سيما عندما يعود المستخدمون إلى موقع. ويمكن لإزالة تكرار السكربتات أن تقلل عدد الطلبات المرسلة إلى الخادم، بما يخفف الحمل عليه. وأخيرًا، يمكن استخدام بدائل السكربتات لتحميل سكربت مختلف إذا فشل تحميل السكربت الأساسي.</p>
<h2 id="مكون-font-في-nextjs">مكوّن Font في Next.js</h2>
<p>يعد تحسين الخطوط البديلة بالغ الأهمية لأداء الويب وإمكانية الوصول. فحين يزور المستخدم موقعًا، ينبغي أن يرى المحتوى في أقرب وقت ممكن، حتى لو لم يُحمّل الخط المخصص الذي يستخدمه الموقع بعد. سنستكشف في هذه المقالة مكوّن Font في Next.js وكيف يساعد في تحسين الخطوط البديلة.</p>
<ul>
<li><a href="https://nextjs.org/docs/basic-features/font-optimization">ميزات تحسين الخطوط في Next.js</a></li>
<li><a href="https://developer.chrome.com/blog/framework-tools-font-fallback/">أدوات إطار العمل للخطوط البديلة</a></li>
<li><a href="https://nextjs.org/docs/api-reference/next/font">مرجع واجهة <code>next/font</code></a></li>
</ul>
<p>يوفر Next.js طريقة مدمجة لتفعيل تحسين الخطوط البديلة. وتكون هذه الميزة مفعّلة افتراضيًا عند تحميل الخطوط باستخدام مكوّن <code>@next/font</code>. أُضيف مكوّن <code>@next/font</code> في الإصدار 13 من Next.js ويوفر واجهة لاستيراد Google Fonts أو خطوط مخصصة إلى صفحاتك. ويضم كذلك استضافة ذاتية تلقائية مدمجة لملفات الخطوط.</p>
<p>عند الاستخدام، تُحسب مقاييس الخط البديل تلقائيًا وتُحقن في ملف CSS. ويضمن ذلك أن يطابق الخط البديل الخط المخصص في الحجم وارتفاع السطر عندما لا يكون الخط المخصص متاحًا. ويمنع ذلك إزاحات التخطيط التي قد تحدث عند تحميل الخط البديل.</p>
<p><strong>استخدام مكوّن Font في Next.js</strong></p>
<p>لنفترض أنك تستخدم خط Roboto. عادةً ما تعرّفه في CSS هكذا:</p>
<pre><code>@font-face {
  font-family: &quot;Roboto&quot;;
  font-display: swap;
  src: url(&quot;/fonts/Roboto.woff2&quot;) format(&quot;woff2&quot;), url(&quot;/fonts/Roboto.woff&quot;)
      format(&quot;woff&quot;);
  font-weight: 700;
}

body {
  font-family: Roboto;
}
</code></pre>
<p>للانتقال إلى مكوّن Font في Next.js، انقل تعريف خط Roboto إلى JavaScript عن طريق استيراد دالة <code>Roboto</code> من <code>next/font</code>. وستعيد الدالة اسم <code>class</code> يمكنك الاستفادة منه في قالب المكوّن. تذكر إضافة <code>display: swap</code> إلى كائن الإعداد لتفعيل الميزة.</p>
<pre><code>import { Roboto } from &quot;@next/font/google&quot;;

const roboto = Roboto({
  weight: &quot;400&quot;,
  subsets: [&quot;latin&quot;],
  display: &quot;swap&quot;, // Using display swap automatically enables the feature
});
</code></pre>
<p>في المكوّن، استخدم اسم <code>class</code> المولّد:</p>
<pre><code>export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    &amp;#x3C;html lang=&quot;en&quot; className={roboto.className}&gt;
      &amp;#x3C;body&gt;{children}&amp;#x3C;/body&gt;
    &amp;#x3C;/html&gt;
  );
}
</code></pre>
<p>لاحظ أن مكوّن Font في Next.js مصمم لدعم خطي <code>Arial</code> و<code>Times New Roman</code> فقط كخطوط بديلة. ويرجع هذا الاختيار أساسًا إلى الدعم الواسع لهذين الخطين عبر المنصات.</p>
<p><strong>خيار الإعداد <code>adjustFontFallback</code></strong></p>
<p>يحتوي مكوّن Font في Next.js على خيار إعداد <code>adjustFontFallback</code> يمكن استخدامه لتفعيل الخطوط البديلة التلقائية أو تعطيلها. وبالنسبة إلى <code>@next/font/google</code>، تكون هذه قيمة منطقية تحدد ما إذا كان ينبغي استخدام خط بديل تلقائي لتقليل Cumulative Layout Shift. القيمة الافتراضية هي <code>true</code>. ويضبط Next.js خطك البديل تلقائيًا على <code>Arial</code> أو <code>Times New Roman</code> حسب نوع الخط، أي serif أو sans-serif على التوالي.</p>
<p>وبالنسبة إلى <code>@next/font/local</code>، تكون هذه قيمة نصية أو القيمة المنطقية <code>false</code>، وتحدد ما إذا كان ينبغي استخدام خط بديل تلقائي لتقليل Cumulative Layout Shift. والقيم الممكنة هي <code>Arial</code> أو <code>Times New Roman</code> أو <code>false</code>. والقيمة الافتراضية هي <code>Arial</code>. وإذا أردت استخدام خط serif، ففكر في ضبط هذه القيمة على <code>Times New Roman</code>.</p>
<p><strong>تحسين Google Fonts</strong></p>
<p>إذا لم يكن استخدام مكوّن Font في Next.js خيارًا متاحًا، فهناك طريقة أخرى لاستخدام هذه الميزة مع Google Fonts عبر علم <code>optimizeFonts</code>. وتكون ميزة <code>optimizeFonts</code> في Next.js مفعّلة افتراضيًا. تضمّن هذه الميزة CSS الخاص بـ Google Font داخل استجابة HTML. وفعلًا، يمكنك أيضًا تفعيل ميزة ضبط الخطوط البديلة عبر ضبط علم <code>experimental.adjustFontFallbacksWithSizeAdjust</code> في <code>next</code></p>
<p>مع مكوّن <code>@next/font</code>، يمكنك أيضًا استيراد خطوط مخصصة إلى صفحاتك. لاستخدام خط مخصص، عليك أولًا رفع ملفات الخط إلى دليل <code>public</code>. بعد ذلك، يمكنك استخدام قاعدة CSS ‏<code>@font-face</code> لتعريف عائلة الخط ومصادره.</p>
<p>إليك مثالًا على استخدام خط مخصص مع مكوّن <code>@next/font</code>:</p>
<pre><code>// In your component
import { MyCustomFont } from &quot;@next/font/local&quot;;

const myCustomFont = MyCustomFont({
  weight: &quot;normal&quot;,
  src: 'url(&quot;/fonts/MyCustomFont.woff2&quot;) format(&quot;woff2&quot;)',
});

export default function MyComponent() {
  return (
    &amp;#x3C;div className={myCustomFont.className}&gt;
      &amp;#x3C;h1&gt;Hello World&amp;#x3C;/h1&gt;
    &amp;#x3C;/div&gt;
  );
}
</code></pre>
<pre><code>// In your CSS
@font-face {
  font-family: &quot;MyCustomFont&quot;;
  font-weight: normal;
  src: url(&quot;/fonts/MyCustomFont.woff2&quot;) format(&quot;woff2&quot;);
}
</code></pre>
<p>مع مكوّن <code>@next/font</code>، يمكنك أيضًا تحسين تحميل الخطوط بتحميل الخطوط المطلوبة في الصفحة فقط. ولأجل ذلك، يمكنك استخدام Font Observer API للكشف عند الحاجة إلى خط في الصفحة وتحميله بصورة ديناميكية.</p>
<p>إليك مثالًا على استخدام Font Observer API مع مكوّن <code>@next/font</code>:</p>
<pre><code>// In your component
import { useFontObserver } from &quot;@next/font&quot;;

export default function MyComponent() {
  const [isFontReady, fontClassName] = useFontObserver(&quot;Inter&quot;, {
    weight: &quot;400&quot;,
    subsets: [&quot;latin&quot;],
  });

  return (
    &amp;#x3C;div className={fontClassName}&gt;
      {isFontReady ? (
        &amp;#x3C;h1&gt;Hello World&amp;#x3C;/h1&gt;
      ) : (
        &amp;#x3C;h1 style={{ fontFamily: &quot;sans-serif&quot; }}&gt;Hello World&amp;#x3C;/h1&gt;
      )}
    &amp;#x3C;/div&gt;
  );
}
</code></pre>
<p>في هذا المثال، يُستخدم خطاف <code>useFontObserver</code> للكشف عن الوقت الذي يحتاج فيه خط <code>Inter</code> بوزن 400 ومجموعة فرعية لاتينية إلى الاستخدام في الصفحة. ويعيد الخطاف قيمة منطقية تبين ما إذا كان الخط جاهزًا للاستخدام، واسم <code>class</code> للخط يمكن تطبيقه على المكوّن.</p>
<p>إذا لم يكن الخط جاهزًا بعد، يعرض المكوّن خطًا بديلًا باستخدام خاصية CSS ‏<code>fontFamily</code>. وعندما يصبح الخط جاهزًا، يعرض المكوّن النص بخط <code>Inter</code>.</p>
<p>باختصار، يوفر مكوّن <code>@next/font</code> طريقة سهلة لتحسين الخطوط البديلة في تطبيق Next.js. وباستخدام هذا المكوّن، يمكنك تحسين الأداء وتجربة المستخدم في تطبيق الويب من خلال تحميل الخطوط الضرورية فقط وتقليل Cumulative Layout Shift الناتج عن تحميل الخطوط.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>يمكن لـ <code>next/image</code> و<code>next/script</code> و<code>next/font</code> أن يكون لها تأثير كبير في تحسين Core Web Vitals. فإذا كنت تبني تطبيق Next.js وتريد ضمان تجربة ممتازة للمستخدم، ففكر في الاستفادة منها.</p>
`,r={book:e,chapter:t,chapterTitle:o,slug:n,title:c,headings:p,html:a};export{e as book,t as chapter,o as chapterTitle,r as default,p as headings,a as html,n as slug,c as title};
