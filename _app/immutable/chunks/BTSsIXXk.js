const s="kinney",e="visual-studio-code",a="Visual Studio Code",n="vscode-emmet-solutions",t="Emmet في Visual Studio Code: الحلول",l=[{depth:2,id:"فقرة-أساسية",text:"فقرة أساسية"},{depth:2,id:"قائمة-غير-مرتبة-بسيطة",text:"قائمة غير مرتّبة بسيطة"},{depth:2,id:"عنصر-صورة-مع-خصائص",text:"عنصر صورة مع خصائص"},{depth:2,id:"بنية-div-متداخلة",text:"بنية div متداخلة"},{depth:2,id:"ترويسة-مع-تنقل",text:"ترويسة مع تنقّل"}],c=`<p>إليك بعض الحلول الممكنة <a href="https://stevekinney.com/courses/visual-studio-code/vscode-emmet-exercises">لهذه التمارين</a>.</p>
<h2 id="فقرة-أساسية">فقرة أساسية</h2>
<pre><code class="language-css"><span class="hljs-selector-tag">p</span>{Hello, world!}
</code></pre>
<p>عبارة كلاسيكية — يمكنك استبدال النص بأي شيء يروق لك.</p>
<h2 id="قائمة-غير-مرتبة-بسيطة">قائمة غير مرتّبة بسيطة</h2>
<pre><code class="language-css"><span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-tag">li</span>{Item}*<span class="hljs-number">3</span>
</code></pre>
<p>يمنحك هذا ثلاثة عناصر قائمة تهتف «Item» — مثالي عندما تحتاج إلى تكرار بسيط.</p>
<h2 id="عنصر-صورة-مع-خصائص">عنصر صورة مع خصائص</h2>
<pre><code class="language-css"><span class="hljs-selector-tag">img</span><span class="hljs-selector-attr">[src=<span class="hljs-string">&#x27;image.jpg&#x27;</span>]</span><span class="hljs-selector-attr">[alt=<span class="hljs-string">&#x27;Placeholder Image&#x27;</span>]</span>
</code></pre>
<p>لا زخرفة هنا: وسم صورة مع المصدر والنص البديل. إنه مثل الزيّ الأساسي لصور HTML.</p>
<h2 id="بنية-div-متداخلة">بنية div متداخلة</h2>
<pre><code class="language-css"><span class="hljs-selector-tag">div</span>&gt;<span class="hljs-selector-tag">div</span>
</code></pre>
<p>div أب يحوي div ابنًا. الأمر بسيط كتداخل آمالك في حلم.</p>
<h2 id="ترويسة-مع-تنقل">ترويسة مع تنقّل</h2>
<pre><code class="language-css"><span class="hljs-selector-tag">header</span>&gt;<span class="hljs-selector-tag">nav</span>&gt;<span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-tag">li</span>*<span class="hljs-number">2</span>
</code></pre>
<p>ترويسة مع nav يلتفّ حول قائمة من عنصرين. إنه تخطيط مصغّر بأبسط ما يكون.</p>
`,p={book:s,chapter:e,chapterTitle:a,slug:n,title:t,headings:l,html:c};export{s as book,e as chapter,a as chapterTitle,p as default,l as headings,c as html,n as slug,t as title};
