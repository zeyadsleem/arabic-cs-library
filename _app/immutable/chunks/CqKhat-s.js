const s="patterns-dev",n="vanilla",a="أنماط JavaScript",t="mediator-pattern",l="نمط الوسيط/البرمجيات الوسيطة (mediator/middleware)",p=[{depth:2,id:"وسيط-مخصص-بسيط",text:"وسيط مخصص بسيط"},{depth:2,id:"الوسيط-مقابل-البرمجيات-الوسيطة",text:"الوسيط مقابل البرمجيات الوسيطة"},{depth:2,id:"عندما-يكون-الوسيط-آلة-حالات",text:"عندما يكون الوسيط آلة حالات"},{depth:2,id:"الوسيط-مقابل-الواجهة-facade-مقابل-ناقل-الأحداث",text:"الوسيط مقابل الواجهة (facade) مقابل ناقل الأحداث"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:3,id:"وسيط-الكائن-الإلهي",text:"وسيط الكائن الإلهي"},{depth:3,id:"مكونات-تعرف-بعضها-سرا",text:"مكونات تعرف بعضها سرًا"},{depth:3,id:"صعوبة-التتبع-في-وقت-التشغيل",text:"صعوبة التتبّع في وقت التشغيل"},{depth:3,id:"إشعارات-إعادة-الدخول",text:"إشعارات إعادة الدخول"},{depth:2,id:"متى-لا-تستخدم-وسيطا",text:"متى لا تستخدم وسيطًا"},{depth:2,id:"المراجع",text:"المراجع"}],e=`<p>الوسيط (mediator) هو الكائن الموجود في الوسط. بدلًا من أن تعرف المكونات بعضها بعضًا، تتحدث المكونات إلى الوسيط، الذي يقرر ما ينبغي أن يحدث تاليًا. تخيل مشرفًا في غرفة محادثة مزدحمة: تمر كل رسالة عبره، وهو يفرض القواعد — من يحق له التحدث، ومن يُكتم، وأي رسالة تُثبت. لا يحتاج المشاركون إلى معرفة الآخرين بالاسم. كل ما يحتاجونه هو معرفة وجود مشرف يستمع إليهم.</p>
<p>من دون وسيط، ينتهي نظام فيه N مكونات يحتاج كل منها إلى التحدث مع جميع الآخرين إلى عدد اتصالات من رتبة N². يعرف كل مكون بقية المكونات، وتغيير واحد يجعل نطاق الضرر كل شيء. أما مع الوسيط، فلدى كل مكون قناة اتصال واحدة: إلى الوسط. والوسط هو الشيء الوحيد الذي عليه أن يفهم رقصة التنسيق.</p>
<h2 id="وسيط-مخصص-بسيط">وسيط مخصص بسيط</h2>
<p>إليك وسيطًا صغيرًا ينسق خطوات معالج نموذج متعدد الخطوات. لدى المعالج مكونات خطوات مستقلة (المعلومات الشخصية، وعنوان الشحن، والدفع)، ويحتاج أحدها إلى تحديد معنى «التالي» وفق الحالة الحالية. هذا القرار يقع على الوسيط، ولا يتكرر في كل خطوة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WizardMediator</span> {

#steps = [];

#current = <span class="hljs-number">0</span>;

#data = {};

#listeners = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>();

<span class="hljs-title function_">registerSteps</span>(<span class="hljs-params">steps</span>) {

<span class="hljs-variable language_">this</span>.#steps = steps;

}

<span class="hljs-title function_">notify</span>(<span class="hljs-params">sender, event, payload</span>) {

<span class="hljs-keyword">switch</span> (event) {

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;submit&quot;</span>: {

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">assign</span>(<span class="hljs-variable language_">this</span>.#data, payload);

<span class="hljs-keyword">const</span> nextIndex = <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">computeNext</span>(sender, payload);

<span class="hljs-keyword">if</span> (nextIndex &gt;= <span class="hljs-variable language_">this</span>.#steps.<span class="hljs-property">length</span>) {

<span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">emit</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;complete&quot;</span>, <span class="hljs-attr">data</span>: <span class="hljs-variable language_">this</span>.#data });

} <span class="hljs-keyword">else</span> {

<span class="hljs-variable language_">this</span>.#current = nextIndex;

<span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">emit</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;advance&quot;</span>, <span class="hljs-attr">step</span>: <span class="hljs-variable language_">this</span>.#steps[nextIndex] });

}

<span class="hljs-keyword">break</span>;

}

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;back&quot;</span>:

<span class="hljs-variable language_">this</span>.#current = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-variable language_">this</span>.#current - <span class="hljs-number">1</span>);

<span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">emit</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;advance&quot;</span>, <span class="hljs-attr">step</span>: <span class="hljs-variable language_">this</span>.#steps[<span class="hljs-variable language_">this</span>.#current] });

<span class="hljs-keyword">break</span>;

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;cancel&quot;</span>:

<span class="hljs-variable language_">this</span>.#data = {};

<span class="hljs-variable language_">this</span>.#current = <span class="hljs-number">0</span>;

<span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">emit</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;reset&quot;</span> });

<span class="hljs-keyword">break</span>;

}

}

<span class="hljs-comment">// The conditional flow lives here, not in any one step.</span>

#<span class="hljs-title function_">computeNext</span>(<span class="hljs-params">sender, payload</span>) {

<span class="hljs-keyword">if</span> (sender === <span class="hljs-string">&quot;personal&quot;</span> &amp;&amp; payload.<span class="hljs-property">accountType</span> === <span class="hljs-string">&quot;guest&quot;</span>) {

<span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#steps.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">&quot;payment&quot;</span>); <span class="hljs-comment">// skip address-on-file</span>

}

<span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#current + <span class="hljs-number">1</span>;

}

<span class="hljs-title function_">subscribe</span>(<span class="hljs-params">fn</span>) {

<span class="hljs-variable language_">this</span>.#listeners.<span class="hljs-title function_">add</span>(fn);

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">this</span>.#listeners.<span class="hljs-title function_">delete</span>(fn);

}

#<span class="hljs-title function_">emit</span>(<span class="hljs-params">event</span>) {

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> fn <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.#listeners) <span class="hljs-title function_">fn</span>(event);

}

}
</code></pre>
<p>لدى كل مكون خطوة عقد صغير مع الوسيط: استدعِ <code>notify(&quot;submit&quot;, { ... })</code> عندما ينقر المستخدم على «التالي». لا تستورد الخطوة أي خطوة أخرى، ولا تعرف أي خطوة تأتي بعدها، ولا تتخذ قرارات بشأن المسار. فالوسيط يملك كل ذلك.</p>
<p>إذا أخبرك قسم التسويق في الربع المقبل بأن خطوة العنوان ينبغي تخطيها لحسابات B2B، فغيّر فرعًا واحدًا في <code>#computeNext</code>. ولا تحتاج مكونات الخطوة إلى معرفة وجود القاعدة.</p>
<h2 id="الوسيط-مقابل-البرمجيات-الوسيطة">الوسيط مقابل البرمجيات الوسيطة</h2>
<p>البرمجيات الوسيطة (middleware) — برمجيات Redux الوسيطة، وApollo Link، وHono، وfastify، وأطر الخادم (server) بكل أشكالها — هي وسيط مقدم في صورة خط أنابيب. بدلًا من كائن واحد يقرر ما يجب فعله، تكوّن سلسلة من الدوال الصغيرة، يمكن لكل منها فحص الرسالة أو تحويلها أو قطع مسارها أو تمريرها.</p>
<p>إليك محركًا صغيرًا للبرمجيات الوسيطة، بالشكل نفسه الذي تستخدمه كل أطر تحاكي Express في داخلها:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">createPipeline</span>(<span class="hljs-params">...middleware</span>) {

<span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">dispatch</span>(<span class="hljs-params">ctx</span>) {

<span class="hljs-keyword">let</span> index = -<span class="hljs-number">1</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">runFrom</span>(<span class="hljs-params">i</span>) {

<span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;next() called multiple times&quot;</span>);

index = i;

<span class="hljs-keyword">const</span> fn = middleware[i];

<span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>();

<span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-title function_">fn</span>(ctx, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">runFrom</span>(i + <span class="hljs-number">1</span>)));

}

<span class="hljs-keyword">return</span> <span class="hljs-title function_">runFrom</span>(<span class="hljs-number">0</span>);

};

}
</code></pre>
<p>المعالج هو <code>(context, next) =&gt; ...</code>. ويفوض استدعاء <code>next()</code> التنفيذ إلى الحلقة التالية في السلسلة، بينما عدم استدعائه يقطع بقية المسار. ولأن كل خطوة تحصل على <code>ctx</code> نفسه، تتراكم التعديلات بالطريقة نفسها في Express أو Koa أو Hono.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> handle = <span class="hljs-title function_">createPipeline</span>(

<span class="hljs-title function_">async</span> (ctx, next) =&gt; {

<span class="hljs-keyword">const</span> started = performance.<span class="hljs-title function_">now</span>();

<span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>();

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${ctx.path}</span> <span class="hljs-subst">\${performance.now() - started}</span>ms\`</span>);

},

<span class="hljs-title function_">async</span> (ctx, next) =&gt; {

<span class="hljs-keyword">const</span> token = ctx.<span class="hljs-property">headers</span>.<span class="hljs-property">authorization</span>;

<span class="hljs-keyword">if</span> (!token) {

ctx.<span class="hljs-property">response</span> = { <span class="hljs-attr">status</span>: <span class="hljs-number">401</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">&quot;Unauthorized&quot;</span> };

<span class="hljs-keyword">return</span>; <span class="hljs-comment">// short-circuit</span>

}

ctx.<span class="hljs-property">user</span> = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verify</span>(token);

<span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>();

},

<span class="hljs-title function_">async</span> (ctx) =&gt; {

ctx.<span class="hljs-property">response</span> = { <span class="hljs-attr">status</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">body</span>: <span class="hljs-string">\`Hello, <span class="hljs-subst">\${ctx.user.name}</span>\`</span> };

}

);

<span class="hljs-keyword">await</span> <span class="hljs-title function_">handle</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/me&quot;</span>, <span class="hljs-attr">headers</span>: { <span class="hljs-attr">authorization</span>: <span class="hljs-string">&quot;Bearer ...&quot;</span> } });
</code></pre>
<p>الشكل نفسه يشغل <strong>البرمجيات الوسيطة في Redux</strong> (ترى كل برمجية وسيطة الإجراء وتقرر هل تُطلق الإجراء التالي)، و<strong>Apollo Link</strong> (يلتف كل رابط حول عملية)، و<strong>Hono / Koa</strong> (يلتف كل برمجية وسيطة حول الطلب (request)). وحين تتعرف على النمط، فستراه في كل مكان.</p>
<h2 id="عندما-يكون-الوسيط-آلة-حالات">عندما يكون الوسيط آلة حالات</h2>
<p>للتنسيق المعقد فعلًا — مثل تدفق الدفع مع إعادة المحاولة، أو رفع ملف مع إيقاف مؤقت واستئناف وإلغاء، أو مشغل فيديو مع تخزين مؤقت وتعطل واسترداد من الأخطاء — تكون آلة الحالات المحدودة (finite state machine) غالبًا الشكل المناسب للوسيط. الحالات والانتقالات هي البروتوكول، وترسل المكونات الأحداث إلى الآلة بدلًا من استدعاء بعضها بعض.</p>
<p>تجعل <a href="https://stately.ai/docs/xstate">XState</a> ذلك صريحًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { setup, createActor } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;xstate&quot;</span>;

<span class="hljs-keyword">const</span> uploadMachine = <span class="hljs-title function_">setup</span>({

<span class="hljs-attr">actions</span>: {

<span class="hljs-attr">sendBytes</span>: <span class="hljs-function">(<span class="hljs-params">{ context }</span>) =&gt;</span> api.<span class="hljs-title function_">upload</span>(context.<span class="hljs-property">file</span>),

<span class="hljs-attr">cleanup</span>:   <span class="hljs-function">(<span class="hljs-params">{ context }</span>) =&gt;</span> api.<span class="hljs-title function_">abort</span>(context.<span class="hljs-property">uploadId</span>),

},

}).<span class="hljs-title function_">createMachine</span>({

<span class="hljs-attr">id</span>: <span class="hljs-string">&quot;upload&quot;</span>,

<span class="hljs-attr">initial</span>: <span class="hljs-string">&quot;idle&quot;</span>,

<span class="hljs-attr">context</span>: { <span class="hljs-attr">file</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">uploadId</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">progress</span>: <span class="hljs-number">0</span> },

<span class="hljs-attr">states</span>: {

<span class="hljs-attr">idle</span>:     { <span class="hljs-attr">on</span>: { <span class="hljs-attr">START</span>:  <span class="hljs-string">&quot;uploading&quot;</span> } },

<span class="hljs-attr">uploading</span>: {

<span class="hljs-attr">entry</span>: <span class="hljs-string">&quot;sendBytes&quot;</span>,

<span class="hljs-attr">on</span>: {

<span class="hljs-attr">PROGRESS</span>: { <span class="hljs-attr">actions</span>: <span class="hljs-function">(<span class="hljs-params">{ context, event }</span>) =&gt;</span> (context.<span class="hljs-property">progress</span> = event.<span class="hljs-property">value</span>) },

<span class="hljs-attr">DONE</span>:    <span class="hljs-string">&quot;success&quot;</span>,

<span class="hljs-attr">ERROR</span>:   <span class="hljs-string">&quot;failed&quot;</span>,

<span class="hljs-attr">CANCEL</span>:  { <span class="hljs-attr">target</span>: <span class="hljs-string">&quot;idle&quot;</span>, <span class="hljs-attr">actions</span>: <span class="hljs-string">&quot;cleanup&quot;</span> },

},

},

<span class="hljs-attr">success</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;final&quot;</span> },

<span class="hljs-attr">failed</span>:  { <span class="hljs-attr">on</span>: { <span class="hljs-attr">RETRY</span>: <span class="hljs-string">&quot;uploading&quot;</span> } },

},

});

<span class="hljs-keyword">const</span> upload = <span class="hljs-title function_">createActor</span>(uploadMachine).<span class="hljs-title function_">start</span>();

upload.<span class="hljs-title function_">send</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;START&quot;</span> });
</code></pre>
<p>تطلق واجهة المستخدم الأحداث. وتقرر الآلة ما هو مسموح — إذ تُتجاهل <code>PROGRESS</code> أثناء <code>idle</code> بصمت، ولا تعمل <code>RETRY</code> إلا من <code>failed</code>، وهكذا. ولا يمكن للانتقالات غير القانونية أن تحدث لأنها ليست في المخطط.</p>
<h2 id="الوسيط-مقابل-الواجهة-facade-مقابل-ناقل-الأحداث">الوسيط مقابل الواجهة (facade) مقابل ناقل الأحداث</h2>
<p>يختلط الناس كثيرًا بين هذه الأنماط الثلاثة. وهي ليست الشيء نفسه.</p>
<table>
<thead>
<tr>
<th></th>
<th>الوسيط</th>
<th>ناقل الأحداث (نشر/اشتراك)</th>
<th>الواجهة (facade)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الاتجاه</strong></td>
<td>متعدد الاتجاهات — تتحدث المكونات إليه، وهو يتحدث إليها</td>
<td>إرسال بلا انتظار — لا يعرف الناشرون المشتركين</td>
<td>أحادي الاتجاه — يستدعيه المستدعي، وتخفي الواجهة التعقيد</td>
</tr>
<tr>
<td><strong>يملك المنطق؟</strong></td>
<td>نعم — يعيش مسار العمل هنا</td>
<td>لا — توجيه فقط</td>
<td>لا — تفويض فقط</td>
</tr>
<tr>
<td><strong>هل تعرف المكونات به؟</strong></td>
<td>نعم — تستدعي واجهته البرمجية</td>
<td>نعم — تنشر/تشترك</td>
<td>غالبًا يعرفه جانب المستدعي فقط</td>
</tr>
<tr>
<td><strong>الاستخدام المعتاد</strong></td>
<td>تنسيق مسار عمل (معالج متعدد الخطوات، رفع ملف، نموذج)</td>
<td>أحداث عرضية مفككة (تحليلات، قياس عن بعد)</td>
<td>إخفاء نظام فرعي فوضوي خلف نقطة دخول واحدة واضحة</td>
</tr>
</tbody>
</table>
<p>اختبار مفيد: إذا كان العنصر الأوسط يتخذ القرارات، فهو وسيط. وإذا كان يوجه الرسائل فقط من دون فحصها، فهو ناقل. وإذا كان يبسط الوصول إلى شيء معقد من دون تنسيق أطراف متعددة، فهو واجهة.</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<h3 id="وسيط-الكائن-الإلهي">وسيط الكائن الإلهي</h3>
<p>مهمة الوسيط هي التنسيق، لا تنفيذ العمل. إذا انتهى كل قاعدة عمل في تطبيقك داخل صنف واحد اسمه <code>AppMediator</code>، فقد حولته إلى كائن أحادي ضخم من 4000 سطر — وهو تحديدًا ما يفترض أن يمنع النمط. قسّم الوسطاء حسب المجال (<code>CheckoutMediator</code> و<code>UploadMediator</code> و<code>ChatMediator</code>)، واجعل كل واحد مركزًا على مسار عمل واحد.</p>
<h3 id="مكونات-تعرف-بعضها-سرا">مكونات تعرف بعضها سرًا</h3>
<p>تأتي قيمة النمط من كون المكونات لا تعرف إلا الوسيط. وفي اللحظة التي يستورد فيها المكون A المكون B «من أجل النوع فقط»، أو يطلق حدثًا يحمل اسم وجود المكون B، تكون قد أعيد إدخال الاقتران. راقب ذلك أثناء مراجعة الشيفرة.</p>
<h3 id="صعوبة-التتبع-في-وقت-التشغيل">صعوبة التتبّع في وقت التشغيل</h3>
<p>حين يمر كل شيء عبر عبارة <code>switch</code> واحدة، قد تصبح «ماذا يحدث عندما أنقر هذا الزر؟» قصة تحرٍ صغيرة. خفف ذلك عبر تسجيل منظم داخل الوسيط نفسه — إذ يُسجل كل <code>notify</code>/<code>emit</code> مع معرّف ارتباط — وعبر برامج التصور لآلات الحالات عند استخدام XState أو ما شابه.</p>
<h3 id="إشعارات-إعادة-الدخول">إشعارات إعادة الدخول</h3>
<p>إذا سبب معالجة حدث في إطلاق الوسيط حدثًا آخر بصورة متزامنة، فقد تنتهي إلى تكرار غير متوقع. وبالنسبة إلى الوسطاء غير البسط، ضع الأحداث في طابور باستخدام <code>queueMicrotask</code> كي ينتهي كل حدث قبل بدء التالي.</p>
<h2 id="متى-لا-تستخدم-وسيطا">متى لا تستخدم وسيطًا</h2>
<ul>
<li><strong>مكوّنان يتحدثان دائمًا بعضهما فقط.</strong> لا تضف شيئًا إلى الوسط. فالاستدعاء المباشر أبسط وأسهل في التتبع.</li>
<li><strong>أحداث فردية بلا تنسيق.</strong> يكفي ناقل أحداث عادي أو دالة استدعاء.</li>
<li><strong>خطوط أنابيب تُنفذ فيها كل خطوة دائمًا بالترتيب.</strong> تركيب الدوال البسيط أوضح من محرك برمجيات وسيطة.</li>
</ul>
<p>يعود الوسيط بنفعه إلى نفسه عندما يكون لديك ثلاثة مكونات أو أكثر تتفاعل، وتكون قواعد من يتحدث مع من غير بديهية. وفيما دون ذلك، يمثل عبئًا زائدًا.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://redux.js.org/understanding/history-and-design/middleware">البرمجيات الوسيطة في Redux</a></li>
<li><a href="https://www.apollographql.com/docs/react/api/link/introduction">Apollo Link</a></li>
<li><a href="https://hono.dev/">Hono — برمجيات وسيطة وفق معيار الويب</a></li>
<li><a href="https://stately.ai/docs/xstate">XState — آلات حالات لـJavaScript</a></li>
<li><a href="https://refactoring.guru/design-patterns/mediator">الوسيط — Refactoring Guru</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
