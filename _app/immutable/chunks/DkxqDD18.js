const s="tanstack-form",a="form",n="دورة TanStack Form الكاملة",e="async-validations",t="التحقّق غير المتزامن من الصحة (Async Validations)",l=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"قاعدة-لا-تعرف-جوابها-بنفسها",text:"قاعدة لا تعرف جوابها بنفسها"},{depth:3,id:"المحققان-معا-من-يعمل-أولا",text:"المحقّقان معًا: من يعمل أولًا؟"},{depth:3,id:"الثمن-طلب-مع-كل-حرف",text:"الثمن: طلب مع كل حرف"},{depth:3,id:"الفجوة-التي-يكشفها-isvalidating",text:"الفجوة التي يكشفها isValidating"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>معظم قواعد التحقّق من الصحة (validation) تحكم على قيمة بين يديك: طولها، أو شكلها، أو مساواتها لقيمة أخرى. لكن ثمّة أسئلة لا يملك المتصفّح جوابها أصلًا، لأن الجواب عند الخادم وحده: هل هذا الاسم مستخدم من قبل؟ هل هذا البريد مسجّل؟ لا سبيل إلى معرفة ذلك إلا بطلب شبكة يخرج ويعود.</p>
<p>في هذا الدرس نضيف إلى حقل الاسم الأول محقّقًا غير متزامن ينتظر جوابًا قبل أن يحكم، ونرى كيف يجتمع مع المحقّق المتزامن في الكائن نفسه. ثم نواجه المشكلة التي يخلقها ذلك: كل ضغطة مفتاح صارت طلبًا إلى الخادم. فنحلّها بالتهدئة، أي تأخير الطلب حتى تسكن الكتابة. وننتهي إلى الحالة التي لم نرها في الدروس السابقة: فترة يقف فيها الحقل بين «لا خطأ» و«لا تأكيد»، ويخبرنا عنها علم جديد في بيانات الحقل الوصفية.</p>
<p>الفكرة التي يثبتها الدرس أنّ التوقيت ليس تفصيلًا في التحقّق غير المتزامن، بل هو نصف الحل: متى نرسل الطلب، وماذا نعرض حتى يعود.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="قاعدة-لا-تعرف-جوابها-بنفسها">قاعدة لا تعرف جوابها بنفسها</h3>
<p>كل ما بنيناه حتى الآن كان دالة تُستدعى فورًا وتُعيد نتيجة في اللحظة نفسها. المحقّق غير المتزامن يختلف في شيء واحد فقط: بدل أن يُعيد الرسالة، يُعيد وعدًا (promise) يحمل الرسالة لاحقًا. وباقي العقد كما هو: إن أعاد نصًّا فهو خطأ، وإن انتهى دون أن يُعيد شيئًا فقد مرّت القاعدة.</p>
<p>هذا هو المحقّق الجديد على حقل <code>firstName</code> في فرع الدرس:</p>
<pre><code class="language-tsx">            <span class="hljs-attr">onChangeAsync</span>: <span class="hljs-title function_">async</span> ({ value }) =&gt; {
              <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;https://jsonplaceholder.typicode.com/todos/1&quot;</span>);
              <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">2000</span>));
              <span class="hljs-keyword">if</span> (value !== <span class="hljs-string">&quot;John&quot;</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Your name must be John.&quot;</span>;
              }
            },
</code></pre>
<p>السطران الأولان ليسا جزءًا من القاعدة، بل محاكاة لما ستفعله فعلًا. <code>fetch</code> إلى <code>jsonplaceholder.typicode.com</code> يقف مكان الطلب الحقيقي إلى خادمك، والوعد الذي ينتظر ألفي مللي ثانية يقف مكان زمن الشبكة الذي لا تتحكّم فيه. الدروس لا تحتاج خادمًا حقيقيًا كي تُظهر المشكلة: المهم أن الجواب يتأخّر، وأن الواجهة يجب أن تتصرف خلال هذا التأخير.</p>
<p>والقاعدة نفسها تعسّفية عن قصد: الاسم يجب أن يكون <code>John</code>. لو كان لدينا خادم حقيقي لكان السؤال «هل الاسم متاح؟»، ولَما اختلف شيء في الشيفرة: المحقّق ينتظر الجواب من أيّ مصدر، ثم يُعيد رسالة أو لا يُعيد. ورسالة الخطأ تصل إلى <code>meta.errors</code> كما تصل رسالة المحقّق المتزامن تمامًا، فالفرق في الزمن لا في المكان.</p>
<p>وما تراه على مستوى الحقل يمكن إعلانه على مستوى الاستمارة أيضًا، لكن الفرع يبقى على مستوى الحقل لأن الحقل هو صاحب القاعدة هنا.</p>
<h3 id="المحققان-معا-من-يعمل-أولا">المحقّقان معًا: من يعمل أولًا؟</h3>
<p>قد يبدو أن وجود محقّق غير متزامن يعني التخلّي عن المتزامن، والحقيقة أن أنسب استعمال هو جمعهما. نضع في كائن <code>validators</code> محقّقين على الحقل نفسه، وبينهما مفتاح التهدئة:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span>
          name=<span class="hljs-string">&quot;firstName&quot;</span>
          validators={{
            <span class="hljs-attr">onChangeAsyncDebounceMs</span>: <span class="hljs-number">500</span>,
            <span class="hljs-attr">onChangeAsync</span>: <span class="hljs-title function_">async</span> ({ value }) =&gt; {
              <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;https://jsonplaceholder.typicode.com/todos/1&quot;</span>);
              <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">2000</span>));
              <span class="hljs-keyword">if</span> (value !== <span class="hljs-string">&quot;John&quot;</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Your name must be John.&quot;</span>;
              }
            },
            <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (value.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;First name must be at least 2 characters&quot;</span>;
              }
            },
          }}
