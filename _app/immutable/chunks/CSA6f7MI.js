const d="kinney",e="tailwind",o="Tailwind CSS",c="complex-grid-templates",i="قوالب Grid المعقّدة",r=[{depth:2,id:"تحديد-بنى-grid",text:"تحديد بنى Grid"},{depth:3,id:"تعريف-الأعمدة",text:"تعريف الأعمدة"},{depth:3,id:"تعريف-الصفوف",text:"تعريف الصفوف"},{depth:3,id:"تطبيق-الشبكات-الفرعية",text:"تطبيق الشبكات الفرعية"},{depth:3,id:"تعاريف-القوالب-المتقدمة",text:"تعاريف القوالب المتقدّمة"},{depth:2,id:"قوالب-grid-المتجاوبة",text:"قوالب Grid المتجاوبة"}],t=`<p>يوفّر Tailwind CSS أدوات لتخطيطات grid، تتحكّم في بنية grid وفي وضع العناصر. وتعريف قالب grid (الأعمدة والصفوف) هو المفتاح.</p>
<h2 id="تحديد-بنى-grid">تحديد بنى Grid</h2>
<p>تقابل أدوات Tailwind خاصيتي CSS <code>grid-template-columns</code> و<code>grid-template-rows</code> لتعريف مسارات grid (الأعمدة والصفوف).</p>
<h3 id="تعريف-الأعمدة">تعريف الأعمدة</h3>
<p>استخدم أدوات <code>grid-cols-*</code> للأعمدة. فعدد ثابت من الأعمدة المتساوية يعني <code>grid-cols-2</code> (عمودان) أو <code>grid-cols-4</code> (أربعة أعمدة). وهذا يُنتج CSS من الشكل <code>grid-template-columns: repeat(&lt;number&gt;, minmax(0, 1fr));</code>، فتُنشئ أعمدة مرنة لا تنكمش تحت الصفر.</p>
<p>استخدم <code>grid-cols-none</code> لإزالة تعريفات الأعمدة (<code>grid-template-columns: none;</code>).</p>
<h3 id="تعريف-الصفوف">تعريف الصفوف</h3>
<p>استخدم أدوات <code>grid-rows-*</code> للصفوف، على نحو مشابه للأعمدة. فتُنشئ <code>grid-rows-2</code> أو <code>grid-rows-4</code> عددًا ثابتًا من الصفوف المتساوية، وتُنتج <code>grid-template-rows: repeat(&lt;number&gt;, minmax(0, 1fr));</code>.</p>
<p>استخدم <code>grid-rows-none</code> لإزالة تعريفات الصفوف (<code>grid-template-rows: none;</code>).</p>
<h3 id="تطبيق-الشبكات-الفرعية">تطبيق الشبكات الفرعية</h3>
<p>للشبكات المتداخلة، يدعم Tailwind الشبكات الفرعية. فتجعل <code>grid-cols-subgrid</code> الشبكة المتداخلة تتبنّى مسارات أعمدة أبيها (<code>grid-template-columns: subgrid</code>). وعلى نحو مماثل، تتبنّى <code>grid-rows-subgrid</code> مسارات صفوف الأب (<code>grid-template-rows: subgrid</code>).</p>
<h3 id="تعاريف-القوالب-المتقدمة">تعاريف القوالب المتقدّمة</h3>
<p>للتحكّم الدقيق، يوفّر Tailwind خيارات لقوالب grid المعقّدة عبر القيم التعسّفية والخصائص المخصّصة في CSS.</p>
<h4>استخدام القيم التعسّفية</h4>
<p>عرّف قوالب grid بقيم تعسّفية داخل HTML باستخدام الأقواس المربّعة: <code>grid-cols-[&lt;value&gt;]</code> للأعمدة و<code>grid-rows-[&lt;value&gt;]</code> للصفوف. ويمكن أن تكون <code>&lt;value&gt;</code> أي CSS صالح لـ <code>grid-template-columns</code> أو <code>grid-template-rows</code> على التوالي. وهذا يسمح بمزج الوحدات (px وrem وfr)، أو سطور grid مسمّاة، أو دوال مثل <code>repeat()</code> و<code>minmax()</code> و<code>fit-content()</code>.</p>
<p>مثال: <code>grid-cols-[200px_1fr]</code> لشريط جانبي ثابت ومحتوى مرن، أو <code>grid-template-columns: [sidebar-start] 1fr [sidebar-end content-start] 2fr [content-end];</code> لسطور مسمّاة.</p>
<h4>استخدام الخصائص المخصّصة</h4>
<p>عرّف قوالب grid معقّدة عبر الخصائص المخصّصة في CSS (المتغيّرات) وأشِر إليها في أصناف Tailwind: <code>grid-cols-(&lt;custom-property&gt;)</code> للأعمدة و<code>grid-rows-(&lt;custom-property&gt;)</code> للصفوف. فتُدار تعريفات grid المعقّدة في CSS وتُطبَّق عبر Tailwind.</p>
<p>عرّف الخصائص المخصّصة في CSS لديك (مثلًا في <code>@theme</code> أو <code>:root</code>) وطبّقها عبر <code>grid-cols-(...)</code> أو <code>grid-rows-(...)</code>.</p>
<h2 id="قوالب-grid-المتجاوبة">قوالب Grid المتجاوبة</h2>
<p>طبّق أدوات قالب grid بشكل مشروط بحسب عرض نافذة العرض باستخدام المتغيّرات المتجاوبة (<code>md:</code> و<code>lg:</code>).</p>
<p>مثال: ابدأ بتخطيط بعمود واحد، ثم انتقل إلى تعدّد الأعمدة عند نقاط التوقّف الأكبر. فـ <code>grid-cols-1 md:grid-cols-2 lg:grid-cols-3</code> ينشئ عمودًا واحدًا افتراضيًا، وعمودين على الشاشات المتوسطة، وثلاثة أعمدة على الشاشات الكبيرة.</p>
<p>وهذا ينطبق على جميع أدوات قالب grid، بما فيها تلك ذات القيم التعسّفية أو الخصائص المخصّصة، ما يسمح ببنى grid معقّدة مختلفة عند نقاط التوقّف المختلفة.</p>
<p>وبعد تعريف قالب grid، ضع العناصر وحدّد مقاساتها عبر أدوات مثل <code>col-span-*</code> و<code>row-span-*</code> و<code>col-start-*</code> وغيرها، وتحكّم في المسافات عبر <code>gap-*</code>. وتعمل هذه الأدوات ضمن قالب grid المعرَّف.</p>
`,n={book:d,chapter:e,chapterTitle:o,slug:c,title:i,headings:r,html:t};export{d as book,e as chapter,o as chapterTitle,n as default,r as headings,t as html,c as slug,i as title};
