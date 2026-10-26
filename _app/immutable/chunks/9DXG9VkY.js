const s="kinney",a="react-typescript",n="React مع TypeScript",l="forms-events-and-number-inputs",p="النماذج والأحداث وحقول الأرقام",t=[{depth:2,id:"المشكلة-مع-أنواع-الأحداث",text:"المشكلة مع أنواع الأحداث"},{depth:2,id:"معالج-أحداث-عامة-تعمل-فعلا",text:"معالِج أحداث عامة تعمل فعلًا"},{depth:2,id:"خدعة-حقول-الأرقام-الكبرى",text:"خدعة حقول الأرقام الكبرى"},{depth:3,id:"الخيار-1-التحويل-على-مستوى-المعالج",text:"الخيار 1: التحويل على مستوى المعالِج"},{depth:3,id:"الخيار-2-معالج-أرقام-عام-مع-تحقق",text:"الخيار 2: معالِج أرقام عام مع تحقّق"},{depth:3,id:"الخيار-3-خطاف-مخصص-لحقول-الأرقام",text:"الخيار 3: خُطّاف مخصّص لحقول الأرقام"},{depth:2,id:"إرسال-النماذج-دون-المزالق",text:"إرسال النماذج دون المزالق"},{depth:2,id:"المتحكم-به-مقابل-غير-المتحكم-به-اختر-سمك",text:"المُتحكَّم به مقابل غير المُتحكَّم به: اختر سمّك"},{depth:3,id:"المكونات-المتحكم-بها-الأكثر-شيوعا",text:"المكوّنات المُتحكَّم بها (الأكثر شيوعًا)"},{depth:3,id:"المكونات-غير-المتحكم-بها-أحيانا-أفضل",text:"المكوّنات غير المُتحكَّم بها (أحيانًا أفضل)"},{depth:2,id:"متقدم-باني-نماذج-آمن-الأنواع",text:"متقدّم: باني نماذج آمن الأنواع"},{depth:2,id:"المزالق-الشائعة-وكيف-تتجنبها",text:"المزالق الشائعة وكيف تتجنّبها"},{depth:3,id:"محاربة-واجهة-dom",text:"محاربة واجهة DOM"},{depth:3,id:"أنواع-أحداث-معقدة-أكثر-من-اللازم",text:"أنواع أحداث معقّدة أكثر من اللازم"},{depth:3,id:"إهمال-الحالات-الحدية",text:"إهمال الحالات الحدّية"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"تأجيل-العمليات-المكلفة",text:"تأجيل العمليات المكلفة"},{depth:3,id:"تقسيم-النماذج-الكبيرة",text:"تقسيم النماذج الكبيرة"},{depth:2,id:"متى-تستخدم-مكتبات-النماذج",text:"متى تستخدم مكتبات النماذج"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>ينبغي أن يكون بناء النماذج في React باستخدام TypeScript أمرًا مباشرًا — حدّد حالتك، وتعامل مع الأحداث، وصيّر حقول الإدخال. لكنك تصطدم بالمزالق الكلاسيكية: أنواع أحداث لا معنى لها، و<code>&lt;input type=&quot;number&quot;&gt;</code> الذي يعيد سلاسل نصية على أي حال، ومعالِجات نماذج تحتاج إلى نفس الشيفرة المتكرّرة في كل مكان. لنُصلح كل ذلك بأنماط متينة تجعل نماذجك آمنة الأنواع وممتعة في العمل فعلًا.</p>
<h2 id="المشكلة-مع-أنواع-الأحداث">المشكلة مع أنواع الأحداث</h2>
<p>قد يبدو نظام أحداث React كمتاهة من الأنواع العامة. تبدأ بمعالِج بسيط لحقل إدخال، فتتلقّى فورًا أخطاء TypeScript التي تدفعك للتساؤل عن قراراتك في الحياة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ What type is this supposed to be?</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params">e</span>) =&gt; {
  <span class="hljs-title function_">setEmail</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>);
};
</code></pre>
<p>يخبرك المصرّف بكل لطف بأن <code>Parameter 'e' implicitly has an 'any' type</code>، وهو أمر عديم الفائدة كنسبة الشوكولاتة في إبريق الشاي. لنُصلح ذلك نهائيًا.</p>
<h2 id="معالج-أحداث-عامة-تعمل-فعلا">معالِج أحداث عامة تعمل فعلًا</h2>
<p>إليك النمط الذي أستخدمه في 90% من حقول النماذج — معالِج عام يستنتج الأنواع الصحيحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChangeEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-comment">// ✅ One handler to rule them all</span>
  <span class="hljs-keyword">const</span> handleInputChange = &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLInputElement</span> | <span class="hljs-title class_">HTMLTextAreaElement</span>&gt;<span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;T&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { name, value } = e.<span class="hljs-property">target</span>;
    <span class="hljs-title function_">setFormData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      [name]: value,
    }));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.name}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.email}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;message&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.message}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>يناسب هذا النهج العام حقول الإدخال ومناطق النص وعناصر الاختيار. يضمن القيد <code>T extends HTMLInputElement | HTMLTextAreaElement</code> أن يعرف TypeScript ما الخصائص المتاحة على <code>e.target</code>.</p>
