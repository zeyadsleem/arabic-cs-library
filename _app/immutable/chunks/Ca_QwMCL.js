const s="tanstack-form",a="form",n="دورة TanStack Form الكاملة",o="creating-reusable-group-of-fields-with-withfieldgroup-hoc",t="بناء مجموعة حقول قابلة لإعادة الاستعمال باستخدام `withFieldGroup`",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"إنشاء-المجموعة",text:"إنشاء المجموعة"},{depth:2,id:"التحقق-يسكن-المجموعة",text:"التحقّق يسكن المجموعة"},{depth:2,id:"تركيب-المجموعة-في-النموذج",text:"تركيب المجموعة في النموذج"},{depth:2,id:"ما-الفرق-بين-الأداتين-إذن",text:"ما الفرق بين الأداتين إذن؟"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>أنقذنا <code>withForm</code> الملفّ الرئيسي من التضخّم: نقلنا قسم المهارات إلى مكوّن مستقل، فصار النموذج يعرض ترتيب أقسامه بدلًا من تفاصيلها. لكنّ هذا الحلّ له شرط لم نتحدّث عنه صراحة: القسم المنقول مرتبط بهذا النموذج وحده. تذكّر أنّنا بسطنا <code>...registerFormOpts</code> داخل <code>withForm</code>، وهذه الخيارات هي التي جعلت <code>form</code> داخله يعرف شكل بيانات نموذج التسجيل. فإن حاولت استعمال <code>RegisterSkills</code> في نموذج آخر، ستحتاج إلى تمرير نموذج التسجيل نفسه؛ وإلّا اختلف الشكل ولم يعد النوع صحيحًا.</p>
<p>هذا مقبول حين يكون القسم خاصًّا بنموذج واحد، لكنّه عائق حين يتكرّر القسم بين نماذج مختلفة. خذ حقلَي كلمة المرور وتأكيدها: يحتاجهما نموذج التسجيل، ويحتاجهما نموذج تغيير كلمة المرور، ويحتاجهما أي نموذج استعادة. كتابتهما في كل نموذج تعني تكرار الواجهة والتحقّق معًا، وأي تعديل على قاعدة الطول أو رسالة عدم التطابق يجب أن يُكرّر في كل موضع.</p>
<p>لهذا يقدّم <code>createFormHook</code> تصديرًا ثالثًا: <code>withFieldGroup</code>. هو يشبه <code>withForm</code> في الشكل، ويختلف عنه في النيّة: لا يربط القسم بنموذج معيّن، بل يصف مجموعة حقول تعرف حقولها وقواعدها، ثم تُركَّب في أي نموذج مع تحديد موقعها فيه.</p>
<h2 id="إنشاء-المجموعة">إنشاء المجموعة</h2>
<p>نضعها خارج مجلد النموذج، في <code>src/components/form/PasswordFields.tsx</code>، لأنّها لم تعد ملكًا لنموذج التسجيل:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { withFieldGroup } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/hooks/form&quot;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;zod&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> passwordsSchema = z
  .<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">password</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">6</span>, <span class="hljs-string">&quot;Password should be at least 6 characters.&quot;</span>),
    <span class="hljs-attr">confirmPassword</span>: z.<span class="hljs-title function_">string</span>(),
  })
  .<span class="hljs-title function_">refine</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> data.<span class="hljs-property">password</span> === data.<span class="hljs-property">confirmPassword</span>, {
    <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Passwords do not match&quot;</span>,
    <span class="hljs-attr">path</span>: [<span class="hljs-string">&quot;confirmPassword&quot;</span>], <span class="hljs-comment">// Optional: specifies where the error should appear</span>
  });

