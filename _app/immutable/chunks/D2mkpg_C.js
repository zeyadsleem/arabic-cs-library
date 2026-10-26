const s="kinney",n="testing",a="مدخل إلى الاختبارات",p="asymmetric-matchers",t="المطابقات غير المتماثلة (asymmetric matchers)",e=[{depth:2,id:"بطريقة-أخرى",text:"بطريقة أخرى"},{depth:2,id:"طابق-ما-يهم-فقط-باستخدام-expectobjectcontaining",text:"طابق ما يهم فقط باستخدام expect.objectContaining"},{depth:2,id:"لا-نقلق-على-كل-عنصر-expectarraycontaining",text:"لا نقلق على كل عنصر: expect.arrayContaining"},{depth:2,id:"البحث-عن-الإبرة-في-كومة-القش-expectstringmatching",text:"البحث عن الإبرة في كومة القش: expect.stringMatching"},{depth:2,id:"متى-تستخدم-المطابقات-غير-المتماثلة",text:"متى تستخدم المطابقات غير المتماثلة"},{depth:2,id:"متى-لا-تستخدمها",text:"متى لا تستخدمها"},{depth:2,id:"مثال-أكثر-عملية",text:"مثال أكثر عملية"}],l=`<p>لماذا تُسمى المطابقات غير المتماثلة؟ لا أعرف. لكن هذه تسمية <a href="https://jestjs.io/docs/expect#asymmetric-matchers">توثيق Jest لها</a>، لذا سأسميها كذلك. (توثيق Vitest لا يسميها شيئًا بعينه.)</p>
<p>إليك رأيان من آرائي <em>الكثيرة</em> الحارة حول الاختبار:</p>
<ul>
<li>الاختبارات موجودة فقط لتمنحنا الثقة بأننا نستطيع إجراء تغييرات في قاعدة شيفرتنا — كبيرة أو صغيرة — دون كسر الأشياء عن غير قصد.</li>
<li>الاختبارات التي تكون أكثر إزعاجًا مما هي مفيدة ستؤدي بك وبفريقك إلى حذفها و/أو التخلي عن الاختبار.</li>
</ul>
<p>قال وينستون تشرشل إن «الكمال عدو التقدم». وهذا صحيح إلى حد ما في اختباراتنا. اختباراتنا موجودة لتمنحنا الثقة بأننا نستطيع تغيير شيفرتنا. فإذا صارت جامدة جدًا (أو هشة)، تميل إلى إبطائنا أكثر مما تسرّعنا.</p>
<p>ثانيًا، عندما يفشل اختبار، سيكون من الجميل أن يكون الفشل مركّزًا بالليزر على ما ذهب خطأ. قد يكسر تغيير صغير مجموعة اختبارات كاملة. وقد يكون ذلك عشرات أو حتى مئات الاختبارات. حظًا موفقًا في تتبع الجاني بدقة.</p>
<p>تأمل لحظة صنف <code>Person</code> هذا من <code>examples/characters/person.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { v4 <span class="hljs-keyword">as</span> id } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;uuid&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">firstName, lastName</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">id</span> = <span class="hljs-string">&#x27;person-&#x27;</span> + <span class="hljs-title function_">id</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">firstName</span> = firstName;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastName</span> = lastName;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">fullName</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.firstName}</span> <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.lastName}</span>\`</span>;
  }
}
</code></pre>
<p>تولّد مكتبة <a href="https://npm.im/uuid"><code>uuid</code></a> معرّفًا عشوائيًا في كل مرة. صحيح، ثمة طرق للالتفاف على هذا — المحاكاة وما شابه، وسنتحدث عنها لاحقًا. لكن عمومًا، لا يهمنا المعرّف <code>id</code> حقًا.</p>
<p>لنفترض أننا نهتم فقط بأنهم رائعون وأن لديهم اسمًا أول واسمًا أخير من نوع نصي. (أعلم أن لدينا TypeScript، لكنني أحاول توضيح فكرة هنا.)</p>
<p>هذا الاختبار حسن النية سيفشل:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a person with a first name and last name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>, <span class="hljs-string">&#x27;Hopper&#x27;</span>);
  <span class="hljs-title function_">expect</span>(person).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Grace&#x27;</span>, <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;Hopper&#x27;</span> });
});
</code></pre>
<p><img src="/arabic-cs-library/images/kinney/49f19940ace6abae.webp" alt="يفشل الاختبار بسبب معرّف عشوائي."></p>
<p>لا يهمنا حقًا ما هو <code>id</code>، لكن ربما نريد التأكد من وجود <code>id</code> وأنه نصي.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a person with a first name and last name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>, <span class="hljs-string">&#x27;Hopper&#x27;</span>);
  <span class="hljs-title function_">expect</span>(person).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">String</span>),
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Grace&#x27;</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;Hopper&#x27;</span>,
  });
});
</code></pre>
<p>يمكننا حتى التأكد من أن النص يطابق نمطًا معينًا.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a person with a first name and last name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>, <span class="hljs-string">&#x27;Hopper&#x27;</span>);
  <span class="hljs-title function_">expect</span>(person).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">stringMatching</span>(<span class="hljs-regexp">/^person-/</span>),
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Grace&#x27;</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;Hopper&#x27;</span>,
  });
});
</code></pre>
<h2 id="بطريقة-أخرى">بطريقة أخرى</h2>
<p>تخيّل المطابقات غير المتماثلة كذاك الصديق المرتاح لفكرة «قريب بما يكفي». وعلى خلاف المطابقات العادية (التي تتوقع تطابقًا <strong>تامًا</strong>)، تتيح لك المطابقات غير المتماثلة تحديد الأجزاء التي <strong>تهمك</strong> وتجاهل الباقي. إنها أقل صرامة وأكثر تسامحًا — وأحيانًا يكون ذلك بالضبط ما تحتاجه.</p>
<p>إليك الأمر الكبير: المطابقات غير المتماثلة تهتم بجانب واحد فقط من المقارنة. فهي لا تقارن القيمة الفعلية بنتيجة متوقعة محددة؛ بل تقول: «حسنًا، سأتحقق فقط مما إذا كان هذا يستوفي شروطي، ولا يلزم أن يطابق الشيء كله تمامًا».</p>
<h2 id="طابق-ما-يهم-فقط-باستخدام-expectobjectcontaining">طابق ما يهم فقط باستخدام <code>expect.objectContaining</code></h2>
<p>لديك كائن ضخم يعيد كل أنواع البيانات الإضافية، لكنك تهتم بخصائص قليلة فقط؟ ممتاز، <code>objectContaining</code> صديقك.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> strongestAvenger = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Thor Odinson&#x27;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">1500</span>,
  <span class="hljs-attr">weapon</span>: <span class="hljs-string">&#x27;Stormbreaker&#x27;</span>,
  <span class="hljs-attr">occupation</span>: <span class="hljs-string">&#x27;God of Thunder&#x27;</span>,
};

<span class="hljs-title function_">expect</span>(strongestAvenger).<span class="hljs-title function_">toEqual</span>(
  expect.<span class="hljs-title function_">objectContaining</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Thor Odinson&#x27;</span>,
    <span class="hljs-attr">weapon</span>: <span class="hljs-string">&#x27;Stormbreaker&#x27;</span>,
  }),
);
</code></pre>
<p>رغم أن الكائن الأصلي يحوي <code>age</code> و<code>occupation</code>، فإننا نهتم فقط باسمه وسلاحه المفضل. يتيح لنا استدعاء <code>objectContaining</code> أن نكون محددين بشأن الأجزاء المهمة ونتجاهل الباقي (لأنه، بصراحة، كم شخصية نحتاج على الشاشة، أليس كذلك؟).</p>
<blockquote>
<p><strong>تمرين</strong></p>
<p>هل يمكنك إعادة هيكلة اختبار منشئ الشخص للتأكد فقط من أن لديه الاسم الأول والأخير الصحيحين باستخدام <code>expect.objectContaining</code>؟</p>
</blockquote>
<h2 id="لا-نقلق-على-كل-عنصر-expectarraycontaining">لا نقلق على كل عنصر: <code>expect.arrayContaining</code></h2>
<p>فبعد إطلاق ميزة جديدة مباشرة، لا تعيد واجهة API لديك ما توقعته بالضبط. ربما انزلق حقل جديد عشوائيًا إلى الموضع الثاني. حسنًا، <code>arrayContaining</code> كأنه يقول: «مرحبًا، لا تقلق، ما دامت أشياؤك المهمة موجودة في مكان ما».</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> avengers = [<span class="hljs-string">&#x27;Iron Man&#x27;</span>, <span class="hljs-string">&#x27;Captain America&#x27;</span>, <span class="hljs-string">&#x27;Hulk&#x27;</span>, <span class="hljs-string">&#x27;Black Widow&#x27;</span>];

<span class="hljs-title function_">expect</span>(avengers).<span class="hljs-title function_">toEqual</span>(expect.<span class="hljs-title function_">arrayContaining</span>([<span class="hljs-string">&#x27;Hulk&#x27;</span>, <span class="hljs-string">&#x27;Captain America&#x27;</span>]));
</code></pre>
<p>لاحظ أننا لا نطابق التسلسل الدقيق ولا كل منتقم في تلك القائمة. نحن فقط نتأكد من ظهور Cap وHulk في مكان ما. إنه اختبار من نوع «ما داموا مدعوين إلى الحفلة».</p>
<h2 id="البحث-عن-الإبرة-في-كومة-القش-expectstringmatching">البحث عن الإبرة في كومة القش: <code>expect.stringMatching</code></h2>
<p>هل صادفت نصًا مثل رسالة خطأ أو بعض مدخلات المستخدم حيث لا تعرف الصياغة الدقيقة، لكنك واثق إلى حد كبير من انتمائه؟ مرحبًا بك في <code>stringMatching</code>. باستخدام التعبيرات النمطية (نعم، تلك <em>الشعوذة</em> المحبوبة لدى المطورين والمخيفة لدى الصيّانين مستقبلًا)، يمكنك التحقق مما إذا كانت رسالة السجل أو نص المخرجات لديك تستوفي الفحص العام.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> logMessage = <span class="hljs-string">&#x27;User admin123 successfully logged in at 12:30 AM&#x27;</span>;

<span class="hljs-title function_">expect</span>(logMessage).<span class="hljs-title function_">toEqual</span>(expect.<span class="hljs-title function_">stringMatching</span>(<span class="hljs-regexp">/admin\\d+/</span>));
</code></pre>
<p>لا يهمنا إن كان <code>admin123</code> أو <code>admin456</code> أو <code>adminGoPats</code>. ما دام <code>admin</code> متبوعًا ببعض الأرقام، فلا بأس. مثالي لتلك السجلات غير المتوقعة. التعبيرات النمطية تنقذ الموقف.</p>
<h2 id="متى-تستخدم-المطابقات-غير-المتماثلة">متى تستخدم المطابقات غير المتماثلة</h2>
<p>إذن متى تستخدمها؟ إليك النصيحة الاحترافية: عندما <strong>لا تهم التطابقات التامة</strong>. تريد استخدام المطابقات غير المتماثلة عندما:</p>
<ul>
<li>تريد مرونة مع بيانات الاختبار.</li>
<li>تتعامل مع حقول غير متوقعة قد تتغير رتبتها، أو تحوي قيمًا إضافية، أو محتوى متغيرًا.</li>
<li>تهتم بجزء محدد فقط من استجابة صاخبة لولا ذلك.</li>
</ul>
<p>لنكن صادقين، كمطورين، نعيش في عالم تتغير فيه واجهات API، وتلتقط فيه بنى الكائنات حقولًا عشوائية، ولا يبدو أن المصفوفات تستقر على سلوك طويل الأمد. الحفاظ على نجاح اختباراتك دون التضحية بالشمولية هو المفتاح.</p>
<h2 id="متى-لا-تستخدمها">متى <em>لا</em> تستخدمها</h2>
<p>استخدم المطابقات غير المتماثلة باعتدال. فقد تكون منحدرًا زلقًا. لا تريد أن ينتهي بك الأمر بكل اختبار مرن لدرجة أنه بلا معنى عمليًا. احتفظ بهذه المطابقات للحالات التي لا يقدم فيها التطابق التام قيمة كبيرة ويكتفي بملء اختباراتك بالفوضى.</p>
<p>إن كنت تهتم بكل خاصية وقيمة، فامضِ واستخدم <code>toEqual</code> أو <code>toBe</code> كمطابق عادي. لكن عندما تكون الحوض كله كريه الرائحة ولا يهمك إلا أن الصنبور يعمل، فـ <strong>المطابقات غير المتماثلة</strong> هي الطريق.</p>
<h2 id="مثال-أكثر-عملية">مثال أكثر عملية</h2>
<p>وهذا سحر المطابقات غير المتماثلة. الآن، انطلق واكتب اختبارات تتنفس! أبقِها محددة بشأن ما يهم، لكن ليس لدرجة أن تفشل اختباراتك بسبب ارتداء قلنسوة بلون خاطئ.</p>
<p>هذا كله جيد ومفيد مع أمثلة صغيرة سهلة الفهم، لكن لنلقِ نظرة سريعة على <a href="https://stevekinney.com/courses/testing/asymmetric-matching-example">مثال</a>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,p as slug,t as title};
