const s="kinney",a="react-typescript",n="React مع TypeScript",l="typing-dom-and-react-events",t="نمطجة أحداث DOM وأحداث React",p=[{depth:2,id:"الأساس-فهم-syntheticevent",text:"الأساس: فهم SyntheticEvent"},{depth:2,id:"أحداث-الفأرة-نقرات-وتحومات-والمزيد",text:"أحداث الفأرة: نقرات وتحوّمات والمزيد"},{depth:2,id:"أحداث-لوحة-المفاتيح-ما-هو-أبعد-من-مجرد-اضغط-enter",text:"أحداث لوحة المفاتيح: ما هو أبعد من مجرد «اضغط Enter»"},{depth:2,id:"أحداث-النماذج-الخبز-والزبدة",text:"أحداث النماذج: الخبز والزبدة"},{depth:2,id:"التعامل-مع-عناصر-النماذج-المختلفة",text:"التعامل مع عناصر النماذج المختلفة"},{depth:2,id:"متقدم-معالج-أحداث-عامة",text:"متقدّم: معالِج أحداث عامة"},{depth:2,id:"الأنماط-الشائعة-وأفضل-الممارسات",text:"الأنماط الشائعة وأفضل الممارسات"},{depth:3,id:"استخراج-معالج-الأحداث-لإعادة-الاستخدام",text:"استخراج معالِج الأحداث لإعادة الاستخدام"},{depth:3,id:"نمطج-معالج-الأحداث-داخل-السطر-عند-البساطة",text:"نمطج معالِج الأحداث داخل السطر عند البساطة"},{depth:3,id:"التعامل-الآمن-مع-العمليات-غير-المتزامنة",text:"التعامل الآمن مع العمليات غير المتزامنة"},{depth:2,id:"أحداث-التركيب-composition-دعم-الإدخال-الدولي",text:"أحداث التركيب (Composition): دعم الإدخال الدولي"},{depth:2,id:"أحداث-السحب-والإفلات-رفع-الملفات-ببساطة",text:"أحداث السحب والإفلات: رفع الملفات ببساطة"},{depth:2,id:"حالات-استخدام-من-العالم-الحقيقي",text:"حالات استخدام من العالم الحقيقي™"},{depth:3,id:"بناء-مكون-بحث-بإدخال-مؤجل",text:"بناء مكوّن بحث بإدخال مؤجَّل"},{depth:3,id:"نافذة-منبثقة-مع-معالجة-صحيحة-لمفتاح-escape",text:"نافذة منبثقة مع معالجة صحيحة لمفتاح Escape"},{depth:2,id:"مرجع-أنواع-الأحداث",text:"مرجع أنواع الأحداث"},{depth:2,id:"تشخيص-المشكلات-الشائعة",text:"تشخيص المشكلات الشائعة"},{depth:3,id:"الخاصية-غير-موجودة-على-النوع-eventtarget",text:"«الخاصية غير موجودة على النوع EventTarget»"},{depth:3,id:"عدم-تطابق-أنواع-معالج-الأحداث",text:"عدم تطابق أنواع معالِج الأحداث"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>معالجة الأحداث هي المكان الذي تلتقي فيه React بفوضى تفاعل المستخدم — النقرات وضغطات المفاتيح وإرسال النماذج وكل الفوضى التي تجعل تطبيقات الويب تبدو حيّة. يمكن لـ TypeScript مساعدتك في ترويض هذا التعقيد عبر نمطجة دقيقة لمعالِج الأحداث، لكن ذلك فقط إن كنت تعرف أي الأنواع تستخدم ومتى. لنستكشف كيف تنمّط أحداث React بشكل صحيح فتعمل معالِجاتك على نحو يمكن التنبؤ به ويصبح محرّرك البرمجي حليفًا لك لا خصمًا.</p>
<p>تلفّ React أحداث DOM الأصلية داخل كائنات <code>SyntheticEvent</code> لتوفّر التوافق بين المتصفحات ووظائف إضافية. ورغم أن هذا التجريد غير مرئي غالبًا أثناء التطوير، إلا أنه يظهر بوضوح تام حين تحاول إرضاء مدقّق أنواع TypeScript. والخبر الجيد؟ حين تتعلّم الأنماط، تصبح نمطجة الأحداث أمرًا بديهيًا.</p>
<h2 id="الأساس-فهم-syntheticevent">الأساس: فهم SyntheticEvent</h2>
<p>يستقبل كل معالِج أحداث في React كائن <code>SyntheticEvent</code> — وهو غلاف React لأحداث DOM الأصلية. لهذه الأحداث الاصطناعية الواجهة نفسها التي للأحداث الأصلية لكن باتّساق مضمون بين المتصفحات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SyntheticEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleGenericEvent</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">SyntheticEvent</span></span>) {
  <span class="hljs-comment">// Works with any React event</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Event type:&#x27;</span>, event.<span class="hljs-property">type</span>);
  event.<span class="hljs-title function_">preventDefault</span>();
  event.<span class="hljs-title function_">stopPropagation</span>();
}

<span class="hljs-comment">// ❌ Too generic - you lose specific event properties</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleGenericEvent}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<p>رغم أن <code>SyntheticEvent</code> يصلح للحالات الأساسية، فغالبًا ما ستحتاج إلى أنواع أدقّ للوصول إلى الخصائص الخاصة بالحدث والحصول على IntelliSense أفضل.</p>
<h2 id="أحداث-الفأرة-نقرات-وتحومات-والمزيد">أحداث الفأرة: نقرات وتحوّمات والمزيد</h2>
<p>أحداث الفأرة على الأرجح أكثر الأحداث التي ستتعامل معها. توفّر React أنواعًا محدّدة للتفاعلات المختلفة مع الفأرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MouseEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleClick</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) {
  <span class="hljs-comment">// ✅ Full access to mouse event properties</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked at:&#x27;</span>, event.<span class="hljs-property">clientX</span>, event.<span class="hljs-property">clientY</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Button pressed:&#x27;</span>, event.<span class="hljs-property">button</span>); <span class="hljs-comment">// 0 = left, 1 = middle, 2 = right</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Alt key held:&#x27;</span>, event.<span class="hljs-property">altKey</span>);

  <span class="hljs-comment">// The target is properly typed as HTMLButtonElement</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Button text:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">textContent</span>);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">InteractiveButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseEnter</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">style</span>.<span class="hljs-property">backgroundColor</span> = <span class="hljs-string">&#x27;#blue&#x27;</span>;
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseLeave</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">style</span>.<span class="hljs-property">backgroundColor</span> = <span class="hljs-string">&#x27;&#x27;</span>;
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>
      <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{handleMouseEnter}</span>
      <span class="hljs-attr">onMouseLeave</span>=<span class="hljs-string">{handleMouseLeave}</span>
    &gt;</span>
      Hover and click me
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>event.currentTarget</code> بدلًا من <code>event.target</code> حين تحتاج إلى العنصر الذي مُرفق به معالِج الحدث. أما <code>event.target</code> فيعطيك العنصر الذي أطلق الحدث (قد يكون عنصرًا فرعيًا).</p>
</blockquote>
<h2 id="أحداث-لوحة-المفاتيح-ما-هو-أبعد-من-مجرد-اضغط-enter">أحداث لوحة المفاتيح: ما هو أبعد من مجرد «اضغط Enter»</h2>
<p>أحداث لوحة المفاتيح أساسية لإمكانية الوصول (accessibility) ولمسارات عمل المستخدمين المحترفين. يساعدك TypeScript على التعامل معها بشكل صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">KeyboardEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleKeyPress</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) {
  <span class="hljs-comment">// ✅ Access to keyboard-specific properties</span>
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Enter&#x27;</span> &amp;&amp; event.<span class="hljs-property">ctrlKey</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Ctrl+Enter pressed!&#x27;</span>);
    <span class="hljs-comment">// Submit form or perform action</span>
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// Check for specific keys</span>
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Escape&#x27;</span>) {
    event.<span class="hljs-property">currentTarget</span>.<span class="hljs-title function_">blur</span>(); <span class="hljs-comment">// Remove focus</span>
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// Access the input value</span>
  <span class="hljs-keyword">const</span> currentValue = event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Typing in:&#x27;</span>, currentValue);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">KeyboardInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleKeyDown</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-comment">// Prevent certain keys from being processed</span>
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Tab&#x27;</span> &amp;&amp; event.<span class="hljs-property">shiftKey</span>) {
      event.<span class="hljs-title function_">preventDefault</span>();
      <span class="hljs-comment">// Handle custom tab navigation</span>
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">onKeyPress</span>=<span class="hljs-string">{handleKeyPress}</span>
      <span class="hljs-attr">onKeyDown</span>=<span class="hljs-string">{handleKeyDown}</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Try Ctrl+Enter or Escape&quot;</span>
    /&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p><code>onKeyPress</code> مهجور لصالح <code>onKeyDown</code> في معظم حالات الاستخدام. استخدم <code>onKeyDown</code> لكشف المفاتيح و<code>onKeyUp</code> للإجراءات التي ينبغي أن تحدث عند إفلات المفاتيح.</p>
</blockquote>
<h2 id="أحداث-النماذج-الخبز-والزبدة">أحداث النماذج: الخبز والزبدة</h2>
<p>التعامل مع النماذج هو حيث تبرز نمطجة الأحداث الصحيحة. ستتعامل بانتظام مع إرسال النماذج وتغيّر حقول الإدخال وأحداث التركيز:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FormEvent</span>, <span class="hljs-title class_">ChangeEvent</span>, <span class="hljs-title class_">FocusEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormData</span> {
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LoginForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = useState&lt;<span class="hljs-title class_">FormData</span>&gt;({
    <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form submitted:&#x27;</span>, formData);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">const</span> { name, value } = event.<span class="hljs-property">currentTarget</span>;
    <span class="hljs-title function_">setFormData</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({
      ...prev,
      [name]: value
    }));
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputFocus</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FocusEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Focused:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">name</span>);
    <span class="hljs-comment">// Maybe clear validation errors for this field</span>
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputBlur</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FocusEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Blurred:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">name</span>);
    <span class="hljs-comment">// Maybe validate this field</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.username}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span>
        <span class="hljs-attr">onFocus</span>=<span class="hljs-string">{handleInputFocus}</span>
        <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{handleInputBlur}</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Username&quot;</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.email}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span>
        <span class="hljs-attr">onFocus</span>=<span class="hljs-string">{handleInputFocus}</span>
        <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{handleInputBlur}</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;password&quot;</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.password}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span>
        <span class="hljs-attr">onFocus</span>=<span class="hljs-string">{handleInputFocus}</span>
        <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{handleInputBlur}</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Password&quot;</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Sign In<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-مع-عناصر-النماذج-المختلفة">التعامل مع عناصر النماذج المختلفة</h2>
<p>لكل عنصر في النماذج أنواع أحداث مختلفة. إليك كيفية التعامل مع العناصر الشائعة بشكل صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChangeEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FormElementExamples</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Input elements</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Input value:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);
  };

  <span class="hljs-comment">// ✅ Textarea elements</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleTextareaChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLTextAreaElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Textarea value:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);
  };

  <span class="hljs-comment">// ✅ Select elements</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSelectChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLSelectElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Selected option:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);
    <span class="hljs-comment">// For multi-select, you&#x27;d need to iterate through options</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Text input&quot;</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleTextareaChange}</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Long text input&quot;</span>
      /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleSelectChange}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>Choose an option<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option1&quot;</span>&gt;</span>Option 1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option2&quot;</span>&gt;</span>Option 2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متقدم-معالج-أحداث-عامة">متقدّم: معالِج أحداث عامة</h2>
