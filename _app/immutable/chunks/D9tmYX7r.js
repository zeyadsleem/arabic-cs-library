const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",l="optional-parameters",e="المعاملات الاختيارية (Optional Parameters)",t=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"كيف-نعلن-عن-معامل-اختياري",text:"كيف نُعلن عن معاملٍ اختياري"},{depth:3,id:"المسار-الذي-ينشئه-هذا-الملف",text:"المسارُ الذي ينشئه هذا الملف"},{depth:3,id:"المعامل-الناقص-يعني-قيمة-غير-موجودة",text:"المعاملُ الناقص يعني قيمةً غير موجودة"},{depth:3,id:"الانتقال-إلى-المسار-بمعاملات-اختيارية",text:"الانتقالُ إلى المسار بمعاملات اختيارية"},{depth:3,id:"مبدل-اللغات-تغيير-معامل-واحد-دون-المساس-بالباقي",text:"مبدّلُ اللغات: تغييرُ معاملٍ واحدٍ دون المساس بالباقي"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق تعلّمنا المعاملات الديناميكية: نكتب <code>$postId</code> في اسم ملف المسار، فيلتقط الموجّه قيمةً من عنوان الصفحة. لكنّ ذلك المعامل كان إلزاميًّا، فلا يطابق المسارُ إلّا إذا حُضِر في الرابط.</p>
<p>في هذا الدرس نجعل بعض المعاملات اختيارية. خُذ مسارَ أرشيفٍ مثلًا: نريد لـ<code>/archive</code> وحدَه أن يعرض كلَّ ما في الأرشيف، وأن تقيّد <code>/archive/2024</code> الأرشيفَ بسنةٍ بعينها، و<code>/archive/2024/05</code> أرشيفَ شهرٍ، وأن يسبقه اختياريًّا رمزُ لغةٍ مثل <code>/fr/archive</code>. كلُّ هذه العناوين عنوانٌ واحدٌ في نظر المستخدم، ويخدمها ملفُ مسارٍ واحد.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="كيف-نعلن-عن-معامل-اختياري">كيف نُعلن عن معاملٍ اختياري</h3>
<p>المعاملُ الديناميكي يُكتب في اسم ملف المسار على هيئة <code>$name</code>. وجعلُه اختياريًّا يحتاج خطوتين: لفَّ الاسمَ بين أقواسٍ معقوفة، ووضعُ علامةِ ناقص قبل علامة الدولار. فتصير <code>{-$name}</code> بدل <code>$name</code>، فيعرف الموجّه أنّ غياب هذا المعامل جائزٌ لا خطأ.</p>
<p>ولأنّ الدرسَ السابق اعتمد تسميةَ الملفات بالطريقة المسطّحة، نجمع المعاملات الأربعة في ملفٍ واحد تفصل بين أجزائه نقاط:</p>
<ul>
<li><code>src/routes/{-$locale}.archive.{-$year}.{-$month}.{-$day}.tsx</code></li>
</ul>
<blockquote>
<p><strong>توضيح من عندي:</strong> الصيغةُ نفسها تصلح لو اخترتَ بدل النقاط مجلّداتٍ متداخلة تحمل الأسماءَ ذاتها، فكلُّ ما يُنجَز بالطريقة المسطّحة يمكن إنجازه بمجلّداتٍ أيضًا.</p>
</blockquote>
<h3 id="المسار-الذي-ينشئه-هذا-الملف">المسارُ الذي ينشئه هذا الملف</h3>
<p>هذه الشيفرةُ كاملةً كما هي في فرع الدرس:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">const</span> languages = [
  { <span class="hljs-attr">code</span>: <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;English&quot;</span> },
  { <span class="hljs-attr">code</span>: <span class="hljs-string">&quot;fr&quot;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Français&quot;</span> },
  { <span class="hljs-attr">code</span>: <span class="hljs-string">&quot;es&quot;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Español&quot;</span> },
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(
  <span class="hljs-string">&quot;/{-$locale}/archive/{-$year}/{-$month}/{-$day}&quot;</span>
)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { locale, year, day, month } = <span class="hljs-title class_">Route</span>.<span class="hljs-title function_">useParams</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/-$locale/archive/-$year/-$month/-$day&quot;!
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex gap-2 bg-amber-700 p-2 my-2&quot;</span>&gt;</span>
          {languages.map(({ code, name }) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
              <span class="hljs-attr">key</span>=<span class="hljs-string">{code}</span>
              <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/{-$locale}/archive/{-$year}/{-$month}/{-$day}&quot;</span>
              <span class="hljs-attr">params</span>=<span class="hljs-string">{(prev)</span> =&gt;</span> ({
                ...prev,
                locale: code === &quot;en&quot; ? undefined : code,
              })}
              className={
                locale === code || (!locale &amp;&amp; code === &quot;en&quot;) ? &quot;font-bold&quot; : &quot;&quot;
              }
            &gt;
              {name}
            <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Locale: {locale}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Year: {year}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Month: {month}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Day: {day}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وفيها ثلاثُ نقاطٍ تستحقّ التوقّف:</p>
<ol>
<li><strong>عنوانُ المسار</strong> في <code>createFileRoute</code> يحمل الصيغةَ نفسها التي في اسم الملف: <code>/{-$locale}/archive/{-$year}/{-$month}/{-$day}</code>.</li>
<li><strong><code>Route.useParams()</code></strong> تعيد المعاملات الأربعة، وكلُّها من نوع <code>string | undefined</code> لأنّها اختيارية.</li>
<li><strong>غيابُ اللغة</strong> ليس خطأً: إن لم تُمرَّر <code>locale</code> فاللغةُ المختارة هي الافتراضية، ولهذا تُبرز الشيفرةُ <code>English</code> في حالة غيابها.</li>
</ol>
<h3 id="المعامل-الناقص-يعني-قيمة-غير-موجودة">المعاملُ الناقص يعني قيمةً غير موجودة</h3>
<p>لأنّ المعاملات اختيارية، فإنّ حذفَ أيٍّ منها من عنوان الصفحة لا يُفقدنا الصفحة. جرّب في المتصفّح أن تفتح <code>archive/2024/05</code> ثم تحذفَ اليوم من العنوان: سيبقى المسارُ مطابقًا، وستأتي <code>day</code> بقيمة <code>undefined</code>. ولو حذفتَ السنة والشهر معًا لصار العنوان <code>archive</code> وحدَه، وتصبح <code>locale</code> و<code>year</code> و<code>month</code> و<code>day</code> كلُّها قيمًا غير موجودة.</p>
<p>ولهذا يجب التحقّقُ من وجود القيمة قبل أن تستعملها في أيّ عملٍ، كإرسالِ طلبٍ إلى الخادم مثلًا. منطقُ التطبيق هو الذي يقرّر معنى غياب المعامل: سنةٌ بلا شهرٍ قد تعني كلَّ أشهر السنة.</p>
<h3 id="الانتقال-إلى-المسار-بمعاملات-اختيارية">الانتقالُ إلى المسار بمعاملات اختيارية</h3>
<p>ولكي ننتقل إلى هذا المسار نستخدم مكوّن <code>Link</code> كما في الدرس السابق، ونمرّر المعاملاتَ في خاصية <code>params</code>. والصفحةُ الرئيسيةُ في فرع الدرس صارت كالتالي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-violet-500&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
        <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/{-$locale}/archive/{-$year}/{-$month}/{-$day}&quot;</span>
        <span class="hljs-attr">params</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">locale:</span> &quot;<span class="hljs-attr">fr</span>&quot;,
          <span class="hljs-attr">year:</span> &quot;<span class="hljs-attr">2009</span>&quot;,
        }}
      &gt;</span>
        Go to Archive
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ أنّنا لم نمرّر <code>month</code> ولا <code>day</code>، وهما معاملان اختياريان، فاكتفى الرابطُ بما مرّرناه. والنتيجةُ أن يبني العنوانُ من القطع التي مرّرناها فقط، فيصير <code>/fr/archive/2009</code>. أمّا لو مرّرتَ المعاملاتِ الأربعةَ جميعًا لبني العنوانُ كاملًا.</p>
<p>وقيمةُ كلِّ معاملٍ سلسلةٌ نصية: لو كتبتَ <code>year: 2009</code> بدل <code>year: &quot;2009&quot;</code> لأظهر المحرّرُ خطأً، لأنّ النوعَ المطلوب نصٌّ لا عدد.</p>
<h3 id="مبدل-اللغات-تغيير-معامل-واحد-دون-المساس-بالباقي">مبدّلُ اللغات: تغييرُ معاملٍ واحدٍ دون المساس بالباقي</h3>
<p>الأمانةُ في مبدّل اللغات أنّ تغييرُ اللغة يجب ألّا يبدّل التاريخَ الذي يعرضه المستخدم. ولهذا نقبل في <code>params</code> دالّةً بدل كائن: تستقبل المعاملاتَ الحالية وتعيد الجديدة. وهذا الجزءُ من الملف أعلاه:</p>
<pre><code class="language-tsx">          {languages.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">{ code, name }</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
              <span class="hljs-attr">key</span>=<span class="hljs-string">{code}</span>
              <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/{-$locale}/archive/{-$year}/{-$month}/{-$day}&quot;</span>
              <span class="hljs-attr">params</span>=<span class="hljs-string">{(prev)</span> =&gt;</span> ({
                ...prev,
                locale: code === &quot;en&quot; ? undefined : code,
              })}
              className={
                locale === code || (!locale &amp;&amp; code === &quot;en&quot;) ? &quot;font-bold&quot; : &quot;&quot;
              }
            &gt;
              {name}
            <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
          ))}
