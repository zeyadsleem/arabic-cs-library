const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-discriminated-unions",p="الأنواع الاتحادية المُميَّزة",t=[{depth:2,id:"ما-هي-الأنواع-الاتحادية-المميزة",text:"ما هي الأنواع الاتحادية المُميَّزة؟"},{depth:2,id:"لماذا-هي-قوية",text:"لماذا هي قويّة"},{depth:2,id:"مثال-واقعي-في-react",text:"مثال واقعي في React"},{depth:2,id:"جعل-الحالات-غير-الصالحة-مستحيلة",text:"جعل الحالات غير الصالحة مستحيلة"},{depth:2,id:"التعامل-مع-النماذج-عبر-الأنواع-الاتحادية-المميزة",text:"التعامل مع النماذج عبر الأنواع الاتحادية المُميَّزة"},{depth:2,id:"قواعد-التحقق-عبر-الأنواع-الاتحادية-المميزة",text:"قواعد التحقّق عبر الأنواع الاتحادية المُميَّزة"},{depth:2,id:"سير-عمل-إرسال-النموذج",text:"سير عمل إرسال النموذج"},{depth:2,id:"الأفعال-والمخفضات",text:"الأفعال والمخفّضات"},{depth:2,id:"عدة-مميزات",text:"عدّة مُميِّزات"},{depth:2,id:"أنواع-اتحادية-مميزة-متداخلة",text:"أنواع اتحادية مُميَّزة متداخلة"},{depth:2,id:"إدارة-حالة-الموجه-router",text:"إدارة حالة الموجّه (Router)"},{depth:2,id:"نمط-العمليات-غير-المتزامنة",text:"نمط العمليات غير المتزامنة"},{depth:2,id:"نماذج-المعالج-والنماذج-متعددة-الخطوات",text:"نماذج المعالج والنماذج متعددة الخطوات"},{depth:2,id:"مطابقة-الأنماط-عبر-المكتبات",text:"مطابقة الأنماط عبر المكتبات"},{depth:2,id:"اختبار-الأنواع-الاتحادية-المميزة",text:"اختبار الأنواع الاتحادية المُميَّزة"},{depth:2,id:"أنماط-شائعة-ونصائح",text:"أنماط شائعة ونصائح"},{depth:3,id:"اجعل-المميز-دائما-موجودا",text:"اجعل المُميِّز دائمًا موجودًا"},{depth:3,id:"استخدم-الأنواع-الحرفية-للمميزات",text:"استخدم الأنواع الحرفية للمُميِّزات"},{depth:3,id:"أبق-البيانات-المترابطة-معا",text:"أبقِ البيانات المترابطة معًا"},{depth:3,id:"استخدم-الفحوصات-الشاملة",text:"استخدم الفحوصات الشاملة"},{depth:2,id:"متقدم-بناء-آلة-حالات",text:"متقدّم: بناء آلة حالات"},{depth:2,id:"خصائص-حصرية-من-دون-مميزات",text:"خصائص حصرية من دون مُميِّزات"},{depth:2,id:"أنماط-react-متقدمة",text:"أنماط React متقدّمة"},{depth:3,id:"اتحادات-حقول-النماذج",text:"اتحادات حقول النماذج"},{depth:3,id:"مكون-زر-بتنويعات",text:"مكوّن زر بتنويعات"},{depth:2,id:"التحقق-وقت-التشغيل-مع-zod",text:"التحقّق وقت التشغيل مع Zod"},{depth:3,id:"التحقق-وقت-التشغيل-لحالة-الواجهة-غير-المتزامنة",text:"التحقّق وقت التشغيل لحالة الواجهة غير المتزامنة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"الأخطاء-الشائعة",text:"الأخطاء الشائعة"},{depth:3,id:"نسيان-المميز",text:"نسيان المُميِّز"},{depth:3,id:"جعل-المميزات-اختيارية",text:"جعل المُميِّزات اختيارية"},{depth:3,id:"تعقيد-الحالات-البسيطة",text:"تعقيد الحالات البسيطة"},{depth:2,id:"متى-تستخدم-كل-نمط",text:"متى تستخدم كل نمط"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>إن كان هناك نمط واحد في TypeScript سيغيّر نظرتك إلى إدارة الحالة في React، فهو الأنواع الاتحادية المُميَّزة. فهي السلاح السريّ لجعل الحالات غير الصالحة مستحيلةَ التمثيل، وستوفّر عليك عددًا لا يُحصى من الأخطاء. فلنغوص بعمق في هذا النمط تغيير قواعد اللعبة.</p>
<h2 id="ما-هي-الأنواع-الاتحادية-المميزة">ما هي الأنواع الاتحادية المُميَّزة؟</h2>
<p>النوع الاتحادي المُميَّز (ويُعرف أيضًا بالاتحاد المُوسوم) هو نمطٌ تستخدم فيه خاصيةً مشتركة للتمييز بين أشكال مختلفة من البيانات. تخيّله طريقة TypeScript في القول: «هذا الشيء يمكن أن يكون واحدًا من عدّة أشكال محدّدة، وسأساعدك في معرفة أيّها هو».</p>
<pre><code class="language-typescript"><span class="hljs-comment">// This is a discriminated union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// The &#x27;type&#x27; field is the discriminator</span>
</code></pre>
<blockquote>
<p><strong>ما الفرق بين النوع الاتحادي والنوع الاتحادي المُميَّز؟</strong></p>
<p>في TypeScript، النوع الاتحادي ليس سوى طريقة لقول إنّ القيمة يمكن أن تكون واحدًا من عدّة أنواع مختلفة — فمثلًا <code>string | number</code> يعني أنّ القيمة قد تكون نصًّا أو عددًا، لكنّ TypeScript لا يعرف أيّهما هي في كل لحظة بطبيعتها. أما النوع الاتحادي المُميَّز (ويسمى أحيانًا الاتحاد المُوسوم) فيضيف خاصيةً مشتركة خاصّة، عادةً نوعًا حرفيًا مثل <code>kind: &quot;circle&quot; | &quot;square&quot;</code>، تعمل كوسمٍ يخبر المُصرِّف (وأنت) أيّ فرعٍ من الاتحاد تعمل عليه. ويتيح هذا «المُميِّز» لـ TypeScript تضييق النوع تلقائيًا وبأمانٍ عند فحصك قيمة تلك الخاصية، ما يجعل الأنواع الاتحادية المُميَّزة أقوى بكثير في نمذجة البيانات البنيوية وضمان الفحص الشامل.</p>
</blockquote>
<h2 id="لماذا-هي-قوية">لماذا هي قويّة</h2>
<p>يحدث السحر حين يستخدم TypeScript المُميِّز لتضييق النوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handleStatus</span>(<span class="hljs-params"><span class="hljs-attr">status</span>: <span class="hljs-title class_">Status</span></span>) {
  <span class="hljs-keyword">switch</span> (status.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows status is { type: &#x27;idle&#x27; }</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Ready to start&#x27;</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows status is { type: &#x27;loading&#x27; }</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Loading...&#x27;</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows status is { type: &#x27;success&#x27;; data: string }</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`Success: <span class="hljs-subst">\${status.data}</span>\`</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows status is { type: &#x27;error&#x27;; message: string }</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`Error: <span class="hljs-subst">\${status.message}</span>\`</span>;
  }
}
</code></pre>
<h2 id="مثال-واقعي-في-react">مثال واقعي في React</h2>
<p>لنبنِ مكوّنًا لجلب البيانات يستخدم الأنواع الاتحادية المُميَّزة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define our state shape</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FetchState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// Custom hook using the discriminated union</span>
<span class="hljs-keyword">function</span> useFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">FetchState</span>&lt;T&gt; {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">FetchState</span>&lt;T&gt;&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
        }
        <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-title function_">setState</span>({
          <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
          <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>)
        });
      }
    };

    <span class="hljs-title function_">fetchData</span>();
  }, [url]);

  <span class="hljs-keyword">return</span> state;
}