<h2 id="خدعة-حقول-الأرقام-الكبرى">خدعة حقول الأرقام الكبرى</h2>
<p>هنا تصبح الأمور شهيرة. تظن أن <code>&lt;input type=&quot;number&quot;&gt;</code> سيعطيك أرقامًا، أليس كذلك؟ خطأ! إنه يعطيك سلاسل نصية تبدو كأرقام، لأن عناصر التحكم في نماذج HTML تعيد قيمًا نصية دائمًا عبر واجهة DOM.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will bite you eventually</span>
<span class="hljs-keyword">const</span> [age, setAge] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAgeChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
  <span class="hljs-title function_">setAge</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>); <span class="hljs-comment">// Type error: string is not assignable to number</span>
};
</code></pre>
<p>أمامك بعض الخيارات، وجميعها تتطلّب أن تكون صريحًا بشأن عملية التحويل:</p>
<h3 id="الخيار-1-التحويل-على-مستوى-المعالج">الخيار 1: التحويل على مستوى المعالِج</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">handleNumberChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
  <span class="hljs-keyword">const</span> value = e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span> === <span class="hljs-string">&#x27;&#x27;</span> ? <span class="hljs-number">0</span> : <span class="hljs-title class_">Number</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>);
  <span class="hljs-title function_">setAge</span>(value);
};
</code></pre>
<h3 id="الخيار-2-معالج-أرقام-عام-مع-تحقق">الخيار 2: معالِج أرقام عام مع تحقّق</h3>
<p>هذا هو نهجي المفضّل — معالِج قابل لإعادة الاستخدام يحوّل السلاسل إلى أرقام بأمان:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">handleNumericInput</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;, <span class="hljs-attr">setter</span>: (value: <span class="hljs-built_in">number</span>) =&gt; <span class="hljs-built_in">void</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> { value } = e.<span class="hljs-property">target</span>;

  <span class="hljs-comment">// Handle empty string case</span>
  <span class="hljs-keyword">if</span> (value === <span class="hljs-string">&#x27;&#x27;</span>) {
    <span class="hljs-title function_">setter</span>(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-comment">// Convert and validate</span>
  <span class="hljs-keyword">const</span> numValue = <span class="hljs-title class_">Number</span>(value);
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(numValue)) {
    <span class="hljs-title function_">setter</span>(numValue);
  }
  <span class="hljs-comment">// If NaN, ignore the input (keeps current state)</span>
};