<p>أحيانًا تريد كتابة معالِج أحداث قابل لإعادة الاستخدام يعمل مع عدة أنواع من العناصر. المعاملات العامة (generics) في TypeScript تجعل ذلك ممكنًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChangeEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Generic handler that works with any form element</span>
<span class="hljs-keyword">function</span> createFormHandler&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(
  <span class="hljs-attr">callback</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>
) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;T&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> target = event.<span class="hljs-property">currentTarget</span>;
    <span class="hljs-keyword">const</span> name = target.<span class="hljs-title function_">getAttribute</span>(<span class="hljs-string">&#x27;name&#x27;</span>) || <span class="hljs-string">&#x27;&#x27;</span>;

    <span class="hljs-comment">// Handle different element types</span>
    <span class="hljs-keyword">let</span> value = <span class="hljs-string">&#x27;&#x27;</span>;
    <span class="hljs-keyword">if</span> (target <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span> || target <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLTextAreaElement</span>) {
      value = target.<span class="hljs-property">value</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLSelectElement</span>) {
      value = target.<span class="hljs-property">value</span>;
    }

    <span class="hljs-title function_">callback</span>(name, value);
  };
}

## <span class="hljs-title class_">Typed</span> <span class="hljs-title class_">Event</span> <span class="hljs-title class_">Helpers</span> and <span class="hljs-title class_">Overloads</span>

