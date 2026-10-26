const s="tanstack-form",a="form",e="دورة TanStack Form الكاملة",n="linked-fields",o="الحقول المرتبطة: حقلٌ يتحقّق من قيمة حقلٍ آخر",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"الفكرة-قيمة-حقل-شرط-في-صحة-حقل-آخر",text:"الفكرة: قيمة حقل شرطٌ في صحة حقل آخر"},{depth:3,id:"إضافة-الحقلين-إلى-النوع-والقيم-الافتراضية",text:"إضافة الحقلين إلى النوع والقيم الافتراضية"},{depth:3,id:"إضافة-الحقلين-إلى-الواجهة",text:"إضافة الحقلين إلى الواجهة"},{depth:3,id:"محقق-يقرأ-حقلا-آخر",text:"مُحقِّق يقرأ حقلًا آخر"},{depth:3,id:"الثغرة-التحقق-لا-يعاد-تشغيله",text:"الثغرة: التحقّق لا يُعاد تشغيله"},{depth:3,id:"onchangelistento-إعادة-التشغيل-عند-تغير-حقل-آخر",text:"onChangeListenTo: إعادة التشغيل عند تغيّر حقل آخر"},{depth:3,id:"النظير-عند-الخروج-من-الحقل",text:"النظير عند الخروج من الحقل"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],c=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>كل حقل رأيناه حتى الآن كان يحكم على نفسه: قيمته وحدها تكفي ليقول إن كانت صحيحة. لكن بعض الحقول لا معنى لها منفردة. كلمة السر وتأكيدها المثال الأوضح: الحقل الثاني لا يعرف عن صحّته شيئًا إلا إذا قارن نفسه بالأول. وهذه المقارنة تنقلنا من «تحقّق من الصحة» (validation) داخل الحقل إلى تحقّق بين حقلين.</p>
<p>يسير الدرس في ثلاث خطوات: نضيف الحقلين إلى استمارة التسجيل، ثم نعلّق على <code>confirmPassword</code> مُحقِّقًا (<code>validator</code>) يقرأ قيمة <code>password</code> من واجهة الاستمارة ويُخطئ حين تختلفان. ثم نصطدم بالثغرة الحقيقية: التحقّق المعلَّق على التغيّر لا يعمل إلا عندما يتغيّر الحقل صاحبه، فتعديل كلمة السر الأساسية لا يُعيد تشغيل مُحقِّق التأكيد، ويبقى الحكم قديمًا. الحلّ خيار واحد صغير داخل <code>validators</code>: <code>onChangeListenTo</code>.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="الفكرة-قيمة-حقل-شرط-في-صحة-حقل-آخر">الفكرة: قيمة حقل شرطٌ في صحة حقل آخر</h3>
<p>لدينا في مكوّن الاستمارة <code>RegisterForm</code> — من الدروس السابقة — حقول الاسم والبريد والعنوان والمهارات، وليس فيها كلمة سر ولا تأكيدها. والعلاقة بينهما ليست علاقة عرض بل علاقة تحقّق: <code>confirmPassword</code> صحيح إذا وفقط إذا ساوى <code>password</code>. ولاحظ أنّ الشرط يتغيّر من الجهتين: كتابة حرف في التأكيد تُغيّر حكمه، وكتابة حرف في كلمة السر تُغيّر حكم التأكيد أيضًا، مع أنّ التأكيد لم يُلمس. هذه الجهة الثانية هي التي تفصل الدرس، وسنعود إليها بعد أن نرى الشيفرة تعمل ثم تفشل.</p>
<h3 id="إضافة-الحقلين-إلى-النوع-والقيم-الافتراضية">إضافة الحقلين إلى النوع والقيم الافتراضية</h3>
<p>قبل الواجهة، يلزم أن تعرف الاستمارة الحقلين. نضيفهما إلى واجهة <code>RegisterForm</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RegisterForm</span> {
  <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-built_in">string</span>;
</code></pre>
<p>سطران من نوع <code>string</code>، لا اختلاف عن <code>email</code> و<code>firstName</code>. ثم نضيفهما إلى <code>defaultValues</code> بسلسلة فارغة:</p>
<pre><code class="language-tsx">  <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&quot;&quot;</span>,
</code></pre>
<p>هذه الخطوة ليست شكليّة: <code>TanStack Form</code> يبني أسماء الحقول وأنواع قيمها من هذه الواجهة، فإن عرّفت حقلًا في الواجهة ونسيت قيمته الافتراضية، أو العكس، خرجت الاستمارة بحقل لا قيمة له أو بقيمة لا يعرفها النوع. والقيمة الافتراضية الفارغة أيضًا هي ما يجعل <code>isPristine</code> صحيحة عند فتح الصفحة.</p>
<h3 id="إضافة-الحقلين-إلى-الواجهة">إضافة الحقلين إلى الواجهة</h3>
<p>نضع الحقلين بعد حقل <code>address.street</code>، على غرار ما فعلناه في بقية الحقول. حقل كلمة السر أولًا:</p>
<pre><code class="language-tsx">        &lt;form.<span class="hljs-property">Field</span> name=<span class="hljs-string">&quot;password&quot;</span>&gt;
          {<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-black text-white border border-white p-2 w-full&quot;</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
                <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Password&quot;</span>
                <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{field.handleBlur}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
              /&gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          )}
        &lt;/form.<span class="hljs-property">Field</span>&gt;
