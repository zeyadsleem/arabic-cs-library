const e="kinney",o="tailwind",d="Tailwind CSS",c="aria-integration",i="تكامل ARIA",a=[{depth:3,id:"القيم-العشوائية-مع-aria",text:"القيم العشوائية مع aria-*"},{depth:2,id:"تنسيق-العناصر-الأم-أو-الأشقاء",text:"تنسيق العناصر الأم أو الأشقاء"},{depth:3,id:"صيغة-group-aria",text:"صيغة group-aria-*"},{depth:3,id:"صيغة-peer-aria",text:"صيغة peer-aria-*"},{depth:2,id:"تخصيص-صيغ-aria",text:"تخصيص صيغ ARIA"},{depth:2,id:"تحسين-الوصولية-بأدوات-أخرى",text:"تحسين الوصولية بأدوات أخرى"},{depth:2,id:"إخفاء-العناصر-بصريا",text:"إخفاء العناصر بصريًا"},{depth:2,id:"مؤشرات-التركيز",text:"مؤشرات التركيز"},{depth:2,id:"الحركة-المخفضة-والألوان-القسرية",text:"الحركة المخفّضة والألوان القسرية"},{depth:2,id:"تحديد-النص-وقابلية-القراءة",text:"تحديد النص وقابلية القراءة"}],n=`<p>يمكنك تنسيق العناصر شرطيًا باستخدام صيغة <code>aria-*</code>، وهي تستهدف العناصر بحسب خصائص ARIA التي تحملها. فمثلًا يمكنك تغيير لون خلفية عنصر عندما تكون الخاصية <code>aria-checked</code> مضبوطة على <code>true</code> باستخدام صنف مثل <code>aria-checked:bg-sky-700</code>. ولا تطبّق هذه الصيغة الأنماط إلا عندما يتحقق شرط ARIA المحدّد.</p>
<p>تتضمّن Tailwind صيغًا مدمجة لخصائص ARIA المنطقية الشائعة. وهذه هي:</p>
<ul>
<li><code>aria-checked</code></li>
<li><code>aria-disabled</code></li>
<li><code>aria-expanded</code></li>
<li><code>aria-hidden</code></li>
<li><code>aria-invalid</code></li>
<li><code>aria-pressed</code></li>
<li><code>aria-readonly</code></li>
<li><code>aria-required</code></li>
<li><code>aria-selected</code></li>
</ul>
<p>استخدام هذه الأدوات يعني أن يتولّى المتصفح تطبيق الأنماط المناسبة بحسب حالة العنصر، ما يقلّل الحاجة إلى منطق شرطيّ معقّد في قوالبك.</p>
<h3 id="القيم-العشوائية-مع-aria">القيم العشوائية مع <code>aria-*</code></h3>
<p>بالنسبة إلى خصائص ARIA التي ليست حالات منطقية بسيطة أو إلى الخصائص غير المضمّنة افتراضيًا، يمكنك استخدام قيم عشوائية داخل صيغة <code>aria-*</code>. ويكون هذا نافعًا خصوصًا مع الخصائص ذات القيم المحدّدة، مثل <code>aria-sort</code>. ويمكنك توليد خاصية مخصّصة (custom) باستخدام أي قيمة عشوائية بين قوسين مربعين.</p>
<p>على سبيل المثال، لتدوير أيقونة بحسب قيمة الخاصية <code>aria-sort</code>، يمكنك استخدام أصناف مثل <code>aria-[sort=ascending]:rotate-0</code> و<code>aria-[sort=descending]:rotate-180</code>.</p>
<h2 id="تنسيق-العناصر-الأم-أو-الأشقاء">تنسيق العناصر الأم أو الأشقاء</h2>
<p>أحيانًا تحتاج إلى تنسيق عنصر بحسب حالة ARIA لعنصر مرتبط به، مثل عنصر أم أو شقيق. توفّر Tailwind صيغتي <code>group-aria-*</code> و<code>peer-aria-*</code> لهذين السيناريوهين.</p>
<h3 id="صيغة-group-aria">صيغة <code>group-aria-*</code></h3>
<p>مثل صيغة <code>group-hover</code> بالضبط، تتيح لك صيغة <code>group-aria-*</code> تنسيق عنصر عندما يحمل عنصر أم (مُعلَّم بصنف <code>group</code>) خاصية ARIA أو قيمة معيّنة. فمثلًا، إذا كان عنوان جدول (<code>&lt;th&gt;</code>) مُعلَّمًا بـ<code>group</code> ويحمل <code>aria-sort=&quot;ascending&quot;</code>، فيمكنك تنسيق أيقونة SVG ابنة باستخدام <code>group-aria-[sort=ascending]:rotate-0</code>.</p>
<h3 id="صيغة-peer-aria">صيغة <code>peer-aria-*</code></h3>
<p>تتيح لك صيغة <code>peer-aria-*</code> تنسيق عنصر بحسب حالة ARIA لعنصر شقيق. تُعلِّم العنصر الشقيق بصنف <code>peer</code>، ثم تستخدم صيغ <code>peer-aria-*</code> على العنصر الهدف. وهذا مفيد لأنماط مثل تنسيق تسمية حقل إدخال بحسب حالة <code>aria-invalid</code> للحقل نفسه، أو تنسيق رسالة بحسب حالة <code>aria-disabled</code> لحقل الإدخال. ومن الأمثلة <code>peer-aria-[disabled]:opacity-50</code> لجعل نص تلميح شبه شفاف عندما يكون حقل الإدخال المرتبط معطّلًا.</p>
<h2 id="تخصيص-صيغ-aria">تخصيص صيغ ARIA</h2>
<p>يمكنك تخصيص صيغ <code>aria-*</code> المتاحة أو إضافة صيغ جديدة تُطابِق خصائص ARIA أو قيمًا محدّدة، وذلك بإنشاء صيغة جديدة. ويمكن تنفيذ ذلك باستخدام التوجيه <code>@custom-variant</code> داخل CSS.</p>
<h2 id="تحسين-الوصولية-بأدوات-أخرى">تحسين الوصولية بأدوات أخرى</h2>
<p>إلى جانب صيغ ARIA الصريحة، توفّر Tailwind عدة أدوات وميزات أخرى تسهم في الوصولية الشاملة لواجهات الويب لديك.</p>
<h2 id="إخفاء-العناصر-بصريا">إخفاء العناصر بصريًا</h2>
<p>للعناصر التي يلزم وجودها في DOM لقارئات الشاشة مع وجوب إخفائها بصريًا، توفّر Tailwind أداة <code>sr-only</code>. وتطبّق هذه الأداة أنماطًا تُزيح العنصر خارج الشاشة مع إبقائه في متناول التقنيات المساعدة. وتعكس أداة <code>not-sr-only</code> ذلك، فتعيد العنصر إلى الظهور.</p>
<h2 id="مؤشرات-التركيز">مؤشرات التركيز</h2>
<p>التنسيق السليم للتركيز ضروري للتنقل بلوحة المفاتيح وللوصولية. ورغم أن المتصفحات تقدّم محيطات افتراضية للعناصر التي تحوز على التركيز، فكثيرًا ما تحتاج إلى تنسيق مخصّص لأسباب التصميم.</p>
<ul>
<li><strong>استخدام أدوات <code>outline-*</code></strong>: توفّر Tailwind أدوات مثل <code>outline-2</code> و<code>outline-blue-500</code> لضبط عرض محيط العنصر ولونه. ويمكنك تطبيقها باستخدام صيغة <code>focus:</code>.</li>
<li><strong>أداة <code>outline-hidden</code></strong>: إذا أخفتَ محيط المتصفح الافتراضي، فإن تطبيق تنسيق تركيزك الخاص لأغراض الوصولية موصى به بشدة. وتُقدَّم أداة <code>outline-hidden</code> لإخفاء المحيط الافتراضي مع الحفاظ عليه في وضع الألوان القسرية لأسباب الوصولية. وكان <code>outline-none</code> يملك هذا السلوك سابقًا، أما في Tailwind 4 فيضبط <code>outline-none</code> صراحةً <code>outline-style: none</code>.</li>
</ul>
<h2 id="الحركة-المخفضة-والألوان-القسرية">الحركة المخفّضة والألوان القسرية</h2>
<p>تتضمّن Tailwind صيغ تستجيب لتفضيلات المستخدم المضبوطة في نظام تشغيله، ما يسهم في تجربة أكثر شمولًا.</p>
<ul>
<li><strong>الحركة المخفّضة</strong>: يوضّح استعلام الوسائط <code>prefers-reduced-motion</code> ما إذا كان المستخدم يريد أقل قدر ممكن من الحركة غير الضرورية. ويمكنك استخدام صيغة <code>motion-reduce</code> لتطبيق الأنماط شرطيًا عندما يكون هذا التفضيل نشطًا. وعلى العكس، تطبّق <code>motion-safe</code> الأنماط فقط عندما <em>لم</em> يطلب المستخدم حركة مخفّضة. وهما مفيدتان في ضبط الحركات والانتقالات.</li>
<li><strong>الألوان القسرية</strong>: يخبرك استعلام الوسائط <code>prefers-contrast</code> ما إذا كان المستخدم قد طلب تباينًا أكثر أو أقل. وتتيح لك صيغة <code>contrast-more</code> إضافة أنماط شرطيًا في هذه الحالة. وتتضمّن Tailwind كذلك أدوات <code>forced-color-adjust-auto</code> و<code>forced-color-adjust-none</code> للاختيار في الألوان القسرية أو الخروج منها. ويمكن استخدام صيغة <code>inverted-colors</code> عندما يكون المستخدم قد فعّل نظام ألوان معكوسًا.</li>
</ul>
<h2 id="تحديد-النص-وقابلية-القراءة">تحديد النص وقابلية القراءة</h2>
<p>الأدوات التي تتحكم في تحديد النص (<code>user-select-none</code> و<code>select-text</code> وغيرها) وفي لفّ النص (<code>text-balance</code> و<code>text-pretty</code>) تؤثر أيضًا في قابلية القراءة وتفاعل المستخدم، ما يسهم في الوصولية. وإلى جانب ذلك، يمكن لأدوات تنعيم الخطوط (<code>antialiased</code> و<code>subpixel-antialiased</code>) أن تؤثر في تصيير النص.</p>
`,t={book:e,chapter:o,chapterTitle:d,slug:c,title:i,headings:a,html:n};export{e as book,o as chapter,d as chapterTitle,t as default,a as headings,n as html,c as slug,i as title};
