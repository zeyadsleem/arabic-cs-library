const s="tanstack-form",a="form",n="دورة TanStack Form الكاملة",l="using-shadcn-components",t="استخدام مكوّنات shadcn: حين تتغيّر الواجهة ويبقى العقد",e=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"ما-تضيفه-المكتبة-فعلا",text:"ما تضيفه المكتبة فعلًا"},{depth:3,id:"العقد-الثلاثي-القيمة-والتغيير-والمغادرة",text:"العقد الثلاثي: القيمة والتغيير والمغادرة"},{depth:3,id:"التغليف-field-وfieldgroup-وfieldset",text:"التغليف: Field وFieldGroup وFieldSet"},{depth:3,id:"الأخطاء-fielderror-بدل-div-اليدوي",text:"الأخطاء: FieldError بدل div اليدوي"},{depth:3,id:"الحقول-النصية-الاستبدال-الرخيص",text:"الحقول النصّية: الاستبدال الرخيص"},{depth:3,id:"مصفوفة-المهارات-select-يختلف-في-الأسماء-لا-في-المعنى",text:"مصفوفة المهارات: Select يختلف في الأسماء لا في المعنى"},{depth:3,id:"خانة-الاختيار-checked-بدل-value",text:"خانة الاختيار: checked بدل value"},{depth:3,id:"الأزرار-cansubmit-يبقى-الحكم",text:"الأزرار: canSubmit يبقى الحكم"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>حتى الآن كانت استمارتنا تعمل، لكن عناصرها وسوم <code>input</code> و<code>button</code> خامّة، والتنسيق مكتوب يدويًا في كلّ موضع. هذا مقبول في درس، وغير مقبول في تطبيق: لا أحد يعيد كتابة تنسيق الحقل في كلّ استمارة. الحلّ المعتاد مكتبة مكوّنات، وفي درسنا هذا المكتبة هي <code>shadcn/ui</code>.</p>
<p>الفكرة التي يثبتها الدرس ليست «كيف نُنسّق الحقول»، بل أين تنتهي مسؤولية <code>TanStack Form</code> وأين تبدأ مسؤولية المكتبة. <code>TanStack Form</code> لا يرسم شيئًا بنفسه: يحتفظ بالقيم والأخطاء وحالة كلّ حقل، ويترك التصيير لك. فإن غيّرنا طبقة التصيير وحدها، وجب أن تبقى الاستمارة تعمل كما كانت: التحقّق من الصحة، والحقول المرتبطة، ومصفوفة المهارات، والإرسال. لذلك نستبدل كلّ عنصر بمكوّن من المكتبة، ونفحص عند كلّ استبدال العقد نفسه: القيمة تدخل إلى العنصر، والتغيير يعود إلى الاستمارة، والمغادرة تُعلِم الحقل، والخطأ يُعرض في مكانه.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="ما-تضيفه-المكتبة-فعلا">ما تضيفه المكتبة فعلًا</h3>
<p>نبدأ بإضافة المكوّنات التي نحتاجها من الطرفية بالأمر <code>npx shadcn@latest add field input select checkbox button</code>. لكن ما يحدث بعد الأمر هو الأهم: هذه المكتبة لا تُثبّت حزمة مكوّنات جاهزة تستوردها كما تستورد <code>React</code>، بل تنسخ ملفات مصدر إلى <code>src/components/ui/</code> فتصبح شيفرة تملكها وتعدّلها، وتضيف في المقابل الحزم التي تعتمد عليها تلك الملفات. مقتطف من <code>package.json</code> في فرع الدرس يبيّن ما أُضيف:</p>
<pre><code class="language-json">  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@radix-ui/react-checkbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.3.3&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@radix-ui/react-label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^2.1.7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@radix-ui/react-select&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^2.2.6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@radix-ui/react-separator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.1.7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@radix-ui/react-slot&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.2.3&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tailwindcss/vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.14&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-devtools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^0.7.4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-form&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.23.6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-form-devtools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^0.1.6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;class-variance-authority&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^0.7.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;clsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^2.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lucide-react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^0.545.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tailwind-merge&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^3.3.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tailwindcss&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.14&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;zod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.12&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
</code></pre>
<p>ما نراه هنا هو تركيب المكوّنات التي سنستعملها: <code>@radix-ui/react-select</code> و<code>@radix-ui/react-checkbox</code> تمنح السلوك الجاهز — لوحة مفاتيح، وإدارة تركيز، وسمات وصولية — و<code>class-variance-authority</code> تصف أشكال المكوّن وأحجامه، و<code>lucide-react</code> يرسم الأيقونات الصغيرة داخل القائمة المنسدلة وخانة الاختيار. أمّا <code>clsx</code> و<code>tailwind-merge</code> فلهما وظيفة واحدة تظهر في مساعدٍ صغير يُستعمل في كلّ ملف من ملفات المكتبة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { clsx, <span class="hljs-keyword">type</span> <span class="hljs-title class_">ClassValue</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;clsx&quot;</span>
<span class="hljs-keyword">import</span> { twMerge } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;tailwind-merge&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">cn</span>(<span class="hljs-params">...<span class="hljs-attr">inputs</span>: <span class="hljs-title class_">ClassValue</span>[]</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">twMerge</span>(<span class="hljs-title function_">clsx</span>(inputs))
}
</code></pre>
<p>الدالة <code>cn</code> تدمج أصناف <code>Tailwind</code> القادمة من الخارج مع أصناف المكوّن الافتراضية، و<code>tailwind-merge</code> يحلّ التعارض بينهما لصالح ما مرّرتَه أنت. هذا هو سبب قدرتك على كتابة <code>className</code> على أيّ مكوّن من المكتبة دون أن تفسد مظهره الأساسي.</p>
<h3 id="العقد-الثلاثي-القيمة-والتغيير-والمغادرة">العقد الثلاثي: القيمة والتغيير والمغادرة</h3>
<p>كلّ حقل في <code>TanStack Form</code> يسلّمك دالة تصيير (<code>render prop</code>) تستقبل كائن الحقل. هذا الكائن هو كلّ ما تحتاجه المكتبة لتعمل: <code>field.state.value</code> القيمة الحالية، و<code>field.handleChange</code> لإبلاغ الاستمارة بالتغيير، و<code>field.handleBlur</code> لإبلاغها بأن المستخدم غادر الحقل. الحقل الأول في فرع الدرس بعد الاستبدال:</p>
<pre><code class="language-tsx">                &lt;<span class="hljs-title class_">Field</span>&gt;
                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldLabel</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;firstName&quot;</span>&gt;</span>First Name<span class="hljs-tag">&lt;/<span class="hljs-name">FieldLabel</span>&gt;</span></span>
                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Input</span>
                    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;firstName&quot;</span>
                    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
                    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;John Doe&quot;</span>
                    <span class="hljs-attr">value</span>=<span class="hljs-string">{field.state.value}</span>
                    <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{field.handleBlur}</span>
                    <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> field.handleChange(e.target.value)}
                  /&gt;</span>
                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldDescription</span>&gt;</span>Your First Name.<span class="hljs-tag">&lt;/<span class="hljs-name">FieldDescription</span>&gt;</span></span>
                  {!field.<span class="hljs-property">state</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">isValid</span> &amp;&amp; (
                    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldError</span>&gt;</span>
                      {field.state.meta.errors
                        .map((error) =&gt; error?.message)
                        .join(&quot;, &quot;)}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldError</span>&gt;</span></span>
                  )}
                &lt;/<span class="hljs-title class_">Field</span>&gt;
