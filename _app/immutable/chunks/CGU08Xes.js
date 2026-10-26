const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",t="advanced-types-with-zod",e="أنواع متقدمة مع Zod",l=[{depth:2,id:"القيم-الحرفية-literals",text:"القيم الحرفية (Literals)"},{depth:2,id:"zenum-للمجموعات-الثابتة",text:"z.enum() للمجموعات الثابتة"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"لماذا-لا-تستخدم-اتحاد-literal",text:"لماذا لا تستخدم اتحاد .literal()؟"},{depth:2,id:"الصفوف-tuples",text:"الصفوف (Tuples)"},{depth:2,id:"الاتحادات-unions",text:"الاتحادات (Unions)"},{depth:2,id:"التقاطعات-intersections",text:"التقاطعات (Intersections)"},{depth:3,id:"مكونات-مخططات-قابلة-لإعادة-الاستخدام-مع-الاتحادات",text:"مكوّنات مخططات قابلة لإعادة الاستخدام مع الاتحادات"},{depth:2,id:"الاتحادات-المميزة-discriminated-unions",text:"الاتحادات المُميَّزة (Discriminated Unions)"},{depth:3,id:"مثال-type-أو-kind-كمميز",text:"مثال: type أو kind كمُميِّز"},{depth:3,id:"الفوائد",text:"الفوائد"},{depth:2,id:"never-وunknown-وany",text:"never وunknown وany"},{depth:3,id:"مثال",text:"مثال"},{depth:2,id:"الصرامة-مقابل-التمرير-مقابل-النزع",text:"الصرامة مقابل التمرير مقابل النزع"},{depth:3,id:"النزع-افتراضي",text:"النزع (افتراضي)"},{depth:3,id:"الصرامة",text:"الصرامة"},{depth:3,id:"التمرير",text:"التمرير"},{depth:3,id:"مثال",text:"مثال"}],p=`<h2 id="القيم-الحرفية-literals">القيم الحرفية (Literals)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> literalSchema = z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;hello&#x27;</span>);

literalSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// literalSchema.parse(&quot;world&quot;); // Throws ZodError: Expected literal &#x27;hello&#x27;, received &#x27;world&#x27;</span>
</code></pre>
<h2 id="zenum-للمجموعات-الثابتة"><code>z.enum()</code> للمجموعات الثابتة</h2>
<p>عندما تسمح فقط بقيم نصية قليلة صالحة، عرّفها في مخطط تعداد.</p>
<h3 id="مثال">مثال</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> colorEnum = z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;RED&#x27;</span>, <span class="hljs-string">&#x27;GREEN&#x27;</span>, <span class="hljs-string">&#x27;BLUE&#x27;</span>]);

<span class="hljs-comment">// passes</span>
colorEnum.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;RED&#x27;</span>);

<span class="hljs-comment">// fails</span>
colorEnum.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;PURPLE&#x27;</span>);
</code></pre>
<h3 id="لماذا-لا-تستخدم-اتحاد-literal">لماذا لا تستخدم اتحاد <code>.literal()</code>؟</h3>
<ul>
<li><code>z.enum([&quot;RED&quot;, &quot;GREEN&quot;, &quot;BLUE&quot;])</code> أدنى مباشرةً للمجموعات الصغيرة من النصوص.</li>
<li>يستطيع TS أيضًا تفسيره كاتحاد لتلك القيم النصية الحرفية.</li>
<li>إن كانت لديك مجموعة كبيرة، فالانحاد صالح بالقدر نفسه، لكنه أكثر إسهابًا فقط.</li>
</ul>
<h2 id="الصفوف-tuples">الصفوف (Tuples)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> tupleSchema = z.<span class="hljs-title function_">tuple</span>([z.<span class="hljs-title function_">string</span>(), z.<span class="hljs-title function_">number</span>()]);

