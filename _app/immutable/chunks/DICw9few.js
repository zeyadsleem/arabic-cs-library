const s="tanstack-form",a="form",n="دورة TanStack Form الكاملة",l="breaking-forms-into-smaller-pieces-with-withform-hoc",e="تجزئة النموذج إلى أجزاء أصغر باستخدام `withForm`",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"ما-هو-المكون-الأعلى-رتبة",text:"ما هو المكوّن الأعلى رتبة؟"},{depth:2,id:"نقل-قسم-المهارات",text:"نقل قسم المهارات"},{depth:2,id:"استعمال-القسم-داخل-النموذج",text:"استعمال القسم داخل النموذج"},{depth:2,id:"ما-تغير-فعلا-وما-لم-يتغير",text:"ما تغيّر فعلًا وما لم يتغيّر"},{depth:2,id:"تفصيل-صغير-يستحق-الملاحظة",text:"تفصيل صغير يستحقّ الملاحظة"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>بعد أن نقلنا مكوّنات الحقول وزرّي الإرسال إلى سجلّات مركزية، صار ملفّ النموذج أقصر، لكنّه ما زال يحوي كل الحقول واحدًا خلف الآخر. قسم المهارات وحده يستهلك نحو ثمانين سطرًا: حلقة على القيم، وحقل فرعي لكل مهارة، وزر إزالة، وزر إضافة. وجود هذا كله في ملفّ الشاشة الرئيسية يجعل قراءة النموذج مشوّشة، ويجعل تعديل قسم واحد يمرّ عبر ملفّ لا يخصّه.</p>
<p>يقدّم <code>createFormHook</code> في TanStack Form أداة لهذه الحالة: <code>withForm</code>. هي دالة تُغلِّف مكوّنًا وتمنحه النموذج خاصيةً جاهزة مع أنواع صحيحة، فنستطيع نقل قسم كامل إلى ملفّه مع بقائه جزءًا من النموذج نفسه. في هذا الدرس ننقل قسم المهارات إلى <code>RegisterSkills.tsx</code>، ونسجّله في النموذج كأنّه حقل واحد، ثم نميّز بدقّة ما يفعله هذا الغلاف وما لا يفعله.</p>
<h2 id="ما-هو-المكون-الأعلى-رتبة">ما هو المكوّن الأعلى رتبة؟</h2>
<p>قبل الشيفرة، مصطلح يستحقّ التوضيح. المكوّن الأعلى رتبة <code>higher order component</code> دالة تأخذ مكوّنًا وتُعيد مكوّنًا آخر يغلّفه ويزوّده بخصائص إضافية. هذا النمط قديم في React، وقد كان الطريقة السائدة قبل الخطّافات لتمرير سلوك مشترك. وهنا يعمل بالاتجاه المعاكس للقلق المعتاد: بدلًا من تمرير بيانات من الأعلى إلى الأسفل يدويًّا، تمنحك <code>withForm</code> مكوّنًا يعرف كيف يحصل على النموذج من الخارج الذي مَرَّره هو.</p>
<p>النتيجة العملية بسيطة: تكتب قسمًا كأنّه مكوّن مستقل، وتحصل داخله على <code>form</code> كامل الأنواع، دون أن تمرّر حقلًا حقلًا ولا أن تعيد تعريف الأنواع.</p>
<h2 id="نقل-قسم-المهارات">نقل قسم المهارات</h2>
<p>الملفّ الجديد يسكن بجوار النموذج في المجلد نفسه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { withForm } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/hooks/form&quot;</span>;
<span class="hljs-keyword">import</span> { registerFormOpts } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./shared&quot;</span>;
<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">FieldDescription</span>,
  <span class="hljs-title class_">FieldGroup</span>,
  <span class="hljs-title class_">FieldLegend</span>,
  <span class="hljs-title class_">FieldSet</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/components/ui/field&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/components/ui/button&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">RegisterSkills</span> = <span class="hljs-title function_">withForm</span>({
  ...registerFormOpts,
  <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params">{ form }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form.AppField</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;skills&quot;</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">&quot;array&quot;</span>&gt;</span>
        {(field) =&gt; {
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">FieldSet</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">FieldLegend</span>&gt;</span>Skills<span class="hljs-tag">&lt;/<span class="hljs-name">FieldLegend</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">FieldDescription</span>&gt;</span>Your skills and expertise.<span class="hljs-tag">&lt;/<span class="hljs-name">FieldDescription</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">FieldGroup</span>&gt;</span>
                {field.state.value.map((skill, index) =&gt; {
                  return (
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{skill.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-4 bg-gray-900 rounded&quot;</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 font-bold&quot;</span>&gt;</span>{skill.name}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">form.AppField</span>
                        <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>
                        <span class="hljs-attr">name</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">skills</span>[\${<span class="hljs-attr">index</span>}]<span class="hljs-attr">.level</span>\`}
                      &gt;</span>
                        {(subField) =&gt; {
                          return (
                            <span class="hljs-tag">&lt;<span class="hljs-name">subField.Select</span>
                              <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Skill Level&quot;</span>
                              <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">skills-</span>\${<span class="hljs-attr">index</span>}<span class="hljs-attr">-level</span>\`}
                            /&gt;</span>
                          );
                        }}
                      <span class="hljs-tag">&lt;/<span class="hljs-name">form.AppField</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
                        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-2&quot;</span>
                        <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;destructive&quot;</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span>
                        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> field.removeValue(index)}
                      &gt;
                        Remove
                      <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  );
                })}
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span>
                    field.pushValue({
                      name: \`New Skill \${field.state.value.length + 1}\`,
                      id: crypto.randomUUID(),
                      level: &quot;beginner&quot;,
                    })
                  }
                  variant=&quot;secondary&quot;
                  type=&quot;button&quot;
                &gt;
                  Add Skill
                <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">FieldGroup</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">FieldSet</span>&gt;</span>
          );
        }}
      <span class="hljs-tag">&lt;/<span class="hljs-name">form.AppField</span>&gt;</span></span>
    );
  },
});
</code></pre>
<p>لنقرأ هذا الملفّ ببطء، ففيه ثلاث طبقات مختلفة:</p>
<p>الأولى هي <code>withForm</code> نفسه، ويأخذ كائنًا فيه <code>...registerFormOpts</code> ثم <code>render</code>. بسط خيارات النموذج هنا ليس تكرارًا عبثيًّا: هو ما يمنح <code>form</code> داخل <code>render</code> نوعه الكامل، فيعرف المحرّر أنّ <code>skills</code> مصفوفة وأنّ لكل عنصر <code>name</code> و<code>id</code> و<code>level</code>، ويرفض أي اسم حقل غير موجود. لاحظ أنّ هذه الخيارات لا تنشئ نموذجًا ثانيًا؛ النموذج الحقيقي يأتي من الخارج، وهذه الخيارات تُقرأ للأنواع لا للقيم.</p>
<p>الثانية هي <code>render</code>، وهي دالة استدعاء عكسي <code>render prop</code> تُستدعى بالمكوّن <code>form</code>. هذا هو الموضع الوحيد الذي يتاح فيه الوصول إلى النموذج، وكل ما تكتبه بعده هو <code>JSX</code> عادي. وجود <code>render</code> بدل أن يكون المكوّن نفسه هو ما يعطينا الحرية: الغلاف يملك الاتصال بالنموذج، وأنت تملك الشكل.</p>
<p>الثالثة هي جسم القسم، وهو المنسوخ حرفيًّا من الملفّ القديم: <code>&lt;form.AppField name=&quot;skills&quot; mode=&quot;array&quot;&gt;</code>، ثم الحلقة، ثم الحقل الفرعي <code>skills[\${index}].level</code>، ثم الإزالة والإضافة. لم يتغيّر منه حرف واحد. هذه أهمّ ملاحظة في الدرس: النقل لم يكن إعادة كتابة، بل قصّ ولصق مع إحاطة. ولهذا فإن أي خطأ يظهر بعد النقل سيكون خطأ في الحدود لا في المنطق.</p>
<p>انتبه إلى أنّ <code>form.AppField</code> يعمل داخل هذا الملفّ رغم أنّ <code>&lt;form.AppForm&gt;</code> في الملفّ الآخر. السبب أنّ <code>withForm</code> يوفّر السياقات التي يحتاجها <code>AppField</code> للمكوّن الذي يلفّه، فلا تحتاج إلى إضافة غلاف آخر. هذا هو الفرق بين «حصلت على النموذج» و«حصلت على السياق»: الغلاف يمنحك الاثنين معًا.</p>
<h2 id="استعمال-القسم-داخل-النموذج">استعمال القسم داخل النموذج</h2>
<p>في الملفّ الرئيسي، يبقى كل شيء كما هو إلّا موضع القسم. الاستيراد يُضاف:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { useAppForm } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/hooks/form&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RegisterSkills</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./RegisterSkills&quot;</span>;
</code></pre>
<p>ثم يُستبدل القسم كاملًا بسطر واحد داخل <code>FieldGroup</code>:</p>
<pre><code class="language-tsx">            &lt;<span class="hljs-title class_">RegisterSkills</span> form={form} /&gt;

            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form.AppField</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;acceptTerms&quot;</span>&gt;</span>
</span></code></pre>
<p>الخاصية <code>form</code> إلزامية، وهي الجسر بين النموذج والقسم. نوعها مشتقّ من <code>useAppForm</code>، فإن أخطأت في اسم نموذج آخر أو مرّرت كائنًا ناقصًا رفض المحرّر ذلك قبل التشغيل. وموقع السطر مهمّ: بقي بين حقل تأكيد كلمة المرور وحقل الموافقة على الشروط، أي في الموضع نفسه الذي كان يشغله القسم، فلم يتغيّر ترتيب الحقول ولا شكل الصفحة.</p>
<h2 id="ما-تغير-فعلا-وما-لم-يتغير">ما تغيّر فعلًا وما لم يتغيّر</h2>
<p>هذا التمييز ضروري لأنّ كلمة «تجزئة» قد توحي بأنّنا صنعنا نماذج مستقلة:</p>
<ul>
<li>النموذج واحد. لا يوجد <code>useAppForm</code> جديد في <code>RegisterSkills</code>، ولا حالة ثانية، ولا تحقّق ثانٍ. القسم يقرأ ويكتب في النموذج نفسه، ولهذا يظلّ زرّا الحفظ يعرفان <code>canSubmit</code> من الحالة الكلية.</li>
<li>الأنواع واحدة أيضًا، لأنّها مشتقّة من الخيارات المبسوطة نفسها.</li>
<li>ما تغيّر هو توزيع الشيفرة على الملفّات، فصار ملفّ الشاشة يعرض ترتيب الأقسام لا تفاصيلها.</li>
</ul>
<p>ومن هنا تأتي الفائدة الحقيقية: يمكن الآن اختبار قسم المهارات وحده، أو تغييره دون لمس بقية النموذج، أو إعادة استعماله في نموذج آخر يشاركه شكل البيانات. أمّا في نموذج به أقسام كثيرة — العنوان، ثم بيانات الاتصال، ثم المهارات — فالنتيجة ملفّ رئيسي يُقرأ في نصف دقيقة.</p>
<h2 id="تفصيل-صغير-يستحق-الملاحظة">تفصيل صغير يستحقّ الملاحظة</h2>
<p>بعد نقل قسم المهارات، بقي في أعلى الملفّ الرئيسي استيراد أربعة عناصر لم تعد مستعملة فيه: <code>Button</code> و<code>FieldSet</code> و<code>FieldLegend</code> و<code>FieldDescription</code>. الشيفرة في الفرع كما تركها صاحب الدورة، والتشغيل لا يتأثّر بها، لكنّ مترجم TypeScript بإعدادات صارمة يشتكي من المتغيّرات غير المستعملة. لذلك جعلنا تنظيفها تمرينًا، لأنّ الدرس عن الحدود بين الملفّات، والاستيراد الميت أول ما تكشفه هذه الحدود. ولهذا أيضًا لا تنسَ أنّ <code>RegisterSkills</code> صار يملك استيراداته الخاصة، فلا تحذف منها ما تحتاجه.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--breaking-forms-into-smaller-pieces-with-withform-hoc--skills.png" alt="نموذج التسجيل بعد نقل قسم المهارات إلى مكوّن مستقل: أربع بطاقات مهارات إحداها مهارة رابعة أُضيفت بالزر، وفي كل بطاقة قائمة مستوى وزر إزالة، ثم زر إضافة مهارة وزرّا الحفظ"></p>
<p>اللقطة تُظهر أنّ النموذج يعمل كما كان: حقول الاسم واسم العائلة والشارع وكلمة المرور وتأكيدها، ثم قسم المهارات بأربع بطاقات — <code>HTML</code> و<code>CSS</code> و<code>JavaScript</code> والرابعة <code>New Skill 4</code> التي أُضيفت بالضغط على زر الإضافة. في كل بطاقة قائمة المستوى على <code>Beginner</code> وزر إزالة أحمر، ثم زر إضافة مهارة أسفل البطاقات، ثم خانة الموافقة وزرّا الحفظ.</p>
<p>هذه البطاقة الرابعة هي الدليل العملي على أنّ النقل سليم: زر الإضافة يعمل من داخل المكوّن الجديد ويكتب في المصفوفة نفسها، فظهرت البطاقة فورًا في مكانها. لو كان <code>RegisterSkills</code> نموذجًا مستقلًّا لَما ظهرت هذه البطاقة في النموذج الأمّ.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>احذف الاستيرادات الأربعة غير المستعملة من <code>RegisterForm.tsx</code>، وتأكّد من نجاح الترجمة.</li>
<li>انقل حقول العنوان (الشارع والمدينة والرمز البريدي) إلى مكوّن <code>RegisterAddress</code> بالطريقة نفسها، ثم ضعه مكانها.</li>
<li>أضف خاصية إلى قسم المهارات للتحكّم في إظهار الوصف، ومرّرها من النموذج، ولاحظ كيف تتعايش مع الأنواع المشتقّة.</li>
<li>أضف <code>console.log(form.state.values)</code> داخل <code>render</code> مؤقّتًا، ثم اكتب في حقل الاسم ولاحظ كم مرة تُستدعى الدالة.</li>
<li>أعد القسم إلى الملفّ الرئيسي وامسح السطر <code>&lt;RegisterSkills form={form} /&gt;</code>؛ سجّل هل يتغيّر شيء في السلوك أم في حجم الملفّ فقط.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li>شرح الدرس في دورة TanStack Form: <a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=7586s">Breaking Forms into Smaller Pieces with withForm HOC</a></li>
<li>شيفرة الفرع الكامل: <a href="https://github.com/alialaa/tanstack-form-course/tree/withForm">مستودع الدورة — الفرع <code>withForm</code></a></li>
<li>التوثيق الرسمي لـ<code>withForm</code> وسياق النموذج: <a href="https://tanstack.com/form/latest/docs/framework/react/guides/form-composition">تركيب النماذج والمكوّنات</a></li>
</ul>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Breaking Forms into Smaller Pieces with withForm HOC» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,t as headings,p as html,l as slug,e as title};
