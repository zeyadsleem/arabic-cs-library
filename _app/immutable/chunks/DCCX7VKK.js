const s="effective-go",n="formatting",e="التنسيق",o="index",a="التنسيق",t=[],c=`<p>مشاكل التنسيق هي الأكثر إثارةً للجدل، والأقل أثرًا. يستطيع الناس أن يتألفوا مع أنماط تنسيق مختلفة، لكن الأفضل ألا يضطروا إلى ذلك، وأن يُقتطع من وقتهم أقل في هذا الموضوع إذا التزم الجميع بأسلوب واحد. المشكلة هي كيفية بلوغ هذه يوتوبيا دون أن نكتب دليل أسلوب طويلًا ومفصلًا.</p>
<p>في Go اتُّخذ مسار غير معتاد: نترك الآلة تتولّى معظم مشكلات التنسيق. برنامج <a href="https://pkg.go.dev/cmd/gofmt"><code>gofmt</code></a> — المتاح أيضًا باسم <code>go fmt</code>، وهو يعمل على مستوى الحزمة لا على مستوى ملف المصدر — يقرأ برنامج Go ويخرجه بأسلوب معياري من المسافات البادئة والمحاذاة الرأسية، مع الحفاظ على التعليقات، وإعادة تنسيقها عند الحاجة.</p>
<p>إن أردت أن تعرف كيف يتعامل <code>gofmt</code> مع تنسيق ما جديد، فشغّله؛ وإذا بدا لك الجواب غير صحيح، فأعد ترتيب برنامجك — أو بلّغ عن خلل فيه — بدلًا من الالتفاف حوله.</p>
<p>مثالًا، لا داعي لأن تقضي وقتًا في محاذاة التعليقات فوق حقول بنية (struct). يتولى <code>gofmt</code> ذلك عنك. فتعطى التصريح التالي:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> T <span class="hljs-keyword">struct</span> {
    name <span class="hljs-type">string</span> <span class="hljs-comment">// name of the object</span>
    value <span class="hljs-type">int</span> <span class="hljs-comment">// its value</span>
}
</code></pre>
<p>يَخرِج <code>gofmt</code> الأعمدة كما يلي:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> T <span class="hljs-keyword">struct</span> {
    name    <span class="hljs-type">string</span> <span class="hljs-comment">// name of the object</span>
    value   <span class="hljs-type">int</span>    <span class="hljs-comment">// its value</span>
}
</code></pre>
<p>كل شيفرة Go في الحزم القياسية مطبَّقة التنسيق بـ <code>gofmt</code>.</p>
<p>وتبقى بعض تفاصيل التنسيق. وبإيجاز شديد:</p>
<ul>
<li><strong>المسافة البادئة.</strong> نستخدم Tab للمسافة البادئة، ويُخرجه <code>gofmt</code> كذلك افتراضيًا. لا تستعمل المسافات إلا إذا اضطُررت.</li>
<li><strong>طول السطر.</strong> لا تضع Go حدًّا لطول السطر، فلا داعي للقلق من تجاوز حدّ بطاقة مثقوبة. إن بدا لك السطر طويلًا، فاطوِه وأضف Tab بادئة.</li>
<li><strong>الأقواس.</strong> تحتاج Go إلى أقواس أقل بكثير مما تحتاجه C وJava: فبنى التحكم — <code>if</code> و<code>for</code> و<code>switch</code> — لا تقواس في صياغتها. كما أن تسلسل أولويات المعاملات أقصر وأوضح، بحيث</li>
</ul>
<pre><code class="language-go">x&lt;&lt;<span class="hljs-number">8</span> + y&lt;&lt;<span class="hljs-number">16</span>
</code></pre>
<p>يعني ما توحي به المسافات، على خلاف اللغات الأخرى.</p>
`,p={book:s,chapter:n,chapterTitle:e,slug:o,title:a,headings:t,html:c};export{s as book,n as chapter,e as chapterTitle,p as default,t as headings,c as html,o as slug,a as title};