<span class="hljs-comment">// Usage:</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{age}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleNumericInput(e, setAge)} /&gt;</span>;
</code></pre>
<h3 id="الخيار-3-خطاف-مخصص-لحقول-الأرقام">الخيار 3: خُطّاف مخصّص لحقول الأرقام</h3>
<p>في «حالات الاستخدام من العالم الحقيقي™»، أغلّف هذا المنطق عادةً في خُطّاف مخصّص:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useNumberInput</span>(<span class="hljs-params"><span class="hljs-attr">initialValue</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span></span>) {
  <span class="hljs-keyword">const</span> [value, setValue] = useState&lt;<span class="hljs-built_in">number</span>&gt;(initialValue);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">const</span> inputValue = e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>;

    <span class="hljs-keyword">if</span> (inputValue === <span class="hljs-string">&#x27;&#x27;</span>) {
      <span class="hljs-title function_">setValue</span>(<span class="hljs-number">0</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> numValue = <span class="hljs-title class_">Number</span>(inputValue);
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(numValue)) {
      <span class="hljs-title function_">setValue</span>(numValue);
    }
  };

  <span class="hljs-keyword">return</span> {
    value,
    <span class="hljs-attr">onChange</span>: handleChange,
    <span class="hljs-comment">// Convenience setter if you need it</span>
    setValue,
  };
}

<span class="hljs-comment">// Usage becomes beautifully simple:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PriceInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> price = <span class="hljs-title function_">useNumberInput</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">min</span>=<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-attr">step</span>=<span class="hljs-string">&quot;0.01&quot;</span> {<span class="hljs-attr">...price</span>} /&gt;</span></span>;
}
</code></pre>
<h2 id="إرسال-النماذج-دون-المزالق">إرسال النماذج دون المزالق</h2>
<p>إرسال النماذج هو مجال آخر يمكن فيه لـ TypeScript منع أخطاء وقت التشغيل. ستحتاج إلى التحقّق من بيانات نموذجك قبل الإرسال — وهنا يصبح التحقّق وقت التشغيل أمرًا جوهريًا.</p>
<p>للاطلاع على تغطية شاملة للتحقّق وقت التشغيل باستخدام Zod بما في ذلك أنماط تحقّق النماذج، راجع <a href="https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation">جلب البيانات والتحقّق وقت التشغيل</a>.</p>
<p>وهنا منهج بسيط يبدأ من TypeScript لإرسال النماذج الأساسي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FormEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContactFormData</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = useState&lt;<span class="hljs-title class_">ContactFormData</span>&gt;({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;({});

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();

    <span class="hljs-comment">// Basic validation</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">fieldErrors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt; = {};
    <span class="hljs-keyword">if</span> (!formData.<span class="hljs-property">name</span>) fieldErrors.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;Name is required&#x27;</span>;
    <span class="hljs-keyword">if</span> (!formData.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) fieldErrors.<span class="hljs-property">email</span> = <span class="hljs-string">&#x27;Invalid email&#x27;</span>;
    <span class="hljs-keyword">if</span> (formData.<span class="hljs-property">age</span> &lt; <span class="hljs-number">0</span> || formData.<span class="hljs-property">age</span> &gt; <span class="hljs-number">120</span>) fieldErrors.<span class="hljs-property">age</span> = <span class="hljs-string">&#x27;Invalid age&#x27;</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(fieldErrors).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-title function_">setErrors</span>(fieldErrors);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Clear errors and submit</span>
    <span class="hljs-title function_">setErrors</span>({});
    <span class="hljs-title function_">submitForm</span>(formData);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      {/* Your inputs here */}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>في تطبيقات الإنتاج، استخدم مكتبة تحقّق بمخطّطات مثل Zod لضمان أمان الأنواع وقت التشغيل ورسائل خطأ متّسقة. راجع <a href="https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation">جلب البيانات والتحقّق وقت التشغيل</a> أمثلة كاملة.</p>
</blockquote>
<h2 id="المتحكم-به-مقابل-غير-المتحكم-به-اختر-سمك">المُتحكَّم به مقابل غير المُتحكَّم به: اختر سمّك</h2>
<p>توفّر React لك طريقتين للتعامل مع حقول النماذج، ولكل منهما مكانها:</p>
<h3 id="المكونات-المتحكم-بها-الأكثر-شيوعا">المكوّنات المُتحكَّم بها (الأكثر شيوعًا)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ControlledForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [email, setEmail] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{email}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setEmail(e.target.value)} /&gt;</span>;
}
</code></pre>
<p><strong>الإيجابيات</strong>: تحكّم كامل من React، وتحقّق سهل، وحالة يمكن التنبؤ بها <strong>السلبيات</strong>: إعادة تصيير عند كل ضغطة مفتاح، وطول أكبر للنماذج البسيطة</p>
<h3 id="المكونات-غير-المتحكم-بها-أحيانا-أفضل">المكوّنات غير المُتحكَّم بها (أحيانًا أفضل)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, <span class="hljs-title class_">FormEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UncontrolledForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> emailRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">const</span> email = emailRef.<span class="hljs-property">current</span>?.<span class="hljs-property">value</span>;
    <span class="hljs-comment">// Do something with email</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{emailRef}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>الإيجابيات</strong>: إعادة تصيير أقل، وبساطة أكبر للنماذج الأساسية، وتوافق جيد مع مكتبات النماذج <strong>السلبيات</strong>: صعوبة أكبر في التحقّق الفوري، وأقل «بطابع React»</p>
