const s="effective-go",e="methods",n="الطرق",a="index",p="الطرق",c=[{depth:2,id:"المؤشرات-مقابل-القيم",text:"المؤشرات مقابل القيم"}],l=`<h2 id="المؤشرات-مقابل-القيم">المؤشرات مقابل القيم</h2>
<p>كما رأينا مع <code>ByteSize</code>، يمكن تعريف طرق لأي نوع مُسمّى (ما عدا المؤشرات والواجهات)؛ فالمُستقبِل لا يلزم أن يكون بنية (struct).</p>
<p>وفي الحديث عن الشرائح أعلاه، كتبنا دالة <code>Append</code>. يمكننا بدلًا من ذلك تعريفها طريقةً على الشرائح. ولتنفيذ ذلك، نُعرّف أولًا نوعًا مُسمّىً نربط به الطريقة، ثم نجعل مُستقبِل الطريقة قيمةً من ذلك النوع:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> ByteSlice []<span class="hljs-type">byte</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(slice ByteSlice)</span></span> Append(data []<span class="hljs-type">byte</span>) []<span class="hljs-type">byte</span> {
    <span class="hljs-comment">// Body exactly the same as the Append function defined above.</span>
}
</code></pre>
<p>وهذا ما زال يتطلّب من الطريقة أن تُرجع الشريحة المحدَّثة. ويمكننا التخلّص من هذا التردّه بإعادة تعريف الطريقة لتأخذ مؤشرًا إلى <code>ByteSlice</code> كمُستقبِل لها، فتستطيع الطريقة أن تكتب فوق شريحة المنادي:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *ByteSlice)</span></span> Append(data []<span class="hljs-type">byte</span>) {
    slice := *p
    <span class="hljs-comment">// Body as above, without the return.</span>
    *p = slice
}
</code></pre>
<p>وفي الحقيقة يمكننا أن نفعل أفضل من ذلك. فإن عدّلنا دالتنا لتبدو كطريقة <code>Write</code> المعتادة، هكذا:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(p *ByteSlice)</span></span> Write(data []<span class="hljs-type">byte</span>) (n <span class="hljs-type">int</span>, err <span class="hljs-type">error</span>) {
    slice := *p
    <span class="hljs-comment">// Again as above.</span>
    *p = slice
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(data), <span class="hljs-literal">nil</span>
}
</code></pre>
<p>يصبح النوع <code>*ByteSlice</code> عندئذٍ مُشبعًا للواجهة المعتادة <code>io.Writer</code>، وهذا عملي. فمثلًا يمكننا أن نطبع داخل واحدة منها:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> b ByteSlice
fmt.Fprintf(&amp;b, <span class="hljs-string">&quot;This hour has %d days\\n&quot;</span>, <span class="hljs-number">7</span>)
</code></pre>
<p>ونمرّر عنوان <code>ByteSlice</code> لأن <code>*ByteSlice</code> وحدها تشبع <code>io.Writer</code>. أمّا القاعدة الخاصة بالمؤشرات مقابل القيم في المُستقبِلات فهي أن طرق القيمة يمكن نداءها على المؤشرات وعلى القيم، أما طرق المؤشر فلا يمكن نداءها إلا على المؤشرات.</p>
<p>وتنبع هذه القاعدة من أن طرق المؤشر تستطيع تعديل المُستقبِل؛ فإن نداءها على قيمة كانت ستجعل الدالة تستقبل نسخة من القيمة، فتُهمَل أي تعديلات تُحدث عليها. ولذلك تمنع اللغة هذا الخطأ. غير أن هناك استثناءً عمليًا: فحين تكون القيمة قابلة لأخذ عنوان (addressable) تتولّى اللغة الحالة الشائعة — نداء طريقة مؤشِّر على قيمة — بإدراج معامل العنونة تلقائيًا. وفي مثالنا، المتغيّر <code>b</code> قابل لأخذ عنوان، ومن ثمّ يمكننا نداء طريقة <code>Write</code> الخاصة به بمجرّد <code>b.Write</code>؛ إذ يعيد المُصرِّف كتابتها إلى <code>(&amp;b).Write</code> نيابةً عنا.</p>
<p>وبالمناسبة، فإن فكرة استعمال <code>Write</code> على شريحة بايت هي جوهر تنفيذ <code>bytes.Buffer</code>.</p>
`,t={book:s,chapter:e,chapterTitle:n,slug:a,title:p,headings:c,html:l};export{s as book,e as chapter,n as chapterTitle,t as default,c as headings,l as html,a as slug,p as title};
