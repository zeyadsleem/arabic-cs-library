const s="hello-algo",n="chapter_array_and_linkedlist",a="المصفوفات والقوائم المترابطة",l="array",p="المصفوفة",t=[{depth:2,id:"عمليات-المصفوفة-الشائعة",text:"عمليات المصفوفة الشائعة"},{depth:3,id:"تهيئة-المصفوفات",text:"تهيئة المصفوفات"},{depth:3,id:"الوصول-إلى-العناصر",text:"الوصول إلى العناصر"},{depth:3,id:"إدراج-العناصر",text:"إدراج العناصر"},{depth:3,id:"حذف-العناصر",text:"حذف العناصر"},{depth:3,id:"اجتياز-المصفوفات",text:"اجتياز المصفوفات"},{depth:3,id:"البحث-عن-العناصر",text:"البحث عن العناصر"},{depth:3,id:"توسيع-المصفوفات",text:"توسيع المصفوفات"},{depth:2,id:"مزايا-المصفوفات-وحدودها",text:"مزايا المصفوفات وحدودها"},{depth:2,id:"التطبيقات-النموذجية-للمصفوفات",text:"التطبيقات النموذجية للمصفوفات"}],e=`<p><u>المصفوفة</u> (array) بنية بيانات خطية تخزّن عناصر من النوع نفسه في مساحة ذاكرة متجاورة. ويُسمى موضع العنصر في المصفوفة <u>فهرس</u> العنصر. ويوضح الشكل أدناه المفاهيم الرئيسية للمصفوفات وطريقة تخزينها.</p>
<p><img src="/images/hello-algo/chapter_array_and_linkedlist--array_definition.png" alt="تعريف المصفوفة وطريقة تخزينها"></p>
<h2 id="عمليات-المصفوفة-الشائعة">عمليات المصفوفة الشائعة</h2>
<h3 id="تهيئة-المصفوفات">تهيئة المصفوفات</h3>
<p>يمكننا الاختيار بين طريقتين لتهيئة المصفوفة حسب حاجتنا: مع قيم أولية أو دونها. وعندما لا تُحدَّد قيم أولية، تهيّئ معظم لغات البرمجة عناصر المصفوفة إلى $0$:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة المصفوفة */</span>
<span class="hljs-keyword">var</span> arr [<span class="hljs-number">5</span>]<span class="hljs-type">int</span>
<span class="hljs-comment">// في Go، تحديد الطول ([5]int) ينشئ مصفوفة؛ وعدم تحديد الطول ([]int) ينشئ slice</span>
<span class="hljs-comment">// وبما أن مصفوفات Go مصممة بحيث يُحدَّد طولها في زمن الترجمة، فلا يمكن استخدام سوى الثوابت لتحديد الطول</span>
<span class="hljs-comment">// لتسهيل تنفيذ الدالة extend()، تُعامَل slices كمصفوفات فيما يلي</span>
nums := []<span class="hljs-type">int</span>{<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة المصفوفة */</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">arr</span>: <span class="hljs-built_in">number</span>[] = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">5</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>);
<span class="hljs-keyword">let</span> <span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>];
</code></pre>
</div>
<h3 id="الوصول-إلى-العناصر">الوصول إلى العناصر</h3>
<p>تُخزَّن عناصر المصفوفة في مساحة ذاكرة متجاورة، مما يعني أن حساب العنوان في الذاكرة لعناصر المصفوفة سهل للغاية. وبمعرفة عنوان المصفوفة في الذاكرة (عنوان أول عنصر فيها) وفهرس العنصر، يمكننا استخدام الصيغة الموضحة في الشكل أدناه لحساب عنوان العنصر في الذاكرة والوصول إليه مباشرةً.</p>
<p><img src="/images/hello-algo/chapter_array_and_linkedlist--array_memory_location_calculation.png" alt="حساب العنوان في الذاكرة لعناصر المصفوفة"></p>
<p>وبمراقبة الشكل أعلاه، نجد أن فهرس أول عنصر في المصفوفة هو $0$، وهو ما قد يبدو مخالفاً للحدس لأن العدّ من $1$ أكثر طبيعية. غير أنه من منظور صيغة حساب العنوان، <strong>ليس الفهرس في جوهره سوى إزاحة عن العنوان في الذاكرة</strong>. وإزاحة عنوان العنصر الأول هي $0$، فمن المنطقي أن يكون فهرسه $0$.</p>
<p>والوصول إلى عناصر المصفوفة عالي الكفاءة؛ إذ يمكننا الوصول العشوائي إلى أي عنصر في المصفوفة في زمن $O(1)$.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الوصول العشوائي إلى عنصر */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">randomAccess</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> (randomNum <span class="hljs-type">int</span>) {
	<span class="hljs-comment">// اختيار عدد عشوائي في الفترة [0, nums.length)</span>
	randomIndex := rand.Intn(<span class="hljs-built_in">len</span>(nums))
	<span class="hljs-comment">// استرجاع العنصر العشوائي وإعادته</span>
	randomNum = nums[randomIndex]
	<span class="hljs-keyword">return</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الوصول العشوائي إلى عنصر */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">randomAccess</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// اختيار عدد عشوائي في الفترة [0, nums.length)</span>
    <span class="hljs-keyword">const</span> random_index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * nums.<span class="hljs-property">length</span>);
    <span class="hljs-comment">// استرجاع العنصر العشوائي وإعادته</span>
    <span class="hljs-keyword">const</span> random_num = nums[random_index];
    <span class="hljs-keyword">return</span> random_num;
}
</code></pre>
</div>
<h3 id="إدراج-العناصر">إدراج العناصر</h3>
<p>تتراصّ عناصر المصفوفة معاً بإحكام في الذاكرة، ولا توجد مساحة إضافية بينها لبيانات أخرى. وكما يوضح الشكل أدناه، إذا أردنا إدراج عنصر في منتصف المصفوفة، فعلينا إزاحة جميع العناصر اللاحقة موضعاً واحداً إلى اليمين ثم إسناد القيمة عند ذلك الفهرس.</p>
<p><img src="/images/hello-algo/chapter_array_and_linkedlist--array_insert_element.png" alt="مثال على إدراج عنصر في مصفوفة"></p>
<p>وجدير بالذكر أنه بما أن طول المصفوفة ثابت، فسيؤدي إدراج عنصر حتماً إلى دفع العنصر الأخير خارج المصفوفة. وسنترك حل هذه المشكلة لمناقشته في فصل «القائمة».</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* إدراج العنصر num عند الفهرس index في المصفوفة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">insert</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, num <span class="hljs-type">int</span>, index <span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// إزاحة جميع العناصر عند الفهرس index وما بعده موضعاً واحداً إلى الخلف</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>; i &gt; index; i-- {
		nums[i] = nums[i<span class="hljs-number">-1</span>]
	}
	<span class="hljs-comment">// إسناد num إلى العنصر عند الفهرس index</span>
	nums[index] = num
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* إدراج العنصر num عند الفهرس index في المصفوفة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// إزاحة جميع العناصر عند الفهرس index وما بعده موضعاً واحداً إلى الخلف</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt; index; i--) {
        nums[i] = nums[i - <span class="hljs-number">1</span>];
    }
    <span class="hljs-comment">// إسناد num إلى العنصر عند الفهرس index</span>
    nums[index] = num;
}
</code></pre>
</div>
<h3 id="حذف-العناصر">حذف العناصر</h3>
<p>وبالمثل، وكما يوضح الشكل أدناه، لحذف العنصر عند الفهرس $i$، علينا إزاحة جميع العناصر بعد الفهرس $i$ موضعاً واحداً إلى الأمام.</p>
<p><img src="/images/hello-algo/chapter_array_and_linkedlist--array_remove_element.png" alt="مثال على حذف عنصر من مصفوفة"></p>
<p>لاحظ أنه بعد اكتمال الحذف لم يعد للعنصر الأخير الأصلي معنى، لذا لا حاجة إلى تعديله صراحةً.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حذف العنصر عند الفهرس index */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">remove</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, index <span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// إزاحة جميع العناصر بعد الفهرس index موضعاً واحداً إلى الأمام</span>
	<span class="hljs-keyword">for</span> i := index; i &lt; <span class="hljs-built_in">len</span>(nums)<span class="hljs-number">-1</span>; i++ {
		nums[i] = nums[i+<span class="hljs-number">1</span>]
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حذف العنصر عند الفهرس index */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// إزاحة جميع العناصر بعد الفهرس index موضعاً واحداً إلى الأمام</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = index; i &lt; nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i++) {
        nums[i] = nums[i + <span class="hljs-number">1</span>];
    }
}
</code></pre>
</div>
<p>إجمالاً، لعمليتي الإدراج والحذف في المصفوفة العيوب التالية:</p>
<ul>
<li><strong>تعقيد زمني مرتفع</strong>: متوسط التعقيد الزمني للإدراج والحذف في المصفوفة معاً هو $O(n)$، حيث $n$ طول المصفوفة.</li>
<li><strong>فقدان العناصر</strong>: بما أن طول المصفوفة غير قابل للتغيير، فبعد إدراج عنصر ستُفقد العناصر التي تتجاوز طول المصفوفة.</li>
<li><strong>تبذير في الذاكرة</strong>: يمكننا تهيئة مصفوفة طويلة نسبياً واستخدام الجزء الأمامي منها فقط، فتصبح أي عناصر ذيلية تُستبدل مجرد حجوزات غير مستخدمة، لكن هذا يهدر بعض المساحة الذاكرية.</li>
</ul>
<h3 id="اجتياز-المصفوفات">اجتياز المصفوفات</h3>
<p>في معظم لغات البرمجة، يمكننا اجتياز المصفوفة إما بالفهرس وإما بالتكرار المباشر على كل عنصر في المصفوفة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* اجتياز المصفوفة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">traverse</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	count := <span class="hljs-number">0</span>
	<span class="hljs-comment">// اجتياز المصفوفة بالفهرس</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(nums); i++ {
		count += nums[i]
	}
	count = <span class="hljs-number">0</span>
	<span class="hljs-comment">// الاجتياز المباشر لعناصر المصفوفة</span>
	<span class="hljs-keyword">for</span> _, num := <span class="hljs-keyword">range</span> nums {
		count += num
	}
	<span class="hljs-comment">// اجتياز فهرس البيانات وعناصرها معاً</span>
	<span class="hljs-keyword">for</span> i, num := <span class="hljs-keyword">range</span> nums {
		count += nums[i]
		count += num
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* اجتياز المصفوفة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">traverse</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// اجتياز المصفوفة بالفهرس</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
        count += nums[i];
    }
    <span class="hljs-comment">// الاجتياز المباشر لعناصر المصفوفة</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> num <span class="hljs-keyword">of</span> nums) {
        count += num;
    }
}
</code></pre>
</div>
<h3 id="البحث-عن-العناصر">البحث عن العناصر</h3>
<p>يتطلب البحث عن عنصر محدد في المصفوفة اجتيازها والتحقق في كل تكرار مما إذا كانت قيمة العنصر مطابقة؛ فإن تطابقت، أخرج الفهرس المقابل.</p>
<p>وبما أن المصفوفة بنية بيانات خطية، تُسمى عملية البحث أعلاه «البحث الخطي».</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث عن العنصر المحدد في المصفوفة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">find</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> (index <span class="hljs-type">int</span>) {
	index = <span class="hljs-number">-1</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(nums); i++ {
		<span class="hljs-keyword">if</span> nums[i] == target {
			index = i
			<span class="hljs-keyword">break</span>
		}
	}
	<span class="hljs-keyword">return</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث عن العنصر المحدد في المصفوفة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">find</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
        <span class="hljs-keyword">if</span> (nums[i] === target) {
            <span class="hljs-keyword">return</span> i;
        }
    }
    <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
}
</code></pre>
</div>
<h3 id="توسيع-المصفوفات">توسيع المصفوفات</h3>
<p>في بيئات الأنظمة المعقّدة، لا تستطيع البرامج ضمان توفر مساحة الذاكرة بعد المصفوفة، مما يجعل توسيع سعة المصفوفة غير آمن. لذلك، في معظم لغات البرمجة، <strong>طول المصفوفة غير قابل للتغيير</strong>.</p>
<p>وإذا أردنا توسيع مصفوفة، فعلينا إنشاء مصفوفة جديدة أكبر ثم نسخ عناصر المصفوفة الأصلية إلى المصفوفة الجديدة عنصراً عنصراً. وهذه عملية بتعقيد $O(n)$، وتستهلك وقتاً طويلاً عندما تكون المصفوفة كبيرة. وتظهر الشيفرة أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* توسيع طول المصفوفة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">extend</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, enlarge <span class="hljs-type">int</span>)</span></span> []<span class="hljs-type">int</span> {
	<span class="hljs-comment">// تهيئة مصفوفة بطول موسّع</span>
	res := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-built_in">len</span>(nums)+enlarge)
	<span class="hljs-comment">// نسخ جميع عناصر المصفوفة الأصلية إلى المصفوفة الجديدة</span>
	<span class="hljs-keyword">for</span> i, num := <span class="hljs-keyword">range</span> nums {
		res[i] = num
	}
	<span class="hljs-comment">// إعادة المصفوفة الجديدة الموسّعة</span>
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* توسيع طول المصفوفة */</span>
<span class="hljs-comment">// ملاحظة: Array في TypeScript مصفوفة ديناميكية، ويمكن توسيعها مباشرةً</span>
<span class="hljs-comment">// لأغراض التعلّم، تتعامل هذه الدالة مع Array على أنها مصفوفة ثابتة الطول</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">extend</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">enlarge</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[] {
    <span class="hljs-comment">// تهيئة مصفوفة بطول موسّع</span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(nums.<span class="hljs-property">length</span> + enlarge).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>);
    <span class="hljs-comment">// نسخ جميع عناصر المصفوفة الأصلية إلى المصفوفة الجديدة</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
        res[i] = nums[i];
    }
    <span class="hljs-comment">// إعادة المصفوفة الجديدة الموسّعة</span>
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<h2 id="مزايا-المصفوفات-وحدودها">مزايا المصفوفات وحدودها</h2>
<p>تُخزَّن المصفوفات في مساحة ذاكرة متجاورة بعناصر من النوع نفسه. ويحتوي هذا الأسلوب على معلومات مسبقة غنية يمكن للنظام استخدامها لتحسين كفاءة عمليات بنى البيانات.</p>
<ul>
<li><strong>كفاءة مكانية عالية</strong>: تخصص المصفوفات كتل ذاكرة متجاورة للبيانات دون عبء بنيوي إضافي.</li>
<li><strong>دعم الوصول العشوائي</strong>: تتيح المصفوفات الوصول إلى أي عنصر في زمن $O(1)$.</li>
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
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
