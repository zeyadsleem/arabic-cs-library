const n="kinney",s="testing",t="مدخل إلى الاختبارات",e="mocking-best-practices",o="قائمة غير مكتملة بأفضل الممارسات للمحاكاة",l=[{depth:2,id:"حاك-فقط-ما-تحتاجه",text:"حاكِ فقط ما تحتاجه"},{depth:2,id:"أعد-ضبط-البدائل-المحاكاة-بين-الاختبارات",text:"أعِد ضبط البدائل المُحاكاة بين الاختبارات"},{depth:2,id:"استخدم-الجواسيس-للتحقق-من-التفاعلات",text:"استخدم الجواسيس للتحقق من التفاعلات"},{depth:2,id:"أبق-الاختبارات-قابلة-للقراءة",text:"أبقِ الاختبارات قابلة للقراءة"},{depth:2,id:"توخ-الحذر-مع-المحاكاة-العامة",text:"توخَّ الحذر مع المحاكاة العامة"},{depth:2,id:"المزالق-الشائعة-وكيف-تتجنبها",text:"المزالق الشائعة وكيف تتجنّبها"},{depth:3,id:"الإفراط-في-استخدام-البدائل-المحاكاة",text:"الإفراط في استخدام البدائل المُحاكاة"},{depth:3,id:"تسرب-البدائل-المحاكاة-بين-الاختبارات",text:"تسرّب البدائل المُحاكاة بين الاختبارات"},{depth:3,id:"نسيان-إعادة-الوحدات-المحاكاة",text:"نسيان إعادة الوحدات المُحاكاة"},{depth:3,id:"اختبار-تفاصيل-التنفيذ",text:"اختبار تفاصيل التنفيذ"}],c=`<p>لننظر في بعض أفضل الممارسات عند استخدام <a href="https://stevekinney.com/courses/testing/mocks">البدائل المُحاكاة</a>، و<a href="https://stevekinney.com/courses/testing/stubs">البدائل</a>، و<a href="https://stevekinney.com/courses/testing/spies">الجواسيس</a>، وأنواع أخرى من <a href="https://stevekinney.com/courses/testing/test-doubles">البدائل الاختبارية</a>.</p>
<h2 id="حاك-فقط-ما-تحتاجه">حاكِ فقط ما تحتاجه</h2>
<ul>
<li><strong>تجنّب الإفراط في المحاكاة</strong>: المحاكاة المفرطة قد تجعل الاختبارات أقل قيمة.</li>
<li><strong>حاكِ الاعتمادات الخارجية</strong>: ركّز على محاكاة واجهات API وقواعد البيانات أو الوحدات الخارجة عن سيطرتك.</li>
</ul>
<h2 id="أعد-ضبط-البدائل-المحاكاة-بين-الاختبارات">أعِد ضبط البدائل المُحاكاة بين الاختبارات</h2>
<p><strong>اضمن العزل</strong>: استخدم <code>vi.clearAllMocks()</code> أو <code>vi.resetAllMocks()</code> داخل <code>afterEach</code> لإعادة ضبط البدائل المُحاكاة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">clearAllMocks</span>();
});
</code></pre>
<h2 id="استخدم-الجواسيس-للتحقق-من-التفاعلات">استخدم الجواسيس للتحقق من التفاعلات</h2>
<p><strong>متى لا تُحاكي</strong>: إن أردت اختبار التنفيذ الفعلي مع التحقق من التفاعلات أيضًا، فاستخدم الجواسيس.</p>
<h2 id="أبق-الاختبارات-قابلة-للقراءة">أبقِ الاختبارات قابلة للقراءة</h2>
<ul>
<li><strong>أسماء وصفية</strong>: سمِّ بدائلك المُحاكاة وجواسيسك بوضوح لتعزيز القراءة.</li>
<li><strong>نمط الترتيب-التنفيذ-التحقق</strong>: نظّم الاختبارات في مراحل التهيئة والتنفيذ والتحقق.</li>
</ul>
<h2 id="توخ-الحذر-مع-المحاكاة-العامة">توخَّ الحذر مع المحاكاة العامة</h2>
<ul>
<li><strong>أعِد الكائنات العامة</strong>: عند محاكاة كائنات عامة (مثل <code>fetch</code> أو <code>console</code>)، احرص على إعادتها بعد الاختبار.</li>
</ul>
<h2 id="المزالق-الشائعة-وكيف-تتجنبها">المزالق الشائعة وكيف تتجنّبها</h2>
<h3 id="الإفراط-في-استخدام-البدائل-المحاكاة">الإفراط في استخدام البدائل المُحاكاة</h3>
<p><strong>المشكلة</strong>: المحاكاة المفرطة قد تؤدي إلى اختبارات تنجح حتى عندما تكون الشيفرة معطوبة.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>حاكِ الاعتمادات الخارجية فقط.</li>
<li>اسمح للشيفرة قيد الاختبار بتنفيذ أكبر قدر ممكن من المنطق الحقيقي.</li>
</ul>
<h3 id="تسرب-البدائل-المحاكاة-بين-الاختبارات">تسرّب البدائل المُحاكاة بين الاختبارات</h3>
<p><strong>المشكلة</strong>: تحتفظ البدائل المُحاكاة بحالتها بين الاختبارات، مما يسبب سلوكًا غير متوقع.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>استخدم <code>vi.resetAllMocks()</code> أو <code>vi.clearAllMocks()</code> داخل خُطّاف <code>beforeEach</code> أو <code>afterEach</code>.</li>
</ul>
<h3 id="نسيان-إعادة-الوحدات-المحاكاة">نسيان إعادة الوحدات المُحاكاة</h3>
<p><strong>المشكلة</strong>: تبقى الوحدات المُحاكاة قائمة عبر الاختبارات.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>استخدم <code>vi.resetModules()</code> لإعادة ضبط سجل الوحدات إن لزم. <code><span class="line"><span style="color:#82AAFF;font-style:italic">beforeEach</span><span style="color:#D6DEEB">(</span><span style="color:#D9F5DD">()</span><span style="color:#C792EA"> =&gt;</span><span style="color:#D6DEEB"> {</span></span>
<span class="line"><span style="color:#7FDBCA;font-style:italic"> vi</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#82AAFF;font-style:italic">resetModules</span><span style="color:#D6DEEB">();</span></span>
<span class="line"><span style="color:#D6DEEB">});</span></span></code></li>
</ul>
<h3 id="اختبار-تفاصيل-التنفيذ">اختبار تفاصيل التنفيذ</h3>
<p><strong>المشكلة</strong>: تنكسر الاختبارات عندما يتغير التنفيذ الداخلي، حتى لو بقي السلوك الخارجي كما هو.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>ركّز على اختبار المخرجات والآثار الجانبية.</li>
<li>استخدم البدائل المُحاكاة والجواسيس للتحقق من التفاعلات، لا من المنطق الداخلي.</li>
</ul>
`,i={book:n,chapter:s,chapterTitle:t,slug:e,title:o,headings:l,html:c};export{n as book,s as chapter,t as chapterTitle,i as default,l as headings,c as html,e as slug,o as title};
