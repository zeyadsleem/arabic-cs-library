const n="hello-algo",s="chapter_backtracking",t="التتبّع الرجعي",a="permutations_problem",e="مسألة التباديل",l=[{depth:2,id:"حالة-العناصر-المختلفة",text:"حالة العناصر المختلفة"},{depth:3,id:"تشذيب-الاختيارات-المكررة",text:"تشذيب الاختيارات المكررة"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:2,id:"حالة-العناصر-المكررة",text:"حالة العناصر المكررة"},{depth:3,id:"تشذيب-العناصر-المتساوية",text:"تشذيب العناصر المتساوية"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"مقارنة-طريقتي-التشذيب",text:"مقارنة طريقتي التشذيب"}],p=`<p>مسألة التباديل تطبيق كلاسيكي لخوارزميات التتبّع الرجعي. وتُعرَّف بأنها إيجاد جميع الترتيبات الممكنة لعناصر مجموعة معطاة (مثل مصفوفة أو سلسلة نصية).</p>
<p>يوضح الجدول أدناه عدة أمثلة لمجموعات بيانات، تشمل مصفوفات الإدخال وما يقابلها من تباديل.</p>
<p align="center"> جدول <id> &nbsp; أمثلة على التباديل </p>
<table>
<thead>
<tr>
<th style="text-align:left">مصفوفة الإدخال</th>
<th style="text-align:left">جميع التباديل</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">$[1]$</td>
<td style="text-align:left">$[1]$</td>
</tr>
<tr>
<td style="text-align:left">$[1, 2]$</td>
<td style="text-align:left">$[1, 2], [2, 1]$</td>
</tr>
<tr>
<td style="text-align:left">$[1, 2, 3]$</td>
<td style="text-align:left">$[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]$</td>
</tr>
</tbody>
</table>
<h2 id="حالة-العناصر-المختلفة">حالة العناصر المختلفة</h2>
<div class="note">
<p>معطى مصفوفة أعداد صحيحة لا تحتوي عناصر مكررة، أعد جميع التباديل الممكنة.</p>
</div>
<p>من منظور خوارزميات التتبّع الرجعي، <strong>يمكننا تصوّر عملية توليد التباديل كنتيجة لسلسلة من الاختيارات</strong>. لنفترض أن مصفوفة الإدخال هي $[1, 2, 3]$. إذا اخترنا أولاً $1$، ثم اخترنا $3$، وأخيراً اخترنا $2$، حصلنا على التبديل $[1, 3, 2]$. ويعني التتبّع الرجعي التراجع عن اختيار ما ثم تجربة اختيارات أخرى.</p>
<p>ومن منظور شيفرة التتبّع الرجعي، تتكوّن مجموعة المرشحين <code>choices</code> من جميع عناصر مصفوفة الإدخال، وتكون الحالة <code>state</code> هي العناصر التي اختيرت حتى الآن. لاحظ أن كل عنصر لا يمكن اختياره إلا مرة واحدة، <strong>لذا ينبغي أن تكون جميع عناصر <code>state</code> فريدة</strong>.</p>
<p>وكما يوضح الشكل أدناه، يمكننا نشر عملية البحث في شجرة تعاودية، حيث تمثل كل عقدة في الشجرة الحالة الحالية <code>state</code>. وبدءاً من العقدة الجذرية، وبعد ثلاث جولات من الاختيارات، نصل إلى عقدة ورقة، وتقابل كل عقدة ورقة تبديلاً واحداً.</p>
<p><img src="/images/hello-algo/chapter_backtracking--permutations_i.png" alt="الشجرة التعاودية للتباديل"></p>
<h3 id="تشذيب-الاختيارات-المكررة">تشذيب الاختيارات المكررة</h3>
<p>لضمان اختيار كل عنصر مرة واحدة فقط، نفكّر في إدخال مصفوفة منطقية <code>selected</code>، حيث يشير <code>selected[i]</code> إلى ما إذا كان <code>choices[i]</code> قد اختير. وننفّذ عملية التشذيب التالية استناداً إليها.</p>
<ul>
<li>بعد اتخاذ القرار <code>choices[i]</code>، نضبط <code>selected[i]</code> على $\\text{True}$، إشارةً إلى أنه قد اختير.</li>
<li>عند اجتياز قائمة المرشحين <code>choices</code>، نتخطى جميع العقد التي اختيرت، وهذا هو التشذيب.</li>
</ul>
<p>وكما يوضح الشكل أدناه، لنفترض أننا اخترنا $1$ في الجولة الأولى، و$3$ في الجولة الثانية، و$2$ في الجولة الثالثة. فحينئذٍ نحتاج إلى تشذيب فرع العنصر $1$ في الجولة الثانية، وتشذيب فرعي العنصرين $1$ و$3$ في الجولة الثالثة.</p>
<p><img src="/images/hello-algo/chapter_backtracking--permutations_i_pruning.png" alt="مثال على تشذيب التباديل"></p>
<p>وبمراقبة الشكل أعلاه، نجد أن عملية التشذيب هذه تقلّص حجم فضاء البحث من $O(n^n)$ إلى $O(n!)$.</p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>بعد فهم المعلومات أعلاه، يمكننا ملء الفراغات في الشيفرة القالبية. ولاختصار الشيفرة الإجمالية، لا ننفّذ كل دالة في القالب على حدة، بل ننشرها داخل الدالة <code>backtrack()</code>:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* التباديل I */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">permutationsI</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> [][]<span class="hljs-type">int</span> {
	res := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>)
	state := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>)
	selected := <span class="hljs-built_in">make</span>([]<span class="hljs-type">bool</span>, <span class="hljs-built_in">len</span>(nums))
	backtrackI(&amp;state, &amp;nums, &amp;selected, &amp;res)
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* التباديل I */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">permutationsI</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span>[][] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">res</span>: <span class="hljs-built_in">number</span>[][] = [];
    <span class="hljs-title function_">backtrack</span>([], nums, <span class="hljs-title class_">Array</span>(nums.<span class="hljs-property">length</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">false</span>), res);
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<h2 id="حالة-العناصر-المكررة">حالة العناصر المكررة</h2>
<div class="note">
<p>معطى مصفوفة أعداد صحيحة <strong>قد تحتوي عناصر مكررة</strong>، أعد جميع التباديل الفريدة.</p>
</div>
<p>لنفترض أن مصفوفة الإدخال هي $[1, 1, 2]$. وللتمييز بين العنصرين المكررين $1$، نرمز إلى الثاني منهما بـ $\\hat{1}$.</p>
<p>وكما يوضح الشكل أدناه، فإن نصف التباديل المولَّدة بالطريقة السابقة مكرر.</p>
<p><img src="/images/hello-algo/chapter_backtracking--permutations_ii.png" alt="تباديل مكررة"></p>
<p>فكيف نزيل التباديل المكررة؟ أسلوب مباشر هو استخدام مجموعة تجزئة (hash set) لإزالة تكرار نتائج التباديل مباشرة. غير أن هذا ليس أنيقاً، لأن <strong>فروع البحث التي تولّد تباديل مكررة غير ضرورية وينبغي تحديدها وتشذيبها مبكراً</strong>، وهو ما يحسّن كفاءة الخوارزمية أكثر.</p>
<h3 id="تشذيب-العناصر-المتساوية">تشذيب العناصر المتساوية</h3>
<p>راقب الشكل أدناه. في الجولة الأولى، اختيار $1$ أو اختيار $\\hat{1}$ مكافئ. وجميع التباديل المولَّدة تحت هذين الاختيارين مكررة. لذلك ينبغي تشذيب $\\hat{1}$.</p>
<p>وبالمثل، بعد اختيار $2$ في الجولة الأولى، ينتج العنصران $1$ و$\\hat{1}$ في الجولة الثانية فرعين مكررين أيضاً، لذا ينبغي تشذيب $\\hat{1}$ في الجولة الثانية كذلك.</p>
<p>وهدفنا جوهرياً <strong>هو ضمان ألا يُختار من العناصر المتساوية المتعددة إلا عنصر واحد في جولة اختيار معينة</strong>.</p>
<p><img src="/images/hello-algo/chapter_backtracking--permutations_ii_pruning.png" alt="تشذيب التباديل المكررة"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>بناءً على شيفرة المسألة السابقة، نهيّئ مجموعة تجزئة <code>duplicated</code> في كل جولة من الاختيارات لتسجيل العناصر التي جُرِّبت بالفعل في تلك الجولة، ونشذّب العناصر المتساوية:</p>
<p>بافتراض أن العناصر مختلفة مثنى مثنى، فإن عدد تباديل $n$ عنصراً هو $n!$ (المضروب). وعند تسجيل النتائج نحتاج إلى نسخ قائمة طولها $n$، وهو ما يستغرق زمن $O(n)$. <strong>لذلك يكون التعقيد الزمني $O(n! \\cdot n)$</strong>.</p>
<p>أقصى عمق للتعاود هو $n$، وهو ما يستهلك مساحة إطارات المكدس $O(n)$. وتستهلك <code>selected</code> مساحة $O(n)$. ويوجد في الوقت نفسه $n$ مجموعة <code>duplicated</code> على الأكثر، وهو ما يستهلك مساحة $O(n^2)$. <strong>لذلك يكون التعقيد المكاني $O(n^2)$</strong>.</p>
<h3 id="مقارنة-طريقتي-التشذيب">مقارنة طريقتي التشذيب</h3>
<p>لاحظ أنهما وإن كان كل من <code>selected</code> و<code>duplicated</code> مستخدماً في التشذيب، فلهما هدفان مختلفان.</p>
<ul>
<li><strong>تشذيب الاختيارات المكررة</strong>: توجد <code>selected</code> واحدة فقط طوال عملية البحث بأكملها. وهي تسجّل العناصر المضمَّنة في الحالة الحالية، وهدفها منع تكرار ظهور عنصر ما في <code>state</code>.</li>
<li><strong>تشذيب العناصر المتساوية</strong>: تحتوي كل جولة من الاختيارات (كل استدعاء للدالة <code>backtrack</code>) على مجموعة <code>duplicated</code>. وهي تسجّل العناصر التي اختيرت في تكرار هذه الجولة (حلقة <code>for</code>)، وهدفها ضمان ألا تُختار العناصر المتساوية إلا مرة واحدة.</li>
</ul>
<p>يوضح الشكل أدناه النطاق الفعلي لشرطي التشذيب. لاحظ أن كل عقدة في الشجرة تمثل اختياراً، وأن العقد الواقعة على المسار من الجذر إلى عقدة ورقة تشكّل تبديلاً.</p>
<p><img src="/images/hello-algo/chapter_backtracking--permutations_ii_pruning_summary.png" alt="النطاق الفعلي لشرطي التشذيب"></p>
`,c={book:n,chapter:s,chapterTitle:t,slug:a,title:e,headings:l,html:p};export{n as book,s as chapter,t as chapterTitle,c as default,l as headings,p as html,a as slug,e as title};
