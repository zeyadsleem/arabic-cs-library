const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",t="transforms-and-coercion-with-zod",l="التحويلات والإكراه مع Zod",p=[{depth:2,id:"الاستفادة-من-التحويل-لإنشاء-أنواع-متخصصة",text:"الاستفادة من التحويل لإنشاء أنواع متخصّصة"},{depth:2,id:"تسلسل-التحويلات-في-خط-أنابيب",text:"تسلسل التحويلات في خط أنابيب"},{depth:3,id:"مثال-الجمع-بين-التحقق-وتحويلات-متسلسلة",text:"مثال: الجمع بين التحقّق وتحويلات متسلسلة"}],c=`<h2 id="الاستفادة-من-التحويل-لإنشاء-أنواع-متخصصة">الاستفادة من التحويل لإنشاء أنواع متخصّصة</h2>
<p>أحيانًا تريد تحويلًا (transform): لنقل إنك تقبل <code>string</code> لكن تخزّنه كـ <code>Date</code>. طريقة <code>.transform()</code> في Zod معك. ما زلت تتحقّق من المدخل أولًا، ثم تحوّله إلى الصيغة التي تحتاجها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> dateSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">refine</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> !<span class="hljs-built_in">isNaN</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val).<span class="hljs-title function_">valueOf</span>()), {
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Invalid date string&#x27;</span>,
  })
  .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(val));

<span class="hljs-comment">// Now your run-of-the-mill string is validated and transformed into a Date object</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">date</span>: <span class="hljs-title class_">Date</span> = dateSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;2025-03-20&#x27;</span>);
</code></pre>
<p>هذه المقاربة رائعة لسدّ الفجوة بين ما تبدو عليه واجهة API أو مدخلات النموذج وما تحتاجه شيفرتك فعلًا.</p>
<h2 id="تسلسل-التحويلات-في-خط-أنابيب">تسلسل التحويلات في خط أنابيب</h2>
<p>يتيح Zod تسلسل التحويلات. فيمكنك استخدام <code>.transform()</code> عدة مرات، بشرط أن يطابق نوع مخرَج كل تحويل نوع مُدخَل التحويل التالي.</p>
<h3 id="مثال-الجمع-بين-التحقق-وتحويلات-متسلسلة">مثال: الجمع بين التحقّق وتحويلات متسلسلة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Start with a string</span>
<span class="hljs-keyword">const</span> pipeline = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val.<span class="hljs-title function_">trim</span>()) <span class="hljs-comment">// first transform</span>
  .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">trimmed</span>) =&gt;</span> trimmed.<span class="hljs-title function_">toUpperCase</span>()); <span class="hljs-comment">// second transform</span>

<span class="hljs-comment">// &quot; hello &quot; -&gt; &quot;hello&quot; -&gt; &quot;HELLO&quot;</span>
pipeline.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;  hello  &#x27;</span>);
</code></pre>
<p>يمكنك أيضًا إجراء فحوص متقدمة بين التحويلات. وللتحويلات متعددة الخطوات، فكّر هل قد يكون <code>.superRefine()</code> أبسط إن احتجت إلى إضافة عدة مشكلات خطأ.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
