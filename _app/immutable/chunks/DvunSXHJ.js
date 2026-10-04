const s="effective-go",n="web-server",t="خادم ويب",a="index",e="خادم ويب",p=[],o=`<p>لنختم ببرنامج Go كامل، خادم ويب. وهذا في الواقع نوع من خوادم الويب من نوع «إعادة». فجوجل توفّر خدمة على <code>chart.apis.google.com</code> تنسّق البيانات تلقائيًا في شكل رسوم بيانية ومخطّطات. غير أن استعمالها تفاعليًا صعب، لأن عليك وضع البيانات في عنوان URL كاستعلام. ويوفّر البرنامج هنا واجهة أجمل لشكل واحد من البيانات: فمعطى نصًّا قصيرًا، ينادي خادم الرسوم لتوليد رمز QR، وهو مصفوفة مربّعات تُرمِّز النص.</p>
<p>ويمكن التقاط تلك الصورة بكاميرا هاتفك وتفسيرها على أنها مثلًا عنوان URL، فيوفّرك كتابة العنوان في لوحة مفاتيح الهاتف الصغيرة.</p>
<p>وهذا هو البرنامج الكامل. ويأتي الشرح بعده.</p>
<pre><code class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;flag&quot;</span>
    <span class="hljs-string">&quot;html/template&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>
    <span class="hljs-string">&quot;net/http&quot;</span>
)

<span class="hljs-keyword">var</span> addr = flag.String(<span class="hljs-string">&quot;addr&quot;</span>, <span class="hljs-string">&quot;:1718&quot;</span>, <span class="hljs-string">&quot;http service address&quot;</span>) <span class="hljs-comment">// Q=17, R=18</span>

<span class="hljs-keyword">var</span> templ = template.Must(template.New(<span class="hljs-string">&quot;qr&quot;</span>).Parse(templateStr))

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    flag.Parse()
    http.Handle(<span class="hljs-string">&quot;/&quot;</span>, http.HandlerFunc(QR))
    err := http.ListenAndServe(*addr, <span class="hljs-literal">nil</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;ListenAndServe:&quot;</span>, err)
    }
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">QR</span><span class="hljs-params">(w http.ResponseWriter, req *http.Request)</span></span> {
    templ.Execute(w, req.FormValue(<span class="hljs-string">&quot;s&quot;</span>))
}

<span class="hljs-keyword">const</span> templateStr = <span class="hljs-string">\`

&lt;head&gt;
&lt;title&gt;QR Link Generator&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
{{if .}}
&lt;img src=&quot;http://chart.apis.google.com/chart?chs=300x300&amp;cht=qr&amp;choe=UTF-8&amp;chl={{.}}&quot; /&gt;
&lt;br&gt;
{{.}}
&lt;br&gt;
&lt;br&gt;
{{end}}
&lt;form action=&quot;/&quot; name=f method=&quot;GET&quot;&gt;
    &lt;input maxLength=1024 size=70 name=s value=&quot;&quot; title=&quot;Text to QR Encode&quot;&gt;
    &lt;input type=submit value=&quot;Show QR&quot; name=qr&gt;
&lt;/form&gt;
&lt;/body&gt;

\`</span>
</code></pre>
<p>الأجزاء حتى <code>main</code> يسهل تتبّعها. فالراية الواحدة تضبط منفذ HTTP افتراضيًا لخادمنا. أمّا متغيّر القالب <code>templ</code> فهنا يحدث السحر: فهو يبني قالب HTML سيُنفَّذ من الخادم لعرض الصفحة؛ والمزيد عنه بعد قليل.</p>
<p>وتحلّل دالة <code>main</code> الرايات، ثم — بالأليّة التي تحدثنا عنها أعلاه — تربط الدالة <code>QR</code> بالمسار الجذري للخادم. ثم يُنادى <code>http.ListenAndServe</code> لبدء الخادم، وهو يحظر ما دام الخادم يعمل.</p>
<p>أما <code>QR</code> فمجرّد ما تستقبل الطلب، الذي يحوي بيانات النموذج، وتُنفّذ القالب على البيانات الموجودة في قيمة النموذج المسمّاة <code>s</code>.</p>
<p>وحزمة القوالب <code>html/template</code> قويّة؛ وهذا البرنامج لا يلمس سوى قدرات منها. وبجوهرها، فإنها تعيد كتابة قطعة من نصّ HTML أثناء العمل باستبدال عناصر مشتقّة من عناصر بيانات تُمرَّر إلى <code>templ.Execute</code>، وهي هنا قيمة النموذج.</p>
<p>وداخل نصّ القالب (<code>templateStr</code>)، تشكّل القطع المحاطة بأقواس معقوفة مزدوجة إجراءات القالب. فالقطعة من <code>{{if .}}</code> إلى <code>{{end}}</code> تُنفَّذ فقط إن كانت قيمة عنصر البيانات الحالي، المسمّى <code>.</code> (dot)، غير فارغة. أي أنه عندما يكون النص فارغًا، تُحذف هذه القطعة من القالب.</p>
<p>أما المقطعان <code>{{.}}</code> فيقولان إن اعرض البيانات المقدَّمة للقالب — وهي سلسلة الاستعلام — في صفحة الويب. وتوفّر حزمة قوالب HTML تلقائيًا التهريب (escaping) المناسب، فيصبح النص آمنًا للعرض.</p>
<p>وبقية نصّ القالب ليست سوى HTML يُعرض عند تحميل الصفحة. وإن كان هذا الشرح سريعًا أكثر من اللازم، فراجع توثيق حزمة <code>template</code> لمناقشة أشمل.</p>
<p>وهكذاأمامك خادم ويب مفيد في بضعة أسطر من الشيفرة، مع نصّ HTML مبني على البيانات. وGo قوية بما يكفي لأن يحدث الكثير في بضعة أسطر.</p>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:o};export{s as book,n as chapter,t as chapterTitle,l as default,p as headings,o as html,a as slug,e as title};
