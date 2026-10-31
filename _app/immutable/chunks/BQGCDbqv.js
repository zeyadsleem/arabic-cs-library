const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",a="design-systems-across-microfrontends",e="أنظمة التصميم عبر الواجهات الأمامية الدقيقة",p=[{depth:2,id:"حزم-ذات-إصدارات-أولا-والاتحاد-ثانيا",text:"حزم ذات إصدارات أولًا، والاتحاد ثانيًا"},{depth:2,id:"قواعد-الاعتمادات-المشتركة",text:"قواعد الاعتمادات المشتركة"},{depth:2,id:"السمات-عبر-الحدود",text:"السمات عبر الحدود"},{depth:2,id:"التوثيق-والاكتشاف",text:"التوثيق والاكتشاف"},{depth:3,id:"ما-هو-أبعد-من-القصص-الذرية",text:"ما هو أبعد من القصص الذرّية"},{depth:2,id:"الاختبار-عبر-الحدود",text:"الاختبار عبر الحدود"},{depth:2,id:"الحوكمة-في-عالم-اتحادي",text:"الحوكمة في عالم اتحادي"},{depth:2,id:"الإعداد-الذي-أوصي-به",text:"الإعداد الذي أوصي به"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"ما-نظام-التصميم",text:"ما نظام التصميم؟"},{depth:3,id:"توزيع-نظام-التصميم",text:"توزيع نظام التصميم"},{depth:3,id:"السمات-عبر-الحدود-1",text:"السمات عبر الحدود"}],o=`<p>أول ما يجب تصفيته هو التأطير. فالمستودع الأحادي خيار تنظيم للمصدر وإدارة للحزم، والواجهات الأمامية الدقيقة خيار وقت تشغيل ونشر. وهما ليسا نقيضين. فيمكن أن يكون لديك مستودع أحادي ينشر واجهات أمامية دقيقة، ويمكن أن يكون لديك مستودع متعدد لا يفعل. وأكثر إعداد افتراضي استقرارًا هو عادةً مستودع أحادي لنظام التصميم <em>نفسه</em>، حتى عندما تُنشر المنتجات المستهلكة له كوحدات بعيدة تُبنى باستقلال.</p>
<p>فالواجهات الأمامية الدقيقة تغيّر كيف <em>يُسلَّم</em> النظام، لا ما هو العقد. فالعقد ما زال الرموز والمكوّنات والسمات وسلوك إمكانية الوصول. وما يتغيّر أن عليك الآن التفكير في تفاوض الإصدارات وقت التشغيل، والنسخ الوحيدة للاعتمادات المشتركة، والسمات عبر حزم مُصرَّفة منفصلة.</p>
<h2 id="حزم-ذات-إصدارات-أولا-والاتحاد-ثانيا">حزم ذات إصدارات أولًا، والاتحاد ثانيًا</h2>
<p>مع <a href="https://webpack.js.org/concepts/module-federation/">اتحاد الوحدات (Module Federation)</a>، يستطيع كل بناء أن يعمل كحاوية، وتُحمَّل الوحدات البعيدة بشكل غير متزامن، ويمكن نشر الصفحات أو المكتبات باستقلال. ويمكن إعادة استخدام الاعتمادات المشتركة عبر الحاويات، لكن تفاوض الإصدارات يصبح شأنًا من شؤون وقت التشغيل. وهنا قد تبدو المعمارية النظيفة فجأة كتفاوض رهائن.</p>
<p>ولأن الوحدات البعيدة غير متزامنة ويمكن للاعتمادات المشتركة أن تحذّر أو ترتدّ احتياطيًا عند اختلاف الإصدارات، فأكثر إعداد افتراضي أمانًا هو نشر الرموز والأسس والمكوّنات الأولية كـ<strong>حزم ذات إصدارات</strong> وترك كل واجهة أمامية دقيقة تُصرّف ضد إصدارات صريحة. واحفظ اتحاد وقت التشغيل في الأغلب لميزات على مستوى المسار، أو الشرائح الرأسية الأكبر، أو مجموعة صغيرة من المكوّنات المملوكة للهيكل.</p>
<p>و<a href="https://webpack.js.org/concepts/module-federation/">يحذّر Webpack</a> من أن الوحدات المشتركة المُبكِّرة تُنزَّل دائمًا، ويوصي بتوفيرها من نقطة واحدة في التطبيق—عادةً الهيكل. فإن شاركت كل شيء مبكرًا، فقد أعدت إنشاء تطبيق متجانس بخطوات إضافية وتخزين مؤقت أسوأ.</p>
<h2 id="قواعد-الاعتمادات-المشتركة">قواعد الاعتمادات المشتركة</h2>
<p>إن شاركت واجهة المستخدم وقت التشغيل فعلًا، فأحِط الاعتمادات المشتركة بقواعد صارمة. فينبغي تهيئة مكتبات الأطر مثل React وReactDOM كنسخ وحيدة مشتركة بإصدارات مطلوبة كي لا ينحرف المضيف والوحدات البعيدة عن بعضهما بهدوء. و<a href="https://module-federation.io/configure/shared">إعداد <code>shared</code> في اتحاد الوحدات</a> موجود تحديدًا لهذا النوع من إعادة الاستخدام وتنسيق الإصدارات.</p>
<p>وهذا حدّ أدنى معقول:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationPlugin</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shell&#x27;</span>,
  <span class="hljs-attr">remotes</span>: {
    <span class="hljs-attr">admin</span>: <span class="hljs-string">&#x27;admin@https://cdn.example.com/admin/remoteEntry.js&#x27;</span>,
  },
  <span class="hljs-attr">shared</span>: {
    <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">requiredVersion</span>: deps.<span class="hljs-property">react</span> },
    <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;react-dom&#x27;</span>] },
  },
});
</code></pre>
<p>تعني <code>singleton: true</code> أن كل وحدة بعيدة تستخدم نسخة React نفسها—بلا أشجار React مكرّرة، وبلا تعارضات سياق، وبلا انفجارات في ترتيب الخُطّافات. وتجعل <code>requiredVersion</code> حالات اختلاف الإصدارات تفشل سريعًا بدل إنتاج أخطاء وقت تشغيل غامضة على عمق ثلاث طبقات.</p>
<p>أبقِ السطح المشترك صغيرًا ومدروسًا. واختبر تحديثات الوحدات البعيدة تدريجيًا (canary). واحتفظ بمسار مفتاح إيقاف كي تستطيع تعطيل وحدة بعيدة سيئة السلوك دون إعادة نشر الهيكل.</p>
<h2 id="السمات-عبر-الحدود">السمات عبر الحدود</h2>
<p>ينبغي أن يملك الهيكل اختيار السمة، وCSS الأساسي، والرسم الأول لمتغيّرات الرموز. أما الوحدات البعيدة فتستهلك عقد الرموز—ولا تعيد تعريف ألوان العلامة محليًا لأن فريقًا قرّر أن اللون الأزرق السماوي سمة شخصية.</p>
<p>وإن كنت تدعم سمات متعددة، أو علامات، أو أنماطًا، أو أحجامًا، فصِغها كـ<strong>مجموعات رموز وسياقات محلِّلة</strong> لا كتجاوزات على مستوى التطبيق متناثرة عبر المنتجات. وقد بُني <a href="https://www.designtokens.org/glossary/">معجم DTCG ونموذج المحلِّل (resolver)</a> حول دمج المجموعات والمعدِّلات في مخرجات خاصة بسياق ما—فاتح مقابل داكن، وجوال مقابل سطح مكتب، وعلامة A مقابل علامة B. وهذا يجعل التنوّع جزءًا من الدرجة الأولى في النظام بدل ألف تجاوز عابر يختبئ في شيفرة المنتج.</p>
<p>وخصائص CSS المخصّصة هي آلية التسليم الصحيحة لأنها تعبر حدود Shadow DOM وتعمل في كل إطار. والهيكل يضبطها:</p>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--acme-color-primary</span>: <span class="hljs-number">#2563eb</span>;
  <span class="hljs-attr">--acme-color-surface</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attr">--acme-color-text</span>: <span class="hljs-number">#0f172a</span>;
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--acme-color-primary</span>: <span class="hljs-number">#60a5fa</span>;
  <span class="hljs-attr">--acme-color-surface</span>: <span class="hljs-number">#0f172a</span>;
  <span class="hljs-attr">--acme-color-text</span>: <span class="hljs-number">#f1f5f9</span>;
}
</code></pre>
<p>والوحدات البعيدة تستهلكها. بلا استيرادات، وبلا اقتران وقت بناء، وبلا تفاوض وقت تشغيل. وإن احتاجت وحدة بعيدة إلى معرفة السمة الحالية <em>برمجيًا</em> (لمنطق شرطي، لا للتنسيق)، فمرّرها عبر سياق الهيكل—<code>customProps</code> في single-spa، أو مزوّد سياق مشترك في اتحاد الوحدات.</p>
<h2 id="التوثيق-والاكتشاف">التوثيق والاكتشاف</h2>
<p>يحتاج نظام التصميم إلى مكان واحد يرى فيه المهندسون والمصمّمون الحقيقة. فـ<a href="https://storybook.js.org/docs/writing-docs/autodocs">التوثيق التلقائي في Storybook</a> يحوّل القصص إلى توثيق حيّ، ويمكنك توسيعه بـMDX وDoc Blocks للأجزاء التي تحتاج حكمًا—متى تستخدم مكوّنًا، ومتى <em>لا</em> تستخدمه، وكيف يتصرف في حالات الخطأ، وكيف يستجيب للتفاعل بلوحة المفاتيح، وما الذي تغيّر في آخر إصدار كاسر.</p>
<p>وإن كان مستودعك الأحادي يضم أطرًا متعددة، فلا تُجبر نسخة Storybook واحدة على التظاهر بأنها كل شيء. و<a href="https://nx.dev/docs/technologies/test-tools/storybook/guides/one-storybook-with-composition">إرشاد Nx</a> صريح: بنّاء Storybook لا يستطيع التعامل مع أطر متعددة في مضيف واحد. والنمط العملي هو مضيف واحد لكل إطار، ثم Storybook مُركَّب واحد للاكتشاف.</p>
<p>و<a href="https://nx.dev/docs/technologies/test-tools/storybook/guides/one-storybook-with-composition">تركيب Storybook</a> يتيح لك عرض نسخ Storybook متعددة في مكان واحد:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// .storybook/main.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">refs</span>: {
    <span class="hljs-attr">react</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;React Design System&#x27;</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;https://react-ds.example.com&#x27;</span>,
    },
    <span class="hljs-attr">vue</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Vue Design System&#x27;</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;https://vue-ds.example.com&#x27;</span>,
    },
  },
};
</code></pre>
<p>ومع ذلك، لا تُركّب كل تطبيق في الشركة في بوابة عملاقة واحدة. فدليل Nx نفسه يلاحظ أن التركيب يصير مرهقًا إن جذبت مصادر كثيرة. ركّب حسب النطاق، أو المنصة، أو الإطار—لا حسب كل تجربة عشوائية تركها أحدهم تعمل في زاوية.</p>
<h3 id="ما-هو-أبعد-من-القصص-الذرية">ما هو أبعد من القصص الذرّية</h3>
<p>لا تتوقف عند قصص المكوّنات المعزولة. فـ<a href="https://storybook.js.org/docs/writing-stories/stories-for-multiple-components">Storybook يدعم</a> قصصًا تصيّر مكوّنات متعددة معًا، وهذا بالضبط ما تحتاجه لأنماط مثل ترويسات الصفحات، وأشرطة الترشيح، والنماذج، والجداول ذات الإجراءات، أو أكوام البطاقات. وهنا يظهر عدم الاتساق الحقيقي. فقلة قليلة من الفرق تدمّر نظامًا بزر واحد، بل يدمّرونه بـ«تخطيط صفحة خاصة واحدة فقط».</p>
<h2 id="الاختبار-عبر-الحدود">الاختبار عبر الحدود</h2>
<p>ينبغي أن تحاكي مجموعة اختباراتك طبقات النظام.</p>
<p><strong>على مستوى المكوّن</strong>: <a href="https://storybook.js.org/docs/writing-tests/interaction-testing">اختبارات التفاعل في Storybook</a> تعمل في المتصفح، ومن المحرّر، وعبر واجهة سطر الأوامر، وفي CI. استخدمها لتغيّرات حالة المكوّنات، وتدفقات لوحة المفاتيح، والتفاعلات المُركَّبة البسيطة.</p>
<p><strong>إمكانية الوصول</strong>: <a href="https://storybook.js.org/docs/8/writing-tests/accessibility-testing">إضافة إمكانية الوصول في Storybook</a> تشغّل فحوصًا مؤتمتة ضمن إضافة الاختبار وتُسقط القصص عند ظهور مخالفات. وللسلوك الذي لا تستطيع الفحوص المؤتمتة التحقق منه كاملًا—أنماط التفاعل بلوحة المفاتيح، وإدارة التركيز، وإعلانات قارئ الشاشة—استخدم <a href="https://www.w3.org/WAI/ARIA/apg/">دليل ممارسات تأليف ARIA</a> مرجعًا أساسيًا.</p>
<p>وينبغي فرض إمكانية الوصول في النظام نفسه، لا تفويضها إلى فرق التطبيقات تذكرة Jira تلو الأخرى.</p>
<p><strong>اختبارات عقد الهيكل مع الوحدات البعيدة</strong>: أضف للواجهات الأمامية الدقيقة اختبارات تُثبت أن الهيكل يحمّل السمة الصحيحة، وأن النسخ الوحيدة المشتركة للأطر تتصرف كما يجب، وأن مكوّنات الوحدات البعيدة ما زالت تُصيّر صحيحًا داخل تخطيط المضيف وبيئة التنقل فيه. والهدف ليس إعادة اختبار كل زر في كل تطبيق، بل التحقق من مفاصل التكامل.</p>
<p>و<a href="https://playwright.dev/docs/test-components">Playwright</a> مناسب لهذه الاختبارات لأنه يعمل في متصفح حقيقي بتخطيط حقيقي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;remote renders correctly inside shell theme&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/admin&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForSelector</span>(<span class="hljs-string">&#x27;[data-mfe=&quot;admin&quot;]&#x27;</span>);

  <span class="hljs-comment">// Verify the remote loaded and consumed the shell&#x27;s theme tokens</span>
  <span class="hljs-keyword">const</span> button = page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;[data-mfe=&quot;admin&quot;] button&#x27;</span>).<span class="hljs-title function_">first</span>();
  <span class="hljs-keyword">const</span> bg = <span class="hljs-keyword">await</span> button.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">(<span class="hljs-params">el</span>) =&gt;</span> <span class="hljs-title function_">getComputedStyle</span>(el).<span class="hljs-property">backgroundColor</span>);
  <span class="hljs-title function_">expect</span>(bg).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;rgb(37, 99, 235)&#x27;</span>); <span class="hljs-comment">// --acme-color-primary</span>
});
</code></pre>
<h2 id="الحوكمة-في-عالم-اتحادي">الحوكمة في عالم اتحادي</h2>
<p>في المستودع الأحادي، تفرض الحدود بالوسوم وقيود الاعتمادات. أما في أسطول من الواجهات الأمامية الدقيقة فينتقل سطح الفرض. وتحتاج إلى تحديد من يملك:</p>
<ul>
<li><strong>عقود الهيكل</strong>: توزيع السمة، وحقن متغيّرات الرموز، وإطار التنقل.</li>
<li><strong>سياسة مشاركة الاعتمادات</strong>: ما يُشارك وقت التشغيل، وما يُصرَّف داخل الحزمة، وما قيود الإصدار المطبقة.</li>
<li><strong>سمات العلامة</strong>: أي الفرق يمكنها إدخال سمات جديدة، وكيف تُبنى مجموعات الرموز.</li>
<li><strong>قواعد الاعتمادات وقت التشغيل</strong>: ضمانات النسخة الوحيدة، والإصدارات المطلوبة، وسلوك الارتداد.</li>
</ul>
<p>وللتنوّع—علامات وسمات وأنماط كثافة متعددة—فضّل سياقات الرموز المُهيكلة على التجاوزات المحلية. فـ<a href="https://www.designtokens.org/glossary/">نموذج محلِّل DTCG</a> يتعلق صراحةً بدمج مجموعات الرموز مع المعدِّلات لإنتاج مخرجات خاصة بسياق ما. وهذا يجعل علامة A مقابل علامة B جزءًا من الدرجة الأولى في النظام بدل مجموعة متناثرة من فحوص <code>if (brand === 'b')</code> في شيفرة المنتج.</p>
<p>تبدو الحوكمة مملة حتى تصير لديك خمس نسخ «مؤقتة» من النافذة المنبثقة نفسها ولا يعرف أحد أيها النسخة المرجعية.</p>
<h2 id="الإعداد-الذي-أوصي-به">الإعداد الذي أوصي به</h2>
<p>أبقِ نظام التصميم في مستودع أحادي بحزم مساحة عمل حقيقية، حتى لو كانت التطبيقات المستهلكة تُنشر كواجهات أمامية دقيقة. واستخدم <a href="https://www.designtokens.org/TR/2025.10/format/">صيغة رموز DTCG 2025.10</a> مصدرًا مرجعيًا، وحوّل بـStyle Dictionary إلى CSS وأثر شيفرة، وافصل المكوّنات الخاصة بكل إطار في حزم مستقلة، وانشر Storybook مُركَّبًا كسطح الاكتشاف الوحيد.</p>
<p>واشحن نظام التصميم أساسًا كحزم ذات إصدارات. واحفظ اتحاد وقت التشغيل للشرائح الرأسية الأكبر أو نقاط التكامل المملوكة للهيكل، مع مشاركة اعتمادات الأطر كنسخ وحيدة صريحة. واختبر مفاصل التكامل بـPlaywright. وأصدر كل شيء بنُسخ عبر Changesets.</p>
<p>وذلك الإعداد ليس مبهرًا، ولهذا بالضبط يميل إلى النجاة عند التلامس مع الواقع.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="ما-نظام-التصميم">ما نظام التصميم؟</h3>
<blockquote>
<p>أكثر من مجرد مكتبة مكوّنات.</p>
</blockquote>
<ul>
<li><strong>رموز التصميم</strong> — القيم الذرّية: الألوان، والمسافات، والطباعة، والظلال.</li>
<li><strong>العناصر الأولية</strong> — المكوّنات الأساسية: Button وInput وCard وModal.</li>
<li><strong>المكوّنات المُركَّبة</strong> — أنماط مبنية من العناصر الأولية: DataTable وFormField وNavigation.</li>
<li><strong>التوثيق</strong> — إرشادات الاستخدام، وأمثلة الافعل/لا تفعل، ومتطلبات إمكانية الوصول.</li>
<li><strong>الأدوات</strong> — Storybook، واختبارات الانحدار البصري، وقواعد lint.</li>
</ul>
<p><strong>الهدف:</strong> الاتساق عبر تطبيقات تُنشر باستقلال، وتحافظ عليها فرق مستقلة.</p>
<hr>
<h3 id="توزيع-نظام-التصميم">توزيع نظام التصميم</h3>
<blockquote>
<p>كيف تنتقل المكوّنات من نظام التصميم إلى التطبيقات.</p>
</blockquote>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>المقايضة</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>حزم npm</strong> (مُصدَرة بنُسخ)</td>
<td>ترقيات صريحة، وخطر تشظّي الإصدارات</td>
</tr>
<tr>
<td><strong>Module Federation</strong> (مشتركة)</td>
<td>الأحدث دائمًا، وتحديات إصدار النسخة الوحيدة</td>
</tr>
<tr>
<td><strong>CDN</strong> (محزومة)</td>
<td>استهلاك بسيط، ويصعب تقليم الشجرة</td>
</tr>
<tr>
<td><strong>Web Components</strong></td>
<td>محايدة تجاه الأطر، وعزل Shadow DOM</td>
</tr>
</tbody>
</table>
<p><strong>نقطة البداية الموصى بها:</strong> حزم npm ذات إصدارات من مستودع أحادي. إدارة اعتمادات صريحة. والفرق ترقّي وفق جدولها الخاص.</p>
<p>أضف مشاركة Module Federation لاحقًا للمكوّنات التي <em>يجب</em> أن تبقى متزامنة عبر الوحدات البعيدة (مثل التنقل العام).</p>
<hr>
<h3 id="السمات-عبر-الحدود-1">السمات عبر الحدود</h3>
<blockquote>
<p>خصائص CSS المخصّصة — آلية السمات الوحيدة التي تعبر Shadow DOM.</p>
</blockquote>
<pre><code class="language-css"><span class="hljs-comment">/* Design system tokens — set by the host */</span>
<span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--ds-color-primary</span>: <span class="hljs-number">#0066cc</span>;
  <span class="hljs-attr">--ds-spacing-md</span>: <span class="hljs-number">16px</span>;
  <span class="hljs-attr">--ds-font-body</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, sans-serif;
}
</code></pre>
<pre><code class="language-css"><span class="hljs-comment">/* Remote component — consumes tokens */</span>
<span class="hljs-selector-class">.button</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--ds-color-primary);
  <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">var</span>(--ds-spacing-md);
  <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--ds-font-body);
}
</code></pre>
<ul>
<li>الرموز كخصائص CSS مخصّصة تنساب إلى الإطارات المدمجة وShadow DOM.</li>
<li>استخدم أسماء دلالية (<code>--ds-color-primary</code>) لا حرفية (<code>--ds-blue-500</code>).</li>
<li>المضيف يضبط السمة. والوحدات البعيدة تستهلكها. بلا اقتران.</li>
</ul>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:o};export{s as book,n as chapter,t as chapterTitle,l as default,p as headings,o as html,a as slug,e as title};