<span class="hljs-keyword">const</span> <span class="hljs-attr">defaultValues</span>: z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> passwordsSchema&gt; = {
  <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;&quot;</span>,
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&quot;&quot;</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">PasswordFields</span> = <span class="hljs-title function_">withFieldGroup</span>({
  defaultValues,
  <span class="hljs-attr">render</span>: <span class="hljs-keyword">function</span> <span class="hljs-title function_">Render</span>(<span class="hljs-params">{ group }</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">group.AppField</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;password&quot;</span>&gt;</span>
          {(field) =&gt; {
            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">field.TextInput</span>
                <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Password&quot;</span>
                <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;password&quot;</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
                <span class="hljs-attr">description</span>=<span class="hljs-string">&quot;Your password (must be at least 8 characters long)&quot;</span>
              /&gt;</span>
            );
          }}
        <span class="hljs-tag">&lt;/<span class="hljs-name">group.AppField</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">group.AppField</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;confirmPassword&quot;</span>&gt;</span>
          {(field) =&gt; {
            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">field.TextInput</span>
                <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Confirm Password&quot;</span>
                <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;confirmPassword&quot;</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
                <span class="hljs-attr">description</span>=<span class="hljs-string">&quot;Confirm your password.&quot;</span>
              /&gt;</span>
            );
          }}
        <span class="hljs-tag">&lt;/<span class="hljs-name">group.AppField</span>&gt;</span>
      <span class="hljs-tag">&lt;/&gt;</span></span>
    );
  },
});
</code></pre>
<p>قارن هذا الكائن بما مرّرناه إلى <code>withForm</code> في الدرس الماضي. هناك بسطنا خيارات نموذج قائم؛ وهنا نمرّر <code>defaultValues</code> خاصّة بالمجموعة. هذا الفرق هو كل شيء: <code>withFieldGroup</code> لا يعرف نموذجًا بعينه، فيحتاج أن يعرف شكل بياناته من نفسه. ومن هنا يستمدّ أنواعه، فيصير <code>name=&quot;password&quot;</code> مقبولًا و<code>name=&quot;passwrod&quot;</code> مرفوضًا.</p>
<p>ثم يأتي <code>render</code>، ويأخذ هذه المرّة <code>group</code> بدل <code>form</code>. الكائن <code>group</code> يشبه النموذج في ما يخصّ الحقول: له <code>AppField</code> و<code>Field</code>، فتكتب بداخله كما تكتب في النموذج تمامًا. لاحظ أنّنا استعملنا <code>group.AppField</code> لا <code>form.AppField</code>؛ السبب أنّ هذا الملفّ لا يملك نموذجًا، بل يملك وصفًا لحقول ستُلحق بنموذج ما وقت التركيب.</p>
<p>واخترنا إرجاع جزء مجرّد (<code>&lt;&gt;</code>) بدل عنصر حاوية، فالمجموعة لا تفرض على النموذج المستضيف أي تخطيط. الحاوية الحقيقية موجودة في النموذج (<code>FieldGroup</code>)، والمجموعة تضيف حقولها داخلها. هذا التفصيل الصغير يُبقي المجموعة قابلة للتركيب في أي مكان دون أن تُفسد التباعد بين الحقول.</p>
<h2 id="التحقق-يسكن-المجموعة">التحقّق يسكن المجموعة</h2>
<p>لاحظ أنّ الملفّ يُصدّر <code>passwordsSchema</code> وليس النوع فقط. هذا قرار جوهري، ويُفهم بمقارنة ما كان يحدث قبل النقل.</p>
<p>في السابق كان التحقّق في <code>registerFormSchema</code>: قاعدة الطول، و<code>refine</code> الذي يقارن الكلمتين. فحين نستعمل الحقلين في نموذج آخر، نضطرّ إلى إعادة كتابة القاعدتين هناك، لأنّ التحقّق يعيش على مستوى النموذج لا على مستوى الحقول. والنتيجة أنّ نموذجين قد يتفقان في الشكل ويختلفان في القاعدة بلا أن ينتبه أحد.</p>
<p>بعد النقل صار التحقّق في مكان واحد مع الحقول التي يخصّها. وأمّا النموذج المستضيف فيوسّع قاعدته بدل أن يعيد كتابتها:</p>
<pre><code class="language-tsx">    <span class="hljs-attr">skills</span>: z.<span class="hljs-title function_">array</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
        <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
        <span class="hljs-attr">level</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&quot;beginner&quot;</span>, <span class="hljs-string">&quot;intermediate&quot;</span>, <span class="hljs-string">&quot;expert&quot;</span>]),
      })
    ),
  })
  .<span class="hljs-title function_">and</span>(passwordsSchema);
