const s="kinney",n="react-typescript",a="React مع TypeScript",t="typescript-type-system-fundamentals",l="أساسيات نظام أنواع TypeScript",p=[{depth:2,id:"التصنيف-البنيوي-الأساس",text:"التصنيف البنيوي: الأساس"},{depth:2,id:"استنتاج-الأنواع-دع-typescript-يعمل",text:"استنتاج الأنواع: دع TypeScript يعمل"},{depth:2,id:"تضييق-الأنواع-تحسين-تدريجي-للنوع",text:"تضييق الأنواع: تحسين تدريجي للنوع"},{depth:2,id:"أمان-الأنواع-مع-unknown-وany",text:"أمان الأنواع مع unknown وany"},{depth:2,id:"الأسماء-المستعارة-للأنواع-مقابل-الواجهات",text:"الأسماء المستعارة للأنواع مقابل الواجهات"},{depth:2,id:"الأنواع-الحرفية-والقوالب-الحرفية",text:"الأنواع الحرفيّة والقوالب الحرفيّة"},{depth:2,id:"تأكيدات-الأنواع-والتحويل-casting",text:"تأكيدات الأنواع والتحويل (Casting)"},{depth:2,id:"أنواع-الدوال-والتحميل-overloads",text:"أنواع الدوال والتحميل (Overloads)"},{depth:2,id:"الدوال-العامة-generic-functions-ومعاملات-الأنواع",text:"الدوال العامة (Generic Functions) ومعاملات الأنواع"},{depth:2,id:"توقيعات-الفهرس-index-signatures-والأنواع-الديناميكية",text:"توقيعات الفهرس (Index Signatures) والأنواع الديناميكية"},{depth:2,id:"أنظمة-الوحدات-module-systems-وتصريحات-الأنواع",text:"أنظمة الوحدات (Module Systems) وتصريحات الأنواع"},{depth:2,id:"أفضل-الممارسات-والنمذجة-الذهنية",text:"أفضل الممارسات والنمذجة الذهنية"},{depth:3,id:"ابدأ-محددا-ووسع-عند-الحاجة",text:"ابدأ محددًا، ووسّع عند الحاجة"},{depth:3,id:"استخدم-أنواع-union-للحالات",text:"استخدم أنواع Union للحالات"},{depth:3,id:"فضل-استنتاج-الأنواع",text:"فضّل استنتاج الأنواع"},{depth:3,id:"اجعل-الحالات-غير-الصالحة-غير-قابلة-للتمثيل",text:"اجعل الحالات غير الصالحة غير قابلة للتمثيل"},{depth:2,id:"خاتمة",text:"خاتمة"}],e=`<p>قبل أن تتقن React مع TypeScript، تحتاج إلى فهم كيف يفكّر TypeScript في الأنواع. ليس كـ Java أو C# حيث الأنواع تدور حول الأصناف والوراثة. يستخدم TypeScript التصنيف البنيوي (structural typing) — إن مشى كبطّة وصوّت كبطّة، يقول TypeScript إنها بطّة. هذا الاختلاف الأساسي يغيّر كل شيء في كيفية كتابة الأنواع والتفكير فيها.</p>
<p>لنبنِ أساسًا متينًا في نظام أنواع TypeScript. متى فهمت هذه المفاهيم الأساسية، كل نمط في React سيصبح أكثر وضوحًا، وكل رسالة خطأ ستكون أوضح، وستكتب أنواعًا تساعد فعلًا بدل أن تعيق.</p>
<h2 id="التصنيف-البنيوي-الأساس">التصنيف البنيوي: الأساس</h2>
<p>TypeScript لا يهتم بالأسماء أو التصريحات — يهتم بالشكل. هذا أهم مفهوم يجب استيعابه. على عكس اللغات مُسمّاة التصنيف مثل Java أو C#، يستخدم TypeScript التصنيف البنيوي حيث يُحدَّد توافق الأنواع ببنية الأنواع، لا بأسمائها.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-structural-typing">التصنيف البنيوي في TypeScript</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>أنماط التصنيف البنيوي (duck typing)</li>
<li>فحص الخصائص الزائدة (excess property checking)</li>
<li>خصائص React (props) وتراكيب المكوّنات (component composition)</li>
<li>قواعد توافق الأصناف (class compatibility rules)</li>
<li>أنماط واقعية وأفضل الممارسات</li>
</ul>
<h2 id="استنتاج-الأنواع-دع-typescript-يعمل">استنتاج الأنواع: دع TypeScript يعمل</h2>
<p>TypeScript ممتاز في معرفة الأنواع. فهم متى تترك الاستنتاج يعمل ومتى تكون صريحًا هو مفتاح كتابة شيفرة نظيفة وقابلة للصيانة مع كمية أقل من الكود المعياري (boilerplate).</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-type-inference-mastery">إتقان استنتاج الأنواع</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>متى الاعتماد على الاستنتاج مقابل الصراحة</li>
<li>أنماط التصنيف السياقي (contextual typing)</li>
<li>تأكيدات const (const assertions) والأنواع الحرفيّة (literal types)</li>
<li>أنماط الاستنتاج الخاصة بـ React</li>
<li>اعتبارات الأداء</li>
</ul>
<h2 id="تضييق-الأنواع-تحسين-تدريجي-للنوع">تضييق الأنواع: تحسين تدريجي للنوع</h2>
<p>TypeScript يفهم تدفق التحكم ويضيّق الأنواع بناءً على منطق شيفرتك. هذا يمكّنك من كتابة شيفرة أكثر أمانًا مع فحص أنواع دقيق.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow">تضييق الأنواع وتدفق التحكم</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>حرّاس الأنواع (type guards): <code>typeof</code> و<code>instanceof</code> وعامل <code>in</code></li>
<li>حرّاس الأنواع المخصّصة ودوال التأكيد (assertion functions)</li>
<li>تحليل تدفق التحكم (control flow analysis)</li>
<li>الاتحادات المميّزة (discriminated unions) وفحص الاستنفاد (exhaustiveness checking)</li>
<li>أنماط التضييق الخاصة بـ React</li>
</ul>
<h2 id="أمان-الأنواع-مع-unknown-وany">أمان الأنواع مع <code>unknown</code> و<code>any</code></h2>
<p>فهم الفرق بين <code>unknown</code> و<code>any</code> أساسي لسلامة الأنواع. بينما <code>any</code> يعطّل فحص الأنواع، <code>unknown</code> يتطلب منك التحقّق من الأنواع قبل الاستخدام.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-unknown-vs-any"><code>unknown</code> مقابل <code>any</code></a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>لماذا <code>any</code> خطر وكيف ينتشر</li>
<li>معالجة الأنواع الديناميكية بأمان مع <code>unknown</code></li>
<li>نوع <code>never</code> لفحص الاستنفاد</li>
<li>استراتيجيات الترحيل من <code>any</code> إلى <code>unknown</code></li>
<li>أنماط واقعية لمعالجة API بأمان الأنواع</li>
</ul>
<h2 id="الأسماء-المستعارة-للأنواع-مقابل-الواجهات">الأسماء المستعارة للأنواع مقابل الواجهات</h2>
<p>متى تستخدم <code>type</code> مقابل <code>interface</code> سؤال شائع في TypeScript. بينما كلاهما يمكن أن يصف شكلاً لكائن، لكل منهما قدرات فريدة.</p>
<p><strong>الاختلافات الرئيسية:</strong></p>
<ul>
<li><strong>الواجهات (Interfaces)</strong> الأفضل لأشكال الكائنات، تدعم دمج التصريحات (declaration merging)، وتعمل جيدًا مع الأصناف</li>
<li><strong>الأسماء المستعارة للأنواع (Type aliases)</strong> يمكن أن تمثّل أي نوع (اتحادات، tuples، أنواع بدائية)، تدعم أنواع التقاطع (intersection types)، وتعمل مع الأنواع المُخطّطة/الشرطية (mapped/conditional types)</li>
</ul>
<p><strong>إرشادات سريعة:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Use interface for object shapes</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Use type for unions, functions, and complex types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">Event</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Nullable</span>&lt;T&gt; = T | <span class="hljs-literal">null</span>;
</code></pre>
<p>لمزيد من الأنماط مع الأسماء المستعارة للأنواع والواجهات، انظر:</p>
<ul>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-unions-intersections-guards">الاتحادات والتقاطعات والحرّاس</a></strong> لأنماط الاتحاد والتقاطع</li>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-utility-types-complete">أنواع الأدوات (Utility Types)</a></strong> لتحويلات الأنواع المتقدمة</li>
</ul>
<h2 id="الأنواع-الحرفية-والقوالب-الحرفية">الأنواع الحرفيّة والقوالب الحرفيّة</h2>
<p>الأنواع الحرفيّة في TypeScript تسمح لك بتحديد قيم exact كأنواع، مما يمكّن فحص أنواع دقيق وأنماط manipulation للسلاسل الفعّالة.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-template-literal-types">أنواع القوالب الحرفيّة (Template Literal Types)</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>أنواع حرفيّة للسلاسل والأرقام والقيم المنطقية</li>
<li>أنماط أنواع القوالب الحرفيّة</li>
<li>أدوات manipulation للسلاسل</li>
<li>أسماء خصائص ديناميكية ومعالجات الأحداث</li>
<li>أنماط React واقعية</li>
</ul>
<h2 id="تأكيدات-الأنواع-والتحويل-casting">تأكيدات الأنواع والتحويل (Casting)</h2>
<p>أحيانًا تعرف أكثر من TypeScript عن نوع قيمة. تأكيدات الأنواع تسمح لك بتجاوز النوع المُستنتَج من TypeScript، لكن استخدمها بحذر — فهي تتجاوز سلامة الأنواع.</p>
<p><strong>أنماط شائعة:</strong></p>
<ul>
<li>صياغة <code>as</code> لتأكيدات الأنواع (مُفضّلة في JSX)</li>
<li>عامل التأكيد غير null (<code>!</code>) عندما تكون متأكدًا من وجود قيمة</li>
<li><code>as const</code> لاستنتاج الأنواع الحرفيّة</li>
<li>دوال التأكيد (assertion functions) للتحقّق من الأنواع في وقت التشغيل</li>
</ul>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow">تضييق الأنواع وتدفق التحكم</a></strong> لبدائل أأمن باستخدام:</p>
<ul>
<li>حرّاس الأنواع بدل التأكيدات</li>
<li>دوال التأكيد مع فحوصات وقت التشغيل</li>
<li>تحليل تدفق التحكم للتضييق التلقائي</li>
</ul>
<h2 id="أنواع-الدوال-والتحميل-overloads">أنواع الدوال والتحميل (Overloads)</h2>
<p>الدوال في TypeScript تدعم أنماط typing قوية تتضمن التحميل (overloads)، المعاملات الاختيارية، والواجهات القابلة للاستدعاء.</p>
<p><strong>المفاهيم الرئيسية:</strong></p>
<ul>
<li>تعبيرات نوع الدالة لتحديد تواقيع الدوال</li>
<li>تحميل الدوال لتوقيعات استدعاء متعددة</li>
<li>معاملات اختيارية وrest</li>
<li>دوال مع خصائص</li>
</ul>
<p><strong>مواضيع ذات صلة:</strong></p>
<ul>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-generics-deep-dive">العموميات (Generics) بعمق</a></strong> لأنماط دوال العموميات</li>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow">تضييق الأنواع</a></strong> لدوال حرّاس الأنواع</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Quick example: Function overloads</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">object</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">object</span> | <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(value) : value.<span class="hljs-title function_">toString</span>();
}
</code></pre>
<h2 id="الدوال-العامة-generic-functions-ومعاملات-الأنواع">الدوال العامة (Generic Functions) ومعاملات الأنواع</h2>
<p>العموميات (generics) تمكّن من كتابة دوال قابلة لإعادة الاستخدام وأمن الأنواع تعمل مع أي نوع مع الحفاظ على علاقات الأنواع.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-generics-deep-dive">العموميات في TypeScript بعمق</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>دوال وواجهات وأصناف عمومية</li>
<li>قيود الأنواع والأنواع الشرطية</li>
<li>عموميات مكوّنات React</li>
<li>أنماط متقدمة مع معاملات أنواع متعددة</li>
<li>تطبيقات واقعية وأفضل الممارسات</li>
</ul>
<h2 id="توقيعات-الفهرس-index-signatures-والأنواع-الديناميكية">توقيعات الفهرس (Index Signatures) والأنواع الديناميكية</h2>
<p>TypeScript يوفّر عدة طرق للعمل مع كائنات لها أسماء خصائص ديناميكية.</p>
<p><strong>الأنماط الرئيسية:</strong></p>
<ul>
<li>توقيعات الفهرس للوصول الديناميكي للخصائص</li>
<li>أنواع Record لربط المفاتيح بالقيم</li>
<li>أنماط القوالب الحرفيّة لأسماء الخصائص</li>
</ul>
<p><strong>انظر التغطية المتقدمة:</strong></p>
<ul>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-conditional-mapped-types">الأنواع الشرطية والمُخطّطة (Conditional and Mapped Types)</a></strong> لتحويلات الأنواع المُخطّطة</li>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-template-literal-types">أنواع القوالب الحرفيّة</a></strong> لأنماط القوالب الحرفيّة</li>
<li><strong><a href="https://stevekinney.com/courses/react-typescript/typescript-utility-types-complete">أنواع الأدوات (Utility Types)</a></strong> لـ Record وPartial وأدوات أخرى</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Quick example: Record type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StatusMessages</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">Status</span>, <span class="hljs-built_in">string</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-attr">messages</span>: <span class="hljs-title class_">StatusMessages</span> = {
  <span class="hljs-attr">idle</span>: <span class="hljs-string">&#x27;Ready&#x27;</span>,
  <span class="hljs-attr">loading</span>: <span class="hljs-string">&#x27;Please wait...&#x27;</span>,
  <span class="hljs-attr">success</span>: <span class="hljs-string">&#x27;Complete!&#x27;</span>,
  <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Something went wrong&#x27;</span>,
};
</code></pre>
<h2 id="أنظمة-الوحدات-module-systems-وتصريحات-الأنواع">أنظمة الوحدات (Module Systems) وتصريحات الأنواع</h2>
<p>فهم نظام وحدات TypeScript أساسي لتنظيم الشيفرة والعمل مع المكتبات الخارجية.</p>
<p><strong>انظر: <a href="https://stevekinney.com/courses/react-typescript/typescript-modules-declarations">الوحدات والتصريحات</a></strong> لتغطية شاملة تتضمن:</p>
<ul>
<li>وحدات ES وتوافق CommonJS</li>
<li>استيرادات وتصديرات type-only</li>
<li>ملفات التصريحات (declaration files) لمكتبات JavaScript</li>
<li>أنماط augmentation للوحدات</li>
<li>تصريحات أنواع namespace والعالمية (global)</li>
</ul>
<h2 id="أفضل-الممارسات-والنمذجة-الذهنية">أفضل الممارسات والنمذجة الذهنية</h2>
<h3 id="ابدأ-محددا-ووسع-عند-الحاجة">ابدأ محددًا، ووسّع عند الحاجة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too wide initially</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
  <span class="hljs-comment">// No type safety</span>
}

<span class="hljs-comment">// ✅ Start specific</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) {
  <span class="hljs-comment">// Full type safety</span>
}

<span class="hljs-comment">// ✅ Widen when needed with generics</span>
<span class="hljs-keyword">function</span> processEntity&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-attr">entity</span>: T) {
  <span class="hljs-comment">// Flexible but safe</span>
}
</code></pre>
<h3 id="استخدم-أنواع-union-للحالات">استخدم أنواع Union للحالات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Multiple booleans</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BadState</span> {
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isSuccess</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// ✅ Union types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GoodState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">Data</span> };
</code></pre>
<h3 id="فضل-استنتاج-الأنواع">فضّل استنتاج الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary annotations</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;Alice&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">30</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span> } = { name, age };

<span class="hljs-comment">// ✅ Let TypeScript infer</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&#x27;Alice&#x27;</span>;
<span class="hljs-keyword">const</span> age = <span class="hljs-number">30</span>;
<span class="hljs-keyword">const</span> user = { name, age };
</code></pre>
<h3 id="اجعل-الحالات-غير-الصالحة-غير-قابلة-للتمثيل">اجعل الحالات غير الصالحة غير قابلة للتمثيل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Invalid states possible</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BadForm</span> {
  <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isSuccess</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// ✅ Invalid states impossible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GoodForm</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;submitting&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">FormData</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };
</code></pre>
<h2 id="خاتمة">خاتمة</h2>
<p>هذه الأسس تشكّل bedrock فهم TypeScript. التصنيف البنيوي (structural typing) يعلّمك التفكير بالأشكال، لا الأسماء. استنتاج الأنواع يوضح متى تكتب الأنواع ومتى تترك TypeScript يعمل. تضييق الأنواع يكشف كيف يفهم TypeScript تدفق شيفرتك. والفرق بين <code>unknown</code> و<code>any</code> يبقي شيفرتك آمنة.</p>
<p>أتقن هذه المفاهيم، وأنماط React مع TypeScript ستبدو طبيعية. ستكتب أنواعًا تساعد بدل أن تعيق، وتلتقط الأخطاء في وقت الترجمة (compile time)، وتبني تطبيقات بثقة. نظام الأنواع ليس عبئًا — إنه أقوى أداة لديك لكتابة شيفرة قوية وقابلة للصيانة.</p>
`,i={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,i as default,p as headings,e as html,t as slug,l as title};
