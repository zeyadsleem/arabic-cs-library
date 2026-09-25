const s="patterns-dev",a="vanilla",n="أنماط JavaScript",l="mixin-pattern",t="نمط المزيج (mixin)",p=[{depth:2,id:"مثال-عملي-تتبع-التغييرات",text:"مثال عملي: تتبّع التغييرات"},{depth:2,id:"تركيب-عدة-سمات-باستخدام-مساعدة",text:"تركيب عدة سمات باستخدام مساعدة"},{depth:2,id:"مزيجات-مصنع-factory-الأصناف-الفرعية",text:"مزيجات مصنع (factory) الأصناف الفرعية"},{depth:2,id:"المزيجات-في-المتصفح-browser",text:"المزيجات في المتصفح (browser)"},{depth:2,id:"المزيجات-مقابل-التركيب-مقابل-الخطافات",text:"المزيجات مقابل التركيب مقابل الخطافات"},{depth:2,id:"زاوية-المزخرفات-decorators",text:"زاوية المزخرفات (decorators)"},{depth:2,id:"المقايضات",text:"المقايضات"},{depth:2,id:"المراجع",text:"المراجع"}],e=`<p><strong>المزيج (mixin)</strong> حزمة من السلوك قابلة لإعادة الاستخدام يمكن دمجها في صنف أو كائن ليكتسب قدرات من دون أن يكون جزءًا من سلسلة وراثة. تسمح JavaScript بوراثة صنف واحد فقط، لذلك تسد المزيجات هذه الفجوة: تتيح لك مشاركة مسؤوليات مستقلة — مثل التسجيل وتتبع الاتساخ والتحليل التسلسلي وإدارة الأحداث — عبر أصناف لا تشترك في شيء آخر.</p>
<p>لا يزال النمط ظاهرًا في قواعد الشيفرة الحديثة، من «أصناف المزيج» في TypeScript إلى <code>mixins</code> في Vue 2 و<code>Object.extend</code> في Backbone وحتى تفاصيل المتصفح مثل <code>WindowOrWorkerGlobalScope</code>، لكنه نادرًا ما يكون الخيار الأول في عام 2024. فالتركيب والخطافات ووحدات الأدوات الصغيرة تغطي معظم ما صُممت المزيجات لحلها، عادةً مع مفاجآت أقل.</p>
<h2 id="مثال-عملي-تتبع-التغييرات">مثال عملي: تتبّع التغييرات</h2>
<p>لنفترض لدينا صنف <code>Document</code> لتطبيق ملاحظات. نريد معرفة ما إذا كان المستند يحتوي على تعديلات غير محفوظة، ومتى آخر تعديل، ونريد «إعادة تعيين» حالة التغيير بعد الحفظ. يمكننا كتابة ذلك مباشرة على الصنف، لكن السلوك نفسه مفيد في <code>Note</code> و<code>Folder</code> و<code>Tag</code> وكل ما يستطيع المستخدم تحريره. وهذا يجعله مرشحًا مثاليًا لمزيج.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Document</span> {

<span class="hljs-title function_">constructor</span>(<span class="hljs-params">title, body</span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">title</span> = title;

<span class="hljs-variable language_">this</span>.<span class="hljs-property">body</span> = body;

}

}
</code></pre>
<p>نبدأ بكائن سمة عادي يلتقط سلوك تتبّع التغييرات:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> dirtyTrackable = {

<span class="hljs-title function_">markDirty</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">_dirty</span> = <span class="hljs-literal">true</span>;

<span class="hljs-variable language_">this</span>.<span class="hljs-property">_lastModified</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

},

<span class="hljs-title function_">markClean</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">_dirty</span> = <span class="hljs-literal">false</span>;

},

<span class="hljs-title function_">isDirty</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> <span class="hljs-title class_">Boolean</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">_dirty</span>);

},

<span class="hljs-title function_">lastModified</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_lastModified</span> ?? <span class="hljs-literal">null</span>;

},

};
</code></pre>
<p>لطبيقه، نثبت السمة على النموذج الأولي باستخدام <code>Object.assign</code>. تحصل الآن كل نسخة من <code>Document</code> وكل صنف فرعي على الطرق الأربعة مجانًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Document</span> {

<span class="hljs-title function_">constructor</span>(<span class="hljs-params">title, body</span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">title</span> = title;

<span class="hljs-variable language_">this</span>.<span class="hljs-property">body</span> = body;

}

}

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">assign</span>(<span class="hljs-title class_">Document</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>, dirtyTrackable);

<span class="hljs-keyword">const</span> draft = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Document</span>(<span class="hljs-string">&quot;Patterns&quot;</span>, <span class="hljs-string">&quot;Mixins, composition, hooks...&quot;</span>);

draft.<span class="hljs-title function_">markDirty</span>();

draft.<span class="hljs-title function_">isDirty</span>(); <span class="hljs-comment">// true</span>

draft.<span class="hljs-title function_">markClean</span>();

draft.<span class="hljs-title function_">isDirty</span>(); <span class="hljs-comment">// false</span>
</code></pre>
<p>هذه أبسط صيغة للنمط: كائن سمة مع استدعاء <code>Object.assign</code>. تصلح للاستخدام المنفرد، لكنها تعاني مشكلتين معروفتين. أولًا، تحجب الطرق الجديدة بهدوء أي شيء بالاسم نفسه على النموذج الأولي. ثانيًا، لا يوجد أي سجل على <code>Document</code> يثبت تطبيق السمة، فيضطر القرّاء إلى البحث عنها.</p>
<h2 id="تركيب-عدة-سمات-باستخدام-مساعدة">تركيب عدة سمات باستخدام مساعدة</h2>
<p>عمليًا، تريد عادةً تطبيق عدة سمات بترتيب معلوم، مع وجود عنصر صريح في موقع الاستدعاء. تقوم مساعدة صغيرة اسمها <code>applyTraits</code> بالأمرين:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">applyTraits</span>(<span class="hljs-params">target, ...traits</span>) {

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> trait <span class="hljs-keyword">of</span> traits) {

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> <span class="hljs-title class_">Reflect</span>.<span class="hljs-title function_">ownKeys</span>(trait)) {

<span class="hljs-keyword">if</span> (key === <span class="hljs-string">&quot;constructor&quot;</span>) <span class="hljs-keyword">continue</span>;

<span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">hasOwnProperty</span>.<span class="hljs-title function_">call</span>(target.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>, key)) {

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Trait conflict on &quot;<span class="hljs-subst">\${<span class="hljs-built_in">String</span>(key)}</span>&quot;\`</span>);

}

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(

target.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>,

key,

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getOwnPropertyDescriptor</span>(trait, key)

);

}

}

<span class="hljs-keyword">return</span> target;

}
</code></pre>
<p>يمكننا الآن تراكم عدة سمات على صنف والحصول على خطأ صريح إذا تعارض اثنتان منها بدلًا من أن تفوز إحداهما بصمت:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> serializable = {

<span class="hljs-title function_">toJSON</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> { <span class="hljs-attr">title</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">title</span>, <span class="hljs-attr">body</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">body</span> };

},

};

<span class="hljs-keyword">const</span> eventEmitting = {

<span class="hljs-title function_">on</span>(<span class="hljs-params">event, handler</span>) {

(<span class="hljs-variable language_">this</span>.<span class="hljs-property">_handlers</span> ??= <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>()).<span class="hljs-title function_">set</span>(event, handler);

},

<span class="hljs-title function_">emit</span>(<span class="hljs-params">event, payload</span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">_handlers</span>?.<span class="hljs-title function_">get</span>(event)?.(payload);

},

};

<span class="hljs-title function_">applyTraits</span>(<span class="hljs-title class_">Document</span>, dirtyTrackable, serializable, eventEmitting);
</code></pre>
<h2 id="مزيجات-مصنع-factory-الأصناف-الفرعية">مزيجات مصنع (factory) الأصناف الفرعية</h2>
<p>يغطي كائن السمة معظم الحالات، لكنه لا يستطيع توسيع السلوك؛ إذ لا يمكن للسمة استدعاء إصدار <code>super</code> من دالة، لعدم وجود صنف أب تشير إليه. وتصحح صيغة مصنع الصنف الفرعي ذلك. يصبح المزيج دالة تأخذ صنفًا أبًا وتعيد صنفًا فرعيًا جديدًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Timestamped</span> = (<span class="hljs-params">Base</span>) =&gt;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">extends</span> <span class="hljs-title class_">Base</span> {

<span class="hljs-title function_">constructor</span>(<span class="hljs-params">...args</span>) {

<span class="hljs-variable language_">super</span>(...args);

<span class="hljs-variable language_">this</span>.<span class="hljs-property">createdAt</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();

}

<span class="hljs-title function_">touch</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">updatedAt</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();

}

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Versioned</span> = (<span class="hljs-params">Base</span>) =&gt;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">extends</span> <span class="hljs-title class_">Base</span> {

<span class="hljs-title function_">constructor</span>(<span class="hljs-params">...args</span>) {

<span class="hljs-variable language_">super</span>(...args);

<span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span> = <span class="hljs-number">1</span>;

}

<span class="hljs-title function_">bump</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">this</span>.<span class="hljs-property">version</span> += <span class="hljs-number">1</span>;

}

};

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Note</span> {}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TrackedNote</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Versioned</span>(<span class="hljs-title class_">Timestamped</span>(<span class="hljs-title class_">Note</span>)) {}

<span class="hljs-keyword">const</span> n = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TrackedNote</span>();

n.<span class="hljs-title function_">touch</span>();

n.<span class="hljs-title function_">bump</span>();
</code></pre>
<p>هذه الصيغة أكثر تفصيلًا، لكنها تتركب بصورة طبيعية مع <code>extends</code>، وتتوافق مع أنواع أصناف المزيج في TypeScript، وتتيح لكل طبقة استدعاء <code>super</code>. تستخدم معظم قواعد شيفرة TypeScript التي تحتاج إلى مزيجات هذه الصيغة.</p>
<h2 id="المزيجات-في-المتصفح-browser">المزيجات في المتصفح (browser)</h2>
<p>لا حاجة إلى اختلاق أمثلة للمزيجات؛ فمنصة الويب مليئة بها. يسحب كائن <code>Window</code> طرقًا من <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope"><code>WindowOrWorkerGlobalScope</code></a> (ومنه تأتي <code>setTimeout</code> و<code>fetch</code> و<code>queueMicrotask</code> و<code>isSecureContext</code>) ومن <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers"><code>WindowEventHandlers</code></a> (خصائص شبيهة بـ<code>onbeforeunload</code>). وتُعرَّف هذه في المواصفة كواجهات مزيج؛ لا يمكنك إنشاء نسخ منها بصورة مستقلة، وإنما ترى أعضائها فقط على المضيفات مثل <code>Window</code> أو <code>WorkerGlobalScope</code>.</p>
<h2 id="المزيجات-مقابل-التركيب-مقابل-الخطافات">المزيجات مقابل التركيب مقابل الخطافات</h2>
<p>اختُرعت المزيجات قبل أن تتوفر بدائل مريحة في JavaScript. اليوم، يكاد يكون أمامك خيار دائمًا. إليك دليل قرار موجزًا:</p>
<table>
<thead>
<tr>
<th>الحاجة</th>
<th>الأداة المناسبة</th>
<th>السبب</th>
</tr>
</thead>
<tbody>
<tr>
<td>مشاركة السلوك عبر أصناف عادية</td>
<td>مزيج بكائن سمة</td>
<td>أقل التكاليف الإجرائية عندما لا توجد استدعاءات <code>super</code>.</td>
</tr>
<tr>
<td>سلوك متراكم يستدعي السلسلة</td>
<td>مزيج مصنع صنف فرعي</td>
<td>كل طبقة صنف فرعي حقيقي، لذا تعمل <code>super.method()</code>.</td>
</tr>
<tr>
<td>مشاركة السلوك عبر مكونات React</td>
<td>خطاف مخصص</td>
<td>تتركب الخطافات خطيًا، وتكون صريحة في موقع الاستدعاء، ولا تلوث نسخة المكون.</td>
</tr>
<tr>
<td>مشاركة السلوك عبر مكونات Vue</td>
<td>دوال تركيب (<code>useX</code>)</td>
<td>المزايا نفسها التي تقدمها خطافات React. ما زالت واجهة <code>Vue.mixin</code> القديمة تعمل لكنها غير موصى بها في Vue 3.</td>
</tr>
<tr>
<td>علاقات الاحتواء (has-a)</td>
<td>التركيب (حقل على الصنف)</td>
<td>الإجابة الأقل استخدامًا على الإطلاق. لو كان <code>Document</code> يحتفظ ببساطة بنسخة <code>DirtyTracker</code>، فلن يهم أيٌّ من هذا.</td>
</tr>
</tbody>
</table>
<p>أوقف فريق React <a href="https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html">المزيجات في عام 2016</a>. حلّت محلها المكونات عالية الترتيب لفترة، ثم استبدلت بها الخطافات في معظمها. وقد سلك المسار نفسه Vue، من مزيجات Options API إلى دوال تركيب Composition API، وSvelte، حيث لا يوجد مفهوم المزيج وتُشارك السلوكيات عبر المخازن والإجراءات. اتجاه التطور واضح: يتفوق التركيب الصريح على الدمج الضمني في النماذج الأولية.</p>
<h2 id="زاوية-المزخرفات-decorators">زاوية المزخرفات (decorators)</h2>
<p>يقترح <a href="https://github.com/tc39/proposal-decorators">مقترح المزخرفات في المرحلة 3</a>، الصادر مع TypeScript 5.0، طريقة أكثر تركيزًا لإرفاق قدرة مفردة. يمكن لمزخرف صنف <code>@dirtyTrackable</code> أن يثبت الطرق نفسها التي يثبتها مزيجنا مع ترك تعليق ظاهر في المصدر. وإلى أن تتوفر المزخرفات أصلًا في المتصفحات وNode، تظل المزيجات الخيار الأقل احتكاكًا، لكن من المفيد معرفة الاتجاه الذي تفضله هيئة المعايير.</p>
<h2 id="المقايضات">المقايضات</h2>
<p>تقلل المزيجات التكرار وسهل تطبيقها، لكن لها تكاليف حقيقية. تظهر الطرق على النسخ من دون أن تُعلن على الصنف، فيصعب التحليل الثابت والانتقال إلى التعريف في بيئات التطوير ومراجعة الشيفرة. وتطمس أسماء الطرق المتعارضة بعضها بعض بصمت ما لم تستخدم مساعدة تتحقق من ذلك. كما يصعب تصحيح سلاسل المزيجات العميقة لأن التسلسل الهرمي للنماذج الأولية لم يعد يطابق المصدر.</p>
<p>القاعدة الإرشادية: استخدم المزيج عندما يكون السلوك المشترك مستقلًا فعلًا عن كل صنف يُطبَّق عليه، مثل التسجيل أو تتبّع التغييرات أو التحليل التسلسلي أو إدارة الأحداث. ثم فكّر في التركيب كلما كان من المعقول أن يعيش السلوك في كائن متعاون. وفي أطر المكونات، فضّل الخطافات أو دوال التركيب؛ فهي صُممت تحديدًا لتحل محل هذا النمط.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c">المزيجات الوظيفية</a> - Eric Elliott</li>
<li><a href="https://javascript.info/mixins">المزيجات</a> - JavaScript Info</li>
<li><a href="https://www.typescriptlang.org/docs/handbook/mixins.html">دليل TypeScript: المزيجات</a></li>
<li><a href="https://github.com/tc39/proposal-decorators">مزخرفات المرحلة 3</a> - TC39</li>
<li><a href="https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html">المزيجات ضارة</a> - فريق React</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
