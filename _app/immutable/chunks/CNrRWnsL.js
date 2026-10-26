const s="tanstack-form",a="form",e="دورة TanStack Form الكاملة",n="form-level-validations",t="التحقّق من الصحة على مستوى الاستمارة (Form Level Validations)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"القاعدة-التي-لا-يملكها-حقل",text:"القاعدة التي لا يملكها حقل"},{depth:3,id:"المحقق-على-useform-نفس-الكائن-ومفتاح-مختلف",text:"المحقّق على useForm: نفس الكائن ومفتاح مختلف"},{depth:3,id:"خطأ-عام-ما-لا-ينتمي-إلى-حقل",text:"خطأ عام: ما لا ينتمي إلى حقل"},{depth:3,id:"كائن-fields-الخطأ-يعود-إلى-صاحبه",text:"كائن fields: الخطأ يعود إلى صاحبه"},{depth:3,id:"أين-يظهر-خطأ-الحقل-الذي-أنتجته-الاستمارة",text:"أين يظهر خطأ الحقل الذي أنتجته الاستمارة"},{depth:3,id:"من-يملك-الكلمة-الأخيرة",text:"من يملك الكلمة الأخيرة؟"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق أعطينا كل حقل قواعده الخاصة، فأصبح كل حقل مسؤولًا عن صحّة قيمته وحدها. لكن ليست كل قاعدة بهذا الشكل: بعض القواعد لا تنظر إلى حقل واحد، بل إلى الاستمارة كلها. في هذا الدرس نرفع المحقّق من الحقل إلى الاستمارة، أي نضعه في <code>useForm</code> إلى جانب <code>onSubmit</code>، ونرى ما يتغيّر حينها.</p>
<p>الدرس يعلّم التمييز الذي يقوم عليه كل شيء بعده: المحقّق على مستوى الاستمارة يستطيع أن يُعيد خطأً عامًّا للاستمارة لا ينتمي إلى أي حقل، ويستطيع كذلك أن يُعيد أخطاءً موجّهة إلى حقول بعينها. نتعلم كيف نقرأ النوع الأول من <code>form.state.errors</code>، وكيف نُعيد النوع الثاني عبر كائن <code>fields</code>، ونمرّ على المسارات المتداخلة والمصفوفات، ثم ننتهي إلى قاعدة الأسبقية: حين يتكلّم مستويان عن الحقل نفسه، فأيّهما يُسمع؟</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="القاعدة-التي-لا-يملكها-حقل">القاعدة التي لا يملكها حقل</h3>
<p>افترض قاعدة تقول إن الحقلين <code>password</code> و<code>confirmPassword</code> يجب أن يتطابقا. أين تضعها؟ إن وضعتها على <code>password</code> فستُفحَص كلما تغيّرت كلمة المرور، لكنها لن تُفحَص حين يغيّر المستخدم <code>confirmPassword</code>، لأن ذلك الحقل لم يتغيّر. وإن وضعتها على <code>confirmPassword</code> انقلب الخطأ نفسه: تصحيح كلمة المرور لا يُعيد الفحص، فيبقى الخطأ معلّقًا أو يختفي في الوقت الخطأ.</p>
<p>السبب بنيوي: المحقّق على مستوى الحقل يستقبل قيمة حقل واحد فقط. لا يرى جاره، ولا يعرف أن هناك جارًا. فالقاعدة التي تحتاج قيمتين لا يمكن أن تُنسب إلى إحداهما دون الأخرى. لهذا توفّر المكتبة مستوى أعلى: محقّق على الاستمارة، يستقبل الاستمارة كاملة ويستطيع أن يقرّر بعدها أين يضع الحكم.</p>
<p>المؤلف يُثبت النقطة عمليًا: يضيف <code>validators</code> إلى <code>useForm</code> ويطبع <code>value</code>، فيرى كائنًا يحمل كل القيم لا قيمة حقل واحد، ثم يحذف الطبع.</p>
<h3 id="المحقق-على-useform-نفس-الكائن-ومفتاح-مختلف">المحقّق على <code>useForm</code>: نفس الكائن ومفتاح مختلف</h3>
<p><code>validators</code> هنا كائن لا دالة، ومفاتيحه هي نفس لحظات التشغيل التي عرفناها في الحقل: <code>onChange</code> و<code>onBlur</code> و<code>onSubmit</code> وأخواتها غير المتزامنة. الفرق في المعامل: <code>value</code> هنا هو كائن القيم الافتراضية بكامله. والفرع النهائي للدرس يعلّق محقّقات الحقل مؤقتًا ويُبقي محقّقًا واحدًا على الاستمارة:</p>
<pre><code class="language-tsx">    <span class="hljs-attr">validators</span>: {
      <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">fields</span>: {
            <span class="hljs-attr">firstName</span>: !value.<span class="hljs-property">firstName</span> ? <span class="hljs-string">&quot;First name is required&quot;</span> : <span class="hljs-literal">undefined</span>,
            <span class="hljs-string">&quot;address.street&quot;</span>: !value.<span class="hljs-property">address</span>.<span class="hljs-property">street</span>
              ? <span class="hljs-string">&quot;Street is required&quot;</span>
              : <span class="hljs-literal">undefined</span>,
            <span class="hljs-string">&quot;skills[0].level&quot;</span>:
              value.<span class="hljs-property">skills</span>[<span class="hljs-number">0</span>]?.<span class="hljs-property">level</span> !== <span class="hljs-string">&quot;expert&quot;</span>
                ? <span class="hljs-string">&quot;Your must be an expert&quot;</span>
                : <span class="hljs-literal">undefined</span>,
          },
        };
      },
    },
