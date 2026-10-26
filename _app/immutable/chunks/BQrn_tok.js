const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",p="refining-types-with-zod",t="تحسين الأنواع مع Zod",e=[{depth:2,id:"تحسين-المخططات",text:"تحسين المخططات"},{depth:2,id:"إنشاء-مخططات-مخصصة",text:"إنشاء مخططات مخصّصة"},{depth:2,id:"التحقق-من-الأنواع-المعقدة-أو-المتداخلة",text:"التحقّق من الأنواع المعقّدة أو المتداخلة"},{depth:2,id:"الأنواع-الموسومة-لدلالات-إضافية",text:"الأنواع الموسومة لدلالات إضافية"},{depth:2,id:"كن-حاسما-في-رسائل-الأخطاء",text:"كن حاسمًا في رسائل الأخطاء"},{depth:2,id:"اختبار-مخططاتك-المخصصة",text:"اختبار مخططاتك المخصّصة"},{depth:2,id:"تركيب-مخططات-zod",text:"تركيب مخططات Zod"},{depth:2,id:"التحسين-الفائق-super-refinement",text:"التحسين الفائق (Super Refinement)"},{depth:2,id:"المعالجة-المسبقة",text:"المعالجة المسبقة"},{depth:2,id:"superrefine-للإبلاغ-عن-أخطاء-متعددة",text:".superRefine() للإبلاغ عن أخطاء متعددة"},{depth:3,id:"مثال-مشكلات-متعددة-في-تحقق-واحد",text:"مثال: مشكلات متعددة في تحقّق واحد"},{depth:2,id:"بعض-الخواطر-الأخيرة",text:"بعض الخواطر الأخيرة"}],l=`<p>يأتي Zod مزوّدًا بمجموعة سخية من تعريفات المخططات الأولية والمركّبة جاهزةً. فإذا كان «نوعك المخصّص» يمكن التعبير عنه ككائن أو اتحاد Zod مباشر، فاستخدم أحدها كما رأينا في <a href="https://stevekinney.com/courses/full-stack-typescript/introduction-to-zod">المقدّمة سابقًا</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">0</span>),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userSchema&gt;;

<span class="hljs-keyword">const</span> parsedUser = userSchema.<span class="hljs-title function_">parse</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Ada Lovelace&#x27;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">36</span>,
});
</code></pre>
<blockquote>
<p><strong>نصيحة احترافية</strong></p>
<p>إذا كان نوعك المخصّص مجرّد شكل منظّم (مثل شخص أو شكل أنيق له بعض الخصائص الاختيارية)، فقد لا تحتاج إلى أكثر من مخططات Zod القياسية.</p>
</blockquote>
<h2 id="تحسين-المخططات">تحسين المخططات</h2>
<p>تتيح لك طريقة <code>.refine()</code> في Zod إضافة منطق تحقّق مخصّص. لنفترض أن لديك حقل بريد إلكتروني <em>يجب</em> أن ينتهي بـ <code>frontendmasters.com</code>. ابدأ بنص عادي، ثم حسّنه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> emailSchema = z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">refine</span>(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> value.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;frontendmasters.com&#x27;</span>), {
  <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Email must end with frontendmasters.com&#x27;</span>,
});

<span class="hljs-keyword">const</span> validatedEmail = emailSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;hellofrontendmasters.com&#x27;</span>); <span class="hljs-comment">// passes</span>

emailSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;hello@anotherdomain.com&#x27;</span>);
<span class="hljs-comment">// throws ZodError: Email must end with frontendmasters.com</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>إذا كنت تفضّل الاعتماد على مكتبات تحقّق خارجية (مثل validator.js)، فيمكنك ربطها داخل <code>.refine()</code></p>
</blockquote>
<h2 id="إنشاء-مخططات-مخصصة">إنشاء مخططات مخصّصة</h2>
<p>أحيانًا يكون لديك نوع غريب إلى حدّ لا يكفي معه <code>.refine()</code> — أو ربما تريد تحكّمًا أكثر مباشرة. هنا يأتي دور <code>z.custom()</code>. وهو مثالي للأشياء التي لا يمكن تمثيلها جيدًا بأنواع بسيطة، أو للتحقّق من الشكل مع الوسم معًا. على سبيل المثال:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Suppose we want a schema for a string that must parse into a valid Date</span>
<span class="hljs-keyword">const</span> validDateString = z.<span class="hljs-property">custom</span>&lt;<span class="hljs-built_in">string</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">&#x27;string&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// Attempt to parse date</span>
    <span class="hljs-keyword">const</span> date = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(value);
    <span class="hljs-comment">// Check if it&#x27;s a real date</span>
    <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(date.<span class="hljs-title function_">valueOf</span>());
  },
  {
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Invalid date string provided&#x27;</span>,
  },
);

