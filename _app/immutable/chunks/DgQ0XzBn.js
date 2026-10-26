const n="kinney",e="react-typescript",t="React مع TypeScript",p="componenttype-hocs-render-props",o="ComponentType والمكوّنات ذات الرتبة العليا وخصائص التصيير",s=[{depth:2,id:"للمكونات-ذات-الرتبة-العليا",text:"للمكوّنات ذات الرتبة العليا"},{depth:2,id:"لأنماط-خصائص-التصيير",text:"لأنماط خصائص التصيير"},{depth:2,id:"فهم-componenttype",text:"فهم ComponentType"}],c=`<blockquote>
<p><strong>أُعيد تنظيم المحتوى</strong></p>
<p>قُسِّم هذا المحتوى إلى أدلّة متخصّصة لزيادة التركيز والوضوح.</p>
</blockquote>
<h2 id="للمكونات-ذات-الرتبة-العليا">للمكوّنات ذات الرتبة العليا</h2>
<p><strong>راجع: <a href="https://stevekinney.com/courses/react-typescript/higher-order-components-typing">أنواع المكوّنات ذات الرتبة العليا</a></strong></p>
<p>يغطّي:</p>
<ul>
<li>أنماط أنواع كاملة للمكوّنات ذات الرتبة العليا</li>
<li>استخدام <code>ComponentType</code> داخل المكوّنات ذات الرتبة العليا</li>
<li>حقن الخصائص واستبعادها</li>
<li>أنماط المكوّنات ذات الرتبة العليا الشائعة وأدواتها المساعدة</li>
</ul>
<h2 id="لأنماط-خصائص-التصيير">لأنماط خصائص التصيير</h2>
<p><strong>راجع: <a href="https://stevekinney.com/courses/react-typescript/render-props-and-hoc-alternatives">خصائص التصيير وبدائل المكوّنات ذات الرتبة العليا</a></strong></p>
<p>يغطّي:</p>
<ul>
<li>أنماط خصائص التصيير مع TypeScript</li>
<li><code>children</code> كدوالّ</li>
<li>البدائل الحديثة للمكوّنات ذات الرتبة العليا</li>
<li>الخُطّافات المخصّصة مقابل خصائص التصيير</li>
</ul>
<h2 id="فهم-componenttype">فهم <code>ComponentType</code></h2>
<p><code>ComponentType</code> هو نوع أدوات في React مع TypeScript يمثّل أي مكوّن React صالح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentType</span>&lt;P = {}&gt; = <span class="hljs-title class_">ComponentClass</span>&lt;P&gt; | <span class="hljs-title class_">FunctionComponent</span>&lt;P&gt;;
</code></pre>
<p>إنّه الأساس في:</p>
<ul>
<li>كتابة دوالّ تقبل أي نوع من أنواع المكوّنات</li>
<li>بناء مكوّنات ذات رتبة عليا تعمل مع المكوّنات الدالية والصنفية</li>
<li>إنشاء أنماط المكوّنات المتعدّدة الأشكال (polymorphic)</li>
<li>تركيب المكوّنات بأمانٍ من حيث الأنواع</li>
</ul>
<p>يستخدم الدليلان أعلاه <code>ComponentType</code> على نطاق واسع في أمثلتهما وأنماطهما.</p>
`,l={book:n,chapter:e,chapterTitle:t,slug:p,title:o,headings:s,html:c};export{n as book,e as chapter,t as chapterTitle,l as default,s as headings,c as html,p as slug,o as title};
