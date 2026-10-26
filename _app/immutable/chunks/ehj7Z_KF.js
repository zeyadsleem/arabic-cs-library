const d="kinney",o="tailwind",e="Tailwind CSS",c="placing-grid-items-spanning-and-positioning",t="وضع عناصر Grid (التمدّد والموضع)",n=[{depth:2,id:"وضع-عناصر-grid-التمدد",text:"وضع عناصر Grid: التمدّد"},{depth:3,id:"التمدد-عبر-عدد-ثابت-من-الأعمدة",text:"التمدّد عبر عدد ثابت من الأعمدة"},{depth:3,id:"التمدد-عبر-عدد-ثابت-من-الصفوف",text:"التمدّد عبر عدد ثابت من الصفوف"},{depth:3,id:"التمدد-بقيم-مخصصة",text:"التمدّد بقيم مخصّصة"},{depth:2,id:"وضع-عناصر-grid-الموضع",text:"وضع عناصر Grid: الموضع"},{depth:3,id:"أعمدة-البداية-والنهاية",text:"أعمدة البداية والنهاية"},{depth:3,id:"صفوف-البداية-والنهاية",text:"صفوف البداية والنهاية"},{depth:3,id:"استخدام-القيم-السالبة-في-الموضع",text:"استخدام القيم السالبة في الموضع"},{depth:3,id:"الجمع-بين-التمدد-والموضع",text:"الجمع بين التمدّد والموضع"},{depth:3,id:"أدوات-الموضع-المختصرة",text:"أدوات الموضع المختصرة"},{depth:3,id:"الموضع-بقيم-مخصصة",text:"الموضع بقيم مخصّصة"},{depth:2,id:"وضع-عناصر-grid-المتجاوب",text:"وضع عناصر Grid المتجاوب"},{depth:2,id:"تخصيص-قيم-عناصر-grid",text:"تخصيص قيم عناصر Grid"},{depth:2,id:"التفاعل-مع-الوضع-التلقائي",text:"التفاعل مع الوضع التلقائي"}],r=`<p>يغطّي هذا الدليل وضع العناصر داخل grid باستخدام Tailwind CSS، مع التركيز على التمدّد والموضع.</p>
<h2 id="وضع-عناصر-grid-التمدد">وضع عناصر Grid: التمدّد</h2>
<p>بعد تعريف أعمدة grid وصفوفه (مثل <code>grid-cols-4</code> و<code>grid-rows-3</code>)، ضع العناصر بجعلها تمتدّ عبر عدة أعمدة أو صفوف.</p>
<h3 id="التمدد-عبر-عدد-ثابت-من-الأعمدة">التمدّد عبر عدد ثابت من الأعمدة</h3>
<p>استخدم <code>col-span-&lt;number&gt;</code> لجعل العنصر يمتدّ عبر الأعمدة (مثل <code>col-span-2</code> يمتدّ عبر عمودين). وهذه تطبّق <code>grid-column: span &lt;number&gt; / span &lt;number&gt;</code>.</p>
<p>استخدم <code>col-span-full</code> للتمدّد عبر كل الأعمدة (<code>grid-column: 1 / -1</code>).</p>
<h3 id="التمدد-عبر-عدد-ثابت-من-الصفوف">التمدّد عبر عدد ثابت من الصفوف</h3>
<p>استخدم <code>row-span-&lt;number&gt;</code> لجعل العنصر يمتدّ عبر الصفوف (مثل <code>row-span-2</code> يمتدّ عبر صفين). وهذه تطبّق <code>grid-row: span &lt;number&gt; / span &lt;number&gt;</code>.</p>
<p>استخدم <code>row-span-full</code> للتمدّد عبر كل الصفوف (<code>grid-row: 1 / -1</code>).</p>
<h3 id="التمدد-بقيم-مخصصة">التمدّد بقيم مخصّصة</h3>
<p>للتمدّد المخصّص، استخدم <code>col-span-[&lt;value&gt;]</code> و<code>row-span-[&lt;value&gt;]</code>. وأشِر إلى متغيّرات CSS عبر <code>col-span-(&lt;custom-property&gt;)</code> أو <code>row-span-(&lt;custom-property&gt;)</code>.</p>
<h2 id="وضع-عناصر-grid-الموضع">وضع عناصر Grid: الموضع</h2>
<p>ضع عناصر grid بتحديد سطور البداية أو النهاية في الشبكة.</p>
<h3 id="أعمدة-البداية-والنهاية">أعمدة البداية والنهاية</h3>
<p>استخدم <code>col-start-&lt;number&gt;</code> لتحديد سطر البداية في الأعمدة (مثل <code>col-start-3</code>). واستخدم <code>col-end-&lt;number&gt;</code> لتحديد سطر النهاية في الأعمدة (مثل <code>col-end-5</code>). وهذه تضبط <code>grid-column-start</code> و<code>grid-column-end</code>.</p>
<p>استخدم <code>col-start-auto</code> و<code>col-end-auto</code> للوضع التلقائي.</p>
<h3 id="صفوف-البداية-والنهاية">صفوف البداية والنهاية</h3>
<p>استخدم <code>row-start-&lt;number&gt;</code> لتحديد سطر البداية في الصفوف (مثل <code>row-start-2</code>). واستخدم <code>row-end-&lt;number&gt;</code> لتحديد سطر النهاية في الصفوف (مثل <code>row-end-4</code>). وهذه تضبط <code>grid-row-start</code> و<code>grid-row-end</code>.</p>
<p>استخدم <code>row-start-auto</code> و<code>row-end-auto</code> للوضع التلقائي.</p>
<h3 id="استخدام-القيم-السالبة-في-الموضع">استخدام القيم السالبة في الموضع</h3>
<p>سبّق أدوات الموضع بشرطة للقيم السالبة (مثل <code>-col-start-2</code> و<code>-row-end-3</code>). وهذه تُترجَم إلى قيم سالبة لـ <code>grid-column-start</code> و<code>grid-row-end</code>.</p>
<h3 id="الجمع-بين-التمدد-والموضع">الجمع بين التمدّد والموضع</h3>
<p>اجمع أدوات البداية/النهاية مع أدوات الامتداد (مثل <code>col-start-2 col-span-3</code> يبدأ عند سطر العمود 2 ويمتدّ عبر ثلاثة أعمدة).</p>
<h3 id="أدوات-الموضع-المختصرة">أدوات الموضع المختصرة</h3>
<p>استخدم <code>col-&lt;number&gt;</code> و<code>row-&lt;number&gt;</code> كاختصارات. وهذه تضبط <code>grid-column</code> و<code>grid-row</code> على سطر grid المحدّد (مثل <code>col-3</code> يبدأ عند سطر العمود 3 وينتهي عند 4). وتُدعم القيم السالبة (مثل <code>-col-2</code>).</p>
<h3 id="الموضع-بقيم-مخصصة">الموضع بقيم مخصّصة</h3>
<p>استخدم القيم التعسّفية: <code>col-start-[&lt;value&gt;]</code> و<code>col-end-[&lt;value&gt;]</code> و<code>row-start-[&lt;value&gt;]</code> و<code>row-end-[&lt;value&gt;]</code> و<code>col-[&lt;value&gt;]</code> و<code>row-[&lt;value&gt;]</code>. وأشِر إلى متغيّرات CSS بالأقواس (مثل <code>row-start-(&lt;custom-property&gt;)</code>).</p>
<h2 id="وضع-عناصر-grid-المتجاوب">وضع عناصر Grid المتجاوب</h2>
<p>جميع أدوات وضع grid متجاوبة. طبّقها بشكل مشروط عند نقاط التوقّف (<code>md:</code> و<code>lg:</code>) أو مع متغيّرات استعلامات الحاوية (<code>@md:</code>).</p>
<p>مثال: <code>col-span-1 md:col-span-3</code>.</p>
<p>يسمح Tailwind 4 باستعلامات الحاوية (<code>@md:</code>) للوضع بحسب حجم الحاوية الأم.</p>
<h2 id="تخصيص-قيم-عناصر-grid">تخصيص قيم عناصر Grid</h2>
<p>في Tailwind 4، عرّف قيم وضع grid مخصّصة باستخدام متغيّرات CSS مع <code>@theme</code>. وأشِر إلى هذه المتغيّرات في صيغة القيم التعسّفية (مثل <code>col-span-(layout)</code> إذا كان <code>--grid-column-span-layout: 3</code> معرَّفًا).</p>
<h2 id="التفاعل-مع-الوضع-التلقائي">التفاعل مع الوضع التلقائي</h2>
<p>يتجاوز الوضع الصريح الوضع التلقائي الافتراضي. أما العناصر غير الموضوعة أو التي تنشئ مسارات ضمنية فتتبع قواعد الوضع التلقائي. تحكّم في مقاسات المسارات الضمنية عبر <code>grid-auto-columns</code> و<code>grid-auto-rows</code>، وفي التدفّق عبر <code>grid-auto-flow</code> (مثل <code>grid-flow-row-dense</code>).</p>
`,i={book:d,chapter:o,chapterTitle:e,slug:c,title:t,headings:n,html:r};export{d as book,o as chapter,e as chapterTitle,i as default,n as headings,r as html,c as slug,t as title};