<span class="hljs-comment">// If you also want TypeScript to know it&#x27;s a string, you&#x27;ll do:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidDateString</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> validDateString&gt;; <span class="hljs-comment">// string</span>

validDateString.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;2025-03-20&#x27;</span>); <span class="hljs-comment">// success</span>
validDateString.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;not-a-date&#x27;</span>); <span class="hljs-comment">// throws ZodError</span>
</code></pre>
<blockquote>
<p><strong>تحذير صريح</strong></p>
<p>يُعيد <code>z.custom()</code> مخططًا يعطي النوع unknown افتراضيًا. وإذا أردت أن يثق بك TypeScript، فيمكنك التحويل صراحةً أو تعريف وسيط نوع عام مثل <code>z.custom&lt;string&gt;()</code>. فقط تأكّد أن منطق التحقّق لديك محصّن تمامًا.</p>
</blockquote>
<h2 id="التحقق-من-الأنواع-المعقدة-أو-المتداخلة">التحقّق من الأنواع المعقّدة أو المتداخلة</h2>
<p>إذا كان لديك كائن يحتوي مصفوفات تحتوي كائنات (أو أشكال متاهيّة أخرى تبدو كأن أحد معجبي M.C. Escher صمّمها)، فركّب مخططاتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> addressSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">street</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">zipCode</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">length</span>(<span class="hljs-number">5</span>),
});

<span class="hljs-keyword">const</span> userWithAddressSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">addresses</span>: z.<span class="hljs-title function_">array</span>(addressSchema).<span class="hljs-title function_">nonempty</span>(),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserWithAddress</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userWithAddressSchema&gt;;

userWithAddressSchema.<span class="hljs-title function_">parse</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Grace Hopper&#x27;</span>,
  <span class="hljs-attr">addresses</span>: [
    { <span class="hljs-attr">street</span>: <span class="hljs-string">&#x27;1900 Sea St&#x27;</span>, <span class="hljs-attr">zipCode</span>: <span class="hljs-string">&#x27;12345&#x27;</span> },
    { <span class="hljs-attr">street</span>: <span class="hljs-string">&#x27;3 Admiral Dr&#x27;</span>, <span class="hljs-attr">zipCode</span>: <span class="hljs-string">&#x27;99999&#x27;</span> },
  ],
}); <span class="hljs-comment">// passes</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، ما زال <code>.nonempty()</code> يفرض حدًّا أدنى للطول قدره 1 في وقت التشغيل، لكنه لم يعد يضيّق نوع TypeScript المستنتَج إلى صفّ غير فارغ (<code>[T, ...T[]]</code>). وسيكون النوع المستنتَج <code>T[]</code> بدلًا من ذلك.</p>
</blockquote>
<p>واصل التداخل كما تشاء. وإن كانت بنية بياناتك معقّدة، فمقاربة Zod الطبقية على الأقل تُبقي منطق التحقّق مرتّبًا.</p>
<h2 id="الأنواع-الموسومة-لدلالات-إضافية">الأنواع الموسومة لدلالات إضافية</h2>
<p>لدى Zod مفهوم الأنواع «الموسومة»، وهو يتيح لك إضافة علامات وسم مخصّصة للتمييز بين أوليّات متطابقة لولا ذلك. وهذا رائع إن أردت منح نوع معنى خاصًا دون إنشاء نوع وقت تشغيل جديد. فمثلًا، يمكن أن يكون لديك UserId ليس في جوهره إلا نصًا، لكنه يُعرَف في شيفرتك كوسم مستقل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> userIdSchema = z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>().<span class="hljs-property">brand</span>&lt;<span class="hljs-string">&#x27;UserId&#x27;</span>&gt;();

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserId</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userIdSchema&gt;; <span class="hljs-comment">// string &amp; { __brand: &quot;UserId&quot; }</span>

