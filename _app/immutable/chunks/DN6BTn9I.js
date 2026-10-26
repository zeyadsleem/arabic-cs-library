const s="kinney",a="tailwind",n="Tailwind CSS",t="form-improvements",l="مزيد من تحسينات النماذج",e=[{depth:2,id:"تحسين-حالات-التركيز-بالحلقات",text:"تحسين حالات التركيز بالحلقات"},{depth:2,id:"تنسيق-النص-النائب",text:"تنسيق النص النائب"},{depth:2,id:"تخصيص-مؤشر-النص",text:"تخصيص مؤشر النص"},{depth:2,id:"حالات-التحقق",text:"حالات التحقق"},{depth:2,id:"تغذية-الحالة-الصحيحة",text:"تغذية الحالة الصحيحة"},{depth:2,id:"الحالات-المعطلة-وتغذية-المؤشر",text:"الحالات المعطّلة وتغذية المؤشر"},{depth:2,id:"ألوان-تمييز-مربعات-الاختيار-وأزرار-الاختيار",text:"ألوان تمييز مربعات الاختيار وأزرار الاختيار"},{depth:2,id:"مثال-الإدخال-المعزز-الكامل",text:"مثال الإدخال المعزّز الكامل"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"}],p=`<p>بعد أن بنينا أساسًا متينًا لحقول النماذج لدينا، لنستكشف بعض تقنيات التنسيق المتقدمة التي يمكن أن ترفع تجربة المستخدم أكثر. سنبني على مكوّن الإدخال الذي أنشأناه، مضيفين الصقل والتفاعلية مع الحفاظ على إمكانية الوصول.</p>
<h2 id="تحسين-حالات-التركيز-بالحلقات">تحسين حالات التركيز بالحلقات</h2>
<p>في درسنا السابق، استخدمنا المحيطات لحالات التركيز. لنعزّز هذا النهج بدمج المحيطات مع أدوات الحلقة لمؤشرات تركيز أكثر بروزًا.</p>
<p><em>تحسين حالات التركيز بالحلقات — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/5bf1034e8ec3eb4d333f55b68a6d44ffb7bdcd5a54bf7305a1f2a8d579a65075.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm/6 font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;johndoe&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الإضافة الأساسية هنا هي <code>focus:ring-4 focus:ring-indigo-600/40</code>:</p>
<ul>
<li><code>focus:ring-4</code>: ينشئ حلقة بسماكة 4px حول الحقل عند التركيز</li>
<li><code>focus:ring-indigo-600/40</code>: يستخدم لون النيلي نفسه للمحيط، لكن بعتامة 10%</li>
</ul>
<p>ينشئ هذا تأثير توهج خفيف يمتد خارج المحيط، ما يجعل حالة التركيز أكثر بروزًا مع الحفاظ على التماسك البصري.</p>
<h2 id="تنسيق-النص-النائب">تنسيق النص النائب</h2>
<p>قد يبدو النص النائب الافتراضي منفصلًا عن نظام تصميمك. لنجعله أكثر قصدًا:</p>
<p><em>تنسيق النص النائب — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/a82b3fd067cffe9865c993d5e34fec0a5d4e01278b9da518e666d9d256e5e325.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
  <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6&quot;</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your username...&quot;</span>
/&gt;</span>
</code></pre>
<p>عزّزنا النص النائب بما يلي:</p>
<ul>
<li><code>placeholder:text-slate-400</code>: لون رمادي فاتح لا ينافس نص الإدخال الفعلي</li>
<li><code>placeholder:italic</code>: نمط مائل خفيف لتمييز النص النائب عن المحتوى الحقيقي</li>
</ul>
<p>يساعد النمط المائل المستخدمين على التمييز بين النص النائب وقيم الإدخال الفعلية، وهو مفيد بشكل خاص للمستخدمين ذوي الإعاقات الإدراكية.</p>
<h2 id="تخصيص-مؤشر-النص">تخصيص مؤشر النص</h2>
<p>يمكن تنسيق مؤشر النص الافتراضي (caret) ليطابق ألوان علامتك:</p>
<p><em>تخصيص مؤشر النص — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/e941da8109b50109e129b7b30858c77195fde16fa767378f6fe959a3e4cb559e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
  <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6&quot;</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your username...&quot;</span>
/&gt;</span>
</code></pre>
<p>يغيّر الصنف <code>caret-indigo-600</code> مؤشر النص الوامض ليطابق لون التركيز، ما ينشئ تجربة متكاملة عندما يكتب المستخدمون فعليًا.</p>
<h2 id="حالات-التحقق">حالات التحقق</h2>
<p>تحتاج النماذج الواقعية إلى إبلاغ حالة التحقق بوضوح. لنضف دعمًا للحالات الصحيحة وغير الصحيحة:</p>
<p><em>حالات التحقق — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/38843150110dfa40affe0c18de8bf53b9c99b6381b49f582d868e419dd43e640.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Invalid state --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm/6 font-medium text-slate-900&quot;</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your email...&quot;</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;invalid-email&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق الحالة غير الصحيحة:</p>
<ul>
<li><code>invalid:outline-red-500</code>: محيط أحمر عندما يفشل تحقق HTML5</li>
<li><code>invalid:text-red-900</code>: نص أحمر غامق لحالة الخطأ</li>
<li><code>invalid:placeholder:text-red-300</code>: أحمر أفتح للنص النائب في حالة الخطأ</li>
</ul>
<p>يستفيد هذا من التحقق المدمج في HTML5، فيطبّق أنماط الخطأ تلقائيًا عندما لا يطابق الإدخال النمط المتوقع.</p>
<h2 id="تغذية-الحالة-الصحيحة">تغذية الحالة الصحيحة</h2>
<p>للتعزيز الإيجابي، يمكننا أيضًا تنسيق الحقول الصحيحة:</p>
<p><em>تغذية الحالة الصحيحة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/647d10bfe02bf273c97a0dda9c853c61afe6cc0577fdcfb3da3be91b4f5f01e8.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
  <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
  <span class="hljs-attr">required</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic valid:outline-green-500 invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6&quot;</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your email...&quot;</span>
  <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;user@example.com&quot;</span>
/&gt;</span>
</code></pre>
<p>يوفّر <code>valid:outline-green-500</code> تغذية إيجابية فورية عندما يدخل المستخدمون بيانات صحيحة، ما يشجّع على استمرار التفاعل.</p>
<h2 id="الحالات-المعطلة-وتغذية-المؤشر">الحالات المعطّلة وتغذية المؤشر</h2>
<p>تحتاج الحقول المعطّلة إلى مؤشرات بصرية واضحة وسلوك مؤشر مناسب:</p>
<p><em>الحالات المعطّلة وتغذية المؤشر — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/e79d351ff3207ba47b66e5e798da6cc6c70e29386c8072f1770dc2ffd8691240.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;readonly-field&quot;</span>
  <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;readonly-field&quot;</span>
  <span class="hljs-attr">disabled</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:outline-slate-200 sm:text-sm/6&quot;</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;This field is disabled&quot;</span>
/&gt;</span>
</code></pre>
<p>تنسيق الحالة المعطّلة:</p>
<ul>
<li><code>disabled:bg-slate-50</code>: خلفية رمادية فاتحة تدل على عدم التوفّر</li>
<li><code>disabled:text-slate-500</code>: لون نص باهت</li>
<li><code>disabled:outline-slate-200</code>: محيط فاتح جدًا لوزن بصري أدنى</li>
<li><code>disabled:cursor-not-allowed</code>: يُظهر مؤشر «غير مسموح» عند التحويم</li>
</ul>
<h2 id="ألوان-تمييز-مربعات-الاختيار-وأزرار-الاختيار">ألوان تمييز مربعات الاختيار وأزرار الاختيار</h2>
<p>يمكن أيضًا أن تطابق عناصر تحكم النماذج مثل مربعات الاختيار وأزرار الاختيار نظام تصميمك:</p>
<p><em>ألوان تمييز مربعات الاختيار وأزرار الاختيار — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/9316af6aa1504f35a2e2f5b8ea850b994591b751d181913ca7f53cf02d113897.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;newsletter&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;newsletter&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4 accent-pink-500&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;newsletter&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-900&quot;</span>&gt;</span>Sign Up for Spam<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;option1&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;choice&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option1&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4 accent-pink-500&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;option1&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-900&quot;</span>&gt;</span>The Only Option<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ينسّق الصنف <code>accent-indigo-600</code> حالة التفعيل/التحديد لعناصر تحكم النماذج لتطابق ألوان علامتك. وتضمن الأصناف <code>h-4 w-4</code> حجمًا متسقًا عبر المتصفحات المختلفة.</p>
<h2 id="مثال-الإدخال-المعزز-الكامل">مثال الإدخال المعزّز الكامل</h2>
<p>إليك حقل الإدخال المعزّز بالكامل مع جميع التحسينات:</p>
<p><em>مثال الإدخال المعزّز الكامل — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/c7eef6528c0111d7594a9f81f1f55133f4e0b731e0dee089fa9ead84fb5782a0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;enhanced-input&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm/6 font-medium text-slate-900&quot;</span>&gt;</span>
    Enhanced Input
  <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;enhanced-input&quot;</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;enhanced-input&quot;</span>
      <span class="hljs-attr">required</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic valid:outline-green-500 invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:outline-slate-200 sm:text-sm/6&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your email address...&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تضيف تحسينات التنسيق هذه عبئًا ضئيلًا لأنها تستفيد من الفئات الزائفة في CSS ولا تتطلب JavaScript. توفّر الفئات الزائفة <code>:invalid</code> و<code>:valid</code> وظائف كانت ستتطلب بخلاف ذلك نصوص تحقق مخصصة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
