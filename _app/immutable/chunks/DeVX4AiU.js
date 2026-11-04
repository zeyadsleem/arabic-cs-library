const e="ocaml-manual",t="ch25",n="الاختبار العشوائي باستخدام afl-fuzz",o="index",a="الاختبار العشوائي باستخدام afl-fuzz",c=[{depth:2,id:"251-نظرة-عامة",text:"25.1 نظرة عامة"},{depth:2,id:"252-توليد-التجهيز",text:"25.2 توليد التجهيز"},{depth:3,id:"2521-خيارات-متقدمة",text:"25.2.1 خيارات متقدّمة"},{depth:2,id:"253-مثال",text:"25.3 مثال"}],l=`<h1>الفصل 25: الاختبار العشوائي باستخدام afl-fuzz</h1>
<h2 id="251-نظرة-عامة">25.1 نظرة عامة</h2>
<p>«American fuzzy lop» (أو «afl-fuzz») أداة <em>اختبار عشوائي</em> (fuzzer)، أي أداة لاختبار البرمجيات بتزويدها مدخلات مولَّدة عشوائيًا والبحث عن المدخلات التي تُسبّب انهيار البرنامج.</p>
<p>وخلافًا لمعظم أدوات الاختبار العشوائي، تراقب afl-fuzz السلوك الداخلي للبرنامج المُختبَر، وتعدّل حالات الاختبار التي تولّدها كي تبلغ مسارات تنفيذ لم تُستكشف بعد. ونتيجةً لذلك، تغطّي حالات الاختبار التي تولّدها afl-fuzz من سلوكيات البرنامج المُختبَر أكثر ممّا تغطّيه الأدوات الأخرى.</p>
<p>ويتطلّب ذلك أن تكون البرامج المُختبَرة مُجهَّزة بأدوات قياس تتواصل مع afl-fuzz. ويستطيع مترجم الشيفرة الأصلية «ocamlopt» توليد هذا التجهيز، ممّا يتيح استعمال afl-fuzz مع البرامج المكتوبة بلغة OCaml.</p>
<p>لمزيد من المعلومات عن afl-fuzz، انظر الموقع <a href="http://lcamtuf.coredump.cx/afl/">http://lcamtuf.coredump.cx/afl/</a>.</p>
<h2 id="252-توليد-التجهيز">25.2 توليد التجهيز</h2>
<p>التجهيز الذي تحتاجه afl-fuzz لا يُولَّد افتراضيًا، بل يجب تمكينه صراحةً بتمرير الخيار <code>-afl-instrument</code> إلى <code>ocamlopt</code>.</p>
<p>ولاختبار نظام كبير دون تعديل أدوات البناء، يقبل سكربت <code>configure</code> الخاص بـ OCaml أيضًا الخيار <code>afl-instrument</code>. فإذا كان OCaml مهيّأً بـ <code>afl-instrument</code>، جُهّزت كل البرامج التي يُصرّفها <code>ocamlopt</code>.</p>
<h3 id="2521-خيارات-متقدمة">25.2.1 خيارات متقدّمة</h3>
<p>في حالات نادرة، يفيد التحكّم في مقدار التجهيز المولَّد. فبتمرير الوسيطة <code>-afl-inst-ratio N</code> إلى <code>ocamlopt</code> حيث <code>N</code> أقل من 100، يمكن توليد التجهيز لنسبة <code>N</code> بالمئة من الفروع فقط. (انظر توثيق afl-fuzz حول المعامل <code>AFL_INST_RATIO</code> لمعرفة أثره الدقيق.)</p>
<h2 id="253-مثال">25.3 مثال</h2>
<p>على سبيل المثال، نُخضع البرنامج التالي <code>readline.ml</code> لاختبار عشوائي:</p>
<pre><code class="language-text">let _ =
  let s = read_line () in
  match Array.to_list (Array.init (String.length s) (String.get s)) with
    [&#x27;s&#x27;; &#x27;e&#x27;; &#x27;c&#x27;; &#x27;r&#x27;; &#x27;e&#x27;; &#x27;t&#x27;; &#x27; &#x27;; &#x27;c&#x27;; &#x27;o&#x27;; &#x27;d&#x27;; &#x27;e&#x27;] -&gt; failwith &quot;uh oh&quot;
  | _ -&gt; ()
</code></pre>
<p>ثمّة مدخل واحد (السلسلة «secret code») يجعل هذا البرنامج ينهار، لكن العثور عليه ببحث عشوائي أعمى غير عملي.</p>
<p>لذلك نُصرّف البرنامج مع تمكين تجهيز afl-fuzz:</p>
<pre><code class="language-text">ocamlopt -afl-instrument readline.ml -o readline
</code></pre>
<p>ثم نشغّل البرنامج تحت afl-fuzz:</p>
<pre><code class="language-text">mkdir input
echo asdf &gt; input/testcase
mkdir output
afl-fuzz -m none -i input -o output ./readline
</code></pre>
<p>وبفحص خَرْج التجهيز، تجد الأداة المدخل المُسبِّب للانهيار سريعًا.</p>
<p>ملاحظة: لاختبار برنامج OCaml عشوائيًا باستخدام afl-fuzz، يلزم تمرير الخيار <code>-m none</code> لتعطيل حدّ الذاكرة الافتراضي لأداة afl-fuzz وقدره 50 ميغابايت.</p>
`,d={book:e,chapter:t,chapterTitle:n,slug:o,title:a,headings:c,html:l};export{e as book,t as chapter,n as chapterTitle,d as default,c as headings,l as html,o as slug,a as title};
