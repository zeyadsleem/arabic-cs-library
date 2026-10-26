const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="input-validation-with-zod",t="التحقق من المدخلات باستخدام Zod",p=[],o=`<p>أحد الأساليب الشائعة هو استخدام <a href="https://react-hook-form.com/">React Hook Form</a> مع <a href="https://zod.dev/">Zod</a>. ويقدّم React Hook Form دعمًا رسميًا لـ Zod عبر محلّل (resolver). ويبدو الإعداد هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useForm } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-hook-form&#x27;</span>;
<span class="hljs-keyword">import</span> { zodResolver } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hookform/resolvers/zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">FormSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">3</span>),
  <span class="hljs-attr">password</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">8</span>)
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormData</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">FormSchema</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyFormComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { register, handleSubmit, <span class="hljs-attr">formState</span>: { errors } } = useForm&lt;<span class="hljs-title class_">FormData</span>&gt;({
    <span class="hljs-attr">resolver</span>: <span class="hljs-title function_">zodResolver</span>(<span class="hljs-title class_">FormSchema</span>)
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">onSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">FormData</span></span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Valid form data:&quot;</span>, data);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit(onSubmit)}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> {…<span class="hljs-attr">register</span>(&quot;<span class="hljs-attr">username</span>&quot;)} <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Username&quot;</span> /&gt;</span>
      {errors.username &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{errors.username.message}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> {…<span class="hljs-attr">register</span>(&quot;<span class="hljs-attr">password</span>&quot;)} <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Password&quot;</span> /&gt;</span>
      {errors.password &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{errors.password.message}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Sign Up<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>في هذا المثال، يخبر <code>zodResolver(FormSchema)</code> مكتبة React Hook Form بأن تستخدم Zod للتحقق من قيم النموذج وفق <code>FormSchema</code>. وسيحتوي كائن <code>errors</code> على أي أخطاء تحقق (مع رسائلنا المخصّصة، إن وُفّرت في المخطط). ورسالة خطأ كل حقل متاحة بسهولة (مثل <code>errors.username.message</code>). ويضمن هذا الإعداد أنه عندما يرسل المستخدم النموذج (أو عند مغادرته الحقول، حسب الإعداد)، يعمل مخطط Zod إمّا فيسمح بالإضافة (مع كون <code>data</code> محدّدة الأنواع ومتحقَّقًا منها بالكامل) أو يعيد أخطاء يمكنك عرضها.</p>
<p>وميزة هذا الأسلوب هي <strong>مصدر حقيقة واحد</strong> للتحقق — إذ يمكن استخدام المخطط نفسه على الواجهة الخلفية للتحقق من البيانات الواردة. ويعني ذلك أيضًا ربطًا يدويًا أقل لرسائل الخطأ؛ فتمرّ رسائل Zod وأخطاؤه طبيعيًا إلى النموذج. علاوة على ذلك، بالتحقق على جانب العميل تحسّن تجربة المستخدم بالتقاط الأخطاء مبكرًا (مثل إظهار «يجب أن تتكوّن كلمة المرور من 8 أحرف على الأقل» بمجرد فشل الفحص) بدلًا من انتظار رحلة ذهاب وإياب إلى الخادم.</p>
<p>وحتى إن لم تكن تستخدم مكتبة نماذج، يمكنك مع ذلك استخدام Zod في React باستدعاء <code>schema.safeParse</code> يدويًا عند إرسال النموذج مثلًا. فمثلًا، يمكنك استخدام حالة مكوّن React لمدخلات النموذج، وعند الإرسال تنفّذ <code>const result = FormSchema.safeParse(formState)</code>. وإذا كان <code>result.success</code> مساويًا <code>false</code>، فاضبط رسائل الخطأ وفق ذلك؛ وإن كان <code>true</code>، فتابع. لكن مكتبات مثل React Hook Form تبسّط هذا بربطها بحالة المكوّن وإعادة تصييره نيابةً عنك.</p>
<p>يساعد Zod في الواجهة الأمامية على الحفاظ على <strong>أمان الأنواع واتساق التحقق</strong>. إذ تستفيد من قواعد التحقق القوية نفسها في المتصفح، ما يؤدي إلى تطبيقات أكثر مرونة. وبفضل تكاملات مثل محلّل React Hook Form، يصبح إعداده مريحًا جدًا — إذ تُوصِل مخططك فحسب وتترك المكتبة تتولّى الباقي.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:o};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,o as html,l as slug,t as title};