</code></pre>
<p>لاحظ ما تغيّر وما لم يتغيّر. تغيّر الغلاف: <code>Field</code> و<code>FieldLabel</code> و<code>FieldDescription</code> بدل <code>div</code> و<code>label</code> و<code>p</code>. ولم يتغيّر القلب: <code>value</code> و<code>onBlur</code> و<code>onChange</code> بالمعنى نفسه، مع فارق واحد صغير هو أن <code>Input</code> مكوّن <code>React</code> يستقبل الحدث كما يتلقّاه العنصر الأصلي، فتمرّر <code>e.target.value</code> إلى <code>handleChange</code>.</p>
<p>ولو حذفت واحدًا من الثلاثة لظهر الخلل فورًا. بدون <code>value</code> يصبح العنصر غير مضبوط، فتكتب فيه ويبقى مخزن الاستمارة فارغًا، ثم ترفض الاستمارة الإرسال بلا سبب ظاهر. وبدون <code>handleChange</code> لا تصل القيمة إلى المخزن أصلًا، فلا يعمل المستمع (listener) الذي يفرّغ حقل الاسم الأخير حين يُفرَّغ الاسم الأول، ولا يظهر حقل الاسم الأخير لأنه مربوط بـ<code>form.Subscribe</code> على قيمة الاسم الأول. وبدون <code>handleBlur</code> لا يُعلَّم الحقل كمُلامَس، ولا يعمل التحقّق عند المغادرة بعد أوّل إرسال، لأن <code>revalidateLogic</code> في هذه الاستمارة يعمل بـ<code>modeAfterSubmission: &quot;blur&quot;</code>.</p>
<h3 id="التغليف-field-وfieldgroup-وfieldset">التغليف: <code>Field</code> و<code>FieldGroup</code> و<code>FieldSet</code></h3>
<p>المكوّنات الجديدة لا تغيّر البيانات، لكنها تضيف بنية وتنسيقًا. هذا مقتطف من <code>src/components/ui/field.tsx</code> يبيّن ثلاثة منها:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">FieldSet</span>(<span class="hljs-params">{ className, ...props }: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&quot;fieldset&quot;</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>
      <span class="hljs-attr">data-slot</span>=<span class="hljs-string">&quot;field-set&quot;</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{cn(</span>
        &quot;<span class="hljs-attr">flex</span> <span class="hljs-attr">flex-col</span> <span class="hljs-attr">gap-6</span>&quot;,
        &quot;<span class="hljs-attr">has-</span>[&gt;</span>[data-slot=checkbox-group]]:gap-3 has-[&gt;[data-slot=radio-group]]:gap-3&quot;,
        className
      )}
      {...props}
    /&gt;</span>
  )
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FieldLegend</span>(<span class="hljs-params">{
  className,
  variant = <span class="hljs-string">&quot;legend&quot;</span>,
  ...props
}: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&quot;legend&quot;</span>&gt; &amp; { variant?: <span class="hljs-string">&quot;legend&quot;</span> | <span class="hljs-string">&quot;label&quot;</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">legend</span>
      <span class="hljs-attr">data-slot</span>=<span class="hljs-string">&quot;field-legend&quot;</span>
      <span class="hljs-attr">data-variant</span>=<span class="hljs-string">{variant}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{cn(</span>
        &quot;<span class="hljs-attr">mb-3</span> <span class="hljs-attr">font-medium</span>&quot;,
        &quot;<span class="hljs-attr">data-</span>[<span class="hljs-attr">variant</span>=<span class="hljs-string">legend]:text-base</span>&quot;,
        &quot;<span class="hljs-attr">data-</span>[<span class="hljs-attr">variant</span>=<span class="hljs-string">label]:text-sm</span>&quot;,
        <span class="hljs-attr">className</span>
      )}
      {<span class="hljs-attr">...props</span>}
    /&gt;</span></span>
  )
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FieldGroup</span>(<span class="hljs-params">{ className, ...props }: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&quot;div&quot;</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">data-slot</span>=<span class="hljs-string">&quot;field-group&quot;</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{cn(</span>
        &quot;<span class="hljs-attr">group</span>/<span class="hljs-attr">field-group</span> @<span class="hljs-attr">container</span>/<span class="hljs-attr">field-group</span> <span class="hljs-attr">flex</span> <span class="hljs-attr">w-full</span> <span class="hljs-attr">flex-col</span> <span class="hljs-attr">gap-7</span> <span class="hljs-attr">data-</span>[<span class="hljs-attr">slot</span>=<span class="hljs-string">checkbox-group]:gap-3</span> [&amp;&gt;</span>[data-slot=field-group]]:gap-4&quot;,
        className
      )}
      {...props}
    /&gt;</span>
  )
}
</code></pre>
<p><code>FieldGroup</code> هو <code>div</code> بسيط مهمّته الفراغ الرأسي بين الحقول المتتالية؛ من دونه تلتصق الحقول ببعضها لأن النسخة السابقة كانت تعتمد على هوامش مكتوبة يدويًا في كلّ حقل. و<code>Field</code> هو الغلاف الذي يحمل <code>role=&quot;group&quot;</code> ويضبط الاتجاه رأسيًا افتراضيًا، وفيه أيضًا تنسيق <code>data-[invalid=true]:text-destructive</code> الذي يجعل نصّ الحقل كلّه بلون الخطأ عند الحاجة. أمّا <code>FieldSet</code> و<code>FieldLegend</code> فهما <code>fieldset</code> و<code>legend</code> حقيقيان، فنستعملهما لمجموعة المهارات: حقول لها عنوان واحد يقرأه قارئ الشاشة مع كلّ حقل.</p>
<h3 id="الأخطاء-fielderror-بدل-div-اليدوي">الأخطاء: <code>FieldError</code> بدل <code>div</code> اليدوي</h3>
<p>قبل هذا الدرس كنّا نعرض الأخطاء في <code>div</code> نكتبه بأنفسنا بعد ضمّ رسائل الخطأ بفاصلة. المكتبة تعطينا مكوّنًا يفعل ذلك بذكاء أكبر:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">FieldError</span>(<span class="hljs-params">{
  className,
  children,
  errors,
  ...props
}: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-string">&quot;div&quot;</span>&gt; &amp; {
  errors?: <span class="hljs-built_in">Array</span>&lt;{ message?: <span class="hljs-built_in">string</span> } | <span class="hljs-literal">undefined</span>&gt;
}</span>) {
  <span class="hljs-keyword">const</span> content = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (children) {
      <span class="hljs-keyword">return</span> children
    }

    <span class="hljs-keyword">if</span> (!errors?.<span class="hljs-property">length</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }

    <span class="hljs-keyword">const</span> uniqueErrors = [
      ...<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(errors.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> [error?.<span class="hljs-property">message</span>, error])).<span class="hljs-title function_">values</span>(),
    ]

    <span class="hljs-keyword">if</span> (uniqueErrors?.<span class="hljs-property">length</span> == <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span> uniqueErrors[<span class="hljs-number">0</span>]?.<span class="hljs-property">message</span>
    }

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 flex list-disc flex-col gap-1&quot;</span>&gt;</span>
        {uniqueErrors.map(
          (error, index) =&gt;
            error?.message &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    )
  }, [children, errors])

  <span class="hljs-keyword">if</span> (!content) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>
      <span class="hljs-attr">data-slot</span>=<span class="hljs-string">&quot;field-error&quot;</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{cn(</span>&quot;<span class="hljs-attr">text-destructive</span> <span class="hljs-attr">text-sm</span> <span class="hljs-attr">font-normal</span>&quot;, <span class="hljs-attr">className</span>)}
      {<span class="hljs-attr">...props</span>}
    &gt;</span>
      {content}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