</code></pre>
<p>ثلاثة تفاصيل تستحقّ التوقّف. <code>type=&quot;password&quot;</code> يحجب ما يُكتب، وهو كل ما يميّز هذا الحقل عن حقل نصّي. و<code>field.handleChange</code> تمرّر القيمة الجديدة إلى الحالة، فبغيرها لا تعرف الاستمارة أنّ شيئًا كُتب. و<code>onBlur={field.handleBlur}</code> ليست زينة: هي التي تجعل <code>isTouched</code> و<code>isBlurred</code> تنتقلان إلى <code>true</code>، فتعمل أنماط التحقّق التي تعتمد على الخروج من الحقل، ومنها <code>revalidateLogic</code> الذي تضيفه الاستمارة في هذا الفرع:</p>
<pre><code class="language-tsx">    <span class="hljs-attr">validationLogic</span>: <span class="hljs-title function_">revalidateLogic</span>({
      <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;submit&quot;</span>,
      <span class="hljs-attr">modeAfterSubmission</span>: <span class="hljs-string">&quot;blur&quot;</span>,
    }),
</code></pre>
<p>هذا الإعداد يعني أنّ الاستمارة لا تتشدّد في التحقّق قبل أول إرسال، وبعد أول إرسال تنتقل إلى وضع الخروج من الحقل. لذلك قد لا يظهر الخطأ في أول تجربة قبل أن تُرسل الاستمارة أو تخرج من الحقل — وهو ما التبس على المؤلف لحظة فقال إن الأمر «لا يعمل» ثم جدّد الصفحة.</p>
<p>حقل التأكيد هو النسخة الثانية، ومع اختلاف واحد: نعرض تحته رسالة الخطأ كما في بقية الحقول:</p>
<pre><code class="language-tsx">              {!field.<span class="hljs-property">state</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">isValid</span> &amp;&amp; (
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500 mt-2&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
                  {field.state.meta.errors.join(&quot;, &quot;)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
              )}
</code></pre>
<p>الشرط <code>!field.state.meta.isValid</code> يقرأ حكم الحقل على نفسه، و<code>errors.join(&quot;, &quot;)</code> يجمع كل رسائل التحقّق في سطر واحد. و<code>role=&quot;alert&quot;</code> يجعل قارئ الشاشة ينطق الرسالة حين تظهر، لا حين يمرّ عليها المستخدم وحده.</p>
<h3 id="محقق-يقرأ-حقلا-آخر">مُحقِّق يقرأ حقلًا آخر</h3>
<p>هنا جوهر الدرس. نضيف إلى حقل <code>confirmPassword</code> كائن <code>validators</code> فيه دالة <code>onChange</code>:</p>
<pre><code class="language-tsx">          validators={{
            <span class="hljs-attr">onChangeListenTo</span>: [<span class="hljs-string">&quot;password&quot;</span>],
            <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">{ value, fieldApi }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (value !== fieldApi.<span class="hljs-property">form</span>.<span class="hljs-title function_">getFieldValue</span>(<span class="hljs-string">&quot;password&quot;</span>)) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Passwords do not match&quot;</span>;
              }
              <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
          }}
