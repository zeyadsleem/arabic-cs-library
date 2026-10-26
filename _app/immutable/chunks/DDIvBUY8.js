const n="kinney",t="testing",s="مدخل إلى الاختبارات",l="testing-the-dom",o="التهيئة",i=[{depth:2,id:"استخدام-مكتبة-dom-مع-vitest",text:"استخدام مكتبة DOM مع Vitest"},{depth:2,id:"ما-الفرق",text:"ما الفرق؟"},{depth:3,id:"باختصار",text:"باختصار"},{depth:3,id:"مقارنة-بين-jsdom-وhappy-dom",text:"مقارنة بين JSDOM وHappy DOM"},{depth:3,id:"الغرض-والاستخدام",text:"الغرض والاستخدام"},{depth:3,id:"الأداء",text:"الأداء"},{depth:3,id:"دعم-واجهات-المتصفح",text:"دعم واجهات المتصفح"},{depth:3,id:"حالات-الاستخدام",text:"حالات الاستخدام"},{depth:3,id:"المجتمع-والمنظومة",text:"المجتمع والمنظومة"},{depth:2,id:"بعض-المزالق",text:"بعض المزالق"}],r=`<p>نعم. يشغّل Node JavaScript تمامًا كما يفعل المتصفح. لكنه يفتقد أيضًا مجموعة من الأشياء التي تجدها عادةً في متصفحك المفضّل—وهي DOM.</p>
<h2 id="استخدام-مكتبة-dom-مع-vitest">استخدام مكتبة DOM مع Vitest</h2>
<p>لاستخدام <a href="https://www.npmjs.com/package/jsdom">JSDOM</a>، يمكنك ضبطها كبيئة لاختباراتك.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">environment</span>: <span class="hljs-string">&#x27;jsdom&#x27;</span>,
  },
});
</code></pre>
<p>بدلًا من ذلك، يمكنك اختيار استخدام <a href="https://www.npmjs.com/package/happy-dom">Happy DOM</a>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">environment</span>: <span class="hljs-string">&#x27;happy-dom&#x27;</span>,
  },
});
</code></pre>
<p>يمكنك أيضًا ضبط البيئة لكل ملف على حدة في أعلى ملف اختبارك.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// @vitest-environment jsdom</span>
</code></pre>
<h2 id="ما-الفرق">ما الفرق؟</h2>
<h3 id="باختصار">باختصار</h3>
<ul>
<li>اختر <strong>JSDOM</strong> إذا كنت تحتاج إلى <strong>الدقة</strong> وبيئة متصفح أكثر واقعية للاختبار.</li>
<li>اختر <strong>Happy DOM</strong> إذا كنت تحتاج إلى <strong>السرعة</strong> ولا تتطلّب معايير متصفح كاملة لاختباراتك.</li>
</ul>
<table>
<thead>
<tr>
<th>الميزة</th>
<th><strong>JSDOM</strong></th>
<th><strong>Happy DOM</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>التركيز</strong></td>
<td>دقة تحاكي المتصفح</td>
<td>الأداء والسرعة</td>
</tr>
<tr>
<td><strong>الأداء</strong></td>
<td>أبطأ، واستهلاك أكبر للذاكرة</td>
<td>أسرع، واستهلاك منخفض للذاكرة</td>
</tr>
<tr>
<td><strong>تغطية API</strong></td>
<td>أشمل</td>
<td>تركّز على واجهات الويب الأساسية</td>
</tr>
<tr>
<td><strong>حالة الاستخدام</strong></td>
<td>محاكاة متصفح كاملة في الاختبارات</td>
<td>اختبار خفيف مع السرعة</td>
</tr>
<tr>
<td><strong>التكامل</strong></td>
<td>شائعة في Jest وMocha</td>
<td>شائعة في Vitest وبيئات الاختبار السريعة</td>
</tr>
<tr>
<td><strong>الأنسب لـ</strong></td>
<td>تطبيقات ويب معقّدة، وسلوك متصفح واقعي</td>
<td>اختبارات وحدة/تكامل سريعة، وDOM بسيط</td>
</tr>
</tbody>
</table>
<h3 id="مقارنة-بين-jsdom-وhappy-dom">مقارنة بين <strong>JSDOM</strong> و<strong>Happy DOM</strong></h3>
<p>كل من <strong>JSDOM</strong> و<strong>Happy DOM</strong> مكتبتا JavaScript تُستخدمان لمحاكاة بيئة المتصفح في زمن تشغيل Node.js، بما يتيح اختبار مكوّنات الويب وتفاعلات DOM من جهة الخادم دون متصفح حقيقي. لكن بينهما بعض الفروق الجوهرية في الأداء ومجموعة الميزات وحالات الاستخدام.</p>
<h3 id="الغرض-والاستخدام">الغرض والاستخدام</h3>
<h4>JSDOM</h4>
<ul>
<li>أداة واسعة الاستخدام توفّر تنفيذًا كاملًا متوافقًا مع المعايير لـDOM وواجهات الويب في Node.js.</li>
<li>تركّز على محاكاة بيئة المتصفح بأكبر قدر ممكن من الدقة.</li>
<li>شائعة في مكتبات الاختبار مثل <strong>Jest</strong> و<strong>Vitest</strong> عند العمل مع أطر مثل React وVue وAngular.</li>
<li>الأنسب للاختبارات التي تحتاج إلى بيئة واقعية تحاكي المتصفح.</li>
</ul>
<h4>Happy DOM</h4>
<ul>
<li>بديل أسرع وخفيف لـJSDOM، مصمّم من أجل <strong>السرعة</strong>.</li>
<li>تركّز في المقام الأول على الأداء، مما يجعلها مثالية للاستخدام في بيئات مثل <strong>Vitest</strong> حيث يكون التلاعب السريع بـDOM وحلقات التغذية الراجعة السريعة أمرين جوهريين.</li>
<li>جيدة للاختبارات الأبسط حيث تكون السرعة أهم من الالتزام الصارم بمعايير الويب.</li>
<li>مُحسَّنة لاستهلاك أقل قدر من الذاكرة وللتنفيذ السريع.</li>
</ul>
<h3 id="الأداء">الأداء</h3>
<h4>JSDOM</h4>
<ul>
<li>معروفة بأنها أبطأ من Happy DOM بسبب تركيزها على تكرار بيئة المتصفح الكاملة بدقة.</li>
<li>استهلاك أعلى للذاكرة بسبب تنفيذها المفصّل لواجهات الويب وDOM.</li>
<li>قد تكون أبطأ مع مجموعات الاختبارات الكبيرة أو التطبيقات الحسّاسة للأداء.</li>
</ul>
<h4>Happy DOM</h4>
<ul>
<li><strong>أسرع</strong> بكثير من JSDOM بسبب تصميمها الخفيف وتعقيدها المنخفض.</li>
<li>مُحسَّنة من أجل <strong>السرعة</strong>، مما يجعلها خيارًا أفضل لمجموعات الاختبارات الكبيرة أو الحالات التي يكون فيها الأداء أولوية.</li>
<li>تلاعب وتصيير أسرع لـDOM، مما يجعلها مثالية للاختبار السريع في بيئة CI.</li>
</ul>
<h3 id="دعم-واجهات-المتصفح">دعم واجهات المتصفح</h3>
<h4>JSDOM</h4>
<ul>
<li>توفّر تنفيذًا أكثر <strong>شمولًا</strong> لمعايير الويب وواجهات المتصفح (مثل DOM وCSSOM وFetch API وغيرها).</li>
<li>أكثر دقة في محاكاة تجربة تحاكي المتصفح، وهو أمر ضروري عند اختبار سلوكيات متصفح معقّدة.</li>
</ul>
<h4>Happy DOM</h4>
<ul>
<li>تركّز على <strong>مجموعة فرعية</strong> من واجهات المتصفح الأساسية الأكثر استخدامًا في الاختبار.</li>
<li>أقل اكتمالًا من JSDOM من حيث تنفيذ واجهة المتصفح الكاملة، لكنها تغطي معظم حالات الاستخدام الشائعة.</li>
<li>بالنسبة لتطبيقات الويب الأبسط، قد توفّر Happy DOM كل الميزات اللازمة دون عبء الالتزام الكامل بالمعايير.</li>
</ul>
<h3 id="حالات-الاستخدام">حالات الاستخدام</h3>
<h4>JSDOM</h4>
<ul>
<li><strong>الأنسب للمشاريع</strong> التي تحتاج فيها إلى تقريب شديد من بيئة المتصفح الفعلية، خصوصًا عند اختبار تطبيقات أو مكتبات ويب تعتمد اعتمادًا كبيرًا على ميزات متصفح متقدمة.</li>
<li>مثالية لـ<strong>اختبار شامل من طرف إلى طرف</strong> يحاكي سلوك المتصفح في العالم الحقيقي.</li>
</ul>
<h4>Happy DOM</h4>
<ul>
<li><strong>الأنسب لبيئات الاختبار السريع</strong> حيث يكون الأداء حاسمًا (مثل اختبارات الوحدة والتلاعب البسيط بـDOM).</li>
<li>تُستخدم غالبًا في مكتبات مثل <strong>Vitest</strong> من أجل <strong>اختبار خفيف وسريع</strong> في مشاريع الويب.</li>
</ul>
<h3 id="المجتمع-والمنظومة">المجتمع والمنظومة</h3>
<h4>JSDOM</h4>
<ul>
<li>أداة راسخة ذات قاعدة مستخدمين كبيرة وتكامل قوي مع أطر الاختبار الشائعة مثل <strong>Jest</strong> و<strong>Mocha</strong>.</li>
<li>تُحدَّث بانتظام لتبقى متوافقة مع أحدث معايير الويب.</li>
</ul>
<h4>Happy DOM</h4>
<ul>
<li>تكتسب شعبية بفضل تكاملها مع <strong>Vitest</strong> ومزايا سرعتها.</li>
<li>لا تزال منظومتها تتطوّر لكن تبنّيها ينمو، خصوصًا في المشاريع الحسّاسة للأداء.</li>
</ul>
<h2 id="بعض-المزالق">بعض المزالق</h2>
<p>بصراحة—لا شيء مثالي. هناك بضعة أمور يجب أن تضعها في حسبانك عند تشغيل الاختبارات في وضع المتصفح:</p>
<ol>
<li><strong>ما زال متصفحًا غير حقيقي.</strong> أنت لا تحصل على كل تفصيلة دقيقة من إصدار Chrome أو Firefox معيّن. تذكّر أن هذا «مُحوَّل إلى JSDOM»، أي أنه مصمّم ليتصرّف كمتصفح بدلًا من أن يكون متصفحًا.</li>
<li><strong>الأداء.</strong> قد يكون تشغيل الاختبارات بـ<code>jsdom</code> أبطأ قليلًا من اختبارات Node المباشرة. إنها تكلفة محاكاة أمور المتصفح.</li>
<li><strong>مشكلات خاصة بالمتصفحات.</strong> مجرد أن شيئًا يعمل في وضع متصفح Vitest لا يعني أنه سيعمل في <em>كل</em> المتصفحات. (أحدّق إليك، Internet Explorer.)</li>
</ol>
`,e={book:n,chapter:t,chapterTitle:s,slug:l,title:o,headings:i,html:r};export{n as book,t as chapter,s as chapterTitle,e as default,i as headings,r as html,l as slug,o as title};
