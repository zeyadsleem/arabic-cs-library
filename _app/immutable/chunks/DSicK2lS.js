const s="tanstack-form",a="form",e="دورة TanStack Form الكاملة",n="dynamic-validations",o="التحقّق الديناميكي من الصحة (Dynamic Validations)",c=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"لماذا-لا-تكفي-الخيارات-الثابتة",text:"لماذا لا تكفي الخيارات الثابتة"},{depth:3,id:"تحويل-قاعدة-الطول-إلى-ondynamic",text:"تحويل قاعدة الطول إلى onDynamic"},{depth:3,id:"شرط-التشغيل-revalidatelogic",text:"شرط التشغيل: revalidateLogic"},{depth:3,id:"الوضعان-mode-وmodeaftersubmission",text:"الوضعان: mode وmodeAfterSubmission"},{depth:3,id:"من-أين-جاء-الخطأ-errormap",text:"من أين جاء الخطأ؟ errorMap"},{depth:3,id:"التعايش-مع-بقية-القواعد",text:"التعايش مع بقية القواعد"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],t=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>كلّ قاعدة تحقّق كتبناها حتى الآن كانت مرتبطة بخُطّاف ثابت: <code>onChange</code> تعني أن تعمل القاعدة عند كلّ ضغطة مفتاح، و<code>onBlur</code> عند مغادرة الحقل، و<code>onSubmit</code> عند الإرسال وحده. هذا الاختيار يُتَّخذ مرّة واحدة عند كتابة المكوّن، ويلازم الاستمارة طوال عمرها. لكنّ التوقيت المناسب ليس واحدًا في كلّ المراحل: قبل أن يُرسل المستخدم الاستمارة للمرّة الأولى، لا يصحّ أن تُطارده رسائل الخطأ وهو يكتب أوّل حرف من اسمه؛ وبعد أن أرسل مرّة واحدة، صار يعرف ما هو مطلوب منه، وأصبح من الأفضل أن يرى الخطأ يختفي فور تصحيحه.</p>
<p>يحلّ الدرس هذه المفارقة بخيار ثالث إلى جانب الخيارات الثابتة هو <code>onDynamic</code>، أي تحقّق يُقرَّر توقيته من حالة الاستمارة نفسها. لكنّ <code>onDynamic</code> لا يعمل وحده: يحتاج إلى دالّة تُخبره متى يعمل، وهي <code>revalidateLogic</code> التي تُمرَّر إلى خيار <code>validationLogic</code> في <code>useForm</code>. سنرى في هذا الدرس كيف ننقل قاعدة الطول من <code>onChange</code> إلى <code>onDynamic</code>، وكيف نضبط الوضع الابتدائي ووضع ما بعد الإرسال، وكيف نعرف من أيّ مصدر جاء الخطأ.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="لماذا-لا-تكفي-الخيارات-الثابتة">لماذا لا تكفي الخيارات الثابتة</h3>
<p>تخيّل مستخدمًا يفتح الاستمارة لأوّل مرّة ويبدأ بكتابة اسمه الأول. مع <code>onChange</code> يعمل التحقّق بعد كلّ حرف، فيرى «الاسم الأول يجب ألّا يقلّ عن حرفين» في اللحظة التي كتب فيها حرفًا واحدًا فقط. الرسالة صحيحة تقنيًا، لكنها سابقة لأوانها: المستخدم لم يُنهِ الكتابة بعد ولا يطلب حكمًا على ما كتبه. في المقابل، لو اخترنا <code>onSubmit</code> وحدها، لاختفت الرسالة من أمامه بعد الإرسال وبقي يعدّل الحقل بلا أيّ إشارة حتى يضغط الإرسال من جديد، وهو سلوك يبدو كأنّ الاستمارة لا تسمع ما يكتبه.</p>
<p>الخيارات الثابتة تجبرك على انتقاء أحد الطرفين. <code>onDynamic</code> يرفع هذا القيد: القاعدة نفسها تُسجَّل مرّة واحدة، أمّا لحظة تنفيذها فتتغيّر مع حالة الاستمارة. والفرق ليس تجميليًا، بل يخصّ ما يعرفه المستخدم في كلّ لحظة.</p>
<h3 id="تحويل-قاعدة-الطول-إلى-ondynamic">تحويل قاعدة الطول إلى <code>onDynamic</code></h3>
<p>نبدأ من الحقل <code>firstName</code> في ملف <code>src/lib/RegisterForm.tsx</code>. القاعدة الموجودة تفحص الطول، ولم يتغيّر جسمها؛ الشيء الوحيد الذي تغيّر هو اسم الخيار من <code>onChange</code> إلى <code>onDynamic</code>:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span>
          name=<span class="hljs-string">&quot;firstName&quot;</span>
          validators={{
            <span class="hljs-attr">onDynamic</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (value.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;First name must be at least 2 characters&quot;</span>;
              }
            },
          }}
          listeners={{
            <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (!value) {
                form.<span class="hljs-title function_">setFieldValue</span>(<span class="hljs-string">&quot;lastName&quot;</span>, <span class="hljs-string">&quot;&quot;</span>);
              }
            },
          }}
        &gt;