</code></pre>
<p>ثلاثة تفاصيل تستحقّ الانتباه. أولًا المكوّن يقبل خاصية <code>errors</code> ويقبل أيضًا <code>children</code> مباشرة، والدرس يستعمل الشكل الثاني فيمرّر النصّ المضموم. ثانيًا حين تتكرّر الرسالة نفسها — وهو شائع حين يطلق أكثر من مدقّق الخطأ ذاته — يزيل التكرار بـ<code>Map</code> قبل العرض، فلا يقرأ المستخدم الجملة نفسها مرتين. ثالثًا إن تعدّدت الرسائل المتبقية عرضها قائمة نقطية، وإن لم يبقَ شيء أعاد <code>null</code> فلم يحتلّ مساحة في الصفحة. ومع ذلك يبقى حوله في الدرس شرط <code>!field.state.meta.isValid</code>، وهو شرط «متى نعرض» لا «ماذا نعرض».</p>
<h3 id="الحقول-النصية-الاستبدال-الرخيص">الحقول النصّية: الاستبدال الرخيص</h3>
<p>الاسم الأخير والشارع وكلمتا السرّ كلّها حقول نصّية، والفرق بينها وبين الاسم الأول سطر واحد:</p>
<pre><code class="language-tsx">                &lt;<span class="hljs-title class_">Input</span>
                  id=<span class="hljs-string">&quot;password&quot;</span>
                  <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;password&quot;</span>
                  placeholder=<span class="hljs-string">&quot;Password&quot;</span>
                  value={field.<span class="hljs-property">state</span>.<span class="hljs-property">value</span>}
                  onBlur={field.<span class="hljs-property">handleBlur</span>}
                  onChange={<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> field.<span class="hljs-title function_">handleChange</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>)}
                /&gt;