</code></pre>
<p><code>and</code> هنا تعني الجمع بين قاعدتين: حقول النموذج، ثم حقول كلمة المرور بقاعدتها. فالنتيجة كائن واحد فيه <code>firstName</code> و<code>skills</code> و<code>password</code> و<code>confirmPassword</code>، ومعها شرط التطابق. ولهذا بقي <code>defaultValues</code> في الملفّ نفسه يحتوي <code>password</code> و<code>confirmPassword</code>، لأنّ نوعه مشتقّ من القاعدة المجموعة. ومن استعمل <code>zod</code> من قبل يعرف أنّ <code>and</code> تقابل التقاطع، وأنّ البديل <code>.extend(...)</code> يعمل أيضًا حين تكون القاعدة كائنًا لا يحتوي <code>refine</code>.</p>
<h2 id="تركيب-المجموعة-في-النموذج">تركيب المجموعة في النموذج</h2>
<p>في ملفّ النموذج يُضاف الاستيراد، ثم يُوضع المكوّن في الموضع الذي كان يحتوي الحقلين:</p>
<pre><code class="language-tsx">            &lt;<span class="hljs-title class_">PasswordFields</span>
              form={form}
              fields={{
                <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;password&quot;</span>,
                <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&quot;confirmPassword&quot;</span>,
              }}
            /&gt;
