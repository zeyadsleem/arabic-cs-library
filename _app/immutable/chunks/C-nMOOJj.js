const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="validating-zod-schemas-solution",p="التحقق من مخططات Zod (الحلول)",t=[{depth:2,id:"الحلول",text:"الحلول"},{depth:3,id:"مرحبا-zod",text:"مرحبًا Zod"},{depth:2,id:"الحلول-1",text:"الحلول"},{depth:3,id:"كل-شيء-عن-الخيارات",text:"كل شيء عن الخيارات"},{depth:2,id:"الحلول-2",text:"الحلول"},{depth:3,id:"في-الشارع-الذي-تسكن-فيه",text:"في الشارع الذي تسكن فيه"},{depth:2,id:"الحلول-3",text:"الحلول"},{depth:3,id:"الآن-لشيء-مختلف-تماما-الأنواع-الاتحادية",text:"الآن لشيء مختلف تمامًا: الأنواع الاتحادية"},{depth:2,id:"الحلول-4",text:"الحلول"},{depth:3,id:"صقل-الأذواق",text:"صقل الأذواق"},{depth:2,id:"الحلول-5",text:"الحلول"},{depth:3,id:"المحولات-تحقق-متنكر",text:"المحوّلات: تحقق متنكّر"},{depth:2,id:"الحلول-6",text:"الحلول"},{depth:3,id:"إضافة-قليل-من-الوسم-إلى-حياتك",text:"إضافة قليل من الوسم إلى حياتك"},{depth:2,id:"الحلول-7",text:"الحلول"},{depth:3,id:"اجعل-partial-وpick-وomit-أفضل-أصدقائك",text:"اجعل “Partial” و“Pick” و“Omit” أفضل أصدقائك"},{depth:2,id:"الحلول-8",text:"الحلول"},{depth:3,id:"مخططات-مخصصة-باستخدام-zcustom",text:"مخططات مخصّصة باستخدام z.custom()"},{depth:2,id:"الحلول-9",text:"الحلول"},{depth:3,id:"لنضع-كل-شيء-معا-بناء-أداة-تحقق-للنماذج",text:"لنضع كل شيء معًا: بناء أداة تحقق للنماذج"}],e=`<p>في ما يلي حلول التمارين الموجودة <a href="https://stevekinney.com/courses/full-stack-typescript/validating-zod-schema-exercises">هنا</a>.</p>
<h2 id="الحلول">الحلول</h2>
<h3 id="مرحبا-zod">مرحبًا Zod</h3>
<p><strong>الهدف</strong>: التحقق من كائن يتضمّن اسمًا مطلوبًا (نص) وعمرًا (رقم غير سالب).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// 1. Define the schema</span>
<span class="hljs-keyword">const</span> basicUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">0</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Age can&#x27;t be negative.&quot;</span> }),
});

<span class="hljs-comment">// 2. Test data</span>
<span class="hljs-keyword">const</span> validData = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">36</span> };
<span class="hljs-keyword">const</span> missingAge = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Charles&#x27;</span> };
<span class="hljs-keyword">const</span> negativeAge = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bobby Tables&#x27;</span>, <span class="hljs-attr">age</span>: -<span class="hljs-number">1</span> };

<span class="hljs-comment">// 3. Validate</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> result = basicUserSchema.<span class="hljs-title function_">parse</span>(validData);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;validData passed:&#x27;</span>, result);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;validData failed:&#x27;</span>, err);
}

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> result = basicUserSchema.<span class="hljs-title function_">parse</span>(missingAge);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;missingAge passed:&#x27;</span>, result);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;missingAge failed:&#x27;</span>, err);
}

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> result = basicUserSchema.<span class="hljs-title function_">parse</span>(negativeAge);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;negativeAge passed:&#x27;</span>, result);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;negativeAge failed:&#x27;</span>, err);
}
</code></pre>
<p><strong>ملاحظة</strong>: ينبغي أن يوضّح هذا كيف سيُطلق <code>.parse()</code> خطأً للكائنات غير الصالحة.</p>
<h2 id="الحلول-1">الحلول</h2>
<h3 id="كل-شيء-عن-الخيارات">كل شيء عن الخيارات</h3>
<p><strong>الهدف</strong>: اجعل العمر اختياريًا. وإذا لم يُوفَّر، فإمّا أن تجعل قيمته الافتراضية 0 أو أن تعرض خطأً.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> optionalAgeSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-comment">// Option A: Make age optional, and if not provided, transform it to 0</span>
  <span class="hljs-attr">age</span>: z
    .<span class="hljs-title function_">number</span>()
    .<span class="hljs-title function_">min</span>(<span class="hljs-number">0</span>)
    .<span class="hljs-title function_">optional</span>()
    .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val ?? <span class="hljs-number">0</span>),
});

<span class="hljs-keyword">const</span> dataWithAge = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">36</span> };
<span class="hljs-keyword">const</span> dataWithoutAge = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Ada&#x27;</span> };

<span class="hljs-keyword">try</span> {
  <span class="hljs-comment">// With age</span>
  <span class="hljs-keyword">const</span> result1 = optionalAgeSchema.<span class="hljs-title function_">parse</span>(dataWithAge);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;dataWithAge passed:&#x27;</span>, result1);
  <span class="hljs-comment">// { name: &quot;Ada&quot;, age: 36 }</span>

  <span class="hljs-comment">// Without age (defaults to 0)</span>
  <span class="hljs-keyword">const</span> result2 = optionalAgeSchema.<span class="hljs-title function_">parse</span>(dataWithoutAge);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;dataWithoutAge passed:&#x27;</span>, result2);
  <span class="hljs-comment">// { name: &quot;Ada&quot;, age: 0 }</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed:&#x27;</span>, err);
}
</code></pre>
<p><strong>ملاحظة</strong>: إن أردت إطلاق خطأ بدلًا من استخدام القيمة الافتراضية، فاحذف .transform(…) أو أطلق الخطأ داخل .refine().</p>
<h2 id="الحلول-2">الحلول</h2>
<h3 id="في-الشارع-الذي-تسكن-فيه">في الشارع الذي تسكن فيه</h3>
<p><strong>الهدف</strong>: كائنات متداخلة، ومصفوفات من العناوين، وعنوان واحد مطلوب على الأقل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> addressSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">street</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">city</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">zip</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">apartmentNumber</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">const</span> userProfileSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">addresses</span>: z.<span class="hljs-title function_">array</span>(addressSchema).<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;At least one address required.&#x27;</span> }),
});

<span class="hljs-keyword">const</span> validProfile = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Grace Hopper&#x27;</span>,
  <span class="hljs-attr">addresses</span>: [
    {
      <span class="hljs-attr">street</span>: <span class="hljs-string">&#x27;123 Naval Dr&#x27;</span>,
      <span class="hljs-attr">city</span>: <span class="hljs-string">&#x27;Arlington&#x27;</span>,
      <span class="hljs-attr">zip</span>: <span class="hljs-string">&#x27;76010&#x27;</span>,
    },
    {
      <span class="hljs-attr">street</span>: <span class="hljs-string">&#x27;456 Code Ave&#x27;</span>,
      <span class="hljs-attr">city</span>: <span class="hljs-string">&#x27;Boston&#x27;</span>,
      <span class="hljs-attr">zip</span>: <span class="hljs-string">&#x27;02108&#x27;</span>,
      <span class="hljs-attr">apartmentNumber</span>: <span class="hljs-string">&#x27;Apt 101&#x27;</span>,
    },
  ],
};

<span class="hljs-keyword">const</span> invalidProfile = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;No Addresses Provided&#x27;</span>,
  <span class="hljs-attr">addresses</span>: [],
};

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> parsedValid = userProfileSchema.<span class="hljs-title function_">parse</span>(validProfile);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Valid profile:&#x27;</span>, parsedValid);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Valid profile failed:&#x27;</span>, err);
}

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> parsedInvalid = userProfileSchema.<span class="hljs-title function_">parse</span>(invalidProfile);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Invalid profile passed (which shouldn&#x27;t happen):&quot;</span>, parsedInvalid);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid profile failed as expected:&#x27;</span>, err);
}
</code></pre>
<h2 id="الحلول-3">الحلول</h2>
<h3 id="الآن-لشيء-مختلف-تماما-الأنواع-الاتحادية">الآن لشيء مختلف تمامًا: الأنواع الاتحادية</h3>
<p><strong>الهدف</strong>: اقبل إمّا النص “anonymous” أو كائنًا يتضمّن id (رقمًا) وname (نصًا).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Create a union of two schemas:</span>
<span class="hljs-keyword">const</span> userIdentitySchema = z.<span class="hljs-title function_">union</span>([
  z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;anonymous&#x27;</span>),
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">number</span>(),
    <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  }),
]);

<span class="hljs-comment">// Examples</span>
<span class="hljs-keyword">const</span> anonymousVal = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
<span class="hljs-keyword">const</span> validObject = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alan&#x27;</span> };
<span class="hljs-keyword">const</span> invalidObject = { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;wrong&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Marvin&#x27;</span> };

<span class="hljs-keyword">try</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;anonymousVal passes:&#x27;</span>, userIdentitySchema.<span class="hljs-title function_">parse</span>(anonymousVal));
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;validObject passes:&#x27;</span>, userIdentitySchema.<span class="hljs-title function_">parse</span>(validObject));
  <span class="hljs-comment">// This will fail:</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;invalidObject passes:&#x27;</span>, userIdentitySchema.<span class="hljs-title function_">parse</span>(invalidObject));
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;invalidObject failed as expected:&#x27;</span>, err);
}
</code></pre>
<h2 id="الحلول-4">الحلول</h2>
<h3 id="صقل-الأذواق">صقل الأذواق</h3>
<p><strong>الهدف</strong>: استخدم <code>.refine()</code> للتحقق مما إذا كان العدد أوليًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// A simple prime checker (not optimized, but fine for demonstration)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isPrime</span>(<span class="hljs-params"><span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">if</span> (num &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i &lt;= <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sqrt</span>(num); i++) {
    <span class="hljs-keyword">if</span> (num % i === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">const</span> primeNumberSchema = z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">refine</span>(isPrime, {
  <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Quantity must be prime!&#x27;</span>,
});

<span class="hljs-keyword">try</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;5 is prime:&#x27;</span>, primeNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">5</span>)); <span class="hljs-comment">// Passes</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;10 is prime:&#x27;</span>, primeNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">10</span>)); <span class="hljs-comment">// Fails</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed:&#x27;</span>, err);
}
</code></pre>
<h2 id="الحلول-5">الحلول</h2>
<h3 id="المحولات-تحقق-متنكر">المحوّلات: تحقق متنكّر</h3>
<p><strong>الهدف</strong>: اقبل نصًا بصيغة YYYY-MM-DD وحوّله إلى كائن Date.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> dateStringSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">refine</span>(
    <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
      <span class="hljs-comment">// Basic check: must be parseable as a date</span>
      <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val).<span class="hljs-title function_">valueOf</span>());
    },
    { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Invalid date string&#x27;</span> },
  )
  .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val));

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> date = dateStringSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;2025-03-20&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Parsed date:&#x27;</span>, date); <span class="hljs-comment">// Should be a valid Date object</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed date parse:&#x27;</span>, err);
}

<span class="hljs-keyword">try</span> {
  dateStringSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;not-a-date&#x27;</span>); <span class="hljs-comment">// Will throw</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid date string:&#x27;</span>, err);
}
</code></pre>
<h2 id="الحلول-6">الحلول</h2>
<h3 id="إضافة-قليل-من-الوسم-إلى-حياتك">إضافة قليل من الوسم إلى حياتك</h3>
<p><strong>الهدف</strong>: نوع UserId موسوم يكون نصًا صالحًا للـ UUID.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> userIdSchema = z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>().<span class="hljs-property">brand</span>&lt;<span class="hljs-string">&#x27;UserId&#x27;</span>&gt;();

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserId</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userIdSchema&gt;;
<span class="hljs-comment">// -&gt; string &amp; { __brand: &quot;UserId&quot; }</span>

<span class="hljs-keyword">const</span> validUuid = <span class="hljs-string">&#x27;7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9&#x27;</span>;
<span class="hljs-keyword">const</span> invalidUuid = <span class="hljs-string">&#x27;this-is-not-a-uuid&#x27;</span>;

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> userId = userIdSchema.<span class="hljs-title function_">parse</span>(validUuid);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Branded UserId:&#x27;</span>, userId);

  <span class="hljs-comment">// If you try to pass invalidUuid, it will throw:</span>
  userIdSchema.<span class="hljs-title function_">parse</span>(invalidUuid);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to parse userId:&#x27;</span>, err);
}
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، تُكتب هذه الصيغة هكذا <code>z.uuid().brand&lt;'UserId'&gt;()</code>. وتحلّ <code>z.uuid()</code> على المستوى الأعلى محل <code>z.string().uuid()</code>، ويفرض <code>z.uuid()</code> في الإصدار الرابع تحققًا أكثر صرامة وفق RFC 9562. استخدم <code>z.guid()</code> لسلوك متوافق مع الإصدار الثالث.</p>
</blockquote>
<p><strong>اختبار الوسم</strong>: إذا كان لديك دالة تتوقع نوع UserId، فينبغي أن يفشل تمرير نص عادي في فحص الأنواع (في TypeScript). ولن يفشل ذلك وقت التشغيل، بل وقت التصريف.</p>
<h2 id="الحلول-7">الحلول</h2>
<h3 id="اجعل-partial-وpick-وomit-أفضل-أصدقائك">اجعل “Partial” و“Pick” و“Omit” أفضل أصدقائك</h3>
<p><strong>الهدف</strong>: استخدم مخططًا كبيرًا موجودًا، ثم أنشئ مخططات جزئية أو فرعية باستخدام .partial() و.pick() و.omit().</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> fullUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">phoneNumber</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">addresses</span>: z
    .<span class="hljs-title function_">array</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">street</span>: z.<span class="hljs-title function_">string</span>(),
        <span class="hljs-attr">city</span>: z.<span class="hljs-title function_">string</span>(),
        <span class="hljs-attr">zip</span>: z.<span class="hljs-title function_">string</span>(),
      }),
    )
    .<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-comment">// PART 1: Partial user update schema (all fields become optional)</span>
<span class="hljs-keyword">const</span> partialUserUpdateSchema = fullUserSchema.<span class="hljs-title function_">partial</span>();

<span class="hljs-comment">// PART 2: Public profile: pick only certain fields to reveal publicly</span>
<span class="hljs-keyword">const</span> publicProfileSchema = fullUserSchema.<span class="hljs-title function_">pick</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">addresses</span>: <span class="hljs-literal">true</span>,
});

<span class="hljs-comment">// PART 3: Omit sensitive data—e.g., remove \`email\` from the user object</span>
<span class="hljs-keyword">const</span> userWithoutEmailSchema = fullUserSchema.<span class="hljs-title function_">omit</span>({
  <span class="hljs-attr">email</span>: <span class="hljs-literal">true</span>,
});

<span class="hljs-comment">// Test them out</span>
<span class="hljs-keyword">const</span> sampleData = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Test User&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;test@example.com&#x27;</span>,
  <span class="hljs-attr">phoneNumber</span>: <span class="hljs-string">&#x27;123-456-7890&#x27;</span>,
  <span class="hljs-attr">addresses</span>: [{ <span class="hljs-attr">street</span>: <span class="hljs-string">&#x27;100 Test Ln&#x27;</span>, <span class="hljs-attr">city</span>: <span class="hljs-string">&#x27;Nowhere&#x27;</span>, <span class="hljs-attr">zip</span>: <span class="hljs-string">&#x27;99999&#x27;</span> }],
};

<span class="hljs-comment">// 1. Partial update</span>
<span class="hljs-keyword">const</span> partialUpdate = { <span class="hljs-attr">phoneNumber</span>: <span class="hljs-string">&#x27;987-654-3210&#x27;</span> };
<span class="hljs-keyword">try</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Partial update passes:&#x27;</span>, partialUserUpdateSchema.<span class="hljs-title function_">parse</span>(partialUpdate));
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Partial update error:&#x27;</span>, err);
}

<span class="hljs-comment">// 2. Public profile</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Public profile:&#x27;</span>, publicProfileSchema.<span class="hljs-title function_">parse</span>(sampleData));
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Public profile error:&#x27;</span>, err);
}

<span class="hljs-comment">// 3. Omit email</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;User without email:&#x27;</span>, userWithoutEmailSchema.<span class="hljs-title function_">parse</span>(sampleData));
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;User without email error:&#x27;</span>, err);
}
</code></pre>
<h2 id="الحلول-8">الحلول</h2>
<h3 id="مخططات-مخصصة-باستخدام-zcustom">مخططات مخصّصة باستخدام z.custom()</h3>
<p><strong>الهدف</strong>: التحقق من نص لون سداسي عشري: يجب أن يبدأ بـ # ويتكوّن من 3 أو 6 أرقام سداسية عشرية.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> hexColorSchema = z.<span class="hljs-property">custom</span>&lt;<span class="hljs-built_in">string</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">&#x27;string&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// Simple regex check: must start with &#x27;#&#x27; and have 3 or 6 hex digits</span>
    <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/</span>.<span class="hljs-title function_">test</span>(val);
  },
  {
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Invalid hex color&#x27;</span>,
  },
);

<span class="hljs-comment">// Test</span>
<span class="hljs-keyword">const</span> validColors = [<span class="hljs-string">&#x27;#FFF&#x27;</span>, <span class="hljs-string">&#x27;#FFFFFF&#x27;</span>, <span class="hljs-string">&#x27;#abc&#x27;</span>, <span class="hljs-string">&#x27;#aBcDeF&#x27;</span>];
<span class="hljs-keyword">const</span> invalidColors = [<span class="hljs-string">&#x27;FFF&#x27;</span>, <span class="hljs-string">&#x27;#FFFFF&#x27;</span>, <span class="hljs-string">&#x27;#GGG&#x27;</span>, <span class="hljs-string">&#x27;#1234567&#x27;</span>, <span class="hljs-string">&#x27;#abcd&#x27;</span>];

<span class="hljs-comment">// Validate</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> color <span class="hljs-keyword">of</span> validColors) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`&quot;<span class="hljs-subst">\${color}</span>&quot; passes:\`</span>, hexColorSchema.<span class="hljs-title function_">parse</span>(color));
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`&quot;<span class="hljs-subst">\${color}</span>&quot; failed (unexpected):\`</span>, err);
  }
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> color <span class="hljs-keyword">of</span> invalidColors) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`&quot;<span class="hljs-subst">\${color}</span>&quot; passes (shouldn&#x27;t):\`</span>, hexColorSchema.<span class="hljs-title function_">parse</span>(color));
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`&quot;<span class="hljs-subst">\${color}</span>&quot; failed (expected):\`</span>, err);
  }
}
</code></pre>
<h2 id="الحلول-9">الحلول</h2>
<h3 id="لنضع-كل-شيء-معا-بناء-أداة-تحقق-للنماذج">لنضع كل شيء معًا: بناء أداة تحقق للنماذج</h3>
<p><strong>الهدف</strong>: نموذج تسجيل يتطلّب اسم مستخدم وكلمة مرور وبريدًا إلكترونيًا، وتاريخ ميلاد اختياريًا صالحًا، مع قيود خاصة بكل حقل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// We&#x27;ll create each field&#x27;s schema and then combine.</span>

<span class="hljs-keyword">const</span> usernameSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">min</span>(<span class="hljs-number">4</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Username must be at least 4 characters.&#x27;</span> })
  .<span class="hljs-title function_">max</span>(<span class="hljs-number">16</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Username can be at most 16 characters.&#x27;</span> });

<span class="hljs-keyword">const</span> passwordSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">min</span>(<span class="hljs-number">8</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Password must be at least 8 characters long.&#x27;</span> })
  <span class="hljs-comment">// refine to check for a digit</span>
  .<span class="hljs-title function_">refine</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-regexp">/\\d/</span>.<span class="hljs-title function_">test</span>(val), {
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Password must contain at least one digit.&#x27;</span>,
  })
  <span class="hljs-comment">// optional brand if you want to differentiate it:</span>
  .<span class="hljs-property">brand</span>&lt;<span class="hljs-string">&#x27;SecureString&#x27;</span>&gt;();

<span class="hljs-keyword">const</span> emailSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">email</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Must be a valid email address.&#x27;</span> })
  <span class="hljs-comment">// optional brand</span>
  .<span class="hljs-property">brand</span>&lt;<span class="hljs-string">&#x27;EmailAddress&#x27;</span>&gt;();

<span class="hljs-comment">// Optional birthDate, but if provided, must be a valid date</span>
<span class="hljs-keyword">const</span> birthDateSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">optional</span>()
  .<span class="hljs-title function_">refine</span>(
    <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!val) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// optional</span>
      <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val).<span class="hljs-title function_">valueOf</span>());
    },
    { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Invalid birth date format.&#x27;</span> },
  )
  .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> val ? <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val) : <span class="hljs-literal">undefined</span>;
  });

<span class="hljs-comment">// Combine into a single schema</span>
<span class="hljs-keyword">const</span> registrationFormSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: usernameSchema,
  <span class="hljs-attr">password</span>: passwordSchema,
  <span class="hljs-attr">email</span>: emailSchema,
  <span class="hljs-attr">birthDate</span>: birthDateSchema,
});

<span class="hljs-comment">// Now test it</span>
<span class="hljs-keyword">const</span> validFormData = {
  <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;myuser&#x27;</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;secret123&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;test@example.com&#x27;</span>,
  <span class="hljs-attr">birthDate</span>: <span class="hljs-string">&#x27;1985-01-01&#x27;</span>,
};

<span class="hljs-keyword">const</span> invalidFormData = {
  <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;me&#x27;</span>, <span class="hljs-comment">// too short</span>
  <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;nopass&#x27;</span>, <span class="hljs-comment">// not enough chars, no digit</span>
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;not-an-email&#x27;</span>, <span class="hljs-comment">// not a valid email</span>
  <span class="hljs-attr">birthDate</span>: <span class="hljs-string">&#x27;not-a-date&#x27;</span>, <span class="hljs-comment">// can&#x27;t parse</span>
};

<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> parsedValid = registrationFormSchema.<span class="hljs-title function_">parse</span>(validFormData);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Valid form data parsed:&#x27;</span>, parsedValid);
  <span class="hljs-comment">// birthDate becomes a Date object, if you transform it.</span>
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Valid form data error (unexpected):&#x27;</span>, err);
}

<span class="hljs-keyword">try</span> {
  registrationFormSchema.<span class="hljs-title function_">parse</span>(invalidFormData);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Invalid form data passed (which shouldn&#x27;t happen)&quot;</span>);
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid form data failed as expected:&#x27;</span>, err);
}
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، الأفضل أن تكون <code>z.string().email()</code> هي <code>z.email()</code>، وخيار <code>{ message: &quot;...&quot; }</code> في المدقّقات مثل <code>.min()</code> و<code>.refine()</code> مهجور لصالح <code>{ error: &quot;...&quot; }</code>.</p>
</blockquote>
<p><strong>النقاط الأساسية</strong>:</p>
<ol>
<li>استخدم مخططات منفصلة لكل حقل أو مفهوم.</li>
<li>ركّبها معًا باستخدام <code>z.object()</code>.</li>
<li>اعتمد على <code>.refine()</code> و<code>.transform()</code> والوسم أو أي تقنية أخرى في Zod تجدها مفيدة.</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
