const t="kinney",n="tailwind",s="Tailwind CSS",e="utility-first",l="CSS القائم على الأدوات المساعدة (Utility-First)",o=[{depth:2,id:"المزايا",text:"المزايا"},{depth:2,id:"الانتقادات",text:"الانتقادات"},{depth:3,id:"لماذا-ينجح",text:"لماذا ينجح"},{depth:3,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"إدارة-قوائم-الأصناف-الطويلة",text:"إدارة قوائم الأصناف الطويلة"},{depth:3,id:"المتغيرات-المتقدمة-والحالة",text:"المتغيّرات المتقدّمة والحالة"},{depth:3,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"متى-تكتب-css-مخصصا",text:"متى تكتب CSS مخصّصًا"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"},{depth:2,id:"أطر-الأدوات-المساعدة-الشائعة",text:"أطر الأدوات المساعدة الشائعة"}],i=`<p>ها هو ذا <code>&lt;button&gt;</code>. بعد أن يزيل Tailwind معظم أنماط المتصفح المدمجة في إطار ما يسمّى <a href="https://tailwindcss.com/docs/preflight">Preflight</a>. في الواقع، بالكاد يبدو زرًا.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/ddf18b193b8bb6a7a9e90a3fba5533194c257b114df6c5188e05a422685b17b7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>يمكننا أن نبدأ بإضافة القليل إليه باستخدام <strong>أصناف الأدوات المساعدة (utility classes)</strong>.</p>
<p>يُقدّم CSS القائم على الأدوات المساعدة أصنافًا صغيرة أحادية الغرض تُطبَّق مباشرة على عناصر HTML بدلًا من الأصناف الدلالية أو المعرّفات. كل صنف مساعد يفعل شيئًا واحدًا: يضبط الهامش أو الحشو أو محاذاة النص أو اللون.</p>
<p><em>المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/1d0ea4109ba74d216cbf1c9cbc1db303c8587ebd9b657bd1fd5f9f6594982ac2.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>يدفع Tailwind فلسفة الأدوات المساعدة خطوة أبعد بتبنّي ميزات CSS الحديثة — طبقات التتالي، وألوان OKLCH، واستعلامات الحاوية، والخصائص المخصّصة الأصلية — كل ذلك دون مغادرة HTML.</p>
<h2 id="المزايا">المزايا</h2>
<ol>
<li><strong>النمذجة السريعة</strong>: صمّم العناصر مباشرة داخل HTML دون التنقّل بين الملفات.</li>
<li><strong>تقليل الآثار الجانبية</strong>: الأصناف المحصورة على عناصر منفردة تمنع تعارضات الأنماط.</li>
<li><strong>قابلية إعادة الاستخدام</strong>: الأصناف أحادية الغرض تعمل في التطبيق بأكمله.</li>
<li><strong>قابلية الصيانة</strong>: آثار إضافة الأصناف أو إزالتها متوقّعة ومرئية في الترميز.</li>
<li><strong>سهولة التوسّع</strong>: توفّر الأطر خيارات تخصيص لبناء أنظمة تصميم متّسقة.</li>
</ol>
<h2 id="الانتقادات">الانتقادات</h2>
<ol>
<li><strong>HTML مطوّل</strong>: كثرة أسماء الأصناف قد تُشوّش الترميز.</li>
<li><strong>منحنى تعلّم</strong>: يتطلّب الإلمام بأسماء الأصناف المساعدة.</li>
<li><strong>غياب الدلالة</strong>: الأصناف المساعدة لا تنقل معنى العنصر (يُخفَّف ذلك بالدمج مع الأصناف الدلالية).</li>
</ol>
<h3 id="لماذا-ينجح">لماذا ينجح</h3>
<ul>
<li><strong>تتالٍ متوقّع</strong>: الأدوات المعلنة أخيرًا في التتالي تتجاوز أنماط المكوّنات والأساس دون <code>!important</code>.</li>
<li><strong>تعاون رموز التصميم</strong>: الرموز في <code>@theme</code> (<code>--color-primary-500</code>) متاحة في كل أداة.</li>
<li><strong>تكرار سريع</strong>: يعيد Oxide بناء الأنماط في غضون مللي ثوانٍ.</li>
</ul>
<h3 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h3>
<ul>
<li><strong>اكتب داخل HTML أولًا</strong>: لا تلجأ إلى CSS المخصّص إلا حين تعجز الأدوات عن التعبير عن الفكرة بوضوح.</li>
<li><strong>استخرج الأنماط المتكرّرة</strong>: غلّف الأدوات التي تتكرّر ثلاث مرات أو أكثر في مكوّنات أو في <code>@apply</code>.</li>
<li><strong>استخدم <code>@apply</code> باعتدال</strong>: المحدّدات في <code>@layer components/base</code> لا تتلقّى المتغيّرات. للمساعدات الواعية بالمتغيّرات، استخدم <code>@utility</code>.</li>
<li><strong>أعلن الرموز في <code>@theme</code></strong>: استخدم متغيّرات CSS للمسافات والألوان والخطوط بدلًا من القيم الاعتباطية (<code>p-[123px]</code>).</li>
</ul>
<h3 id="إدارة-قوائم-الأصناف-الطويلة">إدارة قوائم الأصناف الطويلة</h3>
<p>أبقِ قوائم الأصناف الطويلة مقروءة:</p>
<ol>
<li><strong>التجميع المنطقي</strong>: رتّب وفق التخطيط ← المسافات ← الطباعة ← الألوان ← الحركة.</li>
<li><strong>الفرز التلقائي</strong>: استخدم إضافة <a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">Tailwind CSS IntelliSense extension</a> الرسمية أو إضافة Prettier لـ Tailwind لفرض ترتيب متّسق.</li>
<li><strong>استخراج المكوّنات</strong>: اسحب الأنماط المطوّلة إلى مكوّنات قابلة لإعادة الاستخدام لتبقى الترميز مرتبًا.</li>
</ol>
<h3 id="المتغيرات-المتقدمة-والحالة">المتغيّرات المتقدّمة والحالة</h3>
<p>يقدّم Tailwind 4 عناصر أولية قوية للمتغيّرات:</p>
<table>
<thead>
<tr>
<th>المتغيّر</th>
<th>الغرض</th>
<th>مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>md:</code></td>
<td>استعلام وسائط ≥ 768px</td>
<td><code>md:grid-cols-3</code></td>
</tr>
<tr>
<td><code>hover:</code></td>
<td>حالة تفاعل</td>
<td><code>hover:bg-primary-600</code></td>
</tr>
<tr>
<td><code>cq:</code></td>
<td>استعلام حاوية</td>
<td><code>cq:gap-6</code></td>
</tr>
<tr>
<td><code>group-has-[.active]</code></td>
<td>يصمّم العنصر الأب عندما يحتوي على <code>.active</code></td>
<td><code>group-has-[.active]:bg-blue-50</code></td>
</tr>
</tbody>
</table>
<p>اجمع بينها لتحصل على قواعد معبّرة مثل <code>md:group-hover/cell:translate-y-1</code>.</p>
<h3 id="اعتبارات-الأداء">اعتبارات الأداء</h3>
<ul>
<li><strong>خطوة بناء Oxide</strong>: يُصدر Tailwind الأصناف المُشار إليها فقط لتحقيق حزم CSS بالحد الأدنى.</li>
<li><strong>تجنّب JIT وقت التشغيل في الإنتاج</strong>: البناء وقت الترجمة أسرع ودون أي عبء على جهة العميل.</li>
<li><strong>انتبه لتضخّم المتغيّرات</strong>: كل توليفة متغيّرات تضيف بايتات. قلّم الأصناف غير المستخدمة.</li>
</ul>
<h3 id="متى-تكتب-css-مخصصا">متى تكتب CSS مخصّصًا</h3>
<p>استخدم CSS المخصّص عندما:</p>
<ul>
<li>تكون هناك حاجة إلى حركات keyframe معقّدة</li>
<li>تكون القيم الخوارزمية مطلوبة (مثل التحويلات المبنية على حساب المثلثات).</li>
<li>يتجاوز منطق المحدّدات ما توفّره متغيّرات الأدوات.</li>
</ul>
<p>أبقِ هذه القواعد صغيرة، وضعها في طبقة التتالي الصحيحة، ووثّق سبب عدم كفاية الأدوات.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://johnpolacek.medium.com/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4">بالأرقام: عام ونصف مع Atomic CSS</a></li>
<li><a href="https://frontstuff.io/no-utility-classes-arent-the-same-as-inline-styles">لا، أصناف الأدوات المساعدة ليست كالأنماط المضمّنة</a></li>
</ul>
<h2 id="أطر-الأدوات-المساعدة-الشائعة">أطر الأدوات المساعدة الشائعة</h2>
<ol>
<li><a href="https://tailwindcss.com/docs/utility-first"><strong>Tailwind CSS</strong></a>: الأكثر شعبية، وأدوات واسعة من التخطيطات إلى السمات.</li>
<li><a href="https://tachyons.io/"><strong>Tachyons</strong></a>: شيفرة سريعة التحميل ومقروءة وقابلة للصيانة.</li>
<li><a href="https://basscss.com/"><strong>Basscss</strong>:</a> أدوات أساسية خفيفة الوزن قابلة للتوسّع.</li>
</ol>
`,d={book:t,chapter:n,chapterTitle:s,slug:e,title:l,headings:o,html:i};export{t as book,n as chapter,s as chapterTitle,d as default,o as headings,i as html,e as slug,l as title};
