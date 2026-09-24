const t="hello-algo",n="chapter_data_structure",d="بنى البيانات",s="basic_data_types",a="أنواع البيانات الأساسية",e=[],c=`<p>عندما نتحدث عن البيانات المخزَّنة في الحواسيب، يخطر في ذهننا أشكال متنوعة مثل النصوص والصور والفيديوهات والصوتيات والنماذج ثلاثية الأبعاد وغيرها. ورغم أن هذه الأنواع من البيانات تُنظَّم بطرق مختلفة، فإنها جميعاً تتكون من أنواع بيانات أساسية متنوعة.</p>
<p><strong>أنواع البيانات الأساسية هي أنواع يمكن لوحدة المعالجة المركزية (CPU) التعامل معها مباشرة</strong>، وتُستخدم مباشرة في الخوارزميات، وتشمل أساساً ما يلي.</p>
<ul>
<li>أنواع الأعداد الصحيحة <code>byte</code> و<code>short</code> و<code>int</code> و<code>long</code>.</li>
<li>أنواع الأعداد العشرية (floating-point) <code>float</code> و<code>double</code>، وتُستخدم لتمثيل الأعداد ذات الفاصلة العشرية.</li>
<li>نوع المحرف <code>char</code>، ويُستخدم لتمثيل الحروف وعلامات الترقيم وحتى الرموز التعبيرية في مختلف اللغات.</li>
<li>النوع المنطقي <code>bool</code>، ويُستخدم لتمثيل أحكام «نعم» و«لا».</li>
</ul>
<p><strong>تُخزَّن أنواع البيانات الأساسية في الحواسيب بالصيغة الثنائية</strong>. وخانة الرقم الثنائي الواحدة هي بت واحد. وفي معظم أنظمة التشغيل الحديثة، يتكون البايت الواحد من $8$ بتات.</p>
<p>يعتمد نطاق قيم أنواع البيانات الأساسية على حجم المساحة التي تشغلها. وفيما يلي مثال بلغة Java.</p>
<ul>
<li>النوع الصحيح <code>byte</code> يشغل $1$ بايت = $8$ بتات، ويمكنه تمثيل $2^{8}$ عدداً.</li>
<li>النوع الصحيح <code>int</code> يشغل $4$ بايتات = $32$ بتاً، ويمكنه تمثيل $2^{32}$ عدداً.</li>
</ul>
<p>يسرد الجدول التالي المساحة المشغولة ونطاقات القيم والقيم الافتراضية لمختلف أنواع البيانات الأساسية في Java. لست بحاجة إلى حفظ هذا الجدول؛ يكفي فهم عام له، ويمكنك الرجوع إليه عند الحاجة.</p>
<p align="center"> جدول <id> &nbsp; المساحة المشغولة ونطاقات القيم لأنواع البيانات الأساسية </p>
<table>
<thead>
<tr>
<th>النوع</th>
<th>الرمز</th>
<th>المساحة المشغولة</th>
<th>القيمة الدنيا</th>
<th>القيمة العظمى</th>
<th>القيمة الافتراضية</th>
</tr>
</thead>
<tbody>
<tr>
<td>عدد صحيح</td>
<td><code>byte</code></td>
<td>1 بايت</td>
<td>$-2^7$ ($-128$)</td>
<td>$2^7 - 1$ ($127$)</td>
<td>$0$</td>
</tr>
<tr>
<td></td>
<td><code>short</code></td>
<td>2 بايت</td>
<td>$-2^{15}$</td>
<td>$2^{15} - 1$</td>
<td>$0$</td>
</tr>
<tr>
<td></td>
<td><code>int</code></td>
<td>4 بايت</td>
<td>$-2^{31}$</td>
<td>$2^{31} - 1$</td>
<td>$0$</td>
</tr>
<tr>
<td></td>
<td><code>long</code></td>
<td>8 بايت</td>
<td>$-2^{63}$</td>
<td>$2^{63} - 1$</td>
<td>$0$</td>
</tr>
<tr>
<td>عدد عشري</td>
<td><code>float</code></td>
<td>4 بايت</td>
<td>$1.175 \\times 10^{-38}$</td>
<td>$3.403 \\times 10^{38}$</td>
<td>$0.0\\text{f}$</td>
</tr>
<tr>
<td></td>
<td><code>double</code></td>
<td>8 بايت</td>
<td>$2.225 \\times 10^{-308}$</td>
<td>$1.798 \\times 10^{308}$</td>
<td>$0.0$</td>
</tr>
<tr>
<td>محرف</td>
<td><code>char</code></td>
<td>2 بايت</td>
<td>$0$</td>
<td>$2^{16} - 1$</td>
<td>$0$</td>
</tr>
<tr>
<td>منطقي</td>
<td><code>bool</code></td>
<td>1 بايت</td>
<td>$\\text{false}$</td>
<td>$\\text{true}$</td>
<td>$\\text{false}$</td>
</tr>
</tbody>
</table>
<p>يرجى ملاحظة أن الجدول أعلاه ينطبق تحديداً على أنواع البيانات الأساسية في Java. ولكل لغة برمجة تعريفاتها الخاصة للأنواع، وقد تختلف مساحتها ونطاقات قيمها وقيمها الافتراضية.</p>
<ul>
<li>في Python، يمكن أن يكون النوع الصحيح <code>int</code> بأي حجم، ولا يحدّه إلا الذاكرة المتاحة؛ والنوع العشري <code>float</code> مزدوج الدقة بطول 64 بت؛ ولا يوجد نوع <code>char</code>، فالمحرف الواحد هو في الواقع سلسلة نصية <code>str</code> بطول 1.</li>
<li>لا تحدد لغتا C وC++ حجم أنواع البيانات الأساسية تحديداً صريحاً، بل يختلف ذلك حسب التنفيذ والمنصة. ويتبع الجدول أعلاه <a href="https://en.cppreference.com/w/cpp/language/types#Properties">نموذج البيانات</a> LP64، المستخدم في أنظمة تشغيل Unix 64 بت بما فيها Linux وmacOS.</li>
<li>حجم المحرف <code>char</code> هو 1 بايت في C وC++، وفي معظم لغات البرمجة يعتمد على طريقة ترميز المحارف المحددة، كما هو مفصل في قسم «ترميز المحارف».</li>
<li>رغم أن تمثيل قيمة منطقية لا يحتاج إلا إلى 1 بت ($0$ أو $1$)، فإنها تُخزَّن عادةً في الذاكرة بايتاً واحداً. ذلك لأن وحدات المعالجة المركزية الحديثة تستخدم البايت الواحد عادةً أصغر وحدة ذاكرة قابلة للعنونة.</li>
</ul>
<p>فما العلاقة بين أنواع البيانات الأساسية وبنى البيانات؟ نعلم أن بنى البيانات طرق لتنظيم البيانات وتخزينها في الحواسيب. والتشديد هنا على «البنية» وليس على «البيانات».</p>
<p>إذا أردنا تمثيل «صف من الأعداد»، نميل بطبيعتنا إلى استخدام مصفوفة. ذلك لأن البنية الخطية للمصفوفة يمكن أن تمثل علاقات التجاور والترتيب بين الأعداد، أما ما إذا كان المحتوى المخزَّن عدداً صحيحاً <code>int</code> أو عدداً عشرياً <code>float</code> أو محرفاً <code>char</code> فأمر لا علاقة له بـ«بنية البيانات».</p>
<p>وبعبارة أخرى، <strong>توفر أنواع البيانات الأساسية «نوع المحتوى» للبيانات، بينما توفر بنى البيانات «طريقة التنظيم» للبيانات</strong>. وعلى سبيل المثال، في الشيفرة التالية نستخدم بنية البيانات نفسها (المصفوفة) لتخزين أنواع بيانات أساسية مختلفة وتمثيلها، بما فيها <code>int</code> و<code>float</code> و<code>char</code> و<code>bool</code> وغيرها.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">// هيّئ المصفوفات باستخدام أنواع بيانات أساسية متنوعة</span>
<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">5</span>]<span class="hljs-type">int</span>{}
<span class="hljs-keyword">var</span> decimals = [<span class="hljs-number">5</span>]<span class="hljs-type">float64</span>{}
<span class="hljs-keyword">var</span> characters = [<span class="hljs-number">5</span>]<span class="hljs-type">byte</span>{}
<span class="hljs-keyword">var</span> bools = [<span class="hljs-number">5</span>]<span class="hljs-type">bool</span>{}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">// هيّئ المصفوفات باستخدام أنواع بيانات أساسية متنوعة</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">numbers</span>: <span class="hljs-built_in">number</span>[] = [];
<span class="hljs-keyword">const</span> <span class="hljs-attr">characters</span>: <span class="hljs-built_in">string</span>[] = [];
<span class="hljs-keyword">const</span> <span class="hljs-attr">bools</span>: <span class="hljs-built_in">boolean</span>[] = [];
</code></pre>
</div>
`,o={book:t,chapter:n,chapterTitle:d,slug:s,title:a,headings:e,html:c};export{t as book,n as chapter,d as chapterTitle,o as default,e as headings,c as html,s as slug,a as title};