</code></pre>
<p>لاحظ موضع القاعدة: ما زالت داخل <code>validators</code> تمامًا مثل أيّ متحقّق آخر، وما زال مُستقبِلُها هو كائن <code>{ value }</code> نفسه، وما زال الإرجاع نصًّا عربيًا أو رسالة إنجليزية كما كان. لم نكتب منطقًا يدويًا يفحص «هل أُرسلت الاستمارة؟» ولا عدّادًا في حالة المكوّن؛ هذا الإطار يتولّاه TanStack Form.</p>
<p>أمّا <code>listeners</code> المجاور فلا علاقة له بالتحقّق: هو الاستماع القديم الذي يمسح الحقل <code>lastName</code> حين يفرغ الحقل <code>firstName</code>. وجوده هنا يذكّرك بأن <code>validators</code> و<code>listeners</code> جاران منفصلان، وأن تغيير الأوّل لا يمسّ الثاني.</p>
<h3 id="شرط-التشغيل-revalidatelogic">شرط التشغيل: <code>revalidateLogic</code></h3>
<p>لو أبقينا الملف على حاله لما نُفِّذت القاعدة أبدًا. <code>onDynamic</code> لا يملك توقيتًا في ذاته، فهو يحتاج إلى دالّة تُسمّى <code>validationLogic</code> تحدّد له متى يُستدعى. لذلك نستورد <code>revalidateLogic</code> مع بقية ما نحتاجه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> {
  formOptions,
  revalidateLogic,
  useForm,
  useStore,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-form&quot;</span>;
</code></pre>
<p>ثم نمرّرها إلى <code>useForm</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">RegisterForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> form = <span class="hljs-title function_">useForm</span>({
    ...formOpts,
    <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value);
    },
    <span class="hljs-attr">validationLogic</span>: <span class="hljs-title function_">revalidateLogic</span>({
      <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;submit&quot;</span>,
      <span class="hljs-attr">modeAfterSubmission</span>: <span class="hljs-string">&quot;blur&quot;</span>,
    }),
    <span class="hljs-attr">listeners</span>: {
      <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ formApi, fieldApi }</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(formApi, fieldApi);
      },
    },
  });
