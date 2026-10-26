const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="class-validator-class-transformer-express",t="التحقق بالأصناف وتحويل الكائنات",p=[{depth:2,id:"التحقق-الكائني-باستخدام-class-validator-وclass-transformer",text:"التحقق الكائني باستخدام class-validator وclass-transformer"},{depth:3,id:"التثبيت",text:"التثبيت"},{depth:3,id:"تفعيل-بيانات-المزينات-الوصفية",text:"تفعيل بيانات المزيّنات الوصفية:"},{depth:3,id:"تعريف-أصناف-التحقق",text:"تعريف أصناف التحقق:"},{depth:3,id:"وسيط-التحقق",text:"وسيط التحقق:"},{depth:3,id:"استخدام-وسيط-التحقق-في-المسارات",text:"استخدام وسيط التحقق في المسارات:"},{depth:2,id:"حراس-أنواع-مخصصون-للتحقق-المعقد",text:"حرّاس أنواع مخصّصون للتحقق المعقّد"},{depth:3,id:"مثال-التحقق-من-صيغة-تاريخ-مخصصة",text:"مثال: التحقق من صيغة تاريخ مخصّصة"},{depth:3,id:"الفوائد",text:"الفوائد"}],e=`<p>بينما يوفّر فحص الأنواع الأساسي ومكتبات مثل <a href="https://www.npmjs.com/package/zod">Zod</a> تحققًا متينًا، قد تحتاج السيناريوهات المتقدّمة إلى تقنيات أكثر تطورًا. ويستعرض هذا الدليل استخدام <a href="https://www.npmjs.com/package/class-validator"><code>class-validator</code></a> و<a href="https://www.npmjs.com/package/class-transformer"><code>class-transformer</code></a> للتحقق الكائني، فضلًا عن صياغة حرّاس أنواع مخصّصين لمنطق معقّد.</p>
<h2 id="التحقق-الكائني-باستخدام-class-validator-وclass-transformer">التحقق الكائني باستخدام <code>class-validator</code> و<code>class-transformer</code></h2>
<p>يعمل <code>class-validator</code> و<code>class-transformer</code> معًا بشكل تآزري لتوفير تحقق كائني قوي. ويستخدم <code>class-validator</code> المزيّنات (decorators) لتعريف قواعد التحقق، بينما يتولّى <code>class-transformer</code> تحويلات الكائنات.</p>
<h3 id="التثبيت">التثبيت</h3>
<pre><code class="language-bash">npm install class-validator class-transformer reflect-metadata
</code></pre>
<p>يثبّت هذا:</p>
<ul>
<li><a href="https://www.npmjs.com/package/class-validator"><code>class-validator</code></a>: للتحقق القائم على المزيّنات</li>
<li><a href="https://www.npmjs.com/package/class-transformer"><code>class-transformer</code></a>: لتحويل الكائنات</li>
<li><a href="https://www.npmjs.com/package/reflect-metadata"><code>reflect-metadata</code></a>: مطلوب لبيانات المزيّنات الوصفية</li>
</ul>
<h3 id="تفعيل-بيانات-المزينات-الوصفية">تفعيل بيانات المزيّنات الوصفية:</h3>
<p>تأكد من استيراد <code>reflect-metadata</code> في أعلى ملف الدخول لديك (مثل <code>index.ts</code>):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;reflect-metadata&#x27;</span>; <span class="hljs-comment">// Import reflect-metadata once in your app</span>
</code></pre>
<p>كذلك تأكد من تفعيل الخيارات التالية في <code>tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;experimentalDecorators&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;emitDecoratorMetadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-comment">// ... other options</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="تعريف-أصناف-التحقق">تعريف أصناف التحقق:</h3>
<p>أنشئ أصنافًا تمثّل أجسام طلباتك، واستخدم المزيّنات من <code>class-validator</code> لتعريف قواعد التحقق.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IsString</span>, <span class="hljs-title class_">IsEmail</span>, <span class="hljs-title class_">MinLength</span>, <span class="hljs-title class_">IsOptional</span>, <span class="hljs-title class_">IsInt</span>, <span class="hljs-title class_">Min</span>, <span class="hljs-title class_">Max</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-validator&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CreateUserDto</span> {
  <span class="hljs-meta">@IsString</span>()
  <span class="hljs-meta">@MinLength</span>(<span class="hljs-number">3</span>)
  <span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span>;

  <span class="hljs-meta">@IsEmail</span>()
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;

  <span class="hljs-meta">@IsString</span>()
  <span class="hljs-meta">@MinLength</span>(<span class="hljs-number">8</span>)
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;

  <span class="hljs-meta">@IsOptional</span>()
  <span class="hljs-meta">@IsInt</span>()
  <span class="hljs-meta">@Min</span>(<span class="hljs-number">18</span>)
  <span class="hljs-meta">@Max</span>(<span class="hljs-number">120</span>)
  <span class="hljs-attr">age</span>?: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h3 id="وسيط-التحقق">وسيط التحقق:</h3>
<p>أنشئ وسيطًا للتحقق من الطلبات الواردة باستخدام <code>class-validator</code> و<code>class-transformer</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span>, <span class="hljs-title class_">NextFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { validate, plainToClass } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-transformer&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CreateUserDto</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./dtos/create-user.dto&#x27;</span>; <span class="hljs-comment">// Assuming your DTO is in dtos/create-user.dto</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">validateDto</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) {
  <span class="hljs-keyword">const</span> dto = <span class="hljs-title function_">plainToClass</span>(<span class="hljs-title class_">CreateUserDto</span>, req.<span class="hljs-property">body</span>);
  <span class="hljs-keyword">const</span> errors = <span class="hljs-keyword">await</span> <span class="hljs-title function_">validate</span>(dto);

  <span class="hljs-keyword">if</span> (errors.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">errors</span>: errors.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> e.<span class="hljs-property">constraints</span>) });
  }

  req.<span class="hljs-property">body</span> = dto; <span class="hljs-comment">// Replace req.body with the transformed and validated DTO</span>
  <span class="hljs-title function_">next</span>();
}
</code></pre>
<h3 id="استخدام-وسيط-التحقق-في-المسارات">استخدام وسيط التحقق في المسارات:</h3>
<p>طبّق الوسيط على مساراتك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> express, { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { validateDto } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./middleware/validate.dto&#x27;</span>; <span class="hljs-comment">// Assuming your middleware is in middleware/validate.dto</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CreateUserDto</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./dtos/create-user.dto&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, validateDto, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, <span class="hljs-title class_">CreateUserDto</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// req.body is now a validated instance of CreateUserDto</span>
  <span class="hljs-keyword">const</span> { username, email, password, age } = req.<span class="hljs-property">body</span>;
  <span class="hljs-comment">// ... create user logic</span>
  res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;User created&#x27;</span> });
});
</code></pre>
<h2 id="حراس-أنواع-مخصصون-للتحقق-المعقد">حرّاس أنواع مخصّصون للتحقق المعقّد</h2>
<p>لمنطق التحقق الذي يتجاوز المزيّنات البسيطة، يوفّر حرّاس الأنواع المخصّصون مرونة.</p>
<h3 id="مثال-التحقق-من-صيغة-تاريخ-مخصصة">مثال: التحقق من صيغة تاريخ مخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isValidCustomDate</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>): value is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$/</span>;
  <span class="hljs-keyword">return</span> regex.<span class="hljs-title function_">test</span>(value);
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EventRequest</span> {
  <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Must be a custom date format</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateEventRequest</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) {
  <span class="hljs-keyword">const</span> { startTime } = req.<span class="hljs-property">body</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">EventRequest</span>;

  <span class="hljs-keyword">if</span> (!<span class="hljs-title function_">isValidCustomDate</span>(startTime)) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid start time format&#x27;</span> });
  }

  <span class="hljs-title function_">next</span>();
}

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/events&#x27;</span>, validateEventRequest, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>, <span class="hljs-title class_">EventRequest</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// req.body.startTime is now guaranteed to be a valid custom date string</span>
  res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Event created&#x27;</span> });
});
</code></pre>
<h3 id="الفوائد">الفوائد</h3>
<ul>
<li><strong>التحقق الكائني:</strong> يوفّر <code>class-validator</code> و<code>class-transformer</code> مقاربة منظّمة للتحقق.</li>
<li><strong>قابلية إعادة الاستخدام:</strong> يمكن إعادة استخدام أصناف التحقق والوسيط في أنحاء تطبيقك.</li>
<li><strong>المرونة:</strong> يتعامل حرّاس الأنواع المخصّصون مع منطق تحقق معقّد.</li>
<li><strong>الوضوح:</strong> تُحسّن المزيّنات وحرّاس الأنواع وضوح الشيفرة.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
