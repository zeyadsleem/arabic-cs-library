const s="patterns-dev",n="vanilla",a="أنماط JavaScript",t="prototype-pattern",e="نمط النموذج الأولي (prototype)",l=[{depth:2,id:"التفويض-كل-كائن-يشير-إلى-كائن-آخر",text:"التفويض: كل كائن يشير إلى كائن آخر"},{depth:2,id:"الاستنساخ-متى-لا-يكون-التفويض-هو-الحل",text:"الاستنساخ: متى لا يكون التفويض هو الحل"},{depth:3,id:"1-عامل-الانتشار-spread-للنسخ-السطحي-مع-الاستبدالات",text:"1. عامل الانتشار (spread) للنسخ السطحي مع الاستبدالات"},{depth:3,id:"2-structuredclone-للنسخ-العميق",text:"2. structuredClone للنسخ العميق"},{depth:3,id:"3-استنساخ-نسخة-صنف",text:"3. استنساخ نسخة صنف"},{depth:2,id:"عنصر-html-هو-نمط-النموذج-الأولي-في-dom",text:"عنصر HTML `` هو نمط النموذج الأولي في DOM"},{depth:2,id:"بيانات-الاختبار-وبانئات-الكائنات",text:"بيانات الاختبار وبانئات الكائنات"},{depth:2,id:"objectcreatenull-قواميس-بلا-نموذج-أولي",text:"Object.create(null): قواميس بلا نموذج أولي"},{depth:2,id:"السجلات-والمجموعات-tc39",text:"السجلات والمجموعات (TC39)"},{depth:2,id:"متى-يناسب-النمط",text:"متى يناسب النمط"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<p>في أدبيات أنماط التصميم (design patterns) الكلاسيكية، يتعلق <strong>النموذج الأولي (prototype)</strong> بـ<em>الاستنساخ</em>: تحتفظ بكائن قالب، ثم تستخرج نسخًا منه كلما احتجت نسخة جديدة. كان هذا التصور منطقيًا في C++ وSmalltalk، حيث كان إنشاء كائن من صنف يعني استدعاء دالة منشئة تعيد تشغيل شيفرة الإعداد في كل مرة.</p>
<p>يعكس JavaScript هذا النمط. فالاستنساخ ما زال مهمًا — سننظر لاحقًا إلى <code>structuredClone</code> وHTML \`\` — لكن <em>اللغة نفسها</em> مبنية على آلية نموذج أولي تفعل شيئًا لا يستطيع الاستنساخ الكلاسيكي فعله: <strong>التفويض (delegation)</strong>. يمكن للكائن أن يسلّل عمليات البحث إلى كائن آخر في وقت التشغيل، من دون أي نسخة. هذه هي الآلية التي تجعل <code>class</code> تعمل، وهي الجزء المحدد من النمط الذي يجعله مثيرًا للاهتمام في JavaScript.</p>
<p>يستعرض هذا المقال جانبَي النمط: النموذج الأولي بوصفه تفويضًا (الشكل الأصلي في JavaScript)، والنموذج الأولي بوصفه قالبًا (شكل الاستنساخ)، مع واجهات برمجية حديثة ستستخدمها فعليًا في عام 2025.</p>
<h2 id="التفويض-كل-كائن-يشير-إلى-كائن-آخر">التفويض: كل كائن يشير إلى كائن آخر</h2>
<p>كل كائن JavaScript له خانة داخلية، <code>[[Prototype]]</code>، تكون إما <code>null</code> أو مرجعًا إلى كائن آخر. عندما تقرأ خاصية، يفحص المحرك الكائن نفسه أولًا؛ وإذا لم يجد تطابقًا، يتبع <code>[[Prototype]]</code> ويحاول مجددًا، ماشيًا في السلسلة حتى يجد الخاصية أو يصل إلى <code>null</code>.</p>
<p>يمكنك رؤية السلسلة مباشرة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> widget = {

<span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;div class=&quot;<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.theme}</span>&quot;&gt;<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.label}</span>&lt;/div&gt;\`</span>;

},

};

<span class="hljs-keyword">const</span> button = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(widget);

button.<span class="hljs-property">label</span> = <span class="hljs-string">&quot;Save&quot;</span>;

button.<span class="hljs-property">theme</span> = <span class="hljs-string">&quot;primary&quot;</span>;

button.<span class="hljs-title function_">render</span>();             <span class="hljs-comment">// &quot;&lt;div class=\\&quot;primary\\&quot;&gt;Save&lt;/div&gt;&quot;</span>

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(button) === widget; <span class="hljs-comment">// true</span>
</code></pre>
<p>يمتلك <code>button</code> خاصيتين بالضبط: <code>label</code> و<code>theme</code>. توجد طريقة <code>render</code> على <code>widget</code>، لكن يستطيع <code>button</code> استدعاؤها لأن البحث يتسرب إلى أسفل السلسلة. هذا هو نمط النموذج الأولي كاملًا بصياغته في JavaScript — لا نسخة، ولا صنف، مجرد كائن يفوّض العمل إلى آخر.</p>
<p>الأصناف مجرد سكر نحوي فوق الآلية نفسها. عندما تكتب:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Widget</span> {

<span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;div class=&quot;<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.theme}</span>&quot;&gt;<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.label}</span>&lt;/div&gt;\`</span>;

}

}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">IconButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Widget</span> {

<span class="hljs-title function_">constructor</span>(<span class="hljs-params">{ label, theme, icon }</span>) {

<span class="hljs-variable language_">super</span>();

<span class="hljs-variable language_">this</span>.<span class="hljs-property">label</span> = label;

<span class="hljs-variable language_">this</span>.<span class="hljs-property">theme</span> = theme;

<span class="hljs-variable language_">this</span>.<span class="hljs-property">icon</span> = icon;

}

}
</code></pre>
<p>... تستقر طريقة <code>render</code> على <code>Widget.prototype</code>، ولكل نسخة من <code>IconButton</code> سلسلة <code>[[Prototype]]</code> تنتهي بـ <code>IconButton.prototype → Widget.prototype → Object.prototype → null</code>. ويجري حل الاستدعاء <code>new IconButton(...).render()</code> عبر تلك السلسلة، تمامًا كما فعل المثال الحرفي باستخدام <code>Object.create</code>. إن <code>class</code> مجرد طريقة أكثر ملاءمة لكتابة الشيء نفسه.</p>
<p>النتيجة العملية: توجد الطرق <em>مرة واحدة</em> لكل صنف، لا مرة واحدة لكل نسخة. تتشارك عشرة آلاف نسخة من <code>IconButton</code> مرجعًا واحدًا لوظيفة <code>render</code>. هذه هي الميزة في الذاكرة التي كانت مجموعة الأربعة (GoF) تهتم بها، لكنك تحصل عليها مجانًا في JavaScript ما دمت تحتفظ بالطرائق على النموذج الأولي، أي معرفتها داخل جسم <code>class</code> لا تعيينها داخل الدالة المنشئة.</p>
<h2 id="الاستنساخ-متى-لا-يكون-التفويض-هو-الحل">الاستنساخ: متى لا يكون التفويض هو الحل</h2>
<p>التفويض رائع لمشاركة <em>السلوك</em>. لكنه الأداة الخطأ لمشاركة <em>الحالة</em>. إذا احتاج كائنان إلى نسختيهما المستقلتين من تكوين متداخل، فيجب عليك فعليًا نسخه.</p>
<p>هناك ثلاثة خيارات تزايدًا مع درجة الدقة.</p>
<h3 id="1-عامل-الانتشار-spread-للنسخ-السطحي-مع-الاستبدالات">1. عامل الانتشار (spread) للنسخ السطحي مع الاستبدالات</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> baseConfig = {

<span class="hljs-attr">retries</span>: <span class="hljs-number">3</span>,

<span class="hljs-attr">timeoutMs</span>: <span class="hljs-number">5000</span>,

<span class="hljs-attr">headers</span>: { <span class="hljs-string">&quot;User-Agent&quot;</span>: <span class="hljs-string">&quot;patterns.dev&quot;</span> },

};

<span class="hljs-keyword">const</span> prodConfig = { ...baseConfig, <span class="hljs-attr">timeoutMs</span>: <span class="hljs-number">30_000</span> };
</code></pre>
<p>هذا هو النمط الذي تلجأ إليه في 90% من الوقت. تذكر فقط أن <code>prodConfig.headers === baseConfig.headers</code> — فعامل الانتشار يعمل على مستوى واحد. سيؤدي تعديل <code>prodConfig.headers[&quot;X-Trace&quot;]</code> إلى تعديل <code>baseConfig.headers</code> أيضًا. وهذا مصدر حقيقي للأخطاء.</p>
<h3 id="2-structuredclone-للنسخ-العميق">2. <code>structuredClone</code> للنسخ العميق</h3>
<p>دالة أصلية وموحّدة المعايير؛ مدعومة في كل متصفح حديث وNode 17+ وDeno وBun. تتعامل مع <code>Date</code> و<code>Map</code> و<code>Set</code> و<code>RegExp</code> والمصفوفات المكتوبة والرسوم البيانية الدورية، ولا ينجو أي منها من <code>JSON.parse(JSON.stringify(x))</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> config = {

<span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),

<span class="hljs-attr">tags</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>([<span class="hljs-string">&quot;beta&quot;</span>, <span class="hljs-string">&quot;internal&quot;</span>]),

<span class="hljs-attr">endpoints</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>([[<span class="hljs-string">&quot;read&quot;</span>, <span class="hljs-string">&quot;/r&quot;</span>], [<span class="hljs-string">&quot;write&quot;</span>, <span class="hljs-string">&quot;/w&quot;</span>]]),

};

<span class="hljs-keyword">const</span> copy = <span class="hljs-title function_">structuredClone</span>(config);

copy.<span class="hljs-property">tags</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;experimental&quot;</span>);

config.<span class="hljs-property">tags</span>.<span class="hljs-title function_">has</span>(<span class="hljs-string">&quot;experimental&quot;</span>); <span class="hljs-comment">// false — independent</span>
</code></pre>
<p>لا تنسخ الدوال أو عُقد DOM أو نسخ الأصناف؛ إذ تحصل على كائن عادي من دون نموذج أولي. تعامل معها بوصفها «نسخًا عميقًا لحالة قابلة للتسلسل»، لا «نسخًا عامًا لكائن».</p>
<h3 id="3-استنساخ-نسخة-صنف">3. استنساخ نسخة صنف</h3>
<p>يتطلب استنساخ نسخة من صنف مع إبقاء النموذج الأولي سليمًا مساعدة صغيرة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">cloneInstance</span>(<span class="hljs-params">instance</span>) {

<span class="hljs-keyword">const</span> copy = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(instance));

<span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">assign</span>(copy, <span class="hljs-title function_">structuredClone</span>({ ...instance }));

}
</code></pre>
<p>يمنحك <code>Object.create(proto)</code> كائنًا جديدًا على سلسلة النماذج الأولي الصحيحة، كي يستمر عمل <code>instanceof</code>. ويجري <code>structuredClone({ ...instance })</code> نسخًا عميقًا للخصائص الذاتية. وبدمجهما، تكون قد أعدت بناء الأصل. هذا أقرب ما يصل إليه JavaScript إلى فكرة «النموذج الأولي بوصفه قالبًا» في GoF، وهو مفيد للاحتفاظ به في جعبتك لأشياء مثل مكدسات التراجع في المحررات أو بانئات بيانات الاختبار.</p>
<h2 id="عنصر-html-هو-نمط-النموذج-الأولي-في-dom">عنصر HTML \`\` هو نمط النموذج الأولي في DOM</h2>
<p>يأتي المتصفح بنمط نموذج أولي مدمج لعُقد DOM. ضع ترميزًا خاملًا داخل \`\`، واستنسخه كلما احتجت نسخة جديدة، ثم أدرجه في الشجرة الحية:</p>
<pre><code class="language-javascript">&lt;template id=<span class="hljs-string">&quot;card&quot;</span>&gt;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-title&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;card-body&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>

&lt;/template&gt;
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> cardTemplate = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;card&quot;</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">makeCard</span>(<span class="hljs-params">{ title, body }</span>) {

<span class="hljs-keyword">const</span> node = cardTemplate.<span class="hljs-property">content</span>.<span class="hljs-title function_">cloneNode</span>(<span class="hljs-literal">true</span>);

node.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;.card-title&quot;</span>).<span class="hljs-property">textContent</span> = title;

node.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;.card-body&quot;</span>).<span class="hljs-property">textContent</span> = body;

<span class="hljs-keyword">return</span> node;

}

list.<span class="hljs-title function_">append</span>(<span class="hljs-title function_">makeCard</span>({ <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Hello&quot;</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;World&quot;</span> }));
</code></pre>
<p>يُحلّل DOM للقالب مرة واحدة. وينتج <code>cloneNode(true)</code> نسخة عميقة من تلك الشجرة الفرعية من دون إعادة تحليل HTML أو تشغيل سكربتات جزء المستند. هذا هو النمط نفسه المستخدم في استنساخ كائن JavaScript — القالب هو النموذج الأولي، والعُقد الحية هي النسخ — وهو أسرع بكثير من <code>innerHTML = &quot;...&quot;</code> داخل حلقة.</p>
<h2 id="بيانات-الاختبار-وبانئات-الكائنات">بيانات الاختبار وبانئات الكائنات</h2>
<p>كمية كبيرة بشكل مفاجئ من شيفرة الاختبار هي نمط النموذج الأولي بارتداء قبعة مختلفة. تتبع مكتبات مثل <code>fishery</code> و<code>factory-bot</code> وأنماط <code>createBuilder</code> في Vitest الشكل نفسه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">buildUser</span>(<span class="hljs-params">overrides = {}</span>) {

<span class="hljs-keyword">return</span> {

<span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),

<span class="hljs-attr">email</span>: <span class="hljs-string">&quot;user@example.com&quot;</span>,

<span class="hljs-attr">role</span>: <span class="hljs-string">&quot;viewer&quot;</span>,

<span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),

...overrides,

};

}

<span class="hljs-keyword">const</span> admin = <span class="hljs-title function_">buildUser</span>({ <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;admin&quot;</span> });

<span class="hljs-keyword">const</span> banned = <span class="hljs-title function_">buildUser</span>({ <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;viewer&quot;</span>, <span class="hljs-attr">bannedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() });
</code></pre>
<p>الكائن الأساسي هو النموذج الأولي. يدمج كل استدعاء الاستبدالات فوقه بعمق، أو يوزعها سطحيًا. وهذا أكثر قابلية للصيانة بصورة هائلة من إنشاء الكائن الكامل مباشرة داخل كل اختبار.</p>
<h2 id="objectcreatenull-قواميس-بلا-نموذج-أولي"><code>Object.create(null)</code>: قواميس بلا نموذج أولي</h2>
<p>عندما تريد خريطة مفتاح/قيمة عادية ولا تريد أن تنتقل عمليات البحث إلى <code>Object.prototype</code>، فأنشئ الكائن من دون نموذج أولي على الإطلاق:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> headers = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>(<span class="hljs-literal">null</span>);

headers.<span class="hljs-property">toString</span> = <span class="hljs-string">&quot;I&#x27;m just a header value, not the toString method&quot;</span>;

headers[<span class="hljs-string">&quot;__proto__&quot;</span>] = <span class="hljs-string">&quot;and this is just a string, not a security hole&quot;</span>;
</code></pre>
<p>يكتسب هذا الأمر أهمية كلما أتت المفاتيح من إدخال غير موثوق. مع كائن <code>{}</code> عادي، يستطيع المهاجم الذي يمكنه الكتابة إلى <code>__proto__</code> أو <code>constructor</code> أن يفسد سلسلة النماذج الأولية العالمية — وهي عائلة الأخطاء المعروفة بـ<strong>تلوث النموذج الأولي (prototype pollution)</strong> (وقد ظهرت ثغرات CVE حقيقية في <code>lodash.merge</code> و<code>set-value</code> و<code>dot-prop</code> ووسائط Express). و<code>Object.create(null)</code> تزيل سطح الهجوم تمامًا، إذ لا يوجد نموذج أولي يمكن تلويثه. أما إدخال المستخدم العشوائي، فالأفضل استخدام <code>Map</code>، التي لا تحمل مشكلات مفاتيح النموذج الأولي من الأساس.</p>
<h2 id="السجلات-والمجموعات-tc39">السجلات والمجموعات (TC39)</h2>
<p>يقدّم <a href="https://github.com/tc39/proposal-record-tuple">اقتراح Records and Tuples</a> (في المرحلة 2 وقت كتابة هذا المقال) أنواعًا أولية غير قابلة للتغيير بعمق — <code>#{ x: 1 }</code> للسجل و<code>#[1, 2]</code> للمجموعة. تقارَن بنيويًا (<code>#{ x: 1 } === #{ x: 1 }</code> يعطي <code>true</code>)، و«استنساخها» لا معنى له لأنها قيم بالفعل. وعندما تصل هذه الأنواع، ستبسّط كثير من شيفرة النسخ العميق مع الاستبدال الموجودة اليوم. من المفيد معرفتها كي لا تكتب الآن شيفرة تندم عليها بعد عامين.</p>
<h2 id="متى-يناسب-النمط">متى يناسب النمط</h2>
<table>
<thead>
<tr>
<th>الاستخدام</th>
<th>الأسلوب</th>
</tr>
</thead>
<tbody>
<tr>
<td>مشاركة السلوك بين كائنات متشابهة كثيرة</td>
<td><code>class</code> (أو <code>Object.create</code>) — تفويض عبر سلسلة النموذج الأولي</td>
</tr>
<tr>
<td>إنشاء متغير معدل من تكوين</td>
<td>الانتشار بعمق واحد، و<code>structuredClone</code> للعناصر المتداخلة</td>
</tr>
<tr>
<td>إعادة استخدام شجرة فرعية من DOM مرات كثيرة</td>
<td>\`\` + <code>cloneNode(true)</code></td>
</tr>
<tr>
<td>توليد بيانات اختبار بقيم افتراضية منطقية</td>
<td>دالة باني مع استبدالات قابلة للنشر</td>
</tr>
<tr>
<td>إنشاء قاموس آمن للمفتاح والقيمة</td>
<td><code>Object.create(null)</code> أو <code>Map</code></td>
</tr>
<tr>
<td>تكرار نسخة من صنف</td>
<td><code>Object.create(getPrototypeOf(x))</code> + نسخ عميق للخصائص الذاتية</td>
</tr>
</tbody>
</table>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain">الوراثة وسلسلة النموذج الأولي</a> - MDN</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/structuredClone">structuredClone</a> - MDN</li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template">عنصر HTML \`\`</a> - MDN</li>
<li><a href="https://snyk.io/blog/javascript-prototype-pollution/">شرح تلوث النموذج الأولي</a> - Snyk</li>
<li><a href="https://github.com/tc39/proposal-record-tuple">اقتراح Records and Tuples</a> - TC39</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
