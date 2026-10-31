const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",a="scaling-typescript",c="توسيع نطاق TypeScript",o=[{depth:2,id:"أين-ينكسر",text:"أين ينكسر"},{depth:2,id:"قس-أولا",text:"قِس أولًا"},{depth:2,id:"إبقاء-typescript-سريعا",text:"إبقاء TypeScript سريعًا"},{depth:3,id:"قلص-البرنامج",text:"قلّص البرنامج"},{depth:3,id:"تخلص-من-ملفات-البرميل",text:"تخلّص من ملفات البرميل"},{depth:3,id:"افصل-فحص-الأنواع-عن-الترجمة",text:"افصل فحص الأنواع عن الترجمة"},{depth:3,id:"حسن-أنواعك",text:"حسّن أنواعك"},{depth:3,id:"اضبط-tsconfig-لديك",text:"اضبط tsconfig لديك"},{depth:3,id:"راقب-المصرف-الأصلي",text:"راقب المصرّف الأصلي"},{depth:3,id:"حدث-أولا-وارتبك-لاحقا",text:"حدّث أولًا، وارتبك لاحقًا"},{depth:2,id:"typescript-في-المستودعات-الأحادية",text:"TypeScript في المستودعات الأحادية"},{depth:3,id:"مراجع-المشاريع",text:"مراجع المشاريع"},{depth:3,id:"حزم-حقيقية-لا-مجلدات-ذات-طموحات",text:"حزم حقيقية، لا مجلدات ذات طموحات"},{depth:3,id:"وائم-إعدادات-الوحدات-مع-الواقع",text:"وائم إعدادات الوحدات مع الواقع"},{depth:3,id:"أبق-المصدر-والمخرجات-منفصلين",text:"أبقِ المصدر والمخرجات منفصلين"},{depth:3,id:"افصل-الاهتمامات-في-مشاريع-منفصلة",text:"افصل الاهتمامات في مشاريع منفصلة"},{depth:3,id:"الحدود-المعمارية",text:"الحدود المعمارية"},{depth:3,id:"تنسيق-المهام",text:"تنسيق المهام"},{depth:3,id:"سياسة-الإصدار-الواحد",text:"سياسة الإصدار الواحد"},{depth:2,id:"مرجع-سريع",text:"مرجع سريع"},{depth:3,id:"خيارات-المصرف",text:"خيارات المصرّف"},{depth:3,id:"أعلام-التشخيص",text:"أعلام التشخيص"},{depth:2,id:"إعداد-افتراضي-يشيخ-بكرامة",text:"إعداد افتراضي يشيخ بكرامة"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"أين-ينكسر-typescript",text:"أين ينكسر TypeScript"},{depth:3,id:"قس-أولا-1",text:"قِس أولًا"},{depth:3,id:"مراجع-المشاريع-1",text:"مراجع المشاريع"},{depth:3,id:"الإعداد-الافتراضي",text:"الإعداد الافتراضي"}],p=`<p>يكون TypeScript رائعًا حتى يتوقف عن ذلك. فعند بضع آلاف أسطر من الشيفرة، يبدو كل شيء سريع الاستجابة—يبرز محررك الأخطاء فورًا، وينتهي <code>tsc</code> في ثوانٍ، والحياة جميلة. لكن عند حدود مئات الآلاف من الأسطر، تبدأ في ملاحظة أن بيئة التطوير تستغرق دقيقتين لتعرض عليك خطًا متعرجًا أحمر، وأن خط CI يحرق طاقة حسابية في اختبارات لم تكن بحاجة إلى التشغيل، وأن <code>tsc</code> يستهلك من الذاكرة ما يجعل مروحة حاسوبك المحمول مسموعة من الجهة الأخرى للغرفة.</p>
<p>الجزء المحبط أن السبب نادرًا ما يكون شيئًا <em>واحدًا</em>. فـTypeScript لا «ينكسر» لأنك تجاوزت عتبة سحرية لعدد الأسطر، بل يبدأ ينكسر عندما يُجبَر المصرّف وخدمة اللغة على فهم الكثير دفعة واحدة، أو عندما يتوقف مخطط الأنواع ومخطط الوحدات عن مطابقة البنية الحقيقية للمستودع. وتظل وثائق TypeScript و<a href="https://github.com/microsoft/Typescript/wiki/Performance">دليل الأداء</a> يعودان إلى الثيمة نفسها: أي قاعدة شيفرة غير تافهة يجب تقسيمها إلى مشاريع أصغر بحيث يحمّل المصرّف ملفات أقل، ويستهلك ذاكرة أقل، وينجز عملًا أقل في كل تحرير وكل بناء.</p>
<p>وهذه هي النقطة التي تربك الناس: بطء البناء وبطء المحرر مشكلة واحدة في جوهرها ترتدي زيّين مختلفين. فخدمة المحرر في TypeScript مرتبطة بسلوك الفحص الكامل للمشروع نفسه الذي يقدمه <code>tsc</code>. و<a href="https://github.com/microsoft/Typescript/wiki/Performance">تلاحظ الوثائق صراحةً</a> أن أداء المحرر مرتبط بتكلفة فحص المشروع، حتى لو كانت تشخيصات الملفات المفتوحة قد تظهر أسرع من بناء كامل.</p>
<h2 id="أين-ينكسر">أين ينكسر</h2>
<table>
<thead>
<tr>
<th>نمط الفشل</th>
<th>العَرَض</th>
<th>الإصلاح الأساسي</th>
</tr>
</thead>
<tbody>
<tr>
<td>برنامج متضخم</td>
<td>بناءات بطيئة وذاكرة مرتفعة</td>
<td>تضييق <code>include</code> وضبط <code>&quot;types&quot;: []</code></td>
</tr>
<tr>
<td>ملفات البرميل (barrel files)</td>
<td>استيراد واحد يسحب مئات الوحدات</td>
<td>استيرادات مباشرة، وإزالة ملفات الفهرس المُصدِّرة من جديد</td>
</tr>
<tr>
<td>أنواع معقدة</td>
<td>فحص بطيء واتحادات تربيعية</td>
<td>فضّل الواجهات، وسمِّ الأنواع الشرطية</td>
</tr>
<tr>
<td>صادرات مجهولة</td>
<td>مخرجات <code>.d.ts</code> ضخمة</td>
<td>أضف أنواع إرجاع صريحة للصادرات</td>
</tr>
<tr>
<td>تلوث الأنواع المحيطة</td>
<td>بدء بطيء وتكرار في المتغيرات العامة</td>
<td>اضبط <code>&quot;types&quot;: []</code> واسرد ما تحتاج فقط</td>
</tr>
<tr>
<td>الفحص الآلي المكتوب بالأنواع</td>
<td>ESLint بطيء وتحليل كامل للمشروع</td>
<td>ضيّق <code>tsconfig</code> لأجل الفحص، وعطّل قواعد الأنواع انتقائيًا</td>
</tr>
<tr>
<td>انحراف حل الوحدات</td>
<td>يعمل محليًا وينكسر عند المستهلكين</td>
<td>استخدم <code>nodenext</code> وتجنب الاستيرادات بلا امتداد</td>
</tr>
<tr>
<td>اعتمادات دائرية</td>
<td>أخطاء تنميط عميقة وقيم <code>undefined</code> وقت التشغيل</td>
<td>اكسر الحلقات وأعد هيكلة مخطط الحزم</td>
</tr>
</tbody>
</table>
<p><strong>حجم البرنامج</strong> هو أبسط أنماط الفشل مباشرة. فملف <code>tsconfig</code> واحد يتضمن بالخطأ الشيفرة المصدرية والاختبارات والملفات المولّدة وحزم <code>@types</code> الإضافية وأجزاء من <code>node_modules</code> يحوّل كل تحرير إلى مشكلة أكبر بكثير مما ينبغي. ويشير <a href="https://github.com/microsoft/Typescript/wiki/Performance">دليل الأداء</a> في TypeScript إلى أنماط <code>include</code> المتضخمة والمجلدات المختلطة في المشروع والاختبارات المجاورة لشيفرة المنتج والمجلدات الثقيلة تحت جذور المصدر بوصفها أسبابًا شائعة لبطء البناء وارتفاع استهلاك الذاكرة.</p>
<p><strong>ملفات البرميل</strong> تزيد حجم البرنامج سوءًا بإخفائه. وأنت تعرف النمط—ملف <code>index.ts</code> يعيد تصدير كل شيء من مجلد كي يكتب المستهلكون استيرادًا نظيفًا من سطر واحد. وعلى النطاق الصغير، هذا تيسير لطيف. وعلى النطاق الكبير، كارثة أداء. فعندما تستورد مكوّنًا واحدًا عبر ملف برميل، يتعين على TypeScript تحليل <em>كامل</em> مخطط الوحدات المتصل بذلك البرميل—كل ملف مُعاد تصديره، وكل اعتماد لاحق لتلك الملفات. فيصبح استيراد واحد سلسلة متتالية من مئات الوحدات.</p>
<p>أزالت Atlassian ملفات البرميل لديها فانخفض متوسط زمن البناء بنسبة 75%، وتحسنت سرعة الإبراز في بيئة التطوير بنسبة 30%، وتراجع عدد اختبارات الوحدة المنفذة في كل طلب سحب بنسبة 88%. وهذا ليس خطأ مطبعيًا.</p>
<p><strong>تعقيد الأنواع</strong> هو حيث تنزلق فرق عاقلة في غير ذلك إلى مسرح أداء على مستوى الأنواع. فأنواع التقاطع أكلف من تسلسلات الواجهات المكافئة لأن الواجهات تُسطَّح ويمكن تخزين علاقاتها مؤقتًا. والاتحادات الكبيرة تصبح مكلفة لأن أعضاءها يُقارَنون مرارًا وقد يصبح اختزالها بمثابة تعقيد تربيعي. والأنواع الشرطية والمعيّنة المتداخلة بعمق يُعاد تقييمها مرارًا وتكرارًا ما لم تمنحها أسماء مستقرة يستطيع المصرّف تخزينها مؤقتًا. و<a href="https://github.com/microsoft/Typescript/wiki/Performance">ويكي الأداء</a> في TypeScript صريح على نحو غير معتاد هنا: فضّل الواجهات على التقاطعات، وفضّل الأنواع الأساسية على الاتحادات العملاقة، وسمِّ الأنواع الشرطية المعقدة بدلًا من تضمينها في كل مكان.</p>
<p><strong>تعقيد التعريفات</strong> أكثر خفاءً. فالأنواع المجهولة المُستنتَجة للصادرات قد تبدو أنيقة في المصدر ثم تتحول إلى مخرجات <code>.d.ts</code> بشعة، ما يجعل البناءات التدريجية والفحص اللاحق أبطأ. ويوصي فريق TypeScript <a href="https://github.com/microsoft/Typescript/wiki/Performance">تحديدًا</a> بإضافة تلميحات صريحة—خصوصًا أنواع الإرجاع في الدوال المُصدَّرة—لأن الأنواع المسماة أكثر إحكامًا وتقلل العمل اللازم لقراءة ملفات التعريف وكتابتها.</p>
<p><strong>تلوث الأنواع المحيطة</strong> مجرم هادئ آخر. فافتراضيًا، يضم TypeScript تلقائيًا كل حزمة <code>@types</code> يجدها في <code>node_modules</code>، حتى لو لم تستوردها قط. وهذا يبطئ بناء البرنامج ويخلق السيرك المعتاد من معرّفات عامة مكررة عندما تتكدس أطر الاختبار ومتغيرات المتصفح العامة ومتغيرات Node العامة معًا.</p>
<p><strong>الفحص الآلي المكتوب بالأنواع</strong> يضيف طبقة أخرى. فاستخدام <code>@typescript-eslint</code> مع قواعد واعية بالأنواع يمنحك أمانًا مذهلًا، لكنه يتطلب من TypeScript تحليل مشروعك بأكمله فقط ليعرف الأنواع لأجل المدقق. إنها ضريبة، وهي على قاعدة شيفرة كبيرة ضريبة باهظة. وأنماط glob الواسعة في <code>tsconfig.json</code> (مثل <code>**/*</code>) تزيدها سوءًا بجذب مخرجات البناء بالخطأ.</p>
<p><strong>انحراف حل الوحدات</strong> يظهر عادة في المستودعات الأحادية على هيئة «يعمل في المحرر، ويعمل في المُجمِّع، ثم ينفجر عند المستهلكين». يدعم TypeScript حقلي <code>exports</code> و<code>imports</code> في <code>package.json</code> في أنماط الحل الحديثة، لكن <code>paths</code> لا يعلّم المصرّف سوى كيفية حل اسم محليًا—فهو لا يعيد كتابة محددات الاستيراد المُصدَرة. وفوق ذلك، <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html">تحذّر وثائق TypeScript</a> من أن <code>&quot;moduleResolution&quot;: &quot;bundler&quot;</code> قد يسمح باستيرادات بلا امتداد تكون سليمة في المُجمِّعات وخاطئة في Node.js، ويمكن أن تتسرب هذه المحددات السيئة إلى ملفات التعريف إذا نشرت المكتبات بلا حذر.</p>
<p><strong>الاعتمادات الدائرية</strong> هي مفاجأة وقت التشغيل الكلاسيكية. فعندما تستورد الوحدة A الوحدة B، وتستورد الوحدة B الوحدة A، تحصل على أخطاء تنميط «عميقة بإفراط»، وترجمة بطيئة، وأحيانًا قيم <code>undefined</code> وقت التشغيل تكون مربكة جدًا في التنقيح.</p>
<p>ثم هناك <strong>مقايضة التفكيك</strong> نفسها. فمشروع عملاق واحد يُثقل المحرر والمدقق، ومشاريع صغيرة أكثر من اللازم تخلق عبئًا إضافيًا وتكرارًا في فحص أنواع الاعتمادات المشتركة. ويقدم <a href="https://github.com/microsoft/Typescript/wiki/Performance">دليل الأداء</a> في TypeScript قاعدة عملية تجريبية لمساحات العمل متعددة المشاريع: نطاق يتراوح حول 5 إلى 20 مشروعًا غالبًا نطاق معقول، بمشاريع متساوية الأحجام وحدود تطابق طريقة تحرير الملفات معًا. أما البشر، بطبيعة الحال، فيفضلون إما كرة طين عملاقة واحدة وإما سبعًا وثمانين حزمة دقيقة مُسمّاة على أسماء المشاعر.</p>
<h2 id="قس-أولا">قِس أولًا</h2>
<p>قبل أن تبدأ في تقليب الأعلام وإعادة هيكلة مستودعك بأكمله، اكتشف أين يذهب الوقت فعلًا. فـTypeScript يمنحك الأدوات لفعل ذلك—لكن معظم الناس لا يعرفون بوجودها.</p>
<p>ابدأ بـ<code>--extendedDiagnostics</code> للحصول على تفصيل لما يصرفه <code>tsc</code> من وقت:</p>
<pre><code class="language-bash">tsc -p tsconfig.json --extendedDiagnostics
</code></pre>
<p>طريقة مفيدة لقراءة المخرجات: إذا كانت قيمتا <code>Files</code> و<code>I/O Read time</code> مرتفعتين، فالمشكلة عادة في مجموعة ملفاتك أو في حل الوحدات. وإذا كانت <code>Check time</code> هي المهيمنة، فالمشكلة في أنواعك.</p>
<p>وعندما تحتاج إلى التعمق أكثر:</p>
<pre><code class="language-bash">tsc -p tsconfig.json --listFilesOnly
tsc -p tsconfig.json --explainFiles &gt; explain.txt
tsc -p tsconfig.json --traceResolution &gt; resolution.txt
tsc -p tsconfig.json --generateTrace .trace --incremental <span class="hljs-literal">false</span>
</code></pre>
<p>يعرض <code>--listFilesOnly</code> كل ملف قرر TypeScript تضمينه—وستفاجأ على الأرجح ببعضها. ويخبرك <code>--explainFiles</code> بـ<em>سبب</em> سحب كل ملف. وينتج <code>--generateTrace</code> أثرًا متوافقًا مع Chrome تكون فيه <code>checkSourceFile</code> و<code>checkExpression</code> و<code>checkVariableDeclaration</code> الأحداث الأجدر بالتحديق فيها عندما تحتاج إلى عزل نقطة ساخنة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>غالبًا ما يكون التتبع بـ<code>tsc</code> وحده أسهل من محاولة تشخيص المشكلة نفسها عبر مُجمِّع، ويظل عادة ممثلًا للواقع.</p>
</blockquote>
<h2 id="إبقاء-typescript-سريعا">إبقاء TypeScript سريعًا</h2>
<p>الهدف هو فصل حجم قاعدة شيفرتك عن زمن استجابة أدوات التطوير لديك. فمستودع فيه عشرة أضعاف الشيفرة ينبغي ألّا يستغرق عشرة أضعاف زمن البناء.</p>
<h3 id="قلص-البرنامج">قلّص البرنامج</h3>
<p>أسهل مكسب. أبقِ <code>include</code> ضيقًا—عادة مجرد <code>src</code> أو مجلد إدخال حقيقي آخر. وأضف استثناءات صريحة لـ<code>**/node_modules</code> والمجلدات النقطية. ولا تخلط ملفات من مشاريع متعددة في المجلد نفسه. وإذا كانت الاختبارات تعيش بجوار شيفرة المنتج، فسمّها أو ضعها بحيث يسهل استثناؤها من مشروع الإنتاج.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/.*/&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يستحق ضبط <code>&quot;types&quot;: []</code> إشارة خاصة. فبالنسبة إلى حزم التطبيقات والمكتبات التي لا تحتاج إلى متغيرات عامة محيطة، يمنع هذا TypeScript من التضمين التلقائي لكل حزمة <code>@types</code> يجدها. أما مشاريع الاختبارات، فاسرد فيها المتغيرات العامة التي تحتاجها فعلًا فقط. وهذا يقلل عمل بدء التشغيل ويتجنب تعارضات التعريفات العامة عبر الحزم.</p>
<h3 id="تخلص-من-ملفات-البرميل">تخلّص من ملفات البرميل</h3>
<p>استبدل استيرادات البرميل باستيرادات مباشرة. فبدلًا من <code>import { Button } from './components'</code>، اكتب <code>import { Button } from './components/Button/Button'</code>. إنها أكثر إسهابًا، بالتأكيد. لكن أدواتك ستشكرك، وسيكف زملاؤك عن الشكوى من تباطؤ المحرر.</p>
<h3 id="افصل-فحص-الأنواع-عن-الترجمة">افصل فحص الأنواع عن الترجمة</h3>
<p>لا تستخدم <code>tsc</code> لترجمة شيفرتك أثناء التطوير. استخدم مترجمًا يجرّد الأنواع مكتوبًا بلغة مُصرَّفة—<strong>esbuild</strong> أو <strong>SWC</strong> أو <strong>Rspack</strong>—يعالج الشيفرة على الفور تقريبًا لأنه لا يهتم بأنواعك. ثم شغّل فحص الأنواع كعملية خلفية منفصلة (<code>tsc --noEmit --watch</code>) أو ادفع الفحص الكامل للأنواع إلى CI. فتحصل على تغذية راجعة سريعة <em>و</em>أمان الأنواع—لا من الأداة نفسها في الوقت نفسه فحسب.</p>
<p>توثّق TypeScript ميزتين متكاملتين تدعمان هذا الفصل. أولًا، <strong><code>isolatedModules</code></strong> يحذّر عندما تستخدم بنى لا يمكن ترجمتها بأمان ملفًا ملفًا بواسطة أدوات مثل Babel أو <code>transpileModule</code>. وهو نفسه لا يجعل الإصدار أسرع—بل يبقيك داخل المجموعة الفرعية التي تستطيع أدوات الإصدار السريعة التعامل معها. ثانيًا، منذ TypeScript 5.6، يستطيع <strong><code>--noCheck</code></strong> تخطي الفحص الكامل لسير عمل إصدار أسرع، وعندما يقترن بـ**<code>--isolatedDeclarations</code>** يصبح توليد التعريفات تركيبيًا في معظمه وبالتالي أسرع بكثير. (<a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html">ملاحظات إصدار TypeScript 5.6</a>)</p>
<p>عمليًا، يقود ذلك إلى نمطين صحيين. بالنسبة إلى التطبيقات، دع المُجمِّع يُصدر JavaScript وشغّل فحص TypeScript منفصلًا عبر <code>tsc --noEmit</code> أو <code>tsc -b</code>. وبالنسبة إلى المكتبات، أبقِ <code>tsc</code> مسؤولًا عن التعريفات، وإن كانت قاعدة شيفرتك منضبطة بما يكفي لـ<code>isolatedDeclarations</code> فيمكنك بناء مسار تعريفات أسرع بكثير عبر <code>--noCheck</code>. وهذا استخدام أكثر عقلًا لوقت الهندسة من الجدال حول ما إذا كان نوع شرطي إضافي قادرًا على إثبات وجود الإرادة الحرة.</p>
<h3 id="حسن-أنواعك">حسّن أنواعك</h3>
<p>حسّن السطح العام أولًا. أضف أنواع الإرجاع إلى الدوال المُصدَّرة. واسحب الأنواع الشرطية أو المعيّنة المتكررة إلى أسماء مستعارة مسماة. وفضّل وراثة الواجهات على التقاطعات الكبيرة. وفضّل نوعًا أساسيًا مشتركًا على اتحاد عملاق عندما تستطيع نمذجة المجال بهذه الطريقة. وهذه التغييرات تهم لأنها تحسّن التخزين المؤقت وتقلل المقارنات البنيوية المتكررة—خصوصًا عبر إصدار التعريفات وحدود الحزم.</p>
<p>إذا كان نوع مساعد ما يتطلب شهادة دكتوراه لقراءته، فهو يحتاج على الأرجح إلى تفكيك. وعند حدود النظام (استجابات API، ومدخلات النماذج)، فضّل التحقق من المخطط وقت التشغيل بشيء مثل Zod بدلًا من ترميز كل قيد في نظام الأنواع.</p>
<h3 id="اضبط-tsconfig-لديك">اضبط <code>tsconfig</code> لديك</h3>
<p><strong><code>incremental: true</code></strong> يخزّن حالة البناء في ملف <code>.tsbuildinfo</code> بحيث لا تعيد البناءات اللاحقة فحص إلا ما تغيّر. وفي وضع المراقبة، قد يكون <code>assumeChangesOnlyAffectDirectDependencies</code> رافعة إضافية مفيدة عندما يكون لأغلب التحريرات أثر محلي، لأنه يخبر TypeScript بافتراض أن التغيير لا يؤثر إلا في الملفات التابعة مباشرة أثناء إعادات الترجمة التدريجية.</p>
<p><strong><code>skipLibCheck: true</code></strong> يخبر TypeScript بالتوقف عن فحص الأنواع في كل ملف <code>.d.ts</code> داخل <code>node_modules</code>. إنها رافعة سرعة صالحة، لكن عاملها كرافعة سرعة لا كبلورة شفاء. فـ<a href="https://github.com/microsoft/Typescript/wiki/Performance">الوثائق تحذّر صراحةً</a> من أن <code>skipLibCheck</code> قد يخفي سوء إعداد وتعريفات متعارضة. وهو شائع في مستودعات التطبيقات الكبيرة، لكنه بديل رديء عن إصلاح الأنواع العامة المعطوبة في مستودع مكتبات.</p>
<h3 id="راقب-المصرف-الأصلي">راقب المصرّف الأصلي</h3>
<p>تنقل Microsoft TypeScript إلى Go (مشروع Corsa، الذي سيُطلق باسم TypeScript 7.0). فالتنفيذ الأصلي يلغي عبء آلة JavaScript الافتراضية ويستخدم توازي الذاكرة المشتركة، فيقدم أزمنة ترجمة أسرع بمقدار 8–10 أضعاف ويقلص استخدام الذاكرة إلى النصف تقريبًا. وهو متاح الآن كمعاينة عبر <code>@typescript/native-preview</code>. وعندما يستقر، سيغيّر حسابات الأداء للجميع.</p>
<h3 id="حدث-أولا-وارتبك-لاحقا">حدّث أولًا، وارتبك لاحقًا</h3>
<p>يقول <a href="https://github.com/microsoft/Typescript/wiki/Performance">دليل الأداء</a> في TypeScript نفسه إن إصدارات TypeScript الأحدث وحزم <code>@types</code> الأحدث قد تحل تراجعات حسابية مكلفة. وقد جاءت إصدارات حديثة بتغييرات تساعد المستودعات الكبيرة مباشرة: فقد حسّن TypeScript 5.5 موثوقية وضع المراقبة والمحرر حول عمليات الحذف والمجلدات المرتبطة رمزيًا في السيناريوهات الشبيهة بالمستودعات الأحادية، وأضاف TypeScript 5.8 تحسينات لتحميل البرنامج وتحديثه تجعل تحرير المشاريع الكبيرة أكثر استجابة. وعند تشخيص مشكلة أداء في المصرّف، يوصي فريق TypeScript حتى بتجربة <code>typescript@next</code> أولًا لتتأكد من أنك لا تطارد خطأً أُصلح بالفعل.</p>
<h2 id="typescript-في-المستودعات-الأحادية">TypeScript في المستودعات الأحادية</h2>
<p>تضخّم المستودعات الأحادية كل مشكلة من مشكلات توسيع نطاق TypeScript. فعادة ملفات البرميل عند فريق واحد تصبح بطء بناء عند كل الفرق. لكن المستودعات الأحادية تمنحك أيضًا البنية اللازمة لحل هذه المشاكل حلًا صحيحًا.</p>
<h3 id="مراجع-المشاريع">مراجع المشاريع</h3>
<p>بدلًا من سياق ترجمة واحد ضخم، قسّم مستودعك إلى وحدات قابلة للبناء باستقلالية. وامنح كل حزمة ملف <code>tsconfig.json</code> خاصًا بها مع <strong><code>composite: true</code></strong>، واربطها باستخدام مصفوفة <code>references</code>. وابنِ بـ<code>tsc --build</code> (أو ببساطة <code>tsc -b</code>)، الذي ينسّق البناءات بترتيب الاعتمادات ولا يعيد ترجمة إلا الحزم التي تغيرت مدخلاتها فعلًا. وتُحل الاستيرادات من مشروع مرجعي عبر مخرجات تعريفاته—وهذا بالضبط سبب تحسين المراجع للتوسع: فكل مشروع يعتمد على سطح API مستقر بدلًا من الشيفرة الكاملة لكل حزمة لاحقة.</p>
<p>يتألف إعداد المستودع الأحادي النظيف عادة من ثلاث طبقات: إعداد أساسي مشترك، وإعداد «حل» جذري، وملف <code>tsconfig.json</code> واحد لكل حزمة. وسبب ملف الحل الجذري الإضافي محدد بشكل مزعج وحقيقي جدًا: فـ<code>extends</code> <a href="https://www.typescriptlang.org/tsconfig/extends.html">لا يورّث <code>references</code></a>، لذا يجب أن يعيش مخطط البناء في إعدادات تعلنه مباشرة.</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.base.json — shared strictness and syntax defaults</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;verbatimModuleSyntax&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json at repo root — the &quot;solution&quot; config</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/shared&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/api&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/web&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// packages/shared/tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.base.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;nodenext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;composite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;incremental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/.*/&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// packages/api/tsconfig.json — references shared</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.base.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;nodenext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;composite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;incremental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/.*/&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../shared&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>عندها يصبح البناء مجرد:</p>
<pre><code class="language-bash">tsc -b
tsc -b --watch
</code></pre>
<p>وثمة تفاصيل قليلة خاصة بالمراجع تهم عمليًا: يجب أن تمكّن المشاريع المرجعية <code>composite</code>، وهو ما يتطلب أيضًا إصدار التعريفات. ويستحق <strong><code>declarationMap</code></strong> التمكين لأنه يمنحك «الانتقال إلى التعريف» وإعادة التسمية عبر المشاريع في المحررات. وفي مساحات العمل التركيبية الكبيرة جدًا، يولّد VS Code إعادات توجيه <code>.d.ts</code> في الذاكرة من خلف الكواليس—وإذا أصبح ذلك مكلفًا، فقد يقلل <code>disableSourceOfProjectReferenceRedirect</code> التكلفة.</p>
<p>وإذا نفدت ذاكرة المحرر رغم ذلك في مساحة عمل متعددة المشاريع، فـ<a href="https://github.com/microsoft/Typescript/wiki/Performance">توصية</a> TypeScript صريحة: اضبط <code>&quot;disableReferencedProjectLoad&quot;: true</code> و<code>&quot;disableSolutionSearching&quot;: true</code> بحيث تتوقف خدمة اللغة عن تحميل كل شيء بلهفة. وهذا يقلل حجم سياق المشروع المتاح فورًا، لكنه غالبًا الفرق بين محرر قابل للاستخدام ومحرر منصهر.</p>
<p>سنعدّ مراجع المشاريع عمليًا في التمرين.</p>
<h3 id="حزم-حقيقية-لا-مجلدات-ذات-طموحات">حزم حقيقية، لا مجلدات ذات طموحات</h3>
<p>عامل حزم مساحة العمل كحزم حقيقية. فمساحات عمل npm تنشئ تلقائيًا روابط رمزية للحزم المحلية داخل <code>node_modules</code>، وبروتوكول <strong><code>workspace:*</code></strong> في pnpm موجود تحديدًا لإزالة الغموض حول ما إذا كان ينبغي لاعتماد ما أن يُحل إلى حزمة محلية في مساحة العمل أم إلى السجل. وينبغي أن يعكس مخطط اعتماد حزمك الداخلي في مراجع المشاريع. فتحصل على مخطط وقت تشغيل واحد ومخطط حزم واحد ومخطط أنواع واحد بدلًا من ثلاث أكاذيب مختلفة قليلًا.</p>
<p>وبالنسبة إلى الحزم الداخلية والمنشورة، فضّل استيرادات الحزم الحقيقية مع <code>exports</code> في <code>package.json</code> على حيل الأسماء المستعارة الخاصة بـTypeScript وحده. فـTypeScript <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html">يدعم <code>exports</code> و<code>imports</code></a> في أنماط الحل الحديثة. في المقابل، <code>paths</code> مجرد تلميح للمصرّف—فهو لا يعيد كتابة الاستيرادات المُصدَرة—لذا ينبغي ألّا يُستخدم إلا عندما يكون وقت التشغيل أو المُجمِّع لديك ينفذ التعيين نفسه بالفعل.</p>
<pre><code class="language-json"><span class="hljs-comment">// packages/shared/package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/shared&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;module&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;import&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="وائم-إعدادات-الوحدات-مع-الواقع">وائم إعدادات الوحدات مع الواقع</h3>
<p>تقول <a href="https://www.typescriptlang.org/tsconfig/module">وثائق TypeScript</a> الحالية إن حزم Node.js الحديثة سترغب عادة في <code>nodenext</code>، بينما سترغب الشيفرة المُحزَّمة عادة في <code>preserve</code> أو <code>esnext</code>. ونشر شيفرة فُحصت فقط تحت <code>&quot;moduleResolution&quot;: &quot;bundler&quot;</code> مخاطرة، إلا إذا كانت مخرجات تعريفاتك محزَّمة على النحو المناسب—فحل المُجمِّع قد يقبل استيرادات نسبية بلا امتداد تنكسر في Node.js، ويمكن لملفات التعريف أن تحفظ تلك المحددات غير الآمنة.</p>
<h3 id="أبق-المصدر-والمخرجات-منفصلين">أبقِ المصدر والمخرجات منفصلين</h3>
<p>امنح كل حزمة قيمتين متمايزتين لـ<code>rootDir</code> و<code>outDir</code>. و<a href="https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html">إرشاد المكتبات</a> في TypeScript يلاحظ صراحةً أنه في المكتبات التي تنشر المصدر، يلزم مجلد مخرجات منفصل حتى لا يحمّل المستهلكون بالخطأ ملفات <code>.ts</code> بدلًا من ملفات <code>.d.ts</code> عبر استبدال الامتدادات. وهي مسألة صحة ومسألة أداء في آن واحد.</p>
<h3 id="افصل-الاهتمامات-في-مشاريع-منفصلة">افصل الاهتمامات في مشاريع منفصلة</h3>
<p>أبقِ الاختبارات والشيفرة المولّدة والتعريفات العامة في مشاريعها الخاصة كلما أمكن. فذلك يمنحك مخططات إنتاج أصغر، وسياقات محيطة أضيق، واعتمادات عرضية أقل من شيفرة المنتج إلى شيفرة الاختبار.</p>
<h3 id="الحدود-المعمارية">الحدود المعمارية</h3>
<p>في المستودع الأحادي، من <em>السهل</em> أن تقترن المجالات عرضيًا بالوصول إلى الأجزاء الداخلية لحزمة شقيقة. وأدوات مثل <strong><code>eslint-plugin-boundaries</code></strong> أو <code>@nx/enforce-module-boundaries</code> في Nx تتيح لك وسم المشاريع (مثل <code>type:ui</code> و<code>scope:admin</code>) وتقييد أي الحزم يجوز لها الاستيراد من أي الحزم برمجيًا. وسنتعمق في هذا في تمرين لاحق.</p>
<h3 id="تنسيق-المهام">تنسيق المهام</h3>
<p>أدوات مثل <strong>Turborepo</strong> و<strong>Nx</strong> تحلل مخطط اعتماداتك لتشغيل المهام على التوازي، ومشاركة مخرجات البناء عبر التخزين المؤقت البعيد، ودعم أوامر «المتأثر» بحيث لا يختبر CI إلا الحزم التي غيّرها طلب سحب معين. وعلى النطاق الكبير، هذا هو الفرق بين خط مدة تنفيذه 45 دقيقة وخط مدته 5 دقائق.</p>
<h3 id="سياسة-الإصدار-الواحد">سياسة الإصدار الواحد</h3>
<p>أبقِ إصدارات الاعتمادات الخارجية موحدة عبر كل الحزم. فإذا استخدمت حزمة React 18 واستخدمت أخرى React 19، فأنت مقبل على تعارضات الاعتمادات الماسية وأخطاء وقت تشغيل غامضة. وأدوات مثل <strong>Syncpack</strong> يمكنها تدقيق ملفات <code>package.json</code> في المستودع وإصلاحها تلقائيًا لفرض توافق الإصدارات.</p>
<h2 id="مرجع-سريع">مرجع سريع</h2>
<h3 id="خيارات-المصرف">خيارات المصرّف</h3>
<table>
<thead>
<tr>
<th>الخيار</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>composite</code></td>
<td>يعلّم المشروع كوحدة قابلة للبناء لمراجع المشاريع. مطلوب ليعمل <code>tsc -b</code>.</td>
</tr>
<tr>
<td><code>declaration</code></td>
<td>يُصدر ملفات <code>.d.ts</code> بحيث تُحل المشاريع المرجعية عبر مخرجات التعريفات لا الشيفرة الكاملة.</td>
</tr>
<tr>
<td><code>declarationMap</code></td>
<td>يولّد خرائط مصدر للتعريفات، مما يمنحك «الانتقال إلى التعريف» وإعادة التسمية عبر المشاريع في المحررات.</td>
</tr>
<tr>
<td><code>incremental</code></td>
<td>يخزّن حالة البناء في ملف <code>.tsbuildinfo</code> بحيث لا تعيد البناءات اللاحقة فحص إلا ما تغيّر.</td>
</tr>
<tr>
<td><code>isolatedModules</code></td>
<td>يحذّر من بنى لا تستطيع المترجمات أحادية الملف مثل esbuild وSWC التعامل معها بأمان.</td>
</tr>
<tr>
<td><code>isolatedDeclarations</code></td>
<td>يجعل توليد التعريفات تركيبيًا في معظمه. وعند اقترانه بـ<code>noCheck</code> يتيح إصدار تعريفات أسرع بكثير.</td>
</tr>
<tr>
<td><code>noCheck</code></td>
<td>يتخطى فحص الأنواع الكامل أثناء الإصدار. مفيد عندما يتولى مترجم سريع إصدار JavaScript ويقتصر <code>tsc</code> على إصدار ملفات <code>.d.ts</code>.</td>
</tr>
<tr>
<td><code>noEmit</code></td>
<td>يفحص الأنواع دون إنتاج مخرجات. العلم المعتاد لـ«دع المُجمِّع يُصدر، ودع TypeScript يفحص».</td>
</tr>
<tr>
<td><code>skipLibCheck</code></td>
<td>يتخطى فحص الأنواع في ملفات <code>.d.ts</code> داخل <code>node_modules</code>. يسرّع البناء لكنه قد يخفي سوء الإعداد.</td>
</tr>
<tr>
<td><code>types</code></td>
<td>يتحكم في حزم <code>@types</code> المضمّنة تلقائيًا. وضبط <code>[]</code> يمنع تلوث الأنواع المحيطة من إبطاء بدء التشغيل.</td>
</tr>
<tr>
<td><code>verbatimModuleSyntax</code></td>
<td>يفرض صيغة <code>import type</code> الصريحة بحيث تستطيع المترجمات إسقاط الاستيرادات الخاصة بالأنواع فقط بأمان.</td>
</tr>
<tr>
<td><code>assumeChangesOnlyAffectDirectDependencies</code></td>
<td>في وضع المراقبة، يحصر إعادة الفحص في التابعين المباشرين للملف المتغير. مفيد عندما يكون لأغلب التحريرات أثر محلي.</td>
</tr>
<tr>
<td><code>disableReferencedProjectLoad</code></td>
<td>يمنع خدمة اللغة من تحميل كل المشاريع المرجعية بلهفة. يقايض بعض الوعي عبر المشاريع بذاكرة أقل.</td>
</tr>
<tr>
<td><code>disableSolutionSearching</code></td>
<td>يمنع خدمة اللغة من السير في مخطط الحل الكامل. صمام آخر لتخفيف ضغط الذاكرة في مساحات العمل الكبيرة.</td>
</tr>
<tr>
<td><code>disableSourceOfProjectReferenceRedirect</code></td>
<td>يستخدم ملفات <code>.d.ts</code> على القرص بدلًا من توليد إعادات توجيه التعريفات في الذاكرة. يقلل ذاكرة المحرر مقابل الحاجة إلى بناء سابق.</td>
</tr>
<tr>
<td><code>module</code> / <code>moduleResolution</code></td>
<td>يتحكم في كيفية حل الاستيرادات. <code>nodenext</code> لحزم Node، و<code>preserve</code> أو <code>esnext</code> للشيفرة المُحزَّمة. وحل <code>bundler</code> قد يسرّب محددات غير آمنة إلى التعريفات.</td>
</tr>
<tr>
<td><code>rootDir</code> / <code>outDir</code></td>
<td>يفصل المصدر عن المخرجات. يمنع المستهلكين من تحميل ملفات <code>.ts</code> بدلًا من <code>.d.ts</code> بالخطأ.</td>
</tr>
</tbody>
</table>
<h3 id="أعلام-التشخيص">أعلام التشخيص</h3>
<table>
<thead>
<tr>
<th>العلم</th>
<th>ما يعرضه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--extendedDiagnostics</code></td>
<td>تفصيل الوقت عبر المراحل: الإدخال/الإخراج، والتحليل، والربط، والفحص، والإصدار. ابدأ من هنا.</td>
</tr>
<tr>
<td><code>--listFilesOnly</code></td>
<td>كل ملف قرر TypeScript تضمينه. ستفاجأ على الأرجح بالبعض منها.</td>
</tr>
<tr>
<td><code>--explainFiles</code></td>
<td>سبب سحب كل ملف—أي استيراد أو مرجع تسبب في ذلك.</td>
</tr>
<tr>
<td><code>--traceResolution</code></td>
<td>قرارات حل الوحدات خطوة بخطوة. مفيد في تنقيح سبب التقاط ملف <code>.d.ts</code> خاطئ.</td>
</tr>
<tr>
<td><code>--generateTrace</code></td>
<td>ينتج أثرًا متوافقًا مع Chrome DevTools. انظر إلى حدثي <code>checkSourceFile</code> و<code>checkExpression</code>.</td>
</tr>
</tbody>
</table>
<h2 id="إعداد-افتراضي-يشيخ-بكرامة">إعداد افتراضي يشيخ بكرامة</h2>
<p>الإعداد الذي ينجو من النمو ممل بأفضل معنى ممكن. ضع الصرامة المشتركة وإعدادات الصياغة الافتراضية في إعداد أساسي جذري. وضع <code>references</code> فقط في إعداد حل جذري. وامنح كل حزمة <code>tsconfig</code> خاصًا بها مع <code>composite</code> و<code>declaration</code> و<code>incremental</code> وحدود واضحة لـ<code>rootDir</code> و<code>outDir</code>. وحدّد نطاق <code>types</code> بإحكام. واستخدم اعتمادات حزم حقيقية وصادرات حزم حقيقية. وبالنسبة إلى حزم التطبيقات، دع المُجمِّع يُصدر ودع TypeScript يفحص. وبالنسبة إلى حزم المكتبات، اجعل جودة التعريفات شاغلًا من الدرجة الأولى.</p>
<p>وعندما يبدأ TypeScript يبدو بطيئًا، قاوم الرغبة في البحث عن علم سحري واحد. تحقق أولًا من عدد الملفات التي جُذبت. ثم تحقق مما إذا كان الألم في بناء البرنامج أو في حل الوحدات أو في فحص الأنواع. ثم أصلح البنية التي سببت ذلك. هذا أقل بريقًا من اختراع طبقة سابعة من الأنواع العامة المساعدة، لكن الواقع كان دائمًا معاديًا للبريق.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="أين-ينكسر-typescript">أين ينكسر TypeScript</h3>
<blockquote>
<p>بطء البناء وبطء المحرر مشكلة واحدة ترتدي زيّين مختلفين.</p>
</blockquote>
<table>
<thead>
<tr>
<th>نمط الفشل</th>
<th>العَرَض</th>
<th>الإصلاح</th>
</tr>
</thead>
<tbody>
<tr>
<td>برنامج متضخم</td>
<td>بناءات بطيئة وذاكرة مرتفعة</td>
<td>تضييق <code>include</code> وضبط <code>&quot;types&quot;: []</code></td>
</tr>
<tr>
<td>ملفات البرميل</td>
<td>استيراد واحد يسحب مئات الوحدات</td>
<td>استيرادات مباشرة وإزالة ملفات الفهرس المُصدِّرة من جديد</td>
</tr>
<tr>
<td>أنواع معقدة</td>
<td>فحص بطيء واتحادات تربيعية</td>
<td>فضّل الواجهات وسمِّ الأنواع الشرطية</td>
</tr>
<tr>
<td>صادرات مجهولة</td>
<td>مخرجات <code>.d.ts</code> ضخمة</td>
<td>أضف أنواع إرجاع صريحة للصادرات</td>
</tr>
<tr>
<td>تلوث الأنواع المحيطة</td>
<td>بدء بطيء وتكرار المتغيرات العامة</td>
<td>اضبط <code>&quot;types&quot;: []</code> واسرد ما تحتاج فقط</td>
</tr>
<tr>
<td>اعتمادات دائرية</td>
<td>أخطاء تنميط عميقة وقيم <code>undefined</code></td>
<td>اكسر الحلقات وأعد هيكلة مخطط الحزم</td>
</tr>
</tbody>
</table>
<ul>
<li>أزالت Atlassian ملفات البرميل: بناءات أسرع بنسبة <strong>75%</strong>، وإبراز في بيئة التطوير أسرع بنسبة <strong>30%</strong>، واختبارات أقل بنسبة <strong>88%</strong> في كل طلب سحب.</li>
</ul>
<hr>
<h3 id="قس-أولا-1">قِس أولًا</h3>
<blockquote>
<p>قبل تقليب الأعلام، اكتشف أين يذهب الوقت فعلًا.</p>
</blockquote>
<pre><code class="language-bash">tsc -p tsconfig.json --extendedDiagnostics
tsc -p tsconfig.json --listFilesOnly
tsc -p tsconfig.json --explainFiles &gt; explain.txt
tsc -p tsconfig.json --generateTrace .trace --incremental <span class="hljs-literal">false</span>
</code></pre>
<ul>
<li>ارتفاع <code>Files</code> مع ارتفاع <code>I/O Read time</code> → المشكلة في مجموعة ملفاتك أو في حل الوحدات.</li>
<li>ارتفاع <code>Check time</code> → المشكلة في أنواعك.</li>
<li>ينتج <code>--generateTrace</code> أثرًا متوافقًا مع Chrome. انظر إلى <code>checkSourceFile</code> و<code>checkExpression</code>.</li>
</ul>
<hr>
<h3 id="مراجع-المشاريع-1">مراجع المشاريع</h3>
<blockquote>
<p>قسّم المستودع الأحادي إلى وحدات قابلة للبناء باستقلالية.</p>
</blockquote>
<pre><code class="language-json"><span class="hljs-comment">// Root solution config — only references, no files</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/shared&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/api&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/web&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>كل حزمة: <code>composite: true</code> و<code>declaration: true</code> و<code>incremental: true</code>.</li>
<li>تُحل الاستيرادات عبر مخرجات التعريفات لا الشيفرة الكاملة.</li>
<li>يمنحك <code>declarationMap</code> «الانتقال إلى التعريف» عبر المشاريع.</li>
<li>نطاق 5–20 مشروعًا هو النقطة المثلى التجريبية.</li>
</ul>
<hr>
<h3 id="الإعداد-الافتراضي">الإعداد الافتراضي</h3>
<blockquote>
<p>الإعداد الذي ينجو من النمو ممل بأفضل معنى ممكن.</p>
</blockquote>
<ul>
<li><strong>التطبيقات:</strong> دع المُجمِّع يُصدر JavaScript. وشغّل <code>tsc --noEmit</code> منفصلًا.</li>
<li><strong>المكتبات:</strong> أبقِ <code>tsc</code> مسؤولًا عن التعريفات. واجعل جودة التعريفات شاغلًا من الدرجة الأولى.</li>
<li><strong>كل الحزم:</strong> ضيّق <code>include</code>. واضبط <code>&quot;types&quot;: []</code>. وافصل <code>rootDir</code> و<code>outDir</code>. واستخدم صادرات <code>package.json</code> حقيقية.</li>
<li><strong>عندما يبدو بطيئًا:</strong> تحقق من عدد الملفات أولًا. ثم تحقق مما إذا كان الألم في بناء البرنامج أو في الحل أو في الفحص. ثم أصلح البنية.</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:t,slug:a,title:c,headings:o,html:p};export{s as book,n as chapter,t as chapterTitle,e as default,o as headings,p as html,a as slug,c as title};