<span class="hljs-title class_">Sometimes</span> you want ergonomic handlers that accept either raw events or pre-extracted values. <span class="hljs-title class_">You</span> can model <span class="hljs-variable language_">this</span> <span class="hljs-keyword">with</span> <span class="hljs-keyword">function</span> overloads <span class="hljs-keyword">while</span> keeping call sites clean.

<span class="hljs-string">\`\`</span><span class="hljs-string">\`tsx
// Overload to accept either the event or the extracted value
function onInputChange(handler: (value: string) =&gt; void): (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void;
function onInputChange(handler: (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void): (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void;
function onInputChange(
  handler: ((value: string) =&gt; void) | ((e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void),
) {
  return (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; {
    // If the handler expects a value, pass value; otherwise pass event
    if (handler.length === 1) {
      try {
        (handler as (value: string) =&gt; void)(e.target.value);
        return;
      } catch {
        // fall-through to event
      }
    }
    (handler as (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void)(e);
  };
}

// Usage
&lt;input onChange={onInputChange((value) =&gt; setQuery(value))} /&gt;
&lt;input onChange={onInputChange((e) =&gt; console.log(e.target.selectionStart))} /&gt;

// Key handlers with discriminated keys
type ArrowKey = &#x27;ArrowUp&#x27; | &#x27;ArrowDown&#x27; | &#x27;ArrowLeft&#x27; | &#x27;ArrowRight&#x27;;

function onArrow(handler: (key: ArrowKey, e: React.KeyboardEvent) =&gt; void) {
  return (e: React.KeyboardEvent) =&gt; {
    const k = e.key as ArrowKey;
    if (k === &#x27;ArrowUp&#x27; || k === &#x27;ArrowDown&#x27; || k === &#x27;ArrowLeft&#x27; || k === &#x27;ArrowRight&#x27;) {
      handler(k, e);
    }
  };
}

&lt;div onKeyDown={onArrow((key) =&gt; console.log(&#x27;pressed&#x27;, key))} /&gt;
\`</span><span class="hljs-string">\`\`</span>

<span class="hljs-title class_">These</span> helpers keep component code concise <span class="hljs-keyword">while</span> preserving strong typing <span class="hljs-keyword">for</span> both ergonomic and low-level cases.

<span class="hljs-string">\`\`</span><span class="hljs-string">\`tsx
function GenericForm() {
const handleChange = createFormHandler((name, value) =&gt; {
console.log(\`</span><span class="hljs-title class_">Field</span> \${name} changed <span class="hljs-attr">to</span>: \${value}<span class="hljs-string">\`);
});

return (
&lt;form&gt;
&lt;input name=&quot;firstName&quot; onChange={handleChange} /&gt;
&lt;textarea name=&quot;bio&quot; onChange={handleChange} /&gt;
&lt;select name=&quot;country&quot; onChange={handleChange}&gt;
&lt;option value=&quot;us&quot;&gt;United States&lt;/option&gt;
&lt;option value=&quot;ca&quot;&gt;Canada&lt;/option&gt;
&lt;/select&gt;
&lt;/form&gt;
);
}
\`</span><span class="hljs-string">\`\`</span>

## <span class="hljs-title class_">Custom</span> <span class="hljs-title class_">Event</span> <span class="hljs-title class_">Handlers</span> and <span class="hljs-title class_">Event</span> <span class="hljs-title class_">Delegation</span>

<span class="hljs-title class_">Sometimes</span> you need to create custom event handlers or implement event delegation patterns. <span class="hljs-title class_">Here</span><span class="hljs-string">&#x27;s how to do it with proper typing:

\`\`\`ts
import { MouseEvent, useRef } from &#x27;</span>react<span class="hljs-string">&#x27;;

interface ListItem {
  id: string;
  text: string;
  type: &#x27;</span>button<span class="hljs-string">&#x27; | &#x27;</span>link<span class="hljs-string">&#x27; | &#x27;</span>text<span class="hljs-string">&#x27;;
}

function EventDelegationExample() {
  const listRef = useRef&lt;HTMLUListElement&gt;(null);

  const handleListClick = (event: MouseEvent&lt;HTMLUListElement&gt;) =&gt; {
    const target = event.target as HTMLElement;

    // Find the closest list item
    const listItem = target.closest(&#x27;</span>li<span class="hljs-string">&#x27;);
    if (!listItem) return;

    const itemId = listItem.getAttribute(&#x27;</span>data-id<span class="hljs-string">&#x27;);
    const itemType = listItem.getAttribute(&#x27;</span>data-<span class="hljs-keyword">type</span><span class="hljs-string">&#x27;);

    console.log(&#x27;</span><span class="hljs-title class_">Clicked</span> <span class="hljs-attr">item</span>:<span class="hljs-string">&#x27;, { itemId, itemType });

    // Handle different item types
    if (itemType === &#x27;</span>button<span class="hljs-string">&#x27;) {
      // Handle button click
    } else if (itemType === &#x27;</span>link<span class="hljs-string">&#x27;) {
      // Handle link click
    }
  };

  const items: ListItem[] = [
    { id: &#x27;</span><span class="hljs-number">1</span><span class="hljs-string">&#x27;, text: &#x27;</span><span class="hljs-title class_">Click</span> me<span class="hljs-string">&#x27;, type: &#x27;</span>button<span class="hljs-string">&#x27; },
    { id: &#x27;</span><span class="hljs-number">2</span><span class="hljs-string">&#x27;, text: &#x27;</span><span class="hljs-title class_">Visit</span> link<span class="hljs-string">&#x27;, type: &#x27;</span>link<span class="hljs-string">&#x27; },
    { id: &#x27;</span><span class="hljs-number">3</span><span class="hljs-string">&#x27;, text: &#x27;</span><span class="hljs-title class_">Just</span> text<span class="hljs-string">&#x27;, type: &#x27;</span>text<span class="hljs-string">&#x27; },
  ];

  return (
    &lt;ul ref={listRef} onClick={handleListClick}&gt;
      {items.map(item =&gt; (
        &lt;li key={item.id} data-id={item.id} data-type={item.type}&gt;
          {item.text}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</span></code></pre>
<h2 id="الأنماط-الشائعة-وأفضل-الممارسات">الأنماط الشائعة وأفضل الممارسات</h2>
<p>إليك بعض الأنماط التي ستستخدمها بانتظام عند نمطجة أحداث React:</p>
<h3 id="استخراج-معالج-الأحداث-لإعادة-الاستخدام">استخراج معالِج الأحداث لإعادة الاستخدام</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Extract handlers into custom hooks or separate functions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useFormHandlers</span>(<span class="hljs-params"><span class="hljs-attr">onSubmit</span>: (data: FormData) =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>(event.<span class="hljs-property">currentTarget</span>);
    <span class="hljs-title function_">onSubmit</span>(formData);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleReset</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-property">currentTarget</span>.<span class="hljs-title function_">reset</span>();
  };

  <span class="hljs-keyword">return</span> { handleSubmit, handleReset };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { handleSubmit, handleReset } = <span class="hljs-title function_">useFormHandlers</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form data:&#x27;</span>, <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(data));
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span> <span class="hljs-attr">onReset</span>=<span class="hljs-string">{handleReset}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;reset&quot;</span>&gt;</span>Reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="نمطج-معالج-الأحداث-داخل-السطر-عند-البساطة">نمطج معالِج الأحداث داخل السطر عند البساطة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SimpleComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* ✅ Simple inline handlers can be typed automatically */}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> console.log(&#x27;Clicked!&#x27;)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {/* ✅ Or explicitly when you need specific properties */}
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e:</span> <span class="hljs-attr">ChangeEvent</span>&lt;<span class="hljs-attr">HTMLInputElement</span>&gt;</span>) =&gt; {
        console.log(&#x27;Value:&#x27;, e.currentTarget.value);
      }} /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  );
}
</span></code></pre>
<h3 id="التعامل-الآمن-مع-العمليات-غير-المتزامنة">التعامل الآمن مع العمليات غير المتزامنة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FormEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isSubmitting, setIsSubmitting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();

    <span class="hljs-keyword">if</span> (isSubmitting) <span class="hljs-keyword">return</span>; <span class="hljs-comment">// Prevent double submission</span>

    <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>(event.<span class="hljs-property">currentTarget</span>);
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">submitFormData</span>(formData);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form submitted successfully&#x27;</span>);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Submission failed:&#x27;</span>, error);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;data&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isSubmitting}</span>&gt;</span>
        {isSubmitting ? &#x27;Submitting...&#x27; : &#x27;Submit&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Mock async function</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">submitFormData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">FormData</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
  <span class="hljs-comment">// Simulate API call</span>
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">1000</span>));
}
</code></pre>
<h2 id="أحداث-التركيب-composition-دعم-الإدخال-الدولي">أحداث التركيب (Composition): دعم الإدخال الدولي</h2>
<p>بالنسبة إلى التطبيقات التي تحتاج إلى دعم المستخدمين الدوليين، تكون أحداث التركيب (composition events) حيوية للتعامل الصحيح مع إدخال النص، ولا سيما للغات التي تستخدم محرّكات الإدخال المنهجي (IMEs):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">CompositionEvent</span>, <span class="hljs-title class_">ChangeEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">InternationalInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isComposing, setIsComposing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCompositionStart</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CompositionEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setIsComposing</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Composition started:&#x27;</span>, event.<span class="hljs-property">data</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCompositionUpdate</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CompositionEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Composition updating:&#x27;</span>, event.<span class="hljs-property">data</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCompositionEnd</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CompositionEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setIsComposing</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Composition ended:&#x27;</span>, event.<span class="hljs-property">data</span>);
    <span class="hljs-comment">// Now safe to process the final input</span>
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setValue</span>(event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);

    <span class="hljs-comment">// Don&#x27;t process changes during composition for IME languages</span>
    <span class="hljs-keyword">if</span> (!isComposing) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Processing change:&#x27;</span>, event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);
      <span class="hljs-comment">// Safe to trigger search, validation, etc.</span>
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span>
      <span class="hljs-attr">onCompositionStart</span>=<span class="hljs-string">{handleCompositionStart}</span>
      <span class="hljs-attr">onCompositionUpdate</span>=<span class="hljs-string">{handleCompositionUpdate}</span>
      <span class="hljs-attr">onCompositionEnd</span>=<span class="hljs-string">{handleCompositionEnd}</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type in any language&quot;</span>
    /&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تحقّق دائمًا من حالة <code>isComposing</code> قبل معالجة تغيّرات الإدخال في التطبيقات الدولية تفاديًا للتداخل مع طرق إدخال IME.</p>
</blockquote>
<h2 id="أحداث-السحب-والإفلات-رفع-الملفات-ببساطة">أحداث السحب والإفلات: رفع الملفات ببساطة</h2>
<p>أحداث السحب والإفلات مثالية لإنشاء واجهات رفع ملفات بديهية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DragEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FileDropZone</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isDragOver, setIsDragOver] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [files, setFiles] = useState&lt;<span class="hljs-title class_">File</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDragEnter</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">DragEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-title function_">setIsDragOver</span>(<span class="hljs-literal">true</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDragLeave</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">DragEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-title function_">setIsDragOver</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDragOver</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">DragEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>(); <span class="hljs-comment">// Necessary to allow drop</span>
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDrop</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">DragEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    event.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-title function_">setIsDragOver</span>(<span class="hljs-literal">false</span>);

    <span class="hljs-keyword">const</span> droppedFiles = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(event.<span class="hljs-property">dataTransfer</span>.<span class="hljs-property">files</span>);

    <span class="hljs-comment">// Filter for specific file types</span>
    <span class="hljs-keyword">const</span> imageFiles = droppedFiles.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span>
      file.<span class="hljs-property">type</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;image/&#x27;</span>)
    );

    <span class="hljs-title function_">setFiles</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> [...prev, ...imageFiles]);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Dropped files:&#x27;</span>, imageFiles.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f.<span class="hljs-property">name</span>));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">onDragEnter</span>=<span class="hljs-string">{handleDragEnter}</span>
      <span class="hljs-attr">onDragLeave</span>=<span class="hljs-string">{handleDragLeave}</span>
      <span class="hljs-attr">onDragOver</span>=<span class="hljs-string">{handleDragOver}</span>
      <span class="hljs-attr">onDrop</span>=<span class="hljs-string">{handleDrop}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">border:</span> \`<span class="hljs-attr">2px</span> <span class="hljs-attr">dashed</span> \${<span class="hljs-attr">isDragOver</span> ? &#x27;#<span class="hljs-attr">007acc</span>&#x27; <span class="hljs-attr">:</span> &#x27;#<span class="hljs-attr">ccc</span>&#x27;}\`,
        <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">2rem</span>&#x27;,
        <span class="hljs-attr">textAlign:</span> &#x27;<span class="hljs-attr">center</span>&#x27;,
        <span class="hljs-attr">backgroundColor:</span> <span class="hljs-attr">isDragOver</span> ? &#x27;#<span class="hljs-attr">f0f8ff</span>&#x27; <span class="hljs-attr">:</span> &#x27;#<span class="hljs-attr">fafafa</span>&#x27;
      }}
    &gt;</span>
      {isDragOver ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Drop files here!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Drag image files here to upload<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}

      {files.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Uploaded files:<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {files.map((file, index) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{file.name} ({file.size} bytes)<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="حالات-استخدام-من-العالم-الحقيقي">حالات استخدام من العالم الحقيقي™</h2>
<p>لننظر إلى بعض السيناريوهات العملية التي تنقذ فيها نمطجة الأحداث الصحيحة الموقف:</p>
<h3 id="بناء-مكون-بحث-بإدخال-مؤجل">بناء مكوّن بحث بإدخال مؤجَّل</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChangeEvent</span>, <span class="hljs-title class_">KeyboardEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useState, useEffect, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SearchProps</span> {
  <span class="hljs-attr">onSearch</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">debounceMs</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchInput</span>(<span class="hljs-params">{ onSearch, placeholder = <span class="hljs-string">&#x27;Search...&#x27;</span>, debounceMs = <span class="hljs-number">300</span> }: <span class="hljs-title class_">SearchProps</span></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Debounced search effect</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (query.<span class="hljs-title function_">trim</span>()) {
        <span class="hljs-title function_">onSearch</span>(query);
      }
    }, debounceMs);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
  }, [query, onSearch, debounceMs]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleInputChange</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleKeyDown</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Escape&#x27;</span>) {
      <span class="hljs-title function_">setQuery</span>(<span class="hljs-string">&#x27;&#x27;</span>);
      event.<span class="hljs-property">currentTarget</span>.<span class="hljs-title function_">blur</span>();
    }

    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Enter&#x27;</span>) {
      event.<span class="hljs-title function_">preventDefault</span>();
      <span class="hljs-title function_">onSearch</span>(query);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span>
      <span class="hljs-attr">onKeyDown</span>=<span class="hljs-string">{handleKeyDown}</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">{placeholder}</span>
    /&gt;</span></span>
  );
}
</code></pre>
<h3 id="نافذة-منبثقة-مع-معالجة-صحيحة-لمفتاح-escape">نافذة منبثقة مع معالجة صحيحة لمفتاح Escape</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">KeyboardEvent</span>, <span class="hljs-title class_">MouseEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ isOpen, onClose, children }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-comment">// Handle escape key globally when modal is open</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleEscapeKey</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: globalThis.<span class="hljs-title class_">KeyboardEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Escape&#x27;</span>) {
        <span class="hljs-title function_">onClose</span>();
      }
    };

    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleEscapeKey);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleEscapeKey);
  }, [isOpen, onClose]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleBackdropClick</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    <span class="hljs-comment">// Only close if clicking the backdrop, not the modal content</span>
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">target</span> === event.<span class="hljs-property">currentTarget</span>) {
      <span class="hljs-title function_">onClose</span>();
    }
  };

  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-backdrop&quot;</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleBackdropClick}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">fixed</span>&#x27;,
        <span class="hljs-attr">top:</span> <span class="hljs-attr">0</span>,
        <span class="hljs-attr">left:</span> <span class="hljs-attr">0</span>,
        <span class="hljs-attr">right:</span> <span class="hljs-attr">0</span>,
        <span class="hljs-attr">bottom:</span> <span class="hljs-attr">0</span>,
        <span class="hljs-attr">backgroundColor:</span> &#x27;<span class="hljs-attr">rgba</span>(<span class="hljs-attr">0</span>, <span class="hljs-attr">0</span>, <span class="hljs-attr">0</span>, <span class="hljs-attr">0.5</span>)&#x27;,
        <span class="hljs-attr">display:</span> &#x27;<span class="hljs-attr">flex</span>&#x27;,
        <span class="hljs-attr">alignItems:</span> &#x27;<span class="hljs-attr">center</span>&#x27;,
        <span class="hljs-attr">justifyContent:</span> &#x27;<span class="hljs-attr">center</span>&#x27;
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-content&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">backgroundColor:</span> &#x27;<span class="hljs-attr">white</span>&#x27;,
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">2rem</span>&#x27;,
        <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
        <span class="hljs-attr">maxWidth:</span> &#x27;<span class="hljs-attr">500px</span>&#x27;,
        <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">90</span>%&#x27;
      }}&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مرجع-أنواع-الأحداث">مرجع أنواع الأحداث</h2>
<p>إليك مرجعًا سريعًا لأشهر أنواع أحداث React:</p>
<table>
<thead>
<tr>
<th>نوع الحدث</th>
<th>الاستخدام</th>
<th>أنواع العناصر</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>MouseEvent&lt;T&gt;</code></td>
<td>النقرات وحركة الفأرة</td>
<td><code>HTMLButtonElement</code> و<code>HTMLDivElement</code> وغيرها</td>
</tr>
<tr>
<td><code>KeyboardEvent&lt;T&gt;</code></td>
<td>ضغطات المفاتيح</td>
<td><code>HTMLInputElement</code> و<code>HTMLTextAreaElement</code></td>
</tr>
<tr>
<td><code>ChangeEvent&lt;T&gt;</code></td>
<td>تغيّرات حقول النماذج</td>
<td><code>HTMLInputElement</code> و<code>HTMLSelectElement</code> و<code>HTMLTextAreaElement</code></td>
</tr>
<tr>
<td><code>FormEvent&lt;T&gt;</code></td>
<td>إرسال النموذج</td>
<td><code>HTMLFormElement</code></td>
</tr>
<tr>
<td><code>FocusEvent&lt;T&gt;</code></td>
<td>أحداث التركيز وفقدان التركيز</td>
<td>أي عنصر يقبل التركيز</td>
</tr>
<tr>
<td><code>CompositionEvent&lt;T&gt;</code></td>
<td>تركيب الإدخال عبر IME</td>
<td><code>HTMLInputElement</code> و<code>HTMLTextAreaElement</code></td>
</tr>
<tr>
<td><code>DragEvent&lt;T&gt;</code></td>
<td>عمليات السحب والإفلات</td>
<td>أي عنصر</td>
</tr>
<tr>
<td><code>SyntheticEvent&lt;T&gt;</code></td>
<td>بديل عام</td>
<td>أي عنصر</td>
</tr>
</tbody>
</table>
<h2 id="تشخيص-المشكلات-الشائعة">تشخيص المشكلات الشائعة</h2>
<h3 id="الخاصية-غير-موجودة-على-النوع-eventtarget">«الخاصية غير موجودة على النوع EventTarget»</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will cause TypeScript errors</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">badHandler</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>); <span class="hljs-comment">// Error! EventTarget doesn&#x27;t have &#x27;value&#x27;</span>
}

<span class="hljs-comment">// ✅ Use currentTarget or proper type assertions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">goodHandler</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">value</span>); <span class="hljs-comment">// Works!</span>

  <span class="hljs-comment">// Or use type assertion if you must use target</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>((event.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLInputElement</span>).<span class="hljs-property">value</span>);
}
</code></pre>
<h3 id="عدم-تطابق-أنواع-معالج-الأحداث">عدم تطابق أنواع معالِج الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Wrong element type</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
  <span class="hljs-comment">// Handler expects input element</span>
};

<span class="hljs-comment">// ❌ This will cause TypeScript error</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

<span class="hljs-comment">// ✅ Match the handler type to the element</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleButtonClick</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt; {
  <span class="hljs-comment">// Handler expects button element</span>
};

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleButtonClick}</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>مع نمطجة الأحداث الصحيحة ضمن عُدّة أدواتك، يمكنك:</p>
<ul>
<li>تبني نماذج وأنت مطمئن إلى أن معالِجاتك ستتلقّى أنواع البيانات الصحيحة</li>
<li>تنشئ أنماطًا قابلة لإعادة الاستخدام للتعامل مع الأحداث في تطبيقك كله</li>
<li>تلتقط الأخطاء المتعلقة بالأحداث وقت التصريف بدلًا من وقت التشغيل</li>
<li>تستفيد من الإكمال التلقائي في محرّرك البرمجي لخصائص الأحداث</li>
</ul>
<p>وتذكّر: أحداث React الاصطناعية في صفّك، لكن نمطجة الأحداث في TypeScript هي ما يجعلها قويّة حقًا. ابدأ بأنواع الأحداث المحدّدة (<code>MouseEvent</code> و<code>ChangeEvent</code> وغيرها) بدل <code>SyntheticEvent</code> العام، ودع TypeScript يوجّهك نحو شيفرة أكثر متانة في التعامل مع الأحداث.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