</code></pre>
<p><code>type=&quot;password&quot;</code> هو كلّ ما يميّز حقل كلمة السر؛ العقد نفسه: <code>value</code> من <code>field.state.value</code>، و<code>onBlur</code> إلى <code>field.handleBlur</code>، و<code>onChange</code> إلى <code>field.handleChange</code>. وهنا يظهر خطأ شائع لا يظهر في الشيفرة: يجب أن يطابق <code>htmlFor</code> في <code>FieldLabel</code> قيمة <code>id</code> في <code>Input</code>، وإلا نقر المستخدم على العنوان فلم ينتقل المؤشّر إلى الحقل، وفقد قارئ الشاشة اسم الحقل. لاحظ أن معرّف عنوان «Accept Terms» في فرع الدرس لا يقابل أيّ <code>id</code> على <code>Checkbox</code>، فالنقر على العنوان هناك لا يفعل شيئًا.</p>
<h3 id="مصفوفة-المهارات-select-يختلف-في-الأسماء-لا-في-المعنى">مصفوفة المهارات: <code>Select</code> يختلف في الأسماء لا في المعنى</h3>
<p>مصفوفة المهارات هي الجزء الذي يفضح الفرق بين مكتبة وأخرى. الحقل نفسه مُعرَّف بـ<code>mode=&quot;array&quot;</code>، ونضيف عنصرًا بـ<code>pushValue</code> ونحذف بـ<code>removeValue</code>، ويبقى كلّ مستوى داخل المصفوفة حقلًا مستقلًا باسم <code>skills[\${index}].level</code>:</p>
<pre><code class="language-tsx">                                &lt;<span class="hljs-title class_">Field</span>&gt;
                                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex  gap-2 &quot;</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">FieldLabel</span>&gt;</span>{skill.name}<span class="hljs-tag">&lt;/<span class="hljs-name">FieldLabel</span>&gt;</span>
                                    <span class="hljs-tag">&lt;<span class="hljs-name">Select</span>
                                      <span class="hljs-attr">value</span>=<span class="hljs-string">{subField.state.value}</span>
                                      <span class="hljs-attr">onValueChange</span>=<span class="hljs-string">{(value)</span> =&gt;</span>
                                        subField.handleChange(value as any)
                                      }
                                    &gt;
                                      <span class="hljs-tag">&lt;<span class="hljs-name">SelectTrigger</span>
                                        <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{subField.handleBlur}</span>
                                      &gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">SelectValue</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Choose department&quot;</span> /&gt;</span>
                                      <span class="hljs-tag">&lt;/<span class="hljs-name">SelectTrigger</span>&gt;</span>
                                      <span class="hljs-tag">&lt;<span class="hljs-name">SelectContent</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">SelectItem</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;beginner&quot;</span>&gt;</span>
                                          Beginner
                                        <span class="hljs-tag">&lt;/<span class="hljs-name">SelectItem</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">SelectItem</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;intermediate&quot;</span>&gt;</span>
                                          Intermediate
                                        <span class="hljs-tag">&lt;/<span class="hljs-name">SelectItem</span>&gt;</span>
                                        <span class="hljs-tag">&lt;<span class="hljs-name">SelectItem</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;expert&quot;</span>&gt;</span>
                                          Expert
                                        <span class="hljs-tag">&lt;/<span class="hljs-name">SelectItem</span>&gt;</span>
                                      <span class="hljs-tag">&lt;/<span class="hljs-name">SelectContent</span>&gt;</span>
                                    <span class="hljs-tag">&lt;/<span class="hljs-name">Select</span>&gt;</span>

                                    <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
                                      <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;destructive&quot;</span>
                                      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span>
                                      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> field.removeValue(index)}
                                    &gt;
                                      Remove
                                    <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
                                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

                                  {!field.<span class="hljs-property">state</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">isValid</span> &amp;&amp; (
                                    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldError</span>&gt;</span>
                                      {field.state.meta.errors
                                        .map((error) =&gt; error?.message)
                                        .join(&quot;, &quot;)}
                                    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldError</span>&gt;</span></span>
                                  )}
                                &lt;/<span class="hljs-title class_">Field</span>&gt;
