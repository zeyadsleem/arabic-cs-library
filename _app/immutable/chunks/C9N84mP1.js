const e="tanstack-form",s="form",a="دورة TanStack Form الكاملة",c="fields-meta-data",o="بيانات الحقل الوصفية: ماذا تعرف الاستمارة عن حقولك؟",d=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"لماذا-نطبع-البيانات-في-الصفحة",text:"لماذا نطبع البيانات في الصفحة؟"},{depth:3,id:"طباعة-بيانات-الحقل",text:"طباعة بيانات الحقل"},{depth:3,id:"معنى-كل-علم-ومتى-ينقلب",text:"معنى كل علم ومتى ينقلب"},{depth:3,id:"isdefaultvalue-بدل-isdirty-حين-تسأل-عن-القيمة",text:"isDefaultValue بدل isDirty حين تسأل عن القيمة"},{depth:3,id:"البيانات-نفسها-على-مستوى-الاستمارة",text:"البيانات نفسها على مستوى الاستمارة"},{depth:3,id:"الفخ-formstate-لا-يعيد-التصيير",text:"الفخّ: form.state لا يعيد التصيير"},{depth:3,id:"ما-يملكه-tanstack-وما-يبقى-من-html",text:"ما يملكه TanStack وما يبقى من HTML"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],t=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>حتى الآن تعرف عن الحقل شيئين: قيمته الحالية، والدالة التي تغيّرها. لكن الاستمارة تعرف أكثر من ذلك بكثير: هل لمس المستخدم الحقل، وهل خرج منه، وهل تغيّرت قيمته فعلًا، وهل عادت إلى قيمتها الأولى. يسمّي TanStack Form هذه المعلومات البيانات الوصفية للحقل، ويجمعها في <code>field.state.meta</code> بجانب القيمة.</p>
<p>في هذا الدرس نعرض هذه البيانات داخل الصفحة نفسها بدل الاعتماد على أدوات التطوير، ثم نفكّك كل علم منها ونبيّن الحدث الذي يقلبه من حالة إلى أخرى. ونفرّق بين سؤالين يخلط بينهما كثيرون: «هل عدّل المستخدم الحقل؟» و«هل قيمته الآن هي القيمة الافتراضية؟». وفي الختام نرى المعلومات نفسها على مستوى الاستمارة كلها في <code>form.state</code>، ونكتشف لماذا لا تتحدّث أمام أعيننا، وما العلاج.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="لماذا-نطبع-البيانات-في-الصفحة">لماذا نطبع البيانات في الصفحة؟</h3>
<p>توفّر حزمة <code>@tanstack/react-form-devtools</code> لوحة تعرض حالة الحقول مباشرة، وهي الطريقة المعتادة للتشخيص. لكن عند فتحها مع استمارة تتغيّر عند كل ضغطة مفتاح، تصبح الكتابة في الحقل متلكئة شيئًا ما، لأن كل تحديث يمرّ عبر اللوحة أيضًا. لذلك نستغني عنها هنا ونطبع المحتوى بأنفسنا: أسرع، ولا يخفي شيئًا.</p>
<p>نقطة البداية هي <code>defaultValues</code> التي تعرّف بها الحقول. هذه القيم ليست مجرّد تعبئة أولية، بل هي المرجع الذي تقارن به الاستمارة لاحقًا لتعرف هل عاد الحقل إلى أصله:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> formOpts = <span class="hljs-title function_">formOptions</span>({
  defaultValues,
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">RegisterForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> form = <span class="hljs-title function_">useForm</span>({
    ...formOpts,
    <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value);
    },
  });
</code></pre>
<h3 id="طباعة-بيانات-الحقل">طباعة بيانات الحقل</h3>
<p>دالة التصيير التي يمنحها <code>form.Field</code> تستقبل كائن الحقل، وفيه <code>state</code> الذي يجمع <code>value</code> و<code>meta</code> معًا. نضيف قبل حقل الإدخال عنصر <code>pre</code> يطبع <code>field.state.meta</code>:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span> name=<span class="hljs-string">&quot;firstName&quot;</span>&gt;
          {<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> (
              <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{JSON.stringify(field.state.meta, null, 2)}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
                  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;First Name&quot;</span>
                  <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                  <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                /&gt;
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            );
          }}
        &lt;/form.<span class="hljs-property">Field</span>&gt;