<p>في معظم الحالات ألتزم بالمكوّنات المُتحكَّم بها. لكن إن كان لديك نموذج كبير يهمّ فيه الأداء، فإن المكوّنات غير المُتحكَّم بها مع مكتبة مثل <a href="https://react-hook-form.com/">React Hook Form</a> قد تُحدث فارقًا كبيرًا.</p>
<h2 id="متقدم-باني-نماذج-آمن-الأنواع">متقدّم: باني نماذج آمن الأنواع</h2>
<p>للاطلاع على منهج أكثر متانة مع التحقّق وقت التشغيل، راجع أمثلة Zod في <a href="https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation">جلب البيانات والتحقّق وقت التشغيل</a>. وإليك نمطًا يركّز على TypeScript وينشئ بانيات نماذج آمنة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormFieldConfig</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;number&#x27;</span> | <span class="hljs-string">&#x27;textarea&#x27;</span>;
    <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">validation</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  };
};

<span class="hljs-keyword">function</span> createFormBuilder&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt;(
  <span class="hljs-attr">initialData</span>: T,
  <span class="hljs-attr">fieldConfig</span>: <span class="hljs-title class_">FormFieldConfig</span>&lt;T&gt;,
) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">FormBuilder</span>(<span class="hljs-params">{ onSubmit }: { onSubmit: (data: T) =&gt; <span class="hljs-built_in">void</span> }</span>) {
    <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T&gt;(initialData);
    <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">string</span>&gt;&gt;&gt;({});

    <span class="hljs-keyword">const</span> updateField = &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">field</span>: K, <span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> {
      <span class="hljs-title function_">setData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [field]: value }));

      <span class="hljs-comment">// Clear error when user starts typing</span>
      <span class="hljs-keyword">if</span> (errors[field]) {
        <span class="hljs-title function_">setErrors</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [field]: <span class="hljs-literal">undefined</span> }));
      }
    };

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">FormEvent</span></span>) =&gt; {
      e.<span class="hljs-title function_">preventDefault</span>();

      <span class="hljs-keyword">const</span> <span class="hljs-attr">newErrors</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">string</span>&gt;&gt; = {};
      <span class="hljs-keyword">let</span> hasErrors = <span class="hljs-literal">false</span>;

      <span class="hljs-comment">// Run validations</span>
      (<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(fieldConfig) <span class="hljs-keyword">as</span> <span class="hljs-title class_">Array</span>&lt;keyof T&gt;).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> config = fieldConfig[field];
        <span class="hljs-keyword">if</span> (config.<span class="hljs-property">validation</span>) {
          <span class="hljs-keyword">const</span> error = config.<span class="hljs-title function_">validation</span>(data[field]);
          <span class="hljs-keyword">if</span> (error) {
            newErrors[field] = error;
            hasErrors = <span class="hljs-literal">true</span>;
          }
        }
      });

      <span class="hljs-keyword">if</span> (hasErrors) {
        <span class="hljs-title function_">setErrors</span>(newErrors);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-title function_">onSubmit</span>(data);
    };

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
        {(Object.keys(fieldConfig) as Array<span class="hljs-tag">&lt;<span class="hljs-name">keyof</span> <span class="hljs-attr">T</span>&gt;</span>).map((field) =&gt; {
          const config = fieldConfig[field];
          const error = errors[field];

          if (config.type === &#x27;textarea&#x27;) {
            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{String(field)}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{config.label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
                  <span class="hljs-attr">value</span>=<span class="hljs-string">{String(data[field])}</span>
                  <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateField(field, e.target.value as T[typeof field])}
                /&gt;
                {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">red</span>&#x27; }}&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            );
          }

          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{String(field)}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{config.label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">{config.type}</span>
                <span class="hljs-attr">value</span>=<span class="hljs-string">{String(data[field])}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
                  const value =
                    config.type === &#x27;number&#x27;
                      ? (Number(e.target.value) as T[typeof field])
                      : (e.target.value as T[typeof field]);
                  updateField(field, value);
                }}
              /&gt;
              {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">red</span>&#x27; }}&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          );
        })}
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    );
  };
}