</code></pre>
<p>هنا تتغيّر أسماء الخصائص لأن المكوّن ليس عنصر HTML: جذر <code>Select</code> ليس عقدة في الصفحة، فيأخذ <code>value</code> و<code>onValueChange</code> بدل <code>onChange</code>، والقيمة تصل إلى النداء مباشرة لا داخل حدث. أمّا <code>onBlur</code> فيُمرَّر إلى <code>SelectTrigger</code>، أي إلى الزرّ الذي يراه المستخدم، لأن الجذر نفسه لا يستقبل تركيزًا ولا مغادرة. والخيارات تُوضع داخل <code>SelectContent</code> بـ<code>SelectItem</code> لكلّ قيمة. وتجد في الشيفرة <code>handleChange(value as any)</code>، وهي صياغة قسرية لأن قيمة القائمة تصل كنصّ عام بينما نوع الحقل في المخطّط تعداد (<code>enum</code>) محدود؛ في تطبيق أكبر يُفضَّل التحقّق من القيمة قبل تمريرها بدل القسر.</p>
<p>هذه هي الملاحظة العملية التي يشدّد عليها الدرس: عند الانتقال من مكتبة إلى أخرى لا تسأل «أين <code>onChange</code>؟» بل «أين يصل التغيير، وأين تُلتقط المغادرة، وما شكل القيمة الواصلة؟».</p>
<h3 id="خانة-الاختيار-checked-بدل-value">خانة الاختيار: <code>checked</code> بدل <code>value</code></h3>
<p>الشيء نفسه يتكرّر مع الموافقة على الشروط، لكن باسمين مختلفين:</p>
<pre><code class="language-tsx">                &lt;<span class="hljs-title class_">Field</span>&gt;
                  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Checkbox</span>
                      <span class="hljs-attr">checked</span>=<span class="hljs-string">{field.state.value}</span>
                      <span class="hljs-attr">onCheckedChange</span>=<span class="hljs-string">{(checked)</span> =&gt;</span>
                        field.handleChange(checked === true)
                      }
                      onBlur={field.handleBlur}
                    /&gt;
                    <span class="hljs-tag">&lt;<span class="hljs-name">FieldContent</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">FieldLabel</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;finder-pref-9k2-sync-folders-nep&quot;</span>&gt;</span>
                        Accept Terms
                      <span class="hljs-tag">&lt;/<span class="hljs-name">FieldLabel</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldContent</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                  {!field.<span class="hljs-property">state</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">isValid</span> &amp;&amp; (
                    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FieldError</span>&gt;</span>
                      {field.state.meta.errors
                        .map((error) =&gt; error?.message)
                        .join(&quot;, &quot;)}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">FieldError</span>&gt;</span></span>
                  )}
                &lt;/<span class="hljs-title class_">Field</span>&gt;
