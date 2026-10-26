const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",e="nanostores",t="Nanostores: إدارة حالة محايدة تجاه الأطر",p=[{depth:2,id:"العناصر-الأساسية",text:"العناصر الأساسية"},{depth:3,id:"atom",text:"atom"},{depth:3,id:"map",text:"map"},{depth:3,id:"deepmap",text:"deepMap"},{depth:3,id:"computed",text:"computed"},{depth:2,id:"كيف-تعمل-المخازن-في-الداخل",text:"كيف تعمل المخازن في الداخل"},{depth:2,id:"روابط-الأطر",text:"روابط الأطر"},{depth:3,id:"react",text:"React"},{depth:3,id:"vue",text:"Vue"},{depth:3,id:"svelte",text:"Svelte"},{depth:3,id:"angular",text:"Angular"},{depth:3,id:"javascript-الخامل",text:"JavaScript الخامل"},{depth:2,id:"لماذا-يهم-الحياد-تجاه-الأطر",text:"لماذا يهمّ الحياد تجاه الأطر"},{depth:2,id:"دورة-الحياة-والذاكرة",text:"دورة الحياة والذاكرة"},{depth:2,id:"nanostores-في-سياق-الاتحاد",text:"Nanostores في سياق الاتحاد"},{depth:2,id:"nanostores-مقابل-البدائل",text:"Nanostores مقابل البدائل"},{depth:2,id:"متى-يكون-nanostores-الخيار-الصحيح",text:"متى يكون Nanostores الخيار الصحيح"}],l=`<p><a href="https://github.com/nanostores/nanostores">Nanostores</a> مكتبة إدارة حالة صغيرة إلى حد يكاد لا يكون لها وجود. فالحزمة الأساسية أقل من 1 كيلوبايت. ولا تعتمد على أي إطار، ولا مكوّنات مزوّد، ولا أغلفة سياق، ولا إعداد نمطي. تنشئ مخزنًا، وتقرأ منه، وتكتب فيه، وتشترك في تغييراته. هذا هو نموذج البرمجة كله.</p>
<p>وهذه البساطة هي المقصد كله. في عالم قد تكون فيه واجهتك الأمامية React في موضع، وVue في آخر، ومكوّن ويب خامل في ثالث—أو حيث تحتاج وحدات اتحاد الوحدات البعيدة إلى مشاركة الحالة عبر بناءات منفصلة—فمكتبة حالة <em>لا يعنيها</em> إطارك قيّمة فعلًا. وNanostores لا يعنيها. فهي كائنات JavaScript عادية بآلية اشتراك، وكل ما عدا ذلك ربط رقيق يلائم تلك الاشتراكات مع أي إطار تستخدمه.</p>
<h2 id="العناصر-الأساسية">العناصر الأساسية</h2>
<p>لدى Nanostores أربعة أنواع مخازن رئيسية. وكل واحد منها حاوية تفاعلية بـ<code>.get()</code> و<code>.set()</code> (أو <code>.setKey()</code>) و<code>.subscribe()</code> و<code>.listen()</code>. والفروق في ما تحمله وكيف تُشعر المشتركين.</p>
<h3 id="atom"><code>atom</code></h3>
<p>يحمل <strong>الذرّة (atom)</strong> قيمة واحدة. أي قيمة—سلسلة، أو رقمًا، أو قيمة منطقية، أو كائنًا، أو <code>null</code>. ونداء <code>.set()</code> يستبدل القيمة ويُشعر كل المشتركين.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { atom } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">const</span> counter = <span class="hljs-title function_">atom</span>(<span class="hljs-number">0</span>);

counter.<span class="hljs-title function_">get</span>(); <span class="hljs-comment">// 0</span>
counter.<span class="hljs-title function_">set</span>(<span class="hljs-number">1</span>); <span class="hljs-comment">// notifies subscribers</span>
counter.<span class="hljs-title function_">get</span>(); <span class="hljs-comment">// 1</span>
</code></pre>
<p>والذرّات الخيار الصحيح للحالة البسيطة ذات القيمة الواحدة: كائن مستخدم، أو رمز مصادقة، أو تفضيل سمة، أو علم تحميل. وإن كنت تمتد إلى <code>useState</code> في React لكنك تحتاج القيمة مشتركة عبر المكوّنات دون تمرير خصائص أو سياق، فالذرّة هي مكافئ ذلك في Nanostores.</p>
<p>والاشتراك في ذرّة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> unsubscribe = counter.<span class="hljs-title function_">subscribe</span>(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Counter is now:&#x27;</span>, value);
});