</code></pre>
<p>لاحظ الشكل: الدالة لا تُعيد نصًّا، بل كائنًا فيه مفتاح <code>fields</code>، وفي داخله ثلاثة مفاتيح لكل منها مسار. النص <code>&quot;First name is required&quot;</code> هو الخطأ، و<code>undefined</code> تعني أن القاعدة مرّت. ولاحظ أن كل هذه المفاتيح تقع على مستوى الاستمارة، فلا نكرّر المحقّق في كل حقل.</p>
<h3 id="خطأ-عام-ما-لا-ينتمي-إلى-حقل">خطأ عام: ما لا ينتمي إلى حقل</h3>
<p>قبل أن يصل المؤلف إلى الكائن <code>fields</code> جرّب الأبسط: أن تُعيد الدالة نصًّا مباشرة. حين فعل ذلك ظهر الخطأ، لكنه لم يظهر تحت الاسم الأول مع أن الشرط عنه. لماذا؟ لأن ما يعيده محقّق الاستمارة نصًّا مجرّدًا يُخزَّن كخطأ عام للاستمارة، لا كخطأ حقل. والمكتبة لا تخمّن الحقل المقصود.</p>
<p>هذا الخطأ العام يُقرأ من حالة الاستمارة، لا من <code>meta</code> أي حقل:</p>
<pre><code class="language-tsx">  <span class="hljs-keyword">const</span> errors = <span class="hljs-title function_">useStore</span>(form.<span class="hljs-property">store</span>, <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">errors</span>);
</code></pre>
<p><code>useStore</code> يشترك في جزء محدّد من الحالة، فلا يُعاد تصيير المكوّن إلا حين يتغيّر ذلك الجزء. وهنا نطلب <code>state.errors</code> وحدها: مصفوفة الأخطاء العامة، منفصلة عن أخطاء الحقول. وبما أنها لا تنتمي إلى أي حقل، يعرضها الفرع قبل الاستمارة:</p>
<pre><code class="language-tsx">      {errors &amp;&amp; (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 text-start mb-4&quot;</span>&gt;</span>{errors.join(&quot;, &quot;)}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
      )}
</code></pre>
<p><code>errors</code> مصفوفة، ولهذا تحتاج <code>join</code> لتصير نصًّا معروضًا؛ فقد تحمل أكثر من خطأ من أكثر من محقّق. والشرط <code>errors &amp;&amp;</code> يمنع طباعة سطر فارغ. أمّا الموضع فأمام الاستمارة لا داخلها، لأن الخطأ العام ليس ملكًا لحقل بعينه؛ وضعه تحت حقل ما سيوحي بأن ذلك الحقل هو المشكلة.</p>
<p>وتحمل حالة الاستمارة كذلك <code>errorMap</code>، خريطة مفاتيحها أسماء المحقّقات، فخطأ عام أعدّته قاعدة <code>onSubmit</code> تقرأه من <code>form.state.errorMap.onSubmit</code>، وهو الخطأ العام نفسه لا خطأ حقل.</p>
<h3 id="كائن-fields-الخطأ-يعود-إلى-صاحبه">كائن <code>fields</code>: الخطأ يعود إلى صاحبه</h3>
<p>الخطأ العام مفيد حين تكون المشكلة في الاستمارة ككل، كأن يرفض الخادم الإرسال. لكننا غالبًا نعرف الحقل المسؤول ونريد الرسالة تحته، ولهذا يقبل المحقّق شكلًا ثانيًا: كائن فيه <code>fields</code>، وداخله المسار ورسالته، كما في الكتلة أعلاه.</p>
<p>المسارات الثلاثة تُظهر ثلاث حالات:</p>
<ul>
<li><code>firstName</code>: حقل بسيط في المستوى الأعلى، مفتاحه اسمه كما هو.</li>
<li><code>&quot;address.street&quot;</code>: حقل متداخل، ويُكتب بالنقطة كما تكتبه في <code>form.Field</code> وفي <code>defaultValues</code>؛ ولهذا وُضع بين علامتَي تنصيص، فالمفتاح نفسه يحتوي نقطة.</li>
<li><code>&quot;skills[0].level&quot;</code>: حقل داخل مصفوفة، يُكتب بالدليل ثم الأقواس المربّعة ثم النقطة. و<code>?.</code> قبل <code>level</code> تحمي من المصفوفة الفارغة: إن حذف المستخدم كل المهارات لا تنهار القاعدة، بل تعيد خطأً.</li>
</ul>
<p>المهم أن هذه المسارات ليست صياغة خاصة بهذا الكائن؛ هي أسماء الحقول نفسها التي تستعملها في <code>form.Field</code>، لأن الكائن <code>fields</code> يوجّه الخطأ إلى الحقل صاحب ذلك الاسم.</p>
<h3 id="أين-يظهر-خطأ-الحقل-الذي-أنتجته-الاستمارة">أين يظهر خطأ الحقل الذي أنتجته الاستمارة</h3>
<p>الخطأ الموجّه لا يخترع مكان عرض جديدًا: يسكن في <code>meta</code> ذلك الحقل كخطأ المحقّق الحقلّي. والدليل أن الفرع لم يغيّر طريقة العرض، بل أعاد الكتلة نفسها إلى حقل الشارع:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span> name=<span class="hljs-string">&quot;address.street&quot;</span>&gt;
          {<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Street&quot;</span>
                <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{field.handleBlur}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
              /&gt;
              {!field.state.meta.isValid &amp;&amp; (
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 mt-2&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
                  {field.state.meta.errors.join(&quot;, &quot;)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              )}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          )}
        &lt;/form.<span class="hljs-property">Field</span>&gt;
</code></pre>
<p>هنا يظهر الخطأ تحت حقل الشارع لأن الحقل يعرض <code>field.state.meta.errors</code>، وقد وضع المحقّق فيه رسالة <code>&quot;Street is required&quot;</code>. الشرط <code>!field.state.meta.isValid</code> لا يسأل من أين جاء الخطأ، بل: هل هذا الحقل صالح الآن؟ ولذلك يعمل مع المصدرين بلا تعديل. (ولمعرفة المصدر صراحة، <code>errorSourceMap</code> في <code>meta</code> تسجّله.)</p>
<p>والحالة الثالثة، المصفوفة، تحتاج انتباهًا إضافيًا لأننا داخل حلقة على المهارات: كل عنصر يُصيَّر بحقل فرعي اسمه مبنيّ من الدليل، فالخطأ يُقرأ من <code>subField</code> لا من <code>field</code>:</p>
<pre><code class="language-tsx">                      &lt;form.<span class="hljs-property">Field</span> name={<span class="hljs-string">\`skills[<span class="hljs-subst">\${index}</span>].level\`</span>}&gt;
                        {<span class="hljs-function">(<span class="hljs-params">subField</span>) =&gt;</span> (
                          <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
                              <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                              <span class="hljs-attr">value</span>=<span class="hljs-string">{subField.state.value}</span>
                              <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{subField.handleBlur}</span>
                              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
                                subField.handleChange(e.target.value as any);
                              }}
                            &gt;
                              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;beginner&quot;</span>&gt;</span>Beginner<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;intermediate&quot;</span>&gt;</span>Intermediate<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;expert&quot;</span>&gt;</span>Expert<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
                            {!subField.state.meta.isValid &amp;&amp; (
                              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 mt-2&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
                                {subField.state.meta.errors.join(&quot;, &quot;)}
                              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            )}
                          <span class="hljs-tag">&lt;/&gt;</span></span>
                        )}
                      &lt;/form.<span class="hljs-property">Field</span>&gt;
</code></pre>
<p>لاحظ أن الفرع غلّف عنصر <code>select</code> والخطأ في <code>&lt;&gt;...&lt;/&gt;</code> لأن دالة التصيير لا تُعيد عنصرين متجاورين بلا أب. ولاحظ أن الرسالة صيغت للعنصر الأول وحده: <code>skills[0].level</code>، فباقي الصفوف لا تحمل هذا الشرط؛ وهذا حدّ المثال لا حدّ المكتبة، والتمارين تُظهر كيف يُعمَّم.</p>
<h3 id="من-يملك-الكلمة-الأخيرة">من يملك الكلمة الأخيرة؟</h3>
<p>يبقى سؤال يظهر حين تضع القاعدة في المكانين معًا: محقّق على الاستمارة يُعيد خطأً للاسم الأول، ومحقّق على الاسم الأول نفسه يُعيد خطأً آخر. أيهما يصل إلى <code>meta.errors</code>؟</p>
<p>الجواب في هذا الفرع: خطأ الحقل يتقدّم، وخطأ الاستمارة الموجّه إلى الحقل نفسه يُستبدل به. ولهذا ترك المؤلف محقّقات الحقل معلّقة في الملف، لا محذوفة:</p>
<pre><code class="language-tsx">          <span class="hljs-comment">// validators={{</span>
          <span class="hljs-comment">//   onBlur: ({ value }) =&gt; {</span>
          <span class="hljs-comment">//     if (value !== &quot;John&quot;) {</span>
          <span class="hljs-comment">//       return &quot;Your name must be John.&quot;;</span>
          <span class="hljs-comment">//     }</span>
          <span class="hljs-comment">//   },</span>
          <span class="hljs-comment">//   onChange: ({ value }) =&gt; {</span>
          <span class="hljs-comment">//     if (value.length &lt; 2) {</span>
          <span class="hljs-comment">//       return &quot;First name must be at least 2 characters&quot;;</span>
          <span class="hljs-comment">//     }</span>
          <span class="hljs-comment">//   },</span>
          <span class="hljs-comment">// }}</span>
</code></pre>
<p>هذه الكتلة هي درس الدرس السابق، أُبقيت معطّلة لتوضيح الأسبقية: لو أزلت التعليق، لظهر خطأ الطول وحده ولا يظهر <code>&quot;First name is required&quot;</code>، مع أن الاستمارة ما زالت تُعيده. والقاعدة العملية: لا تعتمد على محقّق الاستمارة لتغطية حقل يملك محقّقًا خاصًّا؛ إمّا أن تجمع القواعد في مكان واحد، أو تتأكد أن لكل قاعدة مالكًا واحدًا.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--form-level-validations--form-errors.png" alt="استمارة التسجيل: الاسم الأول مكتوب، وحقل الشارع فارغ وتحته رسالة خطأ حمراء، والاسم الأخير فارغ بلا رسالة، وثلاث مهارات بمستوى مبتدئ وإلى جانب الأولى رسالة حمراء تطلب مستوى خبيرًا، ثم زرّ إضافة مهارة ومربّع الشروط غير المحدّد وزرّ الإرسال، وأسفل الصفحة كتلة القيم"></p>
<p>لا يظهر في أعلى الصفحة سطر أحمر، لأن المحقّق في الفرع لا يُعيد نصًّا عامًّا بل كائن <code>fields</code>، فمصفوفة <code>state.errors</code> فارغة. وأزيل الطبع المؤقّت الذي استُخدم لفحص شكل القيمة، فبدأت الصفحة بالحقول مباشرة.</p>
<p>حقل الاسم الأول مكتوب، ولذلك مرّت قاعدة <code>firstName</code>. والاسم الأخير ظهر بفضل <code>form.Subscribe</code> الذي لا يعرضه إلا بعد كتابة الاسم الأول، وهو فارغ بلا رسالة لأن المحقّق لا يفحصه. أمّا الشارع فظهر وفيه سطر أحمر واحد، <code>Street is required</code>، أنتجته الاستمارة ووجّهته إلى <code>&quot;address.street&quot;</code>، فقرأه الحقل من <code>meta.errors</code>.</p>
<p>في قسم المهارات ثلاثة صفوف مستواها <code>beginner</code>، وإلى جانب صف <code>HTML</code> تظهر <code>Your must be an expert</code> بالأحمر (كما كتبها المؤلف في الفرع). صفّا <code>CSS</code> و<code>JavaScript</code> بلا خطأ لأن المحقّق يفحص <code>skills[0].level</code> وحده. وأسفل الاستمارة زرّ الإرسال باهت لأن <code>canSubmit</code> كاذبة ما دام في الاستمارة حقل غير صالح، وتحته كتلة القيم التي تؤكد أن <code>address.street</code> فارغ و<code>skills</code> تحمل ثلاثة عناصر.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>اجعل محقّق <code>onChange</code> يُعيد نصًّا بدل كائن <code>fields</code>، واكتب اسمًا ثم امسحه. سيظهر الخطأ أعلى الاستمارة لا تحته، وستجد الحقل نفسه صالحًا في <code>meta</code>، لأن النص أصبح خطأً عامًّا للاستمارة.</li>
<li>أضف إلى <code>fields</code> قاعدة تقارن <code>password</code> بـ<code>confirmPassword</code>، ثم اكتب كلمتين مختلفتين وعدّل إحداهما بعد الأخرى. سيصحّ الخطأ مهما كان الحقل الذي عدّلته، وهذا ما لا يستطيعه محقّق على أحد الحقلين وحده.</li>
<li>أضف <code>&quot;skills[1].level&quot;</code> بالقاعدة نفسها. سيظهر خطأ الصف الثاني ويبقى الأول على حاله، فتتأكد أن كل مسار مستقل.</li>
<li>أزل التعليق عن <code>validators</code> في <code>form.Field</code> الخاص بالاسم الأول، واكتب حرفًا واحدًا. سيظهر خطأ الطول وحده ولا يظهر <code>&quot;First name is required&quot;</code>، لأن مستوى الحقل يتقدّم.</li>
<li>بدّل <code>state.errors</code> في <code>useStore</code> بـ<code>state.errorMap</code>، واعرض <code>errorMap.onChange</code> بلا <code>join</code>. ستحصل على الخريطة كاملة، وهي مفيدة حين تريد رسالة لكل لحظة تحقّق.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=3196s">فيديو الدرس: Form Level Validations</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/validation-2">شيفرة الدرس: فرع validation-2</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/validation">التوثيق الرسمي: التحقّق من صحة النماذج والحقول</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Form Level Validations» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما أضافه المعدّ من توضيح لا يُنسب إلى المؤلف.</p>
</blockquote>
`,p={book:s,chapter:a,chapterTitle:e,slug:n,title:t,headings:l,html:o};export{s as book,a as chapter,e as chapterTitle,p as default,l as headings,o as html,n as slug,t as title};