</code></pre>
<p>هاتان الخاصيتان هما عقد التركيب. <code>form</code> هي النموذج المستضيف، وهي التي تجعل الحقول تكتب في حالته. أمّا <code>fields</code> فهي الخريطة التي تربط اسم الحقل داخل المجموعة بمساره الكامل في بيانات النموذج.</p>
<p>ولماذا نحتاج خريطة أصلًا ما دامت الأسماء متطابقة هنا؟ لأنّها قد لا تتطابق. تخيّل نموذجًا يخزّن كلمة المرور داخل كائن فرعي، فيكون المسار <code>passwordsData.password</code>. في هذه الحالة تكتب <code>fields={{ password: &quot;passwordsData.password&quot;, confirmPassword: &quot;passwordsData.confirmPassword&quot; }}</code> فتعمل المجموعة كما هي بلا تعديل حرف. ولو كانت أسماء الحقول داخل المجموعة مختلفة لَكَتبت المفتاح باسمها الداخلي والقيمة بمسارها في النموذج. الخريطة إذن ليست حشوًا: هي التي تفصل «ما تعرفه المجموعة عن نفسها» عن «أين تسكن في هذا النموذج بالذات».</p>
<p>وإن احتاجت المجموعة إلى شيء من مستوى النموذج — مثل الاشتراك في <code>canSubmit</code> لتعطيل زرّ داخلها — فالمسار موجود عبر <code>group.form</code>. تقرأ منه <code>group.form.store</code> وتشترك بـ<code>useStore</code> كما تفعل في أي مكوّن آخر، لأنّ <code>group.form</code> هو النموذج الحقيقي المستضيف لا نسخة منه. وهذا أيضًا دليل على أنّ المجموعة ليست نموذجًا مصغّرًا: لا حالة خاصّة بها، ولا <code>useAppForm</code> داخلها.</p>
<h2 id="ما-الفرق-بين-الأداتين-إذن">ما الفرق بين الأداتين إذن؟</h2>
<p>الخلاصة في جملة واحدة: <code>withForm</code> تقول «هذا قسم من نموذجي»، و<code>withFieldGroup</code> تقول «هذه حقول أعرفها، ضعني في نموذجك أينما شئت».</p>
<table>
<thead>
<tr>
<th>السؤال</th>
<th><code>withForm</code></th>
<th><code>withFieldGroup</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>ما الذي يُمرَّر؟</td>
<td>خيارات النموذج المستضيف</td>
<td><code>defaultValues</code> خاصّة بالمجموعة</td>
</tr>
<tr>
<td>ما الذي يصل إلى <code>render</code>؟</td>
<td><code>form</code></td>
<td><code>group</code></td>
</tr>
<tr>
<td>هل يعمل في نموذج آخر؟</td>
<td>لا، إلّا بنموذج مطابق</td>
<td>نعم، مع خريطة <code>fields</code></td>
</tr>
<tr>
<td>أين التحقّق؟</td>
<td>على مستوى النموذج</td>
<td>داخل المجموعة، ويُوسَّع بـ<code>and</code></td>
</tr>
<tr>
<td>متى تختاره؟</td>
<td>قسم كبير خاص بنموذج واحد</td>
<td>حقول متكرّرة بين نماذج</td>
</tr>
</tbody>
</table>
<p>وقد يجتمع الاثنان في مشروع واحد بلا تعارض: المهارات بوصفها قسمًا من نموذج التسجيل، وكلمة المرور بوصفها مجموعة قابلة للنقل.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--creating-reusable-group-of-fields-with-withfieldgroup-hoc--password-mismatch.png" alt="نموذج التسجيل بعد نقل حقلي كلمة المرور إلى مجموعة قابلة لإعادة الاستخدام: كلمتا مرور مختلفتان دون رسالة خطأ ظاهرة، ثم قسم المهارات ببطاقاته الثلاث وزر الإضافة، ثم زرّا الحفظ"></p>
<p>اللقطة أُخذت بعد كتابة كلمة مرور من سبعة محارف وتأكيد من ستّة، أي حالتين مختلفتين. ومع ذلك لا تظهر رسالة خطأ تحت أيّ من الحقلين، وهذا متوقّع: النموذج يستعمل <code>revalidateLogic({ mode: &quot;submit&quot; })</code>، أي أنّ التحقّق لا يبدأ قبل أول إرسال، فلا يُطلب من المجموعة أن تعرض خطأً لم يُحسب بعد. اختبار التطابق الحقيقي يبدأ بعد الإرسال، وحينها تُعرض الرسالة التي عرّفناها في <code>passwordsSchema</code> تحت حقل التأكيد تحديدًا، لأنّ <code>path</code> في <code>refine</code> يشير إليه.</p>
<p>أمّا بقية الصفحة فلم تتغيّر: حقول الاسم واسم العائلة والشارع، ثم الحقلان الجديدان في موضعهما القديم، ثم المهارات الثلاث <code>HTML</code> و<code>CSS</code> و<code>JavaScript</code> بقوائمها وأزرار الإزالة، ثم خانة الموافقة وزرّا الحفظ. الشكل نفسه، والقواعد انتقلت من النموذج إلى المجموعة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>غيّر المسارين في خاصية <code>fields</code> إلى <code>account.password</code> و<code>account.confirmPassword</code>، وأضف الحقول إلى قاعدة النموذج داخل كائن <code>account</code>، وتحقّق من عمل التحقّق.</li>
<li>سمّ الحقلين داخل المجموعة <code>pass</code> و<code>confirm</code>، ثم اربطهما بالمسارين الأصليين عبر الخريطة دون تعديل بقية النموذج.</li>
<li>أضف إلى المجموعة اشتراكًا في <code>group.form.state.canSubmit</code>، واعرض سطرًا يقول «النموذج جاهز للإرسال» عند تحقّقه.</li>
<li>أنشئ نموذجًا صغيرًا لاستعادة كلمة المرور، وركّب فيه <code>PasswordFields</code> مع القاعدة نفسها، ولاحظ أنّك لم تكتب أي قاعدة تطابق.</li>
<li>أزل <code>.and(passwordsSchema)</code> من قاعدة النموذج، وسجّل ما يحدث في الأنواع وفي التشغيل، ثم أعدها.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li>شرح الدرس في دورة TanStack Form: <a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=7864s">Creating Reusable Group of Fields with withFieldGroup HOC</a></li>
<li>شيفرة الفرع الكامل: <a href="https://github.com/alialaa/tanstack-form-course/tree/withFieldGroup">مستودع الدورة — الفرع <code>withFieldGroup</code></a></li>
<li>التوثيق الرسمي لـ<code>withFieldGroup</code> وخريطة الحقول: <a href="https://tanstack.com/form/latest/docs/framework/react/guides/form-composition">تركيب النماذج والمكوّنات</a></li>
</ul>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Creating Reusable Group of Fields with withFieldGroup HOC» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:o,title:t,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,o as slug,t as title};
