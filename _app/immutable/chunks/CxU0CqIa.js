const s="hello-algo",n="chapter_searching",a="البحث",l="binary_search",p="البحث الثنائي",t=[{depth:2,id:"طرق-تمثيل-المجالات",text:"طرق تمثيل المجالات"},{depth:2,id:"المزايا-والقيود",text:"المزايا والقيود"}],e=`<p><u>البحث الثنائي</u> (binary search) خوارزمية بحث فعّالة قائمة على استراتيجية التقسيم والتغلب. وهو يستفيد من الترتيب المرتَّب للبيانات ليقلّص نطاق البحث إلى النصف في كل جولة، حتى العثور على العنصر المستهدف أو أن يصبح مجال البحث فارغاً.</p>
<div class="note">
<p>بمعطى مصفوفة <code>nums</code> طولها $n$، عناصرها مرتّبة ترتيباً تصاعدياً ولا تحتوي عناصر مكررة، ابحث عن فهرس العنصر <code>target</code> في المصفوفة وأعده. وإذا لم تحتوِ المصفوفة على هذا العنصر، فأعد $-1$. ويوضح الشكل أدناه مثالاً على ذلك.</p>
</div>
<p><img src="/images/hello-algo/chapter_searching--binary_search_example.png" alt="بيانات مثال للبحث الثنائي"></p>
<p>كما يوضح الشكل أدناه، نهيّئ أولاً المؤشرين $i = 0$ و$j = n - 1$، وهما يشيران إلى العنصرين الأول والأخير من المصفوفة على التوالي، ويمثّلان مجال البحث $[0, n - 1]$. لاحظ أن الأقواس المربعة تشير إلى مجال مغلق يشمل القيمتين الحديتين أنفسهما.</p>
<p>بعد ذلك، نفّذ الخطوتين التاليتين في حلقة:</p>
<ol>
<li>احسب فهرس المنتصف $m = \\lfloor {(i + j) / 2} \\rfloor$، حيث يشير الرمز $\\lfloor : \\rfloor$ إلى عملية التقريب نحو الأسفل.</li>
<li>قارن <code>nums[m]</code> بـ<code>target</code>، وينتج عن ذلك ثلاث حالات:
<ol>
<li>عندما يكون <code>nums[m] &lt; target</code>، فهذا يعني أن <code>target</code> يقع في الفترة $[m + 1, j]$، لذا نفّذ $i = m + 1$.</li>
<li>عندما يكون <code>nums[m] &gt; target</code>، فهذا يعني أن <code>target</code> يقع في الفترة $[i, m - 1]$، لذا نفّذ $j = m - 1$.</li>
<li>عندما يكون <code>nums[m] = target</code>، فهذا يعني أن <code>target</code> قد وُجد، لذا أعد الفهرس $m$.</li>
</ol>
</li>
</ol>
<p>إذا لم تحتوِ المصفوفة على العنصر المستهدف، فسيصبح مجال البحث فارغاً في النهاية. وفي هذه الحالة، أعد $-1$.</p>
<p>ومن الجدير بالذكر أنه بما أن $i$ و$j$ من النوع <code>int</code>، فإن <strong>$i + j$ قد يتجاوز نطاق النوع <code>int</code></strong>. ولتجنّب تجاوز الأعداد الصحيحة الحد الأقصى، نستخدم عادةً الصيغة $m = \\lfloor {i + (j - i) / 2} \\rfloor$ لحساب نقطة المنتصف.</p>
<p>والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي (مجال مغلق من الطرفين) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearch</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// هيّئ المجال المغلق [0, n-1]، أي أن i وj يشيران إلى العنصرين الأول والأخير من المصفوفة</span>
	i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(nums)<span class="hljs-number">-1</span>
	<span class="hljs-comment">// كرر، واخرج عندما يصبح مجال البحث فارغاً (يكون فارغاً عندما i &gt; j)</span>
	<span class="hljs-keyword">for</span> i &lt;= j {
		m := i + (j-i)/<span class="hljs-number">2</span>      <span class="hljs-comment">// احسب فهرس المنتصف m</span>
		<span class="hljs-keyword">if</span> nums[m] &lt; target { <span class="hljs-comment">// هذا يعني أن target يقع في الفترة [m+1, j]</span>
			i = m + <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> nums[m] &gt; target { <span class="hljs-comment">// هذا يعني أن target يقع في الفترة [i, m-1]</span>
			j = m - <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> { <span class="hljs-comment">// وُجد العنصر المستهدف، أعد فهرسه</span>
			<span class="hljs-keyword">return</span> m
		}
	}
	<span class="hljs-comment">// لم يُعثر على العنصر المستهدف، أعد -1</span>
	<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي (مجال مغلق من الطرفين) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearch</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// هيّئ المجال المغلق [0, n-1]، أي أن i وj يشيران إلى العنصرين الأول والأخير من المصفوفة</span>
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>,
        j = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>;
    <span class="hljs-comment">// كرر، واخرج عندما يصبح مجال البحث فارغاً (يكون فارغاً عندما i &gt; j)</span>
    <span class="hljs-keyword">while</span> (i &lt;= j) {
        <span class="hljs-comment">// احسب فهرس المنتصف m</span>
        <span class="hljs-keyword">const</span> m = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(i + (j - i) / <span class="hljs-number">2</span>);
        <span class="hljs-keyword">if</span> (nums[m] &lt; target) {
            <span class="hljs-comment">// هذا يعني أن target يقع في الفترة [m+1, j]</span>
            i = m + <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nums[m] &gt; target) {
            <span class="hljs-comment">// هذا يعني أن target يقع في الفترة [i, m-1]</span>
            j = m - <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// وُجد العنصر المستهدف، أعد فهرسه</span>
            <span class="hljs-keyword">return</span> m;
        }
    }
    <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>; <span class="hljs-comment">// لم يُعثر على العنصر المستهدف، أعد -1</span>
}
</code></pre>
</div>
<p><strong>التعقيد الزمني $O(\\log n)$</strong>: في حلقة البحث الثنائي، يُقلَّص المجال إلى النصف في كل جولة، لذا يكون عدد التكرارات $\\log_2 n$.</p>
<p><strong>التعقيد المكاني $O(1)$</strong>: يستخدم المؤشران $i$ و$j$ مساحة ثابتة الحجم.</p>
<h2 id="طرق-تمثيل-المجالات">طرق تمثيل المجالات</h2>
<p>بالإضافة إلى المجال المغلق المذكور أعلاه، ثمة تمثيل شائع آخر للمجال هو «مغلق من اليسار، مفتوح من اليمين»، ويُعرّف بـ $[0, n)$، أي أن الحد الأيسر مغلق بينما الحد الأيمن مفتوح. وفي ظل هذا التمثيل، يكون المجال $[i, j)$ فارغاً عندما $i = j$.</p>
<p>ويمكننا تنفيذ خوارزمية بحث ثنائي بالوظيفة نفسها استناداً إلى هذا التمثيل:</p>
<p>وكما يوضح الشكل أدناه، تختلف تهيئة خوارزمية البحث الثنائي وشرط الحلقة وعمليات تقليص المجال في ظل تمثيلي المجال كليهما.</p>
<p>وبما أن الحدين الأيسر والأيمن في تمثيل «المجال المغلق» معرّفان كليهما كمغلقين، فإن عمليتي تقليص المجال عبر المؤشرين $i$ و$j$ متماثلتان أيضاً. وهذا يجعل الأخطاء أقل احتمالاً، <strong>لذا يُوصى عموماً بنهج «المجال المغلق»</strong>.</p>
<p><img src="/images/hello-algo/chapter_searching--binary_search_ranges.png" alt="تعريفا المجال"></p>
<h2 id="المزايا-والقيود">المزايا والقيود</h2>
<p>يقدّم البحث الثنائي أداءً جيداً في الزمن والمساحة كليهما.</p>
<ul>
<li>للبحث الثنائي كفاءة زمنية عالية. ومع أحجام البيانات الكبيرة، يحمل التعقيد الزمني اللوغاريتمي مزايا واضحة. فمثلاً، عندما يكون حجم البيانات $n = 2^{20}$، يتطلب البحث الخطي $2^{20} = 1048576$ تكراراً، بينما يحتاج البحث الثنائي إلى $\\log_2 2^{20} = 20$ تكراراً فقط.</li>
<li>لا يتطلب البحث الثنائي مساحة إضافية. فمقارنةً بخوارزميات البحث التي تحتاج مساحة إضافية (مثل البحث القائم على التجزئة)، يكون البحث الثنائي أكثر كفاءة في استهلاك المساحة.</li>
</ul>
<p>غير أن البحث الثنائي لا يلائم جميع الحالات، ويرجع ذلك أساساً إلى الأسباب التالية:</p>
<ul>
<li>لا ينطبق البحث الثنائي إلا على البيانات المرتّبة. فإذا كانت بيانات الإدخال غير مرتّبة، فإن ترتيبها خصيصاً لاستخدام البحث الثنائي يكون بنتيجة عكسية، لأن خوارزميات الترتيب عادةً ما يكون تعقيدها الزمني $O(n \\log n)$، وهو أعلى من تعقيد البحث الخطي والبحث الثنائي معاً. وفي السيناريوهات التي تتكرر فيها عمليات إدراج العناصر، يتطلب الحفاظ على ترتيب المصفوفة إدراج العناصر في مواضع محددة بتعقيد زمني $O(n)$، وهو مكلف جداً أيضاً.</li>
<li>لا ينطبق البحث الثنائي إلا على المصفوفات. فالبحث الثنائي يتطلب وصولاً غير متصل وقافزاً إلى العناصر، وهذا النوع من الوصول غير فعّال في القوائم المترابطة، مما يجعله غير مناسب للقوائم المترابطة أو بنى البيانات القائمة عليها.</li>
<li>مع أحجام البيانات الصغيرة، يكون أداء البحث الخطي أفضل. ففي البحث الخطي، تتطلب كل جولة عملية مقارنة واحدة فقط؛ بينما في البحث الثنائي، يتطلب الأمر عملية جمع واحدة وعملية قسمة واحدة و1-3 عمليات مقارنة وعملية جمع (أو طرح) واحدة، أي ما مجموعه 4-6 عمليات وحدة. لذلك، عندما يكون حجم البيانات $n$ صغيراً، يكون البحث الخطي في الواقع أسرع من البحث الثنائي.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