</code></pre>
<p>القيمة المنطقية تُمرَّر إلى <code>checked</code> لا إلى <code>value</code>، والتغيير يصل عبر <code>onCheckedChange</code>. ولأن مكوّن <code>Checkbox</code> مبني على عنصر <code>Radix</code> قد يكون في حالة وسطى، فنوع الوسيط ليس <code>boolean</code> خالصًا، ولذلك كتب الدرس <code>field.handleChange(checked === true)</code> ليضمن أن المخزن يستقبل قيمة منطقية فقط. وهذا أيضًا سبب استعمال <code>FieldContent</code> هنا: صفّ أفقي يجعل المربّع بجانب عنوانه بدل أن يعلوه.</p>
<h3 id="الأزرار-cansubmit-يبقى-الحكم">الأزرار: <code>canSubmit</code> يبقى الحكم</h3>
<p>لم يبقَ من HTML الخام شيء، حتى أزرار الإرسال:</p>
<pre><code class="language-tsx">          &lt;form.<span class="hljs-property">Subscribe</span> selector={<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">canSubmit</span>}&gt;
            {<span class="hljs-function">(<span class="hljs-params">canSubmit</span>) =&gt;</span> (
              <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
                  <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!canSubmit}</span>
                  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> form.handleSubmit({ submitAction: &quot;save&quot; })}
                &gt;
                  Save
                <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
                  <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!canSubmit}</span>
                  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> form.handleSubmit({ submitAction: &quot;goback&quot; })}
                &gt;
                  Save &amp; Go back
                <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            )}
          &lt;/form.<span class="hljs-property">Subscribe</span>&gt;