</code></pre>
<p>لاحظ الترتيب الذي كُتبت به المفاتيح: <code>onChangeAsyncDebounceMs</code> ثم <code>onChangeAsync</code> ثم <code>onChange</code>. هذا الترتيب لا يعني شيئًا في وقت التشغيل؛ ترتيب الخصائص في كائن JavaScript لا يحدّد ترتيب تنفيذها. المكتبة تُشغّل المحقّق المتزامن أولًا دائمًا، ثم تنظر في نتيجته قبل أن تقرّر هل تُشغّل غير المتزامن.</p>
<p>وهذا القرار هو السلوك الافتراضي: إن أعاد <code>onChange</code> رسالة، توقّف كل شيء عندها، ولم يُرسل طلب الشبكة إطلاقًا. الفائدة مباشرة: مستخدم يكتب حرفًا واحدًا يُردّ محليًا في أجزاء من المللي ثانية، ولا يُكلّف خادمك سؤالًا عن قيمة يعرف المتصفّح أنها غير صالحة. جرّب ذلك وأنت تنظر إلى لوحة الشبكة في أدوات المطوّر: لا طلب ما دام الخطأ موجودًا، وما إن يكتمل الطول حتى يظهر الطلب.</p>
<p>ومن أراد عكس هذا السلوك، أي أن يعمل غير المتزامن ولو فشل المتزامن، مرّر الخيار <code>asyncAlways</code> بالقيمة <code>true</code>. لم يستعمله الفرع، وقد صرّح المؤلف بأنه يُبقي الافتراضي: لا معنى لسؤال الخادم عن قيمة نعرف أنها مرفوضة. لكن معرفة وجود الخيار تفيدك حين تريد جمع كل الأخطاء معًا في عرض واحد بدل العرض التدريجي.</p>
<p>وحين يفشل الاثنان معًا فالأخطاء تتجمّع كما تعوّدت: مصفوفة <code>errors</code> تحمل الرسالتين، وخريطة <code>errorMap</code> تحمل كل واحدة تحت مفتاحها، أي <code>onChange</code> و<code>onChangeAsync</code>.</p>
<h3 id="الثمن-طلب-مع-كل-حرف">الثمن: طلب مع كل حرف</h3>
<p>بمجرد أن يعمل المحقّق غير المتزامن على <code>onChange</code>، صار كل حرف تكتبه نداءً للشبكة. اكتب اسمًا من ستة أحرف وسترسل ستة طلبات، خمسة منها عن قيم سيتجاوزها المستخدم بعد أجزاء من الثانية. لا خادم يحبّ هذا، ولا مستخدم ينتفع به، والنتيجة الأسوأ أن الأجوبة قد تعود بترتيب مختلف فتظهر رسالة عن قيمة لم تعد موجودة في الحقل.</p>
<p>الحلّ هو التهدئة: لا تُرسل الطلب فور التغيير، بل انتظر حتى يسكن المستخدم عن الكتابة مدةً محدّدة، ثم افحص آخر قيمة وحدها. نضيف إلى كائن <code>validators</code> مفتاحًا عدديًا بجانب المحقّق:</p>
<pre><code class="language-tsx">          validators={{
            <span class="hljs-attr">onChangeAsyncDebounceMs</span>: <span class="hljs-number">500</span>,
</code></pre>
<p>الاسم نفسه يحمل معناه: المدة بالملي ثانية، والمفتاح الذي تُطبَّق عليه. بعد هذا السطر، الكتابة السريعة لا ترسل شيئًا، وحين تتوقّف نصف ثانية ينطلق طلب واحد عن القيمة النهائية.</p>
<p>وللتحكّم في التهدئة مستويان. المستوى الأعمّ هو الخيار الذي يُمرَّر إلى الحقل نفسه، ويُطبَّق على كل محقّق غير متزامن فيه، فيكفيك سطر واحد حين تريد سياسة موحّدة لكل الأحداث. والمستوى الأدقّ هو المفتاح الذي استعمله الفرع، <code>onChangeAsyncDebounceMs</code>، ويخصّ <code>onChangeAsync</code> وحده ويلغي ما فوقه. وإذا أضفت لاحقًا <code>onBlurAsync</code> فسيرث مدة الحقل العامة لا مدة <code>onChange</code>، وهذا هو معنى «تخصيص أدقّ»، لا «إلغاء».</p>
<p>انتبه إلى أنّ التهدئة تخصّ المحقّقات غير المتزامنة وحدها. محقّق الطول المتزامن ما زال يعمل مع كل ضغطة مفتاح، ولذلك يظهر خطأ «حرفان على الأقل» أثناء الكتابة فورًا، بينما ينتظر خطأ الشبكة نصف ثانية ثم ألفي مللي ثانية أخرى. هذا التفاوت في السرعة طبيعي ومقصود: الرخيص يُحسب دائمًا، والغالي يُؤجَّل.</p>
<h3 id="الفجوة-التي-يكشفها-isvalidating">الفجوة التي يكشفها <code>isValidating</code></h3>
<p>بقيت لحظة لم نتكلّم عنها: بين أن يمرّ المحقّق المتزامن وأن يعود جواب الشبكة، ماذا تعرف الواجهة؟ لا خطأ بعد، ولا تأكيد بالصحة. هذه الفجوة هي التي تُفسد الثقة في الاستمارة إن تركتها صامتة: المستخدم يكتب قيمة مرفوضة، فلا يرى شيئًا، فيظنّ أنها قُبلت.</p>
<p>يُخرج الفرع الحالة إلى الشاشة عبر طباعة بيانات الحقل التي عرفناها في درس سابق، إلى جانب حقل الإدخال ومنطقة الخطأ:</p>
<pre><code class="language-tsx">              &lt;div className=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{JSON.stringify(field.state.meta, null, 2)}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span></span>
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
                  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;First Name&quot;</span>
                  <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                  <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                /&gt;</span>
                {!field.<span class="hljs-property">state</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">isValid</span> &amp;&amp; (
                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 mt-2&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
                    {field.state.meta.errors.join(&quot;, &quot;)}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                )}
              &lt;/div&gt;
</code></pre>
<p>في الكتلة المطبوعة يظهر علم لم نره قبلًا: <code>isValidating</code>. يكون <code>true</code> ما دام في الحقل تحقّق غير متزامن جارٍ، وينقلب <code>false</code> بمجرّد أن يصل الجواب، سواء كان خطأً أو مرورًا. وإلى جانبه عدّاد داخلي <code>_pendingValidationsCount</code> يخبرك كم تحقّقًا ما زال معلّقًا، وهو أدقّ من العلم وحده حين تتراكب طلبات.</p>
<p>هذا العلم هو المادة الخام لأيّ مؤشّر انتظار: دوّار صغير بجانب الحقل، أو تعطيل زرّ الإرسال، أو نصّ «جارٍ التحقّق…» تحت الإدخال. المهم أن يرى المستخدم أن للاستمارة رأيًا لم يصل بعد، لا أن يبقى أمامه فراغ يفسّره على أنه موافقة.</p>
<p>وفي الصورة التالية من الفرع ترى الفجوة نفسها موثّقة: <code>isValidating</code> صحيحة، و<code>isValid</code> ما زالت صحيحة أيضًا، و<code>errors</code> فارغة، لأن المحقّق المتزامن مرّ ولم يعد جواب الشبكة. أي أنّ <code>isValid</code> وحدها ليست إجابة نهائية ما دام <code>isValidating</code> صحيحة؛ إن أردت شرطًا يعبّر عن «الحقل سليم ومؤكَّد» فاجمع العلمين، ولا تكتفِ بالأول.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--async-validations--async-error.png" alt="كتلة بيانات حقل الاسم الأول وفيها  صحيحة و فارغة وعدّاد التحقّق المعلّق يساوي واحدًا، وتحتها حقل الاسم الأول وفيه كلمة ، ثم بقية الحقول وزرّ الإرسال وكتلة القيم"></p>
<p>في أعلى الصورة كتلة بيانات الحقل مطبوعة: <code>isValidating</code> صحيحة، و<code>_pendingValidationsCount</code> تساوي واحدًا، و<code>errors</code> مصفوفة فارغة، و<code>isValid</code> صحيحة، وأعلام التفاعل <code>isTouched</code> و<code>isBlurred</code> و<code>isDirty</code> كلها صحيحة. وتحتها مباشرة حقل الاسم الأول وفيه <code>Ali</code>: لا خطأ أحمر تحت الحقل، لأنه لا خطأ بعد؛ الطلب في طريقه والجواب لم يصل.</p>
<p>ثم بقية حقول الاستمارة كما هي في هذا الفرع: حقل الاسم الأخير وقد ظهر لأن الاسم الأول غير فارغ، والشارع، والمهارات الثلاث بمستواها الافتراضي، وزرّ إضافة مهارة، ومربّع الشروط غير المحدّد، وزرّ الإرسال. وأسفل الصفحة كتلة القيم، وفيها <code>firstName</code> بالقيمة <code>Ali</code> نفسها.</p>
<p>هذه هي الصورة التي يريد الدرس أن تُثبتها: غياب رسالة الخطأ لا يعني الصحّة دائمًا. في هذه اللحظة بالذات يمرّ حقل <code>Ali</code> نحو الخطأ، و<code>isValidating</code> هي الوحيدة التي تعرف ذلك.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>اكتب حرفًا واحدًا وابقَ في الحقل: لن يخرج أيّ طلب، لأن المحقّق المتزامن ردّ القيمة قبل أن يصل غير المتزامن. أكمل الحرف الثاني فترى الطلب يظهر في لوحة الشبكة.</li>
<li>احذف <code>onChangeAsyncDebounceMs</code> ثم اكتب ستة أحرف بسرعة، وعدّ الطلبات في لوحة الشبكة. أعد المفتاح بقيمة <code>1500</code> وكرّر: يبقى طلب واحد عن القيمة الأخيرة.</li>
<li>انقل التهدئة إلى مستوى الحقل بحذف المفتاح الحالي وإضافة الخيار العام إلى <code>form.Field</code> نفسه، ثم أضف <code>onBlurAsync</code> واختبر متى ينطلق: يرث المدة العامة لا مدة <code>onChangeAsync</code>.</li>
<li>أضف مؤشّر انتظار يعتمد على العلم الجديد، مثل <code>{field.state.meta.isValidating &amp;&amp; &lt;span&gt;…&lt;/span&gt;}</code> بعد حقل الإدخال، وراقبه يظهر ألفي مللي ثانية ثم يختفي.</li>
<li>اكتب <code>John</code> ثم <code>john</code>. الأول يمرّ والثاني يُرفض، لأن القاعدة تفحص المساواة الحرفية؛ وهذا تذكير بأن الرسالة وشروطها من عندك، لا من عند المكتبة.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=3659s">فيديو الدرس: Async Validations</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/validation-3">شيفرة الدرس: فرع validation-3</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/validation">التوثيق الرسمي: التحقّق من صحة الاستمارات والحقول، وفيه قسم التحقّق غير المتزامن</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Async Validations» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما أضافه المعدّ من توضيح لا يُنسب إلى المؤلف.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,o as html,e as slug,t as title};