// Usage:
const UserFormBuilder = createFormBuilder(
  { name: &#x27;&#x27;, email: &#x27;&#x27;, age: 0 },
  {
    name: {
      type: &#x27;text&#x27;,
      label: &#x27;Full Name&#x27;,
      validation: (value) =&gt; (value.length &lt; 1 ? &#x27;Name is required&#x27; : null),
    },
    email: {
      type: &#x27;email&#x27;,
      label: &#x27;Email Address&#x27;,
      validation: (value) =&gt; (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? null : &#x27;Invalid email&#x27;),
    },
    age: {
      type: &#x27;number&#x27;,
      label: &#x27;Age&#x27;,
      validation: (value) =&gt; (value &lt; 0 || value &gt; 120 ? &#x27;Invalid age&#x27; : null),
    },
  },
);
</span></code></pre>
<p>يمنحك هذا النمط أمان الأنواع، وتحقّقًا قابلًا لإعادة الاستخدام، ومعالجة متّسقة للخطأ عبر النماذج. وهو بالتأكيد أعقد مما تحتاجه في الحالات البسيطة، لكنه يتوسّع جيدًا حين يكون لديك عشرات النماذج لبنائها.</p>
<h2 id="المزالق-الشائعة-وكيف-تتجنبها">المزالق الشائعة وكيف تتجنّبها</h2>
<h3 id="محاربة-واجهة-dom">محاربة واجهة DOM</h3>
<p>تذكّر: حقول إدخال HTML تعيد سلاسل نصية دائمًا. لا تحاربها، بل حوّلها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Trying to force the DOM to be different than it is</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span> = e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>; <span class="hljs-comment">// Type error</span>

<span class="hljs-comment">// ✅ Accept reality and convert safely</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span> = <span class="hljs-title class_">Number</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>) || <span class="hljs-number">0</span>;
</code></pre>
<h3 id="أنواع-أحداث-معقدة-أكثر-من-اللازم">أنواع أحداث معقّدة أكثر من اللازم</h3>
<p>لست بحاجة إلى حفظ كل نوع من أنواع أحداث React. ابدأ ببساطة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ This covers 90% of cases</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
  <span class="hljs-comment">// ...</span>
};
</code></pre>
<h3 id="إهمال-الحالات-الحدية">إهمال الحالات الحدّية</h3>
<p>السلاسل الفارغة وقيم NaN والمراجع الفارغة هي واقع — تعامل معها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Defensive programming</span>
<span class="hljs-keyword">const</span> value = inputRef.<span class="hljs-property">current</span>?.<span class="hljs-property">value</span> || <span class="hljs-string">&#x27;&#x27;</span>;
<span class="hljs-keyword">const</span> numValue = value === <span class="hljs-string">&#x27;&#x27;</span> ? <span class="hljs-number">0</span> : <span class="hljs-title class_">Number</span>(value);
<span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(numValue)) {
  <span class="hljs-title function_">setValue</span>(numValue);
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>يمكن لحقول النماذج أن تسبّب إعادة تصيير كثيرة، ولا سيما في المكوّنات المُتحكَّم بها. إليك بعض الاستراتيجيات لإبقاء الأمور سريعة:</p>
<h3 id="تأجيل-العمليات-المكلفة">تأجيل العمليات المكلفة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Debounce expensive searches</span>
  <span class="hljs-keyword">const</span> debouncedQuery = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> query, <span class="hljs-number">300</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timeoutId);
  }, [query]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} placeholder=&quot;Search...&quot; /&gt;</span>;
}
</code></pre>
<h3 id="تقسيم-النماذج-الكبيرة">تقسيم النماذج الكبيرة</h3>
<p>بدلًا من مكوّن نموذج عملاق واحد، قسّمه إلى مكوّنات أصغر ومركّزة لا تُعاد تصييرها إلا حين تتغيّر حقولها المعنيّة.</p>
<h2 id="متى-تستخدم-مكتبات-النماذج">متى تستخدم مكتبات النماذج</h2>
<p>للنماذج البسيطة (من حقلين إلى خمسة)، تكفي الأنماط أعلاه عادةً. لكن حين تصطدم بنماذج فيها 10 حقول فأكثر، أو بتحقّق معقّد، أو بتوليد حقول ديناميكي، ففكّر في الوصول إلى مكتبة:</p>
<ul>
<li><strong><a href="https://react-hook-form.com/">React Hook Form</a></strong>: إعادة تصيير في أدنى حد، ودعم ممتاز لـ TypeScript</li>
<li><strong><a href="https://formik.org/">Formik</a></strong>: أكثر تقليدية، ومُرسَخة جيدًا</li>
<li><strong><a href="https://final-form.org/react">React Final Form</a></strong>: تحديثات قائمة على الاشتراك، وأداء عالٍ جدًا</li>
</ul>
<h2 id="الخلاصة">الخلاصة</h2>
<p>لا يلزم أن تكون النماذج في React مصدرًا لا ينتهي من الإحباط مع TypeScript. ومع الأنماط الصحيحة — معالِج أحداث عامة، وتحويل آمن للأرقام، وتحقّق وقت التشغيل — يمكنك بناء نماذج آمنة الأنواع وقابلة للصيانة في آن واحد.</p>
<p>أهم ما ينبغي أن تأخذه معك:</p>
<ol>
<li>استخدم معالِج أحداث عامة لتقليل الشيفرة المتكرّرة</li>
<li>حوّل قيم حقول الأرقام صراحةً في كل مرة</li>
<li>أضِف أنواع TypeScript الصحيحة إلى كل معالِج أحداث</li>
<li>خُذ في الحسبان آثار الأداء في النماذج الكبيرة</li>
<li>لا تُعقّد الحالات البسيطة أكثر من اللازم</li>
</ol>
<p>ابدأ بالأنماط البسيطة وأضِف التعقيد فقط حين تحتاج إليه. وستشكرك نسختك المستقبلية حين تنقّح النماذج في الساعة الثانية فجرًا ويكون كل شيء يعمل كما هو متوقّع.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