</code></pre>
<p>هذا هو الموضع الحاسم في الدرس. إن نسيت <code>validationLogic</code>، لن يعمل <code>onDynamic</code> ولن يظهر لك خطأ في الطرفية يشرح السبب: الحقل يبقى صحيحًا في نظر الاستمارة، والإرسال يمرّ، والرسالة التي كتبتها في المُتحقّق لا تصل إلى الشاشة. ومن هنا فإن أيّ «تحقّق لا يعمل» مع <code>onDynamic</code> يُشخَّص أوّلًا بالبحث عن هذا السطر.</p>
<p>وتسمية الخيار مقصودة: <code>revalidateLogic</code> تصف ما يحدث فعلًا، وهو منطق إعادة التحقّق. فالقاعدة لا تُلغى ولا تُستبدل بين المراحل، بل يُعاد تشغيلها وفق الوضع السائد في تلك اللحظة.</p>
<h3 id="الوضعان-mode-وmodeaftersubmission">الوضعان: <code>mode</code> و<code>modeAfterSubmission</code></h3>
<p>تأخذ <code>revalidateLogic</code> كائنًا فيه خياران. الأوّل <code>mode</code> هو الوضع قبل أول إرسال، وقيمته الافتراضية <code>&quot;submit&quot;</code>، أي لا تحقّق أثناء الكتابة ولا عند مغادرة الحقل. والثاني <code>modeAfterSubmission</code> هو الوضع بعد أول إرسال، وقيمته الافتراضية <code>&quot;change&quot;</code>.</p>
<p>في المقتطف أعلاه أبقى المؤلف <code>mode</code> على <code>&quot;submit&quot;</code> صراحة، وغيّر <code>modeAfterSubmission</code> إلى <code>&quot;blur&quot;</code>. ولو حذفت الكائن كلّه وكتبت <code>revalidateLogic()</code> لحصلت على السلوك الافتراضي: صمت تامّ قبل الإرسال، ثم تحقّق عند كلّ تغيير بعد الإرسال.</p>
<p>جرّب هذا التسلسل في المتصفّح لترى الفرق بعينك. أعد تحميل الصفحة واكتب في حقل الاسم الأول حرفًا واحدًا: لا تظهر رسالة، لأن الوضع الحالي <code>&quot;submit&quot;</code>. اضغط زرّ الإرسال: يظهر الخطأ الآن، لأن الإرسال هو ما شغّل التحقّق. بعد ذلك فقط يتغيّر الوضع إلى <code>&quot;blur&quot;</code>، فإذا أكملت الكتابة ونقلت التركيز إلى حقل آخر ظهرت الرسالة أو اختفت حسب طول ما كتبته. أمّا لو أبقيت الافتراضي <code>&quot;change&quot;</code> لرأيت الرسالة تتغيّر مع كلّ حرف بعد الإرسال، من غير حاجة إلى مغادرة الحقل.</p>
<p>القيم الثلاث المتاحة للخيارين هي نفسها: <code>&quot;change&quot;</code> و<code>&quot;blur&quot;</code> و<code>&quot;submit&quot;</code>. هذا التماثل مفيد لأنك تستطيع بناء أيّ تسلسل تريده، مثل أن تبدأ بـ<code>&quot;blur&quot;</code> ثم تنتقل إلى <code>&quot;change&quot;</code> بعد الإرسال. المهم أن تفهم أنّ الخيارين يعملان معًا: <code>mode</code> يحكم الفترة الأولى، و<code>modeAfterSubmission</code> يحكم كلّ ما بعدها، ولا رجوع إلى الأولى بعد الإرسال.</p>
<h3 id="من-أين-جاء-الخطأ-errormap">من أين جاء الخطأ؟ <code>errorMap</code></h3>
<p>الخطأ الذي يعرضه الحقل يمرّ عبر <code>field.state.meta</code>. في المقتطف التالي نرى كيف تُقرأ الحالة وتُعرض، مع <code>pre</code> يطبع كائن <code>meta</code> كاملًا في أعلى الحقل، وهو ما استعمله المؤلف في الفيديو ليتابع ما يجري:</p>
<pre><code class="language-tsx">          {<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> {
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
                {!field.state.meta.isValid &amp;&amp; (
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 mt-2&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
                    {field.state.meta.errors.join(&quot;, &quot;)}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                )}
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            );
          }}