<span class="hljs-comment">// Later</span>
<span class="hljs-title function_">unsubscribe</span>();
</code></pre>
<p>وينادي <code>.subscribe()</code> النداء الراجع فورًا بالقيمة الحالية، ثم مجددًا عند كل تغيير. أما <code>.listen()</code> فمثله لكنه يتخطى النداء الأول—لا يعمل إلا عند التغييرات. وهذا الفرق مهم عندما توصل واجهة تحتاج القيمة الحالية عند التثبّت مقابل تأثيرات جانبية ينبغي أن تعمل عند التحديثات فقط.</p>
<h3 id="map"><code>map</code></h3>
<p>تحمل <strong>الخريطة (map)</strong> كائنًا بمفتاح وقيمة وتتيح لك تحديث مفاتيح فردية دون استبدال الكائن كامل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { map } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">const</span> profile = <span class="hljs-title function_">map</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Grace Hopper&#x27;</span>,
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span>,
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>,
});

profile.<span class="hljs-title function_">get</span>(); <span class="hljs-comment">// { name: &#x27;Grace Hopper&#x27;, role: &#x27;admin&#x27;, theme: &#x27;dark&#x27; }</span>
profile.<span class="hljs-title function_">setKey</span>(<span class="hljs-string">&#x27;theme&#x27;</span>, <span class="hljs-string">&#x27;light&#x27;</span>); <span class="hljs-comment">// notifies subscribers, only &#x27;theme&#x27; changed</span>
</code></pre>
<p>و<code>.setKey()</code> هي الجزء المهم. فلو استخدمت ذرّة تحمل كائنًا، فكل <code>.set()</code> ستستبدل الكائن كامل وتُشعر المشتركين بغض النظر عن المفتاح الذي تغيّر. أما الخريطة فأذكى—فهي تتبّع التغييرات على مستوى المفتاح وتستطيع إشعار المشتركين بالمفتاح الذي عُدّل. وتستطيع روابط الأطر استخدام ذلك لتجنب إعادات تصيير غير ضرورية.</p>
<p>والخرائط الخيار الصحيح للحالة المُهيكلة بحقول قابلة للتحديث باستقلال: ملفات المستخدمين، وحالة النماذج، وكائنات الإعدادات، وأعلام الميزات.</p>
<h3 id="deepmap"><code>deepMap</code></h3>
<p>تمتد <strong>الخريطة العميقة (deep map)</strong> على الخريطة بدعم المسارات المتداخلة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { deepMap } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">const</span> settings = <span class="hljs-title function_">deepMap</span>({
  <span class="hljs-attr">notifications</span>: {
    <span class="hljs-attr">email</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">push</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">display</span>: {
    <span class="hljs-attr">fontSize</span>: <span class="hljs-number">14</span>,
  },
});

