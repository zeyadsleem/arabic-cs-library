const s="hello-algo",a="chapter_array_and_linkedlist",n="Arrays and Linked Lists",t="array",l="المصفوفة",p=[{depth:2,id:"عمليات-المصفوفة-الشائعة",text:"عمليات المصفوفة الشائعة"},{depth:3,id:"تهيئة-المصفوفات",text:"تهيئة المصفوفات"},{depth:3,id:"اجتياز-المصفوفات",text:"اجتياز المصفوفات"},{depth:2,id:"التطبيقات-النموذجية-للمصفوفات",text:"التطبيقات النموذجية للمصفوفات"}],e=`<p><u>المصفوفة</u> (array) بنية بيانات خطية تخزّن عناصر من النوع نفسه في مساحة ذاكرة متجاورة. ويُسمى موضع العنصر في المصفوفة <u>فهرس</u> العنصر. ويوضح الشكل أدناه المفاهيم الرئيسية للمصفوفات وطريقة تخزينها.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--array_definition.png" alt="تعريف المصفوفة وطريقة تخزينها"></p>
<h2 id="عمليات-المصفوفة-الشائعة">عمليات المصفوفة الشائعة</h2>
<h3 id="تهيئة-المصفوفات">تهيئة المصفوفات</h3>
<p>يمكننا الاختيار بين طريقتين لتهيئة المصفوفة حسب حاجتنا: مع قيم أولية أو دونها. وعندما لا تُحدَّد قيم أولية، تهيّئ معظم لغات البرمجة عناصر المصفوفة إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize array</span>
arr: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">0</span>] * <span class="hljs-number">5</span>  <span class="hljs-comment"># [ 0, 0, 0, 0, 0 ]</span>
nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>]
</code></pre>
</div>
### الوصول إلى العناصر
<p>تُخزَّن عناصر المصفوفة في مساحة ذاكرة متجاورة، مما يعني أن حساب العنوان في الذاكرة لعناصر المصفوفة سهل للغاية. وبمعرفة عنوان المصفوفة في الذاكرة (عنوان أول عنصر فيها) وفهرس العنصر، يمكننا استخدام الصيغة الموضحة في الشكل أدناه لحساب عنوان العنصر في الذاكرة والوصول إليه مباشرةً.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--array_memory_location_calculation.png" alt="حساب العنوان في الذاكرة لعناصر المصفوفة"></p>
<p>وبمراقبة الشكل أعلاه، نجد أن فهرس أول عنصر في المصفوفة هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>، وهو ما قد يبدو مخالفاً للحدس لأن العدّ من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> أكثر طبيعية. غير أنه من منظور صيغة حساب العنوان، <strong>ليس الفهرس في جوهره سوى إزاحة عن العنوان في الذاكرة</strong>. وإزاحة عنوان العنصر الأول هي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>، فمن المنطقي أن يكون فهرسه <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>.</p>
<p>والوصول إلى عناصر المصفوفة عالي الكفاءة؛ إذ يمكننا الوصول العشوائي إلى أي عنصر في المصفوفة في زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_access</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]</span>) -&gt; <span class="hljs-built_in">int</span>:
    <span class="hljs-string">&quot;&quot;&quot;وصول إلى عنصر عند فهرس عشوائي&quot;&quot;&quot;</span>
    <span class="hljs-comment"># اختر عددًا عشوائيًا في النطاق [0, len(nums)-1]</span>
    random_index = random.randint(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>)
    <span class="hljs-comment"># احصل على العنصر المختار عشوائيًا وأعده</span>
    random_num = nums[random_index]
    <span class="hljs-keyword">return</span> random_num
</code></pre>
</div>
### إدراج العناصر
<p>تتراصّ عناصر المصفوفة معاً بإحكام في الذاكرة، ولا توجد مساحة إضافية بينها لبيانات أخرى. وكما يوضح الشكل أدناه، إذا أردنا إدراج عنصر في منتصف المصفوفة، فعلينا إزاحة جميع العناصر اللاحقة موضعاً واحداً إلى اليمين ثم إسناد القيمة عند ذلك الفهرس.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--array_insert_element.png" alt="مثال على إدراج عنصر في مصفوفة"></p>
<p>وجدير بالذكر أنه بما أن طول المصفوفة ثابت، فسيؤدي إدراج عنصر حتماً إلى دفع العنصر الأخير خارج المصفوفة. وسنترك حل هذه المشكلة لمناقشته في فصل «القائمة».</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], num: <span class="hljs-built_in">int</span>, index: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;إدراج العنصر num عند الفهرس \`index\` في المصفوفة&quot;&quot;&quot;</span>
    <span class="hljs-comment"># أزح كل العناصر من الفهرس \`index\` وما بعده موضعًا واحدًا إلى اليمين</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>, index, -<span class="hljs-number">1</span>):
        nums[i] = nums[i - <span class="hljs-number">1</span>]
    <span class="hljs-comment"># أسند num إلى العنصر عند الفهرس \`index\`</span>
    nums[index] = num
</code></pre>
</div>
### حذف العناصر
<p>وبالمثل، وكما يوضح الشكل أدناه، لحذف العنصر عند الفهرس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>، علينا إزاحة جميع العناصر بعد الفهرس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> موضعاً واحداً إلى الأمام.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--array_remove_element.png" alt="مثال على حذف عنصر من مصفوفة"></p>
<p>لاحظ أنه بعد اكتمال الحذف لم يعد للعنصر الأخير الأصلي معنى، لذا لا حاجة إلى تعديله صراحةً.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], index: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;حذف العنصر عند الفهرس \`index\`&quot;&quot;&quot;</span>
    <span class="hljs-comment"># أزح كل العناصر بعد الفهرس \`index\` موضعًا واحدًا إلى اليسار</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(index, <span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>):
        nums[i] = nums[i + <span class="hljs-number">1</span>]
</code></pre>
</div>
إجمالاً، لعمليتي الإدراج والحذف في المصفوفة العيوب التالية:
<ul>
<li><strong>تعقيد زمني مرتفع</strong>: متوسط التعقيد الزمني للإدراج والحذف في المصفوفة معاً هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> طول المصفوفة.</li>
<li><strong>فقدان العناصر</strong>: بما أن طول المصفوفة غير قابل للتغيير، فبعد إدراج عنصر ستُفقد العناصر التي تتجاوز طول المصفوفة.</li>
<li><strong>تبذير في الذاكرة</strong>: يمكننا تهيئة مصفوفة طويلة نسبياً واستخدام الجزء الأمامي منها فقط، فتصبح أي عناصر ذيلية تُستبدل مجرد حجوزات غير مستخدمة، لكن هذا يهدر بعض المساحة الذاكرية.</li>
</ul>
<h3 id="اجتياز-المصفوفات">اجتياز المصفوفات</h3>
<p>في معظم لغات البرمجة، يمكننا اجتياز المصفوفة إما بالفهرس وإما بالتكرار المباشر على كل عنصر في المصفوفة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">traverse</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]</span>):
    <span class="hljs-string">&quot;&quot;&quot;اجتز المصفوفة&quot;&quot;&quot;</span>
    count = <span class="hljs-number">0</span>
    <span class="hljs-comment"># اجتز المصفوفة بالفهرس</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums)):
        count += nums[i]
    <span class="hljs-comment"># تكرّر مباشرةً على عناصر المصفوفة</span>
    <span class="hljs-keyword">for</span> num <span class="hljs-keyword">in</span> nums:
        count += num
    <span class="hljs-comment"># تكرّر على الفهارس والعناصر معًا</span>
    <span class="hljs-keyword">for</span> i, num <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(nums):
        count += nums[i]
        count += num
</code></pre>
</div>
### البحث عن العناصر
<p>يتطلب البحث عن عنصر محدد في المصفوفة اجتيازها والتحقق في كل تكرار مما إذا كانت قيمة العنصر مطابقة؛ فإن تطابقت، أخرج الفهرس المقابل.</p>
<p>وبما أن المصفوفة بنية بيانات خطية، تُسمى عملية البحث أعلاه «البحث الخطي».</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">find</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], target: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
    <span class="hljs-string">&quot;&quot;&quot;البحث عن عنصر محدد في المصفوفة&quot;&quot;&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums)):
        <span class="hljs-keyword">if</span> nums[i] == target:
            <span class="hljs-keyword">return</span> i
    <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>
</code></pre>
</div>
### توسيع المصفوفات
<p>في بيئات الأنظمة المعقّدة، لا تستطيع البرامج ضمان توفر مساحة الذاكرة بعد المصفوفة، مما يجعل توسيع سعة المصفوفة غير آمن. لذلك، في معظم لغات البرمجة، <strong>طول المصفوفة غير قابل للتغيير</strong>.</p>
<p>وإذا أردنا توسيع مصفوفة، فعلينا إنشاء مصفوفة جديدة أكبر ثم نسخ عناصر المصفوفة الأصلية إلى المصفوفة الجديدة عنصراً عنصراً. وهذه عملية بتعقيد <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، وتستهلك وقتاً طويلاً عندما تكون المصفوفة كبيرة. وتظهر الشيفرة أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-comment"># لاحظ أن قائمة Python مصفوفة ديناميكية يمكن مدّها مباشرةً</span>
<span class="hljs-comment"># لأغراض التعلم، تعامل هذه الدالة مع القائمة بوصفها مصفوفة ثابتة الطول</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">extend</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], enlarge: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
    <span class="hljs-string">&quot;&quot;&quot;مدّ طول المصفوفة&quot;&quot;&quot;</span>
    <span class="hljs-comment"># مهّد مصفوفة بالطول الممدود</span>
    res = [<span class="hljs-number">0</span>] * (<span class="hljs-built_in">len</span>(nums) + enlarge)
    <span class="hljs-comment"># انسخ كل العناصر من المصفوفة الأصلية إلى المصفوفة الجديدة</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums)):
        res[i] = nums[i]
    <span class="hljs-comment"># أعد المصفوفة الجديدة الممدودة</span>
    <span class="hljs-keyword">return</span> res
</code></pre>
</div>
## مزايا المصفوفات وحدودها
<p>تُخزَّن المصفوفات في مساحة ذاكرة متجاورة بعناصر من النوع نفسه. ويحتوي هذا الأسلوب على معلومات مسبقة غنية يمكن للنظام استخدامها لتحسين كفاءة عمليات بنى البيانات.</p>
<ul>
<li><strong>كفاءة مكانية عالية</strong>: تخصص المصفوفات كتل ذاكرة متجاورة للبيانات دون عبء بنيوي إضافي.</li>
<li><strong>دعم الوصول العشوائي</strong>: تتيح المصفوفات الوصول إلى أي عنصر في زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>محلية ذاكرة التخزين المؤقت (cache locality)</strong>: عند الوصول إلى عناصر المصفوفة، لا يحمّل الحاسوب العنصر فحسب، بل يخزّن البيانات المحيطة في ذاكرة التخزين المؤقت أيضاً، مستفيداً بذلك من الذاكرة المؤقتة لتحسين سرعة تنفيذ العمليات اللاحقة.</li>
</ul>
<p>وتخزين البيانات في مساحة متجاورة سلاح ذو حدين، وله الحدود التالية:</p>
<ul>
<li><strong>كفاءة منخفضة في الإدراج والحذف</strong>: عندما تحتوي المصفوفة على عناصر كثيرة، تتطلب عمليتا الإدراج والحذف إزاحة عدد كبير من العناصر.</li>
<li><strong>طول غير قابل للتغيير</strong>: بعد تهيئة المصفوفة يكون طولها ثابتاً. ويتطلب توسيع المصفوفة نسخ جميع البيانات إلى مصفوفة جديدة، وهو أمر مكلف جداً.</li>
<li><strong>تبذير في المساحة</strong>: إذا تجاوز الحجم المخصص للمصفوفة الحاجة الفعلية، تُهدر المساحة الزائدة.</li>
</ul>
<h2 id="التطبيقات-النموذجية-للمصفوفات">التطبيقات النموذجية للمصفوفات</h2>
<p>المصفوفات بنية بيانات أساسية وشائعة، وتُستخدم كثيراً في خوارزميات متنوعة وفي تنفيذ بنى بيانات معقّدة مختلفة.</p>
<ul>
<li><strong>الوصول العشوائي</strong>: إذا أردنا أخذ عينات عشوائية من بعض العناصر، يمكننا استخدام مصفوفة لتخزينها وتوليد متتابعة عشوائية لتنفيذ أخذ العينات العشوائي استناداً إلى الفهارس.</li>
<li><strong>الترتيب والبحث</strong>: المصفوفات هي بنية البيانات الأكثر استخداماً في خوارزميات الترتيب والبحث. فالترتيب السريع والترتيب بالدمج والبحث الثنائي وغيرها تُجرى أساساً على المصفوفات.</li>
<li><strong>جداول البحث</strong>: عندما نحتاج إلى العثور بسرعة على عنصر أو على علاقته المقابلة، يمكننا استخدام مصفوفة كجدول بحث. فمثلاً إذا أردنا تنفيذ إسقاط من المحارف إلى رموز ASCII، يمكننا استخدام قيمة رمز ASCII للمحرف كفهرس، مع تخزين العنصر المقابل في ذلك الموضع من المصفوفة.</li>
<li><strong>تعلّم الآلة</strong>: تستخدم الشبكات العصبية على نطاق واسع عمليات الجبر الخطي بين المتجهات والمصفوفات والموترات، وكلها تُبنى على هيئة مصفوفات. والمصفوفات هي بنية البيانات الأكثر استخداماً في برمجة الشبكات العصبية.</li>
<li><strong>تنفيذ بنى البيانات</strong>: يمكن استخدام المصفوفات لتنفيذ المكدسات والطوابير وجداول التجزئة والأكوام والرسوم البيانية وغيرها من بنى البيانات. فمثلاً تمثيل الرسم البياني بمصفوفة التجاور ليس في جوهره سوى مصفوفة ثنائية الأبعاد.</li>
</ul>
`,i={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,i as default,p as headings,e as html,t as slug,l as title};