</code></pre>
<p>ثلاثة تفاصيل صغيرة في هذا المقتطف: الوسيط الثاني <code>null</code> يعني أننا لا نريد دالة تحويل، والوسيط الثالث <code>2</code> يجعل <code>JSON.stringify</code> يزيح كل مستوى بمسافتين فيخرج الكائن مقروءًا بدل سطر واحد طويل. أما عنصر <code>pre</code> فضروري لأن المتصفّح يدمج المسافات في العناصر العادية، فيصبح الشكل عمودًا ملتصقًا لا يمكن تتبّعه.</p>
<h3 id="معنى-كل-علم-ومتى-ينقلب">معنى كل علم ومتى ينقلب</h3>
<p>ابدأ من حالة نظيفة بعد تحديث الصفحة: كل الأعلام في وضعها الأولي. ثم راقب ما الذي يحرّك كل واحد منها، لأن كل علم يقيس حدثًا مختلفًا:</p>
<ul>
<li><code>isTouched</code>: يصبح <code>true</code> بمجرّد أن يلمس المستخدم الحقل، سواء غيّر قيمته أو اكتفى بالدخول إليه ثم الخروج منه. أي أن التركيز ثم مغادرة الحقل يكفيان.</li>
<li><code>isBlurred</code>: يقيس حدثًا واحدًا فقط، هو خروج التركيز من الحقل بعد أن كان فيه. ولذلك يبقى <code>false</code> ما دمت تكتب والحقل ما زال في التركيز، حتى لو صار <code>isTouched</code> و<code>isDirty</code> صحيحين.</li>
<li><code>isDirty</code>: لا يصبح <code>true</code> إلا إذا تغيّرت القيمة فعلًا. ولا يعود إلى <code>false</code> أبدًا: لو كتبت حرفًا ثم مسحته وأعدت الحقل إلى قيمته الأصلية، بقي <code>isDirty</code> صحيحًا لأنه يسجّل التاريخ، لا الحالة الراهنة.</li>
<li><code>isPristine</code>: نقيض <code>isDirty</code> تمامًا. يبدأ <code>true</code> وينقلب <code>false</code> عند أول تغيير، ولا يرجع.</li>
<li><code>isValid</code> و<code>errors</code> و<code>errorMap</code>: تخصّ التحقّق من الصحة، ونتجاوزها الآن لأنها موضوع دروس لاحقة. لهذا تراها فارغة أو <code>true</code> في هذه المرحلة.</li>
</ul>
<p>لاحظ الفرق الجوهري بين <code>isTouched</code> و<code>isDirty</code>: الأول يتكلّم عن انتباه المستخدم، والثاني عن البيانات. حقل يلمسه المستخدم ولا يغيّره يظهر «ملموسًا» و«نقيًّا» في الوقت نفسه، وهذا مزيج مشروع تمامًا، وكثير من واجهات عرض الأخطاء تعتمد عليه كي لا تبادر بتوبيخ المستخدم قبل أن يكتب حرفًا.</p>
<h3 id="isdefaultvalue-بدل-isdirty-حين-تسأل-عن-القيمة"><code>isDefaultValue</code> بدل <code>isDirty</code> حين تسأل عن القيمة</h3>
<p>يبقى علم سادس هو الأهمّ في هذا الدرس: <code>isDefaultValue</code>. يسأل سؤالًا مختلفًا عن <code>isDirty</code>؛ فهو لا يهتمّ بما حدث في الماضي، بل يقارن القيمة الحالية بالقيمة الافتراضية الآن. ولذلك ينقلب سلوكه بالعكس: يبدأ <code>true</code>، ويصير <code>false</code> عند التغيير، ثم يعود <code>true</code> إذا أرجعت القيمة إلى أصلها.</p>
<p>هذه العودة هي الفرق كله. إذا أردت أن تعرف هل يستحقّ المستخدم مغادرة الصفحة بتحذير «لديك تغييرات غير محفوظة»، فالسؤال الصحيح هو <code>isDirty</code>، لأن مجرّد التعديل ثم التراجع لا يزال تصرّفًا وقع. أما إذا أردت أن تعرف هل القيمة الحالية هي الافتراضية، فإن <code>isDirty</code> يعطيك جوابًا خاطئًا بعد التراجع، وعليك أن تعتمد على <code>isDefaultValue</code> وحده.</p>
<h3 id="البيانات-نفسها-على-مستوى-الاستمارة">البيانات نفسها على مستوى الاستمارة</h3>
<p>كل ما سبق متاح أيضًا للاستمارة ككل، داخل <code>form.state</code>. نضيف عنصر <code>pre</code> ثانيًا قبل <code>form.Field</code>:</p>
<pre><code class="language-tsx">      &lt;form
        onSubmit={<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
          e.<span class="hljs-title function_">preventDefault</span>();
          form.<span class="hljs-title function_">handleSubmit</span>();
        }}
      &gt;
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{JSON.stringify(form.state, null, 2)}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span></span>
</code></pre>
<p>هذا الكائن أوسع: يبدأ بـ<code>values</code> التي تحمل قيم كل الحقول بما فيها الكائنات والمصفوفات المتداخلة، ثم أعلام عامة مثل <code>isSubmitting</code> و<code>isSubmitted</code> و<code>isValid</code>، ثم خريطة <code>fieldMeta</code> تجمع بيانات كل حقل تحت اسمه.</p>
<h3 id="الفخ-formstate-لا-يعيد-التصيير">الفخّ: <code>form.state</code> لا يعيد التصيير</h3>
<p>جرّب أن تكتب حرفًا ثم تنظر إلى الكتلة العليا: لن يتغيّر شيء. <code>isDirty</code> على مستوى الاستمارة يبقى <code>false</code>، و<code>fieldMeta</code> يبقى كائنًا فارغًا، بينما الكتلة السفلية الخاصة بالحقل تصف الوضع بدقّة. وهذا ليس خطأً في المكتبة، بل قرار تصميم مقصود: TanStack Form يتجنّب إعادة تصيير مكوّن الاستمارة عند كل ضغطة مفتاح، لأن إعادة تصيير استمارة كاملة من أجل حقل واحد تدمّر أداء الشاشات الكبيرة.</p>
<p>الثمن أن ما تقرأه من <code>form.state</code> أثناء التصيير هو صورة من آخر تصيير مرّ به المكوّن، لا قيمة حيّة. والحلّ ليس أن تقرأ أكثر، بل أن تشترك: تخبر المكتبة بالجزء الذي يهمّك فتعيد تصيير ما يعتمد عليه وحده. هذا هو موضوع الدرس التالي، وسترى فيه كيف تُبنى عليه رسائل الخطأ وزرّ الإرسال.</p>
<h3 id="ما-يملكه-tanstack-وما-يبقى-من-html">ما يملكه TanStack وما يبقى من HTML</h3>
<p>من المفيد أن تفصل بين الطبقتين وأنت تنظر إلى هذا الملف. ما يمنحك إياه <code>form.Field</code> هو: اسم الحقل في <code>field.name</code>، وقيمته في <code>field.state.value</code>، وبياناته في <code>field.state.meta</code>، ومعالجا <code>field.handleChange</code> و<code>field.handleBlur</code>. أما بقية ما تراه على عنصر <code>input</code> فهو HTML عادي كتبته أنت: <code>type</code> و<code>placeholder</code> و<code>className</code>، وأي سمة أخرى تضيفها.</p>
<p>هذا الفصل يعني أن المكتبة لا تُصلح لك إتاحة الوصول من تلقاء نفسها. في هذا الفرع لا يوجد <code>label</code> ولا <code>id</code>، والربط بين النص والحقل قائم على <code>placeholder</code> وحده، وهو نصّ يختفي بمجرّد الكتابة، ولا يقرأه قارئ الشاشة كاسم للحقل. القيمة جاهزة عندك في <code>field.name</code>، فلو أضفت <code>label</code> لربطته بالحقل عبر <code>htmlFor</code> مساوٍ لـ<code>field.name</code>، وجعلت <code>id</code> مساويًا له، لصار الحقل معرّفًا باسمه في كل الحالات. المسؤولية هنا للمكوّن الذي تكتبه، لا للمكتبة.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--fields-meta-data--meta.png" alt="صفحة الاستمارة بعد إضافة الطباعتين: كتلة علوية تعرض  كاملةً وفيها  فارغة، وكتلة سفلى تعرض بيانات حقل الاسم الأول بعد كتابة حرف، ثم حقل الإدخال وزر الإرسال"></p>
<p>في الصورة نرى الكتلتين فوق بعضهما. العليا هي <code>form.state</code> كاملة: <code>values</code> بقيم جميع الحقول، ثم الأعلام العامة، ثم <code>fieldMeta</code> وهي كائن فارغ <code>{}</code>. والسفلى هي <code>field.state.meta</code> للحقل الأول بعد أن كتبنا فيه حرفًا: <code>isTouched</code> و<code>isBlurred</code> و<code>isDirty</code> صحيحة، و<code>isPristine</code> و<code>isDefaultValue</code> كاذبة، و<code>errors</code> و<code>errorMap</code> فارغتان. وأسفل الكتلتين يظهر حقل الإدخال وفيه الحرف، ثم زر الإرسال.</p>
<p>المقارنة بين الكتلتين هي الدرس كله: الحقل يعرف ما جرى له، والاستمارة في هذا التصيير لا تعرف بعد. لا تنخدع بثبات الكتلة العليا، فالتحديث يحتاج اشتراكًا لا قراءة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>اكتب حرفًا واحدًا ثم احذفه. راقب <code>isDirty</code> و<code>isDefaultValue</code> و<code>isPristine</code> في الكتلة السفلى: القيمة عادت، والتاريخ لم يعد.</li>
<li>اضغط <code>Tab</code> للدخول إلى الحقل ثم <code>Tab</code> للخروج دون كتابة. ستجد <code>isTouched</code> و<code>isBlurred</code> صحيحتين و<code>isDirty</code> كاذبة.</li>
<li>اكتب ثم ابقَ داخل الحقل دون خروجه: <code>isTouched</code> و<code>isDirty</code> صحيحتان، و<code>isBlurred</code> كاذبة. هذا يوضّح أن الأعلام الثلاثة تقيس ثلاثة أحداث مختلفة.</li>
<li>اربط الحقل باسمه: أضف <code>label</code> بـ<code>htmlFor</code> مساوٍ لـ<code>field.name</code>، وأضف إلى <code>input</code> السمة <code>id</code> بالقيمة نفسها. ثم اضغط على النص وتأكّد أن التركيز ينتقل إلى الحقل.</li>
<li>أضف حقلًا ثانيًا لـ<code>lastName</code> بالطريقة نفسها، واطبع <code>field.state.meta</code> الخاص به. ستجد أن لكل حقل بياناته المستقلة، وأن <code>form.state</code> في الكتلة العليا ما زالت لا تعرف عن أي منهما شيئًا.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=939s">فيديو الدرس: Fields Meta Data</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/field-meta">شيفرة الدرس: فرع field-meta</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/reactivity">التوثيق الرسمي: التفاعلية والاشتراك في حالة الاستمارة</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Fields Meta Data» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,n={book:e,chapter:s,chapterTitle:a,slug:c,title:o,headings:d,html:t};export{e as book,s as chapter,a as chapterTitle,n as default,d as headings,t as html,c as slug,o as title};
