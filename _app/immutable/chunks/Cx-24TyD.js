const e="ocaml-manual",n="ch34",t="مكتبة runtime_events",o="index",c="مكتبة runtime_events",s=[],i=`<h1>الفصل 34: مكتبة runtime_events</h1>
<p>توفّر مكتبة <code>runtime_events</code> واجهة برمجية لاستهلاك معلومات تتبّع زمن التشغيل ومقاييسه. انظر الفصل 26 لمزيد من المعلومات.</p>
<p>ويجب ربط البرامج التي تستعمل runtime_events على النحو التالي:</p>
<pre><code class="language-text">        ocamlc -I +runtime_events other options unix.cma runtime_events.cma other files
        ocamlopt -I +runtime_events other options unix.cmxa runtime_events.cmxa other files
</code></pre>
<p>ويجب أيضًا ترجمة وحدات الترجمة التي تستعمل مكتبة runtime_events بالخيار <code>-I +runtime_events</code> (انظر الفصل 13).</p>
<ul>
<li>الوحدة <code>Runtime_events</code>: نظام التتبّع</li>
</ul>
`,m={book:e,chapter:n,chapterTitle:t,slug:o,title:c,headings:s,html:i};export{e as book,n as chapter,t as chapterTitle,m as default,s as headings,i as html,o as slug,c as title};
