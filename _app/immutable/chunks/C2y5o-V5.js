const t="patterns-dev",e="react",n="أنماط React وNext.js",o="render-props-pattern",r="نمط خصائص العرض (render props)",i=[{depth:2,id:"مشهد-يحفز-الحاجة-إلى-هذا-النمط",text:"مشهد يحفّز الحاجة إلى هذا النمط"},{depth:2,id:"مثال-كامل-مدقق-نموذج-قابل-لإعادة-الاستخدام",text:"مثال كامل: مدقّق نموذج قابل لإعادة الاستخدام"},{depth:2,id:"صيغة-الأبناء-في-صورة-دالة",text:"صيغة «الأبناء في صورة دالة»"},{depth:2,id:"عدة-خصائص-عرض-في-مكون-واحد",text:"عدة خصائص عرض في مكوّن واحد"},{depth:2,id:"أين-تظل-خصائص-العرض-مفيدة",text:"أين تظل خصائص العرض مفيدة"},{depth:2,id:"متى-لا-تستخدم-خصائص-العرض",text:"متى لا تستخدم خصائص العرض"},{depth:2,id:"تحديث-خصائص-العرض-إلى-الصيغة-الحديثة-باستخدام-الخطافات",text:"تحديث خصائص العرض إلى الصيغة الحديثة باستخدام الخطافات"},{depth:2,id:"المفاضلات-في-لمحة",text:"المفاضلات في لمحة"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],d=`<h2 id="مشهد-يحفز-الحاجة-إلى-هذا-النمط">مشهد يحفّز الحاجة إلى هذا النمط</h2>
<p>أنت تبني <code>GeolocationProvider</code> لتطبيق الخرائط. يحتاج المزوّد إلى أن يطلب الإذن من المتصفح، ويشترك في تحديثات الموقع، ويتعامل مع الأخطاء عندما يكون المستخدم غير متصل، وينظّف المراقب عندما يفكّ المستهلك تركيب المكوّن. <em>المنطق</em> متطابق في كل مكان يظهر فيه داخل التطبيق، لكن واجهة المستخدم المحيطة به تختلف في كل شاشة: لافتة في صفحة، وعلامة خريطة في أخرى، ولوحة تشخيص مخفية أثناء التطوير.</p>
<p>كيف تنشر المنطق مرة واحدة وتترك لكل مستهلك أن يقرّر ما الذي يُعرض؟</p>
<p><strong>نمط خصائص العرض (render props)</strong> إحدى الإجابات. لا يقرّر المكوّن الذي يغلّف السلوك كيفية عرض النتيجة. بل يقبل دالة كخاصية، ويستدعي تلك الدالة بالبيانات المتوفرة لديه، ويعرض ما تعيده الدالة بصيغة JSX.</p>
<pre><code>type RenderProp&lt;T&gt; = (value: T) =&gt; React.ReactNode;

function Geolocation({ render }: { render: RenderProp&lt;GeoState&gt; }) {
  const state = useGeolocation(); // does the actual work
  return &lt;&gt;{render(state)}&lt;/&gt;;
}
</code></pre>
<p>يوصل المستهلك هذا المكوّن عند موضع الاستدعاء، ويقرّر شكل واجهة المستخدم في <em>هذه</em> الصفحة:</p>
<pre><code>&lt;Geolocation
  render={({ coords, error, status }) =&gt; {
    if (status === &quot;pending&quot;) return &lt;Spinner /&gt;;
    if (error) return &lt;PermissionPrompt error={error} /&gt;;
    return &lt;MapMarker lat={coords.latitude} lng={coords.longitude} /&gt;;
  }}
/&gt;
</code></pre>
<p>لا يلزم أن تسمى خاصية العرض باسم <code>render</code>. أي خاصية تكون قيمتها دالة تعيد JSX تنطبق عليها هذه القاعدة، سواء كانت <code>children</code> أو <code>renderItem</code> أو <code>renderEmpty</code> أو أي اسم آخر.</p>
<h2 id="مثال-كامل-مدقق-نموذج-قابل-لإعادة-الاستخدام">مثال كامل: مدقّق نموذج قابل لإعادة الاستخدام</h2>
<p>تخيّل مكوّنًا \`\` يملك القواعد وحالة (state) الحقول، لكنه يترك للصفحة المستدعية أن تقرّر شكل حقول الإدخال ورسائل الخطأ.</p>
<pre><code>import { useState } from &quot;react&quot;;

type Errors&lt;T&gt; = Partial&lt;Record&lt;keyof T, string&gt;&gt;;

type FormApi&lt;T&gt; = {
  values: T;
  errors: Errors&lt;T&gt;;
  isValid: boolean;
  setField: &lt;K extends keyof T&gt;(key: K, value: T[K]) =&gt; void;
  submit: () =&gt; void;
};

type Props&lt;T&gt; = {
  initialValues: T;
  validate: (values: T) =&gt; Errors&lt;T&gt;;
  onSubmit: (values: T) =&gt; void;
  children: (api: FormApi&lt;T&gt;) =&gt; React.ReactNode;
};

export function FormValidator&lt;T extends Record&lt;string, unknown&gt;&gt;({
  initialValues,
  validate,
  onSubmit,
  children,
}: Props&lt;T&gt;) {
  const [values, setValues] = useState&lt;T&gt;(initialValues);
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const setField = &lt;K extends keyof T&gt;(key: K, value: T[K]) =&gt;
    setValues((prev) =&gt; ({ ...prev, [key]: value }));

  const submit = () =&gt; {
    if (isValid) onSubmit(values);
  };

  return &lt;&gt;{children({ values, errors, isValid, setField, submit })}&lt;/&gt;;
}
</code></pre>
<p>المستهلك حر في عرض النموذج كيفما يشاء، سواء باستخدام نظام تصميم أو تخطيط مخصص أو غلاف معروض على الخادم أو أي شيء آخر:</p>
<pre><code>&lt;FormValidator
  initialValues={{ email: &quot;&quot;, password: &quot;&quot; }}
  validate={(v) =&gt; ({
    email: v.email.includes(&quot;@&quot;) ? undefined : &quot;Not an email&quot;,
    password: v.password.length &gt;= 8 ? undefined : &quot;Too short&quot;,
  })}
  onSubmit={(v) =&gt; signIn(v)}
&gt;
  {({ values, errors, isValid, setField, submit }) =&gt; (
    &lt;form
      onSubmit={(e) =&gt; {
        e.preventDefault();
        submit();
      }}
    &gt;
      &lt;TextField
        label=&quot;Email&quot;
        value={values.email}
        error={errors.email}
        onChange={(v) =&gt; setField(&quot;email&quot;, v)}
      /&gt;
      &lt;TextField
        label=&quot;Password&quot;
        type=&quot;password&quot;
        value={values.password}
        error={errors.password}
        onChange={(v) =&gt; setField(&quot;password&quot;, v)}
      /&gt;
      &lt;PrimaryButton type=&quot;submit&quot; disabled={!isValid}&gt;
        Sign in
      &lt;/PrimaryButton&gt;
    &lt;/form&gt;
  )}
&lt;/FormValidator&gt;
</code></pre>
<p>لاحظ أن <code>FormValidator</code> لا يعرض حقول الإدخال أو التسميات أو الأزرار. فهو منطق خالص مع منفذ عرض.</p>
<h2 id="صيغة-الأبناء-في-صورة-دالة">صيغة «الأبناء في صورة دالة»</h2>
<p>يستخدم المثال أعلاه أصلًا صيغة الأبناء في صورة دالة. وهي أكثر الصيغتين ملاءمة؛ إذ تختارها معظم المكتبات الحديثة لأن تمرير JSX بين وسمَي البداية والنهاية يُقرأ بطبيعية أكثر من خاصية <code>render={...}</code> الصريحة. والآلية متطابقة: <code>children</code> مجرد خاصية تكون قيمتها الدالة التي تمررها بين الوسمين.</p>
<p>سترى الصيغتين في الاستخدامات العملية:</p>
<pre><code>// Explicit render prop
&lt;Subscribe topic=&quot;orders&quot; render={(orders) =&gt; &lt;OrderList orders={orders} /&gt;} /&gt;

// children-as-function
&lt;Subscribe topic=&quot;orders&quot;&gt;
  {(orders) =&gt; &lt;OrderList orders={orders} /&gt;}
&lt;/Subscribe&gt;
</code></pre>
<p>تعرض بعض المكتبات، مثل Formik تاريخيًا و<a href="https://github.com/downshift-js/downshift">Downshift</a>، الصيغتين كلتيهما من أجل التوافق مع الإصدارات السابقة. اختر أسلوبًا واحدًا لكل قاعدة شيفرة والتزم به.</p>
<h2 id="عدة-خصائص-عرض-في-مكون-واحد">عدة خصائص عرض في مكوّن واحد</h2>
<p>يمكن أن يقبل المكوّن عدة خصائص عرض، تكون كل واحدة مسؤولة عن موضع مختلف. هذا في جوهره واجهة «مواضع» (slots) مكتوبة الأنواع:</p>
<pre><code>type ListProps&lt;T&gt; = {
  items: T[];
  renderItem: (item: T, index: number) =&gt; React.ReactNode;
  renderEmpty?: () =&gt; React.ReactNode;
  renderHeader?: () =&gt; React.ReactNode;
};

function List&lt;T&gt;({ items, renderItem, renderEmpty, renderHeader }: ListProps&lt;T&gt;) {
  if (items.length === 0) return &lt;&gt;{renderEmpty?.()}&lt;/&gt;;
  return (
    &lt;section&gt;
      {renderHeader?.()}
      &lt;ul&gt;{items.map((it, i) =&gt; &lt;li key={i}&gt;{renderItem(it, i)}&lt;/li&gt;)}&lt;/ul&gt;
    &lt;/section&gt;
  );
}
</code></pre>
<p>صمد هذا الأسلوب، الذي يعتمد على مواضع عرض صغيرة ومكتوبة أنواعها جيدًا، صمودًا أفضل من أغلفة خصائص العرض الاحادية. وهو في جوهره الأسلوب الذي تعمل به \`\` في React Native (<code>renderItem</code> و<code>ListEmptyComponent</code> و<code>ListHeaderComponent</code>) منذ سنوات.</p>
<h2 id="أين-تظل-خصائص-العرض-مفيدة">أين تظل خصائص العرض مفيدة</h2>
<p>في قاعدة شيفرة عام 2025، لم تعد خصائص العرض الأداة الافتراضية لمشاركة المنطق؛ أصبحت الخطافات (hooks) هي كذلك. لكن النمط يظل مفيدًا في بعض الحالات التي تواجه فيها الخطافات صعوبة:</p>
<ul>
<li><strong>المكوّنات التي تحتاج إلى امتلاك شجرة فرعية وإدراج JSX الخاص بالمستهلك فيها.</strong> فكّر في أغلفة السحب والإفلات مثل <a href="https://github.com/atlassian/react-beautiful-dnd"><code>react-beautiful-dnd</code></a>، التي تتيح لك وسيطي <code>provided</code> و<code>snapshot</code> لربطهما بـ JSX الخاص بك. يمكن للخطاف أن يوفّر لك الحالة، لكنه لا يستطيع التفاف JSX داخل حدود <code>/</code>.</li>
<li><strong>مكتبات المكوّنات بلا واجهة.</strong> تستخدم <a href="https://github.com/downshift-js/downshift">Downshift</a> و<a href="https://react-spectrum.adobe.com/react-aria/">React Aria</a> (واجهات <code>*Builder</code> فيها) و<a href="https://tanstack.com/table">TanStack Table</a> كلها خصائص العرض أو الأبناء في صورة دوال، حتى تتمكن من توفير <em>السلوك</em> (إمكانية الوصول، ومعالجة لوحة المفاتيح، وإدارة التركيز) من دون فرض ترميز محدد.</li>
<li><strong>عناصر الحركة الأساسية.</strong> يستخدم \`\` من <a href="https://www.framer.com/motion/">Framer Motion</a> و<code>Transition</code> من React Spring الأبناء في صورة دوال لتمرير القيم المستقيمة إلى JSX الخاص بك في كل إطار.</li>
</ul>
<p>القاسم المشترك: تتفوق خصائص العرض عندما يحتاج الغلاف إلى أن <em>يكون</em> جزءًا من شجرتك (لأنه يوفّر سياقًا أو مراجع أو بوابة) <em>وأيضًا</em> عندما يحتاج المستهلك إلى كتابة JSX داخله.</p>
<h2 id="متى-لا-تستخدم-خصائص-العرض">متى لا تستخدم خصائص العرض</h2>
<ul>
<li><strong>لمشاركة البيانات الخالصة.</strong> إذا لم يكن وجود مكوّن غلاف إلا لاستدعاء <code>props.children(data)</code>، فسيكون الخطاف المخصص أنظف على نحو شبه دائم. فـ<code>const data = useThing()</code> أفضل من <code>{(data) =&gt; ...}</code> من حيث سهولة القراءة.</li>
<li><strong>عندما تضطر إلى تداخل عدة منها.</strong> يصبح مكوّن <code>داخل مكوّن</code> سريعًا <a href="https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)">ألم أهرامات الاستدعاءات</a> التي صُممت الخطافات جزئيًا لحلها.</li>
<li><strong>عندما يعرض المستهلك الشيء نفسه دائمًا.</strong> هذا هو غرض المكوّن العادي مع الخصائص. لا تكلّف خصائص العرض ثمنها إلا عندما يختلف الناتج المعروض على نحو مشروع بين مواضع الاستدعاء.</li>
</ul>
<h2 id="تحديث-خصائص-العرض-إلى-الصيغة-الحديثة-باستخدام-الخطافات">تحديث خصائص العرض إلى الصيغة الحديثة باستخدام الخطافات</h2>
<p>شجعت معظم المكتبات التي روّجت لنمط خصائص العرض على إطلاق واجهة للخطافات إلى جانبها. ما زالت مكوّنات <code> و</code> في Apollo مصدَّرة، لكن الوثائق تبدأ الآن بـ<code>useQuery</code> و<code>useMutation</code>. واستبدل React Router مكوّن <code>بمكوّن</code> وخطافي <code>useParams</code> و<code>useLoaderData</code>. وانتقل مستخدمو Formik إلى حد كبير إلى واجهة React Hook Form التي تبدأ بالخطافات.</p>
<p>إليك مشكلة <code>Geolocation</code> نفسها في أعلى هذه المقالة، لكن هذه المرة في صورة خطاف مخصص:</p>
<pre><code>function useGeolocation() {
  const [state, setState] = useState&lt;GeoState&gt;({ status: &quot;pending&quot; });

  useEffect(() =&gt; {
    if (!(&quot;geolocation&quot; in navigator)) {
      setState({ status: &quot;error&quot;, error: new Error(&quot;Unsupported&quot;) });
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) =&gt;
        setState({
          status: &quot;ok&quot;,
          coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        }),
      (err) =&gt; setState({ status: &quot;error&quot;, error: err }),
    );
    return () =&gt; navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}

// At the call site:
function NearbyStores() {
  const geo = useGeolocation();
  if (geo.status === &quot;pending&quot;) return &lt;Spinner /&gt;;
  if (geo.status === &quot;error&quot;) return &lt;PermissionPrompt error={geo.error} /&gt;;
  return &lt;StoreMap lat={geo.coords.latitude} lng={geo.coords.longitude} /&gt;;
}
</code></pre>
<p>طبقتان أقل من التوجيه غير المباشر، ولا عقدة إضافية في الشجرة، ولا وسائط مغلقة يلزمك استنتاجها. لهذا تواصل معظم الفرق مع استخدام الخطاف أولًا.</p>
<h2 id="المفاضلات-في-لمحة">المفاضلات في لمحة</h2>
<p><strong>نقاط القوة</strong></p>
<ul>
<li><strong>لا تعارضات في الأسماء.</strong> على خلاف المكوّنات من رتبة عليا (higher-order components، HOCs)، تمرّر خصائص العرض البيانات صراحةً كوسائط للدالة. لا يحدث دمج ضمني للخصائص، وتدفق البيانات ظاهر عند موضع الاستدعاء.</li>
<li><strong>أقصى مرونة للمستهلك.</strong> لا يفرض المكوّن الذي يملك المنطق أي ترميز، وهذا تحديدًا سبب حب المكتبات بلا واجهة لهذا النمط.</li>
<li><strong>توافق ممتاز مع تعميمات TypeScript.</strong> توفّر الصيغة <code> renderItem={item =&gt; ...}&gt;</code> لك معامل <code>item</code> مكتوب أنواعه بالكامل مجانًا.</li>
</ul>
<p><strong>نقاط الضعف</strong></p>
<ul>
<li><strong>أهرامات الاستدعاءات.</strong> يصبح تداخل عدة مكوّنات باستخدام خصائص عرض لمصادر بيانات متعددة صعب القراءة بسرعة؛ في المقابل، استدعاءات الخطافات المسطحة أسهل.</li>
<li><strong>تكلفة إعادة العرض (re-render).</strong> إنشاء دالة مضمّنة جديدة عند كل عرض من المكوّن الأصل ليس مشكلة في كل تطبيق تقريبًا، لكنه في المسارات الحرجة للأداء قد يُبطل التخزين المؤقت (memoization). يساعد مصرّف React هنا، لكنه ليس سحرًا.</li>
<li><strong>مفهوم إضافي يجب تعليمه.</strong> على المساهم الجديد أن يدرك أن <code>children</code> يكون أحيانًا دالة.</li>
</ul>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>خاصية العرض خاصية قيمتها دالة تعيد JSX. المكوّن المالك يشغّل المنطق ويستدعي الخاصية لعرضه.</li>
<li>يتألق النمط في المكتبات <strong>بلا واجهة</strong>، مثل السحب والإفلات والحركة وإمكانية الوصول وبناء الجداول، حيث لا تستطيع المكتبة فرض الترميز.</li>
<li>لمشاركة البيانات العادية، يكون الخطاف المخصص عادةً أوضح وأقل تسطحًا وأكثر ملاءمة لمصرّف React.</li>
<li>إذا وجدت نفسك تكتب غلافًا وظيفته الوحيدة هي <code>return props.children(data)</code>، فإن هذا الغلاف يحتاج إلى أن يكون خطافًا.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://legacy.reactjs.org/docs/render-props.html">خصائص العرض — React (الوثائق القديمة)</a></li>
<li><a href="https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components">هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة</a></li>
<li><a href="https://github.com/downshift-js/downshift">Downshift — مكتبة combobox بلا واجهة مبنية على خصائص العرض</a></li>
<li><a href="https://react-spectrum.adobe.com/react-aria/">React Aria — عناصر وصولية تستخدم خصائص العرض للسلوك</a></li>
</ul>
`,s={book:t,chapter:e,chapterTitle:n,slug:o,title:r,headings:i,html:d};export{t as book,e as chapter,n as chapterTitle,s as default,i as headings,d as html,o as slug,r as title};
