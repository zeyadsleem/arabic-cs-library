const s="kinney",n="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="accessibility-as-a-quality-gate",t="إمكانية الوصول كبوابة جودة",l=[{depth:2,id:"لماذا-انضباط-المحددات-ضروري-لكنه-غير-كاف",text:"لماذا انضباط المحدّدات ضروري لكنه غير كافٍ"},{depth:2,id:"ما-الذي-ينبغي-أن-تلتقطه-البوابة-الآلية",text:"ما الذي ينبغي أن تلتقطه البوابة الآلية"},{depth:2,id:"كيف-تبدو-البوابة-في-الشيفرة",text:"كيف تبدو البوابة في الشيفرة"},{depth:2,id:"فحوص-إمكانية-الوصول-البنيوية-بلقطات-aria",text:"فحوص إمكانية الوصول البنيوية بلقطات ARIA"},{depth:2,id:"ما-لا-تستطيع-البوابة-الآلية-إثباته",text:"ما لا تستطيع البوابة الآلية إثباته"},{depth:2,id:"الإيجابيات-الكاذبة-والتجاوزات-والموضع-الذي-يسترخي-فيه-الناس",text:"الإيجابيات الكاذبة والتجاوزات والموضع الذي يسترخي فيه الناس"},{depth:2,id:"ما-الذي-ينبغي-أن-يفعله-الوكيل-عندما-تطلق-البوابة",text:"ما الذي ينبغي أن يفعله الوكيل عندما تُطلَق البوابة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"كيف-تعرف-أن-البوابة-تعمل",text:"كيف تعرف أن البوابة تعمل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],i=`<p>إن كنت قد كتبت يومًا اختبار <code>getByRole</code> جميلًا وشحنت مع ذلك واجهة غير متاحة، فأهلًا بك في النادي. لقد فعلتها. كانت مجموعة الاختبارات تبدو صالحة مستقيمة، وكانت تجربة قارئ الشاشة مع ذلك سيئة.</p>
<p>هذه هي الثغرة التي يُغلقها هذا الدرس.</p>
<p>تقرّبك المحدّدات الدلالية من واجهة متاحة لأنها تفرض الأسماء والأدوار والتسميات في الترميز. وهذه قيمة حقيقية. لكنها تبقى أثرًا جانبيًا لاختبار السلوك، لا حلقة مخصّصة لإمكانية الوصول. فالوكيل يحتاج إلى حلقة تقول صراحةً: «هذا التغيير أدخل انحدارًا في إمكانية الوصول، وهذا علامة توقّف.»</p>
<blockquote>
<p><strong>متطلب مسبق</strong></p>
<p>يفترض هذا الدرس أنك استوعبت بالفعل <a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحدّدات وتدرّج إمكانية الوصول</a>. فذلك الدرس يمنح الوكيل مقابض أفضل على الواجهة. وهذا الدرس يحوّل إمكانية الوصول نفسها إلى بوابة.</p>
</blockquote>
<h2 id="لماذا-انضباط-المحددات-ضروري-لكنه-غير-كاف">لماذا انضباط المحدّدات ضروري لكنه غير كافٍ</h2>
<p>انضباط المحدّدات يجيب في الأغلب عن سؤال واحد: <em>هل يستطيع الاختبار أن يجد الشيء كما يجده المستخدم؟</em></p>
<p>أما إمكانية الوصول فتسأل مجموعة أوسع من الأسئلة:</p>
<ul>
<li>هل يستطيع مستخدم لوحة المفاتيح الوصول إليه؟</li>
<li>هل ترتيب التركيز منطقي؟</li>
<li>هل يعلن عنصر التحكّم عن نفسه بوضوح لتقنيات المساعدة؟</li>
<li>هل يُظهِر النموذج حالة الخطأ، لا أن يصيّرها بالأحمر فقط؟</li>
<li>هل يحبس الحوار المنبثق التركيز ويعيده عندما يُغلق؟</li>
</ul>
<p>اختبارك <code>getByRole('button', { name: 'Save' })</code> يساعد في شريحة واحدة من ذلك بالضبط. شريحة مفيدة، نعم. أما الفطيرة كلها، فلا.</p>
<p>هذا هو النموذج الذهني الذي أريدك أن تحتفظ به: <strong>المحدّدات الدلالية ضغطٌ في المنبع، وفحوص إمكانية الوصول برهانٌ في المصبّ.</strong> أنت تريد الاثنين.</p>
<h2 id="ما-الذي-ينبغي-أن-تلتقطه-البوابة-الآلية">ما الذي ينبغي أن تلتقطه البوابة الآلية</h2>
<p>أسهل بوابة آلية تضيفها هي مسح بـ <a href="https://www.deque.com/axe/core-documentation/">axe-core</a> على مساراتك وتدفّقاتك الحرجة. وأنا أحبّ axe هنا لأنه مملّ على أفضل وجه: قواعد ناضجة، ومخرجات جيدة، ونتيجة نظيفة على شكل «هذه هي الانتهاكات» يستطيع الوكيل التصرّف بناءً عليها.</p>
<p>ما يجيده المسح الآلي:</p>
<ul>
<li>التسميات المفقودة أو غير الصحيحة</li>
<li>علاقات ARIA غير الصالحة</li>
<li>مشكلات المعالم (landmarks) وبنية العناوين</li>
<li>بعض مشكلات تباين الألوان</li>
<li>حقول النماذج الموجودة تقنيًا لكن غير المسمّاة فعليًا</li>
</ul>
<p>هذا الصنف من المشكلات مثالي لحلقة وكيل. فالوكيل يقرأ الانتهاكات، ويصلح الترميز، ويعيد تشغيل المسح، ويمضي.</p>
<p>وما <em>لا</em> أريده هو سرد ضبابي عن إمكانية الوصول يقول فيه الوكيل: «استخدمت <code>getByRole</code>، فنحن على الأرجح بخير». فـ«على الأرجح بخير» هي الطريقة التي تحصل بها الانحدارات على توصيلة مجانية إلى الإنتاج.</p>
<h2 id="كيف-تبدو-البوابة-في-الشيفرة">كيف تبدو البوابة في الشيفرة</h2>
<p>تكامل Playwright مع axe-core صغير بما يكفي ليسع في رأسك. تُثبّت حزمة واحدة (<code>@axe-core/playwright</code>)، وتستورد <code>AxeBuilder</code> منها، وتوجّهها إلى صفحة، وتستدعي <code>.analyze()</code>. وللنتيجة مصفوفة <code>violations</code> تُؤكِّد عليها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">AxeBuilder</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@axe-core/playwright&#x27;</span>;
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;shelf page has no automated accessibility violations&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);

  <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AxeBuilder</span>({ page }).<span class="hljs-title function_">withTags</span>([<span class="hljs-string">&#x27;wcag2a&#x27;</span>, <span class="hljs-string">&#x27;wcag2aa&#x27;</span>]).<span class="hljs-title function_">analyze</span>();

  <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">violations</span>).<span class="hljs-title function_">toEqual</span>([]);
});
</code></pre>
<p>وفيما يلي أمور يجدر فهمها عن تلك الكتلة قبل أن تبدأ كتابة كتلتي:</p>
<ul>
<li><strong><code>new AxeBuilder({ page })</code></strong> يربط تشغيل axe بصفحة Playwright الحالية (<code>Page</code>). فكل اختبار له بانيه الخاص؛ ولا تحاول مشاركة باني واحد بين اختبارات.</li>
<li><strong><code>.withTags(['wcag2a', 'wcag2aa'])</code></strong> يحصر مجموعة القواعد في المستويين A وAA من WCAG 2.0. وهذا هو الحدّ الذي أريده افتراضيًا. ويمكنك إضافة <code>'wcag21a'</code> و<code>'wcag21aa'</code> إن أردت WCAG 2.1، أو التقييد بقاعدة بعينها عبر <code>.withRules(...)</code>. وبلا <code>withTags</code> يشغّل axe كل قاعدة يشحنها — وأكثرها ليست إخفاقات تريد أن تبوّب عليها.</li>
<li><strong><code>.analyze()</code></strong> هو نقطة الانتظار. فهو يمشي على DOM، ويشغّل مجموعة القواعد، ويعيد كائن نتائج فيه مصفوفات <code>violations</code> و<code>passes</code> و<code>incomplete</code> و<code>inapplicable</code>.</li>
<li><strong><code>expect(results.violations).toEqual([])</code></strong> هو البوابة. فمصفوفة <code>violations</code> الفارغة تعني أن axe لم يجد خطأً. وأي شيء آخر يُفشل الاختبار، مع طباعة تفاصيل الانتهاك في مخرجات الإخفاق.</li>
</ul>
<p>هذا هو الشكل كله. ثلاثة أسطر إعداد، وتأكيد واحد. ويضيف مختبر إمكانية الوصول هذا النمط نفسه بالضبط إلى <code>tests/accessibility.spec.ts</code>، محصورًا في المسارات الأعلى إشارة؛ ومتى فهمت القطع الأربع أعلاه استطعت قراءة ذلك الملف كتنفيذ حقيقي الشكل لا كلغز.</p>
<p>تغفل النسخة الانطلاقية من Shelf هذا الفحص. ومتى وثقت بالمسح بما يكفي لتجعله جزءًا من البوابة الرئيسية، فدع <code>tests/accessibility.spec.ts</code> يسير في حلقة <code>npm run test</code> العادية بدلًا من إخفائه خلف أمر جانبي.</p>
<h2 id="فحوص-إمكانية-الوصول-البنيوية-بلقطات-aria">فحوص إمكانية الوصول البنيوية بلقطات ARIA</h2>
<p>axe بارع في القواعد. لكنه لا يحاول أن يخبرك هل تغيّر <em>شكل</em> قائمة أو حوار أو شجرة أو نموذج تغيّرًا هادئًا لا يزال يجتاز axe لكنه صار الآن خاطئًا لتقنيات المساعدة.</p>
<p>وهنا تكسب <a href="https://playwright.dev/docs/aria-snapshots">لقطات ARIA</a> قيمتها. يستطيع Playwright أن يلتقط شجرة إمكانية الوصول لمحدّد بصيغة YAML ويقارنها بـ <code>toMatchAriaSnapshot()</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> dialog = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;dialog&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Rate Station Eleven&#x27;</span> });

