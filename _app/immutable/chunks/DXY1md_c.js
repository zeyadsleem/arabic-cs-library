const s="tanstack-form",a="form",e="دورة TanStack Form الكاملة",n="reactivity-and-listeners",t="التفاعلية والمستمعات: من يشترك في الاستمارة ومن يتفاعل معها؟",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"لماذا-لا-يتحدث-ما-نقرأه-من-formstate",text:"لماذا لا يتحدّث ما نقرأه من form.state؟"},{depth:3,id:"usestore-اشتراك-داخل-منطق-المكون",text:"useStore: اشتراك داخل منطق المكوّن"},{depth:3,id:"formsubscribe-اشتراك-داخل-الواجهة",text:"form.Subscribe: اشتراك داخل الواجهة"},{depth:3,id:"المستمعات-على-مستوى-الحقل",text:"المستمعات على مستوى الحقل"},{depth:3,id:"الفرق-بين-المستمع-والاشتراك",text:"الفرق بين المستمع والاشتراك"},{depth:3,id:"تأخير-تنفيذ-المستمع",text:"تأخير تنفيذ المستمع"},{depth:3,id:"المستمعات-على-مستوى-الاستمارة",text:"المستمعات على مستوى الاستمارة"},{depth:3,id:"أي-أداة-تختار",text:"أيّ أداة تختار؟"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق طبعنا <code>field.state.meta</code> ورأينا الحقل يعرف عن نفسه كل شيء، بينما بقي <code>form.state</code> جامدًا لا يعرف ما جرى. يجيب هذا الدرس عن سؤالين يبدوان سؤالًا واحدًا وليسا كذلك: كيف نقرأ قيمة من الاستمارة ونحن مطمئنون أنها ستتحدّث أمام أعيننا؟ وكيف ننفّذ فعلًا — لا عرضًا — عندما تتغيّر قيمة حقل؟</p>
<p>الجواب الأول اشتراك (subscription): الخُطّاف (hook) <code>useStore</code> لقراءة الحالة داخل منطق المكوّن (component)، والمكوّن <code>form.Subscribe</code> لعرض قطعة واجهة (UI) تعتمد على قيمة ما. والجواب الثاني مستمعات (listeners): دالة تُنفَّذ على مستوى الحقل أو على مستوى الاستمارة عند تغيّر القيمة، فنمسح حقلًا تابعًا أو نرسل طلبًا إلى الشبكة. وفي الطريق نرى لماذا لا يكفي أن تقرأ <code>form.state</code>، وما الفرق بين إخفاء حقل وإفراغه.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="لماذا-لا-يتحدث-ما-نقرأه-من-formstate">لماذا لا يتحدّث ما نقرأه من <code>form.state</code>؟</h3>
<p>ابدأ بما يفعله كل من يبدأ: نضع داخل الاستمارة سطرين يقرآن الحالة مباشرة، أحدهما يعرض <code>form.state.values.firstName</code> والآخر يعرض <code>form.state.isDirty ? &quot;dirty&quot; : &quot;pristine&quot;</code>. بعد الحفظ لا يتغيّر شيء: الاسم الأول يظهر فارغًا، والعبارة تبقى <code>pristine</code> مهما كتبت. و<code>isDirty</code> على مستوى الاستمارة تصير <code>true</code> بمجرّد أن يتّسخ أي حقل من حقولها، لكننا لا نرى ذلك لأن المكوّن لم يُعَد تصييره (<code>render</code>) أصلًا.</p>
<p>هذا ليس خطأً في المكتبة بل قرار تصميم مقصود: <code>TanStack Form</code> يتجنّب إعادة تصيير الاستمارة عند كل ضغطة مفتاح، لأن استمارة كبيرة تُعاد من أجل حرف واحد تُهدر أداء الشاشة كلها. الثمن أن ما تقرأه من <code>form.state</code> أثناء التصيير صورة من آخر تصيير مرّ به المكوّن، لا قيمة حيّة. والحلّ ليس أن تقرأ أكثر، بل أن تعلن ما تريد متابعته.</p>
<h3 id="usestore-اشتراك-داخل-منطق-المكون"><code>useStore</code>: اشتراك داخل منطق المكوّن</h3>
<p>نستورد الخُطّاف مع ما نستخدمه من قبل:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { formOptions, useForm, useStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-form&quot;</span>;
</code></pre>
<p>يأخذ الخُطّاف مخزن الاستمارة أولًا، ثم دالة اختيار (<code>selector</code>). في التجربة الأولى يمرَّر <code>form.store</code> وحده، فيعود المخزن كاملًا وتتحدّث الكتلة مع أي تغيير في الاستمارة، بما فيه أحداث لا تهمّك كخروج التركيز من حقل وكتابة بياناته الوصفية. هذا يعمل، لكنه يعيد التصيير أكثر مما يلزم، وهو بالضبط ما تحاول المكتبة تجنّبه.</p>
<p>الوسيط الثاني هو التقييد. دالة تستقبل الحالة وتعيد المقطع الذي يهمّك وحده؛ لو أردت الاسم الأول لكفى <code>useStore(form.store, (state) =&gt; state.values.firstName)</code>. وفي الفرع النهائي نختار كل القيم لأننا نطبعها كلها:</p>
<pre><code class="language-tsx">  <span class="hljs-keyword">const</span> values = <span class="hljs-title function_">useStore</span>(form.<span class="hljs-property">store</span>, <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">values</span>);
</code></pre>
<p>ثم نعرض الناتج في أعلى الاستمارة:</p>
<pre><code class="language-tsx">        &lt;pre&gt;{<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(values, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)}&lt;/pre&gt;
</code></pre>
<p>الآن كل ضغطة مفتاح تظهر في الكتلة العلوية التي تطبع <code>JSON</code>: الاسم الأول والاسم الأخير وبقية القيم، بما فيها الكائن المتداخل والمصفوفة. ولاحظ ما لم نفعله: لم نقرأ <code>form.state</code>، بل اشتركنا في مقطع واحد منه. ولهذا يهمّ المقطع: لو اشتركنا في <code>state.isDirty</code> بدل <code>state.values</code> لكانت الكتلة تتحدّث عند أوّل تعديل ثم تبقى كما هي، لأن تاريخ التعديل لا يتغيّر بعد ذلك.</p>
<h3 id="formsubscribe-اشتراك-داخل-الواجهة"><code>form.Subscribe</code>: اشتراك داخل الواجهة</h3>
<p>يخدم <code>useStore</code> المنطق: تريد القيمة لتحسب بها أو تمرّرها. أما إذا كان القرار «أعرض هذا أم لا» فالمكوّن <code>form.Subscribe</code> أنسب، لأنه يعيد تصيير نفسه وحده لا المكوّن الحاوي. نمرّر له خاصية <code>selector</code>، ونضع بين وسميه دالة تستقبل القيمة المشترك فيها:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Subscribe</span> selector={<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">values</span>.<span class="hljs-property">firstName</span>}&gt;
          {<span class="hljs-function">(<span class="hljs-params">firstName</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
              {firstName &amp;&amp; (
                <span class="hljs-tag">&lt;<span class="hljs-name">form.Field</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;lastName&quot;</span>&gt;</span>
                  {(field) =&gt; (
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Last Name&quot;</span>
                        <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                        <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{field.handleBlur}</span>
                        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
                      /&gt;
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  )}
                <span class="hljs-tag">&lt;/<span class="hljs-name">form.Field</span>&gt;</span>
              )}
            <span class="hljs-tag">&lt;/&gt;</span></span>
          )}
        &lt;/form.<span class="hljs-property">Subscribe</span>&gt;
</code></pre>
<p>تفصيلان صغيران يستحقّان التوقّف. <code>firstName &amp;&amp; (...)</code> تعبير منطقي لا شرط: ما دام الاسم الأول نصًا فارغًا فقيمته كاذبة، فيُرجِع التعبير تلك القيمة الفارغة ولا يظهر شيء؛ وبمجرّد كتابة حرف واحد يصير صحيحًا فيظهر حقل الاسم الأخير. والحاوية <code>&lt;&gt;...&lt;/&gt;</code> لا تضيف عنصرًا إلى الصفحة، فهي غلاف يسمح بوضع الشرط داخلها دون وسم إضافي.</p>
<p>لكن هذه المرونة تكشف ثغرة سنصطدم بها بعد قليل: أزل الاسم الأول فيختفي حقل الاسم الأخير من الواجهة، وتبقى قيمته محفوظة في الحالة. أعِد كتابة الاسم فيعود الحقل ومعه ما تركه المستخدم فيه. الإخفاء عرضٌ لا محو، ولمحو القيمة نحتاج إلى فعل يقع وقت التغيّر، وهذا موضع المستمعات.</p>
<h3 id="المستمعات-على-مستوى-الحقل">المستمعات على مستوى الحقل</h3>
<p>المستمع كائن يُمرَّر إلى <code>form.Field</code> بجانب <code>name</code>، وفيه دالة لكل حدث تريد الاستماع إليه. نمرّر هنا <code>onChange</code> وحدها، فتُنفَّذ بعد كل تغيير في قيمة هذا الحقل:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span>
          name=<span class="hljs-string">&quot;firstName&quot;</span>
          listeners={{
            <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (!value) {
                form.<span class="hljs-title function_">setFieldValue</span>(<span class="hljs-string">&quot;lastName&quot;</span>, <span class="hljs-string">&quot;&quot;</span>);
              }
            },
          }}
        &gt;
          {<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> (
              <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>
                {/* <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{JSON.stringify(field.state.meta, null, 2)}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span> */}
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
<p>الدالة تستقبل كائنًا فيه <code>value</code>، وهي القيمة الجديدة للحقل بعد التغيير. الشرط <code>if (!value)</code> يسأل سؤالًا واحدًا: هل صار الحقل فارغًا؟ أي هل مسح المستخدم ما فيه. إن كان الجواب نعم استدعينا <code>form.setFieldValue(&quot;lastName&quot;, &quot;&quot;)</code>، وهي دالة متاحة على واجهة الاستمارة تكتب قيمة في أي حقل باسمه، دون أن نمرّ بمكوّن ذلك الحقل أو نمسك مرجعه. لهذا يظهر المسح في الكتلة العلوية أيضًا: القيمة الجديدة تدخل الحالة، فتصير <code>state.values</code> مختلفة، فيعيد <code>useStore</code> تصيير ما يشترك فيها.</p>
<p>لاحظ أن شرطًا واحدًا يكفي لأن المستمع يعمل عند كل تغيير، لا عند المسح وحده. حين تكتب حرفًا ثم آخر فالشرط كاذب مرّتين ولا يحدث شيء؛ وحين تحذف آخر حرف يصير صحيحًا فيُمسح الاسم الأخير. ولاحظ كذلك أن طباعة بيانات الحقل صارت تعليقًا <code>{/* ... */}</code>: كانت أداة تشخيص في الدرس السابق، ولم تعد جزءًا من الواجهة، فأُبقيت معلَّقة لا محذوفة.</p>
<h3 id="الفرق-بين-المستمع-والاشتراك">الفرق بين المستمع والاشتراك</h3>
<p>الاثنان يبدوان متشابهين لأن كليهما «يتفاعل» مع التغيّر، والفرق في نيّة الكود. <code>form.Subscribe</code> و<code>useStore</code> يجيبان عن سؤال «ما الذي أعرضه؟»: قيمة تتغيّر فيتغيّر معها نص أو حقل. والمستمع يجيب عن سؤال «ما الذي أفعله؟»: قيمة تتغيّر فأنفّذ عملية جانبية، كمسح حقل آخر أو إرسال طلب أو حساب مشتق. ولهذا يستقبل المستمع القيمة الجديدة وواجهة الاستمارة، بينما يستقبل المشترك الحالة ويعيد مقطعًا منها.</p>
<p>والمستمع لا يغني عن الاشتراك: لو مسحت الاسم الأخير بمستمع ولم تكن الكتلة العليا مشتركة في القيم، لبقي المعروض قديمًا. الاثنان يعملان معًا في هذا الفرع، وكلٌّ منهما يغطّي نصف الحكاية.</p>
<h3 id="تأخير-تنفيذ-المستمع">تأخير تنفيذ المستمع</h3>
<p>لو أرسل المستمع طلبًا إلى الشبكة عند كل حرف، لأرسل طلبًا لكل ضغطة، ولتنافست الطلبات على النتيجة نفسها. لذلك يوفّر كائن المستمعات خيار <code>onChangeDebounceMs</code> (ومعه <code>onBlurDebounceMs</code> لحدث الخروج من الحقل). ضبط <code>onChangeDebounceMs: 500</code> يعني ألّا تُنفَّذ الدالة إلا إذا توقّف المستخدم عن الكتابة نصف ثانية؛ فإن عاد وكتب قبل انقضاء المدّة بدأ العدّ من جديد. المدّة تُختار بحسب العمل: حساب محلي سريع لا يحتاج تأخيرًا، وطلب شبكة يحتاج نصف ثانية أو أكثر.</p>
<p>هذه الخيارات لا ترد في شيفرة الفرع لأنه لا يرسل طلبات، لكنها تعمل مع المستمع نفسه الذي كتبناه، وتُضاف إلى الكائن بجانب <code>onChange</code>.</p>
<h3 id="المستمعات-على-مستوى-الاستمارة">المستمعات على مستوى الاستمارة</h3>
<p>المستمع ليس حكرًا على الحقول. يمكن تمريره داخل <code>useForm</code> نفسه، وحينها يُنفَّذ عند تغيّر أي حقل في الاستمارة:</p>
<pre><code class="language-tsx">  <span class="hljs-keyword">const</span> form = <span class="hljs-title function_">useForm</span>({
    ...formOpts,
    <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value);
    },
    <span class="hljs-attr">listeners</span>: {
      <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ formApi, fieldApi }</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(formApi, fieldApi);
      },
    },
  });
</code></pre>
<p>الدالة هنا تستقبل شيئين لا شيئًا واحدًا: <code>formApi</code> واجهة الاستمارة كاملة، و<code>fieldApi</code> الحقل الذي أطلق التغيير. اكتب في الاسم الأول ثم افتح وحدة التحكّم (<code>console</code>) واكتب في الاسم الأخير: الكائن الأول يبقى هو نفسه، والثاني يتبدّل اسمه مع الحقل الذي غيّرته. هذا هو الفرق العملي بين المستويين: مستمع الحقل يعرف حقلًا واحدًا ولا يعرف غيره، ومستمع الاستمارة يعرف الاستمارة كلها ويعرف أيضًا من أزعجها.</p>
<p>المستمع على مستوى الاستمارة أداة تشخيص قوية، لكنه يعمل عند كل ضغطة مفتاح، وطباعة كائن كامل في كل ضغطة تجعل الكتابة ثقيلة. هو للسؤال «أي حقل تغيّر الآن؟»، ويُزال بعد أن تُجب عنه.</p>
<h3 id="أي-أداة-تختار">أيّ أداة تختار؟</h3>
<ul>
<li>تقرأ قيمة داخل منطق المكوّن أو تحسب منها شيئًا: <code>useStore</code> مع دالة اختيار تقتطع ما تحتاجه.</li>
<li>تعرض أو تخفي جزءًا من الواجهة بناءً على قيمة: <code>form.Subscribe</code>.</li>
<li>تنفّذ فعلًا عند تغيّر قيمة: مستمع على الحقل، أو على الاستمارة إن كنت تريد متابعة الجميع.</li>
<li>داخل دالة تصيير <code>form.Field</code> لا تحتاج اشتراكًا لقيمة الحقل نفسه؛ المكوّن مشترك فيها أصلًا ويعيد التصيير عند تغيّر قيمته وبياناته. الاشتراك يلزم للحالة الأخرى، أي حالة الاستمارة.</li>
</ul>
<p>ملاحظة على التسمية: صدرت المكتبة وفيها <code>useStore</code>، ثم صار التوثيق يسمّي الخُطّاف نفسه <code>useSelector</code> ويُبقي <code>useStore</code> اسمًا قديمًا مدعومًا. الفرع مكتوب بالاسم الأول، والدالتان تُستدعيان بالطريقة نفسها: المخزن أولًا ثم دالة الاختيار.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--reactivity-and-listeners--listeners.png" alt="استمارة التسجيل بعد الدرس: كتلة  أعلى الصفحة تعرض كل القيم وفيه الاسم الأول والاسم الأخير، يليها حقل الاسم الأول في التركيز وحقل الاسم الأخير وزر "></p>
<p>في الصورة ترى الكتلة العليا مملوءة على غير ما كانت في الدرس السابق: <code>firstName</code> يحمل <code>&quot;Zayd A.&quot;</code>، و<code>lastName</code> يحمل <code>&quot;Ali&quot;</code>، وبقية الحقول فارغة كما هي في القيم الافتراضية، والكائن المتداخل <code>address</code> ظاهر بمفاتيحه الأربعة، و<code>skills</code> مصفوفة فارغة، و<code>acceptTerms</code> كاذبة. تحت الكتلة حقلان: الاسم الأول بإطاره الأزرق لأنه في التركيز، والاسم الأخير، ثم زر <code>Submit</code>.</p>
<p>الحقلان معًا هما أثر <code>form.Subscribe</code>: ظهر الثاني لأن الأول غير فارغ. والكتلة العليا هي أثر <code>useStore</code>: كل ما تكتبه يمرّ في الحالة ويُعاد تصييرها فورًا. جرّب أن تمسح الاسم الأول: يختفي الحقل الثاني، ويُمسح الاسم الأخير من الكتلة في اللحظة نفسها لأن المستمع كتب فيه سلسلة فارغة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>احذف دالة الاختيار من <code>useStore</code> واترك <code>form.store</code> وحدها، ثم أضف عدّادًا يزيد عند كل تصيير. اكتب حرفًا واحدًا ثم اخرج من الحقل: سترى العدّاد يزيد حتى حين لم تتغيّر أي قيمة، وهذا ثمن الاشتراك في المخزن كله.</li>
<li>امسح الاسم الأول ثم أعِد كتابته. لاحظ أن الاسم الأخير لا يعود، لأن المستمع أفرغه. ثم علّق كائن <code>listeners</code> وأعِد التجربة: سيختفي الحقل ويبقى الاسم محفوظًا ويعود عند الكتابة، وهذا هو الفرق بين الإخفاء والمحو.</li>
<li>أضف <code>onChangeDebounceMs: 500</code> إلى مستمعات حقل الاسم الأول، وضع <code>console.log(value)</code> داخل <code>onChange</code>، ثم اكتب بسرعة. لن تُطبع إلا القيمة الأخيرة بعد توقّفك.</li>
<li>افتح مستمع الاستمارة واطبع <code>fieldApi.name</code> بدل الكائن كله، واكتب في الحقلين. سترى الاسمين يتبادلان مع الحقل الذي تغيّر، وهو ما يثبت أن المستمع يصل إلى الحقل الذي أطلق الحدث.</li>
<li>استبدل <code>useStore</code> بـ<code>form.Subscribe</code> حول كتلة <code>pre</code> نفسها، واجعل دالة الاختيار تعيد <code>state.values</code>. الناتج واحد، لكن إعادة التصيير تبقى محصورة في المكوّن المشترك بدل المكوّن كله.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=1220s">فيديو الدرس: Reactivity &amp; Listeners</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/reactivity-and-listeners">شيفرة الدرس: فرع reactivity-and-listeners</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/reactivity">التوثيق الرسمي: التفاعلية والاشتراك في حالة الاستمارة</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/listeners">التوثيق الرسمي: المستمعات وتأخير تنفيذها</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Reactivity &amp; Listeners» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما أضافه المعدّ من توضيح أو ربط بالتوثيق لا يُنسب إلى المؤلف.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:e,slug:n,title:t,headings:l,html:o};export{s as book,a as chapter,e as chapterTitle,c as default,l as headings,o as html,n as slug,t as title};
