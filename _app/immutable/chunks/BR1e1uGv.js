const e="patterns-dev",n="vanilla",t="أنماط JavaScript",o="view-transitions",i="تحريك انتقال العرض (view transition)",r=[{depth:2,id:"مقدمة-إلى-انتقال-العرض",text:"مقدمة إلى انتقال العرض"},{depth:2,id:"التنقل-بين-الصفحات",text:"التنقل بين الصفحات"},{depth:3,id:"مثال-مكون-react",text:"مثال مكون React"},{depth:3,id:"نهج-بديل-من-دون-انتقالات-العرض",text:"نهج بديل من دون انتقالات العرض"},{depth:3,id:"تحريك-تطبيقات-الصفحات-المتعددة-المعروضة-من-الخادم-باستخدام-turbo-وturn",text:"تحريك تطبيقات الصفحات المتعددة المعروضة من الخادم باستخدام Turbo وTurn"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],a=`<p><strong>ملاحظة:</strong> واجهة View Transitions API لتطبيقات الصفحة الواحدة متاحة في Chrome 111+.</p>
<h2 id="مقدمة-إلى-انتقال-العرض">مقدمة إلى انتقال العرض</h2>
<p>تقدّم <a href="https://developer.chrome.com/docs/web-platform/view-transitions/">View Transitions API</a> طريقة بسيطة لانتقال أي تغيير بصري في DOM من حالة إلى الحالة التالية. وقد يشمل ذلك تغييرات صغيرة مثل إظهار محتوى أو إخفائه، أو تغييرات أوسع مثل الانتقال من صفحة إلى أخرى. وفيما يلي <a href="https://astro-movies.pages.dev/">عرض توضيحي</a> لـ View Transitions API في تطبيق SPA (تطبيق صفحة واحدة) <a href="https://github.com/Charca/astro-movies">src</a>:</p>
<p>تتمركز واجهة JavaScript حول <code>document.startViewTransition(callback)</code>، حيث <code>callback</code> دالة تنشئ DOM عادةً ليحدّثه إلى الحالة الجديدة.</p>
<p>لنأخذ إظهار عنصر \`\` وإخفائه مثالًا بسيطًا:</p>
<pre><code>if (document.startViewTransition) {
  // (check for browser support)
  document.addEventListener(&quot;click&quot;, function (event) {
    if (event.target.matches(&quot;summary&quot;)) {
      event.preventDefault(); // (we'll toggle the element ourselves)
      const details = event.target.closest(&quot;details&quot;);
      document.startViewTransition(() =&gt; details.toggleAttribute(&quot;open&quot;));
    }
  });
}
</code></pre>
<p>يأخذ <code>document.startViewTransition</code> لقطة شاشة من DOM الحالي قبل استدعاء <code>callback</code>. وفي مثالنا، لا يفعل <code>callback</code> سوى تبديل السمة <code>open</code>. وبعد الاكتمال، يستطيع المتصفح الانتقال بين لقطة الشاشة الأولية والإصدار الجديد.</p>
<p>تُعرض النسختان القديمة والجديدة كعناصر زائفة، ويمكن الإشارة إليهما في CSS باستخدام <code>::view-transition-old(root)</code> و<code>::view-transition-new(root)</code> على الترتيب. وعلى سبيل المثال، لإبراز الانتقال، يمكننا إطالة <code>animation-duration</code> هكذا:</p>
<pre><code>::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 2s;
}
</code></pre>
<p>يمكن أيضًا لانتقالات العرض تحريك تغييرات متعددة بحركات أكثر تقدمًا تتجاوز التلاشي المتبادل الافتراضي. ومنح عناصر محددة اسم CSS خاصًا بـ<code>view-transition-name</code>، مع <code>containment</code> بقيمة <code>layout</code> أو <code>paint</code>، يمنح المطوّرين تحكمًا دقيقًا في كيفية انتقال العناصر، بما في ذلك عرضها وارتفاعها وموضعها. ويمكن لهذه الانتقالات المتقدمة أن تساعد فعليًا في توضيح التدفق من صفحة إلى أخرى.</p>
<p>لنأخذ <a href="https://charming-crumble-af45ba.netlify.app/">معرض الصور</a> مثالًا:</p>
<p>أوضح انتقال هو حجم الصورة وموضعها، إذ يتحقق تلقائيًا عند منح عنصر \`\` في كل صفحة الاسم الفريد نفسه <code>view-transition-name</code>، وقيمة CSS <code>containment</code> بقيمة <code>layout</code>. وفي هذا العرض التوضيحي، تكون أسماء <code>view-transition-name</code> مكتوبة مباشرة في سمتَي <code>style</code>، لكن يمكنك إضافتها ديناميكيًا أيضًا، مثلًا في معالج <code>onclick</code>، طالما كانت فريدة داخل الصفحة وأُضيفت قبل بدء الانتقال.</p>
<p>تحتاج تفاصيل الصورة أدناه إلى قدر قليل من التنسيق الإضافي. لاحظ أن هناك حركة منزلقة متدرجة للدخول أو الخروج لكل سطر في التفاصيل.</p>
<p>نمنح كل عنصر سطر اسم <code>view-transition-name</code> خاصًا به:</p>
<pre><code>figcaption h2 {
  contain: layout;
  view-transition-name: photo-heading;
}
figcaption div {
  contain: layout;
  view-transition-name: photo-location-time;
}
figcaption dl {
  contain: layout;
  view-transition-name: photo-meta;
}
</code></pre>
<p>يولّد ذلك <em>مجموعات انتقال</em> لكل منطقة، وهي مثل لقطات الشاشة الجديدة والقديمة التي ذُكرت سابقًا، لكنها تغطي جزءًا من الصفحة بدل المستند بأكمله. ومثلما يمكن استهداف عناصر انتقال المستند كاملًا باستخدام <code>::view-transition-old(root)</code> و<code>::view-transition-new(root)</code>، يمكن استهداف مجموعات الانتقال هذه باستخدام <code>::view-transition-old(NAME)</code> و<code>::view-transition-new(NAME)</code>. لاحظ أن نص التفاصيل غير موجود في صفحة شبكة الصور، لذلك عند الانتقال من الشبكة إلى صفحة الصورة، سيوجد فقط <code>::view-transition-new(NAME)</code>، <em>ولا يوجد</em> <code>::view-transition-old(NAME)</code>، والعكس عند الانتقال بالاتجاه الآخر. يمكننا استهداف هذه الحالات باستخدام الصنف الزائف <code>:only-child</code> وتخصيص الحركة. وبالنسبة إلى مجموعة <code>photo-heading</code>:</p>
<pre><code>/* Enter */
::view-transition-new(photo-heading):only-child {
  animation: 300ms ease 50ms both fade-in, 300ms ease 50ms both slide-up;
}

/* Exit */
::view-transition-old(photo-heading):only-child {
  animation: 200ms ease 150ms both fade-out, 200ms ease 150ms both slide-down;
}
</code></pre>
<p>هذه أساسيات الواجهة. يغطي <a href="https://developer.chrome.com/docs/web-platform/view-transitions">مقال Jake Archibald الرائع عن انتقال العرض</a> التفاصيل جيدًا. للآن، لنرَ كيف يمكننا تنفيذ انتقالات تنقل الصفحات كاملة.</p>
<h2 id="التنقل-بين-الصفحات">التنقل بين الصفحات</h2>
<p>يبدو التنقل المعتاد بين الصفحات كالتالي:</p>
<ul>
<li>ينقر المستخدم على رابط</li>
<li>يُرسل طلب (request) للحصول على البيانات</li>
<li>يُحدَّث DOM بالاستجابة (response)</li>
</ul>
<p>لتطبيق انتقال عرض على هذا التدفق، هناك اعتبارات بشأنها.</p>
<p>أولًا، يجب تقليل الوقت الذي تبقى فيه الشاشة متجمدة. ربما لاحظت من مثال الانتقال البطيء أعلاه أن DOM يصبح غير تفاعلي بعد بدء انتقال العرض حتى تكتمل <code>callback</code>. وإذا بدأنا الانتقال عندما ينقر المستخدم على الرابط، فقد ينتظر طويلًا أمام واجهة متجمدة. ولتقليل هذا الإزعاج، من المثالي استدعاء <code>document.startViewTransition</code> بعد اكتمال الطلب. بهذه الطريقة، نكون مستعدين للتغير، ويمكن تحديث DOM في أسرع وقت.</p>
<p>ثانيًا، نحتاج إلى التأكد من التقاط لقطة DOM الأولية قبل تحديث DOM. وعند العمل مع تنقل الصفحات في أطر خارجية، لا نملك تحكمًا كاملًا في عملية العرض (rendering)؛ فـDOM يُحدّث تلقائيًا عند وصول الاستجابة. لذلك لا يتوفر لدينا دالة مستقلة نمررها إلى <code>document.startViewTransition</code> لتحديث DOM بصورة مرتبة. قد نحتاج إلى اعتراض العرض وإيقافه ثم استئنافه لنوحي بأن لدينا دالة واحدة تحدّث DOM.</p>
<p>ولحسن الحظ، إذا أعدنا وعدًا من <code>callback</code> تحديث DOM، فستنتظر واجهة انتقال العرض حلّه قبل تنفيذ الحركة. يمكننا استخدام هذه الميزة لمعالجة مشكلات التوقيت المذكورة أعلاه.</p>
<h3 id="مثال-مكون-react">مثال مكون React</h3>
<p>لمعالجة المشكلات السابقة، سننشئ مكون صنف من React، لأن شرح التدفق أسهل منه مقارنة بمكون دالة. سنستخدم طرق دورة الحياة التالية للتحكم في العرض:</p>
<ul>
<li><code>shouldComponentUpdate</code>: سنعيد <code>false</code> هنا ونبدأ انتقال العرض؛ وهذا يتيح لنا بعض الوقت لاكتمال التقاط لقطة الشاشة</li>
<li><code>forceUpdate</code>: لإعادة عرض المكون يدويًا بعد التقاط لقطة الشاشة</li>
<li><code>componentDidUpdate</code>: لإخطار واجهة انتقال العرض بأن DOM قد حُدّث</li>
</ul>
<p>إليك الشكل:</p>
<pre><code>import { Component } from &quot;react&quot;;

export default class ViewTransition extends Component {
  shouldComponentUpdate() {
    if (!document.startViewTransition) return true; // skip when not supported

    document.startViewTransition(() =&gt; this.#updateDOM());
    return false; // don't update the component, we'll do this manually
  }

  #updateDOM() {
    // now we know the screenshot has been taken, we can force render
    // (which skips \`shouldComponentUpdate\`)
    this.forceUpdate();
    // set up a promise that will resolve when the component renders
    return new Promise((resolve) =&gt; {
      this.#rendered = resolve;
    });
  }

  render() {
    return this.props.children;
  }

  #rendered = () =&gt; {};

  componentDidUpdate() {
    // resolve the \`updateDOM\` promise to notify the View Transition API
    // that the DOM has been updated
    this.#rendered();
  }
}
</code></pre>
<p><strong>ملاحظة:</strong> كان <a href="https://beta.nextjs.org/docs/app-directory-roadmap">Next.js App Router</a> في نسخة تجريبية وقت كتابة هذا المقال، وقد تتغير أفضل الممارسات المحيطة به وبمجلد pages.</p>
<p>لاستخدامه في تطبيق Next.js، سنعطل أولًا وضع React الصارم في التطوير. يشغّل الوضع الصارم فحوصاته بعرض المكون مرتين. وهذا يتعارض مع تدفق العرض في <code>ViewTransition</code> أثناء التطوير، لذا سنعطله عالميًا ثم نعيد تفعيله للمكونات الفرعية بمكون <code>StrictMode</code>.</p>
<pre><code>// next.config.js
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;
</code></pre>
<p>بعد ذلك، في <code>pages/_app.js</code>، سنغلّف <code>Component</code> بمكونات <code>ViewTransition</code> و<code>StrictMode</code>، ونبدأ برؤية انتقالات متحركة:</p>
<pre><code>// pages/_app.js
import &quot;@/styles/globals.css&quot;;
import { StrictMode } from &quot;react&quot;;
import ViewTransition from &quot;@/components/ViewTransition&quot;;

export default function App({ Component, pageProps }) {
  return (
    &lt;ViewTransition&gt;
      &lt;StrictMode&gt;
        &lt;Component {...pageProps} /&gt;
      &lt;/StrictMode&gt;
    &lt;/ViewTransition&gt;
  );
}
</code></pre>
<p>شاهد <a href="https://frolicking-dusk-29be0a.netlify.app/">عرض Next.js التوضيحي</a>، و<a href="https://photography-view-transitions-nextjs.vercel.app/">عرض Next.js المباشر</a>، و<a href="https://github.com/domchristie/photography-view-transitions-nextjs">مصدره</a>.</p>
<p><strong>ملاحظة</strong>: تنصح وثائق React بعدم استخدام <code>shouldComponentUpdate</code> و<code>forceUpdate</code>، وتذكر أنهما ينبغي ألا يُستخدما إلا لتحسينات الأداء (performance)، وأن استدعاء <code>shouldComponentUpdate</code> غير مضمون. وبما أن حركات الصفحات تحسين إضافي، وأن هذا المكون سيعمل حتى لو لم يُستدعَ <code>shouldComponentUpdate</code>، فأنا مقبول مع هذا التحفظ.</p>
<h3 id="نهج-بديل-من-دون-انتقالات-العرض">نهج بديل من دون انتقالات العرض</h3>
<p>من عيوب View Transitions API اللازمة لانتقالات الصفحات أنها تحتاج إلى HTML الصفحة الجديدة قبل بدء الحركة. وقد يستغرق هذا وقتًا ويترك المستخدم بلا أي تغذية راجعة بعد نقره على رابط. وقد تملأ مؤشرات التحميل الفجوة، لكن يمكننا كسب بعض الوقت بتحريك العناصر خارج الشاشة فور نقر المستخدم على الرابط، ثم تحريك HTML الجديد إلى الداخل عند وصوله. وهذا مشابه لطريقة انتقال iOS القياسية، إذ تنزلق على الشاشة الفورية أثناء تحميل الشاشة التالية.</p>
<ul>
<li>ينقر المستخدم على رابط</li>
<li>تتحرك العناصر إلى الخارج؛ وفي هذه الأثناء يُرسل طلب البيانات</li>
<li>ننتظر اكتمال الاستجابة والحركات معًا</li>
<li>تتحرك الاستجابة إلى الداخل</li>
</ul>
<p>الفرق الرئيسي بين هذا النهج ونهج View Transitions API أنه لا يستطيع <em>انتقال</em> العناصر من حالة إلى الحالة التالية، لأنه عند تحريكها إلى الخارج لا يملك HTML الجديد بعد.</p>
<p>كلا النهجين مفيد حسب الحالة. على سبيل المثال، إذا كانت هناك عناصر مشتركة من صفحة إلى أخرى، فقد تختار انتقال عرض. أما إذا كان التغيير كبيرًا مع وجود عناصر مشتركة قليلة، فقد تستفيد من التغذية الراجعة الفورية للحركة الخارجة.</p>
<p>لتنفيذ ذلك، سنحتاج إلى الارتباط بأحداث التوجيه، وسيعتمد ذلك على الإطار أو المكتبة التي تستخدمها. على وجه الخصوص، سنحتاج إلى إشعارنا عندما ينتقل المستخدم. ومع Next.js، يمكننا استخدام <a href="https://nextjs.org/docs/api-reference/next/router#routerevents">حدث الموجّه <code>routeChangeStart</code></a> لبدء حركات الخروج، لكن لنرَ كيف يمكننا تحقيق ذلك <em>من دون</em> Next.js أو React أو HTML معروض بالكامل على العميل (client).</p>
<h3 id="تحريك-تطبيقات-الصفحات-المتعددة-المعروضة-من-الخادم-باستخدام-turbo-وturn">تحريك تطبيقات الصفحات المتعددة المعروضة من الخادم باستخدام Turbo وTurn</h3>
<p><strong>ملاحظة:</strong> هناك خطط لتعمل View Transition API مع التنقل متعدد الصفحات، أي من دون JavaScript. لكن قد تبقى واجهة JavaScript ضرورية للانتقالات الأكثر تقدمًا.</p>
<p>يقدم <a href="https://turbo.hotwired.dev/">Turbo</a>، وهو جزء من مجموعة مكتبات <a href="https://hotwired.dev/">Hotwire</a> (لا ينبغي الخلط بينه وبين <a href="https://turbo.build/">Turbo من Vercel</a>)، نهج عرض يحسّن تطبيقات الصفحات المتعددة (MPAs) تدريجيًا. ويهدف إلى تحقيق سرعة SPA من دون الحاجة إلى هندسة شيفرتك كتطبيق معروض بالكامل على العميل (client)، وذلك من خلال التقاط نقرات الروابط وإرسال النماذج، وتنفيذ الطلب باستخدام JavaScript، واستبدال <code> بـ</code> الجديد من الاستجابة. وهكذا، إنه نهج هجين: يُنشأ HTML على الخادم (server)، لكن يُحدّث DOM عبر JavaScript.</p>
<p><a href="https://github.com/domchristie/turn">Turn</a> مكتبة لتحريك التنقل بين الصفحات باستخدام Turbo. وهي تدعم منهجَي الحركة، رغم أن انتقالات العرض تجريبية حاليًا. يضيف Turn الصنفين <code>turn-before-exit</code> و<code>turn-exit</code> و<code>turn-enter</code> إلى عنصر \`\` في الأوقات المناسبة، مما يتيح للمطورين تخصيص الحركات.</p>
<p>لتشغيله، أضف السمتين <code>data-turn-exit</code> و<code>data-turn-enter</code> إلى العناصر التي تريد تحريكها، ثم طبّق أنماط CSS. على سبيل المثال، لحركة التلاشي عند الدخول والخروج:</p>
<pre><code>html.turn-exit [data-turn-exit] {
  animation-name: fade-out;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

html.turn-enter [data-turn-enter] {
  animation-name: fade-in;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</code></pre>
<p>استورد مكتبة <code>Turn</code> إلى JavaScript في تطبيقك، ثم استدعِ <code>Turn.start()</code>.</p>
<p>يعمل عبر الارتباط بأحداث عرض Turbo والتحكم في التدفق حسب الحاجة:</p>
<ul>
<li><code>turbo:visit</code>: قبل بدء الطلب مباشرة، أضف الصنف <code>turn-exit</code></li>
<li><code>turbo:before-render</code>: بعد اكتمال الطلب وقبل عرض HTML الجديد (شبيه بـ<code>shouldComponentUpdate</code> في React)، أوقف العرض وانتظر اكتمال حركات الخروج</li>
<li><code>turbo:render</code>: بعد عرض HTML الجديد، أزل صنف <code>turn-exit</code> وأضف صنف <code>turn-enter</code></li>
<li>بمجرد اكتمال حركات الخروج، أزل صنف <code>turn-enter</code></li>
</ul>
<p>كما يدعم Turn انتقالات العرض تجريبيًا، ويُفعّل بضبط <code>Turn.config.experimental.viewTransitions = true</code>. وسيستخدم انتقالات العرض حيث كانت مدعومة، ويعود إلى نهج حركة CSS. (استكشاف كيفية تفعيل النهج حالةً بحالة عمل جارٍ :)</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>يمكن أن تكون انتقالات الصفحات وسيلة فعالة للإبلاغ عن التغييرات من صفحة إلى أخرى. ويمكن لواجهة View Transitions API المدمجة الجديدة تنفيذ انتقالات معقدة عند تزويدها بالحالتين القديمة والجديدة. ومن خلال الارتباط بأحداث الإطار، يمكننا إبلاغ الواجهة بتغييرات الحالة هذه. وبالنسبة إلى تنقل الصفحات، من المثالي أن تحدث الانتقالات بعد انتهاء الطلب لتجنب بقاء DOM في حالة خاملة.</p>
<p>الأسلوب البديل، أو التكميلي، هو تنفيذ حركات الخروج فور أن ينقر المستخدم على رابط. وتفيد هذه الطريقة في كسب بعض الوقت ليكتمل الطلب قبل وصول HTML الجديد.</p>
<h4>Dom Christie</h4>
<p>مهندس برمجيات</p>
<p>Twitter</p>
<p>الموقع</p>
<p>Github</p>
`,d={book:e,chapter:n,chapterTitle:t,slug:o,title:i,headings:r,html:a};export{e as book,n as chapter,t as chapterTitle,d as default,r as headings,a as html,o as slug,i as title};
