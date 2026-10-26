const s="kinney",n="react-performance",a="أداء React",l="avoiding-unnecessary-dependencies",p="تجنّب الاعتمادات غير الضرورية",t=[{depth:2,id:"التكلفة-الخفية-للاعتمادات",text:"التكلفة الخفية للاعتمادات"},{depth:2,id:"تدقيق-اعتماداتك-الحالية",text:"تدقيق اعتماداتك الحالية"},{depth:3,id:"تحليل-الحزمة",text:"تحليل الحزمة"},{depth:3,id:"استكشاف-شجرة-الاعتمادات",text:"استكشاف شجرة الاعتمادات"},{depth:2,id:"المتهمون-الشائعون-بالتضخم-وبدائلهم",text:"المتّهمون الشائعون بالتضخّم وبدائلهم"},{depth:3,id:"معالجة-التواريخ-من-momentjs-إلى-الواجهات-الأصلية-أو-date-fns",text:"معالجة التواريخ: من Moment.js إلى الواجهات الأصلية أو date-fns"},{depth:3,id:"مكتبات-الأدوات-من-lodash-إلى-التوابع-الأصلية-أو-الاستيرادات-الموجهة",text:"مكتبات الأدوات: من Lodash إلى التوابع الأصلية أو الاستيرادات الموجّهة"},{depth:3,id:"طلبات-http-من-axios-إلى-fetch-api",text:"طلبات HTTP: من Axios إلى Fetch API"},{depth:2,id:"تحقيق-أقصى-استفادة-من-إزالة-الشيفرة-الميتة",text:"تحقيق أقصى استفادة من إزالة الشيفرة الميتة"},{depth:3,id:"تهيئة-webpack-لتحسين-إزالة-الشيفرة-الميتة",text:"تهيئة Webpack لتحسين إزالة الشيفرة الميتة"},{depth:2,id:"بناء-أدواتك-الخاصة",text:"بناء أدواتك الخاصة"},{depth:2,id:"اتخاذ-قرارات-مدروسة",text:"اتخاذ قرارات مدروسة"},{depth:3,id:"تحليل-القيمة-مقابل-التكلفة",text:"تحليل القيمة مقابل التكلفة"},{depth:3,id:"إطار-القرار",text:"إطار القرار"},{depth:2,id:"المراقبة-والصيانة",text:"المراقبة والصيانة"},{depth:3,id:"تدقيقات-منتظمة",text:"تدقيقات منتظمة"},{depth:3,id:"ميزانيات-حجم-الحزمة",text:"ميزانيات حجم الحزمة"},{depth:3,id:"استراتيجية-تحديث-الاعتمادات",text:"استراتيجية تحديث الاعتمادات"},{depth:2,id:"دراسة-حالة-واقعية",text:"دراسة حالة واقعية"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>كل اعتماد تضيفه إلى مشروع React هو رهان — رهان على أن القيمة التي يقدّمها تفوق تكلفته من حيث حجم الحزمة، وعبء الصيانة، وثغرات الأمان المحتملة. وكثيرًا ما نلجأ إلى مكتبات شائعة دون أن نفكّر فيما إذا كنا نحتاجها فعلًا أو إذا كان هناك بديل أخف. لنستكشف كيفية تدقيق اعتماداتك، وتحديد التضخّم غير الضروري، واتخاذ خيارات مدروسة تُبقي تطبيقات React خفيفة وسريعة.</p>
<h2 id="التكلفة-الخفية-للاعتمادات">التكلفة الخفية للاعتمادات</h2>
<p>قبل أن نغوص في الحلول، لنتحدّث عمّا تدفعه فعلًا عند تنفيذ <code>npm install</code> لشيء جديد. فليست المسألة كيلوبايتات فقط (رغم أن لها أهمية كبيرة):</p>
<ul>
<li><strong>حجم الحزمة</strong>: كل مكتبة تزيد حمولة JavaScript لديك، فتُبطئ تحميل الصفحة الأولى</li>
<li><strong>زمن التحليل</strong>: شيفرة أكثر تعني وقتًا أطول لمحرّك JavaScript لتحليلها وترجمتها</li>
<li><strong>عبء الصيانة</strong>: الاعتمادات تتعطّل أو تُهمَل أو تُدخل ثغرات أمنية</li>
<li><strong>تعارضات الإصدارات</strong>: قد تتعارض الاعتمادات بعضها مع بعض أو توقعك في جحيم الإصدارات</li>
<li><strong>قيود إزالة الشيفرة الميتة</strong>: ليست كل المكتبات مُحسّنة لإزالة الشيفرة غير المستخدمة (dead code elimination)</li>
</ul>
<p>تأمّل هذا: إضافة Lodash من أجل دالة أدوات واحدة فقط قد تضيف 70KB إلى حزمتك إذا لم تُحسَّن إزالة الشيفرة غير المستخدمة كما ينبغي. وهذا ثمن باهظ مقابل الراحة.</p>
<h2 id="تدقيق-اعتماداتك-الحالية">تدقيق اعتماداتك الحالية</h2>
<p>قبل أن تقلّم الزوائد، عليك معرفة موضعها. وإليك كيفية تدقيق اعتماداتك بفعالية:</p>
<h3 id="تحليل-الحزمة">تحليل الحزمة</h3>
<p>ابدأ بتحليل حزمتك الحالية بأداة مثل <code>webpack-bundle-analyzer</code>:</p>
<pre><code class="language-bash">npm install --save-dev webpack-bundle-analyzer
</code></pre>
<p>أضف هذا السكربت إلى <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;analyze&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build &amp;&amp; npx webpack-bundle-analyzer build/static/js/*.js&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يُظهر لك هذا التفصيل البصري بدقة أي المكتبات تستهلك أكبر قدر من المساحة. وابحث عن:</p>
<ul>
<li>مكتبات كبيرة تُستخدم لميزات صغيرة</li>
<li>مكتبات متعددة تفعل أشياء متشابهة</li>
<li>مكتبات ضعيفة الدعم لإزالة الشيفرة غير المستخدمة</li>
</ul>
<h3 id="استكشاف-شجرة-الاعتمادات">استكشاف شجرة الاعتمادات</h3>
<p>استخدم أدوات مثل <code>npm ls</code> أو <code>yarn why</code> لفهم شجرة اعتماداتك:</p>
<pre><code class="language-bash"><span class="hljs-comment"># See why a package is installed</span>
npm <span class="hljs-built_in">ls</span> package-name

<span class="hljs-comment"># Or with yarn</span>
yarn why package-name
</code></pre>
<p>أحيانًا تكتشف أن اعتمادًا ظننت أنك أزلته لا يزال تجرّه حزمة أخرى.</p>
<h2 id="المتهمون-الشائعون-بالتضخم-وبدائلهم">المتّهمون الشائعون بالتضخّم وبدائلهم</h2>
<p>لنستعرض بعض المتّهمين المتكرّرين وبدائلهم الأخف:</p>
<h3 id="معالجة-التواريخ-من-momentjs-إلى-الواجهات-الأصلية-أو-date-fns">معالجة التواريخ: من Moment.js إلى الواجهات الأصلية أو date-fns</h3>
<p>كان Moment.js يومًا ما مكتبة التواريخ المفضّلة، لكنه ثقيل (67KB بعد التصغير) ولم يعد يُصان. وفي حالات استخدام كثيرة، تكفي JavaScript الأصلية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Heavy: Using Moment.js for simple operations</span>
<span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;moment&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">formatDate</span> = (<span class="hljs-params"><span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span></span>) =&gt; <span class="hljs-title function_">moment</span>(date).<span class="hljs-title function_">format</span>(<span class="hljs-string">&#x27;MM/DD/YYYY&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title function_">isToday</span> = (<span class="hljs-params"><span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span></span>) =&gt; <span class="hljs-title function_">moment</span>(date).<span class="hljs-title function_">isSame</span>(<span class="hljs-title function_">moment</span>(), <span class="hljs-string">&#x27;day&#x27;</span>);

<span class="hljs-comment">// ✅ Light: Native JavaScript</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">formatDate</span> = (<span class="hljs-params"><span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> date.<span class="hljs-title function_">toLocaleDateString</span>(<span class="hljs-string">&#x27;en-US&#x27;</span>, {
    <span class="hljs-attr">month</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
    <span class="hljs-attr">day</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
    <span class="hljs-attr">year</span>: <span class="hljs-string">&#x27;numeric&#x27;</span>,
  });
};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">isToday</span> = (<span class="hljs-params"><span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> today = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
  <span class="hljs-keyword">return</span> date.<span class="hljs-title function_">toDateString</span>() === today.<span class="hljs-title function_">toDateString</span>();
};
</code></pre>
<p>وإذا احتجت إلى عمليات تاريخ أكثر تعقيدًا، ففكّر في <a href="https://date-fns.org/">date-fns</a>، فهي معيارية وقابلة لإزالة الشيفرة غير المستخدمة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Only import what you need</span>
<span class="hljs-keyword">import</span> { format, isToday } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;date-fns&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">formatDate</span> = (<span class="hljs-params"><span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span></span>) =&gt; <span class="hljs-title function_">format</span>(date, <span class="hljs-string">&#x27;MM/dd/yyyy&#x27;</span>);
</code></pre>
<h3 id="مكتبات-الأدوات-من-lodash-إلى-التوابع-الأصلية-أو-الاستيرادات-الموجهة">مكتبات الأدوات: من Lodash إلى التوابع الأصلية أو الاستيرادات الموجّهة</h3>
<p>Lodash مفيدة للغاية، لكن استيراد المكتبة كاملة من أجل بضع أدوات إسراف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Importing entire Lodash (70KB)</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lodash&#x27;</span>;

<span class="hljs-keyword">const</span> users = _.<span class="hljs-title function_">uniqBy</span>(userList, <span class="hljs-string">&#x27;id&#x27;</span>);
<span class="hljs-keyword">const</span> grouped = _.<span class="hljs-title function_">groupBy</span>(users, <span class="hljs-string">&#x27;department&#x27;</span>);

<span class="hljs-comment">// ✅ Better: Import specific functions</span>
<span class="hljs-keyword">import</span> uniqBy <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lodash/uniqBy&#x27;</span>;
<span class="hljs-keyword">import</span> groupBy <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lodash/groupBy&#x27;</span>;

<span class="hljs-keyword">const</span> users = <span class="hljs-title function_">uniqBy</span>(userList, <span class="hljs-string">&#x27;id&#x27;</span>);
<span class="hljs-keyword">const</span> grouped = <span class="hljs-title function_">groupBy</span>(users, <span class="hljs-string">&#x27;department&#x27;</span>);

<span class="hljs-comment">// ✅ Best: Use native methods when possible</span>
<span class="hljs-keyword">const</span> users = userList.<span class="hljs-title function_">filter</span>(
  <span class="hljs-function">(<span class="hljs-params">user, index, arr</span>) =&gt;</span> arr.<span class="hljs-title function_">findIndex</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">id</span> === user.<span class="hljs-property">id</span>) === index,
);

<span class="hljs-keyword">const</span> grouped = users.<span class="hljs-title function_">reduce</span>(
  <span class="hljs-function">(<span class="hljs-params">acc, user</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> dept = user.<span class="hljs-property">department</span>;
    <span class="hljs-keyword">if</span> (!acc[dept]) acc[dept] = [];
    acc[dept].<span class="hljs-title function_">push</span>(user);
    <span class="hljs-keyword">return</span> acc;
  },
  {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-keyword">typeof</span> users&gt;,
);
</code></pre>
<h3 id="طلبات-http-من-axios-إلى-fetch-api">طلبات HTTP: من Axios إلى Fetch API</h3>
<p>أصبح Fetch API مدعومًا على نطاق واسع ويتولّى معظم احتياجات HTTP:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Heavy: Axios for simple requests</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;axios&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> axios.<span class="hljs-title function_">get</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-property">data</span>;
};

<span class="hljs-comment">// ✅ Light: Native fetch</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
  }
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
};
</code></pre>
<p>وفي سيناريوهات أكثر تعقيدًا، قد تُنشئ غلافًا خفيفًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Custom fetch wrapper with error handling</span>
<span class="hljs-keyword">const</span> api = {
  <span class="hljs-keyword">async</span> get&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
    }
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  },

  <span class="hljs-keyword">async</span> post&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data),
    });
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
    }
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  },
};
</code></pre>
<h2 id="تحقيق-أقصى-استفادة-من-إزالة-الشيفرة-الميتة">تحقيق أقصى استفادة من إزالة الشيفرة الميتة</h2>
<p>تُزيل تقنية tree-shaking الشيفرة الميتة من حزمتك، لكنها لا تعمل إلا عندما تُبنى المكتبات بوحدات ES modules وتكون استيراداتك محدّدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Entire library gets bundled</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> utils <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;my-utils&#x27;</span>;

<span class="hljs-comment">// ❌ Bad: May not tree-shake properly</span>
<span class="hljs-keyword">import</span> { debounce } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lodash&#x27;</span>;

<span class="hljs-comment">// ✅ Good: Specific import that tree-shakes well</span>
<span class="hljs-keyword">import</span> debounce <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lodash/debounce&#x27;</span>;

<span class="hljs-comment">// ✅ Good: Import only what you need</span>
<span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
</code></pre>
<h3 id="تهيئة-webpack-لتحسين-إزالة-الشيفرة-الميتة">تهيئة Webpack لتحسين إزالة الشيفرة الميتة</h3>
<p>تأكّد من أن تهيئة webpack لديك تدعم إزالة الشيفرة غير المستخدمة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;production&#x27;</span>,
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">usedExports</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">sideEffects</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// Only if you&#x27;re sure no modules have side effects</span>
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">mainFields</span>: [<span class="hljs-string">&#x27;es2015&#x27;</span>, <span class="hljs-string">&#x27;module&#x27;</span>, <span class="hljs-string">&#x27;main&#x27;</span>], <span class="hljs-comment">// Prefer ES modules</span>
  },
};
</code></pre>
<h2 id="بناء-أدواتك-الخاصة">بناء أدواتك الخاصة</h2>
<p>أحيانًا أفضل اعتماد هو ألّا يكون هناك اعتماد. وللأدوات البسيطة، فكّر في كتابتها بنفسك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Custom debounce function (instead of importing Lodash)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> debounce&lt;T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">unknown</span>[]) =&gt; <span class="hljs-built_in">unknown</span>&gt;(
  <span class="hljs-attr">func</span>: T,
  <span class="hljs-attr">wait</span>: <span class="hljs-built_in">number</span>,
): <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">timeoutId</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;T&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (timeoutId) <span class="hljs-built_in">clearTimeout</span>(timeoutId);
    timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">func</span>(...args), wait);
  };
}

<span class="hljs-comment">// Custom throttle function</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> throttle&lt;T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">unknown</span>[]) =&gt; <span class="hljs-built_in">unknown</span>&gt;(
  <span class="hljs-attr">func</span>: T,
  <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span>,
): <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">let</span> lastRun = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;T&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - lastRun &gt;= limit) {
      <span class="hljs-title function_">func</span>(...args);
      lastRun = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    }
  };
}

<span class="hljs-comment">// Custom deep clone (for simple objects)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> deepClone&lt;T&gt;(<span class="hljs-attr">obj</span>: T): T {
  <span class="hljs-keyword">if</span> (obj === <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&#x27;object&#x27;</span>) <span class="hljs-keyword">return</span> obj;
  <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Date</span>) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(obj.<span class="hljs-title function_">getTime</span>()) <span class="hljs-keyword">as</span> T;
  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(obj)) <span class="hljs-keyword">return</span> obj.<span class="hljs-title function_">map</span>(deepClone) <span class="hljs-keyword">as</span> T;

  <span class="hljs-keyword">const</span> cloned = {} <span class="hljs-keyword">as</span> T;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">hasOwnProperty</span>.<span class="hljs-title function_">call</span>(obj, key)) {
      cloned[key] = <span class="hljs-title function_">deepClone</span>(obj[key]);
    }
  }
  <span class="hljs-keyword">return</span> cloned;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قبل كتابة أدوات مخصّصة، تحقّق مما إذا كانت JavaScript الأصلية قد أضافت دعمًا لحالتك. فاللغة تتطوّر بسرعة، وكثير من الميزات التي كانت تعتمد على مكتبات أصبحت الآن مدعومة أصليًا.</p>
</blockquote>
<h2 id="اتخاذ-قرارات-مدروسة">اتخاذ قرارات مدروسة</h2>
<p>عند تقييم ما إذا كنت ستضيف اعتمادًا جديدًا، اسأل نفسك:</p>
<h3 id="تحليل-القيمة-مقابل-التكلفة">تحليل القيمة مقابل التكلفة</h3>
<ul>
<li><strong>كم من القيمة تقدّم هذه المكتبة؟</strong> هل تحلّ مشكلة معقّدة أم توفّر بضعة أسطر من الشيفرة فقط؟</li>
<li><strong>ما تكلفة الحزمة؟</strong> تحقّق من حجم المكتبة على <a href="https://bundlephobia.com/">Bundlephobia</a></li>
<li><strong>هل هي قابلة لإزالة الشيفرة غير المستخدمة؟</strong> ابحث عن نُسخ ESM ودعم الاستيراد المحدّد</li>
<li><strong>كم مرة ستستخدمها؟</strong> قد تستحقّ مكتبة بحجم 50KB العناء إذا استخدمتها بكثافة</li>
<li><strong>ما عبء الصيانة؟</strong> تحقّق من وتيرة تحديث المكتبة، وعدد المشكلات، واستجابة القائمين عليها</li>
</ul>
<h3 id="إطار-القرار">إطار القرار</h3>
<p>إليك شجرة قرار بسيطة:</p>
<ol>
<li><strong>هل أستطيع حلّ هذا بـ JavaScript الأصلية؟</strong> → استخدم الأصلية</li>
<li><strong>هل هذه مشكلة معقّدة تستغرق وقتًا كبيرًا لحلّها بشكل صحيح؟</strong> → فكّر في مكتبة</li>
<li><strong>هل سأستخدم ميزات متعددة من هذه المكتبة؟</strong> → قد تستحقّ المكتبة العناء</li>
<li><strong>هل المكتبة مصانة جيدًا وقابلة لإزالة الشيفرة غير المستخدمة؟</strong> → مرشّح جيد</li>
<li><strong>هل تبرّر القيمة تكلفة الحزمة؟</strong> → اتخذ القرار بناءً على ميزانية أدائك</li>
</ol>
<h2 id="المراقبة-والصيانة">المراقبة والصيانة</h2>
<p>نظافة الاعتمادات ليست مهمة لمرة واحدة — بل تتطلّب انتباهًا مستمرًا:</p>
<h3 id="تدقيقات-منتظمة">تدقيقات منتظمة</h3>
<p>أعدّ فحوصات آلية في خط CI لديك:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Check for outdated packages</span>
npm outdated

<span class="hljs-comment"># Audit for security vulnerabilities</span>
npm audit

<span class="hljs-comment"># Analyze bundle size over time</span>
npm run analyze
</code></pre>
<h3 id="ميزانيات-حجم-الحزمة">ميزانيات حجم الحزمة</h3>
<p>هيّئ webpack لتحذيرك عندما تتجاوز حزمتك حدود الحجم:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">maxAssetSize</span>: <span class="hljs-number">250000</span>, <span class="hljs-comment">// 250KB</span>
    <span class="hljs-attr">maxEntrypointSize</span>: <span class="hljs-number">250000</span>,
    <span class="hljs-attr">hints</span>: <span class="hljs-string">&#x27;warning&#x27;</span>,
  },
};
</code></pre>
<h3 id="استراتيجية-تحديث-الاعتمادات">استراتيجية تحديث الاعتمادات</h3>
<p>ليست كل التحديثات تستحقّ التبنّي فورًا. ضع في اعتبارك:</p>
<ul>
<li><strong>ترقعات الأمان</strong>: تبنَّها فورًا</li>
<li><strong>إصلاحات الأخطاء</strong>: تبنَّها عند ملاءمة الوقت</li>
<li><strong>الميزات الجديدة</strong>: قيّم ما إذا كنت تحتاجها</li>
<li><strong>التغييرات الجذرية</strong>: قيّم جهد الترحيل بعناية</li>
</ul>
<h2 id="دراسة-حالة-واقعية">دراسة حالة واقعية</h2>
<p>دعني أشاركك مثالًا حديثًا من مشروع عملت عليه. كان لدينا لوحة تحكّم React تُحمَّل ببطء، بحزمة JavaScript تتجاوز 2MB. وهذا ما وجدناه وأصلحناه:</p>
<p><strong>قبل التحسين:</strong></p>
<ul>
<li>حجم الحزمة: 2.1MB</li>
<li>زمن التحميل الأولي: 4.2s على شبكة 3G بطيئة</li>
<li>الاعتمادات: 47 حزمة</li>
</ul>
<p><strong>المشكلات المُحدَّدة:</strong></p>
<ul>
<li>استيراد مكتبة Lodash كاملة من أجل 3 دوال أدوات</li>
<li>استخدام Moment.js لتنسيق تواريخ بسيط</li>
<li>تضمين Chart.js مع أننا لم نكن نحتاج إلا رسومًا بيانية أساسية</li>
<li>استيراد أيقونات Material-UI فرادى لكن بغير كفاءة</li>
</ul>
<p><strong>بعد التحسين:</strong></p>
<ul>
<li>حجم الحزمة: 780KB (خفض بنسبة 63%)</li>
<li>زمن التحميل الأولي: 1.8s على شبكة 3G بطيئة</li>
<li>الاعتمادات: 31 حزمة</li>
</ul>
<p><strong>التغييرات المُجراة:</strong></p>
<ul>
<li>استبدال Lodash بتوابع أصلية واستيرادات محدّدة</li>
<li>الانتقال من Moment.js إلى <code>Intl.DateTimeFormat</code> الأصلية</li>
<li>بناء مكوّنات رسوم بيانية مخصّصة باستخدام SVG وCSS</li>
<li>تطبيق إزالة مناسبة للشيفرة غير المستخدمة في الأيقونات</li>
</ul>
<p>والنتيجة؟ تطبيق أسرع كثيرًا، بأعباء صيانة أقل ومساحة سطح أمني أصغر.</p>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>إدارة الاعتمادات عملية مستمرة، لا وجهة نهائية. ابدأ بـ:</p>
<ol>
<li><strong>تدقيق حزمتك الحالية</strong> باستخدام webpack-bundle-analyzer</li>
<li><strong>تحديد أثقل الاعتمادات</strong> التي تقدّم أقل قيمة</li>
<li><strong>استبدال اعتماد واحد في كل مرة</strong> لتقليل المخاطر</li>
<li><strong>إعداد المراقبة</strong> لاكتشاف تضخّم الحزمة مستقبلًا</li>
<li><strong>إنشاء إطار قرار</strong> لتقييم الاعتمادات الجديدة</li>
</ol>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
