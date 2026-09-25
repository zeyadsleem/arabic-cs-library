const t="patterns-dev",n="react",e="أنماط React وNext.js",o="progressive-hydration",i="الترطيب التدريجي",r=[{depth:2,id:"ما-الذي-يكلفه-التنفيذ-دفعة-واحدة-فعليا",text:"ما الذي يكلّفه التنفيذ «دفعة واحدة» فعليًا"},{depth:2,id:"شكل-التقنية",text:"شكل التقنية"},{depth:2,id:"الترطيب-الانتقائي-خط-الأساس-المدمج",text:"الترطيب الانتقائي: خط الأساس المدمج"},{depth:2,id:"الترطيب-المعتمد-على-الظهور",text:"الترطيب المعتمد على الظهور"},{depth:2,id:"الترطيب-المعتمد-على-التفاعل-ارطب-عند-المرور-ارطب-عند-النقر",text:"الترطيب المعتمد على التفاعل («ارطّب عند المرور»، «ارطّب عند النقر»)"},{depth:2,id:"انتقالات-react-19-تساعد-هنا-أيضا",text:"انتقالات React 19 تساعد هنا أيضًا"},{depth:2,id:"مكونات-react-الخادمية-مخرج-آخر-للترطيب",text:"مكوّنات React الخادمية: مخرج آخر للترطيب"},{depth:2,id:"ما-الذي-ينبغي-قياسه",text:"ما الذي ينبغي قياسه"},{depth:2,id:"شجرة-القرار",text:"شجرة القرار"}],l=`<p>الصفحة المعروضة في الخادم تُرسم بسرعة. يظهر HTML على الشاشة قبل تشغيل أي شيفرة React بوقت طويل. لكن الصفحة لا تصبح <em>تفاعلية</em> إلا بعد أن ينزّل React حزمة JS ويمر على DOM كامل ويطابق كل عقدة بمكوّن ويربط مستمعي الأحداث. تحدث هذه الخطوة — وهي الترطيب (hydration) — دفعة واحدة بصورة متزامنة، وتنمو خطيًا مع حجم شجرة المكوّنات.</p>
<p>النتيجة وضع فشل مألوف: تبدو صفحة كاملة على الشاشة لمدة نصف ثانية أو أكثر، فتفقد النقرات وتبدو معطلة. والمقياس الذي يستخدمه Google لقياس ذلك هو <strong>Interaction to Next Paint (INP)</strong>، الذي حل محل First Input Delay في Core Web Vitals في مارس 2024. ويعد الترطيب أحد أكبر المساهمين في درجات INP السيئة على المواقع التي بُنيت جيدًا بخلاف ذلك.</p>
<p>الترطيب التدريجي (progressive hydration) هو مجموعة التقنيات التي تقسّم الترطيب إلى أجزاء وتشغّل كل جزء في اللحظة التي تهم فيها فعلًا — عند وصول JavaScript الخاص به، أو عندما يمرره المستخدم إلى مجال الرؤية، أو عندما يحاول التفاعل معه. والهدف هو النتيجة نفسها للترطيب مع عمل أقل بكثير على المسار الحرج للصفحة.</p>
<h2 id="ما-الذي-يكلفه-التنفيذ-دفعة-واحدة-فعليا">ما الذي يكلّفه التنفيذ «دفعة واحدة» فعليًا</h2>
<p>لترسيخ المناقشة، إليك بعض الأرقام. على هاتف Android من الفئة المتوسطة لعام 2019:</p>
<ul>
<li>يستغرق تحليل 200 KB من JS المضغوط نحو 300–500 مللي ثانية.</li>
<li>يستغرق ترطيب صفحة متوسطة التعقيد —لنقل 1,500 عقدة React— نحو 150–300 مللي ثانية أخرى.</li>
<li>يظل الخيط الرئيسي محجوبًا طوال الوقت، ما يعني أن النقرات والتمرير وتحركات CSS تتلعثم أو تنتظر في طابور.</li>
</ul>
<p>إذا تم ترطيب القسم الرئيسي وشريط التنقل وعنصر دردشة مضمّن في التذييل معًا، فإن عنصر الدردشة — وهو الجزء الذي لا يلمسه أحد لمدة 30 ثانية — يكون جزءًا من ميزانية حجب INP لديك منذ لحظة تحميل الصفحة. وتفترض الترطيب التدريجي على أن هذا تصرف سخيف. ارطّب ما هو تفاعلي <em>الآن</em>، وأجّل الباقي.</p>
<h2 id="شكل-التقنية">شكل التقنية</h2>
<p>يحتاج نظام ترطيب تدريجي شامل إلى خمسة أمور:</p>
<ul>
<li>يعرض الخادم HTML الكامل لكل مكوّن، فلا ينقص المحتوى أثناء انتظار الترطيب.</li>
<li>تكون JavaScript الخاص بكل مكوّن في مقطع شيفرة مقسّم خاص به.</li>
<li>يعمل الترطيب لكل مقطع، وفق ترتيب محدد أو وفق محفّزات الاستخدام.</li>
<li>تبقى المناطق التي رُطّبت تفاعلية بينما لا تزال مناطق أخرى قيد الترطيب.</li>
<li>تظهر حالة تحميل مرئية وغير مزعجة عند الحاجة.</li>
</ul>
<p>تقدّم React 18 معظم هذه القدرات افتراضيًا. تعرض الأقسام التالية كيفية استخدامها.</p>
<h2 id="الترطيب-الانتقائي-خط-الأساس-المدمج">الترطيب الانتقائي: خط الأساس المدمج</h2>
<p>إذا كنت تستخدم <code>hydrateRoot</code> مع <code>بالفعل، فأنت تمارس أبسط أشكال الترطيب التدريجي. كل شجرة ملفوفة بـ</code> تُرطَّب <em>بشكل مستقل</em> عن بقية الصفحة. وإذا ضغط المستخدم داخل منطقة لم تُرطَّب بعد، فإن React يعيد ترتيب الأولويات؛ فتقفز تلك المنطقة إلى مقدمة الطابور.</p>
<pre><code>import { Suspense, lazy } from &quot;react&quot;;\\n
const ProductReviews = lazy(() =&gt; import(&quot;./ProductReviews&quot;));
const RelatedProducts = lazy(() =&gt; import(&quot;./RelatedProducts&quot;));
const Comments = lazy(() =&gt; import(&quot;./Comments&quot;));\\n
export default function ProductPage({ product }) {
  return (
    &lt;&gt;
      &lt;ProductDetails product={product} /&gt; {/* hydrates first */}\\n
      &lt;Suspense fallback={&lt;ReviewsSkeleton /&gt;}&gt;
        &lt;ProductReviews productId={product.id} /&gt;
      &lt;/Suspense&gt;\\n
      &lt;Suspense fallback={&lt;RelatedSkeleton /&gt;}&gt;
        &lt;RelatedProducts productId={product.id} /&gt;
      &lt;/Suspense&gt;\\n
      &lt;Suspense fallback={null}&gt;
        &lt;Comments productId={product.id} /&gt;
      &lt;/Suspense&gt;
    &lt;/&gt;
  );
}
</code></pre>
<p>النتيجة على الشبكة:</p>
<ul>
<li>يُرطَّب <code>ProductDetails</code> كجزء من الحزمة الرئيسية.</li>
<li>تجلب المناطق الثلاث الأخرى كل منها مقطعها الخاص وتُرطَّب عند وصوله.</li>
<li>إذا ضغط المستخدم على «نشر تعليق» قبل تحميل مقطع التعليقات، فإن React يحمّل ويَرطّب <em>تلك</em> المنطقة أولًا.</li>
</ul>
<p>هذا كافٍ لمعظم المواقع. لا تحتاج إلى مرطّب مخصص أو مكتبة خارجية — فاستخدام \`\` مع <code>lazy()</code> و<code>hydrateRoot</code> يمثل الآلية كاملة.</p>
<h2 id="الترطيب-المعتمد-على-الظهور">الترطيب المعتمد على الظهور</h2>
<p>بالنسبة إلى المحتوى أسفل الطية، يمكنك أن تفعل أفضل من «حمّله في وقت ما»؛ إذ يمكنك الانتظار حتى يمرره المستخدم فعلًا إلى مجال الرؤية. هذه الفكرة نفسها المستخدمة في التحميل الكسول للصور، لكن مطبقة على JavaScript.</p>
<p>إليك غلافًا صغيرًا لـ \`\` باستخدام <code>IntersectionObserver</code>:</p>
<pre><code>&quot;use client&quot;;
import { useState, useEffect, useRef, Suspense } from &quot;react&quot;;\\n
export function LazyHydrate({ children, rootMargin = &quot;200px&quot; }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);\\n
  useEffect(() =&gt; {
    if (visible) return;
    const node = ref.current;
    if (!node) return;\\n
    const observer = new IntersectionObserver(
      ([entry]) =&gt; {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () =&gt; observer.disconnect();
  }, [visible]);\\n
  return (
    &lt;div ref={ref}&gt;
      {visible ? &lt;Suspense fallback={null}&gt;{children}&lt;/Suspense&gt; : null}
    &lt;/div&gt;
  );
}
</code></pre>
<p>في Next.js، النسخة الأكثر ملاءمة هي <code>next/dynamic</code>:</p>
<pre><code>import dynamic from &quot;next/dynamic&quot;;\\n
const HeavyChart = dynamic(() =&gt; import(&quot;./HeavyChart&quot;), {
  loading: () =&gt; &lt;ChartSkeleton /&gt;,
});
</code></pre>
<p>يظل هذا العنصر معروضًا في الخادم افتراضيًا. استخدم <code>{ ssr: false }</code> لتخطي العرض في الخادم لمكونات تقيم في جانب العميل فعليًا، مثل خريطة Mapbox أو محرر شيفرة، مع السماح بتنزيل JavaScript وتنفيذه بعيدًا عن المسار الحرج.</p>
<h2 id="الترطيب-المعتمد-على-التفاعل-ارطب-عند-المرور-ارطب-عند-النقر">الترطيب المعتمد على التفاعل («ارطّب عند المرور»، «ارطّب عند النقر»)</h2>
<p>بالنسبة إلى واجهة قد يتعامل معها المستخدم — قائمة بحث منسدلة أو منتقي تاريخ أو قائمة معقدة — يمكنك تأخير تحميل المقطع نفسه حتى يبدّل المستخدم نية التفاعل. هذا ما ترسّخ له أطر عمل مثل Astro وQwik في <code>client:idle</code> و<code>client:visible</code> و<code>client:media</code> و<code>client:only</code>.</p>
<p>في تطبيق Next.js يمكنك محاكاته بغلاف صغير:</p>
<pre><code>&quot;use client&quot;;
import { useState, lazy, Suspense } from &quot;react&quot;;\\n
const SearchModal = lazy(() =&gt; import(&quot;./SearchModal&quot;));\\n
export function SearchTrigger() {
  const [open, setOpen] = useState(false);\\n
  return (
    &lt;&gt;
      &lt;button onClick={() =&gt; setOpen(true)}&gt;Search&lt;/button&gt;
      {open &amp;&amp; (
        &lt;Suspense fallback={&lt;p&gt;Loading search...&lt;/p&gt;}&gt;
          &lt;SearchModal onClose={() =&gt; setOpen(false)} /&gt;
        &lt;/Suspense&gt;
      )}
    &lt;/&gt;
  );
}
</code></pre>
<p>يُرطَّب زر بدء التشغيل كجزء من الحزمة الرئيسية لأنه صغير جدًا. أما النافذة المنبثقة — التي تحمل التبعيات الثقيلة، مثل مكتبة البحث الضبابي وحالة سجل البحث الأخير وبيانات القياس — فلا تُرسَل إلى العميل حتى يضغط المستخدم. تكلفة ترطيب أولية معدومة، وزمن استجابة صغير عند أول تفاعل.</p>
<h2 id="انتقالات-react-19-تساعد-هنا-أيضا">انتقالات React 19 تساعد هنا أيضًا</h2>
<p>ينافس الترطيب الخيط الرئيسي مع كل شيء آخر يفعله المتصفح. وقد استقرت في React 19 <strong>الانتقالات غير المتزامنة (async transitions)</strong> و<strong>الإجراءات (Actions)</strong>، وهما أداتان تمنحانك وسائل لمنع الترطيب من حجب التفاعل:</p>
<ul>
<li>ضع تحديثات الحالة الثقيلة في انتقالات باستخدام <code>startTransition</code> كي يتمكّن React من مقاطعتها.</li>
<li>تشغّل <code>Actions API</code> إرسال النماذج عبر انتقال تلقائيًا، لذا يظل النقر الذي يرسل نموذجًا مستجيبًا حتى عندما تكون المكوّنات المرتبطة ما تزال قيد الترطيب.</li>
<li>تتيح <code>useActionState</code> و<code>useFormStatus</code> معالجة نماذج ملائمة للتحسين التدريجي؛ إذ يعمل النموذج قبل تحميل JavaScript أصلًا.</li>
</ul>
<pre><code>&quot;use client&quot;;
import { useActionState } from &quot;react&quot;;
import { subscribeAction } from &quot;./actions&quot;;\\n
export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);\\n
  return (
    &lt;form action={formAction}&gt;
      &lt;input type=&quot;email&quot; name=&quot;email&quot; required /&gt;
      &lt;button disabled={isPending}&gt;
        {isPending ? &quot;Subscribing...&quot; : &quot;Subscribe&quot;}
      &lt;/button&gt;
      {state?.error &amp;&amp; &lt;p&gt;{state.error}&lt;/p&gt;}
    &lt;/form&gt;
  );
}
</code></pre>
<p>لأن <code>action</code> الخاص بالنموذج هو Server Action حقيقي، يظل النموذج قابلًا للإرسال حتى قبل ترطيب هذا المكوّن. ويوفر التحسين التدريجي خط أساس بلا ترطيب، بينما تتيح لك خطافات React 19 الارتقاء إلى تجربة تفاعلية غنية لاحقًا.</p>
<h2 id="مكونات-react-الخادمية-مخرج-آخر-للترطيب">مكوّنات React الخادمية: مخرج آخر للترطيب</h2>
<p>الشكل الأكثر عدوانية لـ«لا ترطّب هذا» هو «لا ترسل JavaScript الخاص به إطلاقًا». يُعرض مكوّن React الخادمي (server component) بالكامل على الخادم، ولا ينتج حزمة عميل، ولا يوجد ما يحتاج إلى ترطيب. تكلفة ترطيب RSC تساوي الصفر تمامًا.</p>
<pre><code>// app/page.tsx  -- Server Component by default
import ClientCounter from &quot;./ClientCounter&quot;;\\n
export default async function Home() {
  const posts = await db.posts.findMany();\\n
  return (
    &lt;main&gt;
      &lt;h1&gt;Latest posts&lt;/h1&gt;
      &lt;ul&gt;
        {posts.map((p) =&gt; &lt;li key={p.id}&gt;{p.title}&lt;/li&gt;)} {/* no client JS */}
      &lt;/ul&gt;
      &lt;ClientCounter /&gt; {/* the only thing that hydrates */}
    &lt;/main&gt;
  );
}
</code></pre>
<p>هذا هو التصور الذي ظل فريق React يدعو إليه: بدلًا من تحسين طريقة عمل الترطيب، ألغِه للأجزاء التي لا تحتاج إليه من الصفحة. اجمع بين RSC للأجزاء الساكنة والمعتمدة على البيانات وجزر <code>'use client'</code> للجزاء التفاعلية فعلًا، فتقلل الترطيب إلى جزء ضئيل جدًا من الصفحة.</p>
<h2 id="ما-الذي-ينبغي-قياسه">ما الذي ينبغي قياسه</h2>
<p>يكون الترطيب التدريجي غير مرئي إذا لم تقس الأشياء الصحيحة. تابع:</p>
<ul>
<li><strong>INP (Interaction to Next Paint)</strong> — المقياس الأهم. أي قيمة تقل عن 200 مللي ثانية جيدة، وما يزيد على 500 مللي ثانية سيئة.</li>
<li><strong>Total Blocking Time (TBT)</strong> في اختبارات المختبر، مثل Lighthouse وWebPageTest. ويظهر TBT المرتفع أثناء الترطيب هنا.</li>
<li><strong>Long Animation Frames (LoAF)</strong> — واجهة أحدث تكشف مهام JavaScript محددة التي تحجب الخيط الرئيسي.</li>
<li><strong>عدد بايتات JS لكل مسار</strong> — تابع حجم حزمة كل مسار في CI كي لا تتسلل حالات الانحدار.</li>
</ul>
<h2 id="شجرة-القرار">شجرة القرار</h2>
<p>لكل مكوّن في صفحة معروضة في الخادم:</p>
<ul>
<li>هل يحتاج إلى التفاعل أصلًا؟ إن لم يكن كذلك، اجعله مكوّنًا خادميًا أو HTML خالصًا.</li>
<li>هل هو أعلى الطية ومفيد فورًا؟ ارطّبه في الحزمة الرئيسية.</li>
<li>هل هو أسفل الطية，但从 المحتمل أن يُستخدم لاحقًا؟ استخدم <code>next/dynamic</code> أو الترطيب المعتمد على الظهور.</li>
<li>هل يشغله إجراء صريح من المستخدم، مثل نافذة منبثقة أو قائمة منسدلة؟ استخدم الترطيب المعتمد على التفاعل.</li>
<li>هل يتوقف تشغيله على مجال الرؤية أو الشبكة أو وسائط أخرى؟ استخدم توجيهات العميل الشرطية.</li>
</ul>
<p>طبق ذلك على كل منطقة في صفحتك، فتتقلص التكلفة الكلية للوصول إلى قابلية التفاعل بصورة هائلة. والترطيب التدريجي ليس ميزة مفردة بقدر ما هو موقف تصميمي: افترض أن الترطيب مكلف، وتعامل مع لحظة ترطيب كل مكوّن على أنها قرار لا وضع افتراضي.</p>
`,c={book:t,chapter:n,chapterTitle:e,slug:o,title:i,headings:r,html:l};export{t as book,n as chapter,e as chapterTitle,c as default,r as headings,l as html,o as slug,i as title};