</code></pre>
<p>وفيه ثلاثُ نقاط:</p>
<ol>
<li><strong>الدالّةُ تستقبل المعاملاتَ السابقة</strong> في <code>prev</code>، والانتشارُ <code>...prev</code> يُبقي السنة والشهر واليوم كما هي.</li>
<li><strong>اللغةُ الافتراضية تُحذف من العنوان</strong>: حين تكون اللغةُ المختارة <code>English</code> نمرّر <code>undefined</code> في <code>locale</code>، فيغيب المعاملُ من العنوان تمامًا لأنّه اختياري.</li>
<li><strong>إبرازُ اللغة الحالية</strong> يعالج حالةَ الغياب أيضًا: الشرطُ <code>locale === code || (!locale &amp;&amp; code === &quot;en&quot;)</code> يجعل <code>English</code> غامقًا حين لا توجد <code>locale</code> في الرابط.</li>
</ol>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--optional-parameters--archive.png" alt="صفحةُ أرشيفٍ تعرض شريطَ تبديل اللغات فوق قيمِ السنة والشهر واليوم المأخوذة من الرابط"></p>
<p>في الصورة الصفحةُ على العنوان <code>archive/2024/05</code>: الشريطُ البرتقالي في الأعلى فيه <code>English</code> و<code>Français</code> و<code>Español</code>، و<code>English</code> وحده غامقٌ لأنّ <code>locale</code> غير موجودة في العنوان فهي اللغةُ الافتراضية. وتحته تُقرأ المعاملاتُ واحدًا واحدًا: <code>Locale</code> فارغ، و<code>Year</code> يساوي <code>2024</code>، و<code>Month</code> يساوي <code>05</code>، و<code>Day</code> فارغ. ولاحظ أنّ غياب <code>Day</code> لم يمنع مطابقةَ المسار، وأنّ الصفحةَ تظهر بالعنوان نفسه مهما كان عددُ المعاملات الغائبة.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>استنسخ مستودعَ الدورة وانتقل إلى فرع <code>optional-params</code>.</li>
<li>أنشئ الملف <code>src/routes/{-$locale}.archive.{-$year}.{-$month}.{-$day}.tsx</code> بالاستعانة بالشيفرة أعلاه.</li>
<li>شغّل <code>npm run dev</code> ثم افتح <code>archive</code> وحدَه، وتأكّد من ظهور الصفحة وأنّ كلَّ المعاملات فارغة.</li>
<li>افتح <code>archive/2024/05/17</code>، ثم احذف قطعًا من العنوان واحدًا واحدًا ولاحظ كيف يتحوّل كلُّ معاملٍ إلى <code>undefined</code> بينما يبقى المسارُ مطابقًا.</li>
<li>عد إلى الصفحة الرئيسية وأضف رابطًا آخر يمرّر <code>locale</code> وحدَه، ثم قارن العنوانَين الناتجين.</li>
<li>غيّر <code>year: &quot;2009&quot;</code> إلى <code>2009</code> ولاحظ خطأ المحرّر، ثم أعِده.</li>
<li>جرّب تغييرَ اللغة من الشريط البرتقالي ولاحظ أنّ السنة والشهر واليوم بقيت كما هي في العنوان، وأنّ اختيار <code>English</code> يزيل <code>locale</code> وحدَه.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=4160s">فيديو الدرس: Optional Parameters</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/optional-params">شيفرة الدرس: فرع optional-params</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Optional Parameters» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:t,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,o as html,l as slug,e as title};