tupleSchema.<span class="hljs-title function_">parse</span>([<span class="hljs-string">&#x27;hello&#x27;</span>, <span class="hljs-number">123</span>]); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// tupleSchema.parse([123, &quot;hello&quot;]); // Throws ZodError: Expected string, received number at index 0</span>
<span class="hljs-comment">// tupleSchema.parse([&quot;hello&quot;]); // Throws ZodError: Expected tuple to have 2 elements, but got 1</span>
</code></pre>
<h2 id="الاتحادات-unions">الاتحادات (Unions)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> stringOrNumberSchema = z.<span class="hljs-title function_">union</span>([z.<span class="hljs-title function_">string</span>(), z.<span class="hljs-title function_">number</span>()]);

stringOrNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// Valid</span>
stringOrNumberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// stringOrNumberSchema.parse(true);  // Throws ZodError: Expected string | number, received boolean</span>
</code></pre>
<h2 id="التقاطعات-intersections">التقاطعات (Intersections)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> stringSchema = z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">a</span>: z.<span class="hljs-title function_">string</span>() });
<span class="hljs-keyword">const</span> numberSchema = z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">b</span>: z.<span class="hljs-title function_">number</span>() });
<span class="hljs-keyword">const</span> intersectionSchema = z.<span class="hljs-title function_">intersection</span>(stringSchema, numberSchema);

intersectionSchema.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">a</span>: <span class="hljs-string">&#x27;hello&#x27;</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">123</span> }); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// intersectionSchema.parse({ a: &quot;hello&quot; }); // Throws ZodError: Required at &#x27;b&#x27;</span>
</code></pre>
<h3 id="مكونات-مخططات-قابلة-لإعادة-الاستخدام-مع-الاتحادات">مكوّنات مخططات قابلة لإعادة الاستخدام مع الاتحادات</h3>
<p>أنشئ مكوّنات مخططات قابلة لإعادة الاستخدام بتعريف المخططات كمتغيّرات أو دوال. وهذا يعزّز المعيارية ويقلّل تكرار الشيفرة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> baseUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
  <span class="hljs-attr">createdAt</span>: z.<span class="hljs-title function_">date</span>(),
});

<span class="hljs-keyword">const</span> customerSchema = baseUserSchema.<span class="hljs-title function_">extend</span>({
  <span class="hljs-attr">customerType</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;customer&#x27;</span>),
  <span class="hljs-attr">orders</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">orderId</span>: z.<span class="hljs-title function_">string</span>() })),
});

<span class="hljs-keyword">const</span> adminSchema = baseUserSchema.<span class="hljs-title function_">extend</span>({
  <span class="hljs-attr">customerType</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;admin&#x27;</span>),
  <span class="hljs-attr">permissions</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()),
});

<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">union</span>([customerSchema, adminSchema]); <span class="hljs-comment">// Combine reusable schemas</span>
</code></pre>
<h2 id="الاتحادات-المميزة-discriminated-unions">الاتحادات المُميَّزة (Discriminated Unions)</h2>
<p>عندما تحتوي بياناتك على حقل «مُميِّز» معروف، يكون <code>z.discriminatedUnion()</code> أكفأ (وأوضح) من الاتحادات العادية.</p>
<h3 id="مثال-type-أو-kind-كمميز">مثال: <code>type</code> أو <code>kind</code> كمُميِّز</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> customerSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;customer&#x27;</span>),
  <span class="hljs-attr">orders</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()),
});

<span class="hljs-keyword">const</span> adminSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;admin&#x27;</span>),
  <span class="hljs-attr">permissions</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()),
});

