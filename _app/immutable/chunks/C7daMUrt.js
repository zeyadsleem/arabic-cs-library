const e="use-the-index-luke",p="sql-explain-plan-sqlbase-operations",o="العمليات",n="index",t="عمليات خطة التنفيذ في SQLBase",c=[{depth:2,id:"الوصول-إلى-الفهرس-والجدول",text:"الوصول إلى الفهرس والجدول"},{depth:2,id:"عمليات-الربط",text:"عمليات الربط"},{depth:2,id:"الترتيب-والتجميع",text:"الترتيب والتجميع"},{depth:2,id:"استعلامات-top-n",text:"استعلامات Top-N"}],s=`<p>مرجع قصير لأشهر عمليات خطة التنفيذ في SQLBase. وهو مأخوذ أساساً من <a href="https://otdskcprd.opentext.com/otdsws/login?client_id=KC&amp;response_mode=form_post&amp;response_type=id_token&amp;scope=openid%20otds%3Aroles&amp;state=OpenIdConnect.AuthenticationProperties%3DMF3vIitnPYSRw-8z5vaNCv50Lgbjwuu8I1WnVCmV68QPybRq26aS1Zfi3J5rGawYb9fgorY8pa8ENqfafsab4vZS6ueLr0rBY_1X5GZCS7__cUvyPhe5pqLozAKRerA6chkwFNHNtweSJ-PO8-IjoAPyXvWu02z5520FCqjC1NxKTj37b5q0cGgEX9QnQZ1B&amp;nonce=638289879473055210.NTFhZWVlYmEtZmQwNi00MzZjLWEwOTgtODM0YzM1YWVhZWY0MTlkYmY4MGItMjUzNi00MDk0LWE3M2ItOTgxZDYyZDNlZWMw&amp;redirect_uri=https%3A%2F%2Fknowledge.opentext.com%2Fotdsagent&amp;x-client-SKU=ID_NET461&amp;x-client-ver=5.3.0.0#10065">وثائق API</a>، التي تبدو ناقصة إلى حد كبير. وللدليل المتقدم فصل ثانٍ عن <a href="http://support.guptatechnologies.com/Docs/SQLBaseDoc116/chpt16.html#481">العمليات الفيزيائية</a> أيضاً، لكنه لا يشرح كيفية تمييزها في خطة التنفيذ.</p>
<h2 id="الوصول-إلى-الفهرس-والجدول">الوصول إلى الفهرس والجدول</h2>
<p>على غرار MySQL كثيراً، يعرض SQLBase سطراً واحداً لكل وصول إلى جدول في خطة التنفيذ. وترتيب الوصول، مثل MySQL أيضاً، من الأعلى إلى الأسفل: السطر الأول في خطة التنفيذ يقابل أول جدول يُوصَل إليه.</p>
<p>سيُعرض الفهرس المستخدم أيضاً في عمود <code>INDEX</code>.</p>
<p>ولا يعطي SQLBase أي إشارات إلى مسوحات النطاق مقابل الفريدة أو مسوحات الفهرس فقط («Index-only table access»).</p>
<p>وتقدّم القائمة التالية جدولاً مرجعياً مختصراً للعمليات الفيزيائية المعروفة في SQLBase مقابل نظيراتها في Oracle. وللأسف لا تظهر أسماء هذه العمليات الفيزيائية في خطة تنفيذ SQLBase:</p>
<p>Index leaf scanتقابل <code>INDEX FULL SCAN</code> في Oracle: تقرأ الفهرس بترتيبه. ويشمل <code>Index leaf scan</code> أيضاً الوصول اللاحق إلى الجدول عند الحاجة.</p>
<p>Matching index scan</p>
<p>يقابل <code>INDEX RANGE/UNIQUE SCAN</code> في Oracle مع <code>TABLE ACCESS BY INDEX ROWID</code> اللاحق عند الحاجة.</p>
<h2 id="عمليات-الربط">عمليات الربط</h2>
<p>تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».</p>
<p>تشير وثائق SQLBase وخطط التنفيذ إلى الجداول المؤقتة باعتبارها النتيجة الوسيطة. وتذكر الوثائق أيضاً جداول مؤقتة على القرص — ولا يتضح لي هل يعني ذلك أن النتائج الوسيطة تُجسَّد دائماً.</p>
<p>ويدعم SQLBase جميع تقنيات الربط الأساسية الثلاث:</p>
<p>NESTED LOOP / INDEX LOOP / ربط الحلقات بفهرس تجزئة</p>
<p>هذه في الأساس عمليات ربط بحلقات متداخلة، وتختلف فقط في الفهارس المستخدمة: <code>Simple loop join</code> لا يستخدم فهارس إطلاقاً (وقد يكرر المسوحات الكاملة على الجدول الداخلي)، أما <code>Loop join with (hash) index</code> فيستخدم فهرساً على الجدول الداخلي (وقد يكون فهرس تجزئة في حالة الربط المتساوي).</p>
<p>MERGE JOIN</p>
<p>ربط دمج الفهرس (المعروض كـ<code>MERGE JOIN</code> في خطة التنفيذ) هو ربط دمج بالترتيب مع شرط مسبق بوجود فهارس على أعمدة الربط في الجدولين — ما يمنع الحاجة إلى أي عملية فرز.</p>
<p>HASH JOIN</p>
<p>هو ربط بالتجزئة، كما يوحي الاسم.</p>
<h2 id="الترتيب-والتجميع">الترتيب والتجميع</h2>
<p>لا يشير SQLBase إلى عمليات الفرز أو التجميع في خطة التنفيذ. غير أنه قادر على الاستفادة من فهرس لإزالة عمليات الفرز. لاحظ أن SQLBase يدعم أيضاً مُعدِّلَي <code>ASC</code>/<code>DESC</code> في <code>CREATE INDEX</code>.</p>
<h2 id="استعلامات-top-n">استعلامات Top-N</h2>
<p>يمكن تنفيذ استعلامات Top-N باستخدام معامل جلسة:</p>
<pre><code>SET LIMIT n
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
</code></pre>
<pre><code>SET LIMIT off
</code></pre>
<p>ويبدو أن ذلك لا يؤثر في التحسين. ولحمل المُحسِّن على تفضيل تنفيذ Top-N متدفق عند جلب جزء صغير من النتيجة الكاملة، استخدم <a href="http://support.guptatechnologies.com/Docs/SQLBaseDoc116/sqltalk_cmd_ref.html#7726">خيار «Optimize first fetch»</a>:</p>
<pre><code>SET OPTIMIZEFIRSTFETCH 1
</code></pre>
<p>سيحسّن المُحسِّن الآن خطة التنفيذ بحيث يُعاد الصف الأول بأسرع ما يمكن. ولا تنسَ العودة إلى نمط التحسين الكامل بعد ذلك:</p>
<pre><code>SET OPTIMIZEFIRSTFETCH 0
</code></pre>
<p>ولا تشير خطة التنفيذ إلى وجود حد Top-N، ولا إلى غياب عملية فرز للدلالة على تنفيذ متدفق.</p>
`,a={book:e,chapter:p,chapterTitle:o,slug:n,title:t,headings:c,html:s};export{e as book,p as chapter,o as chapterTitle,a as default,c as headings,s as html,n as slug,t as title};
