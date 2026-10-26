const e="kinney",o="tailwind",n="Tailwind CSS",s="state-variants",d="تنويعات الحالة",c=[{depth:2,id:"أنواع-تنويعات-الحالة",text:"أنواع تنويعات الحالة"},{depth:3,id:"الأصناف-الزائفة",text:"الأصناف الزائفة"},{depth:3,id:"العناصر-الزائفة",text:"العناصر الزائفة"},{depth:3,id:"استعلامات-الوسائط-والميزات",text:"استعلامات الوسائط والميزات"},{depth:3,id:"محددات-الخصائص",text:"محدّدات الخصائص"},{depth:3,id:"محددات-الأبناء",text:"محدّدات الأبناء"},{depth:2,id:"أنماط-التنويعات-الخاصة",text:"أنماط التنويعات الخاصة"},{depth:2,id:"تراكم-التنويعات",text:"تراكم التنويعات"},{depth:2,id:"تنويعات-مخصصة",text:"تنويعات مخصّصة"}],t=`<p>تطبّق تنويعات الحالة أصناف Tailwind المساعد شرطًا اعتمادًا على حالة العنصر أو سياقه. بادِئ أي صنف مساعد باسم التنويع متبوعًا بنقطتين: <code>hover:bg-blue-500</code>، <code>md:text-lg</code>.</p>
<p>الفرق الأساسي عن CSS: يستخدم Tailwind أصنافًا منفصلة لكل حالة بدلًا من تجميع عدة حالات في صنف واحد. لا يُطبَّق صنف التنويع إلا أثناء تلك الحالة تحديدًا.</p>
<h2 id="أنواع-تنويعات-الحالة">أنواع تنويعات الحالة</h2>
<h3 id="الأصناف-الزائفة">الأصناف الزائفة</h3>
<p><strong>تفاعلية:</strong> <code>hover</code>، <code>focus</code>، <code>active</code>، <code>visited</code>، <code>focus-within</code>، <code>focus-visible</code></p>
<p><strong>بنيوية:</strong> <code>first</code>، <code>last</code>، <code>odd</code>، <code>even</code>، <code>only-child</code>، <code>first-of-type</code>، <code>last-of-type</code>، <code>only-of-type</code>، <code>nth-of-type()</code></p>
<p><strong>النماذج:</strong> <code>required</code>، <code>disabled</code>، <code>invalid</code>، <code>read-only</code>، <code>indeterminate</code>، <code>checked</code></p>
<p><strong>خاصة:</strong> <code>target</code>، <code>placeholder-shown</code>، <code>details-content</code>، <code>autofill</code></p>
<h3 id="العناصر-الزائفة">العناصر الزائفة</h3>
<ul>
<li><code>before</code> و<code>after</code></li>
<li><code>placeholder</code> (حقول إدخال النماذج)</li>
<li><code>file</code> (أزرار إدخال الملفات)</li>
<li><code>marker</code> (عناصر القوائم)</li>
<li><code>selection</code> (النص المحدّد)</li>
<li><code>first-line</code> و<code>first-letter</code></li>
<li><code>backdrop</code> (الحوارات)</li>
</ul>
<h3 id="استعلامات-الوسائط-والميزات">استعلامات الوسائط والميزات</h3>
<p><strong>متجاوبة:</strong> <code>sm</code>، <code>md</code>، <code>lg</code>، <code>xl</code>، <code>2xl</code> (عروض إطار العرض)</p>
<p><strong>استعلامات الحاويات:</strong> <code>@sm</code>، <code>@md</code>، <code>@max-sm</code>، <code>@max-md</code> (حجم حاوية الأصل)</p>
<ul>
<li>الحاويات المسمّاة: <code>@sm/{name}</code></li>
</ul>
<p><strong>تفضيلات المستخدم:</strong></p>
<ul>
<li><code>dark</code> (الوضع الداكن)</li>
<li><code>motion-reduce</code>، <code>motion-safe</code></li>
<li><code>contrast-more</code>، <code>contrast-less</code></li>
<li><code>forced-colors</code>، <code>not-forced-colors</code></li>
<li><code>inverted-colors</code></li>
<li><code>portrait</code>، <code>landscape</code></li>
<li><code>print</code></li>
</ul>
<p><strong>المؤشّر:</strong> <code>pointer-fine</code>، <code>pointer-coarse</code>، <code>pointer-none</code></p>
<p><strong>كشف الميزات:</strong> <code>supports-[...]</code>، <code>not-supports-[...]</code></p>
<h3 id="محددات-الخصائص">محدّدات الخصائص</h3>
<ul>
<li><strong>ARIA:</strong> <code>aria-*</code> (مثل <code>aria-checked</code>)</li>
<li><strong>البيانات:</strong> <code>data-*</code> (مثل <code>data-active</code>)</li>
<li><strong>الاتجاه:</strong> <code>rtl</code>، <code>ltr</code></li>
<li><strong>الحالة:</strong> <code>open</code> (details/dialog)، <code>inert</code></li>
</ul>
<h3 id="محددات-الأبناء">محدّدات الأبناء</h3>
<ul>
<li><code>*</code> - الأبناء المباشرون فقط</li>
<li><code>**</code> - جميع الأبناء</li>
</ul>
<h2 id="أنماط-التنويعات-الخاصة">أنماط التنويعات الخاصة</h2>
<p><strong><code>group-*</code></strong> - التنسيق حسب حالة الأصل (يحتاج الأصل إلى الصنف <code>group</code>)</p>
<p><em>أنماط التنويعات الخاصة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/638abe229a95cd6344e7fa25e60ea71ae27d7ec97c6526f18a9109927e41f077.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group-hover:bg-blue-500&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong><code>peer-*</code></strong> - التنسيق حسب حالة الشقيق السابق (يحتاج الشقيق إلى الصنف <code>peer</code>)</p>
<p><em>أنماط التنويعات الخاصة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/7ac62de32231009240c8f6b744f36497f07bfb74e59fbd2a6f0a3000b42a9ba3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;peer&quot;</span> /&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;peer-invalid:block&quot;</span>&gt;</span>Error<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre>
<p><strong><code>has-*</code></strong> - التنسيق حسب حالة أحد الأبناء</p>
<p><em>أنماط التنويعات الخاصة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/67896f0a32fd3cd54eeb152ae0b7adc1d760b36518e829d789f2305e2d9ac148.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;has-[:focus]:ring&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong><code>in-*</code></strong> - التنسيق حسب حالة أي من الأبناء (لا حاجة إلى صنف)</p>
<h2 id="تراكم-التنويعات">تراكم التنويعات</h2>
<p>اجمع بين عدة شروط: <code>dark:md:hover:bg-blue-500</code></p>
<p><strong>تغيّر في v4:</strong> أصبح ترتيب التراكم من اليسار إلى اليمين (كان من اليمين إلى اليسار في v3)</p>
<h2 id="تنويعات-مخصصة">تنويعات مخصّصة</h2>
<p><strong>عشوائية:</strong> <code>[&amp;.is-dragging]:cursor-grabbing</code></p>
<p><strong>قابلة لإعادة الاستخدام:</strong> تُعرَّف بـ <code>@custom-variant</code> في CSS</p>
<p>##تغييرات Tailwind 4</p>
<ul>
<li><code>hover</code> لا يُطبَّق إلا عندما يدعم الجهاز التمرير</li>
<li>تنويعات <code>nth-*</code> تقبل أي رقم افتراضيًا</li>
<li>خصائص <code>data-*</code> المنطقية لا تحتاج إلى أقواس مربّعة</li>
</ul>
`,a={book:e,chapter:o,chapterTitle:n,slug:s,title:d,headings:c,html:t};export{e as book,o as chapter,n as chapterTitle,a as default,c as headings,t as html,s as slug,d as title};
