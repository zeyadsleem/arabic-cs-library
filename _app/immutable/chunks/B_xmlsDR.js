const t="patterns-dev",e="react",n="أنماط React وNext.js",o="index",a="نظرة عامة على React.js",r=[{depth:2,id:"المصطلحات-التي-سنستخدمها",text:"المصطلحات التي سنستخدمها"},{depth:2,id:"العرض-باستخدام-jsx",text:"العرض باستخدام JSX"},{depth:2,id:"المكونات-والخصائص-والحالة",text:"المكوّنات والخصائص والحالة"},{depth:3,id:"1-المكونات",text:"1. المكوّنات"},{depth:3,id:"استخراج-المكونات",text:"استخراج المكوّنات"},{depth:3,id:"2-الخصائص-props",text:"2. الخصائص (props)"},{depth:3,id:"3-الحالة",text:"3. الحالة"},{depth:3,id:"الخصائص-مقابل-الحالة",text:"الخصائص مقابل الحالة"},{depth:2,id:"مفاهيم-أخرى-في-react",text:"مفاهيم أخرى في React"},{depth:3,id:"1-دورة-الحياة",text:"1. دورة الحياة"},{depth:3,id:"2-المكون-من-رتبة-عليا-hoc",text:"2. المكوّن من رتبة عليا (HOC)"},{depth:3,id:"3-السياق",text:"3. السياق"},{depth:2,id:"خطافات-react",text:"خطافات React"},{depth:2,id:"التفكير-في-react",text:"التفكير في React"},{depth:2,id:"البداية",text:"البداية"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],s=`<p>على مر السنين، تضاعف الطلب على طرق مباشرة <strong>لتركيب</strong> واجهات المستخدم باستخدام JavaScript. صُمّم <a href="https://reactjs.org">React</a>، ويُشار إليه أيضًا بـReact.js، ليكون مكتبة JavaScript مفتوحة المصدر من تطوير Facebook، ويُستخدم لبناء واجهات المستخدم أو مكوّنات واجهة المستخدم.</p>
<p>React ليس بالطبع مكتبة واجهة المستخدم الوحيدة. فـ<a href="https://preactjs.com">Preact</a> و<a href="https://vuejs.org">Vue</a> و<a href="https://angular.io">Angular</a> و<a href="https://svelte.dev">Svelte</a> و<a href="https://lit.dev">Lit</a> وكثير غيرها ممتازة أيضًا لتركيب الواجهات من عناصر قابلة لإعادة الاستخدام. ونظرًا لشعبية React، يستحق الأمر أن نستعرض كيف يعمل، وسنستخدمه لشرح بعض أنماط التصميم (patterns) والعرض والأداء في هذا الدليل.</p>
<p>عندما يتحدث مطوّرو الواجهة الأمامية (front-end) عن الشيفرة، فغالبًا ما يكون ذلك في سياق تصميم واجهات للويب. ونفكر في تركيب الواجهات على هيئة عناصر، مثل الأزرار والقوائم والتنقل وما شابه. توفر React طريقة محسّنة ومبسّطة للتعبير عن الواجهات بهذه العناصر. كما تساعد على بناء واجهات معقدة وصعبة、التصميم من خلال تنظيم الواجهة في ثلاثة مفاهيم رئيسية: <em>المكوّنات والخصائص (props) والحالة (state).</em></p>
<p>ولأن React يركّز على التركيب، يمكنه مطابقة عناصر نظام التصميم لديك بدقة. وبذلك، فإن التصميم من أجل React يكافئك في التفكير بطريقة معيارية. فهو يتيح لك تصميم المكوّنات الفردية قبل تجميع صفحة أو عرض، لتفهم نطاق كل مكوّن وغرضه تمامًا، وهي عملية تسمى <em>التجميع المعتمد على المكوّنات</em> (componentization).</p>
<h2 id="المصطلحات-التي-سنستخدمها">المصطلحات التي سنستخدمها</h2>
<ul>
<li><strong>React / React.js / ReactJS</strong> - مكتبة React، التي أنشأتها Facebook عام 2013</li>
<li><strong>ReactDOM</strong> - الحزمة الخاصة بـDOM والعرض على الخادم</li>
<li><strong>JSX</strong> - امتداد بناء جملة لـJavaScript</li>
<li><strong>Redux</strong> - حاوية حالة مركزية</li>
<li><strong>الخطافات (hooks)</strong> - طريقة جديدة لاستخدام الحالة وميزات React الأخرى من دون كتابة أصناف</li>
<li><strong>ReactNative</strong> - المكتبة لتطوير تطبيقات أصلية عبر الأنظمة باستخدام Javascript</li>
<li><strong>Webpack</strong> - حازم وحدات JavaScript، شائع في مجتمع React.</li>
<li><strong>CRA (Create React App)</strong> - أداة CLI لإنشاء هيكل تطبيق React بغرض بدء المشروع.</li>
<li><strong>Next.js</strong> - إطار عمل (framework) في React يضم أفضل الميزات من فئات متعددة، بما فيها SSR وتقسيم الشيفرة وتحسين الأداء وغيرها.</li>
</ul>
<h2 id="العرض-باستخدام-jsx">العرض باستخدام JSX</h2>
<p>سنستخدم JSX في عدد من أمثلتنا. JSX امتداد لـJavaScript يضم HTML القالبية داخل JavaScript باستخدام اصطلاحات شبيهة بـXML. يُقصد تحويله إلى JavaScript صالح، مع أن دلالات هذا التحويل تعتمد على التنفيذ. اكتسبت JSX شهرتها مع مكتبة React، لكن ظهرت لها منذ ذلك الحين تنفيذات أخرى أيضًا.</p>
<h2 id="المكونات-والخصائص-والحالة">المكوّنات والخصائص والحالة</h2>
<p>المكوّنات والخصائص والحالة هي المفاهيم الأساسية الثلاثة في React. ويمكن تصنيف كل ما ستراه أو ستفعله في React تقريبًا ضمن واحد أو أكثر من هذه المفاهيم الأساسية، وفيما يلي نظرة سريعة عليها:</p>
<h3 id="1-المكونات">1. المكوّنات</h3>
<p>المكوّنات هي لبنات البناء في أي تطبيق React. وهي أشبه بدوال JavaScript تقبل إدخالًا عشوائيًا (<em>Props</em>) وتعيد عناصر React التي تصف ما ينبغي عرضه على الشاشة.</p>
<p>أول ما ينبغي فهمه هو أن كل شيء على الشاشة في تطبيق React هو جزء من مكوّن. وبعبارة جوهرية، تطبيق React مجرد مكوّنات داخل مكوّنات داخل مكوّنات. لذلك لا يبني المطوّرو الصفحات في React، بل المكوّنات.</p>
<p>تتيح لك المكوّنات تقسيم واجهة المستخدم إلى أجزاء مستقلة قابلة لإعادة الاستخدام. إن كنت معتادًا على تصميم الصفحات، فقد يبدو التفكير بهذه الطريقة المعيارية تغييرًا كبيرًا. لكن إن كنت تستخدم نظام تصميم أو دليل أنماط؟ فقد لا يكون تحول الأيديولوجية هذا بحجم ما يبدو.</p>
<p>الطريقة المباشرة لتعريف مكوّن هي كتابة دالة JavaScript.</p>
<pre><code>function Badge(props) {
  return &lt;h1&gt;Hello, my name is {props.name}&lt;/h1&gt;;
}
</code></pre>
<p>هذه الدالة مكوّن React صالح لأنها تقبل وسيطًا واحدًا من نوع كائن الخصائص (<em>properties</em>) يحتوي على البيانات، وتعيد عنصر React. تسمى هذه المكوّنات <em>مكوّنات دالية</em> لأنها حرفيًا دوال JavaScript.</p>
<p>إلى جانب المكوّنات الدالية، يوجد نوع آخر من المكوّنات هو <em>المكوّنات الصنفية</em>. ويختلف المكوّن الصنفي عن المكوّن الدالي في أنه يُعرّف بواسطة صنف ES6، كما هو ظاهر أدناه:</p>
<pre><code>class Badge extends React.Component {
  render() {
    return &lt;h1&gt;Hello, my name is {this.props.name}&lt;/h1&gt;;
  }
}
</code></pre>
<blockquote>
<p><strong>ملاحظة (React 18+):</strong> لا تزال المكوّنات الصنفية تعمل، لكن React الحديث (v16.8+، وخاصة React 18+) يوصي باستخدام <strong>المكوّنات الدالية مع الخطافات</strong> في الشيفرة الجديدة. المكوّنات الدالية أبسط، وتتجنب تعقيد <code>this</code> وطرق دورة الحياة، وتعمل بسلاسة مع الميزات الجديدة مثل مصرّف React والعرض المتزامن. وتنص <a href="https://react.dev/reference/react/Component">وثائق React</a> صراحةً على عدم توصية باستخدام المكوّنات الصنفية في الشيفرة الجديدة.</p>
</blockquote>
<h3 id="استخراج-المكونات">استخراج المكوّنات</h3>
<p>لبيان أن المكوّنات يمكن فصلها إلى مكوّنات أصغر، ضع المكوّن <code>Tweet</code> التالي في الحسبان:</p>
<p>ويمكن تنفيذه على النحو التالي:</p>
<pre><code>function Tweet(props) {
  return (
    &lt;div className=&quot;Tweet&quot;&gt;
      &lt;div className=&quot;User&quot;&gt;
        &lt;Image
          className=&quot;Avatar&quot;
          src={props.author.avatarUrl}
          alt={props.author.name}
        /&gt;
        &lt;div className=&quot;User-name&quot;&gt;{props.author.name}&lt;/div&gt;
      &lt;/div&gt;
      &lt;div className=&quot;Tweet-text&quot;&gt;{props.text}&lt;/div&gt;
      &lt;Image
        className=&quot;Tweet-image&quot;
        src={props.image.imageUrl}
        alt={props.image.description}
      /&gt;
      &lt;div className=&quot;Tweet-date&quot;&gt;{formatDate(props.date)}&lt;/div&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<p>قد يكون التعامل مع هذا المكوّن صعبًا بعض الشيء بسبب تكدّس محتواه، وقد تكون إعادة استخدام أجزاءه الفردية صعبة أيضًا. لكننا ما زلنا نستطيع استخراج بعض المكوّنات منه.</p>
<p>أول ما سنفعله هو استخراج <em>Avatar</em>:</p>
<pre><code>function Avatar(props) {
  return (
    &lt;Image
      className=&quot;Avatar&quot;
      src={props.user.avatarUrl}
      alt={props.user.name}
    /&gt;
  );
}
</code></pre>
<p>لا يحتاج <code>Avatar</code> إلى معرفة أنه يُعرض داخل <code>Comment</code>. لهذا السبب اخترنا لخصيته اسمًا أكثر عمومية: <em>user</em> بدلًا من <em>author</em>.</p>
<p>الآن سنبسّط التعليق قليلًا:</p>
<pre><code>function Tweet(props) {
  return (
    &lt;div className=&quot;Tweet&quot;&gt;
      &lt;div className=&quot;User&quot;&gt;
        &lt;Avatar user={props.author} /&gt;
        &lt;div className=&quot;User-name&quot;&gt;{props.author.name}&lt;/div&gt;
      &lt;/div&gt;
      &lt;div className=&quot;Tweet-text&quot;&gt;{props.text}&lt;/div&gt;
      &lt;Image
        className=&quot;Tweet-image&quot;
        src={props.image.imageUrl}
        alt={props.image.description}
      /&gt;
      &lt;div className=&quot;Tweet-date&quot;&gt;{formatDate(props.date)}&lt;/div&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<p>الأمر التالي الذي سنفعله هو إنشاء مكوّن <code>User</code> يعرض Avatar بجوار اسم المستخدم:</p>
<pre><code>function User(props) {
  return (
    &lt;div className=&quot;User&quot;&gt;
      &lt;Avatar user={props.user} /&gt;
      &lt;div className=&quot;User-name&quot;&gt;{props.user.name}&lt;/div&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<p>الآن سنبسّط <code>Tweet</code> أكثر:</p>
<pre><code>function Tweet(props) {
  return (
    &lt;div className=&quot;Tweet&quot;&gt;
      &lt;User user={props.author} /&gt;
      &lt;div className=&quot;Tweet-text&quot;&gt;{props.text}&lt;/div&gt;
      &lt;Image
        className=&quot;Tweet-image&quot;
        src={props.image.imageUrl}
        alt={props.image.description}
      /&gt;
      &lt;div className=&quot;Tweet-date&quot;&gt;{formatDate(props.date)}&lt;/div&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<p>يبدو استخراج المكوّنات مهمة مملة، لكن المكوّنات القابلة لإعادة الاستخدام تجعل الأمور أسهل عند البرمجة للتطبيقات الأكبر. ومن المعايير الجيدة التي يمكن وضعها في الحسبان عند تبسيط المكوّنات: إذا استُخدم جزء من واجهة المستخدم عدة مرات (<em>Button أو Panel أو Avatar</em>)، أو كان معقدًا بما يكفي في حد ذاته (<em>App أو FeedStory أو Comment</em>)، فإنه مرشّح جيد لاستخراجه إلى مكوّن منفصل.</p>
<h3 id="2-الخصائص-props">2. الخصائص (props)</h3>
<p>الخصائص (props) اختصار لكلمة properties، وهي تشير ببساطة إلى البيانات الداخلية للمكوّن في React. تُكتب داخل استدعاءات المكوّنات وتُمرّر إليها. كما تستخدم الصيغة نفسها المستخدمة في سمات HTML، مثل <code>prop=“value”</code>. وهناك أمران يستحقان التذكر بشأن الخصائص: أولًا، نحدّد قيمة الخاصية ونستخدمها كجزء من المخطط قبل بناء المكوّن. ثانيًا، لا تتغير قيمة الخاصية أبدًا، أي أن الخصائص للقراءة فقط بعد تمريرها إلى المكوّنات.</p>
<p>تصل إلى الخاصية بالإشارة إليها عبر الخاصية <code>this.props</code> التي يمكن لكل مكوّن الوصول إليها.</p>
<h3 id="3-الحالة">3. الحالة</h3>
<p>الحالة كائن يحتوي على معلومات قد تتغير طوال عمر المكوّن. أي أنها لقطة حالية من البيانات المخزنة في خصائص المكوّن. ويمكن للبيانات أن تتغير بمرور الوقت، لذا تصبح تقنيات إدارة طريقة تغير تلك البيانات ضرورية لضمان ظهور المكوّن على النحو الذي يريده المهندسون في الوقت المناسب تمامًا، وهذا ما يُسمى <em>إدارة الحالة (state management).</em></p>
<p>يكاد يكون من المستحيل قراءة فقرة عن React دون المرور بفكرة إدارة الحالة. يحب المطوّرين التوسع في هذا الموضوع، لكن جوهر الأمر هو أن إدارة الحالة ليست معقدة بقدر ما تبدو.</p>
<p>في React، يمكن تتبع الحالة عالميًا أيضًا، ويمكن مشاركة البيانات بين المكوّنات عند الحاجة. وبعبارة جوهرية، هذا يعني أن تحميل البيانات في أماكن جديدة داخل تطبيقات React ليس مكلفًا كما هو مع التقنيات الأخرى. ف تطبيقات React أذكى بشأن البيانات التي تحفظها وتحملها ومتى تفعل ذلك. وهذا يتيح فرصًا لبناء واجهات تستخدم البيانات بطرق جديدة.</p>
<p>تخيل مكوّنات React تطبيقاتًا مصغرة لكل منها بياناتها ومنطقها وعرضها. ينبغي أن يكون لكل مكوّن غرض واحد. وبصفتك مهندسًا، أنت من يقرّر ذلك الغرض وتتحكم تحكمًا كاملًا في كيفية سلوك كل مكوّن والبيانات المستخدمة. لم تعد مقيدًا ببيانات بقية الصفحة. وفي تصميمك، يمكنك الاستفادة من ذلك بطرق متعددة.
هناك فرص لعرض بيانات إضافية يمكنها تحسين تجربة المستخدم أو جعل أجزاء من التصميم أكثر سياقًا.</p>
<h4>كيفية إضافة الحالة في React</h4>
<p>عند التصميم، أجّل تضمين الحالة إلى المرحلة الأخيرة. من الأفضل تصميم كل شيء خاليًا من الحالة بقدر الإمكان، باستخدام الخصائص والأحداث. يجعل هذا المكوّنات أسهل في الصيانة والاختبار والفهم. وينبغي أن تتم إضافة الحالات إمّا عبر حاويات حالة مثل <a href="https://redux.js.org/">Redux</a> و<a href="https://mobx.js.org/README.html">MobX</a>، أو عبر مكوّن حاوية/غلاف. وRedux نظام شائع لإدارة الحالة في أطر العمل التفاعلية الأخرى. فهو ينفّذ آلة حالة مركزية تعمل بالأفعال.</p>
<blockquote>
<p><strong>ملاحظة (React 18+):</strong> في React الحديث، تدير تطبيقات كثيرة الحالة عبر <strong>السياق والخطافات، مثل <code>useReducer</code> و<code>useContext</code>،</strong> أو مكتبات خفيفة الوزن مثل Zustand وJotai للحالات البسيطة. ويظل Redux صالحًا للحالة العالمية المعقدة، لكن الحلول المدمجة في React غالبًا ما تكفي للحالة المحلية أو المشتركة. ويجعل التجميع التلقائي في React 18 وتحسينات مصرّف React إدارة تحديثات الحالة أكثر كفاءة من دون مكتبات إضافية في كثير من السيناريوهات.</p>
</blockquote>
<p>في المثال أدناه، يمكن أن يكون موضع الحالة هو <code>LoginContainer</code> نفسه. فلنستخدم خطافات React (hooks) لهذا الغرض، وسنناقشها في القسم التالي:</p>
<pre><code>const LoginContainer = () =&gt; {
  const [username, setUsername] = useState(&quot;&quot;);
  const [password, setPassword] = useState(&quot;&quot;);

  const login = async (event) =&gt; {
    event.preventDefault();
    const response = await fetch(&quot;/api&quot;, {
      method: &quot;POST&quot;,
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Here we could check response.status to login or show error
  };

  return (
    &lt;LoginForm onSubmit={login}&gt;
      &lt;FormInput
        name=&quot;username&quot;
        title=&quot;Username&quot;
        onChange={(event) =&gt; setUsername(event.currentTarget.value)}
        value={username}
      /&gt;
      &lt;FormPasswordInput
        name=&quot;password&quot;
        title=&quot;Password&quot;
        onChange={(event) =&gt; setPassword(event.currentTarget.value)}
        value={password}
      /&gt;
      &lt;SubmitButton&gt;Login&lt;/SubmitButton&gt;
    &lt;/LoginForm&gt;
  );
};
</code></pre>
<p>لمزيد من الأمثلة مثل ما سبق، راجع <a href="https://dev.to/lukeshiru/thinking-in-react-the-2020-version-4c18">التفكير في React 2020</a>.</p>
<h3 id="الخصائص-مقابل-الحالة">الخصائص مقابل الحالة</h3>
<p>قد يُخلط بين الخصائص والحالة أحيانًا بسبب تشابههما. وفيما يلي بعض الفروق الرئيسية بينهما:</p>
<table>
<thead>
<tr>
<th><strong>الخصائص</strong></th>
<th><strong>الحالة</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>تبقى البيانات دون تغيير من مكوّن إلى آخر.</td>
<td>البيانات هي لقطة حالية من البيانات المخزنة في خصائص المكوّن، وتتغير خلال دورة حياة المكوّن.</td>
</tr>
<tr>
<td>البيانات للقراءة فقط</td>
<td>يمكن أن تكون البيانات غير متزامنة</td>
</tr>
<tr>
<td>لا يمكن تعديل البيانات الموجودة في الخصائص</td>
<td>يمكن تعديل البيانات الموجودة في الحالة باستخدام <em>this.setState</em></td>
</tr>
<tr>
<td>الخصائص هي ما يُمرَّر إلى المكوّن</td>
<td>تُدار الحالة داخل المكوّن</td>
</tr>
</tbody>
</table>
<h2 id="مفاهيم-أخرى-في-react">مفاهيم أخرى في React</h2>
<p>المكوّنات والخصائص والحالة هي المفاهيم الأساسية الثلاثة لكل ما ستفعله في React. لكن هناك مفاهيم أخرى ينبغي تعلمها:</p>
<h3 id="1-دورة-الحياة">1. دورة الحياة</h3>
<p>يمر كل مكوّن React بثلاث مراحل: التركيب، والعرض، وفك التركيب. ويمكن الإشارة إلى سلسلة الأحداث التي تحدث خلال هذه المراحل الثلاث إلى دورة حياة المكوّن. ورغم أن هذه الأحداث ترتبط جزئيًا بحالة المكوّن (بياناته الداخلية)، فإن دورة الحياة شيء مختلف بعض الشيء. تحتوي React على شيفرة داخلية تحمّل المكوّنات وتفكّها عند الحاجة، وقد يوجد المكوّن في عدة مراحل استخدام داخل تلك الشيفرة الداخلية.</p>
<p>توجد طرق كثيرة لدورة الحياة، لكن أكثرها شيوعًا هي:</p>
<p><strong><code>render()</code></strong> - هذه الدالة هي الدالة الوحيدة المطلوبة داخل المكوّن الصنفي في React، وهي الأكثر استخدامًا. وكما يوحي اسمها، فهي تتولى عرض المكوّن في واجهة المستخدم، وتحدث أثناء تركيب المكوّن وعرضه.</p>
<p>عندما يُنشأ المكوّن أو يُزال:</p>
<ul>
<li><strong><code>componentDidMount()</code></strong> تعمل بعد عرض ناتج المكوّن في DOM.</li>
<li><strong><code>componentWillUnmount()</code></strong> تُستدعى مباشرةً قبل فك تركيب المكوّن وتدميره</li>
</ul>
<p>عندما تتحدث الخصائص أو الحالات:</p>
<ul>
<li><strong><code>shouldComponentUpdate()</code></strong> تُستدعى قبل العرض عند استلام خصائص أو حالة جديدة.</li>
<li><strong><code>componentDidUpdate()</code></strong> تُستدعى مباشرةً بعد حدوث التحديث. ولا تُستدعى هذه الدالة عند العرض الأولي.</li>
</ul>
<h3 id="2-المكون-من-رتبة-عليا-hoc">2. المكوّن من رتبة عليا (HOC)</h3>
<p><a href="/book/patterns-dev/react/hoc-pattern">المكوّنات من رتبة عليا (HOC)</a> هي تقنية متقدمة في React لإعادة استخدام منطق المكوّنات. أي أن المكوّن من رتبة عليا دالة تأخذ مكوّنًا وتعيد مكوّنًا جديدًا. وهي أنماط تنبع من الطبيعة التركيبية لـReact. وفي حين يحوّل المكوّن الخصائص إلى واجهة مستخدم، يحوّل المكوّن من رتبة عليا مكوّنًا إلى مكوّن آخر، وتحظى هذه التقنية عادةً بالشعبية في مكتبات الطرف الثالث.</p>
<h3 id="3-السياق">3. السياق</h3>
<p>في تطبيق React النموذجي، تُمرَّر البيانات عبر الخصائص، لكن هذا قد يكون مرهقًا لبعض أنواع الخصائص التي تحتاج إليها مكونات كثيرة داخل التطبيق. ويوفر السياق طريقة لمشاركة هذه الأنواع من البيانات بين المكوّنات من دون تمرير خاصية عبر كل مستوى من التسلسل الهرمي. أي أننا مع السياق نستطيع تجنب تمرير الخصائص عبر العناصر الوسيطة.</p>
<h2 id="خطافات-react">خطافات React</h2>
<p>الخطافات (hooks) هي دوال تتيح لك «الانضمام إلى» ميزات حالة React ودورة الحياة من المكوّنات الدالية. وتتيح لك استخدام الحالة وميزات React الأخرى من دون كتابة صنف. ويمكنك التعلم المزيد عنها في دليل <a href="/book/patterns-dev/react/hooks-pattern">الخطافات</a>.</p>
<h2 id="التفكير-في-react">التفكير في React</h2>
<p>أمر مذهل حقًا في React هو كيف يجعلك تفكر في التطبيقات أثناء بنائها. في هذا القسم، سنرشدك إلى عملية التفكير في بناء <em>جدول بيانات منتجات قابل للبحث</em> باستخدام خطافات React.</p>
<p><strong>الخطوة 1: ابدأ بنموذج أولي (mock)</strong> تخيّل أننا لدينا بالفعل واجهة API بصيغة JSON ونموذج أولي لواجهتنا:</p>
<p>تعيد واجهة JSON بعض البيانات التي تبدو هكذا:</p>
<pre><code>[
  {
    category: &quot;Entertainment&quot;,
    retweets: &quot;54&quot;,
    isLocal: false,
    text: &quot;Omg. A tweet.&quot;,
  },
  {
    category: &quot;Entertainment&quot;,
    retweets: &quot;100&quot;,
    isLocal: false,
    text: &quot;Omg. Another.&quot;,
  },
  {
    category: &quot;Technology&quot;,
    retweets: &quot;32&quot;,
    isLocal: false,
    text: &quot;New ECMAScript features!&quot;,
  },
  {
    category: &quot;Technology&quot;,
    retweets: &quot;88&quot;,
    isLocal: true,
    text: &quot;Wow, learning React!&quot;,
  },
];
</code></pre>
<p>نصيحة: قد تجد أدوات مجانية مثل <a href="https://excalidraw.com">Excalidraw</a> مفيدة لرسم نموذج أولي عالي المستوى لواجهة المستخدم ومكوّناتك.</p>
<p><strong>الخطوة 2: قسّم واجهة المستخدم إلى مكوّن هرمي</strong></p>
<p>بعد أن يكون لديك النموذج الأولي، الخطوة التالية هي رسم مربعات حول كل مكوّن (ومكوّن فرعي) في النموذج وتسميتها جميعًا، كما هو ظاهر أدناه.</p>
<p>استخدم مبدأ المسؤولية المفردة: ينبغي أن يكون لكل مكوّن وظيفة واحدة في الأفضل. وإذا اتسع، فينبغي تقسيمه إلى مكوّنات فرعية أصغر. واستخدم التقنية نفسها لتقرّر ما إذا كان ينبغي لك إنشاء دالة أو كائن جديد.</p>
<p>سترى في الصورة أعلاه أن لدينا خمسة مكونات في تطبيقنا. وقد عددنا البيانات التي يمثلها كل مكوّن.</p>
<ul>
<li><strong>TweetSearchResults (برتقالي):</strong> حاوية المكوّن الكامل</li>
<li><strong>SearchBar (أزرق):</strong> إدخال المستخدم لما يريد البحث عنه</li>
<li><strong>TweetList (أخضر):</strong> يعرض التغريدات ويصفيها وفق إدخال المستخدم</li>
<li><strong>TweetCategory (فيروزي):</strong> يعرض عنوانًا لكل فئة</li>
<li><strong>TweetRow (أحمر):</strong> يعرض صفًا لكل تغريدة</li>
</ul>
<p>بعد تحديد المكوّنات في النموذج الأولي، تتمثل الخطوة التالية في ترتيبها في تسلسل هرمي. وينبغي أن تظهر المكوّنات الموجودة داخل مكوّن آخر في النموذج كأبناء في التسلسل الهرمي. مثل هذا:</p>
<ul>
<li><strong>TweetSearchResults</strong> <strong>SearchBar</strong></li>
<li><strong>TweetList</strong> <strong>TweetCategory</strong></li>
<li><strong>TweetRow</strong></li>
</ul>
<p><strong>الخطوة 3: نفّذ المكوّنات في React</strong> بعد إكمال التسلسل الهرمي للمكوّنات، تتمثل الخطوة التالية في تنفيذ تطبيقك. قبل العام الماضي، كانت أسرع طريقة هي بناء نسخة تأخذ نموذج بياناتك وتعرض واجهة المستخدم، لكن من دون أي تفاعل. ومنذ إدخال خطافات React، أصبحت طريقة أسهل لتنفيذ تطبيقك هي استخدام الخطافات كما هو ظاهر أدناه:</p>
<p><strong>i. قائمة تغريدات قابلة للتصفية</strong></p>
<pre><code>const TweetSearchResults = ({ tweets }) =&gt; {
  const [filterText, setFilterText] = useState(&quot;&quot;);
  const [inThisLocation, setInThisLocation] = useState(false);
  return (
    &lt;div&gt;
      &lt;SearchBar
        filterText={filterText}
        inThisLocation={inThisLocation}
        setFilterText={setFilterText}
        setInThisLocation={setInThisLocation}
      /&gt;
      &lt;TweetList
        tweets={tweets}
        filterText={filterText}
        inThisLocation={inThisLocation}
      /&gt;
    &lt;/div&gt;
  );
};
</code></pre>
<p><strong>ii. SearchBar</strong></p>
<pre><code>const SearchBar = ({
  filterText,
  inThisLocation,
  setFilterText,
  setInThisLocation,
}) =&gt; (
  &lt;form&gt;
    &lt;input
      type=&quot;text&quot;
      placeholder=&quot;Search...&quot;
      value={filterText}
      onChange={(e) =&gt; setFilterText(e.target.value)}
    /&gt;
    &lt;p&gt;
      &lt;label&gt;
        &lt;input
          type=&quot;checkbox&quot;
          checked={inThisLocation}
          onChange={(e) =&gt; setInThisLocation(e.target.checked)}
        /&gt;{&quot; &quot;}
        Only show tweets in your current location
      &lt;/label&gt;
    &lt;/p&gt;
  &lt;/form&gt;
);
</code></pre>
<p><strong>iii. قائمة التغريدات (قائمة التغريدات)</strong></p>
<pre><code>const TweetList = ({ tweets, filterText, inThisLocation }) =&gt; {
  const rows = [];
  let lastCategory = null;

  tweets.forEach((tweet) =&gt; {
    if (tweet.text.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inThisLocation &amp;&amp; !tweet.isLocal) {
      return;
    }
    if (tweet.category !== lastCategory) {
      rows.push(
        &lt;TweetCategory category={tweet.category} key={tweet.category} /&gt;
      );
    }
    rows.push(&lt;TweetRow tweet={tweet} key={tweet.text} /&gt;);
    lastCategory = tweet.category;
  });

  return (
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th&gt;Tweet Text&lt;/th&gt;
          &lt;th&gt;Retweets&lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;{rows}&lt;/tbody&gt;
    &lt;/table&gt;
  );
};
</code></pre>
<p><strong>iv. صف فئة التغريدة</strong></p>
<pre><code>const TweetCategory = ({ category }) =&gt; (
  &lt;tr&gt;
    &lt;th colSpan=&quot;2&quot;&gt;{category}&lt;/th&gt;
  &lt;/tr&gt;
);
</code></pre>
<p><strong>v. صف التغريدة</strong></p>
<pre><code>const TweetRow = ({ tweet }) =&gt; {
  const color = tweet.isLocal ? &quot;inherit&quot; : &quot;red&quot;;

  return (
    &lt;tr&gt;
      &lt;td&gt;
        &lt;span style=&quot;&quot;&gt;{tweet.text}&lt;/span&gt;
      &lt;/td&gt;
      &lt;td&gt;{tweet.retweets}&lt;/td&gt;
    &lt;/tr&gt;
  );
};
</code></pre>
<p>سيكون التنفيذ النهائي هو كامل الشيفرة السابقة مجتمعة وفق التسلسل الهرمي المذكور:</p>
<ul>
<li><strong>TweetSearchResults</strong> <strong>SearchBar</strong></li>
<li><strong>TweetList</strong> <strong>TweetCategory</strong></li>
<li><strong>TweetRow</strong></li>
</ul>
<h2 id="البداية">البداية</h2>
<p>توجد طرق متعددة لبدء استخدام React.</p>
<p><strong>التحميل مباشرةً في صفحة الويب:</strong> هذه أبسط طريقة لإعداد React. أضف JavaScript الخاص بـReact إلى صفحتك، سواء كاعتمادية <code>npm</code> أو عبر <code>CDN</code>.</p>
<p><strong>استخدام <code>create-react-app</code>:</strong> مشروع <code>create-react-app</code> يهدف إلى تمكينك من استخدام React في أقرب وقت ممكن، وأي تطبيق React يحتاج إلى تجاوز صفحة واحدة سيجد أن <code>create-react-app</code> يفي بهذا الاحتياج بسهولة تامة. وينبغي لتطبيقات الإنتاج الجادة أن تفكر في استخدام <a href="/book/patterns-dev/react/nextjs">Next.js</a> لأن له افتراضات أقوى، مثل تقسيم الشيفرة، مدمجة فيه.</p>
<p><strong>Code Sandbox:</strong> طريقة سهلة للحصول على بنية create-react-app من دون تثبيتها، هي الذهاب إلى <a href="https://codesandbox.io/s">https://codesandbox.io/s</a> واختيار «React».</p>
<p><strong>Codepen:</strong> إذا كنت تبني نموذجًا أوليًا لمكوّن React وتستمتع باستخدام Codepen، فهناك أيضًا <a href="https://codepen.io/topic/react/templates">عدد</a> من <a href="https://codepen.io/flaviocopes/pen/VqeaxB">نقاط بداية</a> React يمكنك استخدامها.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>صُممت مكتبة React.js لجعل عملية بناء مكوّنات واجهة المستخدم المعيارية والقابلة لإعادة الاستخدام بسيطة وبديهية. ونأمل أن تكون هذه المقدمة المختصرة مفيدة بوصفها نظرة عامة عالية المستوى.</p>
<p>إذا كنت مهتمًا بمزيد من القراءة عن أساسيات React، فراجع:</p>
<ul>
<li><a href="https://reactjs.org/docs/getting-started.html#learn-react">الوثائق الرسمية</a></li>
<li><a href="https://reactfordesigners.com/">React للمصممين</a></li>
</ul>
<p><em>لن يكون هذا الدليل ممكنًا لولا أساليب التدريس التي تُشاركها <a href="https://reactjs.org/docs/components-and-props.html">الوثائق الرسمية لمكوّنات React وخصائصها</a>، و<a href="https://dev.to/lukeshiru/thinking-in-react-the-2020-version-4c18">التفكير في React</a>، و<a href="https://davidpfahler.com/thinking-in-react-hooks">التفكير في خطافات React</a>، ووثائق <a href="https://scriptverse.academy/tutorials/reactjs-pass-props-to-functional-component.html">scriptverse</a>.</em></p>
<p><img src="/images/patterns-dev/react-index-0-react_logo_3x.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-1-jsx.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-2-react_components_1.5x.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-3-react_badge_2x.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-4-tweet_component_2x.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-5-state_props.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-6-redux_details.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-7-two_ways.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-8-mock_tweet_results_3x.webp" alt="Overview of React.js"> <img src="/images/patterns-dev/react-index-9-mock_tweet_colors_3x.webp" alt="Overview of React.js"></p>
`,c={book:t,chapter:e,chapterTitle:n,slug:o,title:a,headings:r,html:s};export{t as book,e as chapter,n as chapterTitle,c as default,r as headings,s as html,o as slug,a as title};
