const s="kinney",n="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="lab-wire-accessibility-checks-into-shelf",l="مختبر",a=[{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"الخطوة-1-ثبت-تكامل-playwright",text:"الخطوة 1: ثبّت تكامل Playwright"},{depth:2,id:"الخطوة-2-أضف-مواصفة-مخصصة-لإمكانية-الوصول",text:"الخطوة 2: أضف مواصفة مخصّصة لإمكانية الوصول"},{depth:2,id:"الخطوة-3-تعامل-مع-الاستثناءات-المعروفة-بصدق",text:"الخطوة 3: تعامل مع الاستثناءات المعروفة بصدق"},{depth:2,id:"الخطوة-4-أضف-قائمة-تحقق-لوحة-المفاتيح-اليدوية",text:"الخطوة 4: أضف قائمة تحقّق لوحة المفاتيح اليدوية"},{depth:2,id:"الخطوة-5-اجعل-الحلقة-سهلة-التشغيل",text:"الخطوة 5: اجعل الحلقة سهلة التشغيل"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الواحد-الذي-يجب-تذكره",text:"الشيء الواحد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],i=`<p>هنا تتوقف إمكانية الوصول عن كونها شعورًا طيبًا وتصبح بوابة حقيقية.</p>
<p>ستضيف فحصًا آليًا إلى مجموعة اختبارات Shelf من طرف إلى طرف، ثم تقرنه بقائمة تحقّق يدوية صغيرة للحالات التي لا يستطيع الفحص إثباتها. أحب هذا المختبر لأنه صغير وآلي ومفيد فورًا. وأيضًا، يميل إلى كشف مشكلات واجهة لم تكن تدرك أنك تعانيها أصلًا. مفاجأة ممتعة.</p>
<blockquote>
<p><strong>المتطلبات المسبقة</strong></p>
<p>أكمل <a href="https://stevekinney.com/courses/self-testing-ai-agents/accessibility-as-a-quality-gate">إمكانية الوصول كبوابة جودة</a> أولًا. يفترض هذا المختبر أنك مقتنع أصلًا بالفصل بين الانتهاكات الآلية والفحوصات اليدوية وحدها.</p>
</blockquote>
<h2 id="المهمة">المهمة</h2>
<p>أضف اختبار دخان آليًا لإمكانية الوصول على مسارات Shelf الحرجة، ووثّق فحوصات لوحة المفاتيح اليدوية التي لا تستطيع الأتمتة تغطيتها.</p>
<h2 id="الخطوة-1-ثبت-تكامل-playwright">الخطوة 1: ثبّت تكامل Playwright</h2>
<p>ثبّت <a href="https://www.deque.com/axe/core-documentation/">تكامل axe-core مع Playwright</a>:</p>
<pre><code class="language-bash">npm install -D @axe-core/playwright
</code></pre>
<p>إن كنت قد أضفت الحزمة في تمريرة سابقة، فتأكد من النسخة وامضِ. لا تُعد تثبيت العالم كله للتسلية.</p>
<h2 id="الخطوة-2-أضف-مواصفة-مخصصة-لإمكانية-الوصول">الخطوة 2: أضف مواصفة مخصّصة لإمكانية الوصول</h2>
<p>أنشئ <code>tests/accessibility.spec.ts</code>.</p>
<p>ابدأ بالمسارات الأعلى إشارة في Shelf:</p>
<ul>
<li><code>/</code></li>
<li><code>/login</code></li>
<li><code>/playground</code> أو <code>/design-system</code></li>
<li>إن كنت قد بنيت مشروع المصادقة من مختبرات المصادقة السابقة، فأضف <code>/shelf</code> أيضًا</li>
</ul>
<p>ابدأ من هذا النمط بالضبط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">AxeBuilder</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@axe-core/playwright&#x27;</span>;
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;home page has no automated accessibility violations&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

  <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AxeBuilder</span>({ page }).<span class="hljs-title function_">withTags</span>([<span class="hljs-string">&#x27;wcag2a&#x27;</span>, <span class="hljs-string">&#x27;wcag2aa&#x27;</span>]).<span class="hljs-title function_">analyze</span>();

  <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">violations</span>).<span class="hljs-title function_">toEqual</span>([]);
});
</code></pre>
<p>أبقِ النطاق صغيرًا عمدًا في البداية. أفضل أن يكون لدي ثلاثة فحوصات إمكانية وصول مستقرة على مستوى المسار بدلًا من عشرين فحصًا صاخبًا لا يثق به أحد.</p>
<h2 id="الخطوة-3-تعامل-مع-الاستثناءات-المعروفة-بصدق">الخطوة 3: تعامل مع الاستثناءات المعروفة بصدق</h2>
<p>إن أعاد الفحص انتهاكًا حقيقيًا، فأصلح الترميز.</p>
<p>إن صادفت استثناءً مشروعًا:</p>
<ul>
<li>احصره بضيق عبر <code>exclude</code> أو كتم خاص بقاعدة</li>
<li>اترك تعليقًا في الشيفرة يشرح السبب</li>
<li>أضف السبب نفسه إلى ملخص المهمة أو رسالة الإيداع</li>
</ul>
<p>لا <strong>تعطّل</strong> فئات كبيرة من القواعد عالميًا لأن مكوّنًا واحدًا كان مزعجًا.</p>
<h2 id="الخطوة-4-أضف-قائمة-تحقق-لوحة-المفاتيح-اليدوية">الخطوة 4: أضف قائمة تحقّق لوحة المفاتيح اليدوية</h2>
<p>أنشئ <code>docs/accessibility-smoke-checklist.md</code> في مستودع Shelf.</p>
<p>أبقها قصيرة. ثلاثة إلى خمسة فحوصات تكفي:</p>
<ul>
<li>هل أستطيع الوصول إلى كل عنصر تحكم تفاعلي في <code>/shelf</code> بـ <code>Tab</code> و<code>Shift+Tab</code>؟</li>
<li>إذا فُتحت نافذة منبثقة، هل ينتقل التركيز إليها ويعود عند إغلاقها؟</li>
<li>هل تُعرض أخطاء التحقّق نصًا، لا لونًا فقط؟</li>
<li>هل أستطيع إرسال النماذج الأساسية دون لمس الفأرة؟</li>
</ul>
<p>هذا الملف موجود كي يعرف الوكيل والبشر معًا ما <em>لم</em> يثبته الفحص الآلي.</p>
<h2 id="الخطوة-5-اجعل-الحلقة-سهلة-التشغيل">الخطوة 5: اجعل الحلقة سهلة التشغيل</h2>
<p>لأن بادئة Shelf المصغّرة تشغّل بالفعل كل مواصفة تحت <code>tests/</code>، يمكنك ببساطة ترك <code>tests/accessibility.spec.ts</code> في المجموعة الرئيسية وترك <code>npm run test</code> يلتقطها. إن أردت حلقة تكرار أضيق بينما تبني الثقة بها، فأضف سكربتًا صريحًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test:accessibility&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test tests/accessibility.spec.ts&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>المفتاح أن يكون لدى الوكيل أمر مسمّى ليشغّله. الطقوس الخفية لا تصنع حلقات جيدة.</p>
<blockquote>
<p><strong>يمكن لـ Shelf أن يدمج إمكانية الوصول في حلقة Playwright الرئيسية</strong></p>
<p>بادئة Shelf <strong>لا</strong> تشحن سكربت <code>test:accessibility</code> مستقلًا. بمجرد وجود <code>tests/accessibility.spec.ts</code>، سيلتقطه <code>npm run test</code> تلقائيًا. هذا هو النمط المفضّل عندما تستقر المواصفة: بوابة واحدة، وأمر واحد، وبلا قنوات جانبية. إن كنت جديدًا على المشروع ولم تبنِ الثقة بالمواصفة بعد، فأبقِ السكربت المستقل أثناء التكرار، ثم أدمجه مرة أخرى في <code>npm run test</code> عندما يتوقف عن مفاجأتك.</p>
</blockquote>
<h2 id="معايير-القبول">معايير القبول</h2>
<ul>
<li><code>@axe-core/playwright</code> مثبّت في مستودع Shelf</li>
<li><code>tests/accessibility.spec.ts</code> موجود</li>
<li>تغطي المواصفة مسارين حرجين على الأقل من Shelf</li>
<li>يفشل فحص إمكانية الوصول الاختبار عند وجود <code>violations</code></li>
<li>أي كتم محصور بضيق وموثّق في الشيفرة</li>
<li><code>docs/accessibility-smoke-checklist.md</code> موجود مع فحوصات لوحة المفاتيح اليدوية</li>
<li>يوجد أمر مسمّى لتشغيل فحص إمكانية الوصول، مستقلًا أو كجزء من <code>npm run test</code></li>
<li>تشغيل مواصفة إمكانية الوصول محليًا يخرج بصفر على الحالة الخضراء الحالية</li>
</ul>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<ul>
<li>إن فشل الفحص بسبب مشكلات تباين أو معالم لم تتوقعها، فصدّق النتيجة أولًا وافحص الترميز ثانيًا.</li>
<li>إن كانت المسارات المصادَقة معنية، فأعد استخدام تهيئة حالة التخزين من <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">مصادقة حالة التخزين</a> بدلًا من اختراع مسار تسجيل دخول ثانٍ.</li>
<li>إن كان فحص إمكانية الوصول متقلبًا، فالسبب عادةً أن المسار لم يكن مستقرًا فعلًا بعد. أصلح حكاية الانتظار قبل أن تلوم الفحص.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>أضف اختبار دخان منفصلًا لإمكانية الوصول على مسار نظام التصميم لديك إن كان Shelf يعرض واحدًا.</li>
<li>أضف سكربت npm يشغّل مواصفة إمكانية الوصول وحدها مع تذكير بقائمة التحقّق اليدوية.</li>
<li>أضف خاصية ARIA سيئة عمدًا، وراقب الاختبار يفشل، ثم أصلحها حتى تثق بالحلقة.</li>
</ul>
<h2 id="الشيء-الواحد-الذي-يجب-تذكره">الشيء الواحد الذي يجب تذكّره</h2>
<p>فحوصات إمكانية الوصول ليست موجودة لتشعرك بالفضيلة. إنها موجودة لتجعل الانحدارات صاخبة. أبقِ النطاق صغيرًا، والنتائج موثوقة، وقائمة التحقّق اليدوية صادقة.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/wire-accessibility-checks-into-shelf-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/accessibility-as-a-quality-gate">إمكانية الوصول كبوابة جودة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحددات والتدرّج الهرمي لإمكانية الوصول</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:l,headings:a,html:i};export{s as book,n as chapter,e as chapterTitle,c as default,a as headings,i as html,t as slug,l as title};
