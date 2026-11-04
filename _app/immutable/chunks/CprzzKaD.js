const e="ocaml-manual",n="ch35",o="مكتبة threads",c="index",t="مكتبة threads",a=[],d=`<h1>الفصل 35: مكتبة threads</h1>
<p>تتيح مكتبة <code>threads</code> البرمجة المتزامنة في OCaml. وهي توفّر عدة خيوط تحكّم (تُسمّى أيضًا عمليات خفيفة) تُنفَّذ تنفيذًا متزامنًا في فضاء الذاكرة نفسه. وتتواصل الخيوط بتعديل بنى البيانات المشتركة في مكانها، أو بإرسال البيانات وتلقّيها عبر قنوات التواصل.</p>
<p>ومكتبة <code>threads</code> منفَّذة فوق مرافق الخيوط التي يوفّرها نظام التشغيل: خيوط POSIX 1003.1c في Linux وMacOS وغيرهما من الأنظمة الشبيهة بـ Unix؛ وخيوط Win32 في Windows. ولا يُسمح إلا لخيط واحد في كل لحظة بتنفيذ شيفرة OCaml على نطاق معيّن (انظر القسم 9.5.1). ومن ثمّ تقتصر فرص التوازي على أجزاء البرنامج التي تنفّذ شيفرة النظام أو شيفرة مكتبات C. غير أن الخيوط توفّر التزامن، ويمكن استعمالها لتنظيم البرامج على هيئة عدة عمليات متواصلة. كما تدعم الخيوط بكفاءة عمليات الإدخال/الإخراج المتزامنة والمتداخلة.</p>
<p>ويجب ربط البرامج التي تستعمل الخيوط على النحو التالي:</p>
<pre><code class="language-text">        ocamlc -I +unix -I +threads other options unix.cma threads.cma other files
        ocamlopt -I +unix -I +threads other options unix.cmxa threads.cmxa other files
</code></pre>
<p>ويجب أيضًا ترجمة وحدات الترجمة التي تستعمل مكتبة <code>threads</code> بالخيار <code>-I +threads</code> (انظر الفصل 13).</p>
<ul>
<li>
<p>الوحدة <code>Thread</code>: خيوط خفيفة</p>
</li>
<li>
<p>الوحدة <code>Event</code>: تواصل متزامن من المرتبة الأولى</p>
</li>
</ul>
`,s={book:e,chapter:n,chapterTitle:o,slug:c,title:t,headings:a,html:d};export{e as book,n as chapter,o as chapterTitle,s as default,a as headings,d as html,c as slug,t as title};