<span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(dialog).<span class="hljs-title function_">toMatchAriaSnapshot</span>(<span class="hljs-string">\`
- dialog &quot;Rate Station Eleven&quot;:
  - heading &quot;Rate Station Eleven&quot;
  - radio &quot;1 star&quot;
  - radio &quot;2 stars&quot;
  - radio &quot;3 stars&quot;
  - radio &quot;4 stars&quot;
  - radio &quot;5 stars&quot;
  - button &quot;Save rating&quot;
  - button &quot;Cancel&quot;
\`</span>);
</code></pre>
<p>ويمكنك أيضًا فحص البنية الخام بـ <code>await dialog.ariaSnapshot()</code> حين تحاول معرفة ما الذي تثبّته.</p>
<p>هذه ليست بديلًا عن axe. بل هي المكمّل:</p>
<ul>
<li><strong>axe</strong> يلتقط التسميات غير الصالحة، وعلاقات ARIA المكسورة، وانتهاكات القواعد</li>
<li><strong>لقطات ARIA</strong> تلتقط الانزياح البنيوي في الشجرة المتاحة</li>
</ul>
<p>استخدمها في الواجهات التي تكون فيها البنية المتاحة <em>هي</em> العقد: الحوارات المنبثقة، والقوائم، ومعالم التنقّل، والأكورديونات، والنماذج المجمّعة، وكل ما تهمّ فيه الدلالة أكثر من البكسلات.</p>
<p>وأبقِ اللقطة مركّزة. فلقطة صفحة كاملة لأن «لمَ لا» هي الطريقة التي تصنع بها ملفات ذهبية صاخبة لا يثق بها أحد.</p>
<h2 id="ما-لا-تستطيع-البوابة-الآلية-إثباته">ما لا تستطيع البوابة الآلية إثباته</h2>
<p>لإمكانية الوصول طبقة يدوية لا تستطيع التخلص منها بالأماني. و<a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible.html">إرشادات W3C لإتاحة لوحة المفاتيح</a> لا تزال هي الحدّ الصحيح هنا: كل الوظائف يجب أن تكون قابلة للتشغيل من لوحة المفاتيح، ولا يجوز أن يُحبَس التركيز في مواضع غريبة.</p>
<p>المسح الآلي لن يخبرك:</p>
<ul>
<li>هل ترتيب التركيز بديهي</li>
<li>هل تبدو النافذة المنبثقة معقولة عند التنقّل فيها بمفتاح Tab</li>
<li>هل نص الإعلان مفيد فعلًا، لا مجرّد موجود</li>
<li>هل لتفاعل السحب والإفلات مسار مكافئ لمستخدمي غير المؤشّر</li>
<li>هل تجعل الحركة أو المهل أو الكشف التدريجي التدفّق مُنهِكًا في الاستخدام</li>
</ul>
<p>إذن للبوابة جزءان:</p>
<ul>
<li><strong>الانتهاكات الآلية</strong>: تُفشل الحلقة فورًا.</li>
<li><strong>الفحوص اليدوية وحدها</strong>: أبقِ قائمة تحقّق قصيرة للتدفّقات المهمّة، ولا تتظاهر بأن الروبوت غطّاها.</li>
</ul>
<p>هذا الانقسام مهم. فقائمة تحقّق قصيرة صادقة تتفوّق دائمًا على إحساس زائف بالاكتمال.</p>
<h2 id="الإيجابيات-الكاذبة-والتجاوزات-والموضع-الذي-يسترخي-فيه-الناس">الإيجابيات الكاذبة والتجاوزات والموضع الذي يسترخي فيه الناس</h2>
<p>هنا عادةً ما يفسد الفرق الحلقة: تظهر أول نتيجة صاخبة، فيعطّل أحدهم القاعدة عالميًا، فتصبح بوابة إمكانية الوصول زينة.</p>
<p>لا تفعل ذلك.</p>
<p>السياسة التي أستخدمها بسيطة:</p>
<ul>
<li>تعامل مع <code>violations</code> على أنها مانعة إلى أن يثبت العكس.</li>
<li>تعامل مع <code>incomplete</code> أو النتائج التي تحتاج مراجعة يدوية كطابور للتحقق البشري، لا كبناء فاشل.</li>
<li>إن عطّلت قاعدة، فاحصر التجاوز بأضيق نطاق ممكن واترك جملة تشرح لماذا يبقى المكوّن متاحًا.</li>
</ul>
<blockquote>
<p><strong>التجاوزات</strong></p>
<p>التجاوز بلا سبب مكتوب ليس تجاوزًا. إنه لغز مستقبلي. ضع السبب بجوار التجاوز حتى لا ينقله الوكيل التالي تقليدًا أعمى في أنحاء قاعدة الشيفرة.</p>
</blockquote>
<p>الهدف الحقيقي ليس «صفر نتائج بأي ثمن». الهدف هو «كل نتيجة متبقية مفهومة».</p>
<h2 id="ما-الذي-ينبغي-أن-يفعله-الوكيل-عندما-تطلق-البوابة">ما الذي ينبغي أن يفعله الوكيل عندما تُطلَق البوابة</h2>
<p>أريد من الوكيل أن يتعامل مع انتهاك إمكانية الوصول كما يتعامل مع اختبار فاشل: لا كاقتراح، ولا كشيء يُبرَّر في الملخّص.</p>
<p>الحلقة هي:</p>
<ol>
<li>شغّل مسح إمكانية الوصول بعد تغييرات الواجهة.</li>
<li>أصلح كل انتهاك جديد.</li>
<li>أعد تشغيل المسح.</li>
<li>إن وجب تعطيل قاعدة، وثّق السبب في الشيفرة وفي ملخّص المهمة.</li>
<li>إن أثّر التغيير في تدفّق لوحة المفاتيح، فشغّل قائمة التحقّق اليدوية قبل إعلان الإنجاز.</li>
</ol>
<p>هذا كل شيء. بلا خطب عن أهمية إمكانية الوصول. فالبوابة قالت ذلك بالفعل.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Accessibility</span>

<span class="hljs-bullet">-</span> After any meaningful UI change, run the automated accessibility scan
  for the affected route or component before declaring the task done.
<span class="hljs-bullet">-</span> Treat new accessibility violations as blocking. Fix them before
  reporting completion.
<span class="hljs-bullet">-</span> If a rule must be suppressed, scope the suppression narrowly and leave
  a sentence explaining why the component remains accessible.
<span class="hljs-bullet">-</span> For dialogs, menus, and other complex interactions, run the manual
  keyboard checklist in addition to the automated scan.
<span class="hljs-bullet">-</span> For UI whose accessible structure matters, add a focused ARIA snapshot
  with <span class="hljs-code">\`toMatchAriaSnapshot()\`</span> alongside the axe scan.
<span class="hljs-bullet">-</span> Do not claim a feature is accessible merely because Playwright locators
  use roles and labels. That is upstream pressure, not proof.
</code></pre>
<h2 id="كيف-تعرف-أن-البوابة-تعمل">كيف تعرف أن البوابة تعمل</h2>
<p>تعرف أن هذه الحلقة قائمة عندما:</p>
<ul>
<li>تكون للمسارات الحرجة لقطة مسح آلية لإمكانية الوصول</li>
<li>تكون لتدفّقات الواجهة المعقّدة قائمة تحقّق صغيرة يدوية للوحة المفاتيح</li>
<li>يتعامل الوكيل مع انتهاكات إمكانية الوصول الجديدة كبناء أحمر، لا كملاحظة</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>المحدّدات الدلالية تجعل الترميز المتاح أكثر احتمالًا. لكنها لا تُنجز إمكانية الوصول. فإن كانت إمكانية الوصول تهمّك، فأعطها بوابتها الخاصة، واجعل تلك البوابة صاخبة بما يكفي بحيث لا يستطيع الوكيل تجاوزها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحدّدات وتدرّج إمكانية الوصول</a></li>
<li><a href="https://playwright.dev/docs/aria-snapshots">لقطات ARIA</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-accessibility-checks-into-shelf">مختبر: وصّل فحوص إمكانية الوصول إلى Shelf</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:l,html:i};export{s as book,n as chapter,e as chapterTitle,o as default,l as headings,i as html,a as slug,t as title};