</code></pre>
<p><code>form.Subscribe</code> يشترك في <code>state.canSubmit</code> وحده، فلا يُعاد تصيير الأزرار مع كلّ حرف يُكتب في الاستمارة. و<code>Button</code> يمرّر خصائصه إلى زرّ HTML أصلي، فيبقى <code>type=&quot;submit&quot;</code> و<code>disabled</code> يعملان كما كانا، ويبقى <code>form.handleSubmit</code> هو المسؤول عن الإرسال مع حمولة مختلفة لكلّ زرّ. وفي الوقت نفسه تحمل أزرار المصفوفة — «Remove» و«Add Skill» — الخاصية <code>type=&quot;button&quot;</code>، وإلا لأرسلت الاستمارة كلّها عند حذف مهارة.</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-form/form--using-shadcn-components--form.png" alt="استمارة التسجيل بعد استبدال عناصرها بمكوّنات shadcn: حقول معنونة بوصف تحتها، وقائمة مهارات بقوائم منسدلة وأزرار حذف حمراء، وخانة موافقة، وزرّا إرسال، وأسفلها معاينة القيم"></p>
<p>في الصورة نرى الاستمارة في عمود ضيّق على خلفية داكنة، وقد صار لكلّ حقل عنوان بارز ووصف صغير باهت تحته: الاسم الأول، ثم الشارع، ثم كلمة السر، ثم تأكيدها. تحت عنوان «Skills» ظهرت المهارات الثلاث — <code>HTML</code> و<code>CSS</code> و<code>JavaScript</code> — كلّ واحدة في صفّ يحمل قائمة منسدلة تعرض <code>Beginner</code> وزرًّا أحمر «Remove»، ثم زرّ عريض «Add Skill» يمتدّ على عرض العمود. بعدها مربّع اختيار فارغ بجانب <code>Accept Terms</code>، ثم زرّان: <code>Save</code> و<code>Save &amp; Go back</code>. وأسفل الاستمارة تظهر معاينة القيم كـ<code>JSON</code>، وفيها <code>firstName</code> و<code>lastName</code> و<code>password</code> فارغة، والمهارات الثلاث بأسمائها ومعرّفاتها ومستواها <code>beginner</code>، و<code>acceptTerms</code> بقيمة <code>false</code>. ولاحظ أن حقل الاسم الأخير غائب عن الصورة: يظهر فقط بعد كتابة الاسم الأول، وقد كانت هذه الاستمارة فارغة عند التصوير.</p>
<p>المهم أن المظهر تغيّر كاملًا وبقي السلوك مطابقًا: نفس التحقّق، ونفس الربط، ونفس منع الإرسال قبل الموافقة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>استبدل محتوى <code>FieldError</code> بخاصية <code>errors</code> بدل النصّ المضموم: <code>errors={field.state.meta.errors}</code>، ثم أرسل الاستمارة فارغة وقارن ما يُعرض حين يخطئ حقل واحد وحين يخطئ حقلان.</li>
<li>احذف <code>onBlur</code> من <code>SelectTrigger</code>، أرسل الاستمارة، ثم غادر القائمة المنسدلة وعُد إليها؛ ستجد أن التحقّق عند المغادرة لم يعد يعمل.</li>
<li>اجعل زرّ «Remove» من نوع <code>type=&quot;submit&quot;</code> بدل <code>type=&quot;button&quot;</code>، ثم احذف مهارة وراقب إرسال الاستمارة. هذه أسرع طريقة لفهم لماذا يُحدَّد نوع كلّ زرّ صراحةً.</li>
<li>أضف <code>orientation=&quot;horizontal&quot;</code> إلى <code>Field</code> الخاصّ بالاسم الأول وراقب كيف ينتقل العنوان إلى جانب الحقل بفضل تنسيقات <code>Field</code> نفسها، بلا تعديل في منطق الاستمارة.</li>
<li>أضف <code>id</code> إلى <code>Checkbox</code> واجعله مطابقًا لـ<code>htmlFor</code> في عنوان «Accept Terms»، ثم انقر العنوان وتأكّد من تبديل المربّع.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=H2T21r5wu3g&amp;t=5718s">فيديو الدرس: Using shadcn Components</a></li>
<li><a href="https://github.com/alialaa/tanstack-form-course/tree/shadcn-components">شيفرة الدرس: فرع shadcn-components</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts">التوثيق الرسمي: المفاهيم الأساسية في TanStack Form</a></li>
<li><a href="https://tanstack.com/form/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Form</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Using shadcn Components» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي. وما أضافه المترجم من توضيح أو تنبيه لا يُنسب إلى المؤلف.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