<span class="hljs-keyword">const</span> userId = userIdSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9&#x27;</span>); <span class="hljs-comment">// works</span>
userIdSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;not-a-uuid&#x27;</span>); <span class="hljs-comment">// throws ZodError</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل كتابة <code>z.string().uuid()</code> بالصيغة <code>z.uuid()</code>. كما تقبل طريقة <code>.brand()</code> وسيطًا ثانيًا اختياريًا لتحديد الموضع: <code>&quot;in&quot;</code> أو <code>&quot;out&quot;</code> أو <code>&quot;inout&quot;</code>.</p>
</blockquote>
<p>وهذا <em>قد</em> يساعد في التقاط الأخطاء إذا مرّرت بالخطأ نصًا خاطئًا إلى دالة تتوقع UserId.</p>
<h2 id="كن-حاسما-في-رسائل-الأخطاء">كن حاسمًا في رسائل الأخطاء</h2>
<p>يملك Zod رسائل أخطاء مقبولة جاهزةً، لكن أسدِ نفسك في المستقبل (وزملاءك) معروفًا بتخصيص رسائل الأخطاء في <code>.refine()</code> و<code>.optional()</code> وغيرها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> fancySchema = z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, {
  <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Number must be a positive integer. This includes you, 0.&#x27;</span>,
});
</code></pre>
<p>لا تخف من أن تكون صريحًا. فرسائل الأخطاء الغامضة تقود إلى مزيد من وقت التصحيح (والمزيد من القهوة، وقد يكون ذلك جيدًا، لكنه يقود أيضًا إلى مزيد من الإحباط، وهذا ليس جيدًا بالتأكيد).</p>
<hr>
<h2 id="اختبار-مخططاتك-المخصصة">اختبار مخططاتك المخصّصة</h2>
<p>خطُ الخطوة الإضافية واكتب اختبارًا أو اختبارين سريعين لمنطقك المخصّص:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>; <span class="hljs-comment">// or your test runner</span>
<span class="hljs-keyword">import</span> { validDateString } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./path/to/your/schema&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;validDateString&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should parse a valid date&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> validDateString.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;2025-03-20&#x27;</span>)).<span class="hljs-property">not</span>.<span class="hljs-title function_">toThrow</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw on invalid date&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> validDateString.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;Feb 30th, 2025&#x27;</span>)).<span class="hljs-title function_">toThrow</span>();
  });
});
</code></pre>
<p>تضمن الاختبارات أن نسختك المستقبلية (التي قد تكون محرومة من النوم) لن تكسر بالخطأ مخططاتك المخصّصة المبنية بعناية.</p>
<h2 id="تركيب-مخططات-zod">تركيب مخططات Zod</h2>
<p>يمكنك تركيب مخططات أصغر معًا. وحتى للاحتياجات المخصّصة الجامحة، فكّكها إلى قطع أصغر وأسهل في الاختبار. فمثلًا، إذا احتجت «عددًا صحيحًا موجبًا أقل من 1000 وأوليًا أيضًا»، فيمكنك تعريف فاحص أولية ثم <code>.refine()</code> فوق مخطط أصغر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isPrime</span>(<span class="hljs-params"><span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i &lt;= <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sqrt</span>(num); i++) {
    <span class="hljs-keyword">if</span> (num % i === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">const</span> primeUnder1000Schema = z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">999</span>).<span class="hljs-title function_">refine</span>(isPrime, {
  <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Number must be prime&#x27;</span>,
});
</code></pre>
<h2 id="التحسين-الفائق-super-refinement">التحسين الفائق (Super Refinement)</h2>
<p><code>.superRefine(refinement: (value, ctx: RefinementCtx&lt;T&gt;) =&gt; void)</code> يشبه <code>.refine()</code>، لكنه يوفّر كائن <code>RefinementCtx</code> لإضافة عدة رسائل خطأ أو أخطاء عند مسارات محددة داخل المخطط. وهو أقوى لسيناريوهات التحقّق المعقّدة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> productSchema = z
  .<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">price</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
    <span class="hljs-attr">quantity</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">nonnegative</span>(),
  })
  .<span class="hljs-title function_">superRefine</span>(<span class="hljs-function">(<span class="hljs-params">data, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (data.<span class="hljs-property">price</span> &gt; <span class="hljs-number">1000</span> &amp;&amp; data.<span class="hljs-property">quantity</span> &gt; <span class="hljs-number">0</span>) {
      ctx.<span class="hljs-title function_">addIssue</span>({
        <span class="hljs-attr">code</span>: z.<span class="hljs-property">ZodIssueCode</span>.<span class="hljs-property">custom</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;High-value items must have quantity 0 for initial stock&#x27;</span>,
        <span class="hljs-attr">path</span>: [<span class="hljs-string">&#x27;quantity&#x27;</span>],
      });
    }
  });

productSchema.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">price</span>: <span class="hljs-number">1200</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// productSchema.parse({ price: 1200, quantity: 5 }); // Throws ZodError: High-value items must have quantity 0 for initial stock at &#x27;quantity&#x27;</span>
</code></pre>
<h2 id="المعالجة-المسبقة">المعالجة المسبقة</h2>
<p><code>.preprocess(fn: (input: unknown) =&gt; unknown, schema: ZodSchema)</code> يطبّق دالة معالجة مسبقة <em>قبل</em> التحقّق. وهو مفيد لتنظيف بيانات المدخلات أو تحويلها قبل التحقّق منها مقابل المخطط الأساسي.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> preprocessNumberSchema = z.<span class="hljs-title function_">preprocess</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(val, <span class="hljs-number">10</span>); <span class="hljs-comment">// Try to parse string to number</span>
  }
  <span class="hljs-keyword">return</span> val; <span class="hljs-comment">// Otherwise, return original value</span>
}, z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>());

preprocessNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;42&#x27;</span>); <span class="hljs-comment">// Valid, returns 42 (number)</span>
preprocessNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">42</span>); <span class="hljs-comment">// Valid, returns 42 (number)</span>
<span class="hljs-comment">// preprocessNumberSchema.parse(&quot;abc&quot;); // Throws ZodError (after preprocessing): Expected number, received nan</span>
</code></pre>
<p>إبقاء هذه التحقّقات منفصلة عن منطق المخطط الخام يُبقي شيفرتك أنظف وأسهل إدارة.</p>
<p><strong>معلومة طريفة</strong>: هناك أيضًا <code>z.superPreprocess</code>. و<code>.superPreprocess(fn: (input: unknown, ctx: PreprocessContext) =&gt; unknown)</code> يشبه <code>.preprocess()</code>، لكنه يوفّر <code>PreprocessContext</code> لمزيد من التحكّم في المعالجة المسبقة ومعالجة الأخطاء أثناءها.</p>
<h2 id="superrefine-للإبلاغ-عن-أخطاء-متعددة"><code>.superRefine()</code> للإبلاغ عن أخطاء متعددة</h2>
<p>يتيح <code>.refine()</code> إطلاق خطأ واحد في المرة. أما <code>.superRefine()</code> فأكثر مرونة: تستدعي <code>ctx.addIssue(...)</code> لكل مشكلة.</p>
<h3 id="مثال-مشكلات-متعددة-في-تحقق-واحد">مثال: مشكلات متعددة في تحقّق واحد</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> passwordSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">min</span>(<span class="hljs-number">8</span>)
  .<span class="hljs-title function_">superRefine</span>(<span class="hljs-function">(<span class="hljs-params">val, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/[A-Z]/</span>.<span class="hljs-title function_">test</span>(val)) {
      ctx.<span class="hljs-title function_">addIssue</span>({
        <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;custom&#x27;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Password must include an uppercase letter&#x27;</span>,
      });
    }
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/\\d/</span>.<span class="hljs-title function_">test</span>(val)) {
      ctx.<span class="hljs-title function_">addIssue</span>({
        <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;custom&#x27;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Password must include a digit&#x27;</span>,
      });
    }
    <span class="hljs-comment">// You can add more checks if needed...</span>
  });
</code></pre>
<p>الآن، إذا كانت كلمة المرور تفتقد الحروف الكبيرة <em>و</em>الأرقام معًا، فستحصل على <em>خطأين متمايزين.</em> وهذا مفيد لتغذية المستخدم الراجعة — وإلا فإن <code>.refine()</code> واحدًا سيُطلق عادةً رسالة خطأ واحدة فقط.</p>
<h2 id="بعض-الخواطر-الأخيرة">بعض الخواطر الأخيرة</h2>
<ul>
<li><strong>كن واعيًا بالأداء</strong>: للمخططات الضخمة جدًا أو نقاط النهاية عالية الحركة، قد تحتاج إلى تحسين بعض الفحوص أو تخزين نتائجها مؤقتًا. فـ Zod كفء أصلًا، لكن إن فعلت شيئًا جنونيًا داخل .refine()، فستدفع الثمن.</li>
<li><strong>تحقّق من المدخلات عند الأطراف</strong>: لا تنتظر حتى يكون نصف قاعدة شيفرتك قد لمس البيانات لتدرك أنها غير صالحة. تحقّق من البيانات بأقرب ما يمكن إلى «نقطة دخول البيانات» — سواء أكانت نقطة نهاية API، أو إرسال نموذج، أو مستهلك طابور رسائل.</li>
<li><strong>تابع التحديثات</strong>: يتطوّر Zod. وقد تجلب الإصدارات الجديدة ميزات جديدة أو أداءً أفضل. ويستحقّ الأمر نظرة من حين إلى آخر لترى هل يمكن استبدال منطقك المخصّص بطريقة مدمجة صدرت حديثًا.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,p as slug,t as title};