</code></pre>
<p>داخل هذا الكائن تجد <code>errorMap</code> إلى جانب <code>errors</code>. المفتاح الجديد الذي يظهر بعد نقل القاعدة هو <code>onDynamic</code>، تمامًا كما كان <code>onChange</code> و<code>onBlur</code> يظهران قبل ذلك. أيّ أنّ <code>errorMap</code> يحفظ مصدر كلّ خطأ لا نصّه فقط. هذه المعلومة تفيد حين تجتمع قواعد عدّة على الحقل نفسه: يمكنك أن تعرف أنّ الرسالة الظاهرة جاءت من التحقّق الديناميكي لا من متحقّق الإرسال، فتعرضها أو تتعامل معها على هذا الأساس. أمّا <code>errors</code> فهي القائمة المسطّحة التي نعرضها للمستخدم، ولهذا يبقى عرضها كما هو دون تغيير.</p>
<h3 id="التعايش-مع-بقية-القواعد">التعايش مع بقية القواعد</h3>
<p>من المهم ألّا تفهم <code>onDynamic</code> كبديل يلغي ما قبله. يمكن للحقل الواحد أن يحمل <code>onChange</code> و<code>onBlur</code> و<code>onSubmit</code> و<code>onDynamic</code> في الوقت نفسه، وكلّ واحد منها يعمل في موضعه. الفرق أنّ <code>onDynamic</code> يتبع الوضع المتحوّل، أمّا البقية فتتبع خُطّافها الثابت مهما كانت حالة الاستمارة. فإن كانت لديك قاعدة تصلح في كلّ الأوقات، فمكانها الطبيعي <code>onChange</code> أو <code>onBlur</code>، وإن كانت قاعدة يختلف توقيتها باختلاف المرحلة فمكانها <code>onDynamic</code>.</p>
<p>وللتحقّقات التي تحتاج إلى الشبكة نسخة غير متزامنة هي <code>onDynamicAsync</code>، تعمل بالمنطق نفسه وتتبع الوضعين نفسهما. حذفها المؤلف من هذا الدرس فقط لتبسيط الشرح، لا لأنّها غير مدعومة. القاعدة نفسها: بلا <code>validationLogic</code> لن تُستدعى أيٌّ من النسختين.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--dynamic-validations--submitted.png" alt="حقل الاسم الأول بعد إرسال ناجح: كائن الحالة مطبوع في الأعلى، ثم حقول الاستمارة، ثم قيم الاستمارة كاملة في الأسفل"></p>
<p>في الصورة نرى الاستمارة بعد أن امتلأت وأُرسلت: أعلى الصفحة كائن <code>meta</code> مطبوع بتنسيق <code>JSON</code>، وفيه <code>isValid: true</code> و<code>errorMap</code> فارغة، أي أنّ القاعدة لم تجد ما تشكو منه. تحته حقول الاسم الأول واسم العائلة والشارع، ثم قائمة المهارات الثلاث بمستوياتها، ثم مربّع قبول الشروط وزرّ الإرسال. وفي أسفل الصفحة تظهر قيم الاستمارة كاملة كما وصلت إلى <code>onSubmit</code>. الحقل المطمئنّ إلى صحّته هو نتيجة مباشرة للتحقّق الديناميكي: القاعدة عملت في الوضع المناسب، فلم تُزعج المستخدم قبل الإرسال، ولم تصمت عنه بعده.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>احذف <code>validationLogic</code> من <code>useForm</code> مؤقّتًا، ثم اكتب حرفًا واحدًا في حقل الاسم الأول وأرسل الاستمارة. لاحظ أنّ الخطأ لا يظهر إطلاقًا، وأنّ سبب ذلك ليس القاعدة بل غياب منطق إعادة التحقّق.</li>
<li>بدّل <code>revalidateLogic({ ... })</code> بالشكل الافتراضي <code>revalidateLogic()</code>، وأعد التجربة: صمت قبل الإرسال، ثم تحقّق عند كلّ حرف بعده.</li>
<li>غيّر قيمة <code>mode</code> إلى <code>&quot;blur&quot;</code> واترك <code>modeAfterSubmission</code> على <code>&quot;submit&quot;</code>، ثم راقب متى يظهر الخطأ ومتى يختفي في المرحلتين.</li>
<li>أضف متحقّق <code>onBlur</code> بجانب <code>onDynamic</code> على الحقل <code>address.street</code> بقاعدة مختلفة، ثم افتح <code>meta</code> في المتصفّح وقارن مفتاحي <code>errorMap</code> لكلّ خطأ.</li>
<li>أعِد <code>onDynamicAsync</code> إلى الحقل بدالّة تُرجع بعد مهلة قصيرة، وتأكّد أنّ الوضعين نفسيهما يحكمانها.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=3934s">فيديو الدرس: التحقّق الديناميكي من الصحة</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/validation-4">شيفرة الدرس: فرع validation-4</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/dynamic-validation">التوثيق الرسمي: التحقّق الديناميكي في TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Dynamic Validations» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,d={book:s,chapter:a,chapterTitle:e,slug:n,title:o,headings:c,html:t};export{s as book,a as chapter,e as chapterTitle,d as default,c as headings,t as html,n as slug,o as title};
