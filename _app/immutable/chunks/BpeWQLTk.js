const s="kinney",a="react-typescript",n="React مع TypeScript",l="forms-actions-and-useactionstate",p="النماذج المحدَّدة الأنواع، والإجرائات (Actions)، وuseActionState",t=[{depth:2,id:"ما-الإجرائات-ولماذا-تهمك",text:"ما الإجرائات ولماذا تهمّك؟"},{depth:2,id:"إعداد-الإجرائية-الأساسي",text:"إعداد الإجرائية الأساسي"},{depth:2,id:"أمان-الأنواع-المتقدم-مع-الإجرائات-العامة",text:"أمان الأنواع المتقدّم مع الإجرائات العامة"},{depth:2,id:"التعامل-مع-حالات-النماذج-المعقدة",text:"التعامل مع حالات النماذج المعقّدة"},{depth:2,id:"التحديثات-المتفائلة-optimistic-updates-والتفاعل-الفوري",text:"التحديثات المتفائلة (optimistic updates) والتفاعل الفوري"},{depth:2,id:"أنماط-معالجة-الأخطاء-والاسترداد",text:"أنماط معالجة الأخطاء والاسترداد"},{depth:2,id:"اعتبارات-الأداء-وأفضل-الممارسات",text:"اعتبارات الأداء وأفضل الممارسات"},{depth:3,id:"التحقق-المؤجل-debounced-validation",text:"التحقّق المؤجَّل (debounced validation)"},{depth:3,id:"حفظ-نتائج-الإجرائات-في-الذاكرة",text:"حفظ نتائج الإجرائات في الذاكرة"},{depth:3,id:"تقسيم-شيفرة-الإجرائات",text:"تقسيم شيفرة الإجرائات"},{depth:2,id:"الخطوات-التالية-والاستخدام-في-العالم-الواقعي",text:"الخطوات التالية والاستخدام في العالم الواقعي"}],e=`<p>يقدّم React 19 نمطًا جديدًا قويًّا لمعالجة إرسال النماذج والتحولات (mutations): الإجرائات (Actions) وخُطّاف (hook) <code>useActionState</code>. وإذا سبق أن وجدتَ نفسك تتصارع مع التحقّق من النماذج، وحالات التحميل، ومعالجة الأخطاء، وتعقيدات TypeScript المصاحبة، ففي انتظارك معاملة لذيذة. إذ تُغلّف الإجرائات مسار إرسال النموذج بالكامل — من التحقّق، إلى التواصل مع الخادم، إلى تحديثات الحالة — بأسلوبٍ آمن الأنواع، إعلانيّ ومعقول.</p>
<p>في هذا التعمّق (deep dive)، سنستكشف كيف نستثمر TypeScript لنجعل التعامل مع النماذج متينًا، وقدرًا على التوسّع، وممتعًا في التعامل. وسنبدأ بمبادئ الإجرائات، ثم نتقدّم عبر أنماطٍ يزيد تعقيدًا يمكنك نشرها في الإنتاج فعلًا.</p>
<h2 id="ما-الإجرائات-ولماذا-تهمك">ما الإجرائات ولماذا تهمّك؟</h2>
<p>فكّر في الإجرائات (Actions) على أنها دوالٌ مدركة TypeScript تتولى دورة حياة تحوّل (mutation) نموذجٍ بالكامل. فعلى خلاف معالجة النماذج التقليدية حيث توازي <code>useState</code> و<code>useEffect</code> وعدّة قيم منطقية لتتبّع حالات التحميل، تُغلّف الإجرائات كلّ شيء في تدفّقٍ واحد متوقَّع.</p>
<p>إليك النموذج الذهني: الإجرائية دالةٌ تأخذ بيانات النموذج، وتُدبِّرها (تتحقّق منها، ترسلها إلى الخادم، تُحدّث الحالة المحلية)، وتُعيد نتيجةً تخبر واجهتك بما وقع. ويتولّى الخُطّاف <code>useActionState</code> التنفيذ ويعيد إليك كلّ ما تحتاجه — الحالة الراهنة، وحالة الانتظار (pending)، ومُطلق (dispatcher) الإجرائية نفسه.</p>
<p>يلمع هذا النمط لأنّه:</p>
<ul>
<li><strong>مركزية منطق التحول</strong>: لا مزيد من تحديثات الحالة المُبعثرة عبر مكوّنات متعددة</li>
<li><strong>توفير حالات التحميل آليًّا</strong>: <code>pending</code> يتولَّاه عنك</li>
<li><strong>تمكين من التحسين التدريجي (progressive enhancement)</strong>: تعمل النماذج بلا JavaScript</li>
<li><strong>تتعامل بلطفٍ مع TypeScript</strong>: استنتاج كامل للأنواع من المدخلات إلى المخرجات</li>
</ul>
<h2 id="إعداد-الإجرائية-الأساسي">إعداد الإجرائية الأساسي</h2>
<p>لنبدأ من نموذج تواصل بسيط لنرى كيف تلتحم القطع معًا. وبالنسبة إلى أنماط التحقّق وقت التشغيل الشاملة بالاستعانة بـ Zod، انظر <a href="https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation">جلب البيانات والتحقّق وقت التشغيل</a>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define the shape of our form data</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContactFormData</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// This represents the result of our action</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ContactFormResult</span> = {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
};
</code></pre>
<p>الآن الإجرائية نفسها. تستقبل الإجرائات الحالةَ السابقة (من <code>useActionState</code>) وبياناتَ النموذج:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">submitContactForm</span>(<span class="hljs-params">
  <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">ContactFormResult</span>,
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ContactFormResult</span>&gt; {
  <span class="hljs-comment">// Extract data from FormData</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">ContactFormData</span> = {
    <span class="hljs-attr">name</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;name&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">email</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;email&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">message</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;message&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
  };

  <span class="hljs-comment">// Basic validation</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">name</span>) errors.<span class="hljs-property">name</span> = [<span class="hljs-string">&#x27;Name is required&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">email</span> || !data.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) errors.<span class="hljs-property">email</span> = [<span class="hljs-string">&#x27;Invalid email address&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">message</span> || data.<span class="hljs-property">message</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">10</span>)
    errors.<span class="hljs-property">message</span> = [<span class="hljs-string">&#x27;Message must be at least 10 characters&#x27;</span>];

  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
      errors,
    };
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// Simulate API call</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/contact&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data),
    });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Thank you for your message!&#x27;</span>,
    };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Something went wrong. Please try again.&#x27;</span>,
    };
  }
}
</code></pre>
<p>وأخيرًا، لنشبّط هذا في المكوّن:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, action, isPending] = <span class="hljs-title function_">useActionState</span>(submitContactForm, {
    <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{action}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.errors?.name</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.errors?.name &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.errors.name[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;email&quot;</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.errors?.email</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.errors?.email &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.errors.email[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span>Message<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;message&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;message&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.errors?.message</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.errors?.message &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.errors.message[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>
        {isPending ? &#x27;Sending...&#x27; : &#x27;Send Message&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {state.message &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{state.success</span> ? &#x27;<span class="hljs-attr">success</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">error</span>&#x27;}&gt;</span>
          {state.message}
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>ما الذي يجري هنا؟ يعيد الخُطّاف (hook) <code>useActionState</code> ثلاثة أشياء:</p>
<ol>
<li><strong><code>state</code></strong>: النتيجة الراهنة من الإجرائية (قيمتك الافتراضية في البداية)</li>
<li><strong><code>action</code></strong>: دالة يمكن أن تمرّرها إلى خاصية <code>action</code> في عنصر <code>&lt;form&gt;</code></li>
<li><strong><code>isPending</code></strong>: قيمة منطقية تساوي <code>true</code> ما دامت الإجرائية تعمل</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لاحظ كيف نستخدم خصائص عناصر النماذج في HTML مثل <code>required</code> وقيم <code>aria-invalid</code> الصحيحة. هذا يضمن أن نموذجك يعمل حتى لو تعذّّر تحميل JavaScript — بذروة التحسين التدريجي (progressive enhancement).</p>
</blockquote>
<h2 id="أمان-الأنواع-المتقدم-مع-الإجرائات-العامة">أمان الأنواع المتقدّم مع الإجرائات العامة</h2>
<p>يعمل النمط الأساسي، لكن يمكن أن نجعله قابلًا لإعادة الاستخدام أكثر وأمان أنواع. وللتحقّق وقت التشغيل مع Zod، انظر <a href="https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation">جلب البيانات والتحقّق وقت التشغيل</a>. وهذا نهج يفضّل TypeScript أولًا عبر مُنشئ إجرائاتٍ عام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ActionResult</span>&lt;<span class="hljs-title class_">TData</span> = <span class="hljs-built_in">unknown</span>&gt; = {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: <span class="hljs-title class_">TData</span>;
  <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ActionHandler</span>&lt;<span class="hljs-title class_">TInput</span>, <span class="hljs-title class_">TOutput</span> = <span class="hljs-built_in">unknown</span>&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-title class_">TInput</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ActionResult</span>&lt;<span class="hljs-title class_">TOutput</span>&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Validator</span>&lt;T&gt; = <span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>,
</span>) =&gt;</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; };

<span class="hljs-keyword">function</span> createAction&lt;<span class="hljs-title class_">TInput</span>, <span class="hljs-title class_">TOutput</span> = <span class="hljs-built_in">unknown</span>&gt;(
  <span class="hljs-attr">validator</span>: <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">TInput</span>&gt;,
  <span class="hljs-attr">handler</span>: <span class="hljs-title class_">ActionHandler</span>&lt;<span class="hljs-title class_">TInput</span>, <span class="hljs-title class_">TOutput</span>&gt;,
) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">action</span>(<span class="hljs-params">
    <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">ActionResult</span>&lt;<span class="hljs-title class_">TOutput</span>&gt;,
    <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
  </span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ActionResult</span>&lt;<span class="hljs-title class_">TOutput</span>&gt;&gt; {
    <span class="hljs-comment">// Generic form data extraction</span>
    <span class="hljs-keyword">const</span> rawData = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(formData);

    <span class="hljs-comment">// Validate input</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validator</span>(rawData);

    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">valid</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">errors</span>: result.<span class="hljs-property">errors</span>,
      };
    }

    <span class="hljs-comment">// Execute the handler</span>
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">handler</span>(result.<span class="hljs-property">data</span>);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">message</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;An error occurred&#x27;</span>,
      };
    }
  };
}
</code></pre>
<p>يمكننا الآن صنع إجرائاتٍ آمنة الأنواع بشيفرة قالبية (boilerplate) أقل بكثير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define our types and validators</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginData</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SignupData</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">validateLogin</span>: <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">LoginData</span>&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> d = data <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};

  <span class="hljs-keyword">if</span> (!d.<span class="hljs-property">email</span> || !d.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) errors.<span class="hljs-property">email</span> = [<span class="hljs-string">&#x27;Invalid email&#x27;</span>];
  <span class="hljs-keyword">if</span> (!d.<span class="hljs-property">password</span> || d.<span class="hljs-property">password</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">6</span>)
    errors.<span class="hljs-property">password</span> = [<span class="hljs-string">&#x27;Password must be at least 6 characters&#x27;</span>];

  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors };
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">data</span>: d <span class="hljs-keyword">as</span> <span class="hljs-title class_">LoginData</span> };
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">validateSignup</span>: <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">SignupData</span>&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> d = data <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};

  <span class="hljs-keyword">if</span> (!d.<span class="hljs-property">email</span> || !d.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) errors.<span class="hljs-property">email</span> = [<span class="hljs-string">&#x27;Invalid email&#x27;</span>];
  <span class="hljs-keyword">if</span> (!d.<span class="hljs-property">password</span> || d.<span class="hljs-property">password</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">8</span>)
    errors.<span class="hljs-property">password</span> = [<span class="hljs-string">&#x27;Password must be at least 8 characters&#x27;</span>];
  <span class="hljs-keyword">if</span> (d.<span class="hljs-property">password</span> !== d.<span class="hljs-property">confirmPassword</span>) errors.<span class="hljs-property">confirmPassword</span> = [<span class="hljs-string">&quot;Passwords don&#x27;t match&quot;</span>];

  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors };
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">data</span>: d <span class="hljs-keyword">as</span> <span class="hljs-title class_">SignupData</span> };
};

<span class="hljs-comment">// Create typed Actions</span>
<span class="hljs-keyword">const</span> loginAction = <span class="hljs-title function_">createAction</span>(validateLogin, <span class="hljs-title function_">async</span> (credentials) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/auth/login&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(credentials),
  });

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid credentials&#x27;</span>);
  }

  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">data</span>: user,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Welcome back!&#x27;</span>,
  };
});

<span class="hljs-keyword">const</span> signupAction = <span class="hljs-title function_">createAction</span>(validateSignup, <span class="hljs-title function_">async</span> (userData) =&gt; {
  <span class="hljs-comment">// Remove confirmPassword before sending to API</span>
  <span class="hljs-keyword">const</span> { confirmPassword, ...signupData } = userData;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/auth/signup&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(signupData),
  });

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(error.<span class="hljs-property">message</span> || <span class="hljs-string">&#x27;Signup failed&#x27;</span>);
  }

  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">data</span>: user,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Account created successfully!&#x27;</span>,
  };
});
</code></pre>
<p>يمنحنا هذا النهج عدّة مزايا:</p>
<ul>
<li><strong>استنتاج الأنواع</strong>: يعرف TypeScript تمامًا أيّ شكلٍ ستكون عليه بيانات نموذجك</li>
<li><strong>تحقّق قابل لإعادة الاستخدام</strong>: يتولّى <code>schema</code> التحقّق جهة العميل وجهة الخادم معًا</li>
<li><strong>اتساق معالجة الأخطاء</strong>: تتفرّع كل الإجرائات من النمط نفسه للخطأ/النجاح</li>
<li><strong>تكرار أقل</strong>: لا مزيد من نسخ منطق التحقّق بين المكوّنات</li>
</ul>
<h2 id="التعامل-مع-حالات-النماذج-المعقدة">التعامل مع حالات النماذج المعقّدة</h2>
<p>النماذج الواقعية تحتاج غالبًا إلى إدارة حالة أكثر طموحًا. لننظر إلى معالج خطوات (wizard) متعدّد الخطوات بحقولٍ متداخلة وتحديثاتٍ متفائلة (optimistic updates):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">WizardStep</span> = <span class="hljs-string">&#x27;personal&#x27;</span> | <span class="hljs-string">&#x27;billing&#x27;</span> | <span class="hljs-string">&#x27;confirmation&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">WizardState</span> = {
  <span class="hljs-attr">currentStep</span>: <span class="hljs-title class_">WizardStep</span>;
  <span class="hljs-attr">personalInfo</span>?: {
    <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">billingInfo</span>?: {
    <span class="hljs-attr">address</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">city</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">zipCode</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">paymentMethod</span>: <span class="hljs-string">&#x27;card&#x27;</span> | <span class="hljs-string">&#x27;paypal&#x27;</span>;
  };
  <span class="hljs-attr">isComplete</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-comment">// For runtime validation with Zod, see Data Fetching and Runtime Validation guide</span>
<span class="hljs-keyword">const</span> validatePersonalInfo = (<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): { <span class="hljs-attr">valid</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; } =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">firstName</span>) errors.<span class="hljs-property">firstName</span> = [<span class="hljs-string">&#x27;First name is required&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">lastName</span>) errors.<span class="hljs-property">lastName</span> = [<span class="hljs-string">&#x27;Last name is required&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">email</span> || !data.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) errors.<span class="hljs-property">email</span> = [<span class="hljs-string">&#x27;Invalid email&#x27;</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> ? { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors } : { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span> };
};

<span class="hljs-keyword">const</span> validateBillingInfo = (<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): { <span class="hljs-attr">valid</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; } =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">address</span>) errors.<span class="hljs-property">address</span> = [<span class="hljs-string">&#x27;Address is required&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">city</span>) errors.<span class="hljs-property">city</span> = [<span class="hljs-string">&#x27;City is required&#x27;</span>];
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">zipCode</span> || !<span class="hljs-regexp">/^\\d{5}$/</span>.<span class="hljs-title function_">test</span>(data.<span class="hljs-property">zipCode</span>)) errors.<span class="hljs-property">zipCode</span> = [<span class="hljs-string">&#x27;Invalid ZIP code&#x27;</span>];
  <span class="hljs-keyword">if</span> (![<span class="hljs-string">&#x27;card&#x27;</span>, <span class="hljs-string">&#x27;paypal&#x27;</span>].<span class="hljs-title function_">includes</span>(data.<span class="hljs-property">paymentMethod</span>))
    errors.<span class="hljs-property">paymentMethod</span> = [<span class="hljs-string">&#x27;Invalid payment method&#x27;</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> ? { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors } : { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span> };
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createWizardAction</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">wizardAction</span>(<span class="hljs-params">
    <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">WizardState</span>,
    <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
  </span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">WizardState</span>&gt; {
    <span class="hljs-keyword">const</span> step = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;step&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">WizardStep</span>;
    <span class="hljs-keyword">const</span> action = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;action&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-string">&#x27;next&#x27;</span> | <span class="hljs-string">&#x27;previous&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span>;

    <span class="hljs-keyword">switch</span> (action) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;previous&#x27;</span>: {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">stepOrder</span>: <span class="hljs-title class_">WizardStep</span>[] = [<span class="hljs-string">&#x27;personal&#x27;</span>, <span class="hljs-string">&#x27;billing&#x27;</span>, <span class="hljs-string">&#x27;confirmation&#x27;</span>];
        <span class="hljs-keyword">const</span> currentIndex = stepOrder.<span class="hljs-title function_">indexOf</span>(prevState.<span class="hljs-property">currentStep</span>);
        <span class="hljs-keyword">const</span> previousStep = stepOrder[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, currentIndex - <span class="hljs-number">1</span>)];

        <span class="hljs-keyword">return</span> {
          ...prevState,
          <span class="hljs-attr">currentStep</span>: previousStep,
          <span class="hljs-attr">errors</span>: <span class="hljs-literal">undefined</span>,
        };
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;next&#x27;</span>: {
        <span class="hljs-keyword">if</span> (step === <span class="hljs-string">&#x27;personal&#x27;</span>) {
          <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(formData);
          <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validatePersonalInfo</span>(data);

          <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">valid</span>) {
            <span class="hljs-keyword">return</span> {
              ...prevState,
              <span class="hljs-attr">errors</span>: result.<span class="hljs-property">errors</span>,
            };
          }

          <span class="hljs-keyword">return</span> {
            ...prevState,
            <span class="hljs-attr">currentStep</span>: <span class="hljs-string">&#x27;billing&#x27;</span>,
            <span class="hljs-attr">personalInfo</span>: data <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>,
            <span class="hljs-attr">errors</span>: <span class="hljs-literal">undefined</span>,
          };
        }

        <span class="hljs-keyword">if</span> (step === <span class="hljs-string">&#x27;billing&#x27;</span>) {
          <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(formData);
          <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validateBillingInfo</span>(data);

          <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">valid</span>) {
            <span class="hljs-keyword">return</span> {
              ...prevState,
              <span class="hljs-attr">errors</span>: result.<span class="hljs-property">errors</span>,
            };
          }

          <span class="hljs-keyword">return</span> {
            ...prevState,
            <span class="hljs-attr">currentStep</span>: <span class="hljs-string">&#x27;confirmation&#x27;</span>,
            <span class="hljs-attr">billingInfo</span>: data <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>,
            <span class="hljs-attr">errors</span>: <span class="hljs-literal">undefined</span>,
          };
        }

        <span class="hljs-keyword">return</span> prevState;
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submit&#x27;</span>: {
        <span class="hljs-keyword">if</span> (!prevState.<span class="hljs-property">personalInfo</span> || !prevState.<span class="hljs-property">billingInfo</span>) {
          <span class="hljs-keyword">return</span> {
            ...prevState,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Please complete all steps&#x27;</span>,
          };
        }

        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/orders&#x27;</span>, {
            <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
            <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
            <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
              <span class="hljs-attr">personal</span>: prevState.<span class="hljs-property">personalInfo</span>,
              <span class="hljs-attr">billing</span>: prevState.<span class="hljs-property">billingInfo</span>,
            }),
          });

          <span class="hljs-keyword">return</span> {
            ...prevState,
            <span class="hljs-attr">isComplete</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Order submitted successfully!&#x27;</span>,
          };
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-keyword">return</span> {
            ...prevState,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Failed to submit order. Please try again.&#x27;</span>,
          };
        }
      }

      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> prevState;
    }
  };
}
</code></pre>
<p>ويمكن لمكوّن المعالج بعدئذٍ أن يستخدم هذه الإجرائية لإدارة التدفّق بأكمله:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">OrderWizard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, action, isPending] = <span class="hljs-title function_">useActionState</span>(<span class="hljs-title function_">createWizardAction</span>(), {
    <span class="hljs-attr">currentStep</span>: <span class="hljs-string">&#x27;personal&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">WizardStep</span>,
    <span class="hljs-attr">isComplete</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">isComplete</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;success&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Order Complete!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{action}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;wizard-steps&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">step</span> \${<span class="hljs-attr">state.currentStep</span> === <span class="hljs-string">&#x27;personal&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">completed</span>&#x27;}\`}&gt;</span>
          Personal Info
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">step</span> \${<span class="hljs-attr">state.currentStep</span> === <span class="hljs-string">&#x27;billing&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}&gt;</span>
          Billing
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">step</span> \${<span class="hljs-attr">state.currentStep</span> === <span class="hljs-string">&#x27;confirmation&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}&gt;</span>
          Confirmation
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {state.currentStep === &#x27;personal&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">PersonalInfoStep</span>
          <span class="hljs-attr">data</span>=<span class="hljs-string">{state.personalInfo}</span>
          <span class="hljs-attr">errors</span>=<span class="hljs-string">{state.errors}</span>
        /&gt;</span>
      )}

      {state.currentStep === &#x27;billing&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">BillingInfoStep</span>
          <span class="hljs-attr">data</span>=<span class="hljs-string">{state.billingInfo}</span>
          <span class="hljs-attr">errors</span>=<span class="hljs-string">{state.errors}</span>
        /&gt;</span>
      )}

      {state.currentStep === &#x27;confirmation&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ConfirmationStep</span>
          <span class="hljs-attr">personalInfo</span>=<span class="hljs-string">{state.personalInfo!}</span>
          <span class="hljs-attr">billingInfo</span>=<span class="hljs-string">{state.billingInfo!}</span>
        /&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;wizard-actions&quot;</span>&gt;</span>
        {state.currentStep !== &#x27;personal&#x27; &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;action&quot;</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;previous&quot;</span>
            <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>
          &gt;</span>
            Previous
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        )}

        {state.currentStep !== &#x27;confirmation&#x27; &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;action&quot;</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;next&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;step&quot;</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{state.currentStep}</span>
            <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>
          &gt;</span>
            {isPending ? &#x27;Processing...&#x27; : &#x27;Next&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        )}

        {state.currentStep === &#x27;confirmation&#x27; &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;action&quot;</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;submit&quot;</span>
            <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>
          &gt;</span>
            {isPending ? &#x27;Submitting...&#x27; : &#x27;Complete Order&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {state.message &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span>{state.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>لاحظ كيف نستخدم حقول إدخال خفية وقيم أزرار لتمرير معلومات الخطوة إلى إجرائتنا. هذا يضمن بقاءَ النموذج عاملًا بلا JavaScript—فالخادم يستطيع معالجة نفس FormData.</p>
</blockquote>
<h2 id="التحديثات-المتفائلة-optimistic-updates-والتفاعل-الفوري">التحديثات المتفائلة (optimistic updates) والتفاعل الفوري</h2>
<p>أحيانًا تريد إظهار ردّ فعلٍ فوريّ أثناء عمل الإجرائية. هكذا يُنفَّذ التحديثات المتفائلة مع إعادة تراجعٍ سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">TodoItem</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">optimistic</span>?: <span class="hljs-built_in">boolean</span>; <span class="hljs-comment">// Mark items as optimistically updated</span>
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TodoState</span> = {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">TodoItem</span>[];
  <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-comment">// See Data Fetching and Runtime Validation guide for Zod validation patterns</span>
<span class="hljs-keyword">const</span> validateAddTodo = (<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): { <span class="hljs-attr">valid</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; } =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">text</span> || data.<span class="hljs-property">text</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) errors.<span class="hljs-property">text</span> = [<span class="hljs-string">&#x27;Todo text is required&#x27;</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> ? { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors } : { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span> };
};

<span class="hljs-keyword">const</span> validateToggleTodo = (<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): { <span class="hljs-attr">valid</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; } =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {};
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">todoId</span>) errors.<span class="hljs-property">todoId</span> = [<span class="hljs-string">&#x27;Todo ID is required&#x27;</span>];
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(errors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> ? { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, errors } : { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span> };
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createTodoActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> addTodo = <span class="hljs-title function_">async</span> (<span class="hljs-attr">prevState</span>: <span class="hljs-title class_">TodoState</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">TodoState</span>&gt; =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(formData);
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validateAddTodo</span>(data);

    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">valid</span>) {
      <span class="hljs-keyword">return</span> {
        ...prevState,
        <span class="hljs-attr">errors</span>: result.<span class="hljs-property">errors</span>,
      };
    }

    <span class="hljs-comment">// Optimistic update - add the todo immediately</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">optimisticTodo</span>: <span class="hljs-title class_">TodoItem</span> = {
      <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
      <span class="hljs-attr">text</span>: data.<span class="hljs-property">text</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">optimistic</span>: <span class="hljs-literal">true</span>,
    };

    <span class="hljs-keyword">const</span> optimisticState = {
      ...prevState,
      <span class="hljs-attr">todos</span>: [...prevState.<span class="hljs-property">todos</span>, optimisticTodo],
      <span class="hljs-attr">errors</span>: <span class="hljs-literal">undefined</span>,
    };

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result.<span class="hljs-property">data</span>),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to add todo&#x27;</span>);

      <span class="hljs-keyword">const</span> newTodo = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-comment">// Replace optimistic todo with real one</span>
      <span class="hljs-keyword">return</span> {
        ...optimisticState,
        <span class="hljs-attr">todos</span>: optimisticState.<span class="hljs-property">todos</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === optimisticTodo.<span class="hljs-property">id</span> ? { ...newTodo, <span class="hljs-attr">optimistic</span>: <span class="hljs-literal">false</span> } : todo,
        ),
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Todo added successfully!&#x27;</span>,
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Rollback optimistic update</span>
      <span class="hljs-keyword">return</span> {
        ...prevState,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Failed to add todo&#x27;</span>,
      };
    }
  };

  <span class="hljs-keyword">const</span> toggleTodo = <span class="hljs-title function_">async</span> (<span class="hljs-attr">prevState</span>: <span class="hljs-title class_">TodoState</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">TodoState</span>&gt; =&gt; {
    <span class="hljs-keyword">const</span> todoId = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;todoId&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">const</span> completed = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;completed&#x27;</span>) === <span class="hljs-string">&#x27;true&#x27;</span>;

    <span class="hljs-comment">// Optimistic update</span>
    <span class="hljs-keyword">const</span> optimisticState = {
      ...prevState,
      <span class="hljs-attr">todos</span>: prevState.<span class="hljs-property">todos</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">completed</span>: !completed, <span class="hljs-attr">optimistic</span>: <span class="hljs-literal">true</span> } : todo,
      ),
    };

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">completed</span>: !completed }),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to toggle todo&#x27;</span>);

      <span class="hljs-keyword">const</span> updatedTodo = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-keyword">return</span> {
        ...optimisticState,
        <span class="hljs-attr">todos</span>: optimisticState.<span class="hljs-property">todos</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === todoId ? { ...updatedTodo, <span class="hljs-attr">optimistic</span>: <span class="hljs-literal">false</span> } : todo,
        ),
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Rollback optimistic update</span>
      <span class="hljs-keyword">return</span> prevState;
    }
  };

  <span class="hljs-keyword">return</span> { addTodo, toggleTodo };
}
</code></pre>
<p>ويمكن للمكوّن بعدها أن يقدّم ردّ فعلٍ فوريًّا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { addTodo, toggleTodo } = <span class="hljs-title function_">createTodoActions</span>();
  <span class="hljs-keyword">const</span> [state, addAction, isAddPending] = <span class="hljs-title function_">useActionState</span>(addTodo, {
    <span class="hljs-attr">todos</span>: [],
  });
  <span class="hljs-keyword">const</span> [, toggleAction, isTogglePending] = <span class="hljs-title function_">useActionState</span>(toggleTodo, state);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{addAction}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Add a todo...&quot;</span>
          <span class="hljs-attr">required</span>
        /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isAddPending}</span>&gt;</span>
          {isAddPending ? &#x27;Adding...&#x27; : &#x27;Add&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        {state.errors?.text &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.errors.text[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {state.todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">{todo.optimistic</span> ? &#x27;<span class="hljs-attr">optimistic</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{toggleAction}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;todoId&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{todo.id}</span> /&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;completed&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{String(todo.completed)}</span> /&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
                <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isTogglePending}</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">toggle</span> \${<span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">completed</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
              &gt;</span>
                {todo.completed ? &#x27;✓&#x27; : &#x27;○&#x27;}
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{todo.completed</span> ? &#x27;<span class="hljs-attr">completed</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
              {todo.text}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

            {todo.optimistic &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>⏳<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-معالجة-الأخطاء-والاسترداد">أنماط معالجة الأخطاء والاسترداد</h2>
<p>تحتاج نماذج الإنتاج إلى معالجة أخطاء متينة. وهذا نمط لمعالجة أنواع مختلفة من الأخطاء مع تغذيةٍ راجعة مناسبة للمستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">enum</span> <span class="hljs-title class_">ErrorType</span> {
  <span class="hljs-variable constant_">VALIDATION</span> = <span class="hljs-string">&#x27;validation&#x27;</span>,
  <span class="hljs-variable constant_">NETWORK</span> = <span class="hljs-string">&#x27;network&#x27;</span>,
  <span class="hljs-variable constant_">SERVER</span> = <span class="hljs-string">&#x27;server&#x27;</span>,
  <span class="hljs-variable constant_">UNKNOWN</span> = <span class="hljs-string">&#x27;unknown&#x27;</span>,
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormError</span> = {
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">ErrorType</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">field</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">retryable</span>?: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">RobustFormState</span> = {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: <span class="hljs-built_in">unknown</span>;
  <span class="hljs-attr">errors</span>: <span class="hljs-title class_">FormError</span>[];
  <span class="hljs-attr">fieldErrors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">retryCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isRetrying</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// For runtime validation with Zod, see Data Fetching and Runtime Validation guide</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Validator</span>&lt;T&gt; = <span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>,
</span>) =&gt;</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; };

<span class="hljs-keyword">function</span> createRobustAction&lt;<span class="hljs-title class_">TInput</span>&gt;(
  <span class="hljs-attr">validator</span>: <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">TInput</span>&gt;,
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-title class_">TInput</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">unknown</span>&gt;,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">retryDelay</span>?: <span class="hljs-built_in">number</span>;
  } = {},
) {
  <span class="hljs-keyword">const</span> { maxRetries = <span class="hljs-number">3</span>, retryDelay = <span class="hljs-number">1000</span> } = options;

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">robustAction</span>(<span class="hljs-params">
    <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">RobustFormState</span>,
    <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
  </span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">RobustFormState</span>&gt; {
    <span class="hljs-comment">// Handle retry attempts</span>
    <span class="hljs-keyword">if</span> (formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;_action&#x27;</span>) === <span class="hljs-string">&#x27;retry&#x27;</span>) {
      <span class="hljs-keyword">if</span> (prevState.<span class="hljs-property">retryCount</span> &gt;= maxRetries) {
        <span class="hljs-keyword">return</span> {
          ...prevState,
          <span class="hljs-attr">errors</span>: [
            ...prevState.<span class="hljs-property">errors</span>,
            {
              <span class="hljs-attr">type</span>: <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">UNKNOWN</span>,
              <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Maximum retry attempts reached&#x27;</span>,
              <span class="hljs-attr">retryable</span>: <span class="hljs-literal">false</span>,
            },
          ],
        };
      }

      <span class="hljs-comment">// Simulate retry delay</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, retryDelay));

      <span class="hljs-keyword">return</span> {
        ...prevState,
        <span class="hljs-attr">retryCount</span>: prevState.<span class="hljs-property">retryCount</span> + <span class="hljs-number">1</span>,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">errors</span>: [],
      };
    }

    <span class="hljs-comment">// Validate input</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(formData);
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validator</span>(data);

    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">valid</span>) {
      <span class="hljs-keyword">const</span> fieldErrors = result.<span class="hljs-property">errors</span>;
      <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-title class_">FormError</span>[] = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(fieldErrors).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[field, messages]</span>) =&gt;</span> ({
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">VALIDATION</span>,
        field,
        <span class="hljs-attr">message</span>: messages[<span class="hljs-number">0</span>],
        <span class="hljs-attr">retryable</span>: <span class="hljs-literal">false</span>,
      }));

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
        errors,
        fieldErrors,
        <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
      };
    }

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> responseData = <span class="hljs-keyword">await</span> <span class="hljs-title function_">handler</span>(result.<span class="hljs-property">data</span>);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: responseData,
        <span class="hljs-attr">errors</span>: [],
        <span class="hljs-attr">fieldErrors</span>: {},
        <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">let</span> errorType = <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">UNKNOWN</span>;
      <span class="hljs-keyword">let</span> message = <span class="hljs-string">&#x27;An unexpected error occurred&#x27;</span>;
      <span class="hljs-keyword">let</span> retryable = <span class="hljs-literal">false</span>;

      <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">TypeError</span> &amp;&amp; error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;fetch&#x27;</span>)) {
        errorType = <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">NETWORK</span>;
        message = <span class="hljs-string">&#x27;Network error. Please check your connection.&#x27;</span>;
        retryable = <span class="hljs-literal">true</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>) {
        <span class="hljs-keyword">if</span> (error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;500&#x27;</span>)) {
          errorType = <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">SERVER</span>;
          message = <span class="hljs-string">&#x27;Server error. Please try again.&#x27;</span>;
          retryable = <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (error.<span class="hljs-property">message</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;400&#x27;</span>)) {
          errorType = <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">VALIDATION</span>;
          message = <span class="hljs-string">&#x27;Invalid request. Please check your input.&#x27;</span>;
          retryable = <span class="hljs-literal">false</span>;
        } <span class="hljs-keyword">else</span> {
          message = error.<span class="hljs-property">message</span>;
        }
      }

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">errors</span>: [{ <span class="hljs-attr">type</span>: errorType, message, retryable }],
        <span class="hljs-attr">fieldErrors</span>: {},
        <span class="hljs-attr">retryCount</span>: prevState.<span class="hljs-property">retryCount</span>,
        <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
      };
    }
  };
}
</code></pre>
<p>وهكذا تستخدمه في مكوّن مع عرضٍ سليم للأخطاء ووظيفة إعادة محاولة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RobustForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> submitAction = <span class="hljs-title function_">createRobustAction</span>(
    <span class="hljs-title class_">ContactFormSchema</span>,
    <span class="hljs-title function_">async</span> (data) =&gt; {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/contact&#x27;</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${response.status}</span>: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
      }

      <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
    },
    { <span class="hljs-attr">maxRetries</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">retryDelay</span>: <span class="hljs-number">2000</span> }
  );

  <span class="hljs-keyword">const</span> [state, action, isPending] = <span class="hljs-title function_">useActionState</span>(submitAction, {
    <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">errors</span>: [],
    <span class="hljs-attr">fieldErrors</span>: {},
    <span class="hljs-attr">retryCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">isRetrying</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">const</span> networkErrors = state.<span class="hljs-property">errors</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e.<span class="hljs-property">type</span> === <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">NETWORK</span>);
  <span class="hljs-keyword">const</span> serverErrors = state.<span class="hljs-property">errors</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e.<span class="hljs-property">type</span> === <span class="hljs-title class_">ErrorType</span>.<span class="hljs-property">SERVER</span>);
  <span class="hljs-keyword">const</span> hasRetryableErrors = state.<span class="hljs-property">errors</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e.<span class="hljs-property">retryable</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{action}</span>&gt;</span>
      {/* Global error display */}
      {networkErrors.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error network-error&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Connection Problem<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{networkErrors[0].message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          {hasRetryableErrors &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>
              <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;_action&quot;</span>
              <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;retry&quot;</span>
              <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>
            &gt;</span>
              {state.isRetrying ? &#x27;Retrying...&#x27; : \`Retry (\${state.retryCount}/\${3})\`}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      {serverErrors.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error server-error&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Server Error<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{serverErrors[0].message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;help-text&quot;</span>&gt;</span>
            If this problem persists, please contact support.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      {/* Regular form fields with validation errors */}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.fieldErrors.name</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.fieldErrors.name &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field-error&quot;</span>&gt;</span>{state.fieldErrors.name[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {/* ... other fields ... */}

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending</span> || <span class="hljs-attr">state.isRetrying</span>}&gt;</span>
        {isPending ? &#x27;Submitting...&#x27; :
         state.isRetrying ? &#x27;Retrying...&#x27; :
         &#x27;Submit&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>انتبه من إعادة المحاولة آليًّا في التحولات (mutations). مطلبك عادةً إعادة المحاولة للعمليات الآمنة فقط مثل جلب البيانات، لا للعمليات التي قد تترك أثرًا جانبيًّا مثل إنشاء سجلات أو معالجة مدفوعات.</p>
</blockquote>
<h2 id="اعتبارات-الأداء-وأفضل-الممارسات">اعتبارات الأداء وأفضل الممارسات</h2>
<p>كلّما ازداد تطوّر معالجة النماذج لديك، إليك أنماطًا تُبقي تطبيقك عالي الأداء:</p>
<h3 id="التحقق-المؤجل-debounced-validation">التحقّق المؤجَّل (debounced validation)</h3>
<p>من أجل تحقّق لحظيٍّ لا يُثقل الخادم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useDebounced&lt;T&gt;(<span class="hljs-attr">value</span>: T, <span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span>): T {
  <span class="hljs-keyword">const</span> [debouncedValue, setDebouncedValue] = useState&lt;T&gt;(value);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> handler = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDebouncedValue</span>(value);
    }, delay);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(handler);
  }, [value, delay]);

  <span class="hljs-keyword">return</span> debouncedValue;
}

<span class="hljs-comment">// For runtime validation with Zod, see Data Fetching and Runtime Validation guide</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldValidator</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createDebouncedValidation</span>(<span class="hljs-params">
  <span class="hljs-attr">validator</span>: <span class="hljs-title class_">FieldValidator</span>,
  <span class="hljs-attr">asyncValidator</span>?: (value: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;
</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DebouncedField</span>(<span class="hljs-params">{
    name,
    value,
    onChange,
    ...props
  }: {
    name: <span class="hljs-built_in">string</span>;
    value: <span class="hljs-built_in">string</span>;
    onChange: (value: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span>;
  } &amp; <span class="hljs-title class_">React</span>.<span class="hljs-title class_">InputHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) {
    <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);
    <span class="hljs-keyword">const</span> [isValidating, setIsValidating] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-keyword">const</span> debouncedValue = <span class="hljs-title function_">useDebounced</span>(value, <span class="hljs-number">300</span>);

    <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (!debouncedValue) {
        <span class="hljs-title function_">setErrors</span>([]);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">const</span> <span class="hljs-title function_">validate</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
        <span class="hljs-title function_">setIsValidating</span>(<span class="hljs-literal">true</span>);

        <span class="hljs-comment">// Local validation first</span>
        <span class="hljs-keyword">const</span> localError = <span class="hljs-title function_">validator</span>(debouncedValue);

        <span class="hljs-keyword">if</span> (localError) {
          <span class="hljs-title function_">setErrors</span>([localError]);
          <span class="hljs-title function_">setIsValidating</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-comment">// Async validation if provided</span>
        <span class="hljs-keyword">if</span> (asyncValidator) {
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> asyncError = <span class="hljs-keyword">await</span> <span class="hljs-title function_">asyncValidator</span>(debouncedValue);
            <span class="hljs-title function_">setErrors</span>(asyncError ? [asyncError] : []);
          } <span class="hljs-keyword">catch</span> (error) {
            <span class="hljs-title function_">setErrors</span>([<span class="hljs-string">&#x27;Validation failed&#x27;</span>]);
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-title function_">setErrors</span>([]);
        }

        <span class="hljs-title function_">setIsValidating</span>(<span class="hljs-literal">false</span>);
      };

      <span class="hljs-title function_">validate</span>();
    }, [debouncedValue, validator, asyncValidator]);

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field-wrapper&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          {<span class="hljs-attr">...props</span>}
          <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
          aria-invalid={errors.length &gt; 0 ? &#x27;true&#x27; : &#x27;false&#x27;}
          className={\`\${props.className || &#x27;&#x27;} \${
            isValidating ? &#x27;validating&#x27; : &#x27;&#x27;
          } \${errors.length &gt; 0 ? &#x27;error&#x27; : &#x27;&#x27;}\`}
        /&gt;

        {isValidating &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;validation-indicator&quot;</span>&gt;</span>Validating...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        )}

        {errors.map((error, index) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field-error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  };
}
</code></pre>
<h3 id="حفظ-نتائج-الإجرائات-في-الذاكرة">حفظ نتائج الإجرائات في الذاكرة</h3>
<p>منع إعادة التصيير غير الضرورية حين لا تتغيّر حالة الإجرائية تغيّرًا ذا معنى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useStableActionState&lt;<span class="hljs-title class_">TState</span>&gt;(
  <span class="hljs-attr">action</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">prevState</span>: <span class="hljs-title class_">TState</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">TState</span>&gt;,
  <span class="hljs-attr">initialState</span>: <span class="hljs-title class_">TState</span>,
  <span class="hljs-attr">equalityFn</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-title class_">TState</span>, <span class="hljs-attr">b</span>: <span class="hljs-title class_">TState</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>,
) {
  <span class="hljs-keyword">const</span> [state, dispatch, isPending] = <span class="hljs-title function_">useActionState</span>(action, initialState);

  <span class="hljs-keyword">const</span> stableState = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> state,
    [
      equalityFn ? state : <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(state), <span class="hljs-comment">// Simple deep comparison fallback</span>
    ],
  );

  <span class="hljs-keyword">return</span> [stableState, dispatch, isPending] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Usage with custom equality</span>
<span class="hljs-keyword">const</span> [state, action, isPending] = <span class="hljs-title function_">useStableActionState</span>(
  myAction,
  initialState,
  <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">errors</span> === b.<span class="hljs-property">errors</span> &amp;&amp; a.<span class="hljs-property">message</span> === b.<span class="hljs-property">message</span>,
);
</code></pre>
<h3 id="تقسيم-شيفرة-الإجرائات">تقسيم شيفرة الإجرائات</h3>
<p>للتطبيقات الكبيرة، فكّر في التحميل الكسول (lazy loading) لتنفيذات الإجرائات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">LazyContactAction</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./actions/contact-action&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> ({
    <span class="hljs-attr">default</span>: <span class="hljs-variable language_">module</span>.<span class="hljs-property">contactAction</span>
  }))
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [action, setAction] = useState&lt;<span class="hljs-keyword">typeof</span> contactAction | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [state, dispatch, isPending] = <span class="hljs-title function_">useActionState</span>(
    action || (<span class="hljs-title function_">async</span> (prev) =&gt; prev),
    { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span> }
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./actions/contact-action&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> {
      <span class="hljs-title function_">setAction</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">contactAction</span>);
    });
  }, []);

  <span class="hljs-keyword">if</span> (!action) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading form...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{dispatch}</span>&gt;</span>
      {/* Form fields */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الخطوات-التالية-والاستخدام-في-العالم-الواقعي">الخطوات التالية والاستخدام في العالم الواقعي</h2>
<p>الأنماط التي عُنيناها هنا تتوسّع من نماذج تواصل بسيطة إلى معالجات متعددة خطوات معقّدة، وما بينهما. وإليك جهات تستحق مزيدًا من الاستكشاف:</p>
<ol>
<li><strong>إجرائات الخادم (Server Actions)</strong>: إن كنت تستخدم مكوّنات React الخادمية (React Server Components)، يمكن للأجرائات أن تعمل على الخادم مباشرةً</li>
<li><strong>بثّ التحديثات (streaming updates)</strong>: اجمع الإجرائات مع Suspense للتحميل المتدرّج</li>
<li><strong>مكتبات النماذج</strong>: مكتبات مثل React Hook Form لديها الآن مهايئات (adapters) للإجرائات</li>
<li><strong>الاختبار</strong>: الإجرائات مجرّد دوال، ما يجعل اختبارها بالوحدات سهلًا</li>
</ol>
<p>النقطة المفتاحية أن الإجرائات مع <code>useActionState</code> تمنحك طريقةً إعلانية لنمذجة دورة حياة تحولات النماذج كاملةً. وبدمجها مع استنتاج الأنواع في TypeScript، تكسب أمانًا وتجربة مطوّر (developer experience) تجعلان التعامل مع النماذج ممتعًا فعلًا.</p>
<p>بدلًا من مشاحنة حالةٍ مُبعثرةٍ ومعالجات أحداثٍ أمْرِيّة، تَصِف ما ينبغي أن يقع عند إرسال النماذج—وReact يتولّى الباقي. فتصبح نماذجك أكثر قابلية للتنبّؤ، وتصير معالجة الأخطاء لديك أكثر اتساقًا، ويحصل مستخدموك على تجارب أفضل مع حالات تحميل سليمة وتحسينٍ تدريجيّ (progressive enhancement).</p>
<p>مستقبل معالجة النماذج في React مُحدَّدٌ بالأنواع، إعلانيّ، ومدهشٌ في مدى متعة العمل به. جرّب هذه الأنماط في مشروعك القادم—وقد تجد نفسك تتطلّع فعلًا إلى تنفيذ ذلك النموذج التالي.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