<span class="hljs-keyword">const</span> userSchema = z.<span class="hljs-title function_">discriminatedUnion</span>(<span class="hljs-string">&#x27;type&#x27;</span>, [customerSchema, adminSchema]);

<span class="hljs-comment">// Succeeds if type === &#x27;customer&#x27; or &#x27;admin&#x27;</span>
userSchema.<span class="hljs-title function_">parse</span>({
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;customer&#x27;</span>,
  <span class="hljs-attr">orders</span>: [<span class="hljs-string">&#x27;order1&#x27;</span>, <span class="hljs-string">&#x27;order2&#x27;</span>],
});
</code></pre>
<h3 id="الفوائد">الفوائد</h3>
<ul>
<li><strong>الأداء</strong>: يستطيع Zod تجاوز فحص كل فرع من فروع الاتحاد بمجرد رؤية المُميِّز.</li>
<li><strong>الوضوح</strong>: إذا كان <code>type</code> أو <code>kind</code> في كائن مدخلك غير صحيح، فستحصل على خطأ فوري.</li>
</ul>
<h2 id="never-وunknown-وany"><code>never</code> و<code>unknown</code> و<code>any</code></h2>
<p>يضمّ Zod مخططات خاصة تحاكي الأنواع المساعدة المدمجة في TypeScript:</p>
<ul>
<li><code>z.never()</code> — يفشل دائمًا. فإذا رأيت <code>z.never()</code>، فذلك الخاصية لا يمكن أن توجد بصورة صالحة <em>أبدًا</em>.</li>
<li><code>z.unknown()</code> — يمكن لأي شيء أن يمرّ، لكن النوع النهائي هو <code>unknown</code>. جيد لتخزين بيانات لن تتفاعل معها مباشرةً.</li>
<li><code>z.any()</code> — يمكن لأي شيء أن يمرّ <em>و</em> النوع النهائي هو <code>any</code>. نادرًا ما يُنصح به، لكنه قد يكون آخر ملاذ إن لم تستطع تنميط شيء ما إطلاقًا.</li>
</ul>
<h3 id="مثال">مثال</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> exoticSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">no</span>: z.<span class="hljs-title function_">never</span>(), <span class="hljs-comment">// always invalid</span>
  <span class="hljs-attr">hidden</span>: z.<span class="hljs-title function_">unknown</span>(), <span class="hljs-comment">// always valid, type = unknown</span>
  <span class="hljs-attr">whatever</span>: z.<span class="hljs-title function_">any</span>(), <span class="hljs-comment">// always valid, type = any</span>
});
</code></pre>
<p><strong>نصيحة احترافية</strong>: اعتمد على التنميط القوي قدر الإمكان. فقد يكون <code>z.unknown()</code> و<code>z.any()</code> ضروريين، لكنهما يقلّلان أمان الأنواع عمومًا.</p>
<h2 id="الصرامة-مقابل-التمرير-مقابل-النزع">الصرامة مقابل التمرير مقابل النزع</h2>
<p>عند التحقّق من الكائنات، يتعامل Zod مع <em>المفاتيح الإضافية/المجهولة</em> بطرق مختلفة حسب النمط:</p>
<h3 id="النزع-افتراضي">النزع (افتراضي)</h3>
<h3 id="الصرامة">الصرامة <span class="content-anchor" id="strict"></span></h3>
<h3 id="التمرير">التمرير</h3>
<h3 id="مثال">مثال</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> baseObj = z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>() });

<span class="hljs-comment">// Strict</span>
<span class="hljs-keyword">const</span> strictObj = baseObj.<span class="hljs-title function_">strict</span>();
strictObj.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Zod&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">99</span> });
<span class="hljs-comment">// =&gt; throws: unrecognized key &quot;age&quot;</span>

<span class="hljs-comment">// Passthrough</span>
<span class="hljs-keyword">const</span> passObj = baseObj.<span class="hljs-title function_">passthrough</span>();
passObj.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Zod&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">99</span> });
<span class="hljs-comment">// =&gt; { name: &quot;Zod&quot;, age: 99 }</span>

<span class="hljs-comment">// Default (strip)</span>
baseObj.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Zod&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">99</span> });
<span class="hljs-comment">// =&gt; { name: &quot;Zod&quot; } (age is stripped out)</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، ما زال <code>.strict()</code> و<code>.passthrough()</code> يعملان، لكن المقاربة المفضّلة هي استخدام البانيين على المستوى الأعلى <code>z.strictObject({...})</code> و<code>z.looseObject({...})</code> عند تعريف مخططات جديدة.</p>
</blockquote>
<p>استخدم النمط الذي يناسب بياناتك أكثر. الصرامة جيدة عندما تريد ضمان عدم تسلّل حقول غير متوقعة؛ والتمرير مفيد إن أردت الاحتفاظ بها للّوغنة أو التصحيح.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
