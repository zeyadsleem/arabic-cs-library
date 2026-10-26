const s="kinney",n="visual-studio-code",t="Visual Studio Code",a="debugging-web-applications",l="تنقيح تطبيقات الويب",e=[{depth:2,id:"إضافة-الإعداد",text:"إضافة الإعداد"},{depth:2,id:"تشغيل-التطبيق",text:"تشغيل التطبيق"},{depth:2,id:"أمثلة-على-سيناريوهات-التنقيح",text:"أمثلة على سيناريوهات التنقيح"},{depth:3,id:"تنقيح-additem",text:"تنقيح addItem"},{depth:3,id:"تنقيح-calculatetotal",text:"تنقيح calculateTotal"},{depth:3,id:"تنقيح-removeitem",text:"تنقيح removeItem"},{depth:3,id:"تنقيح-useeffect",text:"تنقيح useEffect"},{depth:3,id:"فحص-حالة-مكونات-react",text:"فحص حالة مكوّنات React"}],o=`<p>يمكنك أيضًا الإرفاق بتطبيقات الويب قيد التشغيل بسهولة عبر Visual Studio Code.</p>
<h2 id="إضافة-الإعداد">إضافة الإعداد</h2>
<p><strong>أضف إعداد تشغيل للتنقيح إلى <code>.vscode/launch.json</code>:</strong> إن لم يكن مجلد <code>.vscode</code> موجودًا فأنشئه، ثم أنشئ ملف <code>launch.json</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;chrome&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Launch Chrome against localhost&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://localhost:5173&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;webRoot&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${workspaceFolder}&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="تشغيل-التطبيق">تشغيل التطبيق</h2>
<ul>
<li>في الطرفية، شغّل <code>npm run dev</code>.</li>
<li>في عرض Debug في Visual Studio Code، اختر “Launch Chrome against localhost” (أو “Launch Edge against localhost”) واضغط F5.</li>
</ul>
<h2 id="أمثلة-على-سيناريوهات-التنقيح">أمثلة على سيناريوهات التنقيح</h2>
<h3 id="تنقيح-additem">تنقيح <code>addItem</code></h3>
<ul>
<li>ضع نقطة توقّف داخل دالة <code>addItem</code>.</li>
<li>أضف عنصرًا إلى القائمة.</li>
<li>تقدّم في الشيفرة سطرًا بسطر وافحص المتغيّرات <code>newItem</code> و<code>items</code> و<code>setItems</code>.</li>
</ul>
<h3 id="تنقيح-calculatetotal">تنقيح <code>calculateTotal</code></h3>
<ul>
<li>ضع نقطة توقّف داخل دالة <code>calculateTotal</code>.</li>
<li>أضف عناصر أو احذفها لتحفيز إعادة الحساب.</li>
<li>افحص المتغيّرات <code>sum</code> و<code>items</code> و<code>total</code>.</li>
</ul>
<h3 id="تنقيح-removeitem">تنقيح <code>removeItem</code></h3>
<ul>
<li>ضع نقطة توقّف داخل دالة removeItem.</li>
<li>احذف عنصرًا من القائمة.</li>
<li>تحقّق من محتوى المصفوفة <code>newItems</code>.</li>
</ul>
<h3 id="تنقيح-useeffect">تنقيح useEffect</h3>
<ul>
<li>ضع نقطة توقّف داخل دالة الاستدعاء الخاصة بـ useEffect.</li>
<li>أضف عناصر إلى القائمة أو احذفها، وتحقق من استدعاء useEffect.</li>
<li>تحقّق من تحديث المجموع بشكل صحيح.</li>
</ul>
<h3 id="فحص-حالة-مكونات-react">فحص حالة مكوّنات React</h3>
<ul>
<li>استخدم إضافة React Developer Tools في Chrome أو Edge لفحص حالة المكوّن وخصائصه. وهذا يتيح لك ملاحظة كيف تتغيّر الحالة بمرور الوقت.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:e,html:o};export{s as book,n as chapter,t as chapterTitle,c as default,e as headings,o as html,a as slug,l as title};
