const s="patterns-dev",a="react",n="أنماط React وNext.js",p="presentational-container-pattern",t="نمط الحاوية/العرض التقديمي",e=[{depth:2,id:"المكون-التقديمي-presentational-component",text:"المكوّن التقديمي (Presentational Component)"},{depth:2,id:"مكونات-الحاوية-container-components",text:"مكوّنات الحاوية (Container Components)"},{depth:2,id:"الخطافات-hooks",text:"الخطّافات (Hooks)"},{depth:2,id:"المميزات",text:"المميزات"},{depth:2,id:"العيوب",text:"العيوب"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<p>في React، إحدى الطرق لتفرض فصل المسؤوليات (separation of concerns) هي استخدام <strong>نمط الحاوية/المكوّن التقديمي (Container/Presentational pattern)</strong>. وبهذا النمط يمكننا فصل العرض (view) عن منطق التطبيق.</p>
<p>لنفترض أننا نريد إنشاء تطبيق يجلب 6 صور لكلاب، ويعرض هذه الصور على الشاشة.</p>
<p>JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DogImages</span>(<span class="hljs-params">{ dogs }</span>) {
  <span class="hljs-keyword">return</span> dogs.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">dog, i</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{dog}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Dog&quot;</span> /&gt;</span></span>);
}
</code></pre>
<p><a href="https://codesandbox.io/embed/sleepy-murdock-if0ec">افتح CodeSandbox</a></p>
<p>من الناحية المثلى، نريد فرض فصل المسؤوليات بتقسيم هذه العملية إلى جزأين:</p>
<ul>
<li><strong>المكوّنات التقديمية (Presentational Components)</strong>: مكوّنات تهتم بـ <em><strong>كيفية</strong></em> عرض البيانات للمستخدم. في هذا المثال، هو <em>عرض قائمة صور الكلاب</em>.</li>
<li><strong>مكوّنات الحاوية (Container Components)</strong>: مكوّنات تهتم بـ <em><strong>ما هي</strong></em> البيانات التي تُعرض للمستخدم. في هذا المثال، هو <em>جلب صور الكلاب</em>.</li>
</ul>
<p>أما جلب صور الكلاب فيتعلّق بـ <strong>منطق التطبيق (application logic)</strong>، في حين أن عرض الصور لا يتعلّق إلا بـ <strong>العرض (view)</strong>.</p>
<h2 id="المكون-التقديمي-presentational-component">المكوّن التقديمي (Presentational Component)</h2>
<p>يتلقّى المكوّن التقديمي بياناته عبر <code>props</code> (الخصائص). ووظيفته الأساسية هي ببساطة <strong>عرض البيانات التي يتلقاها</strong> بالطريقة التي نريدها، بما في ذلك الأنماط (styles)، <em>من دون تعديل</em> تلك البيانات.</p>
<p>لننظر إلى المثال الذي يعرض صور الكلاب. عند عرض صور الكلاب، نريد ببساطة المرور على كل صورة كلاب تم جلبها من الواجهة البرمجية (API)، وعرض تلك الصور. وللقيام بذلك، يمكننا إنشاء مكوّن دالتي (functional component) يتلقّى البيانات عبر <code>props</code>، ويعرض ما يتلقّاه.</p>
<p>JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DogImages</span>(<span class="hljs-params">{ dogs }</span>) {
  <span class="hljs-keyword">return</span> dogs.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">dog, i</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{dog}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Dog&quot;</span> /&gt;</span></span>);
}
</code></pre>
<p><a href="https://codesandbox.io/embed/sleepy-murdock-if0ec">افتح CodeSandbox</a></p>
<p>المكوّن <code>DogImages</code> هو مكوّن تقديمي. والمكوّنات التقديمية <em>عادةً</em> عديمة الحالة (stateless): فهي لا تحتوي على حالة React خاصة بها، إلا إذا كانت تحتاج إلى حالة لأغراض الواجهة. أما البيانات التي تتلقاها فلا تُغيّرها المكوّنات التقديمية نفسها.</p>
<p>وتتلقّى المكوّنات التقديمية بياناتها من <strong>مكوّنات الحاوية (container components)</strong>.</p>
<h2 id="مكونات-الحاوية-container-components">مكوّنات الحاوية (Container Components)</h2>
<p>وظيفة مكوّنات الحاوية الأساسية هي <strong>تمرير البيانات</strong> إلى المكوّنات التقديمية التي <em>تحتويها</em>. أما مكوّنات الحاوية نفسها فعادةً لا تعرض أي مكوّنات أخرى سوى المكوّنات التقديمية التي تهتم ببياناتها. ولأنها لا تعرض شيئًا بنفسها، فإنها عادةً لا تحتوي على أي تنسيق (styling) أيضًا.</p>
<p>في مثالنا، نريد تمرير صور الكلاب إلى المكوّن التقديمي <code>DogsImages</code>. وقبل أن نتمكن من ذلك، نحتاج إلى جلب الصور من واجهة برمجية خارجية. فنحتاج إلى إنشاء <strong>مكوّن حاوية (container component)</strong> يجلب هذه البيانات، ويمرّرها إلى المكوّن التقديمي <code>DogImages</code> لعرضها على الشاشة.</p>
<p>JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">DogImages</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./DogImages&quot;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">DogImagesContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">React.Component</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">super</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = {
      <span class="hljs-attr">dogs</span>: []
    };
  }


  <span class="hljs-title function_">componentDidMount</span>(<span class="hljs-params"></span>) {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;https://dog.ceo/api/breed/labrador/images/random/6&quot;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{ message }</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">dogs</span>: message }));
  }


  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DogImages</span> <span class="hljs-attr">dogs</span>=<span class="hljs-string">{this.state.dogs}</span> /&gt;</span></span>;
  }
}
</code></pre>
<p><a href="https://codesandbox.io/embed/sleepy-murdock-if0ec">افتح CodeSandbox</a></p>
<p>يدمج هذان المكوّنان معًا إمكانية فصل التعامل مع منطق التطبيق عن العرض.</p>
<h2 id="الخطافات-hooks">الخطّافات (Hooks)</h2>
<p>في كثير من الحالات، يمكن استبدال نمط الحاوية/العرض التقديمي بخطّافات React. فقد جعل إدخال الخطّافات من السهل على المطوّرين إضافة حالة (state) من دون الحاجة إلى مكوّن حاوية يوفّر تلك الحالة.</p>
<p>بدلًا من وضع منطق جلب البيانات في المكوّن <code>DogImagesContainer</code>، يمكننا إنشاء خطّاف مخصّص (custom hook) يجلب الصور ويُعيد مصفوفة الكلاب.</p>
<pre><code>export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() =&gt; {
    fetch(&quot;https://dog.ceo/api/breed/labrador/images/random/6&quot;)
      .then((res) =&gt; res.json())
      .then(({ message }) =&gt; setDogs(message));
  }, []);

  return dogs;
}
</code></pre>
<p>باستخدام هذا الخطّاف، لم نعد بحاجة إلى مكوّن الحاوية <code>DogImagesContainer</code> الغالب ليجلب البيانات ويمرّرها إلى المكوّن التقديمي <code>DogImages</code>. وبدلًا من ذلك، يمكننا استخدام هذا الخطّاف مباشرةً في المكوّن التقديمي <code>DogImages</code> لدينا!</p>
<p>JavaScript iconDogImages.jsJavaScript iconuseDogImages.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> useDogImages <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./useDogImages&quot;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DogImages</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> dogs = <span class="hljs-title function_">useDogImages</span>();


  <span class="hljs-keyword">return</span> dogs.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">dog, i</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{dog}</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Dog&quot;</span> /&gt;</span></span>);
}
</code></pre>
<p><a href="https://codesandbox.io/embed/rough-brook-tzp7i">افتح CodeSandbox</a></p>
<p>باستخدام خطّاف <code>useDogImages</code>، فإننا لا زلنا نفصل منطق التطبيق عن العرض. فنحن نكتفي باستخدام البيانات المُعادة من خطّاف <code>useDogImages</code>، من دون تعديل تلك البيانات داخل المكوّن <code>DogImages</code>.</p>
<p>تجعل الخطّافات من السهل فصل المنطق عن العرض داخل المكوّن، تمامًا كما يفعل نمط الحاوية/العرض التقديمي. وهي توفر علينا الطبقة الإضافية التي كانت ضرورية لتغليف المكوّن التقديمي داخل مكوّن الحاوية.</p>
<h2 id="المميزات">المميزات</h2>
<p>هناك فوائد كثيرة لاستخدام نمط الحاوية/العرض التقديمي.</p>
<p>يشجّع نمط الحاوية/العرض التقديمي على فصل المسؤوليات. فيمكن أن تكون المكوّنات التقديمية دوال نقية (pure functions) مسؤولة عن واجهة المستخدم، بينما تكون مكوّنات الحاوية مسؤولة عن حالة التطبيق وبياناته. وهذا يجعل فرض فصل المسؤوليات سهلًا.</p>
<p>وتصبح المكوّنات التقديمية سهلة إعادة الاستخدام، لأنها <em>تعرض</em> البيانات فحسب دون تغييرها. يمكننا إعادة استخدام المكوّنات التقديمية في أنحاء تطبيقنا لأغراض مختلفة.</p>
<p>ولأن المكوّنات التقديمية لا تغيّر منطق التطبيق، فإن مظهرها يمكن أن يغيّره بسهولة شخص لا يعرف قاعدة الأكواد (codebase)، مثل مصمّم. وإذا أُعيد استخدام المكوّن التقديمي في أجزاء كثيرة من التطبيق، فإن التغيير سيكون متسقًا في التطبيق كله.</p>
<p>واختبار المكوّنات التقديمية سهل، لأنها عادةً دوال نقية. فنحن نعرف ما الذي سيعرضه المكوّن بناءً على البيانات التي نمرّرها، من دون الحاجة إلى محاكاة (mocking) مخزن بيانات.</p>
<h2 id="العيوب">العيوب</h2>
<p>يتيح نمط الحاوية/العرض التقديمي فصل منطق التطبيق عن منطق العرض بسهولة. لكن الخطّافات تجعل من الممكن تحقيق النتيجة نفسها من دون الحاجة إلى استخدام نمط الحاوية/العرض التقديمي، ومن دون الحاجة إلى إعادة كتابة مكوّن دالتي عديم الحالة ليصبح مكوّن صنف (class component). ولاحظ أننا اليوم لم نعد بحاجة إلى إنشاء مكوّنات أصناف لاستخدام الحالة.</p>
<p>ولرغم أننا ما زلنا نستطيع استخدام نمط الحاوية/العرض التقديمي حتى مع خطّافات React، فإن هذا النمط يمكن أن يكون مبالغًا فيه بسهولة في التطبيقات الأصغر حجمًا.</p>
<blockquote>
<p><strong>ملاحظة (React 18+):</strong> يفضّل React الحديث بقوةً <strong>الخطّافات على مكوّنات الحاوية</strong> لفصل المنطق عن العروض. يمكن للخطّافات المخصّصة أن تحلّ محلّ الحاويات القائمة على الأصناف بالكامل — فمثلًا، يستطيع خطّاف <code>useDogImages</code> جلب البيانات باستخدام <code>useState</code> و<code>useEffect</code>، ثم يستطيع أي مكوّن أن ينادي <code>const dogs = useDogImages()</code> للحصول على البيانات. وهذا يحقق فصل المسؤوليات نفسه (جلب البيانات مقابل واجهة المستخدم) مع شيفرة تكرارية أقل وبدون أي مكوّن غلاف. وهذا الأسلوب القائم على الخطّافات صديق أيضًا لتحسينات React القادمة — إذ يستطيع مُصرِّف React (React Compiler) تحسين المكوّنات الدالية والخطّافات على نحو أفضل من دورات حياة الأصناف.</p>
</blockquote>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0">Presentational and Container Components - Dan Abramov</a></li>
</ul>
`,l={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:e,html:o};export{s as book,a as chapter,n as chapterTitle,l as default,e as headings,o as html,p as slug,t as title};