<span class="hljs-comment">// Component using the hook</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserProfile</span> = (<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) =&gt; {
  <span class="hljs-keyword">const</span> userState = useFetch&lt;<span class="hljs-title class_">User</span>&gt;(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>);

  <span class="hljs-keyword">switch</span> (userState.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Ready to load user<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows userState.data exists and is a User</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{userState.data.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{userState.data.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows userState.error exists</span>
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {userState.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// This ensures we handle all cases</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = userState;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled state: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
};
</code></pre>
<h2 id="جعل-الحالات-غير-الصالحة-مستحيلة">جعل الحالات غير الصالحة مستحيلة</h2>
<p>إليك القوة الحقيقية — الأنواع الاتحادية المُميَّزة تمنع الحالات غير الصالحة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Multiple booleans lead to invalid states</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BadState</span> {
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: <span class="hljs-title class_">User</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}
<span class="hljs-comment">// What if isLoading AND isError are both true?</span>
<span class="hljs-comment">// What if we have data AND error?</span>

<span class="hljs-comment">// ✅ Good: Discriminated union makes invalid states impossible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GoodState</span> =
  { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> } | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> } | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">User</span> };
<span class="hljs-comment">// Can&#x27;t be loading AND error</span>
<span class="hljs-comment">// Can&#x27;t have data without success</span>
<span class="hljs-comment">// Can&#x27;t have error without error status</span>
</code></pre>
<h2 id="التعامل-مع-النماذج-عبر-الأنواع-الاتحادية-المميزة">التعامل مع النماذج عبر الأنواع الاتحادية المُميَّزة</h2>
<p>النماذج مثالية للأنواع الاتحادية المُميَّزة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormField</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;empty&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validating&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;valid&#x27;</span>; <span class="hljs-attr">value</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;invalid&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">value</span>?: T };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginForm</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-title class_">FormField</span>&lt;<span class="hljs-built_in">string</span>&gt;;
  <span class="hljs-attr">password</span>: <span class="hljs-title class_">FormField</span>&lt;<span class="hljs-built_in">string</span>&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">LoginComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [form, setForm] = useState&lt;<span class="hljs-title class_">LoginForm</span>&gt;({
    <span class="hljs-attr">email</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;empty&#x27;</span> },
    <span class="hljs-attr">password</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;empty&#x27;</span> }
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">validateEmail</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setForm</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({
      ...prev,
      <span class="hljs-attr">email</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validating&#x27;</span> }
    }));

    <span class="hljs-comment">// Simulate async validation</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">500</span>));

    <span class="hljs-keyword">if</span> (!email.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) {
      <span class="hljs-title function_">setForm</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({
        ...prev,
        <span class="hljs-attr">email</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;invalid&#x27;</span>, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid email format&#x27;</span>, <span class="hljs-attr">value</span>: email }
      }));
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">setForm</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({
        ...prev,
        <span class="hljs-attr">email</span>: { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;valid&#x27;</span>, <span class="hljs-attr">value</span>: email }
      }));
    }
  };

  <span class="hljs-keyword">const</span> canSubmit =
    form.<span class="hljs-property">email</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;valid&#x27;</span> &amp;&amp;
    form.<span class="hljs-property">password</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;valid&#x27;</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{e</span> =&gt;</span> validateEmail(e.target.value)}
          className={form.email.status === &#x27;invalid&#x27; ? &#x27;error&#x27; : &#x27;&#x27;}
        /&gt;
        {form.email.status === &#x27;invalid&#x27; &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-message&quot;</span>&gt;</span>{form.email.error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        )}
        {form.email.status === &#x27;validating&#x27; &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;validating&quot;</span>&gt;</span>Checking...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!canSubmit}</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="قواعد-التحقق-عبر-الأنواع-الاتحادية-المميزة">قواعد التحقّق عبر الأنواع الاتحادية المُميَّزة</h2>
<p>يمكنك أيضًا نمذجة قواعد التحقّق كنوع اتحادي مُميَّز للحصول على معالجة واضحة وشاملة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidationRule</span>&lt;T&gt; =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;required&#x27;</span>; <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;minLength&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;maxLength&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;pattern&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-title class_">RegExp</span>; <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;custom&#x27;</span>; <span class="hljs-attr">validate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span> | <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">function</span> validateField&lt;T&gt;(<span class="hljs-attr">value</span>: T, <span class="hljs-attr">rules</span>: <span class="hljs-title class_">ValidationRule</span>&lt;T&gt;[]): <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> rule <span class="hljs-keyword">of</span> rules) {
    <span class="hljs-keyword">switch</span> (rule.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;required&#x27;</span>:
        <span class="hljs-keyword">if</span> (!value) {
          <span class="hljs-keyword">return</span> rule.<span class="hljs-property">message</span> || <span class="hljs-string">&#x27;This field is required&#x27;</span>;
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;minLength&#x27;</span>:
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp; value.<span class="hljs-property">length</span> &lt; rule.<span class="hljs-property">value</span>) {
          <span class="hljs-keyword">return</span> rule.<span class="hljs-property">message</span> || <span class="hljs-string">\`Minimum length is <span class="hljs-subst">\${rule.value}</span>\`</span>;
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;maxLength&#x27;</span>:
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp; value.<span class="hljs-property">length</span> &gt; rule.<span class="hljs-property">value</span>) {
          <span class="hljs-keyword">return</span> rule.<span class="hljs-property">message</span> || <span class="hljs-string">\`Maximum length is <span class="hljs-subst">\${rule.value}</span>\`</span>;
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;pattern&#x27;</span>:
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp; !rule.<span class="hljs-property">value</span>.<span class="hljs-title function_">test</span>(value)) {
          <span class="hljs-keyword">return</span> rule.<span class="hljs-property">message</span> || <span class="hljs-string">&#x27;Invalid format&#x27;</span>;
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;custom&#x27;</span>:
        <span class="hljs-keyword">const</span> result = rule.<span class="hljs-title function_">validate</span>(value);
        <span class="hljs-keyword">if</span> (result !== <span class="hljs-literal">true</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> result === <span class="hljs-string">&#x27;string&#x27;</span> ? result : <span class="hljs-string">&#x27;Validation failed&#x27;</span>;
        }
        <span class="hljs-keyword">break</span>;
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="سير-عمل-إرسال-النموذج">سير عمل إرسال النموذج</h2>
<p>كثيرًا ما تستفيد سير العمل للنموذج بالكامل من حالات موسومة مثل التحقّق، وخطأ التحقّق، والإرسال، والنجاح، والخطأ.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validating&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validation-error&#x27;</span>; <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">string</span>[]&gt; }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;submitting&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">result</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginForm</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LoginForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">FormState</span>&lt;<span class="hljs-title class_">LoginForm</span>&gt;&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });
  <span class="hljs-keyword">const</span> [formData, setFormData] = useState&lt;<span class="hljs-title class_">LoginForm</span>&gt;({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span> });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validating&#x27;</span> });

    <span class="hljs-keyword">const</span> errors = <span class="hljs-title function_">validateForm</span>(formData);
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;validation-error&#x27;</span>, errors });
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;submitting&#x27;</span>, <span class="hljs-attr">data</span>: formData });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">submitLogin</span>(formData);
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, result });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-title class_">String</span>(error) });
    }
  };

  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;validating&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span> <span class="hljs-attr">aria-busy</span>=<span class="hljs-string">{state.status</span> === <span class="hljs-string">&#x27;validating&#x27;</span>}&gt;</span>
          {/* inputs omitted for brevity */}
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{state.status</span> === <span class="hljs-string">&#x27;validating&#x27;</span>}&gt;</span>
            {state.status === &#x27;validating&#x27; ? &#x27;Validating…&#x27; : &#x27;Login&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
      );
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;validation-error&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorsList</span> <span class="hljs-attr">errors</span>=<span class="hljs-string">{state.errors}</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submitting&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> <span class="hljs-attr">label</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">Submitting</span> <span class="hljs-attr">for</span> \${<span class="hljs-attr">state.data.email</span>}…\`} /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Success</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{state.result}</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBanner</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{state.error}</span> /&gt;</span></span>;
  }
}
</code></pre>
<h2 id="الأفعال-والمخفضات">الأفعال والمخفّضات</h2>
<p>تتألّق الأنواع الاتحادية المُميَّزة في المخفّضات بأسلوب Redux:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Action types using discriminated unions</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CartAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>; <span class="hljs-attr">item</span>: <span class="hljs-title class_">Product</span>; <span class="hljs-attr">quantity</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REMOVE_ITEM&#x27;</span>; <span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_QUANTITY&#x27;</span>; <span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">quantity</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CLEAR_CART&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;APPLY_DISCOUNT&#x27;</span>; <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">percentage</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CHECKOUT_START&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CHECKOUT_SUCCESS&#x27;</span>; <span class="hljs-attr">orderId</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CHECKOUT_FAILURE&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CartState</span> {
  <span class="hljs-attr">items</span>: <span class="hljs-title class_">CartItem</span>[];
  <span class="hljs-attr">discount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">checkoutStatus</span>: <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;processing&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">orderId</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> cartReducer = (<span class="hljs-attr">state</span>: <span class="hljs-title class_">CartState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CartAction</span>): <span class="hljs-function"><span class="hljs-params">CartState</span> =&gt;</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has item and quantity</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">items</span>: [
          ...state.<span class="hljs-property">items</span>,
          {
            <span class="hljs-attr">product</span>: action.<span class="hljs-property">item</span>,
            <span class="hljs-attr">quantity</span>: action.<span class="hljs-property">quantity</span>,
          },
        ],
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;REMOVE_ITEM&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has productId</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">items</span>: state.<span class="hljs-property">items</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">product</span>.<span class="hljs-property">id</span> !== action.<span class="hljs-property">productId</span>),
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;UPDATE_QUANTITY&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has productId and quantity</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">items</span>: state.<span class="hljs-property">items</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
          item.<span class="hljs-property">product</span>.<span class="hljs-property">id</span> === action.<span class="hljs-property">productId</span> ? { ...item, <span class="hljs-attr">quantity</span>: action.<span class="hljs-property">quantity</span> } : item,
        ),
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;APPLY_DISCOUNT&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has code and percentage</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">discount</span>: action.<span class="hljs-property">percentage</span>,
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;CHECKOUT_SUCCESS&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has orderId</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">checkoutStatus</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
        <span class="hljs-attr">orderId</span>: action.<span class="hljs-property">orderId</span>,
        <span class="hljs-attr">items</span>: [],
      };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;CHECKOUT_FAILURE&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows action has error</span>
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">checkoutStatus</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-attr">error</span>: action.<span class="hljs-property">error</span>,
      };

    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// Exhaustiveness check</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">return</span> state;
  }
};
</code></pre>
<h2 id="عدة-مميزات">عدّة مُميِّزات</h2>
<p>أحيانًا تحتاج إلى حقول متعدّدة للتمييز:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">NotificationStyle</span> = <span class="hljs-string">&#x27;banner&#x27;</span> | <span class="hljs-string">&#x27;toast&#x27;</span> | <span class="hljs-string">&#x27;modal&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NotificationLevel</span> = <span class="hljs-string">&#x27;info&#x27;</span> | <span class="hljs-string">&#x27;warning&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Notification</span> =
  | { <span class="hljs-attr">style</span>: <span class="hljs-string">&#x27;banner&#x27;</span>; <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;info&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">style</span>: <span class="hljs-string">&#x27;banner&#x27;</span>; <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;warning&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">dismissible</span>: <span class="hljs-built_in">boolean</span> }
  | { <span class="hljs-attr">style</span>: <span class="hljs-string">&#x27;toast&#x27;</span>; <span class="hljs-attr">level</span>: <span class="hljs-title class_">NotificationLevel</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">style</span>: <span class="hljs-string">&#x27;modal&#x27;</span>; <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">details</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">onConfirm</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">renderNotification</span>(<span class="hljs-params"><span class="hljs-attr">notification</span>: <span class="hljs-title class_">Notification</span></span>) {
  <span class="hljs-keyword">if</span> (notification.<span class="hljs-property">style</span> === <span class="hljs-string">&#x27;banner&#x27;</span>) {
    <span class="hljs-keyword">if</span> (notification.<span class="hljs-property">level</span> === <span class="hljs-string">&#x27;warning&#x27;</span>) {
      <span class="hljs-comment">// TypeScript knows dismissible exists</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Banner</span> <span class="hljs-attr">warning</span> <span class="hljs-attr">dismissible</span>=<span class="hljs-string">{notification.dismissible}</span>&gt;</span>
          {notification.message}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Banner</span>&gt;</span></span>
      );
    }
    <span class="hljs-comment">// info banner</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Banner</span>&gt;</span>{notification.message}<span class="hljs-tag">&lt;/<span class="hljs-name">Banner</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (notification.<span class="hljs-property">style</span> === <span class="hljs-string">&#x27;toast&#x27;</span>) {
    <span class="hljs-comment">// TypeScript knows duration exists</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Toast</span> <span class="hljs-attr">level</span>=<span class="hljs-string">{notification.level}</span> <span class="hljs-attr">duration</span>=<span class="hljs-string">{notification.duration}</span>&gt;</span>
        {notification.message}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Toast</span>&gt;</span></span>
    );
  }

  <span class="hljs-comment">// Must be modal with error</span>
  <span class="hljs-comment">// TypeScript knows details and onConfirm exist</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">onConfirm</span>=<span class="hljs-string">{notification.onConfirm}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Error<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{notification.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>{notification.details}<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنواع-اتحادية-مميزة-متداخلة">أنواع اتحادية مُميَّزة متداخلة</h2>
<p>يمكنك تداخل الأنواع الاتحادية المُميَّزة للحالات المعقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ConnectionState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;disconnected&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;connecting&#x27;</span>; <span class="hljs-attr">attempt</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;connected&#x27;</span>; <span class="hljs-attr">socket</span>: <span class="hljs-title class_">WebSocket</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>; <span class="hljs-attr">canRetry</span>: <span class="hljs-built_in">boolean</span> };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DataState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;fetching&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppState</span>&lt;T&gt; {
  <span class="hljs-attr">connection</span>: <span class="hljs-title class_">ConnectionState</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">DataState</span>&lt;T&gt;;
}

<span class="hljs-keyword">function</span> getStatusMessage&lt;T&gt;(<span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span>&lt;T&gt;): <span class="hljs-built_in">string</span> {
  <span class="hljs-comment">// Handle connection state</span>
  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">connection</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;disconnected&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Disconnected from server&#x27;</span>;
  }

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">connection</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;connecting&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`Connecting... (attempt <span class="hljs-subst">\${state.connection.attempt}</span>)\`</span>;
  }

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">connection</span>.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>) {
    <span class="hljs-keyword">return</span> state.<span class="hljs-property">connection</span>.<span class="hljs-property">canRetry</span>
      ? <span class="hljs-string">&#x27;Connection failed. Retrying...&#x27;</span>
      : <span class="hljs-string">&#x27;Connection failed. Please refresh.&#x27;</span>;
  }

  <span class="hljs-comment">// Connected - check data state</span>
  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">data</span>.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Connected. Ready to load data.&#x27;</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;fetching&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Loading data...&#x27;</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`Data updated at <span class="hljs-subst">\${state.data.updatedAt.toLocaleTimeString()}</span>\`</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`Error loading data: <span class="hljs-subst">\${state.data.error.message}</span>\`</span>;
  }
}
</code></pre>
<h2 id="إدارة-حالة-الموجه-router">إدارة حالة الموجّه (Router)</h2>
<p>الأنواع الاتحادية المُميَّزة مثالية للتوجيه (routing):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Route</span> =
  | { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;home&#x27;</span> }
  | { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;profile&#x27;</span>; <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;post&#x27;</span>; <span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">section</span>?: <span class="hljs-string">&#x27;comments&#x27;</span> | <span class="hljs-string">&#x27;edit&#x27;</span> }
  | { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;search&#x27;</span>; <span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">filters</span>: <span class="hljs-title class_">SearchFilters</span> }
  | { <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;not-found&#x27;</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouterState</span> {
  <span class="hljs-attr">current</span>: <span class="hljs-title class_">Route</span>;
  <span class="hljs-attr">previous</span>?: <span class="hljs-title class_">Route</span>;
  <span class="hljs-attr">isTransitioning</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Router</span> = (<span class="hljs-params">{ state }: { state: RouterState }</span>) =&gt; {
  <span class="hljs-keyword">const</span> { current } = state;

  <span class="hljs-keyword">switch</span> (current.<span class="hljs-property">path</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;home&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">HomePage</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;profile&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows userId exists</span>
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProfilePage</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{current.userId}</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;post&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows postId and optional section exist</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PostPage</span>
          <span class="hljs-attr">postId</span>=<span class="hljs-string">{current.postId}</span>
          <span class="hljs-attr">section</span>=<span class="hljs-string">{current.section}</span>
        /&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;search&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows query and filters exist</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SearchPage</span>
          <span class="hljs-attr">query</span>=<span class="hljs-string">{current.query}</span>
          <span class="hljs-attr">filters</span>=<span class="hljs-string">{current.filters}</span>
        /&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;not-found&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">NotFoundPage</span> /&gt;</span></span>;

    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = current;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled route: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
};
</code></pre>
<h2 id="نمط-العمليات-غير-المتزامنة">نمط العمليات غير المتزامنة</h2>
<p>إليك نمطًا قابلًا لإعادة الاستخدام للعمليات غير المتزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncOperation</span>&lt;<span class="hljs-title class_">TParams</span>, <span class="hljs-title class_">TResult</span>&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-attr">params</span>: <span class="hljs-title class_">TParams</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">params</span>: <span class="hljs-title class_">TParams</span>; <span class="hljs-attr">result</span>: <span class="hljs-title class_">TResult</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;failure&#x27;</span>; <span class="hljs-attr">params</span>: <span class="hljs-title class_">TParams</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>; <span class="hljs-attr">canRetry</span>: <span class="hljs-built_in">boolean</span> };

<span class="hljs-comment">// Generic hook for async operations</span>
<span class="hljs-keyword">function</span> useAsyncOperation&lt;<span class="hljs-title class_">TParams</span>, <span class="hljs-title class_">TResult</span>&gt;(
  <span class="hljs-attr">operation</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">params</span>: <span class="hljs-title class_">TParams</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">TResult</span>&gt;
) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AsyncOperation</span>&lt;<span class="hljs-title class_">TParams</span>, <span class="hljs-title class_">TResult</span>&gt;&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span>
  });

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">params</span>: <span class="hljs-title class_">TParams</span>) =&gt; {
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>, params });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">operation</span>(params);
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
        params,
        result,
        <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()
      });
      <span class="hljs-keyword">return</span> result;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;failure&#x27;</span>,
        params,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>),
        <span class="hljs-attr">canRetry</span>: <span class="hljs-literal">true</span>
      });
      <span class="hljs-keyword">throw</span> error;
    }
  }, [operation]);

  <span class="hljs-keyword">const</span> retry = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;failure&#x27;</span> &amp;&amp; state.<span class="hljs-property">canRetry</span>) {
      <span class="hljs-title function_">execute</span>(state.<span class="hljs-property">params</span>);
    }
  }, [state, execute]);

  <span class="hljs-keyword">return</span> { state, execute, retry };
}

<span class="hljs-comment">// Using the hook</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">SaveButton</span> = (<span class="hljs-params">{ data }: { data: FormData }</span>) =&gt; {
  <span class="hljs-keyword">const</span> { state, execute, retry } = <span class="hljs-title function_">useAsyncOperation</span>(saveData);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSave</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">execute</span>(data);

  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSave}</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;pending&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>&gt;</span>Saving...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          ✓ Saved at {state.timestamp.toLocaleTimeString()}
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSave}</span>&gt;</span>Save Again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;failure&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>Failed: {state.error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          {state.canRetry &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{retry}</span>&gt;</span>Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
  }
};
</code></pre>
<h2 id="نماذج-المعالج-والنماذج-متعددة-الخطوات">نماذج المعالج والنماذج متعددة الخطوات</h2>
<p>الأنواع الاتحادية المُميَّزة تتفوّق في العمليات متعددة الخطوات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">WizardStep</span> =
  | { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;personal&#x27;</span>; <span class="hljs-attr">data</span>?: <span class="hljs-title class_">PersonalData</span> }
  | { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;contact&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">PersonalData</span> }
  | { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;preferences&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">PersonalData</span> &amp; <span class="hljs-title class_">ContactData</span> }
  | { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;review&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">PersonalData</span> &amp; <span class="hljs-title class_">ContactData</span> &amp; <span class="hljs-title class_">PreferencesData</span> }
  | { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;complete&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">CompleteProfile</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WizardState</span> {
  <span class="hljs-attr">current</span>: <span class="hljs-title class_">WizardStep</span>;
  <span class="hljs-attr">history</span>: <span class="hljs-title class_">WizardStep</span>[];
  <span class="hljs-attr">validationErrors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">ProfileWizard</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">WizardState</span>&gt;({
    <span class="hljs-attr">current</span>: { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;personal&#x27;</span> },
    <span class="hljs-attr">history</span>: []
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">goToNext</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> { current } = state;

    <span class="hljs-keyword">switch</span> (current.<span class="hljs-property">step</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;personal&#x27;</span>:
        <span class="hljs-comment">// Validate and collect personal data</span>
        <span class="hljs-keyword">const</span> personalData = <span class="hljs-title function_">validatePersonalData</span>();
        <span class="hljs-keyword">if</span> (personalData) {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">current</span>: { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;contact&#x27;</span>, <span class="hljs-attr">data</span>: personalData },
            <span class="hljs-attr">history</span>: [...state.<span class="hljs-property">history</span>, current]
          });
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;contact&#x27;</span>:
        <span class="hljs-comment">// Current.data is PersonalData</span>
        <span class="hljs-keyword">const</span> contactData = <span class="hljs-title function_">validateContactData</span>();
        <span class="hljs-keyword">if</span> (contactData) {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">current</span>: {
              <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;preferences&#x27;</span>,
              <span class="hljs-attr">data</span>: { ...current.<span class="hljs-property">data</span>, ...contactData }
            },
            <span class="hljs-attr">history</span>: [...state.<span class="hljs-property">history</span>, current]
          });
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;preferences&#x27;</span>:
        <span class="hljs-comment">// Current.data is PersonalData &amp; ContactData</span>
        <span class="hljs-keyword">const</span> prefsData = <span class="hljs-title function_">validatePreferencesData</span>();
        <span class="hljs-keyword">if</span> (prefsData) {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">current</span>: {
              <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;review&#x27;</span>,
              <span class="hljs-attr">data</span>: { ...current.<span class="hljs-property">data</span>, ...prefsData }
            },
            <span class="hljs-attr">history</span>: [...state.<span class="hljs-property">history</span>, current]
          });
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;review&#x27;</span>:
        <span class="hljs-comment">// Current.data is complete</span>
        <span class="hljs-title function_">submitProfile</span>(current.<span class="hljs-property">data</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">current</span>: { <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;complete&#x27;</span>, <span class="hljs-attr">data</span>: result },
            <span class="hljs-attr">history</span>: [...state.<span class="hljs-property">history</span>, current]
          });
        });
        <span class="hljs-keyword">break</span>;
    }
  };

  <span class="hljs-comment">// Render appropriate step</span>
  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">current</span>.<span class="hljs-property">step</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;personal&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PersonalInfoForm</span> <span class="hljs-attr">onNext</span>=<span class="hljs-string">{goToNext}</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;contact&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ContactInfoForm</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{state.current.data}</span> <span class="hljs-attr">onNext</span>=<span class="hljs-string">{goToNext}</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;preferences&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PreferencesForm</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{state.current.data}</span> <span class="hljs-attr">onNext</span>=<span class="hljs-string">{goToNext}</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;review&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReviewStep</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{state.current.data}</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{goToNext}</span> /&gt;</span></span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;complete&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SuccessMessage</span> <span class="hljs-attr">profile</span>=<span class="hljs-string">{state.current.data}</span> /&gt;</span></span>;
  }
};
</code></pre>
<h2 id="مطابقة-الأنماط-عبر-المكتبات">مطابقة الأنماط عبر المكتبات</h2>
<p>رغم أنّ TypeScript لا يملك مطابقة أنماط مدمجة، فإنّ مكتبات مثل <code>ts-pattern</code> تجعلها أقوى بكثير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { match } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;ts-pattern&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span>&lt;T, E&gt; = { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ok&#x27;</span>; <span class="hljs-attr">value</span>: T } | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: E };

<span class="hljs-keyword">const</span> processResult = &lt;T, E&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-title class_">Result</span>&lt;T, E&gt;</span>) =&gt;</span>
  <span class="hljs-title function_">match</span>(result)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ok&#x27;</span> }, <span class="hljs-function">(<span class="hljs-params">{ value }</span>) =&gt;</span> <span class="hljs-string">\`Success: <span class="hljs-subst">\${value}</span>\`</span>)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;error&#x27;</span> }, <span class="hljs-function">(<span class="hljs-params">{ error }</span>) =&gt;</span> <span class="hljs-string">\`Error: <span class="hljs-subst">\${error}</span>\`</span>)
    .<span class="hljs-title function_">exhaustive</span>();

<span class="hljs-comment">// More complex matching</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Event</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;click&#x27;</span>; <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;keypress&#x27;</span>; <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">shift</span>: <span class="hljs-built_in">boolean</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;scroll&#x27;</span>; <span class="hljs-attr">delta</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleEvent</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">Event</span></span>) =&gt;
  <span class="hljs-title function_">match</span>(event)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-attr">x</span>: P.<span class="hljs-property">number</span>, <span class="hljs-attr">y</span>: P.<span class="hljs-property">number</span> }, <span class="hljs-function">(<span class="hljs-params">{ x, y }</span>) =&gt;</span> <span class="hljs-string">\`Clicked at (<span class="hljs-subst">\${x}</span>, <span class="hljs-subst">\${y}</span>)\`</span>)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;keypress&#x27;</span>, <span class="hljs-attr">shift</span>: <span class="hljs-literal">true</span> }, <span class="hljs-function">(<span class="hljs-params">{ key }</span>) =&gt;</span> <span class="hljs-string">\`Shift+<span class="hljs-subst">\${key}</span> pressed\`</span>)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;keypress&#x27;</span> }, <span class="hljs-function">(<span class="hljs-params">{ key }</span>) =&gt;</span> <span class="hljs-string">\`<span class="hljs-subst">\${key}</span> pressed\`</span>)
    .<span class="hljs-title function_">with</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;scroll&#x27;</span> }, <span class="hljs-function">(<span class="hljs-params">{ delta }</span>) =&gt;</span> <span class="hljs-string">\`Scrolled <span class="hljs-subst">\${delta}</span>px\`</span>)
    .<span class="hljs-title function_">exhaustive</span>();
</code></pre>
<h2 id="اختبار-الأنواع-الاتحادية-المميزة">اختبار الأنواع الاتحادية المُميَّزة</h2>
<p>تجعل الأنواع الاتحادية المُميَّزة الاختبار أسهل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Easy to test each state</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserProfile&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;shows loading state&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">FetchState</span>&lt;<span class="hljs-title class_">User</span>&gt; = { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> };
    <span class="hljs-keyword">const</span> { getByText } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserDisplay</span> <span class="hljs-attr">state</span>=<span class="hljs-string">{state}</span> /&gt;</span></span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Loading...&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;shows user data on success&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">FetchState</span>&lt;<span class="hljs-title class_">User</span>&gt; = {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
      <span class="hljs-attr">data</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span> }
    };
    <span class="hljs-keyword">const</span> { getByText } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserDisplay</span> <span class="hljs-attr">state</span>=<span class="hljs-string">{state}</span> /&gt;</span></span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;shows error message on failure&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">FetchState</span>&lt;<span class="hljs-title class_">User</span>&gt; = {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>)
    };
    <span class="hljs-keyword">const</span> { getByText } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserDisplay</span> <span class="hljs-attr">state</span>=<span class="hljs-string">{state}</span> /&gt;</span></span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<h2 id="أنماط-شائعة-ونصائح">أنماط شائعة ونصائح</h2>
<h3 id="اجعل-المميز-دائما-موجودا">اجعل المُميِّز دائمًا موجودًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - has discriminator</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Shape</span> = { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;circle&#x27;</span>; <span class="hljs-attr">radius</span>: <span class="hljs-built_in">number</span> } | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;square&#x27;</span>; <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-comment">// ❌ Bad - no discriminator</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Shape</span> = { <span class="hljs-attr">radius</span>: <span class="hljs-built_in">number</span> } | { <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span> };
<span class="hljs-comment">// TypeScript can&#x27;t easily tell these apart</span>
</code></pre>
<h3 id="استخدم-الأنواع-الحرفية-للمميزات">استخدم الأنواع الحرفية للمُميِّزات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - literal types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;success&#x27;</span> } | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;error&#x27;</span> };

<span class="hljs-comment">// ❌ Bad - using boolean</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span> };
<span class="hljs-comment">// Harder to extend and less clear</span>
</code></pre>
<h3 id="أبق-البيانات-المترابطة-معا">أبقِ البيانات المترابطة معًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - error with its message</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span> = { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// ❌ Bad - separate optional fields</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Result</span> {
  <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">data</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">errorMessage</span>?: <span class="hljs-built_in">string</span>;
}
</code></pre>
<h3 id="استخدم-الفحوصات-الشاملة">استخدم الفحوصات الشاملة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;a&#x27;</span> | <span class="hljs-string">&#x27;b&#x27;</span> | <span class="hljs-string">&#x27;c&#x27;</span></span>) {
  <span class="hljs-keyword">switch</span> (value) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;a&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;b&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;c&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// This ensures we handle all cases</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = value;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled value: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
}
</code></pre>
<h2 id="متقدم-بناء-آلة-حالات">متقدّم: بناء آلة حالات</h2>
<p>الأنواع الاتحادية المُميَّزة مثالية لآلات الحالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">TrafficLightState</span> =
  | { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>; <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;green&#x27;</span> }
  | { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;yellow&#x27;</span>; <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;red&#x27;</span> }
  | { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;green&#x27;</span>; <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;yellow&#x27;</span> };

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TrafficLight</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">TrafficLightState</span> = {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>,
    <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;green&#x27;</span>
  };

  <span class="hljs-title function_">transition</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">switch</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">color</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;red&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;green&#x27;</span>, <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;yellow&#x27;</span> };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;green&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;yellow&#x27;</span>, <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;red&#x27;</span> };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;yellow&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-attr">canWalk</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;green&#x27;</span> };
        <span class="hljs-keyword">break</span>;
    }
  }

  <span class="hljs-title function_">getState</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;
  }
}

<span class="hljs-comment">// React component using the state machine</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">TrafficLightComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [light] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TrafficLight</span>());
  <span class="hljs-keyword">const</span> [, forceUpdate] = <span class="hljs-title function_">useReducer</span>(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      light.<span class="hljs-title function_">transition</span>();
      <span class="hljs-title function_">forceUpdate</span>();
    }, <span class="hljs-number">2000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, [light]);

  <span class="hljs-keyword">const</span> state = light.<span class="hljs-title function_">getState</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">light</span> \${<span class="hljs-attr">state.color</span>}\`} /&gt;</span>
      {state.canWalk &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>🚶 Walk<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Next: {state.next}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="خصائص-حصرية-من-دون-مميزات">خصائص حصرية من دون مُميِّزات</h2>
<p>أحيانًا تريد حصريةً متبادلة من دون خاصية تنويع صريحة. وهذا نمطٌ يستخدم الأنواع الاتحادية والنوع <code>never</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ExclusiveProps</span>&lt;T, U&gt; =
  | (T &amp; { [K <span class="hljs-keyword">in</span> keyof U]?: <span class="hljs-built_in">never</span> })
  | (U &amp; { [K <span class="hljs-keyword">in</span> keyof T]?: <span class="hljs-built_in">never</span> });

<span class="hljs-keyword">type</span> <span class="hljs-title class_">IconButtonProps</span> = <span class="hljs-title class_">ExclusiveProps</span>&lt;
  { <span class="hljs-attr">icon</span>: <span class="hljs-built_in">string</span>; <span class="hljs-string">&#x27;aria-label&#x27;</span>: <span class="hljs-built_in">string</span> },
  { <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span> }
&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">IconButton</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">IconButtonProps</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;icon&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">{props[</span>&#x27;<span class="hljs-attr">aria-label</span>&#x27;]}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{props.icon}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>{props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<p>وهذا ينشئ علاقة «أو هذا أو ذاك» من دون الحاجة إلى مُميِّز:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Valid uses</span>
&lt;<span class="hljs-title class_">IconButton</span> icon=<span class="hljs-string">&quot;search&quot;</span> aria-label=<span class="hljs-string">&quot;Search&quot;</span> /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">IconButton</span>&gt;</span></span>

<span class="hljs-comment">// ❌ Invalid combinations caught by TypeScript</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">&quot;search&quot;</span>&gt;</span>Text and icon<span class="hljs-tag">&lt;/<span class="hljs-name">IconButton</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconButton</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Label only&quot;</span> /&gt;</span></span> <span class="hljs-comment">// Missing icon</span>
</code></pre>
<p>أداة <code>ExclusiveProps</code> تجعل خصائص أحد النوعين من نوع <code>never</code> حين يكون النوع الآخر نشطًا، فتمنع الاستخدام المختلط.</p>
<h2 id="أنماط-react-متقدمة">أنماط React متقدّمة</h2>
<h3 id="اتحادات-حقول-النماذج">اتحادات حقول النماذج</h3>
<p>لنبنِ مكوّن حقل نموذج مرنًا يتعامل مع أنواع إدخال مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">BaseFieldProps</span> = {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TextFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;password&#x27;</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SelectFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;select&#x27;</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">options</span>: { <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span> }[];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CheckboxFieldProps</span> = <span class="hljs-title class_">BaseFieldProps</span> &amp; {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;checkbox&#x27;</span>;
  <span class="hljs-attr">checked</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">checked</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldProps</span> = <span class="hljs-title class_">TextFieldProps</span> | <span class="hljs-title class_">SelectFieldProps</span> | <span class="hljs-title class_">CheckboxFieldProps</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Field</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">FieldProps</span></span>) {
  <span class="hljs-keyword">const</span> { label, name, required, error } = props;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">renderInput</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">switch</span> (props.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;text&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;email&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;password&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">{props.type}</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{props.value}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> props.onChange(e.target.value)}
            placeholder={props.placeholder}
            required={required}
          /&gt;</span>
        );

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;select&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{props.value}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> props.onChange(e.target.value)}
            required={required}
          &gt;
            {props.options.map((option) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{option.value}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{option.value}</span>&gt;</span>
                {option.label}
              <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
        );

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;checkbox&#x27;</span>:
        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
            <span class="hljs-attr">checked</span>=<span class="hljs-string">{props.checked}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> props.onChange(e.target.checked)}
            required={required}
          /&gt;</span>
        );
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">{name}</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      {renderInput()}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يضمن TypeScript ألّا تخلط خصائص غير متوافقة — لا <code>placeholder</code> في القوائم المنسدلة، ولا <code>options</code> في حقول النص.</p>
<h3 id="مكون-زر-بتنويعات">مكوّن زر بتنويعات</h3>
<p>إليك كيف تنشئ زرًا يكون إمّا زرًا وإمّا رابطًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonAsButton</span> = {
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;button&#x27;</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonAsLink</span> = {
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;link&#x27;</span>;
  <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
} &amp; (<span class="hljs-title class_">ButtonAsButton</span> | <span class="hljs-title class_">ButtonAsLink</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> { children } = props;

  <span class="hljs-keyword">if</span> (props.<span class="hljs-property">variant</span> === <span class="hljs-string">&#x27;button&#x27;</span>) {
    <span class="hljs-comment">// TypeScript knows this is ButtonAsButton</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{props.disabled}</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }

  <span class="hljs-comment">// TypeScript knows this is ButtonAsLink</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{props.href}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{props.disabled</span> ? &#x27;<span class="hljs-attr">disabled</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحقق-وقت-التشغيل-مع-zod">التحقّق وقت التشغيل مع Zod</h2>
<p>لأمانٍ إضافي، وخصوصًا عند التعامل مع بيانات خارجية، اجمع الأنواع الاتحادية المُميَّزة مع التحقّق وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonSchemaAsButton</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">variant</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;button&#x27;</span>),
  <span class="hljs-attr">onClick</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>),
  <span class="hljs-attr">disabled</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonSchemaAsLink</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">variant</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;link&#x27;</span>),
  <span class="hljs-attr">href</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>(),
  <span class="hljs-attr">disabled</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ButtonPropsSchema</span> = z
  .<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">children</span>: z.<span class="hljs-title function_">any</span>(), <span class="hljs-comment">// React.ReactNode is hard to validate</span>
  })
  .<span class="hljs-title function_">and</span>(z.<span class="hljs-title function_">union</span>([<span class="hljs-title class_">ButtonSchemaAsButton</span>, <span class="hljs-title class_">ButtonSchemaAsLink</span>]));

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">ButtonPropsSchema</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-comment">// Runtime validation catches props that TypeScript might miss</span>
  <span class="hljs-keyword">const</span> validatedProps = <span class="hljs-title class_">ButtonPropsSchema</span>.<span class="hljs-title function_">parse</span>(props);

  <span class="hljs-comment">// Your component logic here...</span>
}
</code></pre>
<p>وهذا ذو قيمة خاصة للمكوّنات التي تتلقّى خصائصها من واجهات البرمجة أو ملفات الإعداد حيث لا يمكن لـ TypeScript المساعدة.</p>
<h3 id="التحقق-وقت-التشغيل-لحالة-الواجهة-غير-المتزامنة">التحقّق وقت التشغيل لحالة الواجهة غير المتزامنة</h3>
<p>يمكنك أيضًا التحقّق من حالة الواجهة الموسومة وقت التشغيل عبر مصنع مخططات قابل لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AsyncStateSchema</span> = &lt;T <span class="hljs-keyword">extends</span> z.<span class="hljs-property">ZodTypeAny</span>, E <span class="hljs-keyword">extends</span> z.<span class="hljs-property">ZodTypeAny</span> = z.<span class="hljs-property">ZodString</span>&gt;<span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">dataSchema</span>: T,
  <span class="hljs-attr">errorSchema</span>?: E,
</span>) =&gt;</span>
  z.<span class="hljs-title function_">discriminatedUnion</span>(<span class="hljs-string">&#x27;status&#x27;</span>, [
    z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">status</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;idle&#x27;</span>) }),
    z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">status</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;loading&#x27;</span>) }),
    z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">status</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;success&#x27;</span>), <span class="hljs-attr">data</span>: dataSchema }),
    z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">status</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;error&#x27;</span>), <span class="hljs-attr">error</span>: (errorSchema ?? z.<span class="hljs-title function_">string</span>()) <span class="hljs-keyword">as</span> E }),
  ]);

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(), <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(), <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>() });
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserAsyncSchema</span> = <span class="hljs-title class_">AsyncStateSchema</span>(<span class="hljs-title class_">UserSchema</span>);
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserAsyncState</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserAsyncSchema</span>&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">parseUserAsync</span>(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">UserAsyncState</span> | <span class="hljs-literal">null</span> {
  <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">UserAsyncSchema</span>.<span class="hljs-title function_">safeParse</span>(input);
  <span class="hljs-keyword">return</span> result.<span class="hljs-property">success</span> ? result.<span class="hljs-property">data</span> : <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>الأنواع الاتحادية المُميَّزة والخصائص الحصرية هما بنى وقت التصريف — ولا تضيفان أي عبءٍ وقت التشغيل. إذ تتحوّل فحوصات المُميِّز إلى وصولٍ بسيط إلى خاصية، ويُلغى تضييق الاتحاد من TypeScript أثناء التصريف.</p>
<p>لكنّ كن منتبهًا لما يلي:</p>
<ul>
<li><strong>الأنواع الاتحادية المعقّدة</strong> قد تُبطئ تصريف TypeScript في قواعد الشيفرة الكبيرة جدًّا</li>
<li><strong>التداخل العميق</strong> للأنواع الاتحادية المُميَّزة قد يجعل رسائل الأخطاء أصعب في القراءة</li>
<li><strong>التحقّق وقت التشغيل</strong> له كلفة — استخدمه بحكمة في المسارات الحرجة للأداء</li>
</ul>
<h2 id="الأخطاء-الشائعة">الأخطاء الشائعة</h2>
<h3 id="نسيان-المميز">نسيان المُميِّز</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This doesn&#x27;t work—no discriminant</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">BadUnion</span> = { <span class="hljs-attr">a</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">process</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">BadUnion</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;a&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-comment">// This is a runtime check, not great</span>
    <span class="hljs-keyword">return</span> props.<span class="hljs-property">a</span>;
  }
  <span class="hljs-keyword">return</span> props.<span class="hljs-property">b</span>.<span class="hljs-title function_">toString</span>();
}
</code></pre>
<h3 id="جعل-المميزات-اختيارية">جعل المُميِّزات اختيارية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Optional discriminants defeat the purpose</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WeakUnion</span> = { <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;A&#x27;</span>; <span class="hljs-attr">propA</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;B&#x27;</span>; <span class="hljs-attr">propB</span>: <span class="hljs-built_in">number</span> };
</code></pre>
<h3 id="تعقيد-الحالات-البسيطة">تعقيد الحالات البسيطة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Overkill for a simple boolean flag</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OverEngineered</span> = { <span class="hljs-attr">visible</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span> };

<span class="hljs-comment">// ✅ Sometimes simple is better</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Simple</span> = {
  <span class="hljs-attr">visible</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">content</span>?: <span class="hljs-built_in">string</span>;
};
</code></pre>
<h2 id="متى-تستخدم-كل-نمط">متى تستخدم كل نمط</h2>
<p><strong>استخدم الأنواع الاتحادية المُميَّزة عندما:</strong></p>
<ul>
<li>لديك تنويعات واضحة لسلوك المكوّن</li>
<li>للخصائص معانٍ مختلفة تمامًا حسب السياق</li>
<li>تريد واجهات برمجية صريحة ووثّقة بذاتها</li>
<li>تحتاج مطابقة أنماط شاملة في جمل switch</li>
</ul>
<p><strong>استخدم الخصائص الحصرية عندما:</strong></p>
<ul>
<li>لديك عدد أقلّ من الخيارات المتباعدة حصريًّا</li>
<li>العلاقة أقرب إلى «أو هذا أو ذاك» منها إلى تنويعات متميّزة</li>
<li>تريد واجهة برمجية أنظف من دون خصائص مُميِّز إضافية</li>
</ul>
<p><strong>اجمعها مع التحقّق وقت التشغيل عندما:</strong></p>
<ul>
<li>تأتي الخصائص من مصادر خارجية (واجهات البرمجة، ملفات الإعداد)</li>
<li>تبني مكتبة مكوّنات للاستهلاك الخارجي</li>
<li>سلامة البيانات أمرٌ حاسم للأمان أو لمنطق العمل</li>
</ul>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>الأنواع الاتحادية المُميَّزة إحدى مزايا TypeScript القاتلة في تطوير React. فهي:</p>
<ol>
<li><strong>تجعل الحالات غير الصالحة مستحيلة</strong> - لا يمكن تمثيل التركيبات الخاطئة</li>
<li><strong>تتيح الفحص الشامل</strong> - يضمن TypeScript معالجتك لكل الحالات</li>
<li><strong>توفّر دعمًا ممتازًا لـ IntelliSense</strong> - تعرف بيئة التطوير الخصائص المتاحة تمامًا</li>
<li><strong>توثّق نيتك</strong> - تشرح الأنواع نفسها الحالات الممكنة</li>
<li><strong>تبسّط الاختبار</strong> - من السهل اختبار كل حالة على حدة</li>
</ol>
<p>أتقن هذا النمط، وستكتب تطبيقات React لا آمنةً من حيث الأنواع فحسب بل سليمةً معماريًّا. وسيشكرك نفسك في المستقبل (وزملاؤك)!</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