settings.<span class="hljs-title function_">setKey</span>(<span class="hljs-string">&#x27;notifications.push&#x27;</span>, <span class="hljs-literal">true</span>);
settings.<span class="hljs-title function_">get</span>().<span class="hljs-property">notifications</span>.<span class="hljs-property">push</span>; <span class="hljs-comment">// true</span>
</code></pre>
<p>تستخدم الخرائط العميقة مسارات بترميز نقطي للتحديثات المتداخلة. وهي مفيدة للحالة المُهيكلة بعمق حيث تريد تحديث ورقة دون استبدال الشجرة كاملة. ومع ذلك، إن كانت حالتك متداخلة لدرجة تحتاج فيها <code>deepMap</code>، ففكّر هل التداخل هو المشكلة الحقيقية. فالذرّات المسطّحة أو الخرائط المتعددة غالبًا أوضح.</p>
<h3 id="computed"><code>computed</code></h3>
<p>المخزن <strong>المحسوب (computed)</strong> يستنبط قيمته من مخزن واحد أو أكثر. ويعيد الحساب عندما يتغيّر أي اعتماد.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { atom, computed } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">const</span> firstName = <span class="hljs-title function_">atom</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>);
<span class="hljs-keyword">const</span> lastName = <span class="hljs-title function_">atom</span>(<span class="hljs-string">&#x27;Hopper&#x27;</span>);

<span class="hljs-keyword">const</span> fullName = <span class="hljs-title function_">computed</span>([firstName, lastName], <span class="hljs-function">(<span class="hljs-params">first, last</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${first}</span> <span class="hljs-subst">\${last}</span>\`</span>;
});

fullName.<span class="hljs-title function_">get</span>(); <span class="hljs-comment">// &#x27;Grace Hopper&#x27;</span>

firstName.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;Ada&#x27;</span>);
fullName.<span class="hljs-title function_">get</span>(); <span class="hljs-comment">// &#x27;Ada Hopper&#x27;</span>
</code></pre>
<p>المخازن المحسوبة للقراءة فقط—لا تستطيع نداء <code>.set()</code> عليها. وهي تتحدّث تلقائيًا عندما تتغيّر مدخلاتها. وهذا مكافئ Nanostores للحالة المستنبطة، أو المحدّدات، أو الحسابات المخزّنة مؤقتًا في مكتبات أخرى.</p>
<p>ويمكنك الاعتماد على أي تركيب من الذرّات والخرائط والمخازن المحسوبة الأخرى. ويُحلّ رسم الاعتمادات بكسل—فالمخزن المحسوب لا يعيد الحساب إلا عندما يكون أحدهم مشتركًا فيه فعليًا. وإن لم يكن أحد يستمع، يتخطى العمل.</p>
<h2 id="كيف-تعمل-المخازن-في-الداخل">كيف تعمل المخازن في الداخل</h2>
<p>الذرّة بنية بيانات صغيرة بشكل ملحوظ. وإن أزلت معالجة الحالات الحدّية وخُطّافات دورة الحياة، فالتمثيل كله قيمة، و<code>Set</code> من دوال الاستماع، وبضعة توابع تقرأ وتكتب وتُشعر. شيء مثل هذا تقريبًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">atom</span>(<span class="hljs-params">initialValue</span>) {
  <span class="hljs-keyword">let</span> value = initialValue;
  <span class="hljs-keyword">const</span> listeners = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-title function_">get</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">return</span> value;
    },
    <span class="hljs-title function_">set</span>(<span class="hljs-params">newValue</span>) {
      value = newValue;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> fn <span class="hljs-keyword">of</span> listeners) <span class="hljs-title function_">fn</span>(value);
    },
    <span class="hljs-title function_">subscribe</span>(<span class="hljs-params">fn</span>) {
      listeners.<span class="hljs-title function_">add</span>(fn);
      <span class="hljs-title function_">fn</span>(value); <span class="hljs-comment">// call immediately with current value</span>
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> listeners.<span class="hljs-title function_">delete</span>(fn);
    },
    <span class="hljs-title function_">listen</span>(<span class="hljs-params">fn</span>) {
      listeners.<span class="hljs-title function_">add</span>(fn);
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> listeners.<span class="hljs-title function_">delete</span>(fn);
    },
  };
}
</code></pre>
<p>هذه هي الفكرة كلها. فـ<code>.set()</code> تستبدل القيمة وتمرّ على مجموعة المستمعين. و<code>.subscribe()</code> تضيف نداءً راجعًا وتناديه فورًا بالقيمة الحالية وتعيد دالة تزيله. و<code>.listen()</code> مطابقة لكنها تتخطى النداء الأولي. ويضيف تمثيل Nanostores الحقيقي خُطّافات دورة حياة وتجميعًا وبعض فحوص الأمان، لكن الشكل أعلاه هو الآلة الجوهرية التي تعمل بها.</p>
<p>والمخازن المحسوبة ذرّات تشترك في مخازن أخرى. وعندما تعمل أي تبعية، يعيد المخزن المحسوب حساب قيمته—وإن تغيّرت فعلًا—يُشعر مشتركيه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">computed</span>(<span class="hljs-params">dependencies, derive</span>) {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">atom</span>(<span class="hljs-title function_">derive</span>(...dependencies.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> d.<span class="hljs-title function_">get</span>())));

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> dep <span class="hljs-keyword">of</span> dependencies) {
    dep.<span class="hljs-title function_">listen</span>(<span class="hljs-function">() =&gt;</span> {
      store.<span class="hljs-title function_">set</span>(<span class="hljs-title function_">derive</span>(...dependencies.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> d.<span class="hljs-title function_">get</span>())));
    });
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">get</span>: store.<span class="hljs-property">get</span>, <span class="hljs-attr">subscribe</span>: store.<span class="hljs-property">subscribe</span>, <span class="hljs-attr">listen</span>: store.<span class="hljs-property">listen</span> };
}
</code></pre>
<p>والتمثيل الحقيقي أكسل من هذا—فالمخزن المحسوب لا يشترك في تبعياته إلا عندما يشترك أحدهم في <em>ه</em>. وإن لم يكن أحد يستمع إلى المخزن المحسوب، فلا توجد اشتراكات التبعيات، ولا يحدث أي إعادة حساب. وهذا التقييم الكسول هو ما يجعل تعريف كثير من المخازن المحسوبة آمنًا دون القلق من عمل مهدور.</p>
<p>وتستخدم الخرائط مجموعة المستمعين نفسها، لكن <code>.setKey()</code> تضمّ معلومات عن <em>أي</em> مفتاح تغيّر عند إشعار المشتركين. وهذا ما يتيح لروابط الأطر مثل <code>@nanostores/react</code> تخطي إعادات التصيير للمكوّنات التي تعتمد على مفتاح واحد فقط في خريطة. أما ذرّة تحمل كائنًا فستعمل عند كل <code>.set()</code> بغض النظر عما تغيّر—والخريطة أذكى لأنها تمنح المشتركين معلومات تكفي ليقرّروا هل يهمّهم الأمر.</p>
<p>كما أن عدد المشتركين هو ما يقود نموذج دورة الحياة في القسم التالي. فعندما تنتقل مجموعة المستمعين من فارغة إلى غير فارغة، يعمل <code>onMount</code>. وعندما يلغي آخر مستمع اشتراكه وتفرغ المجموعة مجددًا، تعمل دالة التنظيف. ونظام دورة الحياة كله ليس إلا عدّادًا على <code>Set</code>.</p>
<p>والآن بعد أن رأيت أن الآلة ليست إلا نداءات راجعة في مجموعة، تبدأ روابط الأطر في الظهور ببساطة تافهة تقريبًا—لأنها كذلك.</p>
<h2 id="روابط-الأطر">روابط الأطر</h2>
<p>Nanostores نفسها JavaScript خالص. وروابط الأطر حزم منفصلة تحوّل اشتراكات المخازن إلى حالة تفاعلية معتادة في كل إطار.</p>
<h3 id="react">React</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>;
<span class="hljs-keyword">import</span> { counter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./stores&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> count = <span class="hljs-title function_">useStore</span>(counter);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> counter.set(count + 1)}&gt;{count}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<p>يشترك <code>useStore</code> في المخزن عند التثبّت، ويلغي الاشتراك عند الفصل، ويعيد تصيير المكوّن عند كل تغيير. ويعيد القيمة الحالية. هذا كل شيء—بلا مزوّد، وبلا سياق، وبلا <code>useSelector</code>. فالمخزن يُستورد مباشرةً، والخُطّاف يتولّى دورة حياة الاشتراك.</p>
<h3 id="vue">Vue</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@nanostores/vue&#x27;</span>;
<span class="hljs-keyword">import</span> { counter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./stores&#x27;</span>;

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">useStore</span>(counter);
</code></pre>
<p>النمط نفسه، وإطار مختلف. يعيد <code>useStore</code> مرجع <code>ref</code> في Vue يتتبّع قيمة المخزن.</p>
<h3 id="svelte">Svelte</h3>
<p>Svelte أسهل الحالات لأن صيغة <code>$</code> التفاعلية فيه تعمل مع أي كائن له تابع <code>.subscribe()</code>—وهو ما توفّره Nanostores أصلًا. فلا حاجة إلى حزمة ربط.</p>
<pre><code class="language-svelte">&lt;script&gt;
  import { counter } from './stores';
&lt;/script&gt;

&lt;button on:click={() =&gt; counter.set($counter + 1)}&gt;
  {$counter}
&lt;/button&gt;
</code></pre>
<p>تصيغة <code>$counter</code> تشترك تلقائيًا وتلغي الاشتراك تلقائيًا. وقد صُمّمت Nanostores مع مراعاة هذا التوافق—فعقد <code>.subscribe()</code> يطابق عقد المخزن في Svelte تمامًا.</p>
<h3 id="angular">Angular</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">NanostoresService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@nicobachner/nanostores-angular&#x27;</span>;
<span class="hljs-keyword">import</span> { counter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./stores&#x27;</span>;

<span class="hljs-meta">@Component</span>({
  <span class="hljs-attr">template</span>: <span class="hljs-string">\`&lt;button (click)=&quot;increment()&quot;&gt;{{ count$ | async }}&lt;/button&gt;\`</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CounterComponent</span> {
  count$ = <span class="hljs-variable language_">this</span>.<span class="hljs-property">nanostores</span>.<span class="hljs-title function_">useStore</span>(counter);
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">nanostores</span>: <span class="hljs-title class_">NanostoresService</span></span>) {}

  <span class="hljs-title function_">increment</span>(<span class="hljs-params"></span>) {
    counter.<span class="hljs-title function_">set</span>(counter.<span class="hljs-title function_">get</span>() + <span class="hljs-number">1</span>);
  }
}
</code></pre>
<p>يعيد ربط Angular مرصدًا (Observable)، ما يعني أنه يعمل مع أنبوب <code>async</code> وكشف التغييرات في Angular. والربط الذي يصونه المجتمع أقل رسمية من ربطَي React وVue، لكن النمط واحد.</p>
<h3 id="javascript-الخامل">JavaScript الخامل</h3>
<p>لا حاجة إلى ربط. اشترك مباشرةً فقط.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { counter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./stores&#x27;</span>;

<span class="hljs-keyword">const</span> display = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;count&#x27;</span>);

counter.<span class="hljs-title function_">subscribe</span>(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
  display.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">String</span>(value);
});
</code></pre>
<p>وهذا مفيد لمكوّنات الويب، أو شيفرة jQuery القديمة، أو أي سياق لا يوجد فيه ربط إطار. فالمخزن لا يعرف ولا يهمّه من يستهلكه.</p>
<h2 id="لماذا-يهم-الحياد-تجاه-الأطر">لماذا يهمّ الحياد تجاه الأطر</h2>
<p>معظم مكتبات الحالة مرتبطة بإطار. فـRedux يفترض React (أو على الأقل نموذج اشتراك شبيهًا بـReact). وPinia يفترض Vue. ومخازن Svelte تفترض صيغة <code>$</code> في Svelte. وهذا جيد عندما يكون تطبيقك كله إطارًا واحدًا، لكنه يصير مشكلة حقيقية في ثلاث حالات.</p>
<p><strong>واجهات أمامية دقيقة بأطر مختلطة.</strong> إن كان الهيكل المضيف React وإحدى الوحدات البعيدة Vue، فأي مكتبة حالة خاصة بـReact لا نفع لها في التواصل عبر الحدود. أما Nanostores فتعمل في الاثنين لأن جوهرها JavaScript خالص وكل جانب يستخدم ربط إطاره.</p>
<p><strong>الترحيلات التدريجية.</strong> إن كنت تُخنق تطبيقًا قديمًا من إطار إلى آخر، فالحالة المشتركة بين الشيفرة القديمة والجديدة مشكلة حقيقية. ويتيح مخزن محايد تجاه الأطر للجانبين قراءة الحالة نفسها والكتابة فيها أثناء الترحيل، دون صيانة نظامَي حالة متوازيين.</p>
<p><strong>مكوّنات الويب والعناصر المخصّصة.</strong> لا إطار لمكوّنات الويب. إنها مجرد أصناف تمتد <code>HTMLElement</code>. والمخزن المحايد تجاه الأطر هو خيار إدارة الحالة الوحيد الذي يعمل داخل مكوّن ويب <em>و</em> في مكوّنات الأطر التي تستهلكه.</p>
<p>وNanostores ليست الخيار المحايد الوحيد تجاه الأطر—فيمكنك استخدام <code>EventTarget</code> عادي، أو <code>BehaviorSubject</code> من RxJS، أو حتى كائن JavaScript مشترك باشتراكات يدوية. لكن Nanostores تمنحك واجهة برمجية نظيفة، ومخازن محسوبة، وتتبّع تغييرات على مستوى المفتاح، وروابط أطر مصانة في حزمة صغيرة تكاد لا تُسجَّل في حزمتك.</p>
<h2 id="دورة-الحياة-والذاكرة">دورة الحياة والذاكرة</h2>
<p>لدى Nanostores مفهوم يسمى <strong>أحداث دورة الحياة</strong> يتحكم في متى تبدأ المخازن عملًا مكلفًا ومتى تتوقف. فالنداء الراجع <code>onMount</code> في المخزن يعمل عند ظهور أول مشترك، وتعمل دالة التنظيف عند اختفاء آخر مشترك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { atom, onMount } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">const</span> currentTime = atom&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;&#x27;</span>);

<span class="hljs-title function_">onMount</span>(currentTime, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
    currentTime.<span class="hljs-title function_">set</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>());
  }, <span class="hljs-number">1000</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
});
</code></pre>
<p>فالمؤقّت لا يعمل إلا عندما يكون هناك مشترك فعلي في <code>currentTime</code>. وإن فُصل كل مكوّن يستخدمه، يتوقف المؤقّت. وعند ظهور مشترك جديد، يبدأ مجددًا. وهذا مكافئ Nanostores للتهيئة الكسولة—فالتأثيرات الجانبية المكلفة في المخزن لا تعمل إلا عندما يستمع أحد.</p>
<p>ونموذج دورة الحياة هذا مفيد خصوصًا للمخازن التي تجلب بيانات، أو تفتح اتصالات WebSocket، أو تُعدّ استطلاعًا دوريًا. فيبدأ العمل عند أول اشتراك ويُنظّف عند آخر إلغاء اشتراك، ما يمنع تسريبات الموارد دون الحاجة إلى إدارة دورة حياة يدوية.</p>
<h2 id="nanostores-في-سياق-الاتحاد">Nanostores في سياق الاتحاد <span class="content-anchor" id="nanostores-in-a-federation-context"></span></h2>
<p>هنا تكسب Nanostores مكانها في دورة واجهات المؤسسات. ففي <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">تمرين التركيب وقت التشغيل</a>، استخدمنا Nanostores لحلّ مشكلة لم يستطع سياق React حلها: مشاركة حالة المصادقة بين هيكل مضيف ووحدة بعيدة اتحادية.</p>
<p>وسبب نجاح ذلك أن مخازن Nanostores كائنات JavaScript عادية. فالذرّة التي تنشئها <code>atom(initialValue)</code> ليست إلا كائنًا بـ<code>.get()</code> و<code>.set()</code> و<code>.subscribe()</code>. ولا تعتمد على مُوفِّق React، ولا نظام تفاعل Vue، ولا أي دواخل إطار. وإن كان لجزأين من الشيفرة—مهما كانت طريقة بنائهما أو حزمهما—مرجع إلى كائن الذرّة نفسه، فبوسعهما قراءة الحالة المشتركة والكتابة فيها عبره.</p>
<p>والاستدراك في كلمة «نفسه». ففي إعداد اتحاد الوحدات، تعني «نفسه» أن الوحدة التي تنشئ الذرّة يجب أن تكون اعتمادًا مشتركًا من نوع النسخة الوحيدة. فإن كانت <code>@pulse/shared</code> هي التي تنشئ الذرّة وكان المضيف والوحدة البعيدة يستوردن من <code>@pulse/shared</code>، فعلى وقت تشغيل الاتحاد أن يضمن حصول الجانبين على <em>نسخة الوحدة نفسها</em>. وهذا ما يفعله <code>singleton: true</code> في إعداد <code>shared</code>. وبدونه، يقيّم كل جانب الوحدة باستقلال، وينشئ ذرّته الخاصة، فتصير الذرّتان كائنين غير مرتبطين صادف أن لهما القيمة الأولية نفسها.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// shared/src/auth-store.ts</span>
<span class="hljs-keyword">import</span> { atom } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> authStore = <span class="hljs-title function_">atom</span>({
  <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-literal">null</span>,
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// host writes</span>
<span class="hljs-keyword">import</span> { authStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;
authStore.<span class="hljs-title function_">set</span>({ <span class="hljs-attr">user</span>: data, <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;jwt-...&#x27;</span> });

<span class="hljs-comment">// remote reads</span>
<span class="hljs-keyword">import</span> { useStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>;
<span class="hljs-keyword">import</span> { authStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;

<span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">useStore</span>(authStore);
</code></pre>
<p>وكذلك تحتاج <code>nanostores</code> و<code>@nanostores/react</code> كلتاهما إلى أن تكونا نسختين وحيدتين. فإن تكرّرت مكتبة المخازن نفسها، كانت آلية الاشتراك في نسخة غير مرئية للأخرى. فالحزم الثلاث—الحزمة المشتركة، وNanostores، وربط الإطار—تكوّن سلسلة نسخ وحيدة. واكسر أي حلقة فتتوقف الحالة عن التدفق، بصمت.</p>
<p>وبالنسبة إلى التواصل عبر الحدود غير المعتمد على وحدات مشتركة من نوع النسخة الوحيدة، فـ<a href="https://stevekinney.com/courses/enterprise-ui/broadcast-channel"><code>BroadcastChannel</code></a> هو البديل. فهو يقايض القراءات المتزامنة والاشتراكات التفاعلية بمراسلة محدودة النطاق بالمصدر تعمل بغض النظر عن طريقة حزم الوحدات. وتستخدم فرق كثيرة الاثنين: Nanostores للتفاعل داخل الصفحة، و<code>BroadcastChannel</code> للمزامنة بين التبويبات.</p>
<h2 id="nanostores-مقابل-البدائل">Nanostores مقابل البدائل</h2>
<table>
<thead>
<tr>
<th>البديل</th>
<th>الاقتران بإطار</th>
<th>حجم الحزمة</th>
<th>الاستخدام عبر الحدود</th>
<th>المقايضة الجوهرية</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nanostores</td>
<td>لا شيء</td>
<td>نحو 1 كيلوبايت</td>
<td>ممتاز</td>
<td>بلا وسيط، ولا أدوات تطوير، ولا أنماط صارمة</td>
</tr>
<tr>
<td>Redux / Zustand</td>
<td>React أولًا</td>
<td>متوسط–كبير</td>
<td>ضعيف</td>
<td>نظام بيئي غني لكنه مقفل على الإطار</td>
</tr>
<tr>
<td>Jotai / Recoil</td>
<td>React فقط</td>
<td>صغير–متوسط</td>
<td>ضعيف</td>
<td>تكامل مع Suspense لكن بلا استخدام عبر الأطر</td>
</tr>
<tr>
<td><code>BehaviorSubject</code> من RxJS</td>
<td>لا شيء</td>
<td>كبير (RxJS)</td>
<td>جيد</td>
<td>صندوق أدوات تفاعلي كامل لكنه ثقيل لحالة بسيطة</td>
</tr>
<tr>
<td><code>EventTarget</code> عادي</td>
<td>لا شيء</td>
<td>صفر</td>
<td>جيد</td>
<td>بلا مخازن محسوبة، وبلا روابط أطر، واصنعه بنفسك</td>
</tr>
</tbody>
</table>
<p><strong>مقابل Redux/Zustand</strong>: كلاهما React أولًا. فلRedux وسيط وتنقيح سفر عبر الزمن ونظام بيئي ضخم. وZustand أصغر وأبسط لكنه خاص بـReact. أما Nanostores فصغيرهما كثيرًا ويعمل عبر الأطر، لكنه لا يملك وسيطًا ولا أدوات تطوير ولا الأنماط الصارمة (إجراءات، ومخفّضات، وشرائح) التي يوفّرها Redux. فإن احتجت تلك الأنماط، فNanostores ليس بديلًا. وإن احتجت قابلية النقل عبر الأطر، فلا يستطيع Redux وZustand توفيرها.</p>
<p><strong>مقابل Jotai/Recoil</strong>: ذرّات Jotai متشابهة مفهوميًا مع ذرّات Nanostores، لكن Jotai مندمج بعمق مع ميزات React المتزامنة وSuspense. أما ذرّات Nanostores فأبسط—بلا سلوك خاص بـReact، وبلا تكامل مع Suspense، وبلا مزوّد مطلوب. وJotai الخيار الأفضل للحالة المستنبطة المعقّدة الخاصة بـReact. وNanostores الخيار الأفضل عندما قد لا يكون المستهلك React.</p>
<p><strong>مقابل <code>BehaviorSubject</code> من RxJS</strong>: <code>BehaviorSubject</code> مشابه وظيفيًا لذرّة Nanostores—فهو يحمل قيمة حالية ويُشعر المشتركين عند التغيير. ويمنحك RxJS معاملات (operators) وخطوط أنابيب وصندوق أدوات البرمجة التفاعلية كاملًا. أما Nanostores فيمنحك واجهة برمجية أبسط بكثير بحزمة أصغر بكثير. وإن كنت تستخدم RxJS أصلًا، فيعمل <code>BehaviorSubject</code> بشكل جيد كحالة عبر الحدود. وإن لم تكن، فإضافة RxJS لإدارة الحالة وحدها آلة ثقيلة.</p>
<p><strong>مقابل <code>EventTarget</code> العادي</strong>: يمكنك بناء نمط الاشتراك نفسه بـ<code>new EventTarget()</code> و<code>CustomEvent</code>. وهو يعمل، وبلا أي اعتمادات. والعيب أنك تعيد تنفيذ <code>.get()</code> و<code>.set()</code> والمخازن المحسوبة وتتبّع التغييرات على مستوى المفتاح وروابط الأطر بنفسك. أما Nanostores فهي نسخة «أحدهم فعل ذلك بشكل صحيح سابقًا».</p>
<h2 id="متى-يكون-nanostores-الخيار-الصحيح">متى يكون Nanostores الخيار الصحيح</h2>
<p>استخدم Nanostores عندما تحتاج حالة تفاعلية مشتركة عبر حدود الأطر، أو حدود اتحاد الوحدات، أو حدود الترحيل. واستخدمها عندما تكون الحالة أبسط من أن يكون نمط Redux عبئًا عليها. واستخدمها عندما يهمّ حجم الحزمة ولا يمكنك تبرير مكتبة حالة أكبر لقيم مشتركة قليلة.</p>
<p>ولا تستخدم Nanostores عندما تحتاج وسيطًا، أو أدوات تطوير، أو تنقيح سفر عبر الزمن، أو الأنماط البنيوية التي يوفّرها Redux أو Zustand. ولا تستخدمها كبديل كامل عن إدارة الحالة الأصلية في الإطار داخل تطبيق بإطار واحد—فـ<code>useState</code> و<code>useReducer</code> في React كافيتان تمامًا للحالة المحلية بالمكوّن، وإضافة مكتبة لذلك مجرد إضافة مكتبة.</p>
<p>والمنطقة المثلى هي الحالة المشتركة العابرة للحدود المحايدة تجاه الأطر في معماريات لا تصحّ فيها افتراضات «إطار واحد، وحزمة واحدة، ومساحة ذاكرة واحدة». وهذه بالضبط الحالة التي يُنشئها اتحاد الوحدات—ولهذا تستمر Nanostores في الظهور في أحاديث الواجهات الأمامية الدقيقة.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
