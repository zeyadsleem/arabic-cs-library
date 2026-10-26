const s="kinney",n="tailwind",a="Tailwind CSS",e="border-outline-ring",t="الحدود والأُطُر الخارجية والحلقات",l=[{depth:2,id:"البدء-بزر-بسيط",text:"البدء بزر بسيط"},{depth:2,id:"الحدود-أمر-متغير",text:"الحدود: أمر متغيّر"},{depth:2,id:"مشكلة-انزياح-التخطيط",text:"مشكلة انزياح التخطيط"},{depth:2,id:"المحيطات-بديل-محترم",text:"المحيطات: بديل محترم"},{depth:2,id:"المحيطات-لحالات-التركيز",text:"المحيطات لحالات التركيز"},{depth:2,id:"قيد-المحيطات",text:"قيد المحيطات"},{depth:2,id:"الحلقات-هل-هي-موجودة-حقا",text:"الحلقات: هل هي موجودة حقًا؟"},{depth:2,id:"كيف-تختلف-عن-المحيطات",text:"كيف تختلف عن المحيطات"},{depth:2,id:"تكديس-عدة-حلقات",text:"تكديس عدة حلقات"},{depth:2,id:"متى-تستخدم-كلا-منها",text:"متى تستخدم كلًّا منها"},{depth:3,id:"استخدم-border-عندما",text:"استخدم border عندما…"},{depth:3,id:"استخدم-outline-عندما",text:"استخدم outline عندما…"},{depth:3,id:"استخدم-ring-عندما",text:"استخدم ring عندما…"}],p=`<p>هناك طرق <em>مختلفة</em> لرسم خطوط حول العناصر، وكلها تتصرف على نحو <em>مختلف</em> تمامًا. (بالطبع تختلف، أليس كذلك؟) لنبنِ بعض الأمثلة لنرى كيف تعمل <code>border</code> و<code>outline</code> و<code>ring</code> فعليًا في الممارسة.</p>
<h2 id="البدء-بزر-بسيط">البدء بزر بسيط</h2>
<p>لنبدأ بزر أساسي لنرى كيف يؤثر كل أسلوب على التخطيط.</p>
<p><em>البدء بزر بسيط — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/b4d66028b22562890b7528af6237e16f6918d5292f34c937a61963dca2dabbe6.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>لا شيء مبهر هنا — مجرد زر أزرق ببعض الحشو وزوايا <code>rounded-md</code>. لنرَ الآن ما يحدث عندما نضيف أنواعًا مختلفة من «الحدود» إليه.</p>
<h2 id="الحدود-أمر-متغير">الحدود: أمر متغيّر</h2>
<p>لنضف حدًا باستخدام أدوات <code>border</code> في Tailwind:</p>
<p><em>الحدود: أمر متغيّر — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/ffd7c7b15847cec6a1382dd5fd856e0930c0c89d565a0ed98184a762f68430aa.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border-4 border-pink-400 bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>
  Click me!
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>يضيف الصنف <code>border-4</code> حدًا بسماكة 4px حول الزر كله. لكن هنا بيت القصيد — ذلك الحد يجعل الزر أكبر فعلًا. صار الزر يشغل مساحة أكبر في الصفحة لأن الحدود جزء من نموذج صندوق CSS.</p>
<p>إن أردنا رؤية ذلك عمليًا، لنضع زرين جنبًا إلى جنب:</p>
<p><em>الحدود: أمر متغيّر — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/e856511e1d9624d98934f0628ea53c0bad9f0f72d24a0c38a067f95720436931.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-x-4 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>No border<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border-4 border-pink-400 bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>
    With border
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ستلاحظ أن الزر الثاني أكبر بوضوح — هذا هو الحد الذي يضيف إلى الحجم الكلي للعنصر. يزداد الأمر سوءًا إذا استخدمنا <code>hover:</code> لإضافة الحد.</p>
<h2 id="مشكلة-انزياح-التخطيط">مشكلة انزياح التخطيط</h2>
<p>يصبح فرق الحجم هذا مشكلة حقيقية عندما تريد إضافة حدود عند التحويم أو التركيز. شاهد ما يحدث:</p>
<p><em>مشكلة انزياح التخطيط — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/1e957c2d1ca880977fac1adc68e4781bdc1b72395d4f1e63d3ec120ff623da6d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-x-4 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>No border<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border-pink-400 bg-blue-600 px-3 py-2 text-white hover:border-4&quot;</span>&gt;</span>
    With border
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>عندما تحوّم فوق هذا الزر، يكبر فجأة ويدفع كل ما حوله. هذا ليس جيدًا لتجربة المستخدم — يبدو متعثرًا وغير احترافي.</p>
<h2 id="المحيطات-بديل-محترم">المحيطات: بديل محترم</h2>
<p>هنا يأتي دور <code>outline</code>. ترسم المحيطات خارج العنصر دون التأثير على حجمه:</p>
<p><em>المحيطات: بديل محترم — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/7cbd02d5c0e9d184c0f80b5b4a76d9de8186ef7ad0b3b06c127be8e65daa51ba.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-x-4 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>No border<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white outline-pink-400 hover:outline-4&quot;</span>&gt;</span>
    With border
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الآن عندما تحوّم، تحصل على التغذية البصرية دون أي قفز في التخطيط. أفضل بكثير! ينشئ الصنف <code>outline-4</code> محيطًا بسماكة 4px يطفو خارج الزر.</p>
<h2 id="المحيطات-لحالات-التركيز">المحيطات لحالات التركيز</h2>
<p>المحيطات مثالية لإمكانية الوصول لأن قارئات الشاشة ومستخدمي لوحة المفاتيح يعتمدون على مؤشرات التركيز:</p>
<p><em>المحيطات لحالات التركيز — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/c5da3222ad628fc2d90d8d847da33c701a951f0131fc1d37b6c252ac216ebffc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-2 focus:outline-offset-2 focus:outline-pink-400&quot;</span>
&gt;</span>
  Accessible button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>يضيف الصنف <code>focus:outline-offset-2</code> فجوة بسماكة 2px بين الزر والمحيط، ما يجعله أسهل في الرؤية. هذا بالضبط نوع الأشياء التي تجعل موقعك أكثر قابلية للاستخدام للجميع.</p>
<h2 id="قيد-المحيطات">قيد المحيطات</h2>
<blockquote>
<p><strong>سيبدو هذا جيدًا تمامًا في المتصفحات الحديثة.</strong></p>
<p>المشكلة أدناه أُصلحت فعليًا في منتصف عام 2023 تقريبًا في جميع المتصفحات الرئيسية. لذا من غير المرجح أن ترى شيئًا معيبًا هنا.</p>
<p>ومع ذلك، إن كنت ما زلت بحاجة إلى دعم المتصفحات القديمة، فلنتظاهر فقط أننا نرى شيئًا خطأً هنا.</p>
</blockquote>
<p>لكن للمحيطات قيدًا مزعجًا واحدًا — فهي لا تحترم <code>border-radius</code> في المتصفحات القديمة. إن كان لديك عنصر دائري، فسيظل المحيط مربعًا.</p>
<p><em>قيد المحيطات — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/65af5962b22520d945e6e5f16f331201b03e9863857af0e663ba46fcae21cb30.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-16 w-16 rounded-full bg-green-500 outline-4 outline-green-700&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Square outline on round element --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="الحلقات-هل-هي-موجودة-حقا">الحلقات: هل هي <em>موجودة</em> حقًا؟</h2>
<p>الحدود والمحيطات أشياء حقيقية™ في CSS. أما <code>ring</code>… فليست كذلك. هي <em>تقنيًا</em> مجرد ظل صندوق <em>يبدو</em> كمحيط.</p>
<p><em>الحلقات: هل هي موجودة حقًا؟ — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/48b87d71b1a79c0f9aef95126e15703893018d10f40a788f2c3749035712b39c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-16 w-16 rounded-full bg-green-500 ring-4 ring-green-700&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Perfect circular ring --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تقدّم <code>ring</code> خيارات تخصيص أكثر للحجم واللون والعتامة. يمكنك أيضًا ضبط <code>ring</code> ليُرسم داخل العنصر باستخدام <code>ring-inset</code>.</p>
<ul>
<li>استخدم <code>outline</code> للتأثيرات المباشرة، خصوصًا لمؤشرات التركيز.</li>
<li>استخدم <code>ring</code> عندما تحتاج إلى تحكم أكبر في مظهر الحدود، مثل العتامة والحجم واللون وما إذا كانت داخلية أم خارجية.</li>
</ul>
<h2 id="كيف-تختلف-عن-المحيطات">كيف تختلف عن المحيطات</h2>
<p><strong>أدوات المحيط</strong> تستخدم خاصية <code>outline</code> الأصلية في CSS، ما ينشئ ربطًا مباشرًا بمحركات تصيير المتصفح. عند تطبيق <code>outline-2 outline-blue-500</code>، تولّد Tailwind CSS مباشرًا: <code>outline-width: 2px; outline-color: var(--color-blue-500)</code>. يقدّم هذا النهج الأصلي البساطة ومزايا الأداء.</p>
<p><strong>أدوات الحلقة</strong>، في المقابل، تنفّذ نظام ظل صندوق متعدد الطبقات متطورًا. صنف مثل <code>ring-2 ring-blue-500</code> ينشئ خصائص CSS مخصصة تكدّس عدة ظلال: <code>--tw-ring-shadow: 0 0 0 2px</code> مع متغيّرات الألوان. تتيح هذه البنية ميزات مثل إزاحات الحلقة والحلقات الداخلية، لكنها تضيف تعقيدًا. يُحقَّق تأثير إزاحة الحلقة عبر تكديس عدة ظلال صندوق — ظل صلب واحد يطابق لون الخلفية لإنشاء مظهر الفجوة، يتبعه ظل الحلقة الفعلي.</p>
<p><strong>تدعم المتصفحات الحديثة الآن <code>border-radius</code> للمحيطات</strong>، ما يحل المشكلة القديمة التي كانت المحيطات تظهر فيها مربعة حول العناصر المستديرة. نفّذت Firefox ذلك في أبريل 2021، وChrome في سبتمبر 2021، ولحقت Safari (أخيرًا) في مارس 2023. يزيل هذا التقدّم أحد الأسباب الرئيسية التي جعلت المطورين يفضّلون ظل الصندوق لحالات التركيز تاريخيًا.</p>
<blockquote>
<p><strong>كلمة عن وضع التباين العالي</strong></p>
<p>يبرز أهم فرق في توافق المتصفحات في <strong>وضع التباين العالي في Windows</strong>. يصبح ظل الصندوق (وبالتالي أدوات الحلقة) غير مرئي تمامًا في وضع إمكانية الوصول هذا، بينما تُحفظ خصائص المحيط وتُعدَّل تلقائيًا إلى ألوان النظام. لهذا التمييز آثار عميقة على الامتثال لإمكانية الوصول.</p>
</blockquote>
<blockquote>
<p><strong>باختصار</strong></p>
<p><strong>أدوات المحيط هي الفائز الواضح لحالات الاستخدام الحرجة لإمكانية الوصول</strong>، خصوصًا مؤشرات التركيز. فهي تعمل تلقائيًا مع وضع التباين العالي في Windows، وتحترم تفضيلات المستخدم لأنماط التركيز المخصصة، وتتوافق مع متطلبات WCAG 2.4.7 لمؤشرات التركيز المرئية.</p>
<p>استخدم الحلقات لأغراض تزيينية فقط.</p>
</blockquote>
<h2 id="تكديس-عدة-حلقات">تكديس عدة حلقات</h2>
<p>إليك شيئًا رائعًا — يمكنك تكديس عدة حلقات للحصول على تأثيرات أكثر تعقيدًا:</p>
<p><em>تكديس عدة حلقات — المثال 9 — <a href="https://stevekinney.com/generated/playgrounds/6b48e0465ab7b8540aa7b6514345b23f073c781618afeb20ff312e7e4d59ecab.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-purple-500 px-3 py-2 text-white ring-4 ring-purple-300 ring-offset-4 ring-offset-green-300&quot;</span>
&gt;</span>
  Fancy button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>ينشئ <code>ring-offset-2</code> مسافة بين العنصر والحلقة، ويضبط <code>ring-offset-purple-100</code> لون تلك المسافة. هذا ينشئ تأثيرًا طبقًا يبدو مصقولًا حقًا.</p>
<p>تمنحك الحلقات تحكمًا دقيقًا في الألوان والعتامة:</p>
<p><em>تكديس عدة حلقات — المثال 10 — <a href="https://stevekinney.com/generated/playgrounds/6139bc4b1b3ddfd2077ce2eab65322662bd1948bbae1840daea16c5d01fa04a8.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-red-500 px-3 py-2 text-white ring-4 ring-red-500/30&quot;</span>&gt;</span>
  Semi-transparent ring
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>الجزء <code>/30</code> في نهاية <code>ring-red-500/30</code> يجعل عتامة الحلقة 30%، ما ينشئ تأثير توهج خفيف.</p>
<h2 id="متى-تستخدم-كلا-منها">متى تستخدم كلًّا منها</h2>
<p>بعد بناء كل هذه الأمثلة، إليك متى تلجأ إلى كل نهج:</p>
<h3 id="استخدم-border-عندما">استخدم <code>border</code> عندما…</h3>
<ul>
<li>تحتاج إلى حدود هيكلية فعلية (مثل خلايا الجدول أو حواف البطاقات).</li>
<li>يكون الحد جزءًا من التصميم، لا مجرد حالة تفاعل.</li>
<li>لا تمانع أن يشغل العنصر مساحة أكبر.</li>
</ul>
<h3 id="استخدم-outline-عندما">استخدم <code>outline</code> عندما…</h3>
<ul>
<li>تحتاج إلى تصحيح سريع (ضع <code>outline</code> على كل شيء لرؤية التخطيطات).</li>
<li>تبني حالات تركيز لعناصر غير مستديرة بـ <code>rounded-md</code> — وتستهدف متصفحات ما قبل منتصف 2023.</li>
<li>تريد شيئًا لن يؤثر على التخطيط قطعًا.</li>
</ul>
<h3 id="استخدم-ring-عندما">استخدم <code>ring</code> عندما…</h3>
<ul>
<li>تحتاج إلى تكديس عدة تأثيرات بصرية.</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,p as html,e as slug,t as title};
