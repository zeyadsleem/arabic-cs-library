const t="patterns-dev",e="react",n="أنماط React وNext.js",o="hoc-pattern",c="نمط المكوّن من رتبة عليا (HOC)",r=[{depth:2,id:"مشهد-يحفز-الحاجة-إلى-هذا-النمط",text:"مشهد يحفّز الحاجة إلى هذا النمط"},{depth:2,id:"بناء-أول-hoc-الخاص-بك",text:"بناء أول HOC الخاص بك"},{depth:2,id:"إضافة-السلوك-لا-مجرد-الآثار-الجانبية",text:"إضافة السلوك، لا مجرد الآثار الجانبية"},{depth:2,id:"تركيب-hocs",text:"تركيب HOCs"},{depth:2,id:"الفخاخ-في-الإنتاج",text:"الفخاخ في الإنتاج"},{depth:3,id:"تعارضات-أسماء-الخصائص",text:"تعارضات أسماء الخصائص"},{depth:3,id:"الدوال-الساكنة-والمراجع-لا-تمر-عبر-الغلاف",text:"الدوال الساكنة والمراجع لا تمر عبر الغلاف"},{depth:3,id:"جحيم-الغلافات",text:"جحيم الغلّافات"},{depth:3,id:"hocs-ومصرف-react",text:"HOCs ومصرّف React"},{depth:2,id:"متى-لا-تستخدم-hoc",text:"متى لا تستخدم HOC"},{depth:2,id:"البديل-الحديث-الخطافات-المخصصة",text:"البديل الحديث: الخطافات المخصصة"},{depth:2,id:"دراسة-حالة-واقعية-react-redux",text:"دراسة حالة واقعية: React Redux"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],a=`<h2 id="مشهد-يحفز-الحاجة-إلى-هذا-النمط">مشهد يحفّز الحاجة إلى هذا النمط</h2>
<p>لديك قاعدة شيفرة React واسعة النطاق. تحتاج كل شاشة إلى إطلاق حدث تحليلي عند التركيب (mount)، لكن فقط عندما يكون المستخدم الحالي قد وافق على التتبّع. رشّ هذا المنطق في كل مكوّن صفحة سيكون مكررًا وسهل النسيان وكارثةً حين تتحدّث حزمة التحليلات.</p>
<p>نمط المكوّن من رتبة عليا (Higher-Order Component، HOC) هو أحد أقدم الحلول في React لمعالجة هذه المشكلات العابرة للطبقات. المكوّن من رتبة عليا مجرد دالة: يقبل مكوّنًا ويعيد مكوّنًا جديدًا يلفّ المكوّن الأصلي بسلوك إضافي. فكّر فيه كأنّه مزخرف (decorator) للمكوّنات.</p>
<pre><code>// The shape of every HOC
type HOC&lt;P&gt; = (Wrapped: React.ComponentType&lt;P&gt;) =&gt; React.ComponentType&lt;P&gt;;
</code></pre>
<p>لا يحتاج المكوّن الملفوف إلى معرفة أي شيء عن السلوك الذي يضيفه HOC. هذا الفصل هو جوهر الأمر كله: يركّز مكوّن <code>Page</code> على العرض، ويتولى <code>withAnalytics(Page)</code> التتبّع بهدوء.</p>
<blockquote>
<p><strong>تنبيه:</strong> في قاعدة شيفرة جديدة تمامًا، ستستخدم عادةً خطافًا مخصصًا (custom hook) قبل HOC. لا يزال هذا النمط حاضرًا في شيفرة الإنتاج طويلة العمر (<code>withAuth</code> و<code>withTranslation</code> و<code>withRouter</code> و<code>connect</code> من React Redux)، ولذلك يستحق الفهم العميق حتى لو كتبت القليل منه بنفسك. سنغطي البدائل الحديثة في نهاية هذه المقالة.</p>
</blockquote>
<h2 id="بناء-أول-hoc-الخاص-بك">بناء أول HOC الخاص بك</h2>
<p>لننفّذ <code>withAnalytics</code>. ينبغي له أن:</p>
<ul>
<li>يُطلق حدث <code>page_view</code> عند تركيب المكوّن الملفوف للمرة الأولى.</li>
<li>يقبل <code>eventName</code> حتى يمكن إعادة استخدام HOC نفسه لأي شاشة.</li>
<li>يمرّر كل خاصية إلى المكوّن الملفوف دون تغيير.</li>
</ul>
<pre><code>import { useEffect } from &quot;react&quot;;
import { track } from &quot;./analytics&quot;;

export function withAnalytics&lt;P extends object&gt;(
  Wrapped: React.ComponentType&lt;P&gt;,
  eventName: string,
) {
  function WithAnalytics(props: P) {
    useEffect(() =&gt; {
      track(eventName, { path: window.location.pathname });
    }, []);

    return &lt;Wrapped {...props} /&gt;;
  }

  // Helpful in React DevTools
  WithAnalytics.displayName = \`withAnalytics(\${
    Wrapped.displayName ?? Wrapped.name ?? &quot;Component&quot;
  })\`;

  return WithAnalytics;
}
</code></pre>
<p>الاستخدام عبارة عن سطر واحد عند التصدير:</p>
<pre><code>function CheckoutPage(props: CheckoutPageProps) {
  return &lt;main&gt;{/* ...checkout UI... */}&lt;/main&gt;;
}

export default withAnalytics(CheckoutPage, &quot;checkout_viewed&quot;);
</code></pre>
<p>هناك بعض التفاصيل التي يوضحها المثال أعلاه وستنسخها في كل HOC تكتبه تقريبًا:</p>
<ul>
<li><strong>التعميمات (generics) على الخصائص.</strong> يقيّد <code>P extends object</code> أنواع المكوّن الملفوف. يحصل مستهلكو <code>withAnalytics(CheckoutPage, ...)</code> على IntelliSense كامل لـ<code>CheckoutPageProps</code>.</li>
<li><strong><code>displayName</code> لأغراض التصحيح.</strong> من دونه، تعرض React DevTools شجرة مليئة بالغلّافات مجهولة الهوية، وهي مشكلة «ما الذي أنظر إليه؟» تحديدًا التي يفترض أن يتجنبها هذا النمط.</li>
<li><strong>نشر <code>{...props}</code> في النهاية (أو في البداية، عن قصد).</strong> الترتيب الذي تنشر به الخصائص يحدّد أيهما يفوز عند التعارض. نتناول هذه الفخ أكثر من ذلك.</li>
</ul>
<h2 id="إضافة-السلوك-لا-مجرد-الآثار-الجانبية">إضافة السلوك، لا مجرد الآثار الجانبية</h2>
<p>يصبح HOCs أكثر إثارة للاهتمام عندما يحقن خصائص (props) يستطيع المكوّن الملفوف قراءتها. يعد <code>withFeatureFlag</code> مثالًا كلاسيكيًا: يوفّر متغيرين من المكوّن، ويدع HOC يقرّر أيّهما يُعرض استنادًا إلى خدمة رايات بعيدة.</p>
<pre><code>import { useFlag } from &quot;./flagsClient&quot;;

export function withFeatureFlag&lt;P extends object&gt;(
  flagKey: string,
  Treatment: React.ComponentType&lt;P&gt;,
  Control: React.ComponentType&lt;P&gt;,
) {
  return function WithFeatureFlag(props: P) {
    const enabled = useFlag(flagKey);
    return enabled ? &lt;Treatment {...props} /&gt; : &lt;Control {...props} /&gt;;
  };
}

// At the call site:
export const PricingPage = withFeatureFlag(
  &quot;pricing_redesign_2025&quot;,
  PricingPageNew,
  PricingPageLegacy,
);
</code></pre>
<p>لاحظ أن <code>withFeatureFlag</code> لا يعرض أي شيء بنفسه. فهو محضّر تبديل (switch). هذا مقبول؛ إذ يمكن أن يكون «السلوك الإضافي» في HOC أثرًا جانبيًا، أو خاصية محقونة، أو عرضًا شرطيًا، أو الثلاثة معًا.</p>
<h2 id="تركيب-hocs">تركيب HOCs</h2>
<p>الغرض الكامل من هذا النمط هو أن HOCs مجرد دوال، والدوال قابلة للتركيب. تبدو طبقة إنتاجية شائعة بالشكل الآتي:</p>
<pre><code>export default withErrorBoundary(
  withAuthorization(
    withAnalytics(CheckoutPage, &quot;checkout_viewed&quot;),
    { requiredRole: &quot;customer&quot; },
  ),
  { fallback: &lt;SomethingWentWrong /&gt; },
);
</code></pre>
<p>فور بدء تداخل ثلاثة أو أربعة منها، يصبح موضع الاستدعاء صعب القراءة. وفي ما يلي طريقتان شائعتان لتنظيفه:</p>
<pre><code>// 1. Pipe-style composition with a tiny helper
const compose =
  (...hocs) =&gt;
  (Component) =&gt;
    hocs.reduceRight((acc, hoc) =&gt; hoc(acc), Component);

export default compose(
  withErrorBoundary({ fallback: &lt;SomethingWentWrong /&gt; }),
  withAuthorization({ requiredRole: &quot;customer&quot; }),
  withAnalyticsEvent(&quot;checkout_viewed&quot;),
)(CheckoutPage);
</code></pre>
<pre><code>// 2. A decorator-like factory: each HOC takes its config first,
//    returns the actual (Component) =&gt; Component function.
const withAnalyticsEvent = (eventName: string) =&gt;
  &lt;P extends object&gt;(C: React.ComponentType&lt;P&gt;) =&gt;
    withAnalytics(C, eventName);
</code></pre>
<p>شاع هذا الأسلوب عبر المكتبة <a href="https://github.com/acdlite/recompose"><code>recompose</code></a>. ويوصي ملف README الخاص بها الآن باستخدام الخطافات (hooks) للشيفرة الجديدة، وقد توقّفت صيانة الحزمة منذ سنوات، وهي إشارة مفيدة إلى المكان الذي تبوأه مجتمع React.</p>
<h2 id="الفخاخ-في-الإنتاج">الفخاخ في الإنتاج</h2>
<p>يحتوي نمط HOC على عدد قليل من أنماط الفشل التي يسهل الوقوع فيها. معرفتها أكثر فائدة من حفظ النمط نفسه.</p>
<h3 id="تعارضات-أسماء-الخصائص">تعارضات أسماء الخصائص</h3>
<p>إذا كان HOC الخاص بك يحقن خاصية تحمل الاسم نفسه الذي يمرّره أحد الوالدين، فهناك خاسر. يعتمد السلوك على ترتيب نشر الخصائص:</p>
<pre><code>function withTheme&lt;P extends { theme?: Theme }&gt;(Wrapped: React.ComponentType&lt;P&gt;) {
  return (props: Omit&lt;P, &quot;theme&quot;&gt;) =&gt; {
    const theme = useTheme();
    // Parent-supplied props win because they are spread last
    return &lt;Wrapped theme={theme} {...(props as P)} /&gt;;
  };
}
</code></pre>
<p>في قاعدة شيفرة صغيرة، هذا مقبول. وفي قاعدة كبيرة، فضّل وضع الخصائص المحقونة تحت خاصية نطاق مثل <code>analytics={...}</code> و<code>auth={...}</code> حتى تصبح التعارضات مستحيلة.</p>
<h3 id="الدوال-الساكنة-والمراجع-لا-تمر-عبر-الغلاف">الدوال الساكنة والمراجع لا تمر عبر الغلاف</h3>
<p>إن لف <code>MyComponent</code> بـHOC ينتج مكوّنًا جديدًا تمامًا. لن توجد أي دالة ساكنة مثل <code>MyComponent.fetchData</code> على الغلاف، ولن يمرّ إليه أي <code>ref</code> موجَّه، ما لم تتخذ إجراءات إضافية. استخدم <a href="https://react.dev/reference/react/forwardRef"><code>React.forwardRef</code></a> (أو انتظر سلوك React 19+ حيث يصبح <code>ref</code> مجرد خاصية في المكوّنات الدالية)، وأداة مثل <code>hoist-non-react-statics</code> إذا احتجت إليها.</p>
<h3 id="جحيم-الغلافات">جحيم الغلّافات</h3>
<p>يضيف كل HOC عقدة أخرى إلى شجرة المكوّنات. عادةً ما تكون ثلاث أو أربع طبقات مقبولة؛ أما عشر طبقات فيبدأ DevTools فيبدو كدمية روسية وتصبح آثار المكدس مستعصية على الفهم.</p>
<pre><code>&lt;WithRouter&gt;
  &lt;WithAuth&gt;
    &lt;WithTheme&gt;
      &lt;WithAnalytics&gt;
        &lt;CheckoutPage /&gt;
      &lt;/WithAnalytics&gt;
    &lt;/WithTheme&gt;
  &lt;/WithAuth&gt;
&lt;/WithRouter&gt;
</code></pre>
<p>هذا هو أكبر سبب وحيد جعل الخطافات المخصصة تحلّ إلى حد كبير محل HOCs في الشيفرة الجديدة: الخطاف لا يضيف أي عقدة إلى الشجرة.</p>
<h3 id="hocs-ومصرف-react">HOCs ومصرّف React</h3>
<p>يعمل <a href="https://react.dev/learn/react-compiler">مصرّف React</a> (المحسّن الذي كان يُعرف سابقًا باسم «React Forget») بأفضل صورة عندما يستطيع تحليل جسم المكوّن تحليلًا ساكنًا. تخفي الطبقات الكثيفة من HOCs المنطق خلف استدعاءات دوال معتمة، مما يمنح المصرّف قدرًا أقل من المادة للعمل عليها.</p>
<h2 id="متى-لا-تستخدم-hoc">متى لا تستخدم HOC</h2>
<p>استخدم أداة أخرى عندما:</p>
<ul>
<li><strong>يحتاج السلوك إلى تخصيص في كل موضع استدعاء.</strong> الخطاف أكثر صدقًا في ذلك؛ فهو يعيش داخل المكوّن ويظهر التخصيص من الأعلى إلى الأسفل.</li>
<li><strong>لا تحتاج إليه إلا في موضع أو موضعين.</strong> لا تبرر التكلفة الإضافية لـHOC (مكوّن إضافي وتوجيه إضافي) إلا عندما تكون إعادة الاستخدام حقيقية.</li>
<li><strong>تكون «المنطق المشترك» مجرد غلاف منسّق.</strong> هذا هو الغرض من التركيب باستخدام <code>children</code>؛ إذ تتفوق <code>{...}</code> على <code>withCard(...)</code> في كل مرة.</li>
<li><strong>تستخدمه لمشاركة الحالة (state).</strong> إن تجمع بين Context وخطاف مخصص (<code>const { user } = useAuth()</code>) فسيكون أوضح على نحو شبه دائم من <code>withAuth(Component)</code>.</li>
</ul>
<h2 id="البديل-الحديث-الخطافات-المخصصة">البديل الحديث: الخطافات المخصصة</h2>
<p>إليك فكرة <code>useFeatureFlag</code> نفسها، معادة صياغتها في صورة خطاف:</p>
<pre><code>function PricingPage(props: PricingPageProps) {
  const showRedesign = useFlag(&quot;pricing_redesign_2025&quot;);
  return showRedesign ? &lt;PricingPageNew {...props} /&gt; : &lt;PricingPageLegacy {...props} /&gt;;
}
</code></pre>
<p>الفروق لافتة:</p>
<ul>
<li>لا يوجد مكوّن غلاف، لذا لا توجد عقدة إضافية في الشجرة ولا حاجة إلى إدارة <code>displayName</code>.</li>
<li>منطق التفريع ظاهر <em>داخل</em> جسم المكوّن، مما يسهل العثور عليه وتنفيذه خطوة بخطوة في مصحّح الأخطاء.</li>
<li>الاستدلال على الأنواع في TypeScript تلقائي، ولا حاجة إلى تمارين تعميم معقدة للحفاظ على خصائص المكوّن الملفوف.</li>
</ul>
<p>تنص وثائق React على ذلك صراحةً: <em>«في معظم الحالات، تكون الخطافات (Hooks) كافية ويمكن أن تساعد على تقليل التداخل في شجرة المكوّنات.»</em> (<a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">reactjs.org</a>)</p>
<p>ومع ذلك، ما زالت HOCs تستحق مكانها في بعض المواقف:</p>
<ul>
<li><strong>واجهات مكتبات تحتاج إلى لف أي شكل من المكوّنات.</strong> يعمل <code>withTranslation</code> من <a href="https://react.i18next.com/">react-i18next</a> و<code>withRouter</code> الخاص بـReact Router (لا يزال مستخدمًا في قواعد شيفرة <code>v5</code>) من دون أن يضطر المستهلك إلى إعادة كتابة مكوّنه على هيئة دالة.</li>
<li><strong>المكوّنات الصنفية.</strong> إذا كنت تصون قاعدة شيفرة قديمة لا تزال تشحن مكوّنات صنفية، فـHOC هو الخيار المريح الوحيد لمشاركة المنطق معها.</li>
<li><strong>اللف بحدود خطأ أو حدود Suspense.</strong> لا يزال كليهما بحاجة إلى أن يوجد كمكوّن في الشجرة، لذا يُعدّ تغليف HOC معقولًا تمامًا عبر <code>withErrorBoundary</code>.</li>
</ul>
<h2 id="دراسة-حالة-واقعية-react-redux">دراسة حالة واقعية: React Redux</h2>
<p>يعد React Redux المثال المرجعي لاستخدام HOC في العالم الحقيقي. طوال عقد من الزمن، كانت طريقة منح مكوّن وصولًا إلى المخزن هي <a href="https://react-redux.js.org/api/connect"><code>connect</code></a>:</p>
<pre><code>function CartSummary({ itemCount, total, checkout }) {
  return (
    &lt;button onClick={checkout}&gt;
      Checkout ({itemCount}) — \${total}
    &lt;/button&gt;
  );
}

const mapState = (state) =&gt; ({
  itemCount: state.cart.items.length,
  total: selectCartTotal(state),
});

const mapDispatch = { checkout: checkoutAction };

export default connect(mapState, mapDispatch)(CartSummary);
</code></pre>
<p>إن <code>connect</code> مصنع HOC؛ فـ<code>connect(mapState, mapDispatch)</code> يعيد دالة تلتف مكوّنك. كانت هذه الواجهة المهيمنة في تطبيقات React من نحو 2015 إلى 2019.</p>
<p>بعد React 16.8، أطلقت React Redux واجهة قائمة على الخطافات. ويصبح المكوّن نفسه:</p>
<pre><code>function CartSummary() {
  const itemCount = useSelector((state) =&gt; state.cart.items.length);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  return (
    &lt;button onClick={() =&gt; dispatch(checkoutAction())}&gt;
      Checkout ({itemCount}) — \${total}
    &lt;/button&gt;
  );
}
</code></pre>
<p>لا يزال <code>connect</code> يعمل ومن المرجح ألّا يُحذف أبدًا، لأن هناك قدرًا كبيرًا من الشيفرة في العالم الحقيقي، لكن كل مثال في وثائق Redux الحديثة يستخدم صيغة الخطاف. هذا الاتجاه نموذجي: تقدّم مكتبة ناجحة HOC، ثم تطلق نسخة قائمة على الخطافات بعد انتشار الخطافات بوصفها الطريقة المعتادة، ثم توصي بهدوء باستخدام الخطاف في الشيفرة الجديدة.</p>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>HOC دالة تأخذ مكوّنًا وتعيد مكوّنًا جديدًا مدمجًا فيه سلوك إضافي.</li>
<li>استخدمه لـ<strong>الاهتمامات العابرة للطبقات غير المخصصة</strong>، مثل المصادقة والتحليلات وحدود الأخطاء ورايات الميزات والقياسات، عبر مواضع استدعاء كثيرة.</li>
<li>اضبط <code>displayName</code> دائمًا، وقرّر استراتيجية للتعامل مع تعارض الخصائص، وفكّر في توجيه المراجع قبل شحن HOC داخل مكتبة.</li>
<li>فضّل الخطاف المخصص عندما يُستهلك المنطق في موضع أو موضعين فقط، أو عندما يحتاج المستهلك إلى تخصيصه.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://legacy.reactjs.org/docs/higher-order-components.html">المكوّنات من رتبة عليا — React (الوثائق القديمة)</a></li>
<li><a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة</a></li>
<li><a href="https://react-redux.js.org/api/connect"><code>connect</code> — React Redux</a></li>
<li><a href="https://react.dev/learn/react-compiler">مصرّف React</a></li>
</ul>
`,i={book:t,chapter:e,chapterTitle:n,slug:o,title:c,headings:r,html:a};export{t as book,e as chapter,n as chapterTitle,i as default,r as headings,a as html,o as slug,c as title};