</code></pre>
<p>دالة التحقّق تستقبل كائنًا فيه شيئان: <code>value</code> قيمة الحقل صاحب المُحقِّق، أي ما كُتب في التأكيد، و<code>fieldApi</code> واجهة الحقل نفسه. و<code>value</code> وحدها لا تكفي للمقارنة، فلا بدّ من القيمة الأخرى. وهنا يظهر الفرق بين هذا الدرس ودرس التحقّق على مستوى الحقل: القيمة الأخرى تُقرأ من <code>fieldApi.form</code>، أي واجهة الاستمارة التي ينتمي إليها الحقل، وبواسطة الدالة <code>getFieldValue</code> التي تأخذ اسم أي حقل وتعيد قيمته الحالية. لاحظ أنّنا لم نمرّر قيمة كلمة السر إلى المُحقِّق ولم نُشترِك فيها: الدالة تسأل الاستمارة في لحظة التنفيذ، فتحصل على أحدث قيمة مهما كان مصدرها.</p>
<p>والعائد هو الحكم: سلسلة نصّية تعني خطأً وتُعرض كما هي، و<code>undefined</code> تعني «لا خطأ». ولذلك لا نكتب <code>return true</code> ولا <code>return &quot;&quot;</code> — أي عائد غير معرَّف سيُحسب خطأً. ولمّا كانت المقارنة صارمة بـ<code>!==</code>، فالسلسلتان متساويتان فقط إذا تطابقت حروفهما تمامًا، وهذا هو المطلوب في كلمة السر.</p>
<h3 id="الثغرة-التحقق-لا-يعاد-تشغيله">الثغرة: التحقّق لا يُعاد تشغيله</h3>
<p>احفظ واكتب <code>1234</code> في الحقلين: لا خطأ، لأن القيمتين متساويتان. الآن عُد إلى كلمة السر الأساسية وأضف حرفًا لتصير <code>12345</code>. القيمتان مختلفتان، ومع ذلك لا تظهر الرسالة. السبب ليس خطأً في المقارنة بل في التوقيت: <code>onChange</code> هنا مُعلَّقة على التغيّر في حقل <code>confirmPassword</code> نفسه. ما دام هذا الحقل لم يتغيّر، فمُحقِّقه لا يُنفَّذ أصلًا، فلا يُسأل عن رأيه، ويبقى آخر حكم أصدره — صحيحًا كان أو خطأً — معلَّقًا على الحقل. أي أنّ الخطأ لا يظهر حين يجب، والخطأ المعروض سابقًا لا يزول حين يجب.</p>
<p>وهذه الثغرة أخطر مما تبدو: الحقل قد يبقى <code>isValid</code> صحيحًا والاستمارة <code>canSubmit</code> جاهزة للإرسال، بينما القيمتان مختلفتان فعلًا. أي أنّ البيانات تصل إلى <code>onSubmit</code> وهي مخالفة للشرط الذي كتبناه بأنفسنا.</p>
<h3 id="onchangelistento-إعادة-التشغيل-عند-تغير-حقل-آخر"><code>onChangeListenTo</code>: إعادة التشغيل عند تغيّر حقل آخر</h3>
<p>الحلّ سطر واحد في الكائن نفسه: <code>onChangeListenTo: [&quot;password&quot;]</code>. المعنى الحرفي: «شغّل <code>onChange</code> الخاص بهذا الحقل أيضًا عندما يتغيّر الحقل المسمّى <code>password</code>». وهو مصفوفة لا قيمة واحدة، لأنّ حقلًا واحدًا قد يعتمد على أكثر من حقل؛ تأكيد كلمة السر مثلًا قد يعتمد على كلمة السر وقاعدة طول دنيا تُطبَّق على كلمة السر نفسها، فتُسمّى الحقول كلها في المصفوفة.</p>
<p>الآن تغيير كلمة السر الأساسية يُعيد تنفيذ مُحقِّق التأكيد، فيقرأ عبر <code>getFieldValue</code> القيمة الجديدة، يقارنها، ويُصدر حكمًا محدَّثًا. والخطأ يظهر ويختفي في اللحظة الصحيحة من الجهتين: حين تكتب في التأكيد، وحين تكتب في كلمة السر. لاحظ أنّ المُحقِّق لم يتغيّر حرفًا؛ الذي تغيّر هو متى يُستدعى.</p>
<h3 id="النظير-عند-الخروج-من-الحقل">النظير عند الخروج من الحقل</h3>
<p>المبدأ نفسه موجود لحدث الخروج من الحقل: <code>onBlurListenTo</code>. لو كان تحقّق التأكيد معلَّقًا على <code>onBlur</code> بدل <code>onChange</code>، لاحتجت إلى <code>onBlurListenTo: [&quot;password&quot;]</code> كي يُعاد تشغيله حين يخرج المستخدم من حقل كلمة السر. وبالمنطق ذاته: كل حدث تحقّق له نظيره في الاستماع إلى حقول أخرى.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--linked-fields--mismatch.png" alt="استمارة التسجيل بعد الدرس: كتلة بيانات وصفية أعلى الصفحة، ثم حقلا الاسم الأول و، ثم مدخلان محجوبان لكلمة السر وتأكيدها، وتحتهما رسالة الخطأ الحمراء ، ثم قسم المهارات وزر ، وفي الأسفل كتلة  تطبع القيم"></p>
<p>في الصورة ترى الاستمارة كاملة بعد إضافة الحقلين. أعلى الصفحة كتلة البيانات الوصفية لحقل الاسم الأول، وفيها <code>isValid</code> بقيمة <code>true</code> و<code>errors</code> مصفوفة فارغة. تحتها حقل الاسم الأول فارغًا، ثم <code>Street</code>، ثم المدخلان الجديدان وهما محجوبان كما يليق بكلمة السر. تحت المدخل الثاني ظهرت الرسالة الحمراء <code>Passwords do not match</code>، وفي الكتلة السفلية التي تطبع القيم نقرأ <code>password</code> بقيمة <code>1234567</code> و<code>confirmPassword</code> بقيمة <code>7654321</code>.</p>
<p>المهم في هذه الصورة أنّ التركيز لم يكن على حقل التأكيد حين ظهر الخطأ: القيمتان مختلفتان، والرسالة معروضة، وهذا بالضبط ما كان مستحيلًا قبل <code>onChangeListenTo</code>. ثم تكمل الاستمارة بقية عناصرها: مهارات HTML وCSS وJavaScript على المستوى <code>beginner</code> مع أزرار الحذف، وزر <code>Add Skill</code>، ومربّع <code>Accept Terms</code> غير المحدَّد، وزر <code>Submit</code>، وهو ظاهر بلونه الفعّال؛ فحسب التوثيق تبقى <code>canSubmit</code> صحيحة حتى تُلمس الاستمارة، فلا يتوقّف الإرسال بمجرّد ظهور رسالة في حقل.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>احذف <code>onChangeListenTo</code> من كائن <code>validators</code>، ثم اكتب كلمة سر متطابقة في الحقلين، وبعدها غيّر كلمة السر الأساسية وحدها. لن تظهر الرسالة، مع أنّ القيمتين مختلفتان. أعِد السطر ثم كرّر التجربة لتقارن.</li>
<li>أضف إلى <code>onChange</code> شرطًا ثانيًا: ألّا يقلّ طول كلمة السر عن ثمانية أحرف، وأعِد رسالة مناسبة. راقب أيّ الرسالتين تظهر، ثم فكّر لماذا يكفي ترتيب الفحص مع <code>return</code> مبكر واحد بدل تداخل الشروط.</li>
<li>غيّر <code>onChange</code> في حقل التأكيد إلى <code>onBlur</code>، وأضف <code>onBlurListenTo: [&quot;password&quot;]</code> بدل <code>onChangeListenTo</code>. ستلاحظ أنّ الرسالة لم تعد تظهر أثناء الكتابة، بل بعد الخروج من الحقل.</li>
<li>اطبع <code>fieldApi.form.getFieldValue(&quot;password&quot;)</code> داخل المُحقِّق واكتب في حقل كلمة السر. سترى القيمة الجديدة تصل إلى المُحقِّق بدون أن تلمس التأكيد، وهو الدليل على أنّ القراءة تحدث في لحظة التنفيذ لا في لحظة التصيير.</li>
<li>أضف حقل <code>username</code> واجعل تأكيد كلمة السر يعتمد عليه أيضًا بمقارنة بسيطة، ثم أضف اسمه إلى المصفوفة: <code>onChangeListenTo: [&quot;password&quot;, &quot;username&quot;]</code>.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=4147s">فيديو الدرس: Linked Fields</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/validation-5">شيفرة الدرس: فرع validation-5</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/linked-fields">التوثيق الرسمي: ربط حقلين في TanStack Form</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/validation">التوثيق الرسمي: التحقّق على مستوى الحقل والاستمارة</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Linked Fields» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما أضافه المعدّ من توضيح أو ربط بالتوثيق لا يُنسب إلى المؤلف.</p>
</blockquote>
`,d={book:s,chapter:a,chapterTitle:e,slug:n,title:o,headings:t,html:c};export{s as book,a as chapter,e as chapterTitle,d as default,t as headings,c as html,n as slug,o as title};
